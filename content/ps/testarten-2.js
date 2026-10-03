AP2.add('ps-testarten', [
  ['h', 'Black-Box-Test und White-Box-Test'],
  ['table', ['Merkmal', 'Black-Box-Test', 'White-Box-Test'], [
    ['Kenntnis des Codes', 'Nicht nötig, das Programm ist eine "schwarze Kiste"', 'Notwendig, der Code wird betrachtet ("durchsichtige Kiste")'],
    ['Testgrundlage', 'Anforderungen und Spezifikation', 'Quellcode und Programmstruktur'],
    ['Typische Verfahren', 'Äquivalenzklassenbildung, Grenzwertanalyse, Entscheidungstabellen', 'Anweisungs-, Zweig-, Pfadüberdeckung'],
    ['Wer?', 'Tester, Fachleute, Kunden', 'Entwickler'],
    ['Findet gut', 'Fehlende oder falsche Funktionen', 'Tote Codeteile, nicht getestete Verzweigungen'],
  ]],
  ['h3', 'Überdeckungsmaße (White-Box)'],
  ['kv', [
    ['Anweisungsüberdeckung (C0)', 'Jede **Anweisung** wird mindestens einmal ausgeführt.'],
    ['Zweigüberdeckung (C1)', 'Jede **Verzweigung** (if-wahr und if-falsch) wird mindestens einmal durchlaufen. Stärker als C0.'],
    ['Pfadüberdeckung', 'Jeder mögliche **Weg** durch das Programm wird durchlaufen. Sehr aufwendig bei Schleifen.'],
  ]],
  ['code', 'java', `int max(int a, int b) {
    int m = a;            // Anweisung 1
    if (b > a) {          // Verzweigung
        m = b;            // Anweisung 2
    }
    return m;             // Anweisung 3
}
// C0: ein Test reicht, bei dem b > a gilt, z. B. max(1, 2)
// C1: zusätzlich ein Test, bei dem b > a nicht gilt, z. B. max(2, 1)`],
  ['h', 'Weitere Testarten'],
  ['table', ['Testart', 'Ziel', 'Beispiel'], [
    ['Funktionstest', 'Erfüllt die Funktion die Anforderung?', 'Gutscheincode senkt den Preis um 10 Prozent.'],
    ['Regressionstest', 'Nach Änderungen: Funktioniert das Alte noch?', 'Nach einem Bugfix alle Tests der Rechnungserstellung erneut ausführen. Wird automatisiert.'],
    ['Smoke-Test', 'Läuft die Anwendung grundsätzlich? ("Raucht es?")', 'Anwendung startet, Login funktioniert.'],
    ['Lasttest', 'Verhalten bei erwarteter Last', '500 gleichzeitige Nutzer, Antwortzeit unter 2 Sekunden.'],
    ['Stresstest', 'Verhalten bei Überlast, bis zum Ausfall', 'Nutzerzahl erhöhen bis das System bricht.'],
    ['Usability-Test', 'Bedienbarkeit mit echten Nutzern', 'Testperson bucht eine Reise, Beobachter notiert Probleme.'],
    ['Sicherheitstest (Penetrationstest)', 'Schwachstellen finden', 'SQL-Injection und Zugriffsrechte prüfen.'],
    ['Alpha-Test / Beta-Test', 'Tests vor Veröffentlichung', 'Alpha intern, Beta mit ausgewählten Kunden.'],
  ]],
  ['h', 'Ein Testfall in der Praxis'],
  ['table', ['ID', 'Vorbedingung', 'Aktion / Eingabe', 'Erwartetes Ergebnis', 'Ergebnis', 'Status'], [
    ['TF-01', 'Benutzer "anna" existiert', 'Login mit "anna" und richtigem Passwort', 'Startseite wird angezeigt', 'Startseite angezeigt', 'bestanden'],
    ['TF-02', 'Benutzer "anna" existiert', 'Login mit falschem Passwort', 'Meldung "Zugangsdaten ungültig"', 'Seite lädt ohne Meldung', '**fehlgeschlagen**'],
    ['TF-03', 'Benutzer "anna" gesperrt', 'Login mit richtigem Passwort', 'Meldung "Konto gesperrt"', 'Meldung angezeigt', 'bestanden'],
  ], {first: true}],
  ['tip', 'Ein guter Testfall hat immer ein **erwartetes Ergebnis, das vor dem Test feststeht**. Ohne erwartetes Ergebnis kann man nicht beurteilen, ob der Test bestanden ist.'],
  ['h', 'Testpyramide'],
  ['chart', {kind: 'bar', w: 720, h: 300, labels: ['Modultests (Unit)', 'Integrationstests', 'System- / UI-Tests'], series: [{n: 'Empfohlene Anzahl (relativ)', d: [70, 20, 10], k: 'accent'}], vals: true, yl: 'Anteil in Prozent', cap: 'Testpyramide: viele schnelle Unit-Tests, wenige langsame UI-Tests (Richtwerte).'}],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie den Unterschied zwischen Modultest, Integrationstest und Systemtest.', ['- **Modultest:** prüft einzelne Bausteine (Methoden, Klassen) isoliert, durch Entwickler.', '- **Integrationstest:** prüft das Zusammenspiel mehrerer Module und Schnittstellen.', '- **Systemtest:** prüft das gesamte System in einer realistischen Umgebung gegen das Pflichtenheft.'], 6],
  ['qa', 'Was ist ein Regressionstest und warum sollte er automatisiert werden?', 'Ein Regressionstest wiederholt bereits bestandene Tests nach Änderungen am Code, um sicherzustellen, dass durch die Änderung keine alten Funktionen kaputtgegangen sind. Er wird häufig durchgeführt, deshalb lohnt sich die **Automatisierung** (zum Beispiel in einer CI-Pipeline), weil sie Zeit spart und reproduzierbare Ergebnisse liefert.', 4],
  ['qa', 'Nennen Sie je einen Vor- und Nachteil von Black-Box- und White-Box-Tests.', ['- **Black-Box:** Vorteil: unabhängig vom Code, prüft gegen Anforderungen. Nachteil: Nicht getestete Codepfade bleiben möglicherweise unentdeckt.', '- **White-Box:** Vorteil: findet nicht ausgeführte Codeteile. Nachteil: Erfordert Codekenntnis und prüft nicht, ob etwas **fehlt**.'], 4],
  ['quiz', [
    {q: 'Welche Teststufe führt der Kunde durch?', o: ['Abnahmetest', 'Modultest', 'Integrationstest', 'Debugging'], a: 0, e: 'Beim Abnahmetest prüft der Auftraggeber, ob das System seinen Anforderungen entspricht.'},
    {q: 'Was ist ein Stub?', o: ['Ein Platzhalter für ein noch nicht vorhandenes Modul', 'Ein Programmfehler', 'Eine Datenbank', 'Eine Tastenkombination'], a: 0, e: 'Stubs liefern feste Antworten und ersetzen fehlende Module beim Testen.'},
    {q: 'Was prüft die Zweigüberdeckung (C1)?', o: ['Dass jede Verzweigung in beide Richtungen durchlaufen wird', 'Dass jede Zeile kommentiert ist', 'Dass der Code kurz ist', 'Dass alle Variablen benannt sind'], a: 0, e: 'C1 verlangt, dass jeder Zweig (wahr und falsch) mindestens einmal genommen wird.'},
    {q: 'Was bedeutet Black-Box-Test?', o: ['Test ohne Kenntnis des Codes, nur anhand von Ein- und Ausgabe', 'Test im Dunkeln', 'Test nur mit schwarzen Daten', 'Test des Servers'], a: 0, e: 'Black-Box-Tests basieren auf Anforderungen, nicht auf der inneren Struktur.'},
    {q: 'Wann ist ein Regressionstest sinnvoll?', o: ['Nach jeder Änderung am Code', 'Nur vor der Projektidee', 'Nie', 'Nur bei Hardwarewechsel'], a: 0, e: 'Regressionstests sichern ab, dass Änderungen nichts Bestehendes zerstören.'},
  ]],
]);
