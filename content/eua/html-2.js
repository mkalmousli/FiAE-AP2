AP2.add('eua-html', [
  ['h', 'Komplettbeispiel: Formular nach Abbildung (Winter 2022/23)'],
  ['p', 'Aufgabe: Kontaktformular "CarLos Online" mit Überschrift `h1` (24pt Arial), Zwischenüberschriften `h2` (16pt Arial), Pflichtfeldern Nachname und Vorname, Telefon, E-Mail, Hersteller-Auswahl, Modell, Erstzulassung und Zustand als Radiobuttons. Versand per POST an `kontakt.php`. **22 Punkte.**'],
  ['code', 'html', `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>CarLos</title>
  <style>
    h1 { font: 24pt Arial; }
    h2 { font: 16pt Arial; }
  </style>
</head>
<body>
  <h1>CarLos Online</h1>
  <form id="kontakt" method="post" action="kontakt.php">
    <h2>Kontaktdaten</h2>
    <label for="na">Nachname</label><br>
    <input type="text" id="na" name="nachname" required><br>
    <label for="vo">Vorname</label><br>
    <input type="text" id="vo" name="vorname" required><br>
    <label for="te">Telefon</label><br>
    <input type="tel" id="te" name="telefon" placeholder="+4912345678"><br>
    <label for="em">E-Mail</label><br>
    <input type="email" id="em" name="email"><br>

    <h2>Fahrzeugdaten</h2>
    <label for="he">Hersteller</label><br>
    <select id="he" name="hersteller">
      <option value="" selected>bitte Hersteller wählen</option>
      <option value="BMW">BMW</option>
      <option value="VW">VW</option>
    </select><br>
    <label for="mo">Modell</label><br>
    <input type="text" id="mo" name="modell"><br>
    <label for="erzl">Erstzulassung</label><br>
    <input type="date" id="erzl" name="erstzulassung"><br>

    Zustand:
    <input type="radio" id="z1" name="zustand" value="gut"> <label for="z1">gut</label>
    <input type="radio" id="z2" name="zustand" value="leicht"> <label for="z2">leichte Schäden</label>
    <input type="radio" id="z3" name="zustand" value="defekt"> <label for="z3">defekt</label>
    <p><input type="submit" value="Senden"></p>
  </form>
</body>
</html>`],
  ['tip', 'So sammelst du die Punkte: (1) Grundgerüst mit `doctype`, `head`, `body`. (2) `form` mit **action und method**. (3) **Passender Typ** je Feld (email, tel, date). (4) `required` bei Pflichtfeldern. (5) Radiobuttons mit **gleichem name**. (6) Labels. (7) Submit-Button. Ob du eine Tabelle oder `div`/`br` zum Anordnen nimmst, ist meist egal; die Lösungen akzeptieren beides.'],
  ['h', 'Komplettbeispiel: Anmeldeformular mit mailto (Winter 2023/24)'],
  ['p', 'Besonderheit: Das Formular wird an eine **E-Mail-Adresse** geschickt. Dafür nutzt man `action="mailto:..."` mit `enctype="text/plain"`. Die Felder Vorname, Nachname und E-Mail sollen **35 Zeichen** aufnehmen (`size="35"`), die Textbereiche 2 bzw. 4 Zeilen haben.'],
  ['code', 'html', `<h2>Kita Stuttgart Onlineanmeldung</h2>
<form action="mailto:info@kitaStuttgart.com" method="post" enctype="text/plain">
  <table>
    <tr><td>Vorname:</td>  <td><input type="text"  name="vorname"  size="35"></td></tr>
    <tr><td>Nachname:</td> <td><input type="text"  name="nachname" size="35"></td></tr>
    <tr><td>Email:</td>    <td><input type="email" name="mail"     size="35"></td></tr>
    <tr><td>Geburtsdatum:</td><td><input type="date" name="geburtsdatum"></td></tr>
  </table>

  <p>Mein Kind ernährt sich:</p>
  <select name="ernaehrung" size="3">
    <option value="Vollkost">Vollkost</option>
    <option value="Vegan">Vegan</option>
    <option value="Vegetarisch">Vegetarisch</option>
  </select>

  <p>Folgende Personen sind berechtigt, das Kind abzuholen (Mehrfachauswahl möglich):<br>
    <input type="checkbox" name="abholer" value="Mutter"> Mutter
    <input type="checkbox" name="abholer" value="Vater"> Vater
    <input type="checkbox" name="abholer" value="Geschwister"> Geschwister ab 12 Jahre</p>
  <p>Zusätzlich berechtigt:<br><textarea name="zusatz" rows="2" cols="53"></textarea></p>

  <p>Wie viele Betreuungsstunden benötigen Sie täglich? (nur eine Auswahl)<br>
    <input type="radio" name="stunden" value="6"> 6<br>
    <input type="radio" name="stunden" value="8"> 8<br>
    <input type="radio" name="stunden" value="10"> 10</p>
  <p>Weitere Mitteilungen:<br><textarea name="mitteilungen" rows="4" cols="53"></textarea></p>
  <p><input type="submit" value="Anmeldung versenden"></p>
</form>
<p><a href="KitaStuttgart.html">Zurück zur Startseite Kita Stuttgart</a></p>`],
  ['h', 'Komplettbeispiel: Formular erweitern (Sommer 2024, PS)'],
  ['p', 'Gegeben ist ein Formular. Ergänzt werden soll eine Auswahl "Skilehrerausbildung" mit den Werten `ja`/`nein`, eine CSS-Klasse `skilehrer` (rot, 300 px breit) und die fehlenden Attribute von `form`.'],
  ['code', 'html', `<style>
  .skilehrer { background-color: red; width: 300px; }
</style>
...
<form action="https://www.brettelhausen.de/kursanmeldung" method="post">
  ...
  <label for="skilehrer">Skilehrerausbildung</label>
  <select id="skilehrer" name="skilehrer" class="skilehrer">
    <option value="nein">nein</option>
    <option value="ja">ja</option>
  </select>
  <input type="submit" name="send" value="absenden" class="mySendBut">
</form>`],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie, wodurch sich Inline- und Blockelemente unterscheiden. Nennen Sie je zwei Beispiele.', ['**Blockelemente** beginnen auf einer neuen Zeile und nehmen die gesamte verfügbare Breite ein, zum Beispiel `<div>`, `<p>`, `<h1>`, `<ul>`.', '**Inlineelemente** nehmen nur so viel Platz ein, wie ihr Inhalt braucht, und stehen in einer Zeile mit anderen Inhalten, zum Beispiel `<span>`, `<a>`, `<img>`, `<strong>`.', 'Mit CSS lässt sich das ändern: `display: block;` bzw. `display: inline;` (oder `inline-block`).'], 4],
  ['qa', 'Begründen Sie, warum im Kontext der Barrierefreiheit Eingabe-Elemente korrekt mit `<label>` beschriftet werden müssen.', ['Ein **Screenreader** liest blinden oder sehbehinderten Nutzern vor, welches Feld gerade den Fokus hat. Nur wenn das Feld über `<label for="id">` eindeutig mit seiner Beschriftung verknüpft ist, weiß der Nutzer, was er eingeben soll.', 'Zusätzlich vergrößert das Label die Klickfläche (Klick auf den Text aktiviert das Feld), was motorisch eingeschränkten Nutzern hilft. Grundlage sind die WCAG.'], 3],
  ['qa', 'Ein Formular soll personenbezogene Daten an `https://www.verein.de/anmeldung` senden. Vervollständigen Sie das form-Tag und begründen Sie die Wahl der Methode.', [['code', 'html', '<form action="https://www.verein.de/anmeldung" method="post">'], 'Bei **GET** würden die Daten an die URL angehängt und wären im Browserverlauf, in Lesezeichen und in den Logdateien des Webservers sichtbar. Bei **POST** werden sie im Body der Anfrage übertragen. Da es sich um personenbezogene Daten handelt (DSGVO), ist **POST** zu wählen, zusammen mit **HTTPS** für die Verschlüsselung.'], 4],
  ['qa', 'Erstellen Sie die HTML-Anweisungen für eine Pflichtauswahl "Zahlungsart" mit den Möglichkeiten "Rechnung" (vorausgewählt) und "PayPal". An das Skript soll unter dem Namen `zahlung` der Wert `rechnung` bzw. `paypal` übertragen werden.', [['code', 'html', `<input type="radio" id="zr" name="zahlung" value="rechnung" checked required>
<label for="zr">Rechnung</label>
<input type="radio" id="zp" name="zahlung" value="paypal">
<label for="zp">PayPal</label>`], 'Gleicher `name` = eine Gruppe, `checked` = Vorauswahl, `value` = übertragener Wert, je Knopf eigenes Label.'], 4],
  ['qa', 'Erklären Sie den Begriff "barrierefrei" in Bezug auf die Erstellung einer Webseite und nennen Sie drei konkrete Maßnahmen.', ['Barrierefrei bedeutet, dass die Webseite für **alle Menschen**, auch für Menschen mit Behinderungen, zugänglich und nutzbar ist (WCAG, BITV 2.0, BFSG).', '- Alternativtexte für Bilder (`alt`)', '- Formularfelder mit `<label>` verknüpfen', '- vollständige Bedienbarkeit per Tastatur', '- ausreichende Kontraste und skalierbare Schriftgrößen', '- semantische Struktur mit Überschriften und `lang`-Attribut'], 4],
  ['quiz', [
    {q: 'Welches Attribut bestimmt, wohin ein Formular gesendet wird?', o: ['action', 'method', 'target', 'href'], a: 0, e: 'action = Ziel-URL, method = GET oder POST.'},
    {q: 'Wann gehören Radiobuttons zu einer Gruppe?', o: ['Wenn sie denselben name haben', 'Wenn sie dieselbe id haben', 'Wenn sie im selben div stehen', 'Wenn sie denselben value haben'], a: 0, e: 'Ids müssen eindeutig sein; die Gruppe entsteht über name.'},
    {q: 'Welcher Eingabetyp öffnet auf dem Handy eine Telefontastatur?', o: ['tel', 'number', 'text', 'phone'], a: 0, e: 'type="tel". Einen Typ phone gibt es nicht.'},
    {q: 'Welches Attribut macht ein Feld zum Pflichtfeld?', o: ['required', 'mandatory', 'needed', 'validate'], a: 0, e: 'Der Browser verhindert das Absenden, solange das Feld leer ist.'},
    {q: 'Wo stehen die Formulardaten bei method="get"?', o: ['In der URL', 'Im HTTP-Body', 'In einem Cookie', 'Im HTML-Kopf'], a: 0, e: 'Beispiel: suche.php?begriff=html'},
    {q: 'Was ist ein Inline-Element?', o: ['span', 'div', 'p', 'h2'], a: 0, e: 'span steht in der Zeile, die anderen sind Blockelemente.'},
    {q: 'Wofür steht das Attribut alt bei img?', o: ['Alternativtext, zum Beispiel für Screenreader', 'Höhe des Bildes', 'Bildquelle', 'Ausrichtung'], a: 0, e: 'Wird auch angezeigt, wenn das Bild nicht lädt.'},
  ]],
  ['see', ['eua-css', 'eua-js', 'eua-webapi', 'course-html']],
]);
