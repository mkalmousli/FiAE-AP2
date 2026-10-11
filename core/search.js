// Volltextsuche: Abfrage zerlegen, Seiten und Fundstellen gewichten, Tippfehler ausgleichen.
(function () {
  const {fold, WEIGHT} = AP2.index;
  const ALNUM = /[\p{L}\p{N}]/u;
  // Wörter sind UND-verknüpft, "in Anführungszeichen" steht für eine genaue Wortfolge.
  const parse = (query) => {
    const terms = [];
    fold(query).replace(/"([^"]+)"|(\S+)/g, (all, phrase, word) => {
      const term = (phrase || word).replace(/"/g, '').trim();
      if (term && !terms.includes(term)) terms.push(term);
      return '';
    });
    return terms;
  };
  const atWord = (hay, i) => i === 0 || !ALNUM.test(hay[i - 1]);
  // Alle Fundstellen der Begriffe als sortierte, zusammengefasste Bereiche [von, bis].
  const ranges = (hay, terms) => {
    const list = [];
    terms.forEach((term) => {
      for (let i = hay.indexOf(term); i >= 0; i = hay.indexOf(term, i + term.length)) list.push([i, i + term.length]);
    });
    list.sort((x, y) => x[0] - y[0] || y[1] - x[1]);
    const out = [];
    list.forEach((r) => {
      const last = out[out.length - 1];
      if (last && r[0] < last[1]) last[1] = Math.max(last[1], r[1]); else out.push(r);
    });
    return out;
  };
  const segHit = (seg, terms, phrase) => {
    let sum = 0;
    let n = 0;
    let a = -1;
    let len = 0;
    terms.forEach((term) => {
      const i = seg.fold.indexOf(term);
      if (i < 0) return;
      n++;
      sum += atWord(seg.fold, i) ? 1.4 : 1;
      if (a < 0 || i < a) { a = i; len = term.length; }
    });
    if (!n) return null;
    // Kurze Abschnitte, mehrere Begriffe im selben Abschnitt und ein Treffer ganz am Anfang (Glossarbegriff) zählen mehr.
    let score = sum * (WEIGHT[seg.kind] || 1) * (1 + 0.6 * (n - 1)) * (1 + 30 / (30 + seg.text.length)) * (a === 0 ? 1.5 : 1);
    const at = phrase ? seg.fold.indexOf(phrase) : -1;
    if (at >= 0) { score *= 2; a = at; len = phrase.length; }
    return {score, a, b: a + len};
  };
  const titleScore = (ix, terms, phrase) => {
    let sum = 0;
    terms.forEach((term) => {
      const i = ix.title.indexOf(term);
      if (ix.title === term) sum += 120;
      else if (i === 0) sum += 70;
      else if (i > 0) sum += atWord(ix.title, i) ? 50 : 30;
      else if (ix.group.includes(term)) sum += 12;
    });
    if (phrase && ix.title.includes(phrase)) sum += ix.title === phrase ? 160 : 60;
    return sum;
  };
  const scan = (ix, terms, phrase, needAll) => {
    const inPage = (term) => ix.title.includes(term) || ix.group.includes(term) || ix.hay.includes(term);
    if (needAll ? !terms.every(inPage) : !terms.some(inPage)) return null;
    const hits = [];
    ix.segs.forEach((seg, si) => {
      const hit = segHit(seg, terms, phrase);
      if (hit) { hit.si = si; hits.push(hit); }
    });
    hits.sort((x, y) => y.score - x.score || x.si - y.si);
    const top = hits.slice(0, 3);
    const head = titleScore(ix, terms, phrase);
    const body = top.reduce((sum, hit, idx) => sum + hit.score / (1 << idx), 0) + Math.log2(1 + hits.length);
    return {ix, score: head + body, inTitle: terms.some((term) => ix.title.includes(term)), hits: top, total: hits.length};
  };
  const rank = (terms, needAll) => {
    const phrase = terms.length > 1 ? terms.join(' ') : '';
    return AP2.index.all().map((ix) => scan(ix, terms, phrase, needAll)).filter(Boolean).sort((x, y) => y.score - x.score);
  };
  // Editierabstand (mit Buchstabendrehern), bricht ab, sobald max überschritten ist.
  const dist = (a, b, max) => {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev2 = [];
    let prev = Array.from({length: b.length + 1}, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let low = i;
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) cur[j] = Math.min(cur[j], prev2[j - 2] + 1);
        if (cur[j] < low) low = cur[j];
      }
      if (low > max) return max + 1;
      prev2 = prev;
      prev = cur;
    }
    return prev[b.length];
  };
  let vocab = null;
  const words = () => {
    if (vocab) return vocab;
    vocab = new Map();
    const take = (text) => (text.match(/[\p{L}\p{N}]{4,}/gu) || []).forEach((word) => {
      const key = fold(word);
      const rec = vocab.get(key);
      if (rec) rec[0]++; else vocab.set(key, [1, word]);
    });
    AP2.index.all().forEach((ix) => { take(ix.page.t); ix.segs.forEach((seg) => take(seg.text)); });
    return vocab;
  };
  // Ähnlichstes bekanntes Wort (oder Wortanfang, solange noch getippt wird) für einen Begriff ohne Treffer.
  const suggest = (term) => {
    if (term.length < 4 || /\s/.test(term)) return null;
    const max = term.length < 7 ? 1 : 2;
    let best = null;
    let bestD = max + 1;
    let bestN = 0;
    words().forEach((rec, key) => {
      if (key[0] !== term[0]) return;
      const cuts = key.length <= term.length + max ? [key.length] : [term.length, term.length + 1];
      cuts.forEach((cut) => {
        const d = dist(term, key.slice(0, cut), max);
        if (d < bestD || (d === bestD && d <= max && rec[0] > bestN)) { best = [key.slice(0, cut), rec[1].slice(0, cut)]; bestD = d; bestN = rec[0]; }
      });
    });
    return best;
  };
  const known = (term) => AP2.index.all().some((ix) => ix.title.includes(term) || ix.hay.includes(term));
  const run = (query) => {
    let terms = parse(query);
    const shown = query.trim().replace(/\s+/g, ' ');
    if (terms.join('').length < 2) return {terms: [], results: [], shown, fixed: ''};
    let results = rank(terms, true);
    let fixed = '';
    if (!results.length) {
      const fixes = terms.map((term) => (known(term) ? null : suggest(term)));
      const better = terms.map((term, idx) => (fixes[idx] ? fixes[idx][0] : term));
      const again = fixes.some(Boolean) ? rank(better, true) : [];
      if (again.length) {
        results = again;
        fixed = terms.map((term, idx) => (fixes[idx] ? fixes[idx][1] : term)).join(' ');
        terms = better;
      }
    }
    if (!results.length && terms.length > 1) results = rank(terms, false);
    return {terms, results, shown: fixed || shown, fixed};
  };
  // Alle Fundstellen einer Seite in Lesereihenfolge: {si: Abschnitt, a: von, b: bis}.
  const marks = (id, terms) => {
    const ix = AP2.index.get(id);
    const out = [];
    if (ix) ix.segs.forEach((seg, si) => ranges(seg.fold, terms).forEach((r) => out.push({si, a: r[0], b: r[1]})));
    return out;
  };
  AP2.search = {run, ranges, marks};
})();
