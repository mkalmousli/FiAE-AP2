// Schlichte Linien-Icons als SVG (keine Emojis, keine Bilddateien).
(function () {
  const PATHS = {
    menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
    search: ['M11 4a7 7 0 1 0 0 14a7 7 0 0 0 0-14z', 'M20 20l-4-4'],
    check: ['M5 12.5l4.5 4.5L19 7.5'],
    chevron: ['M9 6l6 6-6 6'],
    close: ['M6 6l12 12', 'M18 6L6 18'],
    copy: ['M9 9h10v10H9z', 'M5 15V5h10'],
    moon: ['M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z'],
    sun: ['M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8z', 'M12 2v2', 'M12 20v2', 'M2 12h2', 'M20 12h2', 'M5 5l1.5 1.5', 'M17.5 17.5L19 19', 'M5 19l1.5-1.5', 'M17.5 6.5L19 5'],
    plus: ['M12 5v14', 'M5 12h14'],
    minus: ['M5 12h14'],
    code: ['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M14 4l-4 16'],
    user: ['M12 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8z', 'M4 20a8 8 0 0 1 16 0'],
  };
  AP2.icon = (name, size) => {
    const box = size || 20;
    const root = AP2.svg('svg', {viewBox: '0 0 24 24', width: box, height: box, fill: 'none', stroke: 'currentColor',
      'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true'});
    PATHS[name].forEach((d) => root.appendChild(AP2.svg('path', {d})));
    AP2.st(root, {display: 'block', flexShrink: 0});
    return root;
  };
})();
