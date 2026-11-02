// Probeprüfung 3, Planen eines Softwareproduktes: NordLog Spedition GmbH, Lagerverwaltung "LagerPilot".
(function () {
  // Netzplan: [id, Name, Dauer, FAZ, FEZ, SAZ, SEZ, GP, FP, kritisch]
  const V = [['a', 'Ist-Analyse', 4, 0, 4, 0, 4, 0, 0, 1], ['b', 'Pflichtenheft', 3, 4, 7, 4, 7, 0, 0, 1], ['c', 'DB-Entwurf', 5, 7, 12, 7, 12, 0, 0, 1],
    ['d', 'Scanner-App', 8, 7, 15, 14, 22, 7, 7, 0], ['e', 'Backend/API', 10, 12, 22, 12, 22, 0, 0, 1], ['f', 'Tracking-Portal', 6, 12, 18, 20, 26, 8, 8, 0],
    ['g', 'Integration', 4, 22, 26, 22, 26, 0, 0, 1], ['h', 'Systemtest', 3, 26, 29, 26, 29, 0, 0, 1], ['i', 'Schulung', 2, 26, 28, 27, 29, 1, 1, 0], ['j', 'Go-live', 1, 29, 30, 29, 30, 0, 0, 1]];
  const P = {a: [90, 195], b: [280, 195], c: [470, 65], d: [470, 325], e: [660, 65], f: [660, 195], g: [850, 65], i: [1040, 65], h: [1040, 195], j: [1230, 195]};
  const net = (phase, cap) => ({w: 1320, h: 390, keep: 980, cap, nodes: V.map(([id, name, d, faz, fez, saz, sez, gp, fp, crit]) => ({id, k: 'np', x: P[id][0], y: P[id][1],
    s: phase === 3 && crit ? 'accent' : 'plain', t: Object.assign({nr: id.toUpperCase(), name, d}, phase > 0 ? {faz, fez} : {}, phase > 1 ? {saz, sez} : {}, phase > 2 ? {gp, fp} : {})})),
  edges: [{a: 'a', b: 'b'}, {a: 'b', b: 'c'}, {a: 'b', b: 'd'}, {a: 'c', b: 'e'}, {a: 'c', b: 'f'}, {a: 'd', b: 'g', via: [[850, 325]]}, {a: 'e', b: 'g'},
    {a: 'f', b: 'h'}, {a: 'g', b: 'h'}, {a: 'g', b: 'i'}, {a: 'h', b: 'j'}, {a: 'i', b: 'j'}]});
  const ID = 'exam3-ps';
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 3 (Logistik)', t: 'Planen eines Softwareproduktes: Lagerverwaltung LagerPilot', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.ps,
    hint: 'Realistischer Aufgabensatz im Format der AP2 seit 2021: 4 Handlungsschritte, je 25 Punkte, 90 Minuten. Erst vollständig selbst lösen, dann die Musterlösung mit Diagrammen und Lösungsweg-Präsentation öffnen und ehrlich bewerten.',
    intro: [
      ['p', 'Sie sind Mitarbeiterin bzw. Mitarbeiter der **CodeHafen Software GmbH** in Bremen. Ihr Kunde, die **NordLog Spedition GmbH**, betreibt ein Logistikzentrum mit **12.000 Palettenplätzen** und drei Umschlagstandorten. Bisher werden Wareneingang, Einlagerung und Kommissionierung mit Papierlisten und einer veralteten Access-Datenbank organisiert. Fehlbestände fallen oft erst bei der Inventur auf.'],
      ['p', 'Ihr Team soll das Lagerverwaltungssystem **LagerPilot** entwickeln: Handscanner-App für die Lagermitarbeitenden, Backend mit REST-API, Anbindung an das ERP-System von NordLog und ein Tracking-Portal, in dem Kunden ihre Sendungen verfolgen.'],
      ['kv', [['Kunde', 'NordLog Spedition GmbH, 220 Mitarbeitende, Zwei-Schicht-Betrieb'], ['Auftragnehmer', 'CodeHafen Software GmbH, Projektteam mit 5 Personen'], ['Budget', '180.000 Euro, Go-live vor dem Weihnachtsgeschäft'], ['Systeme', 'ERP-System (vorhanden), 60 Handscanner (neu), WLAN in der Halle (neu)']]],
    ]});
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Projekt planen (25 Punkte)',
    ctx: [['h3', 'Anlage 1: Vorgangsliste LagerPilot (Dauer in Arbeitstagen)'],
      ['table', ['Nr.', 'Vorgang', 'Dauer', 'Vorgänger'], [['A', 'Ist-Analyse', '4', '-'], ['B', 'Pflichtenheft', '3', 'A'], ['C', 'Datenbankentwurf', '5', 'B'], ['D', 'Scanner-App', '8', 'B'], ['E', 'Backend/API', '10', 'C'],
        ['F', 'Tracking-Portal', '6', 'C'], ['G', 'Integration', '4', 'D, E'], ['H', 'Systemtest', '3', 'F, G'], ['I', 'Schulung', '2', 'G'], ['J', 'Go-live', '1', 'H, I']]]],
    tasks: [
      {pts: 4, topic: 'Projektmerkmale', q: 'Nennen Sie vier Merkmale, die das Vorhaben LagerPilot nach DIN 69901 zu einem Projekt machen, und belegen Sie jedes Merkmal mit einer Angabe aus der Ausgangssituation.',
        a: ['- **Einmaligkeit / Neuartigkeit:** LagerPilot wird für die Abläufe von NordLog neu entwickelt.', '- **Zeitliche Begrenzung:** fester Endtermin (Go-live vor dem Weihnachtsgeschäft).', '- **Begrenzte Ressourcen:** Budget 180.000 Euro, Team mit 5 Personen.', '- **Klare Zielvorgabe:** papierloser Wareneingang und Kommissionierung, weniger Fehlbestände.', '- Weitere: **Komplexität** (Scanner, ERP, Portal), **Risiko**, **projektspezifische Organisation** (Team aus Kunde und Dienstleister).', 'Je Merkmal mit Beleg 1 Punkt.'],
        see: ['ps-phasen']},
      {pts: 8, rows: 8, topic: 'Netzplan', q: 'Erstellen Sie zu Anlage 1 einen Netzplan (Vorgangsknotennetz). Berechnen Sie für alle Vorgänge FAZ, FEZ, SAZ, SEZ und den Gesamtpuffer (GP). Tipp: Notieren Sie die Werte als Tabelle, wenn Sie nicht zeichnen möchten.',
        a: [['table', ['Vorgang', 'D', 'FAZ', 'FEZ', 'SAZ', 'SEZ', 'GP', 'FP'], V.map(([id, name, d, faz, fez, saz, sez, gp, fp]) => [id.toUpperCase() + ' ' + name, String(d), String(faz), String(fez), String(saz), String(sez), gp ? '**' + gp + '**' : '0', String(fp)])],
          'Bewertung: Vorwärtsrechnung 3 P, Rückwärtsrechnung 3 P, Puffer 2 P. Folgefehler werden nicht doppelt abgezogen.'],
        sol: [['walk', {t: 'Netzplan LagerPilot', steps: [
          {t: '**Ausgangslage:** Jeder Vorgang wird ein Knoten. Pfeile zeigen die Abhängigkeiten aus der Spalte Vorgänger. Oben stehen FAZ | Dauer | FEZ, unten SAZ | GP | SEZ.', b: [['diagram', net(0, 'Knoten mit Dauer, noch ohne Zeiten')]]},
          {t: '**Vorwärtsrechnung:** FAZ = größter FEZ aller Vorgänger, FEZ = FAZ + Dauer. Bei **G** laufen D (FEZ 15) und E (FEZ 22) zusammen: FAZ(G) = max(15, 22) = **22**. Bei **H**: max(18, 26) = **26**. Bei **J**: max(29, 28) = **29**. Projektdauer: **30 Tage**.', b: [['diagram', net(1, 'Nach der Vorwärtsrechnung')]]},
          {t: '**Rückwärtsrechnung:** SEZ = kleinster SAZ aller Nachfolger, SAZ = SEZ - Dauer. Start bei J mit SEZ = 30. Bei **G** (Nachfolger H mit SAZ 26 und I mit SAZ 27): SEZ = min(26, 27) = **26**. Bei **C** (Nachfolger E mit 12, F mit 20): **12**. Bei **B** (C mit 7, D mit 14): **7**.', b: [['diagram', net(2, 'Nach der Rückwärtsrechnung')]]},
          {t: '**Puffer:** GP = SAZ - FAZ. **D: 7**, **F: 8**, **I: 1**, alle anderen 0. Freier Puffer FP = FAZ des Nachfolgers - eigener FEZ: D: 22 - 15 = 7, F: 26 - 18 = 8, I: 29 - 28 = 1. Der kritische Pfad (GP = 0) ist hervorgehoben.', b: [['diagram', net(3, 'Fertiger Netzplan, kritischer Pfad A, B, C, E, G, H, J')]]},
        ]}]],
        see: ['ps-netzplan']},
      {pts: 4, topic: 'Kritischer Pfad', q: 'a) Geben Sie den kritischen Pfad und die Projektdauer an. b) Die Entwicklung der Scanner-App (D) verzögert sich um 5 Tage, das Backend (E) um 2 Tage. Wie wirken sich die Verzögerungen jeweils auf das Projektende aus?',
        a: ['a) Kritischer Pfad **A - B - C - E - G - H - J**, Dauer 4 + 3 + 5 + 10 + 4 + 3 + 1 = **30 Tage**.', 'b) **D + 5 Tage:** keine Auswirkung, D hat 7 Tage Gesamtpuffer. **E + 2 Tage:** E ist kritisch (GP 0), das Projekt endet **2 Tage später** (Tag 32).', 'Hinweis: Treten beide Verzögerungen ein, gilt: D endet an Tag 20, E an Tag 24; G startet bei max(20, 24) = 24, Projektende Tag 32.'],
        see: ['ps-netzplan']},
      {pts: 6, topic: 'Nutzwertanalyse', q: 'NordLog prüft, ob statt der Individualentwicklung die Standardsoftware **LagerMax WMS** gekauft werden soll. Führen Sie mit den Angaben eine Nutzwertanalyse durch und geben Sie eine Empfehlung.',
        ctx: [['table', ['Kriterium', 'Gewichtung', 'LagerMax WMS (Punkte 1 bis 10)', 'Individualentwicklung (Punkte 1 bis 10)'], [['Funktionsumfang', '35 %', '6', '9'], ['Kosten', '25 %', '8', '4'], ['Anpassbarkeit an Abläufe', '20 %', '3', '10'], ['Support und Wartung', '10 %', '9', '6'], ['Einführungszeit', '10 %', '9', '3']]]],
        a: [['table', ['Kriterium', 'Gewicht', 'LagerMax gewichtet', 'Individual gewichtet'], [['Funktionsumfang', '0,35', '6 x 0,35 = 2,10', '9 x 0,35 = 3,15'], ['Kosten', '0,25', '2,00', '1,00'], ['Anpassbarkeit', '0,20', '0,60', '2,00'], ['Support', '0,10', '0,90', '0,60'], ['Einführungszeit', '0,10', '0,90', '0,30'], ['**Nutzwert**', '1,00', '**6,50**', '**7,05**']]],
          'Empfehlung: **Individualentwicklung** (7,05 > 6,50), vor allem wegen Funktionsumfang und Anpassbarkeit an die NordLog-Abläufe. Die Standardsoftware ist günstiger und schneller verfügbar, passt aber schlechter.',
          'Bewertung: Rechenweg 4 P (je Alternative 2 P), Ergebnis und Empfehlung 2 P.'],
        sol: [['chart', {kind: 'bar', w: 720, h: 300, labels: ['Funktion', 'Kosten', 'Anpassbar', 'Support', 'Einführung'], series: [{n: 'LagerMax WMS', d: [2.1, 2.0, 0.6, 0.9, 0.9], k: 'text3'}, {n: 'Individualentwicklung', d: [3.15, 1.0, 2.0, 0.6, 0.3], k: 'accent'}], vals: true, ymax: 3.5, yl: 'gewichtete Punkte', cap: 'Gewichtete Teilnutzen: Die Individualentwicklung gewinnt bei Funktionsumfang und Anpassbarkeit deutlich, verliert bei Kosten und Zeit.'}]],
        see: ['ps-beschaffung', 'ps-kosten']},
      {pts: 3, topic: 'Make or Buy', q: 'Nennen Sie zwei Schwächen der Nutzwertanalyse und ein Kriterium, das bei der Make-or-buy-Entscheidung zusätzlich betrachtet werden sollte.',
        a: ['- **Subjektivität:** Gewichtung und Punktevergabe sind Einschätzungen; kleine Änderungen können das Ergebnis drehen (hier: Kosten mit 35 % statt 25 % gewichtet).', '- **Scheingenauigkeit:** Zahlen wie 7,05 wirken exakt, beruhen aber auf groben Schätzungen.', '- Kriterien können sich **überschneiden** (zum Beispiel Kosten und Einführungszeit).', 'Zusätzliche Kriterien: **Gesamtkosten über die Nutzungsdauer (TCO)**, Abhängigkeit vom Hersteller (Lock-in), Know-how im eigenen Haus, strategische Bedeutung, Datenschutz und Hosting.'],
        see: ['ps-tco']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Anforderungen modellieren (25 Punkte)',
    intro: 'Im Interview mit dem Lagerleiter wurden folgende Abläufe aufgenommen: Lagermitarbeitende buchen den **Wareneingang** und bearbeiten **Kommissionieraufträge**; in beiden Fällen wird eine **Palette gescannt**. Fehlt bei der Kommissionierung Ware, kann ein **Fehlbestand gemeldet** werden. Mitarbeitende **buchen Lagerplätze um**. Schichtleitungen können alles, was Lagermitarbeitende können, und führen zusätzlich die **Inventur** durch; dabei wird der **Bestand an das ERP-System gemeldet**. Kunden **verfolgen ihre Sendung** im Portal.',
    tasks: [
      {pts: 7, rows: 8, topic: 'Use-Case-Diagramm', q: 'Erstellen Sie ein UML-Anwendungsfalldiagramm für LagerPilot mit allen Akteuren, Anwendungsfällen, der Generalisierung sowie den include- und extend-Beziehungen.',
        a: ['Akteure: **Lagermitarbeiter**, **Schichtleiter** (Generalisierung: erbt von Lagermitarbeiter), **Kunde**, **ERP-System** (Fremdsystem als Akteur).', '- «include»: Wareneingang buchen und Kommissionierauftrag bearbeiten **schließen Palette scannen immer ein**; Inventur durchführen schließt Bestand an ERP melden ein.', '- «extend»: **Fehlbestand melden erweitert** Kommissionierauftrag bearbeiten (nur im Bedarfsfall). Der Pfeil zeigt auf den **Basisfall**.', 'Bewertung: Systemgrenze und Akteure 2 P, Anwendungsfälle 2 P, include/extend mit richtiger Pfeilrichtung 2 P, Generalisierung 1 P.'],
        sol: [['diagram', {w: 820, h: 470, keep: 680, cap: 'Musterlösung: Anwendungsfalldiagramm LagerPilot', nodes: [
          {id: 'sys', k: 'group', x: 420, y: 235, w: 520, h: 445, t: 'LagerPilot', s: 'soft'},
          {id: 'lm', k: 'actor', x: 70, y: 110, t: 'Lagermitarbeiter', w: 40, h: 56}, {id: 'sl', k: 'actor', x: 70, y: 330, t: 'Schichtleiter', w: 40, h: 56},
          {id: 'erp', k: 'actor', x: 770, y: 270, t: 'ERP-System', w: 40, h: 56}, {id: 'kd', k: 'actor', x: 770, y: 380, t: 'Kunde', w: 40, h: 56},
          {id: 'u1', k: 'oval', x: 290, y: 70, t: 'Wareneingang buchen', w: 190, h: 46}, {id: 'u2', k: 'oval', x: 290, y: 165, t: 'Kommissionierauftrag bearbeiten', w: 220, h: 50, s: 'accent'},
          {id: 'u6', k: 'oval', x: 290, y: 260, t: 'Lagerplatz umbuchen', w: 180, h: 46}, {id: 'u5', k: 'oval', x: 290, y: 365, t: 'Inventur durchführen', w: 190, h: 46},
          {id: 'u3', k: 'oval', x: 560, y: 110, t: 'Palette scannen', w: 160, h: 46}, {id: 'u4', k: 'oval', x: 560, y: 205, t: 'Fehlbestand melden', w: 170, h: 46},
          {id: 'u8', k: 'oval', x: 560, y: 300, t: 'Bestand an ERP melden', w: 180, h: 46}, {id: 'u7', k: 'oval', x: 560, y: 405, t: 'Sendung verfolgen', w: 170, h: 46},
        ], edges: [
          {a: 'lm', b: 'u1', ea: 'none'}, {a: 'lm', b: 'u2', ea: 'none'}, {a: 'lm', b: 'u6', ea: 'none'}, {a: 'sl', b: 'u5', ea: 'none'},
          {a: 'sl', b: 'lm', via: [[22, 330], [22, 110]], ea: 'tri'}, {a: 'erp', b: 'u8', ea: 'none'}, {a: 'kd', b: 'u7', ea: 'none'},
          {a: 'u1', b: 'u3', k: 'dash', ea: 'open', t: '«include»'}, {a: 'u2', b: 'u3', k: 'dash', ea: 'open', t: '«include»', lo: [10, 12]},
          {a: 'u4', b: 'u2', k: 'dash', ea: 'open', t: '«extend»'}, {a: 'u5', b: 'u8', k: 'dash', ea: 'open', t: '«include»'},
        ]}],
        ['warn', 'Häufige Fehler: Pfeilrichtung bei «extend» (zeigt zum **Basisfall**), Fremdsysteme vergessen, Abläufe (Reihenfolge) ins Use-Case-Diagramm zeichnen. Reihenfolgen gehören ins Aktivitätsdiagramm.']],
        see: ['ps-usecase']},
      {pts: 8, rows: 9, topic: 'Aktivitätsdiagramm', q: 'Modellieren Sie die Kommissionierung als UML-Aktivitätsdiagramm: Der Mitarbeitende ruft einen Auftrag am Scanner ab. Für **jede Position** geht er zum Lagerplatz und scannt ihn; ist es der falsche Platz, erscheint ein Hinweis und er scannt erneut. Dann scannt er den Artikel und gibt die Menge ein. Ist die Menge kleiner als die Sollmenge, meldet er einen Fehlbestand. Sind alle Positionen erledigt, werden **gleichzeitig** der Lieferschein gedruckt und der Bestand gebucht. Danach endet der Ablauf.',
        a: ['Elemente: Startknoten, Aktionen, **Entscheidungen mit Wächtern** [Platz falsch] / [Platz korrekt], [Menge < Soll] / [sonst], **Schleife** über die Positionen ([weitere Position] zurück zum Merge-Knoten), **Gabelung und Vereinigung** (Fork/Join) für die parallelen Aktionen, Endknoten.', 'Bewertung: Aktionen 2 P, Verzweigungen mit Wächtern 2 P, Schleife 2 P, Fork/Join 1 P, Start/Ende 1 P.'],
        sol: [['diagram', {w: 760, h: 820, keep: 560, cap: 'Musterlösung: Aktivitätsdiagramm Kommissionierung', nodes: [
          {id: 's', k: 'dot', x: 380, y: 28}, {id: 'a1', k: 'round', x: 380, y: 85, t: 'Auftrag am Scanner abrufen', w: 240, h: 40, s: 'accent'},
          {id: 'm1', k: 'diamond', x: 380, y: 148, w: 34, h: 34, t: ''}, {id: 'a2', k: 'round', x: 380, y: 210, t: 'Zum Platz gehen, Platz scannen', w: 260, h: 40, s: 'accent'},
          {id: 'd1', k: 'diamond', x: 380, y: 280, w: 40, h: 40, t: ''}, {id: 'h1', k: 'round', x: 620, y: 280, t: 'Hinweis anzeigen', w: 170, h: 40, s: 'accent'},
          {id: 'a3', k: 'round', x: 380, y: 355, t: 'Artikel scannen, Menge eingeben', w: 270, h: 40, s: 'accent'},
          {id: 'd2', k: 'diamond', x: 380, y: 425, w: 40, h: 40, t: ''}, {id: 'a4', k: 'round', x: 620, y: 425, t: 'Fehlbestand melden', w: 180, h: 40, s: 'accent'},
          {id: 'm2', k: 'diamond', x: 380, y: 495, w: 34, h: 34, t: ''}, {id: 'd3', k: 'diamond', x: 380, y: 560, w: 40, h: 40, t: ''},
          {id: 'f1', k: 'bar', x: 380, y: 625, w: 340, h: 8}, {id: 'p1', k: 'round', x: 250, y: 685, t: 'Lieferschein drucken', w: 190, h: 40, s: 'accent'},
          {id: 'p2', k: 'round', x: 510, y: 685, t: 'Bestand buchen', w: 170, h: 40, s: 'accent'}, {id: 'j1', k: 'bar', x: 380, y: 745, w: 340, h: 8}, {id: 'e', k: 'ring', x: 380, y: 795},
        ], edges: [
          {a: 's', b: 'a1'}, {a: 'a1', b: 'm1'}, {a: 'm1', b: 'a2'}, {a: 'a2', b: 'd1'}, {a: 'd1', b: 'h1', t: '[Platz falsch]'}, {a: 'h1', b: 'a2', via: [[620, 210]]},
          {a: 'd1', b: 'a3', t: '[Platz korrekt]', lo: [52, 0]}, {a: 'a3', b: 'd2'}, {a: 'd2', b: 'a4', t: '[Menge < Soll]'}, {a: 'a4', b: 'm2', via: [[620, 495]]},
          {a: 'd2', b: 'm2', t: '[sonst]', lo: [30, 0]}, {a: 'm2', b: 'd3'}, {a: 'd3', b: 'm1', via: [[130, 560], [130, 148]], t: '[weitere Position]', lo: [-50, 0]},
          {a: 'd3', b: 'f1', t: '[alle erledigt]', lo: [50, 0]}, {a: [250, 629], b: 'p1'}, {a: [510, 629], b: 'p2'},
          {a: 'p1', b: [250, 741]}, {a: 'p2', b: [510, 741]}, {a: 'j1', b: 'e'},
        ]}],
        ['tip', 'Rauten haben zwei Rollen: **Verzweigung** (ein Eingang, mehrere bewachte Ausgänge) und **Zusammenführung** (mehrere Eingänge, ein Ausgang). Die Schleife braucht einen Zusammenführungsknoten vor der ersten Aktion der Position.']],
        see: ['ps-aktivitaet']},
      {pts: 6, topic: 'Klassendiagramm', q: 'Anlage 2 zeigt einen Ausschnitt des Klassendiagramms. a) Erläutern Sie die Multiplizitäten zwischen Lagerplatz und Palette. b) Erklären Sie am Beispiel Auftrag und Auftragsposition den Unterschied zwischen Komposition und Aggregation. c) Es gibt Kühlplätze mit zusätzlicher Solltemperatur. Wie bilden Sie das im Modell ab?',
        ctx: [['h3', 'Anlage 2: Klassendiagramm (Ausschnitt)'], ['diagram', {w: 820, h: 330, keep: 680, cap: 'Klassendiagramm LagerPilot (Ausschnitt)', nodes: [
          {id: 'la', k: 'cls', x: 100, y: 80, w: 170, t: {name: 'Lager', attrs: ['- standort: String']}}, {id: 'lp', k: 'cls', x: 370, y: 80, w: 200, t: {name: 'Lagerplatz', attrs: ['- platzNr: String', '- maxGewicht: int']}},
          {id: 'pa', k: 'cls', x: 660, y: 80, w: 180, t: {name: 'Palette', attrs: ['- nve: String', '- gewicht: int']}}, {id: 'ar', k: 'cls', x: 660, y: 250, w: 190, t: {name: 'Artikel', attrs: ['- artikelNr: String', '- bezeichnung: String']}},
          {id: 'po', k: 'cls', x: 370, y: 250, w: 200, t: {name: 'Auftragsposition', attrs: ['- menge: int']}}, {id: 'au', k: 'cls', x: 100, y: 250, w: 170, t: {name: 'Auftrag', attrs: ['- auftragNr: int', '- datum: Date']}},
        ], edges: [
          {a: 'la', b: 'lp', sa: 'diaf', ea: 'none', ta: '1', tb: '1..*'}, {a: 'lp', b: 'pa', ea: 'none', ta: '0..1', tb: '0..1'}, {a: 'pa', b: 'ar', ea: 'none', ta: '*', tb: '1'},
          {a: 'au', b: 'po', sa: 'diaf', ea: 'none', ta: '1', tb: '1..*'}, {a: 'po', b: 'ar', ea: 'none', ta: '*', tb: '1'},
        ]}]],
        a: ['a) Ein **Lagerplatz trägt keine oder eine Palette** (0..1, frei oder belegt). Eine **Palette steht auf keinem oder einem Lagerplatz** (0 zum Beispiel während des Transports oder im Wareneingang).', 'b) **Komposition** (gefüllte Raute): Die Positionen sind **existenzabhängig**; wird der Auftrag gelöscht, werden seine Positionen mit gelöscht, eine Position gehört genau zu einem Auftrag. Bei einer **Aggregation** (leere Raute) könnten die Teile auch ohne das Ganze existieren (zum Beispiel Paletten in einer Tour).', 'c) **Vererbung (Generalisierung):** Klasse **Kuehlplatz** erbt von Lagerplatz und ergänzt das Attribut **- solltemperatur: double**. Ein Kühlplatz ist ein Lagerplatz ("ist-ein"-Beziehung) und kann überall verwendet werden, wo ein Lagerplatz erwartet wird.'],
        sol: [['diagram', {w: 520, h: 230, cap: 'Erweiterung zu c): Kuehlplatz spezialisiert Lagerplatz (Dreieck zeigt zur Oberklasse)', nodes: [
          {id: 'lp', k: 'cls', x: 260, y: 55, w: 200, t: {name: 'Lagerplatz', attrs: ['- platzNr: String', '- maxGewicht: int']}},
          {id: 'kp', k: 'cls', x: 260, y: 180, w: 220, s: 'accent', t: {name: 'Kuehlplatz', attrs: ['- solltemperatur: double']}},
        ], edges: [{a: 'kp', b: 'lp', ea: 'tri'}]}]],
        see: ['ps-klassen']},
      {pts: 4, topic: 'REST-Schnittstelle', q: 'Die Scanner-App kommuniziert über eine REST-API mit dem Backend. Geben Sie für die folgenden Fälle die HTTP-Methode bzw. den Statuscode an: a) Lagerplatz B-12-03 abfragen, b) eine neue Palette anlegen (Methode und erwarteter Statuscode bei Erfolg), c) die Palette existiert nicht, d) den Bestand einer Palette vollständig ersetzen.',
        a: ['a) **GET** /lagerplaetze/B-12-03 (Antwort 200 OK)', 'b) **POST** /paletten, Erfolg: **201 Created** (mit Location-Header)', 'c) **404 Not Found**', 'd) **PUT** /paletten/{nve} (vollständig ersetzen; PATCH wäre teilweise ändern)'],
        see: ['eua-webapi']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Daten modellieren und Qualität sichern (25 Punkte)',
    tasks: [
      {pts: 8, rows: 9, topic: 'ER-Modell', q: 'Für das Tracking-Portal gilt: Ein **Kunde** (Kundennummer, Firma, Ort) erteilt beliebig viele **Sendungen** (Sendungsnummer, Gewicht, Status); jede Sendung gehört zu genau einem Kunden. Eine Sendung kann wegen Umladung auf **mehreren Touren** transportiert werden, eine Tour (Tournummer, Datum, Kennzeichen) transportiert viele Sendungen; je Sendung und Tour wird die **Stoppnummer** gespeichert. Jede Tour hat genau einen **Fahrer** (Personalnummer, Name), ein Fahrer fährt viele Touren. a) Erstellen Sie ein ER-Modell mit Kardinalitäten. b) Überführen Sie es in ein relationales Modell mit Primär- und Fremdschlüsseln.',
        a: ['a) Entitäten Kunde, Sendung, Tour, Fahrer. Beziehungen: Kunde **1 : n** Sendung, Sendung **m : n** Tour (Attribut Stoppnummer an der Beziehung), Fahrer **1 : n** Tour.', 'b) Relationen (PK unterstrichen bzw. markiert):', '- **kunde** (PK kundennr, firma, ort)', '- **sendung** (PK sendungsnr, gewicht, status, FK kundennr)', '- **fahrer** (PK personalnr, name)', '- **tour** (PK tournr, datum, kennzeichen, FK personalnr)', '- **tour_sendung** (PK/FK tournr, PK/FK sendungsnr, stoppnr): die m:n-Beziehung wird zur eigenen Tabelle mit zusammengesetztem Primärschlüssel.', 'Bewertung: ERM 4 P (Entitäten, Beziehungen, Kardinalitäten), Relationen 4 P (1:n als FK auf der n-Seite, m:n als Zwischentabelle).'],
        sol: [['walk', {t: 'Vom Text zum Relationenmodell', steps: [
          {t: '**Schritt 1, ER-Modell (Chen-Notation):** Substantive werden Entitäten, Verben Beziehungen. Das Attribut Stoppnummer gehört zu keiner Entität allein, sondern zur Beziehung "transportiert".', b: [['diagram', {w: 760, h: 330, keep: 600, cap: 'ER-Modell mit Kardinalitäten', nodes: [
            {id: 'k', k: 'box', x: 110, y: 70, w: 170, h: 56, t: ['Kunde', 'kundennr, firma, ort'], s: 'accent', b: true}, {id: 'r1', k: 'diamond', x: 330, y: 70, w: 120, h: 56, t: 'erteilt'},
            {id: 's', k: 'box', x: 570, y: 70, w: 210, h: 56, t: ['Sendung', 'sendungsnr, gewicht, status'], s: 'accent', b: true}, {id: 'r2', k: 'diamond', x: 570, y: 175, w: 170, h: 60, t: ['transportiert', '(stoppnr)']},
            {id: 't', k: 'box', x: 570, y: 280, w: 220, h: 56, t: ['Tour', 'tournr, datum, kennzeichen'], s: 'accent', b: true}, {id: 'r3', k: 'diamond', x: 330, y: 280, w: 110, h: 56, t: 'fährt'},
            {id: 'f', k: 'box', x: 110, y: 280, w: 170, h: 56, t: ['Fahrer', 'personalnr, name'], s: 'accent', b: true},
          ], edges: [{a: 'k', b: 'r1', ea: 'none', ta: '1'}, {a: 'r1', b: 's', ea: 'none', tb: 'n'}, {a: 's', b: 'r2', ea: 'none', ta: 'm'}, {a: 'r2', b: 't', ea: 'none', tb: 'n'},
            {a: 'f', b: 'r3', ea: 'none', ta: '1'}, {a: 'r3', b: 't', ea: 'none', tb: 'n'}]}]]},
          {t: '**Schritt 2, 1:n-Beziehungen:** Der Primärschlüssel der 1-Seite wandert als **Fremdschlüssel auf die n-Seite**: sendung bekommt kundennr, tour bekommt personalnr.', b: [['table', ['Beziehung', 'Regel', 'Ergebnis'], [['Kunde 1:n Sendung', 'FK auf n-Seite', 'sendung.kundennr'], ['Fahrer 1:n Tour', 'FK auf n-Seite', 'tour.personalnr']]]]},
          {t: '**Schritt 3, m:n-Beziehung:** wird zu einer **eigenen Tabelle**. Ihr Primärschlüssel besteht aus beiden Fremdschlüsseln; das Beziehungsattribut stoppnr kommt mit.', b: [['diagram', {w: 820, h: 300, keep: 680, cap: 'Relationenmodell (PK = Primärschlüssel, FK = Fremdschlüssel)', nodes: [
            {id: 'k', k: 'cls', x: 100, y: 75, w: 170, t: {name: 'kunde', attrs: ['PK kundennr', 'firma', 'ort']}}, {id: 's', k: 'cls', x: 330, y: 75, w: 180, t: {name: 'sendung', attrs: ['PK sendungsnr', 'gewicht', 'status', 'FK kundennr']}},
            {id: 'ts', k: 'cls', x: 560, y: 75, w: 190, s: 'accent', t: {name: 'tour_sendung', attrs: ['PK, FK tournr', 'PK, FK sendungsnr', 'stoppnr']}},
            {id: 't', k: 'cls', x: 560, y: 235, w: 190, t: {name: 'tour', attrs: ['PK tournr', 'datum', 'kennzeichen', 'FK personalnr']}}, {id: 'f', k: 'cls', x: 300, y: 235, w: 170, t: {name: 'fahrer', attrs: ['PK personalnr', 'name']}},
          ], edges: [{a: 's', b: 'k', ea: 'none', sa: 'many', tb: '', ta: ''}, {a: 'ts', b: 's', ea: 'none', sa: 'many'}, {a: 'ts', b: 't', ea: 'none', sa: 'many'}, {a: 't', b: 'f', ea: 'none', sa: 'many'}]}]]},
        ]}]],
        see: ['ps-er', 'ps-relational', 'ps-ermrm']},
      {pts: 7, rows: 8, topic: 'Normalisierung', q: 'Die bisherige Access-Datenbank enthält die Tabelle in Anlage 3. a) Nennen Sie zwei Anomalien, die bei dieser Tabelle auftreten können. b) Überführen Sie die Tabelle schrittweise in die dritte Normalform.',
        ctx: [['h3', 'Anlage 3: Tabelle Tourliste'], ['table', ['TourNr', 'Datum', 'Kennzeichen', 'FahrerNr', 'Fahrer', 'Sendungen (Nr: Kunde, Ort)'], [['T100', '03.03.2026', 'HB-NL 401', 'F7', 'Jana Wiese', 'S501: Hansa Kaffee, Bremen; S502: Fisch & Co., Bremerhaven'], ['T101', '03.03.2026', 'HB-NL 388', 'F2', 'Tom Kruse', 'S503: Hansa Kaffee, Bremen'], ['T102', '04.03.2026', 'HB-NL 401', 'F7', 'Jana Wiese', 'S502: Fisch & Co., Bremerhaven; S504: Weser Möbel, Verden']]]],
        a: ['a) **Änderungsanomalie:** Zieht Hansa Kaffee um, muss der Ort in vielen Zeilen geändert werden, sonst widersprechen sich die Daten. **Einfügeanomalie:** Ein neuer Fahrer ohne Tour kann nicht erfasst werden. **Löschanomalie:** Wird Tour T101 gelöscht, geht die Information über Tom Kruse verloren.', 'b) Ergebnis in 3NF:', '- **fahrer** (PK fahrernr, name)', '- **tour** (PK tournr, datum, kennzeichen, FK fahrernr)', '- **kunde** (PK kundennr, name, ort)', '- **sendung** (PK sendungsnr, FK kundennr)', '- **tour_sendung** (PK/FK tournr, PK/FK sendungsnr)', 'Bewertung: Anomalien 2 P, 1NF 1 P, 2NF 2 P, 3NF 2 P.'],
        sol: [['walk', {t: 'Normalisierung der Tourliste', steps: [
          {t: '**1. Normalform:** Alle Attributwerte sind **atomar**. Die Liste in "Sendungen" wird aufgelöst: eine Zeile je Tour und Sendung, Kunde und Ort werden eigene Spalten. Schlüssel: (TourNr, SendungNr).', b: [['table', ['TourNr', 'SendungNr', 'Datum', 'Kennzeichen', 'FahrerNr', 'Fahrer', 'Kunde', 'Ort'], [['T100', 'S501', '03.03.2026', 'HB-NL 401', 'F7', 'Jana Wiese', 'Hansa Kaffee', 'Bremen'], ['T100', 'S502', '03.03.2026', 'HB-NL 401', 'F7', 'Jana Wiese', 'Fisch & Co.', 'Bremerhaven'], ['T101', 'S503', '03.03.2026', 'HB-NL 388', 'F2', 'Tom Kruse', 'Hansa Kaffee', 'Bremen'], ['T102', 'S502', '04.03.2026', 'HB-NL 401', 'F7', 'Jana Wiese', 'Fisch & Co.', 'Bremerhaven'], ['T102', 'S504', '04.03.2026', 'HB-NL 401', 'F7', 'Jana Wiese', 'Weser Möbel', 'Verden']]]]},
          {t: '**2. Normalform:** Kein Nichtschlüsselattribut hängt nur von **einem Teil** des zusammengesetzten Schlüssels ab. Datum, Kennzeichen, Fahrer hängen nur an TourNr; Kunde und Ort nur an SendungNr. Also abspalten.', b: [['row', [['table', ['tour: TourNr', 'Datum', 'Kennz.', 'FahrerNr', 'Fahrer'], [['T100', '03.03.', 'HB-NL 401', 'F7', 'Jana Wiese'], ['T101', '03.03.', 'HB-NL 388', 'F2', 'Tom Kruse'], ['T102', '04.03.', 'HB-NL 401', 'F7', 'Jana Wiese']]], ['table', ['sendung: SendungNr', 'Kunde', 'Ort'], [['S501', 'Hansa Kaffee', 'Bremen'], ['S502', 'Fisch & Co.', 'Bremerhaven'], ['S503', 'Hansa Kaffee', 'Bremen'], ['S504', 'Weser Möbel', 'Verden']]], ['table', ['tour_sendung: TourNr', 'SendungNr'], [['T100', 'S501'], ['T100', 'S502'], ['T101', 'S503'], ['T102', 'S502'], ['T102', 'S504']]]]]]},
          {t: '**3. Normalform:** Keine **transitiven Abhängigkeiten** (Nichtschlüssel hängt von Nichtschlüssel ab). In tour gilt TourNr → FahrerNr → Fahrer, in sendung SendungNr → Kunde → Ort. Fahrer und Kunde werden eigene Tabellen; für Kunden wird ein künstlicher Schlüssel eingeführt.', b: [['row', [['table', ['fahrer: FahrerNr', 'Name'], [['F7', 'Jana Wiese'], ['F2', 'Tom Kruse']]], ['table', ['kunde: KundenNr', 'Name', 'Ort'], [['K1', 'Hansa Kaffee', 'Bremen'], ['K2', 'Fisch & Co.', 'Bremerhaven'], ['K3', 'Weser Möbel', 'Verden']]], ['table', ['sendung: SendungNr', 'KundenNr'], [['S501', 'K1'], ['S502', 'K2'], ['S503', 'K1'], ['S504', 'K3']]]]]]},
        ]}], ['merk', 'Merksatz: Jedes Nichtschlüsselattribut hängt vom **Schlüssel** (1NF), vom **ganzen Schlüssel** (2NF) und von **nichts als dem Schlüssel** (3NF) ab.']],
        see: ['ps-normalisierung']},
      {pts: 6, topic: 'Äquivalenzklassen', q: 'Beim Wareneingang wird das Palettengewicht in ganzen Kilogramm erfasst. Erlaubt sind 1 bis 1.200 kg; Paletten **über 1.000 kg** dürfen nur auf Schwerlastplätze. Bilden Sie die Äquivalenzklassen (gültig und ungültig) und geben Sie mithilfe der Grenzwertanalyse konkrete Testwerte mit erwartetem Ergebnis an.',
        a: [['table', ['Klasse', 'Bereich', 'Repräsentant', 'Grenzwerte', 'Erwartet'], [['ungültig 1', 'kleiner 1', '-5', '0', 'Fehlermeldung'], ['gültig 1 (normal)', '1 bis 1.000', '500', '1, 1.000', 'Normalplatz'], ['gültig 2 (schwer)', '1.001 bis 1.200', '1.100', '1.001, 1.200', 'Schwerlastplatz'], ['ungültig 2', 'größer 1.200', '1.500', '1.201', 'Fehlermeldung'], ['ungültig 3', 'keine ganze Zahl', '"abc", 12,5', '-', 'Fehlermeldung']]],
          'Bewertung: Klassen 3 P, Grenzwerte mit erwartetem Ergebnis 3 P.'],
        sol: [['diagram', {w: 760, h: 120, keep: 600, cap: 'Zahlenstrahl: Klassengrenzen und Testwerte (Grenzwerte jeweils auf beiden Seiten einer Grenze)', nodes: [
          {id: 'u1', k: 'box', x: 80, y: 50, w: 140, h: 44, t: ['ungültig', '< 1'], s: 'bad'}, {id: 'g1', k: 'box', x: 290, y: 50, w: 260, h: 44, t: ['gültig: Normalplatz', '1 ... 1.000'], s: 'ok'},
          {id: 'g2', k: 'box', x: 520, y: 50, w: 180, h: 44, t: ['gültig: Schwerlast', '1.001 ... 1.200'], s: 'gold'}, {id: 'u2', k: 'box', x: 690, y: 50, w: 140, h: 44, t: ['ungültig', '> 1.200'], s: 'bad'},
          {id: 'l', k: 'text', x: 380, y: 102, t: 'Testwerte: 0 | 1 | 1.000 | 1.001 | 1.200 | 1.201', w: 10, h: 10, mw: 700},
        ], edges: []}]],
        see: ['eua-testfaelle']},
      {pts: 4, topic: 'Testarten', q: 'Ordnen Sie den Situationen die passende Testart zu.',
        match: {keys: ['Regressionstest', 'Lasttest', 'Abnahmetest', 'Integrationstest', 'Smoke-Test'], items: [
          ['Nach einer Fehlerkorrektur in der Bestandsbuchung werden alle bisherigen Testfälle erneut ausgeführt.', 0],
          ['Es wird geprüft, ob 60 Scanner gleichzeitig Buchungen absenden können, ohne dass die Antwortzeit über 2 Sekunden steigt.', 1],
          ['Der Lagerleiter prüft anhand des Pflichtenhefts, ob das System vertragsgemäß ist, und unterschreibt das Protokoll.', 2],
          ['Backend und ERP-Schnittstelle werden erstmals zusammen getestet.', 3],
        ]},
        a: ['- **Regressionstest:** Nach Änderungen sicherstellen, dass bisher Funktionierendes weiter funktioniert.', '- **Lasttest:** Verhalten unter erwarteter (hoher) Last; beim **Stresstest** über die Grenze hinaus.', '- **Abnahmetest:** durch den Auftraggeber, Grundlage für die Abnahme und den Übergang der Gefahr (Werkvertrag).', '- **Integrationstest:** Zusammenspiel von Komponenten bzw. Schnittstellen.', 'Der Smoke-Test (schneller Grundfunktionstest nach dem Deployment) bleibt übrig.'],
        see: ['ps-testarten']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Infrastruktur und IT-Sicherheit (25 Punkte)',
    intro: 'In der Lagerhalle (120 m x 80 m, Stahlregale bis 12 m Höhe) wird ein neues WLAN für die 60 Handscanner aufgebaut. Für Lager, Büro, Scanner, Server, Gäste und Kameras sollen getrennte Netze (VLANs) entstehen.',
    tasks: [
      {pts: 6, topic: 'WLAN', q: 'a) Empfehlen Sie einen WLAN-Standard und ein Frequenzband für die Halle und begründen Sie zwei technische Aspekte. b) Die Scanner sollen sich nicht mit einem gemeinsamen Passwort anmelden. Beschreiben Sie das geeignete Verfahren und zwei Vorteile.',
        a: ['a) **Wi-Fi 6 / 6E (IEEE 802.11ax)**, vorzugsweise **5 GHz** (bzw. 6 GHz): mehr nicht überlappende Kanäle, weniger Störungen als 2,4 GHz; OFDMA für viele gleichzeitige Clients. Wegen der Stahlregale (Dämpfung, Reflexionen) eine **Ausleuchtungsmessung** und **viele Access Points** mit kleiner Sendeleistung; **schnelles Roaming (802.11r/k/v)**, weil sich die Scanner bewegen. 2,4 GHz hat größere Reichweite, aber nur drei überlappungsfreie Kanäle.', 'b) **WPA3-Enterprise mit IEEE 802.1X**: Jedes Gerät authentisiert sich mit Zertifikat oder eigenen Zugangsdaten über **EAP** am **RADIUS-Server**. Vorteile: einzelne Geräte sperrbar (verlorener Scanner), kein Passwort, das alle kennen; Protokollierung (Accounting); dynamische VLAN-Zuweisung.'],
        sol: [['seq', {w: 720, actors: ['Scanner (Supplicant)', 'Access Point (Authenticator)', 'RADIUS-Server'], cap: '802.1X: Erst nach Access-Accept gibt der Access Point den Zugang frei und weist das Scanner-VLAN zu.', steps: [
          [0, 1, 'Assoziierung, Port gesperrt', 's'], [1, 0, 'EAP-Request Identity', 'r'], [0, 1, 'EAP-Response (Gerätezertifikat)', 's'], [1, 2, 'RADIUS Access-Request', 's'], [2, 1, 'Access-Accept + VLAN 30', 'r'], [1, 0, 'EAP-Success, Schlüssel ausgehandelt', 'r']]}]],
        see: ['infra-wlan', 'infra-radius']},
      {pts: 8, rows: 7, topic: 'Subnetting', q: 'Für die VLANs steht das Netz **172.20.16.0/20** zur Verfügung. Es soll in **8 gleich große Subnetze** geteilt werden. a) Geben Sie Präfixlänge und Subnetzmaske der Subnetze an. b) Wie viele Hosts sind je Subnetz möglich? c) Geben Sie für das **1., 2. und 8. Subnetz** Netzadresse, ersten und letzten Host sowie Broadcast an.',
        a: ['a) 8 = 2³, also **3 Bits** mehr: **/23**, Maske **255.255.254.0**.', 'b) 32 - 23 = 9 Hostbits: 2⁹ - 2 = **510 Hosts**.', ['table', ['Subnetz', 'Netzadresse', 'erster Host', 'letzter Host', 'Broadcast'], [['1', '172.20.16.0/23', '172.20.16.1', '172.20.17.254', '172.20.17.255'], ['2', '172.20.18.0/23', '172.20.18.1', '172.20.19.254', '172.20.19.255'], ['8', '172.20.30.0/23', '172.20.30.1', '172.20.31.254', '172.20.31.255']]],
          'Bewertung: a) 2 P, b) 1 P, c) je Subnetz 5/3 P.'],
        sol: [['walk', {t: 'Subnetting 172.20.16.0/20 in 8 Teile', steps: [
          {t: '**Bits bestimmen:** 8 Subnetze brauchen 3 zusätzliche Netzbits (2³ = 8). Aus /20 wird **/23**.', b: [['table', ['', '3. Oktett (binär)', '4. Oktett'], [['/20 Maske', '1111 0000', '0000 0000'], ['/23 Maske', '1111 **111**0', '0000 0000'], ['Dezimal', '254', '0']]]]},
          {t: '**Schrittweite:** Das letzte Netzbit im 3. Oktett hat den Wert 2. Die Subnetze liegen also im Abstand von **2** im dritten Oktett: 16, 18, 20, ... 30.', b: [['table', ['Nr.', 'Netz', 'Bits 3. Oktett'], [['1', '172.20.**16**.0', '0001 **000**0'], ['2', '172.20.**18**.0', '0001 **001**0'], ['3', '172.20.20.0', '0001 010 0'], ['...', '...', '...'], ['8', '172.20.**30**.0', '0001 **111**0']]]]},
          {t: '**Bereich eines Subnetzes:** Broadcast = nächstes Netz minus 1. Subnetz 1 reicht von 172.20.16.0 bis 172.20.17.255 (zwei volle dritte Oktette = 512 Adressen, davon 510 nutzbar).', b: [['diagram', AP2.dg.flow(['Netz 172.20.16.0', 'Hosts .16.1 bis .17.254', 'Broadcast 172.20.17.255', 'nächstes Netz 172.20.18.0'], {w: 760, h: 100, styles: ['accent', 'ok', 'bad', 'plain'], bw: 170})]]},
          {t: '**Kontrolle:** Das 8. Subnetz endet mit 172.20.31.255. Das ist genau das Ende von 172.20.16.0/20 (16 + 16 - 1 = 31). Passt.', b: [['tool', 'subnet']]},
        ]}]],
        see: ['infra-subnetting']},
      {pts: 4, topic: 'IPv6', q: 'NordLog erhält vom Provider das Präfix **2001:db8:4a00::/48** und vergibt intern /64-Netze. a) Wie viele /64-Netze sind möglich? b) Geben Sie das dritte /64-Netz an (das erste hat die Subnetz-ID 0). c) Kürzen Sie 2001:0db8:4a00:0000:0000:0000:00a1:0001 normgerecht.',
        a: ['a) 64 - 48 = 16 Bits: 2¹⁶ = **65.536** Netze.', 'b) Subnetz-IDs 0, 1, 2: das dritte ist **2001:db8:4a00:2::/64**.', 'c) **2001:db8:4a00::a1:1** (führende Nullen je Block weglassen, die längste Nullfolge einmal durch :: ersetzen).'],
        sol: [['table', ['Bits', '1 bis 48', '49 bis 64', '65 bis 128'], [['Bedeutung', 'Präfix vom Provider: 2001:db8:4a00', 'Subnetz-ID (16 Bit): 0000 bis ffff', 'Interface-ID'], ['3. Netz', '2001:0db8:4a00', '**0002**', '0000:0000:0000:0000']]]],
        see: ['infra-ipv6', 'infra-ipv6sub']},
      {pts: 7, topic: 'RAID und Backup', q: 'Der Datenbankserver erhält **6 Festplatten zu je 4 TB**. a) Vergleichen Sie RAID 5 und RAID 10 hinsichtlich Nutzkapazität und Ausfallsicherheit. b) Der Administrator meint, mit RAID sei kein Backup nötig. Widerlegen Sie das und erläutern Sie die 3-2-1-Regel.',
        a: ['a) **RAID 5:** (6 - 1) x 4 TB = **20 TB** nutzbar, verkraftet den Ausfall **einer** beliebigen Platte (Parität verteilt). Schreiben langsamer (Paritätsberechnung), langer Rebuild mit Risiko.', '**RAID 10:** 6 / 2 x 4 TB = **12 TB** nutzbar, verkraftet mindestens **eine**, im günstigen Fall **bis zu drei** Platten (je eine pro Spiegelpaar). Schnell beim Schreiben, gut für Datenbanken.', 'b) RAID schützt nur vor **Plattenausfall**, nicht vor **Löschen, Ransomware, Softwarefehlern, Diebstahl, Brand**: Fehler werden sofort auf alle Platten gespiegelt. **3-2-1:** mindestens **3 Kopien** der Daten, auf **2 verschiedenen Medientypen**, davon **1 Kopie außer Haus** (offline oder in einer anderen Brandzone, möglichst unveränderlich).'],
        sol: [['diagram', {w: 760, h: 230, keep: 600, cap: 'RAID 10 mit 6 Platten: drei gespiegelte Paare (RAID 1), darüber Striping (RAID 0)', nodes: [
          {id: 'g1', k: 'group', x: 140, y: 125, w: 220, h: 170, t: 'Spiegel 1'}, {id: 'g2', k: 'group', x: 380, y: 125, w: 220, h: 170, t: 'Spiegel 2'}, {id: 'g3', k: 'group', x: 620, y: 125, w: 220, h: 170, t: 'Spiegel 3'},
          {id: 'd1', k: 'cyl', x: 90, y: 140, w: 80, h: 90, t: ['A1', '4 TB'], s: 'accent'}, {id: 'd2', k: 'cyl', x: 190, y: 140, w: 80, h: 90, t: ['A1', 'Kopie'], s: 'soft'},
          {id: 'd3', k: 'cyl', x: 330, y: 140, w: 80, h: 90, t: ['A2', '4 TB'], s: 'accent'}, {id: 'd4', k: 'cyl', x: 430, y: 140, w: 80, h: 90, t: ['A2', 'Kopie'], s: 'soft'},
          {id: 'd5', k: 'cyl', x: 570, y: 140, w: 80, h: 90, t: ['A3', '4 TB'], s: 'accent'}, {id: 'd6', k: 'cyl', x: 670, y: 140, w: 80, h: 90, t: ['A3', 'Kopie'], s: 'soft'},
        ], edges: []}], ['table', ['', 'RAID 5', 'RAID 10'], [['Nutzkapazität', '20 TB (83 %)', '12 TB (50 %)'], ['Ausfälle', 'genau 1', '1 sicher, bis 3 (je Paar 1)'], ['Schreibleistung', 'mittel (Parität)', 'hoch'], ['Rebuild', 'lang, alle Platten belastet', 'kurz, nur Partnerplatte kopieren']]], ['tool', 'raid']],
        see: ['infra-raid', 'infra-backup']},
    ],
  });
  AP2.exam.end(ID);
})();
