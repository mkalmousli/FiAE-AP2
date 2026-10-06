AP2.page('course-sql-03', {
  b: 'course', g: 'SQL', t: 'SQL 3: Abfragen mit SELECT, WHERE und ORDER BY',
  d: 'Mit `SELECT spalten FROM tabelle` liest man Daten. `WHERE` filtert **Zeilen** nach Bedingungen (Vergleiche, `AND`/`OR`/`NOT`, `BETWEEN`, `IN`, `LIKE`, `IS NULL`). `ORDER BY` sortiert das Ergebnis (`ASC` aufsteigend, `DESC` absteigend), `DISTINCT` entfernt doppelte Ergebniszeilen, `LIMIT` (MySQL/PostgreSQL) bzw. `TOP` (SQL Server) begrenzt die Anzahl. Mit `AS` vergibt man **Aliasnamen** für Spalten und Tabellen; im SELECT darf man auch **rechnen**.',
  m: '**Logische Reihenfolge: FROM -> WHERE -> SELECT -> ORDER BY -> LIMIT.** **Text in einfachen Anführungszeichen, Datum als \'JJJJ-MM-TT\'.** **LIKE: % = beliebig viele Zeichen, _ = genau eins.** **NULL nie mit = prüfen, sondern IS NULL.** **BETWEEN schließt beide Grenzen ein.**',
  cheat: [
    ['Grundform', ['`SELECT a, b FROM t`', '`SELECT * FROM t`', '`SELECT DISTINCT ort FROM Kunde`', '`SELECT preis * 1.19 AS brutto`']],
    ['WHERE', ['`= <> < > <= >=`', '`AND`, `OR`, `NOT`, Klammern', '`BETWEEN 10 AND 20`', '`IN (1, 2, 3)`, `IS NULL`']],
    ['LIKE', ['`LIKE \'Ski%\'` beginnt mit', '`LIKE \'%dorn\'` endet mit', '`LIKE \'%Rose%\'` enthält', '`LIKE \'_a%\'` 2. Zeichen a']],
    ['Sortieren', ['`ORDER BY preis DESC`', '`ORDER BY ort, nachname`', '`LIMIT 3` / `LIMIT 3 OFFSET 3`', 'SQL Server: `SELECT TOP 3`']],
  ],
  blocks: [
    ['h', 'Spalten auswählen'],
    ['code', 'sql', `SELECT * FROM Artikel;                           -- alle Spalten (bequem, aber in Programmen vermeiden)
SELECT bezeichnung, preis FROM Artikel;          -- nur bestimmte Spalten
SELECT bezeichnung AS Artikel,
       preis,
       preis * 1.19 AS brutto                    -- berechnete Spalte mit Alias
FROM Artikel;
SELECT DISTINCT ort FROM Kunde;                  -- jeder Ort nur einmal`],
    ['table', ['Artikel', 'preis', 'brutto'], [
      ['Feuerdorn', '5.00', '5.95'], ['rote Rosen', '2.30', '2.737'], ['Linde', '42.50', '50.575'], ['Flieder', '19.50', '23.205'], ['Glockenblume', '1.80', '2.142'],
    ]],
    ['h', 'Zeilen filtern mit WHERE'],
    ['code', 'sql', `SELECT * FROM Artikel WHERE preis > 10;                        -- Linde, Flieder
SELECT * FROM Artikel WHERE kategorie = 'Strauch';               -- Text in '...'
SELECT * FROM Artikel WHERE kategorie <> 'Baum';                 -- ungleich (auch !=)
SELECT * FROM Artikel WHERE preis BETWEEN 2 AND 20;              -- 2 <= preis <= 20
SELECT * FROM Kunde WHERE ort IN ('Reutlingen', 'München');      -- einer von mehreren
SELECT * FROM Bestellung WHERE datum >= '2026-04-01';            -- Datum vergleichen
SELECT * FROM Artikel
WHERE kategorie = 'Strauch' AND (preis < 10 OR bezeichnung LIKE 'F%');`],
    ['warn', '**AND bindet stärker als OR.** `WHERE kategorie = \'Blume\' OR kategorie = \'Strauch\' AND preis < 3` bedeutet "alle Blumen **oder** (Sträucher unter 3 €)". Im Zweifel immer **Klammern** setzen.'],
    ['h', 'Muster mit LIKE'],
    ['code', 'sql', `SELECT * FROM Artikel WHERE bezeichnung LIKE 'F%';        -- beginnt mit F: Feuerdorn, Flieder
SELECT * FROM Artikel WHERE bezeichnung LIKE '%rose%';     -- enthält "rose" (Groß/klein je nach DBMS)
SELECT * FROM Kunde   WHERE plz LIKE '72___';             -- 72 und genau drei weitere Zeichen
SELECT COUNT(*) FROM Kurs WHERE Titel LIKE '%Skifahren%' AND YEAR(Beginn) = 2022;   -- Sommer 2024`],
    ['h', 'NULL: der fehlende Wert'],
    ['code', 'sql', `SELECT * FROM Kunde WHERE email IS NULL;         -- RICHTIG
SELECT * FROM Kunde WHERE email = NULL;          -- FALSCH: liefert nie etwas
SELECT nachname, COALESCE(email, 'keine') AS email FROM Kunde;   -- Ersatzwert`],
    ['p', '`NULL` bedeutet "unbekannt". Jeder Vergleich mit NULL (auch `NULL = NULL`) ergibt **unbekannt**, nicht wahr. Deshalb gibt es `IS NULL` und `IS NOT NULL`.'],
    ['h', 'Sortieren und begrenzen'],
    ['code', 'sql', `SELECT bezeichnung, preis FROM Artikel ORDER BY preis DESC;          -- teuerste zuerst
SELECT nachname, vorname, ort FROM Kunde ORDER BY ort ASC, nachname;  -- erst nach Ort, dann Name
SELECT bezeichnung, preis FROM Artikel ORDER BY preis DESC LIMIT 1;   -- der teuerste Artikel
SELECT bezeichnung FROM Artikel ORDER BY bezeichnung LIMIT 2 OFFSET 2; -- Zeilen 3 und 4 (Seite 2)
-- MySQL-Kurzform LIMIT 0, 3 = Offset 0, 3 Zeilen; SQL Server: SELECT TOP 1 ...`],
    ['h', 'Rechnen und Funktionen in der Abfrage'],
    ['code', 'sql', `SELECT bezeichnung, ROUND(preis * 0.9, 2) AS aktionspreis FROM Artikel;
SELECT CONCAT(vorname, ' ', nachname) AS name, UPPER(ort) FROM Kunde;   -- Text verbinden
SELECT bestell_id, YEAR(datum) AS jahr, MONTH(datum) AS monat FROM Bestellung;
SELECT bezeichnung,
       CASE WHEN preis < 5 THEN 'günstig'
            WHEN preis < 20 THEN 'mittel'
            ELSE 'teuer' END AS preisklasse
FROM Artikel;`],
    ['table', ['Funktion', 'Beispiel', 'Ergebnis'], [
      ['`ROUND(x, n)`', '`ROUND(2.737, 2)`', '2.74'],
      ['`CONCAT(a, b)`', '`CONCAT(\'Max\', \' \', \'Muster\')`', 'Max Muster'],
      ['`UPPER`, `LOWER`, `LENGTH`', '`LENGTH(\'Linde\')`', '5'],
      ['`SUBSTRING(s, start, len)`', '`SUBSTRING(\'Feuerdorn\', 1, 5)`', 'Feuer'],
      ['`YEAR`, `MONTH`, `DAY`', '`YEAR(\'2026-03-02\')`', '2026'],
      ['`CURDATE()` / `NOW()`', 'heutiges Datum / jetzt', '2026-10-07'],
      ['`DATEDIFF(a, b)`', 'Tage zwischen zwei Daten', '`DATEDIFF(\'2026-04-11\', \'2026-03-02\')` = 40'],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Geben Sie Nachname und Vorname aller Kunden aus Reutlingen alphabetisch nach Nachname aus.', [['code', 'sql', `SELECT nachname, vorname
FROM Kunde
WHERE ort = 'Reutlingen'
ORDER BY nachname ASC;`], 'Ergebnis: Könner Tom, Yilmaz Cem.'], 3],
    ['qa', 'Listen Sie alle Artikel, deren Bezeichnung mit "F" beginnt oder die weniger als 2 € kosten, mit Bruttopreis (19 %), auf zwei Stellen gerundet.', [['code', 'sql', `SELECT bezeichnung, ROUND(preis * 1.19, 2) AS brutto
FROM Artikel
WHERE bezeichnung LIKE 'F%' OR preis < 2;`], 'Ergebnis: Feuerdorn 5.95, Flieder 23.21, Glockenblume 2.14.'], 4],
    ['quiz', [
      {q: 'Welche Bedingung findet Kunden ohne E-Mail?', o: ['email IS NULL', 'email = NULL', "email = ''", 'email == NULL'], a: 0, e: 'NULL nur mit IS prüfen.'},
      {q: 'Was findet LIKE \'_a%\'?', o: ['Texte mit a als zweitem Zeichen', 'Texte, die mit a beginnen', 'Texte, die a enthalten', 'Texte mit genau 2 Zeichen'], a: 0, e: '_ = genau ein Zeichen.'},
      {q: 'Schließt BETWEEN 2 AND 5 die Werte 2 und 5 ein?', o: ['Ja, beide', 'Nein', 'Nur 2', 'Nur 5'], a: 0, e: 'Inklusive.'},
      {q: 'Wie sortiert man absteigend?', o: ['ORDER BY preis DESC', 'ORDER BY preis DOWN', 'SORT preis DESC', 'ORDER preis -1'], a: 0, e: 'ASC ist Standard.'},
      {q: 'Was macht DISTINCT?', o: ['Entfernt doppelte Ergebniszeilen', 'Sortiert', 'Zählt', 'Filtert NULL'], a: 0, e: 'Bezogen auf alle ausgewählten Spalten.'},
    ]],
    ['see', ['course-sql-02', 'course-sql-04', 'eua-sqlselect']],
  ],
});
