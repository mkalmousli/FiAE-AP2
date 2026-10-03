AP2.page('eua-pseudocode', {
  b: 'eua', g: 'Pseudocode und Ablaufdarstellung', t: 'Pseudocode und Übersetzung in eine Programmiersprache',
  d: '**Pseudocode** beschreibt einen Algorithmus **in strukturierter Umgangssprache**, die wie Programmcode aufgebaut, aber **nicht an eine bestimmte Sprache gebunden** ist. Er hat **Verzweigungen** (wenn/sonst), **Schleifen** (solange, für) und **Zuweisungen**. Man kann ihn **Zeile für Zeile** in Java, C# oder Python **übersetzen**.',
  m: '**Pseudocode = Plan, Code = Ausführung.** Übersetzen: **Wenn = if, solange = while, für = for, Ausgabe = print.** Einrückung zeigt die Zugehörigkeit. Zuweisung oft mit **←** oder **:=**, Vergleich mit **=**.',
  cheat: [
    ['Typische Schlüsselwörter', ['**WENN ... DANN ... SONST ... ENDE WENN**', '**SOLANGE ... WIEDERHOLE ... ENDE SOLANGE**', '**FÜR i VON 1 BIS n ... ENDE FÜR**', '**WIEDERHOLE ... BIS bedingung**', '**FUNKTION name(parameter) ... GIB ZURÜCK wert**']],
    ['Übersetzung', ['`←` oder `:=` wird `=`', '`=` (Vergleich) wird `==`', '`UND`, `ODER`, `NICHT` werden `&&`, `||`, `!`', 'Arrays: Pseudocode oft **ab 1** oder **ab 0** (Aufgabe beachten!)']],
    ['Vorgehen', ['1. Ein-/Ausgaben und Variablen klären', '2. Struktur erkennen (Folge, Auswahl, Wiederholung)', '3. Zeile für Zeile übersetzen', '4. Mit Beispiel **durchspielen**']],
    ['Prüfungs-Tipp', ['Einrückungen genau lesen (was gehört in die Schleife?)', 'Grenzen prüfen (`<` oder `<=`)', 'Wertebereiche und Typen beachten (Ganzzahldivision)']],
  ],
  blocks: [
    ['h', 'Warum Pseudocode?'],
    ['p', 'Bevor man programmiert, überlegt man sich den **Algorithmus**. Das geht am besten in einer Form, die **nicht von Syntaxdetails ablenkt**: Semikolons, Klammern, Typen. In der Prüfung wird Pseudocode oft vorgegeben, und du sollst ihn **verstehen**, **ausführen** (Schreibtischtest), **ergänzen** oder in **Code übersetzen**.'],
    ['code', 'pseudo', `FUNKTION summeGerade(n)
    summe ← 0
    FÜR i VON 1 BIS n
        WENN i MOD 2 = 0 DANN
            summe ← summe + i
        ENDE WENN
    ENDE FÜR
    GIB ZURÜCK summe
ENDE FUNKTION`],
    ['p', 'Dieser Pseudocode summiert alle **geraden Zahlen von 1 bis n**. Die Übersetzung in drei Sprachen:'],
    ['codes', [
      ['java', `static int summeGerade(int n) {
    int summe = 0;
    for (int i = 1; i <= n; i++) {
        if (i % 2 == 0) {
            summe = summe + i;
        }
    }
    return summe;
}`],
      ['csharp', `static int SummeGerade(int n)
{
    int summe = 0;
    for (int i = 1; i <= n; i++)
    {
        if (i % 2 == 0)
            summe += i;
    }
    return summe;
}`],
      ['python', `def summe_gerade(n):
    summe = 0
    for i in range(1, n + 1):      # BIS n einschließlich: n + 1!
        if i % 2 == 0:
            summe = summe + i
    return summe`],
    ]],
    ['h', 'Übersetzungstabelle'],
    ['table', ['Pseudocode', 'Java / C#', 'Python'], [
      ['`x ← 5`', '`x = 5;`', '`x = 5`'],
      ['`WENN a > b DANN ... SONST ... ENDE WENN`', '`if (a > b) { ... } else { ... }`', '`if a > b: ... else: ...`'],
      ['`SOLANGE x < 10 WIEDERHOLE ... ENDE SOLANGE`', '`while (x < 10) { ... }`', '`while x < 10: ...`'],
      ['`FÜR i VON 1 BIS 10`', '`for (int i = 1; i <= 10; i++)`', '`for i in range(1, 11):`'],
      ['`WIEDERHOLE ... BIS x = 0`', '`do { ... } while (x != 0);`', '`while True: ... if x == 0: break`'],
      ['`a UND b`, `a ODER b`, `NICHT a`', '`a && b`, `a || b`, `!a`', '`a and b`, `a or b`, `not a`'],
      ['`a MOD b`, `a DIV b`', '`a % b`, `a / b` (bei int)', '`a % b`, `a // b`'],
      ['`AUSGABE x` / `EINGABE x`', '`System.out.println(x)` / `Scanner`', '`print(x)` / `input()`'],
      ['`feld[1]` (Zählung ab 1)', '`feld[0]` (Zählung ab 0!)', '`feld[0]`'],
    ]],
    ['warn', 'Achtung bei **Indizes**: In vielen Pseudocode-Aufgaben beginnt ein Feld bei **1**, in Java/C#/Python bei **0**. Lies die Aufgabenstellung genau und rechne beim Übersetzen um.'],
  ],
});
