// Rechner zu neuen Themen: DPMO, Bestehensregeln, Energiekosten, Übertragungszeit, RSA, Blockchain, Neuron, Prüfziffern.
(function () {
  const {h, tk, on} = AP2;
  const S = AP2.S;
  const num = (v) => Number(String(v).replace(',', '.'));
  const de = (v, d) => Number(v).toLocaleString('de-DE', {minimumFractionDigits: d || 0, maximumFractionDigits: d === undefined ? 2 : d});
  const holder = () => h('div');
  const table = (box, head, rows, mark) => { AP2.dispose(box); box.appendChild(AP2.blocks.table(head, rows, {mark: mark || []})); };

  // Inverse der Standardnormalverteilung (Näherung nach Acklam) für das Sigma-Niveau.
  const invNorm = (p) => {
    const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
    const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
    const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
    const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
    const lo = 0.02425;
    if (p < lo) { const q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    if (p > 1 - lo) { const q = Math.sqrt(-2 * Math.log(1 - p)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    const q = p - 0.5; const r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  };
  AP2.tools.dpmo = () => {
    const out = tk.result();
    const f = tk.input('Gefundene Fehler', 17, () => update(), 'number');
    const u = tk.input('Geprüfte Einheiten', 5000, () => update(), 'number');
    const o = tk.input('Fehlermöglichkeiten je Einheit', 4, () => update(), 'number');
    const update = () => {
      const F = num(f.get()); const U = num(u.get()); const O = num(o.get());
      if (!(U > 0 && O > 0 && F >= 0)) return out.show([['Hinweis', 'Einheiten und Möglichkeiten müssen größer als 0 sein']]);
      const dpmo = F / (U * O) * 1e6;
      const yieldPct = 100 - dpmo / 1e4;
      const sigma = dpmo <= 0 ? 'über 6' : de(invNorm(1 - dpmo / 1e6) + 1.5, 2);
      out.show([['DPMO', de(dpmo, 1) + '  (= ' + F + ' / (' + U + ' mal ' + O + ') mal 1.000.000)'], ['Fehlerfrei (Ausbeute)', de(yieldPct, 5) + ' %'], ['Sigma-Niveau', sigma + ' (Kurzzeit, mit 1,5-Sigma-Verschiebung)'], ['Six Sigma erreicht?', dpmo <= 3.4 ? 'Ja (höchstens 3,4 DPMO)' : 'Nein (Ziel: höchstens 3,4 DPMO)']]);
    };
    update();
    return tk.col([tk.note('DPMO = Fehler / (Einheiten mal Möglichkeiten je Einheit) mal 1.000.000. Six Sigma heißt höchstens 3,4 DPMO.'), tk.row([f.el, u.el, o.el]), out]);
  };

  // Bestehensregeln der gestreckten Abschlussprüfung und mündliche Ergänzungsprüfung.
  const grade = (p) => AP2.exam.grade(p);
  AP2.tools.noten = () => {
    const out = holder();
    const extra = tk.result();
    const fields = [['t1', 'Teil 1 (AP1), Punkte', 70], ['doku', 'Projekt: Dokumentation', 75], ['praes', 'Projekt: Präsentation und Fachgespräch', 80], ['ps', 'Planen eines Softwareproduktes', 55], ['eua', 'Entwicklung und Umsetzung von Algorithmen', 45], ['wiso', 'Wirtschafts- und Sozialkunde', 60]]
      .map(([id, text, val]) => [id, tk.input(text, val, () => update(), 'number')]);
    const get = (id) => Math.max(0, Math.min(100, num(fields.find((f) => f[0] === id)[1].get()) || 0));
    const evaluate = (v) => {
      const proj = (v.doku + v.praes) / 2;
      const t2 = 0.5 * proj + 0.1 * v.ps + 0.1 * v.eua + 0.1 * v.wiso;
      const total = 0.2 * v.t1 + t2;
      const areas = [proj, v.ps, v.eua, v.wiso];
      const rules = [
        ['Gesamtergebnis Teil 1 + Teil 2 mindestens 50', total >= 50, de(total, 1) + ' Punkte'],
        ['Ergebnis Teil 2 mindestens ausreichend (50 %)', t2 >= 40, de(t2, 1) + ' von 80 = ' + de(t2 / 0.8, 1) + ' %'],
        ['Mindestens 3 Prüfungsbereiche von Teil 2 mit mindestens 50', areas.filter((a) => a >= 50).length >= 3, areas.filter((a) => a >= 50).length + ' von 4'],
        ['Kein Prüfungsbereich von Teil 2 ungenügend (unter 30)', areas.every((a) => a >= 30), areas.every((a) => a >= 30) ? 'erfüllt' : 'verletzt'],
      ];
      return {proj, t2, total, rules, ok: rules.every((r) => r[1])};
    };
    const update = () => {
      const v = {};
      fields.forEach(([id]) => { v[id] = get(id); });
      const r = evaluate(v);
      const g = grade(r.total);
      AP2.dispose(out);
      out.appendChild(AP2.blocks.table(['Regel', 'Erfüllt?', 'Wert'], r.rules.map(([t, ok, val]) => [t, ok ? '**ja**' : '**nein**', val])));
      out.appendChild(AP2.blocks[r.ok ? 'tip' : 'warn']((r.ok ? 'Bestanden mit ' : 'Nicht bestanden. Rechnerisch: ') + de(r.total, 1) + ' Punkten, Note ' + g[1] + ' (' + g[2] + '). Projekt: ' + de(r.proj, 1) + ' Punkte.'));
      // Ergänzungsprüfung: eine schriftliche Prüfung unter 50, neue Note = 2/3 schriftlich + 1/3 mündlich.
      const cand = ['ps', 'eua', 'wiso'].filter((id) => v[id] < 50);
      if (r.ok || !cand.length) { extra.show([['Ergänzungsprüfung', r.ok ? 'nicht nötig' : 'nicht möglich (keine schriftliche Prüfung unter 50 Punkten)']]); return; }
      const rows = cand.map((id) => {
        let need = null;
        for (let x = 0; x <= 100; x++) { const w = Object.assign({}, v, {[id]: (2 * v[id] + x) / 3}); if (evaluate(w).ok) { need = x; break; } }
        const name = fields.find((f) => f[0] === id)[1].el.textContent;
        return [name, need === null ? 'reicht nicht zum Bestehen' : 'mündlich mindestens ' + need + ' Punkte nötig'];
      });
      extra.show([['Ergänzungsprüfung', 'auf Antrag in genau einem Bereich: neues Ergebnis = 2/3 schriftlich + 1/3 mündlich']].concat(rows));
    };
    const grid = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3]}}, fields.map((f) => f[1].el));
    update();
    return tk.col([tk.note('Gewichtung: Teil 1 20 %, Projekt 50 % (Dokumentation und Präsentation/Fachgespräch je zur Hälfte), PS 10 %, EUA 10 %, WiSo 10 %. Werte 0 bis 100 Punkte.'), grid, out, extra]);
  };

  AP2.tools.energie = () => {
    const out = tk.result();
    const n = tk.input('Anzahl Geräte', 16, () => update(), 'number');
    const w = tk.input('Leistung je Gerät (Watt)', 240, () => update(), 'number');
    const hrs = tk.input('Betriebsstunden pro Tag', 24, () => update(), 'number');
    const days = tk.input('Tage pro Jahr', 365, () => update(), 'number');
    const price = tk.input('Preis pro kWh (Euro)', '0,30', () => update());
    const update = () => {
      const kw = num(n.get()) * num(w.get()) / 1000;
      const kwh = kw * num(hrs.get()) * num(days.get());
      out.show([['Gesamtleistung', de(kw, 3) + ' kW'], ['Energie pro Jahr', de(kwh, 1) + ' kWh  (kW mal Stunden mal Tage)'], ['Kosten pro Jahr', de(kwh * num(price.get()), 2) + ' Euro'], ['Kosten pro Monat', de(kwh * num(price.get()) / 12, 2) + ' Euro']]);
    };
    update();
    return tk.col([tk.note('P in kW = Anzahl mal Watt / 1000. Energie W = P mal t. Kosten = kWh mal Preis.'), tk.row([n.el, w.el, hrs.el]), tk.row([days.el, price.el]), out]);
  };

  AP2.tools.transfer = () => {
    const out = tk.result();
    const size = tk.input('Datenmenge', 6, () => update(), 'number');
    const unit = tk.select('Einheit', [['1e9', 'GB (10^9 Byte)'], ['1e6', 'MB (10^6 Byte)'], ['1073741824', 'GiB (2^30 Byte)'], ['1e12', 'TB (10^12 Byte)']], () => update());
    const rate = tk.input('Datenrate', 420, () => update(), 'number');
    const runit = tk.select('Einheit der Rate', [['8e6', 'MByte/s'], ['1e6', 'Mbit/s'], ['1e9', 'Gbit/s']], () => update());
    const update = () => {
      const bits = num(size.get()) * num(unit.get()) * 8;
      const bps = num(rate.get()) * num(runit.get());
      if (!(bps > 0)) return out.show([['Hinweis', 'Datenrate muss größer als 0 sein']]);
      const sec = bits / bps;
      out.show([['Datenmenge', de(bits / 8e6, 0) + ' MB = ' + de(bits / 1e6, 0) + ' Mbit'], ['Zeit', de(sec, 2) + ' s' + (sec >= 60 ? ' = ' + de(sec / 60, 2) + ' min' : '') + (sec >= 3600 ? ' = ' + de(sec / 3600, 2) + ' h' : '')]]);
    };
    update();
    return tk.col([tk.note('Zeit = Datenmenge / Datenrate. Einheiten angleichen: 1 Byte = 8 Bit. Beispiel: 6 GB bei 420 MByte/s = 6.000 / 420 = 14,3 s.'), tk.row([size.el, unit.el]), tk.row([rate.el, runit.el]), out]);
  };

  // Spielzeug-RSA mit BigInt: Schlüssel aus p, q, e berechnen, Zahl ver- und entschlüsseln.
  const gcd = (a, b) => (b === 0n ? a : gcd(b, a % b));
  const modpow = (b, e, m) => { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; };
  const inverse = (a, m) => { let [r0, r1, s0, s1] = [a, m, 1n, 0n]; while (r1) { const q = r0 / r1; [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return r0 === 1n ? ((s0 % m) + m) % m : null; };
  const prime = (n) => { if (n < 2n) return false; for (let i = 2n; i * i <= n; i++) if (n % i === 0n) return false; return true; };
  AP2.tools.rsa = () => {
    const out = tk.result();
    const p = tk.input('Primzahl p', 11, () => update(), 'number');
    const q = tk.input('Primzahl q', 17, () => update(), 'number');
    const e = tk.input('Öffentlicher Exponent e', 7, () => update(), 'number');
    const m = tk.input('Klartext-Zahl X', 11, () => update(), 'number');
    const update = () => {
      try {
        const P = BigInt(p.get()); const Q = BigInt(q.get()); const E = BigInt(e.get()); const X = BigInt(m.get());
        if (!prime(P) || !prime(Q) || P === Q) return out.show([['Hinweis', 'p und q müssen verschiedene Primzahlen sein']]);
        const N = P * Q; const phi = (P - 1n) * (Q - 1n);
        if (gcd(E, phi) !== 1n) return out.show([['Hinweis', 'e muss teilerfremd zu phi(N) = ' + phi + ' sein']]);
        if (X >= N) return out.show([['Hinweis', 'X muss kleiner als N = ' + N + ' sein']]);
        const D = inverse(E, phi); const V = modpow(X, E, N);
        out.show([['N = p mal q', String(N), true], ['phi(N) = (p-1)(q-1)', String(phi), true], ['Privat d (e mal d mod phi = 1)', String(D), true], ['Öffentlicher Schlüssel', '(' + E + ', ' + N + ')', true], ['Privater Schlüssel', '(' + D + ', ' + N + ')', true],
          ['Verschlüsseln V = X^e mod N', X + '^' + E + ' mod ' + N + ' = ' + V, true], ['Entschlüsseln X = V^d mod N', V + '^' + D + ' mod ' + N + ' = ' + modpow(V, D, N), true]]);
      } catch (err) { out.show([['Hinweis', 'Bitte ganze Zahlen eingeben']]); }
    };
    update();
    return tk.col([tk.note('Rechenregel für die Hand: (a mal b) mod m = ((a mod m) mal (b mod m)) mod m. Große Potenzen in kleine zerlegen.'), tk.row([p.el, q.el, e.el, m.el]), out]);
  };

  // Blockchain im Kleinen: Hash = (Summe der ASCII-Werte ohne Leerzeichen + Hash des Vorgängers) mod 999.
  const toyHash = (text, prev) => ([...String(text)].filter((ch) => ch !== ' ').reduce((a, ch) => a + ch.charCodeAt(0), 0) + prev) % 999;
  AP2.tools.blockchain = () => {
    const start = ['A zahlt 12 an B', 'C zahlt 5 an A', 'B zahlt 45 an X'];
    let prev = 0;
    const stored = start.map((t) => { prev = toyHash(t, prev); return prev; });
    const box = holder();
    const inputs = start.map((t, i) => {
      const el = AP2.field(h('input', {attrs: {type: 'text', value: t, 'aria-label': 'Daten Block ' + (i + 1)}, style: {width: '100%'}}));
      on(el, 'input', () => update());
      return el;
    });
    const cards = h('div', {style: {display: 'flex', flexWrap: 'wrap', gap: S.sp[3]}});
    const update = () => {
      AP2.dispose(cards);
      let p = 0;
      let broken = false;
      inputs.forEach((el, i) => {
        const now = toyHash(el.value, p);
        const bad = broken || now !== stored[i];
        if (bad) broken = true;
        const tone = bad ? 'bad' : 'ok';
        const card = h('div', {style: {flex: '1 1 200px', padding: '12px 14px', borderRadius: S.r.md, border: '2px solid'}}, [
          AP2.tint(h('div', {text: 'Block ' + (i + 1), style: {fontWeight: S.fw.bold, fontSize: S.f.sm, marginBottom: S.sp[2]}}), 'text'), el,
          AP2.tint(h('div', {text: 'Vorgänger-Hash: ' + p, style: {fontFamily: S.font.mono, fontSize: S.f.xs, marginTop: S.sp[2]}}), 'text2'),
          AP2.tint(h('div', {text: 'gespeichert: ' + stored[i] + '   neu berechnet: ' + now, style: {fontFamily: S.font.mono, fontSize: S.f.xs}}), tone),
          AP2.tint(h('div', {text: bad ? 'Kette gebrochen' : 'gültig', style: {fontWeight: S.fw.bold, fontSize: S.f.xs, marginTop: '4px'}}), tone)]);
        AP2.theme.bind(card, (n, c) => { n.style.borderColor = c[tone]; n.style.backgroundColor = c[tone + 'Soft']; });
        cards.appendChild(card);
        p = now;
      });
    };
    update();
    box.appendChild(cards);
    return tk.col([tk.note('Ändere die Daten eines Blocks: Sein neu berechneter Hash passt nicht mehr zum gespeicherten, und weil jeder Block den Hash seines Vorgängers enthält, sind alle folgenden Blöcke ebenfalls ungültig. Hash hier: (Summe der ASCII-Werte ohne Leerzeichen + Vorgänger-Hash) mod 999.'), box]);
  };

  // Ein Mini-Netz mit Schwellenwert-Aktivierung: 3 Eingaben, 2 versteckte Neuronen, 1 Ausgabe.
  AP2.tools.neuron = () => {
    const out = tk.result();
    const i1 = tk.input('I1: Einkommen (Tsd. Euro)', 65, () => update(), 'number');
    const i2 = tk.input('I2: Berufsjahre', 17, () => update(), 'number');
    const i3 = tk.input('I3: zurückgezahlte Kredite', 4, () => update(), 'number');
    const update = () => {
      const a = num(i1.get()); const b = num(i2.get()); const c = num(i3.get());
      const n1 = 1 * a + 1 * b; const h1 = n1 >= 60 ? 1 : 0;
      const n2 = 2 * b + 5 * c; const h2 = n2 >= 40 ? 1 : 0;
      const o = 20 + 40 * h1 + 30 * h2;
      out.show([['H1 Netzeingabe', '1 mal ' + a + ' + 1 mal ' + b + ' = ' + n1 + '  (Schwelle 60) => H1 = ' + h1], ['H2 Netzeingabe', '2 mal ' + b + ' + 5 mal ' + c + ' = ' + n2 + '  (Schwelle 40) => H2 = ' + h2], ['Ausgabe O', '20 + 40 mal ' + h1 + ' + 30 mal ' + h2 + ' = ' + o + ' % Bonität']]);
    };
    update();
    return tk.col([tk.note('Gewichte: H1 = 1 mal I1 + 1 mal I2, H2 = 2 mal I2 + 5 mal I3, Aktivierung: 1 wenn Summe mindestens Schwelle, sonst 0. Ausgabe O = 20 + 40 mal H1 + 30 mal H2 (Bias 20).'), tk.row([i1.el, i2.el, i3.el]), out]);
  };

  // Prüfziffern: ISBN-13/EAN-13 (Gewichte 1 und 3), ISBN-10 (Gewichte 10 bis 2, modulo 11), Luhn.
  AP2.tools.pruefziffer = () => {
    const out = holder();
    const res = tk.result();
    const inp = tk.input('Nummer (ohne oder mit Bindestrichen)', '978-3-7585-3368-6', () => update());
    const kind = tk.select('Verfahren', [['13', 'ISBN-13 / EAN-13'], ['10', 'ISBN-10'], ['luhn', 'Luhn (Kreditkarte, IMEI)']], () => update());
    const update = () => {
      const raw = inp.get().toUpperCase().replace(/[^0-9X]/g, '');
      const k = kind.get();
      const body = raw.slice(0, -1).split('').map(Number);
      const given = raw.slice(-1);
      if (k === '13') {
        if (raw.length !== 13) { AP2.dispose(out); return res.show([['Hinweis', '13 Ziffern nötig, gefunden: ' + raw.length]]); }
        const w = body.map((d, i) => (i % 2 ? 3 : 1));
        const sum = body.reduce((a, d, i) => a + d * w[i], 0);
        const check = (10 - (sum % 10)) % 10;
        table(out, ['Stelle'].concat(body.map((d, i) => String(i + 1))), [['Ziffer'].concat(body.map(String)), ['Gewicht'].concat(w.map(String)), ['Produkt'].concat(body.map((d, i) => String(d * w[i])))]);
        res.show([['Summe', String(sum)], ['Prüfziffer', '(10 - ' + sum + ' mod 10) mod 10 = ' + check], ['Ergebnis', String(check) === given ? 'gültig' : 'ungültig (angegeben: ' + given + ')']]);
      } else if (k === '10') {
        if (raw.length !== 10) { AP2.dispose(out); return res.show([['Hinweis', '10 Zeichen nötig']]); }
        const sum = body.reduce((a, d, i) => a + d * (10 - i), 0);
        const c = (11 - (sum % 11)) % 11;
        const check = c === 10 ? 'X' : String(c);
        table(out, ['Stelle'].concat(body.map((d, i) => String(i + 1))), [['Ziffer'].concat(body.map(String)), ['Gewicht'].concat(body.map((d, i) => String(10 - i)))]);
        res.show([['Summe', String(sum)], ['Prüfziffer', '(11 - ' + sum + ' mod 11) mod 11 = ' + check], ['Ergebnis', check === given ? 'gültig' : 'ungültig (angegeben: ' + given + ')']]);
      } else {
        const digits = raw.split('').map(Number);
        const rev = digits.slice(0, -1).reverse().map((d, i) => { if (i % 2) return d; const x = d * 2; return x > 9 ? x - 9 : x; });
        const sum = rev.reduce((a, d) => a + d, 0);
        const check = (10 - (sum % 10)) % 10;
        AP2.dispose(out);
        res.show([['Verfahren', 'von rechts jede zweite Ziffer verdoppeln (über 9: minus 9), alles addieren'], ['Summe', String(sum)], ['Prüfziffer', String(check)], ['Ergebnis', String(check) === given ? 'gültig' : 'ungültig']]);
      }
    };
    update();
    return tk.col([tk.row([inp.el, kind.el]), out, res]);
  };
})();
