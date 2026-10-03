AP2.page('eua-sqldml', {
  b: 'eua', g: 'Datenbanken und SQL', t: 'SQL: INSERT, UPDATE, DELETE und Tabellen anlegen (DDL)',
  d: 'Mit **DML** (Data Manipulation Language) ändert man **Daten**: **`INSERT`** fügt Zeilen ein, **`UPDATE`** ändert Zeilen, **`DELETE`** löscht Zeilen. Mit **DDL** (Data Definition Language) ändert man die **Struktur**: **`CREATE TABLE`**, **`ALTER TABLE`**, **`DROP TABLE`**. **Wichtig:** `UPDATE` und `DELETE` **immer mit WHERE**, sonst sind **alle Zeilen** betroffen!',
  m: '**INSERT INTO ... VALUES (...)**, **UPDATE ... SET ... WHERE ...**, **DELETE FROM ... WHERE ...**. Ohne WHERE: **ALLES**! Vor dem Ändern erst mit **SELECT** (gleiche WHERE-Bedingung) prüfen. **DDL:** CREATE, ALTER, DROP. **DROP löscht auch die Struktur, DELETE nur die Zeilen.**',
  cheat: [
    ['INSERT', ['`INSERT INTO kunde (kunden_id, name, ort) VALUES (5, \'Kaya\', \'Heidenheim\');`', 'Spaltenliste angeben (robust gegen Strukturänderung)', 'Mehrere Zeilen: `VALUES (...), (...)`', '`INSERT INTO t SELECT ...` aus Abfrage']],
    ['UPDATE', ['`UPDATE artikel SET preis = preis * 1.1 WHERE kategorie = \'Zubehör\';`', 'Mehrere Spalten: `SET a = 1, b = 2`', '**WHERE nicht vergessen!**']],
    ['DELETE', ['`DELETE FROM bestellung WHERE bestell_id = 104;`', '**WHERE nicht vergessen!**', 'Fremdschlüssel: abhängige Zeilen zuerst löschen oder `ON DELETE CASCADE`', '`TRUNCATE TABLE t` leert die ganze Tabelle schnell']],
    ['DDL', ['`CREATE TABLE ... (spalte typ constraint, ...)`', '`ALTER TABLE ... ADD / DROP / MODIFY`', '`DROP TABLE ...` (Tabelle weg!)', 'Constraints: **PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK, DEFAULT**']],
  ],
  blocks: [
    ['h', 'INSERT: Daten einfügen'],
    ['code', 'sql', `INSERT INTO kunde (kunden_id, name, ort)
VALUES (5, 'Kaya', 'Heidenheim');

-- mehrere Zeilen auf einmal
INSERT INTO artikel (artikel_id, bezeichnung, preis, kategorie)
VALUES (7, 'Headset', 59.00, 'Zubehör'),
       (8, 'Dockingstation', 129.00, 'Hardware');`],
    ['list', ['**Textwerte** und **Datum** stehen in einfachen Anführungszeichen (`\'Kaya\'`, `\'2026-03-10\'`), **Zahlen** ohne.', 'Die **Reihenfolge** der Werte muss zur **Spaltenliste** passen.', 'Spalten, die nicht genannt werden, bekommen **DEFAULT** oder **NULL** (wenn erlaubt).', 'Verletzt ein Wert eine **Regel** (doppelter Primärschlüssel, fehlender Pflichtwert, ungültiger Fremdschlüssel), wird die Anweisung **abgelehnt**.']],
    ['h', 'UPDATE: Daten ändern'],
    ['code', 'sql', `-- Alle Zubehör-Artikel um 10 % teurer
UPDATE artikel
SET preis = preis * 1.10
WHERE kategorie = 'Zubehör';`],
    ['table', ['bezeichnung', 'alter Preis', 'neuer Preis'], [['Maus', '19.90', '21.89'], ['Tastatur', '39.90', '43.89'], ['Kabel', '4.90', '5.39'], ['Webcam', '49.00', '53.90']], {first: false}],
    ['warn', 'Ohne `WHERE` würden **alle Artikel** (auch die Hardware) geändert! Gute Gewohnheit: **Erst `SELECT ... WHERE ...`** ausführen, um zu sehen, welche Zeilen betroffen sind, dann denselben WHERE-Teil im UPDATE verwenden.'],
    ['h', 'DELETE: Daten löschen'],
    ['code', 'sql', `DELETE FROM position  WHERE bestell_id = 104;   -- zuerst die abhängigen Positionen
DELETE FROM bestellung WHERE bestell_id = 104;   -- dann die Bestellung`],
    ['p', 'Wegen der **Fremdschlüssel** (referentielle Integrität) lässt sich die Bestellung nicht löschen, solange Positionen auf sie verweisen. Entweder **zuerst die abhängigen Zeilen** löschen oder beim Fremdschlüssel **`ON DELETE CASCADE`** festlegen: Dann werden abhängige Zeilen automatisch mitgelöscht.'],
    ['table', ['Befehl', 'Wirkung', 'Rückgängig?'], [['`DELETE FROM t WHERE ...`', 'Löscht ausgewählte Zeilen, Struktur bleibt', 'In einer Transaktion per ROLLBACK'], ['`DELETE FROM t`', 'Löscht **alle** Zeilen, Struktur bleibt', 'In einer Transaktion per ROLLBACK'], ['`TRUNCATE TABLE t`', 'Leert die Tabelle sehr schnell, Struktur bleibt', 'Meist nicht (DDL)'], ['`DROP TABLE t`', 'Löscht **Tabelle samt Struktur und Daten**', 'Nein (nur über Backup)']]],
  ],
});
