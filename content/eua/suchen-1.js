AP2.page('eua-suchen', {
  b: 'eua', g: 'Algorithmen', t: 'Suchalgorithmen: lineare und binäre Suche',
  d: 'Die **lineare Suche** prüft die Elemente **nacheinander** (Laufzeit **O(n)**, funktioniert auch bei **unsortierten** Daten). Die **binäre Suche** braucht ein **sortiertes** Feld und **halbiert** den Suchbereich bei jedem Schritt (Laufzeit **O(log n)**).',
  m: '**Linear = Seite für Seite durchblättern. Binär = Telefonbuch in der Mitte aufschlagen und je nach Namen links oder rechts weitersuchen.** Voraussetzung binär: **sortiert**. Schritte binär: höchstens **log2(n) + 1**.',
  cheat: [
    ['Lineare Suche', ['Von vorn bis hinten durchlaufen', 'Auch **unsortiert** möglich', 'Best Case **O(1)**, Worst Case und Durchschnitt **O(n)**', 'Einfach, für kleine Daten völlig ausreichend']],
    ['Binäre Suche', ['**Sortiertes** Feld nötig', 'Mitte prüfen: gesuchter Wert kleiner, gleich oder größer?', 'Bereich **halbieren**', 'Worst Case **O(log n)**, höchstens ⌊log2 n⌋ + 1 Schritte', 'Index-Zugriff nötig (Array, nicht verkettete Liste)']],
    ['Wichtig', ['`mitte = (links + rechts) / 2`', 'Schleife: **solange links <= rechts**', 'Nicht gefunden: Rückgabe **-1**', 'Overflow vermeiden: `links + (rechts - links) / 2`']],
    ['Weitere', ['**Hashtabelle:** O(1) im Mittel', '**BST:** O(log n) im Mittel', '**Interpolationssuche:** Position schätzen', 'Suche in **Datenbanken:** Index (B-Baum)']],
  ],
  blocks: [
    ['h', 'Lineare Suche (sequentielle Suche)'],
    ['p', 'Man geht das Feld **von vorne nach hinten** durch und vergleicht jedes Element mit dem gesuchten Wert. Gefunden: Index zurückgeben. Am Ende ohne Treffer: **-1** zurückgeben. Das klappt **immer**, auch wenn die Daten nicht sortiert sind.'],
    ['codes', [
      ['java', `static int linearSuche(int[] a, int gesucht) {
    for (int i = 0; i < a.length; i++) {
        if (a[i] == gesucht) return i;     // gefunden: Index
    }
    return -1;                             // nicht gefunden
}`],
      ['python', `def lineare_suche(a, gesucht):
    for i, wert in enumerate(a):
        if wert == gesucht:
            return i
    return -1`],
    ]],
    ['h', 'Binäre Suche'],
    ['p', 'Voraussetzung: Das Feld ist **aufsteigend sortiert** und man kann **direkt auf jeden Index** zugreifen. Man betrachtet das **mittlere Element**:'],
    ['list', ['**Mitte = gesucht:** Treffer, fertig.', '**Mitte > gesucht:** Der Wert kann nur **links** stehen: Suche in der linken Hälfte weiter (`rechts = mitte - 1`).', '**Mitte < gesucht:** Der Wert kann nur **rechts** stehen: Suche in der rechten Hälfte weiter (`links = mitte + 1`).', 'Ist der Bereich **leer** (links > rechts): nicht gefunden.']],
    ['p', 'Beispiel: Suche **23** in dem sortierten Feld mit 10 Elementen:'],
    ['table', ['Index', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], [['Wert', '2', '5', '8', '12', '16', '**23**', '38', '56', '72', '91']]],
    ['table', ['Schritt', 'links', 'rechts', 'mitte', 'a[mitte]', 'Vergleich', 'Folge'], [
      ['1', '0', '9', '4', '16', '16 < 23', 'rechts weitersuchen: links = 5'],
      ['2', '5', '9', '7', '56', '56 > 23', 'links weitersuchen: rechts = 6'],
      ['3', '5', '6', '5', '23', '23 = 23', '**Treffer bei Index 5**'],
    ]],
    ['p', 'Nur **3 Vergleiche** statt bis zu 10. Der Suchbereich schrumpft: 10, 5, 2, 1 Elemente.'],
    ['codes', [
      ['java', `static int binaereSuche(int[] a, int gesucht) {       // a muss sortiert sein!
    int links = 0, rechts = a.length - 1;
    while (links <= rechts) {
        int mitte = links + (rechts - links) / 2;       // vermeidet Überlauf
        if (a[mitte] == gesucht) return mitte;
        if (a[mitte] < gesucht) links = mitte + 1;      // rechts weitersuchen
        else                    rechts = mitte - 1;     // links weitersuchen
    }
    return -1;                                          // nicht gefunden
}`],
      ['python', `def binaere_suche(a, gesucht):
    links, rechts = 0, len(a) - 1
    while links <= rechts:
        mitte = (links + rechts) // 2
        if a[mitte] == gesucht:
            return mitte
        if a[mitte] < gesucht:
            links = mitte + 1
        else:
            rechts = mitte - 1
    return -1`],
      ['csharp', `static int BinaereSuche(int[] a, int gesucht)
{
    int links = 0, rechts = a.Length - 1;
    while (links <= rechts)
    {
        int mitte = links + (rechts - links) / 2;
        if (a[mitte] == gesucht) return mitte;
        if (a[mitte] < gesucht) links = mitte + 1;
        else rechts = mitte - 1;
    }
    return -1;
}   // oder fertig: Array.BinarySearch(a, gesucht)`],
    ]],
    ['tool', 'search'],
  ],
});
