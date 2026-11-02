// Eine Prüfungsaufgabe: Aufgabentext, Antwortfeld, Musterlösung und Selbstbewertung.
// Gebundene Aufgaben (wie in WiSo) werden automatisch bewertet:
//   mc:    {o: [Optionen], c: [richtige Indizes]}       eine oder mehrere richtige Antworten (alles oder nichts)
//   match: {keys: [Begriffe], items: [[Aussage, Index]]} Zuordnung, Punkte anteilig
//   order: [[Schritt, Rang], ...]                         Reihenfolge (Rang ab 1), Punkte anteilig
//   num:   {c: Zahl, tol: Toleranz, unit: 'Euro'}         Rechenergebnis
(function () {
  const {h, on} = AP2;
  const S = AP2.S;
  const tag = (txt, tone) => AP2.tint(h('div', {text: txt, style: {fontSize: S.f.xs, fontWeight: S.fw.bold, textTransform: 'uppercase', letterSpacing: '0.08em'}}), tone);
  const pill = (pts) => {
    const el = h('span', {text: pts + (pts === 1 ? ' Punkt' : ' Punkte'), style: {fontSize: S.f.xs, padding: '2px 10px', borderRadius: S.r.pill, border: '1px solid'}});
    return AP2.theme.bind(el, (n, c) => { n.style.color = c.text2; n.style.borderColor = c.border; });
  };
  const LETTERS = 'abcdefghijklmnop';
  const bound = (task) => (task.mc ? 'mc' : task.match ? 'match' : task.order ? 'order' : task.num ? 'num' : null);
  AP2.examBound = bound;
  const gradeRow = (task, store, key, onPts) => {
    const opts = Array.from({length: task.pts + 1}, (_, n) => h('option', {text: String(n), attrs: {value: String(n)}}));
    const select = AP2.field(h('select', {attrs: {'aria-label': 'Erreichte Punkte'}}, opts));
    select.value = String(store.pts(key) || 0);
    on(select, 'change', () => { store.setPts(key, Number(select.value)); AP2.game.examPoints(store.id, key, Number(select.value)); onPts(); });
    const text = AP2.tint(h('span', {text: 'Eigene Bewertung: erreichte Punkte von ' + task.pts, style: {fontSize: S.f.sm, fontWeight: S.fw.med}}), 'text');
    return h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], flexWrap: 'wrap', margin: '0 0 ' + S.sp[4]}}, [text, select]);
  };
  const solution = (task, store, key, onPts, auto) => {
    const body = h('div', {style: {display: 'none', padding: '16px 20px 6px', borderRadius: S.r.md, marginTop: S.sp[4], borderLeft: '4px solid'}},
      [tag(auto ? 'Lösung und Erklärung' : 'Musterlösung', 'ok'), auto ? auto.result : null, task.a ? AP2.answerNodes(task.a) : null, task.sol ? AP2.renderBlocks(task.sol) : null,
        task.see ? AP2.blocks.see(task.see, 'Nachlernen') : null, auto ? null : gradeRow(task, store, key, onPts)]);
    return AP2.theme.bind(body, (n, c) => { n.style.backgroundColor = c.surface2; n.style.borderLeftColor = c.ok; });
  };
  const readJson = (store, key, fallback) => { try { return JSON.parse(store.ans(key)) || fallback; } catch (e) { return fallback; } };
  const numVal = (txt) => Number(String(txt).replace(/\s|€|%/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.'));
  // Eingabefelder und Auswertung je Art. Liefert {el, score(), mark()}.
  const inputs = {
    mc: (task, store, key) => {
      const multi = task.mc.c.length > 1;
      const paintRow = (n, c) => { const res = n.dataset.res; n.style.borderColor = res === 'ok' ? c.ok : res === 'bad' ? c.bad : c.border;
        n.style.backgroundColor = res === 'ok' ? c.okSoft : res === 'bad' ? c.badSoft : c.surface; };
      let picked = readJson(store, key, []);
      const rows = task.mc.o.map((txt, i) => {
        const box = h('input', {attrs: {type: multi ? 'checkbox' : 'radio', name: 'mc' + key, 'aria-label': 'Antwort ' + (i + 1)}});
        box.checked = picked.includes(i);
        on(box, 'change', () => {
          picked = multi ? (box.checked ? picked.concat(i) : picked.filter((x) => x !== i)) : [i];
          store.setAns(key, JSON.stringify(picked));
        });
        const nr = AP2.tint(h('span', {text: String(i + 1), style: {fontFamily: S.font.mono, fontWeight: S.fw.bold, minWidth: '18px'}}), 'text2');
        const row = h('label', {style: {display: 'flex', gap: S.sp[3], alignItems: 'flex-start', padding: '8px 12px', borderRadius: S.r.sm, border: '1px solid', cursor: 'pointer', marginBottom: '6px'}},
          [box, nr, AP2.tint(h('span', {style: {lineHeight: S.lh.body}}, AP2.rich(txt)), 'text')]);
        AP2.theme.bind(row, paintRow);
        return row;
      });
      const hint = AP2.tint(h('div', {text: multi ? 'Kreuzen Sie ' + task.mc.c.length + ' richtige Antworten an.' : 'Kreuzen Sie die richtige Antwort an.', style: {fontSize: S.f.sm, marginBottom: S.sp[2]}}), 'text2');
      return {
        el: h('div', {}, [hint].concat(rows)),
        score: () => (picked.length === task.mc.c.length && task.mc.c.every((x) => picked.includes(x)) ? task.pts : 0),
        mark: () => rows.forEach((row, i) => { row.dataset.res = task.mc.c.includes(i) ? 'ok' : picked.includes(i) ? 'bad' : ''; AP2.theme.bind(row, paintRow); }),
      };
    },
    match: (task, store, key) => {
      const keys = task.order ? task.order.map((_, i) => String(i + 1)) : task.match.keys;
      const items = task.order ? task.order : task.match.items;
      const solutionOf = (it) => (task.order ? it[1] - 1 : it[1]);
      let picked = readJson(store, key, {});
      const legend = task.order ? null : h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[2], margin: '0 0 ' + S.sp[3]}}, keys.map((k, i) => {
        const chip = h('span', {style: {padding: '4px 10px', borderRadius: S.r.sm, fontSize: S.f.sm, border: '1px solid'}}, [h('b', {text: (i + 1) + '  '}), AP2.rich(k)]);
        return AP2.theme.bind(chip, (n, c) => { n.style.borderColor = c.border; n.style.backgroundColor = c.surface2; n.style.color = c.text; });
      }));
      const rows = items.map((it, i) => {
        const sel = AP2.field(h('select', {attrs: {'aria-label': 'Zuordnung ' + LETTERS[i]}, style: {padding: '6px 8px', minWidth: '64px'}},
          [h('option', {text: '–', attrs: {value: ''}})].concat(keys.map((k, ki) => h('option', {text: String(ki + 1), attrs: {value: String(ki)}})))));
        sel.value = picked[i] === undefined ? '' : String(picked[i]);
        on(sel, 'change', () => { picked = Object.assign({}, picked, {[i]: sel.value === '' ? undefined : Number(sel.value)}); store.setAns(key, JSON.stringify(picked)); });
        const res = h('span', {style: {fontSize: S.f.sm, fontWeight: S.fw.semi, minWidth: '40px'}});
        const row = h('div', {style: {display: 'flex', gap: S.sp[3], alignItems: 'center', padding: '6px 0', borderBottom: '1px solid'}},
          [sel, AP2.tint(h('span', {style: {flex: '1 1 0', lineHeight: S.lh.body}}, [h('b', {text: LETTERS[i] + ')  '}), AP2.rich(it[0])]), 'text'), res]);
        AP2.theme.bind(row, (n, c) => { n.style.borderColor = c.border; });
        return {row, sel, res, want: solutionOf(it)};
      });
      const hint = AP2.tint(h('div', {text: task.order ? 'Tragen Sie die Reihenfolge ein (1 = zuerst).' : 'Tragen Sie die Kennziffer des passenden Begriffs ein. Begriffe können mehrfach oder gar nicht vorkommen.', style: {fontSize: S.f.sm, marginBottom: S.sp[2]}}), 'text2');
      const right = () => rows.filter((r, i) => picked[i] === r.want).length;
      return {
        el: h('div', {}, [hint, legend].concat(rows.map((r) => r.row))),
        score: () => Math.floor((task.pts * right()) / rows.length + 1e-9),
        mark: () => rows.forEach((r, i) => {
          const ok = picked[i] === r.want;
          r.res.textContent = ok ? 'richtig' : '→ ' + (r.want + 1);
          AP2.tint(r.res, ok ? 'ok' : 'bad');
        }),
      };
    },
    num: (task, store, key) => {
      const field = AP2.field(h('input', {attrs: {type: 'text', inputmode: 'decimal', 'aria-label': 'Ergebnis', placeholder: 'Ergebnis'}, style: {width: '180px', fontFamily: S.font.mono}}));
      field.value = store.ans(key);
      on(field, 'input', () => store.setAns(key, field.value));
      const res = h('span', {style: {fontSize: S.f.sm, fontWeight: S.fw.semi}});
      const unit = AP2.tint(h('span', {text: task.num.unit || '', style: {fontSize: S.f.md}}), 'text2');
      const ok = () => Math.abs(numVal(field.value) - task.num.c) <= (task.num.tol === undefined ? 0.005 : task.num.tol);
      const work = AP2.field(h('textarea', {attrs: {rows: 2, placeholder: 'Rechenweg (optional) ...', 'aria-label': 'Rechenweg'}, style: {width: '100%', display: 'block', marginTop: S.sp[2], resize: 'vertical'}}));
      work.value = store.ans(key + 'w');
      on(work, 'input', () => store.setAns(key + 'w', work.value));
      return {
        el: h('div', {}, [h('div', {style: {display: 'flex', alignItems: 'center', gap: S.sp[3], flexWrap: 'wrap'}}, [field, unit, res]), work]),
        score: () => (field.value.trim() && ok() ? task.pts : 0),
        mark: () => { res.textContent = ok() ? 'richtig' : 'richtig wäre: ' + String(task.num.c).replace('.', ',') + ' ' + (task.num.unit || ''); AP2.tint(res, ok() ? 'ok' : 'bad'); },
      };
    },
  };
  inputs.order = inputs.match;
  AP2.examTask = (task, num, store, key, onPts) => {
    const kind = bound(task);
    const head = h('div', {style: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: S.sp[3], marginBottom: S.sp[3]}},
      [h('div', {style: {display: 'flex', gap: S.sp[3], alignItems: 'center'}}, [tag('Aufgabe ' + num, 'accent'), task.topic ? tag(task.topic, 'text3') : null]), pill(task.pts)]);
    const ctx = task.ctx ? h('div', {}, [AP2.renderBlocks(task.ctx)]) : null;
    const q = AP2.tint(h('div', {style: {fontSize: S.f.md, fontWeight: S.fw.semi, lineHeight: S.lh.body, margin: '0 0 ' + S.sp[3]}}, [AP2.rich(task.q)]), 'text');
    let answer;
    let auto = null;
    if (kind) {
      answer = inputs[kind](task, store, key);
      const result = h('div', {style: {fontSize: S.f.md, fontWeight: S.fw.bold, margin: S.sp[2] + ' 0 ' + S.sp[3]}});
      auto = {result};
    } else {
      answer = {el: AP2.field(h('textarea', {attrs: {rows: task.rows || 5, 'aria-label': 'Antwort zu Aufgabe ' + num, placeholder: 'Deine Antwort ...'},
        style: {width: '100%', display: 'block', resize: 'vertical', lineHeight: S.lh.body}}))};
      answer.el.value = store.ans(key);
      on(answer.el, 'input', () => store.setAns(key, answer.el.value));
    }
    const sol = solution(task, store, key, onPts, auto);
    const check = () => {
      const got = answer.score();
      answer.mark();
      auto.result.textContent = 'Automatisch bewertet: ' + got + ' von ' + task.pts + (task.pts === 1 ? ' Punkt' : ' Punkten');
      AP2.tint(auto.result, got === task.pts ? 'ok' : got ? 'gold' : 'bad');
      store.setPts(key, got);
      AP2.game.examPoints(store.id, key, got);
      onPts();
    };
    const label = kind ? 'Auswerten' : 'Musterlösung anzeigen';
    const toggle = AP2.btn({text: label, small: true, kind: kind ? 'primary' : 'soft', fn: () => {
      if (kind) { check(); sol.style.display = 'block'; toggle.firstChild.textContent = 'Erneut auswerten'; return; }
      const open = sol.style.display === 'none';
      sol.style.display = open ? 'block' : 'none';
      toggle.firstChild.textContent = open ? 'Musterlösung ausblenden' : 'Musterlösung anzeigen';
    }});
    // Suchtreffer in der Lösung: bei gebundenen Aufgaben nur aufklappen, nicht bewerten.
    sol.ap2Reveal = () => { if (kind) sol.style.display = 'block'; else if (sol.style.display === 'none') toggle.click(); };
    const card = h('div', {style: {padding: '18px 20px', borderRadius: S.r.md, border: '1px solid', margin: '0 0 ' + S.sp[4]}}, [head, ctx, q, answer.el, h('div', {style: {marginTop: S.sp[3]}}, [toggle]), sol]);
    card.ap2Check = kind ? () => { check(); sol.style.display = 'block'; toggle.firstChild.textContent = 'Erneut auswerten'; } : null;
    return AP2.theme.bind(card, (n, c) => { n.style.backgroundColor = c.surface; n.style.borderColor = c.border; });
  };
})();
