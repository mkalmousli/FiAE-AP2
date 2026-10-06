AP2.page('course-python-11', {
  b: 'course', g: 'Python', t: 'Python 11: Dateien lesen und schreiben (Text, CSV, JSON)',
  d: 'Programme speichern Daten dauerhaft in **Dateien**. Mit `open(pfad, modus, encoding="utf-8")` öffnet man eine Datei: `"r"` lesen, `"w"` schreiben (überschreibt!), `"a"` anhängen. Die **with-Anweisung** (Kontextmanager) schließt die Datei automatisch, auch bei Fehlern. Für Tabellen gibt es das Modul `csv`, für strukturierte Daten `json`. Dateiverarbeitung ist ein Dauerbrenner der Prüfung: CSV einlesen, Objekte bauen, auswerten, Ergebnis ausgeben.',
  m: '**Immer `with open(...) as f:` und `encoding="utf-8"`.** **"w" löscht den alten Inhalt!** **Zeilen haben am Ende `\\n` -> `strip()`.** **CSV: `csv.reader(f, delimiter=";")`, Kopfzeile mit `next(reader)` überspringen.** **JSON: `json.load(f)` liest, `json.dump(obj, f)` schreibt.**',
  cheat: [
    ['Modi', ['`"r"` lesen (Standard)', '`"w"` schreiben, überschreibt', '`"a"` anhängen', '`"rb"`/`"wb"` binär']],
    ['Lesen', ['`f.read()` alles als String', '`f.readline()` eine Zeile', '`f.readlines()` Liste von Zeilen', '`for zeile in f:` zeilenweise']],
    ['Schreiben', ['`f.write("Text\\n")`', '`print(x, file=f)`', '`f.writelines(liste)`', 'Zeilenumbruch selbst setzen']],
    ['Module', ['`csv.reader`, `csv.writer`, `csv.DictReader`', '`json.load`, `json.dump`', '`os.path.exists(p)`', '`pathlib.Path(p).read_text()`']],
  ],
  blocks: [
    ['h', 'Textdateien lesen'],
    ['code', 'python', `with open("notizen.txt", "r", encoding="utf-8") as f:   # f = Dateiobjekt
    for nummer, zeile in enumerate(f, start=1):
        print(nummer, zeile.strip())       # strip() entfernt \\n und Leerzeichen
# hier ist die Datei automatisch geschlossen`],
    ['note', 'Ohne `with` müsste man `f.close()` selbst aufrufen, und bei einer Exception dazwischen bliebe die Datei offen. `with` entspricht `try ... finally: f.close()`. In C# heißt das Gegenstück `using`, in Java "try-with-resources".'],
    ['h', 'Textdateien schreiben'],
    ['code', 'python', `zeilen = ["Erste Zeile", "Zweite Zeile"]
with open("ausgabe.txt", "w", encoding="utf-8") as f:   # "w": neue Datei bzw. überschreiben
    for z in zeilen:
        f.write(z + "\\n")                                 # Zeilenumbruch nicht vergessen

with open("log.txt", "a", encoding="utf-8") as f:       # "a": hinten anhängen
    print("Programm gestartet", file=f)`],
    ['h', 'CSV-Dateien verarbeiten'],
    ['code', 'text', `Artikelbezeichnung;aktuellerPreis
Rhododendron;19.5
Feuerdorn;5
rote Rosen;2.3`],
    ['codes', [
      ['python', `import csv

preise = {}
with open("Artikelpreise.csv", encoding="utf-8", newline="") as f:
    leser = csv.reader(f, delimiter=";")
    next(leser)                        # Kopfzeile überspringen
    for zeile in leser:                # zeile ist eine Liste: ["Feuerdorn", "5"]
        bezeichnung, preis = zeile
        preise[bezeichnung] = float(preis)
print(preise["Feuerdorn"])            # 5.0`],
      ['python', `# Ohne csv-Modul (so steht es oft in Prüfungslösungen)
preise = {}
f = open("Artikelpreise.csv", "r", encoding="utf-8")
f.readline()                           # Kopfzeile
for zeile in f:
    teile = zeile.strip().split(";")
    preise[teile[0]] = float(teile[1])
f.close()`],
      ['python', `# DictReader: Zugriff über Spaltennamen
with open("Artikelpreise.csv", encoding="utf-8", newline="") as f:
    for zeile in csv.DictReader(f, delimiter=";"):
        print(zeile["Artikelbezeichnung"], zeile["aktuellerPreis"])`],
    ]],
    ['tip', 'Das **csv-Modul** beachtet Anführungszeichen: `1,"Hähnchen, mit Reis",2` wird korrekt in drei Felder zerlegt. Ein einfaches `split(",")` würde es in vier Teile zerreißen.'],
    ['h3', 'CSV schreiben'],
    ['code', 'python', `rechnung = [("Feuerdorn", 10, 5.0), ("rote Rosen", 10, 2.3)]
with open("rechnung.csv", "w", encoding="utf-8", newline="") as f:
    schreiber = csv.writer(f, delimiter=";")
    schreiber.writerow(["Bezeichnung", "Anzahl", "Einzelpreis", "Gesamt"])
    for bez, anz, preis in rechnung:
        schreiber.writerow([bez, anz, preis, round(anz * preis, 2)])`],
    ['h', 'JSON lesen und schreiben'],
    ['code', 'python', `import json

with open("messung.json", "r", encoding="utf-8") as f:
    daten = json.load(f)                       # -> dict / list
temps = [daten[f"Sensor{i}"]["Temperatur"] for i in range(1, 5)]
print(sum(temps) / len(temps))

ergebnis = {"mittelwert": sum(temps) / 4, "werte": temps, "ok": True}
with open("ergebnis.json", "w", encoding="utf-8") as f:
    json.dump(ergebnis, f, ensure_ascii=False, indent=2)   # schön formatiert, Umlaute erhalten`],
    ['table', ['JSON', 'Python'], [
      ['Objekt `{ }`', '`dict`'],
      ['Array `[ ]`', '`list`'],
      ['String `"..."`', '`str`'],
      ['Zahl `42`, `4.2`', '`int`, `float`'],
      ['`true` / `false` / `null`', '`True` / `False` / `None`'],
    ]],
    ['h', 'Fehler beim Dateizugriff behandeln'],
    ['code', 'python', `try:
    with open("fehlt.csv", encoding="utf-8") as f:
        inhalt = f.read()
except FileNotFoundError:
    print("Datei nicht gefunden.")
except PermissionError:
    print("Keine Berechtigung.")
except UnicodeDecodeError:
    print("Falsche Zeichenkodierung, eventuell encoding='latin-1' probieren.")`],
    ['h', 'Komplettes Beispiel: Rechnung aus zwei CSV-Dateien'],
    ['code', 'python', `import csv

def lade_preise(pfad):
    with open(pfad, encoding="utf-8", newline="") as f:
        r = csv.reader(f, delimiter=";")
        next(r)
        return {bez.strip(): float(preis) for bez, preis in r}

def bestellungen_von(pfad, filiale):
    with open(pfad, encoding="utf-8", newline="") as f:
        r = csv.reader(f, delimiter=";")
        next(r)
        return [(art.strip(), int(anz)) for fil, art, anz in r if fil.strip() == filiale]

preise = lade_preise("Artikelpreise.csv")
summe = 0.0
for nr, (artikel, anzahl) in enumerate(bestellungen_von("Bestelldaten.csv", "Strauch GmbH"), 1):
    einzel = preise.get(artikel, 0.0)
    summe += einzel * anzahl
    print(f"{nr:<3}{artikel:<15}{anzahl:>6}{einzel:>10.2f}{einzel * anzahl:>10.2f}")
print(f"Gesamtpreis: {summe:.2f}")`],
    ['h', 'Übungen'],
    ['qa', 'Eine Datei `namen.txt` enthält einen Namen pro Zeile. Schreiben Sie alle Namen, die mit "A" beginnen, alphabetisch sortiert in `a_namen.txt`.', [['code', 'python', `with open("namen.txt", encoding="utf-8") as f:
    namen = [z.strip() for z in f if z.strip().startswith("A")]
with open("a_namen.txt", "w", encoding="utf-8") as f:
    for n in sorted(namen):
        f.write(n + "\\n")`]], 4],
    ['qa', 'Was ist der Unterschied zwischen den Modi "w" und "a"?', ['`"w"` (write) legt die Datei neu an oder **löscht** den bisherigen Inhalt und schreibt von vorn.', '`"a"` (append) hängt neue Daten **hinten an** den vorhandenen Inhalt an; existiert die Datei nicht, wird sie angelegt.'], 2],
    ['quiz', [
      {q: 'Warum verwendet man with open(...)?', o: ['Die Datei wird automatisch geschlossen, auch bei Fehlern', 'Damit die Datei schneller gelesen wird', 'Weil open ohne with nicht funktioniert', 'Um Dateien zu verschlüsseln'], a: 0, e: 'Kontextmanager.'},
      {q: 'Welcher Modus überschreibt eine vorhandene Datei?', o: ['"w"', '"a"', '"r"', '"x"'], a: 0, e: '"x" schlägt fehl, wenn die Datei existiert.'},
      {q: 'Wie überspringt man beim csv.reader die Kopfzeile?', o: ['next(reader)', 'reader.skip()', 'reader[1:]', 'del reader[0]'], a: 0, e: 'Der Reader ist ein Iterator.'},
      {q: 'Was wird aus JSON null in Python?', o: ['None', 'null', '0', '""'], a: 0, e: 'true/false -> True/False.'},
    ]],
    ['see', ['course-python-10', 'course-python-12', 'eua-dateien', 'eua-formate']],
  ],
});
