// Mehrere Sprachen für dasselbe Beispiel: Reiter oberhalb eines Code-Blocks.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const NAMES = {sql: 'SQL', python: 'Python', java: 'Java', csharp: 'C#', js: 'JavaScript', html: 'HTML', css: 'CSS', pseudo: 'Pseudocode', text: 'Text'};
  AP2.blocks.codes = (list) => {
    let cur = 0;
    const holder = h('div');
    const bar = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2], marginBottom: S.sp[2]}});
    const tabs = list.map((item, idx) => {
      const el = h('div', {text: NAMES[item[0]] || item[0], style: {padding: '6px 14px', borderRadius: S.r.pill, border: '1px solid', fontSize: S.f.sm, fontWeight: S.fw.med}});
      return AP2.press(el, {role: 'tab', fn: () => { cur = idx; show(); }, hover: (c) => ({borderColor: c.accent}),
        base: (c) => (cur === idx ? {backgroundColor: c.accent, color: c.onAccent, borderColor: c.accent} : {backgroundColor: c.surface, color: c.text2, borderColor: c.border})});
    });
    tabs.forEach((tab) => bar.appendChild(tab));
    function show() {
      AP2.dispose(holder);
      holder.appendChild(AP2.blocks.code(list[cur][0], list[cur][1]));
      tabs.forEach((tab) => tab.repaint());
    }
    show();
    return h('div', {}, [bar, holder]);
  };
})();
