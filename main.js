// Einstieg: lädt alle Manifeste, danach alle darin gelisteten Dateien in fester Reihenfolge.
window.AP2 = {files: [], blocks: {}, tools: {}};
// Seitenteile: pages('ps', {phasen: 3}) lädt content/ps/phasen-1.js bis phasen-3.js.
AP2.pages = (dir, spec) => Object.keys(spec).forEach((name) => {
  for (let i = 1; i <= spec[name]; i++) AP2.files.push('content/' + dir + '/' + name + '-' + i + '.js');
});
(function () {
  const names = ['core', 'ui', 'viz', 'tools', 'ps', 'infra', 'eua', 'wiso', 'de', 'exam', 'course', 'ref', 'last'];
  // Ladeanzeige: Fortschritt, geglättete Restzeit (ETA) und aktuelle Datei.
  const $ = (id) => document.getElementById(id);
  const t0 = performance.now();
  let eta = null;
  const progress = (frac, done, total, file) => {
    const pct = Math.min(100, Math.round(frac * 100));
    const el = (performance.now() - t0) / 1000;
    if (frac > 0.04 && frac < 1) {
      const raw = el / frac - el;
      eta = eta === null ? raw : eta * 0.8 + raw * 0.2;
    }
    $('ap2-pct').textContent = pct + '%';
    $('ap2-fill').style.width = pct + '%';
    $('ap2-count').textContent = done + ' / ' + total + ' Dateien';
    $('ap2-eta').textContent = frac >= 1 ? 'Fertig!' : eta === null ? 'Restzeit: berechne…' : 'Restzeit: ~' + Math.max(1, Math.ceil(eta)) + ' s';
    $('ap2-file').textContent = file || '';
  };
  const finish = () => {
    progress(1, 0, 0, '');
    const box = $('ap2-loader');
    $('ap2-count').textContent = 'Geladen in ' + ((performance.now() - t0) / 1000).toFixed(1) + ' s';
    box.classList.add('done');
    setTimeout(() => box.remove(), 600);
  };
  // Alle Skripte laden parallel (async=false), laufen aber in Listenreihenfolge.
  const loadList = (list, base, span, done) => {
    let n = 0;
    if (!list.length) return done();
    list.forEach((src) => {
      const el = document.createElement('script');
      el.src = src;
      el.async = false;
      const fin = () => { n++; progress(base + span * n / list.length, n, list.length, src); if (n === list.length) done(); };
      el.onload = fin;
      el.onerror = () => { console.error('Ladefehler: ' + src); fin(); };
      document.head.appendChild(el);
    });
  };
  const boot = () => { AP2.app.start(); finish(); };
  const ready = () => (document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot) : boot());
  loadList(names.map((name) => 'manifest/' + name + '.js'), 0, 0.1, () => loadList(AP2.files, 0.1, 0.9, ready));
})();
