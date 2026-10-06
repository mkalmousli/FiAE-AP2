AP2.page('course-java-08', {
  b: 'course', g: 'Java', t: 'Java 8: Klassen und Objekte (Konstruktor, Kapselung, this, static)',
  d: 'Eine **Klasse** beschreibt Attribute und Methoden; mit `new` erzeugt man **Objekte** davon. Der **Konstruktor** hat denselben Namen wie die Klasse, keinen Rückgabetyp und initialisiert die Attribute; ohne eigenen Konstruktor gibt es einen leeren **Standardkonstruktor**. **Kapselung**: Attribute sind `private`, der Zugriff läuft über öffentliche **Getter/Setter**, die Werte prüfen können. `this` verweist auf das aktuelle Objekt (zum Beispiel `this.name = name`). `static`-Attribute teilen sich alle Objekte. Jede Klasse erbt von `Object` und kann `toString()`, `equals()` und `hashCode()` überschreiben.',
  m: '**Sichtbarkeit: private (-) nur Klasse, default (~) Paket, protected (#) Paket + Unterklassen, public (+) alle.** **Konstruktor: kein Rückgabetyp, Name = Klasse, Überladen möglich, `this(...)` ruft einen anderen Konstruktor.** **Getter `getX()`, Setter `setX(wert)`, boolean-Getter `isX()`.** **Objekte vergleichen: equals überschreiben.**',
  cheat: [
    ['Klasse', ['`public class Kunde {`', '`  private String name;`', '`  public Kunde(String name) { this.name = name; }`', '`}`']],
    ['Objekt', ['`Kunde k = new Kunde("Max");`', '`k.getName()`', '`Kunde k2 = k;` gleiche Referenz', '`k = null;` -> Garbage Collector']],
    ['Sichtbarkeit', ['`private` -', '(ohne) package ~', '`protected` #', '`public` +']],
    ['Object-Methoden', ['`toString()` Textdarstellung', '`equals(Object o)` Gleichheit', '`hashCode()` passend zu equals', '`@Override` Annotation']],
  ],
  blocks: [
    ['h', 'Eine vollständige Klasse'],
    ['code', 'java', `public class Bestellposition {
    // Attribute (private = gekapselt)
    private String filialName;
    private String bezeichnung;
    private int anzahl;

    // Konstruktor
    public Bestellposition(String filialName, String bezeichnung, int anzahl) {
        this.filialName = filialName;      // this.filialName = Attribut, filialName = Parameter
        this.bezeichnung = bezeichnung;
        setAnzahl(anzahl);                 // Prüfung im Setter wiederverwenden
    }

    // Getter
    public String getFilialName() { return filialName; }
    public String getBezeichnung() { return bezeichnung; }
    public int getAnzahl() { return anzahl; }

    // Setter mit Plausibilitätsprüfung
    public void setAnzahl(int anzahl) {
        if (anzahl <= 0) throw new IllegalArgumentException("Anzahl muss positiv sein");
        this.anzahl = anzahl;
    }

    @Override
    public String toString() {
        return "Die Filiale " + filialName + " hat " + anzahl + " " + bezeichnung + " bestellt";
    }
}`],
    ['code', 'java', `Bestellposition p = new Bestellposition("Strauch GmbH", "Feuerdorn", 10);
System.out.println(p);                 // ruft toString() auf
System.out.println(p.getAnzahl());     // 10
// p.anzahl = -5;                      // Compilerfehler: anzahl ist private
p.setAnzahl(15);`],
    ['diagram', {w: 600, h: 230, keep: 460, cap: 'Das passende UML-Klassendiagramm: - private, + public, Konstruktor mit Klassennamen.', nodes: [
      {id: 'c', k: 'cls', x: 300, y: 115, w: 470, t: {name: 'Bestellposition', attrs: ['- filialName: String', '- bezeichnung: String', '- anzahl: int'], ops: ['+ Bestellposition(filialName: String, bezeichnung: String, anzahl: int)', '+ getFilialName(): String', '+ getAnzahl(): int', '+ setAnzahl(anzahl: int): void', '+ toString(): String']}},
    ], edges: []}],
    ['h', 'Mehrere Konstruktoren und this(...)'],
    ['code', 'java', `public class Akku {
    private String id;
    private int nennkapazitaet;      // mAh
    private double istkapazitaet;

    public Akku(String id, int nennkapazitaet) {
        this(id, nennkapazitaet, nennkapazitaet);   // ruft den anderen Konstruktor auf
    }
    public Akku(String id, int nennkapazitaet, double istkapazitaet) {
        this.id = id;
        this.nennkapazitaet = nennkapazitaet;
        this.istkapazitaet = istkapazitaet;
    }
    public double abweichungProzent() {
        return (nennkapazitaet - istkapazitaet) / nennkapazitaet * 100;
    }
}`],
    ['note', 'Sobald man **irgendeinen** Konstruktor selbst schreibt, erzeugt Java **keinen** Standardkonstruktor mehr. `new Akku()` funktioniert dann nur, wenn man `public Akku() { }` zusätzlich definiert.'],
    ['h', 'Sichtbarkeiten'],
    ['table', ['Modifier', 'UML', 'Klasse selbst', 'Paket', 'Unterklasse', 'Überall'], [
      ['`private`', '-', 'Ja', 'Nein', 'Nein', 'Nein'],
      ['(ohne) package-private', '~', 'Ja', 'Ja', 'Nein (außer im Paket)', 'Nein'],
      ['`protected`', '#', 'Ja', 'Ja', 'Ja', 'Nein'],
      ['`public`', '+', 'Ja', 'Ja', 'Ja', 'Ja'],
    ]],
    ['h', 'static: Klassenattribute und Klassenmethoden'],
    ['code', 'java', `public class Kunde {
    private static int naechsteNummer = 1;    // gemeinsam für alle Kunden (UML unterstrichen)
    private final int kundennummer;           // final: nach dem Konstruktor nicht mehr änderbar
    private String name;

    public Kunde(String name) {
        this.name = name;
        this.kundennummer = naechsteNummer++;
    }
    public static int getAnzahlKunden() { return naechsteNummer - 1; }
}

new Kunde("Anna"); new Kunde("Ben");
System.out.println(Kunde.getAnzahlKunden());   // 2`],
    ['h', 'Objekte vergleichen: equals und hashCode'],
    ['code', 'java', `public class Artikel {
    private String bezeichnung;
    private double preis;
    public Artikel(String b, double p) { bezeichnung = b; preis = p; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;                         // dasselbe Objekt
        if (!(o instanceof Artikel)) return false;          // anderer Typ oder null
        Artikel a = (Artikel) o;
        return bezeichnung.equals(a.bezeichnung);           // fachliche Gleichheit
    }
    @Override
    public int hashCode() { return Objects.hash(bezeichnung); }   // passend zu equals!
}`],
    ['p', 'Ohne `equals` vergleicht Java nur die Referenzen. `HashMap` und `HashSet` brauchen `equals` **und** `hashCode`: Gleiche Objekte müssen denselben Hashcode haben.'],
    ['h', 'Records: Datenklassen in einer Zeile (ab Java 16)'],
    ['code', 'java', `public record Messwert(String einheit, double wert) { }
// erzeugt automatisch: privates finales Feld, Konstruktor, Getter einheit()/wert(),
// equals, hashCode und toString
Messwert m = new Messwert("A", 1.5);
System.out.println(m.wert());     // 1.5
System.out.println(m);            // Messwert[einheit=A, wert=1.5]`],
    ['h', 'Übungen'],
    ['qa', 'Implementieren Sie die Klasse `Artikel` laut UML: `- bezeichnung: String`, `- einkaufspreis: double`, Konstruktor mit beiden Werten, Getter und Setter, `toString()` mit Bezeichnung und Preis.', [['code', 'java', `public class Artikel {
    private String bezeichnung;
    private double einkaufspreis;

    public Artikel(String bezeichnung, double einkaufspreis) {
        this.bezeichnung = bezeichnung;
        this.einkaufspreis = einkaufspreis;
    }
    public String getBezeichnung() { return bezeichnung; }
    public void setBezeichnung(String bezeichnung) { this.bezeichnung = bezeichnung; }
    public double getEinkaufspreis() { return einkaufspreis; }
    public void setEinkaufspreis(double einkaufspreis) { this.einkaufspreis = einkaufspreis; }

    @Override
    public String toString() { return bezeichnung + " (" + einkaufspreis + " EUR)"; }
}`]], 8],
    ['qa', 'Warum sollten Attribute private sein? Nennen Sie zwei Gründe.', ['- **Datenschutz/Konsistenz:** Werte können nur über Setter geändert werden, die Plausibilitätsprüfungen enthalten (keine negative Anzahl).', '- **Austauschbarkeit:** Die interne Darstellung kann geändert werden, ohne dass Code außerhalb der Klasse angepasst werden muss (Geheimnisprinzip).'], 2],
    ['quiz', [
      {q: 'Welchen Rückgabetyp hat ein Konstruktor?', o: ['Keinen', 'void', 'Den Klassentyp', 'Object'], a: 0, e: 'Nicht einmal void.'},
      {q: 'Wofür steht this.name = name; im Konstruktor?', o: ['Das Attribut name bekommt den Wert des Parameters name', 'Der Parameter wird gelöscht', 'Ein neues Objekt wird erzeugt', 'Ein Vergleich'], a: 0, e: 'this unterscheidet Attribut und Parameter.'},
      {q: 'Welche Sichtbarkeit entspricht # im UML?', o: ['protected', 'private', 'public', 'package'], a: 0, e: '~ = package.'},
      {q: 'Was passiert bei new Kunde(), wenn nur Kunde(String name) definiert ist?', o: ['Compilerfehler', 'Ein Objekt mit name = null', 'Laufzeitfehler', 'Der Standardkonstruktor wird benutzt'], a: 0, e: 'Kein automatischer Standardkonstruktor mehr.'},
      {q: 'Welche Methode muss man zusammen mit equals überschreiben?', o: ['hashCode', 'toString', 'compareTo', 'clone'], a: 0, e: 'Für HashMap/HashSet.'},
    ]],
    ['see', ['course-java-07', 'course-java-09', 'eua-oop', 'eua-konstruktor', 'eua-umlcode']],
  ],
});
