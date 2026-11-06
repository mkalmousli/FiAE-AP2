AP2.page('eua-struktogramm', {
  b: 'eua', g: 'Ablaufdarstellung', t: 'Struktogramm (Nassi-Shneiderman nach DIN 66261)',
  d: 'Ein **Struktogramm (Nassi-Shneiderman-Diagramm nach DIN 66261)** stellt Algorithmen grafisch als geschachtelte Blöcke dar – **völlig ohne Pfeile**. Es erzwingt die Grundsätze der **strukturierten Programmierung**: Sequenz, Verzweigung und Schleife. Im Gegensatz zum **Programmablaufplan (PAP)** verhindert es unübersichtlichen „Spaghetti-Code“ mit unkontrollierten Sprüngen. In der IHK-Abschlussprüfung (AP2) wird regelmäßig verlangt, Struktogramme zu lesen, durch eine **Trace-Tabelle (Schreibtischtest)** zu prüfen oder Code/PAP in ein Struktogramm zu überführen.',
  m: '**Struktogramm = Blöcke von oben nach unten, KEINE Pfeile!** **Grundelemente:** (1) **Sequenz** (Rechteck), (2) **Verzweigung / Alternative** (Dreieck mit Ja/Nein oder Wahr/Falsch), (3) **Fallauswahl** (Fächer mit case 1, 2, default), (4) **Kopfgesteuerte Schleife** (Bedingung oben im L-Balken, 0 bis n Durchläufe), (5) **Fußgesteuerte Schleife** (Bedingung unten, mindestens 1 Durchlauf), (6) **Zählschleife** (for von/bis/Schritt).',
  cheat: [
    ['Die Grundelemente nach DIN 66261', [
      '**Sequenz (Anweisung):** Einfaches Rechteck für Rechenoperation oder Ein-/Ausgabe',
      '**Zweiseitige Verzweigung (if/else):** Rechteck mit oberem Dreieck; links Ja (Wahr), rechts Nein (Falsch)',
      '**Einseitige Verzweigung (if):** Ein Zweig enthält Anweisungen, der andere bleibt leer',
      '**Fallauswahl (switch/case):** Fächerförmige Aufteilung nach konkreten Werten plus „sonst / default“',
      '**Kopfgesteuerte Schleife (while):** L-förmiger Rahmen; Bedingung steht OBEN; Block wird 0 bis n Mal ausgeführt',
      '**Fußgesteuerte Schleife (do-while / repeat):** Bedingung steht UNTEN; Block wird mindestens 1 Mal ausgeführt',
      '**Zählschleife (for):** Schleifenkopf mit Startwert, Endwert und Schrittweite',
      '**Abbruch (break / return):** Pfeilartiger Block zum Verlassen von Schleife oder Funktion',
    ]],
    ['Vergleich Struktogramm vs. PAP', [
      '**Struktogramm:** Keine Pfeile, keine Sprünge erlaubt (GOTO unmöglich), hohe Übersichtlichkeit, direkt in Code übersetzbar',
      '**PAP (DIN 66001):** Pfeile steuern den Fluss; erlaubt beliebige Sprünge (Spaghetti-Gefahr), braucht mehr Platz auf Papier',
    ]],
    ['Vorgehen beim Schreibtischtest', [
      '1. Tabelle anlegen mit Spalten für jede Variable, Schleifenbedingung und Ausgabe',
      '2. Startwerte eintragen (Zeile 0)',
      '3. Block für Block durchlaufen und jeden Variablenwert bei Änderung notieren',
      '4. Abbruchbedingung exakt prüfen (Achtung bei `<` versus `<=`)',
    ]],
  ],
  blocks: [
    ['h', 'Die Struktogramm-Elemente im Überblick'],
    ['p', 'Ein Struktogramm besteht aus genormten geometrischen Kästen, die nahtlos ineinander geschachtelt werden. Der Kontrollfluss läuft immer von oben nach unten.'],
    ['table', ['Konstrukt', 'Grafische Darstellung (Prinzip)', 'Entsprechung im Programmcode'], [
      ['**Sequenz (Folge)**', 'Einfaches Rechteck:<br>`[ Anweisung: summe = 0 ]`', '`summe = 0;`<br>`i = 1;`'],
      ['**Zweiseitige Alternative (if-else)**', 'Rechteck mit oben geteiltem Dreieck:<br>`\\ Bedingung /` (links Ja / rechts Nein)', '`if (alter >= 18) { ... } else { ... }`'],
      ['**Einseitige Alternative (if)**', 'Dreieck oben, aber nur unter „Ja“ stehen Befehle, „Nein“ ist leer', '`if (rabatt > 0) { preis = preis - rabatt; }`'],
      ['**Mehrfachauswahl (switch-case)**', 'Treppenförmige Dreiecke für Fälle 1, 2, 3 und „Sonst / Default“', '`switch (status) { case 1: ... default: ... }`'],
      ['**Kopfgesteuerte Schleife (while)**', 'Großer L-Rahmen: Bedingung steht **oben**, Anweisungen darunter eingerückt', '`while (bestand > 0) { ... }` (kann 0-mal laufen)'],
      ['**Fußgesteuerte Schleife (do-while)**', 'Umgekehrter L-Rahmen: Anweisungen oben, Bedingung steht **unten**', '`do { ... } while (eingabeFalsch);` (mind. 1-mal)'],
      ['**Zählschleife (for)**', 'Kopfzeile mit Zählvariable: `FÜR i = 1 BIS 10 SCHRITT 1`', '`for (let i = 1; i <= 10; i++) { ... }`'],
    ]],
    ['h', 'Schleifenarten: Kopfgesteuert versus Fußgesteuert'],
    ['p', 'Dieser Unterschied ist eine der beliebtesten Prüfungsfragen der IHK:'],
    ['table', ['Merkmal', 'Kopfgesteuerte Schleife (while / for)', 'Fußgesteuerte Schleife (do-while / repeat-until)'], [
      ['**Prüfung der Bedingung**', 'Ganz am **Anfang (im Kopf)** VOR dem ersten Durchlauf', 'Ganz am **Ende (im Fuß)** NACH jedem Durchlauf'],
      ['**Minimale Durchläufe**', '**0 Durchläufe** (wenn Bedingung von Beginn an falsch ist)', '**Mindestens 1 Durchlauf** (wird immer einmal ausgeführt)'],
      ['**Typischer Einsatzzweck**', 'Listen oder Arrays durchlaufen, solange Elemente vorhanden sind', 'Benutzereingaben (z. B. PIN-Eingabe: mindestens einmal abfragen)'],
    ]],
    ['h', 'Beispiel: Schreibtischtest (Trace-Tabelle) Schritt für Schritt'],
    ['p', 'Gegeben ist folgender Algorithmus zur Berechnung des größten gemeinsamen Teilers (ggT nach Euklid):'],
    ['code', 'text', `+-------------------------------------------------+
| Eingabe: a = 12, b = 8                          |
+-------------------------------------------------+
| WIEDERHOLE SOLANGE b != 0                       |
|   +---------------------------------------------+
|   | rest = a MOD b                              |
|   +---------------------------------------------+
|   | a = b                                       |
|   +---------------------------------------------+
|   | b = rest                                    |
|   +---------------------------------------------+
+-------------------------------------------------+
| Ausgabe: a                                      |
+-------------------------------------------------+`],
    ['table', ['Schritt / Zeile', 'Bedingung `b != 0`', '`rest = a MOD b`', '`a = b`', '`b = rest`', 'Ausgabe / Zustand'], [
      ['Start', '-', '-', '12', '8', 'Initialisierung'],
      ['1. Durchlauf', 'wahr (8 != 0)', '12 MOD 8 = **4**', 'a = **8**', 'b = **4**', 'Schleifenkörper Ende'],
      ['2. Durchlauf', 'wahr (4 != 0)', '8 MOD 4 = **0**', 'a = **4**', 'b = **0**', 'Schleifenkörper Ende'],
      ['3. Prüfung', 'falsch (0 != 0)', '-', '-', '-', 'Schleife wird beendet'],
      ['Ende', '-', '-', '**4**', '0', '**Ausgabe: 4** (ggT ist 4)'],
    ]],
    ['tip', 'Prüfungsfalle Modulo (`MOD` oder `%`): `a MOD b` berechnet den **ganzzahligen Rest** einer Division. Beispiel: `12 / 8 = 1 Rest 4`, also `12 MOD 8 = 4`. `8 / 4 = 2 Rest 0`, also `8 MOD 4 = 0`.'],
    ['h', 'Wörter, die in der Prüfung vorkommen'],
    ['table', ['Wort', 'Einfach erklärt'], [
      ['Struktogramm', 'Diagramm zur Ablaufdarstellung nach DIN 66261 ohne Pfeile'],
      ['Trace-Tabelle (Schreibtischtest)', 'Tabelle, in der man die Variablenwerte Schritt für Schritt von Hand ausrechnet'],
      ['Kopfgesteuert', 'Die Bedingung wird geprüft, bevor die Schleife überhaupt startet'],
      ['Fußgesteuert', 'Die Schleife läuft mindestens einmal, bevor am Ende die Bedingung geprüft wird'],
      ['Modulo (MOD)', 'Berechnung des Restes einer Ganzzahldivision (z. B. 7 MOD 3 = 1)'],
      ['Sequenz', 'Nacheinander folgende Anweisungen ohne Bedingungen'],
      ['Iteration', 'Ein einzelner Wiederholungsdurchlauf einer Schleife'],
      ['Rekursion', 'Eine Funktion ruft sich selbst mit veränderten Parametern auf'],
    ]],
    ['see', ['eua-pap', 'eua-pseudocode', 'eua-kontroll', 'eua-onotation']],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Erklären Sie den Unterschied zwischen einer kopfgesteuerten und einer fußgesteuerten Schleife im Struktogramm. Nennen Sie jeweils die minimale Anzahl an Durchläufen.', [
      '- Bei der **kopfgesteuerten Schleife (while)** wird die Ausführungsbedingung **vor** dem ersten Durchlauf im Schleifenkopf geprüft. Ist die Bedingung von Anfang an unwahr, wird die Schleife **0-mal** durchlaufen.',
      '- Bei der **fußgesteuerten Schleife (do-while)** wird die Bedingung erst **am Ende (im Fuß)** geprüft. Der Schleifenrumpf wird daher **mindestens 1-mal** durchlaufen.',
    ], 4],
    ['qa', 'Ein Algorithmus initialisiert `x = 1` und `y = 10`. Die Schleife läuft solange `x < y`. In jedem Schritt wird gerechnet: `x = x * 2` und `y = y - 1`. Führen Sie einen Schreibtischtest durch und ermitteln Sie die Endwerte von x und y sowie die Anzahl der Schleifendurchläufe.', [
      '- Start: x = 1, y = 10',
      '- 1. Durchlauf: x < y (1 < 10 wahr) -> x = 1 * 2 = **2**, y = 10 - 1 = **9**',
      '- 2. Durchlauf: x < y (2 < 9 wahr) -> x = 2 * 2 = **4**, y = 9 - 1 = **8**',
      '- 3. Durchlauf: x < y (4 < 8 wahr) -> x = 4 * 2 = **8**, y = 8 - 1 = **7**',
      '- 4. Prüfung: x < y (8 < 7 falsch) -> Abbruch!',
      '- **Endergebnis:** Die Schleife läuft **3-mal**. Endwerte: **x = 8, y = 7**.',
      'Zusammen 5 Punkte.',
    ], 5],
    ['quiz', [
      {q: 'Welches Merkmal unterscheidet ein Struktogramm (DIN 66261) von einem Programmablaufplan (DIN 66001)?', o: ['Ein Struktogramm hat keinerlei Pfeile oder freie Sprunglinien', 'Ein Struktogramm darf nur für Java verwendet werden', 'Ein Struktogramm enthält keine Schleifen', 'Ein Struktogramm ist nur für Datenbanken gedacht'], a: 0, e: 'Struktogramme verbieten Pfeile und Sprünge, um strukturierte Programmierung zu erzwingen.'},
      {q: 'Wie oft wird eine fußgesteuerte Schleife (do-while) mindestens ausgeführt?', o: ['Mindestens 1 Mal', 'Mindestens 0 Mal', 'Mindestens 2 Mal', 'Immer genau 10 Mal'], a: 0, e: 'Da die Prüfbedingung erst am Ende steht, läuft der Schleifenkörper immer mindestens einmal.'},
      {q: 'Was ist das Ergebnis von 17 MOD 5?', o: ['2', '3', '3.4', '1'], a: 0, e: '17 geteilt durch 5 ist 3, Rest 2 (17 = 3 * 5 + 2).'},
      {q: 'Wozu dient ein Schreibtischtest (Trace-Tabelle)?', o: ['Zur manuellen Überprüfung von Variablenwerten und Logikfehlern Schritt für Schritt', 'Zum Messen des Stromverbrauchs des Prozessors', 'Zum automatischen Kompilieren des Quellcodes', 'Zur grafischen Darstellung eines ER-Modells'], a: 0, e: 'Mit einem Schreibtischtest prüft man Algorithmen von Hand auf Papier.'},
    ]],
  ],
});
