AP2.page('course-html-02', {
  b: 'course', g: 'HTML', t: 'HTML 2: Text, Listen, Links und Bilder',
  d: 'Für Texte gibt es **Überschriften** (`h1` bis `h6`, eine `h1` pro Seite, Ebenen nicht überspringen), **Absätze** (`p`), **Hervorhebungen** (`strong` für Wichtiges, `em` für Betonung) und **Listen** (`ul` ungeordnet, `ol` nummeriert, `dl` Begriff-Beschreibung). **Links** (`a href`) verweisen auf andere Seiten, Abschnitte (`#id`), E-Mail (`mailto:`) oder Telefon (`tel:`); Pfade sind **absolut** (`https://...`) oder **relativ** (`../bilder/logo.png`). **Bilder** (`img`) brauchen `src` und einen aussagekräftigen **`alt`-Text**.',
  m: '**Überschriften nach Gliederung, nicht nach Größe wählen.** **strong/em statt b/i (Bedeutung statt Aussehen).** **Jedes img mit alt; rein dekorative Bilder: alt="".** **Externe Links in neuem Tab: target="_blank" rel="noopener".** **Relative Pfade: `./` gleicher Ordner, `../` eine Ebene höher.**',
  cheat: [
    ['Text', ['`<h1>`...`<h6>`', '`<p>`, `<br>`, `<hr>`', '`<strong>`, `<em>`, `<mark>`, `<small>`', '`<blockquote>`, `<pre>`, `<code>`']],
    ['Listen', ['`<ul><li>..</li></ul>`', '`<ol start="3">`', '`<dl><dt>Begriff</dt><dd>Erklärung</dd></dl>`', 'Listen verschachteln']],
    ['Links', ['`<a href="seite.html">`', '`href="#kontakt"` Sprungmarke', '`href="mailto:info@kita.de"`', '`target="_blank" rel="noopener"`']],
    ['Bilder', ['`<img src="a.jpg" alt="...">`', '`width`, `height` (gegen Springen)', '`loading="lazy"`', '`<figure>` + `<figcaption>`']],
  ],
  blocks: [
    ['h', 'Überschriften und Absätze'],
    ['code', 'html', `<h1>Mensa BSZ Neckaralb</h1>          <!-- Hauptthema der Seite -->
<h2>Tagesmenüs</h2>
<h3>Montag, 08.01.</h3>
<p>Alle Gerichte werden frisch zubereitet.<br>
   Bestellschluss ist <strong>9:30 Uhr</strong>.</p>
<hr>                                    <!-- thematischer Trenner -->
<p><small>© 2024 MeBS - Mensa-Bestell-System. Alle Rechte vorbehalten.</small></p>`],
    ['note', 'Screenreader-Nutzer springen über die Überschriften durch die Seite. Deshalb: Ebenen logisch verwenden (nach h2 kommt h3, nicht h5) und für Größen CSS benutzen.'],
    ['h', 'Listen'],
    ['code', 'html', `<ul>                          <!-- ungeordnet: Aufzählungspunkte -->
  <li>Schnitzel Wiener Art</li>
  <li>Vegetarische Gemüsepfanne
    <ul><li>vegan möglich</li></ul>   <!-- verschachtelt INNERHALB von li -->
  </li>
</ul>

<ol>                          <!-- nummeriert -->
  <li>Gericht auswählen</li>
  <li>Daten eingeben</li>
  <li>Bestellung absenden</li>
</ol>

<dl>                          <!-- Beschreibungsliste -->
  <dt>PZR</dt><dd>Professionelle Zahnreinigung</dd>
  <dt>IGeL</dt><dd>Individuelle Gesundheitsleistung</dd>
</dl>`],
    ['h', 'Links'],
    ['code', 'html', `<a href="KitaStuttgart.html">Zurück zur Startseite</a>                  <!-- relativ, gleicher Ordner -->
<a href="../impressum.html">Impressum</a>                                 <!-- eine Ebene höher -->
<a href="https://www.ihk.de" target="_blank" rel="noopener">IHK</a>      <!-- absolut, neuer Tab -->
<a href="#bestellen">Zum Bestellformular</a>                               <!-- Sprung zu id="bestellen" -->
<a href="mailto:mensa@bsz-neckaralb.de?subject=Frage">E-Mail</a>
<a href="tel:+497121123456">0 71 21 / 12 34 56</a>
<a href="preise.pdf" download>Preisliste herunterladen</a>`],
    ['tip', 'Linktexte sollen **für sich verständlich** sein ("Preisliste herunterladen" statt "hier klicken"), weil Screenreader Links auch als Liste vorlesen.'],
    ['h', 'Bilder'],
    ['code', 'html', `<img src="bilder/schnitzel.jpg" alt="Schnitzel mit Pommes und Zitrone"
     width="400" height="300" loading="lazy">

<figure>
  <img src="diagramm.png" alt="Break-even bei 4.000 Gerichten">
  <figcaption>Abb. 1: Kosten- und Erlösverlauf der Mensa</figcaption>
</figure>

<img src="trenner.png" alt="">     <!-- rein dekorativ: leeres alt, Screenreader überspringt -->`],
    ['table', ['Format', 'Eigenschaften', 'Einsatz'], [
      ['JPEG', 'verlustbehaftet, viele Farben, keine Transparenz', 'Fotos'],
      ['PNG', 'verlustfrei, Transparenz', 'Grafiken, Screenshots, Logos'],
      ['GIF', '256 Farben, Animation', 'einfache Animationen (veraltet)'],
      ['SVG', 'Vektorgrafik, beliebig skalierbar, Text (XML)', 'Logos, Icons, Diagramme'],
      ['WebP / AVIF', 'moderne, sehr gute Kompression', 'Fotos und Grafiken im Web'],
    ]],
    ['h', 'Weitere Textelemente'],
    ['code', 'html', `<p>Die <abbr title="Industrie- und Handelskammer">IHK</abbr> prüft am <time datetime="2026-11-11">11. November</time>.</p>
<blockquote cite="https://www.faz.net">Ein Ausweg aus der Misere könnten Roboter sein.</blockquote>
<p>Drücke <kbd>Strg</kbd> + <kbd>C</kbd>. Der Befehl <code>print()</code> gibt Text aus.</p>
<pre>
  Einrückung    bleibt
  erhalten
</pre>`],
    ['h', 'Übungen'],
    ['qa', 'Erstellen Sie eine Navigationsliste mit Links zu "Start" (index.html), "Menü" (menue.html) und einem Mail-Link an mensa@bsz.de.', [['code', 'html', `<nav>
  <ul>
    <li><a href="index.html">Start</a></li>
    <li><a href="menue.html">Menü</a></li>
    <li><a href="mailto:mensa@bsz.de">Kontakt</a></li>
  </ul>
</nav>`]], 3],
    ['quiz', [
      {q: 'Welches Attribut ist für Barrierefreiheit bei Bildern Pflicht?', o: ['alt', 'title', 'src', 'width'], a: 0, e: 'Alternativtext.'},
      {q: 'Wie verlinkt man auf das Element mit id="kontakt"?', o: ['href="#kontakt"', 'href="kontakt"', 'href=".kontakt"', 'link="kontakt"'], a: 0, e: '# = Fragment.'},
      {q: 'Welche Liste ist nummeriert?', o: ['ol', 'ul', 'dl', 'li'], a: 0, e: 'ordered list.'},
      {q: 'Was bedeutet ../bild.png?', o: ['Bild im übergeordneten Ordner', 'Bild im gleichen Ordner', 'Bild im Unterordner', 'Bild im Internet'], a: 0, e: '.. = eine Ebene höher.'},
    ]],
    ['see', ['course-html-01', 'course-html-03']],
  ],
});
