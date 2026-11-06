AP2.page('ps-aenderungen', {
  "b": "ps",
  "g": "Projektmanagement",
  "t": "Änderungsmanagement: Auswirkungen prüfen und Umfang kontrollieren",
  "d": "Änderungen gehören zu Softwareprojekten. Sie beeinflussen häufig Umfang, Aufwand, Termine und Risiken. Ein geregelter Änderungsablauf macht diese Auswirkungen sichtbar und hält Entscheidungen nachvollziehbar.",
  "m": "**Wunsch erfassen → Auswirkungen prüfen → entscheiden → umsetzen → nachweisen.** Ein Wunsch ist noch keine freigegebene Erweiterung.",
  "cheat": [
    [
      "Änderungsantrag",
      [
        "ID, Anlass und gewünschtes Ergebnis",
        "Betroffene Anforderungen und Systeme",
        "Aufwand, Kosten, Termine und Risiken",
        "Entscheidung, Verantwortung und Termin"
      ]
    ],
    [
      "Begriffe",
      [
        "Baseline: vereinbarter Bezugsstand",
        "Scope: vereinbarter Leistungsumfang",
        "Scope Creep: schleichende unkontrollierte Erweiterung",
        "Change Log: nachvollziehbare Änderungsliste"
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Szenario: zusätzliche Exportfunktion"
    ],
    [
      "p",
      "Nach der Planung wünscht die Fachseite einen Tabellenexport. Der Export benötigt Datenfilter und Berechtigungen. Der Wunsch wirkt klein, betrifft aber Entwicklung, Tests und Dokumentation."
    ],
    [
      "table",
      [
        "Arbeit",
        "Aufwand"
      ],
      [
        [
          "Export entwickeln",
          "12 Stunden"
        ],
        [
          "Berechtigungen und Datenfilter",
          "6 Stunden"
        ],
        [
          "Tests erweitern",
          "8 Stunden"
        ],
        [
          "Dokumentation und Freigabe",
          "4 Stunden"
        ]
      ]
    ],
    [
      "walk",
      {
        "t": "Änderung kalkulieren",
        "steps": [
          {
            "t": "Grundaufwand",
            "b": [
              [
                "p",
                "12 + 6 + 8 + 4 = **30 Stunden**."
              ]
            ]
          },
          {
            "t": "Reserve nach Vorgabe",
            "b": [
              [
                "p",
                "Die Aufgabe verlangt 20 Prozent Aufwandreserve."
              ],
              [
                "p",
                "30 × 0,20 = **6 Stunden**. Gesamt: **36 Stunden**."
              ]
            ]
          },
          {
            "t": "Kosten und Dauer",
            "b": [
              [
                "p",
                "36 Stunden × 75 Euro/Stunde = **2.700 Euro netto**."
              ],
              [
                "p",
                "Eine Person hat täglich sechs Projektstunden. 36 / 6 = **6 Arbeitstage**."
              ]
            ]
          }
        ]
      }
    ],
    [
      "warn",
      "Sechs Arbeitstage Aufwand verschieben den Endtermin nicht automatisch um sechs Tage. Freie Kapazität, Abhängigkeiten und Puffer bestimmen die Terminwirkung. Prüfe den kritischen Pfad."
    ],
    [
      "h",
      "Auswirkungen systematisch prüfen"
    ],
    [
      "table",
      [
        "Bereich",
        "Prüffrage"
      ],
      [
        [
          "Anforderungen",
          "Was ändert sich an Akzeptanzkriterien und Prioritäten?"
        ],
        [
          "Architektur und Daten",
          "Welche Komponenten und Tabellen sind betroffen?"
        ],
        [
          "Qualität und Sicherheit",
          "Können unberechtigte Personen Daten exportieren?"
        ],
        [
          "Tests",
          "Welche neuen und bestehenden Fälle sind nötig?"
        ],
        [
          "Zeit und Kosten",
          "Welche Kapazität und Reserven werden benötigt?"
        ],
        [
          "Betrieb",
          "Sind Monitoring, Support oder Schulung anzupassen?"
        ]
      ]
    ],
    [
      "h",
      "Entscheidungsoptionen"
    ],
    [
      "list",
      [
        "Freigeben und Planung ausdrücklich anpassen.",
        "Später in einer anderen Lieferung umsetzen.",
        "Mit einer weniger wichtigen Funktion tauschen.",
        "Ablehnen und den Grund dokumentieren.",
        "Zusätzliche Analyse beauftragen, wenn Angaben fehlen."
      ]
    ],
    [
      "h",
      "Agiler Umgang mit Änderungen"
    ],
    [
      "p",
      "Neue Wünsche können ins Product Backlog aufgenommen werden. Der Product Owner ordnet sie nach Wert und Priorität. Aufwand und technische Risiken werden mit den Developers geklärt. Im Sprint darf das Sprint-Ziel nicht gefährdet werden."
    ],
    [
      "p",
      "Agilität beseitigt keine Kapazitätsgrenzen. Eine neue wichtige Funktion kann eine andere Funktion verdrängen. Qualitätsziele und notwendige Tests bleiben Teil der Arbeit."
    ],
    [
      "h",
      "Nachweis und Abschluss"
    ],
    [
      "steps",
      [
        "Freigegebene Anforderungen und Planstände aktualisieren.",
        "Änderung mit Versionsstand umsetzen und prüfen.",
        "Betroffene Beteiligte über neue Termine informieren.",
        "Nachweise und offene Punkte zur Änderungs-ID ablegen.",
        "Erst nach erfüllten Kriterien als abgeschlossen markieren."
      ]
    ],
    [
      "tip",
      "**Berechnen** verlangt Einheiten und Rechenweg. **Beurteilen** verlangt eine Entscheidung mit Bezug auf Kapazität und Projektziel."
    ],
    [
      "qa",
      "**Berechnen** Sie für die Anlage Gesamtaufwand mit Reserve, Kosten und ideale Dauer. **Begründen** Sie eine Einschränkung der Dauerrechnung.",
      [
        "30 × 1,20 = **36 Stunden**. 1 Punkt.",
        "36 × 75 = **2.700 Euro netto**. 1 Punkt.",
        "36 / 6 = **6 Arbeitstage** bei einer verfügbaren Person. 1 Punkt.",
        "Die Terminverschiebung hängt von Abhängigkeiten und Puffern ab. 1 Punkt."
      ],
      4
    ],
    [
      "qa",
      "Die Fachseite nennt den Export einen „kleinen Zusatz“. **Erläutern** Sie drei weitere Arbeiten neben dem Exportcode.",
      [
        "- Rechteprüfung verhindert unberechtigte Datenabzüge.",
        "- Tests prüfen Filter, Formate und große Datenmengen.",
        "- Dokumentation und Abnahme erklären Nutzung und bestätigen Kriterien.",
        "Je Arbeit mit Zweck 1 Punkt."
      ],
      3
    ],
    [
      "quiz",
      [
        {
          "q": "Was ist Scope Creep?",
          "o": [
            "Schleichende unkontrollierte Erweiterung des Umfangs",
            "Eine geplante Teststufe",
            "Ein festes Kostenmodell",
            "Eine SQL-Verknüpfung"
          ],
          "a": 0,
          "e": "Zusätze brauchen eine bewusste Auswirkungsprüfung und Entscheidung."
        },
        {
          "q": "Was ist eine Baseline?",
          "o": [
            "Ein vereinbarter Bezugsstand",
            "Eine beliebige neue Idee",
            "Ein Gerätetreiber",
            "Eine geheime Kopie"
          ],
          "a": 0,
          "e": "Änderungen werden gegen diesen Stand bewertet."
        },
        {
          "q": "Was gilt für neue Anforderungen im agilen Projekt?",
          "o": [
            "Sie benötigen weiterhin Priorisierung und Aufwandbetrachtung",
            "Sie kosten keine Zeit",
            "Sie ersetzen jede Prüfung",
            "Sie sind automatisch im aktuellen Sprint"
          ],
          "a": 0,
          "e": "Agile Planung macht Änderungen handhabbar, schafft aber keine unbegrenzte Kapazität."
        }
      ]
    ],
    [
      "see",
      [
        "ps-scrum",
        "ps-netzplan",
        "ps-aufwand",
        "ps-risiko",
        "ps-abnahme"
      ]
    ]
  ]
});
