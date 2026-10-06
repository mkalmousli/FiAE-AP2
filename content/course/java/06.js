AP2.page('course-java-06', {
  b: 'course', g: 'Java', t: 'Java 6: Strings, StringBuilder und Textverarbeitung',
  d: 'Ein **String** ist in Java ein **unveränderliches Objekt** (immutable) der Klasse `java.lang.String`. Jede "Änderung" wie `toUpperCase()` oder `+` erzeugt einen **neuen** String. Strings vergleicht man mit `equals()`, nicht mit `==`. Für viele Verkettungen in Schleifen nimmt man `StringBuilder`, der veränderbar und deutlich schneller ist. Wichtige Methoden: `length()`, `charAt(i)`, `substring(a, b)`, `indexOf`, `split`, `trim`/`strip`, `replace`, `contains`, `startsWith`, `String.format`.',
  m: '**Strings sind unveränderlich -> Ergebnis zuweisen: `s = s.trim();`** **Vergleich: `equals` / `equalsIgnoreCase`, Sortierreihenfolge: `compareTo`.** **`substring(a, b)`: b exklusiv.** **`split(";")` liefert ein String-Array.** **In Schleifen: StringBuilder statt +.**',
  cheat: [
    ['Abfragen', ['`s.length()`', '`s.charAt(0)`', '`s.indexOf("x")` (-1 = nicht da)', '`s.contains`, `startsWith`, `endsWith`']],
    ['Umformen', ['`s.toUpperCase()`, `toLowerCase()`', '`s.trim()`, `s.strip()`', '`s.replace("a", "b")`', '`s.substring(2, 5)`']],
    ['Zerlegen, Verbinden', ['`s.split(";")` -> String[]', '`String.join(", ", liste)`', '`String.valueOf(42)`', '`Integer.parseInt(s)`']],
    ['StringBuilder', ['`var sb = new StringBuilder();`', '`sb.append("x").append(3);`', '`sb.insert(0, ">")`, `sb.reverse()`', '`sb.toString()`']],
  ],
  blocks: [
    ['h', 'Grundlegende Methoden'],
    ['code', 'java', `String s = "  Feuerdorn;5.0  ";
String t = s.trim();                       // "Feuerdorn;5.0" (Leerzeichen außen weg)
System.out.println(t.length());            // 13
System.out.println(t.charAt(0));           // 'F'
System.out.println(t.indexOf(";"));        // 9
System.out.println(t.substring(0, 9));     // "Feuerdorn" (Index 0 bis 8)
System.out.println(t.substring(10));       // "5.0" (ab Index 10 bis Ende)
System.out.println(t.toUpperCase());       // "FEUERDORN;5.0"
System.out.println(t.replace(".", ","));   // "Feuerdorn;5,0"
System.out.println(t.contains("dorn"));    // true
System.out.println(t.endsWith(".ext1"));   // false`],
    ['h', 'Unveränderlichkeit verstehen'],
    ['code', 'java', `String name = "max";
name.toUpperCase();                 // erzeugt "MAX", das Ergebnis wird aber verworfen!
System.out.println(name);           // max
name = name.toUpperCase();          // richtig: neuen String zuweisen
System.out.println(name);           // MAX`],
    ['h', 'Strings vergleichen'],
    ['code', 'java', `String a = "Apfel", b = "Birne";
a.equals("Apfel");               // true  (Inhalt, Groß/klein beachtet)
a.equalsIgnoreCase("APFEL");     // true
a.compareTo(b);                  // negativ: a kommt alphabetisch VOR b
b.compareTo(a);                  // positiv
a.compareTo("Apfel");            // 0: gleich
a.isEmpty();                     // false; " ".isBlank() -> true (nur Leerzeichen)`],
    ['h', 'Zerlegen mit split (CSV-Zeilen)'],
    ['code', 'java', `String zeile = "Strauch GmbH;Feuerdorn;10";
String[] teile = zeile.split(";");
String filiale = teile[0];                     // "Strauch GmbH"
String artikel = teile[1];                     // "Feuerdorn"
int anzahl = Integer.parseInt(teile[2].trim()); // 10

String flaeche = "West,10.5,4.5";
String[] f = flaeche.split(",");
double laenge = Double.parseDouble(f[1]);      // 10.5

// Achtung: split erwartet einen regulären Ausdruck!
"a.b.c".split(".");     // liefert ein LEERES Array (. = beliebiges Zeichen)
"a.b.c".split("\\\\."); // ["a", "b", "c"]  (Punkt maskieren)
"a|b".split("\\\\|");   // ["a", "b"]`],
    ['h', 'Zeichen durchlaufen'],
    ['code', 'java', `String wort = "Anna";
int vokale = 0;
for (int i = 0; i < wort.length(); i++) {
    char c = Character.toLowerCase(wort.charAt(i));
    if ("aeiou".indexOf(c) >= 0) vokale++;
}
for (char c : wort.toCharArray()) { ... }        // Alternative mit for-each

boolean palindrom = new StringBuilder(wort.toLowerCase()).reverse().toString()
                        .equals(wort.toLowerCase());   // true

char ziffer = '7';
int wert = ziffer - '0';                          // 7: Ziffernzeichen in Zahl (für Prüfziffern)
Character.isDigit(ziffer);                        // true`],
    ['h', 'StringBuilder für viele Verkettungen'],
    ['p', 'Weil Strings unveränderlich sind, erzeugt `ergebnis += teil` in einer Schleife jedes Mal ein neues Objekt (Laufzeit O(n²) bei vielen Durchläufen). `StringBuilder` arbeitet auf einem veränderbaren Puffer.'],
    ['code', 'java', `StringBuilder sb = new StringBuilder();
sb.append("Nr\\tBezeichnung\\tAnzahl\\n");
for (int i = 0; i < positionen.size(); i++) {
    Bestellposition p = positionen.get(i);
    sb.append(i + 1).append('\\t')
      .append(p.getBezeichnung()).append('\\t')
      .append(p.getAnzahl()).append('\\n');
}
String rechnung = sb.toString();`],
    ['h', 'Formatieren'],
    ['code', 'java', `String zeile = String.format("%-15s %5d %10.2f", "Feuerdorn", 10, 50.0);
// "Feuerdorn          10      50,00"   (Dezimaltrenner je nach Gebietsschema)
String text = """
    Strauch GmbH
    Bergstraße 21
    88000 München
    """;                                  // Textblock (ab Java 15)
String adresse = name + "\\n" + strasse + "\\n" + plz + " " + ort;`],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie die Methode `detectManufacturer(String datapath)`, die "manu1" liefert, wenn der Pfad auf ".ext1" endet, "manu2" bei ".ext2", sonst "unknown" (Groß-/Kleinschreibung egal).', [['code', 'java', `private static String detectManufacturer(String datapath) {
    String pfad = datapath.toLowerCase();
    if (pfad.endsWith(".ext1")) return "manu1";
    if (pfad.endsWith(".ext2")) return "manu2";
    return "unknown";
}`]], 4],
    ['qa', 'Prüfen Sie grob eine E-Mail-Adresse: genau ein "@", davor mindestens ein Zeichen, danach ein Punkt.', [['code', 'java', `static boolean emailOk(String adr) {
    int at = adr.indexOf('@');
    if (at <= 0 || at != adr.lastIndexOf('@')) return false;   // fehlt, vorne oder mehrfach
    return adr.substring(at + 1).contains(".");
}`]], 4],
    ['quiz', [
      {q: 'Was liefert "Prüfung".substring(1, 4)?', o: ['"rüf"', '"Prüf"', '"rüfu"', '"üfu"'], a: 0, e: 'Index 1 bis 3.'},
      {q: 'Was gibt s nach String s = "abc"; s.toUpperCase(); aus?', o: ['abc', 'ABC', 'Fehler', 'null'], a: 0, e: 'Strings sind unveränderlich.'},
      {q: 'Was liefert "a;b;c".split(";").length?', o: ['3', '2', '5', '1'], a: 0, e: 'Drei Teile.'},
      {q: 'Warum StringBuilder in Schleifen?', o: ['Er ist veränderbar und vermeidet viele neue String-Objekte', 'Weil + in Schleifen verboten ist', 'Er sortiert automatisch', 'Er ist threadsicher'], a: 0, e: 'StringBuffer wäre die threadsichere Variante.'},
      {q: 'Was ergibt "B".compareTo("A")?', o: ['Eine positive Zahl', '0', 'Eine negative Zahl', 'true'], a: 0, e: 'B kommt nach A.'},
    ]],
    ['see', ['course-java-05', 'course-java-07', 'course-python-03']],
  ],
});
