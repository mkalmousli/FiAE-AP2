AP2.page('infra-websec', {
  b: 'infra', g: 'IT-Sicherheit', t: 'Webanwendungen absichern: TLS, Reverse Proxy, WAF und OWASP Top 10',
  d: 'Webanwendungen sind öffentlich erreichbar und deshalb das häufigste Angriffsziel. Absicherung geschieht in Schichten: **TLS** verschlüsselt und schützt die Integrität der Übertragung (hybrid: asymmetrischer Schlüsselaustausch, symmetrische Datenverschlüsselung, MAC/AEAD für Integrität), ein **Reverse Proxy** nimmt Anfragen stellvertretend für die Webserver entgegen (TLS-Terminierung, Lastverteilung, **Web Application Firewall**), und **sichere Programmierung** nach den **OWASP Top 10** verhindert Lücken wie SQL-Injection oder XSS.',
  m: '**TLS ist der sichere Nachfolger von SSL** (SSL 2.0/3.0 und TLS 1.0/1.1 sind veraltet; heute TLS 1.2/1.3). **Hybrid:** asymmetrisch für den Schlüssel, symmetrisch für die Daten. Über das Internet geht nur der **öffentliche Schlüssel**, nie der private. **Reverse Proxy = Türsteher vor den Webservern.**',
  cheat: [
    ['TLS', ['Vertraulichkeit: symmetrische Verschlüsselung (AES-GCM, ChaCha20)', 'Schlüsselaustausch: (EC)DHE, Server-Authentizität per Zertifikat', 'Integrität: MAC bzw. AEAD', 'Perfect Forward Secrecy durch flüchtige Schlüssel', 'HTTPS = HTTP über TLS, Port 443']],
    ['Reverse Proxy', ['Steht vor den Webservern, Clients sehen nur ihn', '**TLS-Terminierung (SSL-Offloading):** entschlüsselt, entlastet Server', 'Lastverteilung, Caching, Kompression', '**WAF** filtert Angriffe (SQLi, XSS)', 'Interne Server bleiben verborgen']],
    ['OWASP Top 10 (Auswahl)', ['Broken Access Control', 'Cryptographic Failures', '**Injection** (SQL, Command), auch XSS', 'Insecure Design', 'Security Misconfiguration', 'Vulnerable and Outdated Components', 'Identification and Authentication Failures', 'Software and Data Integrity Failures', 'Logging and Monitoring Failures', 'SSRF']],
    ['Schutzmaßnahmen im Code', ['**Prepared Statements** gegen SQL-Injection', '**Ausgabe kodieren** (escapen) gegen XSS', 'CSRF-Token und SameSite-Cookies', 'Eingaben serverseitig validieren', 'Security-Header: HSTS, CSP, X-Frame-Options']],
  ],
  blocks: [
    ['h', 'Wie TLS Vertraulichkeit und Integrität sichert'],
    ['steps', ['**Authentizität:** Der Server weist sich mit einem **Zertifikat** aus, das eine vertrauenswürdige CA signiert hat. Der Client prüft Kette, Gültigkeit und Hostnamen.', '**Schlüsselaustausch:** Beide berechnen per (EC)DHE einen gemeinsamen **Sitzungsschlüssel**, ohne ihn zu übertragen (asymmetrische Verfahren).', '**Vertraulichkeit:** Alle Nutzdaten werden mit dem Sitzungsschlüssel **symmetrisch** verschlüsselt (schnell).', '**Integrität:** Jeder Datensatz trägt einen Authentifizierungscode (MAC, heute als AEAD-Verfahren integriert); Manipulationen fallen auf.']],
    ['table', ['Version', 'Status'], [['SSL 2.0, SSL 3.0', 'unsicher, abgeschaltet (zum Beispiel POODLE)'], ['TLS 1.0, TLS 1.1', 'veraltet, seit 2021 offiziell abgekündigt'], ['TLS 1.2', 'noch zulässig mit sicheren Cipher Suites'], ['TLS 1.3', 'aktueller Standard: schnellerer Handshake, nur sichere Verfahren, immer Forward Secrecy']]],
    ['h', 'Reverse Proxy mit TLS-Terminierung'],
    ['diagram', {w: 780, h: 290, cap: 'Der Reverse Proxy hält Zertifikat und privaten Schlüssel. Beim SSL-Offloading läuft die Verbindung zum internen Webserver unverschlüsselt (oder neu verschlüsselt).', nodes: [
      {id: 'c', x: 80, y: 140, k: 'round', s: 'plain', t: ['Client', '(Browser)'], w: 120, h: 60},
      {id: 'i', x: 250, y: 140, k: 'oval', s: 'soft', t: 'Internet', w: 120, h: 60},
      {id: 'p', x: 440, y: 140, k: 'round', s: 'solid', t: ['Reverse Proxy', '+ WAF'], w: 150, h: 70},
      {id: 'w1', x: 670, y: 60, k: 'round', s: 'accent', t: 'Webserver 1', w: 150},
      {id: 'w2', x: 670, y: 140, k: 'round', s: 'accent', t: 'Webserver 2', w: 150},
      {id: 'w3', x: 670, y: 220, k: 'round', s: 'accent', t: 'Webserver 3', w: 150},
      {id: 'k', x: 440, y: 235, k: 'note', s: 'gold', t: ['Zertifikat +', 'privater Schlüssel'], w: 150, h: 50},
      {id: 'z', x: 670, y: 275, k: 'text', t: 'internes Netz (DMZ)', fs: 12},
    ], edges: [{a: 'c', b: 'i', t: 'HTTPS', ea: 'none'}, {a: 'i', b: 'p', t: 'TLS'}, {a: 'p', b: 'w1', k: 'dash'}, {a: 'p', b: 'w2', k: 'dash', t: 'HTTP'}, {a: 'p', b: 'w3', k: 'dash'}]}],
    ['kv', [
      ['Vorteile', 'Zentrale Zertifikatsverwaltung, Entlastung der Webserver von der Kryptografie, Lastverteilung und Ausfallsicherheit, Schutz durch WAF und Rate Limiting, interne Struktur bleibt verborgen.'],
      ['Risiko beim Offloading', 'Hinter dem Proxy ist der Verkehr im Klartext. Das interne Netz muss vertrauenswürdig sein, sonst **TLS-Re-Encryption** (Proxy verschlüsselt erneut zum Backend).'],
      ['Welcher Schlüssel geht über das Internet?', 'Nur der **öffentliche** Schlüssel (im Zertifikat). Der **private** Schlüssel verlässt den Proxy nie; der **Sitzungsschlüssel** wird bei (EC)DHE gar nicht übertragen, sondern auf beiden Seiten berechnet.'],
    ]],
    ['h', 'Die häufigsten Schwachstellen und ihre Abwehr'],
    ['table', ['Angriff', 'So funktioniert er', 'Abwehr'], [
      ['SQL-Injection', 'Eingaben werden ungeprüft in SQL eingebaut: `admin\' --` kommentiert die Passwortprüfung aus.', '**Prepared Statements** / parametrisierte Abfragen, minimale DB-Rechte'],
      ['Cross-Site Scripting (XSS)', 'Angreifer bringt JavaScript in eine Seite (zum Beispiel über einen Kommentar), das im Browser anderer Nutzer läuft und Cookies stiehlt.', 'Ausgaben **kontextgerecht kodieren**, Content Security Policy, HttpOnly-Cookies'],
      ['Cross-Site Request Forgery (CSRF)', 'Eine fremde Seite löst im Namen des angemeldeten Nutzers Aktionen aus (Überweisung).', '**CSRF-Token**, SameSite-Cookies, Rückfrage bei kritischen Aktionen'],
      ['Broken Access Control', 'Nutzer ändert die ID in der URL und sieht fremde Bestellungen.', 'Berechtigung **serverseitig** bei jeder Anfrage prüfen'],
      ['Veraltete Komponenten', 'Bekannte Lücke in einer Bibliothek (zum Beispiel Log4Shell).', 'Patch-Management, Abhängigkeiten scannen (SBOM)'],
    ]],
    ['codes', [
      ['java', `// Unsicher: Eingabe wird Teil des SQL-Textes
String sql = "SELECT * FROM benutzer WHERE name = '" + name + "' AND pwd = '" + pwd + "'";

// Sicher: Prepared Statement, Eingaben sind nur Daten
PreparedStatement ps = con.prepareStatement(
    "SELECT * FROM benutzer WHERE name = ? AND pwd_hash = ?");
ps.setString(1, name);
ps.setString(2, hash(pwd));`],
      ['php', `// Unsicher
$sql = "SELECT * FROM benutzer WHERE name = '$name' AND pwd = '$pwd'";
// Sicher
$stmt = $pdo->prepare("SELECT * FROM benutzer WHERE name = ?");
$stmt->execute([$name]);
$user = $stmt->fetch();
$ok = $user && password_verify($pwd, $user['pwd_hash']);`],
    ]],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Was ist der Hauptunterschied zwischen TLS und SSL, und wie gewährleistet TLS Vertraulichkeit und Integrität?', ['**TLS** ist der standardisierte, sicherere **Nachfolger von SSL**; alle SSL-Versionen gelten als unsicher und sind abgeschaltet.', '- **Vertraulichkeit:** Nach einem asymmetrischen Schlüsselaustausch werden die Daten mit einem gemeinsamen Sitzungsschlüssel **symmetrisch verschlüsselt**.', '- **Integrität:** Jeder Datensatz wird mit einem **Message Authentication Code** (bzw. AEAD) gesichert; Veränderungen werden erkannt.', '- **Authentizität:** Der Server weist sich mit einem CA-signierten **Zertifikat** aus.'], 5],
    ['qa', 'Nutzt TLS symmetrische oder asymmetrische Verschlüsselung? Welcher Schlüssel wird über das Internet übertragen?', 'TLS nutzt eine **Kombination (hybrid)**: asymmetrische Verfahren für Authentifizierung und Schlüsselaustausch, symmetrische für die Nutzdaten. Über das Internet wird nur der **öffentliche Schlüssel** (im Zertifikat) übertragen; der private Schlüssel bleibt auf dem Server bzw. Reverse Proxy.', 3],
    ['qa', 'Nennen Sie drei Vorteile eines Reverse Proxys vor einer Webanwendung.', ['- **TLS-Terminierung:** Zertifikate zentral verwalten, Webserver entlasten.', '- **Lastverteilung** und Ausfallsicherheit über mehrere Webserver.', '- **Sicherheit:** Web Application Firewall, Rate Limiting gegen DoS, interne Server und ihre Adressen bleiben verborgen.', '- Caching und Kompression für bessere Antwortzeiten.'], 3],
    ['see', ['infra-tls', 'infra-pki', 'infra-angriffe', 'infra-firewall', 'infra-webauth']],
    ['quiz', [
      {q: 'Welche TLS-Version ist der aktuelle Standard?', o: ['TLS 1.3', 'SSL 3.0', 'TLS 1.0', 'SSL 2.0'], a: 0, e: 'TLS 1.3 (2018) ist schneller und erlaubt nur sichere Verfahren.'},
      {q: 'Was bedeutet SSL-Offloading?', o: ['Der Reverse Proxy entschlüsselt TLS und leitet intern weiter', 'Der Client schaltet die Verschlüsselung ab', 'Das Zertifikat wird gelöscht', 'Daten werden komprimiert'], a: 0, e: 'Die Kryptografie wird vom Webserver auf den Proxy ausgelagert.'},
      {q: 'Welcher Schlüssel wird beim TLS-Handshake über das Internet übertragen?', o: ['Der öffentliche Schlüssel', 'Der private Schlüssel', 'Der Sitzungsschlüssel im Klartext', 'Gar keiner'], a: 0, e: 'Der öffentliche Schlüssel steckt im Zertifikat; der Sitzungsschlüssel wird per (EC)DHE berechnet.'},
      {q: 'Was schützt am besten gegen SQL-Injection?', o: ['Prepared Statements', 'Längere Passwörter', 'HTTPS', 'Ein schnellerer Server'], a: 0, e: 'Parameter werden getrennt vom SQL-Text übergeben und nie als Code ausgeführt.'},
      {q: 'Welcher Angriff schleust Skriptcode in Seiten ein, die andere Nutzer ansehen?', o: ['Cross-Site Scripting (XSS)', 'DDoS', 'ARP-Spoofing', 'Brute Force'], a: 0, e: 'Abwehr: Ausgaben kodieren, Content Security Policy.'},
      {q: 'Was gehört NICHT zu den Aufgaben eines Reverse Proxys?', o: ['IP-Adressen per DHCP verteilen', 'Lastverteilung', 'TLS-Terminierung', 'Web Application Firewall'], a: 0, e: 'DHCP ist ein Netzwerkdienst im LAN, kein Proxy-Feature.'},
    ]],
  ],
});
