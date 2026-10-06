AP2.add('eua-sqlexam', [
  ['h', 'Abfragen mit JOIN, WHERE und ORDER BY'],
  ['p', 'Schema (Winter 2025/26): `Patient(ID, nachname, vorname)`, `Einsender(ID, einsender, plz, ort)`, `Probe(ID, PatientenID, EinsenderID)`, `Funktion(ID, funktion)`, `Mitarbeiter(ID, nachname, vorname, IDfunktion)`, `Befund(ID, IDFreigebenderArzt, BefundArzt, IDMTA, BefundMTA, IDProbe)`.'],
  ['code', 'sql', `-- Alle Patienten, deren Proben von SmartDocs eingesandt wurden, mit Einsender, nach Nachname (6 Punkte)
SELECT pat.nachname, pat.vorname, e.einsender
FROM Patient AS pat
  INNER JOIN Probe AS pro    ON pat.ID = pro.PatientenID
  INNER JOIN Einsender AS e  ON e.ID = pro.EinsenderID
WHERE e.einsender = 'SmartDocs'
ORDER BY pat.nachname ASC;`],
  ['steps', [
    'Welche **Spalten** sollen ausgegeben werden? -> `SELECT`.',
    'In welchen **Tabellen** stehen sie, und welche Tabellen braucht man als **Brücke**? -> `FROM` und `JOIN` (hier Probe als Verbindung zwischen Patient und Einsender).',
    '**Verbindungsbedingung** je JOIN: Fremdschlüssel = Primärschlüssel.',
    '**Zeilenfilter** -> `WHERE`. **Sortierung** -> `ORDER BY`.',
  ]],
  ['h', 'Gruppieren und Gruppen filtern'],
  ['code', 'sql', `-- Winter 2025/26: MTA mit mehr als 300 ausgewerteten Proben, absteigend (10 Punkte)
SELECT m.nachname, m.vorname, COUNT(*) AS AnzahlProben
FROM Mitarbeiter AS m
  INNER JOIN Funktion AS f ON f.ID = m.IDfunktion
  INNER JOIN Befund AS b   ON b.IDMTA = m.ID          -- Mitarbeiter in der Rolle MTA
WHERE f.funktion = 'MTA'
GROUP BY m.ID, m.nachname, m.vorname
HAVING COUNT(*) > 300
ORDER BY AnzahlProben DESC;`],
  ['code', 'sql', `-- Sommer 2025: Fahrzeuge mit mehr als 10 Vermietungen, häufigstes oben (6 Punkte)
SELECT F.FZNR, COUNT(*) AS AnzahlVermietungen
FROM Fahrzeug F INNER JOIN Miete M ON F.FZNR = M.FZNR
GROUP BY F.FZNR
HAVING COUNT(*) > 10
ORDER BY AnzahlVermietungen DESC;

-- Sommer 2025: gefahrene Kilometer je Fahrzeug im Dezember 2023 (6 Punkte)
SELECT F.FZNR, F.Name AS Fahrzeugname, SUM(FA.StreckeInKM) AS SummeKilometer
FROM Fahrzeug F
  INNER JOIN Miete M  ON F.FZNR = M.FZNR
  INNER JOIN Fahrt FA ON FA.MNR = M.MNR
WHERE M.Datum BETWEEN '2023-12-01' AND '2023-12-31'
GROUP BY F.FZNR, F.Name;`],
  ['code', 'sql', `-- Sommer 2024: Kurse mit "Skifahren" im Titel im Jahr 2022 zählen (4 Punkte)
SELECT COUNT(*) AS anzahl_skikurse
FROM Kurs
WHERE Titel LIKE '%Skifahren%' AND YEAR(Beginn) = 2022;

-- Sommer 2024: Titel und Gesamtumsatz aller Kurse über 10.000 € (4 Punkte)
SELECT k.Titel, SUM(k.Gebuehr) AS Umsatz
FROM Kurs k INNER JOIN Kursbelegung kb ON k.idKurs = kb.Kurs_idKurs
GROUP BY k.Titel
HAVING SUM(k.Gebuehr) > 10000;

-- Winter 2023/24: AGs mit weniger als 5 Teilnehmern (nicht zugelassen, 8 Punkte)
SELECT AG.AGID, AG.Bezeichnung, COUNT(s.SchuelerID) AS Teilnehmer
FROM AG LEFT JOIN Schueler s ON AG.AGID = s.AGID
GROUP BY AG.AGID, AG.Bezeichnung
HAVING COUNT(s.SchuelerID) < 5;

-- Winter 2022/23: Anzahl Modelle je Marke, nur Marken mit mindestens 10 Modellen (6 Punkte)
SELECT ma.idMarke, ma.MarkeName, COUNT(mo.idModell) AS "Anzahl Modelle"
FROM Marke ma INNER JOIN Modell mo ON ma.idMarke = mo.idMarke
GROUP BY ma.idMarke, ma.MarkeName
HAVING COUNT(mo.idModell) >= 10;`],
  ['tip', 'Bei "weniger als 5 Teilnehmer" ist ein **LEFT JOIN** genauer: Eine AG ganz **ohne** Teilnehmer erscheint beim INNER JOIN gar nicht, beim LEFT JOIN mit Anzahl 0. Dann `COUNT(spalte)` statt `COUNT(*)` verwenden, denn `COUNT(*)` würde die leere Zeile als 1 zählen.'],
  ['h3', 'Überblick inklusive Kurse ohne Anmeldung (Sommer 2023, 6 Punkte)'],
  ['code', 'sql', `SELECT F.fid, F.titel, F.untertitel, F.anzahlPlaetze, COUNT(A.tnr) AS Anmeldungen
FROM Fortbildung F LEFT OUTER JOIN Anmeldung A ON F.fid = A.fid
GROUP BY F.fid, F.titel, F.untertitel, F.anzahlPlaetze;`],
  ['h3', 'Teilnehmerliste über vier Tabellen (Sommer 2023, 8 Punkte)'],
  ['code', 'sql', `SELECT T.tnr, T.vorname, T.nachname
FROM Termin TE
  INNER JOIN Fortbildung F ON TE.fid = F.fid
  INNER JOIN Anmeldung A   ON F.fid = A.fid
  INNER JOIN Teilnehmer T  ON A.tnr = T.tnr
WHERE F.titel = 'Java' AND F.untertitel = 'Grundkurs' AND TE.datum = '2023-06-14';`],
  ['h3', 'Rechnen in der Abfrage (Winter 2024/25, 8 Punkte)'],
  ['code', 'sql', `-- durchschnittliche prozentuale Abweichung der Ist- von der Nennkapazität je Hersteller
SELECT Hersteller,
       AVG((Nennkapazitaet - Istkapazitaet) / Nennkapazitaet * 100) AS "Abweichung in %"
FROM Akku
GROUP BY Hersteller;`],
  ['h', 'Unterabfragen und Top-N'],
  ['code', 'sql', `-- Winter 2022/23: Modell mit dem höchsten Verkaufspreis (6 Punkte)
SELECT mo.ModellName, v.Preis
FROM Verkauf v
  INNER JOIN Fahrzeug f ON v.idFahrzeug = f.idFahrzeug
  INNER JOIN Modell mo  ON f.idModell = mo.idModell
WHERE v.Preis = (SELECT MAX(Preis) FROM Verkauf);

-- Sommer 2022: Kunde mit der längsten Fahrt (Alternative mit Sortierung)
SELECT Kunde, km_berechnet FROM Kurierfahrten ORDER BY km_berechnet DESC LIMIT 1;`],
  ['note', 'Die Unterabfrage liefert **alle** Modelle mit dem Höchstpreis (bei Gleichstand mehrere), `ORDER BY ... LIMIT 1` nur eines. `LIMIT` gibt es in MySQL/MariaDB/PostgreSQL; SQL Server nutzt `SELECT TOP 1`.'],
  ['h3', 'Ergebnis einer Abfrage bestimmen (Sommer 2022, 6 Punkte)'],
  ['code', 'sql', `SELECT ID_Kunde AS KundenID, SUM(km_berechnet) AS Kilometer
FROM Kurierfahrten
GROUP BY ID_Kunde
ORDER BY SUM(km_berechnet) DESC
LIMIT 0, 3;            -- ab Zeile 0 (Offset), 3 Zeilen`],
  ['p', 'Vorgehen: erst je Kunde summieren, dann absteigend sortieren, dann die ersten drei Zeilen nehmen. Ergebnis laut Beispieldaten: 300 | 31,1 / 200 | 26,8 / 400 | 23,8.'],
  ['h', 'Datenbankwissen, das mit SQL zusammen abgefragt wird'],
  ['h3', 'Transaktionen (Sommer 2023, 6 Punkte)'],
  ['p', 'Problem: Bei einer Umbuchung wurde der Teilnehmer der neuen Fortbildung zugeordnet (INSERT), die alte Buchung blieb bestehen (DELETE nicht ausgeführt, zum Beispiel wegen Absturz). Lösung: beide Befehle in einer **Transaktion**. Entweder werden **alle** Befehle ausgeführt (`COMMIT`) oder **keiner** (`ROLLBACK`).'],
  ['code', 'sql', `START TRANSACTION;
  INSERT INTO Anmeldung (fid, tnr) VALUES (17, 4711);
  DELETE FROM Anmeldung WHERE fid = 12 AND tnr = 4711;
COMMIT;      -- bei einem Fehler stattdessen: ROLLBACK;`],
  ['def', '**ACID:** **A**tomicity (alles oder nichts), **C**onsistency (von einem gültigen Zustand in einen gültigen), **I**solation (parallele Transaktionen stören sich nicht), **D**urability (nach COMMIT dauerhaft gespeichert).'],
  ['h3', 'Anomalien in nicht normalisierten Tabellen (Winter 2025/26, 6 Punkte)'],
  ['table', ['Anomalie', 'Beschreibung', 'Beispiel'], [
    ['**Einfügeanomalie**', 'Daten eines Sachverhalts können nicht eingetragen werden, ohne Daten eines anderen zu kennen', 'Neuer Kurs ohne Teilnehmer lässt sich nicht speichern, weil der Schlüssel die Teilnehmernummer enthält'],
    ['**Änderungsanomalie** (Update)', 'Redundante Daten müssen an mehreren Stellen geändert werden; wird eine übersehen, ist der Bestand inkonsistent', 'Kurstitel steht in 50 Zeilen, nur 49 werden geändert'],
    ['**Löschanomalie**', 'Beim Löschen eines Sachverhalts gehen ungewollt Daten eines anderen verloren', 'Letzter Teilnehmer storniert, damit verschwinden auch alle Kursdaten'],
  ]],
  ['h3', 'INSERT aus Formulardaten planen (Sommer 2024, 6 Punkte)'],
  ['steps', [
    'In Tabelle **Mitglied** das Mitglied mit Name und Vorname aus dem Formular suchen (`SELECT idMitglied FROM Mitglied WHERE Name = ? AND Vorname = ?`), Primärschlüssel in `mid` merken.',
    'In Tabelle **Kurs** den Kurs mit dem gewählten Titel suchen, Primärschlüssel in `kid` merken.',
    'INSERT-Statement für **Kursbelegung** mit `mid` und `kid` (und weiteren Werten) erstellen, als **Prepared Statement** mit Platzhaltern, nicht per String-Verkettung (SQL-Injection).',
    'Statement ausführen und Erfolg prüfen (Fehlermeldung, wenn Mitglied oder Kurs nicht gefunden).',
  ]],
  ['h', 'Aufgaben zum Selbsttest'],
  ['qa', 'Gegeben `Schueler(SchuelerID, Name, KlassenID)` und `Klasse(KlassenID, Bezeichnung)`. Geben Sie alle Klassen mit ihrer Schülerzahl aus, auch Klassen ohne Schüler, absteigend nach Schülerzahl.', [['code', 'sql', `SELECT k.KlassenID, k.Bezeichnung, COUNT(s.SchuelerID) AS Anzahl
FROM Klasse k LEFT JOIN Schueler s ON k.KlassenID = s.KlassenID
GROUP BY k.KlassenID, k.Bezeichnung
ORDER BY Anzahl DESC;`]], 6],
  ['qa', 'Gegeben `Bestellung(BESTID, SCHU_ID, TG_ID, BESTELLPREIS, BESTELLDATUM)`. Ermitteln Sie den Umsatz je Monat im Jahr 2024.', [['code', 'sql', `SELECT MONTH(BESTELLDATUM) AS Monat, SUM(BESTELLPREIS) AS Umsatz
FROM Bestellung
WHERE YEAR(BESTELLDATUM) = 2024
GROUP BY MONTH(BESTELLDATUM)
ORDER BY Monat;`]], 5],
  ['qa', 'Erklären Sie den Unterschied zwischen WHERE und HAVING an einem Beispiel.', ['`WHERE` filtert **einzelne Zeilen vor** dem Gruppieren und darf keine Aggregatfunktionen enthalten (`WHERE Datum >= \'2024-01-01\'`).', '`HAVING` filtert **Gruppen nach** dem Gruppieren und arbeitet mit Aggregaten (`HAVING COUNT(*) > 10`).'], 3],
  ['quiz', [
    {q: 'Welche Klausel filtert Gruppen nach einer Aggregatfunktion?', o: ['HAVING', 'WHERE', 'ORDER BY', 'LIMIT'], a: 0, e: 'WHERE wirkt vor dem Gruppieren.'},
    {q: 'Was zählt COUNT(*) bei einem LEFT JOIN für eine Gruppe ohne Partner?', o: ['1', '0', 'NULL', 'Fehler'], a: 0, e: 'Die Zeile existiert (mit NULL-Werten). COUNT(spalte) liefert 0.'},
    {q: 'Wie erhöht man alle Preise um 10 %?', o: ['UPDATE t SET Preis = Preis * 1.1', 'UPDATE t SET Preis + 10%', 'ALTER TABLE t Preis * 1.1', 'SET Preis = 110%'], a: 0, e: 'Ohne WHERE betrifft es alle Zeilen, hier gewollt.'},
    {q: 'Welcher Befehl fügt eine Spalte hinzu?', o: ['ALTER TABLE t ADD spalte TYP', 'UPDATE t ADD spalte', 'INSERT COLUMN', 'CREATE COLUMN'], a: 0, e: 'DDL-Befehl.'},
    {q: 'Was bedeutet das A in ACID?', o: ['Atomarität: alles oder nichts', 'Authentizität', 'Aggregation', 'Anomalie'], a: 0, e: 'Atomicity.'},
    {q: 'Welches Muster findet "Skifahren für Anfänger"?', o: ["LIKE '%Skifahren%'", "LIKE 'Skifahren'", "= '%Skifahren%'", "LIKE '_Skifahren'"], a: 0, e: '% = beliebig viele Zeichen.'},
  ]],
  ['see', ['eua-sqlselect', 'eua-sqljoin', 'eua-sqlgroup', 'eua-sqldml', 'ps-normalisierung', 'course-sql']],
]);
