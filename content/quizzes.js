// Quiz registry placeholder - loaded after quiz data files
(function() {
  window.AP2.registerQuiz = window.AP2.registerQuiz || function(id, questions) {
    if (!window.AP2.quizRegistry) window.AP2.quizRegistry = {};
    window.AP2.quizRegistry[id] = questions;
  };
})();
