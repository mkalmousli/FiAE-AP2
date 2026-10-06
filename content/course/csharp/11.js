AP2.page('course-csharp-11', {
  b: 'course', g: 'C#', t: 'C# 11: Algorithmen, Unit-Tests und eine komplette Prüfungsaufgabe',
  d: 'Abschluss des C#-Kurses: Standardalgorithmen in C#, **Unit-Tests** mit **xUnit** bzw. **MSTest** und die vollständige Lösung einer Prüfungsaufgabe (Kita-Verwaltung, Winter 2023/24: Klassenhierarchie, polymorphes Array, Menü und Testprogramm). Damit hat man alle Bausteine, die in der AP2 "in der an Ihrer Schule unterrichteten Programmiersprache" verlangt werden.',
  m: '**xUnit: `[Fact]` für einen Test, `[Theory]` + `[InlineData]` für mehrere Eingaben, `Assert.Equal(erwartet, ist)`.** **MSTest: `[TestClass]`, `[TestMethod]`, `Assert.AreEqual`.** **Testfälle: Normalfall, Grenzwerte, Fehlerfall.** **Algorithmus erst als Struktogramm denken, dann übersetzen.**',
  cheat: [
    ['Algorithmen', ['`Array.Sort`, `Array.BinarySearch`', '`list.Sort((a, b) => a.CompareTo(b))`', 'eigene Implementierung kennen', 'Tauschen: `(a[i], a[j]) = (a[j], a[i])`']],
    ['xUnit', ['`[Fact] public void Test() { }`', '`[Theory] [InlineData(92, 1)]`', '`Assert.Equal`, `Assert.True`', '`Assert.Throws<ArgumentException>(() => ...)`']],
    ['MSTest', ['`[TestClass]`', '`[TestMethod]`', '`Assert.AreEqual(e, i)`', '`Assert.ThrowsException<T>`']],
    ['Ausführen', ['`dotnet new xunit`', '`dotnet add reference ../App`', '`dotnet test`', 'Test-Explorer in Visual Studio']],
  ],
  blocks: [
    ['h', 'Algorithmen in C#'],
    ['code', 'csharp', `static int BinaereSuche(int[] a, int x)
{
    int links = 0, rechts = a.Length - 1;
    while (links <= rechts)
    {
        int mitte = (links + rechts) / 2;
        if (a[mitte] == x) return mitte;
        if (a[mitte] < x) links = mitte + 1; else rechts = mitte - 1;
    }
    return -1;
}

static void BubbleSort(int[] a)
{
    for (int i = 0; i < a.Length - 1; i++)
    {
        bool getauscht = false;
        for (int j = 0; j < a.Length - 1 - i; j++)
        {
            if (a[j] > a[j + 1])
            {
                (a[j], a[j + 1]) = (a[j + 1], a[j]);   // Tupel-Tausch
                getauscht = true;
            }
        }
        if (!getauscht) break;
    }
}

static void SelectionSort(int[] a)
{
    for (int i = 0; i < a.Length - 1; i++)
    {
        int min = i;
        for (int j = i + 1; j < a.Length; j++) if (a[j] < a[min]) min = j;
        (a[i], a[min]) = (a[min], a[i]);
    }
}`],
    ['h', 'Unit-Tests mit xUnit'],
    ['code', 'csharp', `using Xunit;

public class StromTests
{
    [Theory]
    [InlineData(0.05, true)]        // untere Grenze
    [InlineData(2.0, true)]         // obere Grenze
    [InlineData(0.049, false)]      // knapp darunter
    [InlineData(2.01, false)]       // knapp darüber
    public void PruefeWert_Grenzen(double wert, bool erwartet)
    {
        var s = new Strom(wert);                     // Arrange
        bool ergebnis = s.PruefeWert();              // Act
        Assert.Equal(erwartet, ergebnis);            // Assert
    }

    [Fact]
    public void BubbleSort_sortiert()
    {
        int[] a = { 5, 1, 4, 2 };
        Algo.BubbleSort(a);
        Assert.Equal(new[] { 1, 2, 4, 5 }, a);
    }

    [Fact]
    public void NegativerPreis_wirft()
    {
        Assert.Throws<ArgumentException>(() => new Artikel("X", -1m));
    }
}`],
    ['code', 'csharp', `// dasselbe mit MSTest
[TestClass]
public class StromTestsMs
{
    [TestMethod]
    public void UntereGrenzeGueltig() => Assert.IsTrue(new Strom(0.05).PruefeWert());

    [TestMethod]
    public void Kapazitaet()
    {
        var werte = Enumerable.Repeat<Messwert>(new Strom(1.8), 3600).ToList();
        Assert.AreEqual(1800.0, new Messreihe(werte, 1000).BerechneKapazitaet(), 0.001);
    }
}`],
    ['h', 'Komplette Prüfungsaufgabe: Kita-Verwaltung (Winter 2023/24)'],
    ['p', 'Anforderungen: Klasse `Person` mit `nachname`, abgeleitet `Kind` (`noteVorschultest`, `IstGut()` bei Note besser als 2,5) und `Erzieherin` (`anzahlBerufsjahre`, `IstGut()` ab 8 Jahren). Ein Testprogramm nimmt bis zu 10 Personen in ein Array auf, fragt jeweils nach dem Typ, erlaubt vorzeitigen Abbruch und gibt alle Namen aus, bei guten mit "ist gut".'],
    ['code', 'csharp', `using System;

abstract class Person
{
    private string nachname = "";
    public string GetNachname() => nachname;
    public void SetNachname(string nachname) => this.nachname = nachname;
    public abstract bool IstGut();
}

class Kind : Person
{
    private double noteVorschultest;
    public double GetNoteVorschultest() => noteVorschultest;
    public void SetNoteVorschultest(double note) => noteVorschultest = note;
    public override bool IstGut() => noteVorschultest < 2.5;
}

class Erzieherin : Person
{
    private int anzahlBerufsjahre;
    public int GetAnzahlBerufsjahre() => anzahlBerufsjahre;
    public void SetAnzahlBerufsjahre(int jahre) => anzahlBerufsjahre = jahre;
    public override bool IstGut() => anzahlBerufsjahre >= 8;
}

class Program
{
    static void Main()
    {
        Person[] personen = new Person[10];
        int anzahl = 0;
        string weiter;
        do
        {
            Console.Write("Kind oder Erzieherin? (k/e): ");
            string typ = (Console.ReadLine() ?? "").Trim().ToLower();
            Console.Write("Nachname: ");
            string name = Console.ReadLine() ?? "";

            if (typ == "k")
            {
                var k = new Kind();
                k.SetNachname(name);
                Console.Write("Note Vorschultest: ");
                k.SetNoteVorschultest(double.Parse(Console.ReadLine()!));
                personen[anzahl++] = k;
            }
            else if (typ == "e")
            {
                var e = new Erzieherin();
                e.SetNachname(name);
                Console.Write("Berufsjahre: ");
                e.SetAnzahlBerufsjahre(int.Parse(Console.ReadLine()!));
                personen[anzahl++] = e;
            }
            else
            {
                Console.WriteLine("Ungültiger Typ");
            }

            Console.Write("Weitere Person aufnehmen? (j/n): ");
            weiter = (Console.ReadLine() ?? "n").Trim().ToLower();
        } while (weiter == "j" && anzahl < personen.Length);

        Console.WriteLine();
        for (int i = 0; i < anzahl; i++)
        {
            Console.Write(personen[i].GetNachname());
            if (personen[i].IstGut()) Console.Write(" ist gut");   // Polymorphie
            Console.WriteLine();
        }
    }
}`],
    ['tip', 'Punkte in solchen Aufgaben gibt es für: abstrakte Basisklasse mit abstrakter Methode, korrekte Vererbung mit `override`, private Attribute mit Get/Set, polymorphes Array vom Basistyp, Typabfrage beim Einlesen, Abbruchmöglichkeit und Begrenzung auf 10, Ausgabe mit `IstGut()` **ohne** Typprüfung (das ist der Sinn der Polymorphie).'],
    ['h', 'Übungen'],
    ['qa', 'Schreiben Sie einen xUnit-Theory-Test für eine Methode `int Note(int punkte)` mit den Grenzfällen 92, 91, 30 und 29.', [['code', 'csharp', `[Theory]
[InlineData(92, 1)]
[InlineData(91, 2)]
[InlineData(30, 5)]
[InlineData(29, 6)]
public void Note_Grenzen(int punkte, int erwartet)
{
    Assert.Equal(erwartet, Noten.Note(punkte));
}`]], 4],
    ['quiz', [
      {q: 'Welches Attribut kennzeichnet in xUnit einen Test mit Parametern?', o: ['[Theory] mit [InlineData]', '[Fact]', '[TestMethod]', '[Test]'], a: 0, e: '[Fact] ist ein Test ohne Parameter.'},
      {q: 'Wie tauscht man in C# zwei Array-Elemente kurz?', o: ['(a[i], a[j]) = (a[j], a[i]);', 'swap(a[i], a[j]);', 'a.Swap(i, j);', 'a[i] <-> a[j];'], a: 0, e: 'Tupel-Dekonstruktion.'},
      {q: 'Warum ruft man IstGut() ohne Typprüfung auf?', o: ['Polymorphie wählt die passende Implementierung', 'Weil alle Objekte Kinder sind', 'Weil IstGut static ist', 'Das ist ein Fehler'], a: 0, e: 'Dynamische Bindung.'},
      {q: 'Mit welchem Befehl führt man .NET-Tests aus?', o: ['dotnet test', 'dotnet run', 'dotnet check', 'msbuild test'], a: 0, e: 'Findet alle Testprojekte.'},
    ]],
    ['see', ['course-csharp-10', 'eua-unittest', 'eua-umlcode', 'eua-algoexam']],
  ],
});
