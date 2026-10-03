// Tabellen mit Kopfzeile, optional markierten Zeilen und horizontalem Scrollen auf kleinen Geräten.
(function () {
  const {h, rich} = AP2;
  const S = AP2.S;
  const cell = (tag, content, style, paint) => {
    const el = h(tag, {style: Object.assign({padding: '10px 14px', textAlign: 'left', verticalAlign: 'top'}, style)}, rich(content));
    return AP2.theme.bind(el, paint);
  };
  AP2.blocks.table = (head, rows, opts) => {
    const o = opts || {};
    const mark = o.mark || [];
    const table = h('table', {style: {width: '100%', borderCollapse: 'collapse', fontSize: S.f.sm, lineHeight: '1.55'}});
    const headRow = h('tr');
    head.forEach((txt) => headRow.appendChild(cell('th', txt, {fontWeight: S.fw.semi, whiteSpace: 'nowrap'}, (n, c) => {
      n.style.backgroundColor = c.surface2; n.style.color = c.text2; n.style.borderBottom = '1px solid ' + c.border;
    })));
    table.appendChild(h('thead', {}, [headRow]));
    const body = h('tbody');
    rows.forEach((row, ri) => {
      const tr = h('tr');
      row.forEach((txt, ci) => tr.appendChild(cell('td', String(txt), {fontWeight: ci === 0 && o.first !== false ? S.fw.semi : S.fw.reg}, (n, c) => {
        n.style.color = c.text;
        n.style.backgroundColor = mark.includes(ri) ? c.accentSoft : 'transparent';
        n.style.borderBottom = ri < rows.length - 1 ? '1px solid ' + c.border : 'none';
      })));
      body.appendChild(tr);
    });
    table.appendChild(body);
    const wrap = h('div', {style: {overflowX: 'auto', border: '1px solid', borderRadius: S.r.md, margin: '0 0 ' + S.sp[5]}}, [table]);
    return AP2.theme.bind(wrap, (n, c) => { n.style.borderColor = c.border; n.style.backgroundColor = c.surface; });
  };
})();
