AP2.page('course-java-07', {
  b: 'course', g: 'Java', t: 'Java 7: Methoden (Parameter, Rückgabe, Überladen, static)',
  d: 'Eine **Methode** fasst Anweisungen unter einem Namen zusammen. Ihr **Kopf** (Signatur) besteht aus Sichtbarkeit, eventuell `static`, **Rückgabetyp** (`void` = keine Rückgabe), Name und **Parameterliste** mit Typen. Java übergibt Argumente immer **by value**: Bei primitiven Typen wird der Wert kopiert, bei Objekten die **Referenz** (die Methode kann das Objekt verändern, aber nicht die Variable des Aufrufers umbiegen). **Überladen** heißt: mehrere Methoden mit gleichem Namen, aber unterschiedlichen Parameterlisten. `static`-Methoden gehören zur Klasse, nicht zu einem Objekt.',
  m: '**`public static int summe(int a, int b) { return a + b; }`** **Rückgabetyp nicht void -> jeder Pfad braucht return.** **Java: immer call by value (bei Objekten wird die Referenz kopiert).** **Überladen = gleicher Name, andere Parameter; Rückgabetyp allein reicht nicht.** **Aus `main` (static) nur static-Methoden direkt aufrufen.**',
  cheat: [
    ['Aufbau', ['`public` Sichtbarkeit', '`static` Klassenmethode (optional)', '`int` Rückgabetyp / `void`', '`name(Typ param, ...)`']],
    ['Rückgabe', ['`return wert;`', 'void: `return;` beendet vorzeitig', 'mehrere Werte: Objekt oder Array', 'jeder Pfad muss returnen']],
    ['Übergabe', ['primitiv: Kopie des Werts', 'Objekt: Kopie der Referenz', 'Array-Elemente änderbar', 'varargs: `int... zahlen`']],
    ['Überladen', ['`max(int, int)`', '`max(double, double)`', '`max(int, int, int)`', 'Compiler wählt passend']],
  ],
  blocks: [
    ['h', 'Methoden definieren und aufrufen'],
    ['code', 'java', `public class Rechnung {
    static final double MWST = 0.19;

    /** Berechnet den Bruttobetrag. @param netto Nettobetrag @return Bruttobetrag */
    public static double brutto(double netto) {
        return netto * (1 + MWST);
    }

    public static void druckeZeile(String text, double betrag) {   // void: keine Rückgabe
        System.out.printf("%-20s %10.2f EUR%n", text, betrag);
    }

    public static void main(String[] args) {
        double b = brutto(100);                 // Aufruf, Ergebnis speichern
        druckeZeile("Notebook (brutto)", b);
        druckeZeile("Maus (brutto)", brutto(20));   // Aufruf als Argument
    }
}`],
    ['h', 'Rückgabe in allen Pfaden'],
    ['code', 'java', `static String bewertung(int punkte) {
    if (punkte >= 50) {
        return "bestanden";
    } else if (punkte >= 30) {
        return "mündliche Ergänzung";
    }
    return "nicht bestanden";        // ohne diese Zeile: "missing return statement"
}

static boolean pruefeWert(double wert) {
    return wert >= 0.05 && wert <= 2.0;   // boolescher Ausdruck direkt zurückgeben
}`],
    ['h', 'Parameterübergabe: call by value'],
    ['code', 'java', `static void verdoppeln(int x) { x = x * 2; }          // ändert nur die Kopie
static void ersterAuf0(int[] feld) { feld[0] = 0; }   // ändert das Array-Objekt
static void neuesArray(int[] feld) { feld = new int[]{7, 7}; }   // biegt nur die lokale Referenz um

public static void main(String[] args) {
    int a = 5;
    verdoppeln(a);
    System.out.println(a);                    // 5

    int[] f = {1, 2, 3};
    ersterAuf0(f);
    System.out.println(Arrays.toString(f));   // [0, 2, 3]  <- verändert!
    neuesArray(f);
    System.out.println(Arrays.toString(f));   // [0, 2, 3]  <- unverändert
}`],
    ['def', '**Call by value:** Die Methode erhält eine **Kopie** des Arguments. Bei Referenztypen ist das eine Kopie der Referenz; beide zeigen auf dasselbe Objekt, deshalb sind Änderungen **am Objekt** sichtbar. **Call by reference** (die Methode erhält die Variable selbst) gibt es in Java nicht, in C# mit `ref`/`out`.'],
    ['h', 'Überladen (Overloading)'],
    ['code', 'java', `static int max(int a, int b)          { return a > b ? a : b; }
static int max(int a, int b, int c)   { return max(max(a, b), c); }
static double max(double a, double b) { return a > b ? a : b; }

max(3, 7);         // int-Version     -> 7
max(3, 7, 5);      // drei Parameter  -> 7
max(2.5, 1.0);     // double-Version  -> 2.5
// static double max(int a, int b) wäre ein FEHLER: nur der Rückgabetyp unterscheidet sich`],
    ['h', 'Variable Parameteranzahl (varargs)'],
    ['code', 'java', `static double durchschnitt(double... werte) {   // werte ist ein double[]
    if (werte.length == 0) return 0;
    double s = 0;
    for (double w : werte) s += w;
    return s / werte.length;
}
durchschnitt(2, 3, 4);       // 3.0
durchschnitt();              // 0`],
    ['h', 'static oder nicht?'],
    ['table', ['', 'static-Methode (Klassenmethode)', 'Instanzmethode'], [
      ['Aufruf', '`Klasse.methode()`, zum Beispiel `Math.sqrt(2)`', '`objekt.methode()`, zum Beispiel `konto.einzahlen(50)`'],
      ['Zugriff auf Attribute', 'Nur static-Attribute', 'Auf alle Attribute des Objekts (`this`)'],
      ['Einsatz', 'Hilfsfunktionen ohne Zustand, Fabrikmethoden, `main`, Singleton `gibInstanz()`', 'Alles, was mit den Daten eines Objekts arbeitet'],
    ]],
    ['warn', '"non-static method cannot be referenced from a static context": In `main` (static) kann man eine Instanzmethode nicht direkt aufrufen. Entweder die Methode `static` machen oder ein Objekt erzeugen: `new Rechner().berechne()`.'],
    ['h', 'Rekursive Methoden'],
    ['code', 'java', `static long fakultaet(int n) {
    if (n <= 1) return 1;            // Basisfall
    return n * fakultaet(n - 1);     // Rekursion
}

static int ggT(int a, int b) {       // Euklid: ggT(48, 18) = 6
    return b == 0 ? a : ggT(b, a % b);
}`],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie eine Methode `static double distanz(double lon1, double lat1, double lon2, double lat2)`, die mit 1° Breite = 111,13 km und 1° Länge = 71,44 km die Entfernung nach Pythagoras berechnet (Sommer 2022).', [['code', 'java', `static double distanz(double lon1, double lat1, double lon2, double lat2) {
    double dLat = (lat2 - lat1) * 111.13;
    double dLon = (lon2 - lon1) * 71.44;
    return Math.sqrt(dLat * dLat + dLon * dLon);
}`]], 4],
    ['qa', 'Überladen Sie eine Methode `flaeche`, die für einen Parameter die Kreisfläche, für zwei Parameter die Rechteckfläche berechnet.', [['code', 'java', `static double flaeche(double radius) { return Math.PI * radius * radius; }
static double flaeche(double laenge, double breite) { return laenge * breite; }`]], 3],
    ['quiz', [
      {q: 'Was bedeutet void als Rückgabetyp?', o: ['Die Methode gibt nichts zurück', 'Die Methode ist leer', 'Die Methode ist privat', 'Die Methode gibt null zurück'], a: 0, e: 'return; ist trotzdem erlaubt.'},
      {q: 'Welche zwei Methoden sind gültige Überladungen?', o: ['int f(int a) und int f(double a)', 'int f(int a) und double f(int a)', 'int f(int a) und int f(int b)', 'Keine'], a: 0, e: 'Parameterliste muss sich unterscheiden.'},
      {q: 'Wie übergibt Java Objekte an Methoden?', o: ['Die Referenz wird als Kopie übergeben (call by value)', 'Echtes call by reference', 'Das Objekt wird kopiert', 'Gar nicht'], a: 0, e: 'Änderungen am Objekt sind sichtbar.'},
      {q: 'Was gibt main nach int x = 1; erhoehe(x); aus, wenn erhoehe(int a) { a++; }?', o: ['1', '2', 'Fehler', '0'], a: 0, e: 'Kopie des Werts.'},
    ]],
    ['see', ['course-java-06', 'course-java-08', 'eua-funktionen']],
  ],
});
