// Prüfungsdaten: Notenschlüssel (IHK) und gespeicherte Antworten und Punkte je Probeprüfung.
(function () {
  const GRADES = [[92, 1, 'sehr gut'], [81, 2, 'gut'], [67, 3, 'befriedigend'], [50, 4, 'ausreichend'], [30, 5, 'mangelhaft'], [0, 6, 'ungenügend']];
  const grade = (pct) => GRADES.find((g) => pct >= g[0]);
  const store = (id) => {
    const read = () => AP2.state.get('exams')[id] || {a: {}, p: {}};
    const write = (rec) => AP2.state.set('exams', Object.assign({}, AP2.state.get('exams'), {[id]: rec}));
    const patch = (field, key, val) => { const rec = read(); write(Object.assign({}, rec, {[field]: Object.assign({}, rec[field], {[key]: val})})); };
    return {
      ans: (key) => read().a[key] || '',
      pts: (key) => read().p[key],
      setAns: (key, val) => patch('a', key, val),
      setPts: (key, val) => patch('p', key, val),
      reset: () => write({a: {}, p: {}}),
    };
  };
  // Aufbau einer Probeprüfung über mehrere Dateien: start, Teile anhängen, ende (fügt den Block ein).
  const defs = {};
  const start = (id, cfg) => { defs[id] = Object.assign({id, parts: []}, cfg); };
  const part = (id, p) => defs[id].parts.push(p);
  const end = (id) => AP2.add(id, [['exam', defs[id]]]);
  AP2.exam = {GRADES, grade, store, start, part, end};
})();
