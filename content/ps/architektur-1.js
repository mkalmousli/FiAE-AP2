AP2.page('ps-architektur', {
  b: 'ps', g: 'Software-Architektur', t: 'Software-Architektur: Schichten, Client-Server, MVC, Microservices',
  d: 'Die **Software-Architektur** beschreibt die grundlegende Struktur eines Systems: seine **Komponenten**, deren **Beziehungen** und die **Prinzipien** für Entwurf und Weiterentwicklung (nach ISO/IEC/IEEE 42010). **Architekturmuster** (zum Beispiel Schichten, Client-Server, MVC, Microservices) lösen Strukturprobleme des **ganzen Systems**, **Entwurfsmuster** (Singleton, Observer) lösen wiederkehrende Probleme **im Kleinen** zwischen wenigen Klassen.',
  m: '**Architekturmuster = Stadtplan, Entwurfsmuster = Bauplan eines Hauses.** MVC: **Model** kennt niemanden, **View** zeigt an, **Controller** steuert. Strenge Schichten: Aufrufe nur an die direkt darunterliegende Schicht. Andere Varianten erlauben Überspringen.',
  cheat: [
    ['Kategorien (POSA)', ['**Strukturierte Systeme:** Schichten, Pipes and Filters', '**Verteilte Systeme:** Client-Server, SOA, Microservices, Broker', '**Interaktive Systeme:** MVC, MVP, MVVM', '**Adaptive Systeme:** Reflexion, Microkernel (Plug-ins)']],
    ['Drei-Schichten-Architektur', ['**Präsentation:** UI', '**Logik:** Fachregeln, Berechnungen', '**Daten:** Datenbankzugriff', 'Austauschbar, testbar, wartbar']],
    ['MVC', ['**Model:** Daten und Logik, kennt weder View noch Controller', '**View:** Darstellung, kennt Model und Controller', '**Controller:** nimmt Eingaben an, ändert das Model', 'Benachrichtigung oft per **Observer**']],
    ['Monolith vs. Microservices', ['Monolith: eine Einheit, einfach zu starten', 'Microservices: kleine, unabhängige Dienste mit eigener DB', 'Kommunikation per REST oder Messaging', 'Unabhängig deploybar und skalierbar, aber komplexer']],
  ],
  blocks: [
    ['h', 'Warum Architektur?'],
    ['p', 'Software wächst und lebt lange. Ohne klare Struktur greift bald alles auf alles zu ("Big Ball of Mud"): Änderungen haben unvorhersehbare Nebenwirkungen, Tests werden schwer. Eine Architektur legt **Verantwortlichkeiten** und **Schnittstellen** fest. Daraus folgen wichtige Qualitätsmerkmale wie **Wartbarkeit**, **Skalierbarkeit**, **Testbarkeit** und **Sicherheit**. Architekturentscheidungen sind teuer zu ändern, deshalb trifft man sie früh, in der Entwurfsphase, und dokumentiert sie.'],
    ['table', ['', 'Architekturmuster', 'Entwurfsmuster'], [
      ['Ebene', 'Gesamtsystem, grobe Komponenten', 'Wenige Klassen und Objekte'],
      ['Beispiele', 'Schichten, Client-Server, MVC, Microservices, SOA', 'Singleton, Factory, Observer, Strategy, Adapter'],
      ['Wirkung', 'Bestimmt Verteilung, Deployment, Technologie', 'Bestimmt die Zusammenarbeit von Klassen im Code'],
    ], {first: true}],
    ['h', 'Schichtenarchitektur'],
    ['diagram', AP2.dg.layers([['Präsentationsschicht', 'Benutzeroberfläche: Web-Frontend, Desktop-GUI, App', 'accent'], ['Logikschicht (Geschäftslogik)', 'Fachregeln, Berechnungen, Validierung, Ablaufsteuerung', 'solid'], ['Datenzugriffsschicht', 'Repository/DAO, SQL, ORM (zum Beispiel Hibernate, Entity Framework)', 'accent'], ['Datenhaltung', 'Datenbankserver, Dateien', 'soft']], {w: 720, cap: 'Drei-Schichten-Architektur: Jede Schicht ruft nur die direkt darunterliegende auf.'})],
    ['p', 'Weil die Präsentation nur über die Logik auf Daten zugreift, kann man zum Beispiel die Datenbank austauschen oder eine App neben der Webseite anbieten, ohne die Fachlogik zu ändern. Verteilt man die Schichten auf eigene Rechner, spricht man von **Tiers** (3-Tier: Client, Applikationsserver, Datenbankserver).'],
    ['h', 'Client-Server und verteilte Architekturen'],
    ['table', ['Muster', 'Idee', 'Vorteil', 'Nachteil'], [
      ['Client-Server', 'Clients fordern Dienste beim zentralen Server an.', 'Zentrale Datenhaltung und Verwaltung', 'Server ist Engpass und Single Point of Failure'],
      ['Peer-to-Peer', 'Alle Knoten sind gleichberechtigt.', 'Kein zentraler Ausfallpunkt', 'Schwer zu verwalten und abzusichern'],
      ['SOA', 'Fachliche Dienste mit definierten Schnittstellen, oft über einen Enterprise Service Bus.', 'Wiederverwendung über Systemgrenzen', 'Schwergewichtig (SOAP, ESB)'],
      ['Microservices', 'Viele kleine, eigenständige Dienste, je mit eigener Datenhaltung.', 'Unabhängig entwickeln, deployen, skalieren', 'Verteilte Komplexität, Netzwerk, Monitoring'],
    ]],
    ['diagram', {w: 760, h: 270, cap: 'Microservices: Ein API-Gateway verteilt Anfragen auf unabhängige Dienste mit eigener Datenbank.', nodes: [
      {id: 'c', x: 80, y: 135, k: 'round', s: 'plain', t: ['Web / App', '(Client)'], w: 120},
      {id: 'g', x: 260, y: 135, k: 'round', s: 'solid', t: 'API-Gateway', w: 130},
      {id: 's1', x: 470, y: 50, k: 'round', s: 'accent', t: 'Kunden-Service', w: 150},
      {id: 's2', x: 470, y: 135, k: 'round', s: 'accent', t: 'Bestell-Service', w: 150},
      {id: 's3', x: 470, y: 220, k: 'round', s: 'accent', t: 'Zahlungs-Service', w: 150},
      {id: 'd1', x: 680, y: 50, k: 'cyl', s: 'soft', t: 'DB', w: 70, h: 50},
      {id: 'd2', x: 680, y: 135, k: 'cyl', s: 'soft', t: 'DB', w: 70, h: 50},
      {id: 'd3', x: 680, y: 220, k: 'cyl', s: 'soft', t: 'DB', w: 70, h: 50},
    ], edges: [{a: 'c', b: 'g', t: 'HTTPS'}, {a: 'g', b: 's1'}, {a: 'g', b: 's2'}, {a: 'g', b: 's3'}, {a: 's1', b: 'd1'}, {a: 's2', b: 'd2'}, {a: 's3', b: 'd3'}, {a: 's2', b: 's3', k: 'dash', t: 'Event'}]}],
    ['h', 'Model View Controller (MVC)'],
    ['p', 'MVC trennt eine interaktive Anwendung in drei Teile. Dadurch lassen sich Darstellung und Daten unabhängig ändern, mehrere Ansichten können dieselben Daten zeigen, und die Logik ist ohne Oberfläche testbar.'],
    ['seq', {w: 760, actors: ['Benutzer', 'View', 'Controller', 'Model'], cap: 'MVC als Sequenzdiagramm: Eingabe über die View, Änderung durch den Controller, View holt neue Daten vom Model.', steps: [
      [0, 1, 'klickt "Speichern"', 's'], [1, 2, 'eingabe(daten)', 's'], [2, 3, 'setDaten(daten)', 's'], [3, 2, 'ok', 'r'], [2, 1, 'aktualisieren()', 's'], [1, 3, 'getDaten()', 's'], [3, 1, 'daten', 'r'], [1, 0, 'zeigt neue Daten', 'r'],
    ]}],
    ['table', ['Komponente', 'Aufgabe', 'Kennt'], [
      ['Model', 'Verwaltet Daten und Geschäftslogik, bietet Zugriffsmethoden', '**weder View noch Controller**'],
      ['View', 'Stellt Daten dar, leitet Benutzereingaben weiter', 'Model (zum Lesen) und Controller'],
      ['Controller', 'Verarbeitet Eingaben, ändert das Model, steuert die View', 'Model und View'],
    ]],
    ['note', 'Varianten: **MVP** (Model View Presenter: die View ist passiv, der Presenter aktualisiert sie direkt) und **MVVM** (Model View ViewModel: Datenbindung zwischen View und ViewModel, zum Beispiel WPF, Angular). Alle drei gehören zu den **Mustern für interaktive Systeme**.'],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', 'Erläutern Sie den Unterschied zwischen Architekturmustern und Entwurfsmustern.', 'Ein **Architekturmuster** beschreibt die **grundlegende Struktur des gesamten Systems** (Komponenten, Verteilung, Kommunikation), zum Beispiel Schichten oder Client-Server. Ein **Entwurfsmuster** ist eine bewährte Lösung für ein **wiederkehrendes Problem im Kleinen**, also für die Zusammenarbeit weniger Klassen, zum Beispiel Singleton oder Observer. Architekturmuster wirken auf das ganze System, Entwurfsmuster lokal im Code.', 3],
    ['qa', 'Ordnen Sie den Kategorien verteilte, interaktive, strukturierte und adaptive Systeme zu: Schichtenarchitektur, Serviceorientierte Architektur, Client-Server, Model View Presenter, Reflexion.', ['- **Strukturierte Systeme:** Schichtenarchitektur', '- **Verteilte Systeme:** Serviceorientierte Architektur, Client-Server', '- **Interaktive Systeme:** Model View Presenter', '- **Adaptive Systeme:** Reflexion'], 4],
    ['qa', 'Nennen Sie je zwei Vor- und Nachteile einer Microservice-Architektur gegenüber einem Monolithen.', ['- **Vorteile:** Dienste unabhängig entwickeln und deployen; gezielt skalieren (nur der Bestell-Service bekommt mehr Instanzen); Geeignete Entkopplung kann Ausfälle auf einzelne Bereiche begrenzen; je Dienst passende Technologie.', '- **Nachteile:** Höhere Komplexität (Netzwerk, verteilte Transaktionen, Versionierung von Schnittstellen); aufwendiges Monitoring und Logging; Datenkonsistenz über mehrere Datenbanken schwieriger.'], 4],
    ['see', ['eua-patterns', 'ps-umlueberblick', 'ps-sequenz', 'eua-webapi']],
    ['quiz', [
      {q: 'Welche Komponente kennt bei MVC weder View noch Controller?', o: ['Model', 'View', 'Controller', 'Alle kennen sich gegenseitig'], a: 0, e: 'Das Model ist unabhängig; Änderungen werden über Benachrichtigungen (Observer) mitgeteilt.'},
      {q: 'Welches ist ein Architekturmuster?', o: ['Schichtenarchitektur', 'Singleton', 'Observer', 'Factory Method'], a: 0, e: 'Singleton, Observer und Factory sind Entwurfsmuster.'},
      {q: 'Was zeichnet Microservices aus?', o: ['Kleine, unabhängig deploybare Dienste mit eigener Datenhaltung', 'Ein einziges großes Programm', 'Kein Netzwerk nötig', 'Alle Dienste teilen eine Tabelle'], a: 0, e: 'Jeder Dienst ist eigenständig; Kommunikation über APIs oder Nachrichten.'},
      {q: 'Zu welcher Kategorie gehört MVC?', o: ['Interaktive Systeme', 'Verteilte Systeme', 'Adaptive Systeme', 'Strukturierte Systeme'], a: 0, e: 'MVC, MVP und MVVM gliedern Anwendungen mit Benutzerinteraktion.'},
      {q: 'Welcher Nachteil gilt für Client-Server?', o: ['Der Server kann zum Single Point of Failure werden', 'Daten sind nie zentral', 'Clients brauchen keine Verbindung', 'Es gibt keine Rechteverwaltung'], a: 0, e: 'Fällt der zentrale Server aus, sind alle Clients betroffen; Abhilfe: Cluster, Redundanz.'},
      {q: 'Was gilt bei einer strengen Schichtenarchitektur?', o: ['Jede Schicht nutzt nur die direkt darunterliegende', 'Jede Schicht ruft jede andere auf', 'Die Datenschicht ruft die Oberfläche auf', 'Es gibt immer genau zwei Schichten'], a: 0, e: 'So bleiben Abhängigkeiten gering und Schichten austauschbar.'},
    ]],
  ],
});

