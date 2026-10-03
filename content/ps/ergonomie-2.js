AP2.add('ps-ergonomie', [
  ['h', 'Weitere Gestaltungsregeln für Oberflächen'],
  ['list', ['**Konsistenz:** Gleiche Dinge sehen gleich aus und funktionieren gleich.', '**Gruppierung:** Zusammengehörige Felder stehen zusammen (Gestaltgesetz der Nähe).', '**Visuelle Hierarchie:** Wichtiges ist größer, kontrastreicher, früher sichtbar.', '**Rückmeldung (Feedback):** Jede Aktion hat sichtbare Wirkung ("Gespeichert", Ladebalken).', '**Minimalismus:** Nur zeigen, was gerade gebraucht wird.', '**Erkennen statt Erinnern:** Optionen anzeigen (Auswahlliste), statt auswendiges Wissen zu verlangen.', '**Sinnvolle Standardwerte:** Vorbelegte Felder sparen Eingaben.']],
  ['h', 'Barrierefreiheit'],
  ['p', '**Barrierefreiheit** (Accessibility) bedeutet: Auch Menschen mit **Seh-, Hör-, Bewegungs- oder kognitiven Einschränkungen** können die Software nutzen. Das hilft allen: Untertitel nutzt auch, wer ohne Ton im Zug sitzt. Der Standard sind die **WCAG** (Web Content Accessibility Guidelines). Sie folgen dem Prinzip **POUR**:'],
  ['table', ['Prinzip', 'Bedeutung', 'Konkrete Maßnahmen'], [
    ['**P**erceivable (wahrnehmbar)', 'Inhalte müssen für alle Sinne zugänglich sein.', 'Alternativtexte für Bilder, Untertitel für Videos, ausreichender Farbkontrast (mindestens 4,5:1), nicht nur Farbe als Information'],
    ['**O**perable (bedienbar)', 'Bedienung muss auf verschiedene Arten möglich sein.', 'Alles per Tastatur erreichbar, sichtbarer Fokus, keine Zeitlimits ohne Verlängerung, keine Blitzeffekte'],
    ['**U**nderstandable (verständlich)', 'Inhalt und Bedienung sind klar.', 'Einfache Sprache, vorhersehbares Verhalten, Fehlerhinweise mit Lösung, Sprache der Seite angeben'],
    ['**R**obust', 'Funktioniert mit vielen Geräten und Hilfstechniken.', 'Gültiger Code, semantische Elemente, ARIA-Attribute für Screenreader'],
  ]],
  ['kv', [
    ['Screenreader', 'Programm, das den Bildschirminhalt vorliest. Braucht saubere Struktur und Alternativtexte.'],
    ['Farbkontrast', 'Verhältnis zwischen Text- und Hintergrundfarbe. Wichtig bei Sehschwäche und Sonnenlicht.'],
    ['Tastaturbedienung', 'Alle Funktionen über Tab, Enter, Leertaste erreichbar. Wichtig für Menschen, die keine Maus nutzen können.'],
    ['Skalierbarkeit', 'Schrift lässt sich ohne Informationsverlust auf 200 Prozent vergrößern.'],
  ]],
  ['h', 'Rechtlicher Rahmen'],
  ['table', ['Vorschrift', 'Gilt für', 'Inhalt'], [
    ['BITV 2.0 (Barrierefreie-Informationstechnik-Verordnung)', 'Öffentliche Stellen (Behörden)', 'Websites und Apps müssen barrierefrei sein (Basis: WCAG, EN 301 549).'],
    ['BFSG (Barrierefreiheitsstärkungsgesetz)', 'Bestimmte Produkte und Dienstleistungen privater Anbieter, zum Beispiel Online-Shops, Bankdienste, E-Books, ab dem 28. Juni 2025', 'Setzt den European Accessibility Act um. Kleinstunternehmen für Dienstleistungen teilweise ausgenommen.'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Eine Anwendung zeigt bei einem Eingabefehler nur "Error 17" an. Gegen welchen Grundsatz der Dialoggestaltung verstößt das? Wie lässt sich das verbessern?', ['Verstoß gegen **Selbstbeschreibungsfähigkeit** und **Fehlertoleranz**: Der Benutzer erfährt nicht, was falsch ist und wie er es korrigiert.', '**Verbesserung:** Eine verständliche Meldung am Eingabefeld, zum Beispiel "Die Postleitzahl muss aus 5 Ziffern bestehen." Die bereits eingegebenen Daten bleiben erhalten.'], 4],
  ['qa', 'Nennen Sie vier Maßnahmen, um eine Webanwendung barrierefrei zu gestalten.', ['- Alternativtexte für Bilder (für Screenreader)', '- Ausreichender Farbkontrast, Information nicht nur durch Farbe', '- Vollständige Bedienung per Tastatur mit sichtbarem Fokus', '- Skalierbare Schrift und klare, verständliche Sprache', '- Semantisch korrektes HTML und Beschriftung von Formularfeldern'], 4],
  ['qa', 'Ordnen Sie den Grundsätzen je ein Beispiel zu: a) Erwartungskonformität, b) Individualisierbarkeit.', ['- a) Das Symbol für Drucken und die Tastenkombination Strg+P funktionieren in allen Fenstern gleich.', '- b) Der Benutzer kann die Schriftgröße und das Farbschema (Hell/Dunkel) einstellen.'], 4],
  ['quiz', [
    {q: 'Welche Normenreihe regelt die Ergonomie der Mensch-System-Interaktion?', o: ['DIN EN ISO 9241', 'ISO 27001', 'DIN 5008', 'ISO 9001'], a: 0, e: 'ISO 9241 beschreibt Ergonomie der Mensch-System-Interaktion. ISO 27001 ist Informationssicherheit, DIN 5008 Schreibregeln, ISO 9001 Qualitätsmanagement.'},
    {q: 'Ein Assistent hat keine Zurück-Schaltfläche. Gegen welchen Grundsatz verstößt er?', o: ['Steuerbarkeit', 'Individualisierbarkeit', 'Aufgabenangemessenheit', 'Keinen'], a: 0, e: 'Der Benutzer muss Reihenfolge und Tempo steuern können, also auch zurückgehen.'},
    {q: 'Wofür steht das P in POUR?', o: ['Perceivable (wahrnehmbar)', 'Programmierbar', 'Performant', 'Priorisiert'], a: 0, e: 'POUR: Perceivable, Operable, Understandable, Robust.'},
    {q: 'Wozu dienen Alternativtexte bei Bildern?', o: ['Damit Screenreader den Bildinhalt vorlesen können', 'Zum Verschönern', 'Zum Verkleinern der Datei', 'Als Passwort'], a: 0, e: 'Alternativtexte machen Bildinhalte für blinde Menschen und bei fehlenden Bildern zugänglich.'},
  ]],
]);
