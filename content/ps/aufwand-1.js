AP2.page('ps-aufwand', {
  b: 'ps', g: 'Projektmanagement', t: 'Aufwandsschätzung',
  d: '**Aufwandsschätzung** ermittelt vor dem Projektstart, wie viel Arbeit (in Personentagen) ein Projekt kostet. Übliche Verfahren sind die **Expertenschätzung**, die **Analogiemethode**, die **Function-Point-Methode** und die **Delphi-Methode**.',
  m: '**E-A-F-D**: Experten, Analogie, Function Point, Delphi. Faustregel: Schätzen ist immer unsicher. Deshalb: mehrere Methoden mischen, Puffer einplanen, später nachschätzen.',
  cheat: [
    ['Expertenschätzung', ['Erfahrene Fachleute schätzen', 'Schnell und billig', 'Subjektiv, abhängig vom Experten']],
    ['Analogiemethode', ['Vergleich mit ähnlichem abgeschlossenen Projekt', 'Gut bei ähnlichen Projekten', 'Braucht Projektdatenbank']],
    ['Function Point', ['Misst **Funktionsumfang** aus Sicht des Nutzers', '5 Komponenten: EI, EO, EQ, ILF, EIF', 'Gewichten, Summe, Bewertungsfaktor', 'Aufwand = Function Points / Produktivität']],
    ['Delphi-Methode', ['Anonyme Schätzung mehrerer Experten', 'Ergebnisse werden besprochen, dann wiederholt', 'Reduziert Gruppendruck und Anker-Effekte']],
  ],
  blocks: [
    ['h', 'Warum ist Schätzen schwierig?'],
    ['p', 'Am Anfang eines Projekts weiß man am wenigsten, aber man muss schon Kosten und Termine nennen. Das nennt man den **Kegel der Unsicherheit**: Zu Beginn kann die Schätzung um den Faktor 2 oder 4 danebenliegen, am Ende ist sie sehr genau. Deshalb gehört zur guten Planung: **mehrere Methoden anwenden**, **Annahmen dokumentieren**, **Puffer einplanen** und **laufend nachschätzen**.'],
    ['h', 'Die wichtigsten Verfahren'],
    ['table', ['Verfahren', 'So funktioniert es', 'Vorteil', 'Nachteil'], [
      ['Expertenschätzung', 'Eine oder mehrere erfahrene Personen schätzen den Aufwand aus dem Bauch heraus plus Erfahrung.', 'Schnell, günstig, flexibel', 'Subjektiv, schwer nachvollziehbar'],
      ['Analogiemethode', 'Man vergleicht mit einem ähnlichen früheren Projekt und passt den Aufwand an Unterschiede an.', 'Realistisch, wenn es ähnliche Projekte gibt', 'Ohne Vergleichsprojekt unbrauchbar'],
      ['Function Point (FP)', 'Der Funktionsumfang wird nach festen Regeln in Punkte umgerechnet, daraus folgt der Aufwand.', 'Unabhängig von der Programmiersprache, objektiv', 'Aufwendig, braucht Training'],
      ['Delphi-Methode', 'Mehrere Experten schätzen unabhängig, sehen anonym alle Ergebnisse und schätzen erneut.', 'Weniger Beeinflussung, gute Konsensfindung', 'Dauert länger, viele Runden'],
      ['Planning Poker (agil)', 'Das Team schätzt Aufgaben in Story Points mit Karten (zum Beispiel 1, 2, 3, 5, 8, 13). Karten werden gleichzeitig aufgedeckt.', 'Team-Wissen, gutes Gespräch über Unklarheiten', 'Story Points sind relativ, kein direktes Zeitmaß'],
      ['Bottom-up / Top-down', 'Bottom-up: Aufgaben einzeln schätzen und addieren. Top-down: Gesamtbudget auf Teile verteilen.', 'Bottom-up genau; Top-down schnell', 'Bottom-up aufwendig; Top-down ungenau'],
    ]],
    ['h', 'Function-Point-Analyse (Schritt für Schritt)'],
    ['p', 'Die Idee: Nicht die Zeilen Code zählen, sondern **was die Software für den Benutzer tut**. Dazu zählt man fünf Arten von Funktionen:'],
    ['kv', [
      ['EI (External Input)', 'Eingabe, zum Beispiel ein Formular zum Anlegen eines Kunden.'],
      ['EO (External Output)', 'Ausgabe mit Berechnung, zum Beispiel eine Rechnung oder Statistik.'],
      ['EQ (External Query)', 'Abfrage ohne Berechnung, zum Beispiel Kundensuche.'],
      ['ILF (Internal Logical File)', 'Eigener Datenbestand, den die Anwendung pflegt (zum Beispiel Tabelle Kunden).'],
      ['EIF (External Interface File)', 'Fremder Datenbestand, den die Anwendung nur liest (zum Beispiel Schnittstelle zu einem anderen System).'],
    ]],
    ['p', 'Jede Funktion wird nach Komplexität (einfach, mittel, komplex) mit Punkten gewichtet. Übliche Standardgewichte:'],
    ['table', ['Komponente', 'einfach', 'mittel', 'komplex'], [['EI', '3', '4', '6'], ['EO', '4', '5', '7'], ['EQ', '3', '4', '6'], ['ILF', '7', '10', '15'], ['EIF', '5', '7', '10']]],
    ['steps', ['Funktionen zählen und jeweils als einfach, mittel oder komplex einstufen.', 'Punkte nach Gewichtungstabelle addieren: Das ist die **unbewertete Summe (UFP)**.', 'Einflussfaktoren (zum Beispiel Performance, Verteilung, Wiederverwendbarkeit) bewerten. Der **Bewertungsfaktor** (VAF) liegt zwischen 0,65 und 1,35: VAF = 0,65 + 0,01 mal Summe der 14 Einflüsse (je 0 bis 5).', '**Bewertete Function Points = UFP mal VAF.**', 'Aufwand = Function Points geteilt durch Produktivität (zum Beispiel 0,5 FP pro Personentag) oder FP mal Personentage pro FP.']],
    ['ex', ['Beispiel: 6 einfache EI (6 mal 3 = 18), 4 mittlere EO (4 mal 5 = 20), 5 einfache EQ (5 mal 3 = 15), 3 ILF mittel (3 mal 10 = 30), 1 EIF einfach (5). UFP = 18 + 20 + 15 + 30 + 5 = **88**.', 'Bewertungsfaktor 1,05 ergibt 88 mal 1,05 = **92,4 FP**. Bei 0,5 FP pro Personentag: 92,4 geteilt durch 0,5 = **184,8 Personentage** (etwa 185).']],
  ],
});

