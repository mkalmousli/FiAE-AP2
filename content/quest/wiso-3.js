AP2.quest('wiso', [
  {id: 'gk-grundrechte', t: 'Grundrechte', qs: [
    {lv: 1, q: 'Welcher Artikel des Grundgesetzes schützt die **Menschenwürde**?', o: ['Art. 1', 'Art. 5', 'Art. 12', 'Art. 20'], a: 0, e: 'Art. 1 GG: Die Würde des Menschen ist **unantastbar**.'},
    {lv: 1, q: 'Die Meinungsfreiheit steht in Art. 5 GG.', k: 'tf', a: true, e: 'Art. 5 schützt Meinung, Presse, Kunst und Wissenschaft.'},
    {lv: 2, k: 'match', q: 'Ordne das Grundrecht dem Artikel zu.', o: [['Berufsfreiheit', 'Art. 12'], ['Versammlungsfreiheit', 'Art. 8'], ['Gleichheit vor dem Gesetz', 'Art. 3'], ['Petitionsrecht', 'Art. 17']], e: 'Die Artikel 1 bis 19 sind die Grundrechte.'},
    {lv: 2, q: 'Wer kann **Verfassungsbeschwerde** einlegen?', o: ['Jeder, der sich in seinen Grundrechten verletzt sieht', 'Nur Parteien', 'Nur Beamte', 'Nur der Bundestag'], a: 0, e: 'Sie geht an das Bundesverfassungsgericht in Karlsruhe.'},
    {lv: 3, k: 'gap', q: 'Die ___klausel in Art. 79 (3) GG schützt Art. 1 und Art. 20 vor Änderung.', a: ['Ewigkeits'], e: 'Die **Ewigkeitsklausel**.'},
  ]},
  {id: 'gk-institutionen', t: 'Staatsorgane', qs: [
    {lv: 1, q: 'Wer wählt den Bundeskanzler?', o: ['Der Bundestag', 'Das Volk direkt', 'Der Bundesrat', 'Der Bundespräsident allein'], a: 0, e: 'Der Bundestag wählt auf Vorschlag des Bundespräsidenten.'},
    {lv: 1, q: 'Der Bundesrat besteht aus Mitgliedern der Landesregierungen.', k: 'tf', a: true, e: 'Er wird nicht direkt gewählt.'},
    {lv: 2, k: 'num', q: 'Der Bundestag hat 630 Mitglieder. Wie viele Stimmen braucht die Kanzlermehrheit mindestens?', a: 316, tol: 0, u: 'Stimmen', e: 'Mehr als die Hälfte: 316.'},
    {lv: 2, k: 'order', q: 'Bringe den Weg eines Gesetzes in die richtige Reihenfolge.', o: ['Gesetzentwurf', 'Beratung im Bundestag', 'Beschluss im Bundestag', 'Bundesrat', 'Unterschrift des Bundespräsidenten', 'Verkündung'], e: 'Danach tritt das Gesetz in Kraft.'},
    {lv: 3, q: 'Wann braucht ein Gesetz die **Zustimmung** des Bundesrates?', o: ['Wenn Interessen der Länder stark betroffen sind', 'Immer', 'Nie', 'Nur bei Steuern auf Tabak'], a: 0, e: 'Sonst reicht ein Einspruchsgesetz.'},
  ]},
  {id: 'gk-wahlen', t: 'Wahlen', qs: [
    {lv: 1, k: 'multi', q: 'Welche sind **Wahlgrundsätze**?', o: ['allgemein', 'geheim', 'gleich', 'verpflichtend'], a: [0, 1, 2], e: 'Dazu kommen unmittelbar und frei. In Deutschland gibt es keine Wahlpflicht.'},
    {lv: 1, q: 'Die Zweitstimme bestimmt die Sitzverteilung der Parteien im Bundestag.', k: 'tf', a: true, e: 'Die Erststimme wählt die Person im Wahlkreis.'},
    {lv: 2, k: 'num', q: '60.000 von 80.000 Wahlberechtigten haben gewählt. Wie hoch ist die Wahlbeteiligung?', a: 75, tol: 0.5, u: '%', e: '60.000 / 80.000 = 0,75.'},
    {lv: 2, k: 'gap', q: 'Eine Partei braucht mindestens ___ % der Zweitstimmen für den Einzug.', a: ['5'], e: 'Die Sperrklausel.'},
  ]},
  {id: 'gk-sozialstaat', t: 'Sozialstaat', qs: [
    {lv: 1, q: 'Wie viele Zweige hat die gesetzliche Sozialversicherung?', o: ['5', '3', '4', '7'], a: 0, e: 'Kranken, Renten, Arbeitslosen, Pflege, Unfall.'},
    {lv: 1, q: 'Die Unfallversicherung zahlt allein der Arbeitgeber.', k: 'tf', a: true, e: 'Der Beitrag geht an die Berufsgenossenschaft.'},
    {lv: 2, k: 'match', q: 'Ordne die Versicherung dem Fall zu.', o: [['Krankenversicherung', 'Arztbesuch'], ['Rentenversicherung', 'Altersrente'], ['Arbeitslosenversicherung', 'Kündigung'], ['Unfallversicherung', 'Arbeitsunfall']], e: 'Jeder Zweig hat einen eigenen Zweck.'},
    {lv: 3, k: 'num', q: 'Brutto 3.000 Euro. Der Arbeitnehmeranteil der Sozialversicherung beträgt 21,75 %. Wie viel Euro sind das?', a: 652.5, tol: 0.5, u: 'Euro', e: '3.000 mal 0,2175 = 652,50 Euro.'},
  ]},
  {id: 'gk-arbeitsrecht', t: 'Arbeitsrecht', qs: [
    {lv: 1, q: 'Wie lang ist die gesetzliche Kündigungsfrist in der Probezeit?', o: ['2 Wochen', '4 Wochen', '3 Monate', 'Keine'], a: 0, e: '§ 622 Abs. 3 BGB.'},
    {lv: 1, q: 'Der gesetzliche Mindesturlaub beträgt 24 Werktage bei einer 6-Tage-Woche.', k: 'tf', a: true, e: 'Das sind 4 Wochen. Bei 5 Tagen sind es 20 Arbeitstage.'},
    {lv: 2, k: 'num', q: 'Wie viele Tage Mindesturlaub hat man bei einer 5-Tage-Woche?', a: 20, tol: 0, u: 'Tage', e: '24 / 6 mal 5 = 20.'},
    {lv: 2, q: 'Wann muss der Betriebsrat vor einer Kündigung angehört werden?', o: ['Immer, sonst ist die Kündigung unwirksam', 'Nie', 'Nur bei Azubis', 'Nur bei fristloser Kündigung'], a: 0, e: '§ 102 BetrVG.'},
    {lv: 3, k: 'multi', q: 'Welche Gründe können eine **fristlose Kündigung** rechtfertigen?', o: ['Diebstahl', 'Schwere Beleidigung', 'Krankheit', 'Schlechtes Wetter'], a: [0, 1], e: 'Es braucht einen wichtigen Grund (§ 626 BGB).'},
  ]},
  {id: 'gk-wirtschaft', t: 'Wirtschaft', qs: [
    {lv: 1, q: 'Was ist Inflation?', o: ['Ein allgemeiner Anstieg der Preise', 'Ein Fallen der Preise', 'Mehr Arbeitslose', 'Weniger Steuern'], a: 0, e: 'Das Geld verliert Kaufkraft.'},
    {lv: 1, q: 'Die EZB hat die Aufgabe, stabile Preise zu sichern.', k: 'tf', a: true, e: 'Ziel: etwa 2 % Inflation.'},
    {lv: 2, k: 'multi', q: 'Welche gehören zum **magischen Viereck**?', o: ['Preisstabilität', 'Hohe Beschäftigung', 'Wirtschaftswachstum', 'Hohe Steuern'], a: [0, 1, 2], e: 'Das vierte Ziel: außenwirtschaftliches Gleichgewicht.'},
    {lv: 2, k: 'order', q: 'Ordne die Konjunkturphasen.', o: ['Aufschwung', 'Boom', 'Abschwung', 'Rezession'], e: 'Danach beginnt der Kreislauf wieder.'},
  ]},
  {id: 'gk-datenschutz', t: 'Datenschutz', qs: [
    {lv: 1, q: 'Was regelt die DSGVO?', o: ['Den Umgang mit personenbezogenen Daten', 'Das Urheberrecht', 'Die Löhne', 'Das Wahlrecht'], a: 0, e: 'Sie gilt in der ganzen EU.'},
    {lv: 1, q: 'Eine Datenpanne muss innerhalb von 72 Stunden der Aufsichtsbehörde gemeldet werden.', k: 'tf', a: true, e: 'Art. 33 DSGVO.'},
    {lv: 2, k: 'multi', q: 'Welche sind **Betroffenenrechte**?', o: ['Auskunft', 'Löschung', 'Berichtigung', 'Bonuszahlung'], a: [0, 1, 2], e: 'Dazu kommen Widerspruch und Datenübertragbarkeit.'},
    {lv: 3, k: 'gap', q: 'Daten dürfen nur für den festgelegten ___ verwendet werden (Zweckbindung).', a: ['Zweck'], e: 'Und nur so lange wie nötig.'},
  ]},
  {id: 'gk-eu', t: 'Europäische Union', qs: [
    {lv: 1, k: 'multi', q: 'Welche gehören zu den **Grundfreiheiten** des Binnenmarkts?', o: ['Waren', 'Personen', 'Dienstleistungen', 'Strom für alle kostenlos'], a: [0, 1, 2], e: 'Dazu kommt der freie Kapitalverkehr.'},
    {lv: 1, q: 'Die DSGVO ist EU-Recht.', k: 'tf', a: true, e: 'Sie gilt direkt in allen Mitgliedstaaten.'},
    {lv: 2, q: 'Welches Organ vertritt die Bürger der EU direkt?', o: ['Europäisches Parlament', 'Europäische Kommission', 'Rat der EU', 'EuGH'], a: 0, e: 'Es wird alle 5 Jahre gewählt.'},
    {lv: 2, k: 'match', q: 'Ordne das EU-Organ seiner Aufgabe zu.', o: [['Kommission', 'Gesetzesvorschläge'], ['Parlament', 'Beschließt Gesetze mit'], ['EuGH', 'Rechtsprechung'], ['EZB', 'Geldpolitik']], e: 'Alle haben ihren Sitz in verschiedenen Städten.'},
  ]},
  {id: 'gk-umwelt', t: 'Umwelt und Klima', qs: [
    {lv: 1, q: 'Was ist das Ziel des Pariser Klimaabkommens?', o: ['Erwärmung deutlich unter 2 Grad begrenzen', 'Alle Autos verbieten', 'Atomkraft ausbauen', 'Neue Steuern einführen'], a: 0, e: 'Möglichst 1,5 Grad.'},
    {lv: 2, k: 'num', q: 'Ein Server braucht 400 W im Dauerbetrieb. Wie viel kWh sind das pro Tag?', a: 9.6, tol: 0.1, u: 'kWh', e: '0,4 kW mal 24 h = 9,6 kWh.'},
    {lv: 2, q: 'Welche Maßnahme gehört zu Green IT?', o: ['Geräte länger nutzen und recyceln', 'Alle Geräte nachts laufen lassen', 'Mehr Server kaufen', 'Papier statt Dateien'], a: 0, e: 'Das spart Energie und Rohstoffe.'},
  ]},
  {id: 'gk-geschichte', t: 'Geschichte', qs: [
    {lv: 1, k: 'order', q: 'Ordne nach Jahr (früh zuerst).', o: ['Gründung der Bundesrepublik 1949', 'Bau der Berliner Mauer 1961', 'Mauerfall 1989', 'Wiedervereinigung 1990'], e: 'Die Folge im Überblick.'},
    {lv: 1, q: 'Das Grundgesetz wurde 1949 beschlossen.', k: 'tf', a: true, e: 'Am 23. Mai 1949.'},
    {lv: 2, q: 'Welche Lehre zog das Grundgesetz aus der Weimarer Republik?', o: ['Konstruktives Misstrauensvotum und Sperrklausel', 'Mehr Macht für den Präsidenten', 'Keine Parteien', 'Volksentscheide über alles'], a: 0, e: 'Das stärkt die Stabilität der Regierung.'},
  ]},
  {id: 'gk-internationales', t: 'UNO und NATO', qs: [
    {lv: 1, q: 'Wo hat die UNO ihren Hauptsitz?', o: ['New York', 'Genf', 'Brüssel', 'Paris'], a: 0, e: 'Genf ist ein weiterer UN-Standort.'},
    {lv: 1, q: 'Die NATO ist ein Verteidigungsbündnis.', k: 'tf', a: true, e: 'Art. 5: Angriff auf einen ist Angriff auf alle.'},
    {lv: 2, q: 'Wann wurde die NATO gegründet?', o: ['1949', '1919', '1989', '2001'], a: 0, e: 'Deutschland trat 1955 bei.'},
  ]},
  {id: 'gk-rechtsstaat', t: 'Recht und Gerichte', qs: [
    {lv: 1, q: 'Ab welchem Alter ist man voll geschäftsfähig?', o: ['18', '16', '14', '21'], a: 0, e: 'Ab 7 beschränkt geschäftsfähig.'},
    {lv: 2, k: 'match', q: 'Ordne den Fall dem Gericht zu.', o: [['Kündigung', 'Arbeitsgericht'], ['Diebstahl', 'Strafgericht'], ['Miete', 'Amtsgericht'], ['Rentenstreit', 'Sozialgericht']], e: 'Es gibt fünf Gerichtsbarkeiten.'},
    {lv: 2, q: 'Wie nennt man Streit zwischen Bürger und Behörde?', o: ['Verwaltungsrecht (öffentliches Recht)', 'Privatrecht', 'Strafrecht', 'Arbeitsrecht'], a: 0, e: 'Dafür sind die Verwaltungsgerichte zuständig.'},
  ]},
]);
