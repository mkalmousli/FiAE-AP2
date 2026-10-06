AP2.page('course-sql-02', {
  b: 'course', g: 'SQL', t: 'SQL 2: Tabellen anlegen und ändern (CREATE, ALTER, DROP, Constraints)',
  d: 'Mit der **DDL** legt man die Struktur der Datenbank fest. `CREATE TABLE` definiert eine Tabelle mit Spalten, **Datentypen** und **Constraints** (Einschränkungen): `PRIMARY KEY`, `FOREIGN KEY ... REFERENCES`, `NOT NULL`, `UNIQUE`, `DEFAULT`, `CHECK`. Ein automatisch hochgezählter Schlüssel heißt in MySQL `AUTO_INCREMENT`, in SQL Server `IDENTITY(1,1)`, in PostgreSQL `SERIAL`/`GENERATED ALWAYS AS IDENTITY`. `ALTER TABLE` ändert eine bestehende Tabelle (Spalte hinzufügen, ändern, löschen, Schlüssel ergänzen), `DROP TABLE` löscht sie samt Daten.',
  m: '**Reihenfolge beim Anlegen: erst die Tabelle, auf die verwiesen wird (Kunde), dann die mit dem Fremdschlüssel (Bestellung).** **Geld: DECIMAL(10,2). Telefon/PLZ: VARCHAR (führende Nullen!).** **ALTER TABLE t ADD spalte typ; / MODIFY (MySQL) bzw. ALTER COLUMN (SQL Server).** **ON DELETE CASCADE löscht abhängige Zeilen mit.**',
  cheat: [
    ['Datentypen', ['`INT`, `BIGINT`', '`DECIMAL(10,2)`, `DOUBLE`', '`VARCHAR(n)`, `CHAR(n)`, `TEXT`', '`DATE`, `TIME`, `DATETIME`, `BOOLEAN`']],
    ['Constraints', ['`PRIMARY KEY`', '`FOREIGN KEY (x) REFERENCES t(id)`', '`NOT NULL`, `UNIQUE`, `DEFAULT 0`', '`CHECK (preis >= 0)`']],
    ['ALTER', ['`ADD spalte TYP`', '`MODIFY spalte TYP NOT NULL` (MySQL)', '`DROP COLUMN spalte`', '`RENAME COLUMN a TO b`']],
    ['Löschen', ['`DROP TABLE t;` Struktur + Daten', '`TRUNCATE TABLE t;` nur Daten', '`DROP DATABASE db;`', 'Vorsicht: nicht rückgängig']],
  ],
  blocks: [
    ['h', 'Datenbank und Tabellen anlegen'],
    ['code', 'sql', `CREATE DATABASE gartencenter;
USE gartencenter;                          -- MySQL: Datenbank auswählen

CREATE TABLE Kunde (
  kunde_id  INT AUTO_INCREMENT PRIMARY KEY,   -- automatisch 1, 2, 3, ...
  nachname  VARCHAR(50) NOT NULL,
  vorname   VARCHAR(50),
  email     VARCHAR(100) UNIQUE,              -- keine doppelten E-Mails
  plz       VARCHAR(5),                       -- Text: 01234 behält die Null
  ort       VARCHAR(50) DEFAULT 'unbekannt'
);

CREATE TABLE Artikel (
  artikel_id  INT PRIMARY KEY,
  bezeichnung VARCHAR(50) NOT NULL,
  preis       DECIMAL(8,2) NOT NULL CHECK (preis >= 0),
  kategorie   VARCHAR(20)
);

CREATE TABLE Bestellung (
  bestell_id INT AUTO_INCREMENT PRIMARY KEY,
  kunde_id   INT NOT NULL,
  datum      DATE NOT NULL,
  FOREIGN KEY (kunde_id) REFERENCES Kunde(kunde_id)
);

CREATE TABLE Position (
  bestell_id INT,
  artikel_id INT,
  menge      INT NOT NULL DEFAULT 1,
  PRIMARY KEY (bestell_id, artikel_id),                 -- zusammengesetzter Primärschlüssel
  FOREIGN KEY (bestell_id) REFERENCES Bestellung(bestell_id) ON DELETE CASCADE,
  FOREIGN KEY (artikel_id) REFERENCES Artikel(artikel_id)
);`],
    ['h', 'Constraints im Überblick'],
    ['table', ['Constraint', 'Wirkung', 'Beispiel'], [
      ['`PRIMARY KEY`', 'Eindeutig und NOT NULL; genau einer je Tabelle (kann mehrere Spalten umfassen)', '`kunde_id INT PRIMARY KEY`'],
      ['`FOREIGN KEY`', 'Wert muss als PK in der referenzierten Tabelle existieren (oder NULL sein)', '`FOREIGN KEY (kunde_id) REFERENCES Kunde(kunde_id)`'],
      ['`NOT NULL`', 'Pflichtfeld', '`nachname VARCHAR(50) NOT NULL`'],
      ['`UNIQUE`', 'Keine Duplikate (NULL meist mehrfach erlaubt)', '`email VARCHAR(100) UNIQUE`'],
      ['`DEFAULT`', 'Standardwert, wenn beim INSERT nichts angegeben wird', '`menge INT DEFAULT 1`'],
      ['`CHECK`', 'Bedingung für gültige Werte', '`CHECK (schulnote BETWEEN 1 AND 6)`'],
    ]],
    ['h', 'Referenzielle Aktionen'],
    ['table', ['Option', 'Was passiert beim Löschen/Ändern des referenzierten Datensatzes?'], [
      ['`RESTRICT` / `NO ACTION` (Standard)', 'Wird verhindert, solange abhängige Zeilen existieren (Fehlermeldung)'],
      ['`CASCADE`', 'Abhängige Zeilen werden mitgelöscht bzw. mitgeändert (Bestellung weg -> Positionen weg)'],
      ['`SET NULL`', 'Fremdschlüssel in abhängigen Zeilen wird NULL'],
    ]],
    ['h', 'Tabellen ändern mit ALTER TABLE'],
    ['code', 'sql', `ALTER TABLE Kunde ADD telefon VARCHAR(30);                 -- Spalte hinzufügen
ALTER TABLE Kunde ADD geburtsdatum DATE, ADD newsletter BOOLEAN DEFAULT FALSE;
ALTER TABLE Kunde MODIFY vorname VARCHAR(50) NOT NULL;     -- MySQL: Spalte ändern
-- SQL Server: ALTER TABLE Kunde ALTER COLUMN vorname VARCHAR(50) NOT NULL;
ALTER TABLE Kunde RENAME COLUMN telefon TO telefonnummer;
ALTER TABLE Kunde DROP COLUMN newsletter;                  -- Spalte löschen (Daten weg!)
ALTER TABLE Bestellung ADD CONSTRAINT fk_kunde
  FOREIGN KEY (kunde_id) REFERENCES Kunde(kunde_id);      -- Fremdschlüssel nachträglich
CREATE INDEX idx_kunde_ort ON Kunde(ort);                  -- Index für schnelle Suche`],
    ['h', 'Tabellen löschen'],
    ['code', 'sql', `TRUNCATE TABLE Position;     -- alle Zeilen weg, Struktur bleibt (schnell, AUTO_INCREMENT zurück)
DROP TABLE Position;         -- Tabelle komplett weg
DROP TABLE IF EXISTS Test;   -- kein Fehler, falls sie nicht existiert`],
    ['warn', 'Tabellen mit Fremdschlüsseln in der **umgekehrten** Reihenfolge löschen: erst `Position`, dann `Bestellung`, dann `Kunde`. Sonst verhindert die referenzielle Integrität das Löschen.'],
    ['h', 'Übungen'],
    ['qa', 'Erstellen Sie die Tabelle `Fahrzeug` (Kennzeichen als Primärschlüssel, Bezeichnung Pflicht, Preis pro Stunde mit zwei Nachkommastellen, Antrieb nur "Elektro" oder "Verbrenner") und eine Tabelle `Miete` mit automatisch hochgezählter Nummer, Datum und Fremdschlüssel auf Fahrzeug.', [['code', 'sql', `CREATE TABLE Fahrzeug (
  kennzeichen VARCHAR(12) PRIMARY KEY,
  bezeichnung VARCHAR(50) NOT NULL,
  preis_h     DECIMAL(6,2) NOT NULL,
  antrieb     VARCHAR(10) CHECK (antrieb IN ('Elektro', 'Verbrenner'))
);
CREATE TABLE Miete (
  mnr         INT AUTO_INCREMENT PRIMARY KEY,
  kennzeichen VARCHAR(12) NOT NULL,
  datum       DATE NOT NULL,
  FOREIGN KEY (kennzeichen) REFERENCES Fahrzeug(kennzeichen)
);`]], 6],
    ['qa', 'Die Tabelle `Mitglied` soll eine Spalte `Email` erhalten und `Name` soll Pflichtfeld werden (Sommer 2024).', [['code', 'sql', `ALTER TABLE Mitglied
  ADD Email VARCHAR(45),
  MODIFY Name VARCHAR(45) NOT NULL;`]], 4],
    ['quiz', [
      {q: 'Welches Schlüsselwort zählt in MySQL den Primärschlüssel automatisch hoch?', o: ['AUTO_INCREMENT', 'IDENTITY', 'SERIAL', 'AUTONUMBER'], a: 0, e: 'IDENTITY: SQL Server, SERIAL: PostgreSQL.'},
      {q: 'Was macht TRUNCATE TABLE?', o: ['Löscht alle Zeilen, die Struktur bleibt', 'Löscht die Tabelle', 'Löscht eine Spalte', 'Kürzt Texte'], a: 0, e: 'DROP löscht die Struktur.'},
      {q: 'Welcher Datentyp passt für Geldbeträge?', o: ['DECIMAL(10,2)', 'FLOAT', 'VARCHAR', 'INT'], a: 0, e: 'Exakt.'},
      {q: 'Was bewirkt ON DELETE CASCADE?', o: ['Abhängige Zeilen werden mitgelöscht', 'Löschen wird verhindert', 'Fremdschlüssel wird NULL', 'Nichts'], a: 0, e: 'SET NULL setzt auf NULL.'},
    ]],
    ['see', ['course-sql-01', 'course-sql-03', 'eua-sqlexam', 'eua-sqldml']],
  ],
});
