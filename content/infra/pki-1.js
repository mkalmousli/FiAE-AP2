AP2.page('infra-pki', {
  b: 'infra', g: 'IT-Sicherheit', t: 'PKI: Zertifikate, Zertifikatskette, CSR und Sperrung',
  d: 'Eine **PKI** (Public Key Infrastructure) ist die Infrastruktur, die **öffentliche Schlüssel mit Identitäten verknüpft**. Eine **Zertifizierungsstelle (CA)** bestätigt per **digitalem Zertifikat (X.509)**, dass ein öffentlicher Schlüssel zu einer bestimmten Person, einem Server oder einer Organisation gehört. Man vertraut der **Zertifikatskette** bis zu einer **Root-CA**. Ungültige Zertifikate werden per **CRL** oder **OCSP** gesperrt.',
  m: '**Zertifikat = digitaler Ausweis (Schlüssel + Identität + Unterschrift der CA).** Vertrauen entsteht über die **Kette: Endzertifikat, Zwischen-CA, Root-CA** (Vertrauensanker im Betriebssystem). **CSR = Antrag auf Zertifikat** (enthält öffentlichen Schlüssel, privater bleibt beim Antragsteller!). **Sperren: CRL (Liste) oder OCSP (Online-Abfrage).**',
  cheat: [
    ['Zertifikat (X.509) enthält', ['**Subject** (Inhaber, Domain)', '**Öffentlicher Schlüssel** des Inhabers', '**Issuer** (Aussteller, CA)', '**Gültigkeit** (von, bis), Seriennummer', '**Signatur** der CA, Erweiterungen (SAN)']],
    ['Kette', ['**Root-CA** (selbstsigniert, Vertrauensanker)', '**Intermediate-CA** (Zwischenzertifikat)', '**End-Entity** (Server-Zertifikat)', 'Jedes Zertifikat ist von der nächsthöheren CA **signiert**']],
    ['CSR-Ablauf', ['1. Schlüsselpaar erzeugen (privat bleibt geheim)', '2. **CSR** mit öffentlichem Schlüssel und Namen', '3. CA prüft Identität und **signiert**', '4. Zertifikat installieren']],
    ['Sperrung', ['**CRL:** Liste gesperrter Seriennummern', '**OCSP:** Online-Statusabfrage (**Stapling**)', 'Gründe: privater Schlüssel kompromittiert, Betrieb eingestellt']],
  ],
  blocks: [
    ['h', 'Das Problem: Wem gehört dieser öffentliche Schlüssel?'],
    ['p', 'Bei asymmetrischer Verschlüsselung muss ich Bobs **öffentlichen Schlüssel** kennen. Aber **woher weiß ich, dass er wirklich Bob gehört** und nicht einem Angreifer, der sich dazwischenschaltet (Man-in-the-Middle)? Die Lösung: Eine **vertrauenswürdige dritte Stelle** (CA) **unterschreibt** (signiert) die Zuordnung "Schlüssel X gehört zu bank.de". Diese Unterschrift ist das **Zertifikat**.'],
    ['h', 'Aufbau eines Zertifikats (X.509)'],
    ['table', ['Feld', 'Inhalt', 'Beispiel'], [
      ['Subject (Inhaber)', 'Wem gehört das Zertifikat?', 'CN=www.example.org, O=Beispiel GmbH'],
      ['Subject Alternative Name (SAN)', 'Weitere Namen, für die das Zertifikat gilt', 'www.example.org, example.org, shop.example.org'],
      ['Öffentlicher Schlüssel', 'Der Public Key des Inhabers', 'RSA 2048 oder ECC P-256'],
      ['Issuer (Aussteller)', 'Welche CA hat es signiert?', 'CN=Beispiel Intermediate CA'],
      ['Gültigkeit', 'Von und bis (Not Before / Not After)', '2026-01-10 bis 2026-04-10'],
      ['Seriennummer', 'Eindeutige Nummer bei der CA (für Sperrlisten)', '04:5A:...'],
      ['Signatur', 'Signatur der CA über all diese Daten', 'sha256WithRSAEncryption'],
      ['Erweiterungen', 'Zweck (Key Usage), CRL/OCSP-Adressen, Basic Constraints', 'Server Authentication'],
    ]],
    ['h', 'Zertifikatskette (Chain of Trust)'],
    ['p', 'Kein Browser kennt jede Webseite. Er kennt aber ein paar hundert **Root-CAs**, denen er **von vornherein vertraut** (**Trust Store** im Betriebssystem oder Browser). Die Root-CA signiert **Zwischen-CAs (Intermediate)**, diese signieren die **Endzertifikate**. So bleibt der besonders wertvolle Root-Schlüssel meist **offline** und geschützt.'],
    ['diagram', {w: 760, h: 300, keep: 600, cap: 'Die Prüfung der Kette: Jede Signatur wird mit dem öffentlichen Schlüssel der nächsthöheren Stufe geprüft, bis ein bekannter Root erreicht ist.', nodes: [
      {id: 'root', k: 'round', x: 380, y: 40, t: ['Root-CA (selbstsigniert)', 'im Trust Store des Browsers'], w: 280, h: 56, s: 'solid'}, {id: 'int', k: 'round', x: 380, y: 140, t: ['Intermediate-CA', 'signiert von Root-CA'], w: 280, h: 56, s: 'accent'}, {id: 'end', k: 'round', x: 380, y: 240, t: ['Server-Zertifikat www.example.org', 'signiert von Intermediate-CA'], w: 320, h: 56, s: 'ok'},
      {id: 'v', k: 'text', x: 650, y: 140, t: ['Browser prüft', 'von unten nach oben'], fs: 12, tc: 'text2'},
    ], edges: [{a: 'root', b: 'int', t: 'signiert'}, {a: 'int', b: 'end', t: 'signiert'}]}],
    ['steps', ['Der Server schickt sein **Zertifikat** (und die Zwischenzertifikate).', 'Der Browser prüft die **Signatur** des Serverzertifikats mit dem öffentlichen Schlüssel der Intermediate-CA.', 'Er prüft die Signatur des Intermediate-Zertifikats mit dem Schlüssel der Root-CA.', 'Die **Root-CA** ist im **Trust Store** enthalten: Vertrauen hergestellt.', 'Außerdem prüft er: **Gültigkeitszeitraum**, passt der **Hostname** (CN/SAN)? Ist das Zertifikat **gesperrt**? Ist der **Verwendungszweck** korrekt?']],
  ],
});
