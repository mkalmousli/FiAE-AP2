// OSI Referenzmodell - Schicht 1-7
(function() {
  const page = {
    id: 'infra-osi', block: 'infra', titel: 'OSI-Referenzmodell',
    definition: 'Das OSI-Modell definiert 7 Schichten der Netzwerkkommunikation von physikalisch bis Anwendung. Jede Schicht hat spezifische Funktionen und Protokolle.',
    merksatz: 'PST ADN (Physical, Session, Transport / Application, Data Link, Network) oder: "Please Do Not Teach Salesmen Pasta Acronyms"',
    abschnitte: [
      {typ: 'heading', text: 'Die 7 Schichten'},
      {typ: 'list', items: [
        '1. Physikalisch: Kupfer, Glasfaser, Funkwellen',
        '2. Sicherung (Data Link): MAC-Adressen, Frames, Switches',
        '3. Vermittlung (Network): IP-Adressen, Routing, Router',
        '4. Transport: TCP, UDP, Ports',
        '5. Sitzung (Session): Verbindungskontrolle',
        '6. Darstellung (Presentation): Verschluesselung, Kompression',
        '7. Anwendung (Application): HTTP, FTP, SMTP, DNS',
      ]},
      {typ: 'text', inhalt: 'Die Schichten arbeiten nach dem Prinzip der Kapselung: jede Schicht fuegt ihren Header hinzu.'},
      {typ: 'heading', text: 'Beispiel Nachrichtenfluss'},
      {typ: 'text', inhalt: 'HTTP-Anfrage (Schicht 7) -> TCP-Segment (4) -> IP-Paket (3) -> Frame (2) -> Bits (1) -> Uebertragung'},
    ]
  };
  AP2.store.register('infra-osi', page);
})();
