AP2.add('ps-netzplan', [
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', ['Gegeben sind die Vorgänge: A (2 Tage, kein Vorgänger), B (3 Tage, nach A), C (4 Tage, nach A), D (2 Tage, nach B und C).', 'Berechnen Sie FAZ, FEZ, SAZ, SEZ und GP, nennen Sie den kritischen Pfad und die Projektdauer.'], [
    '**Vorwärts:** A: 0 bis 2. B: 2 bis 5. C: 2 bis 6. D: FAZ = max(5, 6) = 6, FEZ = 8.',
    '**Rückwärts:** D: SEZ 8, SAZ 6. B: SEZ 6, SAZ 3. C: SEZ 6, SAZ 2. A: SEZ = min(3, 2) = 2, SAZ 0.',
    '**Puffer:** GP(A) = 0, GP(B) = 3 - 2 = 1, GP(C) = 2 - 2 = 0, GP(D) = 6 - 6 = 0.',
    '**Kritischer Pfad:** A - C - D. **Projektdauer: 8 Tage.** Vorgang B darf 1 Tag später fertig werden, ohne das Ende zu gefährden.'], 8],
  ['qa', 'Erklären Sie den Unterschied zwischen Gesamtpuffer und freiem Puffer.', 'Der **Gesamtpuffer** ist der Zeitraum, um den ein Vorgang verschoben oder verlängert werden darf, ohne das Projektende zu verzögern. Der **freie Puffer** ist der Zeitraum, um den er sich verzögern darf, ohne dass der früheste Start eines Nachfolgers beeinflusst wird. Es gilt immer FP kleiner oder gleich GP.', 4],
  ['qa', 'Ein Vorgang auf dem kritischen Pfad verzögert sich um 3 Tage. Welche Folgen hat das und welche Gegenmaßnahmen gibt es?', ['Das Projektende verschiebt sich um 3 Tage, weil kritische Vorgänge keinen Puffer haben.', 'Gegenmaßnahmen:', '- zusätzliche Mitarbeiter einsetzen (Kosten steigen)', '- Vorgänge parallelisieren oder überlappen lassen', '- Funktionsumfang reduzieren oder Aufgaben mit Puffer nachrangig behandeln', '- Termin mit dem Auftraggeber neu vereinbaren'], 4],
  ['h', 'Selbsttest'],
  ['quiz', [
    {q: 'Ein Vorgang hat die Vorgänger X (FEZ 10) und Y (FEZ 14). Welcher FAZ gilt?', o: ['14', '10', '12', '24'], a: 0, e: 'Der Vorgang kann erst starten, wenn alle Vorgänger fertig sind: Maximum der FEZ, also 14.'},
    {q: 'Ein Vorgang hat die Nachfolger mit SAZ 8 und SAZ 11. Welcher SEZ gilt?', o: ['8', '11', '9,5', '19'], a: 0, e: 'Rückwärts zählt das Minimum der SAZ der Nachfolger, damit keiner zu spät startet: 8.'},
    {q: 'Woran erkennt man einen kritischen Vorgang?', o: ['Gesamtpuffer = 0', 'Die Dauer ist am längsten', 'Er hat die meisten Nachfolger', 'Er steht am Anfang'], a: 0, e: 'Kritisch bedeutet: kein zeitlicher Spielraum, also GP = 0.'},
    {q: 'FAZ = 5, FEZ = 9, SAZ = 8. Wie groß ist der Gesamtpuffer?', o: ['3', '4', '8', '0'], a: 0, e: 'GP = SAZ - FAZ = 8 - 5 = 3. Kontrolle: SEZ = 12, FEZ = 9, auch 12 - 9 = 3.'},
    {q: 'Was ist der kritische Pfad?', o: ['Der längste Weg durch den Netzplan, der die Projektdauer bestimmt', 'Der kürzeste Weg', 'Der Weg mit den meisten Mitarbeitern', 'Der teuerste Vorgang'], a: 0, e: 'Die Projektdauer ergibt sich aus dem längsten Pfad. Eine Verzögerung darauf verschiebt das Projektende.'},
  ]],
]);
