AP2.add('eua-pseudocode', [
  ['h', 'Beispiel: Pseudocode lesen und auswerten'],
  ['code', 'pseudo', `ALGORITHMUS rätsel(a, b)
    WIEDERHOLE
        r ← a MOD b
        a ← b
        b ← r
    BIS b = 0
    GIB ZURÜCK a`],
  ['p', 'Was macht der Algorithmus? Teste mit a = 48, b = 18:'],
  ['table', ['Durchlauf', 'r = a MOD b', 'a', 'b'], [['Start', '-', '48', '18'], ['1', '48 MOD 18 = 12', '18', '12'], ['2', '18 MOD 12 = 6', '12', '6'], ['3', '12 MOD 6 = 0', '6', '0 (Ende)']]],
  ['p', 'Ergebnis: **6**. Der Algorithmus berechnet den **größten gemeinsamen Teiler (ggT)** nach Euklid. Eine solche Frage ("Welche Funktion erfüllt der Algorithmus?") kommt häufig vor. Der Weg: **Schreibtischtest mit einfachen Zahlen**, dann das Muster erkennen.'],
  ['h', 'Algorithmen mit Feldern (Arrays)'],
  ['code', 'pseudo', `FUNKTION maximum(feld, n)          // Felder ab Index 0
    max ← feld[0]
    FÜR i VON 1 BIS n - 1
        WENN feld[i] > max DANN
            max ← feld[i]
        ENDE WENN
    ENDE FÜR
    GIB ZURÜCK max`],
  ['codes', [
    ['java', `static int maximum(int[] feld) {
    int max = feld[0];
    for (int i = 1; i < feld.length; i++) {
        if (feld[i] > max) max = feld[i];
    }
    return max;
}`],
    ['python', `def maximum(feld):
    max_wert = feld[0]
    for i in range(1, len(feld)):
        if feld[i] > max_wert:
            max_wert = feld[i]
    return max_wert`],
  ]],
  ['h', 'Merkmale eines guten Algorithmus'],
  ['list', ['**Eindeutig und vollständig:** Jeder Schritt ist klar, alle Fälle sind behandelt.', '**Endlich (Terminierung):** Er endet nach endlich vielen Schritten.', '**Deterministisch:** Gleiche Eingabe liefert gleiche Ausgabe.', '**Korrekt:** Er löst das Problem für alle gültigen Eingaben.', '**Effizient:** Er braucht wenig Zeit und Speicher (siehe O-Notation).', '**Allgemein:** Er löst eine **Klasse** von Problemen, nicht nur einen Fall.']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Übersetzen Sie in Java: n ← 10; summe ← 0; SOLANGE n > 0 WIEDERHOLE summe ← summe + n; n ← n - 2; ENDE SOLANGE', ['`int n = 10; int summe = 0;`', '`while (n > 0) { summe = summe + n; n = n - 2; }`', 'Ergebnis: 10 + 8 + 6 + 4 + 2 = **30**.'], 4],
  ['qa', 'Was gibt der folgende Pseudocode für n = 5 aus? ergebnis ← 1; FÜR i VON 1 BIS n: ergebnis ← ergebnis mal i. Ausgabe ergebnis.', 'Er berechnet die **Fakultät**: 1 mal 1 mal 2 mal 3 mal 4 mal 5 = **120**.', 3],
  ['qa', 'Nennen Sie drei Eigenschaften, die ein Algorithmus erfüllen muss.', ['- **Eindeutigkeit** (jeder Schritt klar beschrieben)', '- **Endlichkeit** (er terminiert)', '- **Korrektheit** (löst das Problem richtig)', '- (Weiter: Determiniertheit, Effizienz, Allgemeingültigkeit)'], 3],
  ['quiz', [
    {q: 'Wofür steht a MOD b im Pseudocode?', o: ['Rest der Ganzzahldivision', 'Ergebnis der Division', 'Betrag von a', 'Potenz'], a: 0, e: 'MOD entspricht dem Operator % und liefert den Rest.'},
    {q: 'Was bedeutet das Symbol ← im Pseudocode meist?', o: ['Zuweisung', 'Vergleich', 'Rückgabe', 'Schleife'], a: 0, e: 'x ← 5 bedeutet: x bekommt den Wert 5.'},
    {q: 'Welche Schleife läuft mindestens einmal? (Pseudocode)', o: ['WIEDERHOLE ... BIS', 'SOLANGE ... WIEDERHOLE', 'FÜR ... VON ... BIS (mit leerem Bereich)', 'Keine'], a: 0, e: 'Bei WIEDERHOLE ... BIS wird die Bedingung erst nach dem Durchlauf geprüft.'},
    {q: 'Was ist bei der Übersetzung von Pseudocode mit Feld ab Index 1 in Java zu beachten?', o: ['Java beginnt bei Index 0', 'Java beginnt bei Index 1', 'Es gibt keinen Unterschied', 'Java hat keine Felder'], a: 0, e: 'Die Indizes müssen um 1 verschoben werden.'},
  ]],
]);
