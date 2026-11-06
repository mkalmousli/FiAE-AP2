// Einstieg: im Betrieb eine gebündelte Datei (bundle.js, erzeugt von build.mjs), lokal alle Einzeldateien laut Manifest.
// Lokal (localhost) oder mit ?dev lädt immer die Einzeldateien, damit Änderungen ohne Build sichtbar sind; ?bundle erzwingt das Bündel.
const VERSION = '9842b9d3c1';
// Seitenteile: pages('ps', {phasen: 3}) lädt content/ps/phasen-1.js bis phasen-3.js.
const freshAP2 = () => {
  window.AP2 = {files: [], blocks: {}, tools: {}};
  AP2.pages = (dir, spec) => Object.keys(spec).forEach((name) => {
    for (let i = 1; i <= spec[name]; i++) AP2.files.push('content/' + dir + '/' + name + '-' + i + '.js');
  });
};
freshAP2();
// Für Updates ohne Neuladen: Listener auf window/document und Intervalle der App werden gemerkt und beim Austausch entfernt.
const nativeAdd = EventTarget.prototype.addEventListener;
const nativeInterval = window.setInterval;
const tracked = {l: [], t: []};
EventTarget.prototype.addEventListener = function (type, fn, opts) {
  if (this === window || this === document) tracked.l.push([this, type, fn, opts]);
  return nativeAdd.call(this, type, fn, opts);
};
window.setInterval = function () { const id = nativeInterval.apply(window, arguments); tracked.t.push(id); return id; };
(function () {
  const names = ['core', 'ui', 'viz', 'tools', 'ps', 'infra', 'eua', 'wiso', 'de', 'gk', 'exam', 'course', 'ref', 'last'];
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
    ? nativeAdd.call(document, 'DOMContentLoaded', boot) : boot());
  const single = () => loadList(names.map((name) => 'manifest/' + name + '.js'), 0, 0.1, () => loadList(AP2.files, 0.1, 0.9, ready));
  const q = location.search;
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const dev = VERSION === 'dev' || /[?&]dev\b/.test(q) || (local && !/[?&]bundle\b/.test(q));
  if (dev) { single(); return; }
  // Bündel: ein Request; schlägt er fehl, Einzeldateien als Rückfall.
  const el = document.createElement('script');
  el.src = 'bundle.js?v=' + VERSION;
  el.onload = () => { progress(1, 1, 1, ''); ready(); };
  el.onerror = () => { freshAP2(); single(); };
  progress(0.3, 0, 1, 'bundle.js');
  document.head.appendChild(el);
  // Offline-Nutzung und schneller Neustart. Updates: main.js (enthält VERSION) wird am Cache vorbei geprüft.
  // Eine neue Version ersetzt die laufende App an Ort und Stelle (kein Neuladen): Bundle holen, alte App abbauen, neu starten.
  // Zustand liegt in localStorage, die Route im Hash; getippt wird nie unterbrochen (dann beim nächsten Check).
  if ('serviceWorker' in navigator) nativeAdd.call(window, 'load', () => navigator.serviceWorker.register('sw.js', {updateViaCache: 'none'}).catch(() => {}));
  let busy = false;
  let cur = VERSION;
  const hardReload = () => {
    const reg = 'serviceWorker' in navigator ? navigator.serviceWorker.getRegistration() : Promise.resolve(null);
    reg.then((r) => r && r.update()).catch(() => {})
      .then(() => window.caches ? caches.keys().then((ks) => Promise.all(ks.filter((k) => k.indexOf('ap2-') === 0).map((k) => caches.delete(k)))) : null)
      .catch(() => {}).then(() => location.reload());
  };
  const toast = (text) => {
    const t = document.createElement('div');
    t.setAttribute('role', 'status');
    t.setAttribute('data-keep', '1');
    t.style.cssText = 'position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:99999;padding:8px 14px;border-radius:10px;background:#1f2937;color:#fff;font:14px/1.3 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.35)';
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  };
  const typing = () => {
    const a = document.activeElement;
    return !!a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable);
  };
  const swap = (ver) => {
    if (typing()) return Promise.resolve(false); // später erneut
    return fetch('bundle.js?v=' + ver).then((r) => { if (!r.ok) throw new Error('bundle'); return r.text(); }).then(() => {
      if (typing()) return false;
      tracked.l.forEach((x) => x[0].removeEventListener(x[1], x[2], x[3]));
      tracked.t.forEach((id) => clearInterval(id));
      tracked.l.length = 0; tracked.t.length = 0;
      Array.from(document.body.children).forEach((n) => { if (!n.hasAttribute('data-keep')) n.remove(); });
      freshAP2();
      return new Promise((res, rej) => {
        const s2 = document.createElement('script');
        s2.src = 'bundle.js?v=' + ver;
        s2.onload = () => { try { AP2.app.start(); cur = ver; res(true); } catch (e) { rej(e); } };
        s2.onerror = rej;
        document.head.appendChild(s2);
      });
    });
  };
  const check = () => {
    if (busy || VERSION === 'dev' || dev || !navigator.onLine) return;
    busy = true;
    fetch('main.js?check=' + Date.now(), {cache: 'no-store'}).then((r) => r.ok ? r.text() : '').then((txt) => {
      const m = /const VERSION = '([^']+)'/.exec(txt);
      if (!m || m[1] === cur) return;
      return swap(m[1]).then((ok) => { if (ok) toast('App aktualisiert'); }, () => hardReload());
    }).catch(() => {}).then(() => { busy = false; });
  };
  nativeAdd.call(window, 'load', () => setTimeout(check, 3000));
  nativeAdd.call(document, 'visibilitychange', () => { if (!document.hidden) check(); });
  nativeAdd.call(window, 'online', check);
  nativeInterval.call(window, check, 2 * 60 * 1000);
})();
