AP2.page('infra-osi', {
  b: 'infra', g: 'Netzwerke', t: 'OSI-Referenzmodell',
  d: 'Das **OSI-Referenzmodell** (Open Systems Interconnection) teilt die Netzwerkkommunikation in **7 Schichten**. Jede Schicht hat eine **eigene Aufgabe** und nutzt nur die Dienste der Schicht darunter. Die Schichten sind: 7 Anwendung, 6 Darstellung, 5 Sitzung, 4 Transport, 3 Vermittlung, 2 Sicherung, 1 Bitübertragung.',
  m: 'Von oben nach unten: **"All People Seem To Need Data Processing"** = Application, Presentation, Session, Transport, Network, Data Link, Physical. Auf Deutsch: **A**nwendung, **D**arstellung, **S**itzung, **T**ransport, **V**ermittlung, **S**icherung, **B**itübertragung.',
  cheat: [
    ['Schicht 1 bis 4 (unten)', ['**1 Bitübertragung:** Kabel, Signale, Hub, Repeater', '**2 Sicherung:** MAC-Adresse, **Frame**, **Switch**', '**3 Vermittlung:** IP-Adresse, **Paket**, **Router**', '**4 Transport:** TCP/UDP, Ports, **Segment**']],
    ['Schicht 5 bis 7 (oben)', ['**5 Sitzung:** Verbindung auf- und abbauen', '**6 Darstellung:** Format, Verschlüsselung, Kompression', '**7 Anwendung:** HTTP, FTP, SMTP, DNS, DHCP', 'Alle drei: PDU heißt **Daten**']],
    ['PDU (Dateneinheit)', ['Schicht 7-5: **Daten**', 'Schicht 4: **Segment** (TCP) / Datagramm (UDP)', 'Schicht 3: **Paket**', 'Schicht 2: **Frame**', 'Schicht 1: **Bits**']],
    ['Kapselung', ['Senden: jede Schicht fügt einen **Header** hinzu (nach unten)', 'Empfangen: jede Schicht entfernt ihren Header (nach oben)', 'Schicht 2 hat zusätzlich einen **Trailer** (Prüfsumme FCS)']],
  ],
  blocks: [
    ['h', 'Wozu braucht man ein Schichtenmodell?'],
    ['p', 'Netzwerke sind komplex: Kabel, Adressen, Verbindungen, Programme. Das **OSI-Modell** zerlegt das in sieben **kleine, überschaubare Aufgaben**. Jede Schicht kümmert sich nur um **ihre** Aufgabe und weiß nichts über die Details der anderen. Vorteile: Hersteller können Geräte und Programme **unabhängig** entwickeln, Fehler lassen sich **gezielt einer Schicht zuordnen** und man hat eine gemeinsame Sprache ("Das ist ein Layer-3-Problem").'],
    ['diagram', AP2.dg.layers([
      ['7  Anwendung (Application)', 'HTTP, HTTPS, FTP, SMTP, DNS, DHCP, SSH', 'solid'], ['6  Darstellung (Presentation)', 'Zeichensatz (Unicode), Kompression, Verschlüsselung, Formate (JPEG)'],
      ['5  Sitzung (Session)', 'Sitzungen auf- und abbauen, Synchronisation'], ['4  Transport (Transport)', 'TCP, UDP, Ports, Segmente, Fehlerkorrektur'],
      ['3  Vermittlung (Network)', 'IP, ICMP, Routing, IP-Adressen, Router'], ['2  Sicherung (Data Link)', 'Ethernet, MAC-Adressen, Frames, Switch, VLAN, ARP'], ['1  Bitübertragung (Physical)', 'Kabel, Stecker, Funk, Signale, Hub, Repeater', 'solid'],
    ], {w: 760, rh: 46, cap: 'Die sieben Schichten des OSI-Modells mit typischen Protokollen und Geräten'})],
    ['h', 'Die Schichten im Detail'],
    ['table', ['Schicht', 'Aufgabe', 'PDU', 'Adressierung', 'Beispiele'], [
      ['**7** Anwendung', 'Schnittstelle zu Programmen und Benutzern', 'Daten', '-', 'HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, DHCP, SSH, Telnet'],
      ['**6** Darstellung', 'Datenformate umwandeln, verschlüsseln, komprimieren', 'Daten', '-', 'ASCII, Unicode, JPEG, MPEG, (TLS wird oft hier eingeordnet)'],
      ['**5** Sitzung', 'Verbindungen (Sitzungen) steuern', 'Daten', '-', 'NetBIOS, RPC, SQL-Sitzungen'],
      ['**4** Transport', 'Ende-zu-Ende-Verbindung zwischen Anwendungen, Zuverlässigkeit', 'Segment (TCP), Datagramm (UDP)', '**Portnummer**', 'TCP, UDP'],
      ['**3** Vermittlung', 'Wegewahl (Routing) über Netzgrenzen hinweg', 'Paket', '**IP-Adresse**', 'IPv4, IPv6, ICMP, Router, Layer-3-Switch'],
      ['**2** Sicherung', 'Zuverlässige Übertragung im lokalen Netz, Fehlererkennung', 'Frame', '**MAC-Adresse**', 'Ethernet, WLAN (802.11), ARP, VLAN, Switch, Bridge'],
      ['**1** Bitübertragung', 'Bits als elektrische/optische/Funk-Signale übertragen', 'Bit', '-', 'Kupferkabel, Glasfaser, Funk, Hub, Repeater, Stecker'],
    ]],
    ['tip', 'Merke die **Adressen**: Schicht 2 = MAC, Schicht 3 = IP, Schicht 4 = Port. Und die **Geräte**: Hub = Schicht 1, Switch = Schicht 2, Router = Schicht 3.'],
  ],
});
