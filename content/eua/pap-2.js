AP2.add('eua-pap', [
  ['h', 'Beispiel 3: Passwort-Eingabe (maximal 3 Versuche)'],
  ['diagram', {w: 700, h: 520, keep: 520, cap: 'PAP mit Zähler und zwei Abbruchbedingungen', nodes: [
    {id: 's', k: 'term', x: 260, y: 24, t: 'Start', w: 90, h: 32}, {id: 'z', k: 'box', x: 260, y: 82, t: 'versuche = 0', w: 160, h: 38}, {id: 'v', k: 'diamond', x: 260, y: 158, t: 'versuche < 3 ?', w: 170, h: 66}, {id: 'e', k: 'para', x: 260, y: 240, t: 'Passwort eingeben', w: 180, h: 40},
    {id: 'p', k: 'diamond', x: 260, y: 320, t: 'Passwort richtig ?', w: 190, h: 70}, {id: 'inc', k: 'box', x: 260, y: 410, t: 'versuche = versuche + 1', w: 210, h: 38, s: 'bad'}, {id: 'ok', k: 'para', x: 540, y: 320, t: '"Zugang erlaubt"', w: 170, h: 40, s: 'ok'}, {id: 'no', k: 'para', x: 540, y: 158, t: '"Konto gesperrt"', w: 170, h: 40, s: 'bad'}, {id: 'en', k: 'term', x: 540, y: 240, t: 'Ende', w: 90, h: 32},
  ], edges: [{a: 's', b: 'z'}, {a: 'z', b: 'v'}, {a: 'v', b: 'e', t: 'ja', lo: [16, 0]}, {a: 'e', b: 'p'}, {a: 'p', b: 'inc', t: 'nein', lo: [18, 0]}, {a: 'inc', b: 'v', via: [[90, 410], [90, 158]]}, {a: 'p', b: 'ok', t: 'ja', lo: [0, -12]}, {a: 'v', b: 'no', t: 'nein', lo: [0, -12]}, {a: 'ok', b: 'en', via: [[540, 270]], ea: 'none'}, {a: 'no', b: 'en'}]}],
  ['h', 'Der Weg vom PAP zum Code'],
  ['table', ['PAP-Element', 'Codekonstrukt'], [
    ['Rechteck', 'Anweisung (`summe = summe + i;`)'],
    ['Parallelogramm', 'Ein-/Ausgabe (`Scanner`, `System.out.println`, `print`, `input`)'],
    ['Raute mit Ja und Nein', '`if (...) { ... } else { ... }`'],
    ['Rückwärtspfeil zu einer Raute', '`while (...) { ... }` (kopfgesteuert) oder `for`'],
    ['Rückwärtspfeil nach dem Rechteck zu davorliegender Aktion', '`do { ... } while (...);` (fußgesteuert)'],
    ['Unterprogramm-Symbol', 'Methodenaufruf'],
  ]],
  ['code', 'python', `# Übersetzung des Summen-PAPs (Beispiel 2)
n = int(input("n eingeben: "))
summe = 0
i = 1
while i <= n:            # Raute: i <= n ?
    summe = summe + i    # Rechteck
    i = i + 1            # Rechteck, Pfeil zurück zur Raute
print(summe)             # Parallelogramm (Ausgabe)`],
  ['h', 'PAP, Struktogramm und Aktivitätsdiagramm im Vergleich'],
  ['table', ['Merkmal', 'PAP', 'Struktogramm', 'UML-Aktivitätsdiagramm'], [
    ['Norm', 'DIN 66001', 'DIN 66261', 'UML'],
    ['Struktur', 'Frei, Sprünge möglich', 'Streng strukturiert, verschachtelt', 'Frei, mit Fork/Join'],
    ['Parallelität', 'Nein', 'Nein', 'Ja'],
    ['Übersichtlichkeit', 'Gut bei kleinen Abläufen, wird bei großen unübersichtlich', 'Kompakt, aber schwer änderbar', 'Gut für Prozesse'],
    ['Typische Verwendung', 'Algorithmen erklären', 'Algorithmen strukturiert entwerfen', 'Geschäftsprozesse, Abläufe'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Zeichnen Sie einen PAP, der zwei Zahlen einliest und anschließend die Summe ausgibt, wenn beide positiv sind, sonst die Meldung "Ungültig".', ['Start (Terminator) - Eingabe a, b (Parallelogramm) - Raute "a > 0 und b > 0 ?"', '- ja: Operation "summe = a + b" - Ausgabe summe - Ende', '- nein: Ausgabe "Ungültig" - Ende', 'Wichtig: Beide Ausgänge der Raute beschriften, beide Zweige münden in das Ende.'], 6],
  ['qa', 'Welche Symbole werden in einem PAP für Eingabe, Verzweigung und Unterprogramm verwendet?', ['- Eingabe/Ausgabe: **Parallelogramm**', '- Verzweigung: **Raute**', '- Unterprogramm: **Rechteck mit zwei senkrechten Doppelstrichen** an den Seiten'], 3],
  ['qa', 'Welchen Wert hat z nach dem Ablauf? Start: a = 7, z = 0. Solange a > 0: a = a - 2, z = z + 1.', ['a: 7, 5, 3, 1, -1. Durchläufe bei a = 7, 5, 3, 1: **4 Durchläufe**.', 'z = **4**, a = -1.'], 4],
  ['quiz', [
    {q: 'Welches Symbol steht im PAP für eine Verzweigung?', o: ['Raute', 'Rechteck', 'Parallelogramm', 'Kreis'], a: 0, e: 'Die Raute enthält die Bedingung und hat zwei Ausgänge (ja/nein).'},
    {q: 'Wofür steht das Parallelogramm?', o: ['Ein- oder Ausgabe', 'Berechnung', 'Start', 'Fehler'], a: 0, e: 'Parallelogramme kennzeichnen Ein- und Ausgaben.'},
    {q: 'Wie wird eine Schleife im PAP dargestellt?', o: ['Durch einen Pfeil zurück zu einer früheren Stelle', 'Durch ein eigenes Symbol "Schleife"', 'Gar nicht', 'Durch zwei Rechtecke'], a: 0, e: 'Der Ablaufpfeil führt zurück zur Bedingung (kopfgesteuert) oder zur ersten Anweisung (fußgesteuert).'},
    {q: 'Welche DIN-Norm beschreibt den PAP?', o: ['DIN 66001', 'DIN 5008', 'DIN 69901', 'DIN 66261'], a: 0, e: 'DIN 66001 (Sinnbilder für Datenfluss- und Programmablaufpläne). DIN 66261 betrifft Struktogramme.'},
  ]],
]);
