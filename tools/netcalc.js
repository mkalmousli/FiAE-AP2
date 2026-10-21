// Netzwerk-Rechner: Routing-Entscheidung (längstes Präfix), VLSM-Planung, IPv6-Subnetze.
(function () {
  const {h, tk, on} = AP2;
  const S = AP2.S;
  const ip2n = (s) => { const p = String(s).trim().split('.').map(Number); return p.length === 4 && p.every((x) => x >= 0 && x <= 255 && Number.isInteger(x)) ? ((p[0] << 24) >>> 0) + (p[1] << 16) + (p[2] << 8) + p[3] : null; };
  const n2ip = (n) => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
  const mask = (len) => (len === 0 ? 0 : (0xffffffff << (32 - len)) >>> 0);
  const area = (rows, value) => {
    const el = AP2.field(h('textarea', {attrs: {rows, spellcheck: 'false', 'aria-label': 'Eingabe'}, style: {width: '100%', fontFamily: S.font.mono, fontSize: S.f.sm, resize: 'vertical'}}));
    el.value = value;
    return el;
  };
  const box = () => h('div');

  // Routing-Tabelle: Zeilen "Ziel/Präfix Next-Hop Interface"; gewählt wird der passende Eintrag mit dem längsten Präfix.
  AP2.tools.route = () => {
    const tab = area(7, ['10.10.0.0/24 lokal I_1', '10.10.9.0/28 lokal I_0', '10.10.1.0/25 10.10.9.2 I_0', '10.10.1.128/25 10.10.9.3 I_0', '10.10.2.0/27 10.10.9.4 I_0', '0.0.0.0/0 10.10.9.14 I_0'].join('\n'));
    const dest = tk.input('Ziel-IP-Adresse eines Pakets', '10.10.1.200', () => update());
    const out = box();
    const res = tk.result();
    on(tab, 'input', () => update());
    const update = () => {
      const d = ip2n(dest.get());
      const rows = tab.value.split('\n').map((l) => l.trim()).filter(Boolean).map((line) => {
        const [net, hop, ifc] = line.split(/\s+/);
        const [addr, len] = String(net).split('/');
        return {line, net, hop: hop || '?', ifc: ifc || '?', a: ip2n(addr), len: Number(len)};
      });
      const valid = rows.filter((r) => r.a !== null && r.len >= 0 && r.len <= 32);
      const hits = d === null ? [] : valid.filter((r) => ((d & mask(r.len)) >>> 0) === ((r.a & mask(r.len)) >>> 0));
      const best = hits.reduce((b, r) => (!b || r.len > b.len ? r : b), null);
      AP2.dispose(out);
      out.appendChild(AP2.blocks.table(['Ziel', 'Next Hop', 'Interface', 'passt?'], valid.map((r) => [r.net, r.hop, r.ifc, hits.includes(r) ? (r === best ? '**ja, längstes Präfix**' : 'ja') : 'nein']), {mark: best ? [valid.indexOf(best)] : []}));
      res.show(d === null ? [['Hinweis', 'Ungültige Ziel-IP']] : best ? [['Entscheidung', 'Weiterleiten über ' + best.ifc + (best.hop === 'lokal' ? ' (direkt angeschlossen)' : ' an ' + best.hop)], ['Regel', 'Von ' + hits.length + ' passenden Einträgen gewinnt der mit dem längsten Präfix (/' + best.len + ')']] : [['Entscheidung', 'Kein Eintrag passt: Paket wird verworfen (ICMP "Destination unreachable")']]);
    };
    update();
    return tk.col([tk.note('Eine Zeile je Route: Zielnetz/Präfix, Next Hop (oder "lokal"), Interface. 0.0.0.0/0 ist die Default-Route.'), tab, dest.el, out, res]);
  };

  // VLSM: größte Netze zuerst, jedes Netz so klein wie möglich, lückenlos hintereinander.
  AP2.tools.vlsm = () => {
    const base = tk.input('Startadresse/Präfix', '172.19.100.0/23', () => update());
    const needs = area(6, ['Vertrieb 106', 'Support 54', 'Produktion 30', 'Entwicklung 21', 'Leitung 10'].join('\n'));
    const out = box();
    const res = tk.result();
    on(needs, 'input', () => update());
    const update = () => {
      const [addr, plen] = base.get().split('/');
      const start = ip2n(addr);
      const blen = Number(plen);
      if (start === null || !(blen >= 0 && blen <= 32)) { AP2.dispose(out); return res.show([['Hinweis', 'Startadresse im Format a.b.c.d/Präfix']]); }
      const list = needs.value.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => { const m = l.match(/^(.*?)[\s:;]+(\d+)$/); return m ? {name: m[1], hosts: Number(m[2])} : null; }).filter(Boolean)
        .sort((a, b) => b.hosts - a.hosts);
      const first = (start & mask(blen)) >>> 0;
      const end = first + 2 ** (32 - blen);
      let cur = first;
      let overflow = false;
      const rows = list.map((n) => {
        const bits = Math.max(2, Math.ceil(Math.log2(n.hosts + 2)));
        const size = 2 ** bits;
        cur = Math.ceil(cur / size) * size;
        const net = cur;
        cur += size;
        if (cur > end) overflow = true;
        return [n.name, String(n.hosts), n2ip(net) + '/' + (32 - bits), n2ip(mask(32 - bits)), n2ip(net + 1) + ' bis ' + n2ip(net + size - 2), n2ip(net + size - 1), String(size - 2)];
      });
      AP2.dispose(out);
      out.appendChild(AP2.blocks.table(['Netz', 'benötigt', 'Netz-ID/Präfix', 'Maske', 'Hostbereich', 'Broadcast', 'nutzbar'], rows));
      res.show([['Belegt bis', n2ip(cur - 1)], ['Status', overflow ? 'Der Adressraum /' + blen + ' reicht nicht aus' : 'Passt in ' + base.get()]]);
    };
    update();
    return tk.col([tk.note('Eine Zeile je Netz: Name und Anzahl benötigter Adressen (Hosts + Drucker + Router-Interface). Hosts je Netz = 2^h - 2.'), base.el, needs, out, res]);
  };

  // IPv6: Adresse als 128-Bit-BigInt.
  const v6parse = (txt) => {
    const t = txt.trim().toLowerCase();
    const halves = t.split('::');
    if (halves.length > 2) return null;
    const part = (s) => (s ? s.split(':') : []);
    const left = part(halves[0]);
    const right = halves.length === 2 ? part(halves[1]) : [];
    const fill = 8 - left.length - right.length;
    if ((halves.length === 1 && left.length !== 8) || fill < 0) return null;
    const groups = left.concat(Array(halves.length === 2 ? fill : 0).fill('0'), right);
    if (groups.some((g) => !/^[0-9a-f]{1,4}$/.test(g))) return null;
    return groups.reduce((a, g) => (a << 16n) + BigInt(parseInt(g, 16)), 0n);
  };
  const v6full = (n) => Array.from({length: 8}, (_, i) => ((n >> BigInt(112 - 16 * i)) & 0xffffn).toString(16).padStart(4, '0'));
  const v6short = (n) => {
    const g = v6full(n).map((x) => x.replace(/^0+(?=.)/, ''));
    let best = [-1, 0];
    for (let i = 0; i < 8;) { if (g[i] === '0') { let j = i; while (j < 8 && g[j] === '0') j++; if (j - i > best[1]) best = [i, j - i]; i = j; } else i++; }
    if (best[1] < 2) return g.join(':');
    return g.slice(0, best[0]).join(':') + '::' + g.slice(best[0] + best[1]).join(':');
  };
  AP2.tools.ipv6sub = () => {
    const pre = tk.input('Zugewiesenes Präfix', '2001:db8:4a2c:1700::/56', () => update());
    const cnt = tk.input('Anzahl gleich großer Subnetze', 4, () => update(), 'number');
    const out = box();
    const res = tk.result();
    const update = () => {
      const [addr, len] = pre.get().split('/');
      const n = v6parse(addr || '');
      const L = Number(len);
      const want = Math.max(1, Math.floor(Number(cnt.get()) || 1));
      if (n === null || !(L >= 0 && L <= 128)) { AP2.dispose(out); return res.show([['Hinweis', 'Format: 2001:db8::/48']]); }
      const bits = Math.ceil(Math.log2(want));
      const nl = L + bits;
      if (nl > 128) { AP2.dispose(out); return res.show([['Hinweis', 'Zu viele Subnetze']]); }
      const netMask = L === 0 ? 0n : ((1n << 128n) - 1n) ^ ((1n << BigInt(128 - L)) - 1n);
      const base = n & netMask;
      const step = 1n << BigInt(128 - nl);
      const rows = [];
      for (let i = 0; i < Math.min(2 ** bits, 16); i++) {
        const s = base + BigInt(i) * step;
        rows.push(['Subnetz ' + (i + 1), v6short(s) + '/' + nl, v6full(s).slice(0, 4).join(':'), v6short(s + step - 1n)]);
      }
      AP2.dispose(out);
      out.appendChild(AP2.blocks.table(['Name', 'Präfix', 'erste 64 Bit (ausgeschrieben)', 'letzte Adresse'], rows));
      res.show([['Rechnung', 'Für ' + want + ' Subnetze braucht man ' + bits + ' Bit (2^' + bits + ' = ' + 2 ** bits + '), neues Präfix /' + L + ' + ' + bits + ' = /' + nl], ['Schrittweite', nl % 4 === 0 ? 'Hexziffer an Bitposition ' + nl + ' zählt hoch' : '2^' + (128 - nl) + ' Adressen je Subnetz'], ['Subnetze gesamt', String(2 ** bits) + (2 ** bits > 16 ? ' (die ersten 16 angezeigt)' : '')]]);
    };
    update();
    return tk.col([tk.note('Neues Präfix = altes Präfix + n, wenn 2^n Subnetze gebraucht werden. Jede Hexziffer entspricht 4 Bit.'), tk.row([pre.el, cnt.el]), out, res]);
  };
})();
