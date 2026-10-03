// Enhanced card with header and footer
(function() {
  const mkEnhancedCard = (cfg) => {
    cfg = cfg || {};
    const card = AP2.h('div', {style: {
      borderRadius: AP2.styles.radiusLarge, 
      boxShadow: AP2.styles.shadowMd,
      overflow: 'hidden',
      marginBottom: AP2.styles.gapLarge,
    }});
    
    if (cfg.header) {
      const hdr = AP2.h('div', {style: {
        padding: AP2.styles.padLarge,
        borderBottom: `1px solid`,
        backgroundColor: '#f9fafb',
      }});
      hdr.appendChild(AP2.h('h3', {text: cfg.header, style: {margin: '0', fontSize: AP2.styles.fSubhead}}));
      card.appendChild(hdr);
      AP2.theme.register(hdr, 'rule', (el, c) => {
        el.style.backgroundColor = c.bg2;
        el.style.borderBottomColor = c.border;
      });
    }
    
    const content = AP2.h('div', {style: {padding: AP2.styles.padLarge}});
    (cfg.kids || []).forEach(k => content.appendChild(k));
    card.appendChild(content);
    
    AP2.theme.register(card, 'rule', (el, c) => {
      el.style.backgroundColor = c.bg;
    });
    
    return card;
  };
  window.AP2.mkEnhancedCard = mkEnhancedCard;
})();
