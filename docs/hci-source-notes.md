# HCI source review and teaching decisions

Prepared November 28, 2026. Supports [the curriculum proposal](hci-course-proposal.md), revision 2. This is a source-review record for curriculum planning; each final lesson still requires its own claim and reading-locator checks.

## Books supplied and identified

| Source | Edition verified | File and extent | Role in the course |
| --- | --- | --- | --- |
| Alan Dix, Janet Finlay, Gregory D. Abowd, Russell Beale, *Human-Computer Interaction* | Third edition, Pearson Education, 2004; ISBN 9780130461094 | `HCI_Alan_Dix.pdf`, 861 PDF pages | Connect people, technology, interaction, design methods, and evaluation. Use worked examples to bridge theory and practice. |
| Ben Shneiderman and Catherine Plaisant, *Designing the User Interface: Strategies for Effective Human-Computer Interaction* | Fourth edition, Pearson/Addison-Wesley, 2005; ISBN 0-321-19786-0 | `Book - Ben Shneiderman-Designing the User Interface-4th Edition.pdf`, 672 PDF pages | Practical principles, interaction styles, menus/forms, collaboration, response time, messages, help, search, and visualization. |
| Andrew Sears and Julie A. Jacko, editors, *The Human-Computer Interaction Handbook* | Second edition, 2008; ISBN 978-0-8058-5870-9 | Named handbook PDF, 1,386 PDF pages | Specialist depth, empirical qualifications, diversity, task/contextual methods, evaluation, privacy, and human values. |

All files are in `/Users/mdrakibulislam/Downloads/HCI/`.

`Dix_HumanComputerInteraction.pdf` is a 52-page extract containing front matter and the evaluation chapter, not a second full Dix edition. The full `HCI_Alan_Dix.pdf` is the reference used here. The separate `Human-Computer_Interaction.pdf` has not been adopted as a source.

The Shneiderman file has an OCR text layer. The title/copyright pages were visually checked to confirm the coauthor and year, which are not reliably represented by the PDF metadata. A duplicated scan of printed page 123 makes a single fixed PDF-to-print page offset unsafe. Cite the chapter/section and verify the printed page in the image when authoring a lesson.

## Review scope

Reviewed the books' structures, contents, selected body sections, worked examples, and chapter summaries. The review targeted the foundational topics needed for this course. The record below identifies the actual selected sections behind the curriculum decisions; it is not a claim of cover-to-cover reading or completed factual review of 40 lessons.

### Dix et al.

- Introduction, especially printed p. 5: connect a person's work, a computer's behavior, the task, and usability. The course should unite its concepts through a design problem.
- Ch. 1, pp. 32 and 55: memory, perception, learning, and limitations. The book itself explains why a short-term-memory finding does not impose a universal seven-item limit on visible menus.
- Ch. 3, pp. 125-126 and the summary/exercises around pp. 160-161: distinguish a goal, an intended action, the system response, and interpreting the result. Include context, ergonomics, and different styles of interaction.
- Ch. 5, pp. 195-197, 220-222: early user focus, tradeoffs, alternative concepts, iteration, and formative evaluation. Repeatedly polishing one concept may miss a better alternative.
- Ch. 6, pp. 248 and 256: diagnose the cause behind a symptom and record the assumptions and reasons behind a design decision.
- Ch. 7, pp. 260-261, 266, 281: learnability, flexibility, and the assumptions behind design rules. Use rules as reasoning aids with examples and exceptions.
- Ch. 9, pp. 322, 328, 335, 357: cognitive walkthroughs, lab/field tradeoffs, controlled comparisons, and choosing a method. Keep exploratory usability testing distinct from a controlled experiment.
- Ch. 10, pp. 366, 384, 392: universal design and differences in capability, age, and culture. Update language and standards before publication.
- Ch. 11, pp. 397-398 and 414: help should be available, accurate, consistent, robust, and appropriate to the task. Give help and onboarding an explicit lesson.
- Ch. 12, pp. 421 and 436: goal/task hierarchies and KLM. Introduce the purpose and limits of models; put detailed calculation in the deeper reading.
- Ch. 13, p. 451: identify affected stakeholders and conflicting organizational requirements.
- Ch. 15, pp. 511, 513-514, 541: task analysis, a visually inspected HTA example, plans and ordering, and the limits of an incomplete task model. Distinguish a task model from a list of interface clicks.
- Ch. 16, pp. 548 and 589: describe interaction states and transitions separately from implementation. Use a small state diagram rather than formal notation instruction in the core course.
- Ch. 19, pp. 691 and 713: collaboration, shared artifacts, awareness, synchronization, and different places/times. Include a two-person task.
- Ch. 20, p. 745, and ch. 21, pp. 762 and 787: context-aware interaction, navigation, hypertext, and the consequences of moving beyond a desktop screen. Put specialist implementation and detailed AR/VR treatment in optional study.

### Shneiderman and Plaisant

