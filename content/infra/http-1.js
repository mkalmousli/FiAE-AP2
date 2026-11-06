AP2.page('infra-http', {
  "b": "infra",
  "g": "Transport und Dienste",
  "t": "HTTP und REST: Methoden, Statuscodes, Cache und Wiederholungen",
  "d": "HTTP überträgt Anfragen und Antworten zwischen Client und Server. HTTPS schützt diese Übertragung mit TLS. REST ist ein Architekturstil. Er verwendet oft HTTP und JSON, schreibt JSON aber nicht vor.",
  "m": "**Methode + Ziel + Header + optionaler Body = Anfrage.** Statuscode und Antwortinhalt gemeinsam auswerten.",
  "cheat": [
    [
      "Methoden",
      [
        "GET: lesen; sicher und idempotent",
        "POST: Verarbeitung; nicht allgemein idempotent",
        "PUT: Zielzustand ersetzen; idempotent",
        "PATCH: teilweise Änderung; nicht allgemein idempotent",
        "DELETE: Ressource entfernen; idempotent"
      ]
    ],
    [
      "Statusgruppen",
      [
        "2xx: erfolgreich",
        "3xx: Weiterleitung oder Cachebehandlung",
        "4xx: Anfrage oder Berechtigung problematisch",
        "5xx: serverseitiger Fehler"
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Eine Anfrage lesen"
    ],
    [
      "code",
      "http",
      "POST /api/auftraege HTTP/1.1\nHost: portal.beispiel.test\nContent-Type: application/json\nAccept: application/json\n\n{\"artikelId\": 42, \"anzahl\": 3}"
    ],
    [
      "code",
      "http",
      "HTTP/1.1 201 Created\nLocation: /api/auftraege/731\nContent-Type: application/json\n\n{\"id\": 731, \"status\": \"offen\"}"
    ],
    [
      "table",
      [
        "Teil",
        "Bedeutung"
      ],
      [
        [
          "Content-Type",
          "Format des gesendeten Inhalts"
        ],
        [
          "Accept",
          "Gewünschte Antwortformate"
        ],
        [
          "Location",
          "Adresse einer neu angelegten Ressource oder Weiterleitungsziel"
        ],
        [
          "Body",
          "Nutzdaten; nicht jede Nachricht benötigt einen Body"
        ]
      ]
    ],
    [
      "h",
      "Statuscodes passend wählen"
    ],
    [
      "table",
      [
        "Code",
        "Bedeutung",
        "Beispiel"
      ],
      [
        [
          "200 OK",
          "Erfolgreiche Anfrage mit Antwortinhalt",
          "Auftrag gelesen"
        ],
        [
          "201 Created",
          "Ressource wurde angelegt",
          "Neue Bestellung"
        ],
        [
          "204 No Content",
          "Erfolg ohne Antwortinhalt",
          "Erfolgreiches Löschen"
        ],
        [
          "400 Bad Request",
          "Ungültige Anfrage",
          "Fehlerhaftes JSON"
        ],
        [
          "401 Unauthorized",
          "Authentifizierung fehlt oder ist ungültig",
          "Sitzung abgelaufen"
        ],
        [
          "403 Forbidden",
          "Zugriff wird verweigert",
          "Rolle darf nicht freigeben"
        ],
        [
          "404 Not Found",
          "Ressource nicht gefunden oder bewusst verborgen",
          "Unbekannte Auftrags-ID"
        ],
        [
          "409 Conflict",
          "Konflikt mit dem aktuellen Zustand",
          "Doppelte fachlich eindeutige Nummer"
        ],
        [
          "429 Too Many Requests",
          "Zu viele Anfragen",
          "Rate Limit erreicht"
        ],
        [
          "500 Internal Server Error",
          "Unerwarteter Serverfehler",
          "Unbehandelte Ausnahme"
        ],
        [
          "502 Bad Gateway",
          "Gateway erhält ungültige Upstream-Antwort",
          "Backend-Verbindung scheitert"
        ],
        [
          "503 Service Unavailable",
          "Dienst vorübergehend nicht verfügbar",
          "Wartung oder Überlastung"
        ]
      ]
    ],
    [
      "h",
      "Idempotenz und Timeouts"
    ],
    [
      "p",
      "Idempotent bedeutet: Wiederholungen haben denselben beabsichtigten Effekt wie eine Ausführung. Antworten dürfen sich trotzdem unterscheiden. DELETE kann erst 204 und danach 404 liefern. Die Ressource bleibt in beiden Fällen gelöscht."
    ],
    [
      "seq",
      {
        "w": 760,
        "actors": [
          "Client",
          "API",
          "Datenbank"
        ],
        "steps": [
          [
            0,
            1,
            "POST Bestellung; Schlüssel K-17",
            "s"
          ],
          [
            1,
            2,
            "Bestellung und Schlüssel atomar speichern",
            "s"
          ],
          [
            2,
            1,
            "Bestellung 731",
            "r"
          ],
          [
            1,
            0,
            "Antwort geht im Netz verloren",
            "r"
          ],
          [
            0,
            1,
            "Wiederholung mit K-17",
            "s"
          ],
          [
            1,
            2,
            "Vorhandenen Schlüssel nachschlagen",
            "s"
          ],
          [
            2,
            1,
            "Schon verarbeitet: 731",
            "r"
          ],
          [
            1,
            0,
            "Ursprüngliches Ergebnis zurückgeben",
            "r"
          ]
        ],
        "cap": "Ein fachlich vereinbarter Idempotenzschlüssel verhindert eine doppelte Bestellung."
      }
    ],
    [
      "warn",
      "Ein Timeout bedeutet: Die Antwort kam nicht rechtzeitig an. Die Aktion kann bereits gespeichert sein. Wiederhole einen POST deshalb nicht blind. Ein Idempotenzschlüssel benötigt eine atomare serverseitige Umsetzung."
    ],
    [
      "h",
      "Cache mit ETag"
    ],
    [
      "steps",
      [
        "Server liefert Daten und einen ETag als Versionskennung.",
        "Client sendet später If-None-Match mit dieser Kennung.",
        "Bei unveränderten Daten antwortet der Server mit 304 ohne neuen Body.",
        "Bei geänderten Daten kommen der neue Inhalt und ein neuer ETag."
      ]
    ],
    [
      "note",
      "Für schreibende Zugriffe kann If-Match verlorene Änderungen verhindern. Der Server prüft die Version atomar. Eine veraltete Version führt beispielsweise zu 412 Precondition Failed."
    ],
    [
      "h",
      "Sicherheit an der Schnittstelle"
    ],
    [
      "list",
      [
        "HTTPS schützt Daten auf dem Transportweg.",
        "Der Server prüft für jede Ressource die Berechtigung.",
        "Eingaben werden serverseitig nach Typ, Länge und Fachregeln geprüft.",
        "Tokens gehören weder in URLs noch in frei lesbare Logs.",
        "CORS steuert Browserzugriffe. Es ersetzt keine Authentifizierung oder Autorisierung."
      ]
    ],
    [
      "tip",
      "**Begründen** heißt: Entscheidung mit einer passenden Ursache verbinden. Beispiel: 201, weil eine neue Ressource entsteht."
    ],
    [
      "qa",
      "Ein Client sendet dieselbe Bestellung nach einem Timeout erneut. **Erläutern** Sie das Risiko. **Entwerfen** Sie eine Lösung mit drei Merkmalen.",
      [
        "Risiko: Die erste Anfrage wurde schon gespeichert; eine zweite Bestellung entsteht. 1 Punkt.",
        "Client erzeugt einen stabilen Schlüssel für denselben Bestellversuch. 1 Punkt.",
        "Server speichert Schlüssel und Ergebnis atomar mit einer Eindeutigkeitsregel. 1 Punkt.",
        "Wiederholung liefert das gespeicherte Ergebnis; abweichende Nutzdaten werden zurückgewiesen. 1 Punkt."
      ],
      4
    ],
    [
      "qa",
      "**Ordnen** Sie passende Statuscodes zu: Auftrag angelegt, Login fehlt, Zugriff verboten, Versionskonflikt mit If-Match.",
      [
        "Auftrag angelegt: **201**.",
        "Login fehlt: **401**.",
        "Zugriff verboten: **403**.",
        "If-Match passt nicht: **412**.",
        "Je Zuordnung 1 Punkt."
      ],
      4
    ],
    [
      "quiz",
      [
        {
          "q": "Welche Aussage ist richtig?",
          "o": [
            "REST kann auch XML übertragen",
            "REST verlangt immer JSON",
            "HTTPS ersetzt Berechtigungen",
            "Jeder POST ist idempotent"
          ],
          "a": 0,
          "e": "REST ist ein Architekturstil. Die Darstellung kann verschiedene Formate verwenden."
        },
        {
          "q": "Was bedeutet 304?",
          "o": [
            "Vorhandene Cache-Darstellung ist weiter verwendbar",
            "Neue Bestellung angelegt",
            "Passwort falsch",
            "Server abgestürzt"
          ],
          "a": 0,
          "e": "Die bedingte Anfrage braucht keinen neuen Antwortinhalt."
        },
        {
          "q": "Was bedeutet idempotent?",
          "o": [
            "Wiederholungen ändern den beabsichtigten Endeffekt nicht",
            "Jede Antwort hat identische Header",
            "Der Aufruf ist immer lesend",
            "Die Anfrage braucht kein Netz"
          ],
          "a": 0,
          "e": "Auch PUT und DELETE sind idempotent, obwohl sie schreiben."
        }
      ]
    ],
    [
      "see",
      [
        "infra-tls",
        "infra-websec",
        "ps-dbzugriff",
        "ps-schnittstellen"
      ]
    ]
  ]
});
