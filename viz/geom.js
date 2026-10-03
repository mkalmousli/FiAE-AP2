// Geometrie: Schnittpunkt einer Verbindungslinie mit dem Rand eines Knotens.
(function () {
  const ROUND = ['oval', 'circle', 'ring', 'dot'];
  const center = (ref) => (Array.isArray(ref) ? ref : [ref.x, ref.y]);
  const anchor = (n, tx, ty) => {
    const dx = tx - n.x;
    const dy = ty - n.y;
    if (!dx && !dy) return [n.x, n.y];
    const hw = n.w / 2;
    const hh = n.h / 2;
    let t;
    if (n.k === 'diamond') t = 1 / (Math.abs(dx) / hw + Math.abs(dy) / hh);
    else if (ROUND.includes(n.k)) t = 1 / Math.sqrt((dx * dx) / (hw * hw) + (dy * dy) / (hh * hh));
    else t = Math.min(hw / (Math.abs(dx) || 1e-9), hh / (Math.abs(dy) || 1e-9));
    return [n.x + dx * t, n.y + dy * t];
  };
  AP2.geom = {anchor, center};
})();
