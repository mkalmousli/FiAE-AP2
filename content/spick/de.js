AP2.spick('de', {
  exam: 'Schulprüfung: Deutsch/Kommunikation (Berufsschule)', t: 'Spickzettel Deutsch',
  s: 'Geschäftsbrief nach DIN 5008, Bewerbung, Erörterung, Textanalyse, Kommunikation, Präsentation und Sprachrichtigkeit auf einer Seite',
  top: [
    ['tip', 'Immer **Einleitung - Hauptteil - Schluss**. Erst **beschreiben**, dann **analysieren**, am Ende **bewerten**. Aufgabenstellung (Operatoren) genau lesen.'],
    ['mnemo', 'Vier Seiten einer Nachricht: **Sach, Selbstkundgabe, Beziehung, Appell** (Schulz von Thun). Brief: **Betreff ohne „Betreff“, kein Punkt, Gruß ohne Komma davor**.'],
  ],
  sections: [
    {t: 'Geschäftsbrief und E-Mail', icon: 'book', ids: ['de-brief', 'de-bewerbung'], items: [
      ['flow', ['Absender', 'Anschrift', 'Datum', 'Betreff', 'Anrede', 'Text', 'Gruß', 'Unterschrift', 'Anlagen']],
      ['pairs', [
        ['Betreff', 'Ohne das Wort „Betreff“, **kein Punkt** am Ende, fett oder normal'],
        ['Anrede', '„Sehr geehrte Frau …,“ / „Sehr geehrte Damen und Herren,“ - danach **klein** weiter'],
        ['Gruß', '„Mit freundlichen Grüßen“ - **kein Komma** davor, **kein Punkt** danach'],
        ['Datum', 'Zum Beispiel 03.11.2026 oder 3. November 2026'],
        ['Anlagen', 'Nach der Unterschrift mit **Anlage(n)** aufführen'],
      ]],
      ['sub', 'Bewerbung'],
      ['li', ['**Anschreiben:** höchstens 1 Seite, Bezug zur Stelle, Motivation, Qualifikation, Nutzen für die Firma', '**Lebenslauf:** tabellarisch, lückenlos, aktuelles zuerst (antichronologisch), Foto freiwillig', '**Anlagen:** Zeugnisse, Zertifikate, Nachweise', 'Nach dem **AGG** sind Fragen nach Alter, Herkunft, Religion usw. nicht zulässig']],
      ['links', ['de-brief', 'de-bewerbung']],
    ]},
    {t: 'Erörterung und Textanalyse', icon: 'pen', ids: ['de-eroerterung', 'de-text'], items: [
      ['flow', ['Einleitung (Thema, Frage)', 'Hauptteil (Pro, Kontra)', 'Schluss (Fazit, Meinung)']],
      ['li', ['**Argument = Behauptung + Begründung + Beispiel**', 'Reihenfolge: **steigern**, stärkstes Argument zuletzt', '**Lineare** Erörterung: eine Position; **dialektische**: Pro und Kontra', '**Stellungnahme** immer begründen']],
      ['sub', 'Textanalyse und Zusammenfassung'],
      ['li', ['Zusammenfassung: **Präsens**, **eigene Worte**, **indirekte Rede** (Konjunktiv I), keine Wertung', 'Angaben nennen: **Autor, Titel, Textart, Quelle, Thema**', 'Aufbau: Kernaussage → Gedankengang → Absicht']],
      ['tip', 'Operatoren: **nennen** (kurz), **beschreiben** (sachlich), **erläutern** (mit Beispiel), **beurteilen/Stellung nehmen** (mit Begründung).'],
      ['links', ['de-eroerterung', 'de-text']],
    ]},
    {t: 'Kommunikation, Zuhören, Präsentation', icon: 'user', ids: ['de-kommunikation', 'de-zuhoeren', 'de-praesentation'], items: [
      ['cards', [
        ['Vier-Seiten-Modell', ['**Sachinhalt**: worüber', '**Selbstkundgabe**: was ich preisgebe', '**Beziehung**: wie wir zueinander stehen', '**Appell**: was ich will']],
        ['Watzlawick', ['Man kann **nicht nicht kommunizieren**', '**Inhalts-** und **Beziehungsebene**', 'Digital (Wort) / analog (Körper)']],
      ]],
      ['sub', 'Aktives Zuhören und Feedback'],
      ['li', ['Aktiv zuhören: **Blickkontakt, Nachfragen, Paraphrasieren, Zusammenfassen**', '**Ich-Botschaften** statt Du-Vorwürfe', 'Feedback: **konkret, beschreibend, wertschätzend**, erst Positives, dann Verbesserung']],
      ['sub', 'Präsentation'],
      ['flow', ['Ziel und Publikum', 'Gliederung', 'Medien', 'Üben', 'Vortrag', 'Fragen']],
      ['li', ['Folie: wenig Text, **Stichpunkte**, lesbare Schrift', 'Sprache: laut, langsam, Pausen, **freier Vortrag**', 'Aufbau: **Einstieg - Hauptteil - Schluss**']],
      ['links', ['de-kommunikation', 'de-zuhoeren', 'de-praesentation']],
    ]},
    {t: 'Sprachrichtigkeit und Prüfung', icon: 'check', ids: ['de-sprache', 'de-pruefung'], items: [
      ['pairs', [
        ['das / dass', '**das** = Artikel/Pronomen (ersetzbar durch dieses/welches), **dass** = Konjunktion'],
        ['Groß/Klein', 'Substantivierungen groß (**das Lernen**), Anreden Sie/Ihr groß'],
        ['Konjunktiv I', 'Indirekte Rede: er **sei**, sie **habe**, sie **kämen** (wenn Konjunktiv I = Indikativ)'],
        ['Konjunktiv II', 'Irreales: **wäre, hätte, würde**'],
        ['Zeiten', 'Präsens, Präteritum, Perfekt, Plusquamperfekt, Futur I/II'],
      ]],
      ['sub', 'Prüfung'],
      ['li', ['Aufgaben: **Textverständnis, Sprachwissen, Schreibaufgabe**', 'Zeit einteilen, Entwurf vor Reinschrift, **am Ende Korrektur lesen**', 'Schreibaufgaben aus den Vorjahren üben']],
      ['warn', 'Typische Fehler: **Komma vor „Mit freundlichen Grüßen“**, **„Betreff:“ im Betreff**, **Umgangssprache** und **Ich-Form im Fachbrief**.'],
      ['links', ['de-sprache', 'de-pruefung']],
    ]},
  ],
});
