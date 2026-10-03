AP2.add('course-sql', [
  ['h', 'DDL ändern und löschen'],
  ['code', 'sql', `ALTER TABLE kunde ADD telefon VARCHAR(30);           -- Spalte hinzufügen
ALTER TABLE kunde DROP COLUMN telefon;                -- Spalte entfernen
ALTER TABLE kunde ALTER COLUMN ort SET NOT NULL;      -- PostgreSQL-Syntax
ALTER TABLE bestellung ADD CONSTRAINT ck CHECK (betrag < 1000000);
CREATE INDEX idx_kunde_ort ON kunde(ort);
TRUNCATE TABLE log;   -- alle Zeilen schnell löschen, Struktur bleibt
DROP TABLE log;       -- Tabelle samt Daten und Struktur löschen`],
  ['table', ['Befehl', 'Wirkung', 'Rollback möglich?'], [['`DELETE FROM t`', 'Zeilen einzeln löschen (mit WHERE)', 'Ja (DML)'], ['`TRUNCATE TABLE t`', 'Alle Zeilen schnell, Zähler zurück', 'Systemabhängig (oft nein)'], ['`DROP TABLE t`', 'Tabelle komplett entfernen', 'Meist nein (DDL)']]],
  ['h', 'DML: Daten einfügen, ändern, löschen'],
  ['code', 'sql', `INSERT INTO kunde (id, name, ort) VALUES (1, 'Meier', 'Ulm');
INSERT INTO kunde (id, name, ort) VALUES (2, 'Kaya', 'Stuttgart'), (3, 'Lopez', 'Ulm');
INSERT INTO archiv SELECT * FROM bestellung WHERE datum < '2020-01-01';

UPDATE kunde SET ort = 'Neu-Ulm' WHERE id = 1;
UPDATE produkt SET preis = preis * 1.05 WHERE preis < 100;   -- Berechnung

DELETE FROM bestellung WHERE betrag IS NULL;
-- ACHTUNG: UPDATE oder DELETE ohne WHERE betrifft ALLE Zeilen!`],
  ['warn', 'Vor jedem `UPDATE`/`DELETE` dieselbe `WHERE`-Bedingung zuerst mit `SELECT` testen. In der Praxis arbeitet man in einer **Transaktion**, um bei Fehlern `ROLLBACK` zu machen.'],
  ['h', 'SELECT im Detail'],
  ['code', 'sql', `SELECT DISTINCT ort FROM kunde;                       -- Duplikate entfernen
SELECT name AS kundenname, ort FROM kunde WHERE ort <> 'Ulm';
SELECT * FROM bestellung ORDER BY betrag DESC, datum ASC LIMIT 5;   -- Top 5
SELECT * FROM bestellung ORDER BY datum LIMIT 10 OFFSET 20;         -- Seite 3 (je 10)
-- SQL Server: SELECT TOP 5 ...   Oracle: FETCH FIRST 5 ROWS ONLY`],
  ['table', ['Operator', 'Bedeutung', 'Beispiel'], [
    ['`=  <>  <  >  <=  >=`', 'Vergleich (`!=` ebenfalls üblich)', '`WHERE betrag >= 100`'],
    ['`AND  OR  NOT`', 'Logik; **AND vor OR**, im Zweifel Klammern', '`WHERE (ort = \'Ulm\' OR ort = \'Bonn\') AND aktiv`'],
    ['`BETWEEN a AND b`', 'Bereich **einschließlich** der Grenzen', '`betrag BETWEEN 10 AND 50`'],
    ['`IN (...)`', 'Mitglied einer Liste oder Unterabfrage', '`ort IN (\'Ulm\',\'Bonn\')`'],
    ['`LIKE`', '`%` beliebig viele, `_` genau ein Zeichen', '`name LIKE \'M%\'`  `\'_ayer\'`'],
    ['`IS NULL / IS NOT NULL`', 'Test auf fehlenden Wert', '`email IS NULL`'],
  ]],
  ['h', 'NULL: der häufigste Stolperstein'],
  ['p', '**NULL bedeutet "unbekannt/nicht vorhanden"**, nicht 0 und nicht leer. SQL nutzt **dreiwertige Logik** (wahr, falsch, **unbekannt**). Jeder Vergleich mit NULL ergibt **unbekannt** und `WHERE` lässt nur **wahr** durch.'],
  ['table', ['Ausdruck', 'Ergebnis', 'Erklärung'], [['`NULL = NULL`', 'unbekannt (keine Zeile)', 'Vergleich mit NULL nie mit `=`, sondern `IS NULL`'], ['`5 + NULL`', 'NULL', 'Rechnen mit NULL ergibt NULL'], ['`COUNT(*)` vs `COUNT(spalte)`', 'alle Zeilen vs. nur Nicht-NULL', 'Aggregate (außer COUNT(*)) **ignorieren NULL**'], ['`x NOT IN (1, NULL)`', 'nie wahr', 'Falle bei Unterabfragen: lieber `NOT EXISTS`'], ['`COALESCE(a, b, 0)`', 'erster Nicht-NULL-Wert', 'NULL durch Ersatz ersetzen'], ['`NULLIF(a, 0)`', 'NULL, wenn a = 0', 'Division durch null vermeiden: `x / NULLIF(y,0)`']]],
  ['h', 'Funktionen und CASE'],
  ['code', 'sql', `SELECT UPPER(name), LENGTH(name), SUBSTRING(name, 1, 3),
       CONCAT(name, ' aus ', ort), TRIM(ort), REPLACE(ort, 'Ulm', 'UL')
FROM kunde;                                   -- Text (Namen je Dialekt leicht anders)
SELECT ROUND(betrag, 1), CEIL(betrag), FLOOR(betrag), ABS(betrag), MOD(betrag, 10) FROM bestellung;
SELECT CURRENT_DATE, EXTRACT(YEAR FROM datum), datum + INTERVAL '30 days' FROM bestellung;
SELECT name,
  CASE WHEN betrag >= 1000 THEN 'Groß'
       WHEN betrag >= 100  THEN 'Mittel'
       ELSE 'Klein' END AS klasse                  -- Bedingte Werte
FROM bestellung;
SELECT CAST(betrag AS INT), CAST('2026-05-31' AS DATE);   -- Typumwandlung`],
]);
