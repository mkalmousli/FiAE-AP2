AP2.page('ps-scrum', {
  b: 'ps', g: 'Projektmanagement', t: 'Scrum und Kanban',
  d: '**Scrum** ist ein agiles Rahmenwerk: Ein selbstorganisiertes Team entwickelt in festen, kurzen **Sprints** (höchstens ein Monat) ein **lauffähiges Inkrement**. **Kanban** ist eine Methode, bei der Arbeit auf einem **Board** sichtbar gemacht und die gleichzeitige Arbeit durch **WIP-Limits** begrenzt wird.',
  m: 'Scrum: **3 Rollen** (PO, SM, Developers), **5 Ereignisse** (Sprint, Planning, Daily, Review, Retro), **3 Artefakte** (Product Backlog, Sprint Backlog, Inkrement). Kanban: **Board, WIP-Limit, Pull**.',
  cheat: [
    ['Rollen', ['**Product Owner:** was ist wichtig? Verwaltet Product Backlog, vertritt Kunde', '**Scrum Master:** Methode, räumt Hindernisse weg, kein Chef', '**Developers:** bauen das Inkrement, selbstorganisiert']],
    ['Ereignisse', ['**Sprint:** max. 1 Monat', '**Sprint Planning:** Was machen wir im Sprint?', '**Daily Scrum:** 15 Minuten täglich', '**Sprint Review:** Ergebnis zeigen, Feedback', '**Retrospektive:** Wie arbeiten wir besser?']],
    ['Artefakte', ['**Product Backlog:** alle Wünsche, priorisiert', '**Sprint Backlog:** Plan für den Sprint', '**Inkrement:** fertiges, nutzbares Ergebnis', '**Definition of Done:** gemeinsame Fertig-Kriterien']],
    ['Kanban', ['Arbeit visualisieren (Board)', 'WIP-Limit: max. gleichzeitige Aufgaben', 'Pull statt Push', 'Kein fester Sprint, kontinuierlicher Fluss']],
  ],
  blocks: [
    ['h', 'Die Idee hinter Scrum'],
    ['p', 'Software-Projekte sind unvorhersehbar. Deshalb plant Scrum nicht alles im Voraus, sondern arbeitet in **kurzen Zyklen** und lernt nach jedem Zyklus dazu. Das Grundprinzip heißt **Empirismus**: Man trifft Entscheidungen aufgrund von Erfahrung und Beobachtung. Drei Säulen stützen das: **Transparenz** (alle sehen den Stand), **Überprüfung** (häufig prüfen) und **Anpassung** (ändern, wenn nötig).'],
    ['h', 'Das Scrum-Team'],
    ['table', ['Rolle', 'Aufgabe', 'Typische Fehlvorstellung'], [
      ['Product Owner (PO)', 'Ist für den **Wert** des Produkts verantwortlich. Pflegt und priorisiert das Product Backlog. Spricht mit Kunden und Stakeholdern. Genau eine Person.', 'Der PO sagt dem Team, **wie** es arbeiten soll. Falsch: Das entscheiden die Developers.'],
      ['Scrum Master (SM)', 'Sorgt dafür, dass Scrum verstanden und gelebt wird. Beseitigt Hindernisse, moderiert Meetings. Dient dem Team.', 'Der SM ist der Chef oder Projektleiter. Falsch: Er hat keine Weisungsbefugnis.'],
      ['Developers (Entwicklungsteam)', 'Alle, die am Inkrement arbeiten (Programmierer, Tester, Designer). Planen den Sprint, entscheiden **wie** gearbeitet wird.', 'Es gibt Spezialisten, die nur eine Sache machen dürfen. Falsch: Das Team ist gemeinsam verantwortlich.'],
    ]],
    ['p', 'Das Scrum-Team ist klein: höchstens etwa **10 Personen**. Es ist **cross-funktional** (hat alle nötigen Fähigkeiten) und **selbstorganisiert**.'],
    ['h', 'Der Scrum-Zyklus'],
    ['diagram', AP2.dg.cycle(['Product Backlog', 'Sprint Planning', 'Sprint (Daily Scrum)', 'Inkrement', 'Sprint Review', 'Retrospektive'], {w: 720, h: 400, rx: 270, ry: 140, styles: ['soft', 'accent', 'solid', 'ok', 'accent', 'accent'], cap: 'Der Scrum-Zyklus: Nach der Retrospektive beginnt der nächste Sprint mit einem neu priorisierten Backlog.'})],
  ],
});
