AP2.page('de-kommunikation', {
  b: 'de', g: 'Kommunikation', t: 'Kommunikationsmodelle',
  d: '**Kommunikation** ist der Austausch von Informationen zwischen **Sender** und **Empfänger**. Nach **Shannon und Weaver** wird eine **Nachricht** vom Sender **kodiert**, über einen **Kanal** gesendet, vom Empfänger **dekodiert**; **Störungen (Rauschen)** können sie verändern. Nach **Schulz von Thun** hat jede Nachricht **vier Seiten**: **Sachinhalt, Selbstoffenbarung, Beziehung, Appell**.',
  m: '**Vier Ohren: Sache, Selbst, Beziehung, Appell (SSBA).** **Eisberg: 20 % Sachebene sichtbar, 80 % Beziehungsebene verborgen.** **Man kann nicht nicht kommunizieren** (Watzlawick).',
  cheat: [
    ['Sender-Empfänger-Modell', ['**Sender** kodiert, **Kanal**, **Empfänger** dekodiert', '**Störungen:** Lärm, Fachsprache, Missverständnisse', '**Feedback** schließt den Kreis']],
    ['Vier-Seiten-Modell', ['**Sachinhalt:** Worüber informiere ich?', '**Selbstoffenbarung:** Was zeige ich von mir?', '**Beziehung:** Wie stehen wir zueinander?', '**Appell:** Was soll der andere tun?']],
    ['Watzlawick', ['**Man kann nicht nicht kommunizieren**', '**Inhalts- und Beziehungsaspekt**', 'Beziehungsaspekt bestimmt den Inhaltsaspekt', 'Digital (Wörter) vs. analog (Mimik, Gestik)']],
  ],
  blocks: [
    ['h', 'Sender-Empfänger-Modell (Shannon und Weaver)'],
    ['diagram', {w: 760, h: 170, keep: 620, cap: 'Das Sender-Empfänger-Modell mit Störung', nodes: [
      {id: 's', k: 'round', x: 80, y: 70, t: 'Sender', w: 110, h: 46, s: 'accent'}, {id: 'k', k: 'round', x: 240, y: 70, t: 'Kodieren', w: 110, h: 46}, {id: 'c', k: 'round', x: 400, y: 70, t: 'Kanal', w: 110, h: 46, s: 'solid'}, {id: 'd', k: 'round', x: 560, y: 70, t: 'Dekodieren', w: 110, h: 46}, {id: 'e', k: 'round', x: 700, y: 70, t: 'Empfänger', w: 110, h: 46, s: 'accent'}, {id: 'n', k: 'round', x: 400, y: 140, t: 'Störung (Rauschen)', w: 180, h: 32, s: 'bad', fs: 12},
    ], edges: [{a: 's', b: 'k'}, {a: 'k', b: 'c'}, {a: 'c', b: 'd'}, {a: 'd', b: 'e'}, {a: 'n', b: 'c', k: 'dash'}]}],
    ['p', 'Sender und Empfänger nutzen oft **unterschiedliche Codes** (Sprache, Fachbegriffe). Deshalb entstehen Missverständnisse. Das Modell ist **linear**; die Realität ist ein **Kreislauf** mit **Rückmeldung (Feedback)**.'],
    ['h', 'Vier-Seiten-Modell (Schulz von Thun)'],
    ['table', ['Seite', 'Frage', 'Beispiel "Die Ampel ist grün!" (Beifahrer zum Fahrer)'], [['**Sachinhalt**', 'Worüber informiere ich?', 'Die Ampel zeigt Grün.'], ['**Selbstoffenbarung**', 'Was gebe ich von mir preis?', 'Ich habe es eilig / ich bin ungeduldig.'], ['**Beziehung**', 'Was halte ich vom anderen?', 'Du brauchst meine Hilfe beim Fahren.'], ['**Appell**', 'Was soll der andere tun?', 'Fahr los!']]],
    ['ex', ['**Vier Ohren:** Der Empfänger kann auf jedem Ohr hören. Wer nur das **Beziehungsohr** nutzt, fühlt sich schnell **angegriffen**. Klare Kommunikation sendet auf **allen Ebenen übereinstimmend** (kongruent).']],
  ],
});
