AP2.add('course-sql', [
  ['h', 'Aggregation und Gruppierung'],
  ['code', 'sql', `SELECT COUNT(*) AS anzahl, SUM(betrag) AS summe, AVG(betrag) AS schnitt,
       MIN(betrag), MAX(betrag), COUNT(DISTINCT kunde_id) AS aktive_kunden
FROM bestellung;                                   -- ohne GROUP BY: eine Ergebniszeile

SELECT kunde_id, COUNT(*) AS n, SUM(betrag) AS umsatz
FROM bestellung
WHERE datum >= '2026-01-01'                        -- filtert Zeilen VOR der Gruppierung
GROUP BY kunde_id
HAVING SUM(betrag) > 1000                          -- filtert Gruppen NACH der Gruppierung
ORDER BY umsatz DESC;`],
  ['warn', 'Jede Spalte im `SELECT`, die **kein Aggregat** ist, muss im `GROUP BY` stehen. Sonst ist das Ergebnis undefiniert (Fehler in den meisten Systemen).'],
  ['h', 'Joins'],
  ['table', ['Join', 'Ergebnis', 'Typische Verwendung'], [
    ['`INNER JOIN`', 'Nur Zeilen mit Treffer in **beiden** Tabellen', 'Kunden mit Bestellungen'],
    ['`LEFT JOIN`', 'Alle Zeilen **links**, rechts `NULL` ohne Treffer', 'Alle Kunden, auch ohne Bestellung'],
    ['`RIGHT JOIN`', 'Alle Zeilen rechts (selten, besser Tabellen tauschen)', ''],
    ['`FULL JOIN`', 'Alle Zeilen beider Seiten', 'Abgleich zweier Datenquellen'],
    ['`CROSS JOIN`', 'Jede Zeile mit jeder (**m mal n**)', 'Kombinationen erzeugen'],
    ['`SELF JOIN`', 'Tabelle mit sich selbst (zwei Aliase)', 'Mitarbeiter und Vorgesetzte'],
  ]],
  ['code', 'sql', `-- Kunden mit Umsatz (INNER)
SELECT k.name, SUM(b.betrag) AS umsatz
FROM kunde k
JOIN bestellung b ON b.kunde_id = k.id
GROUP BY k.name;

-- Kunden OHNE Bestellung (LEFT JOIN + IS NULL, Anti-Join)
SELECT k.name
FROM kunde k
LEFT JOIN bestellung b ON b.kunde_id = k.id
WHERE b.id IS NULL;

-- Mehrere Tabellen (n:m über Zwischentabelle)
SELECT b.id, p.name, pos.menge, pos.menge * p.preis AS zeilensumme
FROM bestellung b
JOIN position pos ON pos.bestellung_id = b.id
JOIN produkt p    ON p.id = pos.produkt_id;

-- Self Join: Mitarbeiter und Chef
SELECT m.name AS mitarbeiter, c.name AS chef
FROM mitarbeiter m LEFT JOIN mitarbeiter c ON m.chef_id = c.id;`],
  ['note', 'Bei `LEFT JOIN` gehören Filter auf die **rechte** Tabelle in die `ON`-Bedingung, nicht in `WHERE`. Sonst wird der Left Join unbemerkt zum Inner Join.'],
  ['h', 'Unterabfragen (Subqueries)'],
  ['code', 'sql', `-- Skalar: ein Wert
SELECT * FROM bestellung WHERE betrag > (SELECT AVG(betrag) FROM bestellung);
-- Liste mit IN
SELECT name FROM kunde WHERE id IN (SELECT kunde_id FROM bestellung WHERE betrag > 500);
-- Korreliert (bezieht sich auf die äußere Zeile): Kunden mit mindestens einer Bestellung
SELECT name FROM kunde k
WHERE EXISTS (SELECT 1 FROM bestellung b WHERE b.kunde_id = k.id);
-- Abgeleitete Tabelle (Inline View)
SELECT t.ort, t.anzahl FROM (SELECT ort, COUNT(*) AS anzahl FROM kunde GROUP BY ort) t
WHERE t.anzahl > 1;`],
  ['table', ['Form', 'Eigenschaft'], [['`EXISTS` / `NOT EXISTS`', 'Prüft nur Existenz, **NULL-sicher**, oft schnell'], ['`IN` / `NOT IN`', 'Vergleich mit Liste; `NOT IN` bricht bei NULL in der Liste'], ['`ANY / ALL`', 'Vergleich mit mindestens einem / allen Werten der Unterabfrage']]],
  ['h', 'Mengenoperationen'],
  ['code', 'sql', `SELECT ort FROM kunde UNION SELECT ort FROM lieferant;       -- Vereinigung ohne Duplikate
SELECT ort FROM kunde UNION ALL SELECT ort FROM lieferant;   -- mit Duplikaten (schneller)
SELECT ort FROM kunde INTERSECT SELECT ort FROM lieferant;   -- Schnittmenge
SELECT ort FROM kunde EXCEPT SELECT ort FROM lieferant;      -- Differenz (Oracle: MINUS)`],
  ['p', 'Voraussetzung: **gleiche Spaltenanzahl** und **kompatible Typen**; die Spaltennamen kommen aus dem ersten `SELECT`.'],
  ['h', 'Common Table Expressions (WITH)'],
  ['code', 'sql', `WITH umsatz AS (
  SELECT kunde_id, SUM(betrag) AS summe FROM bestellung GROUP BY kunde_id
), gross AS (
  SELECT * FROM umsatz WHERE summe > 1000
)
SELECT k.name, g.summe FROM gross g JOIN kunde k ON k.id = g.kunde_id;

-- Rekursiv: Hierarchie (Mitarbeiterbaum)
WITH RECURSIVE baum AS (
  SELECT id, name, chef_id, 1 AS ebene FROM mitarbeiter WHERE chef_id IS NULL
  UNION ALL
  SELECT m.id, m.name, m.chef_id, b.ebene + 1 FROM mitarbeiter m JOIN baum b ON m.chef_id = b.id
)
SELECT * FROM baum ORDER BY ebene;     -- SQL Server/Oracle: ohne das Wort RECURSIVE`],
]);
