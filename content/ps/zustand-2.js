AP2.add('ps-zustand', [
  ['h', 'Zweites Beispiel: Anmeldung mit Sperre'],
  ['diagram', {w: 720, h: 260, cap: 'Nach drei Fehlversuchen wird das Konto gesperrt.', nodes: [
    {id: 's', k: 'dot', x: 40, y: 90}, {id: 'a', k: 'round', x: 190, y: 90, t: 'Abgemeldet', w: 140, h: 44, s: 'accent'}, {id: 'b', k: 'round', x: 460, y: 90, t: 'Angemeldet', w: 140, h: 44, s: 'ok'},
    {id: 'g', k: 'round', x: 190, y: 210, t: 'Gesperrt', w: 140, h: 44, s: 'bad'}, {id: 'e', k: 'ring', x: 640, y: 210},
  ], edges: [
    {a: 's', b: 'a'}, {a: 'a', b: 'b', t: 'login [passwort ok]'}, {a: 'b', b: 'a', via: [[460, 150], [190, 150]], t: 'logout', lo: [0, 10]},
    {a: 'a', b: 'a', via: [[130, 40], [250, 40]], t: 'login [falsch] / fehler++', lo: [0, -3]}, {a: 'a', b: 'g', t: '[fehler = 3]', lo: [-42, 0]}, {a: 'g', b: 'e', t: 'admin_entsperrt', lo: [0, -10]},
  ]}],
  ['h', 'Zustandsdiagramm im Code'],
  ['p', 'Ein Zustandsautomat lässt sich mit einer **Aufzählung (enum)** und einer **Fallunterscheidung (switch)** umsetzen. Jeder Zustand ist ein Wert, jedes Ereignis eine Methode, die je nach aktuellem Zustand den neuen bestimmt.'],
  ['code', 'java', `enum Status { NEU, BEZAHLT, VERSANDT, GELIEFERT, STORNIERT }

class Bestellung {
    private Status status = Status.NEU;

    void zahlungErhalten() {
        if (status == Status.NEU) status = Status.BEZAHLT;
        else throw new IllegalStateException("Nur neue Bestellungen können bezahlt werden");
    }
    void stornieren() {
        if (status == Status.NEU || status == Status.BEZAHLT) status = Status.STORNIERT;
        else throw new IllegalStateException("Stornierung nicht mehr möglich");
    }
}`],
  ['table', ['Frage', 'Zustandsdiagramm', 'Aktivitätsdiagramm'], [
    ['Steht im Mittelpunkt', 'Der Zustand eines Objekts', 'Der Ablauf von Aktionen'],
    ['Pfeil bedeutet', 'Zustandswechsel durch ein Ereignis', 'Nächster Schritt im Ablauf'],
    ['Typisches Beispiel', 'Bestellung: neu, bezahlt, versandt', 'Ablauf der Bestellbearbeitung'],
    ['Wartet auf Ereignisse', 'Ja, Zustände warten auf Auslöser', 'Nein, Aktionen folgen aufeinander'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Eine Tür kann offen, geschlossen oder verriegelt sein. Mit "schließen" wird sie geschlossen, mit "öffnen" geöffnet, mit "verriegeln" nur im geschlossenen Zustand verriegelt, mit "entriegeln" wieder geschlossen. Geben Sie die Zustände und Übergänge an.', ['**Zustände:** Offen, Geschlossen, Verriegelt. **Startzustand:** Geschlossen (oder Offen, je nach Aufgabe).', '**Übergänge:**', '- Offen --schließen--> Geschlossen', '- Geschlossen --öffnen--> Offen', '- Geschlossen --verriegeln--> Verriegelt', '- Verriegelt --entriegeln--> Geschlossen', 'Aus Verriegelt führt **kein** Übergang direkt nach Offen (öffnen ist dort nicht erlaubt).'], 6],
  ['qa', 'Was bedeutet die Beschriftung "bezahlen [guthaben >= preis] / guthaben = guthaben - preis"?', 'Das **Ereignis** "bezahlen" löst den Übergang aus, aber nur, wenn die **Bedingung** (Guard) "guthaben >= preis" wahr ist. Beim Übergang wird die **Aktion** ausgeführt: Das Guthaben wird um den Preis verringert.', 3],
  ['quiz', [
    {q: 'Was bedeutet der ausgefüllte Kreis im Zustandsdiagramm?', o: ['Startzustand', 'Endzustand', 'Entscheidung', 'Fehler'], a: 0, e: 'Der ausgefüllte Kreis markiert den Startzustand (Initialzustand).'},
    {q: 'Wo steht die Bedingung (Guard) an einem Übergang?', o: ['In eckigen Klammern', 'In runden Klammern', 'Nach einem Semikolon', 'Im Zustand'], a: 0, e: 'Guards stehen in eckigen Klammern: Ereignis [Bedingung] / Aktion.'},
    {q: 'In wie vielen Zuständen ist ein Objekt gleichzeitig (einfacher Zustandsautomat)?', o: ['In genau einem', 'In allen', 'In keinem', 'In zwei'], a: 0, e: 'Ein Objekt ist zu jedem Zeitpunkt in genau einem Zustand.'},
    {q: 'Was löst einen Übergang aus?', o: ['Ein Ereignis', 'Die Farbe', 'Das Betriebssystem', 'Die Datenbank immer'], a: 0, e: 'Übergänge werden durch Ereignisse ausgelöst (optional mit Bedingung).'},
  ]],
]);
