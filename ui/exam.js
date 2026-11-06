// Block "exam": komplette Probeprüfung mit Deckblatt, Handlungsschritten, Aufgaben, Zeitlimit und Auswertung nach Themen.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const sumPts = (list) => list.reduce((a, t) => a + t.pts, 0);
  const card = (kids, accent) => {
    const el = h('div', {style: {padding: '18px 20px', borderRadius: S.r.md, border: '1px solid', borderLeftWidth: accent ? '5px' : '1px', margin: '0 0 ' + S.sp[5]}}, kids);
    return AP2.theme.bind(el, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; if (accent) n.style.borderLeftColor = c.accent; });
  };
  const label = (txt) => AP2.tint(h('div', {text: txt, style: {fontSize: S.f.xs, fontWeight: S.fw.bold, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: S.sp[2]}}), 'accent');
  const meter = (pct) => {
    const fill = AP2.theme.bind(h('div', {style: {height: '100%', width: Math.round(pct) + '%', borderRadius: S.r.pill}}),
      (n, c) => { n.style.backgroundColor = pct >= 67 ? c.ok : pct >= 50 ? c.gold : c.bad; });
    return AP2.fill(h('div', {style: {height: '6px', borderRadius: S.r.pill, overflow: 'hidden', flex: '1 1 120px'}}, [fill]), 'border');
  };
  // Auswertung: Punkte je Handlungsschritt und Themen mit Punktverlust (aus task.see) zum gezielten Nachlernen.
  const summary = (cfg, store) => {
    const body = h('div');
    const el = card([label('Auswertung'), body], true);
    const update = () => {
      AP2.dispose(body);
      let graded = 0;
      let count = 0;
      const weak = {};
      cfg.parts.forEach((part, pi) => {
        let got = 0;
        part.tasks.forEach((t, ti) => {
          count++;
          const p = store.pts(pi + '.' + ti);
          if (p === undefined) return;
          graded++;
          got += p;
          if (p < t.pts) (t.see || []).forEach((id) => { weak[id] = (weak[id] || 0) + (t.pts - p); });
        });
        const max = sumPts(part.tasks);
        const name = AP2.tint(h('div', {text: part.t.replace(/\s*\(\d+ Punkte\)\s*$/, ''), style: {fontSize: S.f.sm, flex: '2 1 240px'}}), 'text');
        const val = AP2.tint(h('div', {text: got + ' / ' + max, style: {fontSize: S.f.sm, fontFamily: S.font.mono, minWidth: '64px', textAlign: 'right'}}), 'text2');
        body.appendChild(h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], flexWrap: 'wrap', padding: '6px 0'}}, [name, meter(max ? (got / max) * 100 : 0), val]));
      });
      const info = AP2.tint(h('div', {text: graded + ' von ' + count + ' Aufgaben bewertet.', style: {fontSize: S.f.sm, margin: S.sp[3] + ' 0'}}), 'text2');
      body.appendChild(info);
      const ids = Object.keys(weak).sort((a, b) => weak[b] - weak[a]);
      if (ids.length) body.appendChild(AP2.blocks.see(ids, 'Nachlernen (sortiert nach verlorenen Punkten)'));
      else if (graded) body.appendChild(AP2.tint(h('div', {text: 'Bisher keine Punktverluste mit Themenzuordnung.', style: {fontSize: S.f.sm}}), 'ok'));
    };
    return {el, update};
  };
  // Prüfungsnavigator: Teile derselben Probeprüfung, Übersicht und Sprungmarken zu den Handlungsschritten.
  const PARTS = [['ps', 'Softwareprodukt'], ['eua', 'Algorithmen'], ['wiso', 'WiSo'], ['dgk', 'Deutsch + GK']];
  const chip = (text, on, fn, label) => {
    const el = h('span', {text, style: {display: 'inline-flex', alignItems: 'center', padding: '5px 12px', borderRadius: S.r.pill, border: '1px solid', fontSize: S.f.sm, fontWeight: S.fw.semi}});
    if (on) return AP2.theme.bind(el, (n, c) => { n.style.backgroundColor = c.accent; n.style.color = c.onAccent; n.style.borderColor = c.accent; });
    return AP2.press(el, {fn, label, base: (c) => ({backgroundColor: c.surface, color: c.accent, borderColor: c.border}), hover: (c) => ({borderColor: c.accent, backgroundColor: c.hover})});
  };
  const navigator = (cfg, jumps) => {
    const m = /^exam(\d+)-(\w+)$/.exec(cfg.id);
    const rows = [];
    if (m) {
      const sibs = PARTS.filter((p) => AP2.store.get('exam' + m[1] + '-' + p[0]));
      rows.push(h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2], alignItems: 'center'}},
        [label('Probeprüfung ' + m[1])].concat(sibs.map((p) => chip(p[1], p[0] === m[2], () => AP2.router.go('exam' + m[1] + '-' + p[0]), 'Teil öffnen: ' + p[1])),
          [chip('Alle Prüfungen', false, () => AP2.router.go('exam-info'), 'Zur Prüfungsübersicht')])));
    }
    if (jumps.length > 1) rows.push(h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2], alignItems: 'center', marginTop: S.sp[2]}},
      [AP2.tint(h('span', {text: 'Springe zu:', style: {fontSize: S.f.sm}}), 'text2')].concat(jumps.map((j) => chip(j.text, false, () => j.el.scrollIntoView({behavior: 'smooth', block: 'start'}), 'Springe zu ' + j.text)))));
    return h('div', {style: {margin: '0 0 ' + S.sp[4]}}, rows);
  };
  // Wörterbuch zur ganzen Prüfung (aufklappbar), für Lernende mit Deutsch als Zweitsprache.
  const glossary = (words) => {
    const body = h('div', {style: {display: 'none', marginTop: S.sp[3]}}, [AP2.blocks.table(['Wort', 'Einfach erklärt'], words)]);
    const btn = AP2.btn({text: 'Wörter zu dieser Prüfung (' + words.length + ')', small: true, kind: 'soft', fn: () => {
      const open = body.style.display === 'none';
      body.style.display = open ? 'block' : 'none';
    }});
    return h('div', {style: {margin: '0 0 ' + S.sp[4]}}, [btn, body]);
  };
  AP2.blocks.exam = (cfg) => {
    const store = AP2.exam.store(cfg.id);
    const total = cfg.parts.reduce((a, part) => a + sumPts(part.tasks), 0);
    const bar = AP2.examBar(cfg, store);
    const labels = [];
    const cards = [];
    const sum = summary(cfg, store);
    const update = () => {
      let all = 0;
      cfg.parts.forEach((part, pi) => {
        const got = part.tasks.reduce((a, t, ti) => a + (store.pts(pi + '.' + ti) || 0), 0);
        labels[pi].textContent = got + ' / ' + sumPts(part.tasks) + ' Punkte';
        all += got;
      });
      bar.update(all, total);
      sum.update();
    };
    const root = h('div', {}, [cfg.hint ? AP2.blocks.note(cfg.hint) : null]);
    // Deckblatt (Bearbeitungshinweise) und Ausgangssituation mit Anlagen, wie im Aufgabensatz der IHK.
    if (cfg.cover) root.appendChild(card([label('Bearbeitungshinweise'), AP2.renderBlocks(cfg.cover)]));
    if (cfg.intro) root.appendChild(card([label('Ausgangssituation'), AP2.renderBlocks(cfg.intro)], true));
    const jumps = [];
    const navSlot = h('div');
    root.appendChild(navSlot);
    if (cfg.words) root.appendChild(glossary(cfg.words));
    root.appendChild(bar.el);
    cfg.parts.forEach((part, pi) => {
      const lab = AP2.tint(h('span', {style: {fontSize: S.f.sm, fontWeight: S.fw.semi}}), 'text2');
      labels.push(lab);
      const head = h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: S.sp[3], flexWrap: 'wrap', scrollMarginTop: '120px'}}, [AP2.blocks.h(part.t), lab]);
      jumps.push({text: part.t.replace(/:.*$/, '').replace(/\s*\(.*\)\s*$/, ''), el: head});
      root.appendChild(head);
      if (part.intro) root.appendChild(AP2.blocks.p(part.intro));
      if (part.ctx) root.appendChild(AP2.renderBlocks(part.ctx));
      part.tasks.forEach((task, ti) => {
        const el = AP2.examTask(task, (pi + 1) + '.' + (ti + 1), store, pi + '.' + ti, update);
        cards.push(el);
        root.appendChild(el);
      });
    });
    // Gebundene Aufgaben auf einmal auswerten (wie die Abgabe des Markierungsbogens).
    const auto = cards.filter((c) => c.ap2Check);
    if (auto.length) {
      const all = AP2.btn({text: 'Prüfung abgeben: alle ' + auto.length + ' gebundenen Aufgaben auswerten', kind: 'primary', fn: () => {
        if (window.confirm('Alle gebundenen Aufgaben jetzt auswerten?')) auto.forEach((c) => c.ap2Check());
      }});
      root.appendChild(h('div', {style: {margin: S.sp[4] + ' 0 ' + S.sp[5]}}, [all]));
    }
    navSlot.appendChild(navigator(cfg, jumps));
    root.appendChild(sum.el);
    update();
    return root;
  };
  // Prüfungsübersicht: alle Probeprüfungen als Raster (Zeile je Prüfung, Spalte je Teil) mit Fortschritt.
  AP2.blocks.examhub = () => {
    const sets = [];
    AP2.store.byBlock('exam').forEach((pg) => { const m = /^exam(\d+)-/.exec(pg.id); if (m && sets.indexOf(Number(m[1])) < 0) sets.push(Number(m[1])); });
    sets.sort((a, b) => a - b);
    const status = (id) => {
      const pg = AP2.store.get(id);
      if (!pg) return null;
      const cfg = (pg.blocks.find((b) => b[0] === 'exam') || [])[1];
      if (!cfg) return {pct: -1, pg};
      const st = AP2.exam.store(id);
      let got = 0; let max = 0; let done = 0;
      cfg.parts.forEach((part, pi) => part.tasks.forEach((t, ti) => { max += t.pts; const p = st.pts(pi + '.' + ti); if (p !== undefined) { got += p; done++; } }));
      return {pct: done ? Math.round((got / max) * 100) : -1, got, max, pg, minutes: cfg.minutes};
    };
    const grid = h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: S.sp[3], margin: '0 0 ' + S.sp[5]}});
    sets.forEach((n) => {
      grid.appendChild(AP2.tint(h('div', {text: 'Probeprüfung ' + n, style: {gridColumn: '1 / -1', fontWeight: S.fw.bold, fontSize: S.f.md, marginTop: S.sp[3]}}), 'text'));
      PARTS.forEach((p) => {
        const st = status('exam' + n + '-' + p[0]);
        if (!st) return;
        const sub = st.pct < 0 ? (st.minutes ? st.minutes + ' Min · offen' : 'offen') : st.pct + ' % · Note ' + AP2.exam.grade(st.pct)[1];
        const card = h('div', {style: {padding: '12px 14px', borderRadius: S.r.md, border: '1px solid'}}, [
          AP2.tint(h('div', {text: p[1], style: {fontWeight: S.fw.semi, fontSize: S.f.sm}}), 'accent'),
          AP2.tint(h('div', {text: st.pg.t.replace(/^[^:]*:\s*/, ''), style: {fontSize: S.f.xs, margin: '2px 0 6px', lineHeight: '1.4'}}), 'text2'),
          AP2.tint(h('div', {text: sub, style: {fontSize: S.f.xs, fontWeight: S.fw.semi}}), st.pct < 0 ? 'text3' : st.pct >= 50 ? 'ok' : 'bad')]);
        grid.appendChild(AP2.press(card, {fn: () => AP2.router.go('exam' + n + '-' + p[0]), label: 'Öffnen: Probeprüfung ' + n + ', ' + p[1],
          base: (c) => ({backgroundColor: c.surface, borderColor: c.border}), hover: (c) => ({borderColor: c.accent, backgroundColor: c.hover})}));
      });
    });
    return grid;
  };
})();
