(function () {
  const stackCells = (vals, x) => vals.map((v, i) => ({id: 's' + i, k: 'box', x, y: 40 + (vals.length - 1 - i) * 42, w: 110, h: 38, t: v, s: i === vals.length - 1 ? 'solid' : 'accent'}));
  const queueCells = (vals, y) => vals.map((v, i) => ({id: 'q' + i, k: 'box', x: 70 + i * 90, y, w: 84, h: 38, t: v, s: i === 0 ? 'ok' : (i === vals.length - 1 ? 'solid' : 'accent')}));
  AP2.page('eua-stackqueue', {
    b: 'eua', g: 'Datenstrukturen', t: 'Stack (Stapel) und Queue (Warteschlange)',
    d: 'Ein **Stack** (Stapel) arbeitet nach dem **LIFO-Prinzip** (**L**ast **I**n, **F**irst **O**ut): Das **zuletzt** abgelegte Element wird **zuerst** entnommen (`push`, `pop`, `peek`). Eine **Queue** (Warteschlange) arbeitet nach dem **FIFO-Prinzip** (**F**irst **I**n, **F**irst **O**ut): Das **zuerst** eingefügte Element wird **zuerst** entnommen (`enqueue`, `dequeue`).',
    m: '**Stack = Tellerstapel (oben drauf, oben weg) = LIFO. Queue = Schlange an der Kasse (hinten anstellen, vorne bedient werden) = FIFO.** Stack: push / pop / peek. Queue: enqueue (hinten) / dequeue (vorne).',
    cheat: [
      ['Stack (LIFO)', ['**push(x):** oben drauflegen', '**pop():** oberstes entfernen und liefern', '**peek():** oberstes ansehen, nicht entfernen', '**isEmpty()**', 'Alle Operationen **O(1)**']],
      ['Queue (FIFO)', ['**enqueue(x) / offer:** hinten anfügen', '**dequeue() / poll:** vorderstes entfernen', '**peek():** vorderstes ansehen', '**isEmpty()**', 'Alle Operationen **O(1)**']],
      ['Anwendungen Stack', ['**Rückgängig (Undo)**, Browser-Zurück', '**Funktionsaufrufe** (Call Stack)', '**Klammerprüfung**, Ausdrücke auswerten', 'Tiefensuche (DFS)']],
      ['Anwendungen Queue', ['**Druckerwarteschlange**', '**Nachrichtenwarteschlangen**, Aufgabenverteilung', '**Breitensuche (BFS)**', 'Pufferung (Tastatur, Netzwerk)']],
    ],
    blocks: [
      ['h', 'Stack: der Stapel'],
      ['p', 'Ein Stack funktioniert wie ein **Tellerstapel**: Du legst einen Teller **oben** drauf (`push`) und nimmst auch **oben** wieder einen weg (`pop`). Das **zuletzt** hingelegte Element kommt **zuerst** wieder raus: **Last In, First Out**. Nur das oberste Element ist zugänglich.'],
      ['row', [['diagram', {w: 340, h: 270, cap: 'Stack nach push(1), push(2), push(3): oben die 3', nodes: stackCells(['1', '2', '3'], 170).concat([{id: 'top', k: 'text', x: 280, y: 40, t: 'oben (top)', fs: 12, b: true, tc: 'accent'}]), edges: []}], ['table', ['Operation', 'Stack danach', 'Rückgabe'], [['push(1)', '1', '-'], ['push(2)', '1, 2', '-'], ['push(3)', '1, 2, 3', '-'], ['peek()', '1, 2, 3', '3'], ['pop()', '1, 2', '3'], ['pop()', '1', '2'], ['push(9)', '1, 9', '-']], {first: true}]]],
      ['codes', [
        ['java', `import java.util.ArrayDeque;
import java.util.Deque;

Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);
stack.push(2);
stack.push(3);
System.out.println(stack.peek());   // 3 (oberstes ansehen)
System.out.println(stack.pop());    // 3 (entfernen)
System.out.println(stack.pop());    // 2
System.out.println(stack.isEmpty());// false (noch die 1)`],
        ['csharp', `var stack = new Stack<int>();
stack.Push(1); stack.Push(2); stack.Push(3);
Console.WriteLine(stack.Peek());    // 3
Console.WriteLine(stack.Pop());     // 3`],
        ['python', `stack = []                # list als Stack
stack.append(1)           # push
stack.append(2)
stack.append(3)
print(stack[-1])          # peek: 3
print(stack.pop())        # 3
print(stack.pop())        # 2`],
      ]],
      ['h3', 'Anwendung: Klammerprüfung'],
      ['p', 'Aufgabe: Prüfe, ob ein Ausdruck wie `{[()]}` richtig geklammert ist. **Idee:** Öffnende Klammern auf den Stack legen. Bei einer schließenden Klammer muss die **oberste** Klammer die passende **öffnende** sein, dann `pop`. Am Ende muss der Stack **leer** sein.'],
      ['code', 'java', `boolean klammernOk(String s) {
    Deque<Character> st = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else if (c == ')' || c == ']' || c == '}') {
            if (st.isEmpty()) return false;
            char o = st.pop();
            if ((c == ')' && o != '(') || (c == ']' && o != '[') || (c == '}' && o != '{')) return false;
        }
    }
    return st.isEmpty();      // alles geschlossen?
}
// "{[()]}" -> true     "([)]" -> false     "((" -> false`],
    ],
  });
  AP2.sqDiagrams = {queueCells};
})();
