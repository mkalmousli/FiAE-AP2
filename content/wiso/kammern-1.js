AP2.page('wiso-kammern', {
  b: 'wiso', g: 'Ausbildung und Beruf', t: 'IHK, Handwerkskammer und andere Kammern',
  d: '**Kammern** (zum Beispiel **IHK**, **Handwerkskammer**) sind **Körperschaften des öffentlichen Rechts** mit **Pflichtmitgliedschaft** der jeweiligen Berufsgruppe. Sie sind die **Selbstverwaltung der Wirtschaft** und übernehmen **hoheitliche Aufgaben** wie **Überwachung der Berufsausbildung**, **Abnahme von Prüfungen** und **Interessenvertretung**. Die IHK ist für **Industrie, Handel und Dienstleistungen** zuständig, die **Handwerkskammer** für das **Handwerk**.',
  m: '**IHK = Industrie, Handel, Dienstleistung (auch IT!). HWK = Handwerk.** Die Kammer ist **zuständige Stelle** für Ausbildung: **berät, überwacht, prüft, trägt ein.** Pflichtmitglied = jedes Unternehmen im Bezirk (Gewerbesteuerpflichtig).',
  cheat: [
    ['Rechtsform', ['**Körperschaft des öffentlichen Rechts**', '**Pflichtmitgliedschaft** (Unternehmen im Bezirk)', 'Finanzierung durch **Beiträge** (Umlage, Grundbeitrag)', '**Selbstverwaltung**, Staat führt Rechtsaufsicht']],
    ['Wichtige Kammern', ['**IHK:** Industrie, Handel, Dienstleistung, IT', '**HWK:** Handwerk', '**Landwirtschaftskammer**', 'Freie Berufe: **Ärzte-, Anwalts-, Steuerberaterkammer**']],
    ['Aufgaben bei der Ausbildung', ['**Beraten** Betriebe und Azubis (Ausbildungsberater)', '**Überwachen** der Eignung von Betrieb und Ausbilder', '**Eintragen** der Ausbildungsverträge', '**Prüfungen** abnehmen (Prüfungsausschüsse)', 'Schlichtung von Streitigkeiten']],
    ['Weitere Aufgaben', ['**Interessenvertretung** gegenüber Politik', 'Information und Beratung (Existenzgründung, Außenhandel)', 'Gutachter/Sachverständige', 'Weiterbildung (IHK-Bildungshäuser)', 'Handelsregister-Informationen']],
  ],
  blocks: [
    ['h', 'Was ist eine Kammer?'],
    ['p', 'In Deutschland organisiert die Wirtschaft viele öffentliche Aufgaben **selbst**, statt dass alles der Staat macht. Dafür gibt es **Kammern**: Wer ein Unternehmen im Kammerbezirk betreibt, ist **Pflichtmitglied** (zum Beispiel jeder Betrieb mit Gewerbeanmeldung in der IHK, Handwerker in der Handwerkskammer). Die Kammern bekommen vom Staat bestimmte Aufgaben **übertragen**, werden aber von den Mitgliedern **demokratisch verwaltet** (Vollversammlung wird von den Mitgliedern gewählt). Die Mitglieder finanzieren sie über **Beiträge**.'],
    ['table', ['Kammer', 'Zuständig für', 'Beispiel-Mitglieder', 'Besonderheit'], [
      ['**Industrie- und Handelskammer (IHK)**', 'Industrie, Handel, Dienstleistung, Banken, Versicherungen, IT', 'Softwarehaus, Autohaus, Hotel, Bank', 'Zuständige Stelle für **IT-Berufe** (Fachinformatiker)'],
      ['**Handwerkskammer (HWK)**', 'Handwerksbetriebe (Anlage A und B der Handwerksordnung)', 'Elektriker, Bäcker, Kfz-Mechatroniker', 'Führt die **Handwerksrolle**, Meisterprüfung'],
      ['Landwirtschaftskammer', 'Landwirtschaft, Gartenbau', 'Landwirte, Gärtner', ''],
      ['Kammern der freien Berufe', 'Ärzte, Rechtsanwälte, Steuerberater, Architekten', 'Zahnärztin, Anwalt', 'Regeln **Berufsrecht**, Zulassung, Aufsicht'],
    ]],
    ['h', 'Aufgaben der IHK'],
    ['kv', [
      ['Berufsausbildung', 'Als **zuständige Stelle** nach BBiG: **Eignung** der Ausbildungsstätte und der Ausbilder **prüfen**, **Ausbildungsverträge eintragen**, **Ausbildungsberater** (kostenlos für Betriebe und Azubis), **Prüfungsausschüsse** bilden, **Zwischen- und Abschlussprüfungen** durchführen, **Zeugnisse** ausstellen.'],
      ['Weiterbildung', 'Fortbildungsabschlüsse (zum Beispiel **Fachwirt**, **Betriebswirt**, **Ausbilder-Eignung**), Kurse und Seminare.'],
      ['Interessenvertretung', 'Vertritt die **Gesamtinteressen der Wirtschaft** gegenüber Politik und Verwaltung (Stellungnahmen zu Gesetzen).'],
      ['Beratung', 'Existenzgründung, Unternehmensnachfolge, Außenwirtschaft (Ursprungszeugnisse), Recht und Steuern, Innovation, Digitalisierung.'],
      ['Verwaltungsaufgaben', 'Ausstellen von Bescheinigungen, Sachverständigenbestellung, Mitwirkung beim Handelsregister, Gewerbeinformation.'],
    ]],
    ['diagram', {w: 760, h: 270, keep: 600, cap: 'Die IHK als zuständige Stelle: Sie steht zwischen Betrieb, Azubi und Berufsschule und verbindet sie mit der Prüfung.', nodes: [
      {id: 'ihk', k: 'round', x: 380, y: 60, t: ['IHK', 'zuständige Stelle'], w: 200, h: 60, s: 'solid'}, {id: 'b', k: 'round', x: 110, y: 190, t: ['Ausbildungsbetrieb', 'Eignung prüfen'], w: 180, h: 54, s: 'accent'}, {id: 'a', k: 'round', x: 380, y: 200, t: ['Azubi', 'Vertrag eintragen'], w: 150, h: 54, s: 'accent'}, {id: 'p', k: 'round', x: 650, y: 190, t: ['Prüfungsausschuss', 'Abschlussprüfung'], w: 190, h: 54, s: 'ok'},
    ], edges: [{a: 'ihk', b: 'b', t: 'überwacht'}, {a: 'ihk', b: 'a', t: 'berät'}, {a: 'ihk', b: 'p', t: 'organisiert'}]}],
  ],
});
