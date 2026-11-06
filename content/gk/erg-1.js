// Ergänzungen zu bestehenden Gemeinschaftskunde-Seiten (vertiefende Abschnitte, Beispiele, Rechnungen, Fragen).
AP2.add('gk-institutionen', [
  ['h', 'Vertiefung: Die Staatsorgane im Detail'],
  ['table', ['Organ', 'Wie wird es besetzt?', 'Macht und Grenzen'], [
    ['**Bundespräsident**', 'Wahl durch die Bundesversammlung (Bundestag plus gleich viele Mitglieder der Länder). 5 Jahre, einmal Wiederwahl. Mindestalter 40.', 'Repräsentiert den Staat, unterschreibt Gesetze, ernennt Kanzler und Minister. Wenig politische Macht, aber moralische Autorität.'],
    ['**Bundeskanzler/in**', 'Wahl durch den Bundestag auf Vorschlag des Bundespräsidenten (Mehrheit der Mitglieder).', 'Bestimmt die Richtlinien der Politik (Art. 65 GG). Kann nur durch konstruktives Misstrauensvotum abgewählt werden.'],
    ['**Bundesregierung**', 'Kanzler und Minister. Minister schlägt der Kanzler vor.', 'Führt die Gesetze aus, bringt Gesetzentwürfe ein (die meisten kommen von der Regierung).'],
    ['**Bundestag**', 'Alle 4 Jahre vom Volk gewählt, mindestens 630 Abgeordnete.', 'Macht Gesetze, wählt den Kanzler, beschließt den Haushalt, kontrolliert die Regierung.'],
    ['**Bundesrat**', '69 Mitglieder aus den Landesregierungen. Jedes Land 3 bis 6 Stimmen nach Einwohnern.', 'Wirkt bei Gesetzen und bei der Verwaltung mit. Hat keine Wahl, wechselt durch Landtagswahlen.'],
    ['**Bundesverfassungsgericht**', '16 Richter, gewählt von Bundestag und Bundesrat mit Zweidrittelmehrheit. 12 Jahre.', 'Prüft, ob Gesetze zum Grundgesetz passen.'],
  ]],
  ['h', 'Gesetzgebung: Zustimmungsgesetz oder Einspruchsgesetz?'],
  ['table', ['', 'Zustimmungsgesetz', 'Einspruchsgesetz'], [
    ['Wann?', 'Wenn die Interessen der Länder stark betroffen sind (zum Beispiel Verwaltung oder Finanzen der Länder).', 'Alle anderen Gesetze (die meisten).'],
    ['Rolle des Bundesrates', 'Er muss **zustimmen**. Sonst scheitert das Gesetz.', 'Er kann **Einspruch** einlegen. Der Bundestag kann den Einspruch überstimmen.'],
    ['Bei Streit', 'Vermittlungsausschuss (Bundestag und Bundesrat je 16 Mitglieder) sucht einen Kompromiss.', 'Vermittlungsausschuss, dann Überstimmung durch Bundestag.'],
  ]],
  ['steps', [
    '**Initiative:** Regierung, Bundesrat oder eine Gruppe im Bundestag legt einen Entwurf vor.',
    '**Beratung im Bundestag:** Drei Lesungen, Fachausschüsse prüfen.',
    '**Abstimmung:** Der Bundestag beschließt mit Mehrheit.',
    '**Bundesrat:** Er stimmt zu oder legt Einspruch ein oder ruft den Vermittlungsausschuss an.',
    '**Unterschrift:** Der Bundespräsident prüft und unterschreibt. Er kann ein Gesetz stoppen, wenn es klar gegen das Grundgesetz verstößt.',
    '**Verkündung:** Das Gesetz erscheint im Bundesgesetzblatt und tritt in Kraft.',
  ]],
  ['h', 'Beispiel: Koalitionen rechnen'],
  ['p', 'Im Bundestag sitzen 630 Abgeordnete. Eine Regierung braucht eine **Mehrheit**. Das sind mindestens **316 Stimmen** (mehr als die Hälfte). Beispiel: Partei A hat 250 Sitze, Partei B 120, Partei C 90, Partei D 80, Partei E 90.'],
  ['table', ['Mögliche Koalition', 'Sitze', 'Mehrheit?'], [
    ['A + B', '370', 'ja (mehr als 315)'],
    ['A + C', '340', 'ja'],
    ['B + C + D', '290', 'nein'],
    ['B + C + D + E', '380', 'ja'],
    ['A allein', '250', 'nein, Minderheitsregierung nötig'],
  ]],
  ['note', 'Die Mehrheit heißt „**Kanzlermehrheit**“: mehr als die Hälfte **aller** Mitglieder, nicht nur der Anwesenden. Eine **Minderheitsregierung** hat keine eigene Mehrheit und muss sich für jedes Gesetz Stimmen suchen.'],
  ['h', 'Vertiefung: Länder und Gemeinden'],
  ['table', ['Ebene', 'Parlament', 'Regierung', 'Beispiel Baden-Württemberg'], [
    ['Bund', 'Bundestag, Bundesrat', 'Bundesregierung', 'Berlin'],
    ['Land', 'Landtag', 'Ministerpräsident/in', 'Stuttgart'],
    ['Landkreis', 'Kreistag', 'Landrat/Landrätin', 'Landratsamt'],
    ['Gemeinde', 'Gemeinderat', 'Bürgermeister/in', 'Rathaus'],
  ]],
  ['p', 'Die Gemeinden haben ein Recht auf **kommunale Selbstverwaltung** (Art. 28 GG). Sie regeln „alle Angelegenheiten der örtlichen Gemeinschaft“. Sie finanzieren sich durch Gewerbesteuer, Grundsteuer, Gebühren und Zuweisungen.'],
  ['quiz', [
    {q: 'Wie lange dauert die Amtszeit des Bundespräsidenten?', o: ['5 Jahre mit einmaliger Wiederwahl', '4 Jahre', '8 Jahre ohne Wiederwahl', 'Lebenslang'], a: 0, e: 'Art. 54 GG.'},
    {q: 'Wie viele Stimmen braucht man in einem Bundestag mit 630 Mitgliedern für die Kanzlermehrheit?', o: ['316', '315', '420', '210'], a: 0, e: 'Mehr als die Hälfte: 630 / 2 = 315, also mindestens 316.'},
    {q: 'Wer sitzt im Bundesrat?', o: ['Mitglieder der Landesregierungen', 'Direkt gewählte Abgeordnete', 'Bundesrichter', 'Gewerkschafter'], a: 0, e: 'Der Bundesrat ist kein direkt gewähltes Gremium.'},
    {q: 'Was passiert, wenn der Bundesrat bei einem Zustimmungsgesetz Nein sagt?', o: ['Das Gesetz scheitert (oder geht in den Vermittlungsausschuss)', 'Der Bundestag überstimmt ihn', 'Der Kanzler entscheidet', 'Das Volk entscheidet'], a: 0, e: 'Ohne Zustimmung gibt es kein Gesetz.'},
    {q: 'Wer ist Chef der Landesregierung?', o: ['Ministerpräsident/in', 'Landrat', 'Bürgermeister', 'Bundesrat'], a: 0, e: 'Stadtstaaten: Regierender Bürgermeister / Präsident des Senats.'},
  ]],
]);

