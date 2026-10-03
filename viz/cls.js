// UML-Klassenkasten mit drei Fächern (Name, Attribute, Operationen).
(function () {
  const {svg} = AP2;
  const LH = 17;
  const rows = (n) => Math.max(1, (n.t.attrs || []).length);
  const opsRows = (n) => Math.max(1, (n.t.ops || []).length);
  const headLines = (n) => [].concat(n.t.name).join('\n').split('\n');
  AP2.clsHeight = (n) => 12 + headLines(n).length * LH + 10 + rows(n) * LH + (n.t.ops ? 10 + opsRows(n) * LH : 0);
  AP2.drawClass = (n, g, paint) => {
    const left = n.x - n.w / 2;
    const top = n.y - n.h / 2;
    const style = {s: n.s === 'accent' ? 'accent' : 'line', f: n.s === 'accent' ? 'accentSoft' : 'surface', sw: 1.5};
    g.appendChild(paint(svg('rect', {x: left, y: top, width: n.w, height: n.h, rx: 3}), style));
    const heads = headLines(n);
    const headH = 12 + heads.length * LH;
    heads.forEach((txt, idx) => AP2.shapes.text(g, paint, n.x, top + 6 + LH / 2 + idx * LH + 2, txt, {bold: idx === heads.length - 1, size: 13, color: 'text'}));
    const attrs = n.t.attrs || [];
    const attrH = 10 + rows(n) * LH;
    const cut = (y) => g.appendChild(paint(svg('line', {x1: left, x2: left + n.w, y1: y, y2: y}), {s: 'line', sw: 1.2}));
    cut(top + headH);
    attrs.forEach((txt, idx) => AP2.shapes.text(g, paint, left + 8, top + headH + 5 + LH / 2 + idx * LH, txt, {anchor: 'start', size: 12}));
    if (n.t.ops) {
      cut(top + headH + attrH);
      n.t.ops.forEach((txt, idx) => AP2.shapes.text(g, paint, left + 8, top + headH + attrH + 5 + LH / 2 + idx * LH, txt, {anchor: 'start', size: 12}));
    }
  };
})();
