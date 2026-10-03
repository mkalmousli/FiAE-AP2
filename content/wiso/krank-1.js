AP2.page('wiso-krank', {
  b: 'wiso', g: 'Arbeitsrecht', t: 'Entgeltfortzahlung im Krankheitsfall',
  d: 'Wird ein Arbeitnehmer **unverschuldet arbeitsunfähig**, zahlt der **Arbeitgeber** das Entgelt **bis zu 6 Wochen (42 Kalendertage)** zu **100 Prozent** weiter (**Entgeltfortzahlungsgesetz**, EntgFG). Voraussetzung: Das Arbeitsverhältnis besteht **mindestens 4 Wochen**. Der Arbeitnehmer muss die Krankheit **unverzüglich melden**; dauert sie **länger als 3 Kalendertage**, braucht er eine **ärztliche Bescheinigung (eAU)** spätestens am **folgenden Arbeitstag**. Ab der **7. Woche** zahlt die **Krankenkasse Krankengeld**.',
  m: '**6 Wochen 100 % vom Arbeitgeber, danach Krankengeld von der Krankenkasse (70 % brutto, max. 90 % netto).** Meldung: **unverzüglich**. Attest: **ab dem 4. Kalendertag** (spätestens am nächsten Arbeitstag, AG darf früher verlangen). Voraussetzung: **4 Wochen Beschäftigung**, **unverschuldet**.',
  cheat: [
    ['Voraussetzungen', ['**Arbeitsverhältnis seit 4 Wochen**', 'Krankheit **verhindert Arbeit**', '**Unverschuldet** (grobes Selbstverschulden ausgeschlossen)', 'Keine **Vorerkrankung** wegen derselben Krankheit (Sperrfrist)']],
    ['Dauer und Höhe', ['**Bis zu 6 Wochen** (42 Tage) je Krankheit', '**100 %** des Entgelts (Lohnausfallprinzip)', 'Für **Azubis** genauso (§ 19 BBiG)', 'Gleiche Krankheit erneut: neue 6 Wochen, wenn **6 Monate** ohne oder **12 Monate** seit Beginn']],
    ['Pflichten des Arbeitnehmers', ['**Unverzüglich** melden (Arbeitsunfähigkeit **und** voraussichtliche Dauer)', '**Ärztliche Bescheinigung** (AU/eAU) ab dem **4. Kalendertag**; Arbeitgeber kann sie schon **ab dem 1. Tag** verlangen', 'Genesungsfördernd verhalten', 'Auslandsaufenthalt: Anschrift mitteilen']],
    ['Danach', ['Ab **7. Woche**: **Krankengeld** der Krankenkasse', '**70 %** des Bruttoentgelts, höchstens **90 %** des Nettos', 'Bis zu **78 Wochen** innerhalb von 3 Jahren (wegen derselben Krankheit)', 'Danach ggf. **Erwerbsminderungsrente**']],
  ],
  blocks: [
    ['h', 'Wer zahlt wann?'],
    ['diagram', {w: 760, h: 200, keep: 640, cap: 'Zeitleiste bei längerer Krankheit: 6 Wochen Arbeitgeber, danach Krankenkasse.', nodes: [
      {id: 'a', k: 'box', x: 200, y: 80, w: 330, h: 60, t: ['Woche 1 bis 6', 'Arbeitgeber: Entgeltfortzahlung 100 %'], s: 'accent'}, {id: 'b', k: 'box', x: 530, y: 80, w: 330, h: 60, t: ['ab Woche 7 (bis max. 78 Wochen)', 'Krankenkasse: Krankengeld ca. 70 %'], s: 'ok'}, {id: 'c', k: 'text', x: 200, y: 140, t: 'Tag 1 (Meldung), ab Tag 4: Attest', fs: 12, tc: 'text2', b: true}, {id: 'd', k: 'text', x: 530, y: 140, t: 'Arbeitsunfähigkeit wird weiter bescheinigt', fs: 12, tc: 'text2', b: true},
    ], edges: []}],
    ['kv', [
      ['Entgeltfortzahlung (§ 3 EntgFG)', 'Der **Arbeitgeber** zahlt weiter, was der Arbeitnehmer **ohne Krankheit verdient hätte** (**Entgeltausfallprinzip**), **bis zu 6 Wochen**. Auch bei Feiertagen und für Azubis. **Wartezeit:** erst nach **4 Wochen** Bestehen des Arbeitsverhältnisses (vorher zahlt die Krankenkasse Krankengeld).'],
      ['Unverschuldet', 'Verschulden im Sinne des Gesetzes ist ein **grober Verstoß gegen das eigene Interesse** (zum Beispiel selbst verschuldeter Unfall bei **Trunkenheit am Steuer**, extrem gefährlicher Sport). **Gewöhnliche Sportverletzung** oder Freizeitunfall gelten als **unverschuldet**.'],
      ['Dieselbe Krankheit (Fortsetzungserkrankung)', 'Wird man **wegen derselben Krankheit** erneut arbeitsunfähig, besteht ein neuer Anspruch auf 6 Wochen nur, wenn man **mindestens 6 Monate** nicht wegen dieser Krankheit arbeitsunfähig war **oder** seit Beginn der ersten Erkrankung **12 Monate** vergangen sind. Sonst werden die Zeiten **zusammengerechnet**.'],
      ['Mehrere verschiedene Krankheiten', 'Jede neue, **andere** Krankheit löst grundsätzlich einen **neuen** Anspruch auf 6 Wochen aus (Ausnahme: sie überschneiden sich zeitlich, dann gilt nur **ein** Zeitraum).'],
      ['Umlage U1', 'Kleinbetriebe (bis 30 Arbeitnehmer) erhalten von der Krankenkasse über die **Umlage U1** einen Teil der Entgeltfortzahlung erstattet.'],
    ]],
    ['h', 'Pflichten des Arbeitnehmers (§ 5 EntgFG)'],
    ['steps', ['**Unverzüglich** (ohne schuldhaftes Zögern, meist **vor Arbeitsbeginn**, telefonisch) dem Arbeitgeber die **Arbeitsunfähigkeit** und deren **voraussichtliche Dauer** mitteilen.', 'Dauert die Arbeitsunfähigkeit **länger als 3 Kalendertage**, muss spätestens **am darauffolgenden Arbeitstag** eine **ärztliche Bescheinigung** vorliegen. Der Arbeitgeber darf die Vorlage **früher verlangen** (auch ab dem 1. Tag).', 'Seit dem **1. Januar 2023** gilt die **elektronische AU (eAU)**: Der Arzt übermittelt die Daten an die **Krankenkasse**, der **Arbeitgeber ruft sie ab**. Der Arbeitnehmer muss weiterhin **dem Arbeitgeber die Krankmeldung** mitteilen, braucht aber meist keinen "gelben Zettel" mehr.', 'Dauert die Krankheit **länger** als bescheinigt, ist eine **Folgebescheinigung** nötig.', 'Während der Krankheit **nicht gesundheitswidrig handeln** (Genesung nicht gefährden).']],
    ['warn', 'Bleibt der Arbeitnehmer **ohne Meldung** der Arbeit fern, drohen **Abmahnung** und im Wiederholungsfall **Kündigung**. Ohne ärztliche Bescheinigung kann der Arbeitgeber die **Entgeltfortzahlung verweigern**.'],
  ],
});
