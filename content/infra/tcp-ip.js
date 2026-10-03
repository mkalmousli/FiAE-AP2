// TCP/IP-Modell (4 Schichten)
(function() {
  const page = {
    id: 'infra-tcp-ip', block: 'infra', titel: 'TCP/IP-Modell',
    definition: 'Das TCP/IP-Modell vereinfacht das OSI-Modell auf 4 Schichten: Link, Internet, Transport, Application. Es ist das de facto Standard-Modell des Internets.',
    merksatz: 'LITA (Link, Internet, Transport, Application)',
    abschnitte: [
      {typ: 'text', inhalt: 'Das TCP/IP-Modell entstand parallel zum OSI-Modell und vereinfacht es auf 4 praktische Schichten.'},
      {typ: 'heading', text: 'Schichten Vergleich'},
      {typ: 'list', items: [
        'Link Layer = OSI 1-2 (Physical, Data Link)',
        'Internet Layer = OSI 3 (Network): IP, ICMP, IGP',
        'Transport Layer = OSI 4 (Transport): TCP, UDP',
        'Application Layer = OSI 5-7 (Session, Presentation, Application)',
      ]},
      {typ: 'heading', text: 'Wichtige Protokolle'},
      {typ: 'list', items: [
        'IP (IPv4, IPv6): Routing zwischen Netzen',
        'TCP: zuverlaessig, verbindungsorientiert',
        'UDP: schnell, verbindungslos',
        'HTTP/HTTPS: Web',
        'DNS: Namensaufloesing',
        'SMTP/POP3: E-Mail',
      ]},
    ]
  };
  AP2.store.register('infra-tcp-ip', page);
})();
