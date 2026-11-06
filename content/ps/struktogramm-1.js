AP2.page('ps-struktogramm', {
  b: 'ps', g: 'UML-Modellierung', t: 'Struktogramm (Nassi-Shneiderman)',
  d: 'Ein **Struktogramm** stellt einen Algorithmus **strukturiert** dar: ineinander verschachtelte **Kästen** für **Sequenz** (Folge), **Auswahl** (Verzweigung) und **Wiederholung** (Schleife). Es gibt **keine Sprungpfeile**, deshalb ist es sehr nah an strukturiertem Code. Norm: DIN 66261.',
  m: '**Drei Grundbausteine: Folge (untereinander), Auswahl (Dreieck oben mit Ja/Nein), Wiederholung (Kasten mit Einrückung links).** Kopfgesteuert = Bedingung **oben** (kann 0-mal laufen), fußgesteuert = Bedingung **unten** (läuft mindestens 1-mal).',
  cheat: [
    ['Sequenz', ['Kästen untereinander', 'Jeder Kasten = eine Anweisung', 'Reihenfolge von oben nach unten']],
    ['Auswahl (if)', ['Kasten mit Dreieck oben', 'Bedingung in der Spitze', 'Links **Ja**, rechts **Nein**', 'Mehrfach: Fallauswahl (case)']],
    ['Wiederholung', ['**Kopfgesteuert:** Bedingung oben (while, for)', '**Fußgesteuert:** Bedingung unten (do-while)', 'Schleifenrumpf wird eingerückt']],
    ['Vorteile', ['Strukturiert, keine Sprünge', 'Leicht in Code umsetzbar', 'Nachteil: Änderungen aufwendig, wenig Platz bei tiefer Verschachtelung']],
  ],
  blocks: [
    ['h', 'Warum Struktogramme?'],
    ['p', 'Früher wurden Programme mit vielen Sprüngen (goto) geschrieben, die kaum zu verstehen waren ("Spaghetti-Code"). Das Struktogramm erzwingt **strukturiertes Programmieren**: Es gibt nur Folge, Auswahl und Wiederholung. Dadurch kann man es leicht lesen und fast **1:1 in Code** übersetzen. In der Prüfung musst du Struktogramme **lesen**, **ergänzen** und **erstellen**.'],
    ['h', 'Die Grundbausteine'],
    ['h3', '1. Sequenz (Folge)'],
    ['diagram', AP2.dg.nsd([['act', 'zahl1 einlesen'], ['act', 'zahl2 einlesen'], ['act', 'summe = zahl1 + zahl2'], ['act', 'summe ausgeben']], {w: 360, cap: 'Sequenz: Anweisungen werden von oben nach unten ausgeführt.'})],
    ['h3', '2. Auswahl (Verzweigung)'],
    ['diagram', AP2.dg.nsd([['if', 'alter >= 18', [['act', 'Ausgabe: volljährig']], [['act', 'Ausgabe: minderjährig']]]], {w: 480, cap: 'Einfache Auswahl: Je nach Bedingung wird links (Ja) oder rechts (Nein) ausgeführt.'})],
    ['code', 'java', `if (alter >= 18) {
    System.out.println("volljährig");
} else {
    System.out.println("minderjährig");
}`],
    ['h3', '3. Fallauswahl (Mehrfachauswahl)'],
    ['diagram', AP2.dg.nsd([['case', 'note', [['1', [['act', 'sehr gut']]], ['2', [['act', 'gut']]], ['3', [['act', 'befriedigend']]], ['sonst', [['act', 'schlechter']]]]]], {w: 560, cap: 'Fallauswahl: Ein Wert wird mit mehreren Fällen verglichen (switch).'})],
    ['h3', '4. Wiederholung mit Bedingung am Anfang (kopfgesteuert)'],
    ['diagram', AP2.dg.nsd([['act', 'summe = 0; i = 1'], ['while', 'solange i <= 5', [['act', 'summe = summe + i'], ['act', 'i = i + 1']]], ['act', 'summe ausgeben']], {w: 460, cap: 'Kopfgesteuerte Schleife: Die Bedingung wird vor dem Durchlauf geprüft. Ist sie sofort falsch, läuft die Schleife nie.'})],
    ['h3', '5. Wiederholung mit Bedingung am Ende (fußgesteuert)'],
    ['diagram', AP2.dg.nsd([['until', 'bis eingabe > 0', [['act', 'eingabe lesen']]]], {w: 460, cap: 'Fußgesteuerte Schleife: Der Rumpf läuft mindestens einmal, die Bedingung steht unten.'})],
  ],
});

AP2.add('ps-struktogramm', [
  ['diagram', AP2.dg.nsd([['act', 'summe = 0; anzahl = 0'], ['for', 'für jeden wert in werte', [['if', '0 <= wert UND wert <= 100', [['act', 'summe = summe + wert'], ['act', 'anzahl = anzahl + 1']], []]]], ['if', 'anzahl > 0', [['act', 'mittelwert = summe / anzahl'], ['act', 'mittelwert ausgeben']], [['act', 'keine gültigen Werte ausgeben']]]], {w: 680, cap: 'Messwertauswertung mit Bereichsprüfung und Schutz vor Division durch null'})],
  ["h", "Mehrstufiges Beispiel: gültige Messwerte auswerten"],
  ["p", "Die Liste enthält 12, −1, 18, 101 und 20. Gültig sind Werte von null bis 100 einschließlich. Gesucht sind Anzahl und Mittelwert gültiger Werte. Bei leerer gültiger Menge wird „keine gültigen Werte“ ausgegeben."],
  ["table", ["Wert", "Gültig?", "Summe danach", "Anzahl danach"], [["12", "Ja", "12", "1"], ["−1", "Nein", "12", "1"], ["18", "Ja", "30", "2"], ["101", "Nein", "30", "2"], ["20", "Ja", "50", "3"]]],
  ["p", "Ergebnis: 50 / 3 ≈ 16,67. Die Division benötigt einen passenden Dezimaltyp. Die Prüfung anzahl > 0 verhindert eine Division durch null."],
  ["qa", "**Bestimmen** Sie Anzahl und Mittelwert für die Liste −5, 0, 100, 105. **Nennen** Sie zwei wichtige Testfälle.", ["Gültig sind 0 und 100. Anzahl = **2**. 1 Punkt.", "Summe = 100. Mittelwert = 100 / 2 = **50**. 1 Punkt.", "Testfall: leere Liste oder ausschließlich ungültige Werte. 1 Punkt.", "Testfall: gültige Grenzwerte 0 und 100 mit Nachbarwerten −1 und 101. 1 Punkt."], 4],
  ["see", ["ps-testentwurf", "ps-plausibilitaet"]]
]);
