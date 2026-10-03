// Linienenden: Pfeile, UML-Symbole (Dreieck, Raute) und ER-Krähenfüße als SVG-Beschreibungen.
(function () {
  const bar = (u) => ({tag: 'polyline', pts: [[u, -6], [u, 6]]});
  const ring = (u) => ({tag: 'circle', c: [u, 0], r: 4, o: {s: 'line', f: 'surface'}});
  const crow = [{tag: 'polyline', pts: [[13, 0], [0, -6]]}, {tag: 'polyline', pts: [[13, 0], [0, 6]]}, {tag: 'polyline', pts: [[13, 0], [0, 0]]}];
  const MARKS = {
    arrow: [{tag: 'polygon', pts: [[0, 0], [11, -5], [11, 5]], o: {s: 'line', f: 'line'}}],
    open: [{tag: 'polyline', pts: [[11, -5], [0, 0], [11, 5]]}],
    tri: [{tag: 'polygon', pts: [[0, 0], [14, -7], [14, 7]], o: {s: 'line', f: 'surface'}}],
    dia: [{tag: 'polygon', pts: [[0, 0], [9, -5], [18, 0], [9, 5]], o: {s: 'line', f: 'surface'}}],
    diaf: [{tag: 'polygon', pts: [[0, 0], [9, -5], [18, 0], [9, 5]], o: {s: 'line', f: 'line'}}],
    one: [bar(8)],
    oneone: [bar(8), bar(13)],
    many: crow,
    onemany: crow.concat([bar(17)]),
    zeroone: [ring(18), bar(8)],
    zeromany: crow.concat([ring(19)]),
  };
  // Liefert Beschreibungen in globalen Koordinaten; tip = Spitze, other = Punkt auf der Linie.
  const describe = (kind, tip, other) => {
    const dx = other[0] - tip[0];
    const dy = other[1] - tip[1];
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const map = (p) => [tip[0] + p[0] * ux - p[1] * uy, tip[1] + p[0] * uy + p[1] * ux];
    return (MARKS[kind] || []).map((d) => {
      if (d.tag === 'circle') {
        const c = map(d.c);
        return {tag: 'circle', a: {cx: c[0], cy: c[1], r: d.r}, o: d.o};
      }
      const pts = d.pts.map((p) => map(p).map((v) => v.toFixed(1)).join(',')).join(' ');
      return {tag: d.tag, a: {points: pts}, o: d.o};
    });
  };
  AP2.marks = {describe};
})();
