// Pfadtext für SVG: Linienzug oder weiche Kurve durch Punkte.
(function () {
  const toPath = (pts, smooth) => {
    if (!smooth || pts.length < 3) return 'M' + pts.map((p) => p.join(' ')).join('L');
    let d = 'M' + pts[0].join(' ');
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      d += 'C' + [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]].join(' ');
    }
    return d;
  };
  AP2.toPath = toPath;
})();
