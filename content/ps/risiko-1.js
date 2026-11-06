AP2.page('ps-risiko', {
  "b": "ps",
  "g": "Projektmanagement",
  "t": "Projektrisiken: Bewerten, Maßnahmen planen und kontrollieren",
  "d": "Ein Risiko ist ein unsicheres Ereignis mit möglichen Auswirkungen. Es kann Kosten, Termine oder Qualität gefährden. Risikomanagement erkennt Risiken früh und legt passende Maßnahmen fest.",
  "m": "**Risiko: könnte eintreten. Problem: ist bereits eingetreten.** Zu jeder Maßnahme gehören Verantwortung, Termin und Kontrolle.",
  "cheat": [
    [
      "Risikoregister",
      [
        "Ursache und mögliches Ereignis",
        "Eintrittswahrscheinlichkeit und Auswirkung",
        "Vorbeugung und Notfallmaßnahme",
        "Verantwortliche Person und Auslöser"
      ]
    ],
    [
      "Strategien",
      [
        "Vermeiden",
        "Vermindern",
        "Übertragen oder teilen",
        "Bewusst akzeptieren"
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Risiken konkret beschreiben"
    ],
    [
      "p",
      "„Der Termin ist gefährdet“ ist zu ungenau. Besser: Die Fremdschnittstelle könnte drei Wochen verspätet bereitstehen. Dadurch könnte die Integration den Abnahmetermin verschieben."
    ],
    [
      "table",
      [
        "Risiko",
        "Wahrscheinlichkeit",
        "Schaden bei Eintritt",
        "Erwartungswert"
      ],
      [
        [
          "R1: Schnittstelle verspätet",
          "30 Prozent",
          "20.000 Euro",
          "6.000 Euro"
        ],
        [
          "R2: Testdaten unbrauchbar",
          "50 Prozent",
          "4.000 Euro",
          "2.000 Euro"
        ],
        [
          "R3: Fachperson fällt aus",
          "10 Prozent",
          "30.000 Euro",
          "3.000 Euro"
        ]
      ]
    ],
    [
      "p",
      "Der monetäre Erwartungswert ist Wahrscheinlichkeit mal Schaden. Er ist ein Planungswert. Er sagt nicht, dass genau dieser Betrag entstehen wird. Schäden dürfen nur mit passenden Annahmen zusammengefasst werden."
    ],
    [
      "walk",
      {
        "t": "Maßnahme gegen R1 bewerten",
        "steps": [
          {
            "t": "Ausgangswert",
            "b": [
              [
                "p",
                "0,30 × 20.000 Euro = **6.000 Euro**."
              ]
            ]
          },
          {
            "t": "Maßnahme einbeziehen",
            "b": [
              [
                "p",
                "Ein früher Prototyp kostet 1.500 Euro. Laut Aufgabe sinkt die Wahrscheinlichkeit auf zehn Prozent."
              ],
              [
                "p",
                "Neuer erwarteter Schaden: 0,10 × 20.000 = **2.000 Euro**."
              ]
            ]
          },
          {
            "t": "Gesamtwirkung beurteilen",
            "b": [
              [
                "p",
                "Maßnahme plus Restrisiko: 1.500 + 2.000 = **3.500 Euro**."
              ],
              [
                "p",
                "Erwartete Verbesserung: 6.000 − 3.500 = **2.500 Euro**."
              ]
            ]
          }
        ]
      }
    ],
    [
      "h",
      "Maßnahmen unterscheiden"
    ],
    [
      "table",
      [
        "Strategie",
        "Beispiel",
        "Grenze"
      ],
      [
        [
          "Vermeiden",
          "Ungeprüfte Zusatzfunktion aus dem Lieferumfang entfernen",
          "Benötigter Nutzen entfällt möglicherweise"
        ],
        [
          "Vermindern",
          "Prototyp und frühe Schnittstellentests",
          "Restrisiko bleibt"
        ],
        [
          "Übertragen oder teilen",
          "Versicherung oder vereinbarte Haftung eines Partners",
          "Ausfallfolgen und Abhängigkeit bleiben teilweise"
        ],
        [
          "Akzeptieren",
          "Kleines Risiko bewusst tragen und Reserve einplanen",
          "Entscheidung und Auslöser dokumentieren"
        ]
      ]
    ],
    [
      "h",
      "Bewertung ohne belastbare Eurobeträge"
    ],
    [
      "p",
      "Eine Risikomatrix ordnet Wahrscheinlichkeit und Auswirkung auf Skalen ein. Beispiel: eins bedeutet gering, drei bedeutet hoch. Ein Produkt aus Skalenwerten ist ein Prioritätswert. Es ist kein Eurobetrag."
    ],
    [
      "table",
      [
        "Auswirkung / Wahrscheinlichkeit",
        "1 gering",
        "2 mittel",
        "3 hoch"
      ],
      [
        [
          "3 hoch",
          "3",
          "6",
          "9"
        ],
        [
          "2 mittel",
          "2",
          "4",
          "6"
        ],
        [
          "1 gering",
          "1",
          "2",
          "3"
        ]
      ]
    ],
    [
      "warn",
      "Seltene Risiken können existenzbedrohlich sein. Ein kleiner Erwartungswert allein rechtfertigt keine Annahme solcher Risiken. Bewerte auch Sicherheit, Abhängigkeiten und nichtmonetäre Folgen."
    ],
    [
      "h",
      "Risikoregister im Betrieb"
    ],
    [
      "table",
      [
        "Feld",
        "R1: Fremdschnittstelle"
      ],
      [
        [
          "Vorbeugung",
          "Testversion bis 10. Juni gemeinsam prüfen"
        ],
        [
          "Verantwortung",
          "Integrationsverantwortliche Person"
        ],
        [
          "Frühwarnzeichen",
          "Vereinbarte Testversion fehlt"
        ],
        [
          "Notfallmaßnahme",
          "Priorisierte Funktionen mit freigegebenem Ersatzverfahren liefern"
        ],
        [
          "Restrisiko",
          "Kompatibilitätsfehler trotz erfolgreichem Prototyp"
        ],
        [
          "Kontrolle",
          "Wöchentlich Status und Annahmen neu bewerten"
        ]
      ]
    ],
    [
      "tip",
      "**Bewerten** verlangt Kriterien und Urteil. **Begründen** verlangt einen nachvollziehbaren Zusammenhang mit dem Szenario."
    ],
    [
      "qa",
      "Ein Risiko hat 20 Prozent Eintrittswahrscheinlichkeit und 40.000 Euro Schaden. Eine Maßnahme kostet 2.000 Euro. Sie senkt die Wahrscheinlichkeit auf fünf Prozent. **Berechnen** und **beurteilen** Sie die Maßnahme.",
      [
        "Vorher: 0,20 × 40.000 = **8.000 Euro** erwarteter Schaden. 1 Punkt.",
        "Nachher: 0,05 × 40.000 = **2.000 Euro** Restrisiko. 1 Punkt.",
        "Gesamt: 2.000 + 2.000 = **4.000 Euro**. 1 Punkt.",
        "Die erwarteten Gesamtkosten sinken um 4.000 Euro. Die Maßnahme ist unter diesen Annahmen wirtschaftlich. 1 Punkt."
      ],
      4
    ],
    [
      "qa",
      "Der angekündigte Testserver fehlt bereits. **Unterscheiden** Sie Problem und Risiko. **Nennen** Sie zwei nächste Schritte.",
      [
        "Das Fehlen ist ein eingetretenes Problem. 1 Punkt.",
        "Ein dadurch möglicher verspäteter Testabschluss ist ein Folgerisiko. 1 Punkt.",
        "Zuständigkeit und Ersatzumgebung klären. 1 Punkt.",
        "Terminwirkung ermitteln und betroffene Beteiligte informieren. 1 Punkt."
      ],
      4
    ],
    [
      "quiz",
      [
        {
          "q": "Was ist ein Restrisiko?",
          "o": [
            "Risiko nach berücksichtigten Maßnahmen",
            "Ein garantierter Schaden",
            "Ein erledigter Test",
            "Ein genauer Rechnungsbetrag"
          ],
          "a": 0,
          "e": "Maßnahmen beseitigen Risiken nicht immer vollständig."
        },
        {
          "q": "Was ergibt 0,25 × 12.000 Euro?",
          "o": [
            "3.000 Euro Erwartungswert",
            "12.000 Euro garantierte Kosten",
            "25 Euro",
            "48.000 Euro"
          ],
          "a": 0,
          "e": "Wahrscheinlichkeit und Schaden werden multipliziert."
        },
        {
          "q": "Wozu dient ein Auslöser im Notfallplan?",
          "o": [
            "Er legt fest, wann eine Reaktion beginnt",
            "Er ersetzt die Verantwortung",
            "Er beweist Fehlerfreiheit",
            "Er verhindert jedes Risiko"
          ],
          "a": 0,
          "e": "Ein beobachtbares Ereignis startet die vereinbarte Maßnahme."
        }
      ]
    ],
    [
      "see",
      [
        "ps-aufwand",
        "ps-kosten",
        "ps-stakeholder",
        "ps-aenderungen"
      ]
    ]
  ]
});
