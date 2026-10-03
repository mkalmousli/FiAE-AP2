AP2.page('eua-sqljoin', {
  b: 'eua', g: 'Datenbanken und SQL', t: 'SQL: JOIN (Tabellen verknüpfen)',
  d: 'Ein **JOIN** verknüpft Zeilen aus **mehreren Tabellen** anhand einer **Bedingung** (meist **Fremdschlüssel = Primärschlüssel**). **INNER JOIN** liefert nur Zeilen mit **Treffer in beiden** Tabellen. **LEFT JOIN** liefert **alle Zeilen der linken Tabelle** und passende der rechten (sonst NULL). **RIGHT JOIN** entsprechend umgekehrt. **FULL JOIN** liefert alle Zeilen beider Seiten.',
  m: '**INNER = nur Paare. LEFT = alle von links, rechts oder NULL. RIGHT = alle von rechts. FULL = alle von beiden.** Immer eine **ON-Bedingung** schreiben (sonst entsteht das Kreuzprodukt!). Bei Alias: `k.kunden_id = b.kunden_id`.',
  cheat: [
    ['Syntax', ['`SELECT ... FROM a`', '`INNER JOIN b ON a.fk = b.pk`', '`LEFT JOIN c ON ...`', '`WHERE ...`', 'Spalten mit **Alias.spalte** eindeutig machen']],
    ['JOIN-Arten', ['**INNER JOIN:** nur Treffer beidseitig', '**LEFT (OUTER) JOIN:** alle links + Treffer rechts', '**RIGHT (OUTER) JOIN:** alle rechts + Treffer links', '**FULL (OUTER) JOIN:** alle beider Seiten', '**CROSS JOIN:** jede Zeile mit jeder (Kreuzprodukt)']],
    ['Typische Aufgaben', ['Kunde mit seinen Bestellungen: **INNER**', 'Kunden **ohne** Bestellung: **LEFT JOIN ... WHERE rechts.pk IS NULL**', 'Bestellpositionen mit Artikelnamen: **mehrere JOINs**', 'Alle Artikel, auch unverkaufte: **LEFT JOIN**']],
    ['Fehlerquellen', ['**ON vergessen:** Kreuzprodukt (n mal m Zeilen)', 'Mehrdeutige Spalte ohne Alias', 'LEFT vs RIGHT verwechselt', 'Filter in **WHERE** statt in **ON** bei LEFT JOIN (verliert Nullzeilen)']],
  ],
  blocks: [
    ['h', 'Warum JOIN?'],
    ['p', 'Durch die **Normalisierung** stehen zusammengehörige Daten in **verschiedenen Tabellen** (Kunde, Bestellung, Position, Artikel). Um sie gemeinsam anzuzeigen ("Welche Bestellungen hat Meier?"), **verknüpft** man die Tabellen über die Schlüssel. Genau das macht der **JOIN**.'],
    ...AP2.sqlBlocks.schema,
    ['h', 'Die JOIN-Arten als Mengenbild'],
    ['p', 'Stell dir zwei Tabellen als **Mengen A (links) und B (rechts)** vor. Der überlappende Bereich enthält Zeilen mit **Treffer in beiden** Tabellen. Die Farbe zeigt, welche Zeilen im Ergebnis stehen:'],
    ['venn', [['inner', 'INNER JOIN', 'nur Zeilen mit Treffer in A und B'], ['left', 'LEFT JOIN', 'alle aus A, dazu passende aus B (sonst NULL)'], ['right', 'RIGHT JOIN', 'alle aus B, dazu passende aus A (sonst NULL)'], ['full', 'FULL OUTER JOIN', 'alle aus A und B'], ['leftOnly', 'LEFT JOIN ... WHERE B.key IS NULL', 'nur A ohne Treffer in B'], ['outer', 'FULL JOIN ... WHERE A.key IS NULL OR B.key IS NULL', 'alle ohne Treffer auf der anderen Seite']]],
    ['h', 'INNER JOIN'],
    ['code', 'sql', `SELECT k.name, b.bestell_id, b.datum
FROM kunde k
INNER JOIN bestellung b ON k.kunden_id = b.kunden_id;`],
    ['table', ['name', 'bestell_id', 'datum'], [['Meier', '101', '2026-03-02'], ['Meier', '102', '2026-03-05'], ['Schulz', '103', '2026-03-06'], ['Yilmaz', '104', '2026-03-09']], {first: false}],
    ['p', 'Brandt hat **keine** Bestellung und taucht daher im INNER JOIN **nicht** auf. Meier erscheint **zweimal**, weil er zwei Bestellungen hat: Pro passendem Paar entsteht eine Zeile.'],
    ['h', 'LEFT JOIN'],
    ['code', 'sql', `SELECT k.name, b.bestell_id
FROM kunde k
LEFT JOIN bestellung b ON k.kunden_id = b.kunden_id;`],
    ['table', ['name', 'bestell_id'], [['Meier', '101'], ['Meier', '102'], ['Schulz', '103'], ['Yilmaz', '104'], ['Brandt', 'NULL']], {first: false, mark: [4]}],
    ['p', '**Alle Kunden** stehen im Ergebnis. Für Brandt, der nie bestellt hat, sind die Spalten der Bestellung **NULL**.'],
    ['h3', 'Anwendung: Kunden ohne Bestellung finden (Anti-Join)'],
    ['code', 'sql', `SELECT k.name
FROM kunde k
LEFT JOIN bestellung b ON k.kunden_id = b.kunden_id
WHERE b.bestell_id IS NULL;      -- nur die Zeilen OHNE Treffer rechts`],
    ['table', ['name'], [['Brandt']], {first: false}],
  ],
});
