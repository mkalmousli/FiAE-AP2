AP2.add('ps-scrum', [
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Nennen Sie die drei Rollen im Scrum-Team und beschreiben Sie je eine Hauptaufgabe.', ['- **Product Owner:** Verantwortlich für den Wert des Produkts; priorisiert das Product Backlog.', '- **Scrum Master:** Sorgt für das Einhalten von Scrum und beseitigt Hindernisse.', '- **Developers:** Setzen die Einträge des Sprint Backlogs zu einem Inkrement um.'], 3],
  ['qa', 'Erläutern Sie den Unterschied zwischen Product Backlog und Sprint Backlog.', 'Das **Product Backlog** enthält alle Anforderungen an das Produkt, priorisiert und langfristig. Das **Sprint Backlog** enthält das Sprint-Ziel, ausgewählte Product-Backlog-Einträge und den ausführbaren Plan. Die Developers passen diesen Plan während des Sprints an.', 4],
  ['qa', 'Das Team merkt, dass es immer wieder den Termin der Daily Scrums verschiebt und sie zu lang werden. Welches Ereignis ist der richtige Ort, das zu besprechen?', 'Die **Sprint Retrospektive**. Dort wird die Zusammenarbeit des Teams reflektiert und eine Verbesserung für den nächsten Sprint beschlossen, zum Beispiel feste Zeit, Timebox von 15 Minuten.', 3],
  ['qa', 'Formulieren Sie eine User Story mit Akzeptanzkriterien für einen Online-Shop.', ['**Story:** Als Kunde möchte ich Artikel in einen Warenkorb legen, um mehrere Artikel gemeinsam zu bestellen.', '**Akzeptanzkriterien:**', '- Ein Artikel kann mit einem Klick hinzugefügt werden.', '- Der Warenkorb zeigt Menge, Einzelpreis und Gesamtsumme.', '- Die Menge kann geändert und der Artikel entfernt werden.'], 4],
  ['quiz', [
    {q: 'Wie lang darf ein Sprint in Scrum höchstens sein?', o: ['Ein Monat', 'Ein Jahr', 'Eine Stunde', 'Zwei Quartale'], a: 0, e: 'Der Scrum Guide begrenzt den Sprint auf höchstens einen Monat. Üblich sind zwei Wochen.'},
    {q: 'Wer verwaltet und priorisiert das Product Backlog?', o: ['Product Owner', 'Scrum Master', 'Der Kunde allein', 'Das Management'], a: 0, e: 'Der Product Owner ist für das Product Backlog verantwortlich.'},
    {q: 'Wie lange dauert das Daily Scrum höchstens?', o: ['15 Minuten', '2 Stunden', '1 Tag', '30 Sekunden'], a: 0, e: 'Das Daily Scrum ist auf 15 Minuten begrenzt.'},
    {q: 'Was ist ein WIP-Limit in Kanban?', o: ['Obergrenze gleichzeitig bearbeiteter Aufgaben', 'Maximale Sprintlänge', 'Minimale Teamgröße', 'Budget pro Aufgabe'], a: 0, e: 'Das WIP-Limit begrenzt die Arbeit in Bearbeitung, um Überlastung und lange Durchlaufzeiten zu vermeiden.'},
    {q: 'Welches Artefakt ist das Ergebnis eines Sprints, das alle Fertig-Kriterien erfüllt?', o: ['Inkrement', 'Product Backlog', 'Burndown', 'Retrospektive'], a: 0, e: 'Das Inkrement ist die Summe aller fertigen Einträge, nutzbar und entsprechend der Definition of Done.'},
  ]],
]);

AP2.add('ps-scrum', [
  [
    "h",
    "Artefakt und Commitment zusammen lernen"
  ],
  [
    "table",
    [
      "Artefakt",
      "Commitment",
      "Leitfrage"
    ],
    [
      [
        "Product Backlog",
        "Produkt-Ziel",
        "Welches längerfristige Ergebnis wird verfolgt?"
      ],
      [
        "Sprint Backlog",
        "Sprint-Ziel",
        "Warum ist dieser Sprint wertvoll?"
      ],
      [
        "Inkrement",
        "Definition of Done",
        "Welcher gemeinsame Qualitätszustand muss erreicht sein?"
      ]
    ]
  ],
  [
    "h",
    "Review und Retrospektive unterscheiden"
  ],
  [
    "p",
    "Im Sprint Review werden Ergebnis und weiteres Vorgehen mit relevanten Stakeholdern überprüft. Die Retrospektive verbessert Zusammenarbeit und Arbeitsweise. Ein Review ist keine bloße Vorführung. Es ist auch keine zwingende Freigabeschranke vor jeder Auslieferung."
  ],
  [
    "h",
    "Unfertige Arbeit und neue Erkenntnisse"
  ],
  [
    "p",
    "Ein Eintrag erfüllt die Definition of Done noch nicht. Er zählt deshalb nicht als fertiger Teil des Inkrements. Die weitere Arbeit wird transparent neu geplant. Während des Sprints passen die Developers ihren Plan laufend an. Das Sprint-Ziel darf nicht gefährdet werden."
  ],
  [
    "qa",
    "Eine Funktion ist programmiert. Die vereinbarten Tests fehlen. **Beurteilen** Sie den Fertigstatus. **Nennen** Sie zwei nächste Schritte.",
    [
      "Die Funktion erfüllt die Definition of Done noch nicht und ist damit nicht fertig. 1 Punkt.",
      "Fehlende Tests und Risiken transparent machen. 1 Punkt.",
      "Restarbeit mit Product Owner und Developers passend zum Ziel neu planen. 1 Punkt."
    ],
    3
  ],
  [
    "note",
    "Quelle: Scrum Guide 2020. Er beschreibt Ergebnisverantwortlichkeiten, Artefakte und ihre Commitments."
  ],
  [
    "see",
    [
      "ps-anforderungen",
      "ps-testentwurf",
      "ps-aenderungen",
      "ps-cicd"
    ]
  ]
]);
