AP2.page('course-java-09', {
  b: 'course', g: 'Java', t: 'Java 9: Vererbung, Polymorphie, abstrakte Klassen und Interfaces',
  d: 'Mit `extends` erbt eine Klasse von **genau einer** Oberklasse alle nicht-privaten Attribute und Methoden. Der Konstruktor der Unterklasse ruft mit `super(...)` als **erste Anweisung** den Oberklassen-Konstruktor auf. Methoden werden mit gleicher Signatur **überschrieben** (`@Override`). **Abstrakte Klassen** (`abstract class`) können nicht instanziiert werden und enthalten oft **abstrakte Methoden** ohne Rumpf. Ein **Interface** legt nur fest, **welche** Methoden eine Klasse anbieten muss; eine Klasse kann **mehrere** Interfaces implementieren (`implements`). **Polymorphie**: Eine Variable vom Typ der Oberklasse oder des Interfaces kann Objekte aller Unterklassen aufnehmen; aufgerufen wird die Methode des tatsächlichen Objekts.',
  m: '**extends = erbt (eine Klasse), implements = erfüllt Vertrag (beliebig viele Interfaces).** **super(...) zuerst im Konstruktor, super.methode() ruft die Oberklassenversion.** **abstract class: Gemeinsamkeiten + Zwang; interface: nur Fähigkeit/Vertrag.** **Cast nach unten nur mit instanceof-Prüfung.** **final class/method = nicht erweiterbar/überschreibbar.**',
  cheat: [
    ['Vererbung', ['`class Strom extends Messwert`', '`super(wert);` im Konstruktor', '`@Override` beim Überschreiben', 'protected-Attribute in Unterklasse nutzbar']],
    ['Abstrakt', ['`public abstract class Fahrzeug`', '`public abstract double getPreis();`', 'kein `new Fahrzeug()`', 'Unterklasse muss implementieren (oder abstrakt bleiben)']],
    ['Interface', ['`public interface ImportService`', '`void read();` (implizit public abstract)', '`class X implements A, B`', '`default`-Methoden mit Rumpf möglich']],
    ['Polymorphie', ['`Fahrzeug f = new EScooter();`', '`f.getPreis()` -> EScooter-Version', '`if (f instanceof EScooter s) s.klingeln();`', 'Liste<Oberklasse> mit gemischten Objekten']],
  ],
  blocks: [
    ['h', 'Vererbung mit extends und super'],
    ['code', 'java', `public abstract class Person {
    private String nachname;
    public Person(String nachname) { this.nachname = nachname; }
    public String getNachname() { return nachname; }
    public abstract boolean istGut();          // jede Unterklasse entscheidet selbst
}

public class Kind extends Person {
    private double noteVorschultest;
    public Kind(String nachname, double note) {
        super(nachname);                       // MUSS die erste Anweisung sein
        this.noteVorschultest = note;
    }
    public double getNote() { return noteVorschultest; }
    @Override
    public boolean istGut() { return noteVorschultest < 2.5; }
}

public class Erzieherin extends Person {
    private int anzahlBerufsjahre;
    public Erzieherin(String nachname, int jahre) {
        super(nachname);
        this.anzahlBerufsjahre = jahre;
    }
    @Override
    public boolean istGut() { return anzahlBerufsjahre >= 8; }
}`],
    ['h', 'Polymorphie'],
    ['code', 'java', `Person[] personen = { new Kind("Müller", 1.7), new Erzieherin("Schmidt", 12), new Kind("Yilmaz", 3.0) };
for (Person p : personen) {                       // statischer Typ: Person
    System.out.println(p.getNachname() + (p.istGut() ? " ist gut" : ""));
}                                                 // dynamischer Typ entscheidet, welches istGut() läuft
// Müller ist gut / Schmidt ist gut / Yilmaz`],
    ['def', '**Statischer Typ** = deklarierter Typ der Variablen (Person); er bestimmt, welche Methoden der Compiler zulässt. **Dynamischer Typ** = tatsächliche Klasse des Objekts zur Laufzeit (Kind); er bestimmt, welche **Implementierung** ausgeführt wird (dynamische Bindung).'],
    ['h', 'Casten und instanceof'],
    ['code', 'java', `Person p = personen[0];
// p.getNote();                     // Compilerfehler: Person kennt getNote nicht
if (p instanceof Kind) {
    Kind k = (Kind) p;              // Downcast nach Prüfung
    System.out.println(k.getNote());
}
if (p instanceof Kind k) {          // Pattern Matching (ab Java 16): prüfen + casten in einem
    System.out.println(k.getNote());
}
Erzieherin e = (Erzieherin) p;      // ClassCastException zur Laufzeit, wenn p ein Kind ist!`],
    ['h', 'Abstrakte Klassen'],
    ['code', 'java', `public abstract class Fahrzeug {
    protected String kennung;
    public Fahrzeug(String kennung) { this.kennung = kennung; }
    public abstract double getPreis();             // kein Rumpf, Semikolon
    public String info() {                         // konkrete Methode, wird vererbt
        return kennung + ": " + getPreis() + " EUR/h";
    }
}
public abstract class EFahrzeug extends Fahrzeug { // bleibt abstrakt
    public EFahrzeug(String k) { super(k); }
}
public class EScooter extends EFahrzeug {
    public EScooter(String k) { super(k); }
    @Override public double getPreis() { return 10.50; }
}`],
    ['h', 'Interfaces'],
    ['code', 'java', `public interface Beobachter {                  // Observer-Pattern
    void aktualisieren(int ergebnis);           // implizit public abstract
}

public interface Druckbar {
    void drucken();
    default void druckenMitKopf() {             // default-Methode mit Implementierung (ab Java 8)
        System.out.println("=== Ausdruck ===");
        drucken();
    }
}

public class Patient extends Person implements Beobachter, Druckbar {   // eine Klasse, mehrere Interfaces
    private int laborErgebnis = -1;
    public Patient(String nachname) { super(nachname); }
    @Override public boolean istGut() { return true; }
    @Override public void aktualisieren(int ergebnis) { laborErgebnis = ergebnis; drucken(); }
    @Override public void drucken() {
        System.out.println(getNachname() + ": " + (laborErgebnis == 1 ? "positiv" : "negativ"));
    }
}`],
    ['table', ['', 'Abstrakte Klasse', 'Interface'], [
      ['Schlüsselwort', '`abstract class`, erben mit `extends`', '`interface`, umsetzen mit `implements`'],
      ['Anzahl', 'Nur **eine** Oberklasse', '**Beliebig viele** Interfaces'],
      ['Attribute', 'Ja (auch private, Zustand)', 'Nur Konstanten (`public static final`)'],
      ['Konstruktor', 'Ja (für Unterklassen)', 'Nein'],
      ['Methoden', 'Abstrakte und konkrete', 'Abstrakte, `default`, `static`, `private`'],
      ['Beziehung', '"ist ein" (EScooter ist ein Fahrzeug)', '"kann" (Patient kann beobachten, Artikel ist druckbar)'],
      ['UML', 'Name kursiv oder `{abstract}`', '`<<interface>>`, Realisierung gestrichelt mit Dreieck'],
    ]],
    ['h', 'Komplettbeispiel: Factory mit Interface (Sommer 2022)'],
    ['code', 'java', `public interface ImportService {
    void read();
    String getDriveName();
}
class Manufacturer1Import implements ImportService {          // CSV-Format
    private final String pfad;
    Manufacturer1Import(String pfad) { this.pfad = pfad; }
    public void read() { /* CSV lesen */ }
    public String getDriveName() { return "Zuführung"; }
}
class Manufacturer2Import implements ImportService {          // XML-Format
    private final String pfad;
    Manufacturer2Import(String pfad) { this.pfad = pfad; }
    public void read() { /* XML lesen */ }
    public String getDriveName() { return "R87008W18"; }
}
class Import {                                                  // Factory
    static ImportService createServiceObj(String pfad) {
        if (pfad.endsWith(".ext1")) return new Manufacturer1Import(pfad);
        if (pfad.endsWith(".ext2")) return new Manufacturer2Import(pfad);
        throw new IllegalArgumentException("unbekanntes Format");
    }
}
ImportService s = Import.createServiceObj("trace.ext2");       // Aufrufer kennt nur das Interface
s.read();`],
    ['h', 'Übungen'],
    ['qa', 'Erklären Sie den Unterschied zwischen Überschreiben und Überladen in Java mit je einem Beispiel.', ['**Überschreiben:** Eine Unterklasse definiert eine geerbte Methode mit **gleicher Signatur** neu (`@Override public double getPreis()` in EScooter). Welche Version läuft, entscheidet sich zur **Laufzeit** (Polymorphie).', '**Überladen:** In einer Klasse gibt es mehrere Methoden mit **gleichem Namen**, aber **unterschiedlichen Parametern** (`max(int, int)` und `max(double, double)`). Der Compiler wählt zur **Übersetzungszeit** die passende.'], 4],
    ['qa', 'Deklarieren Sie die Klasse `EScooter`, die von `EFahrzeug` erbt, mit `getPreis()` = 10,50, und erzeugen Sie eine Liste mit zwei Scootern, deren Gesamtpreis berechnet wird.', [['code', 'java', `public class EScooter extends EFahrzeug {
    public EScooter(String kennung) { super(kennung); }
    @Override
    public double getPreis() { return 10.50; }
}

List<Fahrzeug> fahrzeuge = new ArrayList<>();
fahrzeuge.add(new EScooter("S1"));
fahrzeuge.add(new EScooter("S2"));
double summe = 0;
for (Fahrzeug f : fahrzeuge) summe += f.getPreis();   // 21.0`]], 5],
    ['quiz', [
      {q: 'Von wie vielen Klassen kann eine Java-Klasse erben?', o: ['Von genau einer', 'Von beliebig vielen', 'Von zwei', 'Von keiner'], a: 0, e: 'Mehrfachvererbung nur über Interfaces.'},
      {q: 'Wo muss super(...) im Konstruktor stehen?', o: ['Als erste Anweisung', 'Als letzte Anweisung', 'Beliebig', 'Außerhalb des Konstruktors'], a: 0, e: 'Sonst Compilerfehler.'},
      {q: 'Was passiert bei new Fahrzeug(), wenn Fahrzeug abstrakt ist?', o: ['Compilerfehler', 'Ein leeres Fahrzeug', 'Laufzeitfehler', 'Es wird ein EScooter erzeugt'], a: 0, e: 'Abstrakte Klassen sind nicht instanziierbar.'},
      {q: 'Welches Schlüsselwort verwendet eine Klasse für ein Interface?', o: ['implements', 'extends', 'inherits', 'uses'], a: 0, e: 'Interfaces untereinander: extends.'},
      {q: 'Was bestimmt, welche überschriebene Methode aufgerufen wird?', o: ['Der dynamische Typ des Objekts', 'Der statische Typ der Variablen', 'Die Reihenfolge im Code', 'Der Compiler zufällig'], a: 0, e: 'Dynamische Bindung.'},
    ]],
    ['see', ['course-java-08', 'course-java-10', 'eua-saeulen', 'eua-interface', 'eua-patterns']],
  ],
});
