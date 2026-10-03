AP2.add('ps-lizenzen', [
  ['h', 'Open Source: Was bedeutet das genau?'],
  ['p', 'Open-Source-Software hat einen **offenen Quellcode**. Jeder darf ihn **lesen, ändern und weitergeben** (nach der Open Source Definition). **Frei** bedeutet dabei Freiheit, nicht unbedingt gratis. Die Bedingungen stehen in der Lizenz. Man unterscheidet drei Gruppen:'],
  ['table', ['Gruppe', 'Beispiele', 'Pflichten', 'Wirkung auf eigenen Code'], [
    ['**Permissiv**', 'MIT, BSD, Apache 2.0', 'Lizenztext und Urheberhinweis beilegen (Apache: Änderungen kennzeichnen, Patentklausel)', 'Eigener Code darf **proprietär bleiben**'],
    ['**Schwaches Copyleft**', 'LGPL, MPL', 'Änderungen **an der Bibliothek selbst** müssen offen bleiben', 'Eigener Code, der die Bibliothek nur **nutzt**, darf proprietär sein'],
    ['**Starkes Copyleft**', 'GPL (v2, v3)', 'Bei **Weitergabe** muss das **gesamte abgeleitete Werk** unter der GPL stehen, Quellcode muss verfügbar sein', 'Eigener Code, der GPL-Code **einbindet**, wird ebenfalls GPL'],
    ['**Netzwerk-Copyleft**', 'AGPL', 'Wie GPL, aber auch wenn Software nur über das **Netz** angeboten wird (SaaS)', 'Quellcode muss auch für Nutzer des Dienstes verfügbar sein'],
  ]],
  ['diagram', {w: 720, h: 210, cap: 'Lizenzen von frei (links) zu restriktiv (rechts).', nodes: [
    {id: 'a', k: 'round', x: 90, y: 100, t: ['Public Domain', 'CC0'], w: 140, h: 56, s: 'ok'}, {id: 'b', k: 'round', x: 250, y: 100, t: ['MIT / BSD', 'Apache 2.0'], w: 140, h: 56, s: 'ok'},
    {id: 'c', k: 'round', x: 410, y: 100, t: ['LGPL / MPL', 'schwaches Copyleft'], w: 150, h: 56, s: 'accent'}, {id: 'd', k: 'round', x: 570, y: 100, t: ['GPL / AGPL', 'starkes Copyleft'], w: 150, h: 56, s: 'accent'}, {id: 'e', k: 'round', x: 690, y: 170, t: 'Proprietär', w: 110, h: 40, s: 'bad'},
  ], edges: [{a: 'a', b: 'b', ea: 'none', k: 'dash'}, {a: 'b', b: 'c', ea: 'none', k: 'dash'}, {a: 'c', b: 'd', ea: 'none', k: 'dash'}]}],
  ['procon', 'GPL-Bibliothek in einem kommerziellen Programm verwenden?', ['Die GPL erlaubt kommerzielle Nutzung ausdrücklich', 'Eine **interne** Nutzung (ohne Weitergabe) löst die Pflichten nicht aus', 'Zugriff auf Weiterentwicklungen der Community'], ['Bei **Weitergabe** (Verkauf, Auslieferung) muss das ganze Programm unter GPL gestellt und der Quellcode offengelegt werden', 'Geschäftsmodell mit geschlossener Software ist dann nicht möglich', 'Alternativ: Bibliothek mit permissiver Lizenz verwenden oder kommerzielle Lizenz kaufen']],
  ['h', 'Creative Commons (für Texte, Bilder, Musik)'],
  ['table', ['Kürzel', 'Bedeutung', 'Bedingung'], [
    ['CC BY', 'Namensnennung', 'Urheber nennen'],
    ['CC BY-SA', 'Namensnennung, Weitergabe unter gleichen Bedingungen', 'Wie Copyleft'],
    ['CC BY-NC', 'Nicht kommerziell', 'Nur nicht-kommerzielle Nutzung'],
    ['CC BY-ND', 'Keine Bearbeitung', 'Unverändert weitergeben'],
    ['CC0', 'Gemeinfrei', 'Keine Bedingungen'],
  ]],
  ['warn', 'Ein Bild "aus dem Internet" ist **nicht frei**. Ohne Lizenz gilt das Urheberrecht. Du musst die Lizenz prüfen und die Bedingungen erfüllen (zum Beispiel Namensnennung). Auch Bibliotheken und Schriftarten brauchen eine **kompatible Lizenz** zu deiner Software.'],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Ein Unternehmen möchte eine Open-Source-Bibliothek unter der GPL in ein kommerzielles Produkt einbauen, das an Kunden verkauft wird. Welche Folgen hat das?', 'Die GPL ist ein starkes Copyleft: Wird das Produkt weitergegeben, muss das **gesamte abgeleitete Werk** ebenfalls unter der GPL stehen und der Quellcode muss offengelegt werden. Das widerspricht einem proprietären Geschäftsmodell. Alternativen: eine Bibliothek unter permissiver Lizenz (MIT, Apache), eine LGPL-Bibliothek, oder eine kommerzielle Lizenz erwerben.', 5],
  ['qa', 'Ein Angestellter entwickelt im Rahmen seiner Arbeit ein Programm. Wem stehen die Nutzungsrechte zu?', 'Nach § 69b UrhG dem **Arbeitgeber**, sofern nichts anderes vereinbart ist. Der Angestellte bleibt Urheber, das Urheberpersönlichkeitsrecht verbleibt bei ihm, aber die wirtschaftlichen Verwertungsrechte stehen dem Arbeitgeber zu.', 3],
  ['qa', 'Nennen Sie je zwei Unterschiede zwischen Freeware und Open Source.', ['- Freeware: Quellcode meist **nicht** verfügbar, Änderung und Weitergabe meist nicht erlaubt.', '- Open Source: Quellcode **offen**, Änderung und Weitergabe unter den Bedingungen der Lizenz erlaubt.'], 4],
  ['quiz', [
    {q: 'Welche Lizenz ist ein starkes Copyleft?', o: ['GPL', 'MIT', 'BSD', 'Apache 2.0'], a: 0, e: 'Die GPL verlangt, dass abgeleitete Werke ebenfalls unter GPL stehen.'},
    {q: 'Wer ist Urheber einer Software?', o: ['Die natürliche Person, die sie geschaffen hat', 'Immer die Firma', 'Der Auftraggeber', 'Die IHK'], a: 0, e: 'Urheber ist immer eine natürliche Person; Firmen erwerben Nutzungsrechte.'},
    {q: 'Was ist Freeware?', o: ['Kostenlos nutzbare Software mit geschlossenem Quellcode', 'Software mit offenem Quellcode', 'Software, die nur Behörden nutzen', 'Software ohne Lizenz'], a: 0, e: 'Freeware ist kostenlos, aber nicht zwingend frei im Sinne von Open Source.'},
    {q: 'Wie lange wirkt das Urheberrecht nach dem Tod des Urhebers?', o: ['70 Jahre', '10 Jahre', '1 Jahr', 'Unbegrenzt'], a: 0, e: 'Die Schutzdauer beträgt in Deutschland 70 Jahre nach dem Tod des Urhebers.'},
  ]],
]);
