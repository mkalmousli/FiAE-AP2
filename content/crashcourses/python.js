// Python Crash Course
(function() {
  const page = {
    id: 'course-python', block: 'course', titel: 'Python Crash Course',
    definition: 'Python ist eine einsteigerfreundliche, vielseitige Sprache. Lerne Syntax, Datentypen, Funktionen und OOP in 20 Minuten.',
    merksatz: 'Python = einfach lesbar, keine Klammern, Indentation zaehltt',
    abschnitte: [
      {typ: 'heading', text: '1. Datentypen und Variablen'},
      {typ: 'code', code: 'name = "Max"  # String\nalter = 25  # Integer\nhoehe = 1.80  # Float\nist_student = True  # Boolean'},
      {typ: 'heading', text: '2. Listen und Dictionaries'},
      {typ: 'code', code: 'fruits = ["apple", "banana"]\nstudent = {"name": "Max", "alter": 25}\nprint(fruits[0])  # apple\nprint(student["name"])  # Max'},
      {typ: 'heading', text: '3. If-Else'},
      {typ: 'code', code: 'age = 25\nif age >= 18:\n    print("Erwachsen")\nelse:\n    print("Kind")'},
      {typ: 'heading', text: '4. Schleifen (Loops)'},
      {typ: 'code', code: 'for i in range(5):\n    print(i)\n\nwhile x > 0:\n    print(x)\n    x -= 1'},
      {typ: 'heading', text: '5. Funktionen'},
      {typ: 'code', code: 'def greet(name):\n    return f"Hallo {name}"\n\nprint(greet("Max"))  # Hallo Max'},
      {typ: 'heading', text: '6. Klassen und OOP'},
      {typ: 'code', code: 'class Auto:\n    def __init__(self, marke):\n        self.marke = marke\n    def horn(self):\n        return f"{self.marke} tutet!"\n\nmy_car = Auto("BMW")\nprint(my_car.horn())'},
      {typ: 'heading', text: '7. Listen-Comprehension'},
      {typ: 'code', code: 'squares = [x**2 for x in range(5)]\n# Resultat: [0, 1, 4, 9, 16]'},
      {typ: 'heading', text: '8. Exception Handling'},
      {typ: 'code', code: 'try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("Kann nicht durch 0 teilen")'},
      {typ: 'quiz', quizId: 'python-quiz-1'},
    ]
  };
  AP2.store.register('course-python', page);
})();
