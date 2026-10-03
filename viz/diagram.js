// Allgemeine Diagramm-Engine: Knoten und Kanten als Daten, gezeichnet als SVG.
(function () {
  const {h, svg, st} = AP2;
  const S = AP2.S;
  const STYLE = {
    plain: {p: {s: 'line', f: 'surface'}, t: 'text'}, soft: {p: {s: 'line', f: 'surface2'}, t: 'text'},
    accent: {p: {s: 'accent', f: 'accentSoft'}, t: 'text'}, solid: {p: {s: 'accent', f: 'accent'}, t: 'onAccent'},
    ok: {p: {s: 'ok', f: 'okSoft'}, t: 'text'}, bad: {p: {s: 'bad', f: 'badSoft'}, t: 'text'},
    ghost: {p: {s: 'line', f: null, dash: '5 4'}, t: 'text2'}, clear: {p: {s: 'line', f: null}, t: 'text'}, none: {p: {s: null, f: null}, t: 'text'},
  };
  const SIZE = {dot: [14, 14], ring: [20, 20], bar: [70, 7], actor: [40, 56]};
  const prep = (n) => {
    const lines = [].concat(n.t || '');
    const wide = Math.max(...lines.map((s) => String(s).length)) * 7 + 30;
    const size = SIZE[n.k] || [wide, lines.length * 17 + 18];
    if (n.k === 'diamond') { size[0] = wide * 1.5; size[1] = lines.length * 17 + 34; }
    if (n.k === 'oval' || n.k === 'circle') { size[0] = wide + 16; size[1] = lines.length * 17 + 24; }
    n.w = n.w || size[0];
    n.h = n.h || size[1];
    if (n.k === 'cls') n.h = AP2.clsHeight(n);
  };
  const drawNode = (n, g, paint) => {
    if (n.k === 'cls') return AP2.drawClass(n, g, paint);
    const style = STYLE[n.s || 'plain'];
    AP2.shapes.make(n).forEach((d) => g.appendChild(paint(svg(d.tag, d.a), Object.assign({sw: 1.5}, style.p, d.o))));
    const lines = [].concat(n.t || []);
    if (n.k === 'group') return AP2.shapes.text(g, paint, n.x - n.w / 2 + 12, n.y - n.h / 2 + 15, lines[0] || '', {anchor: 'start', size: 12, bold: true, color: 'text2'});
    const textY = n.k === 'actor' ? n.y + n.h / 2 + 12 : n.y - ((lines.length - 1) * 17) / 2;
    return lines.forEach((txt, idx) => AP2.shapes.text(g, paint, n.x, textY + idx * 17, String(txt),
      {size: n.fs || 13, bold: n.b && idx === 0, color: n.tc || style.t, anchor: n.anchorEnd ? 'end' : null}));
  };
  const route = (e, nodes) => {
    const a = typeof e.a === 'string' ? nodes[e.a] : e.a;
    const b = typeof e.b === 'string' ? nodes[e.b] : e.b;
    const via = e.via || [];
    const toward = (ref, other) => (Array.isArray(ref) ? ref : AP2.geom.anchor(ref, other[0], other[1]));
    const p0 = toward(a, via[0] || AP2.geom.center(b));
    const p1 = toward(b, via.length ? via[via.length - 1] : p0);
    return [p0].concat(via, [p1]);
  };
  const drawEdge = (e, g, paint, nodes) => {
    const pts = route(e, nodes);
    const o = {s: e.s || 'line', f: null, sw: e.w || 1.5, dash: e.k === 'dash' ? '6 4' : null};
    g.appendChild(paint(svg('path', {d: AP2.toPath(pts, e.sm)}), o));
    const end = pts.length - 1;
    const kinds = [[e.sa, pts[0], pts[1]], [e.ea === undefined && e.k !== 'plain' ? 'arrow' : e.ea, pts[end], pts[end - 1]]];
    kinds.forEach(([kind, tip, other]) => AP2.marks.describe(kind, tip, other)
      .forEach((d) => g.appendChild(paint(svg(d.tag, d.a), Object.assign({s: 'line', f: null, sw: 1.5}, d.o)))));
    return pts;
  };
  const edgeLabels = (e, pts, g, paint) => {
    const mid = Math.floor((pts.length - 1) / 2);
    const lo = e.lo || [0, -11];
    const mx = (pts[mid][0] + pts[mid + 1][0]) / 2 + lo[0];
    const my = (pts[mid][1] + pts[mid + 1][1]) / 2 + lo[1];
    if (e.t) AP2.shapes.text(g, paint, mx, my, e.t, {size: 12, halo: true, color: 'text2'});
    const near = (p, q, txt, off) => {
      const len = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
      const ux = (q[0] - p[0]) / len;
      const uy = (q[1] - p[1]) / len;
      AP2.shapes.text(g, paint, p[0] + ux * 22 - uy * off, p[1] + uy * 22 + ux * off, txt, {size: 12, halo: true, color: 'text2'});
    };
    if (e.ta) near(pts[0], pts[1], e.ta, 13);
    if (e.tb) near(pts[pts.length - 1], pts[pts.length - 2], e.tb, -13);
  };
  const wrap = (root, cfg) => {
    const box = h('div', {style: {border: '1px solid', borderRadius: S.r.md, padding: S.sp[3], margin: '0 0 ' + S.sp[5]}}, [root]);
    if (cfg.cap) box.appendChild(AP2.tint(h('div', {text: cfg.cap, style: {fontSize: S.f.sm, textAlign: 'center', marginTop: S.sp[2]}}), 'text2'));
    if (cfg.keep) keepWidth(box, root, cfg.keep);
    return AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
  };
  // Breite Diagramme: nie schmaler als "keep" Pixel, darunter scrollt der Rahmen.
  const keepWidth = (box, root, keep) => {
    box.style.overflowX = 'auto';
    let seen = false;
    const off = AP2.layout.bind((L) => {
      if (box.isConnected) seen = true; else if (seen) { off(); return; }
      root.style.width = Math.max(keep, L.contentW - 2 * (S.sp[3] + 1)) + 'px';
    });
  };
  AP2.blocks.diagram = (cfg) => {
    const root = svg('svg', {viewBox: '0 0 ' + cfg.w + ' ' + cfg.h, role: 'img', 'aria-label': cfg.cap || 'Diagramm'});
    st(root, {width: '100%', height: 'auto', display: 'block', fontFamily: S.font.sans});
    const paint = AP2.paint(root);
    const nodes = {};
    (cfg.nodes || []).forEach((n) => { prep(n); nodes[n.id] = n; });
    const list = cfg.nodes || [];
    list.filter((n) => n.k === 'group').forEach((n) => drawNode(n, root, paint));
    const labels = (cfg.edges || []).map((e) => [e, drawEdge(e, root, paint, nodes)]);
    list.filter((n) => n.k !== 'group').forEach((n) => drawNode(n, root, paint));
    labels.forEach(([e, pts]) => edgeLabels(e, pts, root, paint));
    return wrap(root, cfg);
  };
})();
