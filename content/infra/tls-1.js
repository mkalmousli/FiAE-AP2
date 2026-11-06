AP2.page('infra-tls', {
  b: 'infra', g: 'IT-Sicherheit', t: 'TLS-Handshake und mTLS',
  d: '**TLS** (Transport Layer Security) sichert die Verbindung zwischen Client und Server: **Vertraulichkeit** (Verschlüsselung), **Integrität** (Manipulation wird erkannt) und **Authentizität** (der Server beweist per Zertifikat seine Identität). Im **Handshake** einigen sich beide auf Verfahren, authentifizieren den Server und erzeugen gemeinsame **Sitzungsschlüssel**. Bei **mTLS** (mutual TLS) authentifiziert sich **auch der Client** mit einem Zertifikat.',
  m: '**Handshake in Kurzform: Hallo (Verfahren) - Zertifikat - Schlüssel vereinbaren - Fertig - verschlüsselte Daten.** TLS = **asymmetrisch zum Start, symmetrisch für die Daten**. **mTLS = beide Seiten zeigen ein Zertifikat.** HTTPS = HTTP über TLS (Port 443). SSL ist veraltet.',
  cheat: [
    ['TLS erreicht', ['**Vertraulichkeit** (symmetrisch, AES)', '**Integrität** (MAC/AEAD)', '**Server-Authentizität** (Zertifikat)', 'Optional Client-Authentizität (mTLS)']],
    ['Handshake (Schritte)', ['**ClientHello:** Versionen, Cipher Suites, Zufallswert', '**ServerHello + Zertifikat**', '**Schlüsselaustausch** (ECDHE), Zertifikat prüfen', '**Finished:** Sitzungsschlüssel stehen', 'Danach: **verschlüsselte Anwendungsdaten**']],
    ['Versionen', ['**TLS 1.3** (2018): schneller (1 Round-Trip), nur sichere Verfahren', '**TLS 1.2**: noch verbreitet', 'TLS 1.0/1.1 und **SSL**: veraltet, abschalten']],
    ['mTLS', ['Server fordert **Client-Zertifikat**', 'Beide Seiten authentifiziert', 'Einsatz: Microservices, APIs, Zero Trust, Geräte']],
  ],
  blocks: [
    ['h', 'Was leistet TLS?'],
    ['p', 'Ohne Schutz kann jeder, der im Netz mithört (WLAN im Café, Provider), Daten lesen oder verändern. **TLS** (Nachfolger von **SSL**) legt sich als **Schutzschicht** zwischen die Transportschicht (TCP) und das Anwendungsprotokoll (HTTP, SMTP, IMAP). Das bekannteste Beispiel ist **HTTPS**. Zur Sicherheit kombiniert TLS verschiedene Verfahren:'],
    ['table', ['Ziel', 'Technik in TLS'], [['**Vertraulichkeit**', 'Symmetrische Verschlüsselung der Daten (AES-GCM, ChaCha20) mit einem Sitzungsschlüssel'], ['**Integrität**', 'Prüfsumme/Authentifizierung jeder Nachricht (MAC oder AEAD wie GCM). Veränderungen werden erkannt'], ['**Authentizität des Servers**', 'Serverzertifikat (X.509) und Signatur. Der Client prüft die Zertifikatskette und den Hostnamen'], ['**Sicherer Schlüsselaustausch**', '**Diffie-Hellman (ECDHE)**: Beide berechnen gemeinsam einen Schlüssel, ohne ihn zu übertragen. Ergibt **Perfect Forward Secrecy**']]],
    ['h', 'Der TLS-Handshake (TLS 1.2 vereinfacht)'],
    ['seq', {w: 780, actors: ['Client (Browser)', 'Server'], cap: 'TLS-Handshake: Danach sind alle Daten mit dem gemeinsamen Sitzungsschlüssel verschlüsselt.', steps: [
      [0, 1, 'ClientHello (TLS-Version, Cipher Suites, Zufallszahl)', 's'], [1, 0, 'ServerHello (gewählte Version und Cipher Suite, Zufallszahl)', 'r'], [1, 0, 'Zertifikat (Public Key, Kette)', 'r'], [1, 0, 'ServerKeyExchange (ECDHE-Parameter, signiert)', 'r'], [0, 0, 'Zertifikatskette, Hostname, Gültigkeit prüfen', 's'],
      [0, 1, 'ClientKeyExchange (ECDHE-Parameter)', 's'], ['note', 0, 'beide berechnen den Sitzungsschlüssel'], [0, 1, 'ChangeCipherSpec + Finished (verschlüsselt)', 's'], [1, 0, 'ChangeCipherSpec + Finished (verschlüsselt)', 'r'], ['sep', 'Ab jetzt: Anwendungsdaten symmetrisch verschlüsselt (zum Beispiel HTTP-Anfragen)'], [0, 1, 'GET /index.html (verschlüsselt)', 's'],
    ]}],
    ['steps', ['**ClientHello:** Der Client nennt unterstützte TLS-Versionen und **Cipher Suites** (Kombination aus Schlüsselaustausch, Verschlüsselung, Hash) und sendet eine Zufallszahl.', '**ServerHello:** Der Server wählt Version und Cipher Suite und schickt seine Zufallszahl und sein **Zertifikat**.', '**Authentifizierung:** Der Client prüft das Zertifikat (Kette, Gültigkeit, Hostname, Sperrung).', '**Schlüsselaustausch:** Beide tauschen ECDHE-Parameter und berechnen daraus **denselben geheimen Sitzungsschlüssel**. Dieser wurde nie übertragen.', '**Finished:** Beide bestätigen mit einem ersten verschlüsselten Datenblock, dass der Handshake nicht manipuliert wurde.', '**Daten:** Die Kommunikation läuft mit dem schnellen **symmetrischen** Sitzungsschlüssel.']],
  ],
});


