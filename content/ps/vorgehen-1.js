AP2.page('ps-vorgehen', {
  b: 'ps', g: 'Projektmanagement', t: 'Vorgehensmodelle (Wasserfall, V-Modell, agil)',
  d: 'Ein **Vorgehensmodell** legt fest, in welcher Reihenfolge und mit welchen Regeln ein Softwareprojekt abläuft. **Klassische Modelle** (Wasserfall, V-Modell) arbeiten Phase für Phase nacheinander. **Agile Ansätze liefern früh nutzbare Ergebnisse. Scrum verwendet Sprints. Kanban steuert den Arbeitsfluss ohne zwingende Sprints.',
  m: '**Wasserfall** = geplanter Ablauf in Phasen; Rücksprünge benötigen bewusste Überarbeitung. **V-Modell** = jede Entwurfsstufe hat links ihre Teststufe rechts. **Agil** = kleine Schritte, oft liefern, oft Feedback.',
  cheat: [
    ['Wasserfall', ['Phasen strikt nacheinander', 'Gut bei festen, klaren Anforderungen', 'Änderungen spät sehr teuer', 'Kunde sieht Ergebnis erst am Ende']],
    ['V-Modell', ['Wasserfall + Testzuordnung', 'Entwurf links, Tests rechts', 'Jede Teststufe prüft eine Entwurfsstufe', 'Üblich bei Behörden und sicherheitskritischer Software']],
    ['Agil', ['Iterativ und inkrementell', 'Anforderungen dürfen sich ändern', 'Regelmäßiges Kundenfeedback', 'Bedarfsgerechte Dokumentation und enge Zusammenarbeit']],
    ['Wann welches Modell?', ['Anforderungen stabil: klassisch', 'Anforderungen unklar: agil', 'Festpreis und Vertrag: eher klassisch', 'Neues Produkt, Markt unsicher: agil']],
  ],
  blocks: [
    ['h', 'Warum braucht man Vorgehensmodelle?'],
    ['p', 'Software zu bauen ist komplex. Ohne Regeln arbeiten alle durcheinander, wichtige Schritte (zum Beispiel Tests) werden vergessen und niemand weiß, wie weit das Projekt ist. Ein Vorgehensmodell ist wie ein **Bauplan für den Ablauf**: Es sagt, welche Schritte es gibt und in welcher Reihenfolge sie passieren.'],
    ['h', 'Wasserfallmodell'],
    ['p', 'Das Wasserfallmodell ist das einfachste Modell. Jede Phase muss **komplett fertig** sein, bevor die nächste beginnt. Man geht nicht (oder nur sehr schwer) zurück. Daher der Name: Wasser fließt nur nach unten.'],
    ['diagram', {w: 720, h: 330, cap: 'Wasserfallmodell: Jede Phase beginnt erst, wenn die vorherige abgeschlossen ist.', nodes: [
      {id: 'a', x: 100, y: 34, t: 'Anforderungen', w: 160, h: 40, s: 'accent', k: 'round'},
      {id: 'b', x: 240, y: 96, t: 'Entwurf', w: 160, h: 40, s: 'accent', k: 'round'},
      {id: 'c', x: 380, y: 158, t: 'Implementierung', w: 160, h: 40, s: 'accent', k: 'round'},
      {id: 'd', x: 520, y: 220, t: 'Test', w: 160, h: 40, s: 'accent', k: 'round'},
      {id: 'e', x: 620, y: 282, t: 'Betrieb und Wartung', w: 190, h: 40, s: 'solid', k: 'round'},
    ], edges: [{a: 'a', b: 'b'}, {a: 'b', b: 'c'}, {a: 'c', b: 'd'}, {a: 'd', b: 'e'}]}],
    ['procon', 'Wasserfallmodell bewerten', ['Einfach zu verstehen und zu planen', 'Klare Phasen und Dokumente, gute Nachvollziehbarkeit', 'Gut bei stabilen Anforderungen und festem Budget'], ['Änderungswünsche sind spät sehr teuer', 'Kunde sieht erst am Ende ein Ergebnis', 'Fehler in der Anforderungsphase fallen oft erst beim Test auf']],
  ],
});

AP2.add('ps-vorgehen', [
  [
    "h",
    "Modellwahl anhand konkreter Risiken"
  ],
  [
    "table",
    [
      "Situation",
      "Passender Ansatz",
      "Begründung"
    ],
    [
      [
        "Fachlicher Ablauf ist unbekannt",
        "Prototyp und kurze Feedbackzyklen",
        "Missverständnisse früh sichtbar machen"
      ],
      [
        "Feste Prüfnachweise erforderlich",
        "Vorgehen mit früher Testplanung und Nachverfolgung",
        "Jede Anforderung erhält passende Nachweise"
      ],
      [
        "Riskante Fremdschnittstelle",
        "Früher technischer Integrationsprototyp",
        "Machbarkeit vor großer Investition klären"
      ],
      [
        "Kleine stabile Anpassung",
        "Schlanker geplanter Ablauf mit Regressionstest",
        "Kein unnötiger Prozessaufwand"
      ]
    ]
  ],
  [
    "h",
    "Iterativ und inkrementell unterscheiden"
  ],
  [
    "p",
    "Iterativ bedeutet: Ein Ergebnis wird wiederholt verbessert. Inkrementell bedeutet: Weitere nutzbare Funktion kommt hinzu. Ein Team kann beide Ansätze verbinden. Beispiel: Erst eine einfache Suche liefern, dann verbessern und um Reservierung ergänzen."
  ],
  [
    "warn",
    "Agiles Arbeiten benötigt Dokumentation. Umfang und Form richten sich nach Bedarf und Risiko. Kanban schreibt keine Sprints vor. Ein Festpreisvertrag verbietet agile Entwicklung nicht."
  ],
  [
    "qa",
    "Ein Kunde kennt seine Bedienabläufe noch nicht. Der Endtermin bleibt fest. **Empfehlen** Sie ein Vorgehen mit drei konkreten Maßnahmen.",
    [
      "Kurze Feedbackzyklen mit einem frühen Prototyp reduzieren falsche Annahmen. 1 Punkt.",
      "Wichtigste Funktionen priorisieren und den Lieferumfang am festen Termin ausrichten. 1 Punkt.",
      "Akzeptanzkriterien und Qualitätsnachweise für jedes nutzbare Ergebnis festlegen. 1 Punkt."
    ],
    3
  ],
  [
    "see",
    [
      "ps-anforderungen",
      "ps-risiko",
      "ps-cicd"
    ]
  ]
]);
