AP2.add('eua-sqljoin', [
  ['h', 'Mehrere Tabellen verknüpfen'],
  ['p', 'Um die **Positionen einer Bestellung mit Artikelnamen und Summen** zu sehen, werden **mehrere JOINs** hintereinander verwendet: Bestellung zu Position zu Artikel.'],
  ['code', 'sql', `SELECT b.bestell_id, a.bezeichnung, p.menge, a.preis * p.menge AS summe
FROM bestellung b
INNER JOIN position p ON b.bestell_id = p.bestell_id
INNER JOIN artikel  a ON p.artikel_id = a.artikel_id
ORDER BY b.bestell_id;`],
  ['table', ['bestell_id', 'bezeichnung', 'menge', 'summe'], [['101', 'Maus', '2', '39.80'], ['101', 'Kabel', '3', '14.70'], ['102', 'Monitor', '1', '189.00'], ['103', 'Tastatur', '1', '39.90'], ['103', 'Maus', '1', '19.90'], ['104', 'Laptop', '1', '899.00']], {first: false}],
  ['steps', ['Starte mit der Tabelle `bestellung` (Alias `b`).', 'Verknüpfe `position` (Alias `p`) über `bestell_id`.', 'Verknüpfe `artikel` (Alias `a`) über `artikel_id`.', 'Berechne `preis mal menge` als Spalte `summe`.']],
  ['h', 'Welche Artikel wurden noch nie bestellt?'],
  ['code', 'sql', `SELECT a.bezeichnung
FROM artikel a
LEFT JOIN position p ON a.artikel_id = p.artikel_id
WHERE p.artikel_id IS NULL;`],
  ['table', ['bezeichnung'], [['Webcam']], {first: false}],
  ['h', 'Weitere JOIN-Formen'],
  ['kv', [
    ['CROSS JOIN (Kreuzprodukt)', 'Jede Zeile der linken Tabelle mit **jeder** der rechten. Bei 4 Kunden und 6 Artikeln ergibt das 24 Zeilen. Entsteht **ungewollt**, wenn die ON-Bedingung fehlt.'],
    ['Self Join', 'Eine Tabelle wird mit **sich selbst** verknüpft (mit zwei Aliasen). Beispiel: Mitarbeiter und deren Vorgesetzter in derselben Tabelle `mitarbeiter(id, name, chef_id)`: `FROM mitarbeiter m JOIN mitarbeiter c ON m.chef_id = c.id`.'],
    ['Alte Schreibweise', '`FROM kunde k, bestellung b WHERE k.kunden_id = b.kunden_id` (Komma-Join) funktioniert, ist aber fehleranfälliger. Verwende `JOIN ... ON`.'],
    ['USING / NATURAL JOIN', '`USING (kunden_id)` kürzt die ON-Bedingung ab, wenn die Spalte in beiden Tabellen gleich heißt.'],
    ['Reihenfolge', 'Bei INNER JOIN egal. Bei **LEFT JOIN** bestimmt die Reihenfolge, welche Tabelle vollständig erhalten bleibt (die **linke**).'],
  ]],
  ['table', ['Frage', 'Lösung'], [
    ['Alle Kunden mit ihren Bestellungen (nur Kunden mit Bestellung)', '`INNER JOIN`'],
    ['Alle Kunden, auch ohne Bestellung', '`kunde LEFT JOIN bestellung`'],
    ['Nur Kunden ohne Bestellung', '`LEFT JOIN ... WHERE bestellung.pk IS NULL`'],
    ['Nur Artikel, die verkauft wurden', '`INNER JOIN position` oder `EXISTS`'],
    ['Alle Kombinationen', '`CROSS JOIN`'],
  ]],
  ['warn', ['**Typische Fehler:**', '- **ON vergessen** oder falsche Spalten verknüpft: unerwartet viele (Kreuzprodukt) oder falsche Zeilen.', '- Bei **LEFT JOIN** eine Bedingung der **rechten** Tabelle in die **WHERE**-Klausel schreiben: Die NULL-Zeilen fallen heraus und der LEFT JOIN verhält sich wie ein INNER JOIN. Solche Bedingungen gehören in die **ON**-Klausel.', '- Mehrdeutiger Spaltenname (`kunden_id` in zwei Tabellen) ohne Alias: Fehler "ambiguous column".']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Schreiben Sie eine Abfrage, die zu jeder Bestellung den Namen des Kunden und das Datum ausgibt.', ['`SELECT b.bestell_id, k.name, b.datum`', '`FROM bestellung b`', '`INNER JOIN kunde k ON b.kunden_id = k.kunden_id;`', 'Ergebnis: 101 Meier, 102 Meier, 103 Schulz, 104 Yilmaz.'], 5],
  ['qa', 'Wie finden Sie alle Kunden, die noch nichts bestellt haben?', ['`SELECT k.name FROM kunde k LEFT JOIN bestellung b ON k.kunden_id = b.kunden_id WHERE b.bestell_id IS NULL;`', 'Ergebnis: Brandt. Alternative: `WHERE NOT EXISTS (SELECT 1 FROM bestellung b WHERE b.kunden_id = k.kunden_id)`.'], 5],
  ['qa', 'Erklären Sie den Unterschied zwischen INNER JOIN und LEFT JOIN.', 'Der **INNER JOIN** liefert nur Zeilen, für die es in **beiden** Tabellen einen passenden Partner gibt. Der **LEFT JOIN** liefert **alle Zeilen der linken Tabelle**; findet sich rechts kein Partner, werden die Spalten der rechten Tabelle mit **NULL** gefüllt.', 4],
  ['qa', 'Welche Artikel hat Kunde Meier insgesamt bestellt? Schreiben Sie die Abfrage.', ['`SELECT DISTINCT a.bezeichnung`', '`FROM kunde k`', '`JOIN bestellung b ON k.kunden_id = b.kunden_id`', '`JOIN position p ON b.bestell_id = p.bestell_id`', '`JOIN artikel a ON p.artikel_id = a.artikel_id`', '`WHERE k.name = \'Meier\';`', 'Ergebnis: Maus, Kabel, Monitor.'], 6],
  ['quiz', [
    {q: 'Welcher JOIN liefert nur Zeilen mit Treffer in beiden Tabellen?', o: ['INNER JOIN', 'LEFT JOIN', 'FULL JOIN', 'CROSS JOIN'], a: 0, e: 'INNER JOIN = Schnittmenge.'},
    {q: 'Kunden ohne Bestellung findet man mit:', o: ['LEFT JOIN und WHERE bestellung.pk IS NULL', 'INNER JOIN', 'CROSS JOIN', 'ORDER BY'], a: 0, e: 'Der Anti-Join nutzt die NULL-Zeilen des LEFT JOIN.'},
    {q: 'Was entsteht, wenn bei einem JOIN die ON-Bedingung fehlt?', o: ['Ein Kreuzprodukt (alle Kombinationen)', 'Ein Fehler beim Speichern', 'Eine leere Tabelle', 'Eine sortierte Tabelle'], a: 0, e: 'Jede Zeile wird mit jeder kombiniert.'},
    {q: 'Was steht in der ON-Bedingung bei einer 1:n-Beziehung typischerweise?', o: ['Fremdschlüssel = Primärschlüssel', 'Name = Ort', 'Preis > 100', 'ORDER BY'], a: 0, e: 'Die Schlüsselspalten verknüpfen die Tabellen.'},
    {q: 'Wozu dient ein Alias (zum Beispiel FROM kunde k)?', o: ['Kürzere Schreibweise und eindeutige Spaltennamen', 'Löscht die Tabelle', 'Sortiert das Ergebnis', 'Verschlüsselt Daten'], a: 0, e: 'Aliase machen Abfragen lesbar und lösen Mehrdeutigkeiten.'},
  ]],
]);
