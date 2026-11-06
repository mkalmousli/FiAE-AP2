AP2.page('infra-dns', {
  "b": "infra",
  "g": "Netzwerkbetrieb",
  "t": "DNS: Namen auflösen, Records und Fehler eingrenzen",
  "d": "DNS (Domain Name System) ordnet Namen Informationen zu. Dazu gehören IPv4-Adressen und IPv6-Adressen. Ein Resolver fragt DNS-Server ab. Ein Cache speichert Antworten vorübergehend.",
  "m": "**DNS löst Namen auf. DHCP verteilt die Netzkonfiguration.** Ein DNS-Fehler ist kein Beweis für einen Netzwerkausfall.",
  "cheat": [
    [
      "Records",
      [
        "A: IPv4-Adresse",
        "AAAA: IPv6-Adresse",
        "CNAME: anderer DNS-Name",
        "MX: Mailserver",
        "PTR: Rückwärtsauflösung",
        "TXT: Textinformationen"
      ]
    ],
    [
      "Fehlersuche",
      [
        "Namensauflösung getrennt von Erreichbarkeit prüfen.",
        "TTL begrenzt die Cache-Dauer.",
        "DNSSEC prüft Herkunft und Integrität. Es verschlüsselt keine Anfragen."
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Vom Namen zur Adresse"
    ],
    [
      "p",
      "Ein Browser benötigt eine Zieladresse. Er fragt dafür meist den lokalen Resolver. Dieser nutzt seinen Cache oder fragt weitere DNS-Server. Ein autoritativer Server liefert verbindliche Daten seiner Zone."
    ],
    [
      "table",
      [
        "Wort",
        "Einfach erklärt"
      ],
      [
        [
          "Zone",
          "Verwalteter Ausschnitt des DNS-Namensraums"
        ],
        [
          "Resolver",
          "Dienst, der DNS-Antworten für den Client beschafft"
        ],
        [
          "Autoritativ",
          "Für diese Zone zuständig"
        ],
        [
          "TTL",
          "Time To Live: verbleibende Cache-Dauer in Sekunden"
        ]
      ]
    ],
    [
      "seq",
      {
        "w": 760,
        "actors": [
          "Client",
          "Resolver",
          "Root / TLD",
          "Zonenserver"
        ],
        "steps": [
          [
            0,
            1,
            "A portal.beispiel.test?",
            "s"
          ],
          [
            1,
            2,
            "Zuständigen Server suchen",
            "s"
          ],
          [
            2,
            1,
            "Verweis auf nächste Stelle",
            "r"
          ],
          [
            1,
            3,
            "A portal.beispiel.test?",
            "s"
          ],
          [
            3,
            1,
            "192.0.2.40; TTL 300",
            "r"
          ],
          [
            1,
            0,
            "Adresse zurückgeben und cachen",
            "r"
          ]
        ],
        "cap": "Vereinfachte Auflösung ohne Cache. Root und TLD sind getrennte Ebenen."
      }
    ],
    [
      "h",
      "DNS-Einträge lesen"
    ],
    [
      "table",
      [
        "Name",
        "Typ",
        "Wert",
        "Bedeutung"
      ],
      [
        [
          "portal.beispiel.test",
          "A",
          "192.0.2.40",
          "IPv4-Ziel"
        ],
        [
          "portal.beispiel.test",
          "AAAA",
          "2001:db8::40",
          "IPv6-Ziel"
        ],
        [
          "www.beispiel.test",
          "CNAME",
          "portal.beispiel.test",
          "Alias auf einen Namen"
        ],
        [
          "beispiel.test",
          "MX",
          "10 mail.beispiel.test",
          "Mailziel; niedrigere Prioritätszahl wird bevorzugt"
        ],
        [
          "40.2.0.192.in-addr.arpa",
          "PTR",
          "portal.beispiel.test",
          "Name zu einer IPv4-Adresse"
        ]
      ]
    ],
    [
      "note",
      "Die Adressen 192.0.2.0/24 und 2001:db8::/32 dienen hier nur als Dokumentationsbeispiele."
    ],
    [
      "h",
      "Transport und Sicherheit"
    ],
    [
      "list",
      [
        "Klassisches DNS verwendet UDP und TCP auf Port 53.",
        "TCP wird beispielsweise bei abgeschnittenen Antworten und Zonenübertragungen benötigt.",
        "DNS über TLS oder HTTPS schützt den Transport zum jeweiligen DNS-Dienst.",
        "DNSSEC signiert DNS-Daten. Es schützt deren überprüfbare Herkunft und Integrität.",
        "DNSSEC ersetzt weder HTTPS noch die Berechtigungsprüfung der Anwendung."
      ]
    ],
    [
      "h",
      "Fehler systematisch eingrenzen"
    ],
    [
      "code",
      "text",
      "nslookup portal.beispiel.test\nnslookup portal.beispiel.test 10.20.0.53\n# Unter Systemen mit dig:\ndig portal.beispiel.test A\ndig portal.beispiel.test AAAA"
    ],
    [
      "table",
      [
        "Beobachtung",
        "Mögliche Ursache",
        "Nächster Schritt"
      ],
      [
        [
          "IP-Verbindung klappt, Name liefert NXDOMAIN",
          "Name existiert nicht oder falsche Zone wird gefragt",
          "Schreibweise und zuständigen DNS-Server prüfen"
        ],
        [
          "SERVFAIL",
          "Server kann keine gültige Antwort liefern",
          "DNS-Server, Weiterleitung und DNSSEC-Prüfung untersuchen"
        ],
        [
          "Timeout",
          "Keine Antwort rechtzeitig",
          "Erreichbarkeit und Firewall für UDP/TCP 53 prüfen"
        ],
        [
          "Alter Zielserver trotz Änderung",
          "Antwort noch im Cache",
          "TTL und Eintrag beim autoritativen Server prüfen"
        ]
      ]
    ],
    [
      "warn",
      "Ein HTTPS-Aufruf über eine IP kann am Zertifikat oder virtuellen Host scheitern. Das beweist keinen DNS-Fehler. Ein erfolgloser Ping beweist ebenfalls keinen Serverausfall."
    ],
    [
      "qa",
      "Ein Eintrag hat TTL 600 Sekunden. Er wird um 10:04 Uhr frisch gecacht. Um 10:06 Uhr ändert sich das Ziel. **Berechnen** Sie das reguläre Cache-Ende. **Erläutern** Sie die Verzögerung.",
      [
        "10:04 Uhr + 600 Sekunden = **10:14 Uhr**. Dafür 1 Punkt.",
        "Ab der Änderung bleiben maximal acht Minuten in diesem Cache. Dafür 1 Punkt.",
        "Der Cache darf bis zum Ablauf noch die alte Antwort liefern. Dafür 1 Punkt."
      ],
      3
    ],
    [
      "qa",
      "Ein Portal ist über seinen Namen unerreichbar. Eine TCP-Verbindung zur bekannten IP auf Port 443 klappt. **Beschreiben** Sie vier sinnvolle Prüfschritte. Nennen heißt hier: konkrete Schritte angeben.",
      [
        "- Namen und Fehlermeldung prüfen.",
        "- A- und AAAA-Einträge beim konfigurierten Resolver abfragen.",
        "- Antworten mit dem zuständigen Zonenserver vergleichen.",
        "- Bei Abweichungen Cache, TTL und Serverkonfiguration prüfen.",
        "Je Schritt 1 Punkt. Die TCP-Verbindung allein bestätigt noch keinen funktionierenden HTTPS-Dienst."
      ],
      4
    ],
    [
      "quiz",
      [
        {
          "q": "Was enthält ein CNAME-Eintrag?",
          "o": [
            "Einen anderen DNS-Namen",
            "Eine MAC-Adresse",
            "Eine Subnetzmaske",
            "Ein Passwort"
          ],
          "a": 0,
          "e": "Ein CNAME ist ein Alias auf einen DNS-Namen."
        },
        {
          "q": "Was schützt DNSSEC?",
          "o": [
            "Die Integrität und Herkunft signierter DNS-Daten",
            "Den Inhalt jeder HTTPS-Seite",
            "Die Geheimhaltung aller DNS-Anfragen",
            "Die lokale Festplatte"
          ],
          "a": 0,
          "e": "DNSSEC ist keine Transportverschlüsselung."
        },
        {
          "q": "Welche Aussage über Port 53 stimmt?",
          "o": [
            "DNS kann UDP und TCP nutzen",
            "DNS nutzt nur UDP",
            "DNS nutzt nur TCP",
            "DNS braucht keinen Port"
          ],
          "a": 0,
          "e": "Beide Transportprotokolle sind für klassisches DNS wichtig."
        }
      ]
    ],
    [
      "see",
      [
        "infra-ipconfig",
        "infra-dhcp",
        "infra-http",
        "infra-tls"
      ]
    ]
  ]
});
