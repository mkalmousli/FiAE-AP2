// Inhaltsspeicher: Seiten registrieren und in Teilen erweitern (Suche: core/index.js, core/search.js).
(function () {
  const BLOCKS = [
    {id: 'ps', t: 'Planen eines Softwareproduktes', s: 'Projektmanagement, Anforderungen, UML, Datenmodellierung, Qualität, Recht'},
    {id: 'infra', t: 'Infrastruktur und IT-Sicherheit', s: 'Netzwerke, Storage, Verfügbarkeit, Kryptografie, Angriffe'},
    {id: 'eua', t: 'Entwicklung und Algorithmen', s: 'Programmierung, OOP, Datenstrukturen, Algorithmen, Muster, SQL'},
    {id: 'wiso', t: 'Wirtschafts- und Sozialkunde', s: 'Ausbildung, Arbeitsrecht, Mitbestimmung, Sozialversicherung, Wirtschaft'},
    {id: 'de', t: 'Deutsch', s: 'Textformen, Kommunikation, Präsentation, Sprachrichtigkeit'},
    {id: 'exam', t: 'Probeprüfungen', s: 'Realistische Prüfungen mit Zeitlimit, Selbstbewertung und Note'},
    {id: 'course', t: 'Programmierkurse', s: 'Python, Java, C#, SQL, HTML und CSS in 56 ausführlichen Kapiteln'},
    {id: 'ref', t: 'Nachschlagen', s: 'Glossar, Formeln, Prüfungsstrategie'},
  ];
  const pages = new Map();
  const page = (id, cfg) => { pages.set(id, Object.assign({id, blocks: []}, cfg)); };
  const add = (id, blocks) => {
    const target = pages.get(id);
    if (target) target.blocks.push(...blocks); else console.error('Seite fehlt: ' + id);
  };
  const addTop = (id, blocks) => {
    const target = pages.get(id);
    if (target) target.blocks.unshift(...blocks); else console.error('Seite fehlt: ' + id);
  };
  const get = (id) => pages.get(id);
  const byBlock = (blockId) => [...pages.values()].filter((p) => p.b === blockId);
  const all = () => [].concat(...BLOCKS.map((blk) => byBlock(blk.id)));
  const neighbors = (id) => {
    const list = all();
    const idx = list.findIndex((p) => p.id === id);
    return {prev: list[idx - 1], next: list[idx + 1]};
  };
  AP2.store = {BLOCKS, page, add, get, byBlock, all, neighbors};
  AP2.page = page;
  AP2.add = add;
  AP2.addTop = addTop;
})();
