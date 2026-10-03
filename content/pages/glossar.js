// Glossar: wichtige Begriffe
(function() {
  const glossar = {
    id: 'glossar', block: 'reference', titel: 'Glossar A-Z',
    definition: 'Sammlung wichtiger Fachbegriffe und ihrer Definitionen. Nützlich zum schnellen Nachschlagen während der Prüfung.',
    abschnitte: [
      {typ: 'heading', text: 'Netzwerk'},
      {typ: 'list', items: [
        'CIDR: Klassenloses Adressierung (IP/Bitanzahl)',
        'DNS: Domain Name System, übersetzt Namen in IPs',
        'IP: Internet Protocol, eindeutige Adresse im Netz',
        'MAC: Media Access Control, Hardware-Adresse',
        'VLAN: Virtuelles LAN, logische Netzwerk-Partitionierung',
      ]},
      {typ: 'heading', text: 'Entwicklung'},
      {typ: 'list', items: [
        'API: Application Programming Interface, Schnittstelle',
        'DB: Datenbank, strukturierter Datenspeicher',
        'Framework: Gerüst für Anwendungsentwicklung',
        'OOP: Objektorientierte Programmierung',
        'SQL: Datenbankabfrage-Sprache',
      ]},
      {typ: 'heading', text: 'Projekt'},
      {typ: 'list', items: [
        'Gantt: zeitliches Balkendiagramm',
        'Meilenstein: wichtiger Punkt im Projekt',
        'Netzplan: Abhängigkeitsdiagramm mit Dauer',
        'Scope: Umfang eines Projekts',
      ]},
    ]
  };
  AP2.store.register('glossar', glossar);
})();
