AP2.page('infra-dhcp', {
  "b": "infra",
  "g": "Netzwerkbetrieb",
  "t": "DHCP: DORA, Lease, Relay und Adressplanung",
  "d": "DHCP (Dynamic Host Configuration Protocol) verteilt die Netzkonfiguration automatisch. DHCPv4 vergibt Adressen zeitweise oder nach festen Zuordnungen. Ein Relay verbindet Clients mit einem DHCP-Server in einem anderen Netz.",
  "m": "**DORA: Discover → Offer → Request → ACK.** Eine Reservierung bleibt DHCP. Eine lokal eingetragene Adresse benötigt keine DHCP-Vergabe.",
  "cheat": [
    [
      "DHCPv4",
      [
        "Server: UDP 67; Client: UDP 68",
        "IP-Adresse, Maske, Gateway, DNS und Lease",
        "Reservierung: feste Zuordnung zu einem Client"
      ]
    ],
    [
      "Betrieb",
      [
        "Adresspool ausreichend groß planen.",
        "Feste Geräteadressen nicht unkontrolliert im dynamischen Pool verwenden.",
        "Relay für getrennte Subnetze einrichten."
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "DORA bei der ersten Vergabe"
    ],
    [
      "seq",
      {
        "w": 760,
        "actors": [
          "Client",
          "Relay im Clientnetz",
          "DHCP-Server"
        ],
        "steps": [
          [
            0,
            1,
            "Discover als Broadcast",
            "s"
          ],
          [
            1,
            2,
            "Discover mit Netzzuordnung weiterleiten",
            "s"
          ],
          [
            2,
            1,
            "Offer mit Konfiguration",
            "r"
          ],
          [
            1,
            0,
            "Offer zustellen",
            "r"
          ],
          [
            0,
            1,
            "Request: Angebot auswählen",
            "s"
          ],
          [
            1,
            2,
            "Request weiterleiten",
            "s"
          ],
          [
            2,
            1,
            "ACK bestätigt Lease",
            "r"
          ],
          [
            1,
            0,
            "ACK zustellen",
            "r"
          ]
        ],
        "cap": "Mit Relay. Ohne Relay kommunizieren Client und Server im gleichen Broadcastbereich."
      }
    ],
    [
      "p",
      "Der anfängliche Request informiert auch andere Server über die Auswahl. Offer und ACK können je nach Zustand Broadcast oder Unicast sein. DORA beschreibt die Erstvergabe. Verlängerungen benötigen meist weniger Nachrichten."
    ],
    [
      "table",
      [
        "Vergabeart",
        "Zuordnung",
        "Beispiel"
      ],
      [
        [
          "Manuell durch DHCP",
          "Administrator reserviert eine Adresse für einen Client",
          "Netzwerkdrucker"
        ],
        [
          "Automatisch",
          "Server vergibt eine dauerhafte Zuordnung",
          "Fester Arbeitsplatz"
        ],
        [
          "Dynamisch",
          "Adresse gilt für eine begrenzte Lease-Zeit",
          "Besuchergerät"
        ],
        [
          "Lokal statisch",
          "Adresse steht direkt im Betriebssystem",
          "Server ohne DHCP-Abhängigkeit"
        ]
      ]
    ],
    [
      "h",
      "Lease richtig verstehen"
    ],
    [
      "p",
      "Eine Lease ist eine befristete Nutzungserlaubnis. Der Client versucht rechtzeitig eine Verlängerung. Bei Standardwerten liegt T1 bei 50 Prozent der Lease-Zeit. T2 liegt bei 87,5 Prozent. Server dürfen andere Zeiten vorgeben."
    ],
    [
      "table",
      [
        "Phase",
        "Ziel",
        "Verhalten"
      ],
      [
        [
          "Vor T1",
          "Bestehende Konfiguration verwenden",
          "Lease läuft weiter"
        ],
        [
          "Ab T1",
          "Ursprünglichen Server erreichen",
          "Renewal meist per Unicast"
        ],
        [
          "Ab T2",
          "Beliebigen passenden Server erreichen",
          "Rebinding meist per Broadcast"
        ],
        [
          "Nach Ablauf",
          "Abgelaufene Adresse nicht weiterverwenden",
          "Neue Konfiguration anfordern"
        ]
      ]
    ],
    [
      "h",
      "Adresspool berechnen"
    ],
    [
      "p",
      "Ein Schulungsnetz nutzt 10.30.8.0/24. Der dynamische Pool reicht von .50 bis .199. Zwölf Pooladressen sind ausdrücklich reserviert. Weitere 18 Leases gehören noch abwesenden Geräten. 95 Geräte sind aktiv."
    ],
    [
      "walk",
      {
        "t": "Reicht der Pool für 30 neue Geräte?",
        "steps": [
          {
            "t": "Pool zählen",
            "b": [
              [
                "p",
                "199 − 50 + 1 = **150 Adressen**. Die Grenzen werden mitgezählt."
              ]
            ]
          },
          {
            "t": "Belegte und gebundene Adressen abziehen",
            "b": [
              [
                "p",
                "150 − 12 − 18 − 95 = **25 freie Adressen**. Laut Anlage überschneiden sich die Gruppen nicht."
              ]
            ]
          },
          {
            "t": "Bedarf beurteilen",
            "b": [
              [
                "p",
                "30 neue Geräte benötigen 30 Adressen. Es fehlen **5 Adressen**."
              ],
              [
                "p",
                "Pool im Subnetz erweitern oder nicht benötigte Leases kontrolliert freigeben."
              ]
            ]
          }
        ]
      }
    ],
    [
      "warn",
      "Eine kurze Lease trennt Geräte nicht automatisch vom Netz. Aktive Geräte können ihre Lease verlängern. Ein VLAN benötigt einen passenden DHCP-Bereich und gegebenenfalls ein Relay."
    ],
    [
      "h",
      "Fehlersuche"
    ],
    [
      "table",
      [
        "Symptom",
        "Vermutung",
        "Prüfung"
      ],
      [
        [
          "169.254.x.x auf Windows",
          "Keine erfolgreiche DHCP-Konfiguration",
          "Kabel, VLAN, Pool, Dienst und Relay prüfen"
        ],
        [
          "Falsches Gateway",
          "Falsche DHCP-Option oder fremder DHCP-Server",
          "Lease-Details und Serverkennung prüfen"
        ],
        [
          "Nur ein VLAN betroffen",
          "Relay oder Bereich fehlt",
          "Relay-Ziel und Subnetzzuordnung prüfen"
        ],
        [
          "IP-Konflikte",
          "Statische Adresse liegt im Pool",
          "Ausschlüsse und Reservierungen prüfen"
        ]
      ]
    ],
    [
      "tip",
      "**Erläutern** heißt: Schritt nennen und seine Aufgabe erklären. Schreibe bei DORA vier kurze Sätze."
    ],
    [
      "qa",
      "**Erläutern** Sie die vier DORA-Schritte für ein neues Notebook.",
      [
        "- Discover: Der Client sucht DHCP-Server.",
        "- Offer: Ein Server bietet eine Konfiguration an.",
        "- Request: Der Client fordert das ausgewählte Angebot an.",
        "- ACK: Der Server bestätigt die Nutzung für die Lease-Zeit.",
        "Je vollständigem Schritt 1 Punkt."
      ],
      4
    ],
    [
      "qa",
      "Eine Lease dauert acht Stunden. Beginn ist 08:00 Uhr. **Berechnen** Sie T1 und T2 mit Standardwerten. **Begründen** Sie den Relay-Einsatz bei einem zentralen Server.",
      [
        "T1: 8 h × 0,5 = 4 h; also **12:00 Uhr**. 1 Punkt.",
        "T2: 8 h × 0,875 = 7 h; also **15:00 Uhr**. 1 Punkt.",
        "Router leiten lokale DHCP-Broadcasts normalerweise nicht weiter. 1 Punkt.",
        "Das Relay übermittelt die Nachrichten zwischen Clientnetz und zentralem Server. 1 Punkt."
      ],
      4
    ],
    [
      "quiz",
      [
        {
          "q": "Wie viele Adressen umfasst der Bereich .100 bis .149?",
          "o": [
            "50",
            "49",
            "149",
            "100"
          ],
          "a": 0,
          "e": "149 − 100 + 1 = 50."
        },
        {
          "q": "Was gilt bei einer DHCP-Reservierung?",
          "o": [
            "Der Client nutzt weiterhin DHCP",
            "Der Client braucht kein Netz",
            "Es gibt keinen DHCP-Server",
            "Die Adresse ist öffentlich"
          ],
          "a": 0,
          "e": "Die Zuordnung ist fest. Die Konfiguration wird trotzdem per DHCP geliefert."
        },
        {
          "q": "Welcher Port gehört zum DHCPv4-Client?",
          "o": [
            "UDP 68",
            "TCP 443",
            "UDP 53",
            "TCP 22"
          ],
          "a": 0,
          "e": "DHCPv4 verwendet UDP 67 am Server und UDP 68 am Client."
        }
      ]
    ],
    [
      "see",
      [
        "infra-dns",
        "infra-ipconfig",
        "infra-vlan",
        "infra-subnetting"
      ]
    ]
  ]
});
