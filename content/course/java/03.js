AP2.page('course-java-03', {
  b: 'course', g: 'Java', t: 'Java 3: Verzweigungen (if, else, switch, ternärer Operator)',
  d: 'Mit **Verzweigungen** reagiert ein Programm auf Bedingungen. `if (bedingung) { ... }` führt einen Block nur aus, wenn die Bedingung `true` ist; `else` und `else if` ergänzen weitere Fälle. Für den Vergleich eines Wertes mit vielen festen Möglichkeiten gibt es `switch`: klassisch mit `case ... break` (Achtung **Fall-through** ohne break) oder seit Java 14 als **switch-Ausdruck** mit Pfeilsyntax `case 1 -> ...`, der ohne break auskommt und einen Wert liefern kann. Der **ternäre Operator** `bedingung ? a : b` wählt zwischen zwei Werten.',
  m: '**Bedingung immer in runden Klammern, Block in geschweiften.** **`=` ist Zuweisung, `==` Vergleich, bei Strings `equals`.** **Klassischer switch: break nicht vergessen!** **Pfeil-switch: kein Fall-through, `default` deckt den Rest ab.** **Reihenfolge bei else if: strengste Bedingung zuerst.**',
  cheat: [
    ['if', ['`if (x > 0) { ... }`', '`else if (x == 0) { ... }`', '`else { ... }`', 'Klammern auch bei einer Zeile (Stil)']],
    ['switch klassisch', ['`switch (wahl) {`', '`case 1: ...; break;`', '`default: ...;`', 'ohne break: Fall-through']],
    ['switch modern', ['`case 1 -> anlegen();`', '`case 2, 3 -> ...;`', '`String t = switch (n) { case 1 -> "eins"; default -> "?"; };`', '`yield` in Blöcken']],
    ['Ternär', ['`x = b ? wert1 : wert2;`', '`String s = n >= 0 ? "pos" : "neg";`', 'nur für einfache Fälle']],
  ],
  blocks: [
    ['h', 'if, else if, else'],
    ['code', 'java', `int punkte = 84;
int note;
if (punkte >= 92) {
    note = 1;
} else if (punkte >= 81) {       // wird nur geprüft, wenn die erste Bedingung falsch war
    note = 2;
} else if (punkte >= 67) {
    note = 3;
} else if (punkte >= 50) {
    note = 4;
} else if (punkte >= 30) {
    note = 5;
} else {
    note = 6;
}
System.out.println("Note " + note);   // Note 2`],
    ['warn', '**Semikolon-Falle:** `if (x > 0);` beendet die if-Anweisung sofort (leere Anweisung). Der folgende Block läuft dann **immer**. **Klammer-Falle:** Ohne `{ }` gehört nur die **erste** Zeile zum if; weitere eingerückte Zeilen laufen immer. Deshalb immer geschweifte Klammern setzen.'],
    ['h', 'Strings vergleichen'],
    ['code', 'java', `String antwort = sc.nextLine();
if (antwort.equals("ja")) { ... }                  // exakt
if (antwort.equalsIgnoreCase("JA")) { ... }        // ohne Groß-/Kleinschreibung
if ("ja".equals(antwort)) { ... }                  // sicher, auch wenn antwort null ist
if (antwort.isEmpty()) { ... }                     // leerer String
if (antwort.startsWith("j")) { ... }`],
    ['h', 'Logische Verknüpfungen'],
    ['code', 'java', `int jahr = 2024;
boolean schaltjahr = (jahr % 4 == 0 && jahr % 100 != 0) || jahr % 400 == 0;

double strom = 1.5;
if (strom >= 0.05 && strom <= 2.0) {               // Grenzen eingeschlossen
    System.out.println("gültiger Messwert");
}`],
    ['h', 'switch klassisch (mit break)'],
    ['code', 'java', `int wahl = sc.nextInt();
switch (wahl) {
    case 1:
        anlegen();
        break;               // ohne break würde case 2 auch ausgeführt!
    case 2:
        anzeigen();
        break;
    case 3:
    case 4:                  // gewolltes Fall-through: 3 und 4 machen dasselbe
        bearbeiten();
        break;
    case 0:
        System.out.println("Ende");
        break;
    default:
        System.out.println("Ungültige Eingabe");
}`],
    ['h', 'switch modern (Pfeil-Syntax, ab Java 14)'],
    ['code', 'java', `switch (wahl) {
    case 1 -> anlegen();
    case 2 -> anzeigen();
    case 3, 4 -> bearbeiten();          // mehrere Werte, kein break nötig
    case 0 -> System.out.println("Ende");
    default -> System.out.println("Ungültige Eingabe");
}

// switch als AUSDRUCK: liefert einen Wert
String tagTyp = switch (tag) {
    case "Sa", "So" -> "Wochenende";
    case "Mo", "Di", "Mi", "Do", "Fr" -> "Werktag";
    default -> {
        System.out.println("Unbekannt: " + tag);
        yield "?";                       // yield gibt in einem Block den Wert zurück
    }
};`],
    ['table', ['', 'klassisch `case x:`', 'modern `case x ->`'], [
      ['break nötig?', 'Ja, sonst Fall-through', 'Nein'],
      ['Mehrere Werte', 'Untereinander stapeln', 'Komma: `case 3, 4 ->`'],
      ['Liefert Wert?', 'Nein', 'Ja (switch-Ausdruck)'],
      ['Erlaubte Typen', '`int`, `char`, `String`, `enum` (Wrapper)', 'dieselben, zusätzlich Pattern Matching ab Java 21'],
    ]],
    ['h', 'Ternärer Operator'],
    ['code', 'java', `int alter = 17;
String status = alter >= 18 ? "volljährig" : "minderjährig";
int max = a > b ? a : b;                 // Math.max(a, b)
System.out.println(anzahl + (anzahl == 1 ? " Artikel" : " Artikel insgesamt"));`],
    ['h', 'Struktogramm, Pseudocode und Java'],
    ['codes', [
      ['pseudo', `WENN wert >= 50 DANN
    AUSGABE "kostenlos"
SONST WENN wert >= 20 DANN
    AUSGABE "2,95 EUR"
SONST
    AUSGABE "4,95 EUR"
ENDE WENN`],
      ['java', `if (wert >= 50) {
    System.out.println("kostenlos");
} else if (wert >= 20) {
    System.out.println("2,95 EUR");
} else {
    System.out.println("4,95 EUR");
}`],
      ['python', `if wert >= 50:
    print("kostenlos")
elif wert >= 20:
    print("2,95 EUR")
else:
    print("4,95 EUR")`],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Implementieren Sie die Methode `istGut()` einer Klasse Kind: Sie liefert `true`, wenn `noteVorschultest` besser (kleiner) als 2,5 ist. Formulieren Sie zwei Varianten.', [['code', 'java', `public boolean istGut() {
    if (noteVorschultest < 2.5) {
        return true;
    } else {
        return false;
    }
}

// kürzer und besser:
public boolean istGut() {
    return noteVorschultest < 2.5;
}`]], 3],
    ['qa', 'Schreiben Sie einen switch-Ausdruck, der für eine Monatsnummer (1 bis 12) die Anzahl der Tage liefert (Februar 28).', [['code', 'java', `int tage = switch (monat) {
    case 2 -> 28;
    case 4, 6, 9, 11 -> 30;
    case 1, 3, 5, 7, 8, 10, 12 -> 31;
    default -> throw new IllegalArgumentException("Monat 1-12");
};`]], 4],
    ['qa', 'Was gibt folgender Code für x = 2 aus? `switch (x) { case 1: System.out.print("A"); case 2: System.out.print("B"); case 3: System.out.print("C"); break; default: System.out.print("D"); }`', ['**BC**. Bei x = 2 springt das Programm zu `case 2`, gibt B aus und läuft wegen des fehlenden break in `case 3` weiter (Fall-through), gibt C aus und stoppt beim break.'], 3],
    ['quiz', [
      {q: 'Was passiert bei einem klassischen switch ohne break?', o: ['Die nachfolgenden cases werden ebenfalls ausgeführt', 'Compilerfehler', 'Nur default läuft', 'Nichts'], a: 0, e: 'Fall-through.'},
      {q: 'Was liefert x > 5 ? "groß" : "klein" für x = 5?', o: ['"klein"', '"groß"', 'Fehler', 'null'], a: 0, e: '5 > 5 ist false.'},
      {q: 'Welche Bedingung prüft, ob s den Inhalt "ok" hat?', o: ['s.equals("ok")', 's == "ok"', 's = "ok"', 's.is("ok")'], a: 0, e: 'Inhaltsvergleich bei Objekten.'},
      {q: 'Was gibt yield in einem switch-Ausdruck zurück?', o: ['Den Wert eines case-Blocks', 'Den Index', 'Eine Exception', 'Nichts'], a: 0, e: 'Bei Blöcken mit { } im Pfeil-switch.'},
    ]],
    ['see', ['course-java-02', 'course-java-04', 'eua-kontroll']],
  ],
});
