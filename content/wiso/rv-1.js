AP2.page('wiso-rv', {
  b: 'wiso', g: 'Sozialversicherung', t: 'Rentenversicherung und Rentenformel',
  d: 'Die **gesetzliche Rentenversicherung (GRV)** sichert **Alter, Erwerbsminderung und Tod** ab. Sie wird im **Umlageverfahren** finanziert (**Generationenvertrag**): Die **Beiträge der Erwerbstätigen** (18,6 %, je 9,3 % AG und AN) zahlen **sofort die Renten der heutigen Rentner**. Die Rentenhöhe richtet sich nach der **Rentenformel**: **Entgeltpunkte mal Zugangsfaktor mal aktueller Rentenwert mal Rentenartfaktor**.',
  m: '**Rente = EP mal ZF mal ARW mal RAF.** **EP = Jahresverdienst geteilt durch Durchschnittsverdienst** (1 Jahr Durchschnittsverdiener = 1 Entgeltpunkt). **ZF** (Zugangsfaktor) = 1,0 bei Regelaltersgrenze, **minus 0,3 % pro Monat früher**. **RAF** = 1,0 für Altersrente. **Aktueller Rentenwert** = Euro-Wert eines Entgeltpunktes pro Monat.',
  cheat: [
    ['Finanzierung', ['**Umlageverfahren** (Generationenvertrag)', 'Beitrag **18,6 %** (je 9,3 %)', 'Bundeszuschuss aus Steuern', 'Wer mehr einzahlt, bekommt mehr (**Äquivalenzprinzip**)']],
    ['Rentenarten', ['**Altersrente** (Regelaltersrente, langjährig Versicherte, besonders langjährig)', '**Erwerbsminderungsrente** (teilweise/voll)', '**Hinterbliebenenrente** (Witwen-/Witwer-, Waisenrente)', '**Reha** vor Rente']],
    ['Voraussetzungen', ['**Wartezeit 5 Jahre** für Regelaltersrente', '**Regelaltersgrenze 67** (Jahrgang 1964 und jünger, Übergang 65 bis 67)', '**35 Jahre:** vorzeitig ab 63 **mit Abschlägen**', '**45 Jahre:** besonders langjährig, abschlagsfrei früher']],
    ['Rentenformel', ['**Monatsrente = EP mal ZF mal ARW mal RAF**', 'EP = Jahresentgelt / Durchschnittsentgelt', 'ARW (aktueller Rentenwert): **40,79 Euro** (ab 1.7.2025)', 'Anpassung jährlich zum **1. Juli**']],
  ],
  blocks: [
    ['h', 'Aufgaben der Rentenversicherung'],
    ['p', 'Wer nicht mehr arbeiten kann (Alter, Krankheit), braucht Einkommen. Die **Deutsche Rentenversicherung** zahlt **Renten**, bietet **Rehabilitation** (Reha vor Rente) und **Beratung**. Versichert sind vor allem **Arbeitnehmer** und **Azubis**, auch einige Selbstständige. **Beamte** haben ein eigenes System (Pension), **Freiberufler** oft Versorgungswerke.'],
    ['h', 'Umlageverfahren: der Generationenvertrag'],
    ['diagram', {w: 760, h: 230, keep: 600, cap: 'Umlageverfahren: Die Beiträge der heute Beschäftigten finanzieren sofort die Renten der heutigen Rentner. Die Beschäftigten erwerben dadurch Ansprüche gegenüber der nächsten Generation.', nodes: [
      {id: 'a', k: 'round', x: 110, y: 100, t: ['Beschäftigte', '(Beiträge 18,6 %)'], w: 170, h: 60, s: 'accent'}, {id: 'r', k: 'round', x: 380, y: 100, t: ['Rentenversicherung', '(Deutsche Rentenversicherung)'], w: 210, h: 60, s: 'solid'}, {id: 'p', k: 'round', x: 650, y: 100, t: ['Rentner', '(Renten)'], w: 170, h: 60, s: 'ok'}, {id: 'b', k: 'round', x: 380, y: 190, t: 'Bundeszuschuss (Steuermittel)', w: 250, h: 40, s: 'soft', fs: 12},
    ], edges: [{a: 'a', b: 'r', t: 'zahlen'}, {a: 'r', b: 'p', t: 'zahlt aus'}, {a: 'b', b: 'r'}]}],
    ['table', ['', 'Umlageverfahren', 'Kapitaldeckungsverfahren'], [['Prinzip', 'Aktuelle Beiträge **bezahlen aktuelle Renten**', 'Beiträge werden **angespart und verzinst**'], ['Beispiel', 'Gesetzliche Rente', 'Riester, private Rentenversicherung, Betriebsrente (Pensionsfonds)'], ['Vorteil', 'Schnell, Inflationsschutz durch Lohnbezug', 'Unabhängig von der Altersstruktur'], ['Nachteil', '**Demografischer Wandel**: weniger Zahler pro Rentner', 'Kapitalmarktrisiko, Inflation, Zinsen']]],
    ['kv', [
      ['Demografischer Wandel', 'Die Menschen werden **älter** und es werden **weniger Kinder** geboren. Immer **weniger Beitragszahler** finanzieren **mehr Rentner**. Folgen: **Rentenniveau** steht unter Druck, **Regelaltersgrenze** steigt, **Bundeszuschuss** wächst, private Vorsorge nötig.'],
      ['Rentenniveau', 'Verhältnis der **Standardrente** (45 Beitragsjahre mit Durchschnittsverdienst) zum **Durchschnittseinkommen**. Derzeit etwa **48 Prozent** (gesetzliche Haltelinie bis 2031 beschlossen).'],
      ['Regelaltersgrenze', 'Für **ab 1964 Geborene 67 Jahre**; für ältere Jahrgänge schrittweise von 65 auf 67. Vorzeitiger Bezug möglich mit **Abschlägen von 0,3 Prozent pro Monat** (3,6 % pro Jahr), maximal 14,4 % bei Rente mit 63 vs 67.'],
    ]],
  ],
});
