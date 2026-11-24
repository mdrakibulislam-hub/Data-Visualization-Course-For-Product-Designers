# Progress and flashcard refinement

The reference was Quizlet’s focused study flow, reviewed through Mobbin in Ego Browser: [study screen](https://mobbin.com/screens/a6fa907d-6b71-4ae5-89d8-0c67e196bd09) and [set-completion flow](https://mobbin.com/flows/6e6d62b6-eadd-492e-86bc-8e893d074802). The useful patterns were a single prompt, nearby answer controls, and a clear separation between the current queue and learning history. The design uses Graphnotes’ existing Astryx theme, typography, and icons; no reference assets were copied. on.design required profile setup, so no account changes were made.

- The sidebar progress card pairs the completed lesson count with a ring and a direct link to the next unfinished lesson. Its collapsed tooltip is informational, without an inaccessible nested action.
- Flashcards use a solid three-layer stack. The answer replaces the question, preserving the study surface; “View question” returns to the prompt. Rating actions sit inside the card, with equal widths and a swipe exit toward the chosen direction.
- Due now shows the remaining review count. All cards shows the card’s position. Recall history sits below the deck so it cannot be mistaken for queue completion.
- Space reveals or hides an answer. Left and right arrows rate it. Shortcuts ignore interactive controls, held keys, modified keys, and an open navigation dialog. On narrow screens, keyboard hints are omitted and rating actions stack.
- Existing review schedules and course-scoped browser persistence are retained. A live status announces the saved next-review date. Reduced motion skips card animations.

Verification: production build, TypeScript, 35 tests with 194 assertions, Astryx doctor, and whitespace checks. Ego browser review covered default, sepia, and dark appearances; 320, 390, 768, and 1440 viewport widths; reveal/return; keyboard ratings; both decks; empty due state; reduced motion; resume destination; and collapsed progress tooltip. Known and unknown ratings saved the expected dates and survived reload. Temporary preview-origin learner data and appearance were restored exactly after QA.

The Taste standalone browser gate could not run because its required Chrome executable was unavailable. The existing gate error is retained; visual and interaction verification used Ego Browser.
