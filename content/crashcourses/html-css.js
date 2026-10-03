// HTML/CSS Crash Course
(function() {
  const page = {
    id: 'course-html-css', block: 'course', titel: 'HTML/CSS Crash Course',
    definition: 'HTML struktu 1024riert Inhalte, CSS stylt sie. Lerne die wichtigsten Tags und CSS-Eigenschaften in 15 Minuten.',
    merksatz: 'HTML = Struktur (Knochen), CSS = Stil (Haut)',
    abschnitte: [
      {typ: 'heading', text: '1. HTML Grundstruktur'},
      {typ: 'code', code: '<!DOCTYPE html>\n<html>\n  <head><title>Seite</title></head>\n  <body>\n    <h1>Titel</h1>\n    <p>Text</p>\n  </body>\n</html>'},
      {typ: 'heading', text: '2. Wichtige HTML-Tags'},
      {typ: 'list', items: ['<h1>-<h6> Ueberschriften', '<p> Absatz', '<a href=""> Link', '<img src=""> Bild', '<button> Knopf', '<div> Container', '<span> Inline-Text']},
      {typ: 'heading', text: '3. Formulare'},
      {typ: 'code', code: '<form>\n  <input type="text" placeholder="Name">\n  <input type="email">\n  <textarea></textarea>\n  <button type="submit">Senden</button>\n</form>'},
      {typ: 'heading', text: '4. CSS Selektoren'},
      {typ: 'code', code: 'h1 { color: blue; }  /* Element */\n.title { font-size: 24px; }  /* Klasse */\n#main { width: 100%; }  /* ID */'},
      {typ: 'heading', text: '5. CSS Eigenschaften'},
      {typ: 'list', items: ['color, background-color', 'font-size, font-weight, font-family', 'padding, margin, border', 'width, height, display', 'flex, grid fuer Layout']},
      {typ: 'heading', text: '6. Box Model'},
      {typ: 'code', code: 'div {\n  width: 200px;\n  padding: 10px;  /* Innen */\n  border: 1px solid black;\n  margin: 20px;  /* Aussen */\n}'},
      {typ: 'heading', text: '7. Flexbox'},
      {typ: 'code', code: '.container {\n  display: flex;\n  justify-content: space-between;  /* Horizontal */\n  align-items: center;  /* Vertikal */\n  gap: 10px;\n}'},
      {typ: 'heading', text: '8. Media Queries (Responsive)'},
      {typ: 'code', code: '@media (max-width: 768px) {\n  body { font-size: 14px; }\n  .container { flex-direction: column; }\n}'},
      {typ: 'quiz', quizId: 'html-quiz-1'},
    ]
  };
  AP2.store.register('course-html-css', page);
})();
