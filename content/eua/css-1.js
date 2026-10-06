AP2.page('eua-css', {
  b: 'eua', g: 'Webentwicklung', t: 'CSS: Einbindung, Kaskade, Grid, Flexbox und Media Queries',
  d: '**CSS** (Cascading Style Sheets) legt das **Aussehen** von HTML fest: Farben, Schriften, Abstände und das **Layout**. Eine CSS-Regel besteht aus **Selektor** und **Deklarationsblock**: `p { color: red; }`. Treffen mehrere Regeln auf dasselbe Element, entscheidet die **Kaskade**: Herkunft, **Spezifität** und Reihenfolge. Für moderne Layouts nutzt man **CSS Grid** (zweidimensional) und **Flexbox** (eindimensional), für Anpassungen an Bildschirmbreite oder -ausrichtung **Media Queries** (`@media`).',
  m: '**Spezifität: inline > #id > .klasse > element.** **Bei Gleichstand gewinnt die spätere Regel.** **Grid = Zeilen UND Spalten, Flex = eine Richtung.** **`@media (orientation: landscape)` = Querformat, `(max-width: 500px)` = schmaler als 500 px.** Media Queries stehen **nach** den Basisregeln, sonst werden sie überschrieben.',
  cheat: [
    ['Einbinden', ['**inline:** `<p style="color:red">`', '**intern:** `<style>` im `<head>`', '**extern:** `<link rel="stylesheet" href="s.css">`', 'Extern = beste Wartbarkeit']],
    ['Selektoren', ['`p` Element', '`.preis` Klasse', '`#row` id', '`div p` Nachfahre, `a:hover` Zustand']],
    ['Grid', ['`display: grid;`', '`grid-template-columns: 1fr 1fr;`', '`grid-column: 1 / 3;` (Linie 1 bis 3)', '`gap: 10px;`']],
    ['Media Queries', ['`@media (max-width: 499px) {..}`', '`@media (min-width: 700px) {..}`', '`@media (orientation: portrait) {..}`', '`and` verknüpft Bedingungen']],
  ],
  blocks: [
    ['h', 'Aufbau einer CSS-Regel'],
    ['code', 'css', `/* Selektor   { Eigenschaft: Wert; ... }  */
h2        { font: 16pt Arial; color: green; }
.rating   { color: gold; }              /* alle Elemente mit class="rating" */
#termin   { background: #daeleb; }      /* das Element mit id="termin" */
.menu-item.vegetarian { border-color: green; }  /* beide Klassen gleichzeitig */`],
    ['h', 'Drei Orte für CSS (Prüfungsfrage mit Vor- und Nachteilen)'],
    ['table', ['Ort', 'Beispiel', 'Vorteil', 'Nachteil'], [
      ['**Inline** (Attribut `style`)', '`<h1 style="color:red">`', 'Wirkt sofort und gezielt auf ein Element, höchste Priorität', 'Unübersichtlich, nicht wiederverwendbar, Inhalt und Design vermischt'],
      ['**Intern / eingebettet** (`<style>` im `head`)', '`<style> h1 {color:red} </style>`', 'Alles in einer Datei, gut für kleine Einzelseiten', 'Gilt nur für diese eine Seite; bei vielen Seiten mehrfach pflegen'],
      ['**Extern** (eigene `.css`-Datei)', '`<link rel="stylesheet" href="style.css">`', 'Einmal ändern, **alle Seiten** passen sich an; Browser kann die Datei cachen; klare Trennung von Inhalt und Design', 'Zusätzliche Datei, eine HTTP-Anfrage mehr'],
    ]],
    ['tip', 'Antwortmuster (Winter 2024/25, 6 Punkte; Winter 2022/23, 6 Punkte): "Externe CSS-Dateien verbessern die **Wartbarkeit** einer Webpräsenz, weil Gestaltungsregeln an **einer Stelle** geändert werden und für alle Seiten gelten. Inline-Styles erschweren die Wartung, weil jede Änderung in jedem Element einzeln vorgenommen werden muss."'],
    ['h', 'Die Kaskade: Welche Regel gewinnt?'],
    ['p', 'Wenn mehrere Regeln dieselbe Eigenschaft eines Elements setzen, entscheidet der Browser in dieser Reihenfolge:'],
    ['steps', [
      '**Wichtigkeit:** `!important` schlägt alles andere (sparsam verwenden).',
      '**Spezifität:** Inline-Style (1,0,0,0) > id-Selektor (0,1,0,0) > Klasse, Attribut, Pseudoklasse (0,0,1,0) > Element (0,0,0,1).',
      '**Reihenfolge:** Bei gleicher Spezifität gewinnt die Regel, die **später** im Code steht.',
      '**Vererbung:** Manche Eigenschaften (Schrift, Farbe) erben Kindelemente vom Elternelement, wenn sie selbst nichts festlegen.',
    ]],
    ['ex', ['Sommer 2025: In der externen CSS-Datei ist der Bewertungsstern **gold**, im HTML-Tag steht `style="color: red"`. Welche Farbe erscheint?', 'Antwort: **Rot**, weil Inline-Styles eine höhere Priorität (Spezifität) haben als Regeln aus einer externen CSS-Datei.']],
    ['h', 'Das Box-Modell'],
    ['p', 'Jedes Element ist ein Rechteck aus vier Schichten: **Inhalt** (content), **Innenabstand** (padding), **Rahmen** (border) und **Außenabstand** (margin). Standardmäßig gilt `width` nur für den Inhalt; mit `box-sizing: border-box;` zählen Padding und Rahmen mit dazu.'],
    ['code', 'css', `.menu-item {
  padding: 10px;            /* Abstand Inhalt -> Rahmen */
  border: 1px solid #ddd;   /* Breite, Stil, Farbe */
  margin: 0 0 20px;         /* oben, rechts/links, unten */
  text-align: center;
}`],
    ['h', 'Einheiten'],
    ['table', ['Einheit', 'Bedeutung', 'Einsatz'], [
      ['`px`', 'Pixel, fest', 'Rahmen, kleine Abstände'],
      ['`%`', 'Prozent des Elternelements', 'Breiten'],
      ['`em`', 'Vielfaches der Schriftgröße des Elternelements', 'Abstände relativ zur Schrift'],
      ['`rem`', 'Vielfaches der Schriftgröße des **Wurzelelements** (`html`, meist 16 px)', 'Schriftgrößen: `1.1rem` = 1,1-fach der Basisschrift'],
      ['`vw` / `vh`', '1 % der Breite / Höhe des Anzeigebereichs (Viewport)', 'Vollbild-Layouts'],
      ['`fr`', 'Anteil am freien Platz im Grid', '`grid-template-columns: 2fr 1fr 1fr`'],
    ]],
    ['h', 'Möglichkeiten zur Layout-Gestaltung (Sommer 2022, 3 Punkte)'],
    ['list', [
      '**CSS Grid Layout:** Raster aus Zeilen und Spalten, ideal für Seitenlayouts.',
      '**CSS Flexbox:** Elemente in einer Reihe oder Spalte verteilen und ausrichten.',
      '**CSS-Frameworks** wie **Bootstrap** (fertiges 12-Spalten-Raster und Komponenten).',
      '**Positionierung** mit `position: absolute/relative/fixed` plus `top/right/bottom/left`.',
      '**Float** (veraltet für Layouts) und **HTML-Tabellen** (veraltet, nicht barrierefrei, nur für echte Tabellendaten).',
    ]],
  ],
});
