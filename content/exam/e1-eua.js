// Probeprüfung 1, Entwicklung und Umsetzung von Algorithmen: FitNova GmbH, FitNova Connect.
(function () {
  const ID = 'exam1-eua';
  const BES = [2, 0, 0, 0, 1, 3, 24, 61, 48, 35, 22, 19, 40, 52, 31, 27, 44, 83, 96, 71, 38, 20, 9, 4];
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 1 (Fitness)', t: 'Algorithmen: FitNova Connect', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.eua,
    hint: 'Realistischer Aufgabensatz: 4 Handlungsschritte zu je 25 Punkten, 90 Minuten. Du darfst in Pseudocode oder in einer Sprache deiner Wahl schreiben. Die Musterlösung zeigt mehrere Sprachen und Schritt-für-Schritt-Wege.',
    intro: [
      ['p', 'Sie arbeiten bei der **AppWerk Software GmbH** und entwickeln das System **FitNova Connect** für die **FitNova GmbH** (14 Fitnessstudios, 38.000 Mitglieder). Das System speichert Mitglieder, Kurse und Buchungen. Die Zutrittsdaten werden stündlich ausgewertet.'],
      ['kv', [['Felder (Arrays)', 'Indizes beginnen bei **0**. länge(feld) liefert die Anzahl der Elemente.'], ['Pseudocode', 'DIV = ganzzahlige Division, MOD = Rest. Schleifen: für, solange. Rückgabe: rückgabe.'], ['Sprachen', 'Antworten in Pseudocode oder Java, C#, Python sind gleich viel wert.']]],
    ],
    words: [['Array / Feld', 'Liste von Werten, die man über eine Nummer (Index) erreicht'], ['Index', 'Nummer eines Elements im Feld. Sie beginnt bei 0.'], ['Schreibtischtest', 'Programm von Hand durchgehen und alle Werte in eine Tabelle schreiben'], ['Schleife', 'Befehle, die sich wiederholen'], ['Rekursion', 'Eine Funktion ruft sich selbst auf'],
      ['Abbruchbedingung', 'Bedingung, bei der die Rekursion endet'], ['Komplexität', 'Wie stark wächst die Laufzeit, wenn die Datenmenge wächst?'], ['O-Notation', 'Schreibweise für Komplexität, zum Beispiel O(n)'], ['Klasse', 'Vorlage für Objekte mit Attributen und Methoden'], ['Vererbung', 'Eine Unterklasse übernimmt die Eigenschaften der Oberklasse'],
      ['Schnittstelle (Interface)', 'Liste von Methoden, die eine Klasse anbieten muss'], ['abstrakt', 'Nicht fertig. Man kann davon kein Objekt bauen.'], ['Polymorphie', 'Derselbe Aufruf tut je nach Objekt etwas anderes'], ['JOIN', 'SQL-Befehl, der Tabellen über einen Schlüssel verbindet'],
      ['Aggregatfunktion', 'COUNT, SUM, AVG: rechnet über viele Zeilen'], ['Äquivalenzklasse', 'Gruppe von Eingaben, die sich gleich verhalten'], ['Grenzwert', 'Wert am Rand einer Klasse, zum Beispiel 17 und 18'], ['Unit-Test', 'Automatischer Test für eine kleine Einheit, zum Beispiel eine Methode'], ['Black-Box / White-Box', 'Test ohne / mit Blick auf den Quelltext']],
  });

  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Daten auswerten, suchen und sortieren (25 Punkte)',
    ctx: [['h3', 'Anlage 1: Check-ins je Stunde (Feld besuche, Index = Stunde 0 bis 23)'],
      ['table', ['Stunde', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'], [['besuche', ...BES.slice(0, 12).map(String)]]],
      ['table', ['Stunde', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], [['besuche', ...BES.slice(12).map(String)]]]],
    tasks: [
      {pts: 7, rows: 12, topic: 'Algorithmus entwickeln', q: 'Entwickeln Sie die Funktion **analysiereTag(besuche, grenze)**. Sie gibt ein Feld **[spitze, anzahl]** zurück: **spitze** ist die Stunde mit den meisten Check-ins (bei Gleichstand die frühere). **anzahl** ist die Zahl der Stunden, in denen die Check-ins **mindestens grenze** erreichen. Geben Sie außerdem das Ergebnis für die Anlage 1 und grenze = 50 an.',
        op: '**Entwickeln** heißt: einen eigenen Algorithmus schreiben. Er muss für jedes Feld funktionieren, nicht nur für das Beispiel.', hint: 'Eine Schleife über alle Stunden reicht. Merke dir den Index des bisher größten Werts. Zähle nebenbei die Stunden über der Grenze.',
        words: [['Gleichstand', 'Zwei Werte sind gleich groß'], ['mindestens', 'Gleich oder größer (>=)']],
        a: ['Kernidee: **eine** Schleife über alle Stunden. Für die Spitze wird der Index des größten Werts gemerkt. Das Zeichen **>** (nicht >=) sorgt dafür, dass bei Gleichstand die frühere Stunde bleibt.',
          ['codes', [['pseudo', `funktion analysiereTag(besuche, grenze)
    spitze = 0
    anzahl = 0
    für h = 0 bis länge(besuche) - 1
        wenn besuche[h] > besuche[spitze] dann
            spitze = h
        ende wenn
        wenn besuche[h] >= grenze dann
            anzahl = anzahl + 1
        ende wenn
    ende für
    rückgabe [spitze, anzahl]
ende funktion`], ['java', `static int[] analysiereTag(int[] besuche, int grenze) {
    int spitze = 0, anzahl = 0;
    for (int h = 0; h < besuche.length; h++) {
        if (besuche[h] > besuche[spitze]) spitze = h;
        if (besuche[h] >= grenze) anzahl++;
    }
    return new int[]{spitze, anzahl};
}`], ['python', `def analysiere_tag(besuche, grenze):
    spitze = 0
    anzahl = 0
    for h, wert in enumerate(besuche):
        if wert > besuche[spitze]:
            spitze = h
        if wert >= grenze:
            anzahl += 1
    return [spitze, anzahl]`]]],
          'Ergebnis für Anlage 1, grenze = 50: Spitze bei Stunde **18** (96 Check-ins). Werte ab 50: 61 (7 Uhr), 52 (13 Uhr), 83 (17 Uhr), 96 (18 Uhr), 71 (19 Uhr): **anzahl = 5**. Rückgabe **[18, 5]**.',
          'Bewertung: Startwerte 1 P, Schleife über alle Stunden 1 P, Spitze richtig (> und Index) 2 P, Zählen mit >= 1 P, Rückgabe 1 P, Ergebnis 1 P.'],
        sol: [['diagram', AP2.dg.nsd([['act', 'spitze = 0; anzahl = 0'], ['for', 'für h = 0 bis länge(besuche) - 1', [['if', 'besuche[h] > besuche[spitze] ?', [['act', 'spitze = h']], [['act', '(nichts)']]], ['if', 'besuche[h] >= grenze ?', [['act', 'anzahl = anzahl + 1']], [['act', '(nichts)']]]]], ['act', 'rückgabe [spitze, anzahl]']], {w: 640, cap: 'Dieselbe Lösung als Struktogramm (Nassi-Shneiderman)'})],
          ['chart', {kind: 'bar', w: 760, h: 240, labels: BES.map((v, i) => String(i)), series: [{n: 'Check-ins', d: BES, k: 'accent'}], ymax: 100, cap: 'Check-ins je Stunde: Die Spitze liegt bei 18 Uhr (96). Fünf Stunden liegen bei 50 oder mehr.'}],
          ['warn', 'Typischer Fehler: spitze auf den **Wert** setzen statt auf den **Index**. Dann kennt man die Stunde nicht. Auch häufig: das Feld mit 0 als Startwert für die Spitze vergleichen. Das geht nur, wenn alle Werte nicht negativ sind.']],
        see: ['eua-algoexam', 'eua-pseudocode', 'ps-struktogramm']},
      {pts: 6, rows: 8, topic: 'Schreibtischtest', q: 'Führen Sie für **a = [10, 14, 20, 15, 18, 25, 22]** einen Schreibtischtest der Funktion **trend(a)** durch. Notieren Sie nach jedem Durchlauf i, k, s und die Ausgabe. Geben Sie den Rückgabewert an und beschreiben Sie, was die Funktion ermittelt.',
        ctx: [['code', 'pseudo', `funktion trend(a)
    k = 0
    s = 0
    für i = 1 bis länge(a) - 1
        wenn a[i] > a[i - 1] dann
            k = k + 1
            s = s + (a[i] - a[i - 1])
        sonst
            k = 0
        ende wenn
        wenn k = 2 dann
            ausgabe "Trend bei " + i
        ende wenn
    ende für
    rückgabe s
ende funktion`]],
        op: '**Durchführen** heißt: das Programm Schritt für Schritt von Hand ausführen und die Werte aufschreiben. **Beschreiben** heißt: den Zweck in eigenen Worten sagen.', hint: 'Mache eine Zeile pro i. Prüfe zuerst, ob a[i] größer ist als a[i-1]. Prüfe dann, ob k gleich 2 ist.',
        words: [['Rückgabewert', 'Der Wert, den die Funktion am Ende zurückgibt'], ['ausgabe', 'Befehl, der Text auf dem Bildschirm zeigt']],
        a: [['table', ['i', 'a[i-1]', 'a[i]', 'Anstieg?', 'k', 's', 'Ausgabe'], [['Start', '-', '-', '-', '0', '0', '-'], ['1', '10', '14', 'ja', '1', '4', '-'], ['2', '14', '20', 'ja', '**2**', '10', '**Trend bei 2**'], ['3', '20', '15', 'nein', '0', '10', '-'], ['4', '15', '18', 'ja', '1', '13', '-'], ['5', '18', '25', 'ja', '**2**', '20', '**Trend bei 5**'], ['6', '25', '22', 'nein', '0', '20', '-']]],
          'Rückgabewert: **20**. Die Funktion **addiert alle Anstiege** (s = Summe der Zunahmen von einem Wert zum nächsten) und meldet jedes Mal einen **Trend**, wenn der Wert **zweimal hintereinander** gestiegen ist (k = 2).', 'Bewertung: Tabelle 4 P, Rückgabe 1 P, Zweck (Summe der Anstiege und Trendmeldung) 1 P.'],
        sol: [['walk', {t: 'Schreibtischtest trend(a)', steps: [
          {t: '**Start:** k = 0, s = 0. Das Feld hat 7 Werte, die Schleife läuft von i = 1 bis 6.', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['a', '10', '14', '20', '15', '18', '25', '22']]]]},
          {t: '**i = 1 und 2:** 14 > 10 und 20 > 14. k wird 1 und dann 2. s wird 4 und dann 10. Bei k = 2 erscheint **Trend bei 2**.'},
          {t: '**i = 3:** 15 ist nicht größer als 20. k wird auf 0 **zurückgesetzt**. s bleibt 10.'},
          {t: '**i = 4, 5, 6:** 18 > 15 (k = 1, s = 13), 25 > 18 (k = 2, s = 20, **Trend bei 5**), 22 < 25 (k = 0). Rückgabe **20**.', b: [['out', `Trend bei 2
Trend bei 5`]]},
        ]}]],
        see: ['eua-algoexam', 'eua-debugging']},
      {pts: 5, rows: 8, topic: 'Binäre Suche', q: 'Die Mitgliedsnummern liegen **aufsteigend sortiert** im Feld ids. a) Führen Sie einen Schreibtischtest von **binSucheIter** für ziel = 1744 durch (links, rechts, mitte je Durchlauf). b) Welchen Wert gibt die Funktion für ziel = 1500 zurück? c) Wie viele Vergleiche sind bei 38.000 Mitgliedern höchstens nötig?',
        ctx: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [['ids', '1042', '1107', '1215', '1380', '1466', '1523', '1690', '1744', '1801', '1956', '2010']]],
          ['code', 'pseudo', `funktion binSucheIter(ids, ziel)
    links = 0
    rechts = länge(ids) - 1
    solange links <= rechts
        mitte = (links + rechts) DIV 2
        wenn ids[mitte] = ziel dann
            rückgabe mitte
        sonst wenn ids[mitte] < ziel dann
            links = mitte + 1
        sonst
            rechts = mitte - 1
        ende wenn
    ende solange
    rückgabe -1
ende funktion`]],
        op: '**Durchführen** heißt: von Hand ausführen. Bei c) **berechnen** Sie mit einer Zehnerpotenz oder Zweierpotenz.', hint: 'In jedem Durchlauf halbiert sich der Bereich. Bei c) frage: Welche Zweierpotenz ist größer als 38.000?',
        words: [['sortiert', 'In einer Reihenfolge, zum Beispiel von klein nach groß'], ['halbieren', 'In zwei gleich große Teile teilen']],
        a: [['table', ['Durchlauf', 'links', 'rechts', 'mitte', 'ids[mitte]', 'Entscheidung'], [['1', '0', '10', '5', '1523', '< 1744, also links = 6'], ['2', '6', '10', '8', '1801', '> 1744, also rechts = 7'], ['3', '6', '7', '6', '1690', '< 1744, also links = 7'], ['4', '7', '7', '7', '**1744**', 'gefunden, Rückgabe **7**']]],
          'b) ziel = 1500: Durchlauf 1 mitte 5 (1523 > 1500, rechts = 4), Durchlauf 2 mitte 2 (1215 < 1500, links = 3), Durchlauf 3 mitte 3 (1380 < 1500, links = 4), Durchlauf 4 mitte 4 (1466 < 1500, links = 5). Dann ist links > rechts. Rückgabe **-1**.', 'c) 2¹⁵ = 32.768 < 38.000 ≤ 2¹⁶ = 65.536. Höchstens **16 Vergleiche** (log₂(38.000) ≈ 15,2, aufgerundet). Eine lineare Suche braucht bis zu 38.000 Vergleiche.', 'Bewertung: a) 3 P, b) 1 P, c) 1 P.'],
        sol: [['diagram', AP2.dg.flow(['0..10 (11)', '6..10 (5)', '6..7 (2)', '7..7 (1)', 'Treffer: 7'], {w: 760, h: 100, styles: ['accent', 'accent', 'accent', 'accent', 'ok'], cap: 'Suche nach 1744: Der Bereich schrumpft bei jedem Schritt'})],
          ['merk', 'Binäre Suche geht nur in **sortierten** Daten. Laufzeit **O(log n)**. Lineare Suche: **O(n)**.']],
        see: ['eua-suchen', 'eua-onotation']},
      {pts: 7, rows: 10, topic: 'Sortieren und Komplexität', q: 'a) Sortieren Sie **[29, 12, 35, 8, 21, 17]** mit **Selectionsort** aufsteigend. Zeigen Sie das Feld nach jedem Durchlauf der äußeren Schleife. b) Wie viele Vergleiche und wie viele Tauschvorgänge gibt es? c) Geben Sie die Laufzeit von Selectionsort und von Bubblesort (mit Abbruch, wenn nichts getauscht wurde) im besten und im schlechtesten Fall in O-Notation an. d) Welches Verfahren ist für 38.000 Mitglieder besser geeignet?',
        ctx: [['code', 'pseudo', `funktion selectionSort(a)
    für i = 0 bis länge(a) - 2
        min = i
        für j = i + 1 bis länge(a) - 1
            wenn a[j] < a[min] dann
                min = j
            ende wenn
        ende für
        wenn min ≠ i dann
            tausche a[i], a[min]
        ende wenn
    ende für
ende funktion`]],
        op: '**Sortieren Sie** heißt: das Verfahren Schritt für Schritt zeigen. **Angeben** heißt: nur das Ergebnis nennen.', hint: 'Selectionsort sucht in jedem Durchlauf das kleinste Element im Rest und tauscht es an die Stelle i. Zähle die Vergleiche in der inneren Schleife.',
        words: [['Tausch', 'Zwei Werte tauschen den Platz'], ['bester / schlechtester Fall', 'Der günstigste / ungünstigste Zustand der Eingabe']],
        a: [['table', ['i', 'Minimum bei', 'Tausch?', 'Feld danach'], [['Start', '-', '-', '[29, 12, 35, 8, 21, 17]'], ['0', 'Index 3 (8)', 'ja, mit 29', '[8, 12, 35, 29, 21, 17]'], ['1', 'Index 1 (12)', 'nein', '[8, 12, 35, 29, 21, 17]'], ['2', 'Index 5 (17)', 'ja, mit 35', '[8, 12, 17, 29, 21, 35]'], ['3', 'Index 4 (21)', 'ja, mit 29', '[8, 12, 17, 21, 29, 35]'], ['4', 'Index 4 (29)', 'nein', '[8, 12, 17, 21, 29, 35]']]],
          'b) Vergleiche: 5 + 4 + 3 + 2 + 1 = **15** (immer n(n-1)/2). Tauschvorgänge: **3** (bei i = 0, 2, 3).', 'c) **Selectionsort:** immer **O(n²)** (bester und schlechtester Fall gleich). **Bubblesort mit Abbruch:** bester Fall (schon sortiert) **O(n)**, schlechtester Fall (umgekehrt sortiert) **O(n²)**.', 'd) Beide sind bei n = 38.000 zu langsam: n² ≈ 1,4 Milliarden Schritte. Besser sind **Mergesort/Quicksort** mit O(n log n) ≈ 38.000 x 15 ≈ 0,6 Millionen Schritte. Die Datenbank sortiert mit ORDER BY ebenso.', 'Bewertung: a) 3 P, b) 1 P, c) 2 P (je 0,5 P), d) 1 P.'],
        sol: [['chart', {kind: 'bar', w: 640, h: 220, labels: ['Start', 'nach i=0', 'nach i=2', 'nach i=3'], series: [{n: 'Vertauschte Plätze', d: [0, 2, 4, 6], k: 'accent'}], vals: true, ymax: 6, cap: 'Zahl der Plätze, die sich gegenüber dem Start geändert haben'}],
          ['table', ['n', 'n² Schritte', 'n x log₂(n) Schritte'], [['1.000', '1.000.000', 'ca. 10.000'], ['38.000', 'ca. 1.444.000.000', 'ca. 577.000']]]],
        see: ['eua-sortieren', 'eua-onotation']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Rekursion und objektorientiert umsetzen (25 Punkte)',
    tasks: [
      {pts: 5, rows: 8, topic: 'Rekursion lesen', q: 'Gegeben ist **f(n)**. a) Führen Sie f(4837) aus und zeigen Sie alle Aufrufe. b) Beschreiben Sie, was f berechnet. c) Nennen Sie die Abbruchbedingung und erklären Sie, was ohne sie passiert.',
        ctx: [['code', 'pseudo', `funktion f(n)
    wenn n < 10 dann
        rückgabe n
    ende wenn
    rückgabe (n MOD 10) + f(n DIV 10)
ende funktion`]],
        op: '**Ausführen** heißt: jeden Aufruf aufschreiben. **Erklären** heißt: sagen, was passiert und warum.', hint: 'n MOD 10 ist die letzte Ziffer. n DIV 10 schneidet die letzte Ziffer ab.',
        words: [['MOD', 'Rest einer Division, zum Beispiel 4837 MOD 10 = 7'], ['DIV', 'Ganzzahl-Division ohne Rest, zum Beispiel 4837 DIV 10 = 483'], ['Stack Overflow', 'Fehler: zu viele Aufrufe, der Speicher für Aufrufe ist voll']],
        a: ['a) f(4837) = 7 + f(483) = 7 + (3 + f(48)) = 7 + 3 + (8 + f(4)) = 7 + 3 + 8 + 4 = **22**.', 'b) f berechnet die **Quersumme** (Summe der Ziffern) einer Zahl.', 'c) Abbruchbedingung: **n < 10**, dann ist n eine einzige Ziffer und wird zurückgegeben. Ohne sie ruft sich f immer weiter auf (n wird 0, 0 DIV 10 = 0, ...). Das endet erst mit einem **Stack Overflow**.', 'Bewertung: a) 2 P, b) 1 P, c) 2 P.'],
        sol: [['diagram', AP2.dg.flow(['f(4837)', 'f(483)', 'f(48)', 'f(4) = 4', '8 + 4 = 12', '3 + 12 = 15', '7 + 15 = 22'], {w: 920, h: 100, styles: ['plain', 'plain', 'plain', 'accent', 'ok', 'ok', 'ok'], bw: 110, cap: 'Links: die Aufrufe gehen in die Tiefe. Rechts: die Ergebnisse laufen zurück.'})]],
        see: ['eua-rekursion']},
      {pts: 3, rows: 7, topic: 'Rekursion schreiben', q: 'Schreiben Sie eine **rekursive** Funktion **summeAb(feld, i)**, die die Summe aller Elemente von Index i bis zum Ende des Felds zurückgibt. Aufruf für das ganze Feld: summeAb(feld, 0).',
        op: '**Schreiben** heißt: Code oder Pseudocode angeben. Eine Schleife ist hier nicht erlaubt.', hint: 'Fall 1: Der Index liegt hinter dem Ende. Dann ist die Summe 0. Fall 2: Das aktuelle Element plus die Summe ab dem nächsten Index.',
        a: [['codes', [['pseudo', `funktion summeAb(feld, i)
    wenn i >= länge(feld) dann
        rückgabe 0                              // Abbruch: nichts mehr da
    ende wenn
    rückgabe feld[i] + summeAb(feld, i + 1)
ende funktion`], ['java', `static int summeAb(int[] feld, int i) {
    if (i >= feld.length) return 0;
    return feld[i] + summeAb(feld, i + 1);
}`], ['python', `def summe_ab(feld, i):
    if i >= len(feld):
        return 0
    return feld[i] + summe_ab(feld, i + 1)`]]],
          'Bewertung: Abbruchbedingung 1 P, Rechenschritt feld[i] + ... 1 P, Aufruf mit i + 1 1 P.'],
        see: ['eua-rekursion']},
      {pts: 8, rows: 14, topic: 'Klassen implementieren', q: 'Implementieren Sie die Klassen **Angebot**, **Personaltraining** und das Interface **Rabattfaehig** gemäß Klassendiagramm in einer Sprache Ihrer Wahl. Ein Personaltraining erhält ab **10 Stunden** 15 % Rabatt. Der Preis ist grundpreis x stunden x (100 - rabatt) / 100.',
        ctx: [['h3', 'Anlage 2: Klassendiagramm Angebote'], ['diagram', {w: 860, h: 380, keep: 700, cap: 'Angebote: abstrakte Klasse Angebot, zwei Unterklassen, Interface Rabattfaehig (gestrichelt = realisiert)', nodes: [
          {id: 'an', k: 'cls', x: 320, y: 80, w: 320, s: 'accent', t: {name: ['«abstract»', 'Angebot'], attrs: ['- titel: String', '- grundpreis: double'], ops: ['+ Angebot(titel: String, grundpreis: double)', '+ getTitel(): String', '+ getGrundpreis(): double', '+ berechnePreis(): double {abstract}']}},
          {id: 'rf', k: 'cls', x: 730, y: 80, w: 220, t: {name: ['«interface»', 'Rabattfaehig'], ops: ['+ getRabatt(): int']}},
          {id: 'gk', k: 'cls', x: 130, y: 300, w: 240, t: {name: 'GruppenKurs', attrs: ['- dauerMinuten: int'], ops: ['+ berechnePreis(): double']}},
          {id: 'pt', k: 'cls', x: 530, y: 300, w: 320, t: {name: 'Personaltraining', attrs: ['- stunden: int'], ops: ['+ berechnePreis(): double', '+ getRabatt(): int']}},
        ], edges: [{a: 'gk', b: 'an', ea: 'tri', via: [[130, 215], [320, 215]]}, {a: 'pt', b: 'an', ea: 'tri', via: [[530, 215], [320, 215]]}, {a: 'pt', b: 'rf', k: 'dash', ea: 'tri', via: [[730, 300]]}]}]],
        op: '**Implementieren** heißt: lauffähigen Code schreiben. Das Diagramm sagt dir Namen, Typen und Sichtbarkeit.', hint: 'Abstrakte Klasse: Konstruktor, Getter, abstrakte Methode. Unterklasse: super(...) im Konstruktor. Interface: implements und die Methode getRabatt().',
        words: [['super(...)', 'Ruft den Konstruktor der Oberklasse auf'], ['implements', 'Die Klasse erfüllt die Schnittstelle'], ['@Override', 'Hinweis: Die Methode überschreibt eine der Oberklasse']],
        a: [['codes', [['java', `public interface Rabattfaehig {
    int getRabatt();                         // Prozent
}

public abstract class Angebot {
    private String titel;
    private double grundpreis;

    public Angebot(String titel, double grundpreis) {
        this.titel = titel;
        this.grundpreis = grundpreis;
    }
    public String getTitel() { return titel; }
    public double getGrundpreis() { return grundpreis; }
    public abstract double berechnePreis();
}

public class Personaltraining extends Angebot implements Rabattfaehig {
    private int stunden;

    public Personaltraining(String titel, double grundpreis, int stunden) {
        super(titel, grundpreis);
        this.stunden = stunden;
    }
    @Override
    public int getRabatt() {
        return (stunden >= 10) ? 15 : 0;
    }
    @Override
    public double berechnePreis() {
        return getGrundpreis() * stunden * (100 - getRabatt()) / 100;
    }
}`], ['python', `from abc import ABC, abstractmethod

class Rabattfaehig(ABC):
    @abstractmethod
    def get_rabatt(self): ...

class Angebot(ABC):
    def __init__(self, titel, grundpreis):
        self.__titel = titel
        self.__grundpreis = grundpreis
    def get_titel(self):
        return self.__titel
    def get_grundpreis(self):
        return self.__grundpreis
    @abstractmethod
    def berechne_preis(self): ...

class Personaltraining(Angebot, Rabattfaehig):
    def __init__(self, titel, grundpreis, stunden):
        super().__init__(titel, grundpreis)
        self.__stunden = stunden
    def get_rabatt(self):
        return 15 if self.__stunden >= 10 else 0
    def berechne_preis(self):
        return self.get_grundpreis() * self.__stunden * (100 - self.get_rabatt()) / 100`]]],
          'Bewertung: Interface 1 P, abstrakte Klasse mit abstrakter Methode 2 P, private Attribute, Konstruktor, Getter 2 P, Unterklasse mit super und implements 1 P, getRabatt 1 P, Preisformel 1 P. Die Klasse GruppenKurs ist nicht verlangt.'],
        see: ['eua-oop', 'eua-saeulen', 'eua-interface', 'eua-konstruktor']},
      {pts: 5, rows: 9, topic: 'Methode mit instanceof', q: 'Implementieren Sie die Methode **auswerten(List<Angebot> korb)** der Klasse Kasse. Sie gibt die **Gesamtsumme** aller Preise zurück. Zusätzlich gibt sie auf der Konsole aus, **wie viele Angebote Rabatt bekommen haben** (Angebote, die Rabattfaehig sind **und** einen Rabatt größer 0 haben).',
        op: '**Implementieren** heißt: lauffähigen Code schreiben. Nutze nur Methoden, die im Klassendiagramm stehen.', hint: 'Eine Schleife über die Liste. Mit instanceof prüfst du, ob das Objekt das Interface hat. Dann brauchst du eine Umwandlung (Cast).',
        words: [['instanceof', 'Prüft, ob ein Objekt zu einer Klasse oder einem Interface gehört'], ['Cast', 'Ein Objekt als anderen Typ betrachten']],
        a: [['codes', [['java', `public double auswerten(List<Angebot> korb) {
    double summe = 0;
    int mitRabatt = 0;
    for (Angebot a : korb) {
        summe += a.berechnePreis();
        if (a instanceof Rabattfaehig r && r.getRabatt() > 0) {
            mitRabatt++;
        }
    }
    System.out.println("Mit Rabatt: " + mitRabatt);
    return summe;
}`], ['python', `def auswerten(korb):
    summe = 0
    mit_rabatt = 0
    for a in korb:
        summe += a.berechne_preis()
        if isinstance(a, Rabattfaehig) and a.get_rabatt() > 0:
            mit_rabatt += 1
    print("Mit Rabatt:", mit_rabatt)
    return summe`]]],
          'Bewertung: Summenvariable und Zähler 1 P, Schleife 1 P, Polymorphe Preisberechnung 1 P, instanceof mit Rabatt-Prüfung 1 P, Ausgabe und Rückgabe 1 P.'],
        see: ['eua-oop', 'eua-interface']},
      {pts: 4, rows: 7, topic: 'Polymorphie', q: 'a) Welche Ausgabe erzeugt das Programm? b) Nennen Sie zwei Unterschiede zwischen einer abstrakten Klasse und einem Interface.',
        ctx: [['code', 'java', `List<Angebot> korb = new ArrayList<>();
korb.add(new GruppenKurs("Yoga", 8.0, 60));        // Preis = Grundpreis
korb.add(new Personaltraining("PT 12h", 60.0, 12));
korb.add(new Personaltraining("PT 5h", 60.0, 5));
double summe = 0;
for (Angebot a : korb) {
    System.out.println(a.getTitel() + ": " + a.berechnePreis());
    summe += a.berechnePreis();
}
System.out.println("Summe: " + summe);`]],
        op: '**Nennen** heißt: kurz aufzählen. Bei a) rechne jeden Preis einzeln aus.', hint: 'Personaltraining PT 12h hat 15 % Rabatt (12 ist mindestens 10). PT 5h hat keinen Rabatt.',
        a: [['out', `Yoga: 8.0
PT 12h: 612.0
PT 5h: 300.0
Summe: 920.0`], 'Rechnung: PT 12h: 60 x 12 x 85 / 100 = 612,0. PT 5h: 60 x 5 x 100 / 100 = 300,0. Summe: 8 + 612 + 300 = **920,0**.', 'b) **Abstrakte Klasse:** kann Attribute, Konstruktor und fertige Methoden haben; eine Klasse erbt nur von **einer**. **Interface:** beschreibt nur das, was angeboten werden muss (keine Zustände); eine Klasse kann **viele** Interfaces umsetzen. Ein Interface passt zu einer Fähigkeit („rabattfähig“), eine abstrakte Klasse zu einer „ist-ein“-Beziehung.', 'Bewertung: a) 2 P (Ausgabe und Summe), b) 2 P.'],
        sol: [['seq', {w: 720, actors: ['Schleife', 'Yoga (GruppenKurs)', 'PT 12h', 'PT 5h'], cap: 'Derselbe Aufruf berechnePreis(), drei Implementierungen', steps: [
          [0, 1, 'berechnePreis()', 's'], [1, 0, '8.0', 'r'], [0, 2, 'berechnePreis()', 's'], [2, 0, '60 x 12 x 85 / 100 = 612.0', 'r'], [0, 3, 'berechnePreis()', 's'], [3, 0, '300.0', 'r'], ['note', 0, 'Summe 920.0']]}]],
        see: ['eua-saeulen', 'eua-interface']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Datenbankabfragen erstellen (25 Punkte)',
    ctx: [['h3', 'Anlage 3: Datenbankmodell FitNova (mit Beispieldaten)'],
      ['diagram', {w: 860, h: 270, keep: 700, cap: 'Tabellen und Beziehungen (Krähenfuß = viele)', nodes: [
        {id: 'st', k: 'cls', x: 110, y: 80, w: 170, t: {name: 'studio', attrs: ['PK studio_id', 'ort']}},
        {id: 'mi', k: 'cls', x: 340, y: 90, w: 200, t: {name: 'mitglied', attrs: ['PK mitglied_id', 'name', 'FK studio_id', 'eintritt (DATE)', 'tarif']}},
        {id: 'bu', k: 'cls', x: 610, y: 90, w: 220, t: {name: 'buchung', attrs: ['PK buchung_id', 'FK mitglied_id', 'FK kurs_id', 'gebucht_am (DATE)', 'status']}},
        {id: 'ku', k: 'cls', x: 610, y: 220, w: 220, t: {name: 'kurs', attrs: ['PK kurs_id', 'titel', 'FK studio_id', 'max_plaetze', 'preis']}},
      ], edges: [{a: 'mi', b: 'st', sa: 'many', ea: 'one'}, {a: 'bu', b: 'mi', sa: 'many', ea: 'one'}, {a: 'bu', b: 'ku', sa: 'many', ea: 'one'}, {a: 'ku', b: 'st', sa: 'many', ea: 'one', via: [[390, 250], [110, 250]]}]}],
      ['row', [['table', ['studio_id', 'ort'], [['1', 'Hannover'], ['2', 'Celle'], ['3', 'Hildesheim']]], ['table', ['kurs_id', 'titel', 'studio_id', 'max_plaetze', 'preis'], [['10', 'Yoga', '1', '12', '0.00'], ['11', 'Spinning', '1', '15', '0.00'], ['12', 'Boxen', '2', '10', '5.00'], ['13', 'Pilates', '3', '8', '0.00'], ['14', 'HIIT', '1', '20', '3.50']]]]],
      ['table', ['mitglied_id', 'name', 'studio_id', 'eintritt', 'tarif'], [['101', 'Lena Roth', '1', '2023-04-01', 'Premium'], ['102', 'Jonas Beck', '2', '2024-01-15', 'Basis'], ['103', 'Aylin Kaya', '1', '2022-09-10', 'Premium'], ['104', 'Tom Weber', '3', '2025-02-01', 'Basis'], ['105', 'Mira Sommer', '1', '2025-06-20', 'Basis'], ['106', 'Ali Demir', '2', '2021-11-05', 'Premium'], ['107', 'Eva Lang', '3', '2026-01-10', 'Basis']]],
      ['table', ['buchung_id', 'mitglied_id', 'kurs_id', 'gebucht_am', 'status'], [['1', '101', '10', '2026-03-01', 'aktiv'], ['2', '101', '11', '2026-03-02', 'aktiv'], ['3', '102', '12', '2026-03-02', 'aktiv'], ['4', '103', '10', '2026-03-03', 'aktiv'], ['5', '103', '11', '2026-03-03', 'storniert'], ['6', '103', '14', '2026-03-04', 'aktiv'], ['7', '104', '13', '2026-03-04', 'aktiv'], ['8', '106', '12', '2026-03-05', 'aktiv'], ['9', '106', '14', '2026-03-05', 'aktiv'], ['10', '105', '10', '2026-03-06', 'aktiv'], ['11', '101', '14', '2026-03-06', 'aktiv']]]],
    tasks: [
      {pts: 3, topic: 'SELECT', q: 'Geben Sie Name und Eintrittsdatum aller **Premium-Mitglieder** aus, die **vor dem 1. Januar 2024** eingetreten sind. Sortieren Sie nach dem Namen.',
        op: '**Geben Sie aus** heißt: eine SELECT-Abfrage schreiben. Die Zeilen und Spalten müssen genau passen.', hint: 'WHERE mit AND. Datum als Text in Hochkommas. Sortieren mit ORDER BY.',
        a: [['code', 'sql', `SELECT name, eintritt
FROM mitglied
WHERE tarif = 'Premium'
  AND eintritt < '2024-01-01'
ORDER BY name;`], ['table', ['name', 'eintritt'], [['Ali Demir', '2021-11-05'], ['Aylin Kaya', '2022-09-10'], ['Lena Roth', '2023-04-01']]], 'Bewertung: Spalten und Tabelle 1 P, WHERE mit zwei Bedingungen 1 P, ORDER BY 1 P.'],
        see: ['eua-sqlselect']},
      {pts: 5, topic: 'GROUP BY, HAVING', q: 'Ermitteln Sie je **Kurs** (Titel) die Anzahl der **aktiven** Buchungen. Es sollen nur Kurse erscheinen, die **mindestens 2** aktive Buchungen haben. Sortieren Sie nach Anzahl absteigend, bei gleicher Anzahl nach Titel.',
        op: '**Ermitteln** heißt: mit einer Abfrage herausfinden. Filtern von Zeilen (WHERE) und Filtern von Gruppen (HAVING) sind zwei Schritte.', hint: 'JOIN von buchung und kurs. WHERE filtert den Status. GROUP BY macht eine Zeile je Kurs. HAVING filtert die Gruppen.',
        words: [['aktiv', 'Ein Wert in der Spalte status']],
        a: [['code', 'sql', `SELECT k.titel, COUNT(*) AS anzahl
FROM kurs k
JOIN buchung b ON b.kurs_id = k.kurs_id
WHERE b.status = 'aktiv'
GROUP BY k.kurs_id, k.titel
HAVING COUNT(*) >= 2
ORDER BY anzahl DESC, k.titel;`], ['table', ['titel', 'anzahl'], [['HIIT', '3'], ['Yoga', '3'], ['Boxen', '2']]], 'Bewertung: JOIN 1 P, WHERE 1 P, GROUP BY und COUNT 1 P, HAVING 1 P, ORDER BY 1 P.'],
        sol: [['walk', {t: 'So rechnet die Datenbank', steps: [
          {t: '**JOIN + WHERE:** Buchung 5 (storniert) fällt weg. Es bleiben 10 aktive Buchungen.'},
          {t: '**GROUP BY:** eine Zeile je Kurs mit der Anzahl.', b: [['table', ['titel', 'anzahl'], [['Yoga', '3'], ['Spinning', '1'], ['Boxen', '2'], ['Pilates', '1'], ['HIIT', '3']]]]},
          {t: '**HAVING COUNT(*) >= 2:** Spinning und Pilates fallen heraus. **ORDER BY:** HIIT und Yoga (beide 3) alphabetisch, dann Boxen (2).', b: [['merk', 'Reihenfolge: **FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT, ORDER BY**. WHERE filtert Zeilen, HAVING filtert Gruppen.']]},
        ]}]],
        see: ['eua-sqljoin', 'eua-sqlgroup']},
      {pts: 4, topic: 'Mehrfach-JOIN', q: 'Geben Sie Name und **Heimstudio (Ort)** aller Mitglieder aus, die den Kurs **HIIT** aktiv gebucht haben. Sortieren Sie nach Name.',
        op: '**Geben Sie aus** heißt: eine SELECT-Abfrage schreiben. Hier brauchst du vier Tabellen.', hint: 'mitglied, buchung, kurs und studio. Der Ort kommt aus dem Studio des Mitglieds, nicht aus dem Studio des Kurses.',
        words: [['Heimstudio', 'Das Studio, bei dem das Mitglied eingetragen ist']],
        a: [['code', 'sql', `SELECT m.name, s.ort
FROM mitglied m
JOIN studio  s ON s.studio_id  = m.studio_id
JOIN buchung b ON b.mitglied_id = m.mitglied_id
JOIN kurs    k ON k.kurs_id     = b.kurs_id
WHERE k.titel = 'HIIT'
  AND b.status = 'aktiv'
ORDER BY m.name;`], ['table', ['name', 'ort'], [['Ali Demir', 'Celle'], ['Aylin Kaya', 'Hannover'], ['Lena Roth', 'Hannover']]], 'Bewertung: drei richtige JOINs 2 P, WHERE mit Kurs und Status 1 P, Ausgabe und Sortierung 1 P.'],
        sol: [['diagram', AP2.dg.flow(['mitglied', 'buchung', 'kurs (HIIT)', 'studio (Ort des Mitglieds)'], {w: 780, h: 100, styles: ['accent', 'plain', 'plain', 'ok'], bw: 170, cap: 'Weg durch die Tabellen: vom Mitglied zur Buchung zum Kurs, und vom Mitglied zum Studio'})]],
        see: ['eua-sqljoin']},
      {pts: 5, topic: 'LEFT JOIN', q: 'Welche Mitglieder haben **keine aktive Buchung**? Geben Sie Name und Heimstudio (Ort) aus.',
        op: '**Geben Sie aus** heißt: eine Abfrage schreiben. „Keine“ bedeutet: Es gibt zu dem Mitglied keine passende Zeile.', hint: 'Ein LEFT JOIN behält alle Mitglieder. Die Bedingung für den Status gehört in den ON-Teil. Dann suchst du Zeilen mit NULL.',
        words: [['NULL', 'Kein Wert. In SQL prüft man das mit IS NULL.']],
        a: [['codes', [['sql', `-- Variante 1: LEFT JOIN
SELECT m.name, s.ort
FROM mitglied m
JOIN studio s ON s.studio_id = m.studio_id
LEFT JOIN buchung b ON b.mitglied_id = m.mitglied_id AND b.status = 'aktiv'
WHERE b.buchung_id IS NULL;

-- Variante 2: NOT EXISTS
SELECT m.name, s.ort
FROM mitglied m
JOIN studio s ON s.studio_id = m.studio_id
WHERE NOT EXISTS (
    SELECT 1 FROM buchung b
    WHERE b.mitglied_id = m.mitglied_id AND b.status = 'aktiv'
);`]]], ['table', ['name', 'ort'], [['Eva Lang', 'Hildesheim']]],
          ['warn', 'Falle: Steht b.status = aktiv im **WHERE** statt im **ON**, fallen auch Mitglieder ohne Buchung heraus (NULL ist nicht gleich aktiv) und das Ergebnis ist leer.'], 'Bewertung: JOIN mit studio 1 P, LEFT JOIN bzw. NOT EXISTS 2 P, Status-Bedingung am richtigen Ort 1 P, NULL-Prüfung 1 P.'],
        see: ['eua-sqljoin', 'eua-sqlexam']},
      {pts: 4, topic: 'Auslastung', q: 'Berechnen Sie für jeden Kurs die **Auslastung in Prozent**: aktive Buchungen geteilt durch max_plaetze mal 100, auf eine Nachkommastelle gerundet. Kurse ohne Buchung sollen mit 0 erscheinen. Sortieren Sie absteigend nach Auslastung.',
        op: '**Berechnen** heißt: mit SQL rechnen. Das Ergebnis soll in der Abfrage stehen, nicht von Hand.', hint: 'LEFT JOIN, damit auch Kurse ohne Buchung bleiben. Rechne mit 100.0, damit keine Ganzzahldivision entsteht. ROUND rundet.',
        words: [['Ganzzahldivision', 'Bei Ganzzahlen schneidet die Division die Nachkommastellen ab. 3 / 12 ist dann 0.']],
        a: [['code', 'sql', `SELECT k.titel,
       ROUND(COUNT(b.buchung_id) * 100.0 / k.max_plaetze, 1) AS auslastung
FROM kurs k
LEFT JOIN buchung b ON b.kurs_id = k.kurs_id AND b.status = 'aktiv'
GROUP BY k.kurs_id, k.titel, k.max_plaetze
ORDER BY auslastung DESC;`], ['table', ['titel', 'auslastung'], [['Yoga', '25.0'], ['Boxen', '20.0'], ['HIIT', '15.0'], ['Pilates', '12.5'], ['Spinning', '6.7']]], 'Rechnung: Yoga 3 / 12 = 25 %, Boxen 2 / 10 = 20 %, HIIT 3 / 20 = 15 %, Pilates 1 / 8 = 12,5 %, Spinning 1 / 15 = 6,67 %.', 'Bewertung: LEFT JOIN mit Status im ON 1 P, Formel mit 100.0 1 P, ROUND und GROUP BY mit max_plaetze 1 P, ORDER BY 1 P.'],
        see: ['eua-sqlgroup']},
      {pts: 4, topic: 'INSERT und UPDATE', q: 'a) Fügen Sie das Mitglied **Nora Hahn** (mitglied_id 108, Studio 2, Eintritt 15.03.2026, Tarif Basis) ein. b) Alle Kurse des Studios **1** sollen um **10 %** teurer werden. Schreiben Sie die Anweisung und geben Sie die Zahl der betroffenen Zeilen an.',
        op: '**Fügen Sie ein** heißt: INSERT schreiben. Bei b) heißt **geben Sie an**: die Zahl nennen.', hint: 'INSERT mit Spaltenliste. UPDATE mit SET und einem WHERE, sonst werden alle Zeilen geändert.',
        a: [['code', 'sql', `INSERT INTO mitglied (mitglied_id, name, studio_id, eintritt, tarif)
VALUES (108, 'Nora Hahn', 2, '2026-03-15', 'Basis');

UPDATE kurs
SET preis = preis * 1.10
WHERE studio_id = 1;`], 'Betroffen sind **3 Zeilen** (Kurse 10, 11 und 14). Die Preise 0,00 bleiben 0,00; HIIT wird 3,85.', ['warn', 'Ohne WHERE würden **alle** Kurse geändert. Prüfe das WHERE bei UPDATE und DELETE immer zuerst.'], 'Bewertung: INSERT mit Spalten und Werten 2 P, UPDATE mit WHERE 1 P, Anzahl 1 P.'],
        see: ['eua-sqldml']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Testen und Fehler finden (25 Punkte)',
    tasks: [
      {pts: 7, rows: 10, topic: 'Äquivalenzklassen', q: 'Bei der Anmeldung zu einem Kurs wird das **Alter** in ganzen Jahren eingegeben. Regeln: unter 14 Jahren keine Anmeldung. **14 bis 17:** Jugendpreis. **18 bis 64:** Normalpreis. **Ab 65:** Seniorenpreis. Als Höchstwert gilt 99. a) Bilden Sie die Äquivalenzklassen (gültig und ungültig). b) Geben Sie nach der Grenzwertanalyse alle Testwerte mit erwartetem Ergebnis an.',
        op: '**Bilden** heißt: Gruppen aufstellen. **Angeben** heißt: Werte und Ergebnis nennen.', hint: 'Zeichne einen Zahlenstrahl. Die Grenzwerte liegen auf beiden Seiten jeder Klassengrenze.',
        words: [['gültig / ungültig', 'Erlaubte / nicht erlaubte Eingabe'], ['Grenzwertanalyse', 'Testwerte genau an den Rändern der Klassen']],
        a: [['table', ['Klasse', 'Bereich', 'Repräsentant', 'Grenzwerte', 'Erwartet'], [['ungültig 1', 'kleiner 14', '5', '13', 'Fehlermeldung'], ['gültig 1 (Jugend)', '14 bis 17', '16', '14, 17', 'Jugendpreis'], ['gültig 2 (Normal)', '18 bis 64', '40', '18, 64', 'Normalpreis'], ['gültig 3 (Senior)', '65 bis 99', '80', '65, 99', 'Seniorenpreis'], ['ungültig 2', 'größer 99', '120', '100', 'Fehlermeldung'], ['ungültig 3', 'keine ganze Zahl', '„abc“, 17,5', '-', 'Fehlermeldung']]],
          'Bewertung: Klassen 3 P, Grenzwerte mit erwartetem Ergebnis 4 P.'],
        sol: [['diagram', {w: 860, h: 120, keep: 640, cap: 'Zahlenstrahl: Klassengrenzen und Testwerte', nodes: [
          {id: 'u1', k: 'box', x: 80, y: 50, w: 130, h: 44, t: ['ungültig', '< 14'], s: 'bad'}, {id: 'g1', k: 'box', x: 240, y: 50, w: 150, h: 44, t: ['Jugend', '14 ... 17'], s: 'ok'},
          {id: 'g2', k: 'box', x: 420, y: 50, w: 170, h: 44, t: ['Normal', '18 ... 64'], s: 'ok'}, {id: 'g3', k: 'box', x: 610, y: 50, w: 170, h: 44, t: ['Senior', '65 ... 99'], s: 'gold'}, {id: 'u2', k: 'box', x: 780, y: 50, w: 120, h: 44, t: ['ungültig', '> 99'], s: 'bad'},
          {id: 'l', k: 'text', x: 430, y: 102, t: 'Testwerte: 13 | 14 | 17 | 18 | 64 | 65 | 99 | 100', w: 10, h: 10, mw: 760},
        ], edges: []}]],
        see: ['eua-testfaelle']},
      {pts: 5, rows: 8, topic: 'Überdeckung und Testarten', q: 'Gegeben ist die Funktion **preis**. a) Geben Sie die **kleinste Zahl von Testfällen** für 100 % **Anweisungsüberdeckung** an (mit Eingaben und erwarteter Ausgabe). b) Wie viele Testfälle braucht man mindestens für 100 % **Zweigüberdeckung**? c) Erklären Sie den Unterschied zwischen Black-Box- und White-Box-Test und ordnen Sie a) und die Äquivalenzklassen zu.',
        ctx: [['code', 'pseudo', `funktion preis(alter, istStudent)
    p = 40
    wenn alter < 18 dann
        p = 25
    sonst wenn istStudent dann
        p = 30
    ende wenn
    wenn alter >= 65 dann
        p = p - 6
    ende wenn
    rückgabe p
ende funktion`]],
        op: '**Angeben** heißt: Werte und Ergebnis nennen. **Erklären** heißt: den Unterschied mit Begründung sagen.', hint: 'Anweisungsüberdeckung: jede Zeile einmal. Zweigüberdeckung: jede Bedingung einmal wahr und einmal falsch.',
        words: [['Anweisungsüberdeckung', 'Jede Anweisung wird mindestens einmal ausgeführt'], ['Zweigüberdeckung', 'Jede Entscheidung wird mindestens einmal wahr und einmal falsch durchlaufen']],
        a: ['a) **2 Testfälle:** (alter 17, istStudent egal, z. B. false) → p = 25 (deckt p = 25). (alter 70, istStudent true) → p = 30, dann 30 - 6 = **24** (deckt p = 30 und p = p - 6).', 'b) **3 Testfälle.** Zweige: alter < 18 wahr/falsch, istStudent wahr/falsch, alter >= 65 wahr/falsch. Zum Beispiel: (17, false) → **25**; (70, true) → **24**; (30, false) → **40** (deckt den Fall „kein Student, unter 65“).', 'c) **Black-Box:** Test aus der **Spezifikation**, ohne Quelltext (Äquivalenzklassen, Grenzwerte). **White-Box:** Test mit Blick auf den **Quelltext** und seine Struktur (Anweisungs- und Zweigüberdeckung). a) und b) sind White-Box, die Äquivalenzklassen sind Black-Box.', 'Bewertung: a) 2 P, b) 1 P (mit Beispiel 2 P), c) 1 P.'],
        sol: [['table', ['Test', 'alter', 'istStudent', 'p = 25', 'p = 30', 'p - 6', 'Ergebnis'], [['T1', '17', 'false', 'x', '-', '-', '25'], ['T2', '70', 'true', '-', 'x', 'x', '24'], ['T3', '30', 'false', '-', '-', '-', '40']]], ['merk', 'Zweigüberdeckung ist stärker als Anweisungsüberdeckung. Mit nur T1 und T2 bleibt der Fall „istStudent = false“ ungetestet.']],
        see: ['eua-testfaelle', 'ps-ueberdeckung', 'ps-testarten']},
      {pts: 6, rows: 10, topic: 'Unit-Tests', q: 'Die Methode **freiePlaetze(max, belegt)** gibt max - belegt zurück. Ist belegt kleiner 0 oder größer max, wirft sie eine **IllegalArgumentException**. a) Schreiben Sie vier Unit-Tests (JUnit oder Pseudocode) mit sinnvollen Namen: Normalfall, Grenzfall voll, Grenzfall leer, Fehlerfall. b) Erklären Sie das Schema Arrange - Act - Assert.',
        op: '**Schreiben** heißt: Testcode angeben. **Erklären** heißt: die drei Teile nennen und beschreiben.', hint: 'Jeder Test prüft genau einen Fall. Ein Fehlerfall prüft, dass die Ausnahme geworfen wird.',
        words: [['Ausnahme (Exception)', 'Fehlerobjekt, das ein Programm wirft'], ['Assert', 'Prüfung im Test: Ist das Ergebnis wie erwartet?']],
        a: [['codes', [['java', `@Test void freiePlaetze_normal()      { assertEquals(5, Kurs.freiePlaetze(12, 7)); }
@Test void freiePlaetze_voll()        { assertEquals(0, Kurs.freiePlaetze(12, 12)); }
@Test void freiePlaetze_leer()        { assertEquals(12, Kurs.freiePlaetze(12, 0)); }
@Test void freiePlaetze_ueberbucht()  {
    assertThrows(IllegalArgumentException.class, () -> Kurs.freiePlaetze(12, 13));
}`], ['python', `def test_normal():     assert frei(12, 7) == 5
def test_voll():       assert frei(12, 12) == 0
def test_leer():       assert frei(12, 0) == 12
def test_ueberbucht():
    with pytest.raises(ValueError):
        frei(12, 13)`]]],
          'b) **Arrange:** Testdaten und Objekte vorbereiten. **Act:** die zu testende Methode aufrufen. **Assert:** das Ergebnis mit dem erwarteten Wert vergleichen. So bleibt jeder Test kurz und lesbar.', 'Bewertung: vier Tests mit richtigen Werten je 1 P (Namen sinnvoll), AAA 2 P.'],
        sol: [['table', ['Test', 'Arrange', 'Act', 'Assert'], [['voll', 'max 12, belegt 12', 'freiePlaetze(12, 12)', 'Ergebnis = 0'], ['ueberbucht', 'max 12, belegt 13', 'freiePlaetze(12, 13)', 'Ausnahme IllegalArgumentException']]], ['tip', 'Grenzfälle (0 und max) sind die häufigsten Fehlerquellen. Teste darum immer beide Ränder.']],
        see: ['eua-unittest', 'eua-exceptions']},
      {pts: 7, rows: 10, topic: 'Fehler finden', q: 'Die Funktion **durchschnitt(bewertungen)** soll die mittlere Bewertung (Werte 1 bis 5) eines Kurses berechnen. Sie liefert falsche Ergebnisse und stürzt manchmal ab. a) Finden Sie **drei Fehler** und erklären Sie jeweils die Folge. b) Schreiben Sie die korrigierte Funktion. Bei einem leeren Feld soll 0 zurückgegeben werden.',
        ctx: [['code', 'java', `static double durchschnitt(int[] bewertungen) {
    int summe = 0;
    for (int i = 1; i <= bewertungen.length; i++) {
        summe = summe + bewertungen[i];
    }
    return summe / bewertungen.length;
}`]],
        op: '**Finden** heißt: den Fehler in der Zeile zeigen. **Erklären** heißt: sagen, was dadurch schiefgeht.', hint: 'Prüfe die Schleife (Start und Ende), die Division und was bei einem leeren Feld passiert.',
        words: [['ArrayIndexOutOfBounds', 'Fehler: Zugriff auf einen Index, den es nicht gibt'], ['ArithmeticException', 'Fehler: zum Beispiel Division durch 0 bei Ganzzahlen']],
        a: ['a) **Fehler 1, Schleifenstart und -ende:** i = 1 überspringt das erste Element (Index 0), und i <= length greift auf den Index length zu, der nicht existiert. Folge: falsche Summe und **ArrayIndexOutOfBoundsException**. Richtig: i = 0 bis i < length.', '**Fehler 2, Ganzzahldivision:** summe und length sind int. Die Division schneidet die Nachkommastellen ab (zum Beispiel 14 / 4 = 3 statt 3,5). Richtig: (double) summe / length.', '**Fehler 3, leeres Feld:** length = 0 führt zu einer Division durch 0 (bei int ArithmeticException). Es braucht eine Prüfung vorher.',
          ['code', 'java', `static double durchschnitt(int[] bewertungen) {
    if (bewertungen.length == 0) return 0;
    int summe = 0;
    for (int i = 0; i < bewertungen.length; i++) {
        summe += bewertungen[i];
    }
    return (double) summe / bewertungen.length;
}`], 'Bewertung: je Fehler mit Folge 2 P (6 P), korrigierte Funktion 1 P (nur wenn alle Fehler behoben sind).'],
        sol: [['table', ['Eingabe', 'Fehlerhaft', 'Korrekt'], [['[4, 5, 3, 2]', 'Absturz (Index 4 gibt es nicht)', '3.5'], ['[5, 5]', 'Absturz', '5.0'], ['[]', 'Absturz (Index 0 nicht vorhanden)', '0.0']]],
          ['warn', 'Häufige Fehler dieser Art: **Off-by-one** (Schleife um 1 verschoben), **Ganzzahldivision**, **leere Eingabe** nicht beachtet. Teste solche Methoden immer mit leerem, einelementigem und normalem Feld.']],
        see: ['eua-debugging', 'eua-datentypen']},
    ],
  });
  AP2.exam.end(ID);
})();
