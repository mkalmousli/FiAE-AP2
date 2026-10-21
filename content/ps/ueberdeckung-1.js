AP2.page('ps-ueberdeckung', {
  b: 'ps', g: 'Qualitätssicherung', t: 'White-Box-Test: Kontrollflussgraph, Anweisungs-, Zweig- und Pfadüberdeckung',
  d: 'White-Box-Tests leiten Testfälle aus dem **Quellcode** ab. Grundlage ist der **Kontrollflussgraph**: Knoten sind Anweisungen, Kanten mögliche Abläufe. Die **Anweisungsüberdeckung (C0)** fordert, dass jede Anweisung, die **Zweigüberdeckung (C1)**, dass jede Kante (jeder Zweig), und die **Pfadüberdeckung (C2)**, dass jeder Weg vom Start zum Ende mindestens einmal durchlaufen wird.',
  m: '**C0 Knoten, C1 Kanten, C2 Wege.** Jede Stufe schließt die vorige ein: C2 deckt C1, C1 deckt C0. Ein if **ohne** else braucht für C1 zusätzlich den Fall "Bedingung falsch". Schleifen bei C2: **keinmal, einmal, mehrmals**.',
  cheat: [
    ['Überdeckungsmaße', ['**C0 Anweisungsüberdeckung:** jede Anweisung mindestens einmal', '**C1 Zweigüberdeckung:** jeder Zweig (wahr und falsch) mindestens einmal', '**C2 Pfadüberdeckung:** jeder Pfad von Start bis Ende', 'Stärke: C2 vor C1 vor C0']],
    ['Kontrollflussgraph', ['Knoten = Anweisung oder Block', 'Kante = möglicher Übergang', 'Verzweigung: Knoten mit 2 ausgehenden Kanten', 'Schleife: Rückwärtskante']],
    ['Zyklomatische Komplexität', ['**M = E - N + 2** (Kanten - Knoten + 2)', 'oder: **Anzahl Entscheidungen + 1**', '= Zahl der Basispfade; Obergrenze der Testfälle für C1', 'Richtwert: M unter 10 je Methode']],
    ['Testgetrieben (TDD)', ['**Erst Test, dann Code**', 'Red: Test schlägt fehl', 'Green: minimal implementieren', 'Refactor: aufräumen, Tests bleiben grün']],
  ],
  blocks: [
    ['h', 'Black-Box und White-Box'],
    ['p', 'Beim **Black-Box-Test** kennt der Tester nur die **Spezifikation**: Eingabe rein, erwartete Ausgabe vergleichen (Äquivalenzklassen, Grenzwerte). Beim **White-Box-Test** (Glass-Box, strukturorientiert) schaut man **in den Code** und sorgt dafür, dass bestimmte Strukturen ausgeführt werden. White-Box-Tests finden **nicht ausgeführten oder toten Code**, aber keine **fehlenden** Funktionen. Deshalb kombiniert man beide Verfahren.'],
    ['h', 'Beispiel: Kontrollflussgraph einer Rabattfunktion'],
    ['code', 'java', `double rabatt(double betrag, boolean stammkunde) {
    double r = 0;                 // A
    if (betrag > 100) {           // B
        r = 0.05;                 // C
    }
    if (stammkunde) {             // D
        r = r + 0.02;             // E
    }
    return betrag * (1 - r);      // F
}`],
    ['diagram', {w: 560, h: 470, cap: 'Kontrollflussgraph: zwei hintereinander liegende if-Anweisungen ohne else', nodes: [
      {id: 'A', x: 280, y: 30, k: 'circle', s: 'plain', t: 'A', w: 44, h: 44},
      {id: 'B', x: 280, y: 110, k: 'circle', s: 'accent', t: 'B', w: 44, h: 44},
      {id: 'C', x: 170, y: 190, k: 'circle', s: 'plain', t: 'C', w: 44, h: 44},
      {id: 'D', x: 280, y: 270, k: 'circle', s: 'accent', t: 'D', w: 44, h: 44},
      {id: 'E', x: 170, y: 350, k: 'circle', s: 'plain', t: 'E', w: 44, h: 44},
      {id: 'F', x: 280, y: 430, k: 'circle', s: 'ok', t: 'F', w: 44, h: 44},
      {id: 'n1', x: 430, y: 110, k: 'text', t: 'betrag > 100 ?', fs: 12},
      {id: 'n2', x: 430, y: 270, k: 'text', t: 'stammkunde ?', fs: 12},
    ], edges: [{a: 'A', b: 'B'}, {a: 'B', b: 'C', t: 'ja'}, {a: 'C', b: 'D'}, {a: 'B', b: 'D', t: 'nein', lo: [22, 0]}, {a: 'D', b: 'E', t: 'ja'}, {a: 'E', b: 'F'}, {a: 'D', b: 'F', t: 'nein', lo: [22, 0]}]}],
    ['table', ['Maß', 'Was muss abgedeckt werden?', 'Minimale Testfälle', 'Beispiel-Eingaben'], [
      ['C0 Anweisungen', 'Knoten A bis F', '**1**', '(150, true): Pfad A B C D E F'],
      ['C1 Zweige', 'Alle 8 Kanten, auch B nach D und D nach F', '**2**', '(150, true) und (50, false)'],
      ['C2 Pfade', 'Alle Wege: ACE, AC ohne E, ohne C mit E, weder noch', '**4**', '(150, true), (150, false), (50, true), (50, false)'],
    ]],
    ['p', 'Man sieht: **C0 mit einem Test** lässt die Fälle "kein Rabatt" ungeprüft; ein Fehler im nein-Zweig (zum Beispiel falscher Startwert von r) bliebe unentdeckt. **C1** prüft jede Entscheidung in beide Richtungen. **C2** kombiniert alle Entscheidungen; die Zahl der Pfade wächst **exponentiell** (n unabhängige ifs ergeben 2^n Pfade).'],
    ['h', 'Schleifen und Pfadüberdeckung'],
    ['p', 'Mit Schleifen gibt es unendlich viele Pfade. In der Praxis begrenzt man deshalb: Die Schleife wird **keinmal**, **genau einmal** und **mehrmals** (zum Beispiel maximal oder typisch) durchlaufen. Diese Näherung heißt auch **Boundary-Interior-Test**.'],
    ['code', 'c', `int zaehle(void) {                 // Nstart
    int zahl, treffer = 0;         // N1
    do {
        scanf("%d", &zahl);        // N2
        if (zahl > 10 && zahl < 20)// N3
            treffer++;             // N4
    } while (zahl > 5);            // N5
    return treffer;                // Nende
}`],
    ['table', ['Eingaben', 'Durchlaufener Pfad', 'Bemerkung'], [
      ['1', 'Nstart N1 N2 N3 N5 Nende', 'Schleifenrumpf einmal, if falsch, sofort Ende'],
      ['12; 2', 'Nstart N1 N2 N3 N4 N5 N2 N3 N5 Nende', 'Treffer im ersten Durchlauf, Ende im zweiten'],
      ['6; 15; 4', 'Nstart N1 N2 N3 N5 N2 N3 N4 N5 N2 N3 N5 Nende', 'drei Durchläufe, nur der mittlere zählt'],
    ]],
    ['tip', 'Pfadangaben in der Prüfung: **Knotenfolge lückenlos** aufschreiben und die Schleifenbedingung bei jedem Durchlauf auswerten. Ein **do-while** wird immer mindestens einmal ausgeführt.'],
    ['h', 'Zyklomatische Komplexität nach McCabe'],
    ['p', 'Die **zyklomatische Komplexität** misst, wie verzweigt Code ist: **M = E - N + 2** (E Kanten, N Knoten) oder einfacher **Anzahl binärer Entscheidungen + 1**. Für die Rabattfunktion: 8 Kanten, 6 Knoten, M = 8 - 6 + 2 = **3** (zwei ifs + 1). M ist gleich der Zahl der **linear unabhängigen Pfade (Basispfade)** und eine **Obergrenze** für die Testfälle, die man für C1 braucht. Hohe Werte (über 10) deuten auf schwer testbaren Code hin.'],
    ['h', 'Testgetriebene Entwicklung (TDD)'],
    ['diagram', AP2.dg.cycle(['Red: Test schreiben, er schlägt fehl', 'Green: gerade so viel Code, bis er besteht', 'Refactor: Code verbessern, Tests bleiben grün'], {w: 680, h: 300, rx: 210, ry: 95, styles: ['bad', 'ok', 'accent'], cap: 'TDD-Zyklus: Tests steuern das Design, jede Funktion ist von Anfang an getestet.'})],
    ['p', 'Bei **TDD** werden Tests **vor** der Implementierung geschrieben (meist mit einem Framework wie JUnit). Vorteile: hohe Testabdeckung, gut testbares Design, Tests dienen als Dokumentation und als Sicherheitsnetz für Refactoring. Nachteil: anfangs mehr Aufwand, Disziplin nötig. TDD ist damit **auch eine Designstrategie**, nicht nur ein Testverfahren.'],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Beschreiben Sie stichpunktartig Anweisungs-, Zweig- und Pfadüberdeckung.', ['- **Anweisungsüberdeckung (C0):** Jede Anweisung wird mindestens einmal ausgeführt. Verzweigungen ohne Anweisung (leerer else-Zweig) werden nicht erzwungen. Notwendig, aber keine Garantie für Fehlerfreiheit.', '- **Zweigüberdeckung (C1):** Jeder Zweig jeder Entscheidung (wahr und falsch) wird mindestens einmal durchlaufen. Schließt C0 ein. Schleifen werden nur einmal betrachtet.', '- **Pfadüberdeckung (C2):** Alle möglichen Pfade vom Start zum Ende werden durchlaufen. Schließt C1 ein. Bei Schleifen praktisch nicht vollständig möglich, daher Begrenzung (keinmal, einmal, mehrmals).'], 6],
    ['qa', 'Wie viele Testfälle braucht die Funktion rabatt() oben mindestens für C0, C1 und C2? Begründen Sie.', ['- **C0: 1** Testfall, zum Beispiel (150, true) durchläuft alle Anweisungen A bis F.', '- **C1: 2** Testfälle, zum Beispiel (150, true) und (50, false); damit sind beide Entscheidungen je einmal wahr und einmal falsch.', '- **C2: 4** Testfälle, weil zwei unabhängige Entscheidungen 2 mal 2 = 4 Pfade ergeben.'], 4],
    ['qa', 'Was versteht man unter testgetriebener Entwicklung?', 'Bei der testgetriebenen Entwicklung (TDD) wird zu jeder Funktion **zuerst ein automatisierter Test** geschrieben, der zunächst fehlschlägt. Dann wird nur so viel Code implementiert, bis der Test besteht, anschließend wird der Code aufgeräumt (Red, Green, Refactor). So hat jede Funktion von Beginn an Tests; TDD steuert damit auch das Design.', 3],
    ['see', ['ps-testarten', 'eua-testfaelle', 'eua-unittest', 'ps-verifikation']],
    ['quiz', [
      {q: 'Welches Überdeckungsmaß fordert, dass jede Entscheidung einmal wahr und einmal falsch ist?', o: ['Zweigüberdeckung (C1)', 'Anweisungsüberdeckung (C0)', 'Pfadüberdeckung (C2)', 'Äquivalenzklassen'], a: 0, e: 'C1 deckt alle Kanten des Kontrollflussgraphen ab, also beide Ausgänge jeder Verzweigung.'},
      {q: 'Welches Maß ist am stärksten?', o: ['Pfadüberdeckung', 'Zweigüberdeckung', 'Anweisungsüberdeckung', 'Alle gleich stark'], a: 0, e: 'C2 schließt C1 ein, C1 schließt C0 ein.'},
      {q: 'Eine Funktion hat 3 unabhängige if-Anweisungen hintereinander. Wie viele Pfade gibt es?', o: ['8', '3', '4', '6'], a: 0, e: '2 hoch 3 = 8 Pfade; für C1 reichen dagegen 2 Testfälle.'},
      {q: 'Berechnen Sie die zyklomatische Komplexität: 9 Kanten, 7 Knoten.', o: ['4', '2', '16', '3'], a: 0, e: 'M = E - N + 2 = 9 - 7 + 2 = 4.'},
      {q: 'Was findet ein White-Box-Test grundsätzlich NICHT?', o: ['Fehlende Funktionen, die nie programmiert wurden', 'Nicht ausgeführten Code', 'Falsche Verzweigungen', 'Tote Codezeilen'], a: 0, e: 'Was nicht im Code steht, kann ein codebasierter Test nicht abdecken; dafür braucht es Black-Box-Tests gegen die Spezifikation.'},
      {q: 'In welcher Reihenfolge läuft TDD ab?', o: ['Red, Green, Refactor', 'Green, Red, Refactor', 'Code, Test, Deploy', 'Refactor, Red, Green'], a: 0, e: 'Erst der fehlschlagende Test (Red), dann minimaler Code (Green), dann Aufräumen (Refactor).'},
      {q: 'Wie testet man Schleifen bei der Pfadüberdeckung in der Praxis?', o: ['Keinmal, einmal und mehrmals durchlaufen', 'Unendlich oft', 'Gar nicht', 'Nur den ersten Durchlauf'], a: 0, e: 'Vollständige Pfadüberdeckung ist bei Schleifen unmöglich, daher wird sie angenähert.'},
    ]],
  ],
});
