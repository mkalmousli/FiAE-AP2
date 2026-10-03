// Style constants: spacing, fonts, breakpoints, presets
(function() {
  const px = (n) => n + 'px';
  const styles = {
    // Spacing
    gap: px(16), gapSmall: px(8), gapLarge: px(24),
    pad: px(16), padSmall: px(8), padLarge: px(24),
    // Font
    fBase: '16px', fSmall: '14px', fLarge: '18px', fTitle: '24px', fHead: '20px',
    fSerif: 'Georgia, serif', fMono: 'monospace', fSans: 'system-ui, sans-serif',
    // Breakpoints (px values for resize calc)
    bpMobile: 480, bpTablet: 768, bpDesktop: 1024,
    // Radii
    radius: px(4), radiusLarge: px(8),
    // Shadows
    shadow: '0 2px 8px rgba(0,0,0,0.1)', shadowDeep: '0 4px 12px rgba(0,0,0,0.2)',
  };
  const presets = {
    button: (el, theme) => {
      el.style.padding = `${styles.padSmall} ${styles.pad}`;
      el.style.border = 'none';
      el.style.borderRadius = styles.radius;
      el.style.cursor = 'pointer';
      el.style.fontSize = styles.fBase;
      el.style.fontWeight = '500';
      el.style.transition = 'background-color 0.2s, transform 0.1s';
      el.style.webkitTapHighlightColor = 'transparent';
    },
    card: (el, theme) => {
      el.style.padding = styles.pad;
      el.style.borderRadius = styles.radiusLarge;
      el.style.border = `1px solid ${theme.border}`;
      el.style.backgroundColor = theme.bg2;
      el.style.boxShadow = styles.shadow;
    },
    inputText: (el, theme) => {
      el.style.padding = styles.padSmall;
      el.style.border = `1px solid ${theme.border}`;
      el.style.borderRadius = styles.radius;
      el.style.fontSize = styles.fBase;
      el.style.fontFamily = styles.fSans;
    },
  };
  window.AP2.styles = styles;
  window.AP2.applyPreset = (el, name, theme) => {
    if (presets[name]) presets[name](el, theme);
  };
})();
