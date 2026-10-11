AP2.page('ps-ermrm', {
  b: 'ps', g: 'Datenmodellierung', t: 'ERM und RM: Unterschied und Umwandlung Schritt für Schritt',
  d: 'Das **ERM (Entity-Relationship-Modell)** ist eine **Zeichnung**: Es zeigt, **welche Dinge** gespeichert werden (Entitätstypen), **welche Eigenschaften** sie haben (Attribute) und **wie sie zusammenhängen** (Beziehungen mit Kardinalitäten). Das **RM (Relationenmodell, relationales Modell)** ist die **Textform als Tabellen**: jede Relation mit ihren Attributen, **Primärschlüsseln** und **Fremdschlüsseln**. Das ERM ist der **konzeptionelle** Entwurf (was?), das RM der **logische** Entwurf (welche Tabellen?).',
  m: '**ERM = Bild, RM = Tabellenliste.** Im ERM gibt es **keine Fremdschlüssel**, dort steht eine **Linie**. Im RM gibt es **keine Linien**, dort steht ein **Fremdschlüssel**. Umwandlung: **Kasten wird Tabelle, Linie wird Fremdschlüssel (auf der n-Seite), n:m wird eigene Tabelle.**',
  cheat: [
    ['ERM (Entity-Relationship-Modell)', ['**Zeichnung**, unabhängig von der Datenbank', '**Entitätstyp:** Rechteck (Kunde)', '**Attribut:** Eigenschaft, Schlüssel unterstrichen', '**Beziehung:** Linie oder Raute mit **Kardinalität**', '**n:m ist erlaubt**, Fremdschlüssel gibt es nicht']],
    ['RM (Relationenmodell)', ['**Text**: Relation(Attribute)', '**Primärschlüssel unterstrichen**', '**Fremdschlüssel** markiert (#, FK, gestrichelt, kursiv)', '**Kein n:m** mehr: aufgelöst in eine Zwischentabelle', 'Vorlage für `CREATE TABLE`']],
    ['ERM in RM umwandeln', ['Entitätstyp: **eine Relation**', 'Attribute übernehmen, **PK festlegen**', '**1:n:** PK der 1-Seite als **FK auf die n-Seite**', '**n:m:** neue Relation mit **beiden FK** (zusammen PK)', '**1:1:** FK auf eine Seite (UNIQUE) oder zusammenlegen', 'Attribute der Beziehung wandern mit dem FK mit']],
    ['Prüfungsfehler', ['Fremdschlüssel im ERM eingezeichnet', 'FK auf der **1-Seite** statt auf der n-Seite', 'n:m ohne Zwischentabelle', 'PK nicht unterstrichen, FK nicht markiert', 'Kardinalität nur in eine Richtung geprüft']],
  ],
  blocks: [
    ['h', 'Worum geht es?'],
    ['p', 'In fast jeder Abschlussprüfung kommt eine dieser Aufgaben: "**Erstellen Sie ein ERM**", "**Überführen Sie das ERM in ein Relationenmodell**" oder "**Ergänzen Sie das Relationenmodell in der 3. Normalform**". ERM und RM beschreiben **dieselben Daten**, aber auf zwei verschiedenen Stufen des Datenbankentwurfs. Wer die beiden Stufen verwechselt, verliert Punkte, obwohl er den Inhalt verstanden hat.'],
    ['diagram', AP2.dg.flow(['Fachtext (Anforderung)', 'ERM (Zeichnung)', 'RM (Tabellen als Text)', 'SQL (CREATE TABLE)'], {w: 780, h: 120, bw: 170, styles: ['soft', 'accent', 'accent', 'ok'], edgeText: ['modellieren', 'umwandeln', 'umsetzen'], cap: 'Die drei Entwurfsstufen: konzeptionell (ERM), logisch (RM), physisch (SQL in einem konkreten Datenbanksystem).'})],
    ['table', ['', 'ERM', 'RM'], [
      ['Ausgeschrieben', 'Entity-Relationship-Modell', 'Relationenmodell (relationales Modell, Relationenschema)'],
      ['Entwurfsstufe', '**konzeptionell**: Was soll gespeichert werden?', '**logisch**: Welche Tabellen mit welchen Schlüsseln?'],
      ['Form', '**Diagramm** (Chen, Krähenfuß, UML-ähnlich)', '**Text**: `Relation(attribut1, attribut2, ...)`'],
      ['Bausteine', 'Entitätstyp, Attribut, Beziehung, Kardinalität', 'Relation (Tabelle), Attribut (Spalte), Primärschlüssel, Fremdschlüssel'],
      ['Beziehungen', 'als **Linie** mit 1, n, m oder (min,max)', 'als **Fremdschlüssel**, der auf einen Primärschlüssel verweist'],
      ['n:m-Beziehung', 'darf so stehen bleiben', 'muss in eine **Zwischentabelle** aufgelöst sein'],
      ['Abhängig vom DBMS?', 'nein', 'nein (erst die Datentypen im SQL sind es)'],
      ['Zielgruppe', 'Fachabteilung und Entwickler gemeinsam', 'Entwickler, Vorlage für die Datenbank'],
    ]],
    ['warn', '**Die zwei Wörter klingen ähnlich, bedeuten aber Verschiedenes:** "**Relationship**" im ERM ist die **Beziehung** zwischen zwei Entitätstypen. "**Relation**" im RM ist eine **Tabelle**. Das Relationenmodell heißt also nicht so, weil es Beziehungen zeigt, sondern weil es aus Tabellen besteht.'],
    ['h', 'Das ERM lesen und zeichnen'],
    ['kv', [
      ['Entitätstyp', 'Eine Sorte von Dingen, über die Daten gespeichert werden: Mitglied, Kurs, Trainer. Im Text meist ein **Substantiv**. Die einzelne Ausprägung heißt **Entität** (das Mitglied Jana Koch).'],
      ['Attribut', 'Eigenschaft eines Entitätstyps: name, geburtsdatum. Das **Schlüsselattribut** identifiziert jede Entität eindeutig und wird **unterstrichen**.'],
      ['Beziehung', 'Zusammenhang zwischen Entitätstypen, im Text meist ein **Verb**: Mitglied **bucht** Kurs, Trainer **leitet** Kurs. Eine Beziehung kann eigene Attribute haben (Buchungsdatum).'],
      ['Kardinalität', 'Wie viele Entitäten der anderen Seite gehören zu **einer** Entität? **1:1, 1:n, n:m**, genauer mit (min,max) oder Krähenfuß.'],
    ]],
    ['p', 'Beispieltext: "Ein Sportverein verwaltet **Mitglieder**, **Kurse** und **Trainer**. Ein Trainer leitet mehrere Kurse, jeder Kurs hat genau einen Trainer. Ein Mitglied kann mehrere Kurse buchen, ein Kurs hat mehrere Mitglieder. Zu jeder Buchung wird das Buchungsdatum gespeichert."'],
    ['diagram', {w: 780, h: 250, keep: 620, cap: 'ERM in Chen-Notation: zwei Beziehungen. "leitet" ist 1:n, "bucht" ist n:m und trägt das Attribut datum. Fremdschlüssel kommen im ERM nicht vor.', nodes: [
      {id: 't', k: 'box', x: 90, y: 90, t: 'Trainer', w: 120, h: 48, s: 'accent', b: true}, {id: 'l', k: 'diamond', x: 250, y: 90, t: 'leitet', w: 120, h: 64},
      {id: 'k', k: 'box', x: 410, y: 90, t: 'Kurs', w: 110, h: 48, s: 'accent', b: true}, {id: 'b', k: 'diamond', x: 560, y: 90, t: 'bucht', w: 120, h: 64},
      {id: 'm', k: 'box', x: 700, y: 90, t: 'Mitglied', w: 120, h: 48, s: 'accent', b: true},
      {id: 'ta', k: 'oval', x: 60, y: 200, t: 'trainer_id', w: 104, h: 38, s: 'solid'}, {id: 'tb', k: 'oval', x: 170, y: 200, t: 'name', w: 80, h: 38},
      {id: 'ka', k: 'oval', x: 350, y: 200, t: 'kurs_id', w: 90, h: 38, s: 'solid'}, {id: 'kb', k: 'oval', x: 450, y: 200, t: 'titel', w: 80, h: 38},
      {id: 'ba', k: 'oval', x: 560, y: 200, t: 'datum', w: 84, h: 38},
      {id: 'ma', k: 'oval', x: 670, y: 200, t: 'mitglied_id', w: 110, h: 38, s: 'solid'}, {id: 'mb', k: 'oval', x: 735, y: 22, t: 'name', w: 80, h: 36},
    ], edges: [
      {a: 't', b: 'l', ea: 'none', ta: '1'}, {a: 'l', b: 'k', ea: 'none', tb: 'n'}, {a: 'k', b: 'b', ea: 'none', ta: 'n'}, {a: 'b', b: 'm', ea: 'none', tb: 'm'},
      {a: 't', b: 'ta', ea: 'none'}, {a: 't', b: 'tb', ea: 'none'}, {a: 'k', b: 'ka', ea: 'none'}, {a: 'k', b: 'kb', ea: 'none'}, {a: 'b', b: 'ba', ea: 'none'}, {a: 'm', b: 'ma', ea: 'none'}, {a: 'm', b: 'mb', ea: 'none'},
    ]}],
    ['tip', 'Kardinalität **immer in beide Richtungen** fragen: "Wie viele Kurse leitet **ein** Trainer?" (viele, also n beim Kurs). "Wie viele Trainer hat **ein** Kurs?" (einen, also 1 beim Trainer). Ergebnis: Trainer **1 : n** Kurs.'],
    ['h', 'Das RM lesen und schreiben'],
    ['p', 'Im Relationenmodell wird jede Tabelle in **einer Zeile** notiert: Name der Relation, dahinter in Klammern alle Attribute. Der **Primärschlüssel wird unterstrichen**, der **Fremdschlüssel wird markiert**. Die Markierung ist nicht einheitlich: je nach Prüfung gestrichelt unterstrichen, kursiv, mit `#`, mit `FK` oder mit einem Pfeil. **Nimm die Schreibweise aus der Aufgabe**, und wenn keine vorgegeben ist, schreibe eine kurze Legende dazu.'],
    ['code', 'text', `Legende: PK = Primärschlüssel (in der Prüfung unterstrichen), # = Fremdschlüssel

Trainer  (trainer_id PK, name)
Kurs     (kurs_id PK, titel, #trainer_id)
Mitglied (mitglied_id PK, name)
Buchung  (#mitglied_id PK, #kurs_id PK, datum)`],
    ['kv', [
      ['Relation', 'Fachbegriff für **Tabelle**. Eine Zeile heißt **Tupel** (Datensatz), eine Spalte **Attribut**.'],
      ['Primärschlüssel (PK)', 'Attribut oder Attributkombination, die jedes Tupel **eindeutig** identifiziert. Nie leer (NOT NULL), nie doppelt.'],
      ['Fremdschlüssel (FK)', 'Attribut, das auf den **Primärschlüssel einer anderen Relation** zeigt. Er ersetzt die Linie aus dem ERM.'],
      ['Zusammengesetzter Schlüssel', 'Mehrere Attribute bilden **gemeinsam** den Primärschlüssel, typisch in der Zwischentabelle: (mitglied_id, kurs_id).'],
    ]],
    ['see', ['ps-er', 'ps-relational', 'ps-normalisierung', 'eua-sqlexam'], 'Vertiefung'],
  ],
});
