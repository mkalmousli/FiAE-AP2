AP2.page('eua-datentypen', {
  b: 'eua', g: 'Grundlagen der Programmierung', t: 'Datentypen, Variablen und Operatoren',
  d: 'Eine **Variable** ist ein **benannter Speicherplatz** für einen Wert. Ihr **Datentyp** bestimmt, welche Werte sie aufnehmen kann und welche Operationen erlaubt sind (zum Beispiel `int` für ganze Zahlen, `double` für Kommazahlen, `boolean` für Wahrheitswerte, `String` für Text). **Operatoren** verknüpfen Werte: arithmetisch (+ - * / %), vergleichend (== != < >) und logisch (&& || !).',
  m: '**Typ + Name + Wert.** Ganzzahldivision **schneidet ab** (7 / 2 = 3), **Modulo (%) liefert den Rest** (7 % 2 = 1). **Punkt vor Strich**, und **UND (&&) bindet stärker als ODER (||)**. Vergleichen mit **==**, zuweisen mit **=**.',
  cheat: [
    ['Einfache Datentypen (Java/C#)', ['`byte` 8 Bit, `short` 16 Bit', '`int` **32 Bit**: ca. -2,1 Mrd. bis +2,1 Mrd.', '`long` 64 Bit', '`float` 32 Bit, `double` **64 Bit** (Kommazahlen)', '`boolean` wahr/falsch, `char` ein Zeichen, `String` Text']],
    ['Rechnen', ['`/` bei int: **ganzzahlig** (7/2 = 3)', '`%` Rest (7 % 2 = 1)', '`++`/`--` um 1 erhöhen/verringern', '`+=`, `-=`, `*=` Kurzschreibweise', 'Kommazahlen sind **ungenau** (0.1 + 0.2 != 0.3)']],
    ['Logik', ['`&&` UND, `||` ODER, `!` NICHT', '`^` XOR (entweder-oder)', '**Kurzschlussauswertung:** rechte Seite wird nur ausgewertet, wenn nötig', 'Wahrheitstabellen kennen']],
    ['Typumwandlung', ['**Implizit:** automatisch von klein nach groß (int in double)', '**Explizit (Cast):** `(int) 3.9` ergibt 3', 'Text in Zahl: `Integer.parseInt("42")`', 'Überlauf: int-Maximum + 1 wird negativ']],
  ],
  blocks: [
    ['h', 'Variablen'],
    ['p', 'Ein Computerprogramm muss sich Werte merken: eine Eingabe des Benutzers, ein Zwischenergebnis, einen Zähler. Dafür gibt es **Variablen**. Du kannst dir eine Variable wie eine **beschriftete Schublade** vorstellen: Der **Name** ist das Etikett, der **Datentyp** sagt, was in die Schublade passt, der **Wert** ist der Inhalt.'],
    ['kv', [
      ['Deklaration', 'Die Variable wird angelegt: Typ und Name festlegen. `int alter;`'],
      ['Initialisierung', 'Die Variable bekommt zum ersten Mal einen Wert. `alter = 18;` Oft zusammen: `int alter = 18;`'],
      ['Zuweisung', 'Der Wert wird verändert. `alter = alter + 1;` Das Gleichheitszeichen `=` bedeutet hier **zuweisen**, nicht "ist gleich".'],
      ['Konstante', 'Ein Wert, der sich **nie ändert**: `final double MWST = 0.19;` (Java), `const` (C#). Vorteil: kein "magischer Wert" im Code, Änderung an einer Stelle.'],
      ['Gültigkeitsbereich (Scope)', 'Wo die Variable sichtbar ist. Eine Variable in einer Methode oder in `{ }` gilt nur dort (**lokal**). Attribute einer Klasse gelten im ganzen Objekt (**Instanzvariable**).'],
    ]],
    ['h3', 'Regeln für Namen'],
    ['list', ['Aussagekräftig: `anzahlKunden` statt `a`. Konvention: **camelCase** in Java, C# (PascalCase für Klassen), **snake_case** in Python.', 'Keine Leerzeichen, nicht mit einer Ziffer beginnen, keine reservierten Wörter (`class`, `if`).', '**Groß- und Kleinschreibung** zählt: `Alter` und `alter` sind verschiedene Variablen.']],
    ['h', 'Datentypen'],
    ['table', ['Typ (Java/C#)', 'Bedeutung', 'Größe', 'Wertebereich / Beispiel'], [
      ['`byte`', 'Sehr kleine ganze Zahl', '8 Bit', '-128 bis 127'],
      ['`short`', 'Kleine ganze Zahl', '16 Bit', '-32.768 bis 32.767'],
      ['`int`', 'Ganze Zahl (Standard)', '32 Bit', '-2.147.483.648 bis 2.147.483.647'],
      ['`long`', 'Große ganze Zahl', '64 Bit', 'ca. -9,2 mal 10^18 bis 9,2 mal 10^18'],
      ['`float`', 'Kommazahl, einfache Genauigkeit', '32 Bit', 'ca. 7 Stellen, `3.14f`'],
      ['`double`', 'Kommazahl, doppelte Genauigkeit', '64 Bit', 'ca. 15 Stellen, `3.14`'],
      ['`boolean` (C#: `bool`)', 'Wahrheitswert', '1 Bit (logisch)', '`true` oder `false`'],
      ['`char`', 'Ein einzelnes Zeichen', '16 Bit (Unicode)', '`\'A\'`'],
      ['`String` (C#: `string`)', 'Zeichenkette (Objekt, kein einfacher Typ)', 'variabel', '`"Hallo"`'],
    ]],
    ['note', '**Python** ist **dynamisch typisiert**: Man schreibt keinen Typ vor die Variable (`alter = 18`), der Typ gehört zum **Wert** und kann wechseln. Java und C# sind **statisch typisiert**: Der Typ steht fest und der Compiler prüft ihn. Python-Ganzzahlen (`int`) haben praktisch keine Größenbegrenzung. Es gibt aber `float` (Kommazahl), `bool`, `str`, `list`, `dict`.'],
    ['codes', [
      ['java', `int alter = 17;
double preis = 19.99;
boolean volljaehrig = alter >= 18;     // false
String name = "Mia";
final double MWST = 0.19;              // Konstante
double brutto = preis * (1 + MWST);`],
      ['csharp', `int alter = 17;
double preis = 19.99;
bool volljaehrig = alter >= 18;        // false
string name = "Mia";
const double MWST = 0.19;              // Konstante
double brutto = preis * (1 + MWST);`],
      ['python', `alter = 17
preis = 19.99
volljaehrig = alter >= 18              # False
name = "Mia"
MWST = 0.19                            # Konstante nur per Konvention
brutto = preis * (1 + MWST)`],
    ]],
  ],
});
