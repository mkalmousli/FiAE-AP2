AP2.page('ps-istsoll', {
  b: 'ps', g: 'Anforderungsanalyse', t: 'Ist-Analyse und Soll-Konzept',
  d: 'Die **Ist-Analyse** beschreibt den **aktuellen Zustand** (Abläufe, Systeme, Probleme). Das **Soll-Konzept** beschreibt den **gewünschten Zustand**. Der **Soll-Ist-Vergleich** zeigt die Lücke (Handlungsbedarf), die das Projekt schließen soll.',
  m: '**Ist = wie es heute ist, Soll = wie es sein soll, Lücke = Projektauftrag.** Erst verstehen, dann ändern: ohne Ist-Analyse keine gute Lösung.',
  cheat: [
    ['Ist-Analyse', ['Zustand heute beschreiben', 'Methoden: Interview, Beobachtung, Fragebogen, Dokumente', 'Schwachstellen finden', 'Darstellung: Ablaufdiagramm, Tabelle']],
    ['Soll-Konzept', ['Gewünschter Zielzustand', 'Anforderungen ableiten', 'Varianten entwickeln und bewerten', 'Ergebnis: Lastenheft-Basis']],
    ['Soll-Ist-Vergleich', ['Lücke (Gap) sichtbar machen', 'Maßnahmen ableiten', 'Priorisieren nach Nutzen und Aufwand']],
    ['Schwachstellen', ['Medienbrüche (Papier und Computer)', 'Doppelte Dateneingabe', 'Lange Durchlaufzeiten', 'Fehleranfällige manuelle Schritte']],
  ],
  blocks: [
    ['h', 'Warum zuerst analysieren?'],
    ['p', 'Bevor man ein Problem löst, muss man verstehen, wie es heute ist. Sonst baut man eine perfekte Lösung für das falsche Problem. Die **Ist-Analyse** liefert Fakten (Wie lange dauert ein Vorgang? Wie viele Fehler passieren? Welche Programme werden benutzt?). Das **Soll-Konzept** übersetzt das Ziel in konkrete Anforderungen.'],
    ['diagram', AP2.dg.flow(['Ist-Analyse', 'Schwachstellen', 'Soll-Konzept', 'Soll-Ist-Vergleich', 'Maßnahmen'], {w: 760, h: 100, styles: ['soft', 'bad', 'accent', 'accent', 'ok'], cap: 'Vom Ist-Zustand zu den Maßnahmen'})],
    ['h', 'Ist-Analyse: Methoden'],
    ['table', ['Methode', 'Vorteil', 'Nachteil'], [
      ['Interview', 'Tiefe Einblicke, Rückfragen möglich', 'Zeitaufwendig, subjektiv'],
      ['Fragebogen', 'Viele Personen, vergleichbare Antworten', 'Wenig Tiefe, geringe Rücklaufquote'],
      ['Beobachtung', 'Zeigt tatsächliche Abläufe, auch Ungeschriebenes', 'Verhalten ändert sich bei Beobachtung, aufwendig'],
      ['Dokumentenanalyse', 'Objektive Daten, ohne Störung', 'Dokumente können veraltet sein'],
      ['Selbstaufschreibung', 'Mitarbeiter notieren Tätigkeiten und Zeiten', 'Ungenau, erhöht Arbeitsaufwand'],
    ]],
    ['h', 'Ein Beispiel aus der Praxis'],
    ['ex', ['**Ausgangslage:** In einer Werkstatt werden Reparaturaufträge auf Papier erfasst, später in Excel abgetippt und dann in die Rechnungssoftware übertragen.', '**Ist-Analyse:** 3-malige Eingabe derselben Daten, durchschnittlich 12 Minuten pro Auftrag, etwa 6 Prozent Tippfehler, Auftragsstatus ist für Kunden nicht abrufbar.', '**Schwachstellen:** Medienbrüche (Papier, Excel, Software), Doppelarbeit, Fehler, fehlende Transparenz.', '**Soll-Konzept:** Aufträge werden einmal digital erfasst (Tablet), der Status ist online abrufbar, Rechnung wird automatisch erzeugt.', '**Soll-Ist-Vergleich:** Bearbeitungszeit von 12 auf 3 Minuten, Fehlerquote von 6 auf unter 1 Prozent. Daraus ergibt sich der Projektnutzen.']],
    ['table', ['Kriterium', 'Ist-Zustand', 'Soll-Zustand', 'Lücke / Maßnahme'], [
      ['Erfassung', 'Papier, dann Excel', 'Direkt digital (Tablet)', 'Software mit Erfassungsmaske'],
      ['Dauer pro Auftrag', '12 Minuten', '3 Minuten', 'Einmalige Eingabe, Vorlagen'],
      ['Fehlerquote', '6 Prozent', 'unter 1 Prozent', 'Pflichtfelder, Validierung'],
      ['Status für Kunden', 'nicht verfügbar', 'Online abrufbar', 'Kundenportal'],
    ]],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Beschreiben Sie, warum eine Ist-Analyse vor der Entwicklung einer neuen Software durchgeführt wird.', 'Sie erfasst Abläufe, Systeme und Probleme des aktuellen Zustands. Dadurch werden Schwachstellen und echte Anforderungen erkannt, die Lösung passt zum Problem, der Nutzen des Projekts kann belegt werden, und es entsteht eine Vergleichsbasis für die Erfolgskontrolle.', 4],
    ['qa', 'Nennen Sie zwei Methoden der Ist-Aufnahme mit je einem Nachteil.', ['- Interview: zeitaufwendig und subjektiv.', '- Fragebogen: wenig Tiefe, Rückfragen kaum möglich.', '- (Alternativ Beobachtung: Verhalten ändert sich, wenn man beobachtet wird.)'], 4],
    ['quiz', [
      {q: 'Was beschreibt das Soll-Konzept?', o: ['Den gewünschten Zielzustand', 'Den aktuellen Zustand', 'Die Kosten der Hardware', 'Das Gehalt der Entwickler'], a: 0, e: 'Das Soll-Konzept beschreibt, wie es nach dem Projekt sein soll.'},
      {q: 'Was ist ein Medienbruch?', o: ['Wechsel zwischen Medien, zum Beispiel Papier und Software, mit manueller Übertragung', 'Ein Defekt am Monitor', 'Ein Kabelbruch', 'Ein Programmabsturz'], a: 0, e: 'Medienbrüche bedeuten Doppelarbeit und Fehlerquellen.'},
      {q: 'Welche Methode zeigt die tatsächlichen Abläufe am besten?', o: ['Beobachtung', 'Zufällige Raten', 'Nur Handbücher', 'Gehaltslisten'], a: 0, e: 'Durch Beobachtung erkennt man auch Abläufe, die nirgends dokumentiert sind.'},
    ]],
  ],
});

