// Ziehgriff am Rand der Seitenleiste: Breite per Maus oder Touch ändern, Doppelklick setzt zurück.
(function () {
  const {h, on, st} = AP2;
  const S = AP2.S;
  AP2.navGrip = () => {
    const line = h('div', {style: {width: '2px', height: '100%', margin: '0 auto', transition: S.t.fast}});
    const el = h('div', {attrs: {role: 'separator', 'aria-orientation': 'vertical', 'aria-label': 'Breite der Navigation ändern'},
      style: {position: 'absolute', top: 0, right: 0, bottom: 0, width: S.w.grip + 'px', cursor: 'col-resize', touchAction: 'none', zIndex: 2}}, [line]);
    let hot = false;
    const paint = () => { line.style.backgroundColor = hot ? AP2.theme.c().accent : 'transparent'; };
    AP2.theme.bind(el, paint);
    const set = (val) => { hot = val; paint(); };
    on(el, 'pointerenter', () => set(true));
    on(el, 'pointerleave', () => { if (!el.dragging) set(false); });
    on(el, 'pointerdown', (ev) => { el.dragging = true; el.setPointerCapture(ev.pointerId); set(true); ev.preventDefault(); });
    on(el, 'pointermove', (ev) => { if (el.dragging) AP2.state.set('sideW', Math.round(ev.clientX)); });
    const end = () => { el.dragging = false; set(false); };
    on(el, 'pointerup', end);
    on(el, 'pointercancel', end);
    on(el, 'dblclick', () => AP2.state.set('sideW', 0));
    AP2.layout.bind((L) => st(el, {display: L.mobile ? 'none' : 'block'}));
    return el;
  };
})();
