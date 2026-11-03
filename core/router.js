// Hash-Router: #/seiten-id
(function () {
  const current = () => decodeURIComponent(location.hash.replace(/^#\/?/, '')) || 'home';
  // Während eines Strg-/Mittelklicks (router.tab, gesetzt von AP2.press) öffnet go die Seite in einem neuen Tab.
  const go = (id) => {
    if (AP2.router.tab) { AP2.router.tab = false; window.open(location.pathname + location.search + '#/' + id, '_blank', 'noopener'); return; }
    location.hash = '/' + id;
  };
  window.addEventListener('hashchange', () => AP2.state.set('route', current()));
  AP2.router = {current, go, tab: false};
})();
