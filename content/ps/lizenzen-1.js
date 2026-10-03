AP2.page('ps-lizenzen', {
  b: 'ps', g: 'Recht und Datenschutz', t: 'Urheberrecht und Softwarelizenzen',
  d: '**Software ist urheberrechtlich geschützt** (UrhG). Der **Urheber** (Entwickler) hat Rechte am Werk. Wer Software nutzt, braucht ein **Nutzungsrecht**, das in einer **Lizenz** geregelt ist. **Open-Source-Lizenzen** erlauben Nutzung, Änderung und Weitergabe unter Bedingungen. **Copyleft-Lizenzen** (zum Beispiel GPL) verlangen, dass Abwandlungen unter derselben Lizenz stehen.',
  m: '**Permissiv** (MIT, BSD, Apache): "Fast alles erlaubt, Namen nennen." **Copyleft** (GPL): "Teile, was du bekommst, unter gleichen Bedingungen." Eselsbrücke: **Copy-left = Gegenteil von Copy-right**, weil Weitergabe **erzwungen** statt verboten wird.',
  cheat: [
    ['Urheberrecht (UrhG)', ['Entsteht **automatisch** mit der Schöpfung', 'Urheber = **natürliche Person**', '**Urheberpersönlichkeitsrecht** ist nicht übertragbar', 'Schutz bis **70 Jahre nach Tod**', 'Angestellte: Nutzungsrechte gehen an den **Arbeitgeber** (§ 69b)']],
    ['Permissive Lizenzen', ['**MIT, BSD, Apache 2.0**', 'Kommerziell nutzbar, Code darf geschlossen bleiben', 'Pflicht: Lizenztext und Copyright-Hinweis beilegen']],
    ['Copyleft', ['**GPL (stark):** abgeleitete Werke müssen auch unter GPL', '**LGPL, MPL (schwach):** nur die Bibliothek selbst', '**AGPL:** auch bei Nutzung über das Netz (SaaS)']],
    ['Kommerziell / Sonstige', ['**Proprietär:** Quellcode geschlossen', '**Freeware:** kostenlos, nicht frei', '**Shareware:** testen, dann kaufen', '**Public Domain / CC0:** keine Rechte vorbehalten']],
  ],
  blocks: [
    ['h', 'Urheberrecht an Software'],
    ['p', 'Software gilt als **Sprachwerk** und ist nach dem **Urheberrechtsgesetz (UrhG)** geschützt (§§ 69a ff.). Der Schutz entsteht **automatisch**, sobald der Code geschrieben ist. Eine Anmeldung oder ein Copyright-Zeichen sind nicht nötig. Geschützt ist der **Quellcode**, nicht die bloße Idee oder der Algorithmus als solcher.'],
    ['kv', [
      ['Urheber', 'Die Person, die das Werk geschaffen hat. Immer eine **natürliche Person**, nie eine Firma.'],
      ['Urheberpersönlichkeitsrecht', 'Recht auf Namensnennung und Schutz vor Entstellung. Kann **nicht übertragen** werden (nur vererbt).'],
      ['Verwertungs- und Nutzungsrechte', 'Recht, das Werk zu vervielfältigen, zu verbreiten, zu ändern. Diese Nutzungsrechte können **eingeräumt** (lizenziert) werden: einfach (nicht exklusiv) oder ausschließlich (exklusiv).'],
      ['Arbeitnehmer-Software (§ 69b UrhG)', 'Programme, die ein Angestellter **in Erfüllung seiner Aufgaben** schreibt, darf der **Arbeitgeber** nutzen. Die Verwertungsrechte stehen dem Arbeitgeber zu.'],
      ['Schutzdauer', '70 Jahre nach dem Tod des Urhebers.'],
      ['Erlaubte Handlungen (§ 69d)', 'Der rechtmäßige Nutzer darf Software bestimmungsgemäß nutzen, eine Sicherungskopie anfertigen und das Programm beobachten und testen.'],
    ]],
    ['h', 'Softwarelizenzen im Überblick'],
    ['table', ['Lizenzart', 'Quellcode', 'Kosten', 'Weitergabe / Änderung', 'Beispiel'], [
      ['Proprietär (kommerziell)', 'geschlossen', 'meist kostenpflichtig', 'nicht erlaubt', 'Microsoft Office, Adobe Photoshop'],
      ['Freeware', 'geschlossen', 'kostenlos', 'meist nicht erlaubt', 'Adobe Acrobat Reader, 7-Zip (Freeware-Beispiele)'],
      ['Shareware', 'geschlossen', 'Testphase, dann bezahlen', 'Weitergabe der Testversion oft erlaubt', 'WinRAR'],
      ['Open Source', 'offen', 'meist kostenlos', 'erlaubt unter Bedingungen der Lizenz', 'Linux, Firefox, VLC'],
      ['Public Domain / CC0', 'offen', 'frei', 'uneingeschränkt', 'SQLite'],
    ]],
  ],
});