AP2.add('ps-aufwand', [
  [
    "h",
    "Dreipunktschätzung mit Unsicherheit"
  ],
  [
    "p",
    "Für eine Schnittstelle werden drei Werte geschätzt. Optimistisch sind es 16 Stunden. Am wahrscheinlichsten sind 28 Stunden. Pessimistisch sind es 52 Stunden. Die Werte beruhen auf dokumentierten Annahmen."
  ],
  [
    "code",
    "text",
    "PERT-Näherung:\nErwartungswert = (optimistisch + 4 × wahrscheinlich + pessimistisch) / 6\n              = (16 + 4 × 28 + 52) / 6\n              = 180 / 6 = 30 Stunden\n\nStreuungsmaß = (pessimistisch − optimistisch) / 6\n             = (52 − 16) / 6 = 6 Stunden"
  ],
  [
    "note",
    "Das Ergebnis ist eine Schätzung, keine Zusage. Aus drei Schätzwerten folgt keine garantierte Fertigstellungswahrscheinlichkeit. Die PERT-Formel ist eine Näherung."
  ],
  [
    "h",
    "Verfügbare Kapazität einbeziehen"
  ],
  [
    "p",
    "Ein Arbeitspaket braucht 90 Stunden. Drei Personen arbeiten jeweils sechs Projektstunden pro Tag. Ideale Dauer: 90 / (3 × 6) = fünf Arbeitstage. Das setzt vollständig teilbare Arbeit und gleiche Verfügbarkeit voraus."
  ],
  [
    "table",
    [
      "Einfluss",
      "Warum verändert er den Termin?"
    ],
    [
      [
        "Abhängige Aufgaben",
        "Nicht alles kann gleichzeitig beginnen"
      ],
      [
        "Einarbeitung",
        "Neue Personen benötigen Zeit und Unterstützung"
      ],
      [
        "Abstimmung",
        "Mehr Beteiligte benötigen mehr Kommunikation"
      ],
      [
        "Abwesenheiten",
        "Kalendertage sind nicht automatisch Arbeitstage"
      ],
      [
        "Unklare Anforderungen",
        "Neue Erkenntnisse verändern die Schätzung"
      ]
    ]
  ],
  [
    "qa",
    "Ein Paket braucht 84 Stunden. Zwei Personen stehen je sieben Stunden täglich zur Verfügung. **Berechnen** Sie die ideale Dauer. **Nennen** Sie zwei Annahmen.",
    [
      "Kapazität: 2 × 7 = **14 Stunden pro Tag**. 1 Punkt.",
      "Dauer: 84 / 14 = **6 Arbeitstage**. 1 Punkt.",
      "Arbeit kann ausreichend parallel aufgeteilt werden. 1 Punkt.",
      "Beide Personen sind verfügbar; zusätzlicher Abstimmungsaufwand ist nicht enthalten. 1 Punkt."
    ],
    4
  ],
  [
    "see",
    [
      "ps-risiko",
      "ps-aenderungen",
      "ps-netzplan"
    ]
  ]
]);
