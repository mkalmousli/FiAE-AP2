AP2.page('wiso-kreislauf', {
  b: 'wiso', g: 'Wirtschaftliche Grundlagen', t: 'Wirtschaftskreislauf (einfach und erweitert)',
  d: 'Der **Wirtschaftskreislauf** ist ein **Modell**, das die **Güter- und Geldströme** zwischen den **Wirtschaftssektoren** darstellt. Im **einfachen Kreislauf** tauschen nur **Haushalte** und **Unternehmen**: Haushalte stellen **Arbeit** bereit und erhalten **Einkommen**, kaufen damit **Güter** der Unternehmen. Im **erweiterten Kreislauf** kommen **Staat**, **Banken (Vermögensänderung)** und **Ausland** hinzu.',
  m: '**Haushalte: Arbeit rein, Geld raus (Konsum). Unternehmen: Güter raus, Geld rein.** Erweitert: **Staat** (Steuern rein, Staatsausgaben und Transfers raus), **Banken** (Ersparnis rein, Kredite/Investitionen raus), **Ausland** (Export/Import). Gleichgewicht: **Sparen = Investieren**. **BIP = C + I + G + (Ex - Im).**',
  cheat: [
    ['Einfacher Kreislauf', ['**Haushalte** und **Unternehmen**', '**Realströme:** Arbeit, Güter und Dienstleistungen', '**Geldströme:** Einkommen (Lohn, Gewinn, Zins), Konsumausgaben', 'Geld- und Gütermenge **entsprechen sich**']],
    ['Erweiterter Kreislauf', ['+ **Staat:** Steuern, Staatsausgaben, Transferzahlungen, Subventionen', '+ **Banken/Vermögensänderung:** Sparen, Kredite, Investitionen', '+ **Ausland:** Exporte, Importe']],
    ['Wichtige Größen', ['**BIP** (Bruttoinlandsprodukt): Wert aller Güter/Dienstleistungen im Inland pro Jahr', '**Konsum (C)**, **Investitionen (I)**, **Staatsausgaben (G)**, **Außenbeitrag (Ex - Im)**', '**Nominal** vs **real** (preisbereinigt)', '**Volkseinkommen**']],
    ['Gleichgewicht', ['**Ersparnis = Investition**', 'Staatshaushalt: Steuern = Staatsausgaben', 'Export = Import (außenwirtschaftliches Gleichgewicht)']],
  ],
  blocks: [
    ['h', 'Warum ein Kreislaufmodell?'],
    ['p', 'Die Wirtschaft besteht aus Millionen Entscheidungen. Das **Kreislaufmodell** vereinfacht sie auf wenige **Sektoren** (Gruppen mit gleichem Verhalten) und zeigt, **wie sie zusammenhängen**: Die Ausgaben des einen sind die Einnahmen des anderen. Es hilft zu verstehen, wie **Einkommen entsteht**, wie **Konjunktur** funktioniert und welche Wirkung **Sparen** oder **Staatsausgaben** haben.'],
    ['h', 'Der einfache Wirtschaftskreislauf'],
    ['diagram', {w: 760, h: 300, keep: 600, cap: 'Einfacher Wirtschaftskreislauf: Außen die Realströme (Arbeit, Güter), innen die Geldströme (Einkommen, Konsumausgaben).', nodes: [
      {id: 'h', k: 'round', x: 130, y: 150, t: ['Haushalte', '(Konsum, Arbeit)'], w: 180, h: 80, s: 'accent'}, {id: 'u', k: 'round', x: 630, y: 150, t: ['Unternehmen', '(Produktion)'], w: 180, h: 80, s: 'solid'},
      {id: 't1', k: 'text', x: 380, y: 38, t: 'Arbeit, Boden, Kapital (Produktionsfaktoren)', fs: 12, tc: 'text2', b: true}, {id: 't2', k: 'text', x: 380, y: 126, t: 'Einkommen: Löhne, Gewinne, Zinsen, Mieten', fs: 12, tc: 'ok', b: true}, {id: 't3', k: 'text', x: 380, y: 176, t: 'Konsumausgaben (Geld)', fs: 12, tc: 'accent', b: true}, {id: 't4', k: 'text', x: 380, y: 262, t: 'Güter und Dienstleistungen', fs: 12, tc: 'text2', b: true},
    ], edges: [{a: 'h', b: 'u', via: [[130, 55], [630, 55]], k: 'dash'}, {a: 'u', b: 'h', via: [[630, 245], [130, 245]], k: 'dash'}, {a: [215, 138], b: [545, 138], s: 'ok'}, {a: [545, 162], b: [215, 162], s: 'accent'}]}],
    ['table', ['Strom', 'Richtung', 'Art', 'Beispiel'], [
      ['Produktionsfaktoren (Arbeit, Boden, Kapital)', 'Haushalte zu Unternehmen', 'Realstrom', 'Mitarbeiter arbeitet im Softwarehaus'],
      ['**Einkommen** (Löhne, Gehälter, Zinsen, Mieten, Gewinne)', 'Unternehmen zu Haushalte', 'Geldstrom', 'Gehalt 3.200 Euro'],
      ['**Konsumausgaben**', 'Haushalte zu Unternehmen', 'Geldstrom', 'Kauf eines Laptops'],
      ['Güter und Dienstleistungen', 'Unternehmen zu Haushalte', 'Realstrom', 'Laptop wird geliefert'],
    ]],
    ['note', 'Das einfache Modell **ohne Sparen**: Alle Einkommen werden **vollständig für Konsum** ausgegeben. Dann gilt: **Einkommen = Konsumausgaben = Wert der Produktion.** Der Kreislauf ist **geschlossen** und die Wirtschaft bleibt auf gleichem Niveau (stationäre Wirtschaft).'],
  ],
});
