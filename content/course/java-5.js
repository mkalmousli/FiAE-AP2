AP2.add('course-java', [
  ['h', 'Datenbankzugriff mit JDBC'],
  ['code', 'java', `String sql = "SELECT id, name FROM kunde WHERE ort = ?";
try (Connection con = DriverManager.getConnection(url, user, pw);
     PreparedStatement ps = con.prepareStatement(sql)) {        // vorbereitet: schützt vor SQL-Injection
    ps.setString(1, ort);
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) System.out.println(rs.getInt("id") + " " + rs.getString("name"));
    }
}
con.setAutoCommit(false); /* mehrere Statements */ con.commit();   // oder con.rollback() bei Fehler`],
  ['h', 'Build und Test'],
  ['table', ['Werkzeug', 'Zweck'], [['**Maven** (`pom.xml`)', 'Build und Abhängigkeiten; `mvn clean package`, `mvn test`'], ['**Gradle**', 'Build-Skript in Groovy/Kotlin DSL'], ['**JUnit 5**', 'Unit-Tests mit `@Test`, `assertEquals`, `assertThrows`'], ['**Mockito**', 'Abhängigkeiten in Tests ersetzen (Mocks)'], ['**Spring Boot**', 'Framework für Web-APIs, Dependency Injection, Datenzugriff (Spring Data JPA)'], ['**Hibernate / JPA**', 'ORM: Klassen (`@Entity`) auf Tabellen abbilden'], ['**Logging**', 'SLF4J mit Logback statt `System.out`']]],
  ['code', 'java', `class KontoTest {
    @Test void einzahlenErhoehtStand() { Konto k = new Konto("A"); k.einzahlen(50); assertEquals(50.0, k.getStand(), 0.001); }
    @Test void negativerBetragWirftFehler() { assertThrows(IllegalArgumentException.class, () -> new Konto("A").einzahlen(-1)); }
    @ParameterizedTest @ValueSource(doubles = {0, -5}) void ungueltig(double b) { assertThrows(IllegalArgumentException.class, () -> new Konto("A").einzahlen(b)); }
}
@RestController                                                    // Spring Boot: Web-Endpunkt
class KundenController {
    private final KundenRepo repo;
    KundenController(KundenRepo repo) { this.repo = repo; }         // Konstruktor-Injektion
    @GetMapping("/kunden/{id}") Kunde holen(@PathVariable long id) { return repo.findById(id).orElseThrow(); }
}`],
  ['h', 'Häufige Fallen'],
  ['table', ['Falle', 'Erklärung', 'Lösung'], [
    ['`==` bei Strings und Wrappern', 'Vergleicht Referenzen (`Integer` nur im Cache -128..127 gleich)', '`equals`'],
    ['`equals` ohne `hashCode`', 'HashMap/HashSet finden Objekte nicht', 'Beide überschreiben (oder `record`)'],
    ['`NullPointerException`', 'Aufruf auf `null`', 'Prüfen, `Optional`, `Objects.requireNonNull`'],
    ['Ganzzahldivision und Überlauf', '`1 / 2 == 0`, `int` läuft über', '`double`, `long`, `Math.addExact`'],
    ['`double` für Geld', 'Rundungsfehler', '`BigDecimal` (mit `String`-Konstruktor)'],
    ['Liste beim Iterieren ändern', '`ConcurrentModificationException`', '`removeIf`, `Iterator.remove()`'],
    ['String in Schleife verketten', 'Quadratischer Aufwand', '`StringBuilder`'],
    ['Veränderbare Referenzen herausgeben', 'Kapselung wird umgangen', 'Kopie oder `List.copyOf`, `record`'],
    ['Ressourcen nicht schließen', 'Dateien, Verbindungen bleiben offen', '`try-with-resources`'],
  ]],
  ['list', ['**Namenskonventionen:** Klassen `PascalCase`, Methoden/Variablen `camelCase`, Konstanten `GROSS_MIT_UNTERSTRICH`, Pakete klein (`de.firma.projekt`).', '**Programmiere gegen Interfaces** (`List` statt `ArrayList` als Variablentyp).', '**Bevorzuge Unveränderlichkeit** (`final`, `record`, `List.of`).', '**Komposition vor Vererbung.**']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie den Unterschied zwischen `==` und `equals()` an Strings.', '`==` vergleicht **Referenzen** (zeigen beide Variablen auf dasselbe Objekt?), `equals()` vergleicht den **Inhalt**. Zwei mit `new` erzeugte Strings gleichen Textes sind `==`-ungleich, aber `equals`-gleich. Strings daher immer mit `equals` vergleichen.', 4],
  ['qa', 'Was ist der Unterschied zwischen Überladen und Überschreiben?', '**Überladen (Overloading):** gleicher Name, **andere Parameterliste** in derselben Klasse, zur Übersetzungszeit gewählt. **Überschreiben (Overriding):** Unterklasse ersetzt eine geerbte Methode mit **gleicher Signatur**, zur Laufzeit gewählt (Polymorphie).', 5],
  ['qa', 'Nennen Sie den Unterschied zwischen checked und unchecked Exceptions mit Beispielen.', '**Checked** (`IOException`, `SQLException`): Der Compiler verlangt Behandlung (`try-catch`) oder Weitergabe (`throws`). **Unchecked** (`RuntimeException`-Unterklassen wie `NullPointerException`): Programmierfehler, keine Pflicht zur Behandlung.', 4],
  ['qa', 'Schreiben Sie eine Stream-Anweisung, die aus einer Liste von Zahlen die Summe der Quadrate aller geraden Zahlen berechnet.', 'int summe = zahlen.stream().filter(z -> z % 2 == 0).mapToInt(z -> z * z).sum();', 4],
  ['qa', 'Wann nutzt man `ArrayList`, wann `LinkedList`, wann `HashMap`?', '**ArrayList:** schneller Indexzugriff, Standardliste. **LinkedList:** häufiges Einfügen/Löschen an Anfang oder Ende (aber oft ist `ArrayDeque` besser). **HashMap:** Zuordnung Schlüssel zu Wert mit schneller Suche O(1), ohne Reihenfolge.', 4],
  ['qa', 'Was ist ein Deadlock und wie vermeidet man ihn?', 'Zwei oder mehr Threads blockieren sich gegenseitig, weil jeder eine Sperre hält, die der andere braucht. Vermeidung: Sperren immer in **fester Reihenfolge** anfordern, **Timeouts** (`tryLock`), kurze kritische Bereiche, möglichst wenige Sperren.', 4],
  ['quiz', [
    {q: 'Was führt die JVM aus?', o: ['Bytecode', 'Quelltext', 'Maschinencode direkt aus .java', 'HTML'], a: 0, e: 'javac erzeugt Bytecode, die JVM führt ihn aus.'},
    {q: 'Wie viele Klassen kann eine Klasse erweitern?', o: ['Eine', 'Zwei', 'Beliebig viele', 'Keine'], a: 0, e: 'Interfaces dagegen beliebig viele.'},
    {q: 'Was gilt für equals und hashCode?', o: ['Gleiche Objekte müssen gleichen hashCode haben', 'Sie sind unabhängig', 'hashCode ist optional', 'equals ist überflüssig'], a: 0, e: 'Sonst funktionieren HashMap und HashSet nicht.'},
    {q: 'Welche Exception muss behandelt oder deklariert werden?', o: ['IOException', 'NullPointerException', 'IllegalArgumentException', 'ArithmeticException'], a: 0, e: 'Checked Exceptions: alle außer RuntimeException und Error.'},
    {q: 'Was bewirkt try-with-resources?', o: ['Schließt AutoCloseable-Ressourcen automatisch', 'Fängt alle Fehler', 'Startet einen Thread', 'Erzeugt Objekte schneller'], a: 0, e: 'Auch bei Ausnahmen.'},
    {q: 'Welche Collection ist sortiert?', o: ['TreeSet', 'HashSet', 'ArrayList', 'HashMap'], a: 0, e: 'TreeSet/TreeMap halten die Elemente sortiert.'},
    {q: 'Was ist das Ergebnis von 5 / 2 in Java (int)?', o: ['2', '2.5', '3', 'Fehler'], a: 0, e: 'Ganzzahldivision schneidet ab.'},
    {q: 'Wo liegen Objekte im Speicher der JVM?', o: ['Heap', 'Stack', 'Metaspace', 'Register'], a: 0, e: 'Auf dem Stack liegen Referenzen und lokale primitive Werte.'},
    {q: 'Welche Operation ist bei Streams eine Terminaloperation?', o: ['collect / toList', 'filter', 'map', 'sorted'], a: 0, e: 'Erst die Terminaloperation startet die Verarbeitung.'},
  ]],
]);
