// Themenseite: Kopf, Prüfungsdefinition, Spickzettel, Inhalt, Navigation zu Nachbarseiten.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const doneButton = (id) => {
    const label = h('span');
    const el = h('div', {style: {display: 'inline-flex', alignItems: 'center', gap: S.sp[2], padding: '8px 14px',
      borderRadius: S.r.md, border: '1px solid', fontSize: S.f.sm, fontWeight: S.fw.med}}, [AP2.icon('check', 16), label]);
    AP2.press(el, {role: 'switch', fn: () => AP2.state.toggleDone(id), hover: (c) => ({borderColor: c.accent}),
      base: (c) => {
        const done = !!AP2.state.get('done')[id];
        label.textContent = done ? 'Erledigt' : 'Als erledigt markieren';
        el.setAttribute('aria-checked', String(done));
        return done ? {backgroundColor: c.accent, color: c.onAccent, borderColor: c.accent}
          : {backgroundColor: c.surface, color: c.text2, borderColor: c.border};
      }});
    const off = AP2.state.sub('done', () => { if (el.isConnected) el.repaint(); else off(); });
    return el;
  };
  const crumbs = (p) => {
    const blk = AP2.store.BLOCKS.find((item) => item.id === p.b);
    const txt = blk.t + (p.g ? '  /  ' + p.g : '');
    return AP2.tint(h('div', {text: txt, style: {fontSize: S.f.sm, marginBottom: S.sp[3], fontWeight: S.fw.med}}), 'text3');
  };
  const navCard = (page, label) => {
    const cap = AP2.tint(h('div', {text: label, style: {fontSize: S.f.xs, fontWeight: S.fw.bold, textTransform: 'uppercase', letterSpacing: '0.08em'}}), 'text3');
    const title = AP2.tint(h('div', {text: page.t, style: {fontSize: S.f.md, fontWeight: S.fw.semi, marginTop: S.sp[1]}}), 'text');
    const el = h('div', {style: {flex: '1 1 260px', padding: '14px 18px', borderRadius: S.r.md, border: '1px solid'}}, [cap, title]);
    return AP2.press(el, {fn: () => AP2.router.go(page.id), label: label + ': ' + page.t, base: (c) => ({backgroundColor: c.surface, borderColor: c.border}),
      hover: (c) => ({borderColor: c.accent, backgroundColor: c.hover})});
  };
  const nav = (id) => {
    const near = AP2.store.neighbors(id);
    const row = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3], marginTop: S.sp[7]}});
    if (near.prev) row.appendChild(navCard(near.prev, 'Zurück'));
    if (near.next) row.appendChild(navCard(near.next, 'Weiter'));
    return row;
  };
  AP2.pageView = (p) => {
    AP2.ctx.id = p.id;
    const root = h('div');
    root.appendChild(crumbs(p));
    root.appendChild(AP2.tint(h('h1', {text: p.t, style: {margin: '0 0 ' + S.sp[4], fontSize: S.f.h1, fontWeight: S.fw.bold,
      lineHeight: S.lh.tight, letterSpacing: '-0.02em'}}), 'text'));
    root.appendChild(h('div', {style: {margin: '0 0 ' + S.sp[5]}}, [doneButton(p.id)]));
    if (p.d) root.appendChild(AP2.blocks.def(p.d));
    if (p.m) root.appendChild(AP2.blocks.merk(p.m));
    if (p.cheat) root.appendChild(AP2.blocks.cheat(p.cheat));
    root.appendChild(AP2.renderBlocks(p.blocks));
    root.appendChild(nav(p.id));
    return root;
  };
})();
