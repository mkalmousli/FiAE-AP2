AP2.add('eua-patterns', [
  ['h', 'Factory (Fabrikmethode)'],
  ['p', '**Problem:** Der Code soll Objekte erzeugen, aber nicht von **konkreten Klassen** abhängen. Mit `new PdfDokument()` überall im Code ist jede Änderung (neues Format) aufwendig. **Lösung:** Eine **Fabrik** entscheidet, **welche Klasse** instanziiert wird. Der Aufrufer kennt nur das **Interface** des Produkts.'],
  ['diagram', {w: 760, h: 270, keep: 640, cap: 'Factory: Der Client bestellt bei der Fabrik und bekommt ein Dokument. Welche konkrete Klasse es ist, weiß er nicht.', nodes: [
    {id: 'c', k: 'cls', x: 90, y: 60, w: 130, t: {name: 'Client', attrs: []}}, {id: 'f', k: 'cls', x: 330, y: 60, w: 230, t: {name: 'DokumentFactory', attrs: [], ops: ['+ erstelle(typ: String): Dokument']}, s: 'accent'},
    {id: 'i', k: 'cls', x: 610, y: 60, w: 200, t: {name: '«interface»\nDokument', attrs: [], ops: ['+ drucke(): void']}}, {id: 'p', k: 'cls', x: 480, y: 215, w: 170, t: {name: 'PdfDokument', attrs: [], ops: ['+ drucke()']}}, {id: 'w', k: 'cls', x: 690, y: 215, w: 170, t: {name: 'WordDokument', attrs: [], ops: ['+ drucke()']}},
  ], edges: [{a: 'c', b: 'f', k: 'dash', ea: 'open', t: 'bestellt'}, {a: 'f', b: 'i', k: 'dash', ea: 'open', t: 'erzeugt'}, {a: 'p', b: 'i', k: 'dash', ea: 'tri'}, {a: 'w', b: 'i', k: 'dash', ea: 'tri'}]}],
  ['codes', [
    ['java', `interface Dokument { void drucke(); }
class PdfDokument  implements Dokument { public void drucke() { System.out.println("PDF drucken"); } }
class WordDokument implements Dokument { public void drucke() { System.out.println("Word drucken"); } }

class DokumentFactory {
    static Dokument erstelle(String typ) {
        switch (typ) {
            case "pdf":  return new PdfDokument();
            case "word": return new WordDokument();
            default: throw new IllegalArgumentException("Unbekannter Typ: " + typ);
        }
    }
}

Dokument d = DokumentFactory.erstelle("pdf");   // Client kennt nur das Interface
d.drucke();                                     // PDF drucken`],
    ['python', `class DokumentFactory:
    @staticmethod
    def erstelle(typ):
        if typ == "pdf":  return PdfDokument()
        if typ == "word": return WordDokument()
        raise ValueError("Unbekannter Typ: " + typ)

d = DokumentFactory.erstelle("pdf")
d.drucke()`],
  ]],
  ['procon', 'Factory', ['**Entkopplung:** Aufrufer hängt nicht von konkreten Klassen ab', 'Zentrale Stelle für die Erzeugung (Änderungen an einer Stelle)', 'Neue Produkte ohne Änderung des Clients (Open/Closed)'], ['Zusätzliche Klassen und mehr Struktur bei einfachen Fällen', 'Einfache Fabrik mit `switch` muss bei neuen Typen geändert werden (besser: Factory Method pro Typ)']],
  ['h', 'Observer (Beobachter)'],
  ['p', '**Problem:** Wenn sich ein Objekt ändert, sollen **andere Objekte davon erfahren**, ohne dass das Objekt sie genau kennt. Beispiel: Eine **Wetterstation** misst Temperatur, mehrere **Anzeigen** (Handy-App, Wanddisplay) sollen sich aktualisieren. **Lösung:** Das **Subjekt** führt eine Liste von **Beobachtern**. Diese **melden sich an** (`attach`). Ändert sich der Zustand, ruft das Subjekt bei allen `update()` auf (`notify`).'],
  ['diagram', {w: 760, h: 270, keep: 640, cap: 'Observer: Das Subjekt kennt nur das Interface Beobachter.', nodes: [
    {id: 's', k: 'cls', x: 140, y: 120, w: 250, t: {name: 'Wetterstation (Subjekt)', attrs: ['- temperatur: double', '- beobachter: List'], ops: ['+ anmelden(b: Beobachter)', '+ abmelden(b: Beobachter)', '+ setTemperatur(t: double)']}, s: 'accent'},
    {id: 'i', k: 'cls', x: 480, y: 50, w: 210, t: {name: '«interface»\nBeobachter', attrs: [], ops: ['+ update(temp: double)']}}, {id: 'a', k: 'cls', x: 470, y: 215, w: 160, t: {name: 'HandyApp', attrs: [], ops: ['+ update(temp)']}}, {id: 'b', k: 'cls', x: 660, y: 215, w: 160, t: {name: 'Wanddisplay', attrs: [], ops: ['+ update(temp)']}},
  ], edges: [{a: 's', b: 'i', sa: 'dia', ea: 'none', ta: '1', tb: '*', t: 'beobachter'}, {a: 'a', b: 'i', k: 'dash', ea: 'tri'}, {a: 'b', b: 'i', k: 'dash', ea: 'tri'}]}],
  ['code', 'java', `interface Beobachter { void update(double temp); }

class Wetterstation {
    private final List<Beobachter> beobachter = new ArrayList<>();
    private double temperatur;

    void anmelden(Beobachter b)  { beobachter.add(b); }
    void abmelden(Beobachter b)  { beobachter.remove(b); }
    void setTemperatur(double t) {
        this.temperatur = t;
        for (Beobachter b : beobachter) b.update(t);        // alle benachrichtigen
    }
}
class HandyApp implements Beobachter {
    public void update(double t) { System.out.println("App: " + t + " Grad"); }
}

Wetterstation w = new Wetterstation();
w.anmelden(new HandyApp());
w.setTemperatur(21.5);       // -> App: 21.5 Grad`],
  ['seq', {w: 700, actors: ['Wetterstation', 'HandyApp', 'Wanddisplay'], cap: 'Ablauf: Eine Änderung löst automatisch die Benachrichtigung aller angemeldeten Beobachter aus.', steps: [
    [1, 0, 'anmelden(this)', 's'], [2, 0, 'anmelden(this)', 's'], ['sep', 'Messwert ändert sich'], [0, 0, 'setTemperatur(21.5)', 's'], [0, 1, 'update(21.5)', 's'], [0, 2, 'update(21.5)', 's'],
  ]}],
  ['procon', 'Observer', ['**Lose Kopplung:** Subjekt kennt Beobachter nur über das Interface', 'Beliebig viele Beobachter, **zur Laufzeit** an- und abmeldbar', 'Grundlage von **Event-Systemen**, GUIs und **MVC**'], ['Beobachter werden in **unbekannter Reihenfolge** benachrichtigt', 'Gefahr von **Speicherlecks** (Beobachter nicht abgemeldet) und Endlosschleifen bei Wechselwirkungen', 'Viele Benachrichtigungen können Leistung kosten']],
]);
