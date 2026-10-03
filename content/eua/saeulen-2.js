AP2.add('eua-saeulen', [
  ['h', 'Polymorphie (Vielgestaltigkeit)'],
  ['p', 'Polymorphie bedeutet: **Dieselbe Nachricht, verschiedenes Verhalten.** Man kann ein Objekt einer Unterklasse über eine Variable der **Oberklasse** ansprechen. Beim Aufruf wird **zur Laufzeit** die Methode der **tatsächlichen Klasse** ausgeführt (**dynamische Bindung**). So behandelt man verschiedene Objekte einheitlich.'],
  ['codes', [
    ['java', `Tier[] tiere = { new Hund("Rex"), new Katze("Mia"), new Tier("Tier") };
for (Tier t : tiere) {
    t.laut();          // Aufruf immer gleich - Ergebnis je nach Objekt
}
// Ausgabe:  Wau
//           Miau
//           ...`],
    ['python', `tiere = [Hund("Rex"), Katze("Mia"), Tier("Tier")]
for t in tiere:
    t.laut()           # Wau, Miau, ...`],
  ]],
  ['diagram', {w: 760, h: 180, keep: 600, cap: 'Polymorphie: Ein Aufruf t.laut() führt je nach Objekt zu anderem Verhalten.', nodes: [
    {id: 'v', k: 'round', x: 90, y: 90, t: ['t.laut()', 'Variable: Tier'], w: 140, h: 54, s: 'accent'}, {id: 'o1', k: 'round', x: 360, y: 40, t: 'Objekt Hund: "Wau"', w: 200, h: 38}, {id: 'o2', k: 'round', x: 360, y: 90, t: 'Objekt Katze: "Miau"', w: 200, h: 38}, {id: 'o3', k: 'round', x: 360, y: 140, t: 'Objekt Tier: "..."', w: 200, h: 38},
  ], edges: [{a: 'v', b: 'o1', k: 'dash'}, {a: 'v', b: 'o2', k: 'dash'}, {a: 'v', b: 'o3', k: 'dash'}]}],
  ['procon', 'Polymorphie', ['**Erweiterbar:** neue Unterklasse hinzufügen, **ohne** bestehenden Code zu ändern (Open/Closed-Prinzip)', 'Gemeinsamer Code für verschiedene Typen (Listen, Algorithmen)', 'Weniger `if`/`switch` nach Typ'], ['Verhalten erst zur **Laufzeit** erkennbar, Debugging aufwendiger', 'Kleiner Laufzeitaufwand (dynamische Bindung)', 'Schlecht entworfene Hierarchien werden unübersichtlich']],
  ['h', 'Abstraktion'],
  ['p', 'Abstraktion bedeutet: **Nur das Wesentliche** modellieren und **Details verbergen**. Ein Auto-Fahrer nutzt Lenkrad und Pedale und muss nicht wissen, wie der Motor arbeitet. In der OOP erreicht man das mit **abstrakten Klassen** und **Interfaces** (siehe nächste Seite): Sie legen fest, **was** ein Objekt kann, ohne zu sagen, **wie**.'],
  ['code', 'java', `abstract class Form {                    // abstrakt: kann nicht instanziiert werden
    abstract double flaeche();           // nur der Kopf, keine Umsetzung
    void beschreibe() { System.out.println("Fläche: " + flaeche()); }
}
class Kreis extends Form {
    double r;
    Kreis(double r) { this.r = r; }
    double flaeche() { return Math.PI * r * r; }
}
class Quadrat extends Form {
    double a;
    Quadrat(double a) { this.a = a; }
    double flaeche() { return a * a; }
}
// new Form();           // Fehler: abstrakte Klasse
Form f = new Kreis(2);   // erlaubt (Polymorphie)
f.beschreibe();`],
  ['h', 'Vererbung oder Komposition?'],
  ['table', ['Frage', 'Vererbung (ist ein)', 'Komposition (hat ein)'], [
    ['Beziehung', 'Hund **ist ein** Tier', 'Auto **hat einen** Motor'],
    ['Kopplung', 'Eng (Unterklasse hängt von Oberklasse ab)', 'Locker (Teile austauschbar)'],
    ['Flexibilität', 'Zur Laufzeit nicht änderbar', 'Teile können zur Laufzeit gewechselt werden'],
    ['Empfehlung', 'Nur wenn "ist ein" wirklich stimmt', '"Komposition vor Vererbung": im Zweifel bevorzugen'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Nennen Sie die vier Grundprinzipien der objektorientierten Programmierung und erklären Sie jeweils in einem Satz.', ['- **Kapselung:** Daten werden in der Klasse versteckt und nur über Methoden zugänglich gemacht.', '- **Vererbung:** Eine Unterklasse übernimmt Attribute und Methoden einer Oberklasse und kann sie erweitern oder überschreiben.', '- **Polymorphie:** Gleiche Methodenaufrufe führen je nach tatsächlichem Objekttyp zu unterschiedlichem Verhalten.', '- **Abstraktion:** Es wird nur das Wesentliche modelliert, Implementierungsdetails bleiben verborgen.'], 8],
  ['qa', 'Was gibt dieser Code aus? Tier t = new Hund("Rex"); t.laut(); (Hund überschreibt laut() mit "Wau", Tier gibt "..." aus.)', '**Wau.** Zur Laufzeit wird die Methode der tatsächlichen Klasse (Hund) ausgeführt. Das ist **dynamische Bindung (Polymorphie)**.', 3],
  ['qa', 'Erklären Sie den Unterschied zwischen Überladen und Überschreiben.', ['**Überladen:** Mehrere Methoden mit gleichem Namen, aber unterschiedlichen Parametern in derselben Klasse. Welche verwendet wird, entscheidet der Compiler.', '**Überschreiben:** Eine Unterklasse implementiert eine geerbte Methode mit gleicher Signatur neu. Welche verwendet wird, entscheidet die Laufzeit nach dem tatsächlichen Objekt.'], 4],
  ['qa', 'Eine Klasse Auto soll einen Motor haben. Soll Auto von Motor erben? Begründen Sie.', 'Nein. Ein Auto **ist kein** Motor, es **hat einen** Motor. Hier passt **Komposition**: Die Klasse Auto erhält ein Attribut vom Typ Motor. Vererbung würde die "ist ein"-Beziehung verletzen und die Klassen unnötig eng koppeln.', 3],
  ['quiz', [
    {q: 'Welches Schlüsselwort erzeugt in Java eine Vererbungsbeziehung?', o: ['extends', 'implements', 'inherits', 'super'], a: 0, e: 'class B extends A. implements ist für Interfaces.'},
    {q: 'Was ist Polymorphie?', o: ['Dieselbe Nachricht führt je nach Objekttyp zu unterschiedlichem Verhalten', 'Mehrere Klassen in einer Datei', 'Das Verstecken von Daten', 'Das Löschen von Objekten'], a: 0, e: 'Polymorphie = Vielgestaltigkeit.'},
    {q: 'Welche Beziehung beschreibt "ist ein"?', o: ['Vererbung', 'Komposition', 'Aggregation', 'Abhängigkeit'], a: 0, e: '"Hund ist ein Tier" ist Vererbung.'},
    {q: 'Kann man eine abstrakte Klasse direkt instanziieren?', o: ['Nein', 'Ja, immer', 'Nur in Python', 'Nur mit static'], a: 0, e: 'Abstrakte Klassen sind unvollständig und nur als Basis gedacht.'},
    {q: 'Was bewirkt super(name) im Konstruktor einer Unterklasse?', o: ['Ruft den Konstruktor der Oberklasse auf', 'Erzeugt ein zweites Objekt', 'Löscht die Oberklasse', 'Macht die Klasse abstrakt'], a: 0, e: 'super ruft den Konstruktor oder die Methoden der Oberklasse auf.'},
  ]],
]);
