AP2.page('wiso-jarbschg', {
  b: 'wiso', g: 'Ausbildung und Beruf', t: 'Jugendarbeitsschutzgesetz (JArbSchG)',
  d: 'Das **Jugendarbeitsschutzgesetz (JArbSchG)** schützt **Jugendliche (15 bis unter 18 Jahre)** vor **Überforderung und Gefahren** bei der Arbeit. Es begrenzt die **Arbeitszeit** (**8 Stunden täglich, 40 Stunden wöchentlich, 5-Tage-Woche**), regelt **Ruhepausen** und **Freizeit**, verbietet **Nachtarbeit** (20 bis 6 Uhr) und **gefährliche Arbeiten**, legt **Mindesturlaub** fest und verlangt **ärztliche Untersuchungen**. **Kinder unter 15** dürfen grundsätzlich nicht beschäftigt werden.',
  m: '**Jugendliche: 8 und 40, fünf Tage, 12 Stunden Freizeit, Nachtruhe 20 bis 6, Urlaub 30/27/25 Werktage (unter 16/17/18).** Pausen: **30 Minuten ab mehr als 4,5 Stunden, 60 Minuten ab mehr als 6 Stunden.** Untersuchungen: **vor Beginn und nach 1 Jahr.**',
  cheat: [
    ['Wer ist geschützt?', ['**Kind:** unter 15 Jahren (Beschäftigung verboten, Ausnahmen)', '**Jugendlicher:** 15 bis unter 18 Jahre', '**Erwachsener:** ab 18 (dann ArbZG)']],
    ['Arbeitszeit (§§ 8, 15)', ['**8 Stunden/Tag**, **40 Stunden/Woche**', '**5-Tage-Woche** (Samstag und Sonntag frei)', 'Mehr als 8 Stunden nur mit Ausgleich in der Woche (bis 8,5 Stunden täglich)', 'Berufsschulzeit wird angerechnet']],
    ['Pausen und Freizeit', ['Pausen **mindestens 15 Minuten** am Stück', '**30 Min** bei **4,5 bis 6 Std** Arbeit', '**60 Min** bei **mehr als 6 Std**', '**12 Stunden** ununterbrochene Freizeit nach Arbeitsende', '**Nachtruhe 20 bis 6 Uhr**']],
    ['Urlaub, Untersuchung', ['**30 Werktage** (unter 16), **27** (unter 17), **25** (unter 18)', '**Erstuntersuchung** vor Beschäftigungsbeginn', '**Nachuntersuchung** nach 12 Monaten', 'Berufsschulfreistellung']],
  ],
  blocks: [
    ['h', 'Warum ein besonderes Gesetz für Jugendliche?'],
    ['p', 'Jugendliche sind **körperlich und geistig noch in der Entwicklung**, haben weniger Erfahrung und erkennen Gefahren schlechter. Deshalb schützt das **JArbSchG** sie stärker als Erwachsene. Das Gesetz gilt für **Beschäftigung in Betrieben, auch in der Berufsausbildung**. Der Arbeitgeber muss einen **Aushang** (Gesetz) im Betrieb auslegen, wenn er regelmäßig Jugendliche beschäftigt.'],
    ['table', ['Person', 'Alter', 'Schutz'], [['**Kind**', 'unter 15 Jahren', 'Beschäftigung **grundsätzlich verboten**. Ausnahmen: Betriebspraktikum, leichte Tätigkeiten ab 13 mit Einwilligung der Eltern (stark begrenzt)'], ['**Jugendlicher**', '15 bis unter 18 Jahren', 'Volles Jugendarbeitsschutzgesetz'], ['**Erwachsener**', 'ab 18 Jahren', 'Arbeitszeitgesetz, BUrlG']]],
    ['h', 'Arbeitszeit'],
    ['table', ['Regel', 'Jugendliche (JArbSchG)', 'Erwachsene (ArbZG)'], [
      ['Tägliche Arbeitszeit', '**8 Stunden**', '8 Stunden, verlängerbar auf **10 Stunden** (mit Ausgleich)'],
      ['Wöchentliche Arbeitszeit', '**40 Stunden**', 'bis 48 Stunden (6 mal 8)'],
      ['Arbeitstage pro Woche', '**5-Tage-Woche** (Samstag und Sonntag in der Regel frei)', 'Werktage Montag bis Samstag, Sonntag in der Regel frei'],
      ['Ruhezeit nach Arbeitsende', '**12 Stunden** ununterbrochen', '**11 Stunden**'],
      ['Nachtarbeit', '**Verboten von 20 bis 6 Uhr** (Ausnahmen: zum Beispiel Gastronomie bis 22 Uhr ab 16, Bäckereien ab 5 Uhr)', 'Nachtzeit 23 bis 6 Uhr, Nachtarbeit erlaubt mit Ausgleich'],
      ['Pausen', '**30 Min** bei mehr als 4,5 bis 6 Std, **60 Min** bei mehr als 6 Std', '**30 Min** bei mehr als 6 bis 9 Std, **45 Min** bei mehr als 9 Std'],
    ]],
    ['diagram', {w: 760, h: 160, keep: 620, cap: 'Beispiel Tagesablauf eines Jugendlichen mit 8 Stunden Arbeitszeit und 60 Minuten Pause (Arbeit 8 bis 17 Uhr). Danach mindestens 12 Stunden Freizeit.', nodes: [
      {id: 'a1', k: 'box', x: 175, y: 60, w: 250, h: 50, t: 'Arbeit 08:00 bis 12:00 (4 Std)', s: 'accent', fs: 12}, {id: 'p', k: 'box', x: 335, y: 60, w: 70, h: 50, t: 'Pause 1 h', s: 'ok', fs: 11}, {id: 'a2', k: 'box', x: 495, y: 60, w: 250, h: 50, t: 'Arbeit 13:00 bis 17:00 (4 Std)', s: 'accent', fs: 12}, {id: 'f', k: 'box', x: 680, y: 60, w: 160, h: 50, t: 'Freizeit mind. 12 Std', s: 'soft', fs: 12}, {id: 't', k: 'text', x: 380, y: 120, t: 'Arbeitszeit netto: 8 Stunden (ohne Pause)', fs: 12, tc: 'text2', b: true},
    ], edges: []}],
    ['warn', 'Die **Pausen zählen nicht zur Arbeitszeit** und müssen **im Voraus feststehen**. Eine Pause muss **mindestens 15 Minuten** dauern. Die Pausen dürfen **nicht am Anfang oder Ende** der Arbeitszeit liegen und Jugendliche dürfen nicht **länger als 4,5 Stunden ohne Pause** arbeiten.'],
  ],
});
