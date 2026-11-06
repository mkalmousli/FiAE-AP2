// Probeprüfung 7, Wirtschafts- und Sozialkunde: gebundene Aufgaben (Situation Kinowelt Nordlicht GmbH & Co. KG), Rechtsstand 2026.
(function () {
  const ID = 'exam7-wiso';
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 7 (Kino)', t: 'WiSo: Wirtschafts- und Sozialkunde (gebundene Aufgaben)', blocks: []});
  AP2.exam.start(ID, {minutes: 60, cover: AP2.exam.COVER.wiso,
    hint: 'Wie in der echten Prüfung: 60 Minuten, 100 Punkte, nur gebundene Aufgaben. Lies zuerst die Situation. Bei Aufgaben mit „Berechnen“ brauchst du den Taschenrechner. Nach dem Auswerten steht bei jeder Aufgabe, warum falsche Antworten falsch sind.',
    intro: [['p', 'Sie sind Auszubildende bzw. Auszubildender zum Fachinformatiker für Anwendungsentwicklung bei der **Kinowelt Nordlicht GmbH & Co. KG** in Kiel. Die Firma betreibt **6 Kinos** mit 28 Sälen. Es arbeiten dort **180 Beschäftigte**, viele in Teilzeit und als Minijobber. Es gibt noch **keinen Betriebsrat**. Die IT-Abteilung betreut das Online-Ticketsystem, die Kassen und die Filmvorführ-Software. Alle Aufgaben beziehen sich auf diesen Betrieb. Rechtsstand: 2026.']],
    words: [['Komplementär', 'Gesellschafter einer KG, der mit seinem ganzen Vermögen haftet.'], ['Kommanditist', 'Gesellschafter einer KG, der nur mit seiner Einlage haftet.'], ['Minijobber', 'Arbeitnehmer mit einem Verdienst bis 603 Euro im Monat (2026).'], ['Auslastung', 'Wie viele Plätze sind besetzt? Besucher geteilt durch Plätze.'], ['Filmmiete', 'Geld, das das Kino dem Filmverleih für einen Film zahlt.'], ['Einwilligung', 'Man sagt freiwillig und bewusst „Ja“ zur Nutzung der eigenen Daten.'], ['Umsatzsteuer (USt)', 'Steuer auf Verkäufe. Sie ist im Preis enthalten. Kino: 7 %.'], ['Oligopol', 'Wenige große Anbieter teilen den Markt unter sich auf.'], ['Gehörschutz', 'Ohrstöpsel oder Kapseln, die vor Lärm schützen.']]});
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 1: Ausbildung und Arbeitsrecht (19 Punkte)',
    tasks: [
      {pts: 3, topic: 'Ausbildungsvergütung', q: 'Im Vertrag einer Auszubildenden im **ersten Ausbildungsjahr** (Beginn 2026) stehen **700 Euro** brutto im Monat. Der Betrieb ist nicht tarifgebunden. Die Mindestausbildungsvergütung im ersten Jahr beträgt 724 Euro. Was gilt?',
        op: '**Was gilt** heißt: Du wählst die Rechtsfolge. Prüfe das Gesetz.',
        mc: {o: ['700 Euro sind erlaubt, weil der Betrieb nicht tarifgebunden ist.', 'Die Vereinbarung ist unwirksam. Sie hat Anspruch auf mindestens 724 Euro.', '700 Euro sind erlaubt, wenn der Betriebsrat zustimmt.', 'Die Vergütung darf in der Probezeit niedriger sein.'], c: [1]},
        a: ['§ 17 BBiG: Die Vergütung muss **angemessen** sein und mindestens die **Mindestausbildungsvergütung** erreichen (2026: **724 Euro** im 1. Jahr, in den weiteren Jahren Zuschläge: 2. Jahr + 18 %, 3. Jahr + 35 %, 4. Jahr + 40 %). Eine niedrigere Vereinbarung ist unwirksam. Auch in der Probezeit gilt der volle Betrag.'], see: ['wiso-bbig']},
      {pts: 3, topic: 'Jugendarbeitsschutz', q: 'Ein **17-jähriger Auszubildender** soll am Freitag an der Kinokasse bis **22:30 Uhr** arbeiten. Der Betrieb ist kein Gastgewerbe und hat keinen Schichtbetrieb im Sinne der Ausnahmen. Was sagt das Jugendarbeitsschutzgesetz?',
        mc: {o: ['Das ist erlaubt, weil er fast volljährig ist.', 'Das ist verboten. Jugendliche dürfen grundsätzlich nur zwischen 6 und 20 Uhr arbeiten.', 'Das ist erlaubt, wenn die Eltern es erlauben.', 'Das ist erlaubt, wenn er eine Stunde Pause bekommt.'], c: [1]},
        a: ['§ 14 JArbSchG: Jugendliche (unter 18) dürfen nur zwischen **6 und 20 Uhr** beschäftigt werden. Ausnahmen gibt es zum Beispiel im Gastgewerbe (bis 22 Uhr, ab 16 Jahren), in mehrschichtigen Betrieben (bis 23 Uhr, ab 16) und für Bäckereien. Die Zustimmung der Eltern ändert das Gesetz nicht. Das Kino ist hier keine Ausnahme.'], see: ['wiso-jarbschg']},
      {pts: 3, topic: 'Elternzeit', q: 'Eine Mitarbeiterin bekommt im Juni 2026 ein Kind und möchte Elternzeit nehmen. Welche Aussage ist richtig?',
        mc: {o: ['Elternzeit gibt es nur für Mütter.', 'Elternzeit ist bis zu drei Jahre je Kind möglich. Sie muss spätestens 7 Wochen vor dem Beginn schriftlich verlangt werden.', 'Die Elternzeit muss der Betriebsrat genehmigen.', 'In der Elternzeit darf man nicht arbeiten.'], c: [1]},
        a: ['§§ 15, 16 BEEG: Beide Elternteile haben Anspruch auf **bis zu 3 Jahre** Elternzeit je Kind. Die Anmeldung erfolgt **schriftlich spätestens 7 Wochen** vor Beginn (bei Kindern bis 3 Jahre). In der Elternzeit ist **Teilzeit bis 32 Wochenstunden** erlaubt. Es besteht **Kündigungsschutz**. Elterngeld (Staat) ersetzt einen Teil des Einkommens.'], see: ['wiso-arbeitsvertrag']},
      {pts: 3, topic: 'Teilzeit', q: 'Ein Techniker, seit 2 Jahren bei Kinowelt, möchte seine Arbeitszeit verringern. Welche Voraussetzung gilt für den **Teilzeitanspruch** nach § 8 TzBfG?',
        mc: {o: ['Der Betrieb hat mehr als 15 Beschäftigte und das Arbeitsverhältnis besteht seit mehr als 6 Monaten.', 'Der Betrieb hat mehr als 100 Beschäftigte.', 'Man hat mindestens ein Kind unter 3 Jahren.', 'Die Gewerkschaft muss zustimmen.'], c: [0]},
        a: ['§ 8 TzBfG: Anspruch hat, wer **mehr als 6 Monate** beschäftigt ist, wenn der Arbeitgeber in der Regel **mehr als 15 Arbeitnehmer** beschäftigt. Der Antrag erfolgt **3 Monate** vorher in Textform. Der Arbeitgeber darf nur aus **betrieblichen Gründen** ablehnen. Ein Kind ist keine Voraussetzung.'], see: ['wiso-arbeitsvertrag']},
      {pts: 4, topic: 'Kündigungsschutz Schwelle', q: 'Das Kündigungsschutzgesetz gilt nur in Betrieben mit **mehr als 10 Arbeitnehmern**. Teilzeitkräfte zählen anteilig: bis 20 Stunden pro Woche = 0,5; bis 30 Stunden = 0,75; darüber = 1. Azubis zählen nicht. Ein kleiner Kinobetrieb hat **6 Vollzeitkräfte**, **4 Kräfte mit 20 Wochenstunden** und **4 Kräfte mit 30 Wochenstunden**. Wie viele Arbeitnehmer zählt der Betrieb?',
        op: '**Wie viele** heißt: Du rechnest eine Zahl aus. Zähle jede Gruppe einzeln.',
        hint: 'Rechne: 6 x 1 + 4 x 0,5 + 4 x 0,75.',
        num: {c: 11, tol: 0, unit: 'Arbeitnehmer'},
        a: ['6 x 1 = 6. 4 x 0,5 = 2. 4 x 0,75 = 3. Summe: 6 + 2 + 3 = **11**. 11 sind **mehr als 10**: Das Kündigungsschutzgesetz gilt (§ 23 KSchG), wenn das Arbeitsverhältnis länger als 6 Monate besteht (§ 1). Eine Kündigung braucht dann einen Grund (personen-, verhaltens- oder betriebsbedingt).'], see: ['wiso-kuendigung']},
      {pts: 3, topic: 'Überstundenzuschlag', q: 'Eine Kinomitarbeiterin verdient **18 Euro pro Stunde**. Sie arbeitet im Monat **6 Überstunden**. Laut Betriebsvereinbarung gibt es dafür einen **Zuschlag von 25 %**. Wie viel Euro brutto bekommt sie für die Überstunden?',
        num: {c: 135, tol: 0, unit: 'Euro'},
        a: ['Stundenlohn mit Zuschlag: 18 x 1,25 = 22,50 Euro. 6 Stunden x 22,50 = **135 Euro**. (Ohne Zuschlag wären es nur 108 Euro.) Einen gesetzlichen Anspruch auf Überstundenzuschlag gibt es nicht; er steht im Tarif- oder Arbeitsvertrag.'], see: ['wiso-gehalt']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 2: Mitbestimmung (6 Punkte)',
    tasks: [
      {pts: 3, topic: 'Betriebsratsgröße', q: 'Kinowelt hat 180 wahlberechtigte Arbeitnehmer. Aus wie vielen Mitgliedern besteht ein Betriebsrat dort?',
        ctx: [['table', ['Wahlberechtigte Arbeitnehmer', 'Mitglieder'], [['21 bis 50', '3'], ['51 bis 100', '5'], ['101 bis 200', '7'], ['201 bis 400', '9']]]],
        num: {c: 7, tol: 0, unit: 'Mitglieder'},
        a: ['180 liegt in der Gruppe **101 bis 200**: **7 Mitglieder** (§ 9 BetrVG). Ein Betriebsrat kann in Betrieben mit mindestens 5 wahlberechtigten Arbeitnehmern (3 wählbar) gewählt werden.'], see: ['wiso-betriebsrat']},
      {pts: 3, topic: 'Betriebsrat gründen', q: 'Mehrere Beschäftigte möchten einen Betriebsrat gründen. Es gibt bisher keinen. Was ist der **erste** Schritt?',
        mc: {o: ['Die Geschäftsführung muss den Betriebsrat einsetzen.', 'Drei Wahlberechtigte oder eine Gewerkschaft laden zu einer Betriebsversammlung ein. Dort wird ein Wahlvorstand gewählt.', 'Der Betriebsrat wird vom Arbeitsgericht bestimmt.', 'Man wartet, bis die IHK es vorschreibt.'], c: [1]},
        a: ['§ 17 BetrVG: Gibt es keinen Betriebsrat, laden **drei Wahlberechtigte** oder eine im Betrieb vertretene **Gewerkschaft** zu einer **Wahlversammlung** ein. Diese wählt den **Wahlvorstand**, der die Wahl organisiert. Der Arbeitgeber darf die Wahl nicht behindern (Straftat, § 119 BetrVG). Wahlbewerber haben besonderen Kündigungsschutz.'], see: ['wiso-betriebsrat']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 3: Sozialversicherung und Lohnabrechnung (17 Punkte)',
    intro: [['p', 'Für die Rechenaufgaben dieser Gruppe gelten diese Anteile der Arbeitnehmer (2026):'],
      ['table', ['Versicherung', 'Satz Arbeitnehmer', 'Beitragsbemessungsgrenze (Monat)'], [['Krankenversicherung', '8,75 %', '5.812,50 Euro'], ['Pflegeversicherung', '1,8 % (Kinderlose ab 23 Jahre: 2,4 %)', '5.812,50 Euro'], ['Rentenversicherung', '9,3 %', '8.450,00 Euro'], ['Arbeitslosenversicherung', '1,3 %', '8.450,00 Euro']]]],
    tasks: [
      {pts: 4, topic: 'SV-Beiträge', q: 'Der Kinoleiter hat **3.150 Euro brutto** im Monat. Er hat **keine Kinder** und ist über 23 Jahre alt. Berechnen Sie die **Summe der Sozialversicherungsbeiträge** (Anteil Arbeitnehmer) in Euro.',
        op: '**Berechnen** heißt: Rechenweg und Ergebnis. Achte auf den höheren Pflegesatz für Kinderlose.',
        hint: 'Zähle die Sätze zusammen: 8,75 + 2,4 + 9,3 + 1,3. Das Brutto liegt unter allen Grenzen.',
        num: {c: 685.13, tol: 0.02, unit: 'Euro'},
        a: ['Gesamtsatz: 8,75 + 2,4 + 9,3 + 1,3 = **21,75 %**. 3.150 x 21,75 % = **685,13 Euro** (685,125).', 'Einzeln: KV 275,63; PV 75,60; RV 292,95; AV 40,95. Mit dem Satz 1,8 % für Pflege wäre das Ergebnis falsch (66,57 Euro weniger), weil Kinderlose mehr zahlen.'], see: ['wiso-sv', 'wiso-gehalt']},
      {pts: 4, topic: 'Auszahlung', q: 'Zusätzlich zahlt der Kinoleiter **498,60 Euro** Lohnsteuer und Solidaritätszuschlag. Wie hoch ist sein **Nettogehalt** (Auszahlung)? Rechnen Sie mit den Sozialabgaben von 685,13 Euro.',
        num: {c: 1966.27, tol: 0.02, unit: 'Euro'},
        a: ['3.150,00 - 685,13 - 498,60 = **1.966,27 Euro**. Das ist der Betrag, der auf das Konto kommt.'], see: ['wiso-gehalt']},
      {pts: 3, topic: 'Rente Beitragsbemessungsgrenze', q: 'Ein Prokurist verdient **9.000 Euro brutto** im Monat. Wie viel Euro **Rentenversicherung** (Anteil Arbeitnehmer) werden abgezogen?',
        op: '**Beitragsbemessungsgrenze** heißt: Nur bis zu diesem Betrag zahlt man Beiträge.',
        num: {c: 785.85, tol: 0.02, unit: 'Euro'},
        a: ['Die Grenze der Rentenversicherung liegt bei **8.450 Euro**. Beitrag: 8.450 x 9,3 % = **785,85 Euro**. Der Teil über 8.450 Euro bleibt beitragsfrei. Wer 9.000 x 9,3 % = 837 rechnet, übersieht die Grenze.'], see: ['wiso-rv']},
      {pts: 3, topic: 'Arbeitslosengeld', q: 'Ein Techniker verliert seine Stelle. Er hat **ein Kind**. Das pauschalierte Netto-Entgelt beträgt **2.150 Euro** im Monat. Er bekommt **67 %**. Wie hoch ist das monatliche **Arbeitslosengeld I**?',
        num: {c: 1440.5, tol: 0.5, unit: 'Euro'},
        a: ['Arbeitslosengeld I: **67 %** mit mindestens einem Kind, sonst **60 %** (§ 149 SGB III). 2.150 x 0,67 = **1.440,50 Euro**. Ohne Kind wären es 1.290 Euro. Voraussetzung: mindestens 12 Monate Versicherungspflicht in den letzten 30 Monaten und Meldung bei der Arbeitsagentur.'], see: ['wiso-alv']},
      {pts: 3, topic: 'Krankengeld', q: 'Ein Mitarbeiter ist ab dem 1. März wegen einer Operation krank. Was gilt?',
        mc: {o: ['Der Arbeitgeber zahlt 6 Wochen den Lohn weiter. Danach zahlt die Krankenkasse Krankengeld.', 'Die Krankenkasse zahlt vom ersten Tag Krankengeld.', 'Der Arbeitgeber zahlt unbegrenzt den Lohn.', 'Die Rentenversicherung zahlt ab dem ersten Tag.'], c: [0]},
        a: ['Entgeltfortzahlungsgesetz: Der Arbeitgeber zahlt bis zu **6 Wochen** den vollen Lohn. Danach zahlt die **Krankenkasse** Krankengeld: **70 % des Bruttos**, höchstens **90 % des Nettos**, bis 78 Wochen innerhalb von 3 Jahren für dieselbe Krankheit. Die Rentenversicherung zahlt bei medizinischer Reha.'], see: ['wiso-krank', 'wiso-kv']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 4: Rechtsformen und Unternehmen (9 Punkte)',
    tasks: [
      {pts: 3, topic: 'GmbH & Co. KG', q: 'Die Kinowelt Nordlicht ist eine **GmbH & Co. KG**. Welche Aussage ist richtig?',
        mc: {o: ['Alle Gesellschafter haften unbeschränkt mit dem Privatvermögen.', 'Der persönlich haftende Gesellschafter (Komplementär) ist eine GmbH. Deshalb ist die Haftung insgesamt auf Gesellschaftsvermögen beschränkt.', 'Die Kommanditisten führen die Geschäfte allein.', 'Eine GmbH & Co. KG braucht kein Eintrag im Handelsregister.'], c: [1]},
        a: ['Bei der **KG** gibt es mindestens einen **Komplementär** (haftet unbeschränkt) und **Kommanditisten** (haften nur mit der Einlage). Bei der GmbH & Co. KG ist der Komplementär eine **GmbH**. Deren Haftung ist auf das GmbH-Vermögen begrenzt. Die Geschäftsführung liegt beim Komplementär. Eintragung ins **Handelsregister** ist Pflicht.'], see: ['wiso-unternehmen']},
      {pts: 3, topic: 'Gewinnverteilung', q: 'Die Verwaltungs-GmbH gehört A (50 %), B (30 %) und C (20 %). Sie schüttet **84.000 Euro** Gewinn aus. Wie viel Euro bekommt **B**?',
        num: {c: 25200, tol: 0, unit: 'Euro'},
        a: ['84.000 x 30 % = **25.200 Euro**. A bekommt 42.000, C bekommt 16.800 (Summe 84.000). Die Verteilung folgt den **Geschäftsanteilen** (§ 29 GmbHG). Auf die Ausschüttung zahlen die Gesellschafter Kapitalertragsteuer (Abgeltungsteuer).'], see: ['wiso-unternehmen']},
      {pts: 3, topic: 'Handelsregister', q: 'Wo steht, wer die Firma **vertritt** und ob jemand **Prokura** hat?',
        mc: {o: ['Im Gewerberegister der Stadt', 'Im Handelsregister beim Amtsgericht', 'Im Grundbuch', 'Im Melderegister'], c: [1]},
        a: ['Das **Handelsregister** (Amtsgericht, öffentlich, elektronisch) enthält Firma, Sitz, Rechtsform, Vertretungsberechtigte und **Prokura**. Das Gewerberegister enthält Gewerbeanmeldungen, das Grundbuch Grundstücke. Eintragungen genießen öffentlichen Glauben.'], see: ['wiso-vollmacht', 'wiso-unternehmen']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 5: Kaufvertrag und Verbraucherschutz (12 Punkte)',
    tasks: [
      {pts: 3, topic: 'Widerruf Kinokarte', q: 'Eine Kundin kauft im Online-Shop von Kinowelt eine Karte für eine **bestimmte Vorstellung** am Samstag um 20 Uhr. Am Freitag möchte sie widerrufen. Was gilt?',
        mc: {o: ['Sie kann innerhalb von 14 Tagen widerrufen, ohne Grund.', 'Es gibt kein Widerrufsrecht, weil die Leistung an einem festen Termin erbracht wird (Freizeitdienstleistung).', 'Sie kann nur widerrufen, wenn sie einen Arzt-Termin hat.', 'Sie kann widerrufen, wenn der Film schlecht bewertet wird.'], c: [1]},
        a: ['§ 312g Abs. 2 Nr. 9 BGB: Kein Widerrufsrecht bei Verträgen über **Freizeitbetätigungen** (Kino, Konzert) mit einem **bestimmten Termin**. Sonst gilt bei Fernabsatz 14 Tage. Kinowelt muss darauf vor dem Kauf hinweisen. Ein Recht zum Umtausch kann der Betrieb freiwillig anbieten (Kulanz).'], see: ['wiso-vertrag']},
      {pts: 3, topic: 'Umsatzsteuer', q: 'Eine Kinokarte kostet **10,70 Euro** (Brutto). Auf Kinokarten gilt der ermäßigte Umsatzsteuersatz von **7 %**. Wie hoch ist der **Umsatzsteuerbetrag** in der Karte?',
        op: '**Brutto** heißt: Preis mit Steuer. Der Nettopreis ist Brutto geteilt durch 1,07.',
        num: {c: 0.7, tol: 0.01, unit: 'Euro'},
        a: ['Netto = 10,70 / 1,07 = **10,00 Euro**. USt = 10,70 - 10,00 = **0,70 Euro**. Falsch wäre 10,70 x 7 % = 0,75, weil die 7 % vom **Nettopreis** berechnet werden, nicht vom Bruttopreis.'], see: ['wiso-steuern']},
      {pts: 3, topic: 'Rügepflicht', q: 'Kinowelt kauft bei einem Großhändler (Unternehmer) 40 Popcorn-Maschinen. Beim Auspacken am Dienstag sieht ein Mitarbeiter, dass 5 Maschinen einen **Kratzer und eine Delle** haben. Was muss Kinowelt tun?',
        mc: {o: ['Nichts. Die Gewährleistung beträgt 2 Jahre, man kann jederzeit reklamieren.', 'Den Mangel unverzüglich dem Verkäufer anzeigen (rügen). Sonst gilt die Ware als genehmigt.', 'Die Maschinen sofort selbst reparieren.', 'Den Kaufpreis um 10 % kürzen, ohne den Verkäufer zu informieren.'], c: [1]},
        a: ['§ 377 HGB: Beim **beiderseitigen Handelskauf** muss der Käufer die Ware **unverzüglich prüfen** und offene Mängel **unverzüglich rügen**. Sonst gilt die Ware als **genehmigt**. Beim Verbrauchsgüterkauf gibt es diese Pflicht nicht. Danach: Nacherfüllung (Reparatur oder Ersatz); bei Fehlschlag Rücktritt oder Minderung.'], see: ['wiso-vertrag']},
      {pts: 3, topic: 'AGB', q: 'In den AGB des Kino-Shops steht: „Bei Beschädigung eines Sitzes zahlt der Kunde pauschal 2.000 Euro.“ Ein Verbraucher findet das zu hoch. Was ist richtig?',
        mc: {o: ['AGB sind immer gültig, wenn der Kunde den Shop nutzt.', 'Unangemessene Benachteiligungen in AGB sind unwirksam (§ 307 BGB). Der Schaden muss sich am tatsächlich üblichen Schaden orientieren.', 'AGB gelten nur zwischen Unternehmern.', 'AGB sind ungültig, weil sie nicht handschriftlich sind.'], c: [1]},
        a: ['AGB (§§ 305 ff. BGB) sind für viele Verträge vorformulierte Bedingungen. Sie werden Vertragsbestandteil, wenn der Kunde zumutbar Kenntnis nehmen kann. **Überraschende** oder **unangemessen benachteiligende** Klauseln sind **unwirksam**. Pauschale Schadensersatzbeträge müssen dem typischen Schaden entsprechen.'], see: ['wiso-vertrag']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 6: Wirtschaft, Markt und Preise (10 Punkte)',
    tasks: [
      {pts: 4, topic: 'Marktformen', q: 'Ordnen Sie jedem Beispiel die passende **Marktform** zu.',
        match: {keys: ['Monopol', 'Oligopol', 'Polypol'], items: [
          ['In einer Kleinstadt gibt es nur ein einziges Kino.', 0],
          ['In einer Großstadt teilen drei große Kinoketten fast alle Besucher unter sich auf.', 1],
          ['Auf dem Wochenmarkt verkaufen 30 Stände Gemüse.', 2],
          ['Zwei Streaming-Konzerne bestimmen fast allein den Preis für Serien in der Region.', 1]]},
        a: ['**Monopol**: ein Anbieter. **Oligopol**: wenige Anbieter mit großem Einfluss auf den Preis. **Polypol**: viele kleine Anbieter, kaum Einfluss auf den Preis. Zwei Konzerne bilden ein Oligopol (genauer: Duopol).'], see: ['wiso-markt']},
      {pts: 3, topic: 'Preisdifferenzierung', q: 'Kinowelt verkauft am **Dienstag** alle Karten für 7 Euro statt 11 Euro. Warum macht der Betrieb das?',
        mc: {o: ['Um an schwach besuchten Tagen mehr Besucher zu bekommen und die Säle besser auszulasten.', 'Weil das Gesetz einen Kinotag vorschreibt.', 'Um den Gewinn pro Karte zu erhöhen.', 'Um den Wettbewerb auszuschalten.'], c: [0]},
        a: ['Das ist **zeitliche Preisdifferenzierung**: gleiches Produkt, verschieden teuer, je nach Zeit. Der Dienstag hat wenig Nachfrage; ein niedriger Preis zieht preisbewusste Kunden an. Die Fixkosten (Miete, Technik) fallen sowieso an. Mehr Besucher bringen auch Umsatz mit Getränken und Popcorn.'], see: ['wiso-markt']},
      {pts: 3, topic: 'Marktanteil', q: 'In Kiel gibt es im Jahr **640.000 Kinobesuche**. Davon entfallen **192.000** auf Kinowelt. Wie hoch ist der **Marktanteil** in Prozent?',
        num: {c: 30, tol: 0.1, unit: '%'},
        a: ['Marktanteil = eigener Absatz / Marktvolumen x 100 = 192.000 / 640.000 x 100 = **30 %**. Er zeigt die Stärke im Markt. Das **Marktvolumen** ist die gesamte Menge aller Anbieter; das **Marktpotenzial** wäre die maximal mögliche Menge.'], see: ['wiso-kennzahlen']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 7: Kostenrechnung (9 Punkte)',
    tasks: [
      {pts: 3, topic: 'Gewinnschwelle', q: 'Ein Kino hat monatliche **Fixkosten von 45.500 Euro**. Eine Karte bringt **10,00 Euro netto**. Variable Kosten (Filmmiete, Kasse) betragen **3,50 Euro** je Besucher. Bei wie vielen Besuchern liegt die **Gewinnschwelle** im Monat?',
        hint: 'Deckungsbeitrag je Besucher = Preis - variable Kosten. Dann Fixkosten geteilt durch Deckungsbeitrag.',
        num: {c: 7000, tol: 0, unit: 'Besucher'},
        a: ['Deckungsbeitrag je Besucher: 10,00 - 3,50 = **6,50 Euro**. Gewinnschwelle: 45.500 / 6,50 = **7.000 Besucher**. Darunter macht das Kino Verlust, darüber Gewinn.'], see: ['wiso-kennzahlen']},
      {pts: 3, topic: 'Bezugspreis', q: 'Kinowelt kauft 400 Euro (Listenpreis) Süßwaren. Der Lieferant gibt **10 % Rabatt** und **2 % Skonto** (auf den Preis nach Rabatt). Die Lieferkosten betragen **30 Euro**. Wie hoch ist der **Bezugspreis**?',
        op: '**Bezugspreis** heißt: Was kostet die Ware wirklich, wenn sie im Lager liegt?',
        hint: 'Zuerst Rabatt abziehen, dann Skonto, dann Bezugskosten addieren.',
        num: {c: 382.8, tol: 0.02, unit: 'Euro'},
        a: ['Listenpreis 400,00. Rabatt 10 % = 40,00 -> 360,00 (Zieleinkaufspreis). Skonto 2 % von 360 = 7,20 -> 352,80 (Bareinkaufspreis). Bezugskosten + 30,00 -> **382,80 Euro** (Bezugspreis). Rabatt und Skonto verringern, Bezugskosten erhöhen den Preis.'], see: ['wiso-kennzahlen']},
      {pts: 3, topic: 'Auslastung', q: 'Ein Saal hat **180 Plätze**. An einem Tag laufen **4 Vorstellungen**. Es kommen insgesamt **504 Besucher**. Wie hoch ist die **Auslastung** in Prozent?',
        num: {c: 70, tol: 0.1, unit: '%'},
        a: ['Plätze am Tag: 180 x 4 = 720. Auslastung = 504 / 720 x 100 = **70 %**. Wer nur durch 180 teilt (280 %), vergisst die Zahl der Vorstellungen.'], see: ['wiso-kennzahlen']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 8: Marketing (3 Punkte)',
    tasks: [
      {pts: 3, topic: 'AIDA', q: 'Eine Werbeanzeige soll nach der **AIDA-Formel** aufgebaut sein. Bringen Sie die Stufen in die richtige **Reihenfolge**.',
        order: [['Attention: Aufmerksamkeit wecken (großes Bild, Schlagzeile)', 1], ['Interest: Interesse wecken (spannende Infos zum Film)', 2], ['Desire: Wunsch wecken („Das will ich sehen!“)', 3], ['Action: zum Handeln auffordern („Jetzt Karte buchen“)', 4]],
        a: ['AIDA: **A**ttention, **I**nterest, **D**esire, **A**ction. Die Werbung führt den Kunden Schritt für Schritt vom Bemerken bis zum Kauf.'], see: ['wiso-kennzahlen']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 9: Arbeitsschutz (6 Punkte)',
    tasks: [
      {pts: 3, topic: 'Sicherheitszeichen', q: 'Ordnen Sie jedes Sicherheitszeichen im Kino der **Farbe** zu.',
        match: {keys: ['Rot', 'Gelb', 'Blau', 'Grün'], items: [
          ['Rauchen verboten im Vorführraum', 0],
          ['Vorsicht, Stufe!', 1],
          ['Gehörschutz tragen', 2],
          ['Notausgang', 3]]},
        a: ['**Rot**: Verbot und Brandschutz. **Gelb**: Warnung. **Blau**: Gebot (muss gemacht werden). **Grün**: Rettungsweg, Erste Hilfe, Notausgang (ASR A1.3).'], see: ['wiso-arbeitsschutz']},
      {pts: 3, topic: 'Lärmschutz', q: 'In der Vorführung gibt es Lärm von **87 dB(A)**. Was ist nach der Lärm- und Vibrations-Arbeitsschutzverordnung nötig?',
        mc: {o: ['Nichts, Lärm gilt erst ab 100 dB(A).', 'Ab 85 dB(A) (oberer Auslösewert) müssen Beschäftigte Gehörschutz tragen. Der Arbeitgeber stellt ihn.', 'Ab 80 dB(A) ist der Arbeitsplatz verboten.', 'Der Betriebsrat muss den Lärm messen.'], c: [1]},
        a: ['**Untere Auslösewerte**: 80 dB(A) – Gehörschutz zur Verfügung stellen, Unterweisung. **Obere Auslösewerte**: 85 dB(A) – Gehörschutz **muss getragen** werden, Lärmbereich kennzeichnen. Maßnahmen: zuerst Lärm an der Quelle senken (STOP-Prinzip).'], see: ['wiso-arbeitsschutz']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 10: Nachhaltigkeit und Datenschutz (9 Punkte)',
    tasks: [
      {pts: 3, topic: 'Mehrweg', q: 'Kinowelt verkauft Getränke und Popcorn zum Mitnehmen in Einwegbechern. Was verlangt das Verpackungsgesetz in der Regel?',
        mc: {o: ['Einwegbecher sind verboten.', 'Der Betrieb muss auch eine Mehrwegverpackung anbieten, die nicht teurer ist (Ausnahmen für kleine Betriebe).', 'Der Kunde muss immer eigene Becher mitbringen.', 'Es gibt keine Vorschriften.'], c: [1]},
        a: ['Seit 2023 gilt die **Mehrwegangebotspflicht** (§ 33 VerpackG) für Gastronomie und Lebensmittellieferanten, die Speisen und Getränke in Einwegverpackungen zum Mitnehmen anbieten. Ausnahme: kleine Betriebe (bis 5 Beschäftigte und höchstens 80 m²). Das Mehrwegangebot darf **nicht teurer** sein als die Einwegvariante (ohne Pfand). Ziel: **Abfall vermeiden**.'], see: ['wiso-nachhaltigkeit']},
      {pts: 3, topic: 'Datenschutzbeauftragter', q: 'Wann muss ein Unternehmen in Deutschland einen **Datenschutzbeauftragten** benennen?',
        mc: {o: ['Immer, auch bei 2 Beschäftigten.', 'Wenn in der Regel mindestens 20 Personen ständig mit der automatisierten Verarbeitung personenbezogener Daten beschäftigt sind.', 'Nur bei Banken.', 'Nur wenn der Betriebsrat es verlangt.'], c: [1]},
        a: ['§ 38 BDSG: Pflicht ab **20 Personen**, die **ständig** mit automatisierter Verarbeitung personenbezogener Daten beschäftigt sind. Unabhängig von der Zahl besteht die Pflicht, wenn der Kern der Tätigkeit eine umfangreiche Überwachung oder sensible Daten ist (Art. 37 DSGVO). Der Datenschutzbeauftragte berät und überwacht, er ist weisungsfrei.'], see: ['wiso-ki']},
      {pts: 3, topic: 'Newsletter', q: 'Kinowelt will Kunden aus dem Online-Ticketsystem einen **Werbe-Newsletter** schicken. Welche Regel gilt?',
        mc: {o: ['Man darf alle Kunden anschreiben, sie können widersprechen.', 'Der Kunde muss ausdrücklich einwilligen. Üblich ist das Double-Opt-in (Bestätigung per Link).', 'Nur der Betriebsrat darf zustimmen.', 'Werbung per E-Mail ist grundsätzlich verboten.'], c: [1]},
        a: ['Werbung per E-Mail braucht in der Regel eine **ausdrückliche Einwilligung** (§ 7 UWG, Art. 6 DSGVO). Die Einwilligung muss freiwillig, informiert und nachweisbar sein. Das **Double-Opt-in-Verfahren** (Bestätigungs-Link) gilt als Nachweis. Kunden können jederzeit widerrufen. Nur bei **Bestandskunden** gibt es eine enge Ausnahme für ähnliche Produkte mit Hinweis auf das Widerspruchsrecht.'], see: ['wiso-ki']},
    ],
  });
  AP2.exam.end(ID);
})();
