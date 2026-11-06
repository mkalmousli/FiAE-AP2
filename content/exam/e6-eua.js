// Probeprüfung 6, Algorithmen: AgroTrack GmbH, Sensordaten von Landmaschinen (Plattform "FeldWacht").
(function () {
  const ID = 'exam6-eua';
  // Baumdiagramm für Merge Sort: levels[i] = Liste von Texten (1, 2, 4, 8 Kästen); style für alle Kästen
  const tree = (levels, style, cap) => {
    const nodes = [];
    const edges = [];
    const last = levels[levels.length - 1];
    const gap = 108;
    const xs = [last.map((_, i) => 62 + i * gap)];
    for (let l = levels.length - 2; l >= 0; l--) xs.unshift(levels[l].map((_, j) => (xs[0][2 * j] + xs[0][2 * j + 1]) / 2));
    const ws = [320, 190, 100, 60];
    levels.forEach((lv, l) => lv.forEach((t, j) => {
      nodes.push({id: 'n' + l + '_' + j, k: 'box', x: xs[l][j], y: 34 + l * 62, w: ws[l], h: 36, t, s: style, fs: 12});
      if (l > 0) edges.push({a: 'n' + (l - 1) + '_' + Math.floor(j / 2), b: 'n' + l + '_' + j, ea: 'none'});
    }));
    return ['diagram', {w: 880, h: 34 + levels.length * 62, keep: 720, cap, nodes, edges}];
  };
  // Verkettete Liste als Kästen mit Pfeilen; vals: Texte, kopf: Beschriftung
  const chain = (vals, cap, styles) => {
    const nodes = [{id: 'kopf', k: 'box', x: 60, y: 60, w: 70, h: 36, t: 'kopf', s: 'soft'}];
    const edges = [{a: 'kopf', b: 'k0', ea: 'open'}];
    vals.forEach((v, i) => {
      nodes.push({id: 'k' + i, k: 'box', x: 190 + i * 120, y: 60, w: 80, h: 40, t: v, s: (styles && styles[i]) || 'accent'});
      if (i > 0) edges.push({a: 'k' + (i - 1), b: 'k' + i, ea: 'open'});
    });
    nodes.push({id: 'nl', k: 'box', x: 190 + vals.length * 120, y: 60, w: 70, h: 36, t: 'null', s: 'soft'});
    edges.push({a: 'k' + (vals.length - 1), b: 'nl', ea: 'open'});
    return ['diagram', {w: 330 + vals.length * 120, h: 110, keep: 560, cap, nodes, edges}];
  };
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 6 (Landtechnik)', t: 'Algorithmen: AgroTrack FeldWacht', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.eua,
    hint: 'Aufgabensatz im Format der AP2: 4 Handlungsschritte, je 25 Punkte, 90 Minuten. Programmieraufgaben darfst du in Pseudocode oder in einer Sprache deiner Wahl lösen. Löse erst alles selbst. Dann vergleiche mit der Musterlösung und den Bewertungshinweisen.',
    words: [['Sensor', 'Bauteil, das etwas misst, zum Beispiel Temperatur'], ['Messwert', 'Zahl, die ein Sensor liefert'], ['Ausreißer', 'Wert, der viel zu groß oder zu klein ist und nicht zu den anderen passt'], ['Mittelwert', 'Summe aller Werte geteilt durch ihre Anzahl'], ['Feld (Array)', 'Liste mit festem Platz für Werte, Nummern beginnen bei 0'],
      ['Schreibtischtest', 'Programm von Hand durchgehen und alle Variablen in einer Tabelle notieren'], ['Stack (Stapel)', 'Letzter rein, erster raus (LIFO)'], ['Queue (Warteschlange)', 'Erster rein, erster raus (FIFO)'], ['verkettete Liste', 'Liste aus Knoten, jeder Knoten zeigt auf den nächsten'],
      ['abstrakte Klasse', 'Klasse, von der man kein Objekt erzeugen kann. Sie ist nur Vorlage'], ['Polymorphie', 'Gleicher Aufruf, aber je nach Objekt ein anderes Verhalten'], ['Exception', 'Ausnahme: Meldung, dass ein Fehler passiert ist'], ['Unterabfrage', 'SQL-Abfrage innerhalb einer anderen Abfrage'], ['Grenzwert', 'Wert genau an der Grenze eines Bereichs']],
    intro: [
      ['p', 'Sie entwickeln bei der **AgroTrack GmbH** die Plattform **FeldWacht** weiter. Sensoren an Landmaschinen (Traktor, Mähdrescher) messen Werte wie Motortemperatur und Öldruck. Ein Gateway sendet sie an den Server. Dort verarbeitet Ihr Programm die Werte.'],
      ['p', 'Messwerte liegen in einem **Feld** (Array) von Gleitkommazahlen. Die Indizes beginnen bei 0. Mit **länge(feld)** erhalten Sie die Anzahl der Elemente.'],
      ['kv', [['werte[i]', 'Messwert Nummer i, zum Beispiel Motortemperatur in Grad Celsius'], ['-999', 'Sonderwert: Der Sensor hat einen Fehler gemeldet. Er ist **kein** echter Messwert.'], ['Gültiger Bereich', 'Motortemperatur: von -40 bis 120 Grad. Alles außerhalb ist ungültig.']]],
    ]});

  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Sensorwerte verarbeiten (25 Punkte)',
    tasks: [
      {pts: 8, rows: 13, topic: 'Algorithmus entwickeln', q: 'Entwickeln Sie die Funktion **mittelwertGueltig(werte, minW, maxW)**. Sie berechnet den Mittelwert aller Werte, die im Bereich von minW bis maxW liegen (Grenzen **eingeschlossen**). Alle anderen Werte (auch -999) werden ignoriert. Gibt es keinen gültigen Wert, liefert die Funktion **-1**. Beispiel: Für [72.5, -999, 80.1, 85.4, 140.0, 78.0] mit minW = -40 und maxW = 120 ist das Ergebnis 79.0.',
        op: '**Entwickeln** heißt: einen eigenen Algorithmus planen und aufschreiben. Du darfst Pseudocode oder eine Programmiersprache nehmen.',
        hint: 'Du brauchst zwei Variablen: eine Summe und einen Zähler. Gehe alle Werte durch. Zähle und addiere nur die gültigen. Teile erst am Ende. Denke an den Fall „kein gültiger Wert“.',
        words: [['eingeschlossen', 'Der Grenzwert selbst gehört noch dazu (kleiner-gleich, nicht kleiner)'], ['ignorieren', 'Nicht beachten']],
        a: ['Kernidee: eine Schleife über alle Werte; nur gültige Werte summieren und zählen; am Ende **durch den Zähler teilen**, aber nur wenn der Zähler größer als 0 ist (sonst Division durch 0).',
          ['codes', [['pseudo', `funktion mittelwertGueltig(werte, minW, maxW)
    summe = 0.0
    anzahl = 0
    für i = 0 bis länge(werte) - 1
        wenn werte[i] >= minW und werte[i] <= maxW dann
            summe = summe + werte[i]
            anzahl = anzahl + 1
        ende wenn
    ende für
    wenn anzahl = 0 dann
        rückgabe -1
    ende wenn
    rückgabe summe / anzahl
ende funktion`], ['java', `static double mittelwertGueltig(double[] werte, double minW, double maxW) {
    double summe = 0;
    int anzahl = 0;
    for (double w : werte) {
        if (w >= minW && w <= maxW) {
            summe += w;
            anzahl++;
        }
    }
    if (anzahl == 0) return -1;
    return summe / anzahl;
}`], ['python', `def mittelwert_gueltig(werte, min_w, max_w):
    summe = 0.0
    anzahl = 0
    for w in werte:
        if min_w <= w <= max_w:
            summe += w
            anzahl += 1
    if anzahl == 0:
        return -1
    return summe / anzahl`], ['csharp', `static double MittelwertGueltig(double[] werte, double minW, double maxW)
{
    double summe = 0;
    int anzahl = 0;
    foreach (double w in werte)
    {
        if (w >= minW && w <= maxW) { summe += w; anzahl++; }
    }
    return anzahl == 0 ? -1 : summe / anzahl;
}`]]],
          'Kontrolle am Beispiel: gültig sind 72.5, 80.1, 85.4 und 78.0 (nicht -999, nicht 140.0). Summe 316.0, Anzahl 4, 316.0 / 4 = **79.0**.',
          'Bewertung: Startwerte 1 P, Schleife über alle Werte 1 P, Bereichsprüfung mit beiden Grenzen 2 P, Summe und Zähler nur bei gültigen Werten 1 P, Sonderfall anzahl = 0 2 P, Rückgabe des Mittelwerts 1 P.'],
        sol: [['diagram', AP2.dg.nsd([['act', 'summe = 0.0; anzahl = 0'], ['for', 'für i = 0 bis länge(werte) - 1', [['if', 'werte[i] >= minW und werte[i] <= maxW ?', [['act', 'summe = summe + werte[i]'], ['act', 'anzahl = anzahl + 1']], [['act', '(nichts)']]]]],
          ['if', 'anzahl = 0 ?', [['act', 'rückgabe -1']], [['act', 'rückgabe summe / anzahl']]]], {w: 640, cap: 'Dieselbe Lösung als Struktogramm (Nassi-Shneiderman)'})],
          ['warn', 'Typische Fehler: (1) Durch länge(werte) teilen statt durch anzahl. Dann zählen die ungültigen Werte mit. (2) < statt <=: Der Grenzwert 120 wäre dann ungültig. (3) Keine Prüfung auf anzahl = 0: Division durch 0.']],
        see: ['eua-algoexam', 'eua-pseudocode', 'eua-listen']},
      {pts: 6, rows: 9, topic: 'Schreibtischtest', q: 'Führen Sie für die Funktion **analyse(werte, grenze)** einen Schreibtischtest durch mit werte = [82, 91, 95, 88, 79, 93, 97, 99, 101, 85, 90] und grenze = 90. Notieren Sie nach jedem Index i die Werte von laenge, maxLaenge und anzahl. Geben Sie den Rückgabewert an und beschreiben Sie, was die Funktion ermittelt.',
        ctx: [['code', 'pseudo', `funktion analyse(werte, grenze)
    anzahl = 0
    maxLaenge = 0
    laenge = 0
    für i = 0 bis länge(werte) - 1
        wenn werte[i] > grenze dann
            laenge = laenge + 1
            wenn laenge > maxLaenge dann
                maxLaenge = laenge
            ende wenn
        sonst
            wenn laenge > 0 dann
                anzahl = anzahl + 1
            ende wenn
            laenge = 0
        ende wenn
    ende für
    wenn laenge > 0 dann
        anzahl = anzahl + 1
    ende wenn
    rückgabe [anzahl, maxLaenge]
ende funktion`]],
        op: '**Durchführen** heißt: das Programm Schritt für Schritt von Hand ausführen. **Beschreiben**: in ganzen Sätzen sagen, was das Programm macht (nicht Zeile für Zeile, sondern den Zweck).',
        hint: 'Mache eine Tabelle mit einer Zeile für jeden Index. Schreibe immer den neuen Wert der Variablen hin. Beachte: 90 ist nicht größer als 90.',
        words: [['Schreibtischtest', 'Programm von Hand durchgehen'], ['Rückgabewert', 'Das Ergebnis, das die Funktion mit „rückgabe“ liefert']],
        a: [['table', ['i', 'werte[i]', '> 90?', 'laenge', 'maxLaenge', 'anzahl'], [['Start', '-', '-', '0', '0', '0'], ['0', '82', 'nein', '0', '0', '0'], ['1', '91', 'ja', '1', '1', '0'], ['2', '95', 'ja', '2', '2', '0'], ['3', '88', 'nein', '0', '2', '**1**'], ['4', '79', 'nein', '0', '2', '1'], ['5', '93', 'ja', '1', '2', '1'], ['6', '97', 'ja', '2', '2', '1'], ['7', '99', 'ja', '3', '**3**', '1'], ['8', '101', 'ja', '4', '**4**', '1'], ['9', '85', 'nein', '0', '4', '**2**'], ['10', '90', 'nein (90 ist nicht größer)', '0', '4', '2']]],
          'Nach der Schleife ist laenge = 0, der Block am Ende ändert nichts. Rückgabe: **[2, 4]**.',
          'Die Funktion ermittelt, wie viele **zusammenhängende Phasen** es gibt, in denen die Werte über dem Grenzwert liegen (hier: 2 Überhitzungsphasen), und wie lang die **längste Phase** ist (4 Messungen in Folge).',
          'Bewertung: Tabelle 4 P (je Fehler 0,5 P Abzug), Rückgabewert 1 P, Zweck 1 P.'],
        sol: [['chart', {kind: 'bar', w: 780, h: 280, labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], series: [{n: 'Temperatur', d: [82, 91, 95, 88, 79, 93, 97, 99, 101, 85, 90], k: 'accent'}], vals: true, ymax: 110, yl: 'Grad', cap: 'Zwei Phasen über 90 Grad: Index 1 bis 2 (Länge 2) und Index 5 bis 8 (Länge 4). Index 10 mit genau 90 zählt nicht.'}],
          ['warn', 'Falle: Der Block nach der Schleife (wenn laenge > 0 ...) zählt eine Phase, die erst am Ende der Daten aufhört. Ohne ihn würde eine Phase am Datenende nicht gezählt. In diesem Beispiel wird er nicht gebraucht, weil der letzte Wert 90 ist.']],
        see: ['eua-algoexam', 'eua-debugging']},
      {pts: 6, rows: 10, topic: 'Gleitender Mittelwert', q: 'Ein einzelner Messfehler soll geglättet werden. Der **gleitende Mittelwert** mit Fenstergröße k berechnet für jede Position den Mittelwert von k aufeinanderfolgenden Werten. a) Schreiben Sie die Funktion **gleitend(werte, k)**, die ein neues Feld mit diesen Mittelwerten zurückgibt. Ist k kleiner als 1 oder größer als die Anzahl der Werte, wird ein leeres Feld zurückgegeben. b) Berechnen Sie gleitend([10, 12, 14, 40, 16, 18], 3). c) Der Wert 40 ist ein Ausreißer. Beschreiben Sie seine Wirkung auf das Ergebnis und nennen Sie ein besseres Verfahren.',
        op: '**Schreiben** heißt: eigene Lösung als Code oder Pseudocode aufschreiben. **Berechnen**: Zwischenschritte zeigen. **Beschreiben** und **Nennen**: kurz und klar.',
        hint: 'Das Ergebnis hat länge(werte) - k + 1 Elemente. Für jedes Fenster brauchst du eine innere Schleife zum Addieren. Beim Ausreißer denke an den Median (mittlerer Wert in der Sortierung).',
        words: [['Fenster', 'Ein Stück aus k Werten nebeneinander'], ['Median', 'Der mittlere Wert, wenn man die Werte sortiert']],
        a: [['codes', [['pseudo', `funktion gleitend(werte, k)
    n = länge(werte)
    wenn k < 1 oder k > n dann
        rückgabe []
    ende wenn
    ergebnis = neues Feld der Länge n - k + 1
    für i = 0 bis n - k
        summe = 0.0
        für j = i bis i + k - 1
            summe = summe + werte[j]
        ende für
        ergebnis[i] = summe / k
    ende für
    rückgabe ergebnis
ende funktion`], ['java', `static double[] gleitend(double[] werte, int k) {
    int n = werte.length;
    if (k < 1 || k > n) return new double[0];
    double[] ergebnis = new double[n - k + 1];
    for (int i = 0; i <= n - k; i++) {
        double summe = 0;
        for (int j = i; j < i + k; j++) summe += werte[j];
        ergebnis[i] = summe / k;
    }
    return ergebnis;
}`], ['python', `def gleitend(werte, k):
    n = len(werte)
    if k < 1 or k > n:
        return []
    return [sum(werte[i:i + k]) / k for i in range(n - k + 1)]`]]],
          ['table', ['Fenster', 'Werte', 'Summe', 'Mittelwert', 'Median'], [['0', '10, 12, 14', '36', '12,0', '12'], ['1', '12, 14, 40', '66', '22,0', '14'], ['2', '14, 40, 16', '70', '23,33', '16'], ['3', '40, 16, 18', '74', '24,67', '18']]],
          'b) Ergebnis: **[12,0; 22,0; 23,33; 24,67]**.', 'c) Der Ausreißer 40 steckt in **drei von vier Fenstern** und zieht den Mittelwert stark nach oben (von 12 auf über 22). Besser ist der **Median**: Er ergibt [12, 14, 16, 18], der Ausreißer verschwindet. Alternativ: Ausreißer vorher mit einem Bereichsfilter entfernen.',
          'Bewertung: a) Randfall 1 P, Ergebnisfeld mit richtiger Länge 1 P, Schleifen mit richtigen Grenzen 2 P; b) 1 P; c) Wirkung 0,5 P, Verfahren 0,5 P.'],
        sol: [['chart', {kind: 'line', w: 720, h: 280, labels: ['1', '2', '3', '4'], series: [{n: 'Mittelwert', d: [12, 22, 23.33, 24.67], k: 'bad'}, {n: 'Median', d: [12, 14, 16, 18], k: 'ok'}], ymax: 30, yl: 'Wert', cap: 'Der Mittelwert wird vom Ausreißer 40 nach oben gezogen. Der Median bleibt nah an den normalen Werten.'}]],
        see: ['eua-listen', 'eua-pseudocode']},
      {pts: 5, rows: 8, topic: 'Datentypen und Laufzeit', q: 'a) In Java wurden summe und anzahl als int deklariert und der Mittelwert mit summe / anzahl berechnet. Welcher Fehler entsteht bei summe = 317 und anzahl = 4? Wie beheben Sie ihn? b) Geben Sie die Laufzeit von mittelwertGueltig und der Funktion gleitend aus der letzten Aufgabe in O-Notation an (n Werte, Fenster k). c) Warum vergleicht man Gleitkommazahlen nicht mit ==?',
        op: '**Angeben** heißt: das Ergebnis kurz nennen. **Begründen**: mit „weil“ erklären.',
        hint: 'Bei a) rechne im Kopf 317 geteilt durch 4 mit Ganzzahlen. Bei b) zähle, wie oft die innere Schleife läuft. Bei c) denke an 0,1 + 0,2.',
        words: [['Ganzzahldivision', 'Teilung ohne Nachkommastellen: der Rest wird abgeschnitten'], ['O-Notation', 'Kurzschreibweise dafür, wie die Laufzeit mit der Datenmenge wächst']],
        a: ['a) **Ganzzahldivision:** 317 / 4 ergibt in Java **79** statt 79,25. Die Nachkommastellen gehen verloren. Lösung: eine Variable als **double** deklarieren oder umwandeln: **(double) summe / anzahl**.',
          'b) mittelwertGueltig: jeder Wert wird einmal betrachtet: **O(n)**. gleitend: Es gibt n - k + 1 Fenster, jedes braucht k Additionen: **O(n x k)**. Mit der Technik „Summe weiterschieben“ (neue Summe = alte Summe - ältester Wert + neuer Wert) wird es **O(n)**.',
          'c) Gleitkommazahlen sind **ungenau gespeichert**: 0.1 + 0.2 ergibt 0.30000000000000004, nicht 0.3. Man vergleicht daher mit einer **Toleranz**: Math.abs(a - b) < 0.0001.',
          'Bewertung: a) Fehler 1 P, Lösung 1 P; b) je Funktion 1 P; c) 1 P (Gesamt 5 P: a 2, b 2, c 1).'],
        sol: [['codes', [['java', `int summe = 317, anzahl = 4;
System.out.println(summe / anzahl);            // 79      (Ganzzahldivision)
System.out.println((double) summe / anzahl);   // 79.25
System.out.println(0.1 + 0.2 == 0.3);          // false
System.out.println(Math.abs(0.1 + 0.2 - 0.3) < 1e-9);   // true`], ['python', `summe, anzahl = 317, 4
print(summe // anzahl)    # 79     (Ganzzahldivision)
print(summe / anzahl)     # 79.25  (/ ist in Python immer Gleitkomma)
print(0.1 + 0.2 == 0.3)   # False`]]], ['out', `79
79.25
false
true`]],
        see: ['eua-datentypen', 'eua-onotation']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Sortieren und Datenstrukturen (25 Punkte)',
    tasks: [
      {pts: 7, rows: 11, topic: 'Merge Sort', q: 'Die Vibrationswerte [47, 12, 85, 33, 60, 21, 9, 54] sollen mit **Merge Sort** (Sortieren durch Mischen) aufsteigend sortiert werden. a) Stellen Sie die Zerlegung und das Zusammenführen Schritt für Schritt dar. b) Wie viele Vergleiche sind beim letzten Zusammenführen (zwei Hälften mit je 4 Elementen) nötig? c) Geben Sie die Laufzeit in O-Notation an und begründen Sie sie kurz.',
        op: '**Darstellen** heißt: Schritt für Schritt aufschreiben oder zeichnen. **Begründen**: mit „weil“ erklären.',
        hint: 'Teile immer in der Mitte, bis nur ein Element übrig ist. Beim Zusammenführen vergleichst du jeweils die vordersten Elemente beider Teile und nimmst das kleinere.',
        words: [['Zusammenführen (Merge)', 'Zwei sortierte Listen zu einer sortierten Liste mischen'], ['teile und herrsche', 'Großes Problem in kleine Teile teilen, Teile lösen, Ergebnis zusammensetzen']],
        a: [['table', ['Schritt', 'Teilfelder'], [['Ausgang', '[47, 12, 85, 33, 60, 21, 9, 54]'], ['Teilen 1', '[47, 12, 85, 33]  |  [60, 21, 9, 54]'], ['Teilen 2', '[47, 12] [85, 33]  |  [60, 21] [9, 54]'], ['Teilen 3', 'alle einzeln: [47] [12] [85] [33] [60] [21] [9] [54]'], ['Mischen 1', '[12, 47] [33, 85]  |  [21, 60] [9, 54]'], ['Mischen 2', '[12, 33, 47, 85]  |  [9, 21, 54, 60]'], ['Mischen 3', '**[9, 12, 21, 33, 47, 54, 60, 85]**']]],
          'b) Letztes Mischen: 12:9 (9), 12:21 (12), 33:21 (21), 33:54 (33), 47:54 (47), 85:54 (54), 85:60 (60), danach bleibt 85 übrig. Das sind **7 Vergleiche** (höchstens n - 1 = 7).',
          'c) **O(n log n)**: Der Bereich wird log2(n) mal halbiert (hier 3 Ebenen), und auf jeder Ebene werden insgesamt n Elemente gemischt. Das gilt im besten und im schlechtesten Fall. Zusätzlicher Speicher: O(n).',
          'Bewertung: a) Zerlegung 1 P, Mischen mit richtigen Zwischenergebnissen 3 P; b) 1 P; c) Laufzeit 1 P, Begründung 1 P.'],
        sol: [['walk', {t: 'Merge Sort Schritt für Schritt', steps: [
          {t: '**Teilen:** Das Feld wird immer in der Mitte geteilt, bis jedes Teil nur ein Element hat. Ein einzelnes Element ist schon sortiert.', b: [tree([['47 12 85 33 60 21 9 54'], ['47 12 85 33', '60 21 9 54'], ['47 12', '85 33', '60 21', '9 54'], ['47', '12', '85', '33', '60', '21', '9', '54']], 'plain', 'Zerlegung: 3 Teilungen bei 8 Elementen')]},
          {t: '**Mischen, Ebene 1:** Je zwei Einzelelemente werden sortiert zusammengesetzt. Es gibt 4 Vergleiche.', b: [['table', ['Paar', 'Ergebnis'], [['[47] + [12]', '[12, 47]'], ['[85] + [33]', '[33, 85]'], ['[60] + [21]', '[21, 60]'], ['[9] + [54]', '[9, 54]']]]]},
          {t: '**Mischen, Ebene 2:** [12, 47] + [33, 85]: 12:33 nimmt 12, 47:33 nimmt 33, 47:85 nimmt 47, rest 85. Ergebnis [12, 33, 47, 85] (3 Vergleiche). [21, 60] + [9, 54]: 21:9 nimmt 9, 21:54 nimmt 21, 60:54 nimmt 54, rest 60. Ergebnis [9, 21, 54, 60].', b: [tree([['12 33 47 85 | 9 21 54 60'], ['12 33 47 85', '9 21 54 60']], 'ok', 'Nach dem Mischen auf Ebene 2: zwei sortierte Hälften')]},
          {t: '**Mischen, Ebene 3:** Die beiden sortierten Hälften werden zusammengesetzt: immer das kleinere der beiden vordersten Elemente. 7 Vergleiche. Ergebnis: **[9, 12, 21, 33, 47, 54, 60, 85]**.', b: [['table', ['Vergleich', 'links vorn', 'rechts vorn', 'genommen', 'Ergebnis bisher'], [['1', '12', '9', '9', '9'], ['2', '12', '21', '12', '9, 12'], ['3', '33', '21', '21', '9, 12, 21'], ['4', '33', '54', '33', '9, 12, 21, 33'], ['5', '47', '54', '47', '... 47'], ['6', '85', '54', '54', '... 54'], ['7', '85', '60', '60', '... 60'], ['Rest', '85', '-', '85', '9, 12, 21, 33, 47, 54, 60, 85']]]]},
          {t: '**Zusammenfassung der Kosten:** Ebene 1 hat 4, Ebene 2 hat 6 und Ebene 3 hat 7 Vergleiche. Zusammen 17 Vergleiche. Bei n = 8 sind das n x log2(n) = 24 als obere Grenze. Insertion Sort braucht im schlechtesten Fall 28.', b: [['chart', {kind: 'bar', w: 560, h: 240, labels: ['Ebene 1', 'Ebene 2', 'Ebene 3'], series: [{n: 'Vergleiche', d: [4, 6, 7], k: 'accent'}], vals: true, ymax: 8, cap: 'Vergleiche je Mischebene: insgesamt 17'}]]},
        ]}], ['code', 'pseudo', `funktion mische(links, rechts)          // beide Felder sind bereits sortiert
    ergebnis = []
    i = 0
    j = 0
    solange i < länge(links) und j < länge(rechts)
        wenn links[i] <= rechts[j] dann
            ergebnis anhängen links[i];  i = i + 1
        sonst
            ergebnis anhängen rechts[j]; j = j + 1
        ende wenn
    ende solange
    Rest von links ab i und Rest von rechts ab j anhängen
    rückgabe ergebnis
ende funktion`]],
        see: ['eua-sortieren']},
      {pts: 6, rows: 11, topic: 'Insertion Sort', q: 'Die Betriebsstunden mehrerer Maschinen liegen in einem Feld a vor. a) Schreiben Sie die Prozedur **insertionSort(a)**, die das Feld aufsteigend sortiert (Sortieren durch Einfügen, Ergebnis im selben Feld). b) Zeigen Sie das Feld [41, 17, 29, 8] nach jedem Durchlauf der äußeren Schleife.',
        op: '**Schreiben** heißt: Code oder Pseudocode selbst formulieren. **Zeigen**: in einer Tabelle oder Liste auflisten.',
        hint: 'Das linke Stück des Feldes ist immer sortiert. Nimm das nächste Element heraus, schiebe größere Elemente nach rechts und setze es in die Lücke.',
        words: [['einfügen', 'Ein Element an die richtige Stelle in einer sortierten Folge setzen'], ['in-place', 'Sortiert im selben Feld, ohne zweites Feld']],
        a: [['codes', [['pseudo', `prozedur insertionSort(a)
    für i = 1 bis länge(a) - 1
        wert = a[i]
        j = i - 1
        solange j >= 0 und a[j] > wert
            a[j + 1] = a[j]
            j = j - 1
        ende solange
        a[j + 1] = wert
    ende für
ende prozedur`], ['java', `static void insertionSort(int[] a) {
    for (int i = 1; i < a.length; i++) {
        int wert = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > wert) {
            a[j + 1] = a[j];     // größeres Element nach rechts schieben
            j--;
        }
        a[j + 1] = wert;         // in die Lücke einsetzen
    }
}`], ['python', `def insertion_sort(a):
    for i in range(1, len(a)):
        wert = a[i]
        j = i - 1
        while j >= 0 and a[j] > wert:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = wert`]]],
          ['table', ['Durchlauf', 'wert', 'Feld danach'], [['Start', '-', '41, 17, 29, 8'], ['i = 1', '17', '**17, 41**, 29, 8'], ['i = 2', '29', '**17, 29, 41**, 8'], ['i = 3', '8', '**8, 17, 29, 41**']]],
          'Bewertung: a) äußere Schleife ab Index 1 1 P, Wert merken 1 P, Verschieben-Schleife mit zwei Bedingungen 1 P, Einsetzen 1 P; b) 2 P.'],
        sol: [['chart', {kind: 'bar', w: 640, h: 240, labels: ['Index 0', 'Index 1', 'Index 2', 'Index 3'], series: [{n: 'Start', d: [41, 17, 29, 8], k: 'text3'}, {n: 'sortiert', d: [8, 17, 29, 41], k: 'accent'}], vals: true, ymax: 50, cap: 'Vorher und nachher: die 8 wandert von ganz rechts ganz nach links (3 Verschiebungen)'}],
          ['warn', 'Die Reihenfolge der Bedingungen ist wichtig: j >= 0 muss vor a[j] > wert stehen. Sonst greift das Programm auf a[-1] zu (Fehler).']],
        see: ['eua-sortieren']},
      {pts: 6, rows: 9, topic: 'Stack und Queue', q: 'a) Eine **Queue** (Warteschlange) nimmt Alarmmeldungen auf. Die Operationen sind: enqueue(A1), enqueue(A2), dequeue(), enqueue(A3), enqueue(A4), dequeue(), peek(). Geben Sie nach jeder Operation den Inhalt (vorn links) und die Rückgabe an. b) Ein **Stack** (Stapel) speichert die Arbeitsschritte in der Werkstatt-App: push(Öl), push(Filter), push(Reifen), pop(), push(Gurt), pop(), pop(), peek(). Geben Sie ebenso Inhalt (oben rechts) und Rückgabe an. c) Wählen Sie für „Alarme in der Reihenfolge ihres Eingangs bearbeiten“ und für „Rückgängig-Funktion“ die passende Datenstruktur und begründen Sie.',
        op: '**Angeben** heißt: das Ergebnis nennen. **Begründen**: mit „weil“ erklären.',
        hint: 'Queue: vorne raus, hinten rein (FIFO). Stack: oben rein, oben raus (LIFO). peek() schaut nur nach und entfernt nichts.',
        words: [['FIFO', 'First In, First Out: wer zuerst kommt, geht zuerst raus'], ['LIFO', 'Last In, First Out: der Letzte geht zuerst raus'], ['peek', 'Nur anschauen, nicht entfernen']],
        a: [['table', ['Queue: Operation', 'Inhalt danach (vorn links)', 'Rückgabe'], [['enqueue(A1)', 'A1', '-'], ['enqueue(A2)', 'A1, A2', '-'], ['dequeue()', 'A2', '**A1**'], ['enqueue(A3)', 'A2, A3', '-'], ['enqueue(A4)', 'A2, A3, A4', '-'], ['dequeue()', 'A3, A4', '**A2**'], ['peek()', 'A3, A4', '**A3**']]],
          ['table', ['Stack: Operation', 'Inhalt danach (oben rechts)', 'Rückgabe'], [['push(Öl)', 'Öl', '-'], ['push(Filter)', 'Öl, Filter', '-'], ['push(Reifen)', 'Öl, Filter, Reifen', '-'], ['pop()', 'Öl, Filter', '**Reifen**'], ['push(Gurt)', 'Öl, Filter, Gurt', '-'], ['pop()', 'Öl, Filter', '**Gurt**'], ['pop()', 'Öl', '**Filter**'], ['peek()', 'Öl', '**Öl**']]],
          'c) Alarme in der Reihenfolge des Eingangs: **Queue** (FIFO), weil der älteste Alarm zuerst bearbeitet werden soll. Rückgängig: **Stack** (LIFO), weil immer der **zuletzt** ausgeführte Schritt zuerst zurückgenommen wird.',
          'Bewertung: a) 2 P (Rückgaben A1, A2, A3), b) 2 P (Reifen, Gurt, Filter, Öl), c) je Struktur mit Begründung 1 P.'],
        sol: [['diagram', {w: 860, h: 220, keep: 640, cap: 'Links die Queue nach der letzten Operation (vorn = links), rechts der Stack (oben = rechts). Beide zeigen dieselbe Idee: Bei der Queue verlässt man vorn, beim Stack oben.', nodes: [
          {id: 'q0', k: 'text', x: 70, y: 28, t: 'Queue', w: 10, h: 10, b: true}, {id: 'q1', k: 'box', x: 100, y: 90, w: 80, h: 44, t: 'A3', s: 'accent'}, {id: 'q2', k: 'box', x: 190, y: 90, w: 80, h: 44, t: 'A4', s: 'plain'}, {id: 'qa', k: 'text', x: 100, y: 140, t: 'vorn: dequeue', w: 10, h: 10, mw: 110}, {id: 'qb', k: 'text', x: 190, y: 140, t: 'hinten: enqueue', w: 10, h: 10, mw: 120},
          {id: 's0', k: 'text', x: 560, y: 28, t: 'Stack', w: 10, h: 10, b: true}, {id: 's1', k: 'box', x: 560, y: 160, w: 120, h: 40, t: 'Öl', s: 'accent'}, {id: 'sa', k: 'text', x: 700, y: 160, t: 'oben = Öl: push/pop hier', w: 10, h: 10, mw: 180},
        ], edges: []}]],
        see: ['eua-stackqueue']},
      {pts: 6, rows: 11, topic: 'Verkettete Liste', q: 'Messwerte werden in einer einfach verketteten Liste gespeichert. Jeder Knoten hat einen int-Wert und einen Verweis **next** auf den Nachfolger (null am Ende). Die Liste kennt nur den Verweis **kopf** auf den ersten Knoten. a) Schreiben Sie die Methode **anhaengen(wert)**, die einen neuen Knoten am **Ende** einfügt. b) Schreiben Sie die Methode **entferne(wert)**, die den **ersten** Knoten mit diesem Wert löscht. Denken Sie an den Fall, dass er der erste Knoten ist, und an eine leere Liste.',
        op: '**Schreiben** heißt: Code oder Pseudocode selbst formulieren. Achte auf Sonderfälle.',
        hint: 'Bei a) laufe mit einem Verweis bis zum letzten Knoten (der next == null hat). Bei b) merke dir immer den Vorgänger. Zum Löschen setzt du vorgaenger.next auf den übernächsten Knoten.',
        words: [['Knoten', 'Ein Element der Liste mit Wert und Verweis auf den nächsten'], ['Verweis (Referenz)', 'Adresse eines Objekts'], ['Vorgänger', 'Der Knoten direkt vor einem anderen']],
        a: [['codes', [['java', `class Knoten {
    int wert;
    Knoten next;
    Knoten(int wert) { this.wert = wert; }
}

class MessListe {
    private Knoten kopf;

    public void anhaengen(int wert) {
        Knoten neu = new Knoten(wert);
        if (kopf == null) {            // leere Liste
            kopf = neu;
            return;
        }
        Knoten k = kopf;
        while (k.next != null) {       // bis zum letzten Knoten
            k = k.next;
        }
        k.next = neu;
    }

    public boolean entferne(int wert) {
        if (kopf == null) return false;       // leere Liste
        if (kopf.wert == wert) {              // erster Knoten
            kopf = kopf.next;
            return true;
        }
        Knoten vor = kopf;
        while (vor.next != null && vor.next.wert != wert) {
            vor = vor.next;
        }
        if (vor.next == null) return false;   // nicht gefunden
        vor.next = vor.next.next;             // überspringen
        return true;
    }
}`], ['pseudo', `methode anhaengen(wert)
    neu = neuer Knoten(wert, next = null)
    wenn kopf = null dann
        kopf = neu
    sonst
        k = kopf
        solange k.next ≠ null
            k = k.next
        ende solange
        k.next = neu
    ende wenn
ende methode`]]],
          'Bewertung: a) neuer Knoten 1 P, Sonderfall leere Liste 1 P, Suche des letzten Knotens und Anhängen 1 P; b) Sonderfall Kopf 1 P, Suche mit Vorgänger 1 P, Umhängen next = next.next 1 P.'],
        sol: [['walk', {t: 'entferne(23) in der Liste 12, 23, 31', steps: [
          {t: '**Ausgangslage:** Die Schleife startet bei vor = Knoten 12. Der Nachfolger hat den Wert 23, also stimmt die Suche.', b: [chain(['12', '23', '31'], 'Vor dem Löschen', ['accent', 'bad', 'accent'])]},
          {t: '**Umhängen:** vor.next = vor.next.next. Der Knoten 12 zeigt jetzt direkt auf 31. Knoten 23 hat keinen Verweis mehr auf ihn und wird vom Garbage Collector entfernt.', b: [chain(['12', '31'], 'Nach dem Löschen: 23 ist aus der Kette herausgenommen')]},
          {t: '**Sonderfall Kopf:** Beim Löschen von 12 gibt es keinen Vorgänger. Hier gilt kopf = kopf.next.', b: [chain(['23', '31'], 'Nach entferne(12): kopf zeigt auf den früheren zweiten Knoten')]},
        ]}], ['warn', 'Typischer Fehler: vor.next = vor.next.next ohne vorher zu prüfen, ob vor.next null ist. Das ergibt eine NullPointerException, wenn der Wert nicht in der Liste steht.']],
        see: ['eua-listen']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Objektorientiert entwerfen und programmieren (25 Punkte)',
    intro: 'Das Gateway verwaltet verschiedene Sensoren. Das sind die Anforderungen: Jeder **Sensor** hat eine **id** (Zeichenkette), eine **einheit** (Zeichenkette) und den **letzten Messwert** (Kommazahl). Die Methode **messen(wert)** speichert einen neuen Messwert. Ob ein Wert ein **Alarm** ist, hängt von der Art des Sensors ab. Die Methode **status()** liefert die id und dahinter " ALARM" oder " ok". Es gibt drei Arten: **Temperatursensor** (Alarm, wenn Wert **größer** als die Grenze), **Drucksensor** (Alarm, wenn Wert **kleiner** als der Mindestdruck oder **größer** als der Höchstdruck) und **Feuchtesensor** (hat einen **Kalibrierfaktor**: Beim Messen wird der Wert **mit dem Faktor multipliziert**; Alarm, wenn der Wert größer als die Grenze ist). Ein **Gateway** verwaltet 1 bis 16 Sensoren und kann die Anzahl der Alarme zählen.',
    tasks: [
      {pts: 6, rows: 11, topic: 'Klassendiagramm entwerfen', q: 'Entwerfen Sie ein UML-Klassendiagramm für die Anforderungen im Text. Zeichnen Sie Klassen mit Attributen und Methoden, die Vererbung, die abstrakte Klasse und die Beziehung zum Gateway mit Multiplizitäten.',
        op: '**Entwerfen** heißt: ein eigenes vollständiges Modell zeichnen. Gemeinsame Teile gehören in die Oberklasse.',
        hint: 'Frage: Was haben alle Sensoren gemeinsam? Das kommt in die Oberklasse. Was ist je Art anders? Das kommt in die Unterklassen. Welche Methode kann die Oberklasse nicht selbst schreiben? Die ist abstrakt.',
        words: [['Oberklasse', 'Klasse, von der andere erben (Allgemeines)'], ['Unterklasse', 'Klasse, die erbt und Besonderes ergänzt'], ['Multiplizität', 'Zahl an der Linie: wie viele Objekte beteiligt sind (1..16)'], ['abstrakt', 'Nur beschrieben, noch nicht ausprogrammiert']],
        a: ['Oberklasse **Sensor** (abstrakt, Name kursiv oder «abstract»): Attribute id, einheit, letzterWert; Methoden messen(wert), status(), **istAlarm() (abstrakt)**. Unterklassen **Temperatursensor** (grenze), **Drucksensor** (minDruck, maxDruck), **Feuchtesensor** (kalibrierfaktor, grenze, überschreibt messen). Jede Unterklasse implementiert istAlarm(). Vererbung: Pfeil mit leerem Dreieck zur Oberklasse. **Gateway** hat **1..16 Sensoren** (Aggregation oder Assoziation) und die Methode anzahlAlarme().',
          'Bewertung: Oberklasse mit abstrakter Methode 2 P, drei Unterklassen mit eigenen Attributen 1 P, Vererbungspfeile richtig 1 P, Gateway mit Multiplizität 1..16 1 P, Methoden und Sichtbarkeit (privat -, öffentlich +) 1 P.'],
        sol: [['diagram', {w: 900, h: 470, keep: 760, cap: 'Musterlösung: abstrakte Oberklasse Sensor, drei Unterklassen, Gateway mit 1..16 Sensoren', nodes: [
          {id: 'gw', k: 'cls', x: 130, y: 85, w: 200, t: {name: 'Gateway', attrs: ['- sensoren: List<Sensor>'], ops: ['+ anzahlAlarme(): int']}},
          {id: 'se', k: 'cls', x: 560, y: 95, w: 330, s: 'accent', t: {name: ['«abstract»', 'Sensor'], attrs: ['- id: String', '- einheit: String', '- letzterWert: double'], ops: ['+ messen(wert: double): void', '+ status(): String', '+ istAlarm(): boolean {abstract}']}},
          {id: 'te', k: 'cls', x: 150, y: 355, w: 220, t: {name: 'Temperatursensor', attrs: ['- grenze: double'], ops: ['+ istAlarm(): boolean']}},
          {id: 'dr', k: 'cls', x: 440, y: 355, w: 220, t: {name: 'Drucksensor', attrs: ['- minDruck: double', '- maxDruck: double'], ops: ['+ istAlarm(): boolean']}},
          {id: 'fe', k: 'cls', x: 740, y: 355, w: 230, t: {name: 'Feuchtesensor', attrs: ['- kalibrierfaktor: double', '- grenze: double'], ops: ['+ messen(wert: double): void', '+ istAlarm(): boolean']}},
        ], edges: [{a: 'gw', b: 'se', sa: 'diaf', ea: 'none', ta: '1', tb: '1..16'},
          {a: 'te', b: 'se', ea: 'tri', via: [[150, 255], [560, 255]]}, {a: 'dr', b: 'se', ea: 'tri', via: [[440, 255], [560, 255]]}, {a: 'fe', b: 'se', ea: 'tri', via: [[740, 255], [560, 255]]}]}]],
        see: ['ps-klassen', 'eua-oop', 'eua-umlcode']},
      {pts: 8, rows: 14, topic: 'Klassen implementieren', q: 'Implementieren Sie in einer objektorientierten Programmiersprache Ihrer Wahl die abstrakte Klasse **Sensor** (private Attribute, Konstruktor mit id und einheit, Getter für letzterWert, messen, status, abstrakte Methode istAlarm) und die Klasse **Feuchtesensor** (Konstruktor, messen mit Kalibrierfaktor, istAlarm).',
        op: '**Implementieren** heißt: Klassen als lauffähigen Code schreiben. Syntaxfehler zählen wenig, die Logik zählt.',
        hint: 'Die Unterklasse ruft im Konstruktor den Konstruktor der Oberklasse auf (super). Feuchtesensor überschreibt messen, rechnet den Wert um und gibt ihn an die Oberklasse weiter.',
        words: [['überschreiben', 'Eine geerbte Methode in der Unterklasse neu schreiben'], ['super', 'Zugriff auf die Oberklasse'], ['Getter', 'Methode, die den Wert eines privaten Attributs zurückgibt']],
        a: [['codes', [['java', `public abstract class Sensor {
    private String id;
    private String einheit;
    private double letzterWert;

    public Sensor(String id, String einheit) {
        this.id = id;
        this.einheit = einheit;
    }
    public void messen(double wert) { letzterWert = wert; }
    public double getLetzterWert() { return letzterWert; }
    public String status() { return id + (istAlarm() ? " ALARM" : " ok"); }
    public abstract boolean istAlarm();
}

public class Feuchtesensor extends Sensor {
    private double kalibrierfaktor;
    private double grenze;

    public Feuchtesensor(String id, double kalibrierfaktor, double grenze) {
        super(id, "%");                       // Konstruktor der Oberklasse
        this.kalibrierfaktor = kalibrierfaktor;
        this.grenze = grenze;
    }
    @Override
    public void messen(double wert) {
        super.messen(wert * kalibrierfaktor);  // erst umrechnen, dann speichern
    }
    @Override
    public boolean istAlarm() { return getLetzterWert() > grenze; }
}`], ['python', `from abc import ABC, abstractmethod

class Sensor(ABC):
    def __init__(self, id, einheit):
        self.__id = id
        self.__einheit = einheit
        self.__letzter_wert = 0.0
    def messen(self, wert):
        self.__letzter_wert = wert
    def get_letzter_wert(self):
        return self.__letzter_wert
    def status(self):
        return self.__id + (" ALARM" if self.ist_alarm() else " ok")
    @abstractmethod
    def ist_alarm(self):
        pass

class Feuchtesensor(Sensor):
    def __init__(self, id, kalibrierfaktor, grenze):
        super().__init__(id, "%")
        self.__faktor = kalibrierfaktor
        self.__grenze = grenze
    def messen(self, wert):
        super().messen(wert * self.__faktor)
    def ist_alarm(self):
        return self.get_letzter_wert() > self.__grenze`]]],
          'Bewertung: abstrakte Klasse und abstrakte Methode 2 P, private Attribute, Konstruktor, Getter 2 P, status() ruft istAlarm() auf 1 P, Feuchtesensor erbt und ruft super im Konstruktor auf 1 P, messen überschrieben mit super-Aufruf 1 P, istAlarm 1 P.'],
        sol: [['seq', {w: 760, actors: ['Aufrufer', 'Feuchtesensor', 'Sensor (Oberklasse)'], cap: 'messen(64) beim Feuchtesensor mit Faktor 1,25: Die Unterklasse rechnet um und delegiert an die Oberklasse', steps: [
          [0, 1, 'messen(64)', 's'], [1, 1, 'wert = 64 x 1,25 = 80,0'], [1, 2, 'super.messen(80,0)', 's'], [2, 2, 'letzterWert = 80,0'], [2, 1, 'fertig', 'r'], [1, 0, 'fertig', 'r']]}]],
        see: ['eua-oop', 'eua-konstruktor', 'eua-saeulen']},
      {pts: 6, rows: 10, topic: 'Polymorphie', q: 'Gegeben ist das Programm in der Anlage (mit den Klassen aus der letzten Aufgabe). a) Welche Ausgabe erzeugt es? b) Warum lässt sich die Zeile **Sensor x = new Sensor("X", "m");** nicht übersetzen? c) Erklären Sie an diesem Beispiel die Begriffe Polymorphie und dynamische Bindung.',
        ctx: [['h3', 'Anlage: Testprogramm'], ['code', 'java', `Sensor[] s = {
    new Temperatursensor("T1", 90),
    new Drucksensor("D1", 1.5, 3.0),
    new Feuchtesensor("F1", 1.25, 80)
};
double[] w = {95, 3.4, 64};
for (int i = 0; i < s.length; i++) {
    s[i].messen(w[i]);
    System.out.println(s[i].status());
}
s[0].messen(88);
s[1].messen(3.0);
int alarme = 0;
for (Sensor x : s) {
    if (x.istAlarm()) alarme++;
}
System.out.println("Alarme: " + alarme);
System.out.println(s[2].getLetzterWert());`]],
        op: '**Erklären** heißt: den Begriff mit eigenen Worten und am Beispiel beschreiben.',
        hint: 'Rechne bei jedem Sensor aus, ob der Wert Alarm auslöst. Beim Feuchtesensor erst mit dem Faktor multiplizieren. Beachte die Grenzwerte: > heißt echt größer.',
        words: [['dynamische Bindung', 'Erst zur Laufzeit wird entschieden, welche Methode wirklich läuft'], ['übersetzen (kompilieren)', 'Programm in ausführbaren Code umwandeln']],
        a: [['out', `T1 ALARM
D1 ALARM
F1 ok
Alarme: 0
80.0`],
          ['table', ['Sensor', 'Wert', 'Regel', 'Ergebnis'], [['T1', '95', '95 > 90', 'ALARM'], ['D1', '3.4', '3.4 > 3.0 (über Höchstdruck)', 'ALARM'], ['F1', '64 x 1,25 = 80.0', '80.0 > 80 ist falsch', 'ok'], ['danach T1', '88', '88 > 90 falsch', 'ok'], ['danach D1', '3.0', 'zwischen 1,5 und 3,0 inklusive', 'ok']]],
          'b) **Sensor ist abstrakt.** Von einer abstrakten Klasse kann man kein Objekt erzeugen, weil istAlarm() keinen Körper hat. Der Compiler meldet einen Fehler.',
          'c) **Polymorphie:** Die Variable s[i] hat den Typ Sensor, verweist aber auf verschiedene Unterklassen. Der Aufruf istAlarm() (und status()) verhält sich je nach Objekt anders. **Dynamische Bindung:** Welche istAlarm()-Version läuft, wird erst **zur Laufzeit** nach dem tatsächlichen Objekt entschieden, nicht nach dem deklarierten Typ.',
          'Bewertung: a) 3 P (Zeilen 1 bis 3 je 0,5 P, Alarme 0 und 80.0 je 0,75 P), b) 1 P, c) 2 P.'],
        sol: [['seq', {w: 780, actors: ['Schleife', 'T1 (Temperatur)', 'D1 (Druck)', 'F1 (Feuchte)'], cap: 'status() ruft istAlarm() auf. Jedes Objekt führt seine eigene Version aus.', steps: [
          [0, 1, 'status()', 's'], [1, 0, 'T1 ALARM (95 > 90)', 'r'], [0, 2, 'status()', 's'], [2, 0, 'D1 ALARM (3,4 > 3,0)', 'r'], [0, 3, 'status()', 's'], [3, 0, 'F1 ok (80,0 nicht > 80)', 'r']]}],
          ['warn', 'Falle: 64 x 1,25 ist genau 80,0. Die Regel heißt „größer als“, also kein Alarm. Randwerte immer genau lesen.']],
        see: ['eua-saeulen', 'eua-oop']},
      {pts: 5, rows: 8, topic: 'Interface', q: 'Drucksensor und Feuchtesensor müssen regelmäßig kalibriert werden, der Temperatursensor nicht. a) Erläutern Sie zwei Unterschiede zwischen einer abstrakten Klasse und einem Interface. b) Schreiben Sie ein Interface **Kalibrierbar** mit der Methode kalibrieren(referenzwert) und zeigen Sie in Java, wie Feuchtesensor es zusätzlich zur Vererbung nutzt. Warum ist hier ein Interface und keine weitere Oberklasse die richtige Wahl?',
        op: '**Erläutern** heißt: Unterschied und Grund nennen. Mit „weil“ oder Beispiel.',
        hint: 'In Java hat eine Klasse nur eine Oberklasse, aber kann viele Interfaces haben. Ein Interface beschreibt nur, was eine Klasse können muss.',
        words: [['Interface (Schnittstelle)', 'Liste von Methoden, die eine Klasse umsetzen muss'], ['implementieren', 'Die Methoden eines Interfaces ausprogrammieren']],
        a: [['table', ['Merkmal', 'abstrakte Klasse', 'Interface'], [['Vererbung', 'nur **eine** Oberklasse möglich (extends)', 'eine Klasse kann **viele** Interfaces umsetzen (implements)'], ['Inhalt', 'kann Attribute, fertige Methoden und abstrakte Methoden haben', 'beschreibt nur Methoden (keine Objektattribute; Standardmethoden möglich)'], ['Zweck', '„ist-ein“: gemeinsamer Code und Zustand', '„kann“: gemeinsame Fähigkeit']]],
          ['code', 'java', `public interface Kalibrierbar {
    void kalibrieren(double referenzwert);
}

public class Feuchtesensor extends Sensor implements Kalibrierbar {
    ...
    @Override
    public void kalibrieren(double referenzwert) {
        kalibrierfaktor = referenzwert / getLetzterWert();   // Faktor anpassen
    }
}`],
          'Ein **Interface** ist richtig, weil Feuchtesensor schon von Sensor erbt und Java keine Mehrfachvererbung von Klassen kennt. Außerdem ist „kalibrierbar“ eine Fähigkeit, die auch Klassen außerhalb der Sensor-Hierarchie haben könnten (zum Beispiel Wetterstation).',
          'Bewertung: a) zwei Unterschiede 2 P, b) Interface 1 P, implements 1 P, Begründung 1 P.'],
        sol: [['diagram', {w: 760, h: 300, keep: 600, cap: 'Feuchtesensor erbt von Sensor (durchgezogen) und setzt Kalibrierbar um (gestrichelt)', nodes: [
          {id: 'se', k: 'cls', x: 190, y: 70, w: 230, t: {name: ['«abstract»', 'Sensor'], ops: ['+ istAlarm(): boolean']}}, {id: 'ki', k: 'cls', x: 560, y: 70, w: 230, s: 'accent', t: {name: ['«interface»', 'Kalibrierbar'], ops: ['+ kalibrieren(referenzwert: double)']}},
          {id: 'fe', k: 'cls', x: 380, y: 235, w: 240, t: {name: 'Feuchtesensor', ops: ['+ istAlarm(): boolean', '+ kalibrieren(...)']}},
        ], edges: [{a: 'fe', b: 'se', ea: 'tri'}, {a: 'fe', b: 'ki', ea: 'tri', k: 'dash'}]}]],
        see: ['eua-interface', 'eua-saeulen']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Datenbank, Fehlerbehandlung und Tests (25 Punkte)',
    ctx: [['h3', 'Anlage: Datenbankmodell Wartung (Ausschnitt mit Beispieldaten)'],
      ['diagram', {w: 820, h: 200, keep: 640, cap: 'Tabellen und Beziehungen (Krähenfuß = viele)', nodes: [
        {id: 'b', k: 'cls', x: 110, y: 80, w: 190, t: {name: 'betrieb', attrs: ['PK betrieb_id', 'name', 'ort']}}, {id: 'm', k: 'cls', x: 410, y: 80, w: 190, t: {name: 'maschine', attrs: ['PK maschine_id', 'FK betrieb_id', 'typ', 'baujahr']}},
        {id: 'w', k: 'cls', x: 710, y: 80, w: 190, t: {name: 'wartung', attrs: ['PK wartung_id', 'FK maschine_id', 'datum (DATE)', 'kosten (DECIMAL)']}},
      ], edges: [{a: 'm', b: 'b', sa: 'many', ea: 'one'}, {a: 'w', b: 'm', sa: 'many', ea: 'one'}]}],
      ['row', [['table', ['betrieb_id', 'name', 'ort'], [['1', 'Hofgut Aue', 'Verden'], ['2', 'Agrar Nord eG', 'Husum'], ['3', 'Müller Landtechnik', 'Celle'], ['4', 'Gut Sonnborn', 'Lüneburg']]],
        ['table', ['maschine_id', 'betrieb_id', 'typ', 'baujahr'], [['10', '1', 'Traktor', '2019'], ['11', '1', 'Mähdrescher', '2017'], ['12', '2', 'Traktor', '2021'], ['13', '2', 'Feldspritze', '2020'], ['14', '3', 'Traktor', '2016'], ['15', '3', 'Häcksler', '2022'], ['16', '3', 'Traktor', '2023']]]]],
      ['table', ['wartung_id', 'maschine_id', 'datum', 'kosten'], [['1', '10', '2026-01-15', '420.00'], ['2', '11', '2026-02-03', '2850.00'], ['3', '11', '2026-06-20', '1200.00'], ['4', '12', '2025-11-10', '380.00'], ['5', '14', '2026-03-12', '1650.00'], ['6', '14', '2026-09-01', '900.00'], ['7', '15', '2026-04-22', '510.00'], ['8', '13', '2025-12-05', '640.00']]]],
    tasks: [
      {pts: 3, rows: 6, topic: 'Unterabfrage', q: 'Geben Sie Typ und Baujahr aller Maschinen aus, für die es **mindestens eine Wartung** gibt, deren Kosten **über dem Durchschnitt aller Wartungskosten** liegen.',
        op: '**Ausgeben** heißt: mit einer SELECT-Abfrage die Spalten liefern. Du brauchst eine Abfrage innerhalb einer Abfrage.',
        hint: 'Schritt 1: Durchschnitt aller Kosten. Schritt 2: Wartungen darüber. Schritt 3: Maschinen zu diesen Wartungen.',
        words: [['Durchschnitt', 'In SQL: AVG(spalte)'], ['Unterabfrage', 'SELECT in Klammern innerhalb einer anderen Abfrage']],
        a: [['code', 'sql', `SELECT typ, baujahr
FROM maschine
WHERE maschine_id IN (
    SELECT maschine_id
    FROM wartung
    WHERE kosten > (SELECT AVG(kosten) FROM wartung)
);`], ['table', ['typ', 'baujahr'], [['Mähdrescher', '2017'], ['Traktor', '2016']]],
          'Bewertung: Durchschnitt per AVG in innerer Unterabfrage 1 P, Wartungen über dem Durchschnitt mit IN oder EXISTS 1 P, Ausgabe Typ und Baujahr 1 P.'],
        sol: [['walk', {t: 'So rechnet die Datenbank von innen nach außen', steps: [
          {t: '**Innerste Abfrage:** AVG(kosten) = (420 + 2850 + 1200 + 380 + 1650 + 900 + 510 + 640) / 8 = 8550 / 8 = **1068,75**.'},
          {t: '**Mittlere Abfrage:** Wartungen mit Kosten über 1068,75.', b: [['table', ['wartung_id', 'maschine_id', 'kosten'], [['2', '11', '2850.00'], ['3', '11', '1200.00'], ['5', '14', '1650.00']]]]},
          {t: '**Äußere Abfrage:** Maschinen 11 und 14. Maschine 11 steht nur einmal im Ergebnis, weil IN nicht doppelt zählt (bei einem JOIN wäre sie doppelt).'},
        ]}]],
        see: ['eua-sqlselect', 'eua-sqlexam']},
      {pts: 4, rows: 7, topic: 'LEFT JOIN', q: 'Geben Sie ID und Typ aller Maschinen aus, die **im Jahr 2026 keine Wartung** hatten. Maschinen ganz ohne Wartung sollen auch erscheinen.',
        op: '**Ausgeben**: SELECT mit den Spalten. Achte auf Maschinen, zu denen es keine Zeile in wartung gibt.',
        hint: 'Ein LEFT JOIN behält alle Maschinen. Die Bedingung für das Jahr gehört in den ON-Teil. Danach suchst du die Zeilen, in denen die rechte Seite leer (NULL) ist.',
        words: [['LEFT JOIN', 'Alle Zeilen der linken Tabelle bleiben, auch ohne Partner rechts'], ['IS NULL', 'Prüfung auf „kein Wert“']],
        a: [['code', 'sql', `SELECT m.maschine_id, m.typ
FROM maschine m
LEFT JOIN wartung w
       ON w.maschine_id = m.maschine_id
      AND w.datum >= '2026-01-01'
      AND w.datum <= '2026-12-31'
WHERE w.wartung_id IS NULL;`], ['table', ['maschine_id', 'typ'], [['12', 'Traktor'], ['13', 'Feldspritze'], ['16', 'Traktor']]],
          ['code', 'sql', `-- Alternative mit NOT EXISTS
SELECT m.maschine_id, m.typ
FROM maschine m
WHERE NOT EXISTS (SELECT 1 FROM wartung w
                  WHERE w.maschine_id = m.maschine_id
                    AND w.datum BETWEEN '2026-01-01' AND '2026-12-31');`],
          'Bewertung: LEFT JOIN 1 P, Zeitraum im ON-Teil 1 P, IS NULL in WHERE 1 P, Ergebnis 1 P.'],
        sol: [['table', ['maschine_id', 'typ', 'Wartung 2026?', 'im Ergebnis?'], [['10', 'Traktor', 'ja (Wartung 1)', 'nein'], ['11', 'Mähdrescher', 'ja (2 und 3)', 'nein'], ['12', 'Traktor', 'nein (nur 2025)', '**ja**'], ['13', 'Feldspritze', 'nein (nur 2025)', '**ja**'], ['14', 'Traktor', 'ja (5 und 6)', 'nein'], ['15', 'Häcksler', 'ja (7)', 'nein'], ['16', 'Traktor', 'nein (gar keine)', '**ja**']]],
          ['warn', 'Falle: Steht die Jahresbedingung im WHERE statt im ON, fallen alle Maschinen ohne Wartung heraus (w.datum ist NULL) und die Maschine 16 fehlt im Ergebnis. Dann wirkt der LEFT JOIN wie ein INNER JOIN.']],
        see: ['eua-sqljoin']},
      {pts: 5, rows: 9, topic: 'Aggregation', q: 'Ermitteln Sie für **jeden Betrieb** (auch Betriebe ohne Maschinen) den Namen, die **Anzahl seiner Maschinen** und die **Summe aller Wartungskosten**. Es sollen nur Betriebe erscheinen, deren Summe **größer als 2.000** ist. Sortieren Sie absteigend nach der Summe.',
        op: '**Ermitteln** heißt: mit einer Abfrage berechnen. Bei Anzahl und Summe brauchst du GROUP BY.',
        hint: 'Verbinde drei Tabellen. Pass auf: Jede Wartung vervielfacht die Maschinenzeile. Zähle darum mit COUNT(DISTINCT ...). Gefiltert wird nach der Gruppierung mit HAVING.',
        words: [['Aggregation', 'Zusammenfassen vieler Zeilen zu einem Wert (COUNT, SUM, AVG)'], ['HAVING', 'Filter auf Gruppen, nach GROUP BY'], ['DISTINCT', 'Doppelte Werte nur einmal zählen']],
        a: [['code', 'sql', `SELECT b.name,
       COUNT(DISTINCT m.maschine_id) AS maschinen,
       SUM(w.kosten)                 AS summe
FROM betrieb b
LEFT JOIN maschine m ON m.betrieb_id = b.betrieb_id
LEFT JOIN wartung  w ON w.maschine_id = m.maschine_id
GROUP BY b.betrieb_id, b.name
HAVING SUM(w.kosten) > 2000
ORDER BY summe DESC;`], ['table', ['name', 'maschinen', 'summe'], [['Hofgut Aue', '2', '4470.00'], ['Müller Landtechnik', '3', '3060.00']]],
          'Bewertung: Joins über drei Tabellen 1 P, COUNT(DISTINCT) 1 P, SUM und GROUP BY 1 P, HAVING 1 P, ORDER BY 1 P.'],
        sol: [['walk', {t: 'Von den Rohdaten zum Ergebnis', steps: [
          {t: '**Nach den Joins** gibt es für jede Wartung eine Zeile. Hofgut Aue hat 3 Zeilen (Wartungen 1, 2, 3), aber nur 2 Maschinen. Gut Sonnborn hat keine Maschine: eine Zeile mit NULL.', b: [['table', ['name', 'maschine_id', 'kosten'], [['Hofgut Aue', '10', '420'], ['Hofgut Aue', '11', '2850'], ['Hofgut Aue', '11', '1200'], ['Agrar Nord eG', '12', '380'], ['Agrar Nord eG', '13', '640'], ['Müller Landtechnik', '14', '1650'], ['Müller Landtechnik', '14', '900'], ['Müller Landtechnik', '15', '510'], ['Müller Landtechnik', '16', 'NULL'], ['Gut Sonnborn', 'NULL', 'NULL']]]]},
          {t: '**GROUP BY:** eine Zeile je Betrieb.', b: [['table', ['name', 'maschinen', 'summe'], [['Hofgut Aue', '2', '4470'], ['Agrar Nord eG', '2', '1020'], ['Müller Landtechnik', '3', '3060'], ['Gut Sonnborn', '0', 'NULL']]]]},
          {t: '**HAVING SUM > 2000:** Agrar Nord (1020) und Gut Sonnborn (NULL) fallen heraus. **ORDER BY** summe absteigend.', b: [['chart', {kind: 'bar', w: 640, h: 240, labels: ['Hofgut Aue', 'Müller Landtechnik', 'Agrar Nord eG', 'Gut Sonnborn'], series: [{n: 'Summe Wartungskosten', d: [4470, 3060, 1020, 0], k: 'accent'}], vals: true, ymax: 5000, yl: 'Euro', cap: 'Nur die ersten beiden Betriebe liegen über der Grenze 2.000 Euro'}]]},
        ]}], ['warn', 'Falle: COUNT(*) statt COUNT(DISTINCT m.maschine_id) würde für Hofgut Aue 3 liefern (drei Wartungszeilen). Außerdem: Eine Bedingung auf SUM gehört in HAVING, nicht in WHERE.']],
        see: ['eua-sqlgroup', 'eua-sqljoin']},
      {pts: 6, rows: 10, topic: 'Exceptions', q: 'a) Welche Ausgabe erzeugt das Programm in der Anlage? b) Schreiben Sie die Klasse **SensorAusfallException** (eine selbst definierte, geprüfte Ausnahme mit Nachricht) und erklären Sie in einem Satz den Unterschied zwischen geprüften (checked) und ungeprüften (unchecked) Ausnahmen.',
        ctx: [['h3', 'Anlage: Programm'], ['code', 'java', `static double lies(String text) throws SensorAusfallException {
    try {
        System.out.println("lese " + text);
        double w = Double.parseDouble(text);
        if (w < -40) throw new SensorAusfallException("Wert " + w);
        return w;
    } catch (NumberFormatException e) {
        System.out.println("Format");
        return 0;
    } finally {
        System.out.println("fertig");
    }
}

public static void main(String[] args) {
    String[] eingaben = {"21.5", "abc", "-99"};
    for (String t : eingaben) {
        try {
            double w = lies(t);
            System.out.println("Wert " + w);
        } catch (SensorAusfallException e) {
            System.out.println("Ausfall: " + e.getMessage());
        }
    }
}`]],
        op: '**Schreiben** heißt: den Code selbst formulieren. **Erklären**: mit eigenen Worten.',
        hint: 'Verfolge jeden der drei Texte einzeln. Der finally-Block läuft immer. Eine Ausnahme sucht das erste passende catch.',
        words: [['geprüft (checked)', 'Der Compiler verlangt, dass man die Ausnahme behandelt oder weitergibt'], ['finally', 'Block, der immer ausgeführt wird, mit oder ohne Fehler'], ['throws', 'Methode kündigt an, dass sie eine Ausnahme weitergeben kann']],
        a: [['out', `lese 21.5
fertig
Wert 21.5
lese abc
Format
fertig
Wert 0.0
lese -99
fertig
Ausfall: Wert -99.0`],
          ['code', 'java', `public class SensorAusfallException extends Exception {
    public SensorAusfallException(String nachricht) {
        super(nachricht);          // Nachricht an die Oberklasse
    }
}`],
          '**Geprüfte** Ausnahmen (erben von Exception) muss man mit try/catch behandeln oder mit throws weitergeben, sonst meldet der Compiler einen Fehler. **Ungeprüfte** (erben von RuntimeException, zum Beispiel NumberFormatException) muss man nicht deklarieren.',
          'Bewertung: a) 4 P (drei Durchläufe: 1, 1,5, 1,5 P), b) Klasse 1 P, Unterschied 1 P.'],
        sol: [['walk', {t: 'Drei Durchläufe', steps: [
          {t: '**"21.5":** parseDouble klappt, 21.5 ist nicht kleiner als -40. return 21.5, vorher läuft finally: "fertig". main gibt "Wert 21.5" aus.', b: [['diagram', AP2.dg.flow(['lese 21.5', 'parse ok', 'return 21.5', 'finally: fertig', 'main: Wert 21.5'], {w: 800, h: 100, styles: ['accent', 'ok', 'ok', 'gold', 'plain']})]]},
          {t: '**"abc":** parseDouble wirft NumberFormatException. catch gibt "Format" aus und liefert 0. Danach finally: "fertig". main gibt "Wert 0.0" aus.', b: [['diagram', AP2.dg.flow(['lese abc', 'parse: Fehler', 'catch: Format, return 0', 'finally: fertig', 'main: Wert 0.0'], {w: 800, h: 100, styles: ['accent', 'bad', 'ok', 'gold', 'plain']})]]},
          {t: '**"-99":** parseDouble klappt (-99.0), aber -99.0 < -40: throw SensorAusfallException. Kein passendes catch in lies (das catch ist nur für NumberFormatException). finally gibt "fertig" aus. Die Ausnahme geht an main: "Ausfall: Wert -99.0".', b: [['diagram', AP2.dg.flow(['lese -99', 'throw Ausfall', 'kein passendes catch', 'finally: fertig', 'main-catch: Ausfall'], {w: 800, h: 100, styles: ['accent', 'bad', 'plain', 'gold', 'ok']})]]},
        ]}]],
        see: ['eua-exceptions']},
      {pts: 7, rows: 11, topic: 'Unit-Tests', q: 'Die Methode **klassifiziere(int tempC)** liefert für die Motortemperatur: "OK" bis einschließlich 85, "WARNUNG" von 86 bis 100, "ALARM" von 101 bis 150. Werte unter -40 oder über 150 lösen eine **IllegalArgumentException** aus. a) Bilden Sie die Äquivalenzklassen und geben Sie Testwerte mit Grenzwerten und erwartetem Ergebnis an. b) Schreiben Sie zwei Unit-Tests (zum Beispiel JUnit 5): einen für die Grenze 85/86 und einen für die Ausnahme.',
        op: '**Bilden** heißt: Gruppen von Werten festlegen, die sich gleich verhalten. **Schreiben**: Testcode formulieren.',
        hint: 'Für jede Grenze testest du den letzten Wert links und den ersten Wert rechts. Beim Test mit Ausnahme prüfst du, dass genau diese Ausnahme geworfen wird.',
        words: [['Äquivalenzklasse', 'Gruppe von Eingaben, die das Programm gleich behandelt'], ['Grenzwert', 'Wert direkt an der Grenze, dort passieren die meisten Fehler'], ['assertEquals', 'Prüft, ob erwartetes und echtes Ergebnis gleich sind']],
        a: [['table', ['Klasse', 'Bereich', 'Testwerte (Grenzen)', 'Erwartet'], [['ungültig niedrig', 'unter -40', '-41', 'IllegalArgumentException'], ['gültig OK', '-40 bis 85', '-40, 20, 85', '"OK"'], ['gültig WARNUNG', '86 bis 100', '86, 100', '"WARNUNG"'], ['gültig ALARM', '101 bis 150', '101, 150', '"ALARM"'], ['ungültig hoch', 'über 150', '151', 'IllegalArgumentException']]],
          ['codes', [['java', `@Test
void grenze85zu86() {
    assertEquals("OK", klassifiziere(85));
    assertEquals("WARNUNG", klassifiziere(86));
}

@Test
void zuHoheTemperaturWirftAusnahme() {
    assertThrows(IllegalArgumentException.class, () -> klassifiziere(151));
}`], ['python', `import pytest

def test_grenze_85_zu_86():
    assert klassifiziere(85) == "OK"
    assert klassifiziere(86) == "WARNUNG"

def test_zu_hohe_temperatur():
    with pytest.raises(ValueError):
        klassifiziere(151)`]]],
          'Bewertung: a) drei Gültige Klassen und zwei ungültige 2 P, Grenzwerte beider Seiten jeder Grenze 2 P; b) Test der Grenze 1,5 P, Test der Ausnahme 1,5 P.'],
        sol: [['diagram', {w: 860, h: 130, keep: 680, cap: 'Zahlenstrahl: sieben Grenzen, je ein Testwert links und rechts. Testwerte: -41 | -40 | 85 | 86 | 100 | 101 | 150 | 151', nodes: [
          {id: 'u1', k: 'box', x: 70, y: 55, w: 120, h: 46, t: ['ungültig', '< -40'], s: 'bad'}, {id: 'g1', k: 'box', x: 255, y: 55, w: 190, h: 46, t: ['OK', '-40 ... 85'], s: 'ok'}, {id: 'g2', k: 'box', x: 450, y: 55, w: 190, h: 46, t: ['WARNUNG', '86 ... 100'], s: 'gold'},
          {id: 'g3', k: 'box', x: 640, y: 55, w: 190, h: 46, t: ['ALARM', '101 ... 150'], s: 'bad'}, {id: 'u2', k: 'box', x: 800, y: 55, w: 110, h: 46, t: ['ungültig', '> 150'], s: 'bad'},
        ], edges: []}],
          ['tip', 'Grenzwert-Merksatz: An jeder Grenze testest du immer zwei Werte, den letzten innerhalb und den ersten außerhalb der Klasse. Typischer Fehler im Code: < statt <=.']],
        see: ['eua-unittest', 'eua-testfaelle']},
    ],
  });
  AP2.exam.end(ID);
})();
