AP2.add('course-python', [
  ['h', 'Module, Pakete, Umgebungen'],
  ['code', 'text', `python -m venv .venv                 # virtuelle Umgebung anlegen
source .venv/bin/activate            # Linux/macOS  (Windows: .venv\\Scripts\\activate)
pip install requests pytest          # Pakete aus PyPI
pip freeze > requirements.txt        # Abhängigkeiten festhalten
pip install -r requirements.txt
python programm.py`],
  ['code', 'python', `import math                      # Modul
from datetime import date as d   # einzelnen Namen mit Alias
import os.path

# Datei mathe_tools.py ist selbst ein Modul. Ein Ordner mit __init__.py ist ein Paket.
def main(): print("Start")
if __name__ == "__main__":         # läuft nur beim direkten Start, nicht beim Import
    main()`],
  ['h', 'Wichtige Standardbibliothek'],
  ['table', ['Modul', 'Zweck', 'Beispiel'], [
    ['`collections`', 'Spezielle Container', '`Counter("hallo")`, `defaultdict(list)`, `deque`, `namedtuple`'],
    ['`itertools`', 'Iterator-Bausteine', '`permutations`, `combinations`, `product`, `chain`, `groupby`'],
    ['`functools`', 'Funktionswerkzeuge', '`lru_cache`, `partial`, `reduce`, `wraps`'],
    ['`datetime`', 'Datum und Zeit', '`datetime.now()`, `timedelta(days=7)`, `strftime("%d.%m.%Y")`'],
    ['`re`', 'Reguläre Ausdrücke', '`re.findall(r"\\d+", text)`, `re.sub`, `re.match`'],
    ['`json`, `csv`', 'Datenformate', '`json.loads`, `csv.DictReader`'],
    ['`pathlib`, `os`, `shutil`', 'Dateisystem', '`Path.glob("*.py")`'],
    ['`argparse`', 'Kommandozeile', '`parser.add_argument("--n", type=int)`'],
    ['`logging`', 'Protokolle', '`logging.info("..")` statt `print`'],
    ['`random`, `statistics`, `math`', 'Zahlen', '`random.choice`, `statistics.mean`'],
    ['`sqlite3`, `urllib`, `http.server`', 'DB, Web', 'SQLite ohne Server'],
    ['`threading`, `multiprocessing`, `asyncio`', 'Nebenläufigkeit', 'siehe unten'],
  ]],
  ['code', 'python', `from collections import Counter, defaultdict
print(Counter("hallo").most_common(2))        # [('l', 2), ('h', 1)]
gruppen = defaultdict(list)
for w in ["ab", "cd", "abc"]: gruppen[len(w)].append(w)   # {2: ['ab','cd'], 3: ['abc']}
import re
print(re.findall(r"[\\w.]+@[\\w.]+", "mail a.b@x.de und c@y.com"))
from datetime import datetime, timedelta
print((datetime(2026, 5, 31) + timedelta(days=30)).strftime("%d.%m.%Y"))   # 30.06.2026`],
  ['h', 'Typ-Hinweise (Type Hints)'],
  ['code', 'python', `from typing import Optional, Callable, Iterable

def mittel(werte: list[float]) -> float:           # Hinweise für Leser und Werkzeuge, kein Zwang zur Laufzeit
    return sum(werte) / len(werte)
def finde(name: str) -> Optional[int]: ...          # int oder None   (kurz: int | None ab 3.10)
def anwenden(f: Callable[[int], int], xs: Iterable[int]) -> list[int]: return [f(x) for x in xs]
# Prüfung mit externen Werkzeugen: mypy, pyright`],
  ['h', 'Nebenläufigkeit'],
  ['table', ['Ansatz', 'Geeignet für', 'Hinweis'], [['`threading`', '**I/O-lastig** (Netz, Dateien)', 'Der **GIL** (Global Interpreter Lock) lässt in CPython nur einen Thread Python-Code ausführen: keine Rechenbeschleunigung'], ['`multiprocessing`', '**CPU-lastig** (Berechnungen)', 'Eigene Prozesse, kein gemeinsamer Speicher'], ['`asyncio`', 'Viele gleichzeitige I/O-Aufgaben', 'Kooperativ mit `async` / `await`, ein Thread']]],
  ['code', 'python', `import asyncio
async def hole(n):
    await asyncio.sleep(1)           # gibt die Kontrolle ab, andere Aufgaben laufen
    return n * 2
async def main():
    print(await asyncio.gather(hole(1), hole(2), hole(3)))   # alle drei zusammen ~1 s
asyncio.run(main())`],
  ['h', 'Testen'],
  ['code', 'python', `# test_konto.py   Start mit:  pytest
import pytest
from konto import Konto

def test_einzahlen():
    k = Konto("Anna"); k.einzahlen(50)
    assert k.stand == 50                      # einfache assert-Anweisung

def test_negativ_wirft_fehler():
    with pytest.raises(ValueError):
        Konto("Anna").einzahlen(-1)

@pytest.mark.parametrize("a,b,erg", [(1, 2, 3), (0, 0, 0), (-1, 1, 0)])
def test_summe(a, b, erg): assert a + b == erg`],
]);
