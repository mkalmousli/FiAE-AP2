// Werkzeug: Netzplan berechnen (FAZ, FEZ, SAZ, SEZ, Gesamt- und freier Puffer, kritischer Pfad).
(function () {
  const {h} = AP2;
  const {tk} = AP2;
  const START = [['A', 3, ''], ['B', 4, 'A'], ['C', 2, 'A'], ['D', 5, 'B'], ['E', 3, 'C'], ['F', 2, 'D,E'], ['', '', ''], ['', '', '']];
  const parse = (rows) => rows.filter((r) => r.name.get().trim() && Number(r.dur.get()) >= 0).map((r) => ({
    id: r.name.get().trim().toUpperCase(), dur: Number(r.dur.get()),
    pre: r.pre.get().split(/[,; ]+/).map((x) => x.trim().toUpperCase()).filter(Boolean)}));
  const solve = (tasks) => {
    const byId = {};
    tasks.forEach((t) => { byId[t.id] = t; });
    if (tasks.some((t) => t.pre.some((p) => !byId[p] || p === t.id))) return null;
    const visit = (t, path) => {
      if (t.faz !== undefined) return true;
      if (path.includes(t.id)) return false;
      if (!t.pre.every((p) => visit(byId[p], path.concat(t.id)))) return false;
      t.faz = Math.max(0, ...t.pre.map((p) => byId[p].fez));
      t.fez = t.faz + t.dur;
      return true;
    };
    if (!tasks.every((t) => visit(t, []))) return null;
    const end = Math.max(...tasks.map((t) => t.fez));
    tasks.slice().sort((a, b) => b.fez - a.fez).forEach((t) => { t.sez = Math.min(end, ...tasks.filter((x) => x.pre.includes(t.id)).map((x) => x.saz)); t.saz = t.sez - t.dur; });
    tasks.forEach((t) => {
      t.gp = t.saz - t.faz;
      const next = tasks.filter((x) => x.pre.includes(t.id)).map((x) => x.faz);
      t.fp = (next.length ? Math.min(...next) : end) - t.fez;
    });
    return {end, tasks};
  };
  AP2.tools.netzplan = () => {
    const out = tk.result();
    const rows = START.map((s) => ({name: tk.input('Vorgang', s[0], () => update()), dur: tk.input('Dauer', s[1], () => update(), 'number'), pre: tk.input('Vorgänger', s[2], () => update())}));
    const update = () => {
      const res = solve(parse(rows));
      if (!res) return out.show([['Fehler', 'Unbekannter Vorgänger, Zyklus oder keine Vorgänge.']]);
      out.show([['Projektdauer', res.end + ' Zeiteinheiten']].concat(res.tasks.map((t) => [t.id + (t.gp === 0 ? ' (kritisch)' : ''),
        'FAZ ' + t.faz + '  FEZ ' + t.fez + '  SAZ ' + t.saz + '  SEZ ' + t.sez + '  GP ' + t.gp + '  FP ' + t.fp, true])));
    };
    update();
    const grid = rows.map((r) => tk.row([r.name.el, r.dur.el, r.pre.el]));
    return tk.col([tk.note('Vorgänger mit Komma trennen (zum Beispiel D,E). Leere Zeilen werden ignoriert. Vorwärts: FAZ und FEZ, rückwärts: SEZ und SAZ. GP = 0 bedeutet kritischer Pfad.'), h('div', {style: {display: 'flex', flexDirection: 'column', gap: '8px'}}, grid), out]);
  };
})();
