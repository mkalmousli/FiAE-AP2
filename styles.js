// Enhanced style constants: modern design system
(function() {
  const px = (n) => n + 'px';
  const styles = {
    // Spacing - 8px base grid
    gap: px(16), gapSmall: px(8), gapLarge: px(32), gapXL: px(48),
    pad: px(20), padSmall: px(12), padLarge: px(32),
    // Typography - better hierarchy
    fBase: '16px', fSmall: '14px', fSmaller: '13px', fLarge: '18px', 
    fTitle: '32px', fHead: '24px', fSubhead: '20px',
    fSerif: "'Georgia', serif", fMono: "'Fira Code', monospace", 
    fSans: "'Segoe UI', 'system-ui', sans-serif",
    lhBase: '1.6', lhTight: '1.3', lhLoose: '1.8',
    // Breakpoints
    bpMobile: 480, bpTablet: 768, bpDesktop: 1024, bpWide: 1400,
    // Radii - modern
    radius: px(6), radiusLarge: px(12), radiusXL: px(16), radiusRound: '50%',
    // Shadows - depth
    shadow: '0 1px 3px rgba(0,0,0,0.08)', 
    shadowMd: '0 4px 12px rgba(0,0,0,0.12)',
    shadowLg: '0 12px 32px rgba(0,0,0,0.15)',
    shadowDark: '0 8px 24px rgba(0,0,0,0.2)',
    // Transitions
    trans: '200ms cubic-bezier(0.2, 0, 0.38, 0.9)',
    transSnap: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
    // Font weights
    fw400: 400, fw500: 500, fw600: 600, fw700: 700, fw800: 800,
  };
  window.AP2.styles = styles;
})();
