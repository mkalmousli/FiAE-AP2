AP2.page('eua-mengen', {
  b: 'eua', g: 'Datenstrukturen', t: 'Mengen (Set) und Maps (Key-Value) im Vergleich zu Listen',
  d: 'In der Softwareentwicklung ist die Wahl der passenden **Collection (Datenstruktur)** entscheidend für Speicherbedarf und Performance. Während eine **Liste (List / ArrayList)** Elemente nach einem **numerischen Index** ordnet und **Duplikate erlaubt**, speichert eine **Menge (Set / HashSet)** jedes Element **garantiert nur einmal (Eindeutigkeit)** ohne Duplikate. Eine **Map (HashMap / Dictionary)** speichert **Schlüssel-Wert-Paare (Key-Value)**, wobei jeder Schlüssel eindeutig ist. Bei **HashSet** und **HashMap** erfolgt das Suchen und Einfügen im Durchschnitt in **konstanter Zeit O(1)** über Hashing.',
  m: '**List: Geordnet nach Index (0, 1, 2...), Duplikate erlaubt, Suche O(n).** **Set (Menge): Keine Duplikate (jedes Element eindeutig), keine Indexe, Suche O(1) bei HashSet.** **Map (Wörterbuch): Speichert Key -> Value, Keys sind eindeutig, Suche per Key O(1).** **Mengenoperationen:** Vereinigung (Union), Schnittmenge (Intersection), Differenzmenge (Minus). **Voraussetzung für HashSet/HashMap:** Saubere Überschreibung von `equals()` und `hashCode()`.',
  cheat: [
    ['Vergleich List vs. Set vs. Map', [
      '**List (ArrayList / LinkedList):** Zugriff per Index `list.get(i)`; Duplikate erlaubt; Reihenfolge bleibt erhalten',
      '**Set (HashSet / TreeSet):** Keine doppelten Werte; ideal für Eindeutigkeitsprüfungen (z. B. eindeutige Benutzer-IDs, besuchte URLs)',
      '**Map (HashMap / TreeMap):** Nachschlagen nach Schlüssel `map.get(key)`; Key ist eindeutig, Value darf doppelt vorkommen',
    ]],
    ['Zeitkomplexität im Durchschnitt (Big-O)', [
      '**Element suchen (contains):** List = **O(n)** (muss alles durchsuchen); HashSet = **O(1)** (direkte Hash-Berechnung!)',
      '**Element per Schlüssel holen:** Map = **O(1)** (sofortiger Zugriff über Key)',
      '**Einfügen am Ende:** List = **O(1)**; HashSet = **O(1)**',
    ]],
    ['Die 4 Mengenoperationen', [
      '**Vereinigung (Union / addAll):** Alle Elemente aus A und B zusammen (ohne Dopplungen)',
      '**Schnittmenge (Intersection / retainAll):** Nur die Elemente, die sowohl in A als auch in B vorkommen',
      '**Differenzmenge (Difference / removeAll):** Alle Elemente aus A, die NICHT in B vorkommen',
      '**Teilmenge (Subset / containsAll):** Prüft, ob alle Elemente von B vollständig in A enthalten sind',
    ]],
  ],
  blocks: [
    ['h', 'Die drei Kern-Collections im direkten Vergleich'],
    ['p', 'Die IHK-Prüfung fragt häufig, welche Datenstruktur für ein konkretes Szenario gewählt werden soll (z. B. Sommer 2024 PB2 1.3). Die Entscheidung hängt von drei Fragen ab: Brauchen wir Indexe? Dürfen Werte doppelt vorkommen? Suchen wir über einen Schlüssel?'],
    ['table', ['Eigenschaft', 'Liste (z. B. ArrayList)', 'Menge (z. B. HashSet)', 'Map (z. B. HashMap)'], [
      ['**Datenformat**', 'Einzelne Werte: `[A, B, C, A]`', 'Eindeutige Werte: `{A, B, C}`', 'Schlüssel-Wert-Paare: `{K1: V1, K2: V2}`'],
      ['**Duplikate erlaubt?**', '**Ja** (mehrfach gleicher Wert möglich)', '**Nein** (Duplikate werden ignoriert)', '**Keys: Nein** (eindeutig), **Values: Ja**'],
      ['**Zugriff über...**', 'Numerischen Index (`list[0]`)', 'Kein Index (nur Durchlaufen oder `contains`)', 'Schlüssel (`map.get("user123")`)'],
      ['**Reihenfolge**', 'Feste Einfügereihenfolge', 'Keine feste Reihenfolge (außer TreeSet)', 'Keine feste Reihenfolge (außer TreeMap)'],
      ['**Prüfung `contains()`**', '**O(n)** (langsam bei großen Datenmengen)', '**O(1)** (extrem schnell dank Hashwert)', '`containsKey()`: **O(1)**'],
      ['**Typischer Einsatzzweck**', 'Einkaufsliste, Verlauf von Aktionen, Tabellenzeilen', 'Teilnehmerliste ohne Doppelungen, Tags, Blacklist', 'Benutzerverwaltung (ID -> User), Cache, Wörterbuch'],
    ]],
    ['h', 'Die vier mathematischen Mengenoperationen'],
    ['p', 'Mengenoperationen werden in der Anwendungsentwicklung für Filterungen, Auswertungen und Berechtigungsprüfungen eingesetzt:'],
    ['table', ['Operation', 'Mathematisch', 'Java / Methoden-Äquivalent', 'Beispiel mit Mengen {1, 2, 3} und {3, 4, 5}'], [
      ['**Vereinigungsmenge (Union)**', 'A ∪ B', '`setA.addAll(setB);`', '**{1, 2, 3, 4, 5}** (alle Elemente aus beiden)'],
      ['**Schnittmenge (Intersection)**', 'A ∩ B', '`setA.retainAll(setB);`', '**{3}** (nur gemeinsame Elemente)'],
      ['**Differenzmenge (Minus)**', 'A \\ B', '`setA.removeAll(setB);`', '**{1, 2}** (Elemente aus A ohne die aus B)'],
      ['**Teilmenge (Subset)**', 'B ⊆ A', '`setA.containsAll(setB);`', '`false` (da 4 und 5 fehlen)'],
    ]],
    ['h', 'Praxisbeispiel in JavaScript / Pseudocode'],
    ['code', 'javascript', `// 1. Set: Automatische Entfernung von Duplikaten
const bestellungen = ['KundeA', 'KundeB', 'KundeA', 'KundeC', 'KundeB'];
const eindeutigeKunden = new Set(bestellungen);
console.log(eindeutigeKunden); // Set(3) { 'KundeA', 'KundeB', 'KundeC' }

// Schnelle Prüfung in O(1):
if (eindeutigeKunden.has('KundeA')) {
  console.log('Kunde ist bereits registriert!');
}

// 2. Map: Schnelles Nachschlagen (Key -> Value)
const artikelPreise = new Map();
artikelPreise.set('A100', 19.90);
artikelPreise.set('A200', 49.00);

console.log(artikelPreise.get('A100')); // 19.90 (sofortiger Zugriff in O(1))`],
    ['warn', 'Der Vertrag von `equals()` und `hashCode()`: Wenn eigene Klassen (z. B. `Kunde` oder `Artikel`) in einem HashSet oder als Map-Key verwendet werden, **müssen beide Methoden überschrieben werden**! Wenn zwei Objekte laut `equals()` gleich sind, **müssen sie zwingend denselben `hashCode()` liefern**. Wird das vergessen, werden doppelte Objekte nicht erkannt und im Set fälschlicherweise mehrfach gespeichert!'],
    ['h', 'Wörter, die in der Prüfung vorkommen'],
    ['table', ['Wort', 'Einfach erklärt'], [
      ['Collection', 'Überbegriff für Datenstrukturen zur Speicherung von Objektsammlungen'],
      ['Set (Menge)', 'Datenstruktur, die garantiert keine doppelten Elemente speichert'],
      ['Map (Dictionary)', 'Datenstruktur zur Speicherung von eindeutigen Schlüsseln mit zugeordneten Werten'],
      ['Duplikat', 'Mehrfach vorkommender identischer Wert'],
      ['Hashfunktion', 'Mathematische Funktion, die aus einem Objekt eine Zahl (den Hashcode) berechnet'],
      ['Konstante Laufzeit O(1)', 'Der Vorgang dauert immer gleich kurz, egal ob 10 oder 10 Millionen Elemente gespeichert sind'],
      ['Schnittmenge', 'Gemeinsame Elemente zweier Mengen'],
    ]],
    ['see', ['eua-listen', 'eua-hash', 'eua-onotation', 'eua-baeume']],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'In einem Online-Shop sollen für eine Rabattaktion alle Kunden ermittelt werden, die sowohl im Januar als auch im Februar mindestens eine Bestellung aufgegeben haben. Die Kunden-IDs beider Monate liegen als zwei Listen vor (Liste_Januar mit 50.000 IDs, Liste_Februar mit 60.000 IDs). Begründen Sie, warum die Umwandlung in Sets und die Bildung der Schnittmenge performanter ist als der Vergleich über zwei geschachtelte Schleifen.', [
      '- Zwei geschachtelte Schleifen über die Listen haben eine Zeitkomplexität von **O(n * m)** (50.000 * 60.000 = 3 Milliarden Vergleiche). Das führt zu massiven Performance-Problemen.',
      '- Wandelt man die Listen in **HashSets** um, können Duplikate sofort entfernt werden.',
      '- Die Prüfung `setJanuar.contains(id)` für jedes Element aus Februar dauert im HashSet im Durchschnitt nur **O(1)** (konstante Zeit).',
      '- Die Gesamtlaufzeit der Schnittmengenbildung sinkt dadurch drastisch auf **lineare Zeit O(n + m)**.',
      'Zusammen 4 Punkte.',
    ], 4],
    ['qa', 'Nennen Sie jeweils ein konkretes Anwendungsbeispiel aus der Softwareentwicklung für eine List, ein Set und eine Map.', [
      '- **List:** Verlauf der letzten 10 Suchanfragen eines Nutzers (Reihenfolge ist wichtig, doppelte Suchbegriffe sind erlaubt).',
      '- **Set:** Speicherung aller IP-Adressen, die wegen zu vieler fehlerhafter Login-Versuche gesperrt sind (Blacklist: Eindeutigkeit wichtig, blitzschnelle Abfrage über `contains()`).',
      '- **Map:** Benutzerkatalog in einer Webanwendung (Schlüssel: eindeutige Kundennummer `KundenID` -> Wert: `Kundenobjekt` mit Name, Adresse, E-Mail).',
    ], 6],
    ['quiz', [
      {q: 'Welche Eigenschaft zeichnet ein Set (Menge) im Vergleich zu einer List aus?', o: ['Ein Set speichert keine Duplikate (jedes Element ist eindeutig)', 'Ein Set erlaubt schnellen Zugriff über einen Zahlenindex wie set[0]', 'Ein Set ist immer nach dem Alphabet sortiert', 'Ein Set kann nur Zahlen speichern'], a: 0, e: 'Das Hauptmerkmal eines Sets ist die garantierte Eindeutigkeit aller enthaltenen Elemente.'},
      {q: 'Welche Zeitkomplexität hat das Suchen eines Elements in einem HashSet im Durchschnitt?', o: ['O(1) - konstante Zeit', 'O(n) - lineare Zeit', 'O(n²) - quadratische Zeit', 'O(log n)'], a: 0, e: 'Über den Hashwert springt das HashSet direkt zum Speicherort; die Suche dauert O(1).'},
      {q: 'Welche Mengenoperation liefert nur die Elemente zurück, die in BEIDEN Mengen gleichzeitig vorkommen?', o: ['Schnittmenge (Intersection)', 'Vereinigungsmenge (Union)', 'Differenzmenge (Minus)', 'Teilmenge'], a: 0, e: 'Die Schnittmenge (A ∩ B) enthält genau die gemeinsamen Schnittpunkte.'},
      {q: 'Was passiert, wenn man in eine Map einen Eintrag mit einem Schlüssel einfügt, der bereits existiert?', o: ['Der alte Wert wird mit dem neuen Wert überschrieben', 'Es wird eine Fehlermeldung geworfen', 'Der Eintrag wird ignoriert', 'Der Schlüssel wird verdoppelt'], a: 0, e: 'Da Schlüssel eindeutig sind, überschreibt `map.put(key, newValue)` den bisherigen Wert.'},
    ]],
  ],
});
