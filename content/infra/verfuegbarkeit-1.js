AP2.page('infra-verfuegbarkeit', {
  b: 'infra', g: 'Storage und Verfügbarkeit', t: 'Verfügbarkeit, SLA, MTBF und MTTR',
  d: '**Verfügbarkeit** ist der Anteil der Zeit, in dem ein System **funktionsfähig** ist: **V = MTBF / (MTBF + MTTR)**. **MTBF** (Mean Time Between Failures) ist die mittlere Zeit zwischen zwei Ausfällen, **MTTR** (Mean Time To Repair) die mittlere Reparaturzeit. Ein **SLA** (Service Level Agreement) legt die zugesagte Verfügbarkeit und Reaktionszeiten vertraglich fest.',
  m: '**V = MTBF / (MTBF + MTTR).** Hohe Verfügbarkeit: **selten ausfallen (hohe MTBF) und schnell reparieren (niedrige MTTR).** Neunen: 99 % = 3,65 Tage Ausfall pro Jahr, **99,9 % = 8,76 Stunden**, **99,99 % = 52,6 Minuten**, 99,999 % = 5,3 Minuten.',
  cheat: [
    ['Formeln', ['**V = MTBF / (MTBF + MTTR)**', 'Ausfallzeit = **(1 - V) mal Betrachtungszeit**', 'Jahr = 365 Tage = **8760 Stunden**', '**Reihe:** V = V1 mal V2', '**Parallel:** V = 1 - (1 - V1) mal (1 - V2)']],
    ['Ausfallzeit pro Jahr', ['99 %: **87,6 h** (3,65 Tage)', '99,9 %: **8,76 h**', '99,99 %: **52,6 min**', '99,999 %: **5,26 min**']],
    ['Begriffe', ['**SLA:** Vereinbarung zur Servicequalität', '**RTO / RPO:** Wiederanlauf- / Datenverlustzeit', '**SPOF:** Single Point of Failure', '**Redundanz:** doppelte Auslegung']],
    ['Maßnahmen', ['RAID, redundante Netzteile', 'Cluster, Load Balancer', 'Zweiter Standort (Georedundanz)', 'USV und Generator, Monitoring']],
  ],
  blocks: [
    ['h', 'Was bedeutet Verfügbarkeit?'],
    ['p', 'Wenn ein Online-Shop nicht erreichbar ist, entgehen dem Unternehmen Umsatz und Vertrauen. **Verfügbarkeit** (englisch: Availability, Teil der **CIA-Triade**) ist deshalb ein wichtiges Qualitätsmerkmal. Man drückt sie in **Prozent** aus. Die Zahl hinter der Kommastelle zählt: aus 99 % werden 99,9 % ("drei Neunen"), das bedeutet einen **Faktor 10** weniger Ausfallzeit.'],
    ['table', ['Verfügbarkeit', 'Name', 'Ausfallzeit pro Jahr', 'pro Monat (30 Tage)', 'pro Woche'], [
      ['99 %', 'zwei Neunen', '87,6 Stunden (3,65 Tage)', '7,2 Stunden', '1,68 Stunden'],
      ['99,5 %', '-', '43,8 Stunden', '3,6 Stunden', '50,4 Minuten'],
      ['**99,9 %**', 'drei Neunen', '**8,76 Stunden**', '43,2 Minuten', '10,1 Minuten'],
      ['**99,99 %**', 'vier Neunen', '**52,6 Minuten**', '4,3 Minuten', '1 Minute'],
      ['99,999 %', 'fünf Neunen', '5,26 Minuten', '26 Sekunden', '6 Sekunden'],
    ]],
    ['chart', {kind: 'bar', w: 720, h: 320, labels: ['99 %', '99,5 %', '99,9 %', '99,99 %', '99,999 %'], series: [{n: 'Ausfallzeit pro Jahr in Stunden', d: [87.6, 43.8, 8.76, 0.88, 0.09], k: 'accent'}], vals: true, yl: 'Stunden pro Jahr', cap: 'Jede zusätzliche Neun verringert die erlaubte Ausfallzeit auf ein Zehntel.'}],
    ['h', 'MTBF, MTTR und die Formel'],
    ['kv', [
      ['MTBF', 'Mean Time Between Failures: **Durchschnittliche Betriebszeit zwischen zwei Ausfällen** bei reparierbaren Systemen. Beispiel: Eine Festplatte hat 500.000 Stunden MTBF (statistischer Wert für viele Platten, nicht die Lebensdauer einer einzelnen).'],
      ['MTTR', 'Mean Time To Repair (oder Recovery): **Durchschnittliche Zeit zur Behebung** eines Ausfalls (Erkennen, Anreise, Austausch, Wiederherstellung).'],
      ['MTTF', 'Mean Time To Failure: Wie MTBF, aber für **nicht reparierbare** Teile (zum Beispiel Lebensdauer einer Glühbirne).'],
    ]],
    ['code', 'text', `Verfügbarkeit V = MTBF / (MTBF + MTTR)

Beispiel: MTBF = 1000 Stunden, MTTR = 2 Stunden
V = 1000 / (1000 + 2) = 1000 / 1002 = 0,998 = 99,8 %
Ausfallzeit pro Jahr = (1 - 0,998) mal 8760 h = ca. 17,5 Stunden`],
    ['tool', 'avail'],
  ],
});