AP2.add('ps-istsoll', [
  [
    "h",
    "Nutzen aus dem Prozess ableiten"
  ],
  [
    "p",
    "Die Werkstatt bearbeitet monatlich 800 Aufträge. Die mittlere Erfassungszeit sinkt von zwölf auf drei Minuten. Eine Arbeitsstunde wird mit 36 Euro bewertet. Das System verursacht monatlich 900 Euro Zusatzkosten."
  ],
  [
    "table",
    [
      "Schritt",
      "Rechnung",
      "Ergebnis"
    ],
    [
      [
        "Ersparnis pro Auftrag",
        "12 − 3",
        "9 Minuten"
      ],
      [
        "Ersparnis im Monat",
        "800 × 9 / 60",
        "120 Stunden"
      ],
      [
        "Bewertete Zeitersparnis",
        "120 × 36",
        "4.320 Euro"
      ],
      [
        "Monatlicher Nettoeffekt",
        "4.320 − 900",
        "3.420 Euro"
      ]
    ]
  ],
  [
    "note",
    "Das ist ein bewerteter Kapazitätsnutzen. Ob tatsächlich Geld abfließt oder gespart wird, hängt von der Nutzung freier Zeit ab."
  ],
  [
    "h",
    "Erfolgskontrolle fair planen"
  ],
  [
    "steps",
    [
      "Vorher und nachher denselben Prozessabschnitt messen.",
      "Gleiche Auftragsarten und vergleichbare Auslastung wählen.",
      "Messzeitraum und Stichprobe festlegen.",
      "Fehlerquote und Bearbeitungszeit gemeinsam prüfen.",
      "Abweichungen erklären und Maßnahmen dokumentieren."
    ]
  ],
  [
    "qa",
    "Die Fehlerquote sinkt von sechs auf ein Prozent. **Berechnen** Sie absolute und relative Senkung. Unterscheiden heißt: beide Bezugsgrößen klar nennen.",
    [
      "Absolute Senkung: 6 − 1 = **5 Prozentpunkte**. 1 Punkt.",
      "Relative Senkung: (6 − 1) / 6 × 100 ≈ **83,33 Prozent**. 1 Punkt.",
      "Die relative Senkung bezieht sich auf die ursprünglichen sechs Prozent. 1 Punkt."
    ],
    3
  ],
  [
    "warn",
    "Prozentpunkte sind eine Differenz zweier Prozentwerte. Prozent ist hier eine relative Änderung. Beide Zahlen dürfen nicht vertauscht werden."
  ],
  [
    "see",
    [
      "ps-anforderungen",
      "ps-kosten",
      "ps-abnahme"
    ]
  ]
]);
