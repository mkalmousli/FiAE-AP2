// Probeprüfung 3, Entwicklung und Umsetzung von Algorithmen: NordLog Spedition GmbH, LagerPilot.
(function () {
  const ID = 'exam3-eua';
  const bars = (vals, mark, cap) => ['chart', {kind: 'bar', w: 640, h: 230, labels: vals.map((v, i) => (i === mark ? '▶ ' : '') + 'Index ' + i), series: [{n: 'Gewicht (kg)', d: vals, k: 'accent'}], vals: true, ymax: 1000, cap}];
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 3 (Logistik)', t: 'Algorithmen: Lagerverwaltung LagerPilot', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.eua,
    hint: 'Echte Prüfungsform: 4 Handlungsschritte zu je 25 Punkten, 90 Minuten. Du darfst Pseudocode oder eine Programmiersprache deiner Wahl benutzen. Bei jeder Aufgabe helfen dir "Das Signalwort" und "So gehst du vor". Die Musterlösungen zeigen mehrere Sprachen, Struktogramme, Tabellen und Schritt-für-Schritt-Präsentationen.',
    words: [['Algorithmus', 'genaue Schritt-für-Schritt-Anleitung für ein Problem'], ['Pseudocode', 'Programm in einfacher Sprache, nicht an eine Sprache gebunden'], ['Struktogramm', 'Bild eines Ablaufs aus Kästchen (Nassi-Shneiderman)'], ['Feld (Array)', 'Liste von Werten mit Nummern (Index)'], ['zweidimensional', 'wie eine Tabelle mit Zeilen und Spalten'], ['Index', 'Nummer eines Elements, beginnt bei 0'], ['Schleife', 'Wiederholung von Anweisungen'], ['Rückgabewert', 'Ergebnis einer Funktion'], ['Schreibtischtest', 'Programm von Hand ausführen und Werte aufschreiben'], ['Klasse / Objekt', 'Bauplan / konkretes Ding nach dem Bauplan'], ['Vererbung', 'Unterklasse übernimmt von der Oberklasse'], ['abstrakt', 'unfertig, kann nicht direkt benutzt werden'], ['Polymorphie', 'gleicher Aufruf, je nach Objekt anderes Verhalten'], ['Entwurfsmuster', 'bewährte Lösung für ein bekanntes Problem'], ['Primärschlüssel', 'Spalte, die jede Zeile eindeutig macht'], ['JOIN', 'Tabellen verbinden'], ['Aggregatfunktion', 'COUNT, SUM ... rechnet über viele Zeilen'], ['Transaktion', 'Änderungen, die ganz oder gar nicht gelten'], ['Ausnahme (Exception)', 'Fehler zur Laufzeit'], ['Unit-Test', 'automatischer Test für kleine Programmteile'], ['Grenzwert', 'Wert direkt an einer Grenze'], ['JSON', 'Textformat für Daten'], ['Stack / Queue', 'Stapel (LIFO) / Warteschlange (FIFO)'], ['Komplexität (O)', 'Wie wächst die Laufzeit mit der Datenmenge?'], ['Traglast', 'maximales Gewicht, das ein Fach hält']],
    intro: [
      ['p', 'Sie entwickeln bei der **CodeHafen Software GmbH** das Lagerverwaltungssystem **LagerPilot** für die **NordLog Spedition GmbH** weiter. Das Lager besteht aus Regalreihen mit Fächern. Im Programm wird ein Regal als **zweidimensionales Feld** abgebildet:'],
      ['kv', [['regal[r][f]', 'Inhalt von Reihe r, Fach f: **-1** = gesperrt, **0** = frei, **größer 0** = Paletten-ID'], ['traglast[r]', 'maximale Traglast eines Fachs in Reihe r (kg)'], ['Indizes', 'beginnen bei 0; länge(feld) liefert die Anzahl der Elemente']]],
    ]});
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Lagerplätze finden und auswerten (25 Punkte)',
    ctx: [['h3', 'Anlage 1: Beispiel-Regal'], ['p', 'Dieses Regal wird in mehreren Aufgaben benutzt. Es hat 3 Reihen mit je 4 Fächern.'],
      ['table', ['', 'Fach 0', 'Fach 1', 'Fach 2', 'Fach 3', 'traglast[r]'], [['**Reihe 0**', '5', '0', '-1', '9', '500 kg'], ['**Reihe 1**', '0', '0', '7', '0', '1000 kg'], ['**Reihe 2**', '3', '8', '-1', '-1', '1500 kg']]],
      ['note', 'Lesehilfe: **-1** = Fach gesperrt, **0** = Fach frei, **Zahl größer 0** = dort liegt diese Palette. Beispiel: regal[1][2] ist 7, also liegt in Reihe 1, Fach 2 die Palette 7.']],
    tasks: [
      {pts: 8, rows: 12, topic: 'Algorithmus entwickeln',
        op: '**Entwickeln** heißt: selbst einen Algorithmus schreiben. Pseudocode oder eine Programmiersprache sind erlaubt.',
        hint: 'Zwei Schleifen: erst Reihen, dann Fächer. Prüfe zuerst die Sonderfälle. Bei dem ersten Treffer sofort zurückgeben. Das [-1, -1] kommt erst nach den Schleifen.',
        words: [['Funktion', 'Programmteil mit Namen, der ein Ergebnis zurückgibt'], ['Rückgabe', 'Ergebnis, das die Funktion zurückschickt'], ['zweidimensionales Feld', 'Tabelle mit Zeilen und Spalten im Programm'], ['Traglast', 'maximales Gewicht, das ein Fach hält'], ['reihenweise', 'eine Reihe nach der anderen'], ['Index', 'Nummer eines Elements im Feld (beginnt bei 0)']], q: 'Entwickeln Sie die Funktion **findeFreienPlatz(regal, traglast, gewicht)**. Sie durchsucht das Regal reihenweise (Reihe 0 zuerst, darin Fach 0 zuerst) und gibt die Position **[r, f]** des ersten **freien** Fachs zurück, dessen Reihe das **Gewicht tragen** kann. Gibt es keinen passenden Platz, wird **[-1, -1]** zurückgegeben. Ist das Gewicht kleiner oder gleich 0, soll ebenfalls [-1, -1] zurückgegeben werden. Geben Sie außerdem den Rückgabewert für das Regal aus Anlage 1 an, wenn gewicht = 800 ist, und wenn gewicht = 1200 ist.',
        a: ['Kernidee: zwei geschachtelte Schleifen; die Traglast einmal je Reihe prüfen (ganze Reihe überspringen); beim ersten Treffer **sofort zurückgeben**.',
          ['codes', [['pseudo', `funktion findeFreienPlatz(regal, traglast, gewicht)
    wenn gewicht <= 0 dann
        rückgabe [-1, -1]
    ende wenn
    für r = 0 bis länge(regal) - 1
        wenn traglast[r] >= gewicht dann
            für f = 0 bis länge(regal[r]) - 1
                wenn regal[r][f] = 0 dann
                    rückgabe [r, f]
                ende wenn
            ende für
        ende wenn
    ende für
    rückgabe [-1, -1]
ende funktion`], ['java', `static int[] findeFreienPlatz(int[][] regal, int[] traglast, int gewicht) {
    if (gewicht <= 0) return new int[]{-1, -1};
    for (int r = 0; r < regal.length; r++) {
        if (traglast[r] < gewicht) continue;      // Reihe zu schwach
        for (int f = 0; f < regal[r].length; f++) {
            if (regal[r][f] == 0) return new int[]{r, f};
        }
    }
    return new int[]{-1, -1};
}`], ['python', `def finde_freien_platz(regal, traglast, gewicht):
    if gewicht <= 0:
        return [-1, -1]
    for r, reihe in enumerate(regal):
        if traglast[r] < gewicht:
            continue
        for f, inhalt in enumerate(reihe):
            if inhalt == 0:
                return [r, f]
    return [-1, -1]`], ['csharp', `static int[] FindeFreienPlatz(int[][] regal, int[] traglast, int gewicht)
{
    if (gewicht <= 0) return new[] { -1, -1 };
    for (int r = 0; r < regal.Length; r++)
    {
        if (traglast[r] < gewicht) continue;
        for (int f = 0; f < regal[r].Length; f++)
            if (regal[r][f] == 0) return new[] { r, f };
    }
    return new[] { -1, -1 };
}`]]],
          '**Beispiele zu Anlage 1:** Bei gewicht = 800 wird Reihe 0 übersprungen (500 kg ist zu wenig). In Reihe 1 (1000 kg) ist Fach 0 frei: Ergebnis **[1, 0]**. Bei gewicht = 1200 ist nur Reihe 2 stark genug. Dort sind alle Fächer belegt oder gesperrt: Ergebnis **[-1, -1]**.', 'Bewertung: Prüfung gewicht <= 0 (1 P), äußere Schleife (1 P), Traglastprüfung (1 P), innere Schleife (1 P), Prüfung frei und Rückgabe [r, f] (2 P), Rückgabe [-1, -1] am Ende (1 P), beide Beispiele (1 P).'],
        sol: [['diagram', AP2.dg.nsd([['if', 'gewicht <= 0 ?', [['act', 'rückgabe [-1, -1]']], [
          ['for', 'für r = 0 bis länge(regal) - 1', [['if', 'traglast[r] >= gewicht ?', [['for', 'für f = 0 bis länge(regal[r]) - 1', [['if', 'regal[r][f] = 0 ?', [['act', 'rückgabe [r, f]']], [['act', '(nichts)']]]]]], [['act', '(Reihe überspringen)']]]]],
          ['act', 'rückgabe [-1, -1]']]]], {w: 640, cap: 'Dieselbe Lösung als Struktogramm (Nassi-Shneiderman)'})],
          ['table', ['gewicht', 'Reihe 0 (500)', 'Reihe 1 (1000)', 'Reihe 2 (1500)', 'Ergebnis'], [['800', 'übersprungen (zu schwach)', 'Fach 0 ist 0: **frei**', '-', '**[1, 0]**'], ['1200', 'übersprungen', 'übersprungen', 'Fächer 3, 8, -1, -1: kein freies', '**[-1, -1]**'], ['300', 'Fach 0 ist 5, Fach 1 ist 0: **frei**', '-', '-', '**[0, 1]**'], ['0', 'sofort -1', '-', '-', '**[-1, -1]**']]],
          ['warn', 'Typischer Fehler: [-1, -1] **innerhalb** der Schleife im sonst-Zweig zurückgeben. Dann wird nur das allererste Fach geprüft.']],
        see: ['eua-algoexam', 'eua-pseudocode', 'ps-struktogramm']},
      {pts: 6, rows: 8, topic: 'Schreibtischtest',
        op: '**Durchführen** heißt: den Code von Hand Schritt für Schritt ausführen und die Werte in eine Tabelle schreiben. **Beschreiben** heißt: den Zweck in eigenen Worten sagen.',
        hint: 'Mache eine Tabelle mit einer Spalte für jede Variable. Eine Zeile pro Durchlauf der äußeren Schleife. Gesperrte Fächer (-1) zählen nicht. Beachte die Falle: nutzbar kann 0 sein.',
        words: [['Schreibtischtest', 'Programm von Hand ausführen'], ['Variable', 'Speicherplatz mit Namen und Wert'], ['Schleife', 'Wiederholung von Anweisungen'], ['Quote', 'Anteil, hier belegt geteilt durch nutzbar'], ['gesperrt', 'nicht benutzbar']], q: 'Gegeben ist die Funktion **auswerten(regal)**. Führen Sie einen Schreibtischtest für regal = [[5, 0, -1, 9], [0, 0, 7, 0], [3, 8, -1, -1]] durch: Notieren Sie nach jedem Durchlauf der äußeren Schleife die Werte von r, belegt, nutzbar, besteQuote und besteReihe. Geben Sie den Rückgabewert an und beschreiben Sie, was die Funktion ermittelt.',
        ctx: [['code', 'pseudo', `funktion auswerten(regal)
    besteReihe = -1
    besteQuote = -1.0
    für r = 0 bis länge(regal) - 1
        belegt = 0
        nutzbar = 0
        für f = 0 bis länge(regal[r]) - 1
            wenn regal[r][f] >= 0 dann
                nutzbar = nutzbar + 1
                wenn regal[r][f] > 0 dann
                    belegt = belegt + 1
                ende wenn
            ende wenn
        ende für
        wenn nutzbar > 0 und belegt / nutzbar > besteQuote dann
            besteQuote = belegt / nutzbar
            besteReihe = r
        ende wenn
    ende für
    rückgabe besteReihe
ende funktion`]],
        a: [['table', ['nach Durchlauf', 'r', 'belegt', 'nutzbar', 'belegt / nutzbar', 'besteQuote', 'besteReihe'], [['Start', '-', '-', '-', '-', '-1.0', '-1'], ['1', '0', '2', '3', '0,667', '**0,667**', '**0**'], ['2', '1', '1', '4', '0,25', '0,667', '0'], ['3', '2', '2', '2', '1,0', '**1,0**', '**2**']]],
          'Rückgabewert: **2**. Die Funktion ermittelt die **Reihe mit der höchsten Auslastung** (Anteil belegter Fächer an den nicht gesperrten Fächern). Gesperrte Fächer (-1) zählen nicht mit.', 'Bewertung: Tabelle 4 P, Rückgabe und Zweck 2 P.'],
        sol: [['walk', {t: 'Schreibtischtest auswerten(regal)', steps: [
          {t: '**Reihe 0: [5, 0, -1, 9]**. Nicht gesperrt sind 5, 0 und 9 (nutzbar = 3), davon belegt 5 und 9 (belegt = 2). Quote 2/3 = 0,667 > -1, also neue Bestwerte.', b: [['table', ['f', '0', '1', '2', '3'], [['Wert', '5', '0', '-1', '9'], ['nutzbar?', 'ja', 'ja', '**nein**', 'ja'], ['belegt?', 'ja', 'nein', '-', 'ja']]]]},
          {t: '**Reihe 1: [0, 0, 7, 0]**. Alle 4 nutzbar, nur 7 belegt: 1/4 = 0,25. Nicht größer als 0,667, keine Änderung.', b: [['table', ['f', '0', '1', '2', '3'], [['Wert', '0', '0', '7', '0'], ['nutzbar?', 'ja', 'ja', 'ja', 'ja'], ['belegt?', 'nein', 'nein', 'ja', 'nein']]]]},
          {t: '**Reihe 2: [3, 8, -1, -1]**. Nutzbar 2, belegt 2: Quote 1,0 > 0,667. besteReihe = 2. Nach der Schleife wird **2** zurückgegeben.', b: [['chart', {kind: 'bar', w: 560, h: 220, labels: ['Reihe 0', 'Reihe 1', 'Reihe 2'], series: [{n: 'Auslastung', d: [0.67, 0.25, 1], k: 'accent'}], vals: true, ymax: 1, cap: 'Auslastung je Reihe: Reihe 2 ist voll belegt'}]]},
        ]}]],
        see: ['eua-algoexam', 'eua-debugging']},
      {pts: 3, topic: 'Datentypen und Laufzeit',
        op: '**Beheben** heißt: den Fehler beseitigen. **Angeben** heißt: das Ergebnis nennen.',
        hint: 'a) Was ergibt 2 / 3, wenn beide Zahlen ganze Zahlen sind? b) Zähle, wie oft jedes Fach angeschaut wird.',
        words: [['Ganzzahldivision', 'Teilung ohne Nachkommastellen'], ['Datentyp', 'Art des Wertes (int, double ...)'], ['Laufzeit', 'Zeit, die ein Programm braucht, je nach Datenmenge'], ['O-Notation', 'Schreibweise für das Wachstum der Laufzeit']], q: 'a) Die Funktion auswerten wird in Java umgesetzt; belegt und nutzbar sind vom Typ int. Welches Problem entsteht bei belegt / nutzbar, und wie beheben Sie es? b) Geben Sie die Laufzeitkomplexität von auswerten in O-Notation an (R Reihen, F Fächer je Reihe).',
        a: ['a) **Ganzzahldivision:** 2 / 3 ergibt in Java **0**, nicht 0,667. Dann sind alle Quoten 0 oder 1 und das Ergebnis ist falsch. Lösung: vorher in double umwandeln, zum Beispiel **(double) belegt / nutzbar**.', 'b) Jedes Fach wird genau einmal angeschaut: **O(R x F)**, also linear in der Anzahl aller Fächer.', 'Bewertung: a) Problem 1 P, Lösung 1 P; b) 1 P.'],
        sol: [['codes', [['java', `int belegt = 2, nutzbar = 3;
System.out.println(belegt / nutzbar);            // 0   (Ganzzahldivision)
System.out.println((double) belegt / nutzbar);   // 0.6666666666666666`], ['python', `belegt, nutzbar = 2, 3
print(belegt // nutzbar)   # 0     (Ganzzahldivision)
print(belegt / nutzbar)    # 0.666...  (in Python ist / immer Gleitkomma)`]]], ['out', `0
0.6666666666666666`]],
        see: ['eua-datentypen', 'eua-onotation']},
      {pts: 4, rows: 9, topic: 'Rekursion',
        op: '**Schreiben** heißt: den Code selbst formulieren. **Rekursiv** heißt: die Funktion ruft sich selbst auf.',
        hint: 'Zuerst die Abbruchbedingung (leerer Bereich). Dann die Mitte berechnen. Dann entweder Treffer oder in der linken oder rechten Hälfte weitersuchen.',
        words: [['rekursiv', 'ruft sich selbst wieder auf'], ['Abbruchbedingung', 'Bedingung, die die Rekursion beendet'], ['aufsteigend sortiert', 'vom kleinsten zum größten Wert'], ['binäre Suche', 'Suche, die den Bereich immer halbiert']], q: 'Die Paletten-IDs eines Lagers liegen **aufsteigend sortiert** in einem Feld ids vor. Schreiben Sie eine **rekursive** Funktion **binSuche(ids, ziel, links, rechts)**, die den Index von ziel zurückgibt oder -1, wenn ziel nicht enthalten ist. Der erste Aufruf lautet binSuche(ids, ziel, 0, länge(ids) - 1).',
        a: [['codes', [['pseudo', `funktion binSuche(ids, ziel, links, rechts)
    wenn links > rechts dann
        rückgabe -1                          // Abbruch: Bereich leer
    ende wenn
    mitte = (links + rechts) DIV 2
    wenn ids[mitte] = ziel dann
        rückgabe mitte
    sonst wenn ids[mitte] < ziel dann
        rückgabe binSuche(ids, ziel, mitte + 1, rechts)
    sonst
        rückgabe binSuche(ids, ziel, links, mitte - 1)
    ende wenn
ende funktion`], ['java', `static int binSuche(int[] ids, int ziel, int links, int rechts) {
    if (links > rechts) return -1;
    int mitte = (links + rechts) / 2;
    if (ids[mitte] == ziel) return mitte;
    if (ids[mitte] < ziel) return binSuche(ids, ziel, mitte + 1, rechts);
    return binSuche(ids, ziel, links, mitte - 1);
}`], ['python', `def bin_suche(ids, ziel, links, rechts):
    if links > rechts:
        return -1
    mitte = (links + rechts) // 2
    if ids[mitte] == ziel:
        return mitte
    if ids[mitte] < ziel:
        return bin_suche(ids, ziel, mitte + 1, rechts)
    return bin_suche(ids, ziel, links, mitte - 1)`]]],
          'Bewertung: Abbruchbedingung (1 P), Mitte und Treffer (1 P), zwei rekursive Aufrufe mit richtigen Grenzen (2 P).'],
        sol: [['walk', {t: 'binSuche([12, 17, 23, 31, 40, 52, 66, 78], 52, 0, 7)', steps: [
          {t: '**Aufruf 1:** links 0, rechts 7, mitte 3. ids[3] = 31 < 52, also rechts weitersuchen.', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6', '7'], [['Wert', '12', '17', '23', '**31**', '40', '52', '66', '78'], ['Bereich', 'x', 'x', 'x', 'mitte', 'x', 'x', 'x', 'x']]]]},
          {t: '**Aufruf 2:** links 4, rechts 7, mitte 5. ids[5] = 52 = ziel. Rückgabe **5** wird durch alle Aufrufe nach oben gereicht.', b: [['table', ['Index', '4', '5', '6', '7'], [['Wert', '40', '**52**', '66', '78'], ['Bereich', 'x', 'mitte = Treffer', 'x', 'x']]]]},
          {t: '**Warum schnell?** Jeder Aufruf halbiert den Bereich: bei n Elementen höchstens etwa log₂(n) + 1 Aufrufe. Für 12.000 Paletten sind das höchstens **14** Vergleiche statt bis zu 12.000 bei linearer Suche.', b: [['diagram', AP2.dg.flow(['0..7 (8)', '4..7 (4)', '6..7 (2)', '7..7 (1)', 'leer: -1'], {w: 720, h: 100, styles: ['accent', 'accent', 'accent', 'accent', 'bad'], cap: 'Schlimmster Fall bei 8 Elementen: der Bereich halbiert sich bis zur Abbruchbedingung'})]]},
        ]}]],
        see: ['eua-rekursion', 'eua-suchen']},
      {pts: 4, rows: 8, topic: 'Prüfziffer',
        op: '**Berechnen** heißt: mit Zahlen rechnen und den Rechenweg zeigen. **Begründen** heißt: ein Argument nennen.',
        hint: 'Multipliziere jede Ziffer mit ihrem Gewicht (3, 1, 3, 1 ...), addiere alles, nimm den Rest durch 10. Die Prüfziffer ergänzt die Summe bis zum nächsten Zehner.',
        words: [['Prüfziffer', 'letzte Ziffer, mit der man Tippfehler erkennt'], ['Gewicht', 'Faktor, mit dem eine Ziffer multipliziert wird'], ['Modulo', 'Rest einer Division (48 mod 10 = 8)'], ['Zifferndreher', 'zwei Ziffern wurden vertauscht'], ['NVE', 'Nummer der Versandeinheit (Palettennummer)']],
        q: 'Die Palettennummer (NVE) im Lager hat **7 Datenziffern und 1 Prüfziffer**. Die Datenziffern werden von links mit den Gewichten **3, 1, 3, 1, 3, 1, 3** multipliziert und addiert. Die Prüfziffer ist (10 - (Summe mod 10)) mod 10. a) Berechnen Sie die Prüfziffer für 4012573. b) Der Scanner liest 40125738. Ist die Nummer gültig? c) Nennen Sie zwei benachbarte Ziffern, deren Vertauschung diese Prüfung **nicht** erkennt, und begründen Sie das.',
        a: ['a) 4x3 + 0x1 + 1x3 + 2x1 + 5x3 + 7x1 + 3x3 = 12 + 0 + 3 + 2 + 15 + 7 + 9 = **48**. 48 mod 10 = 8. Prüfziffer = 10 - 8 = **2**. Die vollständige Nummer lautet 40125732.', 'b) Die letzte Ziffer ist 8, richtig wäre 2. Die Nummer ist **ungültig** (Tippfehler oder Lesefehler).', 'c) Beispiel: die Ziffern **2 und 7** (allgemein: Unterschied 5). Die Summe ändert sich beim Vertauschen um 2 x (a - b) = 2 x 5 = 10. Der Rest mod 10 bleibt gleich, also wird der Dreher nicht erkannt.', 'Bewertung: a) Rechenweg 1 P, Ergebnis 1 P; b) 1 P; c) Beispiel und Begründung 1 P.'],
        sol: [['table', ['Stelle', '1', '2', '3', '4', '5', '6', '7', 'Summe'], [['Ziffer', '4', '0', '1', '2', '5', '7', '3', ''], ['Gewicht', '3', '1', '3', '1', '3', '1', '3', ''], ['Produkt', '12', '0', '3', '2', '15', '7', '9', '**48**']]],
          ['diagram', AP2.dg.flow(['Summe 48', '48 mod 10 = 8', '10 - 8 = 2', 'Nummer 40125732'], {w: 760, h: 100, styles: ['plain', 'plain', 'accent', 'ok'], bw: 170, cap: 'Von der Summe zur Prüfziffer'})],
          ['tip', 'Warum werden Dreher meist erkannt? Wegen der wechselnden Gewichte 3 und 1 ändert sich die Summe. Nur bei Ziffern mit Unterschied 5 passt der Rest zufällig wieder.']],
        see: ['eua-pruefziffer']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Objektorientiert umsetzen (25 Punkte)',
    ctx: [['h3', 'Anlage: Klassendiagramm Fuhrpark'], ['diagram', {w: 820, h: 360, keep: 680, cap: 'Fuhrpark: abstrakte Klasse Fahrzeug («abstract»), Tour nutzt ein Fahrzeug und hat Sendungen', nodes: [
      {id: 'fz', k: 'cls', x: 410, y: 80, w: 300, t: {name: ['«abstract»', 'Fahrzeug'], attrs: ['- kennzeichen: String', '- maxNutzlast: double'], ops: ['+ Fahrzeug(kennzeichen: String, maxNutzlast: double)', '+ getKennzeichen(): String', '+ getMaxNutzlast(): double', '+ berechneMaut(km: double): double {abstract}']}},
      {id: 'lkw', k: 'cls', x: 230, y: 290, w: 300, t: {name: 'Lkw', attrs: ['- achsen: int'], ops: ['+ Lkw(k: String, n: double, achsen: int)', '+ berechneMaut(km: double): double']}},
      {id: 'tr', k: 'cls', x: 590, y: 290, w: 260, t: {name: 'Transporter', attrs: ['(keine)'], ops: ['+ berechneMaut(km: double): double']}},
      {id: 'to', k: 'cls', x: 120, y: 80, w: 190, t: {name: 'Tour', attrs: ['- fahrzeug: Fahrzeug', '- sendungen: Sendung[*]'], ops: ['+ istUeberladen(): boolean']}},
    ], edges: [{a: 'lkw', b: 'fz', ea: 'tri', via: [[230, 205], [410, 205]]}, {a: 'tr', b: 'fz', ea: 'tri', via: [[590, 205], [410, 205]]}, {a: 'to', b: 'fz', ta: '*', tb: '1'}]}],
      ['p', 'Maut: Ein **Lkw** zahlt je Kilometer **0,35 Euro**, wenn er **mindestens 4 Achsen** hat, sonst **0,27 Euro**. Ein **Transporter** ist mautfrei (0 Euro). Die Klasse **Sendung** hat die Methode getGewicht(): double.']],
    tasks: [
      {pts: 8, rows: 12, topic: 'Klassen implementieren',
        op: '**Implementieren** heißt: den Programmcode schreiben, der zum Diagramm passt.',
        hint: 'Lies das Diagramm genau: Sichtbarkeit (-/+), Typen, Konstruktor, abstrakte Methode. Die Unterklasse ruft den Konstruktor der Oberklasse mit super auf.',
        words: [['abstrakt', 'kann nicht direkt als Objekt erzeugt werden'], ['Konstruktor', 'Methode, die ein Objekt anlegt'], ['Getter', 'Methode, die ein Attribut liest'], ['Vererbung', 'Unterklasse übernimmt Eigenschaften der Oberklasse'], ['Maut', 'Straßengebühr'], ['Achse', 'Radachse eines Lkw']], q: 'Implementieren Sie die Klassen **Fahrzeug** und **Lkw** gemäß Klassendiagramm in einer objektorientierten Programmiersprache Ihrer Wahl (Konstruktoren, Getter, Maut).',
        a: [['codes', [['java', `public abstract class Fahrzeug {
    private String kennzeichen;
    private double maxNutzlast;

    public Fahrzeug(String kennzeichen, double maxNutzlast) {
        this.kennzeichen = kennzeichen;
        this.maxNutzlast = maxNutzlast;
    }
    public String getKennzeichen() { return kennzeichen; }
    public double getMaxNutzlast() { return maxNutzlast; }
    public abstract double berechneMaut(double km);
}

public class Lkw extends Fahrzeug {
    private int achsen;

    public Lkw(String k, double n, int achsen) {
        super(k, n);                       // Konstruktor der Oberklasse
        this.achsen = achsen;
    }
    @Override
    public double berechneMaut(double km) {
        double satz = (achsen >= 4) ? 0.35 : 0.27;
        return km * satz;
    }
}`], ['csharp', `public abstract class Fahrzeug
{
    private string kennzeichen;
    private double maxNutzlast;
    public Fahrzeug(string kennzeichen, double maxNutzlast)
    {
        this.kennzeichen = kennzeichen;
        this.maxNutzlast = maxNutzlast;
    }
    public string GetKennzeichen() => kennzeichen;
    public double GetMaxNutzlast() => maxNutzlast;
    public abstract double BerechneMaut(double km);
}

public class Lkw : Fahrzeug
{
    private int achsen;
    public Lkw(string k, double n, int achsen) : base(k, n) { this.achsen = achsen; }
    public override double BerechneMaut(double km) => km * (achsen >= 4 ? 0.35 : 0.27);
}`], ['python', `from abc import ABC, abstractmethod

class Fahrzeug(ABC):
    def __init__(self, kennzeichen, max_nutzlast):
        self.__kennzeichen = kennzeichen
        self.__max_nutzlast = max_nutzlast
    def get_kennzeichen(self):
        return self.__kennzeichen
    def get_max_nutzlast(self):
        return self.__max_nutzlast
    @abstractmethod
    def berechne_maut(self, km):
        pass

class Lkw(Fahrzeug):
    def __init__(self, k, n, achsen):
        super().__init__(k, n)
        self.__achsen = achsen
    def berechne_maut(self, km):
        return km * (0.35 if self.__achsen >= 4 else 0.27)`]]],
          'Bewertung: abstrakte Klasse und abstrakte Methode (2 P), private Attribute und Konstruktor (2 P), Getter (1 P), Vererbung mit super-Aufruf (2 P), Mautberechnung (1 P).'],
        see: ['eua-oop', 'eua-saeulen', 'eua-konstruktor']},
      {pts: 5, rows: 8, topic: 'Methode implementieren',
        op: '**Implementieren** heißt: den Code der Methode schreiben.',
        hint: 'Summiere alle Gewichte in einer Schleife. Vergleiche am Ende mit der Nutzlast. Nutze die Getter, nicht die privaten Attribute.',
        words: [['Nutzlast', 'Gewicht, das ein Fahrzeug laden darf'], ['überladen', 'zu schwer beladen'], ['privat', 'nur innerhalb der eigenen Klasse sichtbar']], q: 'Implementieren Sie die Methode **istUeberladen()** der Klasse Tour. Sie liefert true, wenn die Summe der Sendungsgewichte die maximale Nutzlast des Fahrzeugs übersteigt.',
        a: [['codes', [['java', `public boolean istUeberladen() {
    double summe = 0;
    for (Sendung s : sendungen) {
        summe += s.getGewicht();
    }
    return summe > fahrzeug.getMaxNutzlast();
}`], ['python', `def ist_ueberladen(self):
    summe = sum(s.get_gewicht() for s in self.__sendungen)
    return summe > self.__fahrzeug.get_max_nutzlast()`], ['pseudo', `methode istUeberladen(): boolean
    summe = 0
    für jede s in sendungen
        summe = summe + s.getGewicht()
    ende für
    rückgabe summe > fahrzeug.getMaxNutzlast()`]]],
          'Bewertung: Summenvariable (1 P), Schleife über alle Sendungen (2 P), Vergleich mit Nutzlast über Getter (2 P). Kein Zugriff auf private Attribute fremder Klassen!'],
        sol: [['table', ['Sendung', 'Gewicht (kg)', 'Summe bisher'], [['S1', '620', '620'], ['S2', '480', '1100'], ['S3', '910', '2010']]], ['p', 'Beispiel: Ein Transporter mit maxNutzlast 1200 hat die drei Sendungen. 2010 > 1200, also **true**. Bei einer leeren Liste ist die Summe 0 und das Ergebnis **false**.']],
        see: ['eua-oop']},
      {pts: 6, rows: 7, topic: 'Polymorphie',
        op: '**Erklären** heißt: den Begriff mit eigenen Worten und am Beispiel zeigen.',
        hint: 'Gehe die Schleife Zeile für Zeile durch. Welches Objekt steckt in f? Welche berechneMaut wird dann ausgeführt? Achte auf die Ausgabeformate (35.0 statt 35).',
        words: [['Polymorphie', 'Vielgestaltigkeit: gleicher Aufruf, anderes Verhalten'], ['dynamische Bindung', 'Die passende Methode wird erst zur Laufzeit gewählt'], ['Oberklasse / Unterklasse', 'allgemeine / besondere Klasse'], ['Ausgabe', 'Text, den das Programm anzeigt']], q: 'Welche Ausgabe erzeugt das Programm? Erklären Sie an diesem Beispiel die Begriffe **Polymorphie** und **dynamische Bindung**. Was passiert, wenn man im Programm zusätzlich **new Fahrzeug("X", 5)** schreibt?',
        ctx: [['code', 'java', `List<Fahrzeug> flotte = new ArrayList<>();
flotte.add(new Lkw("HB-NL 401", 18000, 5));
flotte.add(new Lkw("HB-NL 388", 7500, 3));
flotte.add(new Transporter("HB-NL 512", 1200));
double summe = 0;
for (Fahrzeug f : flotte) {
    double m = f.berechneMaut(100);
    System.out.println(f.getKennzeichen() + ": " + m);
    summe += m;
}
System.out.println("Summe: " + summe);`]],
        a: [['out', `HB-NL 401: 35.0
HB-NL 388: 27.0
HB-NL 512: 0.0
Summe: 62.0`],
          '**Polymorphie** (Vielgestaltigkeit): Eine Variable vom Typ der Oberklasse (Fahrzeug) kann Objekte verschiedener Unterklassen aufnehmen; derselbe Aufruf berechneMaut(100) verhält sich je nach Objekt unterschiedlich.', '**Dynamische (späte) Bindung:** Welche Implementierung ausgeführt wird, entscheidet sich erst **zur Laufzeit** anhand des tatsächlichen Objekttyps (Lkw oder Transporter), nicht anhand des deklarierten Typs.', '**Zusatz:** new Fahrzeug("X", 5) ist ein **Fehler beim Kompilieren**. Fahrzeug ist abstrakt, davon gibt es keine Objekte.', 'Bewertung: Ausgabe 3 P (Summe 62.0 inklusive), Erklärungen 2 P, Zusatz 1 P.'],
        sol: [['seq', {w: 720, actors: ['Schleife', 'Lkw 401 (5 Achsen)', 'Lkw 388 (3 Achsen)', 'Transporter 512'], cap: 'Derselbe Aufruf, drei Implementierungen: entschieden zur Laufzeit', steps: [
          [0, 1, 'berechneMaut(100)', 's'], [1, 0, '100 x 0,35 = 35.0', 'r'], [0, 2, 'berechneMaut(100)', 's'], [2, 0, '100 x 0,27 = 27.0', 'r'], [0, 3, 'berechneMaut(100)', 's'], [3, 0, '0.0', 'r'], ['note', 0, 'Summe 62.0']]}]],
        see: ['eua-saeulen', 'eua-interface']},
      {pts: 6, rows: 8, topic: 'Entwurfsmuster',
        op: '**Schlagen Sie vor** heißt: eine Lösung nennen und kurz begründen. **Skizzieren** heißt: einfach zeichnen.',
        hint: 'Das Verhalten soll austauschbar sein. Dafür gibt es eine Schnittstelle und mehrere Klassen, die sie umsetzen. Die Tour hält eine Referenz auf die Schnittstelle.',
        words: [['Entwurfsmuster', 'bewährte Vorlage für ein bekanntes Problem'], ['Schnittstelle (Interface)', 'Liste von Methoden ohne Code'], ['delegieren', 'Aufgabe an ein anderes Objekt weitergeben'], ['Kontext', 'Klasse, die das Muster benutzt']], q: 'NordLog fährt auch nach Österreich und Polen; dort gelten andere Mautregeln. Die Berechnung soll austauschbar sein, ohne die Fahrzeugklassen bei jeder neuen Regel zu ändern. Schlagen Sie ein Entwurfsmuster vor, skizzieren Sie es als Klassendiagramm und nennen Sie zwei Vorteile.',
        a: ['**Strategie-Muster (Strategy):** Eine Schnittstelle **MautStrategie** mit der Methode berechne(fahrzeug, km). Je Land eine Klasse (**MautDE**, **MautAT**, **MautPL**). Die Tour (Kontext) hält eine Referenz auf eine MautStrategie und delegiert die Berechnung; die Strategie kann zur Laufzeit gewechselt werden.', 'Vorteile: **Offen-geschlossen-Prinzip** (neues Land = neue Klasse, kein Ändern bestehender Klassen), keine langen if/switch-Ketten, Strategien einzeln testbar, Austausch zur Laufzeit.', 'Bewertung: Muster benannt (1 P), Diagramm mit Schnittstelle, Implementierungen und Kontext (3 P), zwei Vorteile (2 P).'],
        sol: [['diagram', {w: 800, h: 330, keep: 660, cap: 'Strategie-Muster: Tour delegiert an eine austauschbare MautStrategie (gestrichelt mit Dreieck = Realisierung)', nodes: [
          {id: 'ctx', k: 'cls', x: 130, y: 80, w: 220, t: {name: 'Tour', attrs: ['- strategie: MautStrategie'], ops: ['+ setStrategie(s: MautStrategie)', '+ maut(km: double): double']}},
          {id: 'if', k: 'cls', x: 520, y: 80, w: 300, s: 'accent', t: {name: ['«interface»', 'MautStrategie'], ops: ['+ berechne(f: Fahrzeug, km: double): double']}},
          {id: 'de', k: 'cls', x: 330, y: 270, w: 160, t: {name: 'MautDE', ops: ['+ berechne(...)']}}, {id: 'at', k: 'cls', x: 520, y: 270, w: 160, t: {name: 'MautAT', ops: ['+ berechne(...)']}},
          {id: 'pl', k: 'cls', x: 710, y: 270, w: 160, t: {name: 'MautPL', ops: ['+ berechne(...)']}},
        ], edges: [{a: 'ctx', b: 'if', ea: 'open', tb: '1'}, {a: 'de', b: 'if', ea: 'tri', k: 'dash', via: [[330, 190], [520, 190]]}, {a: 'at', b: 'if', ea: 'tri', k: 'dash'}, {a: 'pl', b: 'if', ea: 'tri', k: 'dash', via: [[710, 190], [520, 190]]}]}],
          ['code', 'java', `tour.setStrategie(new MautAT());     // Grenzübertritt: Strategie wechseln
double betrag = tour.maut(120);      // intern: strategie.berechne(fahrzeug, 120)`]],
        see: ['eua-patterns', 'eua-interface']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Datenbankabfragen erstellen (25 Punkte)',
    ctx: [['h3', 'Anlage: Datenbankmodell Tracking (Ausschnitt mit Beispieldaten)'],
      ['diagram', {w: 820, h: 250, keep: 680, cap: 'Tabellen und Beziehungen (Krähenfuß = viele)', nodes: [
        {id: 'k', k: 'cls', x: 100, y: 80, w: 170, t: {name: 'kunde', attrs: ['PK kunde_id', 'firma', 'ort']}},
        {id: 's', k: 'cls', x: 330, y: 80, w: 190, t: {name: 'sendung', attrs: ['PK sendung_id', 'FK kunde_id', 'gewicht_kg', 'status', 'erfasst_am (DATE)']}},
        {id: 'ts', k: 'cls', x: 560, y: 80, w: 180, t: {name: 'tour_sendung', attrs: ['PK, FK tour_id', 'PK, FK sendung_id', 'stopp_nr']}},
        {id: 't', k: 'cls', x: 560, y: 205, w: 180, t: {name: 'tour', attrs: ['PK tour_id', 'datum', 'FK fahrer_id', 'kennzeichen']}},
        {id: 'f', k: 'cls', x: 330, y: 205, w: 170, t: {name: 'fahrer', attrs: ['PK fahrer_id', 'name']}},
      ], edges: [{a: 's', b: 'k', sa: 'many', ea: 'one'}, {a: 'ts', b: 's', sa: 'many', ea: 'one'}, {a: 'ts', b: 't', sa: 'many', ea: 'one'}, {a: 't', b: 'f', sa: 'many', ea: 'one'}]}],
      ['row', [['table', ['kunde_id', 'firma', 'ort'], [['1', 'Hansa Kaffee AG', 'Bremen'], ['2', 'Fisch & Co. KG', 'Bremerhaven'], ['3', 'Weser Möbel GmbH', 'Verden'], ['4', 'Nordsee Bau GmbH', 'Cuxhaven']]],
        ['table', ['fahrer_id', 'name'], [['2', 'Tom Kruse'], ['5', 'Ali Demir'], ['7', 'Jana Wiese'], ['9', 'Lea Brandt']]]]],
      ['table', ['sendung_id', 'kunde_id', 'gewicht_kg', 'status', 'erfasst_am'], [['501', '1', '620', 'unterwegs', '2026-03-02'], ['502', '2', '480', 'unterwegs', '2026-03-02'], ['503', '1', '910', 'zugestellt', '2026-03-03'], ['504', '3', '750', 'unterwegs', '2026-03-04'], ['505', '1', '200', 'erfasst', '2026-03-05'], ['506', '3', '1100', 'unterwegs', '2026-03-05'], ['507', '2', '300', 'zugestellt', '2026-02-27'], ['508', '3', '90', 'erfasst', '2026-03-06']]],
      ['row', [['table', ['tour_id', 'datum', 'fahrer_id', 'kennzeichen'], [['100', '2026-03-03', '7', 'HB-NL 401'], ['101', '2026-03-03', '2', 'HB-NL 388'], ['102', '2026-03-04', '7', 'HB-NL 401'], ['103', '2026-03-05', '5', 'HB-NL 512']]],
        ['table', ['tour_id', 'sendung_id', 'stopp_nr'], [['100', '501', '1'], ['100', '502', '2'], ['101', '503', '1'], ['102', '502', '1'], ['102', '504', '2'], ['103', '506', '1']]]]]],
    tasks: [
      {pts: 2, topic: 'SELECT',
        op: '**Geben Sie aus** heißt: schreibe eine SQL-Abfrage, die diese Daten liefert.',
        hint: 'SELECT Spalten, FROM Tabelle, WHERE Bedingung, ORDER BY Sortierung. Bei Text steht der Wert in einfachen Anführungszeichen.',
        words: [['Abfrage', 'Frage an die Datenbank'], ['absteigend', 'vom größten zum kleinsten Wert (DESC)'], ['Tabelle', 'Datenbereich mit Zeilen und Spalten']], q: 'Geben Sie alle Sendungen mit Status "unterwegs" aus, die schwerer als 500 kg sind, absteigend nach Gewicht sortiert (sendung_id, gewicht_kg).',
        a: [['code', 'sql', `SELECT sendung_id, gewicht_kg
FROM sendung
WHERE status = 'unterwegs'
  AND gewicht_kg > 500
ORDER BY gewicht_kg DESC;`], ['table', ['sendung_id', 'gewicht_kg'], [['506', '1100'], ['504', '750'], ['501', '620']]], 'Sendung 502 fehlt (480 kg), 503 ist zugestellt.'],
        see: ['eua-sqlselect']},
      {pts: 5, topic: 'JOIN, GROUP BY, HAVING',
        op: '**Ermitteln** heißt: mit einer SQL-Abfrage berechnen.',
        hint: 'Verbinde die Tabellen mit JOIN. Filtere Zeilen mit WHERE. Gruppiere mit GROUP BY. Filtere Gruppen mit HAVING. Falle: "mehr als 2" bedeutet > 2.',
        words: [['JOIN', 'Tabellen über gleiche Schlüssel verbinden'], ['GROUP BY', 'Zeilen zu Gruppen zusammenfassen'], ['HAVING', 'Filter für Gruppen'], ['Aggregatfunktion', 'COUNT, SUM, AVG ... rechnet über viele Zeilen'], ['Gesamtgewicht', 'Summe aller Gewichte']], q: 'Ermitteln Sie je Kunde (Firma) die Anzahl der im **März 2026** erfassten Sendungen und deren Gesamtgewicht. Es sollen nur Kunden mit **mehr als 2** Sendungen erscheinen, sortiert nach Gesamtgewicht absteigend.',
        a: [['code', 'sql', `SELECT k.firma,
       COUNT(*)          AS anzahl,
       SUM(s.gewicht_kg) AS gesamtgewicht
FROM kunde k
JOIN sendung s ON s.kunde_id = k.kunde_id
WHERE s.erfasst_am BETWEEN '2026-03-01' AND '2026-03-31'
GROUP BY k.kunde_id, k.firma
HAVING COUNT(*) > 2
ORDER BY gesamtgewicht DESC;`], ['table', ['firma', 'anzahl', 'gesamtgewicht'], [['Weser Möbel GmbH', '3', '1940'], ['Hansa Kaffee AG', '3', '1730']]],
          'Bewertung: JOIN (1 P), WHERE-Zeitraum (1 P), GROUP BY mit Aggregaten (1 P), HAVING (1 P), ORDER BY (1 P).'],
        sol: [['walk', {t: 'So rechnet die Datenbank', steps: [
          {t: '**FROM + JOIN:** Jede Sendung bekommt ihre Firma.'},
          {t: '**WHERE:** Sendung 507 (27.02.) fällt heraus. Es bleiben 501 bis 506 und 508.', b: [['table', ['firma', 'sendung_id', 'gewicht_kg'], [['Hansa Kaffee AG', '501', '620'], ['Hansa Kaffee AG', '503', '910'], ['Hansa Kaffee AG', '505', '200'], ['Fisch & Co. KG', '502', '480'], ['Weser Möbel GmbH', '504', '750'], ['Weser Möbel GmbH', '506', '1100'], ['Weser Möbel GmbH', '508', '90']]]]},
          {t: '**GROUP BY:** Eine Zeile je Kunde mit COUNT und SUM.', b: [['table', ['firma', 'anzahl', 'gesamtgewicht'], [['Hansa Kaffee AG', '3', '1730'], ['Fisch & Co. KG', '1', '480'], ['Weser Möbel GmbH', '3', '1940']]]]},
          {t: '**HAVING COUNT(*) > 2:** Fisch & Co. fällt heraus (nur 1). **ORDER BY** sortiert: Weser Möbel 1940 vor Hansa Kaffee 1730.', b: [['merk', 'Reihenfolge der Auswertung: **FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT, ORDER BY**. WHERE filtert Zeilen, HAVING filtert Gruppen.']]},
        ]}]],
        see: ['eua-sqljoin', 'eua-sqlgroup']},
      {pts: 5, topic: 'Unterabfrage',
        op: '**Geben Sie aus** heißt: SQL-Abfrage schreiben.',
        hint: 'Gesucht sind Fahrer OHNE Tour. Denke an NOT EXISTS oder LEFT JOIN mit IS NULL. Prüfe das Datum an der richtigen Stelle.',
        words: [['Unterabfrage', 'Abfrage in einer Abfrage'], ['NOT EXISTS', 'es gibt keine passende Zeile'], ['LEFT JOIN', 'alle Zeilen links, auch ohne Partner rechts'], ['NULL', 'kein Wert vorhanden']], q: 'Geben Sie die Namen aller Fahrer aus, die am **03.03.2026 keine Tour** gefahren sind.',
        a: [['codes', [['sql', `-- Variante 1: NOT EXISTS
SELECT f.name
FROM fahrer f
WHERE NOT EXISTS (
    SELECT 1 FROM tour t
    WHERE t.fahrer_id = f.fahrer_id
      AND t.datum = '2026-03-03'
);

-- Variante 2: LEFT JOIN mit Bedingung im ON-Teil
SELECT f.name
FROM fahrer f
LEFT JOIN tour t ON t.fahrer_id = f.fahrer_id AND t.datum = '2026-03-03'
WHERE t.tour_id IS NULL;`]]], ['table', ['name'], [['Ali Demir'], ['Lea Brandt']]],
          ['warn', 'Falle: Steht die Datumsbedingung beim LEFT JOIN im **WHERE** statt im **ON**, werden die NULL-Zeilen wieder herausgefiltert und das Ergebnis ist leer. Auch **NOT IN** funktioniert, wird aber falsch, sobald die Unterabfrage NULL liefert.']],
        sol: [['p', 'Zwischenergebnis von **LEFT JOIN mit Datum im ON-Teil** (alle Fahrer bleiben erhalten):'], ['table', ['f.name', 't.tour_id'], [['Tom Kruse', '101'], ['Ali Demir', '**NULL**'], ['Jana Wiese', '100'], ['Lea Brandt', '**NULL**']]], ['p', 'WHERE t.tour_id IS NULL behält nur die Zeilen ohne Tour: **Ali Demir** und **Lea Brandt**. Tom und Jana sind am 03.03. gefahren (Touren 101 und 100). Deshalb stehen sie nicht im Ergebnis.']],
        see: ['eua-sqljoin', 'eua-sqlexam']},
      {pts: 3, topic: 'UPDATE',
        op: '**Setzen** heißt: Werte in der Tabelle ändern. **Wie viele Zeilen** heißt: zähle die Treffer.',
        hint: 'Das UPDATE braucht eine WHERE-Bedingung. Ohne WHERE werden ALLE Zeilen geändert. Die Sendungen der Tour findest du in tour_sendung.',
        words: [['UPDATE', 'SQL-Befehl zum Ändern'], ['betroffen', 'von der Änderung erfasst'], ['zugestellt', 'beim Kunden abgegeben']], q: 'Alle Sendungen der **Tour 102** wurden zugestellt. Setzen Sie ihren Status mit einer Anweisung auf "zugestellt". Wie viele Zeilen sind betroffen?',
        a: [['code', 'sql', `UPDATE sendung
SET status = 'zugestellt'
WHERE sendung_id IN (SELECT sendung_id
                     FROM tour_sendung
                     WHERE tour_id = 102);`], 'Betroffen sind **2 Zeilen** (Sendungen 502 und 504).', 'Bewertung: UPDATE/SET (1 P), Unterabfrage über tour_sendung (1 P), Anzahl (1 P).'],
        sol: [['row', [['table', ['sendung_id', 'status (vorher)'], [['502', 'unterwegs'], ['504', 'unterwegs']]], ['table', ['sendung_id', 'status (nachher)'], [['502', '**zugestellt**'], ['504', '**zugestellt**']]]]], ['warn', 'Falle: Ohne WHERE würden alle 8 Sendungen geändert.']],
        see: ['eua-sqldml']},
      {pts: 4, topic: 'CREATE TABLE',
        op: '**Schreiben** heißt: den SQL-Befehl vollständig formulieren.',
        hint: 'Spalten mit Typ. PRIMARY KEY über beide Spalten. Zwei FOREIGN KEY. Löschen automatisch: ON DELETE CASCADE.',
        words: [['zusammengesetzter Primärschlüssel', 'Schlüssel aus zwei Spalten'], ['Fremdschlüssel', 'Verweis auf eine andere Tabelle'], ['CASCADE', 'Folge-Löschung in verbundenen Zeilen']], q: 'Schreiben Sie die SQL-Anweisung, mit der die Tabelle **tour_sendung** angelegt wird (Datentypen, zusammengesetzter Primärschlüssel, Fremdschlüssel). Beim Löschen einer Tour sollen ihre Zuordnungen automatisch mit gelöscht werden.',
        a: [['code', 'sql', `CREATE TABLE tour_sendung (
    tour_id     INT NOT NULL,
    sendung_id  INT NOT NULL,
    stopp_nr    SMALLINT NOT NULL CHECK (stopp_nr > 0),
    PRIMARY KEY (tour_id, sendung_id),
    FOREIGN KEY (tour_id)    REFERENCES tour(tour_id) ON DELETE CASCADE,
    FOREIGN KEY (sendung_id) REFERENCES sendung(sendung_id)
);`], 'Bewertung: Spalten mit Typen (1 P), zusammengesetzter PK (1 P), zwei FKs (1 P), ON DELETE CASCADE (1 P).', 'Merke: Die Tabellen tour und sendung müssen vorher existieren, sonst schlägt FOREIGN KEY fehl.'],
        see: ['eua-sqldml', 'eua-sqler']},
      {pts: 3, topic: 'Index',
        op: '**Erklären** heißt: sagen, was es ist und wie es hilft. **Nennen** heißt: kurz aufschreiben.',
        hint: 'Vergleiche mit einem Stichwortverzeichnis im Buch. Denke an Vorteile (Suche) und Nachteile (Schreiben, Speicher).',
        words: [['Index', 'zusätzliche sortierte Tabelle zum schnellen Suchen'], ['B-Baum', 'Baumstruktur für schnelle Suche'], ['Full Table Scan', 'Datenbank liest alle Zeilen']], q: 'Das Tracking-Portal sucht sehr häufig mit WHERE kunde_id = ? nach Sendungen. Erklären Sie, was ein Index ist, wie er hier hilft und nennen Sie einen Nachteil. Geben Sie die SQL-Anweisung an.',
        a: ['Ein **Index** ist eine zusätzliche, sortierte Datenstruktur (meist **B-Baum**) mit Verweisen auf die Zeilen, ähnlich einem Stichwortverzeichnis. Statt alle Zeilen zu lesen (Full Table Scan, O(n)), findet die Datenbank die passenden Zeilen in etwa O(log n).', 'Nachteile: **zusätzlicher Speicher**, **INSERT/UPDATE/DELETE werden langsamer**, weil der Index mitgepflegt wird. Sinnvoll für häufig gefilterte, gejointe oder sortierte Spalten mit vielen verschiedenen Werten.', ['code', 'sql', 'CREATE INDEX idx_sendung_kunde ON sendung (kunde_id);'], 'Bewertung: Erklärung 1 P, Wirkung und Nachteil 1 P, SQL 1 P.'],
        see: ['eua-sqlexam', 'eua-baeume']},
      {pts: 3, rows: 8, topic: 'Transaktion',
        op: '**Erläutern** heißt: sagen, was es ist und warum es wichtig ist. **Schreiben** heißt: Befehle formulieren.',
        hint: 'Zwei Änderungen gehören zusammen. Entweder beide oder keine. Das leistet eine Transaktion mit START TRANSACTION, COMMIT und ROLLBACK.',
        words: [['Transaktion', 'Gruppe von Änderungen, die zusammen gelten'], ['COMMIT', 'Änderungen endgültig speichern'], ['ROLLBACK', 'Änderungen rückgängig machen'], ['Atomarität', 'ganz oder gar nicht'], ['Absturz', 'Programm oder Server bricht ab'], ['Umbuchung', 'Palette bekommt einen anderen Lagerplatz']],
        q: 'Die Palette 77 wird von Platz A-01 auf Platz B-02 **umgebucht**. In der Tabelle lagerplatz(platz_nr, palette_nve) sind dafür zwei UPDATE-Anweisungen nötig. a) Der Server stürzt nach der ersten Anweisung ab. Beschreiben Sie das Problem für die Daten. b) Schreiben Sie die SQL-Befehle als Transaktion. c) Nennen Sie die ACID-Eigenschaft, die hier gesichert wird, und erklären Sie sie. Nennen Sie eine weitere ACID-Eigenschaft.',
        a: ['a) Wenn nur das erste UPDATE (A-01 wird leer) ausgeführt wurde, ist Palette 77 **auf keinem Platz mehr** eingetragen. Das Lager ist **inkonsistent**: Die Palette ist weg, obwohl sie physisch steht.',
          ['code', 'sql', `START TRANSACTION;
UPDATE lagerplatz SET palette_nve = NULL WHERE platz_nr = 'A-01';
UPDATE lagerplatz SET palette_nve = 77   WHERE platz_nr = 'B-02';
COMMIT;      -- bei einem Fehler stattdessen: ROLLBACK;`],
          'c) **Atomarität (A):** Die Transaktion wird ganz oder gar nicht ausgeführt. Weitere: **Konsistenz** (gültiger Zustand davor und danach), **Isolation** (parallele Transaktionen stören sich nicht), **Dauerhaftigkeit** (nach COMMIT bleibt die Änderung auch nach Absturz erhalten).', 'Bewertung: a) 1 P, b) START/COMMIT und beide UPDATE 1 P, c) 1 P.'],
        sol: [['table', ['Zeitpunkt', 'A-01', 'B-02', 'Zustand'], [['Start', '77', 'leer', 'konsistent'], ['nach UPDATE 1 (ohne Transaktion), dann Absturz', 'leer', 'leer', '**Palette verloren**'], ['nach UPDATE 2 und COMMIT', 'leer', '77', 'konsistent'], ['mit Transaktion: Absturz vor COMMIT', '77', 'leer', 'konsistent (ROLLBACK)']]],
          ['diagram', AP2.dg.flow(['START TRANSACTION', 'UPDATE 1', 'UPDATE 2', 'COMMIT', 'dauerhaft gespeichert'], {w: 760, h: 100, styles: ['accent', 'plain', 'plain', 'gold', 'ok'], bw: 140, cap: 'Bei einem Fehler vor COMMIT: ROLLBACK stellt den Anfangszustand wieder her.'})]],
        see: ['eua-transaktionen']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Daten austauschen und Qualität sichern (25 Punkte)',
    tasks: [
      {pts: 5, rows: 10, topic: 'JSON',
        op: '**Erstellen** heißt: das Dokument schreiben. **Nennen** heißt: kurz aufschreiben.',
        hint: 'Geschweifte Klammern { } für Objekte, eckige [ ] für Listen. Texte in Anführungszeichen, Zahlen ohne. Unbekannt = null.',
        words: [['JSON', 'Textformat für Daten'], ['Objekt', 'Sammlung aus Schlüssel und Wert'], ['Array', 'Liste von Werten'], ['eingebettet', 'in einem anderen Objekt enthalten'], ['null', 'bewusst kein Wert']], q: 'Die Scanner-App überträgt Sendungen als JSON. a) Erstellen Sie ein JSON-Dokument für **Sendung 504** (Gewicht 750 kg, Status unterwegs) mit dem Kunden als **eingebettetem Objekt** (ID, Firma, Ort) und einer **Liste der Stopps** (Tour 102, Stopp 2). Das Feld zustellzeit ist noch unbekannt. b) Nennen Sie einen Unterschied zwischen JSON und XML.',
        a: [['code', 'json', `{
  "sendungId": 504,
  "gewichtKg": 750,
  "status": "unterwegs",
  "kunde": {
    "kundeId": 3,
    "firma": "Weser Möbel GmbH",
    "ort": "Verden"
  },
  "stopps": [
    { "tourId": 102, "stoppNr": 2 }
  ],
  "zustellzeit": null
}`], 'Bewertung a) 4 P: Objekt mit Schlüssel-Wert-Paaren (1 P), Zahl ohne Anführungszeichen und Text mit (1 P), eingebettetes Objekt (1 P), Array (1 P). b) 1 P.',
          'b) JSON ist **kompakter** (keine schließenden Tags), kennt **Datentypen** (Zahl, Boolean, null, Array); XML hat **Attribute und Namensräume**, kann mit **XSD** validiert und mit XSLT transformiert werden; JSON ist in JavaScript direkt verarbeitbar.'],
        see: ['eua-formate']},
      {pts: 6, rows: 10, topic: 'Unit-Test',
        op: '**Angeben** heißt: Ergebnis nennen. **Schreiben** heißt: Code formulieren.',
        hint: 'Rechne die Preise selbst aus: 25 EUR + 12 EUR je angefangene 100 kg über 100. Teste an jeder Grenze: 100/101, 200/201, 0, 1200/1201.',
        words: [['Unit-Test', 'automatischer Test einer kleinen Einheit'], ['Grenzwert', 'Wert direkt an einer Grenze'], ['angefangen', 'auch eine kleine Menge zählt als voll'], ['Express', 'Eillieferung'], ['Ausnahme (Exception)', 'Fehlermeldung im Programm']], q: 'Die Methode **berechnePreis(gewichtKg, express)** berechnet den Frachtpreis: **25,00 Euro** bis einschließlich 100 kg, für **jede angefangenen weiteren 100 kg** zusätzlich **12,00 Euro**. Express kostet **30 % Aufschlag**. Gewichte kleiner oder gleich 0 oder über 1.200 kg lösen eine **IllegalArgumentException** aus. a) Geben Sie fünf Testfälle mit Eingabe und erwartetem Ergebnis an, darunter Grenzwerte. b) Schreiben Sie einen Unit-Test (zum Beispiel JUnit 5), der die Ausnahme bei 0 kg prüft.',
        a: [['table', ['Nr.', 'gewichtKg', 'express', 'erwartet', 'Begründung'], [['1', '100', 'false', '25,00', 'Grenze Grundpreis'], ['2', '101', 'false', '37,00', 'erste angefangene 100 kg'], ['3', '250', 'false', '49,00', '25 + 2 x 12'], ['4', '250', 'true', '63,70', '49 x 1,3'], ['5', '1200', 'false', '157,00', '25 + 11 x 12, obere Grenze'], ['6', '0 / 1201', 'false', 'Exception', 'ungültige Grenzen']]],
          ['codes', [['java', `@Test
void nullKgWirftAusnahme() {
    Frachtrechner r = new Frachtrechner();
    assertThrows(IllegalArgumentException.class,
                 () -> r.berechnePreis(0, false));
}

@Test
void grenzeHundertEinsKg() {
    assertEquals(37.00, new Frachtrechner().berechnePreis(101, false), 0.001);
}`], ['python', `import pytest

def test_null_kg_wirft_ausnahme():
    with pytest.raises(ValueError):
        berechne_preis(0, False)

def test_grenze_101_kg():
    assert berechne_preis(101, False) == pytest.approx(37.00)`]]],
          'Bewertung: a) 5 Testfälle je 0,6 P (3 P), b) Testmethode mit Erwartung der Ausnahme 3 P.'],
        sol: [['chart', {kind: 'line', w: 720, h: 280, labels: ['0', '100', '101', '200', '201', '300', '400', '500', '600'], series: [{n: 'Preis normal (Euro)', d: [null, 25, 37, 37, 49, 49, 61, 73, 85], k: 'accent'}], ymax: 100, yl: 'Euro', cap: 'Stufenfunktion: An jeder 100-kg-Grenze springt der Preis. Genau dort liegen die wichtigsten Testfälle.'}]],
        see: ['eua-unittest', 'eua-testfaelle']},
      {pts: 5, rows: 8, topic: 'Exceptions',
        op: '**Begründen** heißt: sagen, warum. Hier: Warum läuft finally immer?',
        hint: 'Verfolge jeden Aufruf einzeln. Wo springt das Programm hin, wenn ein Fehler auftritt? finally läuft immer, auch nach return.',
        words: [['try / catch / finally', 'versuchen / Fehler fangen / immer ausführen'], ['Ausnahme', 'Fehler zur Laufzeit'], ['ArithmeticException', 'Fehler bei Rechnung, z. B. Division durch 0'], ['ArrayIndexOutOfBounds', 'Index außerhalb des Feldes']], q: 'Welche Ausgabe erzeugt das folgende Programm? Begründen Sie die Rolle des finally-Blocks.',
        ctx: [['code', 'java', `static int lade(int[] p, int i) {
    try {
        System.out.println("A");
        int x = 100 / p[i];
        System.out.println("B");
        return x;
    } catch (ArithmeticException e) {
        System.out.println("C");
        return -1;
    } finally {
        System.out.println("D");
    }
}

public static void main(String[] args) {
    int[] p = {4, 0};
    System.out.println(lade(p, 0));
    System.out.println(lade(p, 1));
    try {
        lade(p, 2);
    } catch (ArrayIndexOutOfBoundsException e) {
        System.out.println("E");
    }
}`]],
        a: [['out', `A
B
D
25
A
C
D
-1
A
D
E`], 'finally wird **immer** ausgeführt: nach normalem return (D vor 25), nach dem catch (D vor -1) und auch, wenn die Ausnahme **nicht gefangen** wird (Index 2: ArrayIndexOutOfBoundsException passt nicht zum catch, D wird ausgegeben, dann fängt main die Ausnahme und gibt E aus). Typisch für Aufräumarbeiten (Datei, Verbindung schließen).', 'Bewertung: drei Aufrufe je 1 P, Begründung 2 P.'],
        sol: [['walk', {t: 'Ablauf der drei Aufrufe', steps: [
          {t: '**lade(p, 0):** 100 / 4 = 25, kein Fehler. "A", "B", dann return 25; **vor** dem Verlassen läuft finally: "D". main gibt 25 aus.', b: [['diagram', AP2.dg.flow(['try: A', '100/4 = 25', 'B, return 25', 'finally: D', 'main: 25'], {w: 760, h: 100, styles: ['accent', 'ok', 'ok', 'gold', 'plain']})]]},
          {t: '**lade(p, 1):** 100 / 0 wirft ArithmeticException. "B" wird übersprungen, catch gibt "C" aus und return -1, finally "D".', b: [['diagram', AP2.dg.flow(['try: A', '100/0: Fehler', 'catch: C, return -1', 'finally: D', 'main: -1'], {w: 760, h: 100, styles: ['accent', 'bad', 'ok', 'gold', 'plain']})]]},
          {t: '**lade(p, 2):** p[2] existiert nicht: ArrayIndexOutOfBoundsException. Kein passendes catch in lade, finally gibt trotzdem "D" aus, die Ausnahme geht an main, dort "E".', b: [['diagram', AP2.dg.flow(['try: A', 'p[2]: Fehler', 'kein passendes catch', 'finally: D', 'main-catch: E'], {w: 760, h: 100, styles: ['accent', 'bad', 'plain', 'gold', 'ok']})]]},
        ]}]],
        see: ['eua-exceptions']},
      {pts: 5, rows: 8, topic: 'Sortieren',
        op: '**Geben Sie an** heißt: schreibe die Zwischenergebnisse auf. **Erklären** heißt: mit Grund.',
        hint: 'Insertion Sort: Nimm das nächste Element und schiebe es links in den sortierten Teil an die richtige Stelle. Notiere das Feld nach jedem Durchlauf.',
        words: [['Insertion Sort', 'Sortieren durch Einfügen'], ['stabil', 'gleiche Werte behalten ihre Reihenfolge'], ['in-place', 'braucht kaum zusätzlichen Speicher'], ['bester / schlechtester Fall', 'günstigste / ungünstigste Eingabe']], q: 'Die Gewichte [620, 480, 910, 200, 750] sollen mit **Insertion Sort** (Sortieren durch Einfügen) aufsteigend sortiert werden. a) Geben Sie den Zustand des Feldes nach jedem Durchlauf der äußeren Schleife an. b) Nennen Sie die Laufzeit im besten und schlechtesten Fall und erklären Sie, wann der beste Fall eintritt.',
        a: [['table', ['Durchlauf', 'eingefügtes Element', 'Feld danach'], [['Start', '-', '620, 480, 910, 200, 750'], ['1', '480', '**480, 620**, 910, 200, 750'], ['2', '910', '**480, 620, 910**, 200, 750'], ['3', '200', '**200, 480, 620, 910**, 750'], ['4', '750', '**200, 480, 620, 750, 910**']]],
          'b) Bester Fall **O(n)**, wenn das Feld **bereits sortiert** ist (jedes Element wird nur einmal verglichen). Schlechtester Fall **O(n²)** bei umgekehrt sortiertem Feld. Insertion Sort ist **stabil** und arbeitet **in-place**.', 'Bewertung: a) 3 P, b) 2 P.'],
        sol: [['walk', {t: 'Insertion Sort als Balkendiagramm', steps: [
          {t: '**Start:** Der linke Teil (nur 620) gilt als sortiert.', b: [bars([620, 480, 910, 200, 750], 0, 'Ausgangsfeld')]},
          {t: '**Durchlauf 1:** 480 wird gezogen; 620 > 480 rückt nach rechts, 480 an Index 0.', b: [bars([480, 620, 910, 200, 750], 0, 'nach Durchlauf 1')]},
          {t: '**Durchlauf 2:** 910 ist größer als 620, bleibt stehen (nur ein Vergleich).', b: [bars([480, 620, 910, 200, 750], 2, 'nach Durchlauf 2')]},
          {t: '**Durchlauf 3:** 200 wandert an allen drei vorbei ganz nach vorn (3 Verschiebungen).', b: [bars([200, 480, 620, 910, 750], 0, 'nach Durchlauf 3')]},
          {t: '**Durchlauf 4:** 750 rückt vor 910. Fertig.', b: [bars([200, 480, 620, 750, 910], 3, 'sortiert'), ['tool', 'sort']]},
        ]}]],
        see: ['eua-sortieren']},
      {pts: 4, rows: 9, topic: 'Stack und Queue',
        op: '**Geben Sie an** heißt: schreibe die Zustände Schritt für Schritt auf. **Zuordnen** heißt: sagen, was zu was passt, und warum.',
        hint: 'Stack: zuletzt rein, zuerst raus (LIFO). Queue: zuerst rein, zuerst raus (FIFO). Mache für jeden Schritt eine Tabellenzeile. Schreibe auch auf, was pop oder dequeue zurückgibt.',
        words: [['Stack (Stapel)', 'Datenstruktur: letzter Wert kommt zuerst heraus'], ['Queue (Warteschlange)', 'Datenstruktur: erster Wert kommt zuerst heraus'], ['push / pop', 'obendrauf legen / oben wegnehmen'], ['enqueue / dequeue', 'hinten einreihen / vorne herausnehmen'], ['LIFO / FIFO', 'last in first out / first in first out'], ['Sackgasse', 'Lagergasse mit nur einer Zufahrt']],
        q: 'In einer Sackgasse des Blocklagers werden Paletten übereinander gestellt. Die Verwaltung speichert die Palettennummern in einem **Stack**. Folge: push(101), push(102), push(103), pop(), push(104), pop(), pop(). a) Geben Sie nach jeder Operation den Inhalt des Stacks (unten bis oben) und den Rückgabewert von pop an. b) Führen Sie dieselbe Folge mit einer **Queue** aus (push = enqueue, pop = dequeue). c) Welche Struktur passt zur Sackgasse, welche zur Warteschlange vor der Verladerampe? Begründen Sie kurz.',
        a: [['table', ['Schritt', 'Stack (unten ... oben)', 'pop liefert', 'Queue (vorn ... hinten)', 'dequeue liefert'], [['push 101', '101', '-', '101', '-'], ['push 102', '101, 102', '-', '101, 102', '-'], ['push 103', '101, 102, 103', '-', '101, 102, 103', '-'], ['pop', '101, 102', '**103**', '102, 103', '**101**'], ['push 104', '101, 102, 104', '-', '102, 103, 104', '-'], ['pop', '101, 102', '**104**', '103, 104', '**102**'], ['pop', '101', '**102**', '104', '**103**']]],
          'c) Sackgasse = **Stack (LIFO)**: Die zuletzt eingestellte Palette steht vorn und wird zuerst entnommen. Verladerampe = **Queue (FIFO)**: Wer zuerst kommt, wird zuerst bedient.', 'Bewertung: a) 1,5 P, b) 1,5 P, c) 1 P.'],
        sol: [['diagram', {w: 760, h: 210, keep: 600, cap: 'Zustand nach der dritten Operation: Stack (links) und Queue (rechts)', nodes: [
          {id: 's3', k: 'box', x: 120, y: 40, w: 110, h: 34, t: '103 (oben)', s: 'accent'}, {id: 's2', k: 'box', x: 120, y: 78, w: 110, h: 34, t: '102'}, {id: 's1', k: 'box', x: 120, y: 116, w: 110, h: 34, t: '101 (unten)'},
          {id: 'sl', k: 'text', x: 120, y: 175, t: 'Stack: pop liefert 103', w: 10, h: 10, mw: 220},
          {id: 'q1', k: 'box', x: 330, y: 80, w: 100, h: 40, t: '101 (vorn)', s: 'accent'}, {id: 'q2', k: 'box', x: 440, y: 80, w: 100, h: 40, t: '102'}, {id: 'q3', k: 'box', x: 550, y: 80, w: 100, h: 40, t: '103 (hinten)'},
          {id: 'ql', k: 'text', x: 490, y: 175, t: 'Queue: dequeue liefert 101', w: 10, h: 10, mw: 260},
        ], edges: []}], ['merk', 'LIFO = Stack (Stapel Teller). FIFO = Queue (Schlange an der Kasse).']],
        see: ['eua-stackqueue']},
    ],
  });
  AP2.exam.end(ID);
})();
