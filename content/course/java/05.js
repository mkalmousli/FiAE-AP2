AP2.page('course-java-05', {
  b: 'course', g: 'Java', t: 'Java 5: Arrays (ein- und zweidimensional)',
  d: 'Ein **Array** (Feld) speichert eine **feste Anzahl** von Werten **desselben Typs** hintereinander im Speicher. Die Länge wird beim Erzeugen festgelegt und kann sich danach **nicht** ändern (dafür gibt es `ArrayList`). Der Zugriff erfolgt über den **Index** von `0` bis `length - 1` in konstanter Zeit O(1). Arrays sind **Objekte** (Referenztyp): `int[] b = a;` kopiert nur den Verweis. **Zweidimensionale Arrays** sind Arrays von Arrays und eignen sich für Tabellen und Matrizen.',
  m: '**`int[] a = new int[5];` -> fünf Nullen. `int[] b = {3, 1, 2};` -> mit Werten.** **Länge: `a.length` (ohne Klammern!), bei String `s.length()`, bei ArrayList `list.size()`.** **Letzter Index = length - 1.** **Ausgeben: `Arrays.toString(a)`.** **Kopieren: `Arrays.copyOf(a, a.length)` oder `a.clone()`.**',
  cheat: [
    ['Erzeugen', ['`int[] a = new int[5];`', '`String[] s = {"x", "y"};`', '`double[][] m = new double[3][4];`', 'Standardwerte: 0, 0.0, false, null']],
    ['Zugriff', ['`a[0] = 42;`', '`a[a.length - 1]` letztes', '`m[zeile][spalte]`', 'falscher Index: ArrayIndexOutOfBoundsException']],
    ['java.util.Arrays', ['`Arrays.toString(a)`', '`Arrays.sort(a)`', '`Arrays.fill(a, 0)`', '`Arrays.copyOf(a, neueLaenge)`']],
    ['Durchlaufen', ['`for (int i = 0; i < a.length; i++)`', '`for (int x : a)` nur lesen', '2D: zwei verschachtelte Schleifen', '`m.length` Zeilen, `m[0].length` Spalten']],
  ],
  blocks: [
    ['h', 'Arrays erzeugen und benutzen'],
    ['code', 'java', `int[] punkte = new int[4];          // Platz für 4 int, alle 0
punkte[0] = 85;
punkte[1] = 92;
punkte[3] = 67;                     // punkte[2] bleibt 0
System.out.println(punkte.length);  // 4
System.out.println(Arrays.toString(punkte));   // [85, 92, 0, 67]

String[] tage = {"Mo", "Di", "Mi", "Do", "Fr"};   // Initialisierungsliste
System.out.println(tage[tage.length - 1]);        // Fr`],
    ['warn', '`System.out.println(punkte);` gibt **nicht** den Inhalt aus, sondern etwas wie `[I@1b6d3586` (Typ und Hashcode der Referenz). Für den Inhalt: `Arrays.toString(punkte)`.'],
    ['h', 'Standardalgorithmen auf Arrays'],
    ['code', 'java', `double[] werte = {12.5, 7.0, 19.25, 3.5};

double summe = 0;                              // Summe und Durchschnitt
for (double w : werte) summe += w;
double schnitt = summe / werte.length;

double max = werte[0]; int maxPos = 0;         // Maximum mit Position
for (int i = 1; i < werte.length; i++) {
    if (werte[i] > max) { max = werte[i]; maxPos = i; }
}

int gefunden = -1;                             // lineare Suche
for (int i = 0; i < werte.length; i++) {
    if (werte[i] == 7.0) { gefunden = i; break; }
}

for (int i = 0; i < werte.length / 2; i++) {   // umdrehen (in place)
    double tmp = werte[i];
    werte[i] = werte[werte.length - 1 - i];
    werte[werte.length - 1 - i] = tmp;
}`],
    ['h', 'Arrays sind Referenzen'],
    ['code', 'java', `int[] a = {1, 2, 3};
int[] b = a;                  // KEINE Kopie: b zeigt auf dasselbe Array
b[0] = 99;
System.out.println(a[0]);     // 99

int[] c = a.clone();          // echte Kopie (für primitive Typen)
int[] d = Arrays.copyOf(a, 5);  // Kopie mit neuer Länge: [99, 2, 3, 0, 0]
System.out.println(Arrays.equals(a, c));   // true: inhaltlich gleich (a == c wäre false)`],
    ['p', 'Wird ein Array an eine Methode übergeben, bekommt die Methode eine Kopie der **Referenz**. Änderungen an den Elementen sind deshalb auch beim Aufrufer sichtbar.'],
    ['h', 'Array wachsen lassen?'],
    ['p', 'Ein Array hat eine feste Länge. Braucht man mehr Platz, muss man ein **größeres Array anlegen und umkopieren** (genau das macht `ArrayList` intern automatisch). In der Prüfung gilt: Ist die Anzahl unbekannt oder ändert sie sich, ist `ArrayList` die bessere Wahl.'],
    ['code', 'java', `Person[] personen = new Person[10];   // höchstens 10 Personen (Winter 2023/24)
int anzahl = 0;                         // wie viele Plätze sind belegt?
personen[anzahl++] = new Kind("Max", 1.7);
for (int i = 0; i < anzahl; i++) {      // nur belegte Plätze durchlaufen (Rest ist null!)
    System.out.println(personen[i].getNachname());
}`],
    ['h', 'Zweidimensionale Arrays'],
    ['code', 'java', `int[][] matrix = {
    {1, 2, 3},       // Zeile 0
    {4, 5, 6},       // Zeile 1
};
System.out.println(matrix[1][2]);       // 6 (Zeile 1, Spalte 2)
System.out.println(matrix.length);      // 2 Zeilen
System.out.println(matrix[0].length);   // 3 Spalten

for (int z = 0; z < matrix.length; z++) {
    for (int s = 0; s < matrix[z].length; s++) {
        System.out.print(matrix[z][s] + "\\t");
    }
    System.out.println();
}

// Sitzplan: 5 Reihen à 8 Plätze, true = belegt
boolean[][] belegt = new boolean[5][8];
belegt[2][3] = true;`],
    ['h', 'Sortieren'],
    ['code', 'java', `int[] z = {5, 1, 4, 2};
Arrays.sort(z);                              // [1, 2, 4, 5] (aufsteigend, in place)

Integer[] zz = {5, 1, 4, 2};                 // für absteigend Objekttyp nötig
Arrays.sort(zz, Collections.reverseOrder()); // [5, 4, 2, 1]

// selbst geschrieben: Bubble Sort
for (int i = 0; i < z.length - 1; i++) {
    for (int j = 0; j < z.length - 1 - i; j++) {
        if (z[j] > z[j + 1]) {
            int tmp = z[j]; z[j] = z[j + 1]; z[j + 1] = tmp;
        }
    }
}`],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie eine Methode `static int zaehleUeber(int[] werte, int grenze)`, die zählt, wie viele Werte größer als die Grenze sind.', [['code', 'java', `static int zaehleUeber(int[] werte, int grenze) {
    int anzahl = 0;
    for (int w : werte) {
        if (w > grenze) anzahl++;
    }
    return anzahl;
}`]], 3],
    ['qa', 'Gegeben `int[][] umsatz = new int[4][12]` (4 Filialen, 12 Monate). Berechnen Sie den Jahresumsatz jeder Filiale und den Monat mit dem höchsten Gesamtumsatz.', [['code', 'java', `for (int f = 0; f < umsatz.length; f++) {
    int jahr = 0;
    for (int m = 0; m < umsatz[f].length; m++) jahr += umsatz[f][m];
    System.out.println("Filiale " + (f + 1) + ": " + jahr);
}
int besterMonat = 0, besterWert = -1;
for (int m = 0; m < 12; m++) {
    int summe = 0;
    for (int f = 0; f < umsatz.length; f++) summe += umsatz[f][m];
    if (summe > besterWert) { besterWert = summe; besterMonat = m + 1; }
}
System.out.println("Bester Monat: " + besterMonat);`]], 6],
    ['quiz', [
      {q: 'Wie ermittelt man die Länge eines Arrays a?', o: ['a.length', 'a.length()', 'a.size()', 'len(a)'], a: 0, e: 'Feld, keine Methode.'},
      {q: 'Welchen Wert hat ein Element von new int[3] direkt nach dem Erzeugen?', o: ['0', 'null', 'undefiniert', '3'], a: 0, e: 'Standardwert für int ist 0.'},
      {q: 'Was gibt Arrays.toString(new String[2]) aus?', o: ['[null, null]', '[, ]', '[]', 'Fehler'], a: 0, e: 'Objekt-Arrays starten mit null.'},
      {q: 'Was gilt nach int[] b = a; b[0] = 5;?', o: ['a[0] ist auch 5', 'a bleibt unverändert', 'Compilerfehler', 'b ist eine Kopie'], a: 0, e: 'Gleiche Referenz.'},
      {q: 'Wie viele Spalten hat m in int[][] m = new int[3][4]?', o: ['4', '3', '12', '7'], a: 0, e: 'Erste Zahl = Zeilen.'},
    ]],
    ['see', ['course-java-04', 'course-java-06', 'eua-listen']],
  ],
});
