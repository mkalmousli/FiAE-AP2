AP2.spick('gk', {
  exam: 'Schulprüfung: Gemeinschaftskunde (Berufsschule)', t: 'Spickzettel Gemeinschaftskunde',
  s: 'Grundrechte, Staatsaufbau, Wahlen, Sozialversicherung, Arbeitsrecht, EU, Datenschutz und Wirtschaft auf einer Seite',
  top: [
    ['tip', 'Nenne in Antworten immer den **Artikel oder das Gesetz** (zum Beispiel Art. 1 GG, § 622 BGB) und ein **Beispiel aus dem Betrieb**.'],
    ['mnemo', 'Gewaltenteilung: **Legislative** macht Gesetze, **Exekutive** führt aus, **Judikative** urteilt.'],
  ],
  sections: [
    {t: 'Grundgesetz und Staat', icon: 'book', ids: ['gk-grundrechte', 'gk-grundordnung', 'gk-institutionen', 'gk-rechtsstaat'], items: [
      ['pairs', [
        ['Art. 1', 'Menschenwürde ist **unantastbar**'],
        ['Art. 20', 'Demokratie, Rechtsstaat, Sozialstaat, Bundesstaat, Republik; Widerstandsrecht'],
        ['Art. 79 (3)', '**Ewigkeitsklausel**: Art. 1 und 20 nicht änderbar'],
        ['Bundestag', 'Gesetze, Kanzlerwahl, Haushalt, Kontrolle (4 Jahre, 630 Sitze)'],
        ['Bundesrat', 'Vertretung der Länder; Zustimmung oder Einspruch'],
        ['Bundespräsident', 'Repräsentiert; 5 Jahre; Wahl durch Bundesversammlung'],
        ['BVerfG', 'Prüft Gesetze am Grundgesetz; Verfassungsbeschwerde'],
      ]],
      ['links', ['gk-grundrechte', 'gk-grundordnung', 'gk-institutionen', 'gk-rechtsstaat']],
    ]},
    {t: 'Wahlen und Mitwirkung', icon: 'check', ids: ['gk-wahlen', 'gk-mitwirkung'], items: [
      ['pairs', [
        ['Wahlgrundsätze', '**allgemein, unmittelbar, frei, gleich, geheim**'],
        ['Erststimme', 'Person im Wahlkreis'],
        ['Zweitstimme', 'Partei, entscheidet über Sitzverteilung'],
        ['Sperrklausel', '**5 %** der Zweitstimmen'],
        ['Wahlalter', 'Bund: 18; Europawahl: 16'],
        ['Bürgerbegehren', 'Unterschriften, dann Bürgerentscheid'],
      ]],
      ['links', ['gk-wahlen', 'gk-mitwirkung']],
    ]},
    {t: 'Sozialstaat und Arbeitsrecht', icon: 'briefcase', ids: ['gk-sozialstaat', 'gk-arbeitsrecht', 'wiso-sv'], items: [
      ['li', ['**5 Zweige:** Kranken-, Renten-, Arbeitslosen-, Pflege-, Unfallversicherung', 'Beiträge zahlen **Arbeitnehmer und Arbeitgeber** je etwa zur Hälfte', 'Unfallversicherung zahlt **nur der Arbeitgeber**', '**Beitragsbemessungsgrenze:** darüber keine höheren Beiträge'] ],
      ['pairs', [
        ['Probezeit', 'Bis 6 Monate, Kündigung mit 2 Wochen Frist'],
        ['Grundfrist', '4 Wochen zum 15. oder Monatsende (§ 622 BGB)'],
        ['Urlaub', 'Mindestens 24 Werktage (4 Wochen) bei 6-Tage-Woche'],
        ['Jugendliche', 'Höchstens 8 Stunden pro Tag, 40 pro Woche'],
        ['Kündigungsschutz', 'Ab 6 Monaten Betrieb und mehr als 10 Beschäftigten'],
      ]],
      ['links', ['gk-sozialstaat', 'gk-arbeitsrecht', 'wiso-sv']],
    ]},
    {t: 'EU, Wirtschaft, Umwelt', icon: 'map', ids: ['gk-eu', 'gk-wirtschaft', 'gk-umwelt', 'gk-globalisierung'], items: [
      ['pairs', [
        ['Binnenmarkt', 'Freier Verkehr von Waren, Personen, Dienstleistungen, Kapital'],
        ['Soziale Marktwirtschaft', 'Freier Markt plus soziale Absicherung'],
        ['Magisches Viereck', 'Preisstabilität, Vollbeschäftigung, Wachstum, außenwirtschaftliches Gleichgewicht'],
        ['Inflation', 'Allgemeiner Preisanstieg'],
        ['Pariser Abkommen', 'Erwärmung auf deutlich unter 2 Grad, möglichst 1,5 Grad'],
      ]],
      ['links', ['gk-eu', 'gk-wirtschaft', 'gk-umwelt', 'gk-globalisierung']],
    ]},
    {t: 'Datenschutz, Medien, KI', icon: 'lock', ids: ['gk-datenschutz', 'gk-medien', 'gk-ki'], items: [
      ['pairs', [
        ['DSGVO', 'Rechtmäßigkeit, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität'],
        ['Betroffenenrechte', 'Auskunft, Berichtigung, Löschung, Widerspruch, Übertragbarkeit'],
        ['Meldepflicht', 'Datenpanne innerhalb von **72 Stunden** an die Behörde'],
        ['Filterblase', 'Algorithmus zeigt nur passende Inhalte'],
        ['AI Act', 'Risikostufen: verboten, hoch, begrenzt, minimal'],
      ]],
      ['links', ['gk-datenschutz', 'gk-medien', 'gk-ki']],
    ]},
  ],
});
