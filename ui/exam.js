// Block "exam": komplette Probeprüfung mit Handlungsschritten, Aufgaben, Zeitlimit und Auswertung.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const sumPts = (list) => list.reduce((a, t) => a + t.pts, 0);
  AP2.blocks.exam = (cfg) => {
    const store = AP2.exam.store(cfg.id);
    const total = cfg.parts.reduce((a, part) => a + sumPts(part.tasks), 0);
    const bar = AP2.examBar(cfg, store);
    const labels = [];
    const update = () => {
      let all = 0;
      cfg.parts.forEach((part, pi) => {
        const got = part.tasks.reduce((a, t, ti) => a + (store.pts(pi + '.' + ti) || 0), 0);
        labels[pi].textContent = got + ' / ' + sumPts(part.tasks) + ' Punkte';
        all += got;
      });
      bar.update(all, total);
    };
    const root = h('div', {}, [AP2.blocks.note(cfg.hint), bar.el]);
    cfg.parts.forEach((part, pi) => {
      const label = AP2.tint(h('span', {style: {fontSize: S.f.sm, fontWeight: S.fw.semi}}), 'text2');
      labels.push(label);
      root.appendChild(h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: S.sp[3], flexWrap: 'wrap'}}, [AP2.blocks.h(part.t), label]));
      if (part.intro) root.appendChild(AP2.blocks.p(part.intro));
      part.tasks.forEach((task, ti) => root.appendChild(AP2.examTask(task, (pi + 1) + '.' + (ti + 1), store, pi + '.' + ti, update)));
    });
    update();
    return root;
  };
})();
