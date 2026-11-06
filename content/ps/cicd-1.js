AP2.page('ps-cicd', {
  "b": "ps",
  "g": "Entwicklungsumgebungen",
  "t": "CI/CD: Pipeline, Freigabe, Deployment und Rückfall",
  "d": "Continuous Integration integriert Änderungen häufig und prüft sie automatisiert. Continuous Delivery hält geprüfte Software auslieferbar. Continuous Deployment spielt erfolgreiche Änderungen automatisch produktiv ein.",
  "m": "**Integration prüfen → Artefakt erstellen → ausliefern → Betrieb beobachten.** Deployment und fachliche Freigabe können getrennte Schritte sein.",
  "cheat": [
    [
      "Begriffe",
      [
        "Artefakt: versioniertes auslieferbares Ergebnis",
        "Pipeline: automatisierte Folge von Schritten",
        "Staging: produktionsähnliche Prüfumgebung",
        "Rollback: Rückkehr zu einem vorherigen Stand"
      ]
    ],
    [
      "Gates",
      [
        "Automatisierte Tests und Analyse",
        "Sicherheitsprüfungen und Review",
        "Nachvollziehbare Freigabe",
        "Gesundheitsprüfung nach dem Start"
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Eine sinnvolle Pipeline"
    ],
    [
      "table",
      [
        "Stufe",
        "Prüfung oder Ergebnis",
        "Bei Fehler"
      ],
      [
        [
          "Quellstand",
          "Version und Abhängigkeiten sind festgelegt",
          "Nicht weiter ausliefern"
        ],
        [
          "Schnelle Prüfungen",
          "Syntax, statische Analyse und Unit-Tests",
          "Entwicklung informiert"
        ],
        [
          "Build",
          "Versioniertes Artefakt mit Prüfsumme",
          "Kein unfertiges Artefakt nutzen"
        ],
        [
          "Integration",
          "Datenbank und externe Verträge prüfen",
          "Auslieferung stoppen"
        ],
        [
          "Staging",
          "Kritische Abläufe und Migration prüfen",
          "Fehler beheben"
        ],
        [
          "Freigabe",
          "Verantwortliche akzeptieren den geprüften Stand",
          "Warten oder verwerfen"
        ],
        [
          "Produktion",
          "Gesundheitsprüfung und Monitoring",
          "Rückfall oder gezielte Reparatur"
        ]
      ]
    ],
    [
      "p",
      "Die konkrete Reihenfolge hängt vom Projekt ab. Kleine, schnelle Prüfungen sollten früh laufen. Das geprüfte Artefakt wird möglichst unverändert weitergereicht. Eine neue Übersetzung kann sonst einen anderen Inhalt erzeugen."
    ],
    [
      "h",
      "Delivery und Deployment unterscheiden"
    ],
    [
      "table",
      [
        "Begriff",
        "Automatisiert",
        "Produktionsentscheidung"
      ],
      [
        [
          "Continuous Integration",
          "Integrieren und Prüfen",
          "Noch keine notwendige Auslieferung"
        ],
        [
          "Continuous Delivery",
          "Prüfen und auslieferbaren Stand vorbereiten",
          "Kann bewusst manuell freigegeben werden"
        ],
        [
          "Continuous Deployment",
          "Auch produktive Auslieferung nach erfolgreichen Prüfungen",
          "Automatisch durch definierte Regeln"
        ]
      ]
    ],
    [
      "h",
      "Deployment-Strategien"
    ],
    [
      "table",
      [
        "Strategie",
        "Ablauf",
        "Abwägung"
      ],
      [
        [
          "Rolling",
          "Instanzen schrittweise ersetzen",
          "Spart Zusatzkapazität; alte und neue Version laufen gleichzeitig"
        ],
        [
          "Blue-Green",
          "Zwei Umgebungen; Verkehr auf neue Version umschalten",
          "Schneller Wechsel; mehr Kapazität und gemeinsame Daten beachten"
        ],
        [
          "Canary",
          "Zunächst kleiner Anteil des Verkehrs auf neue Version",
          "Risiko begrenzen; Messung und Routing erforderlich"
        ]
      ]
    ],
    [
      "h",
      "Datenänderungen können Rollbacks verhindern"
    ],
    [
      "p",
      "Version zwei entfernt eine Spalte. Version eins benötigt diese Spalte noch. Ein Zurückschalten des Programms reicht dann nicht. Datenbankänderungen müssen mit dem Rückfallplan vereinbar sein."
    ],
    [
      "steps",
      [
        "Neue Spalte ergänzen, ohne die alte sofort zu entfernen.",
        "Kompatiblen Anwendungscode ausliefern.",
        "Bestehende Daten kontrolliert übertragen und prüfen.",
        "Nutzung umstellen und beobachten.",
        "Alte Struktur erst nach der Übergangszeit entfernen."
      ]
    ],
    [
      "note",
      "Dieses Vorgehen heißt Expand–Migrate–Contract. Rückfälle müssen auch Daten und zwischenzeitliche Schreibzugriffe berücksichtigen. Ein Datenbank-Backup zurückzuspielen kann neue Geschäftsdaten verlieren."
    ],
    [
      "h",
      "Geprüfte Rückfallentscheidung"
    ],
    [
      "table",
      [
        "Signal",
        "Beispiel für eine vorher vereinbarte Regel"
      ],
      [
        [
          "Fehlerquote",
          "Über zwei Prozent für fünf Minuten"
        ],
        [
          "Kritischer Ablauf",
          "Reservierung scheitert beim Smoke-Test"
        ],
        [
          "Datenintegrität",
          "Bestand wird negativ"
        ],
        [
          "Verantwortung",
          "Betriebsverantwortliche Person entscheidet nach Runbook"
        ],
        [
          "Nachweis",
          "Version, Zeitpunkt, Messwerte und Entscheidung protokollieren"
        ]
      ]
    ],
    [
      "warn",
      "Grüne Tests beweisen keine vollständige Fehlerfreiheit. Pipeline-Zugangsdaten benötigen minimale Rechte. Ungeprüfte Fremdänderungen dürfen keine produktiven Secrets erhalten."
    ],
    [
      "qa",
      "**Unterscheiden** Sie Continuous Integration, Delivery und Deployment mit je einer Aussage.",
      [
        "CI integriert und prüft Änderungen häufig automatisiert.",
        "Delivery hält einen geprüften Stand jederzeit auslieferbar; die Produktionsfreigabe kann manuell sein.",
        "Deployment liefert erfolgreiche Änderungen automatisch produktiv aus.",
        "Je zutreffender Abgrenzung 1 Punkt."
      ],
      3
    ],
    [
      "qa",
      "Nach einem Update steigt die Fehlerquote. Die neue Version hat eine Spalte gelöscht. **Erläutern** Sie das Rollback-Problem. **Nennen** Sie drei vorbereitende Maßnahmen.",
      [
        "Die alte Programmversion kann mit der veränderten Datenbank scheitern. 1 Punkt.",
        "Kompatible Datenbankmigrationen mit Übergangsphase planen. 1 Punkt.",
        "Rollback und Datenwiederherstellung vorher in Staging prüfen. 1 Punkt.",
        "Messbare Rückfallkriterien und eine verantwortliche Person festlegen. 1 Punkt."
      ],
      4
    ],
    [
      "quiz",
      [
        {
          "q": "Was ist ein Artefakt?",
          "o": [
            "Ein versioniertes auslieferbares Ergebnis",
            "Nur eine ungespeicherte Idee",
            "Ein Produktionspasswort",
            "Ein Besprechungstermin"
          ],
          "a": 0,
          "e": "Beispiele sind Pakete oder Container-Images."
        },
        {
          "q": "Was kennzeichnet Canary Deployment?",
          "o": [
            "Zunächst nur ein kleiner Verkehrsanteil nutzt die neue Version",
            "Alle alten Daten werden sofort gelöscht",
            "Es gibt keine Überwachung",
            "Nur die Dokumentation ändert sich"
          ],
          "a": 0,
          "e": "So kann das Team Auffälligkeiten vor einer breiten Auslieferung erkennen."
        },
        {
          "q": "Was ist ein Smoke-Test nach dem Deployment?",
          "o": [
            "Kurze Prüfung zentraler Funktionen",
            "Eine vollständige Anforderungserhebung",
            "Nur ein Quelltextvergleich",
            "Ein Hardware-Stresstest mit Hitze"
          ],
          "a": 0,
          "e": "Er prüft, ob wesentliche Abläufe grundsätzlich funktionieren."
        }
      ]
    ],
    [
      "see",
      [
        "ps-git",
        "ps-testarten",
        "infra-container",
        "infra-monitoring",
        "ps-migration",
        "ps-abnahme"
      ]
    ]
  ]
});
