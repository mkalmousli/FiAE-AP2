AP2.page('course-csharp-03', {
  b: 'course', g: 'C#', t: 'C# 3: Verzweigungen (if, switch, switch-Ausdruck, Pattern Matching)',
  d: 'Verzweigungen funktionieren in C# wie in Java: `if (bedingung) { } else if (...) { } else { }`. Die Bedingung muss vom Typ `bool` sein (anders als in C ist `if (x)` mit einer Zahl nicht erlaubt). Die klassische `switch`-Anweisung verlangt in C# am Ende **jedes** nicht-leeren `case` ein `break` (oder `return`/`throw`); ein **unbeabsichtigtes Fall-through ist verboten**. Der moderne **switch-Ausdruck** `wert switch { muster => ergebnis, _ => standard }` liefert direkt einen Wert und unterstützt **Pattern Matching** mit Bereichen (`>= 92 => 1`) und Typen.',
  m: '**Bedingung immer bool.** **Klassischer switch: jedes case mit break, mehrere Labels übereinander erlaubt.** **switch-Ausdruck: `=>` statt case, `_` = Standardfall, Komma zwischen Armen.** **Pattern: `< 0`, `>= 0 and < 10`, `null`, `Kind k`.**',
  cheat: [
    ['if', ['`if (a > b) { ... }`', '`else if (...) { ... }`', '`else { ... }`', 'ternär: `a > b ? a : b`']],
    ['switch-Anweisung', ['`switch (wahl) {`', '`case 1: Anlegen(); break;`', '`case 2: case 3: ...; break;`', '`default: ...; break;`']],
    ['switch-Ausdruck', ['`var t = n switch {`', '`  1 => "eins",`', '`  2 or 3 => "zwei/drei",`', '`  _ => "?" };`']],
    ['Pattern Matching', ['`>= 92 => 1`', '`>= 0 and < 30 => 6`', '`if (p is Kind k) ...`', '`is null`, `is not null`']],
  ],
  blocks: [
    ['h', 'if und else'],
    ['code', 'csharp', `double wert = 35.0;
double versand;
if (wert >= 50)
{
    versand = 0;
}
else if (wert >= 20)
{
    versand = 2.95;
}
else
{
    versand = 4.95;
}
Console.WriteLine($"Versand: {versand:F2} EUR");`],
    ['h', 'Logische Bedingungen'],
    ['code', 'csharp', `int jahr = 2024;
bool schaltjahr = (jahr % 4 == 0 && jahr % 100 != 0) || jahr % 400 == 0;

double strom = 1.5;
bool gueltig = strom >= 0.05 && strom <= 2.0;      // Grenzen eingeschlossen
string antwort = Console.ReadLine() ?? "";
if (antwort.Equals("ja", StringComparison.OrdinalIgnoreCase)) { /* ... */ }
if (string.IsNullOrWhiteSpace(antwort)) Console.WriteLine("Keine Eingabe");`],
    ['h', 'Die switch-Anweisung'],
    ['code', 'csharp', `Console.Write("Ihre Wahl: ");
int wahl = int.Parse(Console.ReadLine()!);
switch (wahl)
{
    case 1:
        NeuerDatensatz();
        break;
    case 2:
        DatenAnzeigen();
        break;
    case 3:
    case 4:                       // leere case-Labels dürfen "durchfallen"
        Bearbeiten(wahl);
        break;
    case 0:
        Console.WriteLine("Programm beendet");
        break;
    default:
        Console.Clear();          // Bildschirm löschen, Menü neu
        break;
}`],
    ['warn', 'In C# ist `case 1: Anlegen(); case 2: ...` ohne `break` ein **Compilerfehler** ("Control cannot fall through from one case label to another"). Das verhindert den klassischen Java-Fehler.'],
    ['h', 'Der switch-Ausdruck (ab C# 8)'],
    ['code', 'csharp', `int punkte = 84;
int note = punkte switch
{
    >= 92 => 1,                // relationale Muster
    >= 81 => 2,
    >= 67 => 3,
    >= 50 => 4,
    >= 30 => 5,
    _ => 6                     // Verwerfungsmuster = Standardfall
};

string typ = tag switch
{
    "Sa" or "So" => "Wochenende",
    "Mo" or "Di" or "Mi" or "Do" or "Fr" => "Werktag",
    _ => throw new ArgumentException($"Unbekannter Tag: {tag}")
};

string ergebnisText = laborErgebnis switch
{
    0 => "Testergebnis negativ",
    1 => "Testergebnis positiv",
    _ => "Kein Testergebnis möglich"
};`],
    ['h', 'Typmuster mit is'],
    ['code', 'csharp', `foreach (Person p in personen)
{
    if (p is Kind k)                       // prüfen UND in Variable k umwandeln
        Console.WriteLine($"{k.GetNachname()}: Note {k.GetNote()}");
    else if (p is Erzieherin e && e.GetBerufsjahre() >= 8)
        Console.WriteLine($"{e.GetNachname()}: erfahren");
}

object o = 42;
string beschreibung = o switch
{
    int i when i < 0 => "negative Zahl",   // when = zusätzliche Bedingung
    int i => $"Zahl {i}",
    string s => $"Text der Länge {s.Length}",
    null => "nichts",
    _ => "unbekannt"
};`],
    ['h', 'Vergleich der Sprachen'],
    ['table', ['', 'C#', 'Java', 'Python'], [
      ['Mehrseitig', '`if / else if / else`', '`if / else if / else`', '`if / elif / else`'],
      ['Fall-through', 'Verboten (Compilerfehler)', 'Erlaubt (ohne break)', 'Gibt es nicht (match)'],
      ['Ausdrucksform', '`x switch { 1 => .., _ => .. }`', '`switch (x) { case 1 -> ..; default -> ..; }`', '`match x: case 1: ..`'],
      ['Standardfall', '`default:` / `_`', '`default`', '`case _:`'],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie mit einem switch-Ausdruck eine Methode, die zu einem Kurier-Tarif ("schnell" oder "guenstig") und einer Zone (1 oder 2) die Pauschale liefert: Zone 1: 8 €, Zone 2: 12 €, "schnell" kostet 5 € Aufschlag.', [['code', 'csharp', `static decimal Pauschale(int zone, string tarif)
{
    decimal grund = zone switch
    {
        1 => 8m,
        2 => 12m,
        _ => throw new ArgumentOutOfRangeException(nameof(zone))
    };
    return tarif == "schnell" ? grund + 5m : grund;
}`]], 4],
    ['qa', 'Was ist der Unterschied zwischen `if (p is Kind k)` und `Kind k = (Kind)p;`?', ['`is Kind k` **prüft** zuerst, ob p ein Kind ist, und weist nur dann zu; sonst ist die Bedingung false. Es gibt **keine Exception**.', 'Der Cast `(Kind)p` wandelt **ohne Prüfung** um und wirft eine **InvalidCastException**, wenn p kein Kind ist.'], 3],
    ['quiz', [
      {q: 'Was passiert in C# bei einem case ohne break, der Code enthält?', o: ['Compilerfehler', 'Fall-through wie in Java', 'Laufzeitfehler', 'Der Code wird übersprungen'], a: 0, e: 'C# verbietet implizites Fall-through.'},
      {q: 'Welches Symbol steht im switch-Ausdruck für den Standardfall?', o: ['_', 'default', '*', 'else'], a: 0, e: 'Discard-Pattern.'},
      {q: 'Was liefert 75 switch { >= 81 => 2, >= 67 => 3, _ => 4 }?', o: ['3', '2', '4', 'Fehler'], a: 0, e: 'Erster passender Arm.'},
      {q: 'Was macht if (o is string s)?', o: ['Prüft den Typ und weist bei Erfolg s zu', 'Wandelt immer in string um', 'Vergleicht Inhalte', 'Erzeugt einen neuen String'], a: 0, e: 'Typmuster.'},
    ]],
    ['see', ['course-csharp-02', 'course-csharp-04', 'eua-kontroll']],
  ],
});
