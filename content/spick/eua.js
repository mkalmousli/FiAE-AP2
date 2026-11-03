// Spickzettel für die Prüfung "Entwicklung und Umsetzung von Algorithmen" (AP2 FiAE).
AP2.spick('eua', {
  exam: 'Prüfung: Entwicklung und Umsetzung von Algorithmen',
  t: 'Spickzettel Algorithmen und SQL',
  s: 'Pseudocode, Struktogramm, OOP, Datenstrukturen, Sortieren/Suchen, Komplexität, Testen, Web und SQL auf einer Seite',
  meta: [['90 Min', 'Dauer'], ['100', 'Punkte'], ['4 × 25', 'Punkte je Aufgabe'], ['50 %', 'zum Bestehen']],
  top: [
    ['flow', ['Aufgabe lesen', 'Ein-/Ausgabe klären', 'Randfälle (leer, 0, null)', 'Pseudocode/SQL', 'Schreibtischtest']],
    ['tip', 'Die Sprache ist frei (Pseudocode, Java, Python, C#), aber **konsistent** bleiben. Bewertet wird die **Logik**, nicht die Syntax. Variablen sinnvoll benennen, Schleifengrenzen prüfen (**Off-by-one**!).'],
  ],
  sections: [
    {t: 'Paradigmen und Datentypen', icon: 'puzzle', ids: ['eua-paradigmen', 'eua-datentypen'], items: [
      ['pairs', [
        ['Imperativ / prozedural', 'Folge von Anweisungen, Zustand ändert sich (C, Pascal)'],
        ['Objektorientiert', 'Objekte = Daten + Verhalten (Java, C#)'],
        ['Funktional', 'reine Funktionen, keine Seiteneffekte, Unveränderlichkeit (Haskell, `map/filter/reduce`)'],
        ['Deklarativ', 'WAS statt WIE (SQL, HTML, Prolog)'],
        ['Ereignisgesteuert', 'Reaktion auf Events/Handler (GUI, JS)'],
      ]],
      ['tbl', ['Typ', 'Größe', 'Wertebereich / Beispiel'], [
        ['boolean', '1 Bit (log.)', 'true / false'],
        ['byte', '8 Bit', '-128 … 127'],
        ['short', '16 Bit', '-32 768 … 32 767'],
        ['int', '32 Bit', 'ca. ±2,1 Mrd. (-2^31 … 2^31-1)'],
        ['long', '64 Bit', '±9,2·10^18'],
        ['float / double', '32 / 64 Bit', 'Gleitkomma, ca. 7 / 15 Stellen'],
        ['char', '16 Bit (Java)', `'A' (Unicode)`],
        ['String', 'Referenztyp', '"Hallo" (unveränderlich in Java)'],
      ]],
      ['li', ['**Primitive** Typen (Wert) vs. **Referenztypen** (Adresse auf Objekt)', '**Statische** Typisierung (Java, C#) vs. **dynamische** (Python, JS)', '**Casting**: implizit (int → double), explizit `(int) 3.9` = 3 (abschneiden)', '**Integer-Division**: `7 / 2 = 3`, Modulo `7 % 2 = 1`']],
      ['warn', 'Gleitkomma ist ungenau (`0.1 + 0.2 ≠ 0.3`) – für **Geldbeträge** Decimal/BigDecimal oder Cent als int.'],
    ]},
    {t: 'Kontrollstrukturen und Funktionen', icon: 'route', ids: ['eua-kontroll', 'eua-funktionen'], items: [
      ['cards', [
        ['Sequenz', ['Anweisungen nacheinander']],
        ['Verzweigung', ['if / else', 'switch / case']],
        ['Kopfgesteuert', ['while, for', 'evtl. 0 Durchläufe']],
        ['Fußgesteuert', ['do … while / repeat until', 'mind. 1 Durchlauf']],
      ]],
      ['code', 'pseudo', `FUNKTION max(a: Ganzzahl, b: Ganzzahl): Ganzzahl
  WENN a > b DANN
    RÜCKGABE a
  SONST
    RÜCKGABE b
  ENDE WENN
ENDE FUNKTION

FÜR i VON 0 BIS n-1 SCHRITT 1
  ...
ENDE FÜR`],
      ['pairs', [
        ['Signatur', 'Name + Parameterliste (+ Rückgabetyp)'],
        ['Call by Value', 'Kopie wird übergeben, Original bleibt'],
        ['Call by Reference', 'Referenz wird übergeben, Änderungen wirken außen'],
        ['Überladen', 'gleicher Name, andere Parameterliste'],
        ['Gültigkeit', 'lokale vs. globale Variablen (Scope)'],
        ['break / continue', 'Schleife verlassen / nächster Durchlauf'],
      ]],
    ]},
    {t: 'Rekursion', icon: 'repeat', ids: ['eua-rekursion'], items: [
      ['li', ['Funktion ruft **sich selbst** auf', 'Braucht **Abbruchbedingung** (Basisfall), sonst **StackOverflow**', 'Jeder Aufruf belegt einen **Stackframe** → Speicher O(n)', 'Jede Rekursion ist auch **iterativ** lösbar']],
      ['code', 'pseudo', `FUNKTION fak(n)
  WENN n <= 1 DANN RÜCKGABE 1      // Basisfall
  RÜCKGABE n * fak(n - 1)           // Rekursionsschritt
ENDE FUNKTION

FUNKTION fib(n)
  WENN n < 2 DANN RÜCKGABE n
  RÜCKGABE fib(n-1) + fib(n-2)      // O(2^n) ohne Memoization`],
      ['tip', 'Ablauf als **Aufrufbaum** bzw. Tabelle darstellen: fak(4) = 4·fak(3) = 4·3·fak(2) = 4·3·2·1 = 24.'],
    ]},
    {t: 'Pseudocode, PAP und Struktogramm', icon: 'pen', ids: ['eua-pseudocode', 'eua-pap', 'eua-algoexam'], items: [
      ['tbl', ['Element', 'PAP (DIN 66001)', 'Struktogramm (Nassi-Shneiderman, DIN 66261)'], [
        ['Start/Ende', 'Oval (Terminator)', 'Rahmen / Name oben'],
        ['Anweisung', 'Rechteck', 'Rechteck'],
        ['Ein-/Ausgabe', 'Parallelogramm', 'Rechteck mit „Eingabe/Ausgabe“'],
        ['Verzweigung', 'Raute, Ausgänge ja/nein', 'Dreieck mit wahr | falsch'],
        ['Schleife', 'Rücksprungpfeil', 'L-Form (kopf- oder fußgesteuert)'],
        ['Unterprogramm', 'Rechteck mit Doppelrand', 'Rechteck mit Doppelrand'],
      ]],
      ['li', ['Struktogramm: **kein goto**, nur strukturierte Blöcke, von oben nach unten', 'PAP: Pfeile, Verbindungsstellen (Kreise) erlaubt', 'Pseudocode: Schlüsselwörter groß, Einrückung, **Datentypen** bei Parametern angeben']],
      ['tip', 'Typische Aufgabe: gegebenen Algorithmus **ergänzen** oder **Schreibtischtest** (Trace-Tabelle mit allen Variablen pro Durchlauf).'],
    ]},
    {t: 'OOP: Klassen, Säulen, Interfaces', icon: 'cards', ids: ['eua-oop', 'eua-saeulen', 'eua-konstruktor', 'eua-interface'], items: [
      ['cards', [
        ['Kapselung', ['Attribute private', 'Zugriff via Getter/Setter']],
        ['Vererbung', ['extends', '„ist ein“-Beziehung']],
        ['Polymorphie', ['Überschreiben (@Override)', 'dyn. Bindung']],
        ['Abstraktion', ['abstract class', 'Wesentliches zeigen']],
      ]],
      ['mnemo', '**A PIE**: Abstraction, Polymorphism, Inheritance, Encapsulation.'],
      ['code', 'java', `public class Konto {
    private double saldo;                 // Kapselung
    public Konto(double start) { this.saldo = start; }   // Konstruktor
    public double getSaldo() { return saldo; }
    public void einzahlen(double b) {
        if (b <= 0) throw new IllegalArgumentException("Betrag > 0");
        saldo += b;
    }
}
public class Sparkonto extends Konto implements Verzinsbar {
    public Sparkonto(double s) { super(s); }
    @Override public double zinsen() { return getSaldo() * 0.02; }
}`],
      ['pairs', [
        ['Konstruktor', 'gleicher Name wie Klasse, kein Rückgabetyp; Standard-, parametrisierter, Kopierkonstruktor; `super(...)` als erste Anweisung'],
        ['Interface', 'nur Methodensignaturen (Vertrag), Mehrfach-Implementierung möglich, keine Instanzen'],
        ['Abstrakte Klasse', 'kann Attribute + implementierte Methoden haben, nur Einfachvererbung'],
        ['static', 'gehört zur Klasse, nicht zum Objekt'],
        ['Überschreiben vs. Überladen', 'gleiche Signatur in Unterklasse vs. anderer Parameterliste'],
      ]],
    ]},
    {t: 'UML → Code', icon: 'grid', ids: ['eua-umlcode'], items: [
      ['tbl', ['UML', 'Code'], [
        ['- / + / # / ~', 'private / public / protected / package'],
        ['unterstrichen', 'static'],
        ['kursiv / «abstract»', 'abstract'],
        ['Pfeil mit leerem Dreieck', 'extends (Vererbung)'],
        ['gestrichelt + leeres Dreieck', 'implements (Interface)'],
        ['Assoziation 1 → *', 'Attribut `List<B> bs`'],
        ['Aggregation ◇', 'Teil existiert unabhängig (Referenz übergeben)'],
        ['Komposition ◆', 'Teil wird im Ganzen erzeugt, stirbt mit'],
      ]],
      ['f', '+ berechne(menge: int): double', '→ public double berechne(int menge)'],
      ['tip', 'Multiplizität `0..*` bzw. `1..*` → **Liste/Array**, `0..1` → Attribut darf **null** sein.'],
    ]},
    {t: 'Datenstrukturen', icon: 'network', ids: ['eua-listen', 'eua-stackqueue', 'eua-baeume', 'eua-hash'], wide: true, items: [
      ['tbl', ['Struktur', 'Prinzip', 'Zugriff', 'Einfügen', 'Suchen'], [
        ['Array', 'feste Größe, Index', 'O(1)', 'O(n)', 'O(n) / O(log n) sortiert'],
        ['Verkettete Liste', 'Knoten mit next (doppelt: prev)', 'O(n)', 'O(1) am Kopf', 'O(n)'],
        ['Stack (Stapel)', '**LIFO**: push, pop, peek', 'O(1) oben', 'O(1)', 'O(n)'],
        ['Queue (Schlange)', '**FIFO**: enqueue, dequeue', 'O(1) vorn', 'O(1)', 'O(n)'],
        ['Binärer Suchbaum', 'links < Knoten < rechts', '–', 'O(log n), entartet O(n)', 'O(log n), entartet O(n)'],
        ['Hashtabelle', 'Schlüssel → hash(k) mod m', 'O(1) Ø', 'O(1) Ø', 'O(1) Ø, worst O(n)'],
      ]],
      ['row', [
        ['diagram', AP2.dg.tree({t: '8', c: [{t: '3', c: [{t: '1'}, {t: '6'}]}, {t: '10', c: [{e: 1}, {t: '14'}]}]}, {gx: 50, gy: 56, w: 34, h: 34, k: 'circle', cap: 'BST: links kleiner, rechts größer'})],
        ['pairs', [
          ['Preorder', 'W-L-R: 8 3 1 6 10 14'],
          ['Inorder', 'L-W-R: 1 3 6 8 10 14 (sortiert!)'],
          ['Postorder', 'L-R-W: 1 6 3 14 10 8'],
          ['Levelorder', 'ebenenweise (BFS mit Queue)'],
        ]],
      ]],
      ['li', ['**Kollision** bei Hash: Verkettung (Liste pro Bucket) oder offene Adressierung (lineares Sondieren)', 'Stack: Rekursion, Undo, Klammerprüfung; Queue: Druckaufträge, BFS', 'Baumbegriffe: Wurzel, Blatt, Höhe, Grad, ausgeglichen (AVL)']],
    ]},
    {t: 'Sortieren', icon: 'chart', ids: ['eua-sortieren'], wide: true, items: [
      ['tbl', ['Verfahren', 'Idee', 'Best', 'Average', 'Worst', 'Speicher', 'Stabil'], [
        ['Bubble Sort', 'Nachbarn tauschen, Größtes „blubbert“ nach hinten', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'ja'],
        ['Selection Sort', 'Minimum suchen, an Position i tauschen', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', 'nein'],
        ['Insertion Sort', 'Element in sortierten Teil einfügen', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'ja'],
        ['Quick Sort', 'Pivot, partitionieren, rekursiv', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'nein'],
        ['Merge Sort', 'halbieren, sortieren, mischen', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'ja'],
      ]],
      ['row', [
        ['code', 'pseudo', `// Bubble Sort
FÜR i VON 0 BIS n-2
  getauscht = falsch
  FÜR j VON 0 BIS n-2-i
    WENN a[j] > a[j+1] DANN
      tausche(a[j], a[j+1]); getauscht = wahr
  WENN NICHT getauscht DANN ABBRUCH`],
        ['code', 'pseudo', `// Selection Sort
FÜR i VON 0 BIS n-2
  min = i
  FÜR j VON i+1 BIS n-1
    WENN a[j] < a[min] DANN min = j
  tausche(a[i], a[min])`],
        ['code', 'pseudo', `// Insertion Sort
FÜR i VON 1 BIS n-1
  key = a[i]; j = i - 1
  SOLANGE j >= 0 UND a[j] > key
    a[j+1] = a[j]; j = j - 1
  a[j+1] = key`],
      ]],
      ['li', ['**Stabil** = gleiche Schlüssel behalten ihre Reihenfolge', '**Quicksort** worst case bei schlechtem Pivot (bereits sortiert + erstes Element)', '**Merge Sort**: Teile-und-herrsche, garantiert n log n, braucht Hilfsarray']],
    ]},
    {t: 'Suchen und Prüfziffer', icon: 'search', ids: ['eua-suchen', 'eua-pruefziffer'], items: [
      ['code', 'pseudo', `// Binäre Suche (Array MUSS sortiert sein)
links = 0; rechts = n - 1
SOLANGE links <= rechts
  mitte = (links + rechts) DIV 2
  WENN a[mitte] == x DANN RÜCKGABE mitte
  SONST WENN a[mitte] < x DANN links = mitte + 1
  SONST rechts = mitte - 1
RÜCKGABE -1`],
      ['pairs', [['Lineare Suche', 'O(n), unsortiert möglich'], ['Binäre Suche', 'O(log n), 1 000 000 Elemente → max. 20 Schritte'], ['Hash-Suche', 'O(1) im Mittel']]],
      ['sub', 'Prüfziffer (z. B. EAN-13)'],
      ['f', 'Summe = Σ Ziffer · Gewicht (1,3,1,3,…); PZ = (10 − Summe mod 10) mod 10', 'Erkennt Tippfehler und viele Zahlendreher. ISBN-10: Gewichte 10…1, mod 11 (X = 10). IBAN: mod 97.'],
      ['tip', 'Ziffern einzeln holen: `z = zahl mod 10; zahl = zahl DIV 10` oder String Zeichen für Zeichen.'],
    ]},
    {t: 'Komplexität (O-Notation)', icon: 'clock', ids: ['eua-onotation'], items: [
      ['tbl', ['Klasse', 'Name', 'Beispiel'], [
        ['O(1)', 'konstant', 'Array-Zugriff, Hash'],
        ['O(log n)', 'logarithmisch', 'Binäre Suche'],
        ['O(n)', 'linear', 'Lineare Suche, eine Schleife'],
        ['O(n log n)', 'linear-logarithmisch', 'Merge-, Quick Sort'],
        ['O(n²)', 'quadratisch', 'zwei verschachtelte Schleifen, Bubble Sort'],
        ['O(2^n)', 'exponentiell', 'naive Fibonacci-Rekursion'],
      ]],
      ['li', ['Nur **dominanter Term**, Konstanten weg: 3n² + 5n + 2 → O(n²)', 'Schleifen nacheinander → **addieren**, verschachtelt → **multiplizieren**', 'Best / Average / **Worst Case** unterscheiden; auch **Speicherkomplexität**']],
    ]},
    {t: 'Design Patterns', icon: 'bulb', ids: ['eua-patterns'], items: [
      ['pairs', [
        ['Singleton (Erzeugung)', 'genau eine Instanz: privater Konstruktor + `static getInstance()`'],
        ['Factory (Erzeugung)', 'Objekterzeugung in eigene Methode/Klasse auslagern'],
        ['Builder (Erzeugung)', 'komplexe Objekte schrittweise bauen'],
        ['Adapter (Struktur)', 'inkompatible Schnittstelle anpassen'],
        ['Decorator (Struktur)', 'Verhalten zur Laufzeit erweitern'],
        ['Observer (Verhalten)', 'Subjekt benachrichtigt angemeldete Beobachter'],
        ['Strategy (Verhalten)', 'austauschbare Algorithmen hinter Interface'],
        ['MVC (Architektur)', 'Model (Daten), View (Anzeige), Controller (Steuerung)'],
      ]],
      ['code', 'java', `public class Logger {
    private static Logger instanz;
    private Logger() {}
    public static Logger getInstance() {
        if (instanz == null) instanz = new Logger();
        return instanz;
    }
}`],
    ]},
    {t: 'Exceptions und Debugging', icon: 'alert', ids: ['eua-exceptions', 'eua-debugging'], items: [
      ['code', 'java', `try {
    int z = Integer.parseInt(eingabe);
} catch (NumberFormatException e) {
    System.out.println("Keine Zahl: " + e.getMessage());
} finally {
    datei.close();          // wird immer ausgeführt
}`],
      ['li', ['**Checked** (muss behandelt/deklariert werden, `throws IOException`) vs. **Unchecked** (RuntimeException, z. B. NullPointer, ArrayIndexOutOfBounds)', 'Eigene Exception: `class XyException extends Exception`', 'Spezifische catch-Blöcke **vor** allgemeinen']],
      ['pairs', [
        ['Syntaxfehler', 'Compiler meldet (fehlendes ;)'],
        ['Laufzeitfehler', 'Absturz, z. B. Division durch 0'],
        ['Logischer Fehler', 'falsches Ergebnis, schwer zu finden'],
        ['Debugger', '**Breakpoint**, Step over / into / out, Watch, Call Stack'],
        ['Weitere', 'Logging, Schreibtischtest, Rubber Duck, Assertions'],
      ]],
    ]},
    {t: 'Testen', icon: 'flask', ids: ['eua-testfaelle', 'eua-unittest'], items: [
      ['pairs', [
        ['Black-Box', 'gegen Spezifikation, ohne Code: **Äquivalenzklassen**, **Grenzwerte**'],
        ['White-Box', 'mit Code: Anweisungs- (C0), Zweig- (C1), Pfadüberdeckung'],
        ['Teststufen', 'Unit → Integration → System → Abnahme'],
        ['Regression', 'nach Änderung alte Tests erneut ausführen'],
        ['TDD', 'Red → Green → Refactor'],
      ]],
      ['tbl', ['Eingabe Alter (gültig 18–65)', 'Klasse', 'Erwartet'], [['17', 'ungültig (Grenze)', 'Fehler'], ['18', 'gültig (Grenze)', 'OK'], ['40', 'gültig', 'OK'], ['65', 'gültig (Grenze)', 'OK'], ['66', 'ungültig (Grenze)', 'Fehler'], ['"abc"', 'ungültig (Typ)', 'Fehler']]],
      ['code', 'java', `@Test
void einzahlenErhoehtSaldo() {
    Konto k = new Konto(100);          // Arrange
    k.einzahlen(50);                   // Act
    assertEquals(150, k.getSaldo(), 0.001);   // Assert
}`],
      ['mnemo', 'Unittest = **AAA**: Arrange, Act, Assert. Testfall = Vorbedingung + Eingabe + **erwartetes Ergebnis**.'],
    ]},
    {t: 'Dateien und Formate', icon: 'book', ids: ['eua-dateien', 'eua-formate'], items: [
      ['row', [
        ['code', 'json', `{"id": 1, "name": "Meier",
 "aktiv": true,
 "tags": ["kunde", "vip"]}`],
        ['code', 'html', `<kunde id="1">
  <name>Meier</name>
</kunde>`],
      ]],
      ['pairs', [
        ['JSON', 'Objekte {}, Arrays [], Strings in "…", leichtgewichtig, REST-Standard'],
        ['XML', 'Tags, Attribute, wohlgeformt, prüfbar per **XSD/DTD**, XPath'],
        ['CSV', 'Zeilen + Trennzeichen (; oder ,), erste Zeile Kopf, keine Hierarchie'],
        ['YAML', 'Einrückung, Konfigurationsdateien'],
      ]],
      ['code', 'pseudo', `datei = ÖFFNE("kunden.csv", lesen)
SOLANGE NICHT datei.EOF
  zeile = datei.LIESZEILE()
  felder = TEILE(zeile, ";")
ENDE SOLANGE
SCHLIESSE(datei)`],
    ]},
    {t: 'Web: HTML, CSS, JS, REST', icon: 'code', ids: ['eua-html', 'eua-css', 'eua-js', 'eua-webapi'], items: [
      ['li', ['**HTML** = Struktur (semantisch: header, nav, main, form, input, table)', '**CSS** = Gestaltung: Selektoren `#id`, `.klasse`, `tag`; Box-Modell (content, padding, border, margin); Spezifität id > class > tag', '**JS** = Verhalten: DOM (`document.querySelector`), Events (`addEventListener`), `fetch` asynchron (Promise, async/await)']],
      ['tbl', ['HTTP', 'CRUD', 'idempotent', 'Beispiel'], [['GET', 'Read', 'ja', 'GET /kunden/7'], ['POST', 'Create', 'nein', 'POST /kunden'], ['PUT', 'Update (ganz)', 'ja', 'PUT /kunden/7'], ['PATCH', 'Update (teilw.)', 'nein', 'PATCH /kunden/7'], ['DELETE', 'Delete', 'ja', 'DELETE /kunden/7']]],
      ['pairs', [['2xx', '200 OK, 201 Created, 204 No Content'], ['4xx', '400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found'], ['5xx', '500 Internal Server Error, 503 Service Unavailable']]],
      ['li', ['REST: **zustandslos**, Ressourcen per URI, einheitliche Schnittstelle, meist JSON', 'Auth über Token (API-Key, JWT, OAuth2); immer HTTPS']],
      ['ext', [['MDN Web Docs', 'https://developer.mozilla.org/de/'], ['HTTP-Statuscodes (MDN)', 'https://developer.mozilla.org/de/docs/Web/HTTP/Status']]],
    ]},
    {t: 'SQL: DDL, DML, DCL', icon: 'grid', ids: ['eua-sqler', 'eua-sqldml', 'eua-sqlviews'], wide: true, items: [
      ['row', [
        ['code', 'sql', `CREATE TABLE kunde (
  kunde_id INT PRIMARY KEY AUTO_INCREMENT,
  name     VARCHAR(50) NOT NULL,
  email    VARCHAR(100) UNIQUE,
  ort_id   INT,
  FOREIGN KEY (ort_id) REFERENCES ort(ort_id)
);
ALTER TABLE kunde ADD geburtstag DATE;
DROP TABLE kunde;`],
        ['code', 'sql', `INSERT INTO kunde (name, ort_id) VALUES ('Meier', 3);
UPDATE kunde SET ort_id = 4 WHERE kunde_id = 7;
DELETE FROM kunde WHERE kunde_id = 7;

CREATE VIEW v_kunden_ort AS
  SELECT k.name, o.ort FROM kunde k
  JOIN ort o ON k.ort_id = o.ort_id;

GRANT SELECT, INSERT ON kunde TO azubi;
REVOKE INSERT ON kunde FROM azubi;`],
      ]],
      ['tbl', ['Gruppe', 'Befehle'], [['DDL (Definition)', 'CREATE, ALTER, DROP, TRUNCATE'], ['DML (Manipulation)', 'INSERT, UPDATE, DELETE (+ SELECT als DQL)'], ['DCL (Control)', 'GRANT, REVOKE'], ['TCL (Transaktion)', 'BEGIN/START TRANSACTION, COMMIT, ROLLBACK, SAVEPOINT']]],
      ['li', ['ER → Tabellen: Entität = Tabelle, 1:n → **Fremdschlüssel** auf n-Seite, n:m → **Zwischentabelle** mit zusammengesetztem PK', '**Normalformen**: 1NF atomar, 2NF voll vom ganzen Schlüssel abhängig, 3NF keine transitiven Abhängigkeiten', '**View** = gespeicherte Abfrage (virtuelle Tabelle): Vereinfachung, Zugriffsschutz']],
      ['warn', '**UPDATE/DELETE ohne WHERE** betrifft alle Zeilen! Referentielle Integrität: ON DELETE CASCADE / RESTRICT / SET NULL.'],
    ]},
    {t: 'SQL: SELECT, JOIN, GROUP BY', icon: 'search', ids: ['eua-sqlselect', 'eua-sqljoin', 'eua-sqlgroup', 'eua-sqlexam'], wide: true, items: [
      ['row', [
        ['code', 'sql', `SELECT   [DISTINCT] spalten, AGG(x) AS alias
FROM     tabelle t
[INNER|LEFT] JOIN t2 ON t.id = t2.t_id
WHERE    bedingung          -- vor Gruppierung
GROUP BY spalten
HAVING   AGG(x) > wert      -- nach Gruppierung
ORDER BY spalte [ASC|DESC]
LIMIT    n;`],
        ['code', 'sql', `-- Umsatz je Kunde über 1000 €, absteigend
SELECT k.name, SUM(b.betrag) AS umsatz
FROM kunde k
JOIN bestellung b ON b.kunde_id = k.kunde_id
WHERE b.datum >= '2025-01-01'
GROUP BY k.kunde_id, k.name
HAVING SUM(b.betrag) > 1000
ORDER BY umsatz DESC;

-- Kunden ohne Bestellung
SELECT k.name FROM kunde k
LEFT JOIN bestellung b ON b.kunde_id = k.kunde_id
WHERE b.bestell_id IS NULL;`],
      ]],
      ['mnemo', 'Reihenfolge: **S**ELECT **F**ROM **W**HERE **G**ROUP **H**AVING **O**RDER – „**S**ie **F**ahren **W**ohl **G**erne **H**ohe **O**ldtimer“. Ausführung: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.'],
      ['pairs', [
        ['INNER JOIN', 'nur Datensätze mit Partner in beiden Tabellen'],
        ['LEFT JOIN', 'alle links, rechts NULL wenn kein Partner'],
        ['RIGHT / FULL', 'alle rechts / alle beidseitig'],
        ['CROSS JOIN', 'kartesisches Produkt (n · m Zeilen)'],
        ['Self Join', 'Tabelle mit sich selbst (Mitarbeiter → Vorgesetzter)'],
        ['Aggregat', 'COUNT, SUM, AVG, MIN, MAX; `COUNT(*)` zählt auch NULL-Zeilen'],
        ['Operatoren', 'LIKE \'M%\' / \'_\', IN (…), BETWEEN a AND b, IS NULL'],
        ['Unterabfrage', '`WHERE preis > (SELECT AVG(preis) FROM artikel)`, EXISTS, IN'],
      ]],
      ['warn', 'Jede Spalte im SELECT ohne Aggregat muss im **GROUP BY** stehen. Auf NULL immer mit **IS NULL** prüfen, nie `= NULL`. Aggregat-Bedingungen gehören in **HAVING**, nicht WHERE.'],
      ['ext', [['SQL-Tutorial (W3Schools)', 'https://www.w3schools.com/sql/'], ['PostgreSQL SELECT-Doku', 'https://www.postgresql.org/docs/current/sql-select.html']]],
    ]},
    {t: 'Transaktionen und ACID', icon: 'lock', ids: ['eua-transaktionen'], items: [
      ['code', 'sql', `START TRANSACTION;
UPDATE konto SET saldo = saldo - 100 WHERE id = 1;
UPDATE konto SET saldo = saldo + 100 WHERE id = 2;
COMMIT;   -- bei Fehler: ROLLBACK;`],
      ['pairs', [
        ['Atomicity', 'alles oder nichts'],
        ['Consistency', 'von konsistentem zu konsistentem Zustand'],
        ['Isolation', 'parallele Transaktionen beeinflussen sich nicht'],
        ['Durability', 'nach COMMIT dauerhaft gespeichert'],
      ]],
      ['li', ['Probleme ohne Isolation: **Lost Update**, Dirty Read, Non-Repeatable Read, Phantom', 'Lösung: **Sperren** (Locks), Isolationslevel; Gefahr: **Deadlock**']],
    ]},
    {t: 'NoSQL', icon: 'network', ids: ['eua-nosql'], items: [
      ['pairs', [
        ['Dokument', 'JSON-Dokumente (MongoDB)'],
        ['Key-Value', 'Schlüssel → Wert, Cache (Redis)'],
        ['Spaltenorientiert', 'große Datenmengen (Cassandra)'],
        ['Graph', 'Knoten + Kanten, Beziehungen (Neo4j)'],
      ]],
      ['li', ['**Schemafrei/flexibel**, horizontal skalierbar, oft **BASE** statt ACID (eventual consistency)', '**CAP-Theorem**: nur 2 von Consistency, Availability, Partition tolerance', 'Relational wählen bei festen Strukturen und Transaktionen (Buchhaltung)']],
      ['code', 'json', `db.kunden.find({ "ort": "Köln", "alter": { "$gt": 30 } })`],
    ]},
    {t: 'Bits, KNN, IoT', icon: 'bolt', ids: ['eua-bits', 'eua-knn', 'eua-iot'], items: [
      ['tbl', ['Operator', 'Wirkung', 'Beispiel (0b1100, 0b1010)'], [['AND &', 'beide 1', '1000 (Bit maskieren/prüfen)'], ['OR |', 'mind. eine 1', '1110 (Bit setzen)'], ['XOR ^', 'genau eine 1', '0110 (Bit umschalten)'], ['NOT ~', 'invertieren', '~1100 = 0011 (4 Bit)'], ['<< / >>', 'schieben = ·2 / DIV 2', '0011 << 1 = 0110']]],
      ['f', 'Bit k prüfen: (x >> k) & 1   |   setzen: x | (1 << k)   |   löschen: x & ~(1 << k)', 'Zweierkomplement: invertieren + 1. Hex: 1 Ziffer = 4 Bit.'],
      ['pairs', [
        ['KNN / Neuron', 'Eingaben · Gewichte + Bias → **Aktivierungsfunktion** (Sigmoid, ReLU, Schwellwert) → Ausgabe'],
        ['Lernen', 'Training mit Daten, Fehler per **Backpropagation** → Gewichte anpassen; überwacht / unüberwacht / bestärkend'],
        ['Probleme', 'Overfitting, Bias in Daten, Black Box'],
        ['IoT', 'Sensoren/Aktoren, Mikrocontroller, Protokolle **MQTT** (Publish/Subscribe über Broker), CoAP, HTTP'],
        ['IoT-Risiken', 'Standardpasswörter, fehlende Updates, unverschlüsselte Übertragung'],
      ]],
      ['f', 'y = f( Σ wᵢ · xᵢ + b )', 'Perzeptron: f = Schwellwertfunktion (1 wenn Summe ≥ 0, sonst 0)'],
    ]},
  ],
});