AP2.add('gk-wahlen', [
  ['h', 'Vertiefung: Wahlsysteme im Vergleich'],
  ['table', ['', 'Mehrheitswahl', 'Verhältniswahl', 'Deutschland (personalisierte Verhältniswahl)'], [
    ['Prinzip', 'Wer im Wahlkreis die meisten Stimmen hat, gewinnt. Alle anderen Stimmen verfallen.', 'Sitze nach Stimmenanteil der Parteien.', 'Erststimme für eine Person, Zweitstimme für eine Partei. Die Zweitstimme entscheidet über die Sitzverteilung.'],
    ['Vorteil', 'Klare Mehrheiten, enge Bindung zwischen Wähler und Abgeordnetem.', 'Fair: Alle Stimmen zählen.', 'Fairness und Bindung zum Wahlkreis.'],
    ['Nachteil', 'Viele Stimmen verfallen.', 'Viele kleine Parteien, schwierige Koalitionen.', 'Komplizierte Regeln, Sitzzahl schwankt.'],
    ['Beispiel', 'Großbritannien, USA', 'Niederlande, Israel', 'Deutschland'],
  ]],
  ['h', 'Rechenbeispiel: Sitzverteilung mit Fünf-Prozent-Hürde'],
  ['p', 'In einem kleinen Parlament mit **100 Sitzen** gibt es diese Zweitstimmen: Partei A 42 %, Partei B 31 %, Partei C 17 %, Partei D 6 %, Partei E 4 %. Partei E scheitert an der 5-%-Hürde.'],
  ['steps', [
    '**Hürde prüfen:** E hat 4 %. Das ist unter 5 %. E bekommt keine Sitze.',
    '**Gültige Stimmen:** 42 + 31 + 17 + 6 = **96 %**.',
    '**Anteil an den Sitzen:** Teile den Anteil jeder Partei durch 96 und multipliziere mit 100.',
    '**A:** 42 / 96 mal 100 = 43,75 Sitze, **B:** 32,29, **C:** 17,71, **D:** 6,25.',
    '**Runden:** 44, 32, 18, 6 = 100 Sitze. (Genaues Verfahren: Sainte-Laguë, höchste Restzahlen zuerst.)',
  ]],
  ['note', 'Die **Wahlrechtsreform 2023** hat Überhang- und Ausgleichsmandate abgeschafft. Der Bundestag hat feste **630 Sitze**. Wer im Wahlkreis gewinnt, bekommt den Sitz nur, wenn die Zweitstimmen der Partei dafür reichen.'],
  ['h', 'Vertiefung: Wahlbeteiligung berechnen'],
  ['ex', ['In einer Stadt gibt es 80.000 Wahlberechtigte. 56.000 haben gewählt.', 'Wahlbeteiligung = 56.000 / 80.000 mal 100 = **70 %**.', 'Nichtwähler = 24.000 = 30 %.']],
  ['quiz', [
    {q: 'Welche Stimme entscheidet bei der Bundestagswahl über die Sitzverteilung?', o: ['Zweitstimme', 'Erststimme', 'Beide gleich', 'Keine'], a: 0, e: 'Die Erststimme wählt die Person im Wahlkreis.'},
    {q: 'Wie viele Sitze hat der Bundestag nach der Reform von 2023?', o: ['630', '598', '736', '500'], a: 0, e: 'Feste Größe, keine Überhangmandate mehr.'},
    {q: 'Eine Partei hat 4,6 % der Zweitstimmen. Was passiert?', o: ['Sie bekommt keine Sitze (5-%-Hürde)', 'Sie bekommt 4,6 % der Sitze', 'Sie bekommt 5 Sitze', 'Neuwahl'], a: 0, e: 'Unter 5 % der Zweitstimmen gibt es keine Sitze.'},
    {q: 'Wahlbeteiligung: 45.000 von 60.000 haben gewählt. Wie hoch ist sie?', o: ['75 %', '25 %', '45 %', '60 %'], a: 0, e: '45.000 / 60.000 = 0,75.'},
  ]],
]);