AP2.add('infra-tls', [
  [
    "h",
    "Zertifikat und private Schlüssel unterscheiden"
  ],
  [
    "table",
    [
      "Begriff",
      "Funktion",
      "Geheim?"
    ],
    [
      [
        "Zertifikat",
        "Bindet Identitätsangaben an einen öffentlichen Schlüssel",
        "Normalerweise nein"
      ],
      [
        "Privater Zertifikatsschlüssel",
        "Belegt den Besitz des Schlüssels durch Signatur",
        "Ja"
      ],
      [
        "Öffentlicher ECDHE-Anteil",
        "Teil der gemeinsamen Schlüsselvereinbarung",
        "Nein"
      ],
      [
        "Abgeleitete Verkehrsschlüssel",
        "Schützen die übertragenen Daten",
        "Ja"
      ]
    ]
  ],
  [
    "p",
    "Die Sitzung verwendet tatsächlich mehrere abgeleitete Schlüssel. „Sitzungsschlüssel“ ist eine vereinfachte Sammelbezeichnung. Ein Zertifikat allein beweist noch nicht den Besitz des privaten Schlüssels. Die Gegenstelle muss diesen Besitz im Handshake nachweisen."
  ],
  [
    "h",
    "Zertifikatsfehler systematisch prüfen"
  ],
  [
    "steps",
    [
      "Stimmt der angefragte Hostname mit dem Zertifikat überein?",
      "Ist die Gültigkeitszeit passend und die Systemzeit korrekt?",
      "Ist die Vertrauenskette vollständig und vertrauenswürdig?",
      "Ist ein erneuertes Zertifikat am richtigen TLS-Endpunkt installiert?",
      "Prüft der Client weitere Vorgaben wie Sperrstatus oder Verwendungszweck?"
    ]
  ],
  [
    "warn",
    "Zertifikatsprüfungen nicht dauerhaft abschalten. Das beseitigt die Warnung, aber auch eine wichtige Identitätskontrolle. Ein gültiges Zertifikat beweist keine fehlerfreie oder ehrliche Anwendung."
  ],
  [
    "qa",
    "Ein Browser akzeptiert ein Zertifikat für shop.beispiel.test nicht beim Aufruf von api.beispiel.test. **Erläutern** Sie die Ursache und zwei geeignete Maßnahmen.",
    [
      "Der angefragte Hostname ist möglicherweise nicht vom Zertifikat abgedeckt. 1 Punkt.",
      "Zertifikat mit passendem Subject Alternative Name ausstellen und am richtigen Endpunkt installieren. 1 Punkt.",
      "Automatisierte Erneuerung und Prüfungen für alle benötigten Namen einrichten. 1 Punkt."
    ],
    3
  ],
  [
    "see",
    [
      "infra-dns",
      "infra-http",
      "infra-monitoring"
    ]
  ]
]);
