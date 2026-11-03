// Lernplan: fragt beim ersten Start die Prüfungstermine ab und verteilt die Themen bis dahin auf die Tage.
// State plan: {dates: {Bereich: 'JJJJ-MM-TT'}, min: Minuten pro Tag, weekend: Wochenende lernen, skipped: true}. Routen: #/planung (Einrichtung), #/plan (Plan).
(function () {
  const {h, on} = AP2;
  const S = AP2.S;
  const AREAS = ['ps', 'infra', 'eua', 'wiso'];
  const gk = () => AP2.gk;
  const plan = () => AP2.state.get('plan') || null;
  const blk = (b) => AP2.store.BLOCKS.find((x) => x.id === b);
  const fmt = (day) => gk().fmtDate(AP2.game.dateOf(day));
  const dayName = (day) => AP2.game.dateOf(day).toLocaleDateString('de-DE', {weekday: 'short', day: '2-digit', month: '2-digit'});
  AP2.planNeeded = () => !plan();

  // Aufwand eines Themas in Minuten: Lesen plus Fragen üben.
  const cost = (p) => Math.round(10 + Math.min(AP2.bank.byPage(p.id).length, 40) * 0.5);
  // Offene Themen eines Bereichs, dringendste zuerst: schwache, dann ungeübte, dann halb sichere.
  const open = (b) => AP2.store.byBlock(b).filter((p) => !p.hidden).map((p) => {
    const m = AP2.game.mastery(p.id);
    const done = !!AP2.state.get('done')[p.id];
    const weak = AP2.game.weak(AP2.bank.byPage(p.id)).length;
    if ((done && m.stars >= 3) || m.stars >= 4) return null;
    if (!m.total && done) return null;
    return {p, min: cost(p), pri: weak * 3 + (m.seen ? 3 - m.stars : 1) + (m.seen ? 0 : 0.5) + (AP2.hotLevel(p.id) === 'top' ? 4 : AP2.hotLevel(p.id) ? 1.5 : 0), b, m, done};
  }).filter(Boolean).sort((x, y) => y.pri - x.pri);

  // Plan berechnen: Tage von heute bis zum letzten Prüfungstag.
  const build = () => {
    const pl = plan();
    if (!pl || !pl.dates) return null;
    const t0 = AP2.game.today();
    const exams = AREAS.filter((b) => pl.dates[b] && AP2.game.dayOf(pl.dates[b]) >= t0).map((b) => ({b, day: AP2.game.dayOf(pl.dates[b])}));
    if (!exams.length) return {exams: [], days: [], over: true};
    const last = Math.max(...exams.map((e) => e.day));
    const iso = (d) => new Date(d * 86400000).toISOString().slice(0, 10);
    const defer = pl.defer || {};
    // Lernzeit je Tag in Minuten: Ausnahme für das Datum, sonst Wochentag (Mo bis So), sonst alter Standardwert.
    const capOf = (d) => {
      if (pl.over && pl.over[iso(d)] != null) return pl.over[iso(d)];
      if (pl.week) return pl.week[(AP2.game.dateOf(d).getDay() + 6) % 7];
      const wd = AP2.game.dateOf(d).getDay();
      return pl.weekend === false && (wd === 0 || wd === 6) ? 0 : (pl.min || 60);
    };
    exams.forEach((e) => {
      const span = e.day - t0;
      e.review = Math.min(Math.max(2, Math.round(span * 0.2)), Math.max(0, span - 1)); // Wiederholungstage direkt vor der Prüfung
      e.cut = e.day - e.review;                                                        // ab hier nur noch wiederholen
      e.queue = open(e.b);
      e.total = AP2.store.byBlock(e.b).length;
    });
    const days = [];
    for (let d = t0; d <= last; d++) {
      const cap = capOf(d);
      const entry = {day: d, tasks: [], used: 0, cap};
      days.push(entry);
      exams.filter((e) => e.day === d).forEach((e) => entry.tasks.push({kind: 'exam', b: e.b, text: 'Prüfung: ' + blk(e.b).t, min: 0}));
      if (cap <= 0) entry.off = true;
      // Lernen: Bereich mit dem größten Rückstand (offene Minuten pro verbleibendem Lerntag bis zum Stichtag) zuerst.
      let guard = 60;
      while (cap > 0 && entry.used < cap && guard--) {
        const live = exams.filter((e) => d < e.cut && e.queue.some((q) => !(defer[q.p.id] > d)));
        if (!live.length) break;
        const need = (e) => e.queue.reduce((a, q) => a + q.min, 0) / Math.max(1, (e.cut - d));
        live.sort((x, y) => need(y) - need(x));
        const e = live[0];
        const qi = e.queue.findIndex((q) => !(defer[q.p.id] > d));
        const q = e.queue[qi];
        if (entry.used && entry.used + q.min > cap + 5) break; // passt nicht mehr in die Tageszeit
        e.queue.splice(qi, 1);
        entry.tasks.push({kind: 'learn', b: e.b, p: q.p, min: q.min, weak: q.m.seen && q.m.stars <= 2});
        entry.used += q.min;
      }
      // Wiederholen: in den letzten Tagen vor einer Prüfung (cut <= d < Prüfungstag).
      exams.filter((e) => d >= e.cut && d < e.day).forEach((e) => {
        const left = e.day - d;
        if (left === 1) entry.tasks.push({kind: 'link', b: e.b, text: 'Spickzettel und Formeln durchgehen: ' + blk(e.b).short, to: 'spick/' + e.b, min: 20});
        else if (left === Math.min(3, e.review + 1) && e.review >= 2) entry.tasks.push({kind: 'link', b: e.b, text: 'Probeprüfung unter Zeitdruck: ' + blk(e.b).short, to: 'exam-info', min: 60});
        else entry.tasks.push({kind: 'review', b: e.b, text: 'Wiederholen: Fehlertraining und fällige Fragen (' + blk(e.b).short + ')', to: 'trainer/fehler', min: 25});
      });
    }
    // Was nicht mehr in die Lernzeit passt, bleibt übrig (zu knapp).
    const rest = exams.map((e) => ({b: e.b, min: e.queue.reduce((a, q) => a + q.min, 0), n: e.queue.length})).filter((r) => r.n);
    return {exams, days, rest, t0};
  };
  AP2.studyPlan = build;

  const iso = (d) => new Date(d * 86400000).toISOString().slice(0, 10);
  // Stunden als Dezimalzahl ("1,5", "0.25", "10") in Minuten; leer oder ungültig ergibt null.
  const parseH = (txt) => { const v = parseFloat(String(txt).trim().replace(',', '.')); return isNaN(v) || v < 0 ? null : Math.round(v * 60); };
  const fmtH = (min) => String(Math.round((min / 60) * 100) / 100).replace('.', ',');
  const setPlan = (patch) => { AP2.state.set('plan', Object.assign({}, plan(), patch)); const y = window.scrollY; AP2.state.set('route', AP2.state.get('route')); window.scrollTo(0, y); };
  const hourBox = (value, label) => AP2.field(h('input', {attrs: {type: 'text', inputmode: 'decimal', 'aria-label': label, placeholder: 'Std.'}, style: {width: '76px', textAlign: 'right'}}));
  // Lernzeit eines einzelnen Tages anpassen (Ausnahme vom Wochentag-Standard).
  const dayEditor = (d) => {
    const inp = hourBox(fmtH(d.cap), 'Lernzeit am ' + fmt(d.day) + ' in Stunden');
    inp.value = fmtH(d.cap);
    const over = (plan().over || {})[iso(d.day)] != null;
    return h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[2], flexWrap: 'wrap', margin: S.sp[2] + ' 0'}}, [
      AP2.tint(h('span', {text: 'Lernzeit an diesem Tag (Std.):', style: {fontSize: S.f.xs}}), 'text3'), inp,
      AP2.btn({text: 'Setzen', small: true, fn: () => { const m = parseH(inp.value); if (m == null) return; setPlan({over: Object.assign({}, plan().over, {[iso(d.day)]: m})}); }}),
      over ? AP2.btn({text: 'Standard', small: true, kind: 'ghost', fn: () => { const o = Object.assign({}, plan().over); delete o[iso(d.day)]; setPlan({over: o}); }}) : null]);
  };
  const taskRow = (t) => {
    const label = t.kind === 'learn' ? (t.weak ? 'Wiederholen' : 'Lernen') : t.kind === 'exam' ? 'Prüfung' : t.kind === 'review' ? 'Üben' : 'Plan';
    const text = t.kind === 'learn' ? t.p.t : t.text;
    const el = h('div', {style: {display: 'flex', gap: S.sp[2], alignItems: 'center', padding: '8px 12px', borderRadius: S.r.md, border: '1px solid'}}, [
      AP2.tint(h('span', {text: label, style: {fontSize: '10.5px', fontWeight: S.fw.bold, textTransform: 'uppercase', letterSpacing: '0.06em', width: '72px', flexShrink: 0}}), t.weak || t.kind === 'exam' ? 'bad' : 'accent'),
      h('div', {style: {minWidth: 0, flex: '1 1 0'}}, [AP2.tint(h('div', {text, style: {fontSize: S.f.sm, fontWeight: S.fw.semi}}), 'text'),
        AP2.tint(h('div', {text: blk(t.b).short + (t.min ? '  ·  ca. ' + t.min + ' Min' : ''), style: {fontSize: S.f.xs}}), 'text3')])]);
    const go = t.kind === 'learn' ? t.p.id : t.to;
    if (!go) return AP2.theme.bind(el, (n, c) => { n.style.borderColor = c.border; n.style.backgroundColor = c.surface; });
    return AP2.press(el, {fn: () => AP2.router.go(go), label: text, base: (c) => ({backgroundColor: c.surface, borderColor: c.border}), hover: (c) => ({borderColor: c.accent})});
  };

  // Prüfungsschwerpunkte, die noch nicht sicher sitzen.
  AP2.planHot = (root) => {
    const list = Object.keys(AP2.hot).filter((id) => AP2.hot[id][0] === 'top' && AP2.store.get(id)).map((id) => ({p: AP2.store.get(id), m: AP2.game.mastery(id)}))
      .filter((x) => x.m.stars < 4).sort((a, b) => a.m.stars - b.m.stars);
    if (!list.length) return;
    root.appendChild(AP2.planUi.heading('Prüfungsschwerpunkte (' + list.length + ')', 'Diese Themen kamen in den alten Prüfungen und Simulationen am häufigsten dran und sitzen noch nicht sicher.'));
    list.slice(0, 12).forEach((x) => root.appendChild(AP2.planUi.card(x.p, [AP2.hotText(x.p.id)], true, x.m)));
  };
  AP2.views.plan = () => {
    AP2.ctx.id = 'plan';
    const title = (t) => AP2.tint(h('h1', {text: t, style: {fontSize: S.f.h1, fontWeight: S.fw.bold, letterSpacing: '-0.02em', margin: '0 0 ' + S.sp[2]}}), 'text');
    const root = h('div', {}, [gk().kicker('Mein Plan', 'accent'), title('Dein Lernplan')]);
    const pl = build();
    if (!pl || !pl.exams.length) {
      root.appendChild(AP2.blocks.note(pl ? 'Alle eingetragenen Prüfungstermine liegen in der Vergangenheit. Trage neue Termine ein, dann berechne ich den Plan neu.' : 'Du hast noch keine Prüfungstermine eingetragen. Mit den Terminen verteile ich die Themen auf die Tage bis zur Prüfung.'));
      root.appendChild(AP2.btn({text: 'Prüfungstermine eintragen', icon: AP2.icon('clock', 16), kind: 'primary', fn: () => AP2.router.go('planung')}));
      AP2.planWeak(root);
      return root;
    }
    root.appendChild(AP2.tint(h('p', {text: 'Berechnet aus deinen Prüfungsterminen, deinem Wissensstand und deiner Lernzeit pro Tag. Erledigte und sichere Themen fallen automatisch weg, der Plan passt sich jeden Tag an.', style: {fontSize: S.f.md, margin: '0 0 ' + S.sp[4]}}), 'text2'));
    // Prüfungen mit Fortschritt
    const cards = h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))', gap: S.sp[3], marginBottom: S.sp[4]}});
    pl.exams.sort((x, y) => x.day - y.day).forEach((e) => {
      const openN = open(e.b).length;
      const frac = e.total ? 1 - openN / e.total : 0;
      cards.appendChild(gk().panel([AP2.tint(h('div', {text: blk(e.b).short, style: {fontWeight: S.fw.bold, fontSize: S.f.md}}), 'text'),
        AP2.tint(h('div', {text: fmt(e.day) + '  ·  noch ' + (e.day - pl.t0) + (e.day - pl.t0 === 1 ? ' Tag' : ' Tage'), style: {fontSize: S.f.sm, margin: '2px 0 ' + S.sp[2]}}), 'text2'),
        gk().bar(frac), AP2.tint(h('div', {text: openN + ' von ' + e.total + ' Themen offen', style: {fontSize: S.f.xs, marginTop: '4px'}}), 'text3')], {padding: '12px 14px', marginBottom: 0}));
    });
    root.appendChild(cards);
    if (pl.rest.length) {
      const need = pl.rest.reduce((a, r) => a + r.min, 0);
      root.appendChild(AP2.blocks.note('**Achtung:** Der Plan ist zu knapp: **' + pl.rest.reduce((a, r) => a + r.n, 0) + ' Themen** (' + Math.round(need / 60) + ' Std.) passen nicht mehr in die Lernzeit. Erhöhe die Zeit pro Tag, lerne am Wochenende oder konzentriere dich auf die markierten schwachen Themen.'));
    }
    const today = pl.days[0];
    root.appendChild(AP2.planUi.heading('Heute' + (today.tasks.length ? '  ·  ca. ' + today.tasks.reduce((a, t) => a + t.min, 0) + ' Min' : ''), fmt(today.day)));
    const list = (d) => h('div', {style: {display: 'flex', flexDirection: 'column', gap: S.sp[2]}}, d.tasks.map((t) => (t.kind === 'learn'
      ? h('div', {style: {display: 'flex', gap: S.sp[2], alignItems: 'center'}}, [h('div', {style: {flex: '1 1 0', minWidth: 0}}, [taskRow(t)]),
        AP2.btn({text: 'Später', icon: AP2.icon('arrow', 14), small: true, kind: 'ghost', fn: () => setPlan({defer: Object.assign({}, plan().defer, {[t.p.id]: d.day + 1})})})])
      : taskRow(t))));
    root.appendChild(dayEditor(today));
    if (today.tasks.length) root.appendChild(list(today));
    else root.appendChild(AP2.blocks.note(today.off ? 'Heute ist lernfrei. Wenn du magst, wiederhole im Trainer oder stelle oben eine Lernzeit ein.' : 'Heute steht nichts an. Wiederhole im Trainer, was fällig ist.'));
    const upcoming = pl.days.slice(1, 15);
    if (upcoming.length) {
      root.appendChild(AP2.planUi.heading('Die nächsten Tage', 'Reihenfolge nach Dringlichkeit; Themen, die du früher schaffst, rücken nach vorn.'));
      upcoming.forEach((d) => {
        const box = h('details', {style: {marginBottom: S.sp[2]}}, [
          h('summary', {style: {cursor: 'pointer', padding: '6px 2px', fontSize: S.f.sm, fontWeight: S.fw.semi}}, [dayName(d.day) + (d.off ? '  ·  frei' : '  ·  ' + d.tasks.length + (d.tasks.length === 1 ? ' Aufgabe' : ' Aufgaben') + (d.used ? ', ca. ' + d.used + ' Min' : ''))])]);
        box.appendChild(dayEditor(d));
        if (d.tasks.length) box.appendChild(list(d));
        root.appendChild(AP2.theme.bind(box, (n, c) => { n.style.color = c.text; }));
      });
    }
    root.appendChild(h('div', {style: {display: 'flex', gap: S.sp[2], flexWrap: 'wrap', marginTop: S.sp[4]}}, [
      AP2.btn({text: 'Termine und Lernzeit ändern', icon: AP2.icon('clock', 16), small: true, fn: () => AP2.router.go('planung')}),
      AP2.btn({text: 'Fehler trainieren', icon: AP2.icon('target', 16), small: true, fn: () => AP2.router.go('trainer/fehler')})]));
    AP2.planHot(root);
    AP2.planWeak(root);
    return root;
  };
  AP2.viewTitles.plan = 'Mein Plan';

  // Kurzfassung für die Startseite: heutige Aufgaben.
  AP2.planSummary = () => {
    const pl = build();
    if (!pl || !pl.exams.length) return null;
    const t = pl.days[0].tasks.slice(0, 4);
    const box = h('div', {style: {display: 'flex', flexDirection: 'column', gap: S.sp[2]}}, t.map(taskRow));
    box.appendChild(h('div', {}, [AP2.btn({text: 'Ganzen Plan ansehen', icon: AP2.icon('target', 16), small: true, kind: 'ghost', fn: () => AP2.router.go('plan')})]));
    return box;
  };

  // ---------- Einrichtung ----------
  AP2.views.planung = () => {
    AP2.ctx.id = 'planung';
    const cur = plan() || {};
    const def = AP2.game.read().exam;
    const inputs = {};
    const mk = (b) => {
      const inp = AP2.field(h('input', {attrs: {type: 'date', 'aria-label': 'Prüfungstermin ' + blk(b).short}, style: {width: '170px'}}));
      inp.value = (cur.dates || {})[b] || def;
      inputs[b] = inp;
      return h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], flexWrap: 'wrap', padding: '6px 0'}}, [
        h('div', {style: {flex: '1 1 220px'}}, [AP2.tint(h('div', {text: blk(b).t, style: {fontWeight: S.fw.semi}}), 'text'), AP2.tint(h('div', {text: blk(b).s, style: {fontSize: S.f.xs}}), 'text3')]), inp]);
    };
    // Lernzeit je Wochentag in Stunden, beliebige Werte (z. B. 0, 0,5, 2,75, 10).
    const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    const base = cur.week || DAYS.map((_, i) => (cur.weekend === false && i > 4 ? 0 : (cur.min || 60)));
    const wkIn = DAYS.map((d, i) => { const x = hourBox(fmtH(base[i]), 'Lernzeit ' + d + ' in Stunden'); x.value = fmtH(base[i]); return x; });
    const all = hourBox('1', 'Alle Tage in Stunden');
    all.value = '1';
    const weekRow = h('div', {style: {display: 'flex', gap: S.sp[2], flexWrap: 'wrap'}}, DAYS.map((d, i) => h('label', {style: {display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start'}},
      [AP2.tint(h('span', {text: d, style: {fontSize: S.f.xs, fontWeight: S.fw.semi}}), 'text2'), wkIn[i]])));
    const hoursBox = h('div', {}, [AP2.tint(h('div', {text: 'Lernzeit pro Wochentag in Stunden (0 = frei, Dezimal erlaubt, z. B. 1,5)', style: {fontSize: S.f.sm, fontWeight: S.fw.semi, marginBottom: S.sp[2]}}), 'text'), weekRow,
      h('div', {style: {display: 'flex', gap: S.sp[2], alignItems: 'center', marginTop: S.sp[2], flexWrap: 'wrap'}}, [AP2.tint(h('span', {text: 'Alle Tage gleich:', style: {fontSize: S.f.xs}}), 'text3'), all,
        AP2.btn({text: 'Übernehmen', small: true, fn: () => wkIn.forEach((x) => { x.value = all.value; })}),
        AP2.tint(h('span', {text: 'Einzelne Tage änderst du später direkt im Plan.', style: {fontSize: S.f.xs}}), 'text3')])]);
    const err = AP2.tint(h('div', {style: {fontSize: S.f.sm, minHeight: '20px', marginTop: S.sp[2]}}), 'bad');
    const save = () => {
      const dates = {};
      for (const b of AREAS) {
        const v = inputs[b].value;
        if (!v) continue;
        if (isNaN(AP2.game.dayOf(v))) { err.textContent = 'Bitte ein gültiges Datum eingeben.'; return; }
        dates[b] = v;
      }
      if (!Object.keys(dates).length) { err.textContent = 'Trage mindestens einen Prüfungstermin ein, oder wähle „Später“.'; return; }
      const week = wkIn.map((x) => parseH(x.value));
      if (week.some((m) => m == null)) { err.textContent = 'Lernzeit bitte als Zahl in Stunden angeben (z. B. 1,5).'; return; }
      if (!week.some((m) => m > 0)) { err.textContent = 'Mindestens ein Tag braucht Lernzeit.'; return; }
      AP2.state.set('plan', {dates, week, over: cur.over || {}, defer: cur.defer || {}});
      const first = Math.min(...Object.values(dates).map((v) => AP2.game.dayOf(v)));
      AP2.game.set('exam', new Date(first * 86400000).toISOString().slice(0, 10)); // Countdown auf den nächsten Termin
      AP2.router.go('plan');
    };
    const root = h('div', {}, [gk().kicker(plan() && plan().dates ? 'Lernplan ändern' : 'Willkommen', 'accent'),
      AP2.tint(h('h1', {text: 'Wann sind deine Prüfungen?', style: {fontSize: S.f.h1, fontWeight: S.fw.bold, letterSpacing: '-0.02em', margin: '0 0 ' + S.sp[2]}}), 'text'),
      AP2.tint(h('p', {text: 'Mit den Terminen erstelle ich einen Lernplan: welche Themen du an welchem Tag lernst, zuerst die schwachen, am Ende Wiederholung und Probeprüfung. Alles bleibt auf diesem Gerät.', style: {fontSize: S.f.md, margin: '0 0 ' + S.sp[4]}}), 'text2')]);
    root.appendChild(gk().panel([].concat(AREAS.map(mk), [
      h('div', {style: {borderTop: '1px solid', marginTop: S.sp[3], paddingTop: S.sp[3], display: 'flex', flexDirection: 'column', gap: S.sp[3]}}, [
        hoursBox,]),
      err,
      h('div', {style: {display: 'flex', gap: S.sp[2], flexWrap: 'wrap', marginTop: S.sp[3]}}, [
        AP2.btn({text: 'Plan erstellen', icon: AP2.icon('check', 16), kind: 'primary', fn: save}),
        AP2.btn({text: plan() && plan().dates ? 'Abbrechen' : 'Später', kind: 'ghost', fn: () => { if (!plan()) AP2.state.set('plan', {skipped: true}); AP2.router.go(plan() && plan().dates ? 'plan' : 'home'); }})])])));
    return root;
  };
  AP2.viewTitles.planung = 'Prüfungstermine';
})();
