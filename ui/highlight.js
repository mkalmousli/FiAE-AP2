// Kleiner Syntax-Highlighter: liefert Token [art, text] für Code-Blöcke.
(function () {
  const WORDS = {
    sql: 'select from where and or not in like between join inner left right full outer on group by having order asc desc insert into values update set delete create table primary key foreign references null is as distinct count sum avg min max limit alter drop add constraint unique default exists union all check varchar int integer date decimal char boolean text case when then else end view index',
    python: 'def class return if elif else for while in not and or import from as try except finally raise with pass break continue None True False lambda self print range len yield is',
    java: 'public private protected class interface extends implements static final void int double float long boolean char byte short String new return if else for while do switch case break continue try catch finally throw throws this super null true false abstract import package instanceof enum var List ArrayList Map HashMap Override System',
    csharp: 'using namespace public private protected internal class interface struct static readonly void int double float long bool char string var new return if else for foreach in while do switch case break continue try catch finally throw this base null true false abstract virtual override get set async await List Console enum record is as',
    js: 'function const let var return if else for while do switch case break continue try catch finally throw new this null true false class extends async await import export typeof of in',
    pseudo: 'wenn sonst dann ende solange für bis wiederhole funktion prozedur gib zurück ausgabe eingabe if else while for do then end return function',
  };
  const COMMENT = {
    sql: /--[^\n]*/, python: /#[^\n]*/, pseudo: /\/\/[^\n]*|#[^\n]*/, java: /\/\/[^\n]*|\/\*[\s\S]*?\*\//,
    csharp: /\/\/[^\n]*|\/\*[\s\S]*?\*\//, js: /\/\/[^\n]*|\/\*[\s\S]*?\*\//, html: /<!--[\s\S]*?-->/, css: /\/\*[\s\S]*?\*\//,
  };
  const SPECIAL = {html: /<\/?[A-Za-z][\w-]*|\/?>/, css: /[\w-]+(?=\s*:)/};
  const STR = /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/;
  const NUM = /\b\d+(?:\.\d+)?\b/;
  const WORD = /[A-Za-zÄÖÜäöüß_][\wÄÖÜäöüß]*/;
  const NEVER = /(?!)/;
  const cache = {};
  const make = (lang) => {
    const parts = [COMMENT[lang] || NEVER, STR, NUM, SPECIAL[lang] || NEVER, WORD];
    const set = new Set((WORDS[lang] || '').split(' '));
    const ci = lang === 'sql' || lang === 'pseudo';
    return {re: new RegExp(parts.map((part) => '(' + part.source + ')').join('|'), 'g'), set, ci};
  };
  AP2.highlight = (lang, src) => {
    const lex = cache[lang] || (cache[lang] = make(lang));
    const out = [];
    let last = 0;
    lex.re.lastIndex = 0;
    let m = lex.re.exec(src);
    while (m) {
      if (m.index > last) out.push(['plain', src.slice(last, m.index)]);
      let kind = 'plain';
      if (m[1]) kind = 'com';
      else if (m[2]) kind = 'str';
      else if (m[3]) kind = 'num';
      else if (m[4]) kind = 'kw';
      else if (lex.set.has(lex.ci ? m[5].toLowerCase() : m[5])) kind = 'kw';
      out.push([kind, m[0]]);
      last = m.index + m[0].length;
      m = lex.re.exec(src);
    }
    if (last < src.length) out.push(['plain', src.slice(last)]);
    return out;
  };
})();
