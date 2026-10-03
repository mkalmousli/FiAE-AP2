AP2.add('infra-storage', [
  ['procon', 'NAS gegenüber SAN', ['**NAS:** günstig, schnell einsatzbereit, einfache Verwaltung, nutzt vorhandenes LAN', '**NAS:** ideal für gemeinsam genutzte Dateien (Dateiserver)', '**SAN:** höchste Leistung und Verfügbarkeit, geringe Latenz', '**SAN:** gut skalierbar, zentrale Verwaltung, für Datenbanken und virtuelle Maschinen'], ['**NAS:** Leistung durch Netzwerk und Protokolle begrenzt, nicht für latenzkritische Datenbanken', '**NAS:** ein Gerät ist Single Point of Failure ohne Cluster', '**SAN:** hohe Kosten und hohe Komplexität', '**SAN:** spezielle Fachkenntnisse nötig, eigene Infrastruktur']],
  ['h', 'iSCSI und Fibre Channel'],
  ['table', ['Technik', 'Netz', 'Merkmal'], [['**Fibre Channel (FC)**', 'Eigenes, meist Glasfaser-basiertes Netz mit FC-Switches und HBAs', 'Sehr schnell (8, 16, 32, 64 Gbit/s), verlustfrei, teuer'], ['**iSCSI**', 'Bestehendes **Ethernet/IP-Netz** (TCP Port 3260)', 'Günstiger, einfacher; abhängig von Netzqualität (am besten eigenes VLAN oder Netz)'], ['**FCoE**', 'Fibre Channel über Ethernet', 'Zusammenführung von Daten- und Speichernetz']]],
  ['h', 'Weitere Speicherformen'],
  ['kv', [
    ['Objektspeicher (zum Beispiel S3)', 'Daten als **Objekte** mit Metadaten in einer flachen Struktur, Zugriff per HTTP-API. Sehr gut skalierbar, ideal für Cloud, Backups und große Datenmengen. Kein klassisches Dateisystem.'],
    ['Cloud-Speicher', 'Speicher als **Dienst** (Dropbox, OneDrive, AWS S3, Azure Blob). Skalierbar, abgerechnet nach Nutzung, aber Datenschutz (DSGVO, Standort) beachten.'],
    ['Hot / Cold Storage', '**Hot:** häufiger Zugriff, schneller (SSD). **Cold:** selten benötigt, günstig und langsamer (Archiv, Band).'],
    ['SSD und HDD', 'SSD (Flash): sehr schnell, teurer pro GB, kein Mechanik-Verschleiß. HDD: günstig pro GB, große Kapazität, langsamer. Beim Dimensionieren zählen IOPS (Zugriffe pro Sekunde) und Durchsatz.'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie den Unterschied zwischen NAS und SAN.', ['**NAS:** Netzwerkspeicher auf **Dateiebene**. Clients greifen im normalen LAN über SMB/NFS auf Dateien und Freigaben zu. Das NAS verwaltet das Dateisystem selbst.', '**SAN:** Eigenes Speichernetz auf **Blockebene**. Server binden LUNs wie lokale Festplatten ein und formatieren sie selbst. Sehr schnell und für Datenbanken und Virtualisierung geeignet, aber teurer.'], 5],
  ['qa', 'Ein kleines Büro mit 10 Mitarbeitern benötigt einen zentralen Platz für gemeinsame Dokumente und Backups. Welche Lösung empfehlen Sie?', 'Ein **NAS** mit RAID (zum Beispiel RAID 1 oder RAID 5). Es ist günstig, einfach zu verwalten, nutzt das vorhandene LAN, bietet Freigaben per SMB und genug Leistung für Dokumente. Ein SAN wäre überdimensioniert und zu teuer. Zusätzlich: Backup an einen externen Ort (siehe 3-2-1-Regel).', 4],
  ['qa', 'Für eine virtuelle Serverumgebung mit hohen Anforderungen an Leistung und Verfügbarkeit wird zentraler Speicher benötigt. Welche Technik passt und warum?', 'Ein **SAN** (Fibre Channel oder iSCSI). Es bietet Blockspeicher mit hoher Leistung und geringer Latenz, redundante Pfade (Multipathing) und gemeinsamen Zugriff mehrerer Hypervisor-Hosts auf dieselben LUNs (Voraussetzung für Live-Migration und Hochverfügbarkeit).', 4],
  ['quiz', [
    {q: 'Auf welcher Ebene arbeitet ein NAS?', o: ['Dateiebene (File-Level)', 'Blockebene', 'Bitebene', 'Anwendungsebene'], a: 0, e: 'NAS stellt Dateien und Freigaben bereit.'},
    {q: 'Was ist eine LUN?', o: ['Ein logisches Laufwerk im SAN', 'Ein Netzwerkkabel', 'Ein Backup-Band', 'Ein Passwort'], a: 0, e: 'Logical Unit Number: ein vom Speichersystem bereitgestelltes logisches Laufwerk.'},
    {q: 'Welches Protokoll transportiert SCSI-Befehle über ein normales IP-Netz?', o: ['iSCSI', 'SMB', 'FTP', 'HTTP'], a: 0, e: 'iSCSI = SCSI über IP/Ethernet.'},
    {q: 'Welches Protokoll wird bei NAS typischerweise von Windows-Clients genutzt?', o: ['SMB/CIFS', 'Fibre Channel', 'iSCSI', 'ODBC'], a: 0, e: 'Windows nutzt SMB, Linux/Unix häufig NFS.'},
    {q: 'Welche Speichertechnik ist am besten für die Datenbanken eines Rechenzentrums geeignet?', o: ['SAN', 'USB-Stick', 'Einfaches NAS im Büro', 'E-Mail'], a: 0, e: 'Blockspeicher im SAN bietet niedrige Latenz und hohe Leistung.'},
  ]],
]);
