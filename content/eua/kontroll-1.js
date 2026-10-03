AP2.page('eua-kontroll', {
  b: 'eua', g: 'Grundlagen der Programmierung', t: 'Kontrollstrukturen: Verzweigung und Schleifen',
  d: '**Kontrollstrukturen** steuern den **Ablauf** eines Programms. **Verzweigungen** (`if`/`else`, `switch`) führen Code nur **unter einer Bedingung** aus. **Schleifen** (`for`, `while`, `do-while`) **wiederholen** Code. Zusammen mit der **Sequenz** bilden sie alle Algorithmen.',
  m: '**Sequenz, Auswahl, Wiederholung.** `for` = **Anzahl bekannt**, `while` = **Bedingung zuerst** (kann 0-mal laufen), `do-while` = **Bedingung zuletzt** (mindestens 1-mal). Immer prüfen: **Wann endet die Schleife?** (sonst Endlosschleife).',
  cheat: [
    ['Verzweigung', ['`if (bedingung) { ... }`', '`else if (...) { ... }`, `else { ... }`', '`switch (wert) { case 1: ... break; default: ... }`', 'Bedingung ergibt `true` oder `false`']],
    ['Schleifen', ['**for:** `for (int i = 0; i < n; i++)`', '**while:** `while (bedingung) { ... }` (Prüfung **vorher**)', '**do-while:** `do { ... } while (bedingung);` (Prüfung **nachher**)', '**foreach:** `for (String s : liste)`']],
    ['Steuerung', ['`break;` Schleife **sofort beenden**', '`continue;` **nächster** Durchlauf', '`return;` Methode beenden', 'Verschachtelung: Schleife in Schleife']],
    ['Typische Fehler', ['**Off-by-one:** `<` statt `<=`', '**Endlosschleife:** Zähler nie verändert', '`=` statt `==` in der Bedingung', 'Semikolon hinter `if (...)`/`for (...)`']],
  ],
  blocks: [
    ['h', 'Verzweigungen: der Programmfluss wählt einen Weg'],
    ['p', 'Ohne Verzweigungen würde ein Programm immer dasselbe tun. Mit **if** entscheidet es anhand einer **Bedingung** (einem Ausdruck, der `true` oder `false` ergibt).'],
    ['codes', [
      ['java', `int punkte = 74;
String note;
if (punkte >= 92)      note = "1";
else if (punkte >= 81) note = "2";
else if (punkte >= 67) note = "3";   // trifft zu
else if (punkte >= 50) note = "4";
else                   note = "5";   // sonst-Fall`],
      ['csharp', `int punkte = 74;
string note;
if (punkte >= 92)      note = "1";
else if (punkte >= 81) note = "2";
else if (punkte >= 67) note = "3";   // trifft zu
else if (punkte >= 50) note = "4";
else                   note = "5";`],
      ['python', `punkte = 74
if punkte >= 92:
    note = "1"
elif punkte >= 81:
    note = "2"
elif punkte >= 67:       # trifft zu
    note = "3"
elif punkte >= 50:
    note = "4"
else:
    note = "5"`],
    ]],
    ['note', 'Die Bedingungen werden **von oben nach unten** geprüft, **die erste wahre gewinnt**, der Rest wird übersprungen. Deshalb müssen die Bedingungen in der richtigen Reihenfolge stehen (hier: von der höchsten Punktzahl zur niedrigsten).'],
    ['h3', 'switch (Mehrfachauswahl)'],
    ['p', 'Wenn **ein Wert** mit mehreren festen Fällen verglichen wird, ist `switch` übersichtlicher als viele `else if`. Wichtig in Java/C#: Ohne **`break`** läuft die Ausführung in den **nächsten Fall weiter** (fall-through).'],
    ['code', 'java', `int tag = 3;
switch (tag) {
    case 1: System.out.println("Montag");     break;
    case 2: System.out.println("Dienstag");   break;
    case 3: System.out.println("Mittwoch");   break;   // wird ausgegeben
    default: System.out.println("anderer Tag");
}`],
    ['h', 'Schleifen: Wiederholung'],
    ['diagram', {w: 760, h: 270, keep: 640, cap: 'Links: kopfgesteuerte Schleife (while). Rechts: fußgesteuerte Schleife (do-while).', nodes: [
      {id: 'a0', k: 'term', x: 110, y: 28, t: 'Start', w: 80, h: 32}, {id: 'a1', k: 'diamond', x: 110, y: 100, t: 'Bedingung?', w: 150, h: 70}, {id: 'a2', k: 'box', x: 110, y: 190, t: 'Anweisungen', w: 130, h: 40, s: 'accent'}, {id: 'a3', k: 'term', x: 270, y: 100, t: 'Ende', w: 70, h: 32},
      {id: 'b0', k: 'term', x: 500, y: 28, t: 'Start', w: 80, h: 32}, {id: 'b1', k: 'box', x: 500, y: 100, t: 'Anweisungen', w: 130, h: 40, s: 'accent'}, {id: 'b2', k: 'diamond', x: 500, y: 190, t: 'Bedingung?', w: 150, h: 70}, {id: 'b3', k: 'term', x: 670, y: 190, t: 'Ende', w: 70, h: 32},
    ], edges: [{a: 'a0', b: 'a1'}, {a: 'a1', b: 'a2', t: 'ja', lo: [16, 0]}, {a: 'a2', b: 'a1', via: [[28, 190], [28, 100]]}, {a: 'a1', b: 'a3', t: 'nein', lo: [0, -10]}, {a: 'b0', b: 'b1'}, {a: 'b1', b: 'b2'}, {a: 'b2', b: 'b1', via: [[640, 190], [640, 100]], t: 'ja', lo: [0, -2]}, {a: 'b2', b: 'b3', t: 'nein', lo: [0, 12]}]}],
    ['table', ['Schleife', 'Aufbau', 'Prüfung', 'Mindestens 1 Durchlauf?', 'Einsatz'], [
      ['**for**', '`for (Start; Bedingung; Schritt)`', 'Vor dem Durchlauf', 'nein', 'Anzahl der Durchläufe **bekannt**'],
      ['**while**', '`while (Bedingung)`', 'Vor dem Durchlauf', 'nein', 'Wiederholen, **solange** etwas gilt'],
      ['**do-while**', '`do { } while (Bedingung);`', 'Nach dem Durchlauf', '**ja**', 'Eingabe prüfen, Menü anzeigen'],
      ['**foreach**', '`for (Typ x : sammlung)`', 'Für jedes Element', 'nein', 'Alle Elemente einer Liste/eines Arrays'],
    ]],
  ],
});
