// Objektorientierte Programmierung (OOP)
(function() {
  const page = {
    id: 'eua-oop', block: 'eua', titel: 'Objektorientierte Programmierung',
    definition: 'OOP ist ein Programmierparadigma, das Programme als Sammlung von Objekten modelliert, die Daten (Attribute) und Funktionen (Methoden) kombinieren. Zentrale Prinzipien sind Vererbung, Polymorphie, Kapselung und Abstraktion.',
    merksatz: 'VKKA: Vererbung, Kapselung, Konkrete Klasse, Abstraktion',
    abschnitte: [
      {typ: 'heading', text: 'Vier Saeulen der OOP'},
      {typ: 'list', items: [
        'Kapselung: Daten und Methoden zusammengefasst, private/public',
        'Vererbung: Subklasse erbt von Superklasse (is-a Beziehung)',
        'Polymorphie: gleiche Methode, unterschiedliche Implementierung',
        'Abstraktion: nur wesentliche Details (versteckt Komplexitaet)',
      ]},
      {typ: 'heading', text: 'Klasse vs. Objekt'},
      {typ: 'text', inhalt: 'Klasse = Bauplan (Auto), Objekt = konkrete Instanz (mein Auto)'},
      {typ: 'heading', text: 'Wichtige Konzepte'},
      {typ: 'list', items: [
        'Konstruktor: wird beim Erzeugen aufgerufen',
        'this: Referenz zum aktuellen Objekt',
        'static: gehoert zur Klasse, nicht zu Objekten',
        'Interface: Vertrag (welche Methoden muss implementiert werden)',
      ]},
    ]
  };
  AP2.store.register('eua-oop', page);
})();
