AP2.page('course-python-04', {
  b: 'course', g: 'Python', t: 'Python 4: Verzweigungen (if, elif, else, match)',
  d: 'Eine **Verzweigung** (Selektion) führt Code nur aus, wenn eine **Bedingung** wahr ist. Eine Bedingung ist ein Ausdruck, der `True` oder `False` ergibt, zum Beispiel `alter >= 18`. Python kennt `if` (einseitig), `if ... else` (zweiseitig), `if ... elif ... else` (mehrseitig) und seit Version 3.10 `match ... case` (Fallunterscheidung, ähnlich `switch`).',
  m: '**Doppelpunkt nach jeder Bedingung, Rumpf eingerückt.** **`elif` wird nur geprüft, wenn alle vorherigen Bedingungen falsch waren:** die **Reihenfolge** zählt (strengste Bedingung zuerst). **`=` weist zu, `==` vergleicht.** **and/or/not** statt `&&`, `||`, `!`.',
  cheat: [
    ['Formen', ['`if b:` einseitig', '`if b: ... else: ...` zweiseitig', '`if / elif / elif / else` mehrseitig', '`x = a if b else c` Kurzform (ternär)']],
    ['Vergleich', ['`==` gleich, `!=` ungleich', '`<  <=  >  >=`', 'Verkettet: `0 <= x < 10`', '`in` / `not in` für Enthaltensein']],
    ['Logik', ['`and`: beide wahr', '`or`: mindestens einer wahr', '`not`: kehrt um', 'Vorrang: `not` vor `and` vor `or`']],
    ['Falsy-Werte', ['`False`, `None`, `0`, `0.0`', '`""` (leerer String)', '`[]`, `{}`, `()`, `set()`', 'Alles andere ist truthy']],
  ],
  blocks: [
    ['h', 'Warum Verzweigungen?'],
    ['p', 'Bisher liefen unsere Programme **immer gleich** von oben nach unten. Echte Programme müssen aber **entscheiden**: Ist das Passwort richtig? Ist der Warenkorb leer? Bekommt der Kunde Rabatt? Dafür gibt es die **Verzweigung**. In Struktogrammen und Programmablaufplänen (PAP) ist sie die **Raute** bzw. das **Dreieck mit Ja/Nein**.'],
    ['h', 'Einseitige Verzweigung: if'],
    ['code', 'python', `temperatur = float(input("Temperatur in °C: "))
if temperatur > 30:
    print("Es ist heiß!")       # nur wenn die Bedingung wahr ist
    print("Viel trinken!")
print("Programmende")           # läuft immer`],
    ['p', 'Ablauf: Python wertet `temperatur > 30` aus. Ist das Ergebnis `True`, werden die eingerückten Zeilen ausgeführt. Ist es `False`, springt Python direkt zur ersten **nicht eingerückten** Zeile danach.'],
    ['h', 'Zweiseitige Verzweigung: if ... else'],
    ['code', 'python', `zahl = int(input("Zahl: "))
if zahl % 2 == 0:               # Rest der Division durch 2 ist 0
    print(zahl, "ist gerade")
else:
    print(zahl, "ist ungerade")`],
    ['p', 'Genau **einer** der beiden Zweige läuft, nie beide und nie keiner. `else` hat **keine** Bedingung.'],
    ['h', 'Mehrseitige Verzweigung: if ... elif ... else'],
    ['p', 'Bei mehr als zwei Fällen hängt man `elif` (else if) an. Python prüft die Bedingungen **von oben nach unten** und führt **nur den ersten** Zweig aus, dessen Bedingung wahr ist. Danach wird der Rest übersprungen.'],
    ['code', 'python', `punkte = int(input("Punkte (0-100): "))

if punkte >= 92:
    note = 1
elif punkte >= 81:     # hier wissen wir schon: punkte < 92
    note = 2
elif punkte >= 67:
    note = 3
elif punkte >= 50:
    note = 4
elif punkte >= 30:
    note = 5
else:
    note = 6
print("Note:", note)`],
    ['warn', 'Die **Reihenfolge** entscheidet. Stünde `elif punkte >= 50` ganz oben, bekäme jemand mit 95 Punkten die Note 4, weil 95 >= 50 schon wahr ist und alle weiteren Zweige übersprungen werden. Regel: **vom strengsten zum schwächsten Fall** prüfen.'],
    ['h', 'Vergleichs- und logische Operatoren'],
    ['table', ['Operator', 'Bedeutung', 'Beispiel', 'Ergebnis'], [
      ['`==`', 'gleich', '`5 == 5`', '`True`'],
      ['`!=`', 'ungleich', '`5 != 3`', '`True`'],
      ['`<`, `<=`, `>`, `>=`', 'kleiner, kleiner gleich, ...', '`3 >= 4`', '`False`'],
      ['`and`', 'beide Seiten wahr', '`alter >= 18 and alter < 65`', 'wahr für 18 bis 64'],
      ['`or`', 'mindestens eine Seite wahr', '`tag == "Sa" or tag == "So"`', 'Wochenende'],
      ['`not`', 'Umkehrung', '`not ist_gesperrt`', 'wahr, wenn nicht gesperrt'],
      ['`in`', 'ist enthalten', '`"a" in "Haus"`', '`True`'],
    ]],
    ['p', 'Python erlaubt **verkettete Vergleiche** wie in der Mathematik: `18 <= alter < 65` ist dasselbe wie `alter >= 18 and alter < 65`.'],
    ['h3', 'Wahrheitstabelle'],
    ['table', ['a', 'b', 'a and b', 'a or b', 'not a'], [
      ['True', 'True', 'True', 'True', 'False'],
      ['True', 'False', 'False', 'True', 'False'],
      ['False', 'True', 'False', 'True', 'True'],
      ['False', 'False', 'False', 'False', 'True'],
    ]],
    ['note', '**Kurzschlussauswertung (short-circuit):** Bei `a and b` wird `b` gar nicht mehr ausgewertet, wenn `a` schon falsch ist. Bei `a or b` wird `b` übersprungen, wenn `a` wahr ist. Das nutzt man für sichere Prüfungen: `if liste and liste[0] > 5:` wirft keinen Fehler bei leerer Liste.'],
    ['h', 'Verschachtelte Verzweigungen'],
    ['p', 'Ein `if` darf in einem anderen `if` stehen. Jede Ebene wird um 4 weitere Leerzeichen eingerückt. Zu tiefe Verschachtelung macht Code schwer lesbar; oft hilft `and` oder `elif`.'],
    ['codes', [
      ['python', `alter = 17
hat_erlaubnis = True

if alter >= 18:
    print("Zutritt")
else:
    if hat_erlaubnis:
        print("Zutritt mit Erlaubnis der Eltern")
    else:
        print("Kein Zutritt")`],
      ['java', `int alter = 17;
boolean hatErlaubnis = true;

if (alter >= 18) {
    System.out.println("Zutritt");
} else if (hatErlaubnis) {
    System.out.println("Zutritt mit Erlaubnis der Eltern");
} else {
    System.out.println("Kein Zutritt");
}`],
      ['pseudo', `WENN alter >= 18 DANN
    AUSGABE "Zutritt"
SONST
    WENN hatErlaubnis DANN
        AUSGABE "Zutritt mit Erlaubnis der Eltern"
    SONST
        AUSGABE "Kein Zutritt"
    ENDE WENN
ENDE WENN`],
    ]],
    ['h', 'Bedingter Ausdruck (ternärer Operator)'],
    ['p', 'Für eine kurze Zuweisung mit zwei Möglichkeiten gibt es die Einzeilerform `wert_wenn_wahr if bedingung else wert_wenn_falsch`.'],
    ['code', 'python', `alter = 20
status = "volljährig" if alter >= 18 else "minderjährig"
# entspricht in Java/C#: String status = alter >= 18 ? "volljährig" : "minderjährig";`],
    ['h', 'Truthy und Falsy'],
    ['p', 'In einer Bedingung muss nicht unbedingt `True`/`False` stehen. Python wandelt jeden Wert automatisch um: **leere** oder **null-artige** Werte gelten als falsch, alles andere als wahr.'],
    ['code', 'python', `name = input("Name: ")
if name:                 # wahr, wenn nicht leer
    print("Hallo", name)
else:
    print("Kein Name eingegeben")

warenkorb = []
if not warenkorb:
    print("Warenkorb ist leer")`],
    ['h', 'Fallunterscheidung mit match ... case'],
    ['p', 'Seit Python 3.10 gibt es `match`. Es vergleicht einen Wert nacheinander mit Mustern. `case _:` ist der **Standardfall** (wie `default` in Java/C#). Anders als bei `switch` in Java braucht man **kein break**: Es läuft immer nur ein Fall.'],
    ['codes', [
      ['python', `befehl = input("Befehl: ")
match befehl:
    case "start":
        print("Starte ...")
    case "stop" | "ende":          # mehrere Werte mit |
        print("Beende ...")
    case _:
        print("Unbekannter Befehl")`],
      ['java', `switch (befehl) {
    case "start":
        System.out.println("Starte ...");
        break;                      // ohne break: Fall-through!
    case "stop":
    case "ende":
        System.out.println("Beende ...");
        break;
    default:
        System.out.println("Unbekannter Befehl");
}`],
    ]],
    ['h', 'Typische Prüfungsaufgabe: Schaltjahr'],
    ['p', 'Ein Jahr ist ein **Schaltjahr**, wenn es durch 4 teilbar ist, **außer** es ist durch 100 teilbar, **es sei denn**, es ist auch durch 400 teilbar. Das ist ein Klassiker, weil man die Bedingungen richtig verknüpfen muss.'],
    ['code', 'python', `jahr = int(input("Jahr: "))
if (jahr % 4 == 0 and jahr % 100 != 0) or jahr % 400 == 0:
    print(jahr, "ist ein Schaltjahr")
else:
    print(jahr, "ist kein Schaltjahr")
# 2024 -> ja, 1900 -> nein, 2000 -> ja`],
    ['table', ['Jahr', '% 4 == 0', '% 100 != 0', '% 400 == 0', 'Schaltjahr?'], [
      ['2024', 'True', 'True', 'False', '**ja** (erste Klammer wahr)'],
      ['1900', 'True', 'False', 'False', '**nein**'],
      ['2000', 'True', 'False', 'True', '**ja** (400er-Regel)'],
      ['2023', 'False', 'True', 'False', '**nein**'],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Ein Onlineshop berechnet Versandkosten: Bestellwert unter 20 € kostet 4,95 € Versand, ab 20 € bis unter 50 € kostet 2,95 €, ab 50 € ist der Versand kostenlos. Schreiben Sie das Programm.', [['code', 'python', `wert = float(input("Bestellwert in Euro: "))
if wert >= 50:
    versand = 0.0
elif wert >= 20:
    versand = 2.95
else:
    versand = 4.95
print(f"Versand: {versand:.2f} €, Gesamt: {wert + versand:.2f} €")`], 'Die strengste Grenze (>= 50) steht zuerst.'], 4],
    ['qa', 'Was gibt der folgende Code für `x = 15` aus? `if x > 10: print("A")` / `if x > 5: print("B")` / `else: print("C")`', ['Ausgabe: `A` und dann `B`.', 'Es sind **zwei getrennte** `if`-Anweisungen. Das erste `if` gibt `A` aus. Das zweite `if` mit seinem `else` ist unabhängig davon: 15 > 5 ist wahr, also `B`. Mit `elif` statt dem zweiten `if` wäre nur `A` ausgegeben worden.'], 3],
    ['qa', 'Schreiben Sie eine Prüfung für ein Passwort: Es muss mindestens 8 Zeichen lang sein und mindestens eine Ziffer enthalten. Geben Sie eine passende Meldung aus.', [['code', 'python', `pw = input("Passwort: ")
hat_ziffer = False
for z in pw:
    if z.isdigit():
        hat_ziffer = True

if len(pw) < 8:
    print("Zu kurz (mindestens 8 Zeichen)")
elif not hat_ziffer:
    print("Mindestens eine Ziffer nötig")
else:
    print("Passwort ok")`]], 5],
    ['qa', 'Formulieren Sie die Bedingung "x liegt **nicht** zwischen 1 und 10 (inklusive)" auf zwei verschiedene Arten.', ['- `not (1 <= x <= 10)`', '- `x < 1 or x > 10`', 'Das ist das **De-Morgan-Gesetz**: `not (a and b)` ist gleich `(not a) or (not b)`.'], 3],
    ['quiz', [
      {q: 'Welche Ausgabe hat: x = 0; if x: print("A") else: print("B")?', o: ['B', 'A', 'Fehler', 'Nichts'], a: 0, e: '0 ist falsy.'},
      {q: 'Wie viele Zweige einer if/elif/else-Kette werden höchstens ausgeführt?', o: ['Genau einer', 'Alle wahren', 'Keiner', 'Zwei'], a: 0, e: 'Nach dem ersten wahren Zweig wird der Rest übersprungen; mit else läuft immer genau einer.'},
      {q: 'Was ergibt True or False and False?', o: ['True', 'False', 'Fehler', 'None'], a: 0, e: 'and bindet stärker: True or (False and False) = True or False = True.'},
      {q: 'Was ist der Standardfall bei match?', o: ['case _:', 'default:', 'else:', 'case *:'], a: 0, e: 'Der Unterstrich passt auf alles.'},
      {q: 'Welche Bedingung ist für "Wochenende" korrekt?', o: ['tag == "Sa" or tag == "So"', 'tag == "Sa" or "So"', 'tag == "Sa" and tag == "So"', 'tag = "Sa" or "So"'], a: 0, e: '"So" allein ist immer truthy; jede Seite braucht einen eigenen Vergleich.'},
      {q: 'Was bedeutet Kurzschlussauswertung bei a and b?', o: ['b wird nicht ausgewertet, wenn a falsch ist', 'a wird übersprungen', 'Beide werden immer ausgewertet', 'Es tritt ein Fehler auf'], a: 0, e: 'Das Ergebnis steht dann bereits fest.'},
    ]],
    ['see', ['eua-kontroll', 'course-python-05']],
  ],
});
