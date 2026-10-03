AP2.add('eua-sortieren', [
  ['h', 'Vergleich der Verfahren'],
  ['table', ['Verfahren', 'Best Case', 'Durchschnitt', 'Worst Case', 'Zusatzspeicher', 'Stabil', 'Anmerkung'], [
    ['**Bubblesort**', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'ja', 'Einfach, in der Praxis langsam'],
    ['**Selectionsort**', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', 'nein', 'Wenige Tausche (höchstens n-1)'],
    ['**Insertionsort**', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'ja', 'Gut für kleine oder fast sortierte Felder'],
    ['**Mergesort**', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'ja', 'Garantiert schnell, braucht Speicher'],
    ['**Quicksort**', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'nein', 'Meist am schnellsten in der Praxis'],
    ['Heapsort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(1)', 'nein', 'In-place, garantiert O(n log n)'],
  ]],
  ['chart', {kind: 'bar', w: 720, h: 320, labels: ['n = 10', 'n = 100', 'n = 1.000', 'n = 10.000'], series: [{n: 'O(n log n)  (Merge/Quick)', d: [33, 664, 9966, 132877], k: 'accent'}, {n: 'O(n²)  (Bubble/Insertion/Selection)', d: [100, 10000, 1000000, 100000000], k: 'bad'}], vals: false, ymax: 1000000, yl: 'Anzahl Schritte (log gekappt bei 1 Mio.)', cap: 'Schon bei 10.000 Elementen liegt O(n²) bei 100 Millionen Schritten, O(n log n) bei etwa 133.000. Der Balken für O(n²) ist hier abgeschnitten.'}],
  ['kv', [
    ['Stabilität', 'Ein Verfahren ist **stabil**, wenn **gleiche Schlüssel ihre relative Reihenfolge behalten**. Wichtig bei mehrstufigem Sortieren: erst nach Ort, dann stabil nach Name sortieren, die Orte bleiben dann sortiert.'],
    ['In-place', 'Das Sortieren geschieht **im Feld selbst**, ohne wesentlichen zusätzlichen Speicher (O(1) oder O(log n)).'],
    ['Untere Schranke', 'Jedes **vergleichsbasierte** Verfahren braucht im schlechtesten Fall mindestens **Ω(n log n)** Vergleiche. Nur Verfahren ohne Vergleiche (**Counting Sort**, **Radix Sort**) sind schneller, aber nur für spezielle Daten (kleine ganze Zahlen).'],
    ['In der Praxis', 'Man implementiert Sortieren **nicht selbst**, sondern nutzt die Bibliothek: Java `Arrays.sort()` / `Collections.sort()` (Dual-Pivot-Quicksort / TimSort), Python `sorted()` / `list.sort()` (TimSort: Insertion + Merge, stabil), C# `Array.Sort()` / LINQ `OrderBy`.'],
  ]],
  ['codes', [
    ['java', `import java.util.*;
int[] zahlen = {5, 2, 9, 1, 6};
Arrays.sort(zahlen);                                    // [1, 2, 5, 6, 9]

List<String> namen = new ArrayList<>(List.of("Tom", "Mia", "Zoe"));
Collections.sort(namen);                                // alphabetisch
namen.sort(Comparator.comparing(String::length));       // nach Länge`],
    ['python', `zahlen = [5, 2, 9, 1, 6]
zahlen.sort()                       # in-place: [1, 2, 5, 6, 9]
neu = sorted(zahlen, reverse=True)  # neue absteigende Liste
personen.sort(key=lambda p: p.alter)`],
    ['csharp', `int[] zahlen = {5, 2, 9, 1, 6};
Array.Sort(zahlen);
var sortiert = personen.OrderBy(p => p.Alter).ToList();`],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Sortieren Sie das Feld 7, 3, 5, 1 mit Bubblesort und geben Sie das Feld nach jedem Durchlauf an. Wie viele Vergleiche sind im ersten Durchlauf nötig?', ['**Durchlauf 1:** (7,3) tauschen: 3 7 5 1; (7,5) tauschen: 3 5 7 1; (7,1) tauschen: 3 5 1 7. **3 Vergleiche** (n - 1).', '**Durchlauf 2:** (3,5) ok; (5,1) tauschen: 3 1 5 7; (5,7) ok.', '**Durchlauf 3:** (3,1) tauschen: 1 3 5 7. Danach ein Durchlauf ohne Tausch: fertig.'], 6],
  ['qa', 'Erklären Sie das Prinzip von Quicksort in drei Sätzen und nennen Sie den ungünstigsten Fall.', 'Quicksort wählt ein Pivot-Element und teilt das Feld so auf, dass alle kleineren Elemente links und alle größeren rechts vom Pivot stehen (Partitionierung). Dann werden beide Teilfelder rekursiv auf dieselbe Weise sortiert. Im Mittel ist die Laufzeit O(n log n); im ungünstigsten Fall, wenn das Pivot immer das kleinste oder größte Element ist (zum Beispiel bei einem schon sortierten Feld mit festem Pivot), beträgt sie O(n²).', 6],
  ['qa', 'Welches Verfahren würden Sie für 10 Millionen Datensätze wählen und welches für 20 fast sortierte Datensätze? Begründen Sie.', ['**10 Millionen:** Mergesort oder Quicksort (bzw. Bibliotheksfunktion), weil O(n log n) gegenüber O(n²) enorm schneller ist.', '**20 fast sortierte:** Insertionsort, weil er bei fast sortierten Daten nahezu linear arbeitet, einfach und in-place ist.'], 4],
  ['qa', 'Was bedeutet "stabiles Sortierverfahren"? Nennen Sie ein stabiles und ein nicht stabiles Verfahren.', 'Ein Verfahren ist **stabil**, wenn Elemente mit gleichem Schlüssel nach dem Sortieren **in ihrer ursprünglichen relativen Reihenfolge** bleiben. Stabil: **Mergesort**, Bubblesort, Insertionsort. Nicht stabil: **Quicksort**, Selectionsort, Heapsort.', 4],
  ['quiz', [
    {q: 'Welche Laufzeit hat Mergesort im schlechtesten Fall?', o: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], a: 0, e: 'Mergesort ist unabhängig von der Datenlage O(n log n).'},
    {q: 'Welches Verfahren hat im schlechtesten Fall O(n²) trotz gutem Durchschnitt?', o: ['Quicksort', 'Mergesort', 'Heapsort', 'Keines'], a: 0, e: 'Bei ungünstiger Pivotwahl wird Quicksort quadratisch.'},
    {q: 'Was macht Selectionsort in jedem Durchlauf?', o: ['Findet das kleinste Element im unsortierten Teil und tauscht es nach vorne', 'Tauscht Nachbarn', 'Teilt das Feld', 'Wählt ein Pivot'], a: 0, e: 'Immer wird das Minimum des Restfelds nach vorn geholt.'},
    {q: 'Welches Verfahren ist bei bereits sortierten Daten mit O(n) besonders schnell (Best Case)?', o: ['Insertionsort', 'Selectionsort', 'Mergesort mit O(n²)', 'Keines'], a: 0, e: 'Insertionsort (und Bubblesort mit Flag) erkennen sortierte Daten mit einem Durchlauf.'},
    {q: 'Welches Verfahren benötigt O(n) zusätzlichen Speicher?', o: ['Mergesort', 'Bubblesort', 'Insertionsort', 'Selectionsort'], a: 0, e: 'Beim Mischen wird ein Hilfsfeld benötigt.'},
    {q: 'Wie viele Vergleiche braucht ein Bubblesort-Durchlauf bei 6 Elementen höchstens?', o: ['5', '6', '15', '36'], a: 0, e: 'n - 1 = 5 Vergleiche je Durchlauf.'},
  ]],
]);
