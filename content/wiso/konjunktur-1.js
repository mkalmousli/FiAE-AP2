AP2.page('wiso-konjunktur', {
  b: 'wiso', g: 'Wirtschaftliche Grundlagen', t: 'Konjunktur, Inflation und Deflation',
  d: '**Konjunktur** sind die **kurzfristigen Schwankungen** der Wirtschaftsleistung (BIP) um einen langfristigen **Wachstumstrend**. Ein **Konjunkturzyklus** hat vier Phasen: **Aufschwung (Expansion)**, **Boom (Hochkonjunktur)**, **Abschwung (Rezession)** und **Tiefstand (Depression)**. **Inflation** ist ein **dauerhafter Anstieg des Preisniveaus** (Kaufkraftverlust), **Deflation** ein **dauerhaftes Sinken**. Ziel der Wirtschaftspolitik: **Preisstabilität** (**EZB: etwa 2 Prozent Inflation**) bei hohem Wachstum und Beschäftigung.',
  m: '**Phasen: Aufschwung, Boom, Abschwung, Tief (Auf-Boom-Ab-Tief).** **Rezession = BIP sinkt in zwei Quartalen hintereinander.** **Inflation = Preise steigen, Geld verliert Kaufkraft; Deflation = Preise sinken, Käufer warten.** **Magisches Viereck: Preisstabilität, hoher Beschäftigungsstand, außenwirtschaftliches Gleichgewicht, stetiges Wachstum.**',
  cheat: [
    ['Konjunkturphasen', ['**Aufschwung:** BIP wächst, Arbeitslosigkeit sinkt, Investitionen steigen', '**Boom (Hochkonjunktur):** Spitze, Vollbeschäftigung, hohe Preise und Zinsen, Kapazitäten ausgelastet', '**Abschwung (Rezession):** BIP sinkt, Entlassungen, Konsum und Investitionen fallen', '**Tiefstand (Depression):** Tiefpunkt, hohe Arbeitslosigkeit, niedrige Preise und Zinsen']],
    ['Indikatoren', ['**Frühindikatoren:** Auftragseingang, ifo-Geschäftsklima, Baugenehmigungen, Aktienkurse', '**Gegenwartsindikatoren:** BIP, Produktion, Kapazitätsauslastung', '**Spätindikatoren:** Arbeitslosenquote, Verbraucherpreise, Insolvenzen']],
    ['Inflation', ['**Preisniveau steigt dauerhaft**, Kaufkraft sinkt', 'Messung: **Verbraucherpreisindex (VPI)** / Warenkorb', 'Ursachen: **Nachfragesog**, **Kostendruck**, **importiert**, Geldmengenwachstum', 'EZB-Ziel: **2 %**']],
    ['Wirtschaftspolitik', ['**Fiskalpolitik** (Staat: Steuern, Ausgaben)', '**Geldpolitik** (EZB: Leitzins, Geldmenge)', '**Antizyklisch:** im Abschwung fördern, im Boom bremsen', '**Stabilitätsgesetz 1967:** magisches Viereck']],
  ],
  blocks: [
    ['h', 'Der Konjunkturzyklus'],
    ['p', 'Die Wirtschaft wächst **nicht gleichmäßig**. Phasen hoher Nachfrage und voller Auftragsbücher wechseln mit Phasen schwacher Nachfrage und Kurzarbeit. Diese **wellenförmigen Schwankungen** des BIP um den **Trend** nennt man **Konjunktur**. Ein vollständiger Wellenzug dauert etwa 4 bis 10 Jahre.'],
    ['diagram', {w: 780, h: 330, keep: 640, cap: 'Der Konjunkturzyklus: Das BIP schwankt wellenförmig um den langfristigen Wachstumstrend (gestrichelt).', nodes: [
      {id: 'a', k: 'text', x: 180, y: 290, t: 'Aufschwung', fs: 13, b: true, tc: 'ok'}, {id: 'b', k: 'text', x: 285, y: 24, t: 'Boom (Hochkonjunktur)', fs: 13, b: true, tc: 'accent'}, {id: 'c', k: 'text', x: 430, y: 290, t: 'Abschwung (Rezession)', fs: 13, b: true, tc: 'bad'}, {id: 'd', k: 'text', x: 345, y: 318, t: 'Tiefstand (Depression)', fs: 13, b: true, tc: 'text2'}, {id: 'tr', k: 'text', x: 700, y: 124, t: 'Trend', fs: 12, tc: 'text3'}, {id: 'x', k: 'text', x: 750, y: 308, t: 'Zeit', fs: 12, tc: 'text2'}, {id: 'y', k: 'text', x: 30, y: 12, t: 'BIP', fs: 12, tc: 'text2'},
    ], edges: [{a: [50, 300], b: [760, 300], ea: 'arrow', s: 'text'}, {a: [50, 300], b: [50, 24], ea: 'arrow', s: 'text'}, {a: [50, 190], b: [720, 130], ea: 'none', s: 'text3', k: 'dash'},
      {a: [60, 200], b: [740, 100], via: [[130, 235], [220, 170], [285, 90], [350, 150], [415, 240], [480, 215], [560, 130], [640, 95], [700, 105]], sm: true, ea: 'none', s: 'accent', w: 3}]}],
    ['table', ['Merkmal', 'Aufschwung', 'Boom', 'Abschwung (Rezession)', 'Tiefstand (Depression)'], [
      ['**BIP-Wachstum**', 'steigt', 'sehr hoch, Spitze', 'sinkt, negativ', 'sehr niedrig oder negativ'],
      ['**Beschäftigung**', 'steigt, Arbeitslosigkeit sinkt', 'Vollbeschäftigung, Fachkräftemangel', 'steigende Arbeitslosigkeit', 'hohe Arbeitslosigkeit'],
      ['**Investitionen**', 'nehmen zu', 'hoch, Kapazitäten ausgelastet', 'nehmen ab', 'sehr gering'],
      ['**Preise / Inflation**', 'leicht steigend', '**stark steigend**', 'Preisanstieg lässt nach', 'niedrig, evtl. fallend'],
      ['**Zinsen**', 'steigen', '**hoch**', 'sinken', 'niedrig'],
      ['**Löhne und Gewinne**', 'steigen', 'hoch', 'stagnieren, sinken', 'niedrig, Insolvenzen'],
      ['**Stimmung**', 'optimistisch', 'euphorisch', 'pessimistisch', 'Krise'],
    ]],
    ['kv', [
      ['Rezession', 'Technisch: **BIP sinkt in mindestens zwei aufeinanderfolgenden Quartalen** gegenüber dem Vorquartal. Folgen: Kurzarbeit, Entlassungen, Insolvenzen.'],
      ['Depression', 'Besonders **tiefe und lange** Rezession (zum Beispiel **Weltwirtschaftskrise 1929**).'],
      ['Stagflation', '**Stagnation** (kein Wachstum) **plus Inflation** (Preisanstieg) gleichzeitig, zum Beispiel in den **Ölkrisen der 1970er-Jahre**.'],
      ['Strukturwandel', 'Langfristige Verschiebung der Wirtschaft zwischen Branchen (Industrie zu Dienstleistung, Digitalisierung). Nicht dasselbe wie Konjunktur.'],
    ]],
    ['h', 'Konjunkturindikatoren'],
    ['table', ['Art', 'Zeigt ...', 'Beispiele'], [['**Frühindikatoren**', 'die Entwicklung **vorher**', 'ifo-Geschäftsklimaindex, Auftragseingänge, Baugenehmigungen, Aktienkurse, Einkaufsmanagerindex'], ['**Präsenz-/Gegenwartsindikatoren**', 'den **aktuellen** Stand', '**BIP**, Produktion, Einzelhandelsumsatz, Kapazitätsauslastung'], ['**Spätindikatoren**', 'die Entwicklung **nachträglich**', '**Arbeitslosenquote**, Inflationsrate, Insolvenzen, Lohnentwicklung']]],
  ],
});
