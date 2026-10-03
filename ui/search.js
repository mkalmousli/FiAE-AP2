// Suchfeld mit Ergebnisliste (Titel, Gruppe, Volltext der Seiten).
(function () {
  const {h, on} = AP2;
  const S = AP2.S;
  const MAX = 8;
  AP2.mkSearch = () => {
    const input = AP2.field(h('input', {attrs: {type: 'search', placeholder: 'Suchen (z. B. Subnetting, Kündigung)', 'aria-label': 'Suche'}, style: {width: '100%'}}));
    const drop = h('div', {style: {position: 'absolute', top: '46px', left: 0, display: 'none', borderRadius: S.r.md, border: '1px solid',
      overflow: 'hidden', zIndex: S.z.drop, boxShadow: S.shadow}});
    AP2.theme.bind(drop, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
    const wrap = h('div', {style: {position: 'relative'}}, [input, drop]);
    let results = [];
    let sel = 0;
    const close = () => { drop.style.display = 'none'; };
    const pick = (page) => { input.value = ''; close(); AP2.router.go(page.id); input.blur(); };
    const item = (page, idx) => {
      const blk = AP2.store.BLOCKS.find((b) => b.id === page.b);
      const body = h('div', {}, [AP2.tint(h('div', {text: page.t, style: {fontWeight: S.fw.semi, fontSize: S.f.sm}}), 'text'),
        AP2.tint(h('div', {text: blk.t + (page.g ? ' / ' + page.g : ''), style: {fontSize: S.f.xs}}), 'text3')]);
      const el = h('div', {style: {padding: '10px 14px'}}, [body]);
      return AP2.press(el, {role: 'option', fn: () => pick(page), base: (c) => ({backgroundColor: idx === sel ? c.accentSoft : 'transparent'}),
        hover: (c) => ({backgroundColor: c.hover})});
    };
    const render = () => {
      AP2.dispose(drop);
      if (!results.length) { close(); return; }
      results.forEach((page, idx) => drop.appendChild(item(page, idx)));
      drop.style.width = wrap.offsetWidth + 'px';
      drop.style.display = 'block';
    };
    on(input, 'input', () => { results = AP2.store.search(input.value).slice(0, MAX); sel = 0; render(); });
    on(input, 'keydown', (ev) => {
      if (ev.key === 'Escape') { input.value = ''; close(); }
      if (ev.key === 'Enter' && results[sel]) pick(results[sel]);
      if (ev.key === 'ArrowDown' && results.length) { ev.preventDefault(); sel = (sel + 1) % results.length; render(); }
      if (ev.key === 'ArrowUp' && results.length) { ev.preventDefault(); sel = (sel + results.length - 1) % results.length; render(); }
    });
    on(input, 'blur', () => setTimeout(close, 180));
    return {el: wrap, input};
  };
})();
