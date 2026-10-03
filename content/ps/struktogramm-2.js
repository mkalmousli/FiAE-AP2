AP2.add('ps-struktogramm', [
  ['h', 'Gegenüberstellung der Schleifen'],
  ['table', ['Schleife', 'Bedingung', 'Mindestens 1 Durchlauf?', 'Java / C#', 'Python'], [
    ['kopfgesteuert (while)', 'oben', 'nein', 'while (...) { }', 'while ...:'],
    ['zählergesteuert (for)', 'oben, mit Zähler', 'nein', 'for (int i = 0; i < n; i++)', 'for i in range(n):'],
    ['fußgesteuert (do-while)', 'unten', 'ja', 'do { } while (...);', 'while True: ... if bed: break'],
  ]],
  ['warn', 'Achtung bei fußgesteuerten Schleifen: Im Struktogramm steht die **Abbruchbedingung** ("bis ...") oft anders herum als in Java ("while ..."). Aus "bis eingabe > 0" wird in Java `do { } while (eingabe <= 0);`. Die Schleife läuft, **solange die Bedingung falsch ist** (bis sie wahr wird).'],
  ['h', 'Komplettes Beispiel: Primzahlprüfung'],
  ['p', 'Aufgabe: Lies eine Zahl n und prüfe, ob sie eine Primzahl ist (nur durch 1 und sich selbst teilbar).'],
  ['diagram', AP2.dg.nsd([
    ['act', 'n einlesen'],
    ['if', 'n < 2', [['act', 'keine Primzahl']], [
      ['act', 'istPrim = wahr; teiler = 2'],
      ['while', 'solange teiler * teiler <= n', [['if', 'n mod teiler = 0', [['act', 'istPrim = falsch']], []], ['act', 'teiler = teiler + 1']]],
      ['if', 'istPrim', [['act', 'Primzahl']], [['act', 'keine Primzahl']]],
    ]],
  ], {w: 640, cap: 'Struktogramm: Primzahltest'})],
  ['code', 'python', `n = int(input())
if n < 2:
    print("keine Primzahl")
else:
    ist_prim = True
    teiler = 2
    while teiler * teiler <= n:
        if n % teiler == 0:
            ist_prim = False
        teiler += 1
    print("Primzahl" if ist_prim else "keine Primzahl")`],
  ['h', 'Struktogramm erstellen: Vorgehen'],
  ['steps', ['Aufgabe lesen und **Eingaben, Ausgaben, Ablauf** markieren.', 'Prüfen: Wo gibt es **Entscheidungen** (wenn/sonst) und **Wiederholungen** (solange, für jeden)?', 'Mit der **Sequenz** beginnen: Eingaben lesen, Variablen initialisieren.', 'Verzweigungen und Schleifen als **verschachtelte Kästen** einzeichnen.', 'Mit einem **Beispiel durchspielen** (Schreibtischtest): Stimmt das Ergebnis?']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Stellen Sie den folgenden Algorithmus als Struktogramm dar (Beschreibung): Es werden Zahlen eingelesen, bis 0 eingegeben wird. Die Zahlen werden addiert. Am Ende wird die Summe ausgegeben.', ['Struktogramm:', '- Kasten: summe = 0', '- Fußgesteuerte Schleife (bis zahl = 0): zahl einlesen; summe = summe + zahl', '- Kasten: summe ausgeben', 'Alternativ als kopfgesteuerte Schleife mit vorherigem Einlesen der ersten Zahl.'], 6],
  ['qa', 'Nennen Sie zwei Vor- und zwei Nachteile von Struktogrammen gegenüber Programmablaufplänen.', ['**Vorteile:** erzwingen strukturierte Programmierung (keine Sprünge); direkt in Code übersetzbar, gut lesbar.', '**Nachteile:** Änderungen aufwendig, weil Kästen verschachtelt sind; bei tiefer Verschachtelung wenig Platz und unübersichtlich.'], 4],
  ['qa', 'Was ist der Unterschied zwischen einer kopfgesteuerten und einer fußgesteuerten Schleife?', 'Die **kopfgesteuerte** Schleife prüft die Bedingung **vor** jedem Durchlauf und läuft eventuell nie. Die **fußgesteuerte** Schleife prüft die Bedingung **nach** dem Durchlauf und läuft daher **mindestens einmal**.', 3],
  ['quiz', [
    {q: 'Welche drei Grundstrukturen kennt ein Struktogramm?', o: ['Sequenz, Auswahl, Wiederholung', 'Start, Ende, Sprung', 'Klasse, Objekt, Methode', 'Tabelle, Spalte, Zeile'], a: 0, e: 'Sequenz (Folge), Auswahl (Verzweigung) und Wiederholung (Schleife).'},
    {q: 'Welche Schleife läuft mindestens einmal?', o: ['Fußgesteuerte Schleife (do-while)', 'Kopfgesteuerte Schleife', 'Keine', 'for-Schleife mit falscher Bedingung'], a: 0, e: 'Bei der fußgesteuerten Schleife steht die Prüfung nach dem Rumpf.'},
    {q: 'Wie wird die Auswahl im Struktogramm gekennzeichnet?', o: ['Dreieck mit Ja und Nein', 'Raute', 'Kreis', 'Ovale Form'], a: 0, e: 'Die Auswahl hat ein Dreieck in der Kopfzeile, links Ja, rechts Nein.'},
    {q: 'Was gibt es im Struktogramm NICHT?', o: ['Sprungpfeile (goto)', 'Verschachtelung', 'Schleifen', 'Verzweigungen'], a: 0, e: 'Struktogramme kommen ohne Sprünge aus, deshalb sind sie strukturiert.'},
  ]],
]);
