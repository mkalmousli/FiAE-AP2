AP2.add('eua-sqler', [
  ['h3', 'Schritt 4: Beispieldaten und Abfragen'],
  ['row', [['table', ['trainer_id', 'name', 'fachgebiet'], [['1', 'Berger', 'Yoga'], ['2', 'Weiß', 'Spinning']], {first: false}], ['table', ['mitglied_id', 'name'], [['1', 'Anna'], ['2', 'Ben'], ['3', 'Cem'], ['4', 'Dora']], {first: false}]]],
  ['row', [['table', ['kurs_id', 'titel', 'max', 'trainer_id'], [['10', 'Yoga Basis', '10', '1'], ['11', 'Spinning', '2', '2'], ['12', 'Yoga Fortgeschritten', '8', '1']], {first: false}], ['table', ['mitglied_id', 'kurs_id'], [['1', '10'], ['2', '10'], ['1', '11'], ['2', '11'], ['3', '12']], {first: false}]]],
  ['code', 'sql', `-- a) Alle Kurse mit dem Namen des Trainers
SELECT k.titel, t.name AS trainer
FROM kurs k
JOIN trainer t ON k.trainer_id = t.trainer_id;`],
  ['table', ['titel', 'trainer'], [['Yoga Basis', 'Berger'], ['Spinning', 'Weiß'], ['Yoga Fortgeschritten', 'Berger']], {first: false}],
  ['code', 'sql', `-- b) Anzahl der Teilnehmer pro Kurs
SELECT k.titel, COUNT(b.mitglied_id) AS teilnehmer
FROM kurs k
LEFT JOIN buchung b ON k.kurs_id = b.kurs_id
GROUP BY k.kurs_id, k.titel;`],
  ['table', ['titel', 'teilnehmer'], [['Yoga Basis', '2'], ['Spinning', '2'], ['Yoga Fortgeschritten', '1']], {first: false}],
  ['code', 'sql', `-- c) Mitglieder ohne Buchung
SELECT m.name
FROM mitglied m
LEFT JOIN buchung b ON m.mitglied_id = b.mitglied_id
WHERE b.kurs_id IS NULL;`],
  ['table', ['name'], [['Dora']], {first: false}],
  ['code', 'sql', `-- d) Volle Kurse (Teilnehmerzahl = Maximum)
SELECT k.titel
FROM kurs k
JOIN buchung b ON k.kurs_id = b.kurs_id
GROUP BY k.kurs_id, k.titel, k.max_teilnehmer
HAVING COUNT(*) >= k.max_teilnehmer;`],
  ['table', ['titel'], [['Spinning']], {first: false}],
  ['code', 'sql', `-- e) Alle Kurse von Anna
SELECT k.titel, b.buchungsdatum
FROM mitglied m
JOIN buchung b ON m.mitglied_id = b.mitglied_id
JOIN kurs k    ON b.kurs_id = k.kurs_id
WHERE m.name = 'Anna';`],
  ['h', 'Checkliste für den Datenbankentwurf in der Prüfung'],
  ['list', ['**Jede Entität** aus dem Text hat eine Tabelle mit **Primärschlüssel**.', '**Alle Beziehungen** sind umgesetzt: 1:n über Fremdschlüssel in der n-Tabelle, n:m über Zwischentabelle.', '**Beziehungsattribute** (Buchungsdatum, Menge) stehen in der Zwischentabelle.', 'Die Tabellen sind in **3NF** (keine Redundanz, keine mehrwertigen Felder).', '**Datentypen** und **Constraints** (NOT NULL, UNIQUE, CHECK) sind sinnvoll.', 'Die **Reihenfolge** beim Anlegen beachtet die Fremdschlüssel.']],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Eine Bibliothek verwaltet Bücher und Leser. Ein Leser kann mehrere Bücher ausleihen, ein Buch wird im Lauf der Zeit von mehreren Lesern ausgeliehen. Zu jeder Ausleihe werden Ausleih- und Rückgabedatum gespeichert. Leiten Sie die Tabellen ab.', ['Es ist eine **n:m-Beziehung** zwischen Buch und Leser, aufgelöst durch die Zwischentabelle **ausleihe**.', '**buch**(buch_id, titel, isbn)', '**leser**(leser_id, name, email)', '**ausleihe**(ausleihe_id, #buch_id, #leser_id, ausleihdatum, rueckgabedatum)', 'Als Primärschlüssel der Ausleihe eignet sich eine **eigene ausleihe_id**, weil dasselbe Buch vom selben Leser mehrfach (zu verschiedenen Zeiten) ausgeliehen werden kann.'], 8],
  ['qa', 'Warum besteht die Buchungstabelle im Beispiel aus einem zusammengesetzten Primärschlüssel (mitglied_id, kurs_id)?', 'Ein Mitglied soll denselben Kurs **nur einmal** buchen können. Die Kombination aus beiden Fremdschlüsseln ist daher **eindeutig** und identifiziert jede Zeile. Der zusammengesetzte Schlüssel erzwingt diese Regel direkt in der Datenbank.', 4],
  ['qa', 'Schreiben Sie die Abfrage: Name aller Trainer, die mindestens zwei Kurse leiten.', ['`SELECT t.name FROM trainer t JOIN kurs k ON t.trainer_id = k.trainer_id GROUP BY t.trainer_id, t.name HAVING COUNT(*) >= 2;`', 'Ergebnis: Berger (leitet 2 Kurse).'], 5],
  ['qa', 'Welche Beziehung besteht zwischen Trainer und Kurs, und wo steht der Fremdschlüssel?', 'Zwischen Trainer und Kurs besteht eine **1:n-Beziehung** (ein Trainer leitet mehrere Kurse, jeder Kurs hat genau einen Trainer). Der Fremdschlüssel `trainer_id` steht in der Tabelle **kurs** (n-Seite).', 3],
  ['quiz', [
    {q: 'Wie setzt man eine n:m-Beziehung in Tabellen um?', o: ['Mit einer Zwischentabelle', 'Mit einer Spalte', 'Mit einem Index', 'Gar nicht'], a: 0, e: 'Die Zwischentabelle enthält die Fremdschlüssel beider Seiten.'},
    {q: 'Wo steht der Fremdschlüssel bei einer 1:n-Beziehung?', o: ['In der Tabelle der n-Seite', 'In der Tabelle der 1-Seite', 'In beiden', 'In einer View'], a: 0, e: 'Dort, wo mehrere Zeilen auf eine verweisen.'},
    {q: 'In welcher Reihenfolge legt man Tabellen mit Fremdschlüsseln an?', o: ['Erst die referenzierten, dann die abhängigen', 'Erst die abhängigen', 'Beliebig', 'Alphabetisch'], a: 0, e: 'Eine Tabelle muss existieren, bevor man auf sie verweisen kann.'},
    {q: 'Welches Attribut gehört in die Zwischentabelle einer n:m-Beziehung?', o: ['Attribut der Beziehung (zum Beispiel Buchungsdatum)', 'Attribute nur der linken Entität', 'Nichts', 'Nur Namen'], a: 0, e: 'Beziehungsattribute gehören in die Zwischentabelle.'},
  ]],
]);
