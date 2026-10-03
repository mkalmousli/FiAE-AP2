AP2.page('ps-er', {
  b: 'ps', g: 'Datenmodellierung', t: 'ER-Modell (Entity-Relationship)',
  d: 'Das **ER-Modell** beschreibt die Daten eines Systems: **Entitäten** (Dinge, über die man Daten speichert), ihre **Attribute** (Eigenschaften) und die **Beziehungen** zwischen ihnen mit **Kardinalitäten** (1:1, 1:n, n:m). Es ist die Grundlage für den Datenbankentwurf.',
  m: '**Entität = Substantiv (Kunde), Beziehung = Verb (bestellt), Attribut = Eigenschaft (Name).** Kardinalität: Wie viele Objekte auf der einen Seite gehören zu einem Objekt der anderen Seite? **1:1, 1:n, n:m.** n:m braucht später eine Zwischentabelle.',
  cheat: [
    ['Bausteine (Chen)', ['**Entität:** Rechteck', '**Beziehung:** Raute', '**Attribut:** Oval, Schlüssel unterstrichen', '**Kardinalität:** 1, n oder m an der Linie']],
    ['Kardinalitäten', ['**1:1** eine Person - ein Reisepass', '**1:n** ein Kunde - viele Bestellungen', '**n:m** viele Studierende - viele Kurse']],
    ['(min,max)-Notation', ['**(0,1)** optional, höchstens eins', '**(1,1)** genau eins, Pflicht', '**(0,n)** beliebig viele, auch keins', '**(1,n)** mindestens eins']],
    ['Schlüssel', ['**Primärschlüssel (PK):** eindeutig identifiziert eine Zeile', '**Fremdschlüssel (FK):** verweist auf PK einer anderen Tabelle', 'Surrogatschlüssel: künstliche ID (zum Beispiel Auto-Zähler)']],
  ],
  blocks: [
    ['h', 'Warum ein ER-Modell?'],
    ['p', 'Bevor man eine Datenbank baut, muss man klären: **Welche Dinge** muss das System speichern? **Welche Eigenschaften** haben sie? **Wie hängen sie zusammen?** Das ER-Modell beantwortet das als Zeichnung, die Fachleute und Entwickler gemeinsam lesen können. Danach wird es **mechanisch in Tabellen übersetzt** (siehe Seite "Relationales Modell").'],
    ['h', 'Die Bausteine'],
    ['kv', [
      ['Entität (Entity)', 'Ein Objekt der realen Welt, über das Daten gespeichert werden: Kunde, Artikel, Bestellung. Eine **Entitätsmenge** (Typ) hat viele **Entitäten** (Einzelfälle: Kunde Meier, Kunde Schulz).'],
      ['Attribut', 'Eine Eigenschaft einer Entität: Name, Geburtsdatum, Preis. Das Attribut, das jede Entität **eindeutig** identifiziert, ist der **Primärschlüssel** (wird unterstrichen).'],
      ['Beziehung (Relationship)', 'Verbindung zwischen Entitäten. Name meist ein Verb: Kunde **bestellt** Artikel. Beziehungen können eigene Attribute haben (zum Beispiel "Menge" bei der Beziehung zwischen Bestellung und Artikel).'],
      ['Kardinalität', 'Zahl, die angibt, wie viele Entitäten an der Beziehung teilnehmen können.'],
    ]],
    ['h', 'Beispiel in Chen-Notation'],
    ['diagram', {w: 760, h: 300, keep: 600, cap: 'Chen-Notation: Entitäten als Rechtecke, Beziehung als Raute, Attribute als Ovale. Ein Kunde gibt viele Bestellungen auf, jede Bestellung gehört zu einem Kunden. Die dunklen Ovale sind die Primärschlüssel (in der Prüfung werden sie unterstrichen).', nodes: [
      {id: 'kunde', k: 'box', x: 150, y: 170, t: 'Kunde', w: 130, h: 50, s: 'accent', b: true}, {id: 'rel', k: 'diamond', x: 380, y: 170, t: 'gibt auf', w: 130, h: 70}, {id: 'best', k: 'box', x: 610, y: 170, t: 'Bestellung', w: 140, h: 50, s: 'accent', b: true},
      {id: 'a1', k: 'oval', x: 60, y: 60, t: 'KundenNr', w: 100, h: 40, s: 'solid'}, {id: 'a2', k: 'oval', x: 170, y: 40, t: 'Name', w: 90, h: 38}, {id: 'a3', k: 'oval', x: 60, y: 280, t: 'E-Mail', w: 90, h: 38},
      {id: 'b1', k: 'oval', x: 560, y: 60, t: 'BestellNr', w: 110, h: 40, s: 'solid'}, {id: 'b2', k: 'oval', x: 680, y: 60, t: 'Datum', w: 90, h: 38}, {id: 'b3', k: 'oval', x: 670, y: 280, t: 'Summe', w: 90, h: 38},
    ], edges: [
      {a: 'kunde', b: 'rel', ea: 'none', ta: '1'}, {a: 'rel', b: 'best', ea: 'none', ta: 'n'},
      {a: 'kunde', b: 'a1', ea: 'none'}, {a: 'kunde', b: 'a2', ea: 'none'}, {a: 'kunde', b: 'a3', ea: 'none'}, {a: 'best', b: 'b1', ea: 'none'}, {a: 'best', b: 'b2', ea: 'none'}, {a: 'best', b: 'b3', ea: 'none'},
    ]}],
    ['note', 'In der Prüfung wird oft die **Krähenfuß-Notation** (Information Engineering) verwendet, bei der Attribute direkt im Entitätskasten stehen und die Kardinalität am Linienende. Beide Schreibweisen bedeuten dasselbe. Wichtig ist: Du musst die vorgegebene Notation lesen können.'],
    ['h', 'Kardinalitäten verstehen'],
    ['p', 'Stelle dir für jede Richtung eine Frage. Beispiel Kunde und Bestellung: "Wie viele Bestellungen kann **ein** Kunde haben?" Antwort: beliebig viele (n). "Wie viele Kunden hat **eine** Bestellung?" Antwort: genau einen (1). Also ist die Beziehung **1:n**.'],
    ['table', ['Typ', 'Bedeutung', 'Beispiel', 'Später in der Datenbank'], [
      ['**1:1**', 'Jedem A ist höchstens ein B zugeordnet und umgekehrt.', 'Mitarbeiter - Parkplatz, Person - Reisepass', 'Fremdschlüssel in einer Tabelle (mit UNIQUE) oder Tabellen zusammenlegen'],
      ['**1:n**', 'Einem A sind viele B zugeordnet, jedem B genau ein A.', 'Kunde - Bestellung, Abteilung - Mitarbeiter', 'Fremdschlüssel in der Tabelle der **n-Seite**'],
      ['**n:m**', 'Vielen A sind viele B zugeordnet.', 'Student - Kurs, Artikel - Bestellung', 'Eigene **Zwischentabelle** (Verbindungstabelle)'],
    ]],
    ['h3', '(min,max)-Notation'],
    ['p', 'Genauer ist die (min,max)-Angabe. Sie sagt, wie viele Beziehungen eine Entität **mindestens** und **höchstens** haben muss. Beispiel: Kunde **(0,n)** bestellt: Ein Kunde kann null bis viele Bestellungen haben (auch noch gar keine). Bestellung **(1,1)** gehört zu: Jede Bestellung gehört zu **genau einem** Kunden (Pflicht).'],
    ['warn', 'Achte auf die Leserichtung! In der (min,max)-Notation steht die Angabe **bei der Entität, deren Teilnahme sie beschreibt**. In der 1:n-Notation steht sie am **gegenüberliegenden** Ende. Bei Krähenfuß-Diagrammen lies immer: "Ein [Entität am Anfang] hat ... [Symbol am anderen Ende] [Entität am Ende]".'],
  ],
});
