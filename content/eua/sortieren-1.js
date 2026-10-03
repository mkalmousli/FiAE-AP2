AP2.page('eua-sortieren', {
  b: 'eua', g: 'Algorithmen', t: 'Sortieralgorithmen (Bubble, Insertion, Selection, Merge, Quicksort)',
  d: 'Ein **Sortieralgorithmus** bringt Elemente in eine **Reihenfolge**. **Einfache Verfahren** (Bubblesort, Insertionsort, Selectionsort) haben **O(n²)**, sind aber leicht zu verstehen. **Effiziente Verfahren** (Mergesort, Quicksort) haben **O(n log n)**. **Stabil** heißt: gleiche Elemente behalten ihre ursprüngliche Reihenfolge. **In-place** heißt: kaum zusätzlicher Speicher nötig.',
  m: '**Bubble:** Nachbarn tauschen, größtes "blubbert" nach hinten. **Selection:** immer das kleinste nach vorne holen. **Insertion:** wie Karten sortieren, jede Karte an die richtige Stelle der sortierten Hand. **Merge:** teilen und **mischen**. **Quick:** Pivot wählen, kleinere links, größere rechts, **Teile und herrsche**.',
  cheat: [
    ['Einfache Verfahren', ['**Bubblesort:** Nachbarn vergleichen und tauschen. best O(n), sonst O(n²)', '**Selectionsort:** Minimum suchen, nach vorn tauschen. immer O(n²)', '**Insertionsort:** in sortierten Teil einfügen. best O(n), sonst O(n²)', 'Alle **in-place**, Bubble und Insertion **stabil**']],
    ['Effiziente Verfahren', ['**Mergesort:** teilen, sortieren, mischen. **O(n log n)** immer, braucht **O(n)** Zusatzspeicher, **stabil**', '**Quicksort:** Pivot-Partition. Mittel **O(n log n)**, schlimmster Fall **O(n²)**, in-place, **nicht stabil**']],
    ['Begriffe', ['**Stabil:** Reihenfolge gleicher Schlüssel bleibt', '**In-place:** O(1) Zusatzspeicher', '**Teile und herrsche:** Problem halbieren (Merge, Quick)', '**Vergleichssortierung:** untere Schranke O(n log n)']],
    ['Wann welches?', ['Wenige/fast sortierte Daten: **Insertion**', 'Allgemein: **Quick/Merge** (Bibliothek!)', 'Garantierte Zeit/Stabilität: **Merge**', 'Praxis: `Arrays.sort`, `sorted()`, `OrderBy` verwenden']],
  ],
  blocks: [
    ['h', 'Warum sortieren?'],
    ['p', 'Sortierte Daten sind **leichter zu durchsuchen** (binäre Suche statt linearer Suche), zu vergleichen und darzustellen. Es gibt viele Verfahren, die sich in **Laufzeit**, **Speicherbedarf** und **Stabilität** unterscheiden. In der Prüfung musst du die Verfahren **erklären**, **an einem Beispiel durchspielen** und **in Code umsetzen** können. Beispielfeld in allen folgenden Beispielen: **5, 2, 9, 1, 6**.'],
    ['tool', 'sort'],
    ['h', 'Bubblesort'],
    ['p', '**Idee:** Vergleiche immer **zwei benachbarte** Elemente und tausche sie, wenn sie in der falschen Reihenfolge stehen. Nach jedem **Durchlauf** ist das **größte** Element ganz hinten angekommen (es "steigt auf wie eine Blase"). Wiederhole, bis ein Durchlauf **ohne Tausch** bleibt.'],
    ['table', ['Durchlauf', 'Vergleiche / Tausch', 'Feld danach'], [['Start', '-', '5  2  9  1  6'], ['1', '(5,2) tauschen, (5,9) ok, (9,1) tauschen, (9,6) tauschen', '2  5  1  6  **9**'], ['2', '(2,5) ok, (5,1) tauschen, (5,6) ok', '2  1  5  **6  9**'], ['3', '(2,1) tauschen, (2,5) ok', '1  2  **5  6  9**'], ['4', 'kein Tausch: fertig', '1  2  5  6  9']]],
    ['codes', [
      ['java', `static void bubbleSort(int[] a) {
    boolean getauscht;
    int n = a.length;
    do {
        getauscht = false;
        for (int i = 0; i < n - 1; i++) {
            if (a[i] > a[i + 1]) {                 // falsche Reihenfolge
                int tmp = a[i]; a[i] = a[i + 1]; a[i + 1] = tmp;   // tauschen
                getauscht = true;
            }
        }
        n--;                                       // letztes Element ist schon richtig
    } while (getauscht);
}`],
      ['python', `def bubble_sort(a):
    n = len(a)
    getauscht = True
    while getauscht:
        getauscht = False
        for i in range(n - 1):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]    # Tausch
                getauscht = True
        n -= 1`],
    ]],
    ['note', 'Laufzeit: Im schlechtesten Fall (umgekehrt sortiert) gibt es etwa **n mal (n-1) / 2** Vergleiche = **O(n²)**. Ist das Feld **schon sortiert**, genügt dank der Variable `getauscht` **ein Durchlauf: O(n)**. Bubblesort ist **stabil** und **in-place**.'],
    ['h', 'Selectionsort'],
    ['p', '**Idee:** Suche im **unsortierten Teil** das **kleinste** Element und **tausche** es an den Anfang dieses Teils. Dann wird der unsortierte Teil um eins kürzer.'],
    ['table', ['Schritt', 'Aktion', 'Feld danach (sortierter Teil fett)'], [['Start', '-', '5  2  9  1  6'], ['1', 'Minimum 1 (Index 3) mit Index 0 tauschen', '**1**  2  9  5  6'], ['2', 'Minimum der Rest ist 2 (Index 1), bleibt', '**1  2**  9  5  6'], ['3', 'Minimum 5 (Index 3) mit Index 2 tauschen', '**1  2  5**  9  6'], ['4', 'Minimum 6 (Index 4) mit Index 3 tauschen', '**1  2  5  6**  9']]],
    ['code', 'java', `static void selectionSort(int[] a) {
    for (int i = 0; i < a.length - 1; i++) {
        int min = i;
        for (int j = i + 1; j < a.length; j++)
            if (a[j] < a[min]) min = j;              // Index des Minimums merken
        int tmp = a[i]; a[i] = a[min]; a[min] = tmp; // nach vorne tauschen
    }
}`],
    ['note', 'Immer **O(n²)** Vergleiche (auch bei sortierten Daten), aber nur **höchstens n-1 Tausche**. **Nicht stabil**, in-place.'],
  ],
});
