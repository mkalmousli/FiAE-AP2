// Arbeitsrecht Grundlagen
(function() {
  const page = {
    id: 'wiso-arbeitsrecht-basics', block: 'wiso', titel: 'Arbeitsrecht Grundlagen',
    definition: 'Arbeitsrecht regelt die Beziehung zwischen Arbeitgeber und Arbeitnehmer. Zentrale Aspekte sind Arbeitsvertrag, Arbeitszeitgesetz, Kuendigung und Urlaubsanspruch.',
    merksatz: 'VAK: Vertrag, Arbeitszeit, Kuendigung',
    abschnitte: [
      {typ: 'heading', text: 'Arbeitsvertrag'},
      {typ: 'text', inhalt: 'Schriftlicher Vertrag zwischen AG und AN mit Pflichten, Rechten, Verguetung, Arbeitszeit, Probezeit (meist 6 Monate, maximal 3 Monate nach Beendigung).'},
      {typ: 'heading', text: 'Kuendigung'},
      {typ: 'list', items: [
        'Probezeit: 2 Wochen Kuendigung',
        'Nach Probezeit: 4 Wochen zum 15. oder Ende eines Kalendermonats',
        'Betriebsbedingte: ordentlich gekuendigt wenn Betrieb schliesst',
        'Verhaltensbezogene: wegen Pflichtverletzung',
      ]},
      {typ: 'heading', text: 'Urlaubsanspruch'},
      {typ: 'text', inhalt: 'Mindestens 20 Arbeitstage (4 Wochen) im Jahr nach BUrlG. Arbeitgeber kann Urlaubsplanung festlegen.'},
    ]
  };
  AP2.store.register('wiso-arbeitsrecht-basics', page);
})();
