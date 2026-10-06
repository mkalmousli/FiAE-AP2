AP2.page('course-java-12', {
  b: 'course', g: 'Java', t: 'Java 12: Algorithmen, JUnit-Tests und eine komplette Prüfungsaufgabe',
  d: 'Zum Abschluss des Java-Kurses: die wichtigsten **Algorithmen** in Java-Syntax (Suchen, Sortieren, Stack/Queue mit `ArrayDeque`), **Unit-Tests mit JUnit 5** (`@Test`, `assertEquals`, `assertThrows`) und die Lösung einer vollständigen Prüfungsaufgabe: Observer- und Singleton-Implementierung aus Winter 2025/26 inklusive Test. So übt man genau das, was in der AP2 verlangt wird: Klassen nach Vorgabe umsetzen, Methoden mit Schleifen und Bedingungen schreiben, Grenzfälle bedenken.',
  m: '**Binäre Suche nur sortiert, O(log n).** **Stack/Queue in Java: `ArrayDeque` (push/pop bzw. offer/poll).** **JUnit: `@Test` + `assertEquals(erwartet, tatsächlich)`; bei double mit Toleranz.** **Testfälle: Normalfall, Grenzwerte, Fehlerfall.**',
  cheat: [
    ['Suchen/Sortieren', ['`Arrays.binarySearch(a, x)`', '`Collections.sort(list)`', 'eigene Implementierung kennen', 'O-Notation angeben']],
    ['ArrayDeque', ['Stack: `push(x)`, `pop()`, `peek()`', 'Queue: `offer(x)`, `poll()`, `peek()`', 'statt veralteter Klasse `Stack`', '`isEmpty()`']],
    ['JUnit 5', ['`@Test void name() { ... }`', '`assertEquals(3, f(1))`', '`assertEquals(1.5, x, 0.001)`', '`assertThrows(X.class, () -> ...)`']],
    ['Testarten', ['Unit: eine Klasse/Methode', 'Integration: Zusammenspiel', 'Whitebox: Codestruktur', 'Blackbox: nur Spezifikation']],
  ],
  blocks: [
    ['h', 'Suchen und Sortieren in Java'],
    ['code', 'java', `static int binaereSuche(int[] a, int x) {
    int links = 0, rechts = a.length - 1;
    while (links <= rechts) {
        int mitte = (links + rechts) / 2;
        if (a[mitte] == x) return mitte;
        if (a[mitte] < x) links = mitte + 1;
        else rechts = mitte - 1;
    }
    return -1;
}

static void insertionSort(int[] a) {
    for (int i = 1; i < a.length; i++) {
        int wert = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > wert) {
            a[j + 1] = a[j];          // größere Elemente nach rechts schieben
            j--;
        }
        a[j + 1] = wert;
    }
}

static void quickSort(int[] a, int links, int rechts) {
    if (links >= rechts) return;
    int pivot = a[(links + rechts) / 2], i = links, j = rechts;
    while (i <= j) {
        while (a[i] < pivot) i++;
        while (a[j] > pivot) j--;
        if (i <= j) { int t = a[i]; a[i] = a[j]; a[j] = t; i++; j--; }
    }
    quickSort(a, links, j);
    quickSort(a, i, rechts);
}`],
    ['h', 'Stack und Queue'],
    ['code', 'java', `Deque<String> stapel = new ArrayDeque<>();
stapel.push("A"); stapel.push("B");
System.out.println(stapel.pop());     // B (LIFO)

Queue<String> schlange = new ArrayDeque<>();
schlange.offer("Kunde 1"); schlange.offer("Kunde 2");
System.out.println(schlange.poll());  // Kunde 1 (FIFO)

// Klammerprüfung mit Stack
static boolean klammernOk(String s) {
    Deque<Character> st = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '[') st.push(c);
        else if (c == ')' && (st.isEmpty() || st.pop() != '(')) return false;
        else if (c == ']' && (st.isEmpty() || st.pop() != '[')) return false;
    }
    return st.isEmpty();
}`],
    ['h', 'Unit-Tests mit JUnit 5'],
    ['code', 'java', `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class StromTest {
    @Test
    void gueltigeWerteAnDenGrenzen() {
        assertTrue(new Strom(0.05).pruefeWert());
        assertTrue(new Strom(2.0).pruefeWert());
    }

    @Test
    void ungueltigeWerteKnappAusserhalb() {
        assertFalse(new Strom(0.049).pruefeWert());
        assertFalse(new Strom(2.001).pruefeWert());
    }

    @Test
    void kapazitaetEinerStunde() {
        List<Messwert> werte = new ArrayList<>();
        for (int i = 0; i < 3600; i++) werte.add(new Strom(1.8));
        Messreihe r = new Messreihe(werte, 1000);
        assertEquals(1800.0, r.berechneKapazitaet(), 0.001);   // Toleranz bei double
    }

    @Test
    void negativerWertWirftException() {
        assertThrows(IllegalArgumentException.class, () -> new Akku("A1", -100));   // vorausgesetzt, der Konstruktor prüft
    }
}`],
    ['tip', 'Aufbau jedes Tests nach **AAA**: **Arrange** (Objekte vorbereiten), **Act** (Methode aufrufen), **Assert** (Ergebnis prüfen). Ein Test prüft **ein** Verhalten und hat einen sprechenden Namen. Grenzwerte (0,05 und 2,0) und Werte knapp daneben decken die meisten Fehler auf.'],
    ['h', 'Komplette Prüfungsaufgabe: Benachrichtigungsmodul (Winter 2025/26)'],
    ['p', 'Vorgabe: `LaborAnalyse` verwaltet eine `personenListe` (`hinzufuegen`, `entfernen`, `gibPersonenListe`). `SarsCov2Analyse` erbt davon, ist ein **Singleton** und benachrichtigt den Patienten mit passender ID per `aktualisieren(ergebnis)`. `Patient` zeigt das Ergebnis an (0 negativ, 1 positiv, sonst "kein Ergebnis möglich") und meldet sich danach ab.'],
    ['code', 'java', `import java.util.ArrayList;
import java.util.List;

abstract class Person {
    private final int personenID;
    protected Person(int personenID) { this.personenID = personenID; }
    public int getPersonenID() { return personenID; }
    public abstract void aktualisieren(int ergebnis);
}

abstract class LaborAnalyse {
    private final List<Person> personenListe = new ArrayList<>();
    public void hinzufuegen(Person p) { personenListe.add(p); }
    public void entfernen(Person p) { personenListe.remove(p); }
    public List<Person> gibPersonenListe() { return personenListe; }
}

class SarsCov2Analyse extends LaborAnalyse {
    private static final SarsCov2Analyse instanz = new SarsCov2Analyse();
    private SarsCov2Analyse() { }                       // privater Konstruktor
    public static SarsCov2Analyse gibInstanz() { return instanz; }

    public void benachrichtigen(int personenID, int ergebnis) {
        Person treffer = null;
        for (Person p : gibPersonenListe()) {           // erst suchen ...
            if (p.getPersonenID() == personenID) { treffer = p; break; }
        }
        if (treffer != null) treffer.aktualisieren(ergebnis);   // ... dann aufrufen (Liste wird dabei verändert)
    }
}

class Patient extends Person {
    private int laborErgebnis = -1;
    public Patient(int personenID) { super(personenID); }

    public void sarsCov2TestAbgeben() { SarsCov2Analyse.gibInstanz().hinzufuegen(this); }

    public void testErgebnisAnzeigen() {
        if (laborErgebnis == 0) System.out.println("Testergebnis negativ");
        else if (laborErgebnis == 1) System.out.println("Testergebnis positiv");
        else System.out.println("Kein Testergebnis möglich");
    }

    @Override
    public void aktualisieren(int ergebnis) {
        laborErgebnis = ergebnis;
        testErgebnisAnzeigen();
        SarsCov2Analyse.gibInstanz().entfernen(this);
    }
}

public class Main {
    public static void main(String[] args) {
        Patient p1 = new Patient(1), p2 = new Patient(2);
        p1.sarsCov2TestAbgeben();
        p2.sarsCov2TestAbgeben();
        SarsCov2Analyse.gibInstanz().benachrichtigen(2, 1);   // Testergebnis positiv
        System.out.println(SarsCov2Analyse.gibInstanz().gibPersonenListe().size());   // 1
    }
}`],
    ['code', 'java', `class BenachrichtigungTest {
    @Test
    void patientWirdBenachrichtigtUndEntfernt() {
        SarsCov2Analyse a = SarsCov2Analyse.gibInstanz();
        a.gibPersonenListe().clear();                   // Singleton: Zustand zwischen Tests zurücksetzen!
        Patient p = new Patient(7);
        p.sarsCov2TestAbgeben();
        a.benachrichtigen(7, 0);
        assertTrue(a.gibPersonenListe().isEmpty());
    }

    @Test
    void immerDieselbeInstanz() {
        assertSame(SarsCov2Analyse.gibInstanz(), SarsCov2Analyse.gibInstanz());
    }
}`],
    ['note', 'Der erste Test zeigt einen Nachteil des Singletons aus der Prüfung: Der **globale Zustand bleibt zwischen Tests erhalten** und muss manuell zurückgesetzt werden. Das ist mit "schwer testbar" gemeint.'],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie zwei JUnit-Tests für eine Methode `static int note(int punkte)` (IHK-Schlüssel): einen für die Grenze 92/91 und einen für ungültige Eingaben (IllegalArgumentException).', [['code', 'java', `@Test
void grenzeNote1und2() {
    assertEquals(1, Noten.note(92));
    assertEquals(2, Noten.note(91));
}

@Test
void ungueltigePunkte() {
    assertThrows(IllegalArgumentException.class, () -> Noten.note(101));
    assertThrows(IllegalArgumentException.class, () -> Noten.note(-1));
}`]], 4],
    ['quiz', [
      {q: 'Welche Klasse empfiehlt sich in Java für einen Stack?', o: ['ArrayDeque', 'Vector', 'HashMap', 'TreeSet'], a: 0, e: 'Die alte Klasse Stack gilt als veraltet.'},
      {q: 'Was prüft assertSame(a, b)?', o: ['Ob a und b dasselbe Objekt sind', 'Ob a und b gleichen Inhalt haben', 'Ob a größer b ist', 'Ob a null ist'], a: 0, e: 'assertEquals prüft equals.'},
      {q: 'Warum benötigt assertEquals bei double einen dritten Parameter?', o: ['Toleranz wegen Rundungsfehlern', 'Für die Fehlermeldung', 'Für den Datentyp', 'Für die Anzahl Wiederholungen'], a: 0, e: 'Delta.'},
      {q: 'Welche Laufzeit hat Insertion Sort im besten Fall (bereits sortiert)?', o: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'], a: 0, e: 'Keine Verschiebungen nötig.'},
    ]],
    ['see', ['course-java-11', 'eua-unittest', 'eua-patterns', 'eua-sortieren']],
  ],
});
