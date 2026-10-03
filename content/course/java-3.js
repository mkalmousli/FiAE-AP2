AP2.add('course-java', [
  ['h', 'Collections Framework'],
  ['diagram', {w: 760, h: 250, keep: 620, cap: 'Collections: Interfaces (oben) und gängige Implementierungen (unten)', nodes: [
    {id: 'c', k: 'round', x: 200, y: 30, t: 'Collection', w: 130, h: 34, s: 'solid'}, {id: 'm', k: 'round', x: 600, y: 30, t: 'Map (eigene Hierarchie)', w: 190, h: 34, s: 'solid'},
    {id: 'l', k: 'round', x: 80, y: 110, t: 'List', w: 90, h: 34, s: 'accent'}, {id: 's', k: 'round', x: 200, y: 110, t: 'Set', w: 90, h: 34, s: 'accent'}, {id: 'q', k: 'round', x: 320, y: 110, t: 'Queue / Deque', w: 120, h: 34, s: 'accent'},
    {id: 'l1', k: 'round', x: 80, y: 200, t: ['ArrayList', 'LinkedList'], w: 110, h: 50, s: 'soft', fs: 12}, {id: 's1', k: 'round', x: 220, y: 200, t: ['HashSet', 'TreeSet', 'LinkedHashSet'], w: 130, h: 62, s: 'soft', fs: 12}, {id: 'q1', k: 'round', x: 370, y: 200, t: ['ArrayDeque', 'PriorityQueue'], w: 130, h: 50, s: 'soft', fs: 12}, {id: 'm1', k: 'round', x: 600, y: 200, t: ['HashMap', 'TreeMap', 'LinkedHashMap'], w: 150, h: 62, s: 'soft', fs: 12},
  ], edges: [{a: 'c', b: 'l', ea: 'tri'}, {a: 'c', b: 's', ea: 'tri'}, {a: 'c', b: 'q', ea: 'tri'}, {a: 'l', b: 'l1', ea: 'none', k: 'dash'}, {a: 's', b: 's1', ea: 'none', k: 'dash'}, {a: 'q', b: 'q1', ea: 'none', k: 'dash'}, {a: 'm', b: 'm1', ea: 'none', k: 'dash'}]}],
  ['table', ['Implementierung', 'Eigenschaft', 'Zugriff / Suchen', 'Einfügen', 'Einsatz'], [
    ['`ArrayList`', 'Dynamisches Array', 'Index O(1), Suche O(n)', 'Ende O(1), Mitte O(n)', 'Standardliste'],
    ['`LinkedList`', 'Doppelt verkettet', 'O(n)', 'Anfang/Ende O(1)', 'Selten besser als ArrayList'],
    ['`HashMap`', 'Hashtabelle, ungeordnet, ein `null`-Schlüssel', 'O(1) im Mittel', 'O(1)', 'Standard-Map'],
    ['`LinkedHashMap`', 'Einfügereihenfolge', 'O(1)', 'O(1)', 'Reihenfolge behalten, LRU-Cache'],
    ['`TreeMap` / `TreeSet`', 'Rot-Schwarz-Baum, **sortiert**', 'O(log n)', 'O(log n)', 'Sortiert, Bereichsabfragen'],
    ['`HashSet`', 'Ohne Duplikate', 'O(1)', 'O(1)', 'Eindeutigkeit'],
    ['`ArrayDeque`', 'Beidseitige Schlange', 'Enden O(1)', 'O(1)', 'Stack und Queue'],
    ['`PriorityQueue`', 'Heap: kleinstes Element zuerst', 'Kopf O(1)', 'O(log n)', 'Prioritäten, Scheduling'],
  ]],
  ['code', 'java', `List<String> l = new ArrayList<>(List.of("b", "a"));      // gegen Interface programmieren
l.add("c"); l.remove("a"); Collections.sort(l); l.sort(Comparator.reverseOrder());
Map<String, Integer> m = new HashMap<>();
m.put("Anna", 21); m.getOrDefault("Ben", 0); m.putIfAbsent("Cem", 30);
m.merge("Anna", 1, Integer::sum);                           // Zähler: Wert addieren oder neu setzen
for (Map.Entry<String, Integer> e : m.entrySet()) System.out.println(e.getKey() + e.getValue());
Set<Integer> s = new TreeSet<>(List.of(3, 1, 2));           // sortiert: [1, 2, 3]
Deque<Integer> stapel = new ArrayDeque<>(); stapel.push(1); stapel.pop();      // LIFO
Queue<String> warte = new LinkedList<>(); warte.offer("A"); warte.poll();      // FIFO
List<Integer> fix = List.of(1, 2);  // unveränderlich: add wirft UnsupportedOperationException
// Beim Iterieren NICHT die Liste ändern (ConcurrentModificationException): Iterator.remove() oder removeIf
l.removeIf(x -> x.equals("b"));
Comparator<Person> cmp = Comparator.comparing(Person::name).thenComparingInt(Person::alter);`],
  ['h', 'Lambdas und Streams'],
  ['code', 'java', `List<Person> personen = List.of(new Person("Anna", 21), new Person("Ben", 17), new Person("Cem", 34));
List<String> namen = personen.stream()
    .filter(p -> p.alter() >= 18)             // Zwischenoperation (lazy)
    .sorted(Comparator.comparing(Person::name))
    .map(Person::name)                         // Methodenreferenz
    .toList();                                 // Terminaloperation (löst aus)
double schnitt = personen.stream().mapToInt(Person::alter).average().orElse(0);
Map<Boolean, List<Person>> teile = personen.stream().collect(Collectors.partitioningBy(p -> p.alter() >= 18));
Map<Integer, Long> proAlter = personen.stream().collect(Collectors.groupingBy(Person::alter, Collectors.counting()));
boolean irgendwer = personen.stream().anyMatch(p -> p.alter() > 30);
int summe = IntStream.rangeClosed(1, 100).sum();
String csv = personen.stream().map(Person::name).collect(Collectors.joining(", "));

Runnable r = () -> System.out.println("läuft");              // funktionale Interfaces:
Function<Integer, Integer> quadrat = x -> x * x;                //  Function<T,R>, Predicate<T>, Consumer<T>,
Supplier<String> lieferant = () -> "x";                         //  Supplier<T>, BiFunction, UnaryOperator`],
  ['table', ['Funktionales Interface', 'Methode', 'Bedeutung'], [['`Function<T,R>`', '`R apply(T)`', 'Umwandeln'], ['`Predicate<T>`', '`boolean test(T)`', 'Prüfen'], ['`Consumer<T>`', '`void accept(T)`', 'Verbrauchen'], ['`Supplier<T>`', '`T get()`', 'Liefern'], ['`Runnable` / `Callable<T>`', '`run()` / `call()`', 'Aufgabe ohne / mit Ergebnis']]],
  ['code', 'java', `Optional<Person> o = personen.stream().filter(p -> p.name().equals("Ben")).findFirst();
String name = o.map(Person::name).orElse("unbekannt");     // statt null-Prüfungen
o.ifPresent(p -> System.out.println(p));
// Optional als Rückgabetyp verwenden, nicht als Feld oder Parameter`],
]);
