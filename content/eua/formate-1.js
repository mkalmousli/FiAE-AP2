AP2.page('eua-formate', {
  b: 'eua', g: 'Webentwicklung', t: 'Datenaustauschformate: JSON, XML und CSV',
  d: 'Damit Programme Daten austauschen können, braucht es ein gemeinsames **Textformat**. **CSV** (Comma-Separated Values) speichert Tabellen zeilenweise mit Trennzeichen. **XML** (Extensible Markup Language) zeichnet Daten mit selbst definierten **Tags** aus und kann beliebig verschachtelt werden. **JSON** (JavaScript Object Notation) beschreibt Daten mit **Objekten** `{ }` aus Schlüssel-Wert-Paaren und **Arrays** `[ ]`; es ist schlanker als XML und heute Standard bei REST-APIs.',
  m: '**JSON: `{}` = Objekt, `[]` = Liste, Schlüssel immer in "doppelten Anführungszeichen", Zahlen und true/false/null ohne.** **XML wohlgeformt: genau ein Wurzelelement, jedes Tag geschlossen, korrekt verschachtelt, Groß-/Kleinschreibung gleich, Attributwerte in Anführungszeichen.** **CSV: erste Zeile = Kopf, Trennzeichen beachten (`,` oder `;`).**',
  cheat: [
    ['JSON-Typen', ['Objekt `{"a": 1}`', 'Array `[1, 2, 3]`', 'String `"Text"`, Zahl `3.5`', '`true`, `false`, `null`']],
    ['XML-Regeln', ['Prolog `<?xml version="1.0"?>`', 'ein Wurzelelement', '`<a></a>` oder `<a/>`', 'Attribute: `nr="1"`']],
    ['CSV', ['Kopfzeile mit Spaltennamen', 'eine Zeile = ein Datensatz', 'Trenner `;` (DE) oder `,`', 'Text mit Trenner in "..."']],
    ['Vergleich', ['JSON: schlank, direkt in Objekte', 'XML: Schema/Validierung, Attribute', 'CSV: nur flache Tabellen', 'alle: Klartext, plattformunabhängig']],
  ],
  blocks: [
    ['h', 'Dieselben Daten in drei Formaten'],
    ['p', 'Eine Bestellung der Filiale "Strauch GmbH" mit zwei Positionen (Sommer 2024):'],
    ['codes', [
      ['js', `{
  "Filiale": {
    "Name": "Strauch GmbH",
    "Strasse_Nr": "Bergstraße 21",
    "PLZ": "88000",
    "Ort": "München"
  },
  "Bestellpositionen": [
    { "Bezeichnung": "Feuerdorn",  "Anzahl": 15 },
    { "Bezeichnung": "rote Rosen", "Anzahl": 10 }
  ]
}`],
      ['html', `<?xml version="1.0" encoding="UTF-8"?>
<Bestellung>
  <Filiale>
    <Name>Strauch GmbH</Name>
    <Strasse_Nr>Bergstraße 21</Strasse_Nr>
    <PLZ>88000</PLZ>
    <Ort>München</Ort>
  </Filiale>
  <Bestellpositionen>
    <Bestellpos>
      <Bezeichnung>Feuerdorn</Bezeichnung>
      <Anzahl>15</Anzahl>
    </Bestellpos>
    <Bestellpos>
      <Bezeichnung>rote Rosen</Bezeichnung>
      <Anzahl>10</Anzahl>
    </Bestellpos>
  </Bestellpositionen>
</Bestellung>`],
      ['text', `Filiale;Strasse_Nr;PLZ;Ort;Bezeichnung;Anzahl
Strauch GmbH;Bergstraße 21;88000;München;Feuerdorn;15
Strauch GmbH;Bergstraße 21;88000;München;rote Rosen;10`],
    ]],
    ['p', 'Man sieht sofort: CSV kann keine Verschachtelung, die Filialdaten müssen in **jeder Zeile wiederholt** werden (Redundanz). XML braucht für jeden Wert ein öffnendes **und** schließendes Tag. JSON ist am kompaktesten.'],
    ['h', 'JSON im Detail'],
    ['list', [
      'Ein **Objekt** steht in geschweiften Klammern und enthält **Schlüssel-Wert-Paare**, getrennt durch Kommas: `{"name": "Max", "alter": 30}`.',
      '**Schlüssel** sind immer Strings in **doppelten** Anführungszeichen. Einfache Anführungszeichen sind kein gültiges JSON.',
      '**Werte** können sein: String, Zahl (Punkt als Dezimaltrenner: `42.99`), `true`/`false`, `null`, ein Objekt oder ein Array.',
      'Ein **Array** steht in eckigen Klammern: `["01.03.2026", "15.09.2026"]`. Es kann auch Objekte enthalten.',
      'Nach dem **letzten** Element steht **kein** Komma. Kommentare sind nicht erlaubt.',
    ]],
    ['warn', 'Typische Punktverluste: Komma nach dem letzten Element, fehlende Anführungszeichen um Schlüssel, Zahlen als Strings, wo Zahlen gemeint sind (`"Anzahl": "15"` statt `15`), und Listen ohne `[ ]`, wenn mehrere gleichartige Einträge vorkommen (zum Beispiel mehrere Bestellpositionen oder Termine).'],
    ['h3', 'JSON-Struktur selbst entwerfen (Winter 2025/26, 8 Punkte)'],
    ['p', 'Aufgabe: Die Webseite überträgt gewählte IGeL-Leistungen (PZR zweimal im Jahr), zu jeder Leistung **mehrere** Wunschtermine, dazu Name, Anschrift, Mail und Telefon. Vorgehen: Was kommt mehrfach vor? -> Array. Was gehört zusammen? -> Objekt.'],
    ['code', 'js', `{
  "leistungen": [
    { "leistung": "PZR", "durchgang": 1,
      "wunschtermine": ["2026-03-02", "2026-03-09", "2026-03-16"] },
    { "leistung": "PZR", "durchgang": 2,
      "wunschtermine": ["2026-09-07", "2026-09-14"] }
  ],
  "kunde": {
    "vorname": "Max",
    "nachname": "Muster",
    "anschrift": { "strasse": "Musterweg 1", "plz": "72764", "ort": "Reutlingen" },
    "mail": "max@muster.de",
    "telefon": "07121 123456"
  }
}`],
    ['h3', 'JSON für Messwerte über MQTT (Winter 2025/26, 6 Punkte)'],
    ['p', 'Die Kommentare hinter `//` dienen nur der Erklärung; in einer echten JSON-Datei sind Kommentare nicht erlaubt.'],
    ['code', 'js', `{
  "id": "msg-7f3a9c",                       // eindeutige Kennung der Nachricht
  "createdAt": "2026-01-13T10:36:43.011",   // Zeitstempel für die zeitliche Einordnung
  "topic": "praxis/behandlungsraum2/fenster1/windgeschwindigkeit",
  "payload": 42.99,                          // eigentlicher Messwert
  "unit": "km/h",
  "qos": 1                                    // Quality of Service
}`],
    ['p', 'Begründung der Attribute: **id** identifiziert den Datensatz eindeutig, der **Zeitstempel** ordnet Messwerte zeitlich ein, das **Topic** enthält Ort (Raum, Fenster) und Messgröße, **payload** ist der Messwert, **unit** vermeidet Missverständnisse, **qos** beschreibt die Zustellgarantie.'],
    ['h', 'XML im Detail: Wann ist ein Dokument wohlgeformt?'],
    ['def', 'Ein XML-Dokument ist **wohlgeformt**, wenn es die Syntaxregeln einhält: (1) **genau ein Wurzelelement**, (2) **jedes** öffnende Tag hat ein passendes schließendes Tag (oder ist leer: `<br/>`), (3) Elemente sind **korrekt verschachtelt** (`<a><b></b></a>`, nicht `<a><b></a></b>`), (4) **Groß-/Kleinschreibung** ist bei Start- und End-Tag gleich, (5) **Attributwerte** stehen in Anführungszeichen, (6) jedes Attribut kommt pro Element **nur einmal** vor. **Gültig (valide)** ist es zusätzlich, wenn es einem **Schema** (DTD oder XSD) entspricht.'],
    ['ex', ['Winter 2022/23: Ist diese Anfrage wohlgeformt?', '`<Anfrage nr="1"> <KilowattPeak>10</KilowattPeak> <Flaechen> <Flaeche nr="1" laenge="10.5" breite="4.5">West</Flaeche> ... <flaechen> <Speicher>5</Speicher> </Anfrage>`', '**Nein.** Das schließende Tag von `Flaechen` fehlt: Statt `</Flaechen>` steht `<flaechen>` (ohne Schrägstrich **und** kleingeschrieben). Dadurch ist auch die Verschachtelung kaputt.']],
    ['h3', 'Element oder Attribut?'],
    ['p', 'In XML kann man Daten als **Element** (`<laenge>10.5</laenge>`) oder als **Attribut** (`<Flaeche laenge="10.5">`) speichern. Faustregel: **Attribute** für Metadaten und kurze, einfache Werte (Nummer, Einheit), **Elemente** für die eigentlichen Daten und alles, was mehrfach vorkommen oder Unterstruktur haben kann.'],
    ['h3', 'Benutzerdaten als XML (AP1 Winter 2025/26)'],
    ['code', 'html', `<?xml version="1.0" encoding="UTF-8"?>
<benutzer>
  <benutzername>maier1</benutzername>
  <passwort>mXabc123m!</passwort>
  <vorname>Hubertus</vorname>
  <nachname>Maier</nachname>
  <email>maier1@bfpohg.de</email>
</benutzer>`],
    ['note', 'In der Praxis überträgt man **niemals Klartextpasswörter**, sondern nur Hashwerte (zum Beispiel bcrypt oder Argon2 mit Salt). Das ist ein guter Zusatzpunkt in der Antwort.'],
    ['h', 'CSV im Detail'],
    ['list', [
      'Erste Zeile ist meist die **Kopfzeile** mit den Spaltennamen. Beim Einlesen überspringt man sie.',
      'In Deutschland ist das Trennzeichen oft das **Semikolon**, weil das Komma Dezimaltrenner ist.',
      'Felder, die das Trennzeichen enthalten, werden in **Anführungszeichen** gesetzt: `1,"Hähnchen, mit Reis",2`.',
      'CSV kennt **keine Datentypen** und **keine Verschachtelung**. Variable Spaltenzahlen (zum Beispiel beliebig viele Dachflächen pro Zeile) muss das Programm selbst auswerten.',
    ]],
    ['h', 'Vergleich und Entscheidung'],
    ['table', ['Kriterium', 'CSV', 'XML', 'JSON'], [
      ['Struktur', 'Flache Tabelle', 'Baum, beliebig verschachtelt', 'Baum aus Objekten und Arrays'],
      ['Overhead (Metadaten)', 'Sehr gering', 'Hoch (Start- und End-Tags)', 'Gering'],
      ['Lesbarkeit', 'Gut bei wenigen Spalten', 'Gut, aber lang', 'Sehr gut'],
      ['Datentypen', 'Keine', 'Über Schema (XSD)', 'String, Zahl, Boolean, null'],
      ['Validierung', 'Nein', 'Ja (DTD, XSD)', 'Optional (JSON Schema)'],
      ['Typischer Einsatz', 'Excel-Export, Massendaten', 'Konfiguration, Office-Dateien, SOAP', 'REST-APIs, Web, MQTT, NoSQL'],
    ]],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Begründen Sie einem Großhändler, warum er künftig JSON statt XML zum Datenaustausch verwenden sollte. (6 Punkte)', ['- JSON hat den **gleichen Informationsgehalt** wie XML, kommt aber mit **deutlich weniger Metadaten** aus (keine schließenden Tags). Dateien sind kleiner, die Übertragung schneller.', '- JSON lässt sich **direkt in Datenstrukturen** der Programmiersprache umwandeln (Dictionaries, HashMaps, Objekte), das Parsen ist einfach und schnell.', '- JSON ist das **Standardformat moderner Web-APIs** (REST) und wird von allen gängigen Sprachen unterstützt.'], 6],
    ['qa', 'Nennen Sie eine Alternative zu CSV und XML und je einen Vorteil gegenüber diesen Formaten.', ['**JSON.** Vorteil gegenüber **CSV**: kann verschachtelte Strukturen und Listen abbilden (zum Beispiel beliebig viele Dachflächen pro Anfrage) und kennt Datentypen. Vorteil gegenüber **XML**: kompakter, weniger Overhead, leichter zu parsen.'], 4],
    ['qa', 'Stellen Sie folgenden Datensatz im JSON-Format dar: Drohnenmodell "SkyEye 2", Gewicht 1,2 kg, Kamera ja, Akkus: 2 Stück mit 5000 und 4500 mAh.', [['code', 'js', `{
  "modell": "SkyEye 2",
  "gewichtKg": 1.2,
  "kamera": true,
  "akkus": [ { "kapazitaetMah": 5000 }, { "kapazitaetMah": 4500 } ]
}`], 'Dezimalpunkt statt Komma, Boolean ohne Anführungszeichen, mehrere Akkus als Array.'], 4],
    ['quiz', [
      {q: 'Welche Klammer steht in JSON für eine Liste?', o: ['[ ]', '{ }', '( )', '< >'], a: 0, e: '{ } ist ein Objekt.'},
      {q: 'Welcher JSON-Ausdruck ist gültig?', o: ['{"a": 1, "b": [true, null]}', "{'a': 1}", '{a: 1}', '{"a": 1,}'], a: 0, e: 'Schlüssel in doppelten Anführungszeichen, kein Komma am Ende.'},
      {q: 'Was macht ein XML-Dokument wohlgeformt?', o: ['Es hält die Syntaxregeln ein (ein Wurzelelement, alle Tags geschlossen und korrekt verschachtelt)', 'Es entspricht einem XSD-Schema', 'Es ist kleiner als 1 MB', 'Es enthält keine Attribute'], a: 0, e: 'Schemakonform = valide.'},
      {q: 'Welches Format kann keine verschachtelten Daten abbilden?', o: ['CSV', 'JSON', 'XML', 'YAML'], a: 0, e: 'CSV ist eine flache Tabelle.'},
      {q: 'Welches Format wird bei REST-APIs meist verwendet?', o: ['JSON', 'CSV', 'DOCX', 'INI'], a: 0, e: 'XML ist bei SOAP üblich.'},
    ]],
    ['see', ['eua-webapi', 'eua-dateien', 'eua-iot']],
  ],
});
