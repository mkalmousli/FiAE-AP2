AP2.page('eua-bits', {
  b: 'eua', g: 'IoT und Hardware', t: 'Zahlensysteme, Bitoperationen und Hardware-Schnittstellen',
  d: 'Computer speichern alles als **Bits** (0 oder 1). Mit **Binär** (Basis 2) und **Hexadezimal** (Basis 16, eine Hex-Ziffer = 4 Bit) beschreibt man Adressen, Register und Flags kompakt. **Bitoperationen** (`&` UND, `|` ODER, `^` XOR, `~` NICHT, `<<` und `>>` Schieben) setzen, löschen und prüfen einzelne Bits. In IoT-Aufgaben kommen dazu **Schnittstellen** zwischen Mikrocontroller und PC oder Sensor (UART/seriell, I²C, SPI, USB, Bluetooth, WLAN, Ethernet) und einfache **Elektrotechnik** (Ohmsches Gesetz, Leistung, Auflösung eines Messwerts).',
  m: '**Eine Hex-Ziffer = 4 Bit (ein Nibble), zwei Hex-Ziffern = 1 Byte.** **`x << 1` = mal 2, `x >> 1` = ganzzahlig durch 2.** **Bit prüfen: `x & maske`, setzen: `x | maske`, löschen: `x & ~maske`.** **Auflösung = Messbereich / (2^n - 1).** **U = R · I, P = U · I.** **Baudrate muss auf beiden Seiten gleich sein.**',
  cheat: [
    ['Umrechnen', ['bin -> dez: Stellenwerte 128 64 32 16 8 4 2 1', 'dez -> bin: fortlaufend durch 2, Reste von unten', 'bin -> hex: in 4er-Gruppen', '0xD3 = 1101 0011 = 211']],
    ['Bitoperatoren', ['`a & b` UND', '`a | b` ODER', '`a ^ b` XOR', '`~a` NICHT, `<<`, `>>` schieben']],
    ['Elektrotechnik', ['U = R · I (Volt = Ohm · Ampere)', 'P = U · I = I² · R (Watt)', 'Q = I · t (Ah bzw. mAh)', 'E = P · t (kWh)']],
    ['Schnittstellen', ['UART/seriell: 2 Leitungen, Baudrate', 'I²C: Bus mit Adressen, SDA/SCL', 'SPI: schnell, Chip-Select je Gerät', 'USB, Bluetooth, WLAN, Ethernet']],
  ],
  blocks: [
    ['h', 'Zahlensysteme'],
    ['table', ['Dezimal', 'Binär', 'Hex', 'Dezimal', 'Binär', 'Hex'], [
      ['0', '0000', '0', '8', '1000', '8'],
      ['1', '0001', '1', '9', '1001', '9'],
      ['2', '0010', '2', '10', '1010', 'A'],
      ['3', '0011', '3', '11', '1011', 'B'],
      ['4', '0100', '4', '12', '1100', 'C'],
      ['5', '0101', '5', '13', '1101', 'D'],
      ['6', '0110', '6', '14', '1110', 'E'],
      ['7', '0111', '7', '15', '1111', 'F'],
    ]],
    ['ex', ['Dezimal 211 in Binär und Hex:', '211 = 128 + 64 + 16 + 2 + 1 -> **1101 0011**', 'In 4er-Gruppen: 1101 = D, 0011 = 3 -> **0xD3**', 'Zurück: D3 = 13 · 16 + 3 = 211.']],
    ['tool', 'bin'],
    ['h', 'Bitoperationen'],
    ['table', ['Operation', 'Beispiel (8 Bit)', 'Ergebnis', 'Zweck'], [
      ['UND `&`', '1101 0011 & 0000 0001', '0000 0001', 'Bit **prüfen** (Maske): Ist Bit 0 gesetzt?'],
      ['ODER `|`', '1101 0000 | 0000 0100', '1101 0100', 'Bit **setzen**'],
      ['UND mit NICHT `& ~`', '1101 0111 & ~0000 0100', '1101 0011', 'Bit **löschen**'],
      ['XOR `^`', '1101 0011 ^ 0000 0001', '1101 0010', 'Bit **umschalten**'],
      ['Links schieben `<<`', '0000 1011 << 1', '0001 0110', 'mal 2 (11 -> 22)'],
      ['Rechts schieben `>>`', '0001 0110 >> 1', '0000 1011', 'ganzzahlig durch 2'],
    ]],
    ['h', 'Prüfungsbeispiel Sommer 2023: Mittelwert und Fehlerbit in einem Rückgabewert'],
    ['p', 'Eine Methode bildet den Mittelwert aus vier Temperaturen. Weicht ein Messwert mehr als eine Schwelle vom Mittel ab, soll das **im selben Rückgabewert** erkennbar sein: Der Mittelwert wird **um ein Bit nach links geschoben** (mal 2), das **unterste Bit** enthält die Fehlerinformation (0 = alles ok, 1 = Abweichung).'],
    ['codes', [
      ['python', `def kodieren(mittel, fehler):
    rueck = int(mittel) << 1        # = int(mittel) * 2, unterstes Bit ist jetzt 0
    if fehler:
        rueck = rueck | 1           # = rueck + 1, unterstes Bit setzen
    return rueck

ergebnis = kodieren(22.75, True)    # 22 -> 44, mit Fehler 45
if ergebnis & 1:                    # oder: ergebnis % 2 == 1
    print("Messwerte zu weit auseinander")
mittel = ergebnis >> 1              # oder: ergebnis // 2  -> 22
print("Mittelwert:", mittel)`],
      ['csharp', `int rueck = (int)tempMittel * 2;
if (abweichung > schwelle) rueck = rueck + 1;
// Auswerten:
bool fehler = (rueck & 1) == 1;
int mittel = rueck >> 1;`],
    ]],
    ['p', '**Erweiterung (10 Punkte):** Aus dem Rückgabewert soll erkennbar sein, **welcher** der vier Sensoren abweicht. Lösung: vier Fehlerbits. Der Mittelwert wird um **4 Bit** verschoben (mal 16), Sensor 1 bekommt Wertigkeit 1, Sensor 2 Wertigkeit 2, Sensor 3 Wertigkeit 4, Sensor 4 Wertigkeit 8.'],
    ['diagram', AP2.dg.nsd([
      ['act', 'rueck = Ganzzahl(tempMittel) * 16'],
      ['act', 'wertigkeit = 1'],
      ['for', 'von i = 0 solange i < 4', [
        ['if', '|tempMittel - temp[i]| > schwelle ?', [['act', 'rueck = rueck + wertigkeit']], [['act', '(nichts)']]],
        ['act', 'wertigkeit = wertigkeit * 2'],
      ]],
      ['act', 'Rückgabe von rueck'],
    ], {w: 520, cap: 'Struktogramm: Jeder Sensor setzt sein eigenes Bit. Beispiel: Mittel 3, Sensor 2 und 4 weichen ab -> 3·16 + 2 + 8 = 58 = 0011 1010.'})],
    ['h', 'Prüfungsbeispiel Sommer 2023: I²C-Adressen (6 Punkte)'],
    ['p', 'Beim **I²C-Bus** hängen mehrere **Slaves** (Sensoren) an zwei Leitungen (SDA Daten, SCL Takt). Der **Master** (Mikrocontroller) spricht jeden Slave über eine **Adresse** an. Laut Datenblatt: D7 bis D4 fest `1101`, D3 bis D1 frei wählbar, D0 = 1 für Write.'],
    ['table', ['Sensor', 'D7 D6 D5 D4', 'D3 D2 D1 (frei)', 'D0', 'Binär', 'Hex'], [
      ['1', '1 1 0 1', '0 0 0', '1', '1101 0001', '**0xD1**'],
      ['2', '1 1 0 1', '0 0 1', '1', '1101 0011', '**0xD3**'],
    ]],
    ['note', 'Wichtig ist nur, dass beide Sensoren **unterschiedliche** Werte in D3 bis D1 haben, sonst würden beide auf dieselbe Adresse antworten. Mit drei freien Bits sind 2³ = 8 Sensoren dieses Typs an einem Bus möglich.'],
    ['h', 'Auflösung eines digitalisierten Messwerts'],
    ['p', 'Ein **A/D-Wandler** mit n Bit unterscheidet 2^n Stufen. Die kleinste darstellbare Differenz ist der **Messbereich geteilt durch die Zahl der Schritte**.'],
    ['ex', ['Sommer 2023: Messbereich -50 °C bis +50 °C, 8-Bit-Datenblock. Minimal auflösbare Temperaturdifferenz?', 'Messbereich = 50 - (-50) = 100 K. 8 Bit = 2^8 = 256 Stufen, also 255 Schritte.', 'Auflösung = 100 K / 255 ≈ **0,39 K** (die offizielle Lösung rechnet 101 K / 256 ≈ 0,395 K; beide Wege werden akzeptiert).']],
    ['h', 'Serielle Schnittstelle und Baudrate (Winter 2024/25)'],
    ['p', '`Serial.begin(9600);` konfiguriert die **UART**-Schnittstelle des Mikrocontrollers mit einer **Baudrate von 9600 Bit/s** (Symbole pro Sekunde, hier gleich Bit/s). Der **PC muss dieselbe Baudrate** (und dasselbe Rahmenformat, meist 8N1: 8 Datenbits, keine Parität, 1 Stoppbit) einstellen, sonst kommen nur unlesbare Zeichen an. Bei 8N1 braucht ein Byte 10 Bit, also etwa **960 Byte pro Sekunde**.'],
    ['table', ['Schnittstelle', 'Vorteil', 'Nachteil'], [
      ['**USB** (seriell über USB-Adapter)', 'Weit verbreitet, Stromversorgung inklusive, einfach', 'Kabelgebunden, kurze Leitungslänge (ca. 5 m)'],
      ['**Bluetooth**', 'Drahtlos, energiesparend (BLE)', 'Geringe Reichweite (ca. 10 m), Pairing nötig, eventuell Zusatzhardware'],
      ['**WLAN**', 'Drahtlos, größere Reichweite als Bluetooth, direkt im Netzwerk erreichbar', 'Höherer Strombedarf, Konfiguration und Absicherung nötig'],
      ['**Ethernet (LAN)**', 'Stabil, schnell, ortsunabhängig im Netzwerk erreichbar, PoE möglich', 'LAN-Anschluss und Verkabelung nötig'],
      ['**I²C**', 'Nur 2 Leitungen für viele Geräte (Adressen)', 'Nur kurze Strecken (auf der Platine), langsam'],
      ['**SPI**', 'Sehr schnell, einfach', 'Mehr Leitungen, eine Chip-Select-Leitung je Gerät'],
    ]],
    ['h', 'Elektrotechnik-Grundlagen für Rechenaufgaben'],
    ['kv', [
      ['Ohmsches Gesetz', '**U = R · I**. Spannung in Volt (V) = Widerstand in Ohm (Ω) mal Strom in Ampere (A).'],
      ['Elektrische Leistung', '**P = U · I** (Watt). Mit dem Ohmschen Gesetz auch P = I² · R oder P = U² / R.'],
      ['Ladung / Kapazität', '**Q = I · t**. 2 A über 1,5 h = 3 Ah = 3000 mAh. Akkukapazität wird in mAh angegeben.'],
      ['Energie', '**E = P · t**. 450 W über 8760 h = 3942 kWh pro Jahr. Kosten = E · Preis pro kWh.'],
    ]],
    ['ex', ['Winter 2024/25: Messwiderstand R10 = 1 Ω, Strom 2 A.', 'Spannung: U = R · I = 1 Ω · 2 A = **2 V**.', 'Verlustleistung: P = U · I = 2 V · 2 A = **4 W**.']],
    ['ex', ['Winter 2024/25: Kapazität aus Messreihe berechnen. Strom wird alle 500 ms gemessen: 1,0 A, 1,0 A, 0,9 A, 0,8 A.', 'Teilkapazität je Intervall = I · Δt. Summe I = 3,7 A, Δt = 500 ms = 0,5 s -> Q = 3,7 A · 0,5 s = 1,85 As.', 'Umrechnung in mAh: 1 Ah = 3600 As -> 1,85 As / 3600 = 0,000514 Ah = **0,514 mAh**. Allgemein: mAh = Summe(I in A) · Intervall in ms / 3600.']],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Erläutern Sie die Angabe 9600 in `Serial.begin(9600);` und ihre Bedeutung für einen angeschlossenen PC.', ['9600 ist die **Übertragungsgeschwindigkeit in Bit pro Sekunde (Baudrate)** der seriellen Schnittstelle.', 'Der PC muss für seinen seriellen Port (zum Beispiel im Terminalprogramm) **denselben Wert** einstellen, sonst ist keine fehlerfreie Kommunikation möglich.'], 3],
    ['qa', 'Ein Rückgabewert enthält in Bit 0 bis 3 Fehlerflags von vier Sensoren und darüber den Mittelwert. Der Wert ist 58. Welcher Mittelwert, welche Sensoren melden Fehler?', ['58 = 0011 1010.', 'Untere 4 Bit: 1010 -> Bit 1 (Wertigkeit 2) und Bit 3 (Wertigkeit 8) gesetzt -> **Sensor 2 und Sensor 4** weichen ab.', 'Obere Bits: 58 >> 4 = 0011 = **3** (oder 58 // 16 = 3).'], 4],
    ['qa', 'Wandeln Sie die MAC-Adresse-Gruppe `3C` und die Zahl 172 jeweils in die anderen zwei Zahlensysteme um.', ['`0x3C` = 0011 1100 = 32 + 16 + 8 + 4 = **60**.', '172 = 128 + 32 + 8 + 4 = **1010 1100** = **0xAC**.'], 4],
    ['quiz', [
      {q: 'Wie viele Bit stellt eine Hexadezimalziffer dar?', o: ['4', '8', '2', '16'], a: 0, e: 'Zwei Hex-Ziffern = 1 Byte.'},
      {q: 'Was ergibt 13 << 1?', o: ['26', '6', '14', '12'], a: 0, e: 'Linksschieben um 1 = mal 2.'},
      {q: 'Wie prüft man, ob das unterste Bit von x gesetzt ist?', o: ['x & 1', 'x | 1', 'x << 1', '~x'], a: 0, e: 'Ergebnis 1 = gesetzt, 0 = nicht gesetzt.'},
      {q: 'Ein 10-Bit-Wandler misst 0 bis 5 V. Ungefähre Auflösung?', o: ['4,9 mV', '0,5 V', '50 mV', '19,6 mV'], a: 0, e: '5 V / 1023 ≈ 4,9 mV.'},
      {q: 'Welche Spannung liegt an 4 Ω bei 0,5 A?', o: ['2 V', '8 V', '0,125 V', '4,5 V'], a: 0, e: 'U = R · I.'},
      {q: 'Welche Schnittstelle adressiert mehrere Sensoren über nur zwei Leitungen?', o: ['I²C', 'SPI', 'USB', 'VGA'], a: 0, e: 'SDA und SCL.'},
    ]],
    ['see', ['eua-iot', 'eua-datentypen', 'infra-usv']],
  ],
});
