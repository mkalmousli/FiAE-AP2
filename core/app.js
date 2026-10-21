// Anwendungsgerüst: verbindet Topbar, Seitenleiste, Inhalt und Layout-Berechnung.
(function () {
  const {h, st} = AP2;
  const S = AP2.S;
  const notFound = (id) => h('p', {text: 'Seite nicht gefunden: ' + id});
  const viewFor = (id) => {
    const cut = id.indexOf('/');
    const view = AP2.views[cut < 0 ? id : id.slice(0, cut)];
    if (view) return view(cut < 0 ? '' : id.slice(cut + 1));
    const page = AP2.store.get(id);
    return page ? AP2.pageView(page) : notFound(id);
  };
  // Fachfarbe einer Route: Themenseite nach Block, Trainer/Pfad/Boss nach Argument.
  const toneFor = (id) => {
    const page = AP2.store.get(id);
    if (page) return page.b;
    const parts = id.split('/');
    const sub = AP2.store.get(parts[parts.length - 1]);
    if (sub) return sub.b;
    return AP2.theme.BLOCK[parts[parts.length - 1]] ? parts[parts.length - 1] : 'ps';
  };
  const remember = (id) => {
    if (!AP2.store.get(id)) return;
    const list = [id].concat((AP2.state.get('recent') || []).filter((x) => x !== id)).slice(0, 8);
    AP2.state.set('recent', list);
  };
  const titleFor = (id) => {
    const page = AP2.store.get(id);
    const view = AP2.viewTitles[id.split('/')[0]];
    return page ? page.t + ' | ' : view ? view + ' | ' : '';
  };
  AP2.app = {
    start() {
      const body = document.body;
      st(body, {margin: 0, fontFamily: S.font.sans, fontSize: S.f.md, lineHeight: S.lh.body});
      AP2.theme.bind(body, (n, c) => { n.style.backgroundColor = c.bg; n.style.color = c.text; });
      AP2.theme.bind(document.documentElement, (n, c) => { n.style.backgroundColor = c.bg; n.style.scrollbarWidth = 'thin'; n.style.scrollbarColor = c.text3 + ' transparent'; });
      const top = AP2.mkTopbar();
      const side = AP2.mkSidebar();
      const veil = h('div', {style: {position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'none', zIndex: S.z.overlay,
        backgroundColor: 'rgba(0,0,0,0.45)'}, on: {click: () => AP2.state.set('drawer', false)}});
      const content = h('div', {style: {margin: '0 auto', padding: S.sp[7] + ' 0 ' + S.sp[8], boxSizing: 'border-box'}});
      const main = h('main', {style: {boxSizing: 'border-box'}}, [content]);
      body.appendChild(top.el); body.appendChild(side); body.appendChild(veil); body.appendChild(main);
      const place = (L) => {
        st(top.el, {height: S.w.topbar + 'px', padding: '0 ' + L.pad + 'px'});
        top.menu.style.display = L.mobile ? 'flex' : 'none';
        const shown = !L.mobile || AP2.state.get('drawer');
        st(side, {top: S.w.topbar + 'px', height: (L.h - S.w.topbar) + 'px', width: L.sidebarW + 'px', transform: shown ? 'none' : 'translateX(-100%)'});
        veil.style.display = L.mobile && AP2.state.get('drawer') ? 'block' : 'none';
        st(main, {marginLeft: L.mobile ? '0' : L.sidebarW + 'px', paddingTop: S.w.topbar + 'px', width: L.mainW + 'px'});
        content.style.width = L.contentW + 'px';
      };
      AP2.layout.bind(place);
      AP2.state.sub('drawer', () => place(AP2.layout));
      AP2.state.sub('route', (id) => {
        AP2.dispose(content);
        AP2.theme.setTone(toneFor(id));
        remember(id);
        content.appendChild(viewFor(id));
        document.title = titleFor(id) + 'AP2 FiAE Lernportal';
        window.scrollTo(0, 0);
        AP2.find.apply(content);
        AP2.state.set('drawer', false);
      });
      AP2.state.set('route', AP2.router.current());
    },
  };
})();
