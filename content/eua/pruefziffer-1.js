AP2.page('eua-pruefziffer', {
  b: 'eua', g: 'Prüfungspraxis', t: 'Prüfziffer-Algorithmen: ISBN, EAN, Luhn und IBAN',
  d: 'Eine **Prüfziffer** erkennt Tipp- und Lesefehler in Nummern: Aus den übrigen Ziffern wird nach einer Regel (Gewichte, Summe, **Modulo**) eine Ziffer berechnet und angehängt. Bei der Eingabe rechnet das Programm nach und vergleicht. Prüfziffer-Algorithmen sind ein **Prüfungsklassiker**, weil sie Schleife, Zeichen-zu-Zahl-Umwandlung, Modulo und Verzweigung kombinieren.',
  m: '**ISBN-13/EAN-13:** Gewichte **1, 3, 1, 3 ...**, Summe, **Prüfziffer = (10 - Summe mod 10) mod 10**. **ISBN-10:** Gewichte **10 bis 2**, modulo **11**, 10 wird als **X** geschrieben. **Luhn:** von rechts jede zweite Ziffer **verdoppeln**, über 9 minus 9.',
  cheat: [
    ['ISBN-13 / EAN-13', ['12 Ziffern, Stelle 1, 3, 5 ... mal 1, Stelle 2, 4, 6 ... mal 3', 'Produkte aufsummieren', 'Prüfziffer = (10 - (Summe mod 10)) mod 10', 'Gültig, wenn die Summe aller 13 Stellen (gewichtet) durch 10 teilbar ist']],
    ['ISBN-10', ['9 Ziffern mal Gewicht 10, 9, ..., 2', 'Prüfziffer = (11 - (Summe mod 11)) mod 11', 'Ergebnis 10: X', 'Gesamtsumme mit Gewicht 1 für die Prüfziffer ist durch 11 teilbar']],
    ['Luhn (Kreditkarte, IMEI)', ['Von rechts (ohne Prüfziffer) jede zweite Ziffer verdoppeln', 'Ergebnis über 9: minus 9 (Quersumme)', 'Alle Ziffern summieren', 'Prüfziffer = (10 - Summe mod 10) mod 10']],
    ['IBAN (Modulo 97)', ['Ländercode und Prüfziffern nach hinten', 'Buchstaben in Zahlen (A = 10 ... Z = 35)', 'Rest bei Division durch 97 muss **1** sein', 'Erkennt fast alle Tipp- und Dreherfehler']],
  ],
  blocks: [
    ['h', 'ISBN-13 von Hand'],
    ['p', 'Beispiel **978-3-7585-3368-?**: Die ersten 12 Ziffern werden abwechselnd mit 1 und 3 gewichtet.'],
    ['table', ['Ziffer', '9', '7', '8', '3', '7', '5', '8', '5', '3', '3', '6', '8'], [
      ['Gewicht', '1', '3', '1', '3', '1', '3', '1', '3', '1', '3', '1', '3'],
      ['Produkt', '9', '21', '8', '9', '7', '15', '8', '15', '3', '9', '6', '24'],
    ], {first: true}],
    ['p', 'Summe = **134**. 134 mod 10 = 4. Prüfziffer = (10 - 4) mod 10 = **6**. Die vollständige ISBN lautet 978-3-7585-3368-**6**. Das abschließende "mod 10" sorgt dafür, dass bei Rest 0 die Prüfziffer 0 (und nicht 10) ist.'],
    ['tool', 'pruefziffer'],
    ['h', 'Als Algorithmus'],
    ['codes', [
      ['pseudo', `FUNKTION pruefeIsbn13(isbn: Text): Wahrheitswert
    ziffern := isbn ohne Bindestriche
    FALLS Länge(ziffern) <> 13 DANN RÜCKGABE falsch
    summe := 0
    FÜR i := 0 BIS 11
        z := Zahlenwert(ziffern[i])
        FALLS i MOD 2 = 0 DANN summe := summe + z
        SONST summe := summe + 3 * z
    ENDE FÜR
    pruef := (10 - summe MOD 10) MOD 10
    RÜCKGABE pruef = Zahlenwert(ziffern[12])
ENDE FUNKTION`],
      ['java', `static boolean pruefeIsbn13(String isbn) {
    String z = isbn.replace("-", "");
    if (z.length() != 13) return false;
    int summe = 0;
    for (int i = 0; i < 12; i++) {
        int ziffer = z.charAt(i) - '0';          // Zeichen in Zahl
        summe += (i % 2 == 0) ? ziffer : 3 * ziffer;
    }
    int pruef = (10 - summe % 10) % 10;
    return pruef == z.charAt(12) - '0';
}`],
      ['python', `def pruefe_isbn13(isbn: str) -> bool:
    z = isbn.replace("-", "")
    if len(z) != 13 or not z.isdigit():
        return False
    summe = sum(int(c) * (1 if i % 2 == 0 else 3) for i, c in enumerate(z[:12]))
    return (10 - summe % 10) % 10 == int(z[12])`],
    ]],
    ['tip', 'Zeichen in Zahl umwandeln: **ziffer = zeichen - \'0\'** (Java, C, C#) bzw. **int(zeichen)** (Python). Der ASCII-Wert von \'0\' ist 48, deshalb ergibt \'7\' - \'0\' = 55 - 48 = 7.'],
    ['h', 'Schreibtischtest'],
    ['p', 'Ein Schreibtischtest (Trace) verfolgt die Variablen Zeile für Zeile. Für die ersten vier Durchläufe mit 978-3-...:'],
    ['table', ['i', 'ziffer', 'Gewicht', 'summe danach'], [['0', '9', '1', '9'], ['1', '7', '3', '30'], ['2', '8', '1', '38'], ['3', '3', '3', '47'], ['...', '...', '...', '...'], ['11', '8', '3', '134']]],
    ['h', 'Was eine Prüfziffer erkennt'],
    ['list', ['**Einzelfehler** (eine Ziffer falsch): ISBN-13, ISBN-10, Luhn und IBAN erkennen alle.', '**Zahlendreher** benachbarter Ziffern: ISBN-10 und IBAN fast immer; ISBN-13 nicht, wenn sich die beiden Ziffern um 5 unterscheiden (zum Beispiel 1 und 6), weil 3 mal 5 = 15 und 1 mal 5 = 5 denselben Rest mod 10 haben.', 'Eine Prüfziffer schützt **nicht** vor absichtlicher Fälschung; dafür braucht man Signaturen oder kryptografische Hashes.']],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Berechnen Sie die Prüfziffer der EAN 400638133393?.', ['Gewichte 1, 3, 1, 3, ...: 4 mal 1 + 0 mal 3 + 0 mal 1 + 6 mal 3 + 3 mal 1 + 8 mal 3 + 1 mal 1 + 3 mal 3 + 3 mal 1 + 3 mal 3 + 9 mal 1 + 3 mal 3', '= 4 + 0 + 0 + 18 + 3 + 24 + 1 + 9 + 3 + 9 + 9 + 9 = **89**', 'Prüfziffer = (10 - 89 mod 10) mod 10 = (10 - 9) mod 10 = **1**'], 4],
    ['qa', 'Schreiben Sie eine Funktion in Pseudocode, die prüft, ob eine 10-stellige ISBN gültig ist (Prüfziffer X steht für 10).', [['code', 'pseudo', `FUNKTION pruefeIsbn10(isbn: Text): Wahrheitswert
    z := isbn ohne Bindestriche
    FALLS Länge(z) <> 10 DANN RÜCKGABE falsch
    summe := 0
    FÜR i := 0 BIS 8
        summe := summe + Zahlenwert(z[i]) * (10 - i)
    ENDE FÜR
    pruef := (11 - summe MOD 11) MOD 11
    FALLS pruef = 10 DANN soll := "X" SONST soll := Text(pruef)
    RÜCKGABE soll = z[9]
ENDE FUNKTION`]], 8],
    ['see', ['eua-algoexam', 'eua-kontroll', 'eua-bits', 'eua-pseudocode']],
    ['quiz', [
      {q: 'Welche Gewichte nutzt die ISBN-13?', o: ['abwechselnd 1 und 3', '10 bis 2', 'immer 2', '1 bis 13'], a: 0, e: 'Gleiche Gewichtung wie die EAN-13.'},
      {q: 'Summe 134 bei einer ISBN-13. Prüfziffer?', o: ['6', '4', '0', '134'], a: 0, e: '(10 - 134 mod 10) mod 10 = (10 - 4) mod 10 = 6.'},
      {q: 'Warum endet die Formel mit "mod 10"?', o: ['Damit bei Rest 0 die Prüfziffer 0 statt 10 ist', 'Damit die Summe kleiner wird', 'Damit X möglich ist', 'Das ist überflüssig'], a: 0, e: 'Ohne das letzte mod 10 käme bei Rest 0 der Wert 10 heraus, der keine Ziffer ist.'},
      {q: 'Wofür steht X bei der ISBN-10?', o: ['Für den Wert 10', 'Für einen Fehler', 'Für unbekannt', 'Für 0'], a: 0, e: 'Modulo 11 kann den Rest 10 liefern.'},
      {q: 'Wie wandelt man in Java das Zeichen \'7\' in die Zahl 7 um?', o: ["zeichen - '0'", "zeichen + '0'", "zeichen * 10", "(int) zeichen"], a: 0, e: "(int) '7' ergäbe den ASCII-Wert 55."},
      {q: 'Welcher Rest muss bei der IBAN-Prüfung herauskommen?', o: ['1', '0', '97', '10'], a: 0, e: 'Nach dem Umstellen und Umwandeln gilt: Zahl mod 97 = 1.'},
    ]],
  ],
});
