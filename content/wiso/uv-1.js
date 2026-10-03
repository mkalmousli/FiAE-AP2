AP2.page('wiso-uv', {
  b: 'wiso', g: 'Sozialversicherung', t: 'Unfallversicherung und Berufsgenossenschaft',
  d: 'Die **gesetzliche Unfallversicherung (SGB VII)** schützt Beschäftigte bei **Arbeitsunfällen**, **Wegeunfällen** und **Berufskrankheiten**. Träger sind die **Berufsgenossenschaften (BG)** (Gewerbe) und **Unfallkassen** (öffentlicher Dienst). Die Beiträge zahlt **allein der Arbeitgeber** (nach **Lohnsumme** und **Gefahrklasse**). Dafür haftet der Arbeitgeber **nicht persönlich** (**Haftungsprivileg**). Ziel: **Prävention vor Rehabilitation vor Entschädigung**.',
  m: '**Versicherungsfälle: Arbeitsunfall, Wegeunfall, Berufskrankheit.** **Beitrag: nur Arbeitgeber.** **Leistungen: erst Heilbehandlung und Reha, dann Verletztengeld, Verletztenrente.** Wegeunfall = **direkter Weg** zur und von der Arbeit (und zur Berufsschule). **Prävention vor Rehabilitation vor Rente.**',
  cheat: [
    ['Versicherungsfälle', ['**Arbeitsunfall:** Unfall durch die versicherte Tätigkeit', '**Wegeunfall:** auf dem **direkten Weg** zur/von Arbeit, Berufsschule, Kita-Umweg', '**Berufskrankheit:** gelistete Krankheit durch Beruf (Lärm, Asbest, Hautleiden)']],
    ['Träger und Beitrag', ['**Berufsgenossenschaften** (nach Branche, **VBG** für Büro/IT)', '**Unfallkassen** (öffentlicher Dienst, Schulen)', 'Beitrag **nur Arbeitgeber**', 'Höhe nach **Entgeltsumme** und **Gefahrklasse**']],
    ['Leistungen', ['**Heilbehandlung**, Medizinische und berufliche **Reha**', '**Verletztengeld** (80 % des Bruttos, max. Netto)', '**Verletztenrente** ab **MdE 20 %**', '**Hinterbliebenenrente**', '**Prävention** (Unfallverhütungsvorschriften)']],
    ['Pflichten', ['**Unfallanzeige** bei **mehr als 3 Tagen** Arbeitsunfähigkeit (Arbeitgeber, innerhalb 3 Tagen)', '**Durchgangsarzt (D-Arzt)** aufsuchen', 'Sofort **melden** (Vorgesetzten, Ersthelfer)', 'Eintrag ins **Verbandbuch**']],
  ],
  blocks: [
    ['h', 'Warum gibt es die gesetzliche Unfallversicherung?'],
    ['p', 'Wer bei der Arbeit **einen Unfall erleidet**, soll nicht um Entschädigung streiten müssen. Die **Unfallversicherung** zahlt **unabhängig vom Verschulden**. Der Arbeitgeber finanziert sie allein und ist im Gegenzug **von der persönlichen Haftung** gegenüber den Beschäftigten befreit (**Haftungsprivileg**, außer bei **Vorsatz**). Das ist ein **Kompromiss** aus der Bismarck-Zeit: Der Arbeitnehmer verzichtet auf Schadensersatz und Schmerzensgeld, bekommt dafür sicheren Schutz.'],
    ['table', ['Versicherungsfall', 'Beschreibung', 'Beispiele'], [
      ['**Arbeitsunfall**', 'Ein **Unfall** (plötzliches, von außen wirkendes Ereignis) **im Zusammenhang mit der versicherten Tätigkeit**', 'Sturz auf der Treppe im Büro, Schnittverletzung, Ausrutschen beim Dienstgang, Stromschlag'],
      ['**Wegeunfall**', 'Unfall auf dem **unmittelbaren Weg** zwischen **Wohnung und Arbeitsstätte** (oder **Berufsschule**). Umwege nur, wenn sie **beruflich** bedingt sind (Fahrgemeinschaft, Kind zur Kita bringen)', 'Fahrradunfall auf dem Weg zur Arbeit; **kein** Schutz bei privatem Einkauf-Umweg'],
      ['**Berufskrankheit**', 'Krankheit, die in der **Berufskrankheitenverordnung** gelistet ist und durch die berufliche Tätigkeit verursacht wird', 'Lärmschwerhörigkeit, Hauterkrankungen, Asbestose, Sehnenscheidenentzündung'],
    ]],
    ['diagram', {w: 760, h: 240, keep: 600, cap: 'Der Weg bei einem Arbeitsunfall: Von der Meldung bis zu den Leistungen', nodes: [
      {id: 'a', k: 'round', x: 90, y: 100, t: ['Unfall', 'bei der Arbeit'], w: 120, h: 56, s: 'bad'}, {id: 'b', k: 'round', x: 250, y: 100, t: ['Meldung an', 'Vorgesetzte'], w: 130, h: 56}, {id: 'c', k: 'round', x: 420, y: 100, t: ['D-Arzt', 'Behandlung'], w: 120, h: 56, s: 'accent'}, {id: 'd', k: 'round', x: 590, y: 100, t: ['Unfallanzeige', 'durch Arbeitgeber'], w: 140, h: 56, s: 'accent'}, {id: 'e', k: 'round', x: 380, y: 190, t: ['Berufsgenossenschaft: Heilbehandlung, Reha, Verletztengeld, Rente'], w: 580, h: 44, s: 'ok'},
    ], edges: [{a: 'a', b: 'b'}, {a: 'b', b: 'c'}, {a: 'c', b: 'd'}, {a: 'd', b: 'e'}]}],
  ],
});
