AP2.page('ps-testarten', {
  b: 'ps', g: 'Qualitätssicherung', t: 'Testarten und Teststufen',
  d: 'Software wird in **Teststufen** geprüft: **Modultest** (einzelne Bausteine), **Integrationstest** (Zusammenspiel), **Systemtest** (Gesamtsystem gegen Anforderungen) und **Abnahmetest** (durch den Kunden). Tests unterscheiden sich außerdem nach Methode: **Black-Box** (ohne Codekenntnis) und **White-Box** (mit Codekenntnis).',
  m: '**M-I-S-A**: Modul, Integration, System, Abnahme (von klein nach groß). **Black-Box = Blick nur auf Ein- und Ausgabe, White-Box = Blick in den Code.** Die Teststufen entsprechen den Stufen des V-Modells.',
  cheat: [
    ['Teststufen', ['**Modultest (Unit):** einzelne Klasse/Funktion, durch Entwickler', '**Integrationstest:** Module zusammen, Schnittstellen', '**Systemtest:** gesamtes System, Testumgebung', '**Abnahmetest:** Kunde prüft gegen Anforderungen']],
    ['Methoden', ['**Black-Box:** nur Ein-/Ausgabe, aus Anforderungen', '**White-Box:** Kenntnis des Codes, Abdeckung', '**Grey-Box:** Mischung']],
    ['Testarten (Auswahl)', ['**Funktionstest:** tut es das Richtige?', '**Regressionstest:** nach Änderungen alte Tests wiederholen', '**Lasttest / Stresstest:** viele Nutzer', '**Smoke-Test:** läuft das Programm überhaupt?', '**Sicherheits-, Usability-Test**']],
    ['Testfall enthält', ['Eindeutige ID', 'Vorbedingung', 'Eingabe / Aktion', '**Erwartetes** Ergebnis', 'Tatsächliches Ergebnis und Status']],
  ],
  blocks: [
    ['h', 'Warum testen?'],
    ['p', 'Kein Programm ist beim ersten Mal fehlerfrei. **Testen** bedeutet, ein Programm kontrolliert auszuführen, um **Fehler zu finden**. Wichtig: Tests können nur das **Vorhandensein** von Fehlern zeigen, nicht ihre Abwesenheit. Je früher ein Fehler gefunden wird, desto billiger ist die Korrektur. Ein Fehler, der erst beim Kunden auffällt, kostet ein Vielfaches.'],
    ['chart', {kind: 'bar', w: 720, h: 320, labels: ['Anforderung', 'Entwurf', 'Implementierung', 'Test', 'Betrieb'], series: [{n: 'Relative Kosten der Fehlerbehebung', d: [1, 5, 10, 25, 100], k: 'accent'}], vals: true, yl: 'Kostenfaktor', cap: 'Faustregel (Größenordnung, Beispielwerte): Je später ein Fehler entdeckt wird, desto teurer wird seine Behebung.'}],
    ['h', 'Teststufen (V-Modell)'],
    ['diagram', {w: 760, h: 300, keep: 600, cap: 'Teststufen von klein nach groß: Jede Stufe prüft eine Entwurfsstufe.', nodes: [
      {id: 'm', k: 'round', x: 130, y: 220, t: ['Modultest', 'einzelne Funktion / Klasse'], w: 190, h: 64, s: 'accent'}, {id: 'i', k: 'round', x: 330, y: 160, t: ['Integrationstest', 'Zusammenspiel der Module'], w: 190, h: 64, s: 'accent'},
      {id: 's', k: 'round', x: 530, y: 100, t: ['Systemtest', 'Gesamtsystem'], w: 190, h: 64, s: 'accent'}, {id: 'a', k: 'round', x: 650, y: 36, t: ['Abnahmetest', 'Kunde'], w: 170, h: 56, s: 'solid'},
    ], edges: [{a: 'm', b: 'i'}, {a: 'i', b: 's'}, {a: 's', b: 'a'}]}],
    ['table', ['Teststufe', 'Prüfgegenstand', 'Wer testet?', 'Typische Fehler', 'Hilfsmittel'], [
      ['**Modultest** (Unit-Test, Komponententest)', 'Einzelne Methode, Klasse oder Modul', 'Entwickler', 'Rechenfehler, falsche Bedingungen, Grenzwerte', 'Unit-Test-Frameworks (JUnit, NUnit, pytest), Mocks'],
      ['**Integrationstest**', 'Zusammenspiel mehrerer Module, Schnittstellen, Datenbank', 'Entwickler, Tester', 'Falsche Datenformate, Schnittstellenfehler', 'Treiber, Stubs, Testdatenbank'],
      ['**Systemtest**', 'Gesamtes System in einer realistischen Umgebung gegen das Pflichtenheft', 'Testteam (unabhängig)', 'Fehlende Funktionen, Performanceprobleme', 'Testumgebung, Testfallkatalog'],
      ['**Abnahmetest**', 'Fertiges System durch den Auftraggeber gegen Lastenheft/Vertrag', 'Kunde, Fachabteilung', 'Abweichung vom gewünschten Verhalten', 'Abnahmekriterien, Abnahmeprotokoll'],
    ]],
    ['h3', 'Integrationstest: Vorgehensweisen'],
    ['list', ['**Top-down:** Von der obersten Ebene beginnen, fehlende untere Module durch **Stubs** (Platzhalter, die feste Antworten liefern) ersetzen.', '**Bottom-up:** Von den untersten Modulen beginnen, fehlende obere Module durch **Treiber** (Programme, die das Modul aufrufen) ersetzen.', '**Big Bang:** Alle Module auf einmal zusammenschalten. Einfach, aber Fehlersuche schwierig.']],
  ],
});
