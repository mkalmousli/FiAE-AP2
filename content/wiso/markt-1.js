(function () {
  const axes = [{a: [70, 316], b: [580, 316], ea: 'arrow', s: 'text'}, {a: [70, 316], b: [70, 24], ea: 'arrow', s: 'text'}];
  const lbl = [{id: 'x', k: 'text', x: 560, y: 336, t: 'Menge', fs: 12, tc: 'text2'}, {id: 'y', k: 'text', x: 70, y: 12, t: 'Preis', fs: 12, tc: 'text2'}];
  const base = (extra, extraNodes, cap) => ({w: 620, h: 350, keep: 520, cap, nodes: lbl.concat([
    {id: 'sl', k: 'text', x: 500, y: 62, t: 'Angebot', fs: 13, b: true, tc: 'ok'}, {id: 'dl', k: 'text', x: 500, y: 296, t: 'Nachfrage', fs: 13, b: true, tc: 'accent'}], extraNodes || []),
    edges: axes.concat([{a: [110, 280], b: [480, 70], ea: 'none', s: 'ok', w: 3}, {a: [110, 70], b: [480, 280], ea: 'none', s: 'accent', w: 3}], extra || [])});
  const equi = base([{a: [70, 175], b: [295, 175], ea: 'none', k: 'dash', s: 'text3'}, {a: [295, 175], b: [295, 316], ea: 'none', k: 'dash', s: 'text3'}],
    [{id: 'e', k: 'dot', x: 295, y: 175, w: 16, h: 16, s: 'solid'}, {id: 'p', k: 'text', x: 40, y: 175, t: 'p*', fs: 13, b: true}, {id: 'q', k: 'text', x: 295, y: 332, t: 'x*', fs: 13, b: true}, {id: 'gl', k: 'text', x: 360, y: 150, t: 'Gleichgewicht', fs: 12, b: true}],
    'Marktgleichgewicht: Angebot und Nachfrage schneiden sich beim Gleichgewichtspreis p* und der Gleichgewichtsmenge x*.');
  const shift = base([{a: [170, 70], b: [540, 280], ea: 'none', s: 'accent', w: 3, k: 'dash'}, {a: [70, 158], b: [325, 158], ea: 'none', k: 'dash', s: 'text3'}, {a: [325, 158], b: [325, 316], ea: 'none', k: 'dash', s: 'text3'}, {a: [70, 175], b: [295, 175], ea: 'none', k: 'dash', s: 'text3'}],
    [{id: 'e1', k: 'dot', x: 295, y: 175, w: 12, h: 12, s: 'solid'}, {id: 'e2', k: 'dot', x: 325, y: 158, w: 12, h: 12, s: 'solid'}, {id: 'n', k: 'text', x: 530, y: 296, t: 'neue Nachfrage', fs: 12, tc: 'accent'}],
    'Die Nachfrage steigt (Kurve verschiebt sich nach rechts): Preis und Menge steigen.');
  const caps = base([{a: [70, 225], b: [460, 225], ea: 'none', k: 'dash', s: 'bad', w: 2}, {a: [207, 225], b: [207, 316], ea: 'none', k: 'dash', s: 'text3'}, {a: [383, 225], b: [383, 316], ea: 'none', k: 'dash', s: 'text3'}, {a: [70, 125], b: [460, 125], ea: 'none', k: 'dash', s: 'bad', w: 2}],
    [{id: 'h', k: 'text', x: 500, y: 225, t: 'Höchstpreis', fs: 12, b: true, tc: 'bad'}, {id: 'm', k: 'text', x: 510, y: 125, t: 'Mindestpreis', fs: 12, b: true, tc: 'bad'}, {id: 'g', k: 'text', x: 295, y: 252, t: 'Nachfrageüberhang', fs: 11, tc: 'bad'}, {id: 'a', k: 'text', x: 295, y: 108, t: 'Angebotsüberhang', fs: 11, tc: 'bad'}],
    'Eingriffe in den Preis: Ein Höchstpreis unter dem Gleichgewicht erzeugt Nachfrageüberhang (Knappheit), ein Mindestpreis darüber erzeugt Angebotsüberhang.');
  AP2.marktDiagrams = {equi, shift, caps};
  AP2.page('wiso-markt', {
    b: 'wiso', g: 'Wirtschaftliche Grundlagen', t: 'Angebot und Nachfrage, Marktformen und Preisbildung',
    d: 'Auf einem **Markt** treffen **Angebot** (Anbieter) und **Nachfrage** (Käufer) zusammen. Der **Preis** gleicht beide aus: Beim **Gleichgewichtspreis** wollen Käufer genau so viel kaufen, wie Anbieter verkaufen wollen. **Steigt der Preis, sinkt die nachgefragte und steigt die angebotene Menge** (und umgekehrt). **Marktformen** unterscheiden sich nach der Zahl der Anbieter und Nachfrager: **Monopol** (ein Anbieter), **Oligopol** (wenige), **Polypol** (viele).',
    m: '**Hoher Preis: Nachfrage sinkt, Angebot steigt. Niedriger Preis: Nachfrage steigt, Angebot sinkt. Gleichgewicht: Schnittpunkt.** Marktformen: **Mono = einer, Oligo = wenige, Poly = viele** (Anbieter). Nachfrager-Seite: **Monopson**, Oligopson, Polypson. **Wettbewerb nützt dem Verbraucher** (niedrige Preise).',
    cheat: [
      ['Angebot und Nachfrage', ['**Nachfragekurve fällt**: höherer Preis, weniger Nachfrage', '**Angebotskurve steigt**: höherer Preis, mehr Angebot', '**Gleichgewichtspreis:** Schnittpunkt, Markt wird geräumt', '**Nachfrageüberhang:** Preis zu niedrig, Knappheit, Preis steigt', '**Angebotsüberhang:** Preis zu hoch, Überschuss, Preis sinkt']],
      ['Verschiebungen', ['**Nachfrage steigt** (Einkommen, Mode, Bevölkerung): Preis und Menge **steigen**', '**Angebot steigt** (billigere Produktion, Technik): Preis **sinkt**, Menge **steigt**', 'Kurven **verschieben** sich, wenn sich **Einflussfaktoren** ändern (nicht der Preis)']],
      ['Marktformen (Anbieter)', ['**Monopol:** 1 Anbieter, Preissetzer', '**Oligopol:** wenige Anbieter (Autos, Mobilfunk, Energie), Absprachen möglich', '**Polypol:** viele Anbieter (Marktplatz, Gemüse), Preisnehmer']],
      ['Staatliche Eingriffe', ['**Höchstpreis** (Mietpreisbremse): Nachfrageüberhang', '**Mindestpreis** (Mindestlohn, Agrarpreis): Angebotsüberhang', '**Kartellverbot** (GWB), **Bundeskartellamt**', 'Subventionen, Steuern']],
    ],
    blocks: [
      ['h', 'Was ist ein Markt?'],
      ['p', 'Ein **Markt** ist der Ort (oder die Plattform), an dem **Anbieter und Nachfrager** zusammentreffen und **Preise** entstehen: der Wochenmarkt, ein Online-Shop, die Börse, der Arbeitsmarkt. Güter sind **knapp**, deshalb haben sie einen **Preis**. Der **Preis** hat mehrere **Funktionen**:'],
      ['table', ['Preisfunktion', 'Bedeutung'], [['**Ausgleichsfunktion**', 'Der Preis bringt Angebot und Nachfrage **ins Gleichgewicht**.'], ['**Signalfunktion**', 'Hohe Preise zeigen **Knappheit**, niedrige **Überfluss**.'], ['**Lenkungsfunktion** (Allokation)', 'Produktionsfaktoren fließen dorthin, wo sie am **dringendsten** gebraucht werden (hohe Gewinne ziehen Anbieter an).'], ['**Zuteilungs- und Auslesefunktion**', 'Wer den Preis zahlen kann und will, bekommt das Gut; **ineffiziente** Anbieter scheiden aus.']]],
      ['h', 'Angebot und Nachfrage'],
      ['diagram', equi],
      ['kv', [
        ['Nachfrage', 'Menge, die Käufer bei einem bestimmten Preis **kaufen wollen**. Je **höher** der Preis, desto **niedriger** die Nachfrage (**fallende Kurve**).'],
        ['Angebot', 'Menge, die Anbieter bei einem bestimmten Preis **verkaufen wollen**. Je **höher** der Preis, desto **höher** das Angebot (**steigende Kurve**), weil sich Produktion mehr lohnt.'],
        ['Gleichgewichtspreis', 'Preis, bei dem **Angebotsmenge = Nachfragemenge**. Der Markt wird **geräumt** (kein Überschuss, keine Knappheit).'],
        ['Nachfrageüberhang', 'Preis **unter** dem Gleichgewichtspreis: Mehr Nachfrage als Angebot. **Knappheit**, der Preis **steigt**.'],
        ['Angebotsüberhang', 'Preis **über** dem Gleichgewichtspreis: Mehr Angebot als Nachfrage. **Überschuss**, der Preis **sinkt** (Schlussverkauf).'],
      ]],
    ],
  });
})();
