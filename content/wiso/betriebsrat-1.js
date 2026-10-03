AP2.page('wiso-betriebsrat', {
  b: 'wiso', g: 'Tarifrecht und Mitbestimmung', t: 'Betriebsrat und Betriebsverfassungsgesetz (BetrVG)',
  d: 'Der **Betriebsrat** ist die **gewählte Interessenvertretung der Arbeitnehmer** im Betrieb. Er wird in Betrieben mit **mindestens 5 ständig wahlberechtigten Arbeitnehmern** (davon 3 wählbar) gewählt, **alle 4 Jahre**. Er hat **Mitbestimmungsrechte** (zum Beispiel bei Arbeitszeit, Überwachung durch Technik, Einstellungen), **Mitwirkungsrechte** und **Informationsrechte** nach dem **Betriebsverfassungsgesetz**. Die **Jugend- und Auszubildendenvertretung (JAV)** vertritt Beschäftigte **unter 18** und **Azubis unter 25**.',
  m: '**BR: Wahl ab 5 AN, alle 4 Jahre. Wahlberechtigt ab 18, wählbar nach 6 Monaten Betriebszugehörigkeit. Mitbestimmung: sozial (§ 87), personell (§ 99), wirtschaftlich (§ 111).** Kündigung ohne Anhörung des Betriebsrats = **unwirksam** (§ 102). **JAV: bis 25, Wahl alle 2 Jahre.** Der Betriebsrat ist **kein** Teil der Gewerkschaft.',
  cheat: [
    ['Wahl', ['Betrieb mit **mindestens 5 ständig wahlberechtigten AN**, davon **3 wählbar**', '**Wahlberechtigt:** ab **18 Jahre**', '**Wählbar:** 6 Monate im Betrieb', '**Amtszeit 4 Jahre**', '**Größe:** 5 bis 20 AN = 1 Mitglied, 21-50 = 3, 51-100 = 5, 101-200 = 7']],
    ['Mitbestimmung § 87 (soziale Angelegenheiten)', ['Beginn/Ende der **täglichen Arbeitszeit**, **Pausen**', '**Urlaubsgrundsätze**, Urlaubsplan', '**Technische Überwachung** (Zeiterfassung, Software zur Leistungskontrolle)', 'Ordnung im Betrieb, **Lohngestaltung**, Sozialeinrichtungen', '**Gesundheitsschutz**, Unfallverhütung']],
    ['Personelle Angelegenheiten', ['**§ 99:** Einstellung, Versetzung, Eingruppierung: **Zustimmung** nötig', '**§ 102:** **Anhörung vor jeder Kündigung** (sonst unwirksam)', '**§ 98:** Berufsbildung', 'Stellenausschreibung']],
    ['Wirtschaftliche Angelegenheiten', ['**§ 106:** Wirtschaftsausschuss (ab 100 AN)', '**§ 111:** **Betriebsänderungen** (Schließung, Verlegung, Zusammenlegung): **Interessenausgleich** und **Sozialplan**', 'Betrieb mit **mehr als 20** wahlberechtigten AN']],
  ],
  blocks: [
    ['h', 'Wozu ein Betriebsrat?'],
    ['p', 'Der **Betriebsrat (BR)** vertritt die **Interessen aller Arbeitnehmer eines Betriebs** gegenüber dem Arbeitgeber (außer leitender Angestellter). Er sorgt dafür, dass Gesetze und Tarifverträge **eingehalten** werden, und beteiligt sich an **Entscheidungen** des Arbeitgebers. Seine Grundlage ist das **Betriebsverfassungsgesetz (BetrVG)**. Der Arbeitgeber trägt die **Kosten** des Betriebsrats, Betriebsratsmitglieder werden für ihre Tätigkeit **freigestellt**, sind zur **Verschwiegenheit** verpflichtet und genießen **besonderen Kündigungsschutz**.'],
    ['h', 'Wahl und Zusammensetzung'],
    ['table', ['Merkmal', 'Regelung'], [
      ['Voraussetzung', 'Betrieb mit **in der Regel mindestens 5 ständigen wahlberechtigten Arbeitnehmern**, von denen **3 wählbar** sind (§ 1 BetrVG)'],
      ['Wahlberechtigt (aktives Wahlrecht)', 'Alle Arbeitnehmer ab **18 Jahren** (auch Auszubildende)'],
      ['Wählbar (passives Wahlrecht)', 'Wahlberechtigte, die **seit mindestens 6 Monaten** dem Betrieb angehören'],
      ['Amtszeit', '**4 Jahre**, regelmäßige Wahlen **alle 4 Jahre** (zuletzt im Zeitraum **1. März bis 31. Mai 2026**)'],
      ['Größe', '**5 bis 20** Arbeitnehmer: 1 Mitglied; **21 bis 50**: 3; **51 bis 100**: 5; **101 bis 200**: 7; **201 bis 400**: 9; **401 bis 700**: 11 ... (§ 9 BetrVG)'],
      ['Wahlgrundsätze', 'Allgemein, unmittelbar, frei, **geheim**, gleich. **Mehrheitswahl** (bei nur einem Wahlvorschlag) oder **Verhältniswahl**'],
      ['Freistellung', 'Ab **200 Arbeitnehmern** mindestens **1 Betriebsratsmitglied** vollständig freigestellt (Staffel nach Betriebsgröße)'],
      ['Kosten', 'Trägt der **Arbeitgeber** (Büro, Material, Schulungen)'],
    ]],
    ['diagram', {w: 760, h: 270, keep: 600, cap: 'Der Betriebsrat im Betrieb: Er vertritt alle Arbeitnehmer, die JAV die jungen Beschäftigten.', nodes: [
      {id: 'ag', k: 'round', x: 130, y: 60, t: 'Arbeitgeber', w: 160, h: 46, s: 'solid'}, {id: 'br', k: 'round', x: 380, y: 60, t: ['Betriebsrat', '(gewählt, 4 Jahre)'], w: 190, h: 56, s: 'accent'}, {id: 'jav', k: 'round', x: 640, y: 60, t: ['JAV', '(bis 25 Jahre, 2 Jahre)'], w: 190, h: 56, s: 'accent'},
      {id: 'an', k: 'round', x: 380, y: 190, t: ['Belegschaft', 'wählt den Betriebsrat'], w: 220, h: 56, s: 'ok'}, {id: 'jug', k: 'round', x: 640, y: 190, t: ['Jugendliche (unter 18) und Azubis (unter 25)', 'wählen die JAV'], w: 260, h: 56, s: 'ok', fs: 12},
    ], edges: [{a: 'ag', b: 'br', ea: 'open', sa: 'open', t: 'Zusammenarbeit', lo: [0, -12]}, {a: 'an', b: 'br'}, {a: 'jug', b: 'jav'}, {a: 'jav', b: 'br', ea: 'open', t: 'Teilnahme/Vertretung', lo: [0, -12]}]}],
  ],
});
