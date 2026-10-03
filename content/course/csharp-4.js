AP2.add('course-csharp', [
  ['h', 'Asynchrone Programmierung (async / await)'],
  ['code', 'csharp', `static async Task<string> LadeAsync(string url)
{
    using var client = new HttpClient();
    string text = await client.GetStringAsync(url);        // Thread wird NICHT blockiert, solange gewartet wird
    return text.ToUpper();
}
static async Task Main()
{
    var t1 = LadeAsync("https://a.example");               // beide starten sofort
    var t2 = LadeAsync("https://b.example");
    string[] ergebnisse = await Task.WhenAll(t1, t2);      // gemeinsam warten
    await Task.Delay(500);                                  // statt Thread.Sleep
}
// Abbrechen: CancellationToken;  CPU-Arbeit auslagern: await Task.Run(() => Rechne());`],
  ['table', ['Konzept', 'Erklärung'], [['`Task` / `Task<T>`', 'Versprechen auf ein zukünftiges Ergebnis'], ['`async`', 'Methode darf `await` benutzen; Rückgabe `Task`, `Task<T>` oder `ValueTask<T>`'], ['`await`', 'Wartet **ohne den Thread zu blockieren**; danach geht es an derselben Stelle weiter'], ['`async void`', 'Nur für Event-Handler! Fehler lassen sich nicht abfangen'], ['`.Result` / `.Wait()`', '**Blockiert** und kann Deadlocks verursachen (UI, ASP.NET alt): lieber `await`'], ['Parallelität', '`Parallel.ForEach`, PLINQ `AsParallel()` für CPU-lastige Arbeit'], ['Synchronisation', '`lock`, `Interlocked`, `ConcurrentDictionary`, `SemaphoreSlim`']]],
  ['p', '**async/await** ist für **I/O-lastige** Arbeit (Netz, Datei, Datenbank) gedacht: Der Thread kann währenddessen andere Arbeit erledigen (UI bleibt reaktionsfähig, Webserver bedient mehr Anfragen). Es erzeugt **nicht automatisch neue Threads**.'],
  ['h', 'Pattern Matching und moderne Syntax'],
  ['code', 'csharp', `object o = 42;
if (o is int zahl && zahl > 10) Console.WriteLine(zahl);                 // Typ- und Wertprüfung
string beschreibung = o switch { int i when i < 0 => "negativ", int => "Zahl", string s => $"Text {s.Length}", null => "null", _ => "sonst" };
var p = new Person("Anna", 21);
if (p is { Alter: >= 18, Name: "Anna" }) Console.WriteLine("erwachsen");   // Eigenschaftsmuster
var (n, a) = p;                                                             // Dekonstruktion (Record)
int[] feld = { 1, 2, 3, 4 };  var teil = feld[1..3];  var letzte = feld[^1];  // Ranges und Indizes: [2,3], 4
string roh = """ Rohtext "mit" Anführungszeichen """;                      // Raw-String-Literal`],
  ['h', 'Nullable Reference Types'],
  ['code', 'csharp', `#nullable enable                       // in neuen Projekten Standard
string name = "Anna";                    // darf nicht null sein (Compiler warnt)
string? mittelname = null;               // darf null sein
int len = mittelname?.Length ?? 0;       // sicher benutzen
int? alter = null;                       // Nullable<int> bei Werttypen
if (alter.HasValue) Console.WriteLine(alter.Value);
string wert = mittelname!;               // "Ich weiß es besser" (vermeiden)`],
  ['h', 'Dateien, JSON, Datum'],
  ['code', 'csharp', `File.WriteAllText("a.txt", "Hallo");   string t = File.ReadAllText("a.txt");
foreach (var zeile in File.ReadLines("a.txt")) Console.WriteLine(zeile);     // streamend
string pfad = Path.Combine("daten", "a.txt");
using System.Text.Json;
string json = JsonSerializer.Serialize(new Person("Anna", 21));              // {"Name":"Anna","Alter":21}
Person? p = JsonSerializer.Deserialize<Person>(json);
DateTime jetzt = DateTime.Now;  var morgen = jetzt.AddDays(1);  Console.WriteLine(jetzt.ToString("dd.MM.yyyy HH:mm"));
TimeSpan dauer = morgen - jetzt;  DateOnly tag = DateOnly.FromDateTime(jetzt);   // DateTimeOffset, DateOnly, TimeOnly`],
  ['h', 'Das .NET-Ökosystem'],
  ['table', ['Baustein', 'Zweck'], [['**dotnet CLI**', '`dotnet new console`, `dotnet run`, `dotnet build`, `dotnet test`, `dotnet add package`'], ['**NuGet**', 'Paketverwaltung (`Newtonsoft.Json`, `Serilog`, `Dapper`)'], ['**ASP.NET Core**', 'Web-APIs und Webanwendungen (Controller, Minimal APIs, Razor, Blazor)'], ['**Entity Framework Core**', 'ORM: Klassen und Tabellen abbilden, LINQ zu SQL, Migrationen'], ['**Dependency Injection**', 'Eingebauter Container: `services.AddScoped<IRepo, Repo>()`'], ['**Tests**', '**xUnit**, NUnit, MSTest; Mocking mit Moq oder NSubstitute'], ['**Oberflächen**', 'WPF, WinForms, .NET MAUI, Blazor'], ['**IDEs**', 'Visual Studio, JetBrains Rider, VS Code']]],
  ['code', 'csharp', `// Minimale Web-API (ASP.NET Core)
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IKundenRepo, KundenRepo>();       // Dependency Injection
var app = builder.Build();
app.MapGet("/kunden/{id:int}", async (int id, IKundenRepo repo) =>
    await repo.FindAsync(id) is { } k ? Results.Ok(k) : Results.NotFound());
app.Run();

// Unit-Test mit xUnit
public class KontoTests
{
    [Fact] public void Einzahlen_erhoeht_Stand() { var k = new Konto("A"); k.Einzahlen(10); Assert.Equal(10m, k.Stand); }
    [Theory, InlineData(-1), InlineData(0)]
    public void Ungueltiger_Betrag_wirft(decimal b) => Assert.Throws<ArgumentException>(() => new Konto("A").Einzahlen(b));
}`],
]);
