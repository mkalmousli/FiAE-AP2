// Ports und Protokolle
(function() {
  const page = {
    id: 'infra-ports-protokolle', block: 'infra', titel: 'Ports und Protokolle',
    definition: 'Ports sind logische Verbindungspunkte auf Schicht 4 (Transport). TCP/UDP verwenden Ports (0-65535) um mehrere Dienste auf einem System zu unterscheiden. Well-known Ports (0-1023) sind reserviert fuer Standard-Dienste.',
    merksatz: 'HTTP=80, HTTPS=443, FTP=21, SSH=22, DNS=53, SMTP=25, POP3=110',
    abschnitte: [
      {typ: 'heading', text: 'Wichtige Protokolle und Ports'},
      {typ: 'list', items: [
        'HTTP/80: unverschluesseltes Web',
        'HTTPS/443: verschluesseltes Web (TLS)',
        'FTP/21: Datei-Transfer',
        'SSH/22: sichere Fernverbindung',
        'Telnet/23: unsichere Fernverbindung (veraltet)',
        'DNS/53: Namensaufloesing',
        'SMTP/25: E-Mail Versand',
        'POP3/110: E-Mail Abruf (veraltet)',
        'IMAP/143: E-Mail Abruf (modern)',
      ]},
      {typ: 'heading', text: 'TCP vs UDP'},
      {typ: 'list', items: [
        'TCP: zuverlässig, verbindungsorientiert, langsamer (HTTP)',
        'UDP: schnell, verbindungslos, Datenverlust möglich (DNS, Video)',
      ]},
    ]
  };
  AP2.store.register('infra-ports-protokolle', page);
})();
