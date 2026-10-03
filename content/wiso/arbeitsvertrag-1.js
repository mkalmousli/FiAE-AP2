AP2.page('wiso-arbeitsvertrag', {
  b: 'wiso', g: 'Arbeitsrecht', t: 'Arbeitsvertrag und Arbeitszeitgesetz',
  d: 'Der **Arbeitsvertrag** begründet das **Arbeitsverhältnis**: Der **Arbeitnehmer** schuldet **Arbeitsleistung** (weisungsgebunden, persönlich), der **Arbeitgeber** die **Vergütung**. Er ist grundsätzlich **formfrei**, doch die **wesentlichen Bedingungen** muss der Arbeitgeber **schriftlich nachweisen** (**Nachweisgesetz**). Das **Arbeitszeitgesetz (ArbZG)** begrenzt die Arbeitszeit: **8 Stunden täglich** (bis **10 Stunden** mit Ausgleich), **Ruhepausen** und **11 Stunden Ruhezeit**.',
  m: '**ArbZG: 8 Stunden (max. 10 mit Ausgleich in 6 Monaten), Pause 30 Min ab mehr als 6 Std, 45 Min ab mehr als 9 Std, Ruhezeit 11 Std.** Arbeitsvertrag = **Arbeit gegen Geld**, Arbeitnehmer ist **weisungsgebunden** (Direktionsrecht des Arbeitgebers).',
  cheat: [
    ['Arbeitsvertrag', ['**Formfrei**, Nachweis schriftlich (NachwG)', '**AN-Pflichten:** Arbeit leisten, Treue, Verschwiegenheit', '**AG-Pflichten:** Vergütung, Beschäftigung, Fürsorge, Urlaub', '**Direktionsrecht** (§ 106 GewO): Arbeitgeber bestimmt Ort, Zeit, Art der Arbeit im Rahmen']],
    ['Befristung (TzBfG)', ['**Mit Sachgrund** (zum Beispiel Vertretung) beliebig lang', '**Ohne Sachgrund** bis **2 Jahre**, höchstens **3 Verlängerungen**', 'Befristung **schriftlich**', 'Probezeit höchstens **6 Monate**, Frist dann **2 Wochen**']],
    ['ArbZG: Arbeitszeit', ['**8 Stunden/Werktag**', 'Bis **10 Stunden**, wenn im Schnitt **8 Stunden** in **6 Monaten / 24 Wochen**', 'Höchstens **48 Stunden/Woche** im Schnitt', '**Sonn- und Feiertage** grundsätzlich frei']],
    ['ArbZG: Pausen und Ruhe', ['**30 Min** bei mehr als **6 bis 9 Std**', '**45 Min** bei mehr als **9 Std**', 'Pausen in Blöcken **mind. 15 Min**', '**11 Stunden Ruhezeit** nach Arbeitsende']],
  ],
  blocks: [
    ['h', 'Der Arbeitsvertrag'],
    ['p', 'Ein **Arbeitsvertrag** ist ein **Dienstvertrag** besonderer Art (§ 611a BGB). Er kommt durch **Angebot und Annahme** zustande. Merkmale, die ihn vom freien Dienstvertrag unterscheiden: Der Arbeitnehmer ist **weisungsgebunden**, **in die Organisation** des Arbeitgebers **eingegliedert** und arbeitet **persönlich** (nicht durch Vertreter). Er ist **formfrei** (auch mündlich möglich), aber die **wesentlichen Vertragsbedingungen** müssen nach dem **Nachweisgesetz** schriftlich festgehalten werden: Namen und Anschrift, Beginn, Dauer (bei Befristung), Arbeitsort, Tätigkeit, Vergütung (Zusammensetzung, Fälligkeit), Arbeitszeit, Urlaub, Kündigungsfristen, Hinweis auf Tarifverträge.'],
    ['table', ['', 'Pflichten des Arbeitnehmers', 'Pflichten des Arbeitgebers'], [
      ['Hauptpflicht', '**Arbeitsleistung** persönlich erbringen', '**Vergütung** zahlen (Lohn, Gehalt)'],
      ['Nebenpflichten', '**Treuepflicht**, **Verschwiegenheit** über Betriebsgeheimnisse, **Wettbewerbsverbot** während des Arbeitsverhältnisses, Anzeige von Fehlzeiten', '**Fürsorgepflicht** (Gesundheitsschutz, Gleichbehandlung), **Beschäftigungspflicht**, Urlaub gewähren, **Zeugnis** ausstellen, Datenschutz beachten'],
      ['Weisungen', 'Weisungen im Rahmen des Direktionsrechts befolgen', 'Weisungen nach **billigem Ermessen** (Inhalt, Ort, Zeit der Arbeit)'],
    ]],
    ['h', 'Befristung und Probezeit'],
    ['kv', [
      ['Unbefristeter Vertrag', 'Der **Regelfall**. Endet erst durch **Kündigung**, Aufhebungsvertrag oder Rente.'],
      ['Befristung mit Sachgrund', 'Zum Beispiel **Vertretung** (Elternzeit), vorübergehender Bedarf, Projekt. Der Vertrag endet **automatisch** mit Ablauf der Zeit oder Zweckerreichung.'],
      ['Befristung ohne Sachgrund', 'Bis zu **2 Jahre**, innerhalb dieser Zeit höchstens **3 Verlängerungen**. Nicht erlaubt, wenn mit dem Arbeitgeber **vorher schon ein Arbeitsverhältnis** bestand (Ausnahme nach 3 Jahren Pause). Jede Befristung muss **schriftlich** erfolgen, sonst gilt der Vertrag als unbefristet.'],
      ['Probezeit', 'Üblich **bis zu 6 Monate**. Kündigungsfrist während der Probezeit **2 Wochen** (§ 622 Abs. 3 BGB). Muss **vereinbart** sein.'],
      ['Teilzeit und Minijob', 'Teilzeit: Arbeitszeit **unter der Vollzeit**, gleiche Rechte anteilig. **Minijob (geringfügige Beschäftigung)**: bis **603 Euro monatlich** (Stand 2026; steigt mit dem Mindestlohn), pauschale Abgaben durch den Arbeitgeber.'],
    ]],
    ['h', 'Das Arbeitszeitgesetz (ArbZG)'],
    ['table', ['Regel', 'Inhalt', 'Beispiel'], [
      ['**Werktägliche Arbeitszeit** (§ 3)', '**8 Stunden**. Verlängerung auf **bis zu 10 Stunden**, wenn innerhalb von **6 Kalendermonaten oder 24 Wochen im Durchschnitt 8 Stunden** nicht überschritten werden.', 'Montag 10 Stunden, dafür Freitag 6 Stunden'],
      ['**Höchstwochenarbeitszeit**', 'Rechnerisch **48 Stunden** (6 Tage mal 8 Stunden), im Schnitt', '40-Stunden-Vertrag mit gelegentlich 48 Stunden'],
      ['**Ruhepausen** (§ 4)', '**Mindestens 30 Minuten** bei Arbeitszeit von **mehr als 6 bis 9 Stunden**; **45 Minuten** bei **mehr als 9 Stunden**. In Abschnitten von **mindestens 15 Minuten**. Nicht länger als **6 Stunden ohne Pause**.', '7 Stunden Arbeit: 30 Minuten Pause'],
      ['**Ruhezeit** (§ 5)', '**Mindestens 11 Stunden** ununterbrochen nach Beendigung der täglichen Arbeitszeit.', 'Arbeitsende 22 Uhr: frühestens 9 Uhr Arbeitsbeginn'],
      ['**Sonn- und Feiertagsruhe** (§ 9)', 'Beschäftigung an Sonn- und Feiertagen **grundsätzlich verboten** (Ausnahmen: Krankenhaus, Gastronomie, Verkehr, Notdienste). Ersatzruhetag.', 'Feuerwehr, Pflege, Gaststätte'],
      ['**Nachtarbeit** (§ 6)', 'Nachtzeit **23 bis 6 Uhr**. Nachtarbeitnehmer haben Anspruch auf **Ausgleich** (Zuschlag oder freie Tage) und arbeitsmedizinische Untersuchung.', 'Nachtschicht in der Produktion'],
    ]],
    ['note', 'Der **Europäische Gerichtshof (2019)** und das **Bundesarbeitsgericht (2022)** verlangen, dass Arbeitgeber die **Arbeitszeit systematisch erfassen**. Das Arbeitszeitgesetz gilt **nicht** für leitende Angestellte; für **Jugendliche** gilt das **JArbSchG**.'],
  ],
});
