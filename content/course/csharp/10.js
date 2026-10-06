AP2.page('course-csharp-10', {
  b: 'course', g: 'C#', t: 'C# 10: Exceptions, Dateien, JSON und Datenbankzugriff',
  d: 'Laufzeitfehler meldet .NET mit **Exceptions** (alle erben von `System.Exception`). Man fängt sie mit `try { } catch (Typ e) { } finally { }`; C# kennt **keine checked Exceptions**, der Compiler erzwingt also keine Behandlung. `throw new ArgumentException(...)` löst selbst eine aus, `throw;` wirft eine gefangene weiter. Ressourcen wie Dateien oder Datenbankverbindungen schließt die **`using`-Anweisung** automatisch. Für Dateien gibt es die Klasse `File` (`ReadAllLines`, `WriteAllText`, `AppendAllText`), für JSON `System.Text.Json` (`JsonSerializer`, `JsonDocument`).',
  m: '**Spezifische catch-Blöcke zuerst, `catch (Exception)` zuletzt.** **`throw;` behält den Stacktrace, `throw e;` nicht.** **`using var f = ...;` schließt am Ende des Blocks.** **Zahlen aus Dateien mit `CultureInfo.InvariantCulture` parsen.** **SQL immer mit Parametern (`@id`), nie per String-Verkettung.**',
  cheat: [
    ['Exceptions', ['`FormatException` (Parse)', '`NullReferenceException`', '`IndexOutOfRangeException`', '`FileNotFoundException`, `IOException`, `DivideByZeroException`']],
    ['Syntax', ['`try { } catch (FormatException e) { }`', '`catch (Exception e) when (...)`', '`finally { }`', '`throw new InvalidOperationException("...")`']],
    ['Dateien', ['`File.ReadAllLines(pfad)`', '`File.ReadAllText`, `WriteAllText`', '`File.AppendAllText`', '`StreamReader`/`StreamWriter` mit using']],
    ['JSON', ['`JsonSerializer.Serialize(obj)`', '`JsonSerializer.Deserialize<T>(text)`', '`JsonDocument.Parse(text)`', '`.RootElement.GetProperty("x").GetDouble()`']],
  ],
  blocks: [
    ['h', 'try, catch, finally'],
    ['code', 'csharp', `try
{
    Console.Write("Zähler: ");
    int a = int.Parse(Console.ReadLine()!);
    Console.Write("Nenner: ");
    int b = int.Parse(Console.ReadLine()!);
    Console.WriteLine(a / b);
}
catch (FormatException)
{
    Console.WriteLine("Bitte ganze Zahlen eingeben.");
}
catch (DivideByZeroException)
{
    Console.WriteLine("Division durch 0 ist nicht erlaubt.");
}
catch (Exception e)
{
    Console.WriteLine($"Unerwarteter Fehler: {e.Message}");
}
finally
{
    Console.WriteLine("Fertig.");
}`],
    ['h', 'Eigene Exceptions und weiterwerfen'],
    ['code', 'csharp', `public class KapazitaetException : Exception
{
    public KapazitaetException(string meldung) : base(meldung) { }
}

public void Abheben(decimal betrag)
{
    if (betrag <= 0) throw new ArgumentOutOfRangeException(nameof(betrag), "muss positiv sein");
    if (betrag > saldo) throw new InvalidOperationException("Konto nicht gedeckt");
    saldo -= betrag;
}

try { Import(); }
catch (IOException e)
{
    Log(e);
    throw;            // gleiche Exception mit Original-Stacktrace weiterreichen
}`],
    ['h', 'Dateien lesen und schreiben'],
    ['code', 'csharp', `using System.Globalization;

// CSV einlesen (Kopfzeile überspringen)
var artikel = new List<Artikel>();
string[] zeilen = File.ReadAllLines("Artikelpreise.csv");
for (int i = 1; i < zeilen.Length; i++)
{
    if (string.IsNullOrWhiteSpace(zeilen[i])) continue;
    string[] t = zeilen[i].Split(';');
    artikel.Add(new Artikel(t[0].Trim(), decimal.Parse(t[1], CultureInfo.InvariantCulture)));
}

// zeilenweise mit using (große Dateien)
using (var reader = new StreamReader("Bestelldaten.csv"))
{
    reader.ReadLine();                                   // Kopf
    string? zeile;
    while ((zeile = reader.ReadLine()) != null)          // null = Dateiende
        Console.WriteLine(zeile);
}                                                        // reader.Dispose() automatisch

// schreiben
File.WriteAllLines("rechnung.csv", new[] { "Nr;Bezeichnung;Gesamt", "1;Feuerdorn;50.00" });
File.AppendAllText("log.txt", $"{DateTime.Now:G} Import fertig{Environment.NewLine}");`],
    ['h', 'JSON (Sommer 2023: messung.json)'],
    ['code', 'csharp', `using System.Text.Json;

string inhalt = File.ReadAllText("messung.json");
using JsonDocument doc = JsonDocument.Parse(inhalt);
double[] temp = new double[4];
for (int i = 0; i < 4; i++)
    temp[i] = doc.RootElement.GetProperty($"Sensor{i + 1}").GetProperty("Temperatur").GetDouble();

// Objekte direkt umwandeln
public record Bestellung(string Filiale, List<Position> Positionen);
public record Position(string Bezeichnung, int Anzahl);

var b = new Bestellung("Strauch GmbH", new() { new("Feuerdorn", 15), new("rote Rosen", 10) });
string json = JsonSerializer.Serialize(b, new JsonSerializerOptions { WriteIndented = true });
Bestellung? zurueck = JsonSerializer.Deserialize<Bestellung>(json);`],
    ['h', 'Datenbankzugriff (Überblick)'],
    ['code', 'csharp', `// NuGet: MySqlConnector (oder Microsoft.Data.SqlClient für SQL Server)
string connectionString = "Server=192.168.1.10;Port=3306;Database=laborauswertung;Uid=app;Pwd=geheim;";
using var con = new MySqlConnection(connectionString);
con.Open();
using var cmd = new MySqlCommand("SELECT nachname, vorname FROM Patient WHERE ID = @id", con);
cmd.Parameters.AddWithValue("@id", 42);                // Parameter statt String-Verkettung
using var reader = cmd.ExecuteReader();
while (reader.Read())
    Console.WriteLine($"{reader.GetString(0)}, {reader.GetString(1)}");`],
    ['note', 'Der **Connection-String** enthält Server (IP/Hostname), Port, Datenbankname, Benutzer und Passwort (Winter 2022/23, 4 Punkte). Passwörter gehören nicht in den Quellcode, sondern in eine geschützte Konfiguration.'],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie eine Methode, die eine Datei einliest und die Zeilenanzahl liefert; fehlt die Datei, soll -1 zurückgegeben werden.', [['code', 'csharp', `static int ZaehleZeilen(string pfad)
{
    try
    {
        return File.ReadAllLines(pfad).Length;
    }
    catch (FileNotFoundException)
    {
        return -1;
    }
}`]], 3],
    ['qa', 'Warum sollte man SQL-Befehle mit Parametern statt mit String-Verkettung bauen?', ['Bei Verkettung (`"... WHERE name = \'" + eingabe + "\'"`) kann ein Angreifer SQL-Code einschleusen (**SQL-Injection**), zum Beispiel `\' OR \'1\'=\'1`. Mit Parametern werden Befehl und Daten getrennt übertragen; die Eingabe wird nie als SQL ausgeführt.'], 3],
    ['quiz', [
      {q: 'Welche Exception wirft int.Parse("abc")?', o: ['FormatException', 'ArgumentException', 'InvalidCastException', 'IOException'], a: 0, e: 'TryParse vermeidet sie.'},
      {q: 'Was bewirkt using bei einem StreamReader?', o: ['Er wird am Ende automatisch geschlossen', 'Er liest schneller', 'Er importiert einen Namespace', 'Er fängt Exceptions'], a: 0, e: 'Dispose().'},
      {q: 'Was ist der Unterschied zwischen throw; und throw e;?', o: ['throw; behält den Original-Stacktrace', 'Es gibt keinen', 'throw e; ist schneller', 'throw; beendet das Programm'], a: 0, e: 'Wichtig für die Fehlersuche.'},
      {q: 'Muss man in C# Exceptions in der Signatur deklarieren?', o: ['Nein, C# hat keine checked Exceptions', 'Ja, mit throws', 'Nur IOException', 'Nur in Interfaces'], a: 0, e: 'Anders als Java.'},
    ]],
    ['see', ['course-csharp-09', 'course-csharp-11', 'eua-exceptions', 'eua-dateien', 'eua-formate']],
  ],
});
