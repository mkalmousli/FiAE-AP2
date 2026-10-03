(function () {
  const cls = (id, x, y, name, attrs, ops, w) => ({id, k: 'cls', x, y, w: w || 160, t: {name, attrs: attrs || [], ops}});
  const pair = (a, b, edge, cap, h) => ({w: 640, h: h || 170, cap, nodes: [a, b], edges: [edge]});
  AP2.add('ps-klassen', [
    ['h3', 'Aggregation: "hat ein" (loses Ganzes-Teil)'],
    ['p', 'Ein **Ganzes** besteht aus **Teilen**, aber die Teile können auch **ohne das Ganze existieren** und von mehreren Ganzen genutzt werden. Zeichen: **leere Raute** beim Ganzen. Beispiel: Eine Abteilung hat Mitarbeiter. Wird die Abteilung aufgelöst, existieren die Mitarbeiter weiter.'],
    ['diagram', pair(cls('g', 120, 80, 'Abteilung', ['- name: String']), cls('t', 520, 80, 'Mitarbeiter', ['- name: String']), {a: 'g', b: 't', sa: 'dia', ea: 'none', ta: '1', tb: '0..*'}, 'Aggregation: Die Mitarbeiter überleben die Abteilung.', 150)],
    ['h3', 'Komposition: "besteht aus" (starke Abhängigkeit)'],
    ['p', 'Wie Aggregation, aber **die Teile gehören exklusiv zum Ganzen** und **verschwinden mit ihm**. Zeichen: **volle (ausgefüllte) Raute** beim Ganzen. Beispiel: Ein Haus besteht aus Zimmern. Wird das Haus abgerissen, gibt es die Zimmer nicht mehr.'],
    ['diagram', pair(cls('g', 120, 80, 'Haus', ['- adresse: String']), cls('t', 520, 80, 'Zimmer', ['- flaeche: double']), {a: 'g', b: 't', sa: 'diaf', ea: 'none', ta: '1', tb: '1..*'}, 'Komposition: Zimmer existieren nur als Teil des Hauses.', 150)],
    ['h3', 'Vererbung (Generalisierung): "ist ein"'],
    ['p', 'Eine **Unterklasse** (Subklasse) erbt Attribute und Methoden der **Oberklasse** (Superklasse) und kann sie ergänzen oder ändern. Zeichen: **durchgezogene Linie mit leerem Dreieck**, das Dreieck zeigt zur Oberklasse. Test: Stimmt der Satz "Ein Auto **ist ein** Fahrzeug"? Dann passt Vererbung.'],
    ['diagram', {w: 640, h: 260, cap: 'Vererbung: Auto und Fahrrad erben von Fahrzeug.', nodes: [cls('f', 320, 60, 'Fahrzeug', ['# geschwindigkeit: int'], ['+ beschleunigen(): void'], 220), cls('a', 150, 200, 'Auto', ['- tueren: int'], null, 170), cls('r', 490, 200, 'Fahrrad', ['- gaenge: int'], null, 170)], edges: [{a: 'a', b: 'f', ea: 'tri'}, {a: 'r', b: 'f', ea: 'tri'}]}],
    ['h3', 'Abhängigkeit und Realisierung'],
    ['diagram', {w: 640, h: 190, cap: 'Links: Abhängigkeit (Klasse benutzt kurz eine andere). Rechts: Realisierung (Klasse implementiert Interface).', nodes: [cls('d1', 90, 90, 'Rechnung', null, null, 130), cls('d2', 250, 90, 'Drucker', null, null, 130), cls('i', 500, 50, '«interface»\nSpeicherbar', null, ['+ speichern(): void'], 160), cls('c', 500, 150, 'Kunde', null, ['+ speichern(): void'], 160)], edges: [{a: 'd1', b: 'd2', k: 'dash', ea: 'open', t: 'benutzt'}, {a: 'c', b: 'i', k: 'dash', ea: 'tri'}]}],
    ['table', ['Beziehung', 'Symbol', 'Bedeutung', 'Beispiel', 'Merksatz'], [
      ['Assoziation', 'Linie', 'kennt, nutzt', 'Person besitzt Auto', 'Verbindung'],
      ['Aggregation', 'Leere Raute', 'hat (Teil lebt auch allein)', 'Abteilung - Mitarbeiter', 'schwach'],
      ['Komposition', 'Volle Raute', 'besteht aus (Teil stirbt mit)', 'Haus - Zimmer', 'stark'],
      ['Vererbung', 'Leeres Dreieck', 'ist ein', 'Auto ist ein Fahrzeug', 'Spezialisierung'],
      ['Realisierung', 'Gestrichelt, leeres Dreieck', 'implementiert', 'Klasse - Interface', 'Vertrag erfüllen'],
      ['Abhängigkeit', 'Gestrichelter Pfeil', 'benutzt kurzzeitig', 'Rechnung - Drucker', 'schwächste'],
    ]],
    ['warn', 'Klassische Prüfungsfalle: Die Raute sitzt am **Ganzen**, nicht am Teil. Und: Aggregation (leer) ist **nicht** das Gleiche wie Komposition (voll). Frage dich: "Kann das Teil ohne das Ganze weiterleben?" Ja = Aggregation, Nein = Komposition.'],
    ['h', 'Multiplizitäten lesen'],
    ['p', 'Die Zahl an einem Linienende sagt, **wie viele Objekte dieser Klasse** an einem Objekt der anderen Klasse hängen können. Lies **von der anderen Seite aus**. Beispiel "Kunde 1 --- 0..* Bestellung": Ein Kunde kann null bis viele Bestellungen haben. Jede Bestellung gehört zu genau einem Kunden.'],
    ['table', ['Schreibweise', 'Bedeutung'], [['1', 'genau ein Objekt'], ['0..1', 'kein oder ein Objekt (optional)'], ['*  oder  0..*', 'beliebig viele, auch keines'], ['1..*', 'mindestens eines'], ['3..5', 'zwischen drei und fünf']]],
  ]);
})();
