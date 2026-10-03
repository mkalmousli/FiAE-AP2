// Sortieralgorithmen
(function() {
  const page = {
    id: 'eua-sortieralgorithmen', block: 'eua', titel: 'Sortieralgorithmen',
    definition: 'Sortieralgorithmen ordnen eine Liste von Elementen nach einem bestimmten Kriterium. Verschiedene Algorithmen haben unterschiedliche Laufzeitverhalten (O-Notation).',
    merksatz: 'Bubble=slow, Quick=fast, Merge=balanced',
    abschnitte: [
      {typ: 'heading', text: 'Wichtige Sortieralgorithmen'},
      {typ: 'list', items: [
        'Bubblesort: O(n^2), einfach, langsam, stabil',
        'Insertionsort: O(n^2), einfach, gut fuer kleine Listen',
        'Quicksort: O(n*log n) Durchschnitt, schnell, instabil',
        'Mergesort: O(n*log n), garantiert, stabil, braucht extra Speicher',
        'Selectionsort: O(n^2), einfach, minimum lokalisieren',
      ]},
      {typ: 'heading', text: 'Laufzeitvergleich'},
      {typ: 'text', inhalt: 'O(1) = konstant, O(n) = linear, O(n^2) = quadratisch, O(n*log n) = linearithmisch, O(2^n) = exponentiell'},
      {typ: 'text', inhalt: 'Stabil = gleiche Elemente behalten ihre Reihenfolge'},
    ]
  };
  AP2.store.register('eua-sortieralgorithmen', page);
})();
