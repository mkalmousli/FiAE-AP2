// Werkzeug: Kündigungsfrist und frühestes Vertragsende berechnen (§ 622 BGB).
(function () {
  const {tk} = AP2;
  const DAY = 86400000;
  const MONTHS = [[20, 7], [15, 6], [12, 5], [10, 4], [8, 3], [5, 2], [2, 1]];
  const fmt = (d) => d.toLocaleDateString('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'});
  const addMonths = (d, n) => {
    const last = new Date(d.getFullYear(), d.getMonth() + n + 1, 0).getDate();
    return new Date(d.getFullYear(), d.getMonth() + n, Math.min(d.getDate(), last));
  };
  const monthEnd = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
  const next15orEnd = (d) => (d.getDate() <= 15 ? new Date(d.getFullYear(), d.getMonth(), 15) : monthEnd(d));
  const rule = (who, years, probe) => {
    if (probe) return {text: '2 Wochen (Probezeit), jederzeit', end: (d) => new Date(d.getTime() + 14 * DAY)};
    const hit = who === 'ag' ? MONTHS.find((m) => years >= m[0]) : null;
    if (hit) return {text: hit[1] + ' Monat(e) zum Monatsende', end: (d) => monthEnd(addMonths(d, hit[1]))};
    return {text: '4 Wochen zum 15. oder zum Monatsende', end: (d) => next15orEnd(new Date(d.getTime() + 28 * DAY))};
  };
  AP2.tools.kuendigung = () => {
    const out = tk.result();
    const who = tk.select('Wer kündigt?', [['ag', 'Arbeitgeber'], ['an', 'Arbeitnehmer']], () => update());
    const years = tk.input('Betriebszugehörigkeit (Jahre)', 6, () => update(), 'number');
    const probe = tk.select('Probezeit?', [['0', 'Nein'], ['1', 'Ja (max. 6 Monate)']], () => update());
    const today = new Date().toISOString().slice(0, 10);
    const date = tk.input('Zugang der Kündigung', today, () => update(), 'date');
    const update = () => {
      const d = new Date(date.get() + 'T00:00:00');
      if (isNaN(d)) return out.show([['Hinweis', 'Bitte ein gültiges Datum wählen']]);
      const r = rule(who.get(), Number(years.get()), probe.get() === '1');
      out.show([['Kündigungsfrist', r.text], ['Zugang', fmt(d)], ['Frühestes Ende', fmt(r.end(d))]]);
    };
    update();
    return tk.col([tk.note('Die Verlängerung nach Betriebszugehörigkeit gilt nur für den Arbeitgeber. Tarifvertrag oder Arbeitsvertrag können abweichen. Keine Rechtsberatung.'), tk.row([who.el, years.el, probe.el, date.el]), out]);
  };
})();
