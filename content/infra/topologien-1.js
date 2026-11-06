(function () {
  const ring = (n, cx, cy, r) => Array.from({length: n}, (v, i) => {
    const ang = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
  });
  const hosts = (pos, prefix) => pos.map((p, i) => ({id: prefix + i, k: 'round', x: p[0], y: p[1], w: 52, h: 30, t: 'PC' + (i + 1), fs: 11}));
  const starPos = ring(6, 150, 130, 95);
  const star = {w: 300, h: 260, cap: 'Stern', nodes: [{id: 'c', k: 'box', x: 150, y: 130, w: 70, h: 36, t: 'Switch', s: 'solid', fs: 12}].concat(hosts(starPos, 's')),
    edges: starPos.map((p, i) => ({a: 'c', b: 's' + i, ea: 'none'}))};
  const ringPos = ring(6, 150, 130, 95);
  const rng = {w: 300, h: 260, cap: 'Ring', nodes: hosts(ringPos, 'r'), edges: ringPos.map((p, i) => ({a: 'r' + i, b: 'r' + ((i + 1) % 6), ea: 'arrow'}))};
  const meshPos = ring(5, 150, 135, 95);
  const meshEdges = [];
  for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) meshEdges.push({a: 'm' + i, b: 'm' + j, ea: 'none'});
  const mesh = {w: 300, h: 270, cap: 'Vollvermaschtes Netz (Mesh)', nodes: hosts(meshPos, 'm'), edges: meshEdges};
  const busNodes = [{id: 'bus', k: 'box', x: 150, y: 120, w: 270, h: 8, s: 'solid', t: ''}, {id: 'e1', k: 'box', x: 12, y: 120, w: 8, h: 26, s: 'bad', t: ''}, {id: 'e2', k: 'box', x: 288, y: 120, w: 8, h: 26, s: 'bad', t: ''}];
  const busEdges = [];
  [50, 120, 190, 255].forEach((x, i) => {
    const up = i % 2 === 0;
    busNodes.push({id: 'b' + i, k: 'round', x, y: up ? 50 : 190, w: 52, h: 30, t: 'PC' + (i + 1), fs: 11});
    busEdges.push({a: 'b' + i, b: [x, 120], ea: 'none'});
  });
  const bus = {w: 300, h: 240, cap: 'Bus (Abschlusswiderstände rot)', nodes: busNodes, edges: busEdges};
  AP2.page('infra-topologien', {
    b: 'infra', g: 'Netzwerk-Grundlagen', t: 'Netzwerktopologien (Stern, Bus, Ring, Mesh)',
    d: 'Die **Topologie** beschreibt die **Anordnung** der Geräte und Verbindungen in einem Netzwerk. Man unterscheidet die **physische** (Verkabelung) und die **logische** Topologie (Datenfluss). Die Grundformen sind **Stern**, **Bus**, **Ring**, **Mesh (Vermaschung)** und **Baum**. Heute dominiert in LANs der **Stern**, im Backbone und WLAN die **Vermaschung**.',
    m: '**Stern:** ein Zentrum, ein Ausfall des Zentrums legt alles lahm. **Bus:** ein Kabel für alle, ein Kabelbruch legt alles lahm. **Ring:** Weitergabe im Kreis. **Mesh:** jeder mit jedem (Kabelzahl n(n-1)/2).',
    cheat: [
      ['Stern', ['Alle Geräte an **einem Switch**', 'Ausfall eines Geräts: nur dieses betroffen', 'Ausfall des Switches: **alle** betroffen', 'Standard bei Ethernet-LAN']],
      ['Bus', ['Alle teilen **ein Kabel**', 'Wenig Kabel, billig', 'Kabelbruch: **alle** betroffen', 'Kollisionen, veraltet (Koax)']],
      ['Ring', ['Jeder hat zwei Nachbarn', 'Daten wandern im Kreis', 'Ausfall eines Knotens: Ring unterbrochen (außer Doppelring)', 'Token Ring, FDDI, SDH']],
      ['Mesh', ['Viele Verbindungen, **redundant**', 'Vollvermascht: n(n-1)/2 Leitungen', 'Sehr ausfallsicher, teuer', 'WAN, Backbone, WLAN-Mesh']],
    ],
    blocks: [
      ['h', 'Warum ist die Topologie wichtig?'],
      ['p', 'Die Topologie bestimmt **Kosten** (Kabelmenge), **Ausfallsicherheit**, **Erweiterbarkeit** und **Leistung**. Bei der Planung eines Netzes muss man abwägen: Ein günstiges Netz ist oft anfälliger, ein ausfallsicheres Netz teurer.'],
      ['h', 'Die Grundformen'],
      ['row', [['diagram', star], ['diagram', bus]]], ['row', [['diagram', rng], ['diagram', mesh]]],
    ],
  });
})();

AP2.add('infra-topologien', [
  [
    "h",
    "Leitungen einer Vollvermaschung berechnen"
  ],
  [
    "p",
    "Jedes Gerät verbindet sich mit allen anderen Geräten. Jede Verbindung wird dabei zweimal gezählt. Für ungerichtete direkte Verbindungen gilt: L = n × (n − 1) / 2."
  ],
  [
    "table",
    [
      "Gerätezahl n",
      "Rechnung",
      "Leitungen L"
    ],
    [
      [
        "4",
        "4 × 3 / 2",
        "6"
      ],
      [
        "6",
        "6 × 5 / 2",
        "15"
      ],
      [
        "8",
        "8 × 7 / 2",
        "28"
      ]
    ]
  ],
  [
    "qa",
    "Sechs Standorte sind vollvermascht. Ein siebter kommt hinzu. **Berechnen** Sie Gesamtzahl und zusätzliche Leitungen.",
    [
      "Vorher: 6 × 5 / 2 = **15 Leitungen**. 1 Punkt.",
      "Nachher: 7 × 6 / 2 = **21 Leitungen**. 1 Punkt.",
      "Zusätzlich: 21 − 15 = **6 Leitungen**. 1 Punkt."
    ],
    3
  ],
  [
    "h",
    "Ausfälle einer Baumstruktur"
  ],
  [
    "table",
    [
      "Fehler",
      "Direkte Folge",
      "Gegenmaßnahme"
    ],
    [
      [
        "Ein Endgerätekabel fällt aus",
        "Dieses Endgerät ist getrennt",
        "Ersatzkabel und Diagnose"
      ],
      [
        "Access-Switch fällt aus",
        "Alle angeschlossenen Geräte sind getrennt",
        "Redundanz für kritische Geräte"
      ],
      [
        "Einziger Core-Switch fällt aus",
        "Teilnetze verlieren ihre Verbindung",
        "Redundanter Kern mit Schleifenvermeidung"
      ]
    ]
  ],
  [
    "warn",
    "Eine zusätzliche Leitung allein erzeugt keine sichere Redundanz. Unkontrollierte Ethernet-Schleifen können Broadcast-Stürme verursachen. Geeignete Protokolle und Konfiguration sind nötig."
  ],
  [
    "quiz",
    [
      {
        "q": "Was zeigt ein logischer Netzplan?",
        "o": [
          "VLANs, Subnetze und Kommunikationswege",
          "Nur die Lage der Kabelkanäle",
          "Nur ein Rackfoto",
          "Nur eine Kabelrechnung"
        ],
        "a": 0,
        "e": "Physische und logische Struktur beantworten unterschiedliche Planungsfragen."
      }
    ]
  ],
  [
    "see",
    [
      "infra-vlan",
      "infra-verfuegbarkeit",
      "infra-routing"
    ]
  ]
]);
