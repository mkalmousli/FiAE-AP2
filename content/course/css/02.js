AP2.page('course-css-02', {
  b: 'course', g: 'CSS', t: 'CSS 2: Box-Modell, Text, Einheiten und Positionierung',
  d: 'Jedes Element ist eine **Box** aus **Inhalt** (content), **Innenabstand** (`padding`), **Rahmen** (`border`) und **Außenabstand** (`margin`). Standardmäßig bezieht sich `width` nur auf den Inhalt; mit `box-sizing: border-box` schließt sie Padding und Rahmen ein. `display` legt das Verhalten fest (`block`, `inline`, `inline-block`, `none`, `flex`, `grid`). Mit `position` (`static`, `relative`, `absolute`, `fixed`, `sticky`) und `top/right/bottom/left` verschiebt man Elemente gezielt. Größen gibt man **absolut** (`px`) oder **relativ** (`%`, `em`, `rem`, `vw`, `vh`) an.',
  m: '**Box von innen nach außen: content - padding - border - margin.** **`* { box-sizing: border-box; }` macht Breiten berechenbar.** **margin/padding: 1 Wert = alle, 2 = oben/unten links/rechts, 4 = oben rechts unten links (Uhrzeigersinn).** **absolute bezieht sich auf den nächsten positionierten Vorfahren (position: relative).** **Schriftgrößen in rem.**',
  cheat: [
    ['Box', ['`padding: 10px 20px;`', '`border: 1px solid #ddd;`', '`margin: 0 auto;` zentrieren', '`border-radius: 8px;`']],
    ['display', ['`block`, `inline`, `inline-block`', '`none` (weg, kein Platz)', '`flex`, `grid`', '`visibility: hidden` (Platz bleibt)']],
    ['Text', ['`font-family`, `font-size`, `font-weight`', '`color`, `text-align`', '`line-height: 1.5`', '`text-decoration`, `text-transform`']],
    ['position', ['`relative` zur eigenen Stelle', '`absolute` zum Vorfahren', '`fixed` zum Fenster', '`sticky` klebt beim Scrollen; `z-index`']],
  ],
  blocks: [
    ['h', 'Das Box-Modell'],
    ['diagram', {w: 520, h: 230, keep: 400, cap: 'Box-Modell: margin (außen, transparent), border, padding, content', nodes: [
      {id: 'm', k: 'box', x: 260, y: 115, w: 480, h: 210, t: '', s: 'plain'}, {id: 'mt', k: 'text', x: 60, y: 25, t: 'margin', w: 10, h: 10},
      {id: 'b', k: 'box', x: 260, y: 120, w: 380, h: 160, t: '', s: 'accent'}, {id: 'bt', k: 'text', x: 110, y: 55, t: 'border', w: 10, h: 10},
      {id: 'p', k: 'box', x: 260, y: 125, w: 300, h: 110, t: '', s: 'soft'}, {id: 'pt', k: 'text', x: 150, y: 82, t: 'padding', w: 10, h: 10},
      {id: 'c', k: 'box', x: 260, y: 130, w: 180, h: 50, t: 'content (width x height)', s: 'solid'},
    ], edges: []}],
    ['code', 'css', `.menu-item {
  width: 200px;
  padding: 10px;              /* +20px */
  border: 1px solid #ddd;     /* +2px  -> belegt 222px (content-box) */
  margin: 0 0 20px;           /* oben 0, links/rechts 0, unten 20px */
}
*, *::before, *::after { box-sizing: border-box; }   /* jetzt sind es genau 200px */
.zentriert { width: 600px; margin: 0 auto; }          /* Block horizontal zentrieren */`],
    ['note', '**Margin Collapsing:** Treffen die vertikalen Außenabstände zweier Blockelemente aufeinander, wird nicht addiert, sondern der größere genommen (20px und 30px ergeben 30px Abstand).'],
    ['h', 'display'],
    ['table', ['Wert', 'Verhalten'], [
      ['`block`', 'neue Zeile, volle Breite, width/height wirken'],
      ['`inline`', 'im Textfluss, width/height wirken nicht, vertikales margin kaum'],
      ['`inline-block`', 'im Textfluss, aber width/height/padding wirken (Buttons, Kacheln)'],
      ['`none`', 'Element wird nicht dargestellt und nimmt keinen Platz ein'],
      ['`flex` / `grid`', 'Element wird Layout-Container (Kapitel 3 und 4)'],
    ]],
    ['h', 'Text und Schrift'],
    ['code', 'css', `body {
  font-family: "Segoe UI", Verdana, Arial, sans-serif;   /* Liste mit Ausweichschriften */
  font-size: 1rem;              /* meist 16px */
  line-height: 1.5;
  color: #222;
}
.description { color: #666; font-style: italic; }
.price { font-weight: bold; text-align: right; }
h1 { font-size: 2rem; text-transform: uppercase; letter-spacing: 0.05em; }
a { text-decoration: none; } a:hover { text-decoration: underline; }`],
    ['h', 'Einheiten'],
    ['table', ['Einheit', 'Bezug', 'Empfehlung'], [
      ['`px`', 'absolut', 'Rahmen, feine Abstände'],
      ['`pt`', 'Druckpunkt (1pt = 1/72 Zoll)', 'Druck-CSS, kommt in Prüfungen vor (`24pt Arial`)'],
      ['`%`', 'Elternelement', 'Breiten'],
      ['`em`', 'Schriftgröße des Elternelements', 'Abstände relativ zur Schrift'],
      ['`rem`', 'Schriftgröße von `html`', 'Schriftgrößen (skaliert mit Benutzereinstellung)'],
      ['`vw` / `vh`', '1 % der Fensterbreite/-höhe', 'Vollbildbereiche'],
      ['`fr`', 'Anteil freier Fläche im Grid', 'Grid-Spalten'],
    ]],
    ['h', 'Hintergründe und Rahmen'],
    ['code', 'css', `body { background-color: orange; }
.hero {
  background: url("bilder/mensa.jpg") center / cover no-repeat;   /* Bild füllt die Fläche */
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}`],
    ['h', 'Positionierung'],
    ['code', 'css', `header { position: relative; }               /* Bezugspunkt für das Logo */
#logo  { position: absolute; top: 10px; right: 30px; }   /* Logo oben rechts, 30px Abstand */

.cookie-hinweis { position: fixed; bottom: 0; left: 0; right: 0; }   /* klebt am Fenster */
thead th { position: sticky; top: 0; background: white; }            /* Tabellenkopf bleibt sichtbar */
.overlay { position: absolute; z-index: 10; }                        /* liegt über anderen */`],
    ['table', ['position', 'Bezugssystem', 'im Fluss?'], [
      ['`static`', 'normale Position (Standard)', 'ja'],
      ['`relative`', 'eigene Normalposition, verschoben', 'ja (Platz bleibt reserviert)'],
      ['`absolute`', 'nächster Vorfahr mit position ≠ static, sonst Seite', 'nein'],
      ['`fixed`', 'Browserfenster', 'nein'],
      ['`sticky`', 'normal, ab Schwelle wie fixed im Container', 'ja'],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Gestalten Sie Karten für Tagesgerichte: zentrierter Text, 10px Innenabstand, grauer 1px-Rahmen, abgerundete Ecken, vegetarische Gerichte grün umrandet, Beschreibung in #666, Preis fett.', [['code', 'css', `.menu-item {
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.menu-item.vegetarian { border-color: green; }
.description { color: #666; }
.price { font-weight: bold; }`]], 5],
    ['quiz', [
      {q: 'Welche Reihenfolge gilt bei margin: 5px 10px 15px 20px?', o: ['oben rechts unten links', 'links oben rechts unten', 'oben unten links rechts', 'beliebig'], a: 0, e: 'Uhrzeigersinn ab oben.'},
      {q: 'Was bewirkt box-sizing: border-box?', o: ['width enthält padding und border', 'Rahmen wird entfernt', 'margin zählt zur Breite', 'Element wird Block'], a: 0, e: 'Berechenbare Breiten.'},
      {q: 'Worauf bezieht sich position: absolute?', o: ['Nächster positionierter Vorfahr', 'Immer das Fenster', 'Die eigene Position', 'Das vorige Element'], a: 0, e: 'Sonst das Dokument.'},
      {q: 'Was ist der Unterschied zwischen display: none und visibility: hidden?', o: ['none entfernt auch den Platz', 'Kein Unterschied', 'hidden entfernt den Platz', 'none ist nur für Bilder'], a: 0, e: 'hidden lässt eine Lücke.'},
    ]],
    ['see', ['course-css-01', 'course-css-03', 'eua-css']],
  ],
});
