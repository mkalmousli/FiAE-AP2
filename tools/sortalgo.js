// Sortieralgorithmen als Einzelschritte: jede Funktion meldet (Feld, markierte Indizes).
(function () {
  const bubble = (a, rec) => {
    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - 1 - i; j++) {
        rec(a, [j, j + 1]);
        if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; rec(a, [j, j + 1]); }
      }
    }
  };
  const selection = (a, rec) => {
    for (let i = 0; i < a.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < a.length; j++) { rec(a, [min, j]); if (a[j] < a[min]) min = j; }
      if (min !== i) { [a[i], a[min]] = [a[min], a[i]]; rec(a, [i, min]); }
    }
  };
  const insertion = (a, rec) => {
    for (let i = 1; i < a.length; i++) {
      let j = i;
      while (j > 0) {
        rec(a, [j - 1, j]);
        if (a[j - 1] <= a[j]) break;
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        rec(a, [j - 1, j]);
        j--;
      }
    }
  };
  const quick = (a, rec) => {
    const part = (lo, hi) => {
      const pivot = a[hi];
      let i = lo;
      for (let j = lo; j < hi; j++) {
        rec(a, [j, hi]);
        if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; rec(a, [i, j]); i++; }
      }
      [a[i], a[hi]] = [a[hi], a[i]];
      rec(a, [i, hi]);
      return i;
    };
    const run = (lo, hi) => { if (lo < hi) { const p = part(lo, hi); run(lo, p - 1); run(p + 1, hi); } };
    run(0, a.length - 1);
  };
  AP2.sortAlgos = {
    bubble: ['Bubble Sort, O(n^2)', bubble], selection: ['Selection Sort, O(n^2)', selection],
    insertion: ['Insertion Sort, O(n^2)', insertion], quick: ['Quick Sort, O(n log n) im Mittel', quick],
  };
})();
