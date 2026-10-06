# AP2 Study Plan — Oct 4 to Nov 10, 2026

Exam: **Nov 11–13**. Time budget: **38 days × 3h ≈ 114h**.
Material: this site (`index.html`, served with `python3 -m http.server`). Topic checklist: `TOPICS.md` (tick boxes as you finish a topic).

## How a day works (3h)

| Block | Time | What |
|---|---|---|
| WiSo | 30 min | One WiSo page + its quiz (see WiSo column) |
| Main | 2h | The day's topics: read the page, then **do the quiz and the calculation tools** (`tools/`: subnet, netzplan, raid, roi, ...). Don't only read |
| Recall | 30 min | Yesterday's topics again, from memory, on paper: definitions, a drawing, a calculation |

Rules:
1. **Calculations and diagrams on paper**, never just in your head. You write by hand in the exam.
2. Every day is a study day. Sundays are lighter catch-up days; if you fall behind, use them, don't skip topics.
3. Each mock exam is **timed** (90 min), then 60 min of review. Redo every task you lost points on.
4. A topic is done when you can do its quiz and one exercise without looking.
5. Write wrong answers into a "Fehlerliste" (one line each). That list is your last-week revision.

## Phase 0 — Setup (Sun Oct 4)

- Read `ref/strategie` (Operatoren, Zeitmanagement), `ref/formeln`, `ref/glossar`.
- **Diagnostic:** timed `exam/ps-4` and `exam/eua-3` (the shortest ones). Note weak areas in the Fehlerliste. Those areas get extra time later.

## Phase 1 — PS + Infrastruktur (Oct 5 – Oct 20)

| Date | Main block (2h) | WiSo (30 min) |
|---|---|---|
| Mon Oct 5 | PS: phasen, vorgehen, **netzplan** (calc) | bbig |
| Tue Oct 6 | PS: gantt, aufwand, **kosten/ROI** (calc), orga | jarbschg |
| Wed Oct 7 | PS: scrum, lastenheft, istsoll, usecase | kammern |
| Thu Oct 8 | PS UML: klassen, aktivitaet, sequenz (draw each) | arbeitsvertrag |
| Fri Oct 9 | PS UML: zustand, struktogramm; redraw all UML from memory | kuendigung |
| Sat Oct 10 | PS Daten: **ER**, relational, **normalisierung** (exercises) | urlaub |
| Sun Oct 11 | **Catch-up** + redo quizzes of Oct 5–10 | krank |
| Mon Oct 12 | PS: ergonomie, wireframe, testarten, verifikation | tarif |
| Tue Oct 13 | PS: dsgvo, lizenzen, vertraege, ide, git | gewerkschaft |
| Wed Oct 14 | Infra: osi, tcpip, tcpudp, ports | betriebsrat |
| Thu Oct 15 | Infra: **ipv4 + subnetting** (full 2h, many exercises) | sv (overview) |
| Fri Oct 16 | Infra: ipv6, topologien, komponenten, medien, radius | kv |
| Sat Oct 17 | Infra: storage, **raid**, **verfuegbarkeit**, backup (calc) | rv |
| Sun Oct 18 | **Catch-up** + Infra: cia, firewall | alv |
| Mon Oct 19 | Infra: krypto, pki, tls, isms, angriffe | pv |
| Tue Oct 20 | **Mock `exam/ps-1`** (90 min) + review | uv |

## Phase 2 — EuA (Oct 21 – Oct 31)

Write all code and pseudocode **by hand** in this phase.

| Date | Main block (2h) | WiSo (30 min) |
|---|---|---|
| Wed Oct 21 | datentypen, kontroll, funktionen, rekursion | kreislauf |
| Thu Oct 22 | pseudocode, pap, struktogramm (read and write) | markt |
| Fri Oct 23 | oop, saeulen, konstruktor, interface | konjunktur |
| Sat Oct 24 | listen, stackqueue (draw the operations) | unternehmen |
| Sun Oct 25 | **Catch-up** + baeume, hash | steuern |
| Mon Oct 26 | sortieren (trace by hand), suchen | gehalt |
| Tue Oct 27 | onotation, patterns | vertrag |
| Wed Oct 28 | testfaelle, unittest, exceptions, debugging | staat |
| Thu Oct 29 | SQL: select, join (write queries on paper) | WiSo quiz mix: BBiG–Tarif |
| Fri Oct 30 | SQL: group, dml, sqler, sqldata | WiSo quiz mix: Sozialversicherung–Steuern |
| Sat Oct 31 | **Mock `exam/eua-1`** (90 min) + review | — (skipped, mock day) |

## Phase 3 — Mock exams and weak spots (Nov 1 – Nov 10)

Mocks alternate PS and EuA. Spend the rest of each day on the Fehlerliste: reread the pages behind your wrong answers.

| Date | Plan |
|---|---|
| Sun Nov 1 | Fix errors from the first two mocks. Redo the calculation tools (netzplan, subnet, raid, roi) |
| Mon Nov 2 | **Mock `exam/ps-2`** + review |
| Tue Nov 3 | **Mock `exam/eua-2`** + review |
| Wed Nov 4 | Weak topics. **Deutsch, 1h**: kommunikation, brief (only if the school exam is still ahead; see below) |
| Thu Nov 5 | **Mock `exam/ps-3`** + review |
| Fri Nov 6 | **Mock `exam/eua-3`** (SQL and algorithms focus) + review |
| Sat Nov 7 | **Mock `exam/wiso-1`** (60 min) + review. Then weak WiSo topics. Deutsch, 1h: eroerterung, text |
| Sun Nov 8 | **Mock `exam/wiso-2`** (60 min) + review. Then `exam/info-1` |
| Mon Nov 9 | **Real old IHK exams** (see below), whatever you have left. Fehlerliste. Formeln and glossar |
| Tue Nov 10 | **Light day, max 1.5h.** Formeln, glossar, strategie. Pack the bag (ID, calculator, pens). Sleep early |

## Things only you can fill in

- [ ] **Projektarbeit (50% of the grade):** is the documentation submitted? When is the Präsentation and Fachgespräch? If not done, it needs its own time block and this plan must shrink. Tell me and I'll rebalance.
- [ ] **Real old IHK exams.** The mock exams on this site are written for practice (fictional companies), so the real format will feel different. Get 3–4 real ones (ap2-fiae.de, the IHK shop, your Berufsschule) and swap them in for some mocks.
- [ ] **Exam weights.** `TOPICS.md` says 10% per subject. Check the official IHK document linked there. It decides how much time WiSo deserves.
- [ ] **Deutsch:** ask your teacher for the date and format. The site has `content/de`; plan about 5h total.
- [ ] **Exam day order:** once you know which subject is on which day (Nov 11–13), put the matching mock on the same weekday in your last week.

## If you fall behind

Cut in this order, last cut first:
1. Course pages (`content/course`: HTML/CSS/Python/etc.). They are not exam topics.
2. Design patterns (keep Singleton, Observer, Strategy), IPv6 details, Kerberos/RADIUS details.
3. Deutsch to the minimum.

**Never cut:** Netzplan, ROI, subnetting, RAID, Verfügbarkeit, UML/ER drawing, normalization, SQL, sorting/pseudocode traces, WiSo quizzes, mock exams.
