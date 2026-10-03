// Spickzettel: kompakte Merkkarten zum schnellen Wiederholen.
(function () {
  const {h, rich} = AP2;
  const S = AP2.S;
  const line = (txt) => {
    const dot = AP2.fill(h('span', {style: {width: '5px', height: '5px', borderRadius: '50%', marginTop: '9px', flexShrink: 0}}), 'accent');
    const body = AP2.tint(h('div', {style: {flex: '1 1 0', fontSize: S.f.sm, lineHeight: '1.55', overflowWrap: 'break-word'}}, rich(txt)), 'text');
    return h('div', {style: {display: 'flex', gap: S.sp[2], padding: '2px 0'}}, [dot, body]);
  };
  const card = (title, lines) => {
    const head = AP2.tint(h('div', {text: title, style: {fontSize: S.f.sm, fontWeight: S.fw.bold, marginBottom: S.sp[2]}}), 'accent');
    const box = h('div', {style: {flex: '1 1 250px', padding: '14px 16px', borderRadius: S.r.md}}, [head, lines.map(line)]);
    return AP2.fill(box, 'surface2');
  };
  AP2.blocks.cheat = (cards) => {
    const pill = h('span', {text: 'Spickzettel', style: {padding: '3px 10px', borderRadius: S.r.pill, fontSize: S.f.xs,
      fontWeight: S.fw.bold, letterSpacing: '0.06em', textTransform: 'uppercase'}});
    AP2.theme.bind(pill, (n, c) => { n.style.backgroundColor = c.accent; n.style.color = c.onAccent; });
    const hint = AP2.tint(h('span', {text: 'Das Wichtigste auf einen Blick', style: {fontSize: S.f.sm}}), 'text2');
    const head = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], marginBottom: S.sp[4]}}, [pill, hint]);
    const grid = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3]}}, cards.map(([title, lines]) => card(title, lines)));
    const box = h('div', {style: {padding: '20px', borderRadius: S.r.lg, border: '1px solid', margin: '0 0 ' + S.sp[5], boxShadow: S.shadow}}, [head, grid]);
    return AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
  };
})();