- Ch. 1, pp. 15 and 44: usability is relative to the people and task; consider learning, performance, errors, retention, satisfaction, and universal access.
- Ch. 2, section 2.3.4, pp. 74-75, and section 2.3.5: eight golden rules and error prevention. The text explicitly treats the rules as needing validation and tuning for the domain. Avoid a memorization-only lesson.
- Ch. 3, sections 3.5-3.7: observation, participation, and scenarios. Involve affected people, document what was observed, and keep interpretations visible.
- Ch. 4, section 4.7: controlled comparisons and practical evaluation. Teach how differences in task, participants, order, or assistance can produce misleading comparisons.
- Ch. 6, section 6.3, pp. 231-232: direct manipulation, feedback, representation, and limitations. Direct manipulation needs its own worked example and an equivalent accessible path.
- Ch. 7, sections 7.2, 7.5, and 7.7: task-related menu organization, content, forms, and dialogs. Grouping, labels, input requirements, and keeping entered data deserve concrete practice.
- Ch. 8, section 8.2: choose an interaction style around the task, including command-based alternatives for repeated work.
- Ch. 10, section 10.2 and p. 445: collaboration goals and coordination. A two-person workflow adds questions that a single-user screen review misses.
- Ch. 11, sections 11.2-11.6, selected pp. 455, 462, 470: delays, expectations, interruptions, and frustration. Preserve the questions and design implications; do not turn historical timing findings into universal response thresholds.
- Ch. 12, section 12.2, pp. 479-480: specific, constructive messages in language the user understands. Make interface writing a practice skill.
- Ch. 13, sections 13.4-13.6, selected pp. 531, 539, 546: reading ability, help, and tutorials. The p. 539 discussion supports choosing simple explanations even for readers who can manage harder text.
- Ch. 14, sections 14.2, 14.4, 14.5, selected pp. 563, 574, 580, 601: finding information, searching, filtering, previews, and access to underlying information. Include basic information interaction while linking deeper visualization study to Graphnotes' existing course.

### Handbook

The previous planning pass reviewed contents, outlines, and selected passages on cognition, mental models, error, input, psychological complexity, contextual methods, requirements, diversity, personas, prototypes, scenarios, participation, testing, inspection, model-based evaluation, collaboration, adaptive systems, and ethics. Key locators and the role of the book remain in the main proposal.

## Readable articles checked through Ego Lite

Checked November 28, 2026. Student recommendations below are selected sections, not a requirement to read every complete page. Readability judgments are editorial judgments, not measured grade-level guarantees.

| Article | Intended use | Sections to recommend | Teaching caution |
| --- | --- | --- | --- |
| [Usability 101: Introduction to Usability, NN/G](https://www.nngroup.com/articles/usability-101-introduction-to-usability/) | Beginner introduction; ch. 1 companion | What Is Usability; Users, Tasks, and Context; Utility; UX | Current page identifies Raluca Budiu, Nov. 6, 2026, as replacing the original article. Do not attribute this version's wording or claims to the 2012 author. Sample-size advice is contextual, not a universal course rule. |
| [Mental Models, NN/G](https://www.nngroup.com/articles/mental-models/) | Concrete examples after the core explanation | What Are Mental Models; one familiar shopping/search example | Page identifies Megan Chan and a Sept. 1, 2026 review. Clarify that browser history navigation and reversing a committed action are different behaviors. |
| [10 Usability Heuristics for User Interface Design, NN/G](https://www.nngroup.com/articles/ten-usability-heuristics/) | Selected examples and a review reference | Read only the heuristic relevant to the lesson, then use the set in the inspection module | Explain what a heuristic is. Read the eight golden rules and ten heuristics as related lenses, not 18 independent rules to memorize. Color alone is insufficient to communicate an error. |
| [Introduction to Web Accessibility, W3C WAI](https://www.w3.org/WAI/fundamentals/accessibility-intro/) | Beginner accessibility introduction | What Is Web Accessibility; examples; evaluating accessibility | A short check or automated tool does not establish full accessibility. Include people using relevant assistive technologies. |
| [Plan user research for your service, GOV.UK](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service) | Practical method selection | Agree research questions; identify user groups; choose relevant activities | Explain government-specific stage names if used. Treat staffing cadence and participant guidance as examples for that context. |
| [Using moderated usability testing, GOV.UK](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing) | A beginner's session-writing guide | Design the tasks; run a session | Preserve the distinction between observation and coaching. For teaching fixtures, use fictional data and consented low-risk activities. Lab/field choice follows the study question. |
| [Use clear language, GOV.UK publishing guidance](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/) | Editorial reference; optional support for the writing lesson | Explain specialist terms; active voice; short sentences and paragraphs | The old writing-for-GOV.UK URL redirected to new publishing guidance. This is a writing standard, not evidence that Graphnotes has reached a particular reading grade. |

The last article is chiefly for authors. The first six can supply optional student reading. No paid course, account, external book purchase, or mandatory video is needed for the core lessons.

### Standards and deeper references

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): authoritative technical reference for authors; translate each selected criterion into a concrete example while retaining its correct level, exceptions, and meaning.
- [Guidelines for Human-AI Interaction, Amershi et al., CHI 2019](https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/): teacher reference for capability, uncertainty, correction, and control. Pair with the handbook's adaptive-interface chapter and checked contemporary examples.

These two references were checked in the earlier planning pass. They are not the first readings assigned to a new learner.

## Decisions arising from the combined review

1. Expand from 32 to 40 short lessons. Make direct manipulation, design rules, writing, help, collaboration, and distributed states explicit.
2. Use a spiral: everyday example, plain explanation, technical name, guided use, independent application, later recall. Revisit a concept with a new complication rather than repeating the same exercise.
3. Keep each lesson to one main decision. Mark specialist mathematics, formal models, and implementation detail as optional deeper study.
4. Begin a project early and build it through the course. Give completed examples before asking for independent analysis.
5. Include a coverage matrix so core HCI topics have an outcome and practice task, and distinguish specialist awareness from practical competence.
6. Verify comprehension with intended beginners. Sentence-length and readability checks are useful editing signals, but learners must be able to explain and apply the idea.
7. Keep traceable evidence categories: a design prediction, a fictional case observation, and a finding observed in a learner's own study.
8. Review dated examples and recommendations individually. Older password examples, historical timing claims, and disability terminology are not ready-to-publish guidance.

## Work still required before teaching or release

Author the complete lessons and activities; closely verify each assigned section and factual claim; create original illustrations and data; check activity accessibility; pilot with intended learners; revise based on their explanations and task performance; and complete the repository's functional and publishing checks.
