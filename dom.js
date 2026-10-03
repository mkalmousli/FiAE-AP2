// DOM helpers: create, style, manage listeners
(function() {
  const listeners = new WeakMap();
  const h = (tag, cfg, kids) => {
    const el = document.createElement(tag);
    cfg = cfg || {};
    if (cfg.text) el.textContent = cfg.text;
    if (cfg.class) el.className = cfg.class;
    if (cfg.id) el.id = cfg.id;
    if (cfg.attrs) Object.entries(cfg.attrs).forEach(([k, v]) => el.setAttribute(k, v));
    if (cfg.on) Object.entries(cfg.on).forEach(([ev, fn]) => {
      el.addEventListener(ev, fn);
      track(el, ev, fn);
    });
    if (cfg.style) Object.assign(el.style, cfg.style);
    (kids || []).forEach(k => el.appendChild(typeof k === 'string' ? document.createTextNode(k) : k));
    return el;
  };
  const svg = (tag, attrs) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  };
  const text = (segs) => {
    if (typeof segs === 'string') return document.createTextNode(segs);
    const frag = document.createDocumentFragment();
    (Array.isArray(segs) ? segs : [segs]).forEach(seg => {
      if (typeof seg === 'string') {
        frag.appendChild(document.createTextNode(seg));
      } else if (seg.b) {
        const s = document.createElement('strong');
        s.textContent = seg.b;
        frag.appendChild(s);
      } else if (seg.i) {
        const s = document.createElement('em');
        s.textContent = seg.i;
        frag.appendChild(s);
      } else if (seg.code) {
        const s = document.createElement('code');
        s.textContent = seg.code;
        frag.appendChild(s);
      }
    });
    return frag;
  };
  const track = (el, type, fn) => {
    if (!listeners.has(el)) listeners.set(el, []);
    listeners.get(el).push({type, fn});
  };
  const disposeTree = (el) => {
    if (listeners.has(el)) {
      listeners.get(el).forEach(({type, fn}) => el.removeEventListener(type, fn));
    }
    el.querySelectorAll('*').forEach(child => {
      if (listeners.has(child)) {
        listeners.get(child).forEach(({type, fn}) => child.removeEventListener(type, fn));
      }
    });
    el.textContent = '';
  };
  window.AP2.h = h;
  window.AP2.svg = svg;
  window.AP2.text = text;
  window.AP2.track = track;
  window.AP2.disposeTree = disposeTree;
})();
