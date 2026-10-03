AP2.add('course-java', [
  ['h', 'Ausnahmen (Exceptions)'],
  ['diagram', {w: 640, h: 220, keep: 480, cap: 'Hierarchie der Fehlerklassen: Checked Exceptions muss man behandeln, Unchecked nicht', nodes: [
    {id: 't', k: 'round', x: 320, y: 24, t: 'Throwable', w: 120, h: 32, s: 'solid'}, {id: 'e', k: 'round', x: 190, y: 90, t: 'Exception', w: 120, h: 32, s: 'accent'}, {id: 'er', k: 'round', x: 460, y: 90, t: 'Error (OutOfMemoryError)', w: 190, h: 32, s: 'bad'},
    {id: 'io', k: 'round', x: 90, y: 170, t: ['IOException', 'SQLException', '(checked)'], w: 130, h: 62, s: 'soft', fs: 12}, {id: 'rt', k: 'round', x: 290, y: 170, t: ['RuntimeException', '(unchecked)'], w: 150, h: 50, s: 'soft', fs: 12}, {id: 'npe', k: 'round', x: 520, y: 170, t: ['NullPointerException', 'IllegalArgumentException', 'IndexOutOfBounds'], w: 180, h: 62, s: 'soft', fs: 11},
  ], edges: [{a: 'e', b: 't', ea: 'tri'}, {a: 'er', b: 't', ea: 'tri'}, {a: 'io', b: 'e', ea: 'tri'}, {a: 'rt', b: 'e', ea: 'tri'}, {a: 'npe', b: 'rt', ea: 'tri'}]}],
  ['code', 'java', `public static String lies(String pfad) throws IOException {      // checked: deklarieren oder behandeln
    try (BufferedReader r = Files.newBufferedReader(Path.of(pfad))) {   // try-with-resources: schließt automatisch
        return r.readLine();
    } catch (NoSuchFileException e) {                                  // spezifisch vor allgemein
        throw new IllegalStateException("Datei fehlt: " + pfad, e);     // Ursache (cause) mitgeben
    } finally { System.out.println("immer"); }
}
public class KontoException extends Exception { public KontoException(String m) { super(m); } }   // eigene (checked)
// RuntimeException ableiten für unchecked`],
  ['table', ['', 'Checked', 'Unchecked (RuntimeException)', 'Error'], [['Zwang', 'Compiler verlangt `try-catch` oder `throws`', 'Nein', 'Nein'], ['Ursache', 'Erwartbare äußere Probleme (Datei, Netz, DB)', 'Programmierfehler (null, Index, ungültige Argumente)', 'Schwere JVM-Probleme (Speicher)'], ['Beispiel', '`IOException`, `SQLException`', '`NullPointerException`, `ArithmeticException`', '`OutOfMemoryError`, `StackOverflowError`']]],
  ['h', 'Dateien und I/O (NIO.2)'],
  ['code', 'java', `Path p = Path.of("daten", "a.txt");
Files.writeString(p, "Hallo", StandardCharsets.UTF_8);       // Datei schreiben
String text = Files.readString(p);
try (Stream<String> zeilen = Files.lines(p)) { zeilen.filter(z -> !z.isBlank()).forEach(System.out::println); }
List<String> alle = Files.readAllLines(p);
Files.copy(p, Path.of("b.txt"), StandardCopyOption.REPLACE_EXISTING);  Files.exists(p);  Files.delete(p);`],
  ['h', 'Nebenläufigkeit (Concurrency)'],
  ['code', 'java', `ExecutorService pool = Executors.newFixedThreadPool(4);          // Thread-Pool statt eigene Threads
Future<Integer> f = pool.submit(() -> berechne());              // Aufgabe mit Ergebnis
int ergebnis = f.get();                                          // wartet (blockiert)
pool.shutdown();

CompletableFuture<String> cf = CompletableFuture
    .supplyAsync(() -> ladeKunde(7))                             // asynchron
    .thenApply(k -> k.name().toUpperCase())
    .exceptionally(ex -> "Fehler");
cf.thenAccept(System.out::println);

// Virtuelle Threads (Java 21): sehr viele leichtgewichtige Threads für I/O
try (var exec = Executors.newVirtualThreadPerTaskExecutor()) { exec.submit(() -> holeDaten()); }

class Zaehler {
    private int n;
    public synchronized void erhoehen() { n++; }                 // gegenseitiger Ausschluss (Monitor)
    private final AtomicInteger a = new AtomicInteger();         // atomar ohne Sperre: a.incrementAndGet()
}
ConcurrentHashMap<String, Integer> cm = new ConcurrentHashMap<>();    // threadsichere Sammlung`],
  ['table', ['Problem', 'Erklärung', 'Lösung'], [['**Race Condition**', 'Ergebnis hängt von der Reihenfolge paralleler Zugriffe ab (`n++` ist nicht atomar: lesen, erhöhen, schreiben)', '`synchronized`, `AtomicInteger`, `Lock`'], ['**Deadlock**', 'Threads warten gegenseitig auf Sperren', 'Feste Sperrreihenfolge, Timeouts, weniger Sperren'], ['**Sichtbarkeit**', 'Ein Thread sieht Änderungen eines anderen nicht', '`volatile`, `synchronized`, `Atomic*`'], ['**Starvation**', 'Thread kommt nie an die Reihe', 'Faire Sperren']]],
  ['h', 'JVM, Speicher, Garbage Collection'],
  ['table', ['Bereich', 'Inhalt'], [['**Stack** (je Thread)', 'Methodenaufrufe, lokale Variablen, **Referenzen** (primitive Werte direkt); `StackOverflowError` bei zu tiefer Rekursion'], ['**Heap**', 'Alle **Objekte** und Arrays, gemeinsam für alle Threads; vom **Garbage Collector** verwaltet'], ['**Metaspace**', 'Klasseninformationen'], ['**String-Pool**', 'Gemeinsame Literale']]],
  ['p', 'Der **Garbage Collector** gibt Objekte frei, die **nicht mehr erreichbar** sind (keine Referenz mehr von einem "GC Root"). Der Entwickler gibt Speicher nicht selbst frei. **Memory Leaks** entstehen, wenn Objekte unbeabsichtigt referenziert bleiben (statische Sammlungen, vergessene Listener, Caches ohne Begrenzung). Moderne Collector: **G1** (Standard), **ZGC** (sehr kurze Pausen).'],
]);
