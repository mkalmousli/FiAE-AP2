// Themenkarte als Landkarte: Prüfungsbereiche sind Regionen, Gruppen sind Inseln, Themen sind Orte auf einem gepunkteten Lernpfad.
(function () {
  const {h, on, st} = AP2;
  const S = AP2.S;
  const gk = () => AP2.gk;
  const FILTERS = [['alle', 'Alle'], ['offen', 'Noch offen'], ['schwach', 'Schwach (bis 2 Sterne)'], ['faellig', 'Wiederholung fällig']];
  const LEARN = ['ps', 'infra', 'eua', 'wiso'];
  const COLS = 3, ROW = 86, TOP = 22;
  let mem = {blk: 'learn', f: 'alle', q: ''};
  const short = (t) => t.replace('Wirtschafts- und Sozialkunde', 'WiSo');
  const info = (p) => {
    const m = AP2.game.mastery(p.id);
    return {m, due: AP2.game.due(AP2.bank.byPage(p.id)).length, done: !!AP2.state.get('done')[p.id]};
  };
  const keep = (p, f) => {
    if (f === 'offen') return !AP2.state.get('done')[p.id];
    if (f === 'schwach') { const m = AP2.game.mastery(p.id); return m.total > 0 && m.stars <= 2; }
    if (f === 'faellig') return AP2.game.due(AP2.bank.byPage(p.id)).length > 0;
    return true;
  };
  const hasSpick = (bid) => (AP2.spickSheets ? AP2.spickSheets().some((s) => s.id === bid) : false) || LEARN.includes(bid);
  // Kennzahlen einer Region: Anteil gelesen und Durchschnitt der Sterne (nur Themen mit Fragen).
  const stats = (bid) => {
    const pages = AP2.store.byBlock(bid);
    let done = 0, sum = 0, n = 0, due = 0;
    pages.forEach((p) => { const x = info(p); if (x.done) done++; if (x.m.total) { sum += x.m.stars; n++; } due += x.due; });
    return {count: pages.length, pct: pages.length ? Math.round(done / pages.length * 100) : 0, avg: n ? sum / n : 0, due};
  };
  const chipRow = (list, cur, fn) => h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2]}}, list.map(([id, text]) => {
    const el = h('span', {text, style: {padding: '6px 12px', borderRadius: S.r.pill, fontSize: S.f.sm, fontWeight: S.fw.med, border: '1px solid'}});
    return AP2.press(el, {fn: () => fn(id), label: text, base: (c) => (cur() === id ? {backgroundColor: c.accent, color: c.onAccent, borderColor: c.accent}
      : {backgroundColor: c.surface, color: c.text2, borderColor: c.border}), hover: (c) => ({borderColor: c.accent})});
  }));
  // Kompassrose für die Titelkartusche.
  const compass = () => {
    const pts = (r1, r2) => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = i * Math.PI / 4 - Math.PI / 2, r = i % 2 ? r2 : r1; return (32 + r * Math.cos(a)).toFixed(1) + ',' + (32 + r * Math.sin(a)).toFixed(1); }).join(' ');
    const ring = AP2.svg('circle', {cx: 32, cy: 32, r: 27, fill: 'none', 'stroke-width': 1.5, 'stroke-dasharray': '2 3'});
    const star = AP2.svg('polygon', {points: pts(28, 7)});
    const n = AP2.svg('text', {x: 32, y: 10, 'text-anchor': 'middle', 'font-size': 9, 'font-weight': 700}, ['N']);
    const el = AP2.svg('svg', {viewBox: '0 0 64 64', width: 64, height: 64, 'aria-hidden': 'true'}, [ring, star, AP2.svg('circle', {cx: 32, cy: 32, r: 3}), n]);
    return AP2.theme.bind(el, (e, c) => {
      ring.setAttribute('stroke', c.text3); star.setAttribute('fill', c.accentSoft); star.setAttribute('stroke', c.accent);
      e.children[2].setAttribute('fill', c.accent); n.setAttribute('fill', c.text2);
    });
  };
  // Ortsmarke: Füllung nach Beherrschung, grüner Ring wenn gelesen, Feuerpunkt wenn Wiederholung fällig.
  const dot = (x, size) => {
    const d = h('span', {style: {position: 'relative', display: 'inline-block', width: size + 'px', height: size + 'px', borderRadius: '50%', border: '2px solid', boxSizing: 'border-box', flex: 'none'}});
    const badge = h('span', {style: {position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', borderRadius: '50%', display: x.due ? 'block' : 'none'}});
    d.appendChild(badge);
    return AP2.theme.bind(d, (n, c) => {
      const col = x.m.total ? gk().starColor(x.m.stars, c) : x.done ? c.accentSoft : c.surface;
      st(n, {backgroundColor: col, borderColor: x.done ? c.ok : c.line, boxShadow: '0 0 0 3px ' + c.surface});
      st(badge, {backgroundColor: c.fire, boxShadow: '0 0 0 2px ' + c.surface});
    });
  };
  const legend = () => {
    const item = (mark, text) => AP2.tint(h('span', {style: {display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: S.f.xs}}, [mark, text]), 'text2');
    const fake = (stars, total, done, due) => dot({m: {stars, total}, done, due}, 14);
    const scale = h('span', {style: {display: 'inline-flex', gap: '3px'}}, [0, 1, 2, 3, 4, 5].map((s) => fake(s, 1, false, 0)));
    return h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2] + ' ' + S.sp[4], alignItems: 'center'}}, [
      item(scale, '0 bis 5 Sterne'), item(fake(0, 0, false, 0), 'ohne Fragen'), item(fake(0, 0, true, 0), 'gelesen (grüner Ring)'),
      item(fake(0, 0, false, 1), 'Wiederholung fällig'), item(h('span', {text: '· · ·', style: {letterSpacing: '1px', fontWeight: S.fw.bold}}), 'Lernreihenfolge')]);
  };
  AP2.views.themen = () => {
    AP2.ctx.id = 'themen';
    AP2.ctx.wide = true;
    const blocks = [['learn', 'Alle Prüfungsfächer']].concat(LEARN.map((id) => [id, short(AP2.store.block(id).t)]));
    const body = h('div');
    // Ein gemeinsamer Tooltip, fixiert am Ort unter dem Zeiger.
    const tip = h('div', {attrs: {role: 'tooltip'}, style: {position: 'fixed', zIndex: S.z.drop, display: 'none', pointerEvents: 'none', maxWidth: '260px',
      padding: '10px 12px', borderRadius: S.r.md, border: '1px solid', fontSize: S.f.xs, lineHeight: '1.45', boxShadow: S.shadow}});
    AP2.theme.bind(tip, (n, c) => st(n, {backgroundColor: c.surface, borderColor: c.border, color: c.text2}));
    const showTip = (el, p, x) => {
      AP2.dispose(tip);
      tip.appendChild(AP2.tint(h('div', {text: p.t, style: {fontSize: S.f.sm, fontWeight: S.fw.semi, marginBottom: '4px'}}), 'text'));
      if (p.g) tip.appendChild(h('div', {text: p.g}));
      if (x.m.total) tip.appendChild(h('div', {style: {margin: '4px 0'}}, [gk().stars(x.m.stars, 12)]));
      tip.appendChild(h('div', {text: (x.m.total ? x.m.seen + '/' + x.m.total + ' Fragen geübt' : 'ohne Fragen') + (x.done ? ' · gelesen' : ' · noch offen')}));
      if (x.due) tip.appendChild(AP2.tint(h('div', {text: x.due + ' Wiederholung' + (x.due > 1 ? 'en' : '') + ' fällig'}), 'fire'));
      tip.style.display = 'block';
      const r = el.getBoundingClientRect(), w = tip.offsetWidth;
      st(tip, {left: Math.max(8, Math.min(window.innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px', top: (r.bottom + 6) + 'px'});
      if (r.bottom + 6 + tip.offsetHeight > window.innerHeight - 8) tip.style.top = Math.max(8, r.top - tip.offsetHeight - 6) + 'px';
    };
    const hideTip = () => { tip.style.display = 'none'; };
    // Scroll-Listener am Fenster entfernt sich selbst, sobald die Ansicht verlassen wurde.
    const onScroll = () => { if (!tip.isConnected) window.removeEventListener('scroll', onScroll); else hideTip(); };
    window.addEventListener('scroll', onScroll, {passive: true});
    // Ort: Marke plus Beschriftung, absolut auf dem Pfad platziert.
    const place = (p, i) => {
      const x = info(p);
      const row = Math.floor(i / COLS), k = i % COLS, col = row % 2 ? COLS - 1 - k : k;
      const label = AP2.tint(h('span', {text: p.t, style: {fontSize: '12px', lineHeight: '1.3', textAlign: 'center', fontWeight: x.done ? S.fw.semi : S.fw.reg,
        display: '-webkit-box', webkitLineClamp: '2', webkitBoxOrient: 'vertical', overflow: 'hidden'}}), x.m.total || x.done ? 'text' : 'text2');
      const el = h('div', {style: {position: 'absolute', left: ((col + 0.5) / COLS * 100) + '%', top: (TOP + row * ROW - 13) + 'px', width: (100 / COLS - 2) + '%',
        transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', padding: '2px 2px 4px', borderRadius: S.r.sm, boxSizing: 'border-box'}},
        [dot(x, 22), label]);
      on(el, 'pointerenter', () => showTip(el, p, x)); on(el, 'focus', () => showTip(el, p, x));
      on(el, 'pointerleave', hideTip); on(el, 'blur', hideTip);
      return AP2.press(el, {fn: () => { hideTip(); AP2.router.go(p.id); }, label: p.t, base: () => ({backgroundColor: 'transparent'}), hover: (c) => ({backgroundColor: c.surface})});
    };
    // Insel: weich gefärbte Fläche mit gewundenem, gepunktetem Pfad durch alle Orte.
    const island = (bid, g, n) => {
      const rows = Math.ceil(g.pages.length / COLS), H = TOP + (rows - 1) * ROW + 52;
      const pts = g.pages.map((p, i) => { const row = Math.floor(i / COLS), k = i % COLS, col = row % 2 ? COLS - 1 - k : k; return [(col + 0.5) / COLS * 100, TOP + row * ROW]; });
      let d = pts.length ? 'M' + pts[0].join(' ') : '';
      for (let i = 1; i < pts.length; i++) {
        const [a, b] = [pts[i - 1], pts[i]];
        d += a[1] === b[1] ? ' L' + b.join(' ') : ' C' + (a[0] + (a[0] > 50 ? 14 : -14)) + ' ' + a[1] + ' ' + (b[0] + (b[0] > 50 ? 14 : -14)) + ' ' + b[1] + ' ' + b.join(' ');
      }
      const path = AP2.svg('path', {d, fill: 'none', 'stroke-width': 2, 'stroke-dasharray': '1 6', 'stroke-linecap': 'round', 'vector-effect': 'non-scaling-stroke'});
      const map = AP2.svg('svg', {viewBox: '0 0 100 ' + H, preserveAspectRatio: 'none', width: '100%', height: H, 'aria-hidden': 'true', style: 'position:absolute;left:0;top:0;overflow:visible'}, [path]);
      AP2.theme.bind(map, (e, c) => path.setAttribute('stroke', c.block[bid]));
      const field = h('div', {style: {position: 'relative', height: H + 'px'}}, [map].concat(g.pages.map(place)));
      const doneN = g.pages.filter((p) => AP2.state.get('done')[p.id]).length;
      const head = h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: S.sp[2], marginBottom: S.sp[2]}}, [
        AP2.tint(h('div', {text: g.name || 'Allgemein', style: {fontSize: S.f.sm, fontWeight: S.fw.bold, letterSpacing: '0.01em'}}), 'text'),
        AP2.tint(h('span', {text: doneN + '/' + g.pages.length, style: {fontSize: S.f.xs, fontWeight: S.fw.semi, flex: 'none'}}), 'text2')]);
      const radii = ['22px 34px 26px 38px', '34px 22px 38px 26px', '28px 40px 22px 32px'][n % 3];
      const el = h('div', {style: {padding: '14px 14px 6px', borderRadius: radii, border: '1.5px dashed', boxSizing: 'border-box', minWidth: 0}}, [head, field]);
      return AP2.theme.bind(el, (e, c) => st(e, {backgroundColor: c.blockSoft[bid], borderColor: AP2.theme.mix(c.blockSoft[bid], c.block[bid], 0.45)}));
    };
    const regionEl = {};
    const region = (bid, pages) => {
      const blk = AP2.store.block(bid), s = stats(bid);
      const groups = [];
      pages.forEach((p) => { let g = groups.find((x) => x.name === p.g); if (!g) { g = {name: p.g, pages: []}; groups.push(g); } g.pages.push(p); });
      const flag = AP2.theme.bind(h('span', {style: {display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', flex: 'none'}}, [AP2.icon(blk.icon, 20)]),
        (n, c) => st(n, {backgroundColor: c.block[bid], color: '#ffffff'}));
      const links = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2]}}, [
        hasSpick(bid) ? AP2.btn({text: 'Spickzettel', icon: AP2.icon('bookmark', 16), small: true, fn: () => AP2.router.go('spick/' + bid)}) : null,
        AP2.btn({text: 'Region trainieren', icon: AP2.icon('play', 16), kind: 'primary', small: true, fn: () => AP2.router.go('trainer/block/' + bid)})]);
      const head = h('div', {style: {display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: S.sp[3], marginBottom: S.sp[4]}}, [
        h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], minWidth: 0}}, [flag, h('div', {}, [
          AP2.tint(h('h2', {text: blk.t, style: {fontSize: S.f.xl, fontWeight: S.fw.bold, margin: 0, letterSpacing: '-0.01em'}}), 'text'),
          AP2.tint(h('div', {text: s.pct + ' % gelesen · Ø ' + s.avg.toFixed(1) + ' Sterne · ' + pages.length + ' von ' + s.count + ' Orten' + (s.due ? ' · ' + s.due + ' fällig' : ''), style: {fontSize: S.f.xs, marginTop: '2px'}}), 'text2')])]),
        links]);
      const grid = h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: S.sp[4], alignItems: 'start'}}, groups.map((g, n) => island(bid, g, n)));
      const el = h('section', {attrs: {id: 'region-' + bid}, style: {padding: S.sp[5], borderRadius: S.r.lg, border: '1px solid', borderTopWidth: '5px', marginTop: S.sp[5]}}, [head, grid]);
      regionEl[bid] = el;
      return AP2.theme.bind(el, (e, c) => st(e, {backgroundColor: c.surface, borderColor: c.border, borderTopColor: c.block[bid]}));
    };
    const jump = (bid) => {
      if (mem.blk !== 'learn' && mem.blk !== bid) { mem.blk = 'learn'; refresh(); }
      const el = regionEl[bid];
      if (el) window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - S.w.topbar - 12, behavior: 'smooth'});
    };
    // Übersichtskarte: eine Kachel je Region mit Fortschritt, Klick springt zur Region.
    const overview = () => h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: S.sp[3]}}, LEARN.map((bid) => {
      const blk = AP2.store.block(bid), s = stats(bid);
      const fill = h('div', {style: {height: '100%', width: s.pct + '%', borderRadius: S.r.pill}});
      const bar = h('div', {style: {height: '6px', borderRadius: S.r.pill, overflow: 'hidden', margin: '8px 0 6px'}}, [fill]);
      AP2.theme.bind(bar, (n, c) => { n.style.backgroundColor = c.surface; fill.style.backgroundColor = c.block[bid]; });
      const el = h('div', {style: {padding: '12px 14px', borderRadius: '18px 26px 20px 28px', border: '1.5px dashed'}}, [
        AP2.tint(h('div', {text: blk.short, style: {fontSize: S.f.sm, fontWeight: S.fw.bold}}), 'text'), bar,
        h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: S.sp[2]}}, [
          AP2.tint(h('span', {text: s.pct + ' % gelesen', style: {fontSize: S.f.xs, fontWeight: S.fw.semi}}), 'text2'),
          AP2.tint(h('span', {text: 'Ø ' + s.avg.toFixed(1) + ' ★', style: {fontSize: S.f.xs, fontWeight: S.fw.semi}}), s.avg >= 3 ? 'gold' : 'text2')])]);
      return AP2.press(el, {fn: () => jump(bid), label: 'Zur Region ' + blk.t, base: (c) => ({backgroundColor: c.blockSoft[bid], borderColor: AP2.theme.mix(c.blockSoft[bid], c.block[bid], 0.45)}),
        hover: (c) => ({borderColor: c.block[bid]})});
    }));
    const draw = () => {
      hideTip();
      AP2.dispose(body);
      Object.keys(regionEl).forEach((k) => delete regionEl[k]);
      const words = mem.q.toLowerCase().split(/\s+/).filter(Boolean);
      let shown = 0;
      (mem.blk === 'learn' ? LEARN : [mem.blk]).forEach((bid) => {
        const pages = AP2.store.byBlock(bid).filter((p) => keep(p, mem.f) && words.every((w) => (p.t + ' ' + (p.g || '')).toLowerCase().includes(w)));
        if (!pages.length) return;
        shown += pages.length;
        body.appendChild(region(bid, pages));
      });
      if (!shown) body.appendChild(AP2.blocks.note('Keine Themen für diese Auswahl.'));
    };
    const input = AP2.field(h('input', {attrs: {type: 'search', placeholder: 'Ort suchen, z. B. RAID, Kündigung, JOIN', 'aria-label': 'Themen filtern', value: mem.q}, style: {width: '100%'}}));
    on(input, 'input', () => { mem.q = input.value; draw(); });
    // Titelkartusche: Kompass, Titel, Erklärung und Legende.
    const cartouche = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[4], alignItems: 'center', padding: S.sp[4] + ' ' + S.sp[5], borderRadius: S.r.lg, border: '1px solid', marginBottom: S.sp[4]}}, [
      compass(), h('div', {style: {flex: '1 1 320px', minWidth: 0}}, [
        AP2.tint(h('h1', {text: 'Themenkarte', style: {fontSize: S.f.h1, fontWeight: S.fw.bold, letterSpacing: '-0.02em', margin: '0 0 ' + S.sp[1]}}), 'text'),
        AP2.tint(h('p', {text: 'Jeder Prüfungsbereich ist eine Region, jede Gruppe eine Insel, jedes Thema ein Ort. Der gepunktete Pfad zeigt die Lernreihenfolge; die Farbe der Orte zeigt, wie sicher du die Fragen beherrschst. Ziel: jeden Ort auf mindestens drei Sterne bringen.', style: {fontSize: S.f.sm, lineHeight: S.lh.body, margin: '0 0 ' + S.sp[3]}}), 'text2'),
        legend()])]);
    AP2.theme.bind(cartouche, (e, c) => st(e, {backgroundColor: c.surface, borderColor: c.border, backgroundImage: 'radial-gradient(' + c.border + ' 1px, transparent 1px)', backgroundSize: '14px 14px'}));
    const blkRow = chipRow(blocks, () => mem.blk, (id) => { mem.blk = id; refresh(); });
    const fRow = chipRow(FILTERS, () => mem.f, (id) => { mem.f = id; refresh(); });
    const refresh = () => { [].forEach.call(blkRow.children, (c) => c.repaint()); [].forEach.call(fRow.children, (c) => c.repaint()); draw(); };
    draw();
    const gap = (px) => h('div', {style: {height: px}});
    return h('div', {}, [cartouche, overview(), gap(S.sp[4]), input, gap(S.sp[3]), blkRow, gap(S.sp[2]), fRow, body, tip]);
  };
  AP2.viewTitles.themen = 'Themenkarte';
})();
