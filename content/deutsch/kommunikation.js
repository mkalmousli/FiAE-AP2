// Kommunikation: Sender-Empfaenger, 4-Ohren-Modell
(function() {
  const page = {
    id: 'deutsch-kommunikation', block: 'deutsch', titel: 'Kommunikationsmodelle',
    definition: 'Kommunikation ist der Austausch von Informationen zwischen Sender und Empfaenger. Das 4-Ohren-Modell von Schulz von Thun zeigt 4 Ebenen einer Nachricht. Missverstaendnisse entstehen oft durch Unklarheiten.',
    merksatz: 'SEAM: Sachinhalt, Ebene, Appell, Missverstaendnisse',
    abschnitte: [
      {typ: 'heading', text: '4-Ohren-Modell'},
      {typ: 'list', items: [
        'Sachinhalt: faktische Information (worüber rede ich)',
        'Beziehung: wie wir uns zueinander verhalten',
        'Selbstoffenbarung: was gebe ich über mich preis',
        'Appell: was will ich vom anderen erreichen',
      ]},
      {typ: 'heading', text: 'Aktives Zuhören'},
      {typ: 'list', items: [
        'Aufmerksamkeit: konzentriert zuhören',
        'Klärung: Fragen bei Unklarheiten',
        'Validierung: Gefühle des Gegenübers anerkennen',
        'Feedback: das Verstandene zusammenfassen',
      ]},
    ]
  };
  AP2.store.register('deutsch-kommunikation', page);
})();
