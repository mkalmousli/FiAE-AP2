// Probeprüfung 6, Wirtschafts- und Sozialkunde: gebundene Aufgaben (Situation AgroTec Landtechnik GmbH), Rechtsstand 2026.
(function () {
  const ID = 'exam6-wiso';
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 6 (Landtechnik)', t: 'WiSo: Wirtschafts- und Sozialkunde (gebundene Aufgaben)', blocks: []});
  AP2.exam.start(ID, {minutes: 60, cover: AP2.exam.COVER.wiso,
    hint: 'Wie in der echten Prüfung: 60 Minuten, 100 Punkte, nur gebundene Aufgaben. Lies die Situation. Rechne mit dem Taschenrechner. Nach dem Auswerten siehst du bei jeder Aufgabe, warum die falschen Antworten falsch sind.',
    intro: [['p', 'Sie sind Auszubildende bzw. Auszubildender zum Fachinformatiker für Anwendungsentwicklung bei der **AgroTec Landtechnik GmbH** in Oldenburg. Die Firma baut und verkauft Traktoren, Mähdrescher und Ersatzteile. Sie hat **340 Beschäftigte**, einen Betriebsrat und ist **tarifgebunden**. Die IT-Abteilung entwickelt auch eine App, die Maschinendaten (z. B. Standort und Kraftstoffverbrauch) an die Kunden schickt. Alle Aufgaben beziehen sich auf diesen Betrieb. Rechtsstand: 2026.']],
    words: [['tarifgebunden', 'Die Firma muss den Tarifvertrag (Regeln für Lohn und Arbeitszeit) anwenden.'], ['Beschäftigte', 'Alle Menschen, die in der Firma arbeiten.'], ['Brutto / Netto', 'Brutto: Lohn vor Abzügen. Netto: Lohn, der auf das Konto kommt.'], ['Fachinformatiker', 'Ausbildungsberuf für Software und IT-Systeme.'], ['Ersatzteil', 'Ein Teil, das ein kaputtes Teil ersetzt.'], ['Telemetrie', 'Messdaten von einer Maschine werden automatisch gesendet.'], ['Gefährdung', 'Etwas, das einen Menschen verletzen oder krank machen kann.'], ['Überhang', 'Es gibt zu viel von etwas. Zum Beispiel zu viele Waren am Markt.']]});
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 1: Ausbildung und Arbeitsrecht (16 Punkte)',
    tasks: [
      {pts: 3, topic: 'Ausbildungsvertrag', q: 'Welche **zwei** Angaben müssen nach § 11 BBiG im Ausbildungsvertrag stehen?',
        op: '**Welche zwei Angaben** heißt: Es sind genau zwei Antworten richtig. Du musst beide ankreuzen.',
        hint: 'Denk an den Vertrag: Was lernt man, wie lange, was bekommt man?',
        mc: {o: ['Die sachliche und zeitliche Gliederung der Ausbildung', 'Die Höhe und Fälligkeit der Ausbildungsvergütung', 'Die Namen aller Betriebsratsmitglieder', 'Die Noten der Zwischenprüfung'], c: [0, 1]},
        a: ['§ 11 BBiG nennt unter anderem: Art, Gliederung und Ziel der Ausbildung, **Beginn und Dauer**, Ausbildungsstätte, **tägliche Arbeitszeit**, Probezeit, **Vergütung**, Urlaub, Kündigungsvoraussetzungen und Hinweise auf Tarifverträge und Betriebsvereinbarungen.', 'Falsch: Die Namen der Betriebsratsmitglieder gehören nicht in den Vertrag. Zwischenprüfungsnoten gibt es beim Vertragsschluss noch nicht.'], see: ['wiso-bbig']},
      {pts: 3, topic: 'Urlaub Jugendliche', q: 'Ein Auszubildender ist **16 Jahre** alt und arbeitet an **5 Tagen pro Woche**. Das Jugendarbeitsschutzgesetz gibt Jugendlichen unter 17 Jahren **30 Werktage** Urlaub (Werktage = Montag bis Samstag). Wie viele **Arbeitstage** Urlaub hat er?',
        op: '**Berechnen** heißt: Du rechnest und gibst eine Zahl an. Hier: Werktage in Arbeitstage umrechnen.',
        hint: 'Teile durch 6 (Werktage pro Woche) und rechne mal 5 (seine Arbeitstage).',
        num: {c: 25, tol: 0, unit: 'Arbeitstage'},
        a: ['30 Werktage / 6 Tage x 5 Tage = **25 Arbeitstage**. Das ist die Regel nach § 19 JArbSchG. Erwachsene haben nach BUrlG nur 24 Werktage = 20 Arbeitstage bei der 5-Tage-Woche.'], see: ['wiso-urlaub', 'wiso-jarbschg']},
      {pts: 3, topic: 'Arbeitszeit und Pausen', q: 'Eine Mitarbeiterin arbeitet an einem Messetag **10 Stunden**. Wie viele Minuten Ruhepause muss sie nach dem Arbeitszeitgesetz **mindestens** bekommen?',
        op: '**Mindestens** heißt: die kleinste erlaubte Menge.',
        hint: 'Bei mehr als 6 Stunden gibt es eine Mindestpause. Bei mehr als 9 Stunden ist sie länger.',
        ctx: [['table', ['Arbeitszeit am Tag', 'Mindestpause (§ 4 ArbZG)'], [['bis 6 Stunden', 'keine Pflicht'], ['mehr als 6 bis 9 Stunden', '30 Minuten'], ['mehr als 9 Stunden', '45 Minuten']]]],
        num: {c: 45, tol: 0, unit: 'Minuten'},
        a: ['10 Stunden sind **mehr als 9 Stunden**: also mindestens **45 Minuten** Pause. Die Pause darf in Blöcke von je mindestens 15 Minuten geteilt werden. Wichtig: Die tägliche Arbeitszeit darf in der Regel 8 Stunden sein, bis 10 Stunden nur mit Ausgleich in 6 Monaten (§ 3 ArbZG).'], see: ['wiso-arbeitsvertrag']},
      {pts: 4, topic: 'Kündigungsarten', q: 'Ordnen Sie jedem Fall die passende Art der Beendigung zu.',
        op: '**Zuordnen** heißt: Du verbindest jede Aussage mit genau einem Begriff.',
        match: {keys: ['Ordentliche Kündigung', 'Fristlose (außerordentliche) Kündigung', 'Aufhebungsvertrag', 'Änderungskündigung'], items: [
          ['Ein Mitarbeiter hat in der Kasse 500 Euro gestohlen. Der Betrieb kündigt sofort.', 1],
          ['Beide Seiten unterschreiben eine Vereinbarung, dass das Arbeitsverhältnis am 31. Juli endet.', 2],
          ['Der Betrieb kündigt mit der gesetzlichen Frist und bietet eine Stelle in einer anderen Abteilung an.', 3],
          ['Eine Mitarbeiterin kündigt mit vier Wochen Frist zum Monatsende, weil sie umzieht.', 0]]},
        a: ['**Fristlose Kündigung** (§ 626 BGB): wichtiger Grund, Weiterarbeit unzumutbar (Diebstahl). **Aufhebungsvertrag**: beide Seiten sind einverstanden, keine Kündigung. **Änderungskündigung**: Kündigung plus Angebot geänderter Bedingungen. **Ordentliche Kündigung**: mit Frist, auch durch den Arbeitnehmer ohne Grund möglich.'], see: ['wiso-kuendigung']},
      {pts: 3, topic: 'Kündigungsfrist', q: 'Ein Mitarbeiter (seit 1 Jahr im Betrieb) kündigt. Die Kündigung geht dem Betrieb am **Freitag, 6. März 2026** zu. Der Vertrag nennt keine besondere Frist. Wann endet das Arbeitsverhältnis?',
        op: '**Wann** heißt: Du rechnest ein Datum aus. Achte auf „zum 15. oder zum Monatsende“.',
        hint: 'Rechne 4 Wochen ab Zugang. Dann nimm den nächsten 15. oder das nächste Monatsende.',
        ctx: [['table', ['Regel § 622 Abs. 1 BGB', 'Inhalt'], [['Grundkündigungsfrist', '4 Wochen'], ['Kündigungstermin', 'zum 15. oder zum Ende eines Kalendermonats']]]],
        mc: {o: ['3. April 2026', '15. April 2026', '30. April 2026', '31. März 2026'], c: [1]},
        a: ['4 Wochen ab 6. März = **3. April 2026**. Der nächste erlaubte Termin ist der **15. April 2026**. Der 3. April ist kein erlaubter Termin. Der 31. März wäre zu früh (die Frist wäre nur 3 Wochen). Der 30. April wäre zu spät; er ist zwar erlaubt, aber nicht der **erste** Termin nach der Frist.'], see: ['wiso-kuendigung']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 2: Mitbestimmung und Tarifvertrag (9 Punkte)',
    tasks: [
      {pts: 3, topic: 'Betriebsrat Größe', q: 'Bei AgroTec arbeiten **340 wahlberechtigte Arbeitnehmer**. Aus wie vielen Mitgliedern besteht der Betriebsrat nach § 9 BetrVG?',
        op: '**Wie viele** heißt: Du liest die Zahl in der Tabelle ab.',
        ctx: [['table', ['Wahlberechtigte Arbeitnehmer', 'Mitglieder im Betriebsrat'], [['5 bis 20', '1'], ['21 bis 50', '3'], ['51 bis 100', '5'], ['101 bis 200', '7'], ['201 bis 400', '9'], ['401 bis 700', '11']]]],
        num: {c: 9, tol: 0, unit: 'Mitglieder'},
        a: ['340 liegt in der Gruppe **201 bis 400**: Der Betriebsrat hat **9 Mitglieder**. Die Wahl ist alle **4 Jahre**. Die regelmäßigen Wahlen finden von März bis Mai 2026 statt.'], see: ['wiso-betriebsrat']},
      {pts: 3, topic: 'Mitbestimmung', q: 'AgroTec will die **Gleitzeit abschaffen** und feste Arbeitszeiten für alle einführen. Welche Aussage ist richtig?',
        mc: {o: ['Der Betriebsrat hat nur ein Informationsrecht.', 'Der Betriebsrat hat ein Mitbestimmungsrecht nach § 87 BetrVG. Ohne Einigung entscheidet die Einigungsstelle.', 'Die Geschäftsleitung darf allein entscheiden, weil es um die Organisation geht.', 'Nur die Gewerkschaft darf zustimmen.'], c: [1]},
        a: ['§ 87 Abs. 1 Nr. 2 BetrVG: **Beginn und Ende der täglichen Arbeitszeit** sind mitbestimmungspflichtig. Ohne Zustimmung des Betriebsrats gilt die Änderung nicht. Bei Streit entscheidet die **Einigungsstelle**. Nur informiert wird der Betriebsrat z. B. bei Unternehmensplanung. Gewerkschaften entscheiden im Betrieb nicht mit.'], see: ['wiso-betriebsrat']},
      {pts: 3, topic: 'Günstigkeitsprinzip', q: 'Im Tarifvertrag steht ein Mindestgehalt von **3.300 Euro** für eine Stelle. Im Arbeitsvertrag eines Mitarbeiters stehen **3.450 Euro**. Welches Gehalt bekommt er?',
        mc: {o: ['3.300 Euro, weil der Tarifvertrag immer vorgeht.', '3.450 Euro, weil für den Arbeitnehmer die günstigere Regel gilt.', '3.375 Euro, der Durchschnitt.', 'Er muss selbst wählen.'], c: [1]},
        a: ['**Günstigkeitsprinzip** (§ 4 Abs. 3 TVG): Abweichungen vom Tarifvertrag sind erlaubt, wenn sie für den Arbeitnehmer **günstiger** sind. Der Tarifvertrag legt also nur das **Minimum** fest. Ein geringeres Gehalt als 3.300 Euro wäre unwirksam.'], see: ['wiso-tarif']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 3: Sozialversicherung und Lohnabrechnung (17 Punkte)',
    intro: [['p', 'In dieser Aufgabengruppe gelten diese Beitragssätze (2026). Die Beiträge zur Kranken- und Pflegeversicherung teilen sich Arbeitgeber und Arbeitnehmer; der Anteil des Arbeitnehmers steht in der Tabelle.'],
      ['table', ['Versicherung', 'Anteil Arbeitnehmer (vom Brutto)', 'Hinweis'], [['Krankenversicherung', '8,75 % (7,3 % + halber Zusatzbeitrag 1,45 %)', 'Bemessungsgrenze 5.812,50 Euro/Monat'], ['Pflegeversicherung', '1,8 %', 'Kinderlose über 23 Jahre: 2,4 %'], ['Rentenversicherung', '9,3 %', 'Bemessungsgrenze 8.450 Euro/Monat'], ['Arbeitslosenversicherung', '1,3 %', 'Bemessungsgrenze 8.450 Euro/Monat'], ['Unfallversicherung', '0 %', 'zahlt allein der Arbeitgeber']]]],
    tasks: [
      {pts: 4, topic: 'SV-Beiträge', q: 'Ein Entwickler hat **3.800 Euro brutto** im Monat. Er hat ein Kind. Berechnen Sie die **Summe seiner Sozialversicherungsbeiträge** (Anteil Arbeitnehmer).',
        op: '**Berechnen** heißt: rechnen und das Ergebnis nennen. Alle vier Versicherungen zählen.',
        hint: 'Rechne die Prozentsätze zusammen: 8,75 + 1,8 + 9,3 + 1,3. Dann mal 3.800.',
        num: {c: 803.7, tol: 0.05, unit: 'Euro'},
        a: ['KV: 3.800 x 8,75 % = 332,50 Euro. PV: 3.800 x 1,8 % = 68,40 Euro. RV: 3.800 x 9,3 % = 353,40 Euro. AV: 3.800 x 1,3 % = 49,40 Euro.', 'Summe: 332,50 + 68,40 + 353,40 + 49,40 = **803,70 Euro** (21,15 % von 3.800). Das Brutto liegt unter allen Bemessungsgrenzen. Die Unfallversicherung zahlt der Arbeitgeber.'], see: ['wiso-sv', 'wiso-gehalt']},
      {pts: 3, topic: 'Auszahlungsbetrag', q: 'Zum Brutto von 3.800 Euro und den Sozialabgaben von 803,70 Euro kommt eine **Lohnsteuer mit Solidaritätszuschlag von 540,00 Euro**. Wie viel Euro **netto** werden ausgezahlt?',
        num: {c: 2456.3, tol: 0.05, unit: 'Euro'},
        a: ['Netto = Brutto - Sozialversicherung - Steuern = 3.800 - 803,70 - 540,00 = **2.456,30 Euro**. Der Arbeitgeber zahlt zusätzlich seinen Anteil an der SV (ohne Abzug vom Lohn) und den Unfallversicherungsbeitrag.'], see: ['wiso-gehalt']},
      {pts: 4, topic: 'Zweige der SV', q: 'Ordnen Sie jede Leistung dem zuständigen Zweig der Sozialversicherung zu.',
        match: {keys: ['Krankenversicherung', 'Rentenversicherung', 'Arbeitslosenversicherung', 'Pflegeversicherung', 'Unfallversicherung'], items: [
          ['Eine Mitarbeiterin ist 8 Wochen krank. Nach der Lohnfortzahlung bekommt sie Krankengeld.', 0],
          ['Ein Mitarbeiter wird nach einem Bandscheibenvorfall dauerhaft voll erwerbsgemindert und bekommt eine Rente.', 1],
          ['Ein Mitarbeiter verliert seine Stelle nach einer Insolvenz und bekommt Arbeitslosengeld I.', 2],
          ['Eine Mitarbeiterin pflegt die Mutter (Pflegegrad 3). Die Mutter bekommt Pflegegeld.', 3],
          ['Ein Monteur verletzt sich auf dem Weg zur Arbeit und bekommt Reha-Maßnahmen.', 4]]},
        a: ['KV: Krankengeld ab der 7. Woche (nach 6 Wochen Entgeltfortzahlung durch den Arbeitgeber). RV: Rente wegen Erwerbsminderung. AV: Arbeitslosengeld I. PV: Leistungen bei Pflegebedürftigkeit nach Pflegegrad. UV: Wegeunfall ist Arbeitsunfall, Reha und Verletztengeld.'], see: ['wiso-sv', 'wiso-kv', 'wiso-rv', 'wiso-alv', 'wiso-pv', 'wiso-uv']},
      {pts: 3, topic: 'Beitrag UV', q: 'Wer zahlt die Beiträge zur **gesetzlichen Unfallversicherung** (Berufsgenossenschaft)?',
        mc: {o: ['Arbeitgeber und Arbeitnehmer je zur Hälfte', 'Nur der Arbeitnehmer', 'Nur der Arbeitgeber', 'Der Staat aus Steuermitteln'], c: [2]},
        a: ['Die **Unfallversicherung** wird **allein vom Arbeitgeber** bezahlt. Dafür haftet er im Normalfall nicht persönlich für Arbeitsunfälle (Haftungsausschluss). Die Höhe richtet sich nach Lohnsumme und Gefahrklasse.'], see: ['wiso-uv']},
      {pts: 3, topic: 'Minijob', q: 'Ein Student arbeitet als Minijobber bei AgroTec und bekommt den gesetzlichen **Mindestlohn von 13,90 Euro** pro Stunde. Die Geringfügigkeitsgrenze beträgt **603 Euro** im Monat. Wie viele Stunden darf er im Monat **höchstens** arbeiten (auf zwei Nachkommastellen gerundet)?',
        op: '**Höchstens** heißt: die größte erlaubte Zahl. Rechne 603 durch den Stundenlohn.',
        num: {c: 43.38, tol: 0.02, unit: 'Stunden'},
        a: ['603 Euro / 13,90 Euro je Stunde = **43,38 Stunden** im Monat. Die Grenze orientiert sich an 10 Wochenstunden zum Mindestlohn. Wird sie überschritten, ist es kein Minijob mehr (Midijob bis 2.000 Euro mit verminderten Beiträgen für Arbeitnehmer).'], see: ['wiso-gehalt']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 4: Rechtsformen und Unternehmen (9 Punkte)',
    tasks: [
      {pts: 3, topic: 'GmbH', q: 'AgroTec ist eine GmbH. Welche Aussage zur GmbH ist richtig?',
        mc: {o: ['Die Gesellschafter haften mit ihrem Privatvermögen unbeschränkt.', 'Das Mindeststammkapital beträgt 25.000 Euro. Die Gesellschafter haften nur mit der Einlage.', 'Die GmbH braucht kein Stammkapital.', 'Eine GmbH kann nur von einer Person gegründet werden.'], c: [1]},
        a: ['§ 5 GmbHG: Das **Stammkapital** beträgt mindestens **25.000 Euro**. Bei Gründung müssen mindestens 12.500 Euro eingezahlt sein. Die GmbH haftet mit dem **Gesellschaftsvermögen**; die Gesellschafter nur mit ihrer **Einlage**. Eine GmbH kann von einer oder mehreren Personen gegründet werden. Die UG (haftungsbeschränkt) braucht nur 1 Euro.'], see: ['wiso-unternehmen']},
      {pts: 3, topic: 'Rechtsformen Haftung', q: 'Welche Rechtsform passt: Eine Person gründet ein kleines Software-Unternehmen. Sie will **wenig Startkapital** einsetzen, aber **nicht mit dem Privatvermögen haften**.',
        mc: {o: ['Einzelunternehmen', 'Offene Handelsgesellschaft (OHG)', 'Unternehmergesellschaft (haftungsbeschränkt)', 'Gesellschaft bürgerlichen Rechts (GbR)'], c: [2]},
        a: ['Die **UG (haftungsbeschränkt)** ist eine „Mini-GmbH“: Gründung ab **1 Euro** Stammkapital, Haftung nur mit dem Gesellschaftsvermögen. Es muss ein Viertel des Gewinns als Rücklage gebildet werden. Einzelunternehmen, OHG und GbR haften **unbeschränkt** mit dem Privatvermögen.'], see: ['wiso-unternehmen']},
      {pts: 3, topic: 'Prokura', q: 'Die Prokuristin von AgroTec möchte ein **Grundstück** der Firma verkaufen. Was gilt?',
        mc: {o: ['Das darf sie, weil die Prokura alle Geschäfte umfasst.', 'Dafür braucht sie eine ausdrückliche besondere Befugnis. Die Prokura umfasst Verkauf und Belastung von Grundstücken nicht.', 'Das darf nur der Betriebsrat entscheiden.', 'Das darf sie nur, wenn sie im Handelsregister als Gesellschafterin steht.'], c: [1]},
        a: ['Die **Prokura** (§§ 48 ff. HGB) gilt für alle gerichtlichen und außergerichtlichen Geschäfte des Handelsgewerbes. **Ausnahme**: Veräußerung und Belastung von **Grundstücken** nur mit **besonderer Befugnis** (§ 49 Abs. 2 HGB). Die Prokura wird ins **Handelsregister** eingetragen.'], see: ['wiso-vollmacht']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 5: Kaufvertrag und Verbraucherschutz (12 Punkte)',
    tasks: [
      {pts: 3, topic: 'Widerruf', q: 'Frau Meier (Privatperson) kauft im Online-Shop von AgroTec ein Gartengerät. Die Ware kommt am **Mittwoch, 4. Februar 2026** bei ihr an. Bis wann kann sie den Kauf **widerrufen**, wenn der Shop richtig informiert hat?',
        op: '**Bis wann** heißt: Du nennst ein Datum. Die Frist beginnt mit dem Erhalt der Ware.',
        mc: {o: ['Mittwoch, 11. Februar 2026', 'Mittwoch, 18. Februar 2026', 'Mittwoch, 4. März 2026', 'Dienstag, 3. Februar 2027'], c: [1]},
        a: ['Bei Fernabsatzverträgen mit Verbrauchern gilt ein **Widerrufsrecht von 14 Tagen** (§§ 312g, 355 BGB). Die Frist beginnt mit dem **Erhalt der Ware**: 4. Februar + 14 Tage = **18. Februar 2026**. Ein Grund ist nicht nötig. Wurde nicht über das Widerrufsrecht informiert, endet es erst nach 12 Monaten und 14 Tagen.'], see: ['wiso-vertrag']},
      {pts: 3, topic: 'Beweislast', q: 'Ein Verbraucher kauft ein Navigationsgerät für Traktoren (Neuware). Nach **8 Monaten** fällt es aus. Der Händler sagt: „Das haben Sie kaputt gemacht.“ Wer muss was beweisen?',
        mc: {o: ['Der Käufer muss beweisen, dass der Mangel schon beim Kauf da war.', 'Der Händler muss beweisen, dass der Mangel beim Kauf noch nicht da war.', 'Der Hersteller muss ein Gutachten zahlen.', 'Beide müssen nichts beweisen, der Händler muss reparieren.'], c: [1]},
        a: ['**Beweislastumkehr** (§ 477 BGB): Beim Verbrauchsgüterkauf wird in den ersten **12 Monaten** vermutet, dass der Mangel schon bei der Übergabe vorlag (Neuregelung seit 2022; vorher 6 Monate). Der **Händler** muss das Gegenteil beweisen. Die Gewährleistungsfrist beträgt **2 Jahre**.'], see: ['wiso-vertrag']},
      {pts: 3, topic: 'Verzug', q: 'Ein Landwirtschaftsbetrieb (Unternehmer) zahlt eine Rechnung der AgroTec über 8.000 Euro nicht. Die Zahlung war zum **1. April** fällig. Wann kommt der Kunde in **Zahlungsverzug**, ohne dass AgroTec zuerst mahnt?',
        mc: {o: ['Sofort am 2. April, immer.', 'Spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung (bei Unternehmen auch ohne Mahnung).', 'Erst nach der dritten Mahnung.', 'Erst nach einem gerichtlichen Mahnbescheid.'], c: [1]},
        a: ['§ 286 Abs. 3 BGB: Spätestens **30 Tage nach Fälligkeit und Zugang der Rechnung** kommt der Schuldner in Verzug, auch **ohne Mahnung**. Bei einem **kalendermäßig bestimmten** Termin (z. B. „zahlbar bis 1. April“) tritt Verzug schon am Tag danach ein. Bei Verbrauchern gilt die 30-Tage-Regel nur, wenn auf sie in der Rechnung hingewiesen wurde.'], see: ['wiso-vertrag']},
      {pts: 3, topic: 'Skonto', q: 'AgroTec kauft Ersatzteile für **12.000 Euro**. Der Lieferant bietet **2 % Skonto** bei Zahlung innerhalb von 10 Tagen. Wie viel Euro spart AgroTec?',
        num: {c: 240, tol: 0, unit: 'Euro'},
        a: ['12.000 x 2 % = **240 Euro** Skonto. Überweisung: 11.760 Euro. Skonto ist ein Preisnachlass für schnelle Zahlung; er verringert den Einkaufspreis. Rabatt ist dagegen ein Nachlass beim Kauf selbst (Menge, Treue).'], see: ['wiso-vertrag']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 6: Wirtschaft, Markt und Preise (10 Punkte)',
    tasks: [
      {pts: 4, topic: 'Markt', q: 'Die Grafik zeigt Angebot und Nachfrage für gebrauchte Traktoren auf einer Online-Börse. Wie groß ist der **Nachfrageüberhang** bei einem Preis von **30 Tausend Euro**?',
        ctx: [['chart', {kind: 'line', w: 640, h: 280, labels: ['20', '30', '40', '50', '60'], series: [{n: 'Nachfrage', d: [80, 60, 40, 25, 10], k: 'accent'}, {n: 'Angebot', d: [20, 30, 40, 60, 80], k: 'ok'}], ymax: 90, yl: 'Menge (Stück)', cap: 'Waagerecht: Preis in Tausend Euro, senkrecht: Menge in Stück'}]],
        num: {c: 30, tol: 0, unit: 'Stück'},
        a: ['Bei 30: Nachfrage **60**, Angebot **30**. Nachfrageüberhang = 60 - 30 = **30 Stück**. Der **Gleichgewichtspreis** liegt bei **40 Tausend Euro** (Menge 40). Bei einem Preis unter dem Gleichgewicht wollen mehr Menschen kaufen, als angeboten wird. Die Preise steigen dann.'], see: ['wiso-markt']},
      {pts: 3, topic: 'Inflation', q: 'Der Preisindex für Ersatzteile stieg von **118,1** auf **120,5** Punkte. Wie hoch ist die **Preissteigerungsrate** (Inflationsrate) in Prozent? Runden Sie auf zwei Nachkommastellen.',
        num: {c: 2.03, tol: 0.01, unit: '%'},
        a: ['(120,5 / 118,1 - 1) x 100 = **2,03 %**. Falsch wäre die Differenz der Punkte (2,4), weil man sie auf den alten Wert beziehen muss. Folge: Mit dem gleichen Geld kann man weniger kaufen (Kaufkraftverlust).'], see: ['wiso-konjunktur']},
      {pts: 3, topic: 'Konjunktur', q: 'Die Wirtschaft befindet sich in einem **Abschwung**. Welche Merkmale sind typisch?',
        mc: {o: ['Die Investitionen und die Nachfrage sinken, die Arbeitslosigkeit steigt.', 'Die Auftragsbücher sind voll, die Preise steigen stark.', 'Die Unternehmen stellen viele neue Beschäftigte ein.', 'Der Staat senkt die Steuern, weil die Einnahmen so hoch sind.'], c: [0]},
        a: ['Im **Abschwung** (Rezession, wenn das BIP zwei Quartale in Folge sinkt) bestellen Kunden weniger, Betriebe investieren weniger, Arbeitslosigkeit steigt. Volle Auftragsbücher, starke Preissteigerungen und Neueinstellungen sind Merkmale von **Aufschwung/Hochkonjunktur**.'], see: ['wiso-konjunktur']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 7: Kostenrechnung (9 Punkte)',
    tasks: [
      {pts: 3, topic: 'Kalkulation', q: 'AgroTec berechnet die Selbstkosten für ein Ersatzteil-Set. Berechnen Sie die **Selbstkosten** in Euro.',
        ctx: [['table', ['Position', 'Wert'], [['Materialeinzelkosten', '6.000,00 Euro'], ['Materialgemeinkosten', '12 % der Materialeinzelkosten'], ['Fertigungslöhne', '4.500,00 Euro'], ['Fertigungsgemeinkosten', '180 % der Fertigungslöhne'], ['Verwaltungs- und Vertriebsgemeinkosten', '10 % der Herstellkosten']]]],
        op: '**Berechnen** heißt: alle Schritte rechnen. Hier: Herstellkosten, dann Zuschlag, dann Selbstkosten.',
        num: {c: 21252, tol: 0.5, unit: 'Euro'},
        a: ['MGK: 6.000 x 12 % = 720. FGK: 4.500 x 180 % = 8.100. **Herstellkosten** = 6.000 + 720 + 4.500 + 8.100 = **19.320**. Verwaltungs-/Vertriebsgemeinkosten: 19.320 x 10 % = 1.932. **Selbstkosten** = 19.320 + 1.932 = **21.252 Euro**.', 'Fehler: Wer 10 % auf die Selbstkosten oder auf die Materialkosten bezieht, rechnet falsch. Die Zuschlagsbasis steht in der Tabelle.'], see: ['wiso-kennzahlen']},
      {pts: 3, topic: 'Gewinnschwelle', q: 'Für ein Ersatzteil-Paket gelten: **Fixkosten 90.000 Euro** im Jahr, **Verkaufspreis 450 Euro** je Paket, **variable Kosten 270 Euro** je Paket. Bei wie vielen Paketen liegt die **Gewinnschwelle** (Break-even)?',
        hint: 'Erst den Deckungsbeitrag je Stück rechnen, dann die Fixkosten durch den Deckungsbeitrag teilen.',
        num: {c: 500, tol: 0, unit: 'Pakete'},
        a: ['Deckungsbeitrag je Stück = 450 - 270 = **180 Euro**. Gewinnschwelle = Fixkosten / Deckungsbeitrag = 90.000 / 180 = **500 Pakete**. Ab dem 501. Paket entsteht Gewinn.'], see: ['wiso-kennzahlen']},
      {pts: 3, topic: 'Gewinn', q: 'AgroTec verkauft im Jahr **700 Pakete** (Daten wie in der vorherigen Aufgabe). Wie hoch ist der **Gewinn**?',
        num: {c: 36000, tol: 0, unit: 'Euro'},
        a: ['Gesamter Deckungsbeitrag: 700 x 180 = 126.000 Euro. Gewinn = 126.000 - 90.000 (Fixkosten) = **36.000 Euro**. Kontrolle: Umsatz 700 x 450 = 315.000; Kosten 90.000 + 700 x 270 = 279.000; Gewinn 36.000.'], see: ['wiso-kennzahlen']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 8: Marketing (3 Punkte)',
    tasks: [
      {pts: 3, topic: 'Marketing-Mix', q: 'Ordnen Sie die Maßnahmen von AgroTec dem passenden Instrument des **Marketing-Mix** zu.',
        match: {keys: ['Produktpolitik', 'Preispolitik', 'Distributionspolitik', 'Kommunikationspolitik'], items: [
          ['Ein neuer Traktor bekommt eine Kabine mit besserem Lärmschutz.', 0],
          ['Landwirte bekommen bei Bestellung im Winter 3 % Frühbucherrabatt.', 1],
          ['Ersatzteile werden über ein Netz von Partnerhändlern geliefert.', 2],
          ['AgroTec zeigt die neue Maschine auf einer Landwirtschaftsmesse.', 3]]},
        a: ['**Produkt**: Eigenschaften, Qualität, Service. **Preis**: Preis, Rabatt, Zahlungsbedingungen. **Distribution**: Vertriebsweg, Lieferung, Lager. **Kommunikation**: Werbung, Messe, Social Media, Verkaufsförderung. Zusammen: die „4 P“.'], see: ['wiso-kennzahlen']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 9: Arbeitsschutz (6 Punkte)',
    tasks: [
      {pts: 3, topic: 'STOP-Prinzip', q: 'Bei einer Gefährdung gilt eine Rangfolge der Schutzmaßnahmen (STOP-Prinzip). Bringen Sie die Maßnahmen in die richtige **Reihenfolge** (zuerst die wichtigste).',
        order: [['Substitution: gefährlichen Stoff durch einen ungefährlichen ersetzen', 1], ['Technische Maßnahmen: Schutzhaube, Absaugung', 2], ['Organisatorische Maßnahmen: Arbeitszeit, Unterweisung, Zugang beschränken', 3], ['Personenbezogene Maßnahmen: Gehörschutz, Handschuhe', 4]],
        a: ['**S**ubstitution, **T**echnik, **O**rganisation, **P**ersönliche Schutzausrüstung. Die Gefahr wird zuerst an der Quelle beseitigt. Persönliche Schutzausrüstung ist die letzte Möglichkeit, weil sie nur den Einzelnen schützt und von ihm richtig getragen werden muss (§ 4 ArbSchG).'], see: ['wiso-arbeitsschutz']},
      {pts: 3, topic: 'Arbeitsunfall', q: 'Ein Mechaniker bei AgroTec verletzt sich bei der Arbeit und ist **5 Tage** arbeitsunfähig. Was muss der Betrieb tun?',
        mc: {o: ['Nichts, weil es nur 5 Tage sind.', 'Den Unfall der Berufsgenossenschaft anzeigen, weil er länger als 3 Kalendertage dauert.', 'Nur den Betriebsrat informieren.', 'Die Krankenkasse bezahlt alles, eine Meldung ist unnötig.'], c: [1]},
        a: ['§ 193 SGB VII: Arbeitsunfälle, die zu mehr als **drei Kalendertagen Arbeitsunfähigkeit** führen, muss der Unternehmer **binnen drei Tagen** dem Unfallversicherungsträger melden. Jeder Unfall wird im Verbandbuch dokumentiert. Die Unfallversicherung zahlt, nicht die Krankenkasse.'], see: ['wiso-arbeitsschutz', 'wiso-uv']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 10: Nachhaltigkeit und Datenschutz (9 Punkte)',
    tasks: [
      {pts: 3, topic: 'Nachhaltigkeit', q: 'AgroTec entwickelt eine Software, die mit Sensoren auf dem Feld **Dünger gezielt dosiert**. So wird weniger Dünger verbraucht. Welcher Dimension der Nachhaltigkeit ordnen Sie das **vor allem** zu?',
        mc: {o: ['Ökologisch, weil weniger Dünger Boden und Wasser entlastet.', 'Sozial, weil die Mitarbeiter mehr Urlaub bekommen.', 'Ökonomisch, weil das Unternehmen nur Gewinn macht.', 'Keiner, Nachhaltigkeit betrifft nur Energie.'], c: [0]},
        a: ['Drei Dimensionen: **ökologisch** (Umwelt), **ökonomisch** (Wirtschaft), **sozial** (Menschen). Weniger Dünger = weniger Belastung von Boden und Grundwasser: ökologisch. Sparen von Düngerkosten ist ein zusätzlicher ökonomischer Effekt, aber der Hauptzweck ist hier ökologisch.'], see: ['wiso-nachhaltigkeit']},
      {pts: 3, topic: 'Datenschutz', q: 'Die App von AgroTec sendet **Standort und Betriebsstunden** der Maschinen an AgroTec. Die Maschine gehört einem Landwirt, der damit fährt. Sind diese Daten **personenbezogene Daten** nach der DSGVO?',
        mc: {o: ['Nein, es sind nur Daten über eine Maschine.', 'Ja, wenn man sie einem bestimmten Menschen zuordnen kann, z. B. dem Fahrer oder dem Besitzer.', 'Nein, Standortdaten sind nie personenbezogen.', 'Ja, aber nur wenn sie der Landwirt veröffentlicht.'], c: [1]},
        a: ['Art. 4 DSGVO: Personenbezogen sind alle Informationen über eine **identifizierte oder identifizierbare** Person. Standortdaten einer Maschine, die sich einem Landwirt zuordnen lassen, zeigen sein Verhalten. Deshalb braucht AgroTec eine **Rechtsgrundlage** (Vertrag oder Einwilligung), muss informieren und die Daten schützen.'], see: ['wiso-ki']},
      {pts: 3, topic: 'Datenpanne', q: 'Hacker haben Kundendaten von AgroTec gestohlen. AgroTec bemerkt es am Montag um 9 Uhr. Innerhalb welcher Zeit muss die Firma die **Datenschutzbehörde** informieren, wenn ein Risiko für Betroffene besteht?',
        mc: {o: ['unverzüglich, möglichst binnen 72 Stunden', 'innerhalb von 30 Tagen', 'am Ende des Geschäftsjahres', 'gar nicht, nur die Kunden müssen informiert werden'], c: [0]},
        a: ['Art. 33 DSGVO: Meldung an die Aufsichtsbehörde **unverzüglich und möglichst binnen 72 Stunden** nach Bekanntwerden, wenn ein **Risiko** für die Rechte der Betroffenen besteht. Bei hohem Risiko müssen auch die **Betroffenen** informiert werden (Art. 34). Bußgelder: bis zu 20 Millionen Euro oder 4 % des Jahresumsatzes.'], see: ['wiso-ki']},
    ],
  });
  AP2.exam.end(ID);
})();
