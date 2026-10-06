AP2.page('course-java-04', {
  b: 'course', g: 'Java', t: 'Java 4: Schleifen (for, while, do-while, for-each)',
  d: 'Java kennt vier Schleifenformen: die **Zählschleife** `for (init; bedingung; schritt)`, die **kopfgesteuerte** `while`-Schleife (prüft vorher, läuft eventuell nie), die **fußgesteuerte** `do ... while`-Schleife (läuft **mindestens einmal**) und die **for-each-Schleife** `for (Typ x : sammlung)` für Arrays und Collections. Mit `break` verlässt man die Schleife, mit `continue` springt man zum nächsten Durchlauf. In Struktogrammen entsprechen sie der Zählschleife, der kopfgesteuerten und der fußgesteuerten Schleife.',
  m: '**Anzahl bekannt: for. Unbekannt, eventuell 0-mal: while. Mindestens einmal (Menü, Eingabe prüfen): do-while.** **Alle Elemente lesen: for-each.** **Index-Grenze: `i < array.length` (nicht <=).** **do-while endet mit Semikolon: `} while (x != 0);`**',
  cheat: [
    ['for', ['`for (int i = 0; i < n; i++)`', 'rückwärts: `i = n - 1; i >= 0; i--`', 'Schrittweite: `i += 2`', 'Variable nur in der Schleife gültig']],
    ['while / do-while', ['`while (b) { ... }` kopfgesteuert', '`do { ... } while (b);` fußgesteuert', 'Abbruch im Rumpf herbeiführen', '`while (true)` + `break`']],
    ['for-each', ['`for (int x : zahlen)`', '`for (String s : liste)`', 'nur lesen, kein Index', 'Liste nicht währenddessen ändern']],
    ['Steuerung', ['`break` beendet Schleife', '`continue` nächster Durchlauf', 'Label: `aussen: for ...` + `break aussen;`', 'Endlosschleife vermeiden']],
  ],
  blocks: [
    ['h', 'Die for-Schleife (Zählschleife)'],
    ['code', 'java', `for (int i = 1; i <= 5; i++) {      // Start; Bedingung; Schritt
    System.out.println("Durchlauf " + i);
}
// Ablauf: i = 1 -> Bedingung prüfen -> Rumpf -> i++ -> Bedingung prüfen -> ...`],
    ['diagram', AP2.dg.nsd([['for', 'für i = 1 bis 5 (Schrittweite 1)', [['act', 'Ausgabe "Durchlauf " + i']]]], {w: 420, cap: 'Zählschleife im Struktogramm'})],
    ['code', 'java', `for (int i = 10; i >= 0; i -= 2) System.out.print(i + " ");   // 10 8 6 4 2 0

int summe = 0;
for (int i = 1; i <= 100; i++) {
    summe += i;
}
System.out.println(summe);          // 5050`],
    ['h', 'Die while-Schleife (kopfgesteuert)'],
    ['code', 'java', `double kapital = 1000;
int jahre = 0;
while (kapital < 2000) {            // Wie viele Jahre bis zur Verdopplung bei 5 %?
    kapital = kapital * 1.05;
    jahre++;
}
System.out.println(jahre + " Jahre");   // 15 Jahre`],
    ['h', 'Die do-while-Schleife (fußgesteuert)'],
    ['code', 'java', `Scanner sc = new Scanner(System.in);
int wahl;
do {
    System.out.println("1 Anlegen | 2 Anzeigen | 0 Ende");
    System.out.print("Ihre Wahl: ");
    wahl = Integer.parseInt(sc.nextLine());
    switch (wahl) {
        case 1 -> anlegen();
        case 2 -> anzeigen();
        case 0 -> System.out.println("Tschüss");
        default -> System.out.println("Ungültig");
    }
} while (wahl != 0);                // Semikolon nicht vergessen!`],
    ['diagram', AP2.dg.nsd([['until', 'solange wahl ≠ 0', [['act', 'Menü ausgeben'], ['act', 'Eingabe: wahl'], ['case', 'wahl', [['1', [['act', 'anlegen()']]], ['2', [['act', 'anzeigen()']]], ['0', [['act', 'Tschüss']]], ['sonst', [['act', 'Ungültig']]]]]]]], {w: 520, cap: 'Fußgesteuerte Schleife: Die Bedingung steht unten, der Rumpf läuft mindestens einmal.'})],
    ['h', 'Die for-each-Schleife'],
    ['code', 'java', `double[] temperaturen = {21.5, 23.0, 19.8};
double summe = 0;
for (double t : temperaturen) {     // "für jedes t in temperaturen"
    summe += t;
}
System.out.println(summe / temperaturen.length);

ArrayList<String> namen = new ArrayList<>(List.of("Anna", "Ben"));
for (String n : namen) {
    System.out.println(n.toUpperCase());
}`],
    ['warn', 'In einer for-each-Schleife darf die Collection **nicht verändert** werden (`namen.remove(n)`), sonst gibt es eine **ConcurrentModificationException**. Zum Löschen: `namen.removeIf(n -> n.startsWith("A"))`, einen `Iterator` mit `it.remove()` oder eine Index-Schleife **rückwärts**.'],
    ['h', 'break und continue'],
    ['code', 'java', `int[] werte = {4, 7, -1, 9};
for (int w : werte) {
    if (w < 0) break;             // bei negativem Wert abbrechen
    System.out.print(w + " ");    // 4 7
}
for (int w : werte) {
    if (w % 2 == 0) continue;     // gerade Zahlen überspringen
    System.out.print(w + " ");    // 7 -1 9
}

// Verschachtelte Schleifen mit Label verlassen
suche:
for (int z = 0; z < 3; z++) {
    for (int s = 0; s < 3; s++) {
        if (z * s == 2) {
            System.out.println("gefunden bei " + z + "," + s);
            break suche;          // beendet BEIDE Schleifen
        }
    }
}`],
    ['h', 'Welche Schleife wann?'],
    ['table', ['Schleife', 'Prüfung', 'Mindestdurchläufe', 'Typischer Einsatz'], [
      ['`for`', 'vor jedem Durchlauf', '0', 'Feste Anzahl, Index-Zugriff auf Arrays'],
      ['`while`', 'vor jedem Durchlauf (kopfgesteuert)', '0', 'Bis eine Bedingung eintritt, Datei lesen bis Ende'],
      ['`do-while`', 'nach jedem Durchlauf (fußgesteuert)', '**1**', 'Menü, Eingabe wiederholen bis gültig'],
      ['for-each', 'automatisch über alle Elemente', '0', 'Alle Elemente lesen, Summe, Ausgabe'],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Lesen Sie so lange Noten (1 bis 6) ein, bis 0 eingegeben wird. Ungültige Werte sollen abgelehnt werden. Geben Sie am Ende den Durchschnitt aus.', [['code', 'java', `Scanner sc = new Scanner(System.in);
int summe = 0, anzahl = 0, note;
do {
    System.out.print("Note (0 = Ende): ");
    note = Integer.parseInt(sc.nextLine());
    if (note >= 1 && note <= 6) {
        summe += note;
        anzahl++;
    } else if (note != 0) {
        System.out.println("Nur 1 bis 6!");
    }
} while (note != 0);
if (anzahl > 0) System.out.printf("Schnitt: %.2f%n", (double) summe / anzahl);`]], 5],
    ['qa', 'Geben Sie das kleine Einmaleins als Tabelle (1 bis 10) aus.', [['code', 'java', `for (int z = 1; z <= 10; z++) {
    for (int s = 1; s <= 10; s++) {
        System.out.printf("%4d", z * s);
    }
    System.out.println();
}`]], 3],
    ['quiz', [
      {q: 'Welche Schleife läuft mindestens einmal?', o: ['do-while', 'while', 'for', 'for-each'], a: 0, e: 'Fußgesteuert.'},
      {q: 'Wie oft läuft for (int i = 0; i < 5; i++)?', o: ['5-mal', '4-mal', '6-mal', 'endlos'], a: 0, e: 'i = 0 bis 4.'},
      {q: 'Was passiert bei for (int i = 0; i <= arr.length; i++) arr[i] = 0;?', o: ['ArrayIndexOutOfBoundsException beim letzten Durchlauf', 'Alles korrekt', 'Compilerfehler', 'Das erste Element wird übersprungen'], a: 0, e: 'Gültige Indizes 0 bis length-1.'},
      {q: 'Was beendet break suche; ?', o: ['Die mit suche markierte (äußere) Schleife', 'Nur die innere Schleife', 'Das Programm', 'Die Methode'], a: 0, e: 'Labeled break.'},
    ]],
    ['see', ['course-java-03', 'course-java-05', 'eua-kontroll', 'ps-struktogramm']],
  ],
});
