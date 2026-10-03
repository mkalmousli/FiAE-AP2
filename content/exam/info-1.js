AP2.page('exam-info', {
  b: 'exam', g: 'Hinweise', t: 'So nutzt du die Probeprüfungen',
  d: 'Die Probeprüfungen bilden den **Aufbau der AP2** nach: **Planen eines Softwareproduktes** (90 Minuten, inklusive Infrastruktur und IT-Sicherheit), **Entwicklung und Umsetzung von Algorithmen** (90 Minuten) und **Wirtschafts- und Sozialkunde** (60 Minuten), jeweils **100 Punkte**, gegliedert in **Handlungsschritte** mit einer **Ausgangslage**. Du schreibst deine Antworten selbst, vergleichst mit der **Musterlösung** und bewertest dich **Aufgabe für Aufgabe**; die App rechnet **Punkte und Note** aus.',
  m: '**Erst selbst lösen, dann vergleichen.** **Zeit stoppen.** **Punktzahl = Anzahl der Aussagen.** **Ehrlich bewerten**: nur Punkte vergeben, wenn der Inhalt in deiner Antwort steht.',
  cheat: [
    ['Ablauf', ['**Alles lesen**, Aufgabenbereiche überblicken', '**Uhr starten**', '**Leichte Aufgaben zuerst**', '**Mindestens eine Aussage je Punkt**', '**10 Minuten** zur Kontrolle reservieren', 'Danach **Musterlösung** vergleichen']],
    ['Zeitplanung 90 Minuten', ['**Etwa 1 Minute pro Punkt**', 'Lesen: 5 Minuten', 'Bearbeiten: 75 Minuten', 'Kontrolle: 10 Minuten']],
    ['Selbstbewertung', ['Halbe Punkte vermeiden', 'Teilpunkte pro Aussage', 'Folgefehler nicht doppelt bestrafen', 'Fehlerliste führen und das Thema wiederholen']],
  ],
  blocks: [
    ['h', 'Notenschlüssel'],
    ['table', ['Punkte (Prozent)', 'Note', 'Bedeutung'], [['100 bis 92', '**1**', 'sehr gut'], ['unter 92 bis 81', '**2**', 'gut'], ['unter 81 bis 67', '**3**', 'befriedigend'], ['unter 67 bis 50', '**4**', 'ausreichend'], ['unter 50 bis 30', '**5**', 'mangelhaft'], ['unter 30 bis 0', '**6**', 'ungenügend']]],
    ['note', 'Der Notenschlüssel entspricht dem üblichen IHK-Schema. Verbindlich sind die Angaben deiner IHK. Die Aufgaben sind **realistisch nachgebaut**, aber **keine Originalaufgaben**; Umfang und Schwerpunkte können in der echten Prüfung abweichen.'],
    ['h', 'Überblick'],
    ['table', ['Prüfung', 'Zeit', 'Punkte', 'Inhalt'], [['Probeprüfung 1: Planen eines Softwareproduktes', '90 Min', '100', 'Projektplanung, Anforderungen und UML, Datenmodell, Qualität und Recht, Infrastruktur und IT-Sicherheit'], ['Probeprüfung 1: Entwicklung und Umsetzung von Algorithmen', '90 Min', '100', 'Algorithmen, Datenstrukturen, OOP, SQL, Testen'], ['Probeprüfung 1: Wirtschafts- und Sozialkunde', '60 Min', '100', 'Ausbildung und Arbeitsrecht, Mitbestimmung, Sozialversicherung, Wirtschaft, Arbeitsschutz']]],
    ['h', 'So arbeitest du'],
    ['steps', ['**Seite öffnen** und die Ausgangslage lesen.', '**Uhr starten** (Start-Knopf in der Leiste oben). Die Uhr zählt herunter und wird in den letzten 10 Minuten rot.', '**Aufgaben bearbeiten:** Antwort ins Feld schreiben (wird automatisch gespeichert, auch nach dem Neuladen).', '**Musterlösung anzeigen** und deine Antwort vergleichen. Wähle unter der Lösung die **erreichten Punkte**.', '**Ergebnis** in der Leiste oben ablesen: Punkte, Prozent, Note. Mit "Zurücksetzen" beginnst du neu.']],
    ['tip', 'Wirklich üben heißt: **nicht** sofort die Musterlösung öffnen. Schreibe zuerst eine vollständige Antwort. Auch Falsches hilft dir beim Lernen.'],
    ['h', 'Nach der Prüfung'],
    ['list', ['Notiere zu jedem Punktverlust **das Thema** (zum Beispiel Netzplan-Puffer, Normalisierung, Kündigungsfrist).', 'Wiederhole diese Themen im jeweiligen Block und löse das **Quiz** und die **Aufgaben** dort noch einmal.', 'Wiederhole die Probeprüfung nach einigen Tagen mit **Zurücksetzen**.']],
  ],
});
