AP2.page('course-csharp-08', {
  b: 'course', g: 'C#', t: 'C# 8: Vererbung, Polymorphie, abstrakte Klassen und Interfaces',
  d: 'Eine Klasse erbt in C# mit `class Kind : Basis` von **einer** Basisklasse und kann zusätzlich **beliebig viele Interfaces** implementieren (`class X : Basis, IA, IB`). Der Konstruktor ruft mit `: base(...)` den Basiskonstruktor auf. Anders als in Java sind Methoden **nicht automatisch überschreibbar**: Die Basisklasse muss sie als **`virtual`** (oder `abstract`) kennzeichnen, die Unterklasse überschreibt mit **`override`**. `abstract`-Klassen lassen sich nicht instanziieren, `abstract`-Methoden haben keinen Rumpf. Interfaces heißen nach Konvention `I...` (`IImportService`). `sealed` verhindert weiteres Ableiten.',
  m: '**`: Basis` erbt, `: base(...)` ruft Basiskonstruktor.** **Überschreiben nur bei virtual/abstract + override.** **abstract-Methode: kein Rumpf, Klasse muss abstract sein.** **Interface: `interface IName { void M(); }`, Klasse implementiert alle Member public.** **Typ prüfen: `is`, sicher umwandeln: `as` (null bei Fehlschlag).**',
  cheat: [
    ['Vererbung', ['`class Strom : Messwert`', '`: base(wert)` im Konstruktor', '`protected` für Unterklassen', '`sealed class` = nicht ableitbar']],
    ['Überschreiben', ['Basis: `public virtual string Info()`', 'Kind: `public override string Info()`', '`base.Info()` Basisversion', '`new` versteckt (vermeiden)']],
    ['Abstrakt', ['`abstract class Fahrzeug`', '`public abstract double GetPreis();`', 'Unterklasse: `public override double GetPreis()`', 'kein `new Fahrzeug()`']],
    ['Interface', ['`interface IBeobachter { void Aktualisieren(int e); }`', '`class Patient : Person, IBeobachter`', 'mehrere Interfaces möglich', 'Variable vom Interface-Typ']],
  ],
  blocks: [
    ['h', 'Abstrakte Basisklasse und Unterklassen (Winter 2024/25)'],
    ['code', 'csharp', `abstract class Messwert
{
    protected double wert;                        // # protected
    public abstract bool PruefeWert();            // abstrakt: kein Rumpf
    public double GetWert() { return wert; }
}

class Strom : Messwert
{
    public Strom(double wert) { this.wert = wert; }
    public override bool PruefeWert() => wert >= 0.05 && wert <= 2.0;
}

class Spannung : Messwert
{
    public Spannung(double wert) { this.wert = wert; }
    public override bool PruefeWert() => wert >= 2.5 && wert <= 4.2;
}

List<Messwert> werte = new() { new Strom(1.2), new Spannung(5.0), new Strom(0.01) };
foreach (Messwert m in werte)
    Console.WriteLine($"{m.GetType().Name} {m.GetWert()}: {(m.PruefeWert() ? "ok" : "ungültig")}");`],
    ['h', 'virtual und override'],
    ['code', 'csharp', `class Person
{
    protected string nachname;
    public Person(string nachname) { this.nachname = nachname; }
    public virtual string Beschreibung() => nachname;          // darf überschrieben werden
}

class Erzieherin : Person
{
    private int berufsjahre;
    public Erzieherin(string nachname, int jahre) : base(nachname) { berufsjahre = jahre; }
    public override string Beschreibung() => base.Beschreibung() + $" ({berufsjahre} Jahre)";
}

Person p = new Erzieherin("Schmidt", 12);
Console.WriteLine(p.Beschreibung());     // Schmidt (12 Jahre)  <- dynamische Bindung`],
    ['warn', 'Fehlt `virtual` in der Basisklasse, kann man nicht `override` schreiben (Compilerfehler). Schreibt man in der Unterklasse dieselbe Methode **ohne** override, **verdeckt** sie die Basismethode nur (Warnung, Schlüsselwort `new`). Dann wird über eine Variable vom Basistyp die **Basisversion** aufgerufen, Polymorphie funktioniert nicht.'],
    ['h', 'Polymorphie in der Prüfung (Winter 2023/24)'],
    ['code', 'csharp', `abstract class Person
{
    private string nachname = "";
    public void SetNachname(string n) => nachname = n;
    public string GetNachname() => nachname;
    public abstract bool IstGut();
}
class Kind : Person
{
    private double noteVorschultest;
    public void SetNote(double n) => noteVorschultest = n;
    public override bool IstGut() => noteVorschultest < 2.5;
}
class Erzieherin : Person
{
    private int berufsjahre;
    public void SetBerufsjahre(int j) => berufsjahre = j;
    public override bool IstGut() => berufsjahre >= 8;
}

Person[] liste = new Person[10];
liste[0] = new Kind();
liste[0].SetNachname("Müller");
((Kind)liste[0]).SetNote(1.7);              // Cast für Kind-spezifische Methode
if (liste[0] is Kind k) k.SetNote(1.7);     // eleganter: Typmuster
Kind? vielleicht = liste[0] as Kind;        // as: null statt Exception, wenn es kein Kind ist`],
    ['h', 'Interfaces'],
    ['code', 'csharp', `interface IImportService                    // Vertrag: was ein Importer können muss
{
    string GetDataPath();
    void Read();
    string GetDriveName();
}

class Manufacturer1Import : IImportService
{
    private readonly string pfad;
    private string[] zeilen = Array.Empty<string>();
    public Manufacturer1Import(string pfad) { this.pfad = pfad; }
    public string GetDataPath() => pfad;
    public void Read() => zeilen = File.ReadAllLines(pfad);
    public string GetDriveName() => zeilen[1].Split(':')[1].Trim();   // "Antriebsbezeichnung: Zuführung"
}

static class Import                         // Factory
{
    public static IImportService CreateServiceObj(string pfad) =>
        pfad.EndsWith(".ext1") ? new Manufacturer1Import(pfad)
      : pfad.EndsWith(".ext2") ? new Manufacturer2Import(pfad)
      : throw new NotSupportedException("Unbekanntes Format");
}`],
    ['table', ['', 'abstrakte Klasse', 'Interface'], [
      ['Vererbung', 'nur eine Basisklasse', 'beliebig viele'],
      ['Felder/Zustand', 'ja', 'nein (nur Properties ohne Speicher)'],
      ['Konstruktor', 'ja', 'nein'],
      ['Implementierung', 'abstrakte und konkrete Methoden', 'nur Signaturen (seit C# 8 auch Default-Implementierungen)'],
      ['Bedeutung', '"ist ein"', '"kann" / erfüllt Vertrag'],
    ]],
    ['h', 'Die Klasse object'],
    ['p', 'Alle Typen erben von `object` und bringen `ToString()`, `Equals()`, `GetHashCode()` und `GetType()` mit. `ToString()` überschreibt man für eine lesbare Ausgabe, `Equals`/`GetHashCode` für fachliche Gleichheit (zum Beispiel in `Dictionary` oder `HashSet`).'],
    ['h', 'Übungen'],
    ['qa', 'Deklarieren Sie `abstract class Fahrzeug` mit abstrakter Methode `GetPreis()`, die abstrakte Klasse `EFahrzeug : Fahrzeug` und `EScooter : EFahrzeug` mit Preis 10,50 (Sommer 2025).', [['code', 'csharp', `abstract class Fahrzeug
{
    public abstract double GetPreis();
}
abstract class EFahrzeug : Fahrzeug { }
public class EScooter : EFahrzeug
{
    public override double GetPreis()
    {
        return 10.50;
    }
}`]], 9],
    ['qa', 'Was gibt dieser Code aus? `class A { public virtual string F() => "A"; public string G() => "A"; }` / `class B : A { public override string F() => "B"; public new string G() => "B"; }` / `A x = new B(); Console.WriteLine(x.F() + x.G());`', ['**BA**. F ist virtual und wird überschrieben -> dynamische Bindung ruft B.F. G wird nur verdeckt (`new`) -> über den statischen Typ A wird A.G aufgerufen.'], 3],
    ['quiz', [
      {q: 'Was braucht die Basismethode, damit sie überschrieben werden kann?', o: ['virtual oder abstract', 'static', 'sealed', 'nichts'], a: 0, e: 'In Java ist das Standard, in C# nicht.'},
      {q: 'Wie ruft man den Konstruktor der Basisklasse auf?', o: [': base(...)', ': super(...)', 'this(...)', 'Basis.new()'], a: 0, e: 'Hinter der Konstruktorsignatur.'},
      {q: 'Was liefert obj as Kind, wenn obj kein Kind ist?', o: ['null', 'InvalidCastException', 'ein leeres Kind', 'false'], a: 0, e: 'Direkter Cast würde eine Exception werfen.'},
      {q: 'Von wie vielen Klassen kann eine C#-Klasse erben?', o: ['einer', 'beliebig vielen', 'zwei', 'keiner'], a: 0, e: 'Interfaces beliebig viele.'},
    ]],
    ['see', ['course-csharp-07', 'course-csharp-09', 'eua-saeulen', 'eua-interface', 'eua-patterns']],
  ],
});
