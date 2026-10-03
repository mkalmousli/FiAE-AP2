// Table component
(function() {
  const mkTable = (headers, rows) => {
    const table = AP2.h('table', {style: {width: '100%', borderCollapse: 'collapse'}});
    const thead = AP2.h('thead');
    const tr = AP2.h('tr');
    headers.forEach(h => {
      const th = AP2.h('th', {text: h, style: {padding: AP2.styles.padSmall, textAlign: 'left'}});
      AP2.theme.register(th, 'rule', (el, c) => {
        el.style.backgroundColor = c.bg2;
        el.style.borderBottom = `2px solid ${c.border}`;
      });
      tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = AP2.h('tbody');
    rows.forEach(row => {
      const tr = AP2.h('tr');
      row.forEach(cell => {
        const td = AP2.h('td', {text: cell, style: {padding: AP2.styles.padSmall}});
        AP2.theme.register(td, 'border');
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
  };
  window.AP2.mkTable = mkTable;
})();
