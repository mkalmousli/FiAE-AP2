// Fundstellen auf der Seite: exakte Textstelle im DOM finden, markieren, hinscrollen und per Leiste durchblättern.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const {sk} = AP2.index;
  const SKIP = 'textarea, select, [role="button"], [role="tab"], [role="switch"], [role="link"]';
  const HTML = 'http://www.w3.org/1999/xhtml';
  const NEAR = 24;
  const LIMIT = 400;
  let root = null;
  let cur = null;
  let marks = [];
  let framed = [];
  let ui = null;
  // Buchstabengerüst des sichtbaren und eingeklappten Seitentexts samt Zuordnung zurück zu den Textknoten.
  const scan = () => {
    const nodes = [];
    const starts = [];
    let text = '';
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
      {acceptNode: (n) => (n.nodeType === 1 && n.matches(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)});
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const part = node.nodeType === 3 ? sk(node.data) : '';
      if (part) { nodes.push(node); starts.push(text.length); text += part; }
    }
    return {nodes, starts, text};
  };
  const countBefore = (hay, needle, end) => {
    let n = 0;
    for (let i = hay.indexOf(needle); i >= 0 && i < end; i = hay.indexOf(needle, i + 1)) n++;
    return n;
  };
  const nth = (hay, needle, n) => {
    let last = -1;
    for (let i = hay.indexOf(needle), k = 0; i >= 0 && k <= n; i = hay.indexOf(needle, i + 1), k++) last = i;
    return last;
  };
  // Anfang eines Abschnitts im DOM-Gerüst; kurze Abschnitte werden über ihre Nachbarn eindeutig gemacht.
  const segStart = (dom, ix, seg) => {
    const page = AP2.index.skeleton(ix);
    const from = seg.at;
    const to = from + seg.sk.length;
    const lo = Math.max(0, from - NEAR);
    const hi = Math.min(page.length, to + NEAR);
    const tries = to - from < NEAR ? [[lo, hi], [lo, to], [from, hi]] : [];
    if (to - from >= 10) tries.push([from, to]);
    for (let i = 0; i < tries.length; i++) {
      const needle = page.slice(tries[i][0], tries[i][1]);
      const pos = nth(dom.text, needle, countBefore(page, needle, tries[i][0]));
      if (pos >= 0) return pos + from - tries[i][0];
    }
    return -1;
  };
  // Anfang eines Textes innerhalb eines Elements (Quizkarte, Code-Reiter), sonst -1.
  const inside = (dom, el, needle) => {
    const first = dom.nodes.findIndex((node) => el.contains(node));
    if (first < 0 || !needle) return -1;
    let last = first;
    while (last + 1 < dom.nodes.length && el.contains(dom.nodes[last + 1])) last++;
    const pos = dom.text.indexOf(needle, dom.starts[first]);
    return pos >= 0 && pos + needle.length <= dom.starts[last] + sk(dom.nodes[last].data).length ? pos : -1;
  };
  // Gerüstposition -> Textknoten und Zeichenindex (after: Position hinter dem Zeichen).
  const point = (dom, off, after) => {
    const target = after ? off - 1 : off;
    let i = dom.starts.length - 1;
    while (i > 0 && dom.starts[i] > target) i--;
    let left = target - dom.starts[i];
    let k = 0;
    for (const ch of dom.nodes[i].data) {
      const n = sk(ch).length;
      if (n > left) return {i, k: after ? k + ch.length : k};
      left -= n;
      k += ch.length;
    }
    return {i, k};
  };
  const pieces = (dom, base, seg, hit, hot) => {
    const start = base + sk(seg.text.slice(0, hit.a)).length;
    const end = Math.min(dom.text.length, Math.max(start + 1, base + sk(seg.text.slice(0, hit.b)).length));
    if (start >= end) return [];
    const p = point(dom, start, false);
    const q = point(dom, end, true);
    const out = [];
    for (let i = p.i; i <= q.i; i++) out.push({i, node: dom.nodes[i], a: i === p.i ? p.k : 0, b: i === q.i ? q.k : dom.nodes[i].data.length, hot});
    return out.filter((piece) => piece.b > piece.a);
  };
  const paint = (hot) => (n, c) => {
    n.style.backgroundColor = hot ? c.hlHot : c.hl;
    n.style.color = hot ? c.onHl : 'inherit';
  };
  const frame = (el) => {
    framed.push(el);
    Object.assign(el.style, {outline: '3px solid ' + AP2.theme.c().hlHot, outlineOffset: '4px', borderRadius: S.r.md});
    return el;
  };
  const wrap = (piece) => {
    const par = piece.node.parentNode;
    // In SVG-Diagrammen lässt sich Text nicht umschließen: dort wird die ganze Abbildung umrandet.
    if (par.namespaceURI !== HTML) return piece.hot ? frame(par.closest('svg')) : null;
    const mid = piece.node.splitText(piece.a);
    mid.splitText(piece.b - piece.a);
    const el = h('mark', {style: {borderRadius: '3px', padding: '1px 0', boxDecorationBreak: 'clone'}});
    par.replaceChild(el, mid);
    el.appendChild(mid);
    marks.push(AP2.theme.bind(el, paint(piece.hot)));
    return el;
  };
  const clear = () => {
    marks.forEach((el) => {
      AP2.theme.unbind(el);
      const par = el.parentNode;
      if (!par) return;
      while (el.firstChild) par.insertBefore(el.firstChild, el);
      par.removeChild(el);
      par.normalize();
    });
    framed.forEach((el) => Object.assign(el.style, {outline: '', outlineOffset: ''}));
    marks = [];
    framed = [];
  };
  // Eingeklappte Musterlösungen über der Fundstelle öffnen.
  const reveal = (el) => {
    for (let n = el; n && n !== root; n = n.parentNode) if (n.ap2Reveal) n.ap2Reveal();
  };
  const show = (smooth) => {
    clear();
    if (!cur || !root) return;
    const ix = AP2.index.get(cur.id);
    const target = cur.hits[cur.at];
    const goalSeg = target && ix.segs[target.si];
    AP2.index.skeleton(ix);
    let dom = scan();
    let holder = null;
    const bases = new Map();
    // Liegt die Stelle in einem anderen Code-Reiter oder einer anderen Quizfrage, wird sie zuerst eingeblendet.
    if (goalSeg && (goalSeg.kind === 'quiz' || segStart(dom, ix, goalSeg) < 0)) {
      holder = [...root.querySelectorAll('[data-seek]')].find((el) => el.ap2Seek(goalSeg.sk)) || null;
      if (holder) { dom = scan(); bases.set(target.si, inside(dom, holder, goalSeg.sk)); }
    }
    const cards = [...root.querySelectorAll('[data-seek]')];
    // Quizantworten sind gemischt und nur teilweise sichtbar: sie werden nur innerhalb ihrer Karte gesucht.
    const locate = (seg) => (seg.kind === 'quiz' ? cards.reduce((pos, el) => (pos >= 0 ? pos : inside(dom, el, seg.sk)), -1) : segStart(dom, ix, seg));
    let list = [];
    cur.hits.forEach((hit, idx) => {
      if (idx >= LIMIT && hit !== target) return;
      const seg = ix.segs[hit.si];
      if (!bases.has(hit.si)) bases.set(hit.si, locate(seg));
      if (bases.get(hit.si) >= 0) list = list.concat(pieces(dom, bases.get(hit.si), seg, hit, hit === target));
    });
    // Die gewählte Fundstelle hat Vorrang vor überlappenden Nachbarn.
    const main = list.filter((piece) => piece.hot);
    list = list.filter((piece) => piece.hot || !main.some((m) => m.i === piece.i && m.a < piece.b && piece.a < m.b));
    // Von hinten nach vorn umschließen, damit frühere Positionen gültig bleiben.
    list.sort((x, y) => y.i - x.i || y.a - x.a);
    const edge = new Map();
    const hot = [];
    let goal = null;
    list.forEach((piece) => {
      if (edge.has(piece.i) && piece.b > edge.get(piece.i)) return;
      edge.set(piece.i, piece.a);
      const el = wrap(piece);
      if (!piece.hot || !el) return;
      goal = el;
      if (el.tagName === 'MARK') hot.push(el);
    });
    if (!goal && holder) goal = frame(holder);
    if (!goal) return;
    reveal(goal);
    goal.scrollIntoView({block: 'center', inline: 'nearest', behavior: smooth ? 'smooth' : 'auto'});
    const glow = AP2.theme.c().hlHot;
    hot.forEach((el) => el.animate([{boxShadow: '0 0 0 0 ' + glow}, {boxShadow: '0 0 0 12px transparent'}],
      {duration: 800, iterations: 2}));
  };
  const sync = () => {
    if (!cur) { if (ui) ui.bar.style.display = 'none'; return; }
    if (!ui) ui = build();
    const n = cur.hits.length;
    ui.label.textContent = '„' + cur.shown + '“';
    ui.count.textContent = cur.at >= 0 ? (cur.at + 1) + ' / ' + n : n + (n === 1 ? ' Fundstelle' : ' Fundstellen');
    ui.bar.style.display = 'flex';
  };
  const step = (dir) => {
    if (!cur) return;
    const n = cur.hits.length;
    cur.at = cur.at < 0 ? (dir > 0 ? 0 : n - 1) : (cur.at + dir + n) % n;
    show(true);
    sync();
  };
  const close = () => { cur = null; clear(); sync(); };
  function build() {
    const label = AP2.tint(h('span', {style: {fontSize: S.f.sm, fontWeight: S.fw.semi, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: '0 1 200px'}}), 'text');
    const count = AP2.tint(h('span', {style: {fontSize: S.f.sm, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums', marginRight: S.sp[1]}}), 'text2');
    const btn = (icon, turn, text, fn) => {
      const pic = AP2.icon(icon, 18);
      pic.style.transform = 'rotate(' + turn + 'deg)';
      const el = h('div', {style: {width: '34px', height: '34px', borderRadius: S.r.sm, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}, [pic]);
      el.title = text;
      return AP2.press(el, {fn, label: text, hover: (c) => ({backgroundColor: c.hover}), base: (c) => ({color: c.text2, backgroundColor: 'transparent'})});
    };
    const bar = h('div', {attrs: {role: 'search', 'aria-label': 'Fundstellen auf dieser Seite'}, style: {position: 'fixed', right: '16px', bottom: '16px', display: 'none',
      alignItems: 'center', gap: S.sp[2], padding: '6px 6px 6px 14px', borderRadius: S.r.md, border: '1px solid', boxSizing: 'border-box',
      zIndex: S.z.topbar, boxShadow: '0 6px 24px rgba(0,0,0,0.22)'}}, [label, count, btn('chevron', -90, 'Vorherige Fundstelle', () => step(-1)),
      btn('chevron', 90, 'Nächste Fundstelle', () => step(1)), btn('close', 0, 'Markierungen entfernen (Esc)', close)]);
    AP2.theme.bind(bar, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
    AP2.layout.bind((L) => { bar.style.maxWidth = (L.w - 32) + 'px'; });
    document.body.appendChild(bar);
    return {bar, label, count};
  }
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && cur && ev.target.tagName !== 'INPUT') close(); });
  AP2.find = {
    // hit: {si, a} aus der Suche oder null (nur markieren, nicht springen).
    open(id, terms, hit, shown) {
      const hits = AP2.search.marks(id, terms);
      cur = hits.length ? {id, shown, hits, at: hit ? hits.findIndex((x) => x.si === hit.si && x.a <= hit.a && hit.a < x.b) : -1} : null;
      if (AP2.router.current() === id) { show(true); sync(); } else AP2.router.go(id);
    },
    // Nach jedem Seitenaufbau: Markierungen der Zielseite setzen, sonst die Suche beenden.
    apply(el) {
      root = el;
      marks = [];
      framed = [];
      if (cur && cur.id !== AP2.router.current()) cur = null;
      show(false);
      sync();
    },
    step,
    close,
  };
})();
