// Bausteine für interaktive Werkzeuge: Eingabefelder, Auswahl, Ergebnisfläche.
(function () {
  const {h, st, on} = AP2;
  const S = AP2.S;
  const col = (kids) => h('div', {style: {display: 'flex', flexDirection: 'column', gap: S.sp[4]}}, kids);
  const row = (kids) => h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3], alignItems: 'flex-end'}}, kids);
  const labeled = (text, control) => {
    const lab = AP2.tint(h('div', {text, style: {fontSize: S.f.xs, fontWeight: S.fw.med, marginBottom: '4px'}}), 'text2');
    return h('div', {style: {flex: '1 1 150px'}}, [lab, control]);
  };
  const input = (text, value, fn, type) => {
    const el = AP2.field(h('input', {attrs: {type: type || 'text', value: String(value), 'aria-label': text}, style: {width: '100%'}}));
    on(el, 'input', () => fn(el.value));
    return {el: labeled(text, el), input: el, get: () => el.value, set: (v) => { el.value = v; }};
  };
  const select = (text, opts, fn) => {
    const el = AP2.field(h('select', {attrs: {'aria-label': text}, style: {width: '100%'}},
      opts.map(([val, name]) => h('option', {text: name, attrs: {value: val}}))));
    on(el, 'change', () => fn(el.value));
    return {el: labeled(text, el), input: el, get: () => el.value};
  };
  // Ergebnisfläche: show([[Name, Wert], ...]) füllt Zeilen neu.
  const result = () => {
    const box = h('div', {style: {padding: S.sp[4], borderRadius: S.r.md, border: '1px solid', display: 'flex', flexDirection: 'column', gap: S.sp[2]}});
    AP2.theme.bind(box, (n, c) => st(n, {backgroundColor: c.surface2, borderColor: c.border}));
    box.show = (rows) => {
      AP2.dispose(box);
      while (box.firstChild) box.removeChild(box.firstChild);
      rows.forEach(([name, val, mono]) => {
        const key = AP2.tint(h('div', {text: name, style: {flex: '0 0 130px', fontSize: S.f.sm}}), 'text2');
        const value = AP2.tint(h('div', {text: String(val), style: {flex: '1 1 150px', fontWeight: S.fw.med, fontFamily: mono ? S.font.mono : S.font.sans, wordBreak: 'break-all'}}), 'text');
        box.appendChild(h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3]}}, [key, value]));
      });
    };
    return box;
  };
  const note = (text) => AP2.tint(h('div', {text, style: {fontSize: S.f.sm}}), 'text2');
  AP2.tk = {col, row, labeled, input, select, result, note};
})();
