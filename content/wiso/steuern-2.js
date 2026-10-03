AP2.add('wiso-steuern', [
  ['h', 'Umsatzsteuer (Mehrwertsteuer)'],
  ['p', 'Die **Umsatzsteuer (USt, auch MwSt)** wird auf **jede Lieferung und Leistung** erhoben. Der **Regelsatz beträgt 19 %**, der **ermäßigte Satz 7 %** (Grundnahrungsmittel, Bücher, Zeitungen, Nahverkehr, Personenfernverkehr; Speisen in Restaurants ab 2026: 7 %). Sie ist eine **Verbrauchsteuer im weiteren Sinne** und eine **indirekte Steuer**: Der **Unternehmer** führt sie ab, der **Endverbraucher** trägt sie, weil sie im Preis steckt.'],
  ['table', ['Begriff', 'Bedeutung'], [['**Umsatzsteuer (Ausgangsumsatzsteuer)**', 'USt, die der Unternehmer in seiner **Rechnung** ausweist und vom Kunden bekommt'], ['**Vorsteuer**', 'USt, die der Unternehmer **selbst** beim Einkauf bezahlt (steht in den Eingangsrechnungen)'], ['**Zahllast**', 'USt aus Verkäufen **minus** Vorsteuer. Diesen Betrag zahlt er an das **Finanzamt** (**Voranmeldung** monatlich/vierteljährlich)'], ['**Nettopreis** / **Bruttopreis**', 'Brutto = Netto plus Umsatzsteuer'], ['**Vorsteuerabzug**', 'Unternehmer können die **Vorsteuer abziehen**, damit die Steuer nur den **Wertzuwachs (Mehrwert)** jeder Stufe belastet']]],
  ['code', 'text', `Bruttopreis   = Nettopreis mal 1,19            (7 %: mal 1,07)
Nettopreis    = Bruttopreis geteilt durch 1,19
Umsatzsteuer  = Nettopreis mal 0,19 = Brutto mal 19/119  (ca. 15,97 % vom Brutto)

Beispiel: Netto 200 Euro -> Umsatzsteuer 38 Euro -> Brutto 238 Euro
Beispiel: Brutto 119 Euro -> Netto 100 Euro -> USt 19 Euro`],
  ['ex', ['**Beispiel Zahllast:** Ein Softwarehaus verkauft Leistungen für **50.000 Euro netto** (USt 9.500 Euro, vom Kunden vereinnahmt) und kauft Hardware/Lizenzen für **20.000 Euro netto** (Vorsteuer 3.800 Euro). **Zahllast = 9.500 - 3.800 = 5.700 Euro** an das Finanzamt.', '**Mehrwert-Prinzip:** Hersteller verkauft für 100 netto (USt 19), Händler verkauft für 150 netto (USt 28,50, Vorsteuer 19, **Zahllast 9,50** auf den Mehrwert von 50), Endkunde zahlt 178,50 brutto.']],
  ['kv', [
    ['Kleinunternehmerregelung (§ 19 UStG)', 'Wer im Vorjahr **bis 25.000 Euro** Umsatz hatte (und im laufenden Jahr unter 100.000 Euro bleibt), **muss keine Umsatzsteuer** ausweisen, darf aber auch keine Vorsteuer abziehen (Stand 2025).'],
    ['Innergemeinschaftlicher Handel', 'Lieferungen an Unternehmen in anderen EU-Ländern sind meist **steuerfrei**, der Empfänger versteuert in seinem Land. **Reverse-Charge**: Steuerschuld geht auf den Leistungsempfänger über.'],
    ['Rechnung (§ 14 UStG)', 'Pflichtangaben: Name und Anschrift beider Parteien, **Steuernummer oder USt-IdNr.**, Rechnungsdatum, fortlaufende **Rechnungsnummer**, Menge und Art der Leistung, Zeitpunkt der Leistung, **Entgelt, Steuersatz, Steuerbetrag**. Seit 2025 gilt im B2B-Verkehr die **E-Rechnung** (strukturiertes Format).'],
  ]],
  ['h', 'Gewerbesteuer'],
  ['steps', ['**Gewerbeertrag** = Gewinn aus dem Gewerbebetrieb mit Hinzurechnungen und Kürzungen.', 'Abzug des **Freibetrags** (**24.500 Euro** für Einzelunternehmen und Personengesellschaften, nicht für GmbH).', '**Steuermessbetrag** = Gewerbeertrag mal **Steuermesszahl 3,5 %**.', '**Gewerbesteuer** = Steuermessbetrag mal **Hebesatz der Gemeinde** (je nach Gemeinde 200 bis 600 %).', 'Bei Einzelunternehmen und Personengesellschaften wird die Gewerbesteuer **auf die Einkommensteuer angerechnet** (bis zum 4-fachen Messbetrag).']],
  ['ex', ['**Beispiel:** Gewerbeertrag 74.500 Euro (Einzelunternehmen). Nach Freibetrag: 74.500 - 24.500 = 50.000 Euro. Messbetrag: 50.000 mal 3,5 % = **1.750 Euro**. Hebesatz 400 %: Gewerbesteuer = 1.750 mal 4 = **7.000 Euro**.']],
  ['h', 'Körperschaftsteuer und weitere Steuern'],
  ['table', ['Steuer', 'Wer zahlt?', 'Höhe / Grundlage', 'Empfänger'], [
    ['**Körperschaftsteuer**', 'Kapitalgesellschaften (GmbH, AG), Genossenschaften, Vereine', '**15 %** des Gewinns (+ 5,5 % Soli)', 'Bund und Länder'],
    ['**Lohnsteuer**', 'Arbeitnehmer (vom Arbeitgeber einbehalten)', 'Nach Lohnsteuertabelle und Steuerklasse', 'Bund, Länder, Gemeinden'],
    ['**Grundsteuer**', 'Grundstückseigentümer', 'Grundsteuermessbetrag mal Hebesatz', 'Gemeinde'],
    ['**Grunderwerbsteuer**', 'Käufer eines Grundstücks', 'In Baden-Württemberg **5 %** des Kaufpreises', 'Länder'],
    ['**Kfz-Steuer**', 'Fahrzeughalter', 'Nach Hubraum und CO2', 'Bund'],
    ['**Erbschaft- und Schenkungsteuer**', 'Erben, Beschenkte', 'Nach Verwandtschaft und Wert, mit Freibeträgen', 'Länder'],
    ['**Energiesteuer, Tabaksteuer, Alkoholsteuer**', 'Verbraucher (indirekt)', 'Auf Mengen', 'Bund'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie den Unterschied zwischen direkten und indirekten Steuern mit je einem Beispiel.', 'Bei **direkten Steuern** sind Steuerschuldner und wirtschaftlich Belasteter **dieselbe Person**: Beispiel **Einkommensteuer**. Bei **indirekten Steuern** wird die Steuer vom Unternehmen **an den Staat abgeführt**, aber über den **Preis auf den Verbraucher abgewälzt**: Beispiel **Umsatzsteuer**.', 4],
  ['qa', 'Ein Laptop kostet brutto 1.190 Euro (19 % Umsatzsteuer). Berechnen Sie Nettopreis und Umsatzsteuerbetrag.', ['Nettopreis = 1.190 / 1,19 = **1.000 Euro**.', 'Umsatzsteuer = 1.190 - 1.000 = **190 Euro**.'], 4],
  ['qa', 'Ein Unternehmen hat im Quartal Umsätze von 80.000 Euro netto und Einkäufe von 30.000 Euro netto (alles mit 19 % Umsatzsteuer). Wie hoch ist die Zahllast?', ['USt aus Verkäufen: 80.000 mal 0,19 = **15.200 Euro**.', 'Vorsteuer: 30.000 mal 0,19 = **5.700 Euro**.', 'Zahllast = 15.200 - 5.700 = **9.500 Euro** (= 50.000 mal 19 %).'], 5],
  ['qa', 'Was bedeutet Steuerprogression und welchen Zweck hat sie?', 'Bei der **Progression** steigt der **Steuersatz mit zunehmendem Einkommen**. Zweck: Besteuerung nach der **wirtschaftlichen Leistungsfähigkeit** und **sozialer Ausgleich**. Das Existenzminimum bleibt durch den **Grundfreibetrag** steuerfrei.', 4],
  ['quiz', [
    {q: 'Wie hoch ist der Regelsatz der Umsatzsteuer in Deutschland?', o: ['19 %', '7 %', '25 %', '16 %'], a: 0, e: 'Regelsatz 19 %, ermäßigter Satz 7 %.'},
    {q: 'Welche Steuer ist eine indirekte Steuer?', o: ['Umsatzsteuer', 'Einkommensteuer', 'Körperschaftsteuer', 'Gewerbesteuer'], a: 0, e: 'Sie wird im Preis weitergegeben.'},
    {q: 'Wem fließt die Gewerbesteuer zu?', o: ['Der Gemeinde', 'Dem Bund', 'Der Rentenversicherung', 'Der IHK'], a: 0, e: 'Die Gewerbesteuer ist eine Gemeindesteuer.'},
    {q: 'Wie berechnet man die Zahllast?', o: ['Umsatzsteuer minus Vorsteuer', 'Vorsteuer minus Umsatzsteuer', 'Brutto minus Netto', 'Gewinn mal 19 %'], a: 0, e: 'Die Zahllast ist die Differenz an das Finanzamt.'},
    {q: 'Was bedeutet progressiver Steuertarif?', o: ['Der Steuersatz steigt mit dem Einkommen', 'Der Steuersatz ist immer gleich', 'Der Steuersatz sinkt mit dem Einkommen', 'Es gibt keinen Steuersatz'], a: 0, e: 'Die Einkommensteuer steigt anteilig.'},
  ]],
]);
