// OSI Referenzmodell - Schicht 1-7 (Erweitert)
(function() {
  const page = {
    id: 'infra-osi', block: 'infra', titel: 'OSI-Referenzmodell',
    definition: 'Das OSI-Modell definiert 7 Schichten der Netzwerkkommunikation von physikalisch bis Anwendung. Jede Schicht kapselt die darunter liegende und bietet Dienste der darueber liegenden. Es ist ein Referenzmodell - TCP/IP ist die praktische Umsetzung.',
    merksatz: 'PST ADN (Physical, Session, Transport / Application, Data Link, Network) - oder: "Pleasse Do Not Touch Sensitive Data Network Admin"',
    abschnitte: [
      {typ: 'heading', text: 'Die 7 Schichten des OSI-Modells'},
      {typ: 'table-grid', headers: ['Schicht', 'Name (DE/EN)', 'Funktion', 'Beispiele'], 
       rows: [
        ['1', 'Physikalisch / Physical', 'Uebertragung von Bits', 'Kupferkabel, Glasfaser, WLAN'],
        ['2', 'Sicherung / Data Link', 'Frames, MAC-Adressen', 'Switches, Ethernet, VLAN'],
        ['3', 'Vermittlung / Network', 'IP-Routing, Pakete', 'Router, IP, ICMP (ping)'],
        ['4', 'Transport / Transport', 'End-to-End Verbindung', 'TCP, UDP, Ports'],
        ['5', 'Sitzung / Session', 'Verbindungskontrolle', 'Dialog-Verwaltung'],
        ['6', 'Darstellung / Presentation', 'Verschluesselung, Kompression', 'TLS, JPEG, ASCII'],
        ['7', 'Anwendung / Application', 'Benutzer-Dienste', 'HTTP, FTP, SMTP, DNS'],
      ]},
      {typ: 'heading', text: 'Kapselung (Encapsulation)'},
      {typ: 'text', inhalt: 'Jede Schicht fuegt einen Header hinzu: HTTP-Daten (L7) -> TCP-Segment (L4) -> IP-Paket (L3) -> Frame (L2) -> Bits (L1).'},
      {typ: 'heading', text: 'Praktische Bedeutung'},
      {typ: 'list', items: [
        'Schicht 1-2: Hardware, Netzwerkadministrator',
        'Schicht 3-4: Routing und Verkehr, Netzwerkteam',
        'Schicht 5-7: Anwendungen, Software-Entwickler',
      ]},
      {typ: 'heading', text: 'OSI vs TCP/IP'},
      {typ: 'procon', title: 'Vergleich OSI und TCP/IP Modell', items: [
        {label: 'OSI', isPro: false, points: ['7 Schichten (theoretisch)', 'Akademisch, zu komplex', 'Referenzmodell']},
        {label: 'TCP/IP', isPro: true, points: ['4-5 Schichten (praktisch)', 'Vereinfacht, de facto Standard', 'Internet Standard seit 1983']},
      ]},
      {typ: 'quiz', quizId: 'osi-quiz-1'},
    ]
  };
  AP2.store.register('infra-osi', page);
})();
