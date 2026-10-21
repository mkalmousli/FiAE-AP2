// Startseite: Countdown, Stufe, Lernserie, Tagesziel, fällige Wiederholungen, Aktivität, Blöcke und Abzeichen.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const gk = () => AP2.gk;
  const LEARN = ['ps', 'infra', 'eua', 'wiso'];
  const nextPage = () => {
    const done = AP2.state.get('done');
    const list = AP2.store.all().filter((p) => LEARN.includes(p.b));
    return list.find((p) => !done[p.id]) || list[0];
  };
  const greet = () => { const hr = new Date().getHours(); return hr < 5 ? 'Noch wach?' : hr < 11 ? 'Guten Morgen' : hr < 18 ? 'Hallo' : 'Guten Abend'; };
  const row = (kids, gap) => h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: gap || S.sp[3], alignItems: 'stretch'}}, kids);
  const big = (text, tone, size) => AP2.tint(h('div', {text, style: {fontSize: size || S.f.h2, fontWeight: S.fw.bold, lineHeight: S.lh.tight}}), tone || 'text');
  const small = (text, tone) => AP2.tint(h('div', {text, style: {fontSize: S.f.sm, lineHeight: '1.45'}}), tone || 'text2');
  const hero = () => {
    const g = AP2.game.read();
    const left = AP2.game.daysLeft();
    const date = gk().fmtDate(AP2.game.dateOf(AP2.game.dayOf(g.exam)));
    const count = left > 1 ? 'Noch ' + left + ' Tage bis zur AP2' : left === 1 ? 'Morgen ist Prüfung' : left === 0 ? 'Heute ist Prüfungstag. Viel Erfolg!' : 'Prüfung geschafft?';
    const kick = gk().kicker(greet() + '  ·  Prüfung am ' + date, 'accent');
    const title = AP2.tint(h('h1', {text: count, style: {fontSize: S.f.h1, fontWeight: S.fw.bold, lineHeight: S.lh.tight, letterSpacing: '-0.02em', margin: S.sp[2] + ' 0 ' + S.sp[3]}}), 'text');
    const sub = AP2.tint(h('p', {text: 'Lerne jeden Tag ein wenig: Tagesziel erreichen, fällige Wiederholungen abarbeiten, ein neues Thema lesen. So wächst deine Lernserie und mit ihr das sichere Wissen.',
      style: {fontSize: S.f.lg, lineHeight: S.lh.body, margin: '0 0 ' + S.sp[5]}}), 'text2');
    return h('div', {}, [kick, title, sub]);
  };
  const levelPanel = () => {
    const l = AP2.game.level();
    const ring = gk().ring(84, 8, 'gold', [big(String(l.lv), 'gold', S.f.h2), AP2.tint(h('div', {text: 'Stufe', style: {fontSize: '10px', fontWeight: S.fw.bold}}), 'text3')]);
    ring.set(l.pct);
    return gk().panel([h('div', {style: {display: 'flex', gap: S.sp[4], alignItems: 'center'}}, [ring, h('div', {style: {flex: '1 1 0', minWidth: 0}}, [
      gk().kicker('Deine Stufe'), big(l.title, 'text', S.f.xl), small(l.xp + ' XP gesamt  ·  noch ' + (l.to - l.xp) + ' XP bis Stufe ' + (l.lv + 1))])])], {flex: '2 1 300px'});
  };
  const streakPanel = () => {
    const s = AP2.game.streak();
    const ic = h('div', {style: {display: 'flex'}}, [AP2.icon('flame', 40)]);
    AP2.theme.bind(ic, (n, c) => { n.style.color = s.today ? c.fire : c.text3; });
    const best = AP2.game.read().n.streak || 0;
    return gk().panel([h('div', {style: {display: 'flex', gap: S.sp[3], alignItems: 'center'}}, [ic, h('div', {}, [
      gk().kicker('Lernserie'), big(s.n + (s.n === 1 ? ' Tag' : ' Tage'), s.today ? 'fire' : 'text', S.f.xl),
      small(s.today ? 'Heute erledigt. Rekord: ' + best : 'Heute noch ' + AP2.game.STREAK_MIN + ' XP sammeln!')])])], {flex: '1 1 200px'});
  };
  const goalPanel = () => {
    const g = AP2.game.read();
    const xp = AP2.game.todayXp();
    const ring = gk().ring(64, 7, (p) => (p >= 1 ? 'gold' : 'accent'), [AP2.tint(h('div', {text: Math.min(999, Math.round((xp / g.goal) * 100)) + '%', style: {fontSize: S.f.xs, fontWeight: S.fw.bold}}), 'text')]);
    ring.set(xp / g.goal);
    const opts = h('div', {style: {display: 'flex', gap: '4px', marginTop: S.sp[2], flexWrap: 'wrap'}}, [50, 100, 200, 300].map((val) => {
      const el = h('span', {text: String(val), style: {padding: '2px 8px', borderRadius: S.r.pill, fontSize: S.f.xs, fontWeight: S.fw.semi, border: '1px solid'}});
      return AP2.press(el, {label: 'Tagesziel ' + val + ' XP', fn: () => { AP2.game.set('goal', val); AP2.state.set('route', 'home'); },
        base: (c) => (g.goal === val ? {backgroundColor: c.accent, color: c.onAccent, borderColor: c.accent} : {backgroundColor: 'transparent', color: c.text2, borderColor: c.border}), hover: (c) => ({borderColor: c.accent})});
    }));
    return gk().panel([h('div', {style: {display: 'flex', gap: S.sp[3], alignItems: 'center'}}, [ring, h('div', {}, [gk().kicker('Tagesziel'), big(xp + ' / ' + g.goal + ' XP', 'text', S.f.lg), opts])])], {flex: '1 1 240px'});
  };
  const actions = () => {
    const pool = AP2.bank.core();
    const due = AP2.game.due(pool).length;
    const weak = AP2.game.weak(pool).length;
    const next = nextPage();
    const mix = h('div', {style: {flex: '2 1 320px', padding: '20px 22px', borderRadius: S.r.lg, display: 'flex', alignItems: 'center', gap: S.sp[4]}}, [
      h('div', {style: {display: 'flex'}}, [AP2.icon('play', 34)]),
      h('div', {}, [h('div', {text: 'Täglichen Mix starten', style: {fontSize: S.f.xl, fontWeight: S.fw.bold}}),
        h('div', {text: (due ? due + ' Wiederholungen fällig' : 'Keine Wiederholung fällig') + ' plus neue Fragen  ·  etwa 10 Minuten', style: {fontSize: S.f.sm, opacity: '0.9'}})])]);
    AP2.press(mix, {fn: () => AP2.router.go('trainer/mix'), label: 'Täglichen Mix starten', base: (c) => ({backgroundColor: c.accent, color: c.onAccent, boxShadow: S.shadow}), hover: () => ({opacity: '0.92'})});
    const side = (icon, title, text, route) => {
      const el = h('div', {style: {flex: '1 1 150px', padding: '14px 16px', borderRadius: S.r.lg, border: '1px solid', display: 'flex', gap: S.sp[3], alignItems: 'center'}}, [
        AP2.tint(h('div', {style: {display: 'flex'}}, [AP2.icon(icon, 24)]), 'accent'),
        h('div', {style: {minWidth: 0}}, [AP2.tint(h('div', {text: title, style: {fontWeight: S.fw.bold}}), 'text'), AP2.tint(h('div', {text, style: {fontSize: S.f.xs, overflow: 'hidden', textOverflow: 'ellipsis'}}), 'text2')])]);
      return AP2.press(el, {fn: () => AP2.router.go(route), label: title, base: (c) => ({backgroundColor: c.surface, borderColor: c.border}), hover: (c) => ({borderColor: c.accent, backgroundColor: c.hover})});
    };
    return row([mix, side('book', 'Weiter lernen', next ? next.t : '', next ? next.id : 'home'), side('bolt', 'Blitz: 60 Sekunden', 'Rekord: ' + AP2.game.read().best + ' Punkte', 'trainer/blitz'),
      side('target', 'Fehlertraining', weak + (weak === 1 ? ' schwache Frage' : ' schwache Fragen'), 'trainer/fehler')]);
  };
  // Aktivität der letzten 18 Wochen: eine Zelle pro Tag, Montag oben.
  const heatmap = () => {
    const g = AP2.game.read();
    const today = AP2.game.today();
    const weeks = 18;
    const dow = (AP2.game.dateOf(today).getDay() + 6) % 7;
    const start = today - dow - (weeks - 1) * 7;
    const grid = h('div', {style: {display: 'grid', gridTemplateRows: 'repeat(7, 12px)', gridAutoFlow: 'column', gridAutoColumns: '12px', gap: '3px'}});
    let active = 0;
    let total = 0;
    for (let d = start; d <= today; d++) {
      const xp = g.days[d] || 0;
      if (xp > 0) active++;
      total += xp;
      const cell = h('div', {attrs: {title: gk().fmtDate(AP2.game.dateOf(d)) + ': ' + xp + ' XP'}, style: {width: '12px', height: '12px', borderRadius: '3px'}});
      AP2.theme.bind(cell, (n, c) => {
        n.style.backgroundColor = xp <= 0 ? c.surface2 : xp >= g.goal * 2 ? c.gold : xp >= g.goal ? c.accent : gk().mix(c.accentSoft, c.accent, 0.25 + 0.5 * xp / g.goal);
        n.style.outline = d === today ? '1.5px solid ' + c.text3 : 'none';
      });
      grid.appendChild(cell);
    }
    const scroller = h('div', {style: {overflowX: 'auto', paddingBottom: '4px'}}, [grid]);
    return gk().panel([h('div', {style: {display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: S.sp[2], marginBottom: S.sp[3]}}, [gk().kicker('Aktivität'),
      small(active + ' Lerntage, ' + total + ' XP in ' + weeks + ' Wochen', 'text3')]), scroller], {flex: '1 1 320px'});
  };
  const blockCard = (blk) => {
    const list = AP2.store.byBlock(blk.id);
    const done = list.filter((p) => AP2.state.get('done')[p.id]).length;
    const ms = list.map((p) => AP2.game.mastery(p.id)).filter((m) => m.total);
    const avg = ms.length ? ms.reduce((a, m) => a + m.pct, 0) / ms.length : 0;
    const starsN = Math.round(avg * 5);
    const title = AP2.tint(h('div', {text: blk.t, style: {fontSize: S.f.lg, fontWeight: S.fw.bold, marginBottom: S.sp[1]}}), 'text');
    const desc = AP2.tint(h('div', {text: blk.s, style: {fontSize: S.f.sm, lineHeight: '1.5'}}), 'text2');
    const meta = h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: S.sp[2], marginTop: S.sp[3], flexWrap: 'wrap'}}, [
      AP2.tint(h('div', {text: done + ' von ' + list.length + ' Seiten erledigt', style: {fontSize: S.f.xs}}), 'text3'), ms.length ? gk().stars(starsN, 13) : null]);
    const el = h('div', {style: {flex: '1 1 300px', padding: '18px 20px', borderRadius: S.r.lg, border: '1px solid'}}, [title, desc, meta, h('div', {style: {marginTop: S.sp[2]}}, [gk().bar(list.length ? done / list.length : 0)])]);
    const first = list.find((p) => !AP2.state.get('done')[p.id]) || list[0];
    return AP2.press(el, {fn: () => AP2.router.go(first.id), label: blk.t, base: (c) => ({backgroundColor: c.surface, borderColor: c.border}), hover: (c) => ({borderColor: c.accent, backgroundColor: c.hover})});
  };
  const badgeIcon = (b, have) => {
    const el = h('div', {attrs: {title: b.t + ': ' + b.d}, style: {width: '46px', height: '46px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid', flexShrink: 0}}, [AP2.icon(have ? b.icon : 'lock', 22)]);
    const tone = {bronze: 'fire', silver: 'accent', gold: 'gold'}[b.tier];
    return AP2.theme.bind(el, (n, c) => { n.style.color = have ? c[tone] : c.text3; n.style.borderColor = have ? c[tone] : c.border; n.style.backgroundColor = have ? (c[tone + 'Soft'] || c.accentSoft) : c.surface2; });
  };
  AP2.badgeIcon = badgeIcon;
  const badges = () => {
    const have = AP2.state.get('badges');
    const got = AP2.game.BADGES.filter((b) => have[b.id]).sort((x, y) => have[y.id] - have[x.id]);
    const next = AP2.game.BADGES.filter((b) => !have[b.id]).slice(0, Math.max(0, 8 - Math.min(got.length, 4)));
    const shown = got.slice(0, 4).map((b) => [b, true]).concat(next.map((b) => [b, false]));
    const strip = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3]}}, shown.map(([b, ok]) => h('div', {style: {width: '74px', textAlign: 'center'}}, [
      h('div', {style: {display: 'flex', justifyContent: 'center'}}, [badgeIcon(b, ok)]), AP2.tint(h('div', {text: b.t, style: {fontSize: '11px', marginTop: '4px', lineHeight: '1.25', overflowWrap: 'anywhere', hyphens: 'auto'}}), ok ? 'text' : 'text3')])));
    const link = AP2.btn({text: 'Alle ' + AP2.game.BADGES.length + ' Abzeichen', small: true, fn: () => AP2.router.go('erfolge')});
    return gk().panel([h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: S.sp[3], gap: S.sp[2], flexWrap: 'wrap'}},
      [gk().kicker('Abzeichen: ' + got.length + ' von ' + AP2.game.BADGES.length), link]), strip], {flex: '1 1 320px'});
  };
  const quick = () => row([['map', 'Themenkarte', 'themen'], ['trophy', 'Probeprüfungen', 'exam-info'], ['clock', 'Prüfungsablauf und Notenrechner', 'ref-ablauf'], ['chart', 'Formelsammlung', 'ref-formeln']]
    .filter(([, , id]) => AP2.views[id] || AP2.store.get(id)).map(([icon, text, id]) => AP2.btn({text, icon: AP2.icon(icon, 18), fn: () => AP2.router.go(id)})), S.sp[2]);
  AP2.views.home = () => {
    AP2.ctx.id = 'home';
    const sec = (title) => h('div', {style: {margin: S.sp[6] + ' 0 ' + S.sp[3]}}, [gk().kicker(title, 'text3')]);
    return h('div', {}, [hero(), row([levelPanel(), streakPanel(), goalPanel()]), h('div', {style: {height: S.sp[3]}}), actions(),
      h('div', {style: {height: S.sp[3]}}), row([heatmap(), badges()]),
      sec('Prüfungsbereiche'), row(AP2.store.BLOCKS.filter((b) => LEARN.includes(b.id)).map(blockCard)),
      sec('Weitere Bereiche'), row(AP2.store.BLOCKS.filter((b) => !LEARN.includes(b.id)).map(blockCard)),
      sec('Schnellzugriff'), quick()]);
  };
  AP2.viewTitles.home = 'Start';
})();
