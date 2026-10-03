AP2.page('eua-saeulen', {
  b: 'eua', g: 'Objektorientierung', t: 'Vererbung, Polymorphie, Kapselung und Abstraktion',
  d: 'Die vier Grundprinzipien der OOP: **Kapselung** (Daten verstecken, Zugriff über Methoden), **Vererbung** (Unterklasse übernimmt Eigenschaften der Oberklasse, "ist ein"), **Polymorphie** (gleicher Aufruf, je nach Objekt verschiedenes Verhalten) und **Abstraktion** (nur das Wesentliche modellieren, Details verbergen).',
  m: '**K-V-P-A**: **K**apselung, **V**ererbung, **P**olymorphie, **A**bstraktion. **Vererbung = "ist ein"** (Hund ist ein Tier), **Komposition = "hat ein"** (Auto hat einen Motor). Polymorphie: **eine Schnittstelle, viele Formen.**',
  cheat: [
    ['Kapselung', ['Attribute **private**', 'Zugriff über **Getter/Setter**', 'Schützt vor ungültigen Werten', 'Interne Änderung ohne Folgen']],
    ['Vererbung', ['`class Hund extends Tier` (Java), `: Tier` (C#)', 'Unterklasse erbt Attribute und Methoden', '**Überschreiben** (override) ändert Verhalten', '`super` verweist auf die Oberklasse']],
    ['Polymorphie', ['Variable vom Typ der **Oberklasse**, Objekt der **Unterklasse**', 'Aufgerufen wird die Methode der **tatsächlichen** Klasse (dynamische Bindung)', '`Tier t = new Hund(); t.laut();` ergibt "Wau"']],
    ['Abstraktion', ['**Abstrakte Klasse** / **Interface**', 'Nur Methodenköpfe, keine Details', 'Nutzer kennt nur "was", nicht "wie"']],
  ],
  blocks: [
    ['h', 'Kapselung (Encapsulation)'],
    ['p', 'Die Daten eines Objekts werden **versteckt** (private). Von außen kann man sie nur über **öffentliche Methoden** lesen oder ändern. So schützt sich das Objekt vor **ungültigen Zuständen**. Beispiel: Der Kontostand lässt sich nicht direkt auf -1000 setzen; nur `abheben()` ändert ihn und prüft vorher.'],
    ['code', 'java', `public class Person {
    private int alter;                         // von außen nicht erreichbar
    public int getAlter() { return alter; }    // Getter
    public void setAlter(int a) {              // Setter mit Prüfung
        if (a >= 0 && a <= 150) alter = a;
        else throw new IllegalArgumentException("Ungültiges Alter");
    }
}`],
    ['h', 'Vererbung (Inheritance)'],
    ['p', 'Eine **Unterklasse (Subklasse, abgeleitete Klasse)** erbt von einer **Oberklasse (Basisklasse, Superklasse)** alle Attribute und Methoden und kann sie **erweitern** oder **überschreiben**. Das vermeidet doppelten Code. Test: Gilt "**A ist ein B**"? Dann ist Vererbung passend (Hund **ist ein** Tier). Gilt "**A hat ein B**" (Auto **hat einen** Motor), nutzt man **Komposition** (Attribut).'],
    ['diagram', {w: 760, h: 270, keep: 600, cap: 'Vererbungshierarchie: Hund und Katze erben von Tier und überschreiben laut().', nodes: [
      {id: 't', k: 'cls', x: 380, y: 70, w: 230, t: {name: 'Tier', attrs: ['# name: String'], ops: ['+ laut(): void', '+ fressen(): void']}},
      {id: 'h', k: 'cls', x: 190, y: 210, w: 200, t: {name: 'Hund', attrs: ['- rasse: String'], ops: ['+ laut(): void']}}, {id: 'k', k: 'cls', x: 570, y: 210, w: 200, t: {name: 'Katze', attrs: [], ops: ['+ laut(): void', '+ schnurren(): void']}},
    ], edges: [{a: 'h', b: 't', ea: 'tri'}, {a: 'k', b: 't', ea: 'tri'}]}],
    ['codes', [
      ['java', `class Tier {
    protected String name;
    Tier(String name) { this.name = name; }
    void laut() { System.out.println("..."); }
    void fressen() { System.out.println(name + " frisst"); }
}
class Hund extends Tier {
    Hund(String name) { super(name); }       // Konstruktor der Oberklasse aufrufen
    @Override
    void laut() { System.out.println("Wau"); }      // überschreibt
}
class Katze extends Tier {
    Katze(String name) { super(name); }
    @Override
    void laut() { System.out.println("Miau"); }
    void schnurren() { System.out.println("Brrr"); }   // nur Katze
}`],
      ['csharp', `class Tier {
    protected string name;
    public Tier(string name) { this.name = name; }
    public virtual void Laut() { Console.WriteLine("..."); }   // virtual: überschreibbar
}
class Hund : Tier {
    public Hund(string name) : base(name) { }
    public override void Laut() { Console.WriteLine("Wau"); }
}`],
      ['python', `class Tier:
    def __init__(self, name):
        self.name = name
    def laut(self):
        print("...")

class Hund(Tier):
    def __init__(self, name):
        super().__init__(name)
    def laut(self):                # überschreibt
        print("Wau")`],
    ]],
    ['table', ['Begriff', 'Bedeutung'], [['**Überschreiben (Override)**', 'Unterklasse ersetzt eine **geerbte Methode** durch eine neue Implementierung (gleiche Signatur). Entscheidung zur **Laufzeit**.'], ['**Überladen (Overload)**', 'Mehrere Methoden **gleichen Namens mit verschiedenen Parametern** in einer Klasse. Entscheidung zur **Übersetzungszeit**.'], ['`super`', 'Zugriff auf Oberklasse (Konstruktor oder überschriebene Methode).'], ['`final` (Java) / `sealed` (C#)', 'Klasse oder Methode darf nicht weitervererbt/überschrieben werden.'], ['Mehrfachvererbung', 'Java und C# erlauben nur **eine Oberklasse**, aber **mehrere Interfaces**. Python und C++ erlauben Mehrfachvererbung.']]],
  ],
});
