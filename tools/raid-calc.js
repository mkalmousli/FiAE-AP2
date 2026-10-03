// RAID capacity calculator
(function() {
  const calc = {
    raid0: (drives, size) => ({usable: drives * size, mirror: 0, fault: 0}),
    raid1: (drives, size) => ({usable: Math.floor(drives / 2) * size, mirror: 2, fault: 1}),
    raid5: (drives, size) => ({usable: (drives - 1) * size, parity: 1, fault: 1}),
    raid6: (drives, size) => ({usable: (drives - 2) * size, parity: 2, fault: 2}),
    raid10: (drives, size) => ({usable: Math.floor(drives / 2) * size, mirror: 2, fault: Math.floor(drives / 2)}),
  };
  window.AP2.raidCalc = calc;
})();
