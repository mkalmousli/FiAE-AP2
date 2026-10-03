AP2.page('exam1-eua', {b: 'exam', g: 'Probeprüfung 1', t: 'Entwicklung und Umsetzung von Algorithmen', blocks: []});
AP2.exam.start('exam1-eua', {minutes: 90, hint: 'Bearbeitungszeit 90 Minuten, 100 Punkte. Programmieraufgaben dürfen in Java, C#, Python oder Pseudocode gelöst werden; auf Syntaxdetails kommt es weniger an als auf die Logik. Vergleiche dich danach mit der Musterlösung und bewerte dich ehrlich. Ausgangslage: Du entwickelst für die FitPlan GmbH Komponenten des Kursbuchungsportals.'});
AP2.exam.part('exam1-eua', {
  t: 'Handlungsschritt 1: Algorithmen verstehen und entwerfen (20 Punkte)',
  tasks: [
    {pts: 4, rows: 5, q: 'Der folgende Algorithmus wird mit zahl = 4729 aufgerufen. Erstellen Sie eine Wertetabelle (Schleifendurchläufe) und geben Sie das Ergebnis an.',
      ctx: [['code', 'text', `FUNKTION unbekannt(zahl)
  summe <- 0
  SOLANGE zahl > 0
    summe <- summe + (zahl MOD 10)
    zahl  <- zahl DIV 10
  ENDE SOLANGE
  RETURN summe`]],
      a: ['- Start: zahl 4729, summe 0', '- 1. Durchlauf: summe = 9, zahl = 472', '- 2. Durchlauf: summe = 11, zahl = 47', '- 3. Durchlauf: summe = 18, zahl = 4', '- 4. Durchlauf: summe = 22, zahl = 0 (Abbruch)', 'Ergebnis: **22**']},
    {pts: 2, q: 'Welche Aufgabe erfüllt der Algorithmus?', a: ['Er berechnet die **Quersumme** einer natürlichen Zahl (MOD 10 liefert die letzte Ziffer, DIV 10 schneidet sie ab).']},
    {pts: 6, rows: 8, q: 'Schreiben Sie eine Funktion istPrim(n), die true zurückgibt, wenn n eine Primzahl ist, sonst false. (Pseudocode oder Programmiersprache). Teilen Sie nur durch Zahlen bis zur Wurzel von n.',
      a: ['Mögliche Lösung (Python, siehe Code). Punkte: Sonderfall n < 2 (1), Schleife bis i*i <= n (2), Teilbarkeitstest mit Modulo (2), Rückgabewerte korrekt (1).'],
      sol: [['code', 'python', `def ist_prim(n):
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True`]]},
    {pts: 4, q: 'Bestimmen Sie die Laufzeitkomplexität (O-Notation) und begründen Sie kurz: a) zwei ineinander geschachtelte Schleifen, die jeweils von 1 bis n laufen; b) binäre Suche in einem sortierten Feld mit n Elementen.',
      a: ['a) **O(n^2)**: Die innere Schleife wird n-mal ausgeführt, je n Durchläufe, zusammen n mal n.', 'b) **O(log n)**: Der Suchbereich wird in jedem Schritt **halbiert**.']},
    {pts: 4, q: 'Nennen Sie die drei Grundkonstrukte der strukturierten Programmierung und je ein Beispiel.',
      a: ['- **Sequenz:** Anweisungen nacheinander (a = 1; b = 2;).', '- **Auswahl (Verzweigung):** if/else, switch.', '- **Wiederholung (Schleife):** for, while, do-while.']},
  ],
});
AP2.exam.part('exam1-eua', {
  t: 'Handlungsschritt 2: Datenstrukturen und Algorithmen (20 Punkte)',
  tasks: [
    {pts: 4, rows: 4, q: 'Gegeben sind die Operationen: 3 hinzufügen, 5 hinzufügen, entfernen, 7 hinzufügen, entfernen. Welche Werte werden entfernt und was bleibt übrig a) bei einem Stack, b) bei einer Queue?',
      a: ['a) **Stack (LIFO):** push 3, push 5, pop liefert **5**, push 7, pop liefert **7**; übrig: **[3]**.', 'b) **Queue (FIFO):** enqueue 3, enqueue 5, dequeue liefert **3**, enqueue 7, dequeue liefert **5**; übrig: **[7]**.']},
    {pts: 5, rows: 5, q: 'Sortieren Sie das Feld [5, 2, 4, 1] mit Bubble Sort aufsteigend. Geben Sie den Zustand des Feldes nach jedem Durchlauf an und nennen Sie die Komplexität im schlechtesten Fall.',
      a: ['- Nach Durchlauf 1: [2, 4, 1, 5] (5 wandert nach hinten)', '- Nach Durchlauf 2: [2, 1, 4, 5]', '- Nach Durchlauf 3: [1, 2, 4, 5] (sortiert)', 'Komplexität im schlechtesten Fall: **O(n^2)** (benachbarte Elemente werden verglichen und getauscht).']},
    {pts: 5, rows: 5, q: 'Suchen Sie die Zahl 26 im sortierten Feld [3, 8, 12, 17, 21, 26, 31, 38] (Index ab 0) mit binärer Suche. Geben Sie jeden Schritt (untere/obere Grenze, Mitte) an und nennen Sie die Voraussetzung.',
      a: ['- Schritt 1: unten 0, oben 7, Mitte 3 (Wert 17) ist kleiner als 26, also rechte Hälfte: unten = 4.', '- Schritt 2: unten 4, oben 7, Mitte 5 (Wert 26): **gefunden an Index 5** (2 Vergleiche).', 'Voraussetzung: Das Feld muss **sortiert** sein (und Zugriff per Index möglich).']},
    {pts: 6, rows: 6, q: 'Die Zahlen 8, 3, 10, 1, 6 werden in dieser Reihenfolge in einen leeren binären Suchbaum eingefügt. Beschreiben Sie den entstehenden Baum und geben Sie die In-Order-Ausgabe an. Was fällt an der Ausgabe auf?',
      a: ['- Wurzel **8**; links **3** (kleiner), rechts **10** (größer).', '- 1 ist kleiner als 8 und 3: linkes Kind von 3. 6 ist kleiner als 8, größer als 3: rechtes Kind von 3.', '- In-Order (links, Knoten, rechts): **1, 3, 6, 8, 10**.', 'Die Ausgabe ist **aufsteigend sortiert**: Die Suchbaum-Eigenschaft (links kleiner, rechts größer) sorgt dafür.'],
      sol: [['diagram', AP2.dg.tree({t: '8', c: [{t: '3', c: [{t: '1'}, {t: '6'}]}, {t: '10'}]}, {cap: 'Der entstehende Suchbaum'})]]},
  ],
});
