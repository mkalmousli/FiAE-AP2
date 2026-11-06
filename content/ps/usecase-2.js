AP2.add('ps-usecase', [
  ['h', 'Häufige Fehler'],
  ['list', ['**Akteur im System statt außerhalb:** Akteure stehen immer außerhalb der Systemgrenze.', '**Pfeilrichtung vertauscht:** include zeigt zum **enthaltenen** Fall, extend zum **Basisfall**.', '**Zu technische Namen:** "Datenbank abfragen" ist kein Anwendungsfall. Besser: "Artikel suchen".', '**Ablaufdetails im Diagramm:** Schritte gehören in die Beschreibung, nicht ins Diagramm.']],
  ['tip', 'Eselsbrücke für include/extend: Beim **include** muss die Funktion immer dabei sein (Bestellen **braucht** Bezahlen). Beim **extend** ist sie ein **Extra** (Rabattcode ist ein Zusatz). Der Pfeil bei extend zeigt zum Hauptfall, wie ein "Zusatz, der sich anhängt".'],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Ein Bibliothekssystem soll es Lesern erlauben, Bücher zu suchen und auszuleihen. Bibliothekare verwalten den Bestand. Beim Ausleihen wird immer geprüft, ob der Leser gesperrt ist. Zeichnen oder beschreiben Sie das Anwendungsfalldiagramm.', ['**Akteure:** Leser, Bibliothekar.', '**Anwendungsfälle:** Buch suchen, Buch ausleihen, Bestand verwalten, Leser auf Sperre prüfen.', '**Beziehungen:** Leser nutzt Buch suchen und Buch ausleihen. Bibliothekar nutzt Bestand verwalten. **Buch ausleihen «include» Leser auf Sperre prüfen**, weil die Prüfung immer erfolgt.'], 6],
  ['qa', 'Erklären Sie den Unterschied zwischen include und extend.', ['**include:** Der enthaltene Anwendungsfall wird vom Basisfall **immer** ausgeführt (Wiederverwendung, zum Beispiel Anmeldung).', '**extend:** Der erweiternde Anwendungsfall wird nur **unter einer Bedingung** und **optional** ausgeführt (zum Beispiel Rabattcode). Der Basisfall funktioniert auch ohne die Erweiterung.'], 4],
  ['quiz', [
    {q: 'Was stellt ein Strichmännchen im Use-Case-Diagramm dar?', o: ['Einen Akteur', 'Einen Anwendungsfall', 'Eine Klasse', 'Einen Datenbankzugriff'], a: 0, e: 'Akteure sind Rollen außerhalb des Systems, als Strichmännchen gezeichnet.'},
    {q: 'Welche Beziehung bedeutet: wird immer mit ausgeführt?', o: ['include', 'extend', 'Aggregation', 'Vererbung'], a: 0, e: 'include bedeutet, dass der Basisfall den anderen Fall immer enthält.'},
    {q: 'Was gehört in die Systemgrenze?', o: ['Die Anwendungsfälle', 'Die Akteure', 'Die Entwickler', 'Der Kunde'], a: 0, e: 'Innerhalb der Systemgrenze liegen die Anwendungsfälle, Akteure stehen außerhalb.'},
    {q: 'Welche Form hat ein Anwendungsfall?', o: ['Oval', 'Raute', 'Dreieck', 'Zylinder'], a: 0, e: 'Anwendungsfälle werden als Ovale gezeichnet.'},
  ]],
]);

AP2.add('ps-usecase', [
  [
    "h",
    "Use Case als prüfbaren Text beschreiben"
  ],
  [
    "table",
    [
      "Feld",
      "Beispiel: Artikel reservieren"
    ],
    [
      [
        "Primärer Akteur",
        "Berechtigte Lagerkraft"
      ],
      [
        "Auslöser",
        "Lagerkraft bestätigt die gewünschte Menge"
      ],
      [
        "Vorbedingung",
        "Artikel existiert; Lagerkraft ist angemeldet und berechtigt"
      ],
      [
        "Normalablauf",
        "Bestand prüfen, Reservierung anlegen, Bestand anpassen, Bestätigung zeigen"
      ],
      [
        "Alternativablauf",
        "Bestand reicht nicht: ablehnen und verfügbaren Bestand anzeigen"
      ],
      [
        "Nachbedingung bei Erfolg",
        "Reservierung existiert; verfügbarer Bestand ist passend vermindert"
      ],
      [
        "Nachbedingung bei Ablehnung",
        "Keine neue Reservierung; Bestand bleibt unverändert"
      ]
    ]
  ],
  [
    "p",
    "Die Vorbedingung beschreibt, was vor dem Start bereits gilt. Der Normalablauf beschreibt die eigentliche Interaktion. Die Nachbedingung beschreibt den zugesagten Endzustand. Alternativen gehören an die passende Stelle des Ablaufs."
  ],
  [
    "qa",
    "**Entwerfen** Sie für „Reservierung stornieren“ eine Vorbedingung, zwei Schritte und eine Nachbedingung.",
    [
      "Vorbedingung: Reservierung ist aktiv und die Person darf sie stornieren. 1 Punkt.",
      "Schritt: Server prüft Berechtigung und aktuellen Zustand. 1 Punkt.",
      "Schritt: Reservierung wird beendet und reservierte Menge freigegeben. 1 Punkt.",
      "Nachbedingung: Reservierung ist storniert; die Menge ist wieder verfügbar. 1 Punkt."
    ],
    4
  ],
  [
    "warn",
    "Eine Anmeldung ist nicht immer ein include-Anwendungsfall. Wenn die Sitzung bereits besteht, kann Anmeldung eine Vorbedingung sein. Entscheidend sind die modellierte Systemgrenze und der beschriebene Ablauf."
  ],
  [
    "see",
    [
      "ps-anforderungen",
      "ps-testentwurf",
      "ps-aktivitaet"
    ]
  ]
]);
