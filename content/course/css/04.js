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
    ['result', {t: 'Grid-Raster', html: `<div class="menu-selection"><div class="d">Mo</div><div>Schnitzel</div><div>Pasta</div><div>Salat</div><div class="d">Di</div><div>Pizza</div><div>Suppe</div><div>Curry</div></div>`, css: `.menu-selection { display: grid; grid-template-columns: 120px 1fr 1fr 1fr; gap: 16px; }
.menu-selection div { background: #e3f2fd; border: 1px solid #64b5f6; padding: 12px; border-radius: 6px; }
.d { background: #ffe082 !important; font-weight: bold; }`, h: 200}],
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
    ['result', {t: 'Spannen über Linien', html: `<div class="grid-container"><div id="ablauf">#ablauf</div><div id="map">#map</div><div id="auftrag">#auftrag</div><div id="angebot">#angebot</div><div id="buchung">#buchung</div></div>`, css: `.grid-container { display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: auto repeat(3, 60px); gap: 6px; }
.grid-container > div { background: #c5cae9; padding: 6px; border-radius: 4px; }
#ablauf  { grid-column: 1 / 5; background: #ffcc80; }
#map     { grid-column: 1 / 4; grid-row: 2 / 5; background: #a5d6a7; }
#auftrag { grid-column: 4; grid-row: 2; }
#angebot { grid-column: 4; grid-row: 3; }
#buchung { grid-column: 4; grid-row: 4; }`, h: 260}],
    ['h', 'Einheiten und Funktionen im Grid'],
    ['table', ['Wert', 'Bedeutung'], [
      ['`1fr`', 'ein Anteil am verfügbaren Platz (`1fr 2fr`: zweite Spalte doppelt so breit)'],
      ['`auto`', 'so breit/hoch wie der Inhalt'],
      ['`120px`, `20%`', 'feste bzw. prozentuale Größe'],
      ['`repeat(3, 1fr)`', 'drei gleich breite Spalten'],
      ['`minmax(200px, 1fr)`', 'mindestens 200px, höchstens ein Anteil'],
      ['`repeat(auto-fit, minmax(200px, 1fr))`', 'so viele Spalten, wie passen: responsiv ohne Media Query'],
      ['`grid-column: 1 / 4`', 'von Linie 1 bis Linie 4 (= 3 Spalten); `span 2` = zwei Spalten breit'],
    ]],
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
    ['result', {t: 'grid-template-areas', html: `<div class="seite"><header>Kopf</header><nav>Navigation</nav><main>Inhalt</main><footer>Fuß</footer></div>`, css: `.seite { display: grid; grid-template-columns: 120px 1fr; grid-template-rows: auto 1fr auto; grid-template-areas:
  "kopf kopf"
  "nav inhalt"
  "fuss fuss";
  gap: 6px; height: 220px; }
header { grid-area: kopf; background: #ffcc80; }
nav { grid-area: nav; background: #b3e5fc; }
main { grid-area: inhalt; background: #c8e6c9; }
footer { grid-area: fuss; background: #d1c4e9; }
.seite > * { padding: 8px; border-radius: 4px; }`, h: 260}],
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
    ['result', {t: 'auto-fit und minmax', html: `<div class="kacheln"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div></div>`, css: `.kacheln { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; }
.kacheln div { background: #2c3e50; color: #fff; padding: 20px; text-align: center; border-radius: 6px; }`, h: 240}],
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
