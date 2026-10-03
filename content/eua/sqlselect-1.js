AP2.page('eua-sqlselect', {
  b: 'eua', g: 'Datenbanken und SQL', t: 'SQL: SELECT, WHERE und ORDER BY',
  d: '**SQL** (Structured Query Language) ist die Standardsprache für relationale Datenbanken. Mit **`SELECT spalten FROM tabelle WHERE bedingung ORDER BY spalte`** liest man Daten: **SELECT** wählt die Spalten, **FROM** die Tabelle, **WHERE** filtert Zeilen, **ORDER BY** sortiert. SQL ist **deklarativ**: Man beschreibt **was** man will, nicht **wie** es berechnet wird.',
  m: '**S-F-W-G-H-O:** **S**ELECT, **F**ROM, **W**HERE, **G**ROUP BY, **H**AVING, **O**RDER BY: so schreibt man es. Ausgeführt wird in der Reihenfolge **FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY**. Text steht in **\'einfachen Anführungszeichen\'**, Vergleich auf NULL mit **IS NULL** (nicht = NULL).',
  cheat: [
    ['Grundgerüst', ['`SELECT spalte1, spalte2`', '`FROM tabelle`', '`WHERE bedingung`', '`ORDER BY spalte ASC|DESC`', '`LIMIT n` (MySQL/PostgreSQL), `TOP n` (SQL Server)', '`SELECT *` = alle Spalten']],
    ['Vergleichsoperatoren', ['`=  <>  !=  <  >  <=  >=`', '`BETWEEN a AND b` (einschließlich)', '`IN (a, b, c)`', '`LIKE \'M%\'` (% = beliebig viele, _ = ein Zeichen)', '`IS NULL`, `IS NOT NULL`', '`AND`, `OR`, `NOT`']],
    ['Nützliches', ['`DISTINCT` doppelte Zeilen entfernen', '`AS` Alias (`preis * 1.19 AS brutto`)', 'Rechnen: `+ - * /`', 'Texte: `||` oder `CONCAT`, `UPPER`, `LENGTH`', 'Datum: `CURRENT_DATE`']],
    ['Ausführungsreihenfolge', ['1. **FROM** (Tabelle)', '2. **WHERE** (Zeilen filtern)', '3. **GROUP BY** / 4. **HAVING**', '5. **SELECT** (Spalten, Aliase)', '6. **ORDER BY**, 7. **LIMIT**']],
  ],
  blocks: [
    ['h', 'Wozu SQL?'],
    ['p', 'Die Daten eines Programms stehen meist in einer **relationalen Datenbank** (MySQL, PostgreSQL, SQL Server, Oracle, SQLite). Mit **SQL** fragt man diese Daten ab und ändert sie. SQL besteht aus mehreren Teilsprachen: **DQL** (Abfragen: `SELECT`), **DML** (Daten ändern: `INSERT`, `UPDATE`, `DELETE`), **DDL** (Struktur: `CREATE`, `ALTER`, `DROP`) und **DCL** (Rechte: `GRANT`, `REVOKE`). Diese Seite behandelt `SELECT`.'],
    ...AP2.sqlBlocks.schema,
    ['h', 'SELECT und FROM'],
    ['code', 'sql', `SELECT name, ort        -- welche Spalten?
FROM kunde;              -- aus welcher Tabelle?

SELECT * FROM artikel;   -- * = alle Spalten`],
    ['table', ['name', 'ort'], [['Meier', 'Göppingen'], ['Schulz', 'Ulm'], ['Yilmaz', 'Stuttgart'], ['Brandt', 'Ulm']], {first: false}],
    ['h', 'WHERE: Zeilen filtern'],
    ['code', 'sql', `SELECT name, ort
FROM kunde
WHERE ort = 'Ulm';`],
    ['table', ['name', 'ort'], [['Schulz', 'Ulm'], ['Brandt', 'Ulm']], {first: false}],
    ['table', ['Operator', 'Bedeutung', 'Beispiel'], [
      ['`=`, `<>` (oder `!=`)', 'gleich, ungleich', '`preis <> 19.90`'],
      ['`<  >  <=  >=`', 'Größenvergleich', '`preis >= 100`'],
      ['`AND`, `OR`, `NOT`', 'Verknüpfen (AND vor OR, Klammern setzen!)', '`kategorie = \'Zubehör\' AND preis < 20`'],
      ['`BETWEEN a AND b`', 'Bereich, **Grenzen eingeschlossen**', '`preis BETWEEN 10 AND 100`'],
      ['`IN (...)`', 'Wert ist in der Liste', '`ort IN (\'Ulm\', \'Stuttgart\')`'],
      ['`LIKE`', 'Textmuster: `%` beliebig viele Zeichen, `_` genau eins', '`bezeichnung LIKE \'M%\'` (Maus, Monitor)'],
      ['`IS NULL`', 'Wert fehlt (NULL ist **nicht** gleich 0 oder leer)', '`ort IS NULL`'],
    ]],
    ['code', 'sql', `SELECT bezeichnung, preis
FROM artikel
WHERE preis BETWEEN 10 AND 100       -- 10 und 100 eingeschlossen
ORDER BY preis DESC;                 -- teuerster zuerst`],
    ['table', ['bezeichnung', 'preis'], [['Webcam', '49.00'], ['Tastatur', '39.90'], ['Maus', '19.90']], {first: false}],
    ['code', 'sql', `SELECT bezeichnung FROM artikel WHERE bezeichnung LIKE 'M%';`],
    ['table', ['bezeichnung'], [['Maus'], ['Monitor']], {first: false}],
  ],
});
