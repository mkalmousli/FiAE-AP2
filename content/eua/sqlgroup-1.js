AP2.page('eua-sqlgroup', {
  b: 'eua', g: 'Datenbanken und SQL', t: 'SQL: Aggregatfunktionen, GROUP BY, HAVING und Unterabfragen',
  d: '**Aggregatfunktionen** fassen **viele Zeilen zu einem Wert** zusammen: **COUNT** (Anzahl), **SUM** (Summe), **AVG** (Durchschnitt), **MIN** und **MAX**. Mit **GROUP BY** bildet man **Gruppen** und berechnet die Funktion **pro Gruppe**. **HAVING** filtert **Gruppen** (nach der Aggregation), **WHERE** filtert **Zeilen** (davor). Eine **Unterabfrage (Subquery)** ist eine SELECT-Anweisung **innerhalb** einer anderen.',
  m: '**WHERE filtert Zeilen VOR dem Gruppieren, HAVING filtert Gruppen NACH dem Gruppieren.** Jede Spalte im SELECT, die **nicht aggregiert** ist, muss im **GROUP BY** stehen. `COUNT(*)` zählt Zeilen, `COUNT(spalte)` zählt **nicht-NULL**-Werte.',
  cheat: [
    ['Aggregatfunktionen', ['`COUNT(*)` Anzahl Zeilen', '`COUNT(DISTINCT x)` Anzahl verschiedener Werte', '`SUM(x)` Summe, `AVG(x)` Durchschnitt', '`MIN(x)`, `MAX(x)`', '**NULL-Werte** werden ignoriert (außer COUNT(*))']],
    ['GROUP BY / HAVING', ['`GROUP BY spalte` bildet Gruppen', 'Nicht aggregierte SELECT-Spalten **müssen** im GROUP BY stehen', '`HAVING SUM(x) > 100` filtert Gruppen', '**WHERE** vor, **HAVING** nach Aggregation']],
    ['Unterabfragen', ['In **WHERE**: `x > (SELECT AVG(x) FROM t)`', 'Mit **IN**: `id IN (SELECT ...)`', '**EXISTS / NOT EXISTS**: Treffer vorhanden?', 'In FROM: abgeleitete Tabelle', '**Korreliert:** bezieht sich auf die äußere Abfrage']],
    ['UNION', ['`SELECT ... UNION SELECT ...` vereinigt (ohne Duplikate)', '`UNION ALL` mit Duplikaten', 'Gleiche Spaltenanzahl und passende Typen']],
  ],
  blocks: [
    ['h', 'Aggregatfunktionen'],
    ...AP2.sqlBlocks.schema,
    ['code', 'sql', `SELECT COUNT(*)  AS anzahl,
       SUM(preis)  AS summe,
       AVG(preis)  AS durchschnitt,
       MIN(preis)  AS billigster,
       MAX(preis)  AS teuerster
FROM artikel;`],
    ['table', ['anzahl', 'summe', 'durchschnitt', 'billigster', 'teuerster'], [['6', '1201.70', '200.28', '4.90', '899.00']], {first: false}],
    ['p', 'Ohne GROUP BY wird die **ganze Tabelle** zu **einer Zeile** zusammengefasst. Durchschnitt: 1201,70 geteilt durch 6 ergibt 200,28 (gerundet).'],
    ['h', 'GROUP BY: pro Gruppe rechnen'],
    ['code', 'sql', `SELECT kategorie, COUNT(*) AS anzahl, AVG(preis) AS durchschnitt
FROM artikel
GROUP BY kategorie;`],
    ['table', ['kategorie', 'anzahl', 'durchschnitt'], [['Zubehör', '4', '28.43'], ['Hardware', '2', '544.00']], {first: false}],
    ['p', 'Die Zeilen werden nach `kategorie` **in Gruppen** eingeteilt (Zubehör: Maus, Tastatur, Kabel, Webcam; Hardware: Monitor, Laptop). Pro Gruppe entsteht **eine Ergebniszeile**.'],
    ['diagram', {w: 760, h: 200, keep: 600, cap: 'GROUP BY: Aus sechs Artikelzeilen werden zwei Gruppen mit je einer Ergebniszeile.', nodes: [
      {id: 'z', k: 'box', x: 130, y: 70, w: 200, h: 70, t: ['Zubehör', 'Maus, Tastatur, Kabel, Webcam'], s: 'accent', fs: 12}, {id: 'h', k: 'box', x: 130, y: 150, w: 200, h: 50, t: ['Hardware', 'Monitor, Laptop'], s: 'accent', fs: 12},
      {id: 'a', k: 'box', x: 460, y: 70, w: 220, h: 50, t: ['Zubehör  |  4  |  28.43'], s: 'ok'}, {id: 'b', k: 'box', x: 460, y: 150, w: 220, h: 50, t: ['Hardware  |  2  |  544.00'], s: 'ok'},
    ], edges: [{a: 'z', b: 'a', t: 'COUNT, AVG'}, {a: 'h', b: 'b'}]}],
    ['h', 'Umsatz pro Bestellung (mit JOIN und GROUP BY)'],
    ['code', 'sql', `SELECT p.bestell_id, SUM(a.preis * p.menge) AS umsatz
FROM position p
JOIN artikel a ON p.artikel_id = a.artikel_id
GROUP BY p.bestell_id
ORDER BY umsatz DESC;`],
    ['table', ['bestell_id', 'umsatz'], [['104', '899.00'], ['102', '189.00'], ['103', '59.80'], ['101', '54.50']], {first: false}],
    ['h', 'HAVING: Gruppen filtern'],
    ['code', 'sql', `SELECT k.name, SUM(a.preis * p.menge) AS gesamt
FROM kunde k
JOIN bestellung b ON k.kunden_id = b.kunden_id
JOIN position p  ON b.bestell_id = p.bestell_id
JOIN artikel a   ON p.artikel_id = a.artikel_id
GROUP BY k.name
HAVING SUM(a.preis * p.menge) > 100;     -- nur Kunden mit Gesamtumsatz über 100`],
    ['table', ['name', 'gesamt'], [['Meier', '243.50'], ['Yilmaz', '899.00']], {first: false}],
    ['table', ['', 'WHERE', 'HAVING'], [['Filtert', '**einzelne Zeilen**', '**ganze Gruppen**'], ['Wann', 'vor GROUP BY', 'nach GROUP BY'], ['Aggregatfunktionen erlaubt?', 'nein', '**ja**'], ['Beispiel', '`WHERE preis > 10`', '`HAVING COUNT(*) > 2`']]],
  ],
});
