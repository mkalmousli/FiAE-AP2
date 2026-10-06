AP2.add('eua-css', [
  ['h', 'CSS Grid: Raster aus Zeilen und Spalten'],
  ['p', 'Mit `display: grid` wird ein Element zum **Grid-Container**, seine direkten Kinder werden **Grid-Items**. Spalten und Zeilen definiert man mit `grid-template-columns` und `grid-template-rows`. Die **Linien** zwischen den Spalten sind durchnummeriert: Bei 4 Spalten gibt es die Linien 1 bis 5. Ein Item, das über mehrere Spalten gehen soll, bekommt `grid-column: start / ende`.'],
  ['diagram', {w: 640, h: 210, keep: 480, cap: 'Grid mit 4 Spalten: Die Zahlen oben sind die Spaltenlinien. grid-column: 1 / 5 geht über die volle Breite, grid-column: 1 / 4 über drei Spalten.', nodes: [
    {id: 'l1', k: 'text', x: 40, y: 16, t: '1', w: 10, h: 10}, {id: 'l2', k: 'text', x: 180, y: 16, t: '2', w: 10, h: 10}, {id: 'l3', k: 'text', x: 320, y: 16, t: '3', w: 10, h: 10}, {id: 'l4', k: 'text', x: 460, y: 16, t: '4', w: 10, h: 10}, {id: 'l5', k: 'text', x: 600, y: 16, t: '5', w: 10, h: 10},
    {id: 'a', k: 'box', x: 320, y: 50, w: 560, h: 40, t: '#ablauf  (grid-column: 1 / 5; grid-row: 1)', s: 'accent'},
    {id: 'm', k: 'box', x: 250, y: 140, w: 420, h: 120, t: '#map  (grid-column: 1 / 4; grid-row: 2 / 5)', s: 'soft'},
    {id: 'u', k: 'box', x: 530, y: 100, w: 140, h: 36, t: '#auftrag', s: 'plain'},
    {id: 'g', k: 'box', x: 530, y: 140, w: 140, h: 36, t: '#angebot', s: 'plain'},
    {id: 'b', k: 'box', x: 530, y: 180, w: 140, h: 36, t: '#buchung', s: 'plain'},
  ], edges: []}],
  ['h3', 'Prüfungsbeispiel Sommer 2022: Fünf Container positionieren (8 Punkte)'],
  ['codes', [
    ['html', `<div class="grid-container">
  <div id="ablauf">...</div>
  <div id="map">...</div>
  <div id="auftrag">...</div>
  <div id="angebot">...</div>
  <div id="buchung">...</div>
</div>`],
    ['css', `.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 25vw);   /* 4 gleich breite Spalten */
  grid-template-rows: repeat(4, 25vh);      /* 4 gleich hohe Zeilen */
}
#ablauf  { grid-column: 1 / 5; grid-row: 1; }      /* oben, volle Breite */
#map     { grid-column: 1 / 4; grid-row: 2 / 5; }  /* links, 3 Spalten, 3 Zeilen */
#auftrag { grid-column: 4 / 5; grid-row: 2 / 3; }
#angebot { grid-column: 4 / 5; grid-row: 3 / 4; }
#buchung { grid-column: 4 / 5; grid-row: 4 / 5; }`],
  ]],
  ['note', '`grid-column: 1 / 5` ist die Kurzform von `grid-column-start: 1; grid-column-end: 5;`. Das Ende ist die **Linie**, an der das Item aufhört, nicht die letzte Spalte. Alternativ: `grid-column: span 3` (über drei Spalten).'],
  ['h3', 'Prüfungsbeispiel Sommer 2025: Tagesmenüs nebeneinander (10 Punkte)'],
  ['code', 'css', `.menu-selection {               /* Container eines Tages */
  display: grid;
  grid-template-columns: auto auto auto auto;  /* Datum + 3 Gerichte nebeneinander */
}
.menu-item   { text-align: center; padding: 10px; border: 1px solid #ddd; }
.description { color: #666; }                 /* graue Beschreibung */
.price       { font-weight: bold; }
.rating      { color: gold; }                 /* goldener Stern */
.vegetarian  { border-color: green; }         /* vegetarisch grün umrandet */`],
  ['h', 'Flexbox: Elemente in einer Reihe verteilen'],
  ['p', 'Flexbox ordnet Kinder in **einer Richtung** an (Zeile oder Spalte) und verteilt den Platz. Ideal für Navigationsleisten, Kartenreihen oder um Dinge zu zentrieren.'],
  ['code', 'css', `.leiste {
  display: flex;
  flex-direction: row;            /* row (Standard) oder column */
  justify-content: space-between; /* Verteilung auf der Hauptachse */
  align-items: center;            /* Ausrichtung quer dazu */
  flex-wrap: wrap;                /* umbrechen, wenn kein Platz */
  gap: 16px;
}
.leiste > div { flex: 1 1 300px; } /* wachsen, schrumpfen, Basisbreite 300px */`],
  ['table', ['', 'Grid', 'Flexbox'], [
    ['Dimension', 'Zweidimensional (Zeilen **und** Spalten)', 'Eindimensional (Zeile **oder** Spalte)'],
    ['Denkweise', 'Layout zuerst: Raster festlegen, Items einsetzen', 'Inhalt zuerst: Items verteilen sich'],
    ['Typisch', 'Seitenlayout, Dashboard, Formular-Raster', 'Menüleiste, Buttons, Zentrieren'],
  ]],
  ['h', 'Media Queries: Responsive Design'],
  ['p', 'Mit `@media` gelten Regeln nur, wenn eine **Bedingung** erfüllt ist: Bildschirmbreite, Ausrichtung (Hoch- oder Querformat), Medientyp (screen, print). So passt sich eine Seite an Smartphone, Tablet und PC an (**Responsive Design**, oft **Mobile First**: zuerst für kleine Bildschirme, dann mit `min-width` erweitern).'],
  ['code', 'css', `@media screen and (orientation: portrait)  { ... }  /* Hochformat */
@media screen and (orientation: landscape) { ... }  /* Querformat */
@media (max-width: 499px) { ... }   /* bis einschließlich 499 px Breite */
@media (min-width: 700px) { ... }   /* ab 700 px Breite */
@media (min-width: 600px) and (max-width: 900px) { ... }`],
  ['warn', '**Reihenfolge beachten!** Media Queries haben **keine** höhere Spezifität. Stehen sie **vor** den normalen Regeln, werden sie von diesen wieder überschrieben. Deshalb: Media Queries ans **Ende** der CSS-Datei. (Winter 2025/26: "Achten Sie auf die Reihenfolge Ihrer Befehle und ergänzen Sie, ob Ihre Befehle vor oder nach den bisherigen CSS-Befehlen stehen sollen.")'],
  ['h3', 'Prüfungsbeispiel Winter 2025/26: Anordnung je nach Ausrichtung (8 Punkte)'],
  ['p', 'Die mittlere Zeile (`id="row"`) enthält drei Elemente: `#text`, `#check`, `#cost`. **Hochformat:** Text oben über die volle Breite, darunter Check und Cost nebeneinander. **Querformat:** alle drei nebeneinander, Text doppelt so breit.'],
  ['code', 'css', `/* Basis = Hochformat: 2 Spalten, Text über beide */
#row  { display: grid; grid-template-columns: 1fr 1fr; align-content: center; }
#text { grid-column: 1 / 3; }

/* Querformat: 3 Spalten, Text nur in der ersten */
@media (orientation: landscape) {
  #row  { grid-template-columns: 2fr 1fr 1fr; }
  #text { grid-column: 1 / 2; }
}`],
  ['h3', 'Prüfungsbeispiel Winter 2025/26: Schriftgrößen (5 Punkte)'],
  ['p', 'Anforderungen: Querformat 1,1-fache, Hochformat 1,2-fache Basisschrift. Unter 500 px Breite Schrift um 10 % größer, ab 700 px um 10 % kleiner. Trick: Die Ausrichtung setzt die Größe am **Container**, die Breitenregel ändert sie am Kind **in Prozent** (Prozent bei `font-size` beziehen sich auf das Elternelement, die Faktoren multiplizieren sich also).'],
  ['code', 'css', `/* NACH den bisherigen Regeln einfügen */
@media (orientation: landscape) { .container { font-size: 1.1rem; } }
@media (orientation: portrait)  { .container { font-size: 1.2rem; } }
@media (max-width: 499px)       { #row { font-size: 110%; } }  /* +10 % */
@media (min-width: 700px)       { #row { font-size: 90%; } }   /* -10 % */`],
  ['note', 'Die offizielle Lösung setzt einfach feste Werte (`font-size: 1.1rem` bzw. `0.9rem`). Beide Wege werden akzeptiert, wenn die Reihenfolge stimmt und die Bedingungen korrekt sind (unter 500 px = `max-width: 499px` oder `max-width: 500px`).'],
  ['h3', 'Prüfungsbeispiel Sommer 2023: Ab 600 px nebeneinander, gelber Hintergrund'],
  ['code', 'css', `.block { width: 100%; }            /* Aktor und Sensor untereinander */
@media screen and (min-width: 601px) {
  .block { width: 50%; float: left; }   /* oder: Container mit display: grid / flex */
  body   { background-color: yellow; }
}`],
  ['h', 'Positionierung (Logo oben rechts mit 30 px Abstand)'],
  ['code', 'css', `/* Möglichkeit 1: absolute/fixed Positionierung */
#logo { position: absolute; top: 0; right: 30px; }
/* Möglichkeit 2: Float mit Außenabstand */
#logo { float: right; margin-right: 30px; }
/* Möglichkeit 3: Flexbox im Kopfbereich */
header { display: flex; justify-content: flex-end; padding-right: 30px; }`],
  ['table', ['position', 'Bezug', 'Verhalten beim Scrollen'], [
    ['`static`', 'Normaler Fluss (Standard)', 'scrollt mit'],
    ['`relative`', 'Verschoben gegenüber der eigenen Normalposition', 'scrollt mit'],
    ['`absolute`', 'Nächster positionierter Vorfahr (sonst Seite)', 'scrollt mit, aus dem Fluss genommen'],
    ['`fixed`', 'Browserfenster', 'bleibt stehen'],
    ['`sticky`', 'Normal, bis eine Schwelle erreicht ist', 'klebt dann fest'],
  ]],
  ['h', 'Bootstrap über ein CDN einbinden: Was ist zu beachten?'],
  ['code', 'html', `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-..."  crossorigin="anonymous">`],
  ['list', [
    '**Datenschutz (DSGVO):** Beim Laden von einem fremden Server wird die **IP-Adresse** des Besuchers an den CDN-Betreiber übertragen. Das muss in der **Datenschutzerklärung** stehen oder man hostet die Datei selbst.',
    '**Integrität:** Ohne `integrity`-Attribut (**Subresource Integrity**, Hash der Datei) könnte eine manipulierte Datei vom CDN eingeschleust werden. Dazu gehört `crossorigin="anonymous"`.',
    '**Feste Version:** Es wird auf Version 5.0.2 verwiesen; Updates und Sicherheitsfixes kommen nicht automatisch, andere Versionen können inkompatibel sein.',
    '**Verfügbarkeit / Abhängigkeit:** Fällt das CDN aus oder ist offline kein Internet da, fehlt das Layout.',
    '**Konflikte und Ladezeit:** Bootstrap-Klassen können eigene Regeln überschreiben; viel ungenutztes CSS. Die JavaScript-Komponenten brauchen zusätzlich `bootstrap.bundle.min.js`.',
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erläutern Sie zwei Möglichkeiten, CSS-Code einzubinden, mit je einem Vor- und Nachteil.', ['**Intern im `<style>`-Bereich des HTML-Kopfes:** Vorteil: alles in einer Datei, direkter Zugriff, gut für kleine Seiten. Nachteil: gilt nur für diese Seite, wird bei vielen Seiten unübersichtlich und muss mehrfach gepflegt werden.', '**Externe CSS-Datei mit `<link>`:** Vorteil: gute Wart- und Erweiterbarkeit, eine Änderung wirkt auf alle Seiten, Trennung von Inhalt und Gestaltung, Caching. Nachteil: zwei Dateien müssen gepflegt werden, zusätzlicher Request.'], 6],
  ['qa', 'Ein Navigationsbereich soll auf Bildschirmen ab 768 px Breite links neben dem Inhalt stehen (Verhältnis 1:3), auf kleineren Bildschirmen darüber. Schreiben Sie das CSS für den Container `.seite` mit den Kindern `nav` und `main`.', [['code', 'css', `.seite { display: grid; grid-template-columns: 1fr; }   /* mobil: untereinander */
@media (min-width: 768px) {
  .seite { grid-template-columns: 1fr 3fr; }              /* nebeneinander 1:3 */
}`]], 4],
  ['qa', 'Für ein Element gelten die Regeln `p { color: blue; }`, `.hinweis { color: green; }` und `#info { color: orange; }`. Das HTML lautet `<p id="info" class="hinweis">`. Welche Farbe hat der Text? Begründen Sie.', ['**Orange.** Alle drei Selektoren treffen zu. Die **Spezifität** entscheidet: id-Selektor (0,1,0,0) ist spezifischer als Klasse (0,0,1,0) und Element (0,0,0,1). Nur ein Inline-Style oder `!important` könnte das überstimmen.'], 3],
  ['quiz', [
    {q: 'Welche CSS-Einbindung hat die höchste Priorität?', o: ['Inline (style-Attribut)', 'Externe Datei', 'style-Bereich im head', 'Browser-Standard'], a: 0, e: 'Inline-Styles haben die höchste Spezifität (außer !important).'},
    {q: 'Was bewirkt grid-column: 1 / 3?', o: ['Item reicht von Linie 1 bis Linie 3 (zwei Spalten)', 'Item steht in Spalte 3', 'Drei Spalten breit', 'Item in Zeile 1 bis 3'], a: 0, e: 'Angegeben werden Linien, nicht Spalten.'},
    {q: 'Welche Media Query trifft auf das Querformat zu?', o: ['@media (orientation: landscape)', '@media (orientation: portrait)', '@media (landscape: true)', '@media (rotate: 90deg)'], a: 0, e: 'portrait = Hochformat.'},
    {q: 'Was bedeutet 1.1rem?', o: ['1,1-fache Schriftgröße des html-Elements', '1,1 Pixel', '110 % der Elternbreite', '1,1-fache Zeilenhöhe'], a: 0, e: 'rem = root em.'},
    {q: 'Warum stehen Media Queries meist am Ende der CSS-Datei?', o: ['Sonst überschreiben spätere normale Regeln sie', 'Weil der Browser sie sonst ignoriert', 'Aus Performancegründen', 'Weil es die Syntax verlangt'], a: 0, e: 'Bei gleicher Spezifität gewinnt die spätere Regel.'},
    {q: 'Wofür dient das integrity-Attribut beim Einbinden von CDN-Dateien?', o: ['Prüft per Hash, dass die Datei nicht manipuliert wurde', 'Beschleunigt den Download', 'Komprimiert die Datei', 'Legt die Version fest'], a: 0, e: 'Subresource Integrity.'},
  ]],
  ['see', ['eua-html', 'eua-js', 'course-css-01']],
]);
