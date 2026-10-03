AP2.page('course-sql', {
  b: 'course', g: 'Datenbanken', t: 'SQL: vollständiger Kurs von Grundlagen bis Fortgeschritten',
  d: '**SQL (Structured Query Language)** ist die standardisierte (ISO/IEC 9075) Sprache für **relationale Datenbanken**. Sie ist **deklarativ**: man beschreibt **was** man will, nicht **wie** es berechnet wird (den Plan wählt der **Optimierer**). Teilsprachen: **DDL** (Struktur), **DML** (Daten ändern), **DQL** (abfragen), **DCL** (Rechte), **TCL** (Transaktionen).',
  m: '**DDL = Definition (CREATE, ALTER, DROP). DML = Manipulation (INSERT, UPDATE, DELETE). DQL = Query (SELECT). DCL = Control (GRANT, REVOKE). TCL = Transaction (COMMIT, ROLLBACK).** **Schreibreihenfolge: SELECT FROM WHERE GROUP BY HAVING ORDER BY. Ausführung: FROM WHERE GROUP BY HAVING SELECT ORDER BY LIMIT.**',
  cheat: [
    ['Teilsprachen', ['**DDL:** `CREATE`, `ALTER`, `DROP`, `TRUNCATE`', '**DML:** `INSERT`, `UPDATE`, `DELETE`, `MERGE`', '**DQL:** `SELECT`', '**DCL:** `GRANT`, `REVOKE`', '**TCL:** `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT`']],
    ['SELECT-Gerüst', ['`SELECT DISTINCT spalten`', '`FROM tabelle t JOIN andere a ON ...`', '`WHERE zeilenfilter`', '`GROUP BY gruppen HAVING gruppenfilter`', '`ORDER BY spalte DESC LIMIT n OFFSET m`']],
    ['Join-Arten', ['`INNER` nur Treffer', '`LEFT/RIGHT` alle einer Seite', '`FULL` alle beider Seiten', '`CROSS` Kreuzprodukt', '`SELF` Tabelle mit sich selbst']],
    ['Fortgeschritten', ['**CTE:** `WITH x AS (...)`', '**Fensterfunktion:** `ROW_NUMBER() OVER (PARTITION BY .. ORDER BY ..)`', '**Mengen:** `UNION`, `INTERSECT`, `EXCEPT`', '**Index, View, Trigger, Prozedur**', '**ACID**, Isolationsstufen']],
  ],
  blocks: [
    ['note', 'Beispiele nutzen eine kleine Firmendatenbank: `kunde(id, name, ort)`, `bestellung(id, kunde_id, datum, betrag)`, `produkt(id, name, preis)`, `position(bestellung_id, produkt_id, menge)`. Dialektunterschiede (MySQL, PostgreSQL, SQL Server, Oracle, SQLite) stehen am Ende.'],
    ['h', 'Relationales Modell in 60 Sekunden'],
    ['kv', [
      ['Tabelle (Relation)', 'Menge von **Zeilen** (Tupel, Datensätze) mit gleichen **Spalten** (Attribute). Die Reihenfolge der Zeilen ist **nicht definiert**, solange man kein `ORDER BY` angibt.'],
      ['Primärschlüssel (PK)', 'Spalte(n), die jede Zeile **eindeutig** identifizieren, **nie NULL**. Oft ein **Surrogatschlüssel** (`id`, automatisch hochgezählt) statt eines natürlichen Schlüssels.'],
      ['Fremdschlüssel (FK)', 'Verweist auf den PK einer anderen Tabelle und sichert die **referenzielle Integrität**: Es darf keine Bestellung zu einem nicht existierenden Kunden geben.'],
      ['Beziehungen', '**1:n** (ein Kunde, viele Bestellungen: FK auf der n-Seite), **n:m** (Bestellung und Produkt: **Zwischentabelle** `position` mit zwei FK), **1:1** (selten).'],
    ]],
    ['h', 'Datentypen (Standard und üblich)'],
    ['table', ['Gruppe', 'Typen', 'Hinweise'], [
      ['Ganzzahl', '`SMALLINT`, `INT` / `INTEGER`, `BIGINT`', 'Für Zähler, Schlüssel'],
      ['Festkomma', '`DECIMAL(p,s)` / `NUMERIC(p,s)`', '**Geld immer als DECIMAL**, nie als FLOAT (Rundungsfehler)'],
      ['Gleitkomma', '`REAL`, `FLOAT`, `DOUBLE`', 'Messwerte, nicht exakt'],
      ['Text', '`CHAR(n)` fest, `VARCHAR(n)` variabel, `TEXT` lang', 'CHAR füllt mit Leerzeichen auf'],
      ['Datum/Zeit', '`DATE`, `TIME`, `TIMESTAMP`, `INTERVAL`', 'ISO-Format `2026-05-31`'],
      ['Logisch', '`BOOLEAN`', 'In SQL Server `BIT`, in MySQL `TINYINT(1)`'],
      ['Binär/Sonst', '`BLOB`, `JSON`, `UUID`', 'JSON-Funktionen sind dialektabhängig'],
    ]],
    ['h', 'DDL: Tabellen anlegen mit Einschränkungen (Constraints)'],
    ['code', 'sql', `CREATE TABLE kunde (
  id    INT          PRIMARY KEY,
  name  VARCHAR(80)  NOT NULL,
  email VARCHAR(120) UNIQUE,
  ort   VARCHAR(60)  DEFAULT 'unbekannt'
);
CREATE TABLE bestellung (
  id        INT PRIMARY KEY,
  kunde_id  INT NOT NULL,
  datum     DATE NOT NULL,
  betrag    DECIMAL(10,2) CHECK (betrag >= 0),
  CONSTRAINT fk_kunde FOREIGN KEY (kunde_id) REFERENCES kunde(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE position (            -- n:m-Zwischentabelle
  bestellung_id INT REFERENCES bestellung(id),
  produkt_id    INT REFERENCES produkt(id),
  menge         INT NOT NULL CHECK (menge > 0),
  PRIMARY KEY (bestellung_id, produkt_id)   -- zusammengesetzter PK
);`],
    ['table', ['Constraint', 'Wirkung'], [['`PRIMARY KEY`', 'Eindeutig und NOT NULL, genau einer je Tabelle'], ['`FOREIGN KEY ... REFERENCES`', 'Verweis, referenzielle Integrität'], ['`UNIQUE`', 'Keine Duplikate (NULL erlaubt, je nach System mehrfach)'], ['`NOT NULL`', 'Wert muss angegeben werden'], ['`CHECK (bedingung)`', 'Wertebereich prüfen'], ['`DEFAULT wert`', 'Standardwert beim Einfügen'], ['`ON DELETE CASCADE / SET NULL / RESTRICT`', 'Was passiert mit abhängigen Zeilen beim Löschen des Elternsatzes']]],
  ],
});
