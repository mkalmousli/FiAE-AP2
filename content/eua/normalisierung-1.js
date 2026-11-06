AP2.page('eua-normalisierung', {
  b: 'eua', g: 'Datenbanken und SQL', t: 'Normalisierung: Anomalien, 1. bis 3. Normalform',
  d: 'Eine Tabelle mit **doppelten Daten** (Redundanz) macht Probleme: Sie braucht mehr Platz, und Änderungen führen zu **Fehlern** (Anomalien). Die **Normalisierung** zerlegt die Tabelle Schritt für Schritt in kleinere Tabellen. Die drei Schritte heißen **1., 2. und 3. Normalform**. In der AP2 kommt das fast jedes Jahr: Erst nennst du Nachteile der alten Tabelle. Dann überführst du sie "nachvollziehbar" in die **3. Normalform**.',
  m: '**Schritt 0:** berechenbare Spalten streichen. **1NF:** jede Zelle hat nur **einen** Wert (atomar). **2NF:** Nichtschlüssel-Spalte hängt vom **ganzen** Schlüssel ab. **3NF:** Nichtschlüssel-Spalte hängt **nur** vom Schlüssel ab, nicht von einer anderen Spalte. Dann: Tabellen mit **Fremdschlüssel** verbinden.',
  cheat: [
    ['Schritt 0', ['Berechenbare Spalten streichen', 'Beispiel: Fahrzeit = Ende - Start', 'Beispiel: Summe = Menge · Preis', 'Sonst entsteht Redundanz']],
    ['1. Normalform', ['Jede Zelle: genau ein Wert', 'Keine Listen in einer Zelle', 'Zusammengesetzte Angaben teilen (Name, Ort)', 'Jede Zeile hat einen Primärschlüssel']],
    ['2. Normalform', ['Zuerst 1NF', 'Nur bei zusammengesetztem Schlüssel wichtig', 'Jede Spalte hängt vom GANZEN Schlüssel ab', 'Sonst: eigene Tabelle für den Teil-Schlüssel']],
    ['3. Normalform', ['Zuerst 2NF', 'Keine Abhängigkeit zwischen Nichtschlüssel-Spalten', 'PLZ bestimmt Ort: eigene Tabelle', 'Merksatz: "Der Schlüssel, der ganze Schlüssel und nichts als der Schlüssel"']],
  ],
  blocks: [
    ['h', 'Warum normalisieren? Die drei Anomalien'],
    ['p', 'Eine **Anomalie** (Unregelmäßigkeit, Fehler) entsteht, wenn dieselbe Information **mehrfach** in einer Tabelle steht. Ein Beispiel: In der Tabelle `Reparatur` steht bei jedem Auftrag der volle Name und Ort des Kunden.'],
    ['table', ['ReparaturNr', 'Kunde', 'PLZ', 'Ort', 'Datum'], [
      ['1001', 'Anna Roth', '70173', 'Stuttgart', '03.03.'],
      ['1002', 'Anna Roth', '70173', 'Stuttgart', '10.03.'],
      ['1003', 'Ben Karl', '73728', 'Esslingen', '11.03.'],
    ]],
    ['table', ['Anomalie', 'Was passiert?', 'Beispiel'], [
      ['**Änderungs-Anomalie**', 'Ein Wert wird nur an einer Stelle geändert. Danach widersprechen sich die Zeilen.', 'Anna Roth zieht um. Du änderst die Zeile 1001, aber nicht 1002. Jetzt hat sie zwei Orte.'],
      ['**Einfüge-Anomalie**', 'Du kannst eine Information nicht speichern, weil eine andere fehlt.', 'Ein neuer Kunde hat noch keinen Auftrag. Es gibt keine Zeile für ihn.'],
      ['**Lösch-Anomalie**', 'Beim Löschen geht eine zweite Information verloren.', 'Du löschst den letzten Auftrag von Ben Karl. Seine Kundendaten sind auch weg.'],
    ]],
    ['note', '**Prüfungsfrage "Nachteile der nicht normalisierten Datenspeicherung" (6 Punkte):** Nenne 3 Nachteile und erkläre jeden kurz. Gute Antworten: (1) mehr **Speicherplatz** durch doppelte Werte, (2) **Anomalien** beim Ändern, Einfügen, Löschen, (3) **Inkonsistenz** (widersprüchliche Daten), (4) Listen in einer Zelle sind schwer **abzufragen** und zu verknüpfen.'],
    ['h', 'Wörter, die du kennen musst'],
    ['table', ['Wort', 'Einfach erklärt'], [
      ['Redundanz', 'Dieselbe Information steht mehrfach in der Datenbank.'],
      ['atomar', 'Nicht weiter teilbar. Eine Zelle enthält nur einen Wert.'],
      ['Primärschlüssel (PK)', 'Spalte(n), die jede Zeile eindeutig machen.'],
      ['Fremdschlüssel (FK)', 'Spalte, die auf den Primärschlüssel einer anderen Tabelle zeigt.'],
      ['funktional abhängig', 'A bestimmt B. Wenn du A kennst, kennst du auch B. Beispiel: PLZ bestimmt Ort.'],
      ['transitiv abhängig', 'A bestimmt B, und B bestimmt C. Dann hängt C indirekt von A ab.'],
      ['zusammengesetzter Schlüssel', 'Der Primärschlüssel besteht aus zwei oder mehr Spalten.'],
      ['Nichtschlüssel-Spalte', 'Jede Spalte, die nicht zum Primärschlüssel gehört.'],
      ['überführen', 'Von einer Form in eine andere umwandeln. Hier: in die 3. Normalform bringen.'],
      ['nachvollziehbar', 'Du zeigst jeden Zwischenschritt, damit man ihn verstehen kann.'],
    ]],
    ['h', 'Der Weg in vier Schritten'],
    ['diagram', AP2.dg.flow(['Schritt 0: Berechenbares streichen', '1NF: atomar machen', '2NF: Teil-Abhängigkeit lösen', '3NF: transitive Abhängigkeit lösen'])],
    ['p', 'Schreibe die Tabelle in **Relationen-Schreibweise**: `Tabelle (Schlüssel, Spalte, Spalte)`. Unterstreiche den Primärschlüssel (in Text: `#` oder Großbuchstaben markieren). Zeige nach **jedem** Schritt das Zwischenergebnis. Dafür gibt es in der Prüfung die Punkte.'],
    ['h', 'Beispiel Schritt für Schritt: Fahrradwerkstatt'],
    ['p', 'Ausgangstabelle (alle Angaben in einer Tabelle). Der Primärschlüssel ist `ReparaturNr`. Das Beispiel ist neu geschrieben, aber wie in der Prüfung aufgebaut.'],
    ['code', 'text', `Reparatur (ReparaturNr, Datum, Kunde, KundenNr, PLZ, Ort,
           Teile, MechNr, MechName, Stundensatz, Stunden, Lohnkosten)

Beispielzeile:
1001 | 03.03. | "Roth, Anna" | K7 | 70173 | Stuttgart |
"Kette; Bremsbelag" | M2 | Weiss | 40 | 2,5 | 100`],
    ['walk', {t: 'Reparatur in die 3. Normalform bringen', steps: [
      {t: '**Schritt 0: Berechenbare Spalten streichen.** `Lohnkosten = Stunden · Stundensatz` (2,5 · 40 = 100). Man kann sie jederzeit ausrechnen. Wer sie speichert, hat Redundanz. Also **weg damit**. Auch `Fahrzeit` aus Start und Ende wäre so ein Fall.', b: [['code', 'text', `Reparatur (ReparaturNr, Datum, Kunde, KundenNr, PLZ, Ort,
           Teile, MechNr, MechName, Stundensatz, Stunden)`]]},
      {t: '**1. Normalform: atomar.** Zwei Fehler. (a) `Kunde` enthält Nachname **und** Vorname. Teile die Spalte. (b) `Teile` enthält eine **Liste** ("Kette; Bremsbelag"). Das ist verboten. Lege eine eigene Tabelle `Position` an: Pro Teil eine Zeile.', b: [['table', ['ReparaturNr', 'TeileNr', 'Bezeichnung', 'Menge'], [['1001', 'T5', 'Kette', '1'], ['1001', 'T9', 'Bremsbelag', '2']]], ['code', 'text', `Reparatur (ReparaturNr, Datum, Nachname, Vorname, KundenNr, PLZ, Ort,
           MechNr, MechName, Stundensatz, Stunden)
Position  (ReparaturNr, TeileNr, Bezeichnung, Menge)    -- PK: beide Spalten`]]},
      {t: '**2. Normalform: ganzer Schlüssel.** Prüfe nur Tabellen mit **zusammengesetztem** Schlüssel. Das ist `Position`. `Menge` hängt von **beiden** Spalten ab (wie viel von welchem Teil in welchem Auftrag). `Bezeichnung` hängt nur von `TeileNr` ab. Das ist ein **Teil** des Schlüssels. Also: eigene Tabelle `Teil`. `Reparatur` hat einen einfachen Schlüssel und ist schon in 2NF.', b: [['code', 'text', `Position (ReparaturNr, TeileNr, Menge)         -- PK: beide Spalten
Teil     (TeileNr, Bezeichnung)`]]},
      {t: '**3. Normalform: nur vom Schlüssel.** Suche Abhängigkeiten **zwischen** Nichtschlüssel-Spalten. (a) `PLZ` bestimmt `Ort`. (b) `KundenNr` bestimmt Nachname, Vorname, PLZ. (c) `MechNr` bestimmt MechName und Stundensatz. Alle drei sind **transitiv**: ReparaturNr -> KundenNr -> Nachname. Also: eigene Tabellen.', b: [['table', ['Abhängigkeit', 'Art', 'Lösung'], [['PLZ -> Ort', 'transitiv', 'Tabelle Ort'], ['KundenNr -> Name, PLZ', 'transitiv', 'Tabelle Kunde'], ['MechNr -> Name, Stundensatz', 'transitiv', 'Tabelle Mechaniker']]]]},
      {t: '**Ergebnis:** Fünf bis sechs Tabellen. Schlüssel sind **fett** gedacht, `#` markiert einen Fremdschlüssel. Prüfe zuletzt: Jede Tabelle hat einen PK. Jeder Verweis hat einen FK.', b: [['code', 'text', `Reparatur  (ReparaturNr, Datum, #KundenNr, #MechNr, Stunden)
Kunde      (KundenNr, Nachname, Vorname, #PLZ)
Ort        (PLZ, Ort)
Mechaniker (MechNr, MechName, Stundensatz)
Position   (#ReparaturNr, #TeileNr, Menge)
Teil       (TeileNr, Bezeichnung)`], ['note', 'Ob du `Ort` als eigene Tabelle anlegst, ist Geschmack. Formal verlangt die 3NF es, weil PLZ den Ort bestimmt. In der Prüfung ist beides meist erlaubt, wenn du es begründest.']]},
    ]}],
    ['h', 'Prüfe selbst: Trace-Tabelle der Abhängigkeiten'],
    ['p', 'So prüfst du jede Spalte. Frage: **Wovon hängt die Spalte ab?** Dann siehst du sofort, in welche Form sie gehört.'],
    ['table', ['Spalte', 'Hängt ab von', 'Problem?', 'Form'], [
      ['Datum', 'ReparaturNr', 'nein', 'ok'],
      ['Nachname', 'KundenNr (nicht ReparaturNr direkt)', 'transitiv', '3NF verletzt'],
      ['Ort', 'PLZ', 'transitiv', '3NF verletzt'],
      ['Stundensatz', 'MechNr', 'transitiv', '3NF verletzt'],
      ['Bezeichnung (in Position)', 'nur TeileNr (Teil des PK)', 'Teil-Abhängigkeit', '2NF verletzt'],
      ['Teile ("Kette; Bremsbelag")', '-', 'Liste in einer Zelle', '1NF verletzt'],
    ]],
    ['h', 'Fallen in der Prüfung'],
    ['list', [
      '**Schritt 0 vergessen.** Berechenbare Spalten (Summe, Dauer, Alter) müssen weg. Das steht oft in der Aufgabe: "Redundante Daten sind zu eliminieren".',
      '**Zwischenschritte fehlen.** Wenn die Aufgabe "nachvollziehbar" sagt, brauchst du 1NF, 2NF und 3NF einzeln. Nur das Endergebnis gibt wenig Punkte.',
      '**2NF bei einfachem Schlüssel.** Hat die Tabelle nur eine Schlüsselspalte, ist sie automatisch in 2NF. Schreibe das kurz hin.',
      '**Fremdschlüssel vergessen.** Nach dem Zerlegen müssen die Tabellen verbunden bleiben. Sonst verlierst du Informationen.',
      '**Adresse zu früh teilen oder zu spät.** Straße, PLZ und Ort gehören in 1NF in eigene Spalten.',
      '**Künstlichen Schlüssel nicht erklärt.** Für Kunden nimmst du eine `KundenNr`, nicht den Namen. Namen sind nicht eindeutig.',
    ]],
    ['h', 'Von der 3NF zu SQL'],
    ['code', 'sql', `CREATE TABLE Ort (
  plz   CHAR(5) PRIMARY KEY,
  ort   VARCHAR(40) NOT NULL
);
CREATE TABLE Kunde (
  kunden_nr INT PRIMARY KEY AUTO_INCREMENT,
  nachname  VARCHAR(40) NOT NULL,
  vorname   VARCHAR(40) NOT NULL,
  plz       CHAR(5),
  FOREIGN KEY (plz) REFERENCES Ort(plz)
);`],
    ['p', 'Mehr dazu auf den Seiten zu ER-Modell, JOIN und DDL. Mit einem **JOIN** holst du die zerlegten Daten wieder zusammen.'],
    ['qa', 'Nennen und erläutern Sie drei Nachteile einer nicht normalisierten Datenspeicherung (6 Punkte).', ['- **Mehr Speicherbedarf:** Gleiche Werte stehen mehrfach in der Tabelle. (2 Punkte)', '- **Anomalien:** Ändern, Einfügen oder Löschen führt zu Fehlern, zum Beispiel wird der Ort nur in einer Zeile geändert. (2 Punkte)', '- **Inkonsistenz und schwierige Abfragen:** Widersprüchliche Daten und Listen in einer Zelle lassen sich schlecht auswerten und verknüpfen. (2 Punkte)'], 6],
    ['qa', 'Eine Tabelle `Bestellung(BestNr, ArtNr, Menge, ArtBez, Preis)` hat den Schlüssel (BestNr, ArtNr). In welcher Normalform ist sie, und wie lösen Sie das Problem?', ['- Sie ist in **1NF** (alle Werte atomar).', '- **2NF verletzt:** ArtBez und Preis hängen nur von ArtNr ab, also von einem Teil des Schlüssels.', '- Lösung: `Artikel(ArtNr, ArtBez, Preis)` und `Bestellposition(BestNr, ArtNr, Menge)`.'], 5],
    ['see', ['eua-sqler', 'eua-sqljoin', 'eua-sqldml', 'eua-sqlexam']],
    ['quiz', [
      {q: 'Was bedeutet "atomar" in der 1. Normalform?', o: ['Jede Zelle enthält genau einen Wert', 'Die Tabelle hat nur eine Spalte', 'Es gibt keinen Schlüssel', 'Alle Werte sind Zahlen'], a: 0, e: 'Keine Listen und keine zusammengesetzten Angaben in einer Zelle.'},
      {q: 'Wann kann die 2. Normalform überhaupt verletzt sein?', o: ['Bei einem zusammengesetzten Primärschlüssel', 'Bei jedem Schlüssel', 'Nur bei Fremdschlüsseln', 'Nur bei Zahlenspalten'], a: 0, e: 'Nur dann kann eine Spalte von einem Teil des Schlüssels abhängen.'},
      {q: 'PLZ bestimmt Ort. Ort steht in der Tabelle Kunde. Welche Form ist verletzt?', o: ['3. Normalform', '1. Normalform', '2. Normalform', 'Keine'], a: 0, e: 'Ort hängt von der Nichtschlüssel-Spalte PLZ ab (transitiv).'},
      {q: 'Was tun Sie zuerst bei der Spalte "Gesamtpreis = Menge · Einzelpreis"?', o: ['Streichen, weil berechenbar', 'In Teile zerlegen', 'Als Fremdschlüssel nutzen', 'Als Primärschlüssel nutzen'], a: 0, e: 'Berechenbare Werte sind Redundanz (Schritt 0).'},
      {q: 'Welche Anomalie entsteht, wenn beim Löschen eines Auftrags die Kundendaten verloren gehen?', o: ['Lösch-Anomalie', 'Einfüge-Anomalie', 'Änderungs-Anomalie', 'Keine'], a: 0, e: 'Eine zweite Information geht beim Löschen mit verloren.'},
    ]],
  ],
});
