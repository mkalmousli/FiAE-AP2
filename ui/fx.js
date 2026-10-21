// Rückmeldungen für Fortschritt: XP-Anzeige, Hinweise, Konfetti, Stufenaufstieg und Töne (abschaltbar).
(function () {
  const {h, st} = AP2;
  const S = AP2.S;
  const calm = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stack = null;
  const holder = () => {
    if (stack && stack.isConnected) return stack;
    stack = h('div', {attrs: {'aria-live': 'polite'}, style: {position: 'fixed', left: '50%', bottom: '20px', transform: 'translateX(-50%)', zIndex: 99990,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: S.sp[2], pointerEvents: 'none', width: 'calc(100% - 32px)'}});
    document.body.appendChild(stack);
    return stack;
  };
  // Kurzer Hinweis unten in der Mitte; tone wählt die Farbe (accent, ok, bad, gold, fire).
  const toast = (title, text, tone, icon) => {
    const c = AP2.theme.c();
    const color = c[tone || 'accent'];
    const kids = [icon ? h('span', {style: {color, display: 'flex'}}, [AP2.icon(icon, 22)]) : null,
      h('div', {}, [h('div', {text: title, style: {fontWeight: S.fw.bold, fontSize: S.f.sm}}), text ? h('div', {text, style: {fontSize: S.f.xs, color: c.text2}}) : null])];
    const el = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], padding: '10px 16px', borderRadius: S.r.lg, border: '1px solid ' + c.border,
      borderLeft: '4px solid ' + color, backgroundColor: c.surface, color: c.text, boxShadow: '0 8px 30px rgba(0,0,0,0.18)', maxWidth: '440px',
      transition: 'opacity 250ms ease, transform 250ms ease', opacity: '0', transform: 'translateY(12px)'}}, kids);
    holder().appendChild(el);
    requestAnimationFrame(() => st(el, {opacity: '1', transform: 'none'}));
    setTimeout(() => { st(el, {opacity: '0', transform: 'translateY(12px)'}); setTimeout(() => el.remove(), 300); }, 3200);
  };
  // "+12 XP" schwebt aus der Ecke oben rechts nach oben.
  const pop = (amount) => {
    if (calm()) return;
    const c = AP2.theme.c();
    const el = h('div', {text: '+' + amount + ' XP', style: {position: 'fixed', top: (S.w.topbar + 8) + 'px', right: '24px', zIndex: 99991, pointerEvents: 'none',
      fontWeight: S.fw.bold, fontSize: S.f.md, color: c.gold, textShadow: '0 1px 0 ' + c.surface, transition: 'transform 900ms ease-out, opacity 900ms ease-out'}});
    document.body.appendChild(el);
    requestAnimationFrame(() => st(el, {transform: 'translateY(-36px)', opacity: '0'}));
    setTimeout(() => el.remove(), 1000);
  };
  const confetti = () => {
    if (calm()) return;
    const cv = h('canvas', {style: {position: 'fixed', inset: '0', width: '100%', height: '100%', zIndex: 99992, pointerEvents: 'none'}});
    document.body.appendChild(cv);
    const W = cv.width = window.innerWidth;
    const H = cv.height = window.innerHeight;
    const ctx = cv.getContext('2d');
    const c = AP2.theme.c();
    const cols = [c.accent, c.gold, c.ok, c.fire, c.bad];
    const parts = Array.from({length: 140}, () => ({x: W / 2 + (Math.random() - 0.5) * W * 0.3, y: H * 0.35, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4,
      r: Math.random() * 6 + 4, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.4, col: cols[Math.floor(Math.random() * cols.length)]}));
    const t0 = performance.now();
    const frame = (t) => {
      ctx.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.col; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore();
      });
      if (t - t0 < 2200) requestAnimationFrame(frame); else cv.remove();
    };
    requestAnimationFrame(frame);
  };
  let audio = null;
  const NOTES = {right: [[660, 0], [880, 0.08]], wrong: [[220, 0], [180, 0.1]], level: [[523, 0], [659, 0.1], [784, 0.2], [1047, 0.3]], badge: [[784, 0], [988, 0.1], [1319, 0.2]]};
  const sound = (kind) => {
    if (!AP2.game.read().sound || !NOTES[kind]) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      NOTES[kind].forEach(([freq, at]) => {
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = kind === 'wrong' ? 'triangle' : 'sine';
        osc.frequency.value = freq;
        const t = audio.currentTime + at;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        osc.connect(gain).connect(audio.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      });
    } catch (err) { /* Ton nicht verfügbar */ }
  };
  // Großer Hinweis in der Bildschirmmitte, zum Beispiel beim Stufenaufstieg.
  const modal = (kicker, title, text, icon) => {
    const c = AP2.theme.c();
    const close = () => { AP2.dispose(veil); veil.remove(); };
    const badge = h('div', {style: {width: '84px', height: '84px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '0 auto ' + S.sp[4], color: c.gold, backgroundColor: c.goldSoft, border: '3px solid ' + c.gold}}, [AP2.icon(icon || 'trophy', 44)]);
    const box = h('div', {attrs: {role: 'dialog', 'aria-modal': 'true'}, style: {backgroundColor: c.surface, color: c.text, borderRadius: S.r.lg, padding: '32px 28px',
      textAlign: 'center', width: 'min(400px, calc(100% - 32px))', boxShadow: '0 20px 60px rgba(0,0,0,0.35)', boxSizing: 'border-box'}}, [badge,
      h('div', {text: kicker, style: {fontSize: S.f.xs, fontWeight: S.fw.bold, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.gold}}),
      h('div', {text: title, style: {fontSize: S.f.h2, fontWeight: S.fw.bold, margin: S.sp[2] + ' 0'}}),
      h('div', {text, style: {fontSize: S.f.md, color: c.text2, marginBottom: S.sp[5]}}),
      AP2.btn({text: 'Weiter so', kind: 'primary', fn: close})]);
    const veil = h('div', {style: {position: 'fixed', inset: '0', zIndex: 99993, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'},
      on: {click: (ev) => { if (ev.target === veil) close(); }}}, [box]);
    document.body.appendChild(veil);
    box.querySelector('[role="button"]').focus();
  };
  AP2.game.on('xp', (d) => pop(d.amount));
  AP2.game.on('goal', (d) => { confetti(); toast('Tagesziel erreicht', '+' + d.bonus + ' XP Bonus. Deine Serie zählt heute.', 'gold', 'target'); sound('badge'); });
  AP2.game.on('level', (lv) => { confetti(); sound('level'); modal('Stufe ' + lv.lv + ' erreicht', lv.title, 'Noch ' + (lv.to - lv.xp) + ' XP bis Stufe ' + (lv.lv + 1) + '.', 'trophy'); });
  AP2.game.on('badge', (b) => { confetti(); sound('badge'); toast('Abzeichen: ' + b.t, b.d, 'gold', b.icon); });
  AP2.fx = {toast, pop, confetti, sound, modal};
})();
