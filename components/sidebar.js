// Sidebar navigation - dynamic from store
(function() {
  const mkSidebar = () => {
    const sidebar = AP2.h('aside', {style: {
      width: '280px', padding: AP2.styles.pad, borderRight: `1px solid`,
      overflowY: 'auto', fontSize: AP2.styles.fSmall
    }});
    
    const items = AP2.store.all();
    const byBlock = {};
    items.forEach(item => {
      if (!byBlock[item.block]) byBlock[item.block] = [];
      byBlock[item.block].push(item);
    });
    
    const blockLabels = {
      'start': 'Navigation',
      'ps': 'Block 1: Planung',
      'infra': 'Block 2: Infrastruktur',
      'eua': 'Block 3: Entwicklung',
      'wiso': 'Block 4: WiSo',
      'deutsch': 'Block 5: Deutsch',
    };
    
    Object.keys(byBlock).forEach(block => {
      const h = AP2.h('h4', {text: blockLabels[block] || block, style: {marginTop: AP2.styles.gapLarge, marginBottom: AP2.styles.gapSmall}});
      sidebar.appendChild(h);
      byBlock[block].forEach(item => {
        const a = AP2.h('div', {
          text: item.titel,
          style: {padding: `${AP2.styles.padSmall} 0`, cursor: 'pointer', borderRadius: AP2.styles.radius, fontSize: AP2.styles.fSmall},
          on: {click: () => AP2.router.navigate(item.id)}
        });
        a.tabIndex = 0;
        sidebar.appendChild(a);
      });
    });
    
    AP2.theme.register(sidebar, 'border');
    return sidebar;
  };
  window.AP2.mkSidebar = mkSidebar;
})();
