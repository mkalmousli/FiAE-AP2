AP2.page('de-brief', {
  b: 'de', g: 'Schriftverkehr', t: 'Geschäftsbrief (DIN 5008) und E-Mail',
  d: 'Ein **Geschäftsbrief** nach **DIN 5008** hat einen festen Aufbau: **Absender, Anschrift des Empfängers, Informationsblock (Datum, Zeichen), Betreff, Anrede, Text, Grußformel, Unterschrift, Anlagenvermerk**. Der Ton ist **sachlich, höflich, klar**. Eine **E-Mail** ist kürzer, hat eine **aussagekräftige Betreffzeile**, Anrede, **ein Thema**, Gruß und Signatur.',
  m: '**Betreff ohne "Betreff:"**, **Anrede mit Komma, Text klein weiter**, **Grußformel ohne Komma danach**. **AIDA** für Werbebriefe: Aufmerksamkeit, Interesse, Wunsch (Desire), Aktion. **Ein Brief = ein Anliegen.**',
  cheat: [
    ['Aufbau Geschäftsbrief', ['**Absender** (Briefkopf)', '**Anschriftfeld** (Empfänger)', '**Informationsblock:** Datum, Zeichen, Ansprechpartner', '**Betreff** (fett, ohne das Wort Betreff)', '**Anrede** + Komma, Text klein', '**Text:** Einleitung, Hauptteil, Schluss', '**Grußformel**, **Unterschrift**, **Anlagen**']],
    ['Anreden und Grüße', ['"Sehr geehrte Frau Müller," / "Sehr geehrter Herr Schmidt,"', '"Sehr geehrte Damen und Herren,"', '"Mit freundlichen Grüßen"', '"Freundliche Grüße" (weniger förmlich)']],
    ['E-Mail', ['**Betreff** knapp und konkret', 'Anrede, ein Thema, kurze Absätze', '**Signatur** mit Kontaktdaten', '**Anhänge** im Text erwähnen', '**Antworten:** Zitat kürzen']],
  ],
  blocks: [
    ['h', 'Aufbau nach DIN 5008'],
    ['diagram', {w: 560, h: 380, keep: 420, cap: 'Schematischer Aufbau eines Geschäftsbriefs (Form B)', nodes: [
      {id: 'a', k: 'box', x: 280, y: 40, t: 'Briefkopf: Absender, Logo', w: 480, h: 50, s: 'soft'}, {id: 'b', k: 'box', x: 170, y: 120, t: 'Anschriftfeld Empfänger', w: 260, h: 56}, {id: 'c', k: 'box', x: 450, y: 120, t: 'Datum, Zeichen, Ansprechpartner', w: 190, h: 56, s: 'soft', fs: 11}, {id: 'd', k: 'box', x: 280, y: 190, t: 'Betreff (fett)', w: 480, h: 30, s: 'accent'}, {id: 'e', k: 'box', x: 280, y: 240, t: 'Anrede: Sehr geehrte Frau ...,', w: 480, h: 30}, {id: 'f', k: 'box', x: 280, y: 300, t: 'Brieftext (Einleitung, Hauptteil, Schluss)', w: 480, h: 56, s: 'soft'}, {id: 'g', k: 'box', x: 280, y: 355, t: 'Gruß, Unterschrift, Anlagen', w: 480, h: 30},
    ], edges: []}],
    ['table', ['Element', 'Regel'], [['**Betreff**', 'Das Wort "Betreff" steht **nicht** davor; kurz und konkret, **ohne Punkt**, fett erlaubt'], ['**Anrede**', 'Mit **Komma**; die nächste Zeile beginnt **klein** (außer Namen und Nomen)'], ['**Grußformel**', 'Kein Komma und kein Punkt danach'], ['**Datum**', '**TT.MM.JJJJ** oder 15. Mai 2026'], ['**Anlagen**', '"Anlagen: Lebenslauf, Zeugnisse" unter der Unterschrift'], ['**Schrift und Ränder**', 'Linker Rand 2,5 cm, Schriftgröße 11 oder 12, klare Absätze'], ['**Zeichen**', 'Ihr Zeichen, unser Zeichen, Ihr Schreiben vom']]],
    ['h', 'Aufbau des Brieftextes'],
    ['steps', ['**Einleitung:** Anlass und Bezug ("auf Ihr Schreiben vom 12. Mai ...").', '**Hauptteil:** Sachverhalt, Begründung, Forderung oder Angebot; kurze Absätze.', '**Schluss:** Bitte, Frist, Dank, Angebot für Rückfragen.']],
    ['ex', ['**Beispiel (Reklamation):** Betreff: Reklamation der Lieferung vom 3. Mai 2026, Bestellnummer 4711. Sehr geehrte Damen und Herren, am 3. Mai erhielten wir 10 Monitore. Zwei Geräte zeigen Pixelfehler. Bitte ersetzen Sie die Geräte bis zum 20. Mai. Mit freundlichen Grüßen']],
  ],
});
