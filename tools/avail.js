// Werkzeug: Verfügbarkeit aus MTBF/MTTR sowie Ausfallzeit pro Jahr.
(function () {
  const {tk} = AP2;
  const HOURS = 8760;
  const fmt = (hours) => (hours >= 1 ? hours.toFixed(2) + ' h' : (hours * 60).toFixed(1) + ' min');
  AP2.tools.avail = () => {
    const out = tk.result();
    const mtbf = tk.input('MTBF (Stunden)', 999, () => update(), 'number');
    const mttr = tk.input('MTTR (Stunden)', 1, () => update(), 'number');
    const update = () => {
      const a = Number(mtbf.get());
      const r = Number(mttr.get());
      if (!(a > 0) || !(r >= 0)) return out.show([['Hinweis', 'MTBF muss größer als 0 sein']]);
      const v = a / (a + r);
      const down = (1 - v) * HOURS;
      out.show([['Verfügbarkeit', (v * 100).toFixed(4) + ' %'], ['Ausfall pro Jahr', fmt(down)], ['Ausfall pro Monat', fmt(down / 12)], ['Ausfall pro Woche', fmt(down / 52)]]);
    };
    update();
    return tk.col([tk.note('Verfügbarkeit = MTBF / (MTBF + MTTR). Ein Jahr hat 8.760 Stunden.'), tk.row([mtbf.el, mttr.el]), out]);
  };
})();
