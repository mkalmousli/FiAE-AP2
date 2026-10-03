// Selbsttest: eine Frage nach der anderen, Antworten gemischt, sofortiges farbiges Feedback.
(function () {
  const {h, rich} = AP2;
  const S = AP2.S;
  const shuffle = (list) => {
    const out = list.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };
  const prepare = (questions) => shuffle(questions).map((q) => {
    const order = shuffle(q.o.map((txt, idx) => idx));
    return {q: q.q, e: q.e, o: order.map((idx) => q.o[idx]), a: order.indexOf(q.a), picked: null};
  });
  AP2.blocks.quiz = (questions) => {
    const pageId = AP2.ctx.id;
    const area = h('div');
    const count = AP2.tint(h('span', {style: {fontSize: S.f.sm}}), 'text2');
    const fill = AP2.fill(h('div', {style: {height: '100%', borderRadius: S.r.pill, transition: 'width 250ms ease'}}), 'accent');
    const track = AP2.fill(h('div', {style: {height: '6px', borderRadius: S.r.pill, margin: S.sp[3] + ' 0 ' + S.sp[4], overflow: 'hidden'}}, [fill]), 'surface2');
    const title = AP2.tint(h('span', {text: 'Selbsttest', style: {fontWeight: S.fw.bold, fontSize: S.f.xs, letterSpacing: '0.08em', textTransform: 'uppercase'}}), 'accent');
    const head = h('div', {style: {display: 'flex', justifyContent: 'space-between'}}, [title, count]);
    const card = h('div', {style: {padding: '20px', borderRadius: S.r.lg, border: '1px solid', margin: '0 0 ' + S.sp[5], boxShadow: S.shadow}}, [head, track, area]);
    AP2.theme.bind(card, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
    let run = prepare(questions);
    let idx = 0;
    let correct = 0;
    const progress = (done) => { fill.style.width = Math.round((done / run.length) * 100) + '%'; };
    const restart = () => { run = prepare(questions); idx = 0; correct = 0; show(); };
    const finish = () => {
      AP2.dispose(area);
      count.textContent = 'Ergebnis';
      progress(run.length);
      AP2.state.saveScore(pageId, Math.round((correct / run.length) * 100));
      area.appendChild(AP2.quizResult(run, correct, restart));
    };
    const feedback = (q, box, next) => {
      const ok = q.picked === q.a;
      const head = AP2.tint(h('div', {text: ok ? 'Richtig' : 'Nicht ganz', style: {fontWeight: S.fw.bold, marginBottom: S.sp[1]}}), ok ? 'ok' : 'bad');
      const why = AP2.tint(h('div', {style: {fontSize: S.f.sm, lineHeight: S.lh.body}}, rich(q.e || '')), 'text');
      box.appendChild(AP2.fill(h('div', {style: {padding: '12px 16px', borderRadius: S.r.md, margin: S.sp[2] + ' 0 ' + S.sp[4]}}, [head, why]), 'surface2'));
      box.appendChild(AP2.btn({text: idx === run.length - 1 ? 'Ergebnis ansehen' : 'Weiter', kind: 'primary', fn: next}));
    };
    function show() {
      AP2.dispose(area);
      const q = run[idx];
      count.textContent = 'Frage ' + (idx + 1) + ' von ' + run.length;
      progress(idx);
      area.appendChild(AP2.tint(h('div', {style: {fontSize: S.f.lg, fontWeight: S.fw.semi, lineHeight: '1.45', margin: '0 0 ' + S.sp[4]}}, rich(q.q)), 'text'));
      const rows = [];
      const fb = h('div');
      const onPick = (pick) => {
        q.picked = pick;
        if (pick === q.a) correct++;
        rows.forEach((row) => row.repaint());
        feedback(q, fb, () => { idx++; if (idx >= run.length) finish(); else show(); });
      };
      q.o.forEach((txt, i) => { const row = AP2.quizOption(q, i, onPick); rows.push(row); area.appendChild(row); });
      area.appendChild(fb);
    }
    show();
    return card;
  };
})();
