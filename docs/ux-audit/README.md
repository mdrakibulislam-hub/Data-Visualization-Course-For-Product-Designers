# Start here · Graphnotes

Senior product design and UX audit, 23 November 2026. Scope: the account-free learning journey, all 12 lessons, Chart Lab, flashcards, quizzes, both capstone cases, sources, navigation, three themes, and legacy/error routes.

The audit identified **15 distinct issues: 12 medium and 3 low**. Related symptoms across pages are grouped under one shared fix. No high-severity task blocker was found in the main learning journey. **All 15 have been resolved and retested.** Implementation and verification are recorded below; this is a targeted usability/accessibility review, not a certification.

## What to fix first

1. **Make the learning material readable** — one 16 px body scale, readable submitted answers, and useful correct-answer feedback.
2. **Make repeated actions easy to use** — larger targets, reliable focus after navigation and feedback, and preserved project workspace context.
3. **Teach the right chart choices** — task-based chart families, stable lab navigation, and chart marks that remain distinguishable in sepia.

## Views reviewed

| View / journey | Routes and states | Findings / evidence |
| --- | --- | --- |
| Shared shell and appearance | Expanded/collapsed sidebar, mobile drawer, Default / Sepia / Dark | [Shared findings](#shared-system); [mobile navigation before](evidence/before/shell-mobile-navigation.png) |
| Course overview | Start/resume, outline, mobile lesson times, live chart | GN01, GN02, GN03, GN04, L06; [full desktop](evidence/before/learning-overview-desktop.png), [full mobile](evidence/before/learning-overview-mobile.png) |
| Lesson reader | All 12 routes, chart variants, quiz / submitted / retry, values tables | AN01, L02, L05; [full desktop](evidence/before/learning-lesson-desktop.png), [full mobile](evidence/before/learning-lesson-mobile.png) |
| Chart Lab | Experiment, browse catalog, atlas, filters / empty results | LAB01, LAB04, LAB05; [annotated lab report](lab-findings.md) |
| Flashcards | Question, answer, rating / swipe, saved position | GN01, GN02; [desktop](evidence/before/practice-flashcards-desktop.png), [mobile answer](evidence/before/practice-flashcards-answer-mobile.png) |
| Quizzes | Topic catalog, question, wrong/correct feedback, results / retry, replacement confirmation | AN01, PR04, PR05; [practice report](practice-findings.md) |
| Capstone | Both briefs, tables, workspace, independent notes / checks, project switching | PR06; [desktop workspace](evidence/before/practice-capstone-workspace-desktop.png), [full mobile workspace](evidence/before/practice-capstone-workspace-mobile.png) |
| Sources | Article and book groups, reading notes, lesson references | GN01; [full desktop](evidence/before/learning-sources-desktop.png), [full mobile](evidence/before/learning-sources-mobile.png). Grouping was already logical and retained. |
| Legacy account and recovery | `/login`, `/dashboard`, unknown page and lesson | GN05; [account desktop before](evidence/before/shell-login-desktop.png), [account mobile before](evidence/before/shell-login-mobile.png), [missing lesson](evidence/before/shell-missing-lesson.png) |

## Shared system

### GN01 · Medium · Use a readable, consistent learning type scale

**Observed:** The shared theme uses a 14 px body. Flashcard answers and many practice descriptions use that size; overview lesson titles are 14 px while their module descriptions are 15 px. Chart Lab experiment and chart headings share the same 17 px size, and atlas headings are reduced to 14 px. Mobile SVG/column labels can render around 10–11 px after scaling.

**Why it matters:** Primary explanations are harder to read, and size fails to communicate content hierarchy.

**Recommended change / implementation:** Set Astryx's scale to base 16 and ratio 1.2; retain Inter / Inter Display and compact page titles. Use the shared heading ramp for sections and items, 16 px lesson titles, 15 px outline descriptions, and 14 px metadata/tables. Remove local overrides that flatten the lab hierarchy. Responsive SVG label sizing also compensates for viewBox scaling. This resolves learning L04/L07, practice PR01 and lab LAB03.

### GN02 · Medium · Enlarge controls used repeatedly

**Observed:** Primary flashcard actions are 36 px high, chart view radio segments 24 px, lab browsing buttons 28 px, mobile Appearance 28 px, mobile menu 32 px, and nested lesson links 36 px. These are frequently used controls, rather than isolated inline references.

**Why it matters:** Small, neighboring targets leave little tolerance on touch screens and create inconsistent interaction density.

**Recommended change / implementation:** Theme labelled and icon buttons, tabs, nested navigation, radio choices and segment options to at least 44 px. Only expand the relevant lesson group automatically, keeping the practice and overview navigation quieter. Allow segmented controls to grow/wrap, and enlarge disclosure and standalone back/lesson links. This combines L03, PR02 and LAB02. Inline links inside running paragraphs retain natural text geometry.

### GN03 · Medium · Give sepia chart marks sufficient contrast

**Observed:** Neutral bars `rgb(132,148,163)` and teal series `rgb(8,163,163)` have **2.83:1** and **2.82:1** contrast against the sepia card `rgb(252,243,230)`, below the 3:1 target for essential chart graphics. Primary and secondary text already have strong contrast: 13.09:1 and 6.67:1 in that theme.

**Why it matters:** A quiet reading mode should not make the data harder to distinguish.

**Recommended change / implementation:** Adjust semantic chart neutral and teal tokens through the shared theme, with separate light/dark values. Keep the brand accent and the visual differences between themes. Text contrast was measured separately, rather than treating every subdued element as a defect.

### GN04 · Medium · Move focus into a newly opened page

**Observed:** Activating Start learning replaces the overview and leaves `document.activeElement` at the body. The new lesson heading is not focusable.

**Why it matters:** Keyboard and screen-reader users can lose their place after a route change.

**Recommended change / implementation:** After a settled pathname change, focus the destination heading or hash target with `preventScroll`, preserving browser scroll restoration. Query-only tab/filter changes retain their own local focus behavior.

### GN05 · Medium · Remove the legacy account dead end

**Observed:** Direct `/login` shows Create an account and Sign in, while the course saves locally and needs no login. The isolated preview also issues a failing auth-session request. `/dashboard` is a leftover authenticated scaffold rather than a learning dashboard.

**Why it matters:** These routes introduce an unnecessary account journey and uncertainty about where progress is stored.

**Recommended change / implementation:** Replace `/login` with a short, accurate explanation of local progress and a course action. Redirect legacy `/dashboard` to the course without an authentication request. Preserve the existing local progress data. No account submission was performed during testing.

## Lesson and answer feedback

### AN01 · Medium · Treat submitted answers as readable content

**Observed:** Both lesson checks and standalone quizzes disable the entire radio group after submission. Prompts/options become faint, while a wrong selected choice retains the strong accent treatment.

**Why it matters:** Feedback should make the chosen and correct answers easy to compare.

**Recommended change / implementation:** Use a shared static answer review at full opacity. Show explicit Correct answer / Your answer labels and check/cross symbols, with the explanation beneath. This combines lesson L01 and practice PR03. [Annotated practice evidence](practice-findings.md#pr03--medium--submitted-quiz-choices-look-disabled-rather-than-readable).

### L02 · Medium · Keep keyboard position through answer feedback and retry

**Observed:** Lesson Check answer reveals feedback without moving focus; Try again removes the focused retry button without returning focus to the choices.

**Why it matters:** A learner must rediscover the result or the question after each action.

**Recommended change / implementation:** Focus the submitted feedback region only after an explicit answer check; on retry, focus the first option. Restoring a saved answer should not steal focus.

### L05 · Medium · Make wide values tables readable and scrollable

**Observed:** Mobile table text is globally reduced to 12 px, and chart value/table views have no consistent keyboard-accessible horizontal overflow region.

**Why it matters:** Exact values are an essential alternative to charts; shrinking them makes that alternative harder to use. The baseline tables did fit at 390 px; actual page clipping was not reproduced.

**Recommended change / implementation:** Keep table text at 14 px and put wide tables in labelled, keyboard-focusable horizontal scroll regions. Contain the table's overflow rather than the page's.

### L06 · Low · Keep lesson duration visible on mobile

**Observed:** The outline hides every lesson duration below the narrow breakpoint.

**Why it matters:** Designers choosing a short learning session lose a useful planning cue.

**Recommended change / implementation:** Place the duration beside the lesson title and allow the title to wrap. Preserve the number, description and completion indicator.

## Chart Lab

### LAB01 · Medium · Keep page navigation anchored

**Observed:** Browse experiments changes the desktop content width, moving the page title and tabs 80 px left.

**Why it matters:** A local content change should not relocate primary navigation.

**Recommended change / implementation:** Use one page width for the experiment and catalog and reserve a stable browser scrollbar gutter. [Evidence and details](lab-findings.md#lab01--medium--keep-navigation-anchored-when-opening-the-catalog).

### LAB04 · Medium · Use chart families that teach the right relationship

**Observed:** Histogram and box plot are grouped as Categorical, pie/waffle as Hierarchical, and Venn as Hierarchical.

**Why it matters:** Broad technical categories mix distributions with category comparisons, and shares with nested hierarchies. These labels make the practical chart-selection task less clear to beginners; this is a teaching-label issue, rather than a claim that a reference taxonomy is mathematically invalid.

**Recommended change / implementation:** Group the atlas by familiar tasks: categories, distributions, parts of a whole, hierarchy, relationships, change over time and locations. Keep every chart entry. [Annotated evidence](lab-findings.md#lab04--medium--group-charts-by-the-task-they-support).

### LAB05 · Low · Give empty chart searches a direct recovery action

**Observed:** No-match results only suggest changing search or family; combined filters cannot be reset together.

**Why it matters:** Learners must work out which filter excluded the charts.

**Recommended change / implementation:** Show an explanatory empty state and Clear filters that resets both controls. [Evidence](lab-findings.md#lab05--low--make-empty-filter-results-recoverable-in-one-action).

## Practice

### PR04 · Medium · Make quiz results a self-contained review

**Observed:** Missed results repeat the question and explanation, but omit the correct answer. One explanation refers to “The third brief” without displaying that brief.

**Why it matters:** The review does not give learners the answer they need to remember.

**Recommended change / implementation:** Include the correct option and a related lesson link for each missed question; label retry context and show the best full-round score with its denominator. [Evidence](practice-findings.md#pr04--medium--results-omit-the-answer-learners-need-to-remember).

### PR05 · Low · Group result actions cleanly on mobile

**Observed:** Retry missed questions and Start a new round wrap into uneven, right-aligned buttons.

**Why it matters:** Related next actions look disconnected and provide unequal target areas.

**Recommended change / implementation:** Stack the actions at full width on narrow screens, with the primary retry action first. [Evidence](practice-findings.md#pr05--low--results-actions-wrap-into-a-ragged-mobile-group).

### PR06 · Medium · Preserve the workspace while changing capstone case

**Observed:** Switching to Product onboarding from Your workspace drops the view query and returns to Brief & data, despite retaining independent notes/checklists.

**Why it matters:** Designers may think their saved work has disappeared, and must reopen the workspace.

**Recommended change / implementation:** Preserve the current workspace tab while switching cases; retain each case's separate notes and checks. [Evidence](practice-findings.md#pr06--medium--changing-capstone-case-unexpectedly-exits-the-workspace).

## Method & scope

- Three parallel reviewers covered learning, practice, and Chart Lab. The primary reviewer covered shared typography, geometry, themes/contrast, navigation and account/error routes, then integrated the fixes.
- Primary CSS viewports: 1440×900 desktop and 390×844 mobile. Additional narrow/tablet checks are recorded in verification. Chromium preview emulates CSS layout; it is not a claim of physical-device or assistive-technology testing.
- Desktop screenshots are scaled by the preview renderer to 1280×800; mobile screenshots preserve their width. Long pages are either contiguous stitched tiles or full-content captures at the same width with a taller viewport. Individual capture notes document this distinction.
- Reviewed all lesson routes and the model's 20 experiments / 45 chart views. There is no live scatter/overlap experiment in the current chart model; atlas reference entries are not presented as tested live experiments.
- Tests use isolated `127.0.0.1:5192` browser storage, leaving the user's `localhost:5173` progress untouched. No real account creation or external communication was performed.
- Existing strengths retained: meaningful source grouping, minimal left-sidebar layout, Inter typography, separate project drafts, local progress, explicit quiz replacement confirmation, stacked flashcards, live chart pause, and reduced-motion behavior.

## Verification

The final product build, TypeScript check and whitespace/diff check pass. Astryx doctor reports **27 pass, 0 warnings, 0 failures**. The existing Vite large-bundle advisory remains; this audit did not change the loading architecture.

| Check | Verified result |
| --- | --- |
| Learning route/view matrix | All 12 lessons and 52 desktop/mobile chart states render, with expected H1 and zero page-level horizontal overflow. [Before matrix](learning-smoke-before.json), [after matrix](learning-smoke-after.json). |
| Learning typography | Body 16 px / 24 px; tables and column tick/category/value labels 14 px. Effective SVG labels stay at least 13 px in the focused 320/390 px checks. All 12 mobile lesson times remain visible. |
| Controls and narrow layout | Common labelled/icon buttons, nested navigation, radio choices, segments and tabs are at least 44 px tall. Long chart choices wrap without overlapping at 320/390 px. Narrow flashcard ratings and quiz results stack at full width. |
| Theme contrast | Settled overview text scan reports no active text failures in Default/Sepia/Dark. Neutral/teal marks against card: Default **4.39 / 4.93**, Sepia **4.11 / 4.61**, Dark **5.53 / 7.04**. [Measurements](theme-verification.json). Inactive controls are excluded, and chart rotation was paused to avoid measuring a fading transition. |
| Answer feedback | Options remain at opacity 1; correct and selected answers have explicit labels. The correct-status label uses primary ink. Lesson submission focuses Answer feedback; retry focuses the first radio. |
| Route and drawer focus | Desktop navigation and mobile drawer navigation hand off to the new H1 without changing scroll position. Closing the drawer without navigating retains its own normal focus return. Unknown page/lesson recovery links work. |
| Chart Lab | Experiment and catalog header anchors both measure x403 after reserving the scrollbar gutter. Combined filter reset restores all 49 atlas entries. All 20 experiments / 45 views pass source-data shape checks, with representative live view changes tested. |
| Quizzes | A completed six-question round shows every missed correct answer and lesson link; retry contains only the four missed questions in the tested round. Replacement confirmation preserves the current quiz when cancelled. |
| Capstone | Delivery / Onboarding fit one segment row at 320/390 px. Workspace selection, independent drafts and checks survive case changes and reload. Counter/label remain on one readable line; progress groups beneath the heading on mobile. Test drafts/checklists were restored afterward. |
| Account-free recovery | `/login` explains local progress; `/dashboard` redirects to `/` with zero authentication requests. Existing local progress remains available. |

The three reviewers' detailed retest notes are in [learning](learning-findings.md), [practice](practice-findings.md), and [Chart Lab](lab-findings.md). Final screenshots are under [after](evidence/after/); the page links below make the main outcomes easy to inspect.

## Before and after evidence

| Area | Annotated before / diagnostic evidence | Final page |
| --- | --- | --- |
| Learning type and mobile duration | [Outline](evidence/before/learning-overview-mobile-annotated.png), [flashcard answer](evidence/before/practice-flashcards-answer-mobile-annotated.png) | [Overview](evidence/after/learning-overview-mobile.png), [flashcard answer](evidence/after/practice-flashcards-answer-mobile.png) |
| Touch targets | [Mobile navigation](evidence/before/shell-mobile-navigation-annotated.png), [flashcard actions](evidence/before/practice-flashcards-answer-mobile-annotated.png) | [Narrow flashcard actions](evidence/after/practice-flashcards-answer-320.png) |
| Sepia data contrast | [Chart](evidence/before/shell-sepia-chart-annotated.png) | [Measured colors and contrast](theme-verification.json) |
| Answer review | [Quiz feedback](evidence/before/practice-quiz-feedback-mobile-annotated.png), [lesson feedback](evidence/before/learning-lesson-desktop-annotated.png) | [Quiz feedback](evidence/after/practice-quiz-feedback-mobile.png), [lesson](evidence/after/learning-lesson-mobile.png) |
| Quiz review and actions | [Results](evidence/before/practice-quiz-results-mobile-annotated.png) | [Results](evidence/after/practice-quiz-results-mobile.png) |
| Capstone context | [Workspace entry controls](evidence/before/practice-capstone-workspace-desktop-annotated.png) | [Workspace](evidence/after/practice-capstone-workspace-mobile.png) |
| Chart Lab | [Annotated findings](lab-findings.md) | [Experiment](evidence/after/lab-experiment-mobile.png), [catalog](evidence/after/lab-catalog-mobile.png), [atlas](evidence/after/lab-atlas-mobile.png) |
| Account-free route | [Account screen](evidence/before/shell-login-mobile-annotated.png) | [Progress explanation](evidence/after/shell-login-mobile.png) |

**Capture limit:** The original mobile Chart Lab catalog and atlas baseline stitches contain 49 px bands obscured by the sticky header at their seams. Their finding markers are outside those bands. The corrected after captures use overlapping tiles and contain the complete content. Learning stitches already account for the sticky header; practice full-content shots use a taller viewport at the original width. The manifests preserve the source capture details. No physical-device or screen-reader test is claimed.
