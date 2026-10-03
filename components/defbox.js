// Definition box component
(function() {
  const mkDefBox = (titel, def) => {
    const box = AP2.h('div', {
      style: {
        padding: AP2.styles.pad, borderRadius: AP2.styles.radius,
        borderLeft: `4px solid`, marginBottom: AP2.styles.gapLarge
      }
    }, [
      AP2.h('strong', {text: 'Definition: ' + titel}),
      AP2.h('p', {text: def, style: {marginTop: AP2.styles.gapSmall}})
    ]);
    AP2.theme.register(box, 'rule', (el, c) => {
      el.style.backgroundColor = c.accentLight;
      el.style.borderLeftColor = c.accent;
    });
    return box;
  };
  window.AP2.mkDefBox = mkDefBox;
})();
