AP2.page('ps-abnahme', {
  "b": "ps",
  "g": "Qualitätssicherung",
  "t": "Abnahme und Übergabe: Kriterien, Nachweise und Betriebsbereitschaft",
  "d": "Die fachliche Abnahme bewertet die vereinbarten Ergebnisse. Die Übergabe macht den geregelten Betrieb möglich. Beide Schritte brauchen klare Kriterien, Verantwortliche und nachvollziehbare Nachweise.",
  "m": "**Abnahme prüft vereinbarte Ergebnisse. Übergabe sichert den Betrieb.** Ein erfolgreiches Deployment allein ersetzt beide Schritte nicht.",
  "cheat": [
    [
      "Vorbereitung",
      [
        "Abnahmekriterien und Zuständigkeit früh vereinbaren.",
        "Testumgebung, Daten und Version festhalten.",
        "Offene Befunde nach vereinbarten Regeln bewerten."
      ]
    ],
    [
      "Übergabe",
      [
        "Dokumentation und Schulung",
        "Zugänge und Berechtigungen",
        "Monitoring, Backup und Wiederherstellung",
        "Support, Eskalation und Wartungsverantwortung"
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Szenario: Reservierungssoftware"
    ],
    [
      "p",
      "Die Lagerleitung prüft fachliche Kriterien. Der Betrieb prüft Wiederherstellung und Überwachung. Das Team dokumentiert den geprüften Stand. Eine spätere Version braucht passende neue Nachweise."
    ],
    [
      "table",
      [
        "Kriterium",
        "Nachweis",
        "Ergebnis"
      ],
      [
        [
          "Keine Überbuchung",
          "Paralleltest mit zwei Reservierungen",
          "Bestanden"
        ],
        [
          "p95 unter einer Sekunde bei 100 Nutzern",
          "Lasttest mit freigegebenem Datenbestand",
          "0,82 Sekunden"
        ],
        [
          "Wiederanlauf innerhalb von 60 Minuten",
          "Dokumentierte Wiederherstellungsprobe",
          "48 Minuten"
        ],
        [
          "Bedienung durch geschulte Lagerkraft",
          "Drei vorgegebene Arbeitsabläufe",
          "Ein offener Befund"
        ]
      ]
    ],
    [
      "h",
      "Ein Abnahmeprotokoll strukturieren"
    ],
    [
      "table",
      [
        "Feld",
        "Beispiel"
      ],
      [
        [
          "Gegenstand",
          "Reservierungssoftware, Version 2.3; Dokumentstand 7"
        ],
        [
          "Beteiligte",
          "Auftraggebende Fachseite und verantwortliches Projektteam"
        ],
        [
          "Grundlage",
          "Vereinbarte Anforderungen und Testfälle"
        ],
        [
          "Umgebung",
          "Staging mit definierten Testdaten und Konfiguration"
        ],
        [
          "Ergebnisse",
          "Bestandene Tests und belegte Abweichungen"
        ],
        [
          "Offene Punkte",
          "Befundnummer, Auswirkung, Maßnahme, Zuständigkeit, Termin"
        ],
        [
          "Entscheidung",
          "Freigabe nach vereinbartem Verfahren oder Nachprüfung"
        ],
        [
          "Bestätigung",
          "Datum und dokumentierte Zustimmung zuständiger Personen"
        ]
      ]
    ],
    [
      "note",
      "Diese Seite behandelt den fachlichen Ablauf. Vertragliche Rechtsfolgen richten sich nach dem konkreten Vertrag. Eine technische Fehlerklasse ist keine automatische rechtliche Bewertung."
    ],
    [
      "h",
      "Befunde bewerten"
    ],
    [
      "table",
      [
        "Befund",
        "Auswirkung",
        "Mögliche Entscheidung nach vereinbarten Kriterien"
      ],
      [
        [
          "Reservierung erzeugt negativen Bestand",
          "Zentrale Geschäftsregel verletzt",
          "Freigabe stoppen und nachtesten"
        ],
        [
          "Hilfetext enthält Schreibfehler",
          "Kernfunktion weiterhin nutzbar",
          "Mit Termin zur Korrektur dokumentieren"
        ],
        [
          "Backup wurde nie zurückgespielt",
          "Wiederherstellbarkeit nicht nachgewiesen",
          "Betriebsfreigabe bis zum Nachweis zurückstellen"
        ]
      ]
    ],
    [
      "h",
      "Betriebsübergabe als Checkliste"
    ],
    [
      "list",
      [
        "Installations- und Konfigurationsanleitung mit Versionsstand bereitstellen.",
        "Betriebshandbuch mit Start, Stopp und Diagnose übergeben.",
        "Rollen, technische Konten und Geheimnisse sicher übertragen.",
        "Backupplan und geprüften Restore-Ablauf dokumentieren.",
        "Alarmierung mit Bereitschaft und Eskalation einrichten.",
        "Supportkontakt und Wartungszuständigkeit festlegen.",
        "Nutzer schulen und kurze Hilfe bereitstellen.",
        "Offene Punkte mit Verantwortlichen und Terminen verfolgen."
      ]
    ],
    [
      "h",
      "Messbare Freigabekriterien"
    ],
    [
      "p",
      "Ein Kriterium kann lauten: Alle priorisierten Kernabläufe bestehen den Abnahmetest. Kein Befund der vereinbarten höchsten Fehlerklasse bleibt offen. Die Wiederherstellungsprobe erfüllt das RTO. Die zuständigen Personen bestätigen die Nachweise."
    ],
    [
      "warn",
      "„Keine Fehler gemeldet“ beweist keine Fehlerfreiheit. Eine Abnahmeprüfung deckt nur ihre festgelegten Bedingungen ab. Offene Punkte brauchen eine bewusste Entscheidung, keine stille Übernahme."
    ],
    [
      "tip",
      "**Beurteilen** heißt: Kriterien anwenden und eine begründete Entscheidung treffen. **Nennen** heißt: kurze, passende Angaben reichen."
    ],
    [
      "qa",
      "Die Oberfläche funktioniert. Es gibt keine Restore-Probe und keinen Supportkontakt. **Beurteilen** Sie die Betriebsbereitschaft. **Nennen** Sie zwei fehlende Nachweise.",
      [
        "Die Oberfläche allein belegt keinen geregelten Betrieb. 1 Punkt.",
        "Die Wiederherstellungsprobe muss zeigen, dass vereinbarte Wiederanlaufziele erreichbar sind. 1 Punkt.",
        "Ein benannter Supportkontakt mit Eskalationsweg muss Störungen übernehmen können. 1 Punkt."
      ],
      3
    ],
    [
      "qa",
      "Ein kritischer Paralleltest scheitert. Alle anderen Tests bestehen. **Begründen** Sie eine Entscheidung. **Nennen** Sie drei nächste Schritte.",
      [
        "Keine Freigabe nach dem Kriterium „keine Überbuchung“, weil eine zentrale Geschäftsregel verletzt wird. 1 Punkt.",
        "Fehler mit Daten, Version und Schritten dokumentieren. 1 Punkt.",
        "Korrektur durch eine verantwortliche Person terminieren. 1 Punkt.",
        "Fehlerfall und betroffene Regressionstests erneut ausführen. 1 Punkt."
      ],
      4
    ],
    [
      "quiz",
      [
        {
          "q": "Was gehört in ein Abnahmeprotokoll?",
          "o": [
            "Geprüfte Version und konkrete Ergebnisse",
            "Nur ein Logo",
            "Nur die private Telefonnummer aller Entwickler",
            "Nur ein pauschales Lob"
          ],
          "a": 0,
          "e": "Der Nachweis muss eindeutig zum geprüften Stand gehören."
        },
        {
          "q": "Was ist für die Betriebsübergabe wichtig?",
          "o": [
            "Alarmierung und Zuständigkeit",
            "Nur der Quelltext als Ausdruck",
            "Nur die Farbauswahl",
            "Keine Dokumentation"
          ],
          "a": 0,
          "e": "Störungen benötigen eine handlungsfähige Zuständigkeit."
        },
        {
          "q": "Wie behandelt man offene Punkte?",
          "o": [
            "Mit Auswirkung, Verantwortung und Termin dokumentieren",
            "Aus dem Protokoll löschen",
            "Ohne Prüfung als bestanden markieren",
            "Nur mündlich vergessen"
          ],
          "a": 0,
          "e": "Die Entscheidung muss nach vereinbarten Kriterien nachvollziehbar bleiben."
        }
      ]
    ],
    [
      "see",
      [
        "ps-anforderungen",
        "ps-testentwurf",
        "ps-verifikation",
        "ps-itsm",
        "infra-backup",
        "ps-aenderungen"
      ]
    ]
  ]
});
