// Werkzeug: Lineare und binäre Suche im Vergleich, Schritt für Schritt.
(function () {
  const {tk} = AP2;
  const DATA = [3, 8, 12, 17, 21, 26, 31, 38, 42, 47, 53, 59, 64, 70, 77, 85];
  const binary = (target) => {
    const steps = [];
    let lo = 0;
    let hi = DATA.length - 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const rel = DATA[mid] === target ? 'gefunden' : DATA[mid] < target ? 'zu klein, rechts weiter' : 'zu groß, links weiter';
      steps.push(['Schritt ' + (steps.length + 1), 'Bereich [' + lo + '..' + hi + '], Mitte ' + mid + ' = ' + DATA[mid] + ': ' + rel]);
      if (DATA[mid] === target) return {steps, found: mid};
      if (DATA[mid] < target) lo = mid + 1; else hi = mid - 1;
    }
    return {steps, found: -1};
  };
  AP2.tools.search = () => {
    const out = tk.result();
    const val = tk.input('Gesuchte Zahl', 53, () => update(), 'number');
    const update = () => {
      const target = Number(val.get());
      const lin = DATA.indexOf(target);
      const bin = binary(target);
      out.show([['Sortierte Daten', DATA.join(', '), true], ['Lineare Suche', (lin < 0 ? DATA.length : lin + 1) + ' Vergleiche, ' + (lin < 0 ? 'nicht gefunden' : 'Index ' + lin)]]
        .concat(bin.steps, [['Binäre Suche', bin.steps.length + ' Vergleiche, ' + (bin.found < 0 ? 'nicht gefunden' : 'Index ' + bin.found)]]));
    };
    update();
    return tk.col([tk.note('Binäre Suche braucht sortierte Daten und halbiert den Suchbereich: O(log n) statt O(n).'), val.el, out]);
  };
})();
