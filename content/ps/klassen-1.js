(function () {
  const cls = (id, x, y, name, attrs, ops, w) => ({id, k: 'cls', x, y, w: w || 160, t: {name, attrs: attrs || [], ops}});
  const pair = (a, b, edge, cap, h) => ({w: 640, h: h || 170, cap, nodes: [a, b], edges: [edge]});
  AP2.page('ps-klassen', {
    b: 'ps', g: 'UML-Modellierung', t: 'Klassendiagramm',
    d: 'Ein **Klassendiagramm** zeigt die **Klassen** eines Programms mit ihren **Attributen** und **Methoden** und die **Beziehungen** zwischen den Klassen (Assoziation, Aggregation, Komposition, Vererbung). Es beschreibt die **statische Struktur**.',
    m: 'Kasten mit **3 Fächern**: Name, Attribute, Methoden. Beziehungen von schwach nach stark: **Abhängigkeit, Assoziation, Aggregation (leere Raute), Komposition (volle Raute), Vererbung (leeres Dreieck)**. Raute zeigt immer zum **Ganzen**.',
    cheat: [
      ['Aufbau einer Klasse', ['**Oben:** Klassenname', '**Mitte:** Attribute (Name: Typ)', '**Unten:** Methoden (name(): Rückgabe)', 'Sichtbarkeit: **+** public, **-** private, **#** protected, **~** package']],
      ['Beziehungen', ['**Assoziation:** Linie ("kennt")', '**Aggregation:** leere Raute ("hat", Teil lebt allein)', '**Komposition:** volle Raute ("besteht aus", Teil stirbt mit)', '**Vererbung:** leeres Dreieck ("ist ein")']],
      ['Multiplizität', ['`1` genau eins', '`0..1` keins oder eins', '`*` oder `0..*` beliebig viele', '`1..*` mindestens eins', '`2..5` zwei bis fünf']],
      ['Weitere Symbole', ['**Abhängigkeit:** gestrichelter Pfeil ("benutzt kurz")', '**Realisierung:** gestrichelt mit leerem Dreieck (Klasse implementiert Interface)', '**abstract:** Name kursiv oder «abstract»', '**«interface»:** Schnittstelle']],
    ],
    blocks: [
      ['h', 'Eine Klasse zeichnen'],
      ['p', 'Eine **Klasse** ist ein Bauplan für Objekte. Im Klassendiagramm ist sie ein Rechteck mit drei Fächern. Oben steht der **Name**, in der Mitte stehen die **Attribute** (Daten) und unten die **Methoden** (Verhalten). Vor jedem Eintrag steht ein Zeichen für die **Sichtbarkeit**: **+** (public, überall sichtbar), **-** (private, nur in der Klasse), **#** (protected, in der Klasse und Unterklassen).'],
      ['diagram', {w: 520, h: 220, cap: 'Die Klasse Konto mit Attributen und Methoden', nodes: [cls('k', 190, 110, 'Konto', ['- kontonummer: String', '- saldo: double', '- inhaber: String'], ['+ einzahlen(betrag: double): void', '+ abheben(betrag: double): boolean', '+ getSaldo(): double'], 260)], edges: []}],
      ['code', 'java', `public class Konto {
    private String kontonummer;
    private double saldo;
    private String inhaber;

    public void einzahlen(double betrag) { saldo += betrag; }
    public boolean abheben(double betrag) {
        if (betrag > saldo) return false;
        saldo -= betrag;
        return true;
    }
    public double getSaldo() { return saldo; }
}`],
      ['note', 'Merke die Schreibweise: Attribut **name: Typ** (zum Beispiel saldo: double), Methode **name(parameter: Typ): Rückgabetyp**. Das ist die UML-Schreibweise, nicht die von Java (dort steht der Typ vorn).'],
      ['h', 'Die Beziehungen im Detail'],
      ['h3', 'Assoziation: "kennt / nutzt"'],
      ['p', 'Die einfachste Beziehung: Zwei Klassen stehen in Verbindung. An den Enden stehen die **Multiplizitäten** und manchmal **Rollennamen**. Beispiel: Eine Person besitzt kein, ein oder mehrere Autos; jedes Auto gehört genau einer Person.'],
      ['diagram', pair(cls('p', 120, 80, 'Person', ['- name: String']), cls('a', 520, 80, 'Auto', ['- kennzeichen: String']), {a: 'p', b: 'a', ea: 'none', ta: '1', tb: '0..*', t: 'besitzt'}, 'Assoziation mit Multiplizitäten: 1 Person - 0 bis viele Autos', 150)],
    ],
  });
})();
