AP2.page('eua-webapi', {
  b: 'eua', g: 'Webentwicklung', t: 'Web-APIs: HTTP, REST, SOAP, GraphQL und WebSockets',
  d: 'Eine **API** (Application Programming Interface) ist eine Schnittstelle, über die Programme miteinander kommunizieren. Im Web geschieht das meist über **HTTP(S)**. **REST** (Representational State Transfer) ist ein **Architekturstil**: Jede **Ressource** hat eine **URL**, die **HTTP-Methoden** (GET, POST, PUT, DELETE) beschreiben die Aktion, die Kommunikation ist **zustandslos**, Daten werden meist als **JSON** übertragen. Alternativen sind **SOAP** (XML-Nachrichten mit festem Vertrag), **GraphQL** (der Client fragt genau die Felder an, die er braucht) und **WebSockets** (dauerhafte, bidirektionale Verbindung für Echtzeit).',
  m: '**REST = Ressource (URL) + Methode (Verb) + Repräsentation (JSON), zustandslos.** **CRUD: Create = POST, Read = GET, Update = PUT/PATCH, Delete = DELETE.** **Statuscodes: 2xx ok, 3xx Umleitung, 4xx Fehler des Clients, 5xx Fehler des Servers.** **REST nutzt HTTP(S) als Protokoll und meist JSON als Format** (Sommer 2022, 5 Punkte).',
  cheat: [
    ['HTTP-Methoden', ['`GET` lesen', '`POST` neu anlegen', '`PUT` ersetzen, `PATCH` teilweise ändern', '`DELETE` löschen']],
    ['Statuscodes', ['200 OK, 201 Created, 204 No Content', '301 Moved, 304 Not Modified', '400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found', '500 Internal Server Error, 503 Unavailable']],
    ['REST-Prinzipien', ['Client-Server', 'zustandslos (stateless)', 'einheitliche Schnittstelle (URLs)', 'cachebar, Schichten']],
    ['Alternativen', ['SOAP: XML, WSDL, streng', 'GraphQL: ein Endpunkt, Client wählt Felder', 'WebSocket: bidirektional, Echtzeit', 'gRPC: binär, schnell']],
  ],
  blocks: [
    ['h', 'Wie läuft eine HTTP-Anfrage ab?'],
    ['seq', {w: 700, actors: ['Client (Browser/App)', 'Webserver / API'], cap: 'Eine REST-Anfrage: Der Client fordert eine Ressource an, der Server antwortet mit Statuscode und JSON.', steps: [
      [0, 1, 'GET /api/fahrzeuge/815  (Header: Accept: application/json)', 's'],
      [1, 0, '200 OK  {"fznr": 815, "name": "E-Scooter 3"}', 'r'],
      [0, 1, 'DELETE /api/fahrzeuge/815', 's'],
      [1, 0, '204 No Content', 'r'],
    ]}],
    ['p', 'Eine HTTP-Anfrage besteht aus **Methode**, **URL**, **Headern** (Zusatzinformationen wie `Content-Type`, `Authorization`) und optional einem **Body** (bei POST/PUT). Die Antwort enthält einen **Statuscode**, Header und den **Body** mit den Daten.'],
    ['h', 'REST: Ressourcen und Methoden'],
    ['table', ['Aktion (CRUD)', 'Methode', 'Beispiel-URL', 'Antwort'], [
      ['Alle Kunden lesen', '`GET`', '`/api/kunden`', '200 + JSON-Array'],
      ['Einen Kunden lesen', '`GET`', '`/api/kunden/42`', '200 + JSON-Objekt oder 404'],
      ['Kunden anlegen', '`POST`', '`/api/kunden` (Body: JSON)', '201 Created + neue ID'],
      ['Kunden vollständig ersetzen', '`PUT`', '`/api/kunden/42` (Body: JSON)', '200 oder 204'],
      ['Kunden teilweise ändern', '`PATCH`', '`/api/kunden/42` (Body: `{"ort": "Ulm"}`)', '200'],
      ['Kunden löschen', '`DELETE`', '`/api/kunden/42`', '204 No Content'],
    ]],
    ['p', 'Wichtige Eigenschaften: `GET` ist **sicher** (ändert nichts) und **idempotent** (mehrfaches Ausführen hat dieselbe Wirkung). `PUT` und `DELETE` sind idempotent, `POST` nicht: Zweimal POST legt zwei Datensätze an.'],
    ['h3', 'Die REST-Prinzipien (Constraints)'],
    ['list', [
      '**Client-Server-Trennung:** Oberfläche und Datenhaltung sind entkoppelt.',
      '**Zustandslosigkeit (stateless):** Jede Anfrage enthält alle Informationen (zum Beispiel ein Token). Der Server speichert keine Sitzung, das erleichtert Skalierung.',
      '**Einheitliche Schnittstelle:** Ressourcen werden über URLs adressiert und mit Standardmethoden bearbeitet.',
      '**Cachebarkeit:** Antworten können als cachebar markiert werden.',
      '**Schichtenarchitektur:** Zwischen Client und Server können Proxys, Load Balancer oder Caches liegen.',
    ]],
    ['h', 'REST-API aus Programmcode aufrufen'],
    ['codes', [
      ['python', `import requests

antwort = requests.get("https://api.beispiel.de/fahrzeuge/815", timeout=5)
if antwort.status_code == 200:
    fahrzeug = antwort.json()          # JSON -> dict
    print(fahrzeug["name"])

neu = {"name": "E-Bike 7", "typ": "EBike", "preis": 8.5}
r = requests.post("https://api.beispiel.de/fahrzeuge", json=neu)
print(r.status_code)                   # 201 bei Erfolg`],
      ['js', `const antwort = await fetch("/api/fahrzeuge/815");
if (antwort.ok) {
  const fahrzeug = await antwort.json();
  console.log(fahrzeug.name);
}
await fetch("/api/fahrzeuge", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({name: "E-Bike 7", preis: 8.5})
});`],
      ['csharp', `using var client = new HttpClient();
var json = await client.GetStringAsync("https://api.beispiel.de/fahrzeuge/815");
using var doc = JsonDocument.Parse(json);
string name = doc.RootElement.GetProperty("name").GetString();
Console.WriteLine(name);`],
    ]],
    ['h', 'Die Alternativen zu REST (Winter 2025/26, 4 Punkte)'],
    ['table', ['API-Stil', 'Funktionsweise', 'Unterschied zu REST'], [
      ['**SOAP** (Simple Object Access Protocol)', 'Nachrichten im **XML**-Format mit Envelope, Header, Body. Der Dienst wird in einer **WSDL**-Datei genau beschrieben.', 'Protokoll mit striktem Vertrag statt Architekturstil; schwergewichtiger, aber eindeutig typisiert, eingebaute Standards für Sicherheit (WS-Security) und Transaktionen. Häufig in Banken, Behörden, Altsystemen.'],
      ['**GraphQL**', 'Ein **einziger Endpunkt**. Der Client schickt eine Abfrage, in der er **genau die gewünschten Felder** angibt. Antwort in JSON.', 'Kein Over-/Underfetching: statt mehrerer REST-Aufrufe eine Abfrage; effizientere Übertragung, aber komplexerer Server und schwierigeres Caching.'],
      ['**WebSockets**', 'Nach einem HTTP-Handshake bleibt eine **dauerhafte TCP-Verbindung** offen. Beide Seiten können jederzeit senden.', '**Bidirektional und in Echtzeit** statt Anfrage-Antwort. Gut für Chat, Live-Daten, Spiele, Börsenkurse.'],
      ['**gRPC**', 'Entfernte Funktionsaufrufe, binär über HTTP/2 mit Protocol Buffers.', 'Sehr schnell und kompakt, aber nicht menschenlesbar; vor allem zwischen Microservices.'],
    ]],
    ['codes', [
      ['text', `# GraphQL-Abfrage: nur Name und Preis der Fahrzeuge vom Typ EScooter
query {
  fahrzeuge(typ: "EScooter") {
    name
    preis
  }
}`],
      ['html', `<!-- SOAP-Nachricht (gekürzt) -->
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Body>
    <GetFahrzeug><FZNR>815</FZNR></GetFahrzeug>
  </soap:Body>
</soap:Envelope>`],
    ]],
    ['h', 'HTTP und HTTPS'],
    ['p', '**HTTPS** ist HTTP über eine **TLS**-verschlüsselte Verbindung (Port 443 statt 80). Beim Verbindungsaufbau (TLS-Handshake) schickt der Server sein **Zertifikat**; der Browser prüft es über die Zertifikatskette bis zu einer vertrauenswürdigen Zertifizierungsstelle. Dann handeln beide mit asymmetrischer Kryptografie einen **symmetrischen Sitzungsschlüssel** aus, mit dem alle Daten verschlüsselt werden.'],
    ['table', ['Vorteile von HTTPS', 'Nachteile / Aufwand'], [
      ['**Vertraulichkeit:** Daten (Passwörter, Formulare) sind verschlüsselt und können nicht mitgelesen werden', 'Zertifikat nötig (kostenlos mit Let\'s Encrypt, sonst Kosten), muss **regelmäßig erneuert** werden'],
      ['**Integrität:** Manipulation auf dem Transportweg wird erkannt', 'Höherer Konfigurationsaufwand am Webserver'],
      ['**Authentizität:** Das Zertifikat belegt, dass man mit dem echten Server spricht (Schutz vor Man-in-the-Middle)', 'Minimal mehr Rechenaufwand und ein zusätzlicher Handshake'],
      ['Browser zeigen HTTP als "nicht sicher", Suchmaschinen bevorzugen HTTPS', 'Inhalte sind nur auf dem Transportweg geschützt, nicht auf dem Server'],
    ]],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Die JSON-Datei mit Sensordaten soll künftig über eine REST-API bereitgestellt werden. Geben Sie vier Befehle an, über die mit einer REST-API kommuniziert werden kann, und erläutern Sie sie. (8 Punkte, Sommer 2023)', ['- **GET:** eine Ressource abrufen (zum Beispiel aktuelle Messwerte).', '- **POST:** eine neue Ressource anlegen (zum Beispiel neuen Messwert speichern).', '- **PUT:** eine vorhandene Ressource vollständig ersetzen/aktualisieren.', '- **DELETE:** eine vorhandene Ressource löschen.', 'Ergänzend: **PATCH** ändert nur einzelne Felder.'], 8],
    ['qa', 'Beschreiben Sie kurz zwei weitere API-Architekturen und deren Unterschiede zur REST-API.', ['**SOAP:** XML-basiertes Protokoll mit fest definiertem Vertrag (WSDL); älter und komplexer, aber streng typisiert und weniger missverständlich, eingebaute Sicherheitsstandards.', '**GraphQL:** ebenfalls JSON, aber nur ein Endpunkt; der Client legt in der Abfrage fest, welche Felder er braucht, dadurch effizientere Übertragung.', '**WebSockets:** dauerhafte Verbindung, die bidirektionale Echtzeitkommunikation zwischen Client und Server erlaubt; REST arbeitet dagegen nach dem Anfrage-Antwort-Prinzip.'], 4],
    ['qa', 'Nennen Sie zwei wesentliche Vorteile und einen Nachteil der Umstellung eines Webservers von HTTP auf HTTPS.', ['Vorteile: **Vertraulichkeit** durch Verschlüsselung, **Authentizität** des Servers durch Zertifikate (und Integrität der Daten).', 'Nachteil: erhöhter **Konfigurationsaufwand**, ein **SSL/TLS-Zertifikat** ist erforderlich (eventuell Kosten, regelmäßige Erneuerung).'], 4],
    ['qa', 'Ein Client sendet `GET /api/kurse/999`, den Kurs gibt es nicht. Welchen Statuscode sollte die API liefern? Welcher Code passt, wenn der Client nicht angemeldet ist?', ['Nicht vorhanden: **404 Not Found**.', 'Nicht angemeldet: **401 Unauthorized** (angemeldet, aber ohne Berechtigung: **403 Forbidden**).'], 2],
    ['quiz', [
      {q: 'Welche HTTP-Methode legt bei REST eine neue Ressource an?', o: ['POST', 'GET', 'PUT', 'HEAD'], a: 0, e: 'PUT ersetzt eine bestehende Ressource unter bekannter URL.'},
      {q: 'Was bedeutet zustandslos (stateless) bei REST?', o: ['Jede Anfrage enthält alle nötigen Informationen; der Server speichert keine Sitzung', 'Der Server hat keine Datenbank', 'Es gibt keine Statuscodes', 'Die Verbindung bleibt offen'], a: 0, e: 'Erleichtert Skalierung und Lastverteilung.'},
      {q: 'Welcher Statuscode bedeutet Serverfehler?', o: ['500', '404', '201', '301'], a: 0, e: '5xx = Fehler auf Serverseite.'},
      {q: 'Welches Format nutzt SOAP?', o: ['XML', 'JSON', 'CSV', 'YAML'], a: 0, e: 'Mit Envelope, Header und Body.'},
      {q: 'Welche Technik eignet sich für einen Live-Chat mit Nachrichten in beide Richtungen?', o: ['WebSockets', 'REST mit GET', 'SOAP', 'FTP'], a: 0, e: 'Dauerhafte bidirektionale Verbindung.'},
      {q: 'Welcher Port wird standardmäßig für HTTPS verwendet?', o: ['443', '80', '21', '8080'], a: 0, e: 'HTTP = 80.'},
    ]],
    ['see', ['eua-formate', 'eua-js', 'infra-tls', 'infra-ports']],
  ],
});
