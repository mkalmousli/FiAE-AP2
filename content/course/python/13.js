AP2.page('course-python-13', {
  b: 'course', g: 'Python', t: 'Python 13: Vererbung, Polymorphie, abstrakte Klassen',
  d: '**Vererbung** lässt eine **Unterklasse** alle Attribute und Methoden einer **Oberklasse** übernehmen und erweitern oder **überschreiben** ("ist ein"-Beziehung: Ein EScooter **ist ein** Fahrzeug). Mit `super()` ruft man die Methoden der Oberklasse auf, vor allem den Konstruktor. **Polymorphie** bedeutet, dass derselbe Methodenaufruf je nach tatsächlicher Klasse des Objekts unterschiedliche Implementierungen ausführt. **Abstrakte Klassen** (Modul `abc`) legen Methoden fest, die jede konkrete Unterklasse implementieren **muss**; von ihnen selbst kann man keine Objekte erzeugen.',
  m: '**`class Kind(Eltern):` erbt.** **Im Konstruktor zuerst `super().__init__(...)`.** **Überschreiben = gleiche Methode in der Unterklasse neu schreiben.** **Abstrakt: `class X(ABC)` + `@abstractmethod`.** **isinstance(obj, Klasse) prüft den Typ inklusive Oberklassen.** **Komposition ("hat ein") ist oft besser als Vererbung.**',
  cheat: [
    ['Vererbung', ['`class EScooter(Fahrzeug):`', '`super().__init__(kennz)`', 'Methode überschreiben', '`isinstance(s, Fahrzeug)` -> True']],
    ['Abstrakt', ['`from abc import ABC, abstractmethod`', '`class Fahrzeug(ABC):`', '`@abstractmethod def getPreis(self): ...`', 'Instanziieren -> TypeError']],
    ['Polymorphie', ['gleiche Methode, versch. Klassen', 'Aufruf über Basistyp', 'dynamische Bindung zur Laufzeit', 'Duck Typing in Python']],
    ['Beziehungen', ['Vererbung: ist ein', 'Komposition: hat ein (existenzabhängig)', 'Aggregation: hat ein (unabhängig)', 'Interface: kann etwas']],
  ],
  blocks: [
    ['h', 'Vererbung: Gemeinsames in die Oberklasse'],
    ['codes', [
      ['python', `class Person:
    def __init__(self, nachname, vorname):
        self._nachname = nachname          # _ = protected: Unterklassen dürfen zugreifen
        self._vorname = vorname

    def getName(self):
        return f"{self._vorname} {self._nachname}"

    def beschreibung(self):
        return self.getName()

class Lehrer(Person):                      # Lehrer ERBT von Person
    def __init__(self, nachname, vorname, faecher):
        super().__init__(nachname, vorname)    # Konstruktor der Oberklasse
        self.__faecher = faecher                # zusätzliches Attribut

    def beschreibung(self):                # ÜBERSCHREIBEN
        return super().beschreibung() + " unterrichtet " + ", ".join(self.__faecher)

l = Lehrer("Huber", "Eva", ["Informatik", "Mathe"])
print(l.getName())          # geerbt: Eva Huber
print(l.beschreibung())     # überschrieben: Eva Huber unterrichtet Informatik, Mathe`],
      ['java', `public class Lehrer extends Person {
    private List<String> faecher;
    public Lehrer(String nachname, String vorname, List<String> faecher) {
        super(nachname, vorname);
        this.faecher = faecher;
    }
    @Override
    public String beschreibung() {
        return super.beschreibung() + " unterrichtet " + String.join(", ", faecher);
    }
}`],
      ['csharp', `public class Lehrer : Person
{
    private List<string> faecher;
    public Lehrer(string nachname, string vorname, List<string> faecher)
        : base(nachname, vorname)
    {
        this.faecher = faecher;
    }
    public override string Beschreibung()      // in Person: public virtual string Beschreibung()
        => base.Beschreibung() + " unterrichtet " + string.Join(", ", faecher);
}`],
    ]],
    ['h', 'Abstrakte Klassen'],
    ['code', 'python', `from abc import ABC, abstractmethod

class Fahrzeug(ABC):                       # abstrakte Basisklasse
    def __init__(self, kennung):
        self._kennung = kennung

    @abstractmethod
    def getPreis(self):                    # MUSS in jeder konkreten Unterklasse implementiert werden
        pass

    def info(self):                        # normale Methode, wird vererbt
        return f"{self._kennung}: {self.getPreis():.2f} € pro Stunde"

class EFahrzeug(Fahrzeug):                 # implementiert getPreis nicht -> bleibt abstrakt
    pass

class EScooter(EFahrzeug):
    def getPreis(self):
        return 10.50

class EBike(EFahrzeug):
    def getPreis(self):
        return 8.00

# f = Fahrzeug("X")   -> TypeError: Can't instantiate abstract class
print(EScooter("S-1").info())             # S-1: 10.50 € pro Stunde`],
    ['h', 'Polymorphie in Aktion'],
    ['code', 'python', `fuhrpark = [EScooter("S-1"), EBike("B-7"), EScooter("S-2")]

gesamt = 0
for f in fuhrpark:              # f ist "irgendein Fahrzeug"
    gesamt += f.getPreis()      # welche getPreis läuft, entscheidet sich zur LAUFZEIT
    print(f.info())
print("Summe:", gesamt)         # 29.0`],
    ['def', '**Polymorphie** (Vielgestaltigkeit): Eine Referenz vom Typ der Oberklasse kann auf Objekte verschiedener Unterklassen zeigen; beim Aufruf einer überschriebenen Methode wird die Implementierung der **tatsächlichen** Klasse ausgeführt (**späte/dynamische Bindung**). Neue Fahrzeugtypen lassen sich hinzufügen, ohne die Schleife zu ändern.'],
    ['h3', 'Überschreiben vs. Überladen'],
    ['table', ['', 'Überschreiben (Override)', 'Überladen (Overload)'], [
      ['Wo?', 'In der **Unterklasse**', 'In **derselben** Klasse'],
      ['Signatur', '**Gleich** (Name und Parameter)', 'Gleicher Name, **andere Parameterliste**'],
      ['Entscheidung', 'Zur **Laufzeit** (Polymorphie)', 'Zur **Übersetzungszeit**'],
      ['Python', 'Ja', 'Nein (nur über Standardwerte/`*args`); in Java/C# ja'],
    ]],
    ['h', 'Typ prüfen und umwandeln'],
    ['code', 'python', `for f in fuhrpark:
    if isinstance(f, EScooter):        # berücksichtigt Vererbung
        print(f._kennung, "ist ein Scooter")

print(isinstance(fuhrpark[0], Fahrzeug))    # True (EScooter -> EFahrzeug -> Fahrzeug)
print(type(fuhrpark[0]) == Fahrzeug)        # False (exakter Typ)
print(issubclass(EBike, Fahrzeug))          # True`],
    ['note', 'In Java und C# muss man bei Zugriff auf Methoden, die nur die Unterklasse hat, **casten**: `((Kind) personen[i]).setNote(1.7)`. Python braucht das nicht (Duck Typing): Hat das Objekt die Methode, kann man sie aufrufen.'],
    ['h', 'Mehrfachvererbung und Interfaces'],
    ['p', 'Python erlaubt **Mehrfachvererbung** (`class C(A, B)`), Java und C# nicht (dort nur ein Basisklasse, aber beliebig viele **Interfaces**). Ein Interface beschreibt nur, **was** eine Klasse können muss. In Python bildet man es mit einer abstrakten Klasse nach, die nur abstrakte Methoden hat:'],
    ['code', 'python', `class Beobachter(ABC):                 # "Interface" für das Observer-Muster
    @abstractmethod
    def aktualisieren(self, ergebnis): ...

class Patient(Person, Beobachter):     # erbt von Person UND erfüllt Beobachter
    def __init__(self, nachname, vorname):
        super().__init__(nachname, vorname)
        self.__ergebnis = None
    def aktualisieren(self, ergebnis):
        self.__ergebnis = ergebnis
        print(self.getName(), "Ergebnis:", "positiv" if ergebnis == 1 else "negativ")`],
    ['h', 'Komposition statt Vererbung'],
    ['p', 'Nicht jede Beziehung ist ein "ist ein". Ein Auto **hat** einen Motor, es **ist** kein Motor. Dann nutzt man **Komposition**: Das Auto enthält ein Motor-Objekt als Attribut. Faustregel: Vererbung nur bei echter Spezialisierung, sonst Komposition (flexibler, weniger Kopplung).'],
    ['code', 'python', `class Bestellposition:
    def __init__(self, artikel, anzahl):
        self.artikel, self.anzahl = artikel, anzahl

class Angebot:
    def __init__(self, nummer):
        self.nummer = nummer
        self.__positionen = []             # Komposition: Positionen gehören zum Angebot

    def neue_position(self, artikel, anzahl):
        self.__positionen.append(Bestellposition(artikel, anzahl))   # Angebot ERZEUGT die Teile

    def summe(self):
        return sum(p.artikel.getEinkaufspreis() * p.anzahl for p in self.__positionen)`],
    ['h', 'Übungen'],
    ['qa', 'Implementieren Sie die abstrakte Klasse `Messwert` (geschütztes Attribut `wert`, abstrakte Methode `pruefeWert()`, Methode `getWert()`) und die Unterklassen `Strom` (gültig 0,05 bis 2,0) und `Spannung` (gültig 2,5 bis 4,2).', [['code', 'python', `from abc import ABC, abstractmethod

class Messwert(ABC):
    def __init__(self, wert):
        self._wert = wert
    @abstractmethod
    def pruefeWert(self):
        pass
    def getWert(self):
        return self._wert

class Strom(Messwert):
    def pruefeWert(self):
        return 0.05 <= self._wert <= 2.0

class Spannung(Messwert):
    def pruefeWert(self):
        return 2.5 <= self._wert <= 4.2

werte = [Strom(1.2), Strom(3.0), Spannung(3.7)]
print([w.pruefeWert() for w in werte])   # [True, False, True]`]], 8],
    ['qa', 'Erklären Sie die Bedeutung abstrakter Klassen und Methoden am Beispiel der Klasse Fahrzeug und gehen Sie auf Polymorphie ein.', ['`Fahrzeug` ist eine abstrakte Basisklasse, von der keine Objekte erzeugt werden können; sie legt mit der abstrakten Methode `getPreis()` fest, dass **jedes** konkrete Fahrzeug einen Preis liefern muss, ohne selbst einen Preis festzulegen.', 'Unterklassen wie `EScooter` oder `PKW` **müssen** `getPreis()` implementieren. Dadurch kann ein Vertrag alle Fahrzeuge einheitlich über die gemeinsame Schnittstelle behandeln (`f.getPreis()`), obwohl jede Klasse den Preis anders berechnet: Das ist **Polymorphie**.'], 6],
    ['quiz', [
      {q: 'Wie ruft man in Python den Konstruktor der Oberklasse auf?', o: ['super().__init__(...)', 'base(...)', 'super(...)', 'parent.__init__()'], a: 0, e: 'base: C#, super(...): Java.'},
      {q: 'Was passiert bei Fahrzeug() wenn Fahrzeug abstrakte Methoden hat?', o: ['TypeError', 'Ein leeres Objekt entsteht', 'Die Methoden werden ignoriert', 'Eine Warnung'], a: 0, e: 'Abstrakte Klassen sind nicht instanziierbar.'},
      {q: 'Was ist Polymorphie?', o: ['Derselbe Aufruf führt je nach tatsächlicher Klasse unterschiedlichen Code aus', 'Mehrere Konstruktoren', 'Private Attribute', 'Eine Klasse mit vielen Attributen'], a: 0, e: 'Dynamische Bindung.'},
      {q: 'Welche Beziehung passt zu "Ein Auto hat einen Motor"?', o: ['Komposition', 'Vererbung', 'Polymorphie', 'Überladen'], a: 0, e: '"hat ein" statt "ist ein".'},
    ]],
    ['see', ['course-python-12', 'course-python-14', 'eua-saeulen', 'eua-interface', 'eua-umlcode']],
  ],
});
