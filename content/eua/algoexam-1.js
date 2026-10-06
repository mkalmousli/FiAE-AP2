AP2.page('eua-algoexam', {
  b: 'eua', g: 'Prüfungspraxis', t: 'Typische Prüfungsalgorithmen, Schreibtischtest und Fehlersuche',
  d: 'Die Algorithmen in der AP2 sind selten "berühmte" Verfahren, sondern **kleine Alltagsaufgaben**: ein **Menü** mit Fallauswahl, **Mittelwert und größte Abweichung**, **Umrechnung** (Grad/Minuten/Sekunden), **Preisberechnung** mit Fallunterscheidungen, **Prüfziffer**, **Suche** in einer Liste, **Fehler im Pseudocode** finden. Dazu kommt das manuelle Durchspielen eines Algorithmus im **Schreibtischtest** (Trace-Tabelle, auch "Whitebox-Test" genannt). Wer die Bausteine Sequenz, Auswahl, Fallauswahl, Schleifen sicher kombiniert und als **Struktogramm, PAP oder Code** darstellen kann, holt hier viele Punkte.',
  m: '**Erst verstehen, dann zeichnen:** Eingaben, Ausgaben, Variablen notieren. **Menü = fußgesteuerte Schleife (bis Eingabe 0) + Fallauswahl.** **Größte Abweichung = Maximum von |Mittel - Wert|.** **Pseudocode-Fehler: Vergleichsoperator verdreht (< statt >), falsche Logik (!= statt ==), Grenze vergessen (>= statt >).** **Trace-Tabelle: eine Spalte je Variable, eine Zeile je Änderung.**',
  cheat: [
    ['Bausteine', ['Sequenz', 'Auswahl (if/else)', 'Fallauswahl (switch/match)', 'kopf-/fußgesteuerte und Zählschleife']],
    ['Standardaufgaben', ['Summe, Mittelwert, Zähler', 'Minimum/Maximum mit Startwert', 'lineare Suche mit Flag', 'Gruppenwechsel']],
    ['Darstellung', ['Struktogramm DIN 66261', 'PAP DIN 66001', 'Pseudocode', 'Programmcode']],
    ['Testen', ['Schreibtischtest (Trace)', 'Whitebox: jeder Zweig einmal', 'Blackbox: Äquivalenzklassen', 'Grenzwerte, leere Eingabe']],
  ],
  blocks: [
    ['h', '1. Menüsteuerung (Winter 2023/24, Struktogramm)'],
    ['p', 'Optionen 0 bis 4, jede andere Eingabe löscht den Bildschirm und zeigt das Menü erneut. Das Menü soll so lange erscheinen, bis 0 eingegeben wird. Weil das Menü **mindestens einmal** angezeigt werden muss, passt eine **fußgesteuerte Schleife** (wiederhole ... solange).'],
    ['diagram', AP2.dg.nsd([
      ['until', 'wiederhole, solange wahl ≠ 0', [
        ['act', 'Bildschirm löschen'],
        ['act', 'Ausgabe: 1 neuer Datensatz / 2 anzeigen / 3 korrigieren / 4 löschen / 0 Ende'],
        ['act', 'Eingabe: wahl'],
        ['case', 'wahl', [
          ['1', [['act', 'anlegen()']]],
          ['2', [['act', 'anzeigen()']]],
          ['3', [['act', 'korrigieren()']]],
          ['4', [['act', 'loeschen()']]],
          ['0', [['act', 'Ende']]],
          ['sonst', [['act', '(nichts)']]],
        ]],
      ]],
    ], {w: 600, cap: 'Fußgesteuerte Schleife mit Fallauswahl: Bei ungültiger Eingabe passiert nichts, die Schleife beginnt mit "Bildschirm löschen" neu.'})],
    ['codes', [
      ['csharp', `int wahl;
do
{
    Console.Clear();
    Console.WriteLine("1 neuen Datensatz anlegen\\n2 Daten anzeigen\\n3 Daten korrigieren\\n4 Daten löschen\\n0 Beenden");
    Console.Write("Ihre Wahl: ");
    int.TryParse(Console.ReadLine(), out wahl) ;       // ungültig -> 0? Vorsicht, siehe unten
    switch (wahl)
    {
        case 1: Anlegen(); break;
        case 2: Anzeigen(); break;
        case 3: Korrigieren(); break;
        case 4: Loeschen(); break;
        case 0: break;
        default: break;                                 // Menü wird neu angezeigt
    }
} while (wahl != 0);`],
      ['python', `while True:
    print("1 neuen Datensatz anlegen\\n2 Daten anzeigen\\n3 Daten korrigieren\\n4 Daten löschen\\n0 Beenden")
    wahl = input("Ihre Wahl: ")
    match wahl:
        case "1": anlegen()
        case "2": anzeigen()
        case "3": korrigieren()
        case "4": loeschen()
        case "0": break                 # beendet die while-Schleife
        case _: print("\\n" * 30)       # "Bildschirm löschen", Menü neu`],
    ]],
    ['note', 'Vorsicht bei `int.TryParse`: Bei Buchstaben liefert es `false` und setzt `wahl` auf 0, das Programm würde beendet. Sauberer: `if (!int.TryParse(..., out wahl)) wahl = -1;`. In Python vergleicht man direkt Strings und vermeidet so die Umwandlung.'],
    ['h', '2. Pseudocode-Fehler finden (AP1 Winter 2025/26)'],
    ['p', 'Anforderung: Eine Funktion soll `true` liefern, wenn ein Gerät **älter als drei Jahre** ist, einen **Anschaffungswert über 950 €** hatte **und** zur **IT-Abteilung** gehört.'],
    ['code', 'pseudo', `1  function boolean pruefeGeraet(int alter, double anschaffungswert, string abteilung)
2      if alter < 3:
3          if anschaffungswert < 950
4              if abteilung != "IT":
5                  return true
6              endif
7          endif
8      endif
9      return false
10 endfunction`],
    ['table', ['Zeile', 'Fehler', 'Korrektur'], [
      ['2', '`alter < 3` prüft "jünger als drei Jahre"', '`if alter > 3:` (älter als drei Jahre)'],
      ['3', '`anschaffungswert < 950` prüft "unter 950 €"; außerdem fehlt der Doppelpunkt', '`if anschaffungswert > 950:`'],
      ['4', '`abteilung != "IT"` liefert true für alle **anderen** Abteilungen', '`if abteilung == "IT":`'],
    ]],
    ['tip', 'Kürzer und weniger fehleranfällig ist eine einzige Bedingung: `return alter > 3 and anschaffungswert > 950 and abteilung == "IT"`. In der Prüfung lohnt es sich, diese Vereinfachung als Zusatz zu nennen.'],
    ['h', '3. Umrechnung Sexagesimal in Dezimal (Sommer 2022, 10 Punkte)'],
    ['p', 'Koordinaten wie `49° 0\' 33,228"` (Grad, Bogenminuten, Bogensekunden) sollen in Dezimalgrad umgerechnet werden. 1° = 60\' = 3600". Also: **dezimal = Grad + Minuten / 60 + Sekunden / 3600**.'],
    ['diagram', AP2.dg.nsd([
      ['act', 'teile = sexaWert an den Leerzeichen trennen   // ["49°", "0\'", "33,228″"]'],
      ['act', 'grad = Zahl(teile[0] ohne "°")'],
      ['act', 'minute = Zahl(teile[1] ohne "\'")'],
      ['act', 'sekunde = Zahl(teile[2] ohne ″, Komma durch Punkt ersetzen)'],
      ['act', 'dezWert = grad + minute / 60 + sekunde / 3600'],
      ['act', 'Rückgabe dezWert'],
    ], {w: 560, cap: 'sexa2dez(49° 0\' 33,228″) = 49 + 0/60 + 33,228/3600 = 49,00923'})],
    ['code', 'python', `def sexa2dez(sexa_wert):
    teile = sexa_wert.split(" ")
    grad = float(teile[0].replace("°", ""))
    minute = float(teile[1].replace("\'", ""))
    sekunde = float(teile[2].replace("\\"", "").replace(",", "."))
    return grad + minute / 60 + sekunde / 3600

print(round(sexa2dez("49° 0\' 33,228\\""), 6))   # 49.00923`],
    ['h', '4. Preisberechnung mit Unterfunktion (Sommer 2022, 25 Punkte)'],
    ['p', 'Kurierfahrt: Preis nach Kilometern (3 € je angefangenem km) oder Pauschale, wenn Start **und** Ziel in Zone 1 (8 €, Radius 4 km) bzw. Zone 2 (12 €, Radius 6 km) liegen; der günstigere Preis gilt. Schnellzustellung kostet 5 € Aufpreis. Die **Entfernung** wird mehrfach gebraucht und deshalb in eine **Unterfunktion** ausgelagert (Pythagoras auf der Ebene: 1° Breite = 111,13 km, 1° Länge = 71,44 km).'],
    ['code', 'java', `static double distanz(double lon1, double lat1, double lon2, double lat2) {
    double dLat = (lat2 - lat1) * 111.13;
    double dLon = (lon2 - lon1) * 71.44;
    return Math.sqrt(dLat * dLat + dLon * dLon);       // Pythagoras
}

static double calcPreis(double startLon, double startLat, double zielLon, double zielLat, boolean schnell) {
    final double ZLON = 8.403903, ZLAT = 49.009230;    // Mittelpunkt Marktplatz
    double dStart = distanz(ZLON, ZLAT, startLon, startLat);
    double dZiel  = distanz(ZLON, ZLAT, zielLon, zielLat);
    double km = distanz(startLon, startLat, zielLon, zielLat);
    double preis = Math.ceil(km) * 3.0;                 // je ANGEFANGENEM km

    if (dStart <= 4 && dZiel <= 4)      preis = Math.min(preis, 8.0);
    else if (dStart <= 6 && dZiel <= 6) preis = Math.min(preis, 12.0);
    // zonenübergreifend: Kilometerpreis

    if (schnell) preis += 5.0;
    return preis;
}`],
    ['h3', 'Testvektor dazu (Sommer 2022, 5 Punkte)'],
    ['table', ['Eingabe (Szenario)', 'Erwartet', 'Begründung'], [
      ['Start = Ziel (Distanz 0), günstig', '0,00 € (oder Mindestpreis laut Vorgabe)', 'Grenzfall: angefangener km bei 0'],
      ['0,2 km innerhalb Zone 1, günstig', '3,00 €', 'Kilometerpreis ist günstiger als die Pauschale 8 €'],
      ['3,5 km innerhalb Zone 1, schnell', '8 € + 5 € = 13,00 €', '4 km · 3 € = 12 € > Pauschale 8 €'],
      ['Ziel genau auf der Zonengrenze (4,0 km)', 'Zone 1 gilt (<=)', 'Grenzwert: hier zeigen sich Fehler wie < statt <='],
      ['Start in Zone 1, Ziel außerhalb Zone 2, 7,3 km', '8 km · 3 € = 24,00 €', 'Zonenübergreifend, Kilometerpreis'],
    ]],
    ['p', 'Mögliche Gründe für Fehlschläge: Rundung ("angefangener km" vergessen), Vergleich `<` statt `<=` an der Zonengrenze, vertauschte Längen- und Breitengrade, Gleitkommaungenauigkeit beim Vergleich.'],
  ],
});
