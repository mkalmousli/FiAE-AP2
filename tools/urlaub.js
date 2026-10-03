// Werkzeug: gesetzlicher Mindesturlaub und Teilurlaub (BUrlG).
(function () {
  const {tk} = AP2;
  const BASE = 24;
  const WEEK = 6;
  const FULL_UNTIL_MONTH = 7;
  AP2.tools.urlaub = () => {
    const out = tk.result();
    const days = tk.input('Arbeitstage pro Woche', 5, () => update(), 'number');
    const contract = tk.input('Urlaubstage laut Vertrag (Jahr)', 28, () => update(), 'number');
    const month = tk.select('Eintritt am 1. des Monats (im Jahr)', ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'].map((m, i) => [String(i + 1), m]), () => update());
    const update = () => {
      const d = Number(days.get());
      const c = Number(contract.get());
      if (!(d > 0 && d <= 6) || !(c >= 0)) return out.show([['Hinweis', 'Arbeitstage zwischen 1 und 6 eingeben']]);
      const legal = (BASE * d) / WEEK;
      const m = Number(month.get());
      const full = m <= FULL_UNTIL_MONTH;
      const part = full ? c : Math.ceil(((13 - m) / 12) * c - 0.5 + 1e-9);
      out.show([['Mindesturlaub', legal.toFixed(1) + ' Tage (24 mal ' + d + ' / 6)'], ['Vertragsurlaub', c + ' Tage'],
        ['Im Eintrittsjahr', part + ' Tage' + (full ? ' (Wartezeit im Jahr erfüllt, voller Anspruch)' : ' (Teilurlaub: 1/12 je vollem Monat)')]]);
    };
    update();
    return tk.col([tk.note('Wartezeit: 6 Monate. Wer in der ersten Jahreshälfte beginnt, erreicht sie im selben Jahr und hat vollen Anspruch.'), tk.row([days.el, contract.el, month.el]), out]);
  };
})();
