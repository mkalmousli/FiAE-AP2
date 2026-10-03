AP2.add('eua-kontroll', [
  ['codes', [
    ['java', `// for: Summe der Zahlen von 1 bis 5
int summe = 0;
for (int i = 1; i <= 5; i++) {
    summe += i;
}
System.out.println(summe);          // 15

// while: Wie oft passt 3 in 20?
int rest = 20, anzahl = 0;
while (rest >= 3) { rest -= 3; anzahl++; }   // anzahl = 6, rest = 2

// do-while: Eingabe, bis sie gültig ist (läuft mindestens einmal)
int eingabe;
do {
    eingabe = einlesen();
} while (eingabe < 1 || eingabe > 10);`],
    ['python', `# for: Summe der Zahlen von 1 bis 5
summe = 0
for i in range(1, 6):            # 1,2,3,4,5 (Ende ausgeschlossen!)
    summe += i
print(summe)                     # 15

# while
rest, anzahl = 20, 0
while rest >= 3:
    rest -= 3
    anzahl += 1                  # anzahl = 6, rest = 2

# do-while gibt es in Python nicht: Nachbildung
while True:
    eingabe = int(input())
    if 1 <= eingabe <= 10:
        break`],
  ]],
  ['h', 'Schreibtischtest: so verstehst du jeden Algorithmus'],
  ['p', 'Ein **Schreibtischtest** (Trace-Tabelle) führt den Code **von Hand** aus. Man legt eine Tabelle mit allen **Variablen** an und trägt nach **jedem Schritt** die Werte ein. In der Prüfung werden solche Aufgaben sehr oft gestellt.'],
  ['code', 'java', `int a = 10, b = 4, z = 0;
while (a >= b) {
    a = a - b;
    z = z + 1;
}`],
  ['table', ['Schritt', 'Bedingung a >= b', 'a', 'b', 'z'], [['Start', '-', '10', '4', '0'], ['1. Durchlauf', '10 >= 4 wahr', '6', '4', '1'], ['2. Durchlauf', '6 >= 4 wahr', '2', '4', '2'], ['Prüfung', '2 >= 4 falsch', '2', '4', '2 (Ende)']]],
  ['p', 'Ergebnis: **z = 2** (ganzzahliger Quotient 10 / 4) und **a = 2** (Rest 10 % 4). Der Algorithmus berechnet also **Division mit Rest durch wiederholtes Subtrahieren**.'],
  ['h', 'break, continue und verschachtelte Schleifen'],
  ['codes', [
    ['java', `// break: Schleife sofort beenden - erste Zahl > 10 finden
int[] zahlen = {3, 8, 12, 5, 20};
for (int z : zahlen) {
    if (z > 10) { System.out.println("Gefunden: " + z); break; }   // 12
}

// continue: nur gerade Zahlen ausgeben
for (int i = 1; i <= 6; i++) {
    if (i % 2 != 0) continue;     // ungerade überspringen
    System.out.println(i);        // 2, 4, 6
}

// Verschachtelt: kleines Einmaleins
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        System.out.print(i * j + "\\t");
    }
    System.out.println();
}`],
    ['csharp', `foreach (int z in new int[] {3, 8, 12, 5, 20}) {
    if (z > 10) { Console.WriteLine("Gefunden: " + z); break; }
}
for (int i = 1; i <= 6; i++) {
    if (i % 2 != 0) continue;
    Console.WriteLine(i);
}`],
  ]],
  ['h', 'Klassische Beispielaufgaben'],
  ['kv', [
    ['Fakultät n!', '`long f = 1; for (int i = 2; i <= n; i++) f *= i;`  (5! = 120)'],
    ['Maximum in einem Array', '`int max = a[0]; for (int i = 1; i < a.length; i++) if (a[i] > max) max = a[i];`'],
    ['Quersumme', '`while (n > 0) { s += n % 10; n /= 10; }`  (Quersumme von 345 = 12)'],
    ['FizzBuzz', 'Von 1 bis 100: durch 3 teilbar "Fizz", durch 5 "Buzz", durch beide "FizzBuzz", sonst die Zahl. **Wichtig:** Zuerst auf 15 prüfen.'],
    ['Schaltjahr', 'Ein Jahr ist Schaltjahr, wenn durch 4 teilbar **und** (nicht durch 100 teilbar **oder** durch 400 teilbar): `(j % 4 == 0 && j % 100 != 0) || j % 400 == 0`'],
  ]],
  ['warn', ['**Typische Fehler bei Schleifen:**', '- **Off-by-one:** `i <= n` statt `i < n` bei Arrays führt zu `ArrayIndexOutOfBoundsException`.', '- **Endlosschleife:** Die Variable in der Bedingung wird nie verändert (`while (i < 10) { ... }` ohne `i++`).', '- **Falscher Start:** Summenvariable nicht mit 0 initialisiert, Produkt nicht mit 1.', '- Semikolon: `for (...);` oder `if (x > 0);` beendet die Anweisung sofort, der folgende Block gehört nicht dazu.']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Welche Ausgabe erzeugt der Code? for (int i = 1; i <= 4; i++) { if (i == 3) continue; System.out.print(i + " "); }', 'Ausgabe: **1 2 4**. Bei i = 3 wird `continue` ausgeführt, der Rest des Durchlaufs (die Ausgabe) wird übersprungen, die Schleife läuft mit i = 4 weiter.', 3],
  ['qa', 'Schreiben Sie ein Programmstück, das alle durch 3 teilbaren Zahlen von 1 bis 30 summiert (Pseudocode oder Java).', ['`int summe = 0;`', '`for (int i = 1; i <= 30; i++) { if (i % 3 == 0) summe += i; }`', 'Ergebnis: 3 + 6 + ... + 30 = **165**.'], 5],
  ['qa', 'Welche Schleifenart verwenden Sie, wenn der Benutzer so lange zur Eingabe eines Passworts aufgefordert werden soll, bis es richtig ist? Begründen Sie.', 'Eine **fußgesteuerte Schleife (do-while)**. Die Eingabe muss **mindestens einmal** erfolgen, bevor die Bedingung geprüft werden kann. Die Anzahl der Versuche ist nicht vorher bekannt, daher keine `for`-Schleife.', 4],
  ['quiz', [
    {q: 'Wie oft läuft for (int i = 0; i < 5; i++)?', o: ['5-mal', '4-mal', '6-mal', 'Endlos'], a: 0, e: 'i = 0, 1, 2, 3, 4: fünf Durchläufe.'},
    {q: 'Welche Schleife läuft mindestens einmal?', o: ['do-while', 'while', 'for', 'foreach'], a: 0, e: 'Bei do-while wird die Bedingung erst nach dem Rumpf geprüft.'},
    {q: 'Was bewirkt break in einer Schleife?', o: ['Beendet die Schleife sofort', 'Überspringt nur den aktuellen Durchlauf', 'Startet die Schleife neu', 'Beendet das Programm'], a: 0, e: 'break verlässt die Schleife, continue springt zum nächsten Durchlauf.'},
    {q: 'Was ist ein typischer Fehler bei i <= array.length im for-Kopf?', o: ['Zugriff außerhalb des Arrays (Off-by-one)', 'Gar keiner', 'Compilerfehler', 'Schnellere Schleife'], a: 0, e: 'Gültige Indizes sind 0 bis length-1.'},
    {q: 'Was passiert bei while (true) ohne break?', o: ['Endlosschleife', 'Die Schleife läuft nie', 'Sie läuft genau einmal', 'Compilerfehler'], a: 0, e: 'Die Bedingung ist immer wahr, die Schleife endet nie.'},
  ]],
]);
