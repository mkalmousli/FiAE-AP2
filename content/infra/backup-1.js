AP2.page('infra-backup', {
  b: 'infra', g: 'Storage und Verfügbarkeit', t: 'Backup-Strategien: 3-2-1-Regel, RPO und RTO',
  d: 'Ein **Backup** ist eine **getrennte Kopie** von Daten, mit der man sie nach Verlust **wiederherstellen** kann. Die **3-2-1-Regel**: **3** Kopien, auf **2** verschiedenen Medien, davon **1** an einem anderen Ort. **RPO** (Recovery Point Objective) ist der **tolerierbare Datenverlust**, **RTO** (Recovery Time Objective) die **tolerierbare Wiederherstellungsdauer**.',
  m: '**3-2-1:** 3 Kopien, 2 Medien, 1 extern (offsite). **RPO = wie viel Daten darf ich verlieren (Zeit seit letztem Backup), RTO = wie lange darf die Wiederherstellung dauern.** Backup-Arten: **Voll** (alles), **Differenziell** (seit letztem Voll), **Inkrementell** (seit letztem Backup jeder Art).',
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
      {id: 'o', k: 'cyl', x: 110, y: 110, t: ['Original', 'Server'], w: 120, h: 90, s: 'solid'}, {id: 'b1', k: 'cyl', x: 330, y: 70, t: ['Kopie 1', 'NAS (Platte)'], w: 120, h: 80, s: 'accent'}, {id: 'b2', k: 'cyl', x: 330, y: 170, t: ['Kopie 2', 'Bandlaufwerk'], w: 120, h: 80, s: 'accent'}, {id: 'b3', k: 'cyl', x: 620, y: 120, t: ['Kopie 3', 'Cloud / anderer Standort'], w: 150, h: 96, s: 'ok'},
      {id: 'site', k: 'group', x: 190, y: 120, w: 380, h: 200, t: 'Standort A', s: 'soft'},
    ], edges: [{a: 'o', b: 'b1'}, {a: 'o', b: 'b2'}, {a: 'b1', b: 'b3', t: 'Offsite'}]}],
    ['table', ['Zahl', 'Bedeutung', 'Schutz vor'], [['**3** Kopien', 'Original plus mindestens zwei Sicherungen', 'Ausfall einer Kopie'], ['**2** Medien', 'Unterschiedliche Speichertypen (Festplatte, Band, Cloud)', 'Fehler oder Defekt einer Mediensorte'], ['**1** Offsite', 'Eine Kopie an einem anderen Ort (anderes Gebäude, Cloud)', 'Brand, Wasser, Diebstahl, Ransomware im Netz']]],
    ['h', 'Backup-Arten'],
    ['table', ['Art', 'Was wird gesichert?', 'Backup-Dauer / Platz', 'Wiederherstellung'], [
      ['**Vollsicherung**', 'Alle Daten, jedes Mal', 'Lang, viel Platz', 'Am einfachsten: nur dieses Backup nötig'],
      ['**Differenzielle Sicherung**', 'Alles, was sich seit der **letzten Vollsicherung** geändert hat', 'Mittel; wächst bis zur nächsten Vollsicherung', 'Voll plus **letzte** Differenzielle'],
      ['**Inkrementelle Sicherung**', 'Nur Änderungen seit dem **letzten Backup (egal ob Voll oder Inkrement)**', 'Kurz, wenig Platz', 'Voll plus **alle** Inkremente in der richtigen Reihenfolge (aufwendiger, riskanter)'],
    ]],
    ['chart', {kind: 'bar', w: 720, h: 320, labels: ['Montag (Voll)', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], series: [{n: 'Differenziell (GB)', d: [100, 8, 15, 21, 30], k: 'accent'}, {n: 'Inkrementell (GB)', d: [100, 8, 7, 6, 9], k: 'text3'}], vals: true, yl: 'Gesicherte Datenmenge (GB)', cap: 'Beispiel: Differenzielle Sicherungen wachsen täglich (alles seit Voll), inkrementelle bleiben klein (nur Änderungen seit gestern).'}],
  ],
});
