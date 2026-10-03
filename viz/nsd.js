// Struktogramm (Nassi-Shneiderman): rekursiver Aufbau aus act, if, while, for, until, case.
(function () {
  const AH = 34;
  const IH = 48;
  const LH = 30;
  const IND = 26;
  const seqH = (list, w) => list.reduce((sum, it) => sum + height(it, w), 0);
  const height = (it, w) => {
    const kind = it[0];
    if (kind === 'act') return AH;
    if (kind === 'if') return IH + Math.max(seqH(it[2], w / 2), seqH(it[3] || [], w / 2), AH);
    if (kind === 'case') return IH + 24 + Math.max(...it[2].map((c) => seqH(c[1], w / it[2].length)));
    return LH + seqH(it[2], w - IND);
  };
  const make = (out) => ({
    rect: (x, y, w, h, t, s) => out.nodes.push({id: 'q' + out.nodes.length, k: 'box', x: x + w / 2, y: y + h / 2, w, h, t: t || '', s: s || 'clear', fs: 12}),
    text: (x, y, t, bold) => out.nodes.push({id: 'q' + out.nodes.length, k: 'text', x, y, t, w: 10, h: 10, fs: 12, b: bold}),
    line: (a, b) => out.edges.push({a, b, ea: 'none', w: 1.2}),
  });
  const layout = (list, x, y, w, g, fill) => {
    let cur = y;
    list.forEach((it) => { cur += one(it, x, cur, w, g); });
    if (fill && cur < y + fill) { g.rect(x, cur, w, y + fill - cur, ''); cur = y + fill; }
    return cur - y;
  };
  const one = (it, x, y, w, g) => {
    const kind = it[0];
    const total = height(it, w);
    if (kind === 'act') g.rect(x, y, w, AH, it[1]);
    else if (kind === 'if') {
      g.rect(x, y, w, IH, '');
      g.line([x, y], [x + w / 2, y + IH]); g.line([x + w, y], [x + w / 2, y + IH]);
      g.text(x + w / 2, y + 13, it[1], true); g.text(x + 24, y + IH - 12, 'Ja'); g.text(x + w - 28, y + IH - 12, 'Nein');
      layout(it[2], x, y + IH, w / 2, g, total - IH);
      layout(it[3] || [], x + w / 2, y + IH, w / 2, g, total - IH);
    } else if (kind === 'case') {
      const cw = w / it[2].length;
      g.rect(x, y, w, IH, ''); g.text(x + w / 2, y + 13, it[1], true);
      it[2].forEach((c, i) => {
        g.line([x + i * cw, y + IH], [x + i * cw, y + total]);
        g.rect(x + i * cw, y + IH, cw, 24, c[0], 'soft');
        layout(c[1], x + i * cw, y + IH + 24, cw, g, total - IH - 24);
      });
    } else if (kind === 'until') {
      g.rect(x, y, IND, total - LH, '', 'soft');
      layout(it[2], x + IND, y, w - IND, g, 0);
      g.rect(x, y + total - LH, w, LH, it[1]);
    } else {
      g.rect(x, y, w, LH, it[1]);
      g.rect(x, y + LH, IND, total - LH, '', 'soft');
      layout(it[2], x + IND, y + LH, w - IND, g, 0);
    }
    return total;
  };
  AP2.dg.nsd = (items, o) => {
    const opt = o || {};
    const w = opt.w || 520;
    const out = {nodes: [], edges: []};
    const h = layout(items, 10, 10, w, make(out), 0);
    return {w: w + 20, h: h + 20, nodes: out.nodes, edges: out.edges, cap: opt.cap, keep: opt.keep};
  };
})();
