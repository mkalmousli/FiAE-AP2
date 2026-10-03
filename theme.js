// Enhanced theme: sophisticated color system
(function() {
  const colors = {
    light: {
      // Base
      bg: '#ffffff', text: '#1a1a1a', border: '#e5e7eb',
      bg2: '#f9fafb', text2: '#6b7280', text3: '#9ca3af',
      // Accent - deep blue
      accent: '#0066cc', accentLight: '#e0f0ff', accentDark: '#0052a3',
      // Status
      success: '#10b981', successLight: '#ecfdf5',
      warning: '#f59e0b', warningLight: '#fffbeb',
      error: '#ef4444', errorLight: '#fef2f2',
      info: '#3b82f6', infoLight: '#eff6ff',
      // Semantic
      codeOverlay: '#f3f4f6', codeBorder: '#d1d5db',
      link: '#0066cc', linkVisited: '#7c3aed',
    },
    dark: {
      // Base
      bg: '#0f172a', text: '#f1f5f9', border: '#334155',
      bg2: '#1e293b', text2: '#cbd5e1', text3: '#94a3b8',
      // Accent
      accent: '#60a5fa', accentLight: '#1e3a8a', accentDark: '#3b82f6',
      // Status
      success: '#10b981', successLight: '#064e3b',
      warning: '#fbbf24', warningLight: '#78350f',
      error: '#f87171', errorLight: '#7f1d1d',
      info: '#60a5fa', infoLight: '#0c2d48',
      // Semantic
      codeOverlay: '#1e293b', codeBorder: '#475569',
      link: '#60a5fa', linkVisited: '#c084fc',
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
