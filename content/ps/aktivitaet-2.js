AP2.add('ps-aktivitaet', [
  ['h', 'Schleifen, Swimlanes und Datenfluss'],
  ['kv', [
    ['Schleife', 'Ein Pfeil führt von einer Raute zu einer früheren Aktion zurück. Beispiel: "Passwort eingeben", dann Raute [falsch] zurück zu "Passwort eingeben", [richtig] weiter.'],
    ['Swimlane (Partition)', 'Das Diagramm wird in senkrechte oder waagerechte Bahnen geteilt. Jede Bahn gehört einem Akteur oder einer Abteilung (Kunde, Vertrieb, Lager). So sieht man, **wer** welche Aktion ausführt.'],
    ['Objektknoten', 'Ein Rechteck mit Daten (zum Beispiel "Rechnung"), das zwischen Aktionen weitergegeben wird.'],
    ['Signale / Zeitereignisse', 'Sanduhr-Symbol: Es wird auf eine Zeit oder ein Ereignis gewartet.'],
  ]],
  ['h', 'Aktivitätsdiagramm und Code'],
  ['p', 'Das Diagramm lässt sich direkt in Code umsetzen: Eine **Aktion** ist eine Anweisung oder ein Methodenaufruf, eine **Entscheidung** ist ein `if`, eine **Schleife** ein `while`, und eine **Gabelung** entspricht **Threads** oder parallelen Aufgaben.'],
  ['code', 'python', `def bestellung_bearbeiten(bestellung):
    if not artikel_lieferbar(bestellung):        # Raute: [nein]
        kunde_informieren(bestellung)
        return                                    # Ende
    speichern(bestellung)                         # Aktion
    # Fork: zwei Prüfungen parallel, Join: auf beide warten
    zahlung_ok, adresse_ok = pruefe_parallel(bestellung)
    if zahlung_ok and adresse_ok:
        versand_ausloesen(bestellung)`],
  ['warn', ['Typische Fehler:', '- **Raute ohne Bedingungen** an den Ausgängen. Jeder Ausgang braucht ein [Guard].', '- **Fork ohne Join** (oder umgekehrt). Parallele Zweige müssen wieder zusammengeführt werden, sonst ist das Ende unklar.', '- **Mehrere Startknoten** in einem Diagramm. Es gibt genau einen.', '- **Aktionen als Substantive** ("Bestellung") statt Verben ("Bestellung prüfen").']],
  ['table', ['Aktivitätsdiagramm', 'Programmablaufplan (PAP)', 'Struktogramm'], [
    ['UML-Norm', 'DIN 66001', 'DIN 66261 (Nassi-Shneiderman)'],
    ['Parallelität', 'Ja (Fork/Join)', 'Nein'],
    ['Einsatz', 'Geschäftsprozesse, Anwendungsfälle', 'Algorithmen, Kontrollfluss'],
    ['Schleifen', 'Rückwärtspfeil', 'Eigene Schleifenboxen'],
  ], {first: false}],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erstellen Sie ein Aktivitätsdiagramm für den Ablauf "Geldautomat: Geld abheben". Es gibt eine PIN-Prüfung (maximal 3 Versuche) und eine Prüfung, ob genug Geld auf dem Konto ist.', ['Start - Karte einlesen - PIN eingeben - **Raute: PIN korrekt?** [nein] und Versuche kleiner 3: zurück zu "PIN eingeben"; [nein] und Versuche gleich 3: Karte einziehen - Ende; [ja]: weiter.', 'Betrag wählen - **Raute: Guthaben ausreichend?** [nein]: Meldung anzeigen - Ende; [ja]: Geld ausgeben - Karte auswerfen - Ende.', 'Wichtig: Jede Raute hat mindestens zwei Ausgänge mit Bedingungen, es gibt einen Start und mindestens einen Endknoten.'], 8],
  ['qa', 'Was ist der Unterschied zwischen Fork und Decision?', 'Bei der **Decision** (Raute) wird **genau ein** Weg gewählt, abhängig von einer Bedingung. Beim **Fork** (Balken) werden **alle** ausgehenden Wege **gleichzeitig** gestartet. Ein Join wartet auf alle Zweige, ein Merge wartet auf keinen.', 3],
  ['quiz', [
    {q: 'Womit wird eine Entscheidung im Aktivitätsdiagramm dargestellt?', o: ['Raute', 'Balken', 'Kreis', 'Dreieck'], a: 0, e: 'Entscheidungen und Zusammenführungen werden als Raute gezeichnet.'},
    {q: 'Was bedeutet ein dicker Balken mit einem Eingang und mehreren Ausgängen?', o: ['Parallele Ausführung (Fork)', 'Entscheidung', 'Ende', 'Fehler'], a: 0, e: 'Ein Fork startet mehrere Zweige gleichzeitig.'},
    {q: 'Wie sieht der Endknoten aus?', o: ['Kreis mit gefülltem Punkt', 'Nur ein gefüllter Kreis', 'Raute', 'Rechteck'], a: 0, e: 'Der Startknoten ist ein gefüllter Kreis, der Endknoten ein Kreis mit gefülltem Punkt darin.'},
    {q: 'Wofür benutzt man Swimlanes?', o: ['Um zu zeigen, wer welche Aktion ausführt', 'Um Datenbanken zu zeichnen', 'Um Netzwerke zu planen', 'Um die Farben festzulegen'], a: 0, e: 'Swimlanes ordnen Aktionen Akteuren oder Abteilungen zu.'},
  ]],
]);
