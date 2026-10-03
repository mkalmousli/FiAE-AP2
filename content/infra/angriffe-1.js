AP2.page('infra-angriffe', {
  b: 'infra', g: 'IT-Sicherheit', t: 'Angriffsarten: SQL-Injection, Man-in-the-Middle, DDoS und mehr',
  d: 'Angriffe zielen auf die Schutzziele: **SQL-Injection** schleust Datenbankbefehle über Eingaben ein (Integrität, Vertraulichkeit), **Man-in-the-Middle** hört Verbindungen mit und verändert sie, **DDoS** legt Dienste durch Überlastung lahm (Verfügbarkeit). Weitere: Phishing, Malware (Ransomware), Brute-Force, XSS.',
  m: '**SQLi: Eingabe wird zu Code. Schutz: Prepared Statements.** **MitM: Angreifer sitzt dazwischen. Schutz: TLS und Zertifikate.** **DDoS: Viele Anfragen von vielen Rechnern (Botnet). Schutz: Filter, Skalierung, Rate Limiting.** Menschen sind die häufigste Schwachstelle: **Social Engineering**.',
  cheat: [
    ['SQL-Injection', ['Eingabe verändert die **SQL-Abfrage**', 'Beispiel: `\' OR \'1\'=\'1`', 'Schutz: **Prepared Statements** (Parameter), Eingaben validieren, minimale DB-Rechte, WAF']],
    ['Man-in-the-Middle', ['Angreifer **zwischen** zwei Partnern, liest/ändert mit', 'Mittel: ARP-Spoofing, falscher Hotspot, DNS-Spoofing', 'Schutz: **TLS/HTTPS**, Zertifikatsprüfung, VPN, HSTS']],
    ['DoS / DDoS', ['**Überlastung** eines Dienstes', '**DDoS:** viele Quellen (**Botnet**)', 'Arten: SYN-Flood, UDP-Flood, HTTP-Flood', 'Schutz: Rate Limiting, Firewall, **CDN**, Lastverteilung']],
    ['Weitere', ['**Phishing**/Social Engineering', '**Ransomware:** verschlüsselt Daten, fordert Lösegeld', '**Brute-Force**/Wörterbuch', '**XSS**, CSRF, Zero-Day, Supply-Chain']],
  ],
  blocks: [
    ['h', 'Überblick: Ziel und Wirkung der Angriffe'],
    ['table', ['Angriff', 'Wie funktioniert er?', 'Verletztes Schutzziel', 'Schutzmaßnahmen'], [
      ['**SQL-Injection**', 'Böswillige SQL-Fragmente werden über Eingabefelder in eine Datenbankabfrage eingeschleust', 'Vertraulichkeit, Integrität', 'Prepared Statements, Eingabevalidierung, minimale Rechte'],
      ['**Man-in-the-Middle**', 'Angreifer schaltet sich unbemerkt in die Kommunikation und liest oder verändert sie', 'Vertraulichkeit, Integrität', 'TLS, Zertifikatsprüfung, VPN, sichere WLANs'],
      ['**DoS / DDoS**', 'Dienst wird mit Anfragen überlastet', 'Verfügbarkeit', 'Rate Limiting, Firewalls, CDN, Redundanz'],
      ['**Phishing / Social Engineering**', 'Täuschung von Menschen (gefälschte E-Mails, Anrufe)', 'Vertraulichkeit', 'Schulung, MFA, E-Mail-Filter'],
      ['**Malware / Ransomware**', 'Schadprogramm (Virus, Wurm, Trojaner), Verschlüsselung von Daten', 'Alle drei', 'Patches, Virenschutz, Backups, Segmentierung'],
      ['**Brute-Force / Wörterbuch**', 'Systematisches Ausprobieren von Passwörtern', 'Vertraulichkeit', 'Lange Passwörter, Sperre nach Fehlversuchen, MFA'],
      ['**XSS** (Cross-Site Scripting)', 'Schadskript wird in eine Webseite eingeschleust und im Browser anderer Nutzer ausgeführt', 'Vertraulichkeit, Integrität', 'Ausgabe kodieren (Escaping), Content Security Policy'],
    ]],
    ['h', 'SQL-Injection'],
    ['p', 'Viele Webanwendungen bauen SQL-Abfragen aus **Benutzereingaben**. Setzt man die Eingabe **ungeprüft in den SQL-Text**, kann ein Angreifer eigene SQL-Befehle einfügen.'],
    ['code', 'java', `// UNSICHER: Eingabe wird direkt in den SQL-Text eingebaut
String sql = "SELECT * FROM benutzer WHERE name = '" + name
           + "' AND passwort = '" + pw + "'";

// Angreifer gibt als Name ein:   admin' --
// Daraus wird:
// SELECT * FROM benutzer WHERE name = 'admin' --' AND passwort = ''
//                                              ^^ alles danach ist Kommentar: Login ohne Passwort!

// Noch schlimmer:  ' OR '1'='1   -> Bedingung ist immer wahr
//                  '; DROP TABLE benutzer; --   -> Tabelle wird gelöscht`],
    ['code', 'java', `// SICHER: Prepared Statement - Parameter werden NIE als SQL interpretiert
PreparedStatement ps = con.prepareStatement(
    "SELECT * FROM benutzer WHERE name = ? AND passwort_hash = ?");
ps.setString(1, name);        // Eingabe ist nur noch ein Wert
ps.setString(2, hashOf(pw));
ResultSet rs = ps.executeQuery();`],
    ['procon', 'Schutz vor SQL-Injection', ['**Prepared Statements / parametrisierte Abfragen** trennen Code und Daten (wichtigster Schutz)', 'Eingaben **validieren** (Typ, Länge, erlaubte Zeichen)', 'Datenbankkonto mit **minimalen Rechten** (kein DROP, kein Admin)', 'Fehlermeldungen nicht an Nutzer ausgeben, **WAF**, regelmäßige Tests'], ['Eigene Filter für Sonderzeichen ("Escaping von Hand") sind fehleranfällig', 'Reine Blacklists lassen sich oft umgehen', 'Ein Konto mit zu vielen Rechten verstärkt den Schaden']],
  ],
});
