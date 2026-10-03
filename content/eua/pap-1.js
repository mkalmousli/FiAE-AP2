AP2.page('eua-pap', {
  b: 'eua', g: 'Pseudocode und Ablaufdarstellung', t: 'Programmablaufplan (PAP, DIN 66001)',
  d: 'Ein **Programmablaufplan (PAP)** stellt den **Ablauf** eines Algorithmus mit **genormten Symbolen** (DIN 66001) und **Ablauflinien** dar. **Rechteck** = Operation, **Raute** = Verzweigung, **Parallelogramm** = Ein-/Ausgabe, **Oval (abgerundet)** = Start/Ende. Schleifen entstehen durch **Rückwärtspfeile**.',
  m: '**Oval = Anfang/Ende, Rechteck = tun, Raute = fragen (ja/nein), Parallelogramm = Ein-/Ausgabe, Doppelstrich-Rechteck = Unterprogramm.** Jede Raute hat **genau einen Eingang und zwei Ausgänge** mit "ja" und "nein".',
  cheat: [
    ['Symbole (DIN 66001)', ['**Abgerundetes Rechteck:** Start / Ende', '**Rechteck:** Operation (Berechnung, Zuweisung)', '**Raute:** Verzweigung (Bedingung)', '**Parallelogramm:** Ein-/Ausgabe', '**Rechteck mit Doppelstrichen:** Unterprogramm', '**Kreis:** Konnektor (Sprungmarke)']],
    ['Regeln', ['**Ein** Startsymbol', 'Ablauflinien mit **Pfeilen** (Richtung: oben nach unten, links nach rechts)', 'Verzweigung: Ausgänge **ja / nein** beschriften', 'Schleife: Pfeil **zurück** zur Bedingung']],
    ['Vergleich zu Struktogramm', ['PAP erlaubt **Sprünge** (unstrukturiert möglich)', 'Struktogramm: nur Folge, Auswahl, Wiederholung', 'Beide beschreiben **denselben Ablauf**']],
    ['Prüfungs-Tipp', ['Erst Symbole und Fluss zeichnen, dann beschriften', 'Mit Beispielwerten **durchspielen**', 'Variablen initialisieren (Summe = 0)']],
  ],
  blocks: [
    ['h', 'Wozu ein PAP?'],
    ['p', 'Ein PAP ist eine **grafische Planung** vor dem Programmieren. Man sieht auf einen Blick den Ablauf: wo gibt es Entscheidungen, wo Wiederholungen. Der PAP ist **sprachunabhängig** und deshalb besonders für die Abstimmung zwischen Fachabteilung und Entwicklern geeignet. Die Norm **DIN 66001** legt die Symbole fest.'],
    ['h', 'Die Symbole'],
    ['diagram', {w: 760, h: 220, keep: 620, cap: 'Die wichtigsten PAP-Symbole nach DIN 66001', nodes: [
      {id: 'a', k: 'term', x: 80, y: 50, t: 'Start / Ende', w: 120, h: 40}, {id: 'b', k: 'box', x: 250, y: 50, t: 'Operation', w: 120, h: 40}, {id: 'c', k: 'diamond', x: 430, y: 50, t: 'Bedingung', w: 140, h: 66}, {id: 'd', k: 'para', x: 610, y: 50, t: 'Ein-/Ausgabe', w: 140, h: 40},
      {id: 'e', k: 'proc2', x: 80, y: 160, t: 'Unterprogramm', w: 140, h: 40}, {id: 'f', k: 'circle', x: 250, y: 160, t: 'A', w: 40, h: 40}, {id: 'g', k: 'text', x: 430, y: 160, t: 'Ablauflinie mit Pfeil', fs: 12}, {id: 'h', k: 'text', x: 610, y: 160, t: 'Kommentar ----', fs: 12},
    ], edges: [{a: [330, 160], b: [530, 160], ea: 'none', k: 'plain'}]}],
    ['table', ['Symbol', 'Bedeutung', 'Beispiel'], [
      ['Abgerundetes Rechteck (Terminator)', 'Anfang oder Ende des Ablaufs', '"Start", "Ende"'],
      ['Rechteck', 'Operation: Zuweisung, Berechnung, Aufruf', '`summe = summe + zahl`'],
      ['Raute', 'Verzweigung: Bedingung, zwei Ausgänge "ja" und "nein"', '`zahl > 0 ?`'],
      ['Parallelogramm', 'Eingabe oder Ausgabe', '"zahl eingeben", "Ergebnis ausgeben"'],
      ['Rechteck mit zwei senkrechten Doppelstrichen', 'Unterprogramm (Aufruf einer Funktion)', '`ggT(a, b)`'],
      ['Kreis', 'Konnektor: Verbindung bei Seitenwechsel', '"A" und "A"'],
    ]],
    ['h', 'Beispiel 1: Verzweigung (größere von zwei Zahlen)'],
    ['diagram', {w: 560, h: 380, keep: 420, cap: 'PAP: Die größere von zwei Zahlen ausgeben', nodes: [
      {id: 's', k: 'term', x: 280, y: 24, t: 'Start', w: 90, h: 32}, {id: 'i', k: 'para', x: 280, y: 84, t: 'a, b eingeben', w: 170, h: 40}, {id: 'v', k: 'diamond', x: 280, y: 170, t: 'a > b ?', w: 150, h: 66},
      {id: 'ja', k: 'para', x: 150, y: 260, t: 'a ausgeben', w: 140, h: 40}, {id: 'nein', k: 'para', x: 410, y: 260, t: 'b ausgeben', w: 140, h: 40}, {id: 'e', k: 'term', x: 280, y: 345, t: 'Ende', w: 90, h: 32},
    ], edges: [{a: 's', b: 'i'}, {a: 'i', b: 'v'}, {a: 'v', b: 'ja', t: 'ja', via: [[150, 170]], lo: [-14, -12]}, {a: 'v', b: 'nein', t: 'nein', via: [[410, 170]], lo: [14, -12]}, {a: 'ja', b: 'e', via: [[150, 345]]}, {a: 'nein', b: 'e', via: [[410, 345]]}]}],
    ['h', 'Beispiel 2: Schleife (Summe der Zahlen von 1 bis n)'],
    ['diagram', {w: 640, h: 470, keep: 480, cap: 'PAP mit Schleife: Die Rückwärtskante von "i = i + 1" zur Raute bildet die Wiederholung.', nodes: [
      {id: 's', k: 'term', x: 260, y: 24, t: 'Start', w: 90, h: 32}, {id: 'i', k: 'para', x: 260, y: 84, t: 'n eingeben', w: 150, h: 40}, {id: 'ini', k: 'box', x: 260, y: 144, t: 'summe = 0; i = 1', w: 190, h: 40}, {id: 'v', k: 'diamond', x: 260, y: 230, t: 'i <= n ?', w: 150, h: 66},
      {id: 'a1', k: 'box', x: 260, y: 320, t: 'summe = summe + i', w: 190, h: 40, s: 'accent'}, {id: 'a2', k: 'box', x: 260, y: 380, t: 'i = i + 1', w: 190, h: 40, s: 'accent'}, {id: 'o', k: 'para', x: 520, y: 230, t: 'summe ausgeben', w: 160, h: 40}, {id: 'e', k: 'term', x: 520, y: 310, t: 'Ende', w: 90, h: 32},
    ], edges: [{a: 's', b: 'i'}, {a: 'i', b: 'ini'}, {a: 'ini', b: 'v'}, {a: 'v', b: 'a1', t: 'ja', lo: [16, 0]}, {a: 'a1', b: 'a2'}, {a: 'a2', b: 'v', via: [[110, 380], [110, 230]]}, {a: 'v', b: 'o', t: 'nein', lo: [0, -12]}, {a: 'o', b: 'e'}]}],
    ['p', 'Schreibtischtest für n = 3: i = 1: summe = 1. i = 2: summe = 3. i = 3: summe = 6. i = 4: 4 <= 3 ist falsch, Ausgabe **6**.'],
  ],
});
