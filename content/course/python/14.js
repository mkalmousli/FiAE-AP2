AP2.page('course-python-14', {
  b: 'course', g: 'Python', t: 'Python 14: Algorithmen und Datenstrukturen selbst programmieren',
  d: 'In der Prüfung soll man Standardalgorithmen **selbst** implementieren, auch wenn Python `sorted()`, `min()` oder `in` fertig mitbringt: **lineare und binäre Suche**, **Bubble-, Selection-, Insertion-Sort**, **Quick- und Mergesort**, dazu Datenstrukturen wie **Stack** (LIFO), **Queue** (FIFO) und **verkettete Liste**. Wichtig sind der genaue Ablauf (am Beispiel nachvollziehen können), die **Laufzeit in O-Notation** und typische Fehlerquellen (Indexgrenzen, Abbruchbedingungen).',
  m: '**Linear O(n), binär O(log n) aber nur sortiert.** **Bubble/Selection/Insertion O(n²), Merge/Quick O(n log n) (Quick worst O(n²)).** **Stack: push/pop oben (LIFO), Queue: hinten rein, vorne raus (FIFO).** **Tauschen in Python: `a[i], a[j] = a[j], a[i]`.**',
  cheat: [
    ['Suchen', ['linear: alle prüfen, O(n)', 'binär: Mitte halbieren, O(log n)', 'binär nur bei sortierten Daten', '`bisect`-Modul (Standard)']],
    ['Sortieren O(n²)', ['Bubble: Nachbarn tauschen', 'Selection: Minimum nach vorne', 'Insertion: einsortieren wie Karten', 'gut bei kleinen/fast sortierten Daten']],
    ['Sortieren O(n log n)', ['Mergesort: teilen, sortiert mischen, stabil', 'Quicksort: Pivot, aufteilen', 'Python sorted(): Timsort', 'in-place vs. Zusatzspeicher']],
    ['Strukturen', ['Stack: `append`/`pop()`', 'Queue: `collections.deque` `append`/`popleft()`', 'verkettete Liste: Knoten mit next', 'dict = Hashtabelle']],
  ],
  blocks: [
    ['h', 'Lineare Suche'],
    ['code', 'python', `def linear_suche(liste, gesucht):
    for i in range(len(liste)):
        if liste[i] == gesucht:
            return i          # gefunden: Position zurückgeben
    return -1                 # nicht gefunden

print(linear_suche([7, 3, 9, 4], 9))   # 2`],
    ['h', 'Binäre Suche (nur auf sortierten Daten)'],
    ['code', 'python', `def binaer_suche(liste, gesucht):
    links, rechts = 0, len(liste) - 1
    while links <= rechts:
        mitte = (links + rechts) // 2
        if liste[mitte] == gesucht:
            return mitte
        elif liste[mitte] < gesucht:
            links = mitte + 1        # rechts weitersuchen
        else:
            rechts = mitte - 1       # links weitersuchen
    return -1

print(binaer_suche([2, 5, 8, 12, 16, 23, 38], 23))   # 5`],
    ['table', ['Schritt', 'links', 'rechts', 'mitte', 'liste[mitte]', 'Entscheidung'], [
      ['1', '0', '6', '3', '12', '12 < 23 -> links = 4'],
      ['2', '4', '6', '5', '23', 'gefunden, Index 5'],
    ]],
    ['p', 'Bei 1.000.000 Elementen braucht die lineare Suche im schlechtesten Fall 1.000.000 Vergleiche, die binäre höchstens etwa **20** (2^20 ≈ 1.000.000).'],
    ['h', 'Bubble Sort'],
    ['code', 'python', `def bubble_sort(a):
    n = len(a)
    for durchlauf in range(n - 1):
        getauscht = False
        for i in range(n - 1 - durchlauf):     # die letzten Elemente sind schon fertig
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]  # Nachbarn tauschen
                getauscht = True
        if not getauscht:                       # Optimierung: schon sortiert
            break
    return a

print(bubble_sort([5, 1, 4, 2, 8]))   # [1, 2, 4, 5, 8]`],
    ['p', 'Nach jedem Durchlauf ist das größte verbleibende Element ganz nach hinten "aufgestiegen" wie eine Blase.'],
    ['h', 'Selection Sort und Insertion Sort'],
    ['codes', [
      ['python', `def selection_sort(a):
    for i in range(len(a) - 1):
        min_pos = i
        for j in range(i + 1, len(a)):     # kleinstes Element im Rest suchen
            if a[j] < a[min_pos]:
                min_pos = j
        a[i], a[min_pos] = a[min_pos], a[i]   # an Position i tauschen
    return a`],
      ['python', `def insertion_sort(a):
    for i in range(1, len(a)):
        wert = a[i]                        # aktuelle "Karte"
        j = i - 1
        while j >= 0 and a[j] > wert:      # größere nach rechts schieben
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = wert                    # Karte einfügen
    return a`],
    ]],
    ['h', 'Mergesort und Quicksort (Teile und herrsche)'],
    ['codes', [
      ['python', `def merge_sort(a):
    if len(a) <= 1:
        return a                           # Basisfall
    mitte = len(a) // 2
    links = merge_sort(a[:mitte])          # teilen
    rechts = merge_sort(a[mitte:])
    ergebnis, i, j = [], 0, 0              # mischen (merge)
    while i < len(links) and j < len(rechts):
        if links[i] <= rechts[j]:
            ergebnis.append(links[i]); i += 1
        else:
            ergebnis.append(rechts[j]); j += 1
    return ergebnis + links[i:] + rechts[j:]`],
      ['python', `def quick_sort(a):
    if len(a) <= 1:
        return a
    pivot = a[len(a) // 2]                 # Pivot-Element
    kleiner = [x for x in a if x < pivot]
    gleich  = [x for x in a if x == pivot]
    groesser = [x for x in a if x > pivot]
    return quick_sort(kleiner) + gleich + quick_sort(groesser)`],
    ]],
    ['table', ['Verfahren', 'Best', 'Durchschnitt', 'Worst', 'Stabil?', 'Zusatzspeicher'], [
      ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', 'Ja', 'O(1)'],
      ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', 'Nein', 'O(1)'],
      ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'Ja', 'O(1)'],
      ['Mergesort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'Ja', 'O(n)'],
      ['Quicksort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'Nein', 'O(log n)'],
    ]],
    ['tool', 'sort'],
    ['h', 'Stack (Stapel, LIFO)'],
    ['code', 'python', `stapel = []
stapel.append("A")       # push
stapel.append("B")
stapel.append("C")
print(stapel.pop())      # C  (zuletzt hinein, zuerst heraus)
print(stapel[-1])        # B  (peek: oberstes ansehen)

def klammern_ok(text):   # Klassiker: Klammern prüfen
    paare = {")": "(", "]": "[", "}": "{"}
    s = []
    for z in text:
        if z in "([{":
            s.append(z)
        elif z in paare:
            if not s or s.pop() != paare[z]:
                return False
    return not s

print(klammern_ok("(a[1] + b) * {c}"))   # True`],
    ['h', 'Queue (Warteschlange, FIFO)'],
    ['code', 'python', `from collections import deque

schlange = deque()
schlange.append("Kunde 1")      # enqueue (hinten anstellen)
schlange.append("Kunde 2")
print(schlange.popleft())       # Kunde 1 (zuerst gekommen, zuerst bedient)
print(len(schlange))            # 1`],
    ['note', '`liste.pop(0)` funktioniert auch als Queue, kostet aber O(n), weil alle Elemente nachrücken. `deque.popleft()` ist O(1).'],
    ['h', 'Einfach verkettete Liste'],
    ['code', 'python', `class Knoten:
    def __init__(self, wert):
        self.wert = wert
        self.next = None             # Verweis auf den nächsten Knoten

class VerketteteListe:
    def __init__(self):
        self.kopf = None

    def vorne_einfuegen(self, wert):          # O(1)
        k = Knoten(wert)
        k.next = self.kopf
        self.kopf = k

    def ausgeben(self):
        aktuell = self.kopf
        while aktuell is not None:
            print(aktuell.wert, end=" -> ")
            aktuell = aktuell.next
        print("None")

vl = VerketteteListe()
for w in [3, 2, 1]:
    vl.vorne_einfuegen(w)
vl.ausgeben()    # 1 -> 2 -> 3 -> None`],
    ['h', 'Übungen'],
    ['qa', 'Sortieren Sie [6, 3, 8, 2] mit Bubble Sort und notieren Sie die Liste nach jedem Durchlauf.', ['Durchlauf 1: [3, 6, 2, **8**] (6/3 getauscht, 6/8 nicht, 8/2 getauscht)', 'Durchlauf 2: [3, 2, **6, 8**]', 'Durchlauf 3: [**2, 3, 6, 8**]'], 4],
    ['qa', 'Schreiben Sie eine Funktion, die prüft, ob eine Liste aufsteigend sortiert ist, in O(n).', [['code', 'python', `def ist_sortiert(a):
    for i in range(len(a) - 1):
        if a[i] > a[i + 1]:
            return False
    return True`]], 3],
    ['quiz', [
      {q: 'Welche Voraussetzung hat die binäre Suche?', o: ['Die Daten sind sortiert', 'Die Daten sind eindeutig', 'Die Liste ist kurz', 'Es sind Zahlen'], a: 0, e: 'Sonst kann man nicht halbieren.'},
      {q: 'Welches Verfahren hat im schlechtesten Fall O(n log n)?', o: ['Mergesort', 'Quicksort', 'Bubble Sort', 'Insertion Sort'], a: 0, e: 'Quicksort worst case O(n²).'},
      {q: 'Was gibt ein Stack bei pop() zurück?', o: ['Das zuletzt eingefügte Element', 'Das zuerst eingefügte Element', 'Das kleinste Element', 'Ein zufälliges Element'], a: 0, e: 'LIFO.'},
      {q: 'Wie tauscht man in Python a[i] und a[j]?', o: ['a[i], a[j] = a[j], a[i]', 'swap(a[i], a[j])', 'a[i] = a[j]; a[j] = a[i]', 'a.swap(i, j)'], a: 0, e: 'Tupel-Zuweisung; die dritte Variante verliert einen Wert.'},
      {q: 'Wie viele Vergleiche braucht die binäre Suche bei 1024 Elementen höchstens etwa?', o: ['10 bis 11', '512', '1024', '32'], a: 0, e: 'log2(1024) = 10.'},
    ]],
    ['see', ['course-python-13', 'course-python-15', 'eua-sortieren', 'eua-suchen', 'eua-stackqueue', 'eua-onotation']],
  ],
});
