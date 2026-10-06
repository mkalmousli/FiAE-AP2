AP2.page('course-python-10', {
  b: 'course', g: 'Python', t: 'Python 10: Fehlerbehandlung mit Exceptions',
  d: 'Eine **Exception** (Ausnahme) ist ein Laufzeitfehler, der den normalen Ablauf unterbricht, zum Beispiel eine Division durch 0, eine fehlende Datei oder eine ungültige Eingabe. Mit `try ... except` fängt man sie ab und reagiert kontrolliert, statt das Programm abstürzen zu lassen. `else` läuft, wenn kein Fehler auftrat, `finally` läuft **immer** (Aufräumen). Mit `raise` löst man selbst eine Exception aus, zum Beispiel bei ungültigen Parametern. Eigene Fehlerklassen erbt man von `Exception`.',
  m: '**try = riskanter Code, except = Reaktion, else = Erfolg, finally = immer.** **Spezifische Exceptions fangen (ValueError), nie blind `except:`.** **Fehler früh melden (raise), spät behandeln (dort, wo man sinnvoll reagieren kann).** **Python-Stil EAFP: erst versuchen, Fehler abfangen.**',
  cheat: [
    ['Aufbau', ['`try:` riskanter Code', '`except ValueError as e:`', '`else:` nur ohne Fehler', '`finally:` immer']],
    ['Häufige Exceptions', ['`ValueError`: `int("abc")`', '`ZeroDivisionError`', '`IndexError`, `KeyError`', '`FileNotFoundError`, `TypeError`']],
    ['Auslösen', ['`raise ValueError("Text")`', '`raise` (erneut werfen)', '`class MeinFehler(Exception): pass`', '`assert bedingung, "Text"` (Debug)']],
    ['Gegenstück', ['Java/C#: `try/catch/finally`', 'Java: `throw new ...`', 'Java: checked Exceptions mit `throws`', 'C#: `using` statt finally']],
  ],
  blocks: [
    ['h', 'Ohne Fehlerbehandlung'],
    ['code', 'text', `>>> zahl = int(input("Zahl: "))
Zahl: zwölf
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid literal for int() with base 10: 'zwölf'`],
    ['p', 'Das Programm bricht ab. Für den Benutzer ist das ärgerlich, für ein Serverprogramm katastrophal. Deshalb fängt man erwartbare Fehler ab.'],
    ['h', 'try, except, else, finally'],
    ['code', 'python', `try:
    a = int(input("Zähler: "))
    b = int(input("Nenner: "))
    ergebnis = a / b
except ValueError:
    print("Bitte nur ganze Zahlen eingeben.")
except ZeroDivisionError:
    print("Division durch 0 ist nicht erlaubt.")
else:
    print("Ergebnis:", ergebnis)     # nur wenn kein Fehler
finally:
    print("Berechnung beendet.")     # läuft IMMER, auch nach Fehlern`],
    ['steps', [
      'Python führt den **try**-Block aus.',
      'Tritt eine Exception auf, springt es sofort zum **ersten passenden except**. Der Rest des try-Blocks wird übersprungen.',
      'Passt kein except, wird die Exception **weitergereicht** an den Aufrufer (und bricht ganz oben das Programm ab).',
      'Gab es keinen Fehler, läuft **else**.',
      '**finally** läuft in jedem Fall, zum Beispiel um Dateien oder Verbindungen zu schließen.',
    ]],
    ['h', 'Eingabe wiederholen, bis sie gültig ist'],
    ['code', 'python', `def lies_ganzzahl(text, minimum, maximum):
    while True:
        try:
            wert = int(input(text))
            if minimum <= wert <= maximum:
                return wert
            print(f"Bitte zwischen {minimum} und {maximum}.")
        except ValueError:
            print("Das war keine ganze Zahl.")

menue = lies_ganzzahl("Ihre Wahl (0-4): ", 0, 4)`],
    ['h', 'Exceptions selbst auslösen'],
    ['code', 'python', `class Konto:
    def __init__(self, inhaber):
        self.inhaber = inhaber
        self.__saldo = 0.0

    def abheben(self, betrag):
        if betrag <= 0:
            raise ValueError("Betrag muss positiv sein")
        if betrag > self.__saldo:
            raise NichtGedecktFehler(f"Saldo {self.__saldo} reicht nicht für {betrag}")
        self.__saldo -= betrag

class NichtGedecktFehler(Exception):     # eigene Exception-Klasse
    pass

k = Konto("Max")
try:
    k.abheben(50)
except NichtGedecktFehler as e:
    print("Abgelehnt:", e)               # e enthält die Meldung`],
    ['h', 'Die Exception-Hierarchie (Ausschnitt)'],
    ['diagram', AP2.dg.tree({t: 'BaseException', c: [{t: 'Exception', c: [{t: 'ValueError'}, {t: 'ArithmeticError', c: [{t: 'ZeroDivisionError'}]}, {t: 'LookupError', c: [{t: 'IndexError'}, {t: 'KeyError'}]}, {t: 'OSError', c: [{t: 'FileNotFoundError'}]}, {t: 'TypeError'}]}, {t: 'KeyboardInterrupt'}]}, {k: 'round', w: 120, h: 34, gx: 130, gy: 64, cap: 'Ein except fängt die genannte Klasse und alle Unterklassen: except LookupError fängt IndexError und KeyError.'})],
    ['warn', '`except:` ohne Klasse oder `except Exception:` fängt **alles**, auch Programmierfehler wie Tippfehler in Variablennamen (NameError). Fehler werden so versteckt. Fange nur die Exceptions, die du **erwartest** und sinnvoll behandeln kannst.'],
    ['h', 'Vergleich mit Java und C#'],
    ['codes', [
      ['python', `try:
    wert = int(text)
except ValueError as e:
    print("Fehler:", e)
finally:
    print("fertig")`],
      ['java', `try {
    int wert = Integer.parseInt(text);
} catch (NumberFormatException e) {
    System.out.println("Fehler: " + e.getMessage());
} finally {
    System.out.println("fertig");
}`],
      ['csharp', `try
{
    int wert = int.Parse(text);
}
catch (FormatException e)
{
    Console.WriteLine("Fehler: " + e.Message);
}
finally
{
    Console.WriteLine("fertig");
}
// Alternative ohne Exception: int.TryParse(text, out int wert)`],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie eine Funktion `sicher_teilen(a, b)`, die das Ergebnis zurückgibt oder bei Division durch 0 `None` liefert und eine Meldung ausgibt.', [['code', 'python', `def sicher_teilen(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("Division durch 0!")
        return None`]], 3],
    ['qa', 'Eine Funktion `setze_alter(alter)` soll bei Werten unter 0 oder über 150 einen ValueError auslösen. Schreiben Sie Funktion und Aufruf mit Fehlerbehandlung.', [['code', 'python', `def setze_alter(alter):
    if not 0 <= alter <= 150:
        raise ValueError(f"Ungültiges Alter: {alter}")
    return alter

try:
    setze_alter(200)
except ValueError as e:
    print(e)          # Ungültiges Alter: 200`]], 4],
    ['qa', 'Wann wird der finally-Block ausgeführt?', ['**Immer**: nach erfolgreichem try, nach einem behandelten Fehler, nach einem nicht behandelten Fehler (bevor er weitergereicht wird) und sogar bei `return` im try-Block. Deshalb gehört dorthin Aufräumcode (Datei schließen, Verbindung trennen).'], 2],
    ['quiz', [
      {q: 'Welche Exception wirft int("x")?', o: ['ValueError', 'TypeError', 'IndexError', 'SyntaxError'], a: 0, e: 'Richtiger Typ (str), falscher Wert.'},
      {q: 'Wann läuft der else-Block eines try?', o: ['Wenn im try kein Fehler auftrat', 'Immer', 'Nur nach einem Fehler', 'Nie'], a: 0, e: 'finally läuft immer.'},
      {q: 'Wie löst man in Python selbst einen Fehler aus?', o: ['raise ValueError("...")', 'throw ValueError("...")', 'error("...")', 'except ValueError'], a: 0, e: 'throw ist Java/C#.'},
      {q: 'Was fängt except LookupError?', o: ['IndexError und KeyError', 'Nur LookupError', 'Alle Fehler', 'ValueError'], a: 0, e: 'Unterklassen werden mitgefangen.'},
    ]],
    ['see', ['course-python-09', 'course-python-11', 'eua-exceptions']],
  ],
});
