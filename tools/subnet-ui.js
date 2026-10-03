// Subnetting Calculator UI
(function() {
  const mkSubnetCalc = () => {
    const container = AP2.h('div', {style: {padding: AP2.styles.pad}});
    const title = AP2.h('h3', {text: 'Subnetting Rechner'});
    
    const ipInput = AP2.h('input', {
      attrs: {type: 'text', placeholder: 'IP-Adresse (z.B. 192.168.10.77)', value: '192.168.10.77'},
      style: {padding: AP2.styles.padSmall, marginRight: AP2.styles.gap, borderRadius: AP2.styles.radius, border: `1px solid`}
    });
    AP2.theme.register(ipInput, 'border');
    
    const cidrInput = AP2.h('input', {
      attrs: {type: 'number', placeholder: 'CIDR (0-32)', value: '26', min: '0', max: '32'},
      style: {padding: AP2.styles.padSmall, width: '60px', borderRadius: AP2.styles.radius, border: `1px solid`}
    });
    AP2.theme.register(cidrInput, 'border');
    
    const resultDiv = AP2.h('div', {style: {marginTop: AP2.styles.gapLarge}});
    
    const calc = () => {
      const ip = ipInput.value;
      const cidr = cidrInput.value;
      const result = AP2.subnetCalc.calculate(ip, cidr);
      if (!result) {
        AP2.disposeTree(resultDiv);
        resultDiv.appendChild(AP2.h('p', {text: 'Ungueltige Eingabe'}));
        return;
      }
      AP2.disposeTree(resultDiv);
      const rows = [
        ['Netzadresse', result.network],
        ['Broadcast', result.broadcast],
        ['Subnetzmaske', result.mask],
        ['Verfuegbare Hosts', result.hosts.toString()],
        ['Erste Host-Adresse', result.firstHost],
        ['Letzte Host-Adresse', result.lastHost],
      ];
      resultDiv.appendChild(AP2.mkTable(['Feld', 'Wert'], rows));
    };
    
    const btn = AP2.mkBtn({text: 'Berechnen', on: calc});
    ipInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') calc(); });
    cidrInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') calc(); });
    
    container.appendChild(title);
    container.appendChild(ipInput);
    container.appendChild(cidrInput);
    container.appendChild(btn);
    container.appendChild(resultDiv);
    calc();
    return container;
  };
  window.AP2.mkSubnetCalc = mkSubnetCalc;
})();
