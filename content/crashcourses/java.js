// Java Crash Course
(function() {
  const page = {
    id: 'course-java', block: 'course', titel: 'Java Crash Course',
    definition: 'Java ist eine universelle, objektorientierte Sprache mit "Write Once, Run Anywhere" Prinzip. Lerne die Basics in 20 Minuten.',
    merksatz: 'Java = typsicher, OOP-fokussiert, Klassen.Methoden(), System.out.println()',
    abschnitte: [
      {typ: 'heading', text: '1. Programm-Struktur'},
      {typ: 'code', code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hallo Welt!");\n    }\n}'},
      {typ: 'heading', text: '2. Datentypen'},
      {typ: 'code', code: 'int alter = 25;  // Ganze Zahl\nString name = "Max";  // Text\ndouble hoehe = 1.80;  // Fliesskommazahl\nboolean ist_aktiv = true;  // Boolean'},
      {typ: 'heading', text: '3. Arrays und Collections'},
      {typ: 'code', code: 'int[] nummern = {1, 2, 3};\nList<String> namen = new ArrayList<>();\nnamen.add("Max");\nnamen.add("Anna");'},
      {typ: 'heading', text: '4. If-Else und Schleifen'},
      {typ: 'code', code: 'if (alter >= 18) {\n    System.out.println("Erwachsen");\n}\n\nfor (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}'},
      {typ: 'heading', text: '5. Methoden'},
      {typ: 'code', code: 'public static int add(int a, int b) {\n    return a + b;\n}\n\nint result = add(5, 3);  // 8'},
      {typ: 'heading', text: '6. Klassen und Objekte'},
      {typ: 'code', code: 'public class Auto {\n    private String marke;\n    \n    public Auto(String marke) {\n        this.marke = marke;\n    }\n    \n    public void fahren() {\n        System.out.println(marke + " faehrt!");\n    }\n}'},
      {typ: 'heading', text: '7. Vererbung'},
      {typ: 'code', code: 'class Fahrzeug { }\nclass Auto extends Fahrzeug { }  // Auto ist ein Fahrzeug'},
      {typ: 'heading', text: '8. Interfaces und Abstraktion'},
      {typ: 'code', code: 'interface Fahrzeug {\n    void fahren();\n}\n\nclass Auto implements Fahrzeug {\n    public void fahren() { }\n}'},
      {typ: 'heading', text: '9. Exception Handling'},
      {typ: 'code', code: 'try {\n    int x = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println("Fehler: " + e);\n} finally {\n    System.out.println("Aufgeraeumt");\n}'},
      {typ: 'quiz', quizId: 'java-quiz-1'},
    ]
  };
  AP2.store.register('course-java', page);
})();
