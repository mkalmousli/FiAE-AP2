AP2.page('course-csharp', {
  b: 'course', g: 'C#', t: 'C# (Gesamtüberblick, Kapitel 6 bis 11 folgen): vollständiger Kurs von Grundlagen bis Fortgeschritten (.NET)',
  d: '**C#** ist eine **statisch typisierte, objektorientierte, kompilierte** Sprache von Microsoft für die Plattform **.NET** (plattformübergreifend). Der Quelltext wird zu **IL (Intermediate Language)** kompiliert, die **CLR (Common Language Runtime)** führt sie per **JIT** aus und übernimmt **Speicherverwaltung (Garbage Collector)**. C# wird für Desktop (WPF, WinForms, MAUI), Web (**ASP.NET Core**), Dienste, Spiele (Unity) und Cloud genutzt.',
  m: '**Werttypen (int, double, bool, struct, enum) liegen im Stack/inline, Referenztypen (class, string, Arrays) im Heap.** **Properties statt öffentlicher Felder.** **`using` räumt `IDisposable` auf.** **LINQ: Where, Select, OrderBy, GroupBy.** **`async`/`await` für nicht blockierende Aufrufe.** **`null`-Sicherheit mit `?`.**',
  cheat: [
    ['Grundlagen', ['`int x = 5; var s = "Hi";`', '`const`, `readonly`', '`Console.WriteLine($"x={x}");`', '`if/else`, `switch`-Ausdruck, `for`, `foreach`, `while`', '`?:`, `??`, `?.`']],
    ['Typen', ['**Wert:** `int long double decimal bool char struct enum`', '**Referenz:** `string class array delegate record`', '`int?` Nullable', '`decimal` für Geld']],
    ['Klassen', ['`class`, `abstract`, `sealed`, `static`', 'Property `{ get; set; init; }`', '`interface`, `record`, `struct`', 'Zugriff `public private protected internal`']],
    ['Sammlungen', ['`List<T>`, `Dictionary<K,V>`, `HashSet<T>`', '`Queue<T>`, `Stack<T>`', 'Arrays `int[]`', '`IEnumerable<T>`']],
    ['LINQ', ['`Where`, `Select`, `OrderBy`', '`GroupBy`, `Join`, `Any`, `All`', '`First`, `FirstOrDefault`, `ToList`', 'Verzögerte Ausführung']],
    ['Fortgeschritten', ['`async`/`await`, `Task`', '`delegate`, `event`, Lambda', 'Generics `where T : class`', 'Pattern Matching, `record`']],
  ],
  blocks: [
    ['h', 'Erster Überblick'],
    ['code', 'csharp', `using System;                                  // Namespace einbinden

namespace Demo;                                 // dateiweiter Namespace (C# 10)

class Programm
{
    static void Main(string[] args)              // Einstiegspunkt (oder Top-Level-Statements ohne Klasse)
    {
        int alter = 21;                          // Werttyp
        double preis = 3.99;
        decimal betrag = 19.99m;                 // m-Suffix: exakt, für Geld
        string name = "Anna";                    // unveränderlich (immutable), Referenztyp
        var liste = new List<int> { 1, 2, 3 };   // var: Typ wird abgeleitet (bleibt statisch!)
        const double Pi = 3.14159;
        Console.WriteLine($"{name} ist {alter}, Preis {preis:F2}, Betrag {betrag:C}");   // String-Interpolation
        string eingabe = Console.ReadLine() ?? "";
        if (int.TryParse(eingabe, out int zahl))   // sicheres Parsen ohne Exception
            Console.WriteLine(zahl * 2);
    }
}`],
    ['table', ['Typ', 'Größe / Bereich', 'Hinweis'], [['`int`', '32 Bit, ca. ±2,1 Mrd.', 'Standard-Ganzzahl'], ['`long`', '64 Bit', 'Suffix `L`'], ['`double`', '64 Bit Gleitkomma', 'Standard für Kommazahlen'], ['`float`', '32 Bit', 'Suffix `f`'], ['`decimal`', '128 Bit, exakt dezimal', '**Geld**, Suffix `m`'], ['`bool`', 'true / false', ''], ['`char`', 'UTF-16 Zeichen', '`\'a\'`'], ['`string`', 'Text, immutable', '`StringBuilder` für viele Änderungen'], ['`object`', 'Basis aller Typen', 'Boxing: Werttyp wird in Objekt verpackt (kostet Leistung)']]],
    ['h', 'Kontrollstrukturen'],
    ['code', 'csharp', `int note = 2;
string text = note switch                       // switch-Ausdruck (Pattern Matching)
{
    1 => "sehr gut",
    2 or 3 => "gut bis befriedigend",
    >= 4 and <= 5 => "ausreichend/mangelhaft",
    _ => "ungültig"
};
for (int i = 0; i < 5; i++) { if (i == 2) continue; Console.Write(i); }
foreach (var wort in new[] { "a", "b" }) Console.WriteLine(wort);
int n = 0; while (n < 3) n++;  do { n--; } while (n > 0);
string s = null;
Console.WriteLine(s?.Length ?? 0);               // ?. null-bedingt, ?? Standardwert
s ??= "Vorgabe";                                  // nur zuweisen, wenn null`],
    ['table', ['Operator', 'Bedeutung'], [['`?.`', 'Null-bedingter Zugriff: bei `null` Ergebnis `null` statt Fehler'], ['`??`', 'Null-Koaleszenz: Wert oder Ersatz'], ['`??=`', 'Zuweisen, wenn linke Seite `null`'], ['`is`, `is not`, `as`', 'Typ prüfen / sicher umwandeln'], ['`?:`', 'Bedingungsoperator `a ? b : c`'], ['`==` bei string', 'Vergleicht **Inhalt** (Operator überladen)']]],
    ['h', 'Methoden'],
    ['code', 'csharp', `static int Summe(int a, int b = 0) => a + b;                       // Ausdruckskörper, optionaler Parameter
static void Tausche(ref int a, ref int b) { (a, b) = (b, a); }      // ref: Referenz übergeben, Tuple-Tausch
static bool Teile(int a, int b, out int ergebnis) { ergebnis = 0; if (b == 0) return false; ergebnis = a / b; return true; }
static int Gesamt(params int[] zahlen) => zahlen.Sum();             // beliebig viele Argumente
static (int min, int max) Spanne(int[] z) => (z.Min(), z.Max());     // Tuple als Rückgabe
Summe(b: 5, a: 2);                                                    // benannte Argumente
var (kleinste, groesste) = Spanne(new[] { 4, 1, 9 });                // Dekonstruktion`],
  ],
});
