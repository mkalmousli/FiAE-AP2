AP2.page('course-css-04', {
  b: 'course', g: 'CSS', t: 'CSS 4: Grid Layout',
  d: '**CSS Grid** ist ein **zweidimensionales** Layoutsystem: Man definiert im Container mit `display: grid` ein **Raster** aus Spalten (`grid-template-columns`) und Zeilen (`grid-template-rows`) und platziert die Kinder darin, entweder automatisch der Reihe nach oder gezielt über **Linien** (`grid-column: 1 / 3`) bzw. **benannte Bereiche** (`grid-template-areas`). Die Einheit **`fr`** verteilt freien Platz anteilig, `repeat()` und `minmax()` vereinfachen Definitionen. Grid war in den BW-Prüfungen 2022, 2025 und 2025/26 gefragt.',
  m: '**Linien zählen ab 1; bei n Spalten gibt es n + 1 Linien. `grid-column: 1 / -1` = volle Breite.** **`span 2` = über zwei Spuren.** **`repeat(auto-fit, minmax(250px, 1fr))` = responsives Kachelraster ohne Media Query.** **grid-template-areas: Layout als "ASCII-Bild".**',
  cheat: [
    ['Container', ['`display: grid;`', '`grid-template-columns: 2fr 1fr 1fr;`', '`grid-template-rows: auto 1fr auto;`', '`gap: 10px;`']],
    ['Items platzieren', ['`grid-column: 1 / 3;`', '`grid-row: 2 / 5;`', '`grid-column: span 2;`', '`grid-column: 1 / -1;` volle Breite']],
    ['Funktionen', ['`repeat(4, 25vw)`', '`minmax(200px, 1fr)`', '`auto-fit` / `auto-fill`', '`fr` = Anteil']],
    ['Bereiche', ['`grid-template-areas: "kopf kopf" "nav inhalt";`', '`grid-area: kopf;`', '`.` = leere Zelle', 'per Media Query umstellen']],
  ],
  blocks: [
    ['h', 'Ein einfaches Raster'],
    ['code', 'css', `.menu-selection {
  display: grid;
  grid-template-columns: 120px 1fr 1fr 1fr;   /* Datum fest, drei Gerichte gleich breit */
  gap: 16px;
}`],
    ['p', 'Die Kinder füllen das Raster automatisch zeilenweise: Kind 1 in Spalte 1, Kind 2 in Spalte 2 usw., Kind 5 beginnt die zweite Zeile.'],
    ['h', 'Linien und Spannen'],
    ['code', 'css', `.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto repeat(3, 200px);
}
#ablauf  { grid-column: 1 / 5; }                     /* Linie 1 bis 5 = alle 4 Spalten */
#map     { grid-column: 1 / 4; grid-row: 2 / 5; }    /* 3 Spalten, 3 Zeilen */
#auftrag { grid-column: 4; grid-row: 2; }
#angebot { grid-column: 4; grid-row: 3; }
#buchung { grid-column: 4; grid-row: 4; }`],
    ['diagram', {w: 600, h: 200, keep: 460, cap: 'Spaltenlinien 1 bis 5 bei vier Spalten (Sommer 2022)', nodes: [
      {id: 'a', k: 'box', x: 300, y: 30, w: 540, h: 36, t: '#ablauf (1 / 5)', s: 'accent'},
      {id: 'm', k: 'box', x: 232, y: 120, w: 400, h: 130, t: '#map (1 / 4, Zeilen 2 / 5)', s: 'soft'},
      {id: 'u', k: 'box', x: 503, y: 75, w: 130, h: 40, t: '#auftrag'}, {id: 'g', k: 'box', x: 503, y: 120, w: 130, h: 40, t: '#angebot'}, {id: 'b', k: 'box', x: 503, y: 165, w: 130, h: 40, t: '#buchung'},
    ], edges: []}],
    ['h', 'Benannte Bereiche'],
    ['code', 'css', `.seite {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "kopf   kopf"
    "nav    inhalt"
    "fuss   fuss";
  min-height: 100vh;
}
header { grid-area: kopf; }
nav    { grid-area: nav; }
main   { grid-area: inhalt; }
footer { grid-area: fuss; }

@media (max-width: 700px) {                 /* mobil: alles untereinander */
  .seite {
    grid-template-columns: 1fr;
    grid-template-areas: "kopf" "nav" "inhalt" "fuss";
  }
}`],
    ['h', 'Prüfungsaufgabe Winter 2025/26: Hoch- und Querformat'],
    ['code', 'css', `#row  { display: grid; grid-template-columns: 1fr 1fr; align-content: center; }
#text { grid-column: 1 / 3; }               /* Hochformat: Text über beide Spalten */
@media (orientation: landscape) {
  #row  { grid-template-columns: 2fr 1fr 1fr; }
  #text { grid-column: 1 / 2; }             /* Querformat: alles in einer Zeile */
}`],
    ['h', 'Responsives Kachelraster ohne Media Query'],
    ['code', 'css', `.kacheln {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));   /* so viele Spalten wie passen */
  gap: 16px;
}`],
    ['h', 'Ausrichten im Grid'],
    ['table', ['Eigenschaft', 'Wirkt auf', 'Beispiel'], [
      ['`justify-items`', 'alle Items waagerecht in ihrer Zelle', '`center`'],
      ['`align-items`', 'alle Items senkrecht in ihrer Zelle', '`start`'],
      ['`justify-self` / `align-self`', 'ein einzelnes Item', '`end`'],
      ['`justify-content` / `align-content`', 'das ganze Raster im Container', '`center`'],
    ]],
    ['h', 'Grid oder Flexbox?'],
    ['table', ['', 'Grid', 'Flexbox'], [['Dimensionen', 'zwei (Zeilen und Spalten)', 'eine'], ['Ansatz', 'Raster vorgeben, Inhalte einsetzen', 'Inhalte bestimmen die Größe'], ['Typisch', 'Seitenlayout, Formular-Raster, Galerien', 'Leisten, Buttons, Zentrieren']]],
    ['h', 'Übungen'],
    ['qa', 'Erstellen Sie ein Grid-Layout: Kopfzeile über volle Breite, darunter links Navigation (200px) und rechts Inhalt, unten Fußzeile über volle Breite.', [['code', 'css', `.seite {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas: "kopf kopf" "nav inhalt" "fuss fuss";
}
header { grid-area: kopf; } nav { grid-area: nav; } main { grid-area: inhalt; } footer { grid-area: fuss; }`]], 5],
    ['quiz', [
      {q: 'Wie viele Spaltenlinien hat ein Grid mit 3 Spalten?', o: ['4', '3', '2', '6'], a: 0, e: 'n + 1.'},
      {q: 'Was bedeutet grid-column: 1 / -1?', o: ['Über alle Spalten', 'Nur die letzte Spalte', 'Rückwärts', 'Fehler'], a: 0, e: '-1 ist die letzte Linie.'},
      {q: 'Was macht 1fr?', o: ['Ein Anteil am freien Platz', '1 Pixel', '1 % der Breite', 'Eine Zeile'], a: 0, e: 'fraction.'},
      {q: 'Was erzeugt repeat(auto-fit, minmax(200px, 1fr))?', o: ['So viele mindestens 200px breite Spalten wie passen', 'Genau 200 Spalten', 'Eine Spalte', 'Zeilen von 200px'], a: 0, e: 'Responsives Raster.'},
    ]],
    ['see', ['course-css-03', 'course-css-05', 'eua-css']],
  ],
});
