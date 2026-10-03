AP2.add('eua-suchen', [
  ['h', 'Rekursive binäre Suche'],
  ['code', 'java', `static int binRek(int[] a, int gesucht, int links, int rechts) {
    if (links > rechts) return -1;                       // Basisfall: nicht gefunden
    int mitte = links + (rechts - links) / 2;
    if (a[mitte] == gesucht) return mitte;               // Basisfall: gefunden
    if (a[mitte] < gesucht) return binRek(a, gesucht, mitte + 1, rechts);
    return binRek(a, gesucht, links, mitte - 1);
}`],
  ['h', 'Wie viele Schritte braucht die binäre Suche?'],
  ['p', 'Bei jedem Schritt wird der Suchbereich **halbiert**. Aus n Elementen werden n/2, n/4, ... bis 1. Die Zahl der Halbierungen ist der **Logarithmus zur Basis 2**: höchstens **⌊log2(n)⌋ + 1** Vergleiche.'],
  ['table', ['Anzahl Elemente n', 'Lineare Suche (Worst Case)', 'Binäre Suche (Worst Case)'], [['10', '10', '4'], ['100', '100', '7'], ['1.000', '1.000', '10'], ['1.000.000', '1.000.000', '20'], ['1.000.000.000', '1.000.000.000', '30']]],
  ['chart', {kind: 'line', w: 720, h: 300, labels: ['1', '2', '4', '8', '16', '32', '64', '128'], series: [{n: 'Linear: O(n)', d: [1, 2, 4, 8, 16, 32, 64, 128], k: 'bad'}, {n: 'Binär: O(log n)', d: [1, 2, 3, 4, 5, 6, 7, 8], k: 'accent'}], ymax: 130, yl: 'Vergleiche (schlimmster Fall)', cap: 'Mit wachsender Datenmenge zieht die binäre Suche immer weiter davon.'}],
  ['table', ['Merkmal', 'Lineare Suche', 'Binäre Suche'], [
    ['Voraussetzung', 'Keine', '**Sortiert**, direkter Indexzugriff'],
    ['Laufzeit (Worst Case)', 'O(n)', '**O(log n)**'],
    ['Best Case', 'O(1) (erstes Element)', 'O(1) (Mitte)'],
    ['Datenstrukturen', 'Array, Liste, jede Folge', 'Array (verkettete Liste ungeeignet, kein Indexzugriff)'],
    ['Aufwand für Sortieren', 'Nicht nötig', 'Einmalig O(n log n), lohnt sich bei **vielen** Suchen'],
    ['Einfachheit', 'Sehr einfach', 'Fehleranfälliger (Grenzen)'],
  ]],
  ['warn', ['**Typische Fehler bei der binären Suche:**', '- Das Feld ist **nicht sortiert**: Ergebnis falsch.', '- Falsche Grenzen: `rechts = mitte` statt `mitte - 1` kann zu **Endlosschleife** führen.', '- Bedingung `links < rechts` statt `links <= rechts`: Ein Ein-Element-Bereich wird übersehen.', '- `(links + rechts) / 2` kann bei sehr großen Feldern **überlaufen**: besser `links + (rechts - links) / 2`.']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Suchen Sie den Wert 14 mit der binären Suche im Feld 3, 7, 9, 14, 21, 30, 44 (Index 0 bis 6). Geben Sie alle Schritte an.', ['Schritt 1: links = 0, rechts = 6, mitte = 3, a[3] = **14**: Treffer sofort bei **Index 3** (1 Vergleich).'], 3],
  ['qa', 'Suchen Sie den Wert 30 in demselben Feld.', ['Schritt 1: links 0, rechts 6, mitte 3, a[3] = 14 < 30: links = 4.', 'Schritt 2: links 4, rechts 6, mitte 5, a[5] = **30**: Treffer bei **Index 5**.'], 4],
  ['qa', 'Suchen Sie den Wert 8 in demselben Feld. Was ist das Ergebnis?', ['mitte = 3: 14 > 8, rechts = 2. mitte = 1: a[1] = 7 < 8, links = 2. mitte = 2: a[2] = 9 > 8, rechts = 1.', 'Nun gilt links (2) > rechts (1): **nicht gefunden, Rückgabe -1**.'], 4],
  ['qa', 'Warum ist die binäre Suche in einer verketteten Liste nicht sinnvoll?', 'Die binäre Suche braucht den **direkten Zugriff auf das mittlere Element** (Index). In einer verketteten Liste muss man sich zum mittleren Knoten **durchhangeln (O(n))**, der Vorteil von O(log n) geht verloren.', 3],
  ['qa', 'Wie viele Vergleiche braucht die binäre Suche höchstens bei 1.000 Elementen?', '⌊log2(1000)⌋ + 1 = 9 + 1 = **10 Vergleiche** (2^10 = 1024 > 1000).', 3],
  ['quiz', [
    {q: 'Welche Voraussetzung hat die binäre Suche?', o: ['Das Feld muss sortiert sein', 'Das Feld muss gerade Länge haben', 'Das Feld darf keine Duplikate enthalten', 'Es braucht eine Hashtabelle'], a: 0, e: 'Nur in einem sortierten Feld lässt sich der Suchbereich halbieren.'},
    {q: 'Welche Laufzeit hat die lineare Suche im schlechtesten Fall?', o: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], a: 0, e: 'Im schlechtesten Fall werden alle Elemente geprüft.'},
    {q: 'Wie viele Vergleiche braucht die binäre Suche höchstens bei 1 Million Elementen?', o: ['20', '1000', '500.000', '1.000.000'], a: 0, e: 'log2(1.000.000) ist etwa 20.'},
    {q: 'Was gibt eine Suchfunktion häufig zurück, wenn der Wert nicht gefunden wird?', o: ['-1', '0', 'Den größten Index', 'true'], a: 0, e: '-1 ist kein gültiger Index und signalisiert "nicht gefunden".'},
    {q: 'Welche Datenstruktur erlaubt Suche in O(1) im Mittel?', o: ['Hashtabelle', 'Liste', 'Stack', 'Queue'], a: 0, e: 'Hashtabellen berechnen den Index direkt.'},
  ]],
]);
