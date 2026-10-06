AP2.page('course-java-11', {
  b: 'course', g: 'Java', t: 'Java 11: Exceptions, Dateien und JSON',
  d: 'Fehler zur Laufzeit meldet Java mit **Exceptions**. Mit `try { ... } catch (Typ e) { ... } finally { ... }` fängt man sie ab. Java unterscheidet **checked Exceptions** (Unterklassen von `Exception`, zum Beispiel `IOException`), die man **fangen oder mit `throws` deklarieren muss**, und **unchecked Exceptions** (Unterklassen von `RuntimeException`, zum Beispiel `NullPointerException`, `IllegalArgumentException`), bei denen das freiwillig ist. Mit `throw new ...` löst man selbst eine aus. Dateien liest man komfortabel mit `Files.readAllLines`, Ressourcen schließt **try-with-resources** automatisch.',
  m: '**checked (IOException) = Compiler zwingt zur Behandlung; unchecked (RuntimeException) = Programmierfehler, freiwillig.** **Spezifische Exceptions zuerst fangen, allgemeine danach.** **try-with-resources: `try (var r = new BufferedReader(...)) { }` schließt automatisch.** **`throw` löst aus, `throws` deklariert in der Signatur.**',
  cheat: [
    ['Syntax', ['`try { ... }`', '`catch (IOException e) { ... }`', '`catch (A | B e)` Multi-Catch', '`finally { ... }` immer']],
    ['Häufige Exceptions', ['`NullPointerException`', '`ArrayIndexOutOfBoundsException`', '`NumberFormatException`', '`IOException`, `FileNotFoundException`']],
    ['Eigene', ['`throw new IllegalArgumentException("...")`', '`class KapazitaetException extends Exception`', '`void lade() throws IOException`', '`e.getMessage()`, `e.printStackTrace()`']],
    ['Dateien (java.nio)', ['`Files.readAllLines(Path.of(p))`', '`Files.writeString(Path.of(p), text)`', '`Files.lines(p)` als Stream', '`Files.exists(p)`']],
  ],
  blocks: [
    ['h', 'Die Exception-Hierarchie'],
    ['diagram', AP2.dg.tree({t: 'Throwable', c: [{t: 'Error', c: [{t: 'OutOfMemoryError'}]}, {t: 'Exception', c: [{t: 'IOException', c: [{t: 'FileNotFound...'}]}, {t: 'SQLException'}, {t: 'RuntimeException', c: [{t: 'NullPointer...'}, {t: 'IllegalArgument...', c: [{t: 'NumberFormat...'}]}, {t: 'IndexOutOfBounds...'}]}]}]}, {k: 'round', w: 120, h: 34, gx: 128, gy: 62, cap: 'Error: schwere Fehler, nicht behandeln. Exception: checked (muss behandelt werden). RuntimeException: unchecked.'})],
    ['table', ['', 'Checked Exception', 'Unchecked Exception'], [
      ['Oberklasse', '`Exception` (nicht RuntimeException)', '`RuntimeException`'],
      ['Compiler', 'Erzwingt `catch` oder `throws`', 'Keine Pflicht'],
      ['Ursache', 'Äußere Umstände: Datei fehlt, Netzwerk weg, Datenbank nicht erreichbar', 'Programmierfehler: null, falscher Index, ungültiges Argument'],
      ['Beispiele', 'IOException, SQLException', 'NullPointerException, ArithmeticException, NumberFormatException'],
    ]],
    ['h', 'try, catch, finally'],
    ['code', 'java', `Scanner sc = new Scanner(System.in);
try {
    System.out.print("Anzahl: ");
    int anzahl = Integer.parseInt(sc.nextLine());     // NumberFormatException möglich
    int[] werte = new int[anzahl];
    System.out.println(werte[anzahl]);                // ArrayIndexOutOfBoundsException!
} catch (NumberFormatException e) {
    System.out.println("Bitte eine ganze Zahl eingeben.");
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Index ungültig: " + e.getMessage());
} catch (Exception e) {                               // allgemein ZULETZT
    System.out.println("Unerwarteter Fehler: " + e);
} finally {
    System.out.println("Ende der Eingabe");           // läuft immer
}`],
    ['warn', 'Reihenfolge der catch-Blöcke: von **speziell** nach **allgemein**. Steht `catch (Exception e)` zuerst, meldet der Compiler, dass die folgenden Blöcke unerreichbar sind. Leere catch-Blöcke (`catch (Exception e) {}`) verschlucken Fehler und machen die Fehlersuche unmöglich.'],
    ['h', 'Exceptions auslösen und eigene definieren'],
    ['code', 'java', `public class Strom extends Messwert {
    public Strom(double wert) {
        if (Double.isNaN(wert)) throw new IllegalArgumentException("Messwert fehlt");
        this.wert = wert;
    }
}

public class DatenimportException extends Exception {      // eigene checked Exception
    public DatenimportException(String meldung, Throwable ursache) {
        super(meldung, ursache);
    }
}

public List<String> ladeDatei(String pfad) throws DatenimportException {
    try {
        return Files.readAllLines(Path.of(pfad));
    } catch (IOException e) {
        throw new DatenimportException("Datei " + pfad + " nicht lesbar", e);   // umverpacken
    }
}`],
    ['h', 'Dateien lesen'],
    ['code', 'java', `import java.nio.file.*;
import java.io.*;
import java.util.*;

// Variante 1: alle Zeilen auf einmal (kleine Dateien)
List<String> zeilen = Files.readAllLines(Path.of("Artikelpreise.csv"));   // wirft IOException
for (int i = 1; i < zeilen.size(); i++) {                               // ab 1: Kopf überspringen
    String[] t = zeilen.get(i).split(";");
    alleArtikel.add(new Artikel(t[0].trim(), Double.parseDouble(t[1].trim())));
}

// Variante 2: zeilenweise mit try-with-resources (große Dateien)
try (BufferedReader br = Files.newBufferedReader(Path.of("Bestelldaten.csv"))) {
    br.readLine();                                   // Kopfzeile
    String zeile;
    while ((zeile = br.readLine()) != null) {        // null = Dateiende
        String[] t = zeile.split(";");
        alleBestellpositionen.add(new Bestellposition(t[0].trim(), t[1].trim(), Integer.parseInt(t[2].trim())));
    }
} catch (IOException e) {
    System.out.println("Fehler beim Lesen: " + e.getMessage());
}                                                    // br wird automatisch geschlossen`],
    ['h', 'Dateien schreiben'],
    ['code', 'java', `List<String> ausgabe = List.of("Nr;Bezeichnung;Anzahl", "1;Feuerdorn;10");
Files.write(Path.of("rechnung.csv"), ausgabe);                       // überschreibt

try (PrintWriter pw = new PrintWriter(new FileWriter("log.txt", true))) {   // true = anhängen
    pw.printf("%s Import abgeschlossen%n", java.time.LocalDateTime.now());
}`],
    ['h', 'JSON verarbeiten'],
    ['p', 'Java hat keinen JSON-Parser in der Standardbibliothek. Üblich sind **org.json**, **Jackson** oder **Gson**. In der Prüfung Sommer 2023 war die Klasse `JSONObject` (org.json) mit `getJSONObject`, `getInt`, `getDouble`, `getString` vorgegeben.'],
    ['code', 'java', `import org.json.JSONObject;

String inhalt = Files.readString(Path.of("messung.json"));
JSONObject json = new JSONObject(inhalt);
double[] temp = new double[4];
for (int i = 0; i < 4; i++) {
    temp[i] = json.getJSONObject("Sensor" + (i + 1)).getDouble("Temperatur");
}

JSONObject antwort = new JSONObject();
antwort.put("mittelwert", 3.0);
antwort.put("ok", true);
System.out.println(antwort.toString(2));    // eingerückt ausgeben`],
    ['h', 'Datenbankzugriff mit JDBC (Überblick)'],
    ['code', 'java', `String url = "jdbc:mysql://localhost:3306/laborauswertung";        // Server, Port, Datenbank
try (Connection con = DriverManager.getConnection(url, "benutzer", "passwort");
     PreparedStatement ps = con.prepareStatement(
         "SELECT nachname, vorname FROM Patient WHERE ID = ?")) {      // Platzhalter gegen SQL-Injection
    ps.setInt(1, 42);
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            System.out.println(rs.getString("nachname") + ", " + rs.getString("vorname"));
        }
    }
} catch (SQLException e) {
    System.out.println("Datenbankfehler: " + e.getMessage());
}`],
    ['note', 'Der **Connection-String** enthält die Angaben aus der Prüfung Winter 2022/23: **Server** (Hostname/IP), **Port** (MySQL 3306), **Datenbankname**, **Benutzername** und **Passwort**. Prepared Statements trennen SQL-Befehl und Daten und verhindern so **SQL-Injection**.'],
    ['h', 'Übungen'],
    ['qa', 'Was ist der Unterschied zwischen throw und throws?', ['`throw` ist eine **Anweisung**, die eine Exception **auslöst**: `throw new IllegalArgumentException("...");`', '`throws` steht in der **Methodensignatur** und **deklariert**, dass die Methode eine (checked) Exception weiterreichen kann: `void lade() throws IOException`.'], 2],
    ['qa', 'Schreiben Sie eine Methode, die eine Zahl aus einem String liest und bei ungültiger Eingabe einen Standardwert liefert.', [['code', 'java', `static int parseOderStandard(String text, int standard) {
    try {
        return Integer.parseInt(text.trim());
    } catch (NumberFormatException | NullPointerException e) {
        return standard;
    }
}`]], 3],
    ['quiz', [
      {q: 'Welche Exception ist checked?', o: ['IOException', 'NullPointerException', 'ArithmeticException', 'IllegalArgumentException'], a: 0, e: 'Die anderen erben von RuntimeException.'},
      {q: 'Wann läuft der finally-Block?', o: ['Immer', 'Nur ohne Fehler', 'Nur nach einem Fehler', 'Nur bei return'], a: 0, e: 'Aufräumen.'},
      {q: 'Was macht try-with-resources?', o: ['Schließt die Ressource automatisch am Ende', 'Wiederholt den try-Block', 'Fängt alle Exceptions', 'Öffnet mehrere Dateien parallel'], a: 0, e: 'Ressourcen müssen AutoCloseable sein.'},
      {q: 'Was liefert BufferedReader.readLine() am Dateiende?', o: ['null', 'Einen leeren String', '-1', 'Eine EOFException'], a: 0, e: 'Deshalb while ((zeile = br.readLine()) != null).'},
      {q: 'Wogegen schützen PreparedStatements?', o: ['SQL-Injection', 'Viren', 'Stromausfall', 'Langsame Abfragen'], a: 0, e: 'Platzhalter statt String-Verkettung.'},
    ]],
    ['see', ['course-java-10', 'course-java-12', 'eua-exceptions', 'eua-dateien']],
  ],
});
