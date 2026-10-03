AP2.page('de-sprache', {
  b: 'de', g: 'Sprache', t: 'Sprachrichtigkeit: Zeiten, Konjunktiv und Rechtschreibung',
  d: '**Sprachrichtigkeit** umfasst **Grammatik, Rechtschreibung und Zeichensetzung**. Wichtig im Beruf: **Zeitformen** (Präsens, Perfekt, Präteritum), der **Konjunktiv** (I für indirekte Rede, II für Wunsch/Höflichkeit), **Groß- und Kleinschreibung**, **das/dass**, **Kommaregeln**.',
  m: '**Konjunktiv I = indirekte Rede (er sei, er habe). Konjunktiv II = Möglichkeit, Höflichkeit (wäre, hätte, würde).** **dass = Konjunktion, das = Artikel/Pronomen (ersetzbar durch dieses/welches).** **Nomen großschreiben.**',
  cheat: [
    ['Konjunktiv', ['**K I:** Er sagt, er **sei** krank. (indirekte Rede)', '**K II:** Wenn ich Zeit **hätte**, **käme** ich. (irreal)', '**Höflich:** Könnten Sie ...? Hätten Sie ...?', 'K II mit "würde" bei Unklarheit']],
    ['das / dass', ['**das:** Artikel/Pronomen, ersetzbar durch "dieses/welches"', '**dass:** Konjunktion (Ich weiß, dass ...)', 'Probe: ersetzen']],
    ['Komma', ['**Nebensätze** (dass, weil, wenn, obwohl)', '**Aufzählungen**', '**Relativsätze**', '**Infinitivgruppen** (oft optional)']],
  ],
  blocks: [
    ['h', 'Zeiten'],
    ['table', ['Zeit', 'Bildung', 'Gebrauch', 'Beispiel'], [['**Präsens**', 'Stamm + Endung', 'Gegenwart, allgemein', 'Er arbeitet.'], ['**Perfekt**', 'haben/sein + Partizip II', 'Gesprochene Sprache', 'Er hat gearbeitet.'], ['**Präteritum**', 'Imperfekt', 'Schriftlich, Bericht', 'Er arbeitete.'], ['**Plusquamperfekt**', 'hatte/war + Partizip II', 'Vorvergangenheit', 'Er hatte gearbeitet.'], ['**Futur I**', 'werden + Infinitiv', 'Zukunft', 'Er wird arbeiten.']]],
    ['h', 'Konjunktiv'],
    ['table', ['Form', 'Verwendung', 'Beispiel'], [['**Konjunktiv I**', 'Indirekte Rede', 'Der Chef sagt, er **habe** keine Zeit.'], ['**Konjunktiv II**', 'Wunsch, Irreales, Höflichkeit', 'Ich **wäre** gern pünktlich. **Könnten** Sie mir helfen?'], ['**würde-Form**', 'Ersatz bei unklaren Formen', 'Ich **würde** gehen.']]],
    ['ex', ['**Direkte Rede:** Er sagte: "Ich bin krank." **Indirekte Rede:** Er sagte, er **sei** krank. Bei gleicher Form (wir haben) nimmt man K II: Sie sagten, sie **hätten** keine Zeit.']],
    ['h', 'Wichtige Rechtschreibregeln'],
    ['table', ['Regel', 'Beispiel'], [['**Nomen groß**, auch Substantivierungen', 'das Lernen, etwas Neues'], ['**ss/ß:** ß nach langem Vokal/Diphthong', 'Straße, aber Fluss'], ['**das/dass**', 'Ich weiß, dass das Programm läuft.'], ['**seid/seit**', 'Ihr seid hier. Seit Montag ...'], ['**Komma vor Nebensatz**', 'Er kommt, weil er Zeit hat.'], ['**Zusammenschreibung**', 'zurzeit, infolgedessen']]],
    ['qa', 'Wann verwendet man Konjunktiv I?', 'In der **indirekten Rede**, um **Aussagen anderer** wiederzugeben, ohne sie zu bestätigen. Beispiel: Die Chefin sagt, sie **sei** im Urlaub.', 3],
    ['qa', 'Setzen Sie ein: "Ich weiß, ... ... Programm läuft."', 'Ich weiß, **dass das** Programm läuft. (dass = Konjunktion, das = Artikel)', 3],
    ['quiz', [
      {q: 'Welche Form ist Konjunktiv I?', o: ['er sei', 'er war', 'er wäre', 'er ist'], a: 0, e: 'sei = K I von sein.'},
      {q: 'Welcher Satz ist richtig?', o: ['Ich hoffe, dass es klappt.', 'Ich hoffe, das es klappt.', 'Ich hoffe das, es klappt.', 'Ich hoffe das es klappt.'], a: 0, e: 'Konjunktion dass.'},
    ]],
  ],
});
