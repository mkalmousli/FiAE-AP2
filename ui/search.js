// Suchfeld mit Ergebnisliste: Seiten nach Relevanz, darunter die besten Fundstellen mit Textauszug.
(function () {
  const {h, on, st} = AP2;
  const S = AP2.S;
  const PAGES = 20;
  const SHOWN = 3; // Fundstellen je Seite in der Liste (Rest: Zähler)
  const SPAN = 180;
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
  // Suche als großer Dialog über allem (auch über Menü und Leiste). Die Leiste zeigt nur einen Auslöser.
  AP2.mkSearch = () => {
    const input = AP2.field(h('input', {attrs: {type: 'search', placeholder: 'Suchen: Begriff, Thema, Frage ...', 'aria-label': 'Suche', autocomplete: 'off', spellcheck: 'false'},
      style: {width: '100%', fontSize: S.f.lg, padding: '12px 14px 12px 42px', boxSizing: 'border-box'}}));
    AP2.theme.bind(input, (n) => { n.style.paddingLeft = '42px'; });
    const lens = h('span', {style: {position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex', pointerEvents: 'none'}}, [AP2.icon('search', 18)]);
    AP2.theme.bind(lens, (n, c) => { n.style.color = c.text3; });
    const results = h('div', {attrs: {role: 'listbox'}, style: {flex: '1 1 auto', overflowY: 'auto', overscrollBehavior: 'contain', minHeight: 0}});
    const hint = h('div', {style: {fontSize: S.f.xs, padding: '6px 14px', borderTop: '1px solid', flexShrink: 0}});
    const box = h('div', {attrs: {role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Suche'}, style: {display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '900px',
      maxHeight: '100%', borderRadius: S.r.lg, border: '1px solid', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', overflow: 'hidden'}},
      [h('div', {style: {position: 'relative', padding: '12px 12px 8px', flexShrink: 0}}, [input, lens]), results, hint]);
    AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
    AP2.theme.bind(hint, (n, c) => { n.style.borderColor = c.border; n.style.backgroundColor = c.surface2; n.style.color = c.text3; });
    const veil = h('div', {style: {position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'none', alignItems: 'flex-start', justifyContent: 'center',
      boxSizing: 'border-box', zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.5)'}}, [box]);
    const fit = () => {
      const L = AP2.layout;
      const pad = L.w < 700 ? 8 : 24;
      st(veil, {padding: (L.h < 600 ? 8 : Math.round(L.h * 0.06)) + 'px ' + pad + 'px ' + pad + 'px'});
      box.style.maxHeight = (L.h - (L.h < 600 ? 16 : Math.round(L.h * 0.06)) - pad) + 'px';
    };
    let found = null;
    let rows = [];
    let sel = 0;
    let isOpen = false;
    const close = () => { if (!isOpen) return; isOpen = false; veil.style.display = 'none'; if (veil.parentNode) veil.parentNode.removeChild(veil); };
    const show = () => {
      if (isOpen) { input.focus(); input.select(); return; }
      isOpen = true;
      fit();
      document.body.appendChild(veil);
      veil.style.display = 'flex';
      render();
      input.focus();
      input.select();
    };
    const open = (page, hit) => {
      const {terms, shown} = found;
      input.value = '';
      found = null;
      close();
      AP2.find.open(page.id, terms, hit, shown);
    };
    const row = (inner, fn, padding) => {
      const idx = rows.length;
      const el = AP2.press(h('div', {style: {padding, borderLeft: '3px solid'}}, inner), {role: 'option', fn: () => fn(),
        base: (c) => ({backgroundColor: idx === sel ? c.hover : 'transparent', borderLeftColor: idx === sel ? c.accent : 'transparent'}),
        hover: (c) => ({backgroundColor: c.hover})});
      el.tabIndex = -1;
      rows.push({el, fn});
      return el;
    };
    const pageRow = (res) => {
      const p = res.ix.page;
      const blk = AP2.store.BLOCKS.find((b) => b.id === p.b);
      const title = AP2.tint(h('div', {style: {fontWeight: S.fw.semi, fontSize: S.f.sm, flex: '1 1 0', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}},
        marked(p.t, AP2.search.ranges(res.ix.title, found.terms))), 'text');
      const crumb = h('span', {text: blk.t.replace(/^Prüfung:?\s*/, '') + (p.g ? ' / ' + p.g : ''), style: {fontSize: '11px', fontWeight: S.fw.semi, whiteSpace: 'nowrap',
        overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '45%', flex: '0 1 auto'}});
      AP2.theme.bind(crumb, (n, c) => { n.style.color = (c.block && c.block[p.b]) || c.text3; });
      const count = h('span', {text: String(res.total), attrs: {title: res.total + ' Fundstellen'}, style: {fontSize: '10.5px', fontWeight: S.fw.bold, padding: '0 6px', borderRadius: S.r.pill, flex: '0 0 auto', lineHeight: '16px'}});
      AP2.theme.bind(count, (n, c) => { n.style.backgroundColor = c.surface2; n.style.color = c.text2; });
      return row([h('div', {style: {display: 'flex', alignItems: 'center', gap: '8px'}}, [title, crumb, count])], () => open(p, res.inTitle ? null : res.hits[0]), '8px 14px 3px 11px');
    };
    const hitRow = (res, hit) => {
      const seg = res.ix.segs[hit.si];
      const kind = AP2.index.LABEL[seg.kind];
      const tag = [seg.head, kind].filter(Boolean).join(' · ');
      const body = AP2.tint(h('div', {style: {fontSize: '13px', lineHeight: '1.45', overflowWrap: 'anywhere', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden',
        fontFamily: seg.kind === 'code' ? S.font.mono : S.font.sans}}, [tag ? AP2.tint(h('span', {text: tag + '  ', style: {fontWeight: S.fw.bold, fontSize: '10.5px', letterSpacing: '0.02em'}}), 'text3') : null,
        snippet(seg, hit, found.terms)]), 'text2');
      return row([body], () => open(res.ix.page, hit), '3px 14px 3px 26px');
    };
    const group = (res, idx) => {
      const shown = res.hits.slice(0, SHOWN);
      const more = res.total - shown.length;
      const box = h('div', {style: {borderTop: idx ? '1px solid' : 'none', paddingBottom: '3px'}}, [pageRow(res), shown.map((hit) => hitRow(res, hit)),
        more > 0 ? small('+ ' + more + ' weitere', 'text3', {padding: '1px 14px 3px 26px'}) : null]);
      return AP2.theme.bind(box, (n, c) => { n.style.borderColor = c.border; });
    };
    const render = () => {
      AP2.dispose(results);
      rows = [];
      if (!isOpen) return;
      const all = found ? found.results : [];
      const note = (text) => results.appendChild(small(text, 'text2', {padding: '14px 16px', fontSize: S.f.sm}));
      if (!found) note('Tippe mindestens zwei Zeichen. Mehrere Wörter suchen gemeinsam, „in Anführungszeichen“ sucht die genaue Wortfolge.');
      else {
        if (found.fixed) note('Keine Treffer für die Eingabe. Ergebnisse für „' + found.fixed + '“:');
        if (!all.length) note(found.terms.length ? 'Keine Treffer für „' + found.shown + '“.' : 'Mindestens zwei Zeichen eingeben.');
        all.slice(0, PAGES).forEach((res, idx) => results.appendChild(group(res, idx)));
      }
      const nHits = all.reduce((a, r) => a + r.total, 0);
      hint.textContent = (all.length ? (all.length > PAGES ? 'Beste ' + PAGES + ' von ' + all.length + ' Seiten' : all.length + (all.length === 1 ? ' Seite' : ' Seiten')) + '  ·  ' + nHits + ' Fundstellen  ·  ' : '')
        + (AP2.layout.w >= 700 ? '↑↓ wählen  ·  Enter öffnet  ·  Strg+Klick neuer Tab  ·  Esc schließt' : 'Tippen zum Öffnen, Esc schließt');
      results.scrollTop = 0;
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
    on(input, 'keydown', (ev) => {
      if (ev.key === 'Escape') { ev.preventDefault(); close(); }
      if (ev.key === 'Enter' && rows[sel]) { ev.preventDefault(); AP2.router.tab = ev.ctrlKey || ev.metaKey; try { rows[sel].fn(); } finally { AP2.router.tab = false; } }
      if (ev.key === 'ArrowDown') { ev.preventDefault(); move(1); }
      if (ev.key === 'ArrowUp') { ev.preventDefault(); move(-1); }
    });
    on(veil, 'mousedown', (ev) => { if (ev.target === veil) close(); });
    on(results, 'mousedown', (ev) => ev.preventDefault());
    AP2.layout.bind(() => { if (isOpen) { fit(); render(); } });
    document.addEventListener('keydown', (ev) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName) || ev.target.isContentEditable;
      const combo = (ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k';
      if (ev.key === 'Escape' && isOpen) { close(); return; }
      if (!combo && (ev.key !== '/' || typing)) return;
      ev.preventDefault();
      show();
    });
    // Auslöser in der Leiste: sieht aus wie ein Suchfeld, öffnet den Dialog.
    const lbl = h('span', {text: 'Suchen', style: {flex: '1 1 auto', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left'}});
    const kbd = h('span', {text: 'Strg K', style: {fontSize: '11px', padding: '1px 6px', borderRadius: S.r.sm || '4px', border: '1px solid', flexShrink: 0}});
    AP2.layout.bind((L) => { kbd.style.display = L.w >= 900 ? 'inline' : 'none'; lbl.style.display = L.w >= 520 ? 'inline' : 'none'; });
    const trigger = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[2], height: '40px', padding: '0 12px', borderRadius: S.r.md, border: '1px solid', boxSizing: 'border-box', fontSize: S.f.sm, cursor: 'pointer'}},
      [AP2.icon('search', 18), lbl, kbd]);
    AP2.press(trigger, {role: 'button', label: 'Suche öffnen (Taste / oder Strg+K)', fn: show,
      base: (c) => { kbd.style.borderColor = c.border; return {backgroundColor: c.surface2, borderColor: c.border, color: c.text3}; }, hover: (c) => ({borderColor: c.accent})});
    // Index im Leerlauf vorbereiten, damit die erste Eingabe sofort Ergebnisse zeigt.
    (window.requestIdleCallback || setTimeout)(() => AP2.index.all());
    return {el: trigger, input};
  };
})();
