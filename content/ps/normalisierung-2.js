AP2.add('ps-normalisierung', [
  ['h3', 'Schritt 2: Zweite Normalform (2NF)'],
  ['p', 'Der Primärschlüssel besteht aus **zwei Spalten** (AuftragNr, ArtikelNr). Prüfe für jedes andere Attribut: Hängt es vom **ganzen** Schlüssel ab oder nur von einem **Teil**?'],
  ['table', ['Attribut', 'Hängt ab von', 'Ganzer Schlüssel?'], [
    ['Menge', 'AuftragNr **und** ArtikelNr (Menge dieses Artikels in diesem Auftrag)', 'Ja'],
    ['Datum, KundenNr, KundenName, PLZ, Ort', 'nur AuftragNr (egal welcher Artikel)', '**Nein** (Teilabhängigkeit)'],
    ['ArtikelName', 'nur ArtikelNr', '**Nein** (Teilabhängigkeit)'],
  ]],
  ['p', 'Lösung: Die teilabhängigen Attribute werden in **eigene Tabellen** ausgelagert, jeweils mit dem Teilschlüssel als Primärschlüssel.'],
  ['kv', [
    ['Auftrag', '(**AuftragNr**, Datum, KundenNr, KundenName, PLZ, Ort)'],
    ['Artikel', '(**ArtikelNr**, ArtikelName)'],
    ['Position', '(**#AuftragNr, #ArtikelNr**, Menge)'],
  ]],
  ['note', 'Eine Tabelle mit **einfachem** (nicht zusammengesetztem) Primärschlüssel ist automatisch in 2NF, wenn sie in 1NF ist. Es gibt dann keine Teilabhängigkeit.'],
  ['h3', 'Schritt 3: Dritte Normalform (3NF)'],
  ['p', 'Jetzt prüfen wir die Tabelle **Auftrag**: Es gibt **Ketten von Abhängigkeiten**:'],
  ['code', 'text', `AuftragNr  -->  KundenNr  -->  KundenName
                  KundenNr  -->  PLZ  -->  Ort

Der Name hängt nicht direkt am Auftrag, sondern über die KundenNr.
Der Ort hängt nicht direkt am Kunden, sondern über die PLZ.
Das nennt man transitive Abhängigkeit.`],
  ['p', 'Lösung: Die Attribute, die über ein anderes Nicht-Schlüssel-Attribut bestimmt werden, kommen in **eigene Tabellen**:'],
  ['kv', [
    ['Auftrag', '(**AuftragNr**, Datum, #KundenNr)'],
    ['Kunde', '(**KundenNr**, KundenName, #PLZ)'],
    ['Ort', '(**PLZ**, Ort)'],
    ['Artikel', '(**ArtikelNr**, ArtikelName)'],
    ['Position', '(**#AuftragNr, #ArtikelNr**, Menge)'],
  ]],
  ['diagram', {w: 780, h: 300, keep: 620, cap: 'Ergebnis in dritter Normalform: Jede Information steht genau einmal.', nodes: [
    {id: 'o', k: 'cls', x: 90, y: 70, w: 150, t: {name: 'Ort', attrs: ['PK  PLZ', 'Ort']}}, {id: 'k', k: 'cls', x: 290, y: 70, w: 160, t: {name: 'Kunde', attrs: ['PK  KundenNr', 'KundenName', 'FK  PLZ']}},
    {id: 'a', k: 'cls', x: 500, y: 70, w: 160, t: {name: 'Auftrag', attrs: ['PK  AuftragNr', 'Datum', 'FK  KundenNr']}}, {id: 'p', k: 'cls', x: 500, y: 215, w: 190, t: {name: 'Position', attrs: ['PK/FK  AuftragNr', 'PK/FK  ArtikelNr', 'Menge']}},
    {id: 'ar', k: 'cls', x: 270, y: 215, w: 170, t: {name: 'Artikel', attrs: ['PK  ArtikelNr', 'ArtikelName']}},
  ], edges: [{a: 'o', b: 'k', sa: 'one', ea: 'zeromany'}, {a: 'k', b: 'a', sa: 'one', ea: 'zeromany'}, {a: 'a', b: 'p', sa: 'one', ea: 'many'}, {a: 'ar', b: 'p', sa: 'one', ea: 'zeromany'}]}],
  ['table', ['Normalform', 'Zusätzliche Bedingung', 'Verletzung im Beispiel', 'Lösung'], [
    ['1NF', 'Atomare Werte, keine Wiederholungsgruppen', 'Mehrere Artikel in einer Zelle', 'Eine Zeile je Position'],
    ['2NF', 'Keine Teilabhängigkeit vom zusammengesetzten Schlüssel', 'Datum hängt nur an AuftragNr', 'Tabellen Auftrag, Artikel, Position'],
    ['3NF', 'Keine transitiven Abhängigkeiten', 'KundenNr bestimmt KundenName, PLZ bestimmt Ort', 'Tabellen Kunde und Ort'],
  ], {first: true}],
  ['h', 'Vorteile und Grenzen'],
  ['procon', 'Normalisierung', ['Keine Redundanz, weniger Speicher', 'Änderungen nur an einer Stelle: konsistente Daten', 'Keine Anomalien beim Einfügen, Ändern, Löschen'], ['Mehr Tabellen, **mehr JOINs** nötig (langsamer bei großen Abfragen)', 'Komplexeres Datenmodell', 'Für Auswertungen (Data Warehouse) bewusst **denormalisiert**']],
  ['note', 'In der Praxis wird bis zur **3NF** normalisiert. Darüber hinaus gibt es die **Boyce-Codd-Normalform (BCNF)** und die 4NF/5NF. Sie sind für die Abschlussprüfung in der Regel nicht nötig. **Denormalisierung** (bewusste Redundanz, um Abfragen zu beschleunigen) ist eine bewusste Ausnahme.'],
]);
