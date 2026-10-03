AP2.add('course-sql', [
  ['h', 'Trigger und gespeicherte Prozeduren'],
  ['code', 'sql', `-- Trigger (PostgreSQL-Stil): protokolliert jede Preisänderung
CREATE FUNCTION log_preis() RETURNS trigger AS $$
BEGIN
  INSERT INTO preislog(produkt_id, alt, neu, wann) VALUES (OLD.id, OLD.preis, NEW.preis, now());
  RETURN NEW;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER trg_preis AFTER UPDATE OF preis ON produkt
FOR EACH ROW EXECUTE FUNCTION log_preis();

-- Gespeicherte Prozedur (MySQL-Stil)
DELIMITER //
CREATE PROCEDURE bestellsumme(IN kid INT, OUT summe DECIMAL(10,2))
BEGIN
  SELECT COALESCE(SUM(betrag), 0) INTO summe FROM bestellung WHERE kunde_id = kid;
END //
DELIMITER ;
CALL bestellsumme(7, @s);`],
  ['table', ['', 'Trigger', 'Prozedur / Funktion'], [['Auslöser', '**Automatisch** bei INSERT, UPDATE, DELETE (BEFORE/AFTER)', '**Aufruf** durch Anwendung (`CALL`, `EXEC`)'], ['Zweck', 'Protokoll, Regeln, abgeleitete Werte', 'Wiederverwendbare Logik, Kapselung, Rechte'], ['Risiko', 'Versteckte Logik, schwer zu debuggen', 'Logik in der DB statt in der Anwendung']]],
  ['h', 'Rechte (DCL) und Sicherheit'],
  ['code', 'sql', `CREATE USER app IDENTIFIED BY 'geheim';
GRANT SELECT, INSERT, UPDATE ON kunde TO app;     -- nur nötige Rechte (Least Privilege)
REVOKE UPDATE ON kunde FROM app;`],
  ['warn', '**SQL-Injection:** Baut man SQL durch Zusammenfügen von Eingaben (`"... WHERE name = \'" + eingabe + "\'"`), kann ein Angreifer eigenen SQL-Code einschleusen (`\' OR \'1\'=\'1`). **Gegenmaßnahme: parametrisierte Abfragen (Prepared Statements)**, Eingaben validieren, minimale DB-Rechte, keine Fehlertexte nach außen.'],
  ['code', 'java', `PreparedStatement ps = con.prepareStatement("SELECT * FROM kunde WHERE name = ?");
ps.setString(1, eingabe);          // Wert wird als Daten behandelt, nie als SQL
ResultSet rs = ps.executeQuery();`],
  ['h', 'Normalisierung kurz'],
  ['table', ['Normalform', 'Regel', 'Verstoß'], [['**1NF**', 'Atomare Werte, keine Wiederholgruppen', 'Spalte "Telefon" mit "123, 456"'], ['**2NF**', '1NF und jedes Nichtschlüsselattribut hängt vom **ganzen** Schlüssel ab', 'Kundenname in der Positions-Tabelle (hängt nur an Bestellung)'], ['**3NF**', '2NF und keine **transitiven** Abhängigkeiten', 'PLZ und Ort in der Kundentabelle (Ort hängt von PLZ ab)']]],
  ['p', 'Ziel ist, **Redundanz und Anomalien** (Einfüge-, Änderungs-, Löschanomalie) zu vermeiden. Bewusste **Denormalisierung** kann für Berichte und Performance sinnvoll sein (siehe Seite Normalisierung im Block Planen).'],
  ['h', 'Dialekte im Überblick'],
  ['table', ['Thema', 'PostgreSQL', 'MySQL / MariaDB', 'SQL Server (T-SQL)', 'Oracle'], [
    ['Zeilenbegrenzung', '`LIMIT n`', '`LIMIT n`', '`TOP n` / `OFFSET .. FETCH`', '`FETCH FIRST n ROWS ONLY`'],
    ['Auto-ID', '`GENERATED ... AS IDENTITY`, `SERIAL`', '`AUTO_INCREMENT`', '`IDENTITY(1,1)`', '`GENERATED AS IDENTITY`, Sequenz'],
    ['Text verketten', '`||` oder `CONCAT`', '`CONCAT()`', '`+` oder `CONCAT`', '`||`'],
    ['Differenz', '`EXCEPT`', '`EXCEPT` (ab 8.0)', '`EXCEPT`', '`MINUS`'],
    ['Aktuelle Zeit', '`now()`', '`NOW()`', '`GETDATE()`', '`SYSDATE`'],
    ['Wahrheitswert', '`BOOLEAN`', '`TINYINT(1)`', '`BIT`', '`NUMBER(1)`'],
  ]],
  ['h', 'Typische Prüfungsaufgaben'],
  ['qa', 'Schreiben Sie eine Abfrage: Name und Gesamtumsatz aller Kunden, auch Kunden ohne Bestellung (Umsatz 0), absteigend sortiert.', ['SELECT k.name, COALESCE(SUM(b.betrag), 0) AS umsatz', 'FROM kunde k LEFT JOIN bestellung b ON b.kunde_id = k.id', 'GROUP BY k.id, k.name ORDER BY umsatz DESC;'], 6],
  ['qa', 'Wie finden Sie die zweithöchste Bestellsumme?', ['Variante 1: `SELECT MAX(betrag) FROM bestellung WHERE betrag < (SELECT MAX(betrag) FROM bestellung);`', 'Variante 2: `SELECT DISTINCT betrag FROM bestellung ORDER BY betrag DESC LIMIT 1 OFFSET 1;`', 'Variante 3: Fensterfunktion `DENSE_RANK() OVER (ORDER BY betrag DESC) = 2`.'], 5],
  ['qa', 'Wie entdecken Sie doppelte E-Mail-Adressen in der Tabelle kunde?', 'SELECT email, COUNT(*) FROM kunde GROUP BY email HAVING COUNT(*) > 1;  Danach mit UNIQUE-Constraint verhindern.', 4],
  ['qa', 'Erklären Sie den Unterschied zwischen WHERE und HAVING und zwischen UNION und UNION ALL.', '**WHERE** filtert Zeilen vor der Gruppierung (keine Aggregate), **HAVING** filtert Gruppen danach (mit Aggregaten). **UNION** entfernt Duplikate (Sortier-/Vergleichsaufwand), **UNION ALL** behält alle Zeilen und ist schneller.', 5],
  ['qa', 'Warum ist `SELECT * FROM kunde WHERE ort = NULL` falsch?', 'Vergleiche mit NULL ergeben "unbekannt", also nie "wahr". Richtig ist `WHERE ort IS NULL`.', 3],
  ['quiz', [
    {q: 'Welche Klausel filtert Gruppen nach dem GROUP BY?', o: ['HAVING', 'WHERE', 'ORDER BY', 'LIMIT'], a: 0, e: 'WHERE wirkt auf Zeilen davor.'},
    {q: 'Was liefert ein LEFT JOIN, wenn rechts kein Treffer existiert?', o: ['Die linke Zeile mit NULL-Werten rechts', 'Keine Zeile', 'Fehler', 'Die rechte Zeile'], a: 0, e: 'Alle Zeilen der linken Tabelle bleiben erhalten.'},
    {q: 'Welcher Operator schützt am besten vor SQL-Injection?', o: ['Parametrisierte Abfragen', 'Zeichen manuell ersetzen', 'Nur Großbuchstaben', 'LIKE'], a: 0, e: 'Prepared Statements trennen Code und Daten.'},
    {q: 'Was bedeutet das A in ACID?', o: ['Atomarität: alles oder nichts', 'Aktualität', 'Authentizität', 'Archivierung'], a: 0, e: 'Eine Transaktion wird ganz oder gar nicht ausgeführt.'},
    {q: 'Was gibt COUNT(spalte) zurück?', o: ['Anzahl der Nicht-NULL-Werte', 'Alle Zeilen', 'Summe', 'Anzahl der Spalten'], a: 0, e: 'COUNT(*) zählt alle Zeilen.'},
    {q: 'Was macht ROW_NUMBER() OVER (PARTITION BY x ORDER BY y)?', o: ['Nummeriert Zeilen je Gruppe nach y', 'Löscht Zeilen', 'Summiert x', 'Gruppiert und fasst zusammen'], a: 0, e: 'Fensterfunktionen erhalten alle Zeilen.'},
    {q: 'Welche Zeile ist bei x NOT IN (1, NULL) das Ergebnis?', o: ['Nie wahr (keine Zeile)', 'Immer wahr', 'Fehler', 'Nur bei x = 1'], a: 0, e: 'Vergleich mit NULL ist unbekannt.'},
  ]],
]);
