// Netzplan-Vorgangsknoten: Kopf mit Nr. und Name, darunter 3 Spalten x 2 Zeilen: FAZ | D | FEZ  und  SAZ | GP | SEZ.
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
    line(left, top + HEAD, left + n.w, top + HEAD);
    line(left, top + HEAD + ROW, left + n.w, top + HEAD + ROW);
    [1, 2].forEach((c) => line(left + col * c, top + HEAD, left + col * c, top + n.h));
    const head = val(t.nr) + (t.nr && t.name ? '  ' : '') + val(t.name);
    AP2.shapes.text(g, paint, n.x, top + HEAD / 2 + 1, head, {size: 12, bold: true, color: 'text', max: n.w - 8});
    // Spalten: links früh/spät Anfang, Mitte Dauer bzw. Gesamtpuffer, rechts Ende
    const cell = (c, row, txt, o) => AP2.shapes.text(g, paint, left + col * (c + 0.5), top + HEAD + ROW * row + ROW / 2 + 1, val(txt), Object.assign({size: 13, color: 'text', max: col - 4}, o));
    cell(0, 0, t.faz); cell(1, 0, t.d, {bold: true}); cell(2, 0, t.fez);
    cell(0, 1, t.saz); cell(1, 1, t.gp, {color: crit ? 'accent' : 'text2'}); cell(2, 1, t.sez);
    if (t.fp !== undefined && t.fp !== null) AP2.shapes.text(g, paint, left + n.w, top + n.h + 10, (isNaN(t.fp) ? '' : 'FP ') + t.fp, {anchor: 'end', size: 11, color: 'text2', max: col});
  };
})();
