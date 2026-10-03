// Werkzeug: Subnetting-Rechner mit farbiger Binärdarstellung (Netzteil und Hostteil).
(function () {
  const {h} = AP2;
  const {tk} = AP2;
  const toInt = (txt) => {
    const p = txt.trim().split('.').map(Number);
    return p.length === 4 && p.every((x) => Number.isInteger(x) && x >= 0 && x <= 255) ? ((p[0] * 256 + p[1]) * 256 + p[2]) * 256 + p[3] : null;
  };
  const toIp = (n) => [24, 16, 8, 0].map((s) => Math.floor(n / 2 ** s) % 256).join('.');
  const maskOf = (pre) => (pre === 0 ? 0 : (0xFFFFFFFF << (32 - pre)) >>> 0);
  const binView = (n, pre) => {
    const bits = (n >>> 0).toString(2).padStart(32, '0');
    const wrap = h('div', {style: {fontFamily: AP2.S.font.mono, fontSize: AP2.S.f.md, display: 'flex', flexWrap: 'wrap', gap: '4px'}});
    for (let i = 0; i < 4; i++) {
      const oct = h('span', {}, bits.slice(i * 8, i * 8 + 8).split('').map((bit, j) => {
        const net = i * 8 + j < pre;
        const el = h('span', {text: bit, style: {fontWeight: net ? '700' : '400'}});
        return AP2.tint(el, net ? 'accent' : 'text2');
      }));
      wrap.appendChild(oct);
      if (i < 3) wrap.appendChild(AP2.tint(h('span', {text: '.'}), 'text3'));
    }
    return wrap;
  };
  AP2.tools.subnet = () => {
    const out = tk.result();
    const view = h('div');
    const ip = tk.input('IP-Adresse', '192.168.10.77', () => update());
    const pre = tk.input('Präfix (CIDR, 0 bis 32)', 26, () => update(), 'number');
    const update = () => {
      const addr = toInt(ip.get());
      const p = Math.floor(Number(pre.get()));
      while (view.firstChild) view.removeChild(view.firstChild);
      if (addr === null || !(p >= 0 && p <= 32)) return out.show([['Fehler', 'Bitte gültige Adresse und Präfix eingeben']]);
      const mask = maskOf(p);
      const net = (addr & mask) >>> 0;
      const bc = (net | (~mask >>> 0)) >>> 0;
      const hosts = p >= 31 ? (p === 31 ? 2 : 1) : 2 ** (32 - p) - 2;
      out.show([['Subnetzmaske', toIp(mask), true], ['Wildcard', toIp(~mask >>> 0), true], ['Netzadresse', toIp(net), true], ['Broadcast', toIp(bc), true],
        ['Erster Host', p >= 31 ? '-' : toIp(net + 1), true], ['Letzter Host', p >= 31 ? '-' : toIp(bc - 1), true], ['Nutzbare Hosts', hosts]]);
      view.appendChild(tk.note('Adresse binär (fett und farbig = Netzanteil, grau = Hostanteil):'));
      view.appendChild(binView(addr, p));
      view.appendChild(binView(mask, p));
    };
    update();
    return tk.col([tk.row([ip.el, pre.el]), out, view]);
  };
})();
