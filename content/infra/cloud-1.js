AP2.page('infra-cloud', {
  "b": "infra",
  "g": "Server und Virtualisierung",
  "t": "Cloud-Entscheidungen: Verantwortung, Skalierung und Kosten",
  "d": "Cloud-Dienste stellen IT-Ressourcen bedarfsgerecht bereit. Der Leistungsumfang unterscheidet sich nach Servicemodell. Technische Verantwortung und Kosten müssen vor dem Einsatz klar sein.",
  "m": "**Auslagern ändert Aufgaben und Abhängigkeiten.** Auch bei SaaS bleiben Benutzerrechte, Daten und fachliche Kontrollen wichtig.",
  "cheat": [
    [
      "Modelle",
      [
        "IaaS: Infrastruktur mieten",
        "PaaS: Anwendung auf verwalteter Plattform betreiben",
        "SaaS: fertige Anwendung nutzen"
      ]
    ],
    [
      "Entscheidung",
      [
        "Lastprofil und Verfügbarkeitsziel nennen.",
        "Laufende Kosten einschließlich Datenverkehr rechnen.",
        "Verantwortung für Updates und Wiederherstellung festlegen.",
        "Ausstieg und Datenexport vorab planen."
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Geteilte Verantwortung"
    ],
    [
      "table",
      [
        "Aufgabe",
        "IaaS",
        "PaaS",
        "SaaS"
      ],
      [
        [
          "Physische Infrastruktur",
          "Anbieter",
          "Anbieter",
          "Anbieter"
        ],
        [
          "Gastbetriebssystem pflegen",
          "Kunde",
          "Anbieter",
          "Anbieter"
        ],
        [
          "Eigene Anwendung entwickeln und patchen",
          "Kunde",
          "Kunde",
          "Anbieter bei der Standardanwendung"
        ],
        [
          "Benutzerrechte und Datenfreigaben",
          "Kunde konfiguriert",
          "Kunde konfiguriert",
          "Kunde konfiguriert"
        ],
        [
          "Backup und Wiederherstellung",
          "Umfang vereinbaren und prüfen",
          "Umfang vereinbaren und prüfen",
          "Umfang vereinbaren und prüfen"
        ]
      ]
    ],
    [
      "p",
      "Der konkrete Vertrag und Dienst bestimmen die genaue Zuständigkeit. „Anbieter übernimmt die Infrastruktur“ bedeutet keine vollständige Sicherung aller Kundendaten."
    ],
    [
      "h",
      "Bereitstellungsformen"
    ],
    [
      "table",
      [
        "Form",
        "Bedeutung",
        "Entscheidungsfrage"
      ],
      [
        [
          "Public Cloud",
          "Anbieter stellt Dienste mehreren Kunden bereit",
          "Welche Isolation und Konfiguration sind nötig?"
        ],
        [
          "Private Cloud",
          "Cloud-Infrastruktur nur für eine Organisation",
          "Wer betreibt und bezahlt die Kapazität?"
        ],
        [
          "Hybrid Cloud",
          "Private und öffentliche Umgebungen sind verbunden",
          "Wie bleiben Identitäten, Netze und Daten konsistent?"
        ]
      ]
    ],
    [
      "h",
      "Skalieren"
    ],
    [
      "table",
      [
        "Begriff",
        "Maßnahme",
        "Grenze"
      ],
      [
        [
          "Vertikal",
          "Mehr CPU oder RAM pro Instanz",
          "Maximale Größe und möglicher Neustart"
        ],
        [
          "Horizontal",
          "Weitere Instanzen ergänzen",
          "Anwendung muss parallelen Betrieb erlauben"
        ],
        [
          "Elastisch",
          "Kapazität passend zur Last erhöhen und senken",
          "Regeln, Startzeit und Kostenbegrenzung nötig"
        ]
      ]
    ],
    [
      "warn",
      "Mehr Webserver beheben keine gesperrte Datenbanktabelle. Sitzungen und lokale Dateien können horizontale Skalierung erschweren. Zustandslose Verarbeitung vereinfacht sie."
    ],
    [
      "h",
      "Monatskosten mit Anlage berechnen"
    ],
    [
      "table",
      [
        "Position",
        "Menge",
        "Nettopreis"
      ],
      [
        [
          "VM-Grundlast",
          "2 Instanzen × 720 Stunden",
          "0,08 Euro je Instanzstunde"
        ],
        [
          "Zusätzliche Spitzenlast",
          "2 Instanzen × 60 Stunden",
          "0,08 Euro je Instanzstunde"
        ],
        [
          "Speicher",
          "200 GB-Monate",
          "0,10 Euro je GB-Monat"
        ],
        [
          "Ausgehende Daten",
          "300 GB",
          "0,07 Euro je GB"
        ],
        [
          "Monitoring",
          "Pauschal",
          "15 Euro"
        ]
      ]
    ],
    [
      "walk",
      {
        "t": "Kosten ohne Umsatzsteuer",
        "steps": [
          {
            "t": "Rechenleistung",
            "b": [
              [
                "p",
                "Grundlast: 2 × 720 × 0,08 = **115,20 Euro**."
              ],
              [
                "p",
                "Spitzenlast: 2 × 60 × 0,08 = **9,60 Euro**."
              ]
            ]
          },
          {
            "t": "Weitere Kosten",
            "b": [
              [
                "p",
                "Speicher: 200 × 0,10 = **20 Euro**."
              ],
              [
                "p",
                "Datenverkehr: 300 × 0,07 = **21 Euro**."
              ]
            ]
          },
          {
            "t": "Summe",
            "b": [
              [
                "p",
                "115,20 + 9,60 + 20 + 21 + 15 = **180,80 Euro netto**."
              ],
              [
                "p",
                "Preise sind reine Aufgabenwerte. Kosten für Support und Sicherungen sind nicht enthalten."
              ]
            ]
          }
        ]
      }
    ],
    [
      "h",
      "Anwendungsfall beurteilen"
    ],
    [
      "p",
      "Ein Ticketsystem hat eine vorhersehbare Grundlast. Bei Veranstaltungen steigt die Last kurz stark an. Eine verwaltete Plattform reduziert Betriebsaufwand. Datenbankgrenzen und Startzeiten müssen durch Lasttests geprüft werden."
    ],
    [
      "steps",
      [
        "Fachliche Ziele und technische Randbedingungen festhalten.",
        "Verantwortungsmatrix für Rechte, Updates, Backups und Störungen erstellen.",
        "Kosten bei Normalbetrieb und Spitzenlast berechnen.",
        "Lasttest und Wiederherstellungsprobe durchführen.",
        "Exportformat und Rückkehrplan dokumentieren."
      ]
    ],
    [
      "qa",
      "**Beurteilen** Sie horizontale Skalierung für eine Anwendung mit lokalen Sitzungen. Nennen Sie Problem, Lösung und verbleibende Grenze.",
      [
        "Problem: Eine andere Instanz kennt die lokal gespeicherte Sitzung nicht. 1 Punkt.",
        "Lösung: Sitzungszustand in einem passenden gemeinsamen Dienst speichern oder geeignete zustandslose Tokens verwenden. 1 Punkt.",
        "Grenze: Der gemeinsame Sitzungsdienst oder die Datenbank kann selbst zum Engpass werden. 1 Punkt."
      ],
      3
    ],
    [
      "qa",
      "Die Spitzenlast dauert statt 60 nun 160 Stunden. Alle anderen Angaben bleiben gleich. **Berechnen** Sie Mehrkosten und neue Gesamtkosten.",
      [
        "Zusätzliche Dauer: 160 − 60 = **100 Stunden**. 1 Punkt.",
        "Mehrkosten: 2 × 100 × 0,08 = **16 Euro**. 1 Punkt.",
        "Neue Summe: 180,80 + 16 = **196,80 Euro netto**. 1 Punkt."
      ],
      3
    ],
    [
      "quiz",
      [
        {
          "q": "Was ist horizontale Skalierung?",
          "o": [
            "Weitere Instanzen ergänzen",
            "Mehr RAM in eine Instanz einbauen",
            "Nur den Tarif umbenennen",
            "Backups löschen"
          ],
          "a": 0,
          "e": "Vertikale Skalierung vergrößert eine einzelne Instanz."
        },
        {
          "q": "Was bleibt auch bei SaaS eine wichtige Kundenaufgabe?",
          "o": [
            "Benutzerrechte passend vergeben",
            "Serverlüfter tauschen",
            "Anbietergebäude reinigen",
            "Hypervisor selbst installieren"
          ],
          "a": 0,
          "e": "Falsche Freigaben können auch eine sichere Plattform gefährden."
        },
        {
          "q": "Was gehört in einen Cloud-Kostenvergleich?",
          "o": [
            "Auch Speicher, Datenverkehr und Betriebsaufwand",
            "Nur der kleinste VM-Preis",
            "Nur die Zahl der Benutzer",
            "Nur ein kostenloser Probemonat"
          ],
          "a": 0,
          "e": "Vergleiche den gesamten benötigten Leistungsumfang."
        }
      ]
    ],
    [
      "see",
      [
        "infra-virtualisierung",
        "infra-container",
        "infra-verfuegbarkeit",
        "ps-tco",
        "ps-nutzwert"
      ]
    ]
  ]
});
