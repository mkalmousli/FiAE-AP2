AP2.page('infra-medien', {
  b: 'infra', g: 'Netzwerke', t: 'Übertragungsmedien (Kupfer, Glasfaser, WLAN)',
  d: 'Übertragungsmedien transportieren die Signale: **Kupferkabel** (Twisted Pair, elektrische Signale, bis 100 m), **Lichtwellenleiter** (Glasfaser, Lichtsignale, große Reichweite und Bandbreite, unempfindlich gegen Störungen) und **Funk** (WLAN, Mobilfunk, geteiltes Medium). Die Wahl hängt von **Reichweite, Bandbreite, Kosten, Störanfälligkeit und Sicherheit** ab.',
  m: '**Kupfer: billig, bis 100 m, störanfällig. Glasfaser: teuer, weit, schnell, störsicher. Funk: flexibel, geteilt, abhörbar.** Twisted Pair: **Cat6a = 10 Gbit/s bis 100 m**. Single-Mode = **Single, ein Lichtweg, weit**, Multi-Mode = mehrere Wege, kurz.',
  cheat: [
    ['Twisted Pair (Kupfer)', ['Verdrillte Adernpaare (weniger Störungen)', 'Stecker **RJ45**, max. **100 m** pro Segment', '**Cat5e:** 1 Gbit/s, **Cat6:** 1 Gbit/s (10 Gbit/s bis 55 m)', '**Cat6a:** 10 Gbit/s bis 100 m', '**UTP** ungeschirmt, **STP/S/FTP** geschirmt']],
    ['Glasfaser (LWL)', ['Lichtsignale im Glaskern', '**Multimode (MM):** kurze Strecken, bis einige hundert Meter', '**Singlemode (SM):** viele Kilometer', 'Unempfindlich gegen elektromagnetische Störungen, abhörsicher', 'Teurer, empfindlich bei Biegung']],
    ['WLAN (IEEE 802.11)', ['**2,4 GHz:** große Reichweite, wenig Kanäle, stark gestört', '**5 GHz:** schneller, kürzere Reichweite', '**6 GHz:** neu (Wi-Fi 6E/7)', 'Sicherheit: **WPA2/WPA3** (nie WEP)']],
    ['Auswahlkriterien', ['**Reichweite**, **Bandbreite**, **Kosten**', '**Störungen** (EMV), **Sicherheit**', 'Verlegung und Zukunftssicherheit']],
  ],
  blocks: [
    ['h', 'Warum gibt es verschiedene Medien?'],
    ['p', 'Es gibt kein bestes Medium, sondern nur das **passende** für den Zweck: Im Büro reicht Kupfer, zwischen Gebäuden ist Glasfaser sinnvoll (keine Blitz- und Potenzialprobleme, größere Entfernung), und für mobile Geräte braucht man Funk. Jedes Medium hat eine **Dämpfung** (Signal wird schwächer) und eine **Störanfälligkeit**.'],
    ['h', 'Kupferkabel: Twisted Pair'],
    ['p', 'Ein Netzwerkkabel besteht aus **vier verdrillten Adernpaaren**. Durch das **Verdrillen** heben sich Störungen gegenseitig auf. Je höher die **Kategorie (Cat)**, desto höher die nutzbare **Frequenz** und damit die Datenrate. Die maximale Länge eines Segments beträgt **100 m** (90 m feste Verlegung plus Patchkabel).'],
    ['table', ['Kategorie', 'Max. Frequenz', 'Typische Datenrate', 'Anmerkung'], [
      ['Cat5e', '100 MHz', '1 Gbit/s (1000BASE-T)', 'Standard der letzten Jahre'], ['Cat6', '250 MHz', '1 Gbit/s, 10 Gbit/s bis ca. 55 m', 'Gängig in Neubauten'], ['Cat6a', '500 MHz', '10 Gbit/s bis 100 m (10GBASE-T)', 'Aktueller Standard für neue Gebäudeverkabelung'], ['Cat7 / Cat7a', '600 / 1000 MHz', '10 Gbit/s und mehr', 'Voll geschirmt (S/FTP), andere Stecker möglich'], ['Cat8', '2000 MHz', '25 / 40 Gbit/s bis 30 m', 'Rechenzentrum'],
    ]],
    ['kv', [
      ['UTP', 'Unshielded Twisted Pair: ungeschirmt, günstig, ausreichend in störungsarmer Umgebung.'],
      ['STP / FTP / S/FTP', 'Geschirmt (Folie und/oder Geflecht). Besser bei elektromagnetischen Störungen (Maschinen, Starkstromkabel), muss korrekt **geerdet** werden.'],
      ['Straight-through / Crossover', 'Normales Patchkabel (Gerät zu Switch) / gekreuztes Kabel (Gerät zu Gerät). Moderne Geräte erkennen das automatisch (**Auto-MDI/MDIX**).'],
      ['Power over Ethernet (PoE)', 'Das Netzwerkkabel liefert **Strom** für Telefone, Access Points, Kameras (IEEE 802.3af/at/bt).'],
    ]],
    ['h', 'Lichtwellenleiter (Glasfaser)'],
    ['p', 'Ein LWL überträgt **Lichtimpulse** durch einen Glaskern. Er ist **unempfindlich gegen elektromagnetische Störungen**, **abhörsicher** (schwer anzapfbar), hat sehr **geringe Dämpfung** und erlaubt hohe Bandbreiten über große Entfernungen. Nachteile: höhere Kosten für Kabel, Stecker und aktive Technik, empfindlich gegenüber Knicken, aufwendige Montage (Spleißen).'],
    ['table', ['Merkmal', 'Multimode (MM)', 'Singlemode (SM)'], [['Kerndurchmesser', 'dick (50 oder 62,5 µm)', 'dünn (ca. 9 µm)'], ['Lichtquelle', 'LED oder VCSEL-Laser', 'Laser'], ['Reichweite', 'bis einige hundert Meter (je nach Typ OM3/OM4)', 'viele Kilometer (10 bis über 100 km)'], ['Kosten', 'Kabel günstiger, Technik günstiger', 'Technik teurer'], ['Einsatz', 'Gebäude, Rechenzentrum', 'Campus, Stadt, Fernnetz']]],
  ],
});
