AP2.page('ps-git', {
  b: 'ps', g: 'Entwicklungsumgebungen', t: 'Versionsverwaltung mit Git',
  d: 'Eine **Versionsverwaltung** speichert **jede Änderung** am Quellcode mit Autor, Zeit und Beschreibung. **Git** ist ein **verteiltes** System: Jeder Entwickler hat eine **vollständige Kopie** (Repository) mit der ganzen Historie. Mit **Branches** (Zweigen) arbeitet man parallel, mit **Merge** führt man die Zweige wieder zusammen.',
  m: '**add - commit - push**: Änderung vormerken (add), lokal speichern (commit), zum Server hochladen (push). Gegenrichtung: **fetch/pull**. **Git ist nicht GitHub**: Git = Werkzeug, GitHub/GitLab = Plattform im Netz.',
  cheat: [
    ['Vier Bereiche', ['**Arbeitsverzeichnis:** deine Dateien', '**Staging Area (Index):** vorgemerkt für Commit', '**Lokales Repository:** gespeicherte Commits', '**Remote Repository:** Server (origin)']],
    ['Grundbefehle', ['`git init`, `git clone <url>`', '`git status`, `git diff`', '`git add <datei>`, `git commit -m "Text"`', '`git push`, `git pull`, `git fetch`', '`git log`']],
    ['Branches', ['`git branch <name>` anlegen', '`git switch <name>` oder `git checkout <name>` wechseln', '`git merge <name>` zusammenführen', '`git branch -d <name>` löschen']],
    ['Begriffe', ['**Commit:** Schnappschuss mit ID (Hash)', '**HEAD:** aktuell ausgecheckter Stand', '**Merge-Konflikt:** gleiche Stelle auf zwei Zweigen geändert', '**Pull Request:** Bitte um Übernahme mit Review']],
  ],
  blocks: [
    ['h', 'Wozu Versionsverwaltung?'],
    ['p', 'Stell dir vor, drei Entwickler arbeiten am selben Projekt und schicken sich ZIP-Dateien per E-Mail. Wer hat die aktuelle Version? Was wurde geändert? Wie kommt man zum Stand von letzter Woche zurück? Eine **Versionsverwaltung** löst diese Probleme: Sie speichert alle Versionen, zeigt Unterschiede, erlaubt das **Zurückkehren** und ermöglicht **gleichzeitiges Arbeiten** ohne Überschreiben.'],
    ['procon', 'Zentrale oder verteilte Versionsverwaltung?', ['**Verteilt (Git):** Arbeiten ohne Netzverbindung möglich, Historie lokal, schnell', '**Verteilt:** Server-Ausfall ist kein Datenverlust, jede Kopie ist ein Backup', '**Zentral (SVN):** einfaches Modell, klare Zugriffskontrolle'], ['**Verteilt:** Lernkurve (Branches, Merge, Rebase)', '**Zentral:** ohne Server nichts möglich, Branches umständlich', '**Zentral:** Historie nur auf dem Server']],
    ['h', 'Die vier Bereiche und der Weg einer Änderung'],
    ['diagram', {w: 760, h: 240, keep: 620, cap: 'Der Weg einer Änderung in Git. Oben: nach vorne, unten: zurückholen.', nodes: [
      {id: 'w', k: 'round', x: 90, y: 110, t: ['Arbeits-', 'verzeichnis'], w: 130, h: 64, s: 'soft'}, {id: 's', k: 'round', x: 270, y: 110, t: ['Staging Area', '(Index)'], w: 130, h: 64, s: 'accent'},
      {id: 'l', k: 'round', x: 460, y: 110, t: ['Lokales', 'Repository'], w: 130, h: 64, s: 'accent'}, {id: 'r', k: 'round', x: 660, y: 110, t: ['Remote', '(origin)'], w: 130, h: 64, s: 'solid'},
    ], edges: [
      {a: 'w', b: 's', t: 'git add', lo: [0, -42], via: [[90, 50], [270, 50]]}, {a: 's', b: 'l', t: 'git commit', lo: [0, -42], via: [[270, 50], [460, 50]]}, {a: 'l', b: 'r', t: 'git push', lo: [0, -42], via: [[460, 50], [660, 50]]},
      {a: 'r', b: 'l', t: 'git fetch', lo: [0, 42], via: [[660, 175], [460, 175]]}, {a: 'l', b: 'w', t: 'git merge / pull', lo: [0, 42], via: [[460, 215], [90, 215]]},
    ]}],
    ['steps', ['Du änderst Dateien im **Arbeitsverzeichnis**.', '`git add datei` merkt die Änderung für den nächsten Commit vor (**Staging**).', '`git commit -m "Beschreibung"` speichert einen **Schnappschuss** im lokalen Repository.', '`git push` lädt die Commits auf den **Server** (Remote).', '`git pull` (= `fetch` + `merge`) holt Änderungen anderer vom Server.']],
    ['h', 'Ein Commit'],
    ['p', 'Ein **Commit** ist ein Schnappschuss des Projekts mit einer eindeutigen **ID** (Hash, zum Beispiel `a1b2c3d`), dem **Autor**, einem **Zeitstempel** und einer **Nachricht**. Jeder Commit kennt seinen **Vorgänger**. So entsteht die Historie als Kette. Gute Commit-Nachrichten sind kurz und sagen **was und warum**: "Fehler beim Runden der Mehrwertsteuer behoben".'],
    ['code', 'text', `$ git status
Auf Branch main
Änderungen, die nicht zum Commit vorgemerkt sind:
        geändert:   rechnung.py

$ git add rechnung.py
$ git commit -m "Mehrwertsteuer korrekt runden"
[main 3f9a2c1] Mehrwertsteuer korrekt runden
 1 file changed, 4 insertions(+), 1 deletion(-)

$ git push origin main`],
  ],
});
