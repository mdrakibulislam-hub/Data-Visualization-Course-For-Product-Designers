# HCI course implementation

The local catalog now exposes Human–Computer Interaction at `/courses/human-computer-interaction`. This replaces its previous scheduled card in the workspace. No hosted deployment is performed by the implementation.

## Teaching content

- 40 original lessons in ten modules, with 80 scenario questions and 40 flashcards.
- Each lesson includes an outcome, four explanation sections, a saved optional prediction, a worked explanation, relevant glossary terms, optional deeper study, an at-work task, and source locators.
- 16 fictional, untimed interaction experiments cover attention, memory, mental models, task ordering, feedback, recovery, direct actions, forms, pointing, finding information, help, keyboard focus, consent, evidence, collaboration, and AI correction.
- Three credited books, nine article/standard references, and a searchable plain-language glossary.
- Two capstone cases with independent notes, evidence paths, ten module outputs, worked examples, self-checks, six rubric dimensions, and Markdown export.

The books inform original copy. Fictional records are explicitly labeled. The guided-case evidence path supports analysis practice and does not validate a learner's new prototype. Self-review is distinct from independent grading.

## Interactive course cover

`overview-perception.tsx` supplies the library preview and course overview with an Ebbinghaus-style comparison. The two accent circles keep equal radii. Automatic playback alternates the surrounding context and the aligned comparison every 3.2 seconds, reversing the surroundings on the next pass. Compare centers and Restore context allow manual stepping, pausing playback until Play is selected. Both states reserve the same header, button, and feedback space, including when text wraps on narrow screens.

The shared component supports native button, touch, Enter, and Space interaction; pauses on hover, focus, and when offscreen; skips changes in hidden tabs; and removes automatic playback and transitions under reduced motion. The pause control remains available in either state, and automatic feedback changes are not live-announced. The library preview shows the automatic visual and pause control; the manual comparison button and explanatory feedback appear only in the course overview. The preview pause control sits above the library's stretched course link so interaction does not navigate. This is a perception demonstration, not a measurement of the learner's ability.

## Files and routes

`apps/web/src/course/hci/curriculum.ts` holds the lessons and guides. `sources.ts` holds source credits and reading notes. `data.ts` holds experiments, glossary, module prompts/examples, project fixtures, and rubric definitions. `state.ts` defines and sanitizes persistent HCI fields. The React files render experiments, lesson activities, and course-specific pages using Astryx and the existing course frame.

- `/courses/human-computer-interaction` — overview and outline.
- `/courses/human-computer-interaction/lessons/<lesson-id>` — reader, prediction, experiment or guided case, questions, and application.
- `/courses/human-computer-interaction/practice` — experiment catalog; `?experiment=memory` opens a selected experiment.
- `/courses/human-computer-interaction/project` — appointment project; `?project=permissions` opens the independent team-access case.
- `/courses/human-computer-interaction/glossary` — terms, explanations, and examples.
- `/courses/human-computer-interaction/quizzes`, `/review`, `/preferences`, `/sources` — existing course-aware tools.

Practice/project/glossary pages are restricted to courses with interaction content. Data Visualization retains its chart labs, challenges, projects, routes, and source anchors.

## Learning state

HCI uses `graphnotes.course-progress.v2.human-computer-interaction`. The additive `hci` field contains:

- `notes`: lesson-ID-keyed predictions, bounded to 1,200 characters.
- `projects.appointment` and `projects.permissions`: independent evidence paths, ten module entries bounded to 4,000 characters each, known self-check IDs, and integer rubric ratings from 0 to 3.

Course-matched JSON backups include these fields. Older version 2 backups receive empty defaults. Foreign-course backups are rejected. Unknown lesson/step/rubric fields are discarded during parsing. Existing Data Visualization storage and legacy migration remain separate. HCI project work counts toward the optional weekly goal; saved predictions do not automatically complete a lesson or award a design-competence milestone.

Experiment controls reset on navigation or Reset this experiment. The text prediction and project artifacts persist. Exports preserve the selected evidence-path label and the self-review meaning.

## Verification

Run `bun run test:learning`, `bun run check-types`, `CI=1 bun run build`, and `bun run astryx doctor --built dist` from the repository root. The learning suite includes HCI reference integrity, content completeness, state bounds, course isolation, backup round trips, experiment rendering, lesson integration, page rendering, and evidence-preserving project export.

Browser verification uses Ego Lite on a local origin with no existing progress, and preserves the user's ordinary development origin. Verified flows include:

- Opening the available course, lesson navigation, saved predictions, answer feedback, retry, lesson completion, and the next lesson.
- Completing a module quiz, retrying only missed questions, revealing flashcards, and saving recall practice.
- Independent capstone notes, evidence paths, self-checks, and rubric ratings across case changes and reloads; Markdown download preserves the selected case and evidence meaning.
- Memory summaries, keyboard error correction and submission, consent draft versus saved preference, stale invitation status and revocation, and separate AI suggestion/confirmation steps.
- Glossary search and empty results; overview, lesson, lab, project, glossary, and credits at a 320-pixel viewport without page overflow; default, sepia, and dark appearance.
- The interactive cover in both placements, including actual touch dispatch at 320 pixels, keyboard comparison/restoration, equal center radii, automatic context/comparison playback, pause/resume over a full playback interval, and reduced-motion updates without transitions. Continuous measurement across a full four-state cycle verifies stable card, drawing, control, and following-section bounds; manual comparisons also retain their geometry at 320, 390, 520, 768, and 1024 pixels.

Automated and browser checks verify implementation behavior; they do not replace learner comprehension testing.

## Editorial follow-up

The proposed learner pilot remains unperformed. Have intended beginners explain and apply the memory, error-recovery, and usability-testing lessons before a public course launch. Lesson durations are estimates; reading, activity, and question time is separated from the 4–6 additional hours suggested for project work and review. The implementation does not claim university affiliation, independent grading, full accessibility certification, or real-user validation of the fictional fixtures.
