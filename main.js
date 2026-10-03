// Einstieg: lädt alle Manifeste, danach alle darin gelisteten Dateien in fester Reihenfolge.
window.AP2 = {files: [], blocks: {}, tools: {}};
// Seitenteile: pages('ps', {phasen: 3}) lädt content/ps/phasen-1.js bis phasen-3.js.
AP2.pages = (dir, spec) => Object.keys(spec).forEach((name) => {
  for (let i = 1; i <= spec[name]; i++) AP2.files.push('content/' + dir + '/' + name + '-' + i + '.js');
});
(function () {
  const names = ['core', 'ui', 'viz', 'tools', 'ps', 'infra', 'eua', 'wiso', 'de', 'exam', 'course', 'ref', 'last'];
  const loadList = (list, done) => {
    let idx = 0;
    const next = () => {
      if (idx >= list.length) return done();
      const el = document.createElement('script');
      el.src = list[idx++];
      el.onload = next;
      el.onerror = () => { console.error('Ladefehler: ' + el.src); next(); };
      document.head.appendChild(el);
    };
    next();
  };
  const boot = () => AP2.app.start();
  const ready = () => (document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot) : boot());
  loadList(names.map((name) => 'manifest/' + name + '.js'), () => loadList(AP2.files, ready));
})();
