// Probeprüfung 3, Entwicklung und Umsetzung von Algorithmen: NordLog Spedition GmbH, LagerPilot.
(function () {
  const ID = 'exam3-eua';
  const bars = (vals, mark, cap) => ['chart', {kind: 'bar', w: 640, h: 230, labels: vals.map((v, i) => (i === mark ? '▶ ' : '') + 'Index ' + i), series: [{n: 'Gewicht (kg)', d: vals, k: 'accent'}], vals: true, ymax: 1000, cap}];
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 3 (Logistik)', t: 'Entwicklung und Umsetzung von Algorithmen: LagerPilot', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.eua,
    hint: 'Realistischer Aufgabensatz: 4 Handlungsschritte zu je 25 Punkten, 90 Minuten. Programmieraufgaben in Pseudocode oder einer Sprache Ihrer Wahl. Die Musterlösungen zeigen mehrere Sprachen, Struktogramme und Schritt-für-Schritt-Präsentationen.',
    intro: [
      ['p', 'Sie entwickeln bei der **CodeHafen Software GmbH** das Lagerverwaltungssystem **LagerPilot** für die **NordLog Spedition GmbH** weiter. Das Lager besteht aus Regalreihen mit Fächern. Im Programm wird ein Regal als **zweidimensionales Feld** abgebildet:'],
      ['kv', [['regal[r][f]', 'Inhalt von Reihe r, Fach f: **-1** = gesperrt, **0** = frei, **größer 0** = Paletten-ID'], ['traglast[r]', 'maximale Traglast eines Fachs in Reihe r (kg)'], ['Indizes', 'beginnen bei 0; länge(feld) liefert die Anzahl der Elemente']]],
    ]});
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Lagerplätze finden und auswerten (25 Punkte)',
    tasks: [
      {pts: 10, rows: 12, topic: 'Algorithmus entwickeln', q: 'Entwickeln Sie die Funktion **findeFreienPlatz(regal, traglast, gewicht)**. Sie durchsucht das Regal reihenweise (Reihe 0 zuerst, darin Fach 0 zuerst) und gibt die Position **[r, f]** des ersten **freien** Fachs zurück, dessen Reihe das **Gewicht tragen** kann. Gibt es keinen passenden Platz, wird **[-1, -1]** zurückgegeben. Ist das Gewicht kleiner oder gleich 0, soll ebenfalls [-1, -1] zurückgegeben werden.',
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
          'Bewertung: Prüfung gewicht <= 0 (1 P), äußere Schleife (2 P), Traglastprüfung (2 P), innere Schleife (2 P), Prüfung frei und Rückgabe [r, f] (2 P), Rückgabe [-1, -1] am Ende (1 P).'],
        sol: [['diagram', AP2.dg.nsd([['if', 'gewicht <= 0 ?', [['act', 'rückgabe [-1, -1]']], [
          ['for', 'für r = 0 bis länge(regal) - 1', [['if', 'traglast[r] >= gewicht ?', [['for', 'für f = 0 bis länge(regal[r]) - 1', [['if', 'regal[r][f] = 0 ?', [['act', 'rückgabe [r, f]']], [['act', '(nichts)']]]]]], [['act', '(Reihe überspringen)']]]]],
          ['act', 'rückgabe [-1, -1]']]]], {w: 640, cap: 'Dieselbe Lösung als Struktogramm (Nassi-Shneiderman)'})],
          ['warn', 'Typischer Fehler: [-1, -1] **innerhalb** der Schleife im sonst-Zweig zurückgeben. Dann wird nur das allererste Fach geprüft.']],
        see: ['eua-algoexam', 'eua-pseudocode', 'ps-struktogramm']},
      {pts: 6, rows: 8, topic: 'Schreibtischtest', q: 'Gegeben ist die Funktion **auswerten(regal)**. Führen Sie einen Schreibtischtest für regal = [[5, 0, -1, 9], [0, 0, 7, 0], [3, 8, -1, -1]] durch: Notieren Sie nach jedem Durchlauf der äußeren Schleife die Werte von r, belegt, nutzbar, besteQuote und besteReihe. Geben Sie den Rückgabewert an und beschreiben Sie, was die Funktion ermittelt.',
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
      {pts: 4, topic: 'Datentypen und Laufzeit', q: 'a) Die Funktion auswerten wird in Java umgesetzt; belegt und nutzbar sind vom Typ int. Welches Problem entsteht bei belegt / nutzbar, und wie beheben Sie es? b) Geben Sie die Laufzeitkomplexität von auswerten in O-Notation an (R Reihen, F Fächer je Reihe).',
        a: ['a) **Ganzzahldivision:** 2 / 3 ergibt in Java **0**, nicht 0,667. Damit wären alle Quoten 0 oder 1 und das Ergebnis falsch. Lösung: vorher in double umwandeln, zum Beispiel **(double) belegt / nutzbar** oder belegt * 1.0 / nutzbar.', 'b) Jedes Fach wird genau einmal betrachtet: **O(R x F)**, also linear in der Anzahl aller Fächer.'],
        sol: [['codes', [['java', `int belegt = 2, nutzbar = 3;
System.out.println(belegt / nutzbar);            // 0   (Ganzzahldivision)
System.out.println((double) belegt / nutzbar);   // 0.6666666666666666`], ['python', `belegt, nutzbar = 2, 3
print(belegt // nutzbar)   # 0     (Ganzzahldivision)
print(belegt / nutzbar)    # 0.666...  (in Python ist / immer Gleitkomma)`]]], ['out', `0
0.6666666666666666`]],
        see: ['eua-datentypen', 'eua-onotation']},
      {pts: 5, rows: 9, topic: 'Rekursion', q: 'Die Paletten-IDs eines Lagers liegen **aufsteigend sortiert** in einem Feld ids vor. Schreiben Sie eine **rekursive** Funktion **binSuche(ids, ziel, links, rechts)**, die den Index von ziel zurückgibt oder -1, wenn ziel nicht enthalten ist. Der erste Aufruf lautet binSuche(ids, ziel, 0, länge(ids) - 1).',
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
          'Bewertung: Abbruchbedingung (1 P), Mitte (1 P), Treffer (1 P), zwei rekursive Aufrufe mit richtigen Grenzen (2 P).'],
        sol: [['walk', {t: 'binSuche([12, 17, 23, 31, 40, 52, 66, 78], 52, 0, 7)', steps: [
          {t: '**Aufruf 1:** links 0, rechts 7, mitte 3. ids[3] = 31 < 52, also rechts weitersuchen.', b: [['table', ['Index', '0', '1', '2', '3', '4', '5', '6', '7'], [['Wert', '12', '17', '23', '**31**', '40', '52', '66', '78'], ['Bereich', 'x', 'x', 'x', 'mitte', 'x', 'x', 'x', 'x']]]]},
          {t: '**Aufruf 2:** links 4, rechts 7, mitte 5. ids[5] = 52 = ziel. Rückgabe **5** wird durch alle Aufrufe nach oben gereicht.', b: [['table', ['Index', '4', '5', '6', '7'], [['Wert', '40', '**52**', '66', '78'], ['Bereich', 'x', 'mitte = Treffer', 'x', 'x']]]]},
          {t: '**Warum schnell?** Jeder Aufruf halbiert den Bereich: bei n Elementen höchstens etwa log₂(n) + 1 Aufrufe. Für 12.000 Paletten sind das höchstens **14** Vergleiche statt bis zu 12.000 bei linearer Suche.', b: [['diagram', AP2.dg.flow(['0..7 (8)', '4..7 (4)', '6..7 (2)', '7..7 (1)', 'leer: -1'], {w: 720, h: 100, styles: ['accent', 'accent', 'accent', 'accent', 'bad'], cap: 'Schlimmster Fall bei 8 Elementen: der Bereich halbiert sich bis zur Abbruchbedingung'})]]},
        ]}]],
        see: ['eua-rekursion', 'eua-suchen']},
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
      {pts: 8, rows: 12, topic: 'Klassen implementieren', q: 'Implementieren Sie die Klassen **Fahrzeug** und **Lkw** gemäß Klassendiagramm in einer objektorientierten Programmiersprache Ihrer Wahl (Konstruktoren, Getter, Maut).',
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
      {pts: 5, rows: 8, topic: 'Methode implementieren', q: 'Implementieren Sie die Methode **istUeberladen()** der Klasse Tour. Sie liefert true, wenn die Summe der Sendungsgewichte die maximale Nutzlast des Fahrzeugs übersteigt.',
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
        see: ['eua-oop']},
      {pts: 6, rows: 7, topic: 'Polymorphie', q: 'Welche Ausgabe erzeugt das Programm? Erklären Sie an diesem Beispiel die Begriffe **Polymorphie** und **dynamische Bindung**.',
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
          '**Polymorphie** (Vielgestaltigkeit): Eine Variable vom Typ der Oberklasse (Fahrzeug) kann Objekte verschiedener Unterklassen aufnehmen; derselbe Aufruf berechneMaut(100) verhält sich je nach Objekt unterschiedlich.', '**Dynamische (späte) Bindung:** Welche Implementierung ausgeführt wird, entscheidet sich erst **zur Laufzeit** anhand des tatsächlichen Objekttyps (Lkw oder Transporter), nicht anhand des deklarierten Typs.', 'Bewertung: Ausgabe 3 P, Erklärungen 3 P.'],
        sol: [['seq', {w: 720, actors: ['Schleife', 'Lkw 401 (5 Achsen)', 'Lkw 388 (3 Achsen)', 'Transporter 512'], cap: 'Derselbe Aufruf, drei Implementierungen: entschieden zur Laufzeit', steps: [
          [0, 1, 'berechneMaut(100)', 's'], [1, 0, '100 x 0,35 = 35.0', 'r'], [0, 2, 'berechneMaut(100)', 's'], [2, 0, '100 x 0,27 = 27.0', 'r'], [0, 3, 'berechneMaut(100)', 's'], [3, 0, '0.0', 'r'], ['note', 0, 'Summe 62.0']]}]],
        see: ['eua-saeulen', 'eua-interface']},
      {pts: 6, rows: 8, topic: 'Entwurfsmuster', q: 'NordLog fährt auch nach Österreich und Polen; dort gelten andere Mautregeln. Die Berechnung soll austauschbar sein, ohne die Fahrzeugklassen bei jeder neuen Regel zu ändern. Schlagen Sie ein Entwurfsmuster vor, skizzieren Sie es als Klassendiagramm und nennen Sie zwei Vorteile.',
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
      {pts: 3, topic: 'SELECT', q: 'Geben Sie alle Sendungen mit Status "unterwegs" aus, die schwerer als 500 kg sind, absteigend nach Gewicht sortiert (sendung_id, gewicht_kg).',
        a: [['code', 'sql', `SELECT sendung_id, gewicht_kg
FROM sendung
WHERE status = 'unterwegs'
  AND gewicht_kg > 500
ORDER BY gewicht_kg DESC;`], ['table', ['sendung_id', 'gewicht_kg'], [['506', '1100'], ['504', '750'], ['501', '620']]], 'Sendung 502 fehlt (480 kg), 503 ist zugestellt.'],
        see: ['eua-sqlselect']},
      {pts: 5, topic: 'JOIN, GROUP BY, HAVING', q: 'Ermitteln Sie je Kunde (Firma) die Anzahl der im **März 2026** erfassten Sendungen und deren Gesamtgewicht. Es sollen nur Kunden mit **mehr als 2** Sendungen erscheinen, sortiert nach Gesamtgewicht absteigend.',
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
      {pts: 5, topic: 'Unterabfrage', q: 'Geben Sie die Namen aller Fahrer aus, die am **03.03.2026 keine Tour** gefahren sind.',
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
        see: ['eua-sqljoin', 'eua-sqlexam']},
      {pts: 4, topic: 'UPDATE', q: 'Alle Sendungen der **Tour 102** wurden zugestellt. Setzen Sie ihren Status mit einer Anweisung auf "zugestellt". Wie viele Zeilen sind betroffen?',
        a: [['code', 'sql', `UPDATE sendung
SET status = 'zugestellt'
WHERE sendung_id IN (SELECT sendung_id
                     FROM tour_sendung
                     WHERE tour_id = 102);`], 'Betroffen sind **2 Zeilen** (Sendungen 502 und 504).', 'Bewertung: UPDATE/SET (1 P), Unterabfrage über tour_sendung (2 P), Anzahl (1 P).'],
        see: ['eua-sqldml']},
      {pts: 4, topic: 'CREATE TABLE', q: 'Schreiben Sie die SQL-Anweisung, mit der die Tabelle **tour_sendung** angelegt wird (Datentypen, zusammengesetzter Primärschlüssel, Fremdschlüssel). Beim Löschen einer Tour sollen ihre Zuordnungen automatisch mit gelöscht werden.',
        a: [['code', 'sql', `CREATE TABLE tour_sendung (
    tour_id     INT NOT NULL,
    sendung_id  INT NOT NULL,
    stopp_nr    SMALLINT NOT NULL CHECK (stopp_nr > 0),
    PRIMARY KEY (tour_id, sendung_id),
    FOREIGN KEY (tour_id)    REFERENCES tour(tour_id) ON DELETE CASCADE,
    FOREIGN KEY (sendung_id) REFERENCES sendung(sendung_id)
);`], 'Bewertung: Spalten mit Typen (1 P), zusammengesetzter PK (1 P), zwei FKs (1 P), ON DELETE CASCADE (1 P).'],
        see: ['eua-sqldml', 'eua-sqler']},
      {pts: 4, topic: 'Index', q: 'Das Tracking-Portal sucht sehr häufig mit WHERE kunde_id = ? nach Sendungen. Erklären Sie, was ein Index ist, wie er hier hilft und nennen Sie einen Nachteil. Geben Sie die SQL-Anweisung an.',
        a: ['Ein **Index** ist eine zusätzliche, sortierte Datenstruktur (meist **B-Baum**) mit Verweisen auf die Zeilen, ähnlich einem Stichwortverzeichnis. Statt alle Zeilen zu lesen (Full Table Scan, O(n)), findet die Datenbank die passenden Zeilen in etwa O(log n).', 'Nachteile: **zusätzlicher Speicher**, **INSERT/UPDATE/DELETE werden langsamer**, weil der Index mitgepflegt wird. Sinnvoll für häufig gefilterte, gejointe oder sortierte Spalten mit vielen verschiedenen Werten.', ['code', 'sql', 'CREATE INDEX idx_sendung_kunde ON sendung (kunde_id);']],
        see: ['eua-sqlexam', 'eua-baeume']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Daten austauschen und Qualität sichern (25 Punkte)',
    tasks: [
      {pts: 6, rows: 10, topic: 'JSON', q: 'Die Scanner-App überträgt Sendungen als JSON. a) Erstellen Sie ein JSON-Dokument für **Sendung 504** (Gewicht 750 kg, Status unterwegs) mit dem Kunden als **eingebettetem Objekt** (ID, Firma, Ort) und einer **Liste der Stopps** (Tour 102, Stopp 2). Das Feld zustellzeit ist noch unbekannt. b) Nennen Sie zwei Unterschiede zwischen JSON und XML.',
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
}`], 'a) Bewertung: Objekt mit Schlüssel-Wert-Paaren (1 P), Zahl ohne Anführungszeichen, Zeichenkette mit (1 P), eingebettetes Objekt (1 P), Array (1 P), null (bei Fehlen 0 P Abzug, wenn begründet weggelassen).',
          'b) JSON ist **kompakter** (keine schließenden Tags), kennt **Datentypen** (Zahl, Boolean, null, Array); XML hat **Attribute und Namensräume**, kann mit **XSD** validiert und mit XSLT transformiert werden; JSON ist in JavaScript direkt verarbeitbar.'],
        see: ['eua-formate']},
      {pts: 7, rows: 10, topic: 'Unit-Test', q: 'Die Methode **berechnePreis(gewichtKg, express)** berechnet den Frachtpreis: **25,00 Euro** bis einschließlich 100 kg, für **jede angefangenen weiteren 100 kg** zusätzlich **12,00 Euro**. Express kostet **30 % Aufschlag**. Gewichte kleiner oder gleich 0 oder über 1.200 kg lösen eine **IllegalArgumentException** aus. a) Geben Sie fünf Testfälle mit Eingabe und erwartetem Ergebnis an, darunter Grenzwerte. b) Schreiben Sie einen Unit-Test (zum Beispiel JUnit 5), der die Ausnahme bei 0 kg prüft.',
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
          'Bewertung: a) 5 Testfälle je 0,8 P (4 P), b) Testmethode mit Erwartung der Ausnahme 3 P.'],
        sol: [['chart', {kind: 'line', w: 720, h: 280, labels: ['0', '100', '101', '200', '201', '300', '400', '500', '600'], series: [{n: 'Preis normal (Euro)', d: [null, 25, 37, 37, 49, 49, 61, 73, 85], k: 'accent'}], ymax: 100, yl: 'Euro', cap: 'Stufenfunktion: An jeder 100-kg-Grenze springt der Preis. Genau dort liegen die wichtigsten Testfälle.'}]],
        see: ['eua-unittest', 'eua-testfaelle']},
      {pts: 6, rows: 8, topic: 'Exceptions', q: 'Welche Ausgabe erzeugt das folgende Programm? Begründen Sie die Rolle des finally-Blocks.',
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
E`], 'finally wird **immer** ausgeführt: nach normalem return (D vor 25), nach dem catch (D vor -1) und auch, wenn die Ausnahme **nicht gefangen** wird (Index 2: ArrayIndexOutOfBoundsException passt nicht zum catch, D wird ausgegeben, dann fängt main die Ausnahme und gibt E aus). Typisch für Aufräumarbeiten (Datei, Verbindung schließen).', 'Bewertung: drei Aufrufe je 1,5 P, Begründung 1,5 P.'],
        sol: [['walk', {t: 'Ablauf der drei Aufrufe', steps: [
          {t: '**lade(p, 0):** 100 / 4 = 25, kein Fehler. "A", "B", dann return 25; **vor** dem Verlassen läuft finally: "D". main gibt 25 aus.', b: [['diagram', AP2.dg.flow(['try: A', '100/4 = 25', 'B, return 25', 'finally: D', 'main: 25'], {w: 760, h: 100, styles: ['accent', 'ok', 'ok', 'gold', 'plain']})]]},
          {t: '**lade(p, 1):** 100 / 0 wirft ArithmeticException. "B" wird übersprungen, catch gibt "C" aus und return -1, finally "D".', b: [['diagram', AP2.dg.flow(['try: A', '100/0: Fehler', 'catch: C, return -1', 'finally: D', 'main: -1'], {w: 760, h: 100, styles: ['accent', 'bad', 'ok', 'gold', 'plain']})]]},
          {t: '**lade(p, 2):** p[2] existiert nicht: ArrayIndexOutOfBoundsException. Kein passendes catch in lade, finally gibt trotzdem "D" aus, die Ausnahme geht an main, dort "E".', b: [['diagram', AP2.dg.flow(['try: A', 'p[2]: Fehler', 'kein passendes catch', 'finally: D', 'main-catch: E'], {w: 760, h: 100, styles: ['accent', 'bad', 'plain', 'gold', 'ok']})]]},
        ]}]],
        see: ['eua-exceptions']},
      {pts: 6, rows: 8, topic: 'Sortieren', q: 'Die Gewichte [620, 480, 910, 200, 750] sollen mit **Insertion Sort** (Sortieren durch Einfügen) aufsteigend sortiert werden. a) Geben Sie den Zustand des Feldes nach jedem Durchlauf der äußeren Schleife an. b) Nennen Sie die Laufzeit im besten und schlechtesten Fall und erklären Sie, wann der beste Fall eintritt.',
        a: [['table', ['Durchlauf', 'eingefügtes Element', 'Feld danach'], [['Start', '-', '620, 480, 910, 200, 750'], ['1', '480', '**480, 620**, 910, 200, 750'], ['2', '910', '**480, 620, 910**, 200, 750'], ['3', '200', '**200, 480, 620, 910**, 750'], ['4', '750', '**200, 480, 620, 750, 910**']]],
          'b) Bester Fall **O(n)**, wenn das Feld **bereits sortiert** ist (jedes Element wird nur einmal verglichen). Schlechtester Fall **O(n²)** bei umgekehrt sortiertem Feld. Insertion Sort ist **stabil** und arbeitet **in-place**.', 'Bewertung: a) 4 P, b) 2 P.'],
        sol: [['walk', {t: 'Insertion Sort als Balkendiagramm', steps: [
          {t: '**Start:** Der linke Teil (nur 620) gilt als sortiert.', b: [bars([620, 480, 910, 200, 750], 0, 'Ausgangsfeld')]},
          {t: '**Durchlauf 1:** 480 wird gezogen; 620 > 480 rückt nach rechts, 480 an Index 0.', b: [bars([480, 620, 910, 200, 750], 0, 'nach Durchlauf 1')]},
          {t: '**Durchlauf 2:** 910 ist größer als 620, bleibt stehen (nur ein Vergleich).', b: [bars([480, 620, 910, 200, 750], 2, 'nach Durchlauf 2')]},
          {t: '**Durchlauf 3:** 200 wandert an allen drei vorbei ganz nach vorn (3 Verschiebungen).', b: [bars([200, 480, 620, 910, 750], 0, 'nach Durchlauf 3')]},
          {t: '**Durchlauf 4:** 750 rückt vor 910. Fertig.', b: [bars([200, 480, 620, 750, 910], 3, 'sortiert'), ['tool', 'sort']]},
        ]}]],
        see: ['eua-sortieren']},
    ],
  });
  AP2.exam.end(ID);
})();
