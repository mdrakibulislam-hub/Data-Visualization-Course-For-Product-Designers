# Practice audit notes

Reviewed 2026-11-23 in Chromium preview at isolated `http://127.0.0.1:5192`, without a login. Main viewports: 1440×900 and 390×844; mobile full-content captures extend viewport height at the same 390 px width. Desktop evidence is scaled by the preview capture to 1280×800. Coordinates below refer to the actual saved PNG when specified.

## PR03 · Medium · Submitted quiz choices look disabled rather than readable

- **Observed:** In `/quizzes`, choose the first option for the first Foundations question and press **Check answer**. All option labels become faint, while the incorrect selected option retains the strong brand-colored outline/fill. The correct option is marked with a faint check. The same cause exists in lesson questions.
- **Why it matters:** The point of feedback is to compare the chosen answer with the correct one. Dimming the reading material makes that comparison harder and overemphasizes the incorrect choice.
- **Recommended change:** Replace disabled radio controls with a static, full-opacity answer review. Label both **Your answer · Incorrect** and **Correct answer**, with X/check symbols as non-color cues. Keep the explanation and focus handoff.
- **Fix:** Implemented shared `AnswerReview` and integrated it with quizzes. Learning reviewer owns the lesson integration.
- **Evidence:** `evidence/before/practice-quiz-feedback-mobile.png`, 390×844. Mark region x33, y346, w324, h148. Supporting `practice-quiz-feedback-desktop.png`.

## PR04 · Medium · Results omit the answer learners need to remember

- **Observed:** Finish a Foundations quiz with incorrect answers. Results show the missed question and an explanation, but not the correct option. One explanation says **“The third brief names a reader, a comparison, and a decision”** while none of the three briefs is displayed in results.
- **Why it matters:** Results should work as a review sheet. A learner cannot reconstruct the correct brief from the explanation alone.
- **Recommended change:** Show the full correct option before each explanation and offer a related lesson link. Label a retry round and express the best full-round score with its denominator.
- **Fix:** Implemented correct answers, lesson links, retry context, and a full-round denominator.
- **Evidence:** `evidence/before/practice-quiz-results-mobile.png`, 390×999. Mark x32, y428, w311, h109 for the brief question/explanation.

## PR05 · Low · Results actions wrap into a ragged mobile group

- **Observed:** At 390 px on quiz results, **Retry missed questions** and **Start a new round** wrap onto separate lines with different widths, both right aligned.
- **Why it matters:** These are a related pair of next actions. Their uneven edges weaken hierarchy and reduce the effective touch area.
- **Recommended change:** Stack the buttons at equal full width on narrow layouts, keeping the primary retry action first.
- **Fix:** Implemented the responsive results action stack; shared controls are enlarged by the main audit.
- **Evidence:** `evidence/before/practice-quiz-results-mobile.png`, 390×999. Mark x32, y851, w311, h72.

## PR06 · Medium · Changing capstone case unexpectedly exits the workspace

- **Observed:** Open `/capstone?view=workspace`, then select **Product onboarding**. The URL changes to `/capstone?project=onboarding` and the active tab resets from **Your workspace** to **Brief & data**. Switching cases discards the navigation context even though their saved drafts and checklists are independent.
- **Why it matters:** A designer comparing work between the two briefs must reopen the workspace each time and may think their work has disappeared.
- **Recommended change:** Preserve the current `view` query when changing `project`, retaining the independent notes/checklists.
- **Fix:** Implemented the preserved search state.
- **Evidence:** `evidence/before/practice-capstone-workspace-desktop.png` is the entry state; `practice-capstone-onboarding-mobile-full.png` shows the reached brief. The behavior was reproduced using the actual case segment, and recorded URL/query/tab values. Mark the project selector plus workspace tab in both captures.

## Shared observations handed to the main audit

- Flashcard answer body and practice descriptions render at 14 px despite being primary learning content; the shared theme is being corrected to a 16 px body scale. Flashcard answer evidence: `practice-flashcards-answer-mobile.png`, x49 y484 w292 h69.
- Flashcard **Show answer**, rating actions and quiz actions render at 32–36 px tall; shared theme controls are being corrected for touch. Flashcard rating evidence: `practice-flashcards-answer-mobile.png`, x67 y652 w256 h36.

