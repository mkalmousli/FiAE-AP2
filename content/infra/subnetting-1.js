AP2.page('infra-subnetting', {
  b: 'infra', g: 'Netzwerke', t: 'Subnetting: Berechnen und Teilen von Netzen',
  d: '**Subnetting** teilt ein IP-Netz in mehrere kleinere **Subnetze**, indem Bits vom Hostanteil dem Netzanteil zugeschlagen werden ("Bits borgen"). Mit der **Blockgröße** (256 minus Maskenwert) findet man schnell Netzadresse, Broadcast und Hostbereich. **VLSM** (Variable Length Subnet Masking) erlaubt Subnetze unterschiedlicher Größe.',
  m: '**Blockgröße = 256 - Maskenwert.** Netzadresse = größtes Vielfaches der Blockgröße **kleiner oder gleich** dem IP-Wert. Broadcast = nächste Netzadresse **minus 1**. Hosts = **2^h - 2**. Subnetze = **2^geborgte Bits**.',
  cheat: [
    ['Die Blockgrößen-Methode', ['**1.** Maske im "interessanten" Oktett (das erste nicht-255 und nicht-0)', '**2.** Blockgröße = 256 - Maskenwert', '**3.** Netzadresse = Vielfaches der Blockgröße ≤ IP', '**4.** Broadcast = nächste Netzadresse - 1', '**5.** Hosts: Netz+1 bis Broadcast-1']],
    ['Subnetze bilden', ['n Subnetze: geborgte Bits b mit **2^b ≥ n**', 'Neue Maske = alte Maske + b', 'Blockgröße = 2^(Hostbits)', 'Subnetze folgen im Abstand der Blockgröße']],
    ['Maske aus Hostanzahl', ['Hostbits h mit **2^h - 2 ≥ Hosts**', 'Maske = **32 - h**', '50 Hosts: h = 6, **/26**', '100 Hosts: h = 7, **/25**', '2 Hosts: h = 2, **/30**']],
    ['VLSM-Regel', ['Subnetze **nach Größe absteigend** sortieren', 'Größtes zuerst vergeben, lückenlos hintereinander', 'Jedes Subnetz beginnt auf einem Vielfachen seiner Blockgröße']],
  ],
  blocks: [
    ['h', 'Warum Subnetting?'],
    ['p', 'Ein einziges riesiges Netz ist ungünstig: Jeder **Broadcast** erreicht alle Geräte (Belastung), es gibt keine Trennung zwischen Abteilungen (Sicherheit) und die Verwaltung ist unübersichtlich. Durch **Subnetting** entstehen kleine Netze, zum Beispiel je eines für Verwaltung, Entwicklung und Gäste-WLAN. Dazwischen steht ein Router oder eine Firewall, die den Verkehr kontrolliert. Außerdem spart man Adressen: Eine Verbindung zwischen zwei Routern braucht nur 2 Hostadressen (/30), keine 254.'],
    ['h', 'Aufgabentyp 1: Zu einer IP und Maske alles berechnen'],
    ['p', 'Die schnellste Methode ist die **Blockgrößen-Methode**. Beispiel: **192.168.10.77 /26**.'],
    ['steps', ['**Maske:** /26 = 255.255.255.**192**. Das "interessante" Oktett ist das **vierte** (192 ist weder 255 noch 0).', '**Blockgröße** = 256 - 192 = **64**. Die Subnetze beginnen bei 0, 64, 128, 192.', '**Netzadresse:** Welcher Block enthält 77? 64 bis 127. Netzadresse = **192.168.10.64**.', '**Broadcast:** nächster Block beginnt bei 128, also Broadcast = 128 - 1 = **192.168.10.127**.', '**Hostbereich:** **192.168.10.65** bis **192.168.10.126**.', '**Anzahl Hosts:** 2^6 - 2 = **62**.']],
    ['diagram', {w: 760, h: 150, keep: 620, cap: '/26 teilt das letzte Oktett in vier Blöcke zu je 64 Adressen. Die Adresse .77 liegt im zweiten Block.', nodes: [
      {id: 'b1', k: 'box', x: 130, y: 70, w: 230, h: 56, t: ['.0 bis .63', 'Netz .0, BC .63'], s: 'soft'}, {id: 'b2', k: 'box', x: 370, y: 70, w: 230, h: 56, t: ['.64 bis .127', 'Netz .64, BC .127'], s: 'solid'}, {id: 'b3', k: 'box', x: 610, y: 70, w: 230, h: 56, t: ['.128 bis .191', 'Netz .128, BC .191'], s: 'soft'},
      {id: 'ip', k: 'text', x: 370, y: 128, t: 'Host .77', fs: 13, b: true, tc: 'accent'},
    ], edges: []}],
    ['h3', 'Zweites Beispiel: 172.16.45.200 /20'],
    ['steps', ['**Maske:** /20 = 255.255.**240**.0. Das interessante Oktett ist das **dritte**.', '**Blockgröße** = 256 - 240 = **16** (im dritten Oktett). Netze: 0, 16, 32, 48 ...', '**Netzadresse:** Das dritte Oktett der IP ist 45. Der Block mit 45 beginnt bei **32**. Netz = **172.16.32.0**.', '**Broadcast:** Nächster Block beginnt bei 48 im dritten Oktett. Broadcast = **172.16.47.255** (dritter Wert 48 minus 1 = 47, vierter Wert alles 1 = 255).', '**Hostbereich:** 172.16.32.1 bis 172.16.47.254.', '**Hosts:** Hostbits = 32 - 20 = 12, also 2^12 - 2 = **4.094**.']],
    ['warn', 'Wenn das interessante Oktett **nicht das letzte** ist, sind die Oktette **rechts davon** im Netz immer **0** und im Broadcast immer **255**.'],
    ['tool', 'subnet'],
  ],
});
