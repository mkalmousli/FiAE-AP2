// Probeprüfung 5, Entwicklung und Umsetzung von Algorithmen: VeloCity Leipzig GmbH, Bikesharing.
(function () {
  const ID = 'exam5-eua';
  const bars = (vals, sorted, cap) => ['chart', {kind: 'bar', w: 620, h: 220, labels: vals.map((v, i) => (i < sorted ? '✓ ' : '') + i), series: [{n: 'Wert', d: vals, k: 'accent'}], vals: true, ymax: 100, cap}];
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 5 (Mobilität)', t: 'Entwicklung und Umsetzung von Algorithmen: Bikesharing VeloCity', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.eua,
    hint: 'Schwerpunkte: Tariflogik, Struktogramm in Code umsetzen, Fehlersuche im Sortieralgorithmus, Rekursion, UML aus Code, eigene Exceptions, Collections, Konstruktorverkettung und static, SQL mit Self-Join und verschachtelter Aggregation, NoSQL, HTML-Formulare, CSV-Verarbeitung, Grenzwerttests, Bitoperationen.',
    intro: [['p', 'Sie entwickeln bei der **Saxon Apps GmbH** die Plattform **VeloCity 2.0** für den Bikesharing-Anbieter **VeloCity Leipzig GmbH** (1.800 Räder, 260 Stationen).'],
      ['kv', [['Tarif', '1,00 Euro für die ersten **30 Minuten**, danach **0,50 Euro je angefangene 15 Minuten**. Je Ausleihe höchstens **15,00 Euro**.'], ['Abo-Kunden', 'zahlen **1,00 Euro weniger** (nie unter 0). Der Höchstpreis gilt **vor** dem Abzug.'], ['Dauer', 'wird in ganzen Minuten übergeben (mindestens 1)']]]]});
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Tarife und Auswertungen (25 Punkte)',
    tasks: [
      {pts: 8, rows: 12, topic: 'Algorithmus entwickeln', q: 'Entwickeln Sie die Funktion **preis(minuten, abo)** nach dem Tarif in der Ausgangssituation. Bei minuten < 1 soll eine Ausnahme bzw. ein Fehler ausgelöst werden. Hinweis: Die Anzahl angefangener 15-Minuten-Blöcke berechnen Sie zum Beispiel mit aufrunden(x / 15) oder (x + 14) DIV 15.',
        a: [['codes', [['pseudo', `funktion preis(minuten, abo)
    wenn minuten < 1 dann
        fehler "ungültige Dauer"
    ende wenn
    p = 1.00
    wenn minuten > 30 dann
        bloecke = (minuten - 30 + 14) DIV 15      // angefangene 15 Minuten
        p = p + bloecke * 0.50
    ende wenn
    wenn p > 15.00 dann
        p = 15.00
    ende wenn
    wenn abo dann
        p = max(0, p - 1.00)
    ende wenn
    rückgabe p
ende funktion`], ['java', `static double preis(int minuten, boolean abo) {
    if (minuten < 1) throw new IllegalArgumentException("ungültige Dauer");
    double p = 1.00;
    if (minuten > 30) {
        int bloecke = (minuten - 30 + 14) / 15;   // Ganzzahldivision = aufrunden
        p += bloecke * 0.50;
    }
    p = Math.min(p, 15.00);
    if (abo) p = Math.max(0, p - 1.00);
    return p;
}`], ['python', `import math

def preis(minuten, abo):
    if minuten < 1:
        raise ValueError("ungültige Dauer")
    p = 1.00
    if minuten > 30:
        p += math.ceil((minuten - 30) / 15) * 0.50
    p = min(p, 15.00)
    if abo:
        p = max(0, p - 1.00)
    return p`]]],
          'Bewertung: Fehlerfall (1 P), Grundpreis (1 P), Blockberechnung mit Aufrunden (3 P), Deckelung (1 P), Abo-Abzug nach Deckelung und nicht negativ (2 P).', 'Kontrolle: preis(42, false) = 1,00 + 1 x 0,50 = **1,50**; preis(80, false) = 1,00 + 4 x 0,50 = **3,00**; preis(15, true) = **0,00**.'],
        sol: [['chart', {kind: 'line', w: 720, h: 280, labels: ['1', '30', '31', '45', '46', '60', '61', '120', '240', '435', '436', '600'], series: [{n: 'Normaltarif (Euro)', d: [1, 1, 1.5, 1.5, 2, 2, 2.5, 4, 8, 14.5, 15, 15], k: 'accent'}, {n: 'Abo (Euro)', d: [0, 0, 0.5, 0.5, 1, 1, 1.5, 3, 7, 13.5, 14, 14], k: 'ok'}], ymax: 16, yl: 'Euro', cap: 'Tarifkurve (Minuten auf der Achse nicht maßstäblich): Stufen alle 15 Minuten, Deckel bei 15 Euro ab 436 Minuten'}]],
        see: ['eua-algoexam', 'eua-kontroll']},
      {pts: 7, rows: 11, topic: 'Struktogramm umsetzen', q: 'Setzen Sie das Struktogramm in Programmcode um. Ein Rad hat die Attribute id und akku (Prozent). Geben Sie außerdem das Ergebnis für raeder = [(11, 15), (12, 80), (13, 19), (14, 55)] an.',
        ctx: [['diagram', AP2.dg.nsd([['act', 'ladeliste = leere Liste'], ['act', 'summe = 0'], ['for', 'für jedes rad in raeder', [['act', 'summe = summe + rad.akku'], ['if', 'rad.akku < 20 ?', [['act', 'ladeliste.hinzufügen(rad.id)']], [['act', '–']]]]],
          ['if', 'länge(raeder) > 0 ?', [['act', 'schnitt = summe / länge(raeder)']], [['act', 'schnitt = 0']]], ['act', 'rückgabe ladeliste, schnitt']], {w: 600, cap: 'Struktogramm ladeAuswertung(raeder)'})]],
        a: [['codes', [['java', `static Object[] ladeAuswertung(List<Rad> raeder) {
    List<Integer> ladeliste = new ArrayList<>();
    int summe = 0;
    for (Rad rad : raeder) {
        summe += rad.getAkku();
        if (rad.getAkku() < 20) {
            ladeliste.add(rad.getId());
        }
    }
    double schnitt = raeder.size() > 0 ? (double) summe / raeder.size() : 0;
    return new Object[]{ladeliste, schnitt};   // oder eigene Ergebnisklasse
}`], ['python', `def lade_auswertung(raeder):
    ladeliste = []
    summe = 0
    for rad in raeder:
        summe += rad.akku
        if rad.akku < 20:
            ladeliste.append(rad.id)
    schnitt = summe / len(raeder) if len(raeder) > 0 else 0
    return ladeliste, schnitt`]]],
          'Ergebnis: ladeliste = **[11, 13]**, schnitt = (15 + 80 + 19 + 55) / 4 = 169 / 4 = **42,25**.', 'Bewertung: Initialisierung (1 P), Schleife mit Summe (2 P), Bedingung und Liste (2 P), Division mit Schutz vor 0 und ohne Ganzzahldivision (1 P), Ergebnis (1 P).'],
        see: ['ps-struktogramm', 'eua-kontroll']},
      {pts: 6, rows: 9, topic: 'Fehlersuche', q: 'Ein Kollege hat Selection Sort implementiert, um Räder nach Akkustand aufsteigend zu sortieren. Das Programm sortiert falsch und stürzt manchmal ab. a) Finden Sie die **zwei Fehler** und geben Sie die korrigierten Zeilen an. b) Geben Sie für das korrigierte Programm das Feld nach jedem Durchlauf der äußeren Schleife an: a = [42, 7, 93, 15, 7].',
        ctx: [['code', 'pseudo', ` 1  funktion selectionSort(a)
 2      für i = 0 bis länge(a) - 2
 3          min = i
 4          für j = i + 1 bis länge(a) - 2
 5              wenn a[j] < a[min] dann
 6                  min = a[j]
 7              ende wenn
 8          ende für
 9          tausche a[i] mit a[min]
10      ende für
11  ende funktion`]],
        a: ['a) **Zeile 4:** Die innere Schleife muss bis **länge(a) - 1** laufen, sonst wird das letzte Element nie verglichen. **Zeile 6:** Es muss der **Index** gemerkt werden: **min = j**. Mit min = a[j] wird ein Wert als Index benutzt: falsche Vergleiche und Zugriff außerhalb des Feldes (Absturz bei Werten ≥ länge(a)).',
          ['table', ['Durchlauf i', 'gefundenes Minimum', 'Feld danach'], [['Start', '-', '42, 7, 93, 15, 7'], ['0', '7 an Index 1', '**7**, 42, 93, 15, 7'], ['1', '7 an Index 4', '7, **7**, 93, 15, 42'], ['2', '15 an Index 3', '7, 7, **15**, 93, 42'], ['3', '42 an Index 4', '7, 7, 15, **42**, 93']]],
          'Bewertung: je Fehler mit Korrektur 1,5 P, Durchläufe 3 P.'],
        sol: [['walk', {t: 'Selection Sort nach der Korrektur', steps: [
          {t: '**Start:** Nichts ist sortiert.', b: [bars([42, 7, 93, 15, 7], 0, 'Ausgangsfeld')]},
          {t: '**i = 0:** Minimum im ganzen Feld ist 7 (Index 1, die erste 7 wegen echtem <). Tausch mit Index 0.', b: [bars([7, 42, 93, 15, 7], 1, 'Index 0 fertig')]},
          {t: '**i = 1:** Minimum in Index 1 bis 4 ist die 7 an Index 4. Hier sieht man, warum Zeile 4 wichtig ist: Ohne den Vergleich mit dem letzten Element bliebe diese 7 hinten.', b: [bars([7, 7, 93, 15, 42], 2, 'Index 0 und 1 fertig')]},
          {t: '**i = 2:** Minimum 15 an Index 3, Tausch mit 93.', b: [bars([7, 7, 15, 93, 42], 3, 'drei fertig')]},
          {t: '**i = 3:** Minimum 42, Tausch mit 93. Das letzte Element ist automatisch richtig. Laufzeit immer **O(n²)** Vergleiche, aber höchstens n - 1 Tausche; das Verfahren ist **nicht stabil**.', b: [bars([7, 7, 15, 42, 93], 5, 'sortiert'), ['tool', 'sort']]},
        ]}]],
        see: ['eua-sortieren', 'eua-debugging']},
      {pts: 4, topic: 'Rekursion', q: 'Gegeben ist die rekursive Funktion f. a) Berechnen Sie f(84, 36) und geben Sie alle Aufrufe an. b) Was berechnet die Funktion, und wie heißt das Verfahren? c) Wodurch ist sichergestellt, dass die Rekursion endet?',
        ctx: [['code', 'pseudo', `funktion f(a, b)
    wenn b = 0 dann
        rückgabe a
    sonst
        rückgabe f(b, a MOD b)
    ende wenn
ende funktion`]],
        a: ['a) f(84, 36) → f(36, 84 MOD 36 = 12) → f(12, 36 MOD 12 = 0) → **12** (3 Aufrufe).', 'b) Den **größten gemeinsamen Teiler (ggT)**, nach dem **euklidischen Algorithmus**.', 'c) **Abbruchbedingung** b = 0; da a MOD b immer kleiner als b ist, wird der zweite Parameter bei jedem Aufruf echt kleiner und erreicht nach endlich vielen Schritten 0.'],
        sol: [['diagram', AP2.dg.col(['f(84, 36)', 'f(36, 12)', 'f(12, 0)  →  12'], {w: 420, bw: 220, styles: ['accent', 'accent', 'ok'], edgeText: ['84 MOD 36 = 12', '36 MOD 12 = 0'], cap: 'Aufrufkette; das Ergebnis 12 wird unverändert zurückgegeben (Endrekursion)'})]],
        see: ['eua-rekursion']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Objektorientierte Umsetzung (25 Punkte)',
    ctx: [['h3', 'Anlage: Quellcode (Auszug)'], ['code', 'java', `interface Ladbar {
    int getAkku();
    void laden(int prozent);
}

abstract class Rad {
    private final int id;
    protected double kmStand;
    private static int anzahl = 0;

    public Rad(int id) { this.id = id; anzahl++; }
    public int getId() { return id; }
    public static int getAnzahl() { return anzahl; }
    public abstract double preisfaktor();
}

class EBike extends Rad implements Ladbar {
    private int akku;
    public EBike(int id, int akku) { super(id); this.akku = akku; }
    public int getAkku() { return akku; }
    public void laden(int prozent) { akku = Math.min(100, akku + prozent); }
    public double preisfaktor() { return 1.5; }
}

class Station {
    private String name;
    private int kapazitaet;
    private List<Rad> raeder = new ArrayList<>();
    public Rad ausleihen(int radId) throws RadNichtGefundenException { /* Aufgabe 2.2 */ }
    public void zurueckgeben(Rad r) throws StationVollException { /* Aufgabe 2.2 */ }
}`]],
    tasks: [
      {pts: 6, rows: 9, topic: 'UML aus Code', q: 'Erstellen Sie zum Quellcode der Anlage ein **UML-Klassendiagramm** mit Sichtbarkeiten, Datentypen, abstrakten und statischen Elementen sowie allen Beziehungen.',
        a: ['- **Ladbar** als «interface» mit + getAkku(): int und + laden(prozent: int).', '- **Rad** abstrakt («abstract» oder kursiv): - id: int {readOnly}, **# kmStand: double** (protected = #), - anzahl: int **unterstrichen** (static), + Rad(id: int), + getId(): int, + getAnzahl(): int (unterstrichen), + preisfaktor(): double {abstract}.', '- **EBike** erbt von Rad (durchgezogene Linie, leeres Dreieck) und **realisiert** Ladbar (gestrichelt, leeres Dreieck); - akku: int.', '- **Station** (- name: String, - kapazitaet: int) mit **Aggregation** zu Rad: Station 0..1 ◇ 0..* Rad (Räder existieren auch ohne Station, zum Beispiel während der Fahrt).', 'Bewertung: Klassen und Interface (2 P), Sichtbarkeiten, static, abstract (2 P), Vererbung und Realisierung (1 P), Aggregation mit Multiplizitäten (1 P).'],
        sol: [['diagram', {w: 860, h: 400, keep: 700, cap: 'Musterlösung (statische Elemente sind im UML unterstrichen, hier mit dem Hinweis {static})', nodes: [
          {id: 'l', k: 'cls', x: 700, y: 70, w: 230, s: 'accent', t: {name: ['«interface»', 'Ladbar'], ops: ['+ getAkku(): int', '+ laden(prozent: int): void']}},
          {id: 'r', k: 'cls', x: 300, y: 100, w: 300, t: {name: ['«abstract»', 'Rad'], attrs: ['- id: int {readOnly}', '# kmStand: double', '- anzahl: int {static}'], ops: ['+ Rad(id: int)', '+ getId(): int', '+ getAnzahl(): int {static}', '+ preisfaktor(): double {abstract}']}},
          {id: 'e', k: 'cls', x: 500, y: 320, w: 260, t: {name: 'EBike', attrs: ['- akku: int'], ops: ['+ EBike(id: int, akku: int)', '+ getAkku(): int', '+ laden(prozent: int): void', '+ preisfaktor(): double']}},
          {id: 's', k: 'cls', x: 100, y: 330, w: 200, t: {name: 'Station', attrs: ['- name: String', '- kapazitaet: int'], ops: ['+ ausleihen(radId: int): Rad', '+ zurueckgeben(r: Rad): void']}},
        ], edges: [{a: 'e', b: 'r', ea: 'tri', via: [[500, 245], [380, 245]]}, {a: 'e', b: 'l', k: 'dash', ea: 'tri', via: [[700, 320]]}, {a: 's', b: 'r', sa: 'dia', ea: 'none', ta: '0..1', tb: '0..*', via: [[100, 160]]}]}]],
        see: ['eua-umlcode', 'ps-klassen']},
      {pts: 8, rows: 14, topic: 'Methoden mit Exceptions', q: 'Implementieren Sie in Station die Methoden **ausleihen(radId)** (sucht das Rad, entfernt es aus der Liste und gibt es zurück; ist es nicht vorhanden, wird eine **RadNichtGefundenException** geworfen) und **zurueckgeben(r)** (fügt das Rad hinzu; ist die Kapazität erreicht, wird eine **StationVollException** geworfen). Implementieren Sie auch die Klasse StationVollException.',
        a: [['codes', [['java', `class StationVollException extends Exception {
    public StationVollException(String station) {
        super("Station " + station + " ist voll");
    }
}

public Rad ausleihen(int radId) throws RadNichtGefundenException {
    for (int i = 0; i < raeder.size(); i++) {
        if (raeder.get(i).getId() == radId) {
            return raeder.remove(i);           // entfernt und liefert das Rad
        }
    }
    throw new RadNichtGefundenException("Rad " + radId + " nicht an " + name);
}

public void zurueckgeben(Rad r) throws StationVollException {
    if (raeder.size() >= kapazitaet) {
        throw new StationVollException(name);
    }
    raeder.add(r);
}`], ['python', `class StationVollException(Exception):
    def __init__(self, station):
        super().__init__(f"Station {station} ist voll")

def ausleihen(self, rad_id):
    for i, rad in enumerate(self.__raeder):
        if rad.get_id() == rad_id:
            return self.__raeder.pop(i)
    raise RadNichtGefundenException(f"Rad {rad_id} nicht an {self.__name}")

def zurueckgeben(self, rad):
    if len(self.__raeder) >= self.__kapazitaet:
        raise StationVollException(self.__name)
    self.__raeder.append(rad)`], ['csharp', `class StationVollException : Exception
{
    public StationVollException(string station) : base($"Station {station} ist voll") { }
}

public Rad Ausleihen(int radId)
{
    Rad rad = raeder.Find(r => r.GetId() == radId)
              ?? throw new RadNichtGefundenException($"Rad {radId} nicht an {name}");
    raeder.Remove(rad);
    return rad;
}`]]],
          'Hinweis: In Java ist StationVollException eine **geprüfte Exception** (erbt von Exception), deshalb muss sie mit throws deklariert und vom Aufrufer behandelt werden. Nicht während einer for-each-Schleife aus der Liste entfernen (ConcurrentModificationException).', 'Bewertung: Exception-Klasse (2 P), Suche und Entfernen (3 P), Exception bei Nichtfinden (1 P), Kapazitätsprüfung und Hinzufügen (2 P).'],
        see: ['eua-exceptions', 'eua-oop']},
      {pts: 4, topic: 'Collections', q: 'Ordnen Sie jeder Anforderung die am besten geeignete Datenstruktur zu.',
        match: {keys: ['Liste (ArrayList / list)', 'Map (HashMap / dict)', 'Warteschlange (Queue / deque)', 'Menge (HashSet / set)', 'Stapel (Stack)'], items: [
          ['Kundendaten sollen über die Kundennummer in konstanter Zeit gefunden werden.', 1], ['Reservierungen für ein E-Bike werden in der Reihenfolge ihres Eingangs abgearbeitet.', 2],
          ['Die Stadtteile, in denen ein Kunde schon gefahren ist, ohne Duplikate.', 3], ['Die Räder einer Station in Rückgabereihenfolge mit Zugriff über den Index.', 0],
        ]},
        a: ['**Map**: Schlüssel-Wert-Zugriff in O(1) im Mittel. **Queue**: FIFO. **Set**: keine Duplikate, schnelle Enthaltenseins-Prüfung. **Liste**: Reihenfolge und Indexzugriff. Ein **Stack** (LIFO) passt zum Beispiel zur Rückgängig-Funktion oder zur Auswertung von Klammerausdrücken.'],
        see: ['eua-listen', 'eua-hash', 'eua-stackqueue']},
      {pts: 7, rows: 7, topic: 'Programmausgabe', q: 'Welche Ausgabe erzeugt das Programm? Begründen Sie die Werte in der vierten und fünften Ausgabezeile.',
        ctx: [['code', 'java', `class Rad {
    static int anzahl = 0;
    protected String typ = "Rad";
    Rad() { anzahl++; System.out.println("Rad erstellt"); }
    double preis(int min) { return min * 0.05; }
    public String toString() { return typ + " #" + anzahl; }
}

class EBike extends Rad {
    EBike() { super(); typ = "E-Bike"; System.out.println("E-Bike erstellt"); }
    @Override double preis(int min) { return super.preis(min) * 2; }
}

public static void main(String[] args) {
    Rad a = new Rad();
    Rad b = new EBike();
    System.out.println(a + " / " + b);
    System.out.println(a.preis(20) + " " + b.preis(20));
    System.out.println(Rad.anzahl);
}`]],
        a: [['out', `Rad erstellt
Rad erstellt
E-Bike erstellt
Rad #2 / E-Bike #2
1.0 2.0
2`], '- new EBike() ruft zuerst über **super()** den Konstruktor von Rad auf ("Rad erstellt"), erst dann den Rest des EBike-Konstruktors.', '- **anzahl ist static**: Es gibt sie nur **einmal für die Klasse**. Beim Ausgeben ist sie bereits 2, deshalb zeigen **beide** Objekte "#2" (Falle!).', '- b.preis(20) nutzt dank **dynamischer Bindung** die überschriebene Methode: super.preis(20) = 1,0, mal 2 = **2.0**.', 'Bewertung: Zeilen 1 bis 3 (2 P), Zeile 4 (2 P), Zeile 5 (2 P), Zeile 6 (1 P).'],
        see: ['eua-konstruktor', 'eua-saeulen']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Datenbankabfragen (25 Punkte)',
    ctx: [['h3', 'Anlage: Tabellen mit Beispieldaten (Stand 02.11.2026, 15:00 Uhr)'],
      ['row', [['table', ['station_id', 'name', 'stadtteil'], [['1', 'Hauptbahnhof', 'Zentrum'], ['2', 'Augustusplatz', 'Zentrum'], ['3', 'Connewitzer Kreuz', 'Connewitz'], ['4', 'Plagwitz Bf', 'Plagwitz']]],
        ['table', ['kunde_id', 'name', 'abo'], [['1', 'Lena Vogel', '1'], ['2', 'Max Richter', '0'], ['3', 'Sara Ahmadi', '1'], ['4', 'Paul Schmidt', '0']]]]],
      ['table', ['rad_id', 'typ', 'station_id'], [['11', 'E-Bike', 'NULL'], ['12', 'Classic', '1'], ['13', 'E-Bike', 'NULL'], ['14', 'Classic', '3'], ['15', 'E-Bike', '4']]],
      ['table', ['ausleihe_id', 'kunde_id', 'rad_id', 'start_station', 'ziel_station', 'start_zeit', 'ende_zeit', 'preis'], [['1', '1', '12', '1', '2', '07:50', '08:05', '0.00'], ['2', '2', '14', '2', '3', '08:10', '08:52', '1.50'], ['3', '3', '15', '3', '4', '09:00', '09:41', '0.50'], ['4', '2', '12', '2', '1', '12:00', '13:20', '3.00'], ['5', '4', '11', '1', 'NULL', '14:05', 'NULL', 'NULL'], ['6', '1', '13', '4', 'NULL', '14:30', 'NULL', 'NULL']]],
      ['note', 'Alle Zeiten am 02.11.2026 (im Datenbankschema als DATETIME). Fremdschlüssel: ausleihe.kunde_id → kunde, ausleihe.rad_id → rad, ausleihe.start_station und ausleihe.ziel_station → station, rad.station_id → station.']],
    tasks: [
      {pts: 4, topic: 'JOIN mit NULL-Bedingung', q: 'Geben Sie alle **laufenden** Ausleihen aus: Kundenname, Rad-ID und Name der Startstation.',
        a: [['code', 'sql', `SELECT k.name, a.rad_id, s.name AS startstation
FROM ausleihe a
JOIN kunde k   ON k.kunde_id   = a.kunde_id
JOIN station s ON s.station_id = a.start_station
WHERE a.ende_zeit IS NULL;`], ['table', ['name', 'rad_id', 'startstation'], [['Paul Schmidt', '11', 'Hauptbahnhof'], ['Lena Vogel', '13', 'Plagwitz Bf']]], 'Falle: **= NULL** ist nie wahr; Vergleiche mit NULL immer mit **IS NULL** bzw. IS NOT NULL.'],
        see: ['eua-sqljoin', 'eua-sqlselect']},
      {pts: 5, topic: 'GROUP BY', q: 'Ermitteln Sie je **Stadtteil der Startstation** die Anzahl der **abgeschlossenen** Ausleihen und den Umsatz, nach Umsatz absteigend sortiert.',
        a: [['code', 'sql', `SELECT s.stadtteil,
       COUNT(*)     AS ausleihen,
       SUM(a.preis) AS umsatz
FROM ausleihe a
JOIN station s ON s.station_id = a.start_station
WHERE a.ende_zeit IS NOT NULL
GROUP BY s.stadtteil
ORDER BY umsatz DESC;`], ['table', ['stadtteil', 'ausleihen', 'umsatz'], [['Zentrum', '3', '4.50'], ['Connewitz', '1', '0.50']]],
          'Zentrum: Ausleihen 1 (0,00), 2 (1,50) und 4 (3,00). Plagwitz fehlt, weil die einzige dort gestartete Ausleihe (6) noch läuft.'],
        see: ['eua-sqlgroup']},
      {pts: 5, topic: 'Tabelle doppelt joinen', q: 'Erstellen Sie eine Liste aller abgeschlossenen Ausleihen mit ausleihe_id, **Name der Startstation** und **Name der Zielstation**. Wie müssten Sie die Abfrage ändern, damit auch laufende Ausleihen (ohne Ziel) erscheinen?',
        a: [['code', 'sql', `SELECT a.ausleihe_id,
       st.name AS start,
       zi.name AS ziel
FROM ausleihe a
JOIN station st ON st.station_id = a.start_station
JOIN station zi ON zi.station_id = a.ziel_station
ORDER BY a.ausleihe_id;`], ['table', ['ausleihe_id', 'start', 'ziel'], [['1', 'Hauptbahnhof', 'Augustusplatz'], ['2', 'Augustusplatz', 'Connewitzer Kreuz'], ['3', 'Connewitzer Kreuz', 'Plagwitz Bf'], ['4', 'Augustusplatz', 'Hauptbahnhof']]],
          'Die Tabelle station wird **zweimal mit verschiedenen Aliasen** eingebunden (eine Rolle je Fremdschlüssel). Der INNER JOIN auf ziel_station filtert laufende Ausleihen (NULL) heraus. Für alle Ausleihen: **LEFT JOIN station zi ...**; ziel ist dann NULL (mit COALESCE(zi.name, \'unterwegs\') lesbar).'],
        see: ['eua-sqljoin', 'eua-sqlexam']},
      {pts: 4, topic: 'Verschachtelte Aggregation', q: 'Geben Sie die Namen der Kunden aus, deren **Gesamtumsatz** über dem **durchschnittlichen Gesamtumsatz pro Kunde** liegt.',
        a: [['code', 'sql', `SELECT k.name, SUM(a.preis) AS umsatz
FROM kunde k
JOIN ausleihe a ON a.kunde_id = k.kunde_id
GROUP BY k.kunde_id, k.name
HAVING SUM(a.preis) > (
    SELECT AVG(summe)
    FROM (SELECT SUM(preis) AS summe
          FROM ausleihe
          GROUP BY kunde_id) AS je_kunde
);`], ['table', ['name', 'umsatz'], [['Max Richter', '4.50']]],
          'Umsätze je Kunde: Lena 0,00, Max 4,50, Sara 0,50, Paul NULL (nur laufende Ausleihe). **AVG ignoriert NULL**: (0 + 4,5 + 0,5) / 3 ≈ 1,67. Nur Max liegt darüber. Aggregatfunktionen lassen sich nicht direkt schachteln (AVG(SUM(...)) ist in Standard-SQL nicht erlaubt), deshalb die Unterabfrage in FROM.'],
        sol: [['walk', {t: 'Von innen nach außen', steps: [
          {t: '**Innerste Abfrage:** Summe je Kunde.', b: [['table', ['kunde_id', 'summe'], [['1', '0.00'], ['2', '4.50'], ['3', '0.50'], ['4', 'NULL']]]]},
          {t: '**AVG(summe):** NULL zählt nicht mit: 5,00 / 3 = **1,67**.', b: [['chart', {kind: 'bar', w: 560, h: 220, labels: ['Lena', 'Max', 'Sara'], series: [{n: 'Umsatz', d: [0, 4.5, 0.5], k: 'accent'}], vals: true, ymax: 5, cap: 'Nur Max liegt über dem Durchschnitt von 1,67 Euro'}]]},
          {t: '**HAVING** vergleicht jede Kundensumme mit 1,67: Ergebnis **Max Richter**.'},
        ]}]],
        see: ['eua-sqlgroup', 'eua-sqlexam']},
      {pts: 3, topic: 'ALTER TABLE', q: 'Die Tabelle rad soll die Spalte **akku_prozent** erhalten: ganze Zahl von 0 bis 100, bei klassischen Rädern leer. Schreiben Sie die Anweisung und setzen Sie für **Rad 15** den Wert 64.',
        a: [['code', 'sql', `ALTER TABLE rad
  ADD akku_prozent SMALLINT NULL
      CHECK (akku_prozent BETWEEN 0 AND 100);

UPDATE rad SET akku_prozent = 64 WHERE rad_id = 15;`], 'Ein CHECK mit NULL ist erfüllt (NULL ergibt "unbekannt", nicht "falsch"), deshalb sind klassische Räder ohne Wert zulässig.'],
        see: ['eua-sqldml']},
      {pts: 4, topic: 'NoSQL', q: 'Die GPS-Spuren jeder Fahrt (alle 10 Sekunden ein Punkt) sollen gespeichert werden. a) Warum eignet sich eine **dokumentenorientierte Datenbank** dafür besser als eine relationale Tabelle? b) Skizzieren Sie ein JSON-Dokument für eine Fahrt. c) Nennen Sie einen Nachteil.',
        a: ['a) Eine Fahrt mit allen Punkten ist **ein zusammenhängendes Dokument**, das immer als Ganzes gelesen wird (keine Joins). **Flexibles Schema** (neue Sensorfelder ohne ALTER TABLE), **horizontale Skalierung** bei sehr großen Datenmengen, schnelles Schreiben.', ['code', 'json', `{
  "ausleiheId": 4,
  "radId": 12,
  "start": "2026-11-02T12:00:00",
  "punkte": [
    { "t": "12:00:00", "lat": 51.3397, "lon": 12.3731 },
    { "t": "12:00:10", "lat": 51.3399, "lon": 12.3740, "kmh": 14.2 }
  ]
}`], 'c) Schwächere **Konsistenzgarantien** (oft BASE statt ACID), keine Fremdschlüssel, Auswertungen über viele Dokumente und Joins mit relationalen Daten sind aufwendiger, Datenredundanz.'],
        see: ['eua-nosql', 'eua-formate']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Web, Daten und Tests (25 Punkte)',
    tasks: [
      {pts: 6, rows: 10, topic: 'HTML-Formular', q: 'Erstellen Sie das HTML-Formular für die Registrierung: **Name** (Pflicht), **E-Mail** (Pflicht, als E-Mail geprüft), **Geburtsdatum** (Datumsfeld), **Tarif** als Auswahl zwischen "Basis" und "Abo", Kontrollkästchen **"Ich akzeptiere die AGB"** (Pflicht) und ein Absendeknopf. Die Daten werden per **POST** an /api/registrierung gesendet. Achten Sie auf Barrierefreiheit.',
        a: [['code', 'html', `<form action="/api/registrierung" method="post">
  <label for="name">Name</label>
  <input id="name" name="name" type="text" required autocomplete="name">

  <label for="mail">E-Mail</label>
  <input id="mail" name="email" type="email" required autocomplete="email">

  <label for="geb">Geburtsdatum</label>
  <input id="geb" name="geburtsdatum" type="date">

  <label for="tarif">Tarif</label>
  <select id="tarif" name="tarif">
    <option value="basis">Basis</option>
    <option value="abo">Abo</option>
  </select>

  <label><input type="checkbox" name="agb" required> Ich akzeptiere die AGB</label>

  <button type="submit">Registrieren</button>
</form>`], 'Bewertung: form mit action und method (1 P), passende input-Typen (2 P), required (1 P), label-Verknüpfung (1 P), select und checkbox (1 P). Wichtig: Die Prüfung im Browser ersetzt **nicht** die Prüfung auf dem Server.'],
        sol: [['result', {t: 'So sieht das Formular aus', h: 380, html: `<form>
  <label for="name">Name</label><input id="name" required>
  <label for="mail">E-Mail</label><input id="mail" type="email" required>
  <label for="geb">Geburtsdatum</label><input id="geb" type="date">
  <label for="tarif">Tarif</label><select id="tarif"><option>Basis</option><option>Abo</option></select>
  <label class="c"><input type="checkbox" required> Ich akzeptiere die AGB</label>
  <button>Registrieren</button>
</form>`, css: `form { font: 15px/1.4 system-ui, sans-serif; display: grid; gap: 4px; max-width: 320px; }
label { font-weight: 600; margin-top: 6px; } label.c { font-weight: 400; display: flex; gap: 8px; align-items: center; }
input, select { padding: 7px; font-size: 15px; border: 1px solid #777; border-radius: 6px; }
button { margin-top: 10px; padding: 9px; background: #1565c0; color: #fff; border: 0; border-radius: 6px; font-size: 15px; }`}]],
        see: ['eua-html']},
      {pts: 6, rows: 11, topic: 'CSV verarbeiten', q: 'Die Schlösser liefern einmal pro Stunde eine CSV-Datei (Trennzeichen Semikolon, erste Zeile ist die Kopfzeile). Schreiben Sie eine Funktion **akkuJeStation(zeilen)**, die eine Liste von Textzeilen erhält und je Station den **durchschnittlichen Akkustand** zurückgibt. Zeilen mit fehlendem Akkuwert werden übersprungen.',
        ctx: [['code', 'text', `rad_id;akku;station
11;15;Hauptbahnhof
13;80;Augustusplatz
15;55;Hauptbahnhof
16;;Plagwitz Bf`]],
        a: [['codes', [['python', `def akku_je_station(zeilen):
    summe, anzahl = {}, {}
    for zeile in zeilen[1:]:                 # Kopfzeile überspringen
        teile = zeile.strip().split(";")
        if len(teile) < 3 or teile[1] == "":
            continue                         # fehlender Wert
        akku, station = int(teile[1]), teile[2]
        summe[station] = summe.get(station, 0) + akku
        anzahl[station] = anzahl.get(station, 0) + 1
    return {s: summe[s] / anzahl[s] for s in summe}`], ['java', `static Map<String, Double> akkuJeStation(List<String> zeilen) {
    Map<String, Integer> summe = new HashMap<>(), anzahl = new HashMap<>();
    for (String zeile : zeilen.subList(1, zeilen.size())) {
        String[] t = zeile.trim().split(";", -1);
        if (t.length < 3 || t[1].isEmpty()) continue;
        int akku = Integer.parseInt(t[1]);
        summe.merge(t[2], akku, Integer::sum);
        anzahl.merge(t[2], 1, Integer::sum);
    }
    Map<String, Double> schnitt = new HashMap<>();
    for (String s : summe.keySet()) schnitt.put(s, (double) summe.get(s) / anzahl.get(s));
    return schnitt;
}`]]], 'Ergebnis für das Beispiel: **Hauptbahnhof 35,0**, **Augustusplatz 80,0**; Plagwitz Bf erscheint nicht (kein gültiger Wert).', 'Bewertung: Kopfzeile überspringen (1 P), Zerlegen (1 P), fehlende Werte überspringen (1 P), Summen und Zähler je Station in einer Map (2 P), Durchschnitt (1 P).'],
        sol: [['out', `{'Hauptbahnhof': 35.0, 'Augustusplatz': 80.0}`], ['tip', 'In Java liefert "16;;Plagwitz Bf".split(";") zwar drei Teile, endet eine Zeile aber mit leeren Feldern, fallen diese ohne den Parameter -1 weg. Deshalb split(";", -1).']],
        see: ['eua-dateien', 'eua-formate']},
      {pts: 7, rows: 9, topic: 'Grenzwerttests', q: 'Erstellen Sie für preis(minuten, abo) aus Aufgabe 1.1 eine Testfalltabelle mit **mindestens sechs Grenzwert-Testfällen** (Eingaben und erwartetes Ergebnis), darunter der Übergang zur Deckelung und der Abo-Fall. Ist dieser Test ein Black-Box- oder ein White-Box-Test? Begründen Sie.',
        a: [['table', ['Nr.', 'minuten', 'abo', 'erwartet', 'Grenze'], [['1', '0', 'false', 'Fehler', 'unterhalb gültig'], ['2', '1', 'false', '1,00', 'kleinste gültige Dauer'], ['3', '30', 'false', '1,00', 'Ende Grundpreis'], ['4', '31', 'false', '1,50', 'erster Zusatzblock'], ['5', '45', 'false', '1,50', 'Ende erster Block'], ['6', '46', 'false', '2,00', 'zweiter Block'], ['7', '435', 'false', '14,50', 'letzte Stufe vor dem Deckel'], ['8', '436', 'false', '15,00', 'Deckel erreicht'], ['9', '20', 'true', '0,00', 'Abo, nie negativ'], ['10', '500', 'true', '14,00', 'Deckel vor Abo-Abzug']]],
          'Es ist ein **Black-Box-Test**: Die Testfälle werden aus der **Spezifikation** (Tarifbeschreibung) mit Äquivalenzklassen und Grenzwerten abgeleitet, ohne den Quellcode zu kennen. Ein White-Box-Test orientiert sich an der Programmstruktur (Anweisungs-, Zweigüberdeckung).', 'Bewertung: sechs korrekte Testfälle (je 0,75 P, darunter Deckel und Abo), Black-Box mit Begründung (2,5 P).'],
        sol: [['ex', 'Rechenweg für 435 Minuten: 435 - 30 = 405 Minuten; 405 / 15 = 27 Blöcke (genau, nicht aufgerundet); 1,00 + 27 x 0,50 = 14,50 Euro. Bei 436 Minuten sind es 28 Blöcke: 15,00 Euro, also genau der Deckel.']],
        see: ['eua-testfaelle', 'eua-unittest', 'ps-testarten']},
      {pts: 6, rows: 8, topic: 'Bitoperationen', q: 'Jedes Schloss meldet seinen Zustand in einem **Statusbyte**: Bit 0 verriegelt, Bit 1 Akku niedrig, Bit 2 GPS-Empfang, Bit 3 Sabotagealarm, Bit 4 Wartung nötig, Bit 5 LTE verbunden, Bit 6 lädt, Bit 7 reserviert. Empfangen wird **0x2D**. a) Wandeln Sie den Wert in Binär- und Dezimaldarstellung um und geben Sie alle gesetzten Zustände an. b) Geben Sie Ausdrücke an, mit denen Sie prüfen, ob der Sabotagealarm gesetzt ist, und mit denen Sie Bit 1 setzen und Bit 3 löschen. Welche Werte entstehen jeweils?',
        a: ['a) 0x2D = 2 · 16 + 13 = **45** = **0010 1101**. Gesetzt sind Bit 0 (**verriegelt**), Bit 2 (**GPS-Empfang**), Bit 3 (**Sabotagealarm**) und Bit 5 (**LTE verbunden**).', ['code', 'java', `boolean sabotage = (status & 0x08) != 0;   // 0010 1101 & 0000 1000 = 0000 1000 -> true
int mitAkkuWarnung = status | 0x02;         // 0010 1111 = 0x2F = 47
int ohneAlarm      = status & ~0x08;        // 0010 0101 = 0x25 = 37`],
          'Bewertung: Umrechnung (2 P), Zustände (1 P), Prüfen mit UND-Maske (1 P), Setzen mit ODER (1 P), Löschen mit UND und invertierter Maske (1 P).'],
        sol: [['table', ['Bit', '7', '6', '5', '4', '3', '2', '1', '0'], [['Wertigkeit', '128', '64', '32', '16', '8', '4', '2', '1'], ['0x2D', '0', '0', '**1**', '0', '**1**', '**1**', '0', '**1**'], ['Bedeutung', 'res.', 'lädt', '**LTE**', 'Wartung', '**Sabotage**', '**GPS**', 'Akku niedrig', '**verriegelt**']]], ['tool', 'bin']],
        see: ['eua-bits']},
    ],
  });
  AP2.exam.end(ID);
})();
