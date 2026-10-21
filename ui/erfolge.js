// Erfolge und Profil: Statistik, alle Abzeichen, Einstellungen (Tagesziel, Prüfungsdatum, Ton, Zurücksetzen).
(function () {
  const {h, on} = AP2;
  const S = AP2.S;
  const gk = () => AP2.gk;
  const TIERS = [['gold', 'Gold'], ['silver', 'Silber'], ['bronze', 'Bronze']];
  const settings = () => {
    const g = AP2.game.read();
    const date = AP2.field(h('input', {attrs: {type: 'date', value: g.exam, 'aria-label': 'Prüfungsdatum'}}));
    on(date, 'change', () => { if (date.value) AP2.game.set('exam', date.value); });
    const goal = AP2.field(h('select', {attrs: {'aria-label': 'Tagesziel'}}, [50, 100, 150, 200, 300, 500].map((v) => h('option', {text: v + ' XP', attrs: {value: String(v)}}))));
    goal.value = String(g.goal);
    on(goal, 'change', () => AP2.game.set('goal', Number(goal.value)));
    const sound = AP2.btn({text: g.sound ? 'Töne: an' : 'Töne: aus', icon: AP2.icon(g.sound ? 'volume' : 'mute', 18), small: true, fn: () => {
      AP2.game.set('sound', !AP2.game.read().sound); AP2.state.set('route', 'erfolge'); AP2.fx.sound('right');
    }});
    const reset = AP2.btn({text: 'Fortschritt zurücksetzen', small: true, fn: () => {
      if (window.confirm('XP, Lernkartei und Abzeichen wirklich löschen? Erledigte Seiten bleiben erhalten.')) { AP2.game.reset(); AP2.state.set('route', 'erfolge'); }
    }});
    const field = (text, ctrl) => h('label', {style: {display: 'flex', flexDirection: 'column', gap: '4px', flex: '1 1 180px'}}, [AP2.tint(h('span', {text, style: {fontSize: S.f.xs, fontWeight: S.fw.semi}}), 'text2'), ctrl]);
    return gk().panel([gk().kicker('Einstellungen'), h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[4], margin: S.sp[3] + ' 0'}}, [field('Prüfungsdatum (Countdown)', date), field('Tagesziel', goal)]),
      h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2]}}, [sound, reset]),
      AP2.tint(h('div', {text: 'Alles wird nur in diesem Browser gespeichert (localStorage). Private Fenster vergessen den Fortschritt.', style: {fontSize: S.f.xs, marginTop: S.sp[3]}}), 'text3')]);
  };
  AP2.views.erfolge = () => {
    AP2.ctx.id = 'erfolge';
    const g = AP2.game.read();
    const l = AP2.game.level();
    const have = AP2.state.get('badges');
    const srs = AP2.state.get('srs');
    const cards = Object.values(srs);
    const solid = cards.filter((c) => c[0] >= AP2.game.SOLID).length;
    const answered = (g.n.right || 0) + (g.n.wrong || 0);
    const days = Object.values(g.days).filter((v) => v > 0).length;
    const root = h('div');
    root.appendChild(AP2.tint(h('h1', {text: 'Erfolge', style: {fontSize: S.f.h1, fontWeight: S.fw.bold, letterSpacing: '-0.02em', margin: '0 0 ' + S.sp[2]}}), 'text'));
    root.appendChild(AP2.tint(h('p', {text: 'Stufe ' + l.lv + ': ' + l.title + '  ·  ' + l.xp + ' XP gesamt', style: {fontSize: S.f.lg, margin: '0 0 ' + S.sp[3]}}), 'text2'));
    root.appendChild(h('div', {style: {marginBottom: S.sp[5]}}, [gk().bar(l.pct, 'gold', 8)]));
    root.appendChild(h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3], marginBottom: S.sp[6]}}, [
      gk().tile('target', answered, 'Antworten (' + (answered ? Math.round(((g.n.right || 0) / answered) * 100) : 0) + ' % richtig)', 'accent'),
      gk().tile('check', solid + ' / ' + AP2.bank.core().length, 'Fragen sicher (ab Fach ' + AP2.game.SOLID + ')', 'ok'),
      gk().tile('flame', (g.n.streak || 0) + ((g.n.streak || 0) === 1 ? ' Tag' : ' Tage'), 'längste Lernserie', 'fire'),
      gk().tile('bolt', g.n.combo || 0, 'beste Kombo', 'fire'),
      gk().tile('clock', g.best || 0, 'Blitz-Rekord', 'gold'),
      gk().tile('chart', days, 'Lerntage insgesamt', 'accent'),
    ]));
    TIERS.forEach(([tier, name]) => {
      const list = AP2.game.BADGES.filter((b) => b.tier === tier);
      root.appendChild(AP2.blocks.h(name + ' (' + list.filter((b) => have[b.id]).length + ' von ' + list.length + ')'));
      root.appendChild(h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3]}}, list.map((b) => {
        const ok = !!have[b.id];
        const when = ok ? 'Erhalten am ' + gk().fmtDate(AP2.game.dateOf(have[b.id])) : 'Noch gesperrt';
        return gk().panel([h('div', {style: {display: 'flex', gap: S.sp[3], alignItems: 'center'}}, [AP2.badgeIcon(b, ok), h('div', {}, [
          AP2.tint(h('div', {text: b.t, style: {fontWeight: S.fw.bold}}), ok ? 'text' : 'text3'), AP2.tint(h('div', {text: b.d, style: {fontSize: S.f.xs, lineHeight: '1.4'}}), 'text2'),
          AP2.tint(h('div', {text: when, style: {fontSize: '11px', marginTop: '2px'}}), 'text3')])])], {flex: '1 1 250px', padding: '12px 14px', opacity: ok ? '1' : '0.75'});
      })));
    });
    root.appendChild(h('div', {style: {height: S.sp[6]}}));
    root.appendChild(settings());
    return root;
  };
  AP2.viewTitles.erfolge = 'Erfolge';
})();
