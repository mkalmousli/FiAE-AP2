// Werkzeug: RAID-Rechner für nutzbare Kapazität und Ausfalltoleranz.
(function () {
  const {tk} = AP2;
  const LEVELS = {
    '0': {name: 'RAID 0 (Striping)', min: 2, usable: (n, c) => n * c, fault: () => '0 Platten (keine Redundanz)'},
    '1': {name: 'RAID 1 (Spiegelung)', min: 2, usable: (n, c) => c, fault: (n) => (n - 1) + ' Platten'},
    '5': {name: 'RAID 5 (Parität)', min: 3, usable: (n, c) => (n - 1) * c, fault: () => '1 Platte'},
    '6': {name: 'RAID 6 (doppelte Parität)', min: 4, usable: (n, c) => (n - 2) * c, fault: () => '2 Platten'},
    '10': {name: 'RAID 10 (Spiegel + Stripe)', min: 4, usable: (n, c) => (n / 2) * c, fault: () => '1 Platte je Spiegelpaar'},
  };
  AP2.tools.raid = () => {
    const out = tk.result();
    const level = tk.select('RAID-Level', Object.keys(LEVELS).map((k) => [k, LEVELS[k].name]), () => update());
    const num = tk.input('Anzahl Platten', 4, () => update(), 'number');
    const cap = tk.input('Kapazität je Platte (TB)', 2, () => update(), 'number');
    const update = () => {
      const lv = LEVELS[level.get()];
      const n = Math.floor(Number(num.get()));
      const c = Number(cap.get());
      if (!(n >= lv.min) || !(c > 0) || (level.get() === '10' && n % 2)) return out.show([['Hinweis', 'Mindestens ' + lv.min + ' Platten' + (level.get() === '10' ? ' (gerade Anzahl)' : '') + ' und Kapazität über 0']]);
      const use = lv.usable(n, c);
      out.show([['Brutto', n * c + ' TB'], ['Nutzbar', use + ' TB'], ['Nutzung', Math.round((use / (n * c)) * 100) + ' %'], ['Ausfalltoleranz', lv.fault(n)]]);
    };
    update();
    return tk.col([tk.row([level.el, num.el, cap.el]), out]);
  };
})();
