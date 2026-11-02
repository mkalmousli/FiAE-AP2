// Netzplan-Vorgangsknoten: oben FAZ | D | FEZ, in der Mitte Nr. und Name (über alle Spalten), unten SAZ | GP | SEZ.
// Knoten: {k: 'np', x, y, s: 'accent' (kritisch), t: {nr, name, d, faz, fez, saz, sez, gp, fp}}; null oder fehlende Werte bleiben leer.
(function () {
  const {svg} = AP2;
  const HEAD = 24;
  const ROW = 26;
  const val = (v) => (v === null || v === undefined ? '' : String(v));
  AP2.npSize = (n) => { n.w = n.w || 150; n.h = n.h || HEAD + ROW * 2; };
  AP2.drawNp = (n, g, paint) => {
    const t = n.t;
    const left = n.x - n.w / 2;
    const top = n.y - n.h / 2;
    const col = n.w / 3;
    const crit = n.s === 'accent';
    const stroke = crit ? 'accent' : 'line';
    const line = (x1, y1, x2, y2) => g.appendChild(paint(svg('line', {x1, y1, x2, y2}), {s: stroke, sw: 1}));
    g.appendChild(paint(svg('rect', {x: left, y: top, width: n.w, height: n.h, rx: 3}), {s: stroke, f: crit ? 'accentSoft' : 'surface', sw: crit ? 2 : 1.5}));
    line(left, top + ROW, left + n.w, top + ROW);
    line(left, top + ROW + HEAD, left + n.w, top + ROW + HEAD);
    [1, 2].forEach((c) => [[top, top + ROW], [top + ROW + HEAD, top + n.h]].forEach((r) => line(left + col * c, r[0], left + col * c, r[1])));
    const head = val(t.nr) + (t.nr && t.name ? '  ' : '') + val(t.name);
    AP2.shapes.text(g, paint, n.x, top + ROW + HEAD / 2 + 1, head, {size: 12, bold: true, color: 'text', max: n.w - 8});
    // Spalten: links früh/spät Anfang, Mitte Dauer bzw. Gesamtpuffer, rechts Ende
    const cell = (c, row, txt, o) => AP2.shapes.text(g, paint, left + col * (c + 0.5), top + (row ? ROW + HEAD : 0) + ROW / 2 + 1, val(txt), Object.assign({size: 13, color: 'text', max: col - 4}, o));
    cell(0, 0, t.faz); cell(1, 0, t.d, {bold: true}); cell(2, 0, t.fez);
    cell(0, 1, t.saz); cell(1, 1, t.gp, {color: crit ? 'accent' : 'text2'}); cell(2, 1, t.sez);
    if (t.fp !== undefined && t.fp !== null) AP2.shapes.text(g, paint, left + n.w, top + n.h + 10, (isNaN(t.fp) ? '' : 'FP ') + t.fp, {anchor: 'end', size: 11, color: 'text2', max: col});
  };
})();
