// Projektmanagement Grundlagen - Erweitert
(function() {
  const page = {
    id: 'ps-projektmanagement', block: 'ps', titel: 'Projektmanagement Grundlagen',
    definition: 'Ein Projekt ist eine zeitlich befristete Organisationseinheit mit eindeutigem Ziel, definierten Ressourcen, geplanter Dauer und einmaligem Charakter. Projektmanagement umfasst Planung, Execution und Monitoring mit Fokus auf Zeit, Kosten und Qualitaet.',
    merksatz: 'IPDA + TKQ: Initiierung, Planung, Durchfuehrung, Abschluss + Zeit, Kosten, Qualitaet',
    abschnitte: [
      {typ: 'heading', text: 'Die 4 Projektphasen'},
      {typ: 'table-grid', headers: ['Phase', 'Aktivitaeten', 'Output', 'Risiken'],
       rows: [
         ['Initiierung', 'Ziele definieren, Stakeholder identifizieren, Business Case erstellen', 'Projektauftrag, Zieldefinition', 'Falsche Ziele, fehlende Stakeholder'],
         ['Planung', 'Scope, Zeit, Kosten planen, Ressourcen zuordnen', 'Projektplan, Netzplan, Budget', 'Unrealistische Schaetzungen'],
         ['Durchfuehrung', 'Projektarbeit ausfuehren, Qualitaet pruefen', 'Ergebnisse, Zwischenstaende', 'Verzoegerungen, Kostenueberlaeufe'],
         ['Abschluss', 'Uebergabe, Lessons Learned, Projektabrechnung', 'Projekt-Review, Abschlussbericht', 'Unvollstaendige Uebergabe'],
      ]},
      {typ: 'heading', text: 'Magisches Dreieck: Zeit - Kosten - Qualitaet'},
      {typ: 'text', inhalt: 'Dies sind die drei Schluesseldimensionen eines Projekts. Sie stehen oft in Konflikt: weniger Zeit oder Kosten gefaehrden Qualitaet. Manager muessen Prioritaeten setzen und Trade-offs akzeptieren.'},
      {typ: 'heading', text: 'Plannungswerkzeuge'},
      {typ: 'list', items: [
        'Lastenheft (Pflichtenheft Auftraggeber): Was soll geloeost werden (Anforderungen)',
        'Pflichtenheft (Auftragnehmer): Wie wird es geloeost (Loesung)',
        'Netzplan (CPM): Abhaengigkeiten zwischen Vorgaengen, kritischer Pfad',
        'Gantt-Diagramm: Zeitliche Darstellung (Balkendiagramm)',
        'Meilensteinplan: Wichtige Kontrollpunkte',
      ]},
      {typ: 'heading', text: 'Aufwandsschaetzung (Sizing)'},
      {typ: 'list', items: [
        'Expertenschaetzung: Erfahrung nutzen, einfach aber unreliabel',
        'Analogschlaetzung: Aehnliche Projekte vergleichen',
        'Function Points: Softwarekomplexitaet messen (detailliert)',
        'Bottom-up: Aufgaben detaillieren und addieren',
        'Top-down: Gesamt-Budget auf Phasen verteilen',
      ]},
      {typ: 'heading', text: 'Projektorganisationsformen'},
      {typ: 'procon', title: 'Reine Projektorganisation vs Matrixorganisation', items: [
        {label: 'Rein', isPro: true, points: ['Klare Verantwortung', 'Schnelle Entscheidungen', 'Ressourcen gebuendelt']},
        {label: 'Matrix', isPro: false, points: ['Fachliche Kontinuitaet', 'Ressourcen-Effizienz', 'Komplexe Konflikte']},
      ]},
      {typ: 'heading', text: 'Kosten-Nutzen-Analyse'},
      {typ: 'list', items: [
        'ROI (Return on Investment) = (Nutzen - Kosten) / Kosten * 100%',
        'Amortisationsdauer: Wann ist Projekt break-even?',
        'Beispiel: Projekt kostet 100k, spart 30k/Jahr -> 3,3 Jahre ROI',
      ]},
      {typ: 'quiz', quizId: 'pm-quiz-1'},
    ]
  };
  AP2.store.register('ps-projektmanagement', page);
})();
