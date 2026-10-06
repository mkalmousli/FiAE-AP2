AP2.page('eua-js', {
  b: 'eua', g: 'Webentwicklung', t: 'JavaScript im Browser: DOM, Events und Daten nachladen',
  d: '**JavaScript** ist die Programmiersprache des Browsers. Sie läuft **clientseitig** und kann die Seite verändern, ohne sie neu zu laden. Über das **DOM** (Document Object Model) ist jedes HTML-Element ein **Objekt** im Baum `document`, das man mit `document.getElementById("id")` findet und dessen Eigenschaften (`value`, `checked`, `disabled`, `textContent`, `style`) man lesen und setzen kann. Auf Benutzeraktionen reagiert man mit **Event-Handlern** (`onclick`, `onchange`, `addEventListener`).',
  m: '**Finden -> Reagieren -> Ändern:** `getElementById` holt das Element, ein **Event** (click, change, input, submit) löst eine Funktion aus, die Funktion ändert eine **Eigenschaft**. **Checkbox: `.checked`, Textfeld: `.value`, Button sperren: `.disabled = true`.** **Regelmäßig aktualisieren: `setInterval` + `fetch`.**',
  cheat: [
    ['Elemente finden', ['`document.getElementById("pzr")`', '`document.querySelector(".preis")`', '`document.querySelectorAll("input")`']],
    ['Eigenschaften', ['`.value` Eingabetext', '`.checked` Checkbox/Radio', '`.disabled` gesperrt', '`.textContent` / `.innerHTML` Inhalt']],
    ['Events', ['`click`, `change`, `input`', '`submit`, `load`, `keyup`', '`el.addEventListener("click", f)`', '`el.onclick = f` (Kurzform)']],
    ['Zeit und Daten', ['`setInterval(f, 30000)` alle 30 s', '`setTimeout(f, 1000)` einmalig', '`fetch(url).then(r => r.json())`', '`new Date().toLocaleTimeString()`']],
  ],
  blocks: [
    ['h', 'Wo läuft JavaScript?'],
    ['p', 'HTML liefert die Struktur, CSS das Aussehen, **JavaScript das Verhalten**. Der Code steht in einem `<script>`-Element, am besten in einer eigenen Datei, die am **Ende des `body`** oder mit `defer` geladen wird, damit die HTML-Elemente schon existieren, wenn das Skript sie sucht.'],
    ['code', 'html', `<script src="app.js" defer></script>   <!-- extern, nach dem Parsen ausführen -->
<script>
  console.log("Hallo aus dem Browser");  // Ausgabe in den Entwicklertools (F12)
</script>`],
    ['h', 'Das DOM: Die Seite als Objektbaum'],
    ['diagram', AP2.dg.tree({t: 'document', c: [{t: 'html', c: [{t: 'head', c: [{t: 'title'}]}, {t: 'body', c: [{t: 'h3'}, {t: 'div#row', c: [{t: 'input'}, {t: 'label'}]}, {t: 'button'}]}]}]}, {k: 'round', w: 78, h: 34, gx: 92, gy: 62, cap: 'Der Browser baut aus dem HTML einen Baum. JavaScript greift auf die Knoten zu und verändert sie.'})],
    ['h', 'Grundlagen der Sprache in 60 Sekunden'],
    ['code', 'js', `let anzahl = 3;                 // veränderbare Variable
const PREIS = 89.0;             // Konstante
let name = "PZR";               // String
let ok = true;                  // boolean
let termine = ["01.03.", "15.09."];   // Array
let kunde = {name: "Max", mail: "max@x.de"};  // Objekt

function gesamt(menge, preis) {        // Funktion
  return menge * preis;
}
if (anzahl > 2 && ok) { console.log(gesamt(anzahl, PREIS)); }
for (let i = 0; i < termine.length; i++) { console.log(termine[i]); }
const doppelt = (x) => x * 2;          // Pfeilfunktion`],
    ['note', 'Vergleiche mit `===` (Wert **und** Typ gleich) statt `==`, denn `"5" == 5` ist in JavaScript `true`, `"5" === 5` aber `false`.'],
    ['h', 'Prüfungsbeispiel Winter 2025/26: Button freischalten (4 Punkte)'],
    ['p', 'Der Button "Termin vereinbaren" (`id="termin"`) ist mit `disabled` gesperrt. Er soll aktiv werden, sobald die Checkbox (`id="pzr"`) angehakt ist. Verwenden Sie einen passenden Eventhandler.'],
    ['codes', [
      ['js', `// Variante 1: addEventListener (modern, empfohlen)
document.getElementById("pzr").addEventListener("change", function () {
  // checked ist true oder false -> Button genau umgekehrt sperren
  document.getElementById("termin").disabled = !this.checked;
});`],
      ['js', `// Variante 2: wie in der offiziellen Lösung
function checkSelected() {
  var checkbox = document.getElementById("pzr");
  if (checkbox.checked == true) {
    document.getElementById("termin").disabled = false;
  } else {
    document.getElementById("termin").disabled = true;
  }
}
function attachEventListeners() {
  document.getElementById("pzr").onclick = checkSelected;
}
attachEventListeners();   // Zuweisung auch wirklich ausführen!`],
      ['html', `<!-- Variante 3: Handler direkt im HTML (inline) -->
<input type="checkbox" id="pzr" name="pzr" value="PZR"
       onchange="document.getElementById('termin').disabled = !this.checked">`],
    ]],
    ['h', 'Eingaben lesen und Ergebnisse anzeigen'],
    ['code', 'js', `// <input id="menge" type="number"> <span id="kosten"></span>
document.getElementById("menge").addEventListener("input", () => {
  const menge = Number(document.getElementById("menge").value);  // value ist immer ein String!
  const kosten = menge * 89.0;
  document.getElementById("kosten").textContent = kosten.toFixed(2) + " €";
});`],
    ['h', 'Formular vor dem Absenden prüfen'],
    ['code', 'js', `document.getElementById("anmeldung").addEventListener("submit", (e) => {
  const mail = document.getElementById("mail").value;
  if (!mail.includes("@")) {
    e.preventDefault();               // Absenden verhindern
    alert("Bitte gültige E-Mail eingeben");
  }
});`],
    ['warn', 'Clientseitige Prüfung ist **Komfort, keine Sicherheit**: Ein Angreifer kann JavaScript abschalten oder Anfragen direkt an den Server schicken. Der **Server muss alle Eingaben erneut prüfen** (zum Beispiel gegen SQL-Injection mit Prepared Statements).'],
    ['h', 'Werte regelmäßig aktualisieren (Sommer 2023, 4 Punkte)'],
    ['p', 'Die Temperatur liegt als JSON unter `http://192.168.178.35/messung/temperatur.json` bereit und soll regelmäßig auf der Seite erscheinen. Zwei Lösungswege:'],
    ['list', [
      '**Ganze Seite neu laden** per Meta-Tag: `<meta http-equiv="refresh" content="30">` lädt die Seite alle 30 Sekunden neu. Einfach, aber flackert und lädt alles neu.',
      '**Nur den Wert nachladen** mit JavaScript (**AJAX**): Ein Timer ruft regelmäßig die JSON-Datei ab und schreibt den Wert in ein `<span>`. Die Seite bleibt stehen.',
    ]],
    ['code', 'js', `// <span id="temp">--</span> °C
function ladeTemperatur() {
  fetch("http://192.168.178.35/messung/temperatur.json")
    .then((antwort) => antwort.json())          // Text -> JavaScript-Objekt
    .then((daten) => {
      document.getElementById("temp").textContent = daten.temperatur;
    })
    .catch(() => { document.getElementById("temp").textContent = "Fehler"; });
}
ladeTemperatur();                 // sofort einmal
setInterval(ladeTemperatur, 30000);   // dann alle 30 Sekunden`],
    ['h', 'Uhrzeit anzeigen: drei Wege mit Vor- und Nachteilen (Sommer 2023)'],
    ['table', ['Möglichkeit', 'Vorteil', 'Nachteil'], [
      ['**Clientseitig** mit JavaScript: `new Date()` jede Sekunde in ein `<span>` schreiben', 'Kein Netzwerkverkehr, geringster Aufwand', 'Zeigt die Uhrzeit des **Clients**, die falsch eingestellt sein kann'],
      ['**Serverseitig** (zum Beispiel PHP) beim Erzeugen der Seite einfügen oder per iframe', 'Serverzeit ist meist zuverlässig (NTP)', 'Zusätzliches Skript auf dem Server, Netzwerkverkehr, ohne Nachladen veraltet die Zeit'],
      ['**Externe Zeit-API** im Internet abfragen', 'Sehr genaue Zeit möglich', 'Client braucht Internetzugang, meiste Netzlast, zusätzliche Freigabe in der Firewall'],
    ]],
    ['code', 'js', `setInterval(() => {
  document.getElementById("uhr").textContent = new Date().toLocaleTimeString("de-DE");
}, 1000);`],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Schreiben Sie JavaScript, das beim Klick auf den Button `id="berechnen"` die Werte der Felder `id="netto"` und `id="steuer"` (Prozent) liest und den Bruttobetrag im Element `id="brutto"` ausgibt.', [['code', 'js', `document.getElementById("berechnen").addEventListener("click", () => {
  const netto = parseFloat(document.getElementById("netto").value);
  const satz  = parseFloat(document.getElementById("steuer").value);
  const brutto = netto * (1 + satz / 100);
  document.getElementById("brutto").textContent = brutto.toFixed(2) + " €";
});`], 'Wichtig: `value` liefert einen String, deshalb `parseFloat` bzw. `Number`.'], 5],
    ['qa', 'Erklären Sie den Unterschied zwischen clientseitiger und serverseitiger Programmierung bei Webanwendungen.', ['**Clientseitig** (JavaScript im Browser): Code wird zum Nutzer übertragen und dort ausgeführt; schnelle Reaktion ohne Neuladen, aber vom Nutzer einsehbar und manipulierbar.', '**Serverseitig** (zum Beispiel PHP, Java, C#, Python, Node.js): Code läuft auf dem Webserver, greift auf Datenbanken zu und liefert fertiges HTML oder JSON. Der Nutzer sieht den Quelltext nicht; Prüfungen und Geschäftslogik gehören hierhin.'], 4],
    ['quiz', [
      {q: 'Mit welcher Eigenschaft prüft man, ob eine Checkbox angehakt ist?', o: ['checked', 'value', 'selected', 'active'], a: 0, e: 'checked ist true oder false.'},
      {q: 'Wie sperrt man einen Button per JavaScript?', o: ['button.disabled = true', 'button.enabled = false', 'button.lock()', 'button.style = "off"'], a: 0, e: 'disabled ist ein boolesches Attribut.'},
      {q: 'Welchen Typ liefert input.value?', o: ['Immer String', 'Number bei type=number', 'Je nach Eingabe', 'Object'], a: 0, e: 'Deshalb vor dem Rechnen umwandeln.'},
      {q: 'Was macht setInterval(f, 5000)?', o: ['Ruft f alle 5 Sekunden auf', 'Ruft f einmal nach 5 Sekunden auf', 'Wartet 5 Minuten', 'Stoppt f'], a: 0, e: 'setTimeout wäre einmalig.'},
      {q: 'Was ergibt "5" === 5 in JavaScript?', o: ['false', 'true', 'Fehler', 'undefined'], a: 0, e: '=== vergleicht auch den Typ.'},
      {q: 'Welches Meta-Tag lädt die Seite alle 30 Sekunden neu?', o: ['<meta http-equiv="refresh" content="30">', '<meta reload="30">', '<meta name="refresh" value="30">', '<meta timer="30s">'], a: 0, e: 'Einfachste Lösung ohne JavaScript.'},
    ]],
    ['see', ['eua-html', 'eua-formate', 'eua-webapi']],
  ],
});
