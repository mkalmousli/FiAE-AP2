// Startseite: Überblick, Fortschritt, Einstieg in die Blöcke.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const stat = (value, label) => {
    const big = AP2.tint(h('div', {text: String(value), style: {fontSize: S.f.h1, fontWeight: S.fw.bold, lineHeight: S.lh.tight}}), 'text');
    const cap = AP2.tint(h('div', {text: label, style: {fontSize: S.f.sm}}), 'text2');
    const box = h('div', {style: {flex: '1 1 150px', padding: '16px 20px', borderRadius: S.r.md, border: '1px solid'}}, [big, cap]);
    return AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
  };
  const progressBar = (ratio) => {
    const fill = AP2.fill(h('div', {style: {height: '100%', width: Math.round(ratio * 100) + '%', borderRadius: S.r.pill}}), 'accent');
    return AP2.fill(h('div', {style: {height: '6px', borderRadius: S.r.pill, overflow: 'hidden', marginTop: S.sp[3]}}, [fill]), 'surface2');
  };
  const blockCard = (blk) => {
    const list = AP2.store.byBlock(blk.id);
    const done = list.filter((p) => AP2.state.get('done')[p.id]).length;
    const title = AP2.tint(h('div', {text: blk.t, style: {fontSize: S.f.lg, fontWeight: S.fw.bold, marginBottom: S.sp[1]}}), 'text');
    const desc = AP2.tint(h('div', {text: blk.s, style: {fontSize: S.f.sm, lineHeight: '1.5'}}), 'text2');
    const meta = AP2.tint(h('div', {text: done + ' von ' + list.length + ' Seiten erledigt', style: {fontSize: S.f.xs, marginTop: S.sp[3]}}), 'text3');
    const el = h('div', {style: {flex: '1 1 300px', padding: '18px 20px', borderRadius: S.r.md, border: '1px solid'}}, [title, desc, meta, progressBar(list.length ? done / list.length : 0)]);
    return AP2.press(el, {fn: () => AP2.router.go(list[0].id), label: blk.t, base: (c) => ({backgroundColor: c.surface, borderColor: c.border}),
      hover: (c) => ({borderColor: c.accent, backgroundColor: c.hover})});
  };
  const nextPage = () => AP2.store.all().find((p) => !AP2.state.get('done')[p.id]) || AP2.store.all()[0];
  AP2.homeView = () => {
    AP2.ctx.id = 'home';
    const total = AP2.store.all().length;
    const done = Object.keys(AP2.state.get('done')).length;
    const scores = Object.values(AP2.state.get('scores'));
    const avg = scores.length ? Math.round(scores.reduce((sum, val) => sum + val, 0) / scores.length) + ' %' : '-';
    const title = AP2.tint(h('h1', {text: 'AP2 Fachinformatiker Anwendungsentwicklung', style: {fontSize: S.f.h1, fontWeight: S.fw.bold,
      lineHeight: S.lh.tight, letterSpacing: '-0.02em', margin: '0 0 ' + S.sp[3]}}), 'text');
    const sub = AP2.tint(h('p', {text: 'Dein Lernportal für Teil 2 der Abschlussprüfung. Jede Seite hat eine Prüfungsdefinition, einen Spickzettel, eine ausführliche Erklärung, Grafiken, Aufgaben mit Musterlösung und einen Selbsttest.',
      style: {fontSize: S.f.lg, lineHeight: S.lh.body, margin: '0 0 ' + S.sp[5]}}), 'text2');
    const go = AP2.btn({text: 'Weiter lernen', kind: 'primary', fn: () => AP2.router.go(nextPage().id)});
    const strat = AP2.btn({text: 'Prüfungsstrategie', kind: 'soft', fn: () => AP2.router.go('ref-strategie')});
    const stats = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3], margin: S.sp[6] + ' 0'}}, [stat(total, 'Lernseiten'), stat(done, 'erledigt'), stat(avg, 'Ø Quiz-Ergebnis')]);
    const grid = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3]}}, AP2.store.BLOCKS.map(blockCard));
    return h('div', {}, [title, sub, h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3]}}, [go, strat]), stats, grid]);
  };
})();
