AP2.page('eua-paradigmen', {
  b: 'eua', g: 'Grundlagen der Programmierung', t: 'Programmierparadigmen, Compiler, Interpreter und Linker',
  d: 'Ein **Programmierparadigma** ist ein grundlegender **Denkstil** beim Programmieren. **Imperative** Programmierung beschreibt **wie** etwas berechnet wird (Folge von Anweisungen; dazu gehören prozedural und objektorientiert), **deklarative** Programmierung beschreibt **was** das Ergebnis sein soll (funktional, logisch, SQL). Aus dem **Quellcode** entsteht ein ausführbares Programm durch **Compiler** und **Linker** oder er wird von einem **Interpreter** direkt ausgeführt; Java und C# nutzen **Bytecode** und eine virtuelle Maschine mit **JIT-Compiler**.',
  m: '**Imperativ = Kochrezept (Schritt für Schritt), deklarativ = Bestellung im Restaurant (was ich will).** Kette: **Quellcode, Compiler, Objektcode, Linker (+ Bibliotheken), ausführbares Programm.** **Strukturiert = Sequenz, Verzweigung, Schleife, kein goto.**',
  cheat: [
    ['Paradigmen', ['**Imperativ:** Anweisungsfolge, Variablen ändern Zustand (C, Pascal)', '**Prozedural:** imperativ, in Prozeduren/Funktionen zerlegt (C)', '**Objektorientiert:** Klassen, Objekte, Kapselung, Vererbung, Polymorphie (Java, C#)', '**Deklarativ:** beschreibt das Ergebnis (SQL, HTML)', '**Funktional:** alles ist Funktion, ohne Seiteneffekte, Lambda-Kalkül (Haskell, F#)', '**Logisch:** Fakten und Regeln (Prolog)']],
    ['Übersetzung', ['**Compiler:** übersetzt das ganze Programm vorab in Maschinencode (C, C++, Go)', '**Interpreter:** führt Zeile für Zeile zur Laufzeit aus (Python, JavaScript klassisch)', '**JIT:** Bytecode wird zur Laufzeit kompiliert (Java JVM, C# CLR)', '**Linker:** verbindet Objektdateien und Bibliotheken zur ausführbaren Datei']],
    ['Wahl der Sprache', ['Große Datenmengen analysieren: **Python** (pandas, NumPy)', 'Hardwarenah, Mikrocontroller: **C**', 'Plattformunabhängige Geschäftsanwendung: **Java** oder C#', 'Abfragen relationaler Datenbanken: **SQL**', 'Web-Frontend: JavaScript/TypeScript']],
  ],
  blocks: [
    ['h', 'Paradigmen im Überblick'],
    ['diagram', {w: 760, h: 250, cap: 'Einteilung der Programmierparadigmen. Moderne Sprachen sind oft multiparadigmatisch (Python, C#, Kotlin).', nodes: [
      {id: 'r', x: 380, y: 35, k: 'round', s: 'solid', t: 'Programmierparadigmen', w: 220},
      {id: 'i', x: 200, y: 115, k: 'round', s: 'accent', t: ['Imperativ', '(wie?)'], w: 150, h: 50},
      {id: 'd', x: 560, y: 115, k: 'round', s: 'accent', t: ['Deklarativ', '(was?)'], w: 150, h: 50},
      {id: 'p', x: 110, y: 205, k: 'round', s: 'soft', t: 'Prozedural', w: 140},
      {id: 'o', x: 280, y: 205, k: 'round', s: 'soft', t: 'Objektorientiert', w: 160},
      {id: 'f', x: 450, y: 205, k: 'round', s: 'soft', t: 'Funktional', w: 130},
      {id: 'l', x: 580, y: 205, k: 'round', s: 'soft', t: 'Logisch', w: 110},
      {id: 'q', x: 690, y: 205, k: 'round', s: 'soft', t: 'Abfrage (SQL)', w: 120},
    ], edges: [{a: 'r', b: 'i', ea: 'none'}, {a: 'r', b: 'd', ea: 'none'}, {a: 'i', b: 'p', ea: 'none'}, {a: 'i', b: 'o', ea: 'none'}, {a: 'd', b: 'f', ea: 'none'}, {a: 'd', b: 'l', ea: 'none'}, {a: 'd', b: 'q', ea: 'none'}]}],
    ['table', ['Paradigma', 'Kernidee', 'Beispielsprache'], [
      ['Imperativ', 'Ältestes Paradigma: Eine Folge von Befehlen gibt vor, was der Computer nacheinander tun soll; basiert auf Kontrollstrukturen', 'C, Assembler, Pascal'],
      ['Prozedural', 'Zerlegt ein Programm in Unterprogramme (Prozeduren, Funktionen), die aufgerufen werden', 'C, Pascal'],
      ['Objektorientiert', 'Bildet die Wirklichkeit mit Klassen und Objekten ab, die Daten und Verhalten bündeln', 'Java, C#, C++'],
      ['Deklarativ', 'Beschreibt das Problem bzw. das gewünschte Ergebnis (das "Was"); die Umsetzung erledigt das System', 'SQL, HTML, Prolog'],
      ['Funktional', 'Basiert auf dem mathematischen Lambda-Kalkül: Alles wird durch Funktionen ausgedrückt, ohne veränderliche Zustände', 'Haskell, F#, Lisp'],
    ]],
    ['codes', [
      ['java', `// Imperativ: WIE wird summiert?
int summe = 0;
for (int p : preise) {
    if (p > 100) summe += p;
}`],
      ['java', `// Funktional (Java Streams): WAS wird berechnet?
int summe = preise.stream()
                  .filter(p -> p > 100)
                  .mapToInt(Integer::intValue)
                  .sum();`],
      ['sql', `-- Deklarativ: nur das gewünschte Ergebnis
SELECT SUM(preis) FROM artikel WHERE preis > 100;`],
    ]],
    ['h', 'Vom Quellcode zum Programm'],
    ['diagram', {w: 780, h: 240, cap: 'Compiler und Linker: Der Compiler erzeugt Objektcode, der Linker bindet Bibliotheken ein und erzeugt das ausführbare Programm.', nodes: [
      {id: 'q', x: 80, y: 120, k: 'note', s: 'plain', t: ['Quellcode', '(main.c)'], w: 120, h: 60},
      {id: 'c', x: 240, y: 120, k: 'round', s: 'solid', t: 'Compiler', w: 120},
      {id: 'o', x: 400, y: 120, k: 'note', s: 'soft', t: ['Objektcode', '(main.o)'], w: 120, h: 60},
      {id: 'l', x: 560, y: 120, k: 'round', s: 'solid', t: 'Linker', w: 110},
      {id: 'b', x: 560, y: 30, k: 'cyl', s: 'accent', t: ['Bibliothek', '(libc)'], w: 120, h: 50},
      {id: 'e', x: 710, y: 120, k: 'round', s: 'ok', t: ['ausführbares', 'Programm'], w: 120, h: 60},
      {id: 'pre', x: 240, y: 205, k: 'text', t: 'vorher: Präprozessor (#include)', fs: 11},
    ], edges: [{a: 'q', b: 'c'}, {a: 'c', b: 'o'}, {a: 'o', b: 'l'}, {a: 'b', b: 'l'}, {a: 'l', b: 'e'}]}],
    ['table', ['', 'Compiler', 'Interpreter', 'Bytecode + JIT'], [
      ['Wann wird übersetzt?', 'Einmal vor der Ausführung', 'Zeile für Zeile während der Ausführung', 'Erst in Bytecode, zur Laufzeit in Maschinencode'],
      ['Geschwindigkeit', 'sehr schnell', 'langsamer', 'schnell nach dem Aufwärmen'],
      ['Fehler', 'Syntaxfehler vor dem Start', 'erst wenn die Zeile ausgeführt wird', 'Syntax vorab, Rest zur Laufzeit'],
      ['Portabilität', 'je Plattform neu kompilieren', 'überall, wo der Interpreter läuft', '"Write once, run anywhere" (JVM, CLR)'],
      ['Beispiele', 'C, C++, Rust, Go', 'Python, PHP, Bash', 'Java, C#, Kotlin'],
    ], {first: true}],
    ['note', 'Bei **dynamischen Bibliotheken** (DLL unter Windows, .so unter Linux) bindet nicht der Linker, sondern das Betriebssystem den Code erst beim Programmstart ein. Vorteil: kleinere Programme, Bibliothek zentral aktualisierbar.'],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Beschreiben Sie die Paradigmen imperativ, prozedural, deklarativ, funktional und objektorientiert in Stichworten und nennen Sie je eine Beispielsprache.', ['- **Imperativ:** Folge von Anweisungen, die den Zustand ändern; Kontrollstrukturen. Beispiel: C.', '- **Prozedural:** imperativ, Programm in aufrufbare Prozeduren zerlegt. Beispiel: Pascal, C.', '- **Deklarativ:** beschreibt das gewünschte Ergebnis, nicht den Weg. Beispiel: SQL.', '- **Funktional:** basiert auf dem Lambda-Kalkül, alles sind Funktionen ohne Seiteneffekte. Beispiel: Haskell.', '- **Objektorientiert:** Klassen und Objekte bilden die Wirklichkeit ab, Kapselung, Vererbung, Polymorphie. Beispiel: Java.'], 5],
    ['qa', 'Ordnen Sie die Komponenten Quellcode, Compiler, Objektcode, Bibliothek, Linker und ausführbares Programm in der richtigen Reihenfolge an.', 'Quellcode, **Compiler**, Objektcode; Objektcode und **Bibliothek** gehen in den **Linker**; daraus entsteht das ausführbare Programm.', 3],
    ['qa', 'Ordnen Sie den Szenarien eine Sprache zu (Java, C, SQL, Python): (a) Analyse großer Datenmengen, (b) Firmware für einen Mikrocontroller, (c) Abfrage von Tabellen, (d) plattformunabhängige Desktopanwendung.', ['- (a) **Python** (Bibliotheken wie pandas, NumPy)', '- (b) **C** (hardwarenah, wenig Speicher)', '- (c) **SQL**', '- (d) **Java** (JVM auf vielen Plattformen)'], 4],
    ['see', ['eua-datentypen', 'eua-oop', 'eua-funktionen', 'ps-ide']],
    ['quiz', [
      {q: 'Welches Paradigma beschreibt das Ergebnis statt des Lösungswegs?', o: ['Deklarativ', 'Imperativ', 'Prozedural', 'Strukturiert'], a: 0, e: 'Zum Beispiel SQL: Man sagt, was man haben will.'},
      {q: 'Worauf basiert die funktionale Programmierung?', o: ['Lambda-Kalkül', 'Kontrollstrukturen mit goto', 'Klassen und Objekten', 'Tabellen'], a: 0, e: 'Funktionen sind zentrale Bausteine, ohne veränderliche Zustände.'},
      {q: 'Was macht der Linker?', o: ['Verbindet Objektcode und Bibliotheken zum ausführbaren Programm', 'Übersetzt Quellcode in Objektcode', 'Führt Python-Code zeilenweise aus', 'Prüft die Rechtschreibung'], a: 0, e: 'Der Compiler erzeugt den Objektcode, der Linker bindet zusammen.'},
      {q: 'Welche Sprache wird typischerweise interpretiert?', o: ['Python', 'C', 'C++', 'Rust'], a: 0, e: 'CPython übersetzt intern in Bytecode, führt aber ohne separaten Kompilierschritt aus.'},
      {q: 'Was ist ein JIT-Compiler?', o: ['Er übersetzt Bytecode zur Laufzeit in Maschinencode', 'Er übersetzt nur Kommentare', 'Er ersetzt den Linker', 'Er ist ein Debugger'], a: 0, e: 'Just-in-time, zum Beispiel in der JVM oder CLR.'},
      {q: 'Was gehört zur strukturierten Programmierung?', o: ['Sequenz, Verzweigung und Schleife statt goto', 'Nur Klassen und Vererbung', 'Lambda-Ausdrücke', 'Datenbanktabellen'], a: 0, e: 'Sie beinhaltet die prozedurale, nicht die objektorientierte Programmierung.'},
      {q: 'Ist objektorientierte Programmierung deklarativ?', o: ['Nein, sie ist imperativ', 'Ja, immer', 'Nur in Java', 'Nur mit SQL'], a: 0, e: 'OOP gehört zur imperativen Familie.'},
    ]],
  ],
});
