AP2.exam.part('exam1-ps', {
  t: 'Handlungsschritt 5: Infrastruktur und IT-Sicherheit (20 Punkte)',
  tasks: [
    {pts: 6, rows: 6, q: 'Das Netz 192.168.40.0/24 soll in vier gleich große Subnetze geteilt werden. Geben Sie an: a) neues Präfix und Subnetzmaske, b) Hosts je Subnetz, c) Netzadresse, Broadcastadresse und Hostbereich des 2. Subnetzes.',
      a: ['a) 4 Subnetze = 2 Bits geliehen: **/26**, Maske **255.255.255.192**.', 'b) 2^6 - 2 = **62 Hosts** je Subnetz.', 'c) Blockgröße 64: Subnetze .0, .64, .128, .192. 2. Subnetz: Netz **192.168.40.64**, Broadcast **192.168.40.127**, Hostbereich **192.168.40.65 bis 192.168.40.126**.']},
    {pts: 4, q: 'Ein Server hat 4 Festplatten mit je 2 TB in RAID 5. Wie viel Speicher ist nutzbar, wie viele Ausfälle verkraftet der Verbund und warum ersetzt RAID kein Backup?',
      a: ['Nutzbar: (n - 1) mal 2 TB = **6 TB**. Es darf **eine** Platte ausfallen. RAID schützt nur vor **Plattenausfall**, nicht vor **Löschen, Verschlüsselungstrojanern, Bedienfehlern oder Brand/Diebstahl**: Fehler werden sofort mitgespiegelt. Ein Backup hält getrennte, ältere Kopien.']},
    {pts: 3, q: 'Der Server hat eine MTBF von 1.200 Stunden und eine MTTR von 4 Stunden. Berechnen Sie die Verfügbarkeit in Prozent und die Ausfallzeit pro Jahr (8.760 Stunden).',
      a: ['Verfügbarkeit = MTBF / (MTBF + MTTR) = 1.200 / 1.204 = **99,67 Prozent**.', 'Ausfallzeit = (1 - 0,9967) mal 8.760 h = 4 / 1.204 mal 8.760 = **ca. 29,1 Stunden** pro Jahr.']},
    {pts: 3, q: 'Ordnen Sie den Maßnahmen das Schutzziel der CIA-Triade zu: a) Festplattenverschlüsselung, b) digitale Signatur, c) Redundante Netzteile und Cluster.',
      a: ['- a) **Vertraulichkeit** (Confidentiality)', '- b) **Integrität** (und Authentizität)', '- c) **Verfügbarkeit** (Availability)']},
    {pts: 4, q: 'Die Kommunikation zwischen Browser und Portal soll verschlüsselt werden. a) Welches Protokoll wird eingesetzt? b) Erklären Sie kurz, warum dabei symmetrische und asymmetrische Verfahren kombiniert werden.',
      a: ['a) **TLS** (HTTPS, Port 443) mit **Zertifikat** einer Zertifizierungsstelle zur Authentifizierung des Servers.', 'b) **Asymmetrisch** (Schlüsselpaar öffentlich/privat) löst den **Schlüsselaustausch** sicher, ist aber **langsam**. **Symmetrisch** (ein gemeinsamer Sitzungsschlüssel, zum Beispiel AES) ist **schnell** und verschlüsselt die Nutzdaten. Beides zusammen: sicher und effizient (hybrides Verfahren).']},
  ],
});
AP2.exam.end('exam1-ps');
