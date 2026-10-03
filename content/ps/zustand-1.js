AP2.page('ps-zustand', {
  b: 'ps', g: 'UML-Modellierung', t: 'Zustandsdiagramm',
  d: 'Ein **Zustandsdiagramm** (Zustandsautomat) zeigt die **Zustände**, die ein Objekt im Laufe seines Lebens annehmen kann, und die **Übergänge** (Transitionen) zwischen ihnen, ausgelöst durch **Ereignisse**. Es beschreibt das Verhalten **eines** Objekts.',
  m: '**Zustand = Rechteck mit runden Ecken, Übergang = Pfeil mit Beschriftung Ereignis [Bedingung] / Aktion.** Start = gefüllter Punkt, Ende = Kreis mit Punkt. Ein Objekt ist zu jedem Zeitpunkt in **genau einem** Zustand.',
  cheat: [
    ['Elemente', ['**Zustand:** abgerundetes Rechteck', '**Startzustand:** gefüllter Kreis', '**Endzustand:** Kreis mit Punkt', '**Übergang:** Pfeil']],
    ['Beschriftung', ['**Ereignis** [Bedingung] / Aktion', 'Ereignis: was passiert (zahlung_eingegangen)', '**Guard** in []: nur wenn die Bedingung gilt', 'Aktion nach dem /: wird beim Übergang ausgeführt']],
    ['Zustandsaktionen', ['**entry:** beim Betreten', '**do:** solange im Zustand', '**exit:** beim Verlassen']],
    ['Wann benutzen?', ['Objekte mit Lebenszyklus (Bestellung, Konto)', 'Bedienoberflächen, Automaten, Protokolle']],
  ],
  blocks: [
    ['h', 'Was ist ein Zustand?'],
    ['p', 'Viele Objekte verhalten sich **abhängig von ihrem Zustand**. Eine Bestellung kann "neu", "bezahlt", "versandt" oder "storniert" sein. Im Zustand "versandt" darf man sie nicht mehr ändern, im Zustand "neu" schon. Das Zustandsdiagramm zeigt alle Zustände und **wie man von einem zum anderen kommt**.'],
    ['h', 'Beispiel: Lebenszyklus einer Bestellung'],
    ['diagram', {w: 760, h: 330, keep: 640, cap: 'Zustandsdiagramm einer Bestellung. Der Übergang trägt das auslösende Ereignis.', nodes: [
      {id: 's', k: 'dot', x: 50, y: 70}, {id: 'neu', k: 'round', x: 190, y: 70, t: 'Neu', w: 120, h: 44, s: 'accent'}, {id: 'bez', k: 'round', x: 410, y: 70, t: 'Bezahlt', w: 130, h: 44, s: 'accent'},
      {id: 'ver', k: 'round', x: 620, y: 70, t: 'Versandt', w: 130, h: 44, s: 'accent'}, {id: 'gel', k: 'round', x: 620, y: 190, t: 'Geliefert', w: 130, h: 44, s: 'ok'},
      {id: 'sto', k: 'round', x: 300, y: 210, t: 'Storniert', w: 130, h: 44, s: 'bad'}, {id: 'e1', k: 'ring', x: 620, y: 290}, {id: 'e2', k: 'ring', x: 300, y: 290},
    ], edges: [
      {a: 's', b: 'neu'}, {a: 'neu', b: 'bez', t: 'zahlung_erhalten'}, {a: 'bez', b: 'ver', t: 'versendet / E-Mail senden'}, {a: 'ver', b: 'gel', t: 'zugestellt', lo: [44, 0]},
      {a: 'neu', b: 'sto', t: 'storniert', lo: [-36, 0]}, {a: 'bez', b: 'sto', t: 'storniert [nicht versandt]', lo: [60, 4]}, {a: 'gel', b: 'e1'}, {a: 'sto', b: 'e2'},
      {a: 'neu', b: 'neu', via: [[190, 30], [250, 30]], t: 'artikel_ändern', lo: [0, -2]},
    ]}],
    ['p', 'Lies: Eine neue Bestellung ist im Zustand **Neu**. Das Ereignis **zahlung_erhalten** führt zu **Bezahlt**. Von dort führt **versendet** zu **Versandt**, wobei als Aktion eine E-Mail gesendet wird. Im Zustand Neu oder Bezahlt kann die Bestellung **storniert** werden, aber **nur wenn sie noch nicht versandt** ist (Bedingung in eckigen Klammern). Die Schleife am Zustand Neu ist ein Übergang, der im selben Zustand bleibt.'],
    ['h', 'Beschriftung eines Übergangs'],
    ['code', 'text', `Ereignis [Bedingung] / Aktion

Beispiele:
  zahlung_erhalten
  storniert [nicht versandt]
  versendet / E-Mail senden
  pin_eingegeben [pin_falsch und versuche < 3] / versuche = versuche + 1`],
    ['kv', [
      ['Ereignis (Trigger)', 'Auslöser des Übergangs. Beispiel: Methodenaufruf, Benutzeraktion, Zeit.'],
      ['Bedingung (Guard)', 'In eckigen Klammern. Der Übergang findet nur statt, wenn sie wahr ist. Mehrere Übergänge mit demselben Ereignis müssen sich durch Guards ausschließen.'],
      ['Aktion (Effect)', 'Nach dem Schrägstrich. Wird beim Übergang einmal ausgeführt.'],
      ['entry / do / exit', 'Innerhalb des Zustands: entry läuft beim Betreten, do solange man drin ist, exit beim Verlassen.'],
    ]],
  ],
});