AP2.add('gk-medien', [
  ['h', 'Vertiefung: Medienrecht und Pflichten'],
  ['table', ['Thema', 'Regel', 'Beispiel'], [
    ['**Impressum**', 'Jede geschäftliche Webseite braucht ein Impressum mit Name, Anschrift, E-Mail (§ 5 DDG).', 'Webseite eines Betriebs'],
    ['**Recht am eigenen Bild**', 'Fotos von Personen dürfen nur mit Einwilligung veröffentlicht werden (KUG).', 'Foto von Kollegen auf der Firmenseite'],
    ['**Urheberrecht**', 'Der Urheber entscheidet über Nutzung. Zitate sind mit Quelle erlaubt.', 'Bild aus dem Internet nicht einfach kopieren'],
    ['**Persönlichkeitsrecht**', 'Beleidigung und Verleumdung sind strafbar.', 'Hass-Kommentar'],
    ['**Jugendmedienschutz**', 'Altersfreigaben (FSK, USK), Jugendschutz im Netz.', 'Spiel ab 16'],
    ['**Presserecht**', 'Gegendarstellung bei falschen Tatsachen.', 'Zeitung muss Gegendarstellung drucken'],
    ['**Pressekodex**', 'Regeln des Presserats: Wahrheit, Achtung der Würde, Trennung von Werbung.', 'Schleichwerbung ist verboten'],
  ]],
  ['h', 'Filterblase und Echokammer'],
  ['table', ['Begriff', 'Erklärung', 'Gefahr'], [
    ['**Filterblase**', 'Algorithmen zeigen dir vor allem, was dir gefällt.', 'Du siehst andere Meinungen nicht.'],
    ['**Echokammer**', 'Du bist nur mit Gleichgesinnten verbunden. Alle bestätigen sich.', 'Meinungen werden extremer.'],
    ['**Fake News**', 'Absichtlich falsche Nachrichten.', 'Verunsichern Wähler.'],
    ['**Deepfake**', 'Mit KI erzeugte falsche Bilder, Videos oder Stimmen.', 'Täuschung, Rufschaden.'],
    ['**Bots**', 'Automatische Konten, die Meinungen verbreiten.', 'Scheinbare Mehrheit.'],
  ]],
  ['list', ['**Was tun?** Quelle prüfen (Impressum, Autor, Datum), mehrere Quellen vergleichen, Bilder rückwärts suchen, vor dem Teilen nachdenken.', 'In Deutschland haben die **öffentlich-rechtlichen Sender** (ARD, ZDF, Deutschlandradio) einen Auftrag zur Information. Sie werden über den **Rundfunkbeitrag** finanziert (18,36 Euro pro Monat und Wohnung).', '**Privatsender** finanzieren sich durch Werbung. **Zeitungen** durch Abo und Werbung.']],
  ['quiz', [
    {q: 'Was ist eine Filterblase?', o: ['Der Algorithmus zeigt vor allem Inhalte, die zu deinen Interessen passen', 'Ein Spamfilter', 'Ein Fotofilter', 'Ein Virus'], a: 0, e: 'Dadurch sieht man wenig andere Meinungen.'},
    {q: 'Wer darf ein Foto einer Person im Netz veröffentlichen?', o: ['Nur mit Einwilligung der Person', 'Jeder', 'Nur Journalisten', 'Niemand'], a: 0, e: 'Recht am eigenen Bild.'},
    {q: 'Was ist ein Deepfake?', o: ['Mit KI erzeugte falsche Medieninhalte', 'Ein tiefes Video', 'Eine Datenbank', 'Ein Passwort'], a: 0, e: 'Sie können sehr echt wirken.'},
    {q: 'Wie werden ARD und ZDF finanziert?', o: ['Hauptsächlich durch den Rundfunkbeitrag', 'Nur durch Werbung', 'Durch Steuern direkt', 'Durch Spenden'], a: 0, e: 'Pro Wohnung ein Beitrag.'},
  ]],
]);

