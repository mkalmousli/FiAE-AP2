AP2.page('course-sql-05', {
  b: 'course', g: 'SQL', t: 'SQL 5: Tabellen verknüpfen mit JOIN',
  d: 'Weil die Daten normalisiert auf mehrere Tabellen verteilt sind, muss man sie für Abfragen wieder **verknüpfen**. Ein **JOIN** verbindet Zeilen zweier Tabellen über eine **Bedingung**, meist Fremdschlüssel = Primärschlüssel (`ON b.kunde_id = k.kunde_id`). Der **INNER JOIN** liefert nur Zeilen mit passendem Partner. Der **LEFT JOIN** liefert alle Zeilen der linken Tabelle, auch ohne Partner (die Spalten der rechten Tabelle sind dann NULL); `RIGHT JOIN` umgekehrt, `FULL OUTER JOIN` beide Seiten. Ein **CROSS JOIN** bildet das kartesische Produkt, ein **Self Join** verknüpft eine Tabelle mit sich selbst.',
  m: '**Pro Verknüpfung ein JOIN mit ON-Bedingung; n Tabellen -> n-1 JOINs.** **Tabellen-Aliase (`Kunde k`) machen Abfragen kürzer und eindeutig.** **"Auch die ohne ..." -> LEFT JOIN. "Alle, die keine ..." -> LEFT JOIN + WHERE rechts IS NULL.** **Bei LEFT JOIN zählen mit COUNT(rechte_spalte), nicht COUNT(*).**',
  cheat: [
    ['INNER JOIN', ['nur Zeilen mit Partner', '`FROM Kunde k JOIN Bestellung b`', '`ON k.kunde_id = b.kunde_id`', '`JOIN` = `INNER JOIN`']],
    ['OUTER JOIN', ['`LEFT JOIN`: alle links', '`RIGHT JOIN`: alle rechts', '`FULL OUTER JOIN`: alle', 'fehlende Seite: NULL']],
    ['Mehrere Tabellen', ['Kunde - Bestellung - Position - Artikel', 'Kette von JOINs', 'Zwischentabelle verbindet n:m', 'Alias je Tabelle']],
    ['Spezial', ['`CROSS JOIN`: jedes mit jedem', 'Self Join: Tabelle zweimal mit Alias', 'alte Syntax: `FROM a, b WHERE a.x = b.x`', 'USING (spalte) bei gleichem Namen']],
  ],
  blocks: [
    ['h', 'INNER JOIN: nur passende Paare'],
    ['code', 'sql', `SELECT b.bestell_id, b.datum, k.nachname, k.vorname
FROM Bestellung b
INNER JOIN Kunde k ON b.kunde_id = k.kunde_id
ORDER BY b.datum;`],
    ['table', ['bestell_id', 'datum', 'nachname', 'vorname'], [
      ['100', '2026-03-02', 'Muster', 'Max'], ['101', '2026-03-05', 'Könner', 'Tom'], ['102', '2026-04-11', 'Muster', 'Max'], ['103', '2026-04-20', 'Weiß', 'Anna'],
    ]],
    ['p', 'Kunde 4 (Yilmaz) erscheint nicht, weil er keine Bestellung hat. Kunde 1 erscheint zweimal, weil er zwei Bestellungen hat.'],
    ['h', 'Die JOIN-Arten'],
    ['diagram', {w: 760, h: 170, keep: 560, cap: 'Mengenbild der JOIN-Arten (links Kunde, rechts Bestellung).', nodes: [
      {id: 'a1', k: 'oval', x: 110, y: 70, w: 110, h: 80, t: '', s: 'soft'}, {id: 'b1', k: 'oval', x: 170, y: 70, w: 110, h: 80, t: '', s: 'soft'}, {id: 't1', k: 'text', x: 140, y: 140, t: 'INNER: Schnittmenge', w: 10, h: 10},
      {id: 'a2', k: 'oval', x: 360, y: 70, w: 110, h: 80, t: 'alle', s: 'accent'}, {id: 'b2', k: 'oval', x: 420, y: 70, w: 110, h: 80, t: '', s: 'soft'}, {id: 't2', k: 'text', x: 390, y: 140, t: 'LEFT: alle Kunden', w: 10, h: 10},
      {id: 'a3', k: 'oval', x: 610, y: 70, w: 110, h: 80, t: 'nur', s: 'accent'}, {id: 'b3', k: 'oval', x: 670, y: 70, w: 110, h: 80, t: '', s: 'plain'}, {id: 't3', k: 'text', x: 640, y: 140, t: 'LEFT + IS NULL: ohne Bestellung', w: 10, h: 10},
    ], edges: []}],
    ['h', 'LEFT JOIN: auch Zeilen ohne Partner'],
    ['code', 'sql', `-- Alle Kunden mit Anzahl ihrer Bestellungen, auch Kunden ohne Bestellung
SELECT k.nachname, COUNT(b.bestell_id) AS bestellungen
FROM Kunde k
LEFT JOIN Bestellung b ON b.kunde_id = k.kunde_id
GROUP BY k.kunde_id, k.nachname;`],
    ['table', ['nachname', 'bestellungen'], [['Muster', '2'], ['Könner', '1'], ['Weiß', '1'], ['Yilmaz', '**0**']]],
    ['code', 'sql', `-- Kunden, die noch NIE bestellt haben
SELECT k.nachname
FROM Kunde k
LEFT JOIN Bestellung b ON b.kunde_id = k.kunde_id
WHERE b.bestell_id IS NULL;              -- Yilmaz`],
    ['warn', 'Mit `COUNT(*)` statt `COUNT(b.bestell_id)` hätte Yilmaz **1** statt 0, weil der LEFT JOIN für ihn eine Zeile (mit NULL-Werten) erzeugt. Und: Eine Bedingung auf die rechte Tabelle im **WHERE** (zum Beispiel `WHERE b.datum >= \'2026-04-01\'`) macht aus dem LEFT JOIN faktisch einen INNER JOIN; solche Bedingungen gehören in die **ON**-Klausel.'],
    ['h', 'Über mehrere Tabellen (n:m)'],
    ['code', 'sql', `-- Rechnung: welche Artikel hat Max Muster in Bestellung 100 gekauft?
SELECT a.bezeichnung, p.menge, a.preis, p.menge * a.preis AS gesamt
FROM Kunde k
JOIN Bestellung b ON b.kunde_id   = k.kunde_id
JOIN Position   p ON p.bestell_id = b.bestell_id
JOIN Artikel    a ON a.artikel_id = p.artikel_id
WHERE b.bestell_id = 100;`],
    ['table', ['bezeichnung', 'menge', 'preis', 'gesamt'], [['Feuerdorn', '10', '5.00', '50.00'], ['rote Rosen', '10', '2.30', '23.00']]],
    ['code', 'sql', `-- Umsatz je Kunde
SELECT k.nachname, SUM(p.menge * a.preis) AS umsatz
FROM Kunde k
JOIN Bestellung b ON b.kunde_id = k.kunde_id
JOIN Position p   ON p.bestell_id = b.bestell_id
JOIN Artikel a    ON a.artikel_id = p.artikel_id
GROUP BY k.kunde_id, k.nachname
ORDER BY umsatz DESC;
-- Muster 137.00 (73 + 25 + 39), Könner 42.50, Weiß 36.00`],
    ['h', 'Self Join und Cross Join'],
    ['code', 'sql', `-- Self Join: Mitarbeiter mit ihrem Vorgesetzten (beide in derselben Tabelle)
SELECT m.name AS mitarbeiter, v.name AS vorgesetzter
FROM Mitarbeiter m
LEFT JOIN Mitarbeiter v ON m.vorgesetzter_id = v.id;

-- Kunden aus demselben Ort (Paare, ohne doppelte und ohne sich selbst)
SELECT k1.nachname, k2.nachname, k1.ort
FROM Kunde k1 JOIN Kunde k2 ON k1.ort = k2.ort AND k1.kunde_id < k2.kunde_id;   -- Könner/Yilmaz

-- Cross Join: alle Kombinationen (zum Beispiel Größen x Farben)
SELECT g.groesse, f.farbe FROM Groesse g CROSS JOIN Farbe f;`],
    ['h', 'Alte Join-Syntax'],
    ['code', 'sql', `SELECT k.nachname, b.datum
FROM Kunde k, Bestellung b
WHERE k.kunde_id = b.kunde_id;     -- gleichwertig zum INNER JOIN, aber unübersichtlicher.
-- Vergisst man das WHERE, entsteht ein Kreuzprodukt (4 x 4 = 16 Zeilen)!`],
    ['h', 'Übungen'],
    ['qa', 'Geben Sie alle Artikel mit der insgesamt verkauften Menge aus, auch Artikel, die nie verkauft wurden (Menge 0).', [['code', 'sql', `SELECT a.bezeichnung, COALESCE(SUM(p.menge), 0) AS verkauft
FROM Artikel a
LEFT JOIN Position p ON p.artikel_id = a.artikel_id
GROUP BY a.artikel_id, a.bezeichnung;`], 'SUM über nur NULL-Werte ist NULL, deshalb COALESCE.'], 5],
    ['qa', 'Listen Sie Nachname und Vorname aller Kunden, die Sträucher gekauft haben, jeden Kunden nur einmal.', [['code', 'sql', `SELECT DISTINCT k.nachname, k.vorname
FROM Kunde k
JOIN Bestellung b ON b.kunde_id = k.kunde_id
JOIN Position p   ON p.bestell_id = b.bestell_id
JOIN Artikel a    ON a.artikel_id = p.artikel_id
WHERE a.kategorie = 'Strauch';`], 'Ergebnis: Muster Max.'], 5],
    ['quiz', [
      {q: 'Welcher JOIN liefert auch Kunden ohne Bestellung?', o: ['LEFT JOIN (Kunde links)', 'INNER JOIN', 'CROSS JOIN', 'Keiner'], a: 0, e: 'Fehlende Seite wird NULL.'},
      {q: 'Wie viele JOINs braucht man für vier Tabellen in einer Kette?', o: ['3', '4', '2', '1'], a: 0, e: 'n - 1.'},
      {q: 'Was entsteht bei FROM a, b ohne WHERE?', o: ['Ein Kreuzprodukt', 'Ein INNER JOIN', 'Ein Fehler', 'Nur Tabelle a'], a: 0, e: 'Jede Zeile mit jeder.'},
      {q: 'Wie findet man Kunden ohne Bestellung?', o: ['LEFT JOIN + WHERE b.bestell_id IS NULL', 'INNER JOIN + WHERE IS NULL', 'RIGHT JOIN', 'GROUP BY'], a: 0, e: 'Alternativ NOT EXISTS.'},
    ]],
    ['see', ['course-sql-04', 'course-sql-06', 'eua-sqljoin']],
  ],
});
