AP2.add('course-python', [
  ['h', 'Häufige Fallen und gutes Python'],
  ['table', ['Falle', 'Erklärung', 'Lösung'], [
    ['Veränderbares Standardargument', '`def f(x, l=[])` teilt die Liste zwischen Aufrufen', '`None` verwenden und in der Funktion neu anlegen'],
    ['Kopie ist keine Kopie', '`b = a` zeigt auf **dasselbe** Objekt; `a.copy()` ist **flach**', '`copy.deepcopy(a)` bei verschachtelten Strukturen'],
    ['`is` statt `==`', '`is` vergleicht Identität; `1000 is 1000` kann `False` sein', '`==` für Werte, `is` nur für `None`'],
    ['Ändern beim Iterieren', 'Elemente einer Liste in der `for`-Schleife löschen überspringt andere', 'Kopie iterieren oder Comprehension'],
    ['Zirkuläre Imports', 'Zwei Module importieren sich gegenseitig', 'Struktur umbauen, Import in Funktion'],
    ['Gleitkommafehler', '`0.1 + 0.2 == 0.30000000000000004`', '`math.isclose`, `decimal.Decimal`'],
    ['Späte Bindung in Closures', '`[lambda: i for i in range(3)]` liefern alle 2', 'Standardwert `lambda i=i: i`'],
    ['Einrückung mischen', 'Tabs und Leerzeichen erzeugen `IndentationError`', 'Immer 4 Leerzeichen'],
  ]],
  ['list', ['**PEP 8** (Stilrichtlinie): `snake_case` für Funktionen und Variablen, `PascalCase` für Klassen, `KONSTANTE`, Zeilen bis 79/88 Zeichen. Werkzeuge: `black`, `ruff`, `flake8`.', '**Zen of Python** (`import this`): "Lesbarkeit zählt", "Explizit ist besser als implizit", "Einfach ist besser als komplex".', 'Statt Indexschleife `for x in liste` oder `enumerate`. Statt Strings in Schleifen zu addieren `"".join(teile)`.', 'Mit `with` Ressourcen sicher öffnen und schließen.', 'Docstrings und Typ-Hinweise für Funktionen verwenden.']],
  ['h', 'Algorithmen in Python (Prüfungsklassiker)'],
  ['code', 'python', `def ist_primzahl(n):
    if n < 2: return False
    return all(n % i for i in range(2, int(n ** 0.5) + 1))

def fakultaet(n): return 1 if n <= 1 else n * fakultaet(n - 1)       # rekursiv

def binaere_suche(liste, ziel):                                         # O(log n), Liste sortiert
    lo, hi = 0, len(liste) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if liste[mid] == ziel: return mid
        lo, hi = (mid + 1, hi) if liste[mid] < ziel else (lo, mid - 1)
    return -1

def bubble_sort(a):                                                      # O(n^2)
    a = a[:]
    for i in range(len(a) - 1):
        for j in range(len(a) - 1 - i):
            if a[j] > a[j + 1]: a[j], a[j + 1] = a[j + 1], a[j]
    return a

def ist_palindrom(s):
    s = "".join(c.lower() for c in s if c.isalnum()); return s == s[::-1]

def wort_haeufigkeit(text):
    from collections import Counter
    return Counter(text.lower().split()).most_common(3)`],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie den Unterschied zwischen einer Liste und einem Tupel und nennen Sie je einen Anwendungsfall.', '**Liste:** veränderbar, für Folgen, die wachsen oder sich ändern (Einkaufsliste). **Tupel:** unveränderbar, für feste Datensätze (Koordinate `(x, y)`), als Dictionary-Schlüssel und als Mehrfach-Rückgabe. Tupel sind etwas speicher- und zugriffsschneller.', 4],
  ['qa', 'Was gibt folgender Code aus? `a = [1, 2]; b = a; b.append(3); print(a)`', '`[1, 2, 3]`. `b = a` kopiert keine Liste, sondern lässt `b` auf **dasselbe Objekt** zeigen (Referenzsemantik). Eine Kopie erzeugt man mit `a.copy()` oder `a[:]`.', 4],
  ['qa', 'Schreiben Sie eine Funktion, die aus einer Liste alle geraden Zahlen quadriert zurückgibt.', ['def gerade_quadrate(zahlen):', '    return [z * z for z in zahlen if z % 2 == 0]', 'Beispiel: `gerade_quadrate([1, 2, 3, 4])` ergibt `[4, 16]`.'], 4],
  ['qa', 'Wozu dient `if __name__ == "__main__":`?', 'Der Block läuft nur, wenn die Datei **direkt gestartet** wird, nicht beim **Import** als Modul. So lassen sich Funktionen wiederverwenden, ohne dass Testcode ausgeführt wird.', 3],
  ['qa', 'Was ist ein Generator und welchen Vorteil hat er?', 'Eine Funktion mit `yield` liefert Werte **nacheinander und träge (lazy)**, ohne die ganze Folge im Speicher zu halten. Geeignet für große oder unendliche Folgen und Datenströme.', 4],
  ['qa', 'Erklären Sie Decorator in einem Satz mit Beispiel.', 'Ein **Decorator** ist eine Funktion, die eine andere Funktion nimmt und eine erweiterte zurückgibt (`@messen` über `def f` entspricht `f = messen(f)`), zum Beispiel für Zeitmessung, Logging oder Zugriffsprüfung.', 4],
  ['quiz', [
    {q: 'Was ergibt 7 // 2 in Python?', o: ['3', '3.5', '4', '1'], a: 0, e: '// ist Ganzzahldivision (abgerundet).'},
    {q: 'Welcher Typ ist unveränderbar?', o: ['tuple', 'list', 'dict', 'set'], a: 0, e: 'Auch str, int und frozenset sind immutable.'},
    {q: 'Was druckt print(bool([]))?', o: ['False', 'True', 'None', '[]'], a: 0, e: 'Leere Sammlungen sind falsy.'},
    {q: 'Wie schützt man sich beim Standardargument vor dem Listen-Fehler?', o: ['Standardwert None und Liste in der Funktion erzeugen', 'Liste global anlegen', 'Argument weglassen', 'tuple casten'], a: 0, e: 'Der Standardwert wird nur einmal ausgewertet.'},
    {q: 'Was bewirkt das Schlüsselwort yield?', o: ['Funktion wird zum Generator', 'Programm beendet sich', 'Fehler wird ausgelöst', 'Datei wird geschlossen'], a: 0, e: 'Der Zustand bleibt zwischen den Werten erhalten.'},
    {q: 'Was bedeutet der GIL in CPython?', o: ['Nur ein Thread führt gleichzeitig Python-Bytecode aus', 'Globale Importliste', 'Grafikbibliothek', 'Generator-Interface'], a: 0, e: 'Für CPU-lastiges Parallelrechnen multiprocessing nutzen.'},
    {q: 'Was gibt "Hallo"[::-1] zurück?', o: ['ollaH', 'Hallo', 'H', 'Fehler'], a: 0, e: 'Schrittweite -1 kehrt um.'},
    {q: 'Welcher Block wird bei try/except immer ausgeführt?', o: ['finally', 'else', 'except', 'catch'], a: 0, e: 'finally räumt auf, egal ob ein Fehler auftrat.'},
  ]],
]);
