AP2.page('eua-umlcode', {
  b: 'eua', g: 'Prüfungspraxis', t: 'Klassen aus UML implementieren (C#, Java, Python)',
  d: 'Fast jede AP2-Prüfung verlangt, eine oder mehrere **Klassen aus einem UML-Klassendiagramm** in "der an Ihrer Schule unterrichteten Programmiersprache" umzusetzen (10 bis 27 Punkte). Dafür übersetzt man jede Angabe des Diagramms mechanisch: **Sichtbarkeit** (`-` private, `+` public, `#` protected), **Attribute** mit Typ, **Konstruktor**, **Getter/Setter**, **abstrakte** Klassen und Methoden (kursiv oder `{abstract}`), **Vererbung** (Pfeil mit leerem Dreieck) und **Assoziationen** mit Multiplizität und Rollenname, die zu **Attributen** (einzelne Referenz oder Liste) werden.',
  m: '**Rollenname am Pfeilende = Attributname in der anderen Klasse.** **Multiplizität 1 oder 0..1 -> einzelne Referenz, * -> Liste.** **abstract: keine Objekte, abstrakte Methode ohne Rumpf, Unterklasse MUSS überschreiben (override).** **Unterklasse ruft im Konstruktor zuerst den Basiskonstruktor: `base(...)` / `super(...)` / `super().__init__(...)`.**',
  cheat: [
    ['UML -> Code', ['`- name: string` -> private Attribut', '`+ getName(): string` -> public Methode', '`# wert: double` -> protected', 'unterstrichen -> static']],
    ['Vererbung', ['C#: `class Kind : Person`', 'Java: `class Kind extends Person`', 'Python: `class Kind(Person):`', 'Interface: `: IName` / `implements`']],
    ['Abstrakt', ['C#/Java: `abstract class`, `abstract` Methode', 'C#: `public override` in der Unterklasse', 'Java: `@Override`', 'Python: `ABC`, `@abstractmethod`']],
    ['Assoziationen', ['0..1 / 1 -> `Kunde derKunde;`', '* -> `List<Fahrzeug> fahrzeuge`', 'Komposition: Teil im Konstruktor erzeugen', 'Aggregation: Teil von außen übergeben']],
  ],
  blocks: [
    ['h', 'Schritt für Schritt vom Diagramm zum Code'],
    ['steps', [
      '**Klassenkopf:** Name übernehmen. Steht `{abstract}` oder ist der Name kursiv: `abstract`. Gibt es einen Vererbungspfeil: Basisklasse angeben.',
      '**Attribute:** Sichtbarkeit, Typ, Name. Achtung: Auch **Assoziationen** werden zu Attributen (Rollenname, Typ der anderen Klasse, bei `*` eine Liste).',
      '**Konstruktor:** Parameter laut Diagramm oder Aufgabentext ("initialisiert alle Attribute"). Bei Unterklassen zuerst den Basiskonstruktor aufrufen. Listen im Konstruktor mit `new List<...>()` anlegen.',
      '**Getter/Setter:** "set-/get-Methoden wie üblich" heißt: für jedes private Attribut eine `getX()`, die den Wert zurückgibt, und eine `setX(wert)`, die ihn setzt.',
      '**Weitere Methoden:** Rückgabetyp und Parameter genau wie im Diagramm. Abstrakte Methoden ohne Rumpf, überschriebene mit `override`.',
      '**Kontrolle:** Hat jede Klammer ein Gegenstück? Sind alle Attribute private? Stimmen die Namen exakt mit dem Diagramm überein?',
    ]],
    ['h', 'Übersetzungstabelle'],
    ['table', ['UML', 'C#', 'Java', 'Python'], [
      ['`- alter: int`', '`private int alter;`', '`private int alter;`', '`self.__alter = alter` (Name-Mangling)'],
      ['`# wert: double`', '`protected double wert;`', '`protected double wert;`', '`self._wert` (Konvention)'],
      ['`+ getAlter(): int`', '`public int getAlter() { return alter; }`', '`public int getAlter() { return alter; }`', '`def getAlter(self): return self.__alter`'],
      ['`- liste: List<Messwert>`', '`private List<Messwert> liste;`', '`private List<Messwert> liste;` (ArrayList)', '`self.__liste = []`'],
      ['`+ Kind(...)` Konstruktor', '`public Kind(...) : base(...)`', '`public Kind(...) { super(...); }`', '`def __init__(self, ...): super().__init__(...)`'],
      ['`{abstract}` Methode', '`public abstract bool istGut();`', '`public abstract boolean istGut();`', '`@abstractmethod def istGut(self): pass`'],
      ['`instanz` unterstrichen', '`private static X instanz;`', '`private static X instanz;`', 'Klassenattribut `_instanz = None`'],
      ['`toString(): string`', '`public override string ToString()`', '`@Override public String toString()`', '`def __str__(self):`'],
    ]],
    ['h', 'Beispiel 1: Unterklasse mit Basiskonstruktor (Winter 2023/24, 11 Punkte)'],
    ['p', 'Gegeben: `Person` mit den privaten Text-Attributen `name`, `vorname`, `fon`, `mail`, Konstruktor für alle Attribute, Getter/Setter. Zu implementieren: `Lehrer` erbt von `Person`, private Text-Liste `lehrBefaehigung`, privates numerisches Attribut `dienstJahre`, Konstruktor für alle Attribute, Getter/Setter.'],
    ['codes', [
      ['csharp', `class Lehrer : Person
{
    private List<string> lehrBefaehigung;
    private int dienstJahre;

    public Lehrer(string name, string vorname, string fon, string mail,
                  List<string> lehrBefaehigung, int dienstJahre)
        : base(name, vorname, fon, mail)          // Basisklasse initialisiert ihre Attribute
    {
        this.lehrBefaehigung = lehrBefaehigung;
        this.dienstJahre = dienstJahre;
    }

    public List<string> getLehrBefaehigung() { return lehrBefaehigung; }
    public void setLehrBefaehigung(List<string> lehrBefaehigung) { this.lehrBefaehigung = lehrBefaehigung; }
    public int getDienstJahre() { return dienstJahre; }
    public void setDienstJahre(int dienstJahre) { this.dienstJahre = dienstJahre; }
}`],
      ['java', `public class Lehrer extends Person {
    private ArrayList<String> lehrBefaehigung;
    private int dienstJahre;

    public Lehrer(String name, String vorname, String fon, String mail,
                  ArrayList<String> lehrBefaehigung, int dienstJahre) {
        super(name, vorname, fon, mail);            // muss die erste Anweisung sein
        this.lehrBefaehigung = lehrBefaehigung;
        this.dienstJahre = dienstJahre;
    }

    public ArrayList<String> getLehrBefaehigung() { return lehrBefaehigung; }
    public void setLehrBefaehigung(ArrayList<String> l) { this.lehrBefaehigung = l; }
    public int getDienstJahre() { return dienstJahre; }
    public void setDienstJahre(int dienstJahre) { this.dienstJahre = dienstJahre; }
}`],
      ['python', `class Lehrer(Person):
    def __init__(self, name, vorname, fon, mail, lehrBefaehigung, dienstJahre):
        super().__init__(name, vorname, fon, mail)
        self.__lehrBefaehigung = lehrBefaehigung   # Liste von Strings
        self.__dienstJahre = dienstJahre

    def getLehrBefaehigung(self):
        return self.__lehrBefaehigung
    def setLehrBefaehigung(self, lehrBefaehigung):
        self.__lehrBefaehigung = lehrBefaehigung
    def getDienstJahre(self):
        return self.__dienstJahre
    def setDienstJahre(self, dienstJahre):
        self.__dienstJahre = dienstJahre`],
    ]],
    ['h', 'Beispiel 2: Abstrakte Klasse und Vererbungskette (Sommer 2025, 14 Punkte)'],
    ['p', 'Carsharing: `Vertrag` kennt genau einen `Kunde` (Rolle `derKunde`) und mehrere `Fahrzeug`e (Rolle `fahrzeuge[ ]`, Aggregation). `Fahrzeug` ist abstrakt mit der abstrakten Methode `getPreis(): double`. `EFahrzeug` erbt von `Fahrzeug` (bleibt abstrakt), `EScooter` erbt von `EFahrzeug`, Preis 10,50.'],
    ['codes', [
      ['csharp', `class Vertrag
{
    private Kunde derKunde;                                  // Multiplizität 1
    private List<Fahrzeug> fahrzeuge = new List<Fahrzeug>(); // Multiplizität *

    public Vertrag(Kunde derKunde) { this.derKunde = derKunde; }
    public void addFahrzeug(Fahrzeug f) { fahrzeuge.Add(f); }
    public double getGesamtpreis()
    {
        double summe = 0;
        foreach (Fahrzeug f in fahrzeuge)
            summe += f.getPreis();          // Polymorphie: jede Unterklasse rechnet selbst
        return summe;
    }
}

abstract class Fahrzeug
{
    public abstract double getPreis();      // kein Rumpf
}

abstract class EFahrzeug : Fahrzeug { }     // implementiert getPreis nicht -> bleibt abstrakt

class EScooter : EFahrzeug
{
    public override double getPreis() { return 10.50; }
}`],
      ['java', `public class Vertrag {
    private Kunde derKunde;
    private ArrayList<Fahrzeug> fahrzeuge = new ArrayList<>();

    public Vertrag(Kunde derKunde) { this.derKunde = derKunde; }
    public void addFahrzeug(Fahrzeug f) { fahrzeuge.add(f); }
}

public abstract class Fahrzeug {
    public abstract double getPreis();
}

public abstract class EFahrzeug extends Fahrzeug { }

public class EScooter extends EFahrzeug {
    @Override
    public double getPreis() { return 10.50; }
}`],
      ['python', `from abc import ABC, abstractmethod

class Vertrag:
    def __init__(self, derKunde):
        self.__derKunde = derKunde
        self.__fahrzeuge = []          # Liste von Fahrzeug-Objekten

    def addFahrzeug(self, f):
        self.__fahrzeuge.append(f)

class Fahrzeug(ABC):
    @abstractmethod
    def getPreis(self):
        pass

class EFahrzeug(Fahrzeug):
    pass                               # weiterhin abstrakt

class EScooter(EFahrzeug):
    def getPreis(self):
        return 10.50`],
    ]],
    ['def', 'Eine **abstrakte Klasse** dient als gemeinsame **Basisklasse** und kann **nicht instanziiert** werden (`new Fahrzeug()` ist verboten). Eine **abstrakte Methode** legt nur die **Signatur** fest; jede konkrete Unterklasse **muss** sie implementieren. Das ermöglicht **Polymorphie**: Über eine Referenz vom Typ `Fahrzeug` kann man `getPreis()` aufrufen, und zur Laufzeit wird die Implementierung der tatsächlichen Klasse (EScooter, EBike, PKW) ausgeführt. (Sommer 2025, 6 Punkte; Winter 2024/25, 3 Punkte)'],
  ],
});
