AP2.add('course-java', [
  ['h', 'Klassen und Objekte'],
  ['code', 'java', `public class Konto {
    private static int anzahl = 0;                       // gehört zur Klasse
    private final String inhaber;                         // nach Konstruktor unveränderlich
    private double stand;                                  // private: Kapselung

    public Konto(String inhaber, double stand) {          // Konstruktor (kein Rückgabetyp)
        this.inhaber = inhaber;                            // this: aktuelles Objekt
        this.stand = stand;
        anzahl++;
    }
    public Konto(String inhaber) { this(inhaber, 0); }    // Überladen (Overloading) und Verketten
    public void einzahlen(double betrag) {
        if (betrag <= 0) throw new IllegalArgumentException("Betrag muss positiv sein");
        stand += betrag;
    }
    public double getStand() { return stand; }            // Getter (Setter nur wenn nötig)
    public static int getAnzahl() { return anzahl; }

    @Override public String toString() { return inhaber + ": " + stand; }
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Konto k)) return false;        // Pattern Matching für instanceof
        return inhaber.equals(k.inhaber);
    }
    @Override public int hashCode() { return java.util.Objects.hash(inhaber); }   // gleiche Felder wie equals!
}`],
  ['table', ['Zugriff', 'Klasse', 'Paket', 'Unterklasse', 'Überall'], [['`private`', 'ja', 'nein', 'nein', 'nein'], ['(ohne) package-private', 'ja', 'ja', 'nein', 'nein'], ['`protected`', 'ja', 'ja', 'ja', 'nein'], ['`public`', 'ja', 'ja', 'ja', 'ja']]],
  ['warn', '**equals/hashCode-Vertrag:** Sind zwei Objekte gleich (`equals`), **müssen** sie denselben `hashCode` haben. Wer nur `equals` überschreibt, bricht `HashMap` und `HashSet` (Objekt wird nicht wiedergefunden).'],
  ['h', 'Vererbung, abstrakte Klassen, Interfaces'],
  ['code', 'java', `public abstract class Tier {                        // nicht instanziierbar
    protected String name;
    public Tier(String name) { this.name = name; }
    public abstract String laut();                      // ohne Rumpf: Unterklassen müssen implementieren
    public void vorstellen() { System.out.println(name + " sagt " + laut()); }
}
public class Hund extends Tier {                         // Vererbung (genau eine Basisklasse)
    public Hund(String name) { super(name); }            // Basiskonstruktor
    @Override public String laut() { return "Wuff"; }    // Überschreiben (Overriding)
}
Tier t = new Hund("Rex");                                 // Basistyp-Variable, Unterklassen-Objekt
t.vorstellen();                                           // Polymorphie: Hund.laut() wird gewählt (späte Bindung)

public interface Schwimmer {
    void schwimmen();
    default void tauchen() { System.out.println("tauche"); }    // Standardimplementierung
    static Schwimmer leer() { return () -> {}; }
}
public class Ente extends Tier implements Schwimmer, Fliegend { ... }   // viele Interfaces`],
  ['table', ['', 'abstract class', 'interface'], [['Zustand (Felder)', 'ja', 'nur Konstanten'], ['Konstruktor', 'ja', 'nein'], ['Mehrfachvererbung', 'nein (eine Basisklasse)', '**ja** (viele Interfaces)'], ['Methoden', 'abstrakt und konkret', 'abstrakt, `default`, `static`'], ['Zweck', 'Gemeinsame Basis (**ist ein**)', 'Fähigkeit/Vertrag (**kann**)']]],
  ['table', ['Konzept', 'Bedeutung'], [['**Overloading**', 'Gleicher Methodenname, **andere Parameter** (zur **Übersetzungszeit** gewählt)'], ['**Overriding**', 'Unterklasse ersetzt Methode mit **gleicher Signatur** (zur **Laufzeit** gewählt = Polymorphie)'], ['`super`', 'Zugriff auf die Basisklasse'], ['`final` Klasse/Methode', 'Nicht ableitbar / nicht überschreibbar'], ['`static`', 'Gehört zur Klasse; kein `this`; nicht überschreibbar'], ['Konstruktorreihenfolge', 'Basisklasse zuerst, dann Unterklasse']]],
  ['h', 'Enum, Record, Sealed, innere Klassen'],
  ['code', 'java', `public enum Status { OFFEN("Offen"), FERTIG("Fertig");            // feste Menge benannter Werte mit Verhalten
    private final String text; Status(String t) { text = t; } public String text() { return text; } }
Status s = Status.valueOf("OFFEN");  for (Status x : Status.values()) System.out.println(x.name() + x.ordinal());

public record Person(String name, int alter) {                      // unveränderlich: Konstruktor, Getter name(), equals, hashCode, toString
    public Person { if (alter < 0) throw new IllegalArgumentException(); }   // kompakter Konstruktor (Validierung)
}
public sealed interface Form permits Kreis, Rechteck {}              // nur diese Typen dürfen implementieren
record Kreis(double r) implements Form {}  record Rechteck(double a, double b) implements Form {}
double flaeche = switch (form) { case Kreis k -> Math.PI * k.r() * k.r(); case Rechteck r -> r.a() * r.b(); };   // vollständig geprüft`],
  ['h', 'Generics'],
  ['code', 'java', `public class Kiste<T extends Comparable<T>> {          // Typparameter mit oberer Schranke
    private final java.util.List<T> inhalt = new java.util.ArrayList<>();
    public void add(T x) { inhalt.add(x); }
    public T max() { return java.util.Collections.max(inhalt); }
}
static <T> void drucke(java.util.List<? extends Number> liste) { }   // Wildcard: lesen (PECS: Producer Extends, Consumer Super)
Kiste<String> k = new Kiste<>();                                       // Diamond-Operator`],
  ['note', '**Type Erasure:** Generische Typangaben existieren nur zur Übersetzungszeit; zur Laufzeit sind sie gelöscht. Deshalb gibt es kein `new T()` und keine `List<int>` (nur `List<Integer>`).'],
]);
