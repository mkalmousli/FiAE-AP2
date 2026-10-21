// Hervorgehobene Kästen mit Symbol und eigener Farbe: Definition (Fachfarbe), Merkhilfe (Gold, bunte Schlüsselbegriffe), Tipp, Falle, Hinweis, Beispiel.
(function () {
  const {h, rich} = AP2;
  const S = AP2.S;
  const KINDS = {
    def: {label: 'Prüfungsdefinition', icon: 'book', bar: 'accent', bg: 'accentSoft', big: true, mark: 'acc'},
    merk: {label: 'Merkhilfe', icon: 'bulb', bar: 'gold', bg: 'goldSoft', mark: 'cat'},
    tip: {label: 'Prüfungstipp', icon: 'check', bar: 'ok', bg: 'okSoft'},
    warn: {label: 'Prüfungsfalle', icon: 'alert', bar: 'bad', bg: 'badSoft'},
    note: {label: 'Hinweis', icon: 'info', bar: 'text3', bg: 'surface'},
    ex: {label: 'Beispiel', icon: 'flask', bar: 'cat5', bg: 'surface2'},
  };
  const color = (c, key) => (key === 'cat5' ? c.cat[5] : key === 'text3' ? c.text2 : c[key]);
  const callout = (kind, body) => {
    const cfg = KINDS[kind];
    const ic = h('span', {style: {width: '26px', height: '26px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}, [AP2.icon(cfg.icon, 15)]);
    const label = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[2], fontSize: S.f.xs, fontWeight: S.fw.bold, textTransform: 'uppercase',
      letterSpacing: '0.08em', marginBottom: S.sp[2]}}, [ic, h('span', {text: cfg.label})]);
    AP2.theme.bind(label, (n, c) => { n.style.color = color(c, cfg.bar); ic.style.backgroundColor = color(c, cfg.bar); ic.style.color = c.surface; });
    const box = h('div', {style: {padding: '14px 20px 16px', borderRadius: S.r.md, margin: '0 0 ' + S.sp[5], border: '1px solid',
      borderLeftWidth: '5px'}}, [label]);
    AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = cfg.bg === 'surface2' ? c.surface2 : c[cfg.bg]; n.style.borderColor = c.border; n.style.borderLeftColor = color(c, cfg.bar); });
    [].concat(body).forEach((line, idx, list) => {
      const para = h('div', {style: {fontSize: cfg.big ? S.f.lg : S.f.md, lineHeight: cfg.mark ? '1.9' : S.lh.body,
        marginBottom: idx === list.length - 1 ? '0' : S.sp[2], fontWeight: cfg.big ? S.fw.med : S.fw.reg}}, cfg.mark ? AP2.marked(line, cfg.mark) : rich(line));
      box.appendChild(AP2.tint(para, 'text'));
    });
    return box;
  };
  Object.keys(KINDS).forEach((kind) => { AP2.blocks[kind] = (body) => callout(kind, body); });
})();
