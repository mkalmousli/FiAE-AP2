AP2.page('course-sql-07', {
  b: 'course', g: 'SQL', t: 'SQL 7: Daten ändern (INSERT, UPDATE, DELETE) und Transaktionen',
  d: 'Mit der **DML** verändert man den Datenbestand: `INSERT INTO` fügt Zeilen ein, `UPDATE ... SET ... WHERE` ändert Werte, `DELETE FROM ... WHERE` löscht Zeilen. Ohne `WHERE` betreffen UPDATE und DELETE **alle** Zeilen. Fremdschlüssel sorgen dafür, dass keine Verweise ins Leere entstehen. Mehrere zusammengehörige Änderungen fasst man in einer **Transaktion** zusammen: Entweder werden alle ausgeführt (`COMMIT`) oder keine (`ROLLBACK`). Transaktionen erfüllen die **ACID**-Eigenschaften.',
  m: '**INSERT: Spaltenliste angeben, Werte in gleicher Reihenfolge, AUTO_INCREMENT-Spalte weglassen.** **UPDATE/DELETE: erst als SELECT mit derselben WHERE-Bedingung testen!** **ACID: Atomarität, Konsistenz, Isolation, Dauerhaftigkeit.** **Umbuchen = INSERT + DELETE in einer Transaktion.**',
  cheat: [
    ['INSERT', ['`INSERT INTO t (a, b) VALUES (1, \'x\');`', 'mehrere: `VALUES (..), (..)`', 'aus Abfrage: `INSERT INTO t SELECT ...`', '`LAST_INSERT_ID()` neue ID (MySQL)']],
    ['UPDATE', ['`UPDATE t SET a = 1 WHERE id = 5;`', 'mehrere Spalten: `SET a = 1, b = 2`', 'rechnen: `SET preis = preis * 1.1`', 'WHERE nie vergessen']],
    ['DELETE', ['`DELETE FROM t WHERE id = 815;`', 'ohne WHERE: alle Zeilen', '`TRUNCATE` schneller für alles', 'FK verhindert Löschen (oder CASCADE)']],
    ['Transaktion', ['`START TRANSACTION;`', '`COMMIT;` bestätigen', '`ROLLBACK;` verwerfen', 'ACID']],
  ],
  blocks: [
    ['h', 'INSERT: Datensätze einfügen'],
    ['code', 'sql', `-- kunde_id wird per AUTO_INCREMENT vergeben -> Spalte weglassen
INSERT INTO Kunde (nachname, vorname, plz, ort)
VALUES ('Muster', 'Max', '12345', 'Musterhausen');

-- mehrere Zeilen auf einmal
INSERT INTO Artikel (artikel_id, bezeichnung, preis, kategorie) VALUES
  (15, 'Kastanie', 32.00, 'Baum'),
  (16, 'Levkoje', 1.00, 'Blume');

-- Datum im ISO-Format, Text in einfachen Anführungszeichen, Zahlen ohne
INSERT INTO Bestellung (kunde_id, datum) VALUES (2, '2026-05-06');

-- Ergebnis einer Abfrage einfügen (zum Beispiel Archiv)
INSERT INTO BestellungArchiv (bestell_id, kunde_id, datum)
SELECT bestell_id, kunde_id, datum FROM Bestellung WHERE datum < '2026-01-01';`],
    ['warn', 'Typische Fehler: Spaltenzahl und Wertezahl verschieden; falsche Reihenfolge (Vorname in der Nachname-Spalte); Text ohne Anführungszeichen; Datum als `06.07.1989` statt `\'1989-07-06\'`; doppelter Primärschlüssel; Fremdschlüssel auf nicht existierenden Datensatz.'],
    ['h', 'UPDATE: Werte ändern'],
    ['code', 'sql', `UPDATE Kunde SET plz = '12345', ort = 'Musterhausen'
WHERE kunde_id = 2;                                     -- nur Kunde 2

UPDATE Artikel SET preis = preis * 1.10;               -- ALLE Preise +10 % (gewollt)

UPDATE Artikel SET preis = ROUND(preis * 0.9, 2)
WHERE kategorie = 'Blume';                              -- 10 % Rabatt auf Blumen

UPDATE Schueler SET AGID = 5 WHERE SchuelerID IN (7, 11, 13, 17);

-- mit Unterabfrage: alle Bestellungen von Kunden aus München auf Status "Express"
UPDATE Bestellung SET status = 'Express'
WHERE kunde_id IN (SELECT kunde_id FROM Kunde WHERE ort = 'München');`],
    ['tip', 'Sicherheitsroutine: Die WHERE-Bedingung zuerst mit `SELECT * FROM Kunde WHERE kunde_id = 2;` testen. Liefert sie genau die gewünschten Zeilen, dann `SELECT *` durch `UPDATE ... SET ...` bzw. `DELETE` ersetzen.'],
    ['h', 'DELETE: Zeilen löschen'],
    ['code', 'sql', `DELETE FROM Position WHERE bestell_id = 103;           -- Positionen von Bestellung 103
DELETE FROM Bestellung WHERE bestell_id = 103;
DELETE FROM Artikel WHERE artikel_id NOT IN (SELECT artikel_id FROM Position);   -- unverkaufte
-- DELETE FROM Kunde;   -- löscht ALLE Kunden (bzw. scheitert an Fremdschlüsseln)`],
    ['p', 'Verweisen andere Zeilen per Fremdschlüssel auf die zu löschende Zeile, verweigert das DBMS das Löschen (**RESTRICT**), außer der Fremdschlüssel wurde mit `ON DELETE CASCADE` (abhängige Zeilen mitlöschen) oder `ON DELETE SET NULL` angelegt.'],
    ['h', 'Transaktionen'],
    ['p', 'Problem (Sommer 2023): Ein Teilnehmer wird umgebucht. Das INSERT für die neue Fortbildung klappt, das DELETE für die alte scheitert (Absturz, Netzwerkfehler). Jetzt ist er doppelt angemeldet. Lösung: Beide Befehle bilden eine **unteilbare Einheit**.'],
    ['code', 'sql', `START TRANSACTION;                                         -- auch: BEGIN
INSERT INTO Anmeldung (fid, tnr) VALUES (17, 4711);
DELETE FROM Anmeldung WHERE fid = 12 AND tnr = 4711;
COMMIT;                                                    -- erst jetzt dauerhaft
-- Tritt vorher ein Fehler auf: ROLLBACK; -> Zustand wie vor START TRANSACTION`],
    ['table', ['ACID', 'Bedeutung', 'Beispiel'], [
      ['**Atomicity** (Atomarität)', 'Alles oder nichts', 'Umbuchung komplett oder gar nicht'],
      ['**Consistency** (Konsistenz)', 'Von einem gültigen Zustand in einen gültigen; alle Regeln (Schlüssel, CHECK) bleiben erfüllt', 'Kontostand nie negativ'],
      ['**Isolation**', 'Parallele Transaktionen beeinflussen sich nicht', 'Zwei Kassen buchen gleichzeitig'],
      ['**Durability** (Dauerhaftigkeit)', 'Nach COMMIT bleiben Änderungen auch nach Absturz erhalten', 'Transaktionslog auf der Platte'],
    ]],
    ['h', 'Aus dem Programm heraus: Prepared Statements'],
    ['codes', [
      ['python', `cur.execute("INSERT INTO Kunde (nachname, vorname) VALUES (%s, %s)", (nachname, vorname))
con.commit()`],
      ['csharp', `var cmd = new MySqlCommand("UPDATE Akku SET istkapazitaet = @ist WHERE aid = @id", con);
cmd.Parameters.AddWithValue("@ist", 2480);
cmd.Parameters.AddWithValue("@id", 3);
cmd.ExecuteNonQuery();`],
      ['java', `PreparedStatement ps = con.prepareStatement("DELETE FROM Fahrzeug WHERE fznr = ?");
ps.setInt(1, 815);
ps.executeUpdate();`],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Der Befund mit der ID 815 wurde von Arzt und MTA fälschlich als "negativ" erfasst. Ändern Sie beide Angaben in einem Statement auf "positiv" (Winter 2025/26).', [['code', 'sql', `UPDATE Befund
SET BefundArzt = 'positiv', BefundMTA = 'positiv'
WHERE ID = 815;`]], 4],
    ['qa', 'Erklären Sie, wie das Problem "Umbuchung angelegt, alte Buchung nicht gelöscht" entstehen konnte und wie es sich vermeiden lässt.', ['Die beiden Befehle wurden **einzeln** ausgeführt: Das INSERT war erfolgreich, das DELETE wurde (zum Beispiel wegen eines Fehlers oder Abbruchs) nicht ausgeführt.', 'Vermeidung: Beide Befehle in einer **Transaktion** ausführen. Scheitert ein Befehl, werden mit ROLLBACK alle Änderungen zurückgenommen (Atomarität).'], 6],
    ['quiz', [
      {q: 'Was passiert bei UPDATE Artikel SET preis = 0; ?', o: ['Alle Preise werden 0', 'Fehler, WHERE fehlt', 'Nur der erste Artikel', 'Nichts'], a: 0, e: 'Ohne WHERE alle Zeilen.'},
      {q: 'Welche Spalte lässt man beim INSERT weg?', o: ['Die AUTO_INCREMENT-Spalte', 'Den Fremdschlüssel', 'Alle NOT NULL-Spalten', 'Keine'], a: 0, e: 'Sie wird automatisch gesetzt.'},
      {q: 'Was macht ROLLBACK?', o: ['Nimmt alle Änderungen der Transaktion zurück', 'Bestätigt die Änderungen', 'Löscht die Tabelle', 'Startet die Transaktion'], a: 0, e: 'COMMIT bestätigt.'},
      {q: 'Wofür steht das I in ACID?', o: ['Isolation', 'Integrität', 'Index', 'Insert'], a: 0, e: 'Parallele Transaktionen stören sich nicht.'},
    ]],
    ['see', ['course-sql-06', 'course-sql-08', 'eua-sqldml']],
  ],
});
