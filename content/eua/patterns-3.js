AP2.add('eua-patterns', [
  ['h', 'Strategy (Strategie)'],
  ['p', '**Problem:** Eine Aufgabe kann auf **verschiedene Arten** erledigt werden (Versandkosten berechnen, Sortieren, Preise mit Rabatt), und man möchte die Art **austauschen**, ohne viele `if/else` im Code. **Lösung:** Jeder Algorithmus ist eine eigene Klasse hinter einem **gemeinsamen Interface**. Ein **Context** hält eine Strategie und ruft sie auf. Die Strategie kann **zur Laufzeit gewechselt** werden.'],
  ['diagram', {w: 760, h: 270, keep: 640, cap: 'Strategy: Der Warenkorb (Context) kennt nur das Interface Versandstrategie.', nodes: [
    {id: 'c', k: 'cls', x: 130, y: 80, w: 230, t: {name: 'Warenkorb (Context)', attrs: ['- strategie: Versandstrategie'], ops: ['+ setStrategie(s)', '+ versandkosten(): double']}, s: 'accent'},
    {id: 'i', k: 'cls', x: 500, y: 60, w: 230, t: {name: '«interface»\nVersandstrategie', attrs: [], ops: ['+ berechne(gewicht: double): double']}}, {id: 'a', k: 'cls', x: 400, y: 215, w: 160, t: {name: 'Standard', attrs: [], ops: ['+ berechne(...)']}}, {id: 'b', k: 'cls', x: 580, y: 215, w: 160, t: {name: 'Express', attrs: [], ops: ['+ berechne(...)']}}, {id: 'd', k: 'cls', x: 750, y: 215, w: 130, t: {name: 'Abholung', attrs: [], ops: ['+ berechne(...)']}},
  ], edges: [{a: 'c', b: 'i', k: 'dash', ea: 'open', t: 'nutzt'}, {a: 'a', b: 'i', k: 'dash', ea: 'tri'}, {a: 'b', b: 'i', k: 'dash', ea: 'tri'}, {a: 'd', b: 'i', k: 'dash', ea: 'tri', via: [[750, 150]]}]}],
  ['codes', [
    ['java', `interface Versandstrategie { double berechne(double gewichtKg); }

class Standard implements Versandstrategie { public double berechne(double g) { return 4.90; } }
class Express  implements Versandstrategie { public double berechne(double g) { return 9.90 + 1.5 * g; } }
class Abholung implements Versandstrategie { public double berechne(double g) { return 0; } }

class Warenkorb {
    private Versandstrategie strategie = new Standard();
    private double gewicht = 2.0;
    void setStrategie(Versandstrategie s) { this.strategie = s; }   // zur Laufzeit wechselbar
    double versandkosten() { return strategie.berechne(gewicht); }
}

Warenkorb w = new Warenkorb();
System.out.println(w.versandkosten());   // 4.9
w.setStrategie(new Express());
System.out.println(w.versandkosten());   // 12.9`],
    ['python', `class Warenkorb:
    def __init__(self, strategie):
        self.strategie = strategie              # Strategie als Funktion/Objekt
    def versandkosten(self, gewicht):
        return self.strategie(gewicht)

standard = lambda g: 4.90
express  = lambda g: 9.90 + 1.5 * g
korb = Warenkorb(standard)
korb.strategie = express                        # Strategie wechseln`],
  ]],
  ['procon', 'Strategy', ['Ersetzt lange **if/else-/switch-Kaskaden** durch austauschbare Klassen', 'Algorithmen **einzeln testbar** und wiederverwendbar', 'Neue Strategie ohne Änderung des Context (**Open/Closed**)', 'Wechsel zur **Laufzeit** möglich'], ['Mehr Klassen und Objekte', 'Der Client muss die Strategien kennen und passend auswählen', 'Bei sehr wenigen, stabilen Varianten Overkill']],
  ['h', 'Die Muster im Vergleich'],
  ['table', ['Muster', 'Kategorie', 'Kernidee', 'Typisches Beispiel', 'Merksatz'], [
    ['**Singleton**', 'Erzeugung', 'Genau eine Instanz, globaler Zugriff', 'Logger, Konfiguration', '"Es kann nur einen geben"'],
    ['**Factory**', 'Erzeugung', 'Erzeugung kapseln, Interface statt konkreter Klasse', 'Dokument-Erzeugung', '"Bestellen statt selbst bauen"'],
    ['**Observer**', 'Verhalten', 'Abonnenten werden automatisch informiert', 'GUI-Events, Kursanzeigen', '"Sag mir Bescheid"'],
    ['**Strategy**', 'Verhalten', 'Austauschbarer Algorithmus hinter Interface', 'Versand-, Rabattberechnung', '"Wähle die Methode zur Laufzeit"'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie das Singleton-Muster. Wie verhindert man, dass von außen weitere Instanzen erzeugt werden?', 'Das **Singleton** stellt sicher, dass von einer Klasse **genau eine Instanz** existiert und bietet einen **globalen Zugriffspunkt**. Dazu ist der **Konstruktor `private`**, die Instanz wird in einem **statischen Attribut** gehalten und über eine statische Methode `getInstance()` bereitgestellt, die die Instanz beim ersten Aufruf erzeugt.', 5],
  ['qa', 'Ein Programm soll beim Speichern verschiedene Dateiformate (CSV, JSON, XML) unterstützen. Welches Muster eignet sich und wie sieht der Aufbau aus?', ['**Strategy:** Interface `Exportstrategie` mit `speichern(daten)`; Klassen `CsvExport`, `JsonExport`, `XmlExport`. Der Context (Speichern-Funktion) bekommt eine Strategie und ruft sie auf. Das Format ist zur Laufzeit wählbar.', 'Zusätzlich kann eine **Factory** die passende Strategie anhand des Formatnamens erzeugen.'], 6],
  ['qa', 'Nennen Sie ein Anwendungsbeispiel für das Observer-Muster und beschreiben Sie die beteiligten Rollen.', ['Beispiel: Eine **Aktienkurs-Anzeige**. **Subjekt:** die Kursquelle (hält Liste der Beobachter und ruft bei Änderung `update()` auf). **Beobachter:** Anzeigen, Diagramm, Alarmfunktion (implementieren das Interface Beobachter und melden sich per `anmelden()` an).', 'Vorteil: Die Kursquelle kennt die Anzeigen nur über das Interface (lose Kopplung).'], 5],
  ['qa', 'Welchen Vorteil bietet die Factory gegenüber dem direkten Aufruf von new?', 'Der Aufrufer ist **von konkreten Klassen entkoppelt** (er kennt nur das Interface). Die Auswahl und Erzeugung steht an **einer zentralen Stelle**, neue Produkttypen lassen sich hinzufügen, ohne den aufrufenden Code zu ändern.', 4],
  ['quiz', [
    {q: 'Welches Muster stellt sicher, dass es nur eine Instanz einer Klasse gibt?', o: ['Singleton', 'Factory', 'Observer', 'Strategy'], a: 0, e: 'Das Singleton begrenzt die Instanziierung auf ein Objekt.'},
    {q: 'Bei welchem Muster werden Objekte automatisch über Änderungen eines anderen Objekts informiert?', o: ['Observer', 'Singleton', 'Strategy', 'Factory'], a: 0, e: 'Beim Observer benachrichtigt das Subjekt alle angemeldeten Beobachter.'},
    {q: 'Was zeichnet das Strategy-Muster aus?', o: ['Austauschbare Algorithmen hinter einem gemeinsamen Interface', 'Eine einzige Instanz', 'Erzeugung von Objekten ohne new', 'Ein Baum aus Objekten'], a: 0, e: 'Strategien kapseln Algorithmen und lassen sich zur Laufzeit wechseln.'},
    {q: 'Warum ist der Konstruktor beim Singleton privat?', o: ['Damit von außen keine weiteren Objekte erzeugt werden können', 'Damit er schneller ist', 'Damit die Klasse abstrakt ist', 'Damit er vererbt wird'], a: 0, e: 'Nur die Klasse selbst darf die eine Instanz erzeugen.'},
    {q: 'Zu welcher Kategorie gehört die Factory?', o: ['Erzeugungsmuster', 'Verhaltensmuster', 'Strukturmuster', 'Netzwerkmuster'], a: 0, e: 'Singleton und Factory gehören zu den Erzeugungsmustern.'},
  ]],
]);
