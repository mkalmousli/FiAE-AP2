// Netzplan-Vorgangsknoten in Prüfungsform: oben FAZ | FEZ, Mitte Nr. Name | Dauer, unten SAZ | SEZ, darunter GP | FP.
// Knoten: {k: 'np', x, y, s: 'accent' (kritisch), t: {nr, name, d, faz, fez, saz, sez, gp, fp}}; null oder fehlende Werte bleiben leer.
(function () {
  const {svg} = AP2;
  const W = 156;
  const RH = 24;
  const val = (v) => (v === null || v === undefined ? '' : String(v));
  AP2.npSize = (n) => { n.w = n.w || W; n.h = n.h || RH * 4; };
  AP2.drawNp = (n, g, paint) => {
    const t = n.t;
    const left = n.x - n.w / 2;
    const top = n.y - n.h / 2;
    const crit = n.s === 'accent';
    const line = (x1, y1, x2, y2, sw) => g.appendChild(paint(svg('line', {x1, y1, x2, y2}), {s: crit ? 'accent' : 'line', sw: sw || 1}));
    g.appendChild(paint(svg('rect', {x: left, y: top, width: n.w, height: n.h, rx: 3}), {s: crit ? 'accent' : 'line', f: crit ? 'accentSoft' : 'surface', sw: crit ? 2 : 1.5}));
    const cell = (cx, row, txt, o) => AP2.shapes.text(g, paint, cx, top + RH * row + RH / 2 + 1, val(txt), Object.assign({size: 13, color: 'text', max: n.w / 2 - 6}, o));
    const half = n.w / 2;
    // Zeilen: 0 = FAZ | FEZ, 1 = Nr. Name | Dauer, 2 = SAZ | SEZ, 3 = GP | FP (leicht abgesetzt)
    [1, 2, 3].forEach((r) => line(left, top + RH * r, left + n.w, top + RH * r, r === 3 ? 2 : 1));
    [0, 2].forEach((r) => line(n.x, top + RH * r, n.x, top + RH * (r + 1)));
    line(n.x, top + RH * 3, n.x, top + n.h);
    line(left + n.w * 0.75, top + RH, left + n.w * 0.75, top + RH * 2);
    cell(left + half / 2, 0, t.faz); cell(n.x + half / 2, 0, t.fez);
    AP2.shapes.text(g, paint, left + n.w * 0.375, top + RH * 1.5 + 1, val(t.nr) + (t.nr && t.name ? '  ' : '') + val(t.name), {size: 12, bold: true, color: 'text', max: n.w * 0.75 - 8});
    AP2.shapes.text(g, paint, left + n.w * 0.875, top + RH * 1.5 + 1, val(t.d), {size: 12, color: 'text2', max: n.w * 0.25 - 4});
    cell(left + half / 2, 2, t.saz); cell(n.x + half / 2, 2, t.sez);
    cell(left + half / 2, 3, t.gp, {size: 12, color: crit ? 'accent' : 'text2'}); cell(n.x + half / 2, 3, t.fp, {size: 12, color: 'text2'});
  };
})();
