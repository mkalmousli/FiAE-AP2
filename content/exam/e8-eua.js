// Probeprüfung 8, Entwicklung und Umsetzung von Algorithmen: Bildungswerk Rhein-Main gGmbH, LernPortal.
(function () {
  const ID = 'exam8-eua';
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 8 (Bildung)', t: 'Algorithmen: E-Learning-Plattform LernPortal', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.eua,
    hint: 'Aufgabensatz im Format der AP2: 4 Handlungsschritte, je 25 Punkte, 90 Minuten. Programmiere in Pseudocode oder in einer Sprache deiner Wahl (Java, Python, C#). Die Musterlösung zeigt mehrere Sprachen, Struktogramme und Schritt-für-Schritt-Tabellen.',
    intro: [
      ['p', 'Du entwickelst bei der **WebWerk Digital GmbH** die E-Learning-Plattform **LernPortal** für das **Bildungswerk Rhein-Main gGmbH** weiter. Die Plattform verwaltet Kurse, Tests und Zertifikate.'],
      ['kv', [['punkte[i]', 'Feld mit den Testpunkten der Teilnehmenden. **-1** heißt: hat nicht am Test teilgenommen'], ['maxPunkte', 'höchste Punktzahl des Tests, zum Beispiel 60'], ['Notenschlüssel', 'Prozent = Punkte x 100 / maxPunkte. Ab 92 % = Note 1, ab 81 % = 2, ab 67 % = 3, ab 50 % = 4, ab 30 % = 5, darunter Note 6'], ['Indizes', 'beginnen bei 0; länge(feld) liefert die Anzahl der Elemente'], ['Ganzzahlen', 'In Java, C# und Pseudocode ergibt 7 / 2 den Wert 3 (ohne Rest). Rest: Modulo %']]],
    ],
    words: [['Feld (Array)', 'Liste mit festen Plätzen. Jeder Platz hat einen Index, der bei 0 beginnt.'], ['Index', 'Nummer eines Platzes im Feld.'], ['Schreibtischtest', 'Du spielst das Programm auf Papier durch und notierst die Werte in einer Tabelle.'], ['Rückgabewert', 'Das Ergebnis, das eine Funktion zurückgibt.'], ['Schleife', 'Der Code wird wiederholt.'], ['Rekursion', 'Eine Funktion ruft sich selbst auf.'], ['Basisfall', 'Der einfache Fall, bei dem die Rekursion endet.'], ['Pivot', 'Vergleichselement beim Quicksort.'], ['Knoten', 'Ein Punkt im Baum oder Graphen.'], ['Kante', 'Verbindung zwischen zwei Knoten.'], ['Traversierung', 'Alle Knoten eines Baums in einer bestimmten Reihenfolge besuchen.'], ['Schnittstelle (Interface)', 'Beschreibt Methoden, die eine Klasse haben muss. Ohne Code.'], ['Entwurfsmuster', 'Bewährte Lösung für ein bekanntes Problem im Programm.'], ['JOIN', 'Tabellen in SQL über gleiche Werte verbinden.'], ['Unittest', 'Test einer kleinen Einheit, zum Beispiel einer Funktion.'], ['Grenzwert', 'Wert genau an der Grenze eines Bereichs.']]});

  /* ---------------- Handlungsschritt 1 ---------------- */
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Testpunkte auswerten (25 Punkte)',
    tasks: [
      {pts: 7, rows: 11, topic: 'Notenschlüssel', q: 'Entwickle die Funktion **notenFuerPunkte(punkte, maxPunkte)**. Sie gibt die Note 1 bis 6 nach dem Notenschlüssel aus der Einleitung zurück. Gilt maxPunkte <= 0, punkte < 0 oder punkte > maxPunkte, gibt sie **-1** zurück. Achte auf die Ganzzahl-Division. Gib außerdem für maxPunkte = 60 die Note bei 55, 49, 48, 40 und 17 Punkten an.',
        op: '**Entwickeln** heißt: einen Algorithmus selbst schreiben, in Pseudocode oder einer Sprache.',
        hint: 'Prüfe zuerst die ungültigen Werte. Rechne dann Prozent aus. Multipliziere zuerst, dann teile. Prüfe die Grenzen von oben nach unten.',
        words: [['Ganzzahl-Division', 'Bei Ganzzahlen wird der Rest abgeschnitten: 5 / 2 = 2.'], ['ungültig', 'Nicht erlaubt oder sinnlos, zum Beispiel negative Punkte.']],
        a: ['Kernidee: erst ungültige Eingaben, dann **Prozent = punkte * 100 / max** (erst multiplizieren, sonst ergibt die Ganzzahl-Division immer 0), dann Kette von Vergleichen von oben nach unten.',
          ['codes', [['pseudo', `funktion notenFuerPunkte(punkte, maxPunkte)
    wenn maxPunkte <= 0 oder punkte < 0 oder punkte > maxPunkte dann
        rückgabe -1
    ende wenn
    prozent = punkte * 100 / maxPunkte
    wenn prozent >= 92 dann rückgabe 1
    sonst wenn prozent >= 81 dann rückgabe 2
    sonst wenn prozent >= 67 dann rückgabe 3
    sonst wenn prozent >= 50 dann rückgabe 4
    sonst wenn prozent >= 30 dann rückgabe 5
    sonst rückgabe 6
    ende wenn
ende funktion`], ['java', `static int notenFuerPunkte(int punkte, int maxPunkte) {
    if (maxPunkte <= 0 || punkte < 0 || punkte > maxPunkte) return -1;
    double prozent = punkte * 100.0 / maxPunkte;   // 100.0 erzwingt Gleitkomma
    if (prozent >= 92) return 1;
    if (prozent >= 81) return 2;
    if (prozent >= 67) return 3;
    if (prozent >= 50) return 4;
    if (prozent >= 30) return 5;
    return 6;
}`], ['python', `def noten_fuer_punkte(punkte, max_punkte):
    if max_punkte <= 0 or punkte < 0 or punkte > max_punkte:
        return -1
    prozent = punkte * 100 / max_punkte
    for grenze, note in ((92, 1), (81, 2), (67, 3), (50, 4), (30, 5)):
        if prozent >= grenze:
            return note
    return 6`]]],
          ['table', ['Punkte (max 60)', 'Prozent', 'Note'], [['55', '91,67 %', '**2** (nicht 1, 91,67 liegt unter 92)'], ['49', '81,67 %', '2'], ['48', '80,00 %', '3'], ['40', '66,67 %', '**4** (nicht 3, 66,67 liegt unter 67)'], ['17', '28,33 %', '6']]],
          'Bewertung: Ungültig-Prüfung 1 P, Prozentrechnung richtig 2 P, Kette der Vergleiche 2 P, Werte-Tabelle 2 P (5 richtige = 2 P, 3 bis 4 = 1 P).'],
        sol: [['diagram', AP2.dg.nsd([['if', 'ungültige Eingabe ?', [['act', 'rückgabe -1']], [
          ['act', 'prozent = punkte * 100 / maxPunkte'],
          ['if', 'prozent >= 92 ?', [['act', 'rückgabe 1']], [['if', 'prozent >= 81 ?', [['act', 'rückgabe 2']], [['if', 'prozent >= 67 ?', [['act', 'rückgabe 3']], [['if', 'prozent >= 50 ?', [['act', 'rückgabe 4']], [['if', 'prozent >= 30 ?', [['act', 'rückgabe 5']], [['act', 'rückgabe 6']]]]]]]]]]]]]], {w: 700, cap: 'Dieselbe Lösung als Struktogramm'})],
          ['warn', 'Falle 1: In Java ist 55 / 60 * 100 gleich 0, weil 55 / 60 zuerst als Ganzzahl 0 ergibt. Falle 2: Die Grenzen von **unten** nach oben prüfen führt zu falschen Noten, weil jeder Wert „>= 30“ ist.']],
        see: ['eua-kontroll', 'eua-datentypen', 'ps-struktogramm']},
      {pts: 10, rows: 14, topic: 'Durchschnitt und Verteilung', q: 'Gegeben ist das Feld **punkte = [48, 55, -1, 60, 22, 40, -1, 52]** (maxPunkte = 60). a) Entwickle die Funktion **durchschnitt(punkte)**: Sie berechnet den Durchschnitt aller Teilnehmenden, **ohne die Werte -1**. Hat niemand teilgenommen, gibt sie **-1** zurück. b) Entwickle die Funktion **verteilung(punkte, maxPunkte)**. Sie gibt ein Feld mit 6 Plätzen zurück: Platz 0 zählt die Note 1, Platz 5 die Note 6. Nutze notenFuerPunkte aus der vorigen Aufgabe. c) Gib das Ergebnis beider Funktionen für das gegebene Feld an.',
        op: '**Entwickeln**: eigenen Code schreiben. **Angeben**: das Ergebnis nennen, ohne lange Erklärung.',
        hint: 'a) Zwei Variablen: Summe und Anzahl. Nur addieren, wenn der Wert nicht -1 ist. b) Zähle in einem Feld mit 6 Nullen. Die Note minus 1 ist der Index.',
        words: [['Durchschnitt', 'Summe aller Werte geteilt durch ihre Anzahl.'], ['Teilnahme', 'Jemand hat den Test geschrieben.'], ['Zähler', 'Variable, die bei jedem Treffer um 1 größer wird.']],
        a: [['codes', [['pseudo', `funktion durchschnitt(punkte)
    summe = 0
    anzahl = 0
    für i = 0 bis länge(punkte) - 1
        wenn punkte[i] >= 0 dann
            summe = summe + punkte[i]
            anzahl = anzahl + 1
        ende wenn
    ende für
    wenn anzahl = 0 dann
        rückgabe -1
    ende wenn
    rückgabe summe / anzahl     // Gleitkomma-Division
ende funktion

funktion verteilung(punkte, maxPunkte)
    h = neues Feld[6] mit Nullen
    für i = 0 bis länge(punkte) - 1
        wenn punkte[i] >= 0 dann
            note = notenFuerPunkte(punkte[i], maxPunkte)
            wenn note >= 1 dann
                h[note - 1] = h[note - 1] + 1
            ende wenn
        ende wenn
    ende für
    rückgabe h
ende funktion`], ['java', `static double durchschnitt(int[] punkte) {
    int summe = 0, anzahl = 0;
    for (int p : punkte) {
        if (p >= 0) { summe += p; anzahl++; }
    }
    return anzahl == 0 ? -1 : (double) summe / anzahl;
}

static int[] verteilung(int[] punkte, int maxPunkte) {
    int[] h = new int[6];
    for (int p : punkte) {
        if (p < 0) continue;
        int note = notenFuerPunkte(p, maxPunkte);
        if (note >= 1) h[note - 1]++;
    }
    return h;
}`], ['python', `def durchschnitt(punkte):
    gueltig = [p for p in punkte if p >= 0]
    return sum(gueltig) / len(gueltig) if gueltig else -1

def verteilung(punkte, max_punkte):
    h = [0] * 6
    for p in punkte:
        if p < 0:
            continue
        note = noten_fuer_punkte(p, max_punkte)
        if note >= 1:
            h[note - 1] += 1
    return h`]]],
          'c) **durchschnitt:** gültige Werte 48, 55, 60, 22, 40, 52. Summe = 277, Anzahl = 6. 277 / 6 = **46,17** (gerundet). **verteilung:** Noten: 48 → 3, 55 → 2, 60 → 1, 22 → 5, 40 → 4, 52 → 2. Ergebnis **[1, 2, 1, 1, 1, 0]**.',
          'Bewertung: a) 5 P (Schleife 1, -1 überspringen 1, Summe und Anzahl 1, Sonderfall 1, Gleitkomma-Division 1). b) 4 P. c) 1 P.'],
        sol: [['chart', {kind: 'bar', w: 640, h: 240, labels: ['Note 1', 'Note 2', 'Note 3', 'Note 4', 'Note 5', 'Note 6'], series: [{n: 'Anzahl Teilnehmende', d: [1, 2, 1, 1, 1, 0], k: 'accent'}], vals: true, ymax: 3, yl: 'Anzahl', cap: 'Ergebnis von verteilung(...): [1, 2, 1, 1, 1, 0]'}],
          ['warn', 'Falle: summe / anzahl mit zwei Ganzzahlen ergibt 46 statt 46,17. In Java mit (double) umwandeln. Zweite Falle: Die -1 darf weder in die Summe noch in die Anzahl.']],
        see: ['eua-listen', 'eua-datentypen']},
      {pts: 8, rows: 11, topic: 'Schreibtischtest', q: 'Gegeben ist die Funktion **zweitbester(feld)**. a) Führe einen Schreibtischtest mit dem Feld [48, 55, -1, 60, 22, 40, -1, 52] durch. Notiere nach jedem Durchlauf i, feld[i], erster und zweiter. b) Gib den Rückgabewert an. c) Was gibt die Funktion für [60, 60] zurück? Ist das sinnvoll? d) Beschreibe in einem Satz, was die Funktion berechnet.',
        ctx: [['code', 'pseudo', `funktion zweitbester(feld)
    erster = -1
    zweiter = -1
    für i = 0 bis länge(feld) - 1
        wenn feld[i] > erster dann
            zweiter = erster
            erster = feld[i]
        sonst wenn feld[i] > zweiter dann
            zweiter = feld[i]
        ende wenn
    ende für
    rückgabe zweiter
ende funktion`]],
        op: '**Durchführen** heißt: Schritt für Schritt abarbeiten. **Beschreiben**: sagen, was die Funktion tut.',
        hint: 'Zeichne eine Tabelle. Eine Zeile je Durchlauf. Schreibe nur Werte neu, die sich ändern, aber trage immer die aktuellen Werte ein.',
        words: [['Durchlauf', 'Ein Mal die Schleife ausführen.'], ['Gleichstand', 'Zwei Werte sind gleich groß.']],
        a: [['table', ['i', 'feld[i]', 'Bedingung', 'erster', 'zweiter'], [['Start', '-', '-', '-1', '-1'], ['0', '48', '48 > -1: ja', '**48**', '-1'], ['1', '55', '55 > 48: ja', '**55**', '**48**'], ['2', '-1', '-1 > 55 nein, -1 > 48 nein', '55', '48'], ['3', '60', '60 > 55: ja', '**60**', '**55**'], ['4', '22', 'nein, nein', '60', '55'], ['5', '40', 'nein, nein', '60', '55'], ['6', '-1', 'nein, nein', '60', '55'], ['7', '52', '52 > 60 nein, 52 > 55 nein', '60', '55']]],
          'b) Rückgabewert: **55**.', 'c) Für [60, 60]: i = 0: erster = 60, zweiter = -1. i = 1: 60 > 60 ist falsch, aber 60 > -1 ist wahr, also zweiter = 60. Ergebnis **60**. Das ist sinnvoll, wenn „zweitbester Wert“ gemeint ist und zwei Personen die Höchstpunktzahl haben (der zweite Platz ist ebenfalls 60). Wer den zweiten **verschiedenen** Wert will, braucht die Bedingung „feld[i] < erster“.', 'd) Die Funktion ermittelt den **zweithöchsten Wert** im Feld (-1 wird nur zurückgegeben, wenn es weniger als zwei gültige Werte gibt).', 'Bewertung: Tabelle 5 P (Startzeile und Folgefehler großzügig), b) 1 P, c) 1 P, d) 1 P.'],
        sol: [['walk', {t: 'Schreibtischtest zweitbester', steps: [
          {t: '**Start:** erster und zweiter sind -1. Das Feld hat 8 Werte (Index 0 bis 7).', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6', '7'], [['Punkte', '48', '55', '**-1**', '60', '22', '40', '**-1**', '52']]]]},
          {t: '**i = 0 und 1:** 48 wird erster. Dann kommt 55: Die alte Nummer eins (48) rutscht auf Platz zwei. erster = 55, zweiter = 48.', b: [['table', ['i', 'erster', 'zweiter'], [['0', '48', '-1'], ['1', '55', '48']]]]},
          {t: '**i = 2:** -1 ist kleiner als beide. Nichts ändert sich. **i = 3:** 60 ist neuer erster. Die 55 rutscht auf Platz zwei.', b: [['table', ['i', 'erster', 'zweiter'], [['2', '55', '48'], ['3', '60', '55']]]]},
          {t: '**i = 4 bis 7:** 22, 40, -1 und 52 sind alle kleiner als 55. Es gibt keine Änderung mehr. Rückgabe: **55**.', b: [['out', '55']]},
        ]}]],
        see: ['eua-algoexam', 'eua-pseudocode', 'eua-debugging']},
    ],
  });

  /* ---------------- Handlungsschritt 2 ---------------- */
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Sortieren, Suchen und Rekursion (25 Punkte)',
    ctx: [['h3', 'Anlage 1: Partitionierung beim Quicksort (Lomuto-Verfahren, Pivot = letztes Element)'],
      ['code', 'pseudo', `funktion partition(a, links, rechts)
    pivot = a[rechts]
    i = links - 1
    für j = links bis rechts - 1
        wenn a[j] <= pivot dann
            i = i + 1
            tausche(a, i, j)          // vertauscht a[i] und a[j]
        ende wenn
    ende für
    tausche(a, i + 1, rechts)
    rückgabe i + 1                    // Position des Pivots
ende funktion

funktion quicksort(a, links, rechts)
    wenn links < rechts dann
        p = partition(a, links, rechts)
        quicksort(a, links, p - 1)
        quicksort(a, p + 1, rechts)
    ende wenn
ende funktion`]],
    tasks: [
      {pts: 9, rows: 13, topic: 'Quicksort', q: 'Sortiere das Feld **a = [38, 27, 43, 3, 9, 82, 10]** (Teilnehmernummern) mit quicksort aus Anlage 1. a) Führe den **ersten** Aufruf von partition(a, 0, 6) im Schreibtischtest durch. Notiere j, i, die Entscheidung und das Feld nach jedem Schritt. Gib den Rückgabewert an. b) Gib das Feld nach dem Sortieren an und nenne, auf welchen Teilfeldern danach noch quicksort aufgerufen wird. c) Nenne den schlechtesten Fall für diese Pivot-Wahl und die Laufzeit im besten und im schlechtesten Fall.',
        op: '**Durchführen**: Schritt für Schritt rechnen und aufschreiben. **Nennen**: kurze Antwort.',
        hint: 'Alles, was kleiner oder gleich dem Pivot ist, kommt nach links. Am Ende wird der Pivot an die richtige Stelle getauscht.',
        words: [['Partition', 'Das Feld wird in „kleiner als Pivot“ und „größer als Pivot“ geteilt.'], ['Laufzeit', 'Wie lange der Algorithmus dauert, abhängig von der Zahl n der Elemente.'], ['O(n log n)', 'Etwas mehr als linear. Sehr schnell für Sortierverfahren.']],
        a: ['a) Pivot = a[6] = **10**, i = -1.', ['table', ['j', 'a[j]', '<= 10?', 'i danach', 'Feld'], [['0', '38', 'nein', '-1', '[38, 27, 43, 3, 9, 82, 10]'], ['1', '27', 'nein', '-1', 'unverändert'], ['2', '43', 'nein', '-1', 'unverändert'], ['3', '3', 'ja', '0', 'tausche(0, 3): [**3**, 27, 43, **38**, 9, 82, 10]'], ['4', '9', 'ja', '1', 'tausche(1, 4): [3, **9**, 43, 38, **27**, 82, 10]'], ['5', '82', 'nein', '1', 'unverändert'], ['Ende', '-', '-', '-', 'tausche(2, 6): [3, 9, **10**, 38, 27, 82, **43**]']]],
          'Rückgabe: **2** (Pivot 10 steht jetzt an der endgültigen Stelle).', 'b) Sortiertes Feld: **[3, 9, 10, 27, 38, 43, 82]**. Weitere Aufrufe: links [3, 9] (Index 0 bis 1), rechts [38, 27, 82, 43] (Index 3 bis 6). Im rechten Teil: Pivot 43, danach Teilfelder [38, 27] und [82]. Im linken Teil wird [3, 9] mit Pivot 9 geprüft, 3 bleibt links.', 'c) Schlechtester Fall: Das Feld ist **schon sortiert** (oder umgekehrt). Der Pivot ist dann immer das größte Element, ein Teilfeld ist leer. Laufzeit **O(n²)**. Bester und durchschnittlicher Fall: **O(n log n)**, weil die Teilfelder etwa gleich groß sind.', 'Bewertung: a) 5 P (Tabelle 4 P, Rückgabe 1 P), b) 2 P, c) 2 P.'],
        sol: [['walk', {t: 'Quicksort auf [38, 27, 43, 3, 9, 82, 10]', steps: [
          {t: '**Runde 1:** Pivot ist 10. Kleinere Werte (3, 9) wandern nach links. 10 landet auf Index 2.', b: [['diagram', {w: 760, h: 110, keep: 560, cap: 'Nach partition(0, 6): links < 10, rechts > 10', nodes: [
            {id: 'a', k: 'box', x: 130, y: 55, w: 160, h: 44, t: '3, 9', s: 'ok'}, {id: 'p', k: 'box', x: 290, y: 55, w: 60, h: 44, t: '10', s: 'gold'}, {id: 'b', k: 'box', x: 500, y: 55, w: 280, h: 44, t: '38, 27, 82, 43', s: 'accent'}], edges: []}]]},
          {t: '**Runde 2:** Links [3, 9]: Pivot 9, die 3 ist kleiner, fertig. Rechts [38, 27, 82, 43]: Pivot 43. 38 und 27 sind kleiner, 82 ist größer. 43 landet auf Index 5.', b: [['table', ['Teilfeld', 'Pivot', 'Ergebnis'], [['[3, 9]', '9', '[3, 9], Pivot an Index 1'], ['[38, 27, 82, 43]', '43', '[38, 27, **43**, 82]']]]]},
          {t: '**Runde 3:** [38, 27] mit Pivot 27: 38 > 27, also Tausch: [27, 38]. [82] hat nur ein Element. Gesamtergebnis: **[3, 9, 10, 27, 38, 43, 82]**.', b: [['out', '[3, 9, 10, 27, 38, 43, 82]']]},
        ]}]],
        see: ['eua-sortieren', 'eua-onotation']},
      {pts: 4, rows: 7, topic: 'Mergesort', q: 'a) Beschreibe die Idee von **Mergesort** in drei Schritten. b) Mische (merge) die zwei sortierten Listen **A = [12, 30, 45]** und **B = [8, 30, 50, 61]**. Gib das Ergebnis und die Zahl der Vergleiche an. c) Ist Mergesort stabil? Erkläre kurz, was das bedeutet.',
        op: '**Beschreiben**: Schritte in der richtigen Reihenfolge nennen. **Erklären**: was es ist und warum.',
        hint: 'Beim Mischen vergleichst du immer die vordersten Elemente beider Listen und nimmst das kleinere.',
        words: [['mischen (merge)', 'Zwei sortierte Listen zu einer sortierten Liste zusammenführen.'], ['stabil', 'Gleiche Werte behalten ihre alte Reihenfolge.'], ['teile und herrsche', 'Ein Problem in kleine Teile zerlegen und die Teile einzeln lösen.']],
        a: ['a) **1. Teilen:** Die Liste in zwei Hälften teilen. **2. Herrschen:** Beide Hälften rekursiv sortieren (eine Liste mit einem Element ist schon sortiert). **3. Mischen:** Die sortierten Hälften zu einer sortierten Liste zusammenführen. Laufzeit **O(n log n)**, braucht Zusatzspeicher.', 'b) Ergebnis: **[8, 12, 30, 30, 45, 50, 61]**. Vergleiche: 12 mit 8, 12 mit 30, 30 mit 30, 45 mit 30, 45 mit 50 = **5 Vergleiche**. Danach ist A leer, der Rest von B (50, 61) wird ohne Vergleich angehängt.', 'c) Ja, **stabil**, wenn bei Gleichheit das Element aus der linken Liste zuerst genommen wird: Zwei gleiche Werte (hier die beiden 30) bleiben in ihrer ursprünglichen Reihenfolge.', 'Bewertung: a) 1,5 P, b) 1,5 P, c) 1 P.'],
        sol: [['table', ['Schritt', 'Vergleich', 'genommen', 'Ergebnis bisher'], [['1', '12 : 8', '8 (B)', '[8]'], ['2', '12 : 30', '12 (A)', '[8, 12]'], ['3', '30 : 30', '30 (A, links)', '[8, 12, 30]'], ['4', '45 : 30', '30 (B)', '[8, 12, 30, 30]'], ['5', '45 : 50', '45 (A)', '[8, 12, 30, 30, 45]'], ['Rest', 'A leer', '50, 61 (B)', '[8, 12, 30, 30, 45, 50, 61]']]]],
        see: ['eua-sortieren']},
      {pts: 6, rows: 10, topic: 'Binärsuche', q: 'Die Teilnehmernummern liegen **sortiert** im Feld ids = [1004, 1017, 1023, 1031, 1040, 1052, 1066, 1078, 1085, 1099]. a) Entwickle die Funktion **binSuche(ids, ziel)**, die iterativ (mit Schleife) den Index von ziel liefert, sonst -1. b) Suche damit 1066 und danach 1050. Notiere für jeden Schritt links, rechts, mitte und die Entscheidung. c) Warum braucht die Binärsuche bei 12.000 Einträgen höchstens 14 Vergleiche?',
        op: '**Entwickeln**: Code schreiben. **Begründen**: einen Grund mit Rechnung nennen.',
        hint: 'Die Mitte ist (links + rechts) / 2. Ist ziel kleiner, suche links weiter. Ist ziel größer, suche rechts weiter. Die Schleife läuft, solange links <= rechts.',
        words: [['sortiert', 'Die Werte stehen von klein nach groß.'], ['iterativ', 'Mit einer Schleife, ohne Selbstaufruf.'], ['halbieren', 'Genau in zwei gleiche Teile teilen.']],
        a: [['codes', [['pseudo', `funktion binSuche(ids, ziel)
    links = 0
    rechts = länge(ids) - 1
    solange links <= rechts
        mitte = (links + rechts) / 2        // Ganzzahl-Division
        wenn ids[mitte] = ziel dann
            rückgabe mitte
        sonst wenn ids[mitte] < ziel dann
            links = mitte + 1
        sonst
            rechts = mitte - 1
        ende wenn
    ende solange
    rückgabe -1
ende funktion`], ['java', `static int binSuche(int[] ids, int ziel) {
    int links = 0, rechts = ids.length - 1;
    while (links <= rechts) {
        int mitte = links + (rechts - links) / 2;   // ohne Überlauf
        if (ids[mitte] == ziel) return mitte;
        if (ids[mitte] < ziel) links = mitte + 1;
        else rechts = mitte - 1;
    }
    return -1;
}`]]],
          ['table', ['Suche', 'Schritt', 'links', 'rechts', 'mitte', 'ids[mitte]', 'Entscheidung'], [['1066', '1', '0', '9', '4', '1040', '1040 < 1066: links = 5'], ['', '2', '5', '9', '7', '1078', '1078 > 1066: rechts = 6'], ['', '3', '5', '6', '5', '1052', '1052 < 1066: links = 6'], ['', '4', '6', '6', '6', '1066', '**gefunden, Index 6**'], ['1050', '1', '0', '9', '4', '1040', 'links = 5'], ['', '2', '5', '9', '7', '1078', 'rechts = 6'], ['', '3', '5', '6', '5', '1052', '1052 > 1050: rechts = 4'], ['', '4', '5', '4', '-', '-', 'links > rechts: **-1**']]],
          'c) Jeder Schritt halbiert den Suchbereich. 2¹³ = 8.192 < 12.000 < 16.384 = 2¹⁴. Nach spätestens **14 Halbierungen** bleibt nichts mehr übrig. Bei linearer Suche wären es bis zu 12.000 Vergleiche.', 'Bewertung: a) 4 P (Schleifenbedingung 1, Mitte 1, drei Fälle 1, Rückgabe -1 1), b) 1 P (beide Suchen, Folgefehler großzügig), c) 1 P.'],
        sol: [['chart', {kind: 'bar', w: 640, h: 220, labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], series: [{n: 'Teilnehmernummer', d: [1004, 1017, 1023, 1031, 1040, 1052, 1066, 1078, 1085, 1099], k: 'accent'}], vals: true, ymax: 1200, cap: 'Das sortierte Feld. Mitten: Index 4, 7, 5, 6'}],
          ['warn', 'Typische Fehler: Bedingung links < rechts (dann wird das letzte Element nicht geprüft); links = mitte statt mitte + 1 (Endlosschleife); Feld ist nicht sortiert (Binärsuche funktioniert dann nicht).']],
        see: ['eua-suchen', 'eua-onotation']},
      {pts: 6, rows: 10, topic: 'Rekursion', q: 'Gegeben ist die rekursive Funktion **quersumme(n)** (für n >= 0). a) Zeige den Ablauf für quersumme(4821) in einer Tabelle (Aufruf, Rechnung, Rückgabe). b) Nenne Basisfall und Rekursionsschritt. c) Was passiert, wenn der Basisfall fehlt? d) Nenne einen Vorteil einer Lösung mit Schleife.',
        ctx: [['code', 'pseudo', `funktion quersumme(n)
    wenn n < 10 dann
        rückgabe n
    sonst
        rückgabe (n % 10) + quersumme(n / 10)    // % = Rest, / = Ganzzahl-Division
    ende wenn
ende funktion`]],
        op: '**Zeigen** heißt: den Ablauf Schritt für Schritt notieren. **Nennen**: kurz sagen.',
        hint: 'Rechne von oben nach unten (Aufrufe), dann von unten nach oben (Rückgaben). 4821 % 10 = 1 und 4821 / 10 = 482.',
        words: [['Aufrufstapel (Call Stack)', 'Speicher für alle Funktionsaufrufe, die noch nicht fertig sind.'], ['Rekursionsschritt', 'Der Selbstaufruf mit einem einfacheren Problem.'], ['Stapelüberlauf', 'Fehler, wenn der Speicher für Aufrufe voll ist.']],
        a: [['table', ['Aufruf', 'Rechnung', 'Rückgabe'], [['quersumme(4821)', '1 + quersumme(482)', '1 + 14 = **15**'], ['quersumme(482)', '2 + quersumme(48)', '2 + 12 = **14**'], ['quersumme(48)', '8 + quersumme(4)', '8 + 4 = **12**'], ['quersumme(4)', '4 < 10: Basisfall', '**4**']]],
          'b) **Basisfall:** n < 10, Rückgabe n. **Rekursionsschritt:** letzte Ziffer (n % 10) plus Quersumme der übrigen Ziffern (n / 10). n wird mit jedem Aufruf kleiner, deshalb endet die Rekursion.', 'c) Ohne Basisfall ruft sich die Funktion endlos auf. Der Aufrufstapel läuft voll: **Stapelüberlauf** (StackOverflowError).', 'd) Eine Schleife braucht weniger Speicher (kein Aufrufstapel) und ist oft schneller; kein Stapelüberlauf bei sehr großen Eingaben.', 'Bewertung: a) 3 P (je richtiger Rückgabewert), b) 1 P, c) 1 P, d) 1 P.'],
        sol: [['diagram', AP2.dg.flow(['quersumme(4821)', '1 + quersumme(482)', '2 + quersumme(48)', '8 + quersumme(4)', 'Basisfall: 4'], {w: 820, h: 100, styles: ['accent', 'plain', 'plain', 'plain', 'ok'], bw: 140, cap: 'Hinweg: Die Aufrufe bauen sich auf. Rückweg: 4, dann 12, dann 14, dann 15.'})],
          ['codes', [['java', `static int quersummeIterativ(int n) {
    int summe = 0;
    while (n > 0) {
        summe += n % 10;
        n /= 10;
    }
    return summe;
}`], ['python', `def quersumme_iterativ(n):
    summe = 0
    while n > 0:
        summe += n % 10
        n //= 10
    return summe`]]]],
        see: ['eua-rekursion']},
    ],
  });

  /* ---------------- Handlungsschritt 3 ---------------- */
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Bäume, Graphen und Entwurfsmuster (25 Punkte)',
    tasks: [
      {pts: 9, rows: 13, topic: 'Binärer Suchbaum', q: 'Die Kursnummern **50, 30, 70, 20, 40, 60, 80, 35** werden in dieser Reihenfolge in einen leeren **binären Suchbaum** eingefügt (kleinere Werte links, größere rechts). a) Zeichne den Baum. b) Gib die Ausgabe der Traversierungen **Preorder, Inorder, Postorder** an. c) Schreibe eine rekursive Methode **inorder(knoten)**, die die Werte ausgibt. Der Knoten hat die Felder wert, links, rechts. d) Wie viele Vergleiche braucht die Suche nach 35?',
        op: '**Zeichnen**: Diagramm erstellen. **Angeben**: Ergebnis nennen. **Schreiben**: Code entwickeln.',
        hint: 'Füge Wert für Wert ein: Starte immer an der Wurzel. Kleiner: nach links. Größer: nach rechts. Preorder: Knoten, links, rechts. Inorder: links, Knoten, rechts. Postorder: links, rechts, Knoten.',
        words: [['Wurzel', 'Der oberste Knoten eines Baums.'], ['Blatt', 'Knoten ohne Kinder.'], ['Suchbaum', 'Links stehen kleinere Werte, rechts größere.'], ['Preorder / Inorder / Postorder', 'Drei Reihenfolgen, einen Baum zu besuchen.']],
        a: ['a) Wurzel 50. 30 links von 50, 70 rechts. 20 links von 30, 40 rechts von 30. 60 links von 70, 80 rechts von 70. 35 ist kleiner als 50 und 40, größer als 30: links von 40.', 'b) **Preorder:** 50, 30, 20, 40, 35, 70, 60, 80. **Inorder:** 20, 30, 35, 40, 50, 60, 70, 80 (sortiert!). **Postorder:** 20, 35, 40, 30, 60, 80, 70, 50.', ['codes', [['pseudo', `funktion inorder(knoten)
    wenn knoten ist nicht leer dann
        inorder(knoten.links)
        ausgeben(knoten.wert)
        inorder(knoten.rechts)
    ende wenn
ende funktion`], ['java', `static void inorder(Knoten k) {
    if (k == null) return;     // Basisfall
    inorder(k.links);
    System.out.println(k.wert);
    inorder(k.rechts);
}`], ['python', `def inorder(k):
    if k is None:
        return
    inorder(k.links)
    print(k.wert)
    inorder(k.rechts)`]]],
          'd) Pfad: 50, 30, 40, 35 = **4 Vergleiche** (Tiefe 3 plus der Treffer).', 'Bewertung: a) 3 P, b) 3 P (je Traversierung 1 P), c) 2 P (Basisfall 1, Reihenfolge 1), d) 1 P.'],
        sol: [['diagram', {w: 760, h: 340, keep: 600, cap: 'Der Suchbaum. Inorder liefert immer die sortierte Folge.', nodes: [
          {id: 'n50', k: 'box', x: 380, y: 40, w: 56, h: 34, t: '50', s: 'accent'}, {id: 'n30', k: 'box', x: 200, y: 120, w: 56, h: 34, t: '30'}, {id: 'n70', k: 'box', x: 560, y: 120, w: 56, h: 34, t: '70'},
          {id: 'n20', k: 'box', x: 110, y: 200, w: 56, h: 34, t: '20'}, {id: 'n40', k: 'box', x: 290, y: 200, w: 56, h: 34, t: '40'}, {id: 'n60', k: 'box', x: 470, y: 200, w: 56, h: 34, t: '60'}, {id: 'n80', k: 'box', x: 650, y: 200, w: 56, h: 34, t: '80'},
          {id: 'n35', k: 'box', x: 230, y: 280, w: 56, h: 34, t: '35', s: 'gold'},
        ], edges: [{a: 'n50', b: 'n30', ea: 'none'}, {a: 'n50', b: 'n70', ea: 'none'}, {a: 'n30', b: 'n20', ea: 'none'}, {a: 'n30', b: 'n40', ea: 'none'}, {a: 'n70', b: 'n60', ea: 'none'}, {a: 'n70', b: 'n80', ea: 'none'}, {a: 'n40', b: 'n35', ea: 'none'}]}],
          ['table', ['Traversierung', 'Reihenfolge', 'Ausgabe'], [['Preorder', 'Knoten, links, rechts', '50, 30, 20, 40, 35, 70, 60, 80'], ['Inorder', 'links, Knoten, rechts', '20, 30, 35, 40, 50, 60, 70, 80'], ['Postorder', 'links, rechts, Knoten', '20, 35, 40, 30, 60, 80, 70, 50']]]],
        see: ['eua-baeume', 'eua-rekursion']},
      {pts: 5, rows: 8, topic: 'Kürzester Weg', q: 'Das Bildungswerk hat fünf Standorte: Mainz (M), Wiesbaden (W), Darmstadt (D), Frankfurt (F) und Offenbach (O). Anlage 2 zeigt die Straßen mit Entfernung in km. Ein Dozent fährt von Mainz nach Offenbach. Bestimme mit dem Verfahren von **Dijkstra** den kürzesten Weg und seine Länge. Zeige die Entfernungstabelle.',
        ctx: [['h3', 'Anlage 2: Standorte und Entfernungen (km)'], ['diagram', {w: 760, h: 300, keep: 600, cap: 'Graph der Standorte', nodes: [
          {id: 'M', k: 'box', x: 90, y: 150, w: 56, h: 36, t: 'M', s: 'accent'}, {id: 'W', k: 'box', x: 260, y: 60, w: 56, h: 36, t: 'W'}, {id: 'D', k: 'box', x: 260, y: 240, w: 56, h: 36, t: 'D'}, {id: 'F', k: 'box', x: 470, y: 150, w: 56, h: 36, t: 'F'}, {id: 'O', k: 'box', x: 660, y: 240, w: 56, h: 36, t: 'O', s: 'gold'},
        ], edges: [{a: 'M', b: 'W', ea: 'none', t: '12'}, {a: 'M', b: 'D', ea: 'none', t: '33'}, {a: 'W', b: 'F', ea: 'none', t: '38'}, {a: 'D', b: 'F', ea: 'none', t: '30'}, {a: 'F', b: 'O', ea: 'none', t: '9'}, {a: 'D', b: 'O', ea: 'none', t: '28'}]}]],
        op: '**Bestimmen** heißt: mit einem Verfahren zu einem Ergebnis kommen und den Weg zeigen.',
        hint: 'Start: M hat Entfernung 0, alle anderen unendlich. Nimm immer den noch nicht fertigen Knoten mit der kleinsten Entfernung. Aktualisiere seine Nachbarn.',
        words: [['Graph', 'Knoten, die durch Kanten verbunden sind.'], ['Dijkstra', 'Verfahren für den kürzesten Weg ohne negative Kantenwerte.'], ['unendlich', 'Noch kein Weg bekannt.']],
        a: [['table', ['Schritt', 'M', 'W', 'D', 'F', 'O', 'fertig'], [['Start', '0', '∞', '∞', '∞', '∞', '-'], ['M fertig', '**0**', '12', '33', '∞', '∞', 'M'], ['W fertig (12)', '0', '**12**', '33', '50', '∞', 'M, W'], ['D fertig (33)', '0', '12', '**33**', '50 (63 ist nicht besser)', '61', 'M, W, D'], ['F fertig (50)', '0', '12', '33', '**50**', '**59** (50 + 9 < 61)', 'M, W, D, F'], ['O fertig', '0', '12', '33', '50', '**59**', 'alle']]],
          'Kürzester Weg: **M - W - F - O** mit 12 + 38 + 9 = **59 km**. Zum Vergleich: M - D - O hat 33 + 28 = 61 km, M - D - F - O hat 72 km.', 'Bewertung: Tabelle 3 P (Aktualisierung bei F und O 1 P), Weg 1 P, Länge 1 P.'],
        sol: [['diagram', {w: 760, h: 300, keep: 600, cap: 'Kürzester Weg M - W - F - O (59 km) hervorgehoben', nodes: [
          {id: 'M', k: 'box', x: 90, y: 150, w: 56, h: 36, t: 'M', s: 'accent'}, {id: 'W', k: 'box', x: 260, y: 60, w: 56, h: 36, t: 'W', s: 'ok'}, {id: 'D', k: 'box', x: 260, y: 240, w: 56, h: 36, t: 'D'}, {id: 'F', k: 'box', x: 470, y: 150, w: 56, h: 36, t: 'F', s: 'ok'}, {id: 'O', k: 'box', x: 660, y: 240, w: 56, h: 36, t: 'O', s: 'gold'},
        ], edges: [{a: 'M', b: 'W', t: '12'}, {a: 'M', b: 'D', ea: 'none', t: '33'}, {a: 'W', b: 'F', t: '38'}, {a: 'D', b: 'F', ea: 'none', t: '30'}, {a: 'F', b: 'O', t: '9'}, {a: 'D', b: 'O', ea: 'none', t: '28'}]}]],
        see: ['eua-baeume', 'eua-algoexam']},
      {pts: 6, rows: 11, topic: 'Entwurfsmuster Strategy', q: 'Das LernPortal soll Tests mit verschiedenen Notenschlüsseln bewerten. Das Muster **Strategy** passt dazu (Anlage 3). a) Erkläre in zwei Sätzen, was das Strategy-Muster löst. b) Schreibe die Klasse **StrengerSchluessel** (Grenzen in Prozent: 95, 85, 70, 55, 35) und die Klasse **Pruefung** mit Konstruktor, setStrategie und bewerte(punkte). c) Gib die Ausgabe des Beispielcodes an.',
        ctx: [['h3', 'Anlage 3: Strategy (UML und gegebener Code)'], ['diagram', {w: 820, h: 260, keep: 680, cap: 'Klassendiagramm: Pruefung kennt nur die Schnittstelle', nodes: [
          {id: 'p', k: 'cls', x: 150, y: 80, w: 230, t: {name: 'Pruefung', attrs: ['- maxPunkte: int', '- strategie: BewertungsStrategie'], ops: ['+ Pruefung(max: int, s: BewertungsStrategie)', '+ setStrategie(s: BewertungsStrategie)', '+ bewerte(punkte: int): int']}},
          {id: 'i', k: 'cls', x: 560, y: 70, w: 270, s: 'accent', t: {name: ['«interface»', 'BewertungsStrategie'], ops: ['+ note(punkte: int, max: int): int']}},
          {id: 's1', k: 'cls', x: 470, y: 205, w: 170, t: {name: 'StandardSchluessel', ops: ['+ note(...)']}}, {id: 's2', k: 'cls', x: 680, y: 205, w: 170, t: {name: 'StrengerSchluessel', ops: ['+ note(...)']}},
        ], edges: [{a: 'p', b: 'i', ea: 'open'}, {a: 's1', b: 'i', k: 'dash', ea: 'tri'}, {a: 's2', b: 'i', k: 'dash', ea: 'tri'}]}],
          ['code', 'java', `public interface BewertungsStrategie {
    int note(int punkte, int max);
}

public class StandardSchluessel implements BewertungsStrategie {
    public int note(int punkte, int max) {
        int p = punkte * 100 / max;
        if (p >= 92) return 1;
        if (p >= 81) return 2;
        if (p >= 67) return 3;
        if (p >= 50) return 4;
        if (p >= 30) return 5;
        return 6;
    }
}

// Aufruf:
Pruefung t = new Pruefung(60, new StandardSchluessel());
System.out.println(t.bewerte(50));
t.setStrategie(new StrengerSchluessel());
System.out.println(t.bewerte(50));`]],
        op: '**Erklären**: was es ist und wozu. **Schreiben**: Klassen als Code entwickeln. **Angeben**: Ausgabe nennen.',
        hint: 'Pruefung hat nur eine Variable vom Typ der Schnittstelle. Sie ruft strategie.note(...) auf. Welche Klasse dahintersteckt, weiß sie nicht.',
        words: [['Strategie', 'Austauschbarer Algorithmus, hier ein Notenschlüssel.'], ['implementiert', 'Eine Klasse erfüllt alle Methoden einer Schnittstelle.'], ['Polymorphie', 'Gleicher Aufruf, anderes Verhalten, je nach Objekt.']],
        a: ['a) Strategy kapselt **austauschbare Algorithmen** hinter einer gemeinsamen Schnittstelle. Der Nutzer (Pruefung) kann die Strategie **zur Laufzeit wechseln**, ohne Änderung im eigenen Code und ohne lange if-Ketten.', ['codes', [['java', `public class StrengerSchluessel implements BewertungsStrategie {
    public int note(int punkte, int max) {
        int p = punkte * 100 / max;
        if (p >= 95) return 1;
        if (p >= 85) return 2;
        if (p >= 70) return 3;
        if (p >= 55) return 4;
        if (p >= 35) return 5;
        return 6;
    }
}

public class Pruefung {
    private int maxPunkte;
    private BewertungsStrategie strategie;

    public Pruefung(int maxPunkte, BewertungsStrategie strategie) {
        this.maxPunkte = maxPunkte;
        this.strategie = strategie;
    }
    public void setStrategie(BewertungsStrategie s) {
        this.strategie = s;
    }
    public int bewerte(int punkte) {
        return strategie.note(punkte, maxPunkte);
    }
}`], ['python', `class StrengerSchluessel:
    def note(self, punkte, max_p):
        p = punkte * 100 // max_p
        for grenze, n in ((95, 1), (85, 2), (70, 3), (55, 4), (35, 5)):
            if p >= grenze:
                return n
        return 6

class Pruefung:
    def __init__(self, max_punkte, strategie):
        self.max_punkte = max_punkte
        self.strategie = strategie
    def set_strategie(self, s):
        self.strategie = s
    def bewerte(self, punkte):
        return self.strategie.note(punkte, self.max_punkte)`]]],
          'c) 50 x 100 / 60 = 83 (Ganzzahl). Standard: 83 >= 81 → Note **2**. Streng: 83 >= 70, aber < 85 → Note **3**. Ausgabe: **2** und **3**.', 'Bewertung: a) 2 P, b) 3 P (Schnittstelle implementiert 1, Feld und Konstruktor 1, bewerte delegiert 1), c) 1 P.'],
        sol: [['seq', {w: 720, actors: ['Hauptprogramm', 'Pruefung', 'Standard', 'Streng'], cap: 'Gleicher Aufruf bewerte(50), andere Strategie, anderes Ergebnis', steps: [[0, 1, 'bewerte(50)', 's'], [1, 2, 'note(50, 60)', 's'], [2, 1, '2', 'r'], [1, 0, '2', 'r'], [0, 1, 'setStrategie(streng)', 's'], [0, 1, 'bewerte(50)', 's'], [1, 3, 'note(50, 60)', 's'], [3, 1, '3', 'r'], [1, 0, '3', 'r']]}],
          ['out', `2
3`]],
        see: ['eua-patterns', 'eua-interface', 'eua-oop']},
      {pts: 5, rows: 9, topic: 'Entwurfsmuster Observer', q: 'Wenn die Dozentin einen Test freischaltet, sollen alle angemeldeten Teilnehmenden und der Mail-Dienst automatisch eine Nachricht erhalten. Dazu soll das Muster **Observer** genutzt werden. a) Nenne die zwei Rollen im Muster und ordne **Kurs**, **Teilnehmender** und **MailDienst** zu. b) Schreibe die Schnittstelle **Beobachter** und die Klasse **Kurs** mit den Methoden anmelden(b), abmelden(b) und testFreischalten(titel). c) Nenne einen Vorteil des Musters.',
        op: '**Nennen / Zuordnen**: kurze Antwort. **Schreiben**: Code entwickeln.',
        hint: 'Der Kurs hält eine Liste von Beobachtern. Wenn etwas passiert, geht er die Liste durch und ruft bei jedem aktualisiere(...) auf.',
        words: [['Observer (Beobachter)', 'Objekt, das über Änderungen informiert wird.'], ['Subject (Beobachtetes)', 'Objekt, das Änderungen meldet.'], ['benachrichtigen', 'Eine Information schicken.'], ['lose Kopplung', 'Klassen kennen sich kaum. Man kann sie leicht ändern.']],
        a: ['a) **Subject** (das Beobachtete, sendet Nachrichten): **Kurs**. **Observer** (der Beobachter, empfängt Nachrichten): **Teilnehmender** und **MailDienst** (beide implementieren die Schnittstelle Beobachter).', ['codes', [['java', `public interface Beobachter {
    void aktualisiere(String meldung);
}

public class Kurs {
    private final List<Beobachter> beobachter = new ArrayList<>();

    public void anmelden(Beobachter b)  { beobachter.add(b); }
    public void abmelden(Beobachter b)  { beobachter.remove(b); }

    public void testFreischalten(String titel) {
        String meldung = "Neuer Test: " + titel;
        for (Beobachter b : beobachter) {
            b.aktualisiere(meldung);
        }
    }
}`], ['python', `class Kurs:
    def __init__(self):
        self.beobachter = []
    def anmelden(self, b):
        self.beobachter.append(b)
    def abmelden(self, b):
        self.beobachter.remove(b)
    def test_freischalten(self, titel):
        meldung = "Neuer Test: " + titel
        for b in self.beobachter:
            b.aktualisiere(meldung)`]]],
          'c) **Lose Kopplung:** Der Kurs kennt die Empfänger nur über die Schnittstelle. Neue Empfänger (zum Beispiel eine App-Benachrichtigung) können ohne Änderung der Klasse Kurs hinzukommen. Beobachter können zur Laufzeit an- und abgemeldet werden.', 'Bewertung: a) 1 P, b) 3 P (Schnittstelle 0,5, Liste und anmelden/abmelden 1, Schleife mit Aufruf 1,5), c) 1 P.'],
        sol: [['seq', {w: 760, actors: ['Dozentin', 'Kurs (Subject)', 'Teilnehmender Anna', 'MailDienst'], cap: 'Observer: Ein Aufruf, alle Beobachter werden informiert', steps: [[0, 1, 'testFreischalten("Test 2")', 's'], [1, 2, 'aktualisiere("Neuer Test: Test 2")', 's'], [1, 3, 'aktualisiere("Neuer Test: Test 2")', 's']]}],
          ['tip', 'Strategy und Observer gehören zu den Verhaltensmustern. Strategy: ein Algorithmus wird **ausgetauscht**. Observer: viele Objekte werden bei einer Änderung **benachrichtigt**.']],
        see: ['eua-patterns', 'eua-interface']},
    ],
  });

  /* ---------------- Handlungsschritt 4 ---------------- */
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Daten, Dateien und Tests (25 Punkte)',
    ctx: [['h3', 'Anlage 4: Datenbankschema des LernPortals'], ['diagram', {w: 860, h: 270, keep: 700, cap: 'Tabellen (PK = Primärschlüssel, FK = Fremdschlüssel)', nodes: [
      {id: 'd', k: 'cls', x: 90, y: 80, w: 150, t: {name: 'dozent', attrs: ['PK dozent_id', 'name']}}, {id: 'k', k: 'cls', x: 310, y: 80, w: 180, t: {name: 'kurs', attrs: ['PK kurs_id', 'titel', 'preis', 'FK dozent_id']}},
      {id: 'a', k: 'cls', x: 570, y: 80, w: 190, s: 'accent', t: {name: 'anmeldung', attrs: ['PK, FK teilnehmer_id', 'PK, FK kurs_id', 'datum', 'bezahlt (0 oder 1)']}}, {id: 't', k: 'cls', x: 570, y: 215, w: 190, t: {name: 'teilnehmer', attrs: ['PK teilnehmer_id', 'name', 'ort']}},
    ], edges: [{a: 'k', b: 'd', ea: 'none', sa: 'many'}, {a: 'a', b: 'k', ea: 'none', sa: 'many'}, {a: 'a', b: 't', ea: 'none', sa: 'many'}]}],
      ['table', ['Beispieldaten teilnehmer', 'name'], [['T1', 'Lea Hahn'], ['T2', 'Omar Said'], ['T3', 'Eva Lutz'], ['T4', 'Jan Brandt']]],
      ['table', ['Beispieldaten anmeldung: teilnehmer_id', 'kurs_id', 'bezahlt'], [['T1', 'K10', '1'], ['T1', 'K12', '0'], ['T2', 'K10', '1'], ['T3', 'K12', '1']]]],
    tasks: [
      {pts: 11, rows: 16, topic: 'SQL', q: 'Schreibe die SQL-Anweisungen zu Anlage 4. a) Alle Kurstitel mit dem Namen des Dozenten, sortiert nach Titel. b) Je Kurs: Titel, Zahl der **bezahlten** Anmeldungen und Umsatz (Preis mal Zahl der bezahlten Anmeldungen). Nur Kurse mit **mehr als 5** bezahlten Anmeldungen. Sortiert nach Umsatz absteigend. c) Die Namen aller Teilnehmenden **ohne jede Anmeldung** (mit Unterabfrage). Welcher Name kommt mit den Beispieldaten heraus? d) Lege die Sicht (View) **v_kursstatistik** an: alle Kurse (auch ohne Anmeldung) mit Zahl der bezahlten Anmeldungen und Umsatz. Nenne einen Vorteil einer Sicht.',
        op: '**Schreiben**: SQL-Anweisung entwickeln. **Nennen**: kurze Antwort.',
        hint: 'a) JOIN über dozent_id. b) Zuerst WHERE für bezahlt, dann GROUP BY, dann HAVING. c) NOT IN mit Unterabfrage. d) Für Kurse ohne Anmeldung brauchst du einen LEFT JOIN.',
        words: [['Unterabfrage (Subselect)', 'SELECT in einem anderen SELECT.'], ['Aggregatfunktion', 'COUNT, SUM, AVG, MIN, MAX: fasst viele Zeilen zu einem Wert zusammen.'], ['HAVING', 'Filter für Gruppen, nach GROUP BY. WHERE filtert Zeilen davor.'], ['Sicht (View)', 'Gespeicherte Abfrage, die wie eine Tabelle benutzt wird.'], ['LEFT JOIN', 'Behält alle Zeilen der linken Tabelle, auch ohne Partner rechts.']],
        a: ['a)', ['code', 'sql', `SELECT k.titel, d.name AS dozent
FROM kurs k
JOIN dozent d ON d.dozent_id = k.dozent_id
ORDER BY k.titel;`], 'b)', ['code', 'sql', `SELECT k.titel,
       COUNT(*)       AS anzahl,
       SUM(k.preis)   AS umsatz
FROM kurs k
JOIN anmeldung a ON a.kurs_id = k.kurs_id
WHERE a.bezahlt = 1
GROUP BY k.kurs_id, k.titel
HAVING COUNT(*) > 5
ORDER BY umsatz DESC;`], 'c)', ['code', 'sql', `SELECT name
FROM teilnehmer
WHERE teilnehmer_id NOT IN (SELECT teilnehmer_id FROM anmeldung);`], 'Ergebnis mit den Beispieldaten: **Jan Brandt** (T4 hat keine Anmeldung).', 'd)', ['code', 'sql', `CREATE VIEW v_kursstatistik AS
SELECT k.kurs_id, k.titel,
       COUNT(a.teilnehmer_id)         AS anzahl,
       COUNT(a.teilnehmer_id) * k.preis AS umsatz
FROM kurs k
LEFT JOIN anmeldung a ON a.kurs_id = k.kurs_id AND a.bezahlt = 1
GROUP BY k.kurs_id, k.titel, k.preis;`], 'Vorteil einer Sicht: Die komplizierte Abfrage steht **einmal** in der Datenbank und wird wie eine Tabelle benutzt; man kann **Zugriffsrechte** auf die Sicht vergeben, ohne die Tabellen freizugeben.', 'Bewertung: a) 2 P, b) 4 P (JOIN 1, WHERE 1, GROUP BY 1, HAVING 1), c) 3 P (Abfrage 2, Ergebnis 1), d) 2 P (LEFT JOIN mit Bedingung im ON 1, Vorteil 1).'],
        sol: [['table', ['Ablauf von b)', 'Schritt'], [['1. FROM + JOIN', 'Kurs und Anmeldung werden verbunden'], ['2. WHERE', 'nur bezahlt = 1 bleibt'], ['3. GROUP BY', 'eine Gruppe je Kurs'], ['4. COUNT, SUM', 'Werte je Gruppe'], ['5. HAVING', 'nur Gruppen mit COUNT > 5'], ['6. ORDER BY', 'sortieren']]],
          ['warn', 'Fallen: WHERE kann keine Aggregatfunktion enthalten (COUNT gehört in HAVING). Bei NOT IN gibt es keine Treffer, wenn die Unterabfrage ein NULL liefert; NOT EXISTS ist robuster. Bei LEFT JOIN gehört die Bedingung a.bezahlt = 1 in ON, nicht in WHERE, sonst verschwinden die Kurse ohne Anmeldung wieder.']],
        see: ['eua-sqljoin', 'eua-sqlgroup', 'eua-sqlviews', 'eua-sqlexam']},
      {pts: 10, rows: 15, topic: 'CSV-Datei verarbeiten', q: 'Die Ergebnisse eines Präsenztests kommen als CSV-Datei (Trennzeichen Semikolon, Format **id;name;punkte;max**). Anlage 5 zeigt neun Zeilen. a) Nenne die Regeln, nach denen eine Zeile **ungültig** ist. b) Entwickle die Funktion **parseZeile(zeile)**: Sie gibt bei einer gültigen Zeile ein Feld [id, punkte, max] zurück, sonst **null**. c) Welche Zeilen aus Anlage 5 sind gültig? Berechne den Durchschnitt der gültigen Punkte.',
        ctx: [['h3', 'Anlage 5: Inhalt der Datei ergebnisse.csv'], ['code', 'text', `id;name;punkte;max
1001;Anna Meier;48;60
1002;Ben Koc;55;60
1003;Cem Aydin;;60

1004;Dana Wolf;k.A.;60
1005;Eva Roth;62;60
1006;Finn Beck;40;60
1007;Gül Demir;22;60;extra`]],
        op: '**Nennen**: Regeln kurz aufschreiben. **Entwickeln**: eigenen Code schreiben. **Berechnen**: Rechenweg zeigen.',
        hint: 'Teile die Zeile mit split(";") in Felder. Zähle die Felder. Wandle Text in Zahlen um und fange Fehler beim Umwandeln ab. Prüfe danach den Wertebereich.',
        words: [['CSV', 'Textdatei mit Tabellendaten. Die Werte sind durch ein Zeichen getrennt.'], ['Trennzeichen', 'Zeichen zwischen den Spalten, hier ;'], ['parsen', 'Text in Daten umwandeln.'], ['Ausnahme (Exception)', 'Fehler zur Laufzeit, zum Beispiel NumberFormatException.'], ['Wertebereich', 'Erlaubte Werte, hier 0 bis max.']],
        a: ['a) Eine Zeile ist **ungültig**, wenn: sie **leer** ist; sie **nicht genau 4 Felder** hat; id, punkte oder max **keine ganzen Zahlen** sind (auch leer oder „k.A.“); max <= 0, punkte < 0 oder **punkte > max**. Die **Kopfzeile** fällt automatisch heraus, weil „id“ keine Zahl ist.', ['codes', [['java', `static int[] parseZeile(String zeile) {
    if (zeile == null || zeile.trim().isEmpty()) return null;
    String[] f = zeile.split(";", -1);          // -1: leere Felder am Ende behalten
    if (f.length != 4) return null;
    try {
        int id     = Integer.parseInt(f[0].trim());
        int punkte = Integer.parseInt(f[2].trim());
        int max    = Integer.parseInt(f[3].trim());
        if (max <= 0 || punkte < 0 || punkte > max) return null;
        return new int[]{id, punkte, max};
    } catch (NumberFormatException e) {
        return null;                            // keine gültige Zahl
    }
}`], ['python', `def parse_zeile(zeile):
    if zeile is None or zeile.strip() == "":
        return None
    f = zeile.split(";")
    if len(f) != 4:
        return None
    try:
        id_, punkte, max_p = int(f[0]), int(f[2]), int(f[3])
    except ValueError:
        return None
    if max_p <= 0 or punkte < 0 or punkte > max_p:
        return None
    return [id_, punkte, max_p]`]]],
          ['table', ['Zeile', 'Inhalt', 'gültig?', 'Grund'], [['1', 'Kopfzeile', 'nein', '„punkte“ ist keine Zahl'], ['2', '1001 Anna Meier 48 / 60', '**ja**', '-'], ['3', '1002 Ben Koc 55 / 60', '**ja**', '-'], ['4', '1003 Cem Aydin ;; 60', 'nein', 'Punkte leer'], ['5', '(leer)', 'nein', 'leere Zeile'], ['6', '1004 Dana Wolf k.A.', 'nein', 'keine Zahl'], ['7', '1005 Eva Roth 62 / 60', 'nein', 'Punkte größer als max'], ['8', '1006 Finn Beck 40 / 60', '**ja**', '-'], ['9', '1007 Gül Demir 22;60;extra', 'nein', '5 Felder']]],
          'c) Gültig sind 3 von 9 Zeilen (1001, 1002, 1006). Durchschnitt = (48 + 55 + 40) / 3 = 143 / 3 = **47,67** Punkte.', 'Bewertung: a) 2 P, b) 6 P (leer prüfen 1, split und Feldzahl 1, Umwandlung mit trim 1, Fehlerbehandlung 1, Wertebereich 1, Rückgabe 1), c) 2 P.'],
        sol: [['diagram', AP2.dg.flow(['Zeile lesen', 'leer?', '4 Felder?', 'Zahlen umwandeln', 'Wertebereich prüfen', 'Feld [id, punkte, max]'], {w: 860, h: 100, styles: ['plain', 'bad', 'bad', 'accent', 'bad', 'ok'], bw: 125, cap: 'Prüfkette in parseZeile: Bei jeder roten Stufe kann null zurückkommen.'})],
          ['warn', 'Falle in Java: "1003;Cem;60;".split(";") liefert nur 3 Felder, weil leere Felder am Ende entfernt werden. Mit split(";", -1) bleiben sie erhalten. Falle 2: Zahl mit Leerzeichen ("48 ") braucht trim().']],
        see: ['eua-dateien', 'eua-exceptions', 'eua-formate']},
      {pts: 4, rows: 9, topic: 'Unit-Tests', q: 'Teste die Funktion **notenFuerPunkte(punkte, maxPunkte)** aus Handlungsschritt 1 mit **maxPunkte = 100** (dann ist Prozent = Punkte). Schreibe vier JUnit-Tests mit Grenzwerten: ein Test für die Grenze zwischen Note 1 und 2, ein Test für die Grenze zwischen Note 2 und 3, ein Test für die Grenze zwischen Note 5 und 6 und ein Test für ungültige Eingaben. Begründe, warum Grenzwerte gut zum Testen sind.',
        op: '**Schreiben**: Code entwickeln. **Begründen**: Grund mit „weil“ nennen.',
        hint: 'Prüfe je Grenze zwei Werte: den letzten Wert unten und den ersten Wert oben. assertEquals(erwartet, tatsächlich).',
        words: [['JUnit', 'Werkzeug für Unittests in Java.'], ['assertEquals', 'Prüft, ob erwarteter und tatsächlicher Wert gleich sind.'], ['Äquivalenzklasse', 'Gruppe von Werten, die sich gleich verhalten.']],
        a: [['code', 'java', `import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class NotenTest {
    @Test
    void grenzeEinsZwei() {
        assertEquals(1, Noten.notenFuerPunkte(92, 100));   // erster Wert für Note 1
        assertEquals(2, Noten.notenFuerPunkte(91, 100));   // letzter Wert für Note 2
    }
    @Test
    void grenzeZweiDrei() {
        assertEquals(2, Noten.notenFuerPunkte(81, 100));
        assertEquals(3, Noten.notenFuerPunkte(80, 100));
    }
    @Test
    void grenzeFuenfSechs() {
        assertEquals(5, Noten.notenFuerPunkte(30, 100));
        assertEquals(6, Noten.notenFuerPunkte(29, 100));
    }
    @Test
    void ungueltigeEingaben() {
        assertEquals(-1, Noten.notenFuerPunkte(-1, 100));
        assertEquals(-1, Noten.notenFuerPunkte(101, 100));
        assertEquals(-1, Noten.notenFuerPunkte(50, 0));
    }
}`], 'Begründung: Fehler passieren oft **an den Grenzen** (zum Beispiel > statt >=). Mit je einem Wert direkt über und unter der Grenze findet man solche Fehler mit wenigen Tests.', 'Bewertung: drei Grenztests je 1 P (Testmethode mit @Test und beide Grenzwerte richtig), ungültige Eingaben 0,5 P, Begründung 0,5 P.'],
        sol: [['table', ['Bereich', 'Note', 'Grenzwerte (max = 100)'], [['92 bis 100', '1', '**92**, 100'], ['81 bis 91', '2', '81, **91**'], ['67 bis 80', '3', '67, 80'], ['50 bis 66', '4', '50, 66'], ['30 bis 49', '5', '30, 49'], ['0 bis 29', '6', '0, **29**'], ['ungültig', '-1', '-1, 101, max = 0']]],
          ['tip', 'Im Prüfungssaal genügt es, die Grenzen als Tabelle zu notieren und zwei bis drei Tests als Code zu zeigen. Wichtig sind: @Test, assertEquals mit (erwartet, tatsächlich) und die Werte direkt an der Grenze.']],
        see: ['eua-unittest', 'eua-testfaelle']},
    ],
  });
  AP2.exam.end(ID);
})();
