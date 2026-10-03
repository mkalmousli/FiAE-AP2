(function () {
  const cls = (id, x, y, name, attrs, ops, w) => ({id, k: 'cls', x, y, w: w || 160, t: {name, attrs: attrs || [], ops}});
  AP2.add('ps-klassen', [
    ['h', 'Komplettes Beispiel: Bibliothek'],
    ['p', 'Anforderung: Eine Bibliothek verwaltet Bücher. Jedes Buch hat einen oder mehrere Autoren. Leser leihen Bücher aus, jede Ausleihe hat ein Datum. Ein Leser kann mehrere Ausleihen haben.'],
    ['diagram', {w: 760, h: 380, keep: 640, cap: 'Klassendiagramm Bibliothek. Die Klasse Ausleihe löst die n:m-Beziehung zwischen Leser und Buch auf.', nodes: [
      cls('autor', 100, 90, 'Autor', ['- name: String', '- geburtsjahr: int'], null, 170), cls('buch', 380, 90, 'Buch', ['- isbn: String', '- titel: String', '- verfuegbar: boolean'], ['+ ausleihen(): void'], 200),
      cls('leser', 100, 290, 'Leser', ['- nr: int', '- name: String'], ['+ leiheAus(b: Buch): Ausleihe'], 210), cls('aus', 380, 290, 'Ausleihe', ['- von: Date', '- bis: Date'], ['+ verlaengern(): void'], 200),
      cls('medium', 640, 90, '«abstract»\nMedium', ['# titel: String'], null, 150), cls('dvd', 640, 290, 'DVD', ['- laufzeit: int'], null, 150),
    ], edges: [
      {a: 'autor', b: 'buch', ea: 'none', ta: '1..*', tb: '0..*', t: 'schreibt', lo: [0, -14]},
      {a: 'leser', b: 'aus', ea: 'none', sa: 'diaf', ta: '1', tb: '0..*'},
      {a: 'buch', b: 'aus', ea: 'none', ta: '1', tb: '0..*'},
      {a: 'buch', b: 'medium', ea: 'tri'}, {a: 'dvd', b: 'medium', ea: 'tri', via: [[640, 200]]},
    ]}],
    ['h', 'Vom Diagramm zum Code'],
    ['p', 'Das Klassendiagramm ist die Vorlage für den Code. Aus jeder Klasse wird eine Klasse, aus jedem Attribut ein Feld, aus jeder Methode eine Methode. Beziehungen werden zu Referenzen: Eine **1:n-Beziehung** wird zu einer **Liste** auf der "1"-Seite. Vererbung wird zu `extends` (Java) oder `:` (C#).'],
    ['code', 'java', `public abstract class Medium {
    protected String titel;
}

public class Buch extends Medium {            // Vererbung
    private String isbn;
    private boolean verfuegbar = true;
    private List<Autor> autoren = new ArrayList<>();   // 1..* Autoren
    private List<Ausleihe> ausleihen = new ArrayList<>(); // 0..* Ausleihen

    public void ausleihen() { verfuegbar = false; }
}`],
    ['code', 'python', `class Medium:
    def __init__(self, titel):
        self.titel = titel

class Buch(Medium):                  # Vererbung
    def __init__(self, titel, isbn):
        super().__init__(titel)
        self.isbn = isbn
        self.autoren = []            # 1..* Autoren
        self.ausleihen = []          # 0..* Ausleihen`],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Eine Firma hat mehrere Abteilungen. Jede Abteilung beschäftigt Mitarbeiter. Mitarbeiter gehören genau einer Abteilung an. Welche Beziehung und welche Multiplizitäten verwenden Sie?', ['Eine **Aggregation** (leere Raute) von Abteilung zu Mitarbeiter, da Mitarbeiter ohne die Abteilung weiter existieren (oder Assoziation, wenn keine Ganzes-Teil-Sicht gewünscht ist).', 'Multiplizität: Abteilung **1** --- **0..*** Mitarbeiter. Das heißt: eine Abteilung hat beliebig viele Mitarbeiter, jeder Mitarbeiter genau eine Abteilung.'], 4],
  ['qa', 'Erklären Sie den Unterschied zwischen Aggregation und Komposition an je einem Beispiel.', ['**Aggregation:** Teile können ohne das Ganze existieren. Beispiel: Ein Team hat Spieler. Wird das Team aufgelöst, existieren die Spieler weiter.', '**Komposition:** Teile existieren nur mit dem Ganzen und werden mit ihm gelöscht. Beispiel: Ein Haus besteht aus Zimmern. Ohne das Haus gibt es keine Zimmer.'], 4],
    ['qa', 'Übersetzen Sie in UML-Notation: privates Attribut name vom Typ String, öffentliche Methode getName ohne Parameter, die einen String zurückgibt.', ['- Attribut: **- name: String**', '- Methode: **+ getName(): String**'], 2],
    ['quiz', [
      {q: 'Welches Symbol bedeutet in UML "private"?', o: ['-', '+', '#', '~'], a: 0, e: 'Minus steht für private, Plus für public, Raute für protected.'},
      {q: 'Ein Haus besteht aus Zimmern, die ohne das Haus nicht existieren. Welche Beziehung?', o: ['Komposition', 'Aggregation', 'Vererbung', 'Abhängigkeit'], a: 0, e: 'Die Zimmer sind existenzabhängig vom Haus: Komposition (volle Raute).'},
      {q: 'Wohin zeigt das leere Dreieck bei der Vererbung?', o: ['Zur Oberklasse', 'Zur Unterklasse', 'Zu einem Attribut', 'Zu einer Methode'], a: 0, e: 'Das Dreieck zeigt zur Oberklasse (Generalisierung).'},
      {q: 'Was bedeutet die Multiplizität 0..* ?', o: ['Beliebig viele, auch keines', 'Genau eins', 'Mindestens eins', 'Höchstens null'], a: 0, e: '0..* heißt null bis unendlich viele (keines, eines oder viele).'},
      {q: 'Welche Aussage über abstrakte Klassen im Klassendiagramm stimmt?', o: ['Sie werden mit Namen in Kursivschrift oder «abstract» gekennzeichnet.', 'Sie haben nie Attribute.', 'Sie werden als Kreis gezeichnet.', 'Man kann sie direkt instanziieren.'], a: 0, e: 'Abstrakte Klassen werden gekennzeichnet und können nicht direkt instanziiert werden.'},
    ]],
  ]);
})();
