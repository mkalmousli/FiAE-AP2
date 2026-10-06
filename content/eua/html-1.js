AP2.page('eua-html', {
  b: 'eua', g: 'Webentwicklung', t: 'HTML-Formulare und Seitenstruktur (Prüfungsklassiker)',
  d: '**HTML** (Hypertext Markup Language) beschreibt die **Struktur** einer Webseite mit **Elementen** (Tags). Ein **Formular** (`<form>`) sammelt Eingaben des Benutzers und schickt sie an ein Serverprogramm: Das Attribut `action` nennt die **Ziel-URL** (zum Beispiel `kontakt.php`), `method` die **HTTP-Methode** (`get` oder `post`). Jedes Eingabefeld braucht ein `name`-Attribut, denn nur Felder mit `name` werden als **Schlüssel-Wert-Paar** übertragen.',
  m: '**form = action (wohin) + method (wie).** **name = Schlüssel beim Senden, id = Verknüpfung mit label und CSS.** **Radio: gleicher name = Gruppe, nur eine Auswahl. Checkbox: Mehrfachauswahl.** **Personenbezogene Daten immer mit POST (und HTTPS).** **Jedes Feld bekommt ein `<label for="id">`** (Barrierefreiheit).',
  cheat: [
    ['Formular', ['`<form action="x.php" method="post">`', '`<fieldset>` + `<legend>` gruppieren', '`<label for="id">` beschriftet', '`<input type="submit" value="Senden">`']],
    ['input type', ['`text`, `email`, `tel`, `password`', '`number`, `date`, `range`', '`radio`, `checkbox`', '`hidden`, `submit`, `reset`']],
    ['Attribute', ['`required` Pflichtfeld', '`placeholder` Hinweistext', '`checked` / `selected` vorbelegt', '`size`, `maxlength`, `min`, `max`, `disabled`']],
    ['Mehrzeilig, Auswahl', ['`<textarea rows="4" cols="50">`', '`<select name="x">` + `<option value="..">`', '`<select size="3">` zeigt 3 Zeilen', '`<select multiple>` Mehrfachauswahl']],
  ],
  blocks: [
    ['h', 'Warum HTML in der AP2 so wichtig ist'],
    ['p', 'In **jeder** baden-württembergischen Prüfung "Entwicklung und Umsetzung von Algorithmen" der letzten Jahre kam eine Webaufgabe vor: Kontaktformular (Winter 2022/23), Kita-Anmeldung (Winter 2023/24), Kursanmeldung (Sommer 2024, PS), Akku-Erfassung (Winter 2024/25), Mensa-Bestellformular (Sommer 2025), IGeL-Leistungen (Winter 2025/26). Typisch sind **15 bis 25 Punkte** für ein Formular nach Abbildung. Wer die Elemente sicher beherrscht, holt hier fast sichere Punkte.'],
    ['h', 'Das Grundgerüst einer HTML-Seite'],
    ['code', 'html', `<!DOCTYPE html>                 <!-- HTML5-Dokument -->
<html lang="de">                <!-- Sprache: wichtig für Screenreader -->
<head>
  <meta charset="utf-8">        <!-- Umlaute korrekt darstellen -->
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- mobil -->
  <title>Kita Stuttgart</title> <!-- Titel im Browser-Tab -->
  <link rel="stylesheet" href="style.css">  <!-- externe CSS-Datei -->
</head>
<body>
  <h1>Hauptüberschrift</h1>     <!-- sichtbarer Inhalt -->
  <p>Ein Absatz.</p>
</body>
</html>`],
    ['table', ['Teil', 'Aufgabe'], [
      ['`<!DOCTYPE html>`', 'Sagt dem Browser: Das ist HTML5. Ohne Doctype rendert er im "Quirks-Modus".'],
      ['`<head>`', 'Metadaten: Zeichensatz, Titel, CSS, Skripte. Wird **nicht** direkt angezeigt.'],
      ['`<body>`', 'Alles Sichtbare: Überschriften, Text, Bilder, Formulare.'],
      ['`<meta charset="utf-8">`', 'Zeichenkodierung. Alternativ Umlaute als Entitäten: `&auml;` (ä), `&uuml;` (ü), `&ouml;` (ö), `&szlig;` (ß), `&nbsp;` (geschütztes Leerzeichen).'],
    ]],
    ['h', 'Die wichtigsten Elemente für Text und Struktur'],
    ['table', ['Element', 'Bedeutung', 'Block oder Inline?'], [
      ['`<h1>` bis `<h6>`', 'Überschriften, `h1` = erste Ordnung', 'Block'],
      ['`<p>`', 'Absatz', 'Block'],
      ['`<div>`', 'Neutraler Container zum Gruppieren und Layouten', 'Block'],
      ['`<span>`', 'Neutraler Container innerhalb einer Zeile', 'Inline'],
      ['`<a href="seite.html">`', 'Link (Hyperlink)', 'Inline'],
      ['`<img src="logo.gif" alt="Firmenlogo">`', 'Bild, `alt` = Alternativtext für Screenreader', 'Inline'],
      ['`<b>`/`<strong>`, `<i>`/`<em>`', 'Fett bzw. kursiv (`strong`/`em` = semantische Betonung)', 'Inline'],
      ['`<br>`', 'Zeilenumbruch', 'Inline'],
      ['`<ul>`, `<ol>`, `<li>`', 'Ungeordnete / nummerierte Liste, Listenpunkt', 'Block'],
      ['`<table>`, `<tr>`, `<th>`, `<td>`', 'Tabelle, Zeile, Kopfzelle, Datenzelle', 'Block'],
      ['`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`', 'Semantische HTML5-Bereiche', 'Block'],
    ]],
    ['def', '**Block-Elemente** (zum Beispiel `div`, `p`, `h1`) beginnen auf einer **neuen Zeile** und nehmen die **volle verfügbare Breite** ein; nachfolgende Inhalte rutschen ebenfalls in eine neue Zeile. **Inline-Elemente** (zum Beispiel `span`, `a`, `img`) nehmen nur **so viel Platz wie ihr Inhalt** ein und stehen **in einer Zeile** mit anderem Inhalt. (Prüfungsfrage Sommer 2025, 2 Punkte)'],
    ['h', 'Formulare Schritt für Schritt'],
    ['p', 'Ein Formular besteht aus dem äußeren `<form>`-Element und den Steuerelementen darin. Beim Klick auf den Absende-Button packt der Browser alle Felder mit `name` zusammen und schickt sie an die URL aus `action`.'],
    ['code', 'html', `<form action="https://www.brettelhausen.de/kursanmeldung" method="post">
  <fieldset>
    <legend>Personendaten hier eingeben</legend>

    <label for="vName">Vorname</label>
    <input type="text" id="vName" name="vName" required>

    <label for="mail">E-Mail</label>
    <input type="email" id="mail" name="mail" placeholder="max@beispiel.de">

    <label for="geb">Geburtsdatum</label>
    <input type="date" id="geb" name="geburtsdatum">

    <input type="submit" value="absenden">
  </fieldset>
</form>`],
    ['steps', [
      '`<form action="..." method="post">` öffnet das Formular. `action` = Serverskript oder URL, `method` = Übertragungsart.',
      '`<fieldset>` zeichnet einen Rahmen um zusammengehörige Felder, `<legend>` ist dessen Überschrift.',
      '`<label for="vName">` beschriftet das Feld mit `id="vName"`. Klick auf die Beschriftung setzt den Cursor ins Feld.',
      '`<input type="..." name="..." id="...">` ist das eigentliche Eingabefeld. Der **Typ** bestimmt Aussehen und Prüfung.',
      '`<input type="submit">` erzeugt den Absende-Button, `value` ist seine Beschriftung.',
    ]],
    ['h', 'Alle wichtigen Eingabetypen'],
    ['table', ['Typ', 'Darstellung / Prüfung', 'Typischer Einsatz in der Prüfung'], [
      ['`text`', 'Einzeiliges Textfeld', 'Name, Vorname, Modell, Akku-ID'],
      ['`email`', 'Prüft auf @-Format, mobile Tastatur mit @', 'E-Mail-Adresse'],
      ['`tel`', 'Telefon-Tastatur auf dem Handy', 'Telefonnummer'],
      ['`password`', 'Zeichen werden als Punkte angezeigt', 'Login'],
      ['`number`', 'Nur Zahlen, Pfeiltasten, `min`/`max`/`step`', 'Anzahl, Nennkapazität'],
      ['`date`', 'Datumsauswahl (Kalender)', 'Geburtsdatum, Erstzulassung'],
      ['`radio`', 'Runde Knöpfe, **genau eine** Auswahl je Gruppe', 'Zustand, Lieferoption, Betreuungsstunden'],
      ['`checkbox`', 'Kästchen, **mehrere** Auswahlen möglich', 'Abholberechtigte, AGB akzeptieren'],
      ['`hidden`', 'Unsichtbar, sendet festen Wert mit', 'Interne Kennung'],
      ['`submit` / `reset`', 'Absenden / Formular zurücksetzen', 'Senden-Button'],
    ]],
    ['h3', 'Radiobuttons richtig bauen'],
    ['p', 'Radiobuttons gehören zusammen, wenn sie **denselben `name`** haben. Dann kann nur einer ausgewählt sein. Übertragen wird der `value` des gewählten Knopfs. `checked` belegt einen Knopf vor. Jeder Knopf braucht eine **eigene id** für sein Label.'],
    ['code', 'html', `<!-- Sommer 2022: Lieferoption, "schnell" vorausgewählt, Wert an LiefOpt -->
<input type="radio" id="schnell" name="LiefOpt" value="schnell" checked>
<label for="schnell">schnell</label>
<input type="radio" id="guenstig" name="LiefOpt" value="guenstig">
<label for="guenstig">g&uuml;nstig</label>`],
    ['h3', 'Checkboxen, Auswahllisten und Textbereiche'],
    ['code', 'html', `<!-- Mehrfachauswahl (Winter 2023/24, Kita) -->
<input type="checkbox" id="m" name="abholer" value="Mutter"> <label for="m">Mutter</label>
<input type="checkbox" id="v" name="abholer" value="Vater">  <label for="v">Vater</label>

<!-- Auswahlliste mit Platzhalter-Option (Winter 2024/25, Akku-Hersteller) -->
<label for="hr">Hersteller:</label>
<select id="hr" name="hersteller" required>
  <option value="" selected>Bitte Hersteller wählen</option>
  <option value="panasonic">Panasonic</option>
  <option value="varta">Varta</option>
  <option value="duracell">Duracell</option>
</select>

<!-- Mehrzeiliges Textfeld mit 4 Zeilen -->
<label for="msg">Weitere Mitteilungen:</label>
<textarea id="msg" name="mitteilungen" rows="4" cols="50"></textarea>`],
    ['note', '`<textarea>` hat **kein** `value`-Attribut und **muss** geschlossen werden (`</textarea>`); vorbelegter Text steht zwischen den Tags. `<select size="3">` zeigt drei Zeilen gleichzeitig (Listbox), ohne `size` ist es eine Klappliste (Dropdown).'],
    ['h', 'GET oder POST?'],
    ['table', ['Kriterium', 'GET', 'POST'], [
      ['Wo stehen die Daten?', 'In der **URL**: `kontakt.php?name=Max&ort=Ulm`', 'Im **Rumpf (Body)** der HTTP-Anfrage'],
      ['Sichtbarkeit', 'Im Browserverlauf, in Lesezeichen, in Server-Logdateien', 'Nicht in der URL, nicht im Verlauf'],
      ['Datenmenge', 'Begrenzt (URL-Länge)', 'Praktisch unbegrenzt, auch Dateien'],
      ['Einsatz', 'Suchen, Filtern, Daten **abrufen**', 'Anmeldungen, Bestellungen, personenbezogene Daten **senden**'],
    ]],
    ['warn', 'POST ist **nicht verschlüsselt**! Ohne HTTPS kann jeder auf dem Weg den Body mitlesen. POST verhindert nur, dass die Daten in URL, Verlauf und Logdateien landen. Für personenbezogene Daten gilt deshalb: **POST + HTTPS**. (Sommer 2024: "Begründen Sie Ihre Wahl des Attributs method", 4 Punkte)'],
    ['h', 'Welche Daten werden übertragen?'],
    ['p', 'Der Browser sendet **Schlüssel-Wert-Paare**: Schlüssel = `name`, Wert = Eingabe bzw. `value`. In JSON-Schreibweise sieht die Übertragung des Kursformulars für Max Müller (Snowboard, Skilehrer) so aus (Sommer 2024):'],
    ['code', 'js', `{
  "vName": "Max",
  "nName": "Müller",
  "kurs": "Snowboard",
  "skilehrer": "ja",
  "send": "absenden"
}`],
    ['p', 'Der Submit-Button wird mitgeschickt, **wenn er ein `name`-Attribut hat**. Nicht angehakte Checkboxen und Felder ohne `name` werden **nicht** übertragen.'],
    ['h', 'Barrierefreiheit (Accessibility)'],
    ['def', '**Barrierefrei** ist eine Webseite, wenn sie für **alle Menschen** nutzbar ist, auch für Menschen mit Seh-, Hör-, motorischen oder kognitiven Einschränkungen. Grundlage sind die **WCAG** (Web Content Accessibility Guidelines) und in Deutschland die **BITV 2.0**; ab Juni 2025 verpflichtet das **Barrierefreiheitsstärkungsgesetz (BFSG)** auch viele Unternehmen (zum Beispiel Onlineshops).'],
    ['list', [
      '**Labels:** Jedes Formularfeld mit `<label for>` verknüpfen, damit der **Screenreader** die Beschriftung vorliest (Sommer 2022, 3 Punkte).',
      '**Alternativtexte:** `<img alt="...">` beschreibt Bilder für blinde Nutzer.',
      '**Tastaturbedienung:** Alles muss ohne Maus per Tab-Taste erreichbar sein.',
      '**Kontraste und Schriftgröße:** ausreichender Farbkontrast, skalierbare Schrift (rem statt px).',
      '**Semantisches HTML:** echte Überschriften (`h1` bis `h6`), `nav`, `main`, `button` statt klickbarer `div`.',
      '**Sprache angeben:** `<html lang="de">`, damit die Sprachausgabe richtig betont.',
      '**Information nicht nur über Farbe:** Fehler zusätzlich mit Text oder Symbol kennzeichnen.',
    ]],
  ],
});
