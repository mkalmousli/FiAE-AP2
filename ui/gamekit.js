// Bausteine für Fortschrittsanzeigen: Ring, Sterne, Balken, Kachel und Farbe der Beherrschung.
(function () {
  const {h, svg, st} = AP2;
  const S = AP2.S;
  // Mischt zwei Hex-Farben; t = 0 ergibt a, t = 1 ergibt b.
  const mix = (a, b, t) => {
    const p = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const x = p(a);
    const y = p(b);
    return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
  };
  const starColor = (stars, c) => (stars >= 5 ? c.gold : stars <= 0 ? c.border : mix(c.accentSoft, c.accent, stars / 4));
  // Fortschrittsring: set(Anteil) aktualisiert ohne Neuaufbau.
  const ring = (size, width, tone, kids) => {
    const r = (size - width) / 2;
    const len = 2 * Math.PI * r;
    const back = svg('circle', {cx: size / 2, cy: size / 2, r, fill: 'none', 'stroke-width': width});
    const front = svg('circle', {cx: size / 2, cy: size / 2, r, fill: 'none', 'stroke-width': width, 'stroke-linecap': 'round',
      'stroke-dasharray': len.toFixed(2), transform: 'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')'});
    const root = svg('svg', {width: size, height: size, viewBox: '0 0 ' + size + ' ' + size, 'aria-hidden': 'true'}, [back, front]);
    st(root, {display: 'block', position: 'absolute', inset: '0'});
    const inner = h('div', {style: {position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}, kids || []);
    const el = h('div', {style: {position: 'relative', width: size + 'px', height: size + 'px', flexShrink: 0}}, [root, inner]);
    let pct = 0;
    const paint = (n, c) => {
      back.setAttribute('stroke', c.border);
      front.setAttribute('stroke', c[typeof tone === 'function' ? tone(pct) : tone]);
    };
    AP2.theme.bind(el, paint);
    el.set = (val) => {
      pct = Math.max(0, Math.min(1, val || 0));
      front.style.transition = 'stroke-dashoffset 400ms ease';
      front.setAttribute('stroke-dashoffset', (len * (1 - pct)).toFixed(2));
      paint(el, AP2.theme.c());
    };
    el.set(0);
    return el;
  };
  const star = (filled, size) => {
    const el = AP2.icon('star', size);
    if (filled) el.setAttribute('fill', 'currentColor');
    return el;
  };
  // Fünf Sterne für die Beherrschung eines Themas.
  const stars = (n, size) => {
    const row = h('span', {attrs: {title: n + ' von 5 Sternen', 'aria-label': n + ' von 5 Sternen'}, style: {display: 'inline-flex', gap: '1px', verticalAlign: 'middle'}});
    for (let i = 0; i < 5; i++) row.appendChild(star(i < n, size || 14));
    AP2.theme.bind(row, (el, c) => { [].forEach.call(el.children, (s, i) => { s.style.color = i < n ? (n >= 5 ? c.gold : c.accent) : c.border; }); });
    return row;
  };
  const bar = (pct, tone, height) => {
    const fill = h('div', {style: {height: '100%', width: Math.round(Math.max(0, Math.min(1, pct)) * 100) + '%', borderRadius: S.r.pill, transition: 'width 400ms ease'}});
    const el = h('div', {style: {height: (height || 6) + 'px', borderRadius: S.r.pill, overflow: 'hidden'}}, [fill]);
    AP2.theme.bind(el, (n, c) => { n.style.backgroundColor = c.surface2; fill.style.backgroundColor = c[tone || 'accent']; });
    el.set = (val) => { fill.style.width = Math.round(Math.max(0, Math.min(1, val)) * 100) + '%'; };
    return el;
  };
  const panel = (kids, style) => {
    const el = h('div', {style: Object.assign({padding: '18px 20px', borderRadius: S.r.lg, border: '1px solid', boxSizing: 'border-box'}, style)}, kids);
    return AP2.theme.bind(el, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
  };
  const kicker = (text, tone) => AP2.tint(h('div', {text, style: {fontSize: S.f.xs, fontWeight: S.fw.bold, letterSpacing: '0.08em', textTransform: 'uppercase'}}), tone || 'text3');
  // Kennzahl-Kachel: Symbol, großer Wert, Beschriftung.
  const tile = (icon, value, label, tone) => {
    const ic = h('div', {style: {width: '40px', height: '40px', borderRadius: S.r.md, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}, [AP2.icon(icon, 22)]);
    AP2.theme.bind(ic, (n, c) => { n.style.color = c[tone]; n.style.backgroundColor = c[tone + 'Soft'] || c.accentSoft; });
    const val = AP2.tint(h('div', {text: String(value), style: {fontSize: S.f.xl, fontWeight: S.fw.bold, lineHeight: S.lh.tight}}), 'text');
    const lab = AP2.tint(h('div', {text: label, style: {fontSize: S.f.xs}}), 'text2');
    return panel([h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3]}}, [ic, h('div', {}, [val, lab])])], {flex: '1 1 160px', padding: '14px 16px'});
  };
  const fmtDate = (d) => d.toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'});
  AP2.gk = {mix, starColor, ring, stars, star, bar, panel, kicker, tile, fmtDate};
})();
