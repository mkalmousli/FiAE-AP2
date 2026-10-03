AP2.page('ps-vertraege', {
  b: 'ps', g: 'Recht und Datenschutz', t: 'Vertragsarten: Werkvertrag und Dienstvertrag',
  d: 'Beim **Werkvertrag** (§ 631 BGB) schuldet der Unternehmer einen **Erfolg** (ein fertiges Werk), zum Beispiel eine funktionierende Software. Beim **Dienstvertrag** (§ 611 BGB) schuldet der Dienstleister nur die **Tätigkeit**, nicht den Erfolg, zum Beispiel Beratung oder Entwicklerstunden. Der Unterschied bestimmt **Abnahme, Gewährleistung und Haftung**.',
  m: '**Werkvertrag = Werk (Ergebnis) = Erfolg geschuldet = Abnahme.** **Dienstvertrag = Dienst (Tätigkeit) = Bemühen geschuldet = keine Abnahme.** Frage: "Wird ein **Ergebnis** oder **Arbeitszeit** bezahlt?"',
  cheat: [
    ['Werkvertrag (§ 631 BGB)', ['**Erfolg** geschuldet', 'Vergütung nach **Abnahme**', '**Gewährleistung** bei Mängeln', 'Typisch: Individualsoftware nach Pflichtenheft, Festpreis']],
    ['Dienstvertrag (§ 611 BGB)', ['**Tätigkeit** geschuldet', 'Vergütung nach **Zeit** (Stundensatz)', 'Keine Abnahme, keine Gewährleistung wie beim Werk', 'Typisch: Beratung, Entwicklerüberlassung, Support']],
    ['Kaufvertrag (§ 433 BGB)', ['Standardsoftware, dauerhaft überlassen', 'Gewährleistung wie Kaufrecht', '**Werklieferung:** Herstellung plus Lieferung']],
    ['Mietvertrag (§ 535 BGB)', ['Software **auf Zeit** (Lizenz-Abo, **SaaS**, Cloud)', 'Vermieter muss Gebrauch **erhalten**', 'Mängel mindern die Miete']],
  ],
  blocks: [
    ['h', 'Warum sind Vertragsarten wichtig?'],
    ['p', 'Bei jedem IT-Auftrag wird ein Vertrag geschlossen: Der Kunde bestellt, der Entwickler liefert. **Welche Vertragsart** vorliegt, bestimmt, **wer das Risiko trägt**. Wird die Software fehlerhaft, kann der Kunde beim Werkvertrag Nachbesserung verlangen. Beim Dienstvertrag nicht, solange der Dienstleister sorgfältig gearbeitet hat. Die Vertragsart folgt nicht dem Namen im Vertrag, sondern dem **Inhalt**.'],
    ['h', 'Werkvertrag und Dienstvertrag im Vergleich'],
    ['table', ['Merkmal', 'Werkvertrag (§ 631 BGB)', 'Dienstvertrag (§ 611 BGB)'], [
      ['Geschuldet wird', 'Ein **Erfolg**: das vereinbarte Werk', 'Eine **Tätigkeit** (Dienst)'],
      ['Beispiel', 'Entwicklung eines Webshops nach Pflichtenheft', 'Beratung zur Systemauswahl, Entwickler "pro Stunde"'],
      ['Vergütung', 'Meist **Festpreis**, fällig nach **Abnahme**', 'Nach **Zeit** (Stundensatz, Tagessatz), laufend'],
      ['Abnahme', 'Ja, entscheidend', 'Nein'],
      ['Mängel', '**Gewährleistung**: Nacherfüllung, Minderung, Rücktritt, Schadensersatz', 'Keine Gewährleistung für das Ergebnis; Haftung für Pflichtverletzung'],
      ['Verjährung der Mängelansprüche', 'Meist **2 Jahre** ab Abnahme', 'Allgemeine Verjährung (3 Jahre)'],
      ['Risiko', 'Beim **Unternehmer** (Ergebnis)', 'Beim **Auftraggeber**'],
      ['Kündigung', 'Auftraggeber jederzeit bis zur Fertigstellung (Vergütung für geleistete Arbeit)', 'Nach Kündigungsfristen des Vertrags oder Gesetzes'],
    ]],
    ['diagram', {w: 720, h: 230, cap: 'Die Entscheidung: Wird ein Ergebnis geschuldet oder nur Arbeit?', nodes: [
      {id: 'q', k: 'diamond', x: 360, y: 55, t: ['Wird ein vereinbartes', 'Ergebnis geschuldet?'], w: 270, h: 90, s: 'accent'}, {id: 'w', k: 'round', x: 130, y: 180, t: ['Werkvertrag', 'Abnahme, Gewährleistung'], w: 210, h: 56, s: 'solid'}, {id: 'd', k: 'round', x: 590, y: 180, t: ['Dienstvertrag', 'Zeit, keine Abnahme'], w: 210, h: 56, s: 'soft'},
    ], edges: [{a: 'q', b: 'w', t: 'Ja'}, {a: 'q', b: 'd', t: 'Nein'}]}],
    ['h', 'Mängelrechte beim Werkvertrag (§ 634 BGB)'],
    ['steps', ['**Nacherfüllung:** Der Unternehmer beseitigt den Mangel (Nachbesserung) oder liefert neu. Er hat in der Regel das Recht auf Nachbesserung zuerst.', '**Selbstvornahme:** Setzt der Kunde eine angemessene Frist, die ergebnislos verstreicht, darf er den Mangel selbst beseitigen lassen und die Kosten verlangen.', '**Minderung:** Der Preis wird herabgesetzt.', '**Rücktritt:** Der Kunde macht den Vertrag rückgängig (bei erheblichen Mängeln).', '**Schadensersatz:** Bei Verschulden des Unternehmers.']],
    ['h', 'Weitere Vertragsarten in der IT'],
    ['table', ['Vertragsart', 'Typischer Fall', 'Bemerkung'], [
      ['**Kaufvertrag** (§ 433)', 'Standardsoftware wird auf Dauer überlassen (Kauflizenz, Datenträger)', 'Gewährleistung wie bei Kaufsachen'],
      ['**Werklieferungsvertrag** (§ 650)', 'Hersteller stellt ein Produkt her und liefert es (zum Beispiel PC nach Maß)', 'Kaufrecht mit Elementen des Werkvertrags'],
      ['**Mietvertrag** (§ 535)', 'Cloud-Software (SaaS), Hosting, zeitlich begrenzte Lizenz', 'Software wird laufend zur Nutzung überlassen'],
      ['**Wartungs- und Pflegevertrag**', 'Fehlerbehebung, Updates, Support', 'Meist Dienstvertrag oder Werkvertrag, je nach Inhalt'],
      ['**Agile Entwicklung**', 'Sprints nach Aufwand', 'Meist Dienstvertrag, da kein festes Ergebnis geschuldet wird'],
    ]],
  ],
});
