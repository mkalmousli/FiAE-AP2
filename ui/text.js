// Textblöcke: Absatz, Überschriften, Listen, Schritte, Begriffstabelle.
(function () {
  const {h, rich} = AP2;
  const S = AP2.S;
  const B = AP2.blocks;
  const tint = (el, key) => AP2.theme.bind(el, (n, c) => { n.style.color = c[key]; });
  const fill = (el, key) => AP2.theme.bind(el, (n, c) => { n.style.backgroundColor = c[key]; });
  Object.assign(AP2, {tint, fill});
  B.p = (txt) => tint(h('p', {style: {margin: '0 0 ' + S.sp[4], fontSize: S.f.md, lineHeight: S.lh.body}}, rich(txt)), 'text');
  B.h = (txt) => {
    const bar = fill(h('span', {style: {width: '4px', height: '24px', borderRadius: S.r.pill, flexShrink: 0}}), 'accent');
    const title = tint(h('h2', {text: txt, style: {margin: 0, fontSize: S.f.h2, fontWeight: S.fw.bold,
      lineHeight: S.lh.tight, letterSpacing: '-0.01em'}}), 'text');
    return h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], margin: S.sp[7] + ' 0 ' + S.sp[4]}}, [bar, title]);
  };
  B.h3 = (txt) => tint(h('h3', {text: txt, style: {fontSize: S.f.xl, fontWeight: S.fw.semi, lineHeight: S.lh.tight,
    margin: S.sp[5] + ' 0 ' + S.sp[2]}}), 'text');
  const listRow = (item, sub) => {
    const size = sub ? '5px' : '7px';
    const dot = h('span', {style: {width: size, height: size, borderRadius: '50%', marginTop: sub ? '12px' : '11px', flexShrink: 0}});
    AP2.theme.bind(dot, (n, c) => { n.style.backgroundColor = sub ? c.text3 : c.accent; });
    const body = tint(h('div', {style: {flex: '1 1 0', fontSize: sub ? S.f.sm : S.f.md, lineHeight: S.lh.body,
      overflowWrap: 'break-word'}}, rich(item)), sub ? 'text2' : 'text');
    return h('div', {style: {display: 'flex', gap: S.sp[3], padding: '2px 0', marginLeft: sub ? S.sp[5] : '0'}}, [dot, body]);
  };
  B.list = (items) => {
    const wrap = h('div', {style: {margin: '0 0 ' + S.sp[5]}});
    items.forEach((item) => {
      if (Array.isArray(item)) {
        wrap.appendChild(listRow(item[0], false));
        item[1].forEach((subItem) => wrap.appendChild(listRow(subItem, true)));
      } else wrap.appendChild(listRow(item, false));
    });
    return wrap;
  };
  const stepRow = (item, idx, last) => {
    const badge = h('div', {text: String(idx + 1), style: {position: 'absolute', left: 0, top: 0, width: '30px', height: '30px',
      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: S.f.sm,
      fontWeight: S.fw.bold}});
    AP2.theme.bind(badge, (n, c) => { n.style.backgroundColor = c.accentSoft; n.style.color = c.accent; });
    const rail = last ? null : fill(h('div', {style: {position: 'absolute', left: '14px', top: '36px', bottom: '2px', width: '2px'}}), 'border');
    const body = tint(h('div', {style: {fontSize: S.f.md, lineHeight: S.lh.body, paddingTop: '2px'}}, rich(item)), 'text');
    return h('div', {style: {position: 'relative', paddingLeft: '48px', paddingBottom: last ? '0' : S.sp[4]}}, [badge, rail, body]);
  };
  B.steps = (items) => h('div', {style: {margin: '0 0 ' + S.sp[5]}}, items.map((item, idx) => stepRow(item, idx, idx === items.length - 1)));
  B.kv = (pairs) => {
    const box = h('div', {style: {border: '1px solid', borderRadius: S.r.md, overflow: 'hidden', margin: '0 0 ' + S.sp[5]}});
    AP2.theme.bind(box, (n, c) => { n.style.borderColor = c.border; n.style.backgroundColor = c.surface; });
    pairs.forEach((pair, idx) => {
      const term = tint(h('div', {style: {flex: '0 0 190px', fontWeight: S.fw.semi, fontSize: S.f.sm}}, rich(pair[0])), 'accent');
      const desc = tint(h('div', {style: {flex: '1 1 260px', fontSize: S.f.sm, lineHeight: S.lh.body}}, rich(pair[1])), 'text');
      const row = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2] + ' ' + S.sp[4], padding: '12px 16px', borderTop: idx ? '1px solid' : 'none'}}, [term, desc]);
      AP2.theme.bind(row, (n, c) => { n.style.borderColor = c.border; });
      box.appendChild(row);
    });
    return box;
  };
})();
