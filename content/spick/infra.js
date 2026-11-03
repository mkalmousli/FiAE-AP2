(function () {
  // RAID-5-Skizze: Plattenspalten mit verteilter Parität.
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
  const r5 = raid([[['A1'], ['B1'], ['C1'], ['Dp', P]], [['A2'], ['B2'], ['Cp', P], ['D1']], [['A3'], ['Bp', P], ['C2'], ['D2']], [['Ap', P], ['B3'], ['C3'], ['D3']]], 'RAID 5: Parität (p) rotiert über alle Platten, Nutzkapazität (n-1)·c');

  AP2.spick('infra', {
    exam: 'Prüfung: Planen eines Softwareproduktes (Teil B)',
    t: 'Spickzettel Infrastruktur und IT-Sicherheit',
    s: 'Netzwerk, Adressierung, Storage, Verfügbarkeit, Virtualisierung, Kryptografie und IT-Sicherheitsmanagement auf einer Seite',
    meta: [['90 Min', 'Gesamtprüfung'], ['100', 'Punkte'], ['7', 'OSI-Schichten'], ['2^n − 2', 'Hosts je Subnetz'], ['CIA', 'Schutzziele']],
    top: [
      ['flow', ['**Netz** (OSI, IP, Subnetz)', '**Hardware** (Switch, Router, Medien)', '**Storage** (RAID, Backup)', '**Betrieb** (Verfügbarkeit, USV, VM)', '**Sicherheit** (CIA, Krypto, Firewall)', '**Management** (ISMS, Grundschutz)']],
      ['tip', 'Rechenaufgaben bringen sichere Punkte: **Subnetting** (Netz-ID, Broadcast, Hosts), **RAID-Kapazität**, **Verfügbarkeit** in Stunden pro Jahr, **Übertragungszeit** und **USV-Leistung**. Immer **Rechenweg und Einheit** angeben.'],
    ],
    sections: [
      {t: 'OSI- und TCP/IP-Modell', icon: 'network', ids: ['infra-osi', 'infra-tcpip'], wide: true, items: [
        ['diagram', AP2.dg.layers([
          ['7  Anwendung', 'HTTP(S), FTP, SMTP, IMAP, DNS, DHCP, SSH | PDU: Daten', 'solid'], ['6  Darstellung', 'Kodierung (Unicode), Kompression, Verschlüsselung'],
          ['5  Sitzung', 'Sitzungsauf- und -abbau, Synchronisation'], ['4  Transport', 'TCP, UDP, **Ports** | PDU: Segment / Datagramm'],
          ['3  Vermittlung', 'IP, ICMP, Routing, **IP-Adresse**, Router | PDU: Paket'], ['2  Sicherung', 'Ethernet, WLAN, **MAC**, ARP, VLAN, Switch | PDU: Frame'],
          ['1  Bitübertragung', 'Kabel, Glasfaser, Funk, Hub, Repeater | PDU: Bit', 'solid'],
        ], {w: 760, rh: 36, cap: 'OSI-Schichten mit Protokollen, Adressen, Geräten und PDU'})],
        ['tbl', ['TCP/IP (4 Schichten)', 'entspricht OSI', 'Protokolle'], [
          ['**Anwendung**', '5, 6, 7', 'HTTP, DNS, SMTP, FTP, SSH, DHCP'],
          ['**Transport**', '4', 'TCP, UDP'],
          ['**Internet**', '3', 'IPv4, IPv6, ICMP'],
          ['**Netzzugang**', '1, 2', 'Ethernet, WLAN, ARP (Grenzfall 2/3)'],
        ]],
        ['mnemo', '**A**lle **D**eutschen **S**chüler **T**rinken **V**erschiedene **S**orten **B**ier (7 → 1). Englisch 1 → 7: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way.'],
        ['li', ['**Kapselung:** Senden = jede Schicht fügt Header hinzu (Schicht 2 zusätzlich Trailer mit **FCS/CRC**); Empfangen = Header werden entfernt.', 'Geräte: **Hub/Repeater = 1**, **Switch/Bridge = 2**, **Router/L3-Switch = 3**, **Firewall/Proxy/Gateway = bis 7**.']],
      ]},
      {t: 'TCP, UDP und Ports', icon: 'arrow', ids: ['infra-tcpudp', 'infra-ports'], items: [
        ['tbl', ['', 'TCP', 'UDP'], [
          ['Verbindung', '**verbindungsorientiert** (3-Way-Handshake)', '**verbindungslos**'],
          ['Zuverlässig', 'ja: Sequenznummern, **ACK**, Neuübertragung, Flusskontrolle (Window)', 'nein, keine Bestätigung'],
          ['Reihenfolge', 'garantiert', 'nicht garantiert'],
          ['Overhead', 'Header 20 Byte, langsamer', 'Header 8 Byte, schnell'],
          ['Einsatz', 'HTTP, Mail, FTP, SSH, Dateitransfer', 'DNS, DHCP, VoIP (RTP), Streaming, Gaming, SNMP'],
        ]],
        ['flow', ['SYN', 'SYN-ACK', 'ACK', 'Daten', 'FIN / ACK']],
        ['tbl', ['Port', 'Dienst', 'Port', 'Dienst'], [
          ['20/21', 'FTP (Daten/Steuerung)', '143 / 993', 'IMAP / IMAPS'],
          ['22', '**SSH**, SFTP, SCP', '161/162', 'SNMP (UDP)'],
          ['23', 'Telnet (unsicher)', '389 / 636', 'LDAP / LDAPS'],
          ['25 / 587 / 465', 'SMTP / Submission / SMTPS', '443', '**HTTPS**'],
          ['53', '**DNS** (UDP/TCP)', '1812/1813', 'RADIUS Auth/Accounting'],
          ['67/68', '**DHCP** Server/Client (UDP)', '1883 / 8883', 'MQTT / MQTT über TLS'],
          ['80', '**HTTP**', '3306 / 5432 / 1433', 'MySQL / PostgreSQL / MS-SQL'],
          ['110 / 995', 'POP3 / POP3S', '3389', 'RDP'],
          ['123', 'NTP (UDP)', '5060 / 5061', 'SIP / SIP über TLS'],
        ]],
        ['pairs', [['Well-known', '0 bis 1023'], ['Registered', '1024 bis 49151'], ['Dynamisch', '49152 bis 65535 (Client-Quellports)'], ['Socket', 'IP-Adresse + Port + Protokoll']]],
      ]},
      {t: 'IPv4 und Subnetting', icon: 'grid', ids: ['infra-ipv4', 'infra-subnetting', 'infra-vlsm', 'infra-ipconfig'], wide: true, items: [
        ['f', 'Hosts = 2^(32 − Präfix) − 2', 'minus Netzadresse (alle Hostbits 0) und Broadcast (alle Hostbits 1). /24 = 254, /26 = 62, /27 = 30, /28 = 14, /30 = 2'],
        ['f', 'Subnetze = 2^(geliehene Bits)', 'z. B. /24 in 6 Subnetze: 2^3 = 8 ≥ 6 → /27, Blockgröße 256 − 224 = 32'],
        ['tbl', ['Präfix', 'Maske', 'Block', 'Hosts', 'Präfix', 'Maske', 'Block', 'Hosts'], [
          ['/24', '255.255.255.0', '256', '254', '/28', '.240', '16', '14'],
          ['/25', '.128', '128', '126', '/29', '.248', '8', '6'],
          ['/26', '.192', '64', '62', '/30', '.252', '4', '2'],
          ['/27', '.224', '32', '30', '/16', '255.255.0.0', '-', '65.534'],
        ]],
        ['cards', [
          ['Privat (RFC 1918)', ['**10.0.0.0/8**', '**172.16.0.0/12** (bis 172.31)', '**192.168.0.0/16**']],
          ['Spezial', ['127.0.0.0/8 Loopback', '169.254.0.0/16 **APIPA** (kein DHCP)', '0.0.0.0 Default', '255.255.255.255 Broadcast']],
          ['Klassen (alt)', ['A 1-126 /8', 'B 128-191 /16', 'C 192-223 /24', 'D 224-239 Multicast', 'E 240-255']],
          ['Dienste', ['**DHCP:** DORA (Discover, Offer, Request, Ack)', '**DNS:** Name → IP (A, AAAA, MX, CNAME, PTR)', '**NAT/PAT:** privat ↔ öffentlich', '**ARP:** IP → MAC']],
        ]],
        ['sub', 'Rechenweg Subnetz'],
        ['li', ['Netz-ID = IP **AND** Maske; Broadcast = nächste Netz-ID − 1; erster Host = Netz-ID + 1; letzter Host = Broadcast − 1.', 'Beispiel 192.168.10.77/26: Block 64 → Netz **.64**, Hosts .65 bis .126, Broadcast **.127**.', '**VLSM:** Subnetze **absteigend nach Größe** vergeben (größtes zuerst), jeweils kleinstes passendes Präfix (Hosts + 2 ≤ 2^n). Transfernetze Router-Router: **/30** (2 Hosts).']],
        ['warn', '**−2 nicht vergessen** und bei "mindestens 30 Hosts" passt /27 genau (30), bei 31 Hosts schon /26. Gateway belegt auch eine Hostadresse.'],
        ['sub', 'Diagnose (Windows / Linux)'],
        ['pairs', [['ipconfig /all', 'IP, Maske, Gateway, DNS, MAC, DHCP (Linux: **ip a**, ip r)'], ['ipconfig /release /renew', 'DHCP-Lease neu anfordern'], ['ipconfig /flushdns', 'DNS-Cache leeren'], ['ping', 'Erreichbarkeit per ICMP Echo'], ['tracert / traceroute', 'Weg über Router (TTL)'], ['nslookup / dig', 'DNS-Auflösung prüfen'], ['netstat -an / ss', 'offene Ports, Verbindungen'], ['arp -a', 'ARP-Cache (IP ↔ MAC)']]],
        ['tip', 'Vorgehen bei Fehlern **von unten nach oben**: Kabel/Link → eigene IP (169.254 = DHCP-Problem) → ping Gateway → ping 8.8.8.8 → ping Name (DNS).'],
      ]},
      {t: 'IPv6', icon: 'map', ids: ['infra-ipv6', 'infra-ipv6sub'], items: [
        ['li', ['**128 Bit**, 8 Blöcke à 16 Bit hexadezimal, z. B. 2001:0db8:0000:0000:0000:0000:0000:0001.', ['Kürzen', ['**führende Nullen** je Block weglassen', '**einmal** eine Folge von Nullblöcken durch **::** ersetzen → 2001:db8::1']], 'Typisch: **/48** Standort (Provider), **/64** pro Subnetz (64 Bit Interface-ID). /48 → /64 ergibt 2^16 = **65.536 Subnetze**.', 'Kein Broadcast, stattdessen **Multicast**; kein NAT nötig; **SLAAC** (Autokonfiguration) oder DHCPv6; **NDP** ersetzt ARP; IPsec integriert.']],
        ['tbl', ['Präfix', 'Bedeutung'], [['**::1/128**', 'Loopback'], ['**fe80::/10**', 'Link-Local (immer vorhanden)'], ['**fc00::/7** (fd00::/8)', 'Unique Local (privat)'], ['**2000::/3**', 'Global Unicast (öffentlich)'], ['**ff00::/8**', 'Multicast'], ['2001:db8::/32', 'Dokumentation']]],
        ['f', 'Subnetze = 2^(neues Präfix − altes Präfix)', 'Subnetz-ID hochzählen im 4. Block: 2001:db8:abcd:0000::/64, :0001::/64, ...'],
        ['warn', '**::** darf nur **einmal** vorkommen, sonst ist die Adresse mehrdeutig.'],
      ]},
      {t: 'Routing, Switching, VLAN', icon: 'route', ids: ['infra-routing', 'infra-vlan', 'infra-komponenten'], items: [
        ['pairs', [
          ['Statisch', 'manuell eingetragen, klein und stabil'], ['Dynamisch', 'Protokolle: **RIP** (Hop-Count, Distanzvektor), **OSPF** (Link-State, Kosten), **BGP** (zwischen Providern/AS)'],
          ['Default Route', '0.0.0.0/0 → Gateway für alle unbekannten Ziele'], ['Longest Prefix Match', 'spezifischste Route (längstes Präfix) gewinnt'],
        ]],
        ['li', ['**VLAN** (IEEE **802.1Q**): logische Trennung eines physischen Switches in Broadcast-Domänen. Vorteile: Sicherheit, weniger Broadcasts, flexible Zuordnung.', ['Arten', ['**Access-Port (untagged):** genau ein VLAN, Endgerät', '**Trunk-Port (tagged):** mehrere VLANs, 4-Byte-Tag mit **VLAN-ID** (12 Bit → 4094)', 'Kommunikation zwischen VLANs nur über **Router / L3-Switch** (Inter-VLAN-Routing)']]]],
        ['tbl', ['Gerät', 'Schicht', 'Funktion'], [
          ['Hub / Repeater', '1', 'verteilt an alle Ports, eine Kollisionsdomäne'],
          ['**Switch**', '2', 'leitet per **MAC-Tabelle** gezielt weiter, je Port eigene Kollisionsdomäne'],
          ['**Router**', '3', 'verbindet Netze, trennt Broadcast-Domänen, Routingtabelle'],
          ['Access Point', '2', 'WLAN ↔ LAN'],
          ['Firewall / Proxy', '3 bis 7', 'filtert bzw. vermittelt im Auftrag'],
          ['Modem / Gateway', '1 / 7', 'Signalwandlung / Protokollumsetzung'],
        ]],
        ['tip', '**PoE** (802.3af/at/bt): Strom über Netzwerkkabel für AP, IP-Telefon, Kamera. **Managed Switch** = VLAN, QoS, SNMP, Port-Security.'],
      ]},
      {t: 'Ethernet, WLAN, Medien, Topologien', icon: 'volume', ids: ['infra-ethernet', 'infra-wlan', 'infra-medien', 'infra-topologien'], items: [
        ['f', 't = Datenmenge / Datenrate', '1 Byte = 8 Bit; Datenrate in Bit/s (dezimal: 1 Gbit = 10^9 Bit). Beispiel 5 GB über 100 Mbit/s: 5·8·10^9 / 10^8 = **400 s**'],
        ['pairs', [['MAC-Adresse', '48 Bit, 6 Byte hex, 24 Bit Hersteller (OUI)'], ['Frame', 'Präambel, Ziel-MAC, Quell-MAC, Typ/VLAN-Tag, Nutzdaten (MTU **1500 Byte**), **FCS**'], ['CSMA/CD', 'Kollisionserkennung (nur Halbduplex/Hub); WLAN: **CSMA/CA** (Vermeidung)']]],
        ['tbl', ['Medium', 'Reichweite', 'Eigenschaft'], [
          ['Twisted Pair Cat 5e / 6 / 6A / 7 / 8', '**100 m** (Cat 8: 30 m)', '1 / 1-10 / 10 / 10 / 25-40 Gbit/s; UTP, STP, S/FTP (Schirmung)'],
          ['**Multimode-LWL** (OM3/OM4)', 'bis ca. 300-550 m', 'dicker Kern, LED/VCSEL, Gebäude'],
          ['**Singlemode-LWL** (OS2)', 'km-Bereich', 'dünner Kern 9 µm, Laser, Campus/WAN'],
          ['Glasfaser allgemein', '', 'abhörsicher, keine EMV-Störung, galvanische Trennung'],
        ]],
        ['tbl', ['WLAN (IEEE 802.11)', 'Name', 'Band', 'max. brutto'], [
          ['802.11n', 'Wi-Fi 4', '2,4 / 5 GHz', '600 Mbit/s'], ['802.11ac', 'Wi-Fi 5', '5 GHz', '~6,9 Gbit/s'],
          ['802.11ax', 'Wi-Fi 6/6E', '2,4 / 5 / 6 GHz', '~9,6 Gbit/s'], ['802.11be', 'Wi-Fi 7', '2,4 / 5 / 6 GHz', '~46 Gbit/s'],
        ]],
        ['li', ['Sicherheit: **WPA3** (SAE) bzw. WPA2-AES; **WEP/WPA unsicher**. **WPA2/3-Enterprise** = 802.1X mit RADIUS, je Benutzer eigene Anmeldung; Personal = PSK.', '2,4 GHz: größere Reichweite, nur 3 überlappungsfreie Kanäle (1, 6, 11); 5 GHz: mehr Kanäle, höhere Rate, weniger Reichweite.', 'Gäste-WLAN in eigenem **VLAN** mit Client-Isolation.']],
        ['cards', [['Stern', ['zentraler Switch', 'Standard im LAN', 'Ausfall Zentrale = alles weg']], ['Bus', ['gemeinsame Leitung', 'Kabelbruch legt alles lahm']], ['Ring', ['Token, ggf. Doppelring', 'Glasfaser-Backbone']], ['Masche', ['redundante Wege', 'Internet/WAN, teuer']], ['Baum / erweit. Stern', ['hierarchisch: Core, Distribution, Access']]]],
        ['warn', 'Datenrate in **Bit**, Dateigröße meist in **Byte**: Faktor 8! Bei Binärpräfix (GiB) mit 1024 rechnen, wenn verlangt.'],
      ]},
      {t: 'Storage, RAID, Backup', icon: 'cards', ids: ['infra-storage', 'infra-raid', 'infra-backup'], wide: true, items: [
        ['diagram', r5],
        ['tbl', ['Level', 'Prinzip', 'min. Platten', 'Nutzkapazität', 'Ausfälle'], [
          ['RAID 0', 'Striping', '2', '**n · c**', '0'],
          ['RAID 1', 'Spiegelung', '2', '**c** (50 %)', '1'],
          ['RAID 5', 'Striping + 1 Parität (XOR)', '3', '**(n − 1) · c**', '1'],
          ['RAID 6', 'Striping + 2 Paritäten', '4', '**(n − 2) · c**', '2'],
          ['RAID 10', 'Spiegel, dann Striping', '4', '**n/2 · c**', '1 je Spiegelpaar'],
        ]],
        ['tip', 'Unterschiedlich große Platten: es zählt die **kleinste** Platte. Beispiel RAID 5 mit 4 × 4 TB = **12 TB** nutzbar. **Hot Spare** zählt nicht zur Kapazität.'],
        ['cards', [
          ['DAS', ['direkt am Server (SAS, USB)', 'günstig, nicht teilbar']],
          ['NAS', ['Dateiserver im LAN', '**dateibasiert**: SMB, NFS']],
          ['SAN', ['eigenes Speichernetz', '**blockbasiert**: Fibre Channel, iSCSI']],
          ['Cloud / Objekt', ['S3-Objektspeicher', 'skalierbar, Kosten pro GB']],
        ]],
        ['tbl', ['Backup-Art', 'sichert', 'Wiederherstellung', 'Speicher'], [
          ['**Voll**', 'alles', 'schnell: 1 Sicherung', 'hoch'],
          ['**Differenziell**', 'Änderungen seit letzter **Vollsicherung**', 'Voll + **letzte** Diff.', 'mittel, wächst'],
          ['**Inkrementell**', 'Änderungen seit letzter **Sicherung jeder Art**', 'Voll + **alle** Inkremente', 'gering'],
        ]],
        ['li', ['**3-2-1-Regel:** 3 Kopien, 2 verschiedene Medien, 1 extern/offsite (plus 1 offline/immutable gegen Ransomware).', 'Generationenprinzip **Großvater-Vater-Sohn** (Monat, Woche, Tag). Restore regelmäßig **testen**.', '**RPO** = max. tolerierter Datenverlust (Zeit seit letzter Sicherung); **RTO** = max. Wiederherstellungsdauer.']],
        ['warn', '**RAID ist kein Backup**: schützt nicht vor Löschen, Ransomware, Brand oder Diebstahl.'],
      ]},
      {t: 'Verfügbarkeit und USV', icon: 'bolt', ids: ['infra-verfuegbarkeit', 'infra-usv', 'infra-elektro'], items: [
        ['f', 'Verfügbarkeit = MTBF / (MTBF + MTTR)', 'MTBF = mittlere Betriebszeit zwischen Ausfällen, MTTR = mittlere Reparaturzeit'],
        ['f', 'Ausfallzeit/Jahr = (1 − V) · 8760 h', '99 % = 87,6 h; 99,9 % = 8,76 h; 99,99 % = 52,6 min; 99,999 % = 5,26 min'],
        ['f', 'seriell: V = V1 · V2   |   parallel: V = 1 − (1 − V1)(1 − V2)', 'Reihe: alle müssen laufen (schlechter); redundant: einer reicht (besser)'],
        ['pairs', [['Offline (VFD)', 'schaltet bei Ausfall um, Umschaltzeit ms, günstig, Arbeitsplatz'], ['Line-Interactive (VI)', 'zusätzlich Spannungsregelung (AVR)'], ['Online (VFI)', 'Doppelwandler, **keine Umschaltzeit**, Server/Rechenzentrum']]],
        ['f', 'S [VA] = P [W] / cos φ   |   t = Kapazität [Wh] / Last [W]', 'Leistungsfaktor z. B. 0,8 bis 1; Reserve 20 bis 30 % einplanen'],
        ['f', 'P = U · I   |   U = R · I   |   W = P · t', 'Energiekosten = kW · h · Preis/kWh; Beispiel 400 W · 24 h · 365 = 3504 kWh'],
        ['li', ['Hochverfügbarkeit: Redundanz (**N+1**), Cluster (Active/Active, Active/Passive), Failover, redundante Netzteile, zwei Stromkreise, Notstromaggregat.', 'Sicherheit am Arbeitsplatz: **VDE**-Prüfung (DGUV V3), Schutzklassen I (Schutzleiter), II (doppelt isoliert), III (Schutzkleinspannung).']],
      ]},
      {t: 'Virtualisierung und Server', icon: 'gear', ids: ['infra-virtualisierung', 'infra-server'], items: [
        ['tbl', ['', 'Typ 1 (Bare Metal)', 'Typ 2 (Hosted)', 'Container'], [
          ['läuft auf', 'direkt auf Hardware', 'auf Host-Betriebssystem', 'teilt Host-**Kernel**'],
          ['Beispiele', 'VMware ESXi, Hyper-V, Proxmox/KVM', 'VirtualBox, VMware Workstation', 'Docker, Podman, Kubernetes'],
          ['Einsatz', 'Rechenzentrum, Server', 'Test, Entwickler-PC', 'Microservices, CI/CD'],
          ['Isolation / Start', 'hoch / Minuten', 'hoch / Minuten', 'geringer / Sekunden'],
        ]],
        ['li', ['Vorteile: bessere **Auslastung**, Konsolidierung, Snapshots, **Live-Migration**, schnelle Bereitstellung, weniger Strom/Platz. Nachteile: Single Point of Failure Host, Lizenzkosten, Overhead.', '**Cloud:** IaaS (VM), PaaS (Plattform), SaaS (Anwendung); Public, Private, Hybrid, Community.', 'Server-Bauformen: Tower, **Rack** (19 Zoll, Höheneinheit **HE/U** = 1,75 Zoll), Blade. Rollen: Datei, Druck, Web, DB, Mail, **Verzeichnisdienst** (AD/LDAP), DHCP, DNS.']],
        ['tip', 'Snapshot ist **kein Backup** (liegt auf demselben Storage).'],
      ]},
      {t: 'Schutzziele und Kryptografie', icon: 'lock', ids: ['infra-cia', 'infra-krypto'], items: [
        ['cards', [
          ['Vertraulichkeit', ['nur Berechtigte lesen', 'Verschlüsselung, Zugriffsrechte']],
          ['Integrität', ['unverändert, vollständig', 'Hash, Signatur, Prüfsumme']],
          ['Verfügbarkeit', ['nutzbar, wenn gebraucht', 'RAID, USV, Backup, Cluster']],
          ['Erweitert', ['**Authentizität**, Verbindlichkeit (Nichtabstreitbarkeit), Zurechenbarkeit']],
        ]],
        ['tbl', ['', 'Symmetrisch', 'Asymmetrisch'], [
          ['Schlüssel', '**ein** gemeinsamer geheimer', '**Schlüsselpaar** öffentlich / privat'],
          ['Tempo', 'schnell', 'langsam'],
          ['Problem', 'sicherer **Schlüsselaustausch**, n(n−1)/2 Schlüssel', 'Echtheit des öffentlichen Schlüssels → **PKI**'],
          ['Verfahren', '**AES** (128/256), ChaCha20; alt: DES, 3DES', '**RSA**, ECC, Diffie-Hellman (Austausch)'],
        ]],
        ['pairs', [['Hybrid', 'Sitzungsschlüssel asymmetrisch austauschen, Daten symmetrisch verschlüsseln (TLS, PGP)'], ['Verschlüsseln', 'mit **öffentlichem** Schlüssel des **Empfängers**'], ['Signieren', 'Hash mit eigenem **privaten** Schlüssel; prüfen mit öffentlichem Schlüssel des Absenders'], ['Hash', 'Einwegfunktion, feste Länge: **SHA-256**, SHA-3; unsicher: MD5, SHA-1'], ['Passwörter', 'mit **Salt** und langsamem Hash speichern: bcrypt, scrypt, Argon2']]],
        ['mnemo', 'Verschlüsseln = **Empfänger** öffentlich. Signieren = **Absender** privat.'],
      ]},
      {t: 'PKI, TLS und VPN', icon: 'eye', ids: ['infra-pki', 'infra-tls', 'infra-vpn'], items: [
        ['li', ['**PKI:** CA (Zertifizierungsstelle) signiert **X.509-Zertifikat** (Name, öffentl. Schlüssel, Gültigkeit, Aussteller, Signatur). RA prüft Identität. Vertrauenskette: **Root-CA → Intermediate → Server**.', 'Sperrung: **CRL** (Sperrliste) oder **OCSP** (Online-Abfrage). Let\'s Encrypt: kostenlos, automatisiert (ACME).']],
        ['flow', ['ClientHello (Cipher Suites)', 'ServerHello + **Zertifikat**', 'Client prüft Zertifikat', 'Schlüsselaustausch (ECDHE)', 'symmetrisch verschlüsselte Daten (AES)']],
        ['li', ['**TLS 1.2 / 1.3** verwenden, SSL und TLS 1.0/1.1 sind veraltet. HTTPS = HTTP über TLS (443). **HSTS** erzwingt HTTPS.', '**Perfect Forward Secrecy** (ECDHE): alte Sitzungen bleiben sicher, auch wenn der private Schlüssel später bekannt wird.']],
        ['pairs', [['Site-to-Site', 'verbindet Standorte (Router/Firewall zu Router)'], ['End-to-Site', 'Remote Access: Client (Homeoffice) zu Firma'], ['IPsec', 'Schicht 3, ESP (verschlüsselt), AH (nur Integrität), IKE; Tunnel- und Transportmodus'], ['SSL/TLS-VPN', 'OpenVPN, oft über 443, firewallfreundlich'], ['WireGuard', 'schlank, modern, UDP']]],
      ]},
      {t: 'Firewall und Netzsicherheit', icon: 'sword', ids: ['infra-firewall', 'infra-radius'], items: [
        ['pairs', [['Paketfilter', 'Schicht 3/4: IP, Port, Protokoll; zustandslos'], ['Stateful Inspection', 'merkt sich Verbindungen, Antwortpakete erlaubt'], ['Application Layer Gateway / Proxy', 'Schicht 7, inhaltsbasiert, z. B. Web-Proxy, **WAF**'], ['NGFW', 'plus Anwendungserkennung, IDS/IPS, TLS-Inspection'], ['IDS / IPS', 'erkennt / verhindert Angriffe (signatur- oder anomaliebasiert)']]],
        ['li', ['Regelwerk: **Whitelist** "deny all, allow by exception", Regeln von oben nach unten, erste Übereinstimmung gilt, letzte Regel **Default Deny**.', '**DMZ:** eigene Zone zwischen zwei Firewalls (oder 3-Bein-FW) für öffentlich erreichbare Server (Web, Mail). Internes LAN nie direkt aus dem Internet erreichbar.']],
        ['tbl', ['Nr.', 'Quelle', 'Ziel', 'Port', 'Aktion'], [['1', 'any', 'DMZ-Web', 'TCP 443', 'allow'], ['2', 'LAN', 'any', 'TCP 80, 443', 'allow'], ['3', 'any', 'any', 'any', '**deny**']]],
        ['li', ['**RADIUS** (UDP 1812/1813): zentrale **AAA** = Authentication, Authorization, Accounting. Mit **IEEE 802.1X**: Supplicant (Client) → Authenticator (Switch/AP) → Authentication Server (RADIUS, z. B. gegen AD). Port bleibt bis zur Anmeldung gesperrt; dynamische VLAN-Zuweisung möglich.', 'Weitere: **NAC**, Port-Security (MAC-Filter), Netzsegmentierung, Zero Trust.']],
      ]},
      {t: 'Angriffe, Schwachstellen, Web-Sicherheit', icon: 'alert', ids: ['infra-angriffe', 'infra-schwachstellen', 'infra-websec', 'infra-webauth'], wide: true, items: [
        ['tbl', ['Angriff', 'Beschreibung', 'Gegenmaßnahme'], [
          ['**Phishing / Social Engineering**', 'Täuschung per Mail, Telefon, gefälschte Seite', 'Schulung, MFA, Mailfilter'],
          ['**Ransomware / Malware**', 'Verschlüsselung, Erpressung; Virus, Wurm, Trojaner', 'Patches, Offline-Backup, Virenscanner, Least Privilege'],
          ['**DoS / DDoS**', 'Überlastung (SYN-Flood, Botnetz)', 'Rate Limiting, CDN/Scrubbing, Redundanz'],
          ['**Man-in-the-Middle**', 'Mitlesen/Manipulieren (ARP-Spoofing, rogue AP)', 'TLS, Zertifikatsprüfung, VPN, 802.1X'],
          ['**SQL-Injection**', 'Eingabe wird als SQL ausgeführt: \' OR 1=1 --', '**Prepared Statements**, Eingabevalidierung, minimale DB-Rechte'],
          ['**XSS**', 'eingeschleustes JavaScript im Browser anderer Nutzer', '**Ausgabe kodieren/escapen**, Content Security Policy, HttpOnly-Cookies'],
          ['**CSRF**', 'fremde Seite löst Aktion mit Session des Opfers aus', 'CSRF-Token, SameSite-Cookies'],
          ['**Brute Force / Credential Stuffing**', 'Passwörter durchprobieren / geleakte Daten', 'Sperre/Verzögerung, MFA, Captcha'],
          ['Zero-Day / Buffer Overflow', 'unbekannte bzw. Speicherfehler-Lücke', 'Patchmanagement, ASLR, Segmentierung'],
        ]],
        ['li', ['Schwachstellen: ungepatchte Software, **Standardpasswörter**, offene Ports, Fehlkonfiguration, fehlende Verschlüsselung. Bewertung mit **CVSS** (0 bis 10), Kennung **CVE**. Referenz: **OWASP Top 10**.', 'Begriffe: **Schwachstelle** + **Bedrohung** → **Risiko** = Eintrittswahrscheinlichkeit × Schadenshöhe.', ['Web-Authentifizierung', ['**MFA/2FA**: Wissen + Besitz + Sein (Passwort, TOTP-App/Token, Fingerabdruck)', 'Session-Cookie (Secure, HttpOnly, SameSite) vs. **Token** (JWT, zustandslos, signiert)', '**OAuth 2.0** = Autorisierung (Zugriff delegieren), **OpenID Connect** = Authentifizierung darauf; **SSO** z. B. per SAML', 'Passkeys / FIDO2: Public-Key-Anmeldung ohne Passwort, phishingresistent']]]],
        ['warn', 'Hashing ≠ Verschlüsselung (nicht umkehrbar). Authentifizierung = **wer bist du**, Autorisierung = **was darfst du**.'],
      ]},
      {t: 'ISMS, IT-Grundschutz, Datenschutz', icon: 'clipboard', ids: ['infra-isms', 'infra-grundschutz'], items: [
        ['li', ['**ISMS** (Informationssicherheits-Managementsystem) nach **ISO/IEC 27001**: Regeln, Verantwortliche (ISB), Risikomanagement, kontinuierliche Verbesserung nach **PDCA**.', '**BSI IT-Grundschutz** (Standards 200-1 bis 200-4, **IT-Grundschutz-Kompendium** mit Bausteinen); Zertifizierung ISO 27001 auf Basis IT-Grundschutz möglich.']],
        ['flow', ['Plan', 'Do', 'Check', 'Act']],
        ['flow', ['Strukturanalyse', 'Schutzbedarfsfeststellung', 'Modellierung (Bausteine)', 'IT-Grundschutz-Check', 'Risikoanalyse', 'Umsetzung']],
        ['pairs', [['Schutzbedarf', '**normal**, **hoch**, **sehr hoch** je Schutzziel'], ['Maximumprinzip', 'höchster Schutzbedarf der abhängigen Anwendungen bestimmt den des Systems'], ['Kumulationseffekt', 'viele kleine Schäden zusammen → höherer Bedarf'], ['Verteilungseffekt', 'Redundanz → Bedarf eines Einzelsystems sinkt'], ['Absicherung', 'Basis-, Standard-, Kern-Absicherung']]],
        ['li', ['**TOM** nach DSGVO Art. 32: Zutritts-, Zugangs-, Zugriffs-, Weitergabe-, Eingabe-, Verfügbarkeitskontrolle, Trennungsgebot, Pseudonymisierung, Verschlüsselung.', 'Risikobehandlung: **vermeiden, vermindern, übertragen** (Versicherung), **akzeptieren**.', 'Weitere: **NIS2**, BCM (BSI 200-4), Notfallhandbuch, Least Privilege, Need-to-know.']],
      ]},
      {t: 'VoIP, MQTT, Industrie 4.0, Blockchain', icon: 'flask', ids: ['infra-voip', 'infra-mqtt', 'infra-industrie40', 'infra-blockchain'], items: [
        ['pairs', [['VoIP', '**SIP** (Signalisierung, 5060/5061) + **RTP** (Sprache, UDP), sicher: SRTP/SIPS; Codecs G.711, G.722, Opus'], ['QoS', 'Sprache priorisieren (DSCP/802.1p), eigenes Voice-VLAN; Latenz < 150 ms, Jitter, Paketverlust gering'], ['Vorteile', 'eine Infrastruktur, günstig, CTI, Standortunabhängigkeit; Nachteil: Strom (PoE/USV), Notruf']]],
        ['flow', ['Publisher (Sensor)', 'Broker', 'Subscriber (App)']],
        ['li', ['**MQTT**: schlankes **Publish/Subscribe** über TCP (1883, TLS 8883), **Topics** hierarchisch (halle1/maschine3/temp, Wildcards **+** eine Ebene, **#** mehrere). **QoS 0** höchstens einmal, **1** mindestens einmal, **2** genau einmal. Retained Message, Last Will.', '**Industrie 4.0 / IoT / IIoT**: vernetzte Produktion, cyber-physische Systeme, **digitaler Zwilling**, Predictive Maintenance, Edge Computing, OPC UA. Risiko: alte, ungepatchte OT-Systeme → Netztrennung IT/OT.', '**Blockchain**: verteiltes Register; Blöcke enthalten **Hash des Vorgängers** → Manipulation fällt auf. Konsens: **Proof of Work** / Proof of Stake. Eigenschaften: dezentral, unveränderlich, transparent; Nachteil: Energie, Skalierung, DSGVO-Löschung. Smart Contracts.']],
      ]},
      {t: 'Quellen', icon: 'book', items: [
        ['ext', [
          ['BSI IT-Grundschutz-Kompendium', 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/it-grundschutz-kompendium_node.html'],
          ['BSI-Standards 200-x', 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/BSI-Standards/bsi-standards_node.html'],
          ['RFC 1918 (private IPv4)', 'https://www.rfc-editor.org/rfc/rfc1918'],
          ['RFC 4291 (IPv6-Adressierung)', 'https://www.rfc-editor.org/rfc/rfc4291'],
          ['RFC 8446 (TLS 1.3)', 'https://www.rfc-editor.org/rfc/rfc8446'],
          ['IANA Portnummern', 'https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml'],
          ['OWASP Top 10', 'https://owasp.org/www-project-top-ten/'],
          ['MQTT-Spezifikation', 'https://mqtt.org/mqtt-specification/'],
        ]],
      ]},
    ],
  });
})();
