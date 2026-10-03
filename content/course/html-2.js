AP2.add('course-html', [
  ['h', 'Bilder, Audio, Video, eingebettete Inhalte'],
  ['code', 'html', `<img src="katze.jpg" alt="Graue Katze auf einem Sofa" width="640" height="480" loading="lazy">
<!-- alt: Pflicht. Dekorative Bilder: alt="" (leer). width/height verhindern Layoutsprünge. -->
<picture>                                             <!-- responsive Bilder: Browser wählt -->
  <source media="(min-width: 800px)" srcset="gross.webp" type="image/webp">
  <img src="klein.jpg" srcset="klein.jpg 480w, mittel.jpg 800w" sizes="(min-width: 800px) 50vw, 100vw" alt="Beschreibung">
</picture>
<figure><img src="diagramm.png" alt="Umsatz nach Quartal"><figcaption>Abbildung 1: Umsatz</figcaption></figure>
<video controls width="480" poster="vorschau.jpg"><source src="film.mp4" type="video/mp4">Video nicht unterstützt.</video>
<audio controls src="ton.mp3"></audio>
<iframe src="https://example.com/karte" title="Karte" loading="lazy"></iframe>`],
  ['table', ['Bildformat', 'Eigenschaft', 'Einsatz'], [['**JPEG**', 'verlustbehaftet, Fotos', 'Fotos'], ['**PNG**', 'verlustfrei, Transparenz', 'Grafiken, Screenshots'], ['**GIF**', '256 Farben, Animation', 'veraltet, kurze Animationen'], ['**SVG**', 'Vektor, skalierbar, per CSS/JS änderbar', 'Logos, Icons, Diagramme'], ['**WebP / AVIF**', 'moderne, sehr kleine Dateien', 'Fotos und Grafiken im Web']]],
  ['h', 'Tabellen'],
  ['code', 'html', `<table>
  <caption>Umsatz 2026</caption>
  <thead><tr><th scope="col">Quartal</th><th scope="col">Umsatz</th></tr></thead>
  <tbody>
    <tr><th scope="row">Q1</th><td>120.000</td></tr>
    <tr><td colspan="2">Zelle über zwei Spalten (rowspan: über Zeilen)</td></tr>
  </tbody>
  <tfoot><tr><td>Summe</td><td>480.000</td></tr></tfoot>
</table>`],
  ['note', 'Tabellen sind für **Daten**, nicht für das Seitenlayout. Layout machen **CSS Flexbox und Grid**.'],
  ['h', 'Formulare'],
  ['code', 'html', `<form action="/anmelden" method="post" autocomplete="on" novalidate>
  <fieldset>
    <legend>Zugangsdaten</legend>
    <label for="mail">E-Mail</label>
    <input id="mail" name="mail" type="email" placeholder="name@firma.de" required autocomplete="email">

    <label for="pw">Passwort</label>
    <input id="pw" name="pw" type="password" minlength="8" required>

    <label for="alter">Alter</label>
    <input id="alter" name="alter" type="number" min="16" max="99" step="1">

    <label for="plz">PLZ</label>
    <input id="plz" name="plz" pattern="[0-9]{5}" title="Fünf Ziffern">

    <label for="land">Land</label>
    <select id="land" name="land"><option value="">Bitte wählen</option><option value="de" selected>Deutschland</option></select>

    <label><input type="checkbox" name="agb" required> AGB akzeptiert</label>
    <label><input type="radio" name="zahlung" value="karte" checked> Karte</label>
    <label><input type="radio" name="zahlung" value="rechnung"> Rechnung</label>

    <label for="text">Nachricht</label>
    <textarea id="text" name="text" rows="4" maxlength="500"></textarea>
    <input type="hidden" name="token" value="abc123">
  </fieldset>
  <button type="submit">Senden</button> <button type="reset">Zurücksetzen</button>
</form>`],
  ['table', ['input type', 'Zweck'], [['`text`, `search`, `tel`, `url`, `email`', 'Text mit passender Mobiltastatur und Prüfung'], ['`password`', 'Verdeckte Eingabe'], ['`number`, `range`', 'Zahl, Schieberegler (`min`, `max`, `step`)'], ['`date`, `time`, `datetime-local`, `month`', 'Datumsauswahl'], ['`checkbox`', 'Mehrfachauswahl (ein/aus)'], ['`radio`', 'Einfachauswahl (gleicher `name` gruppiert)'], ['`file`', 'Datei hochladen (`accept`, `multiple`; bei POST `enctype="multipart/form-data"`)'], ['`color`, `hidden`, `submit`, `reset`, `button`', 'Farbwahl, verborgene Daten, Schaltflächen']]],
  ['table', ['Methode', 'Daten', 'Eigenschaften'], [['**GET**', 'In der **URL** (`?name=Anna`)', 'Nur **lesen/suchen**, lesezeichenfähig, begrenzt, sichtbar (nie für Passwörter)'], ['**POST**', 'Im **Body** der Anfrage', 'Daten **senden/ändern**, nicht in der URL, große Daten und Dateien']]],
  ['list', ['**`label for="id"`** verbindet Beschriftung und Feld: größere Klickfläche und Screenreader-Ansage.', '**`name`** wird beim Senden als Schlüssel übertragen; ohne `name` wird das Feld **nicht** gesendet.', '**Browser-Validierung** (`required`, `pattern`, `type`) ist **Komfort**. Die **echte Prüfung** muss immer **serverseitig** erfolgen, da Clientcode manipulierbar ist.', '`autocomplete` hilft Nutzern und Passwortmanagern.']],
  ['h', 'Semantisches HTML und Seitenstruktur'],
  ['diagram', {w: 560, h: 330, keep: 420, cap: 'Typische semantische Seitenstruktur', nodes: [
    {id: 'h', k: 'box', x: 280, y: 36, t: 'header (Logo, Titel)', w: 520, h: 44, s: 'accent'}, {id: 'n', k: 'box', x: 280, y: 86, t: 'nav (Hauptnavigation)', w: 520, h: 34, s: 'soft'},
    {id: 'm', k: 'box', x: 220, y: 190, t: ['main', 'section / article'], w: 380, h: 120, s: 'plain'}, {id: 'a', k: 'box', x: 480, y: 190, t: ['aside', '(Zusatzinfos)'], w: 130, h: 120, s: 'soft'}, {id: 'f', k: 'box', x: 280, y: 296, t: 'footer (Kontakt, Impressum)', w: 520, h: 40, s: 'accent'},
  ], edges: []}],
  ['table', ['Element', 'Bedeutung'], [['`header`', 'Kopfbereich der Seite oder eines Abschnitts'], ['`nav`', 'Hauptnavigation (Linkgruppen)'], ['`main`', 'Hauptinhalt, **einmal pro Seite**'], ['`section`', 'Thematischer Abschnitt, normalerweise mit Überschrift'], ['`article`', 'Eigenständiger Beitrag (Blogpost, Nachricht), auch außerhalb der Seite verständlich'], ['`aside`', 'Nebeninhalt, Seitenleiste'], ['`footer`', 'Fußbereich'], ['`div` / `span`', 'Neutral, **nur** wenn kein semantisches Element passt']]],
]);
