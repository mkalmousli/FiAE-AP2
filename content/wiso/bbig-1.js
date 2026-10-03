AP2.page('wiso-bbig', {
  b: 'wiso', g: 'Ausbildung und Beruf', t: 'Berufsbildungsgesetz (BBiG): Rechte und Pflichten',
  d: 'Das **Berufsbildungsgesetz (BBiG)** regelt die **duale Berufsausbildung** in Deutschland: Ausbildung im **Betrieb** (Praxis) und in der **Berufsschule** (Theorie). Es legt **Rechte und Pflichten** von **Auszubildenden** und **Ausbildenden** fest, den **Ausbildungsvertrag**, die **Probezeit**, die **Vergütung**, die **Beendigung** und die **Prüfungen**.',
  m: '**Azubi: lernen, Berufsschule, Weisungen, Schweigen, Berichtsheft, Sorgfalt (L-B-W-S-B-S).** **Ausbilder: ausbilden, Mittel stellen, freistellen, Berichtsheft prüfen, nur ausbildungsgemäße Aufgaben.** Duales System = **zwei Lernorte**.',
  cheat: [
    ['Duales System', ['**Betrieb** (praktisch) + **Berufsschule** (theoretisch)', 'Ausbildungsordnung (**Bund**) und Rahmenlehrplan (**Länder**)', 'Dauer 2 bis 3,5 Jahre (FiAE: **3 Jahre**)', 'Prüfung durch die **zuständige Stelle** (IHK)']],
    ['Pflichten des Azubis (§ 13)', ['**Lernpflicht** (Fertigkeiten erwerben)', '**Berufsschule und Prüfungen** besuchen', '**Weisungen** der Ausbilder befolgen', '**Betriebsordnung** beachten, Sorgfalt mit Arbeitsmitteln', '**Verschwiegenheit** (Betriebsgeheimnisse)', '**Berichtsheft** (Ausbildungsnachweis) führen']],
    ['Pflichten des Ausbilders (§ 14)', ['Ausbildungsziel **vermitteln** (Plan)', '**Kostenlos** Ausbildungsmittel stellen', 'Zum **Berufsschulbesuch** anhalten und **freistellen**', 'Nur **ausbildungsgemäße** Aufgaben, körperlich angemessen', 'Berichtsheft **durchsehen**, Zeugnis ausstellen']],
    ['Gesetze', ['**BBiG** (Berufsbildung)', '**JArbSchG** (unter 18)', '**BetrVG**, **BUrlG**, **EntgFG**', '**ArbZG** (für Erwachsene)']],
  ],
  blocks: [
    ['h', 'Die duale Berufsausbildung'],
    ['p', 'In Deutschland lernt man einen Beruf **an zwei Lernorten**: **im Ausbildungsbetrieb** (praktische Arbeit, etwa 3 bis 4 Tage pro Woche) und **in der Berufsschule** (Fachtheorie und Allgemeinbildung). Die Ausbildung ist **staatlich geregelt**: Der **Bund** erlässt für jeden anerkannten Ausbildungsberuf eine **Ausbildungsordnung** (zum Beispiel für Fachinformatiker). Darin stehen Dauer, Berufsbild, **Ausbildungsrahmenplan** und Prüfungsanforderungen. Die **Länder** legen den **Rahmenlehrplan** für die Berufsschule fest.'],
    ['diagram', {w: 760, h: 240, keep: 600, cap: 'Das duale System: Zwei Lernorte, zwei Regelwerke, eine Prüfung.', nodes: [
      {id: 'az', k: 'round', x: 380, y: 120, t: ['Auszubildende/r', 'Fachinformatiker/in'], w: 190, h: 60, s: 'solid'}, {id: 'bt', k: 'round', x: 130, y: 120, t: ['Ausbildungsbetrieb', 'Praxis, Vergütung'], w: 190, h: 60, s: 'accent'}, {id: 'bs', k: 'round', x: 630, y: 120, t: ['Berufsschule', 'Theorie'], w: 190, h: 60, s: 'accent'},
      {id: 'bund', k: 'round', x: 130, y: 36, t: 'Bund: Ausbildungsordnung, BBiG', w: 230, h: 36, s: 'soft', fs: 12}, {id: 'land', k: 'round', x: 630, y: 36, t: 'Länder: Rahmenlehrplan, Schulgesetz', w: 250, h: 36, s: 'soft', fs: 12}, {id: 'ihk', k: 'round', x: 380, y: 210, t: 'IHK: Überwachung und Prüfung', w: 250, h: 36, s: 'ok', fs: 12},
    ], edges: [{a: 'az', b: 'bt', ea: 'none'}, {a: 'az', b: 'bs', ea: 'none'}, {a: 'bund', b: 'bt', ea: 'none', k: 'dash'}, {a: 'land', b: 'bs', ea: 'none', k: 'dash'}, {a: 'ihk', b: 'az', ea: 'none', k: 'dash'}]}],
    ['table', ['', 'Betrieb', 'Berufsschule'], [['Lerninhalt', 'Praktische Fertigkeiten, betriebliche Abläufe', 'Fachtheorie und Allgemeinbildung (Deutsch, Wirtschaft, Englisch)'], ['Grundlage', 'Ausbildungsordnung, Ausbildungsrahmenplan', 'Rahmenlehrplan der Länder'], ['Zuständig', 'Bund (BBiG), IHK überwacht', 'Länder (Kultusministerium)'], ['Beteiligte', 'Ausbilder, Ausbildender (Unternehmen)', 'Lehrer'], ['Bezahlung', 'Ausbildungsvergütung vom Betrieb', 'Kostenlos (öffentliche Schule)']]],
    ['h', 'Wichtige Begriffe'],
    ['kv', [
      ['Ausbildende(r)', 'Das **Unternehmen** (Vertragspartner des Azubis), das den Ausbildungsvertrag abschließt.'],
      ['Ausbilder/in', 'Die **Person**, die die Ausbildung **konkret durchführt** (fachlich und persönlich geeignet, Ausbildereignungsprüfung AEVO).'],
      ['Auszubildende(r)', 'Wer eine Berufsausbildung macht. Fachinformatiker/in Anwendungsentwicklung: **3 Jahre**.'],
      ['Zuständige Stelle', 'Überwacht die Ausbildung und führt Prüfungen durch. Für IT-Berufe: die **IHK** (Industrie- und Handelskammer).'],
      ['Ausbildungsberater', 'Mitarbeiter der IHK, der Betriebe und Azubis bei Fragen und Konflikten berät.'],
      ['Ausbildungsnachweis (Berichtsheft)', 'Nachweis der Tätigkeiten, **Zulassungsvoraussetzung** zur Abschlussprüfung. Während der Ausbildungszeit führen (Zeit dafür einräumen).'],
    ]],
  ],
});
