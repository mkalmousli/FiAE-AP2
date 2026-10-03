AP2.page('wiso-gehalt', {
  b: 'wiso', g: 'Unternehmen und Steuern', t: 'Gehaltsabrechnung: Brutto und Netto',
  d: 'Das **Bruttogehalt** ist der vereinbarte Lohn vor Abzügen. Davon werden **Lohnsteuer**, **Solidaritätszuschlag**, **Kirchensteuer** und der **Arbeitnehmeranteil der Sozialversicherung** abgezogen. Übrig bleibt das **Nettogehalt** (Auszahlungsbetrag). Der Arbeitgeber zahlt zusätzlich seinen **Sozialversicherungsanteil** (Lohnnebenkosten).',
  m: '**Brutto minus Steuern minus Sozialabgaben (AN) gleich Netto.** Sozialabgaben AN etwa **20 %** (RV 9,3, KV 7,3 + Zusatz, PV 1,8, ALV 1,3). **Arbeitgeberkosten = Brutto + AG-Anteile (ca. 21 %).**',
  cheat: [
    ['Abzüge Arbeitnehmer', ['**Lohnsteuer** (Steuerklasse)', '**Soli** (nur Besserverdiener), **Kirchensteuer** (8 % in BW)', '**RV 9,3 %**, **ALV 1,3 %**', '**KV 7,3 % + halber Zusatzbeitrag**, **PV 1,8 %** (Kinderlose 2,4 %)']],
    ['Begriffe', ['**Brutto:** vor Abzügen', '**Netto:** Auszahlung', '**Gesamtbrutto:** inkl. Sachbezüge/Zuschläge', '**Arbeitgeber-Brutto:** Gehalt + AG-Anteile']],
  ],
  blocks: [
    ['h', 'Vom Brutto zum Netto'],
    ['table', ['Position', 'Wer?', 'Beispiel bei 3.200 Euro Brutto (Steuerklasse I, kinderlos, grob)'], [
      ['Bruttogehalt', '', '3.200,00'],
      ['Lohnsteuer', 'AN', '- 440,00 (Näherung)'],
      ['Soli / Kirchensteuer', 'AN', '- 0,00 / - 35,00'],
      ['Rentenversicherung 9,3 %', 'AN', '- 297,60'],
      ['Arbeitslosenversicherung 1,3 %', 'AN', '- 41,60'],
      ['Krankenversicherung 7,3 % + 1,45 %', 'AN', '- 280,00'],
      ['Pflegeversicherung 2,4 % (kinderlos)', 'AN', '- 76,80'],
      ['**Nettogehalt**', '', '**ca. 2.029**'],
    ]],
    ['note', 'Die Lohnsteuer ist hier nur **gerundet geschätzt**. In der Prüfung werden Prozentsätze oder Tabellenwerte vorgegeben.'],
    ['ex', ['**Sozialabgaben AN:** 297,60 + 41,60 + 280,00 + 76,80 = **696,00 Euro** (21,75 %).', '**Arbeitgeberkosten:** 3.200 + ca. 21 % = **ca. 3.870 Euro**.']],
    ['h', 'Weitere Begriffe'],
    ['kv', [
      ['Vermögenswirksame Leistungen (VL)', 'Teil des Gehalts, der in Sparverträge fließt; oft **Zuschuss des Arbeitgebers** (bis 40 Euro).'],
      ['Sachbezug', 'Geldwerte Vorteile (Dienstwagen, Jobticket), steuer- und sozialversicherungspflichtig.'],
      ['Sonderzahlungen', 'Weihnachts- und Urlaubsgeld; werden versteuert, oft höher belastet.'],
      ['Minijob / Midijob', 'Minijob bis 603 Euro: pauschal; Midijob (Übergangsbereich) 603,01 bis 2.000 Euro: reduzierte AN-Beiträge.'],
    ]],
    ['qa', 'Berechnen Sie die Arbeitnehmeranteile zur RV und ALV bei 2.800 Euro Brutto.', ['RV: 2.800 mal 9,3 % = **260,40 Euro**.', 'ALV: 2.800 mal 1,3 % = **36,40 Euro**.'], 4],
    ['qa', 'Was ist der Unterschied zwischen Brutto und Netto?', 'Brutto ist das vereinbarte Entgelt **vor** Abzügen. Netto ist der **Auszahlungsbetrag** nach Abzug von Steuern und Arbeitnehmeranteilen der Sozialversicherung.', 3],
    ['quiz', [
      {q: 'Wie berechnet sich das Netto?', o: ['Brutto minus Steuern und Sozialabgaben', 'Brutto plus AG-Anteile', 'Brutto mal 0,5', 'Brutto minus Steuern plus VL'], a: 0, e: 'Netto = Brutto - Lohnsteuer - Soli - Kirchensteuer - AN-Sozialabgaben.'},
      {q: 'Welchen Satz zahlt der AN zur Rentenversicherung (2026)?', o: ['9,3 %', '18,6 %', '1,3 %', '7,3 %'], a: 0, e: 'Die Hälfte von 18,6 %.'},
    ]],
  ],
});
