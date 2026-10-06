AP2.page('course-python-01', {
  b: 'course', g: 'Python', t: 'Python 1: Einstieg und erstes Programm',
  d: 'Ein **Programm** ist eine Folge von **Anweisungen**, die der Computer der Reihe nach ausführt. **Python** ist eine **interpretierte** Sprache: Der **Interpreter** liest den Quelltext Zeile für Zeile, übersetzt ihn in Bytecode und führt ihn sofort aus. Es gibt keinen separaten Kompilierschritt wie bei Java oder C#.',
  m: '**Python = Einrückung statt Klammern.** Ein Block (zum Beispiel der Inhalt eines `if`) wird mit **4 Leerzeichen** eingerückt. **Groß-/Kleinschreibung zählt:** `Name` und `name` sind zwei verschiedene Variablen. **Ein Programm läuft von oben nach unten.**',
  cheat: [
    ['Starten', ['Datei `hallo.py` anlegen', 'Terminal: `python hallo.py` (Windows: `py hallo.py`)', 'Interaktiv: `python` und dann Befehle tippen', 'Beenden der Konsole: `exit()`']],
    ['Ausgabe', ['`print("Hallo")`', '`print("a", "b")` ergibt `a b`', '`print("a", end="")` ohne Zeilenumbruch', '`print("a", "b", sep="-")` ergibt `a-b`']],
    ['Eingabe', ['`name = input("Name: ")`', '`input` liefert **immer einen String**', 'Zahl: `int(input(...))` oder `float(input(...))`']],
    ['Kommentare', ['`# einzeilig`', '`"""mehrzeilig / Docstring"""`', 'Kommentare erklären das **Warum**, nicht das Was']],
  ],
  blocks: [
    ['h', 'Was passiert, wenn ein Programm läuft?'],
    ['p', 'Ein Computer versteht nur **Maschinencode** (Nullen und Einsen). Menschen schreiben aber **Quelltext** in einer Programmiersprache. Damit der Computer den Quelltext ausführen kann, braucht man ein Übersetzungsprogramm. Es gibt zwei Grundarten:'],
    ['table', ['Art', 'Wie funktioniert es?', 'Beispiele', 'Vorteil / Nachteil'], [
      ['**Compiler**', 'Übersetzt das **ganze Programm vorher** in eine ausführbare Datei. Fehler werden vor dem Start gemeldet.', 'C, C++, (Java, C# über Bytecode)', 'Schnell bei der Ausführung, aber erst nach dem Übersetzen startbar'],
      ['**Interpreter**', 'Liest und führt das Programm **Anweisung für Anweisung** aus.', 'Python, JavaScript, PHP', 'Sofort startbar, gut zum Ausprobieren, aber langsamer'],
      ['**Mischform (JIT)**', 'Erst Bytecode, dann zur Laufzeit in Maschinencode (Just-in-Time).', 'Java (JVM), C# (.NET CLR)', 'Plattformunabhängig und trotzdem schnell'],
    ]],
    ['diagram', AP2.dg.flow(['hallo.py (Quelltext)', 'Python-Interpreter', 'Bytecode (.pyc)', 'Python Virtual Machine', 'Ausgabe'], {w: 760, h: 110, keep: 640, styles: ['plain', 'accent', 'soft', 'solid', 'plain'], cap: 'So läuft ein Python-Programm: Der Interpreter erzeugt intern Bytecode und führt ihn sofort aus.'})],
    ['h', 'Das erste Programm'],
    ['p', 'Lege eine Datei `hallo.py` an. Die Endung `.py` zeigt, dass es eine Python-Datei ist. Schreibe hinein:'],
    ['code', 'python', `# Mein erstes Programm
print("Hallo Welt!")
print("Ich lerne Python.")
print(3 + 4)          # print kann auch Rechenergebnisse ausgeben: 7`],
    ['p', 'Starte es im Terminal mit `python hallo.py`. Die Ausgabe ist:'],
    ['code', 'text', `Hallo Welt!
Ich lerne Python.
7`],
    ['list', [
      '`print(...)` ist eine **Funktion**: Sie bekommt in Klammern etwas übergeben (ein **Argument**) und gibt es auf dem Bildschirm aus.',
      'Text steht in **Anführungszeichen** (`"..."` oder `\'...\'`). So weiß Python: Das ist Text (ein **String**) und kein Befehl.',
      'Alles hinter `#` ist ein **Kommentar**. Python ignoriert es. Kommentare sind für Menschen.',
      'Jede Zeile ist eine **Anweisung**. Ein Semikolon `;` am Ende braucht man in Python **nicht**.',
    ]],
    ['h', 'Eingabe vom Benutzer'],
    ['code', 'python', `name = input("Wie heißt du? ")       # Programm wartet, bis der Benutzer Enter drückt
print("Hallo", name)

alter = int(input("Wie alt bist du? "))   # input liefert Text, int(...) macht eine Zahl daraus
print("Nächstes Jahr bist du", alter + 1)`],
    ['warn', '`input()` liefert **immer einen String**, auch wenn der Benutzer `21` eintippt. `"21" + 1` erzeugt einen **TypeError**. Darum zuerst umwandeln: `int("21")` ergibt die Zahl `21`. Tippt der Benutzer Buchstaben, wirft `int("abc")` einen **ValueError** (siehe Lektion Fehlerbehandlung).'],
    ['h', 'Einrückung: die wichtigste Python-Regel'],
    ['p', 'Viele Sprachen (Java, C#) fassen Anweisungen mit **geschweiften Klammern** `{ }` zu Blöcken zusammen. Python benutzt dafür die **Einrückung**. Alles, was gleich weit eingerückt ist, gehört zum selben Block. Ein Block beginnt immer nach einem **Doppelpunkt** `:`.'],
    ['codes', [
      ['python', `alter = 20
if alter >= 18:
    print("volljährig")      # gehört zum if (eingerückt)
    print("darf wählen")     # gehört auch zum if
print("Ende")                # nicht eingerückt: läuft immer`],
      ['java', `int alter = 20;
if (alter >= 18) {
    System.out.println("volljährig");
    System.out.println("darf wählen");
}
System.out.println("Ende");`],
    ]],
    ['warn', 'Mischt man **Tabs und Leerzeichen** oder rückt falsch ein, meldet Python `IndentationError`. Nutze immer **4 Leerzeichen** (jeder Editor macht das bei Tab automatisch).'],
    ['h', 'Fehlermeldungen lesen'],
    ['p', 'Fehler sind normal. Wichtig ist, die Meldung zu **lesen**. Python zeigt einen **Traceback**: Die **letzte Zeile** nennt die Fehlerart, darüber steht die **Zeilennummer**.'],
    ['code', 'text', `Traceback (most recent call last):
  File "hallo.py", line 3, in <module>
    print("Alter: " + alter)
TypeError: can only concatenate str (not "int") to str`],
    ['table', ['Fehler', 'Bedeutung', 'Typische Ursache'], [
      ['`SyntaxError`', 'Python versteht die Zeile nicht', 'Klammer oder Anführungszeichen vergessen, `:` fehlt'],
      ['`IndentationError`', 'Einrückung falsch', 'Block nicht eingerückt, Tabs und Leerzeichen gemischt'],
      ['`NameError`', 'Name unbekannt', 'Tippfehler, Variable noch nicht angelegt'],
      ['`TypeError`', 'Falscher Datentyp', 'Text und Zahl mit `+` verbunden'],
      ['`ValueError`', 'Richtiger Typ, falscher Wert', '`int("abc")`'],
      ['`ZeroDivisionError`', 'Division durch 0', '`10 / 0`'],
      ['`IndexError` / `KeyError`', 'Position bzw. Schlüssel existiert nicht', 'Liste zu kurz, Schlüssel nicht im Dictionary'],
    ]],
    ['tip', 'In der Prüfung schreibt man Code **auf Papier**. Achte deshalb besonders auf **Doppelpunkte**, **Einrückung** und **schließende Klammern**. Ein kleiner Syntaxfehler kostet selten viele Punkte, aber eine saubere Struktur zeigt dem Prüfer, dass du die Logik verstanden hast.'],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie ein Programm, das nach Vor- und Nachnamen fragt und dann `Willkommen, <Vorname> <Nachname>!` ausgibt.', [['code', 'python', `vorname = input("Vorname: ")
nachname = input("Nachname: ")
print("Willkommen,", vorname, nachname + "!")`], 'Hinweis: `print` trennt mehrere Argumente mit einem Leerzeichen. Mit `+` hängt man Strings ohne Leerzeichen aneinander.'], 3],
    ['qa', 'Ein Programm soll zwei Zahlen einlesen und die Summe ausgeben. Folgender Code liefert bei den Eingaben 3 und 4 die Ausgabe `34`. Warum? Korrigieren Sie ihn. `a = input("a: ")` / `b = input("b: ")` / `print(a + b)`', ['`input` liefert Strings. `"3" + "4"` **verkettet** die Texte zu `"34"`.', 'Korrektur:', ['code', 'python', `a = int(input("a: "))
b = int(input("b: "))
print(a + b)   # 7`]], 3],
    ['qa', 'Erklären Sie den Unterschied zwischen einem Compiler und einem Interpreter.', ['Ein **Compiler** übersetzt den **gesamten Quelltext vor der Ausführung** in Maschinencode (oder Bytecode). Syntaxfehler werden vorher gemeldet, das Ergebnis läuft schnell.', 'Ein **Interpreter** liest den Quelltext **zur Laufzeit Anweisung für Anweisung** und führt ihn direkt aus. Das ist flexibel und gut zum Testen, aber langsamer.'], 4],
    ['quiz', [
      {q: 'Was liefert input() zurück?', o: ['Immer einen String', 'Immer eine Zahl', 'Je nach Eingabe int oder str', 'None'], a: 0, e: 'Zahlen muss man mit int() oder float() umwandeln.'},
      {q: 'Wie bildet Python einen Block (zum Beispiel den Rumpf eines if)?', o: ['Durch Einrückung nach einem Doppelpunkt', 'Mit geschweiften Klammern', 'Mit begin und end', 'Mit Semikolon'], a: 0, e: 'Einrückung mit 4 Leerzeichen.'},
      {q: 'Welche Fehlerart erzeugt print("Alter: " + 21)?', o: ['TypeError', 'SyntaxError', 'NameError', 'ValueError'], a: 0, e: 'str und int können nicht mit + verbunden werden. Lösung: str(21) oder f-String.'},
      {q: 'Was gibt print("a", "b", sep="-") aus?', o: ['a-b', 'a b', 'ab', 'a - b'], a: 0, e: 'sep legt das Trennzeichen fest.'},
      {q: 'Was ist Python?', o: ['Eine interpretierte Sprache', 'Eine reine Maschinensprache', 'Eine Datenbank', 'Ein Betriebssystem'], a: 0, e: 'Der Interpreter führt den Quelltext direkt aus.'},
    ]],
  ],
});
