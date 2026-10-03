// Subnetting Calculator
(function() {
  const ipToDecimal = (ip) => {
    const parts = ip.split('.');
    return parts.map(p => parseInt(p)).reduce((a, b, i) => a + (b << (8 * (3 - i))), 0);
  };
  const decimalToIp = (dec) => {
    return [(dec >> 24) & 255, (dec >> 16) & 255, (dec >> 8) & 255, dec & 255].join('.');
  };
  const maskBitsToDots = (bits) => {
    const mask = (0xffffffff << (32 - bits)) & 0xffffffff;
    return decimalToIp(mask);
  };
  const calculate = (ip, cidr) => {
    const bits = parseInt(cidr);
    if (bits < 0 || bits > 32) return null;
    const mask = maskBitsToDots(bits);
    const ipDec = ipToDecimal(ip);
    const maskDec = ipToDecimal(mask);
    const network = decimalToIp(ipDec & maskDec);
    const broadcast = decimalToIp((ipDec & maskDec) | (~maskDec & 0xffffffff));
    const hosts = Math.pow(2, 32 - bits) - 2;
    const firstHost = decimalToIp(ipToDecimal(network) + 1);
    const lastHost = decimalToIp(ipToDecimal(broadcast) - 1);
    return {network, broadcast, mask, hosts, firstHost, lastHost};
  };
  window.AP2.subnetCalc = {calculate, maskBitsToDots};
})();
