// Inhaltsspeicher: Seiten registrieren, in Teilen erweitern, durchsuchen.
(function () {
  const BLOCKS = [
    {id: 'ps', t: 'Planen eines Softwareproduktes', s: 'Projektmanagement, Anforderungen, UML, Datenmodellierung, Qualität, Recht'},
    {id: 'infra', t: 'Infrastruktur und IT-Sicherheit', s: 'Netzwerke, Storage, Verfügbarkeit, Kryptografie, Angriffe'},
    {id: 'eua', t: 'Entwicklung und Algorithmen', s: 'Programmierung, OOP, Datenstrukturen, Algorithmen, Muster, SQL'},
    {id: 'wiso', t: 'Wirtschafts- und Sozialkunde', s: 'Ausbildung, Arbeitsrecht, Mitbestimmung, Sozialversicherung, Wirtschaft'},
    {id: 'de', t: 'Deutsch', s: 'Textformen, Kommunikation, Präsentation, Sprachrichtigkeit'},
    {id: 'exam', t: 'Probeprüfungen', s: 'Realistische Prüfungen mit Zeitlimit, Selbstbewertung und Note'},
    {id: 'course', t: 'Crashkurse', s: 'SQL, Python, HTML, CSS, C# und Java im Schnelldurchlauf'},
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
  const texts = (node, out) => {
    if (typeof node === 'string') out.push(node);
    else if (Array.isArray(node)) node.forEach((item) => texts(item, out));
    else if (node && typeof node === 'object') Object.keys(node).forEach((key) => texts(node[key], out));
    return out;
  };
  const haystack = (p) => {
    if (!p.hay) p.hay = texts([p.d, p.m, p.cheat, p.blocks], []).join(' ').toLowerCase();
    return p.hay;
  };
  const score = (p, words) => words.reduce((sum, word) => {
    if (p.t.toLowerCase().includes(word)) return sum + 6;
    if ((p.g || '').toLowerCase().includes(word)) return sum + 3;
    return haystack(p).includes(word) ? sum + 1 : sum;
  }, 0);
  const search = (query) => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return all().map((p) => [score(p, words), p]).filter((pair) => pair[0] > 0)
      .sort((x, y) => y[0] - x[0]).map((pair) => pair[1]);
  };
  AP2.store = {BLOCKS, page, add, get, byBlock, all, neighbors, search};
  AP2.page = page;
  AP2.add = add;
  AP2.addTop = addTop;
})();
