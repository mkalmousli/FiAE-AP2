// Normalisierung (1NF - 3NF)
(function() {
  const page = {
    id: 'ps-normalisierung', block: 'ps', titel: 'Datenbankennormalisierung',
    definition: 'Normalisierung ist ein Prozess zur Optimierung von Datenbankstrukturen durch Aufloesung von Redundanzen und Abhaengigkeiten. 1NF, 2NF, 3NF sind Normalformen mit progressiv strengeren Anforderungen.',
    merksatz: '1NF=atomar, 2NF=kein partieller Schluessel, 3NF=keine transitiven Abhaengigkeiten',
    abschnitte: [
      {typ: 'heading', text: '1. Normalform (1NF)'},
      {typ: 'text', inhalt: 'Alle Attribute sind atomar (unteilbar). Keine mehrzeiligen Attribute in einer Zelle.'},
      {typ: 'heading', text: '2. Normalform (2NF)'},
      {typ: 'text', inhalt: '1NF + jedes Attribut haengt vom gesamten Primaerschluessel ab (nicht nur von Teilen).'},
      {typ: 'heading', text: '3. Normalform (3NF)'},
      {typ: 'text', inhalt: '2NF + keine transitiven Abhaengigkeiten (Attribute haengen nur vom Schluessel ab, nicht voneinander).'},
      {typ: 'text', inhalt: 'Beispiel: Schueler -> Stadt -> PLZ sollte geteilt werden (Schueler -> Stadt, Stadt -> PLZ)'},
    ]
  };
  AP2.store.register('ps-normalisierung', page);
})();
