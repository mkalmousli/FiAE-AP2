// Probeprüfung 7, Entwicklung und Umsetzung von Algorithmen: Kinoplex Südwest GmbH, KinoTix.
(function () {
  const ID = 'exam7-eua';
  const SAAL = [[1, 0, 0, 1, 0, 0, 1], [0, 0, -1, 0, 0, 0, 1], [0, 0, 0, 0, 1, 0, 0], [1, 0, 0, 0, -1, 0, 0]];
  const seats = (rows) => ['table', ['Reihe', 'Platz 0', 'Platz 1', 'Platz 2', 'Platz 3', 'Platz 4', 'Platz 5', 'Platz 6'], rows.map((r, i) => ['Reihe ' + i].concat(r.map((v) => String(v))))];
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 7 (Kino)', t: 'Algorithmen: Sitzplatzsystem KinoTix', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.eua,
    hint: 'Realistischer Aufgabensatz: 4 Handlungsschritte zu je 25 Punkten, 90 Minuten. Programmieraufgaben in Pseudocode oder einer Sprache Ihrer Wahl. Schwerpunkte: 2D-Array, Binärsuche, Rekursion, Hashtabelle, Prüfziffer, OOP, SQL, Testfälle, Laufzeit.',
    words: [['Feld / Array', 'Eine Liste von Werten mit Nummern (Index). Der erste Index ist 0.'], ['zweidimensional', 'Wie eine Tabelle mit Zeilen und Spalten: feld[zeile][spalte].'], ['Schleife', 'Ein Programmteil, der sich wiederholt.'], ['Rückgabe', 'Der Wert, den eine Funktion zurückgibt.'], ['Schreibtischtest', 'Ein Programm von Hand durchgehen und die Werte in eine Tabelle schreiben.'],
      ['Grenzwert', 'Ein Wert direkt an der Grenze, zum Beispiel 0 und 1 bei „mindestens 1“.'], ['Äquivalenzklasse', 'Eine Gruppe von Werten, bei denen sich das Programm gleich verhält.'], ['rekursiv', 'Eine Funktion ruft sich selbst auf.'], ['Abbruchbedingung', 'Die Regel, die eine Rekursion beendet.'], ['Aufrufbaum', 'Zeichnung: Welcher Aufruf macht welche weiteren Aufrufe?'],
      ['Hashfunktion', 'Rechnet aus einem Wert eine Position in der Tabelle.'], ['Kollision', 'Zwei Werte haben dieselbe Position.'], ['Prüfziffer', 'Eine extra Ziffer, mit der man Tippfehler erkennt.'], ['Kapselung', 'Daten sind privat. Nur Methoden der Klasse dürfen sie ändern.'], ['Konstruktor', 'Spezielle Methode, die ein neues Objekt erzeugt und startet.'], ['Vererbung', 'Eine Klasse übernimmt Attribute und Methoden einer anderen.'],
      ['Subselect', 'Eine SQL-Abfrage in einer anderen Abfrage.'], ['Laufzeit', 'Wie stark wächst die Rechenzeit, wenn die Daten mehr werden?']],
    intro: [
      ['p', 'Sie entwickeln bei der **Rheinbyte Software GmbH** das Online-Ticketsystem **KinoTix** für die **Kinoplex Südwest GmbH**. Ein Saal wird als **zweidimensionales Feld** gespeichert. Die erste Reihe ist die Reihe vorn an der Leinwand.'],
      ['kv', [['sitze[r][p]', 'Inhalt von Reihe r, Platz p: **0** = frei, **1** = belegt, **-1** = Gang (kein Sitz)'], ['Indizes', 'beginnen bei 0; länge(feld) liefert die Anzahl der Elemente'], ['Pseudocode', 'für ... bis, wenn ... dann ... sonst, solange, rückgabe; DIV = Ganzzahldivision']]],
      ['h3', 'Beispielsaal (4 Reihen mit je 7 Plätzen)'], seats(SAAL),
    ]});

  // ---------- Handlungsschritt 1 ----------
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Sitzplätze finden und auswerten (25 Punkte)',
    tasks: [
      {pts: 10, rows: 12, topic: 'Algorithmus entwickeln', op: '**Entwickeln** heißt: einen eigenen Algorithmus schreiben, der alle Fälle richtig löst.',
        hint: 'Gehen Sie Reihe für Reihe durch. Zählen Sie freie Plätze nebeneinander in einer Variablen. Bei einem belegten Platz oder einem Gang beginnt das Zählen wieder bei 0. Sie müssen die Zählung am Anfang jeder Reihe zurücksetzen.',
        words: [['nebeneinander', 'Direkt nacheinander in derselben Reihe, ohne Lücke.'], ['zurücksetzen', 'Wieder auf 0 stellen.']],
        q: 'Entwickeln Sie die Funktion **findeBlock(sitze, anzahl)**. Eine Gruppe möchte **anzahl** Plätze **direkt nebeneinander** in einer Reihe. Die Funktion sucht von vorn (Reihe 0 zuerst, in der Reihe Platz 0 zuerst) und gibt die Position **[r, p]** des **ersten Platzes** des ersten passenden Blocks zurück. Ein Gang unterbricht einen Block. Gibt es keinen Block oder ist anzahl kleiner als 1, wird **[-1, -1]** zurückgegeben.',
        a: ['Kernidee: eine Variable **serie** zählt die freien Plätze hintereinander. Sie wird bei jeder neuen **Reihe** und bei jedem **nicht freien Platz** (belegt oder Gang) auf 0 gesetzt. Bei serie = anzahl wird sofort zurückgegeben. Startplatz = p - anzahl + 1.',
          ['codes', [['pseudo', `funktion findeBlock(sitze, anzahl)
    wenn anzahl < 1 dann
        rückgabe [-1, -1]
    ende wenn
    für r = 0 bis länge(sitze) - 1
        serie = 0
        für p = 0 bis länge(sitze[r]) - 1
            wenn sitze[r][p] = 0 dann
                serie = serie + 1
                wenn serie = anzahl dann
                    rückgabe [r, p - anzahl + 1]
                ende wenn
            sonst
                serie = 0
            ende wenn
        ende für
    ende für
    rückgabe [-1, -1]
ende funktion`], ['java', `static int[] findeBlock(int[][] sitze, int anzahl) {
    if (anzahl < 1) return new int[]{-1, -1};
    for (int r = 0; r < sitze.length; r++) {
        int serie = 0;                       // neue Reihe: neu zählen
        for (int p = 0; p < sitze[r].length; p++) {
            if (sitze[r][p] == 0) {
                serie++;
                if (serie == anzahl) return new int[]{r, p - anzahl + 1};
            } else {
                serie = 0;                   // belegt oder Gang
            }
        }
    }
    return new int[]{-1, -1};
}`], ['python', `def finde_block(sitze, anzahl):
    if anzahl < 1:
        return [-1, -1]
    for r, reihe in enumerate(sitze):
        serie = 0
        for p, inhalt in enumerate(reihe):
            if inhalt == 0:
                serie += 1
                if serie == anzahl:
                    return [r, p - anzahl + 1]
            else:
                serie = 0
    return [-1, -1]`]]],
          'Bewertung: Prüfung anzahl < 1 (1 P), äußere Schleife (1 P), serie = 0 am Reihenanfang (2 P), innere Schleife (1 P), Zählen bei frei (1 P), Zurücksetzen bei nicht frei (2 P), Rückgabe mit richtigem Startplatz (1 P), Rückgabe [-1, -1] am Ende (1 P).'],
        sol: [['diagram', AP2.dg.nsd([['if', 'anzahl < 1 ?', [['act', 'rückgabe [-1, -1]']], [
          ['for', 'für r = 0 bis länge(sitze) - 1', [['act', 'serie = 0'], ['for', 'für p = 0 bis länge(sitze[r]) - 1', [['if', 'sitze[r][p] = 0 ?', [['act', 'serie = serie + 1'], ['if', 'serie = anzahl ?', [['act', 'rückgabe [r, p - anzahl + 1]']], [['act', '(nichts)']]]], [['act', 'serie = 0']]]]]]],
          ['act', 'rückgabe [-1, -1]']]]], {w: 700, cap: 'Dieselbe Lösung als Struktogramm (Nassi-Shneiderman)'})],
          ['walk', {t: 'findeBlock(sitze, 3) für den Beispielsaal', steps: [
            {t: '**Reihe 0:** [1, 0, 0, 1, 0, 0, 1]. Die serie wird 0, 1, 2, dann bei der 1 wieder 0, dann 1, 2, dann bei der 1 wieder 0. Sie erreicht nie 3.', b: [['table', ['Platz p', '0', '1', '2', '3', '4', '5', '6'], [['Wert', '1', '0', '0', '1', '0', '0', '1'], ['serie danach', '0', '1', '2', '0', '1', '2', '0']]]]},
            {t: '**Reihe 1:** [0, 0, -1, 0, 0, 0, 1]. Der **Gang** (-1) setzt die serie auf 0. Ohne das Zurücksetzen wäre der Block 0 bis 5 gefunden worden. Das wäre falsch.', b: [['table', ['Platz p', '0', '1', '2', '3', '4', '5', '6'], [['Wert', '0', '0', '-1', '0', '0', '0', '1'], ['serie danach', '1', '2', '0', '1', '2', '**3**', '0']]]]},
            {t: '**Treffer:** Bei p = 5 ist serie = 3 = anzahl. Rückgabe [1, 5 - 3 + 1] = **[1, 3]**. Die Gruppe sitzt in Reihe 1 auf den Plätzen 3, 4 und 5.', b: [['diagram', AP2.dg.flow(['Platz 3 frei', 'Platz 4 frei', 'Platz 5 frei'], {w: 520, h: 90, styles: ['ok', 'ok', 'ok'], cap: 'Gefundener Block in Reihe 1'})]]},
          ]}],
          ['warn', 'Typische Fehler: serie nicht pro Reihe zurücksetzen (Block über den Reihenwechsel), Gang wie freien Platz behandeln, Startplatz = p statt p - anzahl + 1, [-1, -1] innerhalb der Schleife zurückgeben.']],
        see: ['eua-algoexam', 'eua-pseudocode', 'ps-struktogramm']},
      {pts: 6, rows: 8, topic: 'Schreibtischtest', op: '**Durchführen** heißt: Schritt für Schritt wie der Computer rechnen. **Beschreiben** heißt: in eigenen Worten sagen, was die Funktion macht.',
        hint: 'Legen Sie eine Tabelle an: eine Zeile für jeden Platz p. Schreiben Sie nach jedem Durchlauf die neuen Werte von serie und beste auf.',
        words: [['Zweck', 'Wofür die Funktion da ist.']],
        ctx: [['code', 'pseudo', `funktion laengsteLuecke(reihe)
    beste = 0
    serie = 0
    für p = 0 bis länge(reihe) - 1
        wenn reihe[p] = 0 dann
            serie = serie + 1
        sonst
            serie = 0
        ende wenn
        wenn serie > beste dann
            beste = serie
        ende wenn
    ende für
    rückgabe beste
ende funktion`]],
        q: 'Führen Sie einen Schreibtischtest für **reihe = [0, 0, 1, 0, 0, 0, -1, 0, 0]** durch. Notieren Sie für jeden Platz p die Werte von serie und beste. a) Geben Sie den Rückgabewert an. b) Beschreiben Sie, was die Funktion ermittelt. c) Was liefert die Funktion für eine leere Reihe [ ]?',
        a: [['table', ['p', 'reihe[p]', 'serie', 'beste'], [['Start', '-', '0', '0'], ['0', '0', '1', '1'], ['1', '0', '2', '2'], ['2', '1', '0', '2'], ['3', '0', '1', '2'], ['4', '0', '2', '2'], ['5', '0', '3', '**3**'], ['6', '-1', '0', '3'], ['7', '0', '1', '3'], ['8', '0', '2', '3']]],
          'a) Rückgabewert **3**. (Tabelle 4 P) b) Die Funktion ermittelt die **längste Folge freier Plätze nebeneinander** in einer Reihe (hier Plätze 3 bis 5). Belegte Plätze und Gänge beenden eine Folge. (1 P) c) Bei einer leeren Reihe läuft die Schleife nicht, die Funktion gibt **0** zurück. (1 P)'],
        see: ['eua-algoexam', 'eua-debugging']},
      {pts: 4, topic: 'Datentypen und Prozentrechnung', op: '**Begründen** heißt: Mit „weil“ erklären. **Berechnen** heißt: mit Rechenweg.',
        hint: 'In Java ist 6 / 26 mit zwei ganzen Zahlen eine Ganzzahldivision. Das Ergebnis ist 0. Multiplizieren Sie zuerst.',
        words: [['Ganzzahldivision', 'Teilen ohne Nachkommastellen. 7 / 2 ergibt 3.'], ['Gang', 'Ein Feld mit -1: kein Sitzplatz, zählt nicht mit.']],
        q: 'Die Auslastung eines Saals ist der Anteil belegter Sitze an allen **Sitzen** (Gänge zählen nicht). a) Berechnen Sie die Auslastung des Beispielsaals in Prozent von Hand. b) Ein Entwickler schreibt in Java `int prozent = belegt / sitzGesamt * 100;` mit int-Variablen. Welches Ergebnis entsteht? Begründen Sie und korrigieren Sie die Zeile. c) Welcher Sonderfall muss abgefangen werden?',
        a: ['a) Felder: 4 x 7 = 28. Gänge: 2 (Reihe 1 Platz 2, Reihe 3 Platz 4). Sitze: 28 - 2 = **26**. Belegt: Reihe 0: 3, Reihe 1: 1, Reihe 2: 1, Reihe 3: 1 = **6**. Auslastung: 6 / 26 x 100 = **23,08 %**. (2 P)', 'b) 6 / 26 ist bei int **0** (Ganzzahldivision, Nachkommastellen entfallen). 0 x 100 = **0 %**. Korrektur: **erst multiplizieren**: `int prozent = belegt * 100 / sitzGesamt;` ergibt 600 / 26 = 23 (abgerundet). Oder mit double: `(double) belegt / sitzGesamt * 100`. (1 P)', 'c) **sitzGesamt = 0** (Saal nur aus Gängen) führt zu einer Division durch 0 (Fehler). Vorher prüfen und 0 zurückgeben. (1 P)'],
        sol: [['codes', [['java', `int belegt = 6, sitzGesamt = 26;
System.out.println(belegt / sitzGesamt * 100);   // 0   (erst Division: 0, dann mal 100)
System.out.println(belegt * 100 / sitzGesamt);   // 23  (erst Produkt: 600, dann Division)
System.out.println((double) belegt / sitzGesamt * 100);  // 23.076923...`], ['python', `belegt, sitz_gesamt = 6, 26
print(belegt // sitz_gesamt * 100)   # 0   (Ganzzahldivision)
print(belegt * 100 / sitz_gesamt)    # 23.076923...  (/ liefert in Python Kommazahlen)`]]], ['out', `0
23
23.076923076923077`]],
        see: ['eua-datentypen']},
      {pts: 5, topic: 'Testfälle und Grenzwerte', op: '**Bilden** heißt: Gruppen festlegen. **Angeben** heißt: konkrete Werte mit erwartetem Ergebnis nennen.',
        hint: 'Pro Gruppe ein Wert aus der Mitte und die Werte direkt an den Grenzen. Rechnen Sie das erwartete Ergebnis mit dem Beispielsaal aus.',
        words: [['gültig / ungültig', 'Erlaubter / nicht erlaubter Eingabewert.'], ['erwartetes Ergebnis', 'Was das Programm laut Aufgabe liefern soll.']],
        q: 'Eine Buchung darf **1 bis 10 Plätze** umfassen. Bilden Sie Äquivalenzklassen für den Parameter anzahl. Geben Sie mithilfe der Grenzwertanalyse mindestens fünf Testfälle für **findeBlock** mit dem Beispielsaal und dem **erwarteten Ergebnis** an. Ein Testfall soll prüfen, ob der Gang einen Block richtig unterbricht.',
        a: [['table', ['Klasse', 'Bereich', 'Testwert anzahl', 'Erwartet (Beispielsaal)'], [['ungültig (zu klein)', 'kleiner 1', '0', '[-1, -1]'], ['gültig, Grenze unten', '1', '1', '[0, 1]'], ['gültig, normal', '2 bis 9', '3', '[1, 3]'], ['gültig, Block ganz in Reihe', '4', '4', '[2, 0]'], ['gültig, Gang prüfen', '5', '5', '[-1, -1] (Gang in Reihe 1 trennt Plätze 0-1 und 3-5)'], ['gültig, Grenze oben', '10', '10', '[-1, -1] (Reihe hat nur 7 Plätze)'], ['ungültig (zu groß)', 'größer 10', '11', '[-1, -1] bzw. Fehlermeldung']]],
          'Bewertung: Klassen 2 P, fünf Testfälle mit Wert und erwartetem Ergebnis je 0,5 P (3 P gerundet), Gang-Test enthalten gehört dazu.'],
        sol: [['diagram', {w: 760, h: 120, keep: 600, cap: 'Zahlenstrahl: Klassengrenzen und Testwerte', nodes: [
          {id: 'u1', k: 'box', x: 90, y: 50, w: 140, h: 44, t: ['ungültig', '< 1'], s: 'bad'}, {id: 'g1', k: 'box', x: 350, y: 50, w: 360, h: 44, t: ['gültig', '1 ... 10'], s: 'ok'}, {id: 'u2', k: 'box', x: 650, y: 50, w: 150, h: 44, t: ['ungültig', '> 10'], s: 'bad'},
          {id: 'l', k: 'text', x: 380, y: 102, t: 'Testwerte: 0 | 1 | 10 | 11  und 3, 4, 5 für die Anordnung', w: 10, h: 10, mw: 700},
        ], edges: []}],
          ['tip', 'Der Wert 5 prüft den Gang: Reihe 1 hat 6 freie Plätze, aber der Gang teilt sie in 2 und 3. Ein Programm, das den Gang übersieht, würde fälschlich [1, 0] liefern.']],
        see: ['eua-testfaelle']},
    ],
  });

  // ---------- Handlungsschritt 2 ----------
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Suchen, Rekursion und Laufzeit (25 Punkte)',
    ctx: [['h3', 'Anlage: Sortierte Ticketnummern einer Vorstellung (Feld nummern, 11 Einträge)'],
      ['table', ['Index', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['Nummer', '1203', '1250', '1311', '1478', '1502', '1666', '1701', '1844', '1920', '2005', '2113']]]],
    tasks: [
      {pts: 6, rows: 10, topic: 'Binärsuche', op: '**Schreiben** heißt: den Algorithmus vollständig als Code oder Pseudocode angeben.',
        hint: 'Teilen Sie den Suchbereich immer in der Mitte. Ist der Wert in der Mitte zu klein, suchen Sie rechts weiter, sonst links. Hören Sie auf, wenn links größer als rechts ist.',
        words: [['sortiert', 'In einer Reihenfolge, hier von klein nach groß.'], ['Suchbereich', 'Der Teil des Feldes, in dem der Wert noch sein kann.']],
        q: 'Schreiben Sie die Funktion **sucheTicket(nummern, ziel)** mit einer **Schleife** (ohne Rekursion). Sie gibt den Index von ziel zurück oder -1, wenn ziel nicht im sortierten Feld ist. Sie dürfen die Binärsuche nutzen.',
        a: [['codes', [['pseudo', `funktion sucheTicket(nummern, ziel)
    links = 0
    rechts = länge(nummern) - 1
    solange links <= rechts
        mitte = (links + rechts) DIV 2
        wenn nummern[mitte] = ziel dann
            rückgabe mitte
        sonst wenn nummern[mitte] < ziel dann
            links = mitte + 1
        sonst
            rechts = mitte - 1
        ende wenn
    ende solange
    rückgabe -1
ende funktion`], ['java', `static int sucheTicket(int[] nummern, int ziel) {
    int links = 0, rechts = nummern.length - 1;
    while (links <= rechts) {
        int mitte = (links + rechts) / 2;
        if (nummern[mitte] == ziel) return mitte;
        if (nummern[mitte] < ziel) links = mitte + 1;
        else rechts = mitte - 1;
    }
    return -1;
}`], ['python', `def suche_ticket(nummern, ziel):
    links, rechts = 0, len(nummern) - 1
    while links <= rechts:
        mitte = (links + rechts) // 2
        if nummern[mitte] == ziel:
            return mitte
        if nummern[mitte] < ziel:
            links = mitte + 1
        else:
            rechts = mitte - 1
    return -1`]]],
          'Bewertung: Startwerte 1 P, Schleifenbedingung links <= rechts 1 P, Mitte 1 P, Treffer 1 P, beide Grenzen richtig (mitte + 1 / mitte - 1) 2 P. Hinweis: Wer mit nur "mitte" statt "mitte +/- 1" arbeitet, bekommt eine Endlosschleife.'],
        see: ['eua-suchen', 'eua-onotation']},
      {pts: 4, rows: 8, topic: 'Trace Binärsuche', op: '**Durchführen** heißt: wie der Computer Schritt für Schritt rechnen und alles aufschreiben.',
        hint: 'Rechnen Sie in jeder Zeile links, rechts und mitte aus. Vergleichen Sie nummern[mitte] mit dem Ziel. Dann ändern Sie links oder rechts.',
        q: 'Führen Sie **sucheTicket(nummern, 1500)** für das Feld aus der Anlage aus. Notieren Sie je Durchlauf links, rechts, mitte, nummern[mitte] und die Entscheidung. Wie viele Vergleiche werden gemacht? Welcher Wert wird zurückgegeben?',
        a: [['table', ['Durchlauf', 'links', 'rechts', 'mitte', 'nummern[mitte]', 'Entscheidung'], [['1', '0', '10', '5', '1666', '1666 > 1500: rechts = 4'], ['2', '0', '4', '2', '1311', '1311 < 1500: links = 3'], ['3', '3', '4', '3', '1478', '1478 < 1500: links = 4'], ['4', '4', '4', '4', '1502', '1502 > 1500: rechts = 3'], ['Ende', '4', '3', '-', '-', 'links > rechts: Abbruch']]],
          '**4 Durchläufe** (je ein Vergleich mit dem Ziel), Rückgabe **-1** (1500 ist nicht enthalten). Tabelle 3 P, Ergebnis 1 P.'],
        sol: [['walk', {t: 'Bereich schrumpft', steps: [
          {t: '**Durchlauf 1:** Bereich 0 bis 10 (11 Elemente). Mitte 5 mit 1666 ist größer als 1500. Die rechte Hälfte fällt weg.', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['Wert', '1203', '1250', '1311', '1478', '1502', '**1666**', '1701', '1844', '1920', '2005', '2113']]]]},
          {t: '**Durchlauf 2 und 3:** Bereich 0 bis 4, Mitte 2 (1311 < 1500), dann Bereich 3 bis 4, Mitte 3 (1478 < 1500). Rest: nur Index 4.', b: [['table', ['Index', '3', '4'], [['Wert', '1478', '1502']]]]},
          {t: '**Durchlauf 4:** Bereich 4 bis 4, Mitte 4 mit 1502 > 1500. rechts wird 3. Jetzt ist links (4) größer als rechts (3). Der Bereich ist leer. Rückgabe **-1**.', b: [['diagram', AP2.dg.flow(['0..10 (11)', '0..4 (5)', '3..4 (2)', '4..4 (1)', 'leer: -1'], {w: 760, h: 100, styles: ['accent', 'accent', 'accent', 'accent', 'bad'], cap: 'Der Suchbereich halbiert sich in jedem Schritt'})]]},
        ]}]],
        see: ['eua-suchen', 'eua-debugging']},
      {pts: 5, rows: 8, topic: 'Rekursion: Fakultät', op: '**Implementieren** heißt: Code schreiben, der funktioniert. **Erläutern** heißt: sagen, was passiert, und warum.',
        hint: 'Fakultät: n! = n mal (n-1)!. Der einfachste Fall ist 1! = 1 (und 0! = 1). Das ist die Abbruchbedingung.',
        words: [['Fakultät', 'n! = 1 mal 2 mal ... mal n. Beispiel: 4! = 24.'], ['Stapel (Stack)', 'Speicher für laufende Funktionsaufrufe.']],
        q: 'Auf wie viele Arten können n Gäste in einer Reihe mit n Plätzen sitzen? Das sind n! Möglichkeiten. a) Schreiben Sie eine **rekursive** Funktion **fakultaet(n)** für n >= 0. b) Zeigen Sie die Aufrufe und Rückgaben für **fakultaet(4)**. c) Was passiert, wenn die Abbruchbedingung fehlt?',
        a: [['codes', [['pseudo', `funktion fakultaet(n)
    wenn n <= 1 dann
        rückgabe 1                       // Abbruch: 0! = 1! = 1
    ende wenn
    rückgabe n * fakultaet(n - 1)        // rekursiver Aufruf
ende funktion`], ['java', `static long fakultaet(int n) {
    if (n <= 1) return 1;
    return n * fakultaet(n - 1);
}`], ['python', `def fakultaet(n):
    if n <= 1:
        return 1
    return n * fakultaet(n - 1)`]]],
          'a) Abbruchbedingung 1 P, rekursiver Aufruf mit kleinerem Wert 1 P. b) fakultaet(4) ruft fakultaet(3), dann (2), dann (1) auf. Rückgaben: 1, 2 x 1 = 2, 3 x 2 = 6, 4 x 6 = **24**. (2 P) c) Ohne Abbruch ruft sich die Funktion unendlich oft auf. Der Stapel läuft voll: **StackOverflowError**. (1 P)'],
        sol: [['table', ['Aufruf', 'rechnet', 'Rückgabe'], [['fakultaet(4)', '4 x fakultaet(3)', '4 x 6 = **24**'], ['fakultaet(3)', '3 x fakultaet(2)', '3 x 2 = 6'], ['fakultaet(2)', '2 x fakultaet(1)', '2 x 1 = 2'], ['fakultaet(1)', 'Abbruch', '1']]],
          ['diagram', AP2.dg.flow(['fakultaet(4)', 'fakultaet(3)', 'fakultaet(2)', 'fakultaet(1) = 1'], {w: 760, h: 100, styles: ['accent', 'accent', 'accent', 'ok'], cap: 'Die Aufrufe bauen sich auf (Stapel); danach werden die Ergebnisse von rechts nach links zurückgegeben: 1, 2, 6, 24'})]],
        see: ['eua-rekursion']},
      {pts: 5, rows: 9, topic: 'Rekursion: Aufrufbaum Fibonacci', op: '**Zeichnen** heißt: eine Skizze mit allen Teilen. **Beurteilen** heißt: eine Aussage machen und begründen.',
        hint: 'fib(n) ruft zwei andere Aufrufe auf: fib(n-1) und fib(n-2). Zeichnen Sie jeden Aufruf als Kasten. Zählen Sie dann die Kästen.',
        words: [['Fibonacci-Zahlen', 'Folge 0, 1, 1, 2, 3, 5, 8 ... Jede Zahl ist die Summe der zwei davor.'], ['Memoisierung', 'Ergebnisse merken, damit man sie nicht mehr neu berechnet.']],
        ctx: [['code', 'pseudo', `funktion fib(n)
    wenn n < 2 dann
        rückgabe n
    ende wenn
    rückgabe fib(n - 1) + fib(n - 2)
ende funktion`]],
        q: 'a) Zeichnen Sie den **Aufrufbaum** für **fib(4)**. Geben Sie das Ergebnis an. b) Wie viele Aufrufe insgesamt gibt es, und wie oft wird fib(2) berechnet? c) Beurteilen Sie die Laufzeit und nennen Sie eine Verbesserung.',
        a: ['a) Der Baum hat 9 Knoten. **fib(4) = 3.** Ebenen: fib(4) → fib(3), fib(2). fib(3) → fib(2), fib(1). Beide fib(2) → fib(1), fib(0). (3 P)', 'b) **9 Aufrufe**. fib(2) wird **2-mal** berechnet, fib(1) 3-mal, fib(0) 2-mal. (1 P)', 'c) Es gibt **doppelte Arbeit**: Die Zahl der Aufrufe wächst fast mit Faktor 1,6 je Schritt (exponentiell). Für fib(31) sind es schon etwa **2,7 Millionen Aufrufe** (2 x fib(32) - 1 für n = 31: 2.692.537). Verbesserung: **Memoisierung** (Ergebnisse in einem Feld merken) oder eine **Schleife**; dann O(n). (1 P)'],
        sol: [['diagram', AP2.dg.tree({t: 'fib(4) = 3', c: [{t: 'fib(3) = 2', c: [{t: 'fib(2) = 1', c: [{t: 'fib(1) = 1'}, {t: 'fib(0) = 0'}]}, {t: 'fib(1) = 1'}]}, {t: 'fib(2) = 1', c: [{t: 'fib(1) = 1'}, {t: 'fib(0) = 0'}]}]}, {cap: 'Aufrufbaum von fib(4): fib(2) steht zweimal im Baum und wird doppelt berechnet', k: 'box', w: 110, h: 34})],
          ['table', ['Aufruf', 'Anzahl im Baum'], [['fib(4)', '1'], ['fib(3)', '1'], ['fib(2)', '**2**'], ['fib(1)', '3'], ['fib(0)', '2'], ['**Summe**', '**9**']]],
          ['codes', [['java', `static long fibMemo(int n, long[] merk) {
    if (n < 2) return n;
    if (merk[n] != 0) return merk[n];          // schon berechnet
    merk[n] = fibMemo(n - 1, merk) + fibMemo(n - 2, merk);
    return merk[n];
}`], ['python', `def fib_iter(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`]]]],
        see: ['eua-rekursion', 'eua-onotation']},
      {pts: 5, topic: 'Laufzeit', op: '**Berechnen** heißt: mit Zahlen und Rechenweg. **Zuordnen** heißt: zu jeder Zahl die passende Laufzeitklasse nennen.',
        hint: 'Doppelte Schleife über n Elemente: etwa n mal n Schritte. Binärsuche: Wie oft kann man n halbieren, bis 1 übrig ist? Das ist der Logarithmus zur Basis 2.',
        words: [['O-Notation', 'Beschreibt, wie stark die Zeit wächst, wenn die Datenmenge n wächst.'], ['quadratisch', 'Verdoppelt man n, dauert es vier Mal so lang.']],
        q: 'Zur Kontrolle auf doppelte Ticketnummern vergleicht ein Programm jedes Ticket mit jedem anderen Ticket (zwei verschachtelte Schleifen, jedes Paar einmal). In einer Vorstellung gibt es **n = 2.000** Tickets. a) Wie viele Vergleiche sind das? Welche Laufzeitklasse hat das Verfahren? b) Nennen Sie ein Verfahren mit Laufzeit O(n). c) Eine Binärsuche arbeitet auf **1.048.576** (2 hoch 20) sortierten Nummern. Wie viele Schritte braucht sie höchstens? Vergleichen Sie mit der linearen Suche.',
        a: ['a) Zahl der Paare: n x (n - 1) / 2 = 2.000 x 1.999 / 2 = **1.999.000** Vergleiche. Laufzeitklasse **O(n²)** (quadratisch). (2 P)', 'b) Mit einer **Hashmenge (HashSet)**: Jede Nummer wird einmal nachgeschaut und eingefügt. Eine Nummer, die schon in der Menge ist, ist doppelt. Laufzeit **O(n)**. (1 P)', 'c) Die Binärsuche halbiert den Bereich in jedem Schritt: log2(1.048.576) = **20** Schritte (höchstens 21 Vergleiche mit Startschritt). Die lineare Suche braucht im schlechtesten Fall **1.048.576** Vergleiche, also etwa 50.000-mal mehr. (2 P)'],
        sol: [['table', ['Klasse', 'Beispiel', 'bei n = 1.048.576'], [['O(1)', 'Zugriff auf feld[i]', '1'], ['O(log n)', 'Binärsuche', '20'], ['O(n)', 'lineare Suche', '1.048.576'], ['O(n²)', 'jedes Paar vergleichen', 'etwa 1,1 x 10^12']]],
          ['chart', {kind: 'bar', w: 640, h: 240, labels: ['n = 8', 'n = 1.024', 'n = 1.048.576'], series: [{n: 'Binärsuche (Schritte)', d: [3, 10, 20], k: 'accent'}], vals: true, ymax: 24, cap: 'Binärsuche wächst nur langsam: Aus dem 1.024-fachen Datenvolumen werden nur 10 Schritte mehr.'}]],
        see: ['eua-onotation', 'eua-hash']},
    ],
  });

  // ---------- Handlungsschritt 3 ----------
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Objektorientiert programmieren, Hash und Prüfziffer (25 Punkte)',
    ctx: [['h3', 'Anlage: Klassendiagramm Ticketverkauf'], ['diagram', {w: 900, h: 440, keep: 740, cap: 'Sitz, Vorstellung und Ticket; ErmaessigtesTicket erbt von Ticket', nodes: [
      {id: 'si', k: 'cls', x: 130, y: 100, w: 240, t: {name: 'Sitz', attrs: ['- reihe: int', '- platz: int', '- belegt: boolean'], ops: ['+ Sitz(reihe: int, platz: int)', '+ getReihe(): int', '+ getPlatz(): int', '+ isBelegt(): boolean', '+ reservieren(): boolean']}},
      {id: 'vo', k: 'cls', x: 130, y: 330, w: 250, t: {name: 'Vorstellung', attrs: ['- film: String', '- sitze: Sitz[][]'], ops: ['+ Vorstellung(film: String, reihen: int, plaetze: int)', '+ freiePlaetze(): int', '+ reserviere(reihe: int, platz: int): boolean']}},
      {id: 'ti', k: 'cls', x: 520, y: 100, w: 250, t: {name: 'Ticket', attrs: ['- ticketNr: int', '- sitz: Sitz', '# grundpreis: double'], ops: ['+ Ticket(nr: int, sitz: Sitz, grundpreis: double)', '+ berechnePreis(): double']}},
      {id: 'er', k: 'cls', x: 520, y: 330, w: 270, t: {name: 'ErmaessigtesTicket', attrs: ['- prozent: int'], ops: ['+ ErmaessigtesTicket(nr, sitz, grundpreis, prozent)', '+ berechnePreis(): double']}},
    ], edges: [{a: 'vo', b: 'si', sa: 'diaf', ea: 'none', ta: '1', tb: '*'}, {a: 'ti', b: 'si', ea: 'none', ta: '*', tb: '1'}, {a: 'er', b: 'ti', ea: 'tri'}]}]],
    tasks: [
      {pts: 5, rows: 10, topic: 'Kapselung und Konstruktor', op: '**Implementieren** heißt: Code schreiben. **Erläutern** heißt: sagen, was es ist, und warum.',
        hint: 'Attribute werden private. Von außen gibt es nur Methoden. Der Konstruktor prüft die Werte und wirft bei falschen Werten eine Ausnahme.',
        words: [['private', 'Nur Code innerhalb der Klasse darf darauf zugreifen.'], ['Getter', 'Methode, die den Wert eines privaten Attributs zurückgibt.'], ['Ausnahme (Exception)', 'Ein Fehler, den das Programm meldet.']],
        q: 'a) Erläutern Sie den Begriff **Kapselung** am Beispiel der Klasse Sitz. b) Implementieren Sie die Klasse **Sitz** nach der Anlage in Java oder Python. Der Konstruktor soll bei negativer Reihe oder negativem Platz eine **IllegalArgumentException** (Python: ValueError) werfen. Ein neuer Sitz ist nicht belegt. Die Methode **reservieren()** belegt den Sitz und gibt true zurück. Ist er schon belegt, gibt sie false zurück.',
        a: ['a) Die Attribute sind **private**. Nur die Methoden der Klasse ändern sie. So kann niemand von außen den Sitz auf einen ungültigen Wert setzen. Die Klasse sichert ihre Regeln selbst: Ein Sitz kann nicht zweimal reserviert werden. (1 P)', ['codes', [['java', `public class Sitz {
    private final int reihe;
    private final int platz;
    private boolean belegt;

    public Sitz(int reihe, int platz) {
        if (reihe < 0 || platz < 0) {
            throw new IllegalArgumentException("Reihe und Platz müssen >= 0 sein");
        }
        this.reihe = reihe;
        this.platz = platz;
        this.belegt = false;
    }
    public int getReihe() { return reihe; }
    public int getPlatz() { return platz; }
    public boolean isBelegt() { return belegt; }

    public boolean reservieren() {
        if (belegt) return false;
        belegt = true;
        return true;
    }
}`], ['python', `class Sitz:
    def __init__(self, reihe, platz):
        if reihe < 0 or platz < 0:
            raise ValueError("Reihe und Platz müssen >= 0 sein")
        self._reihe = reihe
        self._platz = platz
        self._belegt = False

    def reservieren(self):
        if self._belegt:
            return False
        self._belegt = True
        return True`]]],
          'Bewertung b): private Attribute 1 P, Konstruktor setzt Werte 1 P, Prüfung mit Ausnahme 1 P, Getter 0,5 P, reservieren() mit beiden Rückgaben 1,5 P.'],
        see: ['eua-oop', 'eua-konstruktor', 'eua-exceptions']},
      {pts: 6, rows: 10, topic: 'Methoden implementieren', op: '**Implementieren** heißt: die Methode vollständig schreiben. Beachten Sie die Grenzen des Feldes.',
        hint: 'Prüfen Sie zuerst, ob reihe und platz im Feld liegen. Das Feld sitze ist Sitz[][]: sitze[reihe][platz] ist ein Objekt. Fragen Sie das Objekt, nicht das Feld.',
        words: [['Index außerhalb', 'Der Index ist kleiner als 0 oder größer als der letzte Index. Das führt zu einem Fehler.'], ['Objekt', 'Ein Sitz in Ihrem Programm, erzeugt mit new Sitz(...).']],
        q: 'Implementieren Sie in der Klasse **Vorstellung** (Anlage) a) die Methode **freiePlaetze()**, die die Anzahl der nicht belegten Sitze liefert, und b) die Methode **reserviere(reihe, platz)**. Liegt die Position außerhalb des Saals, soll false zurückgegeben werden, sonst das Ergebnis von sitz.reservieren(). Der Konstruktor, der das Feld sitze füllt, ist schon vorhanden.',
        a: [['codes', [['java', `public int freiePlaetze() {
    int anzahl = 0;
    for (Sitz[] reihe : sitze) {
        for (Sitz s : reihe) {
            if (!s.isBelegt()) anzahl++;
        }
    }
    return anzahl;
}

public boolean reserviere(int reihe, int platz) {
    if (reihe < 0 || reihe >= sitze.length) return false;
    if (platz < 0 || platz >= sitze[reihe].length) return false;
    return sitze[reihe][platz].reservieren();
}`], ['python', `def freie_plaetze(self):
    anzahl = 0
    for reihe in self._sitze:
        for s in reihe:
            if not s.ist_belegt():
                anzahl += 1
    return anzahl

def reserviere(self, reihe, platz):
    if reihe < 0 or reihe >= len(self._sitze):
        return False
    if platz < 0 or platz >= len(self._sitze[reihe]):
        return False
    return self._sitze[reihe][platz].reservieren()`]]],
          'Bewertung a): zwei Schleifen 1 P, Zähler richtig 1 P, Rückgabe 1 P. b): Prüfung der Reihe 1 P, Prüfung des Platzes 1 P, Delegation an reservieren() 1 P.'],
        sol: [['warn', 'Typischer Fehler: die Prüfung der Reihe und des Platzes vergessen oder in einem Ausdruck vermischen. Dann gibt sitze[reihe].length bei ungültiger Reihe einen Fehler. Prüfen Sie **erst die Reihe**, dann den Platz.'],
          ['tip', 'Das ist gute Arbeitsteilung: Die Vorstellung prüft die Position. Der Sitz selbst entscheidet, ob er schon belegt ist (Kapselung).']],
        see: ['eua-oop', 'eua-umlcode']},
      {pts: 4, topic: 'Vererbung und Polymorphie', op: '**Implementieren** heißt: Code schreiben. **Berechnen** heißt: mit Rechenweg.',
        hint: 'Die Unterklasse ruft mit super(...) den Konstruktor der Oberklasse. Sie überschreibt berechnePreis(). Eine Liste vom Typ Ticket darf auch ErmaessigtesTicket enthalten.',
        words: [['überschreiben (Override)', 'Die Unterklasse ersetzt eine Methode der Oberklasse.'], ['Polymorphie', 'Dieselbe Methode, aber je nach Objekt anderes Verhalten.'], ['super', 'Verweis auf die Oberklasse.']],
        q: 'a) Implementieren Sie die Klasse **ErmaessigtesTicket** (Anlage). berechnePreis() liefert den Grundpreis abzüglich des Prozentsatzes. b) Eine Liste enthält drei Tickets: ein Ticket (Grundpreis 11,50), ein ErmaessigtesTicket (11,50; 20 %) und ein ErmaessigtesTicket (9,00; 50 %). Berechnen Sie die Summe aller Preise und schreiben Sie die Schleife dazu.',
        a: [['codes', [['java', `public class ErmaessigtesTicket extends Ticket {
    private final int prozent;

    public ErmaessigtesTicket(int nr, Sitz sitz, double grundpreis, int prozent) {
        super(nr, sitz, grundpreis);          // Oberklasse
        this.prozent = prozent;
    }
    @Override
    public double berechnePreis() {
        return grundpreis * (100 - prozent) / 100.0;
    }
}

double summe = 0;
for (Ticket t : tickets) {
    summe += t.berechnePreis();        // Polymorphie: jedes Objekt rechnet selbst
}`]]],
          'a) extends und super(...) 1 P, Attribut prozent 0,5 P, @Override mit richtiger Formel 1,5 P. b) 11,50 + 11,50 x 0,8 + 9,00 x 0,5 = 11,50 + 9,20 + 4,50 = **25,20 Euro** (1 P).'],
        sol: [['table', ['Ticket', 'Klasse', 'Rechnung', 'Preis'], [['1', 'Ticket', '11,50', '11,50'], ['2', 'ErmaessigtesTicket', '11,50 x (100 - 20) / 100', '9,20'], ['3', 'ErmaessigtesTicket', '9,00 x (100 - 50) / 100', '4,50'], ['', '', '**Summe**', '**25,20**']]]],
        see: ['eua-oop', 'eua-paradigmen']},
      {pts: 6, rows: 8, topic: 'Hashtabelle', op: '**Eintragen** heißt: Schritt für Schritt die Tabelle füllen. **Beurteilen** heißt: eine Aussage machen und begründen.',
        hint: 'Position = Kundennummer MOD 7 (Rest der Division). Ist die Position belegt, nehmen Sie die nächste freie (lineare Sondierung). Nach Position 6 kommt wieder 0.',
        words: [['MOD', 'Rest einer Division. 15 MOD 7 = 1.'], ['lineare Sondierung', 'Bei Kollision den nächsten freien Platz suchen.'], ['Ladefaktor', 'Anteil der belegten Plätze: belegt geteilt durch Größe.']],
        q: 'Kundennummern werden in einer Hashtabelle mit **7 Plätzen** (Index 0 bis 6) gespeichert. Hashfunktion: **h(k) = k MOD 7**. Bei einer Kollision wird der nächste freie Platz genommen (lineare Sondierung). Einfügereihenfolge: **1204, 3355, 2096, 1617, 4410, 5251**. a) Tragen Sie die Zahlen in die Tabelle ein. b) Wie viele Plätze werden angeschaut, um **5251** zu finden? c) Beurteilen Sie den Zustand der Tabelle (Ladefaktor) und nennen Sie eine Verbesserung.',
        a: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['Inhalt', '1204', '1617', '3355', '2096', '4410', '5251', '(frei)']]],
          'a) Rechnung: 1204 MOD 7 = 0; 3355 MOD 7 = 2; 2096 MOD 7 = 3; 1617 MOD 7 = 0 (belegt) → 1; 4410 MOD 7 = 0 (belegt), 1, 2, 3 belegt → 4; 5251 MOD 7 = 1 (belegt), 2, 3, 4 belegt → 5. (3 P)', 'b) h(5251) = 1. Geprüft werden die Plätze 1, 2, 3, 4, 5: **5 Zugriffe**. Bei einer perfekten Verteilung wäre es 1 Zugriff. (1 P)', 'c) Ladefaktor = 6 / 7 = **0,86**. Die Tabelle ist fast voll. Es gibt viele Kollisionen und lange Suchwege (Clusterbildung). Verbesserung: **größere Tabelle** (Ladefaktor unter etwa 0,7, zum Beispiel 11 oder 13 Plätze, Primzahl) oder Verkettung mit Listen. (2 P)'],
        sol: [['walk', {t: 'Einfügen mit Kollisionen', steps: [
          {t: '**1204, 3355, 2096:** Kein Konflikt. 1204 MOD 7 = 0, 3355 MOD 7 = 2, 2096 MOD 7 = 3.', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['Inhalt', '1204', '', '3355', '2096', '', '', '']]]]},
          {t: '**1617:** h = 0, Platz 0 ist belegt. Nächster Platz 1 ist frei. **2 Zugriffe.**', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['Inhalt', '1204', '**1617**', '3355', '2096', '', '', '']]]]},
          {t: '**4410:** h = 0. Plätze 0, 1, 2, 3 sind belegt. Platz 4 ist frei. **5 Zugriffe.**', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['Inhalt', '1204', '1617', '3355', '2096', '**4410**', '', '']]]]},
          {t: '**5251:** h = 1. Plätze 1, 2, 3, 4 sind belegt. Platz 5 ist frei. So entsteht ein **Cluster** von Platz 0 bis 5.', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['Inhalt', '1204', '1617', '3355', '2096', '4410', '**5251**', '(frei)']]]]},
        ]}]],
        see: ['eua-hash']},
      {pts: 4, topic: 'Prüfziffer', op: '**Berechnen** heißt: mit Rechenweg. **Prüfen** heißt: das Verfahren anwenden und ein Urteil sagen.',
        hint: 'Multiplizieren Sie die Ziffern von links mit den Gewichten 3, 1, 3, 1, 3. Addieren Sie. Prüfziffer = (10 - Summe MOD 10) MOD 10.',
        words: [['Gewicht', 'Eine Zahl, mit der man jede Ziffer malnimmt.'], ['Tippfehler', 'Eine Ziffer ist falsch oder zwei Ziffern sind vertauscht.']],
        q: 'Ein Ticketcode besteht aus 5 Ziffern und einer Prüfziffer. Verfahren: Die Ziffern werden von links mit den Gewichten **3, 1, 3, 1, 3** multipliziert und addiert. Prüfziffer = (10 - (Summe MOD 10)) MOD 10. a) Berechnen Sie die Prüfziffer für **83417**. b) Ist der Code **725416** gültig? c) Zeigen Sie, dass das Verfahren die Vertauschung der ersten beiden Ziffern bei **83417** (also 38417) nicht erkennt, und erklären Sie warum.',
        a: ['a) 8 x 3 = 24; 3 x 1 = 3; 4 x 3 = 12; 1 x 1 = 1; 7 x 3 = 21. Summe: **61**. 61 MOD 10 = 1. Prüfziffer = 10 - 1 = **9**. Code: 834179. (1 P)', 'b) 7 x 3 = 21; 2 x 1 = 2; 5 x 3 = 15; 4 x 1 = 4; 1 x 3 = 3. Summe **45**, MOD 10 = 5, Prüfziffer = **5**. Der Code endet auf 6: **ungültig**. (1 P)', 'c) 38417: 3 x 3 = 9; 8 x 1 = 8; 12; 1; 21. Summe = **51**, MOD 10 = 1, Prüfziffer **9**, also dieselbe wie bei 83417. Grund: Die Vertauschung ändert die Summe um (8-3) x 3 - (8-3) x 1 = 10, und 10 ist durch 10 teilbar. Allgemein werden Vertauschungen von Ziffern erkannt, die sich **nicht um 5 unterscheiden**. (2 P)'],
        sol: [['table', ['Ziffer', '8', '3', '4', '1', '7', 'Summe'], [['Gewicht', '3', '1', '3', '1', '3', ''], ['Produkt', '24', '3', '12', '1', '21', '**61**']]], ['tip', 'Eine Prüfziffer erkennt viele Tippfehler, aber nicht alle. Sie ist keine Sicherheitsfunktion. Gegen Manipulation hilft eine Signatur oder ein HMAC.']],
        see: ['eua-pruefziffer']},
    ],
  });

  // ---------- Handlungsschritt 4 ----------
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Datenbankabfragen mit SQL (25 Punkte)',
    ctx: [['h3', 'Anlage: Tabellen der KinoTix-Datenbank mit Beispieldaten'],
      ['row', [['table', ['kunde: kundennr', 'name', 'ort'], [['1', 'Ilka Brandt', 'Freiburg'], ['2', 'Tarek Aydin', 'Offenburg'], ['3', 'Sofie Maurer', 'Freiburg'], ['4', 'Jonas Pfeiffer', 'Lörrach']]],
        ['table', ['film: filmnr', 'titel', 'fsk'], [['10', 'Der letzte Leuchtturm', '12'], ['11', 'Sternenjäger', '6'], ['12', 'Schattenspiel', '16'], ['13', 'Kleiner Bär', '0']]]]],
      ['table', ['vorstellung: vnr', 'filmnr (FK)', 'saalnr', 'beginn', 'preis'], [['100', '10', '1', '2026-03-06 20:00', '11.50'], ['101', '11', '2', '2026-03-06 17:00', '9.00'], ['102', '12', '1', '2026-03-07 22:15', '12.00'], ['103', '10', '3', '2026-03-08 18:30', '11.50'], ['104', '13', '2', '2026-03-08 14:00', '7.50']]],
      ['table', ['ticket: ticketnr', 'vnr (FK)', 'kundennr (FK)', 'reihe', 'platz', 'preis'], [['5001', '100', '1', '3', '11', '11.50'], ['5002', '100', '1', '3', '12', '11.50'], ['5003', '101', '2', '7', '4', '9.00'], ['5004', '102', '3', '10', '8', '12.00'], ['5005', '102', '3', '10', '9', '12.00'], ['5006', '102', '4', '10', '10', '12.00'], ['5007', '103', '1', '6', '5', '11.50'], ['5008', '100', '2', '4', '7', '11.50']]]],
    tasks: [
      {pts: 5, rows: 8, topic: 'JOIN über drei Tabellen', op: '**Schreiben** heißt: die vollständige Abfrage angeben. **Angeben** heißt: das Ergebnis als Tabelle aufschreiben.',
        hint: 'Verbinden Sie ticket mit vorstellung (über vnr) und vorstellung mit film (über filmnr). Der Filter kommt in WHERE. Das Datum prüfen Sie mit einem Bereich.',
        words: [['JOIN', 'Verbindet Zeilen aus zwei Tabellen über einen gemeinsamen Wert.'], ['Alias', 'Ein kurzer Name für eine Tabelle, zum Beispiel t für ticket.'], ['sortieren', 'ORDER BY ... ASC (aufsteigend) oder DESC (absteigend).']],
        q: 'Das Kassenpersonal braucht eine Liste aller Tickets für Vorstellungen am **06.03.2026** mit einer **FSK von mindestens 12**. Ausgegeben werden Filmtitel, Beginn, Reihe und Platz, sortiert nach Beginn, Reihe, Platz. a) Schreiben Sie die SQL-Abfrage. b) Geben Sie das Ergebnis für die Beispieldaten an.',
        a: [['code', 'sql', `SELECT f.titel, v.beginn, t.reihe, t.platz
FROM ticket t
JOIN vorstellung v ON t.vnr = v.vnr
JOIN film f ON v.filmnr = f.filmnr
WHERE f.fsk >= 12
  AND v.beginn >= '2026-03-06' AND v.beginn < '2026-03-07'
ORDER BY v.beginn, t.reihe, t.platz;`],
          ['table', ['titel', 'beginn', 'reihe', 'platz'], [['Der letzte Leuchtturm', '2026-03-06 20:00', '3', '11'], ['Der letzte Leuchtturm', '2026-03-06 20:00', '3', '12'], ['Der letzte Leuchtturm', '2026-03-06 20:00', '4', '7']]],
          'Bewertung: beide JOINs mit richtiger Bedingung 2 P, Spalten 0,5 P, FSK-Filter 0,5 P, Datumsfilter 1 P, ORDER BY 0,5 P, Ergebnis 0,5 P. Die Vorstellung 101 (Sternenjäger, FSK 6) fällt wegen der FSK weg.'],
        sol: [['diagram', AP2.dg.flow(['ticket', 'JOIN vorstellung (vnr)', 'JOIN film (filmnr)', 'WHERE FSK und Datum', 'ORDER BY'], {w: 880, h: 100, styles: ['soft', 'accent', 'accent', 'gold', 'ok'], bw: 150, cap: 'So arbeitet die Abfrage: erst verbinden, dann filtern, dann sortieren'})],
          ['warn', 'Falle: „beginn = 2026-03-06“ findet nichts, weil beginn auch eine Uhrzeit enthält. Nehmen Sie einen Bereich (>= Tag und < nächster Tag).']],
        see: ['eua-sqljoin', 'eua-sqlselect']},
      {pts: 5, rows: 8, topic: 'GROUP BY und HAVING', op: '**Schreiben** heißt: die vollständige Abfrage angeben.',
        hint: 'Zählen und Summieren geht mit COUNT und SUM. Gruppiert wird mit GROUP BY. Eine Bedingung auf eine Gruppe steht in HAVING, nicht in WHERE.',
        words: [['Aggregatfunktion', 'Rechnet über mehrere Zeilen: COUNT, SUM, AVG, MIN, MAX.'], ['HAVING', 'Filter für Gruppen, nach GROUP BY.']],
        q: 'Die Leitung möchte den **Umsatz je Film**: Titel, Anzahl verkaufter Tickets und Summe der Ticketpreise. Nur Filme mit **mindestens 3 verkauften Tickets** sollen erscheinen. Sortieren Sie nach Umsatz absteigend. a) Schreiben Sie die Abfrage. b) Geben Sie das Ergebnis für die Beispieldaten an. c) Warum steht die Bedingung nicht in WHERE?',
        a: [['code', 'sql', `SELECT f.titel, COUNT(*) AS anzahl, SUM(t.preis) AS umsatz
FROM ticket t
JOIN vorstellung v ON t.vnr = v.vnr
JOIN film f ON v.filmnr = f.filmnr
GROUP BY f.filmnr, f.titel
HAVING COUNT(*) >= 3
ORDER BY umsatz DESC;`],
          ['table', ['titel', 'anzahl', 'umsatz'], [['Der letzte Leuchtturm', '4', '46.00'], ['Schattenspiel', '3', '36.00']]],
          'b) Leuchtturm: Tickets 5001, 5002, 5008 (Vorstellung 100) und 5007 (Vorstellung 103) = 4 x 11,50 = 46,00. Schattenspiel: 3 x 12,00 = 36,00. Sternenjäger hat nur 1 Ticket (9,00), Kleiner Bär keines. c) **WHERE** filtert einzelne Zeilen **vor** dem Gruppieren. COUNT(*) gibt es erst **nach** dem Gruppieren. Deshalb braucht man **HAVING**. Bewertung: JOINs 1 P, GROUP BY 1 P, HAVING 1 P, ORDER BY 0,5 P, Ergebnis 1 P, Begründung 0,5 P.'],
        sol: [['chart', {kind: 'bar', w: 640, h: 240, labels: ['Leuchtturm', 'Schattenspiel', 'Sternenjäger', 'Kleiner Bär'], series: [{n: 'Umsatz (Euro)', d: [46, 36, 9, 0], k: 'accent'}], vals: true, ymax: 50, cap: 'Umsatz je Film. Nur die ersten beiden haben mindestens 3 Tickets und bleiben nach HAVING übrig.'}]],
        see: ['eua-sqlgroup']},
      {pts: 5, rows: 8, topic: 'Subselect', op: '**Schreiben** heißt: die Abfrage vollständig angeben. **Erläutern** heißt: sagen, was die Abfrage macht.',
        hint: 'Die innere Abfrage liefert eine Liste oder einen Wert. Die äußere Abfrage nutzt sie mit IN, NOT IN oder einem Vergleich.',
        words: [['NOT IN', 'Der Wert kommt in der Liste nicht vor.'], ['Durchschnitt', 'AVG: Summe geteilt durch Anzahl.']],
        q: 'a) Geben Sie alle **Filme aus, für die noch kein Ticket verkauft wurde**. Nutzen Sie einen Subselect. b) Geben Sie alle Tickets aus (ticketnr, preis), deren Preis **über dem Durchschnittspreis aller Tickets** liegt. Wie viele Zeilen enthält das Ergebnis für die Beispieldaten?',
        a: [['code', 'sql', `-- a) Filme ohne Ticket
SELECT titel
FROM film
WHERE filmnr NOT IN (SELECT v.filmnr
                     FROM vorstellung v
                     JOIN ticket t ON t.vnr = v.vnr);

-- b) Tickets über dem Durchschnittspreis
SELECT ticketnr, preis
FROM ticket
WHERE preis > (SELECT AVG(preis) FROM ticket);`],
          'a) Ergebnis: **Kleiner Bär** (Vorstellung 104 hat keine Tickets). (2 P) b) Durchschnitt: Summe 91,00 / 8 Tickets = **11,375**. Tickets darüber: 5001, 5002, 5007, 5008 (je 11,50) und 5004, 5005, 5006 (je 12,00) = **7 Zeilen**. Nur 5003 (9,00) fehlt. (3 P)'],
        sol: [['table', ['Schritt', 'innere Abfrage', 'äußere Abfrage'], [['a)', 'Filmnummern mit mindestens einem Ticket: 10, 11, 12', 'Filme, deren Nummer nicht darin vorkommt: 13'], ['b)', 'AVG(preis) = 11,375', 'alle Tickets mit preis > 11,375']]],
          ['warn', 'Bei NOT IN gilt: Enthält die innere Liste einen NULL-Wert, liefert die Abfrage keine Zeile. Alternative ohne dieses Problem: NOT EXISTS oder LEFT JOIN ... WHERE ... IS NULL.']],
        see: ['eua-sqlselect', 'eua-sqljoin']},
      {pts: 5, rows: 9, topic: 'DDL: Tabelle anlegen', op: '**Erstellen** heißt: die vollständige Anweisung schreiben.',
        hint: 'Denken Sie an: Datentypen, Primärschlüssel, zwei Fremdschlüssel, NOT NULL, Preis nicht negativ und die Regel gegen Doppelbuchung.',
        words: [['DDL', 'Data Definition Language: Befehle, die Tabellen bauen (CREATE, ALTER, DROP).'], ['CHECK', 'Regel für einen Wert, zum Beispiel preis >= 0.'], ['REFERENCES', 'Verweis auf die Tabelle des Fremdschlüssels.']],
        q: 'Erstellen Sie die Tabelle **ticket** mit den Spalten der Anlage. Berücksichtigen Sie: Primärschlüssel, Fremdschlüssel zu vorstellung und kunde, alle Spalten Pflicht, der Preis darf nicht negativ sein, und derselbe Sitz darf in derselben Vorstellung **nicht zweimal** verkauft werden.',
        a: [['code', 'sql', `CREATE TABLE ticket (
    ticketnr  INT           PRIMARY KEY,
    vnr       INT           NOT NULL,
    kundennr  INT           NOT NULL,
    reihe     INT           NOT NULL,
    platz     INT           NOT NULL,
    preis     DECIMAL(5,2)  NOT NULL CHECK (preis >= 0),
    FOREIGN KEY (vnr)      REFERENCES vorstellung (vnr),
    FOREIGN KEY (kundennr) REFERENCES kunde (kundennr),
    UNIQUE (vnr, reihe, platz)
);`],
          'Bewertung: sinnvolle Datentypen 1 P, Primärschlüssel 1 P, beide Fremdschlüssel 1 P, NOT NULL und CHECK 1 P, UNIQUE über (vnr, reihe, platz) 1 P.'],
        sol: [['tip', 'Die Tabellen vorstellung und kunde müssen **vorher** existieren, sonst gibt es beim Anlegen der Fremdschlüssel einen Fehler. Die Reihenfolge ist: erst die „Eins“-Seite, dann die „Viele“-Seite.']],
        see: ['eua-sqldml', 'eua-sqler']},
      {pts: 5, rows: 8, topic: 'DML: ändern und löschen', op: '**Schreiben** heißt: die Anweisungen in der richtigen Reihenfolge angeben. **Begründen** heißt: mit „weil“ erklären.',
        hint: 'Ohne WHERE wirkt UPDATE oder DELETE auf ALLE Zeilen. Wegen des Fremdschlüssels löschen Sie zuerst die Tickets, dann die Vorstellung.',
        words: [['DML', 'Data Manipulation Language: INSERT, UPDATE, DELETE.'], ['Reihenfolge', 'Welche Anweisung zuerst kommt.']],
        q: 'a) Die Vorstellung **103** fällt aus. Löschen Sie die Vorstellung und alle zugehörigen Tickets. Begründen Sie die Reihenfolge. b) Alle Vorstellungen in **Saal 2** werden um **0,50 Euro** teurer. Schreiben Sie die Anweisung. c) Ein neuer Kunde **5, Mia Kern, Emmendingen** wird angelegt. Schreiben Sie die Anweisung. d) Was geschieht bei b), wenn die WHERE-Klausel fehlt?',
        a: [['code', 'sql', `-- a) erst die Kindzeilen, dann die Elternzeile
DELETE FROM ticket       WHERE vnr = 103;
DELETE FROM vorstellung  WHERE vnr = 103;

-- b)
UPDATE vorstellung SET preis = preis + 0.50 WHERE saalnr = 2;

-- c)
INSERT INTO kunde (kundennr, name, ort) VALUES (5, 'Mia Kern', 'Emmendingen');`],
          'a) 2 P: Zuerst ticket, dann vorstellung, weil ticket.vnr ein **Fremdschlüssel** auf vorstellung ist. Würde man die Vorstellung zuerst löschen, verletzte das die Referenz und die Datenbank meldet einen Fehler (außer bei ON DELETE CASCADE). b) 1 P. c) 1 P. d) 1 P: Ohne WHERE werden **alle** Vorstellungen aller Säle um 0,50 Euro teurer.'],
        sol: [['table', ['Anweisung', 'betroffene Zeilen (Beispieldaten)'], [['DELETE FROM ticket WHERE vnr = 103', '1 (Ticket 5007)'], ['DELETE FROM vorstellung WHERE vnr = 103', '1'], ['UPDATE vorstellung ... WHERE saalnr = 2', '2 (Vorstellungen 101 und 104)']]]],
        see: ['eua-sqldml']},
    ],
  });
  AP2.exam.end(ID);
})();
