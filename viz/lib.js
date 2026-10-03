// Diagramm-Generatoren für wiederkehrende Layouts (Kette, Spalte, Zyklus, Baum, Schichten).
(function () {
  const chain = (labels, o, vertical) => {
    const opt = o || {};
    const count = labels.length;
    const w = opt.w || (vertical ? 420 : 720);
    const gap = opt.gap || 56;
    const nh = opt.nh || 48;
    const nw = vertical ? (opt.bw || 260) : Math.min(opt.bw || 150, (w - 40) / count - 22);
    const h = opt.h || (vertical ? 24 + count * (nh + gap) - gap : 110);
    const stepX = (w - 40 - nw) / Math.max(1, count - 1);
    const nodes = labels.map((t, i) => ({id: 'n' + i, t, w: nw, h: nh, k: opt.k || 'round', s: (opt.styles || [])[i] || 'plain',
      x: vertical ? w / 2 : 20 + nw / 2 + i * stepX, y: vertical ? 12 + nh / 2 + i * (nh + gap) : h / 2}));
    const edges = nodes.slice(1).map((n, i) => ({a: 'n' + i, b: 'n' + (i + 1), t: (opt.edgeText || [])[i]}));
    return {w, h, nodes, edges, cap: opt.cap};
  };
  const cycle = (labels, o) => {
    const opt = o || {};
    const w = opt.w || 720;
    const h = opt.h || 380;
    const rx = opt.rx || 250;
    const ry = opt.ry || 130;
    const count = labels.length;
    const nodes = labels.map((t, i) => {
      const ang = -Math.PI / 2 + (2 * Math.PI * i) / count;
      return {id: 'c' + i, t, x: w / 2 + rx * Math.cos(ang), y: h / 2 + ry * Math.sin(ang), k: opt.k || 'round', s: (opt.styles || [])[i] || 'plain'};
    });
    const edges = nodes.map((n, i) => ({a: n.id, b: 'c' + ((i + 1) % count), t: (opt.edgeText || [])[i]}));
    return {w, h, nodes, edges, cap: opt.cap};
  };
  const tree = (root, o) => {
    const opt = o || {};
    const gx = opt.gx || 64;
    const gy = opt.gy || 72;
    const nodes = [];
    const edges = [];
    let leaf = 0;
    let depth = 0;
    const walk = (spec, level, parent) => {
      if (spec.e) { const ghost = {x: 40 + leaf * gx}; leaf++; return ghost; }
      const rec = {id: 't' + nodes.length, t: spec.t, y: 32 + level * gy, k: opt.k || 'circle', s: spec.s || 'plain', w: opt.w || 42, h: opt.h || 42};
      nodes.push(rec);
      depth = Math.max(depth, level);
      if (parent) edges.push({a: parent.id, b: rec.id, ea: 'none'});
      const kids = (spec.c || []).map((child) => walk(child, level + 1, rec));
      if (kids.length) rec.x = (kids[0].x + kids[kids.length - 1].x) / 2;
      else { rec.x = 40 + leaf * gx; leaf++; }
      return rec;
    };
    walk(root, 0, null);
    return {w: Math.max(opt.minW || 0, 80 + (leaf - 1) * gx), h: 64 + depth * gy, nodes, edges, cap: opt.cap};
  };
  const layers = (rows, o) => {
    const opt = o || {};
    const w = opt.w || 720;
    const rh = opt.rh || 50;
    const lw = opt.lw || 250;
    const nodes = [];
    rows.forEach((row, i) => {
      const y = 12 + rh / 2 + i * (rh + 8);
      nodes.push({id: 'l' + i, x: 12 + lw / 2, y, w: lw, h: rh, t: row[0], s: row[2] || 'accent', k: 'round', b: true});
      nodes.push({id: 'r' + i, x: 12 + lw + 12 + (w - lw - 36) / 2, y, w: w - lw - 36, h: rh, t: row[1], s: 'soft', k: 'round'});
    });
    return {w, h: 24 + rows.length * (rh + 8) - 8, nodes, edges: [], cap: opt.cap};
  };
  AP2.dg = {flow: (l, o) => chain(l, o, false), col: (l, o) => chain(l, o, true), cycle, tree, layers};
})();
