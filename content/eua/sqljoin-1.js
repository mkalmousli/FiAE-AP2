AP2.page('eua-sqljoin', {
  b: 'eua', g: 'Datenbanken und SQL', t: 'SQL: JOIN (Tabellen verknüpfen)',
  d: 'Ein **JOIN** verknüpft Datensätze aus **zwei oder mehr Tabellen** anhand einer logischen Verknüpfungsbedingung (**ON-Klausel**), meist über **Fremdschlüssel = Primärschlüssel**. **INNER JOIN** liefert nur Zeilen, die in **beiden** Tabellen eine Übereinstimmung haben. **LEFT (OUTER) JOIN** liefert **ausnahmslos alle Zeilen der linken Tabelle**; gibt es rechts keinen Partner, werden die rechten Spalten mit **NULL** aufgefüllt. **RIGHT JOIN** verhält sich spiegelverkehrt. **FULL OUTER JOIN** liefert alle Datensätze beider Tabellen.',
  m: '**INNER JOIN = nur Paare mit Treffer auf beiden Seiten.** **LEFT JOIN = alle Datensätze links, passende rechts (sonst NULL).** **Anti-Join (Fehlende finden):** `LEFT JOIN ... WHERE rechts.pk IS NULL`. **ON-Bedingung niemals vergessen**, sonst entsteht das **kartesische Produkt (CROSS JOIN)**, das alle Zeilen mit allen Zeilen multipliziert!',
  cheat: [
    ['Syntax-Grundgerüst', [
      '`SELECT k.name, b.datum, a.bezeichnung`',
      '`FROM kunde k`',
      '`INNER JOIN bestellung b ON k.kunden_id = b.kunden_id`',
      '`INNER JOIN position p ON b.bestell_id = p.bestell_id`',
      '`INNER JOIN artikel a ON p.artikel_id = a.artikel_id`',
      '`WHERE k.ort = \'Ulm\';`',
      'Tabellen-Aliase (`k`, `b`, `p`, `a`) machen Spaltennamen eindeutig',
    ]],
    ['Die 4 JOIN-Arten im Überblick', [
      '**INNER JOIN:** Schnittmenge beider Tabellen (nur vollständige Paare)',
      '**LEFT (OUTER) JOIN:** 100 % der linken Tabelle + passende rechte Spalten (oder NULL)',
      '**RIGHT (OUTER) JOIN:** 100 % der rechten Tabelle + passende linke Spalten (oder NULL)',
      '**FULL (OUTER) JOIN:** Vollständige Vereinigung beider Tabellen inklusive aller NULL-Zeilen',
      '**CROSS JOIN (Kreuzprodukt):** Jede Zeile links mit jeder Zeile rechts (n * m Zeilen)',
    ]],
    ['Häufige Aufgabenmuster der IHK', [
      'Alle Kunden mit ihren getätigten Bestellungen: **INNER JOIN**',
      'Alle Kunden anzeigen, auch solche, die noch nie bestellt haben: **LEFT JOIN**',
      'Kunden finden, die noch KEINE Bestellung getätigt haben: **LEFT JOIN ... WHERE b.bestell_id IS NULL**',
      'Umsatz pro Kunde ermitteln: **LEFT JOIN + GROUP BY + SUM(menge * preis)**',
    ]],
  ],
  blocks: [
    ['h', 'Warum werden Tabellen verknüpft?'],
    ['p', 'Aufgrund der **Normalisierung relationaler Datenbanken** werden redundante Daten auf getrennte Tabellen aufgeteilt (z. B. Kunde, Bestellung, Artikel). Ein **JOIN** führt diese getrennten Daten zur Laufzeit einer Abfrage wieder zusammen. Die Verknüpfung erfolgt über die Beziehung zwischen dem **Fremdschlüssel (FK)** der einen Tabelle und dem **Primärschlüssel (PK)** der anderen Tabelle.'],
    ...AP2.sqlBlocks.schema,
    ['h', 'Die JOIN-Arten als Mengenbild'],
    ['p', 'Stell dir zwei Tabellen als **Mengen A (links) und B (rechts)** vor. Die Schnittmenge enthält Zeilen mit **Treffern in beiden** Tabellen:'],
    ['venn', [
      ['inner', 'INNER JOIN', 'nur Zeilen mit Treffer in A und B'],
      ['left', 'LEFT JOIN', 'alle aus A, dazu passende aus B (sonst NULL)'],
      ['right', 'RIGHT JOIN', 'alle aus B, dazu passende aus A (sonst NULL)'],
      ['full', 'FULL OUTER JOIN', 'alle aus A und B'],
      ['leftOnly', 'LEFT JOIN ... WHERE B.key IS NULL', 'nur A ohne Treffer in B (Anti-Join)'],
      ['outer', 'FULL JOIN ... WHERE A.key IS NULL OR B.key IS NULL', 'alle ohne Treffer auf der Gegenseite'],
    ]],
    ['h', 'INNER JOIN: Nur vollständige Datensatzpaare'],
    ['p', 'Der `INNER JOIN` (oder einfach `JOIN`) filtert alle Datensätze heraus, die auf der Gegenseite keinen Partner haben:'],
    ['code', 'sql', `SELECT k.name, k.ort, b.bestell_id, b.datum
FROM kunde k
INNER JOIN bestellung b ON k.kunden_id = b.kunden_id;`],
    ['table', ['k.name', 'k.ort', 'b.bestell_id', 'b.datum'], [
      ['Meier', 'Göppingen', '101', '2026-03-02'],
      ['Meier', 'Göppingen', '102', '2026-03-05'],
      ['Schulz', 'Ulm', '103', '2026-03-06'],
      ['Yilmaz', 'Stuttgart', '104', '2026-03-09'],
    ], {first: false}],
    ['note', 'Beachte: Kunde **Brandt** (kunden_id = 4) taucht im Ergebnis **nicht auf**, da er noch keine Bestellung aufgegeben hat. Kunde **Meier** erscheint **zweimal**, weil er zwei verschiedene Bestellungen getätigt hat.'],
    ['h', 'LEFT JOIN: Alle Datensätze der linken Tabelle behalten'],
    ['p', 'Der `LEFT OUTER JOIN` stellt sicher, dass kein Datensatz der linken Tabelle verloren geht, selbst wenn rechts kein Eintrag existiert:'],
    ['code', 'sql', `SELECT k.name, k.ort, b.bestell_id, b.datum
FROM kunde k
LEFT JOIN bestellung b ON k.kunden_id = b.kunden_id;`],
    ['table', ['k.name', 'k.ort', 'b.bestell_id', 'b.datum'], [
      ['Meier', 'Göppingen', '101', '2026-03-02'],
      ['Meier', 'Göppingen', '102', '2026-03-05'],
      ['Schulz', 'Ulm', '103', '2026-03-06'],
      ['Yilmaz', 'Stuttgart', '104', '2026-03-09'],
      ['Brandt', 'Ulm', 'NULL', 'NULL'],
    ], {first: false, mark: [4]}],
    ['h', 'Der Anti-Join: Datensätze OHNE Verknüpfung aufspüren'],
    ['p', 'Eine der beliebtesten IHK-Aufgaben: „Ermitteln Sie alle Kunden, die bisher noch keine einzige Bestellung getätigt haben.“ Lösung mit `LEFT JOIN` und Filter auf `IS NULL`:'],
    ['code', 'sql', `SELECT k.kunden_id, k.name, k.ort
FROM kunde k
LEFT JOIN bestellung b ON k.kunden_id = b.kunden_id
WHERE b.bestell_id IS NULL;`],
    ['table', ['k.kunden_id', 'k.name', 'k.ort'], [
      ['4', 'Brandt', 'Ulm'],
    ], {first: false}],
    ['h', 'Wörter, die in der Prüfung vorkommen'],
    ['table', ['Wort', 'Einfach erklärt'], [
      ['JOIN', 'SQL-Klausel zum Verknüpfen zweier Tabellen über eine gemeinsame Spalte'],
      ['ON-Klausel', 'Bedingung, die festlegt, welche Zeilen zusammengehören (meist Fremdschlüssel = Primärschlüssel)'],
      ['Kartesisches Produkt (CROSS JOIN)', 'Jede Zeile von Tabelle A wird mit jeder Zeile von Tabelle B kombiniert'],
      ['Anti-Join', 'Technik (LEFT JOIN + IS NULL), um Datensätze zu finden, die keine Beziehung haben'],
      ['Mehrdeutiger Spaltenname (ambiguous)', 'Fehler, wenn zwei Tabellen denselben Spaltennamen haben und kein Tabellen-Alias vorangestellt wurde'],
      ['Self-Join', 'Eine Tabelle wird mit sich selbst verknüpft (z. B. Mitarbeiter mit Vorgesetztem aus derselben Tabelle)'],
    ]],
    ['see', ['eua-sqlselect', 'eua-sqlgroup', 'eua-sqldml', 'eua-normalisierung']],
  ],
});
