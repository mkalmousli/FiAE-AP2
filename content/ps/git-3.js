AP2.add('ps-git', [
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Nennen Sie vier Vorteile einer Versionsverwaltung.', ['- Nachvollziehbarkeit: Wer hat wann was geändert und warum?', '- Frühere Versionen lassen sich wiederherstellen (Rückkehr zu funktionierendem Stand).', '- Paralleles Arbeiten mehrerer Entwickler (Branches, Merge).', '- Datensicherung durch Kopien im Team und auf dem Server; Grundlage für Review und Automatisierung (CI/CD).'], 4],
  ['qa', 'Erklären Sie den Unterschied zwischen `git commit` und `git push`.', '`git commit` speichert die vorgemerkten Änderungen **lokal** im eigenen Repository. `git push` lädt die lokalen Commits **auf den Server** (Remote-Repository) hoch, damit andere sie sehen können.', 3],
  ['qa', 'Zwei Entwickler haben dieselbe Zeile einer Datei geändert. Was passiert beim Merge und wie wird das Problem gelöst?', 'Git meldet einen **Merge-Konflikt**, weil es nicht automatisch entscheiden kann. Die Datei enthält Konfliktmarkierungen. Der Entwickler bearbeitet die Stelle manuell (gewünschte Version behalten oder kombinieren), entfernt die Markierungen, fügt die Datei mit `git add` hinzu und schließt den Merge mit einem Commit ab.', 4],
  ['qa', 'Warum sollte man Passwörter oder Zugangsschlüssel nicht in ein Git-Repository einchecken?', 'Die Historie in Git bleibt erhalten: Selbst wenn man das Passwort später löscht, steht es in älteren Commits und ist für jeden mit Zugriff auf das Repository sichtbar (bei öffentlichen Repositories für alle). Geheimnisse gehören in Umgebungsvariablen oder einen Secret-Manager; Dateien mit Geheimnissen stehen in `.gitignore`.', 4],
  ['quiz', [
    {q: 'Was ist Git?', o: ['Ein verteiltes Versionsverwaltungssystem', 'Eine Programmiersprache', 'Eine Datenbank', 'Ein Betriebssystem'], a: 0, e: 'Git speichert die Historie von Dateien in verteilten Repositories.'},
    {q: 'Mit welchem Befehl merkt man Änderungen für den nächsten Commit vor?', o: ['git add', 'git push', 'git clone', 'git merge'], a: 0, e: '`git add` überträgt Änderungen in die Staging Area.'},
    {q: 'Was bewirkt git pull?', o: ['Holt Änderungen vom Server und führt sie ein (fetch plus merge)', 'Lädt lokale Commits hoch', 'Löscht das Repository', 'Erstellt einen Branch'], a: 0, e: 'pull = fetch + merge.'},
    {q: 'Was ist ein Branch?', o: ['Ein paralleler Entwicklungszweig', 'Ein Backup auf USB', 'Eine Datei', 'Ein Passwort'], a: 0, e: 'Branches erlauben paralleles Arbeiten ohne den Hauptzweig zu stören.'},
    {q: 'Wofür dient .gitignore?', o: ['Dateien festlegen, die nicht versioniert werden', 'Passwörter speichern', 'Commits löschen', 'Branches umbenennen'], a: 0, e: 'In .gitignore stehen Muster für Dateien, die Git ignorieren soll.'},
  ]],
]);
