AP2.page('exam1-ps', {b: 'exam', g: 'Probeprüfung 1', t: 'Planen eines Softwareproduktes (inkl. Infrastruktur und IT-Sicherheit)', blocks: []});
AP2.exam.start('exam1-ps', {minutes: 90, hint: 'Bearbeitungszeit 90 Minuten, 100 Punkte, alle Aufgaben sind zu bearbeiten. Schreibe deine Antworten ins Feld, vergleiche danach mit der Musterlösung und bewerte dich selbst ehrlich. Der Notenschlüssel entspricht dem IHK-Schema (ab 92 % Note 1, ab 81 % Note 2, ab 67 % Note 3, ab 50 % Note 4, ab 30 % Note 5). Starte die Uhr und arbeite ohne Hilfsmittel; Taschenrechner ist erlaubt. Ausgangslage: Die FitPlan GmbH (Ulm) betreibt 12 Fitnessstudios und beauftragt dein Softwarehaus, ein Buchungsportal für Kurse zu entwickeln (Mitglieder buchen online Kurstermine, Trainer verwalten Kurse, die Verwaltung wertet Auslastung aus).'});
AP2.exam.part('exam1-ps', {
  t: 'Handlungsschritt 1: Projekt planen (20 Punkte)',
  intro: 'Für die Entwicklung des Buchungsportals wurden folgende Vorgänge geplant (Dauer in Arbeitstagen).',
  tasks: [
    {pts: 8, rows: 6, q: 'Berechnen Sie für alle Vorgänge den frühesten Anfangszeitpunkt (FAZ) und den frühesten Endzeitpunkt (FEZ).',
      ctx: [['table', ['Vorgang', 'Beschreibung', 'Dauer', 'Vorgänger'], [['A', 'Anforderungsanalyse', '4', '-'], ['B', 'Systementwurf', '5', 'A'], ['C', 'Datenbank aufbauen', '6', 'B'], ['D', 'Backend entwickeln', '10', 'B'], ['E', 'Frontend entwickeln', '8', 'B'], ['F', 'Integration', '3', 'C, D, E'], ['G', 'Test', '4', 'F'], ['H', 'Dokumentation', '5', 'E'], ['I', 'Abnahme', '1', 'G, H']]]],
      a: ['Vorwärtsrechnung: FEZ = FAZ + Dauer, FAZ = größter FEZ der Vorgänger.', '- A: FAZ 0, FEZ 4', '- B: FAZ 4, FEZ 9', '- C: FAZ 9, FEZ 15', '- D: FAZ 9, FEZ 19', '- E: FAZ 9, FEZ 17', '- F: FAZ 19, FEZ 22 (größter FEZ der Vorgänger ist 19 von D)', '- G: FAZ 22, FEZ 26', '- H: FAZ 17, FEZ 22', '- I: FAZ 26, FEZ 27 (größter FEZ ist 26 von G)']},
    {pts: 3, q: 'Bestimmen Sie die Gesamtdauer des Projekts und den kritischen Pfad.',
      a: ['Gesamtdauer: **27 Arbeitstage** (FEZ von I).', 'Kritischer Pfad (Gesamtpuffer 0): **A, B, D, F, G, I**.']},
    {pts: 4, q: 'Berechnen Sie für die Vorgänge C und E den Gesamtpuffer (GP) und den freien Puffer (FP).',
      a: ['Rückwärtsrechnung: SEZ (F) = SAZ (F) = 19 (F kritisch). SEZ von C = SAZ von F = 19, SAZ von C = 19 - 6 = 13, GP (C) = SAZ - FAZ = 13 - 9 = **4**, FP (C) = FAZ (F) - FEZ (C) = 19 - 15 = **4**.', 'E: Nachfolger F (SAZ 19) und H (SAZ 21, denn I hat SAZ 26 und H dauert 5). SEZ (E) = min(19, 21) = 19, SAZ = 19 - 8 = 11, GP (E) = 11 - 9 = **2**, FP (E) = min(FAZ F = 19, FAZ H = 17) - FEZ (E) = 17 - 17 = **0**.']},
    {pts: 5, q: 'Die Entwicklung des Portals kostet einmalig 54.000 Euro. Es entstehen jährlich 30.000 Euro Nutzen (eingesparte Personalkosten, Mehrumsatz) und 6.000 Euro laufende Kosten (Hosting, Wartung). a) Wie hoch ist der jährliche Überschuss? b) Wie lang ist die Amortisationszeit? c) Wie hoch ist der ROI bei einer Nutzungsdauer von 5 Jahren?',
      a: ['a) Überschuss = 30.000 - 6.000 = **24.000 Euro** pro Jahr (1 Punkt).', 'b) Amortisationszeit = Investition / Überschuss = 54.000 / 24.000 = **2,25 Jahre** (27 Monate) (2 Punkte).', 'c) Gesamtgewinn = 24.000 mal 5 - 54.000 = 66.000 Euro, ROI = 66.000 / 54.000 = **122 Prozent** (2 Punkte).']},
  ],
});
