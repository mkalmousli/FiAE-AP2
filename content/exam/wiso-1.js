AP2.page('exam1-wiso', {b: 'exam', g: 'Probeprüfung 1', t: 'Wirtschafts- und Sozialkunde', blocks: []});
AP2.exam.start('exam1-wiso', {minutes: 60, hint: 'Bearbeitungszeit 60 Minuten, 100 Punkte. Beantworte die Aufgaben in vollständigen Stichpunkten oder Sätzen. Rechenaufgaben mit Rechenweg. Richtwert: ein Punkt entspricht etwa einer halben Minute. Gesetzesangaben und Zahlen nach Stand 2026 (Beitragssätze und Grenzen jährlich prüfen). Ausgangslage: Du bist Auszubildender zum Fachinformatiker bei der FitPlan Software GmbH.'});
AP2.exam.part('exam1-wiso', {
  t: 'Aufgabengruppe 1: Ausbildung und Arbeitsrecht (25 Punkte)',
  tasks: [
    {pts: 4, q: 'Nennen Sie je zwei Pflichten des Auszubildenden und des Ausbildenden nach dem Berufsbildungsgesetz (BBiG).',
      a: ['- **Auszubildender (§ 13):** Lernpflicht, Berufsschul- und Prüfungsteilnahme, Weisungen befolgen, Betriebsordnung beachten, Berichtsheft führen, Verschwiegenheit, sorgfältiger Umgang mit Arbeitsmitteln.', '- **Ausbildender (§ 14):** Ausbildungsinhalte vermitteln (Ausbildungsplan, geeignete Ausbilder), kostenlose Ausbildungsmittel, Freistellung für Berufsschule/Prüfung, Führung des Berichtshefts kontrollieren, nur ausbildungsbezogene Aufgaben, Zeugnis.']},
    {pts: 4, q: 'a) Wie lang darf die Probezeit im Ausbildungsverhältnis sein? b) Unter welchen Bedingungen kann während der Probezeit gekündigt werden, und wie nach der Probezeit?',
      a: ['a) mindestens **1 Monat**, höchstens **4 Monate**.', 'b) In der Probezeit von **beiden Seiten jederzeit ohne Frist und ohne Angabe von Gründen**, **schriftlich**. Nach der Probezeit durch den Ausbildenden **nur aus wichtigem Grund** (fristlos); der Auszubildende kann mit **4 Wochen Frist** kündigen, wenn er die Ausbildung aufgeben oder wechseln will.']},
    {pts: 3, q: 'Ein Beschäftigter arbeitet 4 Tage pro Woche. Berechnen Sie seinen gesetzlichen Mindesturlaub (Bundesurlaubsgesetz) in Arbeitstagen.',
      a: ['Mindesturlaub: **24 Werktage** bei 6-Tage-Woche (= 4 Wochen). Umrechnung: 24 mal 4 / 6 = **16 Arbeitstage**.']},
    {pts: 4, q: 'Dem Mitarbeiter Meier (Betriebszugehörigkeit 6 Jahre) wird ordentlich gekündigt. Das Kündigungsschreiben geht ihm am 12. März zu. Wann endet das Arbeitsverhältnis frühestens (gesetzliche Frist)? Geben Sie die Frist und den Zeitpunkt an.',
      a: ['Nach § 622 BGB verlängert sich die Frist für den **Arbeitgeber** bei **5 Jahren** auf **2 Monate zum Monatsende**. Zugang 12. März plus 2 Monate = 12. Mai, Ende zum Monatsende: **31. Mai**.']},
    {pts: 4, q: 'Unter welchen Voraussetzungen gilt das Kündigungsschutzgesetz, und innerhalb welcher Frist muss ein Arbeitnehmer gegen eine Kündigung klagen?',
      a: ['- Betrieb mit **mehr als 10 Arbeitnehmern** (Teilzeit anteilig) und Arbeitsverhältnis **länger als 6 Monate** (Wartezeit).', '- Klage (Kündigungsschutzklage) beim **Arbeitsgericht innerhalb von 3 Wochen** nach Zugang der Kündigung, sonst gilt sie als wirksam.']},
    {pts: 3, q: 'Nennen Sie drei Pflichtangaben, die der Ausbildungsvertrag enthalten muss.',
      a: ['Beispiele (§ 11 BBiG): Art, sachliche und zeitliche Gliederung der Ausbildung, Beginn und Dauer, Ausbildungsstätte, tägliche Arbeitszeit, Probezeit, Vergütung und Zahlungszeit, Urlaub, Kündigungsvoraussetzungen, Hinweis auf Tarifverträge/Betriebsvereinbarungen. Drei genügen.']},
    {pts: 3, q: 'Welche Arten von Arbeitszeugnissen gibt es und worin unterscheiden sie sich?',
      a: ['- **Einfaches Zeugnis:** nur Angaben zu **Art und Dauer** der Tätigkeit.', '- **Qualifiziertes Zeugnis:** zusätzlich **Leistung und Verhalten**; es muss **wohlwollend** und **wahr** sein. Das qualifizierte Zeugnis gibt es nur auf Verlangen.']},
  ],
});
AP2.exam.part('exam1-wiso', {
  t: 'Aufgabengruppe 2: Mitbestimmung und Tarifrecht (15 Punkte)',
  tasks: [
    {pts: 3, q: 'Ab wie vielen Beschäftigten kann ein Betriebsrat gewählt werden und wie lange dauert die Amtszeit?',
      a: ['Ab **5 ständigen wahlberechtigten Arbeitnehmern**, von denen **3 wählbar** sind. Wahl alle **4 Jahre**.']},
    {pts: 3, q: 'Nennen Sie drei Angelegenheiten, in denen der Betriebsrat nach dem BetrVG mitbestimmen darf.',
      a: ['Beispiele (§ 87): Beginn und Ende der täglichen Arbeitszeit, Urlaubsgrundsätze, Einführung technischer Einrichtungen zur Leistungs-/Verhaltenskontrolle, Ordnung im Betrieb, Entlohnungsgrundsätze, Arbeitsschutz. Drei genügen.']},
    {pts: 3, q: 'Wer wählt die Jugend- und Auszubildendenvertretung (JAV) und wer kann gewählt werden?',
      a: ['Wahlberechtigt sind alle Arbeitnehmer **unter 18 Jahren** und alle **Auszubildenden unter 25 Jahren**. Wählbar sind Arbeitnehmer **bis 25 Jahre**. Voraussetzung: Es gibt einen **Betriebsrat** und mindestens **5** wahlberechtigte Jugendliche/Azubis.']},
    {pts: 3, q: 'Erklären Sie den Begriff Tarifautonomie und nennen Sie die Tarifvertragsparteien.',
      a: ['**Tarifautonomie** (Art. 9 Abs. 3 GG): Gewerkschaften und Arbeitgeber(verbände) handeln Löhne und Arbeitsbedingungen **ohne staatlichen Eingriff** frei aus. Parteien: **Gewerkschaft** (zum Beispiel IG Metall, ver.di) und **Arbeitgeberverband** oder einzelner Arbeitgeber (Haustarif).']},
    {pts: 3, q: 'Worin unterscheiden sich Tarifvertrag und Betriebsvereinbarung?',
      a: ['**Tarifvertrag:** zwischen **Gewerkschaft und Arbeitgeber(verband)**, gilt branchen- oder firmenweit, Mindeststandard. **Betriebsvereinbarung:** zwischen **Betriebsrat und Arbeitgeber**, gilt nur im **Betrieb**; sie darf Tarifregelungen **nicht unterschreiten** (Tarifvorrang) und wird zum Beispiel für Arbeitszeitmodelle genutzt.']},
  ],
});
