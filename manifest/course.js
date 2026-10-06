// Crashkurse: Jede Sprache hat nummerierte Kapitel in content/course/<sprache>/01.js, 02.js, ...
[['python', 15], ['java', 12], ['csharp', 11], ['sql', 8], ['html', 5], ['css', 5]].forEach(([lang, count]) => {
  for (let i = 1; i <= count; i++) AP2.files.push('content/course/' + lang + '/' + String(i).padStart(2, '0') + '.js');
});
