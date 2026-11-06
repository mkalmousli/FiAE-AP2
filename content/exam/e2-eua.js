// Probeprüfung 2, Entwicklung und Umsetzung von Algorithmen: VoltWerk GmbH, Plattform "VoltWerk Connect".
(function () {
  const ID = 'exam2-eua';
  const SPITZE = [3.2, 11.5, 12.0, 4.1, 11.1, 13.4, 14.0, 2.5, 11.9];
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 2 (Energie)', t: 'Algorithmen: Ladeplattform VoltWerk Connect', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.eua,
    hint: 'Realistischer Aufgabensatz: 4 Handlungsschritte zu je 25 Punkten, 90 Minuten. Programmieraufgaben in Pseudocode oder in einer Sprache Ihrer Wahl. Die Musterlösungen zeigen mehrere Sprachen, Struktogramme, Tabellen und Schritt-für-Schritt-Lösungswege. Schwierige Wörter stehen im Wörterbuch unten und bei den Aufgaben.',
    intro: [
      ['p', 'Sie entwickeln bei der **Softwarehaus Neckar GmbH** die Plattform **VoltWerk Connect** für die **VoltWerk GmbH** weiter. VoltWerk betreibt Ladesäulen für Elektroautos und Photovoltaikanlagen (Solaranlagen). Jeder Ladepunkt sendet jede Stunde einen **Messwert**: die mittlere Ladeleistung in Kilowatt (kW).'],
      ['kv', [['leistung[0] bis leistung[23]', 'Feld mit den 24 Stundenwerten eines Tages in kW'], ['Fehlwert', 'Der Wert **-1** bedeutet: Die Messung ist ausgefallen. Fehlwerte zählen nicht mit.'], ['Indizes', 'beginnen bei 0; länge(feld) liefert die Anzahl der Elemente'], ['Sprache', 'Pseudocode oder Java, C#, Python, JavaScript nach Wahl']]],
    ],
    words: [['Feld (Array)', 'Liste mit festen Plätzen, jeder Platz hat einen Index'], ['Index', 'Nummer eines Platzes im Feld, beginnt bei 0'], ['Fehlwert', 'Messwert, der nicht gültig ist (hier -1)'], ['Schreibtischtest', 'Programm von Hand durchrechnen und die Werte in eine Tabelle schreiben'],
      ['Ganzzahldivision', 'Teilen von zwei ganzen Zahlen ohne Nachkommastelle, z. B. 7 / 2 = 3'], ['Schnittstelle (Interface)', 'Liste von Methoden, die eine Klasse anbieten muss'], ['abstrakte Klasse', 'Oberklasse, von der man kein Objekt erzeugen kann'], ['überschreiben', 'Unterklasse ersetzt eine Methode der Oberklasse'],
      ['Singleton', 'Klasse, von der es nur ein Objekt gibt'], ['Konstruktor', 'Methode, die ein neues Objekt erzeugt und füllt'], ['Polymorphie', 'dieselbe Methode wirkt je nach Objekt anders'], ['View', 'gespeicherte Abfrage, die sich wie eine Tabelle benutzen lässt'], ['GRANT / REVOKE', 'Rechte geben / Rechte entziehen'],
      ['Transaktion', 'Gruppe von Befehlen, die ganz oder gar nicht ausgeführt wird'], ['Prüfziffer', 'letzte Ziffer einer Nummer, die Tippfehler entdeckt'], ['Modulo (MOD)', 'Rest einer Division, z. B. 17 MOD 5 = 2'], ['Stack', 'Stapel: zuletzt hinein, zuerst heraus (LIFO)'], ['Queue', 'Warteschlange: zuerst hinein, zuerst heraus (FIFO)'], ['Rekursion', 'eine Funktion ruft sich selbst auf'], ['Abbruchbedingung', 'Fall, in dem die Rekursion endet']]});

  // Handlungsschritt 1
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Messwerte auswerten (25 Punkte)',
    tasks: [
      {pts: 10, rows: 14, topic: 'Algorithmus entwickeln', op: '**Entwickeln** heißt: Sie schreiben die Lösung selbst, vollständig und ausführbar.', hint: 'Eine Schleife genügt. Zählen Sie die gültigen Werte mit. Der erste gültige Wert setzt Minimum und Maximum. Nicht mit 0 starten!',
        words: [['gültig', 'Wert, der nicht -1 ist'], ['Mittelwert', 'Summe geteilt durch Anzahl']],
        q: 'Entwickeln Sie die Funktion **statistik(leistung)**. Sie durchläuft das Feld **einmal** und gibt das Feld **[Minimum, Maximum, Mittelwert]** der **gültigen** Werte zurück (Fehlwerte -1 werden ignoriert). Gibt es keinen gültigen Wert, wird **[-1, -1, -1]** zurückgegeben.',
        a: ['Kernidee: Zähler für gültige Werte; erster gültiger Wert setzt Minimum und Maximum; Summe und Anzahl für den Mittelwert; Prüfung auf Anzahl 0 **nach** der Schleife.',
          ['codes', [['pseudo', `funktion statistik(leistung)
    min = 0
    max = 0
    summe = 0
    anzahl = 0
    für i = 0 bis länge(leistung) - 1
        wenn leistung[i] >= 0 dann
            wenn anzahl = 0 dann
                min = leistung[i]
                max = leistung[i]
            sonst
                wenn leistung[i] < min dann
                    min = leistung[i]
                ende wenn
                wenn leistung[i] > max dann
                    max = leistung[i]
                ende wenn
            ende wenn
            summe = summe + leistung[i]
            anzahl = anzahl + 1
        ende wenn
    ende für
    wenn anzahl = 0 dann
        rückgabe [-1, -1, -1]
    ende wenn
    rückgabe [min, max, summe / anzahl]
ende funktion`], ['java', `static double[] statistik(double[] leistung) {
    double min = 0, max = 0, summe = 0;
    int anzahl = 0;
    for (int i = 0; i < leistung.length; i++) {
        if (leistung[i] < 0) continue;            // Fehlwert überspringen
        if (anzahl == 0 || leistung[i] < min) min = leistung[i];
        if (anzahl == 0 || leistung[i] > max) max = leistung[i];
        summe += leistung[i];
        anzahl++;
    }
    if (anzahl == 0) return new double[]{-1, -1, -1};
    return new double[]{min, max, summe / anzahl};
}`], ['python', `def statistik(leistung):
    gueltig = [w for w in leistung if w >= 0]
    if not gueltig:
        return [-1, -1, -1]
    return [min(gueltig), max(gueltig), sum(gueltig) / len(gueltig)]`], ['csharp', `static double[] Statistik(double[] leistung)
{
    double min = 0, max = 0, summe = 0;
    int anzahl = 0;
    foreach (double w in leistung)
    {
        if (w < 0) continue;
        if (anzahl == 0 || w < min) min = w;
        if (anzahl == 0 || w > max) max = w;
        summe += w;
        anzahl++;
    }
    return anzahl == 0 ? new double[] { -1, -1, -1 } : new[] { min, max, summe / anzahl };
}`]]],
          'Bewertung: Initialisierung 1 P, Schleife über alle Indizes 1 P, Fehlwerte ignorieren 2 P, Minimum und Maximum richtig (erster gültiger Wert) 3 P, Summe und Anzahl 1 P, Sonderfall keine gültigen Werte 1 P, Rückgabe 1 P.'],
        sol: [['diagram', AP2.dg.nsd([['act', 'min = 0, max = 0, summe = 0, anzahl = 0'], ['for', 'für i = 0 bis länge(leistung) - 1', [['if', 'leistung[i] >= 0 ?', [
          ['if', 'anzahl = 0 ?', [['act', 'min = leistung[i]'], ['act', 'max = leistung[i]']], [['if', 'leistung[i] < min ?', [['act', 'min = leistung[i]']], [['act', '(nichts)']]], ['if', 'leistung[i] > max ?', [['act', 'max = leistung[i]']], [['act', '(nichts)']]]]],
          ['act', 'summe = summe + leistung[i]'], ['act', 'anzahl = anzahl + 1']], [['act', '(Fehlwert überspringen)']]]]],
          ['if', 'anzahl = 0 ?', [['act', 'rückgabe [-1, -1, -1]']], [['act', 'rückgabe [min, max, summe / anzahl]']]]], {w: 720, cap: 'Dieselbe Lösung als Struktogramm (Nassi-Shneiderman)'})],
          ['warn', 'Typische Fehler: Minimum mit 0 starten (dann bleibt es immer 0), Maximum mit -1 starten (Fehlwerte gewinnen), durch länge(leistung) statt durch die Anzahl gültiger Werte teilen, Prüfung auf Anzahl 0 vergessen (Division durch 0).']],
        see: ['eua-algoexam', 'eua-pseudocode', 'ps-struktogramm']},
      {pts: 7, rows: 10, topic: 'Schreibtischtest', op: '**Führen Sie einen Schreibtischtest durch** heißt: Sie rechnen jede Zeile von Hand und schreiben die Werte nach jedem Durchlauf in eine Tabelle.', hint: 'Legen Sie die Spalten i, werte[i], aktuell und beste an. Tragen Sie nach jedem Durchlauf alle Werte ein, auch die, die gleich bleiben.',
        words: [['Durchlauf', 'ein Mal die Schleife von oben bis unten'], ['aufeinanderfolgend', 'direkt hintereinander']],
        q: 'Gegeben ist die Funktion **laengsteSpitze(werte, grenze)**. Führen Sie einen Schreibtischtest für werte = [3.2, 11.5, 12.0, 4.1, 11.1, 13.4, 14.0, 2.5, 11.9] und grenze = 11.0 durch. Notieren Sie nach jedem Durchlauf i, werte[i], aktuell und beste. b) Geben Sie den Rückgabewert an und beschreiben Sie, was die Funktion ermittelt. c) Geben Sie die Laufzeitkomplexität in O-Notation an.',
        ctx: [['code', 'pseudo', `funktion laengsteSpitze(werte, grenze)
    aktuell = 0
    beste = 0
    für i = 0 bis länge(werte) - 1
        wenn werte[i] > grenze dann
            aktuell = aktuell + 1
            wenn aktuell > beste dann
                beste = aktuell
            ende wenn
        sonst
            aktuell = 0
        ende wenn
    ende für
    rückgabe beste
ende funktion`]],
        a: [['table', ['nach Durchlauf', 'i', 'werte[i]', '> grenze?', 'aktuell', 'beste'], [['Start', '-', '-', '-', '0', '0'], ['1', '0', '3,2', 'nein', '0', '0'], ['2', '1', '11,5', 'ja', '1', '1'], ['3', '2', '12,0', 'ja', '2', '2'], ['4', '3', '4,1', 'nein', '0', '2'], ['5', '4', '11,1', 'ja', '1', '2'], ['6', '5', '13,4', 'ja', '2', '2'], ['7', '6', '14,0', 'ja', '3', '**3**'], ['8', '7', '2,5', 'nein', '0', '3'], ['9', '8', '11,9', 'ja', '1', '3']]],
          'b) Rückgabewert **3**. Die Funktion ermittelt die **längste Folge direkt aufeinanderfolgender Stunden**, in denen der Messwert über der Grenze liegt (längste Spitzenphase).', 'c) Jeder Wert wird genau einmal betrachtet: **O(n)**, also linear.', 'Bewertung: Tabelle 4 P (je 2 Fehler in Folge 1 P Abzug), Rückgabewert 1 P, Zweck 1 P, Laufzeit 1 P.'],
        sol: [['chart', {kind: 'bar', w: 700, h: 260, labels: SPITZE.map((v, i) => 'i=' + i), series: [{n: 'Leistung (kW)', d: SPITZE, k: 'accent'}], vals: true, ymax: 16, yl: 'kW', cap: 'Messwerte: Über der Grenze 11,0 liegen die Stunden 1-2, 4-6 und 8. Die längste Folge sind die Stunden 4, 5, 6 (drei Werte).'}],
          ['tip', 'Das „sonst“ setzt **aktuell** auf 0, aber **beste** bleibt erhalten. Darum merkt sich beste die längste Folge, auch wenn danach eine kürzere kommt.']],
        see: ['eua-algoexam', 'eua-debugging', 'eua-onotation']},
      {pts: 8, rows: 12, topic: 'Fehlersuche', op: '**Nennen und korrigieren** heißt: Sie zeigen die falsche Stelle und schreiben die richtige Version.', hint: 'Prüfen Sie: Start und Ende der Schleife, Fehlwerte, den Teiler und den Datentyp bei der Division. Rechnen Sie mit werte = [4, -1, 8].',
        words: [['Index außerhalb', 'Zugriff auf einen Platz, den es nicht gibt (Fehler)'], ['Grenzfall', 'Sonderfall am Rand, z. B. ein leeres Feld']],
        q: 'Die Funktion **mittelwert(werte)** soll den Mittelwert aller **gültigen** Werte (nicht -1) liefern und bei keinem gültigen Wert -1. In Java sind summe und die Rückgabe vom Typ int. a) Nennen Sie vier Fehler. b) Schreiben Sie die korrigierte Funktion. c) Geben Sie einen Testfall mit erwartetem Ergebnis an, der die Korrektur zeigt.',
        ctx: [['code', 'pseudo', `funktion mittelwert(werte)
    summe = 0
    für i = 1 bis länge(werte)
        summe = summe + werte[i]
    ende für
    rückgabe summe / länge(werte)
ende funktion`]],
        a: ['a) (1) **Schleife:** startet bei 1 und endet bei länge. Das erste Element wird übersprungen, und werte[länge] gibt es nicht (Index außerhalb). Richtig: 0 bis länge - 1. (2) **Fehlwerte:** -1 wird mitgerechnet. (3) **Teiler:** länge(werte) zählt auch Fehlwerte; es muss die Anzahl gültiger Werte sein. Bei keinem gültigen Wert gäbe es Division durch 0. (4) **Datentyp:** Mit int ist es eine Ganzzahldivision, Nachkommastellen gehen verloren. (je 1 P)',
          ['codes', [['pseudo', `funktion mittelwert(werte)
    summe = 0.0
    anzahl = 0
    für i = 0 bis länge(werte) - 1
        wenn werte[i] >= 0 dann
            summe = summe + werte[i]
            anzahl = anzahl + 1
        ende wenn
    ende für
    wenn anzahl = 0 dann
        rückgabe -1
    ende wenn
    rückgabe summe / anzahl
ende funktion`], ['java', `static double mittelwert(double[] werte) {
    double summe = 0;
    int anzahl = 0;
    for (int i = 0; i < werte.length; i++) {
        if (werte[i] >= 0) { summe += werte[i]; anzahl++; }
    }
    return anzahl == 0 ? -1 : summe / anzahl;
}`], ['python', `def mittelwert(werte):
    gueltig = [w for w in werte if w >= 0]
    return sum(gueltig) / len(gueltig) if gueltig else -1`]]],
          'c) Zum Beispiel werte = [4, -1, 8] gibt **6,0**. Die fehlerhafte Version rechnet (-1 + 8) / 3 und gibt in Java **2** (Ganzzahldivision, erster Wert fehlt, Index 3 wirft eine Ausnahme). Zweiter Test: [-1, -1] gibt **-1**. (1 P)',
          'Bewertung: a) 4 P, b) 3 P (Schleife, Prüfung Fehlwert, Teiler und Sonderfall), c) 1 P.'],
        sol: [['table', ['Zeile', 'Fehler', 'Folge bei [4, -1, 8]'], [['für i = 1 bis länge', 'falsche Grenzen', 'werte[0] = 4 fehlt, werte[3] gibt es nicht'], ['summe + werte[i]', 'Fehlwert wird addiert', 'Summe enthält -1'], ['summe / länge', 'falscher Teiler', 'durch 3 statt durch 2'], ['int-Division', 'Ganzzahl', 'Nachkommastelle weg']]]],
        see: ['eua-debugging', 'eua-datentypen', 'eua-testfaelle']},
    ],
  });

  // Handlungsschritt 2
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Objektorientiert modellieren und programmieren (25 Punkte)',
    intro: 'Die Abrechnung von VoltWerk Connect wird objektorientiert entwickelt. Anlage 1 zeigt das Klassendiagramm. Der Arbeitspreis je kWh steht in der Klasse **Tarifverwaltung**. Es gibt nur eine Tarifverwaltung im ganzen System.',
    ctx: [['h3', 'Anlage 1: Klassendiagramm Abrechnung'], ['diagram', {w: 900, h: 400, keep: 760, cap: 'Klassendiagramm: Abrechenbar, Ladepunkt (abstrakt), AcLadepunkt, DcLadepunkt, Tarifverwaltung', nodes: [
      {id: 'ab', k: 'cls', x: 150, y: 70, w: 270, t: {name: ['«interface»', 'Abrechenbar'], ops: ['+ kosten(kwh: double): double']}},
      {id: 'lp', k: 'cls', x: 150, y: 235, w: 270, s: 'accent', t: {name: ['«abstract»', 'Ladepunkt'], attrs: ['- id: String', '# maxKw: int'], ops: ['+ Ladepunkt(id: String, maxKw: int)', '+ getId(): String', '# grundgebuehr(): double {abstract}', '+ kosten(kwh: double): double']}},
      {id: 'ac', k: 'cls', x: 60, y: 365, w: 120, t: {name: 'AcLadepunkt', ops: ['# grundgebuehr()']}}, {id: 'dc', k: 'cls', x: 270, y: 365, w: 190, t: {name: 'DcLadepunkt', ops: ['# grundgebuehr()', '+ kosten(kwh)']}},
      {id: 'tv', k: 'cls', x: 650, y: 235, w: 280, s: 'gold', t: {name: 'Tarifverwaltung', attrs: ['- instanz: Tarifverwaltung {static}', '- arbeitspreis: double'], ops: ['- Tarifverwaltung()', '+ getInstance(): Tarifverwaltung {static}', '+ getArbeitspreis(): double', '+ setArbeitspreis(p: double)']}},
    ], edges: [{a: 'lp', b: 'ab', k: 'dash', ea: 'tri'}, {a: 'ac', b: 'lp', ea: 'tri'}, {a: 'dc', b: 'lp', ea: 'tri'}, {a: 'lp', b: 'tv', k: 'dash', ea: 'open', t: '«use»'}]}]],
    tasks: [
      {pts: 4, topic: 'Klassendiagramm lesen', op: '**Erläutern** heißt: sagen, was es ist, und warum. Immer mit „weil“ oder einem Beispiel.', hint: 'Gestrichelt mit Dreieck = realisiert. Durchgezogen mit Dreieck = erbt. Das Zeichen # heißt protected.',
        words: [['protected (#)', 'sichtbar in der Klasse und ihren Unterklassen'], ['realisiert', 'die Klasse baut alle Methoden der Schnittstelle'], ['statisch (static)', 'gehört zur Klasse, nicht zu einem Objekt']],
        q: 'a) Benennen Sie die Beziehung zwischen Ladepunkt und Abrechenbar sowie zwischen DcLadepunkt und Ladepunkt. b) Erläutern Sie, warum die Klasse Ladepunkt abstrakt ist. c) Was bedeutet das Zeichen # bei maxKw?',
        a: ['a) Ladepunkt **realisiert** (implementiert) das Interface Abrechenbar (gestrichelter Pfeil mit Dreieck). DcLadepunkt **erbt** von Ladepunkt (Generalisierung, durchgezogener Pfeil). (2 P)', 'b) Es gibt keinen „allgemeinen“ Ladepunkt. Die Gebühr hängt vom Typ ab: grundgebuehr() ist **abstrakt** und erst in AcLadepunkt und DcLadepunkt umgesetzt. Von einer abstrakten Klasse kann man **kein Objekt** erzeugen. (1 P)', 'c) **protected**: maxKw ist in Ladepunkt und in den Unterklassen sichtbar, aber nicht von außen. (1 P)'],
        see: ['eua-umlcode', 'eua-oop', 'eua-interface']},
      {pts: 10, rows: 16, topic: 'Klassen implementieren', op: '**Implementieren** heißt: den Code der Klassen vollständig schreiben.', hint: 'Schreiben Sie zuerst das Interface, dann Ladepunkt, dann die Unterklassen. Der Konstruktor einer Unterklasse ruft super(...) auf. Kosten = kWh mal Arbeitspreis plus Grundgebühr.',
        words: [['super', 'Aufruf der Oberklasse (Konstruktor oder Methode)'], ['Arbeitspreis', 'Preis je Kilowattstunde'], ['Grundgebühr', 'fester Betrag je Ladung']],
        q: 'Implementieren Sie nach Anlage 1 die Typen **Abrechenbar**, **Ladepunkt**, **AcLadepunkt** und **DcLadepunkt**. Die Kosten einer Ladung sind **kwh x Arbeitspreis + Grundgebühr**. Den Arbeitspreis liefert Tarifverwaltung.getInstance().getArbeitspreis(). AC-Ladepunkte haben die Grundgebühr 0,00, DC-Ladepunkte 1,50 Euro. Bei DC-Ladepunkten kommt zusätzlich ein **Schnellladezuschlag von 0,10 Euro je kWh** dazu. Die Unterklassen erhalten id und maxKw im Konstruktor.',
        a: [['codes', [['java', `interface Abrechenbar {
    double kosten(double kwh);
}

abstract class Ladepunkt implements Abrechenbar {
    private String id;
    protected int maxKw;

    public Ladepunkt(String id, int maxKw) {
        this.id = id;
        this.maxKw = maxKw;
    }
    public String getId() { return id; }

    protected abstract double grundgebuehr();

    @Override
    public double kosten(double kwh) {
        return kwh * Tarifverwaltung.getInstance().getArbeitspreis() + grundgebuehr();
    }
}

class AcLadepunkt extends Ladepunkt {
    public AcLadepunkt(String id, int maxKw) { super(id, maxKw); }
    @Override protected double grundgebuehr() { return 0.0; }
}

class DcLadepunkt extends Ladepunkt {
    public DcLadepunkt(String id, int maxKw) { super(id, maxKw); }
    @Override protected double grundgebuehr() { return 1.50; }
    @Override public double kosten(double kwh) {
        return super.kosten(kwh) + 0.10 * kwh;     // Schnellladezuschlag
    }
}`], ['python', `from abc import ABC, abstractmethod

class Abrechenbar(ABC):
    @abstractmethod
    def kosten(self, kwh): ...

class Ladepunkt(Abrechenbar):
    def __init__(self, id, max_kw):
        self._id = id
        self._max_kw = max_kw
    def get_id(self):
        return self._id
    @abstractmethod
    def grundgebuehr(self): ...
    def kosten(self, kwh):
        return kwh * Tarifverwaltung.get_instance().get_arbeitspreis() + self.grundgebuehr()

class AcLadepunkt(Ladepunkt):
    def grundgebuehr(self):
        return 0.0

class DcLadepunkt(Ladepunkt):
    def grundgebuehr(self):
        return 1.50
    def kosten(self, kwh):
        return super().kosten(kwh) + 0.10 * kwh`], ['csharp', `interface IAbrechenbar { double Kosten(double kwh); }

abstract class Ladepunkt : IAbrechenbar
{
    public string Id { get; }
    protected int MaxKw;
    protected Ladepunkt(string id, int maxKw) { Id = id; MaxKw = maxKw; }
    protected abstract double Grundgebuehr();
    public virtual double Kosten(double kwh) =>
        kwh * Tarifverwaltung.GetInstance().Arbeitspreis + Grundgebuehr();
}

class AcLadepunkt : Ladepunkt
{
    public AcLadepunkt(string id, int maxKw) : base(id, maxKw) { }
    protected override double Grundgebuehr() => 0.0;
}

class DcLadepunkt : Ladepunkt
{
    public DcLadepunkt(string id, int maxKw) : base(id, maxKw) { }
    protected override double Grundgebuehr() => 1.50;
    public override double Kosten(double kwh) => base.Kosten(kwh) + 0.10 * kwh;
}`]]],
          'Bewertung: Interface 1 P; abstrakte Klasse mit Attributen, Konstruktor, getId 3 P; kosten in Ladepunkt (Aufruf der abstrakten Methode, Tarif über getInstance) 2 P; AcLadepunkt 1 P; DcLadepunkt mit super-Konstruktor und Grundgebühr 1 P; kosten überschreiben mit super.kosten und Zuschlag 2 P.'],
        sol: [['table', ['Klasse', 'grundgebuehr()', 'kosten(20 kWh) bei 0,40 Euro/kWh'], [['AcLadepunkt', '0,00', '20 x 0,40 + 0,00 = **8,00**'], ['DcLadepunkt', '1,50', '20 x 0,40 + 1,50 + 0,10 x 20 = 8,00 + 1,50 + 2,00 = **11,50**']]],
          ['tip', '**Template Method:** kosten() in der Oberklasse ruft grundgebuehr() auf, die jede Unterklasse selbst festlegt. Neue Ladepunkt-Typen brauchen nur diese eine Methode.']],
        see: ['eua-oop', 'eua-interface', 'eua-konstruktor']},
      {pts: 6, rows: 10, topic: 'Singleton', op: '**Implementieren** heißt: Code schreiben. **Begründen** heißt: mit „weil“ erklären.', hint: 'Drei Dinge: privater Konstruktor, statisches Attribut für die Instanz, statische Methode getInstance. Die Instanz wird erst bei Bedarf angelegt (Lazy).',
        words: [['Instanz', 'ein konkretes Objekt einer Klasse'], ['thread-sicher', 'funktioniert auch, wenn mehrere Abläufe gleichzeitig laufen']],
        q: 'a) Implementieren Sie die Klasse **Tarifverwaltung** nach dem Singleton-Muster mit den Methoden aus Anlage 1. Der Arbeitspreis ist am Anfang 0,40. b) Begründen Sie, warum der Konstruktor privat ist. c) Nennen Sie ein Problem der einfachen Lazy-Variante bei mehreren Threads und eine Lösung.',
        a: [['codes', [['java', `public class Tarifverwaltung {
    private static Tarifverwaltung instanz;       // die einzige Instanz
    private double arbeitspreis = 0.40;

    private Tarifverwaltung() { }                 // von außen nicht aufrufbar

    public static synchronized Tarifverwaltung getInstance() {
        if (instanz == null) {
            instanz = new Tarifverwaltung();      // erst beim ersten Aufruf
        }
        return instanz;
    }
    public double getArbeitspreis() { return arbeitspreis; }
    public void setArbeitspreis(double p) { arbeitspreis = p; }
}`], ['python', `class Tarifverwaltung:
    _instanz = None

    def __new__(cls):
        if cls._instanz is None:
            cls._instanz = super().__new__(cls)
            cls._instanz._arbeitspreis = 0.40
        return cls._instanz

    @classmethod
    def get_instance(cls):
        return cls()

    def get_arbeitspreis(self):
        return self._arbeitspreis

    def set_arbeitspreis(self, p):
        self._arbeitspreis = p`], ['csharp', `public sealed class Tarifverwaltung
{
    private static readonly Lazy<Tarifverwaltung> instanz = new(() => new Tarifverwaltung());
    public double Arbeitspreis { get; set; } = 0.40;
    private Tarifverwaltung() { }
    public static Tarifverwaltung GetInstance() => instanz.Value;
}`]]],
          'Bewertung: privater Konstruktor 1 P, statisches Attribut 1 P, getInstance mit Prüfung auf null 2 P, get/set 1 P; b) 1 P; c) 1 P (hier ohne weitere Punkte für synchronized).',
          'b) Wäre der Konstruktor öffentlich, könnte jede Klasse mit **new** eigene Tarifverwaltungen erzeugen. Dann gäbe es **verschiedene Arbeitspreise** im System. Privat erzwingt: Nur getInstance() erzeugt das Objekt.', 'c) Zwei Threads prüfen gleichzeitig „instanz == null“ und erzeugen **zwei Objekte**. Lösung: **synchronized** auf getInstance, **Initialisierung beim Laden der Klasse** (eager) oder ein statisches Holder-Objekt.'],
        sol: [['diagram', {w: 760, h: 240, keep: 600, cap: 'Singleton: Alle Aufrufer erhalten dieselbe Instanz', nodes: [
          {id: 'a', k: 'box', x: 90, y: 60, w: 130, h: 44, t: 'DcLadepunkt', s: 'soft'}, {id: 'b', k: 'box', x: 90, y: 130, w: 130, h: 44, t: 'AcLadepunkt', s: 'soft'}, {id: 'c', k: 'box', x: 90, y: 200, w: 130, h: 44, t: 'Dashboard', s: 'soft'},
          {id: 'g', k: 'box', x: 330, y: 130, w: 150, h: 56, t: ['getInstance()', 'prüft: null?'], s: 'accent'}, {id: 'i', k: 'box', x: 590, y: 130, w: 190, h: 70, t: ['instanz', 'arbeitspreis = 0,40'], s: 'gold'},
        ], edges: [{a: 'a', b: 'g'}, {a: 'b', b: 'g'}, {a: 'c', b: 'g'}, {a: 'g', b: 'i'}]}]],
        see: ['eua-patterns']},
      {pts: 5, rows: 8, topic: 'Ausgabe bestimmen', op: '**Bestimmen** heißt: durch Rechnen oder Nachdenken das Ergebnis finden. Schreiben Sie die Rechnung auf.', hint: 'Welche Klasse hat das Objekt in Wahrheit? Diese kosten()-Methode läuft. Der Preis steht in der einen Tarifverwaltung.',
        words: [['Polymorphie', 'ein Aufruf, aber je nach Objekt läuft anderer Code'], ['Referenz', 'Verweis auf ein Objekt']],
        q: 'Gegeben ist das Programm unten (kosten ist auf zwei Stellen gerundet). a) Geben Sie die Ausgabe an. b) Erläutern Sie, warum bei punkte[1].kosten(20) die Methode der Klasse DcLadepunkt läuft. c) Erläutern Sie, warum die Preisänderung alle Ladepunkte betrifft.',
        ctx: [['code', 'java', `Ladepunkt[] punkte = {
    new AcLadepunkt("A1", 11), new DcLadepunkt("D1", 150), new DcLadepunkt("D2", 50)
};
for (Ladepunkt p : punkte) {
    System.out.println(p.getId() + ": " + p.kosten(20));
}
Tarifverwaltung.getInstance().setArbeitspreis(0.50);
System.out.println(punkte[0].kosten(20));
System.out.println(punkte[1].kosten(20));
System.out.println(Tarifverwaltung.getInstance() == Tarifverwaltung.getInstance());`]],
        a: [['out', `A1: 8.00
D1: 11.50
D2: 11.50
10.00
13.50
true`], 'Rechnung (Ausgabe als zwei Stellen gerundet): A1: 20 x 0,40 = 8,00. D1 und D2: 8,00 + 1,50 + 2,00 = 11,50. Nach der Preisänderung auf 0,50: A1: 20 x 0,50 = 10,00. D1: 10,00 + 1,50 + 2,00 = 13,50. (3 P)', 'b) **Dynamische Bindung (Polymorphie):** Die Variable hat den Typ Ladepunkt, das Objekt aber ist ein DcLadepunkt. Zur Laufzeit wird die Methode der **tatsächlichen Klasse** gewählt, also die überschriebene kosten-Methode. (1 P)', 'c) Es gibt **nur eine Instanz** der Tarifverwaltung. Alle Ladepunkte lesen denselben arbeitspreis. Der Vergleich der beiden getInstance()-Aufrufe ist darum true. (1 P)'],
        see: ['eua-oop', 'eua-patterns']},
    ],
  });

  // Handlungsschritt 3
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Datenbank abfragen und Rechte vergeben (25 Punkte)',
    intro: 'VoltWerk speichert Ladepunkte, Kunden und Ladevorgänge in einer relationalen Datenbank. Anlage 2 zeigt das Schema und Beispieldaten. Primärschlüssel sind unterstrichen gedacht (erste Spalte), Fremdschlüssel haben den Namen der Tabelle, auf die sie zeigen.',
    ctx: [['h3', 'Anlage 2: Datenbankschema und Beispieldaten'],
      ['kv', [['standort', '(standort_id, ort)'], ['ladepunkt', '(punkt_id, standort_id, typ, max_kw, status)'], ['kunde', '(kunde_id, name, tarif, guthaben)'], ['ladevorgang', '(vorgang_id, punkt_id, kunde_id, datum, kwh, betrag)']]],
      ['row', [['table', ['standort_id', 'ort'], [['1', 'Heilbronn Nord'], ['2', 'Neckarsulm'], ['3', 'Bad Wimpfen']]], ['table', ['punkt_id', 'standort_id', 'typ', 'max_kw', 'status'], [['1', '1', 'AC', '22', 'frei'], ['2', '1', 'DC', '150', 'lädt'], ['3', '2', 'DC', '50', 'frei'], ['4', '2', 'AC', '11', 'gestört'], ['5', '3', 'AC', '22', 'frei']]], ['table', ['kunde_id', 'name', 'tarif', 'guthaben'], [['1', 'Lena Maier', 'Basic', '20,00'], ['2', 'Omar Yilmaz', 'Plus', '5,00'], ['3', 'Eva Roth', 'Basic', '60,00']]]]],
      ['table', ['vorgang_id', 'punkt_id', 'kunde_id', 'datum', 'kwh', 'betrag'], [['101', '1', '1', '2026-10-03', '18,5', '7,40'], ['102', '2', '2', '2026-10-03', '42,0', '21,00'], ['103', '2', '3', '2026-10-05', '35,0', '17,50'], ['104', '3', '1', '2026-10-07', '28,0', '14,00'], ['105', '4', '2', '2026-10-08', '9,5', '3,80'], ['106', '2', '1', '2026-10-12', '50,0', '25,00'], ['107', '5', '3', '2026-10-14', '12,0', '4,80'], ['108', '3', '3', '2026-11-02', '31,0', '15,50']]]],
    tasks: [
      {pts: 6, rows: 9, topic: 'SQL: Auswertung', op: '**Formulieren** heißt: die SQL-Abfrage vollständig aufschreiben. **Geben Sie das Ergebnis an** heißt: die Ergebnistabelle zeichnen.', hint: 'Drei Tabellen verbinden: ladevorgang, ladepunkt, standort. WHERE filtert Zeilen vor dem Gruppieren. HAVING filtert Gruppen danach.',
        words: [['gruppieren (GROUP BY)', 'Zeilen mit gleichem Wert zu einer Zeile zusammenfassen'], ['HAVING', 'Bedingung für Gruppen, z. B. nach COUNT oder SUM'], ['Alias (AS)', 'Kurzname für eine Spalte oder Tabelle']],
        q: 'Das Controlling will für **Oktober 2026** je Standort die Anzahl der Ladevorgänge, die Summe der kWh und den Umsatz sehen. Nur Standorte mit **mindestens 2 Ladevorgängen** sollen erscheinen. Sortieren Sie nach der Summe der kWh absteigend. a) Formulieren Sie die SQL-Abfrage. b) Geben Sie das Ergebnis für die Beispieldaten an.',
        a: [['code', 'sql', `SELECT s.ort,
       COUNT(*)      AS anzahl,
       SUM(v.kwh)    AS summe_kwh,
       SUM(v.betrag) AS umsatz
FROM ladevorgang v
JOIN ladepunkt p ON v.punkt_id = p.punkt_id
JOIN standort s  ON p.standort_id = s.standort_id
WHERE v.datum >= '2026-10-01' AND v.datum < '2026-11-01'
GROUP BY s.standort_id, s.ort
HAVING COUNT(*) >= 2
ORDER BY summe_kwh DESC;`], ['table', ['ort', 'anzahl', 'summe_kwh', 'umsatz'], [['Heilbronn Nord', '4', '145,5', '70,90'], ['Neckarsulm', '2', '37,5', '17,80']]],
          'Bewertung: Joins über zwei Fremdschlüssel 2 P, WHERE mit Datumsbereich 1 P, GROUP BY 1 P, HAVING 1 P, ORDER BY 0,5 P und Ergebnis 0,5 P.'],
        sol: [['walk', {t: 'Auswertung Schritt für Schritt', steps: [
          {t: '**Nach JOIN und WHERE** bleiben 7 Zeilen: Vorgang 108 (November) fällt weg. Jeder Vorgang bekommt den Ort seines Ladepunkts.', b: [['table', ['vorgang_id', 'ort', 'kwh', 'betrag'], [['101', 'Heilbronn Nord', '18,5', '7,40'], ['102', 'Heilbronn Nord', '42,0', '21,00'], ['103', 'Heilbronn Nord', '35,0', '17,50'], ['106', 'Heilbronn Nord', '50,0', '25,00'], ['104', 'Neckarsulm', '28,0', '14,00'], ['105', 'Neckarsulm', '9,5', '3,80'], ['107', 'Bad Wimpfen', '12,0', '4,80']]]]},
          {t: '**GROUP BY** fasst je Ort zusammen. Bad Wimpfen hat nur 1 Vorgang.', b: [['table', ['ort', 'COUNT(*)', 'SUM(kwh)', 'SUM(betrag)'], [['Heilbronn Nord', '4', '145,5', '70,90'], ['Neckarsulm', '2', '37,5', '17,80'], ['Bad Wimpfen', '1', '12,0', '4,80']]]]},
          {t: '**HAVING COUNT(*) >= 2** entfernt Bad Wimpfen. **ORDER BY** sortiert nach summe_kwh absteigend: Heilbronn Nord zuerst.', b: [['chart', {kind: 'bar', w: 560, h: 220, labels: ['Heilbronn Nord', 'Neckarsulm', 'Bad Wimpfen (entfällt)'], series: [{n: 'Summe kWh', d: [145.5, 37.5, 12], k: 'accent'}], vals: true, ymax: 170, cap: 'Summe kWh je Standort im Oktober'}]]},
        ]}], ['warn', 'Falle: Eine Bedingung auf COUNT oder SUM gehört in HAVING, nicht in WHERE. Das Datum im WHERE filtert **vor** dem Gruppieren.']],
        see: ['eua-sqlselect', 'eua-sqljoin', 'eua-sqlgroup']},
      {pts: 5, rows: 7, topic: 'SQL: View', op: '**Erstellen** heißt: den Befehl schreiben. **Nennen** heißt: Stichworte.', hint: 'Eine View hat einen Namen und enthält nur ein SELECT. Lassen Sie alle Spalten weg, die Personen erkennbar machen.',
        words: [['anonym', 'ohne Namen oder andere Angaben zu einer Person']],
        q: 'Das Controlling darf keine Kundendaten sehen. a) Erstellen Sie die View **v_vorgang_anonym** mit vorgang_id, ort, typ, datum, kwh und betrag (ohne kunde_id). b) Schreiben Sie eine Abfrage auf die View, die die Summe der kWh je Ladepunkt-Typ liefert, und geben Sie das Ergebnis an. c) Nennen Sie einen Vorteil von Views.',
        a: [['code', 'sql', `CREATE VIEW v_vorgang_anonym AS
SELECT v.vorgang_id, s.ort, p.typ, v.datum, v.kwh, v.betrag
FROM ladevorgang v
JOIN ladepunkt p ON v.punkt_id = p.punkt_id
JOIN standort s  ON p.standort_id = s.standort_id;

SELECT typ, SUM(kwh) AS summe_kwh
FROM v_vorgang_anonym
GROUP BY typ;`], ['table', ['typ', 'summe_kwh'], [['AC', '40,0'], ['DC', '186,0']]],
          'Rechnung: AC = 18,5 + 9,5 + 12,0 = 40,0. DC = 42,0 + 35,0 + 28,0 + 50,0 + 31,0 = 186,0 (alle Monate, die View hat keinen Filter).', 'c) Zum Beispiel: **Datenschutz** (nur bestimmte Spalten sichtbar), **Vereinfachung** (komplexer Join einmal gespeichert), **Unabhängigkeit** (Tabellen können sich ändern, die View bleibt gleich).',
          'Bewertung: a) 3 P (CREATE VIEW, Joins, richtige Spalten ohne kunde_id), b) 1 P, c) 1 P.'],
        see: ['eua-sqlviews']},
      {pts: 5, rows: 7, topic: 'GRANT und REVOKE', op: '**Vergeben** heißt: mit GRANT Rechte geben. **Entziehen** heißt: mit REVOKE zurücknehmen.', hint: 'Geben Sie nur so viele Rechte wie nötig (Prinzip der minimalen Rechte). Rechte kann man auf einzelne Spalten beschränken.',
        words: [['Recht (Privileg)', 'Erlaubnis, etwas in der Datenbank zu tun'], ['Prinzip der minimalen Rechte', 'jeder bekommt nur die Rechte, die er für die Arbeit braucht']],
        q: 'Es gibt die Datenbankbenutzer **controlling** und **service**. a) Controlling soll nur lesend auf die View v_vorgang_anonym zugreifen. b) Service soll alle Ladepunkte lesen und nur die Spalte status ändern dürfen. c) Controlling hat aus Versehen das Recht SELECT auf kunde. Entziehen Sie es. d) Begründen Sie, warum man nicht einfach allen alle Rechte gibt.',
        a: [['code', 'sql', `GRANT SELECT ON v_vorgang_anonym TO controlling;                -- a)

GRANT SELECT ON ladepunkt TO service;                          -- b)
GRANT UPDATE (status) ON ladepunkt TO service;

REVOKE SELECT ON kunde FROM controlling;                       -- c)`],
          'd) **Prinzip der minimalen Rechte:** Fehler und Missbrauch können nur wenig Schaden machen. Personenbezogene Kundendaten bleiben geschützt (Datenschutz, Zugriffskontrolle). Ein gehacktes Konto kann nicht alles löschen. (1 P)', 'Bewertung: a) 1 P, b) 2 P (SELECT und UPDATE auf Spalte), c) 1 P, d) 1 P.'],
        see: ['eua-sqldml', 'eua-sqlviews']},
      {pts: 9, rows: 12, topic: 'Transaktion', op: '**Erläutern** heißt: sagen, was es ist, und warum. **Schreiben** Sie die Befehle in der richtigen Reihenfolge.', hint: 'Eine Transaktion beginnt mit START TRANSACTION und endet mit COMMIT oder ROLLBACK. Zwei Änderungen gehören zusammen: Guthaben abziehen und Vorgang eintragen.',
        words: [['COMMIT', 'Änderungen endgültig speichern'], ['ROLLBACK', 'alle Änderungen seit dem Start zurücknehmen'], ['ACID', 'Atomarität, Konsistenz, Isolation, Dauerhaftigkeit']],
        q: 'Ein Ladevorgang wird in zwei Schritten gebucht: Erst wird das Guthaben des Kunden um den Betrag verringert, dann wird der Ladevorgang eingetragen. Fällt das Guthaben dabei **unter 0**, wird alles zurückgenommen. a) Schreiben Sie die SQL-Befehle für den Vorgang 109 (Ladepunkt 3, Kunde 3, Datum 2026-11-05, 42,0 kWh, 21,00 Euro) einschließlich COMMIT. b) Was passiert beim gleichen Vorgang für Kunde 2 (Guthaben 5,00 Euro)? Geben Sie das Guthaben davor und danach an. c) Erläutern Sie die ACID-Eigenschaften Atomarität und Isolation am Beispiel.',
        a: [['code', 'sql', `START TRANSACTION;

UPDATE kunde
SET guthaben = guthaben - 21.00
WHERE kunde_id = 3;

INSERT INTO ladevorgang (vorgang_id, punkt_id, kunde_id, datum, kwh, betrag)
VALUES (109, 3, 3, '2026-11-05', 42.0, 21.00);

-- Anwendung prüft: SELECT guthaben FROM kunde WHERE kunde_id = 3;   (39,00 >= 0)
COMMIT;`],
          'Bewertung a): START TRANSACTION 1 P, UPDATE 1 P, INSERT 1 P, COMMIT 1 P.',
          'b) Kunde 2: Guthaben vor 5,00. Nach dem UPDATE steht im Zwischenstand 5,00 - 21,00 = **-16,00**. Das ist unter 0, also **ROLLBACK**. Danach ist das Guthaben wieder **5,00** und Vorgang 109 existiert nicht. (2 P)',
          'c) **Atomarität:** Beide Schritte gelten als eine Einheit: ganz oder gar nicht. Ohne Transaktion könnte der Server nach dem UPDATE ausfallen: Der Kunde hat bezahlt, aber der Vorgang fehlt. **Isolation:** Parallele Transaktionen sehen die Zwischenstände der anderen nicht. Zwei gleichzeitige Buchungen für Kunde 3 rechnen nicht beide mit dem alten Guthaben von 60,00 (kein „Lost Update“). (3 P)'],
        sol: [['seq', {w: 760, actors: ['Anwendung', 'Datenbank'], cap: 'Zwei Wege einer Transaktion: COMMIT bei genug Guthaben, ROLLBACK sonst', steps: [
          [0, 1, 'START TRANSACTION', 's'], [0, 1, 'UPDATE kunde (Guthaben - 21,00)', 's'], [0, 1, 'INSERT ladevorgang (109)', 's'], [0, 1, 'SELECT guthaben', 's'], [1, 0, 'Kunde 3: 39,00 / Kunde 2: -16,00', 'r'],
          ['sep', 'Kunde 3: Guthaben >= 0'], [0, 1, 'COMMIT', 's'], [1, 0, 'dauerhaft gespeichert', 'r'], ['sep', 'Kunde 2: Guthaben < 0'], [0, 1, 'ROLLBACK', 's'], [1, 0, 'Zustand wie vor START (5,00)', 'r']]}],
          ['table', ['Zeitpunkt', 'Guthaben Kunde 3', 'Guthaben Kunde 2'], [['vor START', '60,00', '5,00'], ['nach UPDATE (nicht sichtbar für andere)', '39,00', '-16,00'], ['nach COMMIT bzw. ROLLBACK', '**39,00**', '**5,00**']]]],
        see: ['eua-transaktionen', 'eua-sqldml']},
    ],
  });

  // Handlungsschritt 4
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Prüfziffern, Datenstrukturen und Rekursion (25 Punkte)',
    tasks: [
      {pts: 9, rows: 12, topic: 'Prüfziffer', op: '**Berechnen** heißt: Rechenweg zeigen. **Prüfen** heißt: entscheiden, ob die Nummer gültig ist.', hint: 'Rechnen Sie Stelle mal Gewicht, addieren Sie alles. Prüfziffer = (10 minus Rest der Summe geteilt durch 10) und davon wieder den Rest durch 10.',
        words: [['Gewicht', 'Zahl, mit der eine Stelle malgenommen wird'], ['Rest (MOD)', 'was bei der Division übrig bleibt'], ['Vertauschung', 'zwei Nachbarziffern wurden verwechselt']],
        q: 'Die Ladekarten von VoltWerk haben eine **6-stellige Kartennummer** und eine **Prüfziffer** als 7. Stelle. Berechnung: Die Stellen 1 bis 6 werden von links mit den Gewichten **3, 1, 3, 1, 3, 1** multipliziert. S ist die Summe der Produkte. Die Prüfziffer ist **(10 - S MOD 10) MOD 10**. a) Berechnen Sie die Prüfziffer für die Kartennummer 305912. b) Prüfen Sie, ob 6247034 eine gültige Nummer ist. c) Schreiben Sie die Funktion **kartePruefen(nummer)**, die eine 7-stellige Zeichenkette prüft und wahr oder falsch liefert. d) Zeigen Sie an einem Beispiel, dass die Vertauschung von zwei Nachbarziffern nicht immer entdeckt wird.',
        a: ['a) 3x3 + 0x1 + 5x3 + 9x1 + 1x3 + 2x1 = 9 + 0 + 15 + 9 + 3 + 2 = **38**. 38 MOD 10 = 8. 10 - 8 = 2. Prüfziffer **2**, volle Nummer 3059122.', 'b) 6x3 + 2x1 + 4x3 + 7x1 + 0x3 + 3x1 = 18 + 2 + 12 + 7 + 0 + 3 = **42**. 42 MOD 10 = 2, Prüfziffer wäre 10 - 2 = **8**. Die Nummer hat 4. Also **ungültig**.',
          ['codes', [['pseudo', `funktion kartePruefen(nummer)
    gewicht = [3, 1, 3, 1, 3, 1]
    summe = 0
    für i = 0 bis 5
        summe = summe + ziffer(nummer, i) * gewicht[i]
    ende für
    pz = (10 - summe MOD 10) MOD 10
    rückgabe pz = ziffer(nummer, 6)
ende funktion`], ['java', `static boolean kartePruefen(String nummer) {
    if (nummer.length() != 7) return false;
    int[] gewicht = {3, 1, 3, 1, 3, 1};
    int summe = 0;
    for (int i = 0; i < 6; i++) {
        summe += (nummer.charAt(i) - '0') * gewicht[i];
    }
    int pz = (10 - summe % 10) % 10;
    return pz == nummer.charAt(6) - '0';
}`], ['python', `def karte_pruefen(nummer):
    if len(nummer) != 7 or not nummer.isdigit():
        return False
    gewicht = [3, 1, 3, 1, 3, 1]
    summe = sum(int(nummer[i]) * gewicht[i] for i in range(6))
    return (10 - summe % 10) % 10 == int(nummer[6])`]]],
          'd) Vertauscht man die Nachbarziffern 0 und 5 in 305912, entsteht 350912: 3x3 + 5x1 + 0x3 + 9x1 + 1x3 + 2x1 = 9 + 5 + 0 + 9 + 3 + 2 = 28. 28 MOD 10 = 8, Prüfziffer wieder **2**. Der Fehler wird **nicht** entdeckt. Grund: Der Unterschied ist 2 x (a - b); bei einem Ziffernunterschied von 5 ist er 10 und verschwindet im MOD 10. Einzelne falsche Ziffern werden dagegen immer entdeckt, weil die Gewichte 3 und 1 zu 10 teilerfremd sind.',
          'Bewertung: a) 2 P, b) 2 P, c) 3 P (Gewichte und Summe 2 P, Prüfziffer und Vergleich 1 P), d) 2 P.'],
        sol: [['table', ['Stelle', '1', '2', '3', '4', '5', '6', 'Summe'], [['Ziffer 305912', '3', '0', '5', '9', '1', '2', ''], ['Gewicht', '3', '1', '3', '1', '3', '1', ''], ['Produkt', '9', '0', '15', '9', '3', '2', '**38**']]],
          ['table', ['Stelle', '1', '2', '3', '4', '5', '6', 'Summe'], [['Ziffer 624703', '6', '2', '4', '7', '0', '3', ''], ['Gewicht', '3', '1', '3', '1', '3', '1', ''], ['Produkt', '18', '2', '12', '7', '0', '3', '**42**']]]],
        see: ['eua-pruefziffer']},
      {pts: 8, rows: 10, topic: 'Stack und Queue', op: '**Führen Sie ... durch** heißt: Schritt für Schritt eintragen. **Begründen** heißt: mit „weil“ erklären.', hint: 'Queue: vorne herausnehmen, hinten einfügen. Stack: oben einfügen und oben herausnehmen. Ein pop auf einem leeren Stack ist ein Fehler.',
        words: [['enqueue', 'hinten in die Warteschlange einfügen'], ['dequeue', 'vorderstes Element herausnehmen und zurückgeben'], ['push / pop', 'oben auf den Stapel legen / oben herunternehmen'], ['peek', 'oberstes Element ansehen, aber nicht entfernen']],
        q: 'a) Vor einem Schnell-Ladepunkt warten Fahrzeuge in einer **Queue**. Führen Sie die Operationen enqueue(F1), enqueue(F2), dequeue(), enqueue(F3), dequeue(), enqueue(F4) aus. Geben Sie nach jeder Operation den Inhalt (vorne links) und den Rückgabewert an. b) Im Dashboard speichert ein **Stack** die letzten Aktionen für „Rückgängig“. Führen Sie push(1), push(2), pop(), push(3), peek(), pop(), pop(), pop() aus. Geben Sie Inhalt (oben rechts) und Rückgabewert an. c) Begründen Sie, warum für die Warteschlange eine Queue und für „Rückgängig“ ein Stack passt.',
        a: [['table', ['Nr.', 'Operation', 'Inhalt Queue (vorne links)', 'Rückgabe'], [['1', 'enqueue(F1)', 'F1', '-'], ['2', 'enqueue(F2)', 'F1, F2', '-'], ['3', 'dequeue()', 'F2', '**F1**'], ['4', 'enqueue(F3)', 'F2, F3', '-'], ['5', 'dequeue()', 'F3', '**F2**'], ['6', 'enqueue(F4)', 'F3, F4', '-']]],
          ['table', ['Nr.', 'Operation', 'Inhalt Stack (oben rechts)', 'Rückgabe'], [['1', 'push(1)', '1', '-'], ['2', 'push(2)', '1, 2', '-'], ['3', 'pop()', '1', '**2**'], ['4', 'push(3)', '1, 3', '-'], ['5', 'peek()', '1, 3', '**3** (bleibt)'], ['6', 'pop()', '1', '**3**'], ['7', 'pop()', '(leer)', '**1**'], ['8', 'pop()', '(leer)', '**Fehler: Stack ist leer**']]],
          'c) Warteschlange: Wer zuerst kommt, wird zuerst geladen: **FIFO**, also Queue. Rückgängig: Die **letzte** Aktion soll zuerst zurückgenommen werden: **LIFO**, also Stack.', 'Bewertung: a) 3 P, b) 3 P (Fehlerfall 1 P), c) 2 P.'],
        sol: [['diagram', {w: 860, h: 200, keep: 700, cap: 'Queue (links) und Stack (rechts) im Zustand nach den Operationen', nodes: [
          {id: 'q1', k: 'box', x: 80, y: 90, w: 90, h: 44, t: 'F3', s: 'accent'}, {id: 'q2', k: 'box', x: 190, y: 90, w: 90, h: 44, t: 'F4', s: 'accent'}, {id: 'ql', k: 'text', x: 135, y: 150, t: 'vorne ... hinten', w: 10, h: 10, mw: 200},
          {id: 'k', k: 'text', x: 280, y: 40, t: 'Queue: dequeue vorne, enqueue hinten', w: 10, h: 10, mw: 300},
          {id: 's1', k: 'box', x: 600, y: 140, w: 120, h: 40, t: '1', s: 'ok'}, {id: 's2', k: 'box', x: 600, y: 90, w: 120, h: 40, t: '3', s: 'ok'}, {id: 'sl', k: 'text', x: 740, y: 90, t: 'oben (peek)', w: 10, h: 10, mw: 120},
        ], edges: []}], ['tip', 'Merkhilfe: Queue = Warteschlange an der Kasse. Stack = Tellerstapel.']],
        see: ['eua-stackqueue', 'eua-listen']},
      {pts: 8, rows: 12, topic: 'Rekursion', op: '**Beschreiben** heißt: kurz erklären. **Führen Sie einen Test durch** heißt: Aufrufe nacheinander auflisten und Rückgaben eintragen.', hint: 'Jeder Aufruf wartet auf den nächsten. Erst wenn die Abbruchbedingung gilt, kommen die Rückgaben von unten nach oben.',
        words: [['rekursiver Schritt', 'Aufruf der Funktion mit einem einfacheren Wert'], ['Aufrufstapel (Call Stack)', 'Liste der Aufrufe, die noch auf Ergebnisse warten'], ['iterativ', 'mit einer Schleife statt mit Selbstaufruf']],
        q: 'Die Funktion **quersumme(n)** berechnet die Summe der Ziffern einer ganzen Zahl. a) Nennen Sie die Abbruchbedingung und den rekursiven Schritt. b) Führen Sie einen Test für quersumme(4718) durch: Listen Sie die Aufrufe mit n, n MOD 10, n DIV 10 und der Rückgabe auf. c) Schreiben Sie eine iterative Version. d) Was passiert, wenn die Abbruchbedingung fehlt?',
        ctx: [['code', 'pseudo', `funktion quersumme(n)
    wenn n < 10 dann
        rückgabe n
    sonst
        rückgabe (n MOD 10) + quersumme(n DIV 10)
    ende wenn
ende funktion`]],
        a: ['a) Abbruchbedingung: **n < 10** (einstellige Zahl, Rückgabe n). Rekursiver Schritt: letzte Ziffer (n MOD 10) plus quersumme der Zahl ohne letzte Ziffer (**n DIV 10**). (2 P)',
          ['table', ['Aufruf', 'n', 'n MOD 10', 'n DIV 10', 'Rückgabe'], [['quersumme(4718)', '4718', '8', '471', '8 + 12 = **20**'], ['quersumme(471)', '471', '1', '47', '1 + 11 = **12**'], ['quersumme(47)', '47', '7', '4', '7 + 4 = **11**'], ['quersumme(4)', '4', '-', '-', '**4** (Abbruch)']]],
          ['codes', [['pseudo', `funktion quersummeIterativ(n)
    summe = 0
    solange n > 0
        summe = summe + n MOD 10
        n = n DIV 10
    ende solange
    rückgabe summe
ende funktion`], ['java', `static int quersummeIterativ(int n) {
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
    return summe`]]],
          'd) Die Funktion ruft sich **ohne Ende** selbst auf. Der Aufrufstapel füllt sich, bis der Speicher voll ist: **Stack Overflow** (Programmabsturz). (1 P)', 'Bewertung: a) 2 P, b) 3 P (Aufrufe 1 P, Zwischenwerte 1 P, Ergebnis 20 mit Rückgaben 1 P), c) 2 P, d) 1 P.'],
        sol: [['diagram', {w: 760, h: 260, keep: 600, cap: 'Aufrufstapel: Oben wird zuerst abgebrochen, dann wandern die Ergebnisse nach unten', nodes: [
          {id: 'a', k: 'box', x: 160, y: 40, w: 260, h: 40, t: 'quersumme(4718) wartet', s: 'plain'}, {id: 'b', k: 'box', x: 160, y: 95, w: 260, h: 40, t: 'quersumme(471) wartet', s: 'plain'}, {id: 'c', k: 'box', x: 160, y: 150, w: 260, h: 40, t: 'quersumme(47) wartet', s: 'plain'}, {id: 'd', k: 'box', x: 160, y: 205, w: 260, h: 40, t: 'quersumme(4) = 4', s: 'ok'},
          {id: 'ra', k: 'text', x: 560, y: 40, t: '8 + 12 = 20', w: 10, h: 10, mw: 200}, {id: 'rb', k: 'text', x: 560, y: 95, t: '1 + 11 = 12', w: 10, h: 10, mw: 200}, {id: 'rc', k: 'text', x: 560, y: 150, t: '7 + 4 = 11', w: 10, h: 10, mw: 200}, {id: 'rd', k: 'text', x: 560, y: 205, t: 'Rückgabe 4', w: 10, h: 10, mw: 200},
        ], edges: [{a: 'a', b: 'b'}, {a: 'b', b: 'c'}, {a: 'c', b: 'd'}]}]],
        see: ['eua-rekursion', 'eua-pruefziffer']},
    ],
  });
  AP2.exam.end(ID);
})();
