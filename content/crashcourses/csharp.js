// C# Crash Course
(function() {
  const page = {
    id: 'course-csharp', block: 'course', titel: 'C# Crash Course',
    definition: 'C# ist eine moderne, typsichere Sprache auf der .NET Plattform. Lerne die Grundlagen in 20 Minuten.',
    merksatz: 'C# = Java Alternative, typsicher, modern, mit async/await',
    abschnitte: [
      {typ: 'heading', text: '1. Programm-Struktur'},
      {typ: 'code', code: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hallo Welt!");\n    }\n}'},
      {typ: 'heading', text: '2. Datentypen'},
      {typ: 'code', code: 'int alter = 25;  // Ganze Zahl\nstring name = "Max";  // Text\ndouble hoehe = 1.80;  // Fliesskommazahl\nbool ist_aktiv = true;  // Boolean'},
      {typ: 'heading', text: '3. Arrays und Listen'},
      {typ: 'code', code: 'int[] nummern = {1, 2, 3};\nList<string> namen = new List<string> {"Max", "Anna"};\nnamen.Add("Peter");'},
      {typ: 'heading', text: '4. Kontrollstrukturen'},
      {typ: 'code', code: 'if (alter >= 18) {\n    Console.WriteLine("Erwachsen");\n}\n\nfor (int i = 0; i < 5; i++) {\n    Console.WriteLine(i);\n}'},
      {typ: 'heading', text: '5. Funktionen (Methoden)'},
      {typ: 'code', code: 'int Add(int a, int b) {\n    return a + b;\n}\n\nint result = Add(5, 3);  // 8'},
      {typ: 'heading', text: '6. Klassen und OOP'},
      {typ: 'code', code: 'class Auto {\n    public string Marke { get; set; }\n    \n    public void Fahren() {\n        Console.WriteLine(Marke + " faehrt!");\n    }\n}\n\nAuto mein_auto = new Auto { Marke = "BMW" };'},
      {typ: 'heading', text: '7. Properties (Getter/Setter)'},
      {typ: 'code', code: 'class Person {\n    private int _alter;\n    public int Alter {\n        get { return _alter; }\n        set { _alter = value; }\n    }\n}'},
      {typ: 'heading', text: '8. Exception Handling'},
      {typ: 'code', code: 'try {\n    int x = 10 / 0;\n} catch (DivideByZeroException) {\n    Console.WriteLine("Fehler!");\n} finally {\n    Console.WriteLine("Aufgeraeumt");\n}'},
      {typ: 'quiz', quizId: 'csharp-quiz-1'},
    ]
  };
  AP2.store.register('course-csharp', page);
})();
