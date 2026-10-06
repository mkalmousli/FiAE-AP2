AP2.page('course-python-15', {
  b: 'course', g: 'Python', t: 'Python 15: Module, Tests und eine komplette Prüfungsaufgabe',
  d: 'Größere Programme verteilt man auf **Module** (eine `.py`-Datei) und **Pakete** (Ordner mit Modulen) und bindet sie mit `import` ein. Fremde Bibliotheken installiert man mit **pip**, am besten in einer **virtuellen Umgebung** (venv). Die Korrektheit sichert man mit **Unit-Tests** (`unittest` oder `pytest`): kleine automatische Tests, die einzelne Funktionen mit festen Eingaben aufrufen und das Ergebnis mit dem erwarteten Wert vergleichen. Zum Abschluss löst dieses Kapitel eine typische Prüfungsaufgabe komplett.',
  m: '**`import modul` / `from modul import name`.** **`if __name__ == "__main__":` = nur beim direkten Start ausführen.** **venv + pip install + requirements.txt.** **Test = Arrange (vorbereiten), Act (ausführen), Assert (prüfen).** **Normalfall, Grenzwerte und Fehlerfall testen.**',
  cheat: [
    ['Import', ['`import math` -> `math.sqrt(2)`', '`from math import sqrt`', '`import datetime as dt`', 'eigenes Modul: `import lager` (lager.py)']],
    ['Standardbibliothek', ['`math`, `random`, `statistics`', '`datetime`, `time`', '`os`, `pathlib`, `sys`', '`csv`, `json`, `re`, `collections`']],
    ['Umgebung', ['`python -m venv .venv`', '`source .venv/bin/activate`', '`pip install requests`', '`pip freeze > requirements.txt`']],
    ['Tests', ['`unittest.TestCase`, `assertEqual`', '`assertRaises(ValueError)`', '`pytest`: einfache `assert`', 'Grenzwerte, Äquivalenzklassen']],
  ],
  blocks: [
    ['h', 'Module und Pakete'],
    ['code', 'python', `# datei: rechnung.py
MWST = 0.19

def brutto(netto):
    return round(netto * (1 + MWST), 2)

if __name__ == "__main__":       # läuft nur bei "python rechnung.py", nicht beim Import
    print(brutto(100))`],
    ['code', 'python', `# datei: main.py
import rechnung
from datetime import date, timedelta
import math, random, statistics

print(rechnung.brutto(50))                     # 59.5
print(date.today() + timedelta(days=14))       # Datum in 14 Tagen (Zahlungsziel)
print(math.ceil(4.2), math.floor(4.8))         # 5 4  (aufrunden: "je angefangenem km")
print(random.randint(1, 6))                    # Würfel
print(statistics.mean([2, 3, 4]), statistics.median([1, 9, 3]))`],
    ['h', 'Datum und Uhrzeit'],
    ['code', 'python', `from datetime import datetime, date

jetzt = datetime.now()
print(jetzt.strftime("%d.%m.%Y %H:%M"))          # 06.10.2026 14:30
geburt = datetime.strptime("06.07.1989", "%d.%m.%Y").date()
alter = (date.today() - geburt).days // 365
print(alter)
print(date(2026, 11, 11).weekday())              # 0 = Montag ... 2 = Mittwoch`],
    ['h', 'Virtuelle Umgebung und pip'],
    ['code', 'text', `python -m venv .venv              # Umgebung anlegen
source .venv/bin/activate         # aktivieren (Windows: .venv\\Scripts\\activate)
pip install requests pytest       # Pakete installieren
pip freeze > requirements.txt     # Abhängigkeiten festhalten
pip install -r requirements.txt   # auf anderem Rechner wiederherstellen`],
    ['p', 'Jedes Projekt bekommt so seine eigenen Paketversionen; Projekte stören sich nicht gegenseitig. Das entspricht Maven/Gradle (Java) bzw. NuGet (C#).'],
    ['h', 'Unit-Tests mit unittest'],
    ['code', 'python', `# datei: test_rechnung.py
import unittest
from rechnung import brutto

def note(punkte):
    if not 0 <= punkte <= 100:
        raise ValueError("Punkte 0-100")
    for grenze, n in [(92, 1), (81, 2), (67, 3), (50, 4), (30, 5)]:
        if punkte >= grenze:
            return n
    return 6

class TestNote(unittest.TestCase):
    def test_normalfall(self):
        self.assertEqual(note(85), 2)

    def test_grenzwerte(self):                # genau an und neben der Grenze
        self.assertEqual(note(92), 1)
        self.assertEqual(note(91), 2)
        self.assertEqual(note(0), 6)
        self.assertEqual(note(100), 1)

    def test_ungueltig(self):
        with self.assertRaises(ValueError):
            note(101)

    def test_brutto(self):
        self.assertAlmostEqual(brutto(100), 119.0)   # Gleitkomma: AlmostEqual

if __name__ == "__main__":
    unittest.main()`],
    ['code', 'python', `# dasselbe mit pytest (Datei test_note.py, Start: pytest)
import pytest

def test_grenzen():
    assert note(92) == 1
    assert note(91) == 2

def test_fehler():
    with pytest.raises(ValueError):
        note(-1)`],
    ['tip', 'Gute Testfälle findet man mit **Äquivalenzklassen** (ein Vertreter je Bereich: gültig, zu klein, zu groß) und **Grenzwertanalyse** (genau auf und direkt neben jeder Grenze). Genau das wird in der Prüfung als "Testvektor" oder "Testfalltabelle" verlangt.'],
    ['h', 'Komplette Prüfungsaufgabe: Akku-Messreihe'],
    ['p', 'Aufgabe (nach Winter 2024/25): Implementieren Sie `Messwert` (abstrakt, `pruefeWert`), `Strom` (gültig 0,05 bis 2,0 A) und `Messreihe` (Liste von Messwerten, Intervall in ms, Datum, Anzahl Fehler). Der Konstruktor von `Messreihe` setzt das aktuelle Datum und entfernt ungültige Werte. `berechneKapazitaet()` liefert die Kapazität in mAh.'],
    ['code', 'python', `from abc import ABC, abstractmethod
from datetime import date

class Messwert(ABC):
    def __init__(self, wert: float):
        self._wert = wert                       # protected (#)
    @abstractmethod
    def pruefeWert(self) -> bool: ...
    def getWert(self) -> float:
        return self._wert

class Strom(Messwert):
    def pruefeWert(self) -> bool:
        return 0.05 <= self._wert <= 2.0        # Grenzen eingeschlossen

class Messreihe:
    def __init__(self, messwerte: list, intervall: int):
        self.__messwertliste = messwerte
        self.__datum = date.today()
        self.__intervall = intervall            # ms
        self.__anzahlFehler = self.__bereinigeMesswertliste()

    def __bereinigeMesswertliste(self) -> int:  # private Methode (-)
        vorher = len(self.__messwertliste)
        self.__messwertliste = [m for m in self.__messwertliste if m.pruefeWert()]
        return vorher - len(self.__messwertliste)

    def berechneKapazitaet(self) -> float:
        summe = sum(m.getWert() * self.__intervall for m in self.__messwertliste)   # A * ms
        return summe / 3600                     # A*ms -> mAh

    def getAnzahlFehler(self) -> int:
        return self.__anzahlFehler

reihe = Messreihe([Strom(1.0), Strom(2.5), Strom(1.0), Strom(0.01)], intervall=1000)
print(reihe.getAnzahlFehler())                  # 2
print(round(reihe.berechneKapazitaet(), 3))     # 2 A*s = 0.556 mAh`],
    ['code', 'python', `import unittest

class TestMessreihe(unittest.TestCase):
    def test_grenzen_strom(self):
        self.assertTrue(Strom(0.05).pruefeWert())
        self.assertTrue(Strom(2.0).pruefeWert())
        self.assertFalse(Strom(0.049).pruefeWert())
        self.assertFalse(Strom(2.01).pruefeWert())

    def test_bereinigen(self):
        r = Messreihe([Strom(3.0), Strom(3.0), Strom(1.0)], 500)   # zwei Fehler hintereinander!
        self.assertEqual(r.getAnzahlFehler(), 2)

    def test_kapazitaet(self):
        r = Messreihe([Strom(1.8)] * 3600, 1000)                   # 1,8 A eine Stunde lang
        self.assertAlmostEqual(r.berechneKapazitaet(), 1800.0)     # 1800 mAh`],
    ['note', 'Der Test `test_bereinigen` mit **zwei ungültigen Werten hintereinander** findet genau den Fehler der offiziellen Lösung (Löschen in einer Vorwärtsschleife überspringt Elemente). Die Comprehension oben vermeidet ihn.'],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie drei sinnvolle Unit-Tests für eine Funktion `versandkosten(wert)` (unter 20 €: 4,95; 20 bis unter 50: 2,95; ab 50: 0).', [['code', 'python', `class TestVersand(unittest.TestCase):
    def test_unter_20(self):
        self.assertEqual(versandkosten(19.99), 4.95)
    def test_grenze_20(self):
        self.assertEqual(versandkosten(20.00), 2.95)
    def test_ab_50(self):
        self.assertEqual(versandkosten(50.00), 0.0)`], 'Grenzwerte 19,99/20,00 und 49,99/50,00 sind die wichtigsten Fälle.'], 4],
    ['quiz', [
      {q: 'Wozu dient if __name__ == "__main__":?', o: ['Code nur beim direkten Start ausführen, nicht beim Import', 'Um main() zu definieren', 'Für Unit-Tests vorgeschrieben', 'Um Fehler abzufangen'], a: 0, e: 'Beim Import ist __name__ der Modulname.'},
      {q: 'Welche Methode prüft in unittest, ob eine Exception auftritt?', o: ['assertRaises', 'assertError', 'assertException', 'expect'], a: 0, e: 'Als Kontextmanager mit with.'},
      {q: 'Wofür eine virtuelle Umgebung?', o: ['Projektabhängige Paketversionen isolieren', 'Code schneller ausführen', 'Code verschlüsseln', 'Python installieren'], a: 0, e: 'venv.'},
      {q: 'Warum assertAlmostEqual bei Kommazahlen?', o: ['Gleitkommazahlen sind ungenau (0.1 + 0.2 != 0.3)', 'Weil assertEqual nur für Strings geht', 'Wegen der Rundung von int', 'Es ist schneller'], a: 0, e: 'Binärdarstellung.'},
    ]],
    ['see', ['course-python-14', 'eua-unittest', 'eua-testfaelle', 'eua-umlcode']],
  ],
});
