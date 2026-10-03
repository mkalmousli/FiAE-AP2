AP2.page('ps-verifikation', {
  b: 'ps', g: 'Qualitätssicherung', t: 'Verifikation, Validierung, Reviews und Abnahme',
  d: '**Verifikation** prüft, ob das Produkt **richtig gebaut** wurde (erfüllt es die Spezifikation?). **Validierung** prüft, ob das **richtige Produkt** gebaut wurde (erfüllt es den Zweck des Kunden?). **Reviews** sind systematische Prüfungen von Dokumenten und Code durch Menschen. Die **Abnahme** ist die formale Anerkennung der Leistung durch den Kunden.',
  m: '**Verifikation = "Build the product right"** (nach Plan gebaut). **Validierung = "Build the right product"** (das Richtige gebaut). Eselsbrücke: **V**erifikation = **V**orgabe, **V**alidierung = **V**erwendung.',
  cheat: [
    ['Verifikation vs. Validierung', ['**Verifikation:** Stimmt das Ergebnis mit der **Spezifikation** überein?', '**Validierung:** Löst es das **Problem des Kunden**?', 'Beispiel: Programm erfüllt das Pflichtenheft (verifiziert), aber Kunde wollte etwas anderes (nicht validiert)']],
    ['Reviewarten', ['**Walkthrough:** Autor führt durch, informell', '**Inspektion:** formal, Rollen, Checkliste', '**Technisches Review:** Fachexperten', '**Pair Programming / Peer Review:** Kollege prüft']],
    ['Abnahme', ['Gemäß **Werkvertrag (§640 BGB)**', '**Abnahmeprotokoll** mit Mängelliste', 'Folgen: Vergütung fällig, Gewährleistung beginnt, Beweislast wechselt']],
    ['Qualitätssicherung', ['**Konstruktiv:** Fehler vermeiden (Standards, Schulung)', '**Analytisch:** Fehler finden (Test, Review)']],
  ],
  blocks: [
    ['h', 'Qualitätssicherung: Fehler vermeiden und finden'],
    ['p', 'Qualität bedeutet, dass ein Produkt die **Anforderungen erfüllt**. Die **Qualitätssicherung (QS)** arbeitet mit zwei Strategien:'],
    ['list', ['**Konstruktive Maßnahmen** verhindern Fehler schon beim Entstehen: Programmierrichtlinien, Entwurfsmuster, Schulungen, Vorlagen, Code-Generatoren.', '**Analytische Maßnahmen** finden Fehler, die schon da sind: **Tests** (dynamisch, Programm wird ausgeführt) und **Reviews** sowie statische Codeanalyse (statisch, Programm wird nicht ausgeführt).']],
    ['h', 'Verifikation und Validierung'],
    ['diagram', {w: 720, h: 230, cap: 'Verifikation prüft gegen die Spezifikation, Validierung gegen den Bedarf des Kunden.', nodes: [
      {id: 'k', k: 'round', x: 90, y: 110, t: ['Bedarf', 'des Kunden'], w: 130, h: 60, s: 'soft'}, {id: 'sp', k: 'round', x: 310, y: 110, t: ['Spezifikation', '(Pflichtenheft)'], w: 150, h: 60, s: 'accent'}, {id: 'pr', k: 'round', x: 530, y: 110, t: ['Fertiges', 'Produkt'], w: 130, h: 60, s: 'accent'},
    ], edges: [{a: 'k', b: 'sp'}, {a: 'sp', b: 'pr'}, {a: 'pr', b: 'sp', via: [[530, 40], [310, 40]], t: 'Verifikation', s: 'ok', lo: [0, -12]}, {a: 'pr', b: 'k', via: [[530, 190], [90, 190]], t: 'Validierung', s: 'accent', lo: [0, 12]}]}],
    ['table', ['Frage', 'Verifikation', 'Validierung'], [
      ['Leitfrage', 'Bauen wir das Produkt richtig?', 'Bauen wir das richtige Produkt?'],
      ['Vergleich mit', 'Spezifikation (Pflichtenheft, Entwurf)', 'Bedürfnissen und Erwartungen des Kunden'],
      ['Beispiel', 'Alle Funktionen aus dem Pflichtenheft sind vorhanden und fehlerfrei.', 'Die Mitarbeiter nutzen die Software tatsächlich zur Lösung ihrer Aufgaben.'],
      ['Typische Methode', 'Reviews, Modultest, Systemtest', 'Abnahmetest, Pilotbetrieb, Befragung'],
    ]],
    ['ex', 'Ein Team baut genau das Pflichtenheft nach (alles verifiziert). Aber das Pflichtenheft enthielt eine falsche Annahme über den Arbeitsablauf. Die Software ist fehlerfrei, aber unbrauchbar: **verifiziert, aber nicht validiert**.'],
    ['h', 'Reviews'],
    ['table', ['Reviewart', 'Ablauf', 'Formalität', 'Ziel'], [
      ['Walkthrough', 'Der Autor erklärt sein Ergebnis Schritt für Schritt Kollegen', 'gering', 'Verständnis, Fehler und Ideen sammeln'],
      ['Inspektion', 'Festgelegte Rollen (Moderator, Autor, Gutachter, Protokollführer), Vorbereitung mit Checklisten, Protokoll', 'hoch', 'Möglichst viele Fehler systematisch finden'],
      ['Technisches Review', 'Fachexperten prüfen auf technische Eignung', 'mittel', 'Technische Qualität, Eignung'],
      ['Peer Review / Code Review', 'Kollege prüft den Code vor dem Zusammenführen (zum Beispiel Pull Request)', 'mittel', 'Fehler, Lesbarkeit, Wissensaustausch'],
      ['Pair Programming', 'Zwei Entwickler programmieren gemeinsam an einem Rechner', 'gering', 'Sofortiges Review, Wissensaustausch'],
    ]],
  ],
});
