AP2.add('eua-baeume', [
  ['code', 'java', `class Knoten {
    int wert;
    Knoten links, rechts;
    Knoten(int wert) { this.wert = wert; }
}
class Suchbaum {
    Knoten wurzel;

    void einfuegen(int wert) { wurzel = einfuegen(wurzel, wert); }
    private Knoten einfuegen(Knoten k, int wert) {
        if (k == null) return new Knoten(wert);              // freie Stelle gefunden
        if (wert < k.wert)      k.links  = einfuegen(k.links, wert);
        else if (wert > k.wert) k.rechts = einfuegen(k.rechts, wert);
        return k;                                            // Duplikate werden ignoriert
    }
    boolean enthaelt(int wert) {                             // iterative Suche
        Knoten k = wurzel;
        while (k != null) {
            if (wert == k.wert) return true;
            k = (wert < k.wert) ? k.links : k.rechts;
        }
        return false;
    }
}`],
  ['h', 'Löschen im BST (drei Fälle)'],
  ['table', ['Fall', 'Vorgehen', 'Beispiel (im Baum oben)'], [
    ['**Blatt**', 'Knoten einfach entfernen', '7 löschen: 6 hat dann kein rechtes Kind mehr'],
    ['**Ein Kind**', 'Knoten durch sein Kind ersetzen', '10 löschen: Sein rechtes Kind 14 rückt nach oben'],
    ['**Zwei Kinder**', 'Wert durch den **Inorder-Nachfolger** (kleinster Wert im rechten Teilbaum) oder Inorder-Vorgänger ersetzen, dann diesen Knoten löschen', '3 löschen: Nachfolger ist 4 (kleinster Wert im rechten Teilbaum 6, 4, 7). 3 wird durch 4 ersetzt, der alte Knoten 4 (Blatt) entfällt'],
  ]],
  ['h', 'Traversierung (Durchlaufen)'],
  ['p', 'Es gibt vier Möglichkeiten, alle Knoten zu besuchen. Für den BST oben (8, 3, 10, 1, 6, 14, 4, 7, 13):'],
  ['table', ['Methode', 'Reihenfolge', 'Ergebnis für den BST', 'Typische Verwendung'], [
    ['**Preorder** (Wurzel, links, rechts)', 'W - L - R', '8, 3, 1, 6, 4, 7, 10, 14, 13', 'Baum kopieren/speichern'],
    ['**Inorder** (links, Wurzel, rechts)', 'L - W - R', '**1, 3, 4, 6, 7, 8, 10, 13, 14**', '**Sortierte Ausgabe** beim BST'],
    ['**Postorder** (links, rechts, Wurzel)', 'L - R - W', '1, 4, 7, 6, 3, 13, 14, 10, 8', 'Baum löschen, Ausdrücke berechnen'],
    ['**Level-Order** (Breitensuche)', 'Ebene für Ebene', '8, 3, 10, 1, 6, 14, 4, 7, 13', 'Kürzester Weg, mit Queue'],
  ]],
  ['codes', [
    ['java', `void inorder(Knoten k) {
    if (k == null) return;            // Basisfall
    inorder(k.links);                 // 1. linker Teilbaum
    System.out.print(k.wert + " ");   // 2. Wurzel
    inorder(k.rechts);                // 3. rechter Teilbaum
}
// Preorder: Ausgabe VOR den beiden Aufrufen, Postorder: danach`],
    ['python', `def inorder(k):
    if k is None:
        return
    inorder(k.links)
    print(k.wert, end=" ")
    inorder(k.rechts)`],
  ]],
  ['tip', 'Merkhilfe für die Reihenfolge: Der Name sagt, **wann die Wurzel besucht wird**: **Pre**order = **vor** den Kindern, **In**order = **zwischen** den Kindern, **Post**order = **nach** den Kindern. Links kommt immer vor rechts.'],
  ['h', 'Laufzeit und Balance'],
  ['row', [['diagram', AP2.dg.tree({t: '4', c: [{t: '2', c: [{t: '1'}, {t: '3'}]}, {t: '6', c: [{t: '5'}, {t: '7'}]}]}, {gx: 56, gy: 60, w: 36, h: 36, cap: 'Ausgeglichen: Suche O(log n)'})], ['diagram', AP2.dg.tree({t: '1', c: [{e: 1}, {t: '2', c: [{e: 1}, {t: '3', c: [{e: 1}, {t: '4', c: [{e: 1}, {t: '5'}]}]}]}]}, {gx: 40, gy: 56, w: 34, h: 34, cap: 'Entartet (sortiert eingefügt): Suche O(n)'})]]],
  ['table', ['', 'Balanciert (Höhe ca. log2 n)', 'Entartet (Höhe n)'], [['Suchen', '**O(log n)**', 'O(n)'], ['Einfügen', '**O(log n)**', 'O(n)'], ['Löschen', '**O(log n)**', 'O(n)'], ['Beispiel n = 1.000.000', 'ca. 20 Schritte', 'bis 1.000.000 Schritte']]],
  ['p', 'Werden Werte **bereits sortiert** eingefügt (1, 2, 3, 4 ...), entsteht ein **entarteter Baum** (lange Kette). Deshalb gibt es **selbstbalancierende Bäume** (**AVL-Baum**, **Rot-Schwarz-Baum**), die nach Einfüge- und Löschoperationen **Rotationen** durchführen, damit die Höhe O(log n) bleibt. Java `TreeMap`/`TreeSet` und C# `SortedDictionary` nutzen Rot-Schwarz-Bäume.'],
  ['procon', 'Binärer Suchbaum', ['Suchen, Einfügen, Löschen im Mittel **O(log n)**', 'Daten bleiben **sortiert** (Inorder), Bereichsabfragen möglich', 'Dynamisch wachsend'], ['**Entartung** bei ungünstiger Einfügereihenfolge (O(n))', 'Komplexer als Array/Liste, höherer Speicherbedarf (2 Verweise je Knoten)', 'Löschen aufwendiger']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Fügen Sie die Werte 50, 30, 70, 20, 40, 60, 80 in dieser Reihenfolge in einen leeren binären Suchbaum ein und geben Sie die Inorder-Traversierung an.', ['50 ist die Wurzel. 30 (links), 70 (rechts). 20 (links von 30), 40 (rechts von 30), 60 (links von 70), 80 (rechts von 70).', 'Inorder (links, Wurzel, rechts): **20, 30, 40, 50, 60, 70, 80** (aufsteigend sortiert).', 'Preorder: 50, 30, 20, 40, 70, 60, 80. Postorder: 20, 40, 30, 60, 80, 70, 50.'], 6],
  ['qa', 'Welche Höhe hat ein binärer Suchbaum, in den die Zahlen 1, 2, 3, 4, 5 in dieser Reihenfolge eingefügt werden? Welche Folge davon ist problematisch?', 'Es entsteht eine **Kette** (jedes Element ist rechtes Kind des vorherigen) mit **Höhe 4**. Die Suche degeneriert zu **O(n)**, so langsam wie eine verkettete Liste. Abhilfe: **selbstbalancierende Bäume** (AVL, Rot-Schwarz).', 4],
  ['qa', 'Erklären Sie, wie man in einem BST nach dem Wert 6 sucht, wenn die Wurzel 10 ist (linkes Kind 5, dessen rechtes Kind 6).', ['Vergleich mit 10: 6 < 10, also nach links zu 5. Vergleich mit 5: 6 > 5, also nach rechts zu 6. 6 = 6: **gefunden** (3 Vergleiche).'], 3],
  ['quiz', [
    {q: 'Wie viele Kinder hat ein Knoten in einem Binärbaum höchstens?', o: ['2', '1', '3', 'Beliebig viele'], a: 0, e: 'Binär heißt zwei: links und rechts.'},
    {q: 'Welche Traversierung liefert beim BST die Werte sortiert?', o: ['Inorder', 'Preorder', 'Postorder', 'Level-Order'], a: 0, e: 'Links, Wurzel, rechts ergibt aufsteigende Reihenfolge.'},
    {q: 'Wo steht im BST der kleinste Wert?', o: ['Ganz links', 'Ganz rechts', 'In der Wurzel', 'In der Mitte'], a: 0, e: 'Immer weiter nach links gehen, bis es kein linkes Kind mehr gibt.'},
    {q: 'Wie nennt man einen Knoten ohne Kinder?', o: ['Blatt', 'Wurzel', 'Ast', 'Teilbaum'], a: 0, e: 'Blätter sind die Endknoten.'},
    {q: 'Welche Laufzeit hat die Suche in einem entarteten BST?', o: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'], a: 0, e: 'Ein entarteter Baum ist faktisch eine Liste.'},
  ]],
]);
