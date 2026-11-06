AP2.page('eua-sqldml', {
  b: 'eua', g: 'Datenbanken und SQL', t: 'SQL: INSERT, UPDATE, DELETE und Tabellen anlegen (DDL)',
  d: 'Mit **DML** (Data Manipulation Language) ändert man **Datenbestände**: **`INSERT`** fügt neue Datensätze ein, **`UPDATE`** ändert bestehende Werte, **`DELETE`** löscht Zeilen. Mit **DDL** (Data Definition Language) definiert man die **Struktur**: **`CREATE TABLE`**, **`ALTER TABLE`**, **`DROP TABLE`**. **Zentrale Prüfungsregel:** `UPDATE` und `DELETE` benötigen **immer eine WHERE-Klausel**, sonst werden unwiderruflich **alle Zeilen der gesamten Tabelle** manipuliert oder gelöscht! Bei Fremdschlüsseln schützt die **referenzielle Integrität** vor Datenmüll.',
  m: '**INSERT INTO tabelle (spalten) VALUES (werte).** **UPDATE tabelle SET spalte = wert WHERE bedingung.** **DELETE FROM tabelle WHERE bedingung.** Ohne WHERE: **Katastrophe (alle Zeilen betroffen)!** **Referenzielle Integrität:** Erst Kindzeilen löschen, dann Elternzeile (oder `ON DELETE CASCADE`). **DELETE** löscht Zeilen (Struktur bleibt). **DROP TABLE** vernichtet die ganze Tabelle samt Struktur!',
  cheat: [
    ['INSERT (Daten einfügen)', [
      '**Einzelne Zeile:** `INSERT INTO kunde (kunden_id, name, ort) VALUES (5, \'Kaya\', \'Heidenheim\');`',
      '**Mehrere Zeilen (Bulk):** `INSERT INTO artikel (...) VALUES (10, \'Maus\', 15.00), (11, \'Pad\', 5.00);`',
      '**Aus Abfrage einfügen:** `INSERT INTO archiv_bestellung SELECT * FROM bestellung WHERE datum < \'2025-01-01\';`',
      'Spaltenliste immer explizit angeben (Schutz vor Fehlern bei späteren Tabellenänderungen)',
    ]],
    ['UPDATE (Daten ändern)', [
      '**Einzelne Spalte:** `UPDATE artikel SET preis = preis * 1.10 WHERE kategorie = \'Hardware\';`',
      '**Mehrere Spalten gleichzeitig:** `UPDATE kunde SET name = \'Müller\', ort = \'Berlin\' WHERE kunden_id = 3;`',
      '**Bedingte Werte:** `UPDATE mitarbeiter SET bonus = CASE WHEN leistung > 90 THEN 500 ELSE 100 END;`',
      '**Niemals ohne WHERE!** Vorher mit `SELECT ... WHERE ...` die Treffermenge prüfen!',
    ]],
    ['DELETE (Daten löschen)', [
      '**Gezieltes Löschen:** `DELETE FROM bestellung WHERE bestell_id = 104;`',
      '**Löschen mit Verknüpfung:** `DELETE FROM position WHERE bestell_id IN (SELECT bestell_id FROM bestellung WHERE kunden_id = 2);`',
      '**Alle Zeilen löschen:** `DELETE FROM log_events;` (langsam, zeilenweise, Transaktion möglich) vs. `TRUNCATE TABLE log_events;` (blitzschnell, leert Speicherseite)',
    ]],
    ['Referenzielle Integrität (Foreign Key Aktionen)', [
      '**ON DELETE RESTRICT / NO ACTION:** Löschen verboten, solange abhängige Kinddatensätze existieren (Standard)',
      '**ON DELETE CASCADE:** Löscht beim Entfernen des Kunden automatisch alle seine Bestellungen und Positionen mit',
      '**ON DELETE SET NULL:** Setzt den Fremdschlüssel in der abhängigen Tabelle auf NULL',
    ]],
  ],
  blocks: [
    ['h', 'INSERT: Daten sauber und fehlerfrei einfügen'],
    ['p', 'Beim Einfügen von Daten muss die Reihenfolge und der Datentyp der Werte exakt zur angegebenen Spaltenliste passen. Text- und Datumswerte stehen immer in einfachen Anführungszeichen (`\'...\'`). Zahlen werden ohne Anführungszeichen geschrieben.'],
    ['code', 'sql', `-- Einzelner Datensatz mit expliziter Spaltenliste
INSERT INTO kunde (kunden_id, name, ort)
VALUES (5, 'Kaya', 'Heidenheim');

-- Mehrere Zeilen in einem einzigen Befehl (effizient für Massendaten)
INSERT INTO artikel (artikel_id, bezeichnung, preis, kategorie)
VALUES (7, 'Headset Pro', 59.90, 'Zubehör'),
       (8, 'USB-C Dock', 129.00, 'Hardware'),
       (9, 'Mauspad XL', 14.50, 'Zubehör');

-- Daten aus einer anderen Tabelle kopieren (z. B. Backup / Archivierung)
INSERT INTO kunde_archiv (kunden_id, name, ort)
SELECT kunden_id, name, ort
FROM kunde
WHERE kunden_id NOT IN (SELECT DISTINCT kunden_id FROM bestellung);`],
    ['table', ['Regel beim Einfügen', 'Was passiert bei Missachtung?', 'Beispiel'], [
      ['**Primärschlüssel-Eindeutigkeit**', 'Datenbank verweigert den Insert (`Duplicate entry for key PRIMARY`)', 'Einfügen von `kunden_id = 1`, obwohl ID 1 schon existiert'],
      ['**NOT NULL Constraint**', 'Fehler: Pflichtfeld darf nicht leer sein', 'Einfügen eines Kunden ohne Namen'],
      ['**Fremdschlüssel-Existenz**', 'Fehler: Referenzierter Wert existiert in der Elterntabelle nicht', 'Bestellung anlegen mit `kunden_id = 999` (Kunde gibt es nicht)'],
      ['**Datentyp-Konformität**', 'Typkonvertierungsfehler', 'Buchstaben in ein `DECIMAL`- oder `INT`-Feld eintragen'],
    ]],
    ['h', 'UPDATE: Bestehende Daten modifizieren'],
    ['p', 'Mit `UPDATE` werden Werte in existierenden Zeilen geändert. Die `WHERE`-Klausel bestimmt, welche Zeilen aktualisiert werden.'],
    ['code', 'sql', `-- Beispiel 1: Gezieltes Ändern einer Adresse
UPDATE kunde
SET ort = 'Stuttgart'
WHERE kunden_id = 2;

-- Beispiel 2: Prozentuale Preiserhöhung für eine ganze Kategorie
UPDATE artikel
SET preis = ROUND(preis * 1.05, 2)
WHERE kategorie = 'Zubehör';

-- Beispiel 3: Mehrere Spalten in einem Schritt anpassen
UPDATE bestellung
SET datum = CURRENT_DATE,
    kunden_id = 3
WHERE bestell_id = 101;`],
    ['warn', 'Die größte Gefahr im Datenbankalltag: Führst du `UPDATE artikel SET preis = 0;` ohne `WHERE` aus, setzt die Datenbank den Preis **ALLER** Artikel im System auf 0 Euro! Prüfungs-Faustregel: Schreibe die WHERE-Bedingung immer zuerst als `SELECT * FROM ... WHERE ...`. Erst wenn das SELECT genau die gewünschten Zeilen liefert, wandelst du es in ein UPDATE um.'],
    ['h', 'DELETE: Datensätze gezielt löschen'],
    ['p', 'Mit `DELETE FROM tabelle WHERE bedingung;` werden Datensätze entfernt. Die Tabellenstruktur selbst bleibt vollständig erhalten.'],
    ['code', 'sql', `-- Gezieltes Löschen einer Position
DELETE FROM position
WHERE bestell_id = 104 AND artikel_id = 4;

-- Löschen aller Bestellungen aus dem Vorjahr
DELETE FROM bestellung
WHERE datum < '2025-01-01';`],
    ['h', 'Vergleich: DELETE versus TRUNCATE versus DROP'],
    ['table', ['Kriterium', '`DELETE FROM t WHERE ...`', '`TRUNCATE TABLE t`', '`DROP TABLE t`'], [
      ['**Was wird gelöscht?**', 'Bestimmte Zeilen (oder alle Zeilen)', 'Alle Zeilen der gesamten Tabelle', 'Die gesamte Tabelle (Struktur + Daten + Rechte)'],
      ['**WHERE erlaubt?**', '**Ja** (selektives Löschen)', '**Nein** (leert immer alles)', '**Nein**'],
      ['**Geschwindigkeit**', 'Langsamer (löscht jede Zeile einzeln und loggt sie)', 'Extrem schnell (gibt Speicherseiten direkt frei)', 'Sofortige Löschung aus dem Datenwörterbuch'],
      ['**Kategorie**', '**DML** (Data Manipulation Language)', '**DDL** (Data Definition Language)', '**DDL** (Data Definition Language)'],
      ['**Rollback möglich?**', '**Ja** (innerhalb einer Transaktion)', 'Meist **nein** (impliziter Commit)', '**Nein** (außer über Datenbank-Backup)'],
      ['**Auto-Increment Zähler**', 'Bleibt beim letzten Wert stehen', 'Wird auf den Startwert (1) zurückgesetzt', 'Wird komplett vernichtet'],
    ]],
    ['h', 'Wörter, die in der Prüfung vorkommen'],
    ['table', ['Wort', 'Einfach erklärt'], [
      ['DML', 'Data Manipulation Language: SQL-Befehle zum Bearbeiten von Daten (INSERT, UPDATE, DELETE)'],
      ['DDL', 'Data Definition Language: SQL-Befehle zum Definieren von Tabellenstrukturen (CREATE, ALTER, DROP)'],
      ['Referenzielle Integrität', 'Regel: Ein Fremdschlüssel darf nur auf tatsächlich existierende Primärschlüssel verweisen'],
      ['ON DELETE CASCADE', 'Automatisches Mitlöschen abhängiger Kindzeilen beim Löschen der Elternzeile'],
      ['TRUNCATE', 'Schnelles vollständiges Leeren einer Tabelle ohne Löschung der Tabellendefinition'],
      ['Kardinalität', 'Mengenverhältnis zwischen zwei Tabellen im ER-Modell (1:1, 1:n, n:m)'],
    ]],
    ['see', ['eua-sqlselect', 'eua-sqljoin', 'eua-transaktionen', 'eua-sqler']],
  ],
});
