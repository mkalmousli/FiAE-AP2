AP2.page('infra-komponenten', {
  b: 'infra', g: 'Netzwerke', t: 'Netzwerkkomponenten (Switch, Router, Hub, Firewall)',
  d: 'Netzwerkkomponenten verbinden Geräte und Netze. Ein **Hub** (Schicht 1) sendet alles an alle. Ein **Switch** (Schicht 2) leitet Frames gezielt anhand der **MAC-Adresse**. Ein **Router** (Schicht 3) verbindet **verschiedene Netze** anhand der **IP-Adresse**. Eine **Firewall** filtert den Datenverkehr nach Regeln.',
  m: '**Hub = dumm (Schicht 1, "Verteiler"), Switch = klug (Schicht 2, MAC), Router = Wegweiser zwischen Netzen (Schicht 3, IP), Firewall = Türsteher (Regeln).** Switch trennt **Kollisionsdomänen**, Router trennt **Broadcastdomänen**.',
  cheat: [
    ['Hub / Repeater (L1)', ['**Hub:** wiederholt Signal an **alle** Ports', 'Eine Kollisionsdomäne, wenig Bandbreite', '**Repeater:** Signal verstärken', 'Heute veraltet']],
    ['Switch (L2)', ['Lernt **MAC-Adressen** (MAC-Tabelle)', 'Leitet Frames **nur an den Zielport**', 'Trennt Kollisionsdomänen', 'Mit **VLAN** auch Broadcastdomänen trennen']],
    ['Router (L3)', ['Verbindet **Netze** (verschiedene Subnetze)', 'Entscheidet per **Routingtabelle** anhand IP', 'Trennt Broadcastdomänen', 'Oft mit NAT, DHCP, Firewall']],
    ['Firewall / AP / Modem', ['**Firewall:** filtert Verkehr nach Regeln', '**Access Point:** WLAN-Zugang zum LAN', '**Modem:** wandelt Signale (DSL, Kabel)', '**Gateway:** Übergang zwischen Netzen/Protokollen']],
  ],
  blocks: [
    ['h', 'Die wichtigsten Geräte'],
    ['table', ['Gerät', 'OSI-Schicht', 'Adresse', 'Funktion', 'Besonderheit'], [
      ['**Repeater**', '1', '-', 'Verstärkt und regeneriert Signale, verlängert Strecken', 'Keine Intelligenz'],
      ['**Hub**', '1', '-', 'Sendet eingehende Signale an **alle** anderen Ports', 'Alle teilen die Bandbreite, Kollisionen, abhörbar'],
      ['**Bridge**', '2', 'MAC', 'Verbindet zwei Netzsegmente, filtert nach MAC', 'Vorläufer des Switches'],
      ['**Switch**', '2 (Layer-3-Switch: 3)', 'MAC', 'Leitet Frames gezielt zum Zielport', 'Jeder Port eigene Kollisionsdomäne, Vollduplex'],
      ['**Router**', '3', 'IP', 'Verbindet Netze, wählt den besten Weg (Routing)', 'Trennt Broadcastdomänen, NAT'],
      ['**Access Point**', '2', 'MAC', 'Verbindet WLAN-Geräte mit dem kabelgebundenen Netz', 'Funk-Hub/Switch'],
      ['**Firewall**', '3 bis 7', 'IP, Port, Anwendung', 'Erlaubt oder blockiert Verkehr nach Regeln', 'Paketfilter, Stateful, Proxy, Next-Gen'],
      ['**Modem**', '1', '-', 'Wandelt digitale Daten in Signale für Telefon-/Kabelleitung', 'Zugang zum Provider'],
      ['**Gateway**', 'bis 7', 'IP', 'Übergang zwischen unterschiedlichen Netzen oder Protokollen', 'Oft der Router als Default Gateway'],
    ]],
    ['h', 'Switch: Wie lernt er?'],
    ['p', 'Ein Switch führt eine **MAC-Adresstabelle** (CAM-Tabelle): Welche MAC-Adresse hängt an welchem Port? Er **lernt** sie, indem er bei jedem eingehenden Frame die **Quell-MAC** dem Eingangsport zuordnet. Für das **Ziel** schaut er in die Tabelle: Ist die MAC bekannt, wird der Frame **nur an diesen Port** gesendet (Unicast). Ist sie unbekannt oder ein Broadcast, geht der Frame an **alle Ports außer dem Eingangsport** (Flooding).'],
    ['seq', {w: 700, actors: ['PC A (MAC A)', 'Switch', 'PC B (MAC B)', 'PC C (MAC C)'], cap: 'Der Switch lernt MAC A am Port 1 und sendet den Frame zunächst an alle (Flooding). Nach der Antwort von B kennt er auch B.', steps: [
      [0, 1, 'Frame an B (Quelle A)', 's'], ['note', 1, 'lernt: A an Port 1; B unbekannt'], [1, 2, 'Frame (Flooding)', 's'], [1, 3, 'Frame (Flooding)', 's'], [2, 1, 'Antwort an A (Quelle B)', 'r'], ['note', 1, 'lernt: B an Port 3'], [1, 0, 'Antwort (nur Port 1)', 'r'],
    ]}],
    ['h', 'Kollisionsdomäne und Broadcastdomäne'],
    ['kv', [
      ['Kollisionsdomäne', 'Bereich, in dem Geräte ein Medium teilen und Signale **kollidieren** können. Hub: alle Ports eine Domäne. Switch: **jeder Port eine eigene**. Heute durch Vollduplex bedeutungslos.'],
      ['Broadcastdomäne', 'Bereich, den ein **Broadcast** erreicht. Switch (ohne VLAN): ein gemeinsames Netz. **Router** und **VLANs** trennen Broadcastdomänen. Je kleiner, desto weniger Broadcast-Last.'],
    ]],
  ],
});
