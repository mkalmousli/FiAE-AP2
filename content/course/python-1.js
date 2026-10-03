AP2.page('course-python', {
  b: 'course', g: 'Programmiersprachen', t: 'Python: vollständiger Kurs von Grundlagen bis Fortgeschritten',
  d: '**Python** ist eine **interpretierte, dynamisch (aber stark) typisierte, objektorientierte** Allzwecksprache. Blöcke entstehen durch **Einrückung** (4 Leerzeichen). Alles ist ein **Objekt**. Python läuft auf einer **virtuellen Maschine** (CPython: Quelltext wird zu Bytecode, dieser wird ausgeführt). Stärken: **lesbarer Code**, riesige **Standardbibliothek** und Ökosystem (Daten, Web, Automatisierung, KI). Schwäche: geringere **Rechengeschwindigkeit** als C, C# oder Java.',
  m: '**Veränderbar (mutable): list, dict, set. Unveränderbar (immutable): int, float, str, tuple, frozenset, bool.** **Pythonic: EAFP (erst versuchen, Fehler abfangen), "Es gibt einen offensichtlichen Weg".** **Standardargument nie mit [] oder {}.** **`is` = gleiches Objekt, `==` = gleicher Wert.**',
  cheat: [
    ['Grundlagen', ['`x = 5` (keine Deklaration), `type(x)`', 'Kommentar `#`, Docstring `"""..."""`', '`print(f"{x:.2f}")`, `input()`', 'Einrückung = Block, kein `;`', '`True/False/None`, `and or not`']],
    ['Kontrollfluss', ['`if / elif / else`', '`for x in iterable:` `range(a, b, step)`', '`while ...: break / continue`, `else` an Schleifen', '`match` / `case` (ab 3.10)', '`pass` als Platzhalter']],
    ['Sammlungen', ['`list [..]` geordnet, veränderbar', '`tuple (..)` unveränderbar', '`dict {k: v}` Schlüssel-Wert', '`set {..}` ohne Duplikate', 'Slicing `l[1:4]`, `l[::-1]`']],
    ['Funktionen', ['`def f(a, b=1, *args, **kw)`', '`lambda x: x*2`', '**Decorator** `@name`', '**Generator** `yield`', '`return` mehrere Werte als Tupel']],
    ['Klassen', ['`class A: def __init__(self)`', '`@property`, `@staticmethod`, `@classmethod`', '`@dataclass`', '**Dunder:** `__str__`, `__eq__`, `__len__`']],
    ['Werkzeuge', ['`venv`, `pip install`', '`import`, `from x import y`', '`with open(..) as f`', '`try / except / finally`', '`pytest`, `unittest`']],
  ],
  blocks: [
    ['h', 'Erste Schritte und Datentypen'],
    ['code', 'python', `# Variablen sind Namen, die auf Objekte zeigen (keine Typdeklaration)
zahl = 42            # int (beliebig groß!)
pi = 3.14159         # float
name = "Anna"        # str (Unicode)
aktiv = True         # bool
nichts = None        # NoneType: "kein Wert"
komplex = 2 + 3j     # complex

print(type(zahl), isinstance(zahl, int))   # <class 'int'> True
print(7 / 2, 7 // 2, 7 % 2, 2 ** 10)       # 3.5 3 1 1024  (/ ist immer float)
print(round(2.5), round(3.5), int("12"), float("3.5"), str(7), bool(""))   # 2 4 12 3.5 7 False`],
    ['table', ['Typ', 'Beispiel', 'Veränderbar', 'Hinweis'], [
      ['`int`', '`42`, `1_000_000`', 'nein', 'Unbegrenzte Größe'],
      ['`float`', '`0.1`', 'nein', '`0.1 + 0.2 != 0.3` (Binärdarstellung); für Geld `decimal.Decimal`'],
      ['`str`', '`"Hallo"`', 'nein', 'Unicode, Methoden liefern **neue** Strings'],
      ['`bool`', '`True`', 'nein', 'Unterklasse von int; falsy: `0, "", [], {}, None`'],
      ['`list`', '`[1, 2]`', '**ja**', 'Geordnet, beliebige Typen'],
      ['`tuple`', '`(1, 2)`', 'nein', 'Als Datensatz, Dict-Schlüssel'],
      ['`dict`', '`{"a": 1}`', '**ja**', 'Schlüssel eindeutig und hashbar; Einfügereihenfolge bleibt'],
      ['`set`', '`{1, 2}`', '**ja**', 'Eindeutig, ungeordnet, schnelles `in`'],
    ]],
    ['h', 'Strings'],
    ['code', 'python', `s = "  Hallo Welt  "
print(s.strip().upper(), s.lower(), len(s))
print("Hallo Welt".split(" "), "-".join(["a", "b", "c"]))   # ['Hallo','Welt']  a-b-c
print("Welt" in "Hallo Welt", "Hallo Welt".replace("Welt", "Python"))
print("Hallo"[0], "Hallo"[-1], "Hallo"[1:3], "Hallo"[::-1])   # H o al ollaH
name, alter, preis = "Anna", 21, 3.14159
print(f"{name} ist {alter} Jahre alt, Preis {preis:.2f} Euro, {alter:05d}, {1234567:,}")
print("a\\tb\\n", r"roher\\String", """mehr
zeilig""")
print("Hallo".startswith("Ha"), "42".isdigit(), "abc".find("c"), "a,b".partition(","))`],
    ['table', ['Format', 'Bedeutung', 'Beispiel'], [['`:.2f`', '2 Nachkommastellen', '`f"{3.14159:.2f}"` ergibt `3.14`'], ['`:>8` / `:<8` / `:^8`', 'rechts, links, zentriert in Breite 8', '`f"{x:>8}"`'], ['`:05d`', 'Ganzzahl mit führenden Nullen', '`00042`'], ['`:,`', 'Tausendertrenner', '`1,234,567`'], ['`:.1%`', 'Prozent', '`0.256` ergibt `25.6%`'], ['`!r`', 'repr-Darstellung', '`f"{name!r}"`']]],
    ['h', 'Kontrollfluss'],
    ['code', 'python', `note = 2
if note == 1:
    text = "sehr gut"
elif note <= 3:
    text = "gut bis befriedigend"
else:
    text = "weniger gut"
status = "bestanden" if note <= 4 else "nicht bestanden"       # bedingter Ausdruck

for i in range(5):            # 0..4;  range(1, 10, 2) = 1,3,5,7,9
    if i == 3:
        continue              # nächste Runde
    print(i)
for i, wert in enumerate(["a", "b"], start=1):   # Index und Wert
    print(i, wert)
for a, b in zip([1, 2], ["x", "y"]):             # parallel
    print(a, b)

n = 0
while True:
    n += 1
    if n > 3:
        break
else:
    print("nur wenn die Schleife ohne break endet")

match note:                                       # Strukturelles Pattern Matching
    case 1 | 2: print("top")
    case int(x) if x > 4: print("durchgefallen")
    case _: print("mittel")`],
  ],
});
