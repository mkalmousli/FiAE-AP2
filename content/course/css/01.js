AP2.page('course-css-01', {
  b: 'course', g: 'CSS', t: 'CSS 1: Einbindung, Selektoren und Kaskade',
  d: '**CSS** (Cascading Style Sheets) beschreibt das **Aussehen** von HTML. Eine **Regel** besteht aus einem **Selektor**, der Elemente auswählt, und **Deklarationen** (`eigenschaft: wert;`). CSS wird **inline** (`style`-Attribut), **intern** (`<style>` im head) oder **extern** (`<link rel="stylesheet">`) eingebunden. Treffen mehrere Regeln auf ein Element, entscheidet die **Kaskade**: Wichtigkeit (`!important`), **Spezifität** des Selektors und **Reihenfolge**. Manche Eigenschaften (Schrift, Farbe) werden an Kindelemente **vererbt**.',
  m: '**Spezifität: inline (1,0,0,0) > id (0,1,0,0) > Klasse/Attribut/Pseudoklasse (0,0,1,0) > Element (0,0,0,1).** **Gleiche Spezifität: spätere Regel gewinnt.** **Externe Datei = beste Wartbarkeit.** **Vererbt: color, font-*, line-height, text-align. Nicht vererbt: margin, padding, border, background, width.**',
  cheat: [
    ['Einbinden', ['inline: `style="color:red"`', 'intern: `<style> ... </style>`', 'extern: `<link rel="stylesheet" href="s.css">`', '`@import url(x.css);`']],
    ['Basis-Selektoren', ['`p` Element', '`.klasse`', '`#id`', '`*` alle, `a, b` Gruppe']],
    ['Kombinatoren', ['`nav a` Nachfahre', '`ul > li` direktes Kind', '`h2 + p` direkter Nachbar', '`h2 ~ p` alle folgenden']],
    ['Pseudo', ['`:hover`, `:focus`, `:checked`', '`:first-child`, `:nth-child(2n)`', '`::before`, `::after`', '`[type="email"]` Attribut']],
  ],
  blocks: [
    ['h', 'Aufbau einer Regel'],
    ['code', 'css', `/* Selektor { Eigenschaft: Wert; } */
h1 {
  font: 24pt Arial, sans-serif;     /* Kurzschreibweise: Größe und Familie */
  color: #2c3e50;
}
.price, .rating { font-weight: bold; }   /* Gruppe: beide Klassen */`],
    ['h', 'Drei Wege, CSS einzubinden'],
    ['codes', [
      ['html', `<!-- inline: nur dieses Element -->
<p style="color: red;">Achtung</p>

<!-- intern: nur diese Seite -->
<head>
  <style>
    h2 { font: 16pt Arial; color: green; }
  </style>
</head>

<!-- extern: für alle Seiten -->
<head>
  <link rel="stylesheet" href="css/style.css">
</head>`],
    ]],
    ['table', ['Ort', 'Vorteil', 'Nachteil'], [
      ['inline', 'höchste Priorität, schnell für Einzelfall', 'unübersichtlich, nicht wiederverwendbar, schlecht wartbar'],
      ['intern', 'alles in einer Datei, gut für Einzelseiten', 'gilt nur für eine Seite, Duplikate bei vielen Seiten'],
      ['extern', 'eine Änderung wirkt überall, Browser-Cache, Trennung von Inhalt und Design', 'zusätzliche Datei/Anfrage'],
    ]],
    ['h', 'Selektoren'],
    ['code', 'css', `p { line-height: 1.5; }                       /* alle Absätze */
.vegetarian { border-color: green; }          /* class="vegetarian" */
#termin { background: #4caf50; }              /* id="termin" */
.menu-item.vegetarian { border-width: 2px; }  /* beide Klassen am selben Element */
nav a { text-decoration: none; }              /* a irgendwo innerhalb von nav */
ul > li { list-style: square; }               /* nur direkte Kinder */
input[type="email"] { width: 300px; }         /* Attributselektor */
a:hover { color: orange; }                    /* Maus darüber */
input:focus { outline: 2px solid blue; }      /* Tastaturfokus */
tr:nth-child(even) { background: #eee; }      /* jede zweite Zeile */
li:first-child { font-weight: bold; }
.rating::before { content: "★ "; color: gold; }   /* erzeugter Inhalt */`],
    ['h', 'Die Kaskade: Wer gewinnt?'],
    ['steps', [
      '**Herkunft und Wichtigkeit:** Browser-Standard < Autoren-CSS; `!important` überstimmt normale Regeln.',
      '**Spezifität:** Zählen nach (inline, ids, Klassen/Attribute/Pseudoklassen, Elemente). `#menu .item a` = (0,1,1,1) schlägt `.menu .item a` = (0,0,2,1).',
      '**Reihenfolge:** Bei gleicher Spezifität gewinnt die **zuletzt** geladene Regel (deshalb externe CSS vor eigenen Anpassungen, Media Queries ans Ende).',
    ]],
    ['table', ['Selektor', 'Spezifität', 'Gewinnt gegen'], [
      ['`p`', '0,0,0,1', '-'],
      ['`.hinweis`', '0,0,1,0', '`p`, `div p`'],
      ['`p.hinweis:hover`', '0,0,2,1', '`.hinweis`'],
      ['`#info`', '0,1,0,0', 'beliebig viele Klassen'],
      ['`style="..."`', '1,0,0,0', 'alle Selektoren (außer !important)'],
    ]],
    ['ex', ['Sommer 2025: Externe Datei: `.rating { color: gold; }`, im HTML: `<p class="rating" style="color: red">`. Angezeigt wird **Rot**, weil der Inline-Style die höhere Spezifität hat.']],
    ['h', 'Vererbung'],
    ['code', 'css', `body { font-family: Verdana, Arial, sans-serif; color: #333; }   /* erben alle Texte */
.box { border: 1px solid; }                                       /* erben Kinder NICHT */
.kind { border: inherit; }                                        /* Vererbung erzwingen */
a { color: inherit; }                                             /* Linkfarbe vom Elternelement */`],
    ['h', 'Farben angeben'],
    ['table', ['Schreibweise', 'Beispiel', 'Bedeutung'], [
      ['Name', '`gold`, `green`, `red`', '148 benannte Farben'],
      ['Hex', '`#666`, `#ffcc00`, `#4caf50`', 'Rot, Grün, Blau je 00 bis ff'],
      ['rgb / rgba', '`rgb(255 204 0)`, `rgba(0,0,0,0.5)`', 'mit Transparenz'],
      ['hsl', '`hsl(120 60% 40%)`', 'Farbton, Sättigung, Helligkeit'],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie CSS: Überschrift h1 in 24pt Arial, h2 in 16pt Arial grün, Links ohne Unterstreichung, bei Mausberührung orange.', [['code', 'css', `h1 { font: 24pt Arial; }
h2 { font: 16pt Arial; color: green; }
a { text-decoration: none; }
a:hover { color: orange; }`]], 4],
    ['quiz', [
      {q: 'Welcher Selektor ist am spezifischsten?', o: ['#kopf', '.kopf .titel', 'header h1', 'h1'], a: 0, e: 'id schlägt Klassen.'},
      {q: 'Was wählt ul > li aus?', o: ['li, die direkte Kinder von ul sind', 'alle li in ul', 'das erste li', 'ul nach li'], a: 0, e: 'Kindkombinator.'},
      {q: 'Welche Eigenschaft wird vererbt?', o: ['color', 'margin', 'border', 'width'], a: 0, e: 'Schrift- und Texteigenschaften.'},
      {q: 'Zwei Regeln mit gleicher Spezifität setzen color. Welche gilt?', o: ['Die später stehende', 'Die erste', 'Keine', 'Die mit kürzerem Selektor'], a: 0, e: 'Reihenfolge.'},
    ]],
    ['see', ['course-css-02', 'eua-css', 'course-html-01']],
  ],
});
