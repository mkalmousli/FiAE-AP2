// Knotenformen und Textausgabe für Diagramme (SVG-Beschreibungen, Farben kommen aus dem Theme).
(function () {
  const {svg} = AP2;
  const rect = (n, rx) => [{tag: 'rect', a: {x: n.x - n.w / 2, y: n.y - n.h / 2, width: n.w, height: n.h, rx}}];
  const poly = (list) => [{tag: 'polygon', a: {points: list.map((p) => p.join(',')).join(' ')}}];
  const path = (d, o) => ({tag: 'path', a: {d}, o});
  const edges = (n) => ({l: n.x - n.w / 2, r: n.x + n.w / 2, t: n.y - n.h / 2, b: n.y + n.h / 2});
  const SHAPES = {
    box: (n) => rect(n, 4),
    round: (n) => rect(n, 12),
    term: (n) => rect(n, n.h / 2),
    oval: (n) => [{tag: 'ellipse', a: {cx: n.x, cy: n.y, rx: n.w / 2, ry: n.h / 2}}],
    circle: (n) => [{tag: 'ellipse', a: {cx: n.x, cy: n.y, rx: n.w / 2, ry: n.h / 2}}],
    diamond: (n) => { const e = edges(n); return poly([[n.x, e.t], [e.r, n.y], [n.x, e.b], [e.l, n.y]]); },
    para: (n) => { const e = edges(n); return poly([[e.l + 14, e.t], [e.r, e.t], [e.r - 14, e.b], [e.l, e.b]]); },
    proc2: (n) => { const e = edges(n); return rect(n, 2).concat([path('M' + (e.l + 10) + ' ' + e.t + 'V' + e.b + 'M' + (e.r - 10) + ' ' + e.t + 'V' + e.b, {s: 'line', f: null, sw: 1.5})]); },
    note: (n) => { const e = edges(n); return poly([[e.l, e.t], [e.r - 12, e.t], [e.r, e.t + 12], [e.r, e.b], [e.l, e.b]]); },
    group: (n) => rect(n, 10).map((d) => Object.assign(d, {o: {s: 'line', f: null, sw: 1.2, dash: '6 4'}})),
    bar: (n) => rect(n, 2).map((d) => Object.assign(d, {o: {s: 'line', f: 'line', sw: 1}})),
    dot: (n) => [{tag: 'circle', a: {cx: n.x, cy: n.y, r: n.w / 2}, o: {s: 'line', f: 'line', sw: 1}}],
    ring: (n) => [{tag: 'circle', a: {cx: n.x, cy: n.y, r: n.w / 2}, o: {s: 'line', f: 'surface', sw: 2}},
      {tag: 'circle', a: {cx: n.x, cy: n.y, r: n.w / 2 - 5}, o: {s: 'line', f: 'line', sw: 1}}],
    cyl: (n) => { const e = edges(n); const ry = 9; const w = n.w;
      return [path('M' + e.l + ' ' + (e.t + ry) + 'a' + (w / 2) + ' ' + ry + ' 0 0 1 ' + w + ' 0v' + (n.h - 2 * ry) + 'a' + (w / 2) + ' ' + ry + ' 0 0 1 ' + (-w) + ' 0z', {}),
        path('M' + e.l + ' ' + (e.t + ry) + 'a' + (w / 2) + ' ' + ry + ' 0 0 0 ' + w + ' 0', {s: 'line', f: null, sw: 1.5})]; },
    actor: (n) => { const e = edges(n); const cx = n.x; const top = e.t;
      return [{tag: 'circle', a: {cx, cy: top + 8, r: 8}}, path('M' + cx + ' ' + (top + 16) + 'V' + (top + 36) + 'M' + (cx - 14) + ' ' + (top + 24) + 'H' + (cx + 14) + 'M' + cx + ' ' + (top + 36) + 'L' + (cx - 11) + ' ' + (top + 52) + 'M' + cx + ' ' + (top + 36) + 'L' + (cx + 11) + ' ' + (top + 52), {s: 'line', f: null, sw: 1.5})]; },
    text: () => [],
  };
  // Text mit optionalem Halo (liest sich auch über Linien).
  const text = (g, paint, x, y, str, o) => {
    const opt = o || {};
    const el = svg('text', {x, y, 'text-anchor': opt.anchor || 'middle', 'dominant-baseline': 'central', 'font-size': opt.size || 13});
    el.textContent = str;
    el.style.fontWeight = opt.bold ? '600' : '400';
    if (opt.halo) el.style.paintOrder = 'stroke';
    g.appendChild(paint(el, {f: opt.color || 'text', s: opt.halo ? 'surface' : null, sw: opt.halo ? 4 : 0}));
    return el;
  };
  AP2.shapes = {make: (n) => (SHAPES[n.k || 'box'] || SHAPES.box)(n), text};
})();
