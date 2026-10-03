AP2.add('eua-debugging', [
  ['h', 'Systematisch vorgehen'],
  ['steps', ['**Fehler reproduzieren:** Unter welchen Bedingungen und mit welchen Eingaben tritt er auf? Ohne Reproduzierbarkeit kann man ihn nicht sicher beheben.', '**Fehlermeldung und Stack Trace lesen:** Welche Exception, welche Zeile? Die oberste eigene Codezeile im Stack Trace ist meist der Einstieg.', '**Eingrenzen:** In welchem Teil des Programms liegt der Fehler? Hilfreich: den Code **halbieren** (Ausgaben oder Haltepunkte in der Mitte setzen: Stimmt der Zustand schon hier?).', '**Hypothese bilden:** "Die Schleife läuft einmal zu oft." Mit Debugger oder Ausgabe **prüfen**.', '**Ursache beheben**, nicht nur das Symptom. Immer **eine Änderung auf einmal**.', '**Testen:** Fehler weg? Nichts anderes kaputt? Einen **Test schreiben**, der den Fehler künftig verhindert (Regressionstest).']],
  ['h', 'Weitere Hilfsmittel'],
  ['kv', [
    ['Logging', 'Das Programm schreibt **Meldungen** mit Zeit und Stufe (DEBUG, INFO, WARN, ERROR) in eine Datei. Besonders wichtig bei **Servern**, wo kein Debugger angeschlossen werden kann. Keine **Passwörter oder personenbezogene Daten** loggen (DSGVO).'],
    ['Ausgaben (print)', 'Schneller Einstieg: `System.out.println("i=" + i);`. Später entfernen oder durch Logging ersetzen.'],
    ['Schreibtischtest', 'Den Code **von Hand** mit einfachen Werten durchrechnen (Variablentabelle). Hilft bei kleinen Algorithmen.'],
    ['Assertions', 'Prüfungen im Code, die **Annahmen** festhalten (`assert alter >= 0`). Schlagen sie fehl, ist ein Programmierfehler gefunden.'],
    ['Rubber-Duck-Debugging', 'Man **erklärt** das Problem Zeile für Zeile einer Gummiente (oder Kollegen). Beim Erklären fällt der Fehler oft auf.'],
    ['Statische Codeanalyse', 'Werkzeuge (Linter, SonarQube) finden mögliche Fehler **ohne Ausführung** (nicht initialisierte Variablen, tote Code-Teile).'],
    ['Versionsverwaltung', '`git bisect` und `git diff` helfen, **die Änderung zu finden**, die den Fehler eingeführt hat.'],
  ]],
  ['h', 'Typische Fehlerquellen'],
  ['list', ['**Off-by-one:** Schleife läuft einmal zu viel/wenig, Array-Grenzen (`<` statt `<=`).', '**Ganzzahldivision** statt Kommadivision.', '**`=` statt `==`**, bei Strings `==` statt `equals`.', '**Nicht initialisierte Variablen** und **`null`-Zugriffe**.', '**Falscher Gültigkeitsbereich** (lokale Variable überdeckt Attribut).', '**Seiteneffekte** und gemeinsame Referenzen (zwei Variablen zeigen auf dasselbe Objekt).', '**Rundungsfehler** bei Gleitkomma, **Überlauf** bei int.', '**Nebenläufigkeit:** Race Conditions (schwer reproduzierbar).']],
  ['h', 'Ein Debugging-Beispiel durchgespielt'],
  ['code', 'java', `static int summeBis(int n) {
    int summe = 0;
    for (int i = 1; i < n; i++) {      // Fehler?
        summe += i;
    }
    return summe;
}
// Erwartet: summeBis(5) = 15 (1+2+3+4+5). Tatsächlich: 10.`],
  ['table', ['Schritt', 'Beobachtung / Gedanke'], [['1', 'Reproduzieren: `summeBis(5)` liefert 10 statt 15. Differenz = 5, also fehlt genau der Wert n.'], ['2', 'Hypothese: Die Schleife endet zu früh (`i < n` statt `i <= n`).'], ['3', 'Debugger: Haltepunkt in der Schleife, Variable `i` beobachten: i läuft nur 1, 2, 3, 4. Hypothese bestätigt.'], ['4', 'Fix: `i <= n`. Neuer Test: `summeBis(5) == 15`, `summeBis(1) == 1`, `summeBis(0) == 0`.']]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Nennen Sie die drei Arten von Programmfehlern und je ein Beispiel.', ['- **Syntaxfehler:** fehlendes Semikolon oder falsch geschriebenes Schlüsselwort (der Compiler meldet ihn).', '- **Laufzeitfehler:** Division durch 0, Zugriff auf null (das Programm bricht ab).', '- **Logikfehler:** falsche Bedingung (`<` statt `<=`), das Programm läuft, liefert aber falsche Ergebnisse.'], 6],
  ['qa', 'Welche Möglichkeiten bietet ein Debugger? Nennen Sie vier.', ['- **Haltepunkte** setzen und das Programm dort anhalten', '- **Schrittweise Ausführung** (Step Over, Step Into, Step Out)', '- **Variablenwerte** anzeigen und beobachten (Watch)', '- Den **Aufrufstack** betrachten, Werte zur Laufzeit ändern, bedingte Haltepunkte'], 4],
  ['qa', 'Ein Programm gibt für die Eingabe 3 und 4 den Durchschnitt 3 statt 3,5 aus. Welcher Fehler liegt vermutlich vor und wie beheben Sie ihn?', 'Vermutlich eine **Ganzzahldivision**: `(3 + 4) / 2` mit int-Werten ergibt 3. Beheben: einen Operanden in `double` umwandeln (`(3 + 4) / 2.0` oder `(double) summe / anzahl`) und das Ergebnis in einer double-Variablen speichern. Danach Test mit mehreren Werten.', 4],
  ['qa', 'Warum ist Logging in produktiven Systemen wichtig und worauf muss man achten?', 'Auf Produktionssystemen kann man meist keinen Debugger anschließen. **Logdateien** zeigen, **was zum Zeitpunkt des Fehlers passierte** (Zeit, Stufe, Meldung, Stack Trace). Man muss darauf achten, **keine Passwörter oder unnötigen personenbezogenen Daten** zu protokollieren (DSGVO) und Logs vor unbefugtem Zugriff zu schützen.', 4],
  ['quiz', [
    {q: 'Was ist ein Logikfehler?', o: ['Das Programm läuft, liefert aber ein falsches Ergebnis', 'Der Compiler meldet einen Fehler', 'Das Programm stürzt sofort ab', 'Der Rechner ist kaputt'], a: 0, e: 'Logikfehler sind am schwersten zu finden, da keine Fehlermeldung erscheint.'},
    {q: 'Was bewirkt Step Into?', o: ['Springt in die aufgerufene Methode hinein', 'Überspringt die Methode', 'Beendet das Programm', 'Löscht den Haltepunkt'], a: 0, e: 'Step Over überspringt den Aufruf, Step Into geht hinein.'},
    {q: 'Was ist ein Haltepunkt (Breakpoint)?', o: ['Eine Stelle, an der der Debugger das Programm anhält', 'Ein Programmende', 'Ein Fehlertyp', 'Eine Datei'], a: 0, e: 'Dort kann man den Zustand des Programms prüfen.'},
    {q: 'Was sollte man als Erstes tun, wenn ein Fehler gemeldet wird?', o: ['Den Fehler reproduzieren', 'Das Programm neu schreiben', 'Alle Dateien löschen', 'Nichts'], a: 0, e: 'Ohne Reproduktion ist die Ursache schwer zu finden und die Korrektur nicht überprüfbar.'},
    {q: 'Wofür nutzt man den Stack Trace?', o: ['Um die Aufrufkette bis zum Fehler zu sehen', 'Um Passwörter zu speichern', 'Um Daten zu sortieren', 'Um das Netzwerk zu testen'], a: 0, e: 'Er zeigt Methodenaufrufe und Zeilennummern.'},
  ]],
]);
