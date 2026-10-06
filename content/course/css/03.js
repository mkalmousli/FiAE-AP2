AP2.page('course-css-03', {
  b: 'course', g: 'CSS', t: 'CSS 3: Flexbox',
  d: '**Flexbox** ordnet die Kinder eines Containers in **einer Richtung** an (Zeile oder Spalte) und verteilt den verfügbaren Platz. `display: flex` macht ein Element zum **Flex-Container**, seine direkten Kinder werden **Flex-Items**. Die **Hauptachse** folgt `flex-direction` (Standard: `row`, waagerecht), die **Querachse** steht senkrecht dazu. `justify-content` verteilt entlang der Hauptachse, `align-items` richtet entlang der Querachse aus, `flex-wrap` erlaubt Umbrüche, `gap` setzt Abstände. Die Items steuert man mit `flex-grow`, `flex-shrink`, `flex-basis` (Kurzform `flex`) und `order`.',
  m: '**justify-content = Hauptachse, align-items = Querachse.** **Zentrieren in beide Richtungen: `display: flex; justify-content: center; align-items: center;`** **`flex: 1` = alle Items teilen sich den Platz gleichmäßig.** **`flex-wrap: wrap` + `flex: 1 1 250px` = responsive Kacheln ohne Media Query.**',
  cheat: [
    ['Container', ['`display: flex;`', '`flex-direction: row | column`', '`flex-wrap: wrap;`', '`gap: 16px;`']],
    ['Verteilen (Hauptachse)', ['`justify-content: flex-start`', '`center`, `flex-end`', '`space-between`', '`space-around`, `space-evenly`']],
    ['Ausrichten (Querachse)', ['`align-items: stretch` (Standard)', '`center`, `flex-start`, `flex-end`', '`baseline`', '`align-self` für ein Item']],
    ['Items', ['`flex: 1;` gleich verteilen', '`flex: 0 0 200px;` feste Breite', '`flex: 1 1 300px;` wachsen/schrumpfen', '`order: -1;` nach vorne']],
  ],
  blocks: [
    ['h', 'Hauptachse und Querachse'],
    ['diagram', {w: 600, h: 170, keep: 460, cap: 'flex-direction: row -> Hauptachse waagerecht (justify-content), Querachse senkrecht (align-items).', nodes: [
      {id: 'c', k: 'box', x: 300, y: 85, w: 520, h: 120, t: '', s: 'plain'},
      {id: 'a', k: 'box', x: 130, y: 85, w: 90, h: 60, t: 'Item 1', s: 'accent'}, {id: 'b', k: 'box', x: 240, y: 85, w: 90, h: 60, t: 'Item 2', s: 'accent'}, {id: 'd', k: 'box', x: 350, y: 85, w: 90, h: 60, t: 'Item 3', s: 'accent'},
      {id: 't1', k: 'text', x: 300, y: 160, t: 'Hauptachse ->', w: 10, h: 10}, {id: 't2', k: 'text', x: 520, y: 40, t: 'Querachse v', w: 10, h: 10},
    ], edges: []}],
    ['h', 'Eine Navigationsleiste'],
    ['code', 'html', `<nav class="leiste">
  <a href="#">MeBS</a>
  <ul class="menue"><li><a href="#">Start</a></li><li><a href="#">Menü</a></li><li><a href="#">Konto</a></li></ul>
</nav>`],
    ['code', 'css', `.leiste {
  display: flex;
  justify-content: space-between;   /* Logo links, Menü rechts */
  align-items: center;              /* vertikal mittig */
  padding: 0 20px;
  background: #2c3e50;
}
.menue { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }
.leiste a { color: white; text-decoration: none; }`],
    ['h', 'justify-content im Überblick'],
    ['table', ['Wert', 'Wirkung (bei row)'], [
      ['`flex-start`', 'alle links'], ['`flex-end`', 'alle rechts'], ['`center`', 'alle in der Mitte'],
      ['`space-between`', 'erstes ganz links, letztes ganz rechts, Rest gleichmäßig'],
      ['`space-around`', 'gleicher Abstand um jedes Item (am Rand halb so groß)'],
      ['`space-evenly`', 'alle Abstände gleich, auch am Rand'],
    ]],
    ['h', 'Platz verteilen mit flex'],
    ['code', 'css', `.layout { display: flex; gap: 20px; }
.sidebar { flex: 0 0 250px; }        /* wächst nicht, schrumpft nicht, 250px breit */
.inhalt  { flex: 1; }                /* nimmt den Rest */

.spalten > div { flex: 1; }          /* drei gleich breite Spalten */
.spalten > .breit { flex: 2; }       /* doppelt so breit wie die anderen */`],
    ['p', '`flex: grow shrink basis`. `flex: 1` entspricht `1 1 0%`: Alle Items starten bei 0 und teilen den Platz im Verhältnis ihrer grow-Werte.'],
    ['h', 'Umbrechende Kacheln (responsiv ohne Media Query)'],
    ['code', 'css', `.menu-selection {
  display: flex;
  flex-wrap: wrap;            /* in neue Zeile umbrechen */
  gap: 16px;
}
.menu-item {
  flex: 1 1 250px;            /* mindestens etwa 250px, sonst umbrechen; Rest gleichmäßig */
}`],
    ['h', 'Aktor und Sensor nebeneinander (Sommer 2023)'],
    ['code', 'css', `.anzeige { display: flex; flex-direction: column; }   /* schmal: untereinander */
@media (min-width: 601px) {
  .anzeige { flex-direction: row; }                    /* breit: nebeneinander */
  .anzeige > div { flex: 1; }                          /* je 50 % */
  body { background: yellow; }
}`],
    ['h', 'Zentrieren'],
    ['code', 'css', `.vollbild {
  display: flex;
  justify-content: center;   /* waagerecht */
  align-items: center;       /* senkrecht */
  min-height: 100vh;
}`],
    ['h', 'Übungen'],
    ['qa', 'Ein Footer soll links den Kontakt und rechts das Copyright zeigen, vertikal mittig, auf kleinen Bildschirmen untereinander.', [['code', 'css', `footer { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }`]], 3],
    ['quiz', [
      {q: 'Welche Eigenschaft verteilt Items entlang der Hauptachse?', o: ['justify-content', 'align-items', 'flex-wrap', 'gap'], a: 0, e: 'align-items: Querachse.'},
      {q: 'Was bewirkt flex-direction: column?', o: ['Items untereinander, Hauptachse senkrecht', 'Items nebeneinander', 'Umbrechen', 'Spalten wie im Grid'], a: 0, e: 'Achsen tauschen die Rolle.'},
      {q: 'Was bedeutet flex: 0 0 200px?', o: ['Feste Breite von 200px', 'Mindestens 200px', 'Höchstens 200px', '200px Abstand'], a: 0, e: 'Kein Wachsen, kein Schrumpfen.'},
      {q: 'Wofür ist Flexbox weniger geeignet als Grid?', o: ['Zweidimensionale Seitenlayouts', 'Navigationsleisten', 'Buttons zentrieren', 'Kartenreihen'], a: 0, e: 'Flexbox ist eindimensional.'},
    ]],
    ['see', ['course-css-02', 'course-css-04', 'eua-css']],
  ],
});
