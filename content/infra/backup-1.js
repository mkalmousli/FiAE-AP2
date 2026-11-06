AP2.page('infra-backup', {
  b: 'infra', g: 'Storage und Verfügbarkeit', t: 'Backup-Strategien: 3-2-1-Regel, RPO und RTO',
  d: 'Ein **Backup** ist eine **getrennte Kopie** von Daten, mit der man sie nach Verlust **wiederherstellen** kann. Die **3-2-1-Regel**: **3** Kopien, auf **2** verschiedenen Medien, davon **1** an einem anderen Ort. **RPO** (Recovery Point Objective) ist der **tolerierbare Datenverlust**, **RTO** (Recovery Time Objective) die **tolerierbare Wiederherstellungsdauer**.',
  m: '**3-2-1:** 3 Kopien, 2 Medien, 1 extern (offsite). **RPO = maximal tolerierter Datenverlust in Zeit, RTO = wie lange darf die Wiederherstellung dauern.** Backup-Arten: **Voll** (alles), **Differenziell** (seit letztem Voll), **Inkrementell** (seit letztem Backup jeder Art).',
  cheat: [
    ['3-2-1-Regel', ['**3** Kopien der Daten (Original + 2 Backups)', '**2** verschiedene Medien (zum Beispiel Platte und Band/Cloud)', '**1** Kopie an einem **anderen Ort** (Offsite)', 'Erweitert: **3-2-1-1-0**: 1 unveränderbar (immutable/offline), 0 Fehler bei Restore-Test']],
    ['Backup-Arten', ['**Vollsicherung:** alle Daten', '**Differenziell:** Änderungen seit der letzten **Vollsicherung**', '**Inkrementell:** Änderungen seit dem letzten **Backup (egal welcher Art)**', 'Restore: Voll + letztes Diff. oder Voll + alle Inkremente']],
    ['RPO und RTO', ['**RPO:** maximaler **Datenverlust** (in Zeit). Bestimmt die **Backup-Häufigkeit**', '**RTO:** maximale **Ausfalldauer**. Bestimmt die **Wiederherstellungstechnik**', 'Kleine Werte = teuer']],
    ['Generationenprinzip', ['**GFS:** Grandfather - Father - Son', 'Täglich (Son), wöchentlich (Father), monatlich (Grandfather)', 'Älteste Sicherungen länger aufbewahren']],
  ],
  blocks: [
    ['h', 'Wozu Backups?'],
    ['p', 'Daten können durch **Hardwaredefekt, Bedienfehler, Schadsoftware (Ransomware), Diebstahl, Brand oder Wasser** verloren gehen. Ein **Backup** ermöglicht es, den Betrieb wiederherzustellen. Wichtig: **Ein Backup ist erst dann etwas wert, wenn die Wiederherstellung getestet wurde.** Die Datensicherung ist außerdem Teil der DSGVO-Pflicht zur Verfügbarkeit und Belastbarkeit der Systeme.'],
    ['h', 'Die 3-2-1-Regel'],
    ['diagram', {w: 760, h: 230, keep: 600, cap: 'Die 3-2-1-Regel: drei Kopien, zwei Medien, eine Kopie an einem anderen Ort.', nodes: [
      {id: 'o', k: 'cyl', x: 110, y: 110, t: ['Original', 'Server'], w: 120, h: 90, s: 'solid'}, {id: 'b1', k: 'cyl', x: 330, y: 70, t: ['Kopie 1', 'NAS (Platte)'], w: 120, h: 80, s: 'accent'}, {id: 'b2', k: 'cyl', x: 620, y: 120, t: ['Kopie 2', 'Band am anderen Standort'], w: 180, h: 96, s: 'ok'},
      {id: 'site', k: 'group', x: 190, y: 120, w: 380, h: 200, t: 'Standort A', s: 'soft'},
    ], edges: [{a: 'o', b: 'b1'}, {a: 'b1', b: 'b2', t: 'Offsite'}]}],
    ['table', ['Zahl', 'Bedeutung', 'Schutz vor'], [['**3** Kopien', 'Original plus mindestens zwei Sicherungen', 'Ausfall einer Kopie'], ['**2** Medien', 'Unterschiedliche Speichertypen (Festplatte, Band, Cloud)', 'Fehler oder Defekt einer Mediensorte'], ['**1** Offsite', 'Eine Kopie an einem anderen Ort (anderes Gebäude, Cloud)', 'Brand, Wasser und Diebstahl am Hauptstandort']]],
    ['h', 'Backup-Arten'],
    ['table', ['Art', 'Was wird gesichert?', 'Backup-Dauer / Platz', 'Wiederherstellung'], [
      ['**Vollsicherung**', 'Alle Daten, jedes Mal', 'Lang, viel Platz', 'Am einfachsten: nur dieses Backup nötig'],
      ['**Differenzielle Sicherung**', 'Alles, was sich seit der **letzten Vollsicherung** geändert hat', 'Mittel; wächst bis zur nächsten Vollsicherung', 'Voll plus **letzte** Differenzielle'],
      ['**Inkrementelle Sicherung**', 'Nur Änderungen seit dem **letzten Backup (egal ob Voll oder Inkrement)**', 'Kurz, wenig Platz', 'Voll plus **alle** Inkremente in der richtigen Reihenfolge (aufwendiger, riskanter)'],
    ]],
    ['chart', {kind: 'bar', w: 720, h: 320, labels: ['Montag (Voll)', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], series: [{n: 'Differenziell (GB)', d: [100, 8, 15, 21, 30], k: 'accent'}, {n: 'Inkrementell (GB)', d: [100, 8, 7, 6, 9], k: 'text3'}], vals: true, yl: 'Gesicherte Datenmenge (GB)', cap: 'Beispiel: Differenzielle Sicherungen wachsen täglich (alles seit Voll), inkrementelle bleiben klein (nur Änderungen seit gestern).'}],
  ],
});

