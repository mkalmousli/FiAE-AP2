AP2.page('infra-isms', {
  b: 'infra', g: 'IT-Sicherheit', t: 'ISMS, ISO 27001 und der PDCA-Zyklus',
  d: 'Ein **ISMS** (Informationssicherheits-Managementsystem) ist ein **systematischer, dokumentierter Rahmen**, mit dem eine Organisation Informationssicherheit **plant, umsetzt, überwacht und verbessert**. Der internationale Standard dafür ist **ISO/IEC 27001** (zertifizierbar). Der Verbesserungsprozess folgt dem **PDCA-Zyklus**: Plan - Do - Check - Act.',
  m: '**PDCA = Plan (planen), Do (umsetzen), Check (prüfen), Act (verbessern)**, danach wieder von vorn: ein **Kreislauf**, kein einmaliges Projekt. **ISO 27001 = Anforderungen an das ISMS (zertifizierbar), ISO 27002 = Katalog der Maßnahmen.** In Deutschland zusätzlich: **BSI IT-Grundschutz**.',
  cheat: [
    ['PDCA (Deming-Kreis)', ['**Plan:** Ziele, Risikoanalyse, Maßnahmen planen', '**Do:** Maßnahmen umsetzen, Mitarbeiter schulen', '**Check:** Wirksamkeit prüfen (Audit, Kennzahlen)', '**Act:** Verbesserungen und Korrekturen einleiten']],
    ['Normen und Standards', ['**ISO/IEC 27001:** Anforderungen an ein ISMS, **zertifizierbar**', '**ISO/IEC 27002:** Maßnahmenkatalog (Leitfaden)', '**BSI IT-Grundschutz:** Bausteine, Maßnahmen (Deutschland), kompatibel zu 27001', '**ISO 22301:** Business Continuity']],
    ['Bestandteile eines ISMS', ['**Geltungsbereich**', '**Sicherheitsleitlinie** (Policy), Rollen (ISB)', '**Risikoanalyse** und Risikobehandlung', '**Maßnahmen** (Anhang A), Dokumentation', '**Audits**, Management-Bewertung, kontinuierliche Verbesserung']],
    ['Rollen', ['**Geschäftsführung:** trägt die Verantwortung', '**ISB** (Informationssicherheitsbeauftragter)', '**Datenschutzbeauftragter** (anderes Thema, aber Zusammenarbeit)', 'Alle Mitarbeiter: Sicherheitsbewusstsein']],
  ],
  blocks: [
    ['h', 'Warum ein ISMS?'],
    ['p', 'Einzelne Sicherheitsmaßnahmen reichen nicht, wenn niemand verantwortlich ist, Risiken nicht bekannt sind oder Maßnahmen nach einem Jahr veraltet sind. Ein **ISMS** sorgt dafür, dass Informationssicherheit **zur Chefsache** wird, **planvoll** und **dauerhaft** betrieben wird. Es hilft außerdem, **gesetzliche Anforderungen** (DSGVO, NIS-2, branchenspezifische Vorgaben) nachweislich zu erfüllen und schafft **Vertrauen** bei Kunden (Zertifikat).'],
    ['h', 'Der PDCA-Zyklus'],
    ['diagram', AP2.dg.cycle(['Plan: Risiken analysieren, Ziele und Maßnahmen planen', 'Do: Maßnahmen umsetzen, schulen, betreiben', 'Check: Audits, Kennzahlen, Vorfälle auswerten', 'Act: Mängel beheben, ISMS verbessern'], {w: 780, h: 360, rx: 280, ry: 120, nh: 56, styles: ['accent', 'accent', 'accent', 'ok'], k: 'round', cap: 'PDCA-Zyklus (Deming-Kreis): ein dauerhafter Kreislauf der ständigen Verbesserung'})],
    ['table', ['Phase', 'Aufgaben im ISMS', 'Beispiel'], [
      ['**Plan** (Planen)', 'Geltungsbereich festlegen, Sicherheitsleitlinie erstellen, **Risikoanalyse** durchführen, Schutzbedarf feststellen, Maßnahmen auswählen', 'Risiko "Ransomware" erkannt, Maßnahme: Offline-Backups und Schulung geplant'],
      ['**Do** (Umsetzen)', 'Maßnahmen einführen, Mitarbeiter schulen, Prozesse leben, dokumentieren', 'Backups eingerichtet, Awareness-Schulung durchgeführt'],
      ['**Check** (Prüfen)', 'Wirksamkeit messen: **interne Audits**, Penetrationstests, Vorfallauswertung, Kennzahlen, Management-Review', 'Restore-Test fehlgeschlagen, Phishing-Test: 15 % klickten'],
      ['**Act** (Handeln)', 'Abweichungen korrigieren, Maßnahmen verbessern, Lehren aus Vorfällen ziehen', 'Backup-Prozess angepasst, Schulung wiederholt, Leitlinie aktualisiert'],
    ]],
    ['h', 'ISO/IEC 27001 und 27002'],
    ['kv', [
      ['ISO/IEC 27001', 'Legt die **Anforderungen** an ein ISMS fest (Kontext, Führung, Planung, Unterstützung, Betrieb, Bewertung, Verbesserung) und enthält in **Anhang A** eine Liste von Maßnahmen (Controls). Ein Unternehmen kann sich von einer **akkreditierten Stelle zertifizieren** lassen (Audit, Zertifikat 3 Jahre gültig mit jährlichen Überwachungsaudits).'],
      ['ISO/IEC 27002', 'Ausführlicher **Leitfaden** zu den Maßnahmen aus Anhang A (Umsetzungshinweise). Nicht zertifizierbar.'],
      ['BSI IT-Grundschutz', 'Methodik des Bundesamts für Sicherheit in der Informationstechnik. Das **IT-Grundschutz-Kompendium** enthält **Bausteine** (zum Beispiel Server, Netz, Cloud) mit Gefährdungen und Anforderungen. **BSI-Standards 200-1, 200-2, 200-3** beschreiben ISMS, Vorgehensweise und Risikoanalyse. Zertifizierung nach ISO 27001 auf Basis von IT-Grundschutz möglich.'],
    ]],
  ],
});
