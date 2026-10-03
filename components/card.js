// Card component
(function() {
  const mkCard = (cfg) => {
    cfg = cfg || {};
    const card = AP2.h('div', {
      style: {
        padding: AP2.styles.pad, borderRadius: AP2.styles.radiusLarge,
        border: `1px solid`, boxShadow: AP2.styles.shadow
      }
    }, cfg.kids || []);
    AP2.theme.register(card, 'rule', (el, c) => {
      el.style.backgroundColor = c.bg2;
      el.style.borderColor = c.border;
    });
    return card;
  };
  window.AP2.mkCard = mkCard;
})();
