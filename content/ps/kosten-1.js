AP2.page('ps-kosten', {
  b: 'ps', g: 'Projektmanagement', t: 'Kosten-Nutzen-Rechnung, ROI und Amortisation',
  d: 'Die **Kosten-Nutzen-Rechnung** vergleicht, was ein Projekt kostet (Investition und laufende Kosten) mit dem, was es bringt (Einsparungen, Mehrerlöse). Der **ROI** (Return on Investment) misst den Gewinn im Verhältnis zur Investition. Die **Amortisationsdauer** gibt an, nach welcher Zeit die Investition zurückgeflossen ist.',
  m: '**ROI = Gewinn / Investition mal 100 Prozent.** **Amortisation = Investition / jährliche Einsparung.** Je kürzer die Amortisationsdauer, desto besser. Ein negativer ROI zeigt im betrachteten Zeitraum einen negativen rechnerischen Überschuss. Andere Pflichtziele und Zeiträume getrennt beurteilen.',
  cheat: [
    ['Formeln', ['Gewinn = Nutzen - Kosten', '**ROI (%) = Gewinn / Investition mal 100**', '**Amortisationsdauer = Investition / Einsparung pro Jahr**', '**TCO** = Anschaffung + Betrieb über die Nutzungsdauer']],
    ['Kostenarten', ['**Einmalig:** Entwicklung, Hardware, Schulung, Migration', '**Laufend:** Lizenzen, Wartung, Support, Strom, Hosting', 'Direkt (Projekt) und indirekt (Gemeinkosten)']],
    ['Nutzenarten', ['**Monetär:** Kosten sparen, Umsatz steigern', '**Nicht monetär:** Zufriedenheit, Image, Sicherheit', 'Nicht-monetär bewertet die Nutzwertanalyse']],
    ['Entscheidung', ['ROI, Amortisation, Risiken und Pflichtziele gemeinsam beurteilen', 'Mehrere Varianten: Kostenvergleich oder Nutzwertanalyse', 'Annahmen immer nennen']],
  ],
  blocks: [
    ['h', 'Warum rechnet man vor dem Start?'],
    ['p', 'Ein Projekt verbraucht Geld und Zeit. Bevor man es startet, muss die Geschäftsführung wissen: **Lohnt es sich?** Diese Frage beantwortet die Wirtschaftlichkeitsrechnung. In der Initiierungsphase wird sie als **Business Case** erstellt, in der Prüfung heißt sie meist "Kosten-Nutzen-Analyse".'],
    ['h', 'Kosten und Nutzen sammeln'],
    ['table', ['Kategorie', 'Beispiele'], [
      ['Einmalige Kosten (Investition)', 'Entwicklungsstunden, Server und Hardware, Software-Lizenzen, Schulung der Mitarbeiter, Datenübernahme (Migration)'],
      ['Laufende Kosten (pro Jahr)', 'Wartung und Support, Hosting oder Strom, Lizenzgebühren, Administration'],
      ['Monetärer Nutzen', 'Eingesparte Arbeitszeit (Stunden mal Stundensatz), weniger Fehlerkosten, höhere Verkaufszahlen'],
      ['Nicht-monetärer Nutzen', 'Zufriedenere Kunden, bessere Datensicherheit, besseres Image, einfachere Bedienung'],
    ]],
    ['h', 'Die drei Kennzahlen'],
    ['kv', [
      ['Gewinn / Nettonutzen', 'Gesamtnutzen minus Gesamtkosten im Betrachtungszeitraum.'],
      ['ROI', 'Gewinn geteilt durch eingesetztes Kapital mal 100. Beispiel: Gewinn 60.000 Euro bei 60.000 Euro Investition ergibt ROI 100 Prozent.'],
      ['Amortisationsdauer', 'Investition geteilt durch den **jährlichen Rückfluss** (Einsparung minus laufende Kosten). Wann ist die Investition "wieder drin"?'],
      ['TCO (Total Cost of Ownership)', 'Gesamtkosten über die ganze Lebensdauer: Anschaffung plus Betrieb. Wichtig beim Vergleich: das billigste Angebot ist oft nicht das günstigste.'],
    ]],
    ['h', 'Durchgerechnetes Beispiel'],
    ['ex', ['Ein Unternehmen automatisiert die Rechnungserstellung. Investition: **60.000 Euro**. Einsparung: **24.000 Euro pro Jahr** (weniger manuelle Arbeit). Laufende Kosten sind in der Einsparung bereits abgezogen. Betrachtungszeitraum: 5 Jahre.', '**Amortisationsdauer** = 60.000 / 24.000 = **2,5 Jahre**.', '**Gesamtnutzen** in 5 Jahren: 5 mal 24.000 = 120.000 Euro. **Gewinn** = 120.000 - 60.000 = **60.000 Euro**.', '**ROI** = 60.000 / 60.000 mal 100 = **100 Prozent** über 5 Jahre (20 Prozent pro Jahr im Durchschnitt).']],
    ['chart', {kind: 'line', w: 720, h: 320, labels: ['0', '1', '2', '3', '4', '5'], series: [{n: 'Investition (60 T Euro)', d: [60, 60, 60, 60, 60, 60], k: 'text3', dash: '6 5'}, {n: 'Kumulierte Einsparung', d: [0, 24, 48, 72, 96, 120], k: 'accent'}], yl: 'Tausend Euro', cap: 'Die Kurven kreuzen sich nach 2,5 Jahren: Das ist der Amortisationszeitpunkt (Break-even).'}],
    ['tip', 'In der Prüfung gilt: Immer die Formel hinschreiben, die Zahlen einsetzen, Einheit und Ergebnis nennen. Auch bei falschem Endergebnis gibt es dann Punkte für den Rechenweg.'],
    ['tool', 'roi'],
  ],
});

