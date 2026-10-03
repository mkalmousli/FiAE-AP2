// Code block display
(function() {
  const mkCodeBlock = (code) => {
    const block = AP2.h('pre', {style: {
      padding: AP2.styles.padLarge,
      borderRadius: AP2.styles.radiusLarge,
      border: `1px solid`,
      overflow: 'auto',
      fontSize: AP2.styles.fSmaller,
      fontFamily: AP2.styles.fMono,
      marginBottom: AP2.styles.gapLarge,
      lineHeight: AP2.styles.lhTight,
    }});
    
    const codeEl = AP2.h('code');
    codeEl.textContent = code;
    block.appendChild(codeEl);
    
    AP2.theme.register(block, 'rule', (el, c) => {
      el.style.backgroundColor = c.codeOverlay;
      el.style.borderColor = c.codeBorder;
      el.style.color = c.text;
    });
    
    return block;
  };
  window.AP2.mkCodeBlock = mkCodeBlock;
})();
