AP2.page('eua-konstruktor', {
  b: 'eua', g: 'Objektorientierung', t: 'Konstruktoren und Destruktoren',
  d: 'Ein **Konstruktor** ist eine **spezielle Methode**, die beim Erzeugen eines Objekts (`new`) **automatisch** aufgerufen wird und es **initialisiert** (Attribute setzen). Er hat den **Namen der Klasse** und **keinen Rückgabetyp**. Ein **Destruktor** räumt beim **Zerstören** eines Objekts auf (Ressourcen freigeben). Java und C# haben einen **Garbage Collector**, deshalb kaum Destruktoren.',
  m: '**Konstruktor = Geburt des Objekts (Initialisierung), Destruktor = Tod des Objekts (Aufräumen).** Konstruktor: **Name = Klassenname, kein Rückgabetyp, auch kein void.** Java: **kein Destruktor** (Garbage Collector), C++: `~Klasse()`, C#: Finalizer `~Klasse()`, Python: `__init__` und `__del__`.',
  cheat: [
    ['Konstruktor', ['**Name = Klassenname**', '**Kein Rückgabetyp** (auch kein `void`)', 'Wird bei `new` **automatisch** aufgerufen', 'Setzt Attribute auf Startwerte', 'Kann **überladen** werden']],
    ['Arten', ['**Standardkonstruktor** (ohne Parameter), vom Compiler ergänzt, **nur wenn keiner** definiert ist', '**Parametrisierter** Konstruktor', '**Kopierkonstruktor** (Kopie eines Objekts)', '`private` Konstruktor: Singleton, Utility-Klasse']],
    ['Verkettung', ['`this(...)` ruft **anderen Konstruktor derselben Klasse** auf', '`super(...)` ruft **Konstruktor der Oberklasse** auf (muss **erste Anweisung** sein)', 'Reihenfolge: Oberklasse zuerst, dann Unterklasse']],
    ['Destruktor / Aufräumen', ['**Java:** Garbage Collector; `try-with-resources`/`close()` für Ressourcen', '**C#:** Finalizer `~Klasse`, besser `IDisposable` und `using`', '**C++:** `~Klasse()` deterministisch', '**Python:** `__del__`, besser `with`']],
  ],
  blocks: [
    ['h', 'Konstruktor'],
    ['p', 'Ein Objekt soll von Anfang an einen **gültigen Zustand** haben. Ohne Konstruktor könnte man ein `Konto` ohne Inhaber erzeugen. Der Konstruktor erzwingt, dass **Pflichtwerte** beim Erzeugen angegeben werden.'],
    ['codes', [
      ['java', `public class Kunde {
    private String name;
    private String ort;

    public Kunde() {                        // Standardkonstruktor
        this("unbekannt", "unbekannt");     // ruft den anderen Konstruktor auf
    }
    public Kunde(String name, String ort) { // parametrisierter Konstruktor
        this.name = name;
        this.ort = ort;
    }
    public Kunde(Kunde k) {                 // Kopierkonstruktor
        this(k.name, k.ort);
    }
}
Kunde a = new Kunde();                     // unbekannt, unbekannt
Kunde b = new Kunde("Mia", "Ulm");`],
      ['csharp', `public class Kunde
{
    private string name;
    private string ort;

    public Kunde() : this("unbekannt", "unbekannt") { }   // this(...) verkettet
    public Kunde(string name, string ort)
    {
        this.name = name;
        this.ort = ort;
    }
}`],
      ['python', `class Kunde:
    def __init__(self, name="unbekannt", ort="unbekannt"):   # nur ein Konstruktor,
        self.name = name                                      # Standardwerte statt Überladung
        self.ort = ort

a = Kunde()
b = Kunde("Mia", "Ulm")`],
    ]],
    ['warn', ['**Wichtig:** Definiert man **irgendeinen** eigenen Konstruktor, erzeugt der Compiler **keinen Standardkonstruktor** mehr. Dann ist `new Kunde()` nur noch möglich, wenn man ihn selbst schreibt.', '**Vererbung:** Der Konstruktor einer Unterklasse ruft zuerst `super(...)` auf. Fehlt der Aufruf, wird der **parameterlose** Konstruktor der Oberklasse verwendet. Gibt es den nicht, ist es ein **Compilerfehler**.']],
    ['h', 'Reihenfolge bei Vererbung'],
    ['code', 'java', `class A { A() { System.out.println("A"); } }
class B extends A { B() { super(); System.out.println("B"); } }
class C extends B { C() { super(); System.out.println("C"); } }
new C();     // Ausgabe: A, B, C  (Oberklasse zuerst)`],
  ],
});
