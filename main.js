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
  const style = document.createElement('style');
  style.textContent = `
#ap2-loader{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:18px;
    background:radial-gradient(circle at 50% 35%,#1e2a4a,#0b1020 70%);color:#e8ecf8;font:15px/1.4 system-ui,sans-serif;transition:opacity .45s,transform .45s}
#ap2-loader.done{opacity:0;transform:scale(1.04);pointer-events:none}
#ap2-loader .logo{width:72px;height:72px;border-radius:20px;display:grid;place-items:center;font-weight:800;font-size:26px;letter-spacing:-1px;
    background:linear-gradient(135deg,#4f8cff,#9b6bff);box-shadow:0 0 40px #4f8cff66;animation:ap2pulse 1.8s ease-in-out infinite}
#ap2-loader h1{margin:0;font-size:20px;font-weight:600}
#ap2-loader .bar{width:min(340px,80vw);height:8px;border-radius:99px;background:#ffffff1c;overflow:hidden}
#ap2-loader .fill{height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#4f8cff,#9b6bff,#4f8cff);background-size:200% 100%;
    animation:ap2slide 1.2s linear infinite;transition:width .25s ease-out;box-shadow:0 0 12px #6f8cff}
#ap2-loader .row{width:min(340px,80vw);display:flex;justify-content:space-between;font-variant-numeric:tabular-nums;font-size:13px;color:#aab4d4}
#ap2-loader .pct{font-size:28px;font-weight:700;color:#fff}
#ap2-loader .file{max-width:80vw;font:12px ui-monospace,monospace;color:#6f7aa0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:16px}
@keyframes ap2slide{to{background-position:-200% 0}}
@keyframes ap2pulse{50%{transform:scale(1.07);box-shadow:0 0 60px #9b6bffaa}}
`;
  document.head.appendChild(style);
  const box0 = document.createElement('div');
  box0.id = 'ap2-loader';
  box0.innerHTML = `
    <div class="logo">AP2</div>
    <h1>AP2 FiAE Lernportal</h1>
    <div class="pct" id="ap2-pct">0%</div>
    <div class="bar"><div class="fill" id="ap2-fill"></div></div>
    <div class="row"><span id="ap2-count">Starte…</span><span id="ap2-eta">Restzeit: berechne…</span></div>
    <div class="file" id="ap2-file"></div>`;
  document.body.appendChild(box0);
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
