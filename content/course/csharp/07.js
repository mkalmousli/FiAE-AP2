AP2.page('course-csharp-07', {
  b: 'course', g: 'C#', t: 'C# 7: Klassen, Objekte und Properties',
  d: 'Klassen bündeln **Felder** (Daten), **Properties** (kontrollierter Zugriff auf Daten), **Konstruktoren** und **Methoden**. Objekte erzeugt man mit `new`. Statt klassischer Get-/Set-Methoden nutzt C# **Properties**: `public string Name { get; set; }` (automatisch implementiert) oder mit eigenem Code im `get`/`set`-Accessor, etwa für Plausibilitätsprüfungen. Sichtbarkeiten: `private` (Standard bei Membern), `protected`, `internal` (nur im Projekt/Assembly), `public`. Der Konstruktor ruft mit `: this(...)` einen anderen Konstruktor derselben Klasse auf. `ToString()` wird mit `override` überschrieben.',
  m: '**Feld private, Zugriff über Property.** **Auto-Property: `{ get; set; }`, nur lesbar: `{ get; }` oder `{ get; private set; }`.** **Im set heißt der neue Wert `value`.** **In Prüfungen ist auch der Java-Stil mit `GetName()`/`SetName()` korrekt.** **`readonly`-Feld: nur im Konstruktor setzbar.**',
  cheat: [
    ['Klasse', ['`public class Kunde`', '`private string name;` Feld', '`public Kunde(string name) { this.name = name; }`', '`var k = new Kunde("Max");`']],
    ['Properties', ['`public int Anzahl { get; set; }`', '`public decimal Preis { get; private set; }`', '`public string Name => name;` nur lesen', 'set mit Prüfung: `if (value < 0) throw ...`']],
    ['Sichtbarkeit', ['`private` -', '`protected` #', '`internal` ~ (Assembly)', '`public` +']],
    ['Weiteres', ['`static` Mitglieder der Klasse', '`readonly`, `const`', '`override ToString()`', 'Objektinitialisierer `new X { A = 1 }`']],
  ],
  blocks: [
    ['h', 'Klasse mit Feldern, Konstruktor und Get/Set-Methoden (Prüfungsstil)'],
    ['code', 'csharp', `public class Person
{
    private string name, vorname, fon, mail;          // private Text-Attribute

    public Person(string name, string vorname, string fon, string mail)
    {
        this.name = name;
        this.vorname = vorname;
        this.fon = fon;
        this.mail = mail;
    }

    public string GetName() { return name; }
    public void SetName(string name) { this.name = name; }
    public string GetMail() { return mail; }
    public void SetMail(string mail) { this.mail = mail; }
    // ... weitere Getter/Setter analog
}`],
    ['h', 'Dasselbe mit Properties (C#-Stil)'],
    ['code', 'csharp', `public class Artikel
{
    private decimal einkaufspreis;                       // Hintergrundfeld

    public string Bezeichnung { get; set; }              // Auto-Property

    public decimal Einkaufspreis                         // Property mit Prüfung
    {
        get { return einkaufspreis; }
        set
        {
            if (value < 0) throw new ArgumentException("Preis darf nicht negativ sein");
            einkaufspreis = value;                       // value = zugewiesener Wert
        }
    }

    public decimal Brutto => Einkaufspreis * 1.19m;      // berechnete, nur lesbare Property

    public Artikel(string bezeichnung, decimal einkaufspreis)
    {
        Bezeichnung = bezeichnung;
        Einkaufspreis = einkaufspreis;                   // läuft durch die Prüfung im set
    }

    public override string ToString() => $"{Bezeichnung}: {Einkaufspreis:F2} EUR";
}

var a = new Artikel("Feuerdorn", 5m);
a.Einkaufspreis = 5.5m;          // sieht aus wie ein Feld, ruft aber set auf
Console.WriteLine(a.Brutto);     // 6.545
Console.WriteLine(a);            // Feuerdorn: 5,50 EUR`],
    ['table', ['UML', 'C# mit Methoden', 'C# mit Property'], [
      ['`- preis: double`', '`private double preis;`', '`private double preis;`'],
      ['`+ getPreis(): double`', '`public double GetPreis() { return preis; }`', '`public double Preis { get => preis; ...}`'],
      ['`+ setPreis(p: double)`', '`public void SetPreis(double p) { preis = p; }`', '`set => preis = value;`'],
    ]],
    ['h', 'Mehrere Konstruktoren, Objektinitialisierer'],
    ['code', 'csharp', `public class Akku
{
    public string Id { get; }                       // nur im Konstruktor setzbar
    public int Nennkapazitaet { get; }
    public double Istkapazitaet { get; set; }

    public Akku(string id, int nenn) : this(id, nenn, nenn) { }   // ruft anderen Konstruktor
    public Akku(string id, int nenn, double ist)
    {
        Id = id; Nennkapazitaet = nenn; Istkapazitaet = ist;
    }
    public double AbweichungProzent() => (Nennkapazitaet - Istkapazitaet) / Nennkapazitaet * 100;
}

public class Kunde
{
    public string Name { get; set; } = "";
    public string Ort { get; set; } = "";
}
var k = new Kunde { Name = "Max", Ort = "Ulm" };   // Objektinitialisierer (braucht set oder init)`],
    ['h', 'static, readonly, const'],
    ['code', 'csharp', `public class Kunde
{
    private static int zaehler = 0;          // gemeinsam für alle Objekte
    public const int MaxBestellungen = 50;   // Kompilierzeitkonstante (implizit static)
    private readonly int nummer;             // nur im Konstruktor setzbar

    public Kunde() { nummer = ++zaehler; }
    public int Nummer => nummer;
    public static int Anzahl => zaehler;
}`],
    ['h', 'Assoziationen umsetzen'],
    ['code', 'csharp', `public class Messplatz
{
    private readonly List<Akku> akkuliste = new List<Akku>();   // Rolle akkuliste, *

    public void AddAkku(Akku a) => akkuliste.Add(a);
    public Akku? FindeAkku(string id) => akkuliste.Find(a => a.Id == id);   // null, wenn nicht da
    public int AnzahlAkkus => akkuliste.Count;
}`],
    ['h', 'struct und record (Überblick)'],
    ['table', ['Art', 'Typ', 'Einsatz'], [
      ['`class`', 'Referenztyp', 'Normalfall: Objekte mit Identität und Verhalten'],
      ['`struct`', 'Werttyp (wird kopiert)', 'Kleine Werte wie Punkt, Farbe'],
      ['`record`', 'Referenztyp mit Wertgleichheit', 'Datenobjekte: `public record Messwert(string Einheit, double Wert);` (Equals und ToString automatisch)'],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Implementieren Sie die Klasse `Lehrer : Person` (Winter 2023/24) mit privater Text-Liste `lehrBefaehigung` und privatem `dienstJahre`, Konstruktor für alle Attribute und Gettern/Settern.', [['code', 'csharp', `class Lehrer : Person
{
    private int dienstJahre;
    private List<string> lehrBefaehigung;

    public Lehrer(string name, string vorname, string fon, string mail,
                  int dienstJahre, List<string> lehrBefaehigung)
        : base(name, vorname, fon, mail)
    {
        this.dienstJahre = dienstJahre;
        this.lehrBefaehigung = lehrBefaehigung;
    }
    public int GetDienstjahre() { return dienstJahre; }
    public void SetDienstjahre(int dienstJahre) { this.dienstJahre = dienstJahre; }
    public List<string> GetLehrbefaehigung() { return lehrBefaehigung; }
    public void SetLehrbefaehigung(List<string> l) { lehrBefaehigung = l; }
}`]], 11],
    ['qa', 'Erklären Sie den Vorteil einer Property gegenüber einem öffentlichen Feld.', ['Eine Property sieht beim Zugriff aus wie ein Feld, ruft aber **Code** auf: Im `set` kann man Werte **prüfen** (keine negativen Preise), im `get` Werte **berechnen**. Man kann Lese- und Schreibrechte getrennt festlegen (`private set`). Die interne Speicherung kann sich ändern, ohne dass aufrufender Code angepasst werden muss (Kapselung).'], 3],
    ['quiz', [
      {q: 'Wie heißt der zugewiesene Wert im set-Accessor?', o: ['value', 'wert', 'this', 'input'], a: 0, e: 'Kontextschlüsselwort.'},
      {q: 'Was bedeutet { get; private set; }?', o: ['Von außen nur lesbar, intern änderbar', 'Gar nicht lesbar', 'Nur im Konstruktor setzbar', 'Statisch'], a: 0, e: '{ get; } wäre nur im Konstruktor setzbar.'},
      {q: 'Welche Sichtbarkeit ist bei Klassenmembern Standard?', o: ['private', 'public', 'internal', 'protected'], a: 0, e: 'Klassen selbst sind standardmäßig internal.'},
      {q: 'Womit ruft ein Konstruktor einen anderen derselben Klasse auf?', o: [': this(...)', ': base(...)', 'super(...)', 'this.Konstruktor()'], a: 0, e: 'base ruft die Oberklasse.'},
    ]],
    ['see', ['course-csharp-06', 'course-csharp-08', 'eua-oop', 'eua-umlcode']],
  ],
});
