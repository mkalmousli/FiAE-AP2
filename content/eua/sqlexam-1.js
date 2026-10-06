AP2.page('eua-sqlexam', {
  b: 'eua', g: 'Prüfungspraxis', t: 'SQL-Aufgaben aus den Abschlussprüfungen 2022 bis 2026',
  d: 'SQL kommt in **jeder** AP2 vor, meist mit **4 bis 6 Teilaufgaben** (insgesamt 20 bis 35 Punkte): Tabelle anlegen (mit `AUTO_INCREMENT`, Primär- und Fremdschlüssel), Tabelle ändern (`ALTER TABLE`), Datensätze einfügen, ändern, löschen und vor allem **Abfragen mit JOIN, GROUP BY, HAVING, ORDER BY** und Unterabfragen. Diese Seite sammelt die echten Aufgaben, nach Befehl sortiert, mit Musterlösung und den typischen Fallen.',
  m: '**SELECT ... FROM ... JOIN ... ON ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT** (Reihenfolge!). **WHERE filtert Zeilen vor dem Gruppieren, HAVING filtert Gruppen danach.** **Alle Nicht-Aggregat-Spalten im SELECT gehören ins GROUP BY.** **UPDATE und DELETE nie ohne WHERE.** **Datum als `\'JJJJ-MM-TT\'`.**',
  cheat: [
    ['DDL', ['`CREATE TABLE t (id INT AUTO_INCREMENT PRIMARY KEY, ...)`', '`FOREIGN KEY (x) REFERENCES t2(id)`', '`ALTER TABLE t ADD spalte TYP`', '`ALTER TABLE t MODIFY spalte TYP NOT NULL`']],
    ['DML', ['`INSERT INTO t (a, b) VALUES (1, \'x\')`', '`UPDATE t SET a = 1 WHERE id = 5`', '`DELETE FROM t WHERE id = 815`', '`UPDATE t SET preis = preis * 1.1`']],
    ['Abfragen', ['`INNER JOIN t2 ON t1.fk = t2.pk`', '`LEFT JOIN`: auch ohne Partner', '`COUNT(*)`, `SUM`, `AVG`, `MIN`, `MAX`', '`HAVING COUNT(*) > 10`']],
    ['Filter', ['`LIKE \'%Ski%\'`', '`BETWEEN \'2023-12-01\' AND \'2023-12-31\'`', '`IN (7, 11, 13)`', '`YEAR(datum) = 2022`, `IS NULL`']],
  ],
  blocks: [
    ['h', 'Tabellen anlegen (CREATE TABLE)'],
    ['h3', 'Mit automatisch hochgezähltem Primärschlüssel (Sommer 2025, Winter 2022/23, je 4 bis 6 Punkte)'],
    ['code', 'sql', `CREATE TABLE Kunde (
  KNR      INT AUTO_INCREMENT PRIMARY KEY,   -- MySQL; SQL Server: INT IDENTITY(1,1)
  Nachname VARCHAR(255) NOT NULL,
  Vorname  VARCHAR(255),
  Ort      VARCHAR(255)
);`],
    ['h3', 'Mit Fremdschlüssel und zusammengesetztem Primärschlüssel (Sommer 2022)'],
    ['code', 'sql', `CREATE TABLE trace_data (
  driveID        INT,
  ctrltypeID     INT,
  zeitpunkt      TIMESTAMP,
  position       DOUBLE,          -- mm
  geschwindigkeit DOUBLE,         -- m/s
  stromaufnahme  DOUBLE,          -- A
  PRIMARY KEY (driveID, ctrltypeID, zeitpunkt),
  FOREIGN KEY (driveID)    REFERENCES drive(driveID),
  FOREIGN KEY (ctrltypeID) REFERENCES controller_type(ctrltypeID)
);`],
    ['note', 'Die offizielle Lösung nimmt nur `(driveID, ctrltypeID)` als Primärschlüssel. Da es zu jeder Kombination **viele** Messpunkte gibt, wäre dieser Schlüssel nicht eindeutig. Mit dem Zeitpunkt (oder einer eigenen ID) wird er es. Solche Überlegungen bringen Zusatzpunkte.'],
    ['h3', 'Wichtige Datentypen'],
    ['table', ['Typ', 'Inhalt', 'Beispiel'], [
      ['`INT`', 'Ganze Zahl', 'IDs, Anzahl'],
      ['`DECIMAL(8,2)`', 'Festkommazahl, exakt (8 Stellen, davon 2 nach dem Komma)', 'Preise, Geldbeträge'],
      ['`FLOAT` / `DOUBLE`', 'Gleitkommazahl, ungenau', 'Messwerte'],
      ['`VARCHAR(n)`', 'Text variabler Länge bis n Zeichen', 'Namen, E-Mail (`VARCHAR(255)` für Links)'],
      ['`CHAR(n)`', 'Text fester Länge', 'Ländercode `DE`'],
      ['`DATE`, `TIME`, `DATETIME`, `TIMESTAMP`', 'Datum, Uhrzeit, beides', 'Geburtsdatum'],
      ['`BOOLEAN` / `TINYINT(1)`', 'Wahrheitswert', 'bezahlt'],
    ]],
    ['h', 'Tabellen ändern (ALTER TABLE)'],
    ['code', 'sql', `-- Winter 2025/26: Spalte Geburtsdatum ergänzen (3 Punkte)
ALTER TABLE Patient ADD COLUMN Geburtsdatum DATE;

-- Sommer 2023: Spalte Link für Online-Konferenzen (3 Punkte)
ALTER TABLE Termin ADD Link VARCHAR(255);

-- Winter 2022/23: zwei Spalten auf einmal (4 Punkte)
ALTER TABLE Kunde
  ADD Email VARCHAR(100),
  ADD TelefonNummer VARCHAR(30);

-- Sommer 2024: neue Spalte und vorhandene Spalte zum Pflichtfeld machen (4 Punkte)
ALTER TABLE Mitglied
  ADD Email VARCHAR(45),
  MODIFY Name VARCHAR(45) NOT NULL;      -- SQL Server: ALTER COLUMN Name VARCHAR(45) NOT NULL

-- Winter 2023/24: Fremdschlüssel nachträglich (Schüler nimmt an genau einer AG teil)
ALTER TABLE Schueler ADD AGID INT;
ALTER TABLE Schueler ADD FOREIGN KEY (AGID) REFERENCES AG(AGID);`],
    ['tip', 'Telefonnummern als **VARCHAR**, nicht als Zahl: führende Nullen (`0173...`) gingen sonst verloren, Leerzeichen und `+49` wären nicht speicherbar, und man rechnet nie mit Telefonnummern.'],
    ['h', 'Datensätze einfügen (INSERT)'],
    ['code', 'sql', `-- Sommer 2024: Mitgliedsnummer wird automatisch vergeben -> Spalte weglassen (4 Punkte)
INSERT INTO Mitglied (Name, Vorname, Geburtsdatum, Strasse_Nr, PLZ, Ort)
VALUES ('Muster', 'Max', '1989-07-06', 'Musterweg 27', '12345', 'Musterhausen');

-- Winter 2023/24: AG mit AUTO_INCREMENT-Schlüssel (4 Punkte)
INSERT INTO AG (Bezeichnung) VALUES ('Gaming-AG');

-- Winter 2022/23: mit vorgegebener ID 13
INSERT INTO Kunde (idKunde, Nachname, Vorname, TelefonNummer, Email)
VALUES (13, 'Weisser', 'Marc', '0173 8357256', 'weisser@gmy.de');`],
    ['warn', 'Die offizielle Lösung zu Winter 2022/23 vertauscht Vor- und Nachname (`\'Marc\'` als Nachname). Achte auf die **Reihenfolge der Spaltenliste**: Die Werte werden genau in dieser Reihenfolge zugeordnet. Datumswerte immer als `\'JJJJ-MM-TT\'`, Texte in einfachen Anführungszeichen.'],
    ['h3', 'Fehler im INSERT finden (AP1 Winter 2024/25, 2 Punkte)'],
    ['code', 'sql', `INSERT INTO Kunde (KundenNr, Name, Vorname, PLZ)
VALUES ("Berger", "Johann", 74731);`],
    ['p', 'Typische Fehler: (1) **Anzahl** der Werte passt nicht zur Spaltenliste (4 Spalten, 3 Werte). (2) **Datentyp/Reihenfolge**: Text landet in der Zahlenspalte `KundenNr`. Weitere Klassiker: fehlende Anführungszeichen bei Text, Primärschlüssel doppelt, Fremdschlüssel verweist auf nicht vorhandenen Datensatz, `VALUE` statt `VALUES`.'],
    ['h', 'Datensätze ändern (UPDATE)'],
    ['code', 'sql', `-- Winter 2025/26: zwei Spalten in einem Statement (4 Punkte)
UPDATE Befund SET BefundArzt = 'positiv', BefundMTA = 'positiv' WHERE ID = 815;

-- Sommer 2024: Umzug (4 Punkte)
UPDATE Mitglied SET Strasse_Nr = 'Musterweg 25', PLZ = '12345', Ort = 'Musterhausen'
WHERE Name = 'Könner' AND Vorname = 'Tom';

-- Winter 2023/24: mehrere Schüler einer AG zuordnen (4 Punkte)
UPDATE Schueler SET AGID = 5 WHERE SchuelerID IN (7, 11, 13, 17, 19, 23, 29);

-- Sommer 2025: alle Preise um 10 % erhöhen (3 Punkte)
UPDATE Hauptgericht SET Preis = Preis * 1.10;

-- Winter 2024/25: neue Istkapazität (5 Punkte)
UPDATE Akku SET Istkapazitaet = 2480 WHERE AID = 3;`],
    ['note', 'Beim Umzug von "Tom Könner" ist `WHERE Name = ... AND Vorname = ...` die Musterlösung. Besser in der Praxis: über den **Primärschlüssel** filtern, denn es könnte zwei Personen gleichen Namens geben. In der Prüfung darf man das als Hinweis ergänzen.'],
    ['h', 'Datensätze löschen (DELETE)'],
    ['code', 'sql', `-- Sommer 2025: Fahrzeug mit Totalschaden (2 Punkte)
DELETE FROM Fahrzeug WHERE FZNR = 815;`],
    ['p', 'Verweisen andere Tabellen per Fremdschlüssel auf das Fahrzeug (Miete), verhindert die **referenzielle Integrität** das Löschen, außer die Fremdschlüssel sind mit `ON DELETE CASCADE` (abhängige Zeilen mitlöschen) oder `ON DELETE SET NULL` definiert. Eine historische Miete zu löschen, ist aber meist nicht gewollt; dann markiert man das Fahrzeug besser als "ausgemustert".'],
  ],
});
