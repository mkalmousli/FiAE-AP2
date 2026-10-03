AP2.add('ps-aufwand', [
  ['h', 'Aufwand, Dauer und Kosten sind verschiedene Dinge'],
  ['list', ['**Aufwand** = benötigte Arbeit in **Personentagen (PT)** oder Personenstunden. Beispiel: 120 PT.', '**Dauer** = Kalenderzeit. Beispiel: 120 PT mit 4 Personen = 30 Arbeitstage (6 Wochen).', '**Kosten** = Aufwand mal Stundensatz (plus Sachkosten). Beispiel: 120 PT mal 8 h mal 70 Euro = 67.200 Euro.']],
  ['warn', 'Das **Brooks-Gesetz** sagt: "Mehr Personal zu einem verspäteten Projekt macht es noch später." Neue Mitarbeiter müssen eingearbeitet werden und der Abstimmungsaufwand steigt. Aufwand und Dauer sind **nicht beliebig tauschbar**.'],
  ['h', 'Wichtige Rechenbeispiele'],
  ['table', ['Aufgabe', 'Rechnung', 'Ergebnis'], [
    ['Dauer bei 3 Personen und 90 PT', '90 geteilt durch 3', '30 Arbeitstage'],
    ['Kosten bei 20 PT, 8 h/Tag, 65 Euro/h', '20 mal 8 mal 65', '10.400 Euro'],
    ['Personal für 60 PT in 15 Tagen', '60 geteilt durch 15', '4 Personen'],
    ['Aufwand nach FP: 150 FP, 0,6 FP/PT', '150 geteilt durch 0,6', '250 PT'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Nennen Sie zwei Verfahren zur Aufwandsschätzung und je einen Vor- und Nachteil.', ['- **Expertenschätzung:** schnell und günstig, aber subjektiv.', '- **Function-Point-Methode:** objektiv und programmiersprachenunabhängig, aber aufwendig anzuwenden.', '- (Alternativ Analogiemethode: realistisch bei ähnlichen Projekten, aber auf Vergleichsdaten angewiesen.)'], 4],
  ['qa', 'Ein Projekt wird auf 240 Personentage geschätzt. Es stehen 5 Entwickler zur Verfügung, die 8 Stunden pro Tag arbeiten. Der interne Stundensatz beträgt 60 Euro. Berechnen Sie Dauer und Personalkosten.', ['**Dauer:** 240 PT geteilt durch 5 Personen = **48 Arbeitstage** (ca. 9,6 Wochen bei 5 Arbeitstagen).', '**Kosten:** 240 PT mal 8 h mal 60 Euro = **115.200 Euro**.'], 4],
  ['qa', 'Erklären Sie die Delphi-Methode.', 'Mehrere Experten schätzen den Aufwand unabhängig und anonym. Ein Moderator fasst die Ergebnisse zusammen und gibt sie zurück. Die Experten begründen Abweichungen und schätzen erneut. Das wiederholt sich, bis die Schätzungen nahe beieinander liegen. Vorteil: Einflussnahme durch Dominanz einzelner Personen wird vermieden.', 3],
  ['quiz', [
    {q: 'Was misst die Function-Point-Methode?', o: ['Den Funktionsumfang aus Sicht des Benutzers', 'Die Zeilen Quellcode', 'Die Anzahl der Mitarbeiter', 'Die Rechenleistung des Servers'], a: 0, e: 'Function Points bewerten, was die Software für den Anwender leistet, unabhängig von der Programmiersprache.'},
    {q: '90 Personentage werden von 6 Personen bearbeitet. Wie viele Arbeitstage dauert das mindestens (ideal)?', o: ['15', '540', '96', '12'], a: 0, e: 'Dauer = Aufwand / Personen = 90 / 6 = 15 Arbeitstage.'},
    {q: 'Welche Methode ist besonders für den Vergleich mit einem früheren, ähnlichen Projekt geeignet?', o: ['Analogiemethode', 'Delphi-Methode', 'Planning Poker', 'Netzplantechnik'], a: 0, e: 'Die Analogiemethode überträgt Erfahrungen eines ähnlichen abgeschlossenen Projekts.'},
    {q: 'Was besagt das Brooks-Gesetz?', o: ['Mehr Personal in einem verspäteten Projekt macht es meist noch später.', 'Mehr Personal beschleunigt jedes Projekt linear.', 'Ein Projekt braucht immer genau fünf Personen.', 'Dokumentation kostet nie Zeit.'], a: 0, e: 'Einarbeitung und Kommunikation kosten Zeit; Aufwand und Dauer sind nicht beliebig austauschbar.'},
  ]],
]);
