AP2.add('eua-algoexam', [
  ['h', '5. Schreibtischtest / Whitebox-Test (Sommer 2023, 8 Punkte)'],
  ['p', 'Beim **Schreibtischtest** spielt man den Algorithmus von Hand durch und notiert nach jedem Schritt die Werte aller Variablen in einer **Trace-Tabelle**. Ein **Whitebox-Test** wählt die Testdaten so, dass **jeder Zweig** (jede Bedingung einmal wahr und einmal falsch) mindestens einmal durchlaufen wird (**Zweigüberdeckung**). Dafür muss man den Code kennen, im Gegensatz zum Blackbox-Test.'],
  ['p', 'Algorithmus aus der Prüfung: Mittelwert von 4 Temperaturen bilden, größte Abweichung suchen (`wenn abw² < (mittel - temp[i])²` dann `abw = mittel - temp[i]`, bei negativem Wert Vorzeichen umkehren), Rückgabe `2 · Ganzzahl(mittel)`, plus 1, wenn `abw > schwelle`.'],
  ['ex', ['Testdaten: temp = [2, 3, 5, 2], schwelle = 1. So werden **beide** Zweige der Betragsbildung (abw < 0) und der Schwellenprüfung (abw > schwelle) erreicht.']],
  ['table', ['Schritt', 'i', 'temp[i]', 'mittel - temp[i]', 'Bedingung abw² < (...)²', 'abw', 'rueck'], [
    ['Mittelwert', '', '', '', '', '', 'mittel = 12 / 4 = 3'],
    ['Start', '', '', '', '', '0', ''],
    ['Schleife', '0', '2', '1', '0 < 1 wahr', '1', ''],
    ['Schleife', '1', '3', '0', '1 < 0 falsch', '1', ''],
    ['Schleife', '2', '5', '-2', '1 < 4 wahr -> abw = -2, negativ -> 2', '2', ''],
    ['Schleife', '3', '2', '1', '4 < 1 falsch', '2', ''],
    ['Rückgabe', '', '', '', 'abw = 2 > schwelle 1', '2', '2 · 3 + 1 = **7**'],
  ]],
  ['p', 'Interpretation des Rückgabewerts 7: ungerade -> Fehlerbit gesetzt (Abweichung zu groß), Mittelwert = 7 // 2 = 3.'],
  ['tip', 'Trace-Tabellen schnell und fehlerfrei: (1) für **jede Variable eine Spalte**, (2) nur **Änderungen** eintragen, (3) bei Schleifen den **Zähler** mitschreiben, (4) Bedingungen ausrechnen und wahr/falsch notieren. Die Aufgabenstellung "Sollte eine Variable unterschiedliche Werte haben, so soll der letzte Wert abgespeichert werden" bedeutet: In der Abgabetabelle steht nur der **Endwert** je Variable.'],
  ['h', '6. Prüfziffer berechnen (AP1 Winter 2024/25)'],
  ['p', 'Kundennummern, ISBN, IBAN oder EAN enthalten eine **Prüfziffer**, die Tippfehler erkennt. Ein einfaches Verfahren (Modulo 10 mit Gewichtung 1 und 2, ähnlich Luhn): Die ersten neun Ziffern abwechselnd mit 1 und 2 multiplizieren, Quersummen der Produkte addieren, Prüfziffer = (10 - Summe mod 10) mod 10.'],
  ['codes', [
    ['python', `def pruefziffer_ok(nummer):
    if len(nummer) != 10 or not nummer.isdigit():
        return False
    summe = 0
    for i in range(9):
        produkt = int(nummer[i]) * (1 if i % 2 == 0 else 2)
        summe += produkt // 10 + produkt % 10      # Quersumme (zum Beispiel 14 -> 1 + 4)
    pz = (10 - summe % 10) % 10
    return pz == int(nummer[9])`],
    ['pseudo', `FUNKTION pruefzifferOk(nummer: Text): Wahrheitswert
    WENN Länge(nummer) <> 10 DANN GIB falsch ZURÜCK
    summe = 0
    FÜR i = 0 BIS 8
        gewicht = 1 WENN i gerade, SONST 2
        produkt = Ziffer(nummer[i]) * gewicht
        summe = summe + produkt DIV 10 + produkt MOD 10
    ENDE FÜR
    pz = (10 - summe MOD 10) MOD 10
    GIB (pz = Ziffer(nummer[9])) ZURÜCK
ENDE FUNKTION`],
  ]],
  ['note', 'In der Prüfung ist das genaue Verfahren immer vorgegeben. Wichtig ist die Technik: **Ziffern einzeln aus einem String holen** (`int(s[i])`, `s[i] - \'0\'` in C#/Java), **Modulo** und **ganzzahlige Division** für Quersumme bzw. letzte Ziffer.'],
  ['h', '7. Die Standardmuster zum Auswendiglernen'],
  ['codes', [
    ['python', `# Summe und Durchschnitt
summe = 0
for w in werte:
    summe += w
schnitt = summe / len(werte) if werte else 0

# Maximum mit Position
maxi, pos = werte[0], 0
for i in range(1, len(werte)):
    if werte[i] > maxi:
        maxi, pos = werte[i], i

# Zählen mit Bedingung
anzahl = 0
for w in werte:
    if w > 300:
        anzahl += 1

# Lineare Suche mit Abbruch
gefunden = -1
i = 0
while i < len(werte) and gefunden == -1:
    if werte[i] == gesucht:
        gefunden = i
    i += 1`],
    ['csharp', `double summe = 0;
foreach (double w in werte) summe += w;
double schnitt = werte.Length > 0 ? summe / werte.Length : 0;

double maxi = werte[0]; int pos = 0;
for (int i = 1; i < werte.Length; i++)
    if (werte[i] > maxi) { maxi = werte[i]; pos = i; }

int anzahl = 0;
foreach (double w in werte) if (w > 300) anzahl++;

int gefunden = -1;
for (int i = 0; i < werte.Length && gefunden == -1; i++)
    if (werte[i] == gesucht) gefunden = i;`],
  ]],
  ['warn', 'Minimum/Maximum: Startwert **nie 0**, sondern das **erste Element** oder ein Wert außerhalb des Wertebereichs (in der Mensa-Aufgabe "7" für Schulnoten). Mit 0 als Startwert findet man bei lauter positiven Zahlen nie ein Minimum.'],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erstellen Sie ein Struktogramm: Der Benutzer gibt beliebig viele Messwerte ein, die Eingabe von -1 beendet die Eingabe. Danach werden Anzahl, Durchschnitt und größter Wert ausgegeben (bei 0 Werten eine Meldung).', [['diagram', AP2.dg.nsd([
    ['act', 'anzahl = 0, summe = 0, maxi = -1'],
    ['act', 'Eingabe: wert'],
    ['while', 'solange wert ≠ -1', [
      ['act', 'anzahl = anzahl + 1;  summe = summe + wert'],
      ['if', 'wert > maxi ?', [['act', 'maxi = wert']], []],
      ['act', 'Eingabe: wert'],
    ]],
    ['if', 'anzahl > 0 ?', [['act', 'Ausgabe: anzahl, summe / anzahl, maxi']], [['act', 'Ausgabe: keine Werte']]],
  ], {w: 520})], 'Vorlesen vor der Schleife ("priming read"), damit -1 sofort erkannt wird und nicht mitgezählt wird.'], 8],
  ['qa', 'Gegeben ist `x = 0; for i in range(1, 6): if i % 2 == 0: x = x + i else: x = x - 1`. Führen Sie einen Schreibtischtest durch. Welchen Wert hat x am Ende?', ['- i=1: ungerade, x = -1', '- i=2: gerade, x = 1', '- i=3: ungerade, x = 0', '- i=4: gerade, x = 4', '- i=5: ungerade, x = **3**'], 4],
  ['qa', 'Nennen Sie den Unterschied zwischen Whitebox- und Blackbox-Test und je ein Testverfahren.', ['**Whitebox:** Der Tester kennt den Quellcode und leitet Testfälle aus der Struktur ab, zum Beispiel **Anweisungs-, Zweig- oder Pfadüberdeckung**, Schreibtischtest.', '**Blackbox:** Testfälle werden nur aus der **Spezifikation** (Ein- und Ausgaben) abgeleitet, ohne den Code zu kennen, zum Beispiel **Äquivalenzklassen** und **Grenzwertanalyse**.'], 4],
  ['quiz', [
    {q: 'Welche Schleife passt für ein Menü, das mindestens einmal erscheinen muss?', o: ['Fußgesteuerte Schleife (do-while)', 'Kopfgesteuerte Schleife ohne Startwert', 'Zählschleife bis 10', 'Gar keine Schleife'], a: 0, e: 'Die Bedingung wird erst am Ende geprüft.'},
    {q: 'Was bedeutet Zweigüberdeckung?', o: ['Jeder Zweig jeder Verzweigung wird mindestens einmal durchlaufen', 'Jede Zeile wird einmal ausgeführt', 'Jeder mögliche Pfad wird getestet', 'Nur der Normalfall wird getestet'], a: 0, e: 'Stärker als Anweisungs-, schwächer als Pfadüberdeckung.'},
    {q: 'Wie berechnet man 49° 30\' in Dezimalgrad?', o: ['49,5', '49,3', '49,03', '49,05'], a: 0, e: '30/60 = 0,5.'},
    {q: 'Welchen Startwert sollte man für eine Maximumsuche wählen?', o: ['Das erste Element der Liste', '0', '1', 'Eine Zufallszahl'], a: 0, e: '0 versagt bei negativen Werten.'},
    {q: 'Was ergibt 47 // 10 und 47 % 10?', o: ['4 und 7', '4,7 und 0', '7 und 4', '5 und 3'], a: 0, e: 'Ganzzahlige Division und Rest.'},
  ]],
  ['see', ['ps-struktogramm', 'eua-pap', 'eua-pseudocode', 'eua-testfaelle', 'eua-dateien']],
]);
