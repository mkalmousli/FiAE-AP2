AP2.add('eua-sqlgroup', [
  ['h', 'COUNT und NULL, Gruppen mit LEFT JOIN'],
  ['code', 'sql', `-- Wie viele Bestellungen hat jeder Kunde? (auch Kunden mit 0)
SELECT k.name, COUNT(b.bestell_id) AS bestellungen
FROM kunde k
LEFT JOIN bestellung b ON k.kunden_id = b.kunden_id
GROUP BY k.name;`],
  ['table', ['name', 'bestellungen'], [['Meier', '2'], ['Schulz', '1'], ['Yilmaz', '1'], ['Brandt', '0']], {first: false, mark: [3]}],
  ['note', '`COUNT(b.bestell_id)` zählt **nur nicht-NULL-Werte**. Brandt hat durch den LEFT JOIN eine Zeile mit NULL, also ergibt sich **0**. `COUNT(*)` würde auch diese Zeile zählen (Ergebnis 1, falsch!).'],
  ['h', 'Regel zu GROUP BY'],
  ['warn', '**Jede Spalte im SELECT, die nicht in einer Aggregatfunktion steht, muss im GROUP BY stehen.** Falsch: `SELECT name, ort, COUNT(*) FROM kunde GROUP BY name`: `ort` ist weder gruppiert noch aggregiert. Das gibt einen Fehler (oder zufällige Werte, je nach Datenbank).'],
  ['h', 'Unterabfragen (Subqueries)'],
  ['p', 'Eine **Unterabfrage** ist eine eingebettete SELECT-Anweisung in Klammern. Sie liefert ein **einzelnes Ergebnis (Skalar)**, eine **Liste** oder eine **Tabelle**, die die äußere Abfrage weiterverwendet.'],
  ['code', 'sql', `-- 1) Skalar-Unterabfrage: Artikel, die teurer sind als der Durchschnitt
SELECT bezeichnung, preis
FROM artikel
WHERE preis > (SELECT AVG(preis) FROM artikel);     -- Durchschnitt 200.28`],
  ['table', ['bezeichnung', 'preis'], [['Laptop', '899.00']], {first: false}],
  ['code', 'sql', `-- 2) IN mit Unterabfrage: Kunden, die einen Laptop bestellt haben
SELECT name
FROM kunde
WHERE kunden_id IN (
    SELECT b.kunden_id
    FROM bestellung b
    JOIN position p ON b.bestell_id = p.bestell_id
    JOIN artikel a  ON p.artikel_id = a.artikel_id
    WHERE a.bezeichnung = 'Laptop');`],
  ['table', ['name'], [['Yilmaz']], {first: false}],
  ['code', 'sql', `-- 3) NOT EXISTS: Artikel, die nie bestellt wurden
SELECT a.bezeichnung
FROM artikel a
WHERE NOT EXISTS (SELECT 1 FROM position p WHERE p.artikel_id = a.artikel_id);`],
  ['table', ['bezeichnung'], [['Webcam']], {first: false}],
  ['kv', [
    ['Korrelierte Unterabfrage', 'Die innere Abfrage **bezieht sich auf die äußere** (hier `a.artikel_id`) und wird **für jede Zeile** der äußeren Abfrage neu ausgewertet.'],
    ['IN gegenüber EXISTS', '`IN` vergleicht mit einer **Liste von Werten**. `EXISTS` prüft nur, **ob die Unterabfrage mindestens eine Zeile liefert**. EXISTS ist oft schneller und **NULL-sicher** (anders als `NOT IN`, das bei NULL in der Liste unerwartet nichts liefert).'],
    ['Unterabfrage in FROM', '`SELECT ... FROM (SELECT ... ) AS t` benutzt das Ergebnis als **abgeleitete Tabelle** (Alias nötig).'],
    ['UNION', 'Vereinigt die Ergebnisse zweier SELECTs mit **gleicher Spaltenzahl**: `SELECT ort FROM kunde UNION SELECT \'Berlin\'`. `UNION` entfernt Duplikate, `UNION ALL` nicht.'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Wie viele Artikel gibt es je Kategorie und wie hoch ist der Durchschnittspreis? Schreiben Sie die Abfrage und nennen Sie das Ergebnis.', ['`SELECT kategorie, COUNT(*) AS anzahl, AVG(preis) AS durchschnitt FROM artikel GROUP BY kategorie;`', 'Ergebnis: Zubehör 4 Artikel, Durchschnitt 28,43; Hardware 2 Artikel, Durchschnitt 544,00.'], 5],
  ['qa', 'Erklären Sie den Unterschied zwischen WHERE und HAVING an einem Beispiel.', ['**WHERE** filtert einzelne Zeilen **vor** der Gruppierung: `WHERE preis > 10` schließt günstige Artikel von der Berechnung aus.', '**HAVING** filtert Gruppen **nach** der Aggregation: `HAVING COUNT(*) > 2` behält nur Kategorien mit mehr als zwei Artikeln. In HAVING sind Aggregatfunktionen erlaubt, in WHERE nicht.'], 5],
  ['qa', 'Geben Sie den Namen und den teuersten Preis jeder Kategorie aus, aber nur für Kategorien mit mindestens 3 Artikeln.', ['`SELECT kategorie, MAX(preis) AS teuerster`', '`FROM artikel`', '`GROUP BY kategorie`', '`HAVING COUNT(*) >= 3;`', 'Ergebnis: Zubehör mit 49.00 (Webcam).'], 5],
  ['qa', 'Schreiben Sie eine Abfrage mit Unterabfrage: Welche Artikel sind billiger als der Durchschnittspreis aller Artikel?', ['`SELECT bezeichnung, preis FROM artikel WHERE preis < (SELECT AVG(preis) FROM artikel);`', 'Ergebnis: Maus 19.90, Tastatur 39.90, Monitor 189.00, Kabel 4.90, Webcam 49.00 (alle unter 200,28).'], 5],
  ['quiz', [
    {q: 'Welche Funktion zählt Zeilen?', o: ['COUNT', 'SUM', 'AVG', 'MAX'], a: 0, e: 'COUNT(*) liefert die Anzahl der Zeilen.'},
    {q: 'Womit filtert man Gruppen nach einer Aggregation?', o: ['HAVING', 'WHERE', 'ORDER BY', 'DISTINCT'], a: 0, e: 'HAVING arbeitet nach GROUP BY.'},
    {q: 'Was gilt für nicht aggregierte Spalten im SELECT bei GROUP BY?', o: ['Sie müssen im GROUP BY stehen', 'Sie dürfen nie vorkommen', 'Sie müssen im HAVING stehen', 'Sie werden automatisch summiert'], a: 0, e: 'Sonst ist unklar, welcher Wert der Gruppe gezeigt werden soll.'},
    {q: 'Was berechnet AVG(preis)?', o: ['Den Durchschnitt', 'Die Summe', 'Die Anzahl', 'Den größten Wert'], a: 0, e: 'AVG = Durchschnittswert.'},
    {q: 'Was liefert eine Unterabfrage in WHERE preis > (SELECT AVG(preis) FROM artikel)?', o: ['Einen einzelnen Wert zum Vergleich', 'Eine neue Tabelle', 'Eine Fehlermeldung', 'Alle Spalten'], a: 0, e: 'Eine Skalar-Unterabfrage liefert genau einen Wert.'},
  ]],
]);
