// Interaktive Elemente: Hover, Fokus, Tastatur (Enter/Leertaste) und Theme in einem Helfer.
(function () {
  const {h, st, on} = AP2;
  const S = AP2.S;
  let keyboardMode = false;
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Tab') keyboardMode = true; });
  document.addEventListener('pointerdown', () => { keyboardMode = false; });
  const press = (el, cfg) => {
    let hovered = false;
    let focused = false;
    el.tabIndex = 0;
    el.setAttribute('role', cfg.role || 'button');
    if (cfg.label) el.setAttribute('aria-label', cfg.label);
    st(el, {cursor: 'pointer', outline: 'none', userSelect: 'none', webkitTapHighlightColor: 'transparent', transition: S.t.fast});
    const paint = () => {
      const col = AP2.theme.c();
      el.style.boxShadow = 'none';
      st(el, cfg.base(col));
      if (hovered && cfg.hover) st(el, cfg.hover(col));
      if (focused && keyboardMode) el.style.boxShadow = '0 0 0 ' + S.ring + 'px ' + col.accent;
    };
    AP2.theme.bind(el, paint);
    on(el, 'pointerenter', () => { hovered = true; paint(); });
    on(el, 'pointerleave', () => { hovered = false; paint(); });
    on(el, 'pointercancel', () => { hovered = false; paint(); });
    on(el, 'focus', () => { focused = true; paint(); });
    on(el, 'blur', () => { focused = false; paint(); });
    // Strg/Cmd/Umschalt + Klick oder Mittelklick: Navigation (AP2.router.go) öffnet einen neuen Tab.
    const run = (ev, tab) => { AP2.router.tab = tab; try { cfg.fn(ev); } finally { AP2.router.tab = false; } };
    on(el, 'click', (ev) => run(ev, ev.ctrlKey || ev.metaKey || ev.shiftKey));
    on(el, 'auxclick', (ev) => { if (ev.button === 1) { ev.preventDefault(); run(ev, true); } });
    on(el, 'mousedown', (ev) => { if (ev.button === 1) ev.preventDefault(); });
    on(el, 'keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); run(ev, ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)); }
    });
    el.repaint = paint;
    return el;
  };
  const LOOK = {
    primary: (c) => ({backgroundColor: c.accent, color: c.onAccent, borderColor: c.accent, opacity: '1'}),
    soft: (c) => ({backgroundColor: c.surface2, color: c.text, borderColor: c.border, opacity: '1'}),
    ghost: (c) => ({backgroundColor: 'transparent', color: c.text2, borderColor: 'transparent', opacity: '1'}),
  };
  const HOVER = {
    primary: () => ({opacity: '0.88'}),
    soft: (c) => ({backgroundColor: c.hover}),
    ghost: (c) => ({backgroundColor: c.hover, color: c.text}),
  };
  const btn = (cfg) => {
    const kind = cfg.kind || 'soft';
    const small = cfg.small;
    const el = h('div', {style: {display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: S.sp[2],
      padding: small ? '6px 12px' : '10px 18px', borderRadius: S.r.md, border: '1px solid',
      fontSize: small ? S.f.sm : S.f.md, fontWeight: S.fw.med, lineHeight: S.lh.tight}}, [cfg.icon, cfg.text]);
    return press(el, {fn: cfg.fn, label: cfg.label, base: LOOK[kind], hover: HOVER[kind]});
  };
  const field = (el) => {
    let focused = false;
    const paint = (node, col) => st(node, {backgroundColor: col.surface, color: col.text, fontFamily: S.font.sans,
      border: '1px solid ' + (focused ? col.accent : col.border), borderRadius: S.r.md, padding: '10px 12px',
      fontSize: S.f.md, outline: 'none', boxSizing: 'border-box'});
    AP2.theme.bind(el, paint);
    on(el, 'pointercancel', () => { hovered = false; paint(); });
    on(el, 'focus', () => { focused = true; paint(el, AP2.theme.c()); });
    on(el, 'blur', () => { focused = false; paint(el, AP2.theme.c()); });
    return el;
  };
  Object.assign(AP2, {press, btn, field});
})();
