// Seitenleiste: Filter, Baum der Blöcke, Ziehgriff. Zustand aus state, Zeilen bleiben bestehen.
(function () {
  const {h, on} = AP2;
  const S = AP2.S;
  const norm = (txt) => txt.toLowerCase();
  const visible = (item, words) => !words.length || words.every((w) => norm(item.page.t + ' ' + (item.page.g || '')).includes(w));
  const refresh = (tree, words) => {
    const filtering = words.length > 0;
    tree.items.forEach((item) => { item.el.style.display = visible(item, words) ? 'flex' : 'none'; item.sync(); });
    const cur = AP2.state.get('sideBlock') || 'ps';
    tree.folders.forEach((blockF) => {
      let hits = 0;
      blockF.groups.forEach((g) => {
        const n = g.rows.filter((r) => visible(r, words)).length;
        hits += n;
        g.el.style.display = n ? 'block' : 'none';
        g.show(filtering);
      });
      blockF.el.style.display = (filtering ? hits : blockF.blk.id === cur) ? 'block' : 'none';
      blockF.head.style.display = filtering ? 'flex' : 'none';
      blockF.meter.track.style.display = filtering ? 'block' : 'none';
      blockF.show(true);
      blockF.meter.sync();
    });
  };
  const reveal = (id) => {
    const page = AP2.store.get(id);
    if (!page) return;
    if (AP2.state.get('sideBlock') !== page.b) AP2.state.set('sideBlock', page.b);
    if (!AP2.navIsOpen(page.b + '/' + page.g)) {
      const open = Object.assign({}, AP2.state.get('navOpen'));
      Object.keys(open).forEach((k) => { if (k.indexOf(page.b + '/') === 0) open[k] = false; });
      open[page.b] = true;
      open[page.b + '/' + page.g] = true;
      AP2.state.set('navOpen', open);
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
    const head = h('div', {style: {display: 'flex', padding: '12px 12px 8px', alignItems: 'center', flexShrink: 0}}, [input]);
    const quick = [['home', 'Startseite', 'home'], ['trainer', 'Trainer', 'play'], ['plan', 'Mein Plan', 'target'], ['merkliste', 'Merkliste', 'bookmark'], ['quest', 'Quests', 'sword'], ['spick', 'Spickzettel', 'cards'], ['themen', 'Themenkarte', 'map'], ['erfolge', 'Erfolge', 'trophy']].map(([id, text, icon]) => {
      const el = h('div', {attrs: {title: text}, style: {flex: '1 1 0', minWidth: 0, display: 'flex', justifyContent: 'center', padding: '8px 0', borderRadius: S.r.sm}}, [AP2.icon(icon, 18)]);
      const on = () => (id === 'home' ? AP2.state.get('route') === 'home' : AP2.state.get('route').split('/')[0] === id);
      return AP2.press(el, {fn: () => AP2.router.go(id), label: text, role: 'link', hover: (c) => ({backgroundColor: c.hover}),
        base: (c) => (on() ? {backgroundColor: c.accentSoft, color: c.accent} : {backgroundColor: 'transparent', color: c.text2})});
    });
    const quickRow = h('div', {style: {display: 'flex', gap: '2px', padding: '0 10px 6px', flexShrink: 0}}, quick);
    const tabs = AP2.store.BLOCKS.map((blk) => {
      const list = AP2.store.byBlock(blk.id);
      const bar = AP2.fill(h('div', {style: {height: '100%', borderRadius: S.r.pill}}), 'accent');
      const track = AP2.fill(h('div', {style: {height: '3px', width: '70%', borderRadius: S.r.pill, overflow: 'hidden'}}, [bar]), 'border');
      const el = h('div', {attrs: {title: blk.t}, style: {display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '7px 2px 6px', borderRadius: S.r.sm,
        fontSize: S.f.xs, lineHeight: '1.2', minWidth: 0}}, [AP2.icon(blk.icon, 17), h('span', {text: blk.short, style: {maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}), track]);
      const row = AP2.press(el, {fn: () => { AP2.state.set('sideBlock', blk.id); const r = AP2.state.get('route'); const pg = AP2.store.get(r); if (pg && pg.b === blk.id) reveal(r); }, label: blk.t, role: 'tab',
        hover: (c) => ({backgroundColor: c.hover}),
        base: (c) => (AP2.state.get('sideBlock') === blk.id ? {backgroundColor: c.accentSoft, color: c.accent, fontWeight: S.fw.semi} : {backgroundColor: 'transparent', color: c.text2, fontWeight: S.fw.reg})});
      row.sync = () => { const done = list.filter((p) => AP2.state.get('done')[p.id]).length; bar.style.width = (list.length ? (done / list.length) * 100 : 0) + '%'; row.repaint(); };
      row.sync();
      return row;
    });
    const tabGrid = h('div', {attrs: {role: 'tablist'}, style: {display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '2px', padding: '0 10px 6px', flexShrink: 0}}, tabs);
    const sep = AP2.fill(h('div', {style: {height: '1px', margin: '2px 10px 6px', flexShrink: 0}}), 'border');
    const list = h('div', {style: {flex: '1 1 0', overflowY: 'auto', padding: '4px 10px 64px'}}, [tree.el]);
    const root = h('nav', {attrs: {'aria-label': 'Themen'}, style: {position: 'fixed', left: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
      borderRight: '1px solid', zIndex: S.z.drawer, transition: 'transform 220ms ease'}}, [head, quickRow, tabGrid, sep, list, AP2.navGrip()]);
    AP2.theme.bind(root, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderRightColor = c.border; });
    AP2.state.sub('navOpen', () => refresh(tree, words));
    AP2.state.sub('sideBlock', () => { refresh(tree, words); tabs.forEach((t) => t.repaint()); });
    AP2.state.sub('done', () => { refresh(tree, words); tabs.forEach((t) => t.sync()); });
    // Die Lernkartei ändert sich bei jeder Antwort; die Punkte werden gebündelt nachgezogen.
    let pending = null;
    AP2.state.sub('srs', () => { clearTimeout(pending); pending = setTimeout(() => refresh(tree, words), 700); });
    AP2.state.sub('route', (route) => { reveal(route); refresh(tree, words); quick.forEach((row) => row.repaint()); toTop(list, tree, route); });
    if (!AP2.state.get('sideBlock')) AP2.state.set('sideBlock', 'ps');
    reveal(AP2.state.get('route'));
    refresh(tree, words);
    tabs.forEach((t) => t.repaint());
    return root;
  };
})();
