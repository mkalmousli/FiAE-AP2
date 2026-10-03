// IPv4 Subnetting - Erweiterte Grundlagen
(function() {
  const page = {
    id: 'infra-subnetting-grundlagen', block: 'infra', 
    titel: 'IPv4 Subnetting - Erweiterte Grundlagen',
    definition: 'Subnetting ist die logische Unterteilung eines IP-Netzwerks in mehrere kleinere Netzwerke (Subnetze) durch Verwendung von Subnetzmasken. Dies ermoglicht bessere Nutzung des Adressraums und Netzwerk-Segmentation. Eine Subnetzmaske bestimmt, welche Bits einer IP-Adresse das Netzwerk identifizieren und welche den Host.',
    merksatz: 'CIDR: IP/PraefixLaenge. /24 = 256 Adressen (1 Netz + 254 Hosts + 1 Broadcast). /25 = 128 Adressen.',
    abschnitte: [
      {typ: 'heading', text: 'Netzklassen (Klassisches Modell - veraltet, aber pruefungsrelevant)'},
      {typ: 'table-grid', headers: ['Klasse', 'Bereich', 'Maske', 'Netzwerk-Bits', 'Max Hosts'],
       rows: [
         ['A', '1-126.x.x.x', '/8 (255.0.0.0)', '8', '16.777.214'],
         ['B', '128-191.x.x.x', '/16 (255.255.0.0)', '16', '65.534'],
         ['C', '192-223.x.x.x', '/24 (255.255.255.0)', '24', '254'],
         ['D', '224-239.x.x.x', 'Multicast', '-', '-'],
         ['E', '240-255.x.x.x', 'Reserviert', '-', '-'],
      ]},
      {typ: 'heading', text: 'Private IP-Bereiche (RFC 1918)'},
      {typ: 'list', items: [
        '10.0.0.0/8: 10.0.0.0 bis 10.255.255.255 (16,7 Millionen Adressen)',
        '172.16.0.0/12: 172.16.0.0 bis 172.31.255.255 (1 Million Adressen)',
        '192.168.0.0/16: 192.168.0.0 bis 192.168.255.255 (65.536 Adressen)',
      ]},
      {typ: 'heading', text: 'Spezielle Adressen'},
      {typ: 'list', items: [
        'x.x.x.0: Netzadresse (Router vertreten von Netzwerk)',
        'x.x.x.255: Broadcast-Adresse (alle Hosts im Netzwerk)',
        '127.0.0.1: Loopback (Localhost, Testzwecke)',
        '0.0.0.0: Standardroute / nicht zugeordnete Adresse',
        '255.255.255.255: Limited Broadcast (alle Hosts, das ganze Netzwerk)',
      ]},
      {typ: 'heading', text: 'CIDR Notation'},
      {typ: 'text', inhalt: 'CIDR (Classless Inter-Domain Routing) gibt die Subnetzmaske als Anzahl der Netzwerk-Bits an: 192.168.1.0/24 bedeutet die ersten 24 Bits sind Netzwerk, die letzten 8 Bits sind Hosts.'},
      {typ: 'heading', text: 'Berechnung der Hostanzahl'},
      {typ: 'list', items: [
        'Formel: 2^(32-PraefixLaenge) - 2',
        '/24: 2^(32-24) - 2 = 2^8 - 2 = 256 - 2 = 254 Hosts',
        '/25: 2^(32-25) - 2 = 2^7 - 2 = 128 - 2 = 126 Hosts',
        '/26: 2^(32-26) - 2 = 2^6 - 2 = 64 - 2 = 62 Hosts',
        '/27: 2^(32-27) - 2 = 2^5 - 2 = 32 - 2 = 30 Hosts (kleine Netze)',
      ]},
      {typ: 'heading', text: 'Subnetzmaske in Dezimal'},
      {typ: 'list', items: [
        '/8 = 255.0.0.0',
        '/16 = 255.255.0.0',
        '/24 = 255.255.255.0',
        '/25 = 255.255.255.128',
        '/26 = 255.255.255.192',
        '/27 = 255.255.255.224',
        '/28 = 255.255.255.240',
        '/30 = 255.255.255.252 (nur 2 Hosts, used fuer Router-Verbindungen)',
        '/32 = 255.255.255.255 (host-Adresse, kein Netzwerk)',
      ]},
      {typ: 'heading', text: 'Praktisches Beispiel: 192.168.10.77/26'},
      {typ: 'list', items: [
        'Netzmaske: /26 bedeutet 64 Adressen (2^6)',
        'Netzadressen in /26: .0-.63, .64-.127, .128-.191, .192-.255',
        '192.168.10.77 liegt im Block .64-.127',
        'Netzadresse: 192.168.10.64',
        'Erste Hostadresse: 192.168.10.65',
        'Letzte Hostadresse: 192.168.10.126',
        'Broadcast: 192.168.10.127',
        'Verfuegbare Hosts: 62 (126 - 65 + 1)',
      ]},
      {typ: 'heading', text: 'Interaktiver Rechner'},
      {typ: 'tool', toolId: 'subnet-calc'},
      {typ: 'heading', text: 'Pruefung-Tipps'},
      {typ: 'list', items: [
        'Merke die Private IP Bereiche auswendig (10, 172.16, 192.168)',
        'Zaehle 0 und 255 nie als Host-Adressen',
        '/24 ist am wichtigsten (256 Adressen = 254 Hosts)',
        '/27 und /28 sind beliebt fuer kleine Netzwerke',
      ]},
      {typ: 'quiz', quizId: 'subnet-quiz-1'},
    ]
  };
  AP2.store.register('infra-subnetting-grundlagen', page);
})();
