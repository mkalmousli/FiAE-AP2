// Vorteile/Nachteile (Pro/Contra) als zwei Karten nebeneinander.
(function () {
  const {h, rich} = AP2;
  const S = AP2.S;
  const side = (label, items, tone, iconName) => {
    const head = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[2], fontWeight: S.fw.bold,
      fontSize: S.f.sm, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: S.sp[3]}}, [AP2.icon(iconName, 16), label]);
    AP2.tint(head, tone);
    const card = h('div', {style: {flex: '1 1 280px', padding: '16px 20px', borderRadius: S.r.md, border: '1px solid',
      borderTopWidth: '3px'}}, [head]);
    AP2.theme.bind(card, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; n.style.borderTopColor = c[tone]; });
    items.forEach((txt) => card.appendChild(AP2.tint(h('div', {style: {fontSize: S.f.sm, lineHeight: S.lh.body, padding: '3px 0'}}, rich(txt)), 'text')));
    return card;
  };
  AP2.blocks.procon = (title, pros, cons, labels) => {
    const names = labels || ['Vorteile', 'Nachteile'];
    const row = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[4]}}, [side(names[0], pros, 'ok', 'plus'), side(names[1], cons, 'bad', 'minus')]);
    const head = AP2.tint(h('div', {text: title, style: {fontWeight: S.fw.semi, fontSize: S.f.lg, marginBottom: S.sp[3]}}), 'text');
    return h('div', {style: {margin: '0 0 ' + S.sp[5]}}, [head, row]);
  };
})();
