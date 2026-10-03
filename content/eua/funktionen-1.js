AP2.page('eua-funktionen', {
  b: 'eua', g: 'Grundlagen der Programmierung', t: 'Funktionen, Methoden und Parameterübergabe',
  d: 'Eine **Funktion** (in der OOP **Methode**) ist ein **benannter, wiederverwendbarer Codeblock**, der **Parameter** entgegennimmt und einen **Rückgabewert** liefern kann. Bei **Call by Value** wird eine **Kopie** des Werts übergeben (Änderungen wirken nicht nach außen), bei **Call by Reference** wird die **Adresse** übergeben (Änderungen wirken auf das Original).',
  m: '**Funktion = Rezept**: Zutaten (Parameter) rein, Ergebnis (Rückgabe) raus. **By Value = Fotokopie des Dokuments, By Reference = das Original-Dokument.** In **Java ist es immer Call by Value** (bei Objekten wird der **Verweis** kopiert).',
  cheat: [
    ['Aufbau', ['`Rückgabetyp name(Typ param1, Typ param2) { ... return wert; }`', '`void` = **kein** Rückgabewert', '**Parameter** (Definition) vs. **Argument** (Aufruf)', '`return` beendet die Methode']],
    ['Vorteile', ['**Wiederverwendung** (DRY: Don\'t Repeat Yourself)', '**Übersichtlichkeit** (Problem in Teilprobleme zerlegen)', '**Testbarkeit** und Wartbarkeit', 'Abstraktion']],
    ['Call by Value', ['**Kopie** des Werts wird übergeben', 'Änderung im Parameter ändert das **Original nicht**', 'Java: **immer**, auch bei Objekten (Referenz wird kopiert)', 'Primitive Typen, Strings (unveränderlich)']],
    ['Call by Reference', ['**Adresse/Verweis** wird übergeben', 'Änderung wirkt **auf das Original**', 'C#: `ref`/`out`, C++: `&`', 'Python: Objekte werden "als Referenz" übergeben, aber `=` bindet neu']],
  ],
  blocks: [
    ['h', 'Warum Funktionen?'],
    ['p', 'Wenn du dieselbe Berechnung an zehn Stellen brauchst, schreibst du sie **einmal** als Funktion und rufst sie zehnmal auf. Das ist weniger Code, weniger Fehler und leichter zu ändern. Außerdem zerlegt man ein großes Problem in **kleine Teilprobleme** mit sprechenden Namen: `berechneMehrwertsteuer()`, `istPrimzahl()`.'],
    ['codes', [
      ['java', `// Definition: Rückgabetyp, Name, Parameterliste
static double bruttoPreis(double netto, double satz) {
    double brutto = netto * (1 + satz);
    return brutto;                       // Rückgabewert
}

static void begruessung(String name) {    // void: kein Rückgabewert
    System.out.println("Hallo " + name);
}

// Aufruf mit Argumenten
double p = bruttoPreis(100.0, 0.19);     // p = 119.0
begruessung("Mia");`],
      ['csharp', `static double BruttoPreis(double netto, double satz)
{
    return netto * (1 + satz);
}

static void Begruessung(string name)
{
    Console.WriteLine("Hallo " + name);
}

double p = BruttoPreis(100.0, 0.19);   // 119.0`],
      ['python', `def brutto_preis(netto, satz):
    return netto * (1 + satz)

def begruessung(name):                 # ohne return: liefert None
    print("Hallo", name)

p = brutto_preis(100.0, 0.19)          # 119.0`],
    ]],
    ['kv', [
      ['Parameter (formale Parameter)', 'Variablen in der **Definition**: `netto`, `satz`. Sie sind Platzhalter.'],
      ['Argumente (aktuelle Parameter)', 'Die **Werte beim Aufruf**: `100.0`, `0.19`.'],
      ['Rückgabewert', 'Das Ergebnis der Funktion. Eine Funktion mit Rückgabetyp muss auf **jedem Weg** ein `return` haben.'],
      ['Signatur', 'Name und Parameterliste (Typen und Reihenfolge). Sie identifiziert die Funktion.'],
      ['Überladung (Overloading)', 'Mehrere Funktionen mit **gleichem Namen, aber verschiedener Parameterliste**: `add(int a, int b)` und `add(double a, double b)`.'],
      ['Lokale Variablen', 'Variablen **innerhalb** der Funktion sind nur dort gültig und werden bei jedem Aufruf neu angelegt.'],
    ]],
    ['h', 'Parameterübergabe: Call by Value und Call by Reference'],
    ['p', 'Was passiert, wenn eine Funktion den **Parameter verändert**? Das hängt davon ab, ob der Wert **kopiert** (Call by Value) oder die **Adresse** übergeben wird (Call by Reference).'],
    ['diagram', {w: 760, h: 270, keep: 640, cap: 'Links: Call by Value, die Funktion arbeitet auf einer Kopie. Rechts: Call by Reference, beide Namen zeigen auf dieselbe Speicherstelle.', nodes: [
      {id: 'g1', k: 'group', x: 190, y: 135, w: 330, h: 230, t: 'Call by Value', s: 'soft'}, {id: 'g2', k: 'group', x: 575, y: 135, w: 330, h: 230, t: 'Call by Reference', s: 'soft'},
      {id: 'o1', k: 'box', x: 100, y: 110, t: ['x', '5'], w: 80, h: 50, s: 'accent'}, {id: 'k1', k: 'box', x: 270, y: 110, t: ['Kopie p', '5, dann 10'], w: 110, h: 50, s: 'ok'}, {id: 'r1', k: 'text', x: 190, y: 200, t: 'x bleibt 5', fs: 13, b: true}, {id: 'r1b', k: 'text', x: 190, y: 225, t: 'Änderung geht verloren', fs: 12, tc: 'text2'},
      {id: 'o2', k: 'box', x: 480, y: 110, t: ['x', 'Adresse A'], w: 90, h: 50, s: 'accent'}, {id: 'k2', k: 'box', x: 670, y: 110, t: ['p', 'Adresse A'], w: 90, h: 50, s: 'ok'}, {id: 'sp', k: 'box', x: 575, y: 190, t: ['Speicher A:', '5, dann 10'], w: 120, h: 50, s: 'solid'}, {id: 'r2', k: 'text', x: 575, y: 245, t: 'x ist jetzt 10', fs: 13, b: true},
    ], edges: [{a: 'o1', b: 'k1', t: 'Kopie', lo: [0, -14]}, {a: 'o2', b: 'sp', ea: 'arrow'}, {a: 'k2', b: 'sp', ea: 'arrow'}]}],
  ],
});
