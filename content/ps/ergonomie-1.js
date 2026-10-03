AP2.page('ps-ergonomie', {
  b: 'ps', g: 'UI/UX', t: 'Software-Ergonomie (ISO 9241) und Barrierefreiheit',
  d: '**Software-Ergonomie** gestaltet Programme so, dass Benutzer ihre Aufgaben **wirksam, effizient und zufriedenstellend** erledigen können (**Gebrauchstauglichkeit**, ISO 9241-11). Die sieben **Grundsätze der Dialoggestaltung** (ISO 9241-110) sind die Prüfkriterien. **Barrierefreiheit** sorgt dafür, dass auch Menschen mit Einschränkungen die Software nutzen können.',
  m: 'Die sieben Grundsätze: **A-S-E-S-F-I-L** = **A**ufgabenangemessenheit, **S**elbstbeschreibungsfähigkeit, **E**rwartungskonformität, **S**teuerbarkeit, **F**ehlertoleranz, **I**ndividualisierbarkeit, **L**ernförderlichkeit. Barrierefrei nach **POUR**: wahrnehmbar, bedienbar, verständlich, robust (Perceivable, Operable, Understandable, Robust).',
  cheat: [
    ['Gebrauchstauglichkeit (ISO 9241-11)', ['**Wirksamkeit:** Ziel erreicht?', '**Effizienz:** mit wie viel Aufwand?', '**Zufriedenstellung:** wie angenehm?', 'Im Nutzungskontext (Benutzer, Aufgabe, Umgebung)']],
    ['Sieben Grundsätze (ISO 9241-110)', ['Aufgabenangemessenheit', 'Selbstbeschreibungsfähigkeit', 'Erwartungskonformität', 'Lernförderlichkeit', 'Steuerbarkeit', 'Fehlertoleranz', 'Individualisierbarkeit']],
    ['Barrierefreiheit (WCAG, POUR)', ['**Wahrnehmbar:** Alternativtexte, Kontrast', '**Bedienbar:** Tastatur, genug Zeit', '**Verständlich:** klare Sprache, vorhersehbar', '**Robust:** funktioniert mit Hilfstechnik']],
    ['Gesetze', ['**BITV 2.0:** Behörden', '**BFSG:** bestimmte Produkte und Dienstleistungen ab 28.06.2025', 'Technischer Maßstab: WCAG (EN 301 549)']],
  ],
  blocks: [
    ['h', 'Warum Ergonomie?'],
    ['p', 'Gute Software erkennt man daran, dass man das Handbuch nicht braucht. Schlechte Bedienung kostet Zeit, verursacht Fehler und frustriert. Für ein Unternehmen heißt das: höhere Kosten und weniger Akzeptanz. Deshalb ist Ergonomie Teil der Qualitätsanforderungen und taucht im Pflichtenheft als **Benutzbarkeit** auf. Der Maßstab ist die Normenreihe **DIN EN ISO 9241**.'],
    ['h', 'Gebrauchstauglichkeit (Usability)'],
    ['kv', [
      ['Wirksamkeit (effectiveness)', 'Kann der Benutzer sein Ziel überhaupt **vollständig und richtig** erreichen? Beispiel: Kann er eine Überweisung ausführen?'],
      ['Effizienz (efficiency)', 'Wie viel **Aufwand** (Zeit, Klicks, Fehler) braucht er dafür? Beispiel: Wie viele Schritte bis zur Überweisung?'],
      ['Zufriedenstellung (satisfaction)', 'Wie **angenehm** ist die Nutzung? Beispiel: Wirkt die Anwendung verständlich und vertrauenswürdig?'],
    ]],
    ['h', 'Die sieben Grundsätze der Dialoggestaltung (ISO 9241-110)'],
    ['table', ['Grundsatz', 'Bedeutung (einfach)', 'Gutes Beispiel', 'Schlechtes Beispiel'], [
      ['Aufgabenangemessenheit', 'Die Software unterstützt die Aufgabe, ohne unnötige Schritte.', 'Rechnung mit einem Klick aus dem Auftrag erzeugen', 'Daten mehrfach in verschiedene Masken eintippen'],
      ['Selbstbeschreibungsfähigkeit', 'Der Benutzer sieht, wo er ist und was er tun kann.', 'Fortschrittsanzeige "Schritt 2 von 4", beschriftete Felder', 'Symbole ohne Beschriftung, unklare Fehlercodes'],
      ['Erwartungskonformität', 'Verhält sich wie erwartet und einheitlich.', 'Speichern-Symbol immer oben links, gleiche Tastenkürzel', 'Zwei Fenster mit unterschiedlicher Bedeutung der Schaltfläche OK'],
      ['Lernförderlichkeit', 'Die Software unterstützt beim Lernen der Bedienung.', 'Tooltips, Beispiele, Assistenten', 'Funktionen nur über versteckte Menüs erreichbar'],
      ['Steuerbarkeit', 'Der Benutzer bestimmt Reihenfolge und Tempo.', 'Vorgang jederzeit abbrechen, zurück, rückgängig', 'Assistent ohne Zurück-Schaltfläche'],
      ['Fehlertoleranz (Robustheit gegen Benutzungsfehler)', 'Fehler werden verhindert oder leicht korrigiert.', 'Rückfrage vor dem Löschen, verständliche Fehlermeldung', 'Absturz bei Tippfehler, Meldung "Fehler 0x80004005"'],
      ['Individualisierbarkeit', 'Anpassung an Vorlieben und Fähigkeiten.', 'Schriftgröße, Sprache, Designmodus (Hell/Dunkel) wählbar', 'Feste kleine Schrift ohne Einstellungsmöglichkeit'],
    ]],
    ['note', 'In der Fassung ISO 9241-110 von 2020 wurden einige Begriffe umbenannt: **Lernförderlichkeit** heißt dort **Erlernbarkeit**, **Fehlertoleranz** heißt **Robustheit gegen Benutzungsfehler**, und **Individualisierbarkeit** wurde durch **Benutzerbindung** ersetzt. Inhaltlich entsprechen die Aufgaben der Prüfung meist den klassischen sieben Grundsätzen. Lies in der Prüfung die Begriffe der Aufgabe sorgfältig.'],
    ['h', 'Gute Fehlermeldungen'],
    ['procon', 'Fehlermeldungen', ['Sagen **was** passiert ist ("Das Passwort ist zu kurz")', 'Sagen **warum** und **wie man es behebt** ("Mindestens 8 Zeichen")', 'Höflich, ohne Schuldzuweisung', 'Fehler direkt am Eingabefeld markiert'], ['"Fehler 500" ohne Erklärung', 'Technische Details für den Benutzer ("NullPointerException")', 'Vorwurf: "Sie haben einen falschen Wert eingegeben"', 'Alle Eingaben gehen verloren']],
  ],
});
