// Responsive layout calculations
(function() {
  const S = AP2.styles;
  const layout = {
    isMobile: false,
    isTablet: false,
    sidebarWidth: 0,
    contentWidth: 0,
    compute: () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      layout.isMobile = w < S.bpMobile;
      layout.isTablet = w < S.bpDesktop && w >= S.bpMobile;
      layout.sidebarWidth = layout.isMobile ? 0 : 280;
      layout.contentWidth = w - layout.sidebarWidth;
      const maxContent = 900;
      layout.contentPadded = Math.min(layout.contentWidth - 40, maxContent);
      layout.mainWidth = layout.isMobile ? w : layout.contentWidth;
      layout.mainHeight = h;
    },
    onResize: [],
  };
  window.addEventListener('resize', () => {
    layout.compute();
    layout.onResize.forEach(fn => fn(layout));
  });
  layout.compute();
  window.AP2.layout = layout;
})();
