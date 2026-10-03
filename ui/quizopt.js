// Eine Antwortzeile im Quiz: neutral, richtig (grün), falsch (rot) oder abgedunkelt.
(function () {
  const {h, rich} = AP2;
  const S = AP2.S;
  const TONE = {
    idle: (c) => ({row: [c.surface, c.border], badge: [c.surface2, c.text2, c.border], text: c.text}),
    right: (c) => ({row: [c.okSoft, c.ok], badge: [c.ok, c.surface, c.ok], text: c.text}),
    wrong: (c) => ({row: [c.badSoft, c.bad], badge: [c.bad, c.surface, c.bad], text: c.text}),
    dim: (c) => ({row: [c.surface, c.border], badge: [c.surface, c.text3, c.border], text: c.text3}),
  };
  const stateOf = (q, idx) => {
    if (q.picked == null) return 'idle';
    if (idx === q.a) return 'right';
    return idx === q.picked ? 'wrong' : 'dim';
  };
  const badgeEl = (idx) => h('div', {text: 'ABCDEF'[idx], style: {width: '30px', height: '30px', borderRadius: '50%', display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: S.f.sm, fontWeight: S.fw.bold, flexShrink: 0, border: '1px solid'}});
  const syncMark = (mark, state) => {
    if (mark.dataset.k === state) return;
    mark.dataset.k = state;
    while (mark.firstChild) mark.removeChild(mark.firstChild);
    if (state === 'right') mark.appendChild(AP2.icon('check', 20));
    if (state === 'wrong') mark.appendChild(AP2.icon('close', 20));
  };
  AP2.quizOption = (q, idx, onPick) => {
    const badge = badgeEl(idx);
    const label = h('div', {style: {flex: '1 1 0', fontSize: S.f.md, lineHeight: '1.5', overflowWrap: 'break-word'}}, rich(q.o[idx]));
    const mark = h('div', {style: {width: '20px', flexShrink: 0}});
    const row = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], padding: '12px 14px',
      borderRadius: S.r.md, border: '1px solid', marginBottom: S.sp[2]}}, [badge, label, mark]);
    AP2.press(row, {role: 'radio', fn: () => { if (q.picked == null) onPick(idx); },
      base: (c) => {
        const state = stateOf(q, idx);
        const tone = TONE[state](c);
        row.setAttribute('aria-checked', String(q.picked === idx));
        syncMark(mark, state);
        AP2.st(badge, {backgroundColor: tone.badge[0], color: tone.badge[1], borderColor: tone.badge[2]});
        label.style.color = tone.text;
        mark.style.color = state === 'right' ? c.ok : c.bad;
        return {backgroundColor: tone.row[0], borderColor: tone.row[1], cursor: q.picked == null ? 'pointer' : 'default'};
      },
      hover: (c) => (q.picked == null ? {backgroundColor: c.hover, borderColor: c.accent} : {})});
    return row;
  };
})();
