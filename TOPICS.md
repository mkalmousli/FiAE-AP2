# AP2 Prüfungsvorbereitung — FiAE, IHK BW (Göppingen), Winter 2026

> Struktur: Betriebliche Projektarbeit (50%) + 2 Fachprüfungen à 10% (Planen Softwareprodukt, EuA) + WiSo (10%), je 90 Min (WiSo 60 Min). Deutsch ist kein IHK-AP2-Fach, sondern Berufsschul-Abschlussfach — eigener Block unten.
> Quellen allgemein: [IT-Berufe-Podcast: Themen AP2](https://it-berufe-podcast.de/vorbereitung-auf-die-ihk-abschlusspruefung-der-it-berufe/moegliche-themen-von-teil-2-der-gestreckten-abschlusspruefung-gap-fuer-fachinformatiker-anwendungsentwicklung/) · [mydigi.academy: Aufbau/Gewichtung 2026](https://mydigi.academy/azubi-ratgeber/pruefungsvorbereitung-fachinformatiker-fuer-anwendungsentwicklung/) · [ausbildung-in-der-it.de: AP2 FIAE](https://ausbildung-in-der-it.de/pruefung/ap2/fachinformatiker-anwendungsentwicklung) · [IHK Erläuterungen AO 2020](https://www.ihk.de/blueprint/servlet/resource/blob/5615116/1e71771a9f95c774d412ea2c79d458e0/fachinformatiker-vo2020-erlaeuterungen-zum-pruefungsverfahren-anwendungsentwicklung-data.pdf)

---

## 1. Planen eines Softwareproduktes (PS) — 90 Min, 10%

Fokus: Konzeption/Planung, nicht Coden. Quellen: [Fachinformatiker.de Forum: MEP-Themen](https://www.fachinformatiker.de/topic/175816-themen-empfehlungen-f%C3%BCr-mep-fiae-planen-eines-softwareproduktes/) · [IHK PDF: Ausbildung gestalten](https://www.ihk.de/blueprint/servlet/resource/blob/4866258/01cc354217565d127e867491da9613e2/umsetzungshilfe-fachinformatiker-in-data.pdf) · [dertestknacker.de](https://dertestknacker.de/ihk-pruefungsvorbereitung/ihk-pruefung-fachinformatiker/)

- [ ] **Projektmanagement**
  - [ ] Projektphasen (Initiierung, Planung, Durchführung, Abschluss)
  - [ ] Netzplantechnik (Vorwärts-/Rückwärtsrechnung, krit. Pfad, Pufferzeiten)
  - [ ] Balkendiagramm / Gantt-Diagramm
  - [ ] Meilensteine, Aufwandsschätzung (Function Point, Expertenschätzung)
  - [ ] Kosten-Nutzen-Rechnung, ROI, Amortisation
  - [ ] Projektorganisationsformen (Linie, Matrix, reine Projektorg.)
  - [ ] Scrum/Kanban-Grundlagen (Rollen, Artefakte, Sprint)
- [ ] **Anforderungsanalyse & Dokumente**
  - [ ] Lastenheft vs. Pflichtenheft (Unterschiede, Inhalte)
  - [ ] Ist-/Soll-Analyse
  - [ ] Anwendungsfalldiagramm / Use Cases
- [ ] **Modellierung (UML)**
  - [ ] Klassendiagramm (Assoziation, Aggregation, Komposition, Vererbung, Multiplizität)
  - [ ] Aktivitätsdiagramm
  - [ ] Sequenzdiagramm
  - [ ] Zustandsdiagramm
  - [ ] Struktogramm (Nassi-Shneiderman)
- [ ] **Datenmodellierung**
  - [ ] ER-Modell (Entitäten, Beziehungen, Kardinalitäten)
  - [ ] Normalisierung (1NF–3NF)
  - [ ] Relationales Modell / Tabellenableitung aus ER
- [ ] **UI/UX**
  - [ ] Ergonomie-Grundsätze (EN ISO 9241)
  - [ ] Dialoggestaltung, Barrierefreiheit
  - [ ] Wireframes/Mockups
- [ ] **Qualitätssicherung**
  - [ ] Testarten (Modul-, Integrations-, System-, Abnahmetest)
  - [ ] Verifikation vs. Validierung
  - [ ] Reviews, Pflichtenheft-Abnahme
- [ ] **Recht & Datenschutz**
  - [ ] DSGVO-Grundlagen (Verarbeitungsgrundsätze, Betroffenenrechte)
  - [ ] Urheberrecht/Lizenzen (Open Source Lizenztypen)
  - [ ] Vertragsarten (Werk-, Dienstvertrag)
- [ ] **Entwicklungsumgebungen**
  - [ ] Auswahlkriterien IDE/Frameworks/Bibliotheken
  - [ ] Versionsverwaltung (Git-Grundlagen)

---

## 2. Hardware, Infrastruktur & IT-Sicherheit — geprüft innerhalb von PS

Fokus: Systemnahe Themen, seit Prüfungskatalog 2025 stärker gewichtet (Software läuft auf Infrastruktur).

- [ ] **IT-Infrastruktur & Netzwerke**
  - [ ] OSI-Referenzmodell (7 Schichten, Protokolle je Schicht)
  - [ ] TCP/IP-Modell
  - [ ] IPv4-Adressierung: Netzklassen, Subnetting, CIDR, Subnetzmaske berechnen, Host-Bereiche
  - [ ] IPv6-Grundlagen
  - [ ] Ports & Protokolle: TCP/UDP, HTTP/HTTPS, FTP, DNS, DHCP, ODBC
  - [ ] Netzwerktopologien (Stern, Bus, Ring, Mesh)
  - [ ] Netzwerkkomponenten (Switch, Router, Hub, Firewall)
  - [ ] Übertragungsmedien (Kupfer, Glasfaser, WLAN)
  - [ ] Zugriffskontrolle im Netzwerk (RADIUS, Kerberos)
  - [ ] MQTT (Publish/Subscribe, Broker, Topics, QoS)
- [ ] **Storage & Verfügbarkeit**
  - [ ] NAS, SAN
  - [ ] RAID-Level (0–6, Kapazitätsberechnung)
  - [ ] Verfügbarkeit: SLA, MTBF/MTTR
  - [ ] Backup-Strategien (3-2-1-Regel, RPO/RTO)
- [ ] **IT-Sicherheit** *(erweitert im neuen Prüfungskatalog ab 2025)*
  - [ ] CIA-Triade (Vertraulichkeit, Integrität, Verfügbarkeit)
  - [ ] Firewall-Regeln, Zero Trust
  - [ ] Verschlüsselung symmetrisch/asymmetrisch, BitLocker, TPM
  - [ ] PKI: Zertifikate, Zertifikatskette, Sperrung, CSR
  - [ ] TLS-Handshake, mTLS
  - [ ] ISMS/ISO 27001, PDCA-Zyklus
  - [ ] Angriffsarten (SQL-Injection, Man-in-the-Middle, DDoS)

Quellen (Infrastruktur/Netzwerk-Block): [IT-Berufe-Podcast #191: Neuer Prüfungskatalog AP2 FiAE ab 2025](https://it-berufe-podcast.de/neuer-pruefungskatalog-fuer-die-ap2-als-fachinformatiker-anwendungsentwicklung-ab-2025-it-berufe-podcast-191/) · [AP2 Lernhub FiAE](https://www.ap2-fiae.de/) · [AP2 Trainer (FiSi & FIAE)](https://ap2-lernplattform.de/) · [IPv4 Subnetting Tutorial (YouTube)](https://www.youtube.com/watch?v=rC2p8puEacA) · [Lernarena: Fachinformatiker Prüfung](https://lernarena.app/fachinformatiker-pruefung)

---

## 3. Entwicklung und Umsetzung von Algorithmen (EuA) — 90 Min, 10%

Fokus: Programmierlogik, Code lesen/schreiben, SQL. Quelle: [IT-Berufe-Podcast AP2-Themen](https://it-berufe-podcast.de/vorbereitung-auf-die-ihk-abschlusspruefung-der-it-berufe/moegliche-themen-von-teil-2-der-gestreckten-abschlusspruefung-gap-fuer-fachinformatiker-anwendungsentwicklung/)

- [ ] **Grundlagen Programmierung**
  - [ ] Datentypen, Variablen, Operatoren
  - [ ] Kontrollstrukturen (Verzweigung, Schleifen: for/while/do-while)
  - [ ] Funktionen/Methoden, Parameterübergabe (call by value/reference)
  - [ ] Rekursion
- [ ] **Pseudocode & Ablaufdarstellung**
  - [ ] Programmablaufplan (PAP, DIN 66001)
  - [ ] Struktogramm lesen/erstellen
  - [ ] Pseudocode → Zielsprache übersetzen
- [ ] **Objektorientierung**
  - [ ] Klassen, Objekte, Attribute, Methoden
  - [ ] Vererbung, Polymorphie, Kapselung, Abstraktion
  - [ ] Interfaces vs. abstrakte Klassen
  - [ ] Konstruktoren/Destruktoren
- [ ] **Datenstrukturen**
  - [ ] Arrays, Listen (einfach/doppelt verkettet)
  - [ ] Stack, Queue
  - [ ] Bäume (Binärbaum, Suchbaum)
  - [ ] Hashtabellen
- [ ] **Algorithmen**
  - [ ] Sortieralgorithmen (Bubble-, Insertion-, Selection-, Merge-, Quicksort)
  - [ ] Suchalgorithmen (lineare Suche, binäre Suche)
  - [ ] Komplexität/Laufzeit (O-Notation, Best/Worst Case)
- [ ] **Entwurfsmuster (Design Patterns)**
  - [ ] Singleton, Factory, Observer, Strategy (Grundprinzip + Anwendungsfall)
- [ ] **Testen**
  - [ ] Testfallermittlung (Äquivalenzklassen, Grenzwertanalyse)
  - [ ] Testdaten erstellen
  - [ ] Unit-Tests Grundprinzip
- [ ] **Datenbanken/SQL**
  - [ ] SELECT (WHERE, JOIN, GROUP BY, ORDER BY, Subqueries)
  - [ ] INSERT/UPDATE/DELETE
  - [ ] Aggregatfunktionen (COUNT, SUM, AVG, MAX, MIN)
  - [ ] Datenbankentwurf aus ER-Modell ableiten
- [ ] **Fehlerbehandlung**
  - [ ] Exceptions/Try-Catch-Prinzip
  - [ ] Debugging-Grundlagen

---

## 4. Wirtschafts- und Sozialkunde (WiSo) — 60 Min, 10%

Fokus: Multiple-Choice, 20–30 Fragen. Quellen: [top-pruefung.de Übungsfragen](https://www.top-pruefung.de/wiso-fragen-1.html) · [evkola.org 25 IHK-Fragen PDF](https://www.evkola.org/wiso/uebungsfragen-pdf) · [plakos-akademie.de](https://plakos-akademie.de/wirtschafts-und-sozialkunde-pruefung/)

- [ ] **Ausbildung & Beruf**
  - [ ] Berufsbildungsgesetz (BBiG): Rechte/Pflichten Azubi & Ausbilder
  - [ ] Ausbildungsvertrag, Probezeit, Übernahme
  - [ ] Jugendarbeitsschutzgesetz (JArbSchG)
  - [ ] IHK, Handwerkskammer, Kammern allgemein
- [ ] **Arbeitsrecht**
  - [ ] Arbeitsvertrag, Arbeitszeitgesetz
  - [ ] Kündigung/Kündigungsfristen, Kündigungsschutzgesetz
  - [ ] Urlaubsanspruch (BUrlG)
  - [ ] Entgeltfortzahlung im Krankheitsfall
- [ ] **Tarifrecht & Mitbestimmung**
  - [ ] Tarifvertrag, Tarifverhandlung, Tarifautonomie
  - [ ] Betriebsrat (Wahl, Aufgaben, Mitbestimmungsrechte, BetrVG)
  - [ ] Gewerkschaften, Arbeitgeberverbände
  - [ ] Streik/Aussperrung
- [ ] **Sozialversicherung**
  - [ ] Krankenversicherung (gesetzlich/privat)
  - [ ] Rentenversicherung, Rentenformel-Grundlagen
  - [ ] Arbeitslosenversicherung
  - [ ] Pflegeversicherung
  - [ ] Unfallversicherung (Berufsgenossenschaft)
- [ ] **Wirtschaftliche Grundlagen**
  - [ ] Wirtschaftskreislauf (einfach/erweitert)
  - [ ] Angebot & Nachfrage, Marktformen (Monopol, Oligopol, Polypol)
  - [ ] Preisbildung
  - [ ] Konjunktur (Hoch/Tief, Indikatoren)
  - [ ] Inflation/Deflation
- [ ] **Unternehmen & Steuern**
  - [ ] Unternehmensformen (Einzelunternehmen, GbR, OHG, KG, GmbH, AG)
  - [ ] Steuerarten (Einkommensteuer, Umsatzsteuer/MwSt, Gewerbesteuer)
  - [ ] Lohn-/Gehaltsabrechnung, Brutto/Netto
- [ ] **Staat & Gesellschaft**
  - [ ] Grundzüge Staatsaufbau (Legislative/Exekutive/Judikative)
  - [ ] Sozialstaatsprinzip, Grundgesetz-Basics

---

## 5. Deutsch (Berufsschule, Abschlussfach) — nicht Teil der IHK-AP2

> Prüft Berufsschule BW, nicht IHK. Themen laut typ. IT-Berufe-Lehrplan/Prüfungsvorbereitung. Quelle: [IT-Berufe-Podcast: schriftliche IHK-Themen (Kontext)](https://it-berufe-podcast.de/vorbereitung-auf-die-ihk-abschlusspruefung-der-it-berufe/themen-der-schriftlichen-ihk-pruefungen-der-it-berufe/) — bitte Lehrer/Fachlehrer nach genauem schulinternen Prüfungsformat fragen (Klassenarbeit vs. Abschlussklausur).

- [ ] **Textformen**
  - [ ] Textanalyse/Interpretation (Sachtext & literarischer Text)
  - [ ] Argumentation / Erörterung (linear & dialektisch)
  - [ ] Stellungnahme
  - [ ] Zusammenfassung (Inhaltsangabe)
- [ ] **Berufsbezogene Kommunikation**
  - [ ] Bewerbung (Anschreiben, Lebenslauf)
  - [ ] Geschäftsbrief nach DIN 5008
  - [ ] E-Mail-Kommunikation, Stil/Register
- [ ] **Kommunikationsmodelle**
  - [ ] Sender-Empfänger-Modell (Shannon-Weaver)
  - [ ] 4-Ohren-Modell (Schulz von Thun)
  - [ ] Eisbergmodell
  - [ ] Aktives Zuhören, Feedbackregeln
- [ ] **Präsentation**
  - [ ] Aufbau (Einleitung/Hauptteil/Schluss)
  - [ ] Rhetorik, Medieneinsatz, Visualisierung
- [ ] **Sprachrichtigkeit**
  - [ ] Rechtschreibung/Zeichensetzung
  - [ ] Grammatik (Satzbau, Zeiten, Konjunktiv)
  - [ ] Fachsprache vs. Umgangssprache

---

## Übungsressourcen
- [ ] Alte Prüfungen üben (AkA-Prüfungskatalog über IHK-Bildungshaus/Berufsschule anfordern)
- [ ] [u-form Prüfungskatalog FIAE](https://www.u-form-shop.de/ihk-pruefungen/pruefungskataloge-abschlusspruefung/fachinformatiker-fachinformatikerin-systemintegration-pruefungskatalog-fuer-die-ihk-abschlusspruefung-1)
- [ ] [Europa-Lehrmittel Leseprobe Prüfungsvorbereitung](https://www.europa-lehrmittel.de/leseprobe/32393-7.pdf)
- [ ] [top-pruefung.de WiSo Probeklausur PDF](https://www.top-pruefung.de/wirtschafts-sozialkunde-probe.pdf)
