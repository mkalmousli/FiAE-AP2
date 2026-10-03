AP2.add('infra-radius', [
  ['h', 'Kerberos: Single Sign-On mit Tickets'],
  ['p', 'Kerberos wird in **Windows-Domänen (Active Directory)** und vielen Unix-Umgebungen verwendet. Der Benutzer meldet sich **einmal** an und bekommt ein **Ticket**, mit dem er sich danach bei vielen Diensten ausweisen kann, **ohne sein Passwort erneut einzugeben oder zu übertragen** (Single Sign-On, SSO). Eine vertrauenswürdige dritte Stelle, das **KDC (Key Distribution Center)**, verteilt die Tickets.'],
  ['kv', [
    ['KDC', 'Key Distribution Center, besteht aus dem **Authentication Service (AS)** und dem **Ticket Granting Service (TGS)**. Beim Domänencontroller.'],
    ['TGT', 'Ticket Granting Ticket: Der "Generalausweis" nach der Anmeldung, zeitlich begrenzt (meist 10 Stunden).'],
    ['Service Ticket', 'Ticket für einen **bestimmten Dienst** (zum Beispiel Dateiserver). Wird mit dem TGT beim TGS angefordert.'],
    ['Realm / Principal', 'Realm = Kerberos-Bereich (Domäne), Principal = Benutzer oder Dienst.'],
    ['Zeitstempel', 'Tickets enthalten Zeitstempel. Uhren müssen synchron sein (Standard: höchstens **5 Minuten** Abweichung), sonst Fehler.'],
  ]],
  ['seq', {w: 760, actors: ['Benutzer / Client', 'KDC (AS und TGS)', 'Dateiserver'], cap: 'Kerberos in drei Schritten: TGT holen, Service Ticket holen, Dienst nutzen. Das Passwort selbst wird nie gesendet.', steps: [
    [0, 1, '1. Anmeldung: Benutzername (AS-REQ)', 's'], [1, 0, '2. TGT + Sitzungsschlüssel (AS-REP)', 'r'], ['sep', 'Ab jetzt: Single Sign-On'], [0, 1, '3. Ich möchte Dateiserver (TGT, TGS-REQ)', 's'], [1, 0, '4. Service Ticket (TGS-REP)', 'r'], [0, 2, '5. Service Ticket vorzeigen (AP-REQ)', 's'], [2, 0, '6. Zugriff erlaubt (AP-REP)', 'r'],
  ]}],
  ['table', ['Merkmal', 'RADIUS', 'Kerberos'], [
    ['Zweck', 'Zugang zum **Netzwerk** (WLAN, VPN, Port)', 'Zugang zu **Diensten** in der Domäne (Single Sign-On)'],
    ['Wer fragt den Server?', 'Das **Netzwerkgerät** (NAS) stellvertretend', 'Der **Client** direkt'],
    ['Prinzip', 'Anfrage-Antwort mit Zugriffsentscheidung', 'Tickets, symmetrische Schlüssel, Dritter (KDC)'],
    ['Port / Transport', 'UDP 1812 (Auth), 1813 (Accounting)', 'Port 88 (TCP und UDP)'],
    ['Typischer Einsatz', 'WLAN-Enterprise, 802.1X, VPN', 'Windows Active Directory'],
  ]],
  ['kv', [
    ['LDAP', 'Protokoll für **Verzeichnisdienste** (Port 389, LDAPS 636). Speichert Benutzer, Gruppen, Geräte. RADIUS-Server und Anwendungen fragen LDAP/AD nach Benutzerdaten.'],
    ['Active Directory (AD)', 'Verzeichnisdienst von Microsoft: nutzt **LDAP** für Daten und **Kerberos** für Authentifizierung.'],
    ['TACACS+', 'Ähnlich wie RADIUS, aber für die **Administration von Netzwerkgeräten** (Zugriff auf Router-Konsole), trennt AAA sauberer, TCP-basiert, verschlüsselt den gesamten Inhalt.'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Was bedeutet AAA im Zusammenhang mit der Zugriffskontrolle? Erklären Sie die drei Begriffe.', ['- **Authentication:** Feststellen der Identität (zum Beispiel Benutzername und Passwort).', '- **Authorization:** Zuweisung der Rechte (welche Ressourcen darf der Benutzer nutzen?).', '- **Accounting:** Protokollierung der Nutzung (wann, wie lange, welche Daten).'], 3],
  ['qa', 'Ein Unternehmen betreibt ein WLAN mit einem gemeinsamen Passwort für alle Mitarbeiter. Beim Ausscheiden eines Mitarbeiters müsste das Passwort geändert werden. Welche Lösung schlagen Sie vor?', 'Ein **WPA2/WPA3-Enterprise-WLAN mit 802.1X und RADIUS-Server**. Jeder Mitarbeiter authentifiziert sich mit eigenen Zugangsdaten (oder Zertifikat). Beim Ausscheiden wird nur sein Konto gesperrt. Zusätzlich sind Autorisierung (VLAN-Zuweisung) und Protokollierung (Accounting) möglich.', 4],
  ['qa', 'Warum ist bei Kerberos die Zeitsynchronisation wichtig?', 'Kerberos-Tickets enthalten **Zeitstempel** und eine begrenzte **Gültigkeit**, um Wiederverwendung (Replay-Angriffe) zu verhindern. Weichen die Uhren von Client und KDC um mehr als die erlaubte Toleranz (meist 5 Minuten) ab, werden Tickets abgelehnt und die Anmeldung schlägt fehl. Deshalb wird die Zeit zum Beispiel per **NTP** synchronisiert.', 4],
  ['quiz', [
    {q: 'Welchen Standardport nutzt Kerberos?', o: ['88', '1812', '443', '389'], a: 0, e: 'Kerberos: Port 88. RADIUS: 1812/1813. LDAP: 389.'},
    {q: 'Wofür steht das zweite A in AAA?', o: ['Authorization', 'Authentication', 'Accounting', 'Availability'], a: 0, e: 'Es ist Authentication - Authorization - Accounting. Das zweite A ist Authorization.'},
    {q: 'Welche Komponente wartet bei 802.1X auf die Entscheidung des RADIUS-Servers?', o: ['Authenticator (Switch oder Access Point)', 'Der Drucker', 'Das Kabel', 'Der Browser'], a: 0, e: 'Der Authenticator hält den Port gesperrt, bis der RADIUS-Server zugestimmt hat.'},
    {q: 'Was ist ein TGT bei Kerberos?', o: ['Ein Ticket, mit dem weitere Service-Tickets angefordert werden', 'Ein Verschlüsselungsverfahren', 'Ein Netzwerkkabel', 'Ein Passwort-Manager'], a: 0, e: 'Das Ticket Granting Ticket erhält man nach der Anmeldung und nutzt es für Service-Tickets.'},
  ]],
]);
