AP2.page('course-css-05', {
  b: 'course', g: 'CSS', t: 'CSS 5: Responsive Design, Media Queries, Variablen und Animationen',
  d: '**Responsive Design** passt eine Seite an Bildschirmgröße und -ausrichtung an. Grundlagen sind der **viewport-Meta-Tag**, **flexible Layouts** (Flexbox, Grid, Prozent, fr), **flexible Bilder** (`max-width: 100%`) und **Media Queries** (`@media (min-width: 768px) { ... }`), die Regeln nur unter Bedingungen anwenden. Üblich ist **Mobile First**: Basis-CSS für kleine Bildschirme, Erweiterungen per `min-width`. Außerdem: **CSS-Variablen** (Custom Properties) für Farben und Abstände, **Übergänge** (`transition`) und **Animationen** (`@keyframes`) sowie Frameworks wie **Bootstrap**.',
  m: '**Ohne `<meta name="viewport" content="width=device-width, initial-scale=1">` wirken Media Queries auf dem Handy nicht richtig.** **Mobile First = min-width, Desktop First = max-width.** **Media Queries ans Ende (Kaskade!).** **Variablen: `--farbe: #4caf50;` definieren, `var(--farbe)` nutzen.** **`img { max-width: 100%; height: auto; }`**',
  cheat: [
    ['Media Queries', ['`@media (min-width: 768px) {}`', '`@media (max-width: 499px) {}`', '`@media (orientation: landscape) {}`', '`@media print {}`, `and`, `,` (oder)']],
    ['Typische Breakpoints', ['ab 576px kleine Tablets', 'ab 768px Tablets', 'ab 992px Laptops', 'ab 1200px Desktop']],
    ['Variablen', ['`:root { --akzent: #4caf50; }`', '`color: var(--akzent);`', '`var(--x, ersatz)`', 'per Media Query umschaltbar (Dark Mode)']],
    ['Bewegung', ['`transition: color 0.3s ease;`', '`transform: scale(1.05)`', '`@keyframes name { from {} to {} }`', '`prefers-reduced-motion` beachten']],
  ],
  blocks: [
    ['h', 'Mobile First'],
    ['code', 'css', `/* Basis: Smartphone, eine Spalte */
.menu-selection { display: grid; grid-template-columns: 1fr; gap: 12px; }
img { max-width: 100%; height: auto; }

/* ab Tablet: zwei Spalten */
@media (min-width: 768px) {
  .menu-selection { grid-template-columns: 1fr 1fr; }
}

/* ab Desktop: Datum + drei Gerichte nebeneinander */
@media (min-width: 1100px) {
  .menu-selection { grid-template-columns: 120px repeat(3, 1fr); }
}`],
    ['h', 'Media-Query-Bedingungen'],
    ['table', ['Bedingung', 'trifft zu bei'], [
      ['`(max-width: 499px)`', 'Fensterbreite bis 499px'],
      ['`(min-width: 700px)`', 'ab 700px'],
      ['`(min-width: 600px) and (max-width: 900px)`', 'zwischen 600 und 900px'],
      ['`(orientation: portrait)` / `(landscape)`', 'Hoch- bzw. Querformat'],
      ['`print`', 'beim Drucken'],
      ['`(prefers-color-scheme: dark)`', 'Betriebssystem im Dunkelmodus'],
      ['`(prefers-reduced-motion: reduce)`', 'Nutzer möchte wenig Animation (Barrierefreiheit)'],
      ['`(hover: hover)`', 'Gerät mit Maus (nicht Touch)'],
    ]],
    ['h', 'Schriftgrößen je Gerät (Winter 2025/26)'],
    ['code', 'css', `@media (orientation: landscape) { .container { font-size: 1.1rem; } }
@media (orientation: portrait)  { .container { font-size: 1.2rem; } }
@media (max-width: 499px)       { #row { font-size: 110%; } }
@media (min-width: 700px)       { #row { font-size: 90%; } }
/* Alternative: fließende Größe ohne Breakpoints */
h1 { font-size: clamp(1.5rem, 4vw, 2.5rem); }`],
    ['h', 'CSS-Variablen'],
    ['code', 'css', `:root {
  --akzent: #4caf50;
  --text: #222;
  --hintergrund: #fff;
  --abstand: 16px;
}
@media (prefers-color-scheme: dark) {
  :root { --text: #eee; --hintergrund: #121212; }
}
body { color: var(--text); background: var(--hintergrund); }
button { background: var(--akzent); padding: calc(var(--abstand) / 2) var(--abstand); }`],
    ['h', 'Übergänge und Animationen'],
    ['code', 'css', `.menu-item { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.menu-item:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,.2); }

@keyframes pulsieren {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.1); }
}
.neu { animation: pulsieren 1.5s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`],
    ['h', 'Druck-CSS'],
    ['code', 'css', `@media print {
  nav, footer, .button { display: none; }     /* Unnötiges ausblenden */
  body { font: 11pt "Times New Roman", serif; color: black; background: white; }
  a::after { content: " (" attr(href) ")"; }  /* Linkziele ausdrucken */
}`],
    ['h', 'Frameworks: Bootstrap'],
    ['code', 'html', `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-..." crossorigin="anonymous">
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">Gericht 1</div>   <!-- mobil 12/12, Tablet 6/12, Desktop 4/12 -->
    <div class="col-12 col-md-6 col-lg-4">Gericht 2</div>
    <div class="col-12 col-md-6 col-lg-4">Gericht 3</div>
  </div>
  <button class="btn btn-success">Bestellen</button>
</div>`],
    ['procon', 'CSS-Framework (Bootstrap)', ['Schnell fertige, responsive Layouts (12-Spalten-Raster) und Komponenten', 'Einheitliches Design, gut dokumentiert, browserübergreifend getestet', 'Große Community'], ['Viel ungenutzter Code (Ladezeit), Seiten sehen ähnlich aus', 'Eigene Anpassungen kollidieren mit Framework-Regeln (Spezifität)', 'Abhängigkeit von Version/CDN; beim CDN: Datenschutz (IP an Dritte), Integrität (SRI-Hash) beachten']],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie CSS: Auf Bildschirmen bis 600px Breite liegen zwei Blöcke `.block` untereinander (100 %), darüber nebeneinander (je 50 %) mit gelbem Seitenhintergrund (Mobile First).', [['code', 'css', `.wrapper { display: flex; flex-direction: column; }
.block { width: 100%; }
@media (min-width: 601px) {
  .wrapper { flex-direction: row; }
  .block { width: 50%; }
  body { background-color: yellow; }
}`]], 4],
    ['quiz', [
      {q: 'Was gehört bei Mobile First in die Media Queries?', o: ['min-width', 'max-width', 'orientation', 'print'], a: 0, e: 'Von klein nach groß erweitern.'},
      {q: 'Was bewirkt img { max-width: 100%; }?', o: ['Bilder werden nie breiter als ihr Container', 'Bilder werden immer gestreckt', 'Bilder werden ausgeblendet', 'Nichts'], a: 0, e: 'Flexible Bilder.'},
      {q: 'Wie verwendet man die Variable --akzent?', o: ['var(--akzent)', '$akzent', '@akzent', '--akzent()'], a: 0, e: '$ und @ sind Sass/Less.'},
      {q: 'Wofür steht col-md-6 in Bootstrap?', o: ['Ab mittleren Bildschirmen halbe Breite (6 von 12)', '6 Pixel', '6 Spalten immer', 'Mobil halbe Breite'], a: 0, e: '12-Spalten-Raster.'},
    ]],
    ['see', ['course-css-04', 'eua-css', 'course-html-05']],
  ],
});
