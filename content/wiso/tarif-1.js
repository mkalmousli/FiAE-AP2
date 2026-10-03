AP2.page('wiso-tarif', {
  b: 'wiso', g: 'Tarifrecht und Mitbestimmung', t: 'Tarifvertrag, Tarifautonomie und Tarifverhandlung',
  d: 'Ein **Tarifvertrag** wird zwischen **Gewerkschaften** und **Arbeitgeberverbänden** (oder einzelnen Arbeitgebern) ausgehandelt und regelt **Arbeitsbedingungen** (Löhne, Arbeitszeit, Urlaub) **verbindlich** für die Mitglieder. Die **Tarifautonomie** (Art. 9 Abs. 3 GG) bedeutet: Die **Tarifparteien** verhandeln **frei und ohne Eingriff des Staates**. Es gilt das **Günstigkeitsprinzip**: Der Arbeitsvertrag darf vom Tarifvertrag nur **zugunsten** des Arbeitnehmers abweichen.',
  m: '**Tarifautonomie = der Staat hält sich raus.** Parteien: **Gewerkschaft** (AN-Seite) und **Arbeitgeberverband** (AG-Seite). Tarifvertrag gilt für **Mitglieder** (Tarifbindung), für **alle** nur bei **Allgemeinverbindlichkeit**. **Günstigkeitsprinzip: Besser als Tarif geht immer, schlechter nicht.** **Friedenspflicht** während der Laufzeit.',
  cheat: [
    ['Begriffe', ['**Tarifvertragsparteien:** Gewerkschaft, Arbeitgeberverband/Arbeitgeber', '**Tarifautonomie:** freie Aushandlung (**Art. 9 Abs. 3 GG**)', '**Koalitionsfreiheit:** Recht, Verbände zu gründen und beizutreten', '**Tarifbindung:** gilt für Mitglieder beider Seiten']],
    ['Arten', ['**Manteltarifvertrag:** allgemeine Bedingungen (Arbeitszeit, Urlaub, Kündigung)', '**Entgelttarifvertrag (Lohn-, Gehaltstarifvertrag):** Höhe der Vergütung', '**Rahmentarifvertrag:** Eingruppierung', '**Haus-/Firmentarifvertrag:** mit einem Unternehmen', '**Flächentarifvertrag:** für Branche/Region']],
    ['Wirkung', ['**Unmittelbar und zwingend** für Tarifgebundene', '**Günstigkeitsprinzip**', '**Allgemeinverbindlichkeit:** auf Antrag vom Arbeitsministerium auf alle der Branche erweitert', '**Nachwirkung** nach Ablauf bis neue Regelung']],
    ['Friedenspflicht', ['Während der Laufzeit **kein Arbeitskampf** über tariflich Geregeltes', 'Nach Ablauf: **Warnstreiks** und Streiks zulässig', 'Streik nur von **Gewerkschaften** getragen']],
  ],
  blocks: [
    ['h', 'Was ist ein Tarifvertrag?'],
    ['p', 'Ein einzelner Arbeitnehmer verhandelt über Lohn und Urlaub **allein** mit einem mächtigen Arbeitgeber, das ist ein **Machtungleichgewicht**. Deshalb schließen sich Arbeitnehmer in **Gewerkschaften** zusammen und handeln für **alle Mitglieder gemeinsam** mit den **Arbeitgeberverbänden** einen **Tarifvertrag** aus. Er legt **Mindestbedingungen** fest, die der Arbeitsvertrag **nicht unterschreiten** darf (**Schutzfunktion**). Zugleich schafft er **Ordnung** (gleiche Bedingungen in der Branche) und **Frieden** (keine Streiks während der Laufzeit).'],
    ['diagram', {w: 760, h: 270, keep: 600, cap: 'Das Normengefüge im Arbeitsrecht: Von oben nach unten ist die Regelung jeweils spezieller. Eine untere Regel darf nur zugunsten des Arbeitnehmers abweichen (Günstigkeitsprinzip).', nodes: [
      {id: 'g', k: 'box', x: 380, y: 30, w: 380, h: 40, t: 'Gesetze (GG, BGB, BUrlG, ArbZG, KSchG)', s: 'solid'}, {id: 't', k: 'box', x: 380, y: 85, w: 340, h: 40, t: 'Tarifvertrag', s: 'accent'}, {id: 'bv', k: 'box', x: 380, y: 140, w: 300, h: 40, t: 'Betriebsvereinbarung', s: 'accent'}, {id: 'av', k: 'box', x: 380, y: 195, w: 260, h: 40, t: 'Arbeitsvertrag', s: 'ok'}, {id: 'wr', k: 'box', x: 380, y: 250, w: 220, h: 36, t: 'Direktionsrecht (Weisung)', s: 'soft', fs: 12},
    ], edges: [{a: 'g', b: 't', t: 'zwingend', lo: [60, 0]}, {a: 't', b: 'bv'}, {a: 'bv', b: 'av'}, {a: 'av', b: 'wr'}]}],
    ['table', ['Quelle', 'Wer legt sie fest?', 'Gilt für'], [['**Gesetz**', 'Staat (Parlament)', 'Alle (zwingende Mindeststandards)'], ['**Tarifvertrag**', 'Gewerkschaft und Arbeitgeberverband', 'Mitglieder (Tarifbindung), oder alle bei Allgemeinverbindlichkeit'], ['**Betriebsvereinbarung**', 'Arbeitgeber und Betriebsrat', 'Alle Arbeitnehmer des Betriebs'], ['**Arbeitsvertrag**', 'Arbeitgeber und Arbeitnehmer', 'Die Vertragsparteien'], ['**Weisung (Direktionsrecht)**', 'Arbeitgeber', 'Einzelfall im Rahmen der oberen Regeln']]],
    ['h', 'Tarifautonomie und Koalitionsfreiheit'],
    ['p', 'Artikel **9 Absatz 3 des Grundgesetzes** garantiert jedem das Recht, **Vereinigungen zur Wahrung und Förderung der Arbeits- und Wirtschaftsbedingungen** zu bilden (**Koalitionsfreiheit**). Daraus folgt die **Tarifautonomie**: Die Tarifparteien regeln Löhne und Arbeitsbedingungen **selbst** durch Tarifverträge, **ohne** dass der Staat Löhne festsetzt. Zur Koalitionsfreiheit gehört auch das Recht, **nicht beizutreten (negative Koalitionsfreiheit)** und das Recht auf **Arbeitskampf** als letztes Mittel.'],
    ['h', 'Inhalt eines Tarifvertrags'],
    ['kv', [
      ['Normativer Teil', 'Regelt **Inhalt, Abschluss und Beendigung** der Arbeitsverhältnisse (**Löhne**, Arbeitszeit, Urlaub, Zuschläge, Kündigungsfristen). Wirkt **unmittelbar und zwingend** wie ein Gesetz.'],
      ['Schuldrechtlicher Teil', 'Rechte und Pflichten der **Tarifparteien untereinander**, vor allem die **Friedenspflicht** (kein Streik während der Laufzeit) und die **Durchführungspflicht**.'],
      ['Laufzeit', 'Üblich 12 bis 36 Monate. Danach **Nachwirkung**: Die Regeln gelten **weiter**, bis sie durch eine andere Abmachung ersetzt werden.'],
      ['Eingruppierung', 'Einordnung der Tätigkeit in **Entgeltgruppen** nach Qualifikation und Anforderungen (zum Beispiel E9 bis E12).'],
    ]],
  ],
});
