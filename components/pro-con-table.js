// Pro/Con comparison table
(function() {
  const mkProConTable = (title, items) => {
    const card = AP2.mkEnhancedCard({header: title});
    const table = AP2.h('div');
    
    items.forEach(item => {
      const row = AP2.h('div', {style: {
        display: 'flex', gap: AP2.styles.gap, marginBottom: AP2.styles.gapLarge,
        paddingBottom: AP2.styles.gap, borderBottom: `1px solid`
      }});
      
      const label = AP2.h('div', {style: {flex: '0 0 100px', fontWeight: '600'}});
      label.appendChild(AP2.h('span', {text: item.label, style: {color: item.isPro ? '#10b981' : '#ef4444'}}));
      
      const items_list = AP2.h('ul', {style: {flex: '1', margin: '0', paddingLeft: '20px'}});
      item.points.forEach(p => {
        items_list.appendChild(AP2.h('li', {text: p}));
      });
      
      row.appendChild(label);
      row.appendChild(items_list);
      table.appendChild(row);
      AP2.theme.register(row, 'border');
    });
    
    card.appendChild(table);
    return card;
  };
  window.AP2.mkProConTable = mkProConTable;
})();
