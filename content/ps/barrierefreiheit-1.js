// Quellen: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
// https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html
AP2.page('ps-barrierefreiheit', {
  "b": "ps",
  "g": "Oberfläche und Gebrauchstauglichkeit",
  "t": "Barrierefreiheit: Tastatur, Semantik, Kontrast und verständliche Fehler",
  "d": "Barrierefreie Oberflächen berücksichtigen unterschiedliche Fähigkeiten und Hilfsmittel. Menschen müssen Informationen wahrnehmen und Funktionen bedienen können. Verständliche Texte und klare Zustände helfen allen Nutzern.",
  "m": "**Wahrnehmbar, bedienbar, verständlich und robust.** Prüfe konkrete Aufgaben mit Tastatur und passenden Hilfsmitteln.",
  "cheat": [
    [
      "Gestaltung",
      [
        "Feldbeschriftungen sichtbar zuordnen.",
        "Nicht nur Farbe als Information verwenden.",
        "Tastaturbedienung und sichtbaren Fokus vorsehen.",
        "Bilder nach ihrem Zweck beschreiben."
      ]
    ],
    [
      "Prüfung",
      [
        "Manuelle Tastaturprüfung",
        "Vergrößerung und schmale Ansicht",
        "Screenreader-Stichprobe",
        "Automatische Prüfungen als Ergänzung"
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Barrierefreiheit und Usability"
    ],
    [
      "p",
      "Usability beschreibt wirksame, effiziente und zufriedenstellende Nutzung im jeweiligen Kontext. Barrierefreiheit berücksichtigt insbesondere Menschen mit Einschränkungen. Eine schöne Oberfläche kann trotzdem mit Tastatur unbedienbar sein. Beide Qualitätsziele ergänzen sich."
    ],
    [
      "table",
      [
        "Situation",
        "Hürde",
        "Geeignete Verbesserung"
      ],
      [
        [
          "Person kann keine Maus verwenden",
          "Aktionen nur per Klick erreichbar",
          "Tastaturbedienbare Standard-Steuerelemente"
        ],
        [
          "Person sieht Farben nicht sicher",
          "Fehler nur rot markiert",
          "Zusätzlicher Text und Symbol mit verständlicher Bedeutung"
        ],
        [
          "Person nutzt Screenreader",
          "Feld ohne zugeordneten Namen",
          "Beschriftung mit label und passender Zuordnung"
        ],
        [
          "Person vergrößert die Darstellung",
          "Inhalt wird abgeschnitten",
          "Flexibles Layout und kontrollierte Vergrößerungsprüfung"
        ],
        [
          "Person versteht Fachsprache schwer",
          "„Validierung fehlgeschlagen“",
          "Konkreten Fehler und nächsten Schritt nennen"
        ]
      ]
    ],
    [
      "h",
      "Semantisches HTML verwenden"
    ],
    [
      "code",
      "html",
      "<form>\n  <label for=\"menge\">Menge</label>\n  <input id=\"menge\" name=\"menge\" type=\"number\" min=\"1\" max=\"50\"\n         required aria-describedby=\"mengenhilfe mengenfehler\">\n  <p id=\"mengenhilfe\">Bitte 1 bis 50 Stück eingeben.</p>\n  <p id=\"mengenfehler\"></p>\n  <button type=\"submit\">Reservieren</button>\n</form>"
    ],
    [
      "p",
      "Das Label gibt dem Feld einen Namen. Hilfetext erklärt die Grenze. Bei einem Fehler ergänzt die Anwendung eine konkrete Meldung. Sie setzt aria-invalid passend und kündigt neue Fehlermeldungen geeignet an. Serverseitige Prüfung bleibt notwendig."
    ],
    [
      "warn",
      "Ein klickbares div ersetzt keinen vollständigen Button. Name, Rolle, Fokus und Tastaturverhalten müssten zusätzlich umgesetzt werden. Ein nativer Button bringt wichtige Grundfunktionen bereits mit."
    ],
    [
      "h",
      "Tastatur und Fokus"
    ],
    [
      "p",
      "Tastaturfokus zeigt das aktuell bedienbare Element. Die Reihenfolge soll zum sichtbaren und fachlichen Ablauf passen. Entferne die Fokusmarkierung nicht ohne geeigneten Ersatz. Dialoge müssen nach dem Schließen eine sinnvolle Fokusposition hinterlassen."
    ],
    [
      "steps",
      [
        "Seite öffnen und die Maus beiseitelegen.",
        "Mit Tab und Umschalt+Tab alle Funktionen erreichen.",
        "Buttons mit den üblichen Tasten betätigen.",
        "Formular mit ungültigen Werten absenden und Fehlermeldungen prüfen.",
        "Dialog öffnen, bedienen und wieder verlassen.",
        "Prüfen, ob der Fokus sichtbar bleibt und keine Tastaturfalle entsteht."
      ]
    ],
    [
      "h",
      "Textkontrast prüfen"
    ],
    [
      "p",
      "WCAG 2.2 nennt für normalen Text auf Stufe AA grundsätzlich mindestens 4,5:1 Kontrast. Für ausreichend großen Text gilt 3:1. Ausnahmen bestehen etwa für Logos und rein dekorative Inhalte. Diese Einzelprüfung beweist keine vollständige Konformität."
    ],
    [
      "table",
      [
        "Gemessener Kontrast",
        "Normaler Text ohne Ausnahme",
        "Begründung"
      ],
      [
        [
          "4,49:1",
          "Nicht ausreichend",
          "Grenzwert 4,5:1 ist nicht erreicht"
        ],
        [
          "4,50:1",
          "Grenzwert erreicht",
          "Kein Aufrunden nötig"
        ],
        [
          "7,00:1",
          "Grenzwert überschritten",
          "Weitere Anforderungen trotzdem prüfen"
        ]
      ]
    ],
    [
      "h",
      "Bilder und Fehlermeldungen"
    ],
    [
      "list",
      [
        "Informative Bilder erhalten einen zweckgerechten Alternativtext.",
        "Reine Dekorationsbilder können einen leeren Alternativtext erhalten.",
        "Ein Symbolbutton benötigt einen verständlichen zugänglichen Namen.",
        "Fehler benennen das betroffene Feld und einen möglichen Korrekturschritt.",
        "Eingegebene gültige Werte nach einem Fehler möglichst erhalten."
      ]
    ],
    [
      "h",
      "Nachweise im Testplan"
    ],
    [
      "table",
      [
        "Test",
        "Erwartung"
      ],
      [
        [
          "Reservierung nur per Tastatur",
          "Alle Schritte ohne Maus ausführbar"
        ],
        [
          "Fehlende Menge",
          "Feld und Fehler sind verständlich zugeordnet"
        ],
        [
          "Rote Fehlermarkierung ohne Farbe betrachten",
          "Fehler bleibt durch Text verständlich"
        ],
        [
          "Automatischer Scanner",
          "Maschinell erkennbare Befunde werden bearbeitet"
        ],
        [
          "Screenreader-Stichprobe",
          "Namen, Rollen und Zustände sind nachvollziehbar"
        ]
      ]
    ],
    [
      "tip",
      "**Erläutern** heißt: Hürde, Maßnahme und Nutzen verbinden. „Barrierefreiheit verbessern“ allein ist keine konkrete Antwort."
    ],
    [
      "qa",
      "Ein Formular zeigt Fehler nur als roten Rand. Der Speichern-Button ist ein div mit Klickhandler. **Erläutern** Sie zwei Probleme mit je einer Verbesserung.",
      [
        "Der rote Rand übermittelt die Information nur durch Farbe. Eine konkrete Textmeldung ergänzen. 2 Punkte: Problem und Maßnahme.",
        "Das div hat ohne weitere Umsetzung keine passende Tastatur- und Buttonsemantik. Einen nativen Button verwenden. 2 Punkte: Problem und Maßnahme."
      ],
      4
    ],
    [
      "qa",
      "Normaler Text hat 4,49:1 Kontrast. **Beurteilen** Sie die Einhaltung von 4,5:1. **Nennen** Sie zwei weitere manuelle Prüfungen.",
      [
        "4,49 ist kleiner als 4,5. Der Grenzwert wird nicht erreicht; nicht aufrunden. 1 Punkt.",
        "Kompletten Ablauf mit Tastatur prüfen. 1 Punkt.",
        "Beschriftungen und Zustände mit Screenreader oder Vergrößerung prüfen. 1 Punkt."
      ],
      3
    ],
    [
      "quiz",
      [
        {
          "q": "Was ersetzt ein automatischer Scanner nicht?",
          "o": [
            "Manuelle Prüfung von Bedienabläufen",
            "Das Finden einiger technischer Befunde",
            "Das Erkennen mancher fehlender Namen",
            "Eine wiederholbare maschinelle Kontrolle"
          ],
          "a": 0,
          "e": "Ein Scanner kann nicht jede fachliche Bedienhürde beurteilen."
        },
        {
          "q": "Wann ist ein leerer Alternativtext sinnvoll?",
          "o": [
            "Bei rein dekorativen Bildern",
            "Bei jeder Anleitungsgrafik",
            "Bei einem Symbolbutton ohne anderen Namen",
            "Bei jedem Produktfoto"
          ],
          "a": 0,
          "e": "Der Zweck im Kontext bestimmt, ob eine Beschreibung benötigt wird."
        },
        {
          "q": "Welche Fehlermeldung hilft am meisten?",
          "o": [
            "Menge muss zwischen 1 und 50 liegen",
            "Fehler 999",
            "Ungültig",
            "Es ging nicht"
          ],
          "a": 0,
          "e": "Die Meldung nennt das Feld und die erlaubten Werte."
        }
      ]
    ],
    [
      "see",
      [
        "ps-ergonomie",
        "ps-ux",
        "ps-wireframe",
        "ps-testentwurf",
        "ps-anforderungen"
      ]
    ]
  ]
});
