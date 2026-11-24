# Practice page refinement

The four practice pages now use the same compact title scale and section rhythm as the refined flashcard page. Each activity keeps its own useful structure rather than repeating one card layout everywhere. Astryx surfaces, controls, theme colors, and existing motion remain the shared foundation.

- **Chart Lab:** a workbench separates view controls, the chart, and its interpretation. Experiments have previous/next navigation and a catalog with chart previews. Narrow-screen controls retain their full labels. The atlas keeps a searchable, compact list.
- **Design challenges:** the chart and decision form share one exercise sheet. Two visible steps explain the sequence. After a correct change, learners can compare the original and revised views. The challenge catalog uses numbered rows; selecting a challenge moves keyboard focus to its heading.
- **Quizzes:** topic cards distinguish scope, question count, saved progress, and action. Question progress and answer controls belong to the question sheet. Results keep retry actions near the score, and missed explanations expand individually. An unfinished round still requires confirmation before replacement.
- **Capstone:** the brief explains the deliverable and gives direct access to the workspace and Chart Lab. The workspace puts writing first, with a separate completion checklist. Drafts and checklists remain independent for Delivery and Onboarding.
- **Navigation:** Other lists Preferences, Credits, then More courses in both sidebar and mobile drawer.

Two correctness details were fixed during review: repeated week labels no longer create duplicate React table-row keys, and the baseline challenge now actually compares the 95% and 100% completion rates named in its brief. The before/after views preserve those values while changing the baseline from 90% to zero. A regression test checks that learning example.

Validation: production build, web TypeScript, 36 tests / 199 assertions, and whitespace checks pass. Astryx doctor reports no failures, with its source-style advisory remaining. Shared-browser checks covered 320, 390, 768, 1280, and 1440 widths; default, sepia, and dark appearances; experiment browsing, comparisons, navigation and data disclosure; atlas search and empty state; challenge retry/completion and focus handoff; a full quiz, resume after reload, results disclosure, missed-question retry and replacement confirmation; independent project drafts and checklist persistence. Interaction tests used an isolated browser profile, leaving the user's learning progress untouched.

The existing Taste standalone gate remains unavailable without its Chrome executable; visual verification used the shared browser.
