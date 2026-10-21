// Farben je Modus und Fach: Graustufen, eine Akzentfarbe je Prüfungsbereich (Farbcode), Kategorie-Palette, Gold und Feuer für Fortschritt.
(function () {
  const C = {
    light: {
      bg: '#f6f6f8', surface: '#ffffff', surface2: '#f0f0f3', border: '#e2e2e8', text: '#17171c',
      text2: '#52525e', text3: '#9a9aa6', accent: '#4f46e5', accentSoft: '#ecebff', onAccent: '#ffffff',
      ok: '#15803d', okSoft: '#dcf5e4', bad: '#c62828', badSoft: '#fde4e4', line: '#6b6b78', hover: '#ebebf0',
      hl: '#ffec99', hlHot: '#ff9f1a', onHl: '#17171c',
      gold: '#c98a00', goldSoft: '#fff3d1', fire: '#e8590c', fireSoft: '#ffe8d9',
    },
    dark: {
      bg: '#0c0c10', surface: '#15151b', surface2: '#1d1d25', border: '#2b2b35', text: '#f1f1f4',
      text2: '#a9a9b6', text3: '#6c6c7a', accent: '#8b85ff', accentSoft: '#25234a', onAccent: '#0c0c10',
      ok: '#4ade80', okSoft: '#12301f', bad: '#ff7b7b', badSoft: '#3a1618', line: '#8e8e9c', hover: '#23232d',
      hl: '#5a4a12', hlHot: '#ffb938', onHl: '#0c0c10',
      gold: '#ffc53d', goldSoft: '#3a2e0c', fire: '#ff8a4c', fireSoft: '#3d2012',
    },
  };
  // Farbcode der Prüfungsbereiche [hell, dunkel]: Auf jeder Seite übernimmt die Oberfläche die Farbe ihres Fachs.
  const BLOCK = {
    ps: ['#4f46e5', '#8b85ff'], infra: ['#0d9488', '#2dd4bf'], eua: ['#ea580c', '#fb923c'], wiso: ['#16a34a', '#4ade80'],
    de: ['#db2777', '#f472b6'], exam: ['#dc2626', '#f87171'], course: ['#2563eb', '#60a5fa'], ref: ['#7c3aed', '#c4b5fd'],
  };
  // Kategorie-Palette für farbige Begriffe, Karten und Schritte (unabhängig vom Fach).
  const CAT = [['#4f46e5', '#8b85ff'], ['#0d9488', '#2dd4bf'], ['#ea580c', '#fb923c'], ['#16a34a', '#4ade80'], ['#db2777', '#f472b6'], ['#2563eb', '#60a5fa'], ['#ca8a04', '#facc15']];
  const mix = (a, b, t) => {
    const p = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const x = p(a);
    const y = p(b);
    return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
  };
  const dark = (mode) => mode === 'dark';
  const softOf = (mode, col) => mix(C[mode].surface, col, dark(mode) ? 0.2 : 0.11);
  let tone = 'ps';
  const cache = {};
  const build = (mode, t) => {
    const base = C[mode];
    const i = dark(mode) ? 1 : 0;
    const acc = (BLOCK[t] || BLOCK.ps)[i];
    const out = Object.assign({}, base, {accent: acc, accentSoft: softOf(mode, acc), onAccent: dark(mode) ? '#0c0c10' : '#ffffff'});
    out.cat = CAT.map((pair) => pair[i]);
    out.catSoft = CAT.map((pair) => softOf(mode, pair[i]));
    CAT.forEach((pair, k) => { out['cat' + k] = pair[i]; out['catSoft' + k] = softOf(mode, pair[i]); });
    out.block = {};
    out.blockSoft = {};
    Object.keys(BLOCK).forEach((k) => { out.block[k] = BLOCK[k][i]; out.blockSoft[k] = softOf(mode, BLOCK[k][i]); });
    return out;
  };
  const bound = new Map();
  const c = () => {
    const key = AP2.state.get('theme') + ':' + tone;
    return cache[key] || (cache[key] = build(AP2.state.get('theme'), tone));
  };
  const bind = (el, fn) => { bound.set(el, fn); fn(el, c()); return el; };
  const unbind = (el) => { bound.delete(el); };
  const apply = () => bound.forEach((fn, el) => fn(el, c()));
  const toggle = () => AP2.state.set('theme', AP2.state.get('theme') === 'light' ? 'dark' : 'light');
  // Fachfarbe wechseln (vor dem Aufbau einer Ansicht), bestehende Elemente werden umgefärbt.
  const setTone = (t) => {
    const next = BLOCK[t] ? t : 'ps';
    if (next === tone) return;
    tone = next;
    apply();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', c().accent);
  };
  AP2.state.sub('theme', apply);
  AP2.theme = {C, BLOCK, c, bind, unbind, apply, toggle, setTone, tone: () => tone, mix};
})();
