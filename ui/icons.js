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
    flame: ['M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.6 2.3-4.6c.2 1.6 1 2.6 2.2 3.1C11 9 10.6 6 12 3z'],
    bolt: ['M13 2L4 14h7l-1 8l9-12h-7z'],
    star: ['M12 3l2.7 5.6l6.1.9l-4.4 4.3l1 6.1L12 17l-5.4 2.9l1-6.1L3.2 9.5l6.1-.9z'],
    trophy: ['M8 4h8v5a4 4 0 0 1-8 0z', 'M8 6H5a3 3 0 0 0 3 4', 'M16 6h3a3 3 0 0 1-3 4', 'M12 13v4', 'M8 20h8', 'M10 17h4v3h-4z'],
    target: ['M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z', 'M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10z', 'M12 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2z'],
    cards: ['M7 4h11a1 1 0 0 1 1 1v12', 'M4 7h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z'],
    map: ['M9 4L3 6v14l6-2l6 2l6-2V4l-6 2z', 'M9 4v14', 'M15 6v14'],
    chart: ['M4 20V10', 'M10 20V4', 'M16 20v-7', 'M3 20h18'],
    clock: ['M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z', 'M12 7v5l3 2'],
    volume: ['M4 9h4l5-4v14l-5-4H4z', 'M16 9a4 4 0 0 1 0 6', 'M18.5 6.5a8 8 0 0 1 0 11'],
    mute: ['M4 9h4l5-4v14l-5-4H4z', 'M16 9l5 6', 'M21 9l-5 6'],
    repeat: ['M4 12a8 8 0 0 1 14-5.3L20 9', 'M20 4v5h-5', 'M20 12a8 8 0 0 1-14 5.3L4 15', 'M4 20v-5h5'],
    play: ['M7 4l13 8l-13 8z'],
    gear: ['M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6z', 'M12 2v3', 'M12 19v3', 'M2 12h3', 'M19 12h3', 'M4.9 4.9l2.1 2.1', 'M17 17l2.1 2.1', 'M4.9 19.1L7 17', 'M17 7l2.1-2.1'],
    lock: ['M6 11h12v9H6z', 'M8 11V8a4 4 0 0 1 8 0v3'],
    book: ['M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z', 'M4 21V5', 'M8 7h7'],
    arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
    bulb: ['M9 18h6', 'M10 21h4', 'M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.6 1 2.5h6c0-.9.2-1.7 1-2.5A6 6 0 0 0 12 3z'],
    alert: ['M12 3L2 20h20z', 'M12 10v4', 'M12 17v.5'],
    info: ['M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z', 'M12 11v5', 'M12 7.5v.5'],
    flask: ['M9 3h6', 'M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3', 'M7.5 15h9'],
    clipboard: ['M9 4h6v3H9z', 'M8 5H6v16h12V5h-2', 'M9 12h6', 'M9 16h4'],
    network: ['M12 3v5', 'M5 16v-3h14v3', 'M12 8v5', 'M10 3h4v4h-4z', 'M3 16h4v4H3z', 'M10 16h4v4h-4z', 'M17 16h4v4h-4z'],
    briefcase: ['M4 8h16v11H4z', 'M9 8V5h6v3', 'M4 13h16'],
    pen: ['M4 20l4-1L19 8l-3-3L5 16z', 'M14 7l3 3'],
    bookmark: ['M6 3h12v18l-6-4l-6 4z'],
    sword: ['M14 4l6-1l-1 6l-9 9l-5-5z', 'M5 14l-2 2l5 5l2-2', 'M7 17l-3 3'],
    heart: ['M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z'],
    puzzle: ['M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4v-4a2 2 0 1 0 0-4z'],
    gift: ['M4 10h16v10H4z', 'M3 7h18v3H3z', 'M12 7v13', 'M12 7c-2 0-4-1-4-2.5S10 3 12 7c2-4 4-2.5 4-2.5S14 7 12 7z'],
    route: ['M6 19a2 2 0 1 0 0-4a2 2 0 0 0 0 4z', 'M18 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4z', 'M6 15V9a4 4 0 0 1 4-4h6', 'M18 9v6a4 4 0 0 1-4 4H8'],
    eye: ['M2 12s4-7 10-7s10 7 10 7s-4 7-10 7S2 12 2 12z', 'M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6z'],
    grid: ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'],
    home: ['M3 11l9-7l9 7', 'M5 10v10h14V10', 'M10 20v-6h4v6'],
    calc: ['M6 3h12v18H6z', 'M8 6h8v3H8z', 'M9 13h.5', 'M12 13h.5', 'M15 13h.5', 'M9 17h.5', 'M12 17h.5', 'M15 17h.5'],
    question: ['M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18z', 'M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5V14', 'M12 17v.5'],
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
