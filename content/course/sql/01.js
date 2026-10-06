AP2.page('course-sql-01', {
  b: 'course', g: 'SQL', t: 'SQL 1: Relationale Datenbanken und die Beispieldatenbank',
  d: 'Eine **relationale Datenbank** speichert Daten in **Tabellen** (Relationen) aus **Zeilen** (Datensätze, Tupel) und **Spalten** (Attribute). Jede Tabelle hat einen **Primärschlüssel** (PK), der jede Zeile eindeutig identifiziert; **Fremdschlüssel** (FK) verweisen auf Primärschlüssel anderer Tabellen und bilden so die Beziehungen ab. Ein **DBMS** (Datenbankmanagementsystem wie MySQL/MariaDB, PostgreSQL, Microsoft SQL Server, SQLite) verwaltet die Daten. Mit **SQL** (Structured Query Language) definiert, ändert und fragt man Daten ab. SQL ist **deklarativ**: Man beschreibt, **was** man will, nicht wie es berechnet wird.',
  m: '**Teilsprachen: DDL (CREATE, ALTER, DROP), DML (INSERT, UPDATE, DELETE), DQL (SELECT), DCL (GRANT, REVOKE), TCL (COMMIT, ROLLBACK).** **PK: eindeutig, nie NULL. FK: verweist auf PK, sichert referenzielle Integrität.** **1:n -> FK auf der n-Seite; n:m -> Zwischentabelle mit zwei FK.** **Schlüsselwörter sind nicht case-sensitiv, Textwerte in einfachen Anführungszeichen.**',
  cheat: [
    ['Begriffe', ['Tabelle = Relation', 'Zeile = Datensatz = Tupel', 'Spalte = Attribut', 'Wertebereich = Domäne']],
    ['Schlüssel', ['Primärschlüssel (PK)', 'Fremdschlüssel (FK)', 'zusammengesetzter Schlüssel', 'Surrogatschlüssel (künstliche ID)']],
    ['Teilsprachen', ['DDL: Struktur', 'DML: Daten ändern', 'DQL: abfragen', 'DCL/TCL: Rechte, Transaktionen']],
    ['Schreibweise', ['`Kunde(KundeID, Name, Ort)`', 'PK unterstrichen', 'FK gestrichelt oder mit #', 'Befehle enden mit `;`']],
  ],
  blocks: [
    ['h', 'Warum Datenbanken statt Excel oder Dateien?'],
    ['list', [
      '**Mehrbenutzerbetrieb:** Viele Nutzer und Programme greifen gleichzeitig zu, das DBMS koordiniert (Sperren, Transaktionen).',
      '**Integrität:** Datentypen, Pflichtfelder, eindeutige Schlüssel und Fremdschlüssel verhindern ungültige Daten.',
      '**Redundanzfreiheit:** Durch Normalisierung steht jede Information nur einmal in der Datenbank (keine Anomalien).',
      '**Abfragen:** Mit SQL lassen sich beliebige Auswertungen über viele Tabellen schnell formulieren.',
      '**Sicherheit und Datensicherung:** Rechte pro Benutzer, Protokollierung, Backup und Wiederherstellung.',
    ]],
    ['h', 'Die Beispieldatenbank dieses Kurses'],
    ['p', 'Alle Kapitel verwenden eine kleine Bestelldatenbank eines Gartencenters (angelehnt an die Prüfung Sommer 2024):'],
    ['diagram', {w: 760, h: 230, keep: 560, cap: 'Ein Kunde hat viele Bestellungen (1:n). Bestellung und Artikel stehen in einer n:m-Beziehung, aufgelöst über die Tabelle Position.', nodes: [
      {id: 'k', k: 'cls', x: 110, y: 110, w: 190, t: {name: 'Kunde', attrs: ['PK kunde_id', 'nachname', 'vorname', 'plz', 'ort']}},
      {id: 'b', k: 'cls', x: 330, y: 110, w: 180, t: {name: 'Bestellung', attrs: ['PK bestell_id', 'FK kunde_id', 'datum']}},
      {id: 'p', k: 'cls', x: 540, y: 110, w: 180, t: {name: 'Position', attrs: ['PK,FK bestell_id', 'PK,FK artikel_id', 'menge']}},
      {id: 'a', k: 'cls', x: 690, y: 110, w: 130, t: {name: 'Artikel', attrs: ['PK artikel_id', 'bezeichnung', 'preis', 'kategorie']}},
    ], edges: [{a: 'k', b: 'b', t: '1 : n', ea: 'none'}, {a: 'b', b: 'p', t: '1 : n', ea: 'none'}, {a: 'p', b: 'a', t: 'n : 1', ea: 'none'}]}],
    ['table', ['Kunde: kunde_id', 'nachname', 'vorname', 'plz', 'ort'], [
      ['1', 'Muster', 'Max', '12345', 'Musterhausen'],
      ['2', 'Könner', 'Tom', '72764', 'Reutlingen'],
      ['3', 'Weiß', 'Anna', '88000', 'München'],
      ['4', 'Yilmaz', 'Cem', '72764', 'Reutlingen'],
    ]],
    ['table', ['Artikel: artikel_id', 'bezeichnung', 'preis', 'kategorie'], [
      ['10', 'Feuerdorn', '5.00', 'Strauch'],
      ['11', 'rote Rosen', '2.30', 'Blume'],
      ['12', 'Linde', '42.50', 'Baum'],
      ['13', 'Flieder', '19.50', 'Strauch'],
      ['14', 'Glockenblume', '1.80', 'Blume'],
    ]],
    ['table', ['Bestellung: bestell_id', 'kunde_id', 'datum'], [
      ['100', '1', '2026-03-02'], ['101', '2', '2026-03-05'], ['102', '1', '2026-04-11'], ['103', '3', '2026-04-20'],
    ]],
    ['table', ['Position: bestell_id', 'artikel_id', 'menge'], [
      ['100', '10', '10'], ['100', '11', '10'], ['101', '12', '1'], ['102', '10', '5'], ['102', '13', '2'], ['103', '14', '20'],
    ]],
    ['note', 'Kunde 4 (Yilmaz) hat noch nichts bestellt, und der Artikel "Linde" wurde nur einmal gekauft. Solche Fälle sind wichtig, um den Unterschied zwischen INNER JOIN und LEFT JOIN zu verstehen.'],
    ['h', 'Relationenschreibweise'],
    ['code', 'text', `Kunde(kunde_id, nachname, vorname, plz, ort)
Artikel(artikel_id, bezeichnung, preis, kategorie)
Bestellung(bestell_id, #kunde_id, datum)
Position(#bestell_id, #artikel_id, menge)       -- zusammengesetzter PK aus zwei FK

Primärschlüssel unterstreichen, Fremdschlüssel mit # oder gestrichelt unterstreichen.`],
    ['h', 'Die Teilsprachen von SQL'],
    ['table', ['Teilsprache', 'Befehle', 'Zweck', 'Kapitel'], [
      ['**DDL** (Data Definition)', '`CREATE`, `ALTER`, `DROP`, `TRUNCATE`', 'Tabellen, Spalten, Schlüssel anlegen und ändern', '2'],
      ['**DQL** (Data Query)', '`SELECT`', 'Daten abfragen', '3 bis 6'],
      ['**DML** (Data Manipulation)', '`INSERT`, `UPDATE`, `DELETE`', 'Datensätze einfügen, ändern, löschen', '7'],
      ['**TCL** (Transaction Control)', '`START TRANSACTION`, `COMMIT`, `ROLLBACK`', 'Mehrere Befehle als Einheit', '7'],
      ['**DCL** (Data Control)', '`GRANT`, `REVOKE`', 'Rechte vergeben und entziehen', '8'],
    ]],
    ['h', 'SQL selbst ausprobieren'],
    ['list', [
      '**SQLite** ohne Installation im Browser (zum Beispiel sqliteonline.com) oder mit DB Browser for SQLite.',
      '**MySQL/MariaDB** lokal mit XAMPP und phpMyAdmin (in Berufsschulen verbreitet) oder per Docker.',
      '**PostgreSQL** mit pgAdmin. Die Prüfungslösungen in BW verwenden meist MySQL-Syntax (`AUTO_INCREMENT`, `LIMIT`).',
    ]],
    ['h', 'Übungen'],
    ['qa', 'Warum steht der Fremdschlüssel bei einer 1:n-Beziehung auf der n-Seite?', ['Ein Kunde hat viele Bestellungen, jede Bestellung gehört zu genau einem Kunden. Speichert man in der **Bestellung** die `kunde_id`, braucht jede Zeile genau einen Wert. Auf der 1-Seite müsste man dagegen **mehrere** Bestellnummern in einer Zelle speichern, was gegen die 1. Normalform verstößt.'], 3],
    ['qa', 'Wie bildet man die n:m-Beziehung zwischen Bestellung und Artikel ab?', ['Über eine **Zwischentabelle** (hier `Position`) mit zwei Fremdschlüsseln (`bestell_id`, `artikel_id`), die zusammen den Primärschlüssel bilden. Attribute der Beziehung (hier `menge`) kommen ebenfalls in diese Tabelle.'], 3],
    ['quiz', [
      {q: 'Welche Eigenschaft hat ein Primärschlüssel?', o: ['Eindeutig und nie NULL', 'Darf doppelt vorkommen', 'Muss eine Zahl sein', 'Verweist auf eine andere Tabelle'], a: 0, e: 'Das Verweisen macht der Fremdschlüssel.'},
      {q: 'Zu welcher Teilsprache gehört ALTER TABLE?', o: ['DDL', 'DML', 'DQL', 'DCL'], a: 0, e: 'Strukturänderung.'},
      {q: 'Was sichert ein Fremdschlüssel?', o: ['Referenzielle Integrität', 'Eindeutigkeit', 'Verschlüsselung', 'Sortierung'], a: 0, e: 'Kein Verweis ins Leere.'},
      {q: 'Wie viele Zeilen hat die Tabelle Position im Beispiel?', o: ['6', '4', '5', '10'], a: 0, e: 'Eine pro Artikel je Bestellung.'},
    ]],
    ['see', ['course-sql-02', 'ps-er', 'ps-relational', 'eua-sqlselect']],
  ],
});
