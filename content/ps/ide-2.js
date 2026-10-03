AP2.add('ps-ide', [
  ['h', 'Frameworks und Bibliotheken'],
  ['table', ['Merkmal', 'Bibliothek (Library)', 'Framework'], [
    ['Wer steuert den Ablauf?', 'Dein Code ruft die Bibliothek auf', 'Das Framework ruft deinen Code auf (Inversion of Control, "Don\'t call us, we call you")'],
    ['Umfang', 'Enge Aufgabe (zum Beispiel JSON lesen, Datum berechnen)', 'Ganzes Programmgerüst (Architektur, Regeln)'],
    ['Freiheit', 'Hoch', 'Geringer, man folgt den Konventionen'],
    ['Beispiele', 'Apache Commons, jQuery, NumPy', 'Spring (Java), ASP.NET (C#), Django (Python), Angular (JS)'],
  ]],
  ['kv', [
    ['Bibliothek einbinden', 'Meist über einen **Paketmanager**: Maven/Gradle (Java), NuGet (C#), pip (Python), npm (JavaScript). Abhängigkeiten werden automatisch geladen.'],
    ['Abhängigkeiten (Dependencies)', 'Jede Bibliothek braucht oft weitere. Veraltete oder unsichere Abhängigkeiten sind ein **Sicherheitsrisiko** (Supply-Chain-Angriffe).'],
    ['Vendor-Lock-in', 'Starke Abhängigkeit von einem Hersteller, sodass ein Wechsel teuer wird.'],
  ]],
  ['h3', 'Kriterien für Frameworks und Bibliotheken'],
  ['list', ['**Reife und Stabilität:** Wie lange gibt es sie, wie oft gibt es Updates?', '**Dokumentation und Community:** Gibt es Hilfe bei Problemen?', '**Lizenz:** Ist sie mit unserem Produkt vereinbar (GPL-Falle)?', '**Sicherheit:** Werden Schwachstellen behoben?', '**Performance und Eignung** für den Anwendungsfall.', '**Lernaufwand** und vorhandenes Know-how.', '**Wartbarkeit und Langlebigkeit:** Was passiert, wenn das Projekt eingestellt wird?']],
  ['h', 'Entwicklungs-, Test- und Produktivumgebung'],
  ['diagram', AP2.dg.flow(['Entwicklung (DEV)', 'Test / Staging', 'Produktion (PROD)'], {w: 720, h: 110, styles: ['soft', 'accent', 'ok'], edgeText: ['freigeben', 'ausliefern (Deployment)'], cap: 'Software wandert durch mehrere Umgebungen. Fehler sollen vor der Produktion auffallen.'})],
  ['p', '**DEV** ist die Umgebung des Entwicklers (Testdaten, viele Änderungen). **TEST/STAGING** ist der Produktion so ähnlich wie möglich nachgebaut, um realistische Tests durchzuführen. **PROD** ist das echte System mit echten Nutzern und Daten. **Wichtig:** Niemals in der Produktion testen und echte personenbezogene Daten nicht ungeschützt in Testumgebungen verwenden (DSGVO).'],
  ['h', 'Entscheidung mit Nutzwertanalyse'],
  ['table', ['Kriterium', 'Gewicht', 'Framework A', 'Framework B'], [
    ['Eignung für das Projekt', '40 %', '5 (2,0)', '4 (1,6)'], ['Lizenz und Kosten', '25 %', '4 (1,0)', '5 (1,25)'], ['Community / Doku', '20 %', '5 (1,0)', '3 (0,6)'], ['Team-Know-how', '15 %', '3 (0,45)', '5 (0,75)'], ['**Summe**', '100 %', '**4,45**', '4,20'],
  ], {mark: [4]}],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Nennen Sie vier Kriterien, nach denen ein Unternehmen eine Entwicklungsumgebung auswählt.', ['- Unterstützte Programmiersprachen und Plattformen', '- Funktionsumfang (Debugger, Refactoring, Versionsverwaltung)', '- Kosten und Lizenzbedingungen', '- Vorhandenes Know-how im Team und Einarbeitungsaufwand', '- Erweiterbarkeit, Support und Zukunftssicherheit'], 4],
  ['qa', 'Erklären Sie den Unterschied zwischen einer Bibliothek und einem Framework.', 'Bei einer **Bibliothek** ruft der eigene Code gezielt Funktionen auf, der Entwickler behält die Kontrolle über den Ablauf. Bei einem **Framework** gibt das Framework den Programmablauf und die Struktur vor und ruft den eigenen Code an definierten Stellen auf (Inversion of Control).', 4],
  ['quiz', [
    {q: 'Was ist Inversion of Control?', o: ['Das Framework ruft den Code des Entwicklers auf', 'Der Entwickler ruft immer alles selbst auf', 'Man kehrt Zeichenketten um', 'Man sortiert Listen rückwärts'], a: 0, e: 'Bei Frameworks kehrt sich die Kontrolle um: Das Framework steuert den Ablauf.'},
    {q: 'Wofür steht IDE?', o: ['Integrated Development Environment', 'Internet Data Exchange', 'Internal Debug Engine', 'Input Device Emulator'], a: 0, e: 'Integrierte Entwicklungsumgebung.'},
    {q: 'Welches Werkzeug lädt Abhängigkeiten in einem Java-Projekt automatisch?', o: ['Maven oder Gradle', 'Photoshop', 'Excel', 'Wireshark'], a: 0, e: 'Build-Werkzeuge wie Maven oder Gradle verwalten Abhängigkeiten.'},
    {q: 'In welcher Umgebung sollte man NICHT neue, ungetestete Software ausprobieren?', o: ['Produktion', 'Entwicklung', 'Test', 'Staging'], a: 0, e: 'Neue Software wird in DEV und TEST geprüft, nicht im Produktivbetrieb.'},
  ]],
]);
