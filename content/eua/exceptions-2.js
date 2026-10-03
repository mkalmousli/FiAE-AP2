AP2.add('eua-exceptions', [
  ['h', 'Exceptions selbst auslösen und weitergeben'],
  ['codes', [
    ['java', `// throw: Fehler selbst melden (Vorbedingung prüfen)
class Konto {
    private double saldo;
    void abheben(double betrag) {
        if (betrag <= 0) throw new IllegalArgumentException("Betrag muss positiv sein");
        if (betrag > saldo) throw new GuthabenException("Zu wenig Guthaben: " + saldo);
        saldo -= betrag;
    }
}
// Eigene Exception-Klasse
class GuthabenException extends RuntimeException {
    GuthabenException(String text) { super(text); }
}

// Weiterreichen (checked Exception): throws in der Signatur
static String lese(String pfad) throws IOException {
    return Files.readString(Path.of(pfad));       // Fehler geht an den Aufrufer
}

// Aufrufer behandelt
try {
    konto.abheben(500);
} catch (GuthabenException e) {
    System.out.println(e.getMessage());           // "Zu wenig Guthaben: 100.0"
}`],
    ['python', `class GuthabenError(Exception):
    pass

def abheben(self, betrag):
    if betrag <= 0:
        raise ValueError("Betrag muss positiv sein")      # raise = throw
    if betrag > self.saldo:
        raise GuthabenError(f"Zu wenig Guthaben: {self.saldo}")
    self.saldo -= betrag`],
  ]],
  ['kv', [
    ['Exceptions weiterreichen (propagieren)', 'Wird eine Exception nicht in der Methode gefangen, **wandert sie in die aufrufende Methode** (Aufrufstack nach oben), bis ein passender catch-Block sie fängt. Fängt keiner, **beendet sie das Programm** mit einem Stack Trace.'],
    ['Stack Trace', 'Liste der **Methodenaufrufe** bis zum Fehler (mit Zeilennummern). Das **wichtigste Hilfsmittel** bei der Fehlersuche: Die oberste Zeile zeigt, **wo** der Fehler ausgelöst wurde.'],
    ['try-with-resources', 'Java: Ressourcen (Dateien, Verbindungen), die `AutoCloseable` implementieren, werden am Blockende **automatisch geschlossen**, auch bei Fehlern. C#: `using`, Python: `with`.'],
    ['Eigene Exceptions', 'Eigene Klassen (`GuthabenException`) machen Fehler **fachlich verständlich** und erlauben gezieltes Abfangen.'],
  ]],
  ['table', ['Falsch (schlechter Stil)', 'Besser'], [
    ['`catch (Exception e) { }` (leer): Fehler wird **verschluckt**', 'Fehler behandeln, protokollieren (Logging) oder weiterwerfen'],
    ['`catch (Exception e)` für alles', 'Gezielt die erwarteten Exceptions fangen'],
    ['Exceptions für **normalen Ablauf** (zum Beispiel Schleife beenden)', 'Exceptions nur für **Ausnahmesituationen**, Normalfälle mit `if` prüfen'],
    ['Technische Details dem Benutzer zeigen (Stack Trace)', 'Verständliche Meldung anzeigen, Details ins **Log**'],
    ['Ressource im `try`, aber `close()` vergessen', '`try-with-resources` oder `finally`'],
  ]],
  ['procon', 'Exceptions gegenüber Rückgabecodes (zum Beispiel -1)', ['Fehlerbehandlung **getrennt** vom normalen Code, übersichtlicher', 'Fehler können **nicht ignoriert** werden (ohne Behandlung bricht das Programm ab)', 'Aussagekräftige Informationen (Typ, Meldung, Stack Trace)'], ['Etwas **langsamer** bei häufiger Auslösung', 'Gefahr von zu breiten catch-Blöcken, die Fehler verbergen', 'Kontrollfluss "springt", das erschwert das Nachvollziehen']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Was gibt der Code aus? try { System.out.print("A"); int x = 5 / 0; System.out.print("B"); } catch (ArithmeticException e) { System.out.print("C"); } finally { System.out.print("D"); } System.out.print("E");', ['**ACDE.** "A" wird ausgegeben, dann löst `5 / 0` eine ArithmeticException aus: "B" wird übersprungen, der catch-Block gibt "C" aus, finally immer "D", danach läuft das Programm mit "E" weiter.'], 4],
  ['qa', 'Erklären Sie die Aufgabe der Blöcke try, catch und finally.', ['- **try:** enthält den Code, der einen Fehler auslösen kann.', '- **catch:** fängt eine bestimmte Exception ab und behandelt sie.', '- **finally:** wird **immer** ausgeführt, zum Beispiel um Ressourcen (Dateien, Verbindungen) freizugeben.'], 4],
  ['qa', 'Eine Methode `double teile(double a, double b)` soll bei b = 0 einen Fehler melden. Wie implementieren Sie das?', ['`double teile(double a, double b) {`', '`    if (b == 0) throw new ArithmeticException("Division durch 0");`', '`    return a / b;`', '`}`', 'Der Aufrufer fängt die Exception mit try-catch und zeigt eine verständliche Meldung.'], 5],
  ['qa', 'Warum sollte ein catch-Block nie leer sein?', 'Ein leerer catch-Block **verschluckt den Fehler**: Das Programm läuft scheinbar weiter, die Ursache bleibt unentdeckt, es kann zu Folgefehlern oder falschen Ergebnissen kommen und die Fehlersuche wird sehr schwer. Man sollte den Fehler **behandeln, protokollieren oder weiterreichen**.', 4],
  ['quiz', [
    {q: 'Wann wird der finally-Block ausgeführt?', o: ['Immer', 'Nur bei einem Fehler', 'Nur ohne Fehler', 'Nie'], a: 0, e: 'finally läuft in jedem Fall, zum Beispiel zum Aufräumen.'},
    {q: 'In welcher Reihenfolge sollten catch-Blöcke stehen?', o: ['Spezielle zuerst, allgemeine zuletzt', 'Allgemeine zuerst', 'Zufällig', 'Alphabetisch'], a: 0, e: 'Sonst fängt der allgemeine Block alles ab und die speziellen sind unerreichbar.'},
    {q: 'Was bewirkt throw?', o: ['Löst eine Exception aus', 'Fängt eine Exception', 'Beendet das Programm immer', 'Schließt eine Datei'], a: 0, e: 'throw "wirft" eine Exception.'},
    {q: 'Was ist eine unchecked Exception in Java?', o: ['Eine Exception, die man nicht behandeln oder deklarieren muss (RuntimeException)', 'Eine Exception ohne Meldung', 'Eine Syntaxfehler-Meldung', 'Ein Warnhinweis des Compilers'], a: 0, e: 'Checked Exceptions muss man behandeln oder mit throws weiterreichen.'},
    {q: 'Was zeigt der Stack Trace?', o: ['Die Kette der Methodenaufrufe bis zum Fehler', 'Den Arbeitsspeicher', 'Die Netzwerkverbindung', 'Die Version des Compilers'], a: 0, e: 'Er hilft, die Fehlerstelle zu finden.'},
  ]],
]);
