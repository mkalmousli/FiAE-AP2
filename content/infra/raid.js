// RAID-Level: Verfuegbarkeit und Redundanz
(function() {
  const page = {
    id: 'infra-raid', block: 'infra', titel: 'RAID-Level',
    definition: 'RAID (Redundant Array of Independent Disks) kombiniert mehrere Festplatten zu einer logischen Einheit fuer Redundanz und/oder Performance. Verschiedene RAID-Level bieten unterschiedliche Kombinationen von Speichereffizienz und Ausfalltoleranz.',
    merksatz: 'RAID 0=schnell, 1=sicher, 5=Standard, 6=sicherer, 10=schnell+sicher',
    abschnitte: [
      {typ: 'heading', text: 'Wichtige RAID-Level'},
      {typ: 'list', items: [
        'RAID 0 (Striping): Daten auf 2+ Platten verteilt, keine Redundanz, max Performance',
        'RAID 1 (Mirroring): 100% Redundanz, 50% Speicher nutzbar',
        'RAID 5 (Striping + Parity): min. 3 Platten, 1 Ausfall tolerabel, (n-1)/n Speicher',
        'RAID 6 (Striping + 2x Parity): min. 4 Platten, 2 Ausfaelle tolerabel',
        'RAID 10: RAID 1 von RAID 0, 50% Speicher, schnell + sicher',
      ]},
      {typ: 'text', inhalt: 'Nutzkapazitaet = (Anzahl Platten - redundante) * Platten-Groesse'},
      {typ: 'text', inhalt: 'RAID ersetzt kein Backup! Ausfallschutz ja, Datenverlust/Verschluesselung nein.'},
      {typ: 'heading', text: 'Interaktiver Rechner'},
      {typ: 'tool', toolId: 'raid-calc'},
    ]
  };
  AP2.store.register('infra-raid', page);
})();
