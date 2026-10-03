# AP2 FiAE Prüfungsvorbereitung - Lernwerkzeug

Ein modernes, interaktives Lernwerkzeug zur Vorbereitung auf die AP2 Prüfung (Abschlussprüfung Teil 2) für Fachinformatiker Anwendungsentwicklung an der IHK Baden-Württemberg.

## Features

- **Reine JavaScript/HTML/CSS Webapp** - Kein Backend nötig, läuft offline
- **Moderne Designsprache** - Dark/Light Mode, responsive für alle Geräte
- **25+ Prüfungsthemen** - Alle 5 Blöcke der AP2 abgedeckt
- **5 Programmiersprachen Crash Courses** - SQL, Python, HTML/CSS, C#, Java
- **Interaktive Rechner** - Subnetting, RAID Kapazität
- **20+ Quiz-Fragen** - Mit sofortigem Feedback
- **Suchfunktion** - Schnelles Finden von Topics
- **Fortschrittspeicherung** - localStorage für Offline-Sync

## Schnelleinstieg

### Option 1: Lokal mit File-Protokoll
```bash
open /home/d/Documents/Ap2/index.html
# oder copy&paste in Browser:
# file:///home/d/Documents/Ap2/index.html
```

### Option 2: Mit lokalem Server
```bash
cd /home/d/Documents/Ap2
python3 -m http.server 8000
# open http://localhost:8000
```

## Themen

### Block 1: Planung & Anforderungen
- Projektmanagement Grundlagen
- UML Klassendiagramme
- ER-Modell & Datenbankdesign
- Normalisierung (1NF-3NF)
- Testing & Qualitätssicherung

### Block 2: Infrastruktur & IT-Sicherheit
- OSI-Referenzmodell
- TCP/IP-Modell
- IPv4 Subnetting (mit Rechner)
- RAID-Level (mit Rechner)
- IT-Sicherheit Basics (CIA-Triade)
- Ports & Protokolle

### Block 3: Entwicklung & Algorithmen
- Programmierung Grundlagen
- Sortieralgorithmen
- Objektorientierte Programmierung
- SQL Grundlagen
- Design Patterns

### Block 4: Wirtschaft & Soziales
- Arbeitsrecht Grundlagen
- Wirtschaftliche Grundlagen

### Block 5: Deutsch
- Kommunikationsmodelle

### Programmiersprachen Crash Courses
- SQL: SELECT, JOIN, GROUP BY, Aggregates
- Python: OOP, Exceptions, List Comprehension
- HTML/CSS: Flexbox, Grid, Media Queries
- C#: Klassen, Properties, Async/Await
- Java: Klassen, Interfaces, Exception Handling

## Technologie

- **Pure JavaScript** - Keine Framework-Abhängigkeiten
- **Modular** - Alle Dateien unter 100 Zeilen
- **Single Source of Truth** - State Management mit state.js
- **Komponenten-Architektur** - Wiederverwendbare UI-Komponenten
- **Theme System** - Zentrale Farbpalette, Dark/Light Mode
- **Router** - Hash-based Navigation (#/topic-id)
- **localStorage** - Offline-Persistierung

## Struktur

```
/
├── index.html           # Einziges HTML-Dokument
├── main.js              # Loader
├── state.js             # State Management
├── theme.js             # Design System
├── styles.js            # Style Konstanten
├── dom.js               # DOM Helfer
├── router.js            # Navigation
├── components/          # UI-Komponenten
│   ├── button.js
│   ├── card.js
│   ├── quiz-interactive.js
│   └── ...
├── content/             # Lernressourcen
│   ├── infra/           # Infrastruktur Topics
│   ├── eua/             # Entwicklung Topics
│   ├── ps/              # Planung Topics
│   ├── wiso/            # Wirtschaft Topics
│   ├── deutsch/         # Deutsch Topics
│   ├── crashcourses/    # Programmiersprachen
│   └── quizzes-*.js     # Quiz-Daten
├── tools/               # Interaktive Rechner
│   ├── subnet-calc.js   # Subnetting Logik
│   └── raid-calc.js     # RAID Logik
└── viz/                 # Visualisierungen (Platzhalter)
```

## Design

- **Farbschema**: Deep Blue (#0066cc) Accent mit Grau/Weiß (Light) und Dark Blue (Dark)
- **Typografie**: System-Fonts, 16px Base, Responsive Sizing
- **Spacing**: 8px Grid System
- **Komponenten**: Cards, Buttons, Tables, Quizzes, Code Blocks

## Barrierefreiheit

✓ Vollständige Tastaturnavigation
✓ Focus-Ringe für alle Elemente
✓ High Contrast Light/Dark Modes
✓ Semantic HTML
✓ ARIA Attributes wo nötig

## Performance

- Keine externen Abhängigkeiten
- Keine CDN Calls
- Schnelle Ladezeit (< 1s)
- Offline-Fähigkeit
- localStorage für Caching

## Verwendung

1. **Navigation**: Sidebar oder Suche nutzen
2. **Lernen**: Definition + Merkhilfe lesen
3. **Vertiefen**: Code-Beispiele anschauen
4. **Üben**: Rechner testen oder Quizzes lösen
5. **Verfolgen**: Fortschritt in localStorage gespeichert

## Git-Commits

```bash
# Projekt-Historie:
git log --oneline

a39f3d5 Expand content, improve quizzes, and split large files
d2baf49 Major enhancement: modern design, rich content, quizzes, and crash courses
03a2936 Add comprehensive content for all 5 blocks
e133308 Add RAID calculator, additional topics, and glossary
8e22e6d Initial: AP2 webapp foundation with infrastructure content
```

## Lizenz

Privates Projekt für AP2 Prüfungsvorbereitung.

## Kontakt

Für Feedback oder Fragen zur Prüfungsvorbereitung.

---

**Status**: Production-Ready für AP2 Prüfungsvorbereitung Winter 2026/2027
