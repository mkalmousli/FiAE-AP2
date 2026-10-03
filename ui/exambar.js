// Prüfungsleiste (haftet oben): Countdown, Punktestand, Note, Zurücksetzen.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const clock = (sec) => String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');
  const timer = (minutes) => {
    let left = minutes * 60;
    let id = null;
    const time = h('div', {text: clock(left), style: {fontFamily: S.font.mono, fontSize: S.f.xl, fontWeight: S.fw.bold}});
    const color = () => { time.style.color = AP2.theme.c()[left < 600 ? 'bad' : 'text']; };
    AP2.theme.bind(time, color);
    const stop = () => { if (id) { clearInterval(id); id = null; } };
    const tick = () => {
      if (!time.isConnected) return stop();
      left = Math.max(0, left - 1);
      time.textContent = clock(left);
      color();
      if (!left) stop();
    };
    const toggle = AP2.btn({text: 'Start', kind: 'primary', small: true, fn: () => {
      if (id) { stop(); toggle.firstChild.textContent = 'Weiter'; } else if (left) { id = setInterval(tick, 1000); toggle.firstChild.textContent = 'Pause'; }
    }});
    return h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3]}}, [time, toggle]);
  };
  AP2.examBar = (cfg, store) => {
    const score = AP2.tint(h('div', {style: {fontSize: S.f.sm, fontWeight: S.fw.semi}}), 'text');
    const fill = AP2.fill(h('div', {style: {height: '100%', borderRadius: S.r.pill, transition: 'width 200ms ease'}}), 'accent');
    const track = AP2.fill(h('div', {style: {height: '4px', borderRadius: S.r.pill, overflow: 'hidden', marginTop: S.sp[2]}}, [fill]), 'border');
    const reset = AP2.btn({text: 'Zurücksetzen', small: true, fn: () => { if (window.confirm('Alle Antworten und Punkte dieser Prüfung löschen?')) { store.reset(); AP2.state.set('route', AP2.state.get('route')); } }});
    const row = h('div', {style: {display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: S.sp[4], flexWrap: 'wrap'}},
      [timer(cfg.minutes), h('div', {style: {flex: '1 1 160px'}}, [score, track]), reset]);
    const el = h('div', {style: {position: 'sticky', top: S.w.topbar + 8 + 'px', zIndex: S.z.topbar - 5, padding: '12px 16px', borderRadius: S.r.md, border: '1px solid', margin: '0 0 ' + S.sp[5], boxShadow: S.shadow}}, [row]);
    AP2.theme.bind(el, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
    const update = (sum, total) => {
      const pct = total ? (sum / total) * 100 : 0;
      const g = AP2.exam.grade(pct);
      score.textContent = sum + ' von ' + total + ' Punkten (' + Math.round(pct) + ' %), Note ' + g[1] + ' (' + g[2] + ')';
      fill.style.width = Math.min(100, pct) + '%';
    };
    return {el, update};
  };
})();
