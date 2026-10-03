// Wirtschaft Grundlagen: Markt, Angebot, Nachfrage
(function() {
  const page = {
    id: 'wiso-wirtschaft-grundlagen', block: 'wiso', titel: 'Wirtschaftliche Grundlagen',
    definition: 'Die Marktwirtschaft funktioniert durch Angebot und Nachfrage. Der Preis reguliert die Menge (wenn Nachfrage groesser als Angebot, steigt Preis). Marktformen sind Monopol, Oligopol, Polypol.',
    merksatz: 'Angebot + Nachfrage = Markt. Viel Angebot, wenig Nachfrage = Preis sinkt.',
    abschnitte: [
      {typ: 'heading', text: 'Marktformen'},
      {typ: 'list', items: [
        'Monopol: ein Anbieter (z.B. Bahnstrom)',
        'Oligopol: wenige Anbieter (z.B. Autos, Telekommunikation)',
        'Polypol: viele Anbieter (z.B. Baekerein)',
      ]},
      {typ: 'heading', text: 'Konjunktur'},
      {typ: 'list', items: [
        'Expansion: Wirtschaft waechst, mehr Beschaeftigung',
        'Rezession: Wirtschaft faellt (2 Quartal im Minuswachstum)',
        'Inflation: Preise steigen, Kaufkraft sinkt',
        'Deflation: Preise sinken (selten, problematisch)',
      ]},
      {typ: 'heading', text: 'Unternehmensformen'},
      {typ: 'list', items: [
        'Einzelunternehmen: eine Person haftet mit Privatvermoegen',
        'GmbH: begrenzte Haftung, mindestens 25k Stammkapital',
        'AG: Aktiengesellschaft, Aktionaere (Teilhaber)',
      ]},
    ]
  };
  AP2.store.register('wiso-wirtschaft-grundlagen', page);
})();
