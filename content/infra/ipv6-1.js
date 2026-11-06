AP2.page('infra-ipv6', {
  b: 'infra', g: 'IP-Adressierung', t: 'IPv6-Grundlagen',
  d: '**IPv6** ist der Nachfolger von IPv4. Eine IPv6-Adresse hat **128 Bit** und wird als **8 Gruppen aus je 4 Hexadezimalziffern** geschrieben (zum Beispiel `2001:0db8:0000:0000:0000:ff00:0042:8329`). Es gibt **kein Broadcast** mehr, der Adressraum ist so groß, dass **NAT nicht nötig** ist. Das Standard-Subnetz ist ein **/64**.',
  m: '**128 Bit = 8 mal 16 Bit = 8 Gruppen.** Kürzen: **führende Nullen weglassen** und **eine** Folge aus Null-Gruppen durch `::` ersetzen (nur **einmal** pro Adresse!). Kein Broadcast: stattdessen **Multicast**. Link-Local liegt im Bereich **fe80::/10**.',
  cheat: [
    ['Aufbau', ['128 Bit, 8 Gruppen, hexadezimal, durch `:` getrennt', 'Präfix (Netz) + Interface-ID (Host)', 'Standard-Subnetz **/64**: 64 Bit Netz, 64 Bit Host']],
    ['Kürzungsregeln', ['1. **Führende Nullen** einer Gruppe weglassen', '2. **Eine** Folge von Null-Gruppen durch `::`', '`2001:0db8:0000:0000:0000:ff00:0042:8329` wird `2001:db8::ff00:42:8329`']],
    ['Adresstypen', ['**Unicast:** ein Empfänger (global 2000::/3, link-local fe80::/10, ULA fc00::/7)', '**Multicast:** Gruppe (ff00::/8)', '**Anycast:** gemäß Routing nächster Empfänger', '**Kein Broadcast!**']],
    ['Sonderadressen', ['`::1` Loopback', '`::` unspezifiziert', '`fe80::` Link-Local (jedes Interface)', '`2001:db8::/32` nur für Dokumentation']],
  ],
  blocks: [
    ['h', 'Warum IPv6?'],
    ['p', 'IPv4 hat nur etwa **4,3 Milliarden** Adressen (2^32). Durch das Wachstum des Internets (Handys, Sensoren, IoT) sind die öffentlichen IPv4-Adressen **aufgebraucht**. NAT hat das Problem verlängert, aber nicht gelöst. **IPv6** bietet **2^128 Adressen**, ungefähr 3,4 mal 10^38, genug für jedes Gerät auf der Welt.'],
    ['h', 'Aufbau und Schreibweise'],
    ['p', 'Die 128 Bit werden in **8 Blöcke zu je 16 Bit** geteilt. Jeder Block ist **hexadezimal** (Ziffern 0 bis 9 und a bis f) geschrieben, getrennt durch Doppelpunkte. 16 Bit entsprechen 4 Hexadezimalziffern.'],
    ['code', 'text', `Vollständig:  2001:0db8:0000:0000:0000:ff00:0042:8329
              |---- Präfix ----||--- Interface-ID ---|
Schritt 1:    2001:db8:0:0:0:ff00:42:8329       (führende Nullen weg)
Schritt 2:    2001:db8::ff00:42:8329            (Null-Gruppen durch :: ersetzt)`],
    ['warn', 'Das `::` darf **nur einmal** in einer Adresse stehen, sonst wäre unklar, wie viele Null-Gruppen jeweils gemeint sind. Bei mehreren möglichen Folgen kürzt man die **längste** Folge.'],
    ['tool', 'ipv6'],
    ['h', 'Adresstypen'],
    ['table', ['Typ', 'Präfix', 'Bedeutung', 'Vergleich IPv4'], [
      ['**Global Unicast (GUA)**', '2000::/3 (meist 2001:..., 2003:...)', 'Öffentlich, weltweit eindeutig, im Internet erreichbar', 'Öffentliche Adresse'],
      ['**Link-Local**', 'fe80::/10', 'Nur im lokalen Netzsegment, jedes Interface hat automatisch eine', 'APIPA (169.254.x.x), aber immer vorhanden'],
      ['**Unique Local (ULA)**', 'fc00::/7 (praktisch fd00::/8)', 'Innerhalb eigener Netze routbar; nicht für öffentliches Internet', 'Private Adressen (10.x, 192.168.x)'],
      ['**Multicast**', 'ff00::/8', 'Gruppe von Empfängern, ersetzt Broadcast (zum Beispiel ff02::1 = alle Geräte im Link)', 'Multicast und Broadcast'],
      ['**Anycast**', 'wie Unicast', 'Dieselbe Adresse an mehreren Orten; das Routing wählt ein Ziel', '-'],
      ['**Loopback**', '::1/128', 'Eigenes Gerät', '127.0.0.1'],
    ]],
  ],
});

