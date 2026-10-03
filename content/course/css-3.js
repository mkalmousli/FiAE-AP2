AP2.add('course-css', [
  ['h', 'Einheiten'],
  ['table', ['Einheit', 'Bezug', 'Einsatz'], [['`px`', 'Bildschirmpunkt (absolut)', 'Rahmen, feine Linien'], ['`%`', 'Eigenschaft des Elternelements', 'Breiten'], ['`em`', 'Schriftgröße des **Elements** (verschachtelt multiplikativ)', 'Abstände relativ zur Schrift'], ['`rem`', 'Schriftgröße des **Wurzelelements** (`html`, meist 16px)', 'Schriftgrößen und Abstände (skalierbar)'], ['`vw` / `vh`', '1 % der Fensterbreite / -höhe', 'Vollbild-Abschnitte (mobil: `dvh`)'], ['`fr`', 'Anteil am Restplatz im Grid', 'Spalten'], ['`ch`', 'Breite der Ziffer 0', 'Lesbare Zeilenlänge `max-width: 65ch`'], ['`clamp(a, b, c)`', 'Wert zwischen Min und Max', '`font-size: clamp(1rem, 2.5vw, 2rem)`']]],
  ['code', 'css', `width: calc(100% - 2rem);          /* Rechnen mit gemischten Einheiten */
font-size: clamp(1rem, 1rem + 1vw, 1.5rem);
min-height: 100dvh;  aspect-ratio: 16 / 9;  object-fit: cover;   /* Bildfüllung */`],
  ['h', 'Responsive Webdesign'],
  ['code', 'css', `/* Mobile First: Basis gilt für klein, Erweiterungen mit min-width */
.inhalt { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 768px)  { .inhalt { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1100px) { .inhalt { grid-template-columns: repeat(3, 1fr); } }
img { max-width: 100%; height: auto; }                     /* flexible Bilder */
@media (prefers-color-scheme: dark) { :root { --bg: #111; --text: #eee; } }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
@media print { nav, footer { display: none; } }
/* Container Queries: Komponente reagiert auf die Größe ihres Containers */
.karte-box { container-type: inline-size; }
@container (min-width: 400px) { .karte { display: flex; } }`],
  ['table', ['Prinzip', 'Erklärung'], [['**Mobile First**', 'Zuerst für kleine Bildschirme gestalten, dann mit `min-width` erweitern: weniger Code, bessere Performance'], ['**Breakpoints**', 'Orientieren sich am Inhalt; übliche Werte 600/768/1024/1280 px'], ['**Fluid Layout**', 'Relative Breiten, `clamp`, Flex/Grid statt fester Pixel'], ['**Viewport-Meta**', 'Ohne `<meta name="viewport">` skaliert das Smartphone die Seite wie einen Desktop']]],
  ['h', 'Übergänge und Animationen'],
  ['code', 'css', `.knopf { background: #4f46e5; color: #fff; transition: background .2s ease, transform .2s ease; }
.knopf:hover { background: #4338ca; transform: translateY(-2px) scale(1.03); }
.knopf:focus-visible { outline: 3px solid #fbbf24; outline-offset: 2px; }   /* Fokus nie ganz entfernen! */

@keyframes puls { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
.herz { animation: puls 1.2s ease-in-out infinite; }`],
  ['list', ['**Performant animieren:** `transform` und `opacity` (GPU) statt `width`, `top`, `left` (Layout-Neuberechnung).', 'Bewegungsreduktion (`prefers-reduced-motion`) respektieren.', 'Transform-Funktionen: `translate`, `rotate`, `scale`, `skew`; Kombination in einer Eigenschaft.']],
  ['h', 'Praxismuster'],
  ['code', 'css', `/* Textüberlauf mit Auslassungspunkten */
.einzeilig { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mehrzeilig { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
/* Sticky Footer: Seite füllt mindestens das Fenster */
body { min-height: 100dvh; display: grid; grid-template-rows: auto 1fr auto; }
/* Visuell versteckt, aber für Screenreader lesbar */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
/* Tabelle mit Zebrastreifen */
tbody tr:nth-child(even) { background: color-mix(in srgb, currentColor 6%, transparent); }
/* Karte mit Verschachtelung (natives CSS Nesting) */
.karte { padding: 1rem; &:hover { box-shadow: 0 4px 16px rgb(0 0 0 / .15); } & h3 { margin: 0; } }`],
  ['h', 'Präprozessoren, Frameworks, Werkzeuge'],
  ['table', ['Werkzeug', 'Zweck'], [['**Sass/SCSS**', 'Variablen, Verschachtelung, Mixins, Funktionen; wird zu CSS kompiliert (vieles inzwischen nativ: Variablen, Nesting)'], ['**Bootstrap**', 'Fertiges Komponenten- und Grid-System'], ['**Tailwind CSS**', 'Utility-First: Klassen wie `p-4 flex` direkt im HTML'], ['**PostCSS / Autoprefixer**', 'Transformiert CSS, ergänzt Herstellerpräfixe'], ['**Browser-DevTools**', 'Element inspizieren, Box-Modell und berechnete Stile sehen, Regeln live ändern']]],
]);
