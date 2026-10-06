AP2.page('course-csharp-05', {
  b: 'course', g: 'C#', t: 'C# 5: Arrays und Strings',
  d: 'Ein **Array** hat in C# eine **feste Länge** und Elemente eines Typs: `int[] a = new int[5];`. Neben eindimensionalen gibt es **mehrdimensionale** Arrays (`int[,]`, rechteckig) und **Jagged Arrays** (`int[][]`, Array von Arrays). Die Klasse `Array` bietet `Sort`, `Reverse`, `IndexOf`, `Resize`. **Strings** sind unveränderliche Objekte mit vielen Methoden (`Split`, `Substring`, `IndexOf`, `Trim`, `Replace`, `Contains`, `StartsWith`, `ToUpper`); für viele Verkettungen nimmt man `StringBuilder`.',
  m: '**Länge: `arr.Length`, `str.Length`.** **Index 0 bis Length - 1, sonst IndexOutOfRangeException.** **`Substring(start, LÄNGE)`** (nicht Endindex wie in Java!). **`Split(\';\')` liefert string[].** **Strings sind unveränderlich: `s = s.Trim();`** **`string.Join(", ", liste)`.**',
  cheat: [
    ['Arrays', ['`int[] a = new int[5];`', '`string[] t = { "Mo", "Di" };`', '`int[,] m = new int[3, 4];`', '`Array.Sort(a)`, `Array.Reverse(a)`']],
    ['String-Abfragen', ['`s.Length`, `s[0]`', '`s.IndexOf("x")` (-1)', '`s.Contains`, `StartsWith`, `EndsWith`', '`string.IsNullOrEmpty(s)`']],
    ['String-Umformen', ['`s.Substring(2, 3)` (Start, Länge)', '`s.Trim()`, `ToUpper()`, `ToLower()`', '`s.Replace(",", ".")`', '`s.Split(\';\')`, `string.Join`']],
    ['StringBuilder', ['`using System.Text;`', '`var sb = new StringBuilder();`', '`sb.Append(x).AppendLine()`', '`sb.ToString()`']],
  ],
  blocks: [
    ['h', 'Eindimensionale Arrays'],
    ['code', 'csharp', `double[] temp = new double[4];        // vier Nullen
temp[0] = 2; temp[1] = 3; temp[2] = 4; temp[3] = 3;
double mittel = 0;
for (int i = 0; i < temp.Length; i++) mittel += temp[i];
mittel /= temp.Length;                     // 3

int[] noten = { 2, 1, 3, 2 };
Array.Sort(noten);                         // [1, 2, 2, 3]
Console.WriteLine(string.Join(", ", noten));   // Ausgabe des Inhalts
int pos = Array.IndexOf(noten, 3);         // 3
Array.Resize(ref noten, 6);                // neues, größeres Array (Inhalt kopiert)`],
    ['warn', '`Console.WriteLine(noten);` gibt nur `System.Int32[]` aus. Für den Inhalt `string.Join(", ", noten)` verwenden.'],
    ['h', 'Mehrdimensionale und Jagged Arrays'],
    ['code', 'csharp', `int[,] sitze = new int[5, 8];             // rechteckig: 5 Reihen, 8 Plätze
sitze[2, 3] = 1;
int reihen = sitze.GetLength(0);           // 5
int plaetze = sitze.GetLength(1);          // 8

int[][] zacken = new int[3][];             // Jagged: Zeilen unterschiedlich lang
zacken[0] = new int[] { 1 };
zacken[1] = new int[] { 1, 2, 3 };
zacken[2] = new int[2];
Console.WriteLine(zacken[1].Length);       // 3`],
    ['h', 'Polymorphe Arrays (Winter 2023/24)'],
    ['code', 'csharp', `Person[] personListe = new Person[10];     // Platz für 10 Referenzen, alle null
personListe[0] = new Kind();               // Kind IST EINE Person
personListe[1] = new Erzieherin();
((Kind)personListe[0]).SetNote(1.7);       // Cast, um Kind-Methoden zu nutzen

for (int i = 0; i < personListe.Length && personListe[i] != null; i++)
{
    Console.Write($"{i + 1,2}: {personListe[i].GetNachname()}");
    if (personListe[i].IstGut()) Console.Write(" <- ist gut");
    Console.WriteLine();
}`],
    ['h', 'Strings untersuchen und zerlegen'],
    ['code', 'csharp', `string zeile = "1;10;5;West,10.5,4.5;Ost,7.2,3.4;";
string[] felder = zeile.TrimEnd(';').Split(';');     // ["1", "10", "5", "West,10.5,4.5", "Ost,7.2,3.4"]
int nr = int.Parse(felder[0]);
for (int i = 3; i < felder.Length; i++)
{
    string[] teile = felder[i].Split(',');
    string bez = teile[0];
    double laenge = double.Parse(teile[1], CultureInfo.InvariantCulture);
    Console.WriteLine($"{bez}: {laenge} m");
}

string pfad = "C:\\\\daten\\\\trace.EXT1";
bool hersteller1 = pfad.EndsWith(".ext1", StringComparison.OrdinalIgnoreCase);   // true
string name = "Max Mustermann";
string vorname = name.Substring(0, name.IndexOf(' '));   // "Max" (Start 0, Länge 3)
string nachname = name.Substring(name.IndexOf(' ') + 1); // "Mustermann"`],
    ['h', 'Weitere String-Werkzeuge'],
    ['code', 'csharp', `string s = "  Feuerdorn  ";
s = s.Trim();                               // "Feuerdorn"
s.ToUpper();                                // "FEUERDORN" (s bleibt unverändert!)
s.Replace("dorn", "busch");                 // "Feuerbusch"
s.PadRight(12, '.');                        // "Feuerdorn..."
char c = s[0];                              // 'F'
int ziffer = '7' - '0';                     // 7
bool leer = string.IsNullOrWhiteSpace("  ");   // true
string pfadVerbatim = @"C:\\daten\\trace.csv";   // @ = Backslashes nicht maskieren
string mehrzeilig = """
    Strauch GmbH
    Bergstraße 21
    """;                                      // Raw-String-Literal (C# 11)`],
    ['h', 'StringBuilder'],
    ['code', 'csharp', `using System.Text;

var sb = new StringBuilder();
sb.AppendLine("Nr\\tBezeichnung\\tAnzahl\\tEinzelpreis\\tGesamtpreis");
int nr = 1;
decimal summe = 0;
foreach (var pos in positionen)
{
    decimal gesamt = pos.Preis * pos.Anzahl;
    summe += gesamt;
    sb.AppendLine($"{nr++}\\t{pos.Bezeichnung}\\t{pos.Anzahl}\\t{pos.Preis:F2}\\t{gesamt:F2}");
}
sb.AppendLine($"Gesamtpreis: {summe:F2}");
Console.Write(sb.ToString());`],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie eine Methode `static double SexaZuDez(string s)`, die die Angabe 49° 0\' 33,228" in Dezimalgrad umrechnet.', [['code', 'csharp', `static double SexaZuDez(string s)
{
    string[] t = s.Split(' ');
    double grad = double.Parse(t[0].TrimEnd('°'));
    double min = double.Parse(t[1].TrimEnd('\\''));
    double sek = double.Parse(t[2].TrimEnd('"').Replace(',', '.'), CultureInfo.InvariantCulture);
    return grad + min / 60 + sek / 3600;
}`]], 5],
    ['qa', 'Was ist der Unterschied zwischen `Substring` in C# und `substring` in Java?', ['In **C#** bedeutet der zweite Parameter die **Länge**: `"Prüfung".Substring(1, 3)` = "rüf".', 'In **Java** bedeutet er den **Endindex (exklusiv)**: `"Prüfung".substring(1, 3)` = "rü".'], 2],
    ['quiz', [
      {q: 'Was liefert "Notebook".Substring(4, 4)?', o: ['"book"', '"Note"', '"ebook"', 'Fehler'], a: 0, e: 'Start 4, Länge 4.'},
      {q: 'Welche Ausnahme tritt bei arr[arr.Length] auf?', o: ['IndexOutOfRangeException', 'NullReferenceException', 'FormatException', 'Keine'], a: 0, e: 'In Java: ArrayIndexOutOfBoundsException.'},
      {q: 'Wie gibt man den Inhalt eines Arrays als Text aus?', o: ['string.Join(", ", arr)', 'arr.ToString()', 'Console.WriteLine(arr)', 'arr.Print()'], a: 0, e: 'ToString liefert den Typnamen.'},
      {q: 'Was macht das @ vor einem String-Literal?', o: ['Backslashes werden nicht als Escape interpretiert', 'Interpolation aktivieren', 'String wird unveränderlich', 'Verschlüsselung'], a: 0, e: 'Verbatim-String.'},
    ]],
    ['see', ['course-csharp-04', 'course-csharp', 'eua-dateien']],
  ],
});
