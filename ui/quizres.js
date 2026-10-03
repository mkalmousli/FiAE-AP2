// Ergebnisansicht des Quiz mit Auswertung und Fehlerübersicht.
(function () {
  const {h, rich} = AP2;
  const S = AP2.S;
  const verdict = (pct) => {
    if (pct >= 90) return 'Sehr gut. Du beherrschst das Thema.';
    if (pct >= 70) return 'Gut. Wiederhole noch die markierten Punkte.';
    if (pct >= 50) return 'Ausbaufähig. Lies den Abschnitt noch einmal und probiere es erneut.';
    return 'Noch unsicher. Gehe die Erklärung Schritt für Schritt durch.';
  };
  const missedRow = (q) => {
    const head = AP2.tint(h('div', {style: {fontWeight: S.fw.semi, fontSize: S.f.sm, marginBottom: S.sp[1]}}, rich(q.q)), 'text');
    const right = AP2.tint(h('div', {style: {fontSize: S.f.sm, marginBottom: S.sp[1]}}, rich('Richtig: **' + q.o[q.a] + '**')), 'ok');
    const why = AP2.tint(h('div', {style: {fontSize: S.f.sm, lineHeight: '1.55'}}, rich(q.e || '')), 'text2');
    const box = h('div', {style: {padding: '12px 16px', borderRadius: S.r.md, marginBottom: S.sp[2]}}, [head, right, why]);
    return AP2.fill(box, 'surface2');
  };
  AP2.quizResult = (run, correct, retry) => {
    const pct = Math.round((correct / run.length) * 100);
    const big = AP2.tint(h('div', {text: pct + ' %', style: {fontSize: S.f.h1, fontWeight: S.fw.bold, lineHeight: S.lh.tight}}), pct >= 70 ? 'ok' : 'accent');
    const sub = AP2.tint(h('div', {text: correct + ' von ' + run.length + ' richtig. ' + verdict(pct), style: {fontSize: S.f.md, margin: S.sp[2] + ' 0 ' + S.sp[4]}}), 'text');
    const box = h('div', {}, [big, sub]);
    const missed = run.filter((q) => q.picked !== q.a);
    if (missed.length) {
      box.appendChild(AP2.tint(h('div', {text: 'Zum Wiederholen', style: {fontWeight: S.fw.semi, margin: S.sp[3] + ' 0 ' + S.sp[2]}}), 'text'));
      missed.forEach((q) => box.appendChild(missedRow(q)));
    }
    box.appendChild(h('div', {style: {marginTop: S.sp[4]}}, [AP2.btn({text: 'Quiz wiederholen', kind: 'primary', fn: retry})]));
    return box;
  };
})();
