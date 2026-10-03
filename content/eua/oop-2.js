AP2.add('eua-oop', [
  ['h', 'Wichtige Konzepte'],
  ['kv', [
    ['Attribute / Instanzvariablen', 'Jedes Objekt hat **seine eigenen** Werte. `k1.saldo` und `k2.saldo` sind unabhängig.'],
    ['Methoden', 'Funktionen, die zu einer Klasse gehören und auf den Attributen des Objekts arbeiten. Sie definieren das **Verhalten**.'],
    ['this (self in Python)', 'Verweist auf das **aktuelle Objekt**. Unterscheidet Parameter und Attribut gleichen Namens: `this.saldo = saldo;`'],
    ['static (Klassenmember)', 'Gehört zur **Klasse**, nicht zu einem Objekt. Es gibt nur **ein** Exemplar für alle. Beispiel: ein Zähler der erzeugten Objekte, `Math.sqrt()`. Aufruf über den Klassennamen.'],
    ['Referenz', 'Eine Variable eines Klassentyps enthält nur einen **Verweis (Adresse)** auf das Objekt im Speicher (Heap), nicht das Objekt selbst.'],
    ['null', 'Die Referenz zeigt auf **kein** Objekt. Ein Zugriff auf Attribute oder Methoden löst eine **NullPointerException** (C#: NullReferenceException) aus.'],
    ['Garbage Collector', 'Automatische Speicherbereinigung: Objekte, auf die **keine Referenz** mehr zeigt, werden vom System entfernt (Java, C#, Python).'],
  ]],
  ['h', 'Referenzen verstehen'],
  ['diagram', {w: 760, h: 250, keep: 620, cap: 'Zwei Variablen können auf dasselbe Objekt zeigen: Änderungen über a sind auch über b sichtbar.', nodes: [
    {id: 'st', k: 'group', x: 150, y: 125, w: 220, h: 210, t: 'Stack (Variablen)', s: 'soft'}, {id: 'hp', k: 'group', x: 540, y: 125, w: 340, h: 210, t: 'Heap (Objekte)', s: 'soft'},
    {id: 'a', k: 'box', x: 150, y: 90, t: 'a (Referenz)', w: 140, h: 38, s: 'accent'}, {id: 'b', k: 'box', x: 150, y: 150, t: 'b (Referenz)', w: 140, h: 38, s: 'accent'}, {id: 'c', k: 'box', x: 150, y: 210, t: 'c = null', w: 140, h: 38},
    {id: 'o1', k: 'cls', x: 480, y: 100, w: 190, t: {name: 'Konto-Objekt 1', attrs: ['saldo = 300']}, s: 'accent'}, {id: 'o2', k: 'cls', x: 650, y: 180, w: 160, t: {name: 'Konto-Objekt 2', attrs: ['saldo = 80']}},
  ], edges: [{a: 'a', b: 'o1'}, {a: 'b', b: 'o1', via: [[330, 150]]}]}],
  ['codes', [
    ['java', `Konto a = new Konto("Mia", 100);
Konto b = a;              // b zeigt auf DASSELBE Objekt (keine Kopie!)
b.einzahlen(200);
System.out.println(a.getSaldo());     // 300.0
Konto c = new Konto("Mia", 300);
System.out.println(a == c);           // false: verschiedene Objekte
System.out.println(a == b);           // true: dasselbe Objekt`],
    ['python', `a = Konto("Mia", 100)
b = a                    # dasselbe Objekt
b.einzahlen(200)
print(a.saldo)           # 300.0
c = Konto("Mia", 300)
print(a is c)            # False
print(a is b)            # True`],
  ]],
  ['warn', ['**== vergleicht bei Objekten die Referenz (Adresse), nicht den Inhalt.** Zwei verschiedene Objekte mit gleichen Werten sind mit `==` **nicht gleich**. Den Inhalt vergleicht man mit **`equals()`** (Java/C#). Das gilt auch für **Strings**: `s1.equals(s2)` statt `s1 == s2`.']],
  ['h', 'Zugriffsmodifikatoren und Kapselung'],
  ['table', ['Modifikator', 'Sichtbar in', 'Typischer Einsatz'], [
    ['`public`', 'überall', 'Schnittstelle der Klasse (Methoden, die andere nutzen sollen)'],
    ['`protected`', 'Klasse, Unterklassen (Java: auch Paket)', 'Für Vererbung gedachte Elemente'],
    ['`private`', 'nur innerhalb der Klasse', '**Attribute**, interne Hilfsmethoden'],
    ['Paketsichtbar (Java: kein Modifikator) / `internal` (C#)', 'innerhalb des Pakets / der Assembly', 'Interne Klassen eines Moduls'],
  ]],
  ['p', 'Attribute sind **in der Regel `private`**. Der Zugriff erfolgt über **Methoden** (Getter und Setter). So kann die Klasse **Eingaben prüfen** (kein negativer Saldo) und ihre **innere Darstellung ändern**, ohne dass andere Klassen angepasst werden müssen. Das ist das Prinzip der **Kapselung** (siehe nächste Seite).'],
  ['h', 'static: Klassenvariable zählt Objekte'],
  ['code', 'java', `public class Konto {
    private static int anzahl = 0;       // gehört zur Klasse, existiert nur 1x
    public Konto() { anzahl++; }
    public static int getAnzahl() { return anzahl; }
}
new Konto(); new Konto(); new Konto();
System.out.println(Konto.getAnzahl());   // 3  (Aufruf über den Klassennamen)`],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie den Unterschied zwischen Klasse und Objekt.', 'Eine **Klasse** ist ein Bauplan, der festlegt, welche Attribute und Methoden Objekte haben. Ein **Objekt** ist ein konkretes Exemplar (eine Instanz) dieser Klasse mit eigenen Attributwerten, das im Speicher existiert. Aus einer Klasse lassen sich beliebig viele Objekte erzeugen.', 4],
  ['qa', 'Erstellen Sie die Klasse Rechteck mit den Attributen laenge und breite (private), einem Konstruktor und einer Methode flaeche().', ['`public class Rechteck {`', '`    private double laenge, breite;`', '`    public Rechteck(double laenge, double breite) { this.laenge = laenge; this.breite = breite; }`', '`    public double flaeche() { return laenge * breite; }`', '`}`', 'Verwendung: `new Rechteck(3, 4).flaeche()` ergibt **12.0**.'], 6],
  ['qa', 'Warum werden Attribute meist als private deklariert?', 'Damit andere Klassen sie **nicht direkt ändern** können (Kapselung). Zugriff erfolgt über Methoden, die **Werte prüfen** (zum Beispiel keine negative Menge) und die **interne Datenstruktur** später ändern lassen, ohne dass der Rest des Programms angepasst werden muss.', 4],
  ['qa', 'Was gibt der Code aus? Konto a = new Konto("A", 10); Konto b = a; b.einzahlen(5); System.out.println(a.getSaldo());', '**15.0.** `b = a` kopiert nur die **Referenz**. Beide Variablen zeigen auf dasselbe Objekt. Die Einzahlung über `b` verändert daher auch `a`.', 3],
  ['quiz', [
    {q: 'Was ist ein Objekt?', o: ['Eine Instanz einer Klasse', 'Ein Bauplan', 'Eine Datei', 'Ein Datentyp wie int'], a: 0, e: 'Objekte werden aus Klassen erzeugt.'},
    {q: 'Was bedeutet private bei einem Attribut?', o: ['Nur innerhalb der Klasse sichtbar', 'Überall sichtbar', 'Nur in Unterklassen sichtbar', 'Konstante'], a: 0, e: 'private schränkt den Zugriff auf die eigene Klasse ein.'},
    {q: 'Wofür steht this?', o: ['Das aktuelle Objekt', 'Die Oberklasse', 'Die Klasse', 'Eine globale Variable'], a: 0, e: 'this verweist auf das Objekt, dessen Methode gerade ausgeführt wird.'},
    {q: 'Was bewirkt == bei zwei Objekt-Variablen in Java?', o: ['Prüft, ob beide auf dasselbe Objekt zeigen', 'Prüft, ob die Attribute gleich sind', 'Erzeugt eine Kopie', 'Löscht beide'], a: 0, e: 'Der Operator vergleicht die Referenzen. Für Inhalte nutzt man equals().'},
    {q: 'Zu wem gehört ein static-Attribut?', o: ['Zur Klasse', 'Zu jedem Objekt einzeln', 'Zum Compiler', 'Zur Datenbank'], a: 0, e: 'Es gibt nur ein Exemplar für die ganze Klasse.'},
  ]],
]);
