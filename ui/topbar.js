// Obere Leiste: Menü (mobil), Marke, Suche, Theme-Schalter.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const brand = () => {
    const mark = h('div', {text: 'AP', style: {width: '32px', height: '32px', borderRadius: S.r.sm, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: S.f.sm, fontWeight: S.fw.bold}});
    AP2.theme.bind(mark, (n, c) => { n.style.backgroundColor = c.accent; n.style.color = c.onAccent; });
    const name = AP2.tint(h('div', {text: 'AP2 FiAE', style: {fontWeight: S.fw.bold, fontSize: S.f.lg, letterSpacing: '-0.01em'}}), 'text');
    const el = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[2]}}, [mark, name]);
    return AP2.press(el, {fn: () => AP2.router.go('home'), label: 'Startseite', role: 'link', base: () => ({})});
  };
  const iconButton = (icon, label, fn) => {
    const el = h('div', {style: {width: '40px', height: '40px', borderRadius: S.r.md, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}, [icon]);
    return AP2.press(el, {fn, label, hover: (c) => ({backgroundColor: c.hover}), base: (c) => ({color: c.text2, backgroundColor: 'transparent'})});
  };
  const themeButton = () => {
    const holder = h('div', {style: {display: 'flex'}});
    const el = iconButton(holder, 'Farbschema wechseln', () => AP2.theme.toggle());
    el.setAttribute('role', 'switch');
    const sync = () => {
      const dark = AP2.state.get('theme') === 'dark';
      AP2.dispose(holder);
      holder.appendChild(AP2.icon(dark ? 'sun' : 'moon', 20));
      el.setAttribute('aria-checked', String(dark));
    };
    AP2.state.sub('theme', sync);
    sync();
    return el;
  };
  AP2.mkTopbar = () => {
    const menu = iconButton(AP2.icon('menu', 22), 'Menü öffnen', () => AP2.state.set('drawer', !AP2.state.get('drawer')));
    const search = AP2.mkSearch();
    const bar = h('div', {style: {position: 'fixed', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', gap: S.sp[3],
      borderBottom: '1px solid', zIndex: S.z.topbar, boxSizing: 'border-box'}}, [menu, brand(), h('div', {style: {flex: '1 1 0'}}), search.el, themeButton()]);
    AP2.theme.bind(bar, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderBottomColor = c.border; });
    return {el: bar, menu, search: search.el};
  };
})();
