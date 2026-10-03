AP2.add('wiso-konjunktur', [
  ['h', 'Wirtschaftspolitik: Das magische Viereck'],
  ['p', 'Das **Stabilitäts- und Wachstumsgesetz (StabG, 1967)** verpflichtet Bund und Länder, bei ihren Maßnahmen **vier Ziele gleichzeitig** zu beachten. Sie stehen teilweise im **Zielkonflikt**, daher "magisch" (nur schwer alle gleichzeitig erreichbar). Das **magische Sechseck** ergänzt **Umweltschutz** und **gerechte Einkommensverteilung**.'],
  ['diagram', {w: 760, h: 270, keep: 600, cap: 'Magisches Viereck (Stabilitätsgesetz): vier gleichzeitig angestrebte Ziele', nodes: [
    {id: 'a', k: 'round', x: 380, y: 40, t: ['Preisniveaustabilität', '(Inflation unter 2 %)'], w: 230, h: 56, s: 'accent'}, {id: 'b', k: 'round', x: 130, y: 135, t: ['Hoher Beschäftigungsstand', '(niedrige Arbeitslosigkeit)'], w: 230, h: 56, s: 'accent'}, {id: 'c', k: 'round', x: 630, y: 135, t: ['Stetiges, angemessenes', 'Wirtschaftswachstum'], w: 230, h: 56, s: 'accent'}, {id: 'd', k: 'round', x: 380, y: 230, t: ['Außenwirtschaftliches', 'Gleichgewicht'], w: 230, h: 56, s: 'accent'}, {id: 'm', k: 'oval', x: 380, y: 135, t: 'Magisches Viereck', w: 150, h: 54, s: 'solid'},
  ], edges: [{a: 'a', b: 'b', ea: 'none'}, {a: 'b', b: 'd', ea: 'none'}, {a: 'd', b: 'c', ea: 'none'}, {a: 'c', b: 'a', ea: 'none'}, {a: 'a', b: 'd', ea: 'none', k: 'dash'}, {a: 'b', b: 'c', ea: 'none', k: 'dash'}]}],
  ['kv', [
    ['Preisniveaustabilität', 'Die Inflationsrate soll gering sein (EZB: **mittelfristig 2 %**).'],
    ['Hoher Beschäftigungsstand', 'Möglichst **niedrige Arbeitslosenquote** (Vollbeschäftigung etwa 2 bis 3 % Sockel).'],
    ['Stetiges und angemessenes Wirtschaftswachstum', 'Reales BIP wächst, aber nicht zu schnell (Überhitzung).'],
    ['Außenwirtschaftliches Gleichgewicht', 'Exporte und Importe halten sich ungefähr die Waage (**Außenbeitrag** nahe null; Deutschland hat dauerhaft Exportüberschüsse).'],
    ['Zielkonflikt', 'Beispiel **Phillips-Kurve**: Niedrige Arbeitslosigkeit (Boom) führt oft zu **Inflation**. Umgekehrt bremst Inflationsbekämpfung (hohe Zinsen) das Wachstum und Beschäftigung.'],
  ]],
  ['h', 'Konjunkturpolitik: Staat und EZB'],
  ['table', ['Politikfeld', 'Träger', 'Instrumente', 'Antizyklisches Verhalten'], [
    ['**Fiskalpolitik** (Finanzpolitik)', 'Bundesregierung, Parlament', 'Steuern, Staatsausgaben, Investitionsprogramme, Kurzarbeit, Subventionen', 'Abschwung: **Steuern senken**, **mehr investieren** (Staatsverschuldung steigt). Boom: **sparen**, Schulden abbauen'],
    ['**Geldpolitik**', '**Europäische Zentralbank (EZB)**, Sitz Frankfurt', '**Leitzins**, Anleihekäufe, Mindestreserve, Offenmarktgeschäfte', 'Abschwung: **Leitzins senken** (billige Kredite). Boom/Inflation: **Leitzins erhöhen** (Kredite teurer, Nachfrage sinkt)'],
    ['**Lohnpolitik**', 'Tarifparteien', 'Tarifabschlüsse', 'Moderate Lohnabschlüsse bremsen Kosten'],
    ['**Ordnungspolitik**', 'Staat', 'Wettbewerbsrecht, Regulierung', 'Rahmenbedingungen'],
  ]],
  ['h', 'Inflation'],
  ['p', '**Inflation** bedeutet, dass das **allgemeine Preisniveau dauerhaft steigt**, das Geld verliert an **Kaufkraft**. Gemessen wird sie mit dem **Verbraucherpreisindex (VPI)**: Ein **Warenkorb** typischer Güter und Dienstleistungen (Miete, Lebensmittel, Energie, Verkehr) wird regelmäßig bepreist. Die **Inflationsrate** ist die **prozentuale Veränderung** des Index gegenüber dem Vorjahr.'],
  ['code', 'text', `Inflationsrate in % = (Preisindex neu - Preisindex alt) / Preisindex alt mal 100

Beispiel: Index 2024 = 106,0 ; Index 2025 = 108,2
Inflationsrate = (108,2 - 106,0) / 106,0 mal 100 = 2,08 % (ca. 2,1 %)

Kaufkraft des Euro = 1 / Preisindex  (Index 100 -> 105: Kaufkraftverlust 4,76 %)
Realeinkommen: Lohn + 3 %, Preise + 4 %  ->  real ca. -1 %`],
  ['table', ['Ursache', 'Erklärung', 'Beispiel'], [['**Nachfrageinflation** (Nachfragesog)', 'Gesamtnachfrage **übersteigt** das Angebot (Boom, zu viel Geld)', 'Hohe Konsumlaune, Konjunkturprogramme'], ['**Angebots-/Kosteninflation** (Kostendruck)', 'Produktionskosten steigen und werden **an Kunden weitergegeben**', 'Energiepreise, Löhne, Rohstoffe, Lieferengpässe'], ['**Importierte Inflation**', 'Höhere **Einfuhrpreise**, schwacher Euro', 'Teurere Rohöl-Importe'], ['**Geldmengeninflation**', 'Die **Geldmenge** wächst schneller als die Gütermenge', 'Verschuldung durch Geldschöpfung']]],
  ['procon', 'Folgen der Inflation', ['**Schuldner profitieren** (reale Schuldenlast sinkt)', 'Leichte Inflation (2 %) schafft Spielraum für Lohnanpassungen und Schutz vor Deflation'], ['**Sparer verlieren** (Zinsen unter Inflation: negativer Realzins)', '**Kaufkraftverlust** bei festen Einkommen (Rentner, Transferbezieher)', 'Unsicherheit bei Investitionen, **Verteilungswirkung** (Sachwerte-Besitzer gewinnen)', '**Hyperinflation** zerstört Vertrauen in die Währung (1923)']],
  ['h', 'Deflation'],
  ['p', '**Deflation** ist ein **dauerhafter Rückgang des Preisniveaus**. Es klingt gut ("alles wird billiger"), ist aber gefährlich: Verbraucher **verschieben Käufe** (morgen ist es billiger), Unternehmen verkaufen weniger, **senken Preise, Löhne und Investitionen**, entlassen Mitarbeiter: Es entsteht eine **Abwärtsspirale**. Die **reale Schuldenlast steigt**. Beispiel: **Japan** seit den 1990ern. Die EZB strebt daher bewusst **etwa 2 % Inflation** an, nicht 0 %.'],
  ['diagram', AP2.dg.cycle(['Preise sinken', 'Käufer warten ab', 'Umsatz sinkt', 'Unternehmen sparen, entlassen', 'Einkommen und Nachfrage sinken'], {w: 760, h: 340, rx: 280, ry: 110, nh: 50, styles: ['accent', 'accent', 'bad', 'bad', 'bad'], k: 'round', cap: 'Deflationsspirale: Sinkende Preise verstärken sich selbst.'})],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Beschreiben Sie die vier Phasen des Konjunkturzyklus und nennen Sie je zwei Merkmale.', ['- **Aufschwung:** steigendes BIP, sinkende Arbeitslosigkeit, zunehmende Investitionen.', '- **Boom:** höchste Auslastung, Vollbeschäftigung, stark steigende Preise und Zinsen.', '- **Abschwung (Rezession):** BIP sinkt, Arbeitslosigkeit steigt, Investitionen und Konsum gehen zurück.', '- **Tiefstand (Depression):** niedrigste Produktion, hohe Arbeitslosigkeit, niedrige Zinsen und Preise.'], 8],
  ['qa', 'Wie reagiert die EZB typischerweise bei zu hoher Inflation und warum?', 'Die EZB **erhöht den Leitzins**. Kredite werden **teurer**, Unternehmen und Haushalte **investieren und konsumieren weniger**, die **Nachfrage sinkt** und der Preisanstieg verlangsamt sich. Nebenwirkung: Das Wirtschaftswachstum und die Beschäftigung können **gebremst** werden (Zielkonflikt).', 4],
  ['qa', 'Berechnen Sie die Inflationsrate: Der Preisindex betrug im Vorjahr 112,0 und beträgt jetzt 115,6.', ['(115,6 - 112,0) / 112,0 mal 100 = 3,6 / 112,0 mal 100 = **3,21 Prozent**.'], 3],
  ['qa', 'Warum ist Deflation für eine Volkswirtschaft gefährlich?', 'Fallende Preise führen dazu, dass Käufer **Anschaffungen aufschieben**. Die sinkende Nachfrage zwingt Unternehmen zu **Preissenkungen, Entlassungen und weniger Investitionen**, die Einkommen sinken, die Nachfrage sinkt weiter (**Deflationsspirale**). Zudem steigt die **reale Schuldenlast**.', 4],
  ['quiz', [
    {q: 'Welche Phase folgt auf den Boom?', o: ['Abschwung (Rezession)', 'Aufschwung', 'Tiefstand', 'Trend'], a: 0, e: 'Aufschwung, Boom, Abschwung, Tiefstand.'},
    {q: 'Wann spricht man von einer (technischen) Rezession?', o: ['BIP sinkt zwei Quartale in Folge', 'BIP steigt um 1 %', 'Inflation über 5 %', 'Arbeitslosenquote unter 3 %'], a: 0, e: 'Zwei negative Quartale hintereinander.'},
    {q: 'Welches Inflationsziel verfolgt die EZB mittelfristig?', o: ['Etwa 2 %', '0 %', '10 %', '5 %'], a: 0, e: 'Preisstabilität bedeutet bei der EZB eine Inflationsrate von etwa 2 %.'},
    {q: 'Welches Instrument der EZB wirkt gegen Inflation?', o: ['Leitzins erhöhen', 'Leitzins senken', 'Steuern senken', 'Löhne erhöhen'], a: 0, e: 'Höhere Zinsen dämpfen Kredite und Nachfrage.'},
    {q: 'Was gehört zum magischen Viereck?', o: ['Preisniveaustabilität', 'Gewerkschaftsfreiheit', 'Steuersenkung', 'Bildungsurlaub'], a: 0, e: 'Preisstabilität, Beschäftigung, Wachstum, außenwirtschaftliches Gleichgewicht.'},
    {q: 'Wer profitiert bei Inflation tendenziell?', o: ['Schuldner', 'Sparer mit niedrigen Zinsen', 'Rentner', 'Gläubiger mit festen Zinsen'], a: 0, e: 'Der reale Wert von Schulden sinkt.'},
  ]],
]);
