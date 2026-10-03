AP2.page('eua-unittest', {
  b: 'eua', g: 'Testen', t: 'Testdaten und Unit-Tests',
  d: 'Ein **Unit-Test** ist ein **automatisierter Test** einer **kleinen Einheit** (Methode, Klasse) mit **festen Eingaben** und **erwartetem Ergebnis**. Er wird mit einem **Test-Framework** (JUnit, NUnit, pytest) ausgeführt und liefert **bestanden** oder **fehlgeschlagen**. **Testdaten** sind die Eingaben und der Anfangszustand für Tests. Sie sollen **repräsentativ**, **reproduzierbar** und **datenschutzkonform** sein.',
  m: '**Arrange - Act - Assert (AAA):** Vorbereiten, Ausführen, Prüfen. **F-I-R-S-T:** **F**ast, **I**ndependent, **R**epeatable, **S**elf-validating, **T**imely. **TDD: Rot (Test schreibt, schlägt fehl) - Grün (Code schreiben) - Refactor.**',
  cheat: [
    ['Unit-Test', ['Testet **eine Einheit** isoliert', '**Automatisiert**, wiederholbar', '**Arrange, Act, Assert**', 'Frameworks: **JUnit** (Java), **NUnit/xUnit** (C#), **pytest/unittest** (Python)', 'Teil der **CI-Pipeline**']],
    ['Assertions', ['`assertEquals(erwartet, tatsächlich)`', '`assertTrue/False`, `assertNull`', '`assertThrows(Exception.class, ...)`', 'Schlägt eine Prüfung fehl: Test **rot**']],
    ['Testdaten', ['**Typische** Werte', '**Grenzwerte** und **Fehlerfälle**', '**Reproduzierbar** (feste Werte)', '**Anonymisiert**: keine echten personenbezogenen Daten', 'Generatoren, Fixtures, Seed']],
    ['Mock / Stub', ['Ersetzt **abhängige** Teile (Datenbank, Netzwerk)', '**Stub:** liefert feste Antworten', '**Mock:** prüft zusätzlich Aufrufe', 'Frameworks: Mockito, Moq, unittest.mock']],
  ],
  blocks: [
    ['h', 'Warum automatisierte Tests?'],
    ['p', 'Wer Code ändert, will **sofort wissen, ob noch alles funktioniert**. Mit **Unit-Tests** läuft diese Prüfung in **Sekunden** per Knopfdruck. Sie dokumentieren das erwartete Verhalten, finden Fehler früh und geben Sicherheit beim **Refactoring** (Umbauen). Sie sind die **unterste und größte Ebene der Testpyramide**.'],
    ['h', 'Aufbau eines Unit-Tests: Arrange, Act, Assert'],
    ['steps', ['**Arrange (Vorbereiten):** Objekte und Testdaten anlegen.', '**Act (Ausführen):** Die zu testende Methode aufrufen.', '**Assert (Prüfen):** Das Ergebnis mit dem **erwarteten** Wert vergleichen.']],
    ['codes', [
      ['java', `// Zu testende Klasse
class Rechner {
    int teile(int a, int b) {
        if (b == 0) throw new IllegalArgumentException("Division durch 0");
        return a / b;
    }
}

// Test mit JUnit 5
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RechnerTest {
    @Test
    void teileLiefertQuotient() {
        Rechner r = new Rechner();             // Arrange
        int ergebnis = r.teile(10, 2);         // Act
        assertEquals(5, ergebnis);             // Assert: erwartet, tatsächlich
    }
    @Test
    void teileDurchNullWirftException() {
        Rechner r = new Rechner();
        assertThrows(IllegalArgumentException.class, () -> r.teile(1, 0));
    }
    @Test
    void ganzzahlDivisionSchneidetAb() {
        assertEquals(3, new Rechner().teile(7, 2));    // Grenzfall
    }
}`],
      ['csharp', `// NUnit
[TestFixture]
public class RechnerTests
{
    [Test]
    public void Teile_LiefertQuotient()
    {
        var r = new Rechner();
        int ergebnis = r.Teile(10, 2);
        Assert.AreEqual(5, ergebnis);
    }
    [Test]
    public void Teile_DurchNull_WirftException()
    {
        Assert.Throws<ArgumentException>(() => new Rechner().Teile(1, 0));
    }
}`],
      ['python', `# pytest
import pytest
from rechner import Rechner

def test_teile_liefert_quotient():
    assert Rechner().teile(10, 2) == 5

def test_teile_durch_null_wirft_exception():
    with pytest.raises(ValueError):
        Rechner().teile(1, 0)`],
    ]],
    ['h', 'Gute Unit-Tests: FIRST'],
    ['kv', [
      ['Fast (schnell)', 'Tests laufen in Millisekunden, damit man sie ständig ausführt.'],
      ['Independent (unabhängig)', 'Kein Test hängt vom Ergebnis oder der Reihenfolge eines anderen ab.'],
      ['Repeatable (wiederholbar)', 'Gleiches Ergebnis bei jedem Lauf, in jeder Umgebung (keine Zufallswerte, keine aktuelle Uhrzeit ohne Kontrolle).'],
      ['Self-validating (selbstprüfend)', 'Der Test sagt selbst "bestanden" oder "fehlgeschlagen", ohne manuelles Auswerten.'],
      ['Timely (rechtzeitig)', 'Tests entstehen **mit oder vor** dem Code (siehe TDD).'],
    ]],
  ],
});
