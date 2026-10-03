AP2.page('wiso-unternehmen', {
  b: 'wiso', g: 'Unternehmen und Steuern', t: 'Unternehmensformen (Rechtsformen)',
  d: 'Die **Rechtsform** bestimmt, **wer haftet**, **wer entscheidet**, **wie viel Kapital** nötig ist und **wie Gewinne versteuert** werden. **Einzelunternehmen**, **GbR**, **OHG** und **KG** sind **Personengesellschaften** (Gesellschafter **haften persönlich**, mit Ausnahme der Kommanditisten). **GmbH**, **UG** und **AG** sind **Kapitalgesellschaften** (**Haftung nur mit dem Gesellschaftsvermögen**, eigene Rechtspersönlichkeit).',
  m: '**Personengesellschaft = Person haftet (unbeschränkt, mit Privatvermögen). Kapitalgesellschaft = Kapital haftet (beschränkt, nur Gesellschaftsvermögen).** GmbH: **25.000 Euro** Stammkapital, AG: **50.000 Euro** Grundkapital, UG: ab **1 Euro**. KG: **Komplementär** haftet voll, **Kommanditist** nur mit der Einlage.',
  cheat: [
    ['Personengesellschaften', ['**e. K.** (Einzelunternehmen): 1 Person, voll haftend', '**GbR:** 2+ Gesellschafter, kein Mindestkapital, voll haftend', '**OHG:** Kaufleute, alle voll haftend (solidarisch), Handelsregister', '**KG:** Komplementär (voll) + Kommanditist (Einlage)']],
    ['Kapitalgesellschaften', ['**GmbH:** Stammkapital **25.000 Euro** (mind. 12.500 bei Gründung), Geschäftsführer', '**UG (haftungsbeschränkt):** ab **1 Euro**, Rücklage 25 % des Gewinns', '**AG:** Grundkapital **50.000 Euro**, Vorstand, Aufsichtsrat, Hauptversammlung', 'Haftung nur mit **Gesellschaftsvermögen**']],
    ['Mischformen', ['**GmbH & Co. KG:** GmbH ist Komplementär (Haftung beschränkt)', '**eG** (Genossenschaft): Mitglieder, ein Mitglied eine Stimme', '**KGaA, SE** (Europäische AG)']],
    ['Entscheidungskriterien', ['**Haftung**', '**Kapitalbedarf**', '**Gründungsaufwand** (notariell, Handelsregister)', '**Steuern** (Einkommen- vs. Körperschaftsteuer)', '**Mitbestimmung, Publizität**']],
  ],
  blocks: [
    ['h', 'Warum ist die Rechtsform wichtig?'],
    ['p', 'Wer ein Unternehmen gründet, muss entscheiden: **Wer haftet mit seinem Privatvermögen**, wenn das Unternehmen Schulden macht? **Wie viel Geld** muss man einbringen? **Wer darf Entscheidungen treffen**? Das Recht bietet verschiedene **Rechtsformen** mit unterschiedlichen Antworten. Für IT-Gründer ist oft die **GmbH** (oder **UG**) interessant, weil sie das **Privatvermögen schützt**.'],
    ['diagram', {w: 760, h: 270, keep: 640, cap: 'Übersicht der wichtigsten Rechtsformen', nodes: [
      {id: 'r', k: 'round', x: 380, y: 30, t: 'Rechtsformen', w: 160, h: 38, s: 'solid'}, {id: 'e', k: 'round', x: 130, y: 100, t: 'Einzelunternehmen (e. K.)', w: 200, h: 40, s: 'accent', fs: 12}, {id: 'p', k: 'round', x: 380, y: 100, t: 'Personengesellschaften', w: 200, h: 40, s: 'accent', fs: 12}, {id: 'k', k: 'round', x: 630, y: 100, t: 'Kapitalgesellschaften', w: 200, h: 40, s: 'accent', fs: 12},
      {id: 'p1', k: 'round', x: 290, y: 190, t: 'GbR, OHG, KG', w: 140, h: 38, s: 'soft'}, {id: 'p2', k: 'round', x: 440, y: 190, t: 'GmbH & Co. KG', w: 150, h: 38, s: 'soft'}, {id: 'k1', k: 'round', x: 600, y: 190, t: 'GmbH, UG', w: 110, h: 38, s: 'soft'}, {id: 'k2', k: 'round', x: 700, y: 190, t: 'AG, SE', w: 80, h: 38, s: 'soft'}, {id: 'g', k: 'round', x: 380, y: 245, t: 'Genossenschaft (eG), Verein', w: 220, h: 34, s: 'soft', fs: 12},
    ], edges: [{a: 'r', b: 'e', ea: 'none'}, {a: 'r', b: 'p', ea: 'none'}, {a: 'r', b: 'k', ea: 'none'}, {a: 'p', b: 'p1', ea: 'none'}, {a: 'p', b: 'p2', ea: 'none'}, {a: 'k', b: 'k1', ea: 'none'}, {a: 'k', b: 'k2', ea: 'none'}]}],
    ['h', 'Personengesellschaften und Einzelunternehmen'],
    ['table', ['Rechtsform', 'Gründung', 'Mindestkapital', 'Haftung', 'Geschäftsführung', 'Besonderheit'], [
      ['**Einzelunternehmen** (e. K., eingetragener Kaufmann)', 'Eine Person, Gewerbeanmeldung, bei kaufmännischem Umfang **Handelsregister**', 'keines', '**Unbeschränkt** mit dem **gesamten Privatvermögen**', 'Inhaber allein', 'Einfach, **Alleinentscheidung**, **volles Risiko**; Gewinn wird versteuert wie persönliches Einkommen'],
      ['**GbR** (Gesellschaft bürgerlichen Rechts)', '**Formlos** (auch mündlich), mindestens **2 Gesellschafter**', 'keines', '**Unbeschränkt, gesamtschuldnerisch** (jeder haftet für alles)', 'Alle gemeinsam', 'Einfachste Gesellschaftsform, für kleine Projekte (Praxisgemeinschaft); keine Eintragung nötig'],
      ['**OHG** (Offene Handelsgesellschaft)', 'Mind. **2 Gesellschafter**, **Handelsregister**, Gesellschaftsvertrag', 'keines', '**Alle Gesellschafter unbeschränkt, unmittelbar und solidarisch**', 'Jeder einzeln', 'Kaufmännisches Gewerbe, **Firma** mit Zusatz "OHG"'],
      ['**KG** (Kommanditgesellschaft)', 'Mind. 2: **Komplementär** + **Kommanditist**, **Handelsregister**', 'Einlage des Kommanditisten (Hafteinlage)', '**Komplementär: unbeschränkt**. **Kommanditist: nur mit der Einlage**', 'Komplementär führt, Kommanditisten **ohne** Geschäftsführung', 'Kapitalgeber ohne Haftung und ohne Führung'],
    ]],
    ['h', 'Kapitalgesellschaften'],
    ['table', ['Rechtsform', 'Gründung', 'Mindestkapital', 'Haftung', 'Organe', 'Besonderheit'], [
      ['**GmbH** (Gesellschaft mit beschränkter Haftung)', '**Notarieller** Gesellschaftsvertrag, **Handelsregister**; Mindestens 1 Gründer', '**25.000 Euro** Stammkapital (bei Gründung mindestens **12.500 Euro** einzahlen)', '**Nur Gesellschaftsvermögen**; Gesellschafter haften mit **Einlage**', '**Geschäftsführer**, Gesellschafterversammlung, Aufsichtsrat ab 500 AN', '**Häufigste Rechtsform** für Mittelstand und IT; Firma mit "GmbH"; Körperschaftsteuer'],
      ['**UG (haftungsbeschränkt)** ("Mini-GmbH")', 'Wie GmbH, Musterprotokoll möglich', '**ab 1 Euro** (Stammkapital), **25 % des Jahresgewinns** in die Rücklage bis 25.000 Euro', 'Nur Gesellschaftsvermögen', 'Wie GmbH', 'Einstieg für Gründer mit wenig Kapital; später in GmbH umwandelbar'],
      ['**AG** (Aktiengesellschaft)', '**Notarielle Satzung**, Handelsregister, ab 1 Gründer', '**50.000 Euro** Grundkapital, aufgeteilt in **Aktien** (Nennbetrag mind. 1 Euro)', 'Nur Gesellschaftsvermögen; Aktionäre riskieren ihren Einsatz', '**Vorstand** (leitet), **Aufsichtsrat** (überwacht, bestellt Vorstand), **Hauptversammlung** (Aktionäre)', 'Kapitalbeschaffung über die **Börse**; strenge Publizität; große Unternehmen'],
    ]],
  ],
});
