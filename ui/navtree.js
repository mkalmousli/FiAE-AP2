// Navigationsbaum: Blöcke und Gruppen einklappbar, Filter, Fortschritt. Zeilen bleiben bestehen und werden nur umgefärbt.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const isOpen = (key) => !!AP2.state.get('navOpen')[key];
  const setOpen = (key, val) => AP2.state.set('navOpen', Object.assign({}, AP2.state.get('navOpen'), {[key]: val}));
  const chevron = (key) => {
    const el = h('span', {style: {display: 'flex', transition: 'transform 150ms ease'}}, [AP2.icon('chevron', 15)]);
    el.sync = () => { el.style.transform = isOpen(key) ? 'rotate(90deg)' : 'none'; };
    el.sync();
    return el;
  };
  const meter = (list) => {
    const fill = AP2.fill(h('div', {style: {height: '100%', borderRadius: S.r.pill, transition: 'width 200ms ease'}}), 'accent');
    const track = AP2.fill(h('div', {style: {height: '3px', borderRadius: S.r.pill, margin: '0 10px 6px 34px', overflow: 'hidden'}}, [fill]), 'border');
    const label = AP2.tint(h('span', {style: {fontSize: S.f.xs, fontWeight: S.fw.reg}}), 'text3');
    const sync = () => {
      const done = list.filter((p) => AP2.state.get('done')[p.id]).length;
      label.textContent = done + '/' + list.length;
      fill.style.width = (list.length ? (done / list.length) * 100 : 0) + '%';
    };
    sync();
    return {track, label, sync};
  };
  const pageItem = (p) => {
    const mark = AP2.tint(h('span', {style: {marginLeft: 'auto', display: 'flex'}}), 'accent');
    const row = AP2.navRow({level: 'page', inner: [h('span', {text: p.t, style: {flex: '1 1 0'}}), mark], label: p.t,
      fn: () => AP2.router.go(p.id), active: () => AP2.state.get('route') === p.id});
    const sync = () => {
      AP2.dispose(mark);
      while (mark.firstChild) mark.removeChild(mark.firstChild);
      if (AP2.state.get('done')[p.id]) mark.appendChild(AP2.icon('check', 14));
      row.repaint();
    };
    sync();
    return {el: row, page: p, sync};
  };
  const folder = (key, title, level, inner, kids, extra) => {
    const arrow = chevron(key);
    const body = h('div', {}, kids.map((k) => k.el));
    const head = AP2.navRow({level, role: 'button', label: title, inner: [arrow].concat(inner), active: () => false, fn: () => { setOpen(key, !isOpen(key)); }});
    const show = (force) => { body.style.display = force || isOpen(key) ? 'block' : 'none'; head.setAttribute('aria-expanded', String(force || isOpen(key))); arrow.sync(); };
    return {el: h('div', {}, [head].concat(extra || [], [body])), show, head, key};
  };
  AP2.navTree = () => {
    const root = h('div');
    const items = [];
    const folders = [];
    AP2.store.BLOCKS.forEach((blk, idx) => {
      const list = AP2.store.byBlock(blk.id);
      const groups = [];
      list.forEach((p) => {
        let g = groups.find((x) => x.name === p.g);
        if (!g) { g = {name: p.g, pages: []}; groups.push(g); }
        g.pages.push(p);
      });
      const gFolders = groups.map((g) => {
        const rows = g.pages.map(pageItem);
        items.push(...rows);
        const f = folder(blk.id + '/' + g.name, g.name || 'Allgemein', 'group', [h('span', {text: g.name || 'Allgemein', style: {flex: '1 1 0'}})], rows);
        f.rows = rows;
        return f;
      });
      const m = meter(list);
      const f = folder(blk.id, blk.t, 'block', [h('span', {text: blk.t, style: {flex: '1 1 0'}}), m.label], gFolders, [m.track]);
      f.groups = gFolders; f.meter = m; f.blk = blk;
      folders.push(f);
      root.appendChild(f.el);
    });
    return {el: root, items, folders};
  };
  AP2.navSetOpen = setOpen;
  AP2.navIsOpen = isOpen;
})();
