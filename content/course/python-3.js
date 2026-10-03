AP2.add('course-python', [
  ['h', 'Objektorientierung'],
  ['code', 'python', `class Konto:
    zinssatz = 0.01                              # Klassenattribut (für alle Instanzen)

    def __init__(self, inhaber, stand=0):        # Konstruktor; self = die Instanz
        self.inhaber = inhaber                   # Instanzattribute
        self._stand = stand                      # Konvention: _name = "intern", __name = Namensverschleierung

    @property                                    # Getter: Zugriff wie ein Attribut
    def stand(self): return self._stand
    @stand.setter
    def stand(self, wert):
        if wert < 0: raise ValueError("Stand darf nicht negativ sein")
        self._stand = wert

    def einzahlen(self, betrag):
        if betrag <= 0: raise ValueError("Betrag muss positiv sein")
        self._stand += betrag

    @classmethod
    def mit_bonus(cls, inhaber): return cls(inhaber, 10)       # Alternative Konstruktoren
    @staticmethod
    def gueltig(betrag): return betrag > 0                      # braucht weder self noch cls

    def __str__(self): return f"{self.inhaber}: {self._stand:.2f}"        # für print()
    def __repr__(self): return f"Konto({self.inhaber!r}, {self._stand})"  # für Entwickler
    def __eq__(self, o): return isinstance(o, Konto) and self.inhaber == o.inhaber
    def __lt__(self, o): return self._stand < o._stand                    # ermöglicht sorted()
    def __len__(self): return 1`],
  ['code', 'python', `class Sparkonto(Konto):                   # Vererbung
    def __init__(self, inhaber, stand=0, zins=0.02):
        super().__init__(inhaber, stand)     # Basisklasse initialisieren
        self.zins = zins
    def verzinsen(self): self._stand *= 1 + self.zins
    def __str__(self): return "Spar-" + super().__str__()    # Methode überschreiben (Polymorphie)

from abc import ABC, abstractmethod
class Form(ABC):                              # Abstrakte Klasse: nicht instanziierbar
    @abstractmethod
    def flaeche(self): ...
class Kreis(Form):
    def __init__(self, r): self.r = r
    def flaeche(self): return 3.14159 * self.r ** 2

from dataclasses import dataclass, field
@dataclass(order=True, frozen=False)          # erzeugt __init__, __repr__, __eq__ automatisch
class Punkt:
    x: float
    y: float = 0.0
    tags: list = field(default_factory=list)   # veränderbare Defaults korrekt`],
  ['table', ['Konzept', 'Python', 'Anmerkung'], [['Kapselung', '`_x` (Konvention), `@property`', 'Python erzwingt Zugriffsschutz **nicht**'], ['Vererbung', '`class B(A)`, mehrere Basisklassen möglich', 'Reihenfolge: **MRO** (`B.__mro__`)'], ['Polymorphie', 'Duck Typing: "Wenn es quakt wie eine Ente ..."', 'Es zählt die Methode, nicht der Typ'], ['Interface', '`ABC` + `@abstractmethod` oder `typing.Protocol`', ''], ['Komposition', 'Objekt als Attribut', 'Oft besser als tiefe Vererbung (**has-a** statt **is-a**)'], ['Spezielle Methoden', '`__init__`, `__str__`, `__eq__`, `__iter__`, `__enter__`', '**Dunder** (double underscore) genannt']]],
  ['h', 'Fehlerbehandlung'],
  ['code', 'python', `class MeinFehler(Exception):                 # eigene Ausnahme
    pass

def teile(a, b):
    try:
        return a / b
    except ZeroDivisionError as e:           # konkret zuerst, Exception zuletzt
        print("Division durch 0:", e); return None
    except (TypeError, ValueError):
        raise                                  # erneut auslösen
    else:
        print("nur ohne Fehler")
    finally:
        print("immer (Aufräumen)")

def pruefe(x):
    if x < 0: raise MeinFehler("negativ")      # Fehler auslösen
try: pruefe(-1)
except MeinFehler as e: print(e)
try: int("abc")
except ValueError as e: raise RuntimeError("Eingabe ungültig") from e   # Ursache behalten`],
  ['list', ['**EAFP** ("easier to ask forgiveness than permission"): erst versuchen, Fehler abfangen. **LBYL** ("look before you leap"): erst prüfen. Python bevorzugt EAFP.', 'Nie ein nacktes `except:` verwenden (fängt auch `KeyboardInterrupt`).', 'Fehler nur dort abfangen, wo man sie **behandeln** kann.', 'Häufige Typen: `ValueError`, `TypeError`, `KeyError`, `IndexError`, `FileNotFoundError`, `ZeroDivisionError`, `AttributeError`.']],
  ['h', 'Dateien, Kontextmanager, JSON'],
  ['code', 'python', `from pathlib import Path
with open("daten.txt", "w", encoding="utf-8") as f:       # schließt die Datei automatisch
    f.write("Zeile 1\\nZeile 2\\n")
with open("daten.txt", encoding="utf-8") as f:
    for zeile in f:                                          # Zeile für Zeile (speicherschonend)
        print(zeile.rstrip())
p = Path("daten.txt"); print(p.exists(), p.suffix, p.read_text(encoding="utf-8"))

import json, csv
text = json.dumps({"name": "Anna", "liste": [1, 2]}, indent=2, ensure_ascii=False)
objekt = json.loads(text)
with open("tabelle.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f): print(row["name"])

class Timer:                                                # eigener Kontextmanager
    def __enter__(self): self.t = time.time(); return self
    def __exit__(self, typ, wert, tb): print(time.time() - self.t); return False`],
  ['table', ['Modus', 'Bedeutung'], [['`"r"`', 'lesen (Standard), Fehler wenn die Datei fehlt'], ['`"w"`', 'schreiben, **überschreibt** vorhandenen Inhalt'], ['`"a"`', 'anhängen'], ['`"x"`', 'neu anlegen, Fehler wenn sie existiert'], ['`"b"`', 'binär, zum Beispiel `"rb"`']]],
]);
