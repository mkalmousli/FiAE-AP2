// Werkzeug: SHA-256-Hash live berechnen (Lawineneffekt sichtbar machen).
(function () {
  const {tk} = AP2;
  const toHex = (buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  AP2.tools.hash = () => {
    const out = tk.result();
    const txt = tk.input('Text', 'Hallo', () => update());
    const update = () => {
      const subtle = window.crypto && window.crypto.subtle;
      if (!subtle) return out.show([['Hinweis', 'WebCrypto ist in diesem Browser nicht verfügbar.']]);
      const data = new TextEncoder().encode(txt.get());
      subtle.digest('SHA-256', data).then((buf) => out.show([['Eingabe (Bytes)', data.length], ['SHA-256', toHex(buf), true], ['Länge', '256 Bit = 64 Hexzeichen']]));
    };
    update();
    return tk.col([tk.note('Ändere nur einen Buchstaben: Der ganze Hash ändert sich (Lawineneffekt). Aus dem Hash lässt sich der Text nicht zurückrechnen (Einwegfunktion).'), txt.el, out]);
  };
})();
