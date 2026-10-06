AP2.page('course-csharp-01', {
  b: 'course', g: 'C#', t: 'C# 1: Einstieg, .NET und das erste Programm',
  d: '**C#** ("C Sharp") ist eine **objektorientierte, statisch typisierte** Sprache von Microsoft für die Plattform **.NET**. Der Compiler übersetzt den Quelltext in **IL-Code** (Intermediate Language), den die **CLR** (Common Language Runtime) zur Laufzeit per **JIT** in Maschinencode übersetzt und ausführt, mit automatischer Speicherverwaltung (Garbage Collector). .NET läuft heute plattformübergreifend unter Windows, Linux und macOS. Projekte erstellt und startet man mit der **.NET CLI** (`dotnet new console`, `dotnet run`) oder in **Visual Studio**/VS Code/Rider.',
  m: '**Anweisungen enden mit `;`, Blöcke in `{ }`.** **Methoden und Klassen in PascalCase (`Main`, `WriteLine`), lokale Variablen in camelCase.** **Ausgabe `Console.WriteLine`, Eingabe `Console.ReadLine()` (liefert string, eventuell null).** **String-Interpolation `$"Hallo {name}"`.** **`using System;` bindet Namensräume ein.**',
  cheat: [
    ['Werkzeuge', ['`dotnet new console -n App`', '`dotnet run`', '`dotnet build`, `dotnet test`', 'IDE: Visual Studio, Rider, VS Code']],
    ['Ausgabe', ['`Console.WriteLine("Text");`', '`Console.Write(x);` ohne Umbruch', '`$"Summe: {a + b}"`', '`$"{preis:F2}"`, `{x,10}` Breite']],
    ['Eingabe', ['`string? s = Console.ReadLine();`', '`int n = int.Parse(s);`', '`int.TryParse(s, out int n)`', '`Console.ReadKey()` Taste']],
    ['Aufbau', ['`namespace App;`', '`class Program`', '`static void Main(string[] args)`', 'oder Top-Level-Anweisungen']],
  ],
  blocks: [
    ['h', 'Von C# zum laufenden Programm'],
    ['diagram', AP2.dg.flow(['Program.cs (Quelltext)', 'C#-Compiler (Roslyn)', 'App.dll (IL-Code)', 'CLR mit JIT', 'Ausgabe'], {w: 760, h: 110, styles: ['plain', 'accent', 'soft', 'solid', 'plain'], cap: 'Ähnlich wie bei Java: Erst Zwischencode, dann Ausführung in einer Laufzeitumgebung.'})],
    ['table', ['Begriff', 'Bedeutung', 'Java-Gegenstück'], [
      ['**.NET**', 'Plattform aus Laufzeit, Bibliotheken und Werkzeugen (aktuell .NET 8/9/10)', 'JDK'],
      ['**CLR**', 'Laufzeitumgebung: führt IL-Code aus, Garbage Collector, Typsicherheit', 'JVM'],
      ['**IL-Code** (CIL/MSIL)', 'Plattformunabhängiger Zwischencode in .dll/.exe', 'Bytecode'],
      ['**Assembly**', 'Kompilierte Einheit (.dll oder .exe)', '.jar'],
      ['**NuGet**', 'Paketverwaltung für Bibliotheken', 'Maven/Gradle'],
      ['**Namespace**', 'Ordnet Klassen logisch (`System.Collections.Generic`)', 'package'],
    ]],
    ['h', 'Das erste Programm (klassisch)'],
    ['code', 'csharp', `using System;                         // Namensraum mit Console einbinden

namespace HalloWelt
{
    class Program
    {
        static void Main(string[] args)    // Einstiegspunkt
        {
            Console.WriteLine("Hallo Welt!");
            Console.WriteLine("Ich lerne C#.");
            Console.WriteLine(3 + 4);      // 7
        }
    }
}`],
    ['h', 'Top-Level-Anweisungen (ab C# 9)'],
    ['p', 'In neuen Konsolenprojekten darf man den Rahmen weglassen; der Compiler erzeugt `Main` automatisch. Für Prüfungen ist die klassische Form mit Klasse und `Main` am sichersten, weil sie in den Lösungen verwendet wird.'],
    ['code', 'csharp', `// Program.cs (komplett)
Console.WriteLine("Hallo Welt!");`],
    ['h', 'Eingabe und Ausgabe'],
    ['code', 'csharp', `Console.Write("Wie heißt du? ");
string? name = Console.ReadLine();                 // string? = darf null sein
Console.Write("Wie alt bist du? ");
int alter = Convert.ToInt32(Console.ReadLine());   // oder int.Parse(...)
Console.WriteLine($"Hallo {name}, nächstes Jahr bist du {alter + 1}.");   // Interpolation

double preis = 1074.7189;
Console.WriteLine($"Preis: {preis:F2} EUR");       // 2 Nachkommastellen: 1074,72
Console.WriteLine($"{"Feuerdorn",-12}|{10,6}");    // links 12, rechts 6 Zeichen
Console.WriteLine("Summe: {0}, Anzahl: {1}", 50.5, 3);   // zusammengesetzte Formatierung`],
    ['h', 'Sicher einlesen mit TryParse'],
    ['code', 'csharp', `Console.Write("Anzahl: ");
if (int.TryParse(Console.ReadLine(), out int anzahl))   // true bei Erfolg, Wert in anzahl
{
    Console.WriteLine($"Doppelt: {anzahl * 2}");
}
else
{
    Console.WriteLine("Das war keine ganze Zahl.");
}`],
    ['note', '`int.Parse("abc")` wirft eine **FormatException**, `int.TryParse` gibt einfach `false` zurück. Für Benutzereingaben ist TryParse meist die bessere Wahl.'],
    ['h', 'Projektstruktur mit der .NET CLI'],
    ['code', 'text', `$ dotnet new console -n Kita        # neues Konsolenprojekt
$ cd Kita
$ dotnet run                        # kompilieren und starten
$ dotnet add package Newtonsoft.Json   # NuGet-Paket hinzufügen
$ dotnet new xunit -n Kita.Tests    # Testprojekt`],
    ['h', 'C#, Java und Python im Vergleich'],
    ['codes', [
      ['csharp', `int a = int.Parse(Console.ReadLine()!);
Console.WriteLine($"Quadrat: {a * a}");`],
      ['java', `int a = Integer.parseInt(sc.nextLine());
System.out.println("Quadrat: " + (a * a));`],
      ['python', `a = int(input())
print(f"Quadrat: {a * a}")`],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie ein C#-Programm, das Nettopreis und Menge einliest und den Gesamtbruttobetrag (19 % USt) mit zwei Nachkommastellen ausgibt.', [['code', 'csharp', `Console.Write("Nettopreis: ");
double netto = double.Parse(Console.ReadLine()!);
Console.Write("Menge: ");
int menge = int.Parse(Console.ReadLine()!);
const double UST = 0.19;
double gesamt = netto * menge * (1 + UST);
Console.WriteLine($"Gesamt brutto: {gesamt:F2} EUR");`], 'Das `!` hinter ReadLine() sagt dem Compiler: "Ich weiß, dass hier nicht null kommt" (Nullable-Warnung unterdrücken).'], 4],
    ['qa', 'Erklären Sie die Begriffe CLR und IL-Code.', ['Der C#-Compiler erzeugt keinen Maschinencode, sondern **IL-Code** (Intermediate Language), der plattformunabhängig ist.', 'Die **CLR** (Common Language Runtime) führt diesen IL-Code aus, übersetzt ihn per JIT-Compiler in Maschinencode des Rechners und übernimmt Speicherverwaltung (Garbage Collection), Typsicherheit und Ausnahmebehandlung.'], 3],
    ['quiz', [
      {q: 'Welche Methode gibt Text mit Zeilenumbruch aus?', o: ['Console.WriteLine', 'Console.Print', 'System.out.println', 'print'], a: 0, e: 'Console.Write ohne Umbruch.'},
      {q: 'Was liefert Console.ReadLine()?', o: ['Einen string (eventuell null)', 'Einen int', 'Ein char', 'Nichts'], a: 0, e: 'Zahlen müssen umgewandelt werden.'},
      {q: 'Was gibt $"{3.14159:F2}" aus?', o: ['3,14 (bzw. 3.14 je nach Kultur)', '3.14159', '3', 'F2'], a: 0, e: 'F2 = Festkomma, 2 Stellen.'},
      {q: 'Was ist das Gegenstück zur JVM in .NET?', o: ['CLR', 'IL', 'NuGet', 'Roslyn'], a: 0, e: 'Common Language Runtime.'},
      {q: 'Was macht int.TryParse bei ungültiger Eingabe?', o: ['Gibt false zurück', 'Wirft eine Exception', 'Beendet das Programm', 'Gibt -1 zurück'], a: 0, e: 'Der out-Parameter wird 0.'},
    ]],
    ['see', ['course-csharp-02', 'course-java-01', 'course-python-01']],
  ],
});
