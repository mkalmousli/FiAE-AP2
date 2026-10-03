AP2.page('ps-aktivitaet', {
  b: 'ps', g: 'UML-Modellierung', t: 'Aktivitätsdiagramm',
  d: 'Ein **Aktivitätsdiagramm** beschreibt den **Ablauf** eines Vorgangs oder Algorithmus als Folge von **Aktionen** mit **Verzweigungen** (Entscheidungen), **Parallelität** (Gabelung/Vereinigung) und **Start/Ende**. Es ist die UML-Variante des Flussdiagramms.',
  m: '**Punkt = Start, Kreis mit Punkt = Ende, abgerundetes Rechteck = Aktion, Raute = Entscheidung, Balken = parallel (Fork/Join).** Jeder Weg ab einer Raute braucht eine **Bedingung in eckigen Klammern**.',
  cheat: [
    ['Knoten', ['**Startknoten:** ausgefüllter Kreis', '**Endknoten:** Kreis mit Punkt innen', '**Aktion:** abgerundetes Rechteck', '**Entscheidung/Zusammenführung:** Raute', '**Gabelung/Vereinigung:** dicker Balken']],
    ['Kanten', ['Pfeile zeigen die Reihenfolge', '**Guard** in eckigen Klammern: [ja], [betrag > 0]', 'Guards müssen sich ausschließen und alle Fälle abdecken', 'Nach Fork laufen alle Zweige parallel']],
    ['Erweiterungen', ['**Swimlanes (Partitionen):** Wer macht was?', '**Objektknoten:** Daten, die fließen', '**Schleife:** Rückkehr per Raute']],
    ['Wann benutzen?', ['Geschäftsprozesse beschreiben', 'Algorithmus grob entwerfen', 'Use Case im Detail zeigen']],
  ],
  blocks: [
    ['h', 'Wofür braucht man Aktivitätsdiagramme?'],
    ['p', 'Ein Klassendiagramm zeigt, **woraus** ein System besteht. Ein Aktivitätsdiagramm zeigt, **was nacheinander** passiert: den **Ablauf**. Es ist für Fachleute und Kunden leicht lesbar, deshalb wird es oft für **Geschäftsprozesse** verwendet (zum Beispiel "Bestellung bearbeiten") und für die Beschreibung des Ablaufs eines Anwendungsfalls.'],
    ['h', 'Die Bausteine'],
    ['table', ['Element', 'Symbol', 'Bedeutung'], [
      ['Startknoten', 'ausgefüllter Kreis', 'Hier beginnt der Ablauf (genau einer pro Diagramm).'],
      ['Aktion', 'Rechteck mit runden Ecken', 'Ein Schritt, kurz beschrieben mit Verb: "Bestellung prüfen".'],
      ['Entscheidung', 'Raute, ein Eingang, mehrere Ausgänge', 'Verzweigung. Jeder Ausgang trägt eine Bedingung [..].'],
      ['Zusammenführung (Merge)', 'Raute, mehrere Eingänge, ein Ausgang', 'Zweige laufen wieder zusammen. Es wird auf keinen gewartet.'],
      ['Gabelung (Fork)', 'Dicker Balken, ein Eingang, mehrere Ausgänge', 'Ab hier laufen mehrere Zweige **gleichzeitig**.'],
      ['Vereinigung (Join)', 'Dicker Balken, mehrere Eingänge', 'Es wird gewartet, bis **alle** Zweige fertig sind.'],
      ['Endknoten', 'Kreis mit ausgefülltem Punkt', 'Ende des gesamten Ablaufs.'],
    ]],
    ['h', 'Beispiel: Online-Bestellung'],
    ['diagram', {w: 640, h: 690, keep: 560, cap: 'Aktivitätsdiagramm der Bestellabwicklung mit Entscheidung und paralleler Prüfung.', nodes: [
      {id: 's', k: 'dot', x: 250, y: 22, t: ''}, {id: 'a1', k: 'round', x: 250, y: 84, t: 'Bestellung entgegennehmen', w: 220, h: 40, s: 'accent'},
      {id: 'd1', k: 'diamond', x: 250, y: 170, t: 'Artikel lieferbar?', w: 190, h: 76},
      {id: 'n1', k: 'round', x: 520, y: 170, t: 'Kunde informieren', w: 170, h: 40, s: 'bad'},
      {id: 'a2', k: 'round', x: 250, y: 262, t: 'Bestellung speichern', w: 220, h: 40, s: 'accent'},
      {id: 'f1', k: 'bar', x: 250, y: 330, w: 300, h: 8}, {id: 'p1', k: 'round', x: 130, y: 400, t: 'Zahlung prüfen', w: 170, h: 40, s: 'accent'}, {id: 'p2', k: 'round', x: 370, y: 400, t: 'Adresse prüfen', w: 170, h: 40, s: 'accent'},
      {id: 'j1', k: 'bar', x: 250, y: 470, w: 300, h: 8}, {id: 'a3', k: 'round', x: 250, y: 540, t: 'Versand auslösen', w: 220, h: 40, s: 'accent'},
      {id: 'e', k: 'ring', x: 250, y: 620, t: ''}, {id: 'e2', k: 'ring', x: 520, y: 620, t: ''},
    ], edges: [
      {a: 's', b: 'a1'}, {a: 'a1', b: 'd1'}, {a: 'd1', b: 'n1', t: '[nein]', lo: [0, -12]}, {a: 'd1', b: 'a2', t: '[ja]', lo: [20, 0]}, {a: 'a2', b: 'f1'},
      {a: [130, 330], b: 'p1', ea: 'arrow'}, {a: [370, 330], b: 'p2'}, {a: 'p1', b: [130, 470]}, {a: 'p2', b: [370, 470]}, {a: 'j1', b: 'a3'}, {a: 'a3', b: 'e'}, {a: 'n1', b: 'e2'},
    ]}],
    ['p', 'So liest du das Diagramm: Nach dem Start wird die Bestellung entgegengenommen. Dann folgt eine **Entscheidung**: Ist der Artikel lieferbar? Wenn nein, wird der Kunde informiert und der Ablauf endet. Wenn ja, wird gespeichert. Danach beginnen **Zahlung prüfen** und **Adresse prüfen gleichzeitig** (Fork). Erst wenn **beide** fertig sind (Join), wird der Versand ausgelöst.'],
  ],
});
