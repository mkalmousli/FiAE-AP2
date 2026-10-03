AP2.add('ps-sequenz', [
  ['h', 'Sequenzdiagramm und Code gehören zusammen'],
  ['p', 'Jeder Pfeil im Diagramm entspricht einem Methodenaufruf im Code. So lässt sich aus dem Diagramm der Code ableiten und umgekehrt.'],
  ['seq', {w: 700, actors: ['Warenkorb', 'Konto'], steps: [[0, 1, 'abheben(summe)', 's'], [1, 1, 'Guthaben prüfen', 's'], [1, 0, 'true / false', 'r']], cap: 'Der Warenkorb ruft die Methode abheben des Kontos auf und bekommt ein Ergebnis zurück.'}],
  ['code', 'java', `// Warenkorb
boolean ok = konto.abheben(summe);   // Pfeil "abheben(summe)", Rückgabe true/false

// Konto
public boolean abheben(double summe) {
    if (!guthabenReicht(summe)) return false;   // Selbstaufruf "Guthaben prüfen"
    saldo -= summe;
    return true;
}`],
  ['h', 'Sequenz-, Aktivitäts- und Klassendiagramm im Vergleich'],
  ['table', ['Diagramm', 'Zeigt', 'Typische Frage', 'Art'], [
    ['Klassendiagramm', 'Klassen, Attribute, Methoden, Beziehungen', 'Woraus besteht das System?', 'Struktur (statisch)'],
    ['Sequenzdiagramm', 'Nachrichten zwischen Objekten über die Zeit', 'Wer ruft wen in welcher Reihenfolge?', 'Verhalten (Interaktion)'],
    ['Aktivitätsdiagramm', 'Ablauf von Aktionen mit Verzweigungen', 'Welche Schritte gibt es?', 'Verhalten (Ablauf)'],
    ['Zustandsdiagramm', 'Zustände eines Objekts und Übergänge', 'Wie verändert sich ein Objekt?', 'Verhalten (Zustand)'],
    ['Anwendungsfalldiagramm', 'Akteure und Funktionen', 'Was soll das System können?', 'Anforderungen'],
  ]],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Erklären Sie den Unterschied zwischen einer synchronen und einer asynchronen Nachricht im Sequenzdiagramm.', 'Bei einer **synchronen** Nachricht (gefüllte Pfeilspitze) wartet der Aufrufer, bis der Empfänger die Methode beendet hat und eine Rückgabe liefert. Bei einer **asynchronen** Nachricht (offene Pfeilspitze) arbeitet der Aufrufer sofort weiter, ohne auf eine Antwort zu warten.', 4],
  ['qa', 'Zeichnen Sie ein Sequenzdiagramm: Ein Kunde klickt auf "Kaufen". Die Shop-Oberfläche ruft den Bestellservice auf. Dieser prüft beim Lager die Verfügbarkeit. Ist der Artikel verfügbar, wird er reserviert und eine Bestätigung zurückgegeben, sonst eine Fehlermeldung.', ['**Teilnehmer:** Kunde, Shop, Bestellservice, Lager.', '**Ablauf:** Kunde - Shop: kaufen(). Shop - Bestellservice: bestellen(artikel). Bestellservice - Lager: istVerfügbar(artikel). Lager - Bestellservice: ja/nein (gestrichelt).', '**alt [verfügbar]:** Bestellservice - Lager: reservieren(). Bestellservice - Shop: Bestätigung. Shop - Kunde: Erfolg anzeigen.', '**else [nicht verfügbar]:** Bestellservice - Shop: Fehler. Shop - Kunde: Meldung anzeigen.'], 6],
  ['quiz', [
    {q: 'Welche Richtung hat die Zeit im Sequenzdiagramm?', o: ['Von oben nach unten', 'Von links nach rechts', 'Von unten nach oben', 'Beliebig'], a: 0, e: 'Die Zeitachse läuft senkrecht von oben nach unten.'},
    {q: 'Wie wird eine Rückgabe gezeichnet?', o: ['Gestrichelter Pfeil', 'Dicker durchgezogener Pfeil', 'Kreis', 'Gar nicht'], a: 0, e: 'Rückgaben werden als gestrichelte Pfeile gezeichnet.'},
    {q: 'Welches Fragment entspricht einem if-else?', o: ['alt', 'loop', 'par', 'ref'], a: 0, e: 'alt steht für Alternativen (if/else).'},
    {q: 'Welches Diagramm eignet sich, um den Nachrichtenaustausch zwischen Objekten zu zeigen?', o: ['Sequenzdiagramm', 'Klassendiagramm', 'Anwendungsfalldiagramm', 'ER-Diagramm'], a: 0, e: 'Das Sequenzdiagramm zeigt Interaktionen über die Zeit.'},
  ]],
]);
