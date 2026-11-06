// Probeprüfung 8, Deutsch (Prüfungstyp I, Social Media und Fake News) + Gemeinschaftskunde (KI und Arbeitswelt, EU-KI-Verordnung).
(function () {
  const ID = 'exam8-dgk';
  const wrap = (paras, w) => { const out = []; paras.forEach((p) => { let cur = ''; p.split(' ').forEach((wd) => { if (cur && (cur + ' ' + wd).length > w) { out.push(cur); cur = wd; } else cur = cur ? cur + ' ' + wd : wd; }); if (cur) out.push(cur); }); return out; };
  const numbered = (lines) => ['table', ['Z.', 'Text'], lines.map((l, i) => [(i + 1) % 5 === 0 ? String(i + 1) : '', l])];
  const zref = (lines) => (s) => { const j = lines.join(' '); const i = j.indexOf(s); if (i < 0) throw new Error('Textstelle fehlt: ' + s); const at = (pos) => { let acc = 0; for (let k = 0; k < lines.length; k++) { if (pos < acc + lines[k].length + 1) return k + 1; acc += lines[k].length + 1; } return lines.length; }; const a = at(i), b = at(i + s.length - 1); return 'Z. ' + a + (b > a ? ' f.' : ''); };
  const M1 = wrap([
    'Früher las man die Nachrichten in der Zeitung oder sah sie abends im Fernsehen. Heute informieren sich viele junge Menschen vor allem im Netz. Eine Studie zeigt: Mehr als die Hälfte der unter 25-Jährigen nutzt soziale Netzwerke als wichtigste Nachrichtenquelle. Das ist bequem, aber nicht ohne Risiko.',
    'Das Problem heißt Falschmeldung, oft auch „Fake News“ genannt. Gemeint sind Nachrichten, die erfunden oder stark verändert sind. Manche Falschmeldungen entstehen aus Absicht, etwa um Politik zu beeinflussen oder Geld zu verdienen. Andere entstehen aus Irrtum und werden von Nutzern ohne Prüfung weitergegeben.',
    'Warum verbreiten sich solche Meldungen so schnell? Forscher nennen drei Gründe. Erstens wecken Falschmeldungen starke Gefühle wie Wut oder Angst. Gefühle werden gern geteilt. Zweitens zeigen Plattformen den Nutzern vor allem Inhalte, die ihnen gefallen. Dadurch sehen sie selten andere Meinungen. Drittens ist ein Beitrag in Sekunden geteilt, eine Richtigstellung dauert viel länger.',
    'Wie kann man Falschmeldungen erkennen? Hilfreich sind einfache Fragen. Wer ist der Absender? Gibt es ein Impressum? Nennt der Text Quellen? Wirkt die Überschrift übertrieben? Auch eine Suche nach Bildern hilft: Oft stammt ein Foto aus einem ganz anderen Zusammenhang. Faktenchecker großer Redaktionen prüfen täglich viele Meldungen und veröffentlichen die Ergebnisse.',
    'Auch die Politik reagiert. Die EU verlangt von großen Plattformen, dass sie rechtswidrige Inhalte schnell löschen und ihre Regeln offenlegen. Kritiker warnen jedoch: Wenn Plattformen zu viel löschen, leidet die Meinungsfreiheit. Der Staat soll also nicht entscheiden, was „wahr“ ist. Er soll nur sorgen, dass Regeln für alle gelten.',
    'Am Ende liegt viel Verantwortung bei jedem Einzelnen. Wer einen Beitrag teilt, wird selbst zum Sender. Experten raten deshalb: erst lesen, dann prüfen, dann teilen. Das kostet eine Minute. Diese Minute kann verhindern, dass eine Lüge sich verbreitet.'], 60);
  const Z = zref(M1);
  const FEHLER = wrap([
    'Wer im Netz schreibt, sollte vorsichtig sein. Beleidigungen sind nicht erlaubt, den sie können strafbar sein. Posts bleiben oft lange sichtbar, auch wen man sie löscht. Deshalb sollte man vor dem absenden nachdenken. Gerade bei Streit ist es wichtig, das man ruhig bleibt. Wenn man wütend ist, schreibt man schneller als man denkt.',
    'Ein weiteres Problem sind falsche Bilder. Manche Fotos wurden von Computern erstelt. Sie sehen echt aus aber der Inhalt ist erfunden. Man erkennt es oft an die Hände, die zu viele Finger haben. Wer ein Bild teilen will, sollte erst die Quelle prüfen. So schützt man sich selbst und anderen. Die Lehrerin zeigt im Unterricht verschidene Möglichkeiten. Sie sagt, das jeder Nutzer Verantwortung trägt. Das Rechd am eigenen Bild gilt auch im Netz.'], 60);
  const ZA = zref(FEHLER);
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 8 (Bildung)', t: 'Deutsch + GK: Social Media und Fake News; Künstliche Intelligenz', blocks: []});
  AP2.exam.start(ID, {minutes: 180, cover: AP2.exam.COVER.dgk,
    hint: 'So wie in der echten Berufsschulprüfung: Deutsch (Prüfungstyp I, 50 Punkte) und Gemeinschaftskunde (30 Punkte). Keine Hilfsmittel. Antworten in ganzen Sätzen. Gebundene Aufgaben werden automatisch bewertet.',
    intro: [['p', '**Deutsch, Prüfungstyp I.** Thema: „Social Media und Nachrichten / Fake News“. Teil 1 hat 25 Punkte, Teil 2 (Schreibaufgabe) hat 25 Punkte. **Gemeinschaftskunde**: 30 Punkte, Thema Künstliche Intelligenz und Arbeitswelt, EU-KI-Verordnung. Insgesamt 80 Punkte.']],
    words: [['Falschmeldung (Fake News)', 'Erfundene oder stark veränderte Nachricht.'], ['Plattform', 'Internetseite oder App, auf der Nutzer Inhalte teilen.'], ['Algorithmus', 'Regel, nach der ein Computer Inhalte auswählt.'], ['Impressum', 'Angabe, wer eine Internetseite betreibt.'], ['Faktenchecker', 'Person, die prüft, ob eine Aussage stimmt.'], ['Meinungsfreiheit', 'Jeder darf seine Meinung sagen (Art. 5 GG).'], ['Künstliche Intelligenz (KI)', 'Computerprogramme, die Aufgaben lösen, für die man sonst Denken braucht.'], ['Hochrisiko-KI', 'KI, die große Risiken für Menschen haben kann, z. B. bei Bewerbungen.'], ['EU-KI-Verordnung', 'EU-Gesetz (Verordnung (EU) 2024/1689) mit Regeln für KI.'], ['Transparenz', 'Man sagt offen, was man tut.'], ['Karikatur', 'Ein Bild, das etwas übertreibt, um Kritik zu zeigen.'], ['Textbeleg', 'Eine Stelle im Text, die eine Aussage zeigt.']]});

  AP2.exam.part(ID, {
    t: 'Deutsch Teil 1: Textverständnis und Sprachgebrauch (25 Punkte)',
    intro: [['p', 'Lesen Sie zuerst die Materialien. Die Zahlen in der linken Spalte sind **Zeilennummern**. Zu den gebundenen Aufgaben gibt es Punkte anteilig.']],
    ctx: [['p', '**Material 1: „Erst prüfen, dann teilen“** (Zeitungsartikel, für die Prüfung geschrieben)'], numbered(M1),
      ['p', '**Material 2: Schaubild.** „Wie junge Menschen mit Nachrichten im Netz umgehen“ (Anteil der Befragten in Prozent; Beispieldaten für die Prüfungsübung, 1.000 Befragte unter 25 Jahre)'],
      ['chart', {kind: 'bar', w: 640, h: 300, labels: ['Nutzen soziale Netzwerke für Nachrichten', 'Prüfen Quelle vor dem Teilen', 'Haben schon eine Falschmeldung geteilt', 'Vertrauen Zeitungen/Fernsehen', 'Haben schon Faktenchecks gesehen'], series: [{n: 'Anteil in %', d: [58, 36, 24, 49, 31], k: 'accent'}], ymax: 100, yl: 'Prozent', cap: 'Beispieldaten, vereinfacht.'}]],
    tasks: [
      {pts: 4, topic: 'Aussagen ableiten', q: '**Aufgabe 1.** Entscheiden Sie, welche Aussagen sich aus **Material 1** ableiten lassen.',
        op: '**Ableiten** heißt: Die Aussage steht im Text oder folgt klar daraus. Sonst ist sie „nicht ableitbar“.',
        hint: 'Finde zu jeder Aussage die Textstelle. Gibt es keine, ist sie nicht ableitbar.',
        words: [['Richtigstellung', 'Eine Meldung, die einen Fehler korrigiert.'], ['rechtswidrig', 'gegen das Gesetz.']],
        match: {keys: ['ableitbar', 'nicht ableitbar'], items: [
          ['Viele junge Menschen informieren sich heute vor allem im Internet.', 0],
          ['Alle Falschmeldungen entstehen aus böser Absicht.', 1],
          ['Falschmeldungen wecken oft starke Gefühle.', 0],
          ['Plattformen zeigen den Nutzern vor allem Inhalte, die ihnen gefallen.', 0],
          ['Die EU hat Facebook verboten.', 1],
          ['Eine Richtigstellung braucht oft länger als das Teilen eines Beitrags.', 0],
          ['Faktenchecker sind in Deutschland gesetzlich vorgeschrieben.', 1],
          ['Wer einen Beitrag teilt, wird selbst zum Sender.', 0]]},
        a: ['Ableitbar: 1 (' + Z('informieren sich viele junge Menschen vor allem im Netz') + '), 3 (' + Z('wecken Falschmeldungen starke Gefühle') + '), 4 (' + Z('Inhalte, die ihnen gefallen') + '), 6 (' + Z('eine Richtigstellung dauert viel länger') + '), 8 (' + Z('wird selbst zum Sender') + ').', 'Nicht ableitbar: 2, denn andere entstehen „aus Irrtum“ (' + Z('Andere entstehen aus Irrtum') + '). 5, denn die EU verlangt Regeln, ein Verbot wird nicht genannt (' + Z('Die EU verlangt') + '). 7, denn der Text sagt nur, dass Faktenchecker bei Redaktionen arbeiten (' + Z('Faktenchecker großer Redaktionen') + ').'], see: ['de-textverstaendnis']},
      {pts: 2, topic: 'Richtig oder falsch', q: '**Aufgabe 2a.** Richtig (r) oder falsch (f)?',
        match: {keys: ['richtig (r)', 'falsch (f)'], items: [
          ['Mehr als die Hälfte der unter 25-Jährigen nutzt soziale Netzwerke als wichtigste Nachrichtenquelle.', 0],
          ['Der Text meint, der Staat solle entscheiden, was wahr ist.', 1],
          ['Ein Foto stammt oft aus einem anderen Zusammenhang.', 0],
          ['Die Suche nach Bildern hilft nicht, Falschmeldungen zu erkennen.', 1]]},
        a: ['1 r, 2 f, 3 r, 4 f. Belege in Aufgabe 2b.'], see: ['de-textverstaendnis']},
      {pts: 2, topic: 'Textbelege', q: '**Aufgabe 2b.** Schreiben Sie zu **jeder** Aussage aus 2a einen Textbeleg mit Zeilenangabe.',
        op: '**Textbeleg** heißt: eine Stelle aus dem Text, die zeigt, dass die Aussage stimmt oder nicht.',
        hint: 'Zitat in Anführungszeichen, dahinter (Z. ...).', rows: 6,
        a: ['1 r: „Mehr als die Hälfte der unter 25-Jährigen nutzt soziale Netzwerke [...]“ (' + Z('Mehr als die Hälfte') + ').', '2 f: „Der Staat soll also nicht entscheiden, was ‚wahr‘ ist.“ (' + Z('Der Staat soll also nicht entscheiden') + ').', '3 r: „Oft stammt ein Foto aus einem ganz anderen Zusammenhang.“ (' + Z('Oft stammt ein Foto') + ').', '4 f: „Auch eine Suche nach Bildern hilft [...]“ (' + Z('Auch eine Suche nach Bildern hilft') + ').', 'Je Beleg 0,5 Punkte.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle A', q: '**Aufgabe 3 (A).** „Das ist bequem, aber nicht ohne Risiko.“ (' + Z('Das ist bequem, aber nicht ohne Risiko') + ') Was ist damit gemeint?',
        op: '**Gemeint** heißt: Was soll der Satz sagen?',
        mc: {o: ['Soziale Netzwerke sind einfach zu nutzen, können aber falsche Informationen enthalten.', 'Soziale Netzwerke sind gefährlich und sollten verboten werden.', 'Nachrichten im Fernsehen sind besser.'], c: [0]},
        a: ['Der Satz nennt Vorteil („bequem“) und Nachteil („Risiko“). Die Antworten 2 und 3 gehen weiter, als der Text sagt.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle B', q: '**Aufgabe 3 (B).** „Gefühle werden gern geteilt.“ (' + Z('Gefühle werden gern geteilt') + ') Was ist damit gemeint?',
        mc: {o: ['Menschen teilen gern Inhalte, die starke Emotionen auslösen.', 'Menschen sprechen gern über Gefühle in der Schule.', 'Plattformen teilen Gefühle kostenlos.'], c: [0]},
        a: ['„Teilen“ meint hier das Weiterleiten im Netz. Emotionale Inhalte verbreiten sich schneller.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle C', q: '**Aufgabe 3 (C).** „Wer einen Beitrag teilt, wird selbst zum Sender.“ (' + Z('wird selbst zum Sender') + ') Was ist damit gemeint?',
        mc: {o: ['Jeder Nutzer wird zum Radiosender.', 'Wer etwas weiterverbreitet, trägt Verantwortung für den Inhalt.', 'Nur Politiker senden Nachrichten.'], c: [1]},
        a: ['Das Bild „Sender“ zeigt: Teilende verbreiten die Nachricht selbst. Deshalb steht danach „erst lesen, dann prüfen, dann teilen“.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle D', q: '**Aufgabe 3 (D).** „Diese Minute kann verhindern, dass eine Lüge sich verbreitet.“ (' + Z('Diese Minute kann verhindern') + ') Was ist damit gemeint?',
        mc: {o: ['Eine kurze Prüfung kann die Verbreitung von Falschmeldungen stoppen.', 'Man muss eine Minute warten, bevor man ins Netz geht.', 'Lügen dauern nur eine Minute.'], c: [0]},
        a: ['Die Minute steht für die kurze Prüfung vor dem Teilen.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle E', q: '**Aufgabe 3 (E).** „Wenn Plattformen zu viel löschen, leidet die Meinungsfreiheit.“ (' + Z('leidet die Meinungsfreiheit') + ') Was ist damit gemeint?',
        mc: {o: ['Zu viel Löschen kann erlaubte Meinungen unterdrücken.', 'Plattformen löschen nie etwas.', 'Meinungsfreiheit ist nur für Plattformen.'], c: [0]},
        a: ['Kritiker fürchten, dass auch erlaubte Meinungen verschwinden. Darum soll nicht der Staat über „wahr“ entscheiden.'], see: ['de-textverstaendnis']},
      {pts: 3, topic: 'Schaubild auswerten', q: '**Aufgabe 4.** Entscheiden Sie, welche Aussagen sich aus dem **Schaubild (Material 2)** ableiten lassen.',
        op: '**Aus dem Schaubild ableiten**: Du liest die Zahlen. Was nicht im Schaubild steht, ist nicht ableitbar.',
        hint: 'Vergleiche die Balken. Achte auf „mehr als die Hälfte“, „weniger als ein Viertel“.',
        match: {keys: ['ableitbar', 'nicht ableitbar'], items: [
          ['58 % der Befragten nutzen soziale Netzwerke für Nachrichten.', 0],
          ['Mehr Befragte prüfen die Quelle, als eine Falschmeldung geteilt haben.', 0],
          ['Weniger als ein Viertel der Befragten hat nie Fakten geprüft.', 1],
          ['Fast die Hälfte der Befragten vertraut Zeitungen und Fernsehen.', 0],
          ['Die meisten Befragten halten Fake News für ungefährlich.', 1],
          ['Mehr als die Hälfte der Befragten hat schon eine Falschmeldung geteilt.', 1]]},
        a: ['Ableitbar: 1; 2 (36 % > 24 %); 4 (49 % ist knapp unter 50 %). Nicht ableitbar: 3 (Das Schaubild sagt nicht, wie viele nie prüfen. 64 % prüfen nicht „vor dem Teilen“, das ist etwas anderes.), 5 (nicht im Schaubild), 6 (nur 24 %).'], see: ['de-textverstaendnis']},
      {pts: 3, topic: 'Wertung erkennen', q: '**Aufgabe 5.** Welche Aussagen enthalten eine **Wertung**?',
        op: '**Wertung** heißt: Die Person bewertet etwas als gut oder schlecht.',
        match: {keys: ['mit Wertung', 'ohne Wertung'], items: [
          ['„Die meisten Jugendlichen lesen leider keine Zeitung mehr.“', 0],
          ['„Mehr als die Hälfte der unter 25-Jährigen nutzt soziale Netzwerke.“', 1],
          ['„Faktenchecker leisten großartige Arbeit.“', 0],
          ['„Die EU verlangt von Plattformen, dass sie Regeln offenlegen.“', 1],
          ['„Es ist unverantwortlich, Beiträge ungeprüft zu teilen.“', 0],
          ['„Plattformen löschen täglich viele Beiträge.“', 1]]},
        a: ['Mit Wertung: 1 („leider“), 3 („großartig“), 5 („unverantwortlich“). Ohne Wertung: 2, 4, 6.'], see: ['de-sprachgebrauch']},
      {pts: 2, topic: 'Umformulieren', q: '**Aufgabe 6.** Formulieren Sie um.\n(a) „Falschmeldungen verbreiten sich schnell.“ (**Nomen mit „Die Verbreitung ...“**)\n(b) „Wer einen Beitrag teilt, wird zum Sender.“ (**Konjunktiv I als indirekte Rede**: „Der Text sagt, wer ...“)',
        op: '**Umformulieren** heißt: Gleiche Bedeutung, andere Form.',
        hint: 'Bei (a): aus dem Verb ein Nomen machen. Bei (b): „werde“ oder „würde“ + Infinitiv.', rows: 4,
        a: ['(a) **Die Verbreitung von Falschmeldungen ist schnell.** / Die schnelle Verbreitung von Falschmeldungen ...', '(b) **Der Text sagt, wer einen Beitrag teile, werde selbst zum Sender.** (Konjunktiv I: „teile“, „werde“.)', 'Je Satz 1 Punkt.'], see: ['de-sprachgebrauch']},
      {pts: 4, topic: 'Fehler korrigieren', q: '**Aufgabe 7.** Der Text „Vorsicht im Netz“ (Material 3) enthält **12 Fehler**. Schreiben Sie sie und die Verbesserung auf. Je 3 richtig verbesserte Fehler ergeben 1 Punkt.',
        op: '**Korrigieren** heißt: Fehler finden und richtig schreiben.',
        hint: 'Prüfe: „den/denn“, „das/dass“, Komma, Rechtschreibung, Fall.',
        ctx: [numbered(FEHLER)], rows: 8,
        a: ['**12 Fehler:**', '1. „den sie können“ -> **denn sie können** (' + ZA('den sie können') + ').', '2. „wen man“ -> **wenn man** (' + ZA('wen man') + ').', '3. „absenden“ -> **Absenden** (' + ZA('absenden') + '): Nomen groß.', '4. „das man“ -> **dass man** (' + ZA('das man ruhig') + ').', '5. „schneller als man denkt“ -> **schneller, als man denkt** (' + ZA('schneller als man denkt') + '): Komma vor Nebensatz.', '6. „erstelt“ -> **erstellt** (' + ZA('erstelt') + ').', '7. „echt aus aber“ -> **echt aus, aber** (' + ZA('echt aus aber') + '): Komma vor „aber“.', '8. „an die Hände“ -> **an den Händen** (' + ZA('an die Hände') + '): Dativ Plural.', '9. „und anderen“ -> **und andere** (' + ZA('und anderen') + '): Akkusativ.', '10. „verschidene“ -> **verschiedene** (' + ZA('verschidene') + ').', '11. „das jeder“ -> **dass jeder** (' + ZA('das jeder Nutzer') + ').', '12. „Rechd“ -> **Recht** (' + ZA('Rechd') + ').', 'Je 3 richtig verbesserte Fehler: 1 Punkt.'], see: ['de-rechtschreibung', 'de-sprachgebrauch']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Deutsch Teil 2: Schreibaufgabe (25 Punkte)',
    intro: [['h', 'Situation'], ['p', 'Sie machen eine Ausbildung bei der **Medienwerk GmbH**. In Ihrer Berufsschule soll ein Projekttag zum Thema „Fake News erkennen“ stattfinden. Ihre Klassenlehrerin, Frau Ritter, bittet um Vorschläge.'],
      ['h', 'Aufgabe'], ['p', 'Schreiben Sie eine **Erörterung** (Pro und Kontra) zu der Frage: „Sollen soziale Netzwerke Falschmeldungen automatisch löschen?“ Nutzen Sie **Material 1 und 2**. Beenden Sie mit einer **begründeten eigenen Meinung**. Schreiben Sie etwa **200 bis 250 Wörter**.'],
      ['list', ['Einleitung mit Hinführung zum Thema.', 'Mindestens zwei Pro- und zwei Kontra-Argumente mit Begründung und Beispiel.', 'Schluss mit eigener Meinung.']]],
    tasks: [
      {pts: 25, topic: 'Erörterung', q: 'Schreiben Sie die Erörterung.',
        op: '**Erörtern** heißt: Du wägst Pro und Kontra ab. Du endest mit einem begründeten Urteil.',
        hint: 'Aufbau: 1. Einleitung. 2. Pro mit Beleg. 3. Kontra mit Beleg. 4. Schluss mit Meinung. Nutze Verbindungswörter: einerseits, andererseits, deshalb, dagegen.', rows: 18,
        words: [['Erörterung', 'Text, der Pro und Kontra abwägt.'], ['automatisch', 'Ohne dass ein Mensch eingreift.'], ['abwägen', 'Vor- und Nachteile vergleichen.']],
        a: ['**Beispiel für eine gute Lösung:**'],
        sol: [['p', '**Sollen soziale Netzwerke Falschmeldungen automatisch löschen?**'], ['p', 'Viele junge Menschen lesen Nachrichten im Netz. 58 % nutzen dafür soziale Netzwerke. Deshalb ist die Frage wichtig, wie man Falschmeldungen stoppen kann.'], ['p', 'Für ein automatisches Löschen spricht, dass Falschmeldungen sich sehr schnell verbreiten. Ein Mensch kann nicht alle Beiträge prüfen. Außerdem wecken falsche Nachrichten oft starke Gefühle, daher werden sie viel geteilt. Wenn sie sofort verschwinden, richten sie weniger Schaden an.'], ['p', 'Dagegen spricht, dass Computer Fehler machen. Ein Programm erkennt Ironie oder Satire schlecht. Dann löscht es erlaubte Meinungen. Das gefährdet die Meinungsfreiheit. Wer entscheidet außerdem, was falsch ist? Der Staat soll das nicht tun, wie der Text sagt.'], ['p', 'Ein weiteres Problem: Nur 36 % prüfen die Quelle selbst. Wenn Plattformen alles löschen, lernen die Nutzer nicht, kritisch zu sein.'], ['p', 'Meine Meinung: Rechtswidrige Inhalte sollen schnell gelöscht werden, wie es die EU verlangt. Bei unklaren Fällen sollte aber ein Mensch entscheiden. Zusätzlich brauchen wir Medienbildung in der Schule. Nur so schützt man die Meinungsfreiheit und die Gesellschaft zugleich.'],
      ['h', 'Bewertungsraster (25 Punkte)'], ['table', ['Bereich', 'Punkte', 'Was bewertet wird'], [['Inhalt und Aufbau', '15', 'Fragestellung beantwortet; Pro **und** Kontra mit Begründung und Beispiel; Informationen aus Material 1 und 2 genutzt (mind. 3); begründetes Urteil; Einleitung, Hauptteil, Schluss; Absätze.'], ['Sprache und äußere Form', '10', 'Rechtschreibung und Zeichensetzung (5); Satzbau, Wortwahl, Verbindungswörter, sachlicher Ton (5).']]]],
        see: ['de-schreibaufgabe', 'de-eroerterung']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Gemeinschaftskunde: Künstliche Intelligenz und Arbeitswelt (30 Punkte)',
    intro: [['h', 'Handlungssituation'], ['p', 'Die Auszubildenden **Nora** und **Ben** arbeiten in einer Bildungsakademie. Die Geschäftsleitung will ein KI-Programm einführen. Es soll Bewerbungen vorsortieren und Texte für Kurse schreiben. Nora sagt: „KI spart Zeit.“ Ben ist besorgt: „Das Programm kann Fehler machen und Menschen benachteiligen.“'],
      ['p', 'Alle Aufgaben sind, wenn nichts anderes steht, in **ganzen Sätzen** zu beantworten.']],
    ctx: [
      ['h', 'Anlage 1: Auszug zur EU-KI-Verordnung (in eigenen Worten)'],
      ['table', ['Risikoklasse', 'Beispiele', 'Regel'], [
        ['Unannehmbares Risiko', 'Soziale Bewertung von Bürgern; Ausnutzen von Schwächen', 'Verboten (seit 2. Februar 2025)'],
        ['Hohes Risiko', 'KI bei Bewerbungsauswahl, Kreditvergabe, Schulnoten', 'Erlaubt, aber mit strengen Pflichten: Risikoprüfung, Dokumentation, menschliche Aufsicht'],
        ['Begrenztes Risiko', 'Chatbots, KI-erzeugte Bilder', 'Transparenz: Nutzer müssen erkennen, dass es KI ist (Art. 50)'],
        ['Minimales Risiko', 'Spamfilter, Videospiele', 'Keine besonderen Pflichten']]],
      ['h', 'Anlage 2: Zeitungsartikel (für die Prüfung geschrieben)'],
      ['p', '**KI im Büro: Hilfe oder Gefahr?**'],
      ['p', 'Hamburg. Immer mehr Firmen setzen künstliche Intelligenz ein. Programme schreiben Texte, sortieren Bewerbungen und beantworten Fragen von Kunden. Beschäftigte sparen Zeit, aber manche fürchten um ihre Stellen. Eine Umfrage unter Betrieben zeigt: Jedes dritte Unternehmen nutzt KI bereits. Ein Betriebsrat sagt: „Wir wollen KI nicht verbieten, aber wir wollen mitreden.“ Gewerkschaften fordern, dass Beschäftigte geschult werden. Datenschützer warnen: Ohne klare Regeln könnten KI-Programme Menschen wegen Alter oder Herkunft schlechter bewerten. Die EU hat deshalb ein Gesetz beschlossen, das KI nach dem Risiko einteilt. Für Hochrisiko-Systeme gelten strenge Pflichten.'],
      ['h', 'Anlage 3: Karikatur (Bildbeschreibung)'],
      ['p', 'In einem Büro sitzt ein Roboter mit einem Schild „KI-Assistent“ am Schreibtisch und tippt schnell. Daneben steht ein Mensch mit einem Karton und einem Zettel „Kündigung?“. Im Hintergrund hängt ein Schild „Wir sparen Zeit!“. Der Chef reibt sich die Hände und sagt: „Perfekt, jetzt brauche ich weniger Leute.“ Auf dem Boden liegt ein umgekippter Kaffeebecher, den der Roboter nicht bemerkt.'],
      ['h', 'Anlage 4: Schaubild (Beispieldaten, vereinfacht)'],
      ['p', 'Anteil der Unternehmen in Prozent, die KI für diese Aufgaben nutzen (Beispielbefragung):'],
      ['chart', {kind: 'bar', w: 640, h: 300, labels: ['Texte schreiben', 'Kundenservice (Chatbot)', 'Bewerbungen sortieren', 'Daten auswerten', 'Übersetzen'], series: [{n: 'Anteil in %', d: [41, 33, 12, 38, 27], k: 'accent'}], ymax: 60, yl: 'Prozent', cap: 'Beispieldaten, vereinfacht.'}]],
    tasks: [
      {pts: 4, topic: 'Aussagen Artikel', q: '**1.1** Arbeiten Sie **vier zentrale Aussagen** des Zeitungsartikels (Anlage 2) heraus.',
        op: '**Herausarbeiten**: wichtige Punkte kurz in eigenen Worten.',
        hint: 'Wer nutzt KI? Wofür? Wer ist besorgt? Was hat die EU getan?', rows: 6,
        a: ['Je Aussage 1 Punkt:', '1. Immer mehr Firmen nutzen KI; jedes dritte Unternehmen setzt sie schon ein.', '2. KI schreibt Texte, sortiert Bewerbungen und beantwortet Kundenfragen; Beschäftigte sparen Zeit, einige fürchten um ihre Stelle.', '3. Der Betriebsrat will mitreden; Gewerkschaften fordern Schulungen.', '4. Datenschützer warnen vor Benachteiligung durch KI; die EU teilt KI nach Risiko ein, mit strengen Pflichten für Hochrisiko-Systeme.'], see: ['gk-ki']},
      {pts: 4, topic: 'Karikatur', q: '**1.2** Beschreiben und deuten Sie die Karikatur (Anlage 3).',
        op: '**Beschreiben**: Was sieht man? **Deuten**: Was will der Zeichner sagen?',
        hint: 'Roboter, Mensch mit Karton, Chef, Kaffeebecher. Deute den Kaffeebecher.', rows: 7,
        a: ['**Beschreibung (2 Punkte):** Ein Roboter „KI-Assistent“ tippt am Schreibtisch. Ein Mensch steht mit Karton und „Kündigung?“ daneben. Der Chef reibt sich die Hände und sagt, er brauche weniger Leute. Ein Kaffeebecher liegt umgekippt am Boden und der Roboter bemerkt es nicht.', '**Deutung (2 Punkte):** Die Karikatur kritisiert, dass KI Menschen ersetzen kann und der Chef nur an Einsparung denkt. Der Kaffeebecher zeigt: KI kann schnell schreiben, aber sie bemerkt nicht, was im Alltag wichtig ist. Menschen bleiben nötig. Aussage: KI darf nicht nur zum Stellenabbau dienen.'], see: ['gk-ki', 'gk-methoden']},
      {pts: 4, topic: 'Schaubild auswerten', q: '**2.1** Werten Sie das Schaubild (Anlage 4) aus. Nennen Sie **zwei Aussagen** mit Zahlen.',
        op: '**Auswerten**: Zahlen lesen und vergleichen.',
        hint: 'Größter und kleinster Wert; Unterschied; Bewerbungen.', rows: 6,
        a: ['Je Aussage 2 Punkte:', '1. Am häufigsten nutzen Unternehmen KI zum Texteschreiben (41 %), danach für Datenauswertung (38 %) und Kundenservice (33 %).', '2. Am seltensten wird KI für das Sortieren von Bewerbungen genutzt (12 %). Der Unterschied zu „Texte schreiben“ beträgt **29 Prozentpunkte**. Gerade bei Bewerbungen sind die Risiken hoch, deshalb ist die Zurückhaltung nachvollziehbar.'], see: ['gk-ki', 'gk-methoden']},
      {pts: 6, topic: 'KI beurteilen', q: '**2.2** Beurteilen Sie anhand von **zwei Argumenten**, ob die Akademie das KI-Programm zum Vorsortieren von Bewerbungen einsetzen sollte. Beziehen Sie die **EU-KI-Verordnung (Anlage 1)** ein.',
        op: '**Beurteilen**: abwägen und zu einem Urteil kommen. Argument = Behauptung, Begründung, Beispiel.',
        hint: 'Bewerbungsauswahl ist laut Anlage 1 Hochrisiko. Pro: Zeit. Kontra: Fehler/Diskriminierung, Pflichten.', rows: 10,
        words: [['Diskriminierung', 'Menschen werden unfair schlechter behandelt, z. B. wegen Alter.'], ['Aufsicht', 'Kontrolle.']],
        a: ['Mögliche Lösung (je Argument 2 Punkte, Urteil 2 Punkte):', '**Pro:** KI spart bei vielen Bewerbungen Zeit, die Mitarbeiter für Gespräche nutzen können (Nora, Anlage 2).', '**Kontra:** Bewerbungsauswahl ist nach der EU-KI-Verordnung ein **Hochrisiko-System**. Es gelten strenge Pflichten: Risikoprüfung, Dokumentation und menschliche Aufsicht. Fehler können Bewerber wegen Alter oder Herkunft benachteiligen (Datenschützer, Anlage 2). Auch das AGG verbietet Diskriminierung.', '**Urteil:** Einsatz nur mit Bedingungen: Mensch entscheidet am Ende, Test auf Fehler, Betriebsrat einbeziehen, Bewerber informieren. Ohne diese Bedingungen sollte die Akademie darauf verzichten.'], see: ['gk-ki', 'wiso-ki']},
      {pts: 6, topic: 'Transparenz', q: '**3** Die Akademie will für Kunden einen Chatbot einsetzen. Erklären Sie anhand von Anlage 1 **zwei Pflichten oder Folgen** für die Akademie. Nennen Sie auch, **warum** diese Regeln sinnvoll sind.',
        op: '**Erklären**: sagen, was gilt, und warum.',
        hint: 'Chatbot = begrenztes Risiko. Transparenz (Art. 50). Datenschutz (DSGVO) kommt dazu.', rows: 9,
        a: ['Je Pflicht mit Erklärung und Begründung 3 Punkte:', '1. **Transparenz:** Ein Chatbot gehört zu „begrenztes Risiko“. Nutzer müssen erkennen, dass sie mit einer KI sprechen (Art. 50). Das schützt vor Täuschung; Kunden können entscheiden, ob sie der Antwort vertrauen.', '2. **Kennzeichnung von KI-Inhalten:** Von KI erstellte Bilder und Texte, die wie echt wirken, müssen als KI-Inhalte erkennbar sein. Das hilft gegen Falschmeldungen.', 'Zusatz (auch akzeptiert): Die Pflichten der DSGVO gelten weiter; keine Hochrisiko-Pflichten, solange der Chatbot nicht über Rechte der Kunden entscheidet.'], see: ['gk-ki', 'gk-medien']},
      {pts: 6, topic: 'Nachricht an Ben', q: '**4** Ben schreibt: „Wie kann ich im Betrieb mitreden, damit KI fair eingesetzt wird?“ Verfassen Sie eine **Nachricht an Ben** mit **zwei Möglichkeiten**.',
        op: '**Verfassen**: eigener Text, hier eine kurze, freundliche Nachricht.',
        hint: 'Anrede, zwei Wege (Betriebsrat, Schulung, Betriebsversammlung, Gewerkschaft, Gespräch mit Chefin), Gruß.', rows: 8,
        a: ['Beispiel: „Hi Ben, gute Frage! Du kannst dich an den **Betriebsrat** wenden. Er hat bei technischen Überwachungssystemen Mitbestimmungsrechte (BetrVG). Du kannst außerdem in der **Betriebsversammlung** deine Bedenken nennen oder eine **Schulung** zum Umgang mit KI verlangen. Auch die Gewerkschaft kann dir helfen. Wenn du magst, gehe ich mit dir zum Betriebsrat. Viele Grüße, Nora“', 'Bewertung: Je Möglichkeit mit Erklärung 2 Punkte; Form/Ton 1 Punkt; Sprache 1 Punkt.'], see: ['gk-mitwirkung', 'wiso-betriebsrat']},
    ],
  });
  AP2.exam.end(ID);
})();