AP2.add('gk-demografie', [
  ['h', 'Vertiefung: Kennzahlen berechnen'],
  ['table', ['Kennzahl', 'Formel', 'Beispiel'], [
    ['**Altenquotient**', 'Personen ab 65 / Personen von 20 bis 64 mal 100', '20 Mio. / 50 Mio. mal 100 = 40'],
    ['**Jugendquotient**', 'Personen unter 20 / Personen von 20 bis 64 mal 100', '15 Mio. / 50 Mio. mal 100 = 30'],
    ['**Gesamtquotient**', 'Altenquotient + Jugendquotient', '40 + 30 = 70'],
    ['**Geburtenrate (TFR)**', 'Durchschnittliche Kinderzahl pro Frau', 'In Deutschland etwa 1,4. Zum Erhalt der Bevölkerung nötig: etwa 2,1.'],
    ['**Lebenserwartung**', 'Durchschnittliches Lebensalter bei Geburt', 'Frauen etwa 83, Männer etwa 78 Jahre'],
    ['**Medianalter**', 'Alter, bei dem die Hälfte jünger und die Hälfte älter ist', 'Deutschland etwa 45 Jahre'],
  ]],
  ['ex', ['**Aufgabe:** 1990 kamen auf 100 Menschen im Alter 20 bis 64 etwa 24 Ältere (ab 65). 2040 sind es 47.', '**Rechnung:** 47 / 24 = 1,96. Der Altenquotient hat sich fast **verdoppelt**.', '**Folge:** Für jeden Rentner gibt es weniger Beitragszahler. 1990 waren es etwa 4 Beitragszahler je Rentner (100 / 24 = 4,2). 2040 nur noch etwa 2 (100 / 47 = 2,1).']],
  ['table', ['Maßnahme', 'Wirkung'], [
    ['Rente mit 67', 'Mehr Beitragszahler und weniger Rentenjahre'],
    ['Familienförderung (Kita, Elterngeld)', 'Mehr Geburten möglich, Beruf und Familie vereinbar'],
    ['Zuwanderung von Fachkräften', 'Mehr junge Beitragszahler'],
    ['Automatisierung und KI', 'Weniger Arbeitskräfte nötig'],
    ['Private Vorsorge (Riester, Betriebsrente)', 'Zweite und dritte Säule neben der gesetzlichen Rente'],
  ]],
  ['quiz', [
    {q: 'Altenquotient: 12 Mio. Ältere (65 plus) auf 40 Mio. Menschen von 20 bis 64. Wie hoch ist er?', o: ['30', '12', '40', '3,3'], a: 0, e: '12 / 40 mal 100 = 30.'},
    {q: 'Wie hoch ist die Geburtenrate zum Erhalt der Bevölkerung?', o: ['Etwa 2,1 Kinder pro Frau', 'Etwa 1,0', 'Etwa 4,0', 'Etwa 0,5'], a: 0, e: 'In Deutschland liegt sie bei etwa 1,4.'},
  ]],
]);

