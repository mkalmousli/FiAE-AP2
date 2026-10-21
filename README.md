# FiAE-AP2

Study site for the IHK AP2 exam (Fachinformatiker Anwendungsentwicklung): Planen eines Softwareproduktes (incl. infrastructure and IT security), Entwicklung und Umsetzung von Algorithmen, WiSo, two complete mock exam sets, calculators, crash courses, and a gamified trainer.

Live: https://al-mo.de/apps/fiae-ap2/

Plain JavaScript, no dependencies. Serve the folder with any static server, e.g. `python3 -m http.server`.

## What's inside

- **~250 topic pages** (`content/`): exam definition, mnemonic, cheat sheet, explanation, diagrams, exam-style tasks with model answers, quiz. Topics follow the updated IHK catalog (12/2024), including stakeholder/risk analysis, ISO 9000/25010, coverage tests, TOM, architecture/MVC, VLSM, IPv6 subnetting, routing, VoIP, web security, OAuth/SSO, blockchain, neural networks, transactions/views/DCL, sustainability, Arbeitsschutz, Prokura and more.
- **Trainer** (`#/trainer`): daily mix with Leitner spaced repetition over all ~1,100 quiz questions and open exam tasks (as self-rated flashcards), 60-second Blitz mode, error training, per-topic and per-block drills, keyboard shortcuts.
- **Gamification** (`core/game.js`): XP with combo bonus, levels with titles, daily goal, learning streak, 40 achievements, mastery stars per topic, activity heatmap, exam countdown. Progress is stored in `localStorage` only.
- **Themenkarte** (`#/themen`): every topic as a tile with mastery, filterable by block, text, open/weak/due.
- **Mock exams** (`exam1-*`, `exam2-*`): timed, self-graded with IHK grading key.
- **Calculators** (`tools/`): subnetting, VLSM, IPv6 subnets, routing decisions, RAID, availability, network plan, ROI, DPMO, energy cost, transfer time, RSA, toy blockchain, neuron, check digits, pass/grade rules incl. Ergänzungsprüfung, and more.

## Development and build

Locally (`localhost`) the site loads every file listed in `manifest/*.js` individually, so edits show up after a reload without a build.

For deployment, bundle everything into one file:

```sh
node build.mjs
```

This writes `bundle.js` (one request instead of ~430) and stamps its version into `main.js` and `sw.js`. Run it after every content or code change before deploying; production loads `bundle.js?v=<hash>`. Append `?dev` to force single files, `?bundle` to test the bundle locally.

`sw.js` is a service worker: the versioned bundle is cached, everything else is network-first with cache fallback, so the site works offline and can be installed as an app (`manifest.webmanifest`).

## Structure

| Folder | Content |
|---|---|
| `core/` | state, theme, router, store, search index, question bank (`bank.js`), game engine (`game.js`) |
| `ui/` | rendering blocks, page view, home, trainer, Themenkarte, Erfolge, HUD, effects |
| `viz/` | SVG diagram engine (flow, cycle, tree, layers, UML classes, sequence, Gantt, Nassi-Shneiderman, safety signs) |
| `tools/` | interactive calculators |
| `content/<block>/` | topic pages, registered with `AP2.page(id, ...)` and extended with `AP2.add` |
| `manifest/` | load order; the order of pages there is the learning path shown in the navigation |