## Successful behavior that narrows the findings

- Flashcards reveal and advance using the intended stacked swipe motion; rating persists immediately in isolated local storage.
- Quizzes save submitted answers, resume the current round, record best full rounds, and offer retrying only the missed questions.
- Starting a different quiz after answering opens the existing replacement confirmation; **Keep current quiz** preserves the current scope and submitted answer.
- Both capstone briefs, data tables, notes, and checklists are reachable. Notes are separate by project. The issue is the tab reset, not missing draft storage.

## Capture index

- Flashcards: `practice-flashcards-desktop.png`, `practice-flashcards-answer-desktop.png`, `practice-flashcards-answer-mobile.png`.
- Quiz catalog: `practice-quiz-catalog-desktop.png`, `practice-quiz-catalog-mobile.png`.
- Quiz question and feedback: `practice-quiz-question-desktop.png`, `practice-quiz-question-mobile.png`, `practice-quiz-feedback-desktop.png`, `practice-quiz-feedback-mobile.png`.
- Results: `practice-quiz-results-mobile.png` (entire content, 390×999).
- Confirmation: `practice-quiz-confirmation-desktop.png` (supplemental; captured during entrance).
- Capstone: `practice-capstone-brief-desktop.png`, `practice-capstone-workspace-desktop.png`, `practice-capstone-workspace-mobile.png`, `practice-capstone-onboarding-mobile-full.png`. The separate `practice-capstone-onboarding-mobile.png` is a viewport detail only.

## Retest evidence

Against rebuilt production preview:

- PR03: submitted option text is 16 px at opacity 1, with explicit X/check and text labels; the feedback section receives focus on Check answer. At 320 px, rows have 8 px gaps and the next action follows below the feedback without overlap or horizontal overflow.
- PR04: the same Foundations round scores 2 of 6 and now lists four full correct answers with four related lesson links. Retrying creates a four-question round and displays “Reviewing the questions you missed.”
- PR05: mobile result actions measure 311 px wide by 44 px high each at 390 px, aligned to the same edges.
- PR06: entered distinct delivery/onboarding notes, checked a different step for each project, switched between cases, and reloaded the onboarding workspace. Both the workspace tab and independent notes/checklists persisted. Test draft/checklist fields were restored to their original values afterwards.
- Shared typography/touch fixes: flashcard answer text is 16 px; reveal/rating buttons are 44 px high; review deck segments are 44 px high. No control overlaps at 320 or 390 px. The narrower rating action group is now deliberately stacked at equal width below 22 rem.
- Follow-up layout polish: shorten the project segments to **Delivery** and **Onboarding**, keeping their full context in the brief heading. This prevents the longer names from breaking into two unrelated rows after the shared 16 px type correction.

After evidence is in `evidence/after/practice-*`. It includes flashcards on desktop/mobile, quiz catalog on desktop/mobile, readable submitted answers on desktop/mobile, and the corrected full quiz results on mobile. Final narrow flashcard and capstone counterparts are captured after the final rebuild.

Final rebuild verification: Delivery/Onboarding segments remain on one row and are 44 px high at both 320 and 390 px. Narrow flashcard rating buttons are each 273×44 px at 320 px and form a deliberate equal-width stack. Correct-status text now uses primary ink; the green check and border are retained as graphical cues, avoiding a 4.486:1 small-text edge case against sepia. Final mobile evidence uses tall viewports at the same tested width (rather than stitched images) to avoid repeated sticky headers; `practice-quiz-feedback-mobile.png` is the complete 390×974 view and `practice-flashcards-answer-320.png` is the complete 320×953 view. All four documented findings are resolved. No external account, login, or live server progress was changed.

Final capstone grouping check: the project progress label and value now each stay on one 24 px line at 320 px; the progress block fills the mobile content width beneath the workspace heading. Desktop progress has enough width for the same label/value on a single line. Replaced both workspace after-captures with the corrected final build and visually inspected the full mobile image.
