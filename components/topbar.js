// Top navigation bar
(function() {
  const mkTopbar = () => {
    const bar = AP2.h('div', {style: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: AP2.styles.pad, borderBottom: `1px solid`
    }});
    
    const title = AP2.h('h1', {text: 'AP2 FiAE', style: {margin: '0', fontSize: AP2.styles.fHead}});
    
    const search = AP2.h('input', {
      attrs: {type: 'text', placeholder: 'Suchen...'},
      style: {
        padding: AP2.styles.padSmall, borderRadius: AP2.styles.radius,
        border: `1px solid`, width: '200px', fontSize: AP2.styles.fBase
      },
      on: {input: (e) => AP2.search.handle(e.target.value)}
    });
    AP2.theme.register(search, 'border');
    
    const themeBtn = AP2.mkBtn({
      text: 'Dunkel',
      on: () => {
        const newTheme = AP2.state.get('theme') === 'light' ? 'dark' : 'light';
        AP2.theme.on(newTheme);
        themeBtn.textContent = newTheme === 'light' ? 'Dunkel' : 'Hell';
      }
    });
    
    bar.appendChild(title);
    bar.appendChild(search);
    bar.appendChild(themeBtn);
    AP2.theme.register(bar, 'border');
    return bar;
  };
  window.AP2.mkTopbar = mkTopbar;
})();
