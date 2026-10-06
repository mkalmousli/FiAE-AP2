AP2.page('course-csharp-02', {
  b: 'course', g: 'C#', t: 'C# 2: Datentypen, Variablen, Operatoren und Umwandlung',
  d: 'C# unterscheidet **Werttypen** (value types: `int`, `double`, `decimal`, `bool`, `char`, `struct`, `enum`), die ihren Wert direkt enthalten, und **Referenztypen** (`string`, Arrays, Klassen), die auf ein Objekt im Heap verweisen. Für Geldbeträge gibt es den exakten Dezimaltyp **`decimal`** (Literal `19.99m`). `var` lässt den Compiler den Typ ableiten, die Variable bleibt aber statisch typisiert. **Nullable**-Werttypen (`int?`) können zusätzlich `null` sein. Umwandlungen erfolgen implizit (int -> double), per **Cast** `(int)3.9`, mit `Convert.ToInt32` oder `int.Parse`/`TryParse`.',
  m: '**Geld: decimal (`m`-Suffix), Messwerte: double.** **int / int = int** (`7 / 2` = 3). **`==` bei string vergleicht in C# den Inhalt** (anders als Java). **`const` = Kompilierzeitkonstante, `readonly` = nur im Konstruktor setzbar.** **`int?` kann null sein; `??` liefert einen Ersatzwert.**',
  cheat: [
    ['Ganzzahlen', ['`byte` 8 Bit (0..255)', '`short` 16, `int` 32, `long` 64 Bit', '`uint`, `ulong` ohne Vorzeichen', 'Literal `5L`, `0xFF`, `0b1010`']],
    ['Kommazahlen', ['`float` (`1.5f`), 7 Stellen', '`double` (`1.5`), 15 Stellen', '`decimal` (`1.5m`), 28 Stellen exakt', '`Math.Round(x, 2)`']],
    ['Weitere', ['`bool` true/false', '`char` `\'A\'`', '`string` `"Text"`', '`DateTime`, `TimeSpan`']],
    ['Umwandlung', ['implizit: int -> long -> double', '`(int)3.99` -> 3', '`Convert.ToInt32("42")`', '`int.Parse`, `int.TryParse`, `x.ToString()`']],
  ],
  blocks: [
    ['h', 'Variablen und Konstanten'],
    ['code', 'csharp', `int anzahl = 10;
double strom = 1.85;
decimal preis = 1149.00m;          // m-Suffix: decimal-Literal
bool vorraetig = true;
char kategorie = 'A';
string name = "Notebook";
var menge = 5;                     // Typ int wird abgeleitet
const double UST = 0.19;           // Konstante (Kompilierzeit)
DateTime heute = DateTime.Now;     // Datum und Uhrzeit`],
    ['h', 'Werttypen und Referenztypen'],
    ['table', ['', 'Werttyp (value type)', 'Referenztyp (reference type)'], [
      ['Beispiele', '`int`, `double`, `decimal`, `bool`, `char`, `DateTime`, `struct`, `enum`', '`string`, `object`, Arrays, `class`, `List<T>`'],
      ['Speicher', 'Wert direkt (meist Stack)', 'Verweis auf Objekt im Heap'],
      ['Zuweisung `b = a`', 'Kopie des Werts', 'Kopie des Verweises (beide zeigen auf dasselbe Objekt)'],
      ['Standardwert', '0, false, `\'\\0\'`', '`null`'],
    ]],
    ['code', 'csharp', `int a = 5;
int b = a;          // Kopie
b = 10;
Console.WriteLine(a);   // 5

int[] x = { 1, 2 };
int[] y = x;        // gleiche Referenz
y[0] = 99;
Console.WriteLine(x[0]); // 99`],
    ['note', '`string` ist ein Referenztyp, verhält sich aber wie ein Werttyp: Er ist **unveränderlich**, und `==` vergleicht in C# den **Inhalt** (der Operator ist für string überladen). In Java dagegen muss man `equals` verwenden.'],
    ['h', 'decimal, double, float'],
    ['code', 'csharp', `double d = 0.1 + 0.2;
Console.WriteLine(d == 0.3);        // False! (0.30000000000000004)
decimal m = 0.1m + 0.2m;
Console.WriteLine(m == 0.3m);       // True: decimal rechnet im Dezimalsystem exakt

decimal netto = 1091.55m;
decimal skonto = Math.Round(netto * 0.02m, 2);   // 21.83 (kaufmännisch runden)
Console.WriteLine(netto - skonto);               // 1069.72`],
    ['tip', 'Für Angebotsvergleiche, Kalkulationen und Rechnungen in Prüfungsaufgaben ist `decimal` der passende Typ. Für Messwerte (Strom, Temperatur) `double`.'],
    ['h', 'Operatoren'],
    ['code', 'csharp', `int a = 17, b = 5;
Console.WriteLine(a / b);           // 3   Ganzzahldivision
Console.WriteLine(a % b);           // 2   Rest
Console.WriteLine((double)a / b);   // 3.4
Console.WriteLine(a / 2.0);         // 8.5

int z = 5;
z++; z += 10; z *= 2;               // 32
bool ok = a > 10 && b < 10;         // logisches UND (Kurzschluss)
bool eins = a < 0 || b == 5;        // logisches ODER
string s = a > b ? "a größer" : "b größer";   // ternärer Operator

int? bonus = null;                  // Nullable int
int wert = bonus ?? 0;              // ?? = Ersatzwert, falls null -> 0
string? kunde = null;
int laenge = kunde?.Length ?? 0;    // ?. = nur zugreifen, wenn nicht null`],
    ['h', 'Typumwandlung'],
    ['table', ['Methode', 'Beispiel', 'Verhalten'], [
      ['Impliziter Cast', '`double d = 42;`', 'automatisch, wenn kein Datenverlust'],
      ['Expliziter Cast', '`int i = (int)3.99;`', 'schneidet ab -> 3'],
      ['`Convert`', '`Convert.ToInt32(3.5)` -> 4, `Convert.ToInt32("42")`', 'rundet (Banker\'s Rounding: 2.5 -> 2), null -> 0'],
      ['`Parse`', '`int.Parse("42")`, `double.Parse("5,5")`', 'FormatException bei ungültigem Text; Kultur beachten!'],
      ['`TryParse`', '`int.TryParse(s, out int n)`', 'liefert bool, keine Exception'],
      ['`ToString`', '`42.ToString()`, `preis.ToString("F2")`', 'Zahl -> Text mit Format'],
    ]],
    ['warn', '**Kultur:** `double.Parse("5.5")` liefert auf einem deutschen System **55**, weil der Punkt als Tausendertrennzeichen gilt. Für Dateien mit Punkt als Dezimaltrenner: `double.Parse(s, CultureInfo.InvariantCulture)` (Namespace `System.Globalization`).'],
    ['h', 'Aufzählungen (enum)'],
    ['code', 'csharp', `enum Dringlichkeit { Niedrig, Mittel, Hoch }

Dringlichkeit d = Dringlichkeit.Hoch;
if (d == Dringlichkeit.Hoch) Console.WriteLine("sofort bearbeiten");
Console.WriteLine((int)d);     // 2 (intern Zahlen ab 0)`],
    ['h', 'Übungen'],
    ['qa', 'Welche Werte und Typen ergeben sich? `var a = 7 / 2;` `var b = 7 / 2.0;` `var c = 7m / 2;` `var d = (int)7.9;`', ['a: **3** (int)', 'b: **3.5** (double)', 'c: **3.5** (decimal)', 'd: **7** (int, abgeschnitten)'], 4],
    ['qa', 'Berechnen Sie den Bezugspreis: Listenpreis 1.149 €, 5 % Rabatt, 2 % Skonto, 5 € Bezugskosten. Verwenden Sie decimal und runden Sie auf Cent.', [['code', 'csharp', `decimal liste = 1149.00m;
decimal ziel = liste - Math.Round(liste * 0.05m, 2);    // 1091.55
decimal bar = ziel - Math.Round(ziel * 0.02m, 2);       // 1069.72
decimal bezug = bar + 5.00m;                            // 1074.72
Console.WriteLine($"Bezugspreis: {bezug:F2} EUR");`]], 4],
    ['quiz', [
      {q: 'Welcher Typ eignet sich für Geldbeträge?', o: ['decimal', 'double', 'float', 'int'], a: 0, e: 'Exakte Dezimalrechnung.'},
      {q: 'Was ergibt in C# "abc" == "abc" bei zwei verschiedenen string-Objekten?', o: ['true', 'false', 'Compilerfehler', 'null'], a: 0, e: '== ist für string inhaltlich überladen.'},
      {q: 'Was liefert int? x = null; int y = x ?? 5;?', o: ['5', 'null', '0', 'Fehler'], a: 0, e: 'Null-Coalescing-Operator.'},
      {q: 'Was ist ein Werttyp?', o: ['int', 'string', 'List<int>', 'int[]'], a: 0, e: 'Arrays sind Referenztypen.'},
      {q: 'Was ergibt (int)9.99?', o: ['9', '10', '9.99', 'Fehler'], a: 0, e: 'Cast schneidet ab.'},
    ]],
    ['see', ['course-csharp-01', 'course-csharp-03', 'eua-datentypen']],
  ],
});
