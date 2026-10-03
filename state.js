// Single Source of Truth: theme, route, progress
(function() {
  const state = {
    theme: localStorage.getItem('ap2-theme') || 'light',
    route: location.hash.slice(1) || '/home',
    progress: {},
  };
  const subscribers = {};
  const load = () => {
    try {
      const saved = localStorage.getItem('ap2-progress');
      state.progress = saved ? JSON.parse(saved) : {};
    } catch (e) { console.error('Progress load:', e); }
  };
  const save = () => {
    try {
      localStorage.setItem('ap2-progress', JSON.stringify(state.progress));
    } catch (e) { console.error('Progress save:', e); }
  };
  const notify = (key) => {
    (subscribers[key] || []).forEach(fn => fn(state[key]));
  };
  window.AP2.state = {
    get: (key) => state[key],
    set: (key, val) => {
      if (key === 'theme') {
        localStorage.setItem('ap2-theme', val);
      }
      state[key] = val;
      notify(key);
    },
    subscribe: (key, fn) => {
      if (!subscribers[key]) subscribers[key] = [];
      subscribers[key].push(fn);
      fn(state[key]);
    },
    markDone: (id) => {
      state.progress[id] = { done: true, time: Date.now() };
      save();
      notify('progress');
    },
    markReview: (id, level) => {
      if (!state.progress[id]) state.progress[id] = {};
      state.progress[id].reviewLevel = level;
      save();
      notify('progress');
    },
    init: load,
  };
})();
