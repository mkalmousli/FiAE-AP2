// Gantt-Diagramm aus Daten: Zeilen [name, start, dauer, stil], Abhängigkeiten [von, nach].
(function () {
  const build = (tasks, o) => {
    const opt = o || {};
    const left = opt.left || 150;
    const total = opt.total;
    const unit = opt.unit || 24;
    const row = 34;
    const w = left + total * unit + 24;
    const h = 40 + tasks.length * row + 12;
    const nodes = [];
    const edges = [];
    for (let t = 0; t <= total; t += opt.tick || 1) {
      const x = left + t * unit;
      edges.push({a: [x, 30], b: [x, h - 8], ea: 'none', s: 'border', w: 1});
      nodes.push({id: 'tk' + t, k: 'text', x, y: 16, t: String(t), fs: 11, tc: 'text3', w: 20, h: 14});
    }
    const pos = tasks.map((task, i) => ({x0: left + task[1] * unit, x1: left + (task[1] + task[2]) * unit, y: 40 + i * row + row / 2}));
    tasks.forEach((task, i) => {
      const p = pos[i];
      nodes.push({id: 'nm' + i, k: 'text', x: left - 10, y: p.y, t: task[0], fs: 12, tc: 'text', w: 10, h: 10, anchorEnd: true});
      if (task[2] === 0) nodes.push({id: 'b' + i, k: 'diamond', x: p.x0, y: p.y, w: 18, h: 18, s: 'solid', t: ''});
      else nodes.push({id: 'b' + i, k: 'round', x: (p.x0 + p.x1) / 2, y: p.y, w: p.x1 - p.x0, h: 22, s: task[3] || 'accent', t: opt.labels ? String(task[2]) : '', fs: 11});
    });
    (opt.deps || []).forEach(([from, to]) => {
      const a = pos[from];
      const b = pos[to];
      const via = a.y === b.y ? [] : [[a.x1 + 8, a.y], [a.x1 + 8, b.y]];
      edges.push({a: [a.x1, a.y], b: [b.x0, b.y], via, s: 'text3', w: 1.2});
    });
    return {w, h, nodes, edges, cap: opt.cap, keep: opt.keep};
  };
  AP2.dg.gantt = build;
})();
