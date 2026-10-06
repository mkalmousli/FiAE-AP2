AP2.page('course-python-09', {
  b: 'course', g: 'Python', t: 'Python 9: Rekursion, Lambda und Comprehensions',
  d: '**Rekursion** bedeutet, dass eine Funktion **sich selbst aufruft**, um ein Problem auf ein kleineres Teilproblem derselben Art zurückzuführen. Jede rekursive Funktion braucht eine **Abbruchbedingung** (Basisfall). **Lambda-Ausdrücke** sind kleine, namenlose Funktionen in einer Zeile, typisch als Sortierschlüssel. **Comprehensions** erzeugen Listen, Dictionaries oder Mengen kompakt aus einer Schleife mit optionaler Bedingung: `[x * x for x in zahlen if x > 0]`.',
  m: '**Rekursion = Basisfall + rekursiver Fall, der näher an den Basisfall führt.** **Ohne Basisfall: RecursionError (Stack Overflow).** **lambda x: x * 2 = def f(x): return x * 2.** **Comprehension: [Ausdruck for Element in Folge if Bedingung].**',
  cheat: [
    ['Rekursion', ['Basisfall: `if n == 0: return 1`', 'rekursiver Aufruf mit kleinerem n', 'jeder Aufruf = eigener Stack-Frame', 'Python-Limit ca. 1000 Ebenen']],
    ['Lambda', ['`lambda x: x * 2`', '`sorted(l, key=lambda p: p[1])`', '`max(d, key=d.get)`', 'nur ein Ausdruck, kein return']],
    ['Comprehensions', ['`[x*2 for x in l]`', '`[x for x in l if x > 0]`', '`{k: v for k, v in paare}`', '`{x % 3 for x in l}` (set)']],
    ['Funktional', ['`map(f, l)`', '`filter(f, l)`', '`sum`, `any`, `all`', '`zip(a, b)`']],
  ],
  blocks: [
    ['h', 'Rekursion an der Fakultät'],
    ['p', 'Die Fakultät n! = n · (n - 1) · ... · 1 lässt sich **rekursiv** definieren: 0! = 1 (Basisfall) und n! = n · (n - 1)! (rekursiver Fall).'],
    ['codes', [
      ['python', `def fakultaet(n):
    if n <= 1:                    # Basisfall: hier stoppt die Rekursion
        return 1
    return n * fakultaet(n - 1)   # rekursiver Fall: kleineres Problem

print(fakultaet(5))   # 120`],
      ['java', `static long fakultaet(int n) {
    if (n <= 1) return 1;
    return n * fakultaet(n - 1);
}`],
      ['pseudo', `FUNKTION fakultaet(n)
    WENN n <= 1 DANN GIB 1 ZURÜCK
    GIB n * fakultaet(n - 1) ZURÜCK
ENDE FUNKTION`],
    ]],
    ['h3', 'Was passiert im Speicher?'],
    ['p', 'Jeder Aufruf legt einen neuen **Stack-Frame** mit eigenem n an. Erst wenn der Basisfall erreicht ist, werden die Ergebnisse von innen nach außen zurückgegeben:'],
    ['code', 'text', `fakultaet(4)
= 4 * fakultaet(3)
= 4 * (3 * fakultaet(2))
= 4 * (3 * (2 * fakultaet(1)))
= 4 * (3 * (2 * 1))          <- Basisfall erreicht, jetzt zurück
= 24`],
    ['warn', 'Fehlt der Basisfall oder wird das Problem nicht kleiner, ruft sich die Funktion endlos auf, bis Python mit **RecursionError: maximum recursion depth exceeded** abbricht (in Java: StackOverflowError).'],
    ['h3', 'Weitere rekursive Klassiker'],
    ['code', 'python', `def fib(n):                       # Fibonacci: 0, 1, 1, 2, 3, 5, 8, ...
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)  # Achtung: exponentiell langsam!

def summe_ziffern(n):             # 1234 -> 1 + 2 + 3 + 4 = 10
    if n < 10:
        return n
    return n % 10 + summe_ziffern(n // 10)

def binaer_suche(liste, x, links, rechts):
    if links > rechts:
        return -1                  # nicht gefunden
    mitte = (links + rechts) // 2
    if liste[mitte] == x:
        return mitte
    if x < liste[mitte]:
        return binaer_suche(liste, x, links, mitte - 1)
    return binaer_suche(liste, x, mitte + 1, rechts)

print(binaer_suche([2, 5, 8, 12, 20], 12, 0, 4))   # 3`],
    ['table', ['', 'Rekursion', 'Iteration (Schleife)'], [
      ['Vorteil', 'Elegant bei selbstähnlichen Problemen (Bäume, Teile und herrsche, Quicksort)', 'Schneller, kein Stack-Verbrauch'],
      ['Nachteil', 'Speicherbedarf je Aufruf, Gefahr des Stack Overflow, teils Mehrfachberechnungen (fib)', 'Bei Baumstrukturen umständlich'],
    ]],
    ['h', 'Lambda-Ausdrücke'],
    ['code', 'python', `quadrat = lambda x: x * x           # entspricht def quadrat(x): return x * x
print(quadrat(4))                   # 16

artikel = [("Linde", 42.5), ("Feuerdorn", 5.0), ("Flieder", 19.5)]
nach_preis = sorted(artikel, key=lambda a: a[1])     # nach 2. Element sortieren
print(nach_preis[0])                                 # ('Feuerdorn', 5.0)
teuerster = max(artikel, key=lambda a: a[1])`],
    ['h', 'List Comprehensions'],
    ['p', 'Eine Comprehension ist eine **Kurzschreibweise** für das Muster "neue Liste anlegen, in einer Schleife füllen, eventuell mit Bedingung".'],
    ['codes', [
      ['python', `zahlen = [3, -1, 4, -5, 9]

# klassisch
positiv = []
for z in zahlen:
    if z > 0:
        positiv.append(z * 2)

# als Comprehension: [Ausdruck for Element in Folge if Bedingung]
positiv = [z * 2 for z in zahlen if z > 0]       # [6, 8, 18]`],
      ['csharp', `var zahlen = new List<int> { 3, -1, 4, -5, 9 };
var positiv = zahlen.Where(z => z > 0).Select(z => z * 2).ToList();   // LINQ`],
      ['java', `List<Integer> positiv = zahlen.stream()
    .filter(z -> z > 0).map(z -> z * 2).toList();   // Streams`],
    ]],
    ['code', 'python', `woerter = ["Haus", "Baum", "Auto"]
laengen = {w: len(w) for w in woerter}           # Dict-Comprehension {'Haus': 4, ...}
anfangsbuchstaben = {w[0] for w in woerter}      # Set-Comprehension {'H', 'B', 'A'}
paare = [(x, y) for x in range(2) for y in range(3)]   # verschachtelt
ja_nein = ["gerade" if z % 2 == 0 else "ungerade" for z in range(4)]`],
    ['h', 'map, filter, zip, any, all'],
    ['code', 'python', `preise = [10.0, 20.0, 5.0]
brutto = list(map(lambda p: p * 1.19, preise))     # [11.9, 23.8, 5.95]
teuer = list(filter(lambda p: p > 8, preise))      # [10.0, 20.0]

namen = ["Anna", "Ben"]
alter = [25, 30]
for n, a in zip(namen, alter):                     # paarweise durchlaufen
    print(n, a)

print(any(p > 15 for p in preise))   # True: mindestens einer
print(all(p > 1 for p in preise))    # True: alle`],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie eine rekursive Funktion `potenz(basis, exp)` für exp ≥ 0, ohne `**` zu verwenden.', [['code', 'python', `def potenz(basis, exp):
    if exp == 0:
        return 1
    return basis * potenz(basis, exp - 1)

print(potenz(2, 10))   # 1024`]], 3],
    ['qa', 'Erzeugen Sie mit einer Comprehension aus `temperaturen_c = [12, 25, 30, 8]` eine Liste in Fahrenheit (F = C · 1,8 + 32), aber nur für Werte über 10 °C.', [['code', 'python', `fahrenheit = [c * 1.8 + 32 for c in temperaturen_c if c > 10]
print(fahrenheit)   # [53.6, 77.0, 86.0]`]], 3],
    ['qa', 'Warum ist die rekursive Fibonacci-Funktion für n = 40 sehr langsam? Wie kann man das verbessern?', ['Jeder Aufruf erzeugt zwei weitere; dieselben Werte (zum Beispiel fib(30)) werden millionenfach neu berechnet, die Laufzeit wächst **exponentiell** (etwa O(2^n)).', 'Verbesserung: **Iterativ** mit einer Schleife rechnen (O(n)) oder Ergebnisse zwischenspeichern (**Memoisation**, zum Beispiel mit `@functools.lru_cache`).'], 4],
    ['quiz', [
      {q: 'Was braucht jede rekursive Funktion?', o: ['Eine Abbruchbedingung (Basisfall)', 'Eine Schleife', 'Eine globale Variable', 'Einen Lambda-Ausdruck'], a: 0, e: 'Sonst RecursionError.'},
      {q: 'Was ergibt [x for x in range(6) if x % 2]?', o: ['[1, 3, 5]', '[0, 2, 4]', '[0, 1, 2, 3, 4, 5]', '[2, 4]'], a: 0, e: 'x % 2 ist 1 (wahr) für ungerade Zahlen.'},
      {q: 'Welcher Ausdruck sortiert Tupel nach dem zweiten Element?', o: ['sorted(l, key=lambda t: t[1])', 'sorted(l, 1)', 'l.sort(t[1])', 'sorted(l, key=t[1])'], a: 0, e: 'key erwartet eine Funktion.'},
      {q: 'Welcher Fehler tritt bei endloser Rekursion in Python auf?', o: ['RecursionError', 'IndexError', 'MemoryError', 'ValueError'], a: 0, e: 'In Java: StackOverflowError.'},
    ]],
    ['see', ['course-python-08', 'course-python-10', 'eua-rekursion']],
  ],
});
