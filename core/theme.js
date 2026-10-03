// Farben je Modus (Graustufen plus genau eine Akzentfarbe) und die zentrale Theme-Registry.
(function () {
  const C = {
    light: {
      bg: '#f6f6f8', surface: '#ffffff', surface2: '#f0f0f3', border: '#e2e2e8', text: '#17171c',
      text2: '#52525e', text3: '#9a9aa6', accent: '#4f46e5', accentSoft: '#ecebff', onAccent: '#ffffff',
      ok: '#15803d', okSoft: '#dcf5e4', bad: '#c62828', badSoft: '#fde4e4', line: '#6b6b78', hover: '#ebebf0',
    },
    dark: {
      bg: '#0c0c10', surface: '#15151b', surface2: '#1d1d25', border: '#2b2b35', text: '#f1f1f4',
      text2: '#a9a9b6', text3: '#6c6c7a', accent: '#8b85ff', accentSoft: '#25234a', onAccent: '#0c0c10',
      ok: '#4ade80', okSoft: '#12301f', bad: '#ff7b7b', badSoft: '#3a1618', line: '#8e8e9c', hover: '#23232d',
    },
  };
  const bound = new Map();
  const c = () => C[AP2.state.get('theme')];
  const bind = (el, fn) => { bound.set(el, fn); fn(el, c()); return el; };
  const unbind = (el) => { bound.delete(el); };
  const apply = () => bound.forEach((fn, el) => fn(el, c()));
  const toggle = () => AP2.state.set('theme', AP2.state.get('theme') === 'light' ? 'dark' : 'light');
  AP2.state.sub('theme', apply);
  AP2.theme = {C, c, bind, unbind, apply, toggle};
})();
