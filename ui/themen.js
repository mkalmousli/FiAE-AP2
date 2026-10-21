// Themenkarte: alle Themen als Kacheln mit Sternen, filterbar nach Block, Text, offen und schwach.
(function () {
  const {h, on} = AP2;
  const S = AP2.S;
  const gk = () => AP2.gk;
  const FILTERS = [['alle', 'Alle'], ['offen', 'Noch offen'], ['schwach', 'Schwach (bis 2 Sterne)'], ['faellig', 'Wiederholung fällig']];
  let mem = {blk: 'learn', f: 'alle', q: ''};
  const tile = (p) => {
    const m = AP2.game.mastery(p.id);
    const due = AP2.game.due(AP2.bank.byPage(p.id)).length;
    const done = !!AP2.state.get('done')[p.id];
    const title = AP2.tint(h('div', {text: p.t, style: {fontSize: S.f.sm, fontWeight: S.fw.semi, lineHeight: '1.35', flex: '1 1 0'}}), 'text');
    const mark = done ? AP2.tint(h('span', {attrs: {title: 'Gelesen'}, style: {display: 'flex'}}, [AP2.icon('check', 16)]), 'ok') : null;
    const facts = m.total ? m.seen + '/' + m.total + ' geübt' + (due ? '  ·  ' + due + ' fällig' : '') : 'ohne Fragen';
    const foot = h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: S.sp[2], marginTop: S.sp[2]}}, [
      m.total ? gk().stars(m.stars, 12) : h('span'), AP2.tint(h('span', {text: facts, style: {fontSize: '11px'}}), due ? 'fire' : 'text3')]);
    const el = h('div', {style: {flex: '1 1 230px', padding: '12px 14px', borderRadius: S.r.md, border: '1px solid', borderLeftWidth: '4px', boxSizing: 'border-box'}},
      [h('div', {style: {display: 'flex', gap: S.sp[2], alignItems: 'flex-start'}}, [title, mark]), foot]);
    return AP2.press(el, {fn: () => AP2.router.go(p.id), label: p.t, hover: (c) => ({backgroundColor: c.hover}),
      base: (c) => ({backgroundColor: c.surface, borderColor: c.border, borderLeftColor: gk().starColor(m.total ? m.stars : done ? 1 : 0, c)})});
  };
  const keep = (p, f) => {
    if (f === 'offen') return !AP2.state.get('done')[p.id];
    if (f === 'schwach') { const m = AP2.game.mastery(p.id); return m.total > 0 && m.stars <= 2; }
    if (f === 'faellig') return AP2.game.due(AP2.bank.byPage(p.id)).length > 0;
    return true;
  };
  const chipRow = (list, cur, fn) => h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2]}}, list.map(([id, text]) => {
    const el = h('span', {text, style: {padding: '6px 12px', borderRadius: S.r.pill, fontSize: S.f.sm, fontWeight: S.fw.med, border: '1px solid'}});
    return AP2.press(el, {fn: () => fn(id), label: text, base: (c) => (cur() === id ? {backgroundColor: c.accent, color: c.onAccent, borderColor: c.accent}
      : {backgroundColor: c.surface, color: c.text2, borderColor: c.border}), hover: (c) => ({borderColor: c.accent})});
  }));
  const summary = (pages) => {
    const count = [0, 0, 0, 0, 0, 0];
    pages.forEach((p) => { const m = AP2.game.mastery(p.id); if (m.total) count[m.stars]++; });
    return h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2]}}, count.map((n, s) => {
      const el = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[2], padding: '6px 12px', borderRadius: S.r.md, border: '1px solid'}}, [gk().stars(s, 12),
        h('span', {text: String(n), style: {fontWeight: S.fw.bold, fontSize: S.f.sm}})]);
      return AP2.theme.bind(el, (node, c) => { node.style.borderColor = c.border; node.style.backgroundColor = c.surface; node.style.color = c.text; });
    }));
  };
  AP2.views.themen = () => {
    AP2.ctx.id = 'themen';
    const blocks = [['learn', 'Prüfungsfächer']].concat(AP2.store.BLOCKS.map((b) => [b.id, b.t.replace('Wirtschafts- und Sozialkunde', 'WiSo')]));
    const learn = ['ps', 'infra', 'eua', 'wiso'];
    const body = h('div');
    const input = AP2.field(h('input', {attrs: {type: 'search', placeholder: 'Thema suchen, z. B. RAID, Kündigung, JOIN', 'aria-label': 'Themen filtern', value: mem.q}, style: {width: '100%', marginBottom: S.sp[3]}}));
    const draw = () => {
      AP2.dispose(body);
      const words = mem.q.toLowerCase().split(/\s+/).filter(Boolean);
      const ids = mem.blk === 'learn' ? learn : [mem.blk];
      let shown = 0;
      ids.forEach((bid) => {
        const blk = AP2.store.BLOCKS.find((b) => b.id === bid);
        const pages = AP2.store.byBlock(bid).filter((p) => keep(p, mem.f) && words.every((w) => (p.t + ' ' + (p.g || '')).toLowerCase().includes(w)));
        if (!pages.length) return;
        shown += pages.length;
        body.appendChild(AP2.blocks.h(blk.t));
        const groups = [];
        pages.forEach((p) => { let g = groups.find((x) => x.name === p.g); if (!g) { g = {name: p.g, pages: []}; groups.push(g); } g.pages.push(p); });
        groups.forEach((g) => {
          body.appendChild(AP2.tint(h('div', {text: g.name || 'Allgemein', style: {fontSize: S.f.sm, fontWeight: S.fw.bold, margin: S.sp[4] + ' 0 ' + S.sp[2]}}), 'text2'));
          body.appendChild(h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2]}}, g.pages.map(tile)));
        });
      });
      if (!shown) body.appendChild(AP2.blocks.note('Keine Themen für diese Auswahl.'));
    };
    on(input, 'input', () => { mem.q = input.value; draw(); });
    const all = AP2.store.all().filter((p) => learn.includes(p.b));
    const head = [AP2.tint(h('h1', {text: 'Themenkarte', style: {fontSize: S.f.h1, fontWeight: S.fw.bold, letterSpacing: '-0.02em', margin: '0 0 ' + S.sp[2]}}), 'text'),
      AP2.tint(h('p', {text: 'Alle Themen auf einen Blick. Die Sterne zeigen, wie sicher du die Fragen eines Themas beherrschst; der farbige Rand macht Lücken sichtbar. Ziel: alles mindestens auf drei Sterne bringen.', style: {fontSize: S.f.md, lineHeight: S.lh.body, margin: '0 0 ' + S.sp[4]}}), 'text2'),
      summary(all), h('div', {style: {height: S.sp[4]}}), input];
    const blkRow = chipRow(blocks, () => mem.blk, (id) => { mem.blk = id; refresh(); });
    const fRow = chipRow(FILTERS, () => mem.f, (id) => { mem.f = id; refresh(); });
    const refresh = () => { [].forEach.call(blkRow.children, (c) => c.repaint()); [].forEach.call(fRow.children, (c) => c.repaint()); draw(); };
    draw();
    return h('div', {}, head.concat([blkRow, h('div', {style: {height: S.sp[2]}}), fRow, body]));
  };
  AP2.viewTitles.themen = 'Themenkarte';
})();
