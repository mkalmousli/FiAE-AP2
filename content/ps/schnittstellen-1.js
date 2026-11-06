AP2.page('ps-schnittstellen', {
  "b": "ps",
  "g": "Software-Architektur",
  "t": "Schnittstellen spezifizieren: Datenvertrag, Fehler und Versionierung",
  "d": "Eine Schnittstelle verbindet Komponenten oder Systeme. Ihr Vertrag beschreibt Aufrufe, Daten und erwartetes Verhalten. Fehler, Zeitgrenzen und Berechtigungen gehören ebenfalls dazu.",
  "m": "**Eine Feldliste allein ist kein vollständiger Schnittstellenvertrag.** Beide Seiten brauchen dieselben Bedeutungen, Einheiten und Fehlerregeln.",
  "cheat": [
    [
      "Vertrag",
      [
        "Zweck, Beteiligte und Transport",
        "Datenstruktur, Pflichtfelder und Wertebereiche",
        "Authentifizierung und Objektberechtigungen",
        "Statuscodes, Timeout und Wiederholbarkeit"
      ]
    ],
    [
      "Änderungen",
      [
        "Kompatibilität prüfen.",
        "Versionen und Übergangszeit vereinbaren.",
        "Verbraucher mit Vertragstests absichern."
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Szenario: Versandauftrag übergeben"
    ],
    [
      "p",
      "Ein Shop übergibt Sendungen an eine Versandsoftware. Der Vertrag beschreibt das Gewicht in Gramm. Ohne Einheit könnte ein Wert von 1500 anders verstanden werden."
    ],
    [
      "table",
      [
        "Feld",
        "Typ",
        "Pflicht",
        "Regel"
      ],
      [
        [
          "auftragId",
          "Zeichenkette",
          "Ja",
          "1 bis 40 Zeichen; je Auftrag eindeutig"
        ],
        [
          "gewichtGramm",
          "Ganzzahl",
          "Ja",
          "1 bis 31.500"
        ],
        [
          "land",
          "Zeichenkette",
          "Ja",
          "Genau zwei vereinbarte Großbuchstaben"
        ],
        [
          "adresszusatz",
          "Zeichenkette oder null",
          "Nein",
          "Höchstens 80 Zeichen"
        ],
        [
          "erstelltAm",
          "Zeichenkette",
          "Ja",
          "Zeitstempel mit vereinbarter Zeitzonenangabe"
        ]
      ]
    ],
    [
      "code",
      "json",
      "{\"auftragId\":\"A-204\",\"gewichtGramm\":1500,\"land\":\"DE\",\n \"adresszusatz\":null,\"erstelltAm\":\"2026-04-02T10:30:00Z\"}"
    ],
    [
      "h",
      "Fehlend, null und leer unterscheiden"
    ],
    [
      "table",
      [
        "Darstellung",
        "Mögliche Bedeutung",
        "Vertragliche Entscheidung"
      ],
      [
        [
          "Feld fehlt",
          "Nicht geliefert oder bei Teiländerung unverändert",
          "Für jeden Aufruf festlegen"
        ],
        [
          "null",
          "Ausdrücklich kein Wert",
          "Nur zulassen, wenn fachlich sinnvoll"
        ],
        [
          "Leere Zeichenkette",
          "Vorhandener, aber leerer Text",
          "Nicht automatisch wie null behandeln"
        ],
        [
          "0",
          "Tatsächlicher Zahlenwert null",
          "Nicht mit fehlendem Gewicht verwechseln"
        ]
      ]
    ],
    [
      "h",
      "Fehlerobjekt"
    ],
    [
      "code",
      "json",
      "{\"code\":\"INVALID_WEIGHT\",\"message\":\"Gewicht ist ungültig.\",\n \"field\":\"gewichtGramm\",\"requestId\":\"r-204\"}"
    ],
    [
      "p",
      "Ein stabiler Fehlercode hilft Programmen. Eine kurze Meldung hilft Menschen. Eine Anfrage-ID verbindet Antwort und Serverlog. Interne Stacktraces oder Zugangsdaten gehören nicht in die Antwort."
    ],
    [
      "h",
      "Zusammenarbeit absichern"
    ],
    [
      "seq",
      {
        "w": 760,
        "actors": [
          "Shop",
          "Versand-API",
          "Versanddaten"
        ],
        "steps": [
          [
            0,
            1,
            "Anfrage mit Authentifizierung",
            "s"
          ],
          [
            1,
            1,
            "Schema und Berechtigung prüfen",
            "s"
          ],
          [
            1,
            2,
            "Auftrag eindeutig speichern",
            "s"
          ],
          [
            2,
            1,
            "Sendungs-ID liefern",
            "r"
          ],
          [
            1,
            0,
            "201 mit Sendungs-ID",
            "r"
          ]
        ],
        "cap": "Datenprüfung, Berechtigung und Eindeutigkeit gehören in den Serverablauf."
      }
    ],
    [
      "h",
      "Kompatibilität beurteilen"
    ],
    [
      "table",
      [
        "Änderung",
        "Auswirkung",
        "Mögliche Lösung"
      ],
      [
        [
          "Neues optionales Antwortfeld",
          "Oft verträglich; strikte Verbraucher können scheitern",
          "Robuste Verbraucher und Vertragstests"
        ],
        [
          "Optionales Eingabefeld wird Pflicht",
          "Alte Clients liefern es nicht",
          "Neue Version oder Übergangsregel"
        ],
        [
          "Feldname wird geändert",
          "Alte Clients finden das Feld nicht",
          "Altes Feld vorübergehend weiter unterstützen"
        ],
        [
          "Einheit wechselt Gramm zu Kilogramm",
          "Semantisch inkompatibel trotz gleichem Datentyp",
          "Neues Feld oder neue Version mit klarer Einheit"
        ],
        [
          "Neuer Aufzählungswert",
          "Clients kennen den Wert möglicherweise nicht",
          "Fallback oder abgestimmte Erweiterung"
        ]
      ]
    ],
    [
      "warn",
      "Ein unveränderter Datentyp garantiert keine Kompatibilität. Auch Bedeutung, Einheit und erlaubte Werte sind Teil des Vertrags."
    ],
    [
      "h",
      "Prüfstrategie"
    ],
    [
      "steps",
      [
        "Produzent und Verbraucher gegen gemeinsame Beispiele prüfen.",
        "Pflichtfelder, Nullwerte und Grenzen testen.",
        "Fehlercodes und fehlende Rechte testen.",
        "Timeouts und doppelte Anfragen kontrolliert simulieren.",
        "Vertragstests bei jeder relevanten Änderung ausführen."
      ]
    ],
    [
      "qa",
      "Ein Feld bleibt numerisch. Seine Einheit wechselt von Cent zu Euro. **Beurteilen** Sie die Kompatibilität. **Nennen** Sie zwei Gegenmaßnahmen.",
      [
        "Die Änderung ist fachlich inkompatibel. Ein alter Client interpretiert denselben Wert hundertfach falsch. 1 Punkt.",
        "Neue eindeutig benannte Felder oder eine neue Version anbieten. 1 Punkt.",
        "Umstellung mit Testwerten und vereinbarter Übergangszeit koordinieren. 1 Punkt."
      ],
      3
    ],
    [
      "qa",
      "**Nennen** Sie sechs Inhalte eines Schnittstellenvertrags. Denken Sie an Ablauf, Daten und Fehler.",
      [
        "- Operation mit Zweck und Aufrufweg.",
        "- Datenfelder mit Typen und Pflichtangaben.",
        "- Fachliche Wertebereiche und Einheiten.",
        "- Authentifizierung und Zugriffsrechte.",
        "- Fehlerfälle und Statuscodes.",
        "- Zeitgrenzen und Regeln für Wiederholungen.",
        "Je Inhalt 1 Punkt."
      ],
      6
    ],
    [
      "quiz",
      [
        {
          "q": "Was ist eine semantische Änderung?",
          "o": [
            "Eine Änderung der Bedeutung eines Feldes",
            "Nur das Verschieben eines Kommentars",
            "Nur ein anderer Dateiname",
            "Ein unveränderter Vertrag"
          ],
          "a": 0,
          "e": "Einheiten und Fachbedeutungen sind Teil der Semantik."
        },
        {
          "q": "Wozu dient eine Anfrage-ID?",
          "o": [
            "Zum Verbinden von Antwort und Diagnoseinformationen",
            "Als universelles Passwort",
            "Als Ersatz für Verschlüsselung",
            "Zum Berechnen des Portbereichs"
          ],
          "a": 0,
          "e": "Sie erleichtert die Fehlersuche über Systemgrenzen."
        },
        {
          "q": "Was kann alte Clients brechen?",
          "o": [
            "Ein bisher optionales Feld wird verpflichtend",
            "Ein zusätzlicher interner Kommentar",
            "Eine neue Teamnotiz",
            "Ein unveränderter Wertebereich"
          ],
          "a": 0,
          "e": "Alte Clients senden das nun verlangte Feld möglicherweise nicht."
        }
      ]
    ],
    [
      "see",
      [
        "infra-http",
        "ps-dbzugriff",
        "ps-architektur",
        "ps-testentwurf",
        "ps-migration"
      ]
    ]
  ]
});
