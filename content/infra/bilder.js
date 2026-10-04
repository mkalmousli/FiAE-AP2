// Illustrationen für Infrastruktur-Seiten, am Seitenanfang eingefügt.
AP2.addTop('infra-komponenten', [
  ['h', 'So sehen die Geräte aus'],
  ['gear', [
    ['hub', 'Hub', 'Schicht 1: sendet an alle'], ['switch', 'Switch', 'Schicht 2: MAC-Adressen'], ['router', 'Router', 'Schicht 3: verbindet Netze'],
    ['firewall', 'Firewall', 'filtert nach Regeln'], ['ap', 'Access Point', 'WLAN-Zugang'], ['modem', 'Modem', 'Zugang zum Provider'],
    ['patch', 'Patchpanel', 'Anschlussfeld im Schrank'], ['server', 'Server', 'Rackeinschub (1 HE)'],
  ], 'Typische Netzwerkkomponenten (schematisch)'],
]);
AP2.addTop('infra-medien', [
  ['h', 'Kabel und Stecker im Bild'],
  ['gear', [
    ['twisted', 'Twisted Pair', 'Kupfer, verdrillte Paare (Cat 5e bis 8)'], ['rj45', 'RJ45-Stecker', '8 Adern, Ethernet'],
    ['fiber', 'Glasfaser mit LC-Stecker', 'Licht, große Reichweite'], ['coax', 'Koaxialkabel', 'Kabelnetz, Antenne'],
  ], 'Übertragungsmedien und Steckverbinder'],
]);
AP2.addTop('infra-topologien', [
  ['h', 'Beteiligte Geräte'],
  ['gear', [
    ['switch', 'Switch', 'Zentrum der Sterntopologie'], ['hub', 'Hub', 'Verteiler (veraltet)'], ['router', 'Router', 'Übergang ins Internet'],
    ['pc', 'Arbeitsplatz-PC', 'Endgerät (Client)'], ['server', 'Server', 'bietet Dienste an'], ['laptop', 'Laptop', 'mobiler Client'],
  ], 'Knoten, aus denen Topologien gebaut werden'],
]);
AP2.addTop('infra-storage', [
  ['h', 'Speichermedien und Systeme'],
  ['gear', [
    ['hdd', 'HDD', 'drehende Platten, günstig, groß'], ['ssd', 'SSD', 'Flash, schnell, keine Mechanik'], ['nas', 'NAS', 'Dateispeicher im Netz'],
    ['rack', 'SAN / Storage-Rack', 'Blockspeicher für Server'], ['tape', 'Bandlaufwerk', 'Archiv, Backup'], ['cloud', 'Cloud-Speicher', 'beim Anbieter'],
    ['database', 'Datenbank', 'strukturierte Daten'], ['usb', 'USB-Stick', 'mobiler Speicher'],
  ], 'Speichertechniken im Überblick'],
]);
AP2.addTop('infra-raid', [
  ['h', 'Hardware im Bild'],
  ['gear', [['hdd', 'Festplatte', 'ein Laufwerk im Verbund'], ['nas', 'NAS mit Einschüben', 'häufig RAID 1, 5 oder 6'], ['server', 'Server', 'RAID-Controller eingebaut'], ['ups', 'USV', 'schützt vor Stromausfall']],
    'Ein RAID-Verbund besteht aus mehreren Platten in Server oder NAS'],
]);
AP2.addTop('infra-backup', [
  ['h', 'Backup-Medien'],
  ['gear', [['tape', 'Magnetband', 'offline, langlebig'], ['hdd', 'Externe Platte', 'schnell wiederherzustellen'], ['nas', 'NAS', 'Backupziel im LAN'], ['cloud', 'Cloud', 'externer Standort'], ['usb', 'USB-Stick', 'kleine Datenmengen']],
    'Gängige Backupziele (3-2-1: mindestens eine Kopie extern)'],
]);
AP2.addTop('infra-firewall', [
  ['h', 'Firewall im Netz'],
  ['gear', [['cloud', 'Internet', 'unsicheres Netz'], ['firewall', 'Firewall', 'prüft jedes Paket'], ['router', 'Router', 'Übergang'], ['switch', 'Switch', 'internes LAN'], ['server', 'Server (DMZ)', 'öffentlicher Dienst'], ['pc', 'Clients', 'internes Netz']],
    'Die Firewall steht zwischen Internet und internem Netz'],
]);
AP2.addTop('infra-verfuegbarkeit', [
  ['h', 'Ausfallsicherheit in der Praxis'],
  ['gear', [['ups', 'USV', 'überbrückt Stromausfall'], ['server', 'Redundanter Server', 'Failover-Partner'], ['rack', 'Serverschrank', 'Rack mit Einschüben'], ['hdd', 'RAID-Platten', 'Hot Spare möglich']],
    'Bausteine hochverfügbarer Systeme'],
]);
