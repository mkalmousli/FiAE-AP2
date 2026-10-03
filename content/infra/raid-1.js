(function () {
  // Baut ein Diagramm aus Plattenspalten mit Blöcken. cells[d][r] = [Text, Stil]
  const raid = (cells, title) => {
    const nodes = [];
    cells.forEach((col, d) => {
      const x = 56 + d * 84;
      nodes.push({id: 'd' + d, k: 'group', x, y: 24 + (col.length * 36 + 30) / 2, w: 74, h: col.length * 36 + 30, t: 'Platte ' + (d + 1), s: 'soft'});
      col.forEach((cell, r) => nodes.push({id: 'c' + d + '_' + r, k: 'box', x, y: 62 + r * 36, w: 52, h: 28, t: cell[0], s: cell[1] || 'plain', fs: 12}));
    });
    return {w: cells.length * 84 + 28, h: cells[0].length * 36 + 50, nodes, edges: [], cap: title};
  };
  const P = 'accent';
  const Q = 'bad';
  const r0 = raid([[['A1'], ['A3'], ['A5']], [['A2'], ['A4'], ['A6']]], 'RAID 0');
  const r1 = raid([[['A1'], ['A2'], ['A3']], [['A1', 'ok'], ['A2', 'ok'], ['A3', 'ok']]], 'RAID 1');
  const r5 = raid([[['A1'], ['B1'], ['C1'], ['Dp', P]], [['A2'], ['B2'], ['Cp', P], ['D1']], [['A3'], ['Bp', P], ['C2'], ['D2']], [['Ap', P], ['B3'], ['C3'], ['D3']]], 'RAID 5 (p = Parität)');
  const r6 = raid([[['A1'], ['B1'], ['Cp', P], ['Dq', Q]], [['A2'], ['Bp', P], ['Cq', Q], ['D1']], [['Ap', P], ['Bq', Q], ['C1'], ['D2']], [['Aq', Q], ['B2'], ['C2'], ['Dp', P]]], 'RAID 6 (p, q = zwei Paritäten)');
  const r10 = raid([[['A1'], ['A3']], [['A1', 'ok'], ['A3', 'ok']], [['A2'], ['A4']], [['A2', 'ok'], ['A4', 'ok']]], 'RAID 10 (1+0)');
  AP2.page('infra-raid', {
    b: 'infra', g: 'Storage und Verfügbarkeit', t: 'RAID-Level (0 bis 6, 10) und Kapazitätsberechnung',
    d: '**RAID** (Redundant Array of Independent Disks) fasst **mehrere Festplatten** zu einem **logischen Laufwerk** zusammen, für mehr **Leistung** (Striping), mehr **Ausfallsicherheit** (Spiegelung, Parität) oder beides. **RAID ersetzt kein Backup!**',
    m: '**RAID 0 = Tempo ohne Sicherheit (Striping). RAID 1 = Spiegel. RAID 5 = ein Platten darf ausfallen (Parität), Nutzkapazität (n-1). RAID 6 = zwei dürfen ausfallen, (n-2). RAID 10 = Spiegel plus Striping, n/2.** Eselsbrücke: Null = Null Sicherheit.',
    cheat: [
      ['Level und Mindestplatten', ['**RAID 0:** 2 Platten (Striping)', '**RAID 1:** 2 Platten (Spiegelung)', '**RAID 5:** 3 Platten (Parität)', '**RAID 6:** 4 Platten (doppelte Parität)', '**RAID 10:** 4 Platten (Spiegel + Striping)']],
      ['Nutzkapazität (n Platten, je c)', ['RAID 0: **n mal c**', 'RAID 1: **c** (bei 2 Platten)', 'RAID 5: **(n - 1) mal c**', 'RAID 6: **(n - 2) mal c**', 'RAID 10: **(n / 2) mal c**']],
      ['Ausfalltoleranz', ['RAID 0: **keine**', 'RAID 1: **1** Platte (von 2)', 'RAID 5: **1** Platte', 'RAID 6: **2** Platten', 'RAID 10: je Spiegelpaar **1** Platte']],
      ['Wichtig', ['**RAID ist kein Backup** (Löschen, Virus, Brand)', '**Hot Spare:** Reserveplatte für automatischen Rebuild', '**Rebuild** dauert lange, in dieser Zeit erhöhtes Risiko']],
    ],
    blocks: [
      ['h', 'Wozu RAID?'],
      ['p', 'Eine einzelne Festplatte kann **jederzeit ausfallen**. Der Ausfall würde den Server stoppen und Daten kosten. RAID verteilt die Daten auf mehrere Platten, sodass der Server **weiterläuft**, wenn eine Platte ausfällt (je nach Level). Man unterscheidet drei Grundprinzipien:'],
      ['kv', [
        ['Striping', 'Daten werden in **Streifen (Stripes)** abwechselnd auf mehrere Platten verteilt. Ergibt **mehr Geschwindigkeit** (parallele Zugriffe), aber **keine Redundanz**.'],
        ['Mirroring (Spiegelung)', 'Jedes Datum wird **doppelt** auf zwei Platten gespeichert. Ergibt **Ausfallsicherheit**, kostet aber die **halbe Kapazität**.'],
        ['Parität', 'Aus den Datenblöcken wird per **XOR** ein **Paritätsblock** berechnet. Fällt eine Platte aus, kann ihr Inhalt aus den **übrigen Daten und der Parität** wiederhergestellt werden. Spart Platz gegenüber Spiegelung.'],
      ]],
      ['h', 'Die RAID-Level im Detail'],
      ['h3', 'RAID 0: Striping'],
      ['p', 'Daten werden verteilt. **Schnell**, volle Kapazität, aber **ein Ausfall zerstört alle Daten**. Nur für unwichtige, schnelle Daten (Videoschnitt-Zwischenspeicher).'],
      ['diagram', r0],
      ['h3', 'RAID 1: Mirroring'],
      ['p', 'Jede Platte hat eine **exakte Kopie**. Fällt eine aus, läuft die andere weiter. Lesen ist schnell, Schreiben so schnell wie eine Platte. Nutzkapazität: **50 Prozent**.'],
      ['diagram', r1],
    ],
  });
  AP2.raidDiagrams = {r5, r6, r10};
})();
