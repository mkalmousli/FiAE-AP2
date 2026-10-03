// Content store: register and retrieve pages
(function() {
  const pages = {};
  const allItems = [];
  const register = (id, data) => {
    pages[id] = data;
    allItems.push({id, ...data});
  };
  const get = (id) => pages[id];
  const search = (query) => {
    const q = query.toLowerCase();
    return allItems.filter(p =>
      (p.titel && p.titel.toLowerCase().includes(q)) ||
      (p.definition && p.definition.toLowerCase().includes(q)) ||
      (p.id && p.id.toLowerCase().includes(q))
    );
  };
  const all = () => allItems;
  window.AP2.store = {register, get, search, all, pages};
})();
