AP2.add('infra-ports', [
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Ordnen Sie die Standardports zu: a) HTTPS, b) SSH, c) DNS, d) SMTP, e) DHCP-Server.', ['- a) HTTPS: **443**', '- b) SSH: **22**', '- c) DNS: **53**', '- d) SMTP: **25** (Submission 587)', '- e) DHCP-Server: **67** (Client 68)'], 5],
  ['qa', 'Erklären Sie den Unterschied zwischen POP3 und IMAP.', ['**POP3** holt E-Mails vom Server ab und löscht sie dort meist. Die Mails liegen nur noch auf dem abrufenden Gerät.', '**IMAP** belässt die Mails auf dem Server und synchronisiert den Zustand (gelesen, Ordner) mit allen Geräten. Besser bei Nutzung mit mehreren Geräten.'], 4],
  ['qa', 'Ein Mitarbeiter gibt im Browser "www.firma.de" ein. Beschreiben Sie, welche Protokolle bis zur Darstellung der Seite beteiligt sind.', ['1. **DNS** löst den Namen in eine IP-Adresse auf (UDP, Port 53).', '2. **TCP** baut eine Verbindung zum Server auf (Handshake, Port 443 bei HTTPS).', '3. Bei HTTPS: **TLS-Handshake** zur Verschlüsselung und Serverauthentifizierung.', '4. **HTTP** sendet die Anfrage (GET), der Server antwortet mit Status 200 und der Seite.', 'Davor hat das Gerät per **DHCP** seine IP-Konfiguration erhalten und per **ARP** die MAC-Adresse des Gateways erfragt.'], 6],
  ['qa', 'Ein neu angeschlossener PC hat die Adresse 169.254.12.7. Was ist die wahrscheinliche Ursache?', 'Der PC hat keinen **DHCP-Server** erreicht und sich selbst eine Adresse aus dem **APIPA-Bereich** (169.254.0.0/16) vergeben. Mögliche Ursachen: DHCP-Server ausgefallen, Verbindung zum Netz gestört (Kabel, Switchport, VLAN) oder DHCP-Bereich erschöpft.', 4],
  ['qa', 'Was ist ODBC und welchen Vorteil bietet es?', 'ODBC ist eine standardisierte Schnittstelle für den Zugriff auf Datenbanken. Die Anwendung nutzt nur die ODBC-API, der ODBC-Treiber übersetzt in die datenbankspezifische Sprache. Vorteil: **Unabhängigkeit vom Datenbankhersteller**, die Datenbank kann gewechselt werden, ohne die Anwendung zu ändern.', 4],
  ['quiz', [
    {q: 'Welches Protokoll vergibt automatisch IP-Adressen?', o: ['DHCP', 'DNS', 'HTTP', 'FTP'], a: 0, e: 'DHCP verteilt IP-Konfigurationen automatisch.'},
    {q: 'Welcher HTTP-Statuscode bedeutet "nicht gefunden"?', o: ['404', '200', '500', '301'], a: 0, e: '404 Not Found.'},
    {q: 'Welches Protokoll ersetzt das unsichere Telnet?', o: ['SSH', 'FTP', 'HTTP', 'DHCP'], a: 0, e: 'SSH bietet verschlüsselte Fernwartung.'},
    {q: 'Welches Transportprotokoll nutzt DNS standardmäßig für Abfragen?', o: ['UDP (Port 53)', 'Nur TCP', 'ICMP', 'ARP'], a: 0, e: 'DNS-Abfragen laufen meist über UDP, bei großen Antworten und Zonentransfers über TCP.'},
    {q: 'Welcher DNS-Eintrag verweist auf den Mailserver einer Domain?', o: ['MX', 'A', 'PTR', 'AAAA'], a: 0, e: 'MX = Mail Exchanger.'},
    {q: 'Was bedeutet ein 5xx-Statuscode?', o: ['Fehler auf Serverseite', 'Fehler des Clients', 'Erfolg', 'Weiterleitung'], a: 0, e: '5xx: Serverfehler. 4xx: Clientfehler.'},
  ]],
]);
