AP2.add('ps-ermrm', [
  ['h', 'Vom ERM zum RM in fünf Schritten'],
  ['steps', [
    '**Jeder Entitätstyp wird eine Relation.** Trainer, Kurs, Mitglied: drei Relationen. Alle Attribute übernehmen, den Primärschlüssel unterstreichen.',
    '**Jede 1:n-Beziehung wird ein Fremdschlüssel auf der n-Seite.** Trainer 1 : n Kurs: Der Primärschlüssel von Trainer (trainer_id) kommt als Fremdschlüssel in **Kurs**. Es entsteht **keine** neue Relation.',
    '**Jede n:m-Beziehung wird eine eigene Relation.** Mitglied n : m Kurs: neue Relation **Buchung** mit den Primärschlüsseln beider Seiten als Fremdschlüssel. Beide zusammen bilden den Primärschlüssel.',
    '**Attribute der Beziehung wandern mit.** Das Attribut datum der Beziehung "bucht" gehört in die Relation Buchung. Bei 1:n kommt ein Beziehungsattribut zum Fremdschlüssel auf die n-Seite.',
    '**Jede 1:1-Beziehung:** Fremdschlüssel auf **eine** der beiden Seiten (mit UNIQUE), am besten auf die Seite, die ohne die andere nicht existiert. Oder beide Relationen zusammenlegen.',
  ]],
  ['diagram', {w: 780, h: 210, keep: 640, cap: 'Dasselbe Modell nach der Umwandlung (Krähenfuß-Notation mit Schlüsseln): Die Beziehung "leitet" ist zum Fremdschlüssel trainer_id geworden, die Beziehung "bucht" zur Relation Buchung.', nodes: [
    {id: 't', k: 'cls', x: 95, y: 105, w: 160, t: {name: 'Trainer', attrs: ['PK  trainer_id', 'name']}}, {id: 'k', k: 'cls', x: 295, y: 105, w: 160, t: {name: 'Kurs', attrs: ['PK  kurs_id', 'titel', 'FK  trainer_id']}},
    {id: 'b', k: 'cls', x: 495, y: 105, w: 170, s: 'accent', t: {name: 'Buchung', attrs: ['PK/FK  kurs_id', 'PK/FK  mitglied_id', 'datum']}}, {id: 'm', k: 'cls', x: 690, y: 105, w: 160, t: {name: 'Mitglied', attrs: ['PK  mitglied_id', 'name']}},
  ], edges: [{a: 't', b: 'k', sa: 'one', ea: 'zeromany'}, {a: 'k', b: 'b', sa: 'one', ea: 'zeromany'}, {a: 'm', b: 'b', sa: 'one', ea: 'zeromany'}]}],
  ['table', ['Im ERM', 'Im RM', 'Im Beispiel'], [
    ['Entitätstyp', 'Relation (Tabelle)', 'Trainer, Kurs, Mitglied'],
    ['Attribut', 'Attribut (Spalte)', 'name, titel'],
    ['Schlüsselattribut', 'Primärschlüssel', 'trainer_id, kurs_id, mitglied_id'],
    ['1:n-Beziehung', 'Fremdschlüssel in der Relation der **n-Seite**', 'Kurs(..., #trainer_id)'],
    ['n:m-Beziehung', '**Neue Relation** mit zwei Fremdschlüsseln', 'Buchung(#mitglied_id, #kurs_id, datum)'],
    ['1:1-Beziehung', 'Fremdschlüssel mit UNIQUE oder eine gemeinsame Relation', 'Mitglied und Mitgliedsausweis'],
    ['Attribut einer Beziehung', 'Attribut neben dem Fremdschlüssel', 'datum in Buchung'],
    ['Mehrwertiges Attribut', 'Eigene Relation mit Fremdschlüssel', 'Telefon(#mitglied_id, nummer)'],
  ]],
  ['warn', '**Warum steht der Fremdschlüssel auf der n-Seite?** Ein Kurs hat genau **einen** Trainer: In der Kurs-Zeile ist Platz für genau eine trainer_id. Umgekehrt müsste die Trainer-Zeile **viele** Kurs-Nummern in einem Feld aufnehmen. Das verletzt die **1. Normalform** (nur ein Wert je Feld).'],
  ['h', 'RM und Normalformen'],
  ['p', 'Aufgaben verlangen oft ein "**Relationenmodell in der 3. Normalform**". Ein RM, das sauber aus einem guten ERM abgeleitet ist, ist meistens schon in 3NF. Prüfe trotzdem kurz:'],
  ['list', [
    '**1NF:** In jedem Feld steht nur **ein** Wert (keine Listen wie "Yoga, Pilates"), jede Relation hat einen Primärschlüssel.',
    '**2NF:** Bei **zusammengesetztem** Schlüssel hängt jedes Nichtschlüsselattribut vom **ganzen** Schlüssel ab. In Buchung(#mitglied_id, #kurs_id, datum) hängt datum von beiden ab: in Ordnung. Stünde dort auch der Kurstitel, hinge er nur von kurs_id ab: Verstoß.',
    '**3NF:** Kein Nichtschlüsselattribut hängt von einem **anderen Nichtschlüsselattribut** ab. Stünden in Mitglied plz und ort, bestimmt plz den ort: auslagern in Ort(plz, ort).',
  ]],
  ['h', 'Rückweg: Aus Tabellen ein ERM zeichnen'],
  ['p', 'Manchmal ist ein **SQL-Skript oder ein RM gegeben** und das ERM gesucht. Dann geht man die Regeln rückwärts:'],
  ['steps', [
    'Jede Relation mit **eigenem, einfachem Primärschlüssel** wird ein Entitätstyp.',
    'Jeder **Fremdschlüssel** wird eine Linie zur Relation, auf die er zeigt. Die Relation **mit** dem Fremdschlüssel ist die **n-Seite**, die Zielrelation die **1-Seite**.',
    'Eine Relation, deren Primärschlüssel **nur aus Fremdschlüsseln** besteht, ist eine aufgelöste **n:m-Beziehung**. Im ERM zeichnest du sie als Beziehung n:m (oder als eigenen Entitätstyp mit zwei 1:n-Linien, beides wird gewertet).',
    'Fremdschlüssel werden im ERM **weggelassen**, die Linie ersetzt sie. Übrige Attribute übernehmen.',
    'Ist der Fremdschlüssel **NOT NULL**, ist die Teilnahme Pflicht (min = 1), sonst optional (min = 0). Ist er **UNIQUE**, liegt 1:1 vor.',
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erläutern Sie den Unterschied zwischen einem ERM und einem Relationenmodell.', ['Das **ERM** ist ein **grafisches, konzeptionelles** Modell. Es zeigt Entitätstypen, ihre Attribute und die Beziehungen mit Kardinalitäten, unabhängig von der späteren Datenbank.', 'Das **Relationenmodell** ist das **logische** Modell in Textform. Es listet die Relationen (Tabellen) mit ihren Attributen, Primärschlüsseln und Fremdschlüsseln auf. Beziehungen sind hier als Fremdschlüssel umgesetzt, n:m-Beziehungen als eigene Relation.', 'Das RM wird aus dem ERM abgeleitet und ist die Vorlage für die CREATE-TABLE-Anweisungen.'], 4],
  ['qa', 'Eine Bibliothek verwaltet Leser und Bücher. Jedes Buch gehört zu genau einem Verlag, ein Verlag hat viele Bücher. Ein Leser kann mehrere Bücher ausleihen, ein Buch wird im Lauf der Zeit von mehreren Lesern ausgeliehen. Zu jeder Ausleihe werden Ausleihdatum und Rückgabedatum gespeichert. a) Nennen Sie Entitätstypen, Beziehungen und Kardinalitäten. b) Erstellen Sie das Relationenmodell.', [
    '**a) Entitätstypen:** Leser, Buch, Verlag.',
    '- Verlag **1 : n** Buch (verlegt)',
    '- Leser **n : m** Buch (leiht aus), Attribute der Beziehung: ausleihdatum, rueckgabedatum',
    '**b) Relationenmodell** (PK unterstrichen, hier mit PK markiert; # = Fremdschlüssel):',
    ['code', 'text', `Verlag   (verlag_id PK, name, ort)
Buch     (buch_id PK, titel, isbn, #verlag_id)
Leser    (leser_id PK, name, email)
Ausleihe (ausleihe_id PK, #leser_id, #buch_id, ausleihdatum, rueckgabedatum)`],
    'Weil derselbe Leser dasselbe Buch **mehrmals** ausleihen kann, reicht (leser_id, buch_id) als Schlüssel nicht. Deshalb ein eigener Schlüssel ausleihe_id (oder ausleihdatum zusätzlich in den Schlüssel nehmen).',
  ], 10],
  ['qa', 'Gegeben ist das Relationenmodell: Abteilung(abt_id, name), Mitarbeiter(ma_id, name, #abt_id), Projekt(proj_id, titel), Mitarbeit(#ma_id, #proj_id, stunden). Beschreiben Sie das zugehörige ERM.', [
    '**Entitätstypen:** Abteilung, Mitarbeiter, Projekt.',
    '- Abteilung **1 : n** Mitarbeiter (der Fremdschlüssel abt_id steht bei Mitarbeiter, also ist Mitarbeiter die n-Seite).',
    '- Mitarbeiter **n : m** Projekt. Die Relation Mitarbeit besteht im Schlüssel nur aus zwei Fremdschlüsseln, sie ist die aufgelöste n:m-Beziehung. Ihr Attribut **stunden** gehört im ERM zur Beziehung.',
    'Die Fremdschlüssel abt_id, ma_id und proj_id werden im ERM **nicht** als Attribute eingezeichnet.',
  ], 6],
  ['quiz', [
    {q: 'Wofür steht ERM?', o: ['Entity-Relationship-Modell', 'Erweitertes Relationenmodell', 'Entity-Relation-Management', 'Externes Referenzmodell'], a: 0, e: 'Entity = Gegenstand, Relationship = Beziehung.'},
    {q: 'Was ist eine "Relation" im Relationenmodell?', o: ['Eine Tabelle', 'Eine Beziehung zwischen zwei Tabellen', 'Ein Fremdschlüssel', 'Eine Kardinalität'], a: 0, e: 'Relation = Tabelle. Die Beziehung heißt im ERM Relationship und wird im RM durch Fremdschlüssel abgebildet.'},
    {q: 'Was gibt es im ERM nicht?', o: ['Fremdschlüssel', 'Kardinalitäten', 'Attribute', 'Entitätstypen'], a: 0, e: 'Im ERM zeigt die Linie die Beziehung. Fremdschlüssel entstehen erst bei der Umwandlung ins RM.'},
    {q: 'Wie wird eine 1:n-Beziehung im RM abgebildet?', o: ['Fremdschlüssel in der Relation der n-Seite', 'Fremdschlüssel in der Relation der 1-Seite', 'Eigene Zwischentabelle', 'Gemeinsamer Primärschlüssel'], a: 0, e: 'Dort, wo "viele" sind, hat jede Zeile genau einen Partner und damit Platz für genau einen Fremdschlüssel.'},
    {q: 'Wie viele Relationen entstehen aus zwei Entitätstypen mit einer n:m-Beziehung?', o: ['Drei', 'Zwei', 'Eine', 'Vier'], a: 0, e: 'Zwei für die Entitätstypen und eine Zwischentabelle für die Beziehung.'},
    {q: 'Welche Entwurfsstufe ist das Relationenmodell?', o: ['Logischer Entwurf', 'Konzeptioneller Entwurf', 'Physischer Entwurf', 'Testentwurf'], a: 0, e: 'ERM = konzeptionell, RM = logisch, SQL im konkreten DBMS = physisch.'},
    {q: 'Woran erkennt man im RM eine aufgelöste n:m-Beziehung?', o: ['Der Primärschlüssel besteht aus zwei Fremdschlüsseln', 'Die Relation hat keinen Schlüssel', 'Alle Attribute sind NOT NULL', 'Die Relation hat nur ein Attribut'], a: 0, e: 'Die Zwischentabelle trägt die Primärschlüssel beider Seiten als Fremdschlüssel.'},
  ]],
]);
