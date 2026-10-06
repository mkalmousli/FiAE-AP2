AP2.page('course-sql-08', {
  b: 'course', g: 'SQL', t: 'SQL 8: Views, Indizes, Rechte, SQL-Injection und Prüfungstraining',
  d: 'Zum Abschluss: **Views** speichern eine Abfrage unter einem Namen und verhalten sich wie eine (virtuelle) Tabelle. **Indizes** beschleunigen Suchen und Joins, verlangsamen aber Schreibvorgänge. Mit **GRANT/REVOKE** (DCL) vergibt man Rechte an Benutzer und Rollen nach dem **Minimalprinzip**. **Stored Procedures** und **Trigger** führen Logik in der Datenbank aus. Die größte Gefahr für Datenbankanwendungen ist **SQL-Injection**; Schutz bieten **Prepared Statements**. Am Ende steht ein Prüfungstraining mit gemischten Aufgaben.',
  m: '**View = gespeichertes SELECT (keine Datenkopie).** **Index auf Spalten, die oft in WHERE/JOIN/ORDER BY stehen; PK ist automatisch indiziert.** **GRANT recht ON objekt TO benutzer; REVOKE recht ON objekt FROM benutzer.** **Nie Benutzereingaben in SQL-Strings verketten -> Platzhalter.**',
  cheat: [
    ['View', ['`CREATE VIEW v AS SELECT ...;`', '`SELECT * FROM v;`', '`DROP VIEW v;`', 'vereinfacht, schränkt Sicht ein']],
    ['Index', ['`CREATE INDEX idx ON t(spalte);`', '`CREATE UNIQUE INDEX ...`', 'schnelleres Lesen', 'langsameres Schreiben, Speicher']],
    ['Rechte (DCL)', ['`CREATE USER \'app\'@\'%\' IDENTIFIED BY \'...\';`', '`GRANT SELECT, INSERT ON db.t TO \'app\'@\'%\';`', '`REVOKE INSERT ON db.t FROM ...;`', 'Rollen: `CREATE ROLE`']],
    ['Sicherheit', ['SQL-Injection', 'Prepared Statements', 'Least Privilege', 'Passwörter gehasht speichern']],
  ],
  blocks: [
    ['h', 'Views'],
    ['code', 'sql', `CREATE VIEW Umsatz_je_Kunde AS
SELECT k.kunde_id, k.nachname, SUM(p.menge * a.preis) AS umsatz
FROM Kunde k
JOIN Bestellung b ON b.kunde_id = k.kunde_id
JOIN Position p   ON p.bestell_id = b.bestell_id
JOIN Artikel a    ON a.artikel_id = p.artikel_id
GROUP BY k.kunde_id, k.nachname;

SELECT * FROM Umsatz_je_Kunde WHERE umsatz > 50;     -- wie eine Tabelle benutzen`],
    ['list', [
      '**Vereinfachung:** Komplexe Joins einmal definieren, dann einfach abfragen.',
      '**Datenschutz:** Ein Benutzer bekommt nur Rechte auf eine View ohne Gehalts- oder Gesundheitsspalten.',
      '**Stabile Schnittstelle:** Tabellen können sich ändern, die View bleibt gleich.',
    ]],
    ['h', 'Indizes'],
    ['code', 'sql', `CREATE INDEX idx_bestellung_kunde ON Bestellung(kunde_id);   -- beschleunigt JOIN und WHERE
CREATE INDEX idx_kunde_name ON Kunde(nachname, vorname);       -- zusammengesetzter Index
EXPLAIN SELECT * FROM Bestellung WHERE kunde_id = 1;           -- zeigt, ob ein Index genutzt wird`],
    ['p', 'Ein Index funktioniert wie das Stichwortverzeichnis eines Buches (meist als **B-Baum**): Statt die ganze Tabelle zu durchsuchen (O(n)), findet das DBMS den Eintrag in O(log n). Nachteil: Jeder INSERT/UPDATE/DELETE muss auch den Index aktualisieren, und er braucht Speicher.'],
    ['h', 'Benutzer und Rechte'],
    ['code', 'sql', `CREATE USER 'webshop'@'192.168.10.%' IDENTIFIED BY 'langes-zufaelliges-Passwort';
GRANT SELECT, INSERT ON gartencenter.Bestellung TO 'webshop'@'192.168.10.%';
GRANT SELECT ON gartencenter.Artikel TO 'webshop'@'192.168.10.%';
REVOKE INSERT ON gartencenter.Bestellung FROM 'webshop'@'192.168.10.%';

CREATE ROLE auswertung;                                  -- Rechte über Rollen bündeln
GRANT SELECT ON gartencenter.* TO auswertung;
GRANT auswertung TO 'controller'@'localhost';`],
    ['tip', '**Least Privilege:** Die Webanwendung bekommt nur die Rechte, die sie wirklich braucht (zum Beispiel kein DROP, kein Zugriff auf andere Datenbanken). Wird sie gehackt, ist der Schaden begrenzt.'],
    ['h', 'Stored Procedures und Trigger (Überblick)'],
    ['code', 'sql', `DELIMITER //
CREATE PROCEDURE Preiserhoehung(IN kat VARCHAR(20), IN prozent DECIMAL(5,2))
BEGIN
  UPDATE Artikel SET preis = ROUND(preis * (1 + prozent / 100), 2) WHERE kategorie = kat;
END //

CREATE TRIGGER trg_preis_log AFTER UPDATE ON Artikel
FOR EACH ROW
BEGIN
  IF OLD.preis <> NEW.preis THEN
    INSERT INTO Preishistorie (artikel_id, alt, neu, geaendert_am)
    VALUES (NEW.artikel_id, OLD.preis, NEW.preis, NOW());
  END IF;
END //
DELIMITER ;

CALL Preiserhoehung('Blume', 10);`],
    ['note', 'Die Preishistorie löst nebenbei das Problem aus Sommer 2024: Rechnungen müssen die Preise **zum Bestelldatum** zeigen. Die übliche Lösung im Datenmodell ist, den Einzelpreis **in der Bestellposition** mitzuspeichern.'],
    ['h', 'SQL-Injection'],
    ['code', 'python', `# UNSICHER: Eingabe wird in den SQL-Text eingebaut
name = input("Benutzer: ")          # Angreifer gibt ein:  ' OR '1'='1
sql = "SELECT * FROM benutzer WHERE name = '" + name + "'"
# -> SELECT * FROM benutzer WHERE name = '' OR '1'='1'   -> liefert ALLE Benutzer

# SICHER: Prepared Statement mit Platzhalter
cur.execute("SELECT * FROM benutzer WHERE name = %s", (name,))`],
    ['def', '**SQL-Injection:** Ein Angreifer schleust über Eingabefelder SQL-Code ein, der vom Server ausgeführt wird (Daten auslesen, ändern, löschen, Login umgehen). **Schutz:** Prepared Statements/parametrisierte Abfragen (Befehl und Daten getrennt), Eingaben validieren, Datenbankbenutzer mit minimalen Rechten, Fehlermeldungen ohne Details, ORM verwenden.'],
    ['h', 'Prüfungstraining'],
    ['p', 'Schema (nach Sommer 2025): `Fahrzeug(FZNR, Name)`, `Miete(MNR, #FZNR, Datum)`, `Fahrt(FNR, #MNR, StreckeInKM)`.'],
    ['qa', 'Summe der gefahrenen Kilometer je Fahrzeug im Dezember 2023, Ausgabe FZNR, Fahrzeugname, SummeKilometer.', [['code', 'sql', `SELECT f.FZNR, f.Name AS Fahrzeugname, SUM(fa.StreckeInKM) AS SummeKilometer
FROM Fahrzeug f
JOIN Miete m  ON m.FZNR = f.FZNR
JOIN Fahrt fa ON fa.MNR = m.MNR
WHERE m.Datum BETWEEN '2023-12-01' AND '2023-12-31'
GROUP BY f.FZNR, f.Name;`]], 6],
    ['qa', 'Alle Fahrzeuge, die mehr als zehnmal vermietet wurden, häufigstes zuerst.', [['code', 'sql', `SELECT f.FZNR, COUNT(*) AS AnzahlVermietungen
FROM Fahrzeug f JOIN Miete m ON m.FZNR = f.FZNR
GROUP BY f.FZNR
HAVING COUNT(*) > 10
ORDER BY AnzahlVermietungen DESC;`]], 6],
    ['qa', 'Das Fahrzeug 815 hat einen Totalschaden und soll gelöscht werden. Was ist zu beachten?', [['code', 'sql', `DELETE FROM Fahrzeug WHERE FZNR = 815;`], 'Existieren Mieten zu Fahrzeug 815, verhindert der Fremdschlüssel das Löschen (oder löscht sie bei ON DELETE CASCADE mit, wodurch Statistikdaten verloren gingen). Fachlich besser: Fahrzeug als "ausgemustert" markieren.'], 3],
    ['qa', 'Fahrzeuge, die noch nie vermietet wurden (zwei Lösungswege).', [['code', 'sql', `SELECT f.FZNR, f.Name FROM Fahrzeug f
LEFT JOIN Miete m ON m.FZNR = f.FZNR
WHERE m.MNR IS NULL;

SELECT FZNR, Name FROM Fahrzeug f
WHERE NOT EXISTS (SELECT 1 FROM Miete m WHERE m.FZNR = f.FZNR);`]], 4],
    ['quiz', [
      {q: 'Was speichert eine View?', o: ['Eine Abfrage (keine Datenkopie)', 'Eine Kopie der Daten', 'Einen Index', 'Benutzerrechte'], a: 0, e: 'Materialized Views wären die Ausnahme.'},
      {q: 'Welcher Nachteil haben Indizes?', o: ['Schreibvorgänge werden langsamer', 'Lesen wird langsamer', 'Daten werden unsicher', 'Keiner'], a: 0, e: 'Und Speicherbedarf.'},
      {q: 'Welcher Befehl entzieht Rechte?', o: ['REVOKE', 'GRANT', 'DENY ALL', 'DROP USER'], a: 0, e: 'DCL.'},
      {q: 'Was schützt am wirksamsten vor SQL-Injection?', o: ['Prepared Statements', 'Lange Passwörter', 'HTTPS', 'Eine Firewall'], a: 0, e: 'Trennung von Befehl und Daten.'},
    ]],
    ['see', ['course-sql-07', 'eua-sqlexam', 'infra-angriffe', 'ps-normalisierung']],
  ],
});
