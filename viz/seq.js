// Sequenzdiagramm: Lebenslinien und Nachrichten (auch für Protokolle wie TLS oder Kerberos).
(function () {
  const {h, svg, st} = AP2;
  const S = AP2.S;
  const GAP = 44;
  const TOP = 92;
  const idxOf = (cfg, ref) => (typeof ref === 'number' ? ref : cfg.actors.indexOf(ref));
  const header = (g, paint, x, name) => {
    const width = Math.max(110, name.length * 8 + 28);
    g.appendChild(paint(svg('rect', {x: x - width / 2, y: 12, width, height: 36, rx: 6}), {s: 'accent', f: 'accentSoft', sw: 1.5}));
    AP2.shapes.text(g, paint, x, 30, name, {bold: true});
  };
  const arrow = (g, paint, x1, x2, y, kind) => {
    g.appendChild(paint(svg('line', {x1, x2, y1: y, y2: y}), {s: 'line', sw: 1.5, dash: kind === 'r' ? '6 4' : null}));
    AP2.marks.describe(kind === 'a' || kind === 'r' ? 'open' : 'arrow', [x2, y], [x1, y])
      .forEach((d) => g.appendChild(paint(svg(d.tag, d.a), Object.assign({s: 'line', f: null, sw: 1.5}, d.o))));
  };
  const selfCall = (g, paint, x, y, label) => {
    g.appendChild(paint(svg('path', {d: 'M' + x + ' ' + (y - 8) + 'h30v16h-30'}), {s: 'line', sw: 1.5}));
    AP2.marks.describe('arrow', [x, y + 8], [x + 12, y + 8]).forEach((d) => g.appendChild(paint(svg(d.tag, d.a), Object.assign({s: 'line', f: null, sw: 1.5}, d.o))));
    AP2.shapes.text(g, paint, x + 38, y, label, {anchor: 'start', size: 12, color: 'text2'});
  };
  const note = (g, paint, x, y, txt) => {
    const width = txt.length * 7 + 24;
    g.appendChild(paint(svg('rect', {x: x - width / 2, y: y - 14, width, height: 28, rx: 4}), {s: 'line', f: 'surface2', sw: 1.2}));
    AP2.shapes.text(g, paint, x, y, txt, {size: 12});
  };
  const sep = (g, paint, width, y, txt) => {
    g.appendChild(paint(svg('line', {x1: 16, x2: width - 16, y1: y, y2: y}), {s: 'accent', sw: 1.2, dash: '3 4'}));
    AP2.shapes.text(g, paint, 24, y - 12, txt, {anchor: 'start', size: 12, bold: true, color: 'accent', halo: true});
  };
  AP2.blocks.seq = (cfg) => {
    const width = cfg.w || 720;
    const height = TOP + cfg.steps.length * GAP + 10;
    const root = svg('svg', {viewBox: '0 0 ' + width + ' ' + height, role: 'img', 'aria-label': cfg.cap || 'Sequenzdiagramm'});
    st(root, {width: '100%', height: 'auto', display: 'block', fontFamily: S.font.sans});
    const paint = AP2.paint(root);
    const span = cfg.actors.length > 1 ? (width - 160) / (cfg.actors.length - 1) : 0;
    const xs = cfg.actors.map((name, idx) => 80 + idx * span);
    xs.forEach((x, idx) => {
      root.appendChild(paint(svg('line', {x1: x, x2: x, y1: 48, y2: height - 4}), {s: 'line', sw: 1, dash: '5 5'}));
      header(root, paint, x, cfg.actors[idx]);
    });
    cfg.steps.forEach((step, i) => {
      const y = TOP + i * GAP;
      if (step[0] === 'note') return note(root, paint, xs[idxOf(cfg, step[1])], y, step[2]);
      if (step[0] === 'sep') return sep(root, paint, width, y, step[1]);
      const from = xs[idxOf(cfg, step[0])];
      const to = xs[idxOf(cfg, step[1])];
      if (from === to) return selfCall(root, paint, from, y, step[2]);
      arrow(root, paint, from, to, y, step[3]);
      return AP2.shapes.text(root, paint, (from + to) / 2, y - 12, step[2], {size: 12, color: 'text2', halo: true});
    });
    const box = h('div', {style: {border: '1px solid', borderRadius: S.r.md, padding: S.sp[3], margin: '0 0 ' + S.sp[5]}}, [root]);
    if (cfg.cap) box.appendChild(AP2.tint(h('div', {text: cfg.cap, style: {fontSize: S.f.sm, textAlign: 'center', marginTop: S.sp[2]}}), 'text2'));
    return AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
  };
})();
