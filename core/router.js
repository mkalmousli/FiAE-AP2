// Hash-Router: #/seiten-id
(function () {
  const current = () => decodeURIComponent(location.hash.replace(/^#\/?/, '')) || 'home';
  const go = (id) => { location.hash = '/' + id; };
  window.addEventListener('hashchange', () => AP2.state.set('route', current()));
  AP2.router = {current, go};
})();
