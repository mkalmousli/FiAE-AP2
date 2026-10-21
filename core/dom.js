// DOM-Helfer: Elemente erzeugen, Stile setzen, Listener verfolgen und sauber entfernen.
(function () {
  const listeners = new WeakMap();
  const st = (el, obj) => Object.assign(el.style, obj);
  const on = (el, type, fn) => {
    el.addEventListener(type, fn);
    if (!listeners.has(el)) listeners.set(el, []);
    listeners.get(el).push([type, fn]);
    return el;
  };
  const kid = (el, kids) => {
    [].concat(kids).flat(Infinity).forEach((item) => {
      if (item == null || item === false) return;
      el.appendChild(item instanceof Node ? item : document.createTextNode(String(item)));
    });
  };
  const h = (tag, cfg, kids) => {
    const el = document.createElement(tag);
    const o = cfg || {};
    if (o.text != null) el.textContent = o.text;
    if (o.attrs) Object.keys(o.attrs).forEach((key) => el.setAttribute(key, o.attrs[key]));
    if (o.style) st(el, o.style);
    if (o.on) Object.keys(o.on).forEach((key) => on(el, key, o.on[key]));
    kid(el, kids || []);
    return el;
  };
  const svg = (tag, attrs, kids) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs || {}).forEach((key) => el.setAttribute(key, attrs[key]));
    kid(el, kids || []);
    return el;
  };
  const inline = (kind, text) => {
    // Fettgedruckte Schlüsselbegriffe erscheinen in der Fachfarbe: beim Überfliegen springen sie ins Auge.
    if (kind === 'b') return AP2.theme.bind(h('strong', {text, style: {fontWeight: AP2.S.fw.semi}}), (e, col) => { e.style.color = col.accent; });
    const el = h('code', {text, style: {fontFamily: AP2.S.font.mono, fontSize: '0.88em', padding: '1px 6px',
      borderRadius: AP2.S.r.sm, border: '1px solid'}});
    return AP2.theme.bind(el, (e, col) => st(e, {backgroundColor: col.surface2, borderColor: col.border}));
  };
  const rich = (str) => {
    const frag = document.createDocumentFragment();
    String(str).split(/(\*\*[^*]+\*\*|`[^`]+`)/).forEach((part) => {
      if (!part) return;
      if (part.startsWith('**')) frag.appendChild(inline('b', part.slice(2, -2)));
      else if (part.startsWith('`')) frag.appendChild(inline('c', part.slice(1, -1)));
      else frag.appendChild(document.createTextNode(part));
    });
    return frag;
  };
  // Wie rich, aber fette Stellen werden zu farbigen Markern: tone 'cat' wechselt die Farbe je Begriff (Merkhilfen), sonst Fachfarbe.
  const marked = (str, tone) => {
    const frag = document.createDocumentFragment();
    let n = 0;
    String(str).split(/(\*\*[^*]+\*\*|`[^`]+`)/).forEach((part) => {
      if (!part) return;
      if (part.startsWith('**')) {
        const i = n++;
        const el = h('span', {text: part.slice(2, -2), style: {fontWeight: AP2.S.fw.semi, padding: '0 5px', borderRadius: '5px', boxDecorationBreak: 'clone', webkitBoxDecorationBreak: 'clone'}});
        AP2.theme.bind(el, (e, col) => {
          const k = i % col.cat.length;
          st(e, tone === 'cat' ? {backgroundColor: col.catSoft[k], color: col.cat[k]} : {backgroundColor: col.accentSoft, color: col.text});
        });
        frag.appendChild(el);
      } else if (part.startsWith('`')) frag.appendChild(inline('c', part.slice(1, -1)));
      else frag.appendChild(document.createTextNode(part));
    });
    return frag;
  };
  const release = (el) => {
    (listeners.get(el) || []).forEach(([type, fn]) => el.removeEventListener(type, fn));
    listeners.delete(el);
    AP2.theme.unbind(el);
  };
  const dispose = (root) => {
    root.querySelectorAll('*').forEach(release);
    while (root.firstChild) root.removeChild(root.firstChild);
  };
  Object.assign(AP2, {h, st, on, svg, rich, marked, dispose});
})();
