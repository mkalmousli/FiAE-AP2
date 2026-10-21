AP2.page('eua-transaktionen', {
  b: 'eua', g: 'Datenbanken und SQL', t: 'Transaktionen, ACID und referentielle Integrität',
  d: 'Eine **Transaktion** ist eine Folge zusammengehöriger Datenbankoperationen, die als **logische Einheit** ausgeführt wird: **ganz oder gar nicht**. Transaktionen erfüllen das **ACID-Prinzip** (Atomarität, Konsistenz, Isolation, Dauerhaftigkeit). Gesteuert werden sie mit **START TRANSACTION, COMMIT, ROLLBACK** und **SAVEPOINT** (TCL). **Referentielle Integrität** stellt sicher, dass ein Fremdschlüssel nur auf existierende Primärschlüssel verweist; **ON DELETE/ON UPDATE** regeln, was beim Löschen des Elterndatensatzes passiert.',
  m: '**ACID: Alles-oder-nichts, Korrekte Regeln, Isoliert, Dauerhaft.** **COMMIT = speichern, ROLLBACK = alles zurück, SAVEPOINT = Zwischenstand.** Fremdschlüssel: **CASCADE löscht mit, SET NULL leert, RESTRICT verbietet.**',
  cheat: [
    ['ACID', ['**Atomicity (Atomarität):** alle Befehle oder keiner', '**Consistency (Konsistenz):** von einem gültigen Zustand in den nächsten, alle Regeln (Constraints) erfüllt', '**Isolation:** parallele Transaktionen beeinflussen sich nicht (Sperren)', '**Durability (Dauerhaftigkeit):** nach COMMIT bleiben Änderungen auch bei Absturz erhalten (Log)']],
    ['TCL-Befehle', ['START TRANSACTION (oder BEGIN)', 'COMMIT: endgültig speichern', 'ROLLBACK: alles seit Beginn verwerfen', 'SAVEPOINT name: Zwischenstand merken', 'ROLLBACK TO SAVEPOINT name: nur bis dorthin zurück']],
    ['Fremdschlüssel-Aktionen', ['**CASCADE:** abhängige Zeilen mitlöschen bzw. mitändern', '**SET NULL:** Fremdschlüssel auf NULL setzen', '**SET DEFAULT:** auf Standardwert', '**RESTRICT / NO ACTION:** Löschen verhindern, solange Kinder existieren']],
    ['Integritätsarten', ['**Entitätsintegrität:** Primärschlüssel eindeutig, nicht NULL', '**Referentielle Integrität:** Fremdschlüssel verweist auf existierenden Datensatz', '**Bereichsintegrität:** Werte im erlaubten Bereich (CHECK, NOT NULL, Datentyp)']],
  ],
  blocks: [
    ['h', 'Warum Transaktionen?'],
    ['p', 'Klassisches Beispiel ist eine **Überweisung**: 100 Euro von Konto A abbuchen und Konto B gutschreiben. Stürzt das System zwischen den beiden UPDATE-Befehlen ab, wäre Geld verschwunden. In einer Transaktion werden beide Änderungen **gemeinsam** wirksam (COMMIT) oder **gar nicht** (ROLLBACK).'],
    ['code', 'sql', `START TRANSACTION;
UPDATE konto SET saldo = saldo - 100 WHERE konto_nr = 'A';
UPDATE konto SET saldo = saldo + 100 WHERE konto_nr = 'B';
-- Prüfung: darf A ins Minus? Falls nein:
-- ROLLBACK;
COMMIT;`],
    ['h', 'ACID an Szenarien erkennen'],
    ['table', ['Szenario', 'Vorrangig betroffenes Prinzip'], [
      ['Während eine Transaktion die Lieferantentabelle ändert, versucht ein zweiter Mitarbeiter, dieselben Werte zu ändern.', '**Isolation**'],
      ['Der letzte Befehl einer Transaktion schreibt einen ungültigen Wert in eine Fremdschlüsselspalte.', '**Konsistenz** (Consistency)'],
      ['Nach dem COMMIT stürzt das System ab; die Änderungen müssen trotzdem gespeichert sein.', '**Dauerhaftigkeit** (Durability)'],
      ['Bei einem Befehl tritt ein Fehler auf, die komplette Transaktion wird rückgängig gemacht.', '**Atomarität** (Atomicity)'],
    ]],
    ['h', 'SAVEPOINT: teilweise zurückrollen'],
    ['p', 'Mit einem **Sicherungspunkt** kann man innerhalb einer Transaktion zu einem Zwischenstand zurückkehren, ohne die gesamte Transaktion zu verwerfen. Typische Reihenfolge:'],
    ['code', 'sql', `START TRANSACTION;
UPDATE kunden      SET rabatt = 0.10 WHERE umsatz > 50000;
UPDATE mitarbeiter SET bonus  = 0.15 WHERE abteilung = 'Vertrieb';
SAVEPOINT vor_loeschen;
DELETE FROM temp WHERE nummer > 100;
SELECT * FROM temp;                    -- Ergebnis prüfen
-- falls falsch gelöscht:
ROLLBACK TO SAVEPOINT vor_loeschen;    -- nur das DELETE wird zurückgenommen
COMMIT;                                -- die beiden UPDATEs bleiben`],
    ['diagram', AP2.dg.flow(['START TRANSACTION', 'UPDATE kunden', 'UPDATE mitarbeiter', 'SAVEPOINT', 'DELETE temp', 'ROLLBACK TO SAVEPOINT (optional)', 'COMMIT'], {w: 780, h: 120, styles: ['plain', 'accent', 'accent', 'gold', 'bad', 'soft', 'ok'], cap: 'Ein ROLLBACK TO SAVEPOINT nimmt nur die Befehle nach dem Sicherungspunkt zurück.'})],
    ['h', 'Isolation und Sperren'],
    ['p', 'Ohne Isolation entstehen Anomalien: **Lost Update** (zwei überschreiben sich gegenseitig), **Dirty Read** (Lesen nicht bestätigter Daten), **Non-Repeatable Read** (zweimal lesen, unterschiedliche Werte). Datenbanken verhindern das mit **Sperren** (Locks) oder Versionierung. Die Stärke regelt der **Isolation Level** von READ UNCOMMITTED bis SERIALIZABLE; je strenger, desto sicherer, aber langsamer.'],
    ['h', 'Referentielle Integrität mit Constraints'],
    ['code', 'sql', `CREATE TABLE abteilung (
    a_id   INTEGER PRIMARY KEY,
    name   VARCHAR(50) NOT NULL
);
CREATE TABLE mitarbeiter (
    m_id    INTEGER PRIMARY KEY,
    name    VARCHAR(50) NOT NULL,
    abt_id  INTEGER,
    gehalt  DECIMAL(8,2) CHECK (gehalt > 0),
    CONSTRAINT mitarbeiter_fk FOREIGN KEY (abt_id)
        REFERENCES abteilung (a_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);`],
    ['table', ['Aktion beim Löschen der Abteilung 3', 'Wirkung auf Mitarbeiter mit abt_id = 3'], [
      ['ON DELETE CASCADE', 'Die Mitarbeiter werden **mitgelöscht**'],
      ['ON DELETE SET NULL', 'abt_id wird **NULL** (Mitarbeiter bleiben, ohne Abteilung)'],
      ['ON DELETE RESTRICT / NO ACTION', 'Löschen der Abteilung wird **abgelehnt**'],
    ]],
    ['warn', 'Achte auf die Richtung: **FOREIGN KEY (spalte_in_dieser_tabelle) REFERENCES elterntabelle (primärschlüssel)**. Verwechselte Spalten oder eine Referenz auf die eigene Tabelle sind typische falsche Antwortoptionen.'],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Definieren Sie Datenintegrität und gehen Sie auf Korrektheit, Vollständigkeit und Konsistenz ein.', ['**Datenintegrität** bedeutet, dass die gespeicherten Daten **zuverlässig und unverfälscht** sind.', '- **Korrektheit:** Die Daten sind richtig und fehlerfrei.', '- **Vollständigkeit:** Alle erforderlichen Daten sind vorhanden.', '- **Konsistenz:** Die Daten sind widerspruchsfrei; dieselbe Information ist überall gleich gespeichert, Beziehungen zwischen Tabellen sind gültig.'], 4],
    ['qa', 'Die Tabelle mitarbeiter hat den Fremdschlüssel abt_id, der auf a_id in abteilungen verweist. Beim Löschen einer Abteilung soll der Fremdschlüssel auf NULL gesetzt werden. Formulieren Sie das Constraint.', ['**CONSTRAINT mitarbeiter_fk FOREIGN KEY (abt_id) REFERENCES abteilungen (a_id) ON DELETE SET NULL**'], 3],
    ['qa', 'Erklären Sie die vier ACID-Eigenschaften jeweils in einem Satz.', ['- **Atomarität:** Eine Transaktion wird ganz oder gar nicht ausgeführt.', '- **Konsistenz:** Nach der Transaktion ist die Datenbank wieder in einem gültigen Zustand, alle Integritätsbedingungen sind erfüllt.', '- **Isolation:** Gleichzeitige Transaktionen beeinflussen sich nicht gegenseitig.', '- **Dauerhaftigkeit:** Bestätigte (committete) Änderungen bleiben dauerhaft erhalten, auch nach einem Systemausfall.'], 4],
    ['see', ['eua-sqldml', 'eua-sqler', 'eua-sqlviews', 'ps-relational']],
    ['quiz', [
      {q: 'Ein Fehler tritt auf, alle Befehle der Transaktion werden zurückgenommen. Welches Prinzip?', o: ['Atomarität', 'Isolation', 'Dauerhaftigkeit', 'Konsistenz'], a: 0, e: 'Alles oder nichts.'},
      {q: 'Welcher Befehl macht die Änderungen einer Transaktion endgültig?', o: ['COMMIT', 'ROLLBACK', 'SAVEPOINT', 'GRANT'], a: 0, e: 'ROLLBACK verwirft, SAVEPOINT markiert einen Zwischenstand.'},
      {q: 'Was bewirkt ON DELETE CASCADE?', o: ['Abhängige Datensätze werden mitgelöscht', 'Der Fremdschlüssel wird NULL', 'Das Löschen wird verhindert', 'Die Tabelle wird gelöscht'], a: 0, e: 'Die Löschung "kaskadiert" auf die Kindtabelle.'},
      {q: 'Zwei Nutzer ändern gleichzeitig denselben Datensatz. Welches Prinzip muss das regeln?', o: ['Isolation', 'Atomarität', 'Dauerhaftigkeit', 'Normalisierung'], a: 0, e: 'Sperren oder Versionierung isolieren parallele Transaktionen.'},
      {q: 'Was macht ROLLBACK TO SAVEPOINT sp1?', o: ['Nimmt nur die Änderungen nach sp1 zurück', 'Nimmt die ganze Transaktion zurück', 'Speichert alles endgültig', 'Löscht den Savepoint ohne Wirkung'], a: 0, e: 'Die Transaktion läuft weiter und kann später committet werden.'},
      {q: 'Welche Integrität verlangt, dass ein Primärschlüssel eindeutig und nicht NULL ist?', o: ['Entitätsintegrität', 'Referentielle Integrität', 'Bereichsintegrität', 'Transaktionsintegrität'], a: 0, e: 'Referentielle Integrität betrifft Fremdschlüssel.'},
      {q: 'Nach COMMIT stürzt der Server ab. Welche Eigenschaft garantiert, dass die Daten erhalten sind?', o: ['Dauerhaftigkeit (Durability)', 'Isolation', 'Atomarität', 'Konsistenz'], a: 0, e: 'Datenbanken schreiben dafür ein Transaktionslog.'},
    ]],
  ],
});
