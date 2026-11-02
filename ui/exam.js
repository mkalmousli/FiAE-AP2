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
    root.appendChild(bar.el);
    cfg.parts.forEach((part, pi) => {
      const lab = AP2.tint(h('span', {style: {fontSize: S.f.sm, fontWeight: S.fw.semi}}), 'text2');
      labels.push(lab);
      root.appendChild(h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: S.sp[3], flexWrap: 'wrap'}}, [AP2.blocks.h(part.t), lab]));
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
    root.appendChild(sum.el);
    update();
    return root;
  };
})();