AP2.add('infra-ipv6', [
  [
    "h",
    "Adressvergabe und Nachbarn"
  ],
  [
    "table",
    [
      "Verfahren",
      "Aufgabe",
      "Prüfungsfalle"
    ],
    [
      [
        "Router Advertisement (RA)",
        "Router teilt Präfixe und Routerinformationen mit",
        "Standardrouter wird über RA gelernt, nicht über DHCPv6"
      ],
      [
        "SLAAC",
        "Gerät bildet selbst eine Adresse aus einem angekündigten Präfix",
        "Autokonfiguration ersetzt keine Sicherheitsregeln"
      ],
      [
        "DHCPv6",
        "Vergibt je Betriebsart Adressen oder Zusatzkonfiguration",
        "DHCPv4-DORA nicht unverändert übertragen"
      ],
      [
        "Neighbor Discovery (NDP)",
        "Ermittelt Nachbarn und prüft Erreichbarkeit",
        "Verwendet ICMPv6 statt ARP"
      ],
      [
        "Duplicate Address Detection (DAD)",
        "Prüft vor Nutzung auf mögliche Adressduplikate",
        "Mehrere Adressen pro Schnittstelle sind trotzdem normal"
      ]
    ]
  ],
  [
    "h",
    "Präfix und Geltungsbereich"
  ],
  [
    "p",
    "Link-Local-Adressen werden nicht über Router weitergeleitet. ULA-Adressen können innerhalb eigener Netze geroutet werden. Sie sind nicht für das öffentliche Internet vorgesehen. Global Unicast bedeutet nicht automatisch weltweit erreichbar. Firewalls und Routing bleiben entscheidend."
  ],
  [
    "code",
    "text",
    "Voll: 2001:0db8:0000:0000:0012:0000:0000:0045\nKurz: 2001:db8::12:0:0:45\n\nBei gleich langen Nullfolgen wird die erste gekürzt.\nEin einzelner Nullblock wird kanonisch nicht durch :: ersetzt."
  ],
  [
    "qa",
    "**Erläutern** Sie drei Unterschiede zwischen IPv4 und IPv6 im lokalen Netz.",
    [
      "- IPv6 hat 128 statt 32 Adressbits.",
      "- IPv6 nutzt NDP über ICMPv6 statt ARP.",
      "- IPv6 nutzt Multicast statt Broadcast.",
      "Je korrektem Unterschied 1 Punkt."
    ],
    3
  ],
  [
    "qa",
    "Ein IPv6-Client besitzt eine Adresse, aber keinen Standardrouter. Der Administrator ändert nur DHCPv6. **Beurteilen** Sie den Ansatz.",
    [
      "Die Adresse allein reicht für fremde Netze nicht. 1 Punkt.",
      "Der Standardrouter wird normalerweise über Router Advertisements gelernt. 1 Punkt.",
      "RA, Router-Lifetime, VLAN und ICMPv6-Regeln prüfen. 1 Punkt."
    ],
    3
  ],
  [
    "quiz",
    [
      {
        "q": "Welche Aussage zu ULA stimmt?",
        "o": [
          "ULA kann innerhalb privater IPv6-Netze geroutet werden",
          "ULA ist zwingend auf einen einzigen Link begrenzt",
          "ULA ist eine Broadcastadresse",
          "ULA hat nur 32 Bit"
        ],
        "a": 0,
        "e": "Link-Local ist linkbegrenzt. ULA dient eigenen gerouteten Netzen."
      }
    ]
  ],
  [
    "see",
    [
      "infra-ipv6sub",
      "infra-dhcp",
      "infra-routing",
      "infra-firewall"
    ]
  ]
]);
