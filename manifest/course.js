// Crashkurse: Jede Sprache hat nummerierte Kapitel in content/course/<sprache>/01.js, 02.js, ...
[['python', 15], ['java', 12], ['csharp', 5]].forEach(([lang, count]) => {
  for (let i = 1; i <= count; i++) AP2.files.push('content/course/' + lang + '/' + String(i).padStart(2, '0') + '.js');
});
AP2.pages('course', {sql: 5, html: 3, css: 4, csharp: 5});
