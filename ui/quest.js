// Quest: je Prüfungsbereich ein Abenteuer aus Stationen (eine je Thema), nur über Fragen. Routen: #/quest, #/quest/<block>, #/quest/<block>/<station>|boss|marathon.
// Daten: content/quest/<block>-N.js ruft AP2.quest(block, [{id: Seiten-ID, t: Stationsname, qs: [Fragen]}]) auf.
// Fragetypen: Auswahl {q,o,a}, {k:'multi',a:[..]}, {k:'tf',a:bool}, {k:'num',a,tol,u}, {k:'gap',a:[..]}, {k:'order',o:[richtige Reihenfolge]}, {k:'match',o:[[l,r]..]}; optional c (Code), lv (1 bis 3), e (Erklärung).
(function () {
  const {h, on, rich} = AP2;
  const S = AP2.S;
  const data = {};
  const AREAS = ['ps', 'infra', 'eua', 'wiso'];
  AP2.quest = (block, stations) => { (data[block] = data[block] || []).push(...stations); };
  AP2.questData = () => data;
  const qid = (st, q) => 'quest:' + AP2.bank.qid(st, q.q + (q.c || '')).split(':')[1];
  const prog = () => AP2.state.get('quest') || {};
  const saveProg = (key, pct) => {
    const all = Object.assign({}, prog());
    const old = all[key] || {best: 0, runs: 0};
    all[key] = {best: Math.max(old.best, pct), runs: old.runs + 1, last: pct};
    AP2.state.set('quest', all);
  };
  // Laufende Runde je Quest-Modus (b/mode), damit man nach Schließen oder Neuladen genau dort weitermacht.
  const runs = () => AP2.state.get('questRun') || {};
  const saveRun = (key, run) => { const all = Object.assign({}, runs()); if (run) all[key] = run; else delete all[key]; AP2.state.set('questRun', all); };
  const starsOf = (pct) => (pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.5 ? 1 : 0);
  const shuffle = (list) => { const a = list.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nameOf = (st) => st.t || (AP2.store.get(st.id) || {}).t || st.id;
  const blockName = (b) => (AP2.store.block(b) || {t: b}).t;
  const KIND = {mc: 'Auswahl', multi: 'Mehrfachauswahl', tf: 'Wahr oder falsch', num: 'Berechnung', gap: 'Lückentext', order: 'Reihenfolge', match: 'Zuordnung'};
  const title = (txt, size) => AP2.tint(h('h1', {text: txt, style: {fontSize: size || S.f.h1, fontWeight: S.fw.bold, letterSpacing: '-0.02em', lineHeight: S.lh.tight, margin: '0 0 ' + S.sp[2]}}), 'text');
  const para = (txt, tone) => AP2.tint(h('p', {style: {fontSize: S.f.md, lineHeight: S.lh.body, margin: '0 0 ' + S.sp[4]}}, rich(txt)), tone || 'text2');
  const pill = (text, tone) => {
    const el = h('span', {text, style: {padding: '2px 9px', borderRadius: S.r.pill, fontSize: '11px', fontWeight: S.fw.bold, letterSpacing: '0.04em'}});
    return AP2.theme.bind(el, (n, c) => { n.style.backgroundColor = c[tone + 'Soft'] || c.accentSoft; n.style.color = c[tone] || c.accent; });
  };
  const starRow = (n, size) => (() => {
    const row = h('span', {style: {display: 'inline-flex', gap: '1px'}});
    for (let i = 0; i < 3; i++) { const s = AP2.tint(h('span', {style: {display: 'flex'}}, [AP2.icon('star', size || 14)]), i < n ? 'gold' : 'border'); row.appendChild(s); }
    return row;
  })();

  // ---------- Übersicht aller Quests ----------
  const overview = () => {
    const root = h('div', {}, [AP2.gk.kicker('Lernabenteuer', 'accent'), title('Quests'),
      para('Jeder Prüfungsbereich ist eine Reise durch **alle Themen**, eine Station je Thema, nur mit Fragen: Auswahl, Rechnen, Lückentext, Reihenfolge, Zuordnen, Code lesen. Sammle **bis zu drei Sterne** je Station, baue **Combos** auf und besiege am Ende den **Endboss**.')]);
    const grid = h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: S.sp[3]}});
    AREAS.filter((b) => data[b]).forEach((b) => {
      const list = data[b];
      const n = list.reduce((a, st) => a + st.qs.length, 0);
      const p = prog();
      const stars = list.reduce((a, st) => a + starsOf((p[b + '/' + st.id] || {}).best || 0), 0);
      const cleared = list.filter((st) => starsOf((p[b + '/' + st.id] || {}).best || 0) > 0).length;
      const el = h('div', {style: {padding: '18px 20px', borderRadius: S.r.lg, border: '1px solid', borderTop: '5px solid'}}, [
        AP2.tint(h('div', {text: blockName(b), style: {fontSize: S.f.lg, fontWeight: S.fw.bold, marginBottom: '4px'}}), 'text'),
        AP2.tint(h('div', {text: list.length + ' Stationen  ·  ' + n + ' Fragen', style: {fontSize: S.f.sm}}), 'text2'),
        h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[2], margin: S.sp[3] + ' 0 ' + S.sp[2]}}, [AP2.tint(h('span', {style: {display: 'flex'}}, [AP2.icon('star', 16)]), 'gold'),
          AP2.tint(h('span', {text: stars + ' / ' + list.length * 3 + ' Sterne  ·  ' + cleared + ' Stationen geschafft', style: {fontSize: S.f.sm, fontWeight: S.fw.semi}}), 'text')]),
        AP2.gk.bar(list.length ? stars / (list.length * 3) : 0)]);
      grid.appendChild(AP2.press(el, {fn: () => AP2.router.go('quest/' + b), label: 'Quest ' + blockName(b), base: (c) => ({backgroundColor: c.surface, borderColor: c.border, borderTopColor: c.block[b]}), hover: (c) => ({backgroundColor: c.hover})}));
    });
    root.appendChild(grid);
    return root;
  };

  // ---------- Karte eines Bereichs: Stationen als Pfad ----------
  const mapView = (b) => {
    AP2.theme.setTone(b);
    const list = data[b];
    const p = prog();
    const nextIdx = Math.max(0, list.findIndex((st) => starsOf((p[b + '/' + st.id] || {}).best || 0) === 0));
    const n = list.reduce((a, st) => a + st.qs.length, 0);
    const root = h('div', {}, [AP2.gk.kicker('Quest  ·  ' + list.length + ' Stationen  ·  ' + n + ' Fragen', 'accent'), title(blockName(b)),
      para('Arbeite dich Station für Station durch alle Themen. Ab **50 %** gibt es einen Stern, ab **70 %** zwei, ab **90 %** drei. Die markierte Station ist dein nächstes Ziel.')]);
    const open = runs();
    const running = Object.keys(open).filter((k) => k.indexOf(b + '/') === 0).map((k) => k.slice(b.length + 1));
    const runName = (m) => (m === 'boss' ? 'Endboss' : m === 'marathon' ? 'Marathon' : nameOf(list.find((x) => x.id === m) || {id: m}));
    const modes = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2], marginBottom: S.sp[5]}}, [
      ...running.map((m) => AP2.btn({text: 'Fortsetzen: ' + runName(m) + ' (' + open[b + '/' + m].i + '/' + open[b + '/' + m].order.length + ')', icon: AP2.icon('play', 16), kind: 'primary', fn: () => AP2.router.go('quest/' + b + '/' + m)})),
      AP2.btn({text: 'Weiter: ' + nameOf(list[nextIdx]), icon: AP2.icon('play', 16), kind: running.length ? 'soft' : 'primary', fn: () => AP2.router.go('quest/' + b + '/' + list[nextIdx].id)}),
      AP2.btn({text: 'Endboss (30 Fragen, 3 Leben)', icon: AP2.icon('sword', 16), fn: () => AP2.router.go('quest/' + b + '/boss')}),
      AP2.btn({text: 'Marathon: alle ' + n + ' Fragen', icon: AP2.icon('route', 16), fn: () => AP2.router.go('quest/' + b + '/marathon')}),
      AP2.spickSheets && AP2.spickSheets().some((s) => s.id === b) ? AP2.btn({text: 'Spickzettel', icon: AP2.icon('cards', 16), fn: () => AP2.router.go('spick/' + b)}) : null]);
    root.appendChild(modes);
    // Serpentine: Reihen abwechselnd links und rechts, verbunden durch eine gestrichelte Linie (Rand der Kacheln).
    const path = h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 210px), 1fr))', gap: S.sp[3]}});
    list.forEach((st, i) => {
      const rec = p[b + '/' + st.id];
      const stars = starsOf(rec ? rec.best : 0);
      const isNext = i === nextIdx;
      const num = h('div', {text: String(i + 1), style: {width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: S.fw.bold, fontSize: S.f.sm, flexShrink: 0, border: '3px solid'}});
      AP2.theme.bind(num, (nn, c) => { const done = stars > 0; nn.style.backgroundColor = done ? c.accent : isNext ? c.goldSoft : c.surface2; nn.style.color = done ? c.onAccent : c.text; nn.style.borderColor = isNext ? c.gold : done ? c.accent : c.border; });
      const el = h('div', {style: {padding: '12px 14px', borderRadius: S.r.lg, border: '2px solid', display: 'flex', gap: S.sp[3], alignItems: 'center', position: 'relative'}}, [num,
        h('div', {style: {minWidth: 0, flex: '1 1 0'}}, [AP2.tint(h('div', {text: nameOf(st), style: {fontSize: S.f.sm, fontWeight: S.fw.semi, lineHeight: '1.3'}}), 'text'),
          h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[2], marginTop: '4px'}}, [starRow(stars, 13),
            AP2.tint(h('span', {text: st.qs.length + ' Fragen' + (rec ? '  ·  Bestwert ' + Math.round(rec.best * 100) + ' %' : ''), style: {fontSize: '11px'}}), 'text3')])]),
        isNext ? pill('NÄCHSTES ZIEL', 'gold') : null]);
      if (isNext) { el.lastChild.style.position = 'absolute'; el.lastChild.style.top = '-10px'; el.lastChild.style.right = '10px'; }
      path.appendChild(AP2.press(el, {fn: () => AP2.router.go('quest/' + b + '/' + st.id), label: 'Station ' + (i + 1) + ': ' + nameOf(st),
        base: (c) => ({backgroundColor: stars === 3 ? c.goldSoft : c.surface, borderColor: isNext ? c.gold : stars ? c.accent : c.border, borderStyle: stars || isNext ? 'solid' : 'dashed'}), hover: (c) => ({backgroundColor: c.hover})}));
    });
    root.appendChild(path);
    return root;
  };

  // ---------- Eingaben je Fragetyp: liefern {el, check() -> bool|null, show(ok)} ----------
  const choiceBtn = (label, idx, onPick) => {
    const badge = h('span', {text: idx < 9 ? String(idx + 1) : '', style: {width: '26px', height: '26px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: S.f.xs, fontWeight: S.fw.bold, flexShrink: 0, border: '1px solid'}});
    const el = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], padding: '11px 14px', borderRadius: S.r.md, border: '2px solid', marginBottom: S.sp[2], fontSize: S.f.md, lineHeight: '1.45'}},
      [badge, h('div', {style: {flex: '1 1 0', overflowWrap: 'anywhere'}}, rich(label))]);
    el.mode = 'idle';
    AP2.press(el, {fn: () => onPick(idx), label: String(label).replace(/\*\*|`/g, ''), base: (c) => {
      const m = el.mode;
      const col = m === 'right' ? [c.okSoft, c.ok] : m === 'wrong' ? [c.badSoft, c.bad] : m === 'sel' ? [c.accentSoft, c.accent] : m === 'miss' ? [c.surface, c.ok] : [c.surface, c.border];
      AP2.st(badge, {backgroundColor: col[1] === c.border ? c.surface2 : col[1], color: col[1] === c.border ? c.text2 : c.surface, borderColor: col[1]});
      return {backgroundColor: col[0], borderColor: col[1], color: m === 'dim' ? c.text3 : c.text, borderStyle: m === 'miss' ? 'dashed' : 'solid'};
    }, hover: (c) => (el.locked ? {} : {borderColor: c.accent})});
    el.set = (m) => { el.mode = m; el.repaint(); };
    return el;
  };
  const inputs = {};
  inputs.mc = (q, done) => {
    const idx = shuffle(q.o.map((_, i) => i));
    let locked = false;
    const btns = idx.map((orig, pos) => choiceBtn(q.o[orig], pos, () => { if (locked) return; locked = true; const ok = orig === q.a; btns.forEach((b, j) => { b.locked = true; b.set(idx[j] === q.a ? 'right' : j === pos ? 'wrong' : 'dim'); }); done(ok, ok ? '' : rich('Richtig: **' + q.o[q.a] + '**')); }));
    return {el: h('div', {}, btns), instant: true, key: (n) => { if (btns[n]) btns[n].click(); }};
  };
  inputs.tf = (q, done) => inputs.mc({q: q.q, o: ['Wahr', 'Falsch'], a: q.a ? 0 : 1}, done);
  inputs.multi = (q, done) => {
    const idx = shuffle(q.o.map((_, i) => i));
    const sel = new Set();
    let locked = false;
    const btns = idx.map((orig, pos) => choiceBtn(q.o[orig], pos, () => { if (locked) return; if (sel.has(pos)) sel.delete(pos); else sel.add(pos); btns[pos].set(sel.has(pos) ? 'sel' : 'idle'); }));
    return {el: h('div', {}, [AP2.tint(h('div', {text: 'Mehrere Antworten richtig. Wähle alle passenden aus und prüfe.', style: {fontSize: S.f.xs, marginBottom: S.sp[2]}}), 'text3')].concat(btns)),
      key: (n) => { if (btns[n]) btns[n].click(); },
      submit: () => {
        locked = true;
        const want = new Set(q.a);
        let ok = true;
        btns.forEach((b, j) => { const should = want.has(idx[j]); const has = sel.has(j); if (should !== has) ok = false; b.locked = true; b.set(should && has ? 'right' : should ? 'miss' : has ? 'wrong' : 'dim'); });
        done(ok, ok ? '' : rich('Richtig sind: **' + q.a.map((i) => q.o[i]).join('**, **') + '**'));
      }};
  };
  const textField = (ph, mono) => AP2.field(h('input', {attrs: {type: 'text', placeholder: ph, autocomplete: 'off', spellcheck: 'false'}, style: {width: '100%', fontFamily: mono ? S.font.mono : S.font.sans, fontSize: S.f.lg}}));
  inputs.num = (q, done) => {
    const f = textField('Ergebnis' + (q.u ? ' in ' + q.u : ''), true);
    const unit = q.u ? AP2.tint(h('span', {text: q.u, style: {fontSize: S.f.md, fontWeight: S.fw.semi, whiteSpace: 'nowrap'}}), 'text2') : null;
    setTimeout(() => f.focus(), 30);
    return {el: h('div', {style: {display: 'flex', gap: S.sp[3], alignItems: 'center'}}, [f, unit]), field: f,
      submit: () => {
        const raw = f.value.trim().replace(/\s|€|%/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.');
        const val = parseFloat(raw);
        const ok = !isNaN(val) && Math.abs(val - q.a) <= (q.tol || 0) + 1e-6 + Math.abs(q.a) * 1e-9;
        f.disabled = true;
        done(ok, ok ? '' : rich('Richtig: **' + String(q.a).replace('.', ',') + (q.u ? ' ' + q.u : '') + '**'));
      }};
  };
  const norm = (s) => String(s).toLowerCase().replace(/[\s\-_.]+/g, ' ').replace(/ß/g, 'ss').trim();
  inputs.gap = (q, done) => {
    const f = textField('Antwort eintippen');
    setTimeout(() => f.focus(), 30);
    return {el: f, field: f, submit: () => { const v = norm(f.value); const ok = !!v && [].concat(q.a).some((a) => norm(a) === v); f.disabled = true; done(ok, ok ? '' : rich('Richtig: **' + [].concat(q.a)[0] + '**')); }};
  };
  const chip = (text, i, fn) => {
    const el = h('span', {style: {display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: S.r.md, border: '2px solid', fontSize: S.f.sm, lineHeight: '1.4', margin: '0 6px 6px 0'}}, rich(text));
    el.tone = null;
    AP2.press(el, {fn, label: String(text), base: (c) => (el.tone != null ? {backgroundColor: c.catSoft[el.tone % 7], borderColor: c.cat[el.tone % 7], color: c.text} : el.bad ? {backgroundColor: c.badSoft, borderColor: c.bad, color: c.text} : el.good ? {backgroundColor: c.okSoft, borderColor: c.ok, color: c.text} : {backgroundColor: c.surface, borderColor: c.border, color: c.text}), hover: (c) => ({borderColor: c.accent})});
    return el;
  };
  inputs.order = (q, done) => {
    let pool = shuffle(q.o.map((_, i) => i));
    if (pool.every((v, i) => v === i) && pool.length > 1) pool = pool.slice(1).concat(pool[0]);
    const picked = [];
    let locked = false;
    const top = h('div', {style: {minHeight: '48px', padding: '8px', borderRadius: S.r.md, border: '2px dashed', marginBottom: S.sp[3]}});
    AP2.theme.bind(top, (n, c) => { n.style.borderColor = c.border; });
    const bottom = h('div');
    const draw = () => {
      AP2.dispose(top); AP2.dispose(bottom);
      if (!picked.length) top.appendChild(AP2.tint(h('span', {text: 'Tippe die Elemente unten in der richtigen Reihenfolge an.', style: {fontSize: S.f.xs}}), 'text3'));
      picked.forEach((orig, pos) => { const c = chip((pos + 1) + '. ' + q.o[orig], pos, () => { if (locked) return; picked.splice(pos, 1); draw(); }); c.tone = pos; top.appendChild(c); c.repaint(); });
      pool.filter((x) => !picked.includes(x)).forEach((orig) => bottom.appendChild(chip(q.o[orig], 0, () => { if (locked) return; picked.push(orig); draw(); })));
    };
    draw();
    return {el: h('div', {}, [top, bottom]), submit: () => {
      if (picked.length < q.o.length) { pool.filter((x) => !picked.includes(x)).forEach((x) => picked.push(x)); }
      locked = true;
      const ok = picked.every((v, i) => v === i);
      draw();
      [].forEach.call(top.children, (c, i) => { c.tone = null; c.good = picked[i] === i; c.bad = !c.good; c.repaint(); });
      done(ok, ok ? '' : rich('Richtig: ' + q.o.map((x, i) => (i + 1) + '. **' + x + '**').join('  ')));
    }};
  };
  inputs.match = (q, done) => {
    const right = shuffle(q.o.map((_, i) => i));
    const pair = {};
    let cur = null;
    let locked = false;
    const lefts = q.o.map((p, i) => chip(p[0], i, () => { if (locked) return; cur = i; paint(); }));
    const rights = right.map((orig) => chip(q.o[orig][1], 0, () => {
      if (locked || cur == null) return;
      Object.keys(pair).forEach((k) => { if (pair[k] === orig) delete pair[k]; });
      pair[cur] = orig; cur = null; paint();
    }));
    const paint = () => {
      lefts.forEach((el, i) => { el.tone = pair[i] != null ? i : null; el.style.outline = cur === i ? '3px solid' : 'none'; el.repaint(); });
      rights.forEach((el, j) => { const owner = Object.keys(pair).find((k) => pair[k] === right[j]); el.tone = owner != null ? Number(owner) : null; el.repaint(); });
    };
    const col = (kids, label) => h('div', {style: {flex: '1 1 240px', minWidth: 0}}, [AP2.tint(h('div', {text: label, style: {fontSize: '11px', fontWeight: S.fw.bold, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px'}}), 'text3'),
      h('div', {style: {display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}, kids)]);
    return {el: h('div', {}, [AP2.tint(h('div', {text: 'Links antippen, dann rechts das passende Gegenstück.', style: {fontSize: S.f.xs, marginBottom: S.sp[2]}}), 'text3'),
      h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[4]}}, [col(lefts, 'Begriff'), col(rights, 'Gegenstück')])]),
    submit: () => {
      locked = true;
      let ok = true;
      lefts.forEach((el, i) => { el.tone = null; el.good = pair[i] === i; el.bad = !el.good; if (!el.good) ok = false; el.style.outline = 'none'; el.repaint(); });
      rights.forEach((el) => { el.tone = null; el.repaint(); });
      done(ok, ok ? '' : rich(q.o.map((p) => '**' + p[0] + '** → ' + p[1]).join('  ·  ')));
    }};
  };

  // ---------- Spielrunde ----------
  const play = (b, mode) => {
    AP2.theme.setTone(b);
    const list = data[b];
    const station = list.find((st) => st.id === mode);
    let qs;
    let label;
    let lives = Infinity;
    if (station) { qs = shuffle(station.qs.map((q) => ({q, st: station}))); label = nameOf(station); } else if (mode === 'boss') {
      qs = shuffle([].concat(...list.map((st) => st.qs.filter((q) => (q.lv || 2) >= 2).map((q) => ({q, st}))))).slice(0, 30); label = 'Endboss'; lives = 3;
    } else { qs = shuffle([].concat(...list.map((st) => st.qs.map((q) => ({q, st}))))); label = 'Marathon'; }
    const key = b + '/' + mode;
    const ref = (it) => [list.indexOf(it.st), it.st.qs.indexOf(it.q)];
    const st = {i: 0, right: 0, combo: 0, best: 0, xp: 0, wrong: []};
    let resumed = false;
    const saved = runs()[key];
    if (saved && Array.isArray(saved.order)) {
      const back = saved.order.map(([si, qi]) => (list[si] && list[si].qs[qi] ? {q: list[si].qs[qi], st: list[si]} : null));
      if (back.length && back.every(Boolean) && saved.i > 0 && saved.i < back.length) {
        qs = back;
        Object.assign(st, {i: saved.i, right: saved.right, combo: saved.combo, best: saved.best, xp: saved.xp,
          wrong: (saved.wrong || []).map(([si, qi]) => (list[si] && list[si].qs[qi] ? {q: list[si].qs[qi], sol: null} : null)).filter(Boolean)});
        if (saved.lives != null) lives = saved.lives;
        resumed = true;
      }
    }
    const total = qs.length;
    const persist = () => saveRun(key, {order: qs.map(ref), i: st.i, right: st.right, combo: st.combo, best: st.best, xp: st.xp,
      lives: lives === Infinity ? null : lives, wrong: st.wrong.map((w) => ref({q: w.q, st: qs.find((x) => x.q === w.q).st}))});
    const root = h('div');
    const head = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3], alignItems: 'center', marginBottom: S.sp[3]}});
    const barWrap = h('div', {style: {marginBottom: S.sp[5]}});
    const stage = h('div');
    root.appendChild(head); root.appendChild(barWrap); root.appendChild(stage);
    let handler = null;
    const keyFn = (ev) => {
      if (!root.isConnected) { document.removeEventListener('keydown', keyFn); return; }
      if (handler) handler(ev);
    };
    document.addEventListener('keydown', keyFn);
    const hud = () => {
      AP2.dispose(head); AP2.dispose(barWrap);
      head.appendChild(AP2.btn({text: 'Karte', icon: AP2.icon('map', 16), small: true, kind: 'ghost', fn: () => AP2.router.go('quest/' + b)}));
      if (st.i > 0 && st.i < total) head.appendChild(AP2.btn({text: 'Neu beginnen', icon: AP2.icon('repeat', 14), small: true, kind: 'ghost', fn: () => { saveRun(key, null); AP2.state.set('route', AP2.state.get('route')); }}));
      head.appendChild(AP2.tint(h('div', {text: label, style: {fontWeight: S.fw.bold, fontSize: S.f.lg, flex: '1 1 200px'}}), 'text'));
      const flame = h('span', {style: {display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: S.fw.bold}}, [AP2.icon('flame', 18), 'x' + st.combo]);
      AP2.theme.bind(flame, (n, c) => { n.style.color = st.combo >= 3 ? c.fire : c.text3; n.style.transform = st.combo >= 5 ? 'scale(1.15)' : 'none'; });
      head.appendChild(flame);
      if (lives !== Infinity) head.appendChild(h('span', {style: {display: 'inline-flex', gap: '2px'}}, [0, 1, 2].map((k) => AP2.tint(h('span', {style: {display: 'flex'}}, [AP2.icon('heart', 18)]), k < lives ? 'bad' : 'border'))));
      head.appendChild(AP2.tint(h('span', {text: Math.min(st.i + 1, total) + ' / ' + total, style: {fontWeight: S.fw.semi, fontSize: S.f.sm, fontVariantNumeric: 'tabular-nums'}}), 'text2'));
      head.appendChild(AP2.tint(h('span', {text: st.xp + ' XP', style: {fontWeight: S.fw.bold, fontSize: S.f.sm}}), 'gold'));
      barWrap.appendChild(AP2.gk.bar(total ? st.i / total : 0));
    };
    const finish = () => {
      handler = null;
      saveRun(key, null);
      hud();
      AP2.dispose(stage);
      const done = st.i || 1;
      const pct = total ? st.right / total : 0;
      const stars = starsOf(pct);
      if (station || mode === 'boss') saveProg(key, mode === 'boss' && lives <= 0 ? st.right / total : pct);
      if (stars === 3) { AP2.fx.confetti(); AP2.game.award(AP2.game.XP.perfect); }
      const big = AP2.tint(h('div', {text: Math.round(pct * 100) + ' %', style: {fontSize: '64px', fontWeight: S.fw.bold, lineHeight: '1'}}), stars === 3 ? 'gold' : stars ? 'accent' : 'text2');
      const msg = mode === 'boss' && lives <= 0 ? 'Der Endboss hat gewonnen. Noch einmal!' : stars === 3 ? 'Meisterhaft! Drei Sterne.' : stars === 2 ? 'Stark! Noch ein bisschen bis drei Sterne.' : stars === 1 ? 'Geschafft. Wiederhole die Fehler für mehr Sterne.' : 'Noch nicht bestanden. Lies die Themenseite und versuch es erneut.';
      const idx = list.indexOf(station);
      const next = station && list[idx + 1];
      const box = AP2.gk.panel([h('div', {style: {textAlign: 'center', padding: S.sp[4] + ' 0'}}, [
        h('div', {style: {display: 'flex', justifyContent: 'center', marginBottom: S.sp[3]}}, [starRow(stars, 40)]), big,
        AP2.tint(h('div', {text: st.right + ' von ' + total + ' richtig' + (done < total ? ' (' + done + ' beantwortet)' : '') + '  ·  beste Combo ' + st.best + '  ·  ' + st.xp + ' XP', style: {fontSize: S.f.sm, margin: S.sp[3] + ' 0'}}), 'text2'),
        AP2.tint(h('div', {text: msg, style: {fontSize: S.f.lg, fontWeight: S.fw.semi}}), 'text'),
        h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2], justifyContent: 'center', marginTop: S.sp[5]}}, [
          next ? AP2.btn({text: 'Nächste Station: ' + nameOf(next), icon: AP2.icon('arrow', 16), kind: 'primary', fn: () => AP2.router.go('quest/' + b + '/' + next.id)}) : null,
          AP2.btn({text: 'Nochmal', icon: AP2.icon('repeat', 16), fn: () => AP2.state.set('route', AP2.state.get('route'))}),
          AP2.btn({text: 'Zur Karte', icon: AP2.icon('map', 16), fn: () => AP2.router.go('quest/' + b)}),
          station && AP2.store.get(station.id) ? AP2.btn({text: 'Themenseite lesen', icon: AP2.icon('book', 16), fn: () => AP2.router.go(station.id)}) : null])])]);
      stage.appendChild(box);
      if (st.wrong.length) {
        stage.appendChild(AP2.blocks.h('Deine Fehler zum Nachlesen'));
        st.wrong.forEach(({q, sol}) => stage.appendChild(AP2.gk.panel([AP2.tint(h('div', {style: {fontWeight: S.fw.semi, marginBottom: '4px'}}, rich(q.q)), 'text'),
          sol ? AP2.tint(h('div', {style: {fontSize: S.f.sm, marginBottom: '4px'}}, [sol]), 'ok') : null, q.e ? AP2.tint(h('div', {style: {fontSize: S.f.sm}}, rich(q.e)), 'text2') : null], {marginBottom: S.sp[2]})));
      }
      window.scrollTo(0, 0);
    };
    const ask = () => {
      if (st.i >= total || lives <= 0) return finish();
      hud();
      AP2.dispose(stage);
      const {q, st: from} = qs[st.i];
      const kind = q.k || 'mc';
      const meta = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2], alignItems: 'center', marginBottom: S.sp[3]}}, [pill(KIND[kind] || kind, 'accent'),
        q.lv ? pill(['', 'Leicht', 'Mittel', 'Schwer'][q.lv] || '', q.lv === 3 ? 'fire' : q.lv === 2 ? 'gold' : 'ok') : null,
        station ? null : AP2.tint(h('span', {text: nameOf(from), style: {fontSize: S.f.xs}}), 'text3')]);
      const qText = AP2.tint(h('div', {style: {fontSize: S.f.xl, fontWeight: S.fw.semi, lineHeight: '1.4', marginBottom: S.sp[4]}}, rich(q.q)), 'text');
      const code = q.c ? AP2.theme.bind(h('pre', {text: q.c, style: {fontFamily: S.font.mono, fontSize: S.f.sm, lineHeight: S.lh.code, padding: '12px 14px', borderRadius: S.r.md, overflowX: 'auto', margin: '0 0 ' + S.sp[4], border: '1px solid'}}),
        (n, c) => { n.style.backgroundColor = c.surface2; n.style.borderColor = c.border; n.style.color = c.text; }) : null;
      const fb = h('div');
      const actions = h('div', {style: {display: 'flex', gap: S.sp[2], flexWrap: 'wrap', marginTop: S.sp[3]}});
      let answered = false;
      const goNext = () => { st.i++; ask(); };
      const done = (ok, sol) => {
        if (answered) return;
        answered = true;
        if (ok) { st.right++; st.combo++; st.best = Math.max(st.best, st.combo); } else { st.combo = 0; st.wrong.push({q, sol}); if (lives !== Infinity) lives--; }
        const gained = AP2.game.answer(qid(from.id, q), ok, {combo: st.combo}) || 0;
        st.xp += gained;
        st.i++; if (st.i < total) persist(); else saveRun(key, null); st.i--; // gespeichert wird schon beim Beantworten: Fortsetzen springt zur nächsten Frage
        if (gained && ok) AP2.fx.pop(gained);
        AP2.fx.sound(ok ? 'right' : 'wrong');
        if (ok && [5, 10, 20, 30].includes(st.combo)) AP2.fx.toast('Combo x' + st.combo + '!', 'Du bist on fire.', 'fire', 'flame');
        const head2 = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[2], fontWeight: S.fw.bold, fontSize: S.f.lg, marginBottom: '4px'}}, [AP2.icon(ok ? 'check' : 'close', 20),
          ok ? ['Richtig!', 'Genau!', 'Stark!', 'Perfekt!', 'Sitzt!'][Math.floor(Math.random() * 5)] : 'Leider falsch']);
        const box = h('div', {style: {padding: '14px 18px', borderRadius: S.r.md, borderLeft: '5px solid', marginTop: S.sp[3]}}, [head2,
          sol ? h('div', {style: {fontSize: S.f.md, marginBottom: '4px'}}, [sol]) : null, q.e ? h('div', {style: {fontSize: S.f.sm, lineHeight: S.lh.body}}, rich(q.e)) : null]);
        AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = ok ? c.okSoft : c.badSoft; n.style.borderLeftColor = ok ? c.ok : c.bad; n.style.color = c.text; head2.style.color = ok ? c.ok : c.bad; });
        fb.appendChild(box);
        AP2.dispose(actions);
        const nextBtn = AP2.btn({text: st.i + 1 >= total || lives <= 0 ? 'Ergebnis' : 'Weiter (Enter)', icon: AP2.icon('arrow', 16), kind: 'primary', fn: goNext});
        actions.appendChild(nextBtn);
        hud();
        setTimeout(() => { box.scrollIntoView({block: 'nearest', behavior: 'smooth'}); }, 20);
      };
      const inp = (inputs[kind] || inputs.mc)(q, done);
      if (inp.submit) actions.appendChild(AP2.btn({text: 'Prüfen (Enter)', icon: AP2.icon('check', 16), kind: 'primary', fn: () => inp.submit()}));
      actions.appendChild(AP2.btn({text: 'Weiß ich nicht', kind: 'ghost', small: true, fn: () => { if (inp.submit) inp.submit(); else done(false, rich('Richtig: **' + (kind === 'tf' ? (q.a ? 'Wahr' : 'Falsch') : q.o[q.a]) + '**')); }}));
      handler = (ev) => {
        if (ev.key === 'Enter') { ev.preventDefault(); if (answered) goNext(); else if (inp.submit) inp.submit(); return; }
        if (answered || (inp.field && document.activeElement === inp.field)) return;
        const n = parseInt(ev.key, 10);
        if (n >= 1 && n <= 9 && inp.key) inp.key(n - 1);
      };
      const card = AP2.gk.panel([meta, qText, code, inp.el, fb, actions]);
      stage.appendChild(card);
    };
    if (!total) { stage.appendChild(AP2.blocks.note('Für diese Auswahl gibt es noch keine Fragen.')); return root; }
    if (resumed) AP2.fx.toast('Fortgesetzt', 'Weiter bei Frage ' + (st.i + 1) + ' von ' + total + '.', 'accent', 'play');
    ask();
    return root;
  };

  AP2.views.quest = (arg) => {
    AP2.ctx.id = 'quest';
    const [b, mode] = (arg || '').split('/');
    if (!data[b]) { AP2.ctx.wide = true; return overview(); }
    if (!mode) { AP2.ctx.wide = true; return mapView(b); }
    return play(b, mode);
  };
  AP2.viewTitles.quest = 'Quest';
})();
