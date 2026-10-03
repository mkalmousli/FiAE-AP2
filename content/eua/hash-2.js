AP2.add('eua-hash', [
  ['table', ['Merkmal', 'Chaining (Verkettung)', 'Open Addressing (Sondieren)'], [
    ['Speicherort', 'Außerhalb der Tabelle (Listen)', 'Alle Einträge **in der Tabelle**'],
    ['Kollision', 'An die Liste anhängen', 'Nächstes freies Feld suchen'],
    ['Tabelle kann überfüllt werden?', 'Nein (Listen wachsen)', 'Ja, Füllgrad darf 1 nicht erreichen'],
    ['Löschen', 'Einfach (aus der Liste entfernen)', 'Aufwendig (Markierung "gelöscht" nötig)'],
    ['Nachteil', 'Zusätzlicher Speicher für Verweise', '**Clustering** (Häufungen), Leistung sinkt bei hohem Füllgrad'],
  ]],
  ['kv', [
    ['Füllgrad (Load Factor)', '= Anzahl Einträge geteilt durch Anzahl Felder. Je höher, desto mehr Kollisionen. Hashtabellen werden **vergrößert**, wenn der Füllgrad etwa **0,7 bis 0,75** überschreitet.'],
    ['Rehashing', 'Beim Vergrößern wird die **Tabelle verdoppelt** und **alle Einträge neu verteilt** (neues m, neue Indizes). Das ist teuer, passiert aber selten (amortisiert O(1)).'],
    ['Perfektes Hashing', 'Hashfunktion ohne Kollisionen für eine **feste Schlüsselmenge** (zum Beispiel Schlüsselwörter eines Compilers).'],
  ]],
  ['table', ['Operation', 'Hashtabelle (Mittel)', 'Hashtabelle (schlechtester Fall)', 'Sortiertes Array', 'BST (balanciert)'], [['Suchen', '**O(1)**', 'O(n)', 'O(log n)', 'O(log n)'], ['Einfügen', '**O(1)**', 'O(n)', 'O(n)', 'O(log n)'], ['Löschen', '**O(1)**', 'O(n)', 'O(n)', 'O(log n)'], ['Sortierte Ausgabe', 'Nein', 'Nein', 'Ja', 'Ja (Inorder)']]],
  ['codes', [
    ['java', `import java.util.HashMap;
import java.util.Map;

Map<String, Integer> alter = new HashMap<>();
alter.put("Mia", 24);              // einfügen: O(1)
alter.put("Tom", 31);
alter.put("Mia", 25);              // gleicher Schlüssel: Wert wird ERSETZT
System.out.println(alter.get("Mia"));          // 25
System.out.println(alter.containsKey("Zoe"));  // false
alter.remove("Tom");
for (Map.Entry<String, Integer> e : alter.entrySet()) {
    System.out.println(e.getKey() + " = " + e.getValue());
}`],
    ['csharp', `var alter = new Dictionary<string, int>();
alter["Mia"] = 24;
alter["Tom"] = 31;
Console.WriteLine(alter["Mia"]);                 // 24
if (alter.TryGetValue("Zoe", out int a)) { }     // sicherer Zugriff`],
    ['python', `alter = {"Mia": 24, "Tom": 31}        # dict = Hashtabelle
alter["Mia"] = 25                       # ändern
print(alter["Mia"])                     # 25
print("Zoe" in alter)                   # False (O(1))
del alter["Tom"]
menge = {1, 2, 3}                       # set = Hashtabelle nur mit Schlüsseln`],
  ]],
  ['procon', 'Hashtabelle', ['Sehr **schnelles** Suchen, Einfügen, Löschen (O(1) im Mittel)', 'Ideal für **Zuordnungen** (Schlüssel zu Wert), Caches, Zähler, Duplikaterkennung', 'In allen Sprachen fertig vorhanden (HashMap, Dictionary, dict)'], ['**Keine Reihenfolge** (nicht sortiert)', 'Bei vielen Kollisionen oder schlechter Hashfunktion **O(n)**', 'Mehr Speicher nötig (freie Felder), Rehashing-Kosten', 'Schlüssel müssen **unveränderlich** sein und `hashCode`/`equals` korrekt umsetzen']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'In eine Hashtabelle der Größe 5 (Hashfunktion k mod 5) werden nacheinander 12, 7, 22, 17 eingefügt. Kollisionen werden mit linearem Sondieren behandelt. Wie sieht die Tabelle aus?', ['12 mod 5 = 2: Feld 2. 7 mod 5 = 2: belegt, Feld 3. 22 mod 5 = 2: belegt, 3 belegt, Feld 4. 17 mod 5 = 2: belegt, 3, 4 belegt, Umlauf zu Feld 0 (frei): Feld 0.', 'Tabelle: **Feld 0: 17, Feld 1: leer, Feld 2: 12, Feld 3: 7, Feld 4: 22**.'], 5],
  ['qa', 'Was ist eine Kollision und wie kann man sie behandeln?', 'Eine Kollision tritt auf, wenn zwei verschiedene Schlüssel von der Hashfunktion denselben Index erhalten. Behandlung: **Verkettung** (jedes Feld enthält eine Liste der Einträge mit diesem Index) oder **offene Adressierung** (ein anderes freies Feld in der Tabelle suchen, zum Beispiel lineares Sondieren).', 4],
  ['qa', 'Wann ist eine Hashtabelle einer sortierten Liste überlegen und wann nicht?', 'Überlegen bei **Suche nach einem bestimmten Schlüssel** (O(1) statt O(log n)) und beim schnellen Einfügen. **Nicht geeignet**, wenn eine **sortierte Reihenfolge** oder **Bereichsabfragen** (alle Werte zwischen 10 und 20) gebraucht werden, weil die Einträge nicht geordnet sind.', 4],
  ['quiz', [
    {q: 'Welche Laufzeit hat das Suchen in einer Hashtabelle im Mittel?', o: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], a: 0, e: 'Der Index wird direkt berechnet.'},
    {q: 'Was ist eine Kollision?', o: ['Zwei Schlüssel erhalten denselben Index', 'Ein Schlüssel wird gelöscht', 'Die Tabelle ist leer', 'Ein Wert ist zu groß'], a: 0, e: 'Kollisionen müssen durch Chaining oder Probing behandelt werden.'},
    {q: 'Was berechnet 17 mod 5?', o: ['2', '3', '12', '17'], a: 0, e: '17 = 3 mal 5 + 2.'},
    {q: 'Welche Eigenschaft hat eine Hashtabelle NICHT?', o: ['Die Einträge sind sortiert', 'Schneller Zugriff über Schlüssel', 'Kollisionsbehandlung', 'Hashfunktion'], a: 0, e: 'Hashtabellen haben keine Ordnung der Einträge.'},
    {q: 'Was passiert beim Rehashing?', o: ['Die Tabelle wird vergrößert und alle Einträge neu verteilt', 'Alle Einträge werden gelöscht', 'Die Hashfunktion wird entfernt', 'Es wird ein Backup erstellt'], a: 0, e: 'Bei hohem Füllgrad wird die Tabelle vergrößert.'},
  ]],
]);
