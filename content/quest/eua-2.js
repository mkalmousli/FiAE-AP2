AP2.quest('eua', [
  {id: 'eua-patterns', t: 'Entwurfsmuster', qs: [
    {q: 'Welches Muster stellt sicher, dass es von einer Klasse **genau eine Instanz** gibt?', o: ['Singleton', 'Factory', 'Observer', 'Strategy'], a: 0, lv: 1, e: '**Singleton**: privater Konstruktor + `static getInstance()`. Factory erzeugt Objekte, legt aber keine Anzahl fest.'},
    {q: 'Woran erkennt man ein Singleton im Code am sichersten?', o: ['Privater Konstruktor und statische getInstance()-Methode', 'Ein Interface mit einer Methode update()', 'Eine Methode create(typ) mit switch', 'Eine Liste von Listenern'], a: 0, lv: 1, e: 'Der **private Konstruktor** verhindert `new` von außen, `getInstance()` liefert immer dasselbe Objekt.'},
    {q: 'Ein Wetterdienst soll alle angemeldeten Anzeigen automatisch benachrichtigen, wenn sich die Temperatur ändert. Welches Muster?', o: ['Observer', 'Singleton', 'Adapter', 'Factory'], a: 0, lv: 2, e: '**Observer**: Subjekt hält Liste von Beobachtern und ruft bei Änderung `notify()` / `update()` auf (1:n-Benachrichtigung).'},
    {q: 'Ein Onlineshop soll die Versandkostenberechnung (DHL, UPS, Abholung) zur Laufzeit austauschen können. Welches Muster?', o: ['Strategy', 'Observer', 'Singleton', 'Composite'], a: 0, lv: 2, e: '**Strategy**: austauschbare Algorithmen hinter einem gemeinsamen Interface. Observer benachrichtigt, tauscht aber keinen Algorithmus.'},
    {q: 'Welches Muster liegt vor?', c: `class Logger {
  private static Logger inst;
  private Logger() {}
  public static Logger getInstance() {
    if (inst == null) inst = new Logger();
    return inst;
  }
}`, o: ['Singleton (lazy)', 'Factory Method', 'Observer', 'Decorator'], a: 0, lv: 1, e: 'Klassisches **Singleton** mit verzögerter (lazy) Erzeugung beim ersten Aufruf.'},
    {q: 'Welches Muster liegt vor?', c: `Fahrzeug f = FahrzeugFabrik.erzeuge("LKW");
// liefert LKW, PKW oder Motorrad`, o: ['Factory', 'Singleton', 'Strategy', 'Observer'], a: 0, lv: 1, e: 'Die **Factory** kapselt die Objekterzeugung: der Aufrufer kennt nur die Oberklasse/das Interface.'},
    {k: 'match', q: 'Ordne das Muster seiner Kategorie zu', o: [['Singleton', 'Erzeugungsmuster'], ['Observer', 'Verhaltensmuster'], ['Adapter', 'Strukturmuster'], ['Factory', 'Erzeugungsmuster (zweites)']], e: 'Erzeugung: Singleton, Factory, Builder. Struktur: Adapter, Decorator, Composite, Facade, Proxy. Verhalten: Observer, Strategy.'},
    {k: 'multi', q: 'Welche Muster sind **Verhaltensmuster**? (mehrere)', o: ['Observer', 'Strategy', 'Singleton', 'Adapter'], a: [0, 1], lv: 2, e: 'Observer und Strategy regeln Zusammenarbeit/Verhalten. Singleton = Erzeugung, Adapter = Struktur.'},
    {q: 'Eine alte Bibliothek hat die Methode `getTemp()`, dein Code erwartet das Interface `Sensor.lesen()`. Welches Muster passt?', o: ['Adapter', 'Observer', 'Singleton', 'Strategy'], a: 0, lv: 2, e: 'Der **Adapter** übersetzt eine vorhandene Schnittstelle in die erwartete. Wie ein Reisestecker.'},
    {q: 'Was ist ein typischer **Nachteil** des Singleton?', o: ['Globaler Zustand erschwert Unit-Tests', 'Es erzeugt zu viele Objekte', 'Es ist nur in Python möglich', 'Es verhindert Vererbung von Interfaces vollständig'], a: 0, lv: 2, e: 'Singleton ist **globaler Zustand**: schwer zu mocken, versteckte Abhängigkeiten, bei Threads Synchronisation nötig.'},
    {k: 'tf', q: 'Beim Observer kennt das Subjekt die konkreten Klassen seiner Beobachter.', a: false, lv: 2, e: 'Das Subjekt kennt nur das **Observer-Interface** (`update()`). Das ist die lose Kopplung.'},
    {q: 'Was bedeutet **MVC**?', o: ['Model, View, Controller', 'Module, Variable, Class', 'Main, Value, Code', 'Model, Vector, Component'], a: 0, lv: 1, e: '**Model** = Daten/Logik, **View** = Darstellung, **Controller** = Eingaben verarbeiten.'},
    {k: 'match', q: 'Ordne die MVC-Teile zu', o: [['Model', 'Daten und Geschäftslogik'], ['View', 'Darstellung für den Benutzer'], ['Controller', 'Nimmt Eingaben entgegen und steuert']], e: 'Trennung der Verantwortlichkeiten: Oberfläche austauschbar, ohne die Logik zu ändern.'},
    {q: 'Welche Aussage über Entwurfsmuster ist **FALSCH**?', o: ['Sie sind fertiger, kopierbarer Code einer Bibliothek', 'Sie sind bewährte Lösungsschablonen für wiederkehrende Probleme', 'Sie schaffen ein gemeinsames Vokabular im Team', 'Sie wurden u. a. von der Gang of Four beschrieben'], a: 0, lv: 2, e: 'Muster sind **Lösungsideen**, kein fertiger Code. Sie müssen für den Fall umgesetzt werden.'},
    {k: 'gap', q: 'Beim Observer heißt die Methode, die jeden Beobachter informiert, oft ___ (das Subjekt ruft sie in einer Schleife auf).', a: ['notify', 'notifyObservers', 'benachrichtigen'], lv: 2, e: '`notify()` durchläuft die Liste und ruft bei jedem Beobachter `update()` auf.'},
    {q: 'Eine Kaffeemaschine soll Extras (Milch, Zucker, Sirup) beliebig **kombiniert** um ein Getränk legen, ohne für jede Kombination eine Unterklasse. Welches Muster?', o: ['Decorator', 'Singleton', 'Factory', 'Observer'], a: 0, lv: 3, e: '**Decorator** umhüllt ein Objekt und erweitert es dynamisch. Unterklassen für jede Kombination würden explodieren.'},
    {q: 'Was ist der Hauptnutzen der **Strategy** gegenüber einem großen `if/else` über die Varianten?', o: ['Neue Varianten ohne Änderung der Kontextklasse (Open-Closed)', 'Schnellere Ausführung', 'Weniger Klassen', 'Nur eine Instanz der Strategie'], a: 0, lv: 3, e: 'Neue Strategie = neue Klasse, der Kontext bleibt unverändert. Das ist das **Open-Closed-Prinzip**. Es entstehen eher mehr Klassen.'},
  ]},
  {id: 'eua-exceptions', t: 'Exceptions', qs: [
    {q: 'Welcher Block wird **immer** ausgeführt, egal ob eine Exception auftritt?', o: ['finally', 'catch', 'try', 'throw'], a: 0, lv: 1, e: '`finally` läuft immer, auch nach `return` im try. Ideal zum Aufräumen (Datei/Verbindung schließen).'},
    {q: 'Was wird ausgegeben?', c: `try {
  System.out.print("A");
  int x = 10 / 0;
  System.out.print("B");
} catch (ArithmeticException e) {
  System.out.print("C");
} finally {
  System.out.print("D");
}`, o: ['ACD', 'ABCD', 'ACBD', 'AD'], a: 0, lv: 2, e: 'Nach "A" wirft `10/0` eine **ArithmeticException**, "B" wird übersprungen, catch gibt "C" aus, finally "D".'},
    {q: 'Was wird ausgegeben?', c: `try {
  System.out.print("1");
} catch (Exception e) {
  System.out.print("2");
} finally {
  System.out.print("3");
}
System.out.print("4");`, o: ['134', '1234', '13', '14'], a: 0, lv: 1, e: 'Ohne Exception wird catch übersprungen, finally läuft trotzdem, danach geht es normal weiter.'},
    {q: 'Was wird ausgegeben?', c: `try {
  int[] a = new int[3];
  a[3] = 5;
} catch (ArithmeticException e) {
  System.out.print("X");
} catch (ArrayIndexOutOfBoundsException e) {
  System.out.print("Y");
} finally {
  System.out.print("Z");
}`, o: ['YZ', 'XZ', 'XYZ', 'Z'], a: 0, lv: 2, e: 'Index 3 bei Länge 3 ist ungültig (0..2): **ArrayIndexOutOfBounds**, passender zweiter catch, dann finally.'},
    {k: 'gap', q: 'Mit dem Schlüsselwort ___ löst man in Java selbst eine Exception aus.', a: ['throw'], lv: 1, e: '`throw new IllegalArgumentException("...")`. `throws` (mit s) steht dagegen in der Methodensignatur.'},
    {q: 'Was ist der Unterschied zwischen `throw` und `throws`?', o: ['throw löst aus, throws kündigt in der Signatur an', 'Beide sind identisch', 'throws löst aus, throw kündigt an', 'throw gibt es nur in Python'], a: 0, lv: 2, e: '`throw` = Anweisung, die wirft. `throws IOException` = Deklaration, dass die Methode das weitergeben kann.'},
    {k: 'tf', q: 'Ein `catch (Exception e)` vor `catch (IOException e)` ist in Java problemlos möglich.', a: false, lv: 3, e: 'Der allgemeine Typ fängt alles ab, der spezielle catch wäre **unerreichbar**, das ist ein Compilerfehler. Spezielle zuerst!'},
    {k: 'order', q: 'Ordne die catch-Blöcke korrekt an (von oben nach unten)', o: ['catch (FileNotFoundException e)', 'catch (IOException e)', 'catch (Exception e)'], lv: 2, e: 'Vom **speziellsten** zum allgemeinsten: FileNotFoundException erbt von IOException, diese von Exception.'},
    {q: 'Was gibt die Methode zurück?', c: `int f() {
  try { return 1; }
  finally { System.out.print("F"); }
}`, o: ['Gibt F aus und liefert 1', 'Liefert 1, F wird nie ausgegeben', 'Compilerfehler', 'Liefert 0'], a: 0, lv: 3, e: 'finally läuft auch nach `return` noch, bevor die Methode wirklich verlassen wird.'},
    {q: 'Eine Methode erhält ein negatives Alter als Parameter. Welche Exception ist fachlich passend?', o: ['IllegalArgumentException', 'NullPointerException', 'ArithmeticException', 'FileNotFoundException'], a: 0, lv: 2, e: '**IllegalArgumentException** = ungültiger Parameterwert. NullPointer wäre bei null, Arithmetic bei Division durch 0.'},
    {k: 'match', q: 'Ordne Fehlerursache und Exception zu', o: [['Methode auf null aufrufen', 'NullPointerException'], ['10 / 0 (int)', 'ArithmeticException'], ['Integer.parseInt("abc")', 'NumberFormatException'], ['Datei existiert nicht', 'FileNotFoundException']], e: 'Typische Laufzeitausnahmen, die in Prüfungen im Code versteckt werden.'},
    {k: 'multi', q: 'Welche sind in Java **checked** Exceptions (müssen behandelt oder mit throws deklariert werden)? (mehrere)', o: ['IOException', 'SQLException', 'NullPointerException', 'ArithmeticException'], a: [0, 1], lv: 3, e: 'Checked: IOException, SQLException. RuntimeExceptions (NullPointer, Arithmetic, IndexOutOfBounds) sind unchecked.'},
    {q: 'Was passiert, wenn eine Exception nirgends gefangen wird?', o: ['Sie wandert den Aufrufstack hoch und beendet das Programm mit Stacktrace', 'Sie wird automatisch ignoriert', 'Das Programm macht mit der nächsten Zeile weiter', 'Der Compiler verhindert das immer'], a: 0, lv: 2, e: 'Ungefangene Exceptions werden an den Aufrufer **weitergereicht**, ganz oben bricht das Programm mit Stacktrace ab.'},
    {q: 'Welcher Python-Block entspricht Javas `catch`?', o: ['except', 'catch', 'rescue', 'else'], a: 0, lv: 1, e: 'Python: `try / except / else / finally`, Auslösen mit `raise`.'},
    {k: 'tf', q: 'Ein leerer catch-Block (`catch (Exception e) {}`) ist guter Stil, weil das Programm dann nie abstürzt.', a: false, lv: 1, e: 'Fehler werden **verschluckt**, niemand bemerkt sie. Mindestens loggen oder sinnvoll reagieren.'},
    {q: 'Was gibt das Python-Programm aus?', c: `try:
    x = int("7")
    print("A")
except ValueError:
    print("B")
else:
    print("C")
finally:
    print("D")`, o: ['A C D', 'A B D', 'A D', 'B D'], a: 0, lv: 3, e: '"7" ist gültig, keine Exception: try ("A"), dann **else** ("C", läuft nur ohne Fehler), dann finally ("D").'},
  ]},
  {id: 'eua-debugging', t: 'Debugging', qs: [
    {k: 'match', q: 'Ordne die Fehlerart zu', o: [['Semikolon fehlt, Code kompiliert nicht', 'Syntaxfehler'], ['Division durch 0 während der Ausführung', 'Laufzeitfehler'], ['Programm läuft, rechnet aber falsch', 'Logischer Fehler']], e: 'Syntax: Compiler meldet. Laufzeit: Absturz/Exception. Logik: falsches Ergebnis, am schwersten zu finden.'},
    {q: 'Welcher Fehler wird vom Compiler **nicht** gefunden?', o: ['Logischer Fehler', 'Fehlende Klammer', 'Falsch geschriebenes Schlüsselwort', 'Fehlendes Semikolon'], a: 0, lv: 1, e: 'Logische Fehler sind syntaktisch korrekt. Nur Tests oder Debugging zeigen sie.'},
    {q: 'Welcher Fehler steckt hier? (soll die Summe 1..10 liefern)', c: `int summe = 0;
for (int i = 1; i < 10; i++) {
  summe += i;
}`, o: ['Off-by-one: i < 10 statt i <= 10, Ergebnis 45 statt 55', 'Syntaxfehler im for', 'Laufzeitfehler durch Überlauf', 'Kein Fehler'], a: 0, lv: 2, e: 'Die 10 fehlt: 1..9 = **45**. Klassischer **Off-by-one**-Fehler, ein logischer Fehler.'},
    {k: 'match', q: 'Ordne die Debugger-Befehle zu', o: [['Step Over', 'Nächste Zeile, Methodenaufruf als Ganzes'], ['Step Into', 'In die aufgerufene Methode hineinspringen'], ['Step Out', 'Aktuelle Methode zu Ende laufen lassen'], ['Continue', 'Bis zum nächsten Breakpoint laufen']], e: 'Grundbefehle jedes Debuggers (IDE: F8/F7/Shift+F8 bzw. F10/F11).'},
    {q: 'Was ist ein **Breakpoint**?', o: ['Haltepunkt, an dem das Programm im Debugger anhält', 'Ein Laufzeitfehler', 'Das Ende einer Schleife', 'Eine Exception-Klasse'], a: 0, lv: 1, e: 'Am Haltepunkt kann man Variablen inspizieren und schrittweise weitergehen.'},
    {q: 'Ein Fehler tritt nur bei der 500. Schleifenrunde auf. Welches Debugger-Werkzeug spart am meisten Zeit?', o: ['Bedingter Breakpoint (z. B. i == 500)', 'Step Into bei jeder Runde', 'Programm neu kompilieren', 'Mehr Kommentare schreiben'], a: 0, lv: 2, e: 'Ein **bedingter Breakpoint** hält nur an, wenn die Bedingung wahr ist.'},
    {q: 'Was zeigt ein **Stacktrace**?', o: ['Die Aufrufkette der Methoden bis zur Fehlerstelle', 'Den Inhalt des Arbeitsspeichers', 'Alle Variablenwerte', 'Die Versionsgeschichte'], a: 0, lv: 1, e: 'Er listet Methode, Klasse und Zeile jeder Aufrufebene. Oberste Zeile = Ort der Exception.'},
    {k: 'order', q: 'Bringe das systematische Vorgehen beim Debuggen in Reihenfolge', o: ['Fehler reproduzieren', 'Fehlerstelle eingrenzen', 'Ursache finden', 'Beheben', 'Erneut testen (Regressionstest)'], lv: 2, e: 'Erst reproduzierbar machen, sonst kann man die Korrektur nicht prüfen. Am Ende Tests erneut laufen lassen.'},
    {q: 'Was ist **Rubber Duck Debugging**?', o: ['Den Code Zeile für Zeile jemandem (oder einer Ente) erklären', 'Ein automatisches Testwerkzeug', 'Debuggen ohne Breakpoints im Produktivsystem', 'Ein Profiler'], a: 0, lv: 1, e: 'Beim lauten Erklären fällt der Denkfehler oft selbst auf.'},
    {q: 'Was passiert hier?', c: `String s = null;
System.out.println(s.length());`, o: ['NullPointerException zur Laufzeit', 'Ausgabe 0', 'Syntaxfehler', 'Ausgabe null'], a: 0, lv: 1, e: 'Methodenaufruf auf `null` ergibt eine **NullPointerException**, ein Laufzeitfehler.'},
    {k: 'tf', q: 'Logging (z. B. mit Log-Levels DEBUG/INFO/ERROR) ist besonders bei Fehlern im Produktivsystem hilfreich, wo kein Debugger angehängt werden kann.', a: true, lv: 2, e: 'Log-Dateien zeigen nachträglich, was passiert ist. Im Produktivsystem debuggt man selten interaktiv.'},
    {q: 'Was wird ausgegeben (Python)?', c: `werte = [3, 8, 2]
maxi = 0
for w in werte:
    if w < maxi:
        maxi = w
print(maxi)`, o: ['0', '8', '2', '3'], a: 0, lv: 2, e: 'Die Bedingung ist vertauscht (`<` statt `>`): kein Wert ist kleiner als 0, maxi bleibt **0**. Logischer Fehler.'},
    {q: 'Was ist das Ziel eines **Schreibtischtests**?', o: ['Code ohne Rechner von Hand mit Wertetabelle durchgehen', 'Die Oberfläche testen', 'Lasttests am Arbeitsplatz', 'Kompilieren auf einem Testrechner'], a: 0, lv: 1, e: 'Variablenwerte pro Schritt in einer **Trace-Tabelle** notieren. In AP2 sehr häufig verlangt.'},
    {k: 'num', q: 'Welchen Wert hat x am Ende?', c: `int x = 1;
for (int i = 0; i < 4; i++) {
  x = x * 2;
}`, a: 16, tol: 0, lv: 1, e: '1, 2, 4, 8, 16: viermal verdoppelt = **16**.'},
    {k: 'multi', q: 'Welche Hilfsmittel eignen sich zur Fehlersuche? (mehrere)', o: ['Debugger mit Watch-Ausdrücken', 'Log-Ausgaben', 'Unit-Tests', 'Code-Kommentare löschen'], a: [0, 1, 2], lv: 1, e: 'Kommentare löschen findet keinen Fehler. Watches, Logs und Tests helfen.'},
  ]},
  {id: 'eua-testfaelle', t: 'Testfälle', qs: [
    {q: 'Ein Feld akzeptiert ein Alter von 18 bis 65. Wie viele **Äquivalenzklassen** gibt es mindestens?', o: ['3 (zu klein, gültig, zu groß)', '1', '2', '48'], a: 0, lv: 1, e: 'Eine gültige Klasse 18..65 und zwei ungültige: < 18 und > 65.'},
    {k: 'multi', q: 'Gültig ist 18 bis 65. Welche Werte sind typische **Grenzwerte**? (mehrere)', o: ['17', '18', '65', '66', '40'], a: [0, 1, 2, 3], lv: 2, e: 'Grenzwertanalyse: direkt an und neben jeder Grenze (17/18, 65/66). 40 ist ein Repräsentant der gültigen Klasse.'},
    {q: 'Was ist der Kerngedanke der Äquivalenzklassenbildung?', o: ['Alle Werte einer Klasse verhalten sich gleich, ein Repräsentant genügt', 'Jeder mögliche Wert muss getestet werden', 'Nur Grenzen werden getestet', 'Der Code wird Zeile für Zeile geprüft'], a: 0, lv: 1, e: 'Das reduziert die Zahl der Testfälle stark, ohne Abdeckung zu verlieren.'},
    {k: 'match', q: 'Ordne die Testverfahren zu', o: [['Blackbox-Test', 'Testet gegen die Spezifikation, Code unbekannt'], ['Whitebox-Test', 'Testet anhand der Codestruktur'], ['Grenzwertanalyse', 'Werte an Klassengrenzen'], ['Anweisungsüberdeckung', 'Jede Anweisung mindestens einmal ausgeführt']], e: 'Äquivalenzklassen und Grenzwerte sind Blackbox, Überdeckungen (C0, C1) Whitebox.'},
    {q: 'Rabatt: unter 100 EUR 0 %, ab 100 EUR 5 %, ab 500 EUR 10 %. Welcher Testwertsatz deckt alle Grenzen am besten ab?', o: ['99,99 / 100 / 499,99 / 500', '50 / 300 / 800', '0 / 1000', '100 / 200 / 300'], a: 0, lv: 2, e: 'Je Grenze den Wert direkt davor und genau auf der Grenze. 50/300/800 sind nur Repräsentanten.'},
    {k: 'num', q: 'Wie viele Testfälle braucht man mindestens für **Zweigüberdeckung (C1)**?', c: `if (a > 0) {
  x = 1;
} else {
  x = 2;
}
if (b > 0) {
  y = 1;
}`, a: 2, tol: 0, lv: 3, e: 'Beide ifs haben je 2 Zweige. Testfall 1: a>0, b>0. Testfall 2: a<=0, b<=0. Mit **2** Fällen sind alle 4 Zweige durchlaufen.'},
    {k: 'tf', q: 'Volle **Anweisungsüberdeckung (C0)** garantiert, dass auch jeder Zweig durchlaufen wurde.', a: false, lv: 3, e: 'Ein `if` ohne else: C0 ist mit "Bedingung wahr" erfüllt, der leere false-Zweig fehlt. **C1 ist stärker als C0.**'},
    {q: 'Was gehört **nicht** zu einem vollständigen Testfall?', o: ['Name des Programmierers, der den Code geschrieben hat', 'Eingabewerte', 'Erwartetes Ergebnis', 'Vorbedingung'], a: 0, lv: 1, e: 'Testfall = ID, Vorbedingung, Eingabe, **erwartetes Ergebnis**, tatsächliches Ergebnis, Status.'},
    {k: 'gap', q: 'Ein Testfall vergleicht das tatsächliche Ergebnis mit dem ___ Ergebnis (Soll).', a: ['erwarteten', 'erwartete', 'Soll'], lv: 1, e: 'Ohne erwartetes Ergebnis kann man nicht entscheiden, ob der Test bestanden ist.'},
    {q: 'Eine PLZ muss genau 5 Ziffern haben. Welcher Testwert gehört zu einer **ungültigen** Klasse?', o: ['"1234"', '"10115"', '"80331"', '"01067"'], a: 0, lv: 1, e: 'Nur 4 Ziffern = zu kurz. Die anderen sind gültige Repräsentanten (auch mit führender 0).'},
    {k: 'order', q: 'Ordne die Teststufen (V-Modell) von unten nach oben', o: ['Komponententest (Unit)', 'Integrationstest', 'Systemtest', 'Abnahmetest'], lv: 2, e: 'Erst einzelne Einheiten, dann Zusammenspiel, dann Gesamtsystem, zuletzt Abnahme durch den Kunden.'},
    {q: 'Nach einer Fehlerkorrektur werden alle bestehenden Tests erneut ausgeführt. Wie heißt das?', o: ['Regressionstest', 'Abnahmetest', 'Smoke-Test', 'Lasttest'], a: 0, lv: 1, e: 'Der **Regressionstest** prüft, dass die Änderung nichts kaputt gemacht hat.'},
    {q: 'Wer führt den **Abnahmetest** typischerweise durch?', o: ['Der Auftraggeber / Fachanwender', 'Der Entwickler allein', 'Der Compiler', 'Der Datenbankadministrator'], a: 0, lv: 1, e: 'Der Kunde prüft gegen das **Lastenheft** und nimmt formal ab.'},
    {k: 'multi', q: 'Ein Feld erwartet eine Menge (ganze Zahl 1 bis 99). Welche gehören zu **ungültigen** Klassen? (mehrere)', o: ['0', '100', '"zwei"', 'leeres Feld', '50'], a: [0, 1, 2, 3], lv: 2, e: 'Zu klein, zu groß, falscher Typ, leer. 50 ist gültig.'},
    {q: 'Welche Testart misst das Verhalten bei 1000 gleichzeitigen Benutzern?', o: ['Lasttest', 'Unit-Test', 'Schreibtischtest', 'Grenzwerttest'], a: 0, lv: 1, e: 'Lasttest = nicht-funktionaler Test der Performance unter Last.'},
    {k: 'num', q: 'Gültig: 1 bis 10. Nach Grenzwertanalyse (je Grenze Wert davor und darauf, also 0, 1, 10, 11) plus ein Repräsentant der gültigen Klasse: wie viele Testwerte?', a: 5, tol: 0, lv: 2, e: '0, 1, 10, 11 und z. B. 5 = **5** Testwerte.'},
  ]},
  {id: 'eua-unittest', t: 'Unit-Tests', qs: [
    {q: 'Was testet ein **Unit-Test**?', o: ['Eine kleine Einheit (Methode/Klasse) isoliert', 'Das gesamte System mit Datenbank', 'Die Benutzeroberfläche', 'Die Netzwerkverbindung'], a: 0, lv: 1, e: 'Kleinste testbare Einheit, schnell und automatisch, Abhängigkeiten werden ersetzt (Mocks).'},
    {k: 'order', q: 'Ordne die Phasen eines Tests nach **AAA**', o: ['Arrange (vorbereiten)', 'Act (ausführen)', 'Assert (prüfen)'], lv: 1, e: 'Arrange-Act-Assert ist das Standardschema jedes Unit-Tests.'},
    {q: 'Welche Assertion ist hier richtig, damit der Test grün wird?', c: `@Test
void testBrutto() {
  Rechner r = new Rechner();
  double b = r.brutto(100.0); // 19 % MwSt
  assertEquals(___, b, 0.001);
}`, o: ['119.0', '19.0', '100.19', '81.0'], a: 0, lv: 1, e: '100 * 1,19 = **119**. Der dritte Parameter 0.001 ist die Toleranz für double-Vergleiche.'},
    {q: 'Warum gibt man bei `assertEquals(119.0, b, 0.001)` ein Delta an?', o: ['Gleitkommazahlen sind ungenau, exakter Vergleich kann fehlschlagen', 'Damit der Test schneller läuft', 'Das Delta ist die maximale Laufzeit', 'Pflicht bei allen Datentypen'], a: 0, lv: 2, e: '0.1 + 0.2 ist nicht exakt 0.3. Mit **Toleranz** vergleicht man double sicher.'},
    {q: 'Wie prüft man in JUnit 5, dass eine Methode eine Exception wirft?', o: ['assertThrows(IllegalArgumentException.class, () -> obj.m(-1))', 'assertEquals(Exception, obj.m(-1))', 'assertTrue(obj.m(-1))', 'try ohne catch im Test'], a: 0, lv: 2, e: '`assertThrows` erwartet den Exception-Typ und ein Lambda mit dem Aufruf.'},
    {k: 'match', q: 'Ordne die JUnit-5-Annotationen zu', o: [['@Test', 'Markiert eine Testmethode'], ['@BeforeEach', 'Läuft vor jedem Test'], ['@AfterEach', 'Läuft nach jedem Test'], ['@BeforeAll', 'Läuft einmal vor allen Tests']], e: '@BeforeEach eignet sich zum Anlegen frischer Testobjekte (Arrange).'},
    {q: 'Was ist ein **Mock**?', o: ['Ein Ersatzobjekt, das eine echte Abhängigkeit simuliert', 'Ein fehlgeschlagener Test', 'Ein Code-Kommentar', 'Ein Teil der Produktionsdatenbank'], a: 0, lv: 2, e: 'Mocks ersetzen z. B. Datenbank oder Webservice, damit der Unit-Test isoliert und schnell bleibt.'},
    {k: 'order', q: 'Ordne den TDD-Zyklus', o: ['Red: fehlschlagenden Test schreiben', 'Green: minimalen Code schreiben, bis der Test läuft', 'Refactor: Code verbessern, Tests bleiben grün'], lv: 2, e: '**Test Driven Development**: Test zuerst. Red, Green, Refactor.'},
    {k: 'tf', q: 'Bei TDD wird der Test geschrieben, **bevor** der Produktivcode existiert.', a: true, lv: 1, e: 'Deshalb ist der erste Lauf rot (Red).'},
    {k: 'multi', q: 'Welche Eigenschaften sollte ein guter Unit-Test haben (FIRST)? (mehrere)', o: ['Fast (schnell)', 'Independent (unabhängig)', 'Repeatable (wiederholbar)', 'Abhängig von der Testreihenfolge'], a: [0, 1, 2], lv: 2, e: 'FIRST: Fast, Independent, Repeatable, Self-validating, Timely. Reihenfolgeabhängigkeit ist ein Fehler.'},
    {q: 'Welcher Test ist fehlerhaft formuliert?', c: `@Test
void testMax() {
  int m = Util.max(3, 7);
  System.out.println(m);
}`, o: ['Er enthält keine Assertion, er kann nie fehlschlagen', 'Er ruft die falsche Methode', 'Annotation fehlt', 'Er ist korrekt'], a: 0, lv: 2, e: 'Ohne `assertEquals(7, m)` prüft der Test nichts (nicht **self-validating**).'},
    {k: 'gap', q: 'In Python heißt das eingebaute Testframework ___ (Klasse TestCase, Methoden assertEqual).', a: ['unittest'], lv: 2, e: '`import unittest`, Testklasse erbt von `unittest.TestCase`. Alternativ pytest.'},
    {q: 'Was bedeutet eine **Testabdeckung** (Code Coverage) von 80 %?', o: ['80 % der Codezeilen/Zweige wurden durch Tests ausgeführt', '80 % der Tests sind grün', 'Der Code ist zu 80 % fehlerfrei', '80 % der Anforderungen sind umgesetzt'], a: 0, lv: 2, e: 'Coverage misst nur, was **ausgeführt** wurde, nicht ob die Assertions sinnvoll sind.'},
    {q: 'Wo laufen Unit-Tests idealerweise automatisch bei jedem Commit?', o: ['In der CI-Pipeline (Continuous Integration)', 'Nur beim Kunden', 'Im Produktivsystem', 'Gar nicht, nur manuell'], a: 0, lv: 1, e: 'CI-Server (z. B. GitHub Actions, Jenkins) bauen und testen jede Änderung.'},
    {k: 'tf', q: '`assertEquals(erwartet, tatsaechlich)` – in JUnit steht der **erwartete** Wert zuerst.', a: true, lv: 2, e: 'Vertauscht funktioniert der Test zwar, aber die Fehlermeldung ("expected X but was Y") wird irreführend.'},
  ]},
  {id: 'eua-dateien', t: 'Dateiverarbeitung', qs: [
    {k: 'order', q: 'Bringe die Schritte der Dateiverarbeitung in Reihenfolge', o: ['Datei öffnen', 'Zeilen lesen / schreiben', 'Datei schließen'], lv: 1, e: 'Schließen gibt Ressourcen frei und schreibt Puffer. Am besten automatisch (try-with-resources / with).'},
    {q: 'Was bewirkt der Python-Modus `"a"` bei `open("log.txt", "a")`?', o: ['Anhängen ans Dateiende', 'Datei überschreiben', 'Nur lesen', 'Binär lesen'], a: 0, lv: 1, e: '`r` lesen, `w` schreiben (überschreibt!), `a` anhängen (append).'},
    {q: 'Warum ist `with open(...) as f:` in Python empfehlenswert?', o: ['Die Datei wird automatisch geschlossen, auch bei Exceptions', 'Es liest schneller', 'Es verschlüsselt die Datei', 'Es ist die einzige Möglichkeit zu lesen'], a: 0, lv: 2, e: 'Kontextmanager = Pendant zu Javas **try-with-resources**.'},
    {q: 'Wie viele Zeilen werden ausgegeben?', c: `# datei.csv:
# id;name;ort
# 1;Anna;Köln
# 2;Ben;Bonn
# 3;Cem;Köln
with open("datei.csv") as f:
    next(f)            # Kopfzeile überspringen
    for z in f:
        teile = z.strip().split(";")
        if teile[2] == "Köln":
            print(teile[1])`, o: ['2', '3', '1', '4'], a: 0, lv: 2, e: 'Kopfzeile übersprungen, Ort Köln: Anna und Cem = **2** Ausgaben.'},
    {k: 'gap', q: 'Beim Zerlegen einer CSV-Zeile in Felder nutzt man in Python/Java die Methode ___.', a: ['split'], lv: 1, e: '`zeile.split(";")` liefert eine Liste/Array der Felder.'},
    {q: 'Was ist ein **Gruppenwechsel**?', o: ['Verarbeitung einer nach einem Schlüssel sortierten Datei mit Zwischensummen bei Schlüsseländerung', 'Wechsel der Benutzergruppe im Betriebssystem', 'Das Umbenennen einer Datei', 'Ein Sortierverfahren'], a: 0, lv: 2, e: 'Voraussetzung: Daten sind **nach dem Gruppenschlüssel sortiert**. Wechselt der Schlüssel, wird die Gruppensumme ausgegeben.'},
    {q: 'Was ist Voraussetzung für den Gruppenwechsel-Algorithmus?', o: ['Die Datensätze sind nach dem Gruppierungsmerkmal sortiert', 'Die Datei ist im JSON-Format', 'Die Datei hat weniger als 100 Zeilen', 'Jeder Schlüssel kommt nur einmal vor'], a: 0, lv: 2, e: 'Unsortiert würde dieselbe Gruppe mehrfach erscheinen und die Summen wären falsch.'},
    {k: 'num', q: 'Gruppenwechsel nach Filiale. Welche Zwischensumme wird für Filiale B ausgegeben?', c: `Filiale;Umsatz
A;100
A;50
B;200
B;30
B;70
C;10`, a: 300, tol: 0, lv: 2, e: 'B: 200 + 30 + 70 = **300**.'},
    {k: 'num', q: 'Wie viele Gruppensummen werden bei obigem Beispiel (A, A, B, B, B, C) ausgegeben?', a: 3, tol: 0, lv: 1, e: 'Drei Gruppen A, B, C. Die letzte Gruppe muss **nach Dateiende** noch ausgegeben werden (häufiger Fehler!).'},
    {k: 'tf', q: 'Beim Gruppenwechsel darf man die Ausgabe der letzten Gruppe nach dem Schleifenende vergessen, da sie automatisch erfolgt.', a: false, lv: 2, e: 'Die letzte Gruppe hat keinen Folgewechsel, sie muss **nach der Schleife** extra ausgegeben werden.'},
    {q: 'Was passiert bei `open("daten.txt", "w")`, wenn die Datei bereits existiert?', o: ['Der Inhalt wird gelöscht und neu geschrieben', 'Es wird angehängt', 'Es gibt immer eine Exception', 'Die Datei wird nur gelesen'], a: 0, lv: 1, e: 'Modus `w` **überschreibt**. Für Anhängen `a` verwenden.'},
    {q: 'Welche Exception tritt in Java auf, wenn eine zu lesende Datei nicht existiert?', o: ['FileNotFoundException', 'NullPointerException', 'ArithmeticException', 'ClassCastException'], a: 0, lv: 1, e: 'Eine checked Exception (Unterklasse von IOException).'},
    {k: 'match', q: 'Ordne die Java-Klassen zu', o: [['BufferedReader', 'Zeilenweise lesen (readLine)'], ['FileWriter', 'Zeichen in eine Datei schreiben'], ['try-with-resources', 'Automatisches Schließen']], e: '`readLine()` liefert `null` am Dateiende.'},
    {q: 'Was liefert `BufferedReader.readLine()` am Dateiende?', o: ['null', '""', '-1', 'EOF-Exception'], a: 0, lv: 2, e: 'Typische Schleife: `while ((zeile = br.readLine()) != null)`.'},
    {q: 'Welche Zugriffsart erlaubt es, direkt zum 500. Datensatz zu springen?', o: ['Wahlfreier (direkter) Zugriff', 'Sequenzieller Zugriff', 'Append-Modus', 'Nur-Lesen-Modus'], a: 0, lv: 2, e: 'Sequenziell = der Reihe nach lesen. Wahlfrei (z. B. RandomAccessFile, seek) = Position direkt anspringen.'},
  ]},
  {id: 'eua-formate', t: 'Datenformate', qs: [
    {q: 'Was ist an diesem JSON **ungültig**?', c: `{
  'name': 'Anna',
  "alter": 30
}`, o: ['Schlüssel und Strings müssen in doppelten Anführungszeichen stehen', 'Zahlen müssen in Anführungszeichen', 'Es fehlt ein Wurzelelement', 'Nichts'], a: 0, lv: 2, e: 'JSON erlaubt **nur doppelte Anführungszeichen**. Einfache gehen in JavaScript, nicht in JSON.'},
    {k: 'num', q: 'Wie viele Elemente hat das Array "kurse"?', c: `{
  "name": "Ben",
  "kurse": ["SQL", "Java", "Netze"],
  "aktiv": true
}`, a: 3, tol: 0, lv: 1, e: 'Das Array in eckigen Klammern enthält **3** Strings.'},
    {q: 'Was ist an diesem JSON falsch?', c: `{
  "id": 1,
  "tags": ["a", "b"],
}`, o: ['Komma nach dem letzten Element (trailing comma)', 'Arrays sind nicht erlaubt', 'Zahlen müssen Strings sein', 'Nichts'], a: 0, lv: 2, e: 'JSON verbietet ein **abschließendes Komma**.'},
    {k: 'multi', q: 'Welche Datentypen kennt JSON? (mehrere)', o: ['String', 'Number', 'Boolean', 'null', 'Date'], a: [0, 1, 2, 3], lv: 2, e: 'Plus Objekt und Array. Ein Datum gibt es nicht, man speichert es als String (z. B. ISO 8601).'},
    {q: 'Welcher Wert liefert `daten.kunde.adresse.ort`?', c: `{"kunde": {"name": "Cem",
  "adresse": {"plz": "50667", "ort": "Köln"}}}`, o: ['"Köln"', '"50667"', '"Cem"', 'undefined'], a: 0, lv: 1, e: 'Verschachtelte Objekte werden mit Punktnotation durchlaufen.'},
    {q: 'Was ist an diesem XML **nicht wohlgeformt**?', c: `<kunde>
  <name>Anna</Name>
  <ort>Bonn</ort>
</kunde>`, o: ['Groß-/Kleinschreibung: <name> wird mit </Name> geschlossen', 'Es fehlen Attribute', 'Kein DTD vorhanden', 'Nichts'], a: 0, lv: 2, e: 'XML ist **case-sensitive**: Start- und Endtag müssen exakt gleich heißen.'},
    {q: 'Was ist an diesem XML falsch?', c: `<a><b>Text</a></b>`, o: ['Falsche Verschachtelung der Tags', 'Text in Tags ist verboten', 'Tags dürfen nur einen Buchstaben haben nicht', 'Nichts'], a: 0, lv: 2, e: 'Tags müssen sauber verschachtelt sein: zuerst `</b>`, dann `</a>`.'},
    {k: 'match', q: 'Ordne die Begriffe zu', o: [['Wohlgeformt', 'Hält die XML-Syntaxregeln ein'], ['Gültig (valid)', 'Entspricht zusätzlich einem Schema (XSD/DTD)'], ['XSD', 'Schema-Sprache für XML'], ['JSON Schema', 'Validierung von JSON-Strukturen']], e: 'Jedes gültige Dokument ist wohlgeformt, aber nicht umgekehrt.'},
    {k: 'tf', q: 'Ein XML-Dokument muss genau **ein Wurzelelement** haben.', a: true, lv: 1, e: 'Alle anderen Elemente liegen darin.'},
    {k: 'num', q: 'Wie viele **Datensätze** (ohne Kopfzeile) enthält die CSV?', c: `id;name;preis
1;Maus;19,99
2;Tastatur;49,00
3;Monitor;199,00`, a: 3, tol: 0, lv: 1, e: 'Erste Zeile ist die Kopfzeile, danach **3** Datensätze.'},
    {q: 'Warum nutzt man in deutschen CSV-Dateien oft `;` statt `,` als Trenner?', o: ['Das Komma ist das Dezimaltrennzeichen', 'Kommas sind in CSV verboten', 'Semikolon ist schneller', 'Excel kennt keine Kommas'], a: 0, lv: 2, e: '19,99 würde sonst in zwei Felder zerfallen.'},
    {q: 'Welches Format ist für eine REST-API heute am üblichsten?', o: ['JSON', 'CSV', 'XML mit DTD', 'Binärformat ohne Struktur'], a: 0, lv: 1, e: 'JSON ist kompakt, gut lesbar und in JavaScript direkt nutzbar.'},
    {q: 'Welcher Vorteil spricht für **XML** gegenüber JSON?', o: ['Attribute, Namensräume und strenge Schema-Validierung (XSD)', 'Kürzer und kompakter', 'Kennt den Typ Boolean nativ besser', 'Wird nur von Browsern verstanden'], a: 0, lv: 3, e: 'XML ist ausführlicher, aber mächtiger bei Validierung und Namensräumen (z. B. SOAP, Rechnungsformate).'},
    {k: 'gap', q: 'In JSON steht ein Objekt in geschweiften Klammern, ein Array in ___ Klammern.', a: ['eckigen', 'eckige', '[]'], lv: 1, e: '`{ }` Objekt (Schlüssel-Wert), `[ ]` Array (geordnete Liste).'},
    {q: 'Was ist der JSON-Wert von `aktiv`?', c: `{"aktiv": "false"}`, o: ['Ein String, kein Boolean', 'Boolean false', 'null', 'Ungültiges JSON'], a: 0, lv: 3, e: 'Durch die Anführungszeichen ist es der **String** "false". Ein Boolean steht ohne Anführungszeichen.'},
    {k: 'match', q: 'Ordne die Formate zu', o: [['CSV', 'Tabellarisch, Trennzeichen'], ['JSON', 'Schlüssel-Wert, Arrays, kompakt'], ['XML', 'Tags, Attribute, Schemas'], ['YAML', 'Einrückung statt Klammern, Konfigurationen']], e: 'Typische Einsatzgebiete: CSV Export/Import, JSON APIs, XML Austauschformate, YAML Config.'},
  ]},
  {id: 'eua-html', t: 'HTML', qs: [
    {q: 'Welches Element ist die größte Überschrift?', o: ['<h1>', '<h6>', '<head>', '<header>'], a: 0, lv: 1, e: '`h1` bis `h6`, h1 am wichtigsten. `<head>` enthält Metadaten, `<header>` ist ein Seitenbereich.'},
    {q: 'Was gehört in den `<head>`?', o: ['<title>, <meta>, <link> zu CSS', 'Sichtbare Überschriften und Absätze', 'Tabellen', 'Formulare'], a: 0, lv: 1, e: 'Sichtbarer Inhalt steht im `<body>`.'},
    {k: 'multi', q: 'Welche Elemente sind **semantische** HTML5-Elemente? (mehrere)', o: ['<nav>', '<article>', '<footer>', '<div>', '<span>'], a: [0, 1, 2], lv: 2, e: 'div und span sind neutrale Container ohne Bedeutung.'},
    {q: 'Welches Attribut sendet Formulardaten **nicht** sichtbar in der URL?', c: `<form action="/login" method="___">`, o: ['post', 'get', 'put', 'url'], a: 0, lv: 1, e: '`GET` hängt Daten an die URL (`?user=...`), `POST` überträgt sie im Request-Body. Für Passwörter POST + HTTPS.'},
    {q: 'Wofür steht das `alt`-Attribut bei `<img>`?', o: ['Alternativtext für Screenreader und wenn das Bild nicht lädt', 'Höhe des Bildes', 'Bildquelle', 'Animation'], a: 0, lv: 1, e: 'Wichtig für **Barrierefreiheit** (BITV/WCAG). Quelle ist `src`.'},
    {k: 'num', q: 'Wie viele **Datenzellen** (td) hat die Tabelle?', c: `<table>
  <tr><th>Name</th><th>Ort</th></tr>
  <tr><td>Anna</td><td>Köln</td></tr>
  <tr><td>Ben</td><td>Bonn</td></tr>
  <tr><td>Cem</td><td>Ulm</td></tr>
</table>`, a: 6, tol: 0, lv: 1, e: '3 Datenzeilen mal 2 Spalten = **6** td. Die th sind Kopfzellen.'},
    {k: 'match', q: 'Ordne die Tabellen-Tags zu', o: [['<tr>', 'Tabellenzeile'], ['<td>', 'Datenzelle'], ['<th>', 'Kopfzelle'], ['colspan', 'Zelle über mehrere Spalten']], e: 'rowspan verbindet entsprechend Zeilen.'},
    {q: 'Wie verknüpft man ein `<label>` korrekt mit einem Eingabefeld?', c: `<label for="mail">E-Mail</label>
<input type="email" id="___">`, o: ['mail', 'E-Mail', 'label', 'for'], a: 0, lv: 2, e: 'Das `for` des Labels muss der **id** des inputs entsprechen. Klick auf das Label fokussiert dann das Feld.'},
    {k: 'multi', q: 'Welche Eingabevalidierungen bietet HTML5 direkt? (mehrere)', o: ['required', 'type="email"', 'min / max bei type="number"', 'Schutz vor SQL-Injection'], a: [0, 1, 2], lv: 2, e: 'Client-Validierung ist Komfort, aber umgehbar. **Serverseitig** muss immer neu geprüft werden.'},
    {k: 'tf', q: 'HTML5-Validierung mit `required` reicht als Schutz aus, eine serverseitige Prüfung ist dann nicht mehr nötig.', a: false, lv: 2, e: 'Ein Angreifer kann Requests ohne Browser senden. Serverseitig validieren ist Pflicht.'},
    {q: 'Welcher Input-Typ zeigt eine Auswahl, bei der genau **eine** von mehreren Optionen wählbar ist?', o: ['radio', 'checkbox', 'text', 'range'], a: 0, lv: 1, e: 'Radiobuttons mit gleichem `name` schließen sich gegenseitig aus. Checkboxen erlauben mehrere.'},
    {k: 'gap', q: 'Ein Link wird mit dem Element `<a>` und dem Attribut ___ für das Ziel erstellt.', a: ['href'], lv: 1, e: '`<a href="https://...">Text</a>`.'},
    {q: 'Was bewirkt `<!DOCTYPE html>`?', o: ['Teilt dem Browser mit, dass es ein HTML5-Dokument ist', 'Lädt JavaScript', 'Definiert den Zeichensatz', 'Erstellt den body'], a: 0, lv: 1, e: 'Verhindert den Quirks-Modus. Zeichensatz: `<meta charset="utf-8">`.'},
    {q: 'Was ist der Unterschied zwischen `<div>` und `<span>`?', o: ['div ist ein Block-Element, span ein Inline-Element', 'span ist semantisch, div nicht', 'div gibt es nur in HTML4', 'Kein Unterschied'], a: 0, lv: 2, e: 'div beginnt eine neue Zeile und nimmt die volle Breite, span fließt im Text.'},
    {k: 'order', q: 'Ordne den Grundaufbau eines HTML-Dokuments', o: ['<!DOCTYPE html>', '<html>', '<head> mit <title>', '<body> mit Inhalt'], lv: 1, e: 'head vor body, beide innerhalb von html.'},
    {q: 'Welches Element eignet sich für eine Auswahlliste (Dropdown)?', o: ['<select> mit <option>', '<list>', '<dropdown>', '<input type="list">'], a: 0, lv: 1, e: '`<select name="land"><option>DE</option>...</select>`.'},
  ]},
  {id: 'eua-css', t: 'CSS', qs: [
    {q: 'Welcher Selektor wählt das Element mit `id="kopf"`?', o: ['#kopf', '.kopf', 'kopf', '*kopf'], a: 0, lv: 1, e: '`#` = ID, `.` = Klasse, ohne Zeichen = Elementtyp.'},
    {q: 'Welche Farbe hat der Text?', c: `/* CSS */
p { color: blue; }
.hinweis { color: green; }
#info { color: red; }

<!-- HTML -->
<p class="hinweis" id="info">Text</p>`, o: ['rot', 'grün', 'blau', 'schwarz'], a: 0, lv: 2, e: '**Spezifität**: ID (1,0,0) schlägt Klasse (0,1,0) schlägt Element (0,0,1).'},
    {q: 'Welche Farbe hat der Text?', c: `.a { color: green; }
.a { color: orange; }

<p class="a">Text</p>`, o: ['orange', 'grün', 'schwarz', 'gemischt'], a: 0, lv: 1, e: 'Gleiche Spezifität: die **später** definierte Regel gewinnt (Kaskade).'},
    {q: 'Welche Farbe hat der Text?', c: `#x { color: red; }
p { color: blue !important; }

<p id="x">Text</p>`, o: ['blau', 'rot', 'schwarz', 'violett'], a: 0, lv: 3, e: '`!important` überstimmt normale Spezifität, sogar eine ID. Sparsam einsetzen.'},
    {k: 'num', q: 'Box-Modell mit `box-sizing: content-box`. Welche **Gesamtbreite** in px nimmt die Box ein?', c: `.box {
  width: 200px;
  padding: 10px;
  border: 5px solid black;
  margin: 20px;
}`, a: 270, tol: 0, u: 'px', lv: 3, e: '200 + 2·10 Padding + 2·5 Border = 230 sichtbar, plus 2·20 Margin = **270** px Platzbedarf.'},
    {k: 'num', q: 'Gleiche Box, aber `box-sizing: border-box`. Wie breit ist der **Inhaltsbereich** in px?', c: `.box {
  box-sizing: border-box;
  width: 200px;
  padding: 10px;
  border: 5px solid black;
}`, a: 170, tol: 0, u: 'px', lv: 3, e: 'Bei border-box enthält width Padding und Border: 200 − 20 − 10 = **170** px.'},
    {k: 'order', q: 'Ordne das Box-Modell von innen nach außen', o: ['Content', 'Padding', 'Border', 'Margin'], lv: 1, e: 'Padding = Innenabstand, Margin = Außenabstand.'},
    {k: 'match', q: 'Ordne die Selektoren zu', o: [['div p', 'Alle p irgendwo innerhalb von div'], ['div > p', 'Nur direkte Kind-p von div'], ['a:hover', 'Link beim Überfahren mit der Maus'], ['p, h1', 'Alle p und alle h1']], e: 'Leerzeichen = Nachfahre, > = direktes Kind, Komma = Gruppierung.'},
    {q: 'Was bewirkt diese Media Query?', c: `@media (max-width: 600px) {
  nav { display: none; }
}`, o: ['Navigation wird auf Bildschirmen bis 600px ausgeblendet', 'Navigation erscheint nur ab 600px nicht', 'Navigation wird 600px breit', 'Ein Fehler, ungültig'], a: 0, lv: 2, e: 'Responsive Design: Regel gilt nur, wenn der Viewport **höchstens 600px** breit ist.'},
    {q: 'Mit welcher Eigenschaft ordnet man Kinder eines Containers flexibel in einer Zeile an?', o: ['display: flex', 'position: absolute', 'float: center', 'align: row'], a: 0, lv: 1, e: 'Flexbox: `justify-content` (Hauptachse), `align-items` (Querachse).'},
    {k: 'tf', q: 'Ein **externes** Stylesheet wird mit `<link rel="stylesheet" href="style.css">` im head eingebunden.', a: true, lv: 1, e: 'Alternativ intern im `<style>`-Tag oder inline per `style`-Attribut.'},
    {q: 'Welche Einbindungsart hat die **höchste** Priorität (ohne !important)?', o: ['Inline-Style (style-Attribut)', 'Externes Stylesheet', 'Internes <style>', 'Browser-Standard'], a: 0, lv: 2, e: 'Inline-Styles haben die höchste Spezifität, sind aber schlecht wartbar.'},
    {q: 'Was ist der Unterschied zwischen `display: none` und `visibility: hidden`?', o: ['none entfernt das Element aus dem Layout, hidden lässt den Platz frei', 'Beide sind identisch', 'hidden löscht das Element aus dem DOM', 'none macht es nur transparent'], a: 0, lv: 2, e: 'Bei `visibility: hidden` bleibt der Platz belegt.'},
    {k: 'gap', q: 'Die relative Einheit ___ bezieht sich auf die Schriftgröße des Wurzelelements (html).', a: ['rem'], lv: 2, e: '`em` bezieht sich auf das Elternelement, `rem` auf root. Gut für skalierbare Layouts.'},
    {k: 'multi', q: 'Welche Selektoren treffen `<li class="neu aktiv">` innerhalb von `<ul id="menu">`? (mehrere)', o: ['#menu li', '.neu.aktiv', 'ul > li', '#neu'], a: [0, 1, 2], lv: 3, e: '`.neu.aktiv` (ohne Leerzeichen) = beide Klassen am selben Element. `#neu` sucht eine ID.'},
    {q: 'Welche Einheit macht ein Layout relativ zur Viewport-Breite?', o: ['vw', 'px', 'pt', 'cm'], a: 0, lv: 2, e: '1vw = 1 % der Viewport-Breite. px ist absolut.'},
  ]},
  {id: 'eua-js', t: 'JavaScript', qs: [
    {q: 'Was ergibt `"5" + 3` in JavaScript?', o: ['"53"', '8', 'NaN', 'Fehler'], a: 0, lv: 2, e: 'Bei `+` mit einem String wird **verkettet**. Dagegen `"5" - 3` = 2 (numerische Umwandlung).'},
    {q: 'Was ergibt `"5" - 3`?', o: ['2', '"53"', 'NaN', '"2"'], a: 0, lv: 2, e: '`-` ist nur numerisch definiert, der String wird in eine Zahl umgewandelt.'},
    {q: 'Welcher Vergleich liefert `false`?', o: ['5 === "5"', '5 == "5"', '0 == false', 'null == undefined'], a: 0, lv: 2, e: '`===` prüft **Wert und Typ** ohne Umwandlung. Number ist nicht String.'},
    {k: 'match', q: 'Ordne die Variablendeklarationen zu', o: [['const', 'Blockweit, nicht neu zuweisbar'], ['let', 'Blockweit, neu zuweisbar'], ['var', 'Funktionsweit, veraltet']], e: 'Moderner Stil: standardmäßig const, sonst let.'},
    {q: 'Was gibt der Code aus?', c: `const zahlen = [1, 2, 3, 4];
const r = zahlen.filter(x => x % 2 === 0)
                .map(x => x * 10);
console.log(r);`, o: ['[20, 40]', '[10, 20, 30, 40]', '[2, 4]', '[10, 30]'], a: 0, lv: 2, e: 'filter behält gerade (2, 4), map multipliziert mit 10: **[20, 40]**.'},
    {k: 'num', q: 'Welchen Wert hat s?', c: `const preise = [10, 20, 30];
const s = preise.reduce((sum, p) => sum + p, 0);`, a: 60, tol: 0, lv: 2, e: '`reduce` summiert von Startwert 0: 10 + 20 + 30 = **60**.'},
    {q: 'Was macht `document.getElementById("ausgabe").textContent = "Hallo";`?', o: ['Setzt den Text des Elements mit id ausgabe', 'Erzeugt ein neues Element', 'Liest eine Datei', 'Sendet einen HTTP-Request'], a: 0, lv: 1, e: 'DOM-Manipulation. `textContent` setzt reinen Text, `innerHTML` interpretiert HTML.'},
    {q: 'Warum ist `element.innerHTML = benutzerEingabe` gefährlich?', o: ['Cross-Site-Scripting (XSS): eingeschleustes Script wird ausgeführt', 'Es ist zu langsam', 'Es löscht die Seite', 'SQL-Injection in der Datenbank'], a: 0, lv: 2, e: 'Unbereinigte Eingaben als HTML einfügen öffnet **XSS**. Besser `textContent` oder escapen.'},
    {q: 'Wie reagiert man auf einen Klick auf einen Button?', o: ["btn.addEventListener('click', funktion)", 'btn.click = true', 'btn.onClickNow()', 'window.click(btn)'], a: 0, lv: 1, e: 'Event-Listener registrieren eine Callback-Funktion für ein Ereignis.'},
    {k: 'order', q: 'In welcher Reihenfolge erscheinen die Ausgaben?', c: `console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");`, o: ['A', 'C', 'B'], lv: 3, e: 'setTimeout-Callbacks kommen in die **Event-Queue** und laufen erst, wenn der aktuelle Code fertig ist, auch bei 0 ms.'},
    {q: 'Wofür steht `await` bei `const res = await fetch(url);`?', o: ['Wartet auf das Ergebnis des Promise, ohne den Browser zu blockieren', 'Blockiert den ganzen Browser', 'Startet einen neuen Thread', 'Bricht den Request ab'], a: 0, lv: 2, e: '`await` geht nur in `async`-Funktionen und pausiert diese, bis das Promise erfüllt ist.'},
    {k: 'tf', q: 'JavaScript läuft ausschließlich im Browser.', a: false, lv: 1, e: 'Mit **Node.js** auch serverseitig.'},
    {q: 'Was gibt der Code aus?', c: `let x = 10;
if (true) {
  let x = 20;
}
console.log(x);`, o: ['10', '20', 'undefined', 'Fehler'], a: 0, lv: 3, e: '`let` ist **blockweit**: das innere x ist eine eigene Variable. Mit `var` wäre es 20.'},
    {k: 'gap', q: 'Ein JSON-String wird in JavaScript mit `JSON.___(text)` in ein Objekt umgewandelt.', a: ['parse'], lv: 2, e: 'Umgekehrt: `JSON.stringify(obj)` erzeugt einen String.'},
    {q: 'Was ist `typeof null`?', o: ['"object"', '"null"', '"undefined"', '"number"'], a: 0, lv: 3, e: 'Ein historischer Fehler in JavaScript, der aus Kompatibilitätsgründen geblieben ist.'},
    {k: 'num', q: 'Wie lang ist das Array am Ende?', c: `const a = [1, 2, 3];
a.push(4);
a.push(5);
a.pop();`, a: 4, tol: 0, lv: 1, e: '3 + 2 − 1 = **4** (pop entfernt das letzte Element).'},
  ]},
  {id: 'eua-webapi', t: 'Web-APIs / REST', qs: [
    {k: 'match', q: 'Ordne die HTTP-Methoden zu', o: [['GET', 'Ressource lesen'], ['POST', 'Neue Ressource anlegen'], ['PUT', 'Ressource vollständig ersetzen'], ['PATCH', 'Ressource teilweise ändern'], ['DELETE', 'Ressource löschen']], e: 'CRUD: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE.'},
    {q: 'Ein Client legt einen neuen Kunden an und erhält Erfolg. Welcher Statuscode ist am passendsten?', o: ['201 Created', '200 OK', '204 No Content', '302 Found'], a: 0, lv: 2, e: '**201 Created** nach erfolgreichem POST, oft mit Location-Header.'},
    {k: 'match', q: 'Ordne die Statuscodes zu', o: [['404', 'Ressource nicht gefunden'], ['401', 'Nicht authentifiziert'], ['403', 'Authentifiziert, aber keine Berechtigung'], ['500', 'Interner Serverfehler']], e: '4xx = Fehler des Clients, 5xx = Fehler des Servers.'},
    {q: 'Was bedeutet ein Statuscode der Klasse **4xx**?', o: ['Fehler auf Client-Seite', 'Erfolg', 'Weiterleitung', 'Serverfehler'], a: 0, lv: 1, e: '1xx Info, 2xx Erfolg, 3xx Umleitung, 4xx Client-Fehler, 5xx Server-Fehler.'},
    {q: 'Welcher Request ist **RESTful**, um den Kunden 42 zu löschen?', o: ['DELETE /kunden/42', 'GET /deleteKunde?id=42', 'POST /kunden/42/loeschen', 'GET /kunden/delete/42'], a: 0, lv: 2, e: 'REST: **Substantive** in der URL (Ressource), die Aktion steckt in der HTTP-Methode.'},
    {k: 'tf', q: 'REST ist **zustandslos**: jeder Request enthält alle nötigen Informationen, der Server speichert keine Sitzung.', a: true, lv: 2, e: 'Deshalb wird z. B. ein Token bei jedem Request mitgeschickt.'},
    {k: 'multi', q: 'Welche HTTP-Methoden sind **idempotent** (mehrfach ausgeführt = gleiches Ergebnis)? (mehrere)', o: ['GET', 'PUT', 'DELETE', 'POST'], a: [0, 1, 2], lv: 3, e: 'POST zweimal legt zwei Ressourcen an, also nicht idempotent.'},
    {q: 'Wie wird ein Bearer-Token typischerweise übertragen?', o: ['Im Header Authorization: Bearer <token>', 'Als Teil der URL', 'Im HTML-Body der Antwort', 'Über einen Cookie namens token immer'], a: 0, lv: 2, e: 'Der **Authorization-Header**. In der URL würde es in Logs landen.'},
    {q: 'Welcher Header gibt an, dass der Body JSON enthält?', o: ['Content-Type: application/json', 'Accept-Language: json', 'Host: json', 'Server: application/json'], a: 0, lv: 1, e: '`Accept` sagt, was der Client empfangen möchte, `Content-Type`, was gesendet wird.'},
    {q: 'Was gibt der Code aus, wenn der Server mit 404 antwortet?', c: `const res = await fetch("/api/kunden/99");
if (!res.ok) {
  console.log("Fehler " + res.status);
} else {
  console.log(await res.json());
}`, o: ['Fehler 404', 'Eine Exception, fetch wirft bei 404', 'Das JSON-Objekt', 'undefined'], a: 0, lv: 3, e: '`fetch` wirft nur bei Netzwerkfehlern. Bei 404 ist `res.ok` false (ok nur bei 200-299).'},
    {k: 'gap', q: 'Mit ___ (Cross-Origin Resource Sharing) erlaubt ein Server Anfragen von fremden Domains.', a: ['CORS'], lv: 2, e: 'Der Server setzt z. B. `Access-Control-Allow-Origin`.'},
    {q: 'Was unterscheidet SOAP von REST?', o: ['SOAP nutzt XML-Nachrichten mit festem Umschlag (Envelope) und WSDL', 'SOAP ist immer zustandslos, REST nie', 'REST funktioniert nur mit XML', 'Kein Unterschied'], a: 0, lv: 2, e: 'SOAP ist ein strenges Protokoll, REST ein Architekturstil, meist mit JSON.'},
    {k: 'order', q: 'Ordne die Schritte eines REST-Aufrufs', o: ['Client sendet Request (Methode, URL, Header, Body)', 'Server verarbeitet und greift auf Daten zu', 'Server sendet Response mit Statuscode und Body', 'Client wertet Statuscode und Daten aus'], lv: 1, e: 'Request-Response-Prinzip über HTTP.'},
    {q: 'Welche URL filtert Kunden nach Ort im REST-Stil am üblichsten?', o: ['GET /kunden?ort=Koeln', 'POST /filterKunden', 'GET /kunden/filter/ort/Koeln/get', 'DELETE /kunden?ort=Koeln'], a: 0, lv: 2, e: 'Filter, Sortierung und Paginierung als **Query-Parameter**.'},
    {q: 'Was bedeutet Statuscode **204**?', o: ['Erfolg, aber kein Inhalt im Body', 'Nicht gefunden', 'Weitergeleitet', 'Zu viele Anfragen'], a: 0, lv: 2, e: 'Typisch nach DELETE oder PUT ohne Rückgabedaten.'},
    {k: 'tf', q: 'Eine API sollte API-Schlüssel und Tokens nur über HTTPS übertragen.', a: true, lv: 1, e: 'Über HTTP wären sie im Klartext mitlesbar.'},
  ]},
