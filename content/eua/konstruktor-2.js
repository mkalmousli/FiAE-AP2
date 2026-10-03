AP2.add('eua-konstruktor', [
  ['h', 'Destruktor und Lebensende von Objekten'],
  ['p', 'Wenn ein Objekt nicht mehr gebraucht wird, muss sein **Speicher freigegeben** und müssen **Ressourcen** (Dateien, Datenbankverbindungen, Netzwerk) geschlossen werden. Es gibt zwei Ansätze:'],
  ['table', ['Ansatz', 'Sprachen', 'Funktionsweise'], [
    ['**Manuell / deterministisch**', 'C++', 'Der **Destruktor** `~Klasse()` läuft genau dann, wenn das Objekt zerstört wird (`delete` oder Ende des Gültigkeitsbereichs). Der Programmierer ist für den Speicher verantwortlich (Gefahr: Speicherlecks).'],
    ['**Automatisch (Garbage Collector)**', 'Java, C#, Python', 'Das System erkennt Objekte **ohne Referenzen** und gibt den Speicher **irgendwann** frei. Zeitpunkt nicht vorhersehbar. Es gibt daher (in Java) **keinen echten Destruktor**.'],
  ]],
  ['codes', [
    ['java', `// Ressourcen deterministisch schließen: try-with-resources (AutoCloseable)
try (BufferedReader br = new BufferedReader(new FileReader("daten.txt"))) {
    System.out.println(br.readLine());
}   // br.close() wird AUTOMATISCH am Ende des Blocks aufgerufen

// finalize() ist veraltet und soll NICHT verwendet werden.`],
    ['csharp', `class Datei : IDisposable
{
    public void Dispose() { /* Ressource freigeben */ }
    ~Datei() { /* Finalizer: Notnagel vom Garbage Collector aufgerufen */ }
}
using (var d = new Datei())
{
    // arbeiten ...
}   // Dispose() wird am Ende von using aufgerufen`],
    ['python', `class Verbindung:
    def __enter__(self): return self
    def __exit__(self, *args): print("Verbindung geschlossen")   # Aufräumen
    def __del__(self): print("Objekt zerstört")                   # Destruktor (unsicher)

with Verbindung() as v:
    pass                                    # __exit__ wird sicher aufgerufen`],
  ]],
  ['kv', [
    ['Speicherleck (Memory Leak)', 'Speicher wird nicht freigegeben, obwohl er nicht mehr gebraucht wird. In C++ durch fehlendes `delete`, in Java durch Referenzen, die ungewollt bestehen bleiben (zum Beispiel in einer statischen Liste).'],
    ['Ressourcen', 'Dateien, Netzwerkverbindungen, Datenbankverbindungen und Sperren sind **nicht nur Speicher**: Sie müssen **sofort** freigegeben werden, nicht erst beim Garbage Collector. Dafür: `try-with-resources`, `using`, `with`.'],
    ['Lebenszyklus', '**Erzeugen** (Konstruktor) - **Nutzen** (Methoden) - **Nicht mehr referenziert** - **Freigabe** (Garbage Collector / Destruktor).'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Wozu dient ein Konstruktor und wodurch unterscheidet er sich syntaktisch von einer normalen Methode?', 'Der Konstruktor **initialisiert** ein neu erzeugtes Objekt (setzt Attribute auf gültige Startwerte). Er hat den **gleichen Namen wie die Klasse** und **keinen Rückgabetyp** (auch nicht `void`). Er wird automatisch bei `new` aufgerufen.', 4],
  ['qa', 'Schreiben Sie eine Klasse Fahrzeug mit zwei Konstruktoren: einem ohne Parameter (marke "unbekannt") und einem mit Marke.', ['`class Fahrzeug {`', '`    private String marke;`', '`    Fahrzeug() { this("unbekannt"); }`', '`    Fahrzeug(String marke) { this.marke = marke; }`', '`}`'], 5],
  ['qa', 'Welche Ausgabe erzeugt new C(), wenn C von B und B von A erbt und jeder Konstruktor seinen Buchstaben ausgibt?', '**A, B, C.** Beim Erzeugen wird zuerst der Konstruktor der **Oberklasse** abgearbeitet, dann der der Unterklasse.', 3],
  ['qa', 'Warum gibt es in Java keinen klassischen Destruktor und wie schließt man trotzdem Ressourcen sicher?', 'Java verwendet einen **Garbage Collector**, der den Speicher nicht mehr referenzierter Objekte zu einem **nicht vorhersehbaren Zeitpunkt** freigibt. Für Ressourcen wie Dateien oder Datenbankverbindungen nutzt man **try-with-resources** (`AutoCloseable`), das `close()` am Blockende zuverlässig aufruft.', 4],
  ['quiz', [
    {q: 'Welchen Rückgabetyp hat ein Konstruktor?', o: ['Keinen (auch nicht void)', 'void', 'int', 'Den Klassentyp'], a: 0, e: 'Konstruktoren haben keinen Rückgabetyp.'},
    {q: 'Wann wird der Standardkonstruktor vom Compiler erzeugt?', o: ['Wenn kein eigener Konstruktor definiert ist', 'Immer', 'Nie', 'Nur bei abstrakten Klassen'], a: 0, e: 'Sobald man einen eigenen Konstruktor schreibt, entfällt der automatische Standardkonstruktor.'},
    {q: 'In welcher Reihenfolge werden Konstruktoren bei Vererbung ausgeführt?', o: ['Oberklasse vor Unterklasse', 'Unterklasse vor Oberklasse', 'Zufällig', 'Gar nicht'], a: 0, e: 'Zuerst wird die Oberklasse initialisiert.'},
    {q: 'Was ist die sichere Alternative zu einem Destruktor in Java für Dateien?', o: ['try-with-resources', 'finalize()', 'System.gc()', 'delete'], a: 0, e: 'try-with-resources ruft close() deterministisch auf.'},
  ]],
]);
