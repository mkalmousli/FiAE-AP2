// Suchfeld mit Ergebnisliste: Seiten nach Relevanz, darunter die besten Fundstellen mit Textauszug.
(function () {
  const {h, on, st} = AP2;
  const S = AP2.S;
  const PAGES = 8;
  const SPAN = 160;
  // Text mit hervorgehobenen Bereichen [von, bis].
  const marked = (text, ranges) => {
    const out = [];
    let last = 0;
    ranges.forEach(([a, b]) => {
      out.push(text.slice(last, a));
      const el = h('mark', {text: text.slice(a, b), style: {borderRadius: '3px', fontWeight: S.fw.semi, color: 'inherit'}});
      out.push(AP2.fill(el, 'hl'));
      last = b;
    });
    out.push(text.slice(last));
    return out;
  };
  // Auszug rund um die Fundstelle, an Wortgrenzen geschnitten.
  const snippet = (seg, hit, terms) => {
    const len = seg.text.length;
    let to = Math.min(len, Math.max(0, hit.a - 50) + SPAN);
    let from = Math.max(0, to - SPAN);
    const head = seg.text.indexOf(' ', from);
    if (from > 0 && head >= 0 && head < hit.a) from = head + 1;
    const tail = seg.text.lastIndexOf(' ', to);
    if (to < len && tail > hit.b) to = tail;
    const text = seg.text.slice(from, to).replace(/\s/g, ' ');
    return [from > 0 ? '… ' : '', marked(text, AP2.search.ranges(seg.fold.slice(from, to), terms)), to < len ? ' …' : ''];
  };
  const small = (text, tone, style) => AP2.tint(h('div', {text, style: Object.assign({fontSize: S.f.xs}, style)}), tone);
  AP2.mkSearch = () => {
    const input = AP2.field(h('input', {attrs: {type: 'search', placeholder: 'Suchen (z. B. Subnetting, Kündigung)', 'aria-label': 'Suche',
      autocomplete: 'off', spellcheck: 'false', title: 'Suche: Taste / oder Strg+K'}, style: {width: '100%'}}));
    const drop = h('div', {attrs: {role: 'listbox'}, style: {position: 'fixed', display: 'none', borderRadius: S.r.md, border: '1px solid',
      overflowY: 'auto', overscrollBehavior: 'contain', boxSizing: 'border-box', zIndex: S.z.drop, boxShadow: S.shadow}});
    AP2.theme.bind(drop, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
    const wrap = h('div', {style: {position: 'relative'}}, [input, drop]);
    let found = null;
    let rows = [];
    let sel = 0;
    const close = () => { drop.style.display = 'none'; };
    const open = (page, hit) => {
      const {terms, shown} = found;
      input.value = '';
      found = null;
      close();
      input.blur();
      AP2.find.open(page.id, terms, hit, shown);
    };
    const row = (inner, fn, padding) => {
      const idx = rows.length;
      const el = AP2.press(h('div', {style: {padding, borderLeft: '3px solid'}}, inner), {role: 'option', fn,
        base: (c) => ({backgroundColor: idx === sel ? c.hover : 'transparent', borderLeftColor: idx === sel ? c.accent : 'transparent'}),
        hover: (c) => ({backgroundColor: c.hover})});
      el.tabIndex = -1;
      rows.push({el, fn});
      return el;
    };
    const pageRow = (res) => {
      const p = res.ix.page;
      const blk = AP2.store.BLOCKS.find((b) => b.id === p.b);
      const title = AP2.tint(h('div', {style: {fontWeight: S.fw.semi, fontSize: S.f.sm}}, marked(p.t, AP2.search.ranges(res.ix.title, found.terms))), 'text');
      return row([title, small(blk.t + (p.g ? ' / ' + p.g : ''), 'text3')], () => open(p, res.inTitle ? null : res.hits[0]), '10px 14px 6px 11px');
    };
    const hitRow = (res, hit) => {
      const seg = res.ix.segs[hit.si];
      const where = [seg.head, AP2.index.LABEL[seg.kind]].filter(Boolean).join(' · ');
      const body = AP2.tint(h('div', {style: {fontSize: '13px', lineHeight: '1.5', overflowWrap: 'anywhere',
        fontFamily: seg.kind === 'code' ? S.font.mono : S.font.sans}}, snippet(seg, hit, found.terms)), 'text2');
      return row([where ? small(where, 'text3', {fontWeight: S.fw.semi}) : null, body], () => open(res.ix.page, hit), '5px 14px 5px 25px');
    };
    const group = (res, idx) => {
      const more = res.total - res.hits.length;
      const box = h('div', {style: {borderTop: idx ? '1px solid' : 'none', paddingBottom: '5px'}}, [pageRow(res), res.hits.map((hit) => hitRow(res, hit)),
        more > 0 ? small('+ ' + more + (more === 1 ? ' weitere Fundstelle' : ' weitere Fundstellen') + ' auf dieser Seite', 'text3', {padding: '3px 14px 3px 28px'}) : null]);
      return AP2.theme.bind(box, (n, c) => { n.style.borderColor = c.border; });
    };
    const place = () => {
      const L = AP2.layout;
      const box = wrap.getBoundingClientRect();
      const width = Math.min(640, L.w - 16);
      st(drop, {top: (box.bottom + 6) + 'px', left: Math.max(8, Math.min(box.right - width, L.w - width - 8)) + 'px', width: width + 'px',
        maxHeight: (L.h - box.bottom - 22) + 'px'});
    };
    const render = () => {
      AP2.dispose(drop);
      rows = [];
      if (!found) { close(); return; }
      const all = found.results;
      const note = (text) => drop.appendChild(small(text, 'text2', {padding: '10px 14px'}));
      if (found.fixed) note('Keine Treffer für die Eingabe. Ergebnisse für „' + found.fixed + '“:');
      if (!all.length) note(found.terms.length ? 'Keine Treffer für „' + found.shown + '“.' : 'Mindestens zwei Zeichen eingeben.');
      all.slice(0, PAGES).forEach((res, idx) => drop.appendChild(group(res, idx)));
      if (all.length) {
        const foot = small((all.length > PAGES ? 'Die besten ' + PAGES + ' von ' + all.length + ' Seiten' : all.length + (all.length === 1 ? ' Seite' : ' Seiten'))
          + '  ·  Pfeiltasten wählen, Enter springt zur Fundstelle', 'text3', {padding: '8px 14px', borderTop: '1px solid'});
        drop.appendChild(AP2.theme.bind(foot, (n, c) => { n.style.borderColor = c.border; n.style.backgroundColor = c.surface2; }));
      }
      place();
      drop.style.display = 'block';
      drop.scrollTop = 0;
    };
    const update = () => { found = input.value.trim() ? AP2.search.run(input.value) : null; sel = 0; render(); };
    const move = (step) => {
      if (!rows.length) return;
      const old = sel;
      sel = (sel + step + rows.length) % rows.length;
      rows[old].el.repaint();
      rows[sel].el.repaint();
      rows[sel].el.scrollIntoView({block: 'nearest'});
    };
    on(input, 'input', update);
    on(input, 'focus', () => { if (input.value.trim()) update(); });
    on(input, 'keydown', (ev) => {
      if (ev.key === 'Escape') { input.value = ''; found = null; close(); input.blur(); }
      if (ev.key === 'Enter' && rows[sel]) rows[sel].fn();
      if (ev.key === 'ArrowDown') { ev.preventDefault(); move(1); }
      if (ev.key === 'ArrowUp') { ev.preventDefault(); move(-1); }
    });
    on(input, 'blur', () => setTimeout(close, 180));
    // Klicks und Scrollen in der Liste sollen dem Feld nicht den Fokus nehmen.
    on(drop, 'mousedown', (ev) => ev.preventDefault());
    document.addEventListener('keydown', (ev) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName);
      const combo = (ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k';
      if (!combo && (ev.key !== '/' || typing)) return;
      ev.preventDefault();
      input.focus();
      input.select();
    });
    // Index im Leerlauf vorbereiten, damit die erste Eingabe sofort Ergebnisse zeigt.
    (window.requestIdleCallback || setTimeout)(() => AP2.index.all());
    return {el: wrap, input};
  };
})();
