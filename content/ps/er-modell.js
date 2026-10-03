// ER-Modell und Datenbankdesign
(function() {
  const page = {
    id: 'ps-er-modell', block: 'ps', titel: 'ER-Modell Datenbankdesign',
    definition: 'Das Entity-Relationship-Modell beschreibt Entitaeten (Objekte), ihre Attribute und Beziehungen. Es dient als Grundlage fuer das relationale Datenbankdesign. Aus einem ER-Modell koennen Tabellen abgeleitet werden.',
    merksatz: 'Entitaet = Tabelle, Attribut = Spalte, Beziehung = Fremdschluessel',
    abschnitte: [
      {typ: 'heading', text: 'Komponenten'},
      {typ: 'list', items: [
        'Entitaet: (Rechteck) Objekt der realen Welt (z.B. Person, Auto)',
        'Attribut: (Oval) Eigenschaft einer Entitaet (Name, Alter)',
        'Beziehung: (Raute) Verbindung zwischen Entitaeten',
        'Kardinalitaet: 1:1, 1:n, n:m beschreibt Beziehungstyp',
      ]},
      {typ: 'heading', text: 'Uebergang zu Tabellen'},
      {typ: 'list', items: [
        'Entitaet -> Tabelle',
        'Attribut -> Spalte',
        'Primaerschluessel (PK): eindeutige Identifikation',
        '1:n Beziehung -> Fremdschluessel in n-Tabelle',
        'n:m Beziehung -> neue Verbindungstabelle',
      ]},
    ]
  };
  AP2.store.register('ps-er-modell', page);
})();
