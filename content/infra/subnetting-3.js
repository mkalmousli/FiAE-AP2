AP2.add('infra-subnetting', [
  ['h', 'Aufgabentyp 5: Netze zusammenfassen (Supernetting)'],
  ['p', 'Mehrere zusammenhängende Netze lassen sich in **einer Route** zusammenfassen. Das spart Platz in Routingtabellen. Aufgabe: Fasse **192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24 und 192.168.3.0/24** zusammen.'],
  ['steps', ['Vergleiche die **dritten Oktette**: 0, 1, 2, 3. In Binär: 00000000, 00000001, 00000010, 00000011.', 'Die **ersten 6 Bits** sind gleich, nur die letzten 2 Bits unterscheiden sich. Gemeinsamer Präfix: 16 + 6 = **22 Bit**.', 'Ergebnis: **192.168.0.0/22** (Maske 255.255.252.0).', 'Kontrolle: 2^2 = 4 Netze zu je 256 Adressen = 1024 Adressen. Passt genau.']],
  ['note', 'Zusammenfassung funktioniert nur, wenn die Anzahl der Netze eine **Zweierpotenz** ist und die erste Netzadresse an einer **passenden Blockgrenze** liegt. Die Netze 192.168.1.0 bis 192.168.4.0 lassen sich **nicht** in ein /22 zusammenfassen, weil 1 kein Vielfaches von 4 ist.'],
  ['h', 'Aufgabentyp 6: Gleiches Subnetz? Gültiges Gateway?'],
  ['ex', ['**Frage:** Liegen 10.0.0.100 /25 und 10.0.0.200 /25 im selben Subnetz?', '**Lösung:** /25 hat Blockgröße 128. 100 liegt im Block 0 bis 127, 200 im Block 128 bis 255. **Nein**, verschiedene Subnetze. Ein Router ist nötig.']],
  ['ex', ['**Frage:** Ein Host hat 192.168.5.100 /27. Ist 192.168.5.129 als Gateway gültig?', '**Lösung:** Blockgröße 32. 100 liegt im Block 96 bis 127. Gültige Hostadressen: 97 bis 126. Das Gateway **.129 liegt in einem anderen Subnetz**, ist also **ungültig**. Gültig wäre zum Beispiel .97 oder .126.']],
  ['ex', ['**Frage:** Welche Adresse ist im Netz 192.168.20.32/28 als Host **nicht** zulässig? a) .33 b) .40 c) .47 d) .46', '**Lösung:** Blockgröße 16, Netz .32 bis .47. Netzadresse .32, Broadcast **.47** (nicht vergeben). Antwort c) ist **nicht zulässig**.']],
  ['h', 'Binäre Methode (zur Kontrolle)'],
  ['p', 'Wenn du dir bei der Blockmethode unsicher bist, rechne binär: **Netzadresse = IP UND Maske**.'],
  ['code', 'text', `IP      192.168.10.130   ... 10000010
Maske   /26 (.192)       ... 11000000
UND                      ... 10000000  = 128   -> Netzadresse 192.168.10.128
Hostbits alle 1          ... 10111111  = 191   -> Broadcast 192.168.10.191`],
  ['h', 'Wichtiges auf einen Blick'],
  ['table', ['Maske', 'Maske (Dezimal, letztes Oktett)', 'Block', 'Subnetze im letzten Oktett', 'Hosts'], [
    ['/25', '128', '128', '2', '126'], ['/26', '192', '64', '4', '62'], ['/27', '224', '32', '8', '30'], ['/28', '240', '16', '16', '14'], ['/29', '248', '8', '32', '6'], ['/30', '252', '4', '64', '2'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Das Netz 10.10.0.0/16 soll in 8 gleich große Subnetze geteilt werden. Wie lautet die neue Maske und wie viele Hosts hat jedes Subnetz? Nennen Sie das erste und zweite Subnetz.', ['8 Subnetze: b = 3 (2^3 = 8). Neue Maske: 16 + 3 = **/19** (255.255.224.0).', 'Hostbits: 32 - 19 = 13, Hosts: 2^13 - 2 = **8.190**.', 'Blockgröße im dritten Oktett: 256 - 224 = 32.', '1. Subnetz: **10.10.0.0/19** (10.10.0.0 bis 10.10.31.255). 2. Subnetz: **10.10.32.0/19**.'], 6],
  ['qa', 'Eine Firma erhält 192.168.50.0/24. Es werden benötigt: Vertrieb 60 Hosts, Entwicklung 28 Hosts, Verwaltung 12 Hosts, Router-Link 2 Hosts. Teilen Sie das Netz mit VLSM auf.', ['Maske: Vertrieb 60 → h = 6 → /26; Entwicklung 28 → h = 5 → /27; Verwaltung 12 → h = 4 → /28; Link → /30.', '**Vertrieb:** 192.168.50.0/26 (.1 bis .62, BC .63)', '**Entwicklung:** 192.168.50.64/27 (.65 bis .94, BC .95)', '**Verwaltung:** 192.168.50.96/28 (.97 bis .110, BC .111)', '**Link:** 192.168.50.112/30 (.113 bis .114, BC .115)'], 8],
  ['qa', 'Wie viele Hosts passen in ein Netz mit der Maske 255.255.248.0?', ['255.255.248.0 = 8 + 8 + 5 = 21 Einsen → **/21**.', 'Hostbits = 32 - 21 = 11. Hosts = 2^11 - 2 = **2.046**.'], 3],
  ['quiz', [
    {q: '192.168.1.200 /26: Wie lautet die Netzadresse?', o: ['192.168.1.192', '192.168.1.128', '192.168.1.200', '192.168.1.0'], a: 0, e: 'Blockgröße 64: Blöcke 0, 64, 128, 192. 200 liegt im Block ab 192.'},
    {q: 'Welche Maske braucht man für mindestens 100 Hosts?', o: ['/25', '/26', '/24', '/27'], a: 0, e: '2^7 - 2 = 126 ≥ 100. Hostbits 7, also /25.'},
    {q: 'Wie viele Subnetze entstehen, wenn man 3 Bits borgt?', o: ['8', '3', '6', '16'], a: 0, e: '2^3 = 8 Subnetze.'},
    {q: 'Welche Reihenfolge ist bei VLSM richtig?', o: ['Größte Subnetze zuerst vergeben', 'Kleinste zuerst', 'Zufällig', 'Alphabetisch'], a: 0, e: 'Größte zuerst vermeidet Lücken und Überlappungen an Blockgrenzen.'},
    {q: 'Was ist die Broadcast-Adresse von 172.16.32.0/20?', o: ['172.16.47.255', '172.16.32.255', '172.16.63.255', '172.16.255.255'], a: 0, e: '/20: Blockgröße 16 im dritten Oktett. 32 + 16 = 48, minus 1 = 47. Broadcast 172.16.47.255.'},
    {q: 'Wie fasst man 192.168.4.0/24 bis 192.168.7.0/24 zusammen?', o: ['192.168.4.0/22', '192.168.4.0/23', '192.168.0.0/22', '192.168.4.0/21'], a: 0, e: 'Vier Netze: 2 Bits. 24 - 2 = /22. Die Startadresse 4 ist ein Vielfaches von 4.'},
  ]],
]);
