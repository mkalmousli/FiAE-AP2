// Fortschrittsanzeige in der oberen Leiste: Lernserie, Tagesziel und Stufe; ein Klick öffnet die Übersicht.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  AP2.mkHud = () => {
    const flame = h('span', {style: {display: 'flex'}}, [AP2.icon('flame', 18)]);
    const streak = h('span', {style: {fontWeight: S.fw.bold, fontSize: S.f.sm, fontVariantNumeric: 'tabular-nums'}});
    const goalText = h('span', {style: {fontSize: '10px', fontWeight: S.fw.bold}});
    const goal = AP2.gk.ring(30, 4, (pct) => (pct >= 1 ? 'gold' : 'accent'), [goalText]);
    const lvText = h('span', {style: {fontWeight: S.fw.bold, fontSize: S.f.xs, whiteSpace: 'nowrap'}});
    const lv = h('span', {style: {padding: '4px 9px', borderRadius: S.r.pill, display: 'flex', alignItems: 'center', gap: '4px'}}, [AP2.icon('star', 13), lvText]);
    const fire = h('span', {style: {display: 'flex', alignItems: 'center', gap: '3px'}}, [flame, streak]);
    const el = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], padding: '4px 8px', borderRadius: S.r.md, flexShrink: 0}}, [fire, goal, lv]);
    const sync = () => {
      const g = AP2.game.read();
      const s = AP2.game.streak();
      const xp = AP2.game.todayXp();
      const l = AP2.game.level();
      streak.textContent = String(s.n);
      goalText.textContent = xp >= g.goal ? 'OK' : Math.round((xp / g.goal) * 100) + '%';
      goal.set(xp / g.goal);
      lvText.textContent = 'Stufe ' + l.lv;
      el.title = 'Lernserie: ' + s.n + (s.n === 1 ? ' Tag' : ' Tage') + (s.today ? '' : ' (heute noch offen)') + '\nHeute: ' + xp + ' von ' + g.goal + ' XP\nStufe ' + l.lv + ': ' + l.title + ' (' + l.xp + ' XP)';
      el.setAttribute('aria-label', el.title.replace(/\n/g, ', '));
      el.repaint();
    };
    AP2.press(el, {fn: () => AP2.router.go('home'), hover: (c) => ({backgroundColor: c.hover}), base: (c) => {
      const s = AP2.game.streak();
      flame.style.color = s.today ? c.fire : c.text3;
      streak.style.color = s.today ? c.fire : c.text2;
      lv.style.backgroundColor = c.goldSoft;
      lv.style.color = c.gold;
      goalText.style.color = c.text2;
      return {backgroundColor: 'transparent'};
    }});
    // Auf schmalen Bildschirmen bleibt nur die Serie sichtbar, damit das Suchfeld Platz behält.
    AP2.layout.bind((L) => { goal.style.display = L.w < 640 ? 'none' : 'block'; lv.style.display = L.w < 480 ? 'none' : 'flex'; });
    AP2.state.sub('game', sync);
    sync();
    return el;
  };
})();