AP2.add('gk-gleichstellung', [
  ['h', 'Vertiefung: Gender Pay Gap berechnen'],
  ['p', 'Der **Gender Pay Gap** zeigt den Unterschied beim Stundenlohn zwischen Männern und Frauen. Man unterscheidet den **unbereinigten** Wert (alle Unterschiede) und den **bereinigten** Wert (gleiche Arbeit, gleiche Qualifikation).'],
  ['ex', ['**Formel:** Gap = (Männerlohn - Frauenlohn) / Männerlohn mal 100.', '**Beispiel:** Männer 24 Euro pro Stunde, Frauen 20,40 Euro pro Stunde. (24 - 20,40) / 24 mal 100 = **15 %**.', '**Deutschland:** unbereinigt etwa 16 %, bereinigt etwa 6 %.', '**Gründe:** Frauen arbeiten öfter in schlechter bezahlten Berufen, öfter in Teilzeit und unterbrechen die Karriere wegen Kindern. Ein kleiner Teil bleibt unerklärt und ist Diskriminierung.']],
  ['table', ['Maßnahme', 'Wirkung'], [
    ['Entgelttransparenzgesetz', 'Beschäftigte in größeren Betrieben dürfen erfragen, was Kollegen verdienen (Median).'],
    ['EU-Entgelttransparenzrichtlinie', 'Gehaltsangaben in Stellenanzeigen, Berichte über Lohnlücken (Umsetzung bis 2026).'],
    ['Kita-Ausbau', 'Eltern können Vollzeit arbeiten.'],
    ['Partnermonate beim Elterngeld', 'Väter nehmen mehr Elternzeit.'],
    ['Frauenquote', 'Mehr Frauen in Führung.'],
  ]],
  ['quiz', [
    {q: 'Männer verdienen 25 Euro pro Stunde, Frauen 21 Euro. Wie groß ist der Gender Pay Gap?', o: ['16 %', '4 %', '21 %', '19 %'], a: 0, e: '(25 - 21) / 25 mal 100 = 16 %.'},
    {q: 'Was ist der bereinigte Gender Pay Gap?', o: ['Lohnunterschied bei gleicher Arbeit und Qualifikation', 'Lohnunterschied aller Berufe', 'Der Unterschied bei Steuern', 'Der Unterschied bei Urlaub'], a: 0, e: 'In Deutschland etwa 6 %.'},
  ]],
]);

