AP2.page('eua-debugging', {
  b: 'eua', g: 'Fehlerbehandlung', t: 'Debugging-Grundlagen: Fehlerarten, Debugger und Stack Trace',
  d: '**Debugging** ist das systematische Identifizieren, Lokalisieren und Beheben von Softwarefehlern (Bugs). In der Softwareentwicklung unterscheidet man drei Fehlerkategorien: **Syntaxfehler** (vom Compiler/Linter sofort erkannt), **Laufzeitfehler** (Exceptions führen zum Absturz während der Ausführung) und **Logikfehler** (das Programm läuft ohne Absturz durch, berechnet aber falsche Ergebnisse). Wichtigstes Werkzeug ist der **interaktive Debugger** mit **Breakpoints (Haltepunkten)**, **Einzelschritt-Steuerung** und **Variableninspektion**.',
  m: '**Fehlerarten:** Syntaxfehler (Compiler meckert) vs. Laufzeitfehler (Absturz / Exception) vs. Logikfehler (falsches Ergebnis, am schwersten zu finden!). **Debugger-Steuerung:** Breakpoint = Anhalten; Step Over = Zeile ausführen; Step Into = in Funktion hineinspringen; Step Out = aus Funktion herausspringen; Watch = Variable beobachten. **Stack Trace:** Von unten nach oben lesen; die oberste eigene Codezeile zeigt den Fehlerort.',
  cheat: [
    ['Die 3 Fehlerarten', [
      '**Syntaxfehler:** Grammatikfehler in der Programmiersprache (fehlende Semikolons, falsche Klammern); wird vor der Ausführung vom Compiler gemeldet',
      '**Laufzeitfehler (Runtime Error):** Unerwarteter Zustand führt zum Abbruch (`NullPointerException`, `IndexOutOfBoundsException`, Division durch Null)',
      '**Logikfehler:** Programm läuft fehlerfrei durch, verhält sich aber fachlich falsch (`<` statt `<=`, falsche Berechnungsformel)',
    ]],
    ['Debugger-Funktionen', [
      '**Breakpoint (Haltepunkt):** Hält die Programmausführung an einer bestimmten Zeile an',
      '**Conditional Breakpoint:** Hält nur an, wenn eine Bedingung erfüllt ist (z. B. `kundenId == 99`)',
      '**Step Over (F10):** Führt die aktuelle Zeile aus, ohne in Methoden hineinzuspringen',
      '**Step Into (F11):** Verzweigt direkt in den Rumpf der aufgerufenen Methode',
      '**Step Out (Shift+F11):** Führt den Rest der aktuellen Methode aus und springt zum Aufrufer zurück',
      '**Call Stack (Aufrufstapel):** Zeigt die Kette aller aktiven Funktionsaufrufe',
    ]],
    ['Systematischer Debugging-Zyklus', [
      '1. **Reproduzieren:** Genaue Schritte und Testdaten ermitteln, die den Bug verlässlich auslösen',
      '2. **Eingrenzen:** Relevante Code-Stelle über Stack Trace, Logging oder Breakpoints finden',
      '3. **Hypothese aufstellen:** Ursache vermuten („Warum weicht der Wert ab?“)',
      '4. **Beheben:** Gezielte Codekorrektur (immer nur eine Änderung gleichzeitig)',
      '5. **Automatisieren:** Regressionstest (Unit-Test) schreiben, damit der Fehler nie wiederkehrt',
    ]],
  ],
  blocks: [
    ['h', 'Die drei Fehlerarten im Vergleich'],
    ['p', 'Jeder Softwareentwickler begegnet täglich unterschiedlichen Fehlerarten. Die Behebungsmethoden unterscheiden sich fundamental:'],
    ['table', ['Fehlerart', 'Wann bemerkt?', 'Typische Ursache', 'Behebung'], [
      ['**Syntaxfehler**', 'Vor der Ausführung (beim Kompilieren oder Speichern)', 'Tippfehler bei Schlüsselwörtern, fehlende geschweifte Klammern, unvollständige Anweisungen', 'Fehlermeldung des Compilers / IDE-Linter lesen und Syntax korrigieren'],
      ['**Laufzeitfehler (Exception)**', 'Während der Programmausführung (plötzlicher Absturz)', 'Zugriff auf `null` (NullPointer), Division durch 0, Datei existiert nicht, ungültiger Array-Index', 'Defensive Programmierung (`if (obj != null)`), Ausnahmebehandlung (`try-catch`)'],
      ['**Logikfehler (Semantikfehler)**', 'Erst durch Testfälle oder Beschwerden von Fachanwendern', 'Falscher Algorithmus, falsche Zählgrenzen (Off-by-One), Operatorverwechslung (`AND` statt `OR`)', 'Debugger, Schreibtischtest, Unit-Tests mit Grenzwerten'],
    ]],
    ['h', 'Der Stack Trace: Die Spur des Fehlers'],
    ['p', 'Stürzt ein Programm durch eine Exception ab, gibt die Laufzeitumgebung einen **Stack Trace (Aufrufstapel)** aus. Er zeigt genau, welche Methodenaufrufe zum Fehler geführt haben:'],
    ['code', 'text', `Exception in thread "main" java.lang.NullPointerException: Cannot invoke "Kunde.getName()" because "k" is null
    at de.ihk.shop.RechnungService.druckeRechnung(RechnungService.java:42)
    at de.ihk.shop.BestellController.abschliessen(BestellController.java:18)
    at de.ihk.shop.Main.main(Main.java:10)`],
    ['steps', [
      '**Exception-Typ lesen:** `NullPointerException` bedeutet: Eine Variable war `null`, es wurde aber eine Methode darauf aufgerufen.',
      '**Fehlerzeile lokalisieren:** Die oberste eigene Zeile ist `RechnungService.java:42`. Genau in Zeile 42 steht der auslösende Methodenaufruf.',
      '**Aufrufkette zurückverfolgen:** Zeile 42 wurde aufgerufen aus `BestellController.java:18`, und dieser aus `Main.java:10`.',
      '**Ursache klären:** Warum war `k` in Zeile 42 `null`? Woher stammte das Objekt?',
    ]],
    ['h', 'Die Werkzeuge des Debuggers'],
    ['table', ['Werkzeug', 'Funktionsweise', 'Wann wird es eingesetzt?'], [
      ['**Breakpoint**', 'Pausiert den Thread an der Codezeile; Speicherzustand wird eingefroren', 'Direkt vor dem vermuteten Fehlercode'],
      ['**Conditional Breakpoint**', 'Hält nur an, wenn eine Bedingung wahr ist (z. B. `i == 1000` oder `name.equals("Meier")`)', 'In Schleifen mit tausenden Durchläufen, wenn der Bug nur bei einem bestimmten Element auftritt'],
      ['**Step Over**', 'Führt die Zeile aus; Methodenaufrufe laufen im Hintergrund durch', 'Wenn man weiß, dass die aufgerufene Methode fehlerfrei ist'],
      ['**Step Into**', 'Springt in die erste Anweisung der aufgerufenen Methode', 'Wenn man den Verdacht hat, dass der Fehler innerhalb der Unterfunktion liegt'],
      ['**Step Out**', 'Führt die aktuelle Methode fertig aus und springt zum Aufrufer zurück', 'Wenn man versehentlich in eine fremde Framework-Methode hineingesprungen ist'],
      ['**Watch Expression**', 'Ermöglicht das Überwachen komplexer Ausdrücke (z. B. `kunden.size()`) in Echtzeit', 'Verfolgen von Statusänderungen über mehrere Schritte hinweg'],
    ]],
    ['h', 'Wörter, die in der Prüfung vorkommen'],
    ['table', ['Wort', 'Einfach erklärt'], [
      ['Bug', 'Umgangssprachlich für einen Programmierfehler'],
      ['Breakpoint (Haltepunkt)', 'Markierung im Quellcode, an der der Debugger die Ausführung anhält'],
      ['Stack Trace', 'Protokoll der verschachtelten Methodenaufrufe zum Zeitpunkt eines Absturzes'],
      ['Call Stack', 'Der Speicherstapel, der alle aktuell aktiven Funktionsaufrufe verwaltet'],
      ['Step Over / Step Into', 'Befehle zur kontrollierten Einzelschrittausführung im Debugger'],
      ['Regressionstest', 'Test, der sicherstellt, dass ein behobener Fehler in späteren Versionen nicht wieder auftritt'],
    ]],
    ['see', ['eua-exceptions', 'eua-unittest', 'eua-testfaelle', 'eua-cleancode']],
  ],
});
