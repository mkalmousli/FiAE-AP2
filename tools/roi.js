// Werkzeug: Wirtschaftlichkeit (ROI, Amortisationszeit, Gewinn über die Laufzeit).
(function () {
  const {tk} = AP2;
  const eur = (v) => v.toLocaleString('de-DE', {maximumFractionDigits: 2}) + ' Euro';
  AP2.tools.roi = () => {
    const out = tk.result();
    const inv = tk.input('Investition (Euro)', 60000, () => update(), 'number');
    const gain = tk.input('Nutzen pro Jahr (Euro)', 35000, () => update(), 'number');
    const cost = tk.input('Laufende Kosten pro Jahr (Euro)', 15000, () => update(), 'number');
    const years = tk.input('Nutzungsdauer (Jahre)', 5, () => update(), 'number');
    const update = () => {
      const i = Number(inv.get());
      const net = Number(gain.get()) - Number(cost.get());
      const y = Number(years.get());
      if (!(i > 0) || !(y > 0)) return out.show([['Hinweis', 'Investition und Nutzungsdauer müssen größer als 0 sein']]);
      const total = net * y - i;
      out.show([['Jahresüberschuss', eur(net)], ['Gesamtgewinn', eur(total)], ['ROI', ((total / i) * 100).toFixed(1) + ' %'],
        ['Amortisation', net > 0 ? (i / net).toFixed(2) + ' Jahre' + (i / net <= y ? ' (innerhalb der Nutzungsdauer)' : ' (zu lang)') : 'nie (kein Überschuss)'],
        ['Empfehlung', total > 0 && net > 0 && i / net <= y ? 'Wirtschaftlich sinnvoll' : 'Nicht wirtschaftlich']]);
    };
    update();
    return tk.col([tk.note('Amortisationszeit = Investition / jährlicher Überschuss. ROI = Gesamtgewinn / Investition.'), tk.row([inv.el, gain.el]), tk.row([cost.el, years.el]), out]);
  };
})();
