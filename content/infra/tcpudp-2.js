AP2.add('infra-tcpudp', [
  ['h', 'UDP: Schnell und schlank'],
  ['p', 'UDP schickt Daten einfach los (**Datagramme**), ohne Verbindungsaufbau, ohne Quittung, ohne Wiederholung. Der Header ist nur **8 Byte** groß (Quellport, Zielport, Länge, Prüfsumme). Ob Datagramme ankommen oder in welcher Reihenfolge, ist UDP egal. Das ist ideal, wenn **Geschwindigkeit wichtiger** ist als Vollständigkeit, oder wenn die **Anwendung** selbst für Zuverlässigkeit sorgt.'],
  ['table', ['Merkmal', 'TCP', 'UDP'], [
    ['Verbindung', 'Verbindungsorientiert (Handshake)', 'Verbindungslos'],
    ['Zuverlässigkeit', 'Zuverlässig (ACK, Wiederholung)', 'Nicht zuverlässig, keine Garantie'],
    ['Reihenfolge', 'Garantiert', 'Nicht garantiert'],
    ['Geschwindigkeit', 'Langsamer (mehr Overhead)', 'Schneller (wenig Overhead)'],
    ['Header', '20 Byte oder mehr', '8 Byte'],
    ['Datenstrom', 'Bytestrom (Segmente)', 'Einzelne Datagramme'],
    ['Typische Dienste', 'HTTP/HTTPS, FTP, SMTP, SSH, Datenbanken', 'DNS, DHCP, VoIP, Videostreaming, Online-Spiele, NTP, SNMP'],
    ['Broadcast / Multicast', 'Nicht möglich (nur 1 zu 1)', 'Möglich'],
  ]],
  ['procon', 'TCP gegenüber UDP', ['**TCP:** Daten kommen vollständig und in Reihenfolge an', '**TCP:** Fehlerbehandlung und Flusskontrolle eingebaut', '**UDP:** sehr geringe Verzögerung, ideal für Echtzeit', '**UDP:** weniger Rechenaufwand, Broadcast/Multicast möglich'], ['**TCP:** höherer Overhead und Latenz (Handshake, Quittungen)', '**TCP:** Wartezeit bei Paketverlust (Head-of-Line-Blocking)', '**UDP:** Daten können verloren gehen, die Anwendung muss damit umgehen', '**UDP:** keine Überlastkontrolle']],
  ['h', 'Sockets'],
  ['p', 'Ein **Socket** ist die Kombination aus **IP-Adresse und Port**, zum Beispiel `203.0.113.5:443`. Programme nutzen Sockets, um Daten zu senden und zu empfangen. Auf einem Server kann ein Port **nur von einem Programm** belegt werden. Zwei Dienste mit demselben Port führen zu einer Fehlermeldung ("Address already in use").'],
  ['code', 'python', `import socket

# Einfacher TCP-Server (hört auf Port 5000)
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)   # SOCK_STREAM = TCP
server.bind(("0.0.0.0", 5000))
server.listen()
conn, addr = server.accept()          # wartet auf Verbindung (Handshake)
daten = conn.recv(1024)
conn.sendall(b"Hallo Client")
conn.close()

# UDP-Datagramm senden (SOCK_DGRAM = UDP, kein connect nötig)
udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
udp.sendto(b"Hallo", ("192.168.1.10", 5001))`],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie den Drei-Wege-Handshake von TCP.', ['1. Der Client sendet ein **SYN**-Segment mit seiner Sequenznummer (Verbindungswunsch).', '2. Der Server antwortet mit **SYN-ACK**: Er bestätigt die Nummer des Clients und sendet seine eigene.', '3. Der Client bestätigt mit **ACK**. Die Verbindung ist aufgebaut und Daten können fließen.'], 4],
  ['qa', 'Für eine Videokonferenz wird UDP statt TCP genutzt. Begründen Sie das.', 'Bei Echtzeitübertragung zählt **geringe Verzögerung**. Ein verlorenes Bild oder Tonfragment ist weniger schlimm als eine verspätete Wiederholung, die den ganzen Strom aufhalten würde. UDP hat weniger Overhead, keine Wartezeit durch Wiederholungen und keinen Handshake. Die Anwendung kann kleine Verluste selbst ausgleichen.', 3],
  ['qa', 'Auf einem Server läuft ein Webserver auf Port 80. Warum startet ein zweiter Webserver auf demselben Port nicht?', 'Ein Port kann pro IP-Adresse und Protokoll nur von **einem Prozess** belegt werden (Server-Socket). Der zweite Prozess bekommt den Fehler "Address already in use". Lösung: anderen Port wählen (zum Beispiel 8080) oder eine zusätzliche IP-Adresse nutzen.', 3],
  ['quiz', [
    {q: 'Welcher Port wird standardmäßig für HTTPS genutzt?', o: ['443', '80', '21', '25'], a: 0, e: 'HTTPS nutzt TCP-Port 443, HTTP Port 80.'},
    {q: 'Welches Protokoll ist verbindungslos?', o: ['UDP', 'TCP', 'HTTP', 'SMTP'], a: 0, e: 'UDP baut keine Verbindung auf.'},
    {q: 'Wie lautet die richtige Reihenfolge des Drei-Wege-Handshakes?', o: ['SYN, SYN-ACK, ACK', 'ACK, SYN, FIN', 'SYN, ACK, FIN', 'FIN, ACK, SYN'], a: 0, e: 'Client SYN, Server SYN-ACK, Client ACK.'},
    {q: 'Wie viele Bit hat eine Portnummer?', o: ['16', '8', '32', '64'], a: 0, e: '16 Bit: Werte von 0 bis 65535.'},
    {q: 'Was bildet zusammen einen Socket?', o: ['IP-Adresse und Port', 'MAC-Adresse und IP', 'Domain und Passwort', 'Router und Switch'], a: 0, e: 'Ein Socket ist die Kombination aus IP-Adresse und Portnummer.'},
  ]],
]);
