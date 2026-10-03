AP2.page('wiso-sv', {
  b: 'wiso', g: 'Sozialversicherung', t: 'Das System der Sozialversicherung (fünf Säulen)',
  d: 'Die deutsche **gesetzliche Sozialversicherung** besteht aus **fünf Zweigen**: **Krankenversicherung**, **Rentenversicherung**, **Arbeitslosenversicherung**, **Pflegeversicherung** und **Unfallversicherung**. Sie ist eine **Pflichtversicherung** für Arbeitnehmer, folgt dem **Solidarprinzip** und wird durch **Beiträge** finanziert, die **Arbeitgeber und Arbeitnehmer je zur Hälfte** tragen (nur die **Unfallversicherung** zahlt der **Arbeitgeber allein**).',
  m: '**K-R-A-P-U** = **K**ranken-, **R**enten-, **A**rbeitslosen-, **P**flege-, **U**nfallversicherung. **Je zur Hälfte** (außer **U**nfall = nur Arbeitgeber, und Pflegekinderlosen-Zuschlag nur AN, Zusatzbeitrag teilweise). **Solidarprinzip: Beitrag nach Einkommen, Leistung nach Bedarf.** Rentenversicherung = **Umlageverfahren**.',
  cheat: [
    ['Fünf Zweige', ['**KV** (SGB V): Behandlung, Krankengeld', '**RV** (SGB VI): Rente', '**ALV** (SGB III): Arbeitslosengeld', '**PV** (SGB XI): Pflege', '**UV** (SGB VII): Arbeitsunfall, Berufskrankheit']],
    ['Beiträge (Stand 2026, jährlich prüfen)', ['**RV 18,6 %** (je 9,3 %)', '**ALV 2,6 %** (je 1,3 %)', '**KV 14,6 %** + Zusatzbeitrag (Ø **2,9 %**), je Hälfte', '**PV 3,6 %** (je 1,8 %), Kinderlose AN +0,6 %', '**UV:** nur Arbeitgeber, nach Lohnsumme und Gefahrklasse']],
    ['Grenzen (2026)', ['**Beitragsbemessungsgrenze RV/ALV:** 8.450 Euro/Monat', '**BBG KV/PV:** 5.812,50 Euro/Monat', '**Versicherungspflichtgrenze KV:** 6.450 Euro/Monat (77.400 pro Jahr)', '**Minijob:** bis 603 Euro, **Midijob:** 603,01 bis 2.000 Euro']],
    ['Prinzipien', ['**Solidarprinzip** (starke tragen mehr)', '**Umlageverfahren** (Rente: heutige Beiträge zahlen heutige Renten)', '**Pflichtversicherung**, **Selbstverwaltung**', '**Paritätische Finanzierung** (AG und AN je Hälfte)', '**Sachleistungsprinzip** (KV)']],
  ],
  blocks: [
    ['h', 'Wozu Sozialversicherung?'],
    ['p', 'Krankheit, Unfall, Arbeitslosigkeit, Pflegebedürftigkeit und Alter können **jeden treffen** und **finanziell ruinieren**. In Deutschland sichern deshalb **gesetzliche Versicherungen** die großen Lebensrisiken ab. Seit **Bismarck (1880er-Jahre)** gilt der Gedanke: Der Staat schützt die Arbeitnehmer vor den **Risiken des Lebens**. Die Sozialversicherung ist Teil des **Sozialstaats** (Art. 20 GG).'],
    ['diagram', {w: 760, h: 300, keep: 600, cap: 'Fünf Säulen der gesetzlichen Sozialversicherung (Jahr der Einführung in Klammern)', nodes: [
      {id: 'kv', k: 'round', x: 90, y: 70, t: ['Kranken-', 'versicherung', '(1883)'], w: 130, h: 80, s: 'accent'}, {id: 'uv', k: 'round', x: 240, y: 70, t: ['Unfall-', 'versicherung', '(1884)'], w: 130, h: 80, s: 'accent'}, {id: 'rv', k: 'round', x: 390, y: 70, t: ['Renten-', 'versicherung', '(1889)'], w: 130, h: 80, s: 'accent'}, {id: 'av', k: 'round', x: 540, y: 70, t: ['Arbeitslosen-', 'versicherung', '(1927)'], w: 130, h: 80, s: 'accent'}, {id: 'pv', k: 'round', x: 690, y: 70, t: ['Pflege-', 'versicherung', '(1995)'], w: 130, h: 80, s: 'accent'},
      {id: 'f', k: 'box', x: 380, y: 160, w: 700, h: 30, t: 'Finanzierung: Beiträge von Arbeitgeber und Arbeitnehmer (Unfallversicherung nur Arbeitgeber)', s: 'soft', fs: 12}, {id: 'a', k: 'box', x: 380, y: 205, w: 700, h: 30, t: 'Pflichtversicherung für Arbeitnehmer, Solidarprinzip, Selbstverwaltung', s: 'soft', fs: 12}, {id: 'b', k: 'box', x: 380, y: 250, w: 700, h: 30, t: 'Beiträge vom Bruttolohn bis zur Beitragsbemessungsgrenze, Einzug durch die Krankenkasse', s: 'soft', fs: 12},
    ], edges: []}],
    ['table', ['Zweig', 'Gesetz', 'Träger', 'Leistungen (Auswahl)', 'Wer zahlt?'], [
      ['**Krankenversicherung**', 'SGB V', 'Krankenkassen (AOK, TK, Barmer, ...)', 'Behandlung, Medikamente, Krankengeld, Vorsorge, Mutterschaftsgeld', 'AG und AN je Hälfte (Zusatzbeitrag je Hälfte)'],
      ['**Unfallversicherung**', 'SGB VII', 'Berufsgenossenschaften, Unfallkassen', 'Heilbehandlung, Reha, Verletztengeld, Unfallrente', '**Nur Arbeitgeber**'],
      ['**Rentenversicherung**', 'SGB VI', 'Deutsche Rentenversicherung', 'Altersrente, Erwerbsminderungsrente, Hinterbliebenenrente, Reha', 'AG und AN je Hälfte'],
      ['**Arbeitslosenversicherung**', 'SGB III', 'Bundesagentur für Arbeit', 'Arbeitslosengeld I, Vermittlung, Kurzarbeitergeld, Qualifizierung', 'AG und AN je Hälfte'],
      ['**Pflegeversicherung**', 'SGB XI', 'Pflegekassen (bei den Krankenkassen)', 'Pflegegeld, Pflegesachleistungen, stationäre Pflege', 'AG und AN je Hälfte (Kinderlosenzuschlag AN)'],
    ]],
    ['h', 'Beitragssätze und Berechnung (Stand 2026)'],
    ['warn', 'Die **Zahlen** (Beitragssätze, Beitragsbemessungsgrenzen, Minijob-Grenze) ändern sich **fast jedes Jahr**. In der Prüfung werden die aktuellen Werte meist **in der Aufgabe angegeben**. Wichtig sind das **Prinzip** und die **Rechnung**. Stand der Zahlen hier: **2026** (vor der Prüfung nachprüfen).'],
    ['table', ['Zweig', 'Gesamt-Beitragssatz', 'Arbeitnehmeranteil', 'Arbeitgeberanteil', 'Beitragsbemessungsgrenze (Monat)'], [
      ['Rentenversicherung', '18,6 %', '9,3 %', '9,3 %', '8.450 Euro'],
      ['Arbeitslosenversicherung', '2,6 %', '1,3 %', '1,3 %', '8.450 Euro'],
      ['Krankenversicherung (allgemein)', '14,6 % + Zusatzbeitrag (Ø 2,9 %)', '7,3 % + 1,45 % = **8,75 %**', '7,3 % + 1,45 % = **8,75 %**', '5.812,50 Euro'],
      ['Pflegeversicherung', '3,6 %', '1,8 % (Kinderlose: **2,4 %**)', '1,8 %', '5.812,50 Euro'],
      ['Unfallversicherung', 'je nach Branche und Gefahrklasse', '**0 %**', '100 %', 'Höchstjahresarbeitsverdienst'],
    ]],
  ],
});
