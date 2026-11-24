# Adding a course to Graphnotes

The library, course overview, lesson reader, quizzes, flashcards, preferences, and reading sources share templates. Data Visualization remains the only published course. HCI remains scheduled for November 30, 2026 at midnight in Dhaka.

## Add a planned or scheduled course

Add one entry to `apps/web/src/course/catalog.ts` in `courses`:

```ts
{
  id: "interaction-design",
  title: "Interaction design",
  description: "Design clear actions, feedback, and transitions.",
  topic: "Design foundations",
  cover: "interaction",
  status: "planned",
}
```

IDs are permanent URL/storage identifiers: use a unique lowercase slug. Available covers are `data`, `perception`, `interaction`, and `research`. Add another original SVG subject illustration in `components/course-artwork.tsx` and extend `CourseCover` when needed.

A scheduled entry uses `status: "scheduled"` and a confirmed ISO `releaseAt` with a timezone. The earliest scheduled entry receives the launch countdown; others show a short release date. Reaching the date does not publish missing content automatically.

## Publish a course with shared learning tools

Write its modules in a content file. `CourseModule` is exported from `course/catalog.ts`. Each module has `title`, `description`, and `lessons`. Each lesson needs:

- A stable `id`, `title`, estimated `minutes`, and short `description`.
- `sections` with clear titles and body text, a `takeaway`, and a practical `practice` prompt.
- `questions`, each with a prompt, three options, a correct answer index (0–2), and an explanation.
- A `flashcard` with `front` and `back`.
- `reading` entries with source ID and reading locator, or an empty array.

Use `defineCourseContent(modules, extras)` from the catalog, then set the registry entry to `status: "available"` with that `content`. Lesson count, total duration, quiz bank, review queue, and the course outline derive from the modules. The same lesson ID can safely occur in two different courses, but IDs must be unique within one course. Do not reuse an old ID for unrelated material after publishing.

Optional `extras` include article/book sources, lesson chart labs, a quiz bank with additional scenario questions, and meaningful milestones. `defineCourseContent` supplies an ordinary recall milestone; add only milestones supported by the course’s actual practice activities.

Data Visualization’s Chart Lab, design challenges, and capstone are subject-specific extensions. They remain intact on their existing routes and are shown only inside Data Visualization. A new course gets the shared lesson/quiz/flashcard tools automatically. A new kind of interactive exercise or project requires its own content/renderer integration; do not enable the Data Visualization extensions for another subject by copying its flags.

## URLs and navigation

The shared routes are:

- `/courses/<course-id>` — overview.
- `/courses/<course-id>/lessons/<lesson-id>` — lesson.
- `/courses/<course-id>/quizzes` and `/review` — course-scoped practice.
- `/courses/<course-id>/preferences` and `/sources` — preferences, backups, creator credit, and course reading sources.

Use the catalog’s `courseOverviewHref`, `courseLessonHref`, and `coursePageHref` helpers. The old `/course`, `/lesson/...`, `/quizzes`, `/review`, `/preferences`, and `/sources` URLs still work for Data Visualization. Existing reading-source IDs and anchors are retained.

The root chooses the active course by URL and keys its provider by course ID. Shared screens read `useCurrentCourse()`; do not import Data Visualization’s curriculum directly into a new shared screen.

## Progress and backups

Each available course uses its own `graphnotes.course-progress.v2.<course-id>` record. Data Visualization reads and migrates `data-viz-field-guide.progress.v1` only when its new record is absent. The original key stays untouched. Existing lesson completion, answers, quiz sessions, project drafts, checklists, goals, reviews, and milestones are preserved.

Version 2 exports include `courseId`; a backup is imported only into its matching course. Version 1 backups are accepted for Data Visualization. Unknown future or malformed storage envelopes are not overwritten by opening a lesson. Storage failures retain progress in the current tab, show the existing persistence warning, and allow export.

Appearance remains a separate global preference. Other tabs receive course-scoped updates through browser storage events; same-tab library cards update immediately.

## Catalog growth

The library renders `courses` through `CourseCard` rather than one-off page markup. It uses a shared 16:9 cover and compact title row; published entries appear first. Continue appears beside the title for started courses, and completed courses offer Review. The Figma layout omits lesson metadata and progress bars from this page; course progress remains saved and visible inside the course. A creator panel sits below the catalog.

With the current two entries there are no search/filter controls. Search appears at six entries. Topic filtering appears with search only when at least two topics each have two or more courses. The grid allows three columns once the catalog contains more than two entries, then reflows according to available width. Unpublished courses stay non-interactive until content is available.

A separate Continue learning row and learning paths are intentionally deferred until real multi-course usage requires them. Progress already remains on each course card.

## Before publishing

Run `bun run test:learning`, `bun run --cwd apps/web tsc --noEmit`, `CI=1 bun run build`, and `bun run astryx doctor --built dist`.

Verify fresh, in-progress, completed, scheduled, and storage-unavailable states; narrow screens and all three appearances; resume, quiz, flashcard and reading links; and import/export for the intended course. Exercise a larger catalog with local-only fixtures without adding fictitious published courses to the production registry.
