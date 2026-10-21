AP2.page('eua-sqlviews', {
  b: 'eua', g: 'Datenbanken und SQL', t: 'SQL vertieft: Views, Rechte (DCL), CASE, Datumsrechnung und Mengen',
  d: 'Eine **View** (Sicht) ist eine **gespeicherte SELECT-Abfrage**, die wie eine virtuelle Tabelle genutzt wird; sie vereinfacht Abfragen und schränkt sichtbare Daten ein. Mit der **DCL** (Data Control Language) vergibt man Rechte: **GRANT** erteilt, **REVOKE** entzieht. **CASE** erzeugt Fallunterscheidungen in Abfragen, **Datumsfunktionen** berechnen Abstände, und **UNION** kombiniert Ergebnismengen.',
  m: 'SQL-Familien: **DDL** (CREATE, ALTER, DROP), **DML** (INSERT, UPDATE, DELETE, SELECT), **DCL** (GRANT, REVOKE), **TCL** (COMMIT, ROLLBACK). **GRANT recht ON tabelle TO user; REVOKE recht ON tabelle FROM user.** View: **CREATE VIEW name AS SELECT ...**',
  cheat: [
    ['Views', ['CREATE VIEW v AS SELECT ...', 'Nutzung: SELECT * FROM v', 'Speichert die **Abfrage**, nicht die Daten (Ausnahme: materialisierte View)', 'Vorteile: Vereinfachung, Datenschutz (nur bestimmte Spalten), Stabilität bei Tabellenänderungen', 'DROP VIEW v']],
    ['Rechte (DCL)', ['GRANT SELECT, INSERT ON artikel TO hansen;', 'REVOKE DELETE ON ressource FROM hansen;', 'Rechte: SELECT, INSERT, UPDATE, DELETE, ALL', 'Rollen: CREATE ROLE, GRANT rolle TO user', 'WITH GRANT OPTION: darf weitergeben']],
    ['Nützliche Funktionen', ['CASE WHEN ... THEN ... ELSE ... END', 'DATEDIFF(ende, start) (MySQL) bzw. ende - start', 'CURRENT_DATE, NOW()', 'COALESCE(wert, ersatz) für NULL', 'CONCAT, UPPER, SUBSTRING, ROUND']],
    ['Mengen und Muster', ['UNION (ohne Duplikate), UNION ALL', 'IN (liste), BETWEEN a AND b', 'LIKE \'Lap%\' (% beliebig, _ ein Zeichen)', 'EXISTS (Unterabfrage)', 'IS NULL / IS NOT NULL']],
  ],
  blocks: [
    ['h', 'Beispieldatenbank: Ressourcenverwaltung'],
    ['row', [
      ['table', ['kategorie_id', 'bezeichnung'], [['1', 'Mobile Computer'], ['2', 'Visualisierung']], {first: false}],
      ['table', ['ressourcen_id', 'bezeichnung', 'hersteller', 'kategorie_id'], [['7111', 'Laptop XPro', 'Dell', '1'], ['7221', 'Beamer LCD', 'Epson', '2'], ['7305', 'Tablet T10', 'Lenovo', '1']], {first: false}],
    ]],
    ['row', [
      ['table', ['projekt_id', 'bezeichnung', 'startdatum', 'enddatum'], [['84141', 'Wartungs-App', '2026-04-01', '2026-04-15'], ['45661', 'Interface', '2026-05-15', '2026-06-15']], {first: false}],
      ['table', ['ressourcen_id', 'projekt_id'], [['7111', '84141'], ['7221', '45661'], ['7305', '45661']], {first: false}],
    ]],
    ['h', 'Views erstellen'],
    ['code', 'sql', `-- View 1: Ressourcen mit Kategoriebezeichnung
CREATE VIEW v_ressourcen AS
SELECT r.bezeichnung AS ressource, k.bezeichnung AS kategorie
FROM ressource r
JOIN kategorie k ON r.kategorie_id = k.kategorie_id;

-- View 2: Projekte mit Anzahl zugeordneter Ressourcen
CREATE VIEW v_projekt_ressourcen AS
SELECT p.bezeichnung, COUNT(rp.ressourcen_id) AS anzahl_ressourcen
FROM projekt p
LEFT JOIN ressource_projekt rp ON p.projekt_id = rp.projekt_id
GROUP BY p.projekt_id, p.bezeichnung;

-- Nutzung wie eine Tabelle
SELECT * FROM v_projekt_ressourcen WHERE anzahl_ressourcen > 1;`],
    ['tip', '**LEFT JOIN** in View 2 sorgt dafür, dass auch Projekte **ohne** Ressourcen mit 0 erscheinen. COUNT(spalte) zählt nur Werte, die nicht NULL sind.'],
    ['h', 'CASE und Datumsrechnung'],
    ['p', 'Aufgabe: Für ein Referenzdatum (1. Mai 2026) soll angezeigt werden, ob ein Projekt **beendet** ist (seit wie vielen Tagen), **läuft** oder **startet** (in wie vielen Tagen).'],
    ['code', 'sql', `CREATE VIEW v_projektstatus AS
SELECT bezeichnung,
       CASE
         WHEN enddatum < DATE '2026-05-01'
           THEN CONCAT('beendet seit Tagen: ', DATEDIFF(DATE '2026-05-01', enddatum))
         WHEN startdatum > DATE '2026-05-01'
           THEN CONCAT('startet in Tagen: ', DATEDIFF(startdatum, DATE '2026-05-01'))
         ELSE 'läuft'
       END AS status
FROM projekt;`],
    ['table', ['bezeichnung', 'status'], [['Wartungs-App', 'beendet seit Tagen: 16'], ['Interface', 'startet in Tagen: 14']]],
    ['note', 'Datumsfunktionen unterscheiden sich je Datenbanksystem: MySQL kennt **DATEDIFF(a, b)**, PostgreSQL rechnet **a - b**, SQL Server **DATEDIFF(day, b, a)**. In der Prüfung ist meist ein Hinweis zur Syntax gegeben; sonst den Ansatz verständlich hinschreiben.'],
    ['h', 'Rechte vergeben und entziehen (DCL)'],
    ['code', 'sql', `-- Mitarbeiter Hansen darf in der Tabelle ressource löschen
GRANT DELETE ON ressource TO hansen;

-- Recht wieder entziehen
REVOKE DELETE ON ressource FROM hansen;

-- Lesezugriff nur über die View, nicht auf die Basistabellen
GRANT SELECT ON v_ressourcen TO praktikant;

-- Rollen bündeln Rechte
CREATE ROLE sachbearbeitung;
GRANT SELECT, INSERT, UPDATE ON projekt TO sachbearbeitung;
GRANT sachbearbeitung TO meier;`],
    ['h', 'Weitere DML-Klassiker'],
    ['code', 'sql', `-- Alle Projekte löschen, die länger als 12 Tage dauern
DELETE FROM projekt WHERE DATEDIFF(enddatum, startdatum) > 12;

-- Bezeichnung ändern
UPDATE projekt SET bezeichnung = 'Wartungs-Anwendung'
WHERE bezeichnung = 'Wartungs-App';

-- Anzahl eingesetzter Ressourcen je Kategorie
SELECT k.bezeichnung, COUNT(*) AS anzahl
FROM kategorie k
JOIN ressource r          ON r.kategorie_id = k.kategorie_id
JOIN ressource_projekt rp ON rp.ressourcen_id = r.ressourcen_id
GROUP BY k.kategorie_id, k.bezeichnung;

-- Mengen: Hersteller aus zwei Tabellen ohne Duplikate
SELECT hersteller FROM ressource
UNION
SELECT hersteller FROM lieferant;`],
    ['warn', 'Beim DELETE mit Fremdschlüsseln: Existieren in ressource_projekt noch Zeilen für das Projekt, scheitert das Löschen (RESTRICT), es sei denn, der Fremdschlüssel hat **ON DELETE CASCADE**. Das in der Antwort erwähnen bringt Zusatzpunkte.'],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Erstellen Sie eine View, die alle Ressourcenbezeichnungen mit ihrer Kategoriebezeichnung anzeigt.', [['code', 'sql', `CREATE VIEW v_ressourcen AS
SELECT r.bezeichnung AS ressourcenbezeichnung,
       k.bezeichnung AS kategoriebezeichnung
FROM ressource r
INNER JOIN kategorie k ON r.kategorie_id = k.kategorie_id;`]], 3],
    ['qa', 'Formulieren Sie die DCL-Anweisungen: Mitarbeiter Hansen erhält das Recht, in der Tabelle ressource zu löschen; danach wird es wieder entzogen.', [['code', 'sql', `GRANT DELETE ON ressource TO hansen;
REVOKE DELETE ON ressource FROM hansen;`]], 4],
    ['qa', 'Nennen Sie drei Vorteile von Views.', ['- **Vereinfachung:** komplexe Joins einmal definieren, dann wie eine Tabelle abfragen.', '- **Datenschutz/Sicherheit:** Nutzer sehen nur freigegebene Spalten und Zeilen (zum Beispiel ohne Gehalt); Rechte nur auf die View.', '- **Stabilität:** Ändert sich die Tabellenstruktur, bleibt die Schnittstelle (View) für Anwendungen gleich.'], 3],
    ['see', ['eua-sqlselect', 'eua-sqljoin', 'eua-sqlgroup', 'eua-sqldml', 'eua-transaktionen']],
    ['quiz', [
      {q: 'Was speichert eine normale View?', o: ['Die Abfrage (SELECT), nicht die Daten', 'Eine Kopie aller Daten', 'Nur die Spaltennamen', 'Ein Backup der Datenbank'], a: 0, e: 'Bei jeder Nutzung wird die Abfrage neu ausgeführt.'},
      {q: 'Mit welchem Befehl entzieht man ein Recht?', o: ['REVOKE', 'GRANT', 'DROP', 'DELETE'], a: 0, e: 'REVOKE ... ON ... FROM user.'},
      {q: 'Zu welcher Sprachfamilie gehört GRANT?', o: ['DCL', 'DDL', 'DML', 'TCL'], a: 0, e: 'Data Control Language: GRANT und REVOKE.'},
      {q: 'Welche Syntax ist richtig?', o: ['GRANT SELECT ON artikel TO meier;', 'GRANT meier TO SELECT artikel;', 'GIVE SELECT artikel meier;', 'GRANT ON artikel SELECT FROM meier;'], a: 0, e: 'Recht ON Objekt TO Benutzer.'},
      {q: 'Was liefert CASE in einer SELECT-Abfrage?', o: ['Einen Wert abhängig von Bedingungen', 'Eine neue Tabelle', 'Einen Index', 'Ein Recht'], a: 0, e: 'CASE WHEN ... THEN ... ELSE ... END.'},
      {q: 'Was macht UNION?', o: ['Vereinigt zwei Ergebnismengen ohne Duplikate', 'Verbindet Tabellen über Schlüssel', 'Löscht doppelte Tabellen', 'Sortiert das Ergebnis'], a: 0, e: 'UNION ALL behält Duplikate.'},
      {q: 'Welche Bedingung findet Bezeichnungen, die mit "Lap" beginnen?', o: ["LIKE 'Lap%'", "LIKE '%Lap'", "= 'Lap*'", "IN ('Lap')"], a: 0, e: '% steht für beliebig viele Zeichen.'},
    ]],
  ],
});
