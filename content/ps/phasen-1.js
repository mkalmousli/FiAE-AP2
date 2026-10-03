AP2.page('ps-phasen', {
  b: 'ps', g: 'Projektmanagement', t: 'Projektphasen',
  d: 'Ein **Projekt** ist ein einmaliges Vorhaben mit klarem Ziel, festem Zeitrahmen, begrenzten Mitteln (Geld, Personal) und einer eigenen Organisation. Ein Projekt läuft in **Phasen**: Initiierung, Planung, Durchführung und Abschluss.',
  m: '**I-P-D-A**: Initiierung, Planung, Durchführung, Abschluss. Das Magische Dreieck: **Z-K-Q** = Zeit, Kosten, Qualität. Wenn man an einer Ecke zieht, verändern sich die anderen.',
  cheat: [
    ['Merkmale eines Projekts', ['Einmalig (kein Tagesgeschäft)', 'Zeitlich begrenzt (Start und Ende)', 'Klares Ziel und Ergebnis', 'Begrenzte Ressourcen', 'Projektorganisation, oft neuartig und riskant']],
    ['Die vier Phasen', ['**Initiierung**: Idee, Ziel, Projektauftrag', '**Planung**: Struktur, Zeit, Kosten, Risiken', '**Durchführung**: Umsetzen, steuern, kontrollieren', '**Abschluss**: Abnahme, Übergabe, Lessons Learned']],
    ['Magisches Dreieck', ['Zeit, Kosten, Qualität (plus Umfang/Scope)', 'Alle drei hängen zusammen', 'Mehr Qualität kostet Zeit oder Geld', 'Termin kürzen: Kosten steigen oder Umfang sinkt']],
    ['Rollen', ['**Auftraggeber** (bestellt und bezahlt)', '**Projektleiter** (plant und steuert)', '**Projektteam** (arbeitet)', '**Stakeholder** (alle Betroffenen und Interessierten)']],
  ],
  blocks: [
    ['h', 'Was ist ein Projekt?'],
    ['p', 'Im Alltag eines Unternehmens gibt es zwei Arten von Arbeit. Das **Tagesgeschäft** wiederholt sich (zum Beispiel Rechnungen schreiben, Server überwachen). Ein **Projekt** dagegen passiert nur einmal. Beispiel: "Wir entwickeln eine neue Kundenverwaltung bis zum 30. September mit 120.000 Euro Budget."'],
    ['p', 'Nach **DIN 69901** ist ein Projekt ein Vorhaben, das im Wesentlichen durch die **Einmaligkeit der Bedingungen** gekennzeichnet ist. Dazu gehören eine Zielvorgabe, zeitliche, finanzielle und personelle Begrenzungen, die Abgrenzung zu anderen Vorhaben und eine projektspezifische Organisation.'],
    ['table', ['Kriterium', 'Projekt', 'Tagesgeschäft (Routine)'], [
      ['Dauer', 'Befristet, mit Start und Ende', 'Dauerhaft'],
      ['Ablauf', 'Einmalig, neu', 'Wiederholt sich'],
      ['Risiko', 'Höher, weil neu', 'Gering, weil bekannt'],
      ['Organisation', 'Eigenes Team, oft aus mehreren Abteilungen', 'Feste Abteilung'],
      ['Beispiel', 'Einführung einer Web-Shop-Software', 'Wöchentliche Datensicherung prüfen'],
    ]],
    ['h', 'Das Magische Dreieck'],
    ['p', 'Jedes Projekt wird an drei Größen gemessen: **Zeit** (Termin), **Kosten** (Budget) und **Qualität** (Leistung, Funktionsumfang). Diese Größen hängen voneinander ab. Das nennt man **Magisches Dreieck** (englisch: Iron Triangle).'],
    ['diagram', {w: 720, h: 330, cap: 'Magisches Dreieck: Wer an einer Ecke zieht, verändert die anderen.', nodes: [
      {id: 'z', x: 360, y: 40, t: ['Zeit', 'Termin einhalten'], k: 'round', s: 'accent', w: 190, h: 56},
      {id: 'k', x: 130, y: 270, t: ['Kosten', 'Budget einhalten'], k: 'round', s: 'accent', w: 190, h: 56},
      {id: 'q', x: 590, y: 270, t: ['Qualität', 'Umfang und Güte'], k: 'round', s: 'accent', w: 190, h: 56},
      {id: 'm', x: 360, y: 190, t: ['Projekterfolg'], k: 'oval', s: 'solid', w: 150, h: 54},
    ], edges: [
      {a: 'z', b: 'k', ea: 'none', t: 'schneller = teurer'}, {a: 'k', b: 'q', ea: 'none', t: 'günstiger = weniger Qualität'}, {a: 'q', b: 'z', ea: 'none', t: 'mehr Umfang = mehr Zeit'},
      {a: 'm', b: 'z', ea: 'none', k: 'dash'}, {a: 'm', b: 'k', ea: 'none', k: 'dash'}, {a: 'm', b: 'q', ea: 'none', k: 'dash'},
    ]}],
    ['tip', 'Typische Prüfungsfrage: "Das Projekt hat Verzug. Nennen Sie Maßnahmen." Antwort immer mit dem Dreieck begründen: mehr Personal (Kosten steigen), Funktionsumfang kürzen (Qualität/Umfang sinkt) oder Termin verschieben (Zeit steigt).'],
  ],
});
