AP2.page('infra-tcpudp', {
  b: 'infra', g: 'Netzwerke', t: 'TCP und UDP, Ports',
  d: '**TCP** ist ein **verbindungsorientiertes, zuverlässiges** Transportprotokoll (Handshake, Quittungen, Wiederholung, richtige Reihenfolge). **UDP** ist **verbindungslos und ohne Garantie**, aber schnell. **Ports** (0 bis 65535) bestimmen auf einem Rechner, **welcher Dienst** die Daten bekommt. IP-Adresse plus Port ergibt einen **Socket**.',
  m: '**IP-Adresse = Hausadresse, Port = Wohnungsnummer.** TCP = **Einschreiben mit Rückschein** (sicher, langsamer). UDP = **Postkarte** (schnell, vielleicht verloren). TCP-Verbindungsaufbau: **SYN, SYN-ACK, ACK** (Drei-Wege-Handshake).',
  cheat: [
    ['TCP', ['Verbindungsorientiert', 'Zuverlässig: ACK, Wiederholung, Reihenfolge', 'Flusskontrolle (Window)', 'Header ab 20 Byte', 'HTTP, HTTPS, FTP, SMTP, SSH']],
    ['UDP', ['Verbindungslos', 'Keine Garantie, keine Reihenfolge', 'Sehr geringer Overhead (8 Byte Header)', 'DNS, DHCP, VoIP, Streaming, Spiele, NTP']],
    ['Portbereiche', ['**0 bis 1023:** Well-Known (Standarddienste)', '**1024 bis 49151:** Registered', '**49152 bis 65535:** dynamisch (Client)', 'Ein Port: 16 Bit']],
    ['Handshake', ['Client sendet **SYN**', 'Server antwortet **SYN-ACK**', 'Client bestätigt **ACK**', 'Abbau: **FIN** und **ACK** in beide Richtungen']],
  ],
  blocks: [
    ['h', 'Aufgabe der Transportschicht'],
    ['p', 'Die IP-Schicht bringt ein Paket von Rechner zu Rechner. Aber auf einem Rechner laufen **viele Programme gleichzeitig**: Browser, E-Mail, Chat. Die Transportschicht (Schicht 4) sorgt dafür, dass die Daten beim **richtigen Programm** ankommen. Dazu dienen **Portnummern**. Außerdem entscheidet sie, ob die Übertragung **zuverlässig** sein soll (TCP) oder **schnell** (UDP).'],
    ['h', 'Ports'],
    ['p', 'Ein **Port** ist eine 16-Bit-Zahl (0 bis 65535). Ein **Server-Dienst** wartet auf einem festen Port ("Standardport", zum Beispiel 443 für HTTPS). Der **Client** bekommt für jede Verbindung einen zufälligen hohen Port (zum Beispiel 51234). Eine Verbindung wird durch vier Werte eindeutig bestimmt: **Quell-IP, Quell-Port, Ziel-IP, Ziel-Port**.'],
    ['table', ['Bereich', 'Name', 'Verwendung'], [['0 bis 1023', 'Well-Known Ports', 'Standarddienste (HTTP 80, HTTPS 443, SSH 22)'], ['1024 bis 49151', 'Registered Ports', 'Registrierte Anwendungen (zum Beispiel MySQL 3306)'], ['49152 bis 65535', 'Dynamische / private Ports', 'Kurzzeitig vom Client für ausgehende Verbindungen genutzt']]],
    ['h', 'TCP: Der Drei-Wege-Handshake'],
    ['p', 'Bevor TCP Daten überträgt, bauen beide Seiten eine **Verbindung** auf. Dabei tauschen sie **Sequenznummern** aus, mit denen Daten später nummeriert und bestätigt werden.'],
    ['seq', {w: 700, actors: ['Client', 'Server'], cap: 'TCP-Verbindungsaufbau und -abbau', steps: [
      [0, 1, 'SYN (Verbindung gewünscht, seq=x)', 's'], [1, 0, 'SYN-ACK (einverstanden, seq=y, ack=x+1)', 'r'], [0, 1, 'ACK (ack=y+1)', 's'], ['sep', 'Verbindung steht, Daten werden übertragen'],
      [0, 1, 'Daten (seq=x+1)', 's'], [1, 0, 'ACK (ack=x+1+Länge)', 'r'], ['sep', 'Verbindungsabbau'], [0, 1, 'FIN', 's'], [1, 0, 'ACK', 'r'], [1, 0, 'FIN', 'r'], [0, 1, 'ACK', 's'],
    ]}],
    ['h3', 'Was macht TCP zuverlässig?'],
    ['list', ['**Quittungen (ACK):** Der Empfänger bestätigt, bis zu welchem Byte er alles erhalten hat.', '**Wiederholung:** Kommt keine Bestätigung (Timeout), sendet der Sender das Segment erneut.', '**Sequenznummern:** Segmente werden nummeriert und beim Empfänger **in die richtige Reihenfolge** gebracht. Duplikate werden erkannt.', '**Flusskontrolle:** Der Empfänger teilt mit einem **Fenster (Window)** mit, wie viele Daten er aufnehmen kann.', '**Überlastkontrolle:** Der Sender drosselt sich, wenn das Netz überlastet ist.']],
  ],
});
