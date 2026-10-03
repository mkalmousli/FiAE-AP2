// UML Klassendiagramm
(function() {
  const page = {
    id: 'ps-uml-klassen', block: 'ps', titel: 'UML Klassendiagramm',
    definition: 'Das UML Klassendiagramm zeigt Klassen, ihre Attribute, Methoden und Beziehungen (Assoziation, Aggregation, Komposition, Vererbung). Multiplizitaeten beschreiben wie viele Objekte miteinander verknuepft sind.',
    merksatz: 'AAV: Assoziation, Aggregation, Vererbung',
    abschnitte: [
      {typ: 'heading', text: 'Beziehungen'},
      {typ: 'list', items: [
        'Assoziation (Linie): allgemeine Beziehung (Auto hat Fahrer)',
        'Aggregation (Raute leer): Ganze-Teil, Teil kann separate existieren',
        'Komposition (Raute voll): Ganze-Teil, Teil kann nicht separate existieren',
        'Vererbung (Pfeil): Spezialisierung (Auto ist Fahrzeug)',
      ]},
      {typ: 'heading', text: 'Multiplizitaeten'},
      {typ: 'list', items: [
        '1 : 1 (eins zu eins)',
        '1 : n (eins zu viele)',
        'n : m (viele zu viele)',
        '0..1, 1..*, etc. (Bereich)',
      ]},
      {typ: 'text', inhalt: 'Sichtbarkeit: + public, - private, # protected, ~ package'},
    ]
  };
  AP2.store.register('ps-uml-klassen', page);
})();
