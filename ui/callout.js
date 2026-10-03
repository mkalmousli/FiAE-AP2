// Hervorgehobene Kästen: Definition, Merkhilfe, Tipp, Falle, Hinweis, Beispiel.
(function () {
  const {h, rich} = AP2;
  const S = AP2.S;
  const KINDS = {
    def: {label: 'Prüfungsdefinition', bar: 'accent', bg: 'accentSoft', big: true},
    merk: {label: 'Merkhilfe', bar: 'accent', bg: 'surface2'},
    tip: {label: 'Prüfungstipp', bar: 'ok', bg: 'surface'},
    warn: {label: 'Prüfungsfalle', bar: 'bad', bg: 'surface'},
    note: {label: 'Hinweis', bar: 'text3', bg: 'surface'},
    ex: {label: 'Beispiel', bar: 'line', bg: 'surface2'},
  };
  const callout = (kind, body) => {
    const cfg = KINDS[kind];
    const label = h('div', {text: cfg.label, style: {fontSize: S.f.xs, fontWeight: S.fw.bold, textTransform: 'uppercase',
      letterSpacing: '0.08em', marginBottom: S.sp[2]}});
    AP2.theme.bind(label, (n, c) => { n.style.color = cfg.bar === 'text3' ? c.text2 : c[cfg.bar]; });
    const box = h('div', {style: {padding: '16px 20px', borderRadius: S.r.md, margin: '0 0 ' + S.sp[5], border: '1px solid',
      borderLeftWidth: '4px'}}, [label]);
    AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = c[cfg.bg]; n.style.borderColor = c.border; n.style.borderLeftColor = c[cfg.bar]; });
    [].concat(body).forEach((line, idx, list) => {
      const para = h('div', {style: {fontSize: cfg.big ? S.f.lg : S.f.md, lineHeight: S.lh.body,
        marginBottom: idx === list.length - 1 ? '0' : S.sp[2], fontWeight: cfg.big ? S.fw.med : S.fw.reg}}, rich(line));
      box.appendChild(AP2.tint(para, 'text'));
    });
    return box;
  };
  Object.keys(KINDS).forEach((kind) => { AP2.blocks[kind] = (body) => callout(kind, body); });
})();
