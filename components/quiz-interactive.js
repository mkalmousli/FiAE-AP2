// Interactive quiz with multiple choice
(function() {
  const mkQuiz = (questions) => {
    const container = AP2.h('div');
    let currentIdx = 0;
    let score = 0;
    
    const showQuestion = (idx) => {
      if (idx >= questions.length) {
        AP2.disposeTree(container);
        const result = AP2.h('div', {style: {textAlign: 'center', padding: AP2.styles.padLarge}});
        result.appendChild(AP2.h('h3', {text: 'Quiz abgeschlossen!', style: {marginBottom: AP2.styles.gap}}));
        result.appendChild(AP2.h('p', {text: `Ergebnis: ${score}/${questions.length} korrekt`, style: {fontSize: AP2.styles.fLarge, fontWeight: '600'}}));
        result.appendChild(AP2.h('p', {text: `${Math.round(score/questions.length*100)}% Erfolgsquote`, style: {color: '#6b7280'}}));
        container.appendChild(result);
        return;
      }
      
      const q = questions[idx];
      AP2.disposeTree(container);
      
      const qContainer = AP2.mkEnhancedCard({header: `Frage ${idx + 1}/${questions.length}`});
      const questionText = AP2.h('p', {text: q.question, style: {fontSize: AP2.styles.fLarge, fontWeight: '600', marginBottom: AP2.styles.gapLarge}});
      qContainer.appendChild(questionText);
      
      q.options.forEach((opt, i) => {
        const btn = AP2.h('button', {
          text: opt,
          style: {
            display: 'block', width: '100%', textAlign: 'left', padding: AP2.styles.pad,
            marginBottom: AP2.styles.gapSmall, border: `2px solid`, borderRadius: AP2.styles.radius,
            cursor: 'pointer', fontSize: AP2.styles.fBase, backgroundColor: 'transparent',
            transition: AP2.styles.trans,
          },
          on: {click: () => {
            if (i === q.correct) {
              score++;
              btn.style.backgroundColor = '#10b981';
              btn.style.borderColor = '#10b981';
              btn.style.color = 'white';
            } else {
              btn.style.backgroundColor = '#ef4444';
              btn.style.borderColor = '#ef4444';
              btn.style.color = 'white';
            }
            setTimeout(() => showQuestion(idx + 1), 1000);
          }}
        });
        AP2.theme.register(btn, 'rule', (el, c) => {
          el.style.borderColor = c.border;
        });
        qContainer.appendChild(btn);
      });
      
      container.appendChild(qContainer);
    };
    
    showQuestion(0);
    return container;
  };
  window.AP2.mkQuiz = mkQuiz;
})();
