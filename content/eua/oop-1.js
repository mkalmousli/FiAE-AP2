AP2.page('eua-oop', {
  b: 'eua', g: 'Objektorientierung', t: 'Klassen, Objekte, Attribute und Methoden',
  d: 'Eine **Klasse** ist ein **Bauplan** für Objekte: Sie legt **Attribute** (Daten) und **Methoden** (Verhalten) fest. Ein **Objekt** ist ein **konkretes Exemplar (Instanz)** einer Klasse mit eigenen Attributwerten. Objekte werden mit `new` erzeugt (**Instanziierung**) und tauschen über Methodenaufrufe Nachrichten aus.',
  m: '**Klasse = Bauplan (Auto-Konstruktionszeichnung), Objekt = konkretes Auto (mein roter Golf).** Attribute = **Eigenschaften** (Farbe, Tempo), Methoden = **Fähigkeiten** (fahren, bremsen). `new` baut aus dem Plan ein Objekt.',
  cheat: [
    ['Begriffe', ['**Klasse:** Bauplan', '**Objekt / Instanz:** Exemplar der Klasse', '**Attribut / Feld:** Daten des Objekts', '**Methode:** Verhalten (Funktion in der Klasse)', '**Instanziierung:** `new Klasse(...)`']],
    ['Zugriffsmodifikatoren', ['`public` überall sichtbar', '`private` **nur in der Klasse**', '`protected` Klasse und Unterklassen (und Paket)', '(ohne) paketsichtbar (Java), `internal` (C#)']],
    ['Wichtige Schlüsselwörter', ['`this` das **aktuelle Objekt**', '`static` gehört zur **Klasse**, nicht zum Objekt', '`null` Referenz zeigt auf **kein** Objekt', '`final` / `const` nicht änderbar']],
    ['Getter / Setter', ['**Getter:** Wert lesen (`getSaldo()`)', '**Setter:** Wert setzen mit **Prüfung** (`setSaldo()`)', 'Attribute `private`, Zugriff über Methoden (Kapselung)']],
  ],
  blocks: [
    ['h', 'Warum objektorientiert?'],
    ['p', 'In der Realität bestehen Dinge aus **Daten und Verhalten**: Ein Konto hat einen Kontostand (Daten) und kann Geld einzahlen oder abheben (Verhalten). Die **objektorientierte Programmierung (OOP)** bildet das direkt nach: Daten und die zugehörigen Funktionen werden in **Objekten** gebündelt. Das macht große Programme **übersichtlich, wiederverwendbar und änderbar**.'],
    ['h', 'Klasse und Objekt'],
    ['diagram', {w: 760, h: 270, keep: 620, cap: 'Eine Klasse (links) ist der Bauplan. Daraus entstehen beliebig viele Objekte (rechts) mit eigenen Werten.', nodes: [
      {id: 'c', k: 'cls', x: 150, y: 130, w: 220, t: {name: 'Konto', attrs: ['- inhaber: String', '- saldo: double'], ops: ['+ einzahlen(betrag: double)', '+ abheben(betrag: double): boolean']}},
      {id: 'o1', k: 'cls', x: 560, y: 60, w: 200, t: {name: 'k1 : Konto', attrs: ['inhaber = "Mia"', 'saldo = 250.0']}, s: 'accent'}, {id: 'o2', k: 'cls', x: 560, y: 175, w: 200, t: {name: 'k2 : Konto', attrs: ['inhaber = "Tom"', 'saldo = 80.5']}, s: 'accent'},
    ], edges: [{a: 'c', b: 'o1', k: 'dash', t: 'instanziiert', lo: [0, -12]}, {a: 'c', b: 'o2', k: 'dash'}]}],
    ['codes', [
      ['java', `public class Konto {
    private String inhaber;            // Attribute (privat = gekapselt)
    private double saldo;

    public Konto(String inhaber, double start) {   // Konstruktor
        this.inhaber = inhaber;
        this.saldo = start;
    }
    public void einzahlen(double betrag) {          // Methode
        if (betrag > 0) saldo += betrag;
    }
    public boolean abheben(double betrag) {
        if (betrag > saldo) return false;
        saldo -= betrag;
        return true;
    }
    public double getSaldo() { return saldo; }      // Getter
}

// Verwendung
Konto k1 = new Konto("Mia", 250.0);    // Objekt erzeugen
Konto k2 = new Konto("Tom", 80.5);
k1.einzahlen(50);                       // Methode aufrufen
System.out.println(k1.getSaldo());      // 300.0 (k2 bleibt 80.5)`],
      ['csharp', `public class Konto
{
    private string inhaber;
    private double saldo;

    public Konto(string inhaber, double start)
    {
        this.inhaber = inhaber;
        this.saldo = start;
    }
    public void Einzahlen(double betrag) { if (betrag > 0) saldo += betrag; }
    public bool Abheben(double betrag)
    {
        if (betrag > saldo) return false;
        saldo -= betrag;
        return true;
    }
    public double Saldo => saldo;       // Property (nur lesen)
}

var k1 = new Konto("Mia", 250.0);
k1.Einzahlen(50);`],
      ['python', `class Konto:
    def __init__(self, inhaber, start):     # Konstruktor
        self._inhaber = inhaber             # _ = "privat" (Konvention)
        self._saldo = start

    def einzahlen(self, betrag):
        if betrag > 0:
            self._saldo += betrag

    def abheben(self, betrag):
        if betrag > self._saldo:
            return False
        self._saldo -= betrag
        return True

    @property
    def saldo(self):
        return self._saldo

k1 = Konto("Mia", 250.0)
k1.einzahlen(50)
print(k1.saldo)                             # 300.0`],
    ]],
  ],
});
