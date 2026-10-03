AP2.page('infra-krypto', {
  b: 'infra', g: 'IT-Sicherheit', t: 'Verschlüsselung: symmetrisch, asymmetrisch, Hash, BitLocker und TPM',
  d: '**Symmetrische Verschlüsselung** nutzt **einen** geheimen Schlüssel zum Ver- und Entschlüsseln (schnell, Beispiel **AES**). **Asymmetrische Verschlüsselung** nutzt ein **Schlüsselpaar** aus **öffentlichem** und **privatem** Schlüssel (langsamer, Beispiel **RSA**). Ein **Hash** ist ein Fingerabdruck von Daten (Einwegfunktion, Beispiel **SHA-256**). In der Praxis kombiniert man alles (**hybrid**).',
  m: '**Symmetrisch = ein Schlüssel für beide (schnell, aber Schlüsselaustausch-Problem). Asymmetrisch = Schlüsselpaar: mit dem öffentlichen Schlüssel des Empfängers verschlüsseln, nur sein privater Schlüssel entschlüsselt. Signatur = umgekehrt: mit eigenem privatem Schlüssel signieren, jeder prüft mit dem öffentlichen.** Hash: nicht umkehrbar.',
  cheat: [
    ['Symmetrisch', ['**Ein** gemeinsamer Schlüssel', 'Sehr **schnell**, für große Datenmengen', 'Problem: **Schlüsselaustausch** und viele Schlüssel (n(n-1)/2)', '**AES** (128/192/256 Bit), ChaCha20, (veraltet: DES, 3DES)']],
    ['Asymmetrisch', ['**Schlüsselpaar**: öffentlich + privat', 'Langsam, für Schlüsselaustausch und Signaturen', '**RSA** (mind. 2048 Bit), **ECC** (kürzere Schlüssel), Diffie-Hellman', 'Löst das Schlüsselaustausch-Problem']],
    ['Hash', ['**Einweg**, feste Länge, Fingerabdruck', 'Kleinste Änderung = völlig anderer Hash', '**SHA-256**, SHA-3 (Nicht: MD5, SHA-1)', 'Für Integrität, Passwort-Hashing (bcrypt, Argon2 + Salt)']],
    ['BitLocker und TPM', ['**BitLocker:** Laufwerksverschlüsselung (Windows), AES', '**TPM:** Chip, speichert Schlüssel, prüft Systemzustand', 'Entsperren per TPM, PIN, USB-Schlüssel', '**Recovery-Key** sicher aufbewahren!']],
  ],
  blocks: [
    ['h', 'Wozu Verschlüsselung?'],
    ['p', 'Verschlüsselung macht Daten für Unbefugte **unlesbar**. Aus dem **Klartext** wird mit einem **Algorithmus** und einem **Schlüssel** ein **Geheimtext**. Nur wer den passenden Schlüssel hat, kann zurückrechnen. Sie schützt **Vertraulichkeit** (und mit Zusatzverfahren auch **Integrität** und **Authentizität**). Man unterscheidet **Daten bei der Übertragung** (in transit, zum Beispiel TLS), **gespeicherte Daten** (at rest, zum Beispiel BitLocker) und **Daten in Verarbeitung**.'],
    ['h', 'Symmetrische Verschlüsselung'],
    ['diagram', {w: 760, h: 170, keep: 600, cap: 'Symmetrisch: Sender und Empfänger benutzen denselben Schlüssel.', nodes: [
      {id: 'k', k: 'round', x: 380, y: 30, t: 'gemeinsamer geheimer Schlüssel', w: 230, h: 38, s: 'ok'}, {id: 'a', k: 'round', x: 90, y: 120, t: ['Klartext', '"Hallo"'], w: 110, h: 48}, {id: 'e', k: 'box', x: 270, y: 120, t: 'verschlüsseln', w: 110, h: 40, s: 'accent'}, {id: 'g', k: 'round', x: 440, y: 120, t: ['Geheimtext', '"x7#Kq"'], w: 120, h: 48, s: 'soft'}, {id: 'd', k: 'box', x: 600, y: 120, t: 'entschlüsseln', w: 110, h: 40, s: 'accent'}, {id: 'b', k: 'round', x: 720, y: 120, t: ['Klartext', '"Hallo"'], w: 90, h: 48},
    ], edges: [{a: 'a', b: 'e'}, {a: 'e', b: 'g'}, {a: 'g', b: 'd'}, {a: 'd', b: 'b'}, {a: 'k', b: 'e', k: 'dash', s: 'ok'}, {a: 'k', b: 'd', k: 'dash', s: 'ok'}]}],
    ['kv', [
      ['AES (Advanced Encryption Standard)', 'Standard seit 2001. **Blockchiffre** mit 128 Bit Blocklänge, Schlüssel **128, 192 oder 256 Bit**. Sehr sicher und schnell (oft hardwarebeschleunigt).'],
      ['Betriebsmodi', 'Legen fest, wie Blöcke verkettet werden. **ECB ist unsicher** (gleiche Blöcke ergeben gleichen Geheimtext, Muster bleiben sichtbar). Sicher: **CBC**, **CTR**, **GCM** (zusätzlich Integritätsschutz, "authenticated encryption").'],
      ['Veraltet', '**DES** (56 Bit, zu kurz), **3DES**, RC4. Nicht mehr verwenden.'],
    ]],
    ['warn', 'Das **Schlüsselaustausch-Problem**: Wie bekommt der Empfänger den geheimen Schlüssel, ohne dass ihn jemand abfängt? Außerdem braucht man bei n Teilnehmern **n(n-1)/2 verschiedene Schlüssel** (10 Teilnehmer = 45 Schlüssel). Hier hilft die asymmetrische Verschlüsselung.'],
    ['h', 'Asymmetrische Verschlüsselung'],
    ['p', 'Jeder Teilnehmer besitzt ein **Schlüsselpaar**: einen **öffentlichen Schlüssel (Public Key)**, den **jeder** kennen darf, und einen **privaten Schlüssel (Private Key)**, der **geheim** bleibt. Was mit dem einen verschlüsselt wurde, lässt sich **nur mit dem anderen** entschlüsseln. Man kann den privaten Schlüssel nicht aus dem öffentlichen berechnen.'],
    ['diagram', {w: 760, h: 200, keep: 600, cap: 'Verschlüsseln an Bob: Alice nutzt Bobs öffentlichen Schlüssel. Nur Bobs privater Schlüssel entschlüsselt.', nodes: [
      {id: 'al', k: 'round', x: 80, y: 120, t: ['Alice', 'Klartext'], w: 110, h: 50}, {id: 'e', k: 'box', x: 250, y: 120, t: 'verschlüsseln', w: 110, h: 40, s: 'accent'}, {id: 'g', k: 'round', x: 420, y: 120, t: 'Geheimtext', w: 110, h: 44, s: 'soft'}, {id: 'd', k: 'box', x: 570, y: 120, t: 'entschlüsseln', w: 110, h: 40, s: 'accent'}, {id: 'bo', k: 'round', x: 710, y: 120, t: ['Bob', 'Klartext'], w: 90, h: 50},
      {id: 'pub', k: 'round', x: 250, y: 36, t: 'Bobs öffentlicher Schlüssel', w: 200, h: 36, s: 'ok'}, {id: 'priv', k: 'round', x: 570, y: 36, t: 'Bobs privater Schlüssel', w: 190, h: 36, s: 'bad'},
    ], edges: [{a: 'al', b: 'e'}, {a: 'e', b: 'g'}, {a: 'g', b: 'd'}, {a: 'd', b: 'bo'}, {a: 'pub', b: 'e', k: 'dash'}, {a: 'priv', b: 'd', k: 'dash'}]}],
    ['table', ['Anwendung', 'Wer nutzt welchen Schlüssel?', 'Ziel'], [
      ['**Verschlüsseln**', 'Sender: **öffentlicher** Schlüssel des Empfängers. Empfänger entschlüsselt mit seinem **privaten**.', 'Vertraulichkeit'],
      ['**Digitale Signatur**', 'Sender: signiert mit seinem **privaten** Schlüssel. Empfänger prüft mit dem **öffentlichen** Schlüssel des Senders.', 'Integrität, Authentizität, Nichtabstreitbarkeit'],
    ]],
  ],
});
