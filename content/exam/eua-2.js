AP2.exam.part('exam1-eua', {
  t: 'Handlungsschritt 3: Objektorientierte Programmierung (20 Punkte)',
  tasks: [
    {pts: 3, q: 'Erklären Sie den Unterschied zwischen Klasse und Objekt an einem Beispiel aus dem Portal.',
      a: ['Eine **Klasse** ist der **Bauplan** (Attribute und Methoden), ein **Objekt** (Instanz) ist ein **konkretes Exemplar** mit eigenen Attributwerten. Beispiel: Die Klasse **Mitglied** beschreibt Name und E-Mail; das Objekt "Anna Meier, anna@x.de" ist eine Instanz davon.']},
    {pts: 4, rows: 4, q: 'Welche Ausgabe erzeugt das folgende Programm und welches OOP-Prinzip wird sichtbar?',
      ctx: [['code', 'java', `abstract class Fahrzeug {
  String name;
  Fahrzeug(String n) { name = n; }
  abstract int raeder();
  void info() { System.out.println(name + ": " + raeder()); }
}
class Auto extends Fahrzeug { Auto() { super("Auto"); } int raeder() { return 4; } }
class Motorrad extends Fahrzeug { Motorrad() { super("Motorrad"); } int raeder() { return 2; } }
// in main:
Fahrzeug[] f = { new Auto(), new Motorrad() };
for (Fahrzeug x : f) x.info();`]],
      a: ['Ausgabe: **Auto: 4** und **Motorrad: 2**.', 'Prinzip: **Polymorphie** (Vielgestaltigkeit): Über die Basisklasse Fahrzeug wird zur Laufzeit die passende überschriebene Methode raeder() aufgerufen. Außerdem **Vererbung** und **Abstraktion**.']},
    {pts: 7, rows: 10, q: 'Implementieren Sie eine Klasse Konto (Sprache frei): privates Attribut stand (Startwert 0), Konstruktor mit Anfangsbetrag, Methode einzahlen(betrag) für positive Beträge, Methode abheben(betrag), die bei nicht ausreichendem Guthaben einen Fehler auslöst, und einen Getter für stand.',
      a: ['Bewertung: Kapselung durch private Variable (1), Konstruktor (1), einzahlen mit Prüfung (2), abheben mit Prüfung und Ausnahme (2), Getter (1).'],
      sol: [['code', 'java', `public class Konto {
    private double stand;

    public Konto(double anfangsbetrag) {
        if (anfangsbetrag < 0) throw new IllegalArgumentException("negativ");
        this.stand = anfangsbetrag;
    }
    public void einzahlen(double betrag) {
        if (betrag <= 0) throw new IllegalArgumentException("Betrag muss positiv sein");
        stand += betrag;
    }
    public void abheben(double betrag) {
        if (betrag <= 0 || betrag > stand) throw new IllegalStateException("nicht genug Guthaben");
        stand -= betrag;
    }
    public double getStand() { return stand; }
}`]]},
    {pts: 3, q: 'Mehrere Anzeigen im Portal (Kursliste, Statistik) sollen sich automatisch aktualisieren, wenn sich die Zahl freier Plätze eines Termins ändert. Welches Entwurfsmuster eignet sich? Nennen Sie die beteiligten Rollen.',
      a: ['Das **Observer-Muster (Beobachter)**. **Subjekt** (Termin) hält eine Liste von Beobachtern und benachrichtigt sie bei Änderung. **Beobachter** (Kursliste, Statistik) implementieren eine Schnittstelle (update) und melden sich an. Vorteil: **lose Kopplung**.']},
    {pts: 3, q: 'Welche Ausgabe erzeugt der Codeausschnitt? Begründen Sie kurz.',
      ctx: [['code', 'java', `try {
  System.out.print("A");
  int x = 10 / 0;
  System.out.print("B");
} catch (ArithmeticException e) {
  System.out.print("C");
} finally {
  System.out.print("D");
}
System.out.print("E");`]],
      a: ['Ausgabe: **ACDE**. "A" wird ausgegeben, die Division durch 0 löst eine ArithmeticException aus, "B" wird übersprungen, der catch-Block gibt "C" aus, **finally** läuft immer ("D"), danach geht das Programm normal weiter ("E").']},
  ],
});
AP2.exam.part('exam1-eua', {
  t: 'Handlungsschritt 4: Datenbankabfragen mit SQL (25 Punkte)',
  intro: 'Gegeben sind die Tabellen: kunde(kid PK, name, ort), bestellung(bid PK, kid FK, datum, summe), artikel(aid PK, bez, preis), position(bid FK, aid FK, menge).',
  tasks: [
    {pts: 3, rows: 3, q: 'Geben Sie alle Kunden aus Ulm alphabetisch nach Namen sortiert aus (alle Spalten).',
      a: ['SELECT * FROM kunde WHERE ort = \'Ulm\' ORDER BY name;']},
    {pts: 6, rows: 5, q: 'Geben Sie je Kunde (Name) die Anzahl der Bestellungen und die Gesamtsumme aus, aber nur für Kunden, deren Gesamtsumme über 1.000 Euro liegt, absteigend nach Summe.',
      a: ['SELECT k.name, COUNT(*) AS anzahl, SUM(b.summe) AS gesamt', 'FROM kunde k JOIN bestellung b ON b.kid = k.kid', 'GROUP BY k.kid, k.name', 'HAVING SUM(b.summe) > 1000', 'ORDER BY gesamt DESC;', 'Punkte: Join (2), GROUP BY (1), Aggregate (1), HAVING statt WHERE (1), ORDER BY DESC (1).']},
    {pts: 5, rows: 4, q: 'Geben Sie die Namen aller Kunden aus, die noch keine Bestellung aufgegeben haben.',
      a: ['Variante 1 (LEFT JOIN): SELECT k.name FROM kunde k LEFT JOIN bestellung b ON b.kid = k.kid WHERE b.bid IS NULL;', 'Variante 2: SELECT name FROM kunde k WHERE NOT EXISTS (SELECT 1 FROM bestellung b WHERE b.kid = k.kid);', 'Nicht NOT IN mit Spalte, die NULL enthalten kann.']},
    {pts: 3, rows: 3, q: 'Erhöhen Sie den Preis aller Artikel, die weniger als 100 Euro kosten, um 5 Prozent.',
      a: ['UPDATE artikel SET preis = preis * 1.05 WHERE preis < 100;', 'Ohne WHERE würden alle Artikel geändert.']},
    {pts: 4, q: 'Erklären Sie a) den Unterschied zwischen WHERE und HAVING, b) den Unterschied zwischen INNER JOIN und LEFT JOIN.',
      a: ['a) **WHERE** filtert einzelne Zeilen **vor** der Gruppierung (keine Aggregate); **HAVING** filtert Gruppen **nach** GROUP BY (mit Aggregaten).', 'b) **INNER JOIN** liefert nur Zeilen mit Treffer in beiden Tabellen; **LEFT JOIN** liefert alle Zeilen der linken Tabelle, bei fehlendem Treffer mit NULL in den Spalten der rechten.']},
    {pts: 4, rows: 7, q: 'Schreiben Sie die CREATE-TABLE-Anweisung für position mit sinnvollen Datentypen, Primärschlüssel (bid, aid), den Fremdschlüsseln und einer Bedingung, dass menge größer 0 ist.',
      a: ['Punkte: Datentypen (1), zusammengesetzter Primärschlüssel (1), zwei Fremdschlüssel (1), CHECK (1).'],
      sol: [['code', 'sql', `CREATE TABLE position (
  bid   INT NOT NULL,
  aid   INT NOT NULL,
  menge INT NOT NULL CHECK (menge > 0),
  PRIMARY KEY (bid, aid),
  FOREIGN KEY (bid) REFERENCES bestellung(bid),
  FOREIGN KEY (aid) REFERENCES artikel(aid)
);`]]},
  ],
});
