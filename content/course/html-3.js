AP2.add('course-html', [
  ['h', 'Barrierefreiheit (Accessibility, a11y)'],
  ['p', 'Barrierefreie Seiten sind für alle nutzbar, auch mit **Screenreader, Tastatur, Sehschwäche oder motorischen Einschränkungen**. In Deutschland regelt das **BFSG** (Barrierefreiheitsstärkungsgesetz, seit 2025 für viele Produkte und Dienste), technisch gelten die **WCAG** (Web Content Accessibility Guidelines) mit den Prinzipien **POUR**: **P**erceivable (wahrnehmbar), **O**perable (bedienbar), **U**nderstandable (verständlich), **R**obust.'],
  ['table', ['Regel', 'Umsetzung'], [['Textalternativen', '`alt` für informative Bilder, `alt=""` für dekorative; `aria-label` für Icon-Buttons'], ['Struktur', 'Eine `h1`, Überschriften **nicht überspringen**, Landmarks (`nav`, `main`)'], ['Tastatur', 'Alles per **Tab/Enter/Leertaste** erreichbar, sichtbarer **Fokus**, logische Reihenfolge'], ['Kontrast', 'Text mindestens **4,5 : 1** (große Schrift 3 : 1)'], ['Nicht nur Farbe', 'Fehler zusätzlich mit Text/Icon kennzeichnen'], ['Formulare', '`label`, Fehlermeldungen verständlich, `aria-describedby`'], ['Sprache', '`lang` am `html`, Wechsel mit `lang` am Element'], ['Skalierung', 'Relative Einheiten, Zoom bis 200 % ohne Verlust']]],
  ['code', 'html', `<button aria-label="Menü schließen"><svg aria-hidden="true">...</svg></button>
<div role="alert">Eingabe fehlerhaft</div>              <!-- wird sofort vorgelesen -->
<input id="n" aria-describedby="hinweis" aria-invalid="true"><span id="hinweis">Mindestens 8 Zeichen</span>
<a href="#main" class="skip">Zum Inhalt springen</a>   <!-- Skip-Link für Tastaturnutzer -->`],
  ['note', '**Erste Regel von ARIA:** Wenn es ein passendes HTML-Element gibt (`<button>` statt `<div role="button">`), nutze das. ARIA ergänzt nur, wo HTML nicht reicht.'],
  ['h', 'SEO und Metadaten'],
  ['code', 'html', `<title>Fachinformatiker lernen | AP2</title>                   <!-- ~60 Zeichen, eindeutig je Seite -->
<meta name="description" content="Kurzbeschreibung ~150 Zeichen.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://example.com/seite">
<meta property="og:title" content="Titel für soziale Netzwerke">   <!-- Open Graph -->
<link rel="icon" href="/favicon.svg">`],
  ['h', 'Weitere HTML5-Funktionen'],
  ['code', 'html', `<details><summary>Mehr anzeigen</summary>Versteckter Text</details>      <!-- Aufklapper ohne JS -->
<dialog id="d"><p>Modales Fenster</p><button onclick="d.close()">OK</button></dialog>
<progress value="40" max="100"></progress> <meter value="0.7">70 %</meter>
<datalist id="orte"><option value="Ulm"><option value="Bonn"></datalist><input list="orte">
<canvas id="c" width="300" height="150"></canvas>                                  <!-- Pixelgrafik per JS -->
<template id="t"><li>Wird per JS geklont</li></template>`],
  ['code', 'javascript', `// Web Storage, Fetch, DOM  (JavaScript im Browser)
localStorage.setItem("theme", "dark");                       // dauerhaft, ~5 MB, nur Text
sessionStorage.getItem("x");                                  // nur für den Tab
const antwort = await fetch("/api/kunden");                   // HTTP-Anfrage
const daten = await antwort.json();
document.querySelector("#liste").textContent = daten.length;`],
  ['table', ['Speicher', 'Dauer', 'Größe', 'Wird mit Anfragen gesendet?'], [['**Cookie**', 'bis Ablaufdatum', '~4 KB', '**Ja**, bei jeder Anfrage'], ['**localStorage**', 'dauerhaft', '~5 MB', 'Nein'], ['**sessionStorage**', 'bis Tab geschlossen', '~5 MB', 'Nein'], ['**IndexedDB**', 'dauerhaft', 'groß', 'Nein']]],
  ['h', 'Validierung und gute Praxis'],
  ['list', ['Quelltext mit dem **W3C-Validator** prüfen; Tags sauber schließen und korrekt verschachteln.', '**Kleinschreibung** für Tags und Attribute, Attributwerte in Anführungszeichen.', '`id` **eindeutig**, Klassennamen sprechend (`.warnhinweis` statt `.rot`).', 'Keine Inline-Styles und Event-Attribute (`onclick`), sondern CSS-Dateien und JS-Listener (Trennung der Belange).', '**Sicherheit:** Nutzereingaben nie ungeprüft als HTML ausgeben (**XSS**); mit `textContent` statt `innerHTML` arbeiten bzw. Ausgabe **escapen**; Content-Security-Policy einsetzen.']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie den Unterschied zwischen `id` und `class`.', '`id` ist **eindeutig** pro Seite (ein Element), dient als Sprungziel, Label-Verknüpfung und JS-Zugriff. `class` kann **mehreren** Elementen zugewiesen werden und ein Element kann mehrere Klassen haben; wird für CSS-Gruppen genutzt.', 3],
  ['qa', 'Warum sollte man semantische Elemente statt `div` für alles verwenden?', 'Sie geben dem Inhalt **Bedeutung**: **Screenreader** und **Suchmaschinen** verstehen die Struktur (Navigation, Hauptinhalt), die Seite ist **barrierefreier**, der Code **lesbarer und wartbarer**.', 4],
  ['qa', 'Nennen Sie drei Maßnahmen für ein barrierefreies Formular.', ['- `label` mit `for` zu jedem Feld', '- Fehlermeldungen als Text (nicht nur rot) und mit `aria-describedby` verknüpft', '- Tastaturbedienbarkeit, Fokus sichtbar, ausreichender Kontrast'], 3],
  ['qa', 'Wann nutzt man GET, wann POST?', '**GET** zum **Abrufen/Suchen** ohne Änderung am Server (Daten in der URL, wiederholbar, lesezeichenfähig). **POST** zum **Senden/Ändern** (Daten im Body, nicht in der URL), zum Beispiel Anmeldung, Bestellung, Upload.', 3],
  ['qa', 'Was ist der Unterschied zwischen `defer` und `async` bei Skripten?', '`defer` lädt parallel und führt das Skript **nach dem Parsen** des Dokuments **in Reihenfolge** aus. `async` führt es **sobald es geladen ist** aus, Reihenfolge nicht garantiert (für unabhängige Skripte wie Statistik).', 4],
  ['quiz', [
    {q: 'Welches Element ist ein Block-Element?', o: ['div', 'span', 'a', 'strong'], a: 0, e: 'div bricht um; span, a, strong sind inline.'},
    {q: 'Was gehört zwingend zu jedem informativen Bild?', o: ['Das alt-Attribut', 'Das title-Attribut', 'Ein Rahmen', 'Das id-Attribut'], a: 0, e: 'Alternativtext für Screenreader und Fehlerfälle.'},
    {q: 'Welcher Wert aktiviert die korrekte Gruppierung von Radiobuttons?', o: ['Gleicher name', 'Gleiche id', 'Gleiche class', 'Gleicher value'], a: 0, e: 'Nur ein Button mit gleichem name ist wählbar.'},
    {q: 'Wo muss die endgültige Validierung von Formulardaten stattfinden?', o: ['Auf dem Server', 'Nur im Browser', 'Im CSS', 'Gar nicht'], a: 0, e: 'Clientseitige Prüfung ist umgehbar.'},
    {q: 'Welches Element darf pro Seite nur einmal vorkommen?', o: ['main', 'section', 'div', 'article'], a: 0, e: 'main enthält den Hauptinhalt.'},
    {q: 'Wofür steht das P in POUR (WCAG)?', o: ['Perceivable (wahrnehmbar)', 'Programmable', 'Public', 'Protected'], a: 0, e: 'Perceivable, Operable, Understandable, Robust.'},
    {q: 'Welche Speicherung wird bei jeder HTTP-Anfrage automatisch mitgesendet?', o: ['Cookie', 'localStorage', 'sessionStorage', 'IndexedDB'], a: 0, e: 'Deshalb sind Cookies klein zu halten.'},
  ]],
]);
