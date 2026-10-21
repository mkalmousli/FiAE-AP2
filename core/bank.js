// Fragenpool: alle Quizfragen (Auswahl) und Aufgaben (Karteikarte, selbst bewertet) mit stabiler ID je Seite.
(function () {
  // Blöcke, deren Fragen in den Trainer gehören; Deutsch und Programmierkurse sind keine IHK-Prüfungsfächer.
  const CORE = ['ps', 'infra', 'eua', 'wiso', 'ref'];
  // FNV-1a über den Fragetext: bleibt gleich, solange sich die Frage nicht ändert.
  const hash = (str) => {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(36);
  };
  const qid = (pageId, text) => pageId + ':' + hash(String(text));
  let cache = null;
  const collect = (page, out) => {
    const walk = (blocks) => blocks.forEach((block) => {
      if (!Array.isArray(block)) return;
      if (block[0] === 'quiz') block[1].forEach((q) => out.push({id: qid(page.id, q.q), kind: 'mc', page, q: q.q, o: q.o, a: q.a, e: q.e}));
      else if (block[0] === 'qa') out.push({id: qid(page.id, block[1]), kind: 'card', page, q: block[1], ans: block[2], pts: block[3]});
      else if (block[0] === 'row') walk(block[1]);
    });
    walk(page.blocks);
  };
  const build = () => {
    const list = [];
    const byId = new Map();
    const byPage = new Map();
    AP2.store.all().forEach((page) => {
      if (page.b === 'exam') return;
      const own = [];
      collect(page, own);
      own.forEach((item) => { if (!byId.has(item.id)) { byId.set(item.id, item); list.push(item); } });
      byPage.set(page.id, own.filter((item) => byId.get(item.id) === item));
    });
    return {list, byId, byPage};
  };
  const data = () => cache || (cache = build());
  AP2.bank = {
    CORE,
    qid,
    all: () => data().list,
    core: () => data().list.filter((item) => CORE.includes(item.page.b)),
    get: (id) => data().byId.get(id),
    byPage: (id) => data().byPage.get(id) || [],
  };
})();
