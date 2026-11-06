AP2.page('ps-nutzwert', {
  "b": "ps",
  "g": "Kaufmännische Rechnungen",
  "t": "Nutzwertanalyse: Gewichten, rechnen und Entscheidungen begründen",
  "d": "Eine Nutzwertanalyse vergleicht Alternativen anhand gewichteter Kriterien. Punkte machen Bewertungen nachvollziehbar. Das Ergebnis hängt jedoch von Kriterien, Gewichten und belastbaren Bewertungen ab.",
  "m": "**Erst Muss-Kriterien prüfen. Dann gewichten und bewerten.** Hohe Punktwerte müssen bei allen Kriterien dieselbe Bedeutung haben.",
  "cheat": [
    [
      "Rechenweg",
      [
        "Gewichte zusammen: 100 Prozent",
        "Gewicht als Dezimalzahl × Bewertung",
        "Teilwerte je Alternative addieren",
        "Ergebnis und Grenzen begründen"
      ]
    ],
    [
      "Grenzen",
      [
        "Bewertungen können subjektiv sein.",
        "Ähnliche Kriterien nicht doppelt zählen.",
        "Kosten und Nutzen getrennt nachvollziehbar dokumentieren."
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Szenario: Ticketsystem auswählen"
    ],
    [
      "p",
      "Drei Lösungen erfüllen den vereinbarten Funktionsumfang. Eine vierte Lösung scheidet vorher aus. Sie unterstützt den erforderlichen Datenexport nicht. Das ist ein Muss-Kriterium."
    ],
    [
      "table",
      [
        "Kriterium",
        "Gewicht",
        "A: Eigenentwicklung",
        "B: Standardsoftware",
        "C: Cloud-Dienst"
      ],
      [
        [
          "Funktionsabdeckung",
          "40 Prozent",
          "5",
          "4",
          "3"
        ],
        [
          "Bedienbarkeit",
          "30 Prozent",
          "3",
          "4",
          "5"
        ],
        [
          "Wartbarkeit",
          "20 Prozent",
          "2",
          "4",
          "5"
        ],
        [
          "Einführungsgeschwindigkeit",
          "10 Prozent",
          "1",
          "4",
          "5"
        ]
      ]
    ],
    [
      "p",
      "Die Skala reicht von eins bis fünf. Fünf bedeutet immer die beste Eignung. Alle Zahlen sind begründete Aufgabenwerte. Geldbeträge werden nicht direkt mit Punkten addiert."
    ],
    [
      "walk",
      {
        "t": "Gewichteten Nutzwert berechnen",
        "steps": [
          {
            "t": "Gewichte prüfen",
            "b": [
              [
                "p",
                "40 + 30 + 20 + 10 = **100 Prozent**."
              ]
            ]
          },
          {
            "t": "Teilwerte berechnen",
            "b": [
              [
                "table",
                [
                  "Alternative",
                  "Rechnung",
                  "Nutzwert"
                ],
                [
                  [
                    "A",
                    "0,40×5 + 0,30×3 + 0,20×2 + 0,10×1",
                    "3,40"
                  ],
                  [
                    "B",
                    "0,40×4 + 0,30×4 + 0,20×4 + 0,10×4",
                    "4,00"
                  ],
                  [
                    "C",
                    "0,40×3 + 0,30×5 + 0,20×5 + 0,10×5",
                    "4,20"
                  ]
                ]
              ]
            ]
          },
          {
            "t": "Entscheidung begründen",
            "b": [
              [
                "p",
                "C erreicht mit **4,20 Punkten** den höchsten Nutzwert."
              ],
              [
                "p",
                "B liegt nur 0,20 Punkte dahinter. Prüfe deshalb empfindliche Annahmen und Gesamtkosten."
              ]
            ]
          }
        ]
      }
    ],
    [
      "h",
      "Sensitivitätsanalyse"
    ],
    [
      "p",
      "Sensitivität bedeutet Empfindlichkeit. Die Fachabteilung erhöht das Gewicht der Funktionsabdeckung auf 60 Prozent. Bedienbarkeit erhält 20 Prozent. Wartbarkeit erhält 15 Prozent. Einführungsgeschwindigkeit erhält fünf Prozent."
    ],
    [
      "table",
      [
        "Alternative",
        "Neue Rechnung",
        "Neuer Nutzwert"
      ],
      [
        [
          "A",
          "0,60×5 + 0,20×3 + 0,15×2 + 0,05×1",
          "3,95"
        ],
        [
          "B",
          "0,60×4 + 0,20×4 + 0,15×4 + 0,05×4",
          "4,00"
        ],
        [
          "C",
          "0,60×3 + 0,20×5 + 0,15×5 + 0,05×5",
          "3,80"
        ]
      ]
    ],
    [
      "p",
      "Jetzt gewinnt B. Die Rangfolge ist also nicht stabil. Die Beteiligten müssen die Gewichtung gemeinsam begründen. Die Analyse unterstützt die Entscheidung; sie macht Annahmen sichtbar."
    ],
    [
      "h",
      "Kosten als Kriterium richtig behandeln"
    ],
    [
      "p",
      "Bei Kosten ist ein kleinerer Eurobetrag meist besser. Die Punkteskala muss dies umkehren. Beispiel: Bis 20.000 Euro ergeben fünf Punkte. Über 60.000 Euro ergibt ein Punkt. Grenzen vor der Bewertung festlegen."
    ],
    [
      "warn",
      "Ein Muss-Kriterium darf nicht durch gute Werte anderer Kriterien ausgeglichen werden. Eine Punktesumme beweist keine objektiv beste Lösung. Bewertungen benötigen Quellen oder nachvollziehbare Tests."
    ],
    [
      "h",
      "Prüfungsantwort aufbauen"
    ],
    [
      "steps",
      [
        "Ausschlusskriterien nennen und prüfen.",
        "Kriterien und Skala erklären.",
        "Gewichte auf 100 Prozent prüfen.",
        "Teilwerte und Summe mit Rechenweg angeben.",
        "Sieger mit Szenariobezug nennen.",
        "Empfindliche Annahmen und Kostenvergleich ergänzen."
      ]
    ],
    [
      "qa",
      "**Berechnen** Sie den ursprünglichen Nutzwert für B und C. **Begründen** Sie eine Empfehlung. **Nennen** Sie eine Grenze.",
      [
        "B: 0,4×4 + 0,3×4 + 0,2×4 + 0,1×4 = **4,00**. 1 Punkt.",
        "C: 0,4×3 + 0,3×5 + 0,2×5 + 0,1×5 = **4,20**. 1 Punkt.",
        "C ist nach dieser Gewichtung vorzuziehen, weil der Nutzwert höher liegt. 1 Punkt.",
        "Andere Gewichte oder unsichere Bewertungen können die Rangfolge ändern. 1 Punkt."
      ],
      4
    ],
    [
      "qa",
      "Eine Lösung erfüllt die zwingende Schnittstelle nicht. Sie erreicht dennoch die höchste Punktzahl. **Beurteilen** Sie ihre Auswahl.",
      [
        "Die Lösung scheidet am Muss-Kriterium aus. 1 Punkt.",
        "Punkte aus anderen Kriterien dürfen das fehlende Muss-Kriterium nicht kompensieren. 1 Punkt.",
        "Soll die Bedingung geändert werden, ist vorher eine bewusste fachliche Entscheidung erforderlich. 1 Punkt."
      ],
      3
    ],
    [
      "quiz",
      [
        {
          "q": "Wie wird ein gewichteter Teilwert berechnet?",
          "o": [
            "Gewicht × Bewertung",
            "Gewicht + Eurobetrag",
            "Bewertung / Anbieterzahl",
            "Alle Punkte ohne Gewicht addieren"
          ],
          "a": 0,
          "e": "Bei 30 Prozent und vier Punkten ergibt sich 0,30 × 4 = 1,20."
        },
        {
          "q": "Was zeigt eine wechselnde Rangfolge bei kleinen Änderungen?",
          "o": [
            "Die Entscheidung ist empfindlich gegenüber den Annahmen",
            "Die Rechnung ist automatisch falsch",
            "Es darf keinen Sieger geben",
            "Alle Kosten sind gleich"
          ],
          "a": 0,
          "e": "Eine Sensitivitätsanalyse macht diese Abhängigkeit sichtbar."
        },
        {
          "q": "Wie viele Punkte ergeben 25 Prozent mit Bewertung vier?",
          "o": [
            "1,00",
            "100",
            "4,25",
            "0,25"
          ],
          "a": 0,
          "e": "0,25 × 4 = 1,00."
        }
      ]
    ],
    [
      "see",
      [
        "ps-beschaffung",
        "ps-tco",
        "ps-anforderungen",
        "ps-risiko"
      ]
    ]
  ]
});
