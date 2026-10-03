// Page renderer: converts page data to DOM
(function() {
  const renderAbschnitt = (ab) => {
    if (ab.typ === 'text') {
      return AP2.h('p', {text: ab.inhalt, style: {marginBottom: AP2.styles.gap}});
    } else if (ab.typ === 'heading') {
      return AP2.h('h3', {text: ab.text, style: {marginTop: AP2.styles.gapLarge, marginBottom: AP2.styles.gap}});
    } else if (ab.typ === 'list') {
      const ul = AP2.h('ul', {style: {marginBottom: AP2.styles.gap, paddingLeft: '20px'}});
      ab.items.forEach(item => {
        ul.appendChild(AP2.h('li', {text: item}));
      });
      return ul;
    } else if (ab.typ === 'tool') {
      if (ab.toolId === 'subnet-calc' && AP2.mkSubnetCalc) {
        return AP2.mkCard({kids: [AP2.mkSubnetCalc()]});
      }
      return AP2.h('div');
    }
    return AP2.h('div');
  };
  const render = (pageData) => {
    if (!pageData) return AP2.h('div', {text: 'Seite nicht gefunden'});
    const container = AP2.h('div');
    
    container.appendChild(AP2.mkDefBox(pageData.titel, pageData.definition));
    
    if (pageData.merksatz) {
      const hint = AP2.h('div', {style: {padding: AP2.styles.pad, borderRadius: AP2.styles.radius, marginBottom: AP2.styles.gapLarge, borderLeft: `4px solid`}});
      const label = AP2.h('strong', {text: 'Merkhilfe: '});
      const text = document.createTextNode(pageData.merksatz);
      hint.appendChild(label);
      hint.appendChild(text);
      AP2.theme.register(hint, 'rule', (el, c) => {
        el.style.backgroundColor = c.warnBg;
        el.style.borderLeftColor = c.warnText;
      });
      container.appendChild(hint);
    }
    
    if (pageData.abschnitte) {
      pageData.abschnitte.forEach(ab => {
        container.appendChild(renderAbschnitt(ab));
      });
    }
    
    return container;
  };
  window.AP2.renderPage = render;
})();
