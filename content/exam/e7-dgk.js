// Probeprüfung 7, Deutsch (Prüfungstyp II, literarischer Kurztext) + Gemeinschaftskunde (Gleichberechtigung, Frauenquote, Mitwirkung).
(function () {
  const ID = 'exam7-dgk';
  const wrap = (paras, w) => { const out = []; paras.forEach((p) => { let cur = ''; p.split(' ').forEach((wd) => { if (cur && (cur + ' ' + wd).length > w) { out.push(cur); cur = wd; } else cur = cur ? cur + ' ' + wd : wd; }); if (cur) out.push(cur); }); return out; };
  const numbered = (lines) => ['table', ['Z.', 'Text'], lines.map((l, i) => [(i + 1) % 5 === 0 ? String(i + 1) : '', l])];
  const zref = (lines) => (s) => { const j = lines.join(' '); const i = j.indexOf(s); if (i < 0) throw new Error('Textstelle fehlt: ' + s); const at = (pos) => { let acc = 0; for (let k = 0; k < lines.length; k++) { if (pos < acc + lines[k].length + 1) return k + 1; acc += lines[k].length + 1; } return lines.length; }; const a = at(i), b = at(i + s.length - 1); return 'Z. ' + a + (b > a ? ' f.' : ''); };
  const STORY = wrap([
    'Um kurz nach sechs stand Marta an der Haltestelle. Es regnete, wie fast jeden Morgen im November. Sie hielt den Schirm fest und sah auf die Uhr. Der Bus war schon wieder zu spät. Marta seufzte. Sie war seit dreißig Jahren Lagerarbeiterin bei der Firma Krüger, und heute war ihr letzter Arbeitstag.',
    'Im Bus saß wie immer der alte Herr mit der grünen Mütze. Er nickte ihr zu. Sie nickte zurück. In dreißig Jahren hatten sie nie ein Wort gewechselt, und trotzdem fühlte sich der Platz leer an, wenn er einmal fehlte. Heute würde sie ihn zum letzten Mal sehen. Das wusste er nicht.',
    'Am Tor wartete Jonas, der neue Lagerleiter. Er war jünger als ihre Tochter. „Guten Morgen, Frau Weber“, sagte er und lächelte unsicher. „Ich habe eine Überraschung vorbereitet. Kommen Sie bitte mit.“ Marta zog die Augenbrauen hoch. Überraschungen mochte sie nicht. Sie hatte in ihrem Leben genug davon gehabt.',
    'In der Halle roch es nach Pappe und Maschinenöl, so wie immer. Doch heute standen die Kollegen im Kreis um einen Tisch. Darauf lag ein Kuchen. Eine Kerze brannte. Jemand hatte mit Filzstift auf ein Plakat geschrieben: „Danke, Marta!“ Sie blieb stehen. Ihre Hände wurden feucht. Sie hatte eine Rede erwartet, einen Blumenstrauß, vielleicht einen Händedruck. Aber das hier war zu viel.',
    '„Sag etwas“, flüsterte Jonas. Marta schluckte. Sie sah in die Gesichter: Karl, der immer zu spät kam. Ayse, die jeden Tag Tee mitbrachte. Der junge Praktikant, dessen Namen sie sich nie gemerkt hatte. „Ich bin nicht gut mit Worten“, sagte sie schließlich. „Ich kann nur sagen: Jede Palette hier kenne ich mit Namen.“ Alle lachten, und sie lachte mit, obwohl ihr die Tränen in die Augen stiegen.',
    'Später ging sie allein durch die Gänge. Sie berührte die Regale, als wären es alte Freunde. Am Ende der Halle stand ihr Gabelstapler, gelb und zerkratzt. Jonas kam hinterher und blieb im Abstand stehen. „Wollen Sie noch einmal fahren?“, fragte er. Marta nickte. Sie setzte sich hinein, und der Motor sprang sofort an, als hätte er auf sie gewartet.',
    'Eine Runde fuhr sie durch die Halle, ganz langsam. Dann hielt sie vor dem Tor, stieg ab und legte den Schlüssel in Jonas’ Hand. „Er braucht jemanden, der ihn gut behandelt“, sagte sie. „Er klemmt manchmal in der dritten Kurve.“ Jonas nickte ernst. Er wusste, dass sie nicht von der Maschine sprach.',
    'Draußen hatte der Regen aufgehört. An der Haltestelle wartete der alte Herr mit der grünen Mütze. Er hatte keinen Schirm dabei. „Sie fahren heute nicht mit der Arbeit, oder?“, sagte er. Marta blieb überrascht stehen. „Nein“, antwortete sie. „Nicht mehr.“ Er reichte ihr die Hand. „Dann wünsche ich Ihnen alles Gute“, sagte er. Es war das erste Wort in dreißig Jahren, und es klang wie ein Geschenk.'], 60);
  const Z = zref(STORY);
  const FEHLER = wrap([
    'Wer eine neue Stelle antrit, ist oft aufgeregt. Am ersten Tag sollte man pünctlich sein, den sonst wirkt man unhöflich. Die Kollegen stellen sich vor, und man merkt sich nicht alle Namen. Das ist normal. Fragen sie ruhig nach, wen sie etwas nicht verstehen.',
    'Neue Mitarbeiter bekommen meist eine Einweisung. Der Chef erklärd die Abläufe und zeigt die Arbeitsplatz. Er gibt ihnen einen Plan, auf dem alle Termine stehen. Wichtig ist auch, das man Sicherheitsregeln einhält. Nach einer Woche trift man sich zu einem kurzem Gespräch. Man spricht über Fragen und über Wünsche, Die man hat. Viele Firmen wollen das neue Mitarbeiter sich schnell wohlfühlen.'], 60);
  const ZA = zref(FEHLER);
  AP2.page(ID, {b: 'exam', g: 'Probeprüfung 7 (Kino)', t: 'Deutsch + GK: Kurzgeschichte „Der letzte Tag“; Gleichberechtigung und Mitwirkung', blocks: []});
  AP2.exam.start(ID, {minutes: 180, cover: AP2.exam.COVER.dgk,
    hint: 'So wie in der echten Berufsschulprüfung: Deutsch (Prüfungstyp II, literarischer Text, 50 Punkte) und Gemeinschaftskunde (30 Punkte). Keine Hilfsmittel. Antworten in ganzen Sätzen. Gebundene Aufgaben werden automatisch bewertet.',
    intro: [['p', '**Deutsch, Prüfungstyp II** (Materialbasis: literarischer Text). Teil 1 hat 25 Punkte, Teil 2 (Schreibaufgabe) hat 25 Punkte. **Gemeinschaftskunde**: 30 Punkte, Thema Gleichberechtigung, Frauenquote und Mitwirkung. Insgesamt 80 Punkte.']],
    words: [['Kurzgeschichte', 'Eine kurze Erzählung über einen Moment im Leben, oft mit offenem Ende.'], ['Erzähler', 'Die Stimme, die die Geschichte erzählt.'], ['Symbol', 'Ein Ding, das für etwas anderes steht.'], ['Lagerarbeiterin', 'Frau, die in einem Warenlager arbeitet.'], ['Gabelstapler', 'Fahrzeug, das Paletten hebt und trägt.'], ['Palette', 'Holzplattform für Waren.'], ['Gleichberechtigung', 'Alle Menschen haben die gleichen Rechte, auch Männer und Frauen.'], ['Frauenquote', 'Regel, dass ein Mindestanteil Frauen in Führungsgremien sein muss.'], ['Aufsichtsrat', 'Gremium, das den Vorstand einer großen Firma kontrolliert.'], ['Vorstand', 'Leitung einer großen Firma.'], ['Gender Pay Gap', 'Unterschied beim durchschnittlichen Stundenlohn von Frauen und Männern.'], ['Mitbestimmung', 'Beschäftigte entscheiden in der Firma mit.'], ['Betriebsrat', 'Vertretung der Beschäftigten im Betrieb.'], ['Karikatur', 'Ein Bild, das etwas übertreibt, um Kritik zu zeigen.']]});

  AP2.exam.part(ID, {
    t: 'Deutsch Teil 1: Textverständnis und Sprachgebrauch (25 Punkte)',
    intro: [['p', 'Lesen Sie die Kurzgeschichte. Die Zahlen in der linken Spalte sind **Zeilennummern**. Zu den gebundenen Aufgaben gibt es Punkte anteilig.']],
    ctx: [['p', '**„Der letzte Tag“** (Kurzgeschichte, für die Prüfung geschrieben)'], numbered(STORY)],
    tasks: [
      {pts: 6, topic: 'Aussagen zum Text', q: '**Aufgabe 1.** Entscheiden Sie, ob die Aussagen zum Text richtig (r) oder falsch (f) sind.',
        op: '**Richtig oder falsch** heißt: Prüfe jede Aussage am Text. Falsch ist auch, wenn der Text etwas anderes sagt oder die Aussage nicht stimmt.',
        hint: 'Suche für jede Aussage die Textstelle. Lies genau: „immer“, „nie“, „alle“ sind oft ein Hinweis auf „falsch“.',
        match: {keys: ['richtig (r)', 'falsch (f)'], items: [
          ['Marta arbeitet seit dreißig Jahren in dem Betrieb.', 0],
          ['Der Bus kommt pünktlich.', 1],
          ['Jonas ist der neue Lagerleiter und jünger als Martas Tochter.', 0],
          ['Marta hat sich über die Überraschung sehr gefreut und sofort eine lange Rede gehalten.', 1],
          ['Marta kennt den Namen des jungen Praktikanten nicht.', 0],
          ['Der alte Herr in der Mütze und Marta haben schon oft miteinander gesprochen.', 1]]},
        a: ['1 r (' + Z('seit dreißig Jahren Lagerarbeiterin') + '). 2 f: Der Bus ist „schon wieder zu spät“ (' + Z('Der Bus war schon wieder zu spät') + '). 3 r (' + Z('jünger als ihre Tochter') + '). 4 f: Marta mag keine Überraschungen und sagt nur wenig (' + Z('Ich bin nicht gut mit Worten') + '). 5 r (' + Z('dessen Namen sie sich nie gemerkt hatte') + '). 6 f: Sie haben „nie ein Wort gewechselt“ (' + Z('nie ein Wort gewechselt') + ').'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle A', q: '**Aufgabe 2 (A).** „[...] fühlte sich der Platz leer an, wenn er einmal fehlte.“ (' + Z('fühlte sich der Platz leer an') + ') Was ist damit gemeint?',
        op: '**Gemeint** heißt: Was soll die Stelle ausdrücken? Es ist nicht nur die wörtliche Bedeutung.',
        mc: {o: ['Der Bus hat einen kaputten Sitz.', 'Marta sieht den fremden Mann doch als Teil ihres Alltags.', 'Marta hasst den alten Herrn.'], c: [1]},
        a: ['Obwohl beide nie sprachen, gehört er für Marta zum Alltag. Sein Fehlen würde sie spüren. Antwort 1 nimmt „Platz“ nur wörtlich. Antwort 3 ist das Gegenteil.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle B', q: '**Aufgabe 2 (B).** „Ihre Hände wurden feucht.“ (' + Z('Ihre Hände wurden feucht') + ') Was ist damit gemeint?',
        mc: {o: ['Marta hat Regenwasser an den Händen.', 'Marta ist aufgeregt und unsicher.', 'Marta möchte Kuchen essen.'], c: [1]},
        a: ['Feuchte Hände sind ein Zeichen für Nervosität. Die Zeile davor zeigt, dass sie nicht mit einer Feier gerechnet hat.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle C', q: '**Aufgabe 2 (C).** „Sie berührte die Regale, als wären es alte Freunde.“ (' + Z('als wären es alte Freunde') + ') Was ist damit gemeint?',
        mc: {o: ['Marta fühlt sich mit ihrem Arbeitsplatz eng verbunden.', 'Die Regale sind sehr alt und kaputt.', 'Marta möchte Freunde im Lager finden.'], c: [0]},
        a: ['Der Vergleich („als wären“) zeigt Zuneigung zum Arbeitsplatz nach dreißig Jahren. Die anderen Antworten passen nicht zum Vergleich.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle D', q: '**Aufgabe 2 (D).** „Er wusste, dass sie nicht von der Maschine sprach.“ (' + Z('nicht von der Maschine sprach') + ') Was ist damit gemeint?',
        mc: {o: ['Marta spricht in Wahrheit über sich selbst und ihren Abschied.', 'Marta hat Angst vor dem Gabelstapler.', 'Jonas versteht Technik nicht.'], c: [0]},
        a: ['„Er braucht jemanden, der ihn gut behandelt“ gilt auch für Marta und ihre Rolle. Jonas versteht die Nebenbedeutung: Sie wünscht sich Respekt für ihre Arbeit.'], see: ['de-textverstaendnis']},
      {pts: 1, topic: 'Textstelle E', q: '**Aufgabe 2 (E).** „[...] und es klang wie ein Geschenk.“ (' + Z('es klang wie ein Geschenk') + ') Was ist damit gemeint?',
        mc: {o: ['Der alte Herr schenkt Marta einen Gegenstand.', 'Das erste Wort des Mannes bedeutet Marta sehr viel.', 'Marta hat Geburtstag.'], c: [1]},
        a: ['Nach dreißig Jahren Schweigen ist der Gruß etwas Besonderes. „Wie ein Geschenk“ ist ein Vergleich, kein wirkliches Geschenk.'], see: ['de-textverstaendnis']},
      {pts: 2, topic: 'Allgemeine Aussagen', q: '**Aufgabe 3a.** Ordnen Sie zu: Welche allgemeinen Aussagen über Kurzgeschichten treffen auf den Text zu?',
        op: '**Zutreffen** heißt: Man kann die Aussage an diesem Text zeigen.',
        match: {keys: ['trifft zu', 'trifft nicht zu'], items: [
          ['Der Text erzählt einen kurzen Ausschnitt aus dem Leben einer Person.', 0],
          ['Der Text hat viele Hauptfiguren und lange Nebenhandlungen.', 1],
          ['Der Text spielt im Alltag, an Orten wie Haltestelle, Bus und Lager.', 0],
          ['Das Ende ist eine überraschende Wendung und lässt Raum für Gedanken.', 0]]},
        a: ['Zu: 1, 3, 4. Nicht zu: 2, denn der Text hat nur eine Hauptfigur (Marta) und keine Nebenhandlungen. Kurzgeschichten sind meist knapp, alltagsnah und enden offen.'], see: ['de-textverstaendnis']},
      {pts: 2, topic: 'Symbole', q: '**Aufgabe 3b.** Ordnen Sie zu: Wofür stehen die Motive in der Geschichte?',
        match: {keys: ['Abschied und Wertschätzung', 'Alltag und Gewohnheit', 'Verbundenheit mit dem Beruf'], items: [
          ['Der Kuchen mit der Kerze und das Plakat', 0],
          ['Der Bus und der Mann mit der grünen Mütze', 1],
          ['Der gelbe, zerkratzte Gabelstapler', 2],
          ['Der Regen, der aufhört', 0]]},
        a: ['Kuchen und Plakat: Die Kollegen danken Marta (Abschied, Wertschätzung). Bus und Mann: tägliche Gewohnheit. Gabelstapler: ihre Arbeit und ihr Lebenswerk. Der Regen hört auf: Neuanfang und Abschied (hier als „Abschied und Wertschätzung“ geordnet; auch als Neubeginn deutbar, wenn begründet).'], see: ['de-textverstaendnis']},
      {pts: 4, topic: 'Umformulieren', q: '**Aufgabe 4.** Formulieren Sie die Sätze um, wie in der Klammer verlangt.\n(a) „Sie hatte eine Rede erwartet.“ (**Nebensatz mit „weil“ und „deshalb“ vermeiden**: Schreiben Sie: „Marta war überrascht, weil ...“)\n(b) „Marta, die Lagerarbeiterin, war traurig.“ (**als Satz mit „obwohl“**: verbinden Sie mit „Marta lachte.“)\n(c) „Er gab ihr die Hand.“ (**Passiv**)\n(d) „Jonas sagte: ‚Kommen Sie mit.‘“ (**indirekte Rede**)',
        op: '**Umformulieren** heißt: Gleiche Bedeutung, andere Form. **Passiv**: „wird/wurde + Partizip II“. **Indirekte Rede**: Konjunktiv I oder Nebensatz mit „dass“.',
        hint: 'Gehe Schritt für Schritt: Satzglieder erkennen, Verb anpassen, Konjunktion einsetzen.', rows: 8,
        a: ['(a) Marta war überrascht, weil sie eine Rede erwartet hatte. (Konjunktion „weil“ + Verb am Ende.)', '(b) Marta lachte, obwohl sie traurig war. (Gegensatz: „obwohl“.)', '(c) Ihr wurde die Hand gegeben. / Die Hand wurde ihr gegeben. (Passiv Präteritum.)', '(d) Jonas sagte, sie solle mitkommen. / Jonas sagte, dass sie mitkommen solle. (Konjunktiv I oder II; „möge“ ist auch möglich.)', 'Je Satz 1 Punkt.'], see: ['de-sprachgebrauch']},
      {pts: 6, topic: 'Fehler korrigieren', q: '**Aufgabe 5.** Der Text „Die erste Woche im Job“ enthält **12 Fehler** (Rechtschreibung, Zeichensetzung, Grammatik). Schreiben Sie jeden Fehler und die Verbesserung auf. Je 2 richtig verbesserte Fehler ergeben 1 Punkt.',
        op: '**Korrigieren** heißt: Fehler finden und richtig schreiben.',
        hint: 'Prüfe: Verb-Endung, „den/denn“, „wen/wenn“, „das/dass“, „Die/die“, Fall (Dativ/Akkusativ), Groß- und Kleinschreibung, Komma.',
        ctx: [numbered(FEHLER)], rows: 8,
        a: ['**12 Fehler:**', '1. „antrit“ -> **antritt** (' + ZA('antrit') + ').', '2. „den sonst“ -> **denn sonst** (' + ZA('den sonst') + ').', '3. „Fragen sie“ -> **Fragen Sie** (' + ZA('Fragen sie') + '): Anrede mit Großschreibung.', '4. „wen sie“ -> **wenn Sie** (' + ZA('wen sie') + ').', '5. „zeigt die Arbeitsplatz“ -> **den Arbeitsplatz** (' + ZA('die Arbeitsplatz') + '): Akkusativ, maskulin.', '6. „das man“ -> **dass man** (' + ZA('das man Sicherheitsregeln') + ').', '7. „einem kurzem“ -> **einem kurzen** (' + ZA('einem kurzem') + '): Adjektivendung im Dativ.', '8. „Wünsche, Die“ -> **Wünsche, die** (' + ZA('Wünsche, Die') + '): Relativpronomen klein.', '9. „das neue Mitarbeiter“ -> **dass neue Mitarbeiter** (' + ZA('das neue Mitarbeiter') + ').', '10. „erklärd“ -> **erklärt** (' + ZA('erklärd') + ').', '11. „pünctlich“ -> **pünktlich** (' + ZA('pünctlich') + ').', '12. „trift“ -> **trifft** (' + ZA('trift') + '): ff nach kurzem Vokal.', 'Hinweis zur Bewertung: Je 2 richtig verbesserte Fehler ergeben 1 Punkt; höchstens 6 Punkte.'], see: ['de-rechtschreibung', 'de-sprachgebrauch']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Deutsch Teil 2: Schreibaufgabe (25 Punkte)',
    intro: [['h', 'Aufgabe'], ['p', 'Sie sind Marta Weber. Am Abend ihres letzten Arbeitstags schreiben Sie in Ihr Tagebuch. Schreiben Sie einen **Tagebucheintrag** (ca. 150 bis 200 Wörter) aus der Sicht von Marta.'],
      ['list', ['Beschreiben Sie, wie Sie den Tag erlebt haben (Morgen, Feier, Abschied vom Gabelstapler, Begegnung an der Haltestelle).', 'Schreiben Sie auch Ihre **Gefühle** und Gedanken auf.', 'Sagen Sie, was Sie sich für die Zukunft wünschen.', 'Schreiben Sie in der Ich-Form und in der Vergangenheit; für Gedanken zur Zukunft das Präsens oder Futur.']]],
    tasks: [
      {pts: 25, topic: 'Tagebucheintrag', q: 'Schreiben Sie den Tagebucheintrag aus der Sicht von Marta.',
        op: '**Aus der Sicht von ...** heißt: Du sprichst als diese Person („ich“). Du zeigst ihre Gefühle und Gedanken.',
        hint: 'Aufbau: Datum und Anrede („Liebes Tagebuch“); Rückblick auf den Tag; Gefühle; Gedanken über früher und später; Schluss mit Wunsch. Benutze Textstellen als Ideen, aber schreibe eigene Sätze.', rows: 16,
        words: [['Tagebuch', 'Heft, in das man persönliche Gedanken schreibt.'], ['Rückblick', 'Gedanken über das, was passiert ist.'], ['Perspektive', 'Sicht auf eine Sache.']],
        a: ['**Beispiel für eine gute Lösung:**'],
        sol: [['p', '*Donnerstag, 30. November*'], ['p', 'Liebes Tagebuch,'], ['p', 'heute war mein letzter Arbeitstag nach dreißig Jahren. Am Morgen regnete es wieder, und der Bus war zu spät. Der alte Herr mit der grünen Mütze saß auf seinem Platz. Ich habe ihm zugenickt wie immer. Ich wusste, dass es das letzte Mal war.'], ['p', 'Im Lager hatten meine Kollegen eine Feier vorbereitet. Es gab Kuchen, eine Kerze und ein Plakat mit „Danke, Marta“. Ich war so überrascht, dass meine Hände feucht wurden. Ich habe nur wenig gesagt. Aber alle haben gelacht, und ich habe fast geweint.'], ['p', 'Danach bin ich noch einmal mit dem Gabelstapler gefahren. Ich habe ihn Jonas übergeben und ihm gesagt, dass er eine Kurve nicht mag. Eigentlich meinte ich mich selbst: Man soll mich gut behandeln.'], ['p', 'An der Haltestelle hat mir der alte Herr zum ersten Mal die Hand gegeben und mir alles Gute gewünscht. Das war wie ein Geschenk.'], ['p', 'Jetzt fühle ich mich traurig und frei zugleich. Morgen früh muss ich nicht aufstehen. Ich möchte endlich wieder malen und meine Tochter öfter besuchen. Gute Nacht.'], ['p', 'Marta'],
      ['h', 'Bewertungsraster (25 Punkte)'], ['table', ['Bereich', 'Punkte', 'Was bewertet wird'], [['Inhalt und Aufbau', '15', 'Perspektive der Figur durchgehalten (Ich-Form); mindestens drei Ereignisse aus dem Text aufgegriffen; Gefühle und Gedanken sichtbar; Ausblick; Tagebuchform (Datum, Anrede); sinnvolle Absätze; keine bloße Nacherzählung.'], ['Sprache und äußere Form', '10', 'Rechtschreibung und Zeichensetzung (5); Satzbau, Wortwahl (anschaulich, Gefühlswörter), Zeitformen richtig (5).']]]],
        see: ['de-schreibaufgabe', 'de-text']},
    ],
  });

  AP2.exam.part(ID, {
    t: 'Gemeinschaftskunde: Gleichberechtigung, Frauenquote und Mitwirkung (30 Punkte)',
    intro: [['h', 'Handlungssituation'], ['p', 'Die Auszubildende **Mira** arbeitet in einem Kino-Unternehmen mit 180 Beschäftigten. Auf der Betriebsversammlung wird über mehr Frauen in Führungsrollen gesprochen. Es gibt noch keine Betriebsrätin. Mira möchte wissen, was der Staat vorschreibt und wie sie im Betrieb mitwirken kann. Ihr Kollege **Tim** meint: „Eine Quote ist ungerecht, es sollte nur die Leistung zählen.“'],
      ['p', 'Alle Aufgaben sind, wenn nichts anderes steht, in **ganzen Sätzen** zu beantworten.']],
    ctx: [
      ['h', 'Anlage 1: Auszug aus dem Grundgesetz (GG)'],
      ['table', ['Artikel', 'Text'], [
        ['Art. 3 Abs. 2', '„Männer und Frauen sind gleichberechtigt. Der Staat fördert die tatsächliche Durchsetzung der Gleichberechtigung von Frauen und Männern und wirkt auf die Beseitigung bestehender Nachteile hin.“'],
        ['Art. 3 Abs. 3 (Auszug)', '„Niemand darf wegen seines Geschlechtes [...] benachteiligt oder bevorzugt werden.“'],
        ['Art. 9 Abs. 3 (in eigenen Worten)', 'Alle dürfen Vereinigungen bilden, um Arbeits- und Wirtschaftsbedingungen zu wahren und zu fördern, zum Beispiel Gewerkschaften.']]],
      ['h', 'Anlage 2: Zeitungsartikel (für die Prüfung geschrieben)'],
      ['p', '**Frauen in der Führung: Langsam geht es voran**'],
      ['p', 'Berlin. In großen Börsenunternehmen sitzen heute mehr Frauen in Aufsichtsräten als vor zehn Jahren. Für diese Gremien gilt seit 2016 eine feste Quote von 30 Prozent. Für Vorstände gibt es seit 2021 eine Mindestregel: Hat ein Vorstand mehr als drei Mitglieder, muss mindestens eine Frau dabei sein. Kritiker sagen, die Regel gelte nur für wenige Firmen. Befürworter meinen, ohne Druck ändere sich zu wenig. Der unbereinigte Lohnunterschied zwischen Frauen und Männern liegt bei etwa 16 Prozent. Ein Teil davon liegt an Teilzeit und Berufswahl. Etwa 6 Prozent bleiben auch bei gleicher Arbeit und Ausbildung unerklärt. Mehrere Verbände fordern bessere Kinderbetreuung und mehr Lohntransparenz.'],
      ['h', 'Anlage 3: Karikatur (Bildbeschreibung)'],
      ['p', 'Eine Treppe führt nach oben zu einer Tür mit dem Schild „Chefetage“. Auf der Treppe steht eine Frau mit einer Aktentasche. Sie trägt zusätzlich einen schweren Rucksack mit der Aufschrift „Kinder, Haushalt, Teilzeit“. Neben ihr geht ein Mann mit kleinem Rucksack „Karriere“ mühelos die Stufen hinauf. Oben steht ein Herr mit verschränkten Armen und sagt: „Alle haben die gleiche Chance!“'],
      ['h', 'Anlage 4: Schaubild (Beispieldaten, vereinfacht)'],
      ['p', 'Frauenanteil in einem Beispielunternehmen nach Ebene, in Prozent:'],
      ['chart', {kind: 'bar', w: 640, h: 300, labels: ['Auszubildende', 'Sachbearbeitung', 'Teamleitung', 'Abteilungsleitung', 'Geschäftsführung'], series: [{n: 'Frauenanteil in %', d: [52, 48, 33, 18, 0], k: 'accent'}], ymax: 100, yl: 'Prozent', cap: 'Mit jeder höheren Ebene sinkt der Frauenanteil.'}]],
    tasks: [
      {pts: 4, topic: 'Aussagen Artikel', q: '**1.1** Arbeiten Sie **vier zentrale Aussagen** aus dem Zeitungsartikel (Anlage 2) heraus.',
        op: '**Herausarbeiten** heißt: Du suchst die wichtigen Punkte und schreibst sie kurz mit eigenen Worten.',
        hint: 'Quote Aufsichtsrat, Regel Vorstand, Lohnunterschied, Forderungen der Verbände.', rows: 6,
        a: ['Je Aussage 1 Punkt:', '1. Für Aufsichtsräte großer Börsenunternehmen gilt seit 2016 eine feste Frauenquote von 30 %.', '2. Für Vorstände gilt seit 2021: Bei mehr als drei Mitgliedern muss mindestens eine Frau dabei sein.', '3. Kritiker sagen, die Regel gilt nur für wenige Firmen; Befürworter sagen, ohne Druck ändere sich zu wenig.', '4. Der unbereinigte Lohnunterschied beträgt etwa 16 %. Etwa 6 % sind auch bei gleicher Arbeit nicht erklärbar.', '5. Verbände fordern bessere Kinderbetreuung und mehr Lohntransparenz.'], see: ['gk-gleichstellung']},
      {pts: 4, topic: 'Karikatur', q: '**1.2** Beschreiben und deuten Sie die Karikatur (Anlage 3).',
        op: '**Beschreiben**: Was sieht man? **Deuten**: Was will der Zeichner sagen?',
        hint: 'Beschreibe Treppe, Frau, Mann, Herr oben. Deute die Rucksäcke und den Satz oben.', rows: 7,
        a: ['**Beschreibung (2 Punkte):** Auf einer Treppe zur „Chefetage“ gehen eine Frau und ein Mann. Die Frau trägt einen schweren Rucksack „Kinder, Haushalt, Teilzeit“, der Mann nur einen kleinen „Karriere“. Oben sagt ein Herr: „Alle haben die gleiche Chance!“', '**Deutung (2 Punkte):** Die Treppe steht für den Aufstieg im Beruf. Der schwere Rucksack zeigt die Zusatzlast von Frauen (Familie, Haushalt, Teilzeit). Der Herr oben nimmt diese Last nicht wahr. Aussage: Formal gleiche Chancen bedeuten nicht gleiche Bedingungen; Gleichberechtigung ist in der Praxis noch nicht erreicht.'], see: ['gk-gleichstellung', 'gk-methoden']},
      {pts: 4, topic: 'Schaubild', q: '**2.1** Werten Sie das Schaubild (Anlage 4) aus. Nennen Sie **zwei Aussagen** und rechnen Sie dazu.',
        op: '**Auswerten** heißt: Du liest die Zahlen und beschreibst, was sie zeigen. Du nennst Zahlen, Vergleiche oder einen Trend.',
        hint: 'Trend nach oben? Größter Unterschied zwischen zwei Ebenen? Rechne die Differenz.', rows: 6,
        a: ['Je Aussage 2 Punkte, mit Zahl:', '1. Der Frauenanteil sinkt mit jeder Ebene: von 52 % bei den Auszubildenden auf 0 % in der Geschäftsführung.', '2. Der größte Sprung ist von der Teamleitung (33 %) zur Abteilungsleitung (18 %): minus **15 Prozentpunkte**. Von Sachbearbeitung (48 %) zur Teamleitung sind es minus 15 Prozentpunkte, ebenfalls groß. Auszubildende zu Sachbearbeitung: nur minus 4.', 'Fazit: Die Frauen sind bei den Einstiegsebenen stark vertreten, in der Führung fehlen sie.'], see: ['gk-gleichstellung', 'gk-methoden']},
      {pts: 6, topic: 'Quote beurteilen', q: '**2.2** Tim sagt: „Eine Quote ist ungerecht, es sollte nur die Leistung zählen.“ Nehmen Sie Stellung mit **zwei Argumenten** (Anlagen 1 bis 4).',
        op: '**Stellung nehmen** heißt: Du sagst deine Meinung und begründest sie. Mit zwei Argumenten und einem Urteil.',
        hint: 'Pro-Argument: Art. 3 GG, Schaubild. Kontra-Argument: Leistung, Qualifikation. Schluss: eigenes Urteil.', rows: 10,
        words: [['Quote', 'Feste Zahl oder Anteil.'], ['qualifiziert', 'Gut ausgebildet und geeignet.']],
        a: ['Mögliche Lösung (je Argument 2 Punkte, Urteil 2 Punkte):', '**Pro Quote:** (1) Art. 3 Abs. 2 GG verpflichtet den Staat, tatsächliche Gleichberechtigung durchzusetzen und Nachteile zu beseitigen. Das Schaubild zeigt: Frauen sind bei den Azubis zu 52 % vertreten, in der Geschäftsführung zu 0 %. Das liegt nicht nur an Leistung. (2) Ohne Druck ändert sich zu wenig, wie der Artikel sagt.', '**Contra Quote:** (1) Nach Art. 3 Abs. 3 GG darf niemand wegen des Geschlechts bevorzugt werden. Eine Quote kann also auch ungerecht wirken. (2) Es könnte weniger qualifizierte Personen in Führungspositionen geben.', '**Urteil:** Für große Firmen ist eine Quote sinnvoll, weil sie Nachteile ausgleicht. Wichtig bleibt: Qualifikation entscheidet bei gleicher Eignung. Zusätzlich helfen Kinderbetreuung und Lohntransparenz.'], see: ['gk-gleichstellung', 'gk-grundordnung']},
      {pts: 6, topic: 'Mitwirkung Betriebsrat', q: '**3** Mira möchte sich im Betrieb für mehr Gleichstellung einsetzen. Es gibt noch keinen Betriebsrat. Erklären Sie **zwei Möglichkeiten**, wie die Beschäftigten Mitbestimmung im Betrieb erreichen können.',
        op: '**Erklären** heißt: sagen, was es ist und wie es funktioniert.',
        hint: 'Gedanke: Betriebsratswahl einleiten, Gewerkschaft, Jugend- und Auszubildendenvertretung, Betriebsversammlung, Gespräch mit der Chefin.', rows: 9,
        words: [['Jugend- und Auszubildendenvertretung', 'Vertretung der unter 18-Jährigen und der Azubis unter 25. Sie gibt es in Betrieben mit mindestens fünf Jugendlichen/Azubis.'], ['Betriebsversammlung', 'Treffen aller Beschäftigten, bei dem der Betriebsrat berichtet.']],
        a: ['Je Möglichkeit mit Erklärung 3 Punkte:', '1. **Betriebsrat gründen:** In Betrieben mit mindestens fünf wahlberechtigten Arbeitnehmern kann ein Betriebsrat gewählt werden (BetrVG). Drei Beschäftigte oder eine Gewerkschaft können zu einer Wahlversammlung einladen. Der Betriebsrat hat Mitbestimmungsrechte, zum Beispiel bei Einstellung, Arbeitszeit und Gleichstellungsfragen.', '2. **Gewerkschaft einbinden:** Art. 9 Abs. 3 GG erlaubt Vereinigungen für bessere Arbeitsbedingungen. Die Gewerkschaft berät bei der Wahl und kann Tarifverträge zu Gleichstellung aushandeln.', '3. (Alternativ) **JAV wählen** oder Wünsche in der Betriebsversammlung vortragen.'], see: ['gk-mitwirkung', 'wiso-betriebsrat']},
      {pts: 6, topic: 'Nachricht an Tim', q: '**4** Verfassen Sie eine **Nachricht an Tim**, in der Sie ihm erklären, warum Gleichberechtigung auch für den Betrieb vorteilhaft ist. Nennen Sie **zwei Vorteile**.',
        op: '**Verfassen** heißt: eigener Text für die Situation, hier eine kurze, freundliche Nachricht.',
        hint: 'Anrede, zwei Vorteile mit Beispiel (z. B. mehr Fachkräfte, besseres Betriebsklima, bessere Entscheidungen), Gruß.', rows: 8,
        a: ['Beispiel: „Hallo Tim, ich verstehe, dass dir Leistung wichtig ist. Mir auch! Gleichberechtigung hilft aber genau dabei. Erstens findet die Firma mehr gute **Fachkräfte**, wenn Frauen und Männer die gleichen Chancen haben. Zweitens treffen gemischte Teams oft **bessere Entscheidungen**, weil sie verschiedene Erfahrungen haben. Außerdem steigt die Zufriedenheit im Betrieb. Lass uns bei der Betriebsversammlung darüber sprechen. Viele Grüße, Mira“', 'Bewertung: Je Vorteil mit Erklärung 2 Punkte; Adressat/Ton/Form 1 Punkt; Sprache 1 Punkt.'], see: ['gk-gleichstellung', 'gk-mitwirkung']},
    ],
  });
  AP2.exam.end(ID);
})();
