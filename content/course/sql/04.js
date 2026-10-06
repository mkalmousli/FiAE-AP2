AP2.page('course-sql-04', {
  b: 'course', g: 'SQL', t: 'SQL 4: Aggregatfunktionen, GROUP BY und HAVING',
  d: '**Aggregatfunktionen** fassen viele Zeilen zu einem Wert zusammen: `COUNT` (Anzahl), `SUM` (Summe), `AVG` (Durchschnitt), `MIN`, `MAX`. Ohne `GROUP BY` entsteht **eine** Ergebniszeile für die ganze (gefilterte) Tabelle. Mit `GROUP BY spalte` bildet SQL **Gruppen** gleicher Werte und berechnet die Aggregate **je Gruppe**. `HAVING` filtert anschließend die **Gruppen** (zum Beispiel nur Kunden mit mehr als 10 Bestellungen), während `WHERE` die einzelnen Zeilen **vor** dem Gruppieren filtert.',
  m: '**Reihenfolge: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.** **Jede Spalte im SELECT, die nicht in einer Aggregatfunktion steht, muss ins GROUP BY.** **WHERE kennt keine Aggregate, HAVING schon.** **COUNT(*) zählt Zeilen, COUNT(spalte) nur Nicht-NULL-Werte, COUNT(DISTINCT x) verschiedene Werte.**',
  cheat: [
    ['Aggregate', ['`COUNT(*)`, `COUNT(spalte)`', '`SUM(preis)`', '`AVG(note)`', '`MIN(datum)`, `MAX(preis)`']],
    ['Gruppieren', ['`GROUP BY kategorie`', '`GROUP BY a, b` (Kombination)', 'nicht-aggregierte Spalten ins GROUP BY', 'Alias im ORDER BY nutzbar']],
    ['Gruppen filtern', ['`HAVING COUNT(*) > 10`', '`HAVING SUM(x) > 10000`', 'WHERE vor, HAVING nach dem Gruppieren', 'beide kombinierbar']],
    ['Besonderheiten', ['Aggregate ignorieren NULL', '`COUNT(DISTINCT kunde_id)`', '`ROUND(AVG(x), 2)`', 'leere Menge: COUNT 0, SUM NULL']],
  ],
  blocks: [
    ['h', 'Aggregate über die ganze Tabelle'],
    ['code', 'sql', `SELECT COUNT(*)      AS anzahl_artikel,     -- 5
       MIN(preis)    AS billigster,         -- 1.80
       MAX(preis)    AS teuerster,          -- 42.50
       AVG(preis)    AS durchschnitt,       -- 14.22
       SUM(preis)    AS summe               -- 71.10
FROM Artikel;

SELECT COUNT(*) FROM Artikel WHERE kategorie = 'Strauch';     -- 2 (WHERE wirkt vorher)
SELECT COUNT(DISTINCT kunde_id) FROM Bestellung;              -- 3 verschiedene Kunden haben bestellt`],
    ['h', 'Gruppieren mit GROUP BY'],
    ['code', 'sql', `SELECT kategorie, COUNT(*) AS anzahl, ROUND(AVG(preis), 2) AS schnitt
FROM Artikel
GROUP BY kategorie
ORDER BY anzahl DESC;`],
    ['table', ['kategorie', 'anzahl', 'schnitt'], [['Strauch', '2', '12.25'], ['Blume', '2', '2.05'], ['Baum', '1', '42.50']]],
    ['diagram', AP2.dg.flow(['FROM Artikel (5 Zeilen)', 'WHERE (optional)', 'GROUP BY kategorie (3 Gruppen)', 'HAVING (Gruppen filtern)', 'SELECT + ORDER BY'], {w: 760, h: 110, styles: ['plain', 'soft', 'accent', 'soft', 'ok'], cap: 'Logische Abarbeitung einer Gruppierungsabfrage.'})],
    ['warn', '`SELECT kategorie, bezeichnung, COUNT(*) FROM Artikel GROUP BY kategorie` ist **falsch**: Welche der Bezeichnungen einer Gruppe soll angezeigt werden? Standard-SQL, PostgreSQL und SQL Server melden einen Fehler; MySQL liefert ohne `ONLY_FULL_GROUP_BY` einen zufälligen Wert. Regel: Jede Spalte im SELECT steht entweder im **GROUP BY** oder in einer **Aggregatfunktion**.'],
    ['h', 'Gruppen filtern mit HAVING'],
    ['code', 'sql', `-- Artikel, die insgesamt mehr als 10 Stück verkauft wurden
SELECT artikel_id, SUM(menge) AS verkauft
FROM Position
GROUP BY artikel_id
HAVING SUM(menge) > 10;           -- 10: 15 Stück, 14: 20 Stück

-- Kombination: erst Zeilen filtern (nur 2026), dann Gruppen filtern
SELECT kunde_id, COUNT(*) AS bestellungen
FROM Bestellung
WHERE YEAR(datum) = 2026
GROUP BY kunde_id
HAVING COUNT(*) >= 2;             -- Kunde 1`],
    ['table', ['', 'WHERE', 'HAVING'], [
      ['Filtert', 'einzelne Zeilen', 'Gruppen'],
      ['Zeitpunkt', 'vor GROUP BY', 'nach GROUP BY'],
      ['Aggregatfunktionen erlaubt?', 'nein', 'ja'],
      ['Beispiel', '`WHERE preis > 10`', '`HAVING AVG(preis) > 10`'],
    ]],
    ['h', 'Gruppieren nach berechneten Werten'],
    ['code', 'sql', `SELECT YEAR(datum) AS jahr, MONTH(datum) AS monat, COUNT(*) AS bestellungen
FROM Bestellung
GROUP BY YEAR(datum), MONTH(datum)
ORDER BY jahr, monat;                 -- 2026-3: 2, 2026-4: 2

SELECT CASE WHEN preis < 5 THEN 'günstig' ELSE 'teuer' END AS klasse, COUNT(*)
FROM Artikel
GROUP BY CASE WHEN preis < 5 THEN 'günstig' ELSE 'teuer' END;`],
    ['h', 'Prüfungsklassiker'],
    ['code', 'sql', `-- Winter 2024/25: durchschnittliche prozentuale Abweichung je Hersteller
SELECT hersteller, AVG((nennkapazitaet - istkapazitaet) / nennkapazitaet * 100) AS abweichung
FROM Akku GROUP BY hersteller;

-- Sommer 2022: Anzahl Fahrten je Tarif
SELECT Tarif, COUNT(*) AS Anzahl FROM Kurierfahrten GROUP BY Tarif;

-- Sommer 2022: Top 3 Kunden nach Kilometern
SELECT ID_Kunde AS KundenID, SUM(km_berechnet) AS Kilometer
FROM Kurierfahrten GROUP BY ID_Kunde ORDER BY Kilometer DESC LIMIT 3;`],
    ['h', 'Übungen'],
    ['qa', 'Ermitteln Sie je Kategorie die Anzahl der Artikel und den höchsten Preis, aber nur Kategorien mit mindestens zwei Artikeln.', [['code', 'sql', `SELECT kategorie, COUNT(*) AS anzahl, MAX(preis) AS hoechster
FROM Artikel
GROUP BY kategorie
HAVING COUNT(*) >= 2;`], 'Ergebnis: Strauch 2 19.50, Blume 2 2.30.'], 4],
    ['qa', 'Was liefert `SELECT COUNT(email), COUNT(*) FROM Kunde;`, wenn zwei der vier Kunden keine E-Mail haben?', ['`COUNT(email)` = **2** (NULL-Werte werden nicht gezählt), `COUNT(*)` = **4** (alle Zeilen).'], 2],
    ['quiz', [
      {q: 'Welche Klausel filtert nach einer Aggregatfunktion?', o: ['HAVING', 'WHERE', 'GROUP BY', 'ORDER BY'], a: 0, e: 'WHERE kennt keine Aggregate.'},
      {q: 'Was ist an SELECT ort, nachname, COUNT(*) FROM Kunde GROUP BY ort falsch?', o: ['nachname steht weder im GROUP BY noch in einem Aggregat', 'COUNT darf nicht mit GROUP BY', 'ort muss in COUNT', 'Nichts'], a: 0, e: 'Jede Spalte gruppieren oder aggregieren.'},
      {q: 'Wie behandeln SUM und AVG NULL-Werte?', o: ['Sie ignorieren sie', 'Sie zählen sie als 0', 'Ergebnis wird immer NULL', 'Fehler'], a: 0, e: 'AVG teilt nur durch die Nicht-NULL-Werte.'},
      {q: 'Welche Reihenfolge ist richtig?', o: ['WHERE - GROUP BY - HAVING - ORDER BY', 'GROUP BY - WHERE - HAVING', 'HAVING - WHERE - GROUP BY', 'ORDER BY - GROUP BY - WHERE'], a: 0, e: 'Schreib- und logische Reihenfolge.'},
    ]],
    ['see', ['course-sql-03', 'course-sql-05', 'eua-sqlgroup']],
  ],
});
