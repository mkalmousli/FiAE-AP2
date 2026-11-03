// Prüfungsschwerpunkte, ausgewertet aus den alten Abschlussprüfungen (2022 bis 2026, AE: Planen, Algorithmen) und den
// Prüfungssimulationen im Buch "Prüfungsvorbereitung aktuell". Je Seite: Stufe (top|wichtig), Zahl der Prüfungstermine mit Treffer, Treffer im Buch.
// Die Auswertung zählt Stichwörter in den Aufgabentexten; WiSo-Altprüfungen lagen nicht vor, dort zählt das Buch.
(function () {
  AP2.hot = {"ps-scrum":["wichtig",0,9],"ps-vorgehen":["wichtig",1,9],"ps-klassen":["top",7,2],"ps-er":["wichtig",2,3],"ps-ermrm":["top",5,0],"ps-normalisierung":["wichtig",2,0],"ps-tom":["top",4,2],"ps-kostenarten":["top",2,0],"ps-tco":["wichtig",3,0],"ps-itsm":["top",4,2],"ps-ueberdeckung":["wichtig",0,3],"ps-netzplan":["wichtig",3,0],"ps-wireframe":["wichtig",0,9],"ps-architektur":["wichtig",0,3],"ps-struktogramm":["wichtig",4,0],"ps-kaufvertrag":["wichtig",3,0],"ps-lizenzen":["wichtig",2,0],"ps-angebot":["wichtig",4,0],"eua-oop":["top",7,54],"eua-saeulen":["wichtig",1,8],"eua-interface":["wichtig",1,6],"eua-konstruktor":["wichtig",2,1],"eua-sqlviews":["wichtig",0,8],"eua-sqler":["wichtig",3,0],"eua-listen":["wichtig",3,1],"eua-pseudocode":["wichtig",0,6],"eua-webapi":["wichtig",3,0],"eua-formate":["wichtig",4,0],"eua-datentypen":["top",2,17],"eua-kontroll":["wichtig",2,1],"eua-funktionen":["top",5,5],"eua-dateien":["wichtig",2,0],"eua-pruefziffer":["wichtig",0,6],"eua-html":["top",6,0],"eua-css":["wichtig",4,0],"eua-iot":["top",3,3],"eua-umlcode":["wichtig",2,5],"infra-ipv4":["top",7,0],"infra-vlsm":["top",6,0],"infra-ipv6sub":["wichtig",4,0],"infra-routing":["top",6,0],"infra-vlan":["wichtig",2,0],"infra-ethernet":["top",7,1],"infra-ipconfig":["wichtig",3,0],"infra-ports":["top",6,0],"infra-krypto":["top",3,15],"infra-tls":["wichtig",4,0],"infra-webauth":["wichtig",3,1],"infra-cia":["top",7,0],"infra-grundschutz":["top",5,0],"infra-raid":["wichtig",2,0],"infra-virtualisierung":["top",3,8],"infra-storage":["top",7,20],"infra-server":["top",7,1],"infra-wlan":["top",4,2],"infra-voip":["wichtig",2,1],"infra-verfuegbarkeit":["top",5,0],"infra-firewall":["top",5,0],"infra-vpn":["wichtig",2,1],"infra-angriffe":["wichtig",4,0],"infra-komponenten":["top",6,2],"wiso-jarbschg":["wichtig",4,1],"wiso-vertrag":["top",0,9],"wiso-kuendigung":["top",1,8],"wiso-urlaub":["wichtig",1,3],"wiso-tarif":["top",0,22],"wiso-gewerkschaft":["wichtig",0,5],"wiso-betriebsrat":["top",1,9],"wiso-kammern":["wichtig",0,3],"wiso-sv":["top",0,7],"wiso-rv":["top",1,10],"wiso-kv":["wichtig",0,4],"wiso-pv":["wichtig",0,3],"wiso-alv":["wichtig",0,3],"wiso-uv":["wichtig",0,6],"wiso-gehalt":["wichtig",2,6],"wiso-markt":["top",0,11],"wiso-wirtschaftsordnung":["wichtig",0,3],"wiso-unternehmen":["top",1,127],"wiso-kooperation":["wichtig",0,4],"wiso-organisation":["wichtig",0,3],"wiso-fuehrung":["wichtig",0,3],"wiso-kennzahlen":["wichtig",0,3],"wiso-vollmacht":["top",0,21],"wiso-arbeitsschutz":["wichtig",0,3],"wiso-demografie":["wichtig",3,0],"wiso-eu":["wichtig",1,6],"wiso-staat":["wichtig",2,2],"wiso-weiterbildung":["wichtig",2,3],"wiso-methoden":["wichtig",3,0],"eua-sqlexam":["top",0,0],"eua-algoexam":["top",0,0],"eua-sqlselect":["top",0,0],"eua-sqljoin":["top",0,0],"eua-sqlgroup":["top",0,0],"eua-pap":["top",0,0],"eua-sortieren":["top",0,0],"ps-sequenz":["top",0,0],"ps-usecase":["top",0,2]};
  const {h} = AP2;
  AP2.hotLevel = (id) => (AP2.hot[id] ? AP2.hot[id][0] : '');
  AP2.hotText = (id) => {
    const x = AP2.hot[id];
    if (!x) return '';
    const bits = [];
    if (x[1]) bits.push('in ' + x[1] + ' Prüfungsterminen der alten Prüfungen');
    if (x[2]) bits.push(x[2] + ' Treffer in den Prüfungssimulationen');
    return (x[0] === 'top' ? 'Prüfungsschwerpunkt' : 'Wichtig für die Prüfung') + (bits.length ? ': ' + bits.join(', ') : '') + '.';
  };
  // Kleines Etikett für Seitenkopf und Listen.
  AP2.hotBadge = (id) => {
    const lv = AP2.hotLevel(id);
    if (!lv) return null;
    const el = h('span', {attrs: {title: AP2.hotText(id)}, style: {display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: AP2.S.fw.bold, textTransform: 'uppercase',
      letterSpacing: '0.05em', padding: '3px 8px', borderRadius: AP2.S.r.pill, border: '1px solid'}}, [AP2.icon('flame', 13), lv === 'top' ? 'Prüfungsschwerpunkt' : 'Prüfungsrelevant']);
    return AP2.theme.bind(el, (n, c) => { const col = lv === 'top' ? c.bad : c.accent; n.style.color = col; n.style.borderColor = col; n.style.backgroundColor = 'transparent'; });
  };
})();
