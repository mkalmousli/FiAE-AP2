AP2.add('eua-datentypen', [
  ['h', 'Operatoren'],
  ['table', ['Gruppe', 'Operatoren', 'Beispiel', 'Ergebnis'], [
    ['Arithmetisch', '`+  -  *  /  %`', '`7 + 2 * 3`', '13 (Punkt vor Strich)'],
    ['Ganzzahldivision (int)', '`/`', '`7 / 2`', '**3** (Nachkommastellen entfallen)'],
    ['Kommadivision', '`/` mit double', '`7 / 2.0`', '3.5'],
    ['Modulo (Rest)', '`%`', '`17 % 5`', '2 (17 = 3 mal 5 + 2)'],
    ['Inkrement / Dekrement', '`++  --`', '`i++` (i um 1 größer)', 'i = i + 1'],
    ['Zusammengesetzte Zuweisung', '`+=  -=  *=  /=`', '`x += 5`', 'x = x + 5'],
    ['Vergleich', '`==  !=  <  >  <=  >=`', '`5 != 3`', 'true'],
    ['Logisch', '`&&  ||  !  ^`', '`(5 > 3) && (2 > 4)`', 'false'],
    ['Zeichenketten', '`+` (verketten)', '`"Hallo " + "Welt"`', '"Hallo Welt"'],
    ['Bedingung (ternär)', '`? :`', '`x > 0 ? "pos" : "neg"`', 'je nach x'],
    ['Bitoperatoren', '`&  |  ^  ~  <<  >>`', '`5 & 3`  (0101 UND 0011)', '1 (0001)'],
  ]],
  ['warn', ['**Häufige Fehler:**', '- `=` (Zuweisung) mit `==` (Vergleich) verwechseln. `if (x = 5)` ist ein Fehler.', '- **Ganzzahldivision** übersehen: `int durchschnitt = summe / anzahl;` schneidet ab. Lösung: einen Operanden in `double` umwandeln.', '- **Zeichenketten mit `==` vergleichen** (in Java): Nutze `a.equals(b)`.', '- **Überlauf**: `int` zu klein für große Zahlen, dann `long` nutzen.']],
  ['h3', 'Rangfolge (Priorität)'],
  ['steps', ['Klammern `( )`', 'Unäre Operatoren: `!`, `++`, `--`, Vorzeichen', 'Multiplikation, Division, Modulo: `*  /  %` (Punkt)', 'Addition und Subtraktion: `+  -` (Strich)', 'Vergleiche: `<  >  <=  >=`, danach `==  !=`', 'Logisches UND `&&`, danach logisches ODER `||`', 'Zuweisung `=` zuletzt']],
  ['h3', 'Wahrheitstabellen'],
  ['table', ['A', 'B', 'A && B (UND)', 'A || B (ODER)', 'A ^ B (XOR)', '!A (NICHT)'], [['false', 'false', 'false', 'false', 'false', 'true'], ['false', 'true', 'false', 'true', 'true', 'true'], ['true', 'false', 'false', 'true', 'true', 'false'], ['true', 'true', 'true', 'true', 'false', 'false']], {first: false}],
  ['tip', '**UND** ist nur wahr, wenn **beide** wahr sind. **ODER** ist wahr, wenn **mindestens einer** wahr ist. **XOR** ist wahr, wenn **genau einer** wahr ist. **Kurzschluss:** Bei `a && b` wird `b` nicht mehr berechnet, wenn `a` schon `false` ist. Praktisch: `if (x != 0 && 10 / x > 2)` (kein Division-durch-0-Fehler).'],
  ['h', 'Typumwandlung (Casting)'],
  ['code', 'java', `int i = 7;
double d = i;                 // implizit: int -> double (kein Informationsverlust): 7.0
double pi = 3.99;
int abgeschnitten = (int) pi; // explizit: double -> int: 3 (Nachkommastellen weg!)
int summe = 7, anzahl = 2;
double mittel = (double) summe / anzahl;   // 3.5, NICHT 3.0
int zahl = Integer.parseInt("42");         // Text -> Zahl
String text = String.valueOf(42);          // Zahl -> Text`],
  ['h', 'Gleitkomma-Ungenauigkeit und Überlauf'],
  ['list', ['Kommazahlen werden **binär** gespeichert. Manche Dezimalbrüche (0,1) lassen sich nicht genau darstellen: `0.1 + 0.2` ergibt `0.30000000000000004`. Deshalb **nie** mit `==` auf Gleichheit prüfen, sondern mit Toleranz (`Math.abs(a - b) < 0.0001`). Für **Geldbeträge** nutzt man `BigDecimal` (Java) bzw. `decimal` (C#) oder rechnet in Cent als `long`.', '**Überlauf (Overflow):** Der Wertebereich ist begrenzt. `Integer.MAX_VALUE + 1` ergibt in Java **-2147483648** (der Zähler läuft "herum").']],
  ['h', 'Zahlensysteme'],
  ['table', ['Dezimal', 'Binär', 'Hexadezimal', 'Anmerkung'], [['10', '1010', 'A', 'Hex-Ziffern 0-9 und A-F (A = 10, F = 15)'], ['15', '1111', 'F', '4 Bit = 1 Hex-Ziffer'], ['255', '1111 1111', 'FF', 'Höchster Wert eines Bytes'], ['256', '1 0000 0000', '100', '2^8']]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Welche Werte haben a, b, c und d nach Ausführung? int a = 17 / 5; int b = 17 % 5; double c = 17 / 5; double d = 17 / 5.0;', ['**a = 3** (Ganzzahldivision), **b = 2** (Rest), **c = 3.0** (die Division 17 / 5 wird zuerst als int-Division zu 3 berechnet, dann zu 3.0), **d = 3.4**.'], 4],
  ['qa', 'Berechnen Sie den Wert von: boolean r = (5 > 3) || (10 / 0 > 1);  Warum tritt kein Fehler auf?', 'Ergebnis: **true**. Wegen der **Kurzschlussauswertung** wird die rechte Seite nicht ausgewertet, weil `5 > 3` bereits `true` ist und ein ODER dann sicher wahr ist. Die Division durch 0 wird deshalb nie ausgeführt.', 4],
  ['qa', 'Welche Datentypen wählen Sie für: a) Anzahl Mitarbeiter, b) Gehalt in Euro mit Cent, c) Ist der Kunde aktiv?, d) Postleitzahl?', ['- a) `int`', '- b) `double` oder besser `BigDecimal` / `decimal` (Geld rechnet man nicht mit Gleitkomma)', '- c) `boolean`', '- d) `String` (führende Nullen, keine Rechenoperationen, zum Beispiel "01067")'], 4],
  ['qa', 'Eine Variable x hat den Wert 5. Welche Werte haben x und y nach: int y = x++ + ++x;', ['`x++` liefert zuerst 5 (und erhöht x auf 6), `++x` erhöht x auf 7 und liefert 7. Also y = 5 + 7 = **12**, x = **7**. (Solche Ausdrücke vermeidet man im Code, sie kommen aber als Verständnisfrage vor.)'], 4],
  ['quiz', [
    {q: 'Was ergibt 7 / 2 in Java bei zwei int-Werten?', o: ['3', '3.5', '4', '3.0'], a: 0, e: 'Bei int-Division werden die Nachkommastellen abgeschnitten.'},
    {q: 'Was liefert 17 % 5?', o: ['2', '3', '3.4', '12'], a: 0, e: 'Modulo gibt den Rest: 17 = 3 mal 5 + 2.'},
    {q: 'Welcher Datentyp passt am besten für den Wert true oder false?', o: ['boolean', 'int', 'String', 'double'], a: 0, e: 'boolean (C#: bool) speichert Wahrheitswerte.'},
    {q: 'Welcher Ausdruck ist wahr, wenn mindestens eine der beiden Bedingungen gilt?', o: ['a || b', 'a && b', 'a ^ b', '!a'], a: 0, e: 'Das logische ODER ist wahr, wenn mindestens ein Operand wahr ist.'},
    {q: 'Warum sollte man Gleitkommazahlen nicht mit == vergleichen?', o: ['Wegen Rundungsfehlern bei der binären Darstellung', 'Weil == nur für Text gilt', 'Weil Gleitkommazahlen nie gleich sind', 'Weil der Compiler es verbietet'], a: 0, e: '0.1 + 0.2 ist nicht exakt 0.3.'},
    {q: 'Was bewirkt (int) 3.9?', o: ['Ergibt 3 (abgeschnitten)', 'Ergibt 4 (gerundet)', 'Ergibt 3.9', 'Fehler'], a: 0, e: 'Ein Cast auf int schneidet die Nachkommastellen ab.'},
  ]],
]);