AP2.add('ps-kosten', [
  [
    "h",
    "Zeitersparnis in einen jährlichen Rückfluss übersetzen"
  ],
  [
    "p",
    "Ein Team bearbeitet 6.000 Vorgänge pro Jahr. Die Software spart vier Minuten je Vorgang. Eine Arbeitsstunde wird mit 45 Euro bewertet. Zusätzlicher Betrieb kostet 4.000 Euro jährlich. Die Investition beträgt 24.000 Euro."
  ],
  [
    "walk",
    {
      "t": "Nettonutzen und Amortisation",
      "steps": [
        {
          "t": "Stunden bestimmen",
          "b": [
            [
              "p",
              "6.000 × 4 Minuten = 24.000 Minuten."
            ],
            [
              "p",
              "24.000 / 60 = **400 Stunden pro Jahr**."
            ]
          ]
        },
        {
          "t": "Jährlichen Nettoeffekt berechnen",
          "b": [
            [
              "p",
              "400 × 45 Euro = **18.000 Euro** bewertete Ersparnis."
            ],
            [
              "p",
              "18.000 − 4.000 = **14.000 Euro** jährlicher Nettoeffekt."
            ]
          ]
        },
        {
          "t": "Amortisation berechnen",
          "b": [
            [
              "p",
              "24.000 / 14.000 ≈ **1,71 Jahre**."
            ],
            [
              "p",
              "Die Rechnung setzt gleichmäßige und tatsächlich nutzbare Einsparungen voraus."
            ]
          ]
        }
      ]
    }
  ],
  [
    "warn",
    "Freie Arbeitszeit ist nicht automatisch eine Auszahlungseinsparung. Sie kann Kapazität für andere Aufgaben schaffen. Begründe, ob Personalkosten tatsächlich sinken oder ein bewerteter Kapazitätsnutzen entsteht."
  ],
  [
    "h",
    "Break-even zweier Betriebsvarianten"
  ],
  [
    "p",
    "Variante A kostet einmalig 12.000 Euro und monatlich 300 Euro. Variante B kostet einmalig 3.000 Euro und monatlich 600 Euro. Der Leistungsumfang ist laut Anlage gleich."
  ],
  [
    "code",
    "text",
    "K_A(m) = 12.000 + 300m\nK_B(m) =  3.000 + 600m\n\n12.000 + 300m = 3.000 + 600m\n9.000 = 300m\nm = 30 Monate\n\nBeide Varianten kosten dann 21.000 Euro."
  ],
  [
    "qa",
    "**Beurteilen** Sie beide Varianten bei 24 und 36 Monaten. **Erläutern** Sie eine Grenze des Kostenvergleichs.",
    [
      "Bei 24 Monaten: A = 19.200 Euro; B = 17.400 Euro. B ist günstiger. 1 Punkt.",
      "Bei 36 Monaten: A = 22.800 Euro; B = 24.600 Euro. A ist günstiger. 1 Punkt.",
      "Nur bei vergleichbarer Leistung, Risiken und gleichen enthaltenen Kosten ist der Vergleich sinnvoll. 1 Punkt."
    ],
    3
  ],
  [
    "quiz",
    [
      {
        "q": "Was gehört in den Nenner der einfachen Amortisationsrechnung?",
        "o": [
          "Jährlicher Netto-Rückfluss nach zusätzlichen laufenden Kosten",
          "Gesamter Umsatz ohne Kosten",
          "Nur der Kaufpreis",
          "Alle Stunden ohne Umrechnung"
        ],
        "a": 0,
        "e": "Bruttoersparnis und Netto-Rückfluss dürfen nicht verwechselt werden."
      }
    ]
  ],
  [
    "see",
    [
      "ps-nutzwert",
      "ps-tco",
      "ps-risiko"
    ]
  ]
]);
