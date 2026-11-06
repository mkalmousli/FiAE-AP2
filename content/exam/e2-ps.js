// Probeprüfung 2, Planen eines Softwareproduktes: VoltWerk GmbH, Plattform "VoltWerk Connect" (Ladesäulen und Photovoltaik).
(function () {
  const ID = 'exam2-ps';
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const R = [['R1', 'Schnittstelle des Ladepunkt-Herstellers ist schlecht dokumentiert', 40, 60000], ['R2', 'Ausfall des Cloud-Anbieters über mehrere Tage', 10, 150000], ['R3', 'Datenschutzprüfung verzögert den Start', 30, 40000],
    ['R4', 'Wichtige Entwicklerin fällt länger aus', 20, 90000], ['R5', 'Zahlungsdienst ändert seine Schnittstelle', 50, 8000]];
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 2 (Energie)', t: 'Softwareprodukt: Ladeplattform VoltWerk Connect', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.ps,
    hint: 'Realistischer Aufgabensatz im Format der AP2: 4 Handlungsschritte, je 25 Punkte, 90 Minuten. Erst alles selbst lösen. Dann die Musterlösung mit Diagrammen und Lösungsweg öffnen und ehrlich bewerten. Schwierige Wörter stehen im Wörterbuch ganz unten und bei den Aufgaben.',
    intro: [
      ['p', 'Sie arbeiten bei der **Softwarehaus Neckar GmbH** in Heilbronn. Ihr Kunde ist die **VoltWerk GmbH**. Sie betreibt **140 Ladesäulen** für Elektroautos an 12 Standorten und mehrere **Photovoltaikanlagen** (Solaranlagen auf Dächern).'],
      ['p', 'Ihr Team entwickelt die Plattform **VoltWerk Connect**. Sie überwacht Ladesäulen über das Internet der Dinge (IoT). Sie rechnet Ladevorgänge ab und meldet Störungen an den Service. Kunden starten Ladevorgänge mit einer **App**. Die Plattform läuft in einer Cloud.'],
      ['kv', [['Kunde', 'VoltWerk GmbH, Heilbronn, 85 Mitarbeitende, eigener Kundenservice'], ['Auftragnehmer', 'Softwarehaus Neckar GmbH, Projektteam mit 6 Personen'], ['Budget', '420.000 Euro, davon 15 % als Reserve für Risiken'], ['Laufzeit', '9 Monate, Start der App vor dem nächsten Sommer'], ['Technik', 'Ladepunkte mit OCPP-Schnittstelle, Backend in der Cloud, App für iOS und Android, Web-Dashboard für den Service']]],
    ],
    words: [['Stakeholder', 'Person oder Gruppe, die vom Projekt betroffen ist oder es beeinflusst'], ['Eintrittswahrscheinlichkeit', 'wie wahrscheinlich ein Risiko wirklich passiert (in Prozent)'], ['Schadenshöhe', 'was es kostet, wenn das Risiko passiert'], ['Reserve', 'Geld, das für Probleme zurückgelegt wird'],
      ['Ladepunkt', 'ein Stecker, an dem ein Auto lädt (eine Säule hat oft zwei)'], ['Zustandsdiagramm', 'zeigt, in welchen Zuständen etwas sein kann und was den Zustand wechselt'], ['Wächter', 'Bedingung in eckigen Klammern an einem Pfeil, z. B. [autorisiert]'], ['MVC', 'Aufteilung in Model (Daten), View (Anzeige) und Controller (Steuerung)'],
      ['Singleton', 'Muster: Es gibt von einer Klasse nur ein einziges Objekt'], ['Observer', 'Muster: Beobachter werden automatisch informiert, wenn sich etwas ändert'], ['Anweisungsüberdeckung', 'Testziel: Jede Zeile des Programms läuft mindestens einmal'], ['Zweigüberdeckung', 'Testziel: Jede Entscheidung war einmal wahr und einmal falsch'],
      ['Kontrollflussgraph', 'Zeichnung des Programmablaufs mit Knoten (Anweisungen) und Pfeilen (Wege)'], ['TOM', 'technische und organisatorische Maßnahmen zum Schutz von Daten'], ['AV-Vertrag', 'Vertrag, wenn eine Firma Daten im Auftrag einer anderen verarbeitet'], ['VLSM', 'Subnetze mit unterschiedlich großen Masken'],
      ['Next Hop', 'der nächste Router, an den ein Paket geschickt wird'], ['Reverse Proxy', 'Server vor den Servern: Er nimmt Anfragen aus dem Internet an und leitet sie weiter'], ['DMZ', 'Netz zwischen Internet und internem Netz für Server mit Zugriff von außen'], ['SSO', 'Single Sign-on: einmal anmelden, mehrere Dienste nutzen'], ['Token', 'digitaler Schlüssel mit begrenzter Gültigkeit']]});

  // Handlungsschritt 1
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Projekt vorbereiten (25 Punkte)',
    intro: 'Das Projekt VoltWerk Connect soll nach den Anforderungen der Geschäftsleitung in 9 Monaten abgeschlossen sein. Zu Beginn analysieren Sie die Beteiligten und die Risiken und wählen das Vorgehensmodell.',
    tasks: [
      {pts: 5, rows: 8, topic: 'Stakeholder', op: '**Zuordnen** heißt: jedes Element in die richtige Gruppe legen. Schreiben Sie zu jeder Gruppe kurz, was man tut.', hint: 'Vergleichen Sie Interesse und Einfluss mit der Grenze 3. Beide Werte hoch: eng einbinden. Nur Einfluss hoch: zufriedenstellen.',
        words: [['Einfluss', 'wie stark ein Stakeholder das Projekt steuern oder stoppen kann'], ['Interesse', 'wie wichtig das Projekt für den Stakeholder ist']],
        q: 'Anlage 1 zeigt die Stakeholder von VoltWerk Connect mit Bewertung von 1 (niedrig) bis 5 (hoch). a) Ordnen Sie jeden Stakeholder in eine Einfluss-Interesse-Matrix ein. Werte ab 3 gelten als hoch. b) Nennen Sie für den Betriebsrat eine konkrete Maßnahme der Kommunikation.',
        ctx: [['h3', 'Anlage 1: Stakeholder-Bewertung'], ['table', ['Stakeholder', 'Interesse', 'Einfluss'], [['Geschäftsleitung VoltWerk', '5', '5'], ['Kundenservice-Team', '5', '2'], ['Betriebsrat', '3', '4'], ['Hersteller der Ladepunkte (Firmware)', '2', '4'], ['Cloud-Anbieter', '2', '3'], ['Endkunden (App-Nutzer)', '4', '2'], ['Datenschutzaufsicht des Landes', '1', '5'], ['Netzbetreiber', '1', '2']]]],
        a: [['table', ['Quadrant', 'Regel', 'Stakeholder', 'Strategie'], [['hoher Einfluss, hohes Interesse', 'beide Werte ab 3', 'Geschäftsleitung, Betriebsrat', '**eng einbinden**, aktiv beteiligen'], ['hoher Einfluss, geringes Interesse', 'Einfluss ab 3, Interesse unter 3', 'Hersteller, Cloud-Anbieter, Datenschutzaufsicht', '**zufriedenstellen**, früh und knapp informieren'], ['geringer Einfluss, hohes Interesse', 'Einfluss unter 3, Interesse ab 3', 'Kundenservice, Endkunden', '**informieren**, Feedback einholen'], ['geringer Einfluss, geringes Interesse', 'beide unter 3', 'Netzbetreiber', '**beobachten**, wenig Aufwand']]],
          'b) Zum Beispiel: Der Betriebsrat erhält **vor dem Start** die Beschreibung der Auswertungen von Servicedaten und wird in einem **regelmäßigen Treffen** (alle 14 Tage) beteiligt. Wichtig: Mitbestimmung nach **§ 87 BetrVG**, weil die Plattform Leistung der Techniker auswerten könnte.',
          'Bewertung: a) je 2 richtige Zuordnungen 1 Punkt (4 P), b) 1 P. Eine Zuordnung zählt nur mit richtiger Gruppe.'],
        sol: [['diagram', {w: 780, h: 400, keep: 640, cap: 'Einfluss-Interesse-Matrix VoltWerk Connect', nodes: [
          {id: 'q1', k: 'box', x: 215, y: 100, w: 340, h: 150, t: ['zufriedenstellen', 'Hersteller, Cloud-Anbieter,', 'Datenschutzaufsicht'], s: 'gold'}, {id: 'q2', k: 'box', x: 575, y: 100, w: 340, h: 150, t: ['eng einbinden', 'Geschäftsleitung, Betriebsrat'], s: 'accent'},
          {id: 'q3', k: 'box', x: 215, y: 270, w: 340, h: 150, t: ['beobachten', 'Netzbetreiber'], s: 'soft'}, {id: 'q4', k: 'box', x: 575, y: 270, w: 340, h: 150, t: ['informieren', 'Kundenservice, Endkunden'], s: 'ok'},
          {id: 'x', k: 'text', x: 400, y: 378, t: 'Interesse  (links niedrig, rechts hoch)', w: 10, h: 10, mw: 500}, {id: 'y', k: 'text', x: 40, y: 190, t: 'Einfluss', w: 10, h: 10, mw: 60},
        ], edges: []}]],
        see: ['ps-stakeholder']},
      {pts: 7, rows: 10, topic: 'Risikoanalyse', op: '**Berechnen** heißt: Rechenweg zeigen. **Beurteilen** heißt: Ergebnis bewerten und eine Entscheidung begründen.', hint: 'Risikowert = Wahrscheinlichkeit mal Schaden. Zählen Sie alle Werte zusammen und vergleichen Sie mit der Reserve.',
        words: [['Risikowert', 'erwarteter Schaden: Wahrscheinlichkeit mal Schadenshöhe'], ['vorbeugend', 'es soll verhindern, dass das Risiko passiert']],
        q: 'Anlage 2 zeigt die Risikoliste des Projekts. a) Berechnen Sie den Risikowert jedes Risikos. b) Nennen Sie die Rangfolge und je eine vorbeugende Maßnahme für die zwei größten Risiken. c) Das Budget beträgt 420.000 Euro, davon 15 % Reserve. Beurteilen Sie, ob die Reserve für die Summe der Risikowerte reicht.',
        ctx: [['h3', 'Anlage 2: Risikoliste'], ['table', ['Nr.', 'Risiko', 'Wahrscheinlichkeit', 'Schadenshöhe'], R.map(([n, t, w, s]) => [n, t, w + ' %', fmt(s) + ' Euro'])]],
        a: ['a) Risikowert = Wahrscheinlichkeit x Schadenshöhe:', ['table', ['Nr.', 'Rechnung', 'Risikowert'], R.map(([n, t, w, s]) => [n, w / 100 + ' x ' + fmt(s), fmt(w * s / 100) + ' Euro'])],
          'b) Rangfolge: **R1 (24.000) vor R4 (18.000) vor R2 (15.000) vor R3 (12.000) vor R5 (4.000)**. Maßnahmen: R1: früher Prototyp gegen eine echte Säule und Supportzusage im Vertrag. R4: Wissen dokumentieren, Programmieren zu zweit, Vertretung benennen.',
          'c) Reserve = 15 % von 420.000 = **63.000 Euro**. Summe der Risikowerte = 24.000 + 15.000 + 12.000 + 18.000 + 4.000 = **73.000 Euro**. 73.000 > 63.000: Die Reserve ist um **10.000 Euro zu klein**. Die Summe ist aber nur ein Erwartungswert. Alle Risiken treffen wohl nicht zugleich ein. Trotzdem sollte man die großen Risiken verringern oder die Reserve erhöhen.',
          'Bewertung: a) 3 P (5 Werte, 3 richtig = 2 P), b) Rangfolge 1 P, Maßnahmen 2 P, c) Rechnung und Urteil 2 P (inkl. Begründung).'],
        sol: [['chart', {kind: 'bar', w: 700, h: 280, labels: ['R1', 'R4', 'R2', 'R3', 'R5'], series: [{n: 'Risikowert (Euro)', d: [24000, 18000, 15000, 12000, 4000], k: 'accent'}], vals: true, ymax: 28000, cap: 'Risikowerte nach Rangfolge: Die Summe 73.000 Euro liegt über der Reserve von 63.000 Euro'}],
          ['tip', 'Risikomatrix: Risiken mit hoher Wahrscheinlichkeit und hohem Schaden zuerst bearbeiten. R5 hat zwar 50 %, aber nur 8.000 Euro Schaden.']],
        see: ['ps-qm', 'ps-phasen']},
      {pts: 7, rows: 8, topic: 'V-Modell', op: '**Ordnen Sie zu** heißt: Pfeile oder Nummern, kein langer Text. **Nennen** heißt: nur Stichworte.', hint: 'Jede Phase links hat eine Teststufe rechts. Der Test prüft immer die Spezifikation der gleichen Höhe.',
        words: [['Spezifikation', 'genaue Beschreibung, was etwas tun soll'], ['Verifikation', 'Prüfung: Haben wir es richtig gebaut?'], ['Validierung', 'Prüfung: Haben wir das Richtige gebaut?']],
        q: 'Das Projekt wird nach dem V-Modell geplant. a) Ordnen Sie den vier Phasen der Anlage 3 die passende Teststufe zu. b) Nennen Sie zwei Vorteile und einen Nachteil des V-Modells für dieses Projekt.',
        ctx: [['h3', 'Anlage 3: Entwicklungsphasen (linker Ast des V-Modells)'], ['list', ['Anforderungsdefinition', 'Funktionaler Systementwurf', 'Technischer Systementwurf', 'Komponentenspezifikation']], ['p', 'Teststufen zur Auswahl: Abnahmetest, Systemtest, Integrationstest, Modultest (Komponententest).']],
        a: ['a) Anforderungsdefinition: **Abnahmetest**; Funktionaler Systementwurf: **Systemtest**; Technischer Systementwurf: **Integrationstest**; Komponentenspezifikation: **Modultest**. (4 P, je 1)',
          'b) Vorteile: klare Phasen und Dokumente (gut für Verträge); Tests werden früh mit der Spezifikation geplant; gute Nachvollziehbarkeit. Nachteil: Änderungen in späten Phasen sind teuer; wenig Rückmeldung vom Kunden während der Entwicklung. (3 P)'],
        sol: [['diagram', {w: 880, h: 360, keep: 700, cap: 'V-Modell: Links wird spezifiziert, rechts wird getestet. Waagerechte Pfeile zeigen, welcher Test welche Phase prüft.', nodes: [
          {id: 'l1', k: 'box', x: 130, y: 40, w: 210, h: 40, t: 'Anforderungsdefinition', s: 'accent'}, {id: 'l2', k: 'box', x: 220, y: 110, w: 230, h: 40, t: 'Funktionaler Systementwurf', s: 'accent'},
          {id: 'l3', k: 'box', x: 310, y: 180, w: 230, h: 40, t: 'Technischer Systementwurf', s: 'accent'}, {id: 'l4', k: 'box', x: 400, y: 250, w: 230, h: 40, t: 'Komponentenspezifikation', s: 'accent'}, {id: 'bt', k: 'box', x: 440, y: 320, w: 160, h: 36, t: 'Programmierung', s: 'solid'},
          {id: 'r4', k: 'box', x: 680, y: 250, w: 170, h: 40, t: 'Modultest', s: 'ok'}, {id: 'r3', k: 'box', x: 700, y: 180, w: 170, h: 40, t: 'Integrationstest', s: 'ok'}, {id: 'r2', k: 'box', x: 720, y: 110, w: 170, h: 40, t: 'Systemtest', s: 'ok'}, {id: 'r1', k: 'box', x: 740, y: 40, w: 170, h: 40, t: 'Abnahmetest', s: 'ok'},
        ], edges: [{a: 'l1', b: 'l2'}, {a: 'l2', b: 'l3'}, {a: 'l3', b: 'l4'}, {a: 'l4', b: 'bt'}, {a: 'bt', b: 'r4'}, {a: 'r4', b: 'r3'}, {a: 'r3', b: 'r2'}, {a: 'r2', b: 'r1'},
          {a: 'l1', b: 'r1', k: 'dash', ea: 'open'}, {a: 'l2', b: 'r2', k: 'dash', ea: 'open'}, {a: 'l3', b: 'r3', k: 'dash', ea: 'open'}, {a: 'l4', b: 'r4', k: 'dash', ea: 'open'}]}]],
        see: ['ps-verifikation', 'ps-vorgehen']},
      {pts: 4, topic: 'Scrum', op: '**Zuordnen** heißt: zu jeder Aussage das passende Wort wählen.', hint: 'Überlegen Sie: Wer entscheidet, was gebaut wird? Wer hilft dem Team? Was findet am Ende des Sprints statt?',
        q: 'Das Team der App arbeitet nach Scrum. Ordnen Sie den Aussagen den passenden Begriff zu.',
        match: {keys: ['Product Owner', 'Scrum Master', 'Entwicklungsteam', 'Sprint Review', 'Daily Scrum', 'Sprint Retrospektive'], items: [
          ['Sie legt fest, welche Funktionen zuerst gebaut werden, und pflegt das Product Backlog.', 0], ['Er beseitigt Hindernisse und achtet darauf, dass das Team die Scrum-Regeln einhält.', 1],
          ['Am Ende des Sprints zeigt das Team dem Kunden das fertige Inkrement und holt Rückmeldung.', 3], ['Das Team bespricht, was im Arbeitsablauf besser werden kann.', 5]]},
        a: ['- **Product Owner:** verantwortet das Backlog und die Prioritäten.', '- **Scrum Master:** unterstützt das Team und den Prozess.', '- **Sprint Review:** Vorführung des Ergebnisses mit dem Kunden.', '- **Sprint Retrospektive:** Rückblick auf die Zusammenarbeit.', 'Übrig bleiben **Entwicklungsteam** (baut das Inkrement) und **Daily Scrum** (15 Minuten Abstimmung jeden Tag).'],
        see: ['ps-scrum']},
      {pts: 2, topic: 'Vorgehensmodell wählen', op: '**Begründen** heißt: eine Entscheidung mit „weil“ erklären.', q: 'Die Firmware-Anbindung der Ladepunkte folgt festen Normen. Die App ändert sich oft nach Rückmeldungen der Nutzer. Begründen Sie, warum ein hybrides Vorgehen (V-Modell und Scrum) sinnvoll ist.',
        a: ['Die **Anbindung der Ladepunkte** hat feste, stabile Anforderungen (Normen, Verträge, Sicherheit). Hier passt das **V-Modell** mit klarer Dokumentation und festen Tests. (1 P)', 'Die **App** hat unklare, wechselnde Anforderungen. Hier passt **Scrum** mit kurzen Sprints und Rückmeldung der Nutzer, weil Änderungen früh und billig möglich sind. (1 P)'],
        see: ['ps-vorgehen', 'ps-scrum']},
    ],
  });

  // Handlungsschritt 2
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Abläufe und Architektur modellieren (25 Punkte)',
    intro: 'Für VoltWerk Connect werden das Verhalten der Ladepunkte, die Kommunikation zwischen App und Backend und die Architektur des Service-Dashboards entworfen.',
    tasks: [
      {pts: 8, rows: 10, topic: 'Zustandsdiagramm', op: '**Modellieren** heißt: ein Diagramm zeichnen. Nehmen Sie die Regeln der UML: Startpunkt, Zustände, Pfeile mit Ereignis, Endpunkt.', hint: 'Suchen Sie zuerst alle Zustände im Text. Dann suchen Sie für jeden Pfeil das Ereignis. Bedingungen schreiben Sie in eckige Klammern.',
        words: [['Ereignis', 'etwas, das passiert und den Zustand wechselt'], ['Wächter', 'Bedingung in [ ] an einem Pfeil'], ['Selbsttest', 'der Ladepunkt prüft sich selbst']],
        q: 'Modellieren Sie den Lebenszyklus eines **Ladepunkts** als UML-Zustandsdiagramm. Ein Ladepunkt ist zuerst **frei**. Ein Kunde kann ihn per App **reservieren** (Zustand reserviert). Läuft die Reservierung nach 15 Minuten ab oder wird sie storniert, ist er wieder frei. Steckt ein Kunde ein und ist er **autorisiert**, **lädt** der Ladepunkt (auch aus dem Zustand reserviert). Bei Ladeende wird abgerechnet und der Ladepunkt ist frei. Meldet ein Sensor einen **Fehler** (im Zustand frei oder lädt), ist er **gestört** und sendet eine Störungsmeldung. Der Service setzt ihn auf **Wartung**. Nach einem erfolgreichen Selbsttest ist er wieder frei, sonst wieder gestört. Aus der Wartung kann er außer Betrieb genommen werden. Dann endet der Lebenszyklus.',
        a: ['Start: gefüllter Punkt zum Zustand **Frei**. Ende: Kreis mit Punkt nach „außer Betrieb nehmen“ (aus Wartung).', '- Frei nach Reserviert: **reservieren**. Reserviert nach Frei: **Zeit abgelaufen oder storniert**.', '- Frei und Reserviert nach Lädt: **einstecken [autorisiert]**. Lädt nach Frei: **Ladeende** / Ladevorgang abrechnen.', '- Frei und Lädt nach Gestört: **Fehler erkannt** / Störungsmeldung senden.', '- Gestört nach Wartung: **Service vor Ort**. Wartung nach Frei: **Selbsttest [ok]**. Wartung nach Gestört: **Selbsttest [nicht ok]**.', 'Bewertung: Zustände 2 P, Start und Ende 1 P, Übergänge mit Ereignis 3 P, Wächter und Aktionen 2 P.'],
        sol: [['diagram', {w: 860, h: 500, keep: 700, cap: 'Musterlösung: Zustandsdiagramm Ladepunkt', nodes: [
          {id: 's', k: 'dot', x: 50, y: 210}, {id: 'f', k: 'round', x: 200, y: 210, t: 'Frei', w: 110, h: 44, s: 'ok'}, {id: 'r', k: 'round', x: 380, y: 70, t: 'Reserviert', w: 130, h: 44, s: 'accent'},
          {id: 'l', k: 'round', x: 600, y: 210, t: 'Lädt', w: 110, h: 44, s: 'accent'}, {id: 'g', k: 'round', x: 600, y: 390, t: 'Gestört', w: 120, h: 44, s: 'bad'},
          {id: 'w', k: 'round', x: 200, y: 390, t: 'Wartung', w: 120, h: 44, s: 'gold'}, {id: 'e', k: 'ring', x: 50, y: 390},
        ], edges: [{a: 's', b: 'f'}, {a: 'f', b: 'r', via: [[250, 120]], t: 'reservieren', lo: [-40, -6]}, {a: 'r', b: 'f', via: [[330, 160]], t: 'abgelaufen / storniert', lo: [60, 8]},
          {a: 'r', b: 'l', via: [[600, 70]], t: 'einstecken [autorisiert]'}, {a: 'f', b: 'l', via: [[400, 180]], t: 'einstecken [autorisiert]'}, {a: 'l', b: 'f', via: [[400, 245]], t: 'Ladeende / abrechnen'},
          {a: 'l', b: 'g', t: 'Fehler / Meldung senden', lo: [70, 0]}, {a: 'f', b: 'g', via: [[400, 330]], t: 'Fehler / Meldung senden'}, {a: 'g', b: 'w', t: 'Service vor Ort', lo: [0, -12]},
          {a: 'w', b: 'f', t: '[Selbsttest ok]', lo: [-62, 0]}, {a: 'w', b: 'g', via: [[400, 450]], t: '[Selbsttest nicht ok]'}, {a: 'w', b: 'e', t: 'außer Betrieb', lo: [0, -12]},
        ]}], ['warn', 'Häufiger Fehler: Aktionen (zum Beispiel „abrechnen“) als eigenen Zustand zeichnen. Ein Zustand ist eine Dauer, eine Aktion ist ein Moment auf einem Pfeil.']],
        see: ['ps-zustand']},
      {pts: 7, rows: 10, topic: 'Sequenzdiagramm', op: '**Entwerfen** heißt: eine Lösung planen und zeichnen. Ein Sequenzdiagramm hat Lebenslinien und Nachrichten von oben nach unten.', hint: 'Zeichnen Sie vier Lebenslinien. Gehen Sie den Text Satz für Satz durch. Ein „wenn“ wird ein alt-Fragment. „Regelmäßig“ wird eine Schleife.',
        words: [['Lebenslinie', 'senkrechte gestrichelte Linie für einen Teilnehmer'], ['Vorautorisierung', 'Betrag wird auf der Karte nur reserviert, noch nicht abgebucht'], ['alt-Fragment', 'Kasten für „entweder - oder“ im Sequenzdiagramm']],
        q: 'Entwerfen Sie ein UML-Sequenzdiagramm für den Start einer Ladung mit den Teilnehmern **Kunden-App**, **Backend**, **Ladepunkt** und **Zahlungsdienst**. Die App sendet startLadung. Das Backend fragt den Status des Ladepunkts ab und reserviert 50 Euro beim Zahlungsdienst. Wird die Zahlung abgelehnt, erhält die App eine Fehlermeldung und der Ablauf endet. Sonst gibt das Backend die Ladung am Ladepunkt frei und meldet der App „Ladung läuft“. Danach sendet der Ladepunkt **alle 60 Sekunden** den Zählerstand an das Backend. Stoppt der Kunde, beendet das Backend die Ladung und bucht den Endbetrag beim Zahlungsdienst ab.',
        a: ['Lebenslinien: App, Backend, Ladepunkt, Zahlungsdienst. Reihenfolge der Nachrichten wie im Text, Rückgaben gestrichelt.', '- **alt-Fragment** für „Zahlung abgelehnt“ oder „Zahlung ok“.', '- **loop-Fragment** [alle 60 s] für den Zählerstand (asynchrone Nachricht).', '- Am Ende: stopLadung, Endstand vom Ladepunkt, Endbetrag abbuchen.', 'Bewertung: Teilnehmer 1 P, Reihenfolge der Nachrichten 3 P, Rückgaben 1 P, alt 1 P, loop 1 P.'],
        sol: [['seq', {w: 860, actors: ['Kunden-App', 'Backend', 'Ladepunkt', 'Zahlungsdienst'], cap: 'Musterlösung: Start, Betrieb und Ende einer Ladung', steps: [
          [0, 1, 'startLadung(punktId)', 's'], [1, 2, 'Status abfragen', 's'], [2, 1, 'Status: frei', 'r'], [1, 3, '50 Euro vorab reservieren', 's'],
          ['sep', 'alt [Zahlung abgelehnt]'], [3, 1, 'abgelehnt', 'r'], [1, 0, 'Fehlermeldung', 'r'],
          ['sep', 'sonst [Zahlung ok]'], [3, 1, 'Reservierung ok', 'r'], [1, 2, 'Ladung freigeben', 's'], [2, 1, 'Freigabe bestätigt', 'r'], [1, 0, 'Ladung läuft', 'r'],
          ['sep', 'loop [alle 60 Sekunden]'], [2, 1, 'Zählerstand in kWh', 'a'], [1, 0, 'aktueller Stand', 'a'],
          ['sep', 'Ende [Kunde drückt Stopp]'], [0, 1, 'stopLadung()', 's'], [1, 2, 'Ladung beenden', 's'], [2, 1, 'Endstand', 'r'], [1, 3, 'Endbetrag abbuchen', 's']]}]],
        see: ['ps-sequenz']},
      {pts: 6, rows: 8, topic: 'MVC', op: '**Beschreiben** heißt: zeigen, wie etwas abläuft, in der richtigen Reihenfolge.', hint: 'Model = Daten und Regeln. View = Anzeige. Controller = nimmt Eingaben an und steuert. Die View soll nie direkt Daten ändern.',
        words: [['Entität', 'Klasse, die ein Ding aus der echten Welt beschreibt, z. B. Ladepunkt'], ['Repository', 'Klasse, die Daten aus der Datenbank holt und speichert']],
        q: 'Das Service-Dashboard wird nach dem MVC-Muster gebaut. a) Ordnen Sie die Klassen der Anlage 4 dem Model, der View oder dem Controller zu. b) Beschreiben Sie, was beim Klick auf „Als gestört markieren“ passiert.',
        ctx: [['h3', 'Anlage 4: Klassen des Dashboards'], ['table', ['Klasse', 'Aufgabe'], [['LadepunktTabelle', 'zeigt alle Ladepunkte mit Status in einer Liste'], ['StoerungController', 'nimmt Klicks des Service entgegen'], ['Ladepunkt', 'speichert Status und prüft, ob ein Statuswechsel erlaubt ist'], ['KartenAnsicht', 'zeigt Ladepunkte auf einer Karte'], ['LadepunktRepository', 'liest und schreibt Ladepunkte in der Datenbank'], ['StoerungsFormular', 'Eingabemaske für die Störungsart']]]],
        a: ['a) **Model:** Ladepunkt, LadepunktRepository. **View:** LadepunktTabelle, KartenAnsicht, StoerungsFormular. **Controller:** StoerungController. (3 P, je 2 richtige 1 P)',
          'b) Ablauf: 1. Der Service klickt in der **View**. 2. Der **Controller** nimmt das Ereignis an und liest die Eingabe. 3. Der Controller ruft im **Model** setStatus(gestört) auf; das Model prüft die Regel und speichert über das Repository. 4. Das Model meldet die Änderung (oder der Controller aktualisiert die View). 5. Die **View** zeigt den neuen Status. (3 P)'],
        sol: [['diagram', {w: 760, h: 270, keep: 600, cap: 'MVC: Der Controller steuert, das Model hält die Daten, die View zeigt sie an.', nodes: [
          {id: 'n', k: 'box', x: 130, y: 60, w: 190, h: 56, t: ['Benutzer', 'Service-Mitarbeiter'], s: 'soft'}, {id: 'v', k: 'box', x: 130, y: 210, w: 200, h: 56, t: ['View', 'Tabelle, Karte, Formular'], s: 'accent'},
          {id: 'c', k: 'box', x: 430, y: 60, w: 200, h: 56, t: ['Controller', 'StoerungController'], s: 'accent'}, {id: 'm', k: 'box', x: 430, y: 210, w: 200, h: 56, t: ['Model', 'Ladepunkt, Repository'], s: 'accent'}, {id: 'db', k: 'cyl', x: 660, y: 210, w: 80, h: 80, t: 'DB', s: 'soft'},
        ], edges: [{a: 'n', b: 'c', t: '1 Klick', ea: 'arrow'}, {a: 'c', b: 'm', t: '2 setStatus(gestört)'}, {a: 'm', b: 'v', t: '3 Änderung melden', k: 'dash', ea: 'open'}, {a: 'v', b: 'n', t: '4 neue Anzeige', k: 'dash', ea: 'open'}, {a: 'm', b: 'db', ea: 'arrow'}]}]],
        see: ['ps-architektur']},
      {pts: 4, rows: 5, topic: 'Entwurfsmuster', op: '**Erläutern** heißt: sagen, was es ist, und warum. Immer mit „weil“ oder einem Beispiel.', hint: 'Singleton: genau ein Objekt. Observer: ein Objekt sagt vielen anderen Bescheid.',
        words: [['Muster', 'bekannte Lösung für ein oft wiederkehrendes Problem'], ['Kopplung', 'wie stark Klassen voneinander abhängen']],
        q: 'a) Die Klasse Tarifverwaltung (Arbeitspreis je kWh) soll im ganzen System nur einmal vorhanden sein. Erläutern Sie, welches Entwurfsmuster passt, und wie es technisch gesichert wird. b) Dashboard, App und Abrechnung sollen sich bei einem Statuswechsel eines Ladepunkts automatisch aktualisieren. Erläutern Sie das passende Muster und einen Vorteil.',
        a: ['a) **Singleton:** Die Klasse hat einen **privaten Konstruktor**, ein **statisches Attribut** für die einzige Instanz und eine **statische Methode getInstance()**, die diese Instanz liefert. So können alle Klassen denselben Tarif lesen, ohne dass es widersprüchliche Kopien gibt. (2 P)', 'b) **Observer:** Der Ladepunkt ist das **Subjekt**. Dashboard, App und Abrechnung melden sich als **Beobachter** an. Bei jedem Statuswechsel ruft das Subjekt update() bei allen Beobachtern auf. Vorteil: **lose Kopplung**, neue Beobachter ohne Änderung der Klasse Ladepunkt. (2 P)'],
        sol: [['diagram', {w: 820, h: 270, keep: 640, cap: 'Observer: Das Subjekt kennt nur das Interface Beobachter.', nodes: [
          {id: 'lp', k: 'cls', x: 130, y: 80, w: 220, s: 'accent', t: {name: 'Ladepunkt (Subjekt)', attrs: ['- status: String', '- beobachter: List'], ops: ['+ anmelden(b: Beobachter)', '+ setStatus(s: String)']}},
          {id: 'bi', k: 'cls', x: 480, y: 80, w: 230, t: {name: ['«interface»', 'Beobachter'], ops: ['+ update(status: String)']}},
          {id: 'd', k: 'cls', x: 330, y: 220, w: 180, t: {name: 'Dashboard', ops: ['+ update(status)']}}, {id: 'ap', k: 'cls', x: 560, y: 220, w: 160, t: {name: 'AppAnzeige', ops: ['+ update(status)']}}, {id: 'ab', k: 'cls', x: 750, y: 220, w: 170, t: {name: 'Abrechnung', ops: ['+ update(status)']}},
        ], edges: [{a: 'lp', b: 'bi', ea: 'arrow', ta: '1', tb: '*'}, {a: 'd', b: 'bi', k: 'dash', ea: 'tri'}, {a: 'ap', b: 'bi', k: 'dash', ea: 'tri'}, {a: 'ab', b: 'bi', k: 'dash', ea: 'tri'}]}]],
        see: ['ps-architektur', 'eua-patterns']},
    ],
  });

  // Handlungsschritt 3
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Qualität sichern und Daten schützen (25 Punkte)',
    intro: 'Die Plattform soll hohe Qualität haben und Personendaten sicher verarbeiten. Sie planen Qualitätsziele, Tests und Datenschutzmaßnahmen.',
    tasks: [
      {pts: 6, topic: 'ISO 25010', op: '**Zuordnen** heißt: jede Aussage zu einem Qualitätsmerkmal legen. Jedes Merkmal passt zu höchstens einer Aussage.', hint: 'Fragen Sie: Geht es um Geschwindigkeit, Zusammenarbeit, Bedienung, Ausfall, Schutz oder Änderung?',
        words: [['Qualitätsmerkmal', 'Eigenschaft einer guten Software, z. B. schnell oder sicher'], ['Kompatibilität', 'Programme arbeiten gut mit anderen Systemen zusammen'], ['OCPP', 'Standard-Sprache zwischen Ladepunkt und Backend']],
        q: 'Ordnen Sie jeder Qualitätsanforderung das passende Qualitätsmerkmal nach ISO/IEC 25010 zu.',
        match: {keys: ['Funktionale Eignung', 'Leistungseffizienz', 'Kompatibilität', 'Gebrauchstauglichkeit', 'Zuverlässigkeit', 'Sicherheit', 'Wartbarkeit', 'Übertragbarkeit'], items: [
          ['Die App zeigt den Status eines Ladepunkts auch bei 5.000 gleichzeitigen Nutzern in unter 2 Sekunden.', 1], ['Das Backend tauscht Daten mit Ladepunkten verschiedener Hersteller über OCPP aus.', 2],
          ['Ein neuer Tarif kann durch Änderung einer einzigen Klasse eingeführt werden.', 6], ['Ein neuer Service-Mitarbeiter bedient den Störungsdialog ohne Schulung.', 3],
          ['Fällt ein Server aus, läuft die Plattform innerhalb von 60 Sekunden auf einem zweiten Server weiter.', 4], ['Zahlungsdaten sind verschlüsselt, und Rollen begrenzen den Zugriff.', 5]]},
        a: ['- Antwortzeit und Last: **Leistungseffizienz**. - Zusammenarbeit mit fremden Systemen: **Kompatibilität**. - Änderbarkeit: **Wartbarkeit**.', '- Bedienung ohne Schulung: **Gebrauchstauglichkeit**. - Ausfallschutz: **Zuverlässigkeit**. - Verschlüsselung und Rollen: **Sicherheit**.', 'Nicht gebraucht: **Funktionale Eignung** (tut die Software, was verlangt ist) und **Übertragbarkeit** (läuft sie auf anderen Plattformen).'],
        see: ['ps-softwarequalitaet']},
      {pts: 11, rows: 12, topic: 'Überdeckungstests', op: '**Ermitteln** heißt: durch Überlegen oder Rechnen herausfinden. Schreiben Sie Testfälle mit Eingabe und erwartetem Ergebnis.', hint: 'Zuerst jeden Block mit einem Buchstaben benennen. Dann Pfeile zeichnen. Bei jeder Entscheidung gibt es ja und nein.',
        words: [['Block', 'Anweisungen, die immer zusammen laufen'], ['Pfad', 'ein kompletter Weg durch das Programm von Anfang bis Ende'], ['Zyklomatische Zahl', 'Zahl der unabhängigen Wege: Entscheidungen plus 1']],
        q: 'Die Funktion ladeentgelt berechnet den Preis einer Ladung. a) Zeichnen Sie den Kontrollflussgraphen. Fassen Sie Zeile 1 und 2 zu Knoten A zusammen. b) Geben Sie Testfälle für 100 % Anweisungsüberdeckung und für 100 % Zweigüberdeckung an. Berechnen Sie das erwartete Ergebnis. c) Wie viele Pfade gibt es? Welche Testfälle brauchen Sie dafür? d) Berechnen Sie die zyklomatische Zahl V(G).',
        ctx: [['h3', 'Anlage 5: Funktion ladeentgelt'], ['code', 'pseudo', `funktion ladeentgelt(kwh, schnell, mitglied)
1    preis = kwh * 0,40
2    wenn schnell dann
3        preis = preis + 2,00
     ende wenn
4    wenn mitglied und preis > 10 dann
5        preis = preis * 0,90
     ende wenn
6    rückgabe preis
ende funktion`]],
        a: ['a) Knoten: **A** (Zeilen 1 und 2, Entscheidung), **B** (Zeile 3), **C** (Zeile 4, Entscheidung), **D** (Zeile 5), **E** (Zeile 6). Kanten: A-B (ja), A-C (nein), B-C, C-D (ja), C-E (nein), D-E. (4 P)',
          ['table', ['Testfall', 'kwh', 'schnell', 'mitglied', 'Weg', 'Erwartet'], [['T1', '30', 'ja', 'ja', 'A-B-C-D-E', '(12 + 2) x 0,9 = **12,60**'], ['T2', '10', 'nein', 'nein', 'A-C-E', '**4,00**'], ['T3', '10', 'ja', 'ja', 'A-B-C-E', '4 + 2 = **6,00** (6 nicht größer 10)'], ['T4', '30', 'nein', 'ja', 'A-C-D-E', '12 x 0,9 = **10,80**']]],
          'b) **Anweisungsüberdeckung:** T1 allein reicht (alle Knoten A bis E). **Zweigüberdeckung:** T1 und T2 reichen (jede Entscheidung ja und nein). (2 + 2 P)', 'c) Zwei unabhängige Entscheidungen: 2 x 2 = **4 Pfade**. Testfälle T1 bis T4. (2 P)', 'd) V(G) = Kanten - Knoten + 2 = 6 - 5 + 2 = **3**, oder Entscheidungen + 1 = 2 + 1 = 3. (1 P)'],
        sol: [['walk', {t: 'Von der Funktion zu den Tests', steps: [
          {t: '**Kontrollflussgraph:** Jeder Block ohne Verzweigung ist ein Knoten. Entscheidungen haben zwei Ausgänge. Der Zweig „schnell = nein“ umgeht Knoten B. Der Zweig „Rabatt = nein“ umgeht Knoten D.', b: [['diagram', {w: 560, h: 430, keep: 380, cap: 'Kontrollflussgraph von ladeentgelt (6 Kanten, 5 Knoten)', nodes: [
            {id: 'A', k: 'circle', x: 300, y: 40, t: 'A', w: 46, h: 46, s: 'accent'}, {id: 'B', k: 'circle', x: 150, y: 130, t: 'B', w: 46, h: 46}, {id: 'C', k: 'circle', x: 300, y: 220, t: 'C', w: 46, h: 46, s: 'accent'},
            {id: 'D', k: 'circle', x: 150, y: 310, t: 'D', w: 46, h: 46}, {id: 'E', k: 'circle', x: 300, y: 395, t: 'E', w: 46, h: 46, s: 'solid'},
          ], edges: [{a: 'A', b: 'B', t: 'ja', lo: [-14, -8]}, {a: 'A', b: 'C', t: 'nein', lo: [26, 0]}, {a: 'B', b: 'C'}, {a: 'C', b: 'D', t: 'ja', lo: [-14, -8]}, {a: 'C', b: 'E', t: 'nein', lo: [26, 0]}, {a: 'D', b: 'E'}]}]]},
          {t: '**Anweisungsüberdeckung:** Ein Testfall muss beide „ja“-Wege nehmen: T1 mit kwh 30, schnell ja, Mitglied ja. Preis: 30 x 0,40 = 12,00. Mit Zuschlag 14,00. Rabatt: 14,00 x 0,9 = 12,60.', b: [['table', ['Knoten', 'A', 'B', 'C', 'D', 'E'], [['von T1 besucht', 'ja', 'ja', 'ja', 'ja', 'ja']]]]},
          {t: '**Zweigüberdeckung:** Jede Kante muss einmal laufen. T1 deckt A-B, B-C, C-D, D-E. T2 deckt A-C und C-E. Zusammen sind alle 6 Kanten abgedeckt. Die Zweigüberdeckung ist **stärker** als die Anweisungsüberdeckung.', b: [['table', ['Kante', 'A-B', 'A-C', 'B-C', 'C-D', 'C-E', 'D-E'], [['T1', 'x', '', 'x', 'x', '', 'x'], ['T2', '', 'x', '', '', 'x', ''], ['Summe', 'x', 'x', 'x', 'x', 'x', 'x']]]]},
          {t: '**Pfadüberdeckung:** Es gibt 4 Wege. Achtung bei C: Die Bedingung „mitglied und preis > 10“ ist auch ohne Schnellzuschlag möglich (T4) oder durch den Preis falsch (T3). Mit 4 Testfällen ist jeder Weg einmal gelaufen.', b: [['table', ['Pfad', 'Weg', 'Testfall'], [['1', 'A-B-C-D-E', 'T1'], ['2', 'A-B-C-E', 'T3'], ['3', 'A-C-D-E', 'T4'], ['4', 'A-C-E', 'T2']]]]},
        ]}], ['merk', 'Rangfolge: Pfadüberdeckung enthält Zweigüberdeckung, diese enthält Anweisungsüberdeckung. Hohe Überdeckung heißt nicht, dass keine Fehler mehr da sind.']],
        see: ['ps-ueberdeckung', 'eua-testfaelle']},
      {pts: 8, rows: 10, topic: 'TOM', op: '**Nennen** heißt: kurz aufschreiben. **Erklären** heißt: sagen, warum etwas so ist.', hint: 'Jede TOM gehört zu einer Kontrollart. Schreiben Sie die Maßnahme so, dass sie zu VoltWerk Connect passt.',
        words: [['Kontrollart', 'Gruppe von Schutzmaßnahmen, z. B. Zutritt, Zugang, Zugriff'], ['personenbezogene Daten', 'Daten, die eine Person erkennbar machen (Name, E-Mail, Standort)'], ['Betroffene', 'die Personen, deren Daten verarbeitet werden']],
        q: 'Die App speichert Name, E-Mail, Ladeverlauf (Ort und Zeit) und die letzten vier Ziffern der Zahlungskarte. Das Backend läuft bei einem Cloud-Anbieter in der EU. Service-Mitarbeitende sehen bei Reklamationen Kundendaten. a) Nennen Sie vier technische oder organisatorische Maßnahmen (TOM) mit der zugehörigen Kontrollart. b) Erklären Sie, warum mit dem Cloud-Anbieter ein Vertrag zur Auftragsverarbeitung nötig ist. c) Nennen Sie zwei Rechte der betroffenen Kunden nach der DSGVO.',
        a: [['table', ['Maßnahme', 'Kontrollart'], [['Rechenzentrum mit Zugangskontrolle für Personal, Besucherliste', 'Zutrittskontrolle'], ['Anmeldung mit Passwort und zweitem Faktor für den Service', 'Zugangskontrolle'], ['Rollen- und Rechtekonzept: Controlling sieht nur anonyme Daten', 'Zugriffskontrolle'], ['TLS-Verschlüsselung zwischen App und Backend', 'Weitergabekontrolle'], ['Protokollierung, wer Kundendaten ändert', 'Eingabekontrolle'], ['Tägliche Datensicherung, USV', 'Verfügbarkeitskontrolle'], ['Getrennte Mandanten, Test- und Produktivdaten getrennt', 'Trennungsgebot']]],
          'Je Maßnahme mit richtiger Kontrollart 1 P (4 P).', 'b) Der Cloud-Anbieter verarbeitet **im Auftrag** von VoltWerk personenbezogene Daten. VoltWerk bleibt **verantwortlich**. Nach **Art. 28 DSGVO** muss ein **AV-Vertrag** regeln: Zweck, Weisungen, TOM, Unterauftragnehmer, Löschung. Ohne Vertrag ist die Verarbeitung rechtswidrig. (2 P)', 'c) Zum Beispiel: **Auskunft** (Art. 15), **Berichtigung** (Art. 16), **Löschung** (Art. 17), **Datenübertragbarkeit** (Art. 20), **Widerspruch** (Art. 21). Je Recht 1 P (2 P).'],
        sol: [['diagram', {w: 760, h: 230, keep: 600, cap: 'Schutzschichten: von außen nach innen', nodes: [
          {id: 'a', k: 'box', x: 100, y: 110, w: 150, h: 60, t: ['Zutritt', 'Rechenzentrum'], s: 'soft'}, {id: 'b', k: 'box', x: 280, y: 110, w: 150, h: 60, t: ['Zugang', 'Anmeldung, 2FA'], s: 'plain'}, {id: 'c', k: 'box', x: 460, y: 110, w: 150, h: 60, t: ['Zugriff', 'Rollen, Rechte'], s: 'accent'}, {id: 'd', k: 'box', x: 640, y: 110, w: 150, h: 60, t: ['Weitergabe', 'TLS, Protokoll'], s: 'ok'},
        ], edges: [{a: 'a', b: 'b'}, {a: 'b', b: 'c'}, {a: 'c', b: 'd'}]}]],
        see: ['ps-tom', 'ps-dsgvo']},
    ],
  });

  // Handlungsschritt 4
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Netz und Zugang planen (25 Punkte)',
    intro: 'VoltWerk baut am Hauptstandort ein neues Netz auf. Dazu steht das Netz **192.168.40.0/24** zur Verfügung. Es wird in Subnetze geteilt. Danach planen Sie Routing, den Zugriff aus dem Internet und die Anmeldung der Kunden.',
    tasks: [
      {pts: 8, rows: 10, topic: 'VLSM', op: '**Berechnen** heißt: Rechenweg zeigen. Schreiben Sie bei jedem Subnetz Netzadresse, Maske, Hostbereich und Broadcast.', hint: 'Erst nach Größe sortieren, größtes Netz zuerst. Zählen Sie das Gateway mit. Wählen Sie die kleinste Zweierpotenz, die reicht: nutzbare Hosts = 2 hoch n minus 2.',
        words: [['Gateway', 'Router-Adresse im Subnetz, über die Pakete das Netz verlassen'], ['Broadcast', 'letzte Adresse im Subnetz, geht an alle'], ['Hostbits', 'Bits der Adresse, die Geräte unterscheiden']],
        q: 'Teilen Sie 192.168.40.0/24 mit VLSM nach Anlage 6 auf. Jedes Netz mit Geräten braucht zusätzlich **eine Adresse für das Gateway**. Beginnen Sie bei 192.168.40.0. Geben Sie je Subnetz Präfix, Subnetzmaske, Netzadresse, ersten und letzten Host sowie Broadcast an.',
        ctx: [['h3', 'Anlage 6: Anforderungen'], ['table', ['Netz', 'Geräte'], [['Ladepunkte', '60'], ['Büro', '28'], ['Service-WLAN', '12'], ['Management (Switches, Server)', '7'], ['Router-Link zur Zentrale', '2 (nur zwei Router, kein Gateway)']]]],
        a: [['table', ['Netz', 'Bedarf', 'Präfix', 'Maske', 'Netzadresse', 'Hosts (erster bis letzter)', 'Broadcast'], [['Ladepunkte', '61', '/26', '255.255.255.192', '192.168.40.0', '.1 bis .62', '.63'], ['Büro', '29', '/27', '255.255.255.224', '192.168.40.64', '.65 bis .94', '.95'], ['Service-WLAN', '13', '/28', '255.255.255.240', '192.168.40.96', '.97 bis .110', '.111'], ['Management', '8', '/28', '255.255.255.240', '192.168.40.112', '.113 bis .126', '.127'], ['Router-Link', '2', '/30', '255.255.255.252', '192.168.40.128', '.129 bis .130', '.131']]],
          'Falle: Management braucht 7 + 1 = 8 Adressen. Ein /29 hat nur 6 nutzbare Hosts, also reicht /29 nicht. Es wird ein **/28** (14 Hosts). Frei bleibt 192.168.40.132 bis .255.',
          'Bewertung: Sortierung und Bedarf mit Gateway 2 P, Präfixe und Masken 2 P, Netzadressen mit Reihenfolge 2 P, Hostbereich und Broadcast 2 P.'],
        sol: [['walk', {t: 'VLSM Schritt für Schritt', steps: [
          {t: '**Bedarf bestimmen:** Geräte plus Gateway. Dann die kleinste passende Größe wählen: 2 hoch n minus 2 muss mindestens so groß sein wie der Bedarf.', b: [['table', ['Netz', 'Geräte + Gateway', 'Hostbits n', 'nutzbar 2^n - 2', 'Präfix'], [['Ladepunkte', '61', '6', '62', '/26'], ['Büro', '29', '5', '30', '/27'], ['Service-WLAN', '13', '4', '14', '/28'], ['Management', '8', '4', '14', '/28 (nicht /29 mit 6!)'], ['Router-Link', '2', '2', '2', '/30']]]]},
          {t: '**Von groß nach klein verteilen:** Jedes Netz beginnt direkt nach dem Ende des vorherigen. Die Größe der Blöcke ist 64, 32, 16, 16 und 4 Adressen.', b: [['diagram', AP2.dg.flow(['Ladepunkte .0 bis .63', 'Büro .64 bis .95', 'Service .96 bis .111', 'Management .112 bis .127', 'Link .128 bis .131'], {w: 900, h: 110, styles: ['accent', 'ok', 'gold', 'cat0', 'plain'], bw: 150})]]},
          {t: '**Kontrolle:** Jede Netzadresse ist ein Vielfaches der Blockgröße (0 / 64, 64 / 32, 96 / 16, 112 / 16, 128 / 4). Das Ende 131 liegt vor dem Netzende 255. Es gibt keine Überlappung.', b: [['chart', {kind: 'bar', w: 640, h: 240, labels: ['Ladepunkte', 'Büro', 'Service', 'Management', 'Link', 'frei'], series: [{n: 'Adressen im Block', d: [64, 32, 16, 16, 4, 124], k: 'accent'}], vals: true, ymax: 140, cap: 'Blockgrößen: 64 + 32 + 16 + 16 + 4 + 124 frei = 256'}]]},
        ]}]],
        see: ['infra-vlsm', 'infra-subnetting']},
      {pts: 6, rows: 8, topic: 'Routing', op: '**Bestimmen** heißt: nach einer Regel das Ergebnis finden. **Beurteilen** heißt: eine Aussage prüfen und begründen.', hint: 'Suchen Sie alle Zeilen, die zur Zieladresse passen. Nehmen Sie die mit dem längsten Präfix.',
        words: [['Routingtabelle', 'Liste: Für welches Ziel gehen Pakete an welchen Next Hop'], ['Longest Prefix Match', 'bei mehreren passenden Zeilen gewinnt die spezifischste (längster Präfix)'], ['Default-Route', 'Standardweg 0.0.0.0/0 für alle Ziele ohne eigene Zeile']],
        q: 'Anlage 7 zeigt die Routingtabelle des Standort-Routers R1. a) Bestimmen Sie für die Zieladressen 10.20.5.77, 10.20.9.14 und 8.8.8.8 die verwendete Zeile und den Next Hop. b) Ein Paket geht an 192.168.40.100 (Service-WLAN). Was passiert? Beurteilen Sie und beheben Sie den Fehler. c) Erläutern Sie das Auswahlprinzip bei mehreren passenden Zeilen.',
        ctx: [['h3', 'Anlage 7: Routingtabelle von R1'], ['table', ['Nr.', 'Ziel', 'Next Hop / Schnittstelle'], [['1', '192.168.40.0/26', 'direkt, eth0 (Ladepunkte)'], ['2', '192.168.40.64/27', 'direkt, eth1 (Büro)'], ['3', '192.168.40.128/30', 'direkt, eth2 (Link)'], ['4', '10.20.0.0/16', '192.168.40.130 (R2, Zentrale)'], ['5', '10.20.5.0/24', '192.168.40.66 (Büro-Router)'], ['6', '0.0.0.0/0', '192.168.40.130 (R2, Zentrale)']]],
          ['diagram', {w: 860, h: 250, keep: 700, cap: 'Anlage 7: Topologie um R1', nodes: [
            {id: 'ls', k: 'box', x: 90, y: 60, w: 150, h: 44, t: ['Ladepunkte', '192.168.40.0/26'], s: 'soft'}, {id: 'r1', k: 'box', x: 400, y: 125, w: 130, h: 50, t: ['R1', 'Standort'], s: 'accent'},
            {id: 'br', k: 'box', x: 90, y: 190, w: 150, h: 44, t: ['Büro-Router', '.66 im Büro-Netz'], s: 'soft'}, {id: 'r2', k: 'box', x: 700, y: 60, w: 150, h: 44, t: ['R2 Zentrale', '.130, 10.20.0.0/16'], s: 'ok'}, {id: 'net', k: 'box', x: 700, y: 190, w: 150, h: 44, t: ['10.20.5.0/24', 'hinter Büro-Router'], s: 'soft'},
          ], edges: [{a: 'ls', b: 'r1', ea: 'none', t: 'eth0'}, {a: 'br', b: 'r1', ea: 'none', t: 'eth1'}, {a: 'r1', b: 'r2', ea: 'none', t: 'eth2'}, {a: 'br', b: 'net', ea: 'none', via: [[400, 225]]}]}]],
        a: [['table', ['Ziel', 'passende Zeilen', 'gewählt', 'Next Hop'], [['10.20.5.77', '4 (/16), 5 (/24), 6 (/0)', '**Zeile 5** (längster Präfix /24)', '192.168.40.66'], ['10.20.9.14', '4 (/16), 6 (/0)', '**Zeile 4** (/16)', '192.168.40.130'], ['8.8.8.8', 'nur 6 (/0)', '**Zeile 6** Default-Route', '192.168.40.130']]],
          'b) 192.168.40.100 liegt im Netz **192.168.40.96/28**. Dafür gibt es **keine Zeile**. Es greift die Default-Route: Das Paket geht an R2 und von dort evtl. ins Internet. Das Service-WLAN ist **nicht erreichbar**. Fehler: Route für 192.168.40.96/28 fehlt. Lösung: Eintrag „192.168.40.96/28 direkt, eth3“ (oder über den zuständigen Router) ergänzen.',
          'c) **Longest Prefix Match:** Passen mehrere Zeilen, gewinnt die mit der **längsten Netzmaske** (spezifischste Route). Die Default-Route /0 gilt nur als letzter Ausweg.',
          'Bewertung: a) 3 x 1 P, b) 2 P, c) 1 P.'],
        see: ['infra-routing']},
      {pts: 5, rows: 7, topic: 'Reverse Proxy', op: '**Beschreiben** heißt: Aufgabe und Platz im Netz erklären. **Nennen** heißt: Stichworte.', hint: 'Der Reverse Proxy steht in der DMZ. Er ist der einzige Kontakt zum Internet. Denken Sie an Schutz, Verteilung und Verschlüsselung.',
        words: [['Last verteilen', 'viele Anfragen auf mehrere Server aufteilen (Load Balancing)'], ['TLS-Terminierung', 'der Proxy entschlüsselt die HTTPS-Verbindung']],
        q: 'Die App-Server und der Dashboard-Server von VoltWerk Connect sollen aus dem Internet erreichbar sein. a) Beschreiben Sie, wo ein Reverse Proxy im Netz steht und was er tut. b) Nennen Sie drei Vorteile für VoltWerk.',
        a: ['a) Der Reverse Proxy steht in der **DMZ** zwischen Internet und internem Netz. Clients sprechen nur mit ihm. Er **leitet** Anfragen an den richtigen internen Server **weiter** (zum Beispiel nach Domain oder Pfad) und gibt die Antwort zurück. Die internen Server sind von außen nicht sichtbar. (2 P)', 'b) Vorteile (je 1 P): **Schutz** der internen Server (Adresse verborgen, Angriffe filtern, Web Application Firewall); **Lastverteilung** auf mehrere App-Server; **TLS-Terminierung** und zentrale Zertifikate; Zwischenspeicher (Cache) und eine einzige öffentliche Adresse. (3 P)'],
        sol: [['diagram', {w: 900, h: 270, keep: 720, cap: 'Reverse Proxy in der DMZ: Direkter Zugriff auf interne Server ist gesperrt', nodes: [
          {id: 'dmz', k: 'group', x: 450, y: 135, w: 190, h: 200, t: 'DMZ', s: 'soft'}, {id: 'int', k: 'group', x: 770, y: 135, w: 200, h: 200, t: 'internes Netz', s: 'soft'},
          {id: 'c', k: 'box', x: 70, y: 135, w: 110, h: 50, t: ['App / Browser', 'Internet'], s: 'plain'}, {id: 'f1', k: 'box', x: 250, y: 135, w: 100, h: 50, t: ['Firewall', 'Port 443'], s: 'bad'},
          {id: 'p', k: 'box', x: 450, y: 150, w: 150, h: 56, t: ['Reverse Proxy', 'TLS, WAF'], s: 'accent'}, {id: 'a1', k: 'box', x: 770, y: 90, w: 140, h: 44, t: 'App-Server 1', s: 'ok'}, {id: 'a2', k: 'box', x: 770, y: 150, w: 140, h: 44, t: 'App-Server 2', s: 'ok'}, {id: 'd', k: 'box', x: 770, y: 210, w: 140, h: 44, t: 'Dashboard-Server', s: 'ok'},
        ], edges: [{a: 'c', b: 'f1', t: 'HTTPS'}, {a: 'f1', b: 'p'}, {a: 'p', b: 'a1'}, {a: 'p', b: 'a2'}, {a: 'p', b: 'd'}]}]],
        see: ['infra-firewall', 'infra-komponenten']},
      {pts: 2, topic: 'OAuth: Ablauf', op: '**Ordnen** heißt: eine Reihenfolge herstellen. 1 steht für den ersten Schritt.', hint: 'Zuerst geht der Kunde zum Autorisierungsserver. Der gibt einen Code. Der Code wird gegen das Token getauscht.',
        q: 'Kunden dürfen sich in der VoltWerk-App mit ihrem Konto eines Stadtwerke-Portals anmelden (OAuth 2.0 mit Authorization Code). Bringen Sie die Schritte in die richtige Reihenfolge.',
        order: [['Die App tauscht den Code beim Autorisierungsserver gegen ein Access Token.', 4], ['Der Kunde wählt in der App „Mit Stadtwerke-Konto anmelden“ und wird zum Autorisierungsserver weitergeleitet.', 1], ['Die App ruft mit dem Access Token die Daten beim Ressourcenserver ab.', 5], ['Der Autorisierungsserver leitet den Kunden mit einem Authorization Code zurück zur App.', 3], ['Der Kunde meldet sich beim Autorisierungsserver an und stimmt dem Zugriff zu.', 2]],
        a: ['Reihenfolge: 1 Weiterleitung, 2 Anmeldung und Zustimmung, 3 Authorization Code, 4 Tausch gegen Access Token, 5 Zugriff mit Token.'],
        sol: [['seq', {w: 860, actors: ['Kunde', 'Kunden-App (Client)', 'Autorisierungsserver', 'Ressourcenserver'], cap: 'OAuth 2.0 Authorization Code: Die App sieht das Passwort des Kunden nie.', steps: [
          [0, 1, '1 Anmelden wählen', 's'], [1, 2, 'Weiterleitung mit client_id und scope', 's'], [0, 2, '2 Login und Zustimmung', 's'], [2, 1, '3 Authorization Code', 'r'], [1, 2, '4 Code gegen Token tauschen', 's'], [2, 1, 'Access Token', 'r'], [1, 3, '5 Anfrage mit Access Token', 's'], [3, 1, 'Daten des Kunden', 'r']]}]],
        see: ['infra-webauth']},
      {pts: 4, rows: 6, topic: 'SSO und OAuth', op: '**Erläutern** heißt: sagen, was es ist, und warum. **Nennen** heißt: Stichworte.', hint: 'Rollen: Wer besitzt die Daten? Wer will sie? Wer gibt das Token aus? Wer hat die Daten?',
        words: [['Resource Owner', 'der Besitzer der Daten, hier der Kunde'], ['Scope', 'Umfang der Erlaubnis, z. B. nur Name und E-Mail']],
        q: 'a) Ordnen Sie im OAuth-Ablauf die Rollen Resource Owner, Client, Authorization Server und Resource Server den Beteiligten zu. b) Nennen Sie einen Vorteil von Single Sign-on für die Kunden und ein Risiko für VoltWerk.',
        a: ['a) **Resource Owner:** der Kunde. **Client:** die VoltWerk-App. **Authorization Server:** Server des Stadtwerke-Portals, der Anmeldung und Token ausgibt. **Resource Server:** API des Portals mit den Kundendaten. (2 P)', 'b) Vorteil: Der Kunde braucht **nur ein Passwort** und keine neue Registrierung. VoltWerk speichert kein Passwort. (1 P) Risiko: **Abhängigkeit** vom Portal (fällt es aus, ist keine Anmeldung möglich). Ein gestohlenes Konto oder Token öffnet **mehrere Dienste**. Dazu kommen Datenschutzfragen beim Datenaustausch. (1 P)'],
        see: ['infra-webauth']},
    ],
  });
  AP2.exam.end(ID);
})();
