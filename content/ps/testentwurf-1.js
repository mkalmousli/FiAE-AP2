AP2.page('ps-testentwurf', {
  "b": "ps",
  "g": "Qualitätssicherung",
  "t": "Testfallentwurf: Äquivalenzklassen, Grenzwerte und Entscheidungstabellen",
  "d": "Black-Box-Tests werden aus Anforderungen abgeleitet. Äquivalenzklassen bündeln gleichartig behandelte Eingaben. Grenzwerte prüfen Übergänge. Entscheidungstabellen ordnen Kombinationen aus Bedingungen und Aktionen.",
  "m": "**Jeder Test braucht Eingabe, Ausgangslage und erwartetes Ergebnis.** Ein ausgeführter Test ohne Sollwert liefert keinen verlässlichen Nachweis.",
  "cheat": [
    [
      "Verfahren",
      [
        "Äquivalenzklassen: Vertreter je Klasse wählen",
        "Grenzwertanalyse: Werte an Übergängen prüfen",
        "Entscheidungstabelle: Bedingungskombinationen abdecken"
      ]
    ],
    [
      "Dokumentation",
      [
        "Test-ID und Anforderungs-ID",
        "Vorbedingungen und konkrete Daten",
        "Schritte und erwartetes Ergebnis",
        "Ist-Ergebnis, Status und Fehlerverweis"
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Szenario: Versandkosten"
    ],
    [
      "p",
      "Eine Bestellung enthält ganzzahlig zwischen eins und 50 Stück. Andere Mengen werden abgelehnt. Stammkunden zahlen keinen Versand. Sonst ist der Versand ab 80 Euro Warenwert kostenlos. Darunter kostet er fünf Euro."
    ],
    [
      "table",
      [
        "Mengenklasse",
        "Vertreter",
        "Erwartung"
      ],
      [
        [
          "Ungültig: unter 1",
          "0",
          "Ablehnung"
        ],
        [
          "Gültig: 1 bis 50",
          "20",
          "Menge akzeptiert"
        ],
        [
          "Ungültig: über 50",
          "51",
          "Ablehnung"
        ],
        [
          "Ungültiger Datentyp",
          "1,5 oder Text",
          "Ablehnung ohne stilles Abschneiden"
        ]
      ]
    ],
    [
      "h",
      "Grenzwerte wählen"
    ],
    [
      "table",
      [
        "Grenze",
        "Werte bei Ganzzahlen",
        "Zweck"
      ],
      [
        [
          "Untere Grenze 1",
          "0, 1, 2",
          "Zu klein, gerade gültig, innen"
        ],
        [
          "Obere Grenze 50",
          "49, 50, 51",
          "Innen, gerade gültig, zu groß"
        ],
        [
          "Versandgrenze 80,00 Euro",
          "79,99; 80,00; 80,01",
          "Unter, auf und über der Grenze"
        ]
      ]
    ],
    [
      "note",
      "Der kleinste Abstand hängt vom Datentyp ab. Bei Geld in Cent beträgt er hier 0,01 Euro. Für ganzzahlige Mengen beträgt er eins."
    ],
    [
      "h",
      "Entscheidungstabelle"
    ],
    [
      "table",
      [
        "Bedingung / Aktion",
        "R1",
        "R2",
        "R3",
        "R4"
      ],
      [
        [
          "Menge gültig?",
          "Nein",
          "Ja",
          "Ja",
          "Ja"
        ],
        [
          "Stammkunde?",
          "–",
          "Ja",
          "Nein",
          "Nein"
        ],
        [
          "Warenwert mindestens 80 Euro?",
          "–",
          "–",
          "Ja",
          "Nein"
        ],
        [
          "Ablehnen",
          "X",
          "",
          "",
          ""
        ],
        [
          "Versand kostenlos",
          "",
          "X",
          "X",
          ""
        ],
        [
          "Versand fünf Euro",
          "",
          "",
          "",
          "X"
        ]
      ]
    ],
    [
      "p",
      "Ein Strich bedeutet: Für diese Regel ist der Wert egal. Die Priorität „ungültige Menge ablehnen“ gilt auch für Stammkunden. R2 fasst zwei mögliche Warenwertfälle zusammen."
    ],
    [
      "h",
      "Vollständige Testfälle"
    ],
    [
      "table",
      [
        "ID",
        "Menge",
        "Stammkunde",
        "Warenwert",
        "Erwartetes Ergebnis"
      ],
      [
        [
          "T1",
          "0",
          "Ja",
          "100,00 Euro",
          "Ablehnung; keine Bestellung"
        ],
        [
          "T2",
          "1",
          "Ja",
          "10,00 Euro",
          "Akzeptiert; 0,00 Euro Versand"
        ],
        [
          "T3",
          "50",
          "Nein",
          "80,00 Euro",
          "Akzeptiert; 0,00 Euro Versand"
        ],
        [
          "T4",
          "20",
          "Nein",
          "79,99 Euro",
          "Akzeptiert; 5,00 Euro Versand"
        ],
        [
          "T5",
          "51",
          "Nein",
          "100,00 Euro",
          "Ablehnung; keine Bestellung"
        ]
      ]
    ],
    [
      "warn",
      "Die fünf Fälle decken die vier Tabellenregeln ab. Sie decken noch nicht alle genannten Grenzwerte ab. Regelüberdeckung und Grenzwertabdeckung sind verschiedene Testziele."
    ],
    [
      "h",
      "Tests mit mehreren ungültigen Eingaben"
    ],
    [
      "p",
      "Prüfe ungültige Klassen möglichst einzeln. Sonst bleibt unklar, welche Prüfung ausgelöst wurde. Ein Test mit falscher Menge und kaputtem Preis kann die Mengenprüfung verdecken."
    ],
    [
      "h",
      "Tests priorisieren"
    ],
    [
      "list",
      [
        "Zuerst kritische Geschäftsregeln und häufige Abläufe prüfen.",
        "Ungültige Eingaben und fehlende Rechte einbeziehen.",
        "Zustandsänderungen wie Bestand und Buchungen kontrollieren.",
        "Nach einer Korrektur den Fehlerfall erneut ausführen.",
        "Regressionstests prüfen, ob andere Funktionen weiter richtig arbeiten."
      ]
    ],
    [
      "tip",
      "**Entwerfen** heißt: konkrete Testdaten mit erwarteten Ergebnissen angeben. „Grenzwerte prüfen“ allein ist kein fertiger Testfall."
    ],
    [
      "qa",
      "**Entwerfen** Sie sechs Mengen-Grenzwerttests. Nennen Sie jeweils das erwartete Ergebnis.",
      [
        "0: ablehnen.",
        "1: akzeptieren.",
        "2: akzeptieren.",
        "49: akzeptieren.",
        "50: akzeptieren.",
        "51: ablehnen.",
        "Je korrektem Daten-Ergebnis-Paar 1 Punkt. Andere Felder werden gültig belegt."
      ],
      6
    ],
    [
      "qa",
      "Ein Stammkunde bestellt null Stück für 100 Euro. **Bestimmen** Sie die Tabellenregel. **Begründen** Sie das Ergebnis. **Nennen** Sie eine Zustandsprüfung.",
      [
        "R1 gilt, weil die Menge ungültig ist. 1 Punkt.",
        "Die Bestellung wird trotz Stammkundenstatus abgelehnt. 1 Punkt.",
        "In Datenbank und Bestand darf keine Bestellung beziehungsweise Reservierung entstehen. 1 Punkt."
      ],
      3
    ],
    [
      "quiz",
      [
        {
          "q": "Was gehört zwingend zu einem Testfall?",
          "o": [
            "Ein erwartetes Ergebnis",
            "Nur eine Bildschirmfarbe",
            "Nur ein Testername",
            "Nur die Uhrzeit"
          ],
          "a": 0,
          "e": "Ohne Sollwert kann das Ist-Ergebnis nicht sinnvoll bewertet werden."
        },
        {
          "q": "Welche Eingabe liegt direkt unter der oberen Mengengrenze 50?",
          "o": [
            "49",
            "0",
            "51",
            "100"
          ],
          "a": 0,
          "e": "Bei Ganzzahlen ist der direkte Vorgänger 49."
        },
        {
          "q": "Was bedeutet ein Strich in der Entscheidungstabelle?",
          "o": [
            "Diese Bedingung beeinflusst die Regel nicht",
            "Die Regel ist verboten",
            "Der Test wurde bestanden",
            "Der Wert ist immer falsch"
          ],
          "a": 0,
          "e": "Der Wert ist für die betrachtete Regel beliebig."
        }
      ]
    ],
    [
      "see",
      [
        "ps-anforderungen",
        "ps-testarten",
        "ps-ueberdeckung",
        "ps-verifikation",
        "ps-abnahme"
      ]
    ]
  ]
});
