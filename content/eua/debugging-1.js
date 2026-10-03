AP2.page('eua-debugging', {
  b: 'eua', g: 'Fehlerbehandlung', t: 'Debugging-Grundlagen',
  d: '**Debugging** ist das **systematische Suchen und Beseitigen von Fehlern (Bugs)**. Man unterscheidet **Syntaxfehler** (Code ist falsch geschrieben, Compiler meldet), **Laufzeitfehler** (Programm bricht beim Ausführen ab) und **Logikfehler** (Programm läuft, liefert aber ein falsches Ergebnis). Werkzeuge: **Debugger** (Haltepunkte, Einzelschritt, Variablen beobachten), **Logging**, **Schreibtischtest**, **Stack Trace**.',
  m: '**Reproduzieren - Eingrenzen - Ursache finden - Beheben - Testen.** Debugger: **Haltepunkt** (anhalten), **Step Over** (Zeile ausführen), **Step Into** (in Methode hineingehen), **Step Out** (Methode verlassen), **Watch** (Variable beobachten). Das **Rubber-Duck-Prinzip:** Erkläre das Problem laut einer Gummiente.',
  cheat: [
    ['Fehlerarten', ['**Syntaxfehler:** Compiler/Interpreter meldet (Semikolon, Klammer)', '**Laufzeitfehler:** Absturz/Exception (null, Division durch 0, Index)', '**Logikfehler:** falsches Ergebnis, am schwersten zu finden']],
    ['Debugger-Befehle', ['**Haltepunkt (Breakpoint)** setzen', '**Step Over** (F10): Zeile ausführen', '**Step Into** (F11): in Aufruf hineingehen', '**Step Out:** Methode verlassen', '**Continue:** bis nächster Haltepunkt', '**Watch / Variablenfenster**, **Call Stack**']],
    ['Methodik', ['**Reproduzierbar** machen', '**Hypothese** aufstellen und prüfen', '**Eingrenzen** (Halbieren, "Binärsuche" im Code)', 'Eine Änderung nach der anderen', 'Nach dem Fix: **Regressionstest** schreiben']],
    ['Weitere Mittel', ['**Logging / Ausgaben**', '**Schreibtischtest**', '**Stack Trace** lesen', '**Unit-Tests**', '**Code-Review**, Rubber Duck']],
  ],
  blocks: [
    ['h', 'Fehlerarten'],
    ['table', ['Fehlerart', 'Wann bemerkt?', 'Beispiel', 'Gefunden durch'], [
      ['**Syntaxfehler**', 'Beim Übersetzen/Start', 'fehlendes Semikolon, Klammer vergessen, falsch geschriebenes Schlüsselwort', 'Compiler, IDE-Markierung'],
      ['**Laufzeitfehler**', 'Beim Ausführen (Absturz)', 'Division durch 0, Zugriff auf `null`, Index außerhalb des Arrays, Datei nicht vorhanden', 'Exception, Stack Trace'],
      ['**Logikfehler**', 'Programm läuft, Ergebnis stimmt nicht', '`<` statt `<=`, falsche Formel, Schleife startet bei 1 statt 0', 'Tests, Schreibtischtest, Debugger'],
    ]],
    ['code', 'java', `// Logikfehler: Durchschnitt wird falsch berechnet
int summe = 0;
for (int i = 0; i < zahlen.length; i++) summe += zahlen[i];
double durchschnitt = summe / zahlen.length;      // BUG: Ganzzahldivision! 7 / 2 = 3
// Richtig: (double) summe / zahlen.length;`],
    ['h', 'Der Debugger'],
    ['p', 'Ein **Debugger** (in jeder IDE) führt das Programm **kontrolliert** aus. Man setzt einen **Haltepunkt (Breakpoint)** in eine Zeile. Das Programm **stoppt dort**, und man kann **alle Variablen ansehen**, Schritt für Schritt weitergehen und den **Aufrufstack** betrachten. So sieht man, **wo** die Werte von der Erwartung abweichen.'],
    ['table', ['Befehl', 'Wirkung', 'Wann nutzen?'], [
      ['**Breakpoint**', 'Programm hält an dieser Zeile an', 'Dort, wo man den Zustand prüfen will'],
      ['**Step Over**', 'Zeile ausführen, Methodenaufrufe **als Ganzes** überspringen', 'Methode ist unverdächtig'],
      ['**Step Into**', 'In die aufgerufene Methode **hineinspringen**', 'Fehler wird in der Methode vermutet'],
      ['**Step Out**', 'Aktuelle Methode zu Ende ausführen und zum Aufrufer zurück', 'Man ist zu tief gegangen'],
      ['**Continue / Resume**', 'Bis zum nächsten Breakpoint weiterlaufen', 'Schleifen überspringen'],
      ['**Watch / Variablen**', 'Werte und Ausdrücke beobachten', 'Wert einer Variable verfolgen'],
      ['**Conditional Breakpoint**', 'Hält nur an, wenn Bedingung wahr (`i == 500`)', 'Fehler tritt erst bei bestimmtem Wert auf'],
      ['**Call Stack**', 'Zeigt, wer wen aufgerufen hat', 'Herkunft eines Aufrufs klären'],
    ]],
  ],
});
