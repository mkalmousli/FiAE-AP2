// SQL Grundlagen
(function() {
  const page = {
    id: 'eua-sql-basics', block: 'eua', titel: 'SQL Grundlagen',
    definition: 'SQL (Structured Query Language) ist die Standard-Sprache zur Abfrage und Manipulation von relationalen Datenbanken. Die wichtigsten Befehle sind SELECT (lesen), INSERT (einfuegen), UPDATE (aendern), DELETE (loeschen).',
    merksatz: 'CRUD+DML: Create/Read/Update/Delete, Data Manipulation Language',
    abschnitte: [
      {typ: 'heading', text: 'Wichtige Befehle'},
      {typ: 'list', items: [
        'SELECT: Daten auslesen (WHERE, JOIN, GROUP BY, ORDER BY)',
        'INSERT: neue Zeile einfuegen',
        'UPDATE: Daten veraendern (WHERE Bedingung)',
        'DELETE: Zeilen loeschen',
      ]},
      {typ: 'heading', text: 'SELECT Beispiel'},
      {typ: 'text', inhalt: 'SELECT name, alter FROM personen WHERE alter > 18 ORDER BY alter DESC;'},
      {typ: 'heading', text: 'Aggregatfunktionen'},
      {typ: 'list', items: [
        'COUNT: Anzahl Zeilen',
        'SUM: Summe einer Spalte',
        'AVG: Durchschnitt',
        'MIN/MAX: kleinster/groesster Wert',
      ]},
    ]
  };
  AP2.store.register('eua-sql-basics', page);
})();
