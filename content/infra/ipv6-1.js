AP2.page('infra-ipv6', {
  b: 'infra', g: 'Netzwerke', t: 'IPv6-Grundlagen',
  d: '**IPv6** ist der Nachfolger von IPv4. Eine IPv6-Adresse hat **128 Bit** und wird als **8 Gruppen aus je 4 Hexadezimalziffern** geschrieben (zum Beispiel `2001:0db8:0000:0000:0000:ff00:0042:8329`). Es gibt **kein Broadcast** mehr, der Adressraum ist so groß, dass **NAT nicht nötig** ist. Das Standard-Subnetz ist ein **/64**.',
  m: '**128 Bit = 8 mal 16 Bit = 8 Gruppen.** Kürzen: **führende Nullen weglassen** und **eine** Folge aus Null-Gruppen durch `::` ersetzen (nur **einmal** pro Adresse!). Kein Broadcast: stattdessen **Multicast**. Link-Local beginnt mit **fe80**.',
  cheat: [
    ['Aufbau', ['128 Bit, 8 Gruppen, hexadezimal, durch `:` getrennt', 'Präfix (Netz) + Interface-ID (Host)', 'Standard-Subnetz **/64**: 64 Bit Netz, 64 Bit Host']],
    ['Kürzungsregeln', ['1. **Führende Nullen** einer Gruppe weglassen', '2. **Eine** Folge von Null-Gruppen durch `::`', '`2001:0db8:0000:0000:0000:ff00:0042:8329` wird `2001:db8::ff00:42:8329`']],
    ['Adresstypen', ['**Unicast:** ein Empfänger (global 2000::/3, link-local fe80::/10, ULA fc00::/7)', '**Multicast:** Gruppe (ff00::/8)', '**Anycast:** nächster Empfänger', '**Kein Broadcast!**']],
    ['Sonderadressen', ['`::1` Loopback', '`::` unspezifiziert', '`fe80::` Link-Local (jedes Interface)', '`2001:db8::/32` nur für Dokumentation']],
  ],
  blocks: [
    ['h', 'Warum IPv6?'],
    ['p', 'IPv4 hat nur etwa **4,3 Milliarden** Adressen (2^32). Durch das Wachstum des Internets (Handys, Sensoren, IoT) sind die öffentlichen IPv4-Adressen **aufgebraucht**. NAT hat das Problem verlängert, aber nicht gelöst. **IPv6** bietet **2^128 Adressen**, ungefähr 3,4 mal 10^38, genug für jedes Gerät auf der Welt.'],
    ['h', 'Aufbau und Schreibweise'],
    ['p', 'Die 128 Bit werden in **8 Blöcke zu je 16 Bit** geteilt. Jeder Block ist **hexadezimal** (Ziffern 0 bis 9 und a bis f) geschrieben, getrennt durch Doppelpunkte. 16 Bit entsprechen 4 Hexadezimalziffern.'],
    ['code', 'text', `Vollständig:  2001:0db8:0000:0000:0000:ff00:0042:8329
              |---- Präfix ----||--- Interface-ID ---|
Schritt 1:    2001:db8:0:0:0:ff00:42:8329       (führende Nullen weg)
Schritt 2:    2001:db8::ff00:42:8329            (Null-Gruppen durch :: ersetzt)`],
    ['warn', 'Das `::` darf **nur einmal** in einer Adresse stehen, sonst wäre unklar, wie viele Null-Gruppen jeweils gemeint sind. Bei mehreren möglichen Folgen kürzt man die **längste** Folge.'],
    ['tool', 'ipv6'],
    ['h', 'Adresstypen'],
    ['table', ['Typ', 'Präfix', 'Bedeutung', 'Vergleich IPv4'], [
      ['**Global Unicast (GUA)**', '2000::/3 (meist 2001:..., 2003:...)', 'Öffentlich, weltweit eindeutig, im Internet erreichbar', 'Öffentliche Adresse'],
      ['**Link-Local**', 'fe80::/10', 'Nur im lokalen Netzsegment, jedes Interface hat automatisch eine', 'APIPA (169.254.x.x), aber immer vorhanden'],
      ['**Unique Local (ULA)**', 'fc00::/7 (praktisch fd00::/8)', 'Privates, nicht geroutetes Netz', 'Private Adressen (10.x, 192.168.x)'],
      ['**Multicast**', 'ff00::/8', 'Gruppe von Empfängern, ersetzt Broadcast (zum Beispiel ff02::1 = alle Geräte im Link)', 'Multicast und Broadcast'],
      ['**Anycast**', 'wie Unicast', 'Dieselbe Adresse an mehreren Orten, der nächste antwortet', '-'],
      ['**Loopback**', '::1/128', 'Eigenes Gerät', '127.0.0.1'],
    ]],
  ],
});
