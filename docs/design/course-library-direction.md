# Graphnotes course library direction

Research date: November 24, 2026. Reviewed signed-in Mobbin web collections using Ego Browser. This is a recommendation; the application has not been redesigned in this research pass.

## Recommendation

Use a compact course library that gradually gains browsing tools. Keep the existing Astryx theme, Inter typography, restrained accent, light/sepia/dark appearances, minimal creator credit, and simple chart covers. The important change is a reusable catalog and course structure, rather than a different layout for every new subject.

The current two-card composition works for a small launch. Its large centered logo, tall covers, and course-specific markup become harder to manage as the library grows. Move the brand into a small persistent header when expanding the catalog. Keep “+ Request a course” and appearance controls on the right.

## Mobbin references reviewed

| Reference | Observed pattern | Application to Graphnotes |
| --- | --- | --- |
| [Coursera learning home](https://mobbin.com/screens/93beef1d-a7ba-4f6c-9efb-4d13aee3eb76) | A distinct Continue learning area precedes other discovery content. Home and My Learning have separate roles. | Returning learners should reach their current lesson without finding its card in a large catalog. Keep the existing in-card Continue action now; introduce a compact resume row if learners later have several courses in progress. |
| [Skillshare UI/UX category](https://mobbin.com/screens/19988863-3136-4b9f-8432-bc0833c6564a) | Consistent course cards, topic chips, category navigation, and sorting support a large catalog. | Adopt the card consistency and, later, a small set of topic filters. Graphnotes does not need the large taxonomy or multiple filter rows at its present size. |
| [Brilliant courses flow](https://mobbin.com/flows/acfd786d-367b-43d6-9058-14dff69bc8b2) | Home and Courses are distinct; related courses are organized into learning paths with recognizable subject illustrations. | Give every subject a clear cover within one visual system. Introduce optional learning paths only after a real course sequence exists. |

These observations concern the screenshots in Mobbin, not a claim about the current live versions of those products.

## Page structure

1. **Compact header:** Graphnotes on the left; request action and appearance on the right.
2. **Conditional resume row, later:** last active course, current lesson, one Continue action. Show it only when it helps a returning learner navigate a larger library.
3. **Catalog:** one consistent responsive grid, with available courses before scheduled courses. Start with two columns; allow three at wider sizes as content grows. Use two on tablet and one on mobile.
4. **Minimal credit:** a quiet creator link below the catalog.

Do not add a sidebar to the library just to accommodate future content. Keep the lesson sidebar inside a selected course. A course switcher can later let someone move between subjects without returning to the catalog.

## Course card contract

Every course uses the same card shape and cover ratio, with room for a two-line title. Use a static subject-specific visual, not an interactive lesson or an independently rotating animation in every card.

- **Available, not started:** cover, course name, lesson count and duration; the card opens the course overview.
- **In progress:** the same information, Continue beside the metadata, and the completion line below, as currently requested. Continue resumes an unfinished lesson; clicking the rest of the card opens the overview.
- **Completed:** a clear completed state and Review action.
- **Scheduled:** subject cover or a launch treatment, course name, and confirmed date. Keep the current HCI countdown for the nearest launch; do not repeat large countdowns across many future courses.
- **Planned without a date:** Coming soon. Do not display invented duration, lesson counts, or launch promises.

Keep the cards readable without relying on color. Covers should retain the same visual weight: a chart for Data Visualization, an action-and-feedback example for Interaction Design, a perception or attention example for HCI. These should be original Graphnotes visuals, rather than copied assets from the references.

## Add controls only when needed

These are proposed thresholds, not research-derived limits.

| Library size | Suggested interface |
| --- | --- |
| 2–5 courses | Simple grid and request action. No search or category filters. |
| 6–12 courses | Add text search when scanning becomes slow; use a few topic chips only if each group has useful content. |
| 12+ courses | Search, topic filters, and a useful sort such as Newest. Add My learning when several simultaneous courses make it worthwhile. |
| A genuine sequence of related courses | Optional learning paths such as HCI → Interaction Design. Preserve direct access to each course. |

Avoid a separate home-page section for every subject, horizontal carousels that conceal courses, and filters containing only one item each.

## Structure for adding courses easily

Create a single course registry. Each entry supplies a stable ID/slug, title, topic, short description, cover, availability state, optional release time, lesson count/duration derived from its curriculum, and curriculum references. The catalog maps over that registry using one CourseCard component.

Use shared course overview, lesson, practice, and progress components. A new course should require adding content and a registry entry; its cover can be a new visual, but it should not require copying the whole application.

Separate course content from learner state. Progress, quizzes, flashcards, projects, and milestones must be scoped by stable course ID. Merely adding cards would leave the current data-visualization-specific storage, navigation, and practice data shared incorrectly across subjects.

A future route shape can be `/courses/<course-slug>` and `/courses/<course-slug>/lessons/<lesson-slug>`. Keep the existing `/course` and lesson URLs working through compatibility redirects. Preserve reading-source anchors.

Migrate the existing `data-viz-field-guide.progress.v1` record into the Data Visualization entry of a versioned multi-course store. Read and validate the legacy record first, retain it during migration, and verify that resume position, answers, scheduled reviews, weekly goals, project notes, and milestones survive. Global preferences such as appearance should remain independent of course progress. Backups should identify their format version and course IDs.

The course-request topic list can also come from shared catalog/topic data, so published courses are not accidentally presented as new requests. Requests currently open an email draft; do not display a submitted confirmation unless a real delivery endpoint is added.

## Suggested next implementation

First extract the registry and shared cards, scope progress safely, and adapt the catalog to a compact header and consistent covers. Keep the current Continue/progress behavior, creator credit, and confirmed HCI release. Exercise the layout with temporary 2-, 6-, and 12-course fixtures during development, without publishing fictitious courses. Add search and filters only when actual content needs them.
