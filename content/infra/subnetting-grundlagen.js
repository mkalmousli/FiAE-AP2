// IPv4 Subnetting - Grundlagen
(function() {
  const page = {
    id: 'infra-subnetting-grundlagen', block: 'infra', 
    titel: 'IPv4 Subnetting - Grundlagen',
    definition: 'Subnetting ist die Aufteilung eines IP-Netzwerks in kleinere Subnetzwerke durch Verwendung von Subnetzmasken. Eine Subnetzmaske bestimmt, welche Bits der IP-Adresse das Netz und welche den Host identifizieren.',
    merksatz: 'CIDR: IP/PraefixLaenge (z.B. 192.168.0.0/24 bedeutet: erste 24 Bits = Netz, letzte 8 Bits = Hosts)',
    abschnitte: [
      {typ: 'heading', text: 'Netzklassen (klassisches Modell)'},
      {typ: 'list', items: [
        'Klasse A: 1-126.x.x.x, Maske /8, 16.7 Mio. Hosts',
        'Klasse B: 128-191.x.x.x, Maske /16, 65.534 Hosts',
        'Klasse C: 192-223.x.x.x, Maske /24, 254 Hosts',
        'Klasse D: 224-239.x.x.x, Multicast',
        'Klasse E: 240-255.x.x.x, reserviert',
      ]},
      {typ: 'heading', text: 'Private IP-Bereiche'},
      {typ: 'list', items: [
        '10.0.0.0/8 (10.0.0.0 - 10.255.255.255)',
        '172.16.0.0/12 (172.16.0.0 - 172.31.255.255)',
        '192.168.0.0/16 (192.168.0.0 - 192.168.255.255)',
      ]},
      {typ: 'text', inhalt: 'Spezielle Adressen: 127.0.0.1 (Loopback), 255.255.255.255 (Broadcast), x.x.x.0 (Netzadresse), x.x.x.255 (Broadcast)'},
      {typ: 'heading', text: 'Interaktiver Rechner'},
      {typ: 'tool', toolId: 'subnet-calc'},
    ]
  };
  AP2.store.register('infra-subnetting-grundlagen', page);
})();
