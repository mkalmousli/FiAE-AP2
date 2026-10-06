AP2.page('course-html-01', {
  b: 'course', g: 'HTML', t: 'HTML 1: Grundgerüst, Elemente und Attribute',
  d: '**HTML** (HyperText Markup Language) ist eine **Auszeichnungssprache**, keine Programmiersprache: Sie beschreibt die **Struktur und Bedeutung** von Inhalten. Ein **Element** besteht meist aus **Start-Tag**, Inhalt und **End-Tag** (`<p>Text</p>`); **leere Elemente** wie `<br>` oder `<img>` haben kein End-Tag. **Attribute** im Start-Tag liefern Zusatzinformationen (`<a href="...">`). Jede Seite hat ein festes **Grundgerüst**: `<!DOCTYPE html>`, `<html>`, `<head>` (Metadaten) und `<body>` (sichtbarer Inhalt). Der Browser baut daraus den **DOM-Baum**.',
  m: '**HTML = Struktur, CSS = Aussehen, JavaScript = Verhalten.** **Elemente korrekt verschachteln: zuletzt geöffnet, zuerst geschlossen.** **Attributwerte in Anführungszeichen.** **`id` einmalig pro Seite, `class` beliebig oft.** **Pflicht im head: `meta charset="utf-8"`, `title`, für Mobilgeräte `meta viewport`.**',
  cheat: [
    ['Grundgerüst', ['`<!DOCTYPE html>`', '`<html lang="de">`', '`<head>` ... `</head>`', '`<body>` ... `</body>`']],
    ['head', ['`<meta charset="utf-8">`', '`<meta name="viewport" content="width=device-width, initial-scale=1">`', '`<title>Seitentitel</title>`', '`<link rel="stylesheet" href="style.css">`']],
    ['Globale Attribute', ['`id="eindeutig"`', '`class="a b"`', '`style="..."` (inline CSS)', '`title`, `lang`, `hidden`, `data-*`']],
    ['Syntax', ['`<!-- Kommentar -->`', 'Entitäten: `&lt; &gt; &amp; &nbsp;`', 'Umlaute: UTF-8 oder `&auml;`', 'Groß-/Kleinschreibung egal, klein üblich']],
  ],
  blocks: [
    ['h', 'Das Grundgerüst'],
    ['code', 'html', `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Mensa-Bestellsystem des BSZ Neckaralb">
  <title>MeBS - Mensa-Bestellsystem</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Willkommen bei MeBS</h1>
  <p>Hier bestellst du dein <strong>Tagesgericht</strong>.</p>
  <script src="app.js"></script>
</body>
</html>`],
    ['table', ['Teil', 'Bedeutung'], [
      ['`<!DOCTYPE html>`', 'HTML5-Dokument; ohne Doctype rendert der Browser im fehlerhaften "Quirks-Modus"'],
      ['`<html lang="de">`', 'Wurzelelement; `lang` hilft Screenreadern, Übersetzern und Silbentrennung'],
      ['`<head>`', 'Metadaten, nicht sichtbar: Zeichensatz, Titel, CSS, Beschreibung für Suchmaschinen'],
      ['`<meta charset="utf-8">`', 'Zeichenkodierung: Umlaute und Sonderzeichen werden korrekt angezeigt'],
      ['`<meta name="viewport">`', 'Mobilgeräte zeigen die Seite in Gerätebreite statt verkleinert (Grundlage für Responsive Design)'],
      ['`<title>`', 'Text im Browser-Tab, in Lesezeichen und in Suchergebnissen'],
      ['`<body>`', 'Alles, was angezeigt wird'],
    ]],
    ['h', 'Elemente, Tags und Attribute'],
    ['diagram', {w: 640, h: 120, keep: 480, cap: 'Aufbau eines Elements', nodes: [
      {id: 's', k: 'box', x: 150, y: 50, w: 250, h: 40, t: '<a href="kontakt.html">', s: 'accent'},
      {id: 'i', k: 'box', x: 365, y: 50, w: 160, h: 40, t: 'Kontakt', s: 'soft'},
      {id: 'e', k: 'box', x: 510, y: 50, w: 110, h: 40, t: '</a>', s: 'accent'},
      {id: 't1', k: 'text', x: 150, y: 100, t: 'Start-Tag mit Attribut', w: 10, h: 10}, {id: 't2', k: 'text', x: 365, y: 100, t: 'Inhalt', w: 10, h: 10}, {id: 't3', k: 'text', x: 510, y: 100, t: 'End-Tag', w: 10, h: 10},
    ], edges: []}],
    ['code', 'html', `<p>Ein Absatz mit <em>betontem</em> und <strong>wichtigem</strong> Text.</p>   <!-- verschachtelt -->
<img src="logo.gif" alt="Logo Smart Home" width="120">                       <!-- leeres Element -->
<br>                                                                            <!-- Zeilenumbruch -->
<input type="checkbox" checked>                                                 <!-- boolesches Attribut -->
<p id="hinweis" class="info klein" title="Tooltip">Text</p>`],
    ['warn', 'Falsch verschachtelt: `<p><strong>Text</p></strong>`. Richtig: `<p><strong>Text</strong></p>`. Browser "reparieren" vieles stillschweigend, aber das Ergebnis ist unvorhersehbar. Prüfen kann man mit dem W3C-Validator (validator.w3.org).'],
    ['h', 'id und class'],
    ['table', ['', '`id`', '`class`'], [
      ['Häufigkeit', 'Genau **einmal** pro Seite', 'Beliebig oft, ein Element kann mehrere Klassen haben'],
      ['CSS-Selektor', '`#termin`', '`.rating`'],
      ['JavaScript', '`document.getElementById("termin")`', '`document.querySelectorAll(".rating")`'],
      ['Weitere Nutzung', 'Sprungziel `href="#termin"`, `label for="..."`', 'Gruppen gleich gestalteter Elemente'],
    ]],
    ['h', 'Block- und Inline-Elemente'],
    ['p', '**Blockelemente** (`div`, `p`, `h1`-`h6`, `ul`, `table`, `form`, `section`) beginnen auf einer neuen Zeile und nehmen die volle Breite ein. **Inline-Elemente** (`span`, `a`, `strong`, `em`, `img`, `input`, `label`) stehen im Textfluss und sind nur so breit wie ihr Inhalt. Mit CSS `display` lässt sich das ändern.'],
    ['h', 'Sonderzeichen'],
    ['table', ['Zeichen', 'Entität', 'Warum?'], [
      ['<', '`&lt;`', 'würde sonst als Tag-Beginn gelesen'], ['>', '`&gt;`', ''], ['&', '`&amp;`', 'beginnt Entitäten'], ['geschütztes Leerzeichen', '`&nbsp;`', 'kein Umbruch: `10&nbsp;€`'], ['ä ö ü ß', '`&auml; &ouml; &uuml; &szlig;`', 'nur nötig ohne UTF-8'], ['©', '`&copy;`', ''],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Erstellen Sie das Grundgerüst einer deutschsprachigen Seite mit dem Titel "Kita Stuttgart", einer externen CSS-Datei `kita.css` und einer Überschrift zweiter Ordnung "Onlineanmeldung".', [['code', 'html', `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kita Stuttgart</title>
  <link rel="stylesheet" href="kita.css">
</head>
<body>
  <h2>Onlineanmeldung</h2>
</body>
</html>`]], 4],
    ['quiz', [
      {q: 'Wo steht der Seitentitel?', o: ['Im head als <title>', 'Im body als <h1>', 'Im <meta name="title">', 'Im <header>'], a: 0, e: 'h1 ist die sichtbare Überschrift.'},
      {q: 'Wie oft darf eine id auf einer Seite vorkommen?', o: ['Einmal', 'Beliebig oft', 'Zweimal', 'Nur im head'], a: 0, e: 'class beliebig oft.'},
      {q: 'Wofür ist meta viewport?', o: ['Korrekte Darstellung auf Mobilgeräten', 'Suchmaschinenranking', 'Zeichenkodierung', 'Seitentitel'], a: 0, e: 'Grundlage für Responsive Design.'},
      {q: 'Welches Element ist leer (ohne End-Tag)?', o: ['img', 'p', 'div', 'a'], a: 0, e: 'Auch br, input, meta, link.'},
    ]],
    ['see', ['course-html-02', 'eua-html', 'course-css-01']],
  ],
});
