AP2.page('infra-websec', {
  b: 'infra', g: 'IT-Sicherheit', t: 'Webanwendungen absichern: TLS, Reverse Proxy, WAF und OWASP Top 10',
  d: 'Öffentlich erreichbare Webanwendungen müssen mit fremden und manipulierten Anfragen rechnen. Absicherung geschieht in Schichten: **TLS** verschlüsselt und schützt die Integrität der Übertragung (hybrid: asymmetrischer Schlüsselaustausch, symmetrische Datenverschlüsselung, MAC/AEAD für Integrität), ein **Reverse Proxy** nimmt Anfragen stellvertretend für die Webserver entgegen (TLS-Terminierung, Lastverteilung, **Web Application Firewall**), und **sichere Programmierung** nach den **OWASP Top 10** verhindert Lücken wie SQL-Injection oder XSS.',
  m: '**TLS ist der sichere Nachfolger von SSL** (SSL 2.0/3.0 und TLS 1.0/1.1 sind veraltet; heute TLS 1.2/1.3). **Hybrid:** asymmetrisch für den Schlüssel, symmetrisch für die Daten. Über das Internet geht nur der **öffentliche Schlüssel**, nie der private. **Reverse Proxy = Türsteher vor den Webservern.**',
  cheat: [
    ['TLS', ['Vertraulichkeit: symmetrische Verschlüsselung (AES-GCM, ChaCha20)', 'Schlüsselaustausch: (EC)DHE, Server-Authentizität per Zertifikat', 'Integrität: MAC bzw. AEAD', 'Perfect Forward Secrecy durch flüchtige Schlüssel', 'HTTPS = HTTP über TLS, Port 443']],
    ['Reverse Proxy', ['Steht vor den Webservern, Clients sehen nur ihn', '**TLS-Terminierung (SSL-Offloading):** entschlüsselt, entlastet Server', 'Lastverteilung, Caching, Kompression', '**WAF** filtert Angriffe (SQLi, XSS)', 'Interne Server bleiben verborgen']],
    ['OWASP Top 10, Ausgabe 2021 (Auswahl)', ['Broken Access Control', 'Cryptographic Failures', '**Injection** (SQL, Command), auch XSS', 'Insecure Design', 'Security Misconfiguration', 'Vulnerable and Outdated Components', 'Identification and Authentication Failures', 'Software and Data Integrity Failures', 'Logging and Monitoring Failures', 'SSRF']],
    ['Schutzmaßnahmen im Code', ['**Prepared Statements** gegen SQL-Injection', '**Ausgabe kodieren** (escapen) gegen XSS', 'CSRF-Token und SameSite-Cookies', 'Eingaben serverseitig validieren', 'Security-Header: HSTS, CSP, X-Frame-Options']],
  ],
  blocks: [
    ['h', 'Wie TLS Vertraulichkeit und Integrität sichert'],
    ['steps', ['**Authentizität:** Der Server weist sich mit einem **Zertifikat** aus, das eine vertrauenswürdige CA signiert hat. Der Client prüft Kette, Gültigkeit und Hostnamen.', '**Schlüsselaustausch:** Beide berechnen per (EC)DHE einen gemeinsamen **Sitzungsschlüssel**, ohne ihn zu übertragen (asymmetrische Verfahren).', '**Vertraulichkeit:** Alle Nutzdaten werden mit dem Sitzungsschlüssel **symmetrisch** verschlüsselt (schnell).', '**Integrität:** Jeder Datensatz trägt einen Authentifizierungscode (MAC, heute als AEAD-Verfahren integriert); Manipulationen fallen auf.']],
    ['table', ['Version', 'Status'], [['SSL 2.0, SSL 3.0', 'unsicher, abgeschaltet (zum Beispiel POODLE)'], ['TLS 1.0, TLS 1.1', 'veraltet, seit 2021 offiziell abgekündigt'], ['TLS 1.2', 'noch zulässig mit sicheren Cipher Suites'], ['TLS 1.3', 'Moderner Handshake und AEAD; Forward Secrecy bei passendem Schlüsselaustausch']]],
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
      ['Cross-Site Request Forgery (CSRF)', 'Eine fremde Seite löst im Namen des angemeldeten Nutzers Aktionen aus (Überweisung).', '**CSRF-Token**, SameSite-Cookies, Erneute Authentifizierung bei kritischen Aktionen'],
      ['Broken Access Control', 'Nutzer ändert die ID in der URL und sieht fremde Bestellungen.', 'Berechtigung **serverseitig** bei jeder Anfrage prüfen'],
      ['Veraltete Komponenten', 'Bekannte Lücke in einer Bibliothek (zum Beispiel Log4Shell).', 'Patch-Management, Abhängigkeiten scannen (SBOM)'],
    ]],
    ['codes', [
      ['java', `// Unsicher: Eingabe wird Teil des SQL-Textes
String sql = "SELECT * FROM benutzer WHERE name = '" + name + "' AND pwd = '" + pwd + "'";

// Sicherer SQL-Zugriff: Name ist ein Wertparameter.
// Passwort danach mit einer geeigneten Bibliothek pruefen.
try (PreparedStatement stmt = con.prepareStatement(
        "SELECT pwd_hash FROM benutzer WHERE name = ?")) {
    stmt.setString(1, name);
    try (ResultSet rs = stmt.executeQuery()) {
        if (rs.next()) {
            String gespeichert = rs.getString("pwd_hash");
            // Passwortbibliothek prueft pwd gegen gespeichert.
            // Salt und Kostenparameter aus dem Hash verwenden.
        }
    }
}`],
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

// Quelle: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
AP2.add('infra-websec', [
  [
    "h",
    "Passwortprüfung gehört nicht als einfacher Hashvergleich ins SQL"
  ],
  [
    "p",
    "Lade den gespeicherten Passwort-Hash über einen eindeutigen Benutzernamen. Eine geeignete Passwortbibliothek prüft danach das eingegebene Passwort. Sie verarbeitet Salt und Kostenparameter des gespeicherten Hashs. Schnelles SHA-256 allein ist für Passwörter ungeeignet."
  ],
  [
    "p",
    "Für neue Systeme ist beispielsweise Argon2id geeignet. Wähle Parameter anhand der Sicherheitsvorgaben und Messungen. Ein Salt ist ein individueller Zufallswert pro Passwort. Er verhindert identische gespeicherte Werte bei gleichen Passwörtern."
  ],
  [
    "h",
    "Maßnahmen lösen unterschiedliche Probleme"
  ],
  [
    "table",
    [
      "Problem",
      "Gezielte Maßnahme",
      "Allein nicht ausreichend"
    ],
    [
      [
        "SQL-Injection",
        "Parameter für Werte; erlaubte Liste für dynamische Bezeichner",
        "HTTPS"
      ],
      [
        "XSS",
        "Kontextgerechte Ausgabe; textContent für reinen Text",
        "Nur Eingaben prüfen"
      ],
      [
        "CSRF bei Cookie-Anmeldung",
        "Token und geeignete Cookie-Regeln",
        "HttpOnly allein"
      ],
      [
        "Fremde Aufträge lesen",
        "Objektberechtigung serverseitig prüfen",
        "Schwer erratbare IDs"
      ],
      [
        "Passwortdatenbank gestohlen",
        "Langsames Passwortverfahren mit Salt",
        "Allgemeiner schneller Hash"
      ],
      [
        "Gestohlene Sitzung",
        "Geschützte Cookies, Ablauf und Widerruf",
        "Passwort-Hashing allein"
      ]
    ]
  ],
  [
    "h",
    "XSS ohne unsichere HTML-Erzeugung vermeiden"
  ],
  [
    "code",
    "javascript",
    "// Für reinen Text:\nkommentar.textContent = benutzereingabe;\n\n// Wenn HTML fachlich erforderlich ist:\n// Geprüften HTML-Sanitizer mit enger Erlaubnisliste verwenden.\n// Kein eigenes Entfernen einzelner Script-Tags bauen."
  ],
  [
    "p",
    "HttpOnly erschwert das Auslesen eines Cookies durch JavaScript. XSS kann trotzdem Aktionen im Browser des Opfers auslösen. Eine Content Security Policy ist eine zusätzliche Schutzschicht. Sie ersetzt sichere Ausgabe nicht."
  ],
  [
    "h",
    "Fehlende Objektberechtigung erkennen"
  ],
  [
    "qa",
    "GET /api/auftraege/731 liefert einer angemeldeten Person einen fremden Auftrag. Die Anmeldung ist gültig. **Erläutern** Sie den Fehler und zwei Schutzmaßnahmen.",
    [
      "Authentifizierung bestätigt nur die Identität. Die Objektberechtigung fehlt. 1 Punkt.",
      "Der Server prüft bei jeder Anfrage Auftragseigentum und zulässige Rollen. 1 Punkt.",
      "Tests verwenden mindestens zwei Konten und prüfen fremde IDs sowie Schreibzugriffe. 1 Punkt."
    ],
    3
  ],
  [
    "qa",
    "**Ordnen** Sie zu: Prepared Statement, Passwort-Hashing, TLS und CSRF-Token. Nennen Sie je das hauptsächliche Schutzziel.",
    [
      "Prepared Statement: SQL-Wertparameter werden nicht als SQL-Code ausgeführt.",
      "Passwort-Hashing: Passwortoffenlegung und Offline-Raten nach Datenbankdiebstahl erschweren.",
      "TLS: Vertraulichkeit und Integrität des Transports sowie Gegenstellenprüfung.",
      "CSRF-Token: Ungewollte zustandsändernde Browseranfragen abwehren.",
      "Je Zuordnung 1 Punkt."
    ],
    4
  ],
  [
    "quiz",
    [
      {
        "q": "Was leistet HttpOnly allein nicht?",
        "o": [
          "Alle Auswirkungen einer XSS-Lücke verhindern",
          "JavaScript-Zugriff auf das markierte Cookie einschränken",
          "Eine Cookie-Eigenschaft festlegen",
          "Das direkte Cookie-Auslesen per document.cookie verhindern"
        ],
        "a": 0,
        "e": "Schadcode kann weiterhin erlaubte Anfragen aus dem Opferbrowser auslösen."
      }
    ]
  ],
  [
    "note",
    "Vertiefung: OWASP Password Storage Cheat Sheet. Dort werden Passwortverfahren, Salt und Kostenparameter erklärt."
  ],
  [
    "see",
    [
      "ps-dbzugriff",
      "ps-testentwurf",
      "infra-http",
      "infra-webauth"
    ]
  ]
]);
