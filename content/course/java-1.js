AP2.page('course-java', {
  b: 'course', g: 'Programmiersprachen', t: 'Java: vollständiger Kurs von Grundlagen bis Fortgeschritten',
  d: '**Java** ist eine **statisch typisierte, objektorientierte, kompilierte** Sprache. Der **Compiler (`javac`)** erzeugt **Bytecode** (`.class`), die **JVM (Java Virtual Machine)** führt ihn aus (**JIT-Kompilierung**) und verwaltet den Speicher per **Garbage Collector**. Prinzip: **"Write once, run anywhere"**. Einsatz: Backend (Spring Boot), Android, Unternehmenssoftware, Big Data. **JDK** = Entwicklungskit (Compiler, Werkzeuge, JRE), **JRE** = Laufzeit, **JVM** = virtuelle Maschine.',
  m: '**Primitive Typen (int, double, boolean, char ...) vs. Referenztypen (Objekte, String, Arrays).** **`==` vergleicht Referenzen, `equals()` Inhalt.** **`equals` und `hashCode` immer gemeinsam überschreiben.** **Checked Exceptions müssen behandelt oder deklariert werden.** **Eine Basisklasse, viele Interfaces.** **Streams: filter, map, collect.**',
  cheat: [
    ['Grundlagen', ['`int x = 5; double d = 1.5; boolean b = true; char c = \'a\';`', '`String s = "Hi";` unveränderlich', '`var x = 5;` (ab Java 10)', '`System.out.println(...)`, `Scanner`', '`if/else`, `switch`-Ausdruck, `for`, `for-each`, `while`']],
    ['Struktur', ['`public class Main { public static void main(String[] args) }`', '`package`, `import`', 'Eine **öffentliche Klasse pro Datei**, Dateiname = Klassenname', '`static`, `final`, `abstract`']],
    ['OOP', ['`extends` (eine), `implements` (viele)', '`interface` mit `default`-Methoden', '`record`, `enum`, `sealed`', '`@Override`, `super`, `this`', '`equals`, `hashCode`, `toString`']],
    ['Sammlungen', ['`List`: `ArrayList`, `LinkedList`', '`Map`: `HashMap`, `TreeMap`, `LinkedHashMap`', '`Set`: `HashSet`, `TreeSet`', '`Queue`/`Deque`: `ArrayDeque`, `PriorityQueue`']],
    ['Fehler', ['**Checked:** `IOException` (behandeln oder `throws`)', '**Unchecked:** `RuntimeException`, `NullPointerException`', '`try-catch-finally`, `try-with-resources`']],
    ['Modern', ['Lambda `(a, b) -> a + b`', 'Streams `list.stream().filter(..).map(..).toList()`', '`Optional<T>`', 'Text Blocks `"""`', '`record Person(String name, int alter) {}`']],
  ],
  blocks: [
    ['h', 'Erstes Programm und Ablauf'],
    ['code', 'java', `// Datei Hallo.java  (Dateiname = Name der public-Klasse)
package de.beispiel;
import java.util.Scanner;

public class Hallo {
    public static void main(String[] args) {            // Einstiegspunkt
        int alter = 21;                                  // primitiv
        double preis = 3.99;
        boolean aktiv = true;
        final double PI = 3.14159;                       // final: Konstante, nicht änderbar
        String name = "Anna";                            // Referenztyp (Objekt)
        System.out.printf("%s ist %d Jahre alt, Preis %.2f%n", name, alter, preis);
        Scanner in = new Scanner(System.in);
        int zahl = in.nextInt();
        System.out.println(zahl * 2);
    }
}
// javac Hallo.java   ->  Hallo.class (Bytecode)      java de.beispiel.Hallo  ->  JVM führt aus`],
    ['diagram', AP2.dg.flow(['Hallo.java (Quelltext)', 'javac (Compiler)', 'Hallo.class (Bytecode)', 'JVM (JIT, GC)', 'Betriebssystem'], {w: 760, h: 110, keep: 640, styles: ['plain', 'accent', 'soft', 'solid', 'plain'], cap: 'Von Quelltext zur Ausführung: Bytecode ist plattformunabhängig, die JVM plattformspezifisch.'})],
    ['table', ['Typ', 'Größe', 'Bereich / Hinweis'], [['`byte`', '8 Bit', '-128 bis 127'], ['`short`', '16 Bit', '-32.768 bis 32.767'], ['`int`', '32 Bit', 'ca. ±2,1 Mrd. (Standard-Ganzzahl)'], ['`long`', '64 Bit', 'Suffix `L`'], ['`float` / `double`', '32 / 64 Bit', 'Gleitkomma, `double` Standard; Geld: `BigDecimal`'], ['`char`', '16 Bit', 'UTF-16-Zeichen `\'A\'`'], ['`boolean`', '1 Wert', '`true` / `false`'], ['Wrapper', '`Integer`, `Double`, `Boolean` ...', 'Objekt-Hüllen für Sammlungen; **Autoboxing** wandelt automatisch um']]],
    ['warn', 'Ganzzahldivision: `5 / 2 == 2` (nicht 2,5). Für Kommazahl `5 / 2.0` oder `(double) 5 / 2`. **Überlauf:** `Integer.MAX_VALUE + 1` wird negativ, ohne Fehler.'],
    ['h', 'Strings'],
    ['code', 'java', `String s = "Hallo Welt";
s.length(); s.charAt(0); s.substring(0, 5); s.toUpperCase(); s.contains("Welt"); s.indexOf("W");
s.replace("Welt", "Java"); s.split(" "); s.trim(); s.isBlank(); String.join(", ", "a", "b");
String a = new String("x"), b = "x", c = "x";
System.out.println(a == b);          // false: verschiedene Objekte
System.out.println(b == c);          // true:  String-Pool (gleiche Literale teilen ein Objekt)
System.out.println(a.equals(b));     // true:  Inhaltsvergleich, IMMER equals verwenden
StringBuilder sb = new StringBuilder();   // viele Änderungen effizient (String ist immutable)
for (int i = 0; i < 3; i++) sb.append(i).append(",");
String text = """
    Textblock
      mit Zeilen und "Anführungszeichen"
    """;`],
    ['h', 'Kontrollstrukturen und Arrays'],
    ['code', 'java', `int note = 2;
String t = switch (note) { case 1 -> "sehr gut"; case 2, 3 -> "gut"; default -> "andere"; };   // switch-Ausdruck
for (int i = 0; i < 5; i++) { if (i == 2) continue; if (i == 4) break; }
for (String w : new String[]{"a", "b"}) System.out.println(w);       // for-each
outer: for (int i = 0; i < 3; i++) for (int j = 0; j < 3; j++) if (j == 2) continue outer;   // Label

int[] zahlen = {5, 2, 9};  int[][] m = new int[3][4];  int[] leer = new int[10];   // Standardwert 0
java.util.Arrays.sort(zahlen);  System.out.println(java.util.Arrays.toString(zahlen) + zahlen.length);
int[] kopie = java.util.Arrays.copyOf(zahlen, 5);`],
  ],
});
