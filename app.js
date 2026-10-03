// Main app initialization with routing
(function() {
  let mainContent = null;
  const renderPage = (routeId) => {
    if (!mainContent) return;
    AP2.disposeTree(mainContent);
    const pageData = AP2.store.get(routeId);
    if (pageData) {
      mainContent.appendChild(AP2.renderPage(pageData));
    } else {
      mainContent.appendChild(AP2.h('div', {text: 'Seite nicht gefunden: ' + routeId}));
    }
  };
  const start = () => {
    document.title = 'AP2 FiAE Pruefungsvorbereitung';
    AP2.state.init();
    
    const root = document.body;
    root.style.margin = '0';
    root.style.padding = '0';
    root.style.fontFamily = AP2.styles.fSans;
    root.style.fontSize = AP2.styles.fBase;
    root.style.lineHeight = '1.6';
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.height = '100vh';
    
    const topbar = AP2.mkTopbar();
    const container = AP2.h('div', {style: {display: 'flex', flex: '1', overflow: 'hidden'}});
    
    if (!AP2.layout.isMobile) {
      const sidebar = AP2.mkSidebar();
      container.appendChild(sidebar);
    }
    
    mainContent = AP2.h('main', {style: {flex: '1', overflowY: 'auto', padding: AP2.styles.pad}});
    container.appendChild(mainContent);
    
    root.appendChild(topbar);
    root.appendChild(container);
    
    AP2.theme.apply(AP2.state.get('theme'));
    
    AP2.router.subscribe((path) => renderPage(path));
    renderPage(AP2.state.get('route'));
  };
  window.AP2.app = {start};
})();
