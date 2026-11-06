AP2.page('ps-orga', {
  b: 'ps', g: 'Projektmanagement', t: 'Projektorganisationsformen',
  d: 'Die **Projektorganisation** legt fest, wie das Projekt in die Firma eingebunden ist. Es gibt drei Grundformen: **Einfluss-Projektorganisation** (Linie), **Matrix-Projektorganisation** und **reine Projektorganisation**. Sie unterscheiden sich darin, wer den Mitarbeitern Weisungen geben darf und wie viel Macht der Projektleiter hat.',
  m: 'Wenig Macht, wenig Aufwand: **Einfluss/Linie** (Projektleiter berät nur). Geteilte Macht: **Matrix** (zwei Chefs). Volle Macht: **rein** (eigene Projekt-Abteilung auf Zeit).',
  cheat: [
    ['Einfluss-PO (Stab-Linie)', ['Projektleiter hat **keine Weisungsbefugnis**', 'Mitarbeiter bleiben in ihrer Abteilung', 'Geringer Organisationsaufwand', 'Projektleiter hat wenig Macht']],
    ['Matrix-PO', ['Mitarbeiter haben **zwei Vorgesetzte**: Fachabteilung und Projektleiter', 'Fachabteilung bestimmt **wie**, Projektleiter **was und wann**', 'Flexibel, aber Konfliktgefahr']],
    ['Reine PO', ['Projektleiter hat **volle Weisungsbefugnis**', 'Team wird aus Abteilungen herausgelöst', 'Schnell und fokussiert', 'Teuer, Wiedereingliederung nach Projektende']],
    ['Auswahl', ['Kleines Projekt: Einfluss-PO', 'Mehrere parallele Projekte: Matrix', 'Großes strategisches Projekt: rein']],
  ],
  blocks: [
    ['h', 'Die drei Formen im Überblick'],
    ['p', 'Stell dir eine Firma mit den Abteilungen Entwicklung, Test und Design vor. Ein Projekt braucht Leute aus allen drei. Die Frage ist: **Wer bestimmt, was diese Leute tun?** Davon hängt die Form ab.'],
    ['h3', '1. Einfluss-Projektorganisation (Stab-Linie)'],
    ['p', 'Die Firma bleibt, wie sie ist. Der Projektleiter ist eine **Stabsstelle** und koordiniert nur. Er darf **nichts anordnen**, sondern berät, sammelt Informationen und berichtet an die Geschäftsführung. Die Abteilungsleiter bleiben die Vorgesetzten und entscheiden, wer wann am Projekt arbeitet.'],
    ['diagram', {w: 720, h: 270, cap: 'Einfluss-Projektorganisation: Der Projektleiter (gestrichelt) koordiniert, aber die Linie bestimmt.', nodes: [
      {id: 'gf', x: 360, y: 36, t: 'Geschäftsführung', s: 'solid', k: 'round', w: 170, h: 40},
      {id: 'pl', x: 600, y: 36, t: 'Projektleiter (Stab)', s: 'ghost', k: 'round', w: 170, h: 40},
      {id: 'a1', x: 130, y: 130, t: 'Entwicklung', s: 'accent', k: 'round', w: 150, h: 40},
      {id: 'a2', x: 360, y: 130, t: 'Test', s: 'accent', k: 'round', w: 150, h: 40},
      {id: 'a3', x: 590, y: 130, t: 'Design', s: 'accent', k: 'round', w: 150, h: 40},
      {id: 'm1', x: 130, y: 222, t: 'Mitarbeiter', s: 'plain', k: 'round', w: 130, h: 36},
      {id: 'm2', x: 360, y: 222, t: 'Mitarbeiter', s: 'plain', k: 'round', w: 130, h: 36},
      {id: 'm3', x: 590, y: 222, t: 'Mitarbeiter', s: 'plain', k: 'round', w: 130, h: 36},
    ], edges: [
      {a: 'gf', b: 'a1', ea: 'none'}, {a: 'gf', b: 'a2', ea: 'none'}, {a: 'gf', b: 'a3', ea: 'none'}, {a: 'a1', b: 'm1', ea: 'none'}, {a: 'a2', b: 'm2', ea: 'none'}, {a: 'a3', b: 'm3', ea: 'none'},
      {a: 'gf', b: 'pl', ea: 'none'}, {a: 'pl', b: 'm1', k: 'dash', ea: 'open', via: [[690, 180], [215, 180]]},
    ]}],
    ['procon', 'Einfluss-Projektorganisation', ['Schnell eingerichtet, kaum Umstellung', 'Keine Konflikte um Weisungen', 'Gut für kleine, kurze Projekte'], ['Projektleiter hat wenig Durchsetzungskraft', 'Verantwortung unklar', 'Abteilungsinteressen gehen oft vor Projektinteressen']],
  ],
});

AP2.add('ps-orga', [
  [
    "h",
    "Verantwortung mit RACI klären"
  ],
  [
    "p",
    "RACI ordnet Aufgaben Rollen zu. Responsible führt aus. Accountable trägt die Ergebnisverantwortung. Consulted wird fachlich einbezogen. Informed erhält Informationen. Die Schreibweise ersetzt keine vereinbarte Entscheidungsbefugnis."
  ],
  [
    "table",
    [
      "Aufgabe",
      "Projektleitung",
      "Entwicklung",
      "Fachseite",
      "Betrieb"
    ],
    [
      [
        "Anforderungen freigeben",
        "C",
        "C",
        "A/R",
        "I"
      ],
      [
        "Schnittstelle entwickeln",
        "A",
        "R",
        "C",
        "C"
      ],
      [
        "Betriebsübergabe bestätigen",
        "C",
        "C",
        "I",
        "A/R"
      ]
    ]
  ],
  [
    "p",
    "Für diese Tabelle gilt: Jede Aufgabe hat genau eine accountable Rolle. Mehrere responsible Rollen sind möglich, müssen aber koordiniert werden. A/R bedeutet, dass eine Rolle beide Aufgaben übernimmt."
  ],
  [
    "h",
    "Ressourcenkonflikt in der Matrixorganisation"
  ],
  [
    "p",
    "Eine Entwicklerin ist zu 60 Prozent im Projekt eingeplant. Die Linienleitung verlangt gleichzeitig eine dringende Wartung. Die Projektleitung und Linienleitung müssen die Priorität gemeinsam klären. Eine stille Doppelplanung führt zu unrealistischen Terminen."
  ],
  [
    "qa",
    "**Beschreiben** Sie vier Schritte zur Lösung dieses Kapazitätskonflikts.",
    [
      "- Tatsächlich verfügbare Stunden und beide Aufgaben erfassen.",
      "- Auswirkungen auf Betrieb und Projekttermin bewerten.",
      "- Priorität mit entscheidungsbefugten Rollen verbindlich klären.",
      "- Kapazitätsplan und betroffene Termine aktualisieren und mitteilen.",
      "Je passendem Schritt 1 Punkt."
    ],
    4
  ],
  [
    "quiz",
    [
      {
        "q": "Welche RACI-Rolle führt eine Aufgabe aus?",
        "o": [
          "Responsible",
          "Informed",
          "Consulted",
          "Keine Rolle"
        ],
        "a": 0,
        "e": "Accountable trägt die Ergebnisverantwortung. Responsible arbeitet an der Aufgabe."
      }
    ]
  ],
  [
    "see",
    [
      "ps-stakeholder",
      "ps-aufwand",
      "ps-aenderungen"
    ]
  ]
]);
