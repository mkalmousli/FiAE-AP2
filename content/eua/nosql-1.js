AP2.page('eua-nosql', {
  b: 'eua', g: 'Datenbanken und SQL', t: 'Datenbankmodelle: relational, NoSQL, dokumentenorientiert und objektorientiert',
  d: 'Eine **relationale Datenbank** speichert Daten in **Tabellen** mit festem **Schema**, verknüpft über **Schlüssel**, und wird mit **SQL** abgefragt. **NoSQL** ("not only SQL") ist ein Sammelbegriff für **nicht relationale** Datenbanken: **Dokument-** (JSON), **Key-Value-**, **spaltenorientierte** und **Graphdatenbanken**. Sie sind meist **schemaflexibel** und **horizontal skalierbar**, verzichten dafür oft auf Joins und strenge Konsistenz. **Objektorientierte Datenbanken** speichern Objekte samt Struktur direkt.',
  m: '**Relational = Tabellen + Schema + SQL + ACID.** NoSQL-Typen: **D-K-S-G** = **D**okument (MongoDB), **K**ey-Value (Redis), **S**palten (Cassandra), **G**raph (Neo4j). **Vertikal skalieren = größerer Server, horizontal = mehr Server.**',
  cheat: [
    ['Relational (RDBMS)', ['Tabellen, Zeilen, Spalten, festes Schema', 'Beziehungen über Primär- und Fremdschlüssel', 'SQL, Joins, **ACID**-Transaktionen', 'Beispiele: MySQL, PostgreSQL, Oracle, SQL Server', 'Stark bei strukturierten, verknüpften Daten']],
    ['NoSQL-Typen', ['**Dokument:** JSON-Dokumente, verschachtelt (MongoDB, CouchDB)', '**Key-Value:** Schlüssel zu Wert, extrem schnell, Cache (Redis)', '**Spaltenfamilien:** riesige verteilte Datenmengen (Cassandra, HBase)', '**Graph:** Knoten und Kanten, Beziehungsnetze (Neo4j)']],
    ['Eigenschaften NoSQL', ['Schemafrei bzw. flexibel', 'Horizontale Skalierung (Sharding)', 'Oft **BASE** statt ACID: Basically Available, Soft state, Eventual consistency', 'Keine bzw. eingeschränkte Joins']],
    ['Objektorientierte DB', ['Speichert Objekte mit Attributen und Beziehungen', 'Kein Mapping zwischen Objekten und Tabellen nötig', 'Nischenlösung; verbreiteter ist ein **ORM** (Hibernate, Entity Framework)']],
  ],
  blocks: [
    ['h', 'Dieselben Daten, zwei Modelle'],
    ['row', [
      ['table', ['kunde_id', 'name', 'ort'], [['1', 'Meier', 'Ulm']], {first: false}],
      ['table', ['bestell_id', 'kunde_id', 'artikel', 'menge'], [['101', '1', 'Maus', '2'], ['102', '1', 'Monitor', '1']], {first: false}],
    ]],
    ['code', 'json', `{
  "_id": 1,
  "name": "Meier",
  "ort": "Ulm",
  "bestellungen": [
    {"bestell_id": 101, "artikel": "Maus", "menge": 2},
    {"bestell_id": 102, "artikel": "Monitor", "menge": 1}
  ]
}`],
    ['p', 'Relational liegen Kunden und Bestellungen in **zwei Tabellen**, verbunden über den Fremdschlüssel kunde_id; für die Anzeige braucht man einen **JOIN**. Dokumentenorientiert steckt alles, was zusammen gelesen wird, in **einem Dokument**: schnell zu lesen, aber Redundanz, wenn dieselben Daten in vielen Dokumenten stehen.'],
    ['h', 'Vergleich'],
    ['table', ['Kriterium', 'Relational', 'NoSQL (dokumentenorientiert)'], [
      ['Struktur', 'Festes Schema, Normalisierung', 'Flexibles Schema, verschachtelte Dokumente'],
      ['Abfrage', 'SQL, mächtige Joins', 'Eigene APIs (zum Beispiel MongoDB-Query), Joins eingeschränkt'],
      ['Konsistenz', 'ACID, stark', 'oft "eventual consistency", konfigurierbar'],
      ['Skalierung', 'vor allem **vertikal** (größerer Server)', '**horizontal** über viele Server (Sharding)'],
      ['Geeignet für', 'Buchhaltung, Warenwirtschaft, stark verknüpfte Daten', 'Kataloge, Logs, Sensordaten, Inhalte, schnell wechselnde Strukturen'],
    ], {first: true}],
    ['h', 'Welches Modell passt?'],
    ['table', ['Anwendungsfall', 'Empfehlung', 'Begründung'], [
      ['Viele einzelne Datenblätter (Texte) aus Textdateien verwalten und durchsuchen', '**Dokumentenorientiert**', 'Auf das Speichern sehr vieler Dokumente ausgelegt, flexible Struktur je Datenblatt'],
      ['Rechnungen, Kunden, Artikel mit Verknüpfungen', '**Relational**', 'Starke Beziehungen, Transaktionen, Auswertungen per SQL'],
      ['Sitzungsdaten und Cache einer Webanwendung', '**Key-Value**', 'Extrem schnelle Zugriffe über einen Schlüssel'],
      ['Soziales Netzwerk, Empfehlungen ("Freunde von Freunden")', '**Graph**', 'Beziehungen sind die eigentlichen Daten'],
      ['Milliarden Messwerte von Sensoren', '**Spaltenorientiert** oder Zeitreihen-DB', 'Verteilt schreiben, große Mengen'],
    ]],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Was ist der Unterschied zwischen einer relationalen und einer NoSQL-Datenbank?', 'Eine **relationale Datenbank** speichert Daten in **Tabellen mit festem Schema**, die über **Schlüssel** in Beziehung stehen, und wird mit **SQL** abgefragt (ACID-Transaktionen). **NoSQL-Datenbanken** sind eine Sammlung **nicht relationaler** Datenbankmodelle (Dokument, Key-Value, Spalten, Graph), die meist **kein SQL** verwenden, schemaflexibel sind und sich gut horizontal skalieren lassen.', 3],
    ['qa', 'Eine Anwendung speichert eine große Menge Datenblätter in einzelnen Textdateien. Beurteilen Sie den Einsatz einer objektorientierten oder einer dokumentenorientierten Datenbank.', 'Eine **objektorientierte Datenbank** könnte die Datenblätter als Objekte speichern und passende Methoden zur Verarbeitung bereitstellen; sie ist aber eine Nischentechnologie. Die bessere Wahl ist eine **dokumentenorientierte Datenbank**: Sie ist auf das Speichern und Verwalten **sehr vieler Dokumente** mit unterschiedlicher Struktur ausgelegt und bietet Volltextsuche und gute Skalierung.', 4],
    ['qa', 'Erklären Sie vertikale und horizontale Skalierung.', ['- **Vertikal (scale up):** Ein Server wird leistungsfähiger (mehr CPU, RAM, schnellere SSDs). Einfach, aber begrenzt und teuer.', '- **Horizontal (scale out):** Es kommen weitere Server hinzu, die Daten werden verteilt (Sharding, Replikation). Nahezu unbegrenzt, aber komplexer; typisch für NoSQL und Cloud.'], 4],
    ['see', ['eua-sqldata', 'eua-sqler', 'eua-formate', 'eua-transaktionen']],
    ['quiz', [
      {q: 'Wofür steht NoSQL?', o: ['Not only SQL', 'No Structured Query Language', 'New Object SQL', 'Network of SQL'], a: 0, e: 'Sammelbegriff für nicht relationale Datenbanken.'},
      {q: 'Welche Datenbank ist dokumentenorientiert?', o: ['MongoDB', 'MySQL', 'Oracle Database', 'SQLite'], a: 0, e: 'MongoDB speichert JSON-ähnliche Dokumente (BSON).'},
      {q: 'Welcher NoSQL-Typ eignet sich für ein soziales Netzwerk?', o: ['Graphdatenbank', 'Key-Value-Store', 'Spaltenorientiert', 'Tabellenkalkulation'], a: 0, e: 'Knoten (Personen) und Kanten (Beziehungen).'},
      {q: 'Was bedeutet horizontale Skalierung?', o: ['Weitere Server hinzufügen und Daten verteilen', 'Einen Server mit mehr RAM ausstatten', 'Tabellen normalisieren', 'Indizes löschen'], a: 0, e: 'Scale out statt scale up.'},
      {q: 'Was ist eine Stärke relationaler Datenbanken?', o: ['Joins und ACID-Transaktionen über verknüpfte Daten', 'Völlig schemafreie Speicherung', 'Unbegrenzte horizontale Skalierung ohne Aufwand', 'Speichern von Graphen'], a: 0, e: 'Ideal für stark strukturierte, verknüpfte Geschäftsdaten.'},
      {q: 'Wofür nutzt man typischerweise Redis (Key-Value)?', o: ['Cache und Sitzungsdaten', 'Buchhaltung', 'Volltext-Archiv', 'Data Warehouse'], a: 0, e: 'Sehr schnelle Zugriffe über einen Schlüssel, oft im Arbeitsspeicher.'},
    ]],
  ],
});
