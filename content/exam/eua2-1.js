AP2.page('exam2-eua', {b: 'exam', g: 'Probeprüfung 2 (Katalog 2025)', t: 'Entwicklung und Umsetzung von Algorithmen: Ladesäulen-Plattform', blocks: []});
AP2.exam.start('exam2-eua', {minutes: 90, hint: 'Bearbeitungszeit 90 Minuten, 100 Punkte, vier Handlungsschritte. Programmieraufgaben dürfen in Java, C#, Python oder Pseudocode gelöst werden; die Syntax muss nicht perfekt sein, die Logik muss stimmen. Ausgangslage wie Probeprüfung 2 PS: Plattform der VoltWerk GmbH für Ladesäulen und Photovoltaik.'});
AP2.exam.part('exam2-eua', {
  t: 'Handlungsschritt 1: Messwerte auswerten (25 Punkte)',
  intro: 'Jede Ladesäule liefert stündlich die abgegebene Energie in kWh. Die Werte eines Tages stehen in einem Array messwerte mit 24 Einträgen (Index 0 bis 23). Fehlerhafte Messungen sind als -1 gespeichert.',
  tasks: [
    {pts: 12, rows: 12, q: 'Entwickeln Sie eine Funktion auswerten(messwerte), die die gültigen Werte (größer oder gleich 0) berücksichtigt und Folgendes ausgibt: die Tagessumme, den Höchstwert mit der zugehörigen Stunde, den Durchschnitt der gültigen Werte und die Anzahl fehlerhafter Messungen. Sind alle Werte fehlerhaft, soll "keine gültigen Daten" ausgegeben werden.',
      a: [['code', 'pseudo', `FUNKTION auswerten(messwerte: Array von Kommazahl)
    summe := 0
    anzahlGueltig := 0
    fehler := 0
    maxWert := -1
    maxStunde := -1
    FÜR i := 0 BIS 23
        FALLS messwerte[i] < 0 DANN
            fehler := fehler + 1
        SONST
            summe := summe + messwerte[i]
            anzahlGueltig := anzahlGueltig + 1
            FALLS messwerte[i] > maxWert DANN
                maxWert := messwerte[i]
                maxStunde := i
            ENDE FALLS
        ENDE FALLS
    ENDE FÜR
    FALLS anzahlGueltig = 0 DANN
        AUSGABE "keine gültigen Daten"
    SONST
        AUSGABE "Summe: ", summe
        AUSGABE "Maximum: ", maxWert, " um ", maxStunde, " Uhr"
        AUSGABE "Durchschnitt: ", summe / anzahlGueltig
        AUSGABE "Fehlerhafte Messungen: ", fehler
    ENDE FALLS
ENDE FUNKTION`], 'Bewertung: Schleife (2), Fehlerprüfung und Zähler (3), Summe und Maximum mit Stunde (3), Durchschnitt nur über gültige Werte (2), Sonderfall alle fehlerhaft (2).']},
    {pts: 7, q: 'Führen Sie für die ersten sechs Werte [3.5, -1, 7.0, 7.0, 2.0, 9.5] einen Schreibtischtest durch (Werte von summe, anzahlGueltig, fehler, maxWert, maxStunde nach jedem Durchlauf).',
      a: [['table', ['i', 'Wert', 'summe', 'anzahlGueltig', 'fehler', 'maxWert', 'maxStunde'], [['0', '3.5', '3.5', '1', '0', '3.5', '0'], ['1', '-1', '3.5', '1', '1', '3.5', '0'], ['2', '7.0', '10.5', '2', '1', '7.0', '2'], ['3', '7.0', '17.5', '3', '1', '7.0', '2 (nicht größer)'], ['4', '2.0', '19.5', '4', '1', '7.0', '2'], ['5', '9.5', '29.0', '5', '1', '9.5', '5']]], 'Wichtig: Bei gleichem Wert (i = 3) bleibt die erste Stunde stehen, weil mit "größer" und nicht "größer gleich" verglichen wird.']},
    {pts: 6, q: 'Die Werte sollen absteigend sortiert für einen Bericht ausgegeben werden. Welches Sortierverfahren empfehlen Sie für 24 Werte, welches für mehrere Millionen Datensätze, wenn die Sortierung stabil sein soll und zusätzlicher Speicher vorhanden ist? Nennen Sie jeweils die Zeitkomplexität im Worst Case.',
      a: ['- 24 Werte: ein **einfaches Verfahren** wie Insertion Sort oder Bubble Sort genügt (stabil, leicht nachvollziehbar), Worst Case **O(n²)**, bei n = 24 unerheblich.', '- Millionen Datensätze, stabil, Speicher vorhanden: **Mergesort**, Worst Case **O(n log n)**, stabil, benötigt O(n) Zusatzspeicher. (Quicksort ist im Mittel schnell, aber nicht stabil und im Worst Case O(n²).)']},
  ],
});
AP2.exam.part('exam2-eua', {
  t: 'Handlungsschritt 2: Objektorientiert umsetzen (25 Punkte)',
  tasks: [
    {pts: 10, rows: 10, q: 'Erstellen Sie ein UML-Klassendiagramm: Eine abstrakte Klasse **Anlage** hat eine ID (String) und einen Standort (String) und eine abstrakte Methode berechneLeistung(): double. **Ladesaeule** und **PVAnlage** erben von Anlage. Eine Ladesäule hat eine maximale Ladeleistung in kW, eine PV-Anlage eine Modulfläche in m² und einen Wirkungsgrad. Ladesäulen implementieren zusätzlich das Interface **Abrechenbar** mit der Methode preis(kwh: double): double. Ein **Standort** besteht aus mindestens einer Anlage; wird der Standort gelöscht, existieren seine Anlagen nicht weiter. Attribute sind privat, mit get-Methoden.',
      a: ['- **Anlage** (abstrakt, kursiv oder {abstract}): - id: String, - standort: String; + getId(): String; + berechneLeistung(): double (abstrakt)', '- **Ladesaeule**: - maxKw: double; + berechneLeistung(): double; + preis(kwh: double): double. Generalisierung zu Anlage (Pfeil mit hohler Dreiecksspitze).', '- **PVAnlage**: - flaeche: double, - wirkungsgrad: double; + berechneLeistung(): double. Generalisierung zu Anlage.', '- **«interface» Abrechenbar**: + preis(kwh: double): double. Realisierung von Ladesaeule (gestrichelter Pfeil mit hohler Dreiecksspitze).', '- **Standort** mit **Komposition** (gefüllte Raute am Standort) zu Anlage, Multiplizität Standort **1**, Anlage **1..***.']},
    {pts: 8, q: 'Implementieren Sie die Klasse Ladesaeule in einer Programmiersprache Ihrer Wahl. berechneLeistung() liefert die maximale Ladeleistung, preis(kwh) berechnet kwh mal 0,49 Euro, mindestens aber 1,00 Euro.',
      a: [['code', 'java', `public class Ladesaeule extends Anlage implements Abrechenbar {
    private double maxKw;

    public Ladesaeule(String id, String standort, double maxKw) {
        super(id, standort);          // Konstruktor der Oberklasse
        this.maxKw = maxKw;
    }

    @Override
    public double berechneLeistung() {
        return maxKw;
    }

    @Override
    public double preis(double kwh) {
        return Math.max(kwh * 0.49, 1.00);
    }
}`]]},
    {pts: 7, q: 'Ein Kollege hat eine Klasse Konfiguration geschrieben, von der es im ganzen Programm genau ein Objekt geben soll. Prüfen Sie den Code und korrigieren Sie ihn zu einem korrekten Singleton.',
      ctx: [['code', 'java', `public class Konfiguration {
    public Konfiguration instanz = null;
    public Konfiguration() { }
    public static Konfiguration getInstanz() {
        instanz = new Konfiguration();
        return instanz;
    }
}`]],
      a: ['Fehler: Das Attribut ist **nicht static** (kann in der statischen Methode nicht verwendet werden) und **öffentlich**; der Konstruktor ist **public**, also kann jeder weitere Objekte erzeugen; getInstanz() erzeugt **bei jedem Aufruf** ein neues Objekt.', ['code', 'java', `public class Konfiguration {
    private static Konfiguration instanz = null;
    private Konfiguration() { }
    public static Konfiguration getInstanz() {
        if (instanz == null) {
            instanz = new Konfiguration();
        }
        return instanz;
    }
}`]]},
  ],
});
AP2.exam.part('exam2-eua', {
  t: 'Handlungsschritt 3: Datenbankabfragen (30 Punkte)',
  intro: 'Tabellen (Primärschlüssel unterstrichen gedacht): kunde(kunde_id, name, ort), saeule(saeule_id, standort, max_kw), ladevorgang(lv_id, kunde_id, saeule_id, beginn, kwh, betrag). kunde_id und saeule_id in ladevorgang sind Fremdschlüssel.',
  tasks: [
    {pts: 6, q: 'Geben Sie für jeden Kunden den Namen und die Summe der geladenen kWh aus, absteigend sortiert. Kunden ohne Ladevorgang sollen mit 0 erscheinen.',
      a: [['code', 'sql', `SELECT k.name, COALESCE(SUM(l.kwh), 0) AS kwh_gesamt
FROM kunde k
LEFT JOIN ladevorgang l ON l.kunde_id = k.kunde_id
GROUP BY k.kunde_id, k.name
ORDER BY kwh_gesamt DESC;`], 'Punkte: LEFT JOIN (2), SUM mit GROUP BY (2), COALESCE bzw. 0 für NULL (1), ORDER BY DESC (1).']},
    {pts: 5, q: 'Ermitteln Sie alle Standorte, an denen insgesamt mehr als 500 Euro umgesetzt wurden, mit der Umsatzsumme.',
      a: [['code', 'sql', `SELECT s.standort, SUM(l.betrag) AS umsatz
FROM saeule s
JOIN ladevorgang l ON l.saeule_id = s.saeule_id
GROUP BY s.standort
HAVING SUM(l.betrag) > 500;`]]},
    {pts: 5, q: 'Geben Sie alle Ladevorgänge aus, deren Betrag über dem Durchschnitt aller Ladevorgänge liegt.',
      a: [['code', 'sql', `SELECT lv_id, kunde_id, betrag
FROM ladevorgang
WHERE betrag > (SELECT AVG(betrag) FROM ladevorgang);`]]},
    {pts: 6, q: 'Erstellen Sie eine View v_saeulen_nutzung für den Kundenservice, die nur Säulen-ID, Standort und die Anzahl der Ladevorgänge je Säule zeigt, und geben Sie dem Benutzer service nur Leserechte auf diese View.',
      a: [['code', 'sql', `CREATE VIEW v_saeulen_nutzung AS
SELECT s.saeule_id, s.standort, COUNT(l.lv_id) AS anzahl
FROM saeule s
LEFT JOIN ladevorgang l ON l.saeule_id = s.saeule_id
GROUP BY s.saeule_id, s.standort;

GRANT SELECT ON v_saeulen_nutzung TO service;`], 'Der View-Name ist frei wählbar. Leserecht nur auf die View, nicht auf die Basistabellen (Datenschutz).']},
    {pts: 8, q: 'Ein Kunde soll gelöscht werden. Seine Ladevorgänge müssen aus steuerlichen Gründen erhalten bleiben, aber ohne Kundenbezug. a) Wie muss der Fremdschlüssel definiert sein? b) Schreiben Sie eine Transaktion, die den Kunden 4711 löscht und vorher alle seine offenen Beträge (betrag IS NULL) auf 0 setzt; bei einem Fehler soll alles rückgängig gemacht werden. c) Welches ACID-Prinzip stellt sicher, dass nicht nur einer der beiden Befehle ausgeführt wird?',
      a: ['a) **FOREIGN KEY (kunde_id) REFERENCES kunde (kunde_id) ON DELETE SET NULL** (kunde_id in ladevorgang muss NULL erlauben).', ['code', 'sql', `START TRANSACTION;
UPDATE ladevorgang SET betrag = 0
WHERE kunde_id = 4711 AND betrag IS NULL;
DELETE FROM kunde WHERE kunde_id = 4711;
COMMIT;
-- bei Fehler stattdessen: ROLLBACK;`], 'c) **Atomarität (Atomicity)**: alles oder nichts.']},
  ],
});
AP2.exam.part('exam2-eua', {
  t: 'Handlungsschritt 4: Testen und Eingaben prüfen (20 Punkte)',
  tasks: [
    {pts: 8, q: 'In der App kann der Kunde eine Ladeleistung wählen. Erlaubt sind ganze Zahlen von 4 bis 22 kW; bei Schnellladesäulen 50 bis 150 kW. Bilden Sie Äquivalenzklassen für die Eingabe an einer normalen Säule (4 bis 22) und geben Sie Grenzwert-Testfälle an.',
      a: ['- Gültige Klasse: **4 bis 22** (Repräsentant 11).', '- Ungültig: **kleiner als 4** (Repräsentant 2), **größer als 22** (Repräsentant 30), **keine ganze Zahl** (7,5), **keine Zahl / leer** ("abc", leer).', '- Grenzwerte: **3, 4, 22, 23** (und gegebenenfalls 5 und 21).']},
    {pts: 8, q: 'Kundennummern sind 8-stellig und enden mit einer Prüfziffer nach dem Luhn-Verfahren. Prüfen Sie, ob 4539 1488 (Prüfziffer ist die letzte 8) gültig ist, und beschreiben Sie den Rechenweg.',
      a: ['Ohne Prüfziffer: 4 5 3 9 1 4 8. Von **rechts** beginnend jede zweite Ziffer verdoppeln (8, 1, 3, 4 werden verdoppelt):', '- 8 mal 2 = 16, minus 9 = **7**; 4 bleibt **4**; 1 mal 2 = **2**; 9 bleibt **9**; 3 mal 2 = **6**; 5 bleibt **5**; 4 mal 2 = **8**.', 'Summe: 7 + 4 + 2 + 9 + 6 + 5 + 8 = **41**. Prüfziffer = (10 - 41 mod 10) mod 10 = **9**.', 'Die angegebene Prüfziffer ist 8, also ist die Kundennummer **ungültig** (vermutlich Tippfehler).']},
    {pts: 4, q: 'Erklären Sie den Unterschied zwischen einem Modultest und einem Integrationstest am Beispiel der Plattform.',
      a: ['- **Modultest:** prüft eine einzelne Einheit isoliert, zum Beispiel die Methode preis() der Klasse Ladesaeule mit festen Eingaben (Abhängigkeiten durch Stubs/Mocks ersetzt).', '- **Integrationstest:** prüft das Zusammenspiel mehrerer Komponenten, zum Beispiel ob ein Ladevorgang aus der App über die API in der Datenbank landet und im Dashboard erscheint.']},
  ],
});
AP2.exam.end('exam2-eua');
