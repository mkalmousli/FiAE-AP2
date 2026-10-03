// Werkzeug: IPv6-Adressen vollständig ausschreiben und kürzen.
(function () {
  const {tk} = AP2;
  const expand = (txt) => {
    const sides = txt.trim().toLowerCase().split('::');
    if (sides.length > 2) return null;
    const head = sides[0] ? sides[0].split(':') : [];
    const tail = sides.length === 2 && sides[1] ? sides[1].split(':') : [];
    const fill = sides.length === 2 ? 8 - head.length - tail.length : 0;
    const all = head.concat(Array(Math.max(fill, 0)).fill('0'), tail);
    return all.length === 8 && all.every((g) => /^[0-9a-f]{1,4}$/.test(g)) ? all.map((g) => g.padStart(4, '0')) : null;
  };
  const shorten = (groups) => {
    const g = groups.map((x) => x.replace(/^0+(?=.)/, ''));
    let best = {at: -1, len: 0};
    for (let i = 0; i < 8; i++) {
      let len = 0;
      while (i + len < 8 && g[i + len] === '0') len++;
      if (len > best.len) best = {at: i, len};
    }
    if (best.len < 2) return g.join(':');
    return g.slice(0, best.at).join(':') + '::' + g.slice(best.at + best.len).join(':');
  };
  AP2.tools.ipv6 = () => {
    const out = tk.result();
    const addr = tk.input('IPv6-Adresse (gekürzt oder voll)', '2001:db8:0:0:0:0:0:1', () => update());
    const update = () => {
      const groups = expand(addr.get());
      if (!groups) return out.show([['Fehler', 'Keine gültige IPv6-Adresse']]);
      const kind = groups[0] === '0000' && groups.slice(1).join('') === '0000000000000000000000000001' ? 'Loopback (::1)'
        : groups[0].startsWith('fe8') || groups[0].startsWith('fe9') || groups[0].startsWith('fea') || groups[0].startsWith('feb') ? 'Link-Local (fe80::/10)'
          : groups[0].startsWith('fc') || groups[0].startsWith('fd') ? 'Unique Local (fc00::/7)'
            : groups[0].startsWith('ff') ? 'Multicast (ff00::/8)' : groups[0].startsWith('2') || groups[0].startsWith('3') ? 'Global Unicast (2000::/3)' : 'Sonstige';
      out.show([['Vollständig', groups.join(':'), true], ['Gekürzt', shorten(groups), true], ['Adresstyp', kind], ['Netzpräfix /64', groups.slice(0, 4).join(':') + '::/64', true], ['Interface-ID', groups.slice(4).join(':'), true]]);
    };
    update();
    return tk.col([tk.note('Regeln: Führende Nullen weglassen, die längste Folge von Nullgruppen einmal durch :: ersetzen.'), addr.el, out]);
  };
})();
