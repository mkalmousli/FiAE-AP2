AP2.add('eua-interface', [
  ['h', 'Abstrakte Klasse im Beispiel'],
  ['p', 'Eine abstrakte Klasse bietet **gemeinsamen Code** und lässt nur einzelne Teile offen. Beispiel: Alle Mitarbeiter haben einen Namen und ein Grundgehalt, aber die **Gehaltsberechnung** unterscheidet sich.'],
  ['code', 'java', `abstract class Mitarbeiter {
    protected String name;
    protected double grundgehalt;
    Mitarbeiter(String name, double g) { this.name = name; this.grundgehalt = g; }

    abstract double gehalt();                       // muss jede Unterklasse umsetzen
    void drucke() { System.out.println(name + ": " + gehalt()); }   // gemeinsamer Code
}
class Angestellter extends Mitarbeiter {
    Angestellter(String n, double g) { super(n, g); }
    double gehalt() { return grundgehalt; }
}
class Manager extends Mitarbeiter {
    double bonus;
    Manager(String n, double g, double bonus) { super(n, g); this.bonus = bonus; }
    double gehalt() { return grundgehalt + bonus; }
}`],
  ['h', 'Vergleich'],
  ['table', ['Merkmal', 'Interface', 'Abstrakte Klasse'], [
    ['Zweck', 'Beschreibt **Fähigkeiten / Vertrag** ("kann etwas")', 'Gemeinsame **Basis** ("ist eine Art von")'],
    ['Methoden', 'Nur Köpfe (Java 8+: auch `default` und `static`)', 'Abstrakte **und** konkrete Methoden'],
    ['Attribute', 'Nur Konstanten (public static final)', 'Beliebige Attribute (auch Zustand)'],
    ['Konstruktor', 'Nein', 'Ja (wird von Unterklassen aufgerufen)'],
    ['Vererbung', 'Eine Klasse kann **mehrere** Interfaces implementieren', 'Eine Klasse kann nur **eine** Oberklasse erweitern'],
    ['Instanziierung', 'Nicht möglich', 'Nicht möglich'],
    ['Zugriffsrechte der Member', 'Methoden immer öffentlich', 'Beliebig (private, protected, public)'],
    ['Typische Beispiele', '`Comparable`, `Runnable`, `Serializable`, `List`', '`InputStream`, Basisklasse für Fahrzeuge, Formen, Mitarbeiter'],
  ]],
  ['procon', 'Wann nutze ich was?', ['**Interface:** unabhängige Klassen sollen dieselbe Fähigkeit bekommen (Sortierbar, Druckbar)', '**Interface:** mehrere Verträge kombinierbar, lockere Kopplung, gut testbar (Mocks)', '**Abstrakte Klasse:** viel gemeinsamer Code und Zustand soll geteilt werden', '**Abstrakte Klasse:** Template-Methode (Grundablauf vorgeben, Details offen lassen)'], ['**Interface:** kein gemeinsamer Code (außer default-Methoden)', '**Abstrakte Klasse:** nur eine Oberklasse möglich, enge Kopplung', 'Beides: unnötige Hierarchien erhöhen die Komplexität']],
  ['code', 'java', `// Eine Klasse: eine Oberklasse, mehrere Interfaces
class Smartphone extends Geraet implements Telefonierbar, Fotografierbar, Druckbar { ... }

// Praxisbeispiel Comparable: Objekte sortierbar machen
class Person implements Comparable<Person> {
    String name; int alter;
    public int compareTo(Person o) { return Integer.compare(this.alter, o.alter); }
}
Collections.sort(personenListe);       // nutzt compareTo`],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Nennen Sie drei Unterschiede zwischen Interface und abstrakter Klasse.', ['- Eine Klasse kann **mehrere Interfaces**, aber nur **eine abstrakte Oberklasse** haben.', '- Eine abstrakte Klasse kann **Attribute, Konstruktoren und implementierte Methoden** enthalten, ein Interface (klassisch) nur Methodenköpfe.', '- Ein Interface beschreibt eine **Fähigkeit** ("kann"), eine abstrakte Klasse eine **gemeinsame Basis** ("ist ein").'], 6],
  ['qa', 'Eine Software soll verschiedene Exportformate (PDF, CSV, XML) unterstützen. Das Format soll später leicht erweitert werden können. Wie entwerfen Sie das mit OOP?', 'Ein **Interface `Exporter`** mit der Methode `export(Daten d)`. Die Klassen `PdfExporter`, `CsvExporter`, `XmlExporter` implementieren es. Die Anwendung arbeitet nur mit dem Interface (**Polymorphie**). Ein neues Format ist eine neue Klasse, ohne bestehenden Code zu ändern (Open/Closed-Prinzip).', 5],
  ['qa', 'Warum kann man ein Interface nicht mit new instanziieren?', 'Ein Interface enthält keine Implementierung, es ist nur ein Vertrag. Es gibt keinen Code, der ausgeführt werden könnte. Man instanziiert stattdessen eine Klasse, die das Interface implementiert, und kann sie über eine Variable vom Interface-Typ ansprechen.', 3],
  ['quiz', [
    {q: 'Wie viele Interfaces kann eine Klasse in Java implementieren?', o: ['Beliebig viele', 'Genau eines', 'Keines', 'Höchstens zwei'], a: 0, e: 'Mehrfachimplementierung von Interfaces ist erlaubt.'},
    {q: 'Was darf eine abstrakte Klasse, ein (klassisches) Interface aber nicht?', o: ['Attribute und Konstruktoren besitzen', 'Methoden enthalten', 'Von anderen erben', 'Polymorph sein'], a: 0, e: 'Abstrakte Klassen können Zustand und Konstruktoren haben.'},
    {q: 'Welches Schlüsselwort nutzt Java, wenn eine Klasse ein Interface umsetzt?', o: ['implements', 'extends', 'uses', 'interface'], a: 0, e: 'class A implements I. Für Klassenvererbung: extends.'},
    {q: 'Kann eine abstrakte Klasse konkrete Methoden enthalten?', o: ['Ja', 'Nein', 'Nur in C#', 'Nur statische'], a: 0, e: 'Abstrakte Klassen mischen abstrakte und konkrete Methoden.'},
  ]],
]);
