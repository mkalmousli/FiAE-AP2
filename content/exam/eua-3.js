AP2.exam.part('exam1-eua', {
  t: 'Handlungsschritt 5: Testen und Werkzeuge (15 Punkte)',
  tasks: [
    {pts: 6, rows: 6, q: 'Die Funktion rabatt(betrag) gibt den Rabatt in Prozent zurück: Beträge unter 100 Euro: 0 %, ab 100 bis unter 500 Euro: 5 %, ab 500 Euro: 10 %, negative Beträge sind ungültig. Bilden Sie Äquivalenzklassen und geben Sie je Grenze einen Grenzwerttest an.',
      a: ['Äquivalenzklassen: **ungültig** (betrag kleiner 0), **0 bis 99,99** (0 %), **100 bis 499,99** (5 %), **ab 500** (10 %).', 'Grenzwerte (jeweils beide Seiten): **-0,01** (ungültig), **0** (0 %), **99,99** (0 %), **100** (5 %), **499,99** (5 %), **500** (10 %).', 'Je 1 Punkt für vollständige Klassen (2) und für richtige Grenzwerte (4).']},
    {pts: 3, q: 'Erklären Sie den Unterschied zwischen Unit-Test und Integrationstest und geben Sie je ein Beispiel.',
      a: ['**Unit-Test:** prüft eine **kleinste Einheit isoliert** (Methode/Klasse, Abhängigkeiten ersetzt durch Mocks), zum Beispiel rabatt(). **Integrationstest:** prüft das **Zusammenspiel** mehrerer Komponenten, zum Beispiel Buchungsdienst mit echter Datenbank.']},
    {pts: 3, q: 'Sie arbeiten mit Git. Nennen Sie die Befehle, um für eine neue Funktion einen Branch anzulegen, Änderungen zu committen und den Branch auf den Server hochzuladen. Wie kommt die Funktion in den Hauptzweig?',
      a: ['- git checkout -b feature/warteliste (oder git switch -c)', '- git add . und git commit -m "Warteliste implementiert"', '- git push -u origin feature/warteliste', 'Danach **Pull Request / Merge Request** mit Code-Review, anschließend **merge** in main (Konflikte vorher lösen).']},
    {pts: 3, q: 'Das Portal bricht beim Buchen mit einem Fehler ab. Beschreiben Sie, wie Sie die Ursache mit einem Debugger eingrenzen.',
      a: ['Fehler reproduzieren, **Haltepunkt (Breakpoint)** vor der verdächtigen Stelle setzen, Programm im Debug-Modus starten, **schrittweise ausführen** (Step Over/Into), **Variablenwerte** und Aufrufliste (Call Stack) prüfen, Ursache korrigieren und mit einem **Testfall** absichern.']},
  ],
});
AP2.exam.end('exam1-eua');
