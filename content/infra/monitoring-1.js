AP2.page('infra-monitoring', {
  "b": "infra",
  "g": "Betrieb und Überwachung",
  "t": "Monitoring: Metriken, Logs, Traces und Alarmierung",
  "d": "Monitoring überwacht den Zustand eines Systems. Metriken zeigen Zahlen über die Zeit. Logs beschreiben einzelne Ereignisse. Traces verfolgen eine Anfrage durch mehrere Dienste.",
  "m": "**Metrik: Wie viel? Log: Was geschah? Trace: Wo entstand die Verzögerung?** Ein Alarm braucht eine zuständige Person und eine konkrete Reaktion.",
  "cheat": [
    [
      "Vier wichtige Signale",
      [
        "Latenz: Antwortdauer",
        "Verkehr: Anfragen pro Zeit",
        "Fehler: Anteil fehlgeschlagener Anfragen",
        "Sättigung: Auslastung knapper Ressourcen"
      ]
    ],
    [
      "Betrieb",
      [
        "Von außen und innen messen.",
        "Zeitstempel synchron halten.",
        "Keine Passwörter oder Tokens protokollieren.",
        "Alarmweg und Wiederherstellung dokumentieren."
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Die richtigen Daten auswählen"
    ],
    [
      "table",
      [
        "Art",
        "Beispiel",
        "Nutzen"
      ],
      [
        [
          "Metrik",
          "Fehlerquote alle 60 Sekunden",
          "Trends und Schwellwerte erkennen"
        ],
        [
          "Log",
          "Fehler mit Zeit, Dienst, Code und Anfrage-ID",
          "Einzelnes Ereignis untersuchen"
        ],
        [
          "Trace",
          "Anfrage dauert 1,2 Sekunden; Datenbankanteil 0,9 Sekunden",
          "Verteilten Ablauf verfolgen"
        ],
        [
          "Synthetischer Test",
          "Regelmäßig Anmeldung und Suche ausführen",
          "Nutzersicht prüfen"
        ]
      ]
    ],
    [
      "h",
      "Ein Dienst ist mehr als ein Prozess"
    ],
    [
      "p",
      "Ein laufender Prozess kann trotzdem falsche Ergebnisse liefern. Ein einfacher Ping prüft nur eine begrenzte Erreichbarkeit. Prüfe deshalb auch fachliche Funktionen. Ein Testkauf darf keine echte Abbuchung auslösen."
    ],
    [
      "seq",
      {
        "w": 760,
        "actors": [
          "Überwachung",
          "Portal",
          "Datenbank",
          "Bereitschaft"
        ],
        "steps": [
          [
            0,
            1,
            "Kontrollierte Suchanfrage",
            "s"
          ],
          [
            1,
            2,
            "Testdatensatz lesen",
            "s"
          ],
          [
            2,
            1,
            "Zeitüberschreitung",
            "r"
          ],
          [
            1,
            0,
            "503 nach drei Sekunden",
            "r"
          ],
          [
            0,
            3,
            "Alarm: Suche wiederholt gestört",
            "s"
          ]
        ],
        "cap": "Ein Alarm soll die Nutzerwirkung benennen und passende Diagnoseinformationen liefern."
      }
    ],
    [
      "h",
      "Kennzahlen berechnen"
    ],
    [
      "table",
      [
        "Messung in fünf Minuten",
        "Wert"
      ],
      [
        [
          "Anfragen insgesamt",
          "12.000"
        ],
        [
          "Fehlgeschlagene Anfragen",
          "180"
        ],
        [
          "Dauer des Messfensters",
          "300 Sekunden"
        ],
        [
          "CPU-Spitze",
          "92 Prozent"
        ]
      ]
    ],
    [
      "walk",
      {
        "t": "Durchsatz und Fehlerquote",
        "steps": [
          {
            "t": "Durchsatz",
            "b": [
              [
                "p",
                "12.000 / 300 s = **40 Anfragen pro Sekunde**."
              ]
            ]
          },
          {
            "t": "Fehlerquote",
            "b": [
              [
                "p",
                "180 / 12.000 × 100 = **1,5 Prozent**."
              ]
            ]
          },
          {
            "t": "Ergebnis einordnen",
            "b": [
              [
                "p",
                "Ob 1,5 Prozent akzeptabel sind, bestimmt das vereinbarte Ziel."
              ],
              [
                "p",
                "Eine CPU-Spitze allein beweist keine Ursache. Weitere Messdaten sind nötig."
              ]
            ]
          }
        ]
      }
    ],
    [
      "h",
      "Mittelwert und Perzentil"
    ],
    [
      "p",
      "Das 95. Perzentil heißt p95. Mindestens etwa 95 Prozent der gemessenen Zeiten liegen darunter oder darauf. Der Mittelwert kann einzelne sehr langsame Anfragen verdecken. Vergleiche Messungen nur bei passenden Zeitfenstern und Lastprofilen."
    ],
    [
      "h",
      "Alarmplan"
    ],
    [
      "table",
      [
        "Feld",
        "Beispiel"
      ],
      [
        [
          "Bedingung",
          "Fehlerquote über 2 Prozent für fünf Minuten"
        ],
        [
          "Mindestmenge",
          "Mindestens 100 Anfragen im Fenster"
        ],
        [
          "Zuständigkeit",
          "Betriebsbereitschaft; bei Ausbleiben Eskalation"
        ],
        [
          "Information",
          "Dienst, Beginn, Quote, Messfenster, Dashboard und Runbook"
        ],
        [
          "Reaktion",
          "Abhängigkeiten prüfen; gegebenenfalls Rückfall auslösen"
        ],
        [
          "Entwarnung",
          "Quote liegt zehn Minuten unter 1 Prozent"
        ]
      ]
    ],
    [
      "note",
      "Hysterese bedeutet: Alarm und Entwarnung nutzen unterschiedliche Grenzen. Das verhindert ständiges Wechseln bei schwankenden Werten. Ein Runbook beschreibt konkrete Schritte für den Störungsfall."
    ],
    [
      "h",
      "Logs sinnvoll gestalten"
    ],
    [
      "code",
      "json",
      "{\"time\":\"2026-03-12T10:15:20Z\",\"level\":\"ERROR\",\"service\":\"auftrag\",\n \"requestId\":\"r-583\",\"code\":\"DB_TIMEOUT\",\"durationMs\":3000}"
    ],
    [
      "warn",
      "Keine Passwörter, Sitzungstokens oder vollständigen Kundendaten protokollieren. Freie Benutzereingaben können Logzeilen manipulieren. Verwende strukturierte Logs und begrenzte Felder."
    ],
    [
      "qa",
      "**Berechnen** Sie für 24.000 Anfragen in zehn Minuten den Durchsatz. 96 Anfragen scheitern. **Berechnen** Sie die Fehlerquote. Geben Sie Rechenwege und Einheiten an.",
      [
        "10 min × 60 = 600 s. 1 Punkt.",
        "24.000 / 600 = **40 Anfragen/s**. 1 Punkt.",
        "96 / 24.000 = 0,004. 1 Punkt.",
        "0,004 × 100 = **0,4 Prozent**. 1 Punkt."
      ],
      4
    ],
    [
      "qa",
      "Das Team erhält jede Minute denselben Alarm. Niemand fühlt sich zuständig. **Begründen** Sie drei Verbesserungen.",
      [
        "- Alarme bündeln, damit dieselbe Störung nicht ständig neu gemeldet wird.",
        "- Verantwortliche und Eskalationszeit festlegen, damit eine Person reagiert.",
        "- Runbook und Nutzerwirkung ergänzen, damit die Bearbeitung gezielt beginnt.",
        "Je begründeter Verbesserung 1 Punkt."
      ],
      3
    ],
    [
      "quiz",
      [
        {
          "q": "Was zeigt ein Trace?",
          "o": [
            "Den Weg einer Anfrage durch Dienste",
            "Nur die Festplattenkapazität",
            "Die Anzahl aller Benutzerkonten",
            "Eine Datensicherung"
          ],
          "a": 0,
          "e": "Traces zeigen Teilaufrufe und deren Dauer."
        },
        {
          "q": "Was schützt vor Alarmflattern?",
          "o": [
            "Unterschiedliche Grenzen für Alarm und Entwarnung",
            "Jede Sekunde neu alarmieren",
            "Alle Logs löschen",
            "Nur den Mittelwert messen"
          ],
          "a": 0,
          "e": "Das nennt man Hysterese."
        },
        {
          "q": "Was gilt für eine erfolgreiche Ping-Antwort?",
          "o": [
            "Sie beweist keine korrekte Geschäftslogik",
            "Sie beweist einen fehlerfreien Kaufprozess",
            "Sie prüft alle TLS-Zertifikate",
            "Sie ersetzt Anwendungstests"
          ],
          "a": 0,
          "e": "ICMP prüft keine fachlichen Ergebnisse."
        }
      ]
    ],
    [
      "see",
      [
        "infra-verfuegbarkeit",
        "infra-backup",
        "ps-itsm",
        "ps-cicd"
      ]
    ]
  ]
});
