AP2.page('course-python-05', {
  b: 'course', g: 'Python', t: 'Python 5: Schleifen (while, for, range, break, continue)',
  d: 'Eine **Schleife** (Iteration) wiederholt Anweisungen. Die **while-Schleife** ist **kopfgesteuert**: Sie prüft die Bedingung **vor** jedem Durchlauf und läuft, solange sie wahr ist. Die **for-Schleife** durchläuft nacheinander alle Elemente einer **Folge** (Liste, String, `range`). Mit `break` verlässt man eine Schleife sofort, mit `continue` springt man zum nächsten Durchlauf. Eine fußgesteuerte Schleife (do-while) gibt es in Python nicht; man bildet sie mit `while True` und `break` nach.',
  m: '**Anzahl bekannt -> for mit range. Anzahl unbekannt (bis Bedingung) -> while.** **`range(start, stop, schritt)`: stop ist exklusiv.** **while braucht eine Änderung im Rumpf, sonst Endlosschleife.** **break = raus, continue = nächste Runde.**',
  cheat: [
    ['range', ['`range(5)` -> 0, 1, 2, 3, 4', '`range(1, 6)` -> 1 bis 5', '`range(0, 10, 2)` -> 0, 2, 4, 6, 8', '`range(5, 0, -1)` -> 5, 4, 3, 2, 1']],
    ['for', ['`for x in liste:`', '`for i in range(len(l)):`', '`for i, x in enumerate(l):`', '`for z in "Text":`']],
    ['while', ['`while bedingung:`', 'Zähler vor der Schleife setzen', 'im Rumpf verändern', '`while True:` + `break`']],
    ['Steuerung', ['`break`: Schleife beenden', '`continue`: Rest überspringen', '`else` nach Schleife: ohne break', 'verschachtelt: innen läuft komplett']],
  ],
  blocks: [
    ['h', 'Warum Schleifen?'],
    ['p', 'Stell dir vor, du sollst die Zahlen 1 bis 100 ausgeben. Hundert `print`-Zeilen wären unsinnig. Eine Schleife erledigt das in zwei Zeilen. Schleifen sind außerdem nötig, wenn man **nicht weiß, wie oft** etwas passiert: "Frage so lange nach dem Passwort, bis es stimmt."'],
    ['h', 'Die while-Schleife'],
    ['code', 'python', `zaehler = 1                  # 1. Startwert
while zaehler <= 5:          # 2. Bedingung (vor jedem Durchlauf geprüft)
    print("Durchlauf", zaehler)
    zaehler += 1             # 3. Veränderung, sonst Endlosschleife!
print("fertig")`],
    ['table', ['Durchlauf', 'zaehler vorher', 'Bedingung zaehler <= 5', 'Ausgabe'], [
      ['1', '1', 'True', 'Durchlauf 1'],
      ['2', '2', 'True', 'Durchlauf 2'],
      ['...', '...', '...', '...'],
      ['5', '5', 'True', 'Durchlauf 5'],
      ['-', '6', '**False** -> Ende', 'fertig'],
    ]],
    ['warn', '**Endlosschleife:** Vergisst man `zaehler += 1`, bleibt die Bedingung immer wahr und das Programm hängt. Abbrechen im Terminal mit **Strg + C**.'],
    ['h3', 'Typischer Einsatz: Eingabe wiederholen, bis sie gültig ist'],
    ['code', 'python', `alter = int(input("Alter (0-120): "))
while alter < 0 or alter > 120:          # solange ungültig
    print("Ungültige Eingabe!")
    alter = int(input("Alter (0-120): "))
print("Danke, Alter =", alter)`],
    ['h3', 'Fußgesteuerte Schleife nachbilden (wie do-while in Java/C#)'],
    ['codes', [
      ['python', `while True:                       # läuft mindestens einmal
    pw = input("Passwort: ")
    if pw == "geheim":
        break                         # Abbruchbedingung am Ende
    print("Falsch, nochmal!")
print("Angemeldet")`],
      ['java', `String pw;
do {
    pw = scanner.nextLine();
} while (!pw.equals("geheim"));     // Bedingung NACH dem Rumpf`],
    ]],
    ['h', 'Die for-Schleife'],
    ['p', 'In Python ist `for` eine **"für jedes Element"**-Schleife (foreach). Die Laufvariable nimmt nacheinander jeden Wert der Folge an.'],
    ['code', 'python', `for name in ["Anna", "Ben", "Cem"]:
    print("Hallo", name)

for buchstabe in "AP2":
    print(buchstabe)          # A, P, 2

for i in range(1, 11):        # 1 bis 10
    print(i, "zum Quadrat ist", i * i)`],
    ['h3', 'range genau verstehen'],
    ['p', '`range(start, stop, schritt)` erzeugt Zahlen **ab start bis ausschließlich stop**. Fehlt start, beginnt es bei 0, fehlt schritt, ist er 1. Mit negativem Schritt zählt man rückwärts.'],
    ['codes', [
      ['python', `for i in range(10, 0, -2):
    print(i, end=" ")        # 10 8 6 4 2`],
      ['java', `for (int i = 10; i > 0; i -= 2) {
    System.out.print(i + " ");
}`],
      ['csharp', `for (int i = 10; i > 0; i -= 2)
{
    Console.Write(i + " ");
}`],
    ]],
    ['h3', 'Index und Element gleichzeitig: enumerate'],
    ['code', 'python', `noten = [2, 1, 3]
for i, note in enumerate(noten):        # i = Index, note = Wert
    print(f"Fach {i + 1}: Note {note}")

# Ohne enumerate (wie in Java):
for i in range(len(noten)):
    print(i, noten[i])`],
    ['h', 'break, continue und else'],
    ['code', 'python', `zahlen = [4, 7, -1, 9, 12]

for z in zahlen:
    if z < 0:
        print("Negative Zahl gefunden, Abbruch")
        break                  # Schleife sofort verlassen
    print(z)                   # 4, 7

for z in zahlen:
    if z % 2 == 0:
        continue               # gerade Zahlen überspringen
    print(z)                   # 7, -1, 9

for z in zahlen:
    if z > 100:
        print("Großer Wert gefunden")
        break
else:                          # läuft nur, wenn KEIN break kam
    print("Kein Wert über 100")`],
    ['h', 'Verschachtelte Schleifen'],
    ['p', 'Bei jedem Durchlauf der äußeren Schleife läuft die innere **komplett** durch. Klassiker: das kleine Einmaleins oder Muster aus Zeichen.'],
    ['code', 'python', `for zeile in range(1, 4):
    for spalte in range(1, 4):
        print(zeile * spalte, end="\\t")   # \\t = Tabulator
    print()                                 # Zeilenumbruch nach jeder Zeile
# 1  2  3
# 2  4  6
# 3  6  9`],
    ['h', 'Die wichtigsten Schleifenmuster'],
    ['code', 'python', `werte = [12, 5, 8, 21, 3]

summe = 0                       # Summieren
for w in werte:
    summe += w

maximum = werte[0]              # Maximum suchen
for w in werte:
    if w > maximum:
        maximum = w

anzahl = 0                      # Zählen mit Bedingung
for w in werte:
    if w > 10:
        anzahl += 1

print(summe, summe / len(werte), maximum, anzahl)   # 49 9.8 21 2`],
    ['note', 'Python bietet dafür auch eingebaute Funktionen: `sum(werte)`, `max(werte)`, `min(werte)`, `len(werte)`. In der Prüfung soll man den Algorithmus aber oft **selbst** schreiben, also beide Wege kennen.'],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie ein Programm, das so lange Zahlen einliest, bis 0 eingegeben wird, und danach Summe und Durchschnitt der eingegebenen Zahlen ausgibt (die 0 zählt nicht mit).', [['code', 'python', `summe = 0
anzahl = 0
zahl = float(input("Zahl (0 = Ende): "))
while zahl != 0:
    summe += zahl
    anzahl += 1
    zahl = float(input("Zahl (0 = Ende): "))
if anzahl > 0:
    print("Summe:", summe, "Durchschnitt:", summe / anzahl)
else:
    print("Keine Zahlen eingegeben")`], 'Vorlesen vor der Schleife, erneutes Lesen am Ende des Rumpfes. Division durch 0 abfangen.'], 5],
    ['qa', 'Geben Sie alle Zahlen von 1 bis 100 aus, die durch 3 **oder** 5 teilbar sind, und zählen Sie sie.', [['code', 'python', `anzahl = 0
for i in range(1, 101):
    if i % 3 == 0 or i % 5 == 0:
        print(i, end=" ")
        anzahl += 1
print("\\nAnzahl:", anzahl)    # 47`]], 4],
    ['qa', 'Was gibt der Code aus? `for i in range(3):` / `for j in range(i):` / `print(i, j)`', ['Für i = 0 läuft die innere Schleife gar nicht (range(0) ist leer).', 'Ausgabe: `1 0`, `2 0`, `2 1`.'], 3],
    ['qa', 'Zeichnen Sie mit Sternen ein rechtwinkliges Dreieck der Höhe n (Eingabe), zum Beispiel für n = 3: `*`, `**`, `***`.', [['code', 'python', `n = int(input("Höhe: "))
for zeile in range(1, n + 1):
    print("*" * zeile)        # String-Multiplikation`]], 3],
    ['quiz', [
      {q: 'Welche Zahlen erzeugt range(2, 8, 2)?', o: ['2, 4, 6', '2, 4, 6, 8', '2, 8', '0, 2, 4, 6'], a: 0, e: 'stop (8) ist exklusiv.'},
      {q: 'Was bewirkt continue?', o: ['Springt zum nächsten Schleifendurchlauf', 'Beendet die Schleife', 'Beendet das Programm', 'Wiederholt den aktuellen Durchlauf'], a: 0, e: 'break beendet die Schleife.'},
      {q: 'Wann läuft der else-Zweig einer for-Schleife?', o: ['Wenn die Schleife ohne break endet', 'Wenn die Liste leer ist', 'Immer', 'Nur nach break'], a: 0, e: 'Praktisch für Suchen: "nicht gefunden".'},
      {q: 'Wie oft wird print ausgeführt? for i in range(4): for j in range(3): print(i)', o: ['12', '7', '4', '3'], a: 0, e: '4 mal 3.'},
      {q: 'Wie bildet man in Python eine fußgesteuerte Schleife nach?', o: ['while True mit break am Ende', 'do: ... while', 'repeat ... until', 'for ... else'], a: 0, e: 'do-while gibt es in Python nicht.'},
    ]],
    ['see', ['course-python-04', 'course-python-06', 'eua-kontroll']],
  ],
});
