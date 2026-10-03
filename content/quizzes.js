// Quiz registry with questions
(function() {
  AP2.registerQuiz('osi-quiz-1', [
    {
      question: 'Auf welcher Schicht arbeiten Router?',
      options: ['Schicht 2', 'Schicht 3', 'Schicht 4', 'Schicht 7'],
      correct: 1
    },
    {
      question: 'Was ist die Funktion von Schicht 2 (Data Link)?',
      options: ['Routing von Paketen', 'Uebertraegung von Frames mit MAC-Adressen', 'Verschluesselung', 'DNS Aufloesing'],
      correct: 1
    },
    {
      question: 'Welches Protokoll arbeitet auf Schicht 4?',
      options: ['ICMP', 'TCP', 'SMTP', 'BGP'],
      correct: 1
    },
    {
      question: 'Was ist Kapselung?',
      options: ['Verschluesselung', 'Hinzufuegen von Headern jeder Schicht', 'Kompression', 'Fehlerbehandlung'],
      correct: 1
    },
  ]);
  
  AP2.registerQuiz('sql-quiz-1', [
    {
      question: 'Welcher Befehl liest Daten aus einer Tabelle?',
      options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
      correct: 0
    },
    {
      question: 'Was ist die Funktion von WHERE in SQL?',
      options: ['Sortieren', 'Filtern von Zeilen', 'Verbindung von Tabellen', 'Gruppieren'],
      correct: 1
    },
    {
      question: 'Mit welchem Befehl verbindest du zwei Tabellen?',
      options: ['UNION', 'JOIN', 'MERGE', 'COMBINE'],
      correct: 1
    },
  ]);
  
  AP2.registerQuiz('python-quiz-1', [
    {
      question: 'Wie deklarierst du eine Liste in Python?',
      options: ['list = []', 'list = {}', 'list = ()', 'list = <>'],
      correct: 0
    },
    {
      question: 'Was ist der Output von range(3)?',
      options: ['[1,2,3]', '[0,1,2]', '3', '[0,1,2,3]'],
      correct: 1
    },
  ]);
  
  AP2.registerQuiz('html-quiz-1', [
    {
      question: 'Welches Tag definiert eine Ueberschrift der groessten Groesse?',
      options: ['<h6>', '<h1>', '<title>', '<header>'],
      correct: 1
    },
    {
      question: 'Wie verlinkst du eine externe Webseite?',
      options: ['<link>', '<a href="">', '<url>', '<navigate>'],
      correct: 1
    },
  ]);
  
  AP2.registerQuiz('csharp-quiz-1', [
    {
      question: 'Welches ist der Einstiegspunkt in ein C#-Programm?',
      options: ['start()', 'main()', 'Main()', 'begin()'],
      correct: 2
    },
  ]);
  
  AP2.registerQuiz('java-quiz-1', [
    {
      question: 'Muss eine Datei Java-Klasse den gleichen Namen haben wie die Datei?',
      options: ['Nein, nie', 'Ja, public Klasse muss passen', 'Nur fuer main', 'Optional'],
      correct: 1
    },
  ]);
})();
