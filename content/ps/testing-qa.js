// Testen und Qualitaetssicherung
(function() {
  const page = {
    id: 'ps-testing-qa', block: 'ps', titel: 'Testen und QA',
    definition: 'Testing ist die Kontrolle, ob ein Produkt die Anforderungen erfuellt (Verifikation = Was war geplant?, Validierung = Passt es zum Benutzer?). Testarten sind Modul-, Integrations-, System-, Abnahmetest. Testfallermittlung nutzt Äquivalenzklassen und Grenzwertanalyse.',
    merksatz: 'VISA: Verifikation/Validierung, Integrations-, System-, Abnahmetest',
    abschnitte: [
      {typ: 'heading', text: 'Testarten'},
      {typ: 'list', items: [
        'Modultest: einzelne Komponente testen',
        'Integrationstest: mehrere Module zusammen',
        'Systemtest: ganzes System gegen Anforderungen',
        'Abnahmetest: Kunde akzeptiert Produkt',
      ]},
      {typ: 'heading', text: 'Testfallermittlung'},
      {typ: 'list', items: [
        'Äquivalenzklassen: Input-Bereich in Klassen einteilen',
        'Grenzwertanalyse: Grenzen testen (0, 1, n, n-1, n+1)',
        'Pfadabdeckung: jeder Code-Weg mindestens 1x',
      ]},
      {typ: 'text', inhalt: 'Verifikation: haben wir das richtig gemacht? Validierung: haben wir das Richtige gemacht?'},
    ]
  };
  AP2.store.register('ps-testing-qa', page);
})();
