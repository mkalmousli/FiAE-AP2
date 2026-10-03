AP2.page('eua-exceptions', {
  b: 'eua', g: 'Fehlerbehandlung', t: 'Exceptions und das try-catch-Prinzip',
  d: 'Eine **Exception (Ausnahme)** ist ein **Ereignis zur Laufzeit**, das den normalen Ablauf stört (zum Beispiel Division durch 0, Datei nicht gefunden). Mit **`try`** versucht man, Code auszuführen, mit **`catch`** fängt man die Ausnahme ab und behandelt sie, **`finally`** läuft **immer** (Aufräumen), mit **`throw`** löst man selbst eine Ausnahme aus. So stürzt das Programm bei Fehlern nicht ab.',
  m: '**try = versuchen, catch = auffangen, finally = immer aufräumen, throw = werfen.** Der **speziellste** catch-Block steht **zuerst**. **Checked** Exceptions (Java) **muss** man behandeln oder weiterreichen (`throws`), **unchecked** (RuntimeException) nicht.',
  cheat: [
    ['Bausteine', ['`try { riskanter Code }`', '`catch (Typ e) { Behandlung }`', '`finally { Aufräumen }` (läuft immer)', '`throw new ...Exception("Text");`', '`throws` in der Methodensignatur (Java)']],
    ['Java: Arten', ['**Checked:** muss behandelt werden (`IOException`, `SQLException`)', '**Unchecked / RuntimeException:** Programmierfehler (`NullPointerException`, `ArithmeticException`, `IndexOutOfBounds`)', '**Error:** schwere Systemfehler (`OutOfMemoryError`), nicht abfangen']],
    ['Regeln', ['**Spezielle** Exceptions vor **allgemeinen** fangen', 'Nicht **leer** schlucken (catch ohne Handlung)', 'Ressourcen mit **finally** oder **try-with-resources** schließen', 'Aussagekräftige Meldungen, Fehler **protokollieren**']],
    ['Typische Exceptions', ['`ArithmeticException` (/ durch 0)', '`NullPointerException`', '`ArrayIndexOutOfBoundsException`', '`NumberFormatException`', '`FileNotFoundException`, `IOException`']],
  ],
  blocks: [
    ['h', 'Warum Fehlerbehandlung?'],
    ['p', 'Fehler gehören zum Leben eines Programms: Der Benutzer tippt "abc" statt einer Zahl, die Datei fehlt, das Netzwerk bricht ab, die Datenbank ist nicht erreichbar. Ohne Fehlerbehandlung **stürzt das Programm ab**. Mit **Exceptions** trennt man den **normalen Ablauf** (Hauptlogik) von der **Fehlerbehandlung**. Das Programm kann sinnvoll reagieren (Meldung, erneut versuchen, Alternative).'],
    ['codes', [
      ['java', `try {
    int zahl = Integer.parseInt(eingabe);        // kann NumberFormatException auslösen
    int ergebnis = 100 / zahl;                   // kann ArithmeticException auslösen
    System.out.println("Ergebnis: " + ergebnis);
} catch (NumberFormatException e) {              // spezieller Fehler zuerst
    System.out.println("Bitte eine Zahl eingeben!");
} catch (ArithmeticException e) {
    System.out.println("Durch 0 kann man nicht teilen.");
} catch (Exception e) {                          // allgemeiner Fehler zuletzt
    System.out.println("Unerwarteter Fehler: " + e.getMessage());
} finally {
    System.out.println("Fertig.");               // läuft IMMER (Fehler oder nicht)
}`],
      ['csharp', `try
{
    int zahl = int.Parse(eingabe);               // FormatException
    Console.WriteLine(100 / zahl);               // DivideByZeroException
}
catch (FormatException)       { Console.WriteLine("Bitte eine Zahl eingeben!"); }
catch (DivideByZeroException) { Console.WriteLine("Durch 0 nicht möglich."); }
catch (Exception ex)          { Console.WriteLine("Fehler: " + ex.Message); }
finally                       { Console.WriteLine("Fertig."); }`],
      ['python', `try:
    zahl = int(eingabe)                          # ValueError
    print(100 / zahl)                            # ZeroDivisionError
except ValueError:
    print("Bitte eine Zahl eingeben!")
except ZeroDivisionError:
    print("Durch 0 nicht möglich.")
except Exception as e:
    print("Unerwartet:", e)
else:
    print("Alles gut")                           # nur wenn KEIN Fehler
finally:
    print("Fertig.")`],
    ]],
    ['h', 'Ablauf: Wohin springt das Programm?'],
    ['diagram', {w: 760, h: 270, keep: 640, cap: 'Ablauf von try-catch-finally. Tritt im try-Block ein Fehler auf, springt das Programm sofort in den passenden catch-Block.', nodes: [
      {id: 't', k: 'box', x: 130, y: 60, w: 180, h: 50, t: ['try-Block', 'Anweisungen'], s: 'accent'}, {id: 'ok', k: 'term', x: 130, y: 150, w: 170, h: 36, t: 'kein Fehler', s: 'ok'}, {id: 'c', k: 'box', x: 400, y: 60, w: 180, h: 50, t: ['catch-Block', 'Fehler behandeln'], s: 'bad'}, {id: 'f', k: 'box', x: 400, y: 190, w: 200, h: 50, t: ['finally-Block', 'läuft immer'], s: 'solid'}, {id: 'e', k: 'term', x: 660, y: 190, w: 100, h: 36, t: 'weiter'},
    ], edges: [{a: 't', b: 'ok', t: 'ohne Exception', lo: [40, 0]}, {a: 't', b: 'c', t: 'Exception', lo: [0, -12]}, {a: 'ok', b: 'f', via: [[130, 190]]}, {a: 'c', b: 'f'}, {a: 'f', b: 'e'}]}],
    ['steps', ['Der Code im **try-Block** wird ausgeführt. Bei einem Fehler wird die Ausführung **sofort abgebrochen** (der Rest des try-Blocks wird übersprungen).', 'Das System sucht den **ersten passenden catch-Block** (von oben nach unten) und führt ihn aus.', 'Der **finally-Block** läuft **immer**: bei Erfolg, bei behandeltem Fehler und sogar bei einem nicht abgefangenen Fehler.', 'Danach läuft das Programm **hinter dem try-catch** weiter (wenn der Fehler behandelt wurde).']],
  ],
});
