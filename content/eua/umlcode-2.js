AP2.add('eua-umlcode', [
  ['h', 'Beispiel 3: Messwert, Strom, Messreihe (Winter 2024/25, 27 + 5 + 10 Punkte)'],
  ['p', '`Messwert` ist abstrakt mit `# wert: double`, abstrakter Methode `pruefeWert(): bool` und `getWert()`. `Strom` erbt davon; gültig sind Werte von 0,05 A bis 2,0 A **einschließlich**. `Messreihe` hat eine Liste von Messwerten, Datum, Intervall und Fehleranzahl. Der Konstruktor setzt das aktuelle Datum und ruft die private Methode `bereinigeMesswertliste()` auf.'],
  ['code', 'csharp', `abstract class Messwert
{
    protected double wert;                     // # = protected: Unterklassen dürfen zugreifen
    public abstract bool pruefeWert();
    public double getWert() { return wert; }
}

class Strom : Messwert
{
    public Strom(double wert) { this.wert = wert; }
    public override bool pruefeWert()
    {
        return wert >= 0.05 && wert <= 2.0;    // Grenzen eingeschlossen -> >= und <=
    }
}

class Messreihe
{
    private List<Messwert> messwertliste;
    private DateTime datum;
    private int intervall;                    // in ms
    private int anzahlFehler;

    public Messreihe(List<Messwert> messwerte, int intervall)
    {
        this.messwertliste = messwerte;
        this.datum = DateTime.Now;            // aktuelles Datum
        this.intervall = intervall;
        this.anzahlFehler = bereinigeMesswertliste();   // private Methode: nur intern aufrufbar
    }

    private int bereinigeMesswertliste()
    {
        int fehler = 0;
        for (int i = messwertliste.Count - 1; i >= 0; i--)   // RÜCKWÄRTS laufen!
        {
            if (!messwertliste[i].pruefeWert())
            {
                messwertliste.RemoveAt(i);
                fehler++;
            }
        }
        return fehler;
    }

    public double berechneKapazitaet()        // Ergebnis in mAh
    {
        double summe = 0;
        foreach (Messwert m in messwertliste)
            summe += m.getWert() * intervall; // A * ms
        return summe / 3600.0;                // A*ms -> mAh: *1000 (mA) /1000 (s) /3600 (h)
    }

    public List<Messwert> getMesswerte() { return messwertliste; }
}`],
  ['warn', '**Klassischer Fehler beim Löschen aus einer Liste:** Die offizielle Lösung läuft **vorwärts** (`for i = 0; i < Count; i++`) und ruft `RemoveAt(i)`. Dann rutscht das nächste Element auf Position i und wird **übersprungen**: Zwei ungültige Werte hintereinander werden nicht beide entfernt. Richtig: **rückwärts** laufen, nach `RemoveAt` den Index nicht erhöhen, oder in eine neue Liste kopieren (`RemoveAll(m => !m.pruefeWert())`). Wer das in der Prüfung erwähnt, zeigt echtes Verständnis.'],
  ['p', '**Aufruf der privaten Methode (3 Punkte):** `bereinigeMesswertliste()` ist **private** und kann deshalb nur **innerhalb der Klasse Messreihe** aufgerufen werden. Sinnvoll ist der **Konstruktor**: So werden fehlerhafte Werte schon beim Erzeugen einer Messreihe entfernt, und `anzahlFehler` ist sofort gesetzt.'],
  ['h3', 'Struktogramm zu berechneKapazitaet (10 Punkte)'],
  ['diagram', AP2.dg.nsd([
    ['act', 'summe = 0'],
    ['for', 'für jeden messwert in messwertliste', [['act', 'teil = messwert.getWert() * intervall   // A * ms'], ['act', 'summe = summe + teil']]],
    ['act', 'kapazitaet = summe / 3600   // A*ms in mAh'],
    ['act', 'Rückgabe kapazitaet'],
  ], {w: 520, cap: 'Teilkapazität je Zeitabschnitt = Strom mal Intervall, alles aufsummieren, Einheit umrechnen.'})],
  ['h', 'Beispiel 4: Polymorphe Liste mit Testprogramm (Winter 2023/24, 36 Punkte)'],
  ['p', '`Person` (nur `nachname`), `Kind` (`noteVorschultest`, `istGut()` wenn Note besser als 2,5) und `Erzieherin` (`anzahlBerufsjahre`, `istGut()` ab 8 Jahren). Ein Testprogramm nimmt bis zu 10 Personen in ein Array auf, fragt jeweils nach dem Typ, kann vorzeitig abbrechen und gibt danach alle Namen aus, bei "guten" Personen mit dem Zusatz "ist gut".'],
  ['codes', [
    ['csharp', `abstract class Person
{
    private string nachname;
    public void setNachname(string n) { nachname = n; }
    public string getNachname() { return nachname; }
    public abstract bool istGut();             // jede Unterklasse entscheidet selbst
}
class Kind : Person
{
    private double noteVorschultest;
    public void setNoteVorschultest(double n) { noteVorschultest = n; }
    public double getNoteVorschultest() { return noteVorschultest; }
    public override bool istGut() { return noteVorschultest < 2.5; }
}
class Erzieherin : Person
{
    private int anzahlBerufsjahre;
    public void setAnzahlBerufsjahre(int j) { anzahlBerufsjahre = j; }
    public int getAnzahlBerufsjahre() { return anzahlBerufsjahre; }
    public override bool istGut() { return anzahlBerufsjahre >= 8; }
}

class Program
{
    static void Main()
    {
        Person[] personen = new Person[10];
        int anzahl = 0;
        string weiter = "j";
        while (anzahl < personen.Length && weiter == "j")
        {
            Console.Write("Kind oder Erzieherin? (k/e): ");
            string typ = Console.ReadLine();
            Console.Write("Nachname: ");
            string name = Console.ReadLine();
            if (typ == "k")
            {
                Kind k = new Kind();
                k.setNachname(name);
                Console.Write("Note Vorschultest: ");
                k.setNoteVorschultest(Convert.ToDouble(Console.ReadLine()));
                personen[anzahl] = k;               // Kind IST EINE Person
            }
            else
            {
                Erzieherin e = new Erzieherin();
                e.setNachname(name);
                Console.Write("Berufsjahre: ");
                e.setAnzahlBerufsjahre(Convert.ToInt32(Console.ReadLine()));
                personen[anzahl] = e;
            }
            anzahl++;
            Console.Write("Weitere Person? (j/n): ");
            weiter = Console.ReadLine();
        }
        for (int i = 0; i < anzahl; i++)
        {
            Console.Write(personen[i].getNachname());
            if (personen[i].istGut())               // dynamische Bindung: richtige Methode zur Laufzeit
                Console.Write(" ist gut");
            Console.WriteLine();
        }
    }
}`],
    ['python', `from abc import ABC, abstractmethod

class Person(ABC):
    def __init__(self):
        self.__nachname = ""
    def setNachname(self, n): self.__nachname = n
    def getNachname(self): return self.__nachname
    @abstractmethod
    def istGut(self): pass

class Kind(Person):
    def __init__(self):
        super().__init__()
        self.__note = 0.0
    def setNoteVorschultest(self, n): self.__note = n
    def getNoteVorschultest(self): return self.__note
    def istGut(self): return self.__note < 2.5

class Erzieherin(Person):
    def __init__(self):
        super().__init__()
        self.__jahre = 0
    def setAnzahlBerufsjahre(self, j): self.__jahre = j
    def getAnzahlBerufsjahre(self): return self.__jahre
    def istGut(self): return self.__jahre >= 8

personen = []
while len(personen) < 10:
    typ = input("Kind oder Erzieherin? (k/e): ")
    if typ == "k":
        p = Kind()
        p.setNachname(input("Nachname: "))
        p.setNoteVorschultest(float(input("Note: ")))
    else:
        p = Erzieherin()
        p.setNachname(input("Nachname: "))
        p.setAnzahlBerufsjahre(int(input("Berufsjahre: ")))
    personen.append(p)
    if input("Weitere Person? (j/n): ") == "n":
        break

for p in personen:
    print(p.getNachname() + (" ist gut" if p.istGut() else ""))`],
  ]],
  ['def', '**Polymorphie** (Vielgestaltigkeit): Eine Variable vom Typ der **Basisklasse** kann zur Laufzeit auf Objekte **verschiedener Unterklassen** zeigen. Ruft man über sie eine **überschriebene Methode** auf, wird die Implementierung der **tatsächlichen Klasse** ausgeführt (**dynamische Bindung**). **Polymorphe Methoden** haben in Basis- und Unterklassen denselben Namen und dieselbe Signatur, aber unterschiedliche Implementierungen (Überschreiben, override). Abzugrenzen ist das **Überladen**: gleicher Name, unterschiedliche Parameterlisten in derselben Klasse.'],
  ['h', 'Beispiel 5: Klasse in Python (Sommer 2024, 10 Punkte)'],
  ['code', 'python', `class Bestellposition:
    def __init__(self, filialName, bezeichnung, anzahl):
        self.__filialName = filialName
        self.__bezeichnung = bezeichnung
        self.__anzahl = anzahl

    def getFilialName(self):
        return self.__filialName

    def getBezeichnung(self):
        return self.__bezeichnung

    def getAnzahl(self):
        return self.__anzahl

    def __str__(self):                     # entspricht toString()
        return ("Die Filiale " + self.__filialName + " hat " + str(self.__anzahl)
                + " " + self.__bezeichnung + " bestellt")`],
  ['h', 'Beziehungen richtig deuten'],
  ['table', ['Beziehung', 'UML-Symbol', 'Bedeutung', 'Umsetzung im Code'], [
    ['**Assoziation**', 'Linie (evtl. mit Pfeil für Navigierbarkeit)', 'Objekte kennen sich ("kennt ein")', 'Attribut mit Referenz bzw. Liste'],
    ['**Aggregation**', 'Leere Raute beim Ganzen', 'Teile-Ganzes, Teile können **ohne** das Ganze existieren (Vertrag - Fahrzeug, ArtikelStammDaten - Artikel)', 'Teile werden **von außen übergeben** (`addFahrzeug(f)`)'],
    ['**Komposition**', 'Gefüllte Raute beim Ganzen', 'Teile sind **existenzabhängig** vom Ganzen (Angebot - Bestellposition: ohne Angebot keine Position)', 'Ganzes **erzeugt** die Teile selbst; wird es gelöscht, verschwinden die Teile'],
    ['**Vererbung**', 'Leeres Dreieck an der Oberklasse', '"ist ein" (EScooter ist ein EFahrzeug)', '`: Basis` / `extends`'],
    ['**Realisierung**', 'Gestrichelt mit leerem Dreieck', 'Klasse implementiert ein Interface', '`: IImportService` / `implements`'],
    ['**Abhängigkeit**', 'Gestrichelter Pfeil `<<use>>`', 'Klasse benutzt eine andere kurzzeitig', 'Parameter oder lokale Variable'],
  ]],
  ['h3', 'Liste oder Menge? (Sommer 2024, 6 Punkte)'],
  ['table', ['Liste (List, ArrayList)', 'Menge (Set, HashSet)'], [
    ['Beliebig viele Elemente, **geordnet** nach Einfügereihenfolge, Zugriff über Index', 'Beliebig viele **unterschiedliche** Elemente, **keine** feste Reihenfolge'],
    ['**Duplikate erlaubt**', '**Jedes Element nur einmal**'],
    ['Suche linear O(n)', 'Enthalten-Prüfung sehr schnell (Hash, O(1))'],
  ]],
  ['p', 'Begründung im Beispiel: Gleiche Bestellpositionen (zum Beispiel zweimal "Strauch GmbH, Feuerdorn") können mehrfach vorkommen und die Reihenfolge ist für die Rechnung wichtig. Eine Menge würde Duplikate verwerfen. Deshalb ist die **Liste** die bessere Wahl.'],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Die Klasse `Messwert` ist als abstract gekennzeichnet. Erläutern Sie, welche Einschränkung damit verbunden ist.', ['Von einer abstrakten Klasse können **keine Objekte erzeugt** werden (`new Messwert()` ist nicht erlaubt). Sie dient nur als Basisklasse; erst konkrete Unterklassen wie `Strom` oder `Spannung`, die alle abstrakten Methoden (hier `pruefeWert()`) implementieren, können instanziiert werden.'], 3],
  ['qa', 'Implementieren Sie die Methode `pruefeWert()` der Klasse `Spannung`. Gültig sind 2,5 V bis 4,2 V (Grenzen eingeschlossen).', [['code', 'csharp', `public override bool pruefeWert()
{
    return wert >= 2.5 && wert <= 4.2;
}`]], 4],
  ['qa', 'Welche Beziehung würden Sie zwischen `Angebot` und `Bestellposition` implementieren? Begründen Sie.', ['Eine **Komposition**: Eine Bestellposition existiert nur als Teil eines Angebots. Wird das Angebot gelöscht, sind auch seine Positionen bedeutungslos und werden mitgelöscht. Multiplizität: ein Angebot hat 1..* Positionen, jede Position gehört zu genau einem Angebot.'], 3],
  ['qa', 'Erklären Sie Polymorphie am Beispiel der Komponente einer Bestellposition (PvModul, Wechselrichter, Batteriespeicher erben von der abstrakten Klasse Komponente).', ['Das Attribut `komponente` der Bestellposition hat den Typ der Basisklasse `Komponente`. Zur Laufzeit kann darin ein `PvModul`, ein `Wechselrichter` oder ein `Batteriespeicher` stehen. Ruft man `komponente.ToString()` auf, wird die überschriebene Methode der jeweiligen Unterklasse ausgeführt. Der deklarierte Typ (Komponente) entspricht also nicht dem Laufzeittyp; die Bestellposition muss den konkreten Typ nicht kennen.'], 3],
  ['quiz', [
    {q: 'Wie wird im UML-Diagramm die Sichtbarkeit protected dargestellt?', o: ['#', '-', '+', '~'], a: 0, e: '~ = package.'},
    {q: 'Was wird aus einer Assoziation mit Multiplizität * und Rollenname fahrzeuge?', o: ['Ein Listen-Attribut fahrzeuge', 'Eine Methode fahrzeuge()', 'Eine Unterklasse', 'Ein Interface'], a: 0, e: 'Der Rollenname wird zum Attributnamen.'},
    {q: 'Welches Schlüsselwort braucht C#, um eine abstrakte Methode in der Unterklasse zu implementieren?', o: ['override', 'virtual', 'new', 'implements'], a: 0, e: 'Java nutzt optional die Annotation @Override.'},
    {q: 'Was passiert, wenn man in einer Vorwärtsschleife mit RemoveAt(i) löscht?', o: ['Das nachfolgende Element wird übersprungen', 'Es tritt immer ein Fehler auf', 'Die Liste wird sortiert', 'Nichts Besonderes'], a: 0, e: 'Lösung: rückwärts iterieren.'},
    {q: 'Welche Beziehung beschreibt Existenzabhängigkeit?', o: ['Komposition', 'Aggregation', 'Assoziation', 'Abhängigkeit'], a: 0, e: 'Gefüllte Raute.'},
  ]],
  ['see', ['ps-klassen', 'eua-oop', 'eua-saeulen', 'eua-interface', 'eua-patterns']],
]);
