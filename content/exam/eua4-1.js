// Probeprüfung 4, Entwicklung und Umsetzung von Algorithmen: VitaMed Nord MVZ, TerminPlus.
(function () {
  const ID = 'exam4-eua';
  const clock = (t) => { const m = 480 + t * 15; return Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0'); };
  // Zeitstrahl 8:00 bis 12:00 in 15-Minuten-Einheiten; [Name, Start, Dauer, Stil]
  const day = (rows, cap) => ['diagram', AP2.dg.gantt(rows, {total: 16, unit: 40, tick: 2, left: 170, tickLabel: clock, cap})];
  const T = [['T1 08:00 bis 08:30', 0, 2], ['T2 08:45 bis 10:00', 3, 5], ['T3 09:50 bis 10:30', 7.333, 2.667], ['T4 11:00 bis 11:40', 12, 2.667]];
  const q = (items, cap) => ['diagram', AP2.dg.flow(items.length ? items : ['(leer)'], {w: 720, h: 96, bw: 110, styles: items.map((t) => (/Notfall/.test(t) ? 'bad' : 'accent')), cap})];
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 4 (Gesundheit)', t: 'Entwicklung und Umsetzung von Algorithmen: TerminPlus', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.eua,
    hint: 'Schwerpunkte: Intervall-Algorithmen mit Schreibtischtest, Warteschlangen und verkettete Listen, Hashtabellen, SQL mit bedingter Aggregation, Transaktionen und Rechten, Interfaces, Validierung, Wert- und Referenzübergabe.',
    intro: [['p', 'Sie entwickeln bei der **Elbcode IT-Solutions GmbH** die Terminplattform **TerminPlus** für das **VitaMed Nord MVZ**. Zeiten werden intern als **Minuten seit Mitternacht** gespeichert (8:00 Uhr = 480, 12:00 Uhr = 720). Ein Termin ist ein Paar **[beginn, ende]**; das Ende gehört nicht mehr zum Termin.']]});
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Freie Zeitfenster berechnen (25 Punkte)',
    tasks: [
      {pts: 3, topic: 'Intervalle', q: 'Geben Sie eine Bedingung an, mit der Sie prüfen, ob sich zwei Termine a = [a.beginn, a.ende] und b = [b.beginn, b.ende] **überschneiden**. Termine, die direkt aneinander anschließen (a.ende = b.beginn), überschneiden sich nicht.',
        a: [['code', 'pseudo', 'ueberschneidung = (a.beginn < b.ende) UND (b.beginn < a.ende)'], 'Begründung: Zwei Intervalle überschneiden sich genau dann **nicht**, wenn eines endet, bevor (oder genau wenn) das andere beginnt: a.ende <= b.beginn ODER b.ende <= a.beginn. Die Verneinung ergibt die Bedingung oben (De Morgan). Mit < statt <= zählen anschließende Termine nicht als Überschneidung.'],
        sol: [['diagram', AP2.dg.gantt([['a', 0, 4, 'accent'], ['b überschneidet', 3, 3, 'bad'], ['b schließt an', 4, 3, 'ok']], {total: 8, unit: 60, left: 160, cap: 'Rot überschneidet a, grün schließt direkt an (keine Überschneidung)'})]],
        see: ['eua-kontroll']},
      {pts: 10, rows: 14, topic: 'Algorithmus entwickeln', q: 'Entwickeln Sie die Funktion **freieFenster(termine, tagBeginn, tagEnde, dauer)**. termine ist eine nach beginn **aufsteigend sortierte** Liste von Terminen eines Arztes; Termine können sich (fehlerhaft) überschneiden. Die Funktion liefert eine Liste aller Lücken **[von, bis]** innerhalb der Sprechzeit, die **mindestens dauer** Minuten lang sind.',
        a: ['Idee: Ein Zeiger **frei_ab** merkt sich, ab wann der Arzt frei ist. Für jeden Termin: Ist die Lücke bis zu seinem Beginn lang genug, wird sie gespeichert. Danach rückt frei_ab auf das **Maximum** von frei_ab und Terminende (wichtig bei Überschneidungen). Am Schluss die Lücke bis zum Tagesende prüfen.',
          ['codes', [['pseudo', `funktion freieFenster(termine, tagBeginn, tagEnde, dauer)
    ergebnis = leere Liste
    frei_ab = tagBeginn
    für jeden t in termine
        wenn t.beginn - frei_ab >= dauer dann
            ergebnis.hinzufügen([frei_ab, t.beginn])
        ende wenn
        frei_ab = max(frei_ab, t.ende)
    ende für
    wenn tagEnde - frei_ab >= dauer dann
        ergebnis.hinzufügen([frei_ab, tagEnde])
    ende wenn
    rückgabe ergebnis
ende funktion`], ['java', `static List<int[]> freieFenster(List<int[]> termine, int tagBeginn, int tagEnde, int dauer) {
    List<int[]> ergebnis = new ArrayList<>();
    int freiAb = tagBeginn;
    for (int[] t : termine) {                 // t[0] = beginn, t[1] = ende
        if (t[0] - freiAb >= dauer) ergebnis.add(new int[]{freiAb, t[0]});
        freiAb = Math.max(freiAb, t[1]);
    }
    if (tagEnde - freiAb >= dauer) ergebnis.add(new int[]{freiAb, tagEnde});
    return ergebnis;
}`], ['python', `def freie_fenster(termine, tag_beginn, tag_ende, dauer):
    ergebnis = []
    frei_ab = tag_beginn
    for beginn, ende in termine:
        if beginn - frei_ab >= dauer:
            ergebnis.append([frei_ab, beginn])
        frei_ab = max(frei_ab, ende)
    if tag_ende - frei_ab >= dauer:
        ergebnis.append([frei_ab, tag_ende])
    return ergebnis`]]],
          'Bewertung: Initialisierung (1 P), Schleife (2 P), Lückenprüfung und Hinzufügen (2 P), Fortschreiben mit Maximum (3 P; ohne Maximum 1 P), Prüfung am Tagesende (1 P), Rückgabe (1 P).'],
        see: ['eua-algoexam', 'eua-pseudocode']},
      {pts: 7, rows: 9, topic: 'Schreibtischtest', q: 'Führen Sie einen Schreibtischtest Ihrer Funktion (oder der Musterlösung) durch: tagBeginn = 480, tagEnde = 720, dauer = 30, termine = [[480, 510], [525, 600], [590, 630], [660, 700]]. Notieren Sie je Schleifendurchlauf t, die Lücke, ob sie gespeichert wird, und frei_ab. Geben Sie das Ergebnis in Uhrzeiten an.',
        a: [['table', ['Schritt', 't', 'Lücke t.beginn - frei_ab', 'gespeichert?', 'frei_ab danach'], [['Start', '-', '-', '-', '480'], ['1', '[480, 510]', '0', 'nein', '510'], ['2', '[525, 600]', '15', 'nein', '600'], ['3', '[590, 630]', '-10 (Überschneidung)', 'nein', '**630** (max)'], ['4', '[660, 700]', '30', '**ja: [630, 660]**', '700'], ['Ende', '-', '720 - 700 = 20', 'nein', '-']]],
          'Ergebnis: **[[630, 660]]**, also ein freies Fenster von **10:30 bis 11:00 Uhr**.', 'Bewertung: je Zeile 1 P, Ergebnis 2 P.'],
        sol: [['walk', {t: 'Der Zeiger frei_ab wandert über den Vormittag', steps: [
          {t: '**Ausgangslage:** Vier Termine, T2 und T3 überschneiden sich (9:50 bis 10:00). frei_ab startet bei 8:00.', b: [day(T, 'Termine des Vormittags')]},
          {t: '**T1 und T2:** Die Lücken vor T1 (0 min) und vor T2 (8:30 bis 8:45, 15 min) sind kürzer als 30 Minuten. frei_ab steht danach auf 10:00.', b: [day(T.concat([['zu kurz: 15 min', 2, 1, 'gold']]), 'Die 15-Minuten-Lücke reicht nicht')]},
          {t: '**T3:** beginnt vor frei_ab (Lücke -10). Ohne max würde frei_ab auf 10:30 springen, mit max ebenfalls: max(600, 630) = 630. Wichtig wäre max, wenn ein späterer Termin **früher** endet als der vorherige.', b: [day(T, 'Überschneidung: frei_ab = 10:30')]},
          {t: '**T4:** Lücke 10:30 bis 11:00 = 30 Minuten: gespeichert. Danach frei_ab = 11:40; bis 12:00 bleiben nur 20 Minuten.', b: [day(T.concat([['FREI 10:30 bis 11:00', 10, 2, 'ok']]), 'Ergebnis: genau ein freies Fenster')]},
        ]}]],
        see: ['eua-algoexam']},
      {pts: 5, topic: 'Sortieren', q: 'Das PVS liefert die Termine **unsortiert**. a) Was müssen Sie vor dem Aufruf von freieFenster tun und mit welcher Laufzeit? b) Welches Sortierverfahren empfehlen Sie für 10.000 Termine und warum? c) Zeigen Sie, wie Sie in einer Sprache Ihrer Wahl mit der Standardbibliothek nach beginn sortieren.',
        a: ['a) Die Liste nach **beginn aufsteigend sortieren**. Laufzeit mit einem effizienten Verfahren **O(n log n)**; freieFenster selbst ist O(n).', 'b) **Mergesort** (oder Timsort, die Standardsortierung von Java für Objekte und Python): garantiert **O(n log n)** auch im schlechtesten Fall und **stabil** (Termine mit gleichem Beginn behalten ihre Reihenfolge). Quicksort ist im Mittel schnell, im schlechtesten Fall O(n²). Bubble- oder Insertion Sort mit O(n²) wären bei 10.000 Terminen rund 50 Millionen Vergleiche.',
          ['codes', [['java', 'termine.sort(Comparator.comparingInt(t -> t[0]));   // stabil (TimSort)'], ['python', 'termine.sort(key=lambda t: t[0])   # stabil (Timsort)'], ['csharp', 'termine = termine.OrderBy(t => t[0]).ToList();   // stabil']]]],
        see: ['eua-sortieren', 'eua-onotation']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Datenstrukturen für das Wartezimmer (25 Punkte)',
    tasks: [
      {pts: 6, rows: 7, topic: 'Queue und Prioritätswarteschlange', q: 'Folgende Ereignisse treten nacheinander auf: Ankunft **Ahrens**, Ankunft **Bauer**, Ankunft **Celik (Notfall)**, **Aufruf**, Ankunft **Dorn**, Ankunft **Engel (Notfall)**, **Aufruf**, **Aufruf**, **Aufruf**. Geben Sie die Reihenfolge der aufgerufenen Personen an a) bei einer einfachen Warteschlange (FIFO), b) bei einer Prioritätswarteschlange (Notfälle zuerst, sonst nach Ankunft). Wer wartet am Ende jeweils noch?',
        a: ['a) **FIFO:** Ahrens, Bauer, Celik, Dorn. Es wartet noch **Engel** (ein Notfall wartet: das zeigt, warum FIFO hier ungeeignet ist).', 'b) **Prioritätswarteschlange:** Celik, Engel, Ahrens, Bauer. Es wartet noch **Dorn**.', 'Bewertung: a) 2 P, b) 3 P, Rest 1 P.'],
        sol: [['walk', {t: 'Prioritätswarteschlange Schritt für Schritt', steps: [
          {t: 'Ahrens, Bauer und Celik (Notfall) kommen an. Der Notfall wird **vor** die normalen Patienten einsortiert.', b: [q(['Celik Notfall', 'Ahrens', 'Bauer'], 'vorne wird aufgerufen')]},
          {t: '**Aufruf 1: Celik.** Dann kommen Dorn und Engel (Notfall). Engel kommt vor alle normalen.', b: [q(['Engel Notfall', 'Ahrens', 'Bauer', 'Dorn'], 'nach den Ankünften')]},
          {t: '**Aufruf 2 bis 4:** Engel, Ahrens, Bauer. Dorn wartet noch.', b: [q(['Dorn'], 'am Ende')]},
          {t: '**Zum Vergleich FIFO:** Die Reihenfolge entspricht nur der Ankunft. Nach vier Aufrufen wartet ausgerechnet der Notfall Engel.', b: [q(['Engel Notfall'], 'FIFO am Ende')]},
        ]}]],
        see: ['eua-stackqueue']},
      {pts: 9, rows: 14, topic: 'Verkettete Liste', q: 'Implementieren Sie eine Warteschlange für Patientennamen als **einfach verkettete Liste** mit einem Verweis auf den Anfang (kopf) und das Ende (ende). Benötigt werden die Klasse **Knoten** und die Klasse **Warteschlange** mit **einreihen(name)** (hinten anfügen, O(1)), **aufrufen()** (vorderen Namen entfernen und zurückgeben; bei leerer Schlange null) und **istLeer()**. Sie dürfen keine fertigen Listenklassen verwenden.',
        a: [['codes', [['java', `class Knoten {
    String name;
    Knoten naechster;
    Knoten(String name) { this.name = name; }
}

class Warteschlange {
    private Knoten kopf, ende;

    public boolean istLeer() { return kopf == null; }

    public void einreihen(String name) {
        Knoten neu = new Knoten(name);
        if (istLeer()) {
            kopf = neu;               // erster Knoten ist Anfang und Ende
        } else {
            ende.naechster = neu;     // hinten anhängen
        }
        ende = neu;
    }

    public String aufrufen() {
        if (istLeer()) return null;
        String name = kopf.name;
        kopf = kopf.naechster;        // vorderen Knoten aushängen
        if (kopf == null) ende = null; // Schlange ist jetzt leer
        return name;
    }
}`], ['python', `class Knoten:
    def __init__(self, name):
        self.name = name
        self.naechster = None

class Warteschlange:
    def __init__(self):
        self.kopf = None
        self.ende = None

    def ist_leer(self):
        return self.kopf is None

    def einreihen(self, name):
        neu = Knoten(name)
        if self.ist_leer():
            self.kopf = neu
        else:
            self.ende.naechster = neu
        self.ende = neu

    def aufrufen(self):
        if self.ist_leer():
            return None
        name = self.kopf.name
        self.kopf = self.kopf.naechster
        if self.kopf is None:
            self.ende = None
        return name`]]],
          'Bewertung: Knotenklasse (1 P), istLeer (1 P), einreihen mit Sonderfall leere Schlange (3 P), aufrufen mit Sonderfällen leer und letzter Knoten (3 P), O(1) durch ende-Verweis (1 P).'],
        sol: [['diagram', {w: 800, h: 190, keep: 660, cap: 'Nach einreihen("Ahrens"), einreihen("Bauer"), einreihen("Dorn"): aufrufen() hängt vorn aus, einreihen hängt hinten an', nodes: [
          {id: 'k', k: 'text', x: 110, y: 30, t: 'kopf', w: 10, h: 10, b: true}, {id: 'e', k: 'text', x: 570, y: 30, t: 'ende', w: 10, h: 10, b: true},
          {id: 'n1', k: 'box', x: 110, y: 110, w: 150, h: 50, t: ['Ahrens', 'naechster ●'], s: 'accent'}, {id: 'n2', k: 'box', x: 340, y: 110, w: 150, h: 50, t: ['Bauer', 'naechster ●'], s: 'accent'},
          {id: 'n3', k: 'box', x: 570, y: 110, w: 150, h: 50, t: ['Dorn', 'naechster: null'], s: 'accent'}, {id: 'nil', k: 'text', x: 730, y: 110, t: '∅', w: 10, h: 10},
        ], edges: [{a: 'k', b: 'n1'}, {a: 'e', b: 'n3'}, {a: 'n1', b: 'n2'}, {a: 'n2', b: 'n3'}]}],
          ['warn', 'Wer beim Entfernen des letzten Knotens **ende** nicht auf null setzt, hängt beim nächsten einreihen an einen Knoten an, der gar nicht mehr in der Schlange ist.']],
        see: ['eua-listen', 'eua-stackqueue']},
      {pts: 5, rows: 7, topic: 'Hashtabelle', q: 'Patienten werden in einer Hashtabelle der Größe 7 gespeichert, Hashfunktion **h(k) = k mod 7**, Kollisionen werden durch **lineares Sondieren** (nächster freier Platz) gelöst. Fügen Sie die Schlüssel **15, 22, 8, 29, 3** in dieser Reihenfolge ein und geben Sie die Belegung an. Berechnen Sie den Belegungsfaktor und nennen Sie ein Problem des linearen Sondierens.',
        a: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['Schlüssel', '-', '15', '22', '8', '29', '3', '-']]],
          '- 15 mod 7 = 1: Platz 1. 22 mod 7 = 1 belegt: Platz 2. 8 mod 7 = 1: 1, 2 belegt: Platz 3. 29 mod 7 = 1: Platz 4. 3 mod 7 = 3 belegt, 4 belegt: Platz 5.', 'Belegungsfaktor = 5 / 7 ≈ **0,71**.', 'Problem: **Clusterbildung (primäres Clustering)**: Kollisionen erzeugen lange belegte Folgen, Suchen und Einfügen werden immer langsamer (hier braucht die 3 drei Versuche). Abhilfe: Tabelle vergrößern (Rehashing ab etwa 0,7), quadratisches Sondieren, Verkettung (Chaining).'],
        sol: [['walk', {t: 'Einfügen mit linearem Sondieren', steps: [
          {t: '**15** → 15 mod 7 = 1, frei.', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['', '', '**15**', '', '', '', '', '']]]]},
          {t: '**22** → 1 belegt, Platz 2.', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['', '', '15', '**22**', '', '', '', '']]]]},
          {t: '**8** → 1, 2 belegt, Platz 3.', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['', '', '15', '22', '**8**', '', '', '']]]]},
          {t: '**29** → 1, 2, 3 belegt, Platz 4. Der Cluster wächst.', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['', '', '15', '22', '8', '**29**', '', '']]]]},
          {t: '**3** → 3 mod 7 = 3 belegt (von der 8!), 4 belegt, Platz 5. Auch Schlüssel mit anderem Hashwert leiden unter dem Cluster.', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6'], [['', '', '15', '22', '8', '29', '**3**', '']]]]},
        ]}], ['tool', 'hash']],
        see: ['eua-hash']},
      {pts: 5, topic: 'Suchaufwand', q: 'Für die Suche nach einer Versichertennummer unter **1.000.000** Patienten stehen zur Wahl: a) lineare Suche in einer unsortierten Liste, b) binäre Suche in einem sortierten Feld, c) Hashtabelle. Geben Sie jeweils die Komplexität und die Zahl der Vergleiche im schlechtesten Fall (bei c im Mittel) an und nennen Sie einen Nachteil von b.',
        a: [['table', ['Verfahren', 'Komplexität', 'Vergleiche'], [['a) lineare Suche', 'O(n)', 'bis zu **1.000.000**'], ['b) binäre Suche', 'O(log n)', 'höchstens **20** (2²⁰ = 1.048.576)'], ['c) Hashtabelle', 'O(1) im Mittel', 'etwa **1** (O(n) im schlechtesten Fall bei vielen Kollisionen)']]],
          'Nachteil von b: Das Feld muss **sortiert** bleiben; jedes Einfügen kostet O(n) (Elemente verschieben), außerdem braucht sie wahlfreien Zugriff (kein Einsatz auf verketteten Listen).'],
        sol: [['chart', {kind: 'bar', w: 640, h: 260, labels: ['linear', 'binär', 'Hash'], series: [{n: 'log10(Vergleiche + 1)', d: [6, 1.32, 0.3], k: 'accent'}], vals: false, yl: 'Größenordnung (Zehnerpotenz)', cap: 'Logarithmische Darstellung: 1.000.000 gegen 20 gegen 1 Vergleich'}]],
        see: ['eua-suchen', 'eua-onotation', 'eua-hash']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Datenbank TerminPlus (25 Punkte)',
    ctx: [['h3', 'Anlage: Tabellen mit Beispieldaten'],
      ['diagram', {w: 760, h: 200, keep: 620, cap: 'Datenmodell (Ausschnitt)', nodes: [
        {id: 'p', k: 'cls', x: 110, y: 90, w: 190, t: {name: 'patient', attrs: ['PK patient_id', 'name', 'geburtsdatum', 'kasse']}},
        {id: 't', k: 'cls', x: 380, y: 90, w: 200, t: {name: 'termin', attrs: ['PK termin_id', 'FK patient_id', 'FK arzt_id', 'beginn (DATETIME)', 'dauer_min', 'status']}},
        {id: 'a', k: 'cls', x: 650, y: 90, w: 170, t: {name: 'arzt', attrs: ['PK arzt_id', 'name', 'fach']}},
      ], edges: [{a: 't', b: 'p', sa: 'many', ea: 'one'}, {a: 't', b: 'a', sa: 'many', ea: 'one'}]}],
      ['row', [['table', ['patient_id', 'name', 'geburtsdatum', 'kasse'], [['10', 'Meyer', '1958-04-12', 'AOK'], ['11', 'Schulz', '1990-09-30', 'TK'], ['12', 'Nguyen', '1972-01-05', 'Barmer'], ['13', 'Wagner', '1949-11-23', 'DAK'], ['14', 'Becker', '2001-06-17', 'TK']]],
        ['table', ['arzt_id', 'name', 'fach'], [['1', 'Dr. Yilmaz', 'Allgemeinmedizin'], ['2', 'Dr. Hoffmann', 'Kardiologie'], ['3', 'Dr. Petersen', 'Dermatologie']]]]],
      ['table', ['termin_id', 'patient_id', 'arzt_id', 'beginn', 'dauer_min', 'status'], [['100', '10', '1', '2026-11-16 08:00', '15', 'erschienen'], ['101', '12', '1', '2026-11-16 08:30', '15', 'nicht_erschienen'], ['102', '11', '1', '2026-11-16 08:15', '30', 'erschienen'], ['103', '10', '2', '2026-11-16 09:00', '30', 'erschienen'], ['104', '14', '1', '2026-11-17 10:00', '15', 'abgesagt'], ['105', '12', '2', '2026-11-17 11:00', '30', 'nicht_erschienen'], ['106', '11', '3', '2026-11-18 14:00', '20', 'erschienen'], ['107', '14', '2', '2026-11-18 15:00', '30', 'nicht_erschienen'], ['108', '10', '1', '2026-11-19 08:00', '15', 'gebucht']]]],
    tasks: [
      {pts: 4, topic: 'JOIN über drei Tabellen', q: 'Erstellen Sie die Tagesliste von **Dr. Yilmaz** für den **16.11.2026**: Uhrzeit (beginn), Patientenname und Status, sortiert nach beginn.',
        a: [['code', 'sql', `SELECT t.beginn, p.name, t.status
FROM termin t
JOIN patient p ON p.patient_id = t.patient_id
JOIN arzt a    ON a.arzt_id    = t.arzt_id
WHERE a.name = 'Dr. Yilmaz'
  AND t.beginn >= '2026-11-16' AND t.beginn < '2026-11-17'
ORDER BY t.beginn;`], ['table', ['beginn', 'name', 'status'], [['2026-11-16 08:00', 'Meyer', 'erschienen'], ['2026-11-16 08:15', 'Schulz', 'erschienen'], ['2026-11-16 08:30', 'Nguyen', 'nicht_erschienen']]],
          'Hinweis: Der Bereich >= Tag und < Folgetag ist sicherer als DATE(beginn) = ..., weil er einen Index auf beginn nutzen kann.'],
        see: ['eua-sqljoin']},
      {pts: 5, topic: 'Bedingte Aggregation', q: 'Ermitteln Sie je Arzt die Zahl der **wahrgenommenen oder versäumten** Termine (Status erschienen oder nicht_erschienen), davon die Zahl der **versäumten** und die **No-Show-Quote** in Prozent (eine Nachkommastelle). Nur Ärzte mit mindestens 3 solchen Terminen, höchste Quote zuerst.',
        a: [['code', 'sql', `SELECT a.name,
       COUNT(*) AS termine,
       SUM(CASE WHEN t.status = 'nicht_erschienen' THEN 1 ELSE 0 END) AS no_shows,
       ROUND(100.0 * SUM(CASE WHEN t.status = 'nicht_erschienen' THEN 1 ELSE 0 END)
             / COUNT(*), 1) AS quote
FROM arzt a
JOIN termin t ON t.arzt_id = a.arzt_id
WHERE t.status IN ('erschienen', 'nicht_erschienen')
GROUP BY a.arzt_id, a.name
HAVING COUNT(*) >= 3
ORDER BY quote DESC;`], ['table', ['name', 'termine', 'no_shows', 'quote'], [['Dr. Hoffmann', '3', '2', '66.7'], ['Dr. Yilmaz', '3', '1', '33.3']]],
          'Dr. Petersen fällt durch HAVING heraus (nur 1 Termin). **100.0** statt 100 verhindert die Ganzzahldivision.', 'Bewertung: JOIN und WHERE (1 P), CASE in SUM (2 P), Quote (1 P), GROUP BY/HAVING/ORDER BY (1 P).'],
        see: ['eua-sqlgroup']},
      {pts: 4, topic: 'LEFT JOIN', q: 'Geben Sie die Namen aller Patientinnen und Patienten aus, die **vor 1961** geboren sind und **noch nie einen Termin** hatten (Zielgruppe für eine Vorsorge-Einladung).',
        a: [['code', 'sql', `SELECT p.name
FROM patient p
LEFT JOIN termin t ON t.patient_id = p.patient_id
WHERE p.geburtsdatum < '1961-01-01'
  AND t.termin_id IS NULL;`], ['table', ['name'], [['Wagner']]], 'Meyer ist zwar vor 1961 geboren, hat aber Termine. Alternative: WHERE NOT EXISTS (SELECT 1 FROM termin t WHERE t.patient_id = p.patient_id).'],
        see: ['eua-sqljoin']},
      {pts: 4, topic: 'DELETE und Datenschutz', q: 'Abgesagte Termine, die älter als **zwei Jahre** sind, sollen gelöscht werden. a) Schreiben Sie die Anweisung. b) Welcher DSGVO-Grundsatz wird damit umgesetzt? c) Was passiert, wenn eine andere Tabelle (zum Beispiel rechnung) per Fremdschlüssel ohne ON DELETE-Regel auf einen dieser Termine verweist?',
        a: [['code', 'sql', `DELETE FROM termin
WHERE status = 'abgesagt'
  AND beginn < CURRENT_DATE - INTERVAL '2' YEAR;   -- MySQL: DATE_SUB(CURDATE(), INTERVAL 2 YEAR)`],
          'b) **Speicherbegrenzung** (Art. 5 Abs. 1 e DSGVO): Daten nur so lange speichern, wie es für den Zweck nötig ist. Achtung: Die **Behandlungsdokumentation** muss nach § 630f BGB **10 Jahre** aufbewahrt werden; abgesagte Termine gehören nicht dazu.', 'c) Die Löschung wird wegen der **referenziellen Integrität abgelehnt** (Standardverhalten RESTRICT / NO ACTION): Die Anweisung schlägt fehl, es wird nichts gelöscht.'],
        see: ['eua-sqldml', 'ps-dsgvo']},
      {pts: 4, topic: 'Transaktion', q: 'Bei einer Buchung werden ein Datensatz in termin eingefügt und der Slot in der Tabelle slot auf belegt gesetzt. Schreiben Sie beide Schritte als **Transaktion**, die abgebrochen wird, wenn der Slot schon belegt war, und erläutern Sie zwei der ACID-Eigenschaften an diesem Beispiel.',
        a: [['code', 'sql', `START TRANSACTION;
UPDATE slot SET belegt = 1
 WHERE slot_id = 4711 AND belegt = 0;     -- 0 Zeilen betroffen? dann ROLLBACK
INSERT INTO termin (patient_id, arzt_id, beginn, dauer_min, status)
VALUES (11, 1, '2026-11-20 09:00', 15, 'gebucht');
COMMIT;                                   -- im Fehlerfall: ROLLBACK;`],
          '- **Atomarität:** Entweder werden Slot **und** Termin gespeichert oder keins von beiden.', '- **Konsistenz:** Nach der Transaktion gibt es keinen belegten Slot ohne Termin.', '- **Isolation:** Zwei gleichzeitige Buchungen desselben Slots stören sich nicht; die Bedingung belegt = 0 mit Zeilensperre verhindert Doppelbuchungen.', '- **Dauerhaftigkeit:** Nach COMMIT bleibt die Buchung auch bei einem Absturz erhalten.'],
        see: ['eua-transaktionen']},
      {pts: 4, topic: 'Rechte und Views', q: 'Die Mitarbeitenden am Empfang (Rolle **empfang**) sollen die Tagesliste lesen sowie Termine anlegen und ändern dürfen, aber **keine Termine löschen** und keine Geburtsdaten sehen. Schreiben Sie die nötigen SQL-Anweisungen (View und Rechte).',
        a: [['code', 'sql', `CREATE ROLE empfang;

CREATE VIEW v_tagesliste AS
SELECT t.termin_id, t.beginn, p.name AS patient, a.name AS arzt, t.status
FROM termin t
JOIN patient p ON p.patient_id = t.patient_id
JOIN arzt a    ON a.arzt_id    = t.arzt_id;

GRANT SELECT ON v_tagesliste TO empfang;
GRANT INSERT, UPDATE ON termin TO empfang;
REVOKE DELETE ON termin FROM empfang;     -- nur nötig, falls zuvor erteilt`],
          'Die View blendet sensible Spalten (Geburtsdatum, Kasse) aus; Rechte werden an **Rollen** vergeben, nicht an einzelne Personen (Least Privilege).'],
        see: ['eua-sqlviews']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Objektorientierung und Schnittstellen (25 Punkte)',
    ctx: [['p', 'Erinnerungen werden per SMS oder E-Mail versendet. Gegeben sind die Klassen **Patient** (getName(), getMobil(), getEmail(), getKanal() liefert "SMS" oder "EMAIL") und **Termin** (getPatient(), getBeginn() als Datum mit Uhrzeit, getStatus()).']],
    tasks: [
      {pts: 4, rows: 7, topic: 'Interface im UML', q: 'Modellieren Sie als UML-Klassendiagramm: Eine Schnittstelle **Benachrichtigung** mit der Methode senden(p: Patient, text: String): boolean wird von **SmsBenachrichtigung** und **EmailBenachrichtigung** realisiert. Die Klasse **Erinnerungsdienst** kennt mehrere Benachrichtigungen (je Kanal eine). Erklären Sie den Unterschied zwischen einer Schnittstelle und einer abstrakten Klasse.',
        a: ['Interface mit Stereotyp «interface», Realisierung als **gestrichelte Linie mit leerem Dreieck**, gerichtete Assoziation vom Erinnerungsdienst zur Schnittstelle (Multiplizität 1..*).', '**Schnittstelle:** nur Methodensignaturen (in Java/C# heute auch Default-Methoden), keine Attribute mit Zustand, eine Klasse kann **mehrere** Schnittstellen implementieren. **Abstrakte Klasse:** kann Attribute und fertige Methoden enthalten, nicht instanziierbar, eine Klasse erbt nur von **einer** Klasse (Java, C#).'],
        sol: [['diagram', {w: 800, h: 320, keep: 660, cap: 'Musterlösung: Realisierung (gestrichelt mit Dreieck) und Abhängigkeit des Dienstes nur von der Schnittstelle', nodes: [
          {id: 'd', k: 'cls', x: 140, y: 80, w: 250, t: {name: 'Erinnerungsdienst', attrs: ['- kanaele: Map<String, Benachrichtigung>'], ops: ['+ erinnere(termine, tag): int']}},
          {id: 'i', k: 'cls', x: 560, y: 80, w: 330, s: 'accent', t: {name: ['«interface»', 'Benachrichtigung'], ops: ['+ senden(p: Patient, text: String): boolean']}},
          {id: 's', k: 'cls', x: 430, y: 260, w: 220, t: {name: 'SmsBenachrichtigung', ops: ['+ senden(p, text): boolean']}},
          {id: 'e', k: 'cls', x: 690, y: 260, w: 220, t: {name: 'EmailBenachrichtigung', ops: ['+ senden(p, text): boolean']}},
        ], edges: [{a: 'd', b: 'i', ea: 'open', tb: '1..*'}, {a: 's', b: 'i', k: 'dash', ea: 'tri', via: [[430, 180], [560, 180]]}, {a: 'e', b: 'i', k: 'dash', ea: 'tri', via: [[690, 180], [560, 180]]}]}]],
        see: ['eua-interface', 'eua-umlcode']},
      {pts: 7, rows: 12, topic: 'Methode implementieren', q: 'Implementieren Sie **erinnere(termine, tag)** des Erinnerungsdienstes. Für jeden Termin mit Status "gebucht", dessen Beginn auf das Datum tag fällt, wird über die zum Kanal des Patienten passende Benachrichtigung der Text "Erinnerung: Ihr Termin am ‹Datum› um ‹Uhrzeit›" gesendet. Die Methode gibt die Zahl der **erfolgreich** gesendeten Erinnerungen zurück. Gibt es für einen Kanal keine Benachrichtigung, wird der Termin übersprungen.',
        a: [['codes', [['java', `public int erinnere(List<Termin> termine, LocalDate tag) {
    int gesendet = 0;
    for (Termin t : termine) {
        if (!t.getStatus().equals("gebucht")) continue;
        if (!t.getBeginn().toLocalDate().equals(tag)) continue;
        Patient p = t.getPatient();
        Benachrichtigung kanal = kanaele.get(p.getKanal());
        if (kanal == null) continue;                    // Kanal nicht verfügbar
        String text = "Erinnerung: Ihr Termin am " + tag
                    + " um " + t.getBeginn().toLocalTime();
        if (kanal.senden(p, text)) gesendet++;
    }
    return gesendet;
}`], ['python', `def erinnere(self, termine, tag):
    gesendet = 0
    for t in termine:
        if t.get_status() != "gebucht" or t.get_beginn().date() != tag:
            continue
        p = t.get_patient()
        kanal = self.kanaele.get(p.get_kanal())
        if kanal is None:
            continue
        text = f"Erinnerung: Ihr Termin am {tag} um {t.get_beginn().time()}"
        if kanal.senden(p, text):
            gesendet += 1
    return gesendet`]]],
          'Vorteil des Interfaces: Der Dienst kennt nur **Benachrichtigung**; ein neuer Kanal (zum Beispiel Push) wird als neue Klasse ergänzt und in die Map eingetragen, ohne erinnere zu ändern (**Polymorphie**, Offen-geschlossen-Prinzip). Für Tests kann eine Attrappe (Mock) eingesetzt werden.', 'Bewertung: Schleife und Filter Status/Datum (2 P), Kanal aus der Map mit null-Prüfung (2 P), Text (1 P), Aufruf über das Interface und Zählen nur bei Erfolg (2 P).'],
        see: ['eua-interface', 'eua-oop']},
      {pts: 6, rows: 10, topic: 'Validierung', q: 'Die Krankenversichertennummer besteht aus **10 Zeichen**: einem **Großbuchstaben A bis Z** und **9 Ziffern** (Beispiel: A123456789). Schreiben Sie die Funktion **pruefeKvnr(nr)**, die true oder false zurückgibt. Verwenden Sie **keine** regulären Ausdrücke. Geben Sie zusätzlich einen regulären Ausdruck an, der dasselbe prüft.',
        a: [['codes', [['java', `static boolean pruefeKvnr(String nr) {
    if (nr == null || nr.length() != 10) return false;
    char erstes = nr.charAt(0);
    if (erstes < 'A' || erstes > 'Z') return false;
    for (int i = 1; i < 10; i++) {
        char c = nr.charAt(i);
        if (c < '0' || c > '9') return false;
    }
    return true;
}`], ['python', `def pruefe_kvnr(nr):
    if nr is None or len(nr) != 10:
        return False
    if not ("A" <= nr[0] <= "Z"):
        return False
    for c in nr[1:]:
        if not ("0" <= c <= "9"):
            return False
    return True`], ['pseudo', `funktion pruefeKvnr(nr)
    wenn nr = null oder länge(nr) ≠ 10 dann rückgabe falsch
    wenn nr[0] < 'A' oder nr[0] > 'Z' dann rückgabe falsch
    für i = 1 bis 9
        wenn nr[i] < '0' oder nr[i] > '9' dann rückgabe falsch
    ende für
    rückgabe wahr
ende funktion`]]], ['code', 'text', 'Regulärer Ausdruck:  ^[A-Z][0-9]{9}$'],
          'Testfälle: A123456789 (wahr), a123456789 (falsch, Kleinbuchstabe), A12345678 (falsch, 9 Zeichen), A12345678X (falsch), leerer String / null (falsch). Die echte KVNR enthält zusätzlich eine **Prüfziffer**.', 'Bewertung: Längen- und null-Prüfung (2 P), Buchstabe (1 P), Ziffernschleife (2 P), Regex (1 P).'],
        see: ['eua-pruefziffer', 'eua-datentypen']},
      {pts: 4, topic: 'HTTP-Statuscodes', q: 'Ordnen Sie den Situationen der TerminPlus-API den passenden HTTP-Statuscode zu.',
        match: {keys: ['200 OK', '201 Created', '204 No Content', '401 Unauthorized', '403 Forbidden', '404 Not Found', '409 Conflict'], items: [
          ['Ein Termin wurde erfolgreich neu angelegt.', 1], ['Der gewünschte Slot wurde inzwischen von jemand anderem gebucht.', 6], ['Die Anfrage enthält kein gültiges Anmelde-Token.', 3],
          ['Eine angemeldete Patientin versucht, den Termin einer anderen Person abzurufen.', 4], ['Ein Termin wurde erfolgreich gelöscht, die Antwort hat keinen Inhalt.', 2],
        ]},
        a: ['**2xx Erfolg**, **4xx Fehler des Clients**, 5xx Fehler des Servers. 401 = nicht (gültig) angemeldet, **403 = angemeldet, aber nicht berechtigt**. 409 = Konflikt mit dem aktuellen Zustand der Ressource.'],
        see: ['eua-webapi']},
      {pts: 4, rows: 5, topic: 'Wert- und Referenzübergabe', q: 'Welche Ausgabe erzeugt das Java-Programm? Begründen Sie kurz.',
        ctx: [['code', 'java', `class Termin { int beginn; Termin(int b) { beginn = b; } }

static void verschiebe(Termin t, int minuten) {
    t.beginn = t.beginn + minuten;
    minuten = 0;
}
static void erhoehe(int x) { x = x + 10; }

public static void main(String[] args) {
    Termin t = new Termin(480);
    int m = 15;
    verschiebe(t, m);
    erhoehe(m);
    System.out.println(t.beginn + " " + m);
    Termin u = t;
    u.beginn = 600;
    System.out.println(t.beginn);
}`]],
        a: [['out', `495 15
600`], 'Java übergibt **immer Werte**. Bei int wird der Wert kopiert: Änderungen an minuten bzw. x wirken nicht auf m (bleibt 15). Bei Objekten wird die **Referenz kopiert**: t im Aufrufer und in verschiebe zeigen auf **dasselbe Objekt**, deshalb wird beginn 495. u = t kopiert ebenfalls nur die Referenz; u.beginn = 600 ändert das gemeinsame Objekt.'],
        sol: [['diagram', {w: 640, h: 170, cap: 'Zwei Variablen, ein Objekt: t und u verweisen auf denselben Speicherbereich', nodes: [
          {id: 't', k: 'box', x: 80, y: 50, w: 80, h: 40, t: 't'}, {id: 'u', k: 'box', x: 80, y: 120, w: 80, h: 40, t: 'u'},
          {id: 'o', k: 'box', x: 380, y: 85, w: 200, h: 60, t: ['Termin-Objekt', 'beginn = 600'], s: 'accent'}, {id: 'm', k: 'box', x: 570, y: 85, w: 80, h: 40, t: 'm = 15', s: 'soft'},
        ], edges: [{a: 't', b: 'o'}, {a: 'u', b: 'o'}]}]],
        see: ['eua-funktionen', 'eua-datentypen']},
    ],
  });
  AP2.exam.end(ID);
})();
