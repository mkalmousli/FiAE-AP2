AP2.page('ps-plausibilitaet', {
  b: 'ps', g: 'Softwareentwurf', t: 'Plausibilitätsprüfung und Fehlerbehandlung (Messwerte, Eingaben)',
  d: 'Eine **Plausibilitätsprüfung** testet, ob ein Wert **sinnvoll** sein kann. Beispiel: Eine Akkuspannung von 400 Volt ist bei einem Handy-Akku **unmöglich**. Die Prüfung liefert **true** (Wert ist plausibel) oder **false** (Wert ist ungültig). Sie ist **keine** Prüfung auf Richtigkeit: Ein plausibler Wert kann trotzdem falsch sein.',
  m: '**Plausibel heißt: möglich, nicht: richtig.** Prüfe **Typ**, **Wertebereich** (Minimum bis Maximum), **Pflichtfeld** und **Format**. Ungültige Werte **nicht still ändern**: ablehnen, melden oder herausfiltern.',
  cheat: [
    ['Prüfarten', ['**Typ:** Ist es eine Zahl?', '**Bereich:** min <= Wert <= max', '**Pflichtfeld:** nicht leer', '**Format:** z. B. Datum, E-Mail', '**Abhängigkeit:** Ende nach Anfang']],
    ['Reaktion', ['Wert **ablehnen** und Fehlermeldung zeigen', 'Wert **herausfiltern** (Liste bereinigen)', 'Fehler **protokollieren** (Log)']],
    ['Prüfungsfallen', ['Grenzwerte: gilt <= oder <?', 'Plausibel ist nicht gleich richtig', 'Prüfung gehört in die Klasse, die die Daten besitzt']],
  ],
  blocks: [
    ['h', 'Was ist das und warum braucht man es?'],
    ['p', 'Sensoren und Benutzer liefern manchmal falsche Daten. Ein Kabel wackelt. Jemand tippt eine Null zu viel. Wenn das Programm diese Werte speichert, werden spätere Berechnungen falsch.'],
    ['p', 'Darum prüft das Programm jeden Wert **vor** dem Speichern. Das nennt man **Plausibilitätsprüfung** (Plausibilität = „das kann sein“).'],
    ['table', ['Wort', 'Einfach erklärt'], [
      ['plausibel', 'möglich, sinnvoll, passt zur Realität'],
      ['Messwert', 'Zahl, die ein Sensor gemessen hat (z. B. Spannung in Volt)'],
      ['Wertebereich', 'Von-bis-Grenzen, in denen ein Wert liegen darf'],
      ['Grenzwert', 'kleinster oder größter erlaubter Wert'],
      ['filtern', 'ungültige Werte aus einer Liste entfernen'],
      ['Ausreißer', 'Wert, der stark von allen anderen abweicht'],
    ]],
    ['h', 'Beispiel Schritt für Schritt'],
    ['p', 'Ein Messgerät prüft einen Akku. Spannungswerte liegen bei diesem Akku zwischen **2,5 V** (leer) und **4,2 V** (voll). Die Methode `pruefeWert()` soll sagen, ob ein Wert möglich ist.'],
    ['code', 'java', `boolean pruefeWert(double spannung) {
    // Wertebereich des Akkus: 2,5 V bis 4,2 V (Grenzen sind erlaubt)
    return spannung >= 2.5 && spannung <= 4.2;
}`],
    ['table', ['Messwert', 'Prüfung', 'Ergebnis'], [
      ['3,7 V', '3,7 >= 2,5 und 3,7 <= 4,2', '**true**'],
      ['4,2 V', 'Grenzwert: <= erlaubt', '**true**'],
      ['4,3 V', '4,3 <= 4,2 ist falsch', '**false**'],
      ['0,0 V', '0,0 >= 2,5 ist falsch (Kabel ab?)', '**false**'],
      ['-1 V', 'kleiner als Minimum', '**false**'],
    ]],
    ['h', 'Liste bereinigen (filtern)'],
    ['p', 'Oft soll eine ganze Liste geprüft werden. Die Methode entfernt ungültige Werte und gibt zurück, **wie viele** sie entfernt hat. Wichtig: Beim Entfernen in einer Schleife von **hinten nach vorne** laufen. So verschiebt sich kein Index.'],
    ['code', 'java', `int bereinige(List<Double> werte) {
    int entfernt = 0;
    for (int i = werte.size() - 1; i >= 0; i--) {
        if (!pruefeWert(werte.get(i))) {
            werte.remove(i);
            entfernt++;
        }
    }
    return entfernt;
}`],
    ['table', ['Schritt i', 'Wert', 'Gültig?', 'Aktion', 'entfernt'], [
      ['3', '4,9', 'nein', 'löschen', '1'],
      ['2', '3,6', 'ja', '-', '1'],
      ['1', '0,0', 'nein', 'löschen', '2'],
      ['0', '3,8', 'ja', '-', '2'],
    ]],
    ['note', 'Liste vorher: [3,8; 0,0; 3,6; 4,9]. Nachher: [3,8; 3,6]. Rückgabe: 2.'],
    ['h', 'Wann wird bereinigt?'],
    ['p', 'Typische Prüfungsfrage: **Wann** ruft man die Bereinigung auf? Antwort mit Begründung: **Nach** der Messung, aber **vor** der Auswertung (Mittelwert, Kapazität, Diagramm). Sonst verfälschen ungültige Werte das Ergebnis. Eine Ausnahme: Wenn man die Rohdaten für Fehlersuche braucht, speichert man sie vorher getrennt.'],
    ['h', 'Prüfungsfallen'],
    ['warn', '**Plausibel ist nicht richtig.** Eine Spannung von 3,9 V ist plausibel. Sie kann trotzdem falsch gemessen sein. Die Prüfung findet nur **unmögliche** Werte.'],
    ['warn', '**Grenzen genau lesen.** „von 2,5 bis 4,2 V“ heißt meist: Grenzen **gehören dazu** (>= und <=). Schreibe die Annahme in die Antwort.'],
    ['tip', 'Im Struktogramm ist die Prüfung ein **Auswahlblock mit zwei Bereichen**. Im Programmablaufplan verwendet man eine Raute. Ungültig: Fehlerpfad (ablehnen, zählen). Gültig: weiterverarbeiten.'],
    ['h', 'Aufgaben im Prüfungsstil'],
    ['qa', '**Erläutern** Sie, warum eine Plausibilitätsprüfung nicht beweist, dass ein Messwert richtig ist.', ['Sie prüft nur, ob der Wert **im möglichen Bereich** liegt.', 'Ein falsch gemessener Wert kann trotzdem im Bereich liegen, z. B. 3,9 V statt 3,7 V.'], 2],
    ['qa', '**Nennen** Sie drei Arten von Plausibilitätsprüfungen.', ['Wertebereich (min bis max)', 'Typ/Format (Zahl, Datum)', 'Pflichtfeld oder Abhängigkeit (Ende nach Anfang)'], 3],
    ['qa', '**Begründen** Sie, warum man beim Löschen aus einer Liste von hinten nach vorne läuft.', ['Beim Löschen rücken alle späteren Elemente einen Platz nach vorne.', 'Läuft man von vorne, überspringt man dadurch Elemente.'], 2],
    ['see', ['ps-struktogramm', 'ps-testarten', 'ps-klassen']],
    ['quiz', [
      {q: 'Was prüft eine Plausibilitätsprüfung?', o: ['Ob ein Wert möglich und sinnvoll ist', 'Ob ein Wert exakt richtig ist', 'Ob das Programm schnell ist', 'Ob der Code schön ist'], a: 0, e: 'Sie erkennt unmögliche Werte, beweist aber nicht die Richtigkeit.'},
      {q: 'Bereich 2,5 bis 4,2 V, Grenzen erlaubt. Ist 4,2 V gültig?', o: ['Ja', 'Nein', 'Nur bei Entladung', 'Nur als Mittelwert'], a: 0, e: 'Mit <= ist der Grenzwert 4,2 gültig.'},
      {q: 'Welche Reaktion ist bei einem ungültigen Messwert sinnvoll?', o: ['Ablehnen oder herausfiltern und melden', 'Still auf 0 setzen', 'Einfach speichern', 'Programm löschen'], a: 0, e: 'Ungültige Werte dürfen die Auswertung nicht verfälschen.'},
      {q: 'Wann bereinigt man eine Messwertliste sinnvoll?', o: ['Nach der Messung, vor der Auswertung', 'Nie', 'Nach der Auswertung', 'Vor dem Einschalten des Sensors'], a: 0, e: 'Sonst fließen Fehlwerte in Mittelwert oder Kapazität ein.'},
    ]],
  ],
});

