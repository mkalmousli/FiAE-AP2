AP2.page('ps-relational', {
  b: 'ps', g: 'Datenmodellierung', t: 'Relationales Modell und Tabellenableitung',
  d: 'Im **relationalen Modell** werden Daten in **Tabellen** (Relationen) mit **Zeilen** (Datensätze, Tupel) und **Spalten** (Attribute) gespeichert. Aus einem ER-Modell leitet man Tabellen nach festen Regeln ab: **Entität = Tabelle, Attribut = Spalte, 1:n = Fremdschlüssel auf der n-Seite, n:m = Zwischentabelle.**',
  m: '**E-A-1-n-m**: Entität wird Tabelle, Attribut wird Spalte, 1:n Fremdschlüssel (auf der n-Seite), n:m Zwischentabelle. Der Fremdschlüssel sitzt immer dort, wo "viele" sind.',
  cheat: [
    ['Ableitungsregeln', ['Entität: **eine Tabelle**', 'Attribut: **eine Spalte**', 'Schlüssel: **Primärschlüssel**', '**1:n:** FK in der n-Tabelle', '**n:m:** neue Tabelle mit 2 FK', '**1:1:** FK mit UNIQUE oder zusammenlegen']],
    ['Schreibweise', ['Kunde(**kunden_id**, name, email)', 'Bestellung(**bestell_id**, datum, #kunden_id)', '**Fett/unterstrichen** = PK', '**#** oder FK = Fremdschlüssel']],
    ['Integrität', ['**Entitätsintegrität:** PK eindeutig, nicht NULL', '**Referentielle Integrität:** FK verweist auf vorhandenen PK', '**Domänenintegrität:** Werte passen zum Datentyp und Bereich']],
    ['Constraints', ['PRIMARY KEY, FOREIGN KEY', 'NOT NULL, UNIQUE', 'CHECK (Bedingung), DEFAULT']],
  ],
  blocks: [
    ['h', 'Das relationale Modell'],
    ['p', 'Fast alle Unternehmensdatenbanken (MySQL, PostgreSQL, Oracle, SQL Server) sind **relational**. Daten stehen in Tabellen. Tabellen sind durch **Schlüssel** verknüpft. So werden Daten nicht doppelt gespeichert: Statt bei jeder Bestellung Name und Adresse des Kunden zu wiederholen, steht dort nur die **KundenNr**.'],
    ['table', ['Fachbegriff', 'Umgangssprache', 'Beispiel'], [
      ['Relation', 'Tabelle', 'Kunde'], ['Tupel', 'Zeile, Datensatz', 'Kunde Meier, Göppingen'], ['Attribut', 'Spalte, Feld', 'name'], ['Domäne', 'Wertebereich / Datentyp', 'name: Text bis 50 Zeichen'], ['Schema', 'Aufbau der Tabellen', 'Kunde(kunden_id, name, ort)'],
    ]],
    ['h', 'Ableitungsregeln im Detail'],
    ['h3', 'Regel 1 und 2: Entität und Attribute'],
    ['p', 'Jede Entität wird eine **Tabelle**. Jedes Attribut wird eine **Spalte** mit passendem Datentyp. Der Primärschlüssel wird festgelegt.'],
    ['h3', 'Regel 3: 1:n-Beziehung'],
    ['p', 'Der **Primärschlüssel der 1-Seite** wird als **Fremdschlüssel in die Tabelle der n-Seite** kopiert. Beispiel: Ein Kunde hat viele Bestellungen. Also bekommt die Tabelle **Bestellung** die Spalte `kunden_id`.'],
    ['diagram', {w: 760, h: 200, keep: 560, cap: 'Der Fremdschlüssel kunden_id in Bestellung verweist auf den Primärschlüssel von Kunde.', nodes: [
      {id: 'k', k: 'cls', x: 170, y: 100, w: 230, t: {name: 'Kunde', attrs: ['PK  kunden_id', 'name', 'email']}}, {id: 'b', k: 'cls', x: 550, y: 100, w: 230, t: {name: 'Bestellung', attrs: ['PK  bestell_id', 'datum', 'FK  kunden_id']}},
    ], edges: [{a: 'k', b: 'b', sa: 'one', ea: 'zeromany'}]}],
    ['h3', 'Regel 4: n:m-Beziehung'],
    ['p', 'Es entsteht eine **neue Tabelle** (Zwischentabelle, Verbindungstabelle, Assoziationstabelle). Sie enthält die **Primärschlüssel beider Tabellen als Fremdschlüssel**. Beide zusammen bilden meist den **zusammengesetzten Primärschlüssel**. Eigene Attribute der Beziehung (zum Beispiel Menge) kommen ebenfalls dorthin.'],
    ['diagram', {w: 760, h: 200, keep: 600, cap: 'n:m-Beziehung aufgelöst: Die Tabelle Position verbindet Bestellung und Artikel.', nodes: [
      {id: 'b', k: 'cls', x: 110, y: 100, w: 190, t: {name: 'Bestellung', attrs: ['PK  bestell_id', 'datum']}}, {id: 'p', k: 'cls', x: 380, y: 100, w: 190, t: {name: 'Position', attrs: ['PK/FK  bestell_id', 'PK/FK  artikel_id', 'menge']}}, {id: 'a', k: 'cls', x: 650, y: 100, w: 190, t: {name: 'Artikel', attrs: ['PK  artikel_id', 'bezeichnung', 'preis']}},
    ], edges: [{a: 'b', b: 'p', sa: 'one', ea: 'many'}, {a: 'a', b: 'p', sa: 'one', ea: 'many'}]}],
    ['h3', 'Regel 5: 1:1-Beziehung'],
    ['p', 'Es gibt zwei Möglichkeiten: (1) Beide Entitäten in **einer Tabelle** zusammenlegen, wenn sie immer zusammen gehören. (2) Den Primärschlüssel der einen Tabelle als **Fremdschlüssel mit UNIQUE** in die andere Tabelle legen. UNIQUE stellt sicher, dass jeder Wert nur einmal vorkommt, also wirklich 1:1.'],
  ],
});
