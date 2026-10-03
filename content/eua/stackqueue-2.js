(function () {
  const {queueCells} = AP2.sqDiagrams;
  AP2.add('eua-stackqueue', [
    ['h', 'Queue: die Warteschlange'],
    ['p', 'Eine Queue funktioniert wie eine **Warteschlange an der Kasse**: Wer **zuerst** kommt, wird **zuerst** bedient. Neue Elemente werden **hinten angefügt** (`enqueue`), das **vorderste** wird **entnommen** (`dequeue`). **First In, First Out.**'],
    ['diagram', {w: 560, h: 130, keep: 420, cap: 'Queue mit den Elementen A, B, C, D. Vorne wird entnommen (dequeue), hinten angefügt (enqueue).', nodes: queueCells(['A', 'B', 'C', 'D'], 60).concat([{id: 'f', k: 'text', x: 70, y: 100, t: 'Anfang (front)', fs: 12, b: true, tc: 'ok'}, {id: 'r', k: 'text', x: 340, y: 100, t: 'Ende (rear)', fs: 12, b: true, tc: 'accent'}, {id: 'o', k: 'text', x: 30, y: 24, t: 'dequeue', fs: 12, tc: 'text2'}, {id: 'e', k: 'text', x: 470, y: 24, t: 'enqueue', fs: 12, tc: 'text2'}]), edges: [{a: [60, 34], b: [60, 20], s: 'text3'}, {a: [440, 20], b: [440, 38], s: 'text3'}]}],
    ['table', ['Operation', 'Queue danach (vorne links)', 'Rückgabe'], [['enqueue(A)', 'A', '-'], ['enqueue(B)', 'A, B', '-'], ['enqueue(C)', 'A, B, C', '-'], ['dequeue()', 'B, C', 'A'], ['enqueue(D)', 'B, C, D', '-'], ['dequeue()', 'C, D', 'B'], ['peek()', 'C, D', 'C']]],
    ['codes', [
      ['java', `Queue<String> q = new LinkedList<>();
q.offer("A");                // enqueue
q.offer("B");
q.offer("C");
System.out.println(q.poll());    // A (dequeue)
System.out.println(q.peek());    // B (ansehen)`],
      ['csharp', `var q = new Queue<string>();
q.Enqueue("A"); q.Enqueue("B"); q.Enqueue("C");
Console.WriteLine(q.Dequeue());   // A`],
      ['python', `from collections import deque
q = deque()
q.append("A")             # enqueue
q.append("B")
print(q.popleft())        # A (dequeue)`],
    ]],
    ['h3', 'Umsetzung als Array: Ringpuffer'],
    ['p', 'Eine Queue lässt sich mit einem **Array fester Größe** bauen. Damit nach vielen `enqueue`/`dequeue` nicht ständig verschoben werden muss, laufen die Indizes **im Kreis**: `rear = (rear + 1) % N`. Das ist ein **Ringpuffer (Circular Buffer)**. Die Queue ist **voll**, wenn alle N Plätze belegt sind, und **leer**, wenn keine Elemente da sind.'],
    ['h3', 'Varianten'],
    ['kv', [
      ['Deque (Double-Ended Queue)', 'Einfügen und Entnehmen an **beiden Enden** möglich. Kann Stack **und** Queue ersetzen (Java `ArrayDeque`).'],
      ['Prioritätswarteschlange (Priority Queue)', 'Das Element mit der **höchsten Priorität** kommt zuerst raus, nicht das älteste. Meist mit einem **Heap** umgesetzt (Einfügen und Entnehmen O(log n)). Beispiel: Notaufnahme, Prozess-Scheduling.'],
    ]],
    ['table', ['Merkmal', 'Stack', 'Queue'], [
      ['Prinzip', '**LIFO** (zuletzt rein, zuerst raus)', '**FIFO** (zuerst rein, zuerst raus)'],
      ['Einfügen', 'oben (push)', 'hinten (enqueue)'],
      ['Entnehmen', 'oben (pop)', 'vorne (dequeue)'],
      ['Beispiele', 'Undo, Call Stack, Klammerprüfung, Tiefensuche', 'Druckerwarteschlange, Task-Queue, Breitensuche'],
      ['Laufzeit der Operationen', 'O(1)', 'O(1)'],
    ]],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Auf einen leeren Stack werden nacheinander push(4), push(7), pop(), push(2), push(9), pop() ausgeführt. Welche Elemente liegen am Ende im Stack (von unten nach oben)?', ['push(4): [4]. push(7): [4, 7]. pop(): entfernt 7, [4]. push(2): [4, 2]. push(9): [4, 2, 9]. pop(): entfernt 9, [4, 2].', 'Ergebnis: **4, 2** (oben die 2).'], 4],
    ['qa', 'Eine Queue enthält A, B, C (A vorne). Es folgen: dequeue(), enqueue(D), dequeue(), enqueue(E). Wie sieht die Queue aus?', ['dequeue: A raus, [B, C]. enqueue(D): [B, C, D]. dequeue: B raus, [C, D]. enqueue(E): [C, D, E].', 'Ergebnis: **C, D, E** (C vorne).'], 4],
    ['qa', 'Nennen Sie je zwei Anwendungsbeispiele für Stack und Queue.', ['- **Stack:** Rückgängig-Funktion eines Editors; Verwaltung der Methodenaufrufe (Call Stack); Prüfen von Klammern.', '- **Queue:** Druckaufträge in Reihenfolge abarbeiten; Aufgabenverteilung in einem Server (Message Queue).'], 4],
    ['qa', 'Warum funktioniert die Klammerprüfung gut mit einem Stack?', 'Die zuletzt geöffnete Klammer muss **zuerst** wieder geschlossen werden. Genau das ist das LIFO-Prinzip: Der oberste Stack-Eintrag ist immer die Klammer, die als Nächstes geschlossen werden muss.', 3],
    ['quiz', [
      {q: 'Wofür steht LIFO?', o: ['Last In, First Out', 'Last In, First Over', 'Long In, Fast Out', 'List In, File Out'], a: 0, e: 'Das zuletzt eingefügte Element wird zuerst entnommen.'},
      {q: 'Welche Datenstruktur nutzt man typischerweise für eine Druckerwarteschlange?', o: ['Queue', 'Stack', 'Baum', 'Hashtabelle'], a: 0, e: 'Aufträge werden in der Reihenfolge ihres Eintreffens bearbeitet: FIFO.'},
      {q: 'Was liefert pop() bei einem Stack mit den Elementen 1, 2, 3 (3 oben)?', o: ['3', '1', '2', 'Fehler'], a: 0, e: 'Das oberste Element wird entfernt und zurückgegeben.'},
      {q: 'Was macht peek()?', o: ['Zeigt das nächste Element, ohne es zu entfernen', 'Entfernt das letzte Element', 'Löscht alle Elemente', 'Fügt ein Element ein'], a: 0, e: 'peek liest nur.'},
      {q: 'Welche Laufzeit haben push und pop beim Stack?', o: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], a: 0, e: 'Es wird immer nur am oberen Ende gearbeitet.'},
    ]],
  ]);
})();
