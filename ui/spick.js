// Prüfungs-Spickzettel: je Prüfungsbereich eine einzige, breite Seite mit allem Prüfungswissen auf einen Blick.
// Daten: content/spick/<id>.js ruft AP2.spick(id, {...}) auf. Route: #/spick (Übersicht) und #/spick/<id>.
//
// Aufbau eines Spickzettels:
//   AP2.spick('ps', {
//     exam: 'Prüfung: Planen eines Softwareproduktes', t: 'Titel', s: 'Untertitel',
//     meta: [['90 Min', 'Dauer'], ['100', 'Punkte']],      // Kennzahlen-Kacheln im Kopf
//     top: [Blöcke],                                       // optional: Kompaktwissen über allen Abschnitten (volle Breite)
//     sections: [{t: 'Projektmanagement', icon: 'clipboard', ids: ['ps-phasen', ...], wide: false, items: [Blöcke]}],
//   });
// Blöcke in items: alle normalen Seitenblöcke (diagram, table, code, chart, venn, seq, gear, signs, ...) und diese Kompaktblöcke:
//   ['li', [Zeilen]]                 Stichpunkte; eine Zeile als [Text, [Unterpunkte]] ergibt eingerückte Unterpunkte
//   ['pairs', [[Begriff, Erklärung]]] Begriff links, Erklärung rechts
//   ['f', 'Formel', 'Erläuterung']    Formel hervorgehoben (Monospace)
//   ['tbl', [Kopf], [[Zeile]]]        kompakte Tabelle
//   ['cards', [[Titel, [Zeilen]]]]    kleine farbige Karten nebeneinander
//   ['flow', ['A', 'B', 'C']]         Kette aus Etiketten mit Pfeilen (Ablauf, Phasen, Schichten)
//   ['mnemo', 'Text']                 Eselsbrücke (Gold)
//   ['tip', 'Text'] / ['warn', 'Text'] Prüfungstipp / Prüfungsfalle (kompakt)
//   ['txt', 'Text']                   kurzer Absatz
//   ['sub', 'Titel']                  Zwischenüberschrift im Abschnitt
//   ['links', [Seiten-IDs]]           Chips zu Themenseiten
//   ['ext', [[Text, URL]]]            externe Links (öffnen in neuem Tab)
(function () {
  const {h, on, rich} = AP2;
  const S = AP2.S;
  const sheets = {};
  const order = [];
  AP2.spick = (id, cfg) => { if (!sheets[id]) order.push(id); sheets[id] = Object.assign({id}, cfg); };
  AP2.spickSheets = () => order.map((id) => sheets[id]);
  // Prüfungen der AP2 und welche Spickzettel dazugehören.
  const EXAMS = [
    {t: 'Planen eines Softwareproduktes', time: '90 Min', pts: '100 Punkte', ids: ['ps', 'infra'], d: 'Projektmanagement, Anforderungen, UML, Datenmodell, Qualität, Recht sowie Infrastruktur und IT-Sicherheit'},
    {t: 'Entwicklung und Umsetzung von Algorithmen', time: '90 Min', pts: '100 Punkte', ids: ['eua'], d: 'Pseudocode, Struktogramm, OOP, Datenstrukturen, Sortieren und Suchen, SQL, Testen'},
    {t: 'Wirtschafts- und Sozialkunde', time: '60 Min', pts: '100 Punkte', ids: ['wiso'], d: 'Ausbildung, Arbeitsrecht, Mitbestimmung, Sozialversicherung, Wirtschaft, Unternehmen'},
  ];
  AP2.spickExams = EXAMS;

  // ---------- Kompaktblöcke ----------
  const txt = (str, size, tone) => AP2.tint(h('div', {style: {fontSize: size || S.f.sm, lineHeight: '1.55', overflowWrap: 'break-word'}}, rich(str)), tone || 'text');
  const dotLine = (str, sub) => {
    const dot = h('span', {style: {width: sub ? '4px' : '5px', height: sub ? '4px' : '5px', borderRadius: '50%', marginTop: '8px', flexShrink: 0}});
    AP2.theme.bind(dot, (n, c) => { n.style.backgroundColor = sub ? c.text3 : c.accent; });
    return h('div', {style: {display: 'flex', gap: '7px', padding: '1px 0', marginLeft: sub ? '14px' : '0'}}, [dot, txt(str, sub ? S.f.xs : S.f.sm, sub ? 'text2' : 'text')]);
  };
  const C = {};
  C.li = (items) => h('div', {style: {margin: '0 0 10px'}}, [].concat(...items.map((it) => (Array.isArray(it) ? [dotLine(it[0])].concat(it[1].map((x) => dotLine(x, true))) : [dotLine(it)]))));
  C.txt = (str) => h('div', {style: {margin: '0 0 10px'}}, [txt(str)]);
  C.sub = (str) => AP2.tint(h('div', {text: str, style: {fontSize: S.f.xs, fontWeight: S.fw.bold, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '14px 0 6px'}}), 'text2');
  C.pairs = (rows) => {
    const box = h('div', {style: {display: 'grid', gridTemplateColumns: 'minmax(90px, max-content) 1fr', border: '1px solid', borderRadius: S.r.sm, overflow: 'hidden', margin: '0 0 10px'}});
    AP2.theme.bind(box, (n, c) => { n.style.borderColor = c.border; });
    rows.forEach(([k, v], i) => {
      const key = h('div', {style: {padding: '5px 9px', fontSize: S.f.xs, fontWeight: S.fw.bold, lineHeight: '1.5', borderTop: i ? '1px solid' : 'none'}}, rich(String(k).replace(/\*\*/g, '')));
      AP2.theme.bind(key, (n, c) => { const j = i % c.cat.length; n.style.backgroundColor = c.catSoft[j]; n.style.color = c.cat[j]; n.style.borderColor = c.border; });
      const val = h('div', {style: {padding: '5px 9px', fontSize: S.f.xs, lineHeight: '1.5', borderTop: i ? '1px solid' : 'none', overflowWrap: 'break-word', minWidth: 0}}, rich(v));
      AP2.theme.bind(val, (n, c) => { n.style.color = c.text; n.style.borderColor = c.border; });
      box.appendChild(key); box.appendChild(val);
    });
    return box;
  };
  C.f = (formula, note) => {
    const f = h('div', {style: {fontFamily: S.font.mono, fontSize: S.f.sm, fontWeight: S.fw.semi, lineHeight: '1.5', overflowWrap: 'anywhere'}}, rich(formula));
    const box = h('div', {style: {padding: '7px 11px', borderRadius: S.r.sm, borderLeft: '3px solid', margin: '0 0 8px'}}, [f, note ? txt(note, S.f.xs, 'text2') : null]);
    return AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = c.accentSoft; n.style.borderLeftColor = c.accent; n.style.color = c.text; });
  };
  C.tbl = (head, rows) => {
    const cell = (tag, s, first, last) => {
      const el = h(tag, {style: {padding: '4px 8px', textAlign: 'left', verticalAlign: 'top', fontWeight: tag === 'th' || first ? S.fw.semi : S.fw.reg}}, rich(String(s)));
      return AP2.theme.bind(el, (n, c) => {
        if (tag === 'th') { n.style.backgroundColor = c.accentSoft; n.style.color = c.accent; n.style.borderBottom = '2px solid ' + c.accent; } else { n.style.color = c.text; n.style.borderBottom = last ? 'none' : '1px solid ' + c.border; }
      });
    };
    const table = h('table', {style: {width: '100%', borderCollapse: 'collapse', fontSize: S.f.xs, lineHeight: '1.45'}}, [
      h('thead', {}, [h('tr', {}, head.map((x) => cell('th', x)))]),
      h('tbody', {}, rows.map((r, ri) => h('tr', {}, r.map((x, ci) => cell('td', x, ci === 0, ri === rows.length - 1)))))]);
    const wrap = h('div', {style: {overflowX: 'auto', border: '1px solid', borderRadius: S.r.sm, margin: '0 0 10px'}}, [table]);
    return AP2.theme.bind(wrap, (n, c) => { n.style.borderColor = c.border; n.style.backgroundColor = c.surface; });
  };
  C.cards = (list) => h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '6px', margin: '0 0 10px'}}, list.map(([title, lines], i) => {
    const head = h('div', {style: {fontSize: S.f.xs, fontWeight: S.fw.bold, marginBottom: '3px'}}, rich(String(title).replace(/\*\*/g, '')));
    AP2.theme.bind(head, (n, c) => { n.style.color = c.cat[i % c.cat.length]; });
    const box = h('div', {style: {padding: '7px 9px', borderRadius: S.r.sm, borderTop: '3px solid'}}, [head].concat([].concat(lines).map((l) => txt(l, S.f.xs))));
    return AP2.theme.bind(box, (n, c) => { const j = i % c.cat.length; n.style.backgroundColor = c.catSoft[j]; n.style.borderTopColor = c.cat[j]; });
  }));
  C.flow = (items) => h('div', {style: {display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px', margin: '0 0 10px'}}, [].concat(...items.map((it, i) => {
    const tag = h('span', {style: {padding: '3px 9px', borderRadius: S.r.pill, fontSize: S.f.xs, fontWeight: S.fw.semi, lineHeight: '1.45'}}, rich(String(it).replace(/\*\*/g, '')));
    AP2.theme.bind(tag, (n, c) => { const j = i % c.cat.length; n.style.backgroundColor = c.catSoft[j]; n.style.color = c.cat[j]; });
    const arrow = i < items.length - 1 ? AP2.tint(h('span', {text: '→', style: {fontSize: S.f.xs}}), 'text3') : null;
    return [tag, arrow];
  })));
  const callout = (label, icon, tone, soft) => (str) => {
    const head = h('span', {style: {display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: S.fw.bold, textTransform: 'uppercase', letterSpacing: '0.07em', marginRight: '6px', verticalAlign: '1px'}}, [AP2.icon(icon, 11), label]);
    AP2.theme.bind(head, (n, c) => { n.style.color = c[tone]; });
    const box = h('div', {style: {padding: '6px 10px', borderRadius: S.r.sm, borderLeft: '3px solid', fontSize: S.f.xs, lineHeight: '1.55', margin: '0 0 8px'}}, [head, rich(str)]);
    return AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = c[soft]; n.style.borderLeftColor = c[tone]; n.style.color = c.text; });
  };
  C.tip = callout('Tipp', 'check', 'ok', 'okSoft');
  C.warn = callout('Falle', 'alert', 'bad', 'badSoft');
  C.mnemo = callout('Merke', 'bulb', 'gold', 'goldSoft');
  C.links = (ids) => h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '0 0 8px'}}, ids.map(topicChip));
  C.ext = (list) => h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '0 0 8px'}}, list.map(([text, url]) => {
    const a = h('a', {text: text + ' ↗', attrs: {href: url, target: '_blank', rel: 'noopener'}, style: {fontSize: S.f.xs, padding: '2px 9px', borderRadius: S.r.pill, border: '1px solid', textDecoration: 'none'}});
    return AP2.theme.bind(a, (n, c) => { n.style.color = c.accent; n.style.borderColor = c.border; });
  }));
  // Seitenblöcke kompakter darstellen: Außenabstand verkleinern.
  const render = (block) => {
    const fn = C[block[0]];
    if (fn) return fn.apply(null, block.slice(1));
    if (block[0] === 'row') return h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: '10px'}}, block[1].map((b) => h('div', {style: {flex: '1 1 220px', minWidth: 0}}, [render(b)])));
    const wrap = h('div', {style: {margin: '0 0 10px'}}, [AP2.renderBlocks([block])]);
    const first = wrap.firstChild;
    if (first && first.style) first.style.marginBottom = '0';
    return wrap;
  };
  AP2.spickBlocks = C;

  // Themen-Chip mit Beherrschungspunkt; führt zur ausführlichen Seite.
  function topicChip(id) {
    const p = AP2.store.get(id);
    if (!p) { console.warn('Spickzettel: Seite fehlt ' + id); return h('span'); }
    const m = AP2.game.mastery(id);
    const dot = h('span', {style: {width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0}});
    AP2.theme.bind(dot, (n, c) => { n.style.backgroundColor = m.seen ? AP2.gk.starColor(m.stars, c) : AP2.state.get('done')[id] ? c.ok : c.border; });
    const short = p.t.length > 38 ? p.t.slice(0, 36).replace(/[\s,(]+\S*$/, '') + ' …' : p.t;
    const el = h('span', {attrs: {title: p.t}, style: {display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '2px 8px', borderRadius: S.r.pill, border: '1px solid', fontSize: '11px', fontWeight: S.fw.med, lineHeight: '1.5'}}, [dot, short]);
    return AP2.press(el, {fn: () => AP2.router.go(id), label: 'Thema öffnen: ' + p.t, role: 'link', base: (c) => ({backgroundColor: c.surface, color: c.text2, borderColor: c.border}), hover: (c) => ({borderColor: c.accent, color: c.accent})});
  }

  // ---------- Abschnitt ----------
  const section = (sec, idx) => {
    const num = h('span', {text: String(idx + 1), style: {width: '24px', height: '24px', borderRadius: '7px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: S.f.xs, fontWeight: S.fw.bold, flexShrink: 0}});
    AP2.theme.bind(num, (n, c) => { const j = idx % c.cat.length; n.style.backgroundColor = c.cat[j]; n.style.color = c.surface; });
    const ic = sec.icon ? AP2.tint(h('span', {style: {display: 'flex', marginLeft: 'auto'}}, [AP2.icon(sec.icon, 16)]), 'text3') : null;
    const title = AP2.tint(h('h2', {text: sec.t, style: {margin: 0, fontSize: S.f.md, fontWeight: S.fw.bold, lineHeight: S.lh.tight}}), 'text');
    const head = h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[2], marginBottom: S.sp[2]}}, [num, title, ic]);
    const chips = sec.ids && sec.ids.length ? h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '0 0 10px'}}, sec.ids.map(topicChip)) : null;
    const body = h('div', {}, (sec.items || []).map(render));
    const card = h('section', {attrs: {id: 'spick-' + idx}, style: {breakInside: 'avoid', pageBreakInside: 'avoid', display: 'inline-block', width: '100%', boxSizing: 'border-box',
      padding: '14px 16px 6px', borderRadius: S.r.md, border: '1px solid', borderTop: '4px solid', margin: '0 0 14px', columnSpan: sec.wide ? 'all' : 'none'}}, [head, chips, body]);
    AP2.theme.bind(card, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; n.style.borderTopColor = c.cat[idx % c.cat.length]; });
    card.spickText = (sec.t + ' ' + card.textContent).toLowerCase();
    return card;
  };

  // Druckansicht: nur der Spickzettel, Navigation ausgeblendet.
  const printCss = () => {
    if (document.getElementById('spick-print')) return;
    const st = document.createElement('style');
    st.id = 'spick-print';
    st.textContent = '@media print{nav,header,.spick-noprint{display:none!important}main{margin:0!important;padding:0!important;width:auto!important}main>div{width:auto!important;padding:0!important}' +
      '.spick-cols{column-width:300px!important}section{box-shadow:none!important}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
    document.head.appendChild(st);
  };

  const metaTile = ([val, label]) => {
    const el = h('div', {style: {padding: '8px 14px', borderRadius: S.r.md, border: '1px solid', minWidth: '90px'}}, [
      AP2.tint(h('div', {text: val, style: {fontSize: S.f.lg, fontWeight: S.fw.bold, lineHeight: S.lh.tight}}), 'accent'),
      AP2.tint(h('div', {text: label, style: {fontSize: '11px', marginTop: '2px'}}), 'text2')]);
    return AP2.theme.bind(el, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
  };

  // Themen des Blocks, die kein Abschnitt verlinkt, erscheinen im Register unten trotzdem.
  const index = (sheet) => {
    const blk = sheet.block || sheet.id;
    const pages = AP2.store.byBlock(blk);
    if (!pages.length) return null;
    const linked = new Set([].concat(...sheet.sections.map((s) => s.ids || [])));
    const groups = [];
    pages.forEach((p) => { let g = groups.find((x) => x.name === p.g); if (!g) { g = {name: p.g, pages: []}; groups.push(g); } g.pages.push(p); });
    const miss = pages.filter((p) => !linked.has(p.id));
    if (miss.length) console.info('Spickzettel ' + sheet.id + ': nicht verlinkt: ' + miss.map((p) => p.id).join(', '));
    const box = h('div', {style: {padding: '16px 18px', borderRadius: S.r.md, border: '1px dashed', marginTop: S.sp[4]}}, [
      AP2.gk.kicker('Register: alle ' + pages.length + ' Themenseiten dieses Bereichs', 'text3'),
      h('div', {style: {columnWidth: '260px', columnGap: S.sp[5], marginTop: S.sp[3]}}, groups.map((g) => h('div', {style: {breakInside: 'avoid', marginBottom: S.sp[3]}}, [
        AP2.tint(h('div', {text: g.name || 'Allgemein', style: {fontSize: S.f.xs, fontWeight: S.fw.bold, marginBottom: '4px'}}), 'text2'),
        h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: '4px'}}, g.pages.map((p) => topicChip(p.id)))])))]);
    return AP2.theme.bind(box, (n, c) => { n.style.borderColor = c.border; });
  };

  const sheetView = (sheet) => {
    AP2.ctx.wide = true;
    printCss();
    const others = EXAMS.find((e) => e.ids.includes(sheet.id));
    const kick = AP2.gk.kicker(sheet.exam || 'Spickzettel', 'accent');
    const title = AP2.tint(h('h1', {text: sheet.t, style: {fontSize: S.f.h1, fontWeight: S.fw.bold, letterSpacing: '-0.02em', lineHeight: S.lh.tight, margin: S.sp[2] + ' 0 ' + S.sp[2]}}), 'text');
    const sub = sheet.s ? AP2.tint(h('p', {text: sheet.s, style: {fontSize: S.f.md, lineHeight: S.lh.body, margin: '0 0 ' + S.sp[4]}}), 'text2') : null;
    const meta = sheet.meta ? h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2], marginBottom: S.sp[4]}}, sheet.meta.map(metaTile)) : null;
    const blk = sheet.block || sheet.id;
    const actions = h('div', {attrs: {class: 'spick-noprint'}, style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2], marginBottom: S.sp[4]}}, [
      AP2.btn({text: 'Bereich trainieren', icon: AP2.icon('play', 16), kind: 'primary', small: true, fn: () => AP2.router.go('trainer/block/' + blk)}),
      AP2.btn({text: 'Drucken / PDF', icon: AP2.icon('copy', 16), small: true, fn: () => window.print()}),
      AP2.btn({text: 'Themenkarte', icon: AP2.icon('map', 16), small: true, fn: () => AP2.router.go('themen')}),
      AP2.btn({text: 'Alle Spickzettel', icon: AP2.icon('cards', 16), small: true, fn: () => AP2.router.go('spick')}),
    ].concat(others ? others.ids.filter((x) => x !== sheet.id && sheets[x]).map((x) => AP2.btn({text: sheets[x].t, icon: AP2.icon('arrow', 16), small: true, fn: () => AP2.router.go('spick/' + x)})) : []));
    const cards = sheet.sections.map(section);
    const cols = h('div', {attrs: {class: 'spick-cols'}, style: {columnWidth: '340px', columnGap: '14px'}}, cards);
    // Sprungleiste und Filter bleiben beim Scrollen oben.
    const input = AP2.field(h('input', {attrs: {type: 'search', placeholder: 'Im Spickzettel filtern, z. B. RAID, Kündigung, JOIN', 'aria-label': 'Spickzettel filtern'}, style: {flex: '1 1 240px', minWidth: 0}}));
    const empty = AP2.blocks.note('Kein Abschnitt passt zum Filter.');
    empty.style.display = 'none';
    on(input, 'input', () => {
      const words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
      let n = 0;
      cards.forEach((card) => { const ok = words.every((w) => card.spickText.includes(w)); card.style.display = ok ? 'inline-block' : 'none'; if (ok) n++; });
      empty.style.display = n ? 'none' : 'block';
    });
    const jump = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: '4px', flex: '100 1 400px'}}, sheet.sections.map((sec, i) => {
      const el = h('span', {text: sec.t, style: {padding: '3px 9px', borderRadius: S.r.pill, fontSize: '11px', fontWeight: S.fw.semi, border: '1px solid', whiteSpace: 'nowrap'}});
      return AP2.press(el, {fn: () => { input.value = ''; input.dispatchEvent(new Event('input')); const t = document.getElementById('spick-' + i); if (t) window.scrollTo({top: t.getBoundingClientRect().top + window.scrollY - S.w.topbar - 70, behavior: 'smooth'}); },
        label: 'Zu Abschnitt ' + sec.t, base: (c) => { const j = i % c.cat.length; return {backgroundColor: c.catSoft[j], color: c.cat[j], borderColor: 'transparent'}; }, hover: (c) => ({borderColor: c.cat[i % c.cat.length]})});
    }));
    const bar = h('div', {attrs: {class: 'spick-noprint'}, style: {position: 'sticky', top: S.w.topbar + 'px', zIndex: 5, display: 'flex', flexWrap: 'wrap', gap: S.sp[2], alignItems: 'center', padding: '8px 0', marginBottom: S.sp[3], borderBottom: '1px solid'}}, [input, jump]);
    AP2.theme.bind(bar, (n, c) => { n.style.backgroundColor = c.bg; n.style.borderBottomColor = c.border; });
    const top = sheet.top ? h('div', {style: {marginBottom: S.sp[3]}}, sheet.top.map(render)) : null;
    return h('div', {}, [kick, title, sub, meta, actions, bar, top, empty, cols, index(sheet)]);
  };

  // ---------- Übersicht ----------
  const overview = () => {
    const title = AP2.tint(h('h1', {text: 'Spickzettel', style: {fontSize: S.f.h1, fontWeight: S.fw.bold, letterSpacing: '-0.02em', margin: '0 0 ' + S.sp[2]}}), 'text');
    const sub = AP2.tint(h('p', {text: 'Je Prüfung eine einzige Seite mit allem, was drankommen kann: Definitionen, Formeln, Diagramme, Tabellen, Fallen. Ideal für die letzte Wiederholung und zum Ausdrucken. Jeder Abschnitt verlinkt die ausführlichen Themenseiten.',
      style: {fontSize: S.f.md, lineHeight: S.lh.body, margin: '0 0 ' + S.sp[5]}}), 'text2');
    const examCard = (ex, k) => {
      const list = ex.ids.filter((id) => sheets[id]).map((id) => {
        const sh = sheets[id];
        const tone = AP2.theme.BLOCK[id] ? id : 'ps';
        const pages = AP2.store.byBlock(sh.block || id);
        const done = pages.filter((p) => AP2.state.get('done')[p.id]).length;
        const el = h('div', {style: {padding: '14px 16px', borderRadius: S.r.md, border: '1px solid', borderLeft: '5px solid', display: 'flex', alignItems: 'center', gap: S.sp[3]}}, [
          h('div', {style: {flex: '1 1 0', minWidth: 0}}, [AP2.tint(h('div', {text: sh.t, style: {fontWeight: S.fw.bold, fontSize: S.f.md}}), 'text'),
            AP2.tint(h('div', {text: sh.sections.length + ' Abschnitte  ·  ' + pages.length + ' Themen  ·  ' + done + ' erledigt', style: {fontSize: S.f.xs, marginTop: '2px'}}), 'text2')]),
          AP2.tint(h('span', {style: {display: 'flex'}}, [AP2.icon('arrow', 18)]), 'text3')]);
        return AP2.press(el, {fn: () => AP2.router.go('spick/' + id), label: sh.t, base: (c) => ({backgroundColor: c.surface2, borderColor: c.border, borderLeftColor: c.block[tone]}), hover: (c) => ({borderColor: c.block[tone], borderLeftColor: c.block[tone]})});
      });
      const head = h('div', {style: {display: 'flex', justifyContent: 'space-between', gap: S.sp[2], flexWrap: 'wrap', alignItems: 'baseline'}}, [
        AP2.gk.kicker('Prüfung ' + (k + 1), 'accent'), AP2.tint(h('span', {text: ex.time + '  ·  ' + ex.pts, style: {fontSize: S.f.xs, fontWeight: S.fw.semi}}), 'text3')]);
      return AP2.gk.panel([head, AP2.tint(h('div', {text: ex.t, style: {fontSize: S.f.xl, fontWeight: S.fw.bold, margin: '6px 0 4px'}}), 'text'),
        AP2.tint(h('div', {text: ex.d, style: {fontSize: S.f.sm, lineHeight: '1.5', marginBottom: S.sp[3]}}), 'text2'), h('div', {style: {display: 'flex', flexDirection: 'column', gap: S.sp[2]}}, list)], {flex: '1 1 300px'});
    };
    return h('div', {}, [title, sub, h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3], alignItems: 'stretch'}}, EXAMS.map(examCard))]);
  };

  AP2.views.spick = (arg) => {
    AP2.ctx.id = 'spick';
    const sheet = sheets[arg];
    if (sheet) { AP2.theme.setTone(AP2.theme.BLOCK[sheet.block || sheet.id] ? (sheet.block || sheet.id) : 'ref'); return sheetView(sheet); }
    AP2.theme.setTone('ref');
    return overview();
  };
  AP2.viewTitles.spick = 'Spickzettel';
})();
