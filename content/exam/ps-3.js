AP2.exam.part('exam1-ps', {
  t: 'Handlungsschritt 3: Datenmodell entwerfen (20 Punkte)',
  tasks: [
    {pts: 7, rows: 7, q: 'Leiten Sie aus dem Modell (Kurs 1:n Termin, Mitglied n:m Termin) ein relationales Modell ab. Geben Sie die Tabellen mit Attributen, Primär- (PK) und Fremdschlüsseln (FK) an. Attribute: Kurs (kursnr, titel), Termin (terminnr, datum, uhrzeit, plaetze), Mitglied (mitgliedsnr, name, email).',
      a: ['- **Kurs**(**kursnr** PK, titel)', '- **Termin**(**terminnr** PK, datum, uhrzeit, plaetze, **kursnr** FK auf Kurs): 1:n, der Fremdschlüssel steht auf der n-Seite.', '- **Mitglied**(**mitgliedsnr** PK, name, email)', '- **Buchung**(**mitgliedsnr** FK, **terminnr** FK, bucht_am): n:m wird zur **Zwischentabelle**; PK ist die Kombination (mitgliedsnr, terminnr).', 'Punkte: 1 je Tabelle (4), 1 für n:m-Auflösung, 2 für richtige Fremdschlüssel.']},
    {pts: 7, rows: 7, q: 'Die Tabelle Bestellung(BestNr, Datum, KdNr, KdName, KdOrt, ArtNr, ArtBez, Preis, Menge) mit Primärschlüssel (BestNr, ArtNr) soll bis zur 3. Normalform normalisiert werden. Begründen Sie jeden Schritt und geben Sie das Ergebnis an.',
      a: ['- **1. NF:** Alle Attribute sind atomar: erfüllt.', '- **2. NF:** Beseitigung **partieller Abhängigkeiten**: Datum, KdNr, KdName, KdOrt hängen nur von BestNr ab; ArtBez und Preis nur von ArtNr; nur Menge hängt vom ganzen Schlüssel ab. Aufteilen in Bestellung, Artikel, Position.', '- **3. NF:** Beseitigung **transitiver Abhängigkeiten**: KdName und KdOrt hängen über KdNr von BestNr ab. Auslagern in Kunde.', 'Ergebnis: **Kunde**(KdNr, KdName, KdOrt), **Bestellung**(BestNr, Datum, KdNr FK), **Artikel**(ArtNr, ArtBez, Preis), **Position**(BestNr FK, ArtNr FK, Menge).']},
    {pts: 3, q: 'Geben Sie die Kardinalitäten zwischen Kurs und Termin sowie zwischen Mitglied und Termin an und begründen Sie sie.',
      a: ['- Kurs zu Termin: **1:n**, ein Kurs hat mehrere Termine, ein Termin gehört zu genau einem Kurs.', '- Mitglied zu Termin: **n:m**, ein Mitglied bucht mehrere Termine, ein Termin wird von mehreren Mitgliedern gebucht.']},
    {pts: 3, q: 'Erklären Sie die Aufgabe von Primärschlüssel und Fremdschlüssel (referenzielle Integrität).',
      a: ['Der **Primärschlüssel** identifiziert jede Zeile **eindeutig** (eindeutig, nie NULL). Der **Fremdschlüssel** verweist auf den Primärschlüssel einer anderen Tabelle und stellt die Beziehung her. **Referenzielle Integrität** bedeutet: Es darf keine Buchung für einen nicht vorhandenen Termin geben; das DBMS verhindert solche Verweise ins Leere.']},
  ],
});
AP2.exam.part('exam1-ps', {
  t: 'Handlungsschritt 4: Qualität, Datenschutz und Recht (15 Punkte)',
  tasks: [
    {pts: 4, q: 'Ordnen Sie den Beschreibungen die passende Testart zu: a) Die Berechnung der Stornogebühr wird isoliert geprüft. b) Die Schnittstelle zwischen Buchungsmodul und Zahlungsdienst wird geprüft. c) Das gesamte Portal wird auf einer Testumgebung mit Last geprüft. d) FitPlan prüft die Software anhand des Pflichtenhefts.',
      a: ['- a) **Modultest** (Unit-Test)', '- b) **Integrationstest**', '- c) **Systemtest**', '- d) **Abnahmetest** (Akzeptanztest)']},
    {pts: 2, q: 'Erklären Sie den Unterschied zwischen Verifikation und Validierung.',
      a: ['**Verifikation:** Prüft, ob das Produkt die **Spezifikation erfüllt** ("Bauen wir das Produkt richtig?"). **Validierung:** Prüft, ob das Produkt den **Bedarf des Kunden erfüllt** ("Bauen wir das richtige Produkt?").']},
    {pts: 3, q: 'Nennen Sie drei Rechte der betroffenen Mitglieder nach der DSGVO.',
      a: ['Beispiele: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17, "Recht auf Vergessenwerden"), Einschränkung der Verarbeitung, Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21). Drei davon genügen.']},
    {pts: 2, q: 'Das Portal wird bei einem externen Rechenzentrum gehostet. Welcher Vertrag ist nach DSGVO nötig und welche Rolle hat der Hoster?',
      a: ['Ein **Auftragsverarbeitungsvertrag (AV-Vertrag, Art. 28 DSGVO)**. Der Hoster ist **Auftragsverarbeiter**, FitPlan bleibt **Verantwortlicher**.']},
    {pts: 2, q: 'Die Entwicklung erfolgt zu einem Festpreis mit abgenommenem Ergebnis. Welche Vertragsart liegt vor und was schuldet der Auftragnehmer?',
      a: ['Ein **Werkvertrag** (§ 631 BGB). Der Auftragnehmer schuldet den **Erfolg** (funktionierende, mangelfreie Software), die Vergütung wird mit der **Abnahme** fällig. Beim Dienstvertrag würde nur die Tätigkeit geschuldet.']},
    {pts: 2, q: 'Das Portal soll eine Bibliothek unter GPL nutzen. Welche Folge hat das für den Quellcode des Portals?',
      a: ['Die GPL hat **Copyleft**: Wird das Portal mit der GPL-Bibliothek zusammen verbreitet, muss es ebenfalls unter **GPL** (mit Quellcode) veröffentlicht werden. Permissive Lizenzen wie **MIT** oder Apache erlauben auch proprietäre Nutzung.']},
  ],
});
