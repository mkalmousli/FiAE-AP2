AP2.page('course-html-05', {
  b: 'course', g: 'HTML', t: 'HTML 5: Semantik, Medien, Barrierefreiheit und SEO',
  d: '**Semantisches HTML** verwendet Elemente nach ihrer **Bedeutung**: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`. Das hilft Screenreadern, Suchmaschinen und Entwicklern; `div` und `span` sind nur neutrale Container ohne Bedeutung. HTML5 bringt außerdem native **Medienelemente** (`video`, `audio`, `picture`) und `iframe` zum Einbetten. **Barrierefreiheit** (WCAG, BITV, BFSG) und **SEO** (Titel, Beschreibung, Überschriften, Alternativtexte) beruhen zu großen Teilen auf sauberem, semantischem HTML.',
  m: '**Seitenstruktur: header > nav, main (genau einmal) > section/article, aside, footer.** **button für Aktionen, a für Navigation (nicht div mit onclick).** **ARIA nur, wenn es kein passendes HTML-Element gibt.** **WCAG-Prinzipien: wahrnehmbar, bedienbar, verständlich, robust (POUR).**',
  cheat: [
    ['Struktur', ['`<header>` Kopf', '`<nav>` Hauptnavigation', '`<main>` Hauptinhalt', '`<footer>` Fuß']],
    ['Inhalt', ['`<section>` thematischer Abschnitt', '`<article>` eigenständiger Inhalt', '`<aside>` Randinfo', '`<figure>`, `<time>`, `<address>`']],
    ['Medien', ['`<video src controls>`', '`<audio controls>`', '`<picture><source>`', '`<iframe src title>`']],
    ['a11y / SEO', ['`lang`, Überschriftenhierarchie', '`alt`, `label`, Kontrast', '`<title>`, `meta description`', '`aria-label`, `role` sparsam']],
  ],
  blocks: [
    ['h', 'Eine semantisch gegliederte Seite'],
    ['code', 'html', `<body>
  <header>
    <img src="logo.svg" alt="MeBS Logo" width="60">
    <h1>Mensa-Bestell-System</h1>
    <nav aria-label="Hauptnavigation">
      <ul>
        <li><a href="index.html" aria-current="page">Start</a></li>
        <li><a href="menue.html">Wochenmenü</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="montag">
      <h2>Montag, <time datetime="2026-01-08">08.01.</time></h2>
      <article class="menu-item">
        <h3>Schnitzel Wiener Art</h3>
        <p class="description">Klassisches Schnitzel mit Pommes.</p>
        <p class="price">Preis: 4,50 €</p>
      </article>
    </section>
    <aside><h2>Allergene</h2><p>Infos an der Theke.</p></aside>
  </main>

  <footer>
    <address>Kontakt: <a href="mailto:mensa@bsz-neckaralb.de">mensa@bsz-neckaralb.de</a></address>
    <p><small>© 2024 MeBS</small></p>
  </footer>
</body>`],
    ['diagram', AP2.dg.layers([['header', 'Logo, Titel, nav (Navigation)', 'accent'], ['main', 'section > article ... (Hauptinhalt, genau einmal)', 'solid'], ['aside', 'Ergänzende Informationen', 'soft'], ['footer', 'Kontakt, Impressum, Copyright', 'accent']], {w: 640, cap: 'Typische semantische Seitenstruktur'})],
    ['h', 'Medien einbinden'],
    ['code', 'html', `<video src="rundgang.mp4" controls width="640" poster="vorschau.jpg">
  <track kind="captions" src="untertitel.vtt" srclang="de" label="Deutsch">   <!-- Untertitel -->
  Ihr Browser unterstützt kein Video.
</video>

<audio controls src="podcast.mp3"></audio>

<picture>                                        <!-- je nach Bildschirm/Format anderes Bild -->
  <source srcset="karte-gross.webp" media="(min-width: 800px)" type="image/webp">
  <img src="karte-klein.jpg" alt="Lageplan der Mensa">
</picture>

<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=9.2,48.4,9.3,48.5"
        title="Karte der Schule" width="400" height="300" loading="lazy"></iframe>`],
    ['note', 'Eingebettete Inhalte von fremden Servern (Karten, Videos, CDN-Bibliotheken, Schriften) übertragen die IP-Adresse des Besuchers an Dritte. Nach DSGVO braucht es dafür eine Rechtsgrundlage und einen Hinweis in der Datenschutzerklärung, oft eine Einwilligung (Zwei-Klick-Lösung).'],
    ['h', 'Barrierefreiheit (WCAG)'],
    ['table', ['Prinzip', 'Bedeutung', 'Umsetzung in HTML'], [
      ['**Wahrnehmbar**', 'Inhalte für alle Sinne zugänglich', '`alt`-Texte, Untertitel, ausreichender Kontrast, Information nicht nur über Farbe'],
      ['**Bedienbar**', 'Alles ohne Maus nutzbar', 'echte `button`/`a`, sichtbarer Fokus, logische Tab-Reihenfolge, keine Zeitlimits'],
      ['**Verständlich**', 'Inhalte und Bedienung nachvollziehbar', '`lang`, klare Labels, verständliche Fehlermeldungen, einheitliche Navigation'],
      ['**Robust**', 'Funktioniert mit Hilfstechnik', 'valides, semantisches HTML, ARIA nur ergänzend'],
    ]],
    ['code', 'html', `<!-- schlecht -->
<div class="btn" onclick="senden()">Senden</div>
<!-- gut: fokussierbar, per Enter/Leertaste bedienbar, als Button angesagt -->
<button type="button" onclick="senden()">Senden</button>

<!-- Icon-Button braucht einen zugänglichen Namen -->
<button type="button" aria-label="Menü schließen">✕</button>`],
    ['h', 'Suchmaschinenoptimierung (SEO) mit HTML'],
    ['list', [
      'Eindeutiger, beschreibender `<title>` und `<meta name="description">` je Seite.',
      'Eine `h1`, sinnvolle Überschriftenhierarchie, aussagekräftige Linktexte.',
      '`alt`-Texte, sprechende URLs, schnelle Ladezeit (Bilder optimieren, `loading="lazy"`).',
      'Mobilfreundlich (viewport, Responsive Design), HTTPS, strukturierte Daten (JSON-LD).',
    ]],
    ['h', 'Validierung und gute Praxis'],
    ['list', [
      'Code mit dem **W3C-Validator** prüfen.',
      'Kleinbuchstaben, Attributwerte in Anführungszeichen, sauber einrücken.',
      'Kein Inline-CSS und Inline-JavaScript in größeren Projekten: Inhalt, Gestaltung und Verhalten trennen.',
      'Veraltete Elemente meiden: `font`, `center`, `marquee`, Layout-Tabellen.',
    ]],
    ['h', 'Übungen'],
    ['qa', 'Nennen Sie vier Maßnahmen, die eine Webseite barrierefreier machen, und ordnen Sie sie den WCAG-Prinzipien zu.', ['- Alternativtexte für Bilder (wahrnehmbar)', '- vollständige Tastaturbedienbarkeit mit sichtbarem Fokus (bedienbar)', '- Formularfelder mit Labels und verständlichen Fehlermeldungen (verständlich)', '- valides, semantisches HTML mit korrekter Überschriftenhierarchie (robust)'], 4],
    ['quiz', [
      {q: 'Wie oft sollte main auf einer Seite vorkommen?', o: ['Einmal', 'Beliebig oft', 'Gar nicht', 'Je Abschnitt einmal'], a: 0, e: 'Hauptinhalt.'},
      {q: 'Welches Element passt für einen eigenständigen Blogbeitrag?', o: ['article', 'div', 'aside', 'nav'], a: 0, e: 'Eigenständig wiederverwendbar.'},
      {q: 'Was ist besser für eine klickbare Aktion?', o: ['button', 'div mit onclick', 'span', 'p'], a: 0, e: 'Tastatur und Screenreader.'},
      {q: 'Welches WCAG-Prinzip betrifft Tastaturbedienung?', o: ['Bedienbar', 'Wahrnehmbar', 'Verständlich', 'Robust'], a: 0, e: 'Operable.'},
    ]],
    ['see', ['course-html-04', 'course-css-01', 'eua-html', 'ps-ergonomie']],
  ],
});
