AP2.add('eua-unittest', [
  ['h', 'Abhängigkeiten ersetzen: Stub und Mock'],
  ['p', 'Ein Unit-Test soll **nur eine Einheit** prüfen. Hängt die Einheit von einer **Datenbank**, einem **Webservice** oder der **Uhrzeit** ab, ersetzt man diese Abhängigkeit durch einen **Platzhalter (Test Double)**. Das macht Tests **schnell** und **reproduzierbar**.'],
  ['table', ['Test Double', 'Funktion', 'Beispiel'], [['**Dummy**', 'Füllt nur einen Parameter, wird nie benutzt', 'Leeres Objekt'], ['**Stub**', 'Liefert **feste Antworten**', 'Wetterdienst-Stub liefert immer 20 Grad'], ['**Mock**', 'Stub **und prüft Aufrufe** ("wurde `senden()` einmal aufgerufen?")', 'E-Mail-Dienst als Mock'], ['**Fake**', 'Einfache, funktionierende Ersatzimplementierung', 'In-Memory-Datenbank statt echter DB']]],
  ['code', 'java', `// Mockito: E-Mail-Dienst wird durch einen Mock ersetzt
EmailService mail = mock(EmailService.class);
Bestellung b = new Bestellung(mail);
b.abschliessen();
verify(mail, times(1)).sende(any());     // Wurde genau einmal eine Mail versendet?`],
  ['h', 'Testdaten erstellen'],
  ['p', 'Gute Tests brauchen **gute Daten**. **Testdaten** sind die Eingabewerte und der Anfangszustand (zum Beispiel Zeilen in der Testdatenbank).'],
  ['table', ['Anforderung', 'Bedeutung', 'Umsetzung'], [
    ['**Repräsentativ**', 'Deckt typische Fälle ab', 'Echte Muster nachbilden (Namen mit Umlauten, lange Texte, verschiedene Länder)'],
    ['**Randfälle**', 'Grenzwerte, Leerwerte, Extremwerte', '0, -1, leer, null, sehr große Zahl, Datum 29.02., Zeitumstellung'],
    ['**Negativfälle**', 'Fehlerhafte Eingaben', 'Ungültige E-Mail, SQL-Injection-Text, zu langes Feld'],
    ['**Reproduzierbar**', 'Immer gleich', 'Feste Werte, **Seed** für Zufallsgeneratoren, Testdatenbank vor jedem Test zurücksetzen'],
    ['**Unabhängig**', 'Jeder Test bringt seine Daten mit', 'Setup/Teardown, Fixtures, Builder'],
    ['**Datenschutzkonform**', 'Keine echten personenbezogenen Daten ungeschützt', '**Synthetische** Daten oder **anonymisierte/pseudonymisierte** Produktionskopie (DSGVO!)'],
  ]],
  ['kv', [
    ['Synthetische Daten', 'Selbst erzeugt, zum Beispiel mit Generatoren (Faker-Bibliotheken). Datenschutzfreundlich.'],
    ['Anonymisierte Produktionsdaten', 'Echte Datenstruktur und Verteilung, aber ohne Personenbezug. Aufwendig, aber realistisch.'],
    ['Fixture / Setup', 'Vorbereitung vor jedem Test (`@BeforeEach`, `[SetUp]`, `pytest.fixture`): Testobjekte und Daten anlegen. **Teardown:** Aufräumen.'],
  ]],
  ['code', 'python', `import pytest

@pytest.fixture
def kunde():                                   # Testdaten für mehrere Tests
    return {"name": "Test Kunde", "plz": "73033", "rabatt": 0.1}

@pytest.mark.parametrize("alter, erwartet", [   # mehrere Datensätze, ein Test
    (17, False), (18, True), (40, True), (65, True), (66, False),   # Grenzwerte!
])
def test_mitglied(alter, erwartet):
    assert mitglied_moeglich(alter) == erwartet`],
  ['h', 'Testgetriebene Entwicklung (TDD)'],
  ['diagram', AP2.dg.cycle(['Rot: Test schreiben (schlägt fehl)', 'Grün: Minimalen Code schreiben (Test besteht)', 'Refactor: Code aufräumen (Tests bleiben grün)'], {w: 720, h: 300, rx: 250, ry: 90, styles: ['bad', 'ok', 'accent'], k: 'round', cap: 'Der TDD-Zyklus: Red - Green - Refactor'})],
  ['h', 'Code Coverage (Testabdeckung)'],
  ['p', 'Die **Testabdeckung** misst, **welcher Anteil des Codes** durch Tests ausgeführt wird (Zeilen-, Zweig-Abdeckung). Hohe Abdeckung ist **gut, aber kein Beweis für Qualität**: Ein Test ohne Assertion erhöht die Abdeckung, prüft aber nichts. Üblich sind Ziele um **70 bis 80 Prozent**; wichtiger ist, dass **kritische Logik** gut getestet ist.'],
  ['h', 'Aufgaben im Prüfungsstil'],
  ['qa', 'Schreiben Sie einen Unit-Test (JUnit-Stil) für die Methode `int max(int a, int b)`.', ['`@Test void maxLiefertGroesserenWert() {`', '`    assertEquals(7, max(3, 7));`', '`    assertEquals(7, max(7, 3));`', '`    assertEquals(5, max(5, 5));     // Gleichheit`', '`    assertEquals(-1, max(-5, -1));  // negative Werte`', '`}`'], 5],
  ['qa', 'Was ist ein Unit-Test und welche Vorteile bietet er?', ['Ein Unit-Test prüft eine kleine, isolierte Einheit (Methode oder Klasse) automatisiert mit festen Eingaben gegen ein erwartetes Ergebnis.', '**Vorteile:** Fehler werden früh gefunden, Regressionen nach Änderungen sofort erkannt, der Test dokumentiert das Verhalten, Refactoring wird sicherer, die Prüfung läuft automatisiert in der Pipeline.'], 5],
  ['qa', 'Warum sollten in Testumgebungen keine ungeschützten Produktionsdaten verwendet werden?', 'Produktionsdaten enthalten **personenbezogene Daten**, die nach der **DSGVO** besonders geschützt sind. Testumgebungen sind meist weniger gesichert und mehr Personen haben Zugriff. Daher nutzt man **synthetische** oder **anonymisierte** Daten.', 4],
  ['qa', 'Erklären Sie den Unterschied zwischen Stub und Mock.', 'Ein **Stub** ersetzt eine Abhängigkeit und liefert **vorgegebene Antworten**. Ein **Mock** tut das auch, **prüft aber zusätzlich**, ob und wie er aufgerufen wurde (zum Beispiel "sende() wurde genau einmal aufgerufen").', 3],
  ['quiz', [
    {q: 'Was bedeuten die drei Schritte AAA?', o: ['Arrange, Act, Assert', 'Analyse, Aufbau, Abnahme', 'Add, Add, Add', 'Autor, Anwender, Admin'], a: 0, e: 'Vorbereiten, Ausführen, Prüfen.'},
    {q: 'Was ist ein Mock?', o: ['Ein Platzhalter, der Aufrufe überprüft', 'Ein Programmfehler', 'Eine Datenbank', 'Eine Testart für Last'], a: 0, e: 'Mocks ersetzen Abhängigkeiten und verifizieren Interaktionen.'},
    {q: 'Was bedeutet Rot-Grün-Refactor?', o: ['Test schreiben (rot), Code schreiben (grün), aufräumen', 'Ampel-Sicherheit', 'Farben im Editor', 'Reihenfolge von Fehlern'], a: 0, e: 'Das ist der Ablauf der testgetriebenen Entwicklung (TDD).'},
    {q: 'Welche Methode prüft in JUnit, ob zwei Werte gleich sind?', o: ['assertEquals', 'assertThrows', 'assertNull', 'assertTime'], a: 0, e: 'assertEquals(erwartet, tatsächlich).'},
    {q: 'Warum soll ein Unit-Test unabhängig von anderen Tests sein?', o: ['Damit die Reihenfolge und Fehler anderer Tests keinen Einfluss haben', 'Damit er langsamer läuft', 'Damit er mehr Code braucht', 'Damit er nie fehlschlägt'], a: 0, e: 'Abhängige Tests sind schwer zu verstehen und fehleranfällig.'},
  ]],
]);
