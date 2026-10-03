// Block-Renderer: wandelt [typ, ...argumente]-Listen in DOM um.
(function () {
  const {h} = AP2;
  const S = AP2.S;
  AP2.ctx = {id: ''};
  AP2.renderBlocks = (blocks) => {
    const frag = document.createDocumentFragment();
    blocks.forEach((block) => {
      const fn = AP2.blocks[block[0]];
      if (fn) frag.appendChild(fn.apply(null, block.slice(1)));
      else frag.appendChild(h('div', {text: 'Unbekannter Block: ' + block[0]}));
    });
    return frag;
  };
  // Mehrere Blöcke nebeneinander (umbrechend), zum Beispiel kleine Diagramme.
  AP2.blocks.row = (blocks) => h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[4]}},
    blocks.map((block) => h('div', {style: {flex: '1 1 300px'}}, [AP2.renderBlocks([block])])));
  AP2.blocks.tool = (id) => {
    const build = AP2.tools[id];
    const label = AP2.tint(h('div', {text: 'Interaktiv', style: {fontSize: S.f.xs, fontWeight: S.fw.bold, letterSpacing: '0.08em',
      textTransform: 'uppercase', marginBottom: S.sp[3]}}), 'accent');
    const box = h('div', {style: {padding: '20px', borderRadius: S.r.lg, border: '1px solid', margin: '0 0 ' + S.sp[5], boxShadow: S.shadow}}, [label, build ? build() : 'Werkzeug fehlt: ' + id]);
    return AP2.theme.bind(box, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
  };
})();
