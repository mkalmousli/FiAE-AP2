AP2.add('eua-patterns', [
  ['h', 'Entwurfsmuster in den Abschlussprüfungen'],
  ['p', 'Entwurfsmuster kamen in Sommer 2022 (Factory), Sommer 2023 (Observer für eine Warteliste) und Winter 2025/26 (Observer und Singleton, 32 Punkte) vor. Gefragt wird: **Muster erkennen und begründen**, **Eigenschaften mit Bezug auf das Klassendiagramm erläutern**, **Vor- und Nachteile** nennen und **eine Klasse implementieren**.'],
  ['h3', 'Observer: Drei Arten der Benachrichtigung (Winter 2025/26)'],
  ['table', ['Art', 'Ablauf', 'Bewertung'], [
    ['**Push Notification**', 'Das Subjekt teilt allen Observern nur mit, **dass** neue Daten vorhanden sind. Jeder Observer holt sich die Daten dann selbst (zum Beispiel über einen Getter).', 'Observer entscheidet, ob und welche Daten er holt; zusätzlicher Aufruf nötig.'],
    ['**Push-Update Notification**', 'Das Subjekt benachrichtigt die Observer und **übergibt die Daten gleich mit** (zum Beispiel `aktualisieren(ergebnis)`).', 'Ein Aufruf genügt; Subjekt muss wissen, welche Daten die Observer brauchen.'],
    ['**Pull Notification**', 'Es gibt **keine** Benachrichtigung. Die Observer fragen **zyklisch** nach (Polling) und prüfen auf Änderungen.', 'Einfach, aber unnötige Abfragen und Verzögerung bis zur nächsten Abfrage.'],
  ]],
  ['p', 'Im Prüfungsbeispiel durchsucht `SarsCov2Analyse.benachrichtigen(personenID, ergebnis)` die Personenliste und ruft beim passenden Patienten `aktualisieren(ergebnis)` auf. Weil das **Ergebnis direkt mitgegeben** wird, ist es eine **Push-Update Notification**.'],
  ['h3', 'Observer mit Bezug auf das Klassendiagramm erläutern (10 Punkte)'],
  ['list', [
    '**Rollen:** Die **Patienten** sind die **Beobachter (Observer)**, `SarsCov2Analyse` ist das **Subjekt** (Erzeuger der Information).',
    '**Registrieren/Abmelden:** Über die öffentlichen Methoden `hinzufuegen(...)` und `entfernen(...)` der Oberklasse `LaborAnalyse` tragen sich Patienten in die `personenListe` ein (`sarsCov2TestAbgeben()` fügt sich selbst hinzu) und werden wieder entfernt.',
    '**Benachrichtigen:** Liegt ein Ergebnis vor, sucht das Subjekt den passenden Patienten in der Liste und ruft dessen `aktualisieren(...)` auf.',
    '**Reaktion:** Der Patient speichert das Ergebnis, zeigt es an und meldet sich anschließend selbst ab.',
    '**Lose Kopplung:** Das Subjekt kennt die Beobachter nur über die gemeinsame Schnittstelle (Oberklasse `Person`), nicht ihre konkrete Klasse.',
  ]],
  ['h3', 'Singleton implementieren (Winter 2025/26, 13 Punkte)'],
  ['codes', [
    ['java', `public class SarsCov2Analyse extends LaborAnalyse {
    private static SarsCov2Analyse instanz = new SarsCov2Analyse();   // die einzige Instanz

    private SarsCov2Analyse() { }               // privat: kein "new" von außen

    public static SarsCov2Analyse gibInstanz() {
        return instanz;
    }

    public void benachrichtigen(int personenID, int ergebnis) {
        for (Person p : gibPersonenListe()) {
            if (p.getPersonenID() == personenID) {
                p.aktualisieren(ergebnis);   // Push-Update: Daten werden mitgegeben
                break;                       // wichtig: aktualisieren entfernt p aus der Liste!
            }
        }
    }
}

public class Patient extends Person {
    private int laborErgebnis;

    public Patient(int personenID) { super(personenID); }

    public void testErgebnisAnzeigen() {
        if (laborErgebnis == 0)      System.out.println("Testergebnis negativ");
        else if (laborErgebnis == 1) System.out.println("Testergebnis positiv");
        else                         System.out.println("Kein Testergebnis möglich");
    }

    public void sarsCov2TestAbgeben() {
        SarsCov2Analyse.gibInstanz().hinzufuegen(this);
    }

    public void aktualisieren(int ergebnis) {
        laborErgebnis = ergebnis;
        testErgebnisAnzeigen();
        SarsCov2Analyse.gibInstanz().entfernen(this);
    }
}`],
    ['csharp', `public class SarsCov2Analyse : LaborAnalyse
{
    private static SarsCov2Analyse instanz;          // Lazy: erst bei Bedarf erzeugen
    private static readonly object sperre = new object();

    private SarsCov2Analyse() { }

    public static SarsCov2Analyse gibInstanz()
    {
        lock (sperre)                                // threadsicher
        {
            if (instanz == null) instanz = new SarsCov2Analyse();
            return instanz;
        }
    }

    public void benachrichtigen(int personenID, int ergebnis)
    {
        Person treffer = gibPersonenListe().Find(p => p.getPersonenID() == personenID);
        if (treffer != null) treffer.aktualisieren(ergebnis);
    }
}`],
  ]],
  ['warn', 'Falle aus der offiziellen Lösung: `aktualisieren` entfernt den Patienten **aus genau der Liste**, über die `benachrichtigen` gerade iteriert. In Java wirft eine for-each-Schleife dann eine `ConcurrentModificationException`, in C# eine `InvalidOperationException`. Abhilfe: nach dem Treffer **abbrechen** (`break`) oder erst suchen, dann außerhalb der Schleife aufrufen.'],
  ['h3', 'Vor- und Nachteile des Singletons (4 Punkte)'],
  ['procon', 'Singleton', ['Garantiert **genau eine** Instanz, zum Beispiel für eine gemeinsame Ressource (Analysegerät, Konfiguration, Logger); verhindert widersprüchliche Zustände', 'Globaler Zugriffspunkt, einfach zu implementieren', 'Lazy Initialization: Objekt erst bei Bedarf erzeugen'], ['Versteckte Abhängigkeiten: Klassen greifen global zu, statt Objekte übergeben zu bekommen', 'Schwer testbar (kein Austausch durch Mock-Objekt, Zustand bleibt zwischen Tests erhalten)', 'Bei Multithreading Synchronisation nötig', 'Verwaltet seinen Lebenszyklus selbst, schwer extern zu beenden']],
  ['h3', 'Factory erkennen und erweitern (Sommer 2022, 5 + 8 Punkte)'],
  ['p', 'Die Klasse `Import` hat eine Methode `CreateServiceObj(datapath)`, die abhängig von der Dateiendung ein Objekt einer Klasse erzeugt, die das Interface `ImportService` implementiert (`Manufacturer1Import`, `Manufacturer2Import`). Der Aufrufer (ImportController) arbeitet nur mit dem Interface und muss den **Klassennamen nicht kennen**. Das ist das **Factory-Pattern**.'],
  ['code', 'csharp', `interface ImportService
{
    string GetDataPath();
    void Read();
    DateTime GetTraceStartTime();
    string GetDriveName();
    string[] GetAvailableValueTypes();
    DataPoint[] GetData(string valueType);
}

static class Import
{
    private static string DetectManufacturer(string datapath)
    {
        string retVal = "unknown";
        if (datapath.EndsWith(".ext1")) retVal = "manu1";
        else if (datapath.EndsWith(".ext2")) retVal = "manu2";
        return retVal;
    }

    public static ImportService CreateServiceObj(string datapath)
    {
        switch (DetectManufacturer(datapath))
        {
            case "manu1": return new Manufacturer1Import(datapath);   // CSV-Format
            case "manu2": return new Manufacturer2Import(datapath);   // XML-Format
            default: throw new NotSupportedException("Unbekanntes Format");
        }
    }
}`],
  ['p', '**Vorteil bei einem neuen Hersteller:** Der übrige Code (Controller, Oberfläche) bleibt unverändert, weil er nur das Interface kennt. **Anpassungen:** neue Klasse `Manufacturer3Import : ImportService` schreiben, `DetectManufacturer` um die neue Endung erweitern und in `CreateServiceObj` einen neuen `case` ergänzen. (Noch flexibler: Registrierung der Klassen in einem Dictionary, dann muss die Factory selbst nicht geändert werden, Open-Closed-Prinzip.)'],
  ['h3', 'Observer für eine Warteliste (Sommer 2023, 3 + 8 Punkte)'],
  ['p', 'Wenn eine Fortbildung ausgebucht ist, können sich Teilnehmer auf eine Warteliste setzen; wird ein Platz frei, werden alle informiert. Das ist **Observer** (auch Publish/Subscribe): Teilnehmer sind Beobachter, die Fortbildung ist das Subjekt.'],
  ['diagram', {w: 640, h: 260, keep: 480, cap: 'Observer-Lösung: Fortbildung erbt von Subjekt (alternativ Assoziation), Teilnehmer implementiert das Interface Beobachter (gestrichelt).', nodes: [
    {id: 's', k: 'cls', x: 150, y: 70, w: 250, t: {name: 'Subjekt', attrs: ['- beobachter: List<Beobachter>'], ops: ['+ anmelden(b: Beobachter): void', '+ abmelden(b: Beobachter): void', '+ benachrichtigen(): void']}},
    {id: 'i', k: 'cls', x: 490, y: 60, w: 220, s: 'accent', t: {name: ['<<interface>>', 'Beobachter'], ops: ['+ aktualisieren(): void']}},
    {id: 'f', k: 'cls', x: 150, y: 215, w: 160, t: {name: 'Fortbildung', attrs: ['- teilnehmerliste']}},
    {id: 't', k: 'cls', x: 490, y: 215, w: 160, t: {name: 'Teilnehmer', attrs: ['- email']}},
  ], edges: [{a: 's', b: 'i', t: '0..*'}, {a: 'f', b: 's', t: 'erbt'}, {a: 't', b: 'i', t: 'implementiert', k: 'dash'}]}],
  ['qa', 'Erläutern Sie einen Vorteil und einen Nachteil des Singleton-Patterns.', ['Vorteil: Es gibt garantiert **nur eine Instanz**; mehrere Programmteile greifen auf **dieselbe Ressource** zu, Race Conditions durch konkurrierende Instanzen werden vermieden; die Implementierung ist einfach, die Instanz kann bei Bedarf erst zur Laufzeit erzeugt werden.', 'Nachteil: **Schwer testbar** und verbirgt Abhängigkeiten; bei Multithreading muss der Zugriff synchronisiert werden.'], 4],
  ['qa', 'Begründen Sie, auf welche Art (Push, Push-Update, Pull) die Benachrichtigungen verteilt werden, wenn das Subjekt `observer.aktualisieren(ergebnis)` aufruft.', ['Es handelt sich um eine **Push-Update Notification**: Das Subjekt informiert den Beobachter aktiv **und** übergibt die neuen Daten (das Ergebnis) direkt als Parameter. Der Beobachter muss die Daten nicht selbst abrufen.'], 5],
]);
