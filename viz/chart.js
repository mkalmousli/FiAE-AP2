// Balken- und Liniendiagramme mit Achsen, Gitternetz und Legende.
(function () {
  const {h, svg, st} = AP2;
  const S = AP2.S;
  const COLORS = ['accent', 'text', 'text3', 'ok', 'bad'];
  const M = {l: 58, r: 20, t: 38, b: 44};
  const niceMax = (val) => {
    const pow = Math.pow(10, Math.floor(Math.log10(val || 1)));
    const step = [1, 2, 2.5, 5, 10].find((s) => s * pow >= val / 1) || 10;
    return step * pow;
  };
  const grid = (g, paint, cfg, plot, ymax) => {
    for (let i = 0; i <= 4; i++) {
      const y = M.t + plot.h - (plot.h * i) / 4;
      g.appendChild(paint(svg('line', {x1: M.l, x2: M.l + plot.w, y1: y, y2: y}), {s: 'border', sw: 1}));
      AP2.shapes.text(g, paint, M.l - 8, y, String(Math.round((ymax * i) / 4 * 100) / 100), {anchor: 'end', size: 11, color: 'text3'});
    }
    if (cfg.yl) AP2.shapes.text(g, paint, M.l, 16, cfg.yl, {anchor: 'start', size: 12, color: 'text2'});
  };
  const bars = (g, paint, cfg, plot, ymax) => {
    const groupW = plot.w / cfg.labels.length;
    const barW = (groupW * 0.62) / cfg.series.length;
    cfg.labels.forEach((label, i) => {
      AP2.shapes.text(g, paint, M.l + groupW * (i + 0.5), M.t + plot.h + 18, String(label), {size: 12, color: 'text2'});
      cfg.series.forEach((s, j) => {
        const bh = (Math.min(s.d[i], ymax) / ymax) * plot.h;
        const x = M.l + groupW * i + groupW * 0.19 + barW * j;
        g.appendChild(paint(svg('rect', {x, y: M.t + plot.h - bh, width: barW - 3, height: bh, rx: 3}), {f: s.k || COLORS[j]}));
        if (cfg.vals) AP2.shapes.text(g, paint, x + (barW - 3) / 2, M.t + plot.h - bh - 9, String(s.d[i]), {size: 11, color: 'text2'});
      });
    });
  };
  const lines = (g, paint, cfg, plot, ymax) => {
    const xs = cfg.labels.map((l, i) => M.l + (plot.w * i) / (cfg.labels.length - 1));
    cfg.labels.forEach((label, i) => AP2.shapes.text(g, paint, xs[i], M.t + plot.h + 18, String(label), {size: 12, color: 'text2'}));
    cfg.series.forEach((s, j) => {
      const pts = s.d.map((v, i) => xs[i].toFixed(1) + ',' + (M.t + plot.h - (Math.min(v, ymax) / ymax) * plot.h).toFixed(1));
      g.appendChild(paint(svg('polyline', {points: pts.join(' ')}), {s: s.k || COLORS[j], sw: 2.5, dash: s.dash}));
    });
  };
  const legend = (g, paint, cfg, width) => {
    let x = width - M.r;
    cfg.series.slice().reverse().forEach((s, ri) => {
      const j = cfg.series.length - 1 - ri;
      const txt = AP2.shapes.text(g, paint, x, 16, s.n, {anchor: 'end', size: 12, color: 'text2'});
      x -= s.n.length * 6.6 + 24;
      g.appendChild(paint(svg('rect', {x: x + 8, y: 11, width: 11, height: 11, rx: 2}), {f: s.k || COLORS[j]}));
      x -= 12;
      return txt;
    });
  };
  AP2.blocks.chart = (cfg) => {
    const width = cfg.w || 720;
    const height = cfg.h || 340;
    const plot = {w: width - M.l - M.r, h: height - M.t - M.b};
    const root = svg('svg', {viewBox: '0 0 ' + width + ' ' + height, role: 'img', 'aria-label': cfg.cap || 'Diagramm'});
    st(root, {width: '100%', height: 'auto', display: 'block', fontFamily: S.font.sans});
    const paint = AP2.paint(root);
    const ymax = cfg.ymax || niceMax(Math.max(...[].concat(...cfg.series.map((s) => s.d))));
    grid(root, paint, cfg, plot, ymax);
    (cfg.kind === 'line' ? lines : bars)(root, paint, cfg, plot, ymax);
    if (cfg.series.length > 1 || cfg.legend) legend(root, paint, cfg, width);
    const box = h('div', {style: {border: '1px solid', borderRadius: S.r.md, padding: S.sp[3], margin: '0 0 ' + S.sp[5]}}, [root]);
    if (cfg.cap) box.appendChild(AP2.tint(h('div', {text: cfg.cap, style: {fontSize: S.f.sm, textAlign: 'center', marginTop: S.sp[2]}}), 'text2'));
    return AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
  };
})();
