AP2.page('course-python-07', {
  b: 'course', g: 'Python', t: 'Python 7: Dictionaries und Mengen (dict, set)',
  d: 'Ein **Dictionary** (`dict`) speichert **Schlüssel-Wert-Paare**: Zu jedem eindeutigen **Schlüssel** (zum Beispiel einer Artikelnummer) gehört ein **Wert** (zum Beispiel der Preis). Der Zugriff erfolgt nicht über eine Position, sondern über den Schlüssel, und ist dank **Hashtabelle** sehr schnell (im Mittel O(1)). In Java heißt das `HashMap`, in C# `Dictionary<K, V>`. Eine **Menge** (`set`) speichert **jeden Wert nur einmal** und ohne feste Reihenfolge; sie eignet sich zum Entfernen von Duplikaten und für Mengenoperationen.',
  m: '**dict: `d[schluessel] = wert` setzt, `d[schluessel]` liest (KeyError, wenn fehlt), `d.get(s, standard)` liest sicher.** **Schlüssel müssen unveränderbar sein** (str, int, tuple). **set: keine Duplikate, keine Reihenfolge, `in` sehr schnell.** **JSON-Objekt = dict, JSON-Array = list.**',
  cheat: [
    ['dict', ['`d = {"a": 1, "b": 2}`', '`d["c"] = 3` setzen', '`d.get("x", 0)` sicher lesen', '`del d["a"]`, `d.pop("b")`']],
    ['dict durchlaufen', ['`for k in d:` Schlüssel', '`for v in d.values():`', '`for k, v in d.items():`', '`"a" in d` Schlüssel vorhanden?']],
    ['set', ['`s = {1, 2, 3}`, leer: `set()`', '`s.add(x)`, `s.discard(x)`', '`set(liste)` Duplikate weg', '`x in s` schnell']],
    ['Mengenoperationen', ['`a | b` Vereinigung', '`a & b` Schnittmenge', '`a - b` Differenz', '`a ^ b` symmetrische Differenz']],
  ],
  blocks: [
    ['h', 'Dictionaries anlegen und benutzen'],
    ['code', 'python', `preise = {"Feuerdorn": 5.0, "rote Rosen": 2.3, "Linde": 42.5}

print(preise["Linde"])            # 42.5
preise["Flieder"] = 19.5          # neues Paar hinzufügen
preise["Linde"] = 39.9            # vorhandenen Wert überschreiben
print(len(preise))                # 4

print(preise.get("Tulpe"))        # None (kein Fehler)
print(preise.get("Tulpe", 0.0))   # 0.0  (Standardwert)
# print(preise["Tulpe"])          # KeyError!

if "Feuerdorn" in preise:         # prüft die SCHLÜSSEL
    print("Feuerdorn kostet", preise["Feuerdorn"])

del preise["Flieder"]             # Paar löschen`],
    ['h', 'Dictionaries durchlaufen'],
    ['code', 'python', `for artikel in preise:                  # nur Schlüssel
    print(artikel)

for artikel, preis in preise.items():   # Schlüssel und Wert
    print(f"{artikel:12} {preis:6.2f} €")

gesamt = sum(preise.values())           # nur Werte
teuerster = max(preise, key=preise.get) # Schlüssel mit größtem Wert`],
    ['h', 'Typisches Muster: Zählen und Gruppieren'],
    ['p', 'Ein Dictionary ist ideal, um Vorkommen zu **zählen** oder Werte nach einem Schlüssel zu **summieren**, ohne vorher zu wissen, welche Schlüssel es gibt. Das ersetzt oft den Gruppenwechsel (und braucht keine sortierten Daten).'],
    ['code', 'python', `bestellungen = [("Strauch GmbH", 10), ("Baumgarten", 30), ("Strauch GmbH", 5), ("Weißmann", 4)]

summe_je_filiale = {}
for filiale, anzahl in bestellungen:
    summe_je_filiale[filiale] = summe_je_filiale.get(filiale, 0) + anzahl
print(summe_je_filiale)    # {'Strauch GmbH': 15, 'Baumgarten': 30, 'Weißmann': 4}

text = "anna"
haeufigkeit = {}
for z in text:
    haeufigkeit[z] = haeufigkeit.get(z, 0) + 1
print(haeufigkeit)         # {'a': 2, 'n': 2}`],
    ['h', 'Verschachtelte Strukturen (wie JSON)'],
    ['code', 'python', `kunde = {
    "name": "Max Muster",
    "adresse": {"strasse": "Musterweg 27", "plz": "12345", "ort": "Musterhausen"},
    "bestellungen": [
        {"artikel": "Feuerdorn", "anzahl": 10},
        {"artikel": "rote Rosen", "anzahl": 10},
    ],
}
print(kunde["adresse"]["ort"])                 # Musterhausen
for b in kunde["bestellungen"]:
    print(b["artikel"], b["anzahl"])

import json
text = json.dumps(kunde, ensure_ascii=False, indent=2)   # dict -> JSON-Text
zurueck = json.loads(text)                               # JSON-Text -> dict`],
    ['h', 'Mengen (set)'],
    ['code', 'python', `besucher = ["Anna", "Ben", "Anna", "Cem", "Ben"]
eindeutig = set(besucher)
print(eindeutig)            # {'Anna', 'Ben', 'Cem'} (Reihenfolge beliebig)
print(len(eindeutig))       # 3

python_kurs = {"Anna", "Ben", "Cem"}
java_kurs = {"Ben", "Dora"}
print(python_kurs & java_kurs)    # {'Ben'}                 beide Kurse
print(python_kurs | java_kurs)    # {'Anna','Ben','Cem','Dora'} mindestens einer
print(python_kurs - java_kurs)    # {'Anna', 'Cem'}          nur Python

leer = set()                      # {} wäre ein leeres DICT!`],
    ['h', 'Welche Datenstruktur wann?'],
    ['table', ['Struktur', 'Reihenfolge', 'Duplikate', 'Zugriff', 'Einsatz'], [
      ['**list**', 'Ja', 'Ja', 'Index (schnell), Suche nach Wert O(n)', 'Folge von Werten, Bestellpositionen'],
      ['**tuple**', 'Ja', 'Ja', 'Index, unveränderbar', 'Feste Wertegruppen'],
      ['**dict**', 'Einfügereihenfolge (seit Python 3.7)', 'Schlüssel eindeutig', 'Schlüssel O(1)', 'Nachschlagen: Artikel -> Preis'],
      ['**set**', 'Nein', 'Nein', '`in` O(1)', 'Duplikate entfernen, Mitgliedschaft'],
    ]],
    ['h', 'In anderen Sprachen'],
    ['codes', [
      ['python', `preise = {"Linde": 42.5}
preise["Feuerdorn"] = 5.0
for k, v in preise.items():
    print(k, v)`],
      ['java', `HashMap<String, Double> preise = new HashMap<>();
preise.put("Linde", 42.5);
preise.put("Feuerdorn", 5.0);
for (Map.Entry<String, Double> e : preise.entrySet())
    System.out.println(e.getKey() + " " + e.getValue());`],
      ['csharp', `var preise = new Dictionary<string, double> { ["Linde"] = 42.5 };
preise["Feuerdorn"] = 5.0;
foreach (var (k, v) in preise)
    Console.WriteLine(k + " " + v);`],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Erstellen Sie aus der Liste `noten = [("Mathe", 2), ("Deutsch", 1), ("Mathe", 3), ("Englisch", 2), ("Deutsch", 2)]` ein Dictionary mit dem Notendurchschnitt je Fach.', [['code', 'python', `summen, anzahl = {}, {}
for fach, note in noten:
    summen[fach] = summen.get(fach, 0) + note
    anzahl[fach] = anzahl.get(fach, 0) + 1
schnitt = {fach: summen[fach] / anzahl[fach] for fach in summen}
print(schnitt)   # {'Mathe': 2.5, 'Deutsch': 1.5, 'Englisch': 2.0}`]], 5],
    ['qa', 'Prüfen Sie mit einer Menge, ob in einer Liste von Kundennummern Duplikate vorkommen.', [['code', 'python', `def hat_duplikate(nummern):
    return len(set(nummern)) != len(nummern)

print(hat_duplikate([101, 102, 101]))   # True`]], 2],
    ['quiz', [
      {q: 'Was passiert bei d["x"], wenn der Schlüssel fehlt?', o: ['KeyError', 'None', '0', 'Der Schlüssel wird angelegt'], a: 0, e: 'd.get("x") liefert None.'},
      {q: 'Wie erzeugt man eine leere Menge?', o: ['set()', '{}', '[]', 'set[]'], a: 0, e: '{} ist ein leeres dict.'},
      {q: 'Was liefert {1, 2, 3} & {2, 3, 4}?', o: ['{2, 3}', '{1, 2, 3, 4}', '{1, 4}', '{1}'], a: 0, e: 'Schnittmenge.'},
      {q: 'Welcher Typ darf KEIN Dictionary-Schlüssel sein?', o: ['list', 'str', 'int', 'tuple'], a: 0, e: 'Schlüssel müssen hashbar (unveränderbar) sein.'},
      {q: 'Wie entspricht ein dict in Java?', o: ['HashMap', 'ArrayList', 'Array', 'HashSet'], a: 0, e: 'HashSet entspricht set.'},
    ]],
    ['see', ['course-python-06', 'course-python-08', 'eua-hash', 'eua-formate']],
  ],
});
