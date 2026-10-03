// Enhanced page renderer for rich content
(function() {
  const quizRegistry = {};  // Store quiz data
  
  const renderAbschnitt = (ab) => {
    if (ab.typ === 'text') {
      const p = AP2.h('p', {text: ab.inhalt, style: {marginBottom: AP2.styles.gap, lineHeight: AP2.styles.lhLoose}});
      return p;
    } else if (ab.typ === 'heading') {
      return AP2.h('h3', {text: ab.text, style: {marginTop: AP2.styles.gapLarge, marginBottom: AP2.styles.gap, fontSize: AP2.styles.fSubhead}});
    } else if (ab.typ === 'code') {
      return AP2.mkCodeBlock(ab.code);
    } else if (ab.typ === 'list') {
      const ul = AP2.h('ul', {style: {marginBottom: AP2.styles.gap, paddingLeft: '20px', lineHeight: AP2.styles.lhLoose}});
      ab.items.forEach(item => {
        ul.appendChild(AP2.h('li', {text: item, style: {marginBottom: AP2.styles.gapSmall}}));
      });
      return ul;
    } else if (ab.typ === 'figure') {
      return AP2.mkFigure(ab.url, ab.caption, ab.width);
    } else if (ab.typ === 'tool') {
      const toolMap = {
        'subnet-calc': AP2.mkSubnetCalc,
        'raid-calc': AP2.mkRaidCalc,
      };
      const toolFn = toolMap[ab.toolId];
      if (toolFn) return AP2.mkEnhancedCard({header: 'Interaktiver Rechner', kids: [toolFn()]});
      return AP2.h('div');
    } else if (ab.typ === 'quiz') {
      if (!quizRegistry[ab.quizId] || !AP2.mkQuiz) return AP2.h('div', {text: 'Quiz nicht verfuegbar'});
      return AP2.mkEnhancedCard({header: 'Quiz', kids: [AP2.mkQuiz(quizRegistry[ab.quizId])]});
    } else if (ab.typ === 'procon') {
      return AP2.mkProConTable(ab.title, ab.items);
    } else if (ab.typ === 'table-grid') {
      return AP2.mkTable(ab.headers, ab.rows);
    }
    return AP2.h('div');
  };
  
  const render = (pageData) => {
    if (!pageData) return AP2.h('div', {text: 'Seite nicht gefunden'});
    const container = AP2.h('div');
    
    container.appendChild(AP2.mkDefBox(pageData.titel, pageData.definition));
    
    if (pageData.merksatz) {
      const hint = AP2.mkEnhancedCard({
        header: 'Merkhilfe',
        kids: [AP2.h('p', {text: pageData.merksatz})]
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
  window.AP2.registerQuiz = (id, questions) => {
    quizRegistry[id] = questions;
  };
  window.AP2.quizRegistry = quizRegistry;
})();
