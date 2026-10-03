// Eine Prüfungsaufgabe: Aufgabentext, Antwortfeld, Musterlösung und Selbstbewertung.
(function () {
  const {h, on} = AP2;
  const S = AP2.S;
  const tag = (txt, tone) => AP2.tint(h('div', {text: txt, style: {fontSize: S.f.xs, fontWeight: S.fw.bold, textTransform: 'uppercase', letterSpacing: '0.08em'}}), tone);
  const pill = (pts) => {
    const el = h('span', {text: pts + (pts === 1 ? ' Punkt' : ' Punkte'), style: {fontSize: S.f.xs, padding: '2px 10px', borderRadius: S.r.pill, border: '1px solid'}});
    return AP2.theme.bind(el, (n, c) => { n.style.color = c.text2; n.style.borderColor = c.border; });
  };
  const gradeRow = (task, store, key, onPts) => {
    const opts = Array.from({length: task.pts + 1}, (_, n) => h('option', {text: String(n), attrs: {value: String(n)}}));
    const select = AP2.field(h('select', {attrs: {'aria-label': 'Erreichte Punkte'}}, opts));
    select.value = String(store.pts(key) || 0);
    on(select, 'change', () => { store.setPts(key, Number(select.value)); onPts(); });
    const text = AP2.tint(h('span', {text: 'Eigene Bewertung: erreichte Punkte von ' + task.pts, style: {fontSize: S.f.sm, fontWeight: S.fw.med}}), 'text');
    return h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], flexWrap: 'wrap', margin: '0 0 ' + S.sp[4]}}, [text, select]);
  };
  const solution = (task, store, key, onPts) => {
    const body = h('div', {style: {display: 'none', padding: '16px 20px 6px', borderRadius: S.r.md, marginTop: S.sp[4], borderLeft: '4px solid'}},
      [tag('Musterlösung', 'ok'), AP2.answerNodes(task.a), task.sol ? AP2.renderBlocks(task.sol) : null, gradeRow(task, store, key, onPts)]);
    return AP2.theme.bind(body, (n, c) => { n.style.backgroundColor = c.surface2; n.style.borderLeftColor = c.ok; });
  };
  AP2.examTask = (task, num, store, key, onPts) => {
    const head = h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: S.sp[3], marginBottom: S.sp[3]}}, [tag('Aufgabe ' + num, 'accent'), pill(task.pts)]);
    const ctx = task.ctx ? h('div', {}, [AP2.renderBlocks(task.ctx)]) : null;
    const q = AP2.tint(h('div', {style: {fontSize: S.f.md, fontWeight: S.fw.semi, lineHeight: S.lh.body, margin: '0 0 ' + S.sp[3]}}, [AP2.rich(task.q)]), 'text');
    const area = AP2.field(h('textarea', {attrs: {rows: task.rows || 5, 'aria-label': 'Antwort zu Aufgabe ' + num, placeholder: 'Deine Antwort ...'},
      style: {width: '100%', display: 'block', resize: 'vertical', lineHeight: S.lh.body}}));
    area.value = store.ans(key);
    on(area, 'input', () => store.setAns(key, area.value));
    const sol = solution(task, store, key, onPts);
    const toggle = AP2.btn({text: 'Musterlösung anzeigen', small: true, fn: () => {
      const open = sol.style.display === 'none';
      sol.style.display = open ? 'block' : 'none';
      toggle.firstChild.textContent = open ? 'Musterlösung ausblenden' : 'Musterlösung anzeigen';
    }});
    const card = h('div', {style: {padding: '18px 20px', borderRadius: S.r.md, border: '1px solid', margin: '0 0 ' + S.sp[4]}}, [head, ctx, q, area, h('div', {style: {marginTop: S.sp[3]}}, [toggle]), sol]);
    return AP2.theme.bind(card, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
  };
})();
