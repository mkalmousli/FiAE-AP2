// Theme: colors and dark/light mode
(function() {
  const colors = {
    light: {
      bg: '#fff', text: '#000', border: '#ddd',
      bg2: '#f5f5f5', text2: '#555', accent: '#1e88e5',
      accentLight: '#e3f2fd', success: '#2e7d32', error: '#c62828',
      warnBg: '#fff3e0', warnText: '#e65100',
    },
    dark: {
      bg: '#1a1a1a', text: '#e0e0e0', border: '#444',
      bg2: '#2a2a2a', text2: '#aaa', accent: '#64b5f6',
      accentLight: '#1a237e', success: '#66bb6a', error: '#ef5350',
      warnBg: '#3e2723', warnText: '#ffb74d',
    }
  };
  const themed = [];
  const apply = (mode) => {
    const col = colors[mode];
    document.body.style.backgroundColor = col.bg;
    document.body.style.color = col.text;
    themed.forEach(({el, type, rule}) => {
      const applyRule = (c) => {
        if (type === 'bg') el.style.backgroundColor = c.bg;
        if (type === 'text') el.style.color = c.text;
        if (type === 'border') el.style.borderColor = c.border;
        if (type === 'rule' && rule) rule(el, c);
      };
      applyRule(col);
    });
  };
  window.AP2.theme = {
    colors, themed, apply,
    register: (el, type, rule) => {
      themed.push({el, type, rule});
      const mode = AP2.state.get('theme');
      const c = colors[mode];
      if (type === 'bg') el.style.backgroundColor = c.bg;
      if (type === 'text') el.style.color = c.text;
      if (type === 'border') el.style.borderColor = c.border;
      if (type === 'rule' && rule) rule(el, c);
    },
    on: (mode) => {
      AP2.state.set('theme', mode);
      apply(mode);
    },
    get: () => colors[AP2.state.get('theme')],
  };
})();
