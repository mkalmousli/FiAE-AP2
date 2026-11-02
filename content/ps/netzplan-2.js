(function () {
  // Vorgangsknoten in Prüfungsform; phase 1 = nur Vorwärts, 2 = mit Rückwärts, 3 = komplett mit Puffern.
  const T = [['a', 'Analyse', 3, 0, 3, 0, 3, 0, 0, 1], ['b', 'Entwurf', 4, 3, 7, 3, 7, 0, 0, 1], ['c', 'Datenbank', 5, 7, 12, 7, 12, 0, 0, 1], ['e', 'Backend', 8, 12, 20, 12, 20, 0, 0, 1],
    ['f', 'Integration', 3, 20, 23, 20, 23, 0, 0, 1], ['g', 'Test', 4, 23, 27, 23, 27, 0, 0, 1], ['d', 'Oberfläche', 6, 7, 13, 14, 20, 7, 7, 0]];
  const X = {a: 90, b: 280, c: 470, e: 660, f: 850, g: 1040, d: 565};
  const net = (phase, cap) => ({w: 1130, h: 270, keep: 900, cap, nodes: T.map(([id, name, d, faz, fez, saz, sez, gp, fp, crit]) => ({id, k: 'np', x: X[id], y: id === 'd' ? 215 : 70,
    s: phase === 3 && crit ? 'accent' : 'plain', t: Object.assign({nr: id.toUpperCase(), name, d, faz, fez}, phase > 1 ? {saz, sez} : {}, phase > 2 ? {gp, fp} : {})})),
  edges: [{a: 'a', b: 'b'}, {a: 'b', b: 'c'}, {a: 'c', b: 'e'}, {a: 'e', b: 'f'}, {a: 'f', b: 'g'}, {a: 'b', b: 'd', via: [[280, 215]]}, {a: 'd', b: 'f', via: [[850, 215]]}]});
  AP2.add('ps-netzplan', [
    ['h', 'Schritt für Schritt: ein vollständiges Beispiel'],
    ['p', 'Ein Team entwickelt eine kleine Web-Anwendung. Die Vorgänge, ihre Dauern (in Tagen) und Vorgänger:'],
    ['table', ['Vorgang', 'Bezeichnung', 'Dauer', 'Vorgänger'], [['A', 'Analyse', '3', '-'], ['B', 'Entwurf', '4', 'A'], ['C', 'Datenbank', '5', 'B'], ['D', 'Oberfläche', '6', 'B'], ['E', 'Backend', '8', 'C'], ['F', 'Integration', '3', 'D, E'], ['G', 'Test', '4', 'F']]],
    ['h3', 'Schritt 1: Vorwärtsrechnung (früheste Zeiten)'],
    ['steps', ['**A** startet bei 0: FAZ = 0, FEZ = 0 + 3 = **3**.', '**B** startet, wenn A fertig ist: FAZ = 3, FEZ = 3 + 4 = **7**.', '**C** und **D** starten beide nach B: FAZ = 7. FEZ(C) = 7 + 5 = **12**, FEZ(D) = 7 + 6 = **13**.', '**E** startet nach C: FAZ = 12, FEZ = 12 + 8 = **20**.', '**F** hat zwei Vorgänger (D und E). Er kann erst starten, wenn **beide** fertig sind: FAZ = max(13, 20) = **20**. FEZ = 20 + 3 = **23**.', '**G** startet nach F: FAZ = 23, FEZ = 23 + 4 = **27**. Die Gesamtdauer des Projekts ist **27 Tage**.']],
    ['diagram', net(1, 'Nach der Vorwärtsrechnung: oben links FAZ, oben rechts FEZ. Bei F laufen D (FEZ 13) und E (FEZ 20) zusammen: das Maximum 20 zählt.')],
    ['h3', 'Schritt 2: Rückwärtsrechnung (späteste Zeiten)'],
    ['steps', ['Beim letzten Vorgang gilt: SEZ = FEZ = **27**. SAZ(G) = 27 - 4 = **23**.', '**F:** SEZ = SAZ(G) = 23, SAZ = 23 - 3 = **20**.', '**E:** SEZ = SAZ(F) = 20, SAZ = 20 - 8 = **12**.', '**D:** SEZ = SAZ(F) = 20, SAZ = 20 - 6 = **14**.', '**C:** SEZ = SAZ(E) = 12, SAZ = 12 - 5 = **7**.', '**B** hat zwei Nachfolger (C und D): SEZ = min(7, 14) = **7**. SAZ = 7 - 4 = **3**.', '**A:** SEZ = SAZ(B) = 3, SAZ = 3 - 3 = **0**. Das passt zum Start bei 0.']],
    ['diagram', net(2, 'Nach der Rückwärtsrechnung: unten links SAZ, unten rechts SEZ. Bei B laufen C und D auseinander: das Minimum der SAZ (7 und 14) zählt.')],
    ['h3', 'Schritt 3: Puffer und kritischer Pfad'],
    ['p', '**GP = SAZ - FAZ.** Nur Vorgang **D** hat Spielraum: GP(D) = 14 - 7 = **7**. Alle anderen haben GP = 0. Der **freie Puffer** von D ist FP = FAZ(F) - FEZ(D) = 20 - 13 = **7**.'],
    ['diagram', net(3, 'Fertiger Netzplan. Hervorgehoben: kritischer Pfad A, B, C, E, F, G mit 27 Tagen (GP = 0). Nur D hat Puffer.')],
    ['tip', 'Kritische Vorgänge erkennst du an **GP = 0**. Der kritische Pfad ist immer der **längste** Weg. Zur Kontrolle: A + B + C + E + F + G = 3 + 4 + 5 + 8 + 3 + 4 = 27. Der Weg über D wäre nur 3 + 4 + 6 + 3 + 4 = 20 lang.'],
    ['h', 'Was bedeutet das für das Projekt?'],
    ['list', ['**Verzögert sich C um 2 Tage**, endet das Projekt 2 Tage später (29 statt 27 Tage), denn C ist kritisch.', '**Verzögert sich D um 5 Tage**, passiert nichts: D hat 7 Tage Gesamtpuffer.', '**Verzögert sich D um 9 Tage**, endet das Projekt 2 Tage später (9 - 7 = 2).', 'Wer das Projekt beschleunigen will, muss **kritische** Vorgänge verkürzen (mehr Personal, Parallelisierung). Bei D zu sparen bringt nichts.']],
    ['warn', ['**Typische Fehler in der Prüfung:**', '- Bei mehreren Vorgängern beim Vorwärtsrechnen das **Minimum** statt des Maximums nehmen (richtig: Maximum).', '- Bei mehreren Nachfolgern beim Rückwärtsrechnen das Maximum statt des **Minimums** nehmen.', '- Dauer und Zeitpunkt verwechseln: FEZ = FAZ + D, nicht FAZ + D + 1 (außer die Aufgabe gibt eine andere Zählweise vor).', '- Den Puffer nur bei Vorgängen mit Nebenweg erwarten: Alle Vorgänge auf dem kritischen Pfad haben GP = 0.']],
    ['tool', 'netzplan'],
  ]);
})();
