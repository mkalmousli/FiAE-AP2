AP2.page('wiso-staat', {
  b: 'wiso', g: 'Staat und Gesellschaft', t: 'Staatsaufbau und Sozialstaat',
  d: 'Deutschland ist nach dem **Grundgesetz (Art. 20 GG)** eine **demokratische, soziale, föderale Republik** (Rechtsstaat). **Gewaltenteilung:** **Legislative** (Bundestag, Bundesrat), **Exekutive** (Regierung, Verwaltung), **Judikative** (Gerichte). Der **Sozialstaat** sichert Menschen in Notlagen ab (Sozialversicherung, Sozialhilfe).',
  m: '**Drei Gewalten: Gesetze machen, ausführen, Recht sprechen.** Staatsprinzipien (Art. 20): **Republik, Demokratie, Bundesstaat, Rechtsstaat, Sozialstaat.**',
  cheat: [
    ['Gewaltenteilung', ['**Legislative:** Bundestag (Gesetze), Bundesrat (Länder)', '**Exekutive:** Bundesregierung, Kanzler, Behörden', '**Judikative:** Gerichte, Bundesverfassungsgericht']],
    ['Organe', ['**Bundespräsident:** Staatsoberhaupt, repräsentativ', '**Bundeskanzler:** Richtlinienkompetenz, vom Bundestag gewählt', '**Bundesverfassungsgericht:** Karlsruhe, prüft Gesetze', '**Wahlen:** allgemein, unmittelbar, frei, gleich, geheim']],
    ['Sozialstaat', ['**Versicherungsprinzip:** Beiträge (SV)', '**Versorgungsprinzip:** Staat (Beamte, Kindergeld)', '**Fürsorgeprinzip:** Bedürftigkeit (Bürgergeld)', '**Solidarprinzip, Subsidiarität**']],
  ],
  blocks: [
    ['h', 'Gewaltenteilung'],
    ['diagram', {w: 760, h: 220, keep: 560, cap: 'Gewaltenteilung im Bundesstaat Deutschland', nodes: [
      {id: 'v', k: 'round', x: 380, y: 28, t: 'Volk (Wahlen)', w: 160, h: 38, s: 'solid'},
      {id: 'l', k: 'round', x: 130, y: 120, t: ['Legislative', 'Bundestag, Bundesrat'], w: 200, h: 60, s: 'accent'},
      {id: 'e', k: 'round', x: 380, y: 120, t: ['Exekutive', 'Regierung, Verwaltung'], w: 200, h: 60, s: 'accent'},
      {id: 'j', k: 'round', x: 630, y: 120, t: ['Judikative', 'Gerichte, BVerfG'], w: 200, h: 60, s: 'accent'},
    ], edges: [{a: 'v', b: 'l'}, {a: 'v', b: 'e'}, {a: 'v', b: 'j', k: 'dash'}]}],
    ['table', ['Gewalt', 'Aufgabe', 'Organe'], [['**Legislative**', 'Gesetze beschließen', 'Bundestag, Bundesrat, Landtage'], ['**Exekutive**', 'Gesetze ausführen', 'Bundesregierung, Ministerien, Behörden, Polizei'], ['**Judikative**', 'Recht sprechen', 'Amts-, Land-, Arbeits-, Sozialgerichte, BVerfG']]],
    ['kv', [
      ['Föderalismus', 'Bund und **16 Länder** teilen sich Aufgaben. Länder: Bildung, Polizei; Bund: Verteidigung, Außenpolitik. Der **Bundesrat** vertritt die Länder.'],
      ['Wahlgrundsätze (Art. 38 GG)', '**allgemein, unmittelbar, frei, gleich, geheim.** Wahl alle 4 Jahre, Mindestalter 18.'],
      ['Grundrechte', 'Art. 1 bis 19 GG, zum Beispiel **Menschenwürde**, Freiheit, Gleichheit, Meinungsfreiheit, Berufsfreiheit, **Koalitionsfreiheit (Art. 9)**. Bindend für den Staat.'],
      ['Rechtsstaat', 'Staat handelt nur **auf gesetzlicher Grundlage**; Gerichte kontrollieren ihn.'],
    ]],
    ['h', 'Sozialstaat: Prinzipien'],
    ['table', ['Prinzip', 'Bedeutung', 'Beispiel'], [['**Versicherung**', 'Beiträge sichern Leistung bei Risiko', 'Kranken-, Renten-, Arbeitslosen-, Pflege-, Unfallversicherung'], ['**Versorgung**', 'Staat zahlt aus Steuern für bestimmte Gruppen', 'Beamtenpension, Kindergeld, Elterngeld'], ['**Fürsorge**', 'Hilfe bei Bedürftigkeit (Steuern)', 'Bürgergeld, Sozialhilfe, Wohngeld'], ['**Solidarprinzip**', 'Starke helfen Schwachen', 'Einkommensabhängige Beiträge, beitragsfreie Familienversicherung'], ['**Subsidiarität**', 'Erst Selbsthilfe, dann Familie, dann Staat', 'Vorrang eigener Vorsorge']]],
    ['qa', 'Nennen Sie die drei Gewalten und je ein Organ.', ['- Legislative: Bundestag', '- Exekutive: Bundesregierung', '- Judikative: Bundesverfassungsgericht'], 3],
    ['qa', 'Erklären Sie das Solidarprinzip an einem Beispiel.', 'Beiträge richten sich nach dem **Einkommen**, Leistungen nach dem **Bedarf**. Beispiel: In der GKV zahlen Besserverdiener höhere Beiträge, alle erhalten die gleichen Leistungen; Kinder sind beitragsfrei mitversichert.', 4],
    ['quiz', [
      {q: 'Welche Gewalt spricht Recht?', o: ['Judikative', 'Legislative', 'Exekutive', 'Bundesrat'], a: 0, e: 'Die Gerichte.'},
      {q: 'Wer vertritt die Länder auf Bundesebene?', o: ['Bundesrat', 'Bundestag', 'Bundespräsident', 'Bundesverfassungsgericht'], a: 0, e: 'Der Bundesrat.'},
      {q: 'Welches Prinzip gilt für Bürgergeld?', o: ['Fürsorge', 'Versicherung', 'Versorgung', 'Subvention'], a: 0, e: 'Bedürftigkeitsgeprüft aus Steuern.'},
    ]],
  ],
});
