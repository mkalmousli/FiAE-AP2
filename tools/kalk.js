// Werkzeuge für kaufmännische Rechnungen: Break-even, Bezugskalkulation, optimale Bestellmenge.
(function () {
  const {tk} = AP2;
  const eur = (v) => v.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' €';
  const num = (field) => Number(String(field.get()).replace(',', '.'));

  // Gewinnschwelle: Fixkosten / (Preis - variable Stückkosten).
  AP2.tools.breakeven = () => {
    const out = tk.result();
    const kf = tk.input('Fixkosten K_fix (€)', 10000, () => update(), 'number');
    const p = tk.input('Preis je Stück p (€)', 5, () => update(), 'number');
    const kv = tk.input('Variable Kosten je Stück k_v (€)', 2.5, () => update(), 'number');
    const x = tk.input('Absatzmenge x (Stück)', 6300, () => update(), 'number');
    const update = () => {
      const fix = num(kf); const price = num(p); const var1 = num(kv); const qty = num(x);
      const db = price - var1;
      if (!(db > 0)) return out.show([['Hinweis', 'Der Preis muss größer als die variablen Stückkosten sein, sonst gibt es keine Gewinnschwelle.']]);
      const be = fix / db;
      const gewinn = db * qty - fix;
      out.show([
        ['Deckungsbeitrag je Stück', eur(db) + '   (p - k_v)'],
        ['Gewinnschwelle (rechnerisch)', be.toLocaleString('de-DE', {maximumFractionDigits: 2}) + ' Stück'],
        ['Gewinnschwelle (ganze Stück)', Math.ceil(be) + ' Stück (immer aufrunden)'],
        ['Umsatz bei Gewinnschwelle', eur(be * price)],
        ['Gesamtkosten bei x', eur(fix + var1 * qty) + '   (K_fix + k_v · x)'],
        ['Erlös bei x', eur(price * qty) + '   (p · x)'],
        ['Ergebnis bei x', (gewinn >= 0 ? 'Gewinn ' : 'Verlust ') + eur(Math.abs(gewinn))],
      ]);
    };
    update();
    return tk.col([tk.note('Gewinnschwelle (Break-even-Menge) = Fixkosten / Deckungsbeitrag je Stück. Ab dieser Menge decken die Erlöse alle Kosten.'),
      tk.row([kf.el, p.el]), tk.row([kv.el, x.el]), out]);
  };

  // Bezugskalkulation (Einkauf): Listenpreis bis Bezugspreis.
  AP2.tools.bezug = () => {
    const out = tk.result();
    const lp = tk.input('Listenpreis je Stück (€ netto)', 1149, () => update(), 'number');
    const n = tk.input('Menge (Stück)', 10, () => update(), 'number');
    const ra = tk.input('Rabatt (%)', 5, () => update(), 'number');
    const sk = tk.input('Skonto (%)', 2, () => update(), 'number');
    const bk = tk.input('Bezugskosten gesamt (€)', 50, () => update(), 'number');
    const update = () => {
      const list = num(lp) * num(n);
      const rabatt = list * num(ra) / 100;
      const ziel = list - rabatt;
      const skonto = ziel * num(sk) / 100;
      const bar = ziel - skonto;
      const bezug = bar + num(bk);
      out.show([
        ['Listeneinkaufspreis', eur(list)], ['- Rabatt', eur(rabatt)], ['= Zieleinkaufspreis', eur(ziel)],
        ['- Skonto', eur(skonto)], ['= Bareinkaufspreis', eur(bar)], ['+ Bezugskosten', eur(num(bk))],
        ['= Bezugspreis (Einstandspreis)', eur(bezug)], ['Bezugspreis je Stück', eur(num(n) > 0 ? bezug / num(n) : 0)],
      ]);
    };
    update();
    return tk.col([tk.note('Reihenfolge merken: erst Rabatt (vom Listenpreis), dann Skonto (vom Zieleinkaufspreis), dann Bezugskosten addieren.'),
      tk.row([lp.el, n.el]), tk.row([ra.el, sk.el, bk.el]), out]);
  };

  // Optimale Bestellmenge (Andler-Formel) mit Kontrolltabelle.
  AP2.tools.andler = () => {
    const out = tk.result();
    const jb = tk.input('Jahresbedarf (Stück)', 1200, () => update(), 'number');
    const kb = tk.input('Kosten je Bestellung (€)', 25, () => update(), 'number');
    const ep = tk.input('Einstandspreis je Stück (€)', 19.5, () => update(), 'number');
    const ls = tk.input('Lagerkostensatz (%)', 20, () => update(), 'number');
    const update = () => {
      const m = num(jb); const fix = num(kb); const price = num(ep); const rate = num(ls) / 100;
      if (!(m > 0 && fix > 0 && price > 0 && rate > 0)) return out.show([['Hinweis', 'Alle Werte müssen größer als 0 sein.']]);
      const q = Math.sqrt((200 * m * fix) / (price * num(ls)));
      const cost = (x) => (m / x) * fix + (x / 2) * price * rate;
      out.show([
        ['Optimale Bestellmenge', q.toLocaleString('de-DE', {maximumFractionDigits: 1}) + ' Stück'],
        ['Bestellungen pro Jahr', (m / q).toLocaleString('de-DE', {maximumFractionDigits: 1})],
        ['Bestellkosten / Jahr', eur((m / q) * fix)], ['Lagerkosten / Jahr', eur((q / 2) * price * rate)],
        ['Gesamtkosten / Jahr', eur(cost(q))],
        ['Zum Vergleich: halbe Menge', eur(cost(q / 2)) + ' Gesamtkosten'], ['Zum Vergleich: doppelte Menge', eur(cost(q * 2)) + ' Gesamtkosten'],
      ]);
    };
    update();
    return tk.col([tk.note('Andler-Formel: x_opt = √(200 · Jahresbedarf · Bestellkosten / (Einstandspreis · Lagerkostensatz in %)). Im Optimum sind Bestell- und Lagerkosten gleich hoch.'),
      tk.row([jb.el, kb.el]), tk.row([ep.el, ls.el]), out]);
  };
})();
