// RAID calculator UI
(function() {
  const mkRaidCalc = () => {
    const container = AP2.h('div', {style: {padding: AP2.styles.pad}});
    const title = AP2.h('h3', {text: 'RAID Kapazitaets-Rechner'});
    
    const drivesInput = AP2.h('input', {
      attrs: {type: 'number', placeholder: 'Anzahl Laufwerke', value: '4', min: '2'},
      style: {padding: AP2.styles.padSmall, marginRight: AP2.styles.gap, borderRadius: AP2.styles.radius, border: `1px solid`, width: '120px'}
    });
    AP2.theme.register(drivesInput, 'border');
    
    const sizeInput = AP2.h('input', {
      attrs: {type: 'number', placeholder: 'Groesse pro LW (TB)', value: '2', min: '0.5', step: '0.5'},
      style: {padding: AP2.styles.padSmall, marginRight: AP2.styles.gap, borderRadius: AP2.styles.radius, border: `1px solid`, width: '120px'}
    });
    AP2.theme.register(sizeInput, 'border');
    
    const levels = ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10'];
    const resultDiv = AP2.h('div', {style: {marginTop: AP2.styles.gapLarge}});
    
    const calc = () => {
      const drives = parseInt(drivesInput.value) || 4;
      const size = parseFloat(sizeInput.value) || 2;
      AP2.disposeTree(resultDiv);
      const rows = levels.map(level => {
        const type = 'raid' + level.replace(' ', '').toLowerCase();
        const res = AP2.raidCalc[type] && AP2.raidCalc[type](drives, size) || null;
        if (!res) return [level, 'N/A', 'N/A'];
        return [level, res.usable.toFixed(1) + ' TB', res.fault + ' Ausfall(e)'];
      });
      resultDiv.appendChild(AP2.mkTable(['Level', 'Nutzkapazitaet', 'Ausfalltoleranz'], rows));
    };
    
    const btn = AP2.mkBtn({text: 'Berechnen', on: calc});
    drivesInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') calc(); });
    sizeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') calc(); });
    
    container.appendChild(title);
    container.appendChild(drivesInput);
    container.appendChild(sizeInput);
    container.appendChild(btn);
    container.appendChild(resultDiv);
    calc();
    return container;
  };
  window.AP2.mkRaidCalc = mkRaidCalc;
})();
