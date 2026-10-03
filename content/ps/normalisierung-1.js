AP2.page('ps-normalisierung', {
  b: 'ps', g: 'Datenmodellierung', t: 'Normalisierung (1NF bis 3NF)',
  d: '**Normalisierung** zerlegt Tabellen schrittweise so, dass **Redundanz** (doppelte Daten) und **Anomalien** (Fehler beim Einfügen, Ändern, Löschen) vermieden werden. **1NF:** nur atomare Werte. **2NF:** zusätzlich keine teilweise Abhängigkeit vom Schlüssel. **3NF:** zusätzlich keine Abhängigkeit zwischen Nicht-Schlüssel-Attributen.',
  m: '**"Der Schlüssel, der ganze Schlüssel und nichts als der Schlüssel."** 1NF: atomar (Ein Wert pro Zelle). 2NF: **ganzer** Schlüssel (kein Teil davon reicht aus). 3NF: **nichts als** der Schlüssel (keine Kette A zu B zu C).',
  cheat: [
    ['1. Normalform', ['Jede Zelle hat **genau einen Wert** (atomar)', 'Keine Listen, keine Wiederholungsgruppen', 'Jede Zeile ist eindeutig (Primärschlüssel)', 'Lösung: Zeilen aufteilen oder Tabelle auslagern']],
    ['2. Normalform', ['1NF erfüllt', 'Jedes Nicht-Schlüssel-Attribut hängt vom **gesamten** Schlüssel ab', 'Relevant nur bei **zusammengesetztem** Schlüssel', 'Lösung: Teilabhängige Attribute auslagern']],
    ['3. Normalform', ['2NF erfüllt', 'Keine **transitiven** Abhängigkeiten: A bestimmt B, B bestimmt C', 'Nicht-Schlüssel hängen nur vom Schlüssel ab', 'Lösung: B und C in eigene Tabelle']],
    ['Anomalien', ['**Einfügeanomalie:** neue Daten brauchen unnötig andere Daten', '**Änderungsanomalie:** eine Änderung an mehreren Stellen nötig', '**Löschanomalie:** beim Löschen gehen andere Daten verloren']],
  ],
  blocks: [
    ['h', 'Warum normalisieren?'],
    ['p', 'Stell dir eine einzige große Tabelle für alle Bestellungen vor. Bei jeder Bestellung stehen Name, Adresse und Ort des Kunden. Probleme: Zieht ein Kunde um, muss man **viele Zeilen ändern** (Änderungsanomalie). Vergisst man eine, gibt es **widersprüchliche Daten**. Man kann keinen neuen Kunden speichern, der noch nichts bestellt hat (Einfügeanomalie). Löscht man die einzige Bestellung eines Kunden, ist der Kunde **ganz weg** (Löschanomalie). Normalisierung löst diese Probleme.'],
    ['h', 'Wichtiger Begriff: funktionale Abhängigkeit'],
    ['p', 'Ein Attribut B ist **funktional abhängig** von A (Schreibweise A → B), wenn zu jedem Wert von A **genau ein** Wert von B gehört. Beispiel: KundenNr → Name, denn jede KundenNr hat genau einen Namen. Umgekehrt (Name → KundenNr) gilt nicht unbedingt, denn zwei Kunden können Meier heißen.'],
    ['h', 'Ausgangstabelle (nicht normalisiert)'],
    ['p', 'Eine Firma speichert Aufträge in einer Tabelle. In einer Zelle stehen mehrere Artikel:'],
    ['table', ['AuftragNr', 'Datum', 'KundenNr', 'KundenName', 'PLZ', 'Ort', 'Artikel (mehrere)'], [
      ['1001', '05.01.2026', 'K1', 'Meier', '73033', 'Göppingen', 'A1 Maus (2), A2 Tastatur (1)'],
      ['1002', '07.01.2026', 'K2', 'Schulz', '73033', 'Göppingen', 'A1 Maus (5)'],
      ['1003', '09.01.2026', 'K1', 'Meier', '73033', 'Göppingen', 'A3 Monitor (1), A2 Tastatur (2)'],
    ], {first: false}],
    ['h3', 'Schritt 1: Erste Normalform (1NF)'],
    ['p', 'Problem: In der Spalte "Artikel" stehen **mehrere Werte in einer Zelle**. Das ist nicht atomar. Lösung: **Jede Position bekommt eine eigene Zeile.** Ein neuer Primärschlüssel entsteht: **(AuftragNr, ArtikelNr)**, denn ein Auftrag hat mehrere Zeilen.'],
    ['table', ['AuftragNr', 'ArtikelNr', 'Datum', 'KundenNr', 'KundenName', 'PLZ', 'Ort', 'ArtikelName', 'Menge'], [
      ['1001', 'A1', '05.01.2026', 'K1', 'Meier', '73033', 'Göppingen', 'Maus', '2'],
      ['1001', 'A2', '05.01.2026', 'K1', 'Meier', '73033', 'Göppingen', 'Tastatur', '1'],
      ['1002', 'A1', '07.01.2026', 'K2', 'Schulz', '73033', 'Göppingen', 'Maus', '5'],
      ['1003', 'A3', '09.01.2026', 'K1', 'Meier', '73033', 'Göppingen', 'Monitor', '1'],
      ['1003', 'A2', '09.01.2026', 'K1', 'Meier', '73033', 'Göppingen', 'Tastatur', '2'],
    ], {first: false}],
    ['note', 'Jetzt ist die Tabelle in **1NF**. Aber sie ist noch voller Redundanz: Der Name "Meier" steht mehrfach, "Maus" ebenfalls.'],
  ],
});
