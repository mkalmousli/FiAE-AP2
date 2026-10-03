AP2.page('eua-testfaelle', {
  b: 'eua', g: 'Testen', t: 'Testfallermittlung: Äquivalenzklassen und Grenzwertanalyse',
  d: 'Man kann nicht alle möglichen Eingaben testen. Deshalb teilt man die Eingaben in **Äquivalenzklassen** ein: Gruppen, bei denen man **dasselbe Verhalten** erwartet. Aus **jeder Klasse** testet man **einen Vertreter**. Fehler treten besonders oft **an den Grenzen** auf, deshalb prüft die **Grenzwertanalyse** zusätzlich die Werte **direkt an und neben den Grenzen**.',
  m: '**Äquivalenzklassen: ein Test pro Gruppe (gültig UND ungültig!). Grenzwerte: Grenze, kurz darunter, kurz darüber.** Für den Bereich **von 18 bis 65**: 17, **18**, 19 ... 64, **65**, 66. Merke: **"Fehler lieben Grenzen."**',
  cheat: [
    ['Äquivalenzklassen', ['Eingabebereich in **Klassen** teilen', '**Gültige** Klassen (erlaubte Werte)', '**Ungültige** Klassen (zu klein, zu groß, falscher Typ, leer)', '**Ein** Wert pro Klasse genügt']],
    ['Grenzwertanalyse', ['An jeder Grenze testen: **Grenzwert, knapp darunter, knapp darüber**', 'Bereich 1..10: **0, 1, 2, 9, 10, 11**', 'Sehr fehleranfällig: `<` statt `<=`', 'Ergänzt die Äquivalenzklassen']],
    ['Vorgehen', ['1. Anforderung lesen, Eingaben und Bereiche bestimmen', '2. Äquivalenzklassen bilden', '3. Grenzwerte bestimmen', '4. Testfälle mit **erwartetem Ergebnis** notieren', '5. Ausführen und vergleichen']],
    ['Weitere Verfahren', ['**Entscheidungstabelle:** Bedingungskombinationen', '**Zustandsbasiert:** Zustandsübergänge', '**Anwendungsfallbasiert**', '**Fehlererwartung (Error Guessing):** typische Fehler testen (0, leer, negativ, null)']],
  ],
  blocks: [
    ['h', 'Das Problem: unendlich viele Eingaben'],
    ['p', 'Eine Funktion, die ein Alter (0 bis 150) prüft, hat 151 gültige Eingaben, dazu unendlich viele ungültige (negative Zahlen, Text, leer). **Alles zu testen ist unmöglich.** Deshalb braucht man Methoden, mit **wenigen** Tests **möglichst viele Fehler** zu finden. Das sind **Black-Box-Verfahren**: Man leitet die Tests aus der **Spezifikation** ab, nicht aus dem Code.'],
    ['h', 'Äquivalenzklassenbildung'],
    ['p', 'Alle Eingaben einer **Äquivalenzklasse** werden vom Programm **gleich behandelt**. Wenn ein Wert der Klasse funktioniert, funktionieren (nach Annahme) alle. Es gibt **gültige** Klassen (erwünschte Eingaben) und **ungültige** Klassen (Fehlerfälle, die abgewiesen werden müssen). **Beide** müssen getestet werden.'],
    ['ex', ['**Aufgabe:** Ein Formular nimmt das **Alter für eine Mitgliedschaft** an. Gültig sind **18 bis 65 Jahre**.', '**Klasse 1 (ungültig):** Alter **kleiner als 18** (zum Beispiel 10)', '**Klasse 2 (gültig):** Alter **18 bis 65** (zum Beispiel 40)', '**Klasse 3 (ungültig):** Alter **größer als 65** (zum Beispiel 80)', '**Klasse 4 (ungültig):** **keine Zahl** (zum Beispiel "abc") und **leere Eingabe**']],
    ['diagram', {w: 760, h: 200, keep: 600, cap: 'Zahlenstrahl mit den Äquivalenzklassen und den Grenzwerten (grün: gültig, rot: ungültig).', nodes: [
      {id: 'k1', k: 'box', x: 150, y: 90, w: 260, h: 56, t: ['kleiner 18', 'ungültig'], s: 'bad'}, {id: 'k2', k: 'box', x: 380, y: 90, w: 200, h: 56, t: ['18 bis 65', 'gültig'], s: 'ok'}, {id: 'k3', k: 'box', x: 610, y: 90, w: 260, h: 56, t: ['größer 65', 'ungültig'], s: 'bad'},
      {id: 't1', k: 'text', x: 280, y: 150, t: '17 | 18', fs: 12, b: true}, {id: 't2', k: 'text', x: 480, y: 150, t: '65 | 66', fs: 12, b: true}, {id: 'l1', k: 'text', x: 150, y: 40, t: 'Test: 10', fs: 12, tc: 'text2'}, {id: 'l2', k: 'text', x: 380, y: 40, t: 'Test: 40', fs: 12, tc: 'text2'}, {id: 'l3', k: 'text', x: 610, y: 40, t: 'Test: 80', fs: 12, tc: 'text2'},
    ], edges: []}],
    ['h', 'Grenzwertanalyse'],
    ['p', 'Erfahrungsgemäß passieren Fehler **an den Rändern**: `alter > 18` statt `alter >= 18`, `<` statt `<=`. Deshalb testet man an **jeder Grenze** drei Werte: den **Grenzwert selbst**, den Wert **direkt darunter** und den Wert **direkt darüber**.'],
    ['table', ['Grenze', 'Testwert', 'Erwartetes Ergebnis'], [['Untere Grenze 18', '17', 'abgelehnt (knapp ungültig)'], ['', '**18**', 'akzeptiert (Grenzwert, gültig)'], ['', '19', 'akzeptiert'], ['Obere Grenze 65', '64', 'akzeptiert'], ['', '**65**', 'akzeptiert (Grenzwert, gültig)'], ['', '66', 'abgelehnt (knapp ungültig)']]],
    ['p', 'Dazu kommen **typische Sonderfälle**: **0**, **negative Zahl**, **leere Eingabe**, **sehr große Zahl**, **Text**, **Sonderzeichen**, **null**.'],
  ],
});
