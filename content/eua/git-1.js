AP2.page('eua-git', {
  b: 'eua', g: 'Softwareentwicklung', t: 'Versionsverwaltung mit Git: Branches, Merging und Konflikte',
  d: '**Git** ist das weltweit führende **verteilte Versionsverwaltungssystem (DVCS)** für Softwareentwicklung. Jeder Entwickler besitzt eine vollständige Kopie des gesamten Projektverlaufs auf seinem Rechner. Git unterscheidet drei lokale Arbeitsbereiche: **Working Directory** (Arbeitsverzeichnis mit unversionierten Dateien), **Staging Area / Index** (vorgemerkte Änderungen via `git add`) und das **lokale Repository** (dauerhafte Schnappschüsse via `git commit`). Über **Branches (Zweige)** wird parallel an Features gearbeitet, die später per **Merge** oder **Rebase** zusammengeführt werden.',
  m: '**Die 3 Zonen:** Working Tree (Datei ändern) -> **`git add`** -> Staging Area -> **`git commit -m "..."`** -> Lokales Repo -> **`git push`** -> Remote Repo (GitHub/GitLab). **Branching:** `git switch -c feature` oder `git checkout -b feature`. **Merge:** Fast-Forward (linear) versus 3-Way-Merge (mit Merge-Commit). **Merge-Konflikt:** Wenn dieselbe Zeile auf zwei Branches unterschiedlich geändert wurde; muss manuell aufgelöst und committet werden.',
  cheat: [
    ['Wichtigste Git-Befehle', [
      '**`git init` / `git clone <url>`:** Neues Repo anlegen oder bestehendes aus dem Netz klonen',
      '**`git status`:** Zeigt geänderte, gestagte und unversionierte Dateien an',
      '**`git add <datei>` / `git add .`:** Änderungen in die Staging Area (Index) übernehmen',
      '**`git commit -m "Nachricht"`:** Gestagte Änderungen dauerhaft als Version festschreiben',
      '**`git log --oneline --graph`:** Historie der Commits visualisieren',
      '**`git diff`:** Unterschiede zwischen Arbeitsverzeichnis und Staging Area anzeigen',
    ]],
    ['Branching & Merging', [
      '**`git branch <name>`:** Neuen Zweig erstellen',
      '**`git switch <name>` (oder `git checkout <name>`):** Auf einen anderen Zweig wechseln',
      '**`git switch -c <name>`:** Neuen Branch erstellen und sofort darauf wechseln',
      '**`git merge <feature>`:** Bringt die Änderungen aus dem Feature-Branch in den aktuellen Branch',
      '**`git branch -d <name>`:** Fertig gemergten Branch löschen',
    ]],
    ['Arbeiten mit Remote Repositories', [
      '**`git remote -v`:** Verknüpfte Online-Server (z. B. origin) anzeigen',
      '**`git fetch`:** Neue Commits vom Server herunterladen, aber noch nicht in lokale Dateien einbinden',
      '**`git pull`:** `fetch` und `merge` in einem Schritt (aktualisiert den lokalen Branch)',
      '**`git push -u origin <branch>`:** Lokale Commits auf den Server hochladen',
    ]],
    ['Konfliktlösung (Merge Conflict)', [
      '1. Git meldet: `CONFLICT (content): Merge conflict in datei.js`',
      '2. Datei öffnen und Konfliktmarker suchen: `<<<<<<< HEAD` (lokaler Stand) vs `>>>>>>> feature` (Zweig-Stand)',
      '3. Gewünschten Code behalten, Konfliktmarker vollständig löschen',
      '4. `git add datei.js` und `git commit` zum Abschließen des Merges',
    ]],
  ],
  blocks: [
    ['h', 'Die drei Zonen von Git: Vom Code zum Commit'],
    ['p', 'Im Gegensatz zu älteren Systemen wie SVN arbeitet Git mit drei lokalen Stufen, bevor Daten auf einen Server übertragen werden:'],
    ['table', ['Zone / Zustand', 'Bedeutung & Befehl', 'Zustand der Dateien'], [
      ['**1. Working Tree (Arbeitsverzeichnis)**', 'Der normale Dateiordner auf deiner Festplatte, in dem du Code schreibst und Dateien anlegst', 'Dateien sind **untracked** (neu) oder **modified** (geändert)'],
      ['**2. Staging Area (Index)**', 'Vorbereitungsbereich: Hier legst du fest, welche Änderungen in den nächsten Commit gehören (`git add datei.js`)', 'Dateien sind **staged** (vorgemerkt)'],
      ['**3. Local Repository (HEAD)**', 'Die lokale Git-Datenbank (`.git`), in der alle Schnappschüsse manipulationssicher gespeichert sind (`git commit -m "feat: login"`)', 'Dateien sind **committed** (festgeschrieben)'],
      ['**4. Remote Repository**', 'Zentraler Server im Netz (GitHub, GitLab, Bitbucket), auf den das Team pusht (`git push`)', 'Synchronisiert mit anderen Entwicklern'],
    ]],
    ['h', 'Fast-Forward-Merge versus 3-Way-Merge'],
    ['p', 'Wenn zwei Branches zusammengeführt werden, entscheidet Git je nach Historie über die Merge-Strategie:'],
    ['table', ['Merge-Art', 'Wann tritt sie auf?', 'Was macht Git?', 'Gibt es einen Merge-Commit?'], [
      ['**Fast-Forward-Merge**', 'Auf dem Zielbranch (z. B. `main`) gab es seit dem Abzweigen des Feature-Branches **keine neuen Commits**.', 'Git schiebt den Zeiger von `main` einfach linear nach vorne auf die Spitze des Feature-Branches.', '**Nein**, kein zusätzlicher Commit nötig; die Historie bleibt schnurgerade.'],
      ['**3-Way-Merge (Drei-Wege-Merge)**', 'Auf `main` und auf dem `feature`-Branch wurden **beide gleichzeitig neue Commits** erstellt (die Historie hat sich gegabelt).', 'Git vergleicht drei Stände: Den gemeinsamen Ahnen (Base), den aktuellen Stand von `main` und den Stand von `feature`.', '**Ja**, Git erzeugt automatisch einen neuen **Merge-Commit**, der zwei Eltern-Commits hat.'],
    ]],
    ['h', 'Wie entsteht ein Merge-Konflikt und wie löst man ihn?'],
    ['p', 'Ein **Merge-Konflikt** entsteht, wenn Entwickler A auf Branch `main` und Entwickler B auf Branch `feature` **dieselbe Zeile in derselben Datei unterschiedlich geändert haben**. Git kann nicht erraten, welche Zeile die richtige ist, und bricht den automatischen Merge ab.'],
    ['code', 'text', `// In der betroffenen Datei entstehen Konfliktmarker:
<<<<<<< HEAD
const apiUrl = "https://api.produktiv-server.de/v1";
=======
const apiUrl = "https://staging-api.testserver.de/v2";
>>>>>>> feature-backend-v2`],
    ['steps', [
      '**Konflikt erkennen:** Die Git-Konsole meldet `Automatic merge failed; fix conflicts and then commit the result.`.',
      '**Dateien öffnen:** Die betroffenen Dateien im Editor öffnen und nach `<<<<<<< HEAD` suchen.',
      '**Entscheiden:** Mit dem Team abstimmen, welcher Code gültig ist (oder beide Stände kombinieren).',
      '**Marker löschen:** Alle Steuerzeilen (`<<<<<<<`, `=======`, `>>>>>>>`) restlos aus der Datei entfernen.',
      '**Stagen und Committen:** `git add <datei>` ausführen und mit `git commit` den Konfliktlösungs-Commit abschließen.',
    ]],
    ['h', 'Gitflow: Der bewährte Branching-Workflow'],
    ['p', 'In professionellen Entwicklerteams wird meist nach festen Regeln verzweigt (z. B. Gitflow-Workflow):'],
    ['table', ['Branch-Name', 'Aufgabe und Lebensdauer', 'Wer darf direkt darauf committen?'], [
      ['**`main` (oder `master`)**', 'Enthält ausschließlich **produktionsreifen, getesteten Live-Code**. Jeder Commit hier entspricht einem Release.', 'Niemand direkt! Änderungen fließen nur über geprüfte Pull Requests (PRs) ein.'],
      ['**`develop`**', 'Integrationszweig: Hier fließen alle neuen Features für die nächste Version zusammen.', 'Entwickler mergen ihre fertigen Features hierhin.'],
      ['**`feature/<name>`**', 'Wird von `develop` abgezweigt für ein einzelnes Feature (z. B. `feature/warenkorb`). Wird nach Fertigstellung gelöscht.', 'Der/die zuständige/n Entwickler.'],
      ['**`hotfix/<name>`**', 'Dringender Bugfix für einen kritischen Fehler in der Produktion; wird direkt von `main` abgezweigt und nach Reparatur in `main` und `develop` gemergt.', 'Schnelle Fehlerbehebung für Notfälle.'],
    ]],
    ['tip', 'Prüfungsfrage „Was ist ein Pull Request (PR) bzw. Merge Request?“: Ein Pull Request ist eine Aufforderung an andere Teammitglieder, den Code eines Feature-Branches vor dem Mergen zu prüfen (**Code Review**). Dabei werden automatische Tests (CI/CD) ausgeführt und Kollegen können Kommentare und Verbesserungsvorschläge direkt an den Codezeilen hinterlassen.'],
    ['h', 'Wörter, die in der Prüfung vorkommen'],
    ['table', ['Wort', 'Einfach erklärt'], [
      ['Commit', 'Ein dauerhaft gespeicherter Schnappschuss (Version) des Projekts mit Autor und Zeitstempel'],
      ['Staging Area (Index)', 'Vorbereitungsbereich, um festzulegen, welche Änderungen in den nächsten Commit kommen'],
      ['Branch (Zweig)', 'Abspaltung vom Hauptcode, um isoliert an einem Feature zu arbeiten'],
      ['Merge', 'Zusammenführen von zwei Zweigen zu einem gemeinsamen Stand'],
      ['Fast-Forward', 'Einfaches Vorrücken des Branch-Zeigers ohne separaten Merge-Commit'],
      ['Merge-Konflikt', 'Widerspruch, wenn zwei Entwickler dieselben Codezeilen unterschiedlich geändert haben'],
      ['Repository (Repo)', 'Das Verzeichnis, das alle Projektdateien inklusive der gesamten Versionshistorie enthält'],
      ['Pull Request (Code Review)', 'Prüfung und Freigabe von Quellcode durch Teammitglieder vor dem Einfügen in den Hauptzweig'],
    ]],
    ['see', ['eua-cleancode', 'eua-unittest', 'eua-debugging', 'ps-vorgehen']],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Ein Auszubildender möchte ein neues Modul für die Benutzerregistrierung programmieren. Nennen Sie die Git-Befehle, um: a) einen neuen Branch namens „feature-register“ anzulegen und darauf zu wechseln, b) die geänderte Datei „RegisterForm.js“ für den Commit vorzumerken, c) den Commit mit der Nachricht „feat: registration form added“ zu speichern, und d) den neuen Branch auf den Remote-Server origin hochzuladen.', [
      '- a) `git switch -c feature-register` (oder `git checkout -b feature-register`)',
      '- b) `git add RegisterForm.js`',
      '- c) `git commit -m "feat: registration form added"`',
      '- d) `git push -u origin feature-register`',
      'Je Teilaufgabe 1 Punkt, zusammen 4 Punkte.',
    ], 4],
    ['qa', 'Erklären Sie den Unterschied zwischen einem Fast-Forward-Merge und einem 3-Way-Merge. Wann kann Git keinen Fast-Forward-Merge durchführen?', [
      '- Ein **Fast-Forward-Merge** ist möglich, wenn auf dem Zielzweig (z. B. `main`) seit dem Abzweigen des Feature-Branches keine neuen Commits hinzugekommen sind. Git verschiebt einfach den Zeiger von `main` auf den letzten Commit des Feature-Branches, ohne einen neuen Merge-Commit zu erzeugen.',
      '- Ein **3-Way-Merge** wird nötig, wenn auf **beiden Branches parallel neue Commits** entstanden sind. Git vergleicht den gemeinsamen Ursprungs-Commit mit den beiden Spitzen und erstellt automatisch einen neuen **Merge-Commit**, der zwei Eltern hat.',
    ], 4],
    ['qa', 'Was ist ein Merge-Konflikt in Git, wie entsteht er und welche Schritte sind zu seiner Behebung erforderlich?', [
      '- **Entstehung:** Ein Merge-Konflikt entsteht, wenn in zwei Branches dieselbe Zeile in derselben Datei unterschiedlich modifiziert wurde und Git die Änderungen nicht automatisch zusammenführen kann.',
      '- **Lösungsschritte:** (1) Betroffene Dateien öffnen, (2) Konfliktmarker (`<<<<<<<`, `=======`, `>>>>>>>`) lokalisieren und den korrekten Code manuell auswählen, (3) alle Markierungszeichen entfernen, (4) Datei mit `git add` stagen und (5) den Merge mit `git commit` abschließen.',
    ], 5],
    ['quiz', [
      {q: 'Mit welchem Befehl übernimmt man Änderungen aus dem Arbeitsverzeichnis in die Staging Area?', o: ['git add', 'git commit', 'git push', 'git checkout'], a: 0, e: '`git add <datei>` markiert Änderungen für den nächsten Commit.'},
      {q: 'Was zeichnet einen Fast-Forward-Merge aus?', o: ['Es wird kein neuer Merge-Commit erstellt, sondern nur der Branch-Zeiger verschoben', 'Er löscht alle Commits des Feature-Branches', 'Er tritt nur bei Merge-Konflikten auf', 'Er funktioniert nur mit GitHub Enterprise'], a: 0, e: 'Bei linearer Historie rückt Git den Zeiger einfach vor (Fast-Forward).'},
      {q: 'Was bedeuten die Marker <<<<<<< HEAD und >>>>>>> in einer Datei?', o: ['Ein Merge-Konflikt, der manuell aufgelöst werden muss', 'Ein Syntaxfehler des Compilers', 'Ein automatischer Backup-Kommentar', 'Ein HTML-Kommentar'], a: 0, e: 'Git markiert so die widersprüchlichen Codezeilen beider Branches.'},
      {q: 'Was bewirkt der Befehl git pull?', o: ['Er lädt neue Commits vom Remote-Server herunter und führt sie sofort mit dem lokalen Branch zusammen (fetch + merge)', 'Er lädt nur Dateien hoch', 'Er löscht das lokale Repository', 'Er erzeugt einen neuen Branch'], a: 0, e: '`git pull` ist die Abkürzung für `git fetch` gefolgt von `git merge`.'},
    ]],
  ],
});
