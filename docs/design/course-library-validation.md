# Course library validation

Validated November 24, 2026 against the production web build.

- Production build and TypeScript check passed.
- Learning/catalog suite: 35 tests, 194 assertions, no failures. Includes rendering real shared cards with 2-, 6-, and 12-course fixtures, migration retention, course isolation, backup compatibility, and catalog ordering/filtering.
- Astryx doctor: 26 passed, no warnings or failures.
- Ego Browser: checked 320, 390, 768, 1024, and 1440 widths without horizontal overflow; default, sepia, and dark appearances; fresh, started, and completed cards; shared overview/lesson/quiz/flashcard/preferences/credits routes; legacy lesson URLs; reading anchors; cross-tab progress; backup export; and course-request topic selection/email draft.
- A browser-only 12-card layout fixture exercised long titles and the same three-column grid sizing used by the catalog. These fixture courses were never added to the published registry.
- Browser test progress and appearance were restored to their original values. The original legacy progress record remains intact.

The request flow was checked through its generated email draft URL. No email was sent. HCI remains scheduled for November 30 at midnight in Dhaka; its release date does not publish unfinished content.

The production build reports a bundle-size advisory for its largest JavaScript chunk. This does not fail the build; course-content loading can be split further as the published catalog grows.

## Taste checker limitation

`GATE: ERROR (the copy (the page showed no <main>, <section> or <h1> to lint); consistency.mjs gave no report (exit 1: Error: No Chrome, Edge or Chromium found; set CHROME_PATH.); check.mjs could not run (exit 2: no Chrome found (set CHROME_PATH)))`

The Taste skill's standalone Chrome checks could not run on this machine, so they are not reported as passing. The application layouts and flows were reviewed separately in Ego Browser. Gate diagnostics are retained in `.taste-skill/gate.json`.
