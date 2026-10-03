// Image figure with caption
(function() {
  const mkFigure = (url, caption, width) => {
    width = width || '100%';
    const fig = AP2.h('figure', {style: {
      margin: `${AP2.styles.gapLarge} 0`,
      textAlign: 'center',
    }});
    
    const img = AP2.h('img', {
      attrs: {src: url, alt: caption},
      style: {
        width: width, maxWidth: '100%', height: 'auto',
        borderRadius: AP2.styles.radiusLarge,
        boxShadow: AP2.styles.shadowMd,
      }
    });
    
    const cap = AP2.h('figcaption', {
      text: caption,
      style: {
        marginTop: AP2.styles.gap, fontSize: AP2.styles.fSmall,
        color: '#6b7280', fontStyle: 'italic'
      }
    });
    AP2.theme.register(cap, 'text');
    
    fig.appendChild(img);
    fig.appendChild(cap);
    return fig;
  };
  window.AP2.mkFigure = mkFigure;
})();
