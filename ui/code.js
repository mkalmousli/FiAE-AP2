// Code-Block mit Sprachlabel, Syntaxfarben und Kopieren-Knopf.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const COLORS = {kw: 'accent', str: 'ok', num: 'text', com: 'text3', plain: 'text'};
  const LABEL = {sql: 'SQL', python: 'Python', java: 'Java', csharp: 'C#', js: 'JavaScript', html: 'HTML', css: 'CSS', pseudo: 'Pseudocode', text: 'Text'};
  const copyBtn = (src) => {
    const btn = AP2.btn({text: 'Kopieren', kind: 'ghost', small: true, fn: () => {
      try { navigator.clipboard.writeText(src); btn.firstChild.textContent = 'Kopiert'; } catch (err) { btn.firstChild.textContent = 'Nicht möglich'; }
      setTimeout(() => { btn.firstChild.textContent = 'Kopieren'; }, 1400);
    }});
    return btn;
  };
  AP2.blocks.code = (lang, source) => {
    const src = source.replace(/^\n+|\s+$/g, '');
    const spans = AP2.highlight(lang, src).map(([kind, txt]) => [kind, h('span', {text: txt})]);
    const pre = h('pre', {style: {margin: 0, padding: '4px 20px 18px', overflowX: 'auto', fontFamily: S.font.mono,
      fontSize: S.f.sm, lineHeight: S.lh.code, tabSize: 4}}, spans.map((pair) => pair[1]));
    const tag = AP2.tint(h('div', {text: LABEL[lang] || lang, style: {fontSize: S.f.xs, fontWeight: S.fw.bold, letterSpacing: '0.08em',
      textTransform: 'uppercase'}}), 'text3');
    const head = h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px 0 20px'}}, [tag, copyBtn(src)]);
    const box = h('div', {style: {border: '1px solid', borderRadius: S.r.md, margin: '0 0 ' + S.sp[5], overflow: 'hidden'}}, [head, pre]);
    return AP2.theme.bind(box, (node, c) => {
      st(node, c);
      spans.forEach(([kind, el]) => { el.style.color = c[COLORS[kind]]; el.style.fontWeight = kind === 'kw' ? S.fw.semi : S.fw.reg; el.style.fontStyle = kind === 'com' ? 'italic' : 'normal'; });
    });
    function st(node, c) { node.style.backgroundColor = c.surface2; node.style.borderColor = c.border; }
  };
})();
