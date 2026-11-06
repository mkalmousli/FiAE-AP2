AP2.page('ps-anforderungen', {
  "b": "ps",
  "g": "Anforderungsanalyse",
  "t": "Anforderungen: User Story, Akzeptanzkriterien und Nachverfolgung",
  "d": "Eine Anforderung beschreibt eine benötigte Eigenschaft oder Funktion. Sie muss verständlich und prüfbar sein. Akzeptanzkriterien legen fest, wann ein konkretes Ergebnis akzeptiert wird.",
  "m": "**Bedarf → Anforderung → Akzeptanzkriterium → Test → Nachweis.** Eine User Story startet ein Gespräch. Sie ersetzt keine nötigen Details.",
  "cheat": [
    [
      "Anforderungsarten",
      [
        "Funktional: Was leistet die Anwendung?",
        "Qualität: Wie gut leistet sie es?",
        "Randbedingung: Welche Grenze muss eingehalten werden?"
      ]
    ],
    [
      "Prüfbar formulieren",
      [
        "Eindeutige ID und klare Aussage",
        "Messgröße, Grenzwert und Bedingungen",
        "Quelle, Priorität und Abnahmetest",
        "Keine unklaren Wörter wie schnell oder modern"
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Vom Problem zum Bedarf"
    ],
    [
      "p",
      "Ein Lager reserviert Artikel bislang per Telefon. Zwei Personen vergeben manchmal denselben Restbestand. Das Ziel ist eine zuverlässige Reservierung. Eine bestimmte Datenbank ist noch keine fachliche Anforderung."
    ],
    [
      "table",
      [
        "Art",
        "Beispiel",
        "Passender Nachweis"
      ],
      [
        [
          "Funktional",
          "Das System reserviert die angeforderte Menge bei ausreichendem Bestand.",
          "Reservierung mit ausreichendem Bestand testen"
        ],
        [
          "Qualität",
          "95 Prozent der Reservierungen dauern unter einer Sekunde bei 100 parallelen Nutzern.",
          "Lasttest mit festgelegter Datenmenge"
        ],
        [
          "Randbedingung",
          "Die Schnittstelle des vorhandenen ERP muss weiterverwendet werden.",
          "Integrationstest gegen vereinbarte Version"
        ]
      ]
    ],
    [
      "h",
      "User Story und Kriterien"
    ],
    [
      "p",
      "Eine User Story beschreibt Rolle, Wunsch und Nutzen. Beispiel: Als Lagerkraft möchte ich Artikel reservieren, damit sie für den Auftrag verfügbar bleiben."
    ],
    [
      "code",
      "text",
      "Story R-12: Artikel reservieren\n\nGegeben: Artikel 42 hat fünf verfügbare Stück.\nWenn: Eine berechtigte Lagerkraft drei Stück reserviert.\nDann: Die Reservierung enthält drei Stück.\nUnd: Der verfügbare Bestand beträgt zwei Stück.\n\nGegeben: Zwei Stück sind verfügbar.\nWenn: Drei Stück angefordert werden.\nDann: Das System lehnt die Reservierung ab.\nUnd: Der Bestand bleibt unverändert."
    ],
    [
      "note",
      "Gegeben–Wenn–Dann entspricht Given–When–Then. Es beschreibt Ausgangslage, Aktion und beobachtbares Ergebnis. Formuliere auch Ablehnungsfälle und fehlende Rechte."
    ],
    [
      "h",
      "Priorisieren mit MoSCoW"
    ],
    [
      "table",
      [
        "Priorität",
        "Bedeutung im vereinbarten Umfang",
        "Beispiel"
      ],
      [
        [
          "Must",
          "Ohne diese Eigenschaft ist die Lieferung nicht brauchbar",
          "Keine Überbuchung"
        ],
        [
          "Should",
          "Wichtig; zeitweise Umgehung möglich",
          "E-Mail nach Reservierung"
        ],
        [
          "Could",
          "Nützlich bei freier Kapazität",
          "Farbige Favoritenliste"
        ],
        [
          "Won’t this time",
          "Bewusst nicht in dieser Lieferung",
          "Automatische Lieferantenbestellung"
        ]
      ]
    ],
    [
      "warn",
      "Nicht alle Wünsche können Must sein. Prioritäten benötigen eine begründete Entscheidung. Won’t bedeutet hier „diesmal nicht“, nicht „niemals“."
    ],
    [
      "h",
      "Nachverfolgung als Tabelle"
    ],
    [
      "table",
      [
        "ID",
        "Quelle",
        "Kriterium",
        "Test",
        "Status"
      ],
      [
        [
          "R-12",
          "Lagerleitung",
          "Bestand wird atomar reserviert",
          "T-12: gleichzeitige Anfragen",
          "Offen"
        ],
        [
          "R-13",
          "Lagerleitung",
          "Ablehnung verändert Bestand nicht",
          "T-13: Anforderung zu groß",
          "Bestanden"
        ],
        [
          "Q-04",
          "Betrieb",
          "p95 unter 1 s bei 100 Nutzern",
          "L-04: Lasttest",
          "Offen"
        ]
      ]
    ],
    [
      "p",
      "Traceability bedeutet Nachverfolgbarkeit. Die Tabelle verbindet Anforderungen mit Umsetzung und Tests. Bei einer Änderung findet das Team betroffene Nachweise schneller."
    ],
    [
      "h",
      "Definition of Done und Akzeptanzkriterium"
    ],
    [
      "table",
      [
        "Begriff",
        "Geltung",
        "Beispiel"
      ],
      [
        [
          "Akzeptanzkriterium",
          "Konkrete fachliche Anforderung",
          "Überbuchung wird verhindert"
        ],
        [
          "Definition of Done",
          "Gemeinsamer Qualitätsmaßstab für das Inkrement",
          "Review und vereinbarte Tests abgeschlossen"
        ]
      ]
    ],
    [
      "tip",
      "**Formulieren** heißt: einen vollständigen, prüfbaren Satz schreiben. Ergänze Bedingungen und Ergebnis. **Erläutern** verlangt zusätzlich Zweck oder Beispiel."
    ],
    [
      "qa",
      "Der Kunde fordert: „Die Suche soll schnell sein.“ **Formulieren** Sie eine messbare Anforderung mit vier Merkmalen.",
      [
        "Beispiel: Bei 100 parallelen Nutzern zeigt die Suche bei 200.000 Artikeln 95 Prozent der Ergebnisse innerhalb einer Sekunde an.",
        "Messgröße Antwortzeit: 1 Punkt.",
        "Grenzwert eine Sekunde: 1 Punkt.",
        "Last- und Datenbedingungen: 1 Punkt.",
        "Anteil 95 Prozent als eindeutiges Erfolgskriterium: 1 Punkt."
      ],
      4
    ],
    [
      "qa",
      "Bestand ist fünf. Zwei Anfragen reservieren gleichzeitig je vier Stück. **Entwerfen** Sie drei fachliche Akzeptanzkriterien.",
      [
        "- Genau eine der beiden Reservierungen wird erfolgreich angelegt.",
        "- Die zweite Anfrage wird wegen unzureichenden Bestands abgelehnt.",
        "- Nach Abschluss beträgt der verfügbare Bestand eins.",
        "Je beobachtbarem Kriterium 1 Punkt. Die Reihenfolge der Gewinner ist nicht vorgegeben."
      ],
      3
    ],
    [
      "quiz",
      [
        {
          "q": "Was ist ein Akzeptanzkriterium?",
          "o": [
            "Eine prüfbare Bedingung für die Annahme",
            "Ein beliebiger Programmierstil",
            "Immer eine Kostenstelle",
            "Nur der Seitenname"
          ],
          "a": 0,
          "e": "Es beschreibt ein beobachtbares erwartetes Ergebnis."
        },
        {
          "q": "Warum benötigen Anforderungen eindeutige IDs?",
          "o": [
            "Damit Änderungen und Tests zugeordnet werden können",
            "Damit sie länger aussehen",
            "Damit Tests entfallen",
            "Damit jede Anforderung geheim bleibt"
          ],
          "a": 0,
          "e": "IDs ermöglichen verlässliche Verweise."
        },
        {
          "q": "Was beschreibt eine User Story typischerweise?",
          "o": [
            "Rolle, Wunsch und Nutzen",
            "Nur Tabellen und Spalten",
            "Nur Budget und Termin",
            "Nur einen Quelltext"
          ],
          "a": 0,
          "e": "Details werden im Gespräch und in Kriterien ergänzt."
        }
      ]
    ],
    [
      "see",
      [
        "ps-lastenheft",
        "ps-usecase",
        "ps-softwarequalitaet",
        "ps-testentwurf",
        "ps-abnahme"
      ]
    ]
  ]
});
