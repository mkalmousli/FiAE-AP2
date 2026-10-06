// Querverweise: anklickbare Chips zu verwandten Seiten ("Siehe auch").
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const chip = (id) => {
    const page = AP2.store.get(id);
    const text = page ? page.t : id;
    const el = h('span', {text, style: {display: 'inline-flex', alignItems: 'center', padding: '5px 12px', borderRadius: S.r.pill,
      border: '1px solid', fontSize: S.f.sm, fontWeight: S.fw.med}});
    if (!page) return AP2.tint(el, 'text3');
    return AP2.press(el, {fn: () => AP2.router.go(id), label: 'Seite öffnen: ' + text,
      base: (c) => ({backgroundColor: c.surface, color: c.accent, borderColor: c.border}),
      hover: (c) => ({borderColor: c.accent, backgroundColor: c.hover})});
  };
  // ids: Liste von Seiten-IDs, title: optionale Überschrift.
  AP2.blocks.see = (ids, title) => {
    const label = AP2.tint(h('div', {text: title || 'Siehe auch', style: {fontSize: S.f.xs, fontWeight: S.fw.bold,
      textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: S.sp[2]}}), 'text2');
    const row = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2]}}, ids.map(chip));
    return h('div', {style: {margin: '0 0 ' + S.sp[5]}}, [label, row]);
  };
})();
