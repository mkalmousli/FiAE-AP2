// AP2 Lernwerkzeug - Haupteinstieg (Loader)
window.AP2 = {};
const scripts = [
  'state.js', 'theme.js', 'styles.js', 'dom.js', 'layout.js',
  'router.js', 'store.js', 'search.js',
  'components/button.js', 'components/card.js', 'components/defbox.js',
  'components/table.js', 'components/tabs.js', 'components/pagerenderer.js',
  'components/quiz.js', 'components/flashcard.js', 
  'components/sidebar.js', 'components/topbar.js',
  'viz/svgKit.js', 'viz/graph.js', 'viz/uml.js', 'viz/er.js', 'viz/chart.js',
  'viz/layers.js', 'tools/manifest-tools.js',
  'tools/subnet-calc.js', 'tools/subnet-ui.js',
  'tools/raid-calc.js', 'tools/raid-ui.js',
  // Content
  'content/pages/home.js', 'content/pages/glossar.js',
  'content/infra/osi-modell.js', 'content/infra/tcp-ip.js',
  'content/infra/subnetting-grundlagen.js', 'content/infra/raid.js',
  'content/infra/security-basics.js', 'content/infra/ports-protokolle.js',
  'content/eua/grundlagen.js', 'content/eua/sortieralgorithmen.js',
  'content/eua/oop.js', 'content/eua/sql-basics.js', 'content/eua/design-patterns.js',
  'content/ps/projektmanagement.js', 'content/ps/uml-klassen.js',
  'content/ps/er-modell.js', 'content/ps/normalisierung.js', 'content/ps/testing-qa.js',
  'content/wiso/arbeitsrecht-basics.js', 'content/wiso/wirtschaft-grundlagen.js',
  'content/deutsch/kommunikation.js',
  'content/manifest.js', 'app.js'
];
let loaded = 0;
const loadScript = (src) => {
  const s = document.createElement('script');
  s.src = src;
  s.onload = () => { loaded++; if (loaded === scripts.length) start(); };
  s.onerror = () => console.error('Failed to load ' + src);
  document.head.appendChild(s);
};
scripts.forEach(loadScript);
const start = () => {
  document.addEventListener('DOMContentLoaded', () => {
    if (AP2.app && AP2.app.start) AP2.app.start();
  }, { once: true });
  if (document.readyState !== 'loading') AP2.app && AP2.app.start && AP2.app.start();
};