AP2.add('ps-architektur', [
  [
    "h",
    "Kopplung, Kohäsion und Testbarkeit"
  ],
  [
    "table",
    [
      "Begriff",
      "Einfach erklärt",
      "Gutes Beispiel"
    ],
    [
      [
        "Kopplung",
        "Abhängigkeit zwischen Komponenten",
        "Fachlogik kennt eine Repository-Schnittstelle statt konkreter SQL-Verbindung"
      ],
      [
        "Kohäsion",
        "Zusammengehörigkeit innerhalb einer Komponente",
        "Preisberechnung enthält passende Preisregeln"
      ],
      [
        "Dependency Injection",
        "Benötigte Abhängigkeit wird von außen übergeben",
        "Test übergibt ein kontrollierbares Repository"
      ]
    ]
  ],
  [
    "p",
    "Hohe Kohäsion und geringe unnötige Kopplung erleichtern Änderungen. Ein Test kann das Repository ersetzen. Dadurch prüft er Fachregeln ohne echte Datenbank. Integrationstests müssen den echten Datenbankzugriff zusätzlich prüfen."
  ],
  [
    "h",
    "Architekturentscheidung im Szenario"
  ],
  [
    "p",
    "Ein vierköpfiges Team baut eine kleine Reservierungsanwendung. Die Funktionen ändern sich oft gemeinsam. Ein modularer Monolith kann dafür gut passen. Er trennt Fachmodule, bleibt aber eine gemeinsame Deployment-Einheit."
  ],
  [
    "table",
    [
      "Kriterium",
      "Modularer Monolith",
      "Microservices"
    ],
    [
      [
        "Deployment",
        "Eine gemeinsame Auslieferung",
        "Mehrere unabhängig betreibbare Dienste"
      ],
      [
        "Datenkonsistenz",
        "Lokale Transaktionen oft einfacher",
        "Dienstübergreifende Konsistenz benötigt zusätzliche Konzepte"
      ],
      [
        "Skalierung",
        "Anwendung als Einheit skalieren",
        "Einzelne Dienste getrennt skalieren"
      ],
      [
        "Betriebsaufwand",
        "Für kleine Teams oft geringer",
        "Netzwerk, verteilte Diagnose und mehrere Deployments"
      ]
    ]
  ],
  [
    "warn",
    "Microservices verhindern keine Kettenausfälle. Timeouts, begrenzte Wiederholungen und geeignete Entkopplung sind nötig. Ein gemeinsamer Datenbankausfall kann weiterhin viele Dienste treffen."
  ],
  [
    "qa",
    "**Begründen** Sie für das kleine Team einen modularen Monolithen mit zwei Argumenten. **Nennen** Sie einen späteren Auslöser für eine getrennte Dienststruktur.",
    [
      "Weniger getrennte Deployments und Betriebsaufgaben passen zur kleinen Teamkapazität. 1 Punkt.",
      "Gemeinsame fachliche Änderungen und lokale Transaktionen bleiben einfacher. 1 Punkt.",
      "Ein eigenständig wachsender Bereich mit anderer Last oder eigenem Team kann eine Trennung begründen. 1 Punkt."
    ],
    3
  ],
  [
    "see",
    [
      "ps-schnittstellen",
      "ps-cicd",
      "ps-testentwurf",
      "infra-cloud"
    ]
  ]
]);
