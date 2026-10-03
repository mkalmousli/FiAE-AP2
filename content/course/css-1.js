AP2.page('course-css', {
  b: 'course', g: 'Webtechnologien', t: 'CSS: vollständiger Kurs (Kaskade, Box-Modell, Flexbox, Grid, Responsive)',
  d: '**CSS (Cascading Style Sheets)** beschreibt die **Darstellung** von HTML. Eine **Regel** besteht aus **Selektor** und **Deklarationsblock** (`eigenschaft: wert;`). Entscheidend sind die **Kaskade** (welche Regel gewinnt), **Vererbung**, das **Box-Modell** und moderne Layouts mit **Flexbox** und **Grid**. Gestaltung erfolgt **responsiv** mit relativen Einheiten und **Media Queries**.',
  m: '**Kaskade: Wichtigkeit (`!important`), dann Spezifität, dann Reihenfolge (die spätere gewinnt).** **Spezifität: Inline (1000) > ID (100) > Klasse/Attribut/Pseudoklasse (10) > Element (1).** **Box von innen: Content, Padding, Border, Margin.** **Flexbox = eine Achse, Grid = zwei.** **Mobile First.**',
  cheat: [
    ['Selektoren', ['`p`, `.klasse`, `#id`, `*`', '`a b` Nachfahre, `a > b` Kind', '`a + b` direkt folgend, `a ~ b` alle folgenden', '`[type="text"]`, `a[href^="https"]`', '`:hover`, `:focus-visible`, `:nth-child(2n)`, `::before`, `::after`', '`:is()`, `:not()`, `:has()`']],
    ['Box-Modell', ['`box-sizing: border-box` (Padding und Border zählen zur Breite)', '`margin` außen, `padding` innen', '`border: 1px solid #ccc`, `border-radius`', 'Margin-Kollaps vertikal']],
    ['Flexbox', ['`display: flex`', '`flex-direction`, `flex-wrap`, `gap`', '`justify-content` (Hauptachse), `align-items` (Querachse)', '`flex: 1 1 200px` (grow shrink basis)']],
    ['Grid', ['`display: grid`', '`grid-template-columns: repeat(3, 1fr)`', '`grid-template-areas`', '`repeat(auto-fit, minmax(200px, 1fr))`']],
    ['Einheiten', ['`px` fest, `%` relativ zum Elternelement', '`em` (Schrift des Elements), `rem` (Wurzel)', '`vw`/`vh`, `fr` (Grid)', '`clamp(min, ideal, max)`']],
    ['Responsive', ['`meta viewport`', '`@media (min-width: 768px)`', 'Mobile First', 'Flexible Bilder `max-width: 100%`']],
  ],
  blocks: [
    ['h', 'CSS einbinden'],
    ['code', 'html', `<link rel="stylesheet" href="style.css">      <!-- extern: Standard, cachebar -->
<style> p { color: teal; } </style>                  <!-- intern im head -->
<p style="color: red">Inline (vermeiden)</p>`],
    ['code', 'css', `/* Regel: Selektor { Deklarationen } */
:root { --farbe: #4f46e5; --abstand: 16px; }       /* Custom Properties (Variablen) */
body { font-family: system-ui, sans-serif; line-height: 1.6; color: #222; margin: 0; }
h1, h2 { color: var(--farbe); }                     /* Gruppierung, Variable nutzen */
.karte { padding: var(--abstand); border: 1px solid #ddd; border-radius: 8px; background: #fff; }
.karte > p:first-child { font-weight: bold; }
a:hover, a:focus-visible { text-decoration: underline; }
input[type="text"]:invalid { border-color: crimson; }
li:nth-child(odd) { background: #f5f5f5; }
.zitat::before { content: "\\201E"; }               /* Pseudoelement */`],
    ['h', 'Kaskade, Spezifität und Vererbung'],
    ['p', 'Passen mehrere Regeln auf ein Element, entscheidet der Browser in dieser Reihenfolge: **1. Herkunft und `!important`**, **2. Spezifität**, **3. Reihenfolge** im Quelltext (später gewinnt). Manche Eigenschaften werden **vererbt** (`color`, `font-*`, `line-height`), andere nicht (`margin`, `border`, `background`). `inherit`, `initial`, `unset` steuern das ausdrücklich.'],
    ['table', ['Selektor', 'Spezifität (ID, Klasse, Element)', 'Punkte'], [['`p`', '0, 0, 1', '1'], ['`.karte p`', '0, 1, 1', '11'], ['`#kopf .menu a`', '1, 1, 1', '111'], ['`style="..."` inline', 'über allen Selektoren', '1000'], ['`!important`', 'schlägt alles (vermeiden)', '-']]],
    ['ex', ['**Beispiel:** `p.hinweis` (0,1,1) schlägt `p` (0,0,1). Ein `#kopf p` (1,0,1) schlägt `.karte .text p` (0,2,1). Bei **gleicher** Spezifität gewinnt die **spätere** Regel.']],
    ['list', ['Niedrige Spezifität halten: **Klassen** statt IDs und tiefer Verschachtelung.', 'Methodik **BEM** (Block__Element--Modifier): `.karte__titel--gross` hält Namen flach und verständlich.', '`@layer` und `:where()` (Spezifität 0) helfen bei großen Projekten.']],
    ['h', 'Farben, Schrift, Hintergrund'],
    ['code', 'css', `color: #4f46e5;  color: rgb(79 70 229 / 0.8);  color: hsl(243 75% 59%);  color: rebeccapurple;
background: linear-gradient(135deg, #4f46e5, #06b6d4) , url("bild.jpg") center/cover no-repeat;
font: 400 1rem/1.6 "Inter", system-ui, sans-serif;     /* Kurzform: Gewicht Größe/Zeilenhöhe Familie */
text-align: center; text-transform: uppercase; letter-spacing: .05em; text-decoration: none;
box-shadow: 0 2px 8px rgb(0 0 0 / .15);  opacity: .9;  cursor: pointer;
@font-face { font-family: "Meine"; src: url("meine.woff2") format("woff2"); font-display: swap; }`],
  ],
});
