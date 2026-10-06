AP2.page('course-python-06', {
  b: 'course', g: 'Python', t: 'Python 6: Listen und Tupel',
  d: 'Eine **Liste** (`list`) speichert **mehrere Werte in fester Reihenfolge** unter einem Namen, zum Beispiel alle Messwerte oder alle Kundennamen. Man greift über den **Index** (ab 0) zu, kann Elemente **hinzufügen, ändern und löschen** (Listen sind **veränderbar**, mutable) und sie beliebig lang wachsen lassen. Ein **Tupel** (`tuple`) ist wie eine Liste, aber **unveränderbar** (immutable); es eignet sich für feste Wertegruppen wie Koordinaten. Listen entsprechen in Java/C# am ehesten `ArrayList`/`List<T>`, nicht dem Array fester Länge.',
  m: '**Index ab 0, letzter = -1.** **Slicing `l[a:b]`: b exklusiv.** **`append` hängt an, `insert` fügt ein, `remove` löscht Wert, `pop` löscht Index.** **`b = a` kopiert NICHT, beide zeigen auf dieselbe Liste -> `b = a.copy()`.** **Tupel `(x, y)` kann man nicht ändern.**',
  cheat: [
    ['Anlegen und Zugriff', ['`l = [3, 1, 2]`, `leer = []`', '`l[0]` erstes, `l[-1]` letztes', '`len(l)` Anzahl', '`l[1:3]`, `l[::-1]` umgedreht']],
    ['Ändern', ['`l.append(x)`, `l.insert(i, x)`', '`l.remove(x)`, `l.pop(i)`, `del l[i]`', '`l[i] = x`', '`l.extend(andere)`, `l + andere`']],
    ['Suchen, Sortieren', ['`x in l`', '`l.index(x)`, `l.count(x)`', '`l.sort()` ändert l', '`sorted(l)` neue Liste, `reverse=True`']],
    ['Tupel', ['`p = (3, 4)`', '`x, y = p` Entpacken', 'unveränderbar', '`a, b = b, a` Tausch']],
  ],
  blocks: [
    ['h', 'Listen anlegen und lesen'],
    ['code', 'python', `temperaturen = [21.5, 23.0, 19.8, 25.1]
namen = ["Anna", "Ben", "Cem"]
gemischt = [1, "zwei", 3.0, True]    # erlaubt, aber selten sinnvoll
leer = []

print(temperaturen[0])     # 21.5  (erstes Element, Index 0)
print(temperaturen[3])     # 25.1  (viertes Element)
print(temperaturen[-1])    # 25.1  (letztes Element)
print(len(temperaturen))   # 4`],
    ['diagram', {w: 560, h: 120, keep: 440, cap: 'Jedes Element hat einen positiven (oben) und einen negativen Index (unten).', nodes: [
      {id: 'a', k: 'box', x: 100, y: 60, w: 100, h: 40, t: '21.5', s: 'soft'}, {id: 'b', k: 'box', x: 220, y: 60, w: 100, h: 40, t: '23.0', s: 'soft'}, {id: 'c', k: 'box', x: 340, y: 60, w: 100, h: 40, t: '19.8', s: 'soft'}, {id: 'd', k: 'box', x: 460, y: 60, w: 100, h: 40, t: '25.1', s: 'soft'},
      {id: 'i0', k: 'text', x: 100, y: 22, t: '0', w: 10, h: 10}, {id: 'i1', k: 'text', x: 220, y: 22, t: '1', w: 10, h: 10}, {id: 'i2', k: 'text', x: 340, y: 22, t: '2', w: 10, h: 10}, {id: 'i3', k: 'text', x: 460, y: 22, t: '3', w: 10, h: 10},
      {id: 'n0', k: 'text', x: 100, y: 100, t: '-4', w: 10, h: 10}, {id: 'n1', k: 'text', x: 220, y: 100, t: '-3', w: 10, h: 10}, {id: 'n2', k: 'text', x: 340, y: 100, t: '-2', w: 10, h: 10}, {id: 'n3', k: 'text', x: 460, y: 100, t: '-1', w: 10, h: 10},
    ], edges: []}],
    ['warn', 'Zugriff auf einen Index, den es nicht gibt (`temperaturen[4]` bei 4 Elementen), wirft einen **IndexError**. Der größte gültige Index ist immer `len(liste) - 1`.'],
    ['h', 'Listen verändern'],
    ['code', 'python', `einkauf = ["Brot", "Milch"]
einkauf.append("Käse")            # hinten anhängen   -> ["Brot", "Milch", "Käse"]
einkauf.insert(0, "Äpfel")        # an Position 0     -> ["Äpfel", "Brot", "Milch", "Käse"]
einkauf[1] = "Vollkornbrot"       # Element ersetzen
einkauf.remove("Milch")           # ersten passenden WERT löschen
letztes = einkauf.pop()           # letztes Element entfernen und zurückgeben ("Käse")
erstes = einkauf.pop(0)           # Element an INDEX 0 entfernen ("Äpfel")
print(einkauf)                    # ["Vollkornbrot"]
einkauf.extend(["Eier", "Mehl"])  # mehrere anhängen
einkauf.clear()                   # alles löschen`],
    ['h', 'Durchlaufen, suchen, zählen'],
    ['code', 'python', `noten = [2, 1, 3, 2, 4, 2]

for n in noten:                   # jedes Element
    print(n, end=" ")

print(3 in noten)                 # True: Ist 3 enthalten?
print(noten.index(3))             # 2: Position des ersten Vorkommens
print(noten.count(2))             # 3: Wie oft kommt 2 vor?
print(sum(noten) / len(noten))    # 2.33: Durchschnitt
print(min(noten), max(noten))     # 1 4`],
    ['h', 'Slicing: Ausschnitte bilden'],
    ['code', 'python', `z = [10, 20, 30, 40, 50, 60]
print(z[1:4])     # [20, 30, 40]   (Index 1 bis 3)
print(z[:3])      # [10, 20, 30]   (vom Anfang)
print(z[3:])      # [40, 50, 60]   (bis zum Ende)
print(z[::2])     # [10, 30, 50]   (jedes zweite)
print(z[::-1])    # [60, 50, 40, 30, 20, 10] (umgedreht)`],
    ['h', 'Sortieren'],
    ['code', 'python', `preise = [4.5, 1.2, 9.9, 3.0]
sortiert = sorted(preise)            # NEUE Liste, preise bleibt unverändert
preise.sort()                        # sortiert preise SELBST (gibt None zurück!)
preise.sort(reverse=True)            # absteigend

namen = ["bea", "Anna", "carl"]
namen.sort(key=str.lower)            # ohne Groß-/Kleinschreibung
woerter = ["Haus", "Baum", "Fahrrad"]
woerter.sort(key=len)                # nach Länge`],
    ['warn', '`liste = liste.sort()` ist ein Klassiker: `sort()` sortiert die Liste **an Ort und Stelle** und gibt `None` zurück. Danach ist `liste` gleich `None`. Entweder `liste.sort()` oder `liste = sorted(liste)`.'],
    ['h', 'Referenzen: Vorsicht beim Kopieren'],
    ['p', 'Eine Variable speichert nicht die Liste selbst, sondern einen **Verweis** (Referenz) auf das Listenobjekt im Speicher. `b = a` erzeugt deshalb **keine Kopie**: Beide Namen zeigen auf **dieselbe** Liste.'],
    ['code', 'python', `a = [1, 2, 3]
b = a              # gleiche Liste!
b.append(4)
print(a)           # [1, 2, 3, 4]  <- a hat sich "mit" geändert

c = a.copy()       # echte (flache) Kopie, auch: a[:] oder list(a)
c.append(5)
print(a)           # [1, 2, 3, 4]  bleibt
print(c)           # [1, 2, 3, 4, 5]`],
    ['h', 'Verschachtelte Listen (Tabellen, Matrizen)'],
    ['code', 'python', `tabelle = [
    [1, 2, 3],      # Zeile 0
    [4, 5, 6],      # Zeile 1
]
print(tabelle[1][2])          # 6 -> Zeile 1, Spalte 2
for zeile in tabelle:
    for wert in zeile:
        print(wert, end=" ")
    print()`],
    ['h', 'Tupel'],
    ['code', 'python', `punkt = (3, 4)               # Tupel mit runden Klammern
x, y = punkt                 # Entpacken (unpacking)
print(x, y)                  # 3 4
# punkt[0] = 5               # TypeError: Tupel sind unveränderbar

def min_max(werte):
    return min(werte), max(werte)    # mehrere Rückgabewerte = ein Tupel
klein, gross = min_max([4, 9, 1])

a, b = 1, 2
a, b = b, a                  # Werte tauschen ohne Hilfsvariable`],
    ['table', ['', 'Liste', 'Tupel'], [
      ['Schreibweise', '`[1, 2, 3]`', '`(1, 2, 3)`'],
      ['Veränderbar?', 'Ja (append, remove, ...)', 'Nein'],
      ['Einsatz', 'Sammlungen, die wachsen/schrumpfen', 'Feste Gruppen (Koordinate, Datum), Rückgabe mehrerer Werte, Schlüssel im Dictionary'],
    ]],
    ['h', 'Listen in anderen Sprachen'],
    ['codes', [
      ['python', `werte = [3, 1, 2]
werte.append(5)
print(len(werte), werte[0])`],
      ['java', `ArrayList<Integer> werte = new ArrayList<>(List.of(3, 1, 2));
werte.add(5);
System.out.println(werte.size() + " " + werte.get(0));
int[] feld = new int[3];        // Array: feste Länge!`],
      ['csharp', `List<int> werte = new List<int> { 3, 1, 2 };
werte.Add(5);
Console.WriteLine(werte.Count + " " + werte[0]);
int[] feld = new int[3];        // Array: feste Länge`],
    ]],
    ['h', 'Übungen'],
    ['qa', 'Gegeben `zahlen = [5, -3, 8, 0, -1, 7]`. Erzeugen Sie eine neue Liste nur mit den positiven Zahlen und geben Sie deren Anzahl aus.', [['code', 'python', `positiv = []
for z in zahlen:
    if z > 0:
        positiv.append(z)
print(positiv, len(positiv))   # [5, 8, 7] 3`]], 3],
    ['qa', 'Schreiben Sie eine Funktion `zweitgroesste(liste)`, die den zweitgrößten Wert liefert, ohne `sort` zu benutzen.', [['code', 'python', `def zweitgroesste(liste):
    groesste = zweite = float("-inf")
    for x in liste:
        if x > groesste:
            zweite = groesste
            groesste = x
        elif groesste > x > zweite:
            zweite = x
    return zweite

print(zweitgroesste([4, 9, 2, 9, 7]))   # 7`]], 5],
    ['qa', 'Was wird ausgegeben? `a = [1, 2]` / `b = a` / `b[0] = 99` / `print(a)`', ['`[99, 2]`. `b = a` kopiert nur die Referenz, beide Variablen zeigen auf dieselbe Liste.'], 2],
    ['quiz', [
      {q: 'Was liefert [10, 20, 30, 40][1:3]?', o: ['[20, 30]', '[10, 20, 30]', '[20, 30, 40]', '[10, 20]'], a: 0, e: 'Ende exklusiv.'},
      {q: 'Welche Methode fügt ein Element am Ende an?', o: ['append', 'add', 'push', 'insert'], a: 0, e: 'insert braucht eine Position.'},
      {q: 'Was gibt liste.sort() zurück?', o: ['None', 'Die sortierte Liste', 'True', 'Eine Kopie'], a: 0, e: 'Sortiert an Ort und Stelle.'},
      {q: 'Was ist der Hauptunterschied zwischen Liste und Tupel?', o: ['Tupel sind unveränderbar', 'Tupel können nur Zahlen speichern', 'Listen haben keinen Index', 'Tupel sind immer sortiert'], a: 0, e: 'immutable.'},
      {q: 'Was ist l[-1]?', o: ['Das letzte Element', 'Ein Fehler', 'Das erste Element', 'Die Länge'], a: 0, e: 'Negative Indizes zählen von hinten.'},
    ]],
    ['see', ['course-python-05', 'course-python-07', 'eua-listen']],
  ],
});
