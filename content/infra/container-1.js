AP2.page('infra-container', {
  "b": "infra",
  "g": "Server und Virtualisierung",
  "t": "Container: Image, Betrieb, Volumes und sichere Bereitstellung",
  "d": "Ein Container führt eine Anwendung isoliert aus. Container teilen den Kernel ihrer Laufzeitumgebung. Ein Image ist die Vorlage. Ein Volume speichert Daten unabhängig vom Lebenszyklus eines Containers.",
  "m": "**Image = Vorlage. Container = laufende Instanz. Volume = dauerhafte Daten.** Ein Container ist kein Backup.",
  "cheat": [
    [
      "Begriffe",
      [
        "Registry: Speicher für Images",
        "Image-Digest: Kennung eines konkreten Inhalts",
        "Port-Mapping: Host-Port an Container-Port weiterleiten",
        "Healthcheck: Zustand des Dienstes prüfen"
      ]
    ],
    [
      "Betrieb",
      [
        "Prozess möglichst ohne Root-Rechte starten.",
        "Secrets getrennt übergeben.",
        "Datenbankdaten dauerhaft speichern.",
        "Ressourcenlimits und Überwachung einrichten."
      ]
    ]
  ],
  "blocks": [
    [
      "h",
      "Container und virtuelle Maschine"
    ],
    [
      "table",
      [
        "Merkmal",
        "Container",
        "Virtuelle Maschine"
      ],
      [
        [
          "Kernel",
          "Mit Laufzeitumgebung geteilt",
          "Eigener Gastkernel"
        ],
        [
          "Start",
          "Oft schnell, da kein vollständiger Gaststart",
          "Start des Gastbetriebssystems"
        ],
        [
          "Isolation",
          "Prozessisolation; gemeinsamer Kernel ist Sicherheitsgrenze",
          "Hypervisor trennt Gastmaschinen"
        ],
        [
          "Portabilität",
          "Passende Architektur und Kernelumgebung erforderlich",
          "Passende Virtualisierungsplattform erforderlich"
        ],
        [
          "Betriebssystem",
          "Linux-Container benötigen eine Linux-Kernelumgebung",
          "Gastbetriebssystem kann vom Host abweichen"
        ]
      ]
    ],
    [
      "note",
      "Ein Desktop kann Linux-Container über eine Linux-VM ausführen. Deshalb ist „Container laufen ohne Betriebssystem“ falsch."
    ],
    [
      "h",
      "Vom Quelltext zum Betrieb"
    ],
    [
      "seq",
      {
        "w": 760,
        "actors": [
          "Entwicklung",
          "CI-Pipeline",
          "Registry",
          "Laufzeit"
        ],
        "steps": [
          [
            0,
            1,
            "Quellstand mit Tests übergeben",
            "s"
          ],
          [
            1,
            1,
            "Image bauen und prüfen",
            "s"
          ],
          [
            1,
            2,
            "Geprüftes Image veröffentlichen",
            "s"
          ],
          [
            3,
            2,
            "Konkreten Image-Digest laden",
            "s"
          ],
          [
            2,
            3,
            "Image bereitstellen",
            "r"
          ],
          [
            3,
            3,
            "Mit Konfiguration und Volume starten",
            "s"
          ]
        ],
        "cap": "Einmal bauen, denselben geprüften Inhalt in weitere Umgebungen übernehmen."
      }
    ],
    [
      "h",
      "Deklarative Konfiguration lesen"
    ],
    [
      "code",
      "yaml",
      "services:\n  web:\n    image: beispiel-web:1.4.2\n    ports:\n      - \"8080:3000\"\n    environment:\n      APP_ENV: production\n    read_only: true\n    tmpfs:\n      - /tmp\n  db:\n    image: postgres:16\n    volumes:\n      - dbdaten:/var/lib/postgresql/data\n    environment:\n      POSTGRES_PASSWORD_FILE: /run/secrets/dbpass\n    secrets:\n      - dbpass\nvolumes:\n  dbdaten:\nsecrets:\n  dbpass:\n    file: ./secrets/dbpass.txt"
    ],
    [
      "p",
      "Das Beispiel zeigt das Format. Es ist keine vollständige Produktionskonfiguration. Versionen sind Beispielwerte. Die Geheimnisdatei gehört nicht ins Repository. Datenbankname und Zugang der Webanwendung müssen zusätzlich eingerichtet werden."
    ],
    [
      "table",
      [
        "Eintrag",
        "Wirkung",
        "Prüfungsfalle"
      ],
      [
        [
          "8080:3000",
          "Host-Port 8080 führt zum Container-Port 3000",
          "Die Reihenfolge nicht vertauschen"
        ],
        [
          "Volume dbdaten",
          "Daten überleben die Neuerstellung des DB-Containers",
          "Ein gelöschtes Volume verliert seine Daten"
        ],
        [
          "read_only",
          "Beschreibbare Containerdateien einschränken",
          "Anwendung benötigt eventuell definierte Schreibpfade"
        ],
        [
          "Tag 1.4.2",
          "Lesbarer Versionsname",
          "Tags können neu zugeordnet werden; Digest ist genauer"
        ]
      ]
    ],
    [
      "h",
      "Ressourcen planen"
    ],
    [
      "p",
      "Ein Host bietet 16 GiB RAM. Betriebssystem und Reserve benötigen zusammen 4 GiB. Ein Dienst benötigt unter Testlast maximal 1,5 GiB. Die Rechnung betrachtet nur RAM."
    ],
    [
      "walk",
      {
        "t": "Maximale Instanzzahl unter dieser Annahme",
        "steps": [
          {
            "t": "Nutzbaren Speicher bestimmen",
            "b": [
              [
                "p",
                "16 GiB − 4 GiB = **12 GiB**."
              ]
            ]
          },
          {
            "t": "Instanzen berechnen",
            "b": [
              [
                "p",
                "12 GiB / 1,5 GiB = **8 Instanzen**."
              ]
            ]
          },
          {
            "t": "Ergebnis begrenzen",
            "b": [
              [
                "p",
                "CPU, I/O, Netz und Lastspitzen separat prüfen. Acht ist keine allgemeine Leistungszusage."
              ]
            ]
          }
        ]
      }
    ],
    [
      "h",
      "Betrieb sicher gestalten"
    ],
    [
      "steps",
      [
        "Minimales Image verwenden und unnötige Werkzeuge vermeiden.",
        "Abhängigkeiten prüfen und Images regelmäßig neu bauen.",
        "Mit geringsten Rechten und ohne unnötige Host-Mounts starten.",
        "Secrets zur Laufzeit übergeben; nicht in Images einbauen.",
        "Healthchecks, Logs, Limits und Neustartstrategie definieren.",
        "Volumes sichern und Wiederherstellung getrennt testen."
      ]
    ],
    [
      "qa",
      "**Erläutern** Sie drei Unterschiede zwischen Image, Container und Volume. **Begründen** Sie einen Backuptest.",
      [
        "Image: unveränderte Vorlage für die Ausführung. 1 Punkt.",
        "Container: konkrete Instanz mit eigenem Laufzustand. 1 Punkt.",
        "Volume: getrennte dauerhafte Datenablage. 1 Punkt.",
        "Ein vorhandenes Volume schützt nicht vor Löschfehlern; Wiederherstellung muss nachgewiesen werden. 1 Punkt."
      ],
      4
    ],
    [
      "qa",
      "Ein Update startet korrekt. Nach zehn Minuten steigt der Speicherbedarf stark. **Nennen** Sie vier passende Maßnahmen.",
      [
        "- Speicherverbrauch mit Lastverlauf überwachen.",
        "- Passende Speicherlimits und Reserve festlegen.",
        "- Ursache wie Speicherleck oder zu großen Cache untersuchen.",
        "- Geprüften Rückfall auf den vorherigen Stand vorbereiten.",
        "Je Maßnahme 1 Punkt. Ein Neustart allein beseitigt die Ursache nicht."
      ],
      4
    ],
    [
      "quiz",
      [
        {
          "q": "Welche Daten überleben eine Container-Neuerstellung zuverlässig?",
          "o": [
            "Daten in einem weiterhin vorhandenen Volume",
            "Alle Dateien im alten Container",
            "Nur Daten im RAM",
            "Keine Daten überhaupt"
          ],
          "a": 0,
          "e": "Ein Volume ist vom Container getrennt. Es muss trotzdem gesichert werden."
        },
        {
          "q": "Welches Kennzeichen bindet den Image-Inhalt am genauesten?",
          "o": [
            "Digest",
            "latest-Tag",
            "Containername",
            "Host-Port"
          ],
          "a": 0,
          "e": "Ein Digest identifiziert den Inhalt kryptografisch."
        },
        {
          "q": "Was teilen Linux-Container einer Laufzeitumgebung?",
          "o": [
            "Den Kernel",
            "Ein zwingend gemeinsames Benutzerkonto",
            "Alle Prozessspeicher",
            "Alle Konfigurationsdateien"
          ],
          "a": 0,
          "e": "Isolation trennt Prozesse und Ressourcen. Der Kernel wird geteilt."
        }
      ]
    ],
    [
      "see",
      [
        "infra-virtualisierung",
        "infra-backup",
        "infra-monitoring",
        "ps-cicd"
      ]
    ]
  ]
});
