AP2.page('infra-industrie40', {
  b: 'infra', g: 'IT-Systeme und Rechnen', t: 'Industrie 4.0, IoT, Smart Grid und cyber-physische Systeme',
  d: '**Industrie 4.0** bezeichnet die **vierte industrielle Revolution**: Die Produktion wird mit moderner Informations- und Kommunikationstechnik verzahnt. Grundlage sind **cyber-physische Systeme (CPS)**, also intelligente, **digital vernetzte** Systeme, die über **Sensoren** die physische Welt erfassen, Daten verarbeiten und über **Aktoren** auf sie einwirken. Ziel ist eine weitgehend **selbstorganisierte**, flexible Produktion. Das **Internet der Dinge (IoT)** vernetzt Alltagsgegenstände, das **IIoT** Maschinen und Anlagen.',
  m: 'Revolutionen: **1 Dampf, 2 Fließband und Elektrizität, 3 Elektronik und Automatisierung, 4 Vernetzung (CPS)**. CPS-Kreislauf: **Sensor misst, Rechner entscheidet, Aktor handelt, Umwelt reagiert.** **IIoT ist eine Sonderform des IoT, nicht umgekehrt.**',
  cheat: [
    ['Begriffe', ['**CPS:** physische Komponenten + Software + Vernetzung', '**IoT:** Gegenstände stellen Zustandsdaten im Netz bereit (Drucker meldet Tonerstand)', '**IIoT:** IoT in der Industrie (Maschinen, Anlagen)', '**Smart Grid:** intelligentes Stromnetz, das Erzeugung, Speicher und Verbrauch steuert', '**Digitaler Zwilling:** virtuelles Abbild einer realen Anlage']],
    ['Anwendungen', ['Predictive Maintenance (vorausschauende Wartung)', 'Losgröße 1 (individuelle Produkte in Serie)', 'Fahrerlose Transportsysteme', 'Smart Home, Smart City', 'Ausgleich schwankender erneuerbarer Energie im Smart Grid']],
    ['Protokolle', ['**HTTP/REST:** weit verbreitet, erprobt, aber Overhead, kein echtes Push', '**MQTT:** Publish/Subscribe über Broker, wenig Overhead, skalierbar, QoS-Stufen; geringer Funktionsumfang', '**OPC UA:** Industriestandard für Maschinendaten', 'Funk: LoRaWAN, Zigbee, NB-IoT, 5G']],
    ['Risiken', ['Angriffsfläche durch vernetzte Maschinen', 'Alte Steuerungen ohne Sicherheitsupdates', 'Datenschutz bei Sensordaten', 'Abhängigkeit von Netz und Cloud']],
  ],
  blocks: [
    ['h', 'Die vier industriellen Revolutionen'],
    ['diagram', AP2.dg.flow(['1.0 Mechanisierung (Dampfmaschine, ab 1784)', '2.0 Massenfertigung (Fließband, Elektrizität, ab 1870)', '3.0 Automatisierung (Elektronik, SPS, IT, ab 1969)', '4.0 Vernetzung (CPS, IoT, KI, heute)'], {w: 780, h: 110, styles: ['plain', 'soft', 'accent', 'solid'], cap: 'Industrie 4.0 ist die vierte, nicht die dritte industrielle Revolution.'})],
    ['h', 'Aufbau eines cyber-physischen Systems'],
    ['diagram', {w: 720, h: 330, cap: 'Regelkreis eines CPS: Sensoren erfassen die Umwelt, das Informationsverarbeitungssystem entscheidet, Aktoren wirken auf die Umwelt. Über das Netz tauschen CPS Daten untereinander aus.', nodes: [
      {id: 'u', x: 360, y: 290, w: 260, h: 50, k: 'oval', s: 'ok', t: 'Umwelt (physischer Prozess)'},
      {id: 's', x: 120, y: 160, k: 'round', s: 'accent', t: ['Sensor', '(Temperatur, Druck, Kamera)'], w: 190, h: 60},
      {id: 'i', x: 360, y: 50, k: 'round', s: 'solid', t: ['Informationsverarbeitungssystem', '(Mikrocontroller, Software)'], w: 270, h: 60},
      {id: 'a', x: 600, y: 160, k: 'round', s: 'accent', t: ['Aktor', '(Motor, Ventil, Relais)'], w: 190, h: 60},
      {id: 'n', x: 620, y: 40, k: 'oval', s: 'soft', t: ['Netz,', 'andere CPS'], w: 110, h: 50},
    ], edges: [{a: 'u', b: 's', t: 'messen'}, {a: 's', b: 'i', t: 'Daten'}, {a: 'i', b: 'a', t: 'Steuerbefehl'}, {a: 'a', b: 'u', t: 'einwirken'}, {a: 'i', b: 'n', k: 'dash', sa: 'arrow'}]}],
    ['p', 'Beispiel **Smart Grid**: Sensoren messen Erzeugung (Windpark, Solar) und Verbrauch, die Leitstelle berechnet Prognosen, Aktoren schalten Speicher, Wärmepumpen oder Ladesäulen zu oder ab. Das ist nötig, weil erneuerbare Energien **schwankend** erzeugt werden. Ein Smart Grid ist damit eine spezielle Form des Internets der Dinge.'],
    ['h', 'HTTP oder MQTT für IoT-Geräte?'],
    ['table', ['', 'HTTP (REST)', 'MQTT'], [
      ['Prinzip', 'Request/Response, Client fragt Server', 'Publish/Subscribe über einen **Broker**'],
      ['Vorteile', 'Weit verbreitet, erprobt, einfach zu handhaben, Firewalls kennen es', '**Wenig Overhead**, skalierbar, Push sofort an alle Abonnenten, QoS 0/1/2, gut bei schwacher Verbindung'],
      ['Nachteile', '**Overhead** (Header), kein echtes Push (außer HTTP/2, WebSocket), Polling kostet Energie', 'Request/Response nur mit Zusatzaufwand, **geringerer Funktionsumfang**, Broker als zentrale Komponente'],
    ], {first: true}],
    ['h', 'Sensordaten auswerten: ein typischer Prüfungsalgorithmus'],
    ['p', 'Ein Temperatursensor wird alle 5 Sekunden abgefragt. Nach einer festen Zahl von Messungen sollen **Maximum, Minimum und Durchschnitt** ausgegeben werden. Der Kern ist immer derselbe: Startwerte setzen, in der Schleife vergleichen und aufsummieren, am Ende teilen.'],
    ['codes', [
      ['cpp', `#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

int main() {
    const long ANZAHL = 100000;
    float t = dht.readTemperature();
    float max = t, min = t, summe = t;     // erste Messung als Startwert
    for (long i = 1; i < ANZAHL; i++) {
        delay(5000);                        // 5 Sekunden warten
        t = dht.readTemperature();
        if (t > max) max = t;
        if (t < min) min = t;
        summe += t;
    }
    print_screen("Max: ");  print_screen(max);
    print_screen("Min: ");  print_screen(min);
    print_screen("Mittel: "); print_screen(summe / ANZAHL);
    return 0;
}`],
      ['pseudo', `messwert := leseTemperatur()
max := messwert, min := messwert, summe := messwert
FÜR i := 2 BIS 100000
    warte(5000)
    messwert := leseTemperatur()
    FALLS messwert > max DANN max := messwert
    FALLS messwert < min DANN min := messwert
    summe := summe + messwert
ENDE FÜR
AUSGABE max, min, summe / 100000`],
    ]],
    ['tip', 'Startwerte **nicht** mit 0 initialisieren: Bei Minustemperaturen wäre das Maximum falsch, bei positiven das Minimum. Am sichersten ist der **erste Messwert** als Startwert.'],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Korrigieren Sie: "Der Begriff Industrie 4.0 steht für die dritte industrielle Revolution. Die Produktion soll mit Informations- und Kommunikationstechnik verzahnt werden. Grundlage sind intelligente und analog vernetzte Systeme, mit deren Hilfe die selbstorganisierte Produktion ausgeschlossen werden soll."', ['- **vierte** statt dritte industrielle Revolution', '- **digital** statt analog vernetzte Systeme', '- die selbstorganisierte Produktion soll **ermöglicht** statt ausgeschlossen werden'], 3],
    ['qa', 'Definieren Sie ein cyber-physisches System und nennen Sie seine vier Grundelemente.', 'Ein **cyber-physisches System** verbindet physische, mechanische oder elektronische Komponenten über Software und **Netzwerke** zu einem System, das die reale Welt erfasst und beeinflusst. Grundelemente: **Sensor** (erfasst Messwerte aus der Umwelt), **Informationsverarbeitungssystem** (wertet aus und entscheidet), **Aktor** (wirkt auf die Umwelt ein) und die **Umwelt** (physischer Prozess), dazu die Vernetzung mit anderen Systemen.', 4],
    ['qa', 'Nennen Sie je zwei Vor- und Nachteile von HTTP und MQTT im IoT.', ['- **HTTP Vorteile:** weit verbreitet; erprobt und einfach. **Nachteile:** großer Overhead; kein Push, Geräte müssen pollen.', '- **MQTT Vorteile:** wenig Overhead, energiesparend; skalierbar durch Broker, Push an viele Abonnenten. **Nachteile:** Request/Response nur mit Zusatzaufwand; geringerer Funktionsumfang, Broker ist zentraler Ausfallpunkt.'], 4],
    ['see', ['infra-mqtt', 'eua-iot', 'eua-knn', 'infra-schwachstellen']],
    ['quiz', [
      {q: 'Für welche industrielle Revolution steht Industrie 4.0?', o: ['Die vierte', 'Die dritte', 'Die zweite', 'Die erste'], a: 0, e: '4.0 = Vernetzung durch cyber-physische Systeme.'},
      {q: 'Welche Aussage stimmt?', o: ['Das IIoT ist eine Sonderform des IoT', 'Das IoT ist eine Sonderform des IIoT', 'IoT und Industrie 4.0 bedeuten dasselbe', 'IoT funktioniert nur ohne Netz'], a: 0, e: 'Das industrielle IoT ist ein Teilbereich des Internets der Dinge.'},
      {q: 'Welche Komponente eines CPS wirkt auf die Umwelt ein?', o: ['Aktor', 'Sensor', 'Datenbank', 'Broker'], a: 0, e: 'Sensoren messen, Aktoren handeln.'},
      {q: 'Wozu dient ein Smart Grid?', o: ['Erzeugung, Speicherung und Verbrauch von Strom intelligent abzustimmen', 'Atomkraftwerke zu verbinden', 'WLAN in Fabriken bereitzustellen', 'Daten zu verschlüsseln'], a: 0, e: 'Wichtig für schwankende erneuerbare Energien.'},
      {q: 'Welcher Vorteil gilt für MQTT gegenüber HTTP?', o: ['Wenig Overhead und Push an viele Abonnenten', 'Mehr Funktionsumfang', 'Kein Broker nötig', 'Request/Response eingebaut'], a: 0, e: 'Publish/Subscribe über einen Broker, sehr schlanke Pakete.'},
      {q: 'Was ist Predictive Maintenance?', o: ['Wartung auf Basis von Sensordaten, bevor ein Ausfall eintritt', 'Wartung nach dem Ausfall', 'Wartung in festen Zeitabständen ohne Daten', 'Verzicht auf Wartung'], a: 0, e: 'Vorausschauende Wartung senkt Stillstandszeiten.'},
    ]],
  ],
});
