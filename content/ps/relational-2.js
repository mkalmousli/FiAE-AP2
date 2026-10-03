AP2.add('ps-relational', [
  ['h', 'Ergebnis als Tabellen und als SQL'],
  ['p', 'Für das Webshop-Beispiel ergibt sich in **relationaler Kurzschreibweise** (Primärschlüssel hervorgehoben, Fremdschlüssel mit #):'],
  ['code', 'text', `Kunde     (kunden_id, name, email)
Bestellung(bestell_id, datum, #kunden_id)
Artikel   (artikel_id, bezeichnung, preis)
Position  (#bestell_id, #artikel_id, menge)      -- zusammengesetzter PK`],
  ['p', 'Als SQL (DDL, Data Definition Language):'],
  ['code', 'sql', `CREATE TABLE kunde (
    kunden_id  INT PRIMARY KEY,
    name       VARCHAR(80)  NOT NULL,
    email      VARCHAR(120) UNIQUE
);

CREATE TABLE bestellung (
    bestell_id INT PRIMARY KEY,
    datum      DATE NOT NULL,
    kunden_id  INT  NOT NULL,
    FOREIGN KEY (kunden_id) REFERENCES kunde(kunden_id)
);

CREATE TABLE artikel (
    artikel_id  INT PRIMARY KEY,
    bezeichnung VARCHAR(100) NOT NULL,
    preis       DECIMAL(8,2) CHECK (preis >= 0)
);

CREATE TABLE position (
    bestell_id INT,
    artikel_id INT,
    menge      INT NOT NULL CHECK (menge > 0),
    PRIMARY KEY (bestell_id, artikel_id),
    FOREIGN KEY (bestell_id) REFERENCES bestellung(bestell_id),
    FOREIGN KEY (artikel_id) REFERENCES artikel(artikel_id)
);`],
  ['p', 'So sehen die Daten in den Tabellen aus. Beachte, wie die Fremdschlüssel (Spalte kunden_id, bestell_id, artikel_id) die Zeilen verknüpfen:'],
  ['table', ['kunden_id', 'name', 'email'], [['1', 'Meier', 'meier@example.org'], ['2', 'Schulz', 'schulz@example.org']]],
  ['table', ['bestell_id', 'datum', 'kunden_id'], [['101', '2026-03-02', '1'], ['102', '2026-03-05', '1'], ['103', '2026-03-06', '2']]],
  ['table', ['bestell_id', 'artikel_id', 'menge'], [['101', '7', '2'], ['101', '9', '1'], ['102', '7', '1'], ['103', '9', '5']]],
  ['h', 'Referentielle Integrität'],
  ['p', 'Der Fremdschlüssel sorgt dafür, dass **keine Bestellung auf einen nicht vorhandenen Kunden** zeigt. Das Datenbanksystem verhindert zum Beispiel, dass man Kunde 1 löscht, solange noch Bestellungen auf ihn verweisen. Man kann das Verhalten festlegen:'],
  ['table', ['Option', 'Wirkung beim Löschen des Eltern-Datensatzes'], [['RESTRICT / NO ACTION', 'Löschen wird verweigert (Standard).'], ['CASCADE', 'Die abhängigen Zeilen werden mit gelöscht (zum Beispiel Position beim Löschen der Bestellung).'], ['SET NULL', 'Der Fremdschlüssel wird auf NULL gesetzt (nur wenn NULL erlaubt ist).']]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Leiten Sie aus folgendem ER-Modell Tabellen ab: Ein Lehrer unterrichtet mehrere Klassen, jede Klasse hat genau einen Klassenlehrer. Schüler gehören genau einer Klasse an.', ['**Lehrer**(lehrer_id, name)', '**Klasse**(klassen_id, bezeichnung, #klassenlehrer_id) (1:n: FK auf der n-Seite, hier Klasse)', '**Schüler**(schueler_id, name, #klassen_id) (1:n: eine Klasse hat viele Schüler)'], 6],
  ['qa', 'Warum entsteht bei einer n:m-Beziehung eine eigene Tabelle? Was enthält sie?', 'Eine Spalte kann nur einen Wert enthalten. Würde man bei n:m in einer Tabelle mehrere Fremdschlüssel in ein Feld schreiben, verstieße das gegen die 1. Normalform. Deshalb gibt es eine **Zwischentabelle** mit den **Fremdschlüsseln beider Tabellen** (zusammen als Primärschlüssel) und eventuell eigenen Attributen der Beziehung wie Menge oder Datum.', 4],
  ['quiz', [
    {q: 'In welche Tabelle gehört der Fremdschlüssel bei einer 1:n-Beziehung?', o: ['In die Tabelle der n-Seite', 'In die Tabelle der 1-Seite', 'In beide', 'In keine'], a: 0, e: 'Der Fremdschlüssel steht dort, wo "viele" Datensätze sind (n-Seite).'},
    {q: 'Was bedeutet referentielle Integrität?', o: ['Fremdschlüssel verweisen immer auf vorhandene Datensätze', 'Daten sind verschlüsselt', 'Alle Spalten sind NOT NULL', 'Die Tabelle ist sortiert'], a: 0, e: 'Es darf keine "toten Verweise" geben.'},
    {q: 'Was ist ein zusammengesetzter Primärschlüssel?', o: ['Mehrere Spalten gemeinsam identifizieren eine Zeile', 'Ein Schlüssel mit Passwort', 'Ein Schlüssel aus Text', 'Zwei Tabellen mit gleichem Namen'], a: 0, e: 'Zum Beispiel (bestell_id, artikel_id) in der Positionstabelle.'},
    {q: 'Wofür steht DDL?', o: ['Data Definition Language (CREATE TABLE ...)', 'Data Delete Language', 'Database Direct Link', 'Data Download Layer'], a: 0, e: 'DDL definiert die Struktur (CREATE, ALTER, DROP). DML bearbeitet Daten (SELECT, INSERT, UPDATE, DELETE).'},
  ]],
]);
