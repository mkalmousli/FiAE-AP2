AP2.page('course-java-02', {
  b: 'course', g: 'Java', t: 'Java 2: Datentypen, Variablen, Operatoren und Typumwandlung',
  d: 'Java ist **statisch typisiert**: Jede Variable bekommt bei der **Deklaration** einen festen **Datentyp**, den der Compiler prüft. Es gibt acht **primitive Datentypen** (`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`), die den Wert direkt speichern, und **Referenztypen** (Klassen wie `String`, Arrays, eigene Klassen), die auf ein Objekt im Speicher (Heap) verweisen. Operatoren verknüpfen Werte; bei Zahlen unterschiedlichen Typs wird **implizit erweitert** (int -> double), die umgekehrte Richtung braucht einen **expliziten Cast** `(int) 3.9`.',
  m: '**Ganzzahl / Ganzzahl = Ganzzahl** (`7 / 2` = 3). **`%` = Rest.** **`==` vergleicht bei Objekten die Referenz -> Strings mit `equals()`.** **double für Messwerte, für Geld besser `BigDecimal` (exakt).** **`final` = Konstante.** **`var` lässt den Compiler den Typ ableiten (lokal).**',
  cheat: [
    ['Ganzzahlen', ['`byte` 8 Bit (-128..127)', '`short` 16 Bit', '`int` 32 Bit (±2,1 Mrd.)', '`long` 64 Bit, Literal `5L`']],
    ['Weitere Primitive', ['`double` 64 Bit Kommazahl', '`float` 32 Bit, Literal `1.5f`', '`char` 16 Bit Unicode `\'A\'`', '`boolean` true/false']],
    ['Operatoren', ['`+ - * / %`', '`++ -- += -=`', '`== != < > <= >=`', '`&& || !` (Kurzschluss)']],
    ['Umwandlung', ['implizit: int -> long -> double', 'explizit: `(int) 3.99` -> 3', '`Integer.parseInt("42")`', '`String.valueOf(42)`, `"" + 42`']],
  ],
  blocks: [
    ['h', 'Variablen deklarieren und initialisieren'],
    ['code', 'java', `int anzahl;                 // Deklaration: Typ + Name
anzahl = 10;                // Zuweisung (Initialisierung)
double preis = 5.99;        // Deklaration und Initialisierung in einem
String name = "Feuerdorn";  // String ist eine Klasse (Referenztyp)
boolean vorraetig = true;
char kategorie = 'P';       // char in EINFACHEN Anführungszeichen
final double MWST = 0.19;   // Konstante, Name in GROSSBUCHSTABEN
var menge = 25;             // Typ int wird abgeleitet (seit Java 10)`],
    ['warn', 'Lokale Variablen müssen **vor der ersten Verwendung** einen Wert bekommen, sonst meldet der Compiler "variable might not have been initialized". Attribute einer Klasse haben dagegen Standardwerte (0, false, null).'],
    ['h', 'Die primitiven Datentypen'],
    ['table', ['Typ', 'Größe', 'Wertebereich / Beispiel', 'Einsatz'], [
      ['`byte`', '8 Bit', '-128 bis 127', 'Binärdaten, Dateien'],
      ['`short`', '16 Bit', '-32.768 bis 32.767', 'selten'],
      ['`int`', '32 Bit', 'ca. ±2,1 Milliarden', '**Standard für Ganzzahlen**'],
      ['`long`', '64 Bit', 'ca. ±9,2 Trillionen, `30000000000L`', 'Zeitstempel in ms, große IDs'],
      ['`float`', '32 Bit', 'ca. 7 Stellen genau, `3.14f`', 'Grafik, Sensoren mit wenig Speicher'],
      ['`double`', '64 Bit', 'ca. 15 Stellen genau, `3.14`', '**Standard für Kommazahlen**'],
      ['`char`', '16 Bit', 'ein Unicode-Zeichen, `\'ä\'`', 'Einzelne Zeichen'],
      ['`boolean`', '(1 Bit logisch)', '`true`, `false`', 'Bedingungen, Flags'],
    ]],
    ['h', 'Primitive Typen und Referenztypen'],
    ['p', 'Eine Variable eines **primitiven** Typs enthält den Wert selbst (auf dem Stack). Eine Variable eines **Referenztyps** enthält nur einen **Verweis** auf ein Objekt im Heap. Deshalb kopiert `b = a` bei Objekten nur den Verweis, und `==` prüft, ob es **dasselbe** Objekt ist.'],
    ['code', 'java', `String a = new String("Java");
String b = new String("Java");
System.out.println(a == b);        // false: zwei verschiedene Objekte
System.out.println(a.equals(b));   // true:  gleicher Inhalt
// Merke: Strings (und alle Objekte) IMMER mit equals vergleichen!`],
    ['p', 'Zu jedem primitiven Typ gibt es eine **Wrapper-Klasse** (`Integer`, `Double`, `Boolean`, `Character`). Sammlungen wie `ArrayList` können nur Objekte speichern; Java wandelt automatisch um (**Autoboxing**/**Unboxing**).'],
    ['h', 'Arithmetische Operatoren'],
    ['code', 'java', `int a = 17, b = 5;
System.out.println(a + b);     // 22
System.out.println(a - b);     // 12
System.out.println(a * b);     // 85
System.out.println(a / b);     // 3   <- Ganzzahldivision! Nachkommastellen fallen weg
System.out.println(a % b);     // 2   Rest (Modulo)
System.out.println(a / 2.0);   // 8.5 sobald ein Operand double ist
System.out.println((double) a / b);   // 3.4  Cast VOR der Division

int z = 5;
z++;          // z = 6  (Inkrement)
z += 10;      // z = 16
int x = z++;  // x = 16, danach z = 17 (Postfix: erst verwenden, dann erhöhen)
int y = ++z;  // z = 18, y = 18       (Präfix: erst erhöhen, dann verwenden)`],
    ['warn', '**Überlauf:** `int` hat feste Grenzen. `Integer.MAX_VALUE + 1` ergibt `-2147483648`, ohne Fehlermeldung. Für große Werte `long` verwenden. **Gleitkommafehler:** `0.1 + 0.2` ist `0.30000000000000004`; Geldbeträge darum mit `BigDecimal` oder in Cent als `long` rechnen.'],
    ['h', 'Vergleichs- und logische Operatoren'],
    ['code', 'java', `int alter = 20;
boolean volljaehrig = alter >= 18;                  // true
boolean teen = alter >= 13 && alter <= 19;          // false
boolean wochenende = tag.equals("Sa") || tag.equals("So");
boolean nichtGesperrt = !gesperrt;
// && und || werten kurzschlüssig aus: rechte Seite nur, wenn nötig
if (liste != null && liste.size() > 0) { ... }      // kein NullPointerException`],
    ['h', 'Typumwandlung (Casting)'],
    ['table', ['Richtung', 'Art', 'Beispiel'], [
      ['klein -> groß (byte -> int -> long -> double)', '**implizit** (automatisch), kein Datenverlust', '`double d = 42;` -> 42.0'],
      ['groß -> klein', '**explizit** mit Cast, Datenverlust möglich', '`int i = (int) 3.99;` -> 3 (abgeschnitten, nicht gerundet!)'],
      ['String -> Zahl', 'Parsen', '`int n = Integer.parseInt("42");` `double p = Double.parseDouble("5.5");`'],
      ['Zahl -> String', 'Konvertieren', '`String s = String.valueOf(42);` oder `"" + 42`'],
      ['Runden', 'Math-Methode', '`long r = Math.round(3.5);` -> 4'],
    ]],
    ['code', 'java', `double durchschnitt = 2.66;
int abgeschnitten = (int) durchschnitt;               // 2
long gerundet = Math.round(durchschnitt);             // 3
double zweiStellen = Math.round(durchschnitt * 100) / 100.0;   // 2.66
int zahl = Integer.parseInt("abc");                   // NumberFormatException zur Laufzeit!`],
    ['h', 'Nützliche Klassen: Math und Integer'],
    ['code', 'java', `Math.max(3, 7);        // 7
Math.min(3, 7);        // 3
Math.abs(-5);          // 5
Math.pow(2, 10);       // 1024.0 (double)
Math.sqrt(16);         // 4.0
Math.ceil(4.1);        // 5.0  aufrunden
Math.floor(4.9);       // 4.0  abrunden
Math.random();         // Zufallszahl 0.0 <= x < 1.0
Integer.MAX_VALUE;     // 2147483647`],
    ['h', 'Übungen'],
    ['qa', 'Welche Werte haben die Variablen? `int a = 7 / 2;` `double b = 7 / 2;` `double c = 7 / 2.0;` `int d = 7 % 2;`', ['a = **3** (Ganzzahldivision)', 'b = **3.0** (erst Ganzzahldivision = 3, dann zu double erweitert)', 'c = **3.5**', 'd = **1**'], 4],
    ['qa', 'Berechnen Sie den Bruttopreis eines Artikels (Nettopreis per Eingabe, 19 % MwSt.) und geben Sie ihn mit zwei Nachkommastellen aus.', [['code', 'java', `Scanner sc = new Scanner(System.in);
System.out.print("Netto: ");
double netto = Double.parseDouble(sc.nextLine());
final double MWST = 0.19;
double brutto = netto * (1 + MWST);
System.out.printf("Brutto: %.2f EUR%n", brutto);`]], 3],
    ['quiz', [
      {q: 'Welcher Typ ist Standard für Kommazahlen?', o: ['double', 'float', 'int', 'decimal'], a: 0, e: 'decimal gibt es in C#, in Java BigDecimal.'},
      {q: 'Was ergibt (int) 9.99?', o: ['9', '10', '9.99', 'Fehler'], a: 0, e: 'Abschneiden, kein Runden.'},
      {q: 'Wie vergleicht man zwei Strings inhaltlich?', o: ['s1.equals(s2)', 's1 == s2', 's1.compare(s2)', 's1 = s2'], a: 0, e: '== vergleicht Referenzen.'},
      {q: 'Welcher Typ ist ein Referenztyp?', o: ['String', 'int', 'boolean', 'char'], a: 0, e: 'String ist eine Klasse.'},
      {q: 'Was macht final double PI = 3.14?', o: ['Erzeugt eine Konstante', 'Erzeugt eine private Variable', 'Rundet auf 3', 'Nichts'], a: 0, e: 'Wert kann nicht mehr geändert werden.'},
    ]],
    ['see', ['course-java-01', 'course-java-03', 'eua-datentypen']],
  ],
});
