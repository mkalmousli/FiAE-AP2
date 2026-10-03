AP2.page('wiso-urlaub', {
  b: 'wiso', g: 'Arbeitsrecht', t: 'Urlaubsanspruch (Bundesurlaubsgesetz)',
  d: 'Das **Bundesurlaubsgesetz (BUrlG)** gibt jedem Arbeitnehmer einen **gesetzlichen Mindesturlaub von 24 Werktagen** pro Jahr (bei **6-Tage-Woche**), das sind **20 Arbeitstage** bei **5-Tage-Woche** (4 Wochen). Den **vollen Anspruch** erwirbt man **erstmals nach 6 Monaten (Wartezeit)**. Der Urlaub muss **im Kalenderjahr** genommen werden, **Übertragung** nur bis **31. März**. **Urlaubsentgelt** wird weitergezahlt. Der Urlaub dient der **Erholung**.',
  m: '**24 Werktage = 4 Wochen. Formel: Mindesturlaub = 24 geteilt durch 6 mal Arbeitstage pro Woche (= 4 mal Arbeitstage pro Woche).** 5-Tage-Woche: 20 Tage, 3-Tage-Woche: 12 Tage. **Wartezeit 6 Monate.** **Teilurlaub: 1/12 pro vollem Monat.** Werktage = Montag bis Samstag.',
  cheat: [
    ['Anspruch', ['**24 Werktage** (Mo-Sa) = **4 Wochen**', '**5-Tage-Woche:** 20 Arbeitstage', '**Jugendliche:** 30/27/25 Werktage (JArbSchG)', '**Schwerbehinderte:** +5 Arbeitstage (SGB IX)', 'Tarif und Vertrag meist **mehr**']],
    ['Wartezeit und Teilurlaub', ['**Wartezeit 6 Monate** für den vollen Anspruch', 'Davor/bei Ausscheiden in 1. Jahreshälfte: **1/12 pro vollem Monat**', 'Ausscheiden in der 2. Jahreshälfte nach Wartezeit: **voller Urlaub**', 'Teilurlaub bei Bruchteilen: **ab 0,5 aufrunden**']],
    ['Durchführung', ['AG legt zeitlich fest, **Wünsche des AN** berücksichtigen', '**Zusammenhängend** gewähren, mind. **12 Werktage am Stück**', 'Urlaub **im Kalenderjahr**, Übertragung bis **31.03.**', 'Urlaubsentgelt = **Durchschnitt der letzten 13 Wochen**']],
    ['Besonderheiten', ['**Krankheit im Urlaub** (mit Attest): Tage zählen **nicht** als Urlaub', 'Feiertage zählen **nicht** als Urlaubstage', '**Abgeltung** in Geld **nur** bei Ende des Arbeitsverhältnisses', '**Verfall** nur wenn der AG vorher **auf Verfall hingewiesen** hat']],
  ],
  blocks: [
    ['h', 'Der gesetzliche Mindesturlaub'],
    ['p', 'Jeder Arbeitnehmer hat Anspruch auf **bezahlten Erholungsurlaub** (§ 1 BUrlG). Der **gesetzliche Mindesturlaub beträgt 24 Werktage**. **Werktage** sind alle Kalendertage **außer Sonn- und Feiertagen**: also **Montag bis Samstag**. Das Gesetz geht von einer **6-Tage-Woche** aus. Bei einer **5-Tage-Woche** rechnet man auf **Arbeitstage** um: **24 geteilt durch 6 mal 5 = 20 Arbeitstage**. Das sind jeweils **vier Wochen**. Tarifverträge und Arbeitsverträge gewähren meist **mehr** (üblich 25 bis 30 Tage).'],
    ['table', ['Arbeitstage pro Woche', 'Gesetzlicher Mindesturlaub', 'Rechnung'], [['6 Tage', '24 Tage', '4 Wochen mal 6'], ['5 Tage', '**20 Tage**', '4 Wochen mal 5'], ['4 Tage', '16 Tage', '4 mal 4'], ['3 Tage', '12 Tage', '4 mal 3'], ['2 Tage', '8 Tage', '4 mal 2'], ['1 Tag', '4 Tage', '4 mal 1']]],
    ['tool', 'urlaub'],
    ['h', 'Wartezeit und Teilurlaub'],
    ['kv', [
      ['Wartezeit (§ 4)', 'Der **volle Urlaubsanspruch** entsteht **erstmals nach 6 Monaten** Bestehen des Arbeitsverhältnisses. Man kann aber schon vorher Urlaub **anteilig** bekommen.'],
      ['Teilurlaub (§ 5)', '**1/12 des Jahresurlaubs für jeden vollen Monat**, wenn (a) die Wartezeit **im ersten Jahr nicht erfüllt** wird, (b) man **vor Ablauf der Wartezeit ausscheidet** oder (c) man **nach erfüllter Wartezeit in der ersten Jahreshälfte** ausscheidet. Bruchteile von **mindestens einem halben Tag** werden **aufgerundet**.'],
      ['Ausscheiden in der 2. Jahreshälfte', 'Hat der Arbeitnehmer die Wartezeit erfüllt und scheidet **nach dem 30. Juni** aus, behält er den **vollen gesetzlichen Mindesturlaub** des Jahres (abzüglich bereits genommenen Urlaubs, auch beim neuen Arbeitgeber).'],
    ]],
    ['ex', ['**Beispiel (Teilurlaub):** Eine Mitarbeiterin (5-Tage-Woche, 30 Tage Vertragsurlaub) beginnt am **1. Oktober**. Nach 3 vollen Monaten bis Jahresende hat sie **3/12 des Jahresurlaubs**: 30 mal 3 / 12 = **7,5 Tage**, aufgerundet **8 Tage**. (Beim **gesetzlichen** Mindesturlaub: 20 mal 3 / 12 = 5 Tage.)', '**Beispiel (Ausscheiden):** Ein Mitarbeiter (30 Tage) scheidet zum **31. Mai** aus, Wartezeit erfüllt. Anspruch auf **5/12**: 30 mal 5 / 12 = **12,5**, aufgerundet **13 Tage**. Scheidet er zum **31. August** aus: voller Anspruch **30 Tage** (nur gesetzlicher Teil sicher).']],
  ],
});
