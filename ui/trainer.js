// Trainer: täglicher Mix mit verteilter Wiederholung, Blitzrunde, Fehlertraining, Karteikarten und Themen-Training.
(function () {
  const {h, rich} = AP2;
  const S = AP2.S;
  const gk = () => AP2.gk;
  const BLITZ_SEC = 60;
  const shuffle = (list) => {
    const out = list.slice();
    for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
    return out;
  };
  // Vermischen (Interleaving): abwechselnd aus verschiedenen Themen, nicht alle Fragen eines Themas am Stück.
  const interleave = (items) => {
    const groups = new Map();
    shuffle(items).forEach((item) => { if (!groups.has(item.page.id)) groups.set(item.page.id, []); groups.get(item.page.id).push(item); });
    const lists = shuffle([...groups.values()]);
    const out = [];
    for (let i = 0; out.length < items.length; i++) lists.forEach((list) => { if (list[i]) out.push(list[i]); });
    return out;
  };
  const byBox = (items) => items.slice().sort((x, y) => (AP2.game.card(x.id) || [0])[0] - (AP2.game.card(y.id) || [0])[0]);
  // Neue Fragen zuerst aus Themen, die man schon gelesen oder begonnen hat, danach in Lernpfad-Reihenfolge.
  const freshFirst = (items) => {
    const done = AP2.state.get('done');
    const started = new Set(Object.keys(AP2.state.get('srs')).map((id) => id.split(':')[0]));
    const order = new Map(AP2.store.all().map((p, i) => [p.id, i]));
    const rank = (item) => (done[item.page.id] ? 0 : started.has(item.page.id) ? 1 : 2) * 1e4 + order.get(item.page.id);
    return AP2.game.fresh(items).sort((x, y) => rank(x) - rank(y));
  };
  // Höchstens drei neue Fragen je Thema pro Runde, damit der Mix breit bleibt.
  const spread = (list, cap) => {
    const per = new Map();
    return list.filter((item) => { const n = per.get(item.page.id) || 0; per.set(item.page.id, n + 1); return n < cap; });
  };
  const pick = (due, fresh, total, minFresh) => {
    const wide = spread(fresh, 3);
    const a = byBox(due).slice(0, Math.max(0, total - Math.min(minFresh, wide.length)));
    return interleave(a.concat(wide.slice(0, total - a.length)));
  };
  const MODES = {
    mix: {t: 'Täglicher Mix', icon: 'repeat', d: 'Fällige Wiederholungen und neue Fragen, gemischt aus allen Themen.',
      build: () => { const pool = AP2.bank.core(); return pick(AP2.game.due(pool), freshFirst(pool), 25, 6); }},
    blitz: {t: 'Blitz: 60 Sekunden', icon: 'bolt', d: 'So viele Auswahlfragen wie möglich. Kombos geben Extra-XP.', timed: true,
      build: () => shuffle(AP2.bank.core().filter((i) => i.kind === 'mc'))},
    fehler: {t: 'Fehlertraining', icon: 'target', d: 'Nur Fragen, die du schon einmal falsch hattest und noch nicht sicher kannst.',
      build: () => interleave(AP2.game.weak(AP2.bank.core()).slice(0, 25))},
    karten: {t: 'Karteikarten', icon: 'cards', d: 'Offene Prüfungsaufgaben: erst selbst formulieren, dann Musterlösung vergleichen und ehrlich bewerten.',
      build: () => { const pool = AP2.bank.core().filter((i) => i.kind === 'card'); return pick(AP2.game.due(pool), freshFirst(pool), 12, 4); }},
    seite: {t: 'Thema trainieren', icon: 'book', d: '',
      build: (arg) => { const pool = AP2.bank.byPage(arg); const due = AP2.game.due(pool); return shuffle(due).concat(shuffle(pool.filter((i) => !due.includes(i)))).sort((x, y) => (x.kind === 'mc' ? 0 : 1) - (y.kind === 'mc' ? 0 : 1)); }},
    block: {t: 'Block-Training', icon: 'map', d: '',
      build: (arg) => { const pool = AP2.bank.core().filter((i) => i.page.b === arg); return pick(AP2.game.due(pool), freshFirst(pool), 20, 8); }},
  };
  const label = (text, tone) => gk().kicker(text, tone);
  const chip = (text, tone) => {
    const el = h('span', {text, style: {padding: '3px 10px', borderRadius: S.r.pill, fontSize: S.f.xs, fontWeight: S.fw.bold, whiteSpace: 'nowrap'}});
    return AP2.theme.bind(el, (n, c) => { n.style.backgroundColor = c[tone + 'Soft'] || c.surface2; n.style.color = c[tone] || c.text2; });
  };
  // Eine Trainingsrunde: Karten nacheinander, Tastatur 1 bis 6, Enter oder Leertaste für weiter.
  const session = (mode, arg) => {
    const cfg = MODES[mode];
    const root = h('div');
    const items = cfg.build(arg);
    const page = arg ? AP2.store.get(arg) : null;
    const blk = mode === 'block' ? AP2.store.BLOCKS.find((b) => b.id === arg) : null;
    const title = page ? page.t : blk ? blk.t : cfg.t;
    if (!items.length) {
      const msg = mode === 'fehler' ? 'Keine schwachen Fragen. Stark! Neue Fehler landen automatisch hier.'
        : mode === 'mix' || mode === 'karten' ? 'Alles erledigt für heute: keine fälligen Wiederholungen und keine neuen Fragen in deinen Themen.' : 'Zu diesem Thema gibt es noch keine Fragen.';
      root.appendChild(gk().panel([label(cfg.t, 'accent'), AP2.blocks.p(msg), AP2.btn({text: 'Zurück zum Trainer', kind: 'primary', fn: () => AP2.router.go('trainer')})]));
      return root;
    }
    const st = {i: 0, right: 0, wrong: 0, combo: 0, maxCombo: 0, xp: 0, missed: [], requeued: new Set(), left: BLITZ_SEC, timer: null, ended: false, startSolid: 0};
    const queue = cfg.timed ? items : items.slice();
    const pos = AP2.tint(h('span', {style: {fontSize: S.f.sm, fontVariantNumeric: 'tabular-nums'}}), 'text2');
    const comboEl = h('span', {style: {display: 'flex', alignItems: 'center', gap: '4px', fontWeight: S.fw.bold, fontSize: S.f.sm}});
    const xpEl = h('span', {style: {fontWeight: S.fw.bold, fontSize: S.f.sm, fontVariantNumeric: 'tabular-nums'}});
    const clock = h('span', {style: {fontFamily: S.font.mono, fontWeight: S.fw.bold, fontSize: S.f.xl}});
    const progress = gk().bar(0, 'accent', 6);
    AP2.theme.bind(xpEl, (n, c) => { n.style.color = c.gold; });
    const head = h('div', {style: {display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: S.sp[3], flexWrap: 'wrap', marginBottom: S.sp[3]}},
      [h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3]}}, [label(title, 'accent'), pos]), h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[4]}}, [comboEl, xpEl, cfg.timed ? clock : null])]);
    const area = h('div');
    const card = gk().panel([head, progress, h('div', {style: {height: S.sp[4]}}), area], {boxShadow: S.shadow, padding: '22px 22px 18px'});
    root.appendChild(card);
    const paintHead = () => {
      pos.textContent = cfg.timed ? st.right + ' richtig' : 'Frage ' + Math.min(st.i + 1, queue.length) + ' von ' + queue.length;
      AP2.dispose(comboEl);
      if (st.combo >= 2) { comboEl.appendChild(AP2.icon('flame', 16)); comboEl.appendChild(document.createTextNode('Kombo ' + st.combo)); }
      AP2.theme.bind(comboEl, (n, c) => { n.style.color = c.fire; });
      xpEl.textContent = '+' + st.xp + ' XP';
      clock.textContent = '0:' + String(st.left).padStart(2, '0');
      AP2.theme.bind(clock, (n, c) => { n.style.color = st.left <= 10 ? c.bad : c.text; });
      progress.set(cfg.timed ? st.left / BLITZ_SEC : st.i / queue.length);
    };
    let keyFn = null;
    const onKey = (ev) => {
      if (!root.isConnected) { document.removeEventListener('keydown', onKey); return; }
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName) || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      if (keyFn && keyFn(ev)) ev.preventDefault();
    };
    document.addEventListener('keydown', onKey);
    const topicLink = (item) => {
      const el = h('span', {text: 'Thema: ' + item.page.t, style: {fontSize: S.f.xs, fontWeight: S.fw.med, textDecoration: 'underline', textUnderlineOffset: '3px'}});
      return AP2.press(el, {role: 'link', fn: () => AP2.router.go(item.page.id), base: (c) => ({color: c.text3}), hover: (c) => ({color: c.accent})});
    };
    const next = () => { st.i++; if (!cfg.timed && st.i >= queue.length) finish(); else show(); };
    const scored = (item, ok, gained) => {
      st.xp += gained;
      if (ok) { st.right++; st.combo++; st.maxCombo = Math.max(st.maxCombo, st.combo); } else {
        st.wrong++; st.combo = 0;
        if (!st.missed.includes(item)) st.missed.push(item);
        // Falsches kommt am Ende der Runde noch einmal (einmalig): sofortige Wiederholung festigt.
        if (!cfg.timed && !st.requeued.has(item.id)) { st.requeued.add(item.id); queue.push(item); }
      }
      AP2.fx.sound(ok ? 'right' : 'wrong');
      paintHead();
    };
    const showMc = (item) => {
      const order = shuffle(item.o.map((t, i) => i));
      const q = {o: order.map((i) => item.o[i]), a: order.indexOf(item.a), picked: null};
      area.appendChild(AP2.tint(h('div', {style: {fontSize: S.f.lg, fontWeight: S.fw.semi, lineHeight: '1.45', margin: '0 0 ' + S.sp[4]}}, rich(item.q)), 'text'));
      const rows = [];
      const fb = h('div');
      const onPick = (choice) => {
        if (q.picked != null || st.ended) return;
        q.picked = choice;
        const ok = choice === q.a;
        rows.forEach((row) => row.repaint());
        scored(item, ok, AP2.game.answer(item.id, ok, {combo: ok ? st.combo + 1 : 0, blitz: !!cfg.timed}));
        if (cfg.timed) { setTimeout(() => { if (!st.ended && root.isConnected) next(); }, ok ? 280 : 1100); return; }
        const verdict = AP2.tint(h('div', {text: ok ? (st.combo >= 3 ? 'Richtig, Kombo ' + st.combo + '!' : 'Richtig') : 'Nicht ganz', style: {fontWeight: S.fw.bold, marginBottom: S.sp[1]}}), ok ? 'ok' : 'bad');
        const why = AP2.tint(h('div', {style: {fontSize: S.f.sm, lineHeight: S.lh.body}}, rich(item.e || '')), 'text');
        fb.appendChild(AP2.fill(h('div', {style: {padding: '12px 16px', borderRadius: S.r.md, margin: S.sp[2] + ' 0 ' + S.sp[4]}}, [verdict, why, h('div', {style: {marginTop: S.sp[2]}}, [topicLink(item)])]), 'surface2'));
        const go = AP2.btn({text: st.i >= queue.length - 1 ? 'Ergebnis ansehen' : 'Weiter (Enter)', kind: 'primary', fn: next});
        fb.appendChild(go);
        go.focus();
        keyFn = (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { next(); return true; } return false; };
      };
      q.o.forEach((t, i) => { const row = AP2.quizOption(q, i, onPick); rows.push(row); area.appendChild(row); });
      area.appendChild(fb);
      keyFn = (ev) => { const n = Number(ev.key); if (n >= 1 && n <= q.o.length) { onPick(n - 1); return true; } return false; };
    };
    const showCard = (item) => {
      area.appendChild(h('div', {style: {display: 'flex', justifyContent: 'space-between', gap: S.sp[3], marginBottom: S.sp[2]}}, [chip('Karteikarte', 'accent'), item.pts ? chip(item.pts + ' Punkte', 'text2') : null]));
      area.appendChild(AP2.tint(h('div', {style: {fontSize: S.f.lg, fontWeight: S.fw.semi, lineHeight: '1.45', margin: '0 0 ' + S.sp[3]}}, rich(item.q)), 'text'));
      area.appendChild(AP2.tint(h('div', {text: 'Formuliere deine Antwort im Kopf oder auf Papier. Erst dann aufdecken.', style: {fontSize: S.f.sm, marginBottom: S.sp[4]}}), 'text2'));
      const sol = h('div', {style: {display: 'none', padding: '16px 20px 6px', borderRadius: S.r.md, borderLeft: '4px solid', margin: '0 0 ' + S.sp[4]}}, [label('Musterlösung', 'ok')].concat(AP2.answerNodes(item.ans)));
      AP2.theme.bind(sol, (n, c) => { n.style.backgroundColor = c.surface2; n.style.borderLeftColor = c.ok; });
      const rateRow = h('div', {style: {display: 'none', flexWrap: 'wrap', gap: S.sp[2]}});
      const rate = (grade) => {
        if (st.ended || rateRow.dataset.done) return;
        rateRow.dataset.done = '1';
        scored(item, grade === 2, AP2.game.rate(item.id, grade, {combo: grade === 2 ? st.combo + 1 : 0}));
        if (grade === 1) { st.combo = 0; paintHead(); }
        next();
      };
      [['Nicht gewusst (1)', 0], ['Teilweise (2)', 1], ['Gewusst (3)', 2]].forEach(([text, grade]) => rateRow.appendChild(AP2.btn({text, kind: grade === 2 ? 'primary' : 'soft', fn: () => rate(grade)})));
      const reveal = AP2.btn({text: 'Musterlösung aufdecken (Leertaste)', kind: 'primary', fn: () => {
        sol.style.display = 'block'; reveal.style.display = 'none'; rateRow.style.display = 'flex';
        keyFn = (ev) => { const n = Number(ev.key); if (n >= 1 && n <= 3) { rate(n - 1); return true; } return false; };
      }});
      area.appendChild(sol);
      area.appendChild(h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3], alignItems: 'center'}}, [reveal, rateRow, topicLink(item)]));
      keyFn = (ev) => { if (ev.key === ' ' || ev.key === 'Enter') { reveal.click(); return true; } return false; };
      reveal.focus();
    };
    function show() {
      AP2.dispose(area);
      keyFn = null;
      paintHead();
      const item = queue[cfg.timed ? st.i % queue.length : st.i];
      if (item.kind === 'card') showCard(item); else showMc(item);
    }
    function finish() {
      if (st.ended) return;
      st.ended = true;
      keyFn = null;
      if (st.timer) clearInterval(st.timer);
      AP2.dispose(area);
      const total = st.right + st.wrong;
      const pct = total ? st.right / total : 0;
      let record = false;
      if (cfg.timed) record = AP2.game.blitz(st.right);
      else {
        AP2.game.session();
        if (!st.wrong && total >= 5) { st.bonus = AP2.game.perfect('trainer:' + mode + ':' + (arg || '')); st.xp += st.bonus; }
      }
      paintHead();
      progress.set(1);
      const big = AP2.tint(h('div', {text: cfg.timed ? st.right + ' Punkte' : Math.round(pct * 100) + ' %', style: {fontSize: S.f.h1, fontWeight: S.fw.bold, lineHeight: S.lh.tight}}), pct >= 0.7 ? 'ok' : 'accent');
      const ringEl = gk().ring(110, 10, pct >= 0.7 ? 'ok' : 'accent', [big]);
      ringEl.set(pct);
      big.style.fontSize = S.f.xl;
      const lines = [
        cfg.timed ? (record ? 'Neuer Rekord!' : 'Rekord: ' + AP2.game.read().best + ' Punkte') : (st.right + ' von ' + total + ' richtig' + (st.bonus ? ', fehlerfrei: +' + st.bonus + ' XP Bonus' : !st.wrong && total >= 5 ? ', fehlerfrei' : '')),
        '+' + st.xp + ' XP in dieser Runde, beste Kombo: ' + st.maxCombo,
        'Heute: ' + AP2.game.todayXp() + ' von ' + AP2.game.read().goal + ' XP Tagesziel',
      ];
      const facts = h('div', {style: {flex: '1 1 240px'}}, lines.map((txt, i) => AP2.tint(h('div', {text: txt, style: {fontSize: i ? S.f.sm : S.f.lg, fontWeight: i ? S.fw.reg : S.fw.bold, marginBottom: S.sp[1]}}), i ? 'text2' : 'text')));
      area.appendChild(h('div', {style: {display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: S.sp[5], marginBottom: S.sp[5]}}, [ringEl, facts]));
      if (record || (!cfg.timed && !st.wrong && total >= 5)) AP2.fx.confetti();
      if (st.missed.length) {
        area.appendChild(label('Zum Nacharbeiten (' + st.missed.length + ')', 'bad'));
        const list = h('div', {style: {margin: S.sp[2] + ' 0 ' + S.sp[4]}});
        st.missed.slice(0, 12).forEach((item) => {
          const right = item.kind === 'mc' ? AP2.tint(h('div', {style: {fontSize: S.f.sm, marginTop: '2px'}}, rich('Richtig: **' + item.o[item.a] + '**')), 'ok') : null;
          list.appendChild(AP2.fill(h('div', {style: {padding: '10px 14px', borderRadius: S.r.md, marginBottom: S.sp[2]}},
            [AP2.tint(h('div', {style: {fontSize: S.f.sm, fontWeight: S.fw.semi}}, rich(item.q)), 'text'), right, h('div', {style: {marginTop: '4px'}}, [topicLink(item)])]), 'surface2'));
        });
        area.appendChild(list);
      }
      area.appendChild(h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3]}}, [
        AP2.btn({text: 'Noch eine Runde', kind: 'primary', icon: AP2.icon('repeat', 18), fn: () => AP2.state.set('route', AP2.state.get('route'))}),
        AP2.btn({text: 'Trainer-Übersicht', fn: () => AP2.router.go('trainer')}),
        page ? AP2.btn({text: 'Zur Themenseite', fn: () => AP2.router.go(page.id)}) : null,
      ]));
    }
    if (cfg.timed) {
      // Die Uhr läuft ab Rundenstart.
      st.timer = setInterval(() => {
        if (!root.isConnected) { clearInterval(st.timer); return; }
        st.left--;
        paintHead();
        if (st.left <= 0) finish();
      }, 1000);
    }
    show();
    return root;
  };
  // Leitner-Kartei als Grafik: sechs Fächer mit wachsendem Abstand.
  const leitner = () => {
    const boxes = AP2.game.INTERVAL.slice(1).map((d, i) => {
      const el = h('div', {style: {flex: '1 1 90px', padding: '10px 8px', borderRadius: S.r.md, textAlign: 'center', border: '1px solid'}}, [
        h('div', {text: 'Fach ' + (i + 1), style: {fontWeight: S.fw.bold, fontSize: S.f.sm}}), h('div', {text: d === 1 ? 'morgen' : 'nach ' + d + ' Tagen', style: {fontSize: S.f.xs}})]);
      return AP2.theme.bind(el, (n, c) => { n.style.backgroundColor = AP2.gk.mix(c.surface, c.accent, 0.08 + i * 0.12); n.style.borderColor = c.border; n.style.color = i >= 4 ? c.onAccent : c.text; if (i >= 4) n.style.backgroundColor = AP2.gk.mix(c.accent, c.gold, (i - 4) * 0.6); });
    });
    return h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2], margin: S.sp[3] + ' 0'}}, boxes);
  };
  const modeCard = (key, count, note, primary) => {
    const m = MODES[key];
    const ic = h('div', {style: {width: '44px', height: '44px', borderRadius: S.r.md, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}, [AP2.icon(m.icon, 24)]);
    AP2.theme.bind(ic, (n, c) => { n.style.backgroundColor = primary ? c.accent : c.accentSoft; n.style.color = primary ? c.onAccent : c.accent; });
    const t = AP2.tint(h('div', {text: m.t, style: {fontWeight: S.fw.bold, fontSize: S.f.lg}}), 'text');
    const d = AP2.tint(h('div', {text: m.d, style: {fontSize: S.f.sm, lineHeight: '1.5', margin: S.sp[1] + ' 0'}}), 'text2');
    const n = AP2.tint(h('div', {text: note, style: {fontSize: S.f.xs, fontWeight: S.fw.semi}}), primary ? 'accent' : 'text3');
    const el = h('div', {style: {flex: '1 1 280px', padding: '18px 20px', borderRadius: S.r.lg, border: '1px solid', display: 'flex', gap: S.sp[4], alignItems: 'flex-start'}}, [ic, h('div', {}, [t, d, n])]);
    return AP2.press(el, {fn: () => AP2.router.go('trainer/' + key), label: m.t, base: (c) => ({backgroundColor: c.surface, borderColor: primary ? c.accent : c.border, boxShadow: primary ? S.shadow : 'none', opacity: count === 0 ? '0.6' : '1'}),
      hover: (c) => ({borderColor: c.accent, backgroundColor: c.hover})});
  };
  const menu = () => {
    const pool = AP2.bank.core();
    const due = AP2.game.due(pool);
    const weak = AP2.game.weak(pool);
    const cards = pool.filter((i) => i.kind === 'card');
    const root = h('div');
    root.appendChild(AP2.tint(h('h1', {text: 'Trainer', style: {fontSize: S.f.h1, fontWeight: S.fw.bold, letterSpacing: '-0.02em', margin: '0 0 ' + S.sp[2]}}), 'text'));
    root.appendChild(AP2.tint(h('p', {text: 'Aktives Abrufen schlägt Lesen. Jede Antwort landet in deiner Lernkartei: Was du kannst, kommt seltener, was du nicht kannst, kommt bald wieder.', style: {fontSize: S.f.lg, margin: '0 0 ' + S.sp[5], lineHeight: S.lh.body}}), 'text2'));
    const grid = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3], marginBottom: S.sp[6]}}, [
      modeCard('mix', due.length + 1, due.length + ' fällig, dazu neue Fragen. Etwa 10 Minuten.', true),
      modeCard('blitz', 1, 'Rekord: ' + AP2.game.read().best + ' Punkte'),
      modeCard('fehler', weak.length, weak.length + (weak.length === 1 ? ' schwache Frage' : ' schwache Fragen')),
      modeCard('karten', cards.length, AP2.game.due(cards).length + ' fällig von ' + cards.length + ' Karten'),
    ]);
    root.appendChild(grid);
    root.appendChild(AP2.blocks.h('Block gezielt trainieren'));
    const blocks = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3], marginBottom: S.sp[6]}});
    ['ps', 'infra', 'eua', 'wiso'].forEach((id) => {
      const blk = AP2.store.BLOCKS.find((b) => b.id === id);
      const own = pool.filter((i) => i.page.b === id);
      const seen = own.filter((i) => (AP2.game.card(i.id) || [0, 0, 0])[2] > 0).length;
      const solid = own.filter((i) => (AP2.game.card(i.id) || [0])[0] >= AP2.game.SOLID).length;
      const el = gk().panel([AP2.tint(h('div', {text: blk.t, style: {fontWeight: S.fw.bold, marginBottom: S.sp[1]}}), 'text'),
        AP2.tint(h('div', {text: seen + ' von ' + own.length + ' gesehen, ' + solid + ' sicher, ' + AP2.game.due(own).length + ' fällig', style: {fontSize: S.f.xs, marginBottom: S.sp[2]}}), 'text2'),
        gk().bar(own.length ? solid / own.length : 0, 'ok', 5)], {flex: '1 1 220px'});
      blocks.appendChild(AP2.press(el, {fn: () => AP2.router.go('trainer/block/' + id), label: 'Block trainieren: ' + blk.t,
        base: (c) => ({backgroundColor: c.surface, borderColor: c.border}), hover: (c) => ({borderColor: c.accent, backgroundColor: c.hover})}));
    });
    root.appendChild(blocks);
    root.appendChild(AP2.blocks.h('So funktioniert die Lernkartei'));
    root.appendChild(AP2.blocks.p('Jede Frage wandert durch sechs Fächer. **Richtig** schiebt sie ein Fach weiter, der Abstand bis zur nächsten Wiederholung verdoppelt sich. **Falsch** wirft sie zurück in Fach 1 und sie kommt am Ende der Runde noch einmal. Ab **Fach 4** gilt eine Frage als **sicher**. Die Sterne eines Themas zeigen, wie weit seine Fragen gewandert sind.'));
    root.appendChild(leitner());
    root.appendChild(AP2.blocks.list(['**Abrufübung (Testing-Effekt):** Sich aktiv erinnern verankert Wissen stärker als erneutes Lesen.',
      '**Verteiltes Wiederholen (Spacing):** Kurz bevor du etwas vergisst, ist Wiederholen am wirksamsten.',
      '**Vermischen (Interleaving):** Der Mix wechselt die Themen. Das ist anstrengender, trainiert aber genau das, was die Prüfung verlangt: erkennen, welches Wissen gefragt ist.',
      '**Sofortiges Feedback:** Jede Antwort wird erklärt. Fehler sind die wertvollsten Lernmomente.']));
    root.appendChild(AP2.blocks.tip('Tastatur: **1 bis 6** wählt eine Antwort, **Enter** oder **Leertaste** geht weiter. Bei Karteikarten: **Leertaste** deckt auf, **1, 2, 3** bewerten.'));
    return root;
  };
  AP2.views.trainer = (arg) => {
    AP2.ctx.id = 'trainer';
    const parts = (arg || '').split('/');
    const key = parts[0];
    if (!MODES[key]) return menu();
    if ((key === 'seite' || key === 'block') && !parts[1]) return menu();
    return session(key, parts[1]);
  };
  AP2.viewTitles.trainer = 'Trainer';
})();
