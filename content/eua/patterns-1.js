AP2.page('eua-patterns', {
  b: 'eua', g: 'Entwurfsmuster', t: 'Entwurfsmuster: Singleton, Factory, Observer, Strategy',
  d: '**Entwurfsmuster (Design Patterns)** sind **bewährte, wiederverwendbare Lösungsschablonen** für **typische Probleme im Software-Entwurf**. **Singleton:** genau **eine Instanz** einer Klasse. **Factory:** **Objekterzeugung** an einer Stelle kapseln. **Observer:** Objekte werden bei Änderung **automatisch benachrichtigt**. **Strategy:** **austauschbare Algorithmen** hinter einer Schnittstelle.',
  m: '**Singleton = Einzelstück** (z. B. Logger). **Factory = Fabrik** (bestellen, ohne zu wissen, wie gebaut wird). **Observer = Abonnent** (Newsletter: ich werde informiert). **Strategy = Werkzeugkasten** (Algorithmus wechseln wie Navigations-Routenart: Auto, Rad, Fuß).',
  cheat: [
    ['Singleton (Erzeugungsmuster)', ['**Genau eine Instanz**', 'Privater Konstruktor, `static getInstance()`', 'Globaler Zugriffspunkt', 'Beispiel: Logger, Konfiguration, Verbindungspool', 'Nachteil: globaler Zustand, schwer testbar']],
    ['Factory (Erzeugungsmuster)', ['**Zentrale Stelle erzeugt Objekte**', 'Aufrufer kennt nur **Interface**, nicht die konkrete Klasse', 'Neue Typen ohne Änderung des Aufrufers', 'Beispiel: Dokument-, Zahlungs-, Datenbankverbindungs-Erzeugung']],
    ['Observer (Verhaltensmuster)', ['**1 zu n**: Subjekt informiert **Beobachter**', '`attach`, `detach`, `notify`', 'Lose Kopplung', 'Beispiel: Events/Listener in GUI, Börsenkurse, MVC']],
    ['Strategy (Verhaltensmuster)', ['**Algorithmen austauschbar** (Interface)', 'Context hält eine Strategie', 'Ersetzt `if/else`/`switch` über Verfahren', 'Beispiel: Sortier-, Versand-, Rabattberechnung']],
  ],
  blocks: [
    ['h', 'Was sind Entwurfsmuster?'],
    ['p', 'Viele Entwurfsprobleme treten **immer wieder** auf. Erfahrene Entwickler haben dafür **bewährte Lösungen** beschrieben und benannt. Das berühmte Buch **"Design Patterns"** der **Gang of Four (GoF, 1994)** beschreibt 23 Muster. Der Vorteil: eine **gemeinsame Sprache** ("Das lösen wir mit einem Observer") und **erprobte Qualität**. Ein Muster ist **kein fertiger Code**, sondern eine **Vorlage**, die man an den Fall anpasst.'],
    ['table', ['Kategorie', 'Frage', 'Beispiele'], [['**Erzeugungsmuster** (Creational)', 'Wie werden Objekte erzeugt?', 'Singleton, Factory Method, Abstract Factory, Builder, Prototype'], ['**Strukturmuster** (Structural)', 'Wie werden Klassen und Objekte zusammengesetzt?', 'Adapter, Decorator, Facade, Composite, Proxy'], ['**Verhaltensmuster** (Behavioral)', 'Wie arbeiten Objekte zusammen und verteilen Verantwortung?', 'Observer, Strategy, Command, Iterator, State, Template Method']]],
    ['h', 'Singleton'],
    ['p', '**Problem:** Es soll von einer Klasse **genau ein Objekt** geben, auf das **überall** zugegriffen werden kann (zum Beispiel ein Logger, damit alle Meldungen in dieselbe Datei gehen). **Lösung:** Der **Konstruktor ist privat**, die Klasse hält die **einzige Instanz** in einem **statischen Attribut** und gibt sie über `getInstance()` heraus.'],
    ['diagram', {w: 560, h: 200, keep: 440, cap: 'UML des Singleton: privater Konstruktor, statische Instanz, öffentliche getInstance()-Methode.', nodes: [{id: 's', k: 'cls', x: 280, y: 100, w: 330, t: {name: 'Logger', attrs: ['- static instance: Logger'], ops: ['- Logger()', '+ static getInstance(): Logger', '+ log(text: String): void']}, s: 'accent'}], edges: [{a: 's', b: 's', via: [[470, 60], [470, 140]], k: 'dash', t: '1 Instanz', lo: [30, 0]}]}],
    ['codes', [
      ['java', `public class Logger {
    private static Logger instance;                  // die einzige Instanz

    private Logger() { }                             // privat: kein "new Logger()" von außen

    public static synchronized Logger getInstance() {   // synchronized: threadsicher
        if (instance == null) {
            instance = new Logger();                 // erst beim ersten Aufruf erzeugen (Lazy)
        }
        return instance;
    }
    public void log(String text) { System.out.println("[LOG] " + text); }
}

Logger a = Logger.getInstance();
Logger b = Logger.getInstance();
System.out.println(a == b);        // true: dasselbe Objekt`],
      ['csharp', `public sealed class Logger
{
    private static readonly Logger instance = new Logger();   // beim Start erzeugt (threadsicher)
    private Logger() { }
    public static Logger Instance => instance;
    public void Log(string text) => Console.WriteLine("[LOG] " + text);
}`],
      ['python', `class Logger:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    def log(self, text):
        print("[LOG]", text)

a, b = Logger(), Logger()
print(a is b)                       # True`],
    ]],
    ['procon', 'Singleton', ['Garantiert **genau eine** Instanz (gemeinsame Ressource, Konfiguration)', 'Kontrollierter, **globaler Zugriff**', '**Lazy Initialization**: Erzeugung erst bei Bedarf'], ['**Globaler Zustand**: versteckte Abhängigkeiten, schwer zu testen (Mocks)', 'Mit mehreren Threads Vorsicht (Synchronisation), sonst mehrere Instanzen', 'Verletzt die Single Responsibility (Klasse verwaltet sich selbst), oft **Anti-Pattern** bei Missbrauch']],
  ],
});
