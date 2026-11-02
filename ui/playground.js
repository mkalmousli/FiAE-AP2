// Spielwiese: Code bearbeiten, live ausführen und Vorschau sehen.
// HTML/CSS/JS laufen in einem Sandbox-iframe, Python (Pyodide) und SQL (sql.js) werden erst bei Bedarf nachgeladen.
// Block "try": ['try', {t, html, css, js, h, checks: [[Beschreibung, Selektor, Eigenschaft, Sollwert]]}]
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const CDN = {
    pyodide: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
    sql: 'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/',
  };
  const SEED = `CREATE TABLE kunde (kunde_id INTEGER PRIMARY KEY, nachname TEXT, vorname TEXT, plz TEXT, ort TEXT);
INSERT INTO kunde VALUES (1,'Muster','Max','12345','Musterhausen'),(2,'Könner','Tom','72764','Reutlingen'),(3,'Weiß','Anna','88000','München'),(4,'Yilmaz','Cem','72764','Reutlingen');
CREATE TABLE artikel (artikel_id INTEGER PRIMARY KEY, bezeichnung TEXT, preis REAL, kategorie TEXT);
INSERT INTO artikel VALUES (10,'Feuerdorn',5.00,'Strauch'),(11,'rote Rosen',2.30,'Blume'),(12,'Linde',42.50,'Baum'),(13,'Flieder',19.50,'Strauch'),(14,'Glockenblume',1.80,'Blume');
CREATE TABLE bestellung (bestell_id INTEGER PRIMARY KEY, kunde_id INTEGER REFERENCES kunde(kunde_id), datum TEXT);
INSERT INTO bestellung VALUES (100,1,'2024-05-02'),(101,2,'2024-05-03'),(102,1,'2024-06-11'),(103,3,'2024-06-15');
CREATE TABLE position (bestell_id INTEGER REFERENCES bestellung(bestell_id), artikel_id INTEGER REFERENCES artikel(artikel_id), menge INTEGER, PRIMARY KEY (bestell_id, artikel_id));
INSERT INTO position VALUES (100,10,3),(100,11,10),(101,12,1),(102,13,2),(102,14,12),(103,11,5);`;

  const loaded = {};
  const loadScript = (src) => loaded[src] || (loaded[src] = new Promise((ok, fail) => {
    const el = document.createElement('script');
    el.src = src;
    el.onload = ok;
    el.onerror = () => { delete loaded[src]; fail(new Error('Nachladen fehlgeschlagen (offline?): ' + src)); };
    document.head.appendChild(el);
  }));
  let pyPromise = null;
  const getPython = () => pyPromise || (pyPromise = loadScript(CDN.pyodide + 'pyodide.js').then(() => window.loadPyodide({indexURL: CDN.pyodide})).catch((err) => { pyPromise = null; throw err; }));
  let sqlPromise = null;
  const getSql = () => sqlPromise || (sqlPromise = loadScript(CDN.sql + 'sql-wasm.js').then(() => window.initSqlJs({locateFile: (f) => CDN.sql + f})).catch((err) => { sqlPromise = null; throw err; }));

  // Dokument für den iframe; meldet Konsole, Fehler und Prüfergebnisse per postMessage zurück.
  const buildDoc = (id, parts, checks) => {
    const html = parts.html || '';
    const full = /<html[\s>]/i.test(html);
    const bridge = `<script>(function(){var id=${JSON.stringify(id)};function send(t,v){parent.postMessage({ap2:id,type:t,v:v},'*');}
['log','info','warn','error'].forEach(function(k){var o=console[k];console[k]=function(){send(k,[].map.call(arguments,function(a){try{return typeof a==='object'?JSON.stringify(a):String(a);}catch(e){return String(a);}}).join(' '));o.apply(console,arguments);};});
window.addEventListener('error',function(e){send('error',e.message);});
window.addEventListener('load',function(){var checks=${JSON.stringify(checks || [])};var res=checks.map(function(c){var el=document.querySelector(c[1]);if(!el)return [false,'Element '+c[1]+' fehlt'];if(!c[2])return [true,''];var v=c[2].indexOf('attr:')===0?el.getAttribute(c[2].slice(5)):getComputedStyle(el).getPropertyValue(c[2]);var ok=String(v).replace(/\\s+/g,' ').trim()===String(c[3]);return [ok,'ist: '+v];});send('checks',res);});})();<\/script>`;
    const style = parts.css ? '<style>' + parts.css + '</style>' : '';
    const script = parts.js ? '<script>' + parts.js + '<\/script>' : '';
    const base = '<base target="_blank"><style>body{font-family:system-ui,sans-serif;margin:12px}</style>';
    if (full) return html.replace(/<\/head>/i, base + style + '</head>').replace(/<\/body>/i, bridge + script + '</body>');
    return '<!DOCTYPE html><html><head><meta charset="utf-8">' + base + style + '</head><body>' + html + bridge + script + '</body></html>';
  };

  const taStyle = (c) => ({width: '100%', boxSizing: 'border-box', minHeight: '120px', padding: '10px 12px', border: '1px solid ' + c.border, borderRadius: S.r.md,
    backgroundColor: c.surface2, color: c.text, fontFamily: S.font.mono, fontSize: S.f.sm, lineHeight: S.lh.code, resize: 'vertical', tabSize: 4});
  const paint = (node, fn) => AP2.theme.bind(node, (n, c) => Object.assign(n.style, fn(c)));
  const lines = (src) => Math.min(18, Math.max(5, src.split('\n').length + 1));

  const editor = (value, rows, onInput) => {
    const ta = h('textarea', {attrs: {spellcheck: 'false', rows: String(rows)}});
    ta.value = value;
    ta.addEventListener('input', () => onInput(ta.value));
    ta.addEventListener('keydown', (ev) => {
      if (ev.key !== 'Tab') return;
      ev.preventDefault();
      const a = ta.selectionStart;
      ta.value = ta.value.slice(0, a) + '  ' + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = a + 2;
      onInput(ta.value);
    });
    return paint(ta, taStyle);
  };

  const outBox = () => paint(h('pre', {style: {margin: '8px 0 0', padding: '10px 12px', borderRadius: S.r.md, whiteSpace: 'pre-wrap', overflowX: 'auto',
    fontFamily: S.font.mono, fontSize: S.f.sm, minHeight: '24px'}}), (c) => ({backgroundColor: c.surface, border: '1px solid ' + c.border, color: c.text}));

  const label = (text) => AP2.tint(h('div', {text, style: {fontSize: S.f.xs, fontWeight: S.fw.bold, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '10px 0 4px'}}), 'text3');

  const table = (res) => {
    const t = h('table', {style: {borderCollapse: 'collapse', fontSize: S.f.sm, margin: '6px 0'}});
    const row = (cells, head) => {
      const tr = h('tr');
      cells.forEach((v) => tr.appendChild(paint(h(head ? 'th' : 'td', {text: v === null ? 'NULL' : String(v), style: {padding: '4px 10px', textAlign: 'left', border: '1px solid'}}),
        (c) => ({borderColor: c.border, backgroundColor: head ? c.surface2 : c.surface, color: v === null ? c.text3 : c.text}))));
      t.appendChild(tr);
    };
    row(res.columns, true);
    res.values.forEach((r) => row(r, false));
    return h('div', {style: {overflowX: 'auto'}}, [t]);
  };

  // Gemeinsamer Aufbau: Bearbeitungsfelder, Ausführen-Knopf, Ausgabe.
  // spec = {lang, parts: {html, css, js} oder {src}, checks, height}
  let uid = 0;
  const playground = (spec) => {
    const id = 'pg' + (++uid);
    const lang = spec.lang;
    const src = Object.assign({}, spec.parts);
    const orig = Object.assign({}, src);
    const web = lang === 'web';
    const out = h('div');
    const checkBox = h('div');
    const fields = web ? ['html', 'css', 'js'].filter((k) => src[k] !== undefined) : ['src'];
    const tabs = h('div', {style: {display: 'flex', gap: S.sp[2], marginBottom: S.sp[2]}});
    const editors = {};
    let cur = fields[0];
    const holder = h('div');
    const showTab = () => {
      holder.textContent = '';
      holder.appendChild(editors[cur]);
      tabBtns.forEach((b) => b.repaint && b.repaint());
    };
    const tabBtns = fields.map((k) => {
      const el = h('div', {text: k === 'src' ? ({python: 'Python', sql: 'SQL', js: 'JavaScript', html: 'HTML'}[lang] || lang) : k.toUpperCase(),
        style: {padding: '4px 12px', borderRadius: S.r.pill, border: '1px solid', fontSize: S.f.sm, fontWeight: S.fw.med}});
      return AP2.press(el, {role: 'tab', fn: () => { cur = k; showTab(); }, hover: (c) => ({borderColor: c.accent}),
        base: (c) => (cur === k ? {backgroundColor: c.accent, color: c.onAccent, borderColor: c.accent} : {backgroundColor: c.surface, color: c.text2, borderColor: c.border})});
    });
    if (fields.length > 1) tabBtns.forEach((b) => tabs.appendChild(b));
    let timer = 0;
    fields.forEach((k) => { editors[k] = editor(src[k] || '', lines(src[k] || ''), (v) => { src[k] = v; if (web) { clearTimeout(timer); timer = setTimeout(run, 350); } }); });

    // Web-Vorschau
    let frame = null;
    const listener = (ev) => {
      const d = ev.data;
      if (!d || d.ap2 !== id) return;
      if (d.type === 'checks') showChecks(d.v);
      else if (d.type === 'error' || d.type === 'warn') logLine(d.type === 'error' ? 'Fehler: ' + d.v : d.v, d.type === 'error');
      else logLine(d.v, false);
    };
    window.addEventListener('message', listener);
    const logBox = outBox();
    const logLine = (txt, bad) => {
      logBox.style.display = '';
      logBox.appendChild(paint(h('div', {text: (bad ? '' : '> ') + txt}), (c) => ({color: bad ? c.bad : c.text})));
    };
    const showChecks = (res) => {
      checkBox.textContent = '';
      if (!res.length) return;
      const done = res.filter((r) => r[0]).length;
      const head = h('div', {text: done === res.length ? 'Alle Prüfungen bestanden (' + done + '/' + res.length + ')' : 'Prüfungen: ' + done + '/' + res.length, style: {fontWeight: S.fw.bold, margin: '8px 0 4px'}});
      paint(head, (c) => ({color: done === res.length ? c.ok : c.text}));
      checkBox.appendChild(head);
      res.forEach((r, i) => {
        const line = h('div', {text: (r[0] ? '✓ ' : '✗ ') + spec.checks[i][0] + (r[0] ? '' : ' (' + r[1] + ')'), style: {fontSize: S.f.sm}});
        paint(line, (c) => ({color: r[0] ? c.ok : c.text2}));
        checkBox.appendChild(line);
      });
      if (done === res.length && AP2.game && AP2.game.award && !spec.rewarded) { spec.rewarded = true; try { AP2.game.award(5); } catch (e) { /* optional */ } }
    };
    const runWeb = () => {
      logBox.textContent = '';
      logBox.style.display = 'none';
      checkBox.textContent = '';
      if (!frame) {
        frame = h('iframe', {attrs: {sandbox: 'allow-scripts allow-popups', title: 'Vorschau'}, style: {width: '100%', height: (spec.height || 220) + 'px', border: '1px solid', borderRadius: S.r.md, background: '#fff', display: 'block', resize: 'both', overflow: 'auto', maxWidth: '100%'}});
        paint(frame, (c) => ({borderColor: c.border}));
        out.textContent = '';
        out.appendChild(label('Vorschau'));
        out.appendChild(frame);
        out.appendChild(checkBox);
        out.appendChild(logBox);
      }
      frame.srcdoc = buildDoc(id, src, spec.checks);
    };
    // Python
    const stdin = h('input', {attrs: {placeholder: 'Eingaben für input(), durch ; getrennt', type: 'text'}});
    paint(stdin, (c) => Object.assign(taStyle(c), {minHeight: '0', resize: 'none', marginTop: '6px'}));
    const status = (txt) => { out.textContent = ''; out.appendChild(paint(h('div', {text: txt, style: {fontSize: S.f.sm, marginTop: '8px'}}), (c) => ({color: c.text2}))); };
    const runPy = async () => {
      status('Python wird geladen (einmalig, ca. 10 MB) ...');
      try {
        const py = await getPython();
        const box = outBox();
        let buf = '';
        const inputs = stdin.value ? stdin.value.split(';').map((s) => s.trim()) : [];
        py.setStdout({batched: (s) => { buf += s + '\n'; }});
        py.setStderr({batched: (s) => { buf += s + '\n'; }});
        py.setStdin({stdin: () => (inputs.length ? inputs.shift() : '')});
        try { await py.runPythonAsync(src.src); } catch (err) { buf += String(err.message || err).split('\n').slice(-4).join('\n'); }
        box.textContent = buf || '(keine Ausgabe)';
        out.textContent = '';
        out.appendChild(label('Ausgabe'));
        out.appendChild(box);
      } catch (err) { status(err.message); }
    };
    const runSql = async () => {
      status('SQL wird geladen ...');
      try {
        const SQL = await getSql();
        const db = new SQL.Database();
        db.run(SEED);
        out.textContent = '';
        out.appendChild(label('Ergebnis (Beispieldatenbank Gartencenter)'));
        try {
          const res = db.exec(src.src);
          if (!res.length) out.appendChild(paint(h('div', {text: 'OK, keine Ergebniszeilen. Geändert: ' + db.getRowsModified() + ' Zeile(n).', style: {fontSize: S.f.sm}}), (c) => ({color: c.text2})));
          res.forEach((r) => out.appendChild(table(r)));
        } catch (err) { out.appendChild(paint(h('div', {text: 'Fehler: ' + err.message}), (c) => ({color: c.bad}))); }
        db.close();
      } catch (err) { status(err.message); }
    };
    const runJs = () => {
      out.textContent = '';
      out.appendChild(label('Ausgabe'));
      const box = outBox();
      const lines2 = [];
      const fake = {};
      ['log', 'info', 'warn', 'error'].forEach((k) => { fake[k] = (...a) => lines2.push(a.map((x) => (typeof x === 'object' ? JSON.stringify(x) : String(x))).join(' ')); });
      try { new Function('console', src.src)(fake); } catch (err) { lines2.push('Fehler: ' + err.message); }
      box.textContent = lines2.join('\n') || '(keine Ausgabe)';
      out.appendChild(box);
    };
    function run() { ({web: runWeb, python: runPy, sql: runSql, js: runJs})[lang](); }

    const reset = AP2.btn({text: 'Zurücksetzen', kind: 'ghost', small: true, fn: () => {
      Object.assign(src, orig);
      fields.forEach((k) => { editors[k].value = orig[k] || ''; });
      run();
    }});
    const go = AP2.btn({text: web ? 'Aktualisieren' : 'Ausführen', kind: 'primary', small: true, fn: run});
    const bar = h('div', {style: {display: 'flex', gap: S.sp[2], marginTop: S.sp[2], alignItems: 'center'}}, [go, reset]);
    showTab();
    const root = h('div', {style: {padding: '12px 14px'}}, [tabs, holder, lang === 'python' ? stdin : h('span'), bar, out]);
    if (web) run();
    return root;
  };
  AP2.playground = playground;

  // Block "try": Beispiel mit Live-Vorschau, bearbeitbar, optional mit Prüfungen.
  AP2.blocks.try = (spec) => {
    const parts = {html: spec.html || '', css: spec.css, js: spec.js};
    if (spec.css === undefined) delete parts.css;
    if (spec.js === undefined) delete parts.js;
    const head = AP2.tint(h('div', {text: 'Ausprobieren' + (spec.t ? ': ' + spec.t : ''), style: {fontSize: S.f.xs, fontWeight: S.fw.bold, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px 14px 0'}}), 'accent');
    const task = spec.task ? paint(h('div', {style: {padding: '4px 14px 0', fontSize: S.f.sm}}, [AP2.blocks.p ? AP2.blocks.p(spec.task) : spec.task]), (c) => ({color: c.text2})) : h('span');
    const box = h('div', {style: {border: '1px solid', borderRadius: S.r.md, margin: '0 0 ' + S.sp[5], overflow: 'hidden'}},
      [head, task, playground({lang: 'web', parts, checks: spec.checks, height: spec.h})]);
    return paint(box, (c) => ({backgroundColor: c.surface2, borderColor: c.border}));
  };

  // Vorhandene Code-Blöcke bekommen einen "Ausprobieren"-Knopf (html, js, python, sql).
  const baseCode = AP2.blocks.code;
  const RUNNABLE = {html: 'web', js: 'js', python: 'python', sql: 'sql'};
  AP2.blocks.code = (lang, source) => {
    const node = baseCode(lang, source);
    const kind = RUNNABLE[lang];
    if (!kind) return node;
    const src = source.replace(/^\n+|\s+$/g, '');
    if (kind === 'web' && !/<[a-z][\s\S]*>/i.test(src.replace(/<!--[\s\S]*?-->/g, ''))) return node;
    let open = null;
    const btn = AP2.btn({text: 'Ausprobieren', kind: 'ghost', small: true, fn: () => {
      if (open) { open.remove(); open = null; btn.firstChild.textContent = 'Ausprobieren'; return; }
      const parts = kind === 'web' ? {html: src} : {src};
      open = h('div', {style: {borderTop: '1px solid'}}, [playground({lang: kind, parts, height: 240})]);
      paint(open, (c) => ({borderColor: c.border}));
      node.appendChild(open);
      btn.firstChild.textContent = 'Schließen';
    }});
    const head = node.firstChild;
    head.insertBefore(h('div', {style: {display: 'flex', gap: S.sp[2]}}, [btn, head.lastChild]), null);
    return node;
  };
})();
