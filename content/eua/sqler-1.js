AP2.page('eua-sqler', {
  b: 'eua', g: 'Datenbanken und SQL', t: 'Datenbankentwurf: vom ER-Modell zu Tabellen und SQL',
  d: 'Beim **Datenbankentwurf** entsteht aus einer **Aufgabenbeschreibung** ein **ER-Modell**, daraus das **relationale Modell** (Tabellen) und daraus **SQL-Anweisungen** (`CREATE TABLE`). Der Ablauf: **Entitäten und Beziehungen erkennen, Kardinalitäten bestimmen, Tabellen ableiten (1:n = Fremdschlüssel, n:m = Zwischentabelle), Schlüssel und Constraints festlegen, normalisieren.**',
  m: '**Text → ER-Modell → Tabellen → CREATE TABLE → INSERT → SELECT.** 1:n: Fremdschlüssel in die **n-Tabelle**. n:m: **neue Tabelle** mit beiden Fremdschlüsseln (zusammen Primärschlüssel) und den Beziehungsattributen.',
  cheat: [
    ['Ablauf', ['1. **Text lesen:** Substantive = Entitäten, Verben = Beziehungen', '2. **Attribute und Schlüssel**', '3. **Kardinalitäten** (1:1, 1:n, n:m)', '4. **Tabellen ableiten**', '5. **Normalisieren** (3NF prüfen)', '6. **SQL schreiben** (Typen, Constraints)']],
    ['Ableitungsregeln', ['Entität = **Tabelle**, Attribut = **Spalte**', '**1:n:** FK in die **n-Seite**', '**n:m:** Zwischentabelle mit 2 FKs', '**1:1:** FK mit UNIQUE oder zusammenlegen', 'Beziehungsattribute in die Zwischentabelle']],
    ['SQL-Reihenfolge', ['Zuerst Tabellen **ohne** Fremdschlüssel (trainer), dann abhängige (kurs), zuletzt Zwischentabellen (buchung)', 'Beim **Löschen** umgekehrt', 'Datentypen passend wählen (Geld: DECIMAL)']],
    ['Prüfen', ['Jede Tabelle hat einen **Primärschlüssel**', 'Keine **Redundanz** (3NF)', 'Alle Beziehungen aus dem Text abgebildet', 'Constraints: NOT NULL, UNIQUE, CHECK']],
  ],
  blocks: [
    ['h', 'Beispielaufgabe (im Stil der Prüfung)'],
    ['ex', ['Ein **Fitnessstudio** verwaltet **Mitglieder**, **Kurse** und **Trainer**.', 'Von Mitgliedern werden Nummer, Name, E-Mail und Eintrittsdatum gespeichert. Ein Kurs hat Nummer, Titel, Wochentag, Uhrzeit und eine maximale Teilnehmerzahl. Von Trainern werden Nummer, Name und Fachgebiet erfasst.', 'Ein **Mitglied** kann **mehrere Kurse** buchen, ein **Kurs** hat **mehrere Mitglieder**. Zu jeder Buchung wird das **Buchungsdatum** gespeichert. Jeder **Kurs** wird von **genau einem Trainer** geleitet, ein **Trainer** leitet **mehrere Kurse**.']],
    ['h3', 'Schritt 1: Entitäten, Beziehungen, Kardinalitäten'],
    ['table', ['Textstelle', 'Ergebnis'], [['Mitglieder, Kurse, Trainer (Substantive mit eigenen Daten)', 'Entitäten **Mitglied**, **Kurs**, **Trainer**'], ['"Mitglied bucht Kurs", viele zu viele', 'Beziehung **bucht**, **n:m**, Attribut **buchungsdatum**'], ['"Kurs wird von genau einem Trainer geleitet", ein Trainer leitet mehrere', 'Beziehung **leitet**, **1:n** (Trainer 1, Kurs n)']]],
    ['diagram', {w: 780, h: 300, keep: 640, cap: 'ER-Modell (Krähenfuß). Die n:m-Beziehung bucht wird durch die Entität buchung aufgelöst.', nodes: [
      {id: 't', k: 'cls', x: 100, y: 80, w: 180, t: {name: 'trainer', attrs: ['PK  trainer_id', 'name', 'fachgebiet']}}, {id: 'k', k: 'cls', x: 370, y: 90, w: 200, t: {name: 'kurs', attrs: ['PK  kurs_id', 'titel', 'wochentag', 'uhrzeit', 'max_teilnehmer', 'FK  trainer_id']}},
      {id: 'b', k: 'cls', x: 370, y: 235, w: 200, t: {name: 'buchung', attrs: ['PK/FK  mitglied_id', 'PK/FK  kurs_id', 'buchungsdatum']}}, {id: 'm', k: 'cls', x: 650, y: 215, w: 190, t: {name: 'mitglied', attrs: ['PK  mitglied_id', 'name', 'email', 'eintritt']}},
    ], edges: [{a: 't', b: 'k', sa: 'one', ea: 'zeromany'}, {a: 'k', b: 'b', sa: 'one', ea: 'zeromany'}, {a: 'm', b: 'b', sa: 'one', ea: 'zeromany'}]}],
    ['h3', 'Schritt 2: Relationales Modell'],
    ['code', 'text', `trainer  (trainer_id, name, fachgebiet)
mitglied (mitglied_id, name, email, eintritt)
kurs     (kurs_id, titel, wochentag, uhrzeit, max_teilnehmer, #trainer_id)
buchung  (#mitglied_id, #kurs_id, buchungsdatum)          -- PK = (mitglied_id, kurs_id)`],
    ['h3', 'Schritt 3: SQL (DDL)'],
    ['code', 'sql', `CREATE TABLE trainer (
    trainer_id  INT PRIMARY KEY,
    name        VARCHAR(80) NOT NULL,
    fachgebiet  VARCHAR(60)
);
CREATE TABLE mitglied (
    mitglied_id INT PRIMARY KEY,
    name        VARCHAR(80)  NOT NULL,
    email       VARCHAR(120) UNIQUE NOT NULL,
    eintritt    DATE NOT NULL
);
CREATE TABLE kurs (
    kurs_id        INT PRIMARY KEY,
    titel          VARCHAR(80) NOT NULL,
    wochentag      VARCHAR(12) NOT NULL,
    uhrzeit        TIME NOT NULL,
    max_teilnehmer INT NOT NULL CHECK (max_teilnehmer > 0),
    trainer_id     INT NOT NULL,
    FOREIGN KEY (trainer_id) REFERENCES trainer(trainer_id)
);
CREATE TABLE buchung (
    mitglied_id   INT,
    kurs_id       INT,
    buchungsdatum DATE NOT NULL,
    PRIMARY KEY (mitglied_id, kurs_id),               -- ein Mitglied bucht einen Kurs nur einmal
    FOREIGN KEY (mitglied_id) REFERENCES mitglied(mitglied_id),
    FOREIGN KEY (kurs_id)     REFERENCES kurs(kurs_id)
);`],
  ],
});
