// Responsive Berechnung aller Breiten bei jedem Resize (kein max-width/min-width).
(function () {
  const S = AP2.S;
  const L = {w: 0, h: 0, mobile: false, sidebarW: 0, mainW: 0, contentW: 0, pad: 0, subs: []};
  const compute = () => {
    L.w = document.documentElement.clientWidth || window.innerWidth;
    L.h = window.innerHeight;
    L.mobile = L.w < S.bp.mobile;
    const want = AP2.state.get('sideW') || S.w.sidebar;
    L.sidebarW = L.mobile ? Math.min(S.w.sidebar, L.w - 56) : Math.max(S.w.sideMin, Math.min(S.w.sideMax, L.w * 0.6, want));
    L.mainW = L.mobile ? L.w : L.w - L.sidebarW;
    L.pad = L.mobile ? S.w.padMobile : S.w.pad;
    L.contentW = Math.min(S.w.content, L.mainW - L.pad * 2);
  };
  const run = () => { compute(); L.subs.forEach((fn) => fn(L)); };
  const bind = (fn) => {
    L.subs.push(fn);
    fn(L);
    return () => { L.subs = L.subs.filter((item) => item !== fn); };
  };
  window.addEventListener('resize', run);
  AP2.state.sub('sideW', run);
  compute();
  AP2.layout = Object.assign(L, {bind, run});
})();
