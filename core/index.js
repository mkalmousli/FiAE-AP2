// Suchindex: zerlegt jede Seite in Textabschnitte (Art, Überschrift, Text) für die Volltextsuche.
(function () {
  const LABEL = {h: 'Abschnitt', def: 'Prüfungsdefinition', merk: 'Merkhilfe', cheat: 'Spickzettel', tip: 'Prüfungstipp', warn: 'Prüfungsfalle',
    note: 'Hinweis', ex: 'Beispiel', code: 'Code', table: 'Tabelle', qa: 'Aufgabe', sol: 'Musterlösung', quiz: 'Selbsttest', fig: 'Abbildung'};
  const WEIGHT = {h: 5, def: 3, merk: 2.5, cheat: 2, tip: 1.5, warn: 1.5, text: 1.5, table: 1.2, qa: 1.2, quiz: 0.7};
  // Kleinschreibung ohne Umlautpunkte und Akzente; die Länge bleibt gleich, damit Fundstellen auf den Originaltext passen.
  const fold = (str) => {
    const low = str.toLowerCase();
    const bare = low.normalize('NFD').replace(/[̀-ͯ]/g, '');
    if (bare.length === str.length) return bare;
    return low.length === str.length ? low : str;
  };
  // Nur Buchstaben und Ziffern: so lässt sich ein Abschnitt unabhängig von Auszeichnung und Leerraum im DOM wiederfinden.
  const sk = (str) => str.toLowerCase().normalize('NFD').replace(/[^\p{L}\p{N}]+/gu, '');
  const plain = (str) => str.replace(/\*\*([^*]+)\*\*|`([^`]+)`/g, (all, bold, code) => bold || code);
  const CALLOUTS = ['def', 'merk', 'tip', 'warn', 'note', 'ex'];
  const build = (p) => {
    const segs = [];
    let head = '';
    let force = '';
    const emit = (kind, raw, isCode) => {
      if (typeof raw !== 'string' && typeof raw !== 'number') return;
      const text = isCode ? String(raw).replace(/^\n+|\s+$/g, '') : plain(String(raw));
      if (text.trim()) segs.push({kind: force || kind, text, fold: fold(text), head});
    };
    const each = (kind, val) => [].concat(val == null ? [] : val).forEach((item) => emit(kind, item));
    const title = (txt) => { head = ''; emit('h', txt); head = plain(String(txt)); };
    const inSol = (fn) => { force = 'sol'; fn(); force = ''; };
    const answer = (val) => inSol(() => [].concat(val == null ? [] : val).forEach((item) => (Array.isArray(item) ? block(item)
      : emit('text', String(item).replace(/^- /, '')))));
    const T = {
      p: (txt) => emit('text', txt),
      h: title,
      h3: title,
      list: (items) => items.forEach((item) => (Array.isArray(item) ? (emit('text', item[0]), each('text', item[1])) : emit('text', item))),
      steps: (items) => each('text', items),
      kv: (pairs) => pairs.forEach((pair) => emit('text', pair[0] + ': ' + pair[1])),
      cheat: (cards) => cards.forEach((card) => { emit('cheat', card[0]); each('cheat', card[1]); }),
      code: (lang, src) => emit('code', src, true),
      codes: (list) => list.forEach((item) => emit('code', item[1], true)),
      qa: (question, ans) => { emit('qa', question); answer(ans); },
      quiz: (questions) => questions.forEach((q) => { emit('quiz', q.q); each('quiz', q.o); emit('quiz', q.e); }),
      table: (cols, rows) => { emit('table', cols.join(' | ')); rows.forEach((row) => emit('table', row.join(' | '))); },
      procon: (name, pros, cons) => { emit('text', name); each('text', pros); each('text', cons); },
      row: (blocks) => blocks.forEach(block),
      exam: (cfg) => {
        emit('note', cfg.hint);
        cfg.parts.forEach((part) => {
          title(part.t);
          emit('text', part.intro);
          part.tasks.forEach((task) => {
            (task.ctx || []).forEach(block);
            emit('qa', task.q);
            answer(task.a);
            inSol(() => (task.sol || []).forEach(block));
          });
        });
      },
      see: () => {},
      tool: () => {},
    };
    CALLOUTS.forEach((kind) => { T[kind] = (body) => each(kind, body); });
    // Unbekannte Blöcke (Diagramme): nur die Bildunterschrift ist als Text auffindbar.
    const caption = (args) => args.forEach((arg) => { if (arg && typeof arg === 'object' && !Array.isArray(arg)) emit('fig', arg.cap); });
    function block(item) {
      if (!Array.isArray(item)) return;
      const fn = T[item[0]];
      if (fn) fn.apply(null, item.slice(1)); else caption(item.slice(1));
    }
    each('def', p.d);
    each('merk', p.m);
    if (p.cheat) T.cheat(p.cheat);
    p.blocks.forEach(block);
    return {page: p, segs, title: fold(p.t), group: fold(p.g || ''), hay: segs.map((seg) => seg.fold).join('\n')};
  };
  let cache = null;
  const all = () => {
    if (!cache) cache = AP2.store.all().map(build);
    return cache;
  };
  const get = (id) => all().find((ix) => ix.page.id === id);
  // Position jedes Abschnitts im Buchstabengerüst der Seite (erst beim Springen nötig).
  const skeleton = (ix) => {
    if (ix.sk == null) {
      let at = 0;
      ix.sk = ix.segs.map((seg) => { seg.sk = sk(seg.text); seg.at = at; at += seg.sk.length; return seg.sk; }).join('');
    }
    return ix.sk;
  };
  AP2.index = {LABEL, WEIGHT, fold, sk, plain, all, get, skeleton};
})();
