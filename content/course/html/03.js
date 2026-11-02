AP2.page('course-html-03', {
  b: 'course', g: 'HTML', t: 'HTML 3: Tabellen',
  d: 'Eine **HTML-Tabelle** (`table`) stellt **tabellarische Daten** dar: Zeilen (`tr`), Kopfzellen (`th`) und Datenzellen (`td`). Mit `thead`, `tbody`, `tfoot` gliedert man sie, mit `caption` erhält sie eine Überschrift, mit `colspan`/`rowspan` verbindet man Zellen. Für das **Layout** einer Seite sollte man keine Tabellen mehr verwenden (dafür gibt es CSS Grid/Flexbox), für Formulare in Prüfungen sind sie aber erlaubt und verbreitet ("tabellarische Darstellung der Eingabefelder").',
  m: '**table > tr > th/td (Zeile zuerst, dann Zellen).** **th für Überschriften, mit scope="col" oder "row".** **colspan = über Spalten, rowspan = über Zeilen.** **Rahmen kommen aus CSS: `border-collapse: collapse;`.**',
  cheat: [
    ['Grundelemente', ['`<table>`', '`<tr>` Zeile', '`<th>` Kopfzelle', '`<td>` Datenzelle']],
    ['Gliederung', ['`<caption>` Titel', '`<thead>`, `<tbody>`, `<tfoot>`', '`<th scope="col">`', '`<colgroup>`']],
    ['Zellen verbinden', ['`colspan="2"`', '`rowspan="3"`', 'Zellen zählen!', 'leere Zelle: `<td></td>`']],
    ['CSS', ['`border-collapse: collapse;`', '`th, td { border: 1px solid; padding: 4px; }`', '`tr:nth-child(even)` Zebra', '`text-align: right` für Zahlen']],
  ],
  blocks: [
    ['h', 'Eine Datentabelle'],
    ['code', 'html', `<table>
  <caption>Angebotsvergleich 10 Notebooks</caption>
  <thead>
    <tr>
      <th scope="col">Position</th>
      <th scope="col">Schneider KG</th>
      <th scope="col">Hardware Solutions</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">Listenpreis</th><td>1.149,00 €</td><td>1.199,00 €</td></tr>
    <tr><th scope="row">- Rabatt</th><td>57,45 €</td><td>83,93 €</td></tr>
    <tr><th scope="row">= Bezugspreis</th><td>1.074,72 €</td><td>1.081,62 €</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row">Gesamt (10 Stück)</th><td>10.747,19 €</td><td>10.816,18 €</td></tr>
  </tfoot>
</table>`],
    ['code', 'css', `table { border-collapse: collapse; }              /* einfache statt doppelter Linien */
th, td { border: 1px solid #999; padding: 6px 10px; }
td { text-align: right; }                            /* Zahlen rechtsbündig */
tbody tr:nth-child(even) { background: #f3f3f3; }    /* Zebrastreifen */`],
    ['h', 'Zellen verbinden'],
    ['code', 'html', `<table>
  <tr><th rowspan="2">Tag</th><th colspan="2">Gerichte</th></tr>
  <tr><th>Hauptgericht</th><th>vegetarisch</th></tr>
  <tr><td>Montag</td><td>Schnitzel</td><td>Gemüsepfanne</td></tr>
</table>`],
    ['p', 'Jede Zeile muss rechnerisch gleich viele Spalten haben: Eine Zelle mit `colspan="2"` zählt doppelt; eine Zelle mit `rowspan="2"` belegt in der nächsten Zeile ihren Platz mit, dort lässt man eine Zelle weg.'],
    ['h', 'Formular in Tabellenform (Prüfungsstil, Winter 2024/25)'],
    ['code', 'html', `<form method="post" action="datenbank.php">
  <table>
    <tr>
      <td><label for="na">Akku-ID:</label></td>
      <td><input type="text" id="na" name="akkuid" required></td>
    </tr>
    <tr>
      <td><label for="nk">Nennkapazität:</label></td>
      <td><input type="number" id="nk" name="nennkapazitaet" required></td>
    </tr>
    <tr>
      <td><label for="hr">Hersteller:</label></td>
      <td>
        <select id="hr" name="hersteller">
          <option value="panasonic">Panasonic</option>
          <option value="varta">Varta</option>
          <option value="duracell">Duracell</option>
        </select>
      </td>
    </tr>
  </table>
  <input type="submit" value="Absenden">
</form>`],
    ['warn', 'Tabellen nur für **tabellarische Inhalte** (oder in der Prüfung für Formular-Raster). Für Seitenlayouts mit Spalten nimmt man CSS Grid/Flexbox: Layout-Tabellen sind schlecht für Screenreader, schwer responsiv zu machen und vermischen Struktur und Gestaltung.'],
    ['h', 'Übungen'],
    ['qa', 'Erstellen Sie eine Tabelle mit Kopfzeile "Fach | Note" und zwei Zeilen (Mathe 2, Deutsch 1) sowie einer Fußzeile "Durchschnitt | 1,5".', [['code', 'html', `<table>
  <thead><tr><th>Fach</th><th>Note</th></tr></thead>
  <tbody>
    <tr><td>Mathe</td><td>2</td></tr>
    <tr><td>Deutsch</td><td>1</td></tr>
  </tbody>
  <tfoot><tr><td>Durchschnitt</td><td>1,5</td></tr></tfoot>
</table>`]], 3],
    ['quiz', [
      {q: 'Welches Element beschreibt eine Tabellenzeile?', o: ['tr', 'td', 'th', 'row'], a: 0, e: 'table row.'},
      {q: 'Was bewirkt colspan="3"?', o: ['Zelle erstreckt sich über 3 Spalten', 'Zelle über 3 Zeilen', '3 neue Spalten', 'Spaltenbreite 3'], a: 0, e: 'rowspan für Zeilen.'},
      {q: 'Welche CSS-Eigenschaft verhindert doppelte Rahmenlinien?', o: ['border-collapse: collapse', 'border: none', 'border-spacing: 2px', 'outline: 0'], a: 0, e: 'Zellenrahmen fallen zusammen.'},
    ]],
    ['see', ['course-html-02', 'course-html-04']],
  ],
});
