(function () {
  const bst = {t: '8', c: [{t: '3', c: [{t: '1'}, {t: '6', c: [{t: '4'}, {t: '7'}]}]}, {t: '10', c: [{e: 1}, {t: '14', c: [{t: '13'}, {e: 1}]}]}]};
  AP2.page('eua-baeume', {
    b: 'eua', g: 'Datenstrukturen', t: 'Bäume: Binärbaum und binärer Suchbaum (BST)',
    d: 'Ein **Baum** ist eine nicht-lineare, **hierarchische Datenstruktur** aus **Knoten** und **Kanten** mit genau einer **Wurzel (Root)** und ohne Zyklen. Ein **Binärbaum** hat pro Knoten **höchstens zwei Kinder** (linker und rechter Nachfolger). Ein **binärer Suchbaum (Binary Search Tree - BST)** ordnet die Werte nach einer festen Regel: **Alle Werte im linken Teilbaum sind kleiner als der Knoten, alle Werte im rechten Teilbaum sind größer**. Dadurch sinkt die Suchzeit bei balancierten Bäumen auf **O(log n)**.',
    m: '**Wurzel ganz oben, Blätter ganz unten ohne Kinder.** **BST-Grundregel: Kleiner = nach LINKS, Größer = nach RECHTS.** **Traversierung:** Preorder (W-L-R, Wurzel zuerst), Inorder (L-W-R, beim BST **exakt sortierte Reihenfolge!**), Postorder (L-R-W, Wurzel zuletzt). Balanciert = O(log n); entartet zur Kette = O(n).',
    cheat: [
      ['Baum-Begriffe', [
        '**Wurzel (Root):** Der oberste Ausgangsknoten ohne Elternknoten (genau 1 pro Baum)',
        '**Blatt (Leaf):** Ein Endknoten ohne Kinder (Grad = 0)',
        '**Innerer Knoten:** Jeder Knoten mit mindestens einem Kind',
        '**Kante (Edge):** Verbindungslinie zwischen Eltern- und Kindknoten',
        '**Höhe des Baums:** Maximale Anzahl von Kanten auf dem längsten Pfad von Wurzel zu Blatt',
        '**Tiefe / Ebene:** Distanz eines Knotens zur Wurzel (Wurzel hat Tiefe 0)',
      ]],
      ['Binärer Suchbaum (BST)', [
        '**Ordnungsbedingung:** `linker_teilbaum < knoten < rechter_teilbaum`',
        '**Suchen / Einfügen:** Durchschnittlich **O(log n)**; Worst-Case (entartet): **O(n)**',
        '**Inorder-Traversierung (L-W-R):** Gibt die Elemente immer **aufsteigend sortiert** aus',
        '**Löschen:** 3 Fälle: Blatt löschen, 1 Kind hochziehen, 2 Kinder durch Inorder-Nachfolger ersetzen',
      ]],
      ['Baumarten in der Praxis', [
        '**Binärbaum:** Max. 2 Kinder pro Knoten',
        '**Vollständiger Binärbaum:** Alle Ebenen sind maximal gefüllt',
        '**AVL-Baum / Rot-Schwarz-Baum:** Selbstbalancierend; Höhe bleibt garantiert O(log n)',
        '**B-Baum:** Mehrwegbaum für Datenbankindizes und Dateisysteme (NTFS, ext4)',
      ]],
    ],
    blocks: [
      ['h', 'Grundlagen: Was ist ein Baum?'],
      ['p', 'Im Gegensatz zu linearen Listen oder Arrays bilden Bäume **hierarchische Beziehungen** ab. Praktische Beispiele sind das **Dateisystem** (Ordner und Dateien), das **HTML Document Object Model (DOM)** im Webbrowser oder die **Organisationsstruktur** eines Unternehmens. Ein Baum ist kreisfrei (zyklenfrei): Von der Wurzel führt zu jedem Knoten genau ein einziger Pfad.'],
      ['diagram', AP2.dg.tree({t: 'A', s: 'solid', c: [{t: 'B', s: 'accent', c: [{t: 'D', s: 'ok'}, {t: 'E', s: 'ok'}]}, {t: 'C', s: 'accent', c: [{e: 1}, {t: 'F', s: 'ok'}]}]}, {gx: 90, gy: 74, k: 'circle', cap: 'Ein Binärbaum: A ist die Wurzel, B und C sind innere Knoten, D, E, F sind Blätter (grün). Höhe = 2.'})],
      ['table', ['Begriff', 'Bedeutung', 'Beispiel im Diagramm oben'], [
        ['**Wurzel (Root)**', 'Der oberste Einstiegsknoten ohne Vorgänger', 'Knoten **A**'],
        ['**Blatt (Leaf)**', 'Knoten ohne Nachfolger (hat keine Kinder)', 'Knoten **D, E, F**'],
        ['**Innerer Knoten**', 'Knoten, der mindestens ein Kind hat', 'Knoten **A, B, C**'],
        ['**Elternknoten / Kind**', 'Übergeordneter Knoten / untergeordneter Knoten', '**B** ist Elternknoten von **D** und **E**'],
        ['**Geschwister (Siblings)**', 'Knoten mit demselben gemeinsamen Elternknoten', '**D** und **E** sind Geschwister (Eltern: B)'],
        ['**Höhe des Baums**', 'Anzahl der Kanten vom Startknoten zum tiefsten Blatt', '**2 Kanten** (A -> B -> D)'],
        ['**Tiefe eines Knotens**', 'Anzahl der Kanten von der Wurzel bis zu diesem Knoten', 'Knoten D hat Tiefe 2; Knoten B hat Tiefe 1'],
      ]],
      ['h', 'Der binäre Suchbaum (Binary Search Tree - BST)'],
      ['p', 'Ein **BST** ist ein Binärbaum, der eine strikte Sortierung erzwingt. Für **jeden Knoten** gilt ausnahmslos: **Alle Werte links sind kleiner, alle Werte rechts sind größer**.'],
      ['diagram', AP2.dg.tree(bst, {gx: 58, gy: 70, k: 'circle', cap: 'BST nach dem Einfügen der Zahlen: 8, 3, 10, 1, 6, 14, 4, 7, 13. Links stehen kleinere, rechts größere Werte.'})],
      ['steps', [
        '**Suchen im BST (z. B. nach 7):** Wir beginnen an der Wurzel **8**. Da `7 < 8`, gehen wir nach links zu **3**. Da `7 > 3`, gehen wir nach rechts zu **6**. Da `7 > 6`, gehen wir nach rechts zu **7**. Treffer nach nur **4 Vergleichen**!',
        '**Einfügen (z. B. Wert 5):** Suche wie oben den Weg: 8 (links) -> 3 (rechts) -> 6 (links) -> 4. Bei 4 ist `5 > 4`, aber 4 hat noch kein rechtes Kind. **5 wird als neues rechtes Blatt an 4 angehängt**.',
        '**Minimum finden:** Gehe von der Wurzel aus immer nur nach **links**, bis kein linker Zeiger mehr existiert (hier Knoten **1**).',
        '**Maximum finden:** Gehe von der Wurzel aus immer nur nach **rechts**, bis kein rechter Zeiger mehr existiert (hier Knoten **14**).',
      ]],
      ['warn', 'Achtung bei doppelten Werten: In der reinen Informatik-Theorie sind im BST **keine Duplikate** erlaubt (Duplikate werden beim Einfügen ignoriert oder über einen Zähler im Knoten verwaltet). Werden doppelte Werte erlaubt, muss eine feste Konvention festgelegt werden (z. B. „kleiner-gleich nach links“).'],
      ['h', 'Wörter, die in der Prüfung vorkommen'],
      ['table', ['Wort', 'Einfach erklärt'], [
        ['Binärbaum', 'Baumstruktur, bei der jeder Knoten maximal 2 Kindknoten besitzt'],
        ['BST (Binary Search Tree)', 'Binärer Suchbaum mit der Eigenschaft: links kleiner, rechts größer'],
        ['Wurzel (Root)', 'Der allererste Knoten ganz oben im Baum'],
        ['Blatt (Leaf)', 'Ein Knoten am Ende des Baums ohne jegliche Kindknoten'],
        ['Höhe des Baums', 'Längster Abstand von der Wurzel zu einem Blatt'],
        ['Traversierung', 'Systematisches Besuchen aller Knoten eines Baums in einer bestimmten Reihenfolge'],
        ['Inorder', 'Reihenfolge links - Wurzel - rechts (liefert beim BST sortierte Werte)'],
      ]],
      ['see', ['eua-listen', 'eua-mengen', 'eua-onotation', 'eua-sortieren']],
    ],
  });
})();
