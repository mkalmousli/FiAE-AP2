(function () {
  const bst = {t: '8', c: [{t: '3', c: [{t: '1'}, {t: '6', c: [{t: '4'}, {t: '7'}]}]}, {t: '10', c: [{e: 1}, {t: '14', c: [{t: '13'}, {e: 1}]}]}]};
  AP2.page('eua-baeume', {
    b: 'eua', g: 'Datenstrukturen', t: 'Bäume: Binärbaum und binärer Suchbaum',
    d: 'Ein **Baum** ist eine **hierarchische Datenstruktur** aus **Knoten** und **Kanten** mit genau einer **Wurzel** und ohne Zyklen. Ein **Binärbaum** hat pro Knoten **höchstens zwei Kinder** (links, rechts). Ein **binärer Suchbaum (BST)** ist ein Binärbaum, bei dem für jeden Knoten gilt: **linker Teilbaum < Knoten < rechter Teilbaum**. Dadurch sind Suchen, Einfügen und Löschen im Mittel in **O(log n)** möglich.',
    m: '**Wurzel oben, Blätter unten. BST-Regel: Kleiner nach LINKS, größer nach RECHTS.** Traversierung: **Preorder = Wurzel zuerst, Inorder = links, Wurzel, rechts (BST: sortiert!), Postorder = Wurzel zuletzt.** Balanciert: O(log n), entartet (Liste): O(n).',
    cheat: [
      ['Begriffe', ['**Wurzel (root):** oberster Knoten', '**Blatt (leaf):** Knoten ohne Kinder', '**Elternknoten / Kind**', '**Höhe:** längster Pfad Wurzel zu Blatt (in Kanten)', '**Tiefe/Ebene:** Abstand zur Wurzel', '**Grad:** Anzahl Kinder']],
      ['Binärer Suchbaum', ['**Links kleiner, rechts größer**', 'Suchen/Einfügen/Löschen: **O(log n)** (balanciert), **O(n)** (entartet)', '**Inorder** liefert **sortierte** Reihenfolge', 'Löschen: Blatt, 1 Kind, 2 Kinder (Inorder-Nachfolger)']],
      ['Traversierung', ['**Preorder (WLR):** Wurzel, links, rechts', '**Inorder (LWR):** links, Wurzel, rechts', '**Postorder (LRW):** links, rechts, Wurzel', '**Level-Order:** Ebene für Ebene (mit Queue)']],
      ['Weitere Bäume', ['**AVL / Rot-Schwarz:** selbstbalancierend', '**Heap:** Eltern größer/kleiner als Kinder (Priority Queue)', '**B-Baum:** Datenbankindizes', '**Trie, Entscheidungsbaum, DOM**']],
    ],
    blocks: [
      ['h', 'Was ist ein Baum?'],
      ['p', 'Bäume bilden **Hierarchien** ab: Ordnerstruktur im Dateisystem, Organigramm, HTML-Dokument (DOM), Stammbaum. Anders als bei Liste und Array gibt es **kein Davor und Danach**, sondern **Über- und Unterordnung**. Ein Baum hat **genau eine Wurzel** und von dort führt zu jedem Knoten **genau ein Pfad**.'],
      ['diagram', AP2.dg.tree({t: 'A', s: 'solid', c: [{t: 'B', s: 'accent', c: [{t: 'D', s: 'ok'}, {t: 'E', s: 'ok'}]}, {t: 'C', s: 'accent', c: [{e: 1}, {t: 'F', s: 'ok'}]}]}, {gx: 90, gy: 74, k: 'circle', cap: 'Ein Binärbaum: A ist die Wurzel, B und C sind innere Knoten, D, E, F sind Blätter (grün). Höhe = 2.'})],
      ['table', ['Begriff', 'Bedeutung', 'Im Beispiel'], [['Wurzel', 'Oberster Knoten ohne Elternknoten', 'A'], ['Blatt', 'Knoten ohne Kinder', 'D, E, F'], ['Innerer Knoten', 'Knoten mit mindestens einem Kind', 'A, B, C'], ['Eltern / Kind', 'Direkte Verbindung nach oben / unten', 'B ist Elternknoten von D und E'], ['Geschwister', 'Knoten mit gleichem Elternknoten', 'D und E'], ['Höhe des Baums', 'Länge des längsten Pfades von der Wurzel zu einem Blatt', '2 (A zu B zu D)'], ['Tiefe / Ebene eines Knotens', 'Abstand zur Wurzel', 'D hat Tiefe 2'], ['Teilbaum', 'Ein Knoten mit allen Nachfolgern', 'Teilbaum ab B: B, D, E']]],
      ['h', 'Binärer Suchbaum (BST)'],
      ['p', 'Ein **BST** hält die Werte **sortiert**. Für jeden Knoten gilt: **Alle Werte im linken Teilbaum sind kleiner, alle im rechten größer.** Suchen funktioniert wie das Zahlenraten: Vergleiche mit dem aktuellen Knoten, gehe nach links oder rechts und halbiere (im günstigen Fall) den Suchraum.'],
      ['diagram', AP2.dg.tree(bst, {gx: 58, gy: 70, k: 'circle', cap: 'BST nach dem Einfügen von 8, 3, 10, 1, 6, 14, 4, 7, 13. Links stehen kleinere, rechts größere Werte.'})],
      ['steps', ['**Suchen (z. B. 7):** Start bei 8: 7 < 8, also links. 3: 7 > 3, also rechts. 6: 7 > 6, also rechts. 7: **gefunden** (4 Vergleiche statt bis zu 9 bei einer Liste).', '**Einfügen (z. B. 5):** Suche die Stelle wie beim Suchen: 8 links, 3 rechts, 6 links, 4 rechts. 4 hat kein rechtes Kind: **5 wird dort als neues Blatt eingehängt**.', '**Min / Max:** Das Minimum ist der **linkeste** Knoten (1), das Maximum der **rechteste** (14).']],
    ],
  });
})();
