// Design Patterns - Entwurfsmuster
(function() {
  const page = {
    id: 'eua-design-patterns', block: 'eua', titel: 'Design Patterns',
    definition: 'Design Patterns sind wiederverwendbare Loesungsschablonen fuer oefter auftretende Probleme in der OOP. Sie bieten bewährte Strukturen und Konzepte zur Loesung. Wichtige Patterns: Singleton, Factory, Observer, Strategy.',
    merksatz: 'SFOS: Singleton, Factory, Observer, Strategy',
    abschnitte: [
      {typ: 'heading', text: 'Wichtige Patterns'},
      {typ: 'list', items: [
        'Singleton: nur eine Instanz der Klasse existiert (Logger, Config)',
        'Factory: zentrale Stelle zum Erzeugen von Objekten',
        'Observer: Objekte beobachten sich (Event-Handling)',
        'Strategy: mehrere Algorithmen austauschbar (Sortieren)',
      ]},
      {typ: 'heading', text: 'Singleton Beispiel'},
      {typ: 'text', inhalt: 'class Logger { static instance; constructor() { if (Logger.instance) return Logger.instance; Logger.instance = this; }}'},
      {typ: 'heading', text: 'Observer Beispiel'},
      {typ: 'text', inhalt: 'Button.onclick = () => notifyAllListeners(). Listeners erfahren von Aenderung ohne direkten Kontakt.'},
    ]
  };
  AP2.store.register('eua-design-patterns', page);
})();
