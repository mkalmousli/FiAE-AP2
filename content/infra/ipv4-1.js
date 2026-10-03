AP2.page('infra-ipv4', {
  b: 'infra', g: 'Netzwerke', t: 'IPv4-Adressierung, Netzklassen und CIDR',
  d: 'Eine **IPv4-Adresse** ist eine **32 Bit** lange Zahl, geschrieben als vier **Oktette** (0 bis 255) mit Punkten, zum Beispiel `192.168.10.77`. Sie besteht aus einem **Netzanteil** und einem **Hostanteil**. Die **Subnetzmaske** (zum Beispiel `255.255.255.0` oder `/24`) legt fest, wo die Grenze liegt.',
  m: '**Netzadresse = IP AND Maske** (alle Hostbits 0). **Broadcast = alle Hostbits 1.** Hosts = **2^h - 2** (h = Anzahl Hostbits; minus Netz- und Broadcastadresse). Private Bereiche: **10/8, 172.16/12, 192.168/16**.',
  cheat: [
    ['Grundlagen', ['32 Bit = 4 Oktette zu je 8 Bit', 'Dezimal 0 bis 255 je Oktett', 'Netzanteil + Hostanteil', 'Maske: Einsen = Netz, Nullen = Host']],
    ['Wichtige Adressen', ['**Netzadresse:** alle Hostbits 0 (nicht vergeben)', '**Broadcast:** alle Hostbits 1 (nicht vergeben)', '**Hosts:** dazwischen', '**127.0.0.1:** Loopback (localhost)']],
    ['Private Bereiche (RFC 1918)', ['**10.0.0.0/8**', '**172.16.0.0/12** (bis 172.31.255.255)', '**192.168.0.0/16**', 'Nicht im Internet geroutet (NAT nötig)']],
    ['Zweierpotenzen', ['128, 64, 32, 16, 8, 4, 2, 1', '2^8 = 256, 2^7 = 128, 2^6 = 64', '2^5 = 32, 2^4 = 16, 2^3 = 8, 2^2 = 4', 'Hosts = 2^h - 2']],
  ],
  blocks: [
    ['h', 'Aufbau einer IPv4-Adresse'],
    ['p', 'Jedes Gerät in einem IP-Netz braucht eine **IP-Adresse**, vergleichbar mit einer Hausadresse: Straße (Netz) und Hausnummer (Host). Eine IPv4-Adresse hat **32 Bit**, gegliedert in **vier Oktette** zu je 8 Bit. Zur besseren Lesbarkeit schreibt man jedes Oktett als Dezimalzahl von 0 bis 255 (**Dotted Decimal**).'],
    ['table', ['Oktett', '1', '2', '3', '4'], [
      ['Dezimal', '192', '168', '10', '77'],
      ['Binär', '11000000', '10101000', '00001010', '01001101'],
    ], {first: true}],
    ['h3', 'Dezimal und binär umrechnen'],
    ['p', 'Jede Stelle eines Oktetts hat einen Wert: von links 128, 64, 32, 16, 8, 4, 2, 1. Steht eine **1**, zählt der Wert mit, bei **0** nicht.'],
    ['table', ['Stellenwert', '128', '64', '32', '16', '8', '4', '2', '1', 'Summe'], [
      ['Binär 77', '0', '1', '0', '0', '1', '1', '0', '1', '64 + 8 + 4 + 1 = **77**'],
      ['Binär 192', '1', '1', '0', '0', '0', '0', '0', '0', '128 + 64 = **192**'],
      ['Binär 168', '1', '0', '1', '0', '1', '0', '0', '0', '128 + 32 + 8 = **168**'],
    ]],
    ['p', '**Von dezimal nach binär:** Prüfe von links, ob der Stellenwert in die Zahl passt (ja: 1 schreiben und abziehen, nein: 0). Beispiel 77: 128 passt nicht (0), 64 passt (1, Rest 13), 32 nein (0), 16 nein (0), 8 passt (1, Rest 5), 4 passt (1, Rest 1), 2 nein (0), 1 passt (1). Ergebnis: **01001101**.'],
    ['tool', 'bin'],
    ['h', 'Netzanteil und Hostanteil: die Subnetzmaske'],
    ['p', 'Die **Subnetzmaske** zeigt, welche Bits zum **Netz** gehören (Einsen) und welche zum **Host** (Nullen). Die Einsen stehen immer **zusammenhängend links**. Man schreibt die Maske dezimal (`255.255.255.192`) oder als **Präfixlänge** in **CIDR-Notation** (`/26` = 26 Einsen).'],
    ['code', 'text', `IP-Adresse   192.168.10.77   11000000.10101000.00001010.01001101
Maske /26    255.255.255.192  11111111.11111111.11111111.11000000
                              |--------- Netzanteil ---------||Host|
AND (Netz)   192.168.10.64    11000000.10101000.00001010.01000000
Broadcast    192.168.10.127   11000000.10101000.00001010.01111111`],
    ['steps', ['**Netzadresse** = IP **AND** Maske (bitweise UND). Alle Hostbits werden 0.', '**Broadcastadresse** = Netzadresse, bei der alle **Hostbits 1** sind.', '**Erste Hostadresse** = Netzadresse + 1, **letzte Hostadresse** = Broadcast - 1.', '**Anzahl der Hosts** = 2^(Hostbits) - 2.']],
    ['warn', 'Die **Netzadresse** (alle Hostbits 0) und die **Broadcastadresse** (alle Hostbits 1) dürfen **keinem Gerät** zugewiesen werden. Deshalb "minus 2".'],
  ],
});
