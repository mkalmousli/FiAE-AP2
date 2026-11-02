// Lösungsweg als Präsentation: Folie für Folie mit Zurück/Weiter, Fortschrittspunkten und Pfeiltasten.
// ['walk', {t: 'Titel', steps: [{t: 'Erklärung (rich)', b: [Blöcke]}, ...]}]
(function () {
  const {h, on} = AP2;
  const S = AP2.S;
  AP2.blocks.walk = (cfg) => {
    const steps = cfg.steps || [];
    let cur = 0;
    const label = AP2.tint(h('div', {text: cfg.label || 'Lösungsweg Schritt für Schritt', style: {fontSize: S.f.xs, fontWeight: S.fw.bold,
      textTransform: 'uppercase', letterSpacing: '0.08em'}}), 'accent');
    const count = AP2.tint(h('div', {style: {fontSize: S.f.sm, fontWeight: S.fw.semi, fontFamily: S.font.mono}}), 'text2');
    const title = cfg.t ? AP2.tint(h('div', {text: cfg.t, style: {fontSize: S.f.lg, fontWeight: S.fw.bold, margin: S.sp[2] + ' 0 0'}}), 'text') : null;
    const fill = AP2.fill(h('div', {style: {height: '100%', borderRadius: S.r.pill, transition: 'width 250ms ease'}}), 'accent');
    const track = AP2.fill(h('div', {style: {height: '4px', borderRadius: S.r.pill, overflow: 'hidden', margin: S.sp[3] + ' 0'}}, [fill]), 'border');
    const stage = h('div', {style: {minHeight: '120px'}});
    const dots = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center'}});
    const dotEls = steps.map((s, i) => {
      const d = h('span', {attrs: {title: 'Schritt ' + (i + 1)}, style: {width: '12px', height: '12px', borderRadius: '50%', display: 'inline-block'}});
      return AP2.press(d, {fn: () => go(i), label: 'Schritt ' + (i + 1),
        base: (c) => ({backgroundColor: i === cur ? c.accent : i < cur ? c.accentSoft : c.border}), hover: (c) => ({backgroundColor: c.accent})});
    });
    dotEls.forEach((d) => dots.appendChild(d));
    const prev = AP2.btn({text: 'Zurück', small: true, fn: () => go(cur - 1)});
    const next = AP2.btn({text: 'Weiter', kind: 'primary', small: true, fn: () => go(cur === steps.length - 1 ? 0 : cur + 1)});
    const nav = h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: S.sp[3], flexWrap: 'wrap', marginTop: S.sp[3]}},
      [dots, h('div', {style: {display: 'flex', gap: S.sp[2]}}, [prev, next])]);
    const head = h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: S.sp[3]}}, [label, count]);
    const box = h('div', {attrs: {tabindex: '0'}, style: {padding: '16px 20px', borderRadius: S.r.lg, border: '1px solid', borderTopWidth: '4px', margin: '0 0 ' + S.sp[5], outline: 'none'}},
      [head, title, track, stage, nav]);
    AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; n.style.borderTopColor = c.accent; });
    function go(i) {
      cur = Math.max(0, Math.min(steps.length - 1, i));
      AP2.dispose(stage);
      const step = steps[cur] || {};
      if (step.t) stage.appendChild(AP2.blocks.p(step.t));
      if (step.b) stage.appendChild(AP2.renderBlocks(step.b));
      count.textContent = (cur + 1) + ' / ' + steps.length;
      fill.style.width = Math.round(((cur + 1) / Math.max(1, steps.length)) * 100) + '%';
      prev.style.visibility = cur ? 'visible' : 'hidden';
      next.firstChild.textContent = cur === steps.length - 1 ? 'Von vorn' : 'Weiter';
      dotEls.forEach((d) => d.repaint && d.repaint());
    }
    // Pfeiltasten blättern, wenn der Kasten den Fokus hat; am Ende springt "Weiter" an den Anfang.
    on(box, 'keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
    });
    go(0);
    return box;
  };
})();