AP2.add('infra-backup', [
  [
    "h",
    "Wiederherstellung einer laufenden Anwendung"
  ],
  [
    "p",
    "Eine Datenbank verändert Dateien während des Betriebs. Eine einfache Dateikopie kann deshalb inkonsistent sein. Nutze ein geeignetes Datenbank-Backup oder eine abgestimmte konsistente Momentaufnahme. Sichere auch Konfiguration, Schlüssel und benötigte Versionen."
  ],
  [
    "table",
    [
      "Baustein",
      "Zweck"
    ],
    [
      [
        "Datenbank und Transaktionsprotokolle",
        "Konsistenter Stand; gegebenenfalls Wiederherstellung auf einen Zeitpunkt"
      ],
      [
        "Anwendung und Konfiguration",
        "Daten allein starten keinen funktionierenden Dienst"
      ],
      [
        "Schlüssel und Zugriffsrechte",
        "Verschlüsselte Sicherungen müssen im Notfall lesbar sein"
      ],
      [
        "Getrennte Konten",
        "Anwendungskonten dürfen Backups nicht löschen"
      ],
      [
        "Restore-Protokoll",
        "Belegt Dauer, Datenstand und fachliche Funktion"
      ]
    ]
  ],
  [
    "h",
    "RPO-Ziel und tatsächlichen Verlust trennen"
  ],
  [
    "p",
    "RPO ist eine Vorgabe aus dem Geschäft. Das Sicherungsverfahren muss diese Vorgabe erfüllen. Das Sicherungsintervall allein definiert das Ziel nicht. Sicherungsdauer, Fehler und nutzbarer Datenstand zählen ebenfalls."
  ],
  [
    "qa",
    "Vorgabe: RPO höchstens 30 Minuten, RTO höchstens 90 Minuten. Letzter nutzbarer Stand: 13:40 Uhr. Ausfall: 14:05 Uhr. Betrieb wieder bereit: 15:50 Uhr. **Berechnen** und **beurteilen** Sie beide Werte.",
    [
      "Datenverlust: 14:05 − 13:40 = **25 Minuten**. 1 Punkt.",
      "25 ≤ 30 Minuten: RPO-Ziel eingehalten. 1 Punkt.",
      "Ausfalldauer: 15:50 − 14:05 = **105 Minuten**. 1 Punkt.",
      "105 > 90 Minuten: RTO-Ziel um 15 Minuten überschritten. 1 Punkt."
    ],
    4
  ],
  [
    "h",
    "Restore-Zeit abschätzen"
  ],
  [
    "p",
    "1,2 TB entsprechen hier dezimal 1.200.000 MB. Bei gemessenen 200 MB/s dauert der reine Datentransfer 6.000 Sekunden. Das sind 100 Minuten. Erkennung, Bereitstellung, Datenbankstart und Fachtest kommen noch hinzu."
  ],
  [
    "warn",
    "Offsite schützt gegen Standortverlust. Es schützt allein nicht gegen gestohlene Zugangsdaten oder Löschzugriffe. Dafür sind getrennte Rechte und offline oder unveränderbar gespeicherte Sicherungen nötig."
  ],
  [
    "see",
    [
      "ps-migration",
      "infra-monitoring",
      "infra-cloud"
    ]
  ]
]);
