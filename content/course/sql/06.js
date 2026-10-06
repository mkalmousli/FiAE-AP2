AP2.page('course-sql-06', {
  b: 'course', g: 'SQL', t: 'SQL 6: Unterabfragen und Mengenoperationen',
  d: 'Eine **Unterabfrage** (Subquery) ist ein `SELECT` innerhalb eines anderen Befehls. Sie kann einen **einzelnen Wert** liefern (`WHERE preis = (SELECT MAX(preis) FROM Artikel)`), eine **Liste** (`WHERE kunde_id IN (SELECT ...)`) oder eine **Tabelle** im FROM (abgeleitete Tabelle). Mit `EXISTS`/`NOT EXISTS` prüft man, ob es passende Zeilen gibt; eine **korrelierte** Unterabfrage bezieht sich auf die äußere Zeile. **Mengenoperationen** (`UNION`, `UNION ALL`, `INTERSECT`, `EXCEPT`) kombinieren die Ergebnisse zweier Abfragen mit gleicher Spaltenstruktur. Häufige Teilergebnisse lassen sich mit `WITH` (CTE) benennen.',
  m: '**Vergleich mit einem Wert (=, >) nur, wenn die Unterabfrage genau einen Wert liefert, sonst IN.** **"Wer hat nie ...?" -> NOT EXISTS oder NOT IN (Vorsicht bei NULL!).** **UNION entfernt Duplikate, UNION ALL nicht.** **Unterabfrage im FROM braucht einen Alias.**',
  cheat: [
    ['Skalar', ['`WHERE preis = (SELECT MAX(preis) FROM Artikel)`', '`WHERE preis > (SELECT AVG(preis) ...)`', 'liefert genau 1 Wert', 'auch im SELECT möglich']],
    ['Liste', ['`WHERE id IN (SELECT ...)`', '`WHERE id NOT IN (...)`', '`> ALL (...)`, `> ANY (...)`', 'NULL in der Liste: NOT IN liefert nichts!']],
    ['EXISTS', ['`WHERE EXISTS (SELECT 1 FROM ... WHERE x = außen.x)`', 'korreliert: bezieht sich auf äußere Zeile', '`NOT EXISTS` für "nie"', 'oft schneller als IN']],
    ['Mengen', ['`UNION` ohne Duplikate', '`UNION ALL` mit Duplikaten', '`INTERSECT` Schnittmenge', '`EXCEPT` (MINUS) Differenz']],
  ],
  blocks: [
    ['h', 'Unterabfrage, die einen Wert liefert'],
    ['code', 'sql', `-- der teuerste Artikel (alle, falls mehrere gleich teuer sind)
SELECT bezeichnung, preis
FROM Artikel
WHERE preis = (SELECT MAX(preis) FROM Artikel);        -- Linde 42.50

-- Artikel, die teurer als der Durchschnitt sind
SELECT bezeichnung, preis
FROM Artikel
WHERE preis > (SELECT AVG(preis) FROM Artikel);        -- Linde, Flieder (Schnitt 14.22)

-- Abweichung vom Durchschnitt als Spalte
SELECT bezeichnung, preis - (SELECT AVG(preis) FROM Artikel) AS abweichung FROM Artikel;`],
    ['warn', '`WHERE preis = MAX(preis)` ist **falsch**: Aggregatfunktionen sind im WHERE nicht erlaubt. Man braucht die Unterabfrage (oder `ORDER BY preis DESC LIMIT 1`).'],
    ['h', 'Unterabfrage mit IN'],
    ['code', 'sql', `-- Kunden, die mindestens einmal bestellt haben
SELECT nachname FROM Kunde
WHERE kunde_id IN (SELECT kunde_id FROM Bestellung);         -- Muster, Könner, Weiß

-- Artikel, die nie verkauft wurden
SELECT bezeichnung FROM Artikel
WHERE artikel_id NOT IN (SELECT artikel_id FROM Position);   -- (im Beispiel alle verkauft)`],
    ['note', '**NOT IN und NULL:** Enthält die Unterabfrage auch nur einen NULL-Wert, liefert `NOT IN` **gar keine** Zeile (weil `x <> NULL` unbekannt ist). `NOT EXISTS` hat dieses Problem nicht.'],
    ['h', 'EXISTS und korrelierte Unterabfragen'],
    ['code', 'sql', `-- Kunden ohne Bestellung
SELECT k.nachname
FROM Kunde k
WHERE NOT EXISTS (SELECT 1 FROM Bestellung b WHERE b.kunde_id = k.kunde_id);   -- Yilmaz

-- Teuerster Artikel JE KATEGORIE (korreliert: innere Abfrage nutzt a.kategorie)
SELECT a.kategorie, a.bezeichnung, a.preis
FROM Artikel a
WHERE a.preis = (SELECT MAX(a2.preis) FROM Artikel a2 WHERE a2.kategorie = a.kategorie);`],
    ['p', 'Eine **korrelierte** Unterabfrage wird gedanklich **für jede Zeile** der äußeren Abfrage neu ausgewertet. Sie ist mächtig, kann bei großen Tabellen aber langsam sein; oft lässt sie sich durch einen JOIN mit GROUP BY ersetzen.'],
    ['h', 'Unterabfrage im FROM und WITH (CTE)'],
    ['code', 'sql', `-- Durchschnittlicher Umsatz pro Bestellung
SELECT AVG(summe) AS schnitt_bestellwert
FROM (SELECT p.bestell_id, SUM(p.menge * a.preis) AS summe
      FROM Position p JOIN Artikel a ON a.artikel_id = p.artikel_id
      GROUP BY p.bestell_id) AS je_bestellung;       -- Alias ist Pflicht

-- dasselbe lesbarer mit Common Table Expression
WITH je_bestellung AS (
  SELECT p.bestell_id, SUM(p.menge * a.preis) AS summe
  FROM Position p JOIN Artikel a ON a.artikel_id = p.artikel_id
  GROUP BY p.bestell_id
)
SELECT AVG(summe) FROM je_bestellung;                 -- (73 + 42.5 + 64 + 36) / 4 = 53.875`],
    ['h', 'Mengenoperationen'],
    ['code', 'sql', `-- Alle Orte von Kunden und Lieferanten (ohne Doppelte)
SELECT ort FROM Kunde
UNION
SELECT ort FROM Lieferant;

-- Mit Duplikaten (schneller, kein Sortieren)
SELECT ort FROM Kunde UNION ALL SELECT ort FROM Lieferant;

-- Orte, in denen es Kunden UND Lieferanten gibt
SELECT ort FROM Kunde INTERSECT SELECT ort FROM Lieferant;

-- Orte mit Kunden, aber ohne Lieferanten
SELECT ort FROM Kunde EXCEPT SELECT ort FROM Lieferant;     -- Oracle: MINUS`],
    ['p', 'Bedingung: Beide Abfragen haben **gleich viele Spalten** mit **verträglichen Typen**. Die Spaltennamen des Ergebnisses kommen aus der ersten Abfrage; `ORDER BY` steht einmal ganz am Ende. MySQL unterstützt INTERSECT und EXCEPT erst ab Version 8.0.31.'],
    ['h', 'Übungen'],
    ['qa', 'Geben Sie den Modellnamen und Preis des teuersten verkauften Fahrzeugs aus (Winter 2022/23). Tabellen: `Verkauf(idVK, idFahrzeug, Preis)`, `Fahrzeug(idFahrzeug, idModell)`, `Modell(idModell, ModellName)`.', [['code', 'sql', `SELECT m.ModellName, v.Preis
FROM Verkauf v
JOIN Fahrzeug f ON v.idFahrzeug = f.idFahrzeug
JOIN Modell m   ON f.idModell = m.idModell
WHERE v.Preis = (SELECT MAX(Preis) FROM Verkauf);`]], 6],
    ['qa', 'Finden Sie alle Kunden, deren Umsatz über dem durchschnittlichen Kundenumsatz liegt.', [['code', 'sql', `WITH umsatz AS (
  SELECT b.kunde_id, SUM(p.menge * a.preis) AS summe
  FROM Bestellung b
  JOIN Position p ON p.bestell_id = b.bestell_id
  JOIN Artikel a  ON a.artikel_id = p.artikel_id
  GROUP BY b.kunde_id
)
SELECT k.nachname, u.summe
FROM umsatz u JOIN Kunde k ON k.kunde_id = u.kunde_id
WHERE u.summe > (SELECT AVG(summe) FROM umsatz);     -- Muster (137 > 71.83)`]], 6],
    ['quiz', [
      {q: 'Warum ist WHERE preis = MAX(preis) falsch?', o: ['Aggregatfunktionen sind im WHERE nicht erlaubt', 'MAX gibt es nicht', 'Man muss MAXIMUM schreiben', 'Es ist korrekt'], a: 0, e: 'Unterabfrage verwenden.'},
      {q: 'Was ist der Unterschied zwischen UNION und UNION ALL?', o: ['UNION entfernt Duplikate', 'UNION ALL entfernt Duplikate', 'Kein Unterschied', 'UNION sortiert absteigend'], a: 0, e: 'UNION ALL ist schneller.'},
      {q: 'Was liefert NOT IN, wenn die Unterabfrage einen NULL-Wert enthält?', o: ['Keine Zeilen', 'Alle Zeilen', 'Einen Fehler', 'Nur NULL-Zeilen'], a: 0, e: 'NOT EXISTS verwenden.'},
      {q: 'Was braucht eine Unterabfrage im FROM?', o: ['Einen Alias', 'Ein ORDER BY', 'Ein LIMIT', 'Nichts'], a: 0, e: 'Abgeleitete Tabelle.'},
    ]],
    ['see', ['course-sql-05', 'course-sql-07', 'eua-sqlexam']],
  ],
});
