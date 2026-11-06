AP2.page('ps-dbzugriff', {
  "b": "ps",
  "g": "Datenbanken",
  "t": "Datenbankzugriff: Verbindung, sichere Abfragen, Transaktionen und Beziehungen",
  "d": "Eine Anwendung verwendet einen Datenbanktreiber. Die Verbindung enthält Angaben zu Server, Datenbank und Anmeldung. Schlüsselregeln im Schema bestimmen gültige Daten und Beziehungen.",
  "m": "**Treiber verbindet. Parameter binden Werte. Transaktionen bündeln Änderungen.** Kardinalitäten aus FOREIGN KEY, UNIQUE und NOT NULL gemeinsam ableiten.",
  "cheat": [
    [
      "Verbindung",
      [
        "Host, Port und Datenbank",
        "Authentifizierung und minimale Rechte",
        "Verschlüsselung mit Zertifikatsprüfung",
        "Timeout, Pool und kontrollierte Freigabe"
      ]
    ],
    [
      "Schema lesen",
      [
        "FOREIGN KEY: Bezug zu einer anderen Zeile",
        "NOT NULL: Wert muss vorhanden sein",
        "UNIQUE: Wertkombination darf nicht mehrfach vorkommen",
        "PRIMARY KEY: eindeutiger, nicht leerer Identifikator"
      ]
    ],
    [
      "Transaktion",
      [
        "BEGIN: Einheit starten",
        "COMMIT: erfolgreich abschließen",
        "ROLLBACK: nicht abgeschlossene Änderungen zurücknehmen"
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Verbindung und Zuständigkeit"
    ],
    [
      "p",
      "Eine Weboberfläche spricht normalerweise mit einer Anwendungs-API. Diese greift auf die Datenbank zu. Datenbankzugangsdaten gehören nicht in ausgeliefertes Browser-JavaScript. Der Anwendungsserver prüft Rechte und Fachregeln."
    ],
    [
      "code",
      "text",
      "Host=db.intern;Port=5432;Database=lager;Username=app;SSLMode=verify-full;\n# Format und Optionsnamen sind treiberabhängig.\n# Passwort oder technische Identität getrennt und geschützt bereitstellen."
    ],
    [
      "table",
      [
        "Angabe",
        "Zweck"
      ],
      [
        [
          "Host und Port",
          "Datenbankdienst finden"
        ],
        [
          "Datenbankname",
          "Passenden Datenbestand auswählen"
        ],
        [
          "Anmeldung",
          "Technisches Konto oder unterstützte alternative Authentifizierung"
        ],
        [
          "TLS mit Zertifikatsprüfung",
          "Transport und Identität des Zielservers absichern"
        ],
        [
          "Verbindungs- und Abfragetimeout",
          "Wartezeiten begrenzen"
        ],
        [
          "Connection Pool",
          "Verbindungen wiederverwenden und Anzahl begrenzen"
        ]
      ]
    ],
    [
      "warn",
      "Ein Pool ist kein unbegrenzter Vorrat. Verbindungen nach Nutzung kontrolliert zurückgeben. Zu viele Verbindungen können die Datenbank überlasten. Secrets gehören nicht ins Repository oder in Logs."
    ],
    [
      "h",
      "Parametrisierte Abfrage"
    ],
    [
      "code",
      "java",
      "String sql = \"SELECT artikel_id, preis FROM artikel WHERE artikel_id = ?\";\ntry (PreparedStatement stmt = con.prepareStatement(sql)) {\n    stmt.setInt(1, artikelId);\n    try (ResultSet rs = stmt.executeQuery()) {\n        while (rs.next()) {\n            // Ergebnis fachlich verarbeiten\n        }\n    }\n}"
    ],
    [
      "p",
      "Parameter werden als Daten gebunden. Sie werden nicht zu zusätzlichem SQL-Code. Tabellen- und Spaltennamen können meist nicht als normale Wertparameter gebunden werden. Dynamische Sortierspalten deshalb aus einer festen erlaubten Liste wählen."
    ],
    [
      "h",
      "Kardinalitäten aus SQL ableiten"
    ],
    [
      "code",
      "sql",
      "CREATE TABLE kunde (\n  kunde_id INTEGER PRIMARY KEY,\n  name VARCHAR(80) NOT NULL\n);\nCREATE TABLE auftrag (\n  auftrag_id INTEGER PRIMARY KEY,\n  kunde_id INTEGER NOT NULL,\n  FOREIGN KEY (kunde_id) REFERENCES kunde(kunde_id)\n);\nCREATE TABLE kundenprofil (\n  kunde_id INTEGER PRIMARY KEY,\n  anzeige VARCHAR(80),\n  FOREIGN KEY (kunde_id) REFERENCES kunde(kunde_id)\n);"
    ],
    [
      "table",
      [
        "Beziehung",
        "Ableitung",
        "Ergebnis"
      ],
      [
        [
          "Kunde → Auftrag",
          "kunde_id im Auftrag ist nicht eindeutig",
          "Ein Kunde kann null bis viele Aufträge haben"
        ],
        [
          "Auftrag → Kunde",
          "NOT NULL und gültiger FOREIGN KEY",
          "Jeder Auftrag gehört genau einem vorhandenen Kunden"
        ],
        [
          "Kunde → Kundenprofil",
          "kunde_id ist im Profil PRIMARY KEY",
          "Ein Kunde hat höchstens ein Profil"
        ],
        [
          "Kundenprofil → Kunde",
          "Schlüssel ist zugleich nicht leerer Fremdschlüssel",
          "Jedes Profil gehört genau einem Kunden"
        ]
      ]
    ],
    [
      "note",
      "Ein Fremdschlüssel erzwingt allein keine Pflichtzeile auf der anderen Seite. Kunde ohne Auftrag bleibt hier erlaubt. Ohne NOT NULL kann ein Fremdschlüsselfeld leer bleiben. Mit UNIQUE wird seine maximale Häufigkeit begrenzt."
    ],
    [
      "h",
      "n:m mit fachlichen Zusatzdaten"
    ],
    [
      "code",
      "sql",
      "CREATE TABLE auftragsposition (\n  auftrag_id INTEGER NOT NULL REFERENCES auftrag(auftrag_id),\n  artikel_id INTEGER NOT NULL REFERENCES artikel(artikel_id),\n  menge INTEGER NOT NULL CHECK (menge > 0),\n  PRIMARY KEY (auftrag_id, artikel_id)\n);"
    ],
    [
      "p",
      "Ein Auftrag enthält mehrere Artikel. Ein Artikel kann in mehreren Aufträgen vorkommen. Die Verbindungstabelle enthält hier zusätzlich die Menge. Ihr Schlüssel verbietet denselben Artikel zweimal im gleichen Auftrag. Andere Fachregeln können einen Positionsschlüssel erfordern."
    ],
    [
      "h",
      "Mehrere Änderungen zusammen sichern"
    ],
    [
      "p",
      "Eine Reservierung schreibt einen Auftrag und verändert den verfügbaren Bestand. Beide Änderungen müssen zusammen erfolgreich sein. Eine Transaktion schützt vor einem halben Ergebnis. Gegen konkurrierende Anfragen benötigt die Umsetzung zusätzlich passende Sperren oder atomare Bedingungen."
    ],
    [
      "code",
      "sql",
      "BEGIN;\nUPDATE artikel\nSET bestand = bestand - 3\nWHERE artikel_id = 42 AND bestand >= 3;\n-- Anwendung prüft: genau eine Zeile geändert?\n-- Nur dann Reservierung anlegen, sonst ROLLBACK.\nINSERT INTO reservierung (reservierung_id, artikel_id, menge)\nVALUES (731, 42, 3);\nCOMMIT;\n-- Bei jedem Fehler vor COMMIT: ROLLBACK."
    ],
    [
      "warn",
      "Der Kommentar ist eine nötige Kontrollentscheidung der Anwendung. Das Script darf nicht blind weiterlaufen. Ein Timeout nach COMMIT kann ein bereits gespeichertes Ergebnis betreffen. Eine fachlich eindeutige ID erleichtert die sichere Wiederholung."
    ],
    [
      "h",
      "Aufgaben im Prüfungsstil"
    ],
    [
      "tip",
      "**Ableiten** heißt: eine Aussage aus konkreten Schlüsselregeln begründen. **Erläutern** heißt: Begriff und Zweck verbinden."
    ],
    [
      "qa",
      "**Leiten** Sie die Beziehung zwischen Kunde und Kundenprofil ab. Geben Sie beide Richtungen an.",
      [
        "Ein Kunde hat **null oder ein Profil**, weil kundenprofil.kunde_id eindeutig ist. 1 Punkt.",
        "Ein Profil gehört **genau einem Kunden**, weil der Primärschlüssel nicht leer sein darf und zugleich Fremdschlüssel ist. 1 Punkt.",
        "Das Schema erzwingt kein Profil für jeden Kunden. 1 Punkt."
      ],
      3
    ],
    [
      "qa",
      "**Erläutern** Sie Prepared Statement, Connection Pool und Transaktion mit je einem Zweck.",
      [
        "Prepared Statement bindet Werte getrennt vom SQL-Code und verhindert darüber SQL-Injection. 1 Punkt.",
        "Connection Pool verwendet begrenzte vorhandene Verbindungen erneut und reduziert Verbindungsaufwand. 1 Punkt.",
        "Eine Transaktion fasst zusammengehörige Änderungen zu einem erfolgreichen oder zurückgenommenen Ergebnis zusammen. 1 Punkt."
      ],
      3
    ],
    [
      "qa",
      "**Beurteilen** Sie die Aussage: „Zwei Fremdschlüssel beweisen immer eine reine n:m-Verbindungstabelle.“",
      [
        "Die Aussage ist falsch. Eine Tabelle kann mehrere unabhängige Beziehungen enthalten. 1 Punkt.",
        "Schlüssel, Eindeutigkeitsregeln und fachliche Bedeutung müssen gemeinsam geprüft werden. 1 Punkt.",
        "Eine n:m-Verbindungstabelle darf zusätzliche Attribute wie Menge oder Buchungsdatum enthalten. 1 Punkt."
      ],
      3
    ],
    [
      "quiz",
      [
        {
          "q": "Welche Regel macht die Zuordnung maximal eins zu eins?",
          "o": [
            "Ein eindeutiger Fremdschlüssel",
            "Nur der Spaltenname id",
            "Ein längerer Tabellenname",
            "Eine zusätzliche Textspalte"
          ],
          "a": 0,
          "e": "UNIQUE oder PRIMARY KEY auf dem Fremdschlüssel begrenzt die maximale Zuordnung."
        },
        {
          "q": "Was sagt NOT NULL beim Fremdschlüssel aus?",
          "o": [
            "Die referenzierende Zeile muss einen Wert haben",
            "Jeder Kunde muss einen Auftrag haben",
            "Alle Tabellen sind unveränderlich",
            "Es gibt keine 1:n-Beziehung"
          ],
          "a": 0,
          "e": "Die Pflicht gilt für das Feld der referenzierenden Zeile."
        },
        {
          "q": "Was ist bei dynamischen Sortierspalten sinnvoll?",
          "o": [
            "Aus einer festen erlaubten Liste auswählen",
            "Beliebige Benutzereingabe in SQL einbauen",
            "Die ganze Datenbank ohne Passwort öffnen",
            "Nur Anführungszeichen entfernen"
          ],
          "a": 0,
          "e": "Wertparameter ersetzen normalerweise keine SQL-Bezeichner."
        }
      ]
    ],
    [
      "see",
      [
        "ps-er",
        "ps-relational",
        "ps-normalisierung",
        "ps-schnittstellen",
        "infra-http",
        "ps-testentwurf"
      ]
    ]
  ]
});

AP2.add("ps-dbzugriff", [
  [
    "h",
    "Fachwörter einfach erklärt"
  ],
  [
    "table",
    [
      "Wort",
      "Einfach erklärt"
    ],
    [
      [
        "Atomar",
        "Die zusammengehörige Änderung geschieht vollständig oder gar nicht."
      ],
      [
        "Konsistent",
        "Die festgelegten Datenregeln sind eingehalten."
      ],
      [
        "Pool",
        "Begrenzter Vorrat wiederverwendbarer Verbindungen."
      ],
      [
        "Rollback",
        "Nicht abgeschlossene Änderungen einer Transaktion zurücknehmen."
      ],
      [
        "Timeout",
        "Eine festgelegte Wartezeit ist überschritten."
      ],
      [
        "Constraint",
        "Regel, welche die Datenbank für gespeicherte Daten erzwingt."
      ]
    ]
  ]
]);
