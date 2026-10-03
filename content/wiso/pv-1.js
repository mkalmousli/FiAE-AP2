AP2.page('wiso-pv', {
  b: 'wiso', g: 'Sozialversicherung', t: 'Pflegeversicherung',
  d: 'Die **soziale Pflegeversicherung (SGB XI, seit 1995)** sichert das Risiko der **Pflegebedürftigkeit** ab. Sie ist an die **Krankenversicherung gekoppelt** (**Pflegekasse bei der Krankenkasse**), der Beitrag beträgt **3,6 %** (je 1,8 %; **Kinderlose** zahlen als Arbeitnehmer **0,6 %** mehr). Der Pflegebedarf wird in **fünf Pflegegraden** eingestuft. Leistungen: **Pflegegeld**, **Pflegesachleistungen**, **teilstationäre und vollstationäre Pflege**. Sie ist eine **Teilkaskoversicherung**: Sie deckt nur **einen Teil** der Kosten.',
  m: '**Pflegegrad 1 bis 5** (1 gering, 5 schwerste). **Pflegegeld = Angehörige pflegen zu Hause (Geld an Pflegebedürftige), Sachleistung = Pflegedienst kommt (Kasse zahlt Dienst), vollstationär = Pflegeheim.** Pflegeversicherung folgt der **Krankenversicherung**: GKV Versicherte in der sozialen PV, PKV Versicherte in der **privaten PV**. **Teilkasko**: Eigenanteil bleibt.',
  cheat: [
    ['Grundlagen', ['**Beitrag 3,6 %**, je **1,8 %** (AN-Kinderlosenzuschlag **0,6 %**)', '**Pflegekasse** bei der Krankenkasse', '**Pflegegrade 1 bis 5**', '**Begutachtung** durch den **Medizinischen Dienst (MD)**', '**Teilkasko**: Eigenanteil bleibt']],
    ['Leistungsarten', ['**Pflegegeld:** Pflege zu Hause durch **Angehörige**', '**Pflegesachleistung:** **ambulanter Pflegedienst**', '**Kombinationsleistung**', '**Teilstationär:** Tages-/Nachtpflege', '**Vollstationär:** Pflegeheim (Zuschuss)', '**Pflegehilfsmittel**, Umbau Wohnung']],
    ['Pflegegrade', ['**1:** geringe Beeinträchtigung', '**2:** erhebliche', '**3:** schwere', '**4:** schwerste', '**5:** schwerste mit besonderen Anforderungen']],
    ['Unterstützung der Pflege', ['**Rentenversicherung** für pflegende Angehörige', '**Unfallversicherung** für Pflegepersonen', '**Pflegezeit** (bis 6 Monate unbezahlt), **Familienpflegezeit**', '**Kurzzeitpflege, Verhinderungspflege**']],
  ],
  blocks: [
    ['h', 'Warum eine Pflegeversicherung?'],
    ['p', 'Pflege ist **teuer** und trifft viele Menschen im Alter. Früher mussten Betroffene oft **Sozialhilfe** beantragen. Deshalb wurde 1995 als **jüngster Zweig** die **Pflegeversicherung** eingeführt. Wer **gesetzlich krankenversichert** ist, ist automatisch in der **sozialen Pflegeversicherung** versichert, wer **privat krankenversichert** ist, in der **privaten Pflegepflichtversicherung**. Sie leistet aber nur einen **Zuschuss (Teilkasko)**: Den Rest zahlen Pflegebedürftige oder Angehörige (**Eigenanteil**).'],
    ['table', ['Pflegegrad', 'Beeinträchtigung der Selbstständigkeit', 'Punkte (Gutachten)', 'Pflegegeld pro Monat (2025/2026, Stand prüfen)'], [
      ['**1**', 'Geringe Beeinträchtigung', '12,5 bis unter 27', 'kein Pflegegeld (Entlastungsbetrag 131 Euro)'],
      ['**2**', 'Erhebliche Beeinträchtigung', '27 bis unter 47,5', '**347 Euro**'],
      ['**3**', 'Schwere Beeinträchtigung', '47,5 bis unter 70', '**599 Euro**'],
      ['**4**', 'Schwerste Beeinträchtigung', '70 bis unter 90', '**800 Euro**'],
      ['**5**', 'Schwerste Beeinträchtigung mit besonderen Anforderungen an die pflegerische Versorgung', '90 bis 100', '**990 Euro**'],
    ]],
    ['kv', [
      ['Begutachtung', 'Auf **Antrag** bei der Pflegekasse prüft der **Medizinische Dienst (MD)** (bei Privatversicherten MEDICPROOF) in **sechs Bereichen** (Mobilität, kognitive und kommunikative Fähigkeiten, Verhaltensweisen, Selbstversorgung, Umgang mit Krankheit, Gestaltung des Alltags) die **Selbstständigkeit**. Daraus ergibt sich der Pflegegrad.'],
      ['Pflegegeld (§ 37)', 'Geld an den **Pflegebedürftigen**, wenn er **zu Hause** von Angehörigen oder Bekannten gepflegt wird. Verpflichtende **Beratungsbesuche** durch Pflegedienste.'],
      ['Pflegesachleistung (§ 36)', 'Die Kasse zahlt einen **ambulanten Pflegedienst** direkt (höherer Betrag als Pflegegeld, **Grad 2: 796 Euro**, 3: 1.497, 4: 1.859, 5: 2.299 Euro, Stand 2025).'],
      ['Kombinationsleistung', '**Anteilig** beides, wenn der Sachleistungsbetrag nicht ausgeschöpft wird.'],
      ['Teilstationär und Kurzzeitpflege', '**Tages-/Nachtpflege** (Betreuung tagsüber), **Kurzzeitpflege** (befristet im Heim), **Verhinderungspflege** (wenn Pflegeperson ausfällt), gemeinsamer Jahresbetrag.'],
      ['Vollstationäre Pflege', 'Im **Pflegeheim** zahlt die Kasse einen **pauschalen Zuschuss** je Pflegegrad. **Unterkunft, Verpflegung, Investitionskosten** und den **Eigenanteil** trägt der Bewohner. Es gibt einen **Leistungszuschlag** je Aufenthaltsdauer.'],
    ]],
  ],
});
