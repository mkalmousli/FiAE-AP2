AP2.add('course-sql', [
  ['h', 'Fensterfunktionen (Window Functions)'],
  ['p', 'Fensterfunktionen berechnen Werte **über eine Gruppe verwandter Zeilen, ohne diese zusammenzufassen**: Jede Zeile bleibt erhalten. Syntax: `funktion() OVER (PARTITION BY gruppe ORDER BY sortierung)`.'],
  ['code', 'sql', `SELECT name, ort, betrag,
  ROW_NUMBER() OVER (PARTITION BY ort ORDER BY betrag DESC) AS platz,   -- 1,2,3 je Ort
  RANK()       OVER (PARTITION BY ort ORDER BY betrag DESC) AS rang,    -- gleiche Werte gleicher Rang, Lücken
  DENSE_RANK() OVER (ORDER BY betrag DESC)                  AS dichte,  -- ohne Lücken
  SUM(betrag)  OVER (PARTITION BY ort)                      AS ort_summe,
  SUM(betrag)  OVER (ORDER BY datum)                        AS laufende_summe,
  LAG(betrag)  OVER (ORDER BY datum)                        AS vorheriger,
  AVG(betrag)  OVER (ORDER BY datum ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS gleitend3
FROM bestellung;

-- Top 1 je Gruppe (häufige Prüfungsaufgabe)
SELECT * FROM (
  SELECT b.*, ROW_NUMBER() OVER (PARTITION BY kunde_id ORDER BY betrag DESC) AS rn FROM bestellung b
) t WHERE rn = 1;`],
  ['table', ['Funktion', 'Zweck'], [['`ROW_NUMBER()`', 'Fortlaufende Nummer je Partition'], ['`RANK()` / `DENSE_RANK()`', 'Rang mit / ohne Lücken bei Gleichstand'], ['`LAG(x)` / `LEAD(x)`', 'Wert der vorherigen / nächsten Zeile'], ['`SUM/AVG/COUNT OVER`', 'Aggregat als Fenster (laufende Summe, Gruppensumme)'], ['`NTILE(n)`', 'Teilt in n gleich große Gruppen'], ['`FIRST_VALUE / LAST_VALUE`', 'Erster/letzter Wert im Fenster']]],
  ['h', 'Views (Sichten)'],
  ['code', 'sql', `CREATE VIEW kundenumsatz AS
SELECT k.id, k.name, COALESCE(SUM(b.betrag), 0) AS umsatz
FROM kunde k LEFT JOIN bestellung b ON b.kunde_id = k.id
GROUP BY k.id, k.name;

SELECT * FROM kundenumsatz WHERE umsatz > 1000;   -- wie eine Tabelle benutzen
DROP VIEW kundenumsatz;`],
  ['p', 'Eine **View** ist eine **gespeicherte Abfrage**, keine Kopie der Daten. Vorteile: **vereinfacht** komplexe Joins, **Zugriffsschutz** (nur bestimmte Spalten freigeben), stabile Schnittstelle. Eine **Materialized View** speichert das Ergebnis physisch und muss aktualisiert werden.'],
  ['h', 'Indizes und Performance'],
  ['code', 'sql', `CREATE INDEX idx_bestellung_kunde ON bestellung(kunde_id);
CREATE UNIQUE INDEX uq_kunde_email ON kunde(email);
CREATE INDEX idx_komb ON bestellung(kunde_id, datum);   -- zusammengesetzt: Reihenfolge zählt
EXPLAIN SELECT * FROM bestellung WHERE kunde_id = 7;     -- Ausführungsplan ansehen`],
  ['procon', 'Index', ['**Lesen** (WHERE, JOIN, ORDER BY) wird stark beschleunigt', '**Eindeutigkeit** erzwingbar', 'Als **B-Baum** logarithmische Suche O(log n)'], ['**Schreiben** (INSERT/UPDATE/DELETE) wird langsamer', 'Braucht **Speicherplatz**', 'Bringt bei kleinen Tabellen oder schlechter Selektivität wenig']],
  ['list', ['**Primär- und Fremdschlüssel** immer indizieren (PK automatisch).', 'Funktionen auf der Spalte verhindern Indexnutzung: `WHERE YEAR(datum) = 2026` ist langsam, besser `datum >= \'2026-01-01\' AND datum < \'2027-01-01\'`.', '`LIKE \'abc%\'` nutzt den Index, `LIKE \'%abc\'` nicht.', 'Nur benötigte Spalten abfragen (`SELECT *` vermeiden), früh filtern, `EXISTS` statt `IN` bei großen Mengen.', '**N+1-Problem:** viele Einzelabfragen in einer Schleife durch **einen Join** ersetzen.']],
  ['h', 'Transaktionen und ACID'],
  ['code', 'sql', `BEGIN;                                              -- START TRANSACTION
UPDATE konto SET stand = stand - 100 WHERE id = 1;
UPDATE konto SET stand = stand + 100 WHERE id = 2;
-- bei Fehler:  ROLLBACK;   sonst:
COMMIT;`],
  ['table', ['ACID', 'Bedeutung', 'Beispiel Überweisung'], [['**A**tomicity', 'Alles oder nichts', 'Beide Buchungen oder keine'], ['**C**onsistency', 'Konsistenter Zustand bleibt (Constraints)', 'Summe aller Konten bleibt gleich'], ['**I**solation', 'Parallele Transaktionen stören sich nicht', 'Zwischenstand unsichtbar'], ['**D**urability', 'Nach COMMIT dauerhaft gespeichert', 'Auch nach Stromausfall']]],
  ['table', ['Isolationsstufe', 'Dirty Read', 'Non-repeatable Read', 'Phantom'], [['READ UNCOMMITTED', 'möglich', 'möglich', 'möglich'], ['READ COMMITTED (Standard vieler DB)', 'verhindert', 'möglich', 'möglich'], ['REPEATABLE READ', 'verhindert', 'verhindert', 'möglich (MySQL InnoDB verhindert auch)'], ['SERIALIZABLE', 'verhindert', 'verhindert', 'verhindert']]],
  ['kv', [['Dirty Read', 'Lesen **nicht festgeschriebener** Daten einer anderen Transaktion.'], ['Non-repeatable Read', 'Zweimal lesen derselben Zeile liefert **verschiedene Werte**, weil eine andere Transaktion sie geändert hat.'], ['Phantom Read', 'Zweite Abfrage liefert **zusätzliche Zeilen**, die eine andere Transaktion eingefügt hat.'], ['Deadlock', 'Zwei Transaktionen warten gegenseitig auf Sperren; die DB bricht eine ab.']]],
]);
