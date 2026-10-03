// Theme-fähiges Einfärben von SVG-Elementen: ein Binding pro Diagramm statt pro Element.
(function () {
  const apply = (el, o, c) => {
    el.style.stroke = o.s ? c[o.s] : 'none';
    el.style.fill = o.f ? c[o.f] : 'none';
    el.style.strokeWidth = o.sw ? String(o.sw) : '0';
    el.style.strokeDasharray = o.dash || 'none';
  };
  AP2.paint = (root) => {
    const items = [];
    AP2.theme.bind(root, (node, c) => items.forEach(([el, o]) => apply(el, o, c)));
    return (el, o) => { items.push([el, o]); apply(el, o, AP2.theme.c()); return el; };
  };
})();
