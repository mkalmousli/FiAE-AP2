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
      id,
    };
  };
  // Aufbau einer Probeprüfung über mehrere Dateien: start, Teile anhängen, ende (fügt den Block ein).
  const defs = {};
  const start = (id, cfg) => { defs[id] = Object.assign({id, parts: []}, cfg); };
  const part = (id, p) => defs[id].parts.push(p);
  const end = (id) => AP2.add(id, [['exam', defs[id]]]);
  // Bearbeitungshinweise wie auf dem Deckblatt des IHK-Aufgabensatzes (sinngemäß nachgebildet).
  const COVER = {
    ps: [['list', ['Der Aufgabensatz enthält **4 Handlungsschritte zu je 25 Punkten**. **Alle** Handlungsschritte sind zu bearbeiten (keine Abwahl).', 'Bearbeitungszeit **90 Minuten**. Erlaubtes Hilfsmittel: netzunabhängiger, nicht programmierbarer Taschenrechner ohne Kommunikationsfunktion.',
      'Lesen Sie zuerst die **Ausgangssituation** und die **Anlagen**; viele Angaben werden in mehreren Aufgaben gebraucht.', 'Achten Sie auf die **Operatoren**: „nennen“ (Stichworte), „beschreiben“ (zusammenhängend), „erläutern“ (mit Begründung oder Beispiel), „berechnen“ (Rechenweg angeben), „entwerfen/erstellen“ (vollständiges Modell).',
      'Wird eine bestimmte Anzahl verlangt (z. B. "Nennen Sie drei ..."), werden nur die **ersten** Angaben in dieser Anzahl bewertet.']]],
    eua: [['list', ['Der Aufgabensatz enthält **4 Handlungsschritte zu je 25 Punkten**. **Alle** Handlungsschritte sind zu bearbeiten.', 'Bearbeitungszeit **90 Minuten**. Erlaubtes Hilfsmittel: nicht programmierbarer Taschenrechner.',
      'Programmieraufgaben dürfen in **Pseudocode** oder einer **Programmiersprache Ihrer Wahl** (z. B. Java, C#, Python) gelöst werden. Ein Struktogramm oder Aktivitätsdiagramm ist nur zulässig, wenn es ausdrücklich erlaubt ist. Bewertet wird die **Logik**, nicht die exakte Syntax.',
      'SQL-Aufgaben beziehen sich auf das Datenbankmodell in der **Anlage**. Verwenden Sie Standard-SQL.', 'Die Ergebnistabellen in der Musterlösung beziehen sich auf die Beispieldaten der Anlage.']]],
    wiso: [['list', ['Bearbeitungszeit **60 Minuten**, **100 Punkte**. Die Aufgaben sind **gebunden**: Sie kreuzen die richtige(n) Antwort(en) an, tragen Kennziffern ein oder geben ein Rechenergebnis ein.', 'Bei Zuordnungs- und Reihenfolgeaufgaben gibt es Punkte **anteilig** je richtiger Zuordnung, sonst nur für die vollständig richtige Lösung.',
      'Rechenergebnisse ohne Einheit und Tausenderpunkt eingeben (Komma oder Punkt als Dezimaltrennzeichen). Runden Sie wie in der Aufgabe angegeben.', 'Mit **"Prüfung abgeben"** am Ende werden alle Aufgaben auf einmal ausgewertet, wie beim Einlesen des Markierungsbogens.',
      'Rechtsstand und Werte: **2026**. Gesetzliche Werte, die sich jährlich ändern (Beitragssätze, Grenzen), stehen in der Aufgabe.']]],
  };
  AP2.exam = {GRADES, grade, store, start, part, end, COVER};
})();
