// Probeprüfung 8, Wirtschafts- und Sozialkunde: gebundene Aufgaben (Situation LernWerk Bildungsakademie GmbH), Rechtsstand 2026.
(function () {
  const ID = 'exam8-wiso';
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 8 (Bildung)', t: 'WiSo: Wirtschafts- und Sozialkunde (gebundene Aufgaben)', blocks: []});
  AP2.exam.start(ID, {minutes: 60, cover: AP2.exam.COVER.wiso,
    hint: 'Wie in der echten Prüfung: 60 Minuten, 100 Punkte, nur gebundene Aufgaben. Lies zuerst die Situation. Rechne mit dem Taschenrechner und runde nur, wenn die Aufgabe es sagt. Nach dem Auswerten steht bei jeder Aufgabe, warum falsche Antworten falsch sind.',
    intro: [['p', 'Sie sind Auszubildende bzw. Auszubildender zum Fachinformatiker für Anwendungsentwicklung bei der **LernWerk Bildungsakademie GmbH** in Leipzig. Die Firma bietet Weiterbildungskurse an, vor Ort und online. Es arbeiten dort **120 Beschäftigte**, dazu viele **Honorardozenten**. Es gibt einen **Betriebsrat**. Die IT-Abteilung betreut die Lernplattform und einen Chatbot, der Teilnehmenden Fragen beantwortet. Alle Aufgaben beziehen sich auf diesen Betrieb. Rechtsstand: 2026.']],
    words: [['Honorardozent', 'Lehrkraft, die pro Stunde bezahlt wird und nicht fest angestellt ist.'], ['Weisung', 'Eine Anordnung des Chefs: Was, wann und wie man arbeitet.'], ['Entschädigung', 'Geld als Ausgleich für einen Schaden oder eine Benachteiligung.'], ['Schutzfrist', 'Zeit vor und nach der Geburt, in der Mutterschutz gilt.'], ['gemeinnützig', 'Das Geld dient der Allgemeinheit, nicht dem Gewinn der Eigentümer.'], ['Elastizität', 'Wie stark ändert sich die Nachfrage, wenn der Preis sich ändert?'], ['Auftragsverarbeitung', 'Eine andere Firma verarbeitet Daten im Auftrag (z. B. Cloud-Anbieter).'], ['Nutzwertanalyse', 'Eine Tabelle mit Punkten, um mehrere Angebote zu vergleichen.'], ['Ersthelfer', 'Mensch, der für Erste Hilfe ausgebildet ist.']]});
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 1: Ausbildung und Arbeitsrecht (21 Punkte)',
    tasks: [
      {pts: 3, topic: 'Berufsschule', q: 'Ein volljähriger Auszubildender hat am **Mittwoch einen Berufsschultag** mit 7 Unterrichtsstunden. Wie behandelt der Betrieb diesen Tag?',
        mc: {o: ['Er muss danach im Betrieb weiterarbeiten, bis die tägliche Arbeitszeit voll ist.', 'Der Betrieb muss ihn freistellen. Der Berufsschultag (Unterricht und Pausen) wird auf die Arbeitszeit angerechnet. Danach muss er nicht mehr arbeiten.', 'Der Betrieb darf ihn unbezahlt freistellen.', 'Der Betrieb darf den Berufsschultag auf den Urlaub anrechnen.'], c: [1]},
        a: ['§ 15 BBiG: Der Ausbildende **stellt frei** für den Berufsschulunterricht. Nach § 15 BBiG (und § 9 JArbSchG für Jugendliche) wird die Berufsschulzeit **einschließlich der Pausen auf die Arbeitszeit angerechnet** (bei volljährigen Auszubildenden an Berufsschultagen mit mehr als 5 Unterrichtsstunden à 45 Minuten, einmal in der Woche). Vergütung gibt es weiter (§ 19 BBiG). Anrechnung auf den Urlaub ist verboten.'], see: ['wiso-bbig']},
      {pts: 3, topic: 'Mutterschutz', q: 'Eine Mitarbeiterin erwartet ihr Kind am **10. Juli 2026**. Ab wann beginnt die **Schutzfrist vor der Geburt** (6 Wochen)?',
        op: '**Ab wann** heißt: Du rechnest ein Datum aus. Zähle 42 Tage rückwärts.',
        mc: {o: ['29. Mai 2026', '12. Juni 2026', '10. Juli 2026', '21. August 2026'], c: [0]},
        a: ['6 Wochen = 42 Tage. 10. Juli - 42 Tage = **29. Mai 2026**. Nach der Geburt gilt die Schutzfrist **8 Wochen** (bei Früh- und Mehrlingsgeburten und bei Behinderung des Kindes **12 Wochen**). In dieser Zeit gibt es **Mutterschaftsgeld** (Krankenkasse) plus Zuschuss des Arbeitgebers. Danach folgt die Kündigungssperre bis 4 Monate nach der Geburt (§ 17 MuSchG).'], see: ['wiso-arbeitsvertrag']},
      {pts: 3, topic: 'AGG', q: 'In einer Stellenanzeige von LernWerk steht: „Wir suchen eine junge, dynamische Mitarbeiterin unter 30 Jahren.“ Ein 52-jähriger Bewerber wird deshalb nicht eingeladen. Was ist richtig?',
        mc: {o: ['Die Anzeige ist erlaubt, weil jeder Betrieb sein Wunschalter bestimmen darf.', 'Die Anzeige verstößt gegen das Allgemeine Gleichbehandlungsgesetz (AGG). Der Bewerber kann eine Entschädigung verlangen und muss sie innerhalb von 2 Monaten schriftlich geltend machen.', 'Der Betriebsrat muss die Stelle neu ausschreiben.', 'Das AGG gilt nur für bestehende Arbeitsverhältnisse, nicht für Bewerbungen.'], c: [1]},
        a: ['Das **AGG** verbietet Benachteiligung wegen Rasse, ethnischer Herkunft, Geschlecht, Religion, Behinderung, **Alter** und sexueller Identität – auch bei **Bewerbung und Einstellung** (§ 6 AGG). Der Bewerber kann **Entschädigung** verlangen (bis zu 3 Monatsgehälter, wenn er auch bei neutraler Auswahl nicht eingestellt worden wäre). Frist: **2 Monate** schriftlich (§ 15 Abs. 4 AGG), danach Klage binnen 3 Monaten.'], see: ['wiso-arbeitsvertrag']},
      {pts: 3, topic: 'Kündigung Betriebsrat', q: 'LernWerk kündigt einem Mitarbeiter ordentlich. Den **Betriebsrat** hat die Geschäftsführung **nicht informiert**. Welche Folge hat das?',
        mc: {o: ['Keine, der Betriebsrat entscheidet bei Kündigungen nicht mit.', 'Die Kündigung ist unwirksam, weil der Betriebsrat vorher gehört werden muss (§ 102 BetrVG).', 'Die Kündigung ist wirksam, aber der Betrieb muss ein Bußgeld zahlen.', 'Die Kündigung ist nur unwirksam, wenn der Mitarbeiter schwerbehindert ist.'], c: [1]},
        a: ['§ 102 BetrVG: Der Betriebsrat ist **vor jeder Kündigung anzuhören**. Eine ohne Anhörung ausgesprochene Kündigung ist **unwirksam**. Der Betriebsrat kann innerhalb von **1 Woche** (ordentliche Kündigung) Bedenken oder Widerspruch äußern. Widerspruch kann dem Mitarbeiter ein Recht auf Weiterbeschäftigung geben.'], see: ['wiso-betriebsrat', 'wiso-kuendigung']},
      {pts: 3, topic: 'Scheinselbstständigkeit', q: 'Ein „Honorardozent“ arbeitet ausschließlich für LernWerk, nach dem Stundenplan der Akademie, mit Dienstlaptop und Anwesenheitsliste. Er bekommt feste Kurse und darf keinen Vertreter schicken. Wie ist er wahrscheinlich einzuordnen?',
        mc: {o: ['Als Selbstständiger, weil im Vertrag „Honorar“ steht.', 'Als Arbeitnehmer (Scheinselbstständigkeit), weil er weisungsgebunden und eingegliedert ist.', 'Als Gesellschafter der Akademie.', 'Als Auszubildender.'], c: [1]},
        a: ['Entscheidend ist die **tatsächliche Durchführung**, nicht die Bezeichnung (§ 611a BGB). Merkmale eines Arbeitnehmers: **weisungsgebunden**, **eingegliedert** in die Organisation, feste Zeiten, Arbeitsmittel des Auftraggebers, keine Vertretung, nur ein Auftraggeber. Folgen: Nachzahlung von **Sozialversicherungsbeiträgen** (bis 4 Jahre, bei Vorsatz 30 Jahre). Klärung: **Statusfeststellungsverfahren** bei der Deutschen Rentenversicherung.'], see: ['wiso-arbeitsvertrag', 'wiso-sv']},
      {pts: 3, topic: 'Schwerbehinderung', q: 'Betriebe mit mindestens **20 Arbeitsplätzen** müssen **5 %** davon mit schwerbehinderten Menschen besetzen. LernWerk hat **120 Arbeitsplätze**. Wie viele Pflichtarbeitsplätze sind das?',
        num: {c: 6, tol: 0, unit: 'Arbeitsplätze'},
        a: ['120 x 5 % = **6 Arbeitsplätze** (§ 154 SGB IX). Wer die Quote nicht erfüllt, zahlt eine **Ausgleichsabgabe** (gestaffelt nach Erfüllungsquote). Die Schwerbehindertenvertretung wird ab 5 schwerbehinderten Beschäftigten gewählt.'], see: ['wiso-arbeitsvertrag']},
      {pts: 3, topic: 'Urlaub beim Ausscheiden', q: 'Eine Dozentin hat **30 Arbeitstage** Jahresurlaub. Sie ist seit Jahren im Betrieb und scheidet zum **30. Juni** aus. Sie hat in diesem Jahr noch keinen Urlaub genommen. Wie viele Tage Urlaub stehen ihr für das laufende Jahr zu (§ 5 BUrlG: 1/12 je vollem Monat)?',
        num: {c: 15, tol: 0, unit: 'Tage'},
        a: ['Sie scheidet nach erfüllter Wartezeit in der **ersten Jahreshälfte** aus: Anspruch auf **1/12 je vollen Monat**. 30 / 12 x 6 = **15 Tage**. Nicht genommener Urlaub wird bei Ausscheiden **ausgezahlt (Urlaubsabgeltung)**, wenn er nicht mehr genommen werden kann (§ 7 Abs. 4 BUrlG).'], see: ['wiso-urlaub']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 2: Mitbestimmung und Tarifvertrag (6 Punkte)',
    tasks: [
      {pts: 3, topic: 'Tarifvorrang', q: 'LernWerk ist an einen Tarifvertrag gebunden. Der Betriebsrat und die Geschäftsführung wollen in einer **Betriebsvereinbarung** das Gehalt für alle um 5 % über den Tarif anheben. Was gilt?',
        mc: {o: ['Die Betriebsvereinbarung ist wirksam, weil sie für die Mitarbeiter günstiger ist.', 'Löhne, die üblicherweise in Tarifverträgen geregelt werden, dürfen nicht durch Betriebsvereinbarung geregelt werden (Tarifvorrang, § 77 Abs. 3 BetrVG), außer der Tarifvertrag erlaubt es.', 'Betriebsvereinbarungen dürfen nie etwas zur Bezahlung regeln.', 'Nur die Gewerkschaft kann eine Betriebsvereinbarung schließen.'], c: [1]},
        a: ['§ 77 Abs. 3 BetrVG: **Arbeitsentgelt** und sonstige Arbeitsbedingungen, die durch Tarifvertrag **geregelt sind oder üblicherweise geregelt werden**, können nicht Gegenstand einer Betriebsvereinbarung sein (**Tarifvorrang**), außer der Tarifvertrag lässt sie ausdrücklich zu (Öffnungsklausel). Die Gewerkschaft ist nicht Partei einer Betriebsvereinbarung; diese schließen Arbeitgeber und Betriebsrat.'], see: ['wiso-tarif', 'wiso-betriebsrat']},
      {pts: 3, topic: 'Arbeitskampf', q: 'Die Tarifverhandlungen sind gescheitert. Die Gewerkschaft möchte streiken. Welche Aussage ist richtig?',
        mc: {o: ['Ein Streik ist jederzeit erlaubt, auch während der Laufzeit des Tarifvertrags.', 'Ein Streik ist erst nach Ablauf der Friedenspflicht und nach gescheiterten Verhandlungen zulässig. Die Gewerkschaft ruft dazu auf (meist nach Urabstimmung).', 'Der Betriebsrat darf zum Streik aufrufen.', 'Streikende müssen entlassen werden.'], c: [1]},
        a: ['Ein **rechtmäßiger Streik** wird von der **Gewerkschaft** organisiert und ist nur zulässig, wenn der Tarifvertrag abgelaufen ist (**Friedenspflicht**) und die Verhandlungen gescheitert sind (**Ultima Ratio**). Üblich ist eine **Urabstimmung** (Satzungen verlangen oft 75 %). Der **Betriebsrat darf nicht zum Streik aufrufen** (§ 74 Abs. 2 BetrVG). Streikende dürfen nicht gekündigt werden; der Lohn entfällt, die Gewerkschaft zahlt Streikgeld.'], see: ['wiso-tarif', 'wiso-gewerkschaft']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 3: Sozialversicherung und Lohnabrechnung (14 Punkte)',
    intro: [['p', 'Beitragssätze 2026 (Anteil Arbeitnehmer): Krankenversicherung 8,75 %, Pflegeversicherung 1,8 % (mit **2 Kindern 1,55 %**: Abschlag 0,25 Punkte ab dem 2. Kind), Rentenversicherung 9,3 %, Arbeitslosenversicherung 1,3 %. Alle genannten Bruttolöhne liegen unter den Beitragsbemessungsgrenzen.']],
    tasks: [
      {pts: 4, topic: 'SV-Beiträge', q: 'Eine Kursplanerin hat **2.900 Euro brutto**. Sie hat **zwei Kinder**. Berechnen Sie die **Summe der Sozialversicherungsbeiträge** (Anteil Arbeitnehmer).',
        op: '**Berechnen** heißt: rechnen und das Ergebnis nennen. Beachte den Pflegesatz mit zwei Kindern.',
        hint: 'Gesamtsatz = 8,75 + 1,55 + 9,3 + 1,3. Dann mal 2.900.',
        num: {c: 606.1, tol: 0.02, unit: 'Euro'},
        a: ['Gesamtsatz: 8,75 + 1,55 + 9,3 + 1,3 = **20,90 %**. 2.900 x 20,90 % = **606,10 Euro**.', 'Einzeln: KV 253,75; PV 44,95; RV 269,70; AV 37,70. Mit 1,8 % für die PV (kein Kinderabschlag) wären es 7,25 Euro mehr, also falsch.'], see: ['wiso-sv', 'wiso-gehalt']},
      {pts: 3, topic: 'Auszahlungsbetrag', q: 'Die Abrechnung der Kursplanerin enthält diese Werte. Wie hoch ist der **Auszahlungsbetrag**?',
        ctx: [['table', ['Position', 'Betrag in Euro'], [['Bruttolohn', '2.900,00'], ['Lohnsteuer', '- 301,50'], ['Kirchensteuer', '- 27,13'], ['Sozialversicherung (Summe)', '- 606,10'], ['= Nettolohn', '1.965,27'], ['Vermögenswirksame Leistung (Eigenanteil, Überweisung an Bausparvertrag)', '- 20,00'], ['= Auszahlungsbetrag', '?']]]],
        num: {c: 1945.27, tol: 0.02, unit: 'Euro'},
        a: ['Netto: 2.900,00 - 301,50 - 27,13 - 606,10 = 1.965,27 Euro. Die **vermögenswirksame Leistung** wird vom Netto abgezogen und direkt an den Sparvertrag überwiesen: 1.965,27 - 20,00 = **1.945,27 Euro** Auszahlung. Der Arbeitgeberzuschuss zur VL ist Teil des Bruttos.'], see: ['wiso-gehalt']},
      {pts: 3, topic: 'Midijob', q: 'Ein Mitarbeiter verdient **1.500 Euro** im Monat. Er arbeitet im **Übergangsbereich (Midijob)** von 603,01 bis 2.000 Euro. Welche Aussage trifft zu?',
        mc: {o: ['Er zahlt keine Sozialversicherung.', 'Sein Beitrag zur Sozialversicherung ist geringer als bei voller Beitragspflicht; seine Rentenansprüche werden aber aus dem vollen Entgelt berechnet.', 'Er zahlt den vollen Arbeitgeber- und Arbeitnehmeranteil allein.', 'Der Arbeitgeber zahlt gar nichts.'], c: [1]},
        a: ['Im **Übergangsbereich** (603,01 bis 2.000 Euro) steigt der Arbeitnehmeranteil langsam von fast 0 auf den vollen Satz. Der **Arbeitgeber zahlt den vollen Anteil**. Die Rente wird trotzdem aus dem **tatsächlichen Entgelt** berechnet (keine Nachteile). Beim **Minijob** (bis 603 Euro) zahlt der Arbeitgeber Pauschalbeiträge, der Beschäftigte kann in die Rentenversicherung einzahlen (Befreiung möglich).'], see: ['wiso-gehalt', 'wiso-sv']},
      {pts: 4, topic: 'Zweige der SV', q: 'Ordnen Sie jede Leistung dem zuständigen Zweig der gesetzlichen Sozialversicherung zu.',
        match: {keys: ['Krankenversicherung', 'Rentenversicherung', 'Arbeitslosenversicherung', 'Pflegeversicherung', 'Unfallversicherung'], items: [
          ['Mutterschaftsgeld während der Schutzfrist', 0],
          ['Altersrente nach 45 Beitragsjahren', 1],
          ['Kurzarbeitergeld bei Auftragsmangel', 2],
          ['Pflegesachleistungen für Pflegegrad 3', 3],
          ['Verletztenrente nach einem Arbeitsunfall', 4]]},
        a: ['KV: Krankengeld, Mutterschaftsgeld, Behandlung. RV: Altersrente, Erwerbsminderungsrente, Reha. AV: Arbeitslosengeld, Kurzarbeitergeld, Qualifizierung. PV: Leistungen nach **Pflegegrad** (1 bis 5). UV: Heilbehandlung, Verletztengeld, Unfallrente – bezahlt allein vom Arbeitgeber.'], see: ['wiso-sv']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 4: Rechtsformen und Finanzierung (12 Punkte)',
    tasks: [
      {pts: 3, topic: 'Gemeinnützigkeit', q: 'Ein Weiterbildungsträger wird als **gGmbH** geführt. Was bedeutet das „g“?',
        mc: {o: ['Die Firma haftet unbeschränkt.', 'Die Gesellschaft verfolgt gemeinnützige Zwecke. Gewinne dürfen nicht an Gesellschafter fließen, sondern müssen für den Zweck verwendet werden.', 'Die Gesellschafter sind gesetzlich Genossen.', 'Die Firma ist ein Verein.'], c: [1]},
        a: ['Eine **gGmbH** ist eine GmbH, die nach der Abgabenordnung als **gemeinnützig** anerkannt ist (z. B. Bildung). Vorteile: Steuerbefreiung bei Körperschaft- und Gewerbesteuer, Spendenquittungen. Pflicht: **Mittelverwendung** für den satzungsmäßigen Zweck (zeitnah), keine Gewinnausschüttung. Haftung wie bei der GmbH beschränkt.'], see: ['wiso-unternehmen']},
      {pts: 3, topic: 'Eingetragener Verein', q: 'Eine Elterninitiative will einen **eingetragenen Verein (e.V.)** gründen. Was ist nötig?',
        mc: {o: ['Mindestens 7 Mitglieder und eine Satzung. Die Eintragung erfolgt im Vereinsregister.', 'Mindestens 25.000 Euro Stammkapital.', 'Mindestens 2 Mitglieder und ein Eintrag im Handelsregister.', 'Ein Notarvertrag mit Gewinnverteilung.'], c: [0]},
        a: ['Ein **e.V.** braucht **mindestens 7 Mitglieder** (Gründung), eine **Satzung** und die Eintragung ins **Vereinsregister** (Amtsgericht). Er hat eine eigene Rechtspersönlichkeit; die Haftung ist auf das Vereinsvermögen beschränkt. Stammkapital und Handelsregister gehören zur GmbH.'], see: ['wiso-unternehmen']},
      {pts: 3, topic: 'Zinsen', q: 'LernWerk nimmt für 90 Tage einen Überbrückungskredit über **50.000 Euro** zu **4 % Jahreszinsen** auf. Wie viel Euro Zinsen fallen an (kaufmännisch: 1 Jahr = 360 Tage)?',
        hint: 'Zinsen = Kapital x Zinssatz x Tage / 360.',
        num: {c: 500, tol: 0, unit: 'Euro'},
        a: ['Z = 50.000 x 4 % x 90 / 360 = 2.000 x 0,25 = **500 Euro**. Ein volles Jahr würden 2.000 Euro kosten. Ein Vierteljahr entspricht 90 Tagen.'], see: ['wiso-kennzahlen']},
      {pts: 3, topic: 'Eigenkapitalquote', q: 'LernWerk hat eine **Bilanzsumme von 1.200.000 Euro** und **Eigenkapital von 480.000 Euro**. Wie hoch ist die **Eigenkapitalquote**?',
        num: {c: 40, tol: 0.1, unit: '%'},
        a: ['Eigenkapitalquote = Eigenkapital / Gesamtkapital x 100 = 480.000 / 1.200.000 x 100 = **40 %**. Sie zeigt die **finanzielle Unabhängigkeit** und Kreditwürdigkeit. Das Fremdkapital beträgt 720.000 Euro (60 %).'], see: ['wiso-kennzahlen']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 5: Kaufvertrag und Verbraucherschutz (12 Punkte)',
    tasks: [
      {pts: 3, topic: 'Vertragsschluss', q: 'Ein Kunde bucht auf der Website von LernWerk einen Kurs. Er bekommt sofort eine E-Mail: „Wir haben Ihre Buchung erhalten.“ Am nächsten Tag kommt die E-Mail: „Ihre Buchung ist bestätigt.“ Wann kommt der Vertrag zustande?',
        mc: {o: ['Mit dem Klick auf „Kostenpflichtig buchen“, weil das die Annahme ist.', 'Mit der zweiten E-Mail. Die erste ist nur eine Eingangsbestätigung. Die Buchung ist der Antrag, die Bestätigung die Annahme.', 'Erst mit der ersten Rechnung.', 'Erst mit der Unterschrift des Kunden.'], c: [1]},
        a: ['Ein Vertrag entsteht durch zwei übereinstimmende Willenserklärungen: **Antrag** und **Annahme**. Die Buchung des Kunden ist der Antrag. Die **Eingangsbestätigung** ist nur eine Information, noch keine Annahme. Mit der **Bestätigung** des Kurses nimmt LernWerk an. Der Vertrag kommt auch ohne Schriftform zustande (Grundsatz der Formfreiheit).'], see: ['wiso-vertrag']},
      {pts: 3, topic: 'Kündigungsbutton', q: 'Ein Verbraucher hat auf der Lernplattform ein Monatsabo abgeschlossen. Was verlangt das Gesetz seit 2022 vom Anbieter?',
        mc: {o: ['Eine Kündigung ist nur per Brief möglich.', 'Der Anbieter muss auf der Website einen gut sichtbaren Kündigungsbutton anbieten. Die Kündigung muss online in zwei Klicks möglich sein.', 'Der Anbieter darf die Kündigung ablehnen.', 'Die Kündigung ist nur zum Jahresende erlaubt.'], c: [1]},
        a: ['§ 312k BGB: Wer online Verträge mit Verbrauchern über **Dauerschuldverhältnisse** abschließt, muss einen **Kündigungsbutton** („Verträge hier kündigen“) bieten. Der Verbraucher gibt Vertrag, Name und Zeitpunkt an, es folgt eine **Bestätigungsseite** und eine Bestätigung in Textform. Außerdem gilt seit 2022: Nach einer automatischen Verlängerung ist der Vertrag **mit einem Monat Frist kündbar**.'], see: ['wiso-vertrag']},
      {pts: 3, topic: 'Verjährung', q: 'LernWerk stellt am **15. März 2026** eine Rechnung über 900 Euro. Der Kunde zahlt nicht. Wann **verjährt** die Forderung (regelmäßige Verjährungsfrist, Kenntnis liegt vor)?',
        op: '**Wann** heißt: Du nennst ein Datum. Die Frist beginnt erst am Ende des Jahres.',
        mc: {o: ['15. März 2029', '31. Dezember 2026', '31. Dezember 2029', '31. Dezember 2028'], c: [2]},
        a: ['Regelmäßige Verjährung: **3 Jahre** (§ 195 BGB). Sie beginnt **am Ende des Jahres**, in dem der Anspruch entstanden ist (§ 199 BGB), also am 31.12.2026. Die Frist läuft 3 Jahre: **31. Dezember 2029**. Neubeginn oder Hemmung gibt es zum Beispiel durch Mahnbescheid oder Klage.'], see: ['wiso-vertrag']},
      {pts: 3, topic: 'Mängelrechte', q: 'Eine Teilnehmerin kauft für ihr Studium ein Tablet bei LernWerk (Verbraucherin). Es hat einen **Sachmangel**. Welche Rechte hat sie **zuerst**?',
        mc: {o: ['Sofortiger Rücktritt vom Vertrag.', 'Nacherfüllung: Der Verkäufer muss nachbessern oder ein neues Gerät liefern. Erst wenn das fehlschlägt, folgen Rücktritt, Minderung oder Schadensersatz.', 'Nur Schadensersatz.', 'Nur ein Anspruch gegen den Hersteller.'], c: [1]},
        a: ['§ 437 BGB: **Vorrangig ist die Nacherfüllung** (Nachbesserung oder Neulieferung, § 439 BGB). Nach **Fristsetzung** oder bei Fehlschlag kann der Käufer **zurücktreten**, den **Preis mindern** oder **Schadensersatz** verlangen. Der Verkäufer haftet 2 Jahre (bei neuen Sachen). Der Hersteller haftet nur bei einer Garantie.'], see: ['wiso-vertrag']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 6: Wirtschaft, Markt und Preise (7 Punkte)',
    tasks: [
      {pts: 4, topic: 'Preiselastizität', q: 'LernWerk erhöht den Preis eines Kurses von **200 Euro auf 220 Euro**. Die Buchungen sinken von **500 auf 425**. Wie hoch ist der **Betrag der Preiselastizität der Nachfrage** (prozentuale Mengenänderung geteilt durch prozentuale Preisänderung)?',
        op: '**Elastizität** heißt: Wie stark reagiert die Nachfrage? Du teilst zwei Prozentzahlen.',
        hint: 'Preis: +10 %. Menge: -15 %. Dann teile 15 durch 10.',
        num: {c: 1.5, tol: 0.01, unit: ''},
        a: ['Preisänderung: (220 - 200) / 200 = **+10 %**. Mengenänderung: (425 - 500) / 500 = **-15 %**. Elastizität = 15 / 10 = **1,5**. Ein Wert **größer 1** heißt **elastische Nachfrage**: Die Nachfrage sinkt stärker als der Preis steigt, der Umsatz sinkt (vorher 200 x 500 = 100.000 Euro, nachher 220 x 425 = 93.500 Euro). Bei einem Wert unter 1 wäre die Nachfrage unelastisch.'], see: ['wiso-markt']},
      {pts: 3, topic: 'Durchschnittssteuersatz', q: 'Eine Dozentin hat ein zu versteuerndes Einkommen von **50.000 Euro**. Sie zahlt **10.000 Euro** Einkommensteuer (vereinfacht). Wie hoch ist ihr **Durchschnittssteuersatz**?',
        num: {c: 20, tol: 0.1, unit: '%'},
        a: ['Durchschnittssteuersatz = Steuer / Einkommen x 100 = 10.000 / 50.000 x 100 = **20 %**. Der **Grenzsteuersatz** (Steuer auf den letzten zusätzlichen Euro) ist höher, weil die Einkommensteuer **progressiv** ist. Es gilt ein Grundfreibetrag (2026: 12.348 Euro), der steuerfrei bleibt.'], see: ['wiso-steuern']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 7: Kosten und Entscheidungen (10 Punkte)',
    tasks: [
      {pts: 3, topic: 'Kosten je Teilnehmer', q: 'Ein Kurs hat **fixe Kosten von 4.400 Euro** (Honorar 3.600 und Raum 800). Pro Teilnehmenden fallen **25 Euro** Material an. Es kommen **18 Teilnehmende**. Wie hoch sind die **Gesamtkosten je Teilnehmenden** (auf zwei Nachkommastellen)?',
        num: {c: 269.44, tol: 0.02, unit: 'Euro'},
        a: ['Fixkosten je Teilnehmenden: 4.400 / 18 = 244,44 Euro. Dazu variable Kosten 25 Euro: **269,44 Euro**. Je mehr Teilnehmende, desto niedriger die Stückkosten (**Fixkostendegression**).'], see: ['wiso-kennzahlen']},
      {pts: 4, topic: 'Mindestteilnehmerzahl', q: 'Der Kurs kostet netto **420 Euro** je Person. Daten wie oben (Fixkosten 4.400 Euro, variable Kosten 25 Euro). Wie viele Teilnehmende braucht der Kurs **mindestens**, damit er nicht mit Verlust läuft? (Ganze Personen.)',
        hint: 'Deckungsbeitrag je Person = 420 - 25. Teile die Fixkosten durch den Deckungsbeitrag. Dann aufrunden.',
        num: {c: 12, tol: 0, unit: 'Personen'},
        a: ['Deckungsbeitrag je Person: 420 - 25 = **395 Euro**. 4.400 / 395 = 11,14. Man kann nur ganze Personen aufnehmen und muss **aufrunden**: **12 Personen**. Kontrolle: 12 x 395 = 4.740 Euro > 4.400 Euro (Gewinn 340 Euro); 11 x 395 = 4.345 Euro < 4.400 Euro (Verlust 55 Euro).'], see: ['wiso-kennzahlen']},
      {pts: 3, topic: 'Nutzwertanalyse', q: 'LernWerk wählt eine neue Lernplattform. Die Kriterien sind unterschiedlich wichtig. Berechnen Sie den **Gesamtnutzwert von Anbieter A**.',
        ctx: [['table', ['Kriterium', 'Gewicht', 'Anbieter A (Punkte 1-5)', 'Anbieter B', 'Anbieter C'], [['Kosten', '40 %', '3', '5', '4'], ['Bedienung', '35 %', '5', '3', '4'], ['Support', '25 %', '4', '2', '4']]]],
        op: '**Nutzwertanalyse**: Punkte mal Gewicht, dann alles addieren.',
        num: {c: 3.95, tol: 0.01, unit: 'Punkte'},
        a: ['A: 3 x 0,40 + 5 x 0,35 + 4 x 0,25 = 1,20 + 1,75 + 1,00 = **3,95**. B: 2,00 + 1,05 + 0,50 = 3,55. C: 1,60 + 1,40 + 1,00 = **4,00**. Anbieter C hat den höchsten Nutzwert. Schwäche der Methode: Gewichte und Punkte sind **subjektiv**.'], see: ['wiso-methoden']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 8: Marketing (3 Punkte)',
    tasks: [
      {pts: 3, topic: 'Produktlebenszyklus', q: 'Ein älterer Kurs („Office-Grundlagen“) wird immer seltener gebucht. Umsatz und Gewinn sinken seit zwei Jahren. In welcher Phase des **Produktlebenszyklus** ist der Kurs?',
        mc: {o: ['Einführungsphase', 'Wachstumsphase', 'Reifephase', 'Rückgangsphase (Degeneration)'], c: [3]},
        a: ['Phasen: **Einführung** (hohe Kosten, wenig Umsatz) -> **Wachstum** (Umsatz steigt stark) -> **Reife** (Umsatz am höchsten, wächst kaum) -> **Rückgang** (Umsatz sinkt). In der Rückgangsphase kann man das Produkt **einstellen** oder durch ein **Relaunch** (Überarbeitung) neu beleben.'], see: ['wiso-kennzahlen']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 9: Arbeitsschutz (6 Punkte)',
    tasks: [
      {pts: 3, topic: 'Ersthelfer', q: 'In einem Verwaltungsbetrieb müssen mindestens **5 %** der anwesenden Beschäftigten ausgebildete **Ersthelfer** sein. In der Zentrale von LernWerk sind regelmäßig **120 Personen** anwesend. Wie viele Ersthelfer sind mindestens nötig?',
        num: {c: 6, tol: 0, unit: 'Ersthelfer'},
        a: ['120 x 5 % = **6 Ersthelfer** (DGUV Vorschrift 1). In anderen Betrieben sind 10 % nötig. Ersthelfer brauchen alle 2 Jahre eine Fortbildung. Das Erste-Hilfe-Material muss bereitliegen und gekennzeichnet sein (grünes Schild).'], see: ['wiso-arbeitsschutz']},
      {pts: 3, topic: 'Bildschirmarbeit', q: 'Mitarbeitende von LernWerk arbeiten täglich viele Stunden am Bildschirm. Was muss der Arbeitgeber nach der Arbeitsschutzgesetzgebung tun?',
        mc: {o: ['Nichts, Büroarbeit ist ungefährlich.', 'Eine Gefährdungsbeurteilung machen (auch zu Augen, Haltung und psychischer Belastung) und eine Vorsorge für die Augen anbieten.', 'Nur Brillen für alle bezahlen.', 'Nur eine Pause pro Tag anordnen.'], c: [1]},
        a: ['Nach **ArbSchG § 5** muss der Arbeitgeber die Gefährdungen beurteilen, auch **psychische Belastung**. Nach der **ArbMedVV** muss er Beschäftigten an Bildschirmarbeitsplätzen eine **Angebotsvorsorge** (Augenuntersuchung) anbieten. Dazu gehören **ergonomische Möbel**, Beleuchtung und Pausen. Kosten einer Bildschirmbrille trägt der Arbeitgeber, wenn sie nötig ist.'], see: ['wiso-arbeitsschutz']},
    ],
  });
  AP2.exam.part(ID, {
    t: 'Aufgabengruppe 10: Nachhaltigkeit, Datenschutz und KI (9 Punkte)',
    tasks: [
      {pts: 3, topic: 'Auftragsverarbeitung', q: 'LernWerk speichert die Daten der Teilnehmenden bei einem **Cloud-Anbieter**. Was verlangt die DSGVO?',
        mc: {o: ['Nichts, die Cloud ist Sache des Anbieters.', 'Einen schriftlichen Auftragsverarbeitungsvertrag (AV-Vertrag) nach Art. 28 DSGVO. LernWerk bleibt verantwortlich.', 'Die Zustimmung des Betriebsrats für jeden Kunden.', 'Einen Eintrag im Handelsregister.'], c: [1]},
        a: ['Art. 28 DSGVO: Verarbeitet ein Dienstleister Daten **im Auftrag**, braucht man einen **Vertrag** (Gegenstand, Dauer, Art der Daten, Pflichten, Sicherheit). Der **Verantwortliche** (LernWerk) bleibt für die Daten verantwortlich. Bei Servern in **Drittländern** (z. B. USA) braucht man eine zusätzliche Grundlage (z. B. Angemessenheitsbeschluss, Standardvertragsklauseln).'], see: ['wiso-ki']},
      {pts: 3, topic: 'KI-Chatbot', q: 'LernWerk setzt einen **KI-Chatbot** ein, der Teilnehmenden Fragen beantwortet. Welche Pflicht ergibt sich aus der EU-KI-Verordnung?',
        mc: {o: ['Der Chatbot ist verboten.', 'Nutzer müssen darüber informiert werden, dass sie mit einem KI-System sprechen (Transparenzpflicht). Außerdem sollen Betreiber für KI-Kompetenz der Beschäftigten sorgen.', 'Der Chatbot darf nur von der Bundesnetzagentur betrieben werden.', 'Es gelten keine Pflichten, weil KI neu ist.'], c: [1]},
        a: ['Die **KI-Verordnung** (EU) 2024/1689 arbeitet mit **Risikoklassen**. Chatbots sind meist **begrenztes Risiko** mit **Transparenzpflicht** (Art. 50): Nutzer müssen erfahren, dass sie mit einer KI interagieren. Seit dem 2. Februar 2025 gelten die **Verbote** (z. B. Social Scoring) und die Pflicht zur **KI-Kompetenz** (Art. 4). Verboten ist der Chatbot nicht.'], see: ['wiso-ki']},
      {pts: 3, topic: 'Nachhaltigkeit', q: 'Ordnen Sie jede Maßnahme von LernWerk der passenden Dimension der **Nachhaltigkeit** zu.',
        match: {keys: ['Ökologisch', 'Ökonomisch', 'Sozial'], items: [
          ['Kurse online anbieten, damit weniger Fahrten nötig sind', 0],
          ['Langfristig kostendeckende Preise und Rücklagen bilden', 1],
          ['Kostenlose Kurse für Geflüchtete anbieten', 2]]},
        a: ['**Ökologisch**: Umwelt und Ressourcen schonen (weniger Fahrten, weniger CO2). **Ökonomisch**: dauerhaft wirtschaftlich arbeiten. **Sozial**: Chancengleichheit, faire Bedingungen, Teilhabe. Die drei Dimensionen sollen im Gleichgewicht stehen (Nachhaltigkeitsdreieck).'], see: ['wiso-nachhaltigkeit']},
    ],
  });
  AP2.exam.end(ID);
})();
