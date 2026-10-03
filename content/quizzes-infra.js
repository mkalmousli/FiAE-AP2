// Infrastructure quizzes
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
  ]);
  
  AP2.registerQuiz('subnet-quiz-1', [
    {
      question: 'Wie viele nutzbare Host-Adressen gibt es in einem /24 Netzwerk?',
      options: ['256', '254', '255', '253'],
      correct: 1
    },
    {
      question: 'Welche ist die Broadcast-Adresse von 192.168.10.0/26?',
      options: ['192.168.10.63', '192.168.10.64', '192.168.10.127', '192.168.10.255'],
      correct: 2
    },
    {
      question: 'Welche Adresse ist NICHT in 10.0.0.0/8?',
      options: ['10.0.0.1', '10.255.255.254', '10.200.100.50', '11.0.0.1'],
      correct: 3
    },
  ]);
})();
