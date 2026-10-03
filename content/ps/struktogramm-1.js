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
