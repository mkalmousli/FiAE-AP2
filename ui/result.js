// Statische Ergebnis-Anzeigen (nicht editierbar): "result" zeigt, wie HTML/CSS aussieht; "out" zeigt die Ausgabe eines Programms.
// ['result', {t: 'Titel', html: '...', css: '...', h: 160}]   ['out', 'Ausgabe-Text']
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const frame = (txt, extra) => AP2.tint(h('div', {text: txt, style: Object.assign({fontSize: S.f.xs, fontWeight: S.fw.bold, letterSpacing: '0.08em',
    textTransform: 'uppercase', padding: '8px 14px 6px'}, extra)}), 'text3');
  const box = (children) => AP2.theme.bind(h('div', {style: {border: '1px solid', borderRadius: S.r.md, margin: '0 0 ' + S.sp[5], overflow: 'hidden'}}, children),
    (n, c) => { n.style.backgroundColor = c.surface2; n.style.borderColor = c.border; });
  // Nur Darstellung: ohne Skripte, ohne Eingriff (pointer-events: none), Größe fest.
  const doc = (html, css) => '<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:system-ui,sans-serif;margin:12px;color:#222}'
    + (css || '') + '</style></head><body>' + html + '</body></html>';
  AP2.blocks.result = (spec) => {
    const page = h('iframe', {attrs: {sandbox: '', title: 'Ergebnis', srcdoc: doc(spec.html, spec.css), tabindex: '-1'},
      style: {width: '100%', height: (spec.h || 160) + 'px', border: 0, display: 'block', background: '#fff', pointerEvents: 'none'}});
    return box([frame('So sieht es aus' + (spec.t ? ': ' + spec.t : '')), page]);
  };
  AP2.blocks.out = (text) => {
    const pre = h('pre', {text: text, style: {margin: 0, padding: '0 20px 14px', overflowX: 'auto', fontFamily: S.font.mono, fontSize: S.f.sm, lineHeight: S.lh.code}});
    AP2.theme.bind(pre, (n, c) => { n.style.color = c.text; });
    return box([frame('Ausgabe'), pre]);
  };
})();
