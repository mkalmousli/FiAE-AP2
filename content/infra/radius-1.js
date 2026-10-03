AP2.page('infra-radius', {
  b: 'infra', g: 'Netzwerke', t: 'Zugriffskontrolle im Netzwerk: RADIUS und Kerberos',
  d: '**Authentifizierung** prüft, **wer** jemand ist, **Autorisierung** legt fest, **was** er darf, **Accounting** protokolliert, **was** er getan hat (zusammen: **AAA**). **RADIUS** ist ein zentraler Authentifizierungsserver für Netzwerkzugänge (WLAN, VPN, Switch-Ports, **IEEE 802.1X**). **Kerberos** ist ein Ticketsystem für **Single Sign-On** in Windows-Domänen.',
  m: '**AAA: Authentication (Wer?), Authorization (Was darf er?), Accounting (Was hat er getan?).** **RADIUS = Türsteher für den Netzzugang** (Gerät fragt Server). **Kerberos = Eintrittskarten (Tickets)**: einmal anmelden, dann mit Tickets Dienste nutzen. Kerberos: **Port 88**, RADIUS: **UDP 1812/1813**.',
  cheat: [
    ['AAA', ['**Authentication:** Identität prüfen (Benutzer, Passwort, Zertifikat)', '**Authorization:** Rechte vergeben', '**Accounting:** Nutzung protokollieren (Zeit, Datenmenge)']],
    ['RADIUS', ['Zentraler **Authentifizierungsserver**', 'Client = **NAS** (Switch, WLAN-AP, VPN-Gateway)', 'UDP **1812** (Auth), **1813** (Accounting)', 'Basis für **802.1X** und WPA-Enterprise']],
    ['802.1X', ['**Supplicant:** Endgerät', '**Authenticator:** Switch/Access Point', '**Authentication Server:** RADIUS', 'Port bleibt gesperrt, bis Authentifizierung gelingt (**EAP**)']],
    ['Kerberos', ['Port **88**, Ticketbasiert, **Single Sign-On**', '**KDC** (Key Distribution Center): AS + TGS', '**TGT** (Ticket Granting Ticket), **Service Ticket**', 'Passwort wird nie übers Netz gesendet', '**Zeitsynchronisation** nötig (max. 5 Minuten Abweichung)']],
  ],
  blocks: [
    ['h', 'Das Problem'],
    ['p', 'In einer Firma haben hunderte Benutzer Zugriff auf WLAN, VPN, Server und Netzwerkports. Würde jeder Switch und Access Point seine **eigene Benutzerliste** pflegen, wäre das unübersichtlich und unsicher. Deshalb gibt es **zentrale Verfahren**: Benutzer werden an **einer** Stelle verwaltet (zum Beispiel Active Directory), und alle Geräte fragen dort nach.'],
    ['h', 'AAA: Authentifizierung, Autorisierung, Accounting'],
    ['table', ['Begriff', 'Frage', 'Beispiel'], [['**Authentication** (Authentifizierung)', 'Wer bist du?', 'Benutzername und Passwort, Zertifikat, Chipkarte'], ['**Authorization** (Autorisierung)', 'Was darfst du?', 'Zugriff nur auf VLAN 20, Gruppenmitglied "Entwicklung"'], ['**Accounting** (Abrechnung)', 'Was hast du getan?', 'Anmeldezeit, Datenvolumen, Protokolleintrag']]],
    ['h', 'RADIUS und 802.1X'],
    ['p', '**RADIUS** (Remote Authentication Dial-In User Service) ist ein zentraler Dienst. Netzwerkgeräte (**NAS**, Network Access Server) wie Switch, WLAN-Controller oder VPN-Gateway leiten Anmeldeversuche an den RADIUS-Server weiter und setzen dessen Entscheidung um (Zugang erlaubt oder nicht, zugewiesenes VLAN). Zusammen mit dem Standard **IEEE 802.1X** (portbasierte Zugriffskontrolle) und **EAP** (Extensible Authentication Protocol) entsteht **Network Access Control**.'],
    ['seq', {w: 760, actors: ['Supplicant (Laptop)', 'Authenticator (Switch / AP)', 'RADIUS-Server'], cap: 'Ablauf bei 802.1X: Der Port bleibt gesperrt, bis der RADIUS-Server den Zugang freigibt.', steps: [
      [0, 1, 'Verbindung (Port zunächst gesperrt)', 's'], [1, 0, 'EAP-Request: Identität?', 'r'], [0, 1, 'EAP-Response: Benutzer', 's'], [1, 2, 'RADIUS Access-Request', 's'], [2, 1, 'Access-Challenge (Zertifikat/Passwort-Prüfung)', 'r'], ['sep', 'Austausch bis zur Entscheidung'], [2, 1, 'Access-Accept (+ VLAN 20)', 'r'], [1, 0, 'EAP-Success: Port freigegeben', 'r'],
    ]}],
    ['procon', 'RADIUS / 802.1X', ['Zentrale Benutzerverwaltung, einmalige Pflege', 'Individueller Zugang statt gemeinsamem WLAN-Passwort', 'Dynamische VLAN-Zuweisung, Accounting, einfaches Sperren einzelner Benutzer', 'Skalierbar und für viele Gerätearten geeignet'], ['Zusätzliche Infrastruktur (Server, Zertifikate) und Fachwissen nötig', 'RADIUS-Server als Single Point of Failure (redundant auslegen!)', 'Konfigurationsaufwand für Endgeräte (Zertifikate)']],
  ],
});
