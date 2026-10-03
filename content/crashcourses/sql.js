// SQL Crash Course
(function() {
  const page = {
    id: 'course-sql', block: 'course', titel: 'SQL Crash Course',
    definition: 'SQL ist die Standard-Sprache fuer Datenbanken. Lerne in 15 Minuten die wichtigsten Befehle: SELECT, WHERE, JOIN, GROUP BY, INSERT, UPDATE, DELETE.',
    merksatz: 'CRUD: Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE)',
    abschnitte: [
      {typ: 'heading', text: '1. SELECT - Daten auslesen'},
      {typ: 'text', inhalt: 'SELECT spalte1, spalte2 FROM tabelle; - alle Daten'},
      {typ: 'code', code: 'SELECT name, alter FROM personen;'},
      {typ: 'heading', text: '2. WHERE - Bedingungen'},
      {typ: 'code', code: 'SELECT * FROM personen WHERE alter > 18;'},
      {typ: 'text', inhalt: 'Operatoren: =, !=, >, <, >=, <=, IN, LIKE, BETWEEN'},
      {typ: 'heading', text: '3. JOIN - Tabellen verbinden'},
      {typ: 'code', code: 'SELECT p.name, b.stadt FROM personen p\nJOIN buecher b ON p.id = b.person_id;'},
      {typ: 'text', inhalt: 'Arten: INNER JOIN (nur Match), LEFT JOIN (alle von links), RIGHT JOIN'},
      {typ: 'heading', text: '4. GROUP BY - Gruppieren'},
      {typ: 'code', code: 'SELECT stadt, COUNT(*) FROM personen GROUP BY stadt;'},
      {typ: 'heading', text: '5. ORDER BY - Sortieren'},
      {typ: 'code', code: 'SELECT * FROM personen ORDER BY alter DESC;'},
      {typ: 'heading', text: '6. Aggregatfunktionen'},
      {typ: 'list', items: ['COUNT(*) - Anzahl Zeilen', 'SUM(spalte) - Summe', 'AVG(spalte) - Durchschnitt', 'MIN/MAX - Kleinster/Groesster']},
      {typ: 'heading', text: '7. INSERT - Daten einfuegen'},
      {typ: 'code', code: 'INSERT INTO personen (name, alter) VALUES ("Max", 25);'},
      {typ: 'heading', text: '8. UPDATE - Daten aendern'},
      {typ: 'code', code: 'UPDATE personen SET alter = 26 WHERE name = "Max";'},
      {typ: 'heading', text: '9. DELETE - Daten loeschen'},
      {typ: 'code', code: 'DELETE FROM personen WHERE alter < 18;'},
      {typ: 'heading', text: 'Quiz'},
      {typ: 'quiz', quizId: 'sql-quiz-1'},
    ]
  };
  AP2.store.register('course-sql', page);
})();
