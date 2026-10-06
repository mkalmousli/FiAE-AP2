AP2.page('course-java-10', {
  b: 'course', g: 'Java', t: 'Java 10: Collections und Generics (ArrayList, HashMap, HashSet)',
  d: 'Das **Collections Framework** (`java.util`) bietet fertige, dynamisch wachsende Datenstrukturen. Die wichtigsten Schnittstellen sind **`List`** (geordnet, Duplikate erlaubt, Index; Implementierung `ArrayList`, `LinkedList`), **`Set`** (keine Duplikate; `HashSet`, `TreeSet` sortiert) und **`Map`** (Schlüssel-Wert-Paare; `HashMap`, `TreeMap`). **Generics** wie `List<String>` legen den Elementtyp fest, sodass der Compiler Typfehler erkennt und kein Cast nötig ist. Collections speichern nur **Objekte**; primitive Werte werden automatisch in Wrapper (`Integer`, `Double`) umgewandelt.',
  m: '**Deklarieren mit dem Interface, erzeugen mit der Klasse: `List<String> l = new ArrayList<>();`** **List: add/get/set/remove/size. Map: put/get/getOrDefault/containsKey. Set: add/contains.** **Liste in for-each nicht verändern -> removeIf oder Iterator.** **Sortieren: `Collections.sort(l)` oder `l.sort(Comparator.comparing(...))`.**',
  cheat: [
    ['List / ArrayList', ['`list.add(x)`, `add(i, x)`', '`list.get(i)`, `set(i, x)`', '`list.remove(i)` / `remove(obj)`', '`size()`, `contains(x)`, `indexOf(x)`']],
    ['Map / HashMap', ['`map.put(k, v)`', '`map.get(k)` (null, wenn fehlt)', '`getOrDefault(k, 0)`', '`for (var e : map.entrySet())`']],
    ['Set / HashSet', ['`set.add(x)` (false bei Duplikat)', '`set.contains(x)` O(1)', '`new HashSet<>(liste)` Duplikate weg', '`TreeSet` sortiert']],
    ['Hilfen', ['`List.of(1, 2, 3)` unveränderlich', '`Collections.sort(l)`, `max`, `min`', '`l.sort(Comparator.comparing(A::getPreis))`', '`l.removeIf(x -> x < 0)`']],
  ],
  blocks: [
    ['h', 'ArrayList: die dynamische Liste'],
    ['code', 'java', `import java.util.ArrayList;
import java.util.List;

List<String> namen = new ArrayList<>();      // leere Liste von Strings
namen.add("Anna");
namen.add("Ben");
namen.add(0, "Cem");                         // an Position 0 einfügen
System.out.println(namen);                   // [Cem, Anna, Ben]
System.out.println(namen.get(1));            // Anna
namen.set(1, "Annika");                      // ersetzen
namen.remove("Ben");                         // nach Wert entfernen
System.out.println(namen.size());            // 2
System.out.println(namen.contains("Cem"));   // true

List<Integer> zahlen = new ArrayList<>();
zahlen.add(5);                               // Autoboxing: int -> Integer
int erste = zahlen.get(0);                   // Unboxing
zahlen.remove(Integer.valueOf(5));           // Wert 5 entfernen (remove(5) wäre Index 5!)`],
    ['h', 'Objekte in Listen (typisch für UML-Assoziationen mit *)'],
    ['code', 'java', `public class Messplatz {
    private List<Akku> akkuliste = new ArrayList<>();     // Rolle akkuliste, Multiplizität *

    public void addAkku(Akku a) { akkuliste.add(a); }

    public Akku findeAkku(String id) {
        for (Akku a : akkuliste) {
            if (a.getId().equals(id)) return a;
        }
        return null;
    }

    public double durchschnittIstkapazitaet() {
        if (akkuliste.isEmpty()) return 0;
        double summe = 0;
        for (Akku a : akkuliste) summe += a.getIstkapazitaet();
        return summe / akkuliste.size();
    }
}`],
    ['h', 'Elemente entfernen, ohne Fehler'],
    ['code', 'java', `List<Messwert> werte = new ArrayList<>(...);

// FALSCH: vorwärts mit Index -> überspringt das Element nach jedem gelöschten
for (int i = 0; i < werte.size(); i++)
    if (!werte.get(i).pruefeWert()) werte.remove(i);

// RICHTIG 1: rückwärts
for (int i = werte.size() - 1; i >= 0; i--)
    if (!werte.get(i).pruefeWert()) werte.remove(i);

// RICHTIG 2: removeIf mit Lambda
int vorher = werte.size();
werte.removeIf(m -> !m.pruefeWert());
int fehler = vorher - werte.size();

// RICHTIG 3: Iterator
Iterator<Messwert> it = werte.iterator();
while (it.hasNext()) if (!it.next().pruefeWert()) it.remove();`],
    ['h', 'HashMap: Nachschlagen per Schlüssel'],
    ['code', 'java', `import java.util.HashMap;
import java.util.Map;

Map<String, Double> preise = new HashMap<>();
preise.put("Feuerdorn", 5.0);
preise.put("rote Rosen", 2.3);
preise.put("Feuerdorn", 5.5);                      // überschreibt den alten Wert
System.out.println(preise.get("Feuerdorn"));       // 5.5
System.out.println(preise.get("Tulpe"));           // null
System.out.println(preise.getOrDefault("Tulpe", 0.0));   // 0.0
System.out.println(preise.containsKey("Linde"));  // false

for (Map.Entry<String, Double> e : preise.entrySet()) {
    System.out.println(e.getKey() + " -> " + e.getValue());
}

// Zählen / Summieren je Schlüssel
Map<String, Integer> menge = new HashMap<>();
for (Bestellposition p : positionen) {
    menge.merge(p.getFilialName(), p.getAnzahl(), Integer::sum);   // addiert oder legt an
}`],
    ['h', 'HashSet: Menge ohne Duplikate'],
    ['code', 'java', `Set<String> artikel = new HashSet<>();
artikel.add("Feuerdorn");
artikel.add("Feuerdorn");              // wird ignoriert, add liefert false
System.out.println(artikel.size());    // 1

Set<Integer> eindeutig = new HashSet<>(List.of(3, 1, 3, 2));   // {1, 2, 3}
Set<String> sortiert = new TreeSet<>(List.of("Linde", "Feuerdorn"));  // alphabetisch`],
    ['h', 'List, Set oder Map? (Sommer 2024)'],
    ['table', ['', 'List (ArrayList)', 'Set (HashSet)', 'Map (HashMap)'], [
      ['Reihenfolge', 'Einfügereihenfolge, Index', 'keine (TreeSet: sortiert)', 'keine (TreeMap: nach Schlüssel)'],
      ['Duplikate', 'erlaubt', 'nicht erlaubt', 'Schlüssel eindeutig, Werte beliebig'],
      ['Zugriff', 'per Index O(1), Suche O(n)', 'contains O(1)', 'get per Schlüssel O(1)'],
      ['Beispiel', 'Bestellpositionen (gleiche dürfen mehrfach vorkommen)', 'Menge bestellter Artikelarten', 'Artikel -> Preis'],
    ]],
    ['h', 'Sortieren mit Comparable und Comparator'],
    ['code', 'java', `List<Artikel> liste = new ArrayList<>(...);
liste.sort(Comparator.comparing(Artikel::getEinkaufspreis));                // aufsteigend nach Preis
liste.sort(Comparator.comparing(Artikel::getEinkaufspreis).reversed());     // absteigend
liste.sort(Comparator.comparing(Artikel::getBezeichnung, String.CASE_INSENSITIVE_ORDER));

public class Note implements Comparable<Note> {        // "natürliche" Ordnung
    private int wert;
    @Override public int compareTo(Note o) { return Integer.compare(wert, o.wert); }
}
Collections.sort(noten);                                // nutzt compareTo`],
    ['h', 'Streams: Daten verarbeiten in einer Kette'],
    ['code', 'java', `double summe = positionen.stream()
    .filter(p -> p.getFilialName().equals("Strauch GmbH"))
    .mapToDouble(p -> preise.get(p.getBezeichnung()) * p.getAnzahl())
    .sum();

List<String> teuer = artikel.stream()
    .filter(a -> a.getEinkaufspreis() > 10)
    .map(Artikel::getBezeichnung)
    .sorted()
    .toList();`],
    ['h', 'Generics selbst verwenden'],
    ['code', 'java', `public class Paar<A, B> {                  // generische Klasse
    private final A erstes;
    private final B zweites;
    public Paar(A a, B b) { erstes = a; zweites = b; }
    public A getErstes() { return erstes; }
    public B getZweites() { return zweites; }
}
Paar<String, Integer> p = new Paar<>("Feuerdorn", 10);`],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie eine Methode `List<Bestellposition> getAlleBestposByFilialName(String filialName)`, die aus der Liste `alleBestellpositionen` alle Positionen einer Filiale liefert.', [['code', 'java', `public List<Bestellposition> getAlleBestposByFilialName(String filialName) {
    List<Bestellposition> ergebnis = new ArrayList<>();
    for (Bestellposition p : alleBestellpositionen) {
        if (p.getFilialName().equals(filialName)) {
            ergebnis.add(p);
        }
    }
    return ergebnis;
}`]], 5],
    ['qa', 'Begründen Sie, warum für die Bestellpositionen eine Liste und keine Menge verwendet wird.', ['Eine Liste erlaubt **Duplikate** und behält die **Reihenfolge** bei. Gleiche Bestellpositionen (zum Beispiel zweimal "Strauch GmbH, Feuerdorn") können mehrfach vorkommen und müssen auch mehrfach auf der Rechnung stehen. Eine Menge würde Duplikate verwerfen und hätte keine feste Reihenfolge.'], 4],
    ['quiz', [
      {q: 'Welche Collection verbietet Duplikate?', o: ['HashSet', 'ArrayList', 'LinkedList', 'Array'], a: 0, e: 'Set.'},
      {q: 'Was liefert map.get(k), wenn k nicht existiert?', o: ['null', '0', 'Exception', 'leerer String'], a: 0, e: 'getOrDefault vermeidet null.'},
      {q: 'Warum List<String> l = new ArrayList<>();?', o: ['Gegen das Interface programmieren, Implementierung austauschbar', 'Weil ArrayList kein Typ ist', 'Pflicht in Java', 'Schneller'], a: 0, e: 'Lose Kopplung.'},
      {q: 'Was macht list.remove(2) bei List<Integer>?', o: ['Entfernt das Element an Index 2', 'Entfernt den Wert 2', 'Fehler', 'Entfernt alle 2en'], a: 0, e: 'remove(Integer.valueOf(2)) für den Wert.'},
      {q: 'Was ist Autoboxing?', o: ['Automatische Umwandlung zwischen int und Integer', 'Automatisches Sortieren', 'Speicherfreigabe', 'Ein Entwurfsmuster'], a: 0, e: 'Collections speichern nur Objekte.'},
    ]],
    ['see', ['course-java-09', 'course-java-11', 'eua-listen', 'eua-hash']],
  ],
});
