AP2.page('infra-cia', {
  b: 'infra', g: 'IT-Sicherheit', t: 'Schutzziele: CIA-Triade',
  d: 'Die **CIA-Triade** beschreibt die drei Grundziele der Informationssicherheit: **Vertraulichkeit** (Confidentiality: nur Berechtigte lesen), **Integrität** (Integrity: Daten sind korrekt und unverändert) und **Verfügbarkeit** (Availability: Daten sind nutzbar, wenn man sie braucht).',
  m: '**CIA = Confidentiality (geheim), Integrity (unverfälscht), Availability (erreichbar).** Auf Deutsch **V-I-V**: **V**ertraulichkeit, **I**ntegrität, **V**erfügbarkeit. Ergänzend: Authentizität, Verbindlichkeit (Nichtabstreitbarkeit).',
  cheat: [
    ['Vertraulichkeit', ['Nur **Berechtigte** erhalten Zugriff', 'Maßnahmen: **Verschlüsselung**, Zugriffsrechte, Authentifizierung (MFA)', 'Verletzung: Datenleck, Abhören, Diebstahl']],
    ['Integrität', ['Daten sind **vollständig und unverändert**', 'Maßnahmen: **Hash**, digitale Signatur, Prüfsummen, Versionierung, Berechtigungen', 'Verletzung: Manipulation, Fehler, Malware']],
    ['Verfügbarkeit', ['System und Daten sind **bei Bedarf nutzbar**', 'Maßnahmen: **Redundanz, Backup, USV, Cluster, DDoS-Schutz**', 'Verletzung: Ausfall, DoS, Ransomware']],
    ['Weitere Schutzziele', ['**Authentizität:** Echtheit der Identität/Quelle', '**Verbindlichkeit / Nichtabstreitbarkeit:** Handlung kann nicht geleugnet werden (Signatur)', '**Zurechenbarkeit (Accountability)**']],
  ],
  blocks: [
    ['h', 'Die drei Schutzziele'],
    ['diagram', {w: 720, h: 320, cap: 'Die CIA-Triade: Alle drei Ziele müssen gemeinsam betrachtet werden.', nodes: [
      {id: 'c', x: 360, y: 40, t: ['Vertraulichkeit', 'Confidentiality'], k: 'round', s: 'accent', w: 200, h: 56}, {id: 'i', x: 130, y: 270, t: ['Integrität', 'Integrity'], k: 'round', s: 'accent', w: 200, h: 56}, {id: 'a', x: 590, y: 270, t: ['Verfügbarkeit', 'Availability'], k: 'round', s: 'accent', w: 200, h: 56},
      {id: 'm', x: 360, y: 190, t: ['Informations-', 'sicherheit'], k: 'oval', s: 'solid', w: 170, h: 66},
    ], edges: [{a: 'c', b: 'i', ea: 'none'}, {a: 'i', b: 'a', ea: 'none'}, {a: 'a', b: 'c', ea: 'none'}, {a: 'm', b: 'c', ea: 'none', k: 'dash'}, {a: 'm', b: 'i', ea: 'none', k: 'dash'}, {a: 'm', b: 'a', ea: 'none', k: 'dash'}]}],
    ['table', ['Schutzziel', 'Frage', 'Bedrohung (Beispiel)', 'Schutzmaßnahmen (Beispiel)'], [
      ['**Vertraulichkeit**', 'Wer darf lesen?', 'Passwortdiebstahl, Abhören im WLAN, Datenleck, Social Engineering', 'Verschlüsselung (TLS, BitLocker), Zugriffsrechte, MFA, Need-to-know'],
      ['**Integrität**', 'Sind die Daten unverändert und korrekt?', 'Manipulation einer Überweisung, Malware, Man-in-the-Middle, Bedienfehler', 'Hashwerte und Signaturen, Berechtigungen, Logging, Versionierung, Vier-Augen-Prinzip'],
      ['**Verfügbarkeit**', 'Kann man jederzeit zugreifen?', 'Hardwareausfall, DDoS-Angriff, Ransomware, Stromausfall', 'Redundanz (RAID, Cluster), Backup, USV, DDoS-Schutz, Monitoring'],
    ]],
    ['h', 'Ein Beispiel für jedes Ziel'],
    ['list', ['**Vertraulichkeit:** Gehaltslisten der Personalabteilung dürfen nur die Personalabteilung sehen. Schutz: Zugriffsrechte und Verschlüsselung.', '**Integrität:** Eine Rechnung darf auf dem Weg zum Kunden nicht verändert werden (zum Beispiel die Bankverbindung). Schutz: digitale Signatur.', '**Verfügbarkeit:** Der Online-Shop muss auch am Black Friday erreichbar sein. Schutz: Lastverteilung, Redundanz, DDoS-Schutz.']],
    ['note', 'Ziele können **im Konflikt** stehen. Beispiel: Maximale Vertraulichkeit (viele Sicherheitsstufen) kann die Verfügbarkeit einschränken (Zugriff dauert länger). Man muss nach dem **Schutzbedarf** der Daten abwägen.'],
    ['h', 'Weitere Begriffe'],
    ['kv', [
      ['Authentizität', 'Die Identität eines Kommunikationspartners oder die Herkunft von Daten ist **echt**. Maßnahmen: Zertifikate, Signaturen, MFA.'],
      ['Verbindlichkeit / Nichtabstreitbarkeit', 'Niemand kann später leugnen, eine Handlung ausgeführt zu haben. Maßnahme: qualifizierte digitale Signatur, Protokollierung.'],
      ['Bedrohung', 'Ein mögliches Ereignis, das Schaden verursachen kann (zum Beispiel Hacker, Feuer).'],
      ['Schwachstelle', 'Eine Schwäche im System, die eine Bedrohung ausnutzen kann (zum Beispiel ungepatchte Software).'],
      ['Risiko', '**Eintrittswahrscheinlichkeit mal Schadenshöhe.** Risiken werden bewertet und behandelt.'],
    ]],
  ],
});
