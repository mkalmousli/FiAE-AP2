AP2.add('eua-sortieren', [
  ['h', 'Insertionsort'],
  ['p', '**Idee:** Wie beim **Sortieren von Spielkarten in der Hand**: Der linke Teil ist **bereits sortiert**. Nimm das nächste Element und **schiebe es nach links** an die richtige Stelle (größere Elemente rücken nach rechts).'],
  ['table', ['Schritt', 'Einzufügen', 'Feld danach (sortierter Teil links)'], [['Start', '-', '**5**  2  9  1  6'], ['1', '2: 5 rückt nach rechts, 2 an Stelle 0', '**2  5**  9  1  6'], ['2', '9: größer als 5, bleibt', '**2  5  9**  1  6'], ['3', '1: 9, 5, 2 rücken nach rechts, 1 vorn', '**1  2  5  9**  6'], ['4', '6: 9 rückt, 6 nach 5', '**1  2  5  6  9**']]],
  ['codes', [
    ['java', `static void insertionSort(int[] a) {
    for (int i = 1; i < a.length; i++) {
        int x = a[i];                    // einzufügendes Element merken
        int j = i - 1;
        while (j >= 0 && a[j] > x) {     // größere nach rechts schieben
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = x;                    // an die freie Stelle setzen
    }
}`],
    ['python', `def insertion_sort(a):
    for i in range(1, len(a)):
        x = a[i]
        j = i - 1
        while j >= 0 and a[j] > x:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = x`],
  ]],
  ['note', '**Best Case O(n)** (schon sortiert: keine Verschiebung), **Worst Case O(n²)** (umgekehrt sortiert). **Stabil**, in-place, **sehr gut bei kleinen oder fast sortierten Daten** (wird deshalb in schnellen Verfahren für kleine Teilfelder genutzt).'],
  ['h', 'Mergesort (Teile und herrsche)'],
  ['p', '**Idee:** (1) **Teile** das Feld in zwei Hälften, (2) sortiere jede Hälfte **rekursiv**, (3) **mische (merge)** die zwei sortierten Hälften zu einem sortierten Feld. Ein Feld mit einem Element ist schon sortiert (Basisfall). Beim **Mischen** vergleicht man immer die **vordersten** Elemente beider Hälften und nimmt das kleinere.'],
  ['diagram', AP2.dg.tree({t: '5 2 9 1 6', c: [{t: '5 2 9', c: [{t: '5'}, {t: '2 9', c: [{t: '2'}, {t: '9'}]}]}, {t: '1 6', c: [{t: '1'}, {t: '6'}]}]}, {gx: 82, gy: 62, w: 76, h: 34, k: 'round', cap: 'Mergesort, Phase 1: Das Feld wird solange halbiert, bis jedes Teilfeld nur ein Element hat. Danach wird von unten nach oben gemischt: [2 9], [2 5 9], [1 6] und schließlich [1 2 5 6 9].'})],
  ['table', ['Mischen von', 'Vergleich', 'Ergebnis'], [['[2 5 9] und [1 6]', '2 gegen 1: 1 nehmen', '1'], ['', '2 gegen 6: 2 nehmen', '1 2'], ['', '5 gegen 6: 5 nehmen', '1 2 5'], ['', '9 gegen 6: 6 nehmen', '1 2 5 6'], ['', 'Rest von links: 9', '**1 2 5 6 9**']]],
  ['code', 'java', `static int[] mergeSort(int[] a) {
    if (a.length <= 1) return a;                           // Basisfall
    int mitte = a.length / 2;
    int[] links  = mergeSort(java.util.Arrays.copyOfRange(a, 0, mitte));
    int[] rechts = mergeSort(java.util.Arrays.copyOfRange(a, mitte, a.length));
    return mische(links, rechts);
}
static int[] mische(int[] l, int[] r) {
    int[] erg = new int[l.length + r.length];
    int i = 0, j = 0, k = 0;
    while (i < l.length && j < r.length)
        erg[k++] = (l[i] <= r[j]) ? l[i++] : r[j++];      // kleineres zuerst (<= : stabil)
    while (i < l.length) erg[k++] = l[i++];
    while (j < r.length) erg[k++] = r[j++];
    return erg;
}`],
  ['note', '**Immer O(n log n)** (auch im schlechtesten Fall): log n Ebenen der Teilung, auf jeder Ebene wird in O(n) gemischt. Nachteil: braucht **O(n) zusätzlichen Speicher**. **Stabil.** Gut für verkettete Listen und große Datenmengen auf Datenträgern.'],
  ['h', 'Quicksort (Teile und herrsche)'],
  ['p', '**Idee:** Wähle ein **Pivot-Element**. **Partitioniere**: Alle Elemente **kleiner** als das Pivot kommen **links**, alle **größeren rechts**. Das Pivot steht damit an seiner **endgültigen Position**. Sortiere dann **links und rechts rekursiv**.'],
  ['table', ['Schritt', 'Feld / Teilfeld', 'Pivot', 'Ergebnis der Partition'], [['1', '5  2  9  1  6', '6 (letztes)', '[5 2 1]  **6**  [9]'], ['2', '5  2  1', '1', '[ ]  **1**  [5 2]'], ['3', '5  2', '2', '[ ]  **2**  [5]'], ['Ende', '', '', '**1  2  5  6  9**']]],
  ['code', 'java', `static void quickSort(int[] a, int links, int rechts) {
    if (links >= rechts) return;                   // Basisfall: 0 oder 1 Element
    int pivot = a[rechts];                         // Pivot: letztes Element
    int i = links - 1;
    for (int j = links; j < rechts; j++) {
        if (a[j] <= pivot) {                       // kleiner/gleich Pivot: nach links
            i++;
            int t = a[i]; a[i] = a[j]; a[j] = t;
        }
    }
    int t = a[i + 1]; a[i + 1] = a[rechts]; a[rechts] = t;   // Pivot an die richtige Stelle
    quickSort(a, links, i);                        // linker Teil
    quickSort(a, i + 2, rechts);                   // rechter Teil
}
// Aufruf: quickSort(a, 0, a.length - 1);`],
  ['note', '**Mittel O(n log n)** und in der Praxis meist die schnellste Variante. **Schlechtester Fall O(n²)**: wenn das Pivot **immer das kleinste oder größte** Element ist (zum Beispiel bereits sortiertes Feld mit Pivot = letztes Element). Abhilfe: **zufälliges Pivot** oder **Median von drei**. In-place (nur Rekursionsstack O(log n)), **nicht stabil**.'],
]);
