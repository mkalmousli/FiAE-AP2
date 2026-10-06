// Aufgabe mit aufklappbarer Musterlösung (Frage/Antwort-Beispiele im Prüfungsstil).
(function () {
  const {h} = AP2;
  const S = AP2.S;
  const B = AP2.blocks;
  const answerNodes = (answer) => {
    const lines = [].concat(answer);
    const out = [];
    let bullets = [];
    const flush = () => { if (bullets.length) out.push(B.list(bullets)); bullets = []; };
    lines.forEach((txt) => {
      // Ein Array ist ein vollständiger Block, zum Beispiel ['code', 'python', '...'].
      if (Array.isArray(txt)) { flush(); out.push(AP2.renderBlocks([txt])); } else if (txt.startsWith('- ')) bullets.push(txt.slice(2));
      else { flush(); out.push(B.p(txt)); }
    });
    flush();
    return out;
  };
  AP2.answerNodes = answerNodes;
  const label = (txt, tone) => AP2.tint(h('div', {text: txt, style: {fontSize: S.f.xs, fontWeight: S.fw.bold,
    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: S.sp[2]}}), tone);
  B.qa = (question, answer, points) => {
    const pts = points ? h('span', {text: points + (points === 1 ? ' Punkt' : ' Punkte'), style: {fontSize: S.f.xs, padding: '2px 10px',
      borderRadius: S.r.pill, border: '1px solid'}}) : null;
    if (pts) AP2.theme.bind(pts, (n, c) => { n.style.color = c.text2; n.style.borderColor = c.border; });
    const top = h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: S.sp[3]}}, [label('Aufgabe', 'accent'), pts]);
    const q = AP2.tint(h('div', {style: {fontSize: S.f.md, fontWeight: S.fw.semi, lineHeight: S.lh.body, marginBottom: S.sp[4]}}, AP2.rich(question)), 'text');
    const solution = h('div', {style: {display: 'none', padding: '16px 20px 6px', borderRadius: S.r.md, marginTop: S.sp[4], borderLeft: '4px solid'}}, [label('Musterlösung', 'ok')].concat(answerNodes(answer)));
    AP2.theme.bind(solution, (n, c) => { n.style.backgroundColor = c.surface2; n.style.borderLeftColor = c.ok; });
    let open = false;
    const toggle = AP2.btn({text: 'Musterlösung anzeigen', kind: 'soft', small: true, fn: () => {
      open = !open;
      solution.style.display = open ? 'block' : 'none';
      toggle.firstChild.textContent = open ? 'Musterlösung ausblenden' : 'Musterlösung anzeigen';
    }});
    const card = h('div', {style: {padding: '18px 20px', borderRadius: S.r.md, border: '1px solid', margin: '0 0 ' + S.sp[4]}}, [top, q, toggle, solution]);
    return AP2.theme.bind(card, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
  };
})();
