AP2.page('eua-iot', {
  b: 'eua', g: 'IoT und Hardware', t: 'IoT, Sensoren, Aktoren und MQTT',
  d: 'Das **Internet der Dinge** (IoT) vernetzt physische Geräte, die mit **Sensoren** ihre Umgebung **messen** (Temperatur, Helligkeit, Bewegung, Wind) und mit **Aktoren** auf sie **einwirken** (Motor, Relais, Ventil, Lampe). Zusammen mit Software entsteht ein **cyber-physisches System** (CPS). Für die Kommunikation ist **MQTT** (Message Queuing Telemetry Transport) verbreitet: ein schlankes **Publish/Subscribe**-Protokoll über TCP, bei dem **Publisher** Nachrichten zu einem **Topic** an einen zentralen **Broker** senden und dieser sie an alle **Subscriber** dieses Topics verteilt.',
  m: '**Sensor = messen (Eingang), Aktor = handeln (Ausgang).** **MQTT: Publisher -> Broker -> Subscriber, verbunden nur über das Topic.** **Topic = Hierarchie mit `/`: `praxis/raum2/fenster1/wind`.** **Wildcards: `+` eine Ebene, `#` alle restlichen Ebenen.** **QoS 0 höchstens einmal, 1 mindestens einmal, 2 genau einmal.** **Sicher: TLS (Port 8883), Benutzername/Passwort, Client-Zertifikate, ACLs.**',
  cheat: [
    ['Sensoren', ['Temperatur, Feuchte', 'Helligkeit, Präsenz/Bewegung', 'Wind, Regen, Kontakt (Fenster)', 'Strom, Spannung, GPS']],
    ['Aktoren', ['Relais / Schalter (Licht)', 'Motor (Jalousie)', 'Stellventil (Heizung)', 'Display, Summer']],
    ['MQTT', ['Broker (zum Beispiel Mosquitto)', 'publish(topic, payload)', 'subscribe(topic)', 'Port 1883, mit TLS 8883']],
    ['Optionen', ['QoS 0, 1, 2', 'Retained Message', 'Last Will (Testament)', 'Keep Alive']],
  ],
  blocks: [
    ['h', 'Vom Messwert zur Aktion'],
    ['diagram', AP2.dg.flow(['Sensor misst', 'Mikrocontroller', 'MQTT-Broker', 'Steuereinheit (Raspberry Pi)', 'Aktor handelt'], {w: 760, h: 110, styles: ['soft', 'plain', 'accent', 'solid', 'ok'], cap: 'Typischer Aufbau eines IoT-Systems: Messen, übertragen, entscheiden, handeln.'})],
    ['p', 'Ein Sensor liefert ein **elektrisches Signal**, ein Mikrocontroller (zum Beispiel ESP32, Arduino) digitalisiert es und sendet den Wert über WLAN oder Ethernet. Eine **Steuereinheit** entscheidet nach Regeln ("Wind > 50 km/h und Jalousie unten -> hochfahren") und schickt einen Befehl an den Aktor.'],
    ['h', 'Prüfungsbeispiel Winter 2025/26: Sensoren und Aktoren wählen (6 Punkte)'],
    ['table', ['Funktion', 'Sensor(en)', 'Aktor', 'Begründung'], [
      ['Licht an, solange jemand im Raum ist und es zu dunkel ist', '**Präsenzsensor** (Anwesenheit) und **Helligkeitssensor**', '**Relais / Stromschalter** für die Leuchte', 'Ein einfacher Bewegungsmelder reicht nicht, weil Personen auch ruhig sitzen. Der Helligkeitssensor misst das Licht im Raum.'],
      ['Jalousien bei starkem Wind hochfahren, wenn sie unten sind', '**Windgeschwindigkeitssensor** (Anemometer) außen, **Endlagenschalter** für die Position', '**Motor** des Jalousieantriebs', 'Der Windsensor misst außen, der Endschalter meldet, ob die Jalousie unten ist, der Motor fährt sie hoch.'],
      ['Temperatur je Raum auf Wunschwert halten', '**Temperatursensor** im Raum, **Sollwertgeber** (Drehregler/Display)', '**Stellventil / Stellmotor** am Heizkörper', 'Regelkreis: Ist-Wert messen, mit Soll-Wert vergleichen, Durchfluss des Heizwassers anpassen.'],
    ]],
    ['h', 'Steuerung im lokalen Netz statt Cloud (Winter 2025/26, 3 Punkte)'],
    ['list', [
      '**Funktioniert ohne Internet:** Fällt die Internetverbindung aus, laufen Licht und Heizung weiter.',
      '**Datenschutz:** Anwesenheits- und Nutzungsdaten bleiben im eigenen Netz und gehen nicht an Herstellerserver (DSGVO).',
      '**Unabhängigkeit vom Hersteller:** Stellt der Hersteller den Clouddienst ein oder geht in Insolvenz, bleiben die Geräte nutzbar.',
      '**Geringere Latenz** und keine laufenden Cloud-Kosten; weniger Angriffsfläche aus dem Internet.',
    ]],
    ['h', 'MQTT: Publish/Subscribe über einen Broker'],
    ['diagram', {w: 720, h: 250, keep: 520, cap: 'Publisher und Subscriber kennen sich nicht. Sie sind nur über den Broker und das Topic verbunden (lose Kopplung).', nodes: [
      {id: 'p1', k: 'round', x: 110, y: 60, w: 170, h: 50, t: ['Windsensor Fenster 1', 'Publisher'], s: 'soft'},
      {id: 'p2', k: 'round', x: 110, y: 180, w: 170, h: 50, t: ['Temperatursensor', 'Publisher'], s: 'soft'},
      {id: 'b', k: 'round', x: 360, y: 120, w: 150, h: 70, t: ['MQTT-Broker', '(Mosquitto)'], s: 'accent'},
      {id: 's1', k: 'round', x: 610, y: 60, w: 170, h: 50, t: ['Steuereinheit', 'Subscriber praxis/#'], s: 'solid'},
      {id: 's2', k: 'round', x: 610, y: 180, w: 170, h: 50, t: ['Dashboard', 'Subscriber +/+/temperatur'], s: 'solid'},
    ], edges: [{a: 'p1', b: 'b', t: 'publish'}, {a: 'p2', b: 'b', t: 'publish'}, {a: 'b', b: 's1', t: 'Kopie'}, {a: 'b', b: 's2', t: 'Kopie'}]}],
    ['table', ['Rolle', 'Aufgabe'], [
      ['**Publisher**', 'Sendet eine **Publish-Nachricht** mit Topic und Nutzdaten (Payload) an den Broker. Er weiß nicht, wer die Nachricht bekommt.'],
      ['**Subscriber**', '**Abonniert** beim Broker ein oder mehrere Topics (auch mit Wildcards) und erhält danach alle passenden Nachrichten.'],
      ['**Broker**', 'Zentrale Vermittlungsstelle: **empfängt** alle Publish-Nachrichten, **filtert** nach Topic und **verteilt Kopien** an alle Clients, die das Topic abonniert haben. Verwaltet Verbindungen, Authentifizierung und gespeicherte Nachrichten.'],
    ]],
    ['note', 'Ein Gerät kann gleichzeitig Publisher **und** Subscriber sein, zum Beispiel ein Thermostat, das die Ist-Temperatur veröffentlicht und den Soll-Wert abonniert.'],
    ['h3', 'Topics: Aufgabe und Aufbau'],
    ['p', 'Ein **Topic** ist eine Zeichenkette, die angibt, **worum** es in einer Nachricht geht. Es ist **hierarchisch** mit `/` aufgebaut, meist vom Allgemeinen zum Speziellen: Standort, Raum, Gerät, Messgröße. So kann ein Subscriber genau die Daten auswählen, die er braucht, und man erkennt am Topic, **wo** ein Wert gemessen wurde.'],
    ['code', 'text', `praxis/behandlungsraum2/west/fenster1/windgeschwindigkeit
praxis/wartezimmer/temperatur/ist
praxis/wartezimmer/temperatur/soll

praxis/+/temperatur/ist     # + = genau eine Ebene: Ist-Temperatur aller Räume
praxis/behandlungsraum2/#   # # = alle Ebenen darunter: alles aus Raum 2`],
    ['h3', 'Quality of Service (QoS)'],
    ['table', ['QoS', 'Name', 'Garantie', 'Einsatz'], [
      ['0', 'At most once', 'Höchstens einmal, ohne Bestätigung ("fire and forget"), kann verloren gehen', 'Häufige Messwerte, bei denen ein fehlender Wert egal ist'],
      ['1', 'At least once', 'Mindestens einmal, mit Bestätigung (PUBACK); Duplikate möglich', 'Standard für die meisten Sensordaten'],
      ['2', 'Exactly once', 'Genau einmal (vierstufiger Handshake), langsamste Variante', 'Befehle, Abrechnungen, wo Duplikate schaden'],
    ]],
    ['list', [
      '**Retained Message:** Der Broker speichert die letzte Nachricht eines Topics und liefert sie neuen Subscribern sofort (zum Beispiel aktueller Schaltzustand).',
      '**Last Will and Testament:** Nachricht, die der Broker veröffentlicht, wenn ein Client unerwartet die Verbindung verliert ("Sensor offline").',
      '**Keep Alive:** Regelmäßige Lebenszeichen, damit der Broker tote Verbindungen erkennt.',
    ]],
    ['h3', 'MQTT in Python (paho-mqtt)'],
    ['code', 'python', `import json
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.username_pw_set("sensor1", "geheim")       # Authentifizierung
client.tls_set("ca.crt")                           # TLS-Verschlüsselung
client.connect("broker.praxis.local", 8883)

# Publisher: Messwert senden
wert = {"payload": 42.99, "unit": "km/h", "ts": "2026-01-13T10:36:43"}
client.publish("praxis/raum2/fenster1/windgeschwindigkeit", json.dumps(wert), qos=1)

# Subscriber: auf Nachrichten reagieren
def on_message(c, userdata, msg):
    daten = json.loads(msg.payload)
    if daten["payload"] > 50:
        c.publish("praxis/raum2/jalousie/befehl", "hoch", qos=2)

client.on_message = on_message
client.subscribe("praxis/+/fenster1/windgeschwindigkeit")
client.loop_forever()`],
    ['h', 'Sichere MQTT-Verbindungen (Sommer 2023, Winter 2025/26)'],
    ['p', 'Die **drei Kriterien** einer sicheren Verbindung: **Vertraulichkeit** (niemand liest mit), **Integrität** (nichts wird verändert), **Authentizität** (Kommunikationspartner sind die, für die sie sich ausgeben).'],
    ['table', ['Maßnahme', 'Wie funktioniert sie?', 'Sichert'], [
      ['**Benutzername und Passwort**', 'Der Client schickt beim CONNECT Zugangsdaten, der Broker prüft sie. Ohne TLS gehen sie im Klartext über das Netz!', 'Authentizität des Clients'],
      ['**TLS-Verschlüsselung** (MQTTS, Port 8883)', 'Der Broker weist sich mit einem **Serverzertifikat** aus; die Verbindung wird verschlüsselt.', 'Vertraulichkeit, Integrität, Authentizität des Brokers'],
      ['**Client-Zertifikate** (mTLS, PKI)', 'Auch jeder Client hat ein von einer vertrauenswürdigen CA signiertes Zertifikat. Gegenseitige Authentifizierung ohne Passwörter.', 'Starke Authentizität beider Seiten'],
      ['**Zugriffskontrolllisten (ACL)**', 'Der Broker legt fest, welcher Client welche Topics lesen oder schreiben darf.', 'Autorisierung'],
      ['**Payload-Verschlüsselung / Signatur**', 'Nutzdaten zusätzlich Ende-zu-Ende verschlüsseln oder signieren.', 'Schutz auch gegenüber dem Broker'],
      ['**Netzsegmentierung**', 'IoT-Geräte in ein eigenes VLAN, Broker nicht direkt aus dem Internet erreichbar.', 'Verringert Angriffsfläche'],
    ]],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Beschreiben Sie die Aufgaben von MQTT-Publisher, MQTT-Subscriber und MQTT-Broker.', ['**Publisher:** sendet Nachrichten (Publish) zu einem Topic an den Broker, zum Beispiel ein Sensor seinen Messwert.', '**Subscriber:** abonniert beim Broker Topics und erhält von diesem alle Nachrichten zu diesen Topics, zum Beispiel die Steuereinheit.', '**Broker:** empfängt alle Publish-Nachrichten und leitet Kopien an alle Clients weiter, die sich für das Topic interessieren; verwaltet Verbindungen und Zugriffsrechte.'], 6],
    ['qa', 'Beschreiben Sie die Aufgabe von Topics in MQTT an einem Beispiel.', ['Ein Topic kennzeichnet, **welche Messgröße** eine Nachricht enthält und **wo** sie entsteht. Es ist hierarchisch aufgebaut, zum Beispiel `praxis/behandlungsraum2/fenster1/windgeschwindigkeit`. Subscriber abonnieren genau die Topics, die sie brauchen, auch mit Wildcards wie `praxis/+/fenster1/windgeschwindigkeit` für alle Räume.'], 3],
    ['qa', 'Der Mikrocontroller ist per WPA2-PSK ins Gebäude-WLAN eingebunden. Beurteilen Sie dies und schlagen Sie eine Alternative vor.', ['WPA2 gilt als veraltet; bei PSK teilen sich **alle Geräte ein Passwort**. Wird es bekannt (oder aus einem Gerät ausgelesen), haben Angreifer Zugang, und das Passwort muss überall geändert werden. Schwache PSK sind per Wörterbuchangriff knackbar.', 'Alternative: **WPA3**, besser **WPA2/3-Enterprise mit 802.1X/EAP und RADIUS**: jedes Gerät authentifiziert sich einzeln (Benutzer oder Zertifikat) und kann einzeln gesperrt werden. Zusätzlich IoT-Geräte in ein eigenes VLAN.'], 3],
    ['quiz', [
      {q: 'Was ist ein Aktor?', o: ['Ein Bauteil, das auf die Umgebung einwirkt (zum Beispiel Motor)', 'Ein Bauteil, das misst', 'Ein MQTT-Broker', 'Ein Netzwerkprotokoll'], a: 0, e: 'Sensor misst, Aktor handelt.'},
      {q: 'Wer verteilt MQTT-Nachrichten an die Abonnenten?', o: ['Der Broker', 'Der Publisher direkt', 'Der DNS-Server', 'Der Router'], a: 0, e: 'Publisher und Subscriber kennen sich nicht.'},
      {q: 'Welches Topic-Abo empfängt alle Nachrichten unter haus/?', o: ['haus/#', 'haus/+', 'haus/*', 'haus/all'], a: 0, e: '# = alle restlichen Ebenen, + = genau eine Ebene.'},
      {q: 'Welcher QoS-Level garantiert genau eine Zustellung?', o: ['2', '0', '1', '3'], a: 0, e: 'QoS 3 gibt es nicht.'},
      {q: 'Welcher Port wird für MQTT über TLS verwendet?', o: ['8883', '1883', '443', '22'], a: 0, e: '1883 ist unverschlüsselt.'},
    ]],
    ['see', ['eua-bits', 'eua-formate', 'infra-wlan', 'infra-pki']],
  ],
});