AP2.add('gk-eu', [
  ['h', 'Vertiefung: Euro, Schengen und Erweiterung'],
  ['table', ['Thema', 'Inhalt'], [
    ['**Euro-Zone**', '20 Staaten nutzen den Euro (Stand 2025). Kroatien trat 2023 bei. Bulgarien soll 2026 folgen.'],
    ['**Schengen-Raum**', 'Reisen ohne Grenzkontrollen zwischen den meisten EU-Staaten. Gemeinsame Außengrenze (Frontex). Kontrollen sind zeitweise erlaubt.'],
    ['**Kopenhagener Kriterien**', 'Wer der EU beitreten will, braucht Demokratie, Rechtsstaat, Menschenrechte, funktionierende Marktwirtschaft und muss EU-Recht übernehmen.'],
    ['**Austritt**', 'Art. 50 EU-Vertrag. Beispiel Brexit: Antrag 2017, Austritt 31.1.2020.'],
    ['**Vier Grundfreiheiten**', 'Freier Verkehr von Waren, Personen, Dienstleistungen und Kapital.'],
    ['**Haushalt**', 'Etwa 1 % der Wirtschaftsleistung der EU. Einnahmen: Beiträge der Staaten, Zölle. Ausgaben: Landwirtschaft, Regionalförderung, Forschung.'],
    ['**Amtssprachen**', '24'],
  ]],
  ['table', ['Vorteile für Betriebe in Deutschland', 'Beispiel'], [
    ['Kein Zoll im Binnenmarkt', 'Ein IT-Zulieferer in Polen liefert Hardware zollfrei.'],
    ['Gleiche Standards', 'CE-Zeichen gilt in der ganzen EU.'],
    ['Gemeinsamer Datenschutz', 'DSGVO gilt in allen Staaten.'],
    ['Arbeitnehmerfreizügigkeit', 'Fachkräfte aus Spanien können in Deutschland ohne Visum arbeiten.'],
    ['Förderprogramme', 'ESF unterstützt Weiterbildung, Erasmus+ den Austausch für Azubis.'],
  ]],
  ['quiz', [
    {q: 'Welche vier Grundfreiheiten gibt es im EU-Binnenmarkt?', o: ['Waren, Personen, Dienstleistungen, Kapital', 'Essen, Trinken, Wohnen, Reisen', 'Strom, Gas, Wasser, Öl', 'Wahl, Presse, Glaube, Streik'], a: 0, e: 'Der Binnenmarkt ist der Kern der EU.'},
    {q: 'Was regeln die Kopenhagener Kriterien?', o: ['Beitritt neuer Staaten zur EU', 'Das Euro-Gebiet', 'Den Haushalt', 'Das Wahlrecht'], a: 0, e: '1993 beschlossen.'},
  ]],
]);

