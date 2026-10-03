AP2.page('infra-storage', {
  b: 'infra', g: 'Storage und Verfügbarkeit', t: 'DAS, NAS und SAN',
  d: '**DAS** (Direct Attached Storage) ist Speicher, der **direkt** an einem Server hängt. **NAS** (Network Attached Storage) ist ein Speichergerät im Netzwerk, das **Dateien** (File-Level) per **SMB/NFS** bereitstellt. **SAN** (Storage Area Network) ist ein **eigenes Hochgeschwindigkeitsnetz**, das **Blockspeicher** (Block-Level) per **Fibre Channel oder iSCSI** an Server liefert, die ihn wie eine lokale Festplatte nutzen.',
  m: '**NAS = Dateien (File-Level), im normalen LAN, einfach. SAN = Blöcke (Block-Level), eigenes Speichernetz, schnell, teuer.** NAS = "Netzlaufwerk", SAN = "Server sieht eine eigene Festplatte". **NAS: SMB, NFS. SAN: Fibre Channel, iSCSI.**',
  cheat: [
    ['DAS', ['Direkt am Server (intern, USB, SAS)', 'Schnell und einfach', 'Nicht teilbar, keine zentrale Verwaltung']],
    ['NAS', ['**Dateien** (File-Level)', 'Protokolle: **SMB/CIFS** (Windows), **NFS** (Unix/Linux)', 'Im vorhandenen **LAN (Ethernet)**', 'Fertiges Gerät, günstig, einfach', 'Für Dateiserver, Backups, Medien']],
    ['SAN', ['**Blöcke** (Block-Level), Server formatiert selbst', 'Eigenes Netz: **Fibre Channel** (FC) oder **iSCSI** (über Ethernet)', 'Sehr schnell, geringe Latenz, redundant', 'Teuer und komplex', 'Für Datenbanken, Virtualisierung']],
    ['Begriffe', ['**LUN:** Logical Unit Number, ein logisches Laufwerk im SAN', '**Zoning/LUN-Masking:** Zugriffsrechte im SAN', '**Multipathing:** mehrere Wege zum Speicher', '**HBA:** Host Bus Adapter (FC-Karte im Server)']],
  ],
  blocks: [
    ['h', 'Warum gibt es verschiedene Speichertechniken?'],
    ['p', 'Daten müssen **sicher, schnell, verfügbar** und für mehrere Benutzer oder Server **gemeinsam nutzbar** sein. Eine einzelne Festplatte im Server reicht dafür nicht. Je nach Anforderung gibt es drei Grundformen: **DAS**, **NAS** und **SAN**.'],
    ['h', 'Der entscheidende Unterschied: Datei oder Block?'],
    ['kv', [
      ['File-Level (Dateiebene)', 'Das Speichergerät verwaltet ein **Dateisystem** und stellt **Dateien und Ordner** bereit. Der Client fragt: "Gib mir die Datei bericht.docx." Typisch für **NAS**.'],
      ['Block-Level (Blockebene)', 'Das Speichergerät liefert rohe **Datenblöcke**, **ohne Dateisystem**. Der **Server** formatiert und verwaltet sie selbst, als wäre es eine eigene Festplatte. Typisch für **SAN**.'],
    ]],
    ['diagram', {w: 760, h: 270, keep: 640, cap: 'Links NAS: Clients greifen über das LAN auf Dateien zu. Rechts SAN: Server nutzen über ein eigenes Speichernetz Blockspeicher.', nodes: [
      {id: 'g1', k: 'group', x: 190, y: 135, w: 340, h: 235, t: 'NAS (Dateiebene, LAN)', s: 'soft'}, {id: 'g2', k: 'group', x: 575, y: 135, w: 340, h: 235, t: 'SAN (Blockebene, Speichernetz)', s: 'soft'},
      {id: 'c1', k: 'round', x: 80, y: 90, t: 'Client 1', w: 90, h: 36}, {id: 'c2', k: 'round', x: 80, y: 150, t: 'Client 2', w: 90, h: 36}, {id: 'sw', k: 'box', x: 190, y: 120, t: 'Switch', w: 70, h: 40, s: 'accent'}, {id: 'nas', k: 'cyl', x: 300, y: 120, t: 'NAS', w: 80, h: 70, s: 'solid'},
      {id: 's1', k: 'round', x: 455, y: 90, t: 'Server 1', w: 90, h: 36}, {id: 's2', k: 'round', x: 455, y: 150, t: 'Server 2', w: 90, h: 36}, {id: 'fc', k: 'box', x: 570, y: 120, t: ['FC- oder', 'iSCSI-Switch'], w: 100, h: 48, s: 'accent', fs: 11}, {id: 'sto', k: 'cyl', x: 690, y: 120, t: 'Storage', w: 80, h: 70, s: 'solid'},
      {id: 'k1', k: 'text', x: 190, y: 230, t: 'Zugriff: SMB / NFS (\\\\nas\\freigabe)', fs: 12, tc: 'text2'}, {id: 'k2', k: 'text', x: 575, y: 230, t: 'Zugriff: Server sieht Laufwerk (LUN)', fs: 12, tc: 'text2'},
    ], edges: [{a: 'c1', b: 'sw', ea: 'none'}, {a: 'c2', b: 'sw', ea: 'none'}, {a: 'sw', b: 'nas', ea: 'none'}, {a: 's1', b: 'fc', ea: 'none'}, {a: 's2', b: 'fc', ea: 'none'}, {a: 'fc', b: 'sto', ea: 'none'}]}],
    ['table', ['Merkmal', 'DAS', 'NAS', 'SAN'], [
      ['Zugriffsebene', 'Block (lokal)', '**Datei**', '**Block**'],
      ['Anbindung', 'Direkt (SATA, SAS, USB)', 'Ethernet-LAN', 'Eigenes Netz: Fibre Channel oder iSCSI (Ethernet)'],
      ['Protokolle', '-', 'SMB/CIFS, NFS, FTP', 'FC, iSCSI, FCoE'],
      ['Geteilt nutzbar', 'Nein (nur ein Server)', 'Ja, viele Clients gleichzeitig', 'Ja, mehrere Server (jeder mit eigenen LUNs)'],
      ['Performance', 'Hoch, lokal', 'Mittel (abhängig vom LAN)', 'Sehr hoch, geringe Latenz'],
      ['Kosten und Aufwand', 'Gering', 'Gering bis mittel', 'Hoch (Switches, HBAs, Speichersystem, Fachwissen)'],
      ['Typische Nutzung', 'Einzelner Server, Backup-Medium', 'Dateiserver, Home-Office-Speicher, Backups, Medien', 'Datenbanken, Virtualisierung, Rechenzentren'],
    ]],
  ],
});
