AP2.page('course-csharp-06', {
  b: 'course', g: 'C#', t: 'C# 6: Methoden (Parameter, ref/out, Überladen, static)',
  d: 'Eine **Methode** hat in C# den Aufbau `Sichtbarkeit [static] Rückgabetyp Name(Parameter) { ... }`. Argumente werden standardmäßig **by value** übergeben (bei Referenztypen wird die Referenz kopiert). Mit **`ref`** übergibt man eine Variable **by reference** (die Methode kann sie ändern), mit **`out`** liefert eine Methode **zusätzliche Rückgabewerte** (wie bei `int.TryParse`). **Optionale Parameter** haben Standardwerte, **benannte Argumente** machen Aufrufe lesbar, **`params`** erlaubt beliebig viele Argumente. Methoden mit gleichem Namen und unterschiedlichen Parametern sind **überladen**.',
  m: '**ref = Variable muss vorher initialisiert sein, Methode darf ändern. out = Methode MUSS zuweisen, vorher egal.** **Beim Aufruf das Schlüsselwort wiederholen: `Tausche(ref a, ref b)`.** **Ausdruckskörper: `int Doppelt(int x) => x * 2;`.** **Methodennamen in PascalCase.**',
  cheat: [
    ['Aufbau', ['`public static int Summe(int a, int b)`', '`{ return a + b; }`', '`void` = keine Rückgabe', '`=> ausdruck;` Kurzform']],
    ['Parameterarten', ['Wert (Standard): Kopie', '`ref int x`: Variable selbst', '`out int x`: zusätzliche Rückgabe', '`in int x`: nur lesen (by ref)']],
    ['Komfort', ['optional: `int stufe = 1`', 'benannt: `F(stufe: 3)`', '`params int[] werte`', 'Tupel: `(int min, int max) F()`']],
    ['Überladen', ['gleicher Name', 'andere Parameterliste', 'Rückgabetyp allein reicht nicht', 'Compiler wählt passend']],
  ],
  blocks: [
    ['h', 'Methoden definieren'],
    ['code', 'csharp', `class Rechner
{
    const decimal UST = 0.19m;

    static decimal Brutto(decimal netto) => netto * (1 + UST);   // Ausdruckskörper

    static void ZeileAusgeben(string text, decimal betrag)
    {
        Console.WriteLine($"{text,-20}{betrag,10:F2} EUR");
    }

    static void Main()
    {
        decimal b = Brutto(100m);
        ZeileAusgeben("Notebook brutto", b);
    }
}`],
    ['h', 'Wertübergabe, ref und out'],
    ['code', 'csharp', `static void Verdoppeln(int x) { x *= 2; }               // Kopie
static void VerdoppelnRef(ref int x) { x *= 2; }        // Original
static void Tausche(ref int a, ref int b) { (a, b) = (b, a); }

static bool Teile(int a, int b, out int quotient, out int rest)
{
    if (b == 0) { quotient = 0; rest = 0; return false; }   // out MUSS zugewiesen werden
    quotient = a / b;
    rest = a % b;
    return true;
}

int z = 5;
Verdoppeln(z);        Console.WriteLine(z);   // 5
VerdoppelnRef(ref z); Console.WriteLine(z);   // 10
int p = 1, q = 2;
Tausche(ref p, ref q);                         // p = 2, q = 1
if (Teile(17, 5, out int qu, out int r))
    Console.WriteLine($"{qu} Rest {r}");      // 3 Rest 2`],
    ['table', ['', 'Wert (Standard)', 'ref', 'out'], [
      ['Vor dem Aufruf initialisiert?', 'ja', '**ja** (Pflicht)', 'nein'],
      ['Methode muss zuweisen?', 'nein', 'nein', '**ja** (Pflicht)'],
      ['Änderung beim Aufrufer sichtbar?', 'nein (bei Objekten: Änderungen am Objekt ja)', 'ja', 'ja'],
      ['Typischer Einsatz', 'normal', 'Tauschen, Variable verändern', 'TryParse-Muster, mehrere Ergebnisse'],
    ]],
    ['def', '**Call by value:** Die Methode arbeitet mit einer Kopie des Arguments. **Call by reference** (`ref`/`out` in C#): Die Methode arbeitet direkt mit der Variablen des Aufrufers. Java kennt nur call by value; Python übergibt Objektreferenzen.'],
    ['h', 'Mehrere Rückgabewerte mit Tupeln'],
    ['code', 'csharp', `static (double min, double max, double schnitt) Statistik(double[] werte)
{
    double min = werte[0], max = werte[0], summe = 0;
    foreach (double w in werte)
    {
        if (w < min) min = w;
        if (w > max) max = w;
        summe += w;
    }
    return (min, max, summe / werte.Length);
}

var s = Statistik(new[] { 2.0, 3.0, 5.0 });
Console.WriteLine($"{s.min} {s.max} {s.schnitt:F2}");
var (mi, ma, _) = Statistik(new[] { 1.0, 9.0 });   // Dekonstruktion, _ verwirft`],
    ['h', 'Optionale Parameter, benannte Argumente, params'],
    ['code', 'csharp', `static decimal Preis(decimal netto, decimal rabatt = 0m, bool brutto = true)
{
    decimal p = netto * (1 - rabatt);
    return brutto ? p * 1.19m : p;
}
Preis(100m);                          // 119
Preis(100m, 0.05m);                   // 113.05
Preis(100m, brutto: false);           // 100 (benanntes Argument, rabatt bleibt 0)

static double Mittelwert(params double[] werte)
    => werte.Length == 0 ? 0 : werte.Sum() / werte.Length;   // using System.Linq
Mittelwert(2, 3, 4);                  // 3`],
    ['h', 'Überladen'],
    ['code', 'csharp', `static double Flaeche(double radius) => Math.PI * radius * radius;
static double Flaeche(double laenge, double breite) => laenge * breite;
static int Max(int a, int b) => a > b ? a : b;
static int Max(int a, int b, int c) => Max(Max(a, b), c);`],
    ['h', 'static und Instanzmethoden, Rekursion'],
    ['code', 'csharp', `class Kreis
{
    private double radius;
    public Kreis(double r) { radius = r; }
    public double Umfang() => 2 * Math.PI * radius;          // Instanzmethode: braucht ein Objekt
    public static double UmfangVon(double r) => 2 * Math.PI * r;   // Klassenmethode
}
new Kreis(2).Umfang();
Kreis.UmfangVon(2);

static long Fakultaet(int n) => n <= 1 ? 1 : n * Fakultaet(n - 1);`],
    ['warn', 'Aus `static void Main` kann man keine Instanzmethoden direkt aufrufen ("An object reference is required"). Entweder die Methode `static` machen oder ein Objekt erzeugen.'],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie eine Methode `static bool PruefeIban(string iban, out string fehler)`, die prüft, ob die IBAN mit "DE" beginnt und 22 Zeichen lang ist, und im Fehlerfall einen Grund liefert.', [['code', 'csharp', `static bool PruefeIban(string iban, out string fehler)
{
    iban = iban.Replace(" ", "");
    if (!iban.StartsWith("DE")) { fehler = "Muss mit DE beginnen"; return false; }
    if (iban.Length != 22) { fehler = "Muss 22 Zeichen lang sein"; return false; }
    fehler = "";
    return true;
}

if (!PruefeIban("DE12 3456", out string grund)) Console.WriteLine(grund);`]], 5],
    ['qa', 'Was gibt der Code aus? `static void F(int[] a) { a[0] = 9; a = new int[] { 7 }; }` / `int[] x = { 1 }; F(x); Console.WriteLine(x[0]);`', ['**9**. Die Referenz wird als Kopie übergeben: `a[0] = 9` ändert das gemeinsame Array, `a = new int[]...` ändert nur die lokale Kopie der Referenz.'], 3],
    ['quiz', [
      {q: 'Was muss bei einem out-Parameter gelten?', o: ['Die Methode muss ihm einen Wert zuweisen', 'Er muss vorher initialisiert sein', 'Er darf nur gelesen werden', 'Er ist optional'], a: 0, e: 'Bei ref muss er vorher initialisiert sein.'},
      {q: 'Wie ruft man void Tausche(ref int a, ref int b) auf?', o: ['Tausche(ref x, ref y)', 'Tausche(x, y)', 'Tausche(&x, &y)', 'Tausche(out x, out y)'], a: 0, e: 'Schlüsselwort beim Aufruf wiederholen.'},
      {q: 'Was bewirkt params?', o: ['Beliebig viele Argumente als Array', 'Optionale Parameter', 'Benannte Argumente', 'Rückgabe mehrerer Werte'], a: 0, e: 'Muss der letzte Parameter sein.'},
      {q: 'Welche Überladung ist ungültig neben int F(int x)?', o: ['double F(int x)', 'int F(double x)', 'int F(int x, int y)', 'int F(string s)'], a: 0, e: 'Nur Rückgabetyp verschieden.'},
    ]],
    ['see', ['course-csharp-05', 'course-csharp-07', 'eua-funktionen']],
  ],
});
