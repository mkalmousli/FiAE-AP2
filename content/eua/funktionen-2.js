AP2.add('eua-funktionen', [
  ['codes', [
    ['java', `static void erhoehe(int p) {      // p ist eine KOPIE
    p = p + 5;
    System.out.println("innen: " + p);   // 15
}

int x = 10;
erhoehe(x);
System.out.println("außen: " + x);       // 10  (unverändert!)

// Auch swap funktioniert in Java mit int NICHT:
static void tausche(int a, int b) { int t = a; a = b; b = t; }   // wirkungslos

// Bei Objekten wird die REFERENZ kopiert: Der Inhalt kann sich ändern!
static void fuegeHinzu(ArrayList<String> liste) {
    liste.add("neu");                     // verändert das Original-Objekt
    liste = new ArrayList<>();            // lokal: zeigt nur noch die Kopie auf neues Objekt
}`],
    ['csharp', `static void Erhoehe(ref int p)     // ref: Call by Reference
{
    p = p + 5;
}

int x = 10;
Erhoehe(ref x);
Console.WriteLine(x);                // 15

static void Teile(int a, int b, out int q, out int r)   // out: mehrere Ergebnisse
{
    q = a / b;
    r = a % b;
}
Teile(17, 5, out int quotient, out int rest);           // 3 und 2`],
    ['python', `def erhoehe(p):
    p = p + 5             # bindet p neu, das Original bleibt
    print("innen:", p)    # 15

x = 10
erhoehe(x)
print("außen:", x)        # 10

def fuege_hinzu(liste):
    liste.append("neu")   # verändert das Original-Objekt (veränderlich!)

l = []
fuege_hinzu(l)            # l = ["neu"]`],
  ]],
  ['table', ['Sprache', 'Primitive Werte', 'Objekte / Listen', 'Besonderheit'], [
    ['**Java**', 'Call by Value', 'Referenz wird **als Wert kopiert** (Objektinhalt änderbar, Zuweisung nur lokal)', 'Es gibt nur Call by Value'],
    ['**C#**', 'Call by Value', 'Referenz wird kopiert', '`ref` und `out` für echte Referenzübergabe'],
    ['**Python**', 'Alles sind Objekte', 'Veränderbare Objekte (list, dict) werden **verändert**, unveränderliche (int, str) nicht', 'Call by Object Reference'],
    ['**C / C++**', 'Call by Value', 'Zeiger oder Referenz (`&`)', 'Wahl zwischen Wert, Zeiger und Referenz'],
  ]],
  ['procon', 'Call by Value gegenüber Call by Reference', ['**By Value:** sicher, Original kann nicht versehentlich verändert werden', '**By Value:** einfach zu verstehen', '**By Reference:** effizient bei großen Daten (keine Kopie)', '**By Reference:** erlaubt mehrere Rückgabewerte / Änderung des Originals'], ['**By Value:** Kopieren großer Objekte kostet Zeit und Speicher', '**By Value:** Funktion kann Ergebnisse nur über `return` liefern', '**By Reference:** Seiteneffekte, Original wird unerwartet verändert', '**By Reference:** Fehlersuche schwieriger']],
  ['h', 'Gültigkeitsbereich und Stack'],
  ['p', 'Bei jedem Funktionsaufruf legt das System einen **Stack-Frame** (Stapelrahmen) an: Dort liegen die **Parameter** und **lokalen Variablen**. Endet die Funktion, wird der Frame entfernt und die lokalen Variablen verschwinden. **Globale** Variablen (außerhalb aller Funktionen) leben das ganze Programm lang, sollten aber **vermieden** werden (schwer zu verstehen und zu testen).'],
  ['table', ['Schritt', 'Aufruf-Stack (oben = aktuell)', 'Erläuterung'], [['1', 'main', 'Das Programm startet in `main`'], ['2', 'main, bruttoPreis', '`main` ruft `bruttoPreis(100, 0.19)` auf: neuer Frame mit netto, satz, brutto'], ['3', 'main', 'Rückkehr, Rückgabewert 119.0 wird übernommen, Frame ist weg']]],
  ['h', 'Gute Funktionen: Faustregeln'],
  ['list', ['**Eine Aufgabe pro Funktion** (Single Responsibility), kurz und überschaubar.', '**Sprechende Namen** (Verben): `berechneRabatt`, `istGueltig`.', '**Wenige Parameter** (idealerweise höchstens 3 bis 4).', '**Keine unerwarteten Seiteneffekte**: Gleiche Eingabe soll gleiche Ausgabe liefern.', 'Ungültige Eingaben prüfen und Fehler melden (Exception, siehe Fehlerbehandlung).']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie den Unterschied zwischen Call by Value und Call by Reference an einem Beispiel.', ['Bei **Call by Value** erhält die Funktion eine **Kopie** des Arguments. `void f(int p) { p = 99; }` ändert die Variable des Aufrufers nicht.', 'Bei **Call by Reference** erhält sie die **Adresse** des Originals. Mit C# `void f(ref int p) { p = 99; }` ändert der Aufruf `f(ref x)` den Wert von `x` auf 99.'], 5],
  ['qa', 'Was gibt das folgende Java-Programm aus? static void f(int a) { a = a * 2; } public static void main(...) { int x = 4; f(x); System.out.println(x); }', '**4.** Java übergibt `int` als Kopie (Call by Value). Die Änderung in `f` betrifft nur die lokale Kopie `a`.', 3],
  ['qa', 'Schreiben Sie eine Methode `max(int a, int b)`, die den größeren Wert zurückgibt, und rufen Sie sie auf.', ['`static int max(int a, int b) { if (a > b) return a; else return b; }`', 'Aufruf: `int m = max(7, 12);` ergibt m = 12.'], 3],
  ['qa', 'Nennen Sie drei Vorteile der Verwendung von Methoden.', ['- **Wiederverwendbarkeit:** Code wird einmal geschrieben und mehrfach genutzt.', '- **Übersichtlichkeit und Wartbarkeit:** Programm in kleine, benannte Einheiten zerlegt, Fehler an einer Stelle beheben.', '- **Testbarkeit:** Einzelne Methoden lassen sich separat testen.'], 3],
  ['quiz', [
    {q: 'Was bedeutet void bei einer Methodendeklaration?', o: ['Die Methode liefert keinen Rückgabewert', 'Die Methode ist leer', 'Die Methode ist privat', 'Die Methode ist statisch'], a: 0, e: 'void heißt: kein Rückgabewert.'},
    {q: 'Was ist der Unterschied zwischen Parameter und Argument?', o: ['Parameter stehen in der Definition, Argumente beim Aufruf', 'Es gibt keinen Unterschied', 'Parameter sind immer Zahlen', 'Argumente stehen in der Definition'], a: 0, e: 'Parameter sind Platzhalter, Argumente die tatsächlichen Werte.'},
    {q: 'Wie übergibt Java primitive Typen?', o: ['Call by Value', 'Call by Reference', 'Call by Name', 'Gar nicht'], a: 0, e: 'Java kennt nur Call by Value.'},
    {q: 'Was ist Überladung?', o: ['Gleicher Methodenname mit unterschiedlicher Parameterliste', 'Zu viele Parameter', 'Zu viel Speicher', 'Eine Endlosschleife'], a: 0, e: 'Overloading: dieselbe Bezeichnung, verschiedene Signaturen.'},
    {q: 'Wo werden lokale Variablen eines Methodenaufrufs gespeichert?', o: ['Im Stack (Stack-Frame)', 'Im Backup', 'In der Datenbank', 'Im Router'], a: 0, e: 'Jeder Aufruf bekommt einen Stack-Frame mit Parametern und lokalen Variablen.'},
  ]],
]);
