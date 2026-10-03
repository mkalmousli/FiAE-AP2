AP2.add('course-csharp', [
  ['h', 'Sammlungen, Arrays, Strings'],
  ['code', 'csharp', `int[] feld = new int[5];  int[] f2 = { 3, 1, 2 };  int[,] matrix = new int[3, 3];   // fest, Index ab 0
Array.Sort(f2);  Console.WriteLine(f2.Length);
var liste = new List<string> { "a", "b" };                    // dynamisch
liste.Add("c"); liste.Remove("a"); liste.Insert(0, "z"); liste.Sort(); bool da = liste.Contains("b");
var dict = new Dictionary<string, int> { ["Anna"] = 21 };
dict["Ben"] = 17;
if (dict.TryGetValue("Cem", out var alter)) Console.WriteLine(alter);
foreach (var (name, a) in dict) Console.WriteLine($"{name}: {a}");   // KeyValuePair dekonstruieren
var menge = new HashSet<int> { 1, 2, 2, 3 };                   // eindeutige Werte
var warte = new Queue<string>(); warte.Enqueue("A"); warte.Dequeue();   // FIFO
var stapel = new Stack<int>(); stapel.Push(1); stapel.Pop();             // LIFO

string t = "Hallo Welt";
Console.WriteLine(t.ToUpper() + t.Substring(0, 5) + t.Replace("Welt", "C#") + t.Split(' ').Length);
Console.WriteLine(string.Join(", ", liste) + string.IsNullOrWhiteSpace(" "));
var sb = new System.Text.StringBuilder();                      // viele Anhänge: effizient
for (int i = 0; i < 3; i++) sb.Append(i).Append(';');`],
  ['table', ['Sammlung', 'Zugriff', 'Eigenschaft', 'Einsatz'], [['`T[]`', 'O(1) Index', 'Feste Größe', 'Schnelle, feste Folge'], ['`List<T>`', 'O(1) Index', 'Wachsend, geordnet', 'Standardliste'], ['`Dictionary<K,V>`', 'O(1) im Mittel', 'Hashtabelle, Schlüssel eindeutig', 'Suche, Zählen'], ['`HashSet<T>`', 'O(1) `Contains`', 'Ohne Duplikate', 'Mengen'], ['`Queue<T>` / `Stack<T>`', '-', 'FIFO / LIFO', 'Warteschlange, Rückgängig'], ['`SortedDictionary`', 'O(log n)', 'Sortiert nach Schlüssel', 'Geordnete Daten'], ['`ImmutableList<T>`', '-', 'Unveränderbar', 'Threadsicher teilen']]],
  ['h', 'Klassen und Objektorientierung'],
  ['code', 'csharp', `public class Konto
{
    private decimal _stand;                              // Feld (Konvention: _name)
    public string Inhaber { get; }                        // nur lesbar (im Konstruktor gesetzt)
    public decimal Stand                                  // Property mit Logik
    {
        get => _stand;
        private set { if (value < 0) throw new ArgumentOutOfRangeException(nameof(value)); _stand = value; }
    }
    public string Notiz { get; set; } = "";               // automatische Property
    public static int Anzahl { get; private set; }        // gehört zur Klasse

    public Konto(string inhaber, decimal stand = 0)       // Konstruktor
    {
        Inhaber = inhaber ?? throw new ArgumentNullException(nameof(inhaber));
        Stand = stand; Anzahl++;
    }
    public virtual void Einzahlen(decimal betrag)         // virtual: darf überschrieben werden
    {
        if (betrag <= 0) throw new ArgumentException("Betrag muss positiv sein", nameof(betrag));
        Stand += betrag;
    }
    public override string ToString() => $"{Inhaber}: {Stand:C}";
}
public class Sparkonto : Konto                             // Vererbung (nur EINE Basisklasse)
{
    public decimal Zins { get; init; } = 0.02m;            // init: nur bei der Erzeugung setzbar
    public Sparkonto(string inhaber) : base(inhaber) { }   // Basiskonstruktor
    public override void Einzahlen(decimal betrag) { base.Einzahlen(betrag * 1.01m); }
}
var k = new Sparkonto("Anna") { Zins = 0.03m };           // Objektinitialisierer`],
  ['table', ['Modifizierer', 'Sichtbarkeit'], [['`public`', 'überall'], ['`private`', 'nur in der Klasse (Standard für Member)'], ['`protected`', 'Klasse und abgeleitete Klassen'], ['`internal`', 'im selben Assembly (Projekt), Standard für Klassen'], ['`protected internal` / `private protected`', 'Kombinationen']]],
  ['table', ['Schlüsselwort', 'Bedeutung'], [['`virtual` / `override`', 'Methode ist überschreibbar / überschreibt die der Basisklasse (**Polymorphie**)'], ['`abstract`', 'Klasse nicht instanziierbar oder Methode ohne Rumpf, in Ableitung Pflicht'], ['`sealed`', 'Keine Ableitung mehr möglich'], ['`static`', 'Gehört zur Klasse, nicht zur Instanz; statische Klasse nicht instanziierbar'], ['`new` (Methode)', 'Verdeckt Basismethode (**kein** Überschreiben, selten sinnvoll)'], ['`partial`', 'Klasse auf mehrere Dateien verteilt (oft generierter Code)']]],
  ['h', 'Interfaces, Records, Structs, Enums'],
  ['code', 'csharp', `public interface IBezahlbar { decimal Preis { get; } void Bezahlen(); }   // Vertrag, mehrere erlaubt
public class Artikel : IBezahlbar, IComparable<Artikel>
{
    public decimal Preis { get; set; }
    public void Bezahlen() => Console.WriteLine("bezahlt");
    public int CompareTo(Artikel o) => Preis.CompareTo(o.Preis);
}
public record Person(string Name, int Alter);                  // unveränderlich, Wertgleichheit, ToString, with
var p1 = new Person("Anna", 21); var p2 = p1 with { Alter = 22 }; Console.WriteLine(p1 == new Person("Anna", 21));  // True
public struct Punkt { public int X, Y; }                        // Werttyp (Kopie bei Zuweisung)
public enum Wochentag { Mo = 1, Di, Mi }                        // benannte Konstanten
Wochentag tag = Wochentag.Di;  Console.WriteLine((int)tag);     // 2`],
  ['table', ['', 'class', 'struct', 'record'], [['Typ', 'Referenz', 'Wert', 'Referenz (record struct: Wert)'], ['Zuweisung', 'Kopiert Verweis', 'Kopiert Inhalt', 'Kopiert Verweis'], ['Gleichheit', 'Standard: Referenz', 'Standard: Feldweise', '**Wertgleichheit**'], ['Einsatz', 'Objekte mit Verhalten', 'Kleine Daten (Punkt, Farbe)', 'Unveränderliche Datenträger (DTO)']]],
]);
