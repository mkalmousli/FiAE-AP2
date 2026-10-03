// Projektmanagement Grundlagen
(function() {
  const page = {
    id: 'ps-projektmanagement', block: 'ps', titel: 'Projektmanagement Grundlagen',
    definition: 'Ein Projekt ist eine temporaere Organisationsform mit eindeutigem Ziel, befristeter Dauer und begrenzten Ressourcen. Projektphasen: Initiierung, Planung, Durchfuehrung, Abschluss. Grundmethoden: Netzplantechnik, Balkendiagramm, Meilensteine.',
    merksatz: 'IPDA: Initiierung, Planung, Durchfuehrung, Abschluss',
    abschnitte: [
      {typ: 'heading', text: 'Projektphasen'},
      {typ: 'list', items: [
        'Initiierung: Idee, Ziele, Stakeholder festlegen',
        'Planung: Zeit, Kosten, Ressourcen, Ablauf planen',
        'Durchfuehrung: Projektarbeit ausfuehren, Monitoring',
        'Abschluss: Pruefung, Uebergabe, Lessons Learned',
      ]},
      {typ: 'heading', text: 'Planungswerkzeuge'},
      {typ: 'list', items: [
        'Lastenheft: Was soll gemacht werden (Auftraggeber)',
        'Pflichtenheft: Wie soll es gemacht werden (Auftragnehmer)',
        'Netzplan: Abhaengigkeiten, Laufzeit, kritischer Pfad',
        'Gantt-Diagramm: zeitliche Darstellung der Vorgaenge',
      ]},
      {typ: 'text', inhalt: 'Aufwandsschaetzung: Function Points, Expertenschaetzung, historische Daten'},
    ]
  };
  AP2.store.register('ps-projektmanagement', page);
})();
