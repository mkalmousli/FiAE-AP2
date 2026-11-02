AP2.page('course-html-04', {
  b: 'course', g: 'HTML', t: 'HTML 4: Formulare vollständig',
  d: 'Formulare sammeln Eingaben und senden sie an den Server. `<form action="ziel" method="post">` umschließt die Steuerelemente: `input` mit vielen **Typen** (text, email, password, number, date, radio, checkbox, file, range, hidden, submit), `select`/`option` für Auswahllisten, `textarea` für mehrzeiligen Text, `button`, `fieldset`/`legend` zum Gruppieren und `label` zur Beschriftung. Der Browser prüft vieles schon selbst (**HTML5-Validierung**: `required`, `min`/`max`, `pattern`, `maxlength`, `type="email"`). Gesendet werden die Werte als **Name-Wert-Paare** (`name` des Feldes = Schlüssel).',
  m: '**Ohne name wird ein Feld nicht übertragen.** **Radio: gleicher name = eine Gruppe, unterschiedliche value. Checkbox: Mehrfachauswahl.** **Vorbelegen: value (Text), checked (Radio/Checkbox), selected (option).** **label for = id des Feldes.** **Datei-Upload: method="post" + enctype="multipart/form-data".**',
  cheat: [
    ['form', ['`action="submit.php"`', '`method="get"` (URL) / `"post"` (Body)', '`enctype="multipart/form-data"` für Dateien', '`novalidate` schaltet Prüfung ab']],
    ['input-Typen', ['text, password, email, tel, url', 'number, range, date, time, color', 'radio, checkbox, file, hidden', 'submit, reset, button']],
    ['Prüfung', ['`required`', '`min`, `max`, `step`', '`minlength`, `maxlength`, `size`', '`pattern="[0-9]{5}"`']],
    ['Weitere', ['`<select>` + `<option value selected>`', '`<optgroup label>`', '`<textarea rows cols>`', '`<fieldset><legend>`, `<datalist>`']],
  ],
  blocks: [
    ['h', 'Ein vollständiges Bestellformular'],
    ['code', 'html', `<form action="submit.php" method="post">
  <fieldset>
    <legend>Persönliche Daten</legend>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required maxlength="50">

    <label for="vorname">Vorname:</label>
    <input type="text" id="vorname" name="vorname" required>

    <label for="klasse">Klasse:</label>
    <select id="klasse" name="klasse" required>
      <option value="">bitte wählen</option>
      <optgroup label="Informatik">
        <option value="2BKI1">2BKI1</option>
        <option value="2BKI2">2BKI2</option>
      </optgroup>
    </select>

    <label for="mail">E-Mail:</label>
    <input type="email" id="mail" name="mail" placeholder="name@schule.de">
  </fieldset>

  <fieldset>
    <legend>Bestellung</legend>
    <p>Gericht:</p>
    <input type="radio" id="g1" name="gericht" value="schnitzel" checked>
    <label for="g1">Schnitzel Wiener Art (4,50 €)</label><br>
    <input type="radio" id="g2" name="gericht" value="gemuese">
    <label for="g2">Gemüsepfanne (3,90 €)</label><br>

    <label for="anz">Anzahl:</label>
    <input type="number" id="anz" name="anzahl" min="1" max="5" value="1">

    <input type="checkbox" id="nachtisch" name="extras" value="nachtisch">
    <label for="nachtisch">Nachtisch</label>
    <input type="checkbox" id="getraenk" name="extras" value="getraenk">
    <label for="getraenk">Getränk</label>

    <label for="datum">Für Datum:</label>
    <input type="date" id="datum" name="datum" min="2026-01-08">

    <label for="hinweis">Hinweise (Allergien):</label>
    <textarea id="hinweis" name="hinweis" rows="3" cols="40"></textarea>
  </fieldset>

  <input type="hidden" name="quelle" value="webformular">
  <button type="submit">Bestellung verbindlich absenden</button>
  <button type="reset">Zurücksetzen</button>
</form>`],
    ['h', 'Was wird übertragen?'],
    ['code', 'text', `name=Muster&vorname=Max&klasse=2BKI1&mail=max%40schule.de&gericht=schnitzel
&anzahl=1&extras=nachtisch&datum=2026-01-08&hinweis=&quelle=webformular`],
    ['list', [
      'Bei **GET** hängt der Browser diese Zeichenkette an die URL (`submit.php?name=Muster&...`), bei **POST** steht sie im Body.',
      'Sonderzeichen werden **URL-kodiert** (@ wird zu %40, Leerzeichen zu + oder %20).',
      'Nicht angehakte Checkboxen und nicht gewählte Radiobuttons werden **gar nicht** gesendet. Mehrere Checkboxen mit gleichem name ergeben mehrere Paare.',
      'Deaktivierte Felder (`disabled`) werden nicht gesendet, `readonly`-Felder schon.',
    ]],
    ['h', 'Eingabetypen und ihre Prüfung'],
    ['table', ['Typ / Attribut', 'Browser prüft bzw. bietet'], [
      ['`type="email"`', 'Format name@domain, Tastatur mit @'],
      ['`type="number" min="1" max="5" step="1"`', 'Zahlenbereich, Pfeiltasten'],
      ['`type="date"`', 'Kalenderauswahl, Wert immer JJJJ-MM-TT'],
      ['`required`', 'Pflichtfeld, Absenden blockiert'],
      ['`pattern="[0-9]{5}"`', 'Regulärer Ausdruck, hier PLZ mit 5 Ziffern'],
      ['`maxlength="35"` / `size="35"`', 'höchstens 35 Zeichen / Breite des Feldes für 35 Zeichen'],
      ['`<input list="orte">` + `<datalist id="orte">`', 'Vorschlagsliste beim Tippen'],
    ]],
    ['warn', 'Browser-Prüfung ist **nur Komfort**: Sie lässt sich mit den Entwicklertools oder direkten HTTP-Anfragen umgehen. Der **Server** muss alle Daten erneut prüfen und Datenbankzugriffe mit Prepared Statements ausführen.'],
    ['h', 'Formulare und Barrierefreiheit'],
    ['list', [
      'Jedes Feld hat ein sichtbares `<label for="id">` (placeholder ersetzt kein Label!).',
      'Zusammengehörige Felder (Radiobuttons) mit `<fieldset>` und `<legend>` gruppieren.',
      'Pflichtfelder nicht nur farbig markieren, sondern auch als Text ("Pflichtfeld") bzw. mit `required`.',
      'Fehlermeldungen in Textform neben dem Feld, Fokus sinnvoll setzen, Bedienung per Tab-Taste möglich.',
    ]],
    ['h', 'Übungen'],
    ['qa', 'Erstellen Sie ein Login-Formular (Benutzername, Passwort, "angemeldet bleiben") mit POST an `login.php`. Benutzername ist Pflicht, Passwort mindestens 8 Zeichen.', [['code', 'html', `<form action="login.php" method="post">
  <label for="user">Benutzername</label>
  <input type="text" id="user" name="user" required autocomplete="username">
  <label for="pw">Passwort</label>
  <input type="password" id="pw" name="pw" required minlength="8" autocomplete="current-password">
  <input type="checkbox" id="merken" name="merken" value="1">
  <label for="merken">angemeldet bleiben</label>
  <button type="submit">Anmelden</button>
</form>`]], 5],
    ['quiz', [
      {q: 'Welches Attribut belegt eine option vor?', o: ['selected', 'checked', 'value', 'default'], a: 0, e: 'checked bei Radio/Checkbox.'},
      {q: 'Was braucht ein Formular mit Datei-Upload?', o: ['method="post" und enctype="multipart/form-data"', 'method="get"', 'type="upload"', 'Nichts Besonderes'], a: 0, e: 'Dateien gehen nur im Body.'},
      {q: 'Welche Felder werden NICHT übertragen?', o: ['Felder ohne name und nicht angehakte Checkboxen', 'Felder mit placeholder', 'readonly-Felder', 'hidden-Felder'], a: 0, e: 'disabled ebenfalls nicht.'},
      {q: 'Welches Format hat der Wert eines date-Feldes?', o: ['JJJJ-MM-TT', 'TT.MM.JJJJ', 'MM/TT/JJJJ', 'abhängig vom Browser'], a: 0, e: 'Anzeige lokal, Wert ISO.'},
    ]],
    ['see', ['course-html-03', 'course-html-05', 'eua-html']],
  ],
});
