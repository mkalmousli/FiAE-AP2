AP2.add('eua-rekursion', [
  ['table', ['n', '5', '10', '20', '30', '40'], [['Aufrufe von fib(n) (naiv)', '15', '177', '21.891', '2.692.537', '331.160.281']], {first: true}],
  ['note', 'Die naive Fibonacci-Rekursion hat **exponentielle Laufzeit O(2^n)**, weil dieselben Teilprobleme immer wieder berechnet werden. Mit **Memoization** (Zwischenergebnisse merken) oder **Iteration** wird sie **linear O(n)**.'],
  ['codes', [
    ['java', `// Iterativ: schnell, O(n) Zeit, O(1) Speicher
static long fibIter(int n) {
    long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        long t = a + b;
        a = b;
        b = t;
    }
    return a;
}

// Memoization: bereits berechnete Werte merken
static long[] memo = new long[100];
static long fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    return memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
}`],
    ['python', `def fib_iter(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

from functools import lru_cache
@lru_cache(maxsize=None)
def fib_memo(n):
    return n if n <= 1 else fib_memo(n - 1) + fib_memo(n - 2)`],
  ]],
  ['h', 'Weitere klassische Beispiele'],
  ['kv', [
    ['Summe 1 bis n', '`summe(n) = n + summe(n - 1)`, Basisfall `summe(0) = 0`'],
    ['Potenz x^n', '`potenz(x, n) = x * potenz(x, n - 1)`, Basisfall `potenz(x, 0) = 1`'],
    ['ggT (Euklid)', '`ggT(a, b) = ggT(b, a % b)`, Basisfall `b == 0` liefert `a`. Beispiel: ggT(48, 18) = ggT(18, 12) = ggT(12, 6) = ggT(6, 0) = **6**'],
    ['Quersumme', '`quersumme(n) = n % 10 + quersumme(n / 10)`, Basisfall `n == 0` liefert 0'],
    ['Binäre Suche', 'Suche in der **halben** Liste weiter (siehe Seite Suchalgorithmen)'],
    ['Türme von Hanoi', 'Verschiebe n Scheiben: erst n-1 auf den Hilfsstab, dann die größte, dann n-1 darauf. Benötigt 2^n - 1 Züge.'],
    ['Ordner durchsuchen / Bäume', 'Ein Ordner enthält Dateien und **Unterordner**: Die Funktion ruft sich für jeden Unterordner auf.'],
  ]],
  ['h', 'Rekursion oder Iteration?'],
  ['procon', 'Rekursion', ['Sehr **kompakt und lesbar** bei von Natur aus rekursiven Strukturen (Bäume, Verzeichnisse, Teile-und-herrsche-Algorithmen wie Quicksort und Mergesort)', 'Spiegelt die mathematische Definition direkt wider'], ['Jeder Aufruf kostet **Speicher** (Stack): bei zu tiefer Rekursion **StackOverflowError**', 'Meist **langsamer** als eine Schleife (Aufrufaufwand)', 'Fehlender oder falscher Basisfall führt zu Endlosrekursion', 'Schwerer zu debuggen']],
  ['h', 'Schreibtischtest einer Rekursion'],
  ['code', 'java', `static int summe(int n) {
    if (n == 0) return 0;
    return n + summe(n - 1);
}
// Aufruf: summe(3)`],
  ['table', ['Aufruf', 'n', 'Rückgabe (berechnet beim Rückweg)'], [['summe(3)', '3', '3 + summe(2) = 3 + 3 = **6**'], ['summe(2)', '2', '2 + summe(1) = 2 + 1 = **3**'], ['summe(1)', '1', '1 + summe(0) = 1 + 0 = **1**'], ['summe(0)', '0', 'Basisfall: **0**']]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Was berechnet die Funktion und was liefert f(5)? int f(int n) { if (n == 0) return 1; return 2 * f(n - 1); }', ['Die Funktion berechnet **2 hoch n**. f(5) = 2 mal f(4) = ... = 2^5 = **32**.', 'Aufrufkette: f(5) = 2 mal f(4) = 2 mal (2 mal f(3)) ... bis f(0) = 1.'], 5],
  ['qa', 'Nennen Sie die zwei notwendigen Bestandteile einer rekursiven Funktion und erklären Sie, was bei fehlendem Basisfall passiert.', 'Es braucht einen **Basisfall** (Abbruchbedingung, liefert ohne weiteren Aufruf ein Ergebnis) und einen **rekursiven Schritt**, der das Problem verkleinert. Fehlt der Basisfall, ruft sich die Funktion endlos selbst auf, der **Aufrufstack läuft voll** und das Programm bricht mit einem **Stack Overflow** ab.', 4],
  ['qa', 'Schreiben Sie eine rekursive Funktion, die die Quersumme einer Zahl berechnet.', ['`int quersumme(int n) { if (n == 0) return 0; return n % 10 + quersumme(n / 10); }`', 'Beispiel: quersumme(345) = 5 + quersumme(34) = 5 + 4 + quersumme(3) = 5 + 4 + 3 + 0 = **12**.'], 5],
  ['qa', 'Warum ist die naive rekursive Berechnung von Fibonacci ineffizient und wie kann man sie verbessern?', 'Dieselben Teilprobleme (zum Beispiel fib(2)) werden **mehrfach neu berechnet**, die Zahl der Aufrufe wächst **exponentiell (O(2^n))**. Verbesserung: **Memoization** (Ergebnisse zwischenspeichern) oder eine **iterative Lösung** mit zwei Variablen (O(n)).', 4],
  ['quiz', [
    {q: 'Was braucht jede rekursive Funktion unbedingt?', o: ['Einen Basisfall', 'Eine for-Schleife', 'Zwei Parameter', 'Ein Array'], a: 0, e: 'Ohne Basisfall würde die Rekursion nie enden.'},
    {q: 'Was ist fakultaet(5)?', o: ['120', '24', '60', '720'], a: 0, e: '5 * 4 * 3 * 2 * 1 = 120.'},
    {q: 'Welcher Fehler tritt bei Endlosrekursion typischerweise auf?', o: ['Stack Overflow', 'Syntaxfehler', 'Division durch 0', 'Typfehler'], a: 0, e: 'Der Aufrufstack läuft über.'},
    {q: 'Wie berechnet sich fib(5), wenn fib(0)=0 und fib(1)=1?', o: ['5', '8', '3', '13'], a: 0, e: '0, 1, 1, 2, 3, 5: fib(5) = 5.'},
    {q: 'Was ist ggT(12, 8) nach Euklid?', o: ['4', '8', '2', '12'], a: 0, e: 'ggT(12,8) = ggT(8,4) = ggT(4,0) = 4.'},
  ]],
]);
