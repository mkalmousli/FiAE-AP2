AP2.add('infra-ipv4', [
  ['h', 'Kommunikation im selben Netz und über Netzgrenzen'],
  ['p', 'Bevor ein Gerät ein Paket sendet, prüft es mit der **eigenen Subnetzmaske**, ob das Ziel im **selben Subnetz** liegt (Netzadresse von Quelle und Ziel vergleichen). Liegt es im selben Subnetz, wird direkt per **ARP** die MAC-Adresse erfragt. Liegt es in einem **anderen** Netz, geht das Paket an das **Default Gateway** (Router).'],
  ['diagram', {w: 760, h: 270, keep: 600, cap: 'Zwei Subnetze über einen Router verbunden. PC1 und PC2 sind im selben Netz, PC3 in einem anderen.', nodes: [
    {id: 'g1', k: 'group', x: 190, y: 140, w: 330, h: 210, t: 'Netz A: 192.168.1.0/24', s: 'soft'}, {id: 'g2', k: 'group', x: 585, y: 140, w: 330, h: 210, t: 'Netz B: 192.168.2.0/24', s: 'soft'},
    {id: 'p1', k: 'round', x: 90, y: 110, t: ['PC1', '192.168.1.10'], w: 120, h: 50}, {id: 'p2', k: 'round', x: 90, y: 200, t: ['PC2', '192.168.1.20'], w: 120, h: 50}, {id: 'sw1', k: 'box', x: 230, y: 155, t: 'Switch', w: 70, h: 40, s: 'accent'},
    {id: 'r', k: 'box', x: 388, y: 155, t: ['Router', '.1  |  .1'], w: 90, h: 56, s: 'solid'},
    {id: 'sw2', k: 'box', x: 545, y: 155, t: 'Switch', w: 70, h: 40, s: 'accent'}, {id: 'p3', k: 'round', x: 690, y: 110, t: ['PC3', '192.168.2.10'], w: 120, h: 50}, {id: 'p4', k: 'round', x: 690, y: 200, t: ['PC4', '192.168.2.20'], w: 120, h: 50},
  ], edges: [{a: 'p1', b: 'sw1', ea: 'none'}, {a: 'p2', b: 'sw1', ea: 'none'}, {a: 'sw1', b: 'r', ea: 'none'}, {a: 'r', b: 'sw2', ea: 'none'}, {a: 'sw2', b: 'p3', ea: 'none'}, {a: 'sw2', b: 'p4', ea: 'none'}]}],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Rechnen Sie 172 und 200 in Binär um.', ['**172** = 128 + 32 + 8 + 4 = **10101100**', '**200** = 128 + 64 + 8 = **11001000**'], 2],
  ['qa', 'Bestimmen Sie die Klasse und die Standardmaske der Adresse 130.45.12.9.', 'Das erste Oktett 130 liegt zwischen 128 und 191: **Klasse B**. Standardmaske **255.255.0.0** (/16), Netzadresse 130.45.0.0, bis zu 65.534 Hosts.', 3],
  ['qa', 'Ist 172.20.5.9 eine private Adresse?', 'Ja. Der private Bereich 172.16.0.0/12 reicht von 172.16.0.0 bis 172.31.255.255. 172.20.5.9 liegt darin.', 2],
  ['qa', 'Gegeben: IP 192.168.10.130, Maske 255.255.255.192. Wie lauten Netzadresse, Broadcast und der Adressbereich der Hosts?', ['Blockgröße = 256 - 192 = **64**. Das vierte Oktett 130 liegt im Block 128 bis 191.', '**Netzadresse:** 192.168.10.128', '**Broadcast:** 192.168.10.191', '**Hosts:** 192.168.10.129 bis 192.168.10.190 (62 Hosts)'], 5],
  ['qa', 'Warum kann ein Host mit der Adresse 192.168.1.50/24 nicht direkt mit 192.168.2.50/24 kommunizieren?', 'Die beiden Adressen liegen in **verschiedenen Subnetzen** (192.168.1.0/24 und 192.168.2.0/24). Für die Kommunikation zwischen Netzen ist ein **Router** (Default Gateway) nötig, der Pakete von einem Netz ins andere weiterleitet.', 3],
  ['quiz', [
    {q: 'Wie viele Bits hat eine IPv4-Adresse?', o: ['32', '128', '48', '64'], a: 0, e: 'IPv4 hat 32 Bit (4 Oktette), IPv6 hat 128 Bit, MAC-Adressen haben 48 Bit.'},
    {q: 'Wie viele nutzbare Hostadressen hat ein /26-Netz?', o: ['62', '64', '60', '126'], a: 0, e: '2^6 = 64 Adressen minus Netz- und Broadcastadresse = 62.'},
    {q: 'Welche dieser Adressen ist KEINE private Adresse?', o: ['172.32.0.1', '10.5.5.5', '192.168.100.1', '172.16.0.1'], a: 0, e: 'Der private Bereich 172.16.0.0/12 endet bei 172.31.255.255. 172.32.0.1 ist öffentlich.'},
    {q: 'Was ist die Broadcastadresse von 192.168.1.0/24?', o: ['192.168.1.255', '192.168.1.254', '192.168.1.0', '255.255.255.255'], a: 0, e: 'Alle Hostbits auf 1: 192.168.1.255.'},
    {q: 'Zu welcher Klasse gehört 200.10.20.30?', o: ['C', 'A', 'B', 'D'], a: 0, e: '192 bis 223 im ersten Oktett: Klasse C.'},
    {q: 'Wofür steht /24 in 10.1.1.0/24?', o: ['24 Bits für den Netzanteil', '24 Hosts', '24 Subnetze', '24 Router'], a: 0, e: 'Die Präfixlänge gibt die Anzahl der Netzbits an.'},
  ]],
]);
