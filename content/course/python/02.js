AP2.page('course-python-02', {
  b: 'course', g: 'Python', t: 'Python 2: Variablen, Datentypen und Operatoren',
  d: 'Eine **Variable** ist ein **Name**, der auf einen **Wert** im Speicher zeigt. Jeder Wert hat einen **Datentyp** (zum Beispiel `int` für ganze Zahlen, `str` für Text), der festlegt, **welche Werte** möglich sind und **welche Operationen** erlaubt sind. Python ist **dynamisch typisiert** (der Typ wird zur Laufzeit am Wert erkannt, keine Deklaration nötig) und **stark typisiert** (keine heimliche Umwandlung von `"3"` in `3`).',
  m: '**Zuweisung `=` ist keine Gleichung:** `x = x + 1` heißt "nimm den alten Wert von x, addiere 1, speichere das Ergebnis wieder in x". **`/` liefert immer float, `//` ganzzahlig, `%` den Rest.** **Vergleich mit `==`, Zuweisung mit `=`.**',
  cheat: [
    ['Grundtypen', ['`int`: `42`, `-7`, `1_000_000`', '`float`: `3.14`, `2e3` (= 2000.0)', '`str`: `"Text"`', '`bool`: `True`, `False`', '`None`: "kein Wert"']],
    ['Rechnen', ['`+ - * /`', '`//` ganzzahlige Division', '`%` Rest (Modulo)', '`**` Potenz', '`abs()`, `round()`, `min()`, `max()`']],
    ['Umwandeln', ['`int("5")`, `int(3.9)` ergibt 3', '`float("2.5")`', '`str(42)`', '`bool(0)` ergibt False', '`type(x)` zeigt den Typ']],
    ['Kurzformen', ['`x += 1` statt `x = x + 1`', '`x -= 2`, `x *= 3`, `x /= 2`', '`a, b = b, a` tauscht', 'Kein `x++` in Python!']],
  ],
  blocks: [
    ['h', 'Variablen anlegen und benutzen'],
    ['p', 'Stell dir eine Variable wie ein **Namensschild** vor, das an einen Wert geklebt wird. Mit `=` klebst du das Schild an. Du kannst es später an einen anderen Wert kleben.'],
    ['code', 'python', `preis = 19.99          # Variable preis zeigt auf den Wert 19.99
menge = 3
gesamt = preis * menge # Ausdruck rechts wird zuerst berechnet, dann zugewiesen
print(gesamt)          # 59.97

menge = menge + 1      # alter Wert 3 + 1 = 4, wird in menge gespeichert
menge += 1             # Kurzform: jetzt 5
print(menge)

a, b = 1, 2            # Mehrfachzuweisung
a, b = b, a            # Tauschen ohne Hilfsvariable: a=2, b=1`],
    ['table', ['Regel für Namen', 'Erlaubt', 'Nicht erlaubt'], [
      ['Buchstaben, Ziffern, Unterstrich', '`anzahl_kunden`, `wert2`', '`anzahl-kunden` (Minus), `mein wert` (Leerzeichen)'],
      ['Nicht mit Ziffer beginnen', '`zahl1`', '`1zahl`'],
      ['Keine Schlüsselwörter', '`klasse`', '`class`, `if`, `for`, `def`'],
      ['Konvention (PEP 8)', '`snake_case` für Variablen, `GROSS` für Konstanten', '`AnzahlKunden` (ist für Klassen reserviert)'],
    ]],
    ['h', 'Die wichtigsten Datentypen'],
    ['table', ['Typ', 'Bedeutung', 'Beispiele', 'Typischer Einsatz'], [
      ['`int`', 'Ganze Zahl (beliebig groß)', '`0`, `42`, `-17`', 'Zähler, Mengen, Index'],
      ['`float`', 'Gleitkommazahl', '`3.14`, `-0.5`, `1e6`', 'Messwerte, Preise (Achtung Rundung)'],
      ['`str`', 'Zeichenkette (Text)', '`"Anna"`, `\'x\'`, `""`', 'Namen, Ausgaben'],
      ['`bool`', 'Wahrheitswert', '`True`, `False`', 'Bedingungen, Flags'],
      ['`NoneType`', 'Kein Wert', '`None`', 'Noch nicht gesetzt, keine Rückgabe'],
      ['`list`, `tuple`, `dict`, `set`', 'Sammlungen', '`[1, 2]`, `(1, 2)`, `{"a": 1}`, `{1, 2}`', 'Siehe Lektionen 6 und 7'],
    ]],
    ['code', 'python', `print(type(42))        # <class 'int'>
print(type(4.2))       # <class 'float'>
print(type("42"))      # <class 'str'>
print(isinstance(42, int))   # True: Typ prüfen`],
    ['note', 'Zum Vergleich: In **Java und C#** muss man den Typ **vorher angeben** (`int menge = 3;`). Das nennt man **statische Typisierung**: Der Compiler prüft Typen vor dem Start. Python prüft erst **zur Laufzeit**.'],
    ['h', 'Arithmetische Operatoren'],
    ['table', ['Operator', 'Bedeutung', 'Beispiel', 'Ergebnis'], [
      ['`+`', 'Addition', '`7 + 2`', '`9`'],
      ['`-`', 'Subtraktion', '`7 - 2`', '`5`'],
      ['`*`', 'Multiplikation', '`7 * 2`', '`14`'],
      ['`/`', 'Division (immer float)', '`7 / 2`', '`3.5`'],
      ['`//`', 'Ganzzahlige Division (abrunden)', '`7 // 2`', '`3`'],
      ['`%`', 'Rest der Division (Modulo)', '`7 % 2`', '`1`'],
      ['`**`', 'Potenz', '`2 ** 10`', '`1024`'],
    ]],
    ['ex', ['**Modulo ist in Prüfungen sehr beliebt:**', '`zahl % 2 == 0` prüft, ob eine Zahl **gerade** ist.', '`jahr % 4 == 0` ist Teil der Schaltjahr-Regel.', '`sekunden % 60` liefert die restlichen Sekunden, `sekunden // 60` die vollen Minuten.', '`zahl % 10` liefert die **letzte Ziffer**, `zahl // 10` entfernt sie.']],
    ['p', '**Rangfolge** (wie in Mathe, "Punkt vor Strich"): zuerst `**`, dann `* / // %`, dann `+ -`. Klammern ändern die Reihenfolge. `2 + 3 * 4` ergibt `14`, `(2 + 3) * 4` ergibt `20`.'],
    ['h', 'Vergleichs- und logische Operatoren'],
    ['table', ['Operator', 'Bedeutung', 'Beispiel (x = 5)', 'Ergebnis'], [
      ['`==`', 'gleich', '`x == 5`', '`True`'],
      ['`!=`', 'ungleich', '`x != 5`', '`False`'],
      ['`<`, `>`', 'kleiner, größer', '`x < 3`', '`False`'],
      ['`<=`, `>=`', 'kleiner/größer gleich', '`x >= 5`', '`True`'],
      ['`and`', 'beide wahr', '`x > 0 and x < 10`', '`True`'],
      ['`or`', 'mindestens eins wahr', '`x < 0 or x > 3`', '`True`'],
      ['`not`', 'Umkehrung', '`not x == 5`', '`False`'],
    ]],
    ['p', 'Python erlaubt **verkettete Vergleiche**: `0 < x < 10` ist dasselbe wie `x > 0 and x < 10`.'],
    ['table', ['A', 'B', 'A and B', 'A or B', 'not A'], [['False', 'False', 'False', 'False', 'True'], ['False', 'True', 'False', 'True', 'True'], ['True', 'False', 'False', 'True', 'False'], ['True', 'True', 'True', 'True', 'False']]],
    ['h', 'Typumwandlung (Casting)'],
    ['code', 'python', `print(int("42") + 1)        # 43
print(int(3.99))            # 3  (schneidet ab, rundet NICHT)
print(round(3.5), round(2.5))   # 4 2  (Banker's Rounding: zur geraden Zahl)
print(float("2.5") * 2)     # 5.0
print(str(42) + " Stück")   # "42 Stück"
print(bool(0), bool(""), bool("0"), bool([]))   # False False True False`],
    ['warn', '**Gleitkomma-Ungenauigkeit:** `0.1 + 0.2` ergibt `0.30000000000000004`, weil 0,1 im Binärsystem nicht exakt darstellbar ist. Für **Geldbeträge** nutzt man `decimal.Decimal` oder rechnet in **Cent als int**. Gleitkommazahlen nie mit `==` vergleichen, sondern `abs(a - b) < 1e-9` oder `math.isclose(a, b)`.'],
    ['h', 'Konstanten und Speicherbedarf'],
    ['p', 'Python kennt keine echten Konstanten. Per Konvention schreibt man sie **GROSS**: `MWST = 0.19`. In Java heißt das `final double MWST = 0.19;`, in C# `const double MWST = 0.19;`.'],
    ['table', ['Datentyp (Java/C#)', 'Größe', 'Wertebereich'], [['`byte`', '8 Bit = 1 Byte', '-128 bis 127 (C#: 0 bis 255)'], ['`short`', '16 Bit', '-32.768 bis 32.767'], ['`int`', '32 Bit', 'ca. -2,1 Mrd. bis 2,1 Mrd.'], ['`long`', '64 Bit', 'ca. ±9,2 Trillionen'], ['`float`', '32 Bit', 'ca. 7 Stellen Genauigkeit'], ['`double`', '64 Bit', 'ca. 15-16 Stellen Genauigkeit'], ['`char`', '16 Bit', 'ein Unicode-Zeichen'], ['`boolean`/`bool`', '1 Bit logisch (meist 1 Byte)', 'true/false']]],
    ['tip', 'Prüfungsfrage-Klassiker: "Welcher Datentyp ist geeignet für ...?" **Postleitzahl:** `String` (führende Null, keine Rechnung). **Telefonnummer:** `String`. **Alter:** `int`/`byte`. **Preis:** `decimal`/`BigDecimal` oder `int` in Cent. **Ja/Nein:** `boolean`. **Messwert:** `double`.'],
    ['h', 'Übungen'],
    ['qa', 'Berechnen Sie: a) `17 // 5`, b) `17 % 5`, c) `2 ** 3 * 2`, d) `10 / 4`, e) `-7 // 2`', ['a) `3`', 'b) `2`', 'c) `16` (zuerst Potenz 8, dann mal 2)', 'd) `2.5`', 'e) `-4` (`//` rundet **nach unten** in Richtung minus unendlich)'], 5],
    ['qa', 'Schreiben Sie ein Programm, das eine Sekundenanzahl einliest und als Stunden, Minuten und Sekunden ausgibt (zum Beispiel 3725 ergibt 1 h 2 min 5 s).', [['code', 'python', `s = int(input("Sekunden: "))
h = s // 3600            # volle Stunden
m = (s % 3600) // 60     # Rest nach Stunden, davon volle Minuten
rest = s % 60            # übrige Sekunden
print(h, "h", m, "min", rest, "s")`]], 4],
    ['qa', 'Welche Datentypen wählen Sie für: Artikelnummer "A-0042", Lagerbestand, Nettopreis, "ist lieferbar"? Begründen Sie kurz.', ['- Artikelnummer: **String**, enthält Buchstaben und Bindestrich, keine Rechnung.', '- Lagerbestand: **int**, ganze Stückzahl.', '- Nettopreis: **decimal** bzw. `Decimal`/`BigDecimal` (oder int in Cent), keine Rundungsfehler bei Geld.', '- lieferbar: **boolean**, nur zwei Zustände.'], 4],
    ['qa', 'Welche Werte haben a und b nach folgendem Code? `a = 5` / `b = a` / `a = a * 2` / `b += a`', ['`a = 10` und `b = 15`.', 'b bekommt zuerst den Wert 5. Dann wird a zu 10. `b += a` rechnet 5 + 10 = 15.'], 2],
    ['quiz', [
      {q: 'Was ergibt 7 / 2 in Python 3?', o: ['3.5', '3', '4', '3.0'], a: 0, e: '/ liefert immer float.'},
      {q: 'Was ergibt 7 % 3?', o: ['1', '2', '2.33', '0'], a: 0, e: '7 = 2*3 + 1, Rest 1.'},
      {q: 'Welcher Ausdruck prüft, ob n gerade ist?', o: ['n % 2 == 0', 'n / 2 == 0', 'n // 2 == 1', 'n % 2 = 0'], a: 0, e: 'Rest 0 bei Division durch 2.'},
      {q: 'Was ergibt int(4.9)?', o: ['4', '5', '4.9', 'Fehler'], a: 0, e: 'int() schneidet die Nachkommastellen ab.'},
      {q: 'Welcher Variablenname ist gültig?', o: ['anzahl_2', '2anzahl', 'anzahl-2', 'class'], a: 0, e: 'Keine Ziffer am Anfang, kein Minus, kein Schlüsselwort.'},
      {q: 'Welcher Datentyp passt am besten für eine Postleitzahl wie 01067?', o: ['String', 'int', 'float', 'boolean'], a: 0, e: 'Als int ginge die führende 0 verloren; mit PLZ rechnet man nicht.'},
      {q: 'Was ist das Ergebnis von True and not False?', o: ['True', 'False', 'None', 'Fehler'], a: 0, e: 'not False = True, True and True = True.'},
    ]],
  ],
});
