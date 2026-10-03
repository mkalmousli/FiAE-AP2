AP2.add('eua-sqlselect', [
  ['h', 'ORDER BY, LIMIT, DISTINCT und Aliase'],
  ['code', 'sql', `SELECT DISTINCT ort           -- doppelte Orte nur einmal
FROM kunde
ORDER BY ort ASC;                -- aufsteigend (Standard); DESC = absteigend`],
  ['table', ['ort'], [['Göppingen'], ['Stuttgart'], ['Ulm']], {first: false}],
  ['code', 'sql', `SELECT bezeichnung, preis, preis * 1.19 AS brutto    -- berechnete Spalte mit Alias
FROM artikel
WHERE kategorie = 'Hardware'
ORDER BY preis DESC
LIMIT 1;                                  -- nur die erste Zeile (SQL Server: SELECT TOP 1 ...)`],
  ['table', ['bezeichnung', 'preis', 'brutto'], [['Laptop', '899.00', '1069.81']], {first: false}],
  ['kv', [
    ['ORDER BY mehrere Spalten', '`ORDER BY ort ASC, name DESC`: erst nach Ort, innerhalb gleicher Orte nach Name absteigend.'],
    ['DISTINCT', 'Entfernt doppelte **Ergebniszeilen**. `SELECT DISTINCT kategorie FROM artikel` liefert Hardware und Zubehör je einmal.'],
    ['Alias (AS)', 'Gibt einer Spalte oder Tabelle einen **kürzeren/lesbareren Namen**. `FROM kunde AS k` erlaubt später `k.name`. Wichtig bei Joins.'],
    ['NULL', 'Bedeutet **"unbekannt/nicht vorhanden"**. Vergleiche mit NULL liefern weder wahr noch falsch: `ort = NULL` findet **nichts**. Richtig: `ort IS NULL`. `COUNT(spalte)` zählt NULL-Werte nicht mit.'],
  ]],
  ['h', 'Mehrere Bedingungen: AND, OR und Klammern'],
  ['code', 'sql', `-- Zubehör unter 30 Euro ODER Hardware: Klammern machen die Absicht klar
SELECT bezeichnung, preis, kategorie
FROM artikel
WHERE (kategorie = 'Zubehör' AND preis < 30)
   OR kategorie = 'Hardware';`],
  ['table', ['bezeichnung', 'preis', 'kategorie'], [['Maus', '19.90', 'Zubehör'], ['Monitor', '189.00', 'Hardware'], ['Laptop', '899.00', 'Hardware'], ['Kabel', '4.90', 'Zubehör']], {first: false}],
  ['warn', 'Typische Fehler: **`AND` bindet stärker als `OR`**. Ohne Klammern wird `a OR b AND c` als `a OR (b AND c)` ausgewertet. Außerdem: Text in **einfache** Anführungszeichen setzen (`\'Ulm\'`), nicht in Anführungszeichen für Spaltennamen. Und `WHERE` kann **keine Aggregatfunktionen** enthalten (dafür gibt es `HAVING`).'],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Schreiben Sie eine Abfrage, die Bezeichnung und Preis aller Artikel der Kategorie Zubehör ausgibt, die weniger als 30 Euro kosten, sortiert nach Preis aufsteigend.', ['`SELECT bezeichnung, preis`', '`FROM artikel`', '`WHERE kategorie = \'Zubehör\' AND preis < 30`', '`ORDER BY preis ASC;`', 'Ergebnis: Kabel 4.90, Maus 19.90.'], 5],
  ['qa', 'Wie lauten die Namen aller Kunden, deren Ort mit "S" beginnt?', ['`SELECT name FROM kunde WHERE ort LIKE \'S%\';`', 'Ergebnis: Yilmaz (Stuttgart).'], 3],
  ['qa', 'Erklären Sie die Reihenfolge, in der die Teile einer SELECT-Anweisung ausgeführt werden.', 'Zuerst **FROM** (Tabellen bestimmen), dann **WHERE** (Zeilen filtern), **GROUP BY** (gruppieren), **HAVING** (Gruppen filtern), **SELECT** (Spalten und Aliase berechnen), **ORDER BY** (sortieren) und zuletzt **LIMIT**. Deshalb kann man einen Alias aus SELECT in WHERE noch nicht verwenden, wohl aber in ORDER BY.', 5],
  ['qa', 'Was ist der Unterschied zwischen `WHERE ort = NULL` und `WHERE ort IS NULL`?', 'NULL steht für einen **unbekannten Wert**. Jeder Vergleich mit `=` ergibt **unbekannt**, die Zeile wird nicht ausgewählt. Nur **`IS NULL`** prüft korrekt, ob ein Wert fehlt.', 3],
  ['quiz', [
    {q: 'Welche Klausel filtert Zeilen vor der Gruppierung?', o: ['WHERE', 'HAVING', 'ORDER BY', 'SELECT'], a: 0, e: 'WHERE filtert einzelne Zeilen, HAVING filtert Gruppen.'},
    {q: 'Was bewirkt DISTINCT?', o: ['Entfernt doppelte Ergebniszeilen', 'Sortiert das Ergebnis', 'Löscht Daten', 'Zählt Zeilen'], a: 0, e: 'DISTINCT liefert jede Kombination nur einmal.'},
    {q: 'Was findet LIKE \'M%\'?', o: ['Texte, die mit M beginnen', 'Texte, die auf M enden', 'Texte mit genau einem Zeichen', 'Nur den Buchstaben M'], a: 0, e: '% steht für beliebig viele Zeichen.'},
    {q: 'Wie sortiert man absteigend?', o: ['ORDER BY spalte DESC', 'ORDER BY spalte DOWN', 'SORT BY spalte', 'GROUP BY spalte DESC'], a: 0, e: 'ASC = aufsteigend (Standard), DESC = absteigend.'},
    {q: 'Wie prüft man auf einen fehlenden Wert?', o: ['IS NULL', '= NULL', '= 0', '= \'\''], a: 0, e: 'NULL wird mit IS NULL geprüft.'},
    {q: 'Schließt BETWEEN 10 AND 100 die Grenzen ein?', o: ['Ja', 'Nein', 'Nur die untere', 'Nur die obere'], a: 0, e: 'BETWEEN ist inklusive beider Grenzen.'},
  ]],
]);
