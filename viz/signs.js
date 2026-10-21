// Sicherheitszeichen nach ASR A1.3 / DIN EN ISO 7010: Form und Farbe sind genormt, deshalb feste Farben statt Theme.
(function () {
  const {h, svg, st} = AP2;
  const S = AP2.S;
  const RED = '#d32f2f';
  const BLUE = '#1565c0';
  const YELLOW = '#f9c80e';
  const GREEN = '#2e7d32';
  const WHITE = '#ffffff';
  const BLACK = '#1a1a1a';
  const el = (tag, attrs) => svg(tag, attrs);
  // Symbole in der Mitte (vereinfacht): Ausrufezeichen, Pfeil, Kreuz, Flamme, Person.
  const glyph = (kind, color) => {
    if (kind === 'excl') return [el('rect', {x: 46, y: 26, width: 8, height: 30, rx: 3, fill: color}), el('circle', {cx: 50, cy: 66, r: 5, fill: color})];
    if (kind === 'arrow') return [el('path', {d: 'M28 50h36M52 36l16 14l-16 14', stroke: color, 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'})];
    if (kind === 'cross') return [el('path', {d: 'M42 26h16v16h16v16H58v16H42V58H26V42h16z', fill: color})];
    if (kind === 'flame') return [el('path', {d: 'M50 22c6 12 18 18 18 34a18 18 0 0 1-36 0c0-8 4-13 8-16c0 6 3 9 6 10c-2-10 0-20 4-28z', fill: color})];
    if (kind === 'bolt') return [el('path', {d: 'M54 24L36 54h12l-6 22l20-32H50z', fill: color})];
    if (kind === 'phone') return [el('rect', {x: 40, y: 26, width: 20, height: 40, rx: 4, fill: color})];
    if (kind === 'person') return [el('circle', {cx: 50, cy: 32, r: 7, fill: color}), el('path', {d: 'M50 42v18M38 50h24M50 60l-9 14M50 60l9 14', stroke: color, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none'})];
    return [];
  };
  const SHAPE = {
    verbot: (g) => [el('circle', {cx: 50, cy: 50, r: 40, fill: WHITE, stroke: RED, 'stroke-width': 10})].concat(glyph(g, BLACK), [el('line', {x1: 22, y1: 22, x2: 78, y2: 78, stroke: RED, 'stroke-width': 9})]),
    gebot: (g) => [el('circle', {cx: 50, cy: 50, r: 44, fill: BLUE})].concat(glyph(g, WHITE)),
    warn: (g) => [el('path', {d: 'M50 8L94 86H6z', fill: YELLOW, stroke: BLACK, 'stroke-width': 5, 'stroke-linejoin': 'round'})].concat(glyph(g, BLACK).map((n) => { n.setAttribute('transform', 'translate(0 8) scale(1)'); return n; })),
    rettung: (g) => [el('rect', {x: 6, y: 6, width: 88, height: 88, rx: 6, fill: GREEN})].concat(glyph(g, WHITE)),
    brand: (g) => [el('rect', {x: 6, y: 6, width: 88, height: 88, rx: 6, fill: RED})].concat(glyph(g, WHITE)),
  };
  // items: [art, Symbol, Titel, Beschreibung]
  AP2.blocks.signs = (items, cap) => {
    const cards = items.map(([kind, g, title, desc]) => {
      const pic = svg('svg', {viewBox: '0 0 100 100', width: 72, height: 72, role: 'img', 'aria-label': title}, SHAPE[kind](g));
      st(pic, {display: 'block', flexShrink: 0});
      const t = AP2.tint(h('div', {text: title, style: {fontWeight: S.fw.bold, fontSize: S.f.sm}}), 'text');
      const d = AP2.tint(h('div', {text: desc, style: {fontSize: S.f.xs, lineHeight: '1.45', marginTop: '2px'}}), 'text2');
      const card = h('div', {style: {flex: '1 1 220px', display: 'flex', gap: S.sp[3], alignItems: 'center', padding: '10px 12px', borderRadius: S.r.md, border: '1px solid'}}, [pic, h('div', {}, [t, d])]);
      return AP2.theme.bind(card, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
    });
    const box = h('div', {style: {margin: '0 0 ' + S.sp[5]}}, [h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2]}}, cards)]);
    if (cap) box.appendChild(AP2.tint(h('div', {text: cap, style: {fontSize: S.f.sm, textAlign: 'center', marginTop: S.sp[2]}}), 'text2'));
    return box;
  };
})();
