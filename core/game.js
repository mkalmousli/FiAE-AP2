// Spielmechanik: Erfahrungspunkte (XP), Stufen, Lernserie, Tagesziel, Abzeichen und verteilte Wiederholung (Leitner-System).
(function () {
  const DAY = 86400000;
  // Abstand in Tagen je Fach: falsche Karten kommen sofort wieder, sichere erst nach einem Monat.
  const INTERVAL = [0, 1, 2, 4, 8, 16, 32];
  const TOP = INTERVAL.length - 1;
  const SOLID = 4;
  const STREAK_MIN = 20;
  const GOAL_BONUS = 50;
  const XP = {right: 10, wrong: 2, comboStep: 2, comboMax: 10, due: 5, card: 8, partial: 4, page: 25, perfect: 30, examPoint: 2, repeat: 2};
  const TITLES = [[1, 'Azubi im ersten Lehrjahr'], [3, 'Praktikant der Logik'], [5, 'Junior-Entwickler'], [8, 'Code-Handwerker'],
    [11, 'Datenbank-Dompteur'], [14, 'Netzwerk-Navigator'], [17, 'Senior-Entwickler'], [20, 'Software-Architekt'], [25, 'IHK-Bezwinger'], [30, 'Legende der AP2']];
  const DEFAULTS = {xp: 0, days: {}, goal: 100, sound: false, exam: '2026-11-11', best: 0, n: {}, done: {}, exams: {}};
  const subs = {};
  const on = (type, fn) => { (subs[type] = subs[type] || []).push(fn); };
  const emit = (type, data) => (subs[type] || []).forEach((fn) => fn(data));
  // Tageszähler in Ortszeit (Tage seit 1970), damit die Serie um Mitternacht wechselt.
  const today = () => { const now = new Date(); return Math.floor((now.getTime() - now.getTimezoneOffset() * 60000) / DAY); };
  const dateOf = (day) => { const u = new Date(day * DAY); return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate()); };
  const dayOf = (iso) => { const p = String(iso).split('-').map(Number); return p.length === 3 ? Math.floor(Date.UTC(p[0], p[1] - 1, p[2]) / DAY) : NaN; };
  const read = () => {
    const g = Object.assign({}, DEFAULTS, AP2.state.get('game'));
    ['days', 'n', 'done', 'exams'].forEach((key) => { g[key] = Object.assign({}, g[key]); });
    return g;
  };
  const save = (g) => AP2.state.set('game', g);
  const need = (lv) => 50 * lv * (lv - 1);
  const titleOf = (lv) => TITLES.filter((t) => lv >= t[0]).pop()[1];
  const level = (xp) => {
    let lv = 1;
    while (xp >= need(lv + 1)) lv++;
    const from = need(lv);
    const to = need(lv + 1);
    return {lv, xp, from, to, pct: (xp - from) / (to - from), title: titleOf(lv)};
  };
  const streakOf = (g) => {
    const d0 = today();
    const hit = (d) => (g.days[d] || 0) >= STREAK_MIN;
    let d = hit(d0) ? d0 : d0 - 1;
    let n = 0;
    while (hit(d)) { n++; d--; }
    return {n, today: hit(d0)};
  };
  // Leitner-Karte: [Fach, fällig am Tag, gesehen, falsch, zuletzt geübt am Tag].
  const card = (id) => AP2.state.get('srs')[id];
  const isDue = (id) => { const c = card(id); return !!c && c[2] > 0 && c[1] <= today(); };
  const review = (id, grade) => {
    const srs = Object.assign({}, AP2.state.get('srs'));
    const old = srs[id] || [0, 0, 0, 0];
    const d = today();
    let box = old[0];
    if (grade === 2) box = old[2] ? Math.min(TOP, box + 1) : 2;
    else if (grade === 1) box = Math.max(1, Math.min(box, 2));
    else box = 1;
    srs[id] = [box, grade === 0 ? d : d + INTERVAL[box], old[2] + 1, old[3] + (grade === 0 ? 1 : 0), d];
    AP2.state.set('srs', srs);
  };
  const award = (amount) => {
    if (!(amount > 0)) return 0;
    const g = read();
    const d = today();
    const lvBefore = level(g.xp).lv;
    const goalBefore = (g.days[d] || 0) >= g.goal;
    g.xp += amount;
    g.days[d] = (g.days[d] || 0) + amount;
    let bonus = 0;
    if (!goalBefore && g.days[d] >= g.goal) {
      bonus = GOAL_BONUS;
      g.xp += bonus;
      g.days[d] += bonus;
      g.n.goals = (g.n.goals || 0) + 1;
    }
    const hour = new Date().getHours();
    if (hour >= 23 || hour < 4) g.n.night = 1;
    if (hour >= 4 && hour < 7) g.n.early = 1;
    g.n.streak = Math.max(g.n.streak || 0, streakOf(g).n);
    save(g);
    emit('xp', {amount});
    if (bonus) emit('goal', {bonus});
    const lv = level(g.xp);
    if (lv.lv > lvBefore) emit('level', lv);
    checkBadges();
    return amount + bonus;
  };
  const bump = (key, val) => {
    const g = read();
    g.n[key] = val === undefined ? (g.n[key] || 0) + 1 : Math.max(g.n[key] || 0, val);
    save(g);
  };
  // Auswahlfrage beantwortet: Kartei aktualisieren, XP mit Kombo-Bonus und Bonus für fällige Wiederholungen.
  // Schon heute geübt und nicht fällig: nur wenig XP, damit Wiederholen derselben Frage keine Punkte erschleicht.
  const repeat = (id) => { const c = card(id); return !!c && c[4] === today() && c[1] > today(); };
  const answer = (id, ok, opt) => {
    const o = opt || {};
    const due = isDue(id);
    if (repeat(id) || (o.blitz && !ok)) {
      review(id, ok ? 2 : 0);
      bump(ok ? 'right' : 'wrong');
      if (o.combo) bump('combo', o.combo);
      return award(ok ? XP.repeat : 0);
    }
    review(id, ok ? 2 : 0);
    bump(ok ? 'right' : 'wrong');
    if (o.combo) bump('combo', o.combo);
    const extra = ok ? Math.min(XP.comboMax, Math.max(0, (o.combo || 1) - 1) * XP.comboStep) + (due ? XP.due : 0) : 0;
    return award(ok ? XP.right + extra : XP.wrong);
  };
  // Karteikarte selbst bewertet: 0 nicht gewusst, 1 teilweise, 2 gewusst.
  const rate = (id, grade, opt) => {
    const due = isDue(id);
    const again = repeat(id);
    review(id, grade);
    bump('cards');
    if (opt && opt.combo) bump('combo', opt.combo);
    if (grade === 2) bump('right'); else if (grade === 0) bump('wrong');
    if (again) return award(grade === 2 ? XP.repeat : 0);
    return award(grade === 2 ? XP.card + (due ? XP.due : 0) : grade === 1 ? XP.partial : XP.wrong);
  };
  const pageDone = (id) => {
    const g = read();
    if (g.done[id]) return 0;
    g.done[id] = 1;
    save(g);
    return award(XP.page);
  };
  // Fehlerfrei-Bonus höchstens einmal pro Tag und Quiz bzw. Trainingsart.
  const perfect = (key) => {
    const g = read();
    const d = today();
    const seen = Object.assign({}, g.perfectOn);
    if (seen[key] === d) return 0;
    seen[key] = d;
    g.perfectOn = seen;
    g.n.perfect = (g.n.perfect || 0) + 1;
    save(g);
    return award(XP.perfect);
  };
  const session = () => bump('sessions');
  const blitz = (score) => {
    const g = read();
    const record = score > (g.best || 0);
    if (record) { g.best = score; save(g); }
    bump('blitzRuns');
    checkBadges();
    return record;
  };
  // Selbst vergebene Punkte einer Probeprüfung: XP nur für neu erreichte Punkte.
  const examPoints = (examId, key, pts) => {
    const g = read();
    const rec = Object.assign({}, g.exams[examId]);
    const old = rec[key] || 0;
    rec[key] = Math.max(old, pts || 0);
    g.exams[examId] = rec;
    save(g);
    return award((rec[key] - old) * XP.examPoint);
  };
  const set = (key, val) => { const g = read(); g[key] = val; save(g); };
  // Beherrschung einer Seite: mittleres Leitner-Fach ihrer Fragen (ungesehen zählt als 0).
  const mastery = (pageId) => {
    const items = AP2.bank.byPage(pageId);
    const srs = AP2.state.get('srs');
    let sum = 0;
    let seen = 0;
    let solid = 0;
    items.forEach((item) => {
      const c = srs[item.id];
      if (!c || !c[2]) return;
      seen++;
      sum += c[0];
      if (c[0] >= SOLID) solid++;
    });
    const pct = items.length ? sum / (items.length * TOP) : 0;
    const stars = pct >= 0.9 ? 5 : pct >= 0.7 ? 4 : pct >= 0.5 ? 3 : pct >= 0.3 ? 2 : seen ? 1 : 0;
    return {stars, pct, seen, solid, total: items.length};
  };
  const due = (items) => {
    const srs = AP2.state.get('srs');
    const d = today();
    return items.filter((item) => { const c = srs[item.id]; return c && c[2] > 0 && c[1] <= d; });
  };
  const weak = (items) => {
    const srs = AP2.state.get('srs');
    return items.filter((item) => { const c = srs[item.id]; return c && c[3] > 0 && c[0] <= 2; });
  };
  const fresh = (items) => {
    const srs = AP2.state.get('srs');
    return items.filter((item) => !(srs[item.id] && srs[item.id][2]));
  };
  const daysLeft = () => dayOf(read().exam) - today();

  // Abzeichen: Stufe bronze, silber oder gold bestimmt die Farbe.
  const B = (id, t, d, icon, tier, test) => ({id, t, d, icon, tier, test});
  const blockDone = (c, blk) => { const list = AP2.store.byBlock(blk); return list.length > 0 && list.every((p) => c.done[p.id]); };
  const BADGES = [
    B('start', 'Erster Schritt', 'Die erste Frage richtig beantwortet.', 'star', 'bronze', (c) => c.n.right >= 1),
    B('r100', 'Hundert richtig', '100 richtige Antworten.', 'target', 'bronze', (c) => c.n.right >= 100),
    B('r500', 'Wissenssammler', '500 richtige Antworten.', 'target', 'silver', (c) => c.n.right >= 500),
    B('r1000', 'Wissensmaschine', '1.000 richtige Antworten.', 'target', 'gold', (c) => c.n.right >= 1000),
    B('r2500', 'Prüfungsmonster', '2.500 richtige Antworten.', 'trophy', 'gold', (c) => c.n.right >= 2500),
    B('p1', 'Fehlerfrei', 'Eine Runde ohne einen einzigen Fehler.', 'check', 'bronze', (c) => c.n.perfect >= 1),
    B('p10', 'Perfektionist', '10 fehlerfreie Runden.', 'check', 'silver', (c) => c.n.perfect >= 10),
    B('p30', 'Präzisionsarbeit', '30 fehlerfreie Runden.', 'check', 'gold', (c) => c.n.perfect >= 30),
    B('c10', 'Im Flow', '10 richtige Antworten am Stück.', 'bolt', 'bronze', (c) => c.n.combo >= 10),
    B('c25', 'Unaufhaltsam', '25 richtige Antworten am Stück.', 'bolt', 'silver', (c) => c.n.combo >= 25),
    B('c50', 'Kein Halten mehr', '50 richtige Antworten am Stück.', 'bolt', 'gold', (c) => c.n.combo >= 50),
    B('s3', 'Dranbleiben', '3 Tage Lernserie.', 'flame', 'bronze', (c) => c.n.streak >= 3),
    B('s7', 'Eine Woche', '7 Tage Lernserie.', 'flame', 'silver', (c) => c.n.streak >= 7),
    B('s14', 'Zwei Wochen', '14 Tage Lernserie.', 'flame', 'gold', (c) => c.n.streak >= 14),
    B('s21', 'Bis zur Prüfung', '21 Tage Lernserie.', 'flame', 'gold', (c) => c.n.streak >= 21),
    B('g1', 'Ziel erreicht', 'Das Tagesziel zum ersten Mal erreicht.', 'target', 'bronze', (c) => c.n.goals >= 1),
    B('g10', 'Zielstrebig', 'Das Tagesziel an 10 Tagen erreicht.', 'target', 'silver', (c) => c.n.goals >= 10),
    B('l5', 'Stufe 5', 'Stufe 5 erreicht: Junior-Entwickler.', 'trophy', 'bronze', (c) => c.lv >= 5),
    B('l10', 'Stufe 10', 'Stufe 10 erreicht.', 'trophy', 'silver', (c) => c.lv >= 10),
    B('l20', 'Stufe 20', 'Stufe 20 erreicht: Software-Architekt.', 'trophy', 'gold', (c) => c.lv >= 20),
    B('pg10', 'Leseratte', '10 Themenseiten als erledigt markiert.', 'book', 'bronze', (c) => c.doneN >= 10),
    B('pg50', 'Vielleser', '50 Themenseiten erledigt.', 'book', 'silver', (c) => c.doneN >= 50),
    B('pg100', 'Bücherwurm', '100 Themenseiten erledigt.', 'book', 'gold', (c) => c.doneN >= 100),
    B('bps', 'Planer', 'Alle Seiten von "Planen eines Softwareproduktes" erledigt.', 'map', 'gold', (c) => blockDone(c, 'ps')),
    B('binfra', 'Netzwerker', 'Alle Seiten von "Infrastruktur und IT-Sicherheit" erledigt.', 'map', 'gold', (c) => blockDone(c, 'infra')),
    B('beua', 'Algorithmiker', 'Alle Seiten von "Entwicklung und Algorithmen" erledigt.', 'map', 'gold', (c) => blockDone(c, 'eua')),
    B('bwiso', 'Wirtschaftsprofi', 'Alle Seiten von "Wirtschafts- und Sozialkunde" erledigt.', 'map', 'gold', (c) => blockDone(c, 'wiso')),
    B('m1', 'Erster Meister', 'Ein Thema mit 5 Sternen gemeistert.', 'star', 'silver', (c) => c.master() >= 1),
    B('m10', 'Zehnfach-Meister', '10 Themen mit 5 Sternen.', 'star', 'gold', (c) => c.master() >= 10),
    B('m25', 'Großmeister', '25 Themen mit 5 Sternen.', 'star', 'gold', (c) => c.master() >= 25),
    B('b10', 'Blitzstart', 'Im Blitz-Modus 10 Punkte erreicht.', 'clock', 'bronze', (c) => c.best >= 10),
    B('b20', 'Blitzschnell', 'Im Blitz-Modus 20 Punkte erreicht.', 'clock', 'silver', (c) => c.best >= 20),
    B('b30', 'Lichtgeschwindigkeit', 'Im Blitz-Modus 30 Punkte erreicht.', 'clock', 'gold', (c) => c.best >= 30),
    B('k50', 'Karteikasten', '50 Karteikarten selbst bewertet.', 'cards', 'bronze', (c) => c.n.cards >= 50),
    B('k200', 'Kartenprofi', '200 Karteikarten selbst bewertet.', 'cards', 'silver', (c) => c.n.cards >= 200),
    B('w1', 'Wiederholer', 'Einen täglichen Mix abgeschlossen.', 'repeat', 'bronze', (c) => c.n.sessions >= 1),
    B('w10', 'Gewohnheitstier', '10 Trainingsrunden abgeschlossen.', 'repeat', 'silver', (c) => c.n.sessions >= 10),
    B('ex', 'Generalprobe', 'In einer Probeprüfung mindestens 50 Punkte erreicht.', 'trophy', 'silver', (c) => Object.values(c.exams).some((rec) => Object.values(rec).reduce((a, v) => a + v, 0) >= 50)),
    B('night', 'Nachteule', 'Nach 23 Uhr gelernt.', 'moon', 'bronze', (c) => c.n.night),
    B('early', 'Frühaufsteher', 'Vor 7 Uhr morgens gelernt.', 'sun', 'bronze', (c) => c.n.early),
  ];
  const context = () => {
    const g = read();
    let masterN = null;
    return {n: g.n, lv: level(g.xp).lv, best: g.best || 0, exams: g.exams, done: AP2.state.get('done'), doneN: Object.keys(AP2.state.get('done')).length,
      master: () => (masterN === null ? (masterN = AP2.store.all().filter((p) => AP2.bank.CORE.includes(p.b) && mastery(p.id).stars >= 5).length) : masterN)};
  };
  function checkBadges() {
    const have = AP2.state.get('badges');
    const ctx = context();
    const fresh2 = BADGES.filter((b) => !have[b.id] && b.test(ctx));
    if (!fresh2.length) return;
    const next = Object.assign({}, have);
    fresh2.forEach((b) => { next[b.id] = today(); });
    AP2.state.set('badges', next);
    fresh2.forEach((b) => emit('badge', b));
  }
  const reset = () => { AP2.state.set('game', {}); AP2.state.set('srs', {}); AP2.state.set('badges', {}); };
  AP2.state.sub('done', () => checkBadges());
  AP2.game = {
    TOP, SOLID, STREAK_MIN, XP, BADGES, INTERVAL,
    on, today, dateOf, dayOf, daysLeft, read, set, reset,
    level: () => level(read().xp), levelOf: level, streak: () => streakOf(read()),
    todayXp: () => read().days[today()] || 0,
    answer, rate, award, pageDone, perfect, session, blitz, examPoints,
    card, isDue, mastery, due, weak, fresh, checkBadges,
  };
})();
