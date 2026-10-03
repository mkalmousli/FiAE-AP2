// Werkzeug: animierter Sortier-Visualisierer mit Vergleichszähler.
(function () {
  const {h, st} = AP2;
  const {tk} = AP2;
  const COUNT = 24;
  const TICK = 60;
  const BAR_AREA = 160;
  const shuffle = () => Array.from({length: COUNT}, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  const frames = (key, data) => {
    const list = [];
    AP2.sortAlgos[key][1](data.slice(), (arr, hi) => list.push({arr: arr.slice(), hi}));
    return list;
  };
  AP2.tools.sort = () => {
    let data = shuffle();
    let list = [];
    let pos = 0;
    let timer = null;
    const stage = h('div', {style: {display: 'flex', alignItems: 'flex-end', gap: '3px', height: BAR_AREA + 'px'}});
    const info = tk.note('');
    const algo = tk.select('Algorithmus', Object.keys(AP2.sortAlgos).map((k) => [k, AP2.sortAlgos[k][0]]), () => reset());
    const draw = (arr, hi) => {
      while (stage.firstChild) stage.removeChild(stage.firstChild);
      arr.forEach((v, i) => {
        const bar = h('div', {style: {flex: '1 1 0', height: (v / COUNT) * BAR_AREA + 'px', borderRadius: '3px 3px 0 0'}});
        AP2.theme.bind(bar, (n, c) => { n.style.backgroundColor = hi && hi.includes(i) ? c.accent : c.border; });
        stage.appendChild(bar);
      });
      info.textContent = 'Schritte: ' + pos + ' von ' + list.length;
    };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const step = () => {
      if (!stage.isConnected || pos >= list.length) return stop();
      draw(list[pos].arr, list[pos].hi);
      pos++;
    };
    const reset = () => { stop(); pos = 0; list = frames(algo.get(), data); draw(data, null); };
    const mix = () => { data = shuffle(); reset(); };
    const play = () => { if (!timer) { if (pos >= list.length) reset(); timer = setInterval(step, TICK); } };
    reset();
    const bar = tk.row([AP2.btn({text: 'Start', kind: 'primary', fn: play}), AP2.btn({text: 'Pause', fn: stop}), AP2.btn({text: 'Ein Schritt', fn: step}), AP2.btn({text: 'Mischen', fn: mix})]);
    st(bar, {alignItems: 'center'});
    return tk.col([tk.row([algo.el]), bar, stage, info, tk.note('Hervorgehoben (Akzentfarbe) sind die gerade verglichenen oder getauschten Elemente.')]);
  };
})();
