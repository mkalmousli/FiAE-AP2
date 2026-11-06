AP2.add('ps-wireframe', [
  ['h', 'Navigationskonzepte und Layoutmuster'],
  ['kv', [
    ['Hauptnavigation', 'Oben (Menüleiste) oder links (Seitenleiste). Zeigt die wichtigsten Bereiche. Anzahl nach Aufgaben, Begriffen und Nutzerprüfung wählen; keine starre Sieben-Punkte-Regel.'],
    ['Breadcrumb (Brotkrumen)', 'Zeigt den Pfad: Start / Produkte / Laptops. Hilft bei der Orientierung.'],
    ['Responsive Design', 'Die Oberfläche passt sich der Bildschirmgröße an (Desktop, Tablet, Handy). **Mobile First**: erst für kleine Bildschirme entwerfen.'],
    ['Raster (Grid)', 'Ein unsichtbares Spaltenraster (zum Beispiel 12 Spalten) sorgt für Ordnung und Ausrichtung.'],
    ['Weißraum', 'Leere Fläche gibt Elementen Luft. Verbessert die Lesbarkeit.'],
  ]],
  ['h', 'Ablauf einer Oberflächenentwicklung (User-Centered Design)'],
  ['diagram', AP2.dg.cycle(['Nutzungskontext verstehen', 'Anforderungen festlegen', 'Entwurf (Wireframe, Prototyp)', 'Evaluation (Test mit Nutzern)'], {w: 720, h: 330, rx: 270, ry: 110, styles: ['accent', 'accent', 'accent', 'ok'], cap: 'Der Kreislauf wird wiederholt, bis die Gebrauchstauglichkeit ausreicht (ISO 9241-210).'})],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie den Unterschied zwischen Wireframe und Mockup.', 'Ein **Wireframe** zeigt nur die **Struktur und Anordnung** der Elemente (grob, meist Graustufen, ohne Design). Ein **Mockup** zeigt zusätzlich das **visuelle Design** (Farben, Schriften, Bilder) und kommt dem Endergebnis optisch nahe, ist aber nicht klickbar.', 4],
  ['qa', 'Nennen Sie zwei Vorteile von Prototypen im Entwicklungsprozess.', ['- Der Kunde sieht früh, wie die Anwendung funktionieren wird, und kann Feedback geben.', '- Missverständnisse und Bedienprobleme werden **vor** der teuren Programmierung entdeckt.', '- Usability-Tests mit echten Nutzern sind möglich.'], 4],
  ['qa', 'Eine Online-Shop-Oberfläche soll für Smartphones optimiert werden. Nennen Sie zwei Gestaltungsmaßnahmen.', ['- Responsive Layout: einspaltige Darstellung, Navigation als Menü-Symbol (Hamburger-Menü).', '- Große, gut treffbare Schaltflächen und Eingabefelder; kurze Texte; schnelle Ladezeit.'], 3],
  ['quiz', [
    {q: 'Was ist ein Mockup?', o: ['Ein statischer, optisch realistischer Entwurf', 'Ein klickbarer Entwurf', 'Ein Datenbankmodell', 'Ein Testfall'], a: 0, e: 'Mockups zeigen das Design realistisch, sind aber nicht interaktiv.'},
    {q: 'Was ist das Ziel von Wireframes?', o: ['Struktur und Aufbau der Oberfläche klären', 'Farben festlegen', 'Server auswählen', 'Datenbank optimieren'], a: 0, e: 'Wireframes konzentrieren sich auf Aufbau und Platzierung.'},
    {q: 'Was bedeutet "Mobile First"?', o: ['Zuerst für kleine Bildschirme entwerfen', 'Nur für Handys entwickeln', 'Handys zuerst verkaufen', 'Erst mobil testen, nie am PC'], a: 0, e: 'Mobile First beginnt beim kleinsten Bildschirm und erweitert für größere.'},
  ]],
]);

AP2.add('ps-wireframe', [
  [
    "h",
    "Auch Fehler-, Leer- und Ladezustände entwerfen"
  ],
  [
    "table",
    [
      "Zustand",
      "Darstellung",
      "Erwartete Aktion"
    ],
    [
      [
        "Laden",
        "Verständlicher Hinweis; relevante Aktion vorübergehend gesperrt",
        "Warten oder bei langer Dauer abbrechen"
      ],
      [
        "Keine Treffer",
        "Suchbegriff zeigen; Filter erklären",
        "Filter zurücksetzen oder Suche ändern"
      ],
      [
        "Eingabefehler",
        "Feldbezogener Text mit Korrekturhinweis",
        "Eingabe korrigieren"
      ],
      [
        "Netzwerkfehler",
        "Ergebnisstatus klar benennen",
        "Kontrolliert erneut versuchen"
      ],
      [
        "Erfolg",
        "Bestätigung mit ID oder nächstem Schritt",
        "Weiterarbeiten ohne ungewollte Wiederholung"
      ]
    ]
  ],
  [
    "p",
    "Ein Wireframe nur für den Erfolgsfall lässt wichtige Fragen offen. Bei unbekanntem Ergebnis darf „erneut senden“ keine doppelte Bestellung erzeugen. Oberfläche und Schnittstellenvertrag müssen zusammenpassen."
  ],
  [
    "qa",
    "Die Suche zeigt bei leerem Ergebnis eine weiße Fläche. **Entwerfen** Sie drei Verbesserungen mit Zweck.",
    [
      "Suchbegriff und Filter anzeigen, damit der aktuelle Suchkontext erkennbar bleibt. 1 Punkt.",
      "„Keine Treffer“ als Text ausgeben, damit kein Ladefehler vermutet wird. 1 Punkt.",
      "Filter zurücksetzen oder Suchbegriff ändern anbieten, damit eine nächste Aktion möglich ist. 1 Punkt."
    ],
    3
  ],
  [
    "h",
    "Akzeptanzkriterien für den Entwurf"
  ],
  [
    "list",
    [
      "Wichtige Aktionen mit Tastatur erreichbar.",
      "Fokus und Fehlermeldungen sichtbar und verständlich.",
      "Kritische Daten vor endgültiger Aktion prüfbar.",
      "Leere Listen und laufende Anfragen haben eigene Zustände.",
      "Navigation bleibt auch bei schmaler Ansicht verständlich."
    ]
  ],
  [
    "see",
    [
      "ps-barrierefreiheit",
      "ps-anforderungen",
      "infra-http"
    ]
  ]
]);
