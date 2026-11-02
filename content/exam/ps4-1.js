// Probeprüfung 4, Planen eines Softwareproduktes: VitaMed Nord MVZ, Terminplattform "TerminPlus" (agil, Datenschutz, Barrierefreiheit).
(function () {
  const ID = 'exam4-ps';
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 4 (Gesundheit)', t: 'Planen eines Softwareproduktes: Terminplattform TerminPlus', blocks: []});
  AP2.exam.start(ID, {minutes: 90, cover: AP2.exam.COVER.ps,
    hint: 'Schwerpunkte: agiles Vorgehen mit Scrum, Wirtschaftlichkeit, UML-Modellierung, Barrierefreiheit, Gesundheitsdaten nach DSGVO, Code-Review, Netzwerksicherheit mit DMZ und VPN, Verfügbarkeit.',
    intro: [
      ['p', 'Sie arbeiten bei der **Elbcode IT-Solutions GmbH** in Hamburg. Ihr Kunde ist das **VitaMed Nord MVZ** (Medizinisches Versorgungszentrum) mit **9 Praxen**, 38 Ärztinnen und Ärzten und 140 Beschäftigten. Termine werden bisher fast nur telefonisch vergeben; montags zwischen 8 und 10 Uhr ist die Telefonleitung dauerhaft besetzt.'],
      ['p', 'Ihr Team entwickelt die Plattform **TerminPlus**: Online-Terminbuchung im Web und per App, Erinnerungen per SMS oder E-Mail, Videosprechstunde, Wartezimmeranzeige und eine Schnittstelle zum Praxisverwaltungssystem (PVS). Das Projekt wird mit **Scrum** durchgeführt (Sprints von 2 Wochen).'],
      ['kv', [['Kunde', 'VitaMed Nord MVZ GmbH, 9 Standorte im Raum Hamburg'], ['Team', '1 Product Owner (Kunde), 1 Scrum Master, 5 Entwickler'], ['Besonderheit', 'Verarbeitung von Gesundheitsdaten, App muss barrierefrei sein'], ['Betrieb', 'Rechenzentrum in Hamburg, Praxen per VPN angebunden']]],
    ]});
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 1: Agil planen und Wirtschaftlichkeit belegen (25 Punkte)',
    tasks: [
      {pts: 6, topic: 'Scrum', q: 'Beschreiben Sie die vier Scrum-Events innerhalb eines Sprints (Zweck und Teilnehmende) und nennen Sie zwei Scrum-Artefakte.',
        a: ['- **Sprint Planning:** Das Scrum-Team legt das **Sprint-Ziel** fest und wählt Einträge aus dem Product Backlog für den Sprint aus (Sprint Backlog). Teilnehmende: Product Owner, Entwickler, Scrum Master.', '- **Daily Scrum:** täglich höchstens 15 Minuten, die **Entwickler** prüfen den Fortschritt zum Sprint-Ziel und planen den nächsten Tag; Hindernisse werden sichtbar.', '- **Sprint Review:** Am Ende zeigt das Team das **Inkrement** den Stakeholdern (zum Beispiel Praxisleitungen); Feedback fließt ins Product Backlog.', '- **Sprint Retrospektive:** Das Team verbessert seine **Zusammenarbeit und Prozesse** (Was lief gut, was ändern wir?).', 'Artefakte: **Product Backlog** (mit Produktziel), **Sprint Backlog** (mit Sprint-Ziel), **Inkrement** (mit Definition of Done).', 'Bewertung: je Event 1 P, Artefakte 2 P.'],
        sol: [['diagram', AP2.dg.cycle(['Sprint Planning', 'Entwicklung + Daily Scrum', 'Sprint Review', 'Retrospektive'], {w: 720, h: 300, rx: 230, ry: 100, styles: ['accent', 'ok', 'gold', 'cat3'], cap: 'Ein Sprint (2 Wochen) als Kreislauf; das Product Backlog speist jede Planung'})]],
        see: ['ps-scrum']},
      {pts: 6, rows: 8, topic: 'User Stories', q: 'Formulieren Sie zwei User Stories für TerminPlus nach dem üblichen Muster mit jeweils zwei **Akzeptanzkriterien**: a) Online-Buchung durch Patientinnen und Patienten, b) Terminerinnerung. Nennen Sie außerdem zwei Eigenschaften guter User Stories nach INVEST.',
        a: ['a) **Als** Patientin **möchte ich** online einen freien Termin bei meiner Hausärztin buchen, **damit** ich nicht stundenlang telefonieren muss.', '- Akzeptanzkriterien: Es werden nur freie Termine der nächsten 6 Wochen angezeigt. Nach der Buchung erhalte ich innerhalb von 1 Minute eine Bestätigung per E-Mail. Ein Termin kann nicht doppelt vergeben werden.', 'b) **Als** Patient **möchte ich** 24 Stunden vor dem Termin erinnert werden, **damit** ich ihn nicht vergesse und rechtzeitig absagen kann.', '- Akzeptanzkriterien: Die Erinnerung geht über den gewählten Kanal (SMS oder E-Mail) raus. Sie enthält Datum, Uhrzeit, Praxis und einen Link zum Absagen. Bei abgesagten Terminen wird keine Erinnerung gesendet.', 'INVEST: **I**ndependent (unabhängig), **N**egotiable (verhandelbar), **V**aluable (wertvoll für Nutzer), **E**stimable (schätzbar), **S**mall (in einen Sprint passend), **T**estable (testbar, über Akzeptanzkriterien).'],
        see: ['ps-scrum', 'ps-lastenheft']},
      {pts: 4, topic: 'Burndown-Chart', q: 'Das Diagramm zeigt den Burndown des aktuellen Sprints (10 Arbeitstage, 40 Story Points) am Ende von Tag 7. Beurteilen Sie den Stand und nennen Sie zwei Maßnahmen, die im Sinne von Scrum angemessen sind.',
        ctx: [['chart', {kind: 'line', w: 720, h: 300, labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], series: [{n: 'Ideal', d: [40, 36, 32, 28, 24, 20, 16, 12, 8, 4, 0], k: 'text3', dash: '6 4'}, {n: 'Ist (verbleibende SP)', d: [40, 39, 36, 34, 33, 28, 26, 24, null, null, null], k: 'accent'}], ymax: 40, yl: 'verbleibende Story Points', cap: 'Sprint-Burndown TerminPlus, Sprint 6 (waagerecht: Arbeitstag)'}]],
        a: ['Stand: An Tag 7 sind noch **24 SP** offen, ideal wären **12 SP**. Das Team liegt **12 SP zurück**. Bisher wurden 16 SP in 7 Tagen erledigt (rund 2,3 SP/Tag); in 3 Tagen schafft es voraussichtlich nur rund 7 SP. Das **Sprint-Ziel ist gefährdet**.', 'Maßnahmen: Im **Daily Scrum** die Hindernisse benennen, der **Scrum Master** beseitigt sie (zum Beispiel fehlender Zugang zur PVS-Schnittstelle). Mit dem **Product Owner** den **Umfang neu verhandeln** (niedrig priorisierte Stories zurück ins Product Backlog), ohne das Sprint-Ziel aufzugeben. In der **Retrospektive** die Ursachen klären (zu viel eingeplant, Schätzung). Nicht angemessen: dauerhafte Überstunden oder Qualität senken (Definition of Done).'],
        see: ['ps-scrum']},
      {pts: 3, topic: 'Velocity', q: 'Das Team hat in den letzten drei Sprints **34, 38 und 42 Story Points** abgeschlossen. Im Product Backlog sind noch **190 Story Points** geschätzt. Wie viele Sprints werden voraussichtlich noch benötigt?',
        num: {c: 5, tol: 0, unit: 'Sprints'},
        a: ['Durchschnittliche **Velocity** = (34 + 38 + 42) / 3 = **38 SP pro Sprint**. 190 / 38 = **5 Sprints**, also rund **10 Wochen**. Die Velocity ist ein Erfahrungswert des Teams und kein Leistungsmaßstab für Vergleiche zwischen Teams.'],
        see: ['ps-scrum', 'ps-aufwand']},
      {pts: 6, topic: 'Amortisation', q: 'TerminPlus kostet einmalig **96.000 Euro**. Durch weniger Telefonate und weniger nicht wahrgenommene Termine spart das MVZ monatlich **6.500 Euro**; für Betrieb und Lizenzen fallen monatlich **2.500 Euro** an. a) Berechnen Sie die Amortisationszeit in Monaten. b) Nennen Sie zwei nicht monetäre Vorteile, die in die Entscheidung einfließen sollten.',
        a: ['a) Monatlicher Überschuss = 6.500 - 2.500 = **4.000 Euro**. Amortisationszeit = 96.000 / 4.000 = **24 Monate**.', 'b) Zufriedenere Patientinnen und Patienten (Buchung rund um die Uhr), Entlastung der Medizinischen Fachangestellten, besseres Image, Barrierefreiheit für Hörgeschädigte (keine Telefonpflicht), bessere Auslastung der Ärztinnen und Ärzte.', 'Bewertung: Überschuss 2 P, Ergebnis 2 P, zwei Vorteile 2 P.'],
        sol: [['chart', {kind: 'line', w: 720, h: 300, labels: ['0', '6', '12', '18', '24', '30'], series: [{n: 'kumulierter Überschuss (Euro)', d: [-96000, -72000, -48000, -24000, 0, 24000], k: 'accent'}], ymin: -120000, ymax: 40000, yl: 'Euro', legend: true, cap: 'Die Kurve schneidet die Nulllinie nach 24 Monaten: Ab dann bringt TerminPlus Gewinn.'}], ['tool', 'roi']],
        see: ['ps-kosten']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 2: Modellieren und Oberfläche gestalten (25 Punkte)',
    tasks: [
      {pts: 9, rows: 10, topic: 'Klassendiagramm', q: 'Erstellen Sie ein UML-Klassendiagramm (Klassen, Attribute mit Datentypen, Beziehungen mit Multiplizitäten): Eine **Praxis** (Name, Adresse) besteht aus mindestens einem **Behandlungsraum** (Raumnummer); Räume existieren nicht ohne ihre Praxis. Eine **Ärztin bzw. ein Arzt** (LANR, Name, Fachrichtung) arbeitet in einer oder mehreren Praxen, jede Praxis hat mindestens einen Arzt. Ein **Termin** (Beginn, Dauer in Minuten, Status) gehört zu genau einem Arzt und genau einem **Patienten** (Versichertennummer, Name, Geburtsdatum) und findet in höchstens einem Raum statt. Ein **Videotermin** ist ein Termin mit zusätzlichem Link und ohne Raum.',
        a: ['- Praxis **1** ◆ **1..*** Behandlungsraum (**Komposition**: Räume existieren nicht ohne Praxis).', '- Praxis **1..*** --- **1..*** Arzt (Assoziation, m:n).', '- Arzt **1** --- **0..*** Termin, Patient **1** --- **0..*** Termin.', '- Termin **0..*** --- **0..1** Behandlungsraum.', '- **Videotermin** erbt von Termin (Generalisierung) und hat - link: String.', 'Bewertung: Klassen mit Attributen und Typen 3 P, Beziehungen 2 P, Multiplizitäten 2 P, Komposition 1 P, Vererbung 1 P.'],
        sol: [['diagram', {w: 880, h: 470, keep: 720, cap: 'Musterlösung: Klassendiagramm TerminPlus', nodes: [
          {id: 'pr', k: 'cls', x: 130, y: 70, w: 210, t: {name: 'Praxis', attrs: ['- name: String', '- adresse: String']}},
          {id: 'ra', k: 'cls', x: 130, y: 260, w: 210, t: {name: 'Behandlungsraum', attrs: ['- raumNr: String']}},
          {id: 'ar', k: 'cls', x: 450, y: 70, w: 220, t: {name: 'Arzt', attrs: ['- lanr: String', '- name: String', '- fachrichtung: String']}},
          {id: 'te', k: 'cls', x: 450, y: 260, w: 220, s: 'accent', t: {name: 'Termin', attrs: ['- beginn: DateTime', '- dauerMin: int', '- status: Terminstatus']}},
          {id: 'pa', k: 'cls', x: 770, y: 260, w: 210, t: {name: 'Patient', attrs: ['- versichertenNr: String', '- name: String', '- geburtsdatum: Date']}},
          {id: 'vi', k: 'cls', x: 450, y: 420, w: 220, t: {name: 'Videotermin', attrs: ['- link: String']}},
        ], edges: [
          {a: 'pr', b: 'ra', sa: 'diaf', ea: 'none', ta: '1', tb: '1..*'}, {a: 'pr', b: 'ar', ea: 'none', ta: '1..*', tb: '1..*'},
          {a: 'ar', b: 'te', ea: 'none', ta: '1', tb: '0..*'}, {a: 'pa', b: 'te', ea: 'none', ta: '1', tb: '0..*'}, {a: 'te', b: 'ra', ea: 'none', ta: '0..*', tb: '0..1'},
          {a: 'vi', b: 'te', ea: 'tri'},
        ]}], ['tip', 'Lies Multiplizitäten immer **von der anderen Seite her**: "Ein Termin gehört zu genau **1** Arzt" steht am Arzt-Ende der Linie.']],
        see: ['ps-klassen']},
      {pts: 8, rows: 10, topic: 'Sequenzdiagramm', q: 'Erstellen Sie ein UML-Sequenzdiagramm für die Online-Buchung: Die Patientin wählt in der **App** einen Termin. Die App sendet die Buchung an die **API**. Die API fragt beim **Kalenderdienst** an, ob der Slot frei ist. **Ist er frei**, speichert die API den Termin in der **Datenbank**, beauftragt den **Mail-Service asynchron** mit der Bestätigung und meldet der App den Erfolg; die App zeigt die Bestätigung. **Ist er belegt**, meldet die API einen Konflikt mit Alternativterminen, die die App anzeigt.',
        a: ['Lebenslinien: Patientin, App, API, Kalenderdienst, Datenbank, Mail-Service. Synchrone Nachrichten (gefüllte Pfeilspitze) mit Antworten (gestrichelt), die Mail als **asynchrone** Nachricht (offene Pfeilspitze). Die Verzweigung als **kombiniertes Fragment alt** mit den Wächtern [Slot frei] und [Slot belegt].', 'Bewertung: Lebenslinien 1 P, Nachrichtenfolge 3 P, Antworten 1 P, asynchrone Nachricht 1 P, alt-Fragment mit Wächtern 2 P.'],
        sol: [['seq', {w: 920, actors: ['Patientin', 'App', 'API', 'Kalenderdienst', 'Datenbank', 'Mail-Service'], cap: 'Musterlösung: Die gestrichelte Linie trennt die Operanden des alt-Fragments. Offene Pfeilspitze = asynchron.', steps: [
          [0, 1, 'Termin wählen', 's'], [1, 2, 'POST /termine', 's'], [2, 3, 'pruefeSlot(arzt, zeit)', 's'], [3, 2, 'frei / belegt', 'r'],
          ['sep', 'alt [Slot frei]'], [2, 4, 'INSERT termin', 's'], [4, 2, 'OK', 'r'], [2, 5, 'Bestätigung senden', 'a'], [2, 1, '201 Created', 'r'], [1, 0, 'Bestätigung anzeigen', 'r'],
          ['sep', '[Slot belegt]'], [2, 1, '409 Conflict + Alternativen', 'r'], [1, 0, 'Alternativen anzeigen', 'r']]}],
          ['warn', 'Häufige Fehler: Antworten ohne gestrichelte Linie, Verzweigung als zwei getrennte Diagramme statt **alt-Fragment**, Datenbank direkt von der App aus ansprechen (Architekturfehler).']],
        see: ['ps-sequenz']},
      {pts: 8, rows: 9, topic: 'Barrierefreiheit und Ergonomie', q: 'Die Abbildung zeigt den ersten Entwurf des Buchungsformulars. Seit Juni 2025 gilt das **Barrierefreiheitsstärkungsgesetz (BFSG)** auch für Online-Terminbuchungen. a) Nennen Sie vier Mängel des Entwurfs und ordnen Sie jedem einen Grundsatz der Dialoggestaltung nach **DIN EN ISO 9241-110** oder ein WCAG-Prinzip zu. b) Nennen Sie je eine Verbesserung.',
        ctx: [['result', {t: 'Entwurf Buchungsformular', h: 330, html: `<div class="f">
  <h3>terminbuchung</h3>
  <input placeholder="Name">
  <input placeholder="Geb.-Dat.">
  <input placeholder="Vers.-Nr.">
  <select><option>Arzt wählen</option></select>
  <div><span class="s g">08:00</span><span class="s r">08:15</span><span class="s g">08:30</span><span class="s r">08:45</span></div>
  <div class="b"><button>OK</button><button>Löschen</button><button>Abbrechen</button></div>
  <p class="e">Fehler 0x3F: Eingabe ungültig</p>
</div>`, css: `.f { font-family: Arial, sans-serif; font-size: 11px; color: #a8a8a8; background: #fff; padding: 12px; width: 300px; border: 1px solid #eee; }
.f h3 { margin: 0 0 6px; color: #bbb; font-weight: normal; }
.f input, .f select { display: block; width: 100%; margin: 4px 0; font-size: 11px; color: #aaa; border: 1px solid #f0f0f0; padding: 3px; box-sizing: border-box; }
.s { display: inline-block; padding: 4px 6px; margin: 4px 2px 4px 0; color: #fff; }
.g { background: #3c3; } .r { background: #e33; }
.b button { background: #ddd; border: 0; padding: 3px 8px; font-size: 10px; margin-right: 2px; }
.e { color: #e33; margin: 6px 0 0; }`}]],
        a: [['table', ['Mangel', 'Grundsatz / Prinzip', 'Verbesserung'], [['Nur Platzhalter, keine sichtbaren Beschriftungen (verschwinden beim Tippen, für Screenreader unklar)', 'Selbstbeschreibungsfähigkeit; WCAG: wahrnehmbar / verständlich', 'Sichtbare label-Elemente, mit dem Feld verknüpft (for/id)'], ['Freie und belegte Zeiten nur über Rot/Grün unterschieden', 'WCAG wahrnehmbar (Farbe nicht als einziges Merkmal)', 'Zusätzlich Text oder Symbol ("frei", durchgestrichen), belegte Zeiten deaktivieren'], ['Sehr geringer Kontrast, 11 px Schrift', 'WCAG wahrnehmbar (Kontrast mindestens 4,5 : 1)', 'Dunkler Text, mindestens 16 px, skalierbar'], ['Kryptische Fehlermeldung "0x3F"', 'Robustheit gegen Benutzungsfehler, Selbstbeschreibungsfähigkeit', 'Konkrete Meldung am Feld: "Bitte Geburtsdatum als TT.MM.JJJJ eingeben"'], ['"Löschen" direkt neben "OK", alle Knöpfe gleich gestaltet', 'Robustheit gegen Benutzungsfehler, Erwartungskonformität', 'Eindeutige Beschriftung "Termin buchen" als Primärknopf, Löschen mit Abstand und Rückfrage'], ['Datumsformat und Pflichtfelder unklar', 'Erwartungskonformität, Aufgabenangemessenheit', 'Format angeben, Pflichtfelder markieren, Datumsauswahl anbieten']]],
          'Grundsätze nach ISO 9241-110 (2020): Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robustheit gegen Benutzungsfehler, Benutzerbindung. WCAG-Prinzipien: wahrnehmbar, bedienbar, verständlich, robust.', 'Bewertung: je Mangel mit Zuordnung 1 P, je Verbesserung 1 P.'],
        sol: [['result', {t: 'Überarbeiteter Entwurf', h: 420, html: `<form class="f">
  <h3>Termin buchen</h3>
  <label for="n">Name *</label><input id="n" autocomplete="name">
  <label for="g">Geburtsdatum * <small>(TT.MM.JJJJ)</small></label><input id="g" inputmode="numeric">
  <label for="a">Ärztin / Arzt *</label><select id="a"><option>Dr. Yilmaz (Allgemeinmedizin)</option></select>
  <fieldset><legend>Uhrzeit wählen</legend>
    <button type="button" class="s">08:00 frei</button><button type="button" class="s" disabled>08:15 belegt</button><button type="button" class="s">08:30 frei</button>
  </fieldset>
  <p class="e" role="alert">Bitte geben Sie das Geburtsdatum im Format TT.MM.JJJJ ein.</p>
  <button class="p">Termin verbindlich buchen</button> <button type="button" class="c">Abbrechen</button>
</form>`, css: `.f { font: 16px/1.5 system-ui, sans-serif; color: #1a1a1a; max-width: 380px; }
.f h3 { margin: 0 0 8px; } label { display: block; margin-top: 8px; font-weight: 600; } small { font-weight: 400; color: #444; }
input, select { width: 100%; padding: 8px; font-size: 16px; border: 1px solid #555; border-radius: 6px; box-sizing: border-box; }
fieldset { border: 1px solid #999; border-radius: 6px; margin: 10px 0; } .s { margin: 4px; padding: 6px 10px; border: 2px solid #1b5e20; background: #fff; border-radius: 6px; }
.s:disabled { border-color: #999; color: #666; text-decoration: line-through; } .e { color: #b00020; font-weight: 600; }
.p { background: #0b57d0; color: #fff; border: 0; padding: 10px 16px; border-radius: 6px; font-size: 16px; } .c { background: none; border: 0; text-decoration: underline; font-size: 16px; }`}]],
        see: ['ps-ergonomie', 'ps-ux', 'ps-wireframe']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 3: Datenschutz und Qualität sichern (25 Punkte)',
    tasks: [
      {pts: 6, topic: 'DSGVO Gesundheitsdaten', q: 'TerminPlus speichert neben Name und Termin auch den **Besuchsgrund** (zum Beispiel "Kontrolle Diabetes"). a) Um welche Datenkategorie handelt es sich, und was folgt daraus? b) Nennen Sie eine Rechtsgrundlage für die Verarbeitung. c) Welche Prüfung ist vor dem Start durchzuführen? d) Erklären Sie Privacy by Default an einem Beispiel aus TerminPlus.',
        a: ['a) **Gesundheitsdaten**, eine **besondere Kategorie personenbezogener Daten** (Art. 9 DSGVO). Ihre Verarbeitung ist **grundsätzlich verboten**, außer eine Ausnahme nach Art. 9 Abs. 2 greift; es gelten erhöhte Schutzanforderungen (zum Beispiel Verschlüsselung, strenge Rollen).', 'b) **Ausdrückliche Einwilligung** (Art. 9 Abs. 2 a) für Zusatzfunktionen der App oder Verarbeitung für Zwecke der **Gesundheitsvorsorge und Behandlung** durch Personal mit Schweigepflicht (Art. 9 Abs. 2 h, in Verbindung mit dem Behandlungsvertrag).', 'c) Eine **Datenschutz-Folgenabschätzung** (DSFA, Art. 35), weil umfangreich besondere Kategorien verarbeitet werden; Einbindung des Datenschutzbeauftragten.', 'd) **Datenschutzfreundliche Voreinstellungen** (Art. 25): Der Besuchsgrund ist optional und standardmäßig leer; Erinnerungen enthalten keinen Besuchsgrund; Standortfreigabe und Newsletter sind ausgeschaltet, bis der Nutzer sie aktiviert.'],
        see: ['ps-dsgvo', 'ps-tom']},
      {pts: 6, topic: 'Schutzbedarf', q: 'Führen Sie für die drei Objekte eine **Schutzbedarfsfeststellung** nach BSI IT-Grundschutz durch (normal, hoch, sehr hoch je Grundwert Vertraulichkeit, Integrität, Verfügbarkeit) und begründen Sie jeweils den höchsten Wert: a) Terminkalender mit Besuchsgründen, b) Wartezimmeranzeige (zeigt Aufrufnummern), c) Server mit der TerminPlus-Datenbank.',
        a: [['table', ['Objekt', 'Vertraulichkeit', 'Integrität', 'Verfügbarkeit', 'Begründung'], [['a) Terminkalender', '**sehr hoch**', 'hoch', 'hoch', 'Gesundheitsdaten (Art. 9), Offenlegung schadet Patienten erheblich; falsche Termine stören die Versorgung'], ['b) Wartezimmeranzeige', 'normal', 'normal', 'normal', 'nur Nummern, kein Personenbezug; Ausfall per Zuruf überbrückbar'], ['c) Datenbankserver', '**sehr hoch**', 'hoch', '**hoch**', '**Maximumprinzip**: erbt den höchsten Schutzbedarf der Anwendungen und Daten, die auf ihm laufen']]],
          'Bewertung: je Objekt 2 P (plausible Einstufung mit Begründung). Abweichende Einstufungen sind mit guter Begründung zu akzeptieren.'],
        see: ['infra-grundschutz', 'infra-cia']},
      {pts: 7, rows: 9, topic: 'Code-Review', q: 'Im Code-Review finden Sie die folgende Methode. Nennen Sie vier Mängel (Sicherheit und Wartbarkeit) mit je einer Verbesserung und schreiben Sie die Datenbankabfrage sicher neu.',
        ctx: [['code', 'java', `public List<Termin> t(String n) throws Exception {
    Connection c = DriverManager.getConnection(
        "jdbc:postgresql://db/praxis", "root", "Praxis2024!");
    ResultSet r = c.createStatement().executeQuery(
        "SELECT * FROM termin WHERE patient_name = '" + n + "'");
    List<Termin> l = new ArrayList<>();
    while (r.next()) {
        if (r.getInt("status") == 3) continue;
        l.add(new Termin(r.getInt(1), r.getTimestamp(4)));
    }
    return l;
}`]],
        a: [['table', ['Mangel', 'Verbesserung'], [['**SQL-Injection**: Benutzereingabe wird in den SQL-String eingebaut (Eingabe x\' OR \'1\'=\'1 liefert alle Termine)', '**PreparedStatement** mit Platzhalter (?)'], ['Zugangsdaten **im Quellcode**, Benutzer **root**', 'Konfiguration bzw. Secret-Store, eigener DB-Benutzer mit minimalen Rechten'], ['Verbindung und ResultSet werden **nicht geschlossen** (Ressourcenleck)', '**try-with-resources**, Connection-Pool'], ['**Magic Number** 3, Spaltenzugriff per Index, SELECT *', 'Konstante oder enum (Terminstatus.ABGESAGT), Spalten namentlich'], ['Nichtssagende Namen t, n, r, l; throws Exception', 'Sprechende Namen (findeTermineVonPatient, name, ergebnis), spezifische Exceptions']]],
          ['code', 'java', `public List<Termin> findeOffeneTermine(String patientName) throws SQLException {
    String sql = "SELECT termin_id, beginn FROM termin WHERE patient_name = ? AND status <> ?";
    try (Connection con = dataSource.getConnection();
         PreparedStatement ps = con.prepareStatement(sql)) {
        ps.setString(1, patientName);
        ps.setInt(2, Terminstatus.ABGESAGT.code());
        try (ResultSet rs = ps.executeQuery()) {
            List<Termin> termine = new ArrayList<>();
            while (rs.next()) termine.add(new Termin(rs.getInt("termin_id"), rs.getTimestamp("beginn")));
            return termine;
        }
    }
}`], 'Bewertung: vier Mängel mit Verbesserung je 1,25 P, sichere Abfrage 2 P.'],
        sol: [['ex', 'Was passiert bei der Eingabe **x\' OR \'1\'=\'1** ? Der zusammengesetzte Befehl lautet SELECT * FROM termin WHERE patient_name = \'x\' OR \'1\'=\'1\'. Die Bedingung ist immer wahr: Jeder sieht die Termine aller Patienten, ein schwerer Datenschutzverstoß.']],
        see: ['infra-websec', 'eua-debugging', 'ps-softwarequalitaet']},
      {pts: 6, topic: 'Teststrategie', q: 'a) Erläutern Sie die **Testpyramide** und begründen Sie die Verteilung der Testarten. b) Montags um 8 Uhr buchen erfahrungsgemäß bis zu **2.000 Personen gleichzeitig**. Welche Testart setzen Sie ein, und welche zwei Kennzahlen messen Sie?',
        a: ['a) Unten **viele Unit-Tests** (schnell, billig, genaue Fehlerlokalisierung), in der Mitte **Integrations-/API-Tests**, oben **wenige End-to-End-/UI-Tests** (langsam, teuer, anfällig). Fehler sollen möglichst früh und günstig gefunden werden; alle Ebenen laufen automatisiert in der CI-Pipeline.', 'b) **Lasttest** (bzw. Performancetest; über die Grenze hinaus: **Stresstest**) mit simulierten 2.000 gleichzeitigen Nutzern. Kennzahlen: **Antwortzeit** (zum Beispiel 95 % der Anfragen unter 2 s), **Durchsatz** (Buchungen pro Sekunde), **Fehlerrate**, CPU- und Speicherauslastung.'],
        sol: [['diagram', {w: 640, h: 230, cap: 'Testpyramide: je höher, desto weniger, langsamer und teurer', nodes: [
          {id: 'e', k: 'box', x: 320, y: 40, w: 220, h: 50, t: ['End-to-End / UI', 'wenige'], s: 'bad'},
          {id: 'i', k: 'box', x: 320, y: 105, w: 400, h: 50, t: ['Integration / API', 'einige'], s: 'gold'},
          {id: 'u', k: 'box', x: 320, y: 170, w: 600, h: 50, t: ['Unit-Tests', 'viele, schnell, billig'], s: 'ok'},
        ], edges: []}]],
        see: ['ps-testarten', 'eua-unittest']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Handlungsschritt 4: Infrastruktur und IT-Sicherheit (25 Punkte)',
    tasks: [
      {pts: 7, rows: 9, topic: 'DMZ und Firewall', q: 'Der Buchungsserver muss aus dem Internet erreichbar sein, die Datenbank und die Praxis-PCs dürfen es nicht. a) Skizzieren Sie eine Netzwerkarchitektur mit **DMZ** und zwei Firewalls. b) Formulieren Sie vier Firewallregeln (Quelle, Ziel, Dienst/Port, Aktion), einschließlich der Grundregel.',
        a: ['a) Internet, **äußere Firewall**, **DMZ** mit Reverse Proxy/Webserver, **innere Firewall**, internes Netz mit Datenbankserver und Praxis-PCs. Zwei Firewalls verschiedener Hersteller erhöhen die Sicherheit (ein Fehler öffnet nicht beide).', ['table', ['Nr.', 'Quelle', 'Ziel', 'Dienst / Port', 'Aktion'], [['1', 'Internet (any)', 'Webserver DMZ', 'HTTPS, TCP 443', 'erlauben'], ['2', 'Webserver DMZ', 'DB-Server LAN', 'PostgreSQL, TCP 5432', 'erlauben'], ['3', 'Praxis-LAN', 'Webserver DMZ', 'HTTPS, TCP 443', 'erlauben'], ['4', 'Admin-Netz', 'Webserver DMZ', 'SSH, TCP 22', 'erlauben'], ['5', 'Internet', 'LAN', 'any', 'verweigern'], ['6', 'any', 'any', 'any', '**verweigern (Default Deny)**']]],
          'Bewertung: Skizze 3 P, Regeln 4 P (Grundregel zwingend). Die Firewall arbeitet zustandsorientiert (Stateful Inspection), Antwortpakete sind automatisch erlaubt.'],
        sol: [['diagram', {w: 880, h: 300, keep: 720, cap: 'DMZ zwischen zwei Firewalls: Aus dem Internet ist nur der Webserver erreichbar, nur er darf zur Datenbank.', nodes: [
          {id: 'inet', k: 'oval', x: 70, y: 150, w: 110, h: 60, t: 'Internet', s: 'soft'},
          {id: 'fw1', k: 'box', x: 220, y: 150, w: 110, h: 56, t: ['Firewall 1', 'außen'], s: 'bad'},
          {id: 'dmz', k: 'group', x: 390, y: 150, w: 170, h: 200, t: 'DMZ'},
          {id: 'web', k: 'box', x: 390, y: 115, w: 140, h: 50, t: ['Reverse Proxy', 'Webserver'], s: 'accent'}, {id: 'mail', k: 'box', x: 390, y: 195, w: 140, h: 44, t: 'Mail-Relay', s: 'soft'},
          {id: 'fw2', k: 'box', x: 560, y: 150, w: 110, h: 56, t: ['Firewall 2', 'innen'], s: 'bad'},
          {id: 'lan', k: 'group', x: 750, y: 150, w: 190, h: 240, t: 'LAN (intern)'},
          {id: 'db', k: 'cyl', x: 750, y: 100, w: 140, h: 64, t: 'DB-Server', s: 'accent'}, {id: 'pc', k: 'box', x: 750, y: 200, w: 140, h: 44, t: 'Praxis-PCs', s: 'soft'},
        ], edges: [{a: 'inet', b: 'fw1', ea: 'none', t: '443'}, {a: 'fw1', b: 'web', ea: 'none'}, {a: 'fw1', b: 'mail', ea: 'none'}, {a: 'web', b: 'fw2', ea: 'none'}, {a: 'fw2', b: 'db', ea: 'none', t: '5432'}, {a: 'fw2', b: 'pc', ea: 'none'}]}]],
        see: ['infra-firewall']},
      {pts: 6, topic: 'VPN', q: 'Die 9 Praxen sollen sicher an das Rechenzentrum angebunden werden; Ärztinnen und Ärzte sollen außerdem aus dem Homeoffice Befunde einsehen können. a) Welche VPN-Arten setzen Sie jeweils ein? b) Beschreiben Sie, wie IPsec im Tunnelmodus Vertraulichkeit, Integrität und Authentizität sicherstellt. c) Welche zusätzliche Maßnahme ist für den Homeoffice-Zugang zwingend?',
        a: ['a) Praxen: **Site-to-Site-VPN** (Router/Firewall der Praxis zum Rechenzentrum, dauerhaft, für die Nutzer unsichtbar). Homeoffice: **Client-to-Site-VPN** (Remote Access, VPN-Client auf dem Dienstgerät).', 'b) Im **Tunnelmodus** wird das komplette ursprüngliche IP-Paket mit **ESP verschlüsselt** (Vertraulichkeit, zum Beispiel AES-GCM) und in ein neues IP-Paket verpackt; ein **HMAC/AEAD-Tag** sichert die **Integrität**; die Gegenstellen authentisieren sich beim Schlüsselaustausch (**IKEv2**) mit **Zertifikaten** oder Pre-Shared Key (Authentizität). Die Schlüssel werden per Diffie-Hellman ausgehandelt.', 'c) **Zwei-Faktor-Authentisierung** (zum Beispiel Zertifikat auf dem Gerät plus TOTP-App), dazu nur verwaltete Dienstgeräte mit aktuellem Patchstand.'],
        sol: [['diagram', {w: 760, h: 300, keep: 620, cap: 'Hub-and-Spoke: jede Praxis mit einem IPsec-Tunnel zum Rechenzentrum, Homeoffice per Client-VPN mit 2FA', nodes: [
          {id: 'rz', k: 'cyl', x: 380, y: 150, w: 150, h: 80, t: ['Rechenzentrum', 'VPN-Gateway'], s: 'accent'},
          {id: 'p1', k: 'box', x: 100, y: 60, w: 120, h: 44, t: 'Praxis 1'}, {id: 'p2', k: 'box', x: 100, y: 150, w: 120, h: 44, t: 'Praxis 2'}, {id: 'p3', k: 'box', x: 100, y: 240, w: 120, h: 44, t: 'Praxis ... 9'},
          {id: 'ho', k: 'box', x: 660, y: 150, w: 150, h: 50, t: ['Homeoffice', 'Laptop + 2FA'], s: 'gold'},
        ], edges: [{a: 'p1', b: 'rz', k: 'dash', ea: 'none', t: 'IPsec'}, {a: 'p2', b: 'rz', k: 'dash', ea: 'none', t: 'IPsec'}, {a: 'p3', b: 'rz', k: 'dash', ea: 'none', t: 'IPsec'}, {a: 'ho', b: 'rz', k: 'dash', ea: 'none', t: 'Client-VPN'}]}]],
        see: ['infra-vpn']},
      {pts: 6, topic: 'Passwörter speichern', q: 'Patientinnen und Patienten melden sich mit E-Mail und Passwort an. a) Beschreiben Sie, wie die Passwörter sicher gespeichert werden (Verfahren, Salt, Algorithmus). b) Warum sind schnelle Hashfunktionen wie SHA-256 allein ungeeignet, und warum werden Passwörter nicht verschlüsselt gespeichert?',
        a: ['a) Gespeichert wird nur ein **Hashwert**: Für jedes Passwort wird ein **zufälliges Salt** (individuell, mindestens 16 Byte) erzeugt; daraus und aus dem Passwort berechnet ein **langsamer, speicherintensiver Passwort-Hash** (**Argon2id**, bcrypt, scrypt oder PBKDF2) den Hash. Gespeichert werden Salt, Parameter und Hash. Beim Login wird der Hash mit demselben Salt neu berechnet und verglichen. Optional zusätzlich ein geheimer **Pepper** außerhalb der Datenbank.', 'b) SHA-256 ist **zu schnell**: Angreifer testen mit Grafikkarten Milliarden Passwörter pro Sekunde (Brute Force, Wörterbuch). Ohne Salt helfen außerdem **Rainbow Tables**, und gleiche Passwörter haben gleiche Hashes. **Verschlüsselung** ist umkehrbar: Wer den Schlüssel erbeutet, kennt alle Passwörter. Ein Hash ist eine Einwegfunktion.'],
        sol: [['diagram', AP2.dg.flow(['Passwort "Sonne#2026"', '+ zufälliges Salt', 'Argon2id (langsam, viel Speicher)', 'DB: Salt + Parameter + Hash'], {w: 780, h: 110, styles: ['plain', 'gold', 'accent', 'ok'], bw: 175, cap: 'Registrierung: gespeichert wird nie das Passwort selbst'})], ['tool', 'hash']],
        see: ['infra-krypto', 'infra-webauth']},
      {pts: 4, topic: 'Verfügbarkeit', q: 'Der Buchungsdienst besteht aus einer Kette: Router (99,9 %), Firewall (99,95 %), **zwei parallel betriebene Webserver** (je 99 %, einer genügt) und Datenbankserver (99,8 %). Berechnen Sie die Gesamtverfügbarkeit in Prozent (zwei Nachkommastellen).',
        num: {c: 99.64, tol: 0.006, unit: '%'},
        a: ['Parallel: 1 - (1 - 0,99)² = 1 - 0,0001 = **0,9999**.', 'Seriell: 0,999 x 0,9995 x 0,9999 x 0,998 = **0,99640** ≈ **99,64 %**.', 'Merke: In Reihe wird **multipliziert** (die Kette ist schwächer als ihr schwächstes Glied), parallel werden die **Ausfallwahrscheinlichkeiten** multipliziert.'],
        sol: [['diagram', {w: 820, h: 200, keep: 680, cap: 'Zuverlässigkeitsblockdiagramm: Reihe mit einem Parallelblock', nodes: [
          {id: 'r', k: 'box', x: 80, y: 100, w: 120, h: 50, t: ['Router', '99,9 %']}, {id: 'f', k: 'box', x: 250, y: 100, w: 120, h: 50, t: ['Firewall', '99,95 %']},
          {id: 'w1', k: 'box', x: 450, y: 50, w: 130, h: 50, t: ['Webserver 1', '99 %'], s: 'accent'}, {id: 'w2', k: 'box', x: 450, y: 150, w: 130, h: 50, t: ['Webserver 2', '99 %'], s: 'accent'},
          {id: 'd', k: 'cyl', x: 680, y: 100, w: 130, h: 64, t: ['Datenbank', '99,8 %']},
        ], edges: [{a: 'r', b: 'f', ea: 'none'}, {a: 'f', b: 'w1', ea: 'none'}, {a: 'f', b: 'w2', ea: 'none'}, {a: 'w1', b: 'd', ea: 'none'}, {a: 'w2', b: 'd', ea: 'none'}]}], ['tool', 'avail']],
        see: ['infra-verfuegbarkeit']},
      {pts: 2, topic: 'Ausfallzeit', q: 'Wie viele **Stunden pro Jahr** darf der Buchungsdienst bei dieser Verfügbarkeit ausfallen (365 Tage, eine Nachkommastelle, mit dem ungerundeten Ergebnis rechnen)?',
        num: {c: 31.5, tol: 0.06, unit: 'Stunden'},
        a: ['Ausfallzeit = (1 - 0,99640) x 365 x 24 h = 0,0035962 x 8.760 h ≈ **31,5 Stunden** pro Jahr (rund 2,6 Stunden im Monat).'],
        see: ['infra-verfuegbarkeit']},
    ],
  });
  AP2.exam.end(ID);
})();
