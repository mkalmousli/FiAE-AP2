AP2.page('infra-mqtt', {
  b: 'infra', g: 'Netzwerke', t: 'MQTT: Publish/Subscribe für IoT',
  d: '**MQTT** (Message Queuing Telemetry Transport) ist ein schlankes **Nachrichtenprotokoll für das Internet der Dinge (IoT)**. Geräte **veröffentlichen (publish)** Nachrichten zu einem **Topic** an einen zentralen **Broker**, andere Geräte **abonnieren (subscribe)** dieses Topic. Sender und Empfänger kennen sich nicht. MQTT läuft über **TCP** auf Port **1883** (unverschlüsselt) bzw. **8883** (mit TLS).',
  m: '**MQTT = schwarzes Brett mit Abo.** Der **Broker** ist die Poststelle: Sensoren **publizieren** auf ein **Topic** (Adresse), Interessenten **abonnieren** das Topic. **Ports: 1883 (Klartext), 8883 (TLS).** **QoS 0 / 1 / 2** = höchstens einmal / mindestens einmal / genau einmal.',
  cheat: [
    ['Rollen', ['**Publisher:** sendet Nachrichten (z. B. Sensor)', '**Subscriber:** empfängt Nachrichten (z. B. Dashboard, App)', '**Broker:** nimmt alle Nachrichten an und verteilt sie an passende Abonnenten (z. B. Mosquitto, HiveMQ)', 'Ein Gerät kann gleichzeitig Publisher und Subscriber sein']],
    ['Topics', ['Hierarchisch mit **/**: `haus/wohnzimmer/temperatur`', '**+** = genau eine Ebene: `haus/+/temperatur`', '**#** = alle weiteren Ebenen: `haus/#`', 'Groß-/Kleinschreibung wird unterschieden']],
    ['QoS', ['**0:** höchstens einmal (fire and forget)', '**1:** mindestens einmal (Duplikate möglich)', '**2:** genau einmal (aufwendigster Handshake)']],
    ['Ports', ['**1883:** MQTT unverschlüsselt (TCP)', '**8883:** MQTT über TLS', '**80/443:** MQTT über WebSockets']],
  ],
  blocks: [
    ['h', 'Das Problem: viele kleine Geräte'],
    ['p', 'Sensoren, Maschinen und Haushaltsgeräte haben oft **wenig Rechenleistung, wenig Strom** und **instabile Funkverbindungen** (WLAN, Mobilfunk). HTTP mit seinen großen Headern und dem Anfrage-Antwort-Prinzip ist dafür unhandlich. **MQTT** hat einen Header von nur **2 Byte**, hält eine einzige **dauerhafte TCP-Verbindung** zum Broker und eignet sich daher für kleine Geräte und schlechte Netze.'],
    ['h', 'Publish/Subscribe mit Broker'],
    ['p', 'Anders als bei Client-Server (Client fragt, Server antwortet) sind Sender und Empfänger **entkoppelt**. Beide sprechen nur mit dem **Broker**. Der Broker wählt anhand des **Topics** aus, wer eine Nachricht bekommt. Neue Empfänger können jederzeit hinzukommen, ohne dass der Sender angepasst werden muss.'],
    ['diagram', {w: 760, h: 260, keep: 600, cap: 'Publish/Subscribe: Der Sensor kennt die Abonnenten nicht, der Broker verteilt anhand des Topics.', nodes: [
      {id: 's1', k: 'box', x: 100, y: 70, t: 'Temperatursensor', w: 150, h: 44, s: 'soft'}, {id: 's2', k: 'box', x: 100, y: 190, t: 'Türkontakt', w: 150, h: 44, s: 'soft'},
      {id: 'br', k: 'round', x: 380, y: 130, t: ['MQTT-Broker', '(Port 1883 / 8883)'], w: 170, h: 80, s: 'accent'},
      {id: 'd1', k: 'box', x: 665, y: 70, t: 'Dashboard', w: 130, h: 44, s: 'soft'}, {id: 'd2', k: 'box', x: 665, y: 190, t: 'Smartphone-App', w: 130, h: 44, s: 'soft'},
    ], edges: [{a: 's1', b: 'br', t: 'publish: haus/temp'}, {a: 's2', b: 'br', t: 'publish: haus/tuer'}, {a: 'br', b: 'd1', t: 'subscribe: haus/#'}, {a: 'br', b: 'd2', t: 'subscribe: haus/tuer'}]}],
    ['h', 'Topics und Wildcards'],
    ['p', 'Ein **Topic** ist eine Zeichenkette mit Ebenen, getrennt durch `/`. Topics müssen nicht vorher angelegt werden, der Broker erzeugt sie bei der ersten Nachricht. Abonnenten können mit **Wildcards** mehrere Topics auf einmal abonnieren.'],
    ['table', ['Abo', 'Passt auf', 'Passt nicht auf'], [
      ['`haus/kueche/temperatur`', 'genau dieses Topic', 'alles andere'],
      ['`haus/+/temperatur`', '`haus/kueche/temperatur`, `haus/bad/temperatur`', '`haus/kueche/licht`, `haus/og/bad/temperatur`'],
      ['`haus/#`', 'alle Topics unter `haus` (beliebig tief)', '`garage/tor`'],
    ]],
    ['procon', 'MQTT', ['Sehr **leichtgewichtig** (kleiner Header, wenig Strom und Bandbreite)', 'Funktioniert auch bei **instabilen Verbindungen** (QoS, Last Will, Retained)', '**Entkopplung** von Sender und Empfänger, einfach skalierbar (1:n)', 'Offener Standard (OASIS, ISO/IEC 20922), viele Bibliotheken'], ['**Broker** ist Single Point of Failure (Cluster nötig)', 'Standardmäßig **unverschlüsselt** (1883), Sicherheit muss aktiv konfiguriert werden', 'Kein festes Nachrichtenformat, Absprache zu Topics und Payload nötig', 'Nicht für große Dateien oder komplexe Abfragen gedacht']],
  ],
});
