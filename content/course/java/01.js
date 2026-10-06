AP2.page('course-java-01', {
  b: 'course', g: 'Java', t: 'Java 1: Einstieg, JDK, JVM und das erste Programm',
  d: '**Java** ist eine **objektorientierte, statisch typisierte** Sprache. Der Quelltext (`.java`) wird vom **Compiler** `javac` in plattformunabhängigen **Bytecode** (`.class`) übersetzt, den die **Java Virtual Machine (JVM)** auf jedem Betriebssystem ausführt ("Write once, run anywhere"). Ein **JIT-Compiler** in der JVM übersetzt häufig genutzten Bytecode zur Laufzeit in Maschinencode. Zum Entwickeln braucht man das **JDK** (Java Development Kit: Compiler, JVM, Bibliotheken); zum reinen Ausführen genügt eine Laufzeitumgebung (JRE).',
  m: '**Datei heißt wie die public-Klasse** (`Hallo.java` -> `public class Hallo`). **Einstieg: `public static void main(String[] args)`.** **Jede Anweisung endet mit `;`, Blöcke stehen in `{ }`.** **Groß-/Kleinschreibung zählt.** **Klassen GroßGeschrieben (PascalCase), Methoden und Variablen kleinGeschrieben (camelCase).**',
  cheat: [
    ['Werkzeuge', ['JDK = Compiler + JVM + Bibliothek', '`javac Hallo.java` übersetzt', '`java Hallo` startet', 'IDE: IntelliJ, Eclipse, VS Code']],
    ['Ausgabe', ['`System.out.println("Text");`', '`System.out.print(x);` ohne Umbruch', '`System.out.printf("%.2f%n", x);`', '`+` verkettet Strings']],
    ['Eingabe', ['`import java.util.Scanner;`', '`Scanner sc = new Scanner(System.in);`', '`int n = sc.nextInt();`', '`String s = sc.nextLine();`']],
    ['Kommentare', ['`// einzeilig`', '`/* mehrzeilig */`', '`/** Javadoc */`', '`@param`, `@return` im Javadoc']],
  ],
  blocks: [
    ['h', 'Wie aus Quelltext ein laufendes Programm wird'],
    ['diagram', AP2.dg.flow(['Hallo.java (Quelltext)', 'javac (Compiler)', 'Hallo.class (Bytecode)', 'JVM (Interpreter + JIT)', 'Ausgabe'], {w: 760, h: 110, styles: ['plain', 'accent', 'soft', 'solid', 'plain'], cap: 'Java wird zuerst kompiliert (Syntaxfehler fallen hier auf) und dann auf der JVM ausgeführt.'})],
    ['table', ['Begriff', 'Bedeutung'], [
      ['**JDK** (Java Development Kit)', 'Alles zum Entwickeln: Compiler `javac`, JVM, Standardbibliothek, Werkzeuge (javadoc, jar)'],
      ['**JRE** (Java Runtime Environment)', 'Nur zum Ausführen: JVM und Bibliotheken (heute meist im JDK enthalten)'],
      ['**JVM** (Java Virtual Machine)', 'Führt Bytecode aus, verwaltet den Speicher (Garbage Collector), sorgt für Plattformunabhängigkeit'],
      ['**Bytecode**', 'Zwischencode in `.class`-Dateien, nicht direkt vom Prozessor ausführbar, aber für jede JVM gleich'],
      ['**JIT-Compiler**', 'Übersetzt häufig ausgeführten Bytecode zur Laufzeit in schnellen Maschinencode'],
      ['**Garbage Collector**', 'Gibt Objekte, auf die keine Referenz mehr zeigt, automatisch frei (kein manuelles free wie in C)'],
    ]],
    ['h', 'Das erste Programm'],
    ['code', 'java', `// Datei: Hallo.java
public class Hallo {                                  // Klasse (Dateiname = Klassenname)
    public static void main(String[] args) {          // Einstiegspunkt
        System.out.println("Hallo Welt!");            // Ausgabe mit Zeilenumbruch
        System.out.println("Ich lerne Java.");
        System.out.println(3 + 4);                    // 7
    }
}`],
    ['code', 'text', `$ javac Hallo.java      # erzeugt Hallo.class
$ java Hallo            # startet die Klasse (ohne .class)
Hallo Welt!
Ich lerne Java.
7`],
    ['list', [
      '`public class Hallo`: Alles in Java steht in **Klassen**. Die öffentliche Klasse muss so heißen wie die Datei.',
      '`public static void main(String[] args)`: Hier beginnt die Ausführung. `public` = von außen aufrufbar, `static` = ohne Objekt aufrufbar, `void` = keine Rückgabe, `args` = Kommandozeilenargumente.',
      '`System.out.println(...)`: Gibt Text auf der Konsole aus. `System` ist eine Klasse, `out` ein Objekt (Ausgabestrom), `println` eine Methode.',
      'Jede **Anweisung** endet mit **Semikolon**. Blöcke werden mit **geschweiften Klammern** gebildet; die Einrückung ist nur für die Lesbarkeit.',
    ]],
    ['note', 'Seit Java 21 (Vorschau) bzw. Java 25 gibt es vereinfachte Programme ohne Klassenkopf (`void main() { ... }`). In der Prüfung und in den meisten Projekten schreibt man aber die klassische Form.'],
    ['h', 'Eingaben lesen mit Scanner'],
    ['code', 'java', `import java.util.Scanner;                              // Klasse aus der Standardbibliothek

public class Begruessung {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);           // liest von der Tastatur
        System.out.print("Wie heißt du? ");
        String name = sc.nextLine();                   // ganze Zeile als String
        System.out.print("Wie alt bist du? ");
        int alter = sc.nextInt();                      // ganze Zahl
        System.out.println("Hallo " + name + ", nächstes Jahr bist du " + (alter + 1));
        sc.close();
    }
}`],
    ['warn', 'Falle: Nach `nextInt()` bleibt der Zeilenumbruch im Eingabepuffer. Ein folgendes `nextLine()` liefert dann sofort einen **leeren String**. Abhilfe: nach `nextInt()` einmal `sc.nextLine();` aufrufen oder immer `Integer.parseInt(sc.nextLine())` verwenden.'],
    ['h', 'Formatierte Ausgabe'],
    ['code', 'java', `double preis = 1074.7189;
System.out.printf("Preis: %.2f EUR%n", preis);          // Preis: 1074,72 EUR (deutsches Gebietsschema)
System.out.printf("%-12s|%8d%n", "Feuerdorn", 10);       // linksbündig 12, rechtsbündig 8
String s = String.format("%05d", 42);                   // "00042"`],
    ['table', ['Platzhalter', 'Bedeutung'], [
      ['`%d`', 'Ganzzahl'], ['`%f`, `%.2f`', 'Kommazahl, mit 2 Nachkommastellen'], ['`%s`', 'String'], ['`%n`', 'Zeilenumbruch (plattformunabhängig)'], ['`%10s`, `%-10s`', 'rechts- bzw. linksbündig in 10 Zeichen'],
    ]],
    ['h', 'Häufige Compilerfehler'],
    ['table', ['Meldung', 'Ursache'], [
      ['`\';\' expected`', 'Semikolon vergessen'],
      ['`cannot find symbol`', 'Tippfehler im Namen, Variable nicht deklariert, Import fehlt'],
      ['`incompatible types`', 'Falscher Datentyp, zum Beispiel String einer int-Variablen zuweisen'],
      ['`class X is public, should be declared in a file named X.java`', 'Datei- und Klassenname stimmen nicht überein'],
      ['`missing return statement`', 'Methode mit Rückgabetyp gibt nicht in jedem Pfad etwas zurück'],
    ]],
    ['h', 'Java im Vergleich'],
    ['table', ['Merkmal', 'Java', 'C#', 'Python'], [
      ['Typisierung', 'statisch, stark', 'statisch, stark', 'dynamisch, stark'],
      ['Ausführung', 'Bytecode auf JVM', 'IL-Code auf .NET-CLR', 'Interpreter (Bytecode)'],
      ['Blöcke', '`{ }`', '`{ }`', 'Einrückung'],
      ['Einstieg', '`public static void main(String[] args)`', '`static void Main(string[] args)` oder Top-Level', 'Datei von oben'],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie ein Java-Programm, das zwei ganze Zahlen einliest und Summe, Differenz, Produkt und den ganzzahligen Quotienten ausgibt.', [['code', 'java', `import java.util.Scanner;

public class Rechner {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("a: ");
        int a = Integer.parseInt(sc.nextLine());
        System.out.print("b: ");
        int b = Integer.parseInt(sc.nextLine());
        System.out.println("Summe: " + (a + b));
        System.out.println("Differenz: " + (a - b));
        System.out.println("Produkt: " + (a * b));
        if (b != 0) System.out.println("Quotient: " + (a / b));
    }
}`], 'Klammern um `(a + b)`, sonst verkettet Java zuerst den String mit a und dann mit b: "Summe: 34".'], 4],
    ['qa', 'Erklären Sie, warum Java als plattformunabhängig gilt.', ['Der Compiler erzeugt keinen Maschinencode für einen bestimmten Prozessor, sondern **Bytecode**. Dieser läuft auf jeder **JVM**, die es für Windows, Linux, macOS usw. gibt. Dieselbe `.class`-Datei kann so ohne Neukompilieren auf allen Plattformen ausgeführt werden.'], 3],
    ['quiz', [
      {q: 'Was erzeugt javac aus einer .java-Datei?', o: ['Bytecode (.class)', 'Maschinencode (.exe)', 'HTML', 'Python-Code'], a: 0, e: 'Die JVM führt den Bytecode aus.'},
      {q: 'Wie muss die Datei für public class Rechnung heißen?', o: ['Rechnung.java', 'rechnung.java', 'Main.java', 'Beliebig'], a: 0, e: 'Exakt wie die Klasse.'},
      {q: 'Was bedeutet static bei main?', o: ['Die Methode kann ohne Objekt aufgerufen werden', 'Die Methode ist unveränderlich', 'Die Methode ist privat', 'Die Methode gibt nichts zurück'], a: 0, e: 'void = keine Rückgabe.'},
      {q: 'Was gibt System.out.println("Summe: " + 3 + 4) aus?', o: ['Summe: 34', 'Summe: 7', 'Fehler', 'Summe: 3 + 4'], a: 0, e: 'Von links: String + 3 = String, dann + 4.'},
      {q: 'Was ist der Garbage Collector?', o: ['Er gibt nicht mehr referenzierte Objekte automatisch frei', 'Ein Werkzeug zum Löschen von Dateien', 'Ein Compiler', 'Ein Debugger'], a: 0, e: 'Automatische Speicherverwaltung.'},
    ]],
    ['see', ['course-java-02', 'course-python-01', 'course-csharp-01']],
  ],
});
