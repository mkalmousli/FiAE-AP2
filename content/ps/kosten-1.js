AP2.page('ps-kosten', {
  b: 'ps', g: 'Projektmanagement', t: 'Kosten-Nutzen-Rechnung, ROI und Amortisation',
  d: 'Die **Kosten-Nutzen-Rechnung** vergleicht, was ein Projekt kostet (Investition und laufende Kosten) mit dem, was es bringt (Einsparungen, Mehrerlöse). Der **ROI** (Return on Investment) misst den Gewinn im Verhältnis zur Investition. Die **Amortisationsdauer** gibt an, nach welcher Zeit die Investition zurückgeflossen ist.',
  m: '**ROI = Gewinn / Investition mal 100 Prozent.** **Amortisation = Investition / jährliche Einsparung.** Je kürzer die Amortisationsdauer, desto besser. ROI kleiner als 0: Projekt lohnt sich nicht.',
  cheat: [
    ['Formeln', ['Gewinn = Nutzen - Kosten', '**ROI (%) = Gewinn / Investition mal 100**', '**Amortisationsdauer = Investition / Einsparung pro Jahr**', '**TCO** = Anschaffung + Betrieb über die Nutzungsdauer']],
    ['Kostenarten', ['**Einmalig:** Entwicklung, Hardware, Schulung, Migration', '**Laufend:** Lizenzen, Wartung, Support, Strom, Hosting', 'Direkt (Projekt) und indirekt (Gemeinkosten)']],
    ['Nutzenarten', ['**Monetär:** Kosten sparen, Umsatz steigern', '**Nicht monetär:** Zufriedenheit, Image, Sicherheit', 'Nicht-monetär bewertet die Nutzwertanalyse']],
    ['Entscheidung', ['ROI positiv und Amortisation kurz: Projekt umsetzen', 'Mehrere Varianten: Kostenvergleich oder Nutzwertanalyse', 'Annahmen immer nennen']],
  ],
  blocks: [
    ['h', 'Warum rechnet man vor dem Start?'],
    ['p', 'Ein Projekt verbraucht Geld und Zeit. Bevor man es startet, muss die Geschäftsführung wissen: **Lohnt es sich?** Diese Frage beantwortet die Wirtschaftlichkeitsrechnung. In der Initiierungsphase wird sie als **Business Case** erstellt, in der Prüfung heißt sie meist "Kosten-Nutzen-Analyse".'],
    ['h', 'Kosten und Nutzen sammeln'],
    ['table', ['Kategorie', 'Beispiele'], [
      ['Einmalige Kosten (Investition)', 'Entwicklungsstunden, Server und Hardware, Software-Lizenzen, Schulung der Mitarbeiter, Datenübernahme (Migration)'],
      ['Laufende Kosten (pro Jahr)', 'Wartung und Support, Hosting oder Strom, Lizenzgebühren, Administration'],
      ['Monetärer Nutzen', 'Eingesparte Arbeitszeit (Stunden mal Stundensatz), weniger Fehlerkosten, höhere Verkaufszahlen'],
      ['Nicht-monetärer Nutzen', 'Zufriedenere Kunden, bessere Datensicherheit, besseres Image, einfachere Bedienung'],
    ]],
    ['h', 'Die drei Kennzahlen'],
    ['kv', [
      ['Gewinn / Nettonutzen', 'Gesamtnutzen minus Gesamtkosten im Betrachtungszeitraum.'],
      ['ROI', 'Gewinn geteilt durch eingesetztes Kapital mal 100. Beispiel: Gewinn 60.000 Euro bei 60.000 Euro Investition ergibt ROI 100 Prozent.'],
      ['Amortisationsdauer', 'Investition geteilt durch den **jährlichen Rückfluss** (Einsparung minus laufende Kosten). Wann ist die Investition "wieder drin"?'],
      ['TCO (Total Cost of Ownership)', 'Gesamtkosten über die ganze Lebensdauer: Anschaffung plus Betrieb. Wichtig beim Vergleich: das billigste Angebot ist oft nicht das günstigste.'],
    ]],
    ['h', 'Durchgerechnetes Beispiel'],
    ['ex', ['Ein Unternehmen automatisiert die Rechnungserstellung. Investition: **60.000 Euro**. Einsparung: **24.000 Euro pro Jahr** (weniger manuelle Arbeit). Laufende Kosten sind in der Einsparung bereits abgezogen. Betrachtungszeitraum: 5 Jahre.', '**Amortisationsdauer** = 60.000 / 24.000 = **2,5 Jahre**.', '**Gesamtnutzen** in 5 Jahren: 5 mal 24.000 = 120.000 Euro. **Gewinn** = 120.000 - 60.000 = **60.000 Euro**.', '**ROI** = 60.000 / 60.000 mal 100 = **100 Prozent** über 5 Jahre (20 Prozent pro Jahr im Durchschnitt).']],
    ['chart', {kind: 'line', w: 720, h: 320, labels: ['0', '1', '2', '3', '4', '5'], series: [{n: 'Investition (60 T Euro)', d: [60, 60, 60, 60, 60, 60], k: 'text3', dash: '6 5'}, {n: 'Kumulierte Einsparung', d: [0, 24, 48, 72, 96, 120], k: 'accent'}], yl: 'Tausend Euro', cap: 'Die Kurven kreuzen sich nach 2,5 Jahren: Das ist der Amortisationszeitpunkt (Break-even).'}],
    ['tip', 'In der Prüfung gilt: Immer die Formel hinschreiben, die Zahlen einsetzen, Einheit und Ergebnis nennen. Auch bei falschem Endergebnis gibt es dann Punkte für den Rechenweg.'],
    ['tool', 'roi'],
  ],
});
