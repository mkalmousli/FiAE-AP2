// Zeile der Navigation: Einrückung nach Ebene, aktiver Zustand per Funktion (ohne Neuaufbau).
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const INDENT = {block: 10, group: 14, page: 26};
  AP2.navRow = (cfg) => {
    const el = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[2], padding: '7px 10px 7px ' + INDENT[cfg.level] + 'px',
      borderRadius: S.r.sm, fontSize: cfg.level === 'block' ? S.f.sm : '13px', lineHeight: '1.35', marginBottom: '1px', borderLeft: '3px solid transparent'}}, cfg.inner);
    const bold = cfg.level === 'page' ? S.fw.reg : S.fw.semi;
    return AP2.press(el, {fn: cfg.fn, label: cfg.label, role: cfg.role || 'link', hover: (c) => ({backgroundColor: c.hover}),
      base: (c) => (cfg.active && cfg.active() ? {backgroundColor: c.accentSoft, color: c.accent, borderLeftColor: c.accent, fontWeight: S.fw.semi}
        : {backgroundColor: 'transparent', color: cfg.level === 'group' ? c.text2 : c.text, borderLeftColor: 'transparent', fontWeight: bold})});
  };
})();
