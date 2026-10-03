// Home page
(function() {
  const home = {
    id: 'home', block: 'start', titel: 'Startseite',
    definition: 'Willkommen zur umfassenden Lernressource fuer die AP2 Fachinfomatiker Anwendungsentwicklung Pruefung',
    merksatz: 'AP2 = 5 Bloecke: Planen (1), Infrastruktur (2), Entwicklung (3), WiSo (4), Deutsch (5)',
    abschnitte: [
      {typ: 'text', inhalt: 'Diese Lernplattform bedeckt alle Inhalte der AP2 Teil 2 Pruefung fuer Fachinformatiker Anwendungsentwicklung der IHK Baden-Wuerttemberg Goeppingen (Winter 2026).'},
      {typ: 'text', inhalt: 'Die Lernressource ist offline nutzbar und in reinem JavaScript/HTML/CSS implementiert - keine Abhaengigkeiten, keine Serverbindung noetig.'},
      {typ: 'heading', text: 'Pruefungsstruktur'},
      {typ: 'list', items: [
        'Block 1 (10%): Planen eines Softwareproduktes (PM, UML, Datenmodellierung)',
        'Block 2 (erweitert 2025): Infrastruktur & IT-Sicherheit (Netzwerk, Storage, Sicherheit)',
        'Block 3 (10%): Entwicklung und Umsetzung von Algorithmen (Code, SQL, Datenstrukturen)',
        'Block 4 (10%): Wirtschafts- und Sozialkunde (Multiple-Choice)',
        'Block 5 (Berufsschule): Deutsch (Textformenanalyse, Kommunikation)',
      ]},
      {typ: 'heading', text: 'Wie nutze ich diese Seite?'},
      {typ: 'list', items: [
        'Oeffne ein Thema in der Sidebar oder ueber die Suchfunktion',
        'Lese die Definition und Merkhilfe - diese sind Prueflingstaugliche Erklaerungen',
        'Erkunde die interaktiven Werkzeuge und Visualisierungen',
        'Loes die Selbsttests und Quiz um dein Verstaendnis zu pruefen',
        'Markiere Themen als erledigt - dein Fortschritt wird in localStorage gespeichert',
      ]},
    ]
  };
  AP2.store.register('home', home);
})();
