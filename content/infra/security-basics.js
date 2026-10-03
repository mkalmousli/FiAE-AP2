// IT-Sicherheit Grundlagen: CIA-Triade
(function() {
  const page = {
    id: 'infra-security-basics', block: 'infra', titel: 'IT-Sicherheit: CIA-Triade',
    definition: 'Die CIA-Triade beschreibt die drei Grundprinzipien der Informationssicherheit: Vertraulichkeit (Confidentiality), Integritaet (Integrity), Verfuegbarkeit (Availability). Sicherheitsmassnamen muessen alle drei Balance beachten.',
    merksatz: 'CIA: Confidentiality (Geheimnis), Integrity (Wahrheit), Availability (Erreichbarkeit)',
    abschnitte: [
      {typ: 'heading', text: 'Vertraulichkeit (Confidentiality)'},
      {typ: 'text', inhalt: 'Schutz vor unautorisierten Zugriffen auf Daten. Massnahmen: Verschluesselung, Zugriffskontrolle, Authentifizierung.'},
      {typ: 'heading', text: 'Integritaet (Integrity)'},
      {typ: 'text', inhalt: 'Sicherstellen, dass Daten vollstaendig und unveraendert sind. Massnahmen: Digitale Signaturen, Hashes, Checksummen.'},
      {typ: 'heading', text: 'Verfuegbarkeit (Availability)'},
      {typ: 'text', inhalt: 'Daten und Systeme sind jederzeit fuer berechtigte Nutzer erreichbar. Massnahmen: Redundanz, Backups, DDoS-Schutz, Monitoring.'},
    ]
  };
  AP2.store.register('infra-security-basics', page);
})();
