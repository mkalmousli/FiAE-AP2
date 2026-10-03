AP2.page('wiso-kv', {
  b: 'wiso', g: 'Sozialversicherung', t: 'Krankenversicherung: gesetzlich und privat',
  d: 'In Deutschland besteht **Krankenversicherungspflicht** für alle. Die **gesetzliche Krankenversicherung (GKV)** versichert **Arbeitnehmer bis zur Versicherungspflichtgrenze** nach dem **Solidarprinzip**: **einkommensabhängiger Beitrag**, **gleiche Leistungen**, **Familienversicherung** beitragsfrei. Die **private Krankenversicherung (PKV)** ist für **Beamte, Selbstständige und Besserverdiener** nach dem **Äquivalenzprinzip**: **risikoabhängiger Beitrag** (Alter, Gesundheit, Tarif) und **Kapitaldeckung**.',
  m: '**GKV = Solidarprinzip: Beitrag nach Einkommen, Leistung für alle gleich, Familie mitversichert.** **PKV = Äquivalenzprinzip: Beitrag nach Risiko und Leistung, jeder Einzelne versichert (Kinder extra).** GKV: **Sachleistung**, PKV: **Kostenerstattung** (Rechnung selbst einreichen).',
  cheat: [
    ['GKV', ['Pflicht für **Arbeitnehmer bis 77.400 Euro** (2026) Jahresverdienst', 'Beitrag: **14,6 % + Zusatzbeitrag**, je Hälfte', '**Familienversicherung** (Ehepartner, Kinder ohne eigenes Einkommen)', '**Sachleistungsprinzip**, Leistungskatalog gesetzlich', 'Etwa **95 Krankenkassen** (AOK, TK, Barmer ...), freie **Kassenwahl**']],
    ['PKV', ['Für **Beamte** (mit Beihilfe), **Selbstständige**, **Besserverdiener**', 'Beitrag nach **Alter, Gesundheitszustand, Leistungsumfang**', '**Kapitaldeckung** (Altersrückstellungen)', '**Kostenerstattungsprinzip**', 'Jede Person braucht **eigenen Vertrag**']],
    ['Leistungen GKV', ['Ärztliche Behandlung, Krankenhaus, **Arznei- und Hilfsmittel**', '**Vorsorge**, Impfungen, Mutterschaft', '**Krankengeld** ab 7. Woche', 'Zahnersatz: **Festzuschuss**', '**Zuzahlungen** (10 %, mind. 5, max. 10 Euro je Mittel)']],
    ['Wechsel', ['GKV zu PKV: nur wenn **über der Versicherungspflichtgrenze** (3 Jahre in Folge), **selbstständig** oder **Beamter**', 'PKV zurück zur GKV: **stark eingeschränkt** (ab 55 praktisch nicht)', 'Kassenwechsel in der GKV: **nach 12 Monaten**, Kündigung 2 Monate']],
  ],
  blocks: [
    ['h', 'Krankenversicherungspflicht'],
    ['p', 'Seit **2009** muss **jeder Einwohner Deutschlands krankenversichert** sein. Wer **gesetzlich pflichtversichert** ist, hat keine Wahl: **Arbeitnehmer** mit einem Verdienst **bis zur Versicherungspflichtgrenze**, **Auszubildende**, Rentner, Studierende, Arbeitslose (ALG I), Landwirte, Künstler. Wer **darüber** verdient, **Beamter** oder **Selbstständiger** ist, kann sich **privat oder freiwillig gesetzlich** versichern.'],
    ['table', ['Merkmal', 'Gesetzliche KV (GKV)', 'Private KV (PKV)'], [
      ['Prinzip', '**Solidarprinzip**', '**Äquivalenzprinzip** (Beitrag nach Risiko und Leistung)'],
      ['Beitrag', '**Einkommensabhängig** (14,6 % + Zusatzbeitrag vom Brutto bis BBG), AG zahlt die **Hälfte**', '**Risikoabhängig**: Eintrittsalter, Gesundheitszustand, Tarif; AG-Zuschuss bis zum Höchstbetrag (Hälfte des GKV-Betrags)'],
      ['Familienmitglieder', '**Kostenlos mitversichert** (Familienversicherung)', 'Jedes Mitglied **eigener Beitrag** (auch Kinder)'],
      ['Leistungen', 'Gesetzlich **einheitlicher Leistungskatalog**', '**Vertraglich** vereinbart (Tarif), oft umfangreicher (Einbettzimmer, Chefarzt, Zahnersatz)'],
      ['Abrechnung', '**Sachleistung**: Karte vorlegen, Arzt rechnet mit der Kasse ab', '**Kostenerstattung**: Patient erhält Rechnung, reicht sie bei der Versicherung ein'],
      ['Finanzierung', '**Umlageverfahren** (laufende Beiträge)', '**Kapitaldeckung** (Altersrückstellungen)'],
      ['Wer versichert?', 'Pflichtversicherte (Arbeitnehmer bis 77.400 Euro), freiwillig Versicherte', 'Beamte, Selbstständige, Besserverdiener, Freiberufler'],
      ['Gesundheitsprüfung', '**Nein**', '**Ja** (Vorerkrankungen: Zuschlag, Ausschluss, Ablehnung)'],
      ['Wechsel', 'Zwischen Kassen einfach', 'Zurück zur GKV im Alter kaum möglich'],
    ]],
    ['procon', 'GKV oder PKV für Berufseinsteiger (Arbeitnehmer unter der Versicherungspflichtgrenze)', ['**GKV:** Pflicht, solidarisch, Familienversicherung, kein Gesundheitsrisiko-Zuschlag, Beitrag bleibt am Einkommen orientiert', '**PKV (für Berechtigte):** oft bessere Leistungen, kürzere Wartezeiten bei Fachärzten, Beitragsrückerstattung bei gesunden Versicherten'], ['**GKV:** Leistungen gesetzlich begrenzt, Zuzahlungen, Beitrag steigt mit dem Einkommen', '**PKV:** Beiträge steigen im Alter stark, **kein Rückweg**, jede Person extra, Vorerkrankungen verteuern, Vorleistung (Rechnungen)']],
  ],
});
