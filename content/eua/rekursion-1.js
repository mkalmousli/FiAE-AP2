AP2.page('eua-rekursion', {
  b: 'eua', g: 'Grundlagen der Programmierung', t: 'Rekursion',
  d: '**Rekursion** bedeutet, dass sich eine Funktion **selbst aufruft**, um ein Problem auf eine **kleinere Version desselben Problems** zurückzuführen. Jede rekursive Funktion braucht einen **Basisfall** (Abbruchbedingung) und einen **Rekursionsschritt**, der sich dem Basisfall nähert. Ohne Basisfall entsteht ein **Stack Overflow**.',
  m: '**Rekursion = Basisfall + Selbstaufruf mit kleinerem Problem.** Wie **russische Matroschka-Puppen**: Man öffnet eine, bis die kleinste kommt (Basisfall), dann geht es rückwärts wieder zusammen. Fakultät: **n! = n mal (n-1)!, 0! = 1**.',
  cheat: [
    ['Bestandteile', ['**Basisfall:** einfacher Fall, direkt lösbar (Abbruch)', '**Rekursiver Fall:** Problem verkleinern, sich selbst aufrufen', 'Jeder Schritt muss sich dem Basisfall **nähern**']],
    ['Typische Beispiele', ['**Fakultät:** n! = n mal (n-1)!', '**Fibonacci:** f(n) = f(n-1) + f(n-2)', '**Summe 1..n**, **Potenz**, **ggT (Euklid)**', '**Binäre Suche**, **Türme von Hanoi**, Baumdurchlauf']],
    ['Vor- und Nachteile', ['+ kurz, elegant bei rekursiven Strukturen (Bäume)', '- **Speicher** (Stack-Frame pro Aufruf), **Stack Overflow**', '- Naiv oft **langsam** (Fibonacci: exponentiell)', 'Jede Rekursion lässt sich als **Iteration** schreiben']],
    ['Fehlerquellen', ['Basisfall **fehlt** oder wird nie erreicht', 'Falscher Parameter beim Selbstaufruf', 'Doppelte Berechnungen (Memoization hilft)']],
  ],
  blocks: [
    ['h', 'Die Idee der Rekursion'],
    ['p', 'Manche Probleme sind **selbstähnlich**: Die Lösung für n hängt von der Lösung für ein kleineres n ab. Beispiel **Fakultät**: 5! = 5 mal 4 mal 3 mal 2 mal 1 = **5 mal 4!**. Und 4! = 4 mal 3! usw. bis 0! = 1. Genau das drückt eine rekursive Funktion aus.'],
    ['codes', [
      ['java', `static long fakultaet(int n) {
    if (n <= 1) return 1;                 // Basisfall: 0! = 1! = 1
    return n * fakultaet(n - 1);          // Rekursion mit kleinerem Problem
}
// fakultaet(4) = 24`],
      ['python', `def fakultaet(n):
    if n <= 1:                # Basisfall
        return 1
    return n * fakultaet(n - 1)   # Rekursion`],
      ['csharp', `static long Fakultaet(int n)
{
    if (n <= 1) return 1;
    return n * Fakultaet(n - 1);
}`],
    ]],
    ['h', 'Was passiert im Speicher? Der Aufrufstack'],
    ['p', 'Jeder Aufruf bekommt einen **Stack-Frame**. Die Aufrufe **stapeln sich** auf, bis der Basisfall erreicht wird. Dann werden die Ergebnisse **von oben nach unten zurückgegeben** und die Frames abgebaut.'],
    ['diagram', {w: 760, h: 360, keep: 640, cap: 'Fakultät von 4: Links der Abstieg (Aufrufe stapeln sich), rechts der Aufstieg (Ergebnisse werden zurückgegeben).', nodes: [
      {id: 'f4', k: 'box', x: 160, y: 40, t: 'fakultaet(4) = 4 * fakultaet(3)', w: 260, h: 40, s: 'accent'}, {id: 'f3', k: 'box', x: 200, y: 110, t: 'fakultaet(3) = 3 * fakultaet(2)', w: 260, h: 40, s: 'accent'}, {id: 'f2', k: 'box', x: 240, y: 180, t: 'fakultaet(2) = 2 * fakultaet(1)', w: 260, h: 40, s: 'accent'}, {id: 'f1', k: 'box', x: 280, y: 250, t: 'fakultaet(1) = 1 (Basisfall)', w: 260, h: 40, s: 'solid'},
      {id: 'r1', k: 'text', x: 560, y: 250, t: 'liefert 1', fs: 13, b: true, tc: 'ok'}, {id: 'r2', k: 'text', x: 560, y: 180, t: '2 * 1 = 2', fs: 13, b: true, tc: 'ok'}, {id: 'r3', k: 'text', x: 560, y: 110, t: '3 * 2 = 6', fs: 13, b: true, tc: 'ok'}, {id: 'r4', k: 'text', x: 560, y: 40, t: '4 * 6 = 24', fs: 13, b: true, tc: 'ok'},
      {id: 'lab', k: 'text', x: 400, y: 320, t: 'Der Stack wächst nach unten und wird beim Rückweg abgebaut', fs: 12, tc: 'text2'},
    ], edges: [{a: 'f4', b: 'f3', via: []}, {a: 'f3', b: 'f2'}, {a: 'f2', b: 'f1'}, {a: [500, 270], b: [500, 200], ea: 'arrow', s: 'ok'}, {a: [500, 200], b: [500, 130], ea: 'arrow', s: 'ok'}, {a: [500, 130], b: [500, 60], ea: 'arrow', s: 'ok'}]}],
    ['h', 'Fibonacci: Rekursion mit zwei Selbstaufrufen'],
    ['p', 'Die Fibonacci-Folge: 0, 1, 1, 2, 3, 5, 8, 13, 21 ... Jede Zahl ist die **Summe der beiden vorherigen**. f(0) = 0, f(1) = 1, f(n) = f(n-1) + f(n-2).'],
    ['code', 'java', `static int fib(int n) {
    if (n <= 1) return n;                  // Basisfälle: fib(0)=0, fib(1)=1
    return fib(n - 1) + fib(n - 2);        // ZWEI Selbstaufrufe
}`],
    ['diagram', AP2.dg.tree({t: 'f(4)', c: [{t: 'f(3)', c: [{t: 'f(2)', c: [{t: 'f(1)', s: 'ok'}, {t: 'f(0)', s: 'ok'}]}, {t: 'f(1)', s: 'ok'}]}, {t: 'f(2)', c: [{t: 'f(1)', s: 'ok'}, {t: 'f(0)', s: 'ok'}]}]}, {gx: 70, gy: 66, w: 52, h: 38, k: 'round', cap: 'Aufrufbaum von fib(4): 9 Aufrufe. f(2) wird zweimal, f(1) dreimal berechnet. Das ist Verschwendung.'})],
  ],
});
