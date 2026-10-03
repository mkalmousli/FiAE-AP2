// Alle wiederkehrenden Maße, Schriften und Zeiten an einer Stelle.
(function () {
  const px = (num) => num + 'px';
  AP2.S = {
    px,
    sp: {1: px(4), 2: px(8), 3: px(12), 4: px(16), 5: px(24), 6: px(32), 7: px(48), 8: px(72)},
    r: {sm: px(6), md: px(10), lg: px(16), pill: px(999)},
    f: {xs: px(12), sm: px(14), md: px(16), lg: px(18), xl: px(22), h2: px(26), h1: px(38)},
    fw: {reg: 400, med: 500, semi: 600, bold: 700},
    font: {
      sans: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      mono: "ui-monospace, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
    },
    lh: {tight: '1.25', body: '1.72', code: '1.6'},
    w: {sidebar: 316, sideMin: 240, sideMax: 560, grip: 8, topbar: 60, content: 880, pad: 24, padMobile: 16},
    bp: {mobile: 760},
    t: {fast: 'background-color 120ms ease, border-color 120ms ease, color 120ms ease, box-shadow 120ms ease'},
    z: {topbar: 30, overlay: 35, drawer: 40, drop: 50},
    shadow: '0 1px 2px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)',
    ring: 3,
  };
})();
