AP2.add('ps-git', [
  ['h', 'Branches (Zweige)'],
  ['p', 'Ein **Branch** ist ein beweglicher Zeiger auf einen Commit. Er erlaubt, an einer **neuen Funktion zu arbeiten, ohne den stabilen Hauptzweig (main) zu stören**. Ist die Funktion fertig und getestet, wird der Branch mit **merge** in den Hauptzweig zurückgeführt.'],
  ['diagram', {w: 720, h: 230, keep: 560, cap: 'Branch und Merge: Der Feature-Zweig wird aus main abgezweigt und später zurückgeführt.', nodes: [
    {id: 'c1', k: 'circle', x: 60, y: 60, t: 'C1', w: 38, h: 38}, {id: 'c2', k: 'circle', x: 170, y: 60, t: 'C2', w: 38, h: 38}, {id: 'c3', k: 'circle', x: 280, y: 60, t: 'C3', w: 38, h: 38, s: 'plain'}, {id: 'c6', k: 'circle', x: 520, y: 60, t: 'M', w: 40, h: 40, s: 'solid'},
    {id: 'c4', k: 'circle', x: 280, y: 160, t: 'C4', w: 38, h: 38, s: 'accent'}, {id: 'c5', k: 'circle', x: 400, y: 160, t: 'C5', w: 38, h: 38, s: 'accent'},
    {id: 'm', k: 'text', x: 640, y: 60, t: 'main', b: true, fs: 14}, {id: 'f', k: 'text', x: 520, y: 160, t: 'feature/login', b: true, fs: 14, tc: 'accent'},
  ], edges: [{a: 'c1', b: 'c2', ea: 'none'}, {a: 'c2', b: 'c3', ea: 'none'}, {a: 'c3', b: 'c6', ea: 'none'}, {a: 'c2', b: 'c4', ea: 'none', s: 'accent'}, {a: 'c4', b: 'c5', ea: 'none', s: 'accent'}, {a: 'c5', b: 'c6', ea: 'none', s: 'accent'}]}],
  ['code', 'text', `$ git switch -c feature/login      # neuen Branch anlegen und wechseln
  ... arbeiten, add, commit ...
$ git switch main                   # zurück zum Hauptzweig
$ git merge feature/login           # Branch zusammenführen
$ git branch -d feature/login       # Branch löschen (fertig)`],
  ['h3', 'Merge-Konflikt'],
  ['p', 'Wurde **dieselbe Stelle** einer Datei in beiden Zweigen unterschiedlich geändert, kann Git nicht entscheiden. Es entsteht ein **Merge-Konflikt**. Git markiert die Stelle in der Datei, und der Entwickler entscheidet, welche Version (oder welche Mischung) bleibt:'],
  ['code', 'text', `<<<<<<< HEAD
satz = 0.19          # Version aus main
=======
satz = 0.20          # Version aus feature/login
>>>>>>> feature/login

Lösung: gewünschte Zeile behalten, Markierungen entfernen,
dann: git add rechnung.py  und  git commit`],
  ['tip', 'Konflikte vermeidet man durch **kleine, häufige Commits**, **kurzlebige Branches** und regelmäßiges `git pull`, damit man früh Änderungen anderer einarbeitet.'],
  ['h', 'Merge und Rebase'],
  ['table', ['Merkmal', 'Merge', 'Rebase'], [
    ['Wirkung', 'Führt zwei Zweige zusammen, erzeugt oft einen **Merge-Commit**', 'Setzt die Commits eines Zweigs **neu auf** einen anderen Stand auf (lineare Historie)'],
    ['Historie', 'Zeigt echten Verlauf mit Verzweigungen', 'Linear und aufgeräumt'],
    ['Risiko', 'Gering, Historie bleibt unverändert', 'Schreibt Commits um: **nicht** auf bereits veröffentlichten Branches anwenden'],
  ]],
  ['h', 'Arbeiten im Team: Pull Requests'],
  ['steps', ['Neuen **Feature-Branch** aus main anlegen.', 'Änderungen committen und den Branch **pushen**.', 'Auf der Plattform (GitHub, GitLab) einen **Pull Request** (GitLab: Merge Request) eröffnen.', 'Kollegen führen ein **Code-Review** durch, automatische Tests laufen (**CI**, Continuous Integration).', 'Nach Freigabe wird in **main gemergt**, der Branch gelöscht.']],
  ['h', 'Wichtige Dateien und Befehle'],
  ['table', ['Befehl / Datei', 'Bedeutung'], [
    ['`.gitignore`', 'Liste von Dateien und Ordnern, die Git ignorieren soll (Build-Ergebnisse, Passwörter, `node_modules`). **Geheimnisse wie Passwörter nie committen!**'],
    ['`git log --oneline`', 'Kurze Historie anzeigen'],
    ['`git diff`', 'Unterschiede anzeigen'],
    ['`git stash`', 'Änderungen vorübergehend zwischenspeichern'],
    ['`git revert <commit>`', 'Neuen Commit erzeugen, der einen alten **rückgängig** macht (sicher, Historie bleibt)'],
    ['`git reset`', 'Zeiger zurücksetzen (kann Commits verwerfen, mit Vorsicht)'],
    ['`git tag v1.0`', 'Version markieren (Release)'],
    ['`git clone <url>`', 'Komplettes Repository von einem Server kopieren'],
  ]],
]);
