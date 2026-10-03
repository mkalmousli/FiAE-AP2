AP2.page('infra-firewall', {
  b: 'infra', g: 'IT-Sicherheit', t: 'Firewall, DMZ und Zero Trust',
  d: 'Eine **Firewall** kontrolliert den Netzwerkverkehr zwischen Netzen anhand von **Regeln** (Quelle, Ziel, Protokoll, Port, Aktion). Grundprinzip: **Alles verbieten, was nicht ausdrücklich erlaubt ist (Default Deny)**. **Zero Trust** geht weiter: **Niemandem und nichts wird automatisch vertraut**, jede Anfrage wird geprüft ("never trust, always verify").',
  m: 'Firewall-Regeln werden **von oben nach unten** geprüft, **die erste passende gewinnt**; am Ende steht **Deny all**. **DMZ = "entmilitarisierte Zone"**: Server mit Internetzugriff getrennt vom internen Netz. **Zero Trust: Vertraue nie, prüfe immer, vergib minimale Rechte, nimm an, dass du bereits gehackt bist.**',
  cheat: [
    ['Firewall-Typen', ['**Paketfilter (stateless):** prüft jedes Paket einzeln (IP, Port)', '**Stateful Inspection:** merkt sich Verbindungen', '**Application-Layer / Proxy:** versteht Anwendungsprotokolle', '**Next-Generation (NGFW):** plus IPS, Anwendungserkennung, Benutzer']],
    ['Regelwerk', ['Regeln: Quelle, Ziel, Protokoll, Port, **Aktion** (Allow/Deny)', 'Reihenfolge entscheidet, **erste Übereinstimmung gilt**', '**Default Deny** als letzte Regel', 'Spezifisch vor allgemein']],
    ['DMZ', ['Pufferzone zwischen Internet und LAN', 'Öffentliche Server (Web, Mail, Proxy)', '**Zwei Firewalls** oder dreibeinige Firewall', 'Kompromittierter DMZ-Server kommt nicht direkt ins LAN']],
    ['Zero Trust', ['**Never trust, always verify**', '**Least Privilege**', '**Assume breach** (Angriff annehmen)', 'Mikrosegmentierung, MFA, Geräteprüfung', 'Gegenstück zum klassischen **Perimeter-Schutz** (Burg und Graben)']],
  ],
  blocks: [
    ['h', 'Was macht eine Firewall?'],
    ['p', 'Die Firewall ist der **Türsteher** des Netzes. Sie sitzt zwischen zwei Netzen (zum Beispiel Internet und Firmennetz) und prüft jedes Datenpaket anhand von **Regeln**. Erlaubte Pakete werden durchgelassen, andere **verworfen (Drop)** oder **abgelehnt (Reject)**. Firewalls gibt es als **Hardware-Gerät** (Netzwerk-Firewall), als **Software** auf einem Rechner (**Host-Firewall**, zum Beispiel Windows Defender Firewall) und als Dienst in der Cloud.'],
    ['table', ['Typ', 'Funktion', 'Schicht', 'Stärken / Schwächen'], [
      ['**Paketfilter** (stateless)', 'Prüft **jedes Paket einzeln** nach IP-Adresse, Port, Protokoll', '3 und 4', 'Schnell und einfach; kennt keinen Verbindungszustand, leicht zu umgehen'],
      ['**Stateful Inspection**', 'Merkt sich **Verbindungen** (Zustand). Antworten auf erlaubte Anfragen werden automatisch zugelassen', '3 und 4', 'Standard heute; sicherer als reiner Paketfilter'],
      ['**Application Layer Firewall / Proxy**', 'Versteht Anwendungsprotokolle (HTTP, SMTP), kann Inhalte prüfen', '7', 'Sehr genau; langsamer, höherer Aufwand'],
      ['**Next-Generation Firewall (NGFW)**', 'Stateful plus Anwendungserkennung, **IPS**, Benutzeridentität, TLS-Inspektion, Malware-Schutz', '3 bis 7', 'Umfassend; teurer und komplex'],
      ['**WAF** (Web Application Firewall)', 'Schützt Webanwendungen vor Angriffen wie **SQL-Injection** und **XSS**', '7', 'Spezialisiert auf HTTP'],
    ]],
    ['h', 'Regeln aufbauen'],
    ['p', 'Jede Regel enthält **Quelle, Ziel, Protokoll, Port und Aktion**. Die Regeln werden **von oben nach unten** abgearbeitet. **Die erste passende Regel entscheidet.** Am Ende steht immer **Deny all** (alles andere verbieten).'],
    ['table', ['Nr.', 'Quelle', 'Ziel', 'Protokoll / Port', 'Aktion', 'Zweck'], [
      ['1', 'Internet (beliebig)', 'Webserver in der DMZ (203.0.113.10)', 'TCP 443', '**Allow**', 'HTTPS-Zugriff auf die Webseite'],
      ['2', 'Internet (beliebig)', 'Mailserver DMZ', 'TCP 25', '**Allow**', 'Eingehende E-Mail'],
      ['3', 'LAN 192.168.10.0/24', 'Internet', 'TCP 80, 443', '**Allow**', 'Mitarbeiter surfen'],
      ['4', 'LAN 192.168.10.0/24', 'DNS-Server 192.168.10.5', 'UDP/TCP 53', '**Allow**', 'Namensauflösung'],
      ['5', 'DMZ', 'LAN', 'beliebig', '**Deny**', 'DMZ darf nicht ins interne Netz'],
      ['6', 'beliebig', 'beliebig', 'beliebig', '**Deny**', 'Default Deny: alles Übrige verbieten'],
    ]],
    ['warn', 'Reihenfolge ist wichtig! Würde die Regel "alles erlauben" vor den Verboten stehen, wären diese wirkungslos. Allgemeine Regeln stehen **unten**, spezielle **oben**. Auch gilt **Default Deny**: Nur was ausdrücklich erlaubt wird, ist erlaubt.'],
  ],
});
