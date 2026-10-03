AP2.page('eua-interface', {
  b: 'eua', g: 'Objektorientierung', t: 'Interface und abstrakte Klasse',
  d: 'Ein **Interface** (Schnittstelle) legt nur fest, **welche Methoden** eine Klasse anbieten muss (ein **Vertrag**), ohne Umsetzung. Eine **abstrakte Klasse** ist eine **unvollständige Klasse**: Sie kann **gemeinsamen Code und Zustand** enthalten und **abstrakte Methoden**, die Unterklassen umsetzen müssen. Beide können **nicht direkt instanziiert** werden.',
  m: '**Interface = "kann" (Fähigkeit, Vertrag), abstrakte Klasse = "ist" (gemeinsame Basis mit Code).** Eine Klasse erbt **eine** Oberklasse (extends), implementiert aber **beliebig viele** Interfaces (implements).',
  cheat: [
    ['Interface', ['Nur **Methodenköpfe** (Java: auch default/static)', 'Meist **keine Attribute** (nur Konstanten)', '**Mehrere** pro Klasse möglich', 'Schlüsselwort: `interface`, `implements`', 'Beschreibt **Fähigkeit** (Comparable, Runnable)']],
    ['Abstrakte Klasse', ['Mischung aus **fertigen** und **abstrakten** Methoden', 'Darf **Attribute** und **Konstruktor** haben', 'Nur **eine** Oberklasse', 'Schlüsselwort: `abstract`, `extends`', 'Beschreibt **gemeinsame Basis**']],
    ['Gemeinsamkeiten', ['Nicht instanziierbar', 'Unterklassen müssen abstrakte Methoden **implementieren**', 'Grundlage für **Polymorphie**']],
    ['Wahl', ['Gemeinsamer **Code/Zustand**? Abstrakte Klasse', 'Nur **Vertrag**, unabhängige Klassen? Interface', 'Im Zweifel: **Interface** (flexibler)']],
  ],
  blocks: [
    ['h', 'Wozu Interfaces?'],
    ['p', 'Ein Online-Shop soll mit **verschiedenen Zahlungsarten** arbeiten: Kreditkarte, PayPal, Rechnung. Der Shop soll nur wissen: "Es gibt etwas, das `bezahle(betrag)` kann." Wie das Bezahlen genau abläuft, ist ihm egal. Ein **Interface** beschreibt genau diesen **Vertrag**. Neue Zahlungsarten kann man **hinzufügen, ohne den Shop zu ändern**.'],
    ['codes', [
      ['java', `interface Zahlungsart {
    boolean bezahle(double betrag);          // abstrakt (implizit public)
}
class Kreditkarte implements Zahlungsart {
    public boolean bezahle(double betrag) {
        System.out.println("Kreditkarte: " + betrag);
        return true;
    }
}
class PayPal implements Zahlungsart {
    public boolean bezahle(double betrag) {
        System.out.println("PayPal: " + betrag);
        return true;
    }
}
class Shop {
    void kasse(Zahlungsart art, double summe) {   // arbeitet nur mit dem Interface
        art.bezahle(summe);
    }
}
new Shop().kasse(new PayPal(), 49.90);            // Austauschbar!`],
      ['csharp', `interface IZahlungsart
{
    bool Bezahle(double betrag);
}
class PayPal : IZahlungsart
{
    public bool Bezahle(double betrag) { Console.WriteLine("PayPal: " + betrag); return true; }
}
// Konvention in C#: Interface-Namen beginnen mit "I"`],
      ['python', `from abc import ABC, abstractmethod

class Zahlungsart(ABC):                 # abstrakte Basisklasse als Interface
    @abstractmethod
    def bezahle(self, betrag): ...

class PayPal(Zahlungsart):
    def bezahle(self, betrag):
        print("PayPal:", betrag)
        return True`],
    ]],
    ['diagram', {w: 760, h: 270, keep: 620, cap: 'Der Shop kennt nur das Interface. Die konkreten Zahlungsarten implementieren es (gestrichelter Pfeil mit leerem Dreieck).', nodes: [
      {id: 's', k: 'cls', x: 120, y: 130, w: 170, t: {name: 'Shop', attrs: [], ops: ['+ kasse(Zahlungsart, double)']}},
      {id: 'i', k: 'cls', x: 410, y: 60, w: 200, t: {name: '«interface»\nZahlungsart', attrs: [], ops: ['+ bezahle(betrag: double): boolean']}, s: 'accent'},
      {id: 'k', k: 'cls', x: 330, y: 205, w: 170, t: {name: 'Kreditkarte', attrs: [], ops: ['+ bezahle(...)']}}, {id: 'p', k: 'cls', x: 560, y: 205, w: 160, t: {name: 'PayPal', attrs: [], ops: ['+ bezahle(...)']}},
    ], edges: [{a: 's', b: 'i', k: 'dash', ea: 'open', t: 'nutzt', lo: [0, -12]}, {a: 'k', b: 'i', k: 'dash', ea: 'tri'}, {a: 'p', b: 'i', k: 'dash', ea: 'tri'}]}],
  ],
});
