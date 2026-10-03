AP2.add('course-css', [
  ['h', 'Das Box-Modell'],
  ['diagram', {w: 520, h: 230, keep: 360, cap: 'Das CSS-Box-Modell: von innen nach außen Content, Padding, Border, Margin', nodes: [
    {id: 'm', k: 'box', x: 260, y: 115, t: '', w: 460, h: 200, s: 'ghost'}, {id: 'b', k: 'box', x: 260, y: 115, t: '', w: 360, h: 150, s: 'soft'}, {id: 'p', k: 'box', x: 260, y: 115, t: '', w: 260, h: 100, s: 'accent'}, {id: 'c', k: 'box', x: 260, y: 115, t: 'Content', w: 130, h: 44, s: 'solid'},
    {id: 'l1', k: 'text', x: 260, y: 22, t: 'margin (Abstand außen, transparent)', fs: 12}, {id: 'l2', k: 'text', x: 260, y: 52, t: 'border (Rahmen)', fs: 12}, {id: 'l3', k: 'text', x: 260, y: 82, t: 'padding (Innenabstand)', fs: 12},
  ], edges: []}],
  ['code', 'css', `*, *::before, *::after { box-sizing: border-box; }   /* empfohlen: width enthält Padding und Border */
.box { width: 300px; padding: 20px; border: 2px solid #333; margin: 16px auto; }
/* content-box (Standard): Gesamtbreite = 300 + 2*20 + 2*2 = 344px   border-box: Gesamtbreite = 300px */
margin: 10px 20px;          /* oben/unten 10, links/rechts 20 */
margin: 10px 20px 30px 40px;/* oben rechts unten links (im Uhrzeigersinn) */
margin: 0 auto;             /* horizontal zentrieren (Blockelement mit fester Breite) */`],
  ['note', '**Margin-Kollaps:** Vertikale Außenabstände benachbarter Block-Elemente verschmelzen zum **größeren** Wert (nicht Summe). In Flex- und Grid-Containern kollabieren sie nicht.'],
  ['table', ['display', 'Verhalten'], [['`block`', 'Neue Zeile, volle Breite, Breite/Höhe wirksam'], ['`inline`', 'Im Textfluss, Breite/Höhe und vertikale Margins unwirksam'], ['`inline-block`', 'Im Textfluss, aber mit Breite und Höhe'], ['`flex` / `grid`', 'Moderne Layout-Container'], ['`none`', 'Element entfällt komplett (nicht `visibility: hidden`, das behält den Platz)']]],
  ['h', 'Positionierung'],
  ['table', ['position', 'Verhalten', 'Typische Verwendung'], [['`static`', 'Normaler Fluss (Standard)', ''], ['`relative`', 'Normaler Fluss, aber mit Versatz (`top/left`); **Bezugspunkt** für Kinder', 'Elternteil für `absolute`'], ['`absolute`', 'Aus dem Fluss, relativ zum nächsten **positionierten** Vorfahren', 'Badges, Overlays, Tooltips'], ['`fixed`', 'Relativ zum **Fenster**, scrollt nicht mit', 'Kopfleiste, Cookie-Banner'], ['`sticky`', 'Normal, bis eine Schwelle erreicht wird, dann haftend', 'Tabellenkopf, Seitenleiste']]],
  ['code', 'css', `.kopf { position: sticky; top: 0; z-index: 10; }          /* z-index: Stapelreihenfolge (nur bei positionierten Elementen) */
.elter { position: relative; }  .badge { position: absolute; top: -8px; right: -8px; }
.abdeckung { position: fixed; inset: 0; background: rgb(0 0 0 / .5); }   /* inset = top/right/bottom/left */
.float-bild { float: left; margin-right: 1rem; }  .nach { clear: both; }   /* Floats: nur noch für Textumfluss */`],
  ['h', 'Flexbox: eindimensionales Layout'],
  ['code', 'css', `.zeile {
  display: flex;
  flex-direction: row;            /* row | column | row-reverse | column-reverse  (Hauptachse) */
  flex-wrap: wrap;                /* Umbruch bei Platzmangel */
  gap: 16px;                      /* Abstand zwischen Kindern */
  justify-content: space-between; /* Verteilung auf der HAUPTachse: flex-start|center|flex-end|space-around|space-evenly */
  align-items: center;            /* Ausrichtung auf der QUERachse: stretch|flex-start|center|baseline */
}
.kind  { flex: 1 1 200px; }       /* flex-grow flex-shrink flex-basis: wächst, schrumpft, Startgröße */
.mitte { margin-left: auto; }     /* schiebt nach rechts */
.sonder{ align-self: flex-end; order: 2; }
/* Zentrieren in beide Richtungen: */
.zentriert { display: flex; justify-content: center; align-items: center; min-height: 100vh; }`],
  ['h', 'Grid: zweidimensionales Layout'],
  ['code', 'css', `.raster {
  display: grid;
  grid-template-columns: 240px 1fr;          /* feste Seitenleiste, Rest flexibel */
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "kopf kopf" "seite inhalt" "fuss fuss";
  gap: 16px;
}
.kopf { grid-area: kopf; }  .seite { grid-area: seite; }  .inhalt { grid-area: inhalt; }  .fuss { grid-area: fuss; }
.galerie { display: grid; gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }   /* automatisch responsiv, ohne Media Query */
.gross { grid-column: span 2; grid-row: 1 / 3; }`],
  ['table', ['', 'Flexbox', 'Grid'], [['Dimension', '**Eine** Achse (Zeile oder Spalte)', '**Zwei** Achsen (Zeilen und Spalten)'], ['Ansatz', 'Inhaltsgetrieben (Elemente bestimmen)', 'Layoutgetrieben (Raster bestimmt)'], ['Geeignet für', 'Menüs, Button-Gruppen, Karten-Zeilen, Zentrieren', 'Seitenlayouts, Galerien, Dashboards'], ['Kombination', 'Häufig **Grid für das Gesamtlayout, Flexbox für Teile**', '']]],
]);
