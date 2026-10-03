AP2.add('course-csharp', [
  ['h', 'Generics'],
  ['code', 'csharp', `public class Kiste<T> where T : class, new()      // Typparameter mit Einschränkung (Constraint)
{
    private readonly List<T> _inhalt = new();
    public void Add(T x) => _inhalt.Add(x);
    public T Erster() => _inhalt[0];
}
static T Groesser<T>(T a, T b) where T : IComparable<T> => a.CompareTo(b) >= 0 ? a : b;
Console.WriteLine(Groesser(3, 7) + Groesser("a", "b"));`],
  ['p', '**Generics** erzeugen typsichere, wiederverwendbare Klassen und Methoden **ohne Boxing und Casts**. Wichtige Constraints: `where T : class`, `struct`, `new()`, `IComparable<T>`, Basisklasse.'],
  ['h', 'Delegates, Lambdas, Events'],
  ['code', 'csharp', `delegate int Rechnung(int a, int b);                      // Delegate = Typ für Methodenverweise
Rechnung plus = (a, b) => a + b;                          // Lambda
Func<int, int, int> mal = (a, b) => a * b;                // Func<Parameter..., Rückgabe>
Action<string> sag = s => Console.WriteLine(s);           // Action: ohne Rückgabe
Predicate<int> gerade = x => x % 2 == 0;                  // liefert bool

class Sensor
{
    public event EventHandler<double>? NeuerWert;         // Event: Beobachter-Muster eingebaut
    public void Messen(double w) => NeuerWert?.Invoke(this, w);   // Auslösen (null-sicher)
}
var sensor = new Sensor();
sensor.NeuerWert += (quelle, wert) => Console.WriteLine($"Messwert {wert}");   // abonnieren
sensor.Messen(21.5);`],
  ['h', 'LINQ (Language Integrated Query)'],
  ['code', 'csharp', `var personen = new List<Person> { new("Anna", 21), new("Ben", 17), new("Cem", 34), new("Dora", 21) };

var erwachsene = personen.Where(p => p.Alter >= 18).OrderBy(p => p.Name).Select(p => p.Name).ToList();
double schnitt = personen.Average(p => p.Alter);
bool irgendwer = personen.Any(p => p.Alter > 30);   bool alle = personen.All(p => p.Alter > 10);
var aeltester = personen.MaxBy(p => p.Alter);
var gruppen = personen.GroupBy(p => p.Alter)          // wie SQL GROUP BY
    .Select(g => new { Alter = g.Key, Anzahl = g.Count(), Namen = string.Join(",", g.Select(x => x.Name)) });
var erste = personen.FirstOrDefault(p => p.Alter > 100);   // null/Standardwert statt Exception (First wirft)
var seite = personen.Skip(2).Take(2);                      // Paging
var join = personen.Join(adressen, p => p.Name, a => a.Name, (p, a) => new { p.Name, a.Ort });

// Abfragesyntax (SQL-ähnlich, selten)
var q = from p in personen where p.Alter > 18 orderby p.Name select p.Name;`],
  ['table', ['LINQ', 'SQL', 'Hinweis'], [['`Where`', '`WHERE`', 'Filtern'], ['`Select`', '`SELECT`', 'Projizieren'], ['`OrderBy` / `ThenBy`', '`ORDER BY`', 'Sortieren'], ['`GroupBy`', '`GROUP BY`', 'Gruppieren'], ['`Join`', '`JOIN`', 'Verbinden'], ['`Count/Sum/Average/Min/Max`', 'Aggregate', ''], ['`Distinct`, `Union`, `Intersect`, `Except`', 'Mengen', ''], ['`First/Single/ToList/ToArray`', '-', '**Sofortige Ausführung**']]],
  ['warn', '**Verzögerte Ausführung (Deferred Execution):** Eine LINQ-Abfrage wird erst bei `foreach`, `ToList()`, `Count()` usw. ausgeführt. Wird die Quelle dazwischen geändert, ändert sich das Ergebnis. **Mehrfaches Durchlaufen** führt die Abfrage jedes Mal erneut aus: bei Bedarf mit `ToList()` **materialisieren**. **Entity Framework** übersetzt LINQ in SQL (`IQueryable`), dort gilt dasselbe.'],
  ['h', 'Fehlerbehandlung'],
  ['code', 'csharp', `try
{
    var zahl = int.Parse(eingabe);                                   // FormatException, OverflowException
    var wert = 10 / zahl;                                             // DivideByZeroException
}
catch (FormatException ex) { Console.WriteLine("Keine Zahl: " + ex.Message); }
catch (Exception ex) when (ex is DivideByZeroException or OverflowException)   // Ausnahmefilter
{ Console.WriteLine("Rechenfehler"); throw; }                       // throw; behält den Stacktrace (nicht throw ex;)
finally { Console.WriteLine("immer"); }

public class KontoException : Exception                              // eigene Ausnahme
{ public KontoException(string msg, Exception? inner = null) : base(msg, inner) { } }`],
  ['list', ['**Exceptions sind für Ausnahmefälle**, nicht für normale Programmlogik: `TryParse` statt `Parse` mit try/catch.', 'Spezifische Ausnahmen zuerst, `Exception` zuletzt und nur wenn sinnvoll behandelt oder protokolliert.', 'Argumente am Methodenanfang prüfen (Guard Clauses): `ArgumentNullException.ThrowIfNull(x)`.', '**Ressourcen** (Dateien, DB-Verbindungen) immer mit `using` freigeben.']],
  ['h', 'IDisposable und using'],
  ['code', 'csharp', `using var datei = new StreamReader("daten.txt");     // using-Deklaration: Dispose() am Blockende
string text = datei.ReadToEnd();
using (var con = new SqlConnection(cs)) { con.Open(); /* ... */ }   // klassischer using-Block

class Ressource : IDisposable
{
    public void Dispose() { /* nicht verwaltete Ressourcen freigeben */ GC.SuppressFinalize(this); }
}`],
  ['note', 'Der **Garbage Collector** räumt **Speicher** auf, aber nicht zeitnah und nicht für **Dateien, Netzwerk, Datenbankverbindungen**: Dafür ist `IDisposable` / `using` da.'],
]);
