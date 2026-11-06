AP2.page('ps-migration', {
  "b": "ps",
  "g": "Datenbanken",
  "t": "Datenmigration: Mapping, Probelauf, Abgleich und Umstellung",
  "d": "Eine Migration überführt Daten in ein neues System. Formate, Schlüssel und Fachbedeutungen müssen zusammenpassen. Ein erfolgreicher Import allein beweist noch keine korrekte Migration.",
  "m": "**Extrahieren → umformen → laden → fachlich abgleichen.** Vor der Umstellung braucht das Team einen Rückfallplan und klare Freigabekriterien.",
  "cheat": [
    [
      "Vorbereitung",
      [
        "Quellen, Datenmenge und Verantwortliche klären.",
        "Felder und Regeln zuordnen: Mapping.",
        "Dubletten und ungültige Werte behandeln.",
        "Probelauf mit realistischen Daten durchführen."
      ]
    ],
    [
      "Kontrolle",
      [
        "Anzahlen und Summen vergleichen.",
        "Schlüsselbeziehungen prüfen.",
        "Fehlerlisten bearbeiten.",
        "Fachliche Stichproben und Abschlussfreigabe dokumentieren."
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Szenario: Kundendaten übernehmen"
    ],
    [
      "table",
      [
        "Altsystem",
        "Zielsystem",
        "Umwandlungsregel"
      ],
      [
        [
          "KundenNr",
          "kunde_id",
          "Alte ID über Zuordnungstabelle auf neue ID abbilden"
        ],
        [
          "NameKomplett",
          "anzeigename",
          "Nicht unkontrolliert in Vorname und Nachname zerlegen"
        ],
        [
          "UmsatzCent",
          "umsatz_euro",
          "Durch 100 teilen; exakt als Dezimalzahl verarbeiten"
        ],
        [
          "Aktiv: J/N",
          "aktiv: Boolean",
          "J → wahr; N → falsch; andere Werte in Fehlerliste"
        ],
        [
          "Datum: TT.MM.JJJJ",
          "Datum: JJJJ-MM-TT",
          "Kalenderdatum prüfen und umformatieren"
        ]
      ]
    ],
    [
      "h",
      "ETL erklären"
    ],
    [
      "list",
      [
        "Extract: Quelldaten kontrolliert lesen.",
        "Transform: Daten nach dokumentierten Regeln bereinigen und umformen.",
        "Load: Daten mit passenden Schlüsseln in das Ziel laden.",
        "Für jeden Schritt Anzahl, Version und Fehler protokollieren."
      ]
    ],
    [
      "h",
      "Fehler transparent behandeln"
    ],
    [
      "p",
      "Die Quelle enthält 12.000 Kundensätze. 300 zusätzliche Dublettensätze werden regelbasiert zusammengeführt. 120 andere Sätze fehlen Pflichtdaten. Diese 120 Sätze werden zurückgestellt. Die Gruppen überschneiden sich laut Anlage nicht."
    ],
    [
      "walk",
      {
        "t": "Erwartete Zielanzahl",
        "steps": [
          {
            "t": "Dubletten berücksichtigen",
            "b": [
              [
                "p",
                "12.000 − 300 zusätzliche Dublettensätze = **11.700 eindeutige Datensätze**."
              ]
            ]
          },
          {
            "t": "Zurückgestellte Fälle abziehen",
            "b": [
              [
                "p",
                "11.700 − 120 = **11.580 geladene Datensätze**."
              ]
            ]
          },
          {
            "t": "Vollständigkeit nachweisen",
            "b": [
              [
                "p",
                "11.580 + 300 + 120 = **12.000 Quellsätze**."
              ],
              [
                "p",
                "Die 120 offenen Fälle bleiben mit Grund und Zuständigkeit dokumentiert."
              ]
            ]
          }
        ]
      }
    ],
    [
      "warn",
      "Dubletten dürfen nicht ohne fachliche Regel gelöscht werden. Zwei gleiche Namen können verschiedene Personen bezeichnen. Fremdschlüssel aus Bestellungen müssen auf die richtige neue Kunden-ID zeigen."
    ],
    [
      "h",
      "Kontrollen kombinieren"
    ],
    [
      "table",
      [
        "Kontrolle",
        "Findet",
        "Findet allein nicht sicher"
      ],
      [
        [
          "Anzahlvergleich",
          "Fehlende oder zusätzliche Sätze",
          "Vertauschte Werte bei gleicher Anzahl"
        ],
        [
          "Summenvergleich",
          "Abweichende Gesamtbeträge",
          "Gegenseitig ausgleichende Fehler"
        ],
        [
          "Referenzprüfung",
          "Verwaiste Fremdschlüssel",
          "Fachlich falsche, aber existierende Zuordnung"
        ],
        [
          "Stichprobe",
          "Fachliche Fehler in ausgewählten Fällen",
          "Jeden Fehler im Gesamtbestand"
        ],
        [
          "Vollständiger Feldvergleich nach Mapping",
          "Abweichungen der verglichenen Inhalte",
          "Fehlerhafte Mapping-Vorgaben"
        ]
      ]
    ],
    [
      "h",
      "Umstellungsplan"
    ],
    [
      "table",
      [
        "Schritt",
        "Warum nötig?"
      ],
      [
        [
          "Probelauf und Laufzeit messen",
          "Zeitfenster und Fehler vorher kennen"
        ],
        [
          "Schreibsperre oder kontrollierte Deltaübernahme",
          "Änderungen während des Exports nicht verlieren"
        ],
        [
          "Letzte Sicherung und Wiederherstellung prüfen",
          "Rückkehr zu konsistentem Zustand ermöglichen"
        ],
        [
          "Import und Abgleich durchführen",
          "Korrekte Datenübernahme nachweisen"
        ],
        [
          "Go-/No-Go-Entscheidung treffen",
          "Freigabe an messbare Kriterien binden"
        ],
        [
          "Neues System öffnen und überwachen",
          "Fehler früh erkennen"
        ],
        [
          "Altbestand kontrolliert vorhalten",
          "Nachfragen und Rückfall ermöglichen"
        ]
      ]
    ],
    [
      "p",
      "Eine Deltaübernahme überträgt nur Änderungen seit einem definierten Stand. Sie benötigt eine verlässliche Änderungserkennung. Löschungen und mehrfache Änderungen müssen ebenfalls berücksichtigt werden."
    ],
    [
      "tip",
      "**Entwerfen** verlangt einen ausführbaren Ablauf mit Kontrollen. **Berechnen** verlangt Zwischenschritte und eine erkennbare Mengenbilanz."
    ],
    [
      "qa",
      "**Berechnen** Sie die Zielanzahl aus der Anlage. **Nennen** Sie zwei zusätzliche Qualitätsprüfungen.",
      [
        "12.000 − 300 − 120 = **11.580**. 1 Punkt.",
        "Bilanz: 11.580 geladen + 300 zusammengeführt + 120 zurückgestellt = 12.000. 1 Punkt.",
        "Summen nach dokumentierter Cent-Euro-Umrechnung vergleichen. 1 Punkt.",
        "Fremdschlüssel der Bestellungen auf neue Kunden-IDs prüfen. 1 Punkt."
      ],
      4
    ],
    [
      "qa",
      "Während des Exports können Kunden weiter Bestellungen erfassen. **Erläutern** Sie das Risiko. **Nennen** Sie zwei Lösungen und einen Rückfallaspekt.",
      [
        "Änderungen nach dem Exportstand können im neuen System fehlen. 1 Punkt.",
        "Lösung: vereinbarte Schreibpause mit klarer Kommunikation. 1 Punkt.",
        "Alternativ: konsistenter Export und kontrollierte Deltaübernahme. 1 Punkt.",
        "Rückfall muss auch neue Schreibzugriffe nach der Umstellung erhalten oder kontrolliert zurückübertragen. 1 Punkt."
      ],
      4
    ],
    [
      "quiz",
      [
        {
          "q": "Was beschreibt ein Mapping?",
          "o": [
            "Die Zuordnung und Umwandlung von Quell- zu Zielfeldern",
            "Nur die Anzahl der Server",
            "Eine Bilddatei",
            "Ein Backup-Passwort"
          ],
          "a": 0,
          "e": "Mapping legt auch Einheiten und Bedeutungen fest."
        },
        {
          "q": "Reicht ein gleicher Zeilenzähler als Nachweis?",
          "o": [
            "Nein, Werte können trotzdem falsch sein",
            "Ja, immer",
            "Ja, wenn die Datei groß ist",
            "Nur ohne Fremdschlüssel"
          ],
          "a": 0,
          "e": "Ergänze Inhalts-, Summen- und Beziehungskontrollen."
        },
        {
          "q": "Was bedeutet Deltaübernahme?",
          "o": [
            "Änderungen seit einem definierten Stand übernehmen",
            "Jedes Mal nur die erste Zeile übernehmen",
            "Alle Schlüssel löschen",
            "Nur das neue Programm kopieren"
          ],
          "a": 0,
          "e": "Auch gelöschte Datensätze und wiederholte Änderungen müssen geregelt werden."
        }
      ]
    ],
    [
      "see",
      [
        "ps-dbzugriff",
        "ps-schnittstellen",
        "ps-abnahme",
        "infra-backup",
        "ps-risiko"
      ]
    ]
  ]
});
