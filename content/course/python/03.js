AP2.page('course-python-03', {
  b: 'course', g: 'Python', t: 'Python 3: Strings und Formatierung',
  d: 'Ein **String** (`str`) ist eine **Folge von Zeichen**. Jedes Zeichen hat eine **Position (Index)**, beginnend bei **0**. Strings sind **unveränderlich (immutable)**: Methoden wie `upper()` ändern den String nicht, sondern liefern einen **neuen** String zurück.',
  m: '**Index startet bei 0, der letzte ist `len(s) - 1` oder `-1`.** **Slicing `s[start:stop]`: stop ist exklusiv.** **f-String: `f"{wert:.2f}"` für 2 Nachkommastellen.** **Strings sind immutable: Ergebnis immer zuweisen (`s = s.upper()`).**',
  cheat: [
    ['Zugriff', ['`s[0]` erstes Zeichen', '`s[-1]` letztes Zeichen', '`s[1:4]` Zeichen 1 bis 3', '`s[::-1]` umgedreht', '`len(s)` Länge']],
    ['Methoden', ['`upper()`, `lower()`, `strip()`', '`replace(alt, neu)`', '`split(";")` ergibt Liste', '`";".join(liste)`', '`find("x")` (-1 wenn nicht da)', '`startswith`, `endswith`, `count`']],
    ['Prüfen', ['`"ab" in s`', '`isdigit()`, `isalpha()`', '`isupper()`, `isspace()`']],
    ['Formatieren', ['`f"{name} ist {alter}"`', '`f"{x:.2f}"` 2 Nachkommastellen', '`f"{x:>8}"` rechtsbündig', '`f"{n:05d}"` führende Nullen']],
  ],
  blocks: [
    ['h', 'Strings erzeugen'],
    ['code', 'python', `a = "Hallo"                 # doppelte Anführungszeichen
b = 'Welt'                  # einfache: gleichwertig
c = "Er sagt: 'Hi'"         # andere Sorte innen benutzen
d = "Zeile 1\\nZeile 2"      # \\n = Zeilenumbruch, \\t = Tabulator
e = """Mehrzeiliger
Text"""                      # drei Anführungszeichen
leer = ""                   # leerer String, len(leer) == 0`],
    ['h', 'Index und Slicing'],
    ['p', 'Stell dir den String als **Reihe von Kästchen** vor. Jedes Kästchen hat eine Nummer von vorn (0, 1, 2, ...) und eine von hinten (-1, -2, ...).'],
    ['table', ['Zeichen', 'P', 'y', 't', 'h', 'o', 'n'], [['Index von vorn', '0', '1', '2', '3', '4', '5'], ['Index von hinten', '-6', '-5', '-4', '-3', '-2', '-1']]],
    ['code', 'python', `s = "Python"
print(s[0])      # P
print(s[5])      # n
print(s[-1])     # n  (letztes Zeichen)
print(s[0:2])    # Py   (Index 0 und 1, die 2 ist exklusiv)
print(s[2:])     # thon (ab Index 2 bis zum Ende)
print(s[:3])     # Pyt  (vom Anfang bis Index 2)
print(s[::2])    # Pto  (jedes zweite Zeichen)
print(s[::-1])   # nohtyP (rückwärts)
# s[0] = "J"     # TypeError: Strings sind unveränderlich!
s = "J" + s[1:]  # stattdessen neuen String bauen: "Jython"`],
    ['warn', '`s[6]` bei `"Python"` erzeugt einen **IndexError** (es gibt nur die Indizes 0 bis 5). Slicing dagegen ist tolerant: `s[2:100]` liefert einfach `"thon"`.'],
    ['h', 'Wichtige String-Methoden'],
    ['table', ['Methode', 'Bedeutung', 'Beispiel', 'Ergebnis'], [
      ['`upper()` / `lower()`', 'Groß- / Kleinbuchstaben', '`"Abc".upper()`', '`"ABC"`'],
      ['`strip()`', 'Leerzeichen am Rand entfernen', '`"  hi  ".strip()`', '`"hi"`'],
      ['`replace(a, b)`', 'Ersetzen', '`"a-b".replace("-", "+")`', '`"a+b"`'],
      ['`split(sep)`', 'In Liste zerlegen', '`"a;b;c".split(";")`', '`["a", "b", "c"]`'],
      ['`sep.join(liste)`', 'Liste zusammenfügen', '`"-".join(["a", "b"])`', '`"a-b"`'],
      ['`find(x)`', 'Position oder -1', '`"Hallo".find("l")`', '`2`'],
      ['`count(x)`', 'Wie oft kommt x vor?', '`"Hallo".count("l")`', '`2`'],
      ['`startswith(x)`', 'Beginnt mit x?', '`"Datei.txt".endswith(".txt")`', '`True`'],
      ['`isdigit()`', 'Nur Ziffern?', '`"123".isdigit()`', '`True`'],
      ['`len(s)`', 'Länge (Funktion, keine Methode)', '`len("Hallo")`', '`5`'],
    ]],
    ['code', 'python', `zeile = "4711;Schraube M6;0.12;500"     # typische CSV-Zeile
teile = zeile.split(";")                 # ['4711', 'Schraube M6', '0.12', '500']
nr = int(teile[0])
name = teile[1]
preis = float(teile[2])
menge = int(teile[3])
print(name, "Lagerwert:", preis * menge)  # Schraube M6 Lagerwert: 60.0`],
    ['h', 'Strings zusammensetzen und formatieren'],
    ['code', 'python', `name, alter, preis = "Anna", 21, 3.5
print("Name: " + name + ", Alter: " + str(alter))     # Verkettung: Zahlen umwandeln!
print("Name:", name, "Alter:", alter)                    # print mit Kommas
print(f"Name: {name}, Alter: {alter}")                   # f-String (empfohlen)
print(f"Preis: {preis:.2f} EUR")                         # Preis: 3.50 EUR
print(f"{'Artikel':<10}|{'Preis':>8}")                   # Tabelle: links / rechts bündig
print(f"{'Apfel':<10}|{0.5:>8.2f}")
print(f"Rechnung: {2 * 3 = }")                           # Rechnung: 2 * 3 = 6  (Debug-Hilfe)
print("Wert: {:.1f}".format(3.14159))                    # ältere Variante mit format()`],
    ['table', ['Format', 'Bedeutung', 'Beispiel', 'Ergebnis'], [['`:.2f`', '2 Nachkommastellen', '`f"{3.14159:.2f}"`', '`3.14`'], ['`:8`', 'Mindestbreite 8', '`f"{42:8}"`', '`      42`'], ['`:<8` `:>8` `:^8`', 'links, rechts, zentriert', '`f"{"ab":^6}"`', '`  ab  `'], ['`:05d`', 'mit Nullen auffüllen', '`f"{7:05d}"`', '`00007`'], ['`:,`', 'Tausendertrennzeichen', '`f"{1234567:,}"`', '`1,234,567`'], ['`:.1%`', 'als Prozent', '`f"{0.256:.1%}"`', '`25.6%`']]],
    ['h', 'Zeichen und Zeichencodes'],
    ['p', 'Jedes Zeichen hat einen **Zahlenwert** (Unicode/ASCII). `ord("A")` ergibt `65`, `chr(65)` ergibt `"A"`. Großbuchstaben A-Z liegen bei 65-90, Kleinbuchstaben a-z bei 97-122, Ziffern 0-9 bei 48-57. Das nutzt man zum Beispiel für die **Caesar-Verschlüsselung** oder Prüfziffern.'],
    ['code', 'python', `def caesar(text, k):
    erg = ""
    for z in text:
        if z.isupper():
            erg += chr((ord(z) - 65 + k) % 26 + 65)   # A-Z im Kreis verschieben
        else:
            erg += z                                    # andere Zeichen unverändert
    return erg
print(caesar("HALLO", 3))   # KDOOR`],
    ['h', 'Übungen'],
    ['qa', 'Gegeben `s = "Fachinformatiker"`. Was liefern `s[0]`, `s[-1]`, `s[4:9]`, `s[::-1][:3]`, `len(s)`?', ['`s[0]` = `"F"`, `s[-1]` = `"r"`, `s[4:9]` = `"infor"` (Index 4 bis 8), `s[::-1][:3]` = `"rek"`, `len(s)` = `16`.'], 5],
    ['qa', 'Schreiben Sie eine Funktion `ist_palindrom(wort)`, die `True` liefert, wenn ein Wort vorwärts und rückwärts gleich ist (Groß-/Kleinschreibung ignorieren, zum Beispiel "Anna").', [['code', 'python', `def ist_palindrom(wort):
    w = wort.lower()
    return w == w[::-1]

print(ist_palindrom("Anna"))    # True
print(ist_palindrom("Python"))  # False`]], 4],
    ['qa', 'Zählen Sie in einem eingegebenen Satz die Vokale (a, e, i, o, u, auch groß).', [['code', 'python', `satz = input("Satz: ")
anzahl = 0
for z in satz.lower():
    if z in "aeiou":
        anzahl += 1
print("Vokale:", anzahl)`]], 4],
    ['qa', 'Eine E-Mail-Adresse soll grob geprüft werden: Sie muss genau ein `@` enthalten und nach dem `@` einen Punkt. Schreiben Sie die Prüfung.', [['code', 'python', `def email_ok(adr):
    if adr.count("@") != 1:
        return False
    domain = adr.split("@")[1]   # Teil nach dem @
    return "." in domain

print(email_ok("max@firma.de"))   # True
print(email_ok("max.firma.de"))   # False`]], 4],
    ['quiz', [
      {q: 'Was liefert "Python"[1:4]?', o: ['yth', 'Pyt', 'ytho', 'tho'], a: 0, e: 'Index 1, 2, 3 (4 ist exklusiv).'},
      {q: 'Was passiert bei s = "abc"; s[0] = "x"?', o: ['TypeError, Strings sind unveränderlich', 's wird "xbc"', 'IndexError', 'Nichts'], a: 0, e: 'Man muss einen neuen String bauen.'},
      {q: 'Was ergibt "a,b,c".split(",")?', o: ['["a", "b", "c"]', '"abc"', '("a", "b", "c")', '["a,b,c"]'], a: 0, e: 'split liefert eine Liste.'},
      {q: 'Wie gibt man 3.14159 mit zwei Nachkommastellen aus?', o: ['f"{x:.2f}"', 'f"{x:2}"', 'round(x)', 'f"{x:.2}"'], a: 0, e: ':.2f = fixed mit 2 Stellen.'},
      {q: 'Was liefert "Hallo".find("z")?', o: ['-1', '0', 'None', 'Fehler'], a: 0, e: 'find gibt -1 zurück, index() würde einen Fehler werfen.'},
      {q: 'Welcher Index ist das letzte Zeichen eines Strings s?', o: ['len(s) - 1', 'len(s)', '0', '1'], a: 0, e: 'Oder einfach -1.'},
    ]],
  ],
});
