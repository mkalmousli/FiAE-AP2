// Geräte-Illustrationen (Router, Switch, Server ...) als themefähige SVGs plus Galerie-Block.
(function () {
  const {h, svg, st} = AP2;
  const S = AP2.S;
  // Stile: body = Gehäuse, soft = Akzentfläche, acc = Akzent, ln = nur Linie, ok/bad = LEDs, dk = dunkle Fläche
  const ST = {
    body: {s: 'line', f: 'surface', sw: 2}, soft: {s: 'line', f: 'accentSoft', sw: 2}, acc: {s: 'accent', f: 'accent', sw: 1.5},
    ln: {s: 'line', sw: 2}, accln: {s: 'accent', sw: 2.5}, ok: {f: 'ok'}, bad: {f: 'bad'}, dk: {s: 'line', f: 'text3', sw: 1.5}, dot: {f: 'line'},
  };
  const R = (x, y, w, h2, st2, rx) => ['rect', {x, y, width: w, height: h2, rx: rx === undefined ? 4 : rx}, st2];
  const C = (cx, cy, r, st2) => ['circle', {cx, cy, r}, st2];
  const L = (x1, y1, x2, y2, st2) => ['line', {x1, y1, x2, y2, 'stroke-linecap': 'round'}, st2 || 'ln'];
  const P = (d, st2) => ['path', {d, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}, st2 || 'ln'];
  const E = (cx, cy, rx, ry, st2) => ['ellipse', {cx, cy, rx, ry}, st2];
  const ports = (x, y, n, gap, w, st2) => Array.from({length: n}, (_, i) => R(x + i * gap, y, w, w, st2 || 'dk', 1.5));
  const leds = (x, y, n, gap, st2) => Array.from({length: n}, (_, i) => C(x + i * gap, y, 2.6, st2 || 'ok'));
  const rack = (y, label) => [R(14, y, 92, 16, 'body', 3), ...leds(22, y + 8, 2, 8), L(44, y + 8, 98, y + 8, 'dot')];
  const GEAR = {
    router: [L(34, 30, 24, 8), L(86, 30, 96, 8), C(24, 8, 3.5, 'acc'), C(96, 8, 3.5, 'acc'), R(8, 30, 104, 34, 'soft', 6),
      ...ports(62, 42, 4, 12, 9), ...leds(20, 47, 3, 9), L(20, 58, 50, 58, 'dot'), P('M60 28q0 0 0 0')],
    switch: [R(6, 26, 108, 30, 'body', 5), ...ports(14, 34, 8, 12, 9), ...ports(14, 45, 8, 12, 9, 'soft'), ...leds(18, 31, 8, 12), R(98, 24, 0, 0, 'dot')],
    hub: [R(10, 30, 100, 26, 'body', 5), ...ports(20, 38, 6, 14, 10), R(14, 22, 4, 8, 'dot', 1), R(102, 22, 4, 8, 'dot', 1), L(16, 62, 104, 62, 'dot')],
    firewall: [R(8, 10, 104, 58, 'body', 4), L(8, 29, 112, 29), L(8, 48, 112, 48), L(40, 10, 40, 29), L(76, 10, 76, 29), L(24, 29, 24, 48), L(58, 29, 58, 48), L(94, 29, 94, 48),
      L(40, 48, 40, 68), L(76, 48, 76, 68), P('M60 20q-9 9-4 16q-2-4 2-7q1 5 6 4q-3 6 1 9q8-8-5-22z', 'bad')],
    ap: [E(60, 60, 34, 9, 'soft'), R(52, 40, 16, 20, 'body', 3), L(48, 62, 72, 62, 'dot'), C(60, 32, 4, 'acc'), P('M46 30a16 16 0 0 1 28 0', 'accln'), P('M38 24a26 26 0 0 1 44 0', 'accln'), P('M30 18a36 36 0 0 1 60 0', 'accln'), ...leds(50, 66, 3, 10)],
    modem: [R(10, 36, 100, 28, 'body', 6), ...leds(22, 50, 4, 10), L(66, 50, 96, 50, 'dot'), P('M30 36q0-24 30-24t30 24', 'accln'), P('M42 36q0-14 18-14t18 14', 'accln')],
    server: [R(14, 4, 92, 18, 'body', 3), ...leds(22, 13, 2, 8), ...ports(60, 9, 5, 9, 8), R(14, 26, 92, 18, 'body', 3), ...leds(22, 35, 2, 8), L(60, 35, 98, 35, 'dot'),
      R(14, 48, 92, 18, 'soft', 3), ...leds(22, 57, 2, 8), L(60, 57, 98, 57, 'dot'), L(24, 72, 24, 76), L(96, 72, 96, 76)],
    rack: [R(22, 2, 76, 76, 'body', 4), L(22, 14, 98, 14), L(22, 26, 98, 26), L(22, 38, 98, 38), L(22, 50, 98, 50), L(22, 62, 98, 62),
      ...leds(30, 8, 3, 7), ...leds(30, 20, 3, 7), ...ports(60, 29, 4, 9, 6), ...leds(30, 44, 3, 7), L(62, 44, 90, 44, 'dot'), R(28, 53, 64, 6, 'soft', 1), ...leds(30, 70, 3, 7), L(62, 70, 90, 70, 'dot')],
    pc: [R(26, 6, 58, 42, 'body', 4), R(32, 12, 46, 30, 'soft', 2), L(55, 48, 55, 58), L(42, 58, 68, 58), R(90, 14, 22, 52, 'body', 3), C(101, 24, 3, 'ok'), L(94, 36, 108, 36, 'dot'), L(94, 42, 108, 42, 'dot')],
    laptop: [R(22, 8, 76, 46, 'body', 4), R(28, 14, 64, 34, 'soft', 2), P('M8 58h104l-8 12H16z', 'body'), L(48, 64, 72, 64, 'dot')],
    nas: [R(24, 6, 72, 66, 'body', 5), R(32, 14, 56, 12, 'soft', 2), R(32, 30, 56, 12, 'soft', 2), R(32, 46, 56, 12, 'soft', 2), ...leds(80, 20, 1, 0), ...leds(80, 36, 1, 0), ...leds(80, 52, 1, 0, 'ok'), L(38, 64, 70, 64, 'dot')],
    hdd: [R(18, 8, 84, 62, 'body', 6), C(54, 39, 22, 'soft'), C(54, 39, 5, 'body'), P('M54 39L90 22', 'accln'), C(90, 22, 3, 'acc'), C(26, 16, 2, 'dot'), C(94, 62, 2, 'dot'), C(26, 62, 2, 'dot')],
    ssd: [R(12, 16, 96, 48, 'body', 5), R(22, 24, 50, 32, 'soft', 2), R(78, 24, 20, 14, 'dk', 2), ...ports(14, 66, 8, 5, 3, 'acc'), L(80, 48, 96, 48, 'dot')],
    tape: [R(24, 8, 72, 62, 'body', 5), C(46, 36, 12, 'soft'), C(74, 36, 12, 'soft'), C(46, 36, 4, 'body'), C(74, 36, 4, 'body'), R(36, 54, 48, 10, 'body', 2), L(46, 59, 74, 59, 'dot')],
    cloud: [P('M30 62a18 18 0 0 1-2-36a24 24 0 0 1 46-6a20 20 0 0 1 16 42z', 'soft'), ...ports(46, 40, 1, 0, 0), L(44, 46, 76, 46, 'dot'), L(48, 54, 72, 54, 'dot')],
    database: [P('M24 18v44a36 10 0 0 0 72 0V18', 'body'), E(60, 18, 36, 10, 'soft'), P('M24 34a36 10 0 0 0 72 0'), P('M24 48a36 10 0 0 0 72 0')],
    printer: [R(30, 6, 60, 22, 'body', 3), R(10, 28, 100, 28, 'soft', 5), R(30, 44, 60, 26, 'body', 2), L(38, 54, 82, 54, 'dot'), L(38, 61, 70, 61, 'dot'), C(98, 36, 2.5, 'ok')],
    patch: [R(6, 18, 108, 44, 'body', 4), ...ports(14, 26, 12, 8.4, 6, 'dk'), ...ports(14, 44, 12, 8.4, 6, 'dk'), ...Array.from({length: 12}, (_, i) => L(17 + i * 8.4, 33, 17 + i * 8.4, 41, 'dot'))],
    rj45: [R(30, 14, 60, 40, 'soft', 4), R(38, 4, 44, 14, 'body', 3), ...Array.from({length: 8}, (_, i) => L(38 + i * 6, 34, 38 + i * 6, 54, 'accln')), R(34, 54, 52, 16, 'body', 3), L(60, 70, 60, 78)],
    fiber: [P('M4 40h40', 'accln'), R(44, 28, 38, 24, 'soft', 4), R(82, 32, 22, 16, 'body', 2), R(104, 36, 10, 8, 'dk', 1), L(52, 20, 52, 28), L(72, 20, 72, 28)],
    twisted: [R(14, 24, 92, 32, 'body', 16), P('M22 32c12 0 12 16 24 16s12-16 24-16s12 16 24 16', 'accln'), P('M22 48c12 0 12-16 24-16s12 16 24 16s12-16 24-16', 'ln'), C(30, 40, 2, 'dot')],
    coax: [C(60, 40, 34, 'body'), C(60, 40, 24, 'soft'), C(60, 40, 14, 'body'), C(60, 40, 5, 'acc'), P('M40 22a30 30 0 0 1 40 0', 'ln')],
    ups: [R(20, 8, 80, 64, 'body', 6), R(30, 16, 40, 14, 'soft', 2), ...leds(82, 23, 1, 0), P('M56 40l-8 14h10l-4 12l14-18h-10l5-8z', 'acc'), ...ports(32, 36, 1, 0, 0)],
    phone: [R(38, 4, 44, 72, 'body', 8), R(43, 12, 34, 50, 'soft', 2), C(60, 69, 3, 'dot'), L(54, 8, 66, 8, 'dot')],
    usb: [R(22, 24, 60, 32, 'body', 6), R(82, 30, 26, 20, 'dk', 2), R(88, 35, 5, 4, 'body', 1), R(98, 35, 5, 4, 'body', 1), C(36, 40, 4, 'ok'), L(48, 40, 72, 40, 'dot')],
    cpu: [R(30, 14, 52, 52, 'soft', 4), R(42, 26, 28, 28, 'body', 3), ...Array.from({length: 4}, (_, i) => [L(38 + i * 12, 6, 38 + i * 12, 14), L(38 + i * 12, 66, 38 + i * 12, 74), L(22, 22 + i * 12, 30, 22 + i * 12), L(82, 22 + i * 12, 90, 22 + i * 12)]).flat()],
    lock: [R(30, 34, 60, 40, 'soft', 6), P('M42 34V24a18 18 0 0 1 36 0v10', 'accln'), C(60, 50, 5, 'body'), L(60, 55, 60, 64)],
    kvm: [R(14, 12, 92, 52, 'body', 4), R(20, 18, 80, 36, 'soft', 2), L(56, 64, 64, 64), L(40, 72, 80, 72)],
  };
  const draw = (name, size) => {
    const root = svg('svg', {viewBox: '0 0 120 80', role: 'img', 'aria-label': name});
    st(root, {width: size || '100%', height: 'auto', display: 'block'});
    const paint = AP2.paint(root);
    (GEAR[name] || []).forEach((p) => root.appendChild(paint(svg(p[0], p[1]), ST[p[2]] || ST.body)));
    return root;
  };
  AP2.gear = {draw, names: Object.keys(GEAR)};
  // Galerie: ['gear', [[icon, Name, Beschreibung], ...], Bildunterschrift?]
  AP2.blocks.gear = (items, cap) => {
    const cards = items.map((it) => {
      const pic = h('div', {style: {width: '100%', maxWidth: '150px', margin: '0 auto ' + S.sp[2]}}, [draw(it[0])]);
      const name = AP2.tint(h('div', {text: it[1], style: {fontWeight: S.fw.semi, fontSize: S.f.sm, textAlign: 'center'}}), 'text');
      const kids = [pic, name];
      if (it[2]) kids.push(AP2.tint(h('div', {text: it[2], style: {fontSize: S.f.xs, textAlign: 'center', marginTop: '2px', lineHeight: '1.4'}}), 'text2'));
      return AP2.theme.bind(h('div', {style: {padding: S.sp[3], borderRadius: S.r.md, border: '1px solid', boxSizing: 'border-box'}}, kids),
        (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
    });
    const grid = h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: S.sp[3], margin: '0 0 ' + S.sp[5]}}, cards);
    if (!cap) return grid;
    return h('figure', {style: {margin: '0 0 ' + S.sp[5]}}, [grid, AP2.tint(h('figcaption', {text: cap, style: {fontSize: S.f.sm, textAlign: 'center', marginTop: S.sp[2]}}), 'text2')]);
  };
})();
