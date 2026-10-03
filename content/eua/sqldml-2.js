AP2.add('eua-sqldml', [
  ['h', 'DDL: Tabellen anlegen und ändern'],
  ['code', 'sql', `CREATE TABLE kunde (
    kunden_id  INT           PRIMARY KEY,          -- eindeutig, nicht NULL
    name       VARCHAR(80)   NOT NULL,             -- Pflichtfeld
    email      VARCHAR(120)  UNIQUE,               -- keine Duplikate
    ort        VARCHAR(60)   DEFAULT 'unbekannt',  -- Standardwert
    rabatt     DECIMAL(4,2)  CHECK (rabatt BETWEEN 0 AND 0.5)   -- Wertebereich
);

CREATE TABLE bestellung (
    bestell_id INT PRIMARY KEY,
    datum      DATE NOT NULL,
    kunden_id  INT  NOT NULL,
    FOREIGN KEY (kunden_id) REFERENCES kunde(kunden_id)
        ON DELETE RESTRICT                          -- Kunde mit Bestellungen nicht löschbar
);

ALTER TABLE kunde ADD telefon VARCHAR(30);        -- Spalte hinzufügen
ALTER TABLE kunde DROP COLUMN telefon;            -- Spalte entfernen
DROP TABLE bestellung;                            -- ganze Tabelle löschen`],
  ['table', ['Datentyp (Standard-SQL)', 'Bedeutung', 'Beispiel'], [['`INT` / `INTEGER`', 'Ganze Zahl', '42'], ['`DECIMAL(p,s)` / `NUMERIC`', 'Festkommazahl (Geld!), p Stellen, s Nachkommastellen', '`DECIMAL(8,2)` = 123456.78'], ['`FLOAT` / `DOUBLE`', 'Gleitkommazahl (ungenau)', '3.14'], ['`CHAR(n)`', 'Text fester Länge', '`CHAR(2)` = \'DE\''], ['`VARCHAR(n)`', 'Text variabler Länge bis n', '\'Meier\''], ['`TEXT`', 'Langer Text', ''], ['`DATE`, `TIME`, `TIMESTAMP`', 'Datum, Uhrzeit, Zeitstempel', '\'2026-03-10\''], ['`BOOLEAN`', 'Wahrheitswert', 'TRUE']]],
  ['table', ['Constraint', 'Bedeutung'], [['**PRIMARY KEY**', 'Eindeutiger Bezeichner der Zeile (UNIQUE und NOT NULL)'], ['**FOREIGN KEY ... REFERENCES**', 'Verweis auf Primärschlüssel einer anderen Tabelle (referentielle Integrität)'], ['**NOT NULL**', 'Wert muss angegeben werden'], ['**UNIQUE**', 'Werte dürfen sich nicht wiederholen (NULL erlaubt)'], ['**CHECK (bedingung)**', 'Wert muss die Bedingung erfüllen'], ['**DEFAULT wert**', 'Standardwert, wenn nichts angegeben wird'], ['**AUTO_INCREMENT / IDENTITY / SERIAL**', 'Automatisch hochgezählte ID (je nach Datenbank)']]],
  ['h', 'Transaktionen (ACID)'],
  ['p', 'Eine **Transaktion** fasst mehrere Anweisungen zu **einer Einheit** zusammen: Entweder gelingt **alles** (`COMMIT`) oder **nichts** (`ROLLBACK`). Typisches Beispiel: Überweisung von Konto A nach B. Wird nur abgebucht, aber nicht gutgeschrieben, wäre das Geld verloren.'],
  ['code', 'sql', `BEGIN;                                                     -- Transaktion starten
UPDATE konto SET saldo = saldo - 100 WHERE konto_id = 1;   -- abbuchen
UPDATE konto SET saldo = saldo + 100 WHERE konto_id = 2;   -- gutschreiben
COMMIT;                                                    -- beides dauerhaft speichern
-- Bei Fehler: ROLLBACK;   -- beides rückgängig machen`],
  ['table', ['Eigenschaft (ACID)', 'Bedeutung'], [['**A**tomicity (Atomarität)', 'Alles oder nichts'], ['**C**onsistency (Konsistenz)', 'Die Daten bleiben in gültigem Zustand (Regeln, Constraints)'], ['**I**solation', 'Gleichzeitige Transaktionen stören sich nicht'], ['**D**urability (Dauerhaftigkeit)', 'Nach COMMIT bleiben die Daten auch bei Absturz erhalten']]],
  ['h', 'Weitere Objekte: View und Index'],
  ['kv', [
    ['VIEW (Sicht)', 'Gespeicherte **Abfrage**, die wie eine Tabelle benutzt wird: `CREATE VIEW kunde_umsatz AS SELECT ...`. Vorteile: **vereinfacht** komplexe Abfragen, **schränkt Zugriff** ein (nur bestimmte Spalten sichtbar).'],
    ['INDEX', 'Zusatzstruktur (meist **B-Baum**), die die **Suche beschleunigt**: `CREATE INDEX idx_name ON kunde(name);`. Nachteil: **mehr Speicher** und **langsameres Schreiben**. Primär- und Fremdschlüssel werden häufig automatisch indiziert.'],
    ['Rechte (DCL)', '`GRANT SELECT ON kunde TO benutzer;`, `REVOKE ...`: Wer darf was? Prinzip der **minimalen Rechte**.'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Legen Sie die Tabelle mitarbeiter(id, name, gehalt, abteilung_id) an: id ist Primärschlüssel, name Pflicht, gehalt darf nicht negativ sein, abteilung_id verweist auf abteilung(id).', ['`CREATE TABLE mitarbeiter (`', '`    id INT PRIMARY KEY,`', '`    name VARCHAR(80) NOT NULL,`', '`    gehalt DECIMAL(9,2) CHECK (gehalt >= 0),`', '`    abteilung_id INT,`', '`    FOREIGN KEY (abteilung_id) REFERENCES abteilung(id)`', '`);`'], 6],
  ['qa', 'Alle Artikel der Kategorie Hardware sollen um 5 Euro im Preis gesenkt werden. Schreiben Sie das SQL und nennen Sie die Gefahr.', ['`UPDATE artikel SET preis = preis - 5 WHERE kategorie = \'Hardware\';`', 'Gefahr: Fehlt die WHERE-Klausel, werden **alle Artikel** geändert. Deshalb zuerst mit SELECT prüfen und in einer Transaktion arbeiten.'], 4],
  ['qa', 'Was ist der Unterschied zwischen DELETE, TRUNCATE und DROP?', ['**DELETE** entfernt ausgewählte (oder alle) **Zeilen**, die Tabelle bleibt, mit Transaktion rückgängig machbar.', '**TRUNCATE** leert die **ganze Tabelle** schnell, Struktur bleibt, meist nicht rückgängig.', '**DROP** entfernt die **Tabelle komplett** (Struktur und Daten).'], 5],
  ['qa', 'Erklären Sie das Transaktionsprinzip am Beispiel einer Überweisung.', 'Abbuchen vom Konto A und Gutschreiben auf Konto B müssen **gemeinsam** gelingen. Beide Anweisungen laufen in **einer Transaktion**: Gelingen beide, wird per `COMMIT` gespeichert. Tritt ein Fehler auf, macht `ROLLBACK` alles rückgängig (**Atomarität**). So geht kein Geld verloren oder entsteht aus dem Nichts.', 5],
  ['quiz', [
    {q: 'Welcher Befehl fügt neue Zeilen ein?', o: ['INSERT', 'UPDATE', 'SELECT', 'ALTER'], a: 0, e: 'INSERT INTO ... VALUES ...'},
    {q: 'Was passiert bei UPDATE ohne WHERE?', o: ['Alle Zeilen werden geändert', 'Nichts', 'Nur die erste Zeile', 'Ein Syntaxfehler'], a: 0, e: 'Ohne Einschränkung ist die gesamte Tabelle betroffen.'},
    {q: 'Welcher Befehl löscht die Tabelle samt Struktur?', o: ['DROP TABLE', 'DELETE FROM', 'TRUNCATE', 'REMOVE'], a: 0, e: 'DROP entfernt das Objekt vollständig.'},
    {q: 'Wofür steht das C in ACID?', o: ['Consistency (Konsistenz)', 'Copy', 'Commit', 'Cache'], a: 0, e: 'ACID: Atomicity, Consistency, Isolation, Durability.'},
    {q: 'Welche Constraint verhindert doppelte Werte?', o: ['UNIQUE', 'NOT NULL', 'DEFAULT', 'CHECK'], a: 0, e: 'UNIQUE erzwingt Eindeutigkeit.'},
  ]],
]);