AP2.add('gk-mitwirkung', [
  ['h', 'Vertiefung: Petition, Bürgerbegehren, Lobbyismus'],
  ['table', ['Instrument', 'Ablauf', 'Beispiel'], [
    ['**Petition** (Art. 17 GG)', 'Jede Person kann sich schriftlich oder online an den Bundestag oder Landtag wenden. Bei 50.000 Unterschriften in 4 Wochen (Bundestag) gibt es eine öffentliche Anhörung.', 'Online-Petition für ein besseres Bahn-Angebot'],
    ['**Bürgerbegehren**', 'Bürger sammeln Unterschriften in der Gemeinde. Bei genug Unterschriften folgt ein **Bürgerentscheid**.', 'Neues Schwimmbad ja oder nein'],
    ['**Volksbegehren**', 'Auf Landesebene. Ziel ist ein Volksentscheid über ein Gesetz.', 'Bayern: Artenschutz 2019'],
    ['**Demonstration**', 'Versammlung unter freiem Himmel; Anmeldung bei der Behörde (Art. 8 GG).', 'Fridays for Future'],
    ['**Lobbyismus**', 'Interessengruppen beeinflussen die Politik (Gespräche, Gutachten). Er ist legal, muss aber transparent sein (Lobbyregister seit 2022).', 'Verband der Autoindustrie'],
    ['**Ehrenamt**', 'Freiwillige Arbeit für die Gesellschaft.', 'Feuerwehr, Verein, Tafel'],
  ]],
  ['quiz', [
    {q: 'Wie heißt der Entscheid, der auf ein erfolgreiches Bürgerbegehren folgt?', o: ['Bürgerentscheid', 'Volksentscheid', 'Misstrauensvotum', 'Verfassungsbeschwerde'], a: 0, e: 'Auf Gemeindeebene.'},
    {q: 'In welchem Artikel steht das Petitionsrecht?', o: ['Art. 17 GG', 'Art. 1 GG', 'Art. 12 GG', 'Art. 38 GG'], a: 0, e: 'Jeder hat das Recht, Bitten und Beschwerden einzureichen.'},
  ]],
]);

AP2.add('gk-ki', [
  ['h', 'Vertiefung: KI im Betrieb und im Alltag'],
  ['table', ['Thema', 'Frage', 'Antwort'], [
    ['**Verzerrung (Bias)**', 'Warum entscheidet KI manchmal ungerecht?', 'Sie lernt aus Daten. Wenn die Daten Vorurteile enthalten, übernimmt sie diese. Beispiel: Bewerbungs-KI bevorzugt Männer.'],
    ['**Haftung**', 'Wer ist verantwortlich, wenn die KI Fehler macht?', 'Der Mensch oder die Firma, die sie einsetzt. Die KI selbst haftet nicht.'],
    ['**Transparenz**', 'Weiß man, wie die KI entscheidet?', 'Oft nicht („Black Box“). Die KI-Verordnung verlangt Erklärbarkeit bei Hochrisiko-Systemen.'],
    ['**Datenschutz**', 'Welche Daten dürfen in die KI?', 'Keine geheimen oder personenbezogenen Daten in öffentliche KI-Tools. DSGVO beachten.'],
    ['**Urheberrecht**', 'Darf KI mit fremden Texten lernen?', 'Rechtlich umstritten. Texte der KI können Urheberrechte verletzen.'],
    ['**Mitbestimmung**', 'Wer entscheidet über KI im Betrieb?', 'Der Betriebsrat bestimmt mit, wenn die KI Verhalten und Leistung überwachen kann (§ 87 BetrVG).'],
  ]],
  ['table', ['Risikostufe (AI Act)', 'Beispiel', 'Regel'], [
    ['**Unannehmbar**', 'Soziale Bewertung von Bürgern (Social Scoring)', 'Verboten'],
    ['**Hohes Risiko**', 'KI bei Bewerbung, Kreditvergabe, Medizin', 'Strenge Pflichten: Dokumentation, menschliche Aufsicht'],
    ['**Begrenztes Risiko**', 'Chatbots', 'Kennzeichnung: „Du sprichst mit einer KI“'],
    ['**Minimales Risiko**', 'Spamfilter, Videospiele', 'Keine besonderen Pflichten'],
  ]],
  ['quiz', [
    {q: 'Was bedeutet „Bias“ bei KI?', o: ['Verzerrung durch Vorurteile in den Trainingsdaten', 'Ein Programmierfehler', 'Eine Art von Speicher', 'Eine Netzwerkverbindung'], a: 0, e: 'KI kann Ungerechtigkeit verstärken.'},
    {q: 'Welche Stufe des AI Act ist verboten?', o: ['Unannehmbares Risiko, zum Beispiel Social Scoring', 'Spamfilter', 'Chatbot', 'Suchmaschine'], a: 0, e: 'Diese Praktiken sind verboten.'},
  ]],
]);
