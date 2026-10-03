AP2.page('course-html', {
  b: 'course', g: 'Webtechnologien', t: 'HTML: vollständiger Kurs (HTML5, Semantik, Formulare, Barrierefreiheit)',
  d: '**HTML (HyperText Markup Language)** ist die **Auszeichnungssprache** für die **Struktur und Bedeutung** von Webseiten. Ein **Element** besteht aus **Starttag, Inhalt und Endtag** (`<p>Text</p>`); **Attribute** geben Zusatzinfos (`<a href="...">`). Der Browser baut daraus den **DOM-Baum (Document Object Model)**. **HTML = Struktur, CSS = Darstellung, JavaScript = Verhalten.**',
  m: '**Semantik statt Optik:** Tags beschreiben **Bedeutung** (`nav`, `main`, `article`), nicht Aussehen. **Jedes Bild: `alt`. Jedes Formularfeld: `label`.** **Block-Elemente brechen um, Inline-Elemente fließen im Text.** **Leere Elemente** (`br`, `img`, `input`, `hr`, `meta`) haben keinen Endtag.',
  cheat: [
    ['Grundgerüst', ['`<!DOCTYPE html>` (Standardmodus)', '`<html lang="de">`', '`<head>`: `meta charset`, `title`, `meta viewport`, `link`', '`<body>`: sichtbarer Inhalt']],
    ['Text', ['`h1`-`h6` Überschriften (eine `h1`)', '`p`, `br`, `hr`, `blockquote`, `pre`, `code`', '`strong` wichtig, `em` betont', '`ul`/`ol`/`li`, `dl`/`dt`/`dd`']],
    ['Semantik', ['`header`, `nav`, `main`, `section`', '`article`, `aside`, `footer`', '`figure`/`figcaption`, `time`, `address`', '`div`/`span` nur ohne Bedeutung']],
    ['Formular', ['`form action method`', '`input type=text|email|password|number|date|checkbox|radio|file|range`', '`label for`, `select/option`, `textarea`, `button`', '`required`, `pattern`, `min`, `max`']],
    ['Medien und Links', ['`a href target rel`', '`img src alt width height loading`', '`picture/source`, `video`, `audio`', '`iframe`']],
    ['Barrierefreiheit', ['Alternativtexte, Labels', 'Überschriftenhierarchie', '`aria-*`, `role` nur wenn nötig', 'Tastatur, Kontrast, `lang`']],
  ],
  blocks: [
    ['h', 'Grundgerüst'],
    ['code', 'html', `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">                                   <!-- Zeichensatz: Umlaute korrekt -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">   <!-- responsiv auf Mobilgeräten -->
  <meta name="description" content="Kurzbeschreibung für Suchmaschinen">
  <title>Meine Seite</title>
  <link rel="stylesheet" href="style.css">
  <script src="app.js" defer></script>                     <!-- defer: nach dem Parsen ausführen -->
</head>
<body>
  <header><h1>Mein Blog</h1><nav><a href="/">Start</a> <a href="/info">Info</a></nav></header>
  <main>
    <article>
      <h2>Erster Beitrag</h2>
      <p>Text mit <strong>wichtigem</strong> und <em>betontem</em> Wort.</p>
    </article>
  </main>
  <footer><small>&copy; 2026 Anna</small></footer>
</body>
</html>`],
    ['table', ['Bestandteil', 'Bedeutung'], [['`<!DOCTYPE html>`', 'Aktiviert den **Standardmodus** (ohne ihn: Quirks-Modus mit altem Verhalten)'], ['`lang="de"`', 'Sprache für Screenreader, Silbentrennung, Übersetzung'], ['`meta charset`', 'Zeichenkodierung UTF-8'], ['`meta viewport`', 'Grundlage für responsive Gestaltung am Smartphone'], ['`defer` / `async`', '`defer`: Skript lädt parallel, läuft **nach** dem Parsen in Reihenfolge; `async`: läuft sofort nach dem Laden, Reihenfolge offen']]],
    ['h', 'Block, Inline und Attribute'],
    ['table', ['Art', 'Verhalten', 'Beispiele'], [['**Block**', 'Beginnt in neuer Zeile, nimmt volle Breite', '`div`, `p`, `h1`, `ul`, `section`, `form`'], ['**Inline**', 'Fließt im Text, Breite nach Inhalt', '`span`, `a`, `strong`, `em`, `img`, `code`'], ['**Global attributes**', 'Für jedes Element', '`id` (eindeutig), `class`, `style`, `title`, `hidden`, `tabindex`, `lang`, `data-*`, `aria-*`']]],
    ['code', 'html', `<p id="intro" class="lead hervor" data-nutzer="42" title="Tooltip">Text</p>
<!-- id: einmalig pro Seite (Sprungziel #intro); class: mehrfach, für CSS/JS; data-*: eigene Daten -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">extern</a>
<a href="#kapitel2">Sprung innerhalb der Seite</a>   <a href="mailto:info@x.de">Mail</a>   <a href="tel:+4973112345">Anrufen</a>
<a href="datei.pdf" download>PDF laden</a>`],
    ['warn', '`target="_blank"` immer mit `rel="noopener noreferrer"`, sonst kann die geöffnete Seite über `window.opener` die ursprüngliche beeinflussen.'],
    ['h', 'Text, Listen, Zeichen'],
    ['code', 'html', `<h2>Zutaten</h2>
<ul><li>Mehl</li><li>Eier <ul><li>Bio</li></ul></li></ul>        <!-- ungeordnet, verschachtelbar -->
<ol start="3" reversed><li>drei</li><li>zwei</li></ol>              <!-- geordnet -->
<dl><dt>HTML</dt><dd>Auszeichnungssprache</dd></dl>                 <!-- Begriff und Beschreibung -->
<blockquote cite="https://q.de">Zitat</blockquote>  <q>kurz</q>  <abbr title="Structured Query Language">SQL</abbr>
<pre><code>formatierter
   Quelltext</code></pre>
<p>Zeile<br>Umbruch, &lt;tag&gt; &amp; &nbsp; &euro; &copy; &quot;</p>   <!-- Entities für Sonderzeichen -->
<mark>markiert</mark> <del>gelöscht</del> <ins>neu</ins> <sub>tief</sub> <sup>hoch</sup> <time datetime="2026-05-31">31. Mai</time>`],
  ],
});
