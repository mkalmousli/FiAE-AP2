// Werkzeug: Zahlen und IPv4-Adressen in Binär, Hex und Dezimal umrechnen.
(function () {
  const {tk} = AP2;
  const pad = (txt, len) => txt.padStart(len, '0');
  const groups = (txt) => txt.match(/.{1,4}/g).join(' ');
  AP2.tools.bin = () => {
    const out = tk.result();
    const dec = tk.input('Dezimalzahl (0 bis 4294967295)', 202, (v) => update(), 'number');
    const ip = tk.input('IPv4-Adresse', '192.168.10.77', () => update());
    const update = () => {
      const n = Math.max(0, Math.min(4294967295, Math.floor(Number(dec.get()) || 0)));
      const bits = pad(n.toString(2), n > 255 ? 32 : 8);
      const rows = [['Binär', groups(bits), true], ['Hexadezimal', n.toString(16).toUpperCase(), true], ['Oktal', n.toString(8), true]];
      const parts = ip.get().split('.').map(Number);
      const ok = parts.length === 4 && parts.every((x) => Number.isInteger(x) && x >= 0 && x <= 255);
      rows.push(['IPv4 binär', ok ? parts.map((x) => pad(x.toString(2), 8)).join('.') : 'ungültige Adresse', true]);
      if (ok) rows.push(['IPv4 als Zahl', parts.reduce((a, x) => a * 256 + x, 0)]);
      out.show(rows);
    };
    update();
    return tk.col([tk.note('Jede Stelle im Binärsystem ist eine Zweierpotenz: 128, 64, 32, 16, 8, 4, 2, 1.'), tk.row([dec.el, ip.el]), out]);
  };
})();
