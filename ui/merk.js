// Merkliste (Lesezeichen und Notizen) und "Mein Plan": automatisch erkannte Schwachstellen mit Handlungsempfehlung.
// State: marks {Seiten-ID: Zeitstempel}, notes {Seiten-ID: {t: Text, at: Zeitstempel}}. Routen: #/merkliste, #/plan.
(function () {
  const {h, on} = AP2;
  const S = AP2.S;
  const gk = () => AP2.gk;
  const marks = () => AP2.state.get('marks') || {};
  const notes = () => AP2.state.get('notes') || {};
  const isMarked = (id) => !!marks()[id];
  const toggleMark = (id) => { const all = Object.assign({}, marks()); if (all[id]) delete all[id]; else all[id] = Date.now(); AP2.state.set('marks', all); };
  const setNote = (id, text) => {
    const all = Object.assign({}, notes());
    if (text.trim()) all[id] = {t: text, at: Date.now()}; else delete all[id];
    AP2.state.set('notes', all);
  };
  const crumb = (p) => { const b = AP2.store.BLOCKS.find((x) => x.id === p.b); return (b ? b.t : '') + (p.g ? ' / ' + p.g : ''); };
  const heading = (t, sub) => h('div', {style: {margin: S.sp[5] + ' 0 ' + S.sp[3]}}, [
    AP2.tint(h('h2', {text: t, style: {fontSize: S.f.xl, fontWeight: S.fw.bold, margin: 0}}), 'text'),
    sub ? AP2.tint(h('div', {text: sub, style: {fontSize: S.f.sm, marginTop: '2px'}}), 'text3') : null]);

  // Lesezeichen-Knopf für den Seitenkopf.
  AP2.bookmarkButton = (id) => {
    const label = h('span');
    const icon = h('span', {style: {display: 'inline-flex'}});
    const el = h('div', {style: {display: 'inline-flex', alignItems: 'center', gap: S.sp[2], padding: '8px 14px', borderRadius: S.r.md, border: '1px solid', fontSize: S.f.sm, fontWeight: S.fw.med}}, [icon, label]);
    AP2.press(el, {role: 'switch', fn: () => toggleMark(id), hover: (c) => ({borderColor: c.accent}),
      base: (c) => {
        const on = isMarked(id);
        label.textContent = on ? 'Gemerkt' : 'Merken';
        icon.textContent = '';
        icon.appendChild(AP2.icon('bookmark', 16));
        el.setAttribute('aria-checked', String(on));
        return on ? {backgroundColor: c.goldSoft || c.accentSoft, color: c.gold || c.accent, borderColor: c.gold || c.accent} : {backgroundColor: c.surface, color: c.text2, borderColor: c.border};
      }});
    const off = AP2.state.sub('marks', () => { if (el.isConnected) el.repaint(); else off(); });
    return el;
  };

  // Notizfeld unter der Seite, speichert automatisch beim Tippen.
  AP2.noteBox = (id) => {
    const area = AP2.field(h('textarea', {attrs: {rows: 3, placeholder: 'Eigene Notiz zu diesem Thema (wird automatisch gespeichert) ...', 'aria-label': 'Notiz'},
      style: {width: '100%', display: 'block', resize: 'vertical', boxSizing: 'border-box', minHeight: '70px'}}));
    area.value = (notes()[id] || {}).t || '';
    const status = AP2.tint(h('span', {style: {fontSize: S.f.xs}}), 'text3');
    let timer = null;
    const save = () => { setNote(id, area.value); status.textContent = area.value.trim() ? 'Gespeichert' : ''; };
    on(area, 'input', () => { status.textContent = 'Speichert ...'; clearTimeout(timer); timer = setTimeout(save, 400); });
    on(area, 'blur', () => { clearTimeout(timer); if (area.value !== ((notes()[id] || {}).t || '')) save(); });
    return gk().panel([h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: S.sp[2]}}, [gk().kicker('Meine Notiz', 'accent'), status]), area]);
  };

  // ---------- Schwachstellen ----------
  // Je Seite mit geübten Fragen: Beherrschung, schwache und fällige Fragen. Sortiert nach Dringlichkeit.
  const weakPages = () => {
    const out = [];
    AP2.store.all().forEach((p) => {
      const items = AP2.bank.byPage(p.id);
      if (!items.length) return;
      const m = AP2.game.mastery(p.id);
      const weak = AP2.game.weak(items).length;
      const due = AP2.game.due(items).length;
      if (!m.seen) return;
      const score = (1 - m.pct) * 10 + weak * 2 + due * 0.5;
      if (m.stars <= 2 || weak > 0) out.push({p, m, weak, due, score});
    });
    return out.sort((a, b) => b.score - a.score);
  };
  const untouched = () => AP2.store.all().filter((p) => AP2.bank.CORE.includes(p.b) && AP2.bank.byPage(p.id).length && !AP2.game.mastery(p.id).seen);
  const reason = (w) => [w.weak ? w.weak + (w.weak === 1 ? ' Frage oft falsch' : ' Fragen oft falsch') : null, w.m.stars + (w.m.stars === 1 ? ' Stern' : ' Sterne'),
    w.due ? w.due + ' fällig' : null].filter(Boolean).join('  ·  ');
  const questFor = (p) => { const list = (AP2.questData ? AP2.questData() : {})[p.b]; return list && list.some((st) => st.id === p.id); };
  const actions = (p, hasQs) => h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2]}}, [
    AP2.btn({text: 'Lesen', icon: AP2.icon('book', 14), small: true, fn: () => AP2.router.go(p.id)}),
    hasQs ? AP2.btn({text: 'Trainieren', icon: AP2.icon('play', 14), small: true, kind: 'primary', fn: () => AP2.router.go('trainer/seite/' + p.id)}) : null,
    questFor(p) ? AP2.btn({text: 'Quest', icon: AP2.icon('sword', 14), small: true, fn: () => AP2.router.go('quest/' + p.b + '/' + p.id)}) : null]);
  const card = (p, lines, hasQs, m) => gk().panel([h('div', {style: {display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: S.sp[3], justifyContent: 'space-between'}}, [
    h('div', {style: {minWidth: 0, flex: '1 1 260px'}}, [AP2.tint(h('div', {text: p.t, style: {fontWeight: S.fw.semi, fontSize: S.f.md}}), 'text'),
      AP2.tint(h('div', {text: crumb(p), style: {fontSize: S.f.xs}}), 'text3')].concat(lines.map((t) => AP2.tint(h('div', {text: t, style: {fontSize: S.f.sm, marginTop: '2px'}}), 'text2')))),
    m ? gk().stars(m.stars, 14) : null, actions(p, hasQs)])], {marginBottom: S.sp[2], padding: '12px 16px'});

  // Kurzfassung für die Startseite: die drei dringendsten Themen.
  AP2.planSummary = () => {
    const w = weakPages().slice(0, 3);
    if (!w.length) return null;
    const box = h('div');
    w.forEach((x) => box.appendChild(card(x.p, [reason(x)], true, x.m)));
    box.appendChild(AP2.btn({text: 'Ganzen Plan ansehen', icon: AP2.icon('target', 16), small: true, kind: 'ghost', fn: () => AP2.router.go('plan')}));
    return box;
  };
  AP2.weakInfo = (id) => { const x = weakPages().find((w) => w.p.id === id); return x ? reason(x) : null; };

  AP2.views.plan = () => {
    AP2.ctx.id = 'plan';
    const weak = weakPages();
    const due = AP2.game.due(AP2.bank.core()).length;
    const root = h('div', {}, [gk().kicker('Mein Plan', 'accent'),
      AP2.tint(h('h1', {text: 'Hier solltest du ansetzen', style: {fontSize: S.f.h1, fontWeight: S.fw.bold, letterSpacing: '-0.02em', margin: '0 0 ' + S.sp[2]}}), 'text'),
      AP2.tint(h('p', {text: 'Automatisch aus deinen Antworten berechnet: Themen mit vielen Fehlern oder wenig Sternen stehen oben.', style: {fontSize: S.f.md, margin: '0 0 ' + S.sp[4]}}), 'text2')]);
    const steps = [];
    if (due) steps.push(AP2.btn({text: due + ' fällige Wiederholungen', icon: AP2.icon('clock', 16), kind: 'primary', fn: () => AP2.router.go('trainer/mix')}));
    if (weak.length) steps.push(AP2.btn({text: 'Fehler trainieren', icon: AP2.icon('play', 16), fn: () => AP2.router.go('trainer/fehler')}));
    if (steps.length) root.appendChild(h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2], marginBottom: S.sp[3]}}, steps));
    if (!weak.length) root.appendChild(AP2.blocks.note('Noch keine Schwachstellen erkannt. Beantworte Fragen im Trainer oder in einer Quest, dann erscheinen hier die Themen, die mehr Aufmerksamkeit brauchen.'));
    else {
      root.appendChild(heading('Schwache Themen (' + weak.length + ')', 'Lies zuerst die Seite, übe danach gezielt.'));
      weak.forEach((x) => root.appendChild(card(x.p, [reason(x)], true, x.m)));
    }
    const fresh = untouched().slice(0, 8);
    if (fresh.length) {
      root.appendChild(heading('Noch nicht geübt', 'Themen in den Prüfungsbereichen ohne eine einzige beantwortete Frage.'));
      fresh.forEach((p) => root.appendChild(card(p, ['Noch keine Frage beantwortet'], true, null)));
    }
    return root;
  };
  AP2.viewTitles.plan = 'Mein Plan';

  // ---------- Merkliste ----------
  AP2.views.merkliste = () => {
    AP2.ctx.id = 'merkliste';
    const mk = marks();
    const nt = notes();
    const root = h('div', {}, [gk().kicker('Merkliste', 'accent'),
      AP2.tint(h('h1', {text: 'Lesezeichen und Notizen', style: {fontSize: S.f.h1, fontWeight: S.fw.bold, letterSpacing: '-0.02em', margin: '0 0 ' + S.sp[4]}}), 'text')]);
    const bm = Object.keys(mk).sort((a, b) => mk[b] - mk[a]).map((id) => AP2.store.get(id)).filter(Boolean);
    root.appendChild(heading('Lesezeichen (' + bm.length + ')'));
    if (!bm.length) root.appendChild(AP2.blocks.note('Noch nichts gemerkt. Auf jeder Themenseite gibt es oben den Knopf „Merken“.'));
    bm.forEach((p) => root.appendChild(card(p, [], AP2.bank.byPage(p.id).length > 0, AP2.bank.byPage(p.id).length ? AP2.game.mastery(p.id) : null)));
    const nn = Object.keys(nt).sort((a, b) => nt[b].at - nt[a].at).map((id) => AP2.store.get(id)).filter(Boolean);
    root.appendChild(heading('Notizen (' + nn.length + ')'));
    if (!nn.length) root.appendChild(AP2.blocks.note('Noch keine Notizen. Unter jeder Themenseite kannst du eine eigene Notiz schreiben.'));
    nn.forEach((p) => {
      const full = card(p, [], false, null);
      full.appendChild(AP2.tint(h('div', {text: nt[p.id].t, style: {fontSize: S.f.sm, marginTop: S.sp[2], whiteSpace: 'pre-wrap', overflowWrap: 'anywhere'}}), 'text'));
      root.appendChild(full);
    });
    return root;
  };
  AP2.viewTitles.merkliste = 'Merkliste';
})();
