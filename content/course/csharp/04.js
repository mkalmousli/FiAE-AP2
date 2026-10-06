AP2.page('course-csharp-04', {
  b: 'course', g: 'C#', t: 'C# 4: Schleifen (for, while, do-while, foreach)',
  d: 'C# bietet die **Zählschleife** `for`, die **kopfgesteuerte** `while`-Schleife, die **fußgesteuerte** `do { } while (...);`-Schleife und `foreach (var x in sammlung)` zum Durchlaufen von Arrays, Listen und allen Typen, die `IEnumerable` implementieren. `break` beendet die Schleife, `continue` springt zum nächsten Durchlauf. In der Prüfung wird die Menüsteuerung typischerweise mit `do-while` und `switch` gebaut, das Durchlaufen von Objektlisten mit `foreach`.',
  m: '**for: Anzahl bekannt. while: eventuell 0-mal. do-while: mindestens 1-mal (Menü). foreach: alle Elemente lesen.** **Array-Länge `arr.Length`, Liste `list.Count`.** **In foreach die Sammlung nicht verändern.** **Endlosschleife: `while (true)` + `break`.**',
  cheat: [
    ['for', ['`for (int i = 0; i < n; i++)`', 'rückwärts: `for (int i = n - 1; i >= 0; i--)`', '`i += 2` Schrittweite', 'Laufvariable nur in der Schleife gültig']],
    ['while / do', ['`while (bedingung) { }`', '`do { } while (bedingung);`', 'Bedingung im Rumpf verändern', '`while (true) { if (...) break; }`']],
    ['foreach', ['`foreach (var p in personen)`', '`foreach (char c in text)`', '`foreach (var (k, v) in dict)`', 'nur lesen']],
    ['Längen', ['Array: `.Length`', 'List: `.Count`', 'string: `.Length`', 'Dictionary: `.Count`']],
  ],
  blocks: [
    ['h', 'for'],
    ['code', 'csharp', `for (int i = 1; i <= 10; i++)
{
    Console.WriteLine($"{i,2} zum Quadrat = {i * i,3}");
}

int[] werte = { 12, 5, 8, 21 };
int summe = 0;
for (int i = 0; i < werte.Length; i++)    // Index von 0 bis Length - 1
{
    summe += werte[i];
}
Console.WriteLine($"Durchschnitt: {(double)summe / werte.Length:F2}");`],
    ['h', 'while und do-while'],
    ['code', 'csharp', `// kopfgesteuert: Wie viele Jahre bis zur Verdopplung bei 5 % Zins?
decimal kapital = 1000m;
int jahre = 0;
while (kapital < 2000m)
{
    kapital *= 1.05m;
    jahre++;
}
Console.WriteLine($"{jahre} Jahre");           // 15

// fußgesteuert: Menü (Winter 2023/24)
int wahl;
do
{
    Console.Clear();
    Console.WriteLine("1 neuen Datensatz anlegen");
    Console.WriteLine("2 Daten anzeigen");
    Console.WriteLine("3 Daten korrigieren");
    Console.WriteLine("4 Daten löschen");
    Console.WriteLine("0 Programm beenden");
    Console.Write("Ihre Wahl: ");
    if (!int.TryParse(Console.ReadLine(), out wahl)) wahl = -1;   // ungültig -> Menü neu
    switch (wahl)
    {
        case 1: Anlegen(); break;
        case 2: Anzeigen(); break;
        case 3: Korrigieren(); break;
        case 4: Loeschen(); break;
    }
} while (wahl != 0);`],
    ['h', 'foreach'],
    ['code', 'csharp', `List<string> namen = new List<string> { "Anna", "Ben", "Cem" };
foreach (string n in namen)
{
    Console.WriteLine(n.ToUpper());
}

string wort = "Hallo";
int vokale = 0;
foreach (char c in wort.ToLower())
{
    if ("aeiou".Contains(c)) vokale++;
}

var preise = new Dictionary<string, decimal> { ["Feuerdorn"] = 5m, ["Linde"] = 42.5m };
foreach (var (artikel, preis) in preise)          // Dekonstruktion von KeyValuePair
{
    Console.WriteLine($"{artikel,-10} {preis,8:F2}");
}`],
    ['warn', '`foreach (var p in liste) if (...) liste.Remove(p);` wirft eine **InvalidOperationException** ("Collection was modified"). Lösungen: `liste.RemoveAll(p => ...)`, eine **rückwärts** laufende for-Schleife oder über eine Kopie iterieren (`foreach (var p in liste.ToList())`).'],
    ['h', 'break und continue'],
    ['code', 'csharp', `Person[] personListe = new Person[10];
for (int i = 0; i < personListe.Length; i++)
{
    personListe[i] = NeuePersonEinlesen();
    Console.Write("weitere Person aufnehmen? (j/n) ");
    if (Console.ReadLine() == "n") break;          // vorzeitig abbrechen
}

for (int i = 0; i < personListe.Length; i++)
{
    if (personListe[i] == null) continue;          // leere Plätze überspringen
    Console.WriteLine(personListe[i].GetNachname());
}`],
    ['h', 'Verschachtelte Schleifen'],
    ['code', 'csharp', `for (int zeile = 1; zeile <= 5; zeile++)
{
    for (int stern = 0; stern < zeile; stern++)
        Console.Write("*");
    Console.WriteLine();
}
// *  **  ***  ****  *****  (je eine Zeile)

int[,] matrix = { { 1, 2, 3 }, { 4, 5, 6 } };      // 2D-Array in C#
for (int z = 0; z < matrix.GetLength(0); z++)        // Anzahl Zeilen
{
    for (int s = 0; s < matrix.GetLength(1); s++)    // Anzahl Spalten
        Console.Write($"{matrix[z, s]}\\t");
    Console.WriteLine();
}`],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie eine Schleife, die so lange Messwerte (double) einliest, bis eine leere Eingabe kommt, und danach Anzahl, Minimum, Maximum und Mittelwert ausgibt.', [['code', 'csharp', `var werte = new List<double>();
while (true)
{
    Console.Write("Messwert (leer = Ende): ");
    string? eingabe = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(eingabe)) break;
    if (double.TryParse(eingabe, out double w)) werte.Add(w);
    else Console.WriteLine("Ungültig");
}
if (werte.Count > 0)
{
    double min = werte[0], max = werte[0], summe = 0;
    foreach (double w in werte)
    {
        if (w < min) min = w;
        if (w > max) max = w;
        summe += w;
    }
    Console.WriteLine($"n={werte.Count} min={min} max={max} schnitt={summe / werte.Count:F2}");
}`]], 6],
    ['quiz', [
      {q: 'Welche Schleife eignet sich für ein Menü, das mindestens einmal erscheint?', o: ['do-while', 'while', 'foreach', 'for'], a: 0, e: 'Fußgesteuert.'},
      {q: 'Wie heißt die Länge einer List<T>?', o: ['Count', 'Length', 'Size()', 'Length()'], a: 0, e: 'Arrays: Length.'},
      {q: 'Was passiert beim Entfernen von Elementen innerhalb von foreach?', o: ['InvalidOperationException', 'Es funktioniert problemlos', 'Compilerfehler', 'Die Schleife endet still'], a: 0, e: 'Collection was modified.'},
      {q: 'Wie ermittelt man die Anzahl Zeilen von int[,] m?', o: ['m.GetLength(0)', 'm.Length', 'm.Rows', 'm[0].Length'], a: 0, e: 'GetLength(1) = Spalten.'},
    ]],
    ['see', ['course-csharp-03', 'course-csharp-05', 'eua-algoexam']],
  ],
});
