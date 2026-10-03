// Einzige Quelle der Wahrheit für Theme, Fortschritt und Navigation.
(function () {
  const PREFIX = 'ap2.';
  const saved = ['theme', 'done', 'scores', 'sideW', 'navOpen', 'exams'];
  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const data = {theme: dark ? 'dark' : 'light', done: {}, scores: {}, drawer: false, route: '', sideW: 0, navOpen: {}, exams: {}};
  const subs = {};
  const read = (key) => {
    try { const raw = localStorage.getItem(PREFIX + key); return raw == null ? undefined : JSON.parse(raw); } catch (err) { return undefined; }
  };
  const write = (key, val) => {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); } catch (err) { /* Speicher gesperrt */ }
  };
  saved.forEach((key) => { const val = read(key); if (val !== undefined) data[key] = val; });
  const get = (key) => data[key];
  const set = (key, val) => {
    data[key] = val;
    if (saved.includes(key)) write(key, val);
    (subs[key] || []).forEach((fn) => fn(val));
  };
  const sub = (key, fn) => {
    (subs[key] = subs[key] || []).push(fn);
    return () => { subs[key] = subs[key].filter((item) => item !== fn); };
  };
  const toggleDone = (id) => {
    const next = Object.assign({}, data.done);
    if (next[id]) delete next[id]; else next[id] = 1;
    set('done', next);
  };
  const saveScore = (id, pct) => {
    const next = Object.assign({}, data.scores);
    next[id] = Math.max(next[id] || 0, pct);
    set('scores', next);
  };
  AP2.state = {get, set, sub, toggleDone, saveScore};
})();
