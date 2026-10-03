AP2.add('course-python', [
  ['h', 'Listen, Tupel, Dictionaries, Mengen'],
  ['code', 'python', `l = [5, 2, 9]
l.append(1); l.insert(0, 7); l.extend([3, 4]); l.remove(9); x = l.pop()   # veränderbar
l.sort(); l.sort(key=lambda v: -v); print(sorted(l), l[::-1], len(l), 2 in l)
print(l[1:3], l[:2], l[-2:], l.index(5), l.count(5))      # Slicing: [start:stop:schritt]
kopie = l.copy()          # flache Kopie (nicht: kopie = l, das ist dasselbe Objekt!)

t = (1, 2, 3); a, b, c = t; a, *rest = [1, 2, 3, 4]       # Entpacken
d = {"name": "Anna", "alter": 21}
d["ort"] = "Ulm"; print(d.get("xyz", "n/a"), d.keys(), d.values())
for k, v in d.items(): print(k, v)
d.update({"alter": 22}); d.pop("ort"); print("name" in d, {**d, "neu": 1})   # Zusammenführen

s = {1, 2, 3}; r = {3, 4}
print(s | r, s & r, s - r, s ^ r)        # Vereinigung, Schnitt, Differenz, symmetrisch
print(list(set([1, 1, 2])))              # Duplikate entfernen`],
  ['table', ['Struktur', 'Zugriff', 'Suchen (`in`)', 'Einfügen am Ende', 'Wann?'], [['`list`', 'O(1)', 'O(n)', 'O(1) amortisiert', 'Geordnete Folge, Index'], ['`dict`', 'O(1) im Mittel', 'O(1)', 'O(1)', 'Schlüssel zu Wert, Zählen, Gruppieren'], ['`set`', '-', 'O(1)', 'O(1)', 'Duplikate, Mitgliedschaft'], ['`tuple`', 'O(1)', 'O(n)', 'unveränderbar', 'Feste Datensätze, Rückgabe mehrerer Werte'], ['`collections.deque`', 'Ende O(1)', 'O(n)', 'beide Enden O(1)', 'Warteschlange, Stack']]],
  ['h', 'Comprehensions'],
  ['code', 'python', `quadrate = [x * x for x in range(10) if x % 2 == 0]       # [0, 4, 16, 36, 64]
paare = [(x, y) for x in range(3) for y in range(2)]
lookup = {w: len(w) for w in ["ab", "cde"]}                # {'ab': 2, 'cde': 3}
eindeutig = {len(w) for w in ["ab", "cd", "efg"]}          # {2, 3}
summe = sum(x * x for x in range(1000))                     # Generator-Ausdruck, kein Zwischenspeicher
print(any(x > 5 for x in [1, 7]), all(x > 0 for x in [1, 2]))`],
  ['h', 'Funktionen'],
  ['code', 'python', `def gruss(name, anrede="Hallo", *args, **kwargs):
    """Docstring: beschreibt die Funktion."""
    return f"{anrede} {name}", len(args), kwargs            # mehrere Rückgabewerte = Tupel

text, n, extra = gruss("Anna", "Hi", 1, 2, farbe="rot")     # Positions- und Schlüsselwortargumente
gruss(name="Ben")                                            # benannte Aufrufe
def nur_kw(a, *, b): return a + b                            # b nur per Name
def positions(a, b, /): return a - b                         # a, b nur positionsbezogen

# FALLE: veränderbares Standardargument wird nur EINMAL erzeugt
def schlecht(x, liste=[]): liste.append(x); return liste     # schlecht(1) und schlecht(2) teilen die Liste
def gut(x, liste=None):
    liste = [] if liste is None else liste
    liste.append(x); return liste

quadrat = lambda x: x * x                                    # anonyme Funktion
print(list(map(quadrat, [1, 2])), list(filter(lambda x: x > 1, [1, 2, 3])))
print(sorted(["bb", "a", "ccc"], key=len, reverse=True))     # Funktion als Argument`],
  ['table', ['Scope-Regel', 'Bedeutung'], [['**LEGB**', '**L**ocal, **E**nclosing, **G**lobal, **B**uilt-in: so sucht Python einen Namen'], ['`global x`', 'Globale Variable in einer Funktion **zuweisen**'], ['`nonlocal x`', 'Variable der umgebenden Funktion verändern (Closures)'], ['Parameterübergabe', '**Objektreferenz**: Veränderbare Objekte werden in der Funktion mitverändert']]],
  ['h', 'Closures, Decorators, Generatoren'],
  ['code', 'python', `def zaehler(start=0):                        # Closure: innere Funktion merkt sich Umgebung
    n = start
    def next_():
        nonlocal n
        n += 1; return n
    return next_
c = zaehler(); print(c(), c())               # 1 2

import functools, time
def messen(f):                               # Decorator: Funktion einpacken
    @functools.wraps(f)                      # behält Name und Doc
    def wrapper(*args, **kwargs):
        t = time.perf_counter(); erg = f(*args, **kwargs)
        print(f.__name__, time.perf_counter() - t); return erg
    return wrapper
@messen
def rechne(n): return sum(range(n))          # entspricht rechne = messen(rechne)

def fib():                                    # Generator: liefert Werte nacheinander (lazy)
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b
import itertools
print(list(itertools.islice(fib(), 8)))      # [0, 1, 1, 2, 3, 5, 8, 13]

@functools.lru_cache(maxsize=None)            # Memoisation (Cache)
def fibr(n): return n if n < 2 else fibr(n - 1) + fibr(n - 2)`],
]);
