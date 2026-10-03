// Search UI: input and results
(function() {
  let searchInput = null;
  let resultsContainer = null;
  const show = (results) => {
    if (!resultsContainer) return;
    AP2.disposeTree(resultsContainer);
    if (results.length === 0) {
      resultsContainer.appendChild(AP2.h('div', {text: 'Keine Ergebnisse'}));
      return;
    }
    results.slice(0, 10).forEach(r => {
      const div = AP2.h('div', {
        style: {padding: AP2.styles.pad, cursor: 'pointer', borderBottom: `1px solid ${AP2.theme.get().border}`},
        on: {click: () => AP2.router.navigate(r.id)}
      }, [AP2.h('strong', {text: r.titel}), ' - ', r.definition || '']);
      resultsContainer.appendChild(div);
    });
  };
  window.AP2.search = {
    setInput: (el) => { searchInput = el; },
    setResults: (el) => { resultsContainer = el; },
    handle: (query) => {
      if (!query.trim()) {
        if (resultsContainer) AP2.disposeTree(resultsContainer);
        return;
      }
      const results = AP2.store.search(query);
      show(results);
    }
  };
})();
