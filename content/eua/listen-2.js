(function () {
  const {node} = AP2.listenDiagrams;
  const chain = (vals, y) => {
    let nodes = [];
    const edges = [];
    vals.forEach((v, i) => {
      nodes = nodes.concat(node('l' + i, 70 + i * 130, y, v, i === vals.length - 1));
      if (i > 0) edges.push({a: 'l' + (i - 1) + 'n', b: 'l' + i, s: 'accent'});
    });
    return {nodes, edges};
  };
  const single = chain([12, 7, 25, 3], 60);
  const dbl = chain([12, 7, 25], 60);
  AP2.add('eua-listen', [
    ['h', 'Einfach verkettete Liste'],
    ['p', 'Jeder **Knoten** enthält einen **Wert** und einen **Verweis (next)** auf den nächsten Knoten. Die Liste kennt nur den ersten Knoten (**head**). Der letzte Knoten zeigt auf `null`. Elemente liegen **nicht nebeneinander** im Speicher, sondern verteilt, verbunden nur durch die Verweise.'],
    ['diagram', {w: 640, h: 130, keep: 520, cap: 'Einfach verkettete Liste mit 4 Knoten. head zeigt auf den ersten Knoten, der letzte zeigt auf null.', nodes: single.nodes.concat([{id: 'hd', k: 'text', x: 70, y: 112, t: 'head', fs: 12, b: true, tc: 'accent'}]), edges: single.edges.concat([{a: [70, 104], b: [70, 82], s: 'accent'}])}],
    ['code', 'java', `class Knoten {
    int wert;
    Knoten next;                          // Verweis auf den nächsten Knoten
    Knoten(int wert) { this.wert = wert; }
}
class Liste {
    Knoten head;                          // Anfang der Liste

    void vorneEinfuegen(int wert) {       // O(1)
        Knoten neu = new Knoten(wert);
        neu.next = head;                  // 1. neuer Knoten zeigt auf alten Anfang
        head = neu;                       // 2. head zeigt auf neuen Knoten
    }
    boolean enthaelt(int wert) {          // O(n): von vorne durchlaufen
        Knoten k = head;
        while (k != null) {
            if (k.wert == wert) return true;
            k = k.next;                   // zum nächsten Knoten
        }
        return false;
    }
    void loescheVorne() { if (head != null) head = head.next; }   // O(1)
}`],
    ['h3', 'Einfügen in der Mitte (nach dem Knoten k)'],
    ['steps', ['Neuen Knoten `neu` erzeugen.', '`neu.next = k.next;` (neuer Knoten zeigt auf den bisherigen Nachfolger).', '`k.next = neu;` (k zeigt jetzt auf den neuen Knoten).', 'Wichtig: **Reihenfolge** einhalten, sonst geht der Rest der Liste verloren!']],
    ['h', 'Doppelt verkettete Liste'],
    ['p', 'Jeder Knoten hat zusätzlich einen Verweis **prev** auf den **Vorgänger**. Man kann die Liste in **beide Richtungen** durchlaufen und einen Knoten **ohne Suche des Vorgängers** löschen. Dafür braucht jeder Knoten mehr Speicher und das Verwalten von zwei Verweisen ist fehleranfälliger.'],
    ['diagram', {w: 640, h: 150, keep: 520, cap: 'Doppelt verkettete Liste: Pfeile in beide Richtungen (next vorwärts, prev rückwärts).', nodes: dbl.nodes, edges: dbl.edges.concat(dbl.edges.map((e, i) => ({a: 'l' + (i + 1), b: 'l' + i, s: 'ok', via: [[100 + i * 130 + 130 - 40, 112], [100 + i * 130 + 40, 112]]})))}],
    ['table', ['Operation', 'Array', 'Einfach verkettete Liste', 'Doppelt verkettete Liste'], [
      ['Zugriff über Index', '**O(1)**', 'O(n)', 'O(n)'],
      ['Suche nach Wert (unsortiert)', 'O(n)', 'O(n)', 'O(n)'],
      ['Einfügen am Anfang', 'O(n) (alles verschieben)', '**O(1)**', '**O(1)**'],
      ['Einfügen am Ende', 'O(1) (Platz vorhanden) oder O(n) (Vergrößern)', 'O(n) (ohne tail) oder O(1) (mit tail)', 'O(1) (mit tail)'],
      ['Einfügen/Löschen in der Mitte (Position bekannt)', 'O(n)', '**O(1)** (Vorgänger bekannt)', '**O(1)**'],
      ['Speicher', 'Kompakt, nur Daten', '+ 1 Verweis je Knoten', '+ 2 Verweise je Knoten'],
      ['Größe', 'Fest (oder neu anlegen)', 'Dynamisch', 'Dynamisch'],
    ]],
    ['procon', 'Array oder verkettete Liste?', ['**Array:** sehr schneller Zugriff über Index, speicherfreundlich (Cache)', '**Array:** einfach und überschaubar', '**Liste:** wächst und schrumpft beliebig, schnelles Einfügen/Löschen am Anfang oder an bekannter Stelle', '**Liste:** kein Verschieben von Elementen'], ['**Array:** feste Größe, Einfügen/Löschen in der Mitte teuer', '**Liste:** Zugriff über Index nur durch Durchlaufen (O(n))', '**Liste:** zusätzlicher Speicher für Verweise, schlechtere Cache-Nutzung', '**Liste:** Fehler bei Verweisen führen zu verlorenen Knoten']],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Nennen Sie je zwei Vorteile eines Arrays und einer verketteten Liste.', ['**Array:** Zugriff über Index in O(1); geringer Speicherverbrauch durch kompakte Ablage.', '**Verkettete Liste:** Einfügen und Löschen ohne Verschieben anderer Elemente; dynamische Größe ohne Vergrößern und Kopieren.'], 4],
    ['qa', 'Wie lautet der Code zum Einfügen eines Knotens am Anfang einer einfach verketteten Liste? Warum ist die Reihenfolge der zwei Zeilen wichtig?', ['`neu.next = head;` und danach `head = neu;`', 'Würde man zuerst `head = neu` ausführen, ginge der Verweis auf den bisherigen Anfang verloren und die ganze alte Liste wäre nicht mehr erreichbar.'], 4],
    ['qa', 'Welchen Wert liefert werte[3] bei int[] werte = {5, 8, 1, 9, 4}? Was passiert bei werte[5]?', ['`werte[3]` ist das **vierte** Element: **9**.', '`werte[5]` liegt außerhalb (gültig: 0 bis 4): **ArrayIndexOutOfBoundsException**.'], 3],
    ['quiz', [
      {q: 'Wie lange dauert der Zugriff auf Element i in einem Array?', o: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], a: 0, e: 'Die Adresse wird direkt berechnet.'},
      {q: 'Worauf zeigt der letzte Knoten einer einfach verketteten Liste?', o: ['null', 'Auf den ersten Knoten', 'Auf sich selbst', 'Auf den Vorgänger'], a: 0, e: 'next des letzten Knotens ist null.'},
      {q: 'Welche Datenstruktur erlaubt Durchlaufen in beide Richtungen?', o: ['Doppelt verkettete Liste', 'Einfach verkettete Liste', 'Stack', 'Queue'], a: 0, e: 'Jeder Knoten hat next und prev.'},
      {q: 'Welcher Index hat das erste Element eines Arrays in Java?', o: ['0', '1', '-1', 'Hängt vom Array ab'], a: 0, e: 'Indizes beginnen bei 0.'},
    ]],
  ]);
})();
