AP2.page('course-python-12', {
  b: 'course', g: 'Python', t: 'Python 12: Klassen und Objekte (Konstruktor, Kapselung, Properties)',
  d: 'Eine **Klasse** ist ein **Bauplan**, der festlegt, welche **Attribute** (Daten) und **Methoden** (Verhalten) ihre Objekte haben. Ein **Objekt** (Instanz) ist ein konkretes Exemplar, das mit `Klasse(...)` erzeugt wird. Der **Konstruktor** `__init__` initialisiert die Attribute; `self` verweist auf das aktuelle Objekt. **Kapselung** schützt Attribute vor direktem Zugriff von außen: In Python durch die Konvention `_name` (geschützt) bzw. `__name` (privat, Name-Mangling), Zugriff über **Getter/Setter** oder **Properties**.',
  m: '**Klasse = Bauplan, Objekt = Haus.** **`__init__(self, ...)` = Konstruktor, `self.x` = Attribut des Objekts.** **Jede Methode hat `self` als ersten Parameter.** **`__name` = privat (UML `-`), `_name` = geschützt (UML `#`), `name` = öffentlich (UML `+`).** **Klassenattribut gehört allen Objekten gemeinsam (UML unterstrichen = static).**',
  cheat: [
    ['Grundgerüst', ['`class Kunde:`', '`    def __init__(self, name):`', '`        self.__name = name`', '`k = Kunde("Max")`']],
    ['Sichtbarkeit', ['`self.name` public (+)', '`self._name` protected (#)', '`self.__name` private (-)', 'Zugriff über get/set oder @property']],
    ['Besondere Methoden', ['`__str__` Text für print (toString)', '`__repr__` Entwickleransicht', '`__eq__` Vergleich mit ==', '`__lt__` für Sortieren']],
    ['Klassenebene', ['Klassenattribut: direkt in der Klasse', '`@staticmethod` ohne self', '`@classmethod` mit cls', 'Instanzzähler, Konstanten']],
  ],
  blocks: [
    ['h', 'Die erste Klasse'],
    ['codes', [
      ['python', `class Artikel:
    def __init__(self, bezeichnung, einkaufspreis):   # Konstruktor
        self.__bezeichnung = bezeichnung              # private Attribute
        self.__einkaufspreis = einkaufspreis

    def getBezeichnung(self):                         # Getter
        return self.__bezeichnung

    def getEinkaufspreis(self):
        return self.__einkaufspreis

    def setEinkaufspreis(self, preis):                # Setter mit Prüfung
        if preis < 0:
            raise ValueError("Preis darf nicht negativ sein")
        self.__einkaufspreis = preis

    def __str__(self):                                # toString()
        return f"{self.__bezeichnung}: {self.__einkaufspreis:.2f} €"

a = Artikel("Feuerdorn", 5.0)     # Objekt erzeugen (Instanziierung)
b = Artikel("Linde", 42.5)        # zweites, unabhängiges Objekt
a.setEinkaufspreis(5.5)
print(a)                          # Feuerdorn: 5.50 €
print(b.getBezeichnung())         # Linde`],
      ['java', `public class Artikel {
    private String bezeichnung;
    private double einkaufspreis;

    public Artikel(String bezeichnung, double einkaufspreis) {
        this.bezeichnung = bezeichnung;
        this.einkaufspreis = einkaufspreis;
    }
    public String getBezeichnung() { return bezeichnung; }
    public double getEinkaufspreis() { return einkaufspreis; }
    public void setEinkaufspreis(double preis) {
        if (preis < 0) throw new IllegalArgumentException("negativ");
        this.einkaufspreis = preis;
    }
    @Override
    public String toString() { return bezeichnung + ": " + einkaufspreis; }
}`],
    ]],
    ['diagram', {w: 640, h: 200, keep: 480, cap: 'UML-Klasse Artikel und zwei Objekte. Jedes Objekt hat eigene Attributwerte.', nodes: [
      {id: 'k', k: 'cls', x: 160, y: 100, w: 260, t: {name: 'Artikel', attrs: ['- bezeichnung: str', '- einkaufspreis: float'], ops: ['+ Artikel(bezeichnung, einkaufspreis)', '+ getBezeichnung(): str', '+ setEinkaufspreis(preis): void']}},
      {id: 'o1', k: 'box', x: 470, y: 60, w: 220, h: 54, t: ['a: Artikel', 'Feuerdorn, 5.5'], s: 'soft'},
      {id: 'o2', k: 'box', x: 470, y: 150, w: 220, h: 54, t: ['b: Artikel', 'Linde, 42.5'], s: 'soft'},
    ], edges: [{a: 'o1', b: 'k', k: 'dash', t: 'Instanz von'}, {a: 'o2', b: 'k', k: 'dash'}]}],
    ['h', 'self verstehen'],
    ['p', '`self` ist das Objekt, für das eine Methode gerade aufgerufen wird. `a.getBezeichnung()` ist intern dasselbe wie `Artikel.getBezeichnung(a)`; Python übergibt `a` automatisch als `self`. In Java und C# heißt das Gegenstück `this` und wird nicht als Parameter geschrieben.'],
    ['h', 'Kapselung: Warum private Attribute?'],
    ['list', [
      '**Schutz der Daten:** Niemand kann von außen einen negativen Preis setzen; der Setter prüft.',
      '**Austauschbarkeit:** Die interne Darstellung kann sich ändern, ohne dass anderer Code angepasst werden muss.',
      '**Klare Schnittstelle:** Andere Klassen nutzen nur die öffentlichen Methoden.',
    ]],
    ['code', 'python', `a = Artikel("Feuerdorn", 5.0)
# print(a.__einkaufspreis)          # AttributeError: privat
print(a._Artikel__einkaufspreis)    # geht trotzdem (Name-Mangling), aber: nicht machen!`],
    ['note', 'Python kennt keine echte Zugriffsbeschränkung wie `private` in Java. `__name` wird intern in `_Klasse__name` umbenannt (Name-Mangling), damit man nicht versehentlich darauf zugreift. In Prüfungen setzt man UML-private Attribute in Python als `self.__name` um.'],
    ['h', 'Properties: Getter und Setter im Python-Stil'],
    ['code', 'python', `class Konto:
    def __init__(self, inhaber):
        self.inhaber = inhaber
        self.__saldo = 0.0

    @property
    def saldo(self):                 # Lesen wie ein Attribut: k.saldo
        return self.__saldo

    def einzahlen(self, betrag):
        if betrag <= 0:
            raise ValueError("Betrag muss positiv sein")
        self.__saldo += betrag

k = Konto("Max")
k.einzahlen(100)
print(k.saldo)        # 100.0
# k.saldo = 5         # AttributeError: kein Setter definiert -> nur lesbar`],
    ['h', 'Klassenattribute und statische Methoden'],
    ['code', 'python', `class Kunde:
    anzahl = 0                          # Klassenattribut: gemeinsam für alle Objekte (UML: unterstrichen)

    def __init__(self, name):
        self.name = name                # Instanzattribut
        Kunde.anzahl += 1
        self.nummer = Kunde.anzahl      # fortlaufende Kundennummer

    @staticmethod
    def ist_gueltige_plz(plz):          # braucht kein Objekt
        return len(plz) == 5 and plz.isdigit()

k1 = Kunde("Anna"); k2 = Kunde("Ben")
print(k2.nummer, Kunde.anzahl)          # 2 2
print(Kunde.ist_gueltige_plz("72764"))  # True`],
    ['h', 'Objekte vergleichen und sortieren'],
    ['code', 'python', `class Note:
    def __init__(self, fach, wert):
        self.fach, self.wert = fach, wert
    def __eq__(self, other):            # für ==
        return self.wert == other.wert
    def __lt__(self, other):            # für < und sorted()
        return self.wert < other.wert
    def __repr__(self):
        return f"Note({self.fach}, {self.wert})"

noten = [Note("Mathe", 3), Note("Deutsch", 1), Note("IT", 2)]
print(sorted(noten))                    # nach wert sortiert`],
    ['h', 'Objekte in Listen verwalten'],
    ['code', 'python', `class Lager:
    def __init__(self):
        self.__artikel = []                 # Liste von Artikel-Objekten (Aggregation)

    def hinzufuegen(self, artikel):
        self.__artikel.append(artikel)

    def suche(self, bezeichnung):
        for a in self.__artikel:
            if a.getBezeichnung() == bezeichnung:
                return a
        return None

    def gesamtwert(self):
        return sum(a.getEinkaufspreis() for a in self.__artikel)

lager = Lager()
lager.hinzufuegen(Artikel("Feuerdorn", 5.0))
lager.hinzufuegen(Artikel("Linde", 42.5))
print(lager.suche("Linde"), lager.gesamtwert())`],
    ['h', 'Übungen'],
    ['qa', 'Implementieren Sie die Klasse `Filiale` mit den privaten Attributen filialName, strasse_nr, plz, ort, tel, email, einem Konstruktor für alle Attribute, Gettern für Name und E-Mail und einer Methode `getAdresse()`, die Name, Straße und "PLZ Ort" zeilenweise liefert.', [['code', 'python', `class Filiale:
    def __init__(self, filialName, strasse_nr, plz, ort, tel, email):
        self.__filialName = filialName
        self.__strasse_nr = strasse_nr
        self.__plz = plz
        self.__ort = ort
        self.__tel = tel
        self.__email = email

    def getFilialName(self):
        return self.__filialName

    def getEmail(self):
        return self.__email

    def getAdresse(self):
        return f"{self.__filialName}\\n{self.__strasse_nr}\\n{self.__plz} {self.__ort}"`]], 6],
    ['qa', 'Erklären Sie den Unterschied zwischen Klasse und Objekt an einem Beispiel.', ['Eine **Klasse** ist der Bauplan, der festlegt, welche Attribute und Methoden es gibt, zum Beispiel `Fahrzeug` mit Kennzeichen und `getPreis()`.', 'Ein **Objekt** ist eine konkrete Ausprägung mit eigenen Attributwerten, zum Beispiel der E-Scooter mit Kennzeichen "RT-123". Von einer Klasse kann es beliebig viele Objekte geben.'], 3],
    ['quiz', [
      {q: 'Wie heißt der Konstruktor in Python?', o: ['__init__', 'constructor', 'new', 'Klassenname()'], a: 0, e: 'Wird beim Erzeugen automatisch aufgerufen.'},
      {q: 'Wofür steht self?', o: ['Das aktuelle Objekt', 'Die Klasse', 'Die Elternklasse', 'Ein globales Objekt'], a: 0, e: 'Entspricht this in Java/C#.'},
      {q: 'Wie setzt man ein UML-privates Attribut in Python um?', o: ['self.__name', 'private name', 'self.name', '#name'], a: 0, e: 'Doppelter Unterstrich.'},
      {q: 'Welche Methode bestimmt die Ausgabe bei print(objekt)?', o: ['__str__', '__init__', '__print__', 'toString'], a: 0, e: 'Entspricht toString() in Java.'},
      {q: 'Was ist ein Klassenattribut?', o: ['Ein Attribut, das alle Objekte der Klasse gemeinsam haben', 'Ein privates Attribut', 'Ein Parameter des Konstruktors', 'Eine Methode'], a: 0, e: 'Entspricht static.'},
    ]],
    ['see', ['course-python-11', 'course-python-13', 'eua-oop', 'eua-umlcode']],
  ],
});
