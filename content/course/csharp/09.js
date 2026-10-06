AP2.page('course-csharp-09', {
  b: 'course', g: 'C#', t: 'C# 9: Collections und LINQ',
  d: 'Im Namensraum `System.Collections.Generic` liegen die typsicheren Sammlungen: **`List<T>`** (dynamische Liste mit Index), **`Dictionary<TKey, TValue>`** (Schlüssel-Wert-Paare, Hashtabelle), **`HashSet<T>`** (Menge ohne Duplikate), **`Queue<T>`** (FIFO) und **`Stack<T>`** (LIFO). **LINQ** (Language Integrated Query, `using System.Linq`) erlaubt SQL-ähnliche Abfragen auf Sammlungen: filtern (`Where`), umformen (`Select`), sortieren (`OrderBy`), gruppieren (`GroupBy`), aggregieren (`Sum`, `Average`, `Count`, `Max`) und einzelne Elemente finden (`First`, `FirstOrDefault`).',
  m: '**List: Add, Insert, Remove, RemoveAt, RemoveAll, Count, Contains, Find, Sort.** **Dictionary: d[k] = v, TryGetValue, ContainsKey; d[k] lesen wirft KeyNotFoundException, wenn k fehlt.** **LINQ liefert verzögert (lazy) eine Abfrage; mit `ToList()` auswerten.** **Lambda: `x => x.Preis > 10`.**',
  cheat: [
    ['List<T>', ['`var l = new List<int>();`', '`l.Add(x)`, `l.Insert(0, x)`', '`l.Remove(x)`, `l.RemoveAt(i)`, `l.RemoveAll(p)`', '`l.Count`, `l[i]`, `l.Find(p)`']],
    ['Dictionary', ['`var d = new Dictionary<string, decimal>();`', '`d["Linde"] = 42.5m;`', '`d.TryGetValue(k, out var v)`', '`foreach (var (k, v) in d)`']],
    ['Weitere', ['`HashSet<T>`: Add liefert false bei Duplikat', '`Queue<T>`: Enqueue, Dequeue, Peek', '`Stack<T>`: Push, Pop, Peek', '`SortedDictionary`, `LinkedList`']],
    ['LINQ', ['`Where(x => ...)`', '`Select(x => ...)`', '`OrderBy`, `OrderByDescending`, `ThenBy`', '`Sum`, `Average`, `Count`, `Max`, `GroupBy`, `First(OrDefault)`']],
  ],
  blocks: [
    ['h', 'List<T>'],
    ['code', 'csharp', `var namen = new List<string> { "Anna", "Ben" };   // Collection-Initialisierer
namen.Add("Cem");
namen.Insert(0, "Dora");                  // [Dora, Anna, Ben, Cem]
namen.Remove("Ben");                      // nach Wert
namen.RemoveAt(0);                        // nach Index -> [Anna, Cem]
Console.WriteLine(namen.Count);           // 2
Console.WriteLine(namen.Contains("Cem")); // True
namen.Sort();                             // alphabetisch
string? treffer = namen.Find(n => n.StartsWith("C"));   // erster Treffer oder null
int geloescht = namen.RemoveAll(n => n.Length < 4);     // alle passenden entfernen`],
    ['h', 'Bereinigen einer Liste (Winter 2024/25)'],
    ['code', 'csharp', `private int BereinigeMesswertliste()
{
    // statt Vorwärtsschleife mit RemoveAt (überspringt Elemente!):
    return messwertliste.RemoveAll(m => !m.PruefeWert());   // liefert Anzahl entfernter
}`],
    ['h', 'Dictionary<TKey, TValue>'],
    ['code', 'csharp', `var preise = new Dictionary<string, decimal>
{
    ["Feuerdorn"] = 5.0m,
    ["rote Rosen"] = 2.3m,
};
preise["Linde"] = 42.5m;                       // hinzufügen oder überschreiben
if (preise.TryGetValue("Tulpe", out decimal p)) Console.WriteLine(p);
else Console.WriteLine("nicht im Sortiment");
// decimal x = preise["Tulpe"];               // KeyNotFoundException!

// Summen je Filiale
var summen = new Dictionary<string, int>();
foreach (var pos in positionen)
{
    summen.TryGetValue(pos.Filiale, out int bisher);    // 0, wenn noch nicht da
    summen[pos.Filiale] = bisher + pos.Anzahl;
}
foreach (var (filiale, anzahl) in summen) Console.WriteLine($"{filiale}: {anzahl}");`],
    ['h', 'HashSet, Queue, Stack'],
    ['code', 'csharp', `var ids = new HashSet<int> { 3, 1 };
bool neu = ids.Add(3);              // false: schon vorhanden

var warteschlange = new Queue<string>();
warteschlange.Enqueue("Patient A");
warteschlange.Enqueue("Patient B");
Console.WriteLine(warteschlange.Dequeue());   // Patient A (FIFO)

var rueckgaengig = new Stack<string>();
rueckgaengig.Push("Text eingefügt");
rueckgaengig.Push("Fett formatiert");
Console.WriteLine(rueckgaengig.Pop());        // Fett formatiert (LIFO)`],
    ['h', 'LINQ: Abfragen auf Sammlungen'],
    ['code', 'csharp', `using System.Linq;

record Artikel(string Bezeichnung, decimal Preis, string Kategorie);
var artikel = new List<Artikel>
{
    new("Feuerdorn", 5.0m, "Strauch"), new("Linde", 42.5m, "Baum"),
    new("Flieder", 19.5m, "Strauch"), new("Kastanie", 32m, "Baum"),
};

var teuer = artikel.Where(a => a.Preis > 10).OrderBy(a => a.Preis).ToList();
var namen = artikel.Select(a => a.Bezeichnung.ToUpper());     // nur die Namen
decimal summe = artikel.Sum(a => a.Preis);
decimal schnitt = artikel.Average(a => a.Preis);
Artikel? billigster = artikel.MinBy(a => a.Preis);
bool alleUnter50 = artikel.All(a => a.Preis < 50);
int anzahlBaeume = artikel.Count(a => a.Kategorie == "Baum");

var proKategorie = artikel
    .GroupBy(a => a.Kategorie)                                  // wie GROUP BY
    .Select(g => new { Kategorie = g.Key, Anzahl = g.Count(), Summe = g.Sum(a => a.Preis) });
foreach (var g in proKategorie) Console.WriteLine($"{g.Kategorie}: {g.Anzahl} / {g.Summe}");`],
    ['h', 'LINQ und SQL im Vergleich'],
    ['codes', [
      ['sql', `SELECT Kategorie, COUNT(*) AS Anzahl
FROM Artikel
WHERE Preis > 10
GROUP BY Kategorie
ORDER BY Anzahl DESC;`],
      ['csharp', `var ergebnis = from a in artikel                  // Abfragesyntax
              where a.Preis > 10
              group a by a.Kategorie into g
              orderby g.Count() descending
              select new { Kategorie = g.Key, Anzahl = g.Count() };`],
    ]],
    ['note', 'Mit **Entity Framework Core** werden LINQ-Abfragen sogar automatisch in SQL übersetzt und auf der Datenbank ausgeführt. Grundsätzlich gilt: Eine LINQ-Abfrage wird erst ausgeführt, wenn man sie durchläuft oder mit `ToList()`, `Count()` usw. auswertet (verzögerte Ausführung).'],
    ['h', 'Übungen'],
    ['qa', 'Gegeben `List<Bestellposition> alle` (Filiale, Bezeichnung, Anzahl). Liefern Sie mit LINQ alle Positionen der Filiale "Strauch GmbH" und die Gesamtzahl der bestellten Artikel dieser Filiale.', [['code', 'csharp', `var strauch = alle.Where(p => p.Filiale == "Strauch GmbH").ToList();
int gesamt = strauch.Sum(p => p.Anzahl);

// ohne LINQ:
var liste = new List<Bestellposition>();
int summe = 0;
foreach (var p in alle)
    if (p.Filiale == "Strauch GmbH") { liste.Add(p); summe += p.Anzahl; }`]], 4],
    ['qa', 'Welche Sammlung wählen Sie für (a) Wartende am Empfang, (b) Artikelpreise nach Bezeichnung, (c) bereits vergebene Kundennummern?', ['(a) **Queue<T>** (wer zuerst kommt, wird zuerst aufgerufen).', '(b) **Dictionary<string, decimal>** (schneller Zugriff per Schlüssel).', '(c) **HashSet<int>** (schnelle Prüfung, keine Duplikate).'], 3],
    ['quiz', [
      {q: 'Was macht Where in LINQ?', o: ['Filtert Elemente nach einer Bedingung', 'Sortiert', 'Gruppiert', 'Zählt'], a: 0, e: 'Wie WHERE in SQL.'},
      {q: 'Was passiert bei dict["x"], wenn x fehlt?', o: ['KeyNotFoundException', 'null', '0', 'Der Schlüssel wird angelegt'], a: 0, e: 'Beim Schreiben würde er angelegt.'},
      {q: 'Welche Sammlung arbeitet nach FIFO?', o: ['Queue<T>', 'Stack<T>', 'HashSet<T>', 'List<T>'], a: 0, e: 'First In, First Out.'},
      {q: 'Was liefert RemoveAll?', o: ['Die Anzahl entfernter Elemente', 'Die neue Liste', 'true/false', 'Nichts'], a: 0, e: 'int.'},
    ]],
    ['see', ['course-csharp-08', 'course-csharp-10', 'eua-listen', 'eua-hash', 'eua-stackqueue']],
  ],
});
