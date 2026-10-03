// Seitenleiste: Filter, Baum der Blöcke, Ziehgriff. Zustand aus state, Zeilen bleiben bestehen.
(function () {
  const {h, on} = AP2;
  const S = AP2.S;
  const norm = (txt) => txt.toLowerCase();
  const visible = (item, words) => !words.length || words.every((w) => norm(item.page.t + ' ' + (item.page.g || '')).includes(w));
  const refresh = (tree, words) => {
    const filtering = words.length > 0;
    tree.items.forEach((item) => { item.el.style.display = visible(item, words) ? 'flex' : 'none'; item.sync(); });
    tree.folders.forEach((blockF) => {
      let hits = 0;
      blockF.groups.forEach((g) => {
        const n = g.rows.filter((r) => visible(r, words)).length;
        hits += n;
        g.el.style.display = n ? 'block' : 'none';
        g.show(filtering);
      });
      blockF.el.style.display = hits ? 'block' : 'none';
      blockF.show(filtering);
      blockF.meter.sync();
    });
  };
  const reveal = (id) => {
    const page = AP2.store.get(id);
    if (!page) return;
    if (!AP2.navIsOpen(page.b) || !AP2.navIsOpen(page.b + '/' + page.g)) {
      AP2.navSetOpen(page.b, true);
      AP2.navSetOpen(page.b + '/' + page.g, true);
    }
  };
  const toTop = (list, tree, id) => {
    const hit = tree.items.find((item) => item.page.id === id);
    if (hit && hit.el.offsetParent) hit.el.scrollIntoView({block: 'nearest'});
  };
  AP2.mkSidebar = () => {
    const tree = AP2.navTree();
    let words = [];
    const input = AP2.field(h('input', {attrs: {type: 'search', placeholder: 'Themen filtern', 'aria-label': 'Navigation filtern'}, style: {flex: '1 1 0', width: '100%'}}));
    on(input, 'input', () => { words = norm(input.value).split(/\s+/).filter(Boolean); refresh(tree, words); });
    const collapse = AP2.btn({text: 'Zuklappen', small: true, fn: () => { AP2.state.set('navOpen', {}); reveal(AP2.state.get('route')); }});
    const head = h('div', {style: {display: 'flex', gap: S.sp[2], padding: '12px 12px 8px', alignItems: 'center', flexShrink: 0}}, [input, collapse]);
    const home = AP2.navRow({level: 'block', label: 'Startseite', inner: [h('span', {text: 'Startseite'})], fn: () => AP2.router.go('home'), active: () => AP2.state.get('route') === 'home'});
    const list = h('div', {style: {flex: '1 1 0', overflowY: 'auto', padding: '4px 10px 64px'}}, [home, tree.el]);
    const root = h('nav', {attrs: {'aria-label': 'Themen'}, style: {position: 'fixed', left: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
      borderRight: '1px solid', zIndex: S.z.drawer, transition: 'transform 220ms ease'}}, [head, list, AP2.navGrip()]);
    AP2.theme.bind(root, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderRightColor = c.border; });
    AP2.state.sub('navOpen', () => refresh(tree, words));
    AP2.state.sub('done', () => refresh(tree, words));
    AP2.state.sub('route', (route) => { reveal(route); refresh(tree, words); home.repaint(); toTop(list, tree, route); });
    refresh(tree, words);
    return root;
  };
})();
