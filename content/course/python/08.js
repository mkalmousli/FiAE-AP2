AP2.page('course-python-08', {
  b: 'course', g: 'Python', t: 'Python 8: Funktionen (Parameter, Rückgabe, Gültigkeitsbereich)',
  d: 'Eine **Funktion** ist ein benannter, wiederverwendbarer Codeblock. Man **definiert** sie einmal mit `def name(parameter):` und **ruft** sie beliebig oft auf. Über **Parameter** bekommt sie Eingaben, mit `return` liefert sie ein **Ergebnis** zurück. Funktionen zerlegen ein Problem in kleine, testbare Teile (Prinzip **"teile und herrsche"**, **DRY: Don\'t Repeat Yourself**). Variablen innerhalb einer Funktion sind **lokal**: Sie existieren nur während des Aufrufs.',
  m: '**Parameter = Platzhalter in der Definition, Argument = Wert beim Aufruf.** **return beendet die Funktion sofort; ohne return liefert sie None.** **Standardwerte: `def f(x, mal=2)`, nie veränderbare Standardwerte wie `[]`.** **Python übergibt Objektreferenzen: Listen können in der Funktion verändert werden, Zahlen und Strings nicht.**',
  cheat: [
    ['Definition', ['`def name(a, b):`', '`    return a + b`', 'Aufruf: `name(2, 3)`', 'Docstring: `"""Beschreibung"""`']],
    ['Parameter', ['positionell: `f(1, 2)`', 'Schlüsselwort: `f(b=2, a=1)`', 'Standardwert: `def f(a, b=0)`', 'beliebig viele: `*args`, `**kwargs`']],
    ['Rückgabe', ['`return wert`', 'mehrere: `return a, b` (Tupel)', 'ohne return: `None`', 'return beendet sofort']],
    ['Gültigkeit', ['lokal: in der Funktion', 'global: im Modul', '`global x` zum Ändern (vermeiden!)', 'besser: Parameter + return']],
  ],
  blocks: [
    ['h', 'Funktionen definieren und aufrufen'],
    ['code', 'python', `def brutto(netto, steuersatz=19):
    """Berechnet den Bruttopreis aus Nettopreis und Steuersatz in Prozent."""
    return netto * (1 + steuersatz / 100)

print(brutto(100))          # 119.0   (Standardwert 19 wird benutzt)
print(brutto(100, 7))       # 107.0
print(brutto(steuersatz=7, netto=50))   # Schlüsselwort-Argumente: Reihenfolge egal`],
    ['list', [
      '`def` leitet die Definition ein, danach Name, Klammern mit Parametern, Doppelpunkt, eingerückter Rumpf.',
      'Der **Docstring** (erste Zeile in dreifachen Anführungszeichen) beschreibt, was die Funktion tut. `help(brutto)` zeigt ihn an.',
      '`return` gibt den Wert an den **Aufrufer** zurück. Der Aufruf `brutto(100)` "wird" zum Ergebnis 119.0.',
    ]],
    ['h', 'return oder print?'],
    ['p', 'Ein häufiger Anfängerfehler: Die Funktion **gibt aus** (`print`), statt **zurückzugeben** (`return`). Dann kann der Aufrufer mit dem Ergebnis nicht weiterrechnen.'],
    ['codes', [
      ['python', `def summe_falsch(a, b):
    print(a + b)          # zeigt an, liefert aber None

def summe(a, b):
    return a + b          # liefert den Wert

x = summe_falsch(2, 3) * 2   # TypeError: None * 2
y = summe(2, 3) * 2          # 10`],
      ['java', `static int summe(int a, int b) {   // Rückgabetyp int
    return a + b;
}
static void gruss(String name) {   // void = keine Rückgabe
    System.out.println("Hallo " + name);
}`],
      ['csharp', `static int Summe(int a, int b) => a + b;   // Ausdruckskörper
static void Gruss(string name)
{
    Console.WriteLine("Hallo " + name);
}`],
    ]],
    ['h', 'Mehrere Rückgabewerte'],
    ['code', 'python', `def statistik(werte):
    return min(werte), max(werte), sum(werte) / len(werte)

kleinster, groesster, schnitt = statistik([4, 8, 6])
print(kleinster, groesster, schnitt)    # 4 8 6.0`],
    ['h', 'Lokale und globale Variablen'],
    ['code', 'python', `zaehler = 0               # global

def erhoehen():
    zaehler = 10          # NEUE lokale Variable, die globale bleibt 0
    print(zaehler)

def erhoehen_global():
    global zaehler        # erlaubt Schreiben auf die globale Variable
    zaehler += 1

erhoehen()                # 10
print(zaehler)            # 0
erhoehen_global()
print(zaehler)            # 1`],
    ['tip', 'Globale Variablen machen Programme schwer verständlich und testbar. Besser: Werte als **Parameter** hineingeben und mit **return** herausgeben.'],
    ['h', 'Parameterübergabe: Was passiert mit dem Argument?'],
    ['p', 'In Java und C# spricht man von **call by value** (Kopie des Wertes) und **call by reference** (Verweis auf die Variable, in C# mit `ref`). Python übergibt immer eine **Referenz auf das Objekt** ("call by object reference"). Die Wirkung hängt davon ab, ob das Objekt **veränderbar** ist:'],
    ['code', 'python', `def verdoppeln(zahl):
    zahl = zahl * 2          # neue lokale Bindung, Original unberührt

def anhaengen(liste):
    liste.append(99)         # verändert DASSELBE Listenobjekt

x = 5
verdoppeln(x)
print(x)                     # 5   (int ist unveränderbar)

l = [1, 2]
anhaengen(l)
print(l)                     # [1, 2, 99]  (Liste wurde verändert!)`],
    ['warn', '**Veränderbarer Standardwert:** `def neu(x, liste=[])` legt die Standardliste **einmal** an und teilt sie zwischen allen Aufrufen. Richtig: `def neu(x, liste=None):` und im Rumpf `if liste is None: liste = []`.'],
    ['h', 'Beliebig viele Argumente'],
    ['code', 'python', `def summe_alle(*zahlen):          # zahlen ist ein Tupel
    return sum(zahlen)

print(summe_alle(1, 2, 3, 4))     # 10

def profil(**angaben):            # angaben ist ein dict
    for k, v in angaben.items():
        print(k, "=", v)

profil(name="Max", ort="Ulm")`],
    ['h', 'Typ-Hinweise (Type Hints)'],
    ['p', 'Python ist **dynamisch typisiert**, man kann aber Typen **annotieren**. Der Interpreter prüft sie nicht, Werkzeuge wie mypy und die IDE aber schon. Das macht Code lesbarer, besonders bei Prüfungsaufgaben, die Typen aus dem UML-Diagramm vorgeben.'],
    ['code', 'python', `def pruefe_wert(wert: float, minimum: float = 0.05, maximum: float = 2.0) -> bool:
    return minimum <= wert <= maximum`],
    ['h', 'Funktionen gliedern ein Programm'],
    ['code', 'python', `def eingabe_zahl(text: str) -> float:
    while True:
        try:
            return float(input(text))
        except ValueError:
            print("Bitte eine Zahl eingeben.")

def kreisflaeche(radius: float) -> float:
    return 3.14159 * radius ** 2

def main():
    r = eingabe_zahl("Radius: ")
    print(f"Fläche: {kreisflaeche(r):.2f}")

if __name__ == "__main__":     # nur ausführen, wenn die Datei direkt gestartet wird
    main()`],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie eine Funktion `note(punkte)`, die nach dem IHK-Schlüssel die Note liefert (ab 92: 1, ab 81: 2, ab 67: 3, ab 50: 4, ab 30: 5, sonst 6). Testen Sie mit drei Aufrufen.', [['code', 'python', `def note(punkte: int) -> int:
    grenzen = [(92, 1), (81, 2), (67, 3), (50, 4), (30, 5)]
    for grenze, n in grenzen:
        if punkte >= grenze:
            return n
    return 6

print(note(95), note(81), note(10))   # 1 2 6`]], 4],
    ['qa', 'Schreiben Sie eine Funktion `ist_primzahl(n)` und geben Sie damit alle Primzahlen bis 50 aus.', [['code', 'python', `def ist_primzahl(n: int) -> bool:
    if n < 2:
        return False
    i = 2
    while i * i <= n:          # bis Wurzel(n) reicht
        if n % i == 0:
            return False
        i += 1
    return True

print([z for z in range(51) if ist_primzahl(z)])`]], 5],
    ['qa', 'Was ist der Unterschied zwischen Parameter und Argument?', ['Ein **Parameter** ist der Platzhalter in der Funktionsdefinition (`def f(x)`: x).', 'Ein **Argument** ist der konkrete Wert, der beim Aufruf übergeben wird (`f(5)`: 5).'], 2],
    ['quiz', [
      {q: 'Was liefert eine Funktion ohne return?', o: ['None', '0', 'Einen leeren String', 'Fehler'], a: 0, e: 'Implizit None.'},
      {q: 'Was gibt x aus? def f(a): a = 10 / x = 1; f(x); print(x)', o: ['1', '10', 'None', 'Fehler'], a: 0, e: 'Neue lokale Bindung.'},
      {q: 'Was gibt l aus? def f(a): a.append(3) / l = [1]; f(l); print(l)', o: ['[1, 3]', '[1]', '[3]', 'Fehler'], a: 0, e: 'Listen sind veränderbar, gleiche Referenz.'},
      {q: 'Welche Definition hat einen Standardwert?', o: ['def f(a, b=2):', 'def f(a=, b):', 'def f(a; b=2):', 'def f(a, 2):'], a: 0, e: 'Parameter mit Standardwert stehen am Ende.'},
      {q: 'Was bedeutet *args?', o: ['Beliebig viele Positionsargumente als Tupel', 'Multiplikation', 'Ein Zeiger', 'Pflichtparameter'], a: 0, e: '**kwargs = Schlüsselwortargumente als dict.'},
    ]],
    ['see', ['course-python-07', 'course-python-09', 'eua-funktionen']],
  ],
});
