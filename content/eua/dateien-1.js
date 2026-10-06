AP2.page('eua-dateien', {
  b: 'eua', g: 'Prüfungspraxis', t: 'Dateien verarbeiten: CSV einlesen, JSON parsen, Gruppenwechsel',
  d: 'In vielen Prüfungen müssen Daten aus einer **Datei** gelesen und in **Objekte** umgewandelt werden: Artikel aus `Artikelpreise.csv` (Sommer 2024), Anfragen aus einer CSV mit beliebig vielen Dachflächen (Winter 2022/23), Messwerte aus `messung.json` (Sommer 2023), Bewertungen mit **Gruppenwechsel** (Sommer 2025). Das Muster ist immer gleich: **Datei öffnen, Kopfzeile überspringen, Zeile für Zeile lesen, mit `split` zerlegen, Typen umwandeln, Objekt erzeugen, in eine Liste einfügen, Datei schließen.**',
  m: '**Öffnen -> Kopf überspringen -> Schleife: lesen, split, umwandeln, Objekt, add -> schließen.** **`strip()`/`Trim()` gegen Zeilenumbrüche und Leerzeichen.** **Zahlen: `float()` / `Double.Parse()`.** **Gruppenwechsel: Merke den alten Schlüssel; ändert er sich, Gruppe abschließen.** **Datensätze sortiert = Voraussetzung für Gruppenwechsel.**',
  cheat: [
    ['Python', ['`with open(p, encoding="utf-8") as f:`', '`next(f)` oder `f.readline()` Kopf weg', '`teile = zeile.strip().split(";")`', '`json.load(f)` -> dict']],
    ['C#', ['`File.ReadAllLines(p)`', '`zeile.Split(\';\')`', '`double.Parse(s, CultureInfo.InvariantCulture)`', '`JsonDocument.Parse(text)`']],
    ['Java', ['`Files.readAllLines(Path.of(p))`', '`zeile.split(";")`', '`Double.parseDouble(s)`', '`new JSONObject(text)`']],
    ['Gruppenwechsel', ['ersten Satz lesen', 'solange nicht Dateiende', 'alt = schluessel, Summe = 0', 'solange gleicher Schlüssel: verarbeiten, lesen']],
  ],
  blocks: [
    ['h', 'Muster 1: CSV in Objekte einlesen (Sommer 2024, 18 Punkte)'],
    ['p', 'Datei `Artikelpreise.csv` (Trennzeichen Semikolon, erste Zeile Kopf). Der Konstruktor von `ArtikelStammDaten` soll alle Artikel in die Liste `alleArtikel` laden, `getEinkaufspreisByBezeichnung` den Preis zu einer Bezeichnung liefern.'],
    ['code', 'text', `Artikelbezeichnung;aktuellerPreis
Rhododendron;19.5
Feuerdorn;5
rote Rosen;2.3`],
    ['codes', [
      ['python', `class ArtikelStammDaten:
    def __init__(self, datei):
        self.__alleArtikel = []
        f = open(datei, "r", encoding="utf-8")
        f.readline()                              # Kopfzeile überspringen
        for zeile in f:
            teile = zeile.strip().split(";")      # "Feuerdorn;5\\n" -> ["Feuerdorn", "5"]
            art = Artikel(teile[0], float(teile[1]))
            self.__alleArtikel.append(art)
        f.close()

    def getAlleArtikel(self):
        return self.__alleArtikel

    def getEinkaufspreisByBezeichnung(self, bezeichnung):
        for art in self.__alleArtikel:            # lineare Suche
            if art.getBezeichnung() == bezeichnung:
                return art.getEinkaufspreis()
        return None                               # nicht gefunden`],
      ['csharp', `class ArtikelStammDaten
{
    private List<Artikel> alleArtikel = new List<Artikel>();

    public ArtikelStammDaten(string datei)
    {
        string[] zeilen = File.ReadAllLines(datei);
        for (int i = 1; i < zeilen.Length; i++)          // i = 1: Kopfzeile überspringen
        {
            string[] teile = zeilen[i].Trim().Split(';');
            double preis = double.Parse(teile[1], CultureInfo.InvariantCulture);  // Punkt als Dezimaltrenner
            alleArtikel.Add(new Artikel(teile[0], preis));
        }
    }

    public double getEinkaufspreisByBezeichnung(string bezeichnung)
    {
        foreach (Artikel a in alleArtikel)
            if (a.getBezeichnung() == bezeichnung)
                return a.getEinkaufspreis();
        return -1;                                     // Kennzeichen für "nicht gefunden"
    }
}`],
      ['java', `public class ArtikelStammDaten {
    private ArrayList<Artikel> alleArtikel = new ArrayList<>();

    public ArtikelStammDaten(String datei) throws IOException {
        List<String> zeilen = Files.readAllLines(Path.of(datei));
        for (int i = 1; i < zeilen.size(); i++) {
            String[] teile = zeilen.get(i).trim().split(";");
            alleArtikel.add(new Artikel(teile[0], Double.parseDouble(teile[1])));
        }
    }

    public double getEinkaufspreisByBezeichnung(String bezeichnung) {
        for (Artikel a : alleArtikel)
            if (a.getBezeichnung().equals(bezeichnung))   // Strings mit equals vergleichen!
                return a.getEinkaufspreis();
        return -1;
    }
}`],
    ]],
    ['warn', 'Drei Klassiker: (1) Kopfzeile nicht übersprungen -> `float("aktuellerPreis")` wirft einen Fehler. (2) Zeilenumbruch `\\n` am Ende nicht entfernt -> der letzte Wert ist `"5\\n"`. (3) In **Java** Strings mit `==` statt `equals()` verglichen. In C# funktioniert `==` bei Strings korrekt.'],
    ['h', 'Muster 2: Rechnung aus mehreren Stammdaten erzeugen (Sommer 2024, 18 Punkte)'],
    ['code', 'python', `asd = ArtikelStammDaten("Artikelpreise.csv")
bsd = BestellungStammDaten("Bestelldaten.csv", "03.05.2023")
fsd = FilialStammDaten("Filialdaten.csv")

name = "Strauch GmbH"
print(fsd.getFilialeByFilialName(name).getAdresse())   # Kopf der Rechnung

print("Nr\\tBezeichnung\\tAnzahl\\tEinzelpreis\\tGesamtpreis")
nr = 0
summe = 0.0
for pos in bsd.getAlleBestposByFilialName(name):
    nr += 1
    einzel = asd.getEinkaufspreisByBezeichnung(pos.getBezeichnung())
    gesamt = einzel * pos.getAnzahl()
    summe += gesamt
    print(nr, pos.getBezeichnung(), pos.getAnzahl(), einzel, gesamt, sep="\\t")
print("Gesamtpreis:", summe)`],
    ['h', 'Muster 3: Variable Spaltenzahl (Winter 2022/23, 20 Punkte)'],
    ['p', 'Eine CSV-Anfrage hat feste Felder (Nummer, kWp, Speicher, eventuell leer) und danach **beliebig viele** Dachflächen, jede als `Bezeichnung,Länge,Breite`. Trick: zuerst mit `;` zerlegen, die ersten drei Felder fest auswerten, ab Index 3 jedes Feld nochmals mit `,` zerlegen.'],
    ['code', 'text', `Nummer;kWpPV;kWhSpeicher;Fläche;Fläche
1;10;5;West,10.5,4.5;Ost,7.2,3.4;`],
    ['codes', [
      ['csharp', `class CsvAnfrage : Anfrage
{
    public CsvAnfrage(string pfad)
    {
        string zeile = File.ReadAllLines(pfad)[1];              // Zeile 0 = Kopf
        string[] felder = zeile.TrimEnd(';').Split(';');         // letztes ; entfernen
        anfrageNr = int.Parse(felder[0]);
        pvLeistung = double.Parse(felder[1], CultureInfo.InvariantCulture);
        speicherKapazitaet = felder[2].Trim() == "" ? 0
            : double.Parse(felder[2], CultureInfo.InvariantCulture);

        dachFlaechen = new Flaeche[felder.Length - 3];
        for (int i = 3; i < felder.Length; i++)
        {
            string[] t = felder[i].Split(',');
            dachFlaechen[i - 3] = new Flaeche(t[0],                // Index verschieben!
                double.Parse(t[1], CultureInfo.InvariantCulture),
                double.Parse(t[2], CultureInfo.InvariantCulture));
        }
    }
}`],
      ['python', `class CsvAnfrage(Anfrage):
    def __init__(self, pfad):
        with open(pfad, encoding="utf-8") as f:
            f.readline()
            felder = f.readline().strip().rstrip(";").split(";")
        self._anfrageNr = int(felder[0])
        self._pvLeistung = float(felder[1])
        self._speicherKapazitaet = float(felder[2]) if felder[2].strip() else 0.0
        self._dachFlaechen = []
        for feld in felder[3:]:                 # alle restlichen Felder
            bez, laenge, breite = feld.split(",")
            self._dachFlaechen.append(Flaeche(bez, float(laenge), float(breite)))`],
    ]],
    ['note', 'Die offizielle Lösung schreibt `flaechen[i] = ...` mit i ab 3 in ein Array der Länge `felder.Length - 3`. Das führt zu einer **IndexOutOfRangeException**; richtig ist `flaechen[i - 3]`. Solche Indexverschiebungen sind beliebte Fehlerquellen.'],
    ['h', 'Muster 4: JSON-Datei auswerten (Sommer 2023, 20 Punkte)'],
    ['code', 'text', `{ "Sensor1": {"Nummer": 1, "Zeit": "2022-10-26T16:23:14", "Temperatur": 2, "Feuchtigkeit": 80},
  "Sensor2": {"Nummer": 2, "Temperatur": 3, ...}, "Sensor3": {...}, "Sensor4": {...} }`],
    ['codes', [
      ['python', `import json

def temp_wert(schwelle):
    with open("messung.json", "r", encoding="utf-8") as f:
        daten = json.load(f)                       # dict von dicts
    temp = [daten["Sensor" + str(i)]["Temperatur"] for i in range(1, 5)]
    mittel = sum(temp) / 4
    abweichung = 0
    for t in temp:                                 # größte absolute Abweichung
        if abs(mittel - t) > abweichung:
            abweichung = abs(mittel - t)
    rueck = int(mittel) * 2
    if abweichung > schwelle:
        rueck += 1
    return rueck`],
      ['csharp', `static int TempWert(double schwelle)
{
    string inhalt = File.ReadAllText("messung.json");
    using JsonDocument doc = JsonDocument.Parse(inhalt);
    double[] temp = new double[4];
    for (int i = 0; i < 4; i++)
        temp[i] = doc.RootElement.GetProperty("Sensor" + (i + 1))
                                 .GetProperty("Temperatur").GetDouble();
    double mittel = temp.Average();
    double abweichung = 0;
    foreach (double t in temp)
        abweichung = Math.Max(abweichung, Math.Abs(mittel - t));
    int rueck = (int)mittel * 2;
    if (abweichung > schwelle) rueck++;
    return rueck;
}`],
    ]],
    ['h', 'Muster 5: Gruppenwechsel (Sommer 2025, 15 Punkte)'],
    ['p', 'Ein **Gruppenwechsel** verarbeitet eine **nach einem Schlüssel sortierte** Datei und fasst alle Datensätze mit gleichem Schlüssel zusammen (Summe, Durchschnitt, Anzahl). Sobald sich der Schlüssel ändert, wird die Gruppe **abgeschlossen** (Ergebnis ausgeben oder speichern) und die nächste begonnen.'],
    ['code', 'text', `TG_ID,Bezeichnung,Schulnote,Kommentar
1,"Hähnchenbrust mit Gemüse",1,"Sehr lecker!"
1,"Hähnchenbrust mit Gemüse",2,"Immer wieder gerne."
2,"Vegetarische Lasagne",3,""
5,"Gemüsecurry mit Reis",3,"Etwas zu würzig."
5,"Gemüsecurry mit Reis",2,"Gut, aber etwas zu scharf."`],
    ['diagram', AP2.dg.nsd([
      ['act', 'Datei "Bewertungen" öffnen, Kopfdaten lesen, ersten Datensatz lesen'],
      ['while', 'solange Dateiende nicht erreicht', [
        ['act', 'tgAlt = TG_ID;  summe = 0;  anzahl = 0'],
        ['while', 'solange nicht Dateiende und TG_ID == tgAlt', [
          ['act', 'summe = summe + Schulnote;  anzahl = anzahl + 1'],
          ['act', 'nächsten Datensatz lesen'],
        ]],
        ['act', 'durchschnitt[tgAlt - 1] = summe / anzahl   // Gruppe abschließen'],
      ]],
      ['act', 'Datei schließen'],
    ], {w: 560, cap: 'Gruppenwechsel: Die äußere Schleife läuft über die Gruppen, die innere über die Datensätze einer Gruppe.'})],
    ['p', 'Danach sucht man im Array das **Minimum** (beste Schulnote) und gibt anschließend in einem **zweiten Durchlauf** durch die Datei alle Kommentare dieses Gerichts aus:'],
    ['codes', [
      ['python', `import csv

durchschnitt = {}
with open("Bewertungen.csv", encoding="utf-8") as f:
    zeilen = list(csv.DictReader(f, skipinitialspace=True))   # beachtet "..." mit Kommas

i = 0
while i < len(zeilen):                        # Gruppenwechsel
    tg_alt = zeilen[i]["TG_ID"]
    summe, anzahl = 0, 0
    while i < len(zeilen) and zeilen[i]["TG_ID"] == tg_alt:
        summe += int(zeilen[i]["Schulnote"])
        anzahl += 1
        i += 1
    durchschnitt[tg_alt] = summe / anzahl

best_id = min(durchschnitt, key=durchschnitt.get)   # kleinste Note = beste
name = next(z["Bezeichnung"] for z in zeilen if z["TG_ID"] == best_id)
print(name, durchschnitt[best_id])
for z in zeilen:                              # zweiter Durchlauf: Kommentare
    if z["TG_ID"] == best_id and z["Kommentar"] != "":
        print("-", z["Kommentar"])`],
      ['pseudo', `best = 7          // außerhalb der Notenskala
bestNr = -1
FÜR i = 0 BIS laenge(durchschnitt) - 1
    WENN durchschnitt[i] < best DANN
        best = durchschnitt[i]
        bestNr = i + 1          // Index = TG_ID - 1
    ENDE WENN
ENDE FÜR
AUSGABE Bezeichnung zu bestNr, best
Datei erneut öffnen, Kopf lesen, Datensatz lesen
SOLANGE nicht Dateiende
    WENN TG_ID = bestNr UND Kommentar <> "" DANN AUSGABE Kommentar
    Datensatz lesen
ENDE SOLANGE`],
    ]],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Eine Datei `umsatz.csv` enthält `Monat;Filiale;Betrag` (sortiert nach Filiale). Schreiben Sie ein Programm, das je Filiale die Summe der Beträge ausgibt.', [['code', 'python', `with open("umsatz.csv", encoding="utf-8") as f:
    f.readline()
    zeilen = [z.strip().split(";") for z in f if z.strip()]

i = 0
while i < len(zeilen):
    filiale = zeilen[i][1]
    summe = 0.0
    while i < len(zeilen) and zeilen[i][1] == filiale:
        summe += float(zeilen[i][2])
        i += 1
    print(filiale, round(summe, 2))`], 'Alternative ohne Sortierung: ein Dictionary `summen[filiale] = summen.get(filiale, 0) + betrag`.'], 6],
    ['qa', 'Nennen Sie drei Fehlerquellen beim Einlesen von CSV-Dateien und wie man sie abfängt.', ['- **Kopfzeile** wird als Datensatz behandelt -> erste Zeile überspringen.', '- **Dezimaltrennzeichen** (Komma vs. Punkt) -> Kultur beim Parsen festlegen oder ersetzen.', '- **Leere oder fehlerhafte Zeilen**, fehlende Felder -> Zeile prüfen (Länge des Arrays), Ausnahmen (`ValueError`, `FormatException`) mit try/catch abfangen.', '- **Trennzeichen im Text** ("Hähnchen, Reis") -> CSV-Bibliothek verwenden, die Anführungszeichen beachtet.', '- **Zeichenkodierung** (Umlaute) -> UTF-8 angeben.'], 3],
    ['quiz', [
      {q: 'Was liefert "Feuerdorn;5\\n".strip().split(";")?', o: ['["Feuerdorn", "5"]', '["Feuerdorn;5"]', '["Feuerdorn", "5\\n"]', '"Feuerdorn"'], a: 0, e: 'strip entfernt den Zeilenumbruch, split zerlegt.'},
      {q: 'Welche Voraussetzung hat ein Gruppenwechsel?', o: ['Die Daten sind nach dem Gruppierungsschlüssel sortiert', 'Die Datei ist JSON', 'Es gibt nur eine Gruppe', 'Die Datei hat keine Kopfzeile'], a: 0, e: 'Sonst würde eine Gruppe mehrfach abgeschlossen.'},
      {q: 'Wie vergleicht man in Java zwei Strings auf gleichen Inhalt?', o: ['a.equals(b)', 'a == b', 'a.compare(b)', 'a = b'], a: 0, e: '== vergleicht die Referenzen.'},
      {q: 'Was macht json.load(f) in Python?', o: ['Wandelt den JSON-Inhalt der Datei in dicts und lists um', 'Speichert ein dict als JSON', 'Prüft nur die Syntax', 'Öffnet die Datei'], a: 0, e: 'json.dump schreibt.'},
    ]],
    ['see', ['eua-formate', 'eua-algoexam', 'eua-exceptions']],
  ],
});
