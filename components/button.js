// Button component
(function() {
  const mkBtn = (cfg) => {
    cfg = cfg || {};
    const btn = AP2.h('button', {
      text: cfg.text,
      style: {
        padding: `${AP2.styles.padSmall} ${AP2.styles.pad}`,
        border: 'none', borderRadius: AP2.styles.radius,
        cursor: 'pointer', fontSize: AP2.styles.fBase,
        fontWeight: '500', userSelect: 'none',
      },
      on: {
        click: cfg.on || (() => {}),
        pointerenter: (e) => {
          if (cfg.variant !== 'text') e.target.style.transform = 'scale(1.02)';
        },
        pointerleave: (e) => {
          e.target.style.transform = 'scale(1)';
        },
        focus: (e) => {
          e.target.style.outline = `2px solid ${AP2.theme.get().accent}`;
        },
        blur: (e) => {
          e.target.style.outline = 'none';
        }
      }
    });
    btn.tabIndex = 0;
    AP2.theme.register(btn, 'rule', (el, c) => {
      el.style.backgroundColor = cfg.variant === 'text' ? 'transparent' : c.accent;
      el.style.color = cfg.variant === 'text' ? c.text : '#fff';
    });
    return btn;
  };
  window.AP2.mkBtn = mkBtn;
})();
