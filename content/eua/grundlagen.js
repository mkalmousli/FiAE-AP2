// Entwicklung und Umsetzung von Algorithmen - Grundlagen
(function() {
  const page = {
    id: 'eua-grundlagen', block: 'eua', titel: 'Programmierung Grundlagen',
    definition: 'Programmierung umfasst die Erstellung von Quellcode, der Datentypen, Variablen, Operatoren und Kontrollstrukturen verwendet um Probleme zu loesen. Ein Algorithmus ist eine schrittweise Anleitung zur Loesung eines Problems.',
    merksatz: 'DVK: Datentypen, Variablen, Kontrollstrukturen (Verzweigung, Schleife)',
    abschnitte: [
      {typ: 'heading', text: 'Datentypen'},
      {typ: 'list', items: [
        'int/Integer: ganze Zahlen (-2147483648 bis 2147483647)',
        'long: groessere ganze Zahlen',
        'float/double: Fliesskommazahlen (Dezimalzahlen)',
        'boolean: true oder false',
        'String/char: Text und Zeichen',
      ]},
      {typ: 'heading', text: 'Kontrollstrukturen'},
      {typ: 'list', items: [
        'if/else: Verzweigung (Bedingung erfuellt? dann A, sonst B)',
        'for: Schleife mit bekannter Anzahl',
        'while: Schleife mit Bedingung',
        'do-while: Schleife, die mindestens 1x laeuft',
      ]},
      {typ: 'text', inhalt: 'Operatoren: +, -, *, /, % (Modulo), ==, !=, <, >, <=, >=, &&, ||, !'},
    ]
  };
  AP2.store.register('eua-grundlagen', page);
})();