AP2.add('ps-plausibilitaet', [
  [
    "h",
    "Mehrstufig und serverseitig prüfen"
  ],
  [
    "table",
    [
      "Stufe",
      "Beispiel",
      "Warum?"
    ],
    [
      [
        "Technischer Typ",
        "Ist der Wert vorhanden und eine endliche Zahl?",
        "null, NaN und unendliche Werte nicht verarbeiten"
      ],
      [
        "Format und Bereich",
        "Liegt Spannung zwischen 2,5 und 4,2 Volt?",
        "Unmögliche Werte ablehnen"
      ],
      [
        "Fachlicher Zusammenhang",
        "Liegt das Enddatum nach dem Startdatum?",
        "Einzelwerte können stimmen, Kombination kann falsch sein"
      ],
      [
        "Berechtigung",
        "Darf diese Person das Gerät ändern?",
        "Gültige Daten bedeuten keine Zugriffsberechtigung"
      ]
    ]
  ],
  [
    "p",
    "Clientprüfungen geben schnelle Rückmeldung. Der Server muss trotzdem selbst prüfen. Eine Anfrage kann die Oberfläche umgehen. Datenbankregeln sichern zusätzlich dauerhaft gültige Zustände."
  ],
  [
    "h",
    "Fehlende Werte sicher behandeln"
  ],
  [
    "code",
    "java",
    "boolean pruefeWert(Double spannung) {\n    return spannung != null\n        && Double.isFinite(spannung)\n        && spannung >= 2.5\n        && spannung <= 4.2;\n}"
  ],
  [
    "note",
    "Das logische UND wertet in Java von links nach rechts kurzschließend aus. Bei null wird der Rest nicht mehr geprüft. So entsteht keine NullPointerException durch das Entpacken von Double."
  ],
  [
    "qa",
    "Die Liste enthält null, 3,7, NaN und 4,3 Volt. **Bestimmen** Sie die gültigen Werte mit der neuen Prüfung. **Begründen** Sie die Serverprüfung.",
    [
      "Nur **3,7 Volt** ist gültig. 1 Punkt.",
      "null fehlt; NaN ist keine endliche Zahl; 4,3 liegt außerhalb des Bereichs. 1 Punkt.",
      "Der Client kann umgangen oder verändert werden. Deshalb prüft der Server erneut. 1 Punkt."
    ],
    3
  ],
  [
    "warn",
    "Ein Struktogramm nutzt verschachtelte Kästen. Eine Raute gehört zum Programmablaufplan. Verwechsle die Darstellungen nicht."
  ],
  [
    "see",
    [
      "ps-testentwurf",
      "ps-anforderungen",
      "infra-websec"
    ]
  ]
]);
