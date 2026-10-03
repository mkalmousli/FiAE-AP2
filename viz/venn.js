// Venn-Diagramm für JOIN-Arten: Mengen A und B, markierter Bereich je nach Modus.
(function () {
  const {h, svg, st} = AP2;
  const S = AP2.S;
  const W = 240;
  const H = 150;
  const CA = 92;
  const CB = 148;
  const R = 58;
  const MODES = {
    inner: {fillA: false, fillB: false, inter: true}, left: {fillA: true, fillB: false, inter: true}, right: {fillA: false, fillB: true, inter: true},
    full: {fillA: true, fillB: true, inter: true}, leftOnly: {fillA: true, fillB: false, inter: false}, rightOnly: {fillA: false, fillB: true, inter: false},
    outer: {fillA: true, fillB: true, inter: false},
  };
  const circle = (cx, paintFn, o, extra) => paintFn(svg('circle', Object.assign({cx, cy: 70, r: R}, extra || {})), o);
  const figure = (mode, label, sub) => {
    const root = svg('svg', {viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': label});
    st(root, {width: '100%', height: 'auto', display: 'block', fontFamily: S.font.sans});
    const paint = AP2.paint(root);
    const m = MODES[mode];
    const id = 'vc' + Math.floor(Math.random() * 1e9);
    const clip = svg('clipPath', {id}, [svg('circle', {cx: CA, cy: 70, r: R})]);
    root.appendChild(clip);
    if (m.fillA) root.appendChild(circle(CA, paint, {f: 'accent'}));
    if (m.fillB) root.appendChild(circle(CB, paint, {f: 'accent'}));
    if (m.inter && !m.fillA && !m.fillB) root.appendChild(circle(CB, paint, {f: 'accent'}, {'clip-path': 'url(#' + id + ')'}));
    if (!m.inter) root.appendChild(circle(CB, paint, {f: 'surface'}, {'clip-path': 'url(#' + id + ')'}));
    if (m.inter && m.fillA !== m.fillB && (m.fillA || m.fillB)) root.appendChild(circle(CB, paint, {f: 'accent'}, {'clip-path': 'url(#' + id + ')'}));
    root.appendChild(circle(CA, paint, {s: 'line', sw: 2}));
    root.appendChild(circle(CB, paint, {s: 'line', sw: 2}));
    AP2.shapes.text(root, paint, CA - 22, 70, 'A', {size: 18, bold: true, color: 'text', halo: true});
    AP2.shapes.text(root, paint, CB + 22, 70, 'B', {size: 18, bold: true, color: 'text', halo: true});
    const cap = AP2.tint(h('div', {text: label, style: {fontWeight: S.fw.semi, fontSize: S.f.sm, textAlign: 'center'}}), 'text');
    const subEl = AP2.tint(h('div', {text: sub || '', style: {fontSize: S.f.xs, textAlign: 'center'}}), 'text2');
    return h('div', {style: {flex: '1 1 200px', padding: S.sp[3], border: '1px solid', borderRadius: S.r.md, margin: '0 0 ' + S.sp[3]}}, [root, cap, subEl]);
  };
  AP2.blocks.venn = (items) => {
    const row = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3]}}, items.map((it) => figure(it[0], it[1], it[2])));
    row.querySelectorAll(':scope > div').forEach((el) => AP2.theme.bind(el, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; }));
    return row;
  };
})();
