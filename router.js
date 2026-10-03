// Router: hash-based navigation
(function() {
  const routes = {};
  const listeners = [];
  const navigate = (path) => {
    location.hash = path;
  };
  const on = (path, fn) => {
    routes[path] = fn;
  };
  const subscribe = (fn) => {
    listeners.push(fn);
  };
  const handle = () => {
    const path = location.hash.slice(1) || '/home';
    AP2.state.set('route', path);
    if (routes[path]) routes[path]();
    listeners.forEach(fn => fn(path));
  };
  window.addEventListener('hashchange', handle);
  window.AP2.router = {navigate, on, subscribe, handle};
})();
