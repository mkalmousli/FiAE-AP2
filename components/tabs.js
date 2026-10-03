// Tabs component
(function() {
  const mkTabs = (items) => {
    const root = AP2.h('div');
    const nav = AP2.h('div', {style: {display: 'flex', borderBottom: `1px solid`}});
    const content = AP2.h('div');
    AP2.theme.register(nav, 'border');
    items.forEach((item, i) => {
      const btn = AP2.h('button', {text: item.label});
      btn.tabIndex = 0;
      btn.onclick = () => {
        AP2.disposeTree(content);
        content.appendChild(item.el);
      };
      nav.appendChild(btn);
      if (i === 0) btn.click();
    });
    root.appendChild(nav);
    root.appendChild(content);
    return root;
  };
  window.AP2.mkTabs = mkTabs;
})();
