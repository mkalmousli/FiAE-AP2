// Probeprüfung 6, Deutsch (Prüfungstyp I, Thema Homeoffice) + Gemeinschaftskunde (Gewaltenteilung, Bundestag und Bundesrat).
(function () {
  const ID = 'exam6-dgk';
  // Texte mit Zeilennummern: Zeilen werden automatisch umbrochen, Z('Textstelle') liefert die Zeilenangabe.
  const wrap = (paras, w) => { const out = []; paras.forEach((p) => { let cur = ''; p.split(' ').forEach((wd) => { if (cur && (cur + ' ' + wd).length > w) { out.push(cur); cur = wd; } else cur = cur ? cur + ' ' + wd : wd; }); if (cur) out.push(cur); }); return out; };
  const numbered = (lines) => ['table', ['Z.', 'Text'], lines.map((l, i) => [(i + 1) % 5 === 0 ? String(i + 1) : '', l])];
  const zref = (lines) => (s) => { const j = lines.join(' '); const i = j.indexOf(s); if (i < 0) throw new Error('Textstelle fehlt: ' + s); const at = (pos) => { let acc = 0; for (let k = 0; k < lines.length; k++) { if (pos < acc + lines[k].length + 1) return k + 1; acc += lines[k].length + 1; } return lines.length; }; const a = at(i), b = at(i + s.length - 1); return 'Z. ' + a + (b > a ? ' f.' : ''); };
  const M1 = wrap([
    'Vor sechs Jahren arbeiteten nur wenige Menschen in Deutschland von zu Hause. Dann kam die Pandemie, und viele Firmen schickten ihre Beschäftigten ins Homeoffice. Heute ist klar: Das war kein kurzer Test. Mobiles Arbeiten gehört für viele Betriebe zum Alltag.',
    'Eine Umfrage eines Branchenverbands zeigt: Etwa jeder vierte Beschäftigte arbeitet zumindest einen Teil der Woche zu Hause. Am häufigsten sind Berufe in der Informationstechnik, in der Verwaltung und im Marketing. Beschäftigte in der Pflege, im Handwerk oder in der Produktion können ihre Arbeit nicht verlegen.',
    'Die Vorteile liegen für viele auf der Hand. Der Weg zur Arbeit fällt weg. Das spart Zeit und Geld. Wer Kinder hat, kann den Tag flexibler planen. Viele sagen auch, dass sie zu Hause ruhiger arbeiten können, weil kein Kollege an die Tür klopft. Auch Firmen profitieren: Sie brauchen weniger Büroflächen und finden leichter Fachkräfte, die nicht in der Nähe wohnen.',
    'Doch es gibt auch Schattenseiten. Die Grenze zwischen Arbeit und Freizeit verschwimmt. Wer den Laptop auf dem Küchentisch stehen lässt, schaut abends noch schnell in die E-Mails. Manche Beschäftigte fühlen sich einsam, weil der Austausch mit den Kollegen fehlt. Außerdem leiden die Teams, wenn nie alle im Büro sind. Neue Mitarbeiter lernen die Firmenkultur schwerer kennen.',
    'Der Gesetzgeber hat bisher keinen Anspruch auf Homeoffice geschaffen. Ob und wie oft man zu Hause arbeiten darf, regeln Arbeitsvertrag, Betriebsvereinbarung oder Tarifvertrag. Der Arbeitgeber bleibt auch zu Hause verantwortlich für den Arbeitsschutz, etwa bei Arbeitszeit und Pausen. Wer mobil arbeitet, muss außerdem die Regeln für den Datenschutz einhalten.',
    'Viele Firmen suchen deshalb einen Mittelweg. Sie erlauben zwei oder drei Tage im Homeoffice und bitten die Teams an festen Tagen ins Büro. „Wir wollen Freiheit und Zusammenhalt“, sagt eine Personalleiterin aus Hannover. Ob das Modell dauerhaft funktioniert, wird die Zukunft zeigen. Sicher ist nur: Der Küchentisch wird das Büro nicht ersetzen, aber er ist längst ein fester Teil der Arbeitswelt.'], 60);
  const Z = zref(M1);
  const FEHLER = wrap([
    'Wer zu hause arbeitet, braucht einen festen Platz. Ein Tisch ist besser als das Sofa, weil man dort gerader sitzt. Der Bildschirm sollte auf Augenhöhe stehen, sonst schmertzt bald der Nacken. Es ist wichtig, das man regelmäßig Pausen macht. deshalb sollte man einen Wecker nutzen. Wer abends noch E-Mails liest kann schlecht abschalten. Man liest also Abends keine Mails mehr.',
    'Viele Menschen arbeiten zu Hause effektiver wie im Büro. Doch nicht jeder kann sich gut konzentrieren, den es gibt oft Lärm. Wegen dem Lärm der Nachbarn helfen Kopfhörer. Seid der Pandemie haben viele Firmen neue Regeln. Die Kollegen sind erreichbar, auch wenn sie nicht im Büro sitzt. Wer den Raum verlässt, schliesst den Bildschirm.'], 60);
  const ZA = (s) => zref(FEHLER)(s);
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 6 (Landtechnik)', t: 'Deutsch + GK: Homeoffice; Gewaltenteilung und Gesetzgebung', blocks: []});
  AP2.exam.start(ID, {minutes: 180, cover: AP2.exam.COVER.dgk,
    hint: 'So wie in der echten Berufsschulprüfung: Deutsch (Prüfungstyp I, 50 Punkte) und Gemeinschaftskunde (30 Punkte). Keine Hilfsmittel. Antworten in ganzen Sätzen. Gebundene Aufgaben (Ankreuzen) werden automatisch bewertet.',
    intro: [['p', '**Deutsch, Prüfungstyp I** (Materialbasis: nicht-fiktionale Texte). Thema: „Homeoffice und mobiles Arbeiten“. Teil 1 hat 25 Punkte, Teil 2 (Schreibaufgabe) hat 25 Punkte. **Gemeinschaftskunde**: 30 Punkte. Thema: Gewaltenteilung und Gesetzgebung. Insgesamt 80 Punkte.']],
    words: [['Homeoffice', 'Man arbeitet von zu Hause statt im Büro.'], ['mobiles Arbeiten', 'Man arbeitet an einem beliebigen Ort, z. B. im Zug oder im Café.'], ['Beschäftigte', 'Menschen, die in einer Firma arbeiten.'], ['Betriebsvereinbarung', 'Vertrag zwischen Chef und Betriebsrat für eine Firma.'], ['Tarifvertrag', 'Vertrag zwischen Gewerkschaft und Arbeitgebern über Lohn und Arbeitszeit.'], ['Gewaltenteilung', 'Die Macht im Staat ist auf drei Bereiche verteilt: Gesetze machen, ausführen, Recht sprechen.'], ['Legislative', 'Die gesetzgebende Gewalt (Parlament).'], ['Exekutive', 'Die ausführende Gewalt (Regierung und Verwaltung).'], ['Judikative', 'Die rechtsprechende Gewalt (Gerichte).'], ['Bundesrat', 'Vertretung der 16 Bundesländer im Bund.'], ['Vermittlungsausschuss', 'Gruppe aus Bundestag und Bundesrat, die bei Streit nach einem Kompromiss sucht.'], ['Karikatur', 'Ein Bild, das etwas übertreibt, um Kritik zu zeigen.'], ['Textbeleg', 'Eine Stelle im Text, die eine Aussage beweist.']]});

  AP2.exam.part(ID, {
    t: 'Deutsch Teil 1: Textverständnis und Sprachgebrauch (25 Punkte)',
    intro: [['p', 'Lesen Sie zuerst die Materialien. Die Zahlen in der linken Spalte sind **Zeilennummern**: Bei „Z. 12“ ist Zeile 12 gemeint. Bei den gebundenen Aufgaben gibt es Punkte anteilig; eine falsche Markierung gilt als nicht gelöst.']],
    ctx: [['p', '**Material 1: „Büro oder Küchentisch?“ Wie wir künftig arbeiten** (Zeitungsartikel, für die Prüfung geschrieben)'], numbered(M1),
      ['p', '**Material 2: Schaubild.** „Was Beschäftigte über Homeoffice sagen“ (Anteil der Befragten, die der Aussage zustimmen, in Prozent; Beispieldaten für die Prüfungsübung, 1.000 Befragte)'],
      ['chart', {kind: 'bar', w: 640, h: 300, labels: ['Kein Arbeitsweg', 'Flexible Zeit', 'Ruhigeres Arbeiten', 'Mehr Zeit für Familie', 'Arbeit und Freizeit schwer zu trennen', 'Kontakt zu Kollegen fehlt'], series: [{n: 'Zustimmung in %', d: [84, 71, 58, 47, 41, 39], k: 'accent'}], ymax: 100, yl: 'Prozent', cap: 'Die ersten vier Aussagen nennen Vorteile, die letzten zwei Nachteile.'}],
      ['p', '**Material 3: Informationstext** „Gut arbeiten im Homeoffice: Tipps“ (zu Aufgabe 7, siehe dort).']],
    tasks: [
      {pts: 4, topic: 'Aussagen ableiten', q: '**Aufgabe 1.** Entscheiden Sie, welche Aussagen sich aus **Material 1** ableiten lassen. Ordnen Sie jede Aussage zu.',
        op: '**Ableiten** heißt: Die Aussage steht im Text oder folgt klar aus dem Text. Was nicht im Text steht, ist „nicht ableitbar“. Das gilt auch, wenn es in der Wirklichkeit stimmen könnte.',
        hint: 'Suche zu jeder Aussage die Stelle im Text. Findest du keine Stelle, ist sie nicht ableitbar.',
        words: [['Pandemie', 'Eine Krankheit, die sich in vielen Ländern ausbreitet.'], ['Anspruch', 'Ein Recht, das man verlangen kann.']],
        match: {keys: ['ableitbar (r)', 'nicht ableitbar'], items: [
          ['Vor etwa sechs Jahren arbeiteten nur wenige Menschen zu Hause.', 0],
          ['Die Pandemie hat dazu geführt, dass viele Firmen Homeoffice eingeführt haben.', 0],
          ['Etwa jeder vierte Beschäftigte arbeitet zumindest zeitweise zu Hause.', 0],
          ['Auch Pflegekräfte und Handwerker arbeiten häufig im Homeoffice.', 1],
          ['Firmen sparen durch Homeoffice Büroflächen.', 0],
          ['Ein Gesetz gibt allen Beschäftigten einen Anspruch auf Homeoffice.', 1],
          ['Auch im Homeoffice bleibt der Arbeitgeber für den Arbeitsschutz verantwortlich.', 0],
          ['Eine Personalleiterin aus Hannover will das Homeoffice wieder abschaffen.', 1]]},
        a: ['Richtig (ableitbar): 1 (' + Z('Vor sechs Jahren arbeiteten nur wenige') + '), 2 (' + Z('Dann kam die Pandemie') + '), 3 (' + Z('Etwa jeder vierte Beschäftigte') + '), 5 (' + Z('weniger Büroflächen') + '), 7 (' + Z('verantwortlich für den Arbeitsschutz') + ').', 'Nicht ableitbar: 4, denn der Text sagt, Pflege und Handwerk **können** ihre Arbeit **nicht** verlegen (' + Z('Beschäftigte in der Pflege') + '). 6, denn es gibt **keinen** Anspruch (' + Z('keinen Anspruch auf Homeoffice') + '). 8, denn die Personalleiterin sucht einen **Mittelweg** (' + Z('Mittelweg') + ').'], see: ['de-textverstaendnis']},
      {pts: 2, topic: 'Richtig oder falsch', q: '**Aufgabe 2a.** Die Aussagen sind entweder richtig (r) oder falsch (f). Ordnen Sie zu. Die Belege schreiben Sie in Aufgabe 2b.',
        op: '**Richtig oder falsch** heißt: Prüfe, ob die Aussage zum Text passt. Falsch ist auch, wenn der Text das Gegenteil sagt.',
        match: {keys: ['richtig (r)', 'falsch (f)'], items: [
          ['Beschäftigte sparen im Homeoffice den Weg zur Arbeit.', 0],
          ['Im Homeoffice fühlen sich alle Beschäftigten gut in das Team eingebunden.', 1],
          ['Nach Meinung des Textes wird der Küchentisch das Büro ersetzen.', 1],
          ['Wie oft man zu Hause arbeitet, regeln zum Beispiel Arbeitsvertrag oder Betriebsvereinbarung.', 0]]},
        a: ['1 r, 2 f, 3 f, 4 r. Belege folgen in Aufgabe 2b.'], see: ['de-textverstaendnis']},
      {pts: 2, topic: 'Textbelege', q: '**Aufgabe 2b.** Schreiben Sie zu **jeder** der vier Aussagen aus Aufgabe 2a eine passende Textstelle (Textbeleg) mit Zeilenangabe. Sie dürfen die Textstelle kürzen.',
        op: '**Textbeleg** heißt: Du schreibst die Stelle aus dem Text auf, die zeigt, dass die Aussage stimmt (oder nicht stimmt). Dazu gehört die Zeilenangabe.',
        hint: 'Schreibe in Anführungszeichen. Kürze mit [...]. Schreibe (Z. ...) dahinter.', rows: 6,
        a: ['1 r: „Der Weg zur Arbeit fällt weg.“ (' + Z('Der Weg zur Arbeit fällt weg.') + ').', '2 f: „Manche Beschäftigte fühlen sich einsam, [...]“ (' + Z('Manche Beschäftigte fühlen sich einsam') + ').', '3 f: „Der Küchentisch wird das Büro nicht ersetzen [...]“ (' + Z('Der Küchentisch wird das Büro nicht ersetzen') + ').', '4 r: „Ob und wie oft man zu Hause arbeiten darf, regeln Arbeitsvertrag, Betriebsvereinbarung oder Tarifvertrag.“ (' + Z('Ob und wie oft man zu Hause') + ').', 'Bewertung: Je Aussage in 2a und 2b zusammen 0,5 Punkte; je Beleg mit passender Zeile 0,5 Punkte.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle A', q: '**Aufgabe 3 (Textstelle A).** „Heute ist klar: Das war kein kurzer Test.“ (' + Z('Das war kein kurzer Test') + ') Was ist damit gemeint?',
        op: '**Gemeint** heißt: Was will der Text damit sagen? Es ist nicht die wörtliche Bedeutung.',
        mc: {o: ['Die Firmen haben das Homeoffice nur einen Tag ausprobiert.', 'Das Homeoffice war keine kurze Probe, es blieb dauerhaft.', 'Die Pandemie war nicht schlimm.'], c: [1]},
        a: ['Der Satz folgt auf die Pandemie. Das Homeoffice war nicht nur ein Versuch, sondern bleibt. Antwort 1 stimmt nicht: Es geht nicht um einen Tag. Antwort 3 sagt etwas über die Pandemie, das der Text nicht sagt.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle B', q: '**Aufgabe 3 (Textstelle B).** „[...] weil kein Kollege an die Tür klopft.“ (' + Z('weil kein Kollege an die Tür klopft') + ') Was ist damit gemeint?',
        mc: {o: ['Zu Hause wird man seltener gestört und kann ruhiger arbeiten.', 'Zu Hause haben die Kollegen keine Zeit.', 'Zu Hause gibt es keine Türen.'], c: [0]},
        a: ['Das Bild „an die Tür klopfen“ steht für Störungen im Büro. Ohne Kollegen im Raum arbeitet man ruhiger. Antwort 2 und 3 nehmen das Bild wörtlich.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle C', q: '**Aufgabe 3 (Textstelle C).** „Die Grenze zwischen Arbeit und Freizeit verschwimmt.“ (' + Z('Die Grenze zwischen Arbeit und Freizeit verschwimmt') + ') Was ist damit gemeint?',
        mc: {o: ['Die Freizeit ist im Homeoffice länger als im Büro.', 'Man kann Arbeit und Freizeit nicht mehr klar trennen.', 'Es gibt in Deutschland eine neue Grenze für Arbeitszeit.'], c: [1]},
        a: ['„Verschwimmen“ heißt: Es ist nicht mehr klar sichtbar. Der folgende Satz erklärt es: Man schaut abends noch in die E-Mails (' + Z('schaut abends noch schnell in die E-Mails') + ').'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle D', q: '**Aufgabe 3 (Textstelle D).** „Der Küchentisch wird das Büro nicht ersetzen, aber er ist längst ein fester Teil der Arbeitswelt.“ (' + Z('Der Küchentisch wird das Büro') + ') Was ist damit gemeint?',
        mc: {o: ['Das Homeoffice ergänzt das Büro und gehört fest zur Arbeit.', 'Man soll nur noch am Küchentisch arbeiten.', 'Das Büro verliert seine Bedeutung.'], c: [0]},
        a: ['„Küchentisch“ steht für das Homeoffice. Das Wort „aber“ zeigt die Aussage: kein Ersatz, aber ein fester Teil. Antwort 3 widerspricht der Textstelle.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle E', q: '**Aufgabe 3 (Textstelle E).** „Wir wollen Freiheit und Zusammenhalt“ (' + Z('Wir wollen Freiheit und Zusammenhalt') + ') Was meint die Personalleiterin?',
        mc: {o: ['Alle sollen immer zu Hause arbeiten.', 'Die Beschäftigten sollen selbst entscheiden können und trotzdem als Team zusammenarbeiten.', 'Die Firma will weniger Geld ausgeben.'], c: [1]},
        a: ['„Freiheit“ = Homeoffice-Tage, „Zusammenhalt“ = feste Tage im Büro. Davor steht der Mittelweg (' + Z('Mittelweg') + ').'], see: ['de-textverstaendnis']},
      {pts: 3, topic: 'Schaubild auswerten', q: '**Aufgabe 4.** Entscheiden Sie, welche Aussagen sich aus dem **Schaubild (Material 2)** ableiten lassen.',
        op: '**Aus dem Schaubild ableiten** heißt: Du liest Zahlen und Balken. Was nicht im Schaubild steht, ist nicht ableitbar.',
        hint: 'Vergleiche die Höhe der Balken. Achte auf „mehr als“, „weniger als“, „am häufigsten“.',
        match: {keys: ['ableitbar (r)', 'nicht ableitbar'], items: [
          ['Das Schaubild zeigt, wie viele Befragte verschiedenen Aussagen zu Homeoffice zustimmen.', 0],
          ['Mehr als die Hälfte der Befragten nennt „Kein Arbeitsweg“ als Vorteil.', 0],
          ['Der fehlende Kontakt zu Kollegen ist der Nachteil, den die meisten Befragten nennen.', 1],
          ['Mehr Befragte schätzen die flexible Zeit als das ruhigere Arbeiten.', 0],
          ['Die meisten Befragten arbeiten im Homeoffice mehr Stunden als im Büro.', 1],
          ['Weniger als die Hälfte der Befragten sagt, dass sie im Homeoffice mehr Zeit für die Familie hat.', 0]]},
        a: ['Ableitbar: 1; 2 (84 % > 50 %); 4 (71 % > 58 %); 6 (47 % < 50 %). Nicht ableitbar: 3, denn „Arbeit und Freizeit schwer zu trennen“ hat mit 41 % mehr Zustimmung als „Kontakt fehlt“ (39 %). 5, denn Arbeitsstunden werden im Schaubild nicht genannt.'], see: ['de-textverstaendnis']},
      {pts: 3, topic: 'Wertung erkennen', q: '**Aufgabe 5.** Manche Aussagen enthalten neben der Information auch eine **Wertung** (eine persönliche Bewertung). Entscheiden Sie bei jeder Aussage. Schreiben Sie in das Antwortfeld darunter, welches Wort die Wertung zeigt.',
        op: '**Wertung** heißt: Die Person sagt, ob etwas gut oder schlecht ist. Oft zeigen Wörter wie „leider“, „zum Glück“, „unmöglich“ die Wertung.',
        match: {keys: ['mit Wertung', 'ohne Wertung'], items: [
          ['„Ich spare im Homeoffice jeden Tag eine Stunde Fahrzeit.“', 1],
          ['„Es ist einfach unmöglich, zu Hause konzentriert zu arbeiten.“', 0],
          ['„Unser Team trifft sich dienstags und donnerstags im Büro.“', 1],
          ['„Zum Glück darf ich zwei Tage in der Woche von zu Hause arbeiten.“', 0],
          ['„Die Firma hat leider die Büroflächen verkleinert.“', 0],
          ['„Mein Arbeitsvertrag erlaubt mobiles Arbeiten an bis zu drei Tagen.“', 1]]},
        a: ['Mit Wertung: Aussage 2 („unmöglich“), Aussage 4 („Zum Glück“), Aussage 5 („leider“). Ohne Wertung (nur Information): 1, 3, 6. Je Zuordnung 0,5 Punkte.'], see: ['de-sprachgebrauch']},
      {pts: 2, topic: 'Umformulieren', q: '**Aufgabe 6.** Formulieren Sie die Sätze um, wie in der Klammer verlangt. Die Bedeutung muss gleich bleiben.\n(a) Die Firma erlaubt zwei Tage im Homeoffice. (**Passiv**)\n(b) Weil der Weg zur Arbeit wegfällt, sparen die Beschäftigten Zeit. (**mit „durch“ und einem Nomen**: „Durch ...“)',
        op: '**Umformulieren** heißt: Du sagst dasselbe mit anderen Wörtern oder anderer Satzform. **Passiv**: Die Handlung steht im Vordergrund („wird erlaubt“). **Nomen**: aus einem Verb wird ein Hauptwort („wegfallen“ -> „der Wegfall“).',
        hint: 'Passiv: werden + Partizip II. Bei (b) mache aus dem Nebensatz eine Wortgruppe mit „durch den ...“.', rows: 4,
        a: ['(a) **Zwei Tage im Homeoffice werden (von der Firma) erlaubt.** Aktiv wird Passiv: „erlaubt -> wird erlaubt“, das Objekt wird Subjekt.', '(b) **Durch den Wegfall des Arbeitswegs sparen die Beschäftigten Zeit.** Das Verb „wegfallen“ wird zum Nomen „der Wegfall“. Auch richtig: „Durch den entfallenden Arbeitsweg ...“.', 'Je Satz 1 Punkt; ein Satz mit richtiger Form, aber kleinem Rechtschreibfehler bekommt 0,5 Punkte.'], see: ['de-sprachgebrauch']},
      {pts: 4, topic: 'Fehler korrigieren', q: '**Aufgabe 7.** Der Text „Gut arbeiten im Homeoffice“ (Material 3) enthält **12 Fehler** (Rechtschreibung, Zeichensetzung, Grammatik). Schreiben Sie die Fehler mit der Verbesserung auf, z. B.: „Zeile 2: gerader -> geradeaus“ (nur als Beispiel). Je 3 richtig verbesserte Fehler ergeben 1 Punkt.',
        op: '**Korrigieren** heißt: Du findest den Fehler und schreibst die richtige Form auf.',
        hint: 'Lies Satz für Satz. Prüfe: Groß- und Kleinschreibung, „das/dass“, „den/denn“, Komma, Fall (Dativ/Genitiv), Verb-Endung.',
        ctx: [numbered(FEHLER)], rows: 8,
        words: [['effektiv', 'wirksam, mit gutem Ergebnis'], ['Genitiv', 'Der 2. Fall: „wegen des Lärms“.']],
        a: ['**12 Fehler:**', '1. „zu hause“ -> **zu Hause** (' + ZA('zu hause') + '): Hauptwort wird großgeschrieben.', '2. „schmertzt“ -> **schmerzt** (' + ZA('schmertzt') + '): ein Buchstabe zu viel.', '3. „das man“ -> **dass man** (' + ZA('das man') + '): Konjunktion „dass“ mit Doppel-s.', '4. „deshalb“ -> **Deshalb** (' + ZA('deshalb sollte') + '): Satzanfang nach Punkt.', '5. „liest kann“ -> **liest, kann** (' + ZA('liest kann') + '): Komma nach dem Nebensatz.', '6. „Abends“ -> **abends** (' + ZA('Abends') + '): Zeitangabe mit -s wird kleingeschrieben.', '7. „effektiver wie“ -> **effektiver als** (' + ZA('effektiver wie') + '): Vergleich mit „als“.', '8. „den es gibt“ -> **denn es gibt** (' + ZA('den es gibt') + '): Konjunktion „denn“.', '9. „Wegen dem Lärm“ -> **Wegen des Lärms** (' + ZA('Wegen dem Lärm') + '): „wegen“ + Genitiv.', '10. „Seid“ -> **Seit** (' + ZA('Seid der') + '): zeitliche Präposition.', '11. „sie ... sitzt“ -> **sie ... sitzen** (' + ZA('sitzt') + '): Verb muss zu „die Kollegen ... sie“ passen (Plural).', '12. „schliesst“ -> **schließt** (' + ZA('schliesst') + '): ß nach langem Vokal.', 'Je 3 richtig verbesserte Fehler: 1 Punkt. Verbesserungen ohne Fehlerfund (nur Nennung) zählen nicht.'], see: ['de-rechtschreibung', 'de-sprachgebrauch']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Deutsch Teil 2: Schreibaufgabe (25 Punkte)',
    intro: [['h', 'Situation'], ['p', 'Sie machen eine Ausbildung zum Fachinformatiker für Anwendungsentwicklung bei der **DataWerk GmbH**. Die Ausbildungsleiterin, Frau Berger, schreibt im Intranet: „Wir planen feste Regeln für das Homeoffice. Gilt das auch für Auszubildende? Bitte melden Sie sich bei mir mit Ihrer Meinung.“'],
      ['h', 'Aufgabe'], ['p', 'Schreiben Sie eine **E-Mail an Frau Berger**. Nehmen Sie Stellung zu der Frage, ob Auszubildende im Homeoffice arbeiten sollen. Nennen Sie **Vor- und Nachteile**. Nutzen Sie dazu Informationen aus **Material 1** und **Material 2**. Machen Sie am Ende einen **begründeten Vorschlag** (z. B. wie viele Tage).'],
      ['list', ['Verwenden Sie Betreff, Anrede, Absätze und Gruß.', 'Schreiben Sie etwa **150 bis 200 Wörter**.', 'Schreiben Sie sachlich und höflich.']]],
    tasks: [
      {pts: 25, topic: 'E-Mail Stellungnahme', q: 'Schreiben Sie die E-Mail an Frau Berger (Stellungnahme zum Homeoffice für Auszubildende).',
        op: '**Stellung nehmen** heißt: Du sagst deine Meinung und begründest sie. Du zeigst auch die andere Seite (Gegenargument) und endest mit einem Vorschlag.',
        hint: 'Aufbau: 1. Einleitung (Anlass). 2. Vorteile mit Beleg. 3. Nachteile mit Beleg. 4. Vorschlag mit Begründung. 5. Gruß. Plane 5 Minuten mit Stichworten.', rows: 16,
        words: [['Stellungnahme', 'Text, in dem man seine Meinung begründet.'], ['sachlich', 'ohne Gefühle, nur mit Fakten und Argumenten.'], ['Vorschlag', 'Ein Plan, was man tun könnte.'], ['Gegenargument', 'Ein Argument für die andere Seite.']],
        a: ['**Beispiel für eine gute Lösung:**'],
        sol: [['p', '**Betreff:** Meine Meinung zum Homeoffice für Auszubildende'], ['p', 'Sehr geehrte Frau Berger,'], ['p', 'vielen Dank für Ihre Frage. Ich nehme gern Stellung zu den neuen Regeln.'], ['p', 'Für das Homeoffice sprechen mehrere Gründe. Der Weg zur Arbeit fällt weg. In der Umfrage nennen 84 % diesen Vorteil. Auch ruhiges Arbeiten ist wichtig: Beim Programmieren stört mich im Großraumbüro manchmal der Lärm. Außerdem kann ich meine Zeit flexibler einteilen.'], ['p', 'Es gibt aber auch Nachteile. Für Auszubildende ist der Kontakt zu den Kollegen besonders wichtig. Ich lerne viel, wenn ich eine Frage direkt stellen kann. 39 % der Befragten sagen, dass ihnen der Kontakt fehlt. Auch die Grenze zwischen Arbeit und Freizeit kann verschwimmen.'], ['p', 'Deshalb schlage ich vor: Auszubildende arbeiten **einen Tag pro Woche** im Homeoffice, zum Beispiel am Freitag. An den anderen Tagen sind wir im Büro und haben Ansprechpartner. Nach drei Monaten könnte man die Regel prüfen. Dann sehen wir, ob Lernerfolg und Arbeitsqualität gut bleiben.'], ['p', 'Mit freundlichen Grüßen'], ['p', 'Alex Beispiel'],
      ['h', 'Bewertungsraster (25 Punkte)'], ['table', ['Bereich', 'Punkte', 'Was bewertet wird'], [['Inhalt und Aufbau', '15', 'Schreibziel erreicht (Stellungnahme + Vorschlag); Adressatin beachtet (Ausbildungsleiterin); Informationen aus Material 1 und 2 genutzt (mind. 3); Vorteile **und** Nachteile begründet; Vorschlag logisch; Einleitung, Hauptteil, Schluss; Absätze; Betreff, Anrede, Gruß.'], ['Sprache und äußere Form', '10', 'Rechtschreibung und Zeichensetzung (5); Satzbau, Wortwahl, höflicher und sachlicher Ton, Verbindungswörter wie „deshalb“, „aber“, „außerdem“ (5).']]]],
        see: ['de-schreibaufgabe', 'de-sprache', 'de-brief']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Gemeinschaftskunde: Gewaltenteilung und Gesetzgebung (30 Punkte)',
    intro: [['h', 'Handlungssituation'], ['p', 'Die Auszubildenden **Leon** und **Aylin** sehen in der Mittagspause eine Nachricht: Der Bundestag hat ein Gesetz über mobiles Arbeiten beschlossen. Der Bundesrat hat es aber zunächst gestoppt. Leon sagt: „Der Bundestag ist vom Volk gewählt. Der Bundesrat ist es nicht. Das ist doch undemokratisch!“ Aylin ist anderer Meinung.'],
      ['p', '**Hinweis:** Alle Aufgaben sind, wenn nichts anderes steht, in **ganzen Sätzen** zu beantworten.']],
    ctx: [
      ['h', 'Anlage 1: Auszug aus dem Grundgesetz (GG)'],
      ['table', ['Artikel', 'Text'], [
        ['Art. 20 Abs. 2', '„Alle Staatsgewalt geht vom Volke aus. Sie wird vom Volke in Wahlen und Abstimmungen und durch besondere Organe der Gesetzgebung, der vollziehenden Gewalt und der Rechtsprechung ausgeübt.“'],
        ['Art. 50', '„Durch den Bundesrat wirken die Länder bei der Gesetzgebung und Verwaltung des Bundes [...] mit.“'],
        ['Art. 77 Abs. 1', '„Die Bundesgesetze werden vom Bundestage beschlossen.“'],
        ['Art. 77 Abs. 2 und 3 (in eigenen Worten)', 'Der Bundesrat kann verlangen, dass der Vermittlungsausschuss einberufen wird. Bei einem **Einspruchsgesetz** kann der Bundestag den Einspruch des Bundesrats zurückweisen. Bei einem **Zustimmungsgesetz** muss der Bundesrat zustimmen, sonst ist das Gesetz gescheitert.']]],
      ['h', 'Anlage 2: Zeitungsartikel (für die Prüfung geschrieben; das Gesetz ist erfunden)'],
      ['p', '**Bundesrat sagt vorerst Nein zum Gesetz über mobiles Arbeiten**'],
      ['p', 'Berlin. Der Bundesrat hat das neue Gesetz über mobiles Arbeiten gestoppt. Es soll Beschäftigten helfen, die zu Hause arbeiten, und Regeln für Ausstattung und Arbeitszeit schaffen. Der Bundestag hatte das Gesetz vor drei Wochen beschlossen. Mehrere Länder fürchten hohe Kosten. Auch ihre eigenen Beamtinnen und Beamten würden unter das Gesetz fallen. „Wir blockieren nicht, wir prüfen“, sagte eine Ministerpräsidentin. Der Bundesrat rief den Vermittlungsausschuss an. Dort sollen Vertreter von Bundestag und Bundesrat einen Kompromiss finden. Gewerkschaften kritisieren die Verzögerung. Ein Arbeitgeberverband lobt dagegen, dass die Kosten genau geprüft werden. Wann das Gesetz in Kraft tritt, ist offen.'],
      ['h', 'Anlage 3: Karikatur (Bildbeschreibung)'],
      ['p', 'Das Bild zeigt links einen Mann mit einem Schild „Bundestag“. Er schiebt eine Schubkarre mit einem hohen Stapel Papier. Auf dem Stapel steht „Neues Gesetz“. Rechts steht eine Frau mit einem Schild „Bundesrat“. Sie hält ein rotes Stoppschild hoch und sagt: „Moment, das lese ich erst noch einmal!“ Zwischen beiden liegt eine Waage. Auf der einen Seite steht „Tempo“, auf der anderen „Gründlichkeit“. Die Waage ist fast im Gleichgewicht. Hinten im Bild wartet eine Gruppe Menschen mit einem Plakat „Wir warten!“.'],
      ['h', 'Anlage 4: Schaubild (Beispieldaten, vereinfacht)'],
      ['p', 'Gesetze, die der Bundestag in einem Beispieljahr beschlossen hat (insgesamt 120 Gesetze):'],
      ['chart', {kind: 'bar', w: 640, h: 300, labels: ['Zustimmungsgesetze', 'Einspruchsgesetze', 'Vermittlungsausschuss angerufen', 'Am Ende gescheitert'], series: [{n: 'Anzahl der Gesetze', d: [48, 72, 9, 3], k: 'accent'}], ymax: 80, yl: 'Anzahl', cap: 'Von 120 Gesetzen waren 48 Zustimmungsgesetze und 72 Einspruchsgesetze. In 9 Fällen wurde der Vermittlungsausschuss angerufen. 3 Gesetze sind am Ende gescheitert.'}]],
    tasks: [
      {pts: 4, topic: 'Zeitungsartikel', q: '**1.1** Fassen Sie **vier zentrale Aussagen** des Zeitungsartikels (Anlage 2) in eigenen Worten zusammen.',
        op: '**Zusammenfassen in eigenen Worten** heißt: Du schreibst die wichtigsten Punkte mit deinen Wörtern. Du schreibst nicht ab.',
        hint: 'Beantworte: Wer hat was getan? Warum? Was passiert jetzt? Wer kritisiert, wer lobt?', rows: 6,
        a: ['Mögliche Aussagen (je 1 Punkt, vier verlangt):', '1. Der Bundestag hat ein Gesetz über mobiles Arbeiten beschlossen, aber der Bundesrat hat es zunächst gestoppt.', '2. Mehrere Länder fürchten hohe Kosten, auch für ihre eigenen Beamtinnen und Beamten.', '3. Der Bundesrat hat den Vermittlungsausschuss angerufen. Dort sollen Bundestag und Bundesrat einen Kompromiss finden.', '4. Gewerkschaften kritisieren die Verzögerung. Ein Arbeitgeberverband lobt die genaue Prüfung der Kosten.', '5. Offen ist, wann das Gesetz in Kraft tritt. Ein Ministerpräsident/eine Ministerpräsidentin betont: Man blockiert nicht, man prüft.'], see: ['gk-institutionen', 'gk-methoden']},
      {pts: 4, topic: 'Karikatur', q: '**1.2** Beschreiben und interpretieren Sie die Karikatur (Anlage 3).',
        op: '**Beschreiben** heißt: Was sieht man? **Interpretieren** heißt: Was will der Zeichner damit sagen?',
        hint: 'Erst 2 Sätze Beschreibung (Personen, Gegenstände). Dann 2 Sätze Deutung (Bedeutung des Stoppschilds, der Waage). Dann die Aussage der Karikatur.', rows: 7,
        words: [['Waage', 'Gerät, das zeigt, ob zwei Dinge gleich schwer sind.'], ['Gründlichkeit', 'Man macht etwas sehr genau.']],
        a: ['**Beschreibung (2 Punkte):** Links schiebt der Bundestag einen hohen Stapel „Neues Gesetz“. Rechts hält der Bundesrat ein Stoppschild hoch und will den Text erst noch einmal lesen. In der Mitte hängt eine Waage mit „Tempo“ und „Gründlichkeit“. Im Hintergrund warten Menschen mit dem Plakat „Wir warten!“.', '**Interpretation (2 Punkte):** Der Stapel steht für die vielen Gesetze, die der Bundestag beschließt. Das Stoppschild zeigt: Der Bundesrat kann Gesetze anhalten und prüfen. Die Waage zeigt den Konflikt: Schnelle Gesetze oder genaue Prüfung. Die wartenden Menschen zeigen: Die Bürger sind von der Verzögerung betroffen. Aussage: Die Karikatur kritisiert, dass Prüfung Zeit kostet, zeigt aber auch, dass Gründlichkeit nötig ist.'], see: ['gk-methoden']},
      {pts: 4, topic: 'Gewaltenteilung', q: '**2.1** Erklären Sie an **zwei Beispielen**, wie die Gewaltenteilung verhindert, dass eine einzige Stelle im Staat zu viel Macht hat.',
        op: '**Erklären** heißt: Du sagst, was es ist, und **warum** es so ist. Dazu passt ein Beispiel.',
        hint: 'Nenne die drei Gewalten (Legislative, Exekutive, Judikative). Dann zwei Beispiele für Kontrolle.', rows: 6,
        a: ['Die Macht ist auf drei Bereiche verteilt (Art. 20 Abs. 2 GG, Anlage 1): **Legislative** (Bundestag und Bundesrat: Gesetze), **Exekutive** (Regierung und Verwaltung: Gesetze ausführen), **Judikative** (Gerichte: Recht sprechen). Jede Gewalt kontrolliert die anderen.', 'Beispiel 1 (2 Punkte): Der Bundestag beschließt Gesetze, die Regierung muss sie nur ausführen. Der Bundestag kann die Regierung zusätzlich kontrollieren (Fragen, Untersuchungsausschuss).', 'Beispiel 2 (2 Punkte): Wenn die Regierung gegen ein Gesetz verstößt, können Bürger vor Gericht klagen. Das Bundesverfassungsgericht kann Gesetze für nichtig erklären, die gegen das Grundgesetz verstoßen. Auch richtig: Der Bundesrat kontrolliert den Bundestag bei der Gesetzgebung.'], see: ['gk-grundordnung', 'gk-institutionen']},
      {pts: 6, topic: 'Bundesrat beurteilen', q: '**2.2** Leon sagt: „Der Bundesrat ist nicht vom Volk gewählt und blockiert nur. Man sollte ihn abschaffen.“ Beurteilen Sie anhand von **zwei Argumenten**, ob das eine gute Idee ist.',
        op: '**Beurteilen** heißt: Du wägst ab und kommst zu einem Urteil. Ein Argument hat: **Behauptung - Begründung - Beispiel**. Am Ende steht dein Urteil.',
        hint: 'Argument 1 für Beibehalten (Länder, Prüfung). Argument 2 dagegen oder dafür (Dauer, Legitimation). Dann Urteil in 1-2 Sätzen.', rows: 10,
        words: [['abschaffen', 'Etwas gibt es nicht mehr.'], ['Legitimation', 'Das Recht, Macht auszuüben. In der Demokratie kommt es von den Wählern.']],
        a: ['Ein mögliches Urteil (je Argument 2 Punkte; Urteil 2 Punkte):', '**Gegen die Abschaffung:** (1) Der Bundesrat vertritt die **Länder** (Art. 50 GG, Anlage 1). So wirken die Länder bei Gesetzen mit, die sie selbst ausführen müssen. Beispiel: Das Gesetz im Artikel würde auch ihre Beamten betreffen. (2) Er sorgt für **Kontrolle und gründliche Prüfung**. Nur 3 von 120 Gesetzen scheitern am Ende (Anlage 4), meist einigt man sich im Vermittlungsausschuss. Der Bundesrat bremst also selten ganz.', '**Für die Abschaffung:** Er ist nicht direkt gewählt (Mitglieder der Landesregierungen); Verfahren dauern länger, wie die Wartenden in der Karikatur zeigen.', '**Urteil:** Der Bundesrat sollte bleiben. Er stützt den Föderalismus. Seine Mitglieder sind indirekt demokratisch legitimiert, weil die Landesregierungen aus Landtagswahlen hervorgehen. Eine Reform, die Verfahren schneller macht, wäre besser als die Abschaffung.'], see: ['gk-institutionen', 'gk-grundordnung']},
      {pts: 6, topic: 'Schaubild Bundesrat', q: '**3** Aylin sagt: „Der Bundesrat verhindert doch ständig Gesetze.“ Überprüfen Sie anhand von **zwei Aspekten aus dem Schaubild** (Anlage 4), inwieweit Aylins Aussage zutrifft.',
        op: '**Überprüfen** heißt: Du prüfst mit Daten, ob die Aussage stimmt (ganz, teilweise oder gar nicht). Du nennst die Zahlen.',
        hint: 'Nimm zwei Aspekte: Wie oft Vermittlungsausschuss? Wie viele Gesetze am Ende gescheitert? Rechne Prozent: 9 von 120, 3 von 120.', rows: 9,
        a: ['Die Aussage trifft **kaum** zu.', 'Aspekt 1 (2-3 Punkte): Der Vermittlungsausschuss wurde nur in **9 von 120** Fällen angerufen. Das sind **7,5 %**. In 92,5 % der Fälle gab es keinen Streit.', 'Aspekt 2 (2-3 Punkte): Nur **3 von 120** Gesetzen (2,5 %) sind am Ende gescheitert. Ein Verhindern kommt also selten vor.', 'Zusatz: 48 Gesetze (40 %) brauchen die Zustimmung des Bundesrats. Hier hat er mehr Macht, nutzt sie aber nur selten zum Stoppen. Fazit: Der Bundesrat verzögert manchmal, verhindert aber nur selten. Aylins Aussage ist übertrieben.'], see: ['gk-methoden']},
      {pts: 6, topic: 'Nachricht Einfluss', q: '**4** Leon fragt per Messenger: „Und was kann ich selbst tun, damit ein Gesetz wie dieses besser wird? Nur wählen reicht mir nicht.“ Verfassen Sie eine **Nachricht an Leon**, in der Sie **zwei Möglichkeiten** nennen, wie Bürger Einfluss auf die Gesetzgebung nehmen können.',
        op: '**Verfassen** heißt: Du schreibst einen eigenen Text für die Situation. Hier: kurze Nachricht an einen Freund, freundlich und klar.',
        hint: 'Anrede („Hi Leon“), zwei Möglichkeiten mit kurzer Erklärung, Gruß. Zum Beispiel: Petition, Kontakt zum Abgeordneten, Verband, Partei, Demonstration, Bürgerinitiative.', rows: 8,
        words: [['Petition', 'Ein schriftliches Bittgesuch an den Bundestag.'], ['Abgeordneter', 'Gewählte Person im Bundestag.'], ['Bürgerinitiative', 'Gruppe von Bürgern, die ein Anliegen vertreten.']],
        a: ['Beispiel: „Hi Leon, super Frage! Du kannst zum Beispiel eine **Petition** an den Bundestag schreiben oder online unterschreiben. Dort wird dein Anliegen geprüft. Du kannst auch an deine **Bundestagsabgeordnete** schreiben und deine Meinung sagen. Außerdem kannst du in einer Gewerkschaft, einem Verband oder einer Partei mitmachen und dort Vorschläge einbringen. Wenn du magst, gehen wir zusammen zu einer Bürgersprechstunde. Viele Grüße, Aylin“', 'Bewertung: Je Möglichkeit mit Erklärung 2 Punkte (4); Adressat/Ton/Form (Anrede, Gruß) 1 Punkt; Sprache 1 Punkt.'], see: ['gk-mitwirkung', 'gk-wahlen']},
    ],
  });
  AP2.exam.end(ID);
})();
