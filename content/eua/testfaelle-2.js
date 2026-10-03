AP2.add('eua-testfaelle', [
  ['h', 'Testfalltabelle aus Äquivalenzklassen und Grenzwerten'],
  ['table', ['Nr.', 'Klasse / Grenze', 'Eingabe', 'Erwartetes Ergebnis'], [
    ['1', 'ungültig, zu klein', '10', 'Fehlermeldung "Mindestalter 18"'],
    ['2', 'Grenze unten, knapp ungültig', '17', 'Fehlermeldung'],
    ['3', 'Grenze unten, gültig', '18', 'Mitgliedschaft möglich'],
    ['4', 'gültig, typisch', '40', 'Mitgliedschaft möglich'],
    ['5', 'Grenze oben, gültig', '65', 'Mitgliedschaft möglich'],
    ['6', 'Grenze oben, knapp ungültig', '66', 'Fehlermeldung "Höchstalter 65"'],
    ['7', 'ungültig, zu groß', '80', 'Fehlermeldung'],
    ['8', 'ungültig, Typ', '"abc"', 'Fehlermeldung "Bitte Zahl eingeben"'],
    ['9', 'ungültig, leer', '(leer)', 'Fehlermeldung "Pflichtfeld"'],
    ['10', 'ungültig, negativ', '-5', 'Fehlermeldung'],
  ]],
  ['code', 'java', `static boolean mitgliedMoeglich(int alter) {
    return alter >= 18 && alter <= 65;         // richtig
    // Typischer Fehler:  alter > 18   -> Test mit 18 schlägt fehl!
    // Typischer Fehler:  alter < 65   -> Test mit 65 schlägt fehl!
}`],
  ['h', 'Mehrere Eingaben: Entscheidungstabelle'],
  ['p', 'Hängt das Ergebnis von **mehreren Bedingungen** ab, hilft eine **Entscheidungstabelle**: Man listet alle **Kombinationen** der Bedingungen und die zugehörigen **Aktionen**. Beispiel Rabatt: **Stammkunde** (ja/nein) und **Bestellwert über 100 Euro** (ja/nein):'],
  ['table', ['Regel', 'Stammkunde', 'Bestellwert > 100 Euro', 'Rabatt'], [['1', 'ja', 'ja', '10 Prozent'], ['2', 'ja', 'nein', '5 Prozent'], ['3', 'nein', 'ja', '3 Prozent'], ['4', 'nein', 'nein', '0 Prozent']]],
  ['p', 'Jede Regel ergibt **einen Testfall**. Bei n Bedingungen gibt es 2^n Kombinationen (hier 4). Manche Kombinationen lassen sich zusammenfassen, wenn eine Bedingung für das Ergebnis egal ist.'],
  ['h', 'Zweites Beispiel: Notenvergabe'],
  ['p', 'Punkte von 0 bis 100: **92 bis 100** = Note 1, **81 bis 91** = 2, **67 bis 80** = 3, **50 bis 66** = 4, **30 bis 49** = 5, **0 bis 29** = 6. Ungültig: kleiner 0 und größer 100.'],
  ['table', ['Klasse', 'Grenzwerte zum Testen', 'Erwartet'], [['kleiner 0 (ungültig)', '-1', 'Fehler'], ['0 bis 29', '0, 1, 29', 'Note 6'], ['30 bis 49', '30, 49', 'Note 5'], ['50 bis 66', '50, 66', 'Note 4'], ['67 bis 80', '67, 80', 'Note 3'], ['81 bis 91', '81, 91', 'Note 2'], ['92 bis 100', '92, 100', 'Note 1'], ['größer 100 (ungültig)', '101', 'Fehler']]],
  ['warn', 'Testen **beweist keine Fehlerfreiheit**. Es zeigt nur, dass bei den **geprüften** Eingaben keine Fehler auftraten. Ein Test **ohne erwartetes Ergebnis** ist wertlos, denn man kann dann nicht entscheiden, ob er bestanden ist.'],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Ein Programm akzeptiert eine Menge zwischen 1 und 99 (einschließlich). Bilden Sie die Äquivalenzklassen und geben Sie die Grenzwerte an.', ['**Äquivalenzklassen:** ungültig kleiner 1 (zum Beispiel -5), **gültig 1 bis 99** (zum Beispiel 50), ungültig größer 99 (zum Beispiel 150); zusätzlich Nicht-Zahl und leer.', '**Grenzwerte:** 0, **1**, 2 (untere Grenze) und 98, **99**, 100 (obere Grenze).'], 6],
  ['qa', 'Warum werden bei der Grenzwertanalyse gerade die Werte an den Grenzen getestet?', 'Programmierfehler treten häufig an den Bereichsgrenzen auf, zum Beispiel durch falsche Vergleichsoperatoren (`<` statt `<=`) oder Off-by-one-Fehler bei Schleifen und Arrays. Die Werte an den Grenzen decken diese Fehler auf, während ein Wert aus der Mitte des Bereichs sie nicht findet.', 4],
  ['qa', 'Eine Versandkostenregel lautet: Bestellungen bis 49,99 Euro kosten 4,90 Euro Versand, ab 50 Euro ist der Versand frei. Nennen Sie sinnvolle Testwerte.', ['Äquivalenzklassen: unter 50 Euro und ab 50 Euro (plus ungültig: negativ, 0).', 'Grenzwerte: **49,98**, **49,99**, **50,00**, **50,01**; sowie 0,00 und -1.', 'Erwartet: bis 49,99: 4,90 Euro; ab 50,00: 0,00 Euro.'], 5],
  ['qa', 'Erstellen Sie die Entscheidungstabelle für: "Eine Person darf Auto fahren, wenn sie mindestens 18 ist UND einen Führerschein hat."', ['Bedingungen: A = mindestens 18, B = Führerschein.', 'Regel 1: A ja, B ja: **darf fahren**.', 'Regel 2: A ja, B nein: darf nicht.', 'Regel 3: A nein, B ja: darf nicht (z. B. Begleitetes Fahren).', 'Regel 4: A nein, B nein: darf nicht.'], 5],
  ['quiz', [
    {q: 'Was ist der Zweck der Äquivalenzklassenbildung?', o: ['Mit wenigen Tests möglichst viele Fehler finden', 'Alle Eingaben testen', 'Den Code verschönern', 'Performance messen'], a: 0, e: 'Aus jeder Klasse genügt ein Vertreter.'},
    {q: 'Für den gültigen Bereich 1 bis 10: Welche Werte gehören zur Grenzwertanalyse?', o: ['0, 1, 2, 9, 10, 11', '1, 5, 10', '5, 6, 7', '100, 200'], a: 0, e: 'Je Grenze: knapp darunter, Grenze, knapp darüber.'},
    {q: 'Welche Klassen muss man testen?', o: ['Gültige und ungültige', 'Nur gültige', 'Nur ungültige', 'Keine'], a: 0, e: 'Auch Fehlereingaben müssen korrekt behandelt werden.'},
    {q: 'Zu welcher Testmethode gehört die Äquivalenzklassenbildung?', o: ['Black-Box-Test', 'White-Box-Test', 'Lasttest', 'Penetrationstest'], a: 0, e: 'Die Tests werden aus der Spezifikation abgeleitet, nicht aus dem Code.'},
    {q: 'Wofür nutzt man eine Entscheidungstabelle?', o: ['Für Kombinationen mehrerer Bedingungen', 'Für die Datenbank', 'Für Netzwerke', 'Für Farben'], a: 0, e: 'Jede Kombination ergibt eine Regel und einen Testfall.'},
  ]],
]);
