(function () {
  const cells = (vals, prefix, y, x0, w, style) => vals.map((v, i) => ({id: prefix + i, k: 'box', x: x0 + i * w, y, w: w - 4, h: 40, t: String(v), s: style || 'accent'}));
  const idx = (n, prefix, y, x0, w) => Array.from({length: n}, (v, i) => ({id: prefix + 'i' + i, k: 'text', x: x0 + i * w, y, t: String(i), fs: 12, tc: 'text3'}));
  const node = (id, x, y, val, last) => [{id: id, k: 'box', x, y, w: 64, h: 40, t: String(val), s: 'accent'}, {id: id + 'n', k: 'box', x: x + 48, y, w: 32, h: 40, t: last ? 'null' : '', s: last ? 'soft' : 'solid', fs: 10}];
  AP2.page('eua-listen', {
    b: 'eua', g: 'Datenstrukturen', t: 'Arrays und Listen (einfach und doppelt verkettet)',
    d: 'Ein **Array** speichert Elemente gleichen Typs **hintereinander im Speicher** (feste Größe, Zugriff über **Index** in **O(1)**). Eine **verkettete Liste** besteht aus **Knoten**, die jeweils **Daten und einen Verweis auf den nächsten Knoten** enthalten (flexible Größe, Zugriff in **O(n)**, Einfügen am Anfang in **O(1)**). Eine **doppelt verkettete Liste** hat zusätzlich einen Verweis auf den **Vorgänger**.',
    m: '**Array = Hausreihe mit Nummern (schneller Zugriff, schwer erweiterbar). Liste = Schatzsuche mit Hinweisen (jeder Knoten kennt den nächsten; leicht erweiterbar, aber man muss sich durchhangeln).** Index beginnt bei **0**, letzter Index = Länge - 1.',
    cheat: [
      ['Array', ['**Feste Größe**, gleicher Typ', 'Elemente **direkt hintereinander**', '**Zugriff über Index: O(1)**', 'Einfügen/Löschen in der Mitte: **O(n)** (verschieben)', 'Index **0 bis n-1**']],
      ['Einfach verkettete Liste', ['Knoten: **Daten + next**', 'Zugriff auf i-tes Element: **O(n)**', 'Einfügen/Löschen **am Anfang: O(1)**', 'Nur **vorwärts** durchlaufbar', 'Letzter Knoten: `next = null`']],
      ['Doppelt verkettete Liste', ['Knoten: **Daten + prev + next**', 'Vorwärts **und** rückwärts durchlaufbar', 'Löschen eines bekannten Knotens: O(1)', 'Mehr Speicher je Knoten']],
      ['Dynamische Listen', ['Java `ArrayList` / C# `List<T>` / Python `list`: **wachsendes Array** im Hintergrund', 'Java `LinkedList`: doppelt verkettete Liste']],
    ],
    blocks: [
      ['h', 'Arrays'],
      ['p', 'Ein **Array** ist wie eine **Reihe nummerierter Schubladen**. Alle haben die **gleiche Größe** und liegen **direkt nebeneinander**. Weil das System die Adresse des Elements mit Index i **direkt berechnen** kann (Startadresse + i mal Elementgröße), dauert jeder Zugriff gleich lang: **O(1)**.'],
      ['diagram', {w: 560, h: 130, keep: 380, cap: 'Ein Array mit 6 Elementen. Über dem Feld stehen die Indizes: Das erste Element hat Index 0.', nodes: cells([12, 7, 25, 3, 18, 9], 'a', 70, 70, 76).concat(idx(6, 'a', 34, 70, 76)), edges: []}],
      ['codes', [
        ['java', `int[] zahlen = new int[6];            // Array mit 6 Elementen (alle 0)
int[] werte = {12, 7, 25, 3, 18, 9};  // direkt befüllt
System.out.println(werte[2]);         // 25 (Index 2 = drittes Element)
werte[3] = 99;                        // Element ändern
System.out.println(werte.length);     // 6
// werte[6] -> ArrayIndexOutOfBoundsException (gültig sind 0 bis 5)
for (int w : werte) System.out.println(w);   // alle ausgeben`],
        ['csharp', `int[] werte = {12, 7, 25, 3, 18, 9};
Console.WriteLine(werte[2]);          // 25
werte[3] = 99;
Console.WriteLine(werte.Length);      // 6
foreach (int w in werte) Console.WriteLine(w);`],
        ['python', `werte = [12, 7, 25, 3, 18, 9]       # Python-"list" ist ein dynamisches Array
print(werte[2])                       # 25
werte[3] = 99
print(len(werte))                     # 6
werte.append(5)                       # wächst automatisch
for w in werte: print(w)`],
      ]],
      ['h', 'Mehrdimensionale Arrays'],
      ['p', 'Ein **zweidimensionales Array** ist eine **Tabelle**: `int[][] m = new int[3][4];` hat 3 Zeilen und 4 Spalten. Zugriff: `m[zeile][spalte]`. Beispiel: Spielfeld, Matrix, Stundenplan.'],
      ['table', ['', 'Spalte 0', 'Spalte 1', 'Spalte 2'], [['Zeile 0', 'm[0][0]', 'm[0][1]', 'm[0][2]'], ['Zeile 1', 'm[1][0]', 'm[1][1]', 'm[1][2]']]],
    ],
  });
  AP2.listenDiagrams = {node};
})();
