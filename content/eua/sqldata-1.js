// Gemeinsame Beispieldatenbank für alle SQL-Seiten (Webshop).
(function () {
  const kunde = ['table', ['kunden_id', 'name', 'ort'], [['1', 'Meier', 'Göppingen'], ['2', 'Schulz', 'Ulm'], ['3', 'Yilmaz', 'Stuttgart'], ['4', 'Brandt', 'Ulm']], {first: false}];
  const artikel = ['table', ['artikel_id', 'bezeichnung', 'preis', 'kategorie'], [['1', 'Maus', '19.90', 'Zubehör'], ['2', 'Tastatur', '39.90', 'Zubehör'], ['3', 'Monitor', '189.00', 'Hardware'], ['4', 'Laptop', '899.00', 'Hardware'], ['5', 'Kabel', '4.90', 'Zubehör'], ['6', 'Webcam', '49.00', 'Zubehör']], {first: false}];
  const bestellung = ['table', ['bestell_id', 'datum', 'kunden_id'], [['101', '2026-03-02', '1'], ['102', '2026-03-05', '1'], ['103', '2026-03-06', '2'], ['104', '2026-03-09', '3']], {first: false}];
  const position = ['table', ['bestell_id', 'artikel_id', 'menge'], [['101', '1', '2'], ['101', '5', '3'], ['102', '3', '1'], ['103', '2', '1'], ['103', '1', '1'], ['104', '4', '1']], {first: false}];
  AP2.sqlBlocks = {
    schema: [
      ['h3', 'Die Beispieldatenbank (Webshop)'],
      ['p', 'Alle SQL-Seiten nutzen dieselbe kleine Datenbank. Du kannst jede Abfrage von Hand nachrechnen. **Primärschlüssel** sind fett markiert im Modell, die Verbindungen laufen über **Fremdschlüssel**.'],
      ['diagram', {w: 780, h: 250, keep: 640, cap: 'ER-Modell des Webshops in Krähenfuß-Notation', nodes: [
        {id: 'k', k: 'cls', x: 100, y: 110, w: 170, t: {name: 'kunde', attrs: ['PK  kunden_id', 'name', 'ort']}}, {id: 'b', k: 'cls', x: 330, y: 110, w: 170, t: {name: 'bestellung', attrs: ['PK  bestell_id', 'datum', 'FK  kunden_id']}},
        {id: 'p', k: 'cls', x: 560, y: 110, w: 170, t: {name: 'position', attrs: ['PK/FK  bestell_id', 'PK/FK  artikel_id', 'menge']}}, {id: 'a', k: 'cls', x: 560, y: 215, w: 170, t: {name: 'artikel', attrs: ['PK  artikel_id', 'bezeichnung', 'preis', 'kategorie']}},
      ], edges: [{a: 'k', b: 'b', sa: 'one', ea: 'zeromany'}, {a: 'b', b: 'p', sa: 'one', ea: 'many'}, {a: 'a', b: 'p', sa: 'one', ea: 'zeromany'}]}],
      ['row', [kunde, bestellung]],
      ['row', [artikel, position]],
    ],
  };
})();
