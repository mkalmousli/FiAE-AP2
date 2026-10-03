AP2.add('ps-verifikation', [
  ['h', 'Abnahme und Pflichtenheft'],
  ['p', 'Am Ende eines Projekts steht die **Abnahme**. Der Auftraggeber prüft das Werk gegen die vereinbarten Anforderungen (Pflichtenheft) und erklärt, dass er es als **im Wesentlichen vertragsgemäß** anerkennt. Beim **Werkvertrag** (siehe Seite Vertragsarten) ist die Abnahme rechtlich entscheidend.'],
  ['steps', ['**Vorbereitung:** Abnahmekriterien und Testfälle aus dem Pflichtenheft ableiten, Testumgebung bereitstellen.', '**Durchführung:** Kunde führt Abnahmetests durch und dokumentiert Ergebnisse.', '**Mängelliste:** Gefundene Abweichungen werden nach Schwere eingeordnet.', '**Nachbesserung:** Der Auftragnehmer behebt Mängel, ein erneuter Test folgt.', '**Abnahmeprotokoll:** Beide Seiten unterschreiben. Es hält fest: abgenommen, mit Mängeln, oder nicht abgenommen.']],
  ['table', ['Mängelklasse', 'Bedeutung', 'Folge für die Abnahme'], [
    ['Kritisch (Blocker)', 'System unbrauchbar, Datenverlust, Sicherheitslücke', 'Abnahme verweigert, bis behoben'],
    ['Wesentlich', 'Wichtige Funktion stark beeinträchtigt, Umgehung schwierig', 'Abnahme meist nur nach Behebung oder mit Frist'],
    ['Geringfügig', 'Schönheitsfehler, kleine Abweichung', 'Abnahme möglich, Behebung später'],
  ]],
  ['h3', 'Rechtliche Wirkung der Abnahme (Werkvertrag, §640 BGB)'],
  ['list', ['Die **Vergütung wird fällig** (der Kunde muss zahlen).', 'Die **Gewährleistungsfrist beginnt** (meist 2 Jahre für Werke an Software).', 'Die **Beweislast** kehrt sich um: Ab jetzt muss der Kunde beweisen, dass ein Mangel schon bei Abnahme vorlag.', 'Die **Gefahr** (Risiko eines zufälligen Untergangs) geht auf den Kunden über.']],
  ['warn', 'Wer nach Fertigstellung nicht innerhalb einer gesetzten Frist die Abnahme verweigert oder Mängel benennt, kann als abgenommen gelten (**fiktive Abnahme**). Deshalb sind schriftliche Mängelrügen wichtig. Rechtliche Details gehören in den Vertrag, in der Prüfung genügt das Prinzip.'],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie anhand eines Beispiels den Unterschied zwischen Verifikation und Validierung.', ['**Verifikation** prüft, ob das Produkt die Spezifikation erfüllt: Der Entwickler prüft, ob alle Funktionen aus dem Pflichtenheft korrekt umgesetzt sind.', '**Validierung** prüft, ob das Produkt den Zweck des Kunden erfüllt: Bei der Abnahme zeigt sich, ob die Mitarbeiter ihre Aufgaben damit wirklich erledigen können. Das Produkt kann also verifiziert, aber nicht validiert sein, wenn das Pflichtenheft selbst am Bedarf vorbeigeht.'], 6],
  ['qa', 'Nennen Sie drei Vorteile von Code-Reviews.', ['- Fehler werden früh gefunden, bevor sie teuer werden.', '- Wissen im Team wird geteilt, der Code wird lesbarer und einheitlicher.', '- Die Einhaltung von Programmierrichtlinien wird geprüft; Sicherheitslücken fallen auf.'], 3],
  ['qa', 'Welche Rechtsfolgen hat die Abnahme eines Werkes?', 'Die Vergütung wird fällig, die Gewährleistungsfrist beginnt, die Beweislast für Mängel geht auf den Auftraggeber über und die Gefahr des zufälligen Untergangs trägt der Auftraggeber.', 4],
  ['quiz', [
    {q: '"Bauen wir das richtige Produkt?" Welche Prüfung beantwortet diese Frage?', o: ['Validierung', 'Verifikation', 'Kompilierung', 'Dokumentation'], a: 0, e: 'Validierung prüft die Eignung für den Zweck des Kunden.'},
    {q: 'Welche Reviewart ist besonders formal (Rollen, Checklisten, Protokoll)?', o: ['Inspektion', 'Walkthrough', 'Pair Programming', 'Kaffeepause'], a: 0, e: 'Die Inspektion ist das formalste Review mit festen Rollen und Protokoll.'},
    {q: 'Was ist eine Folge der Abnahme beim Werkvertrag?', o: ['Die Vergütung wird fällig.', 'Der Auftragnehmer muss das Werk zurücknehmen.', 'Der Vertrag endet nie.', 'Die Beweislast bleibt beim Auftragnehmer.'], a: 0, e: 'Mit der Abnahme wird die Vergütung fällig und die Gewährleistung beginnt.'},
    {q: 'Zu welcher Art gehört das Code-Review?', o: ['Analytische Qualitätssicherung (statisch)', 'Konstruktive Maßnahme', 'Last-Test', 'Hardwareprüfung'], a: 0, e: 'Ein Review prüft vorhandenen Code ohne Ausführung: analytisch und statisch.'},
  ]],
]);
