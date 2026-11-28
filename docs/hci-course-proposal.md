# Human-computer interaction for product designers

Curriculum proposal for Graphnotes, revision 2. Prepared November 28, 2026. This revision incorporates the two additional books and beginner-oriented articles. Status: curriculum and teaching plan for review; lesson implementation and publication follow this stage.

## 1. Purpose, learners, and scope

Help learners understand why an interaction is easy or difficult, investigate the real task, design a better response, and evaluate it. The intended graduate can connect a person's need to an interface decision and explain what evidence supports that decision.

The course is written for regular college students, learners around tenth-standard reading level, and product designers developing their foundations. No coding, psychology course, or advanced mathematics is required. Familiarity with everyday apps and the ability to make a rough sketch are enough to start. Specialist vocabulary is introduced and explained as it becomes useful.

### Proposed workload

- **Ten modules, four lessons each: 40 lessons.**
- **8-12 minutes** per guided lesson, including reading, the short activity, and two questions: about **5 hours 20 minutes to 8 hours** in total.
- Reserve **4-6 additional hours** for project work and review. A working estimate is **10-14 hours** for the complete course; recruiting and scheduling field research can add elapsed time.
- Lesson minutes exclude optional deeper reading and external project work. Validate the estimates with intended learners before displaying them as settled course durations.
- Suggested pace: one module per week, with a faster self-directed path available.

### What counts as essential

The core covers human capabilities, interaction models, task/context research, design principles, interaction styles, information and help, inclusive design, ethics, prototyping, evaluation, collaboration, networked behavior, and introductory contemporary interaction.

Depth is deliberate: learners practise common design tasks, interpret important models, and recognize specialist topics. Full cognitive architecture research, statistical inference, formal verification, haptic engineering, and advanced AR/VR design belong in further study. A finite introductory course should state which skills it develops and which topics it introduces.

By completion, learners should be able to frame a human goal, explain a plausible interaction problem, choose a suitable research method, create a task model and alternative prototypes, account for inclusion and agency, run or analyze a formative evaluation, and defend a revision with appropriate limits.

## 2. Sources and how they are used

| Reference | Role |
| --- | --- |
| **D: Dix, Finlay, Abowd, and Beale, Human-Computer Interaction, third edition, 2004** | The conceptual backbone: people, computers, interaction, design, models, support, and evaluation. |
| **S: Shneiderman and Plaisant, Designing the User Interface, fourth edition, 2005** | Practical interface decisions: direct manipulation, rules, menus/forms, messages, search, help, collaboration, and response time. |
| **H: Sears and Jacko, editors, The Human-Computer Interaction Handbook, second edition, 2008** | Specialist explanations, empirical qualifications, diversity, methods, and human values. |

The books inform original explanations and activities. The learner does not need the books to understand a core lesson. Historical examples, security advice, terminology, and technology-specific recommendations require review before reuse.

The planning review covered structures, selected explanatory sections, worked examples, and chapter summaries. It is not a claim that all three books have been read cover to cover or that the final lesson copy has already been verified. Exact review scope, editions, file details, article authorship, and source cautions are in [HCI source notes](hci-source-notes.md).

### Readable article references

- **A1:** [NN/G, Usability 101](https://www.nngroup.com/articles/usability-101-introduction-to-usability/): selected introductory sections on usability, utility, people, tasks, and context.
- **A2:** [NN/G, Mental Models](https://www.nngroup.com/articles/mental-models/): the definition and one familiar example after the lesson explanation.
- **A3:** [NN/G, 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/): a relevant example at a time; the full set becomes a reference during inspection practice.
- **A4:** [W3C WAI, Introduction to Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/): definitions, everyday examples, and evaluation boundaries.
- **A5:** [GOV.UK, Plan user research for your service](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service): research questions, user groups, and method selection.
- **A6:** [GOV.UK, Using moderated usability testing](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing): task writing and neutral facilitation.
- **A7:** [GOV.UK, Use clear language](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/): primarily an editorial reference, with optional sections for the interface-writing lesson.

These pages were read through Ego Lite for this revision. Recommendations are based on editorial inspection, with comprehension still to be checked with learners. Each reading needs a purpose and a suggested section; external reading is optional.

**WCAG:** [WCAG 2.2](https://www.w3.org/TR/WCAG22/) is the authoritative technical accessibility reference for authors. **HAI:** [Amershi et al., Guidelines for Human-AI Interaction, CHI 2019](https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/) supplements the older adaptive-systems material. Both were checked in the earlier planning pass and are deeper references, not first readings for beginners.

## 3. Teaching approach and language

Use this sequence repeatedly: **recognize a problem -> predict the result -> try or inspect it -> explain why -> change the design -> check the change.**

Start with familiar examples such as a school form, ticket booking, food order, or an ATM. Introduce a recurring appointment-booking case after the learner understands the task. Later use a different case so learners have to transfer the idea.

### Language rules

- Begin with a concrete situation. Name the technical idea after explaining it in ordinary words.
- Keep one main decision per lesson and usually introduce no more than two or three new terms.
- Use short paragraphs, clear verbs, and mostly short sentences. Review sentences over 25 words; preserve longer ones when they are clearer.
- Explain each specialist term when first used and provide a small glossary. Avoid unexplained acronyms and culture-specific idioms.
- Make an abstract model visible in a small example. Do not require memorizing labels to demonstrate understanding.
- Use respectful, adult language. Everyday examples should make the concept accessible while preserving its accuracy and important limitations.
- Use meaningful labels in diagrams and provide a text explanation of the same information. Core learning works without sound or video.
- Readability scores can flag dense writing. A learner explaining and applying the idea is the stronger check.

For example: "Show whether the booking was saved so the person knows what to do next" introduces the idea before the term **visibility of system status**. "Keep the chosen time on the next screen so it does not have to be remembered" introduces **working memory** and **recognition versus recall**.

### Scaffolding and review

1. Show one worked example with a visible reasoning process.
2. Give a partly completed example with prompts.
3. Ask the learner to solve a related case independently.
4. Return to the concept in a different context and through the existing spaced review.

Use three labels inside the learning material: **Essential idea**, **Practise it**, and optional **Go deeper**. In the pointing lesson, every learner explains the effect of target size and distance; deeper study can examine the equation and assumptions. In task analysis, everyone builds a small hierarchy; advanced notation is optional.

Offer a brief ungraded opening diagnostic to let learners notice their own assumptions. It does not block access. At the end, ask learners to explain a new case so recognition of repeated quiz answers is not mistaken for transfer.

## 4. Proposed index and outcomes

The activities below are briefs for future authoring, not completed teaching assets. Each row has one main assessable outcome. References use the source keys above and chapter numbers; final readings need a checked section/page locator.

### Module 1. Start with people

Understand what HCI studies, who the product serves, and what a useful outcome looks like.

| # | Lesson | Learner will be able to | Guided activity | Sources |
| --- | --- | --- | --- | --- |
| 01 | Start with a human goal | Turn a feature request into a person, goal, and intended outcome. | Reframe an appointment calendar request; compare a school form and a ticket machine. | D introduction, ch. 5; S ch. 1; H ch. 46 |
| 02 | Know what makes a product useful and usable | Separate needed functionality from ease of use and the wider experience. | Match examples to effectiveness, learning, efficiency, retention, errors, or satisfaction. | D ch. 6; S ch. 1; A1 |
| 03 | Look at the whole situation | Identify people, devices, environments, and affected stakeholders. | Follow a booking across a phone, an interruption, and a staff handoff. | D ch. 3, 13; H ch. 27, 48 |
| 04 | Set goals you can check | Define a task, population, context, and observable success measure. | Replace "make booking intuitive" with a criterion and a way to check it. | D ch. 6; S ch. 1, 4; H ch. 47 |

**Module output:** An interaction brief with a person, goal, use context, assumptions, and success criteria.

### Module 2. Understand how people notice, remember, and learn

Explain a specific interaction difficulty using human capabilities and limitations.

| # | Lesson | Learner will be able to | Guided activity | Sources |
| --- | --- | --- | --- | --- |
| 05 | Help people notice what matters | Use grouping, hierarchy, contrast, and redundant cues to support finding information. | Find the next available appointment in two layouts. | D ch. 1, 5; S ch. 12; H ch. 2, 17 |
| 06 | Reduce what people must remember | Replace unnecessary recall with visible or easily retrieved information. | Compare details across separate screens with and without an editable summary. | D ch. 1; S ch. 2; H ch. 2, 25 |
| 07 | Understand what people expect | Identify a mismatch between a person's belief about the system and its behavior. | Predict what Save, Submit, and Booked mean in a case, then inspect the result. | D ch. 3; H ch. 3; A2 |
| 08 | Support learning, emotion, and interruptions | Preserve context for someone who is new, distracted, or under pressure. | Resume an unfinished task and explain what information makes resuming easier. | D ch. 1, 7; S ch. 11; H ch. 4, 6 |

**Module output:** An annotated critique with a prediction, plausible mechanism, and alternative explanation.

### Module 3. Learn how people actually work

Turn uncertainties into research questions and represent the work using evidence.

| # | Lesson | Learner will be able to | Guided activity | Sources |
| --- | --- | --- | --- | --- |
| 09 | Choose how to learn about the problem | Choose observation, interview, survey, or task testing for a specific uncertainty. | Match questions to methods and identify what each method cannot establish. | D ch. 9, 13; S ch. 3, 4; H ch. 48-50; A5 |
| 10 | Observe and ask without leading | Distinguish observed behavior, a participant's report, and the designer's inference. | Annotate a fictional observation/interview record; prepare consent and neutral prompts. | D ch. 13; S ch. 3; H ch. 48, 49 |
| 11 | Break a task into goals, steps, and decisions | Build a task hierarchy and explain ordering, dependencies, and exceptions. | Reconstruct rescheduling from evidence and compare it with a mere list of clicks. | D ch. 15; H ch. 48 |
| 12 | Turn evidence into profiles and scenarios | Describe task-relevant behaviors and a scenario with traceable assumptions. | Replace an invented demographic persona with a supported profile and discuss whose input is missing. | D ch. 5, 13; S ch. 3; H ch. 51, 53, 54 |

**Module output:** A research question, evidence log, task model, and use scenario.

### Module 4. Make the interaction understandable

Connect a person's intention to a visible action, an understandable result, and safe recovery.

| # | Lesson | Learner will be able to | Guided activity | Sources |
| --- | --- | --- | --- | --- |
| 13 | Make possible actions clear | Use visible clues and mappings to help someone choose an action. | Trace a goal through an action and result; compare ambiguous and explicit controls. | D ch. 3, 7; S ch. 2; H ch. 9, 48 |
| 14 | Show what happened and what happens next | Specify feedback for pending, completed, failed, and unknown outcomes. | Follow a booking request and distinguish navigation from reversing a committed action. | D ch. 3, 16; S ch. 2, 11; H ch. 14 |
| 15 | Prevent errors and help people recover | Choose prevention or recovery based on the cause, consequence, and reversibility of an error. | Compare action separation, review, confirmation, and undo in a cancellation flow. | D ch. 1, 7; S ch. 2, 12; H ch. 8 |
| 16 | Use consistency and design rules wisely | Apply a relevant design principle and explain when context changes the recommendation. | Review a flow using selected golden rules and usability heuristics; identify a justified exception. | D ch. 7; S ch. 2; A3 |

**Module output:** A state-and-action flow plus an explanation of the design principles used.

### Module 5. Choose how people interact

Match an interaction style and input method to the task, the person, and their experience.

| # | Lesson | Learner will be able to | Guided activity | Sources |
| --- | --- | --- | --- | --- |
| 17 | Choose between menus, direct actions, and commands | Compare interaction styles and select an appropriate combination. | Move an appointment by drag, explicit selection, or command; provide an equivalent alternative. | D ch. 2, 3; S ch. 6-9 |
| 18 | Design forms that help people finish | Choose needed fields, sensible steps, validation, and information preservation. | Complete a form, fix one error, return to an earlier step, and inspect retained answers. | D ch. 5; S ch. 7; H ch. 25 |
| 19 | Make pointing and choosing easier | Explain the separate roles of target geometry, choice, and familiarity. | Compare pointer targets and a separate choice task; inspect supplied results without compulsory timing. | D ch. 2, 12; S ch. 9; H ch. 1, 2, 9 |
| 20 | Support first-time and frequent use | Keep a discoverable path while reducing effort in routine work. | Compare a normal path and shortcut; outline a simple KLM prediction and its limits. | D ch. 7, 12; S ch. 2, 8; H ch. 60 |

**Module output:** Two alternatives and an input/interaction choice with its assumptions.

### Module 6. Help people find, understand, and finish

Make information, language, assistance, and prototypes serve the intended task.

| # | Lesson | Learner will be able to | Guided activity | Sources |
| --- | --- | --- | --- | --- |
| 21 | Make navigation and search work together | Support finding an item, understanding scope, narrowing results, and recovering from an empty result. | Find and change a booking through navigation, search, and filters; inspect a simple overview. | D ch. 5, 21; S ch. 7, 14; H ch. 26, 28 |
| 22 | Write labels and messages people understand | Write clear action labels, instructions, empty states, and constructive errors. | Rewrite a confusing school-form message and a product error; check what the reader should do. | D ch. 5; S ch. 12; A7 |
| 23 | Give help when it is needed | Choose useful onboarding, contextual help, or documentation for a particular difficulty. | Compare a compulsory feature tour with optional guidance inside the actual task. | D ch. 11; S ch. 13; A3 |
| 24 | Prototype the behavior you need to test | Choose prototype detail and interactivity to answer a question and describe its states. | Select a paper, fixed-path, or stateful prototype; find a dead end in a small state diagram. | D ch. 5, 6, 16; S ch. 5; H ch. 52, 53 |

**Module output:** A low-fidelity prototype, its key messages, and an in-context help plan.

### Module 7. Design for inclusion and human agency

Recognize and address barriers and consequential choices throughout the task.

| # | Lesson | Learner will be able to | Guided activity | Sources |
| --- | --- | --- | --- | --- |
| 25 | Support keyboard and assistive technology | Describe an equivalent completion path with meaningful labels, focus, and error access. | Inspect keyboard order, error links, focus return, and a text alternative. | D ch. 10; S ch. 1; H ch. 42, 43; A4; WCAG |
| 26 | Support different people and conditions | Explain how capability, task, environment, and technology combine to create a barrier. | Review zoom, perception, comprehension, motion, temporary limitations, and low connectivity. | D ch. 10; S ch. 1; H ch. 39-45; A4 |
| 27 | Design across languages and cultures | Identify assumptions in words, dates, symbols, direction, and formats that require validation. | Compare ambiguous dates and translated instructions without relying on national stereotypes. | D ch. 5, 10; S ch. 1; H ch. 18, 44 |
| 28 | Protect privacy, consent, and control | Identify affected people and make an optional or consequential choice understandable and controllable. | Inspect sharing defaults, refusal, reversal, and consequences for a person outside the screen. | D ch. 13; S ch. 3, afterword; H ch. 7, 32, 63 |

**Module output:** An inclusion, language, privacy, and control review with checks still needed.

### Module 8. Evaluate and improve with evidence

Choose an evaluation, record observations, and make a defensible revision.

| # | Lesson | Learner will be able to | Guided activity | Sources |
| --- | --- | --- | --- | --- |
| 29 | Inspect a design and walk through a task | Apply a heuristic review or cognitive walkthrough to a specific task. | Compare predictions from a rule-based review with a first-use walkthrough. | D ch. 9; S ch. 4; H ch. 59; A3 |
| 30 | Plan and run a usability session | Write a realistic task and use neutral facilitation with relevant, consenting participants. | Revise leading tasks and moderator prompts, then rehearse a short session. | D ch. 9; S ch. 4; H ch. 57; A6 |
| 31 | Read measures and compare designs fairly | Interpret task success, errors, time, and self-report while recognizing misleading comparisons. | Analyze a fictional log; identify a learning/order effect and distinguish a usability session from an A/B experiment. | D ch. 9; S ch. 4; H ch. 57, 58; A1 |
| 32 | Choose a change and check it again | Connect a revision to evidence, task consequence, confidence, and a follow-up evaluation. | Prioritize findings, compare a revised state, and write an honest result statement. | D ch. 5, 6; S ch. 4; H ch. 47, 57, 59 |

**Module output:** A test protocol, candidate/observed findings table, and prioritized revision plan.

### Module 9. Handle shared, mobile, and adaptive systems

Transfer the same principles to multiple people, distributed states, and uncertain automation.

| # | Lesson | Learner will be able to | Guided activity | Sources |
| --- | --- | --- | --- | --- |
| 33 | Design for people working together | Specify roles, visibility, handoffs, and awareness in a shared task. | Follow an invitation from both people's perspectives, including a changed permission. | D ch. 13, 14, 19; S ch. 10; H ch. 27 |
| 34 | Handle delays, disconnection, and shared state | Distinguish local display, saved data, pending work, and conflicting changes. | Inspect a save through loss of connection and a change made by another person. | D ch. 2, 18, 19; S ch. 11; H ch. 14 |
| 35 | Keep people in control of adaptive and AI features | Set expectations and provide appropriate correction, confirmation, and recovery for an uncertain suggestion. | Accept, reject, and correct a suggested time; distinguish a suggestion from a committed action. | D ch. 11; H ch. 22, 32; HAI |
| 36 | Choose a suitable device and interaction mode | Choose touch, keyboard, voice, or another mode for a context and explain an alternative. | Compare a phone, kiosk, and voice-assisted task; introduce wearable and AR/VR questions as awareness topics. | D ch. 2, 10, 20; S ch. 6, 9; H ch. 19, 21, 23 |

**Module output:** A two-person/async state specification and a statement about control of automated actions.

### Module 10. Complete and explain a redesign

Bring the earlier artifacts together into one design decision supported by evidence.

| # | Lesson | Learner will be able to | Guided activity | Sources |
| --- | --- | --- | --- | --- |
| 37 | Define your capstone and evidence plan | Select a bounded task, affected users, success criteria, and an appropriate evidence path. | Choose one project brief and identify the most important unknown. | D ch. 5, 13; S ch. 3; H ch. 47, 48 |
| 38 | Build alternatives and a testable prototype | Show two plausible solutions and justify a prototype covering the task and important failure states. | Assemble the earlier module work and specify what the prototype can and cannot test. | D ch. 5, 6, 16; S ch. 5; H ch. 52, 53 |
| 39 | Evaluate, revise, and document the result | Use study or supplied-case evidence to make and check a revision. | Complete the chosen evidence path and compare the original and revised behavior. | D ch. 9; S ch. 4; H ch. 57, 59 |
| 40 | Defend the design and plan what comes next | Explain the task, alternatives, evidence, remaining limits, and next check. | Write a short decision memo and a developer/QA handoff describing behavior and acceptance checks. | D ch. 6; S ch. 3, 4; H ch. 57, 63 |

**Module output:** A revised prototype and decision memo with a transparent evidence record.

Lessons 37-40 explain and support the capstone. Project execution is counted in the external workload, not hidden inside four short lesson estimates.

## 5. Standard lesson format for Graphnotes

| Part | Teaching requirement | Current system fit |
| --- | --- | --- |
| Title and promise | A concrete question/action, one observable outcome, prerequisites, time. | `title`, `description`, `minutes`; outcome/prerequisites also in the authoring specification. |
| Recognizable problem | A brief story and a prediction prompt. | First entry in `sections`. |
| Essential explanation | Two or three short sections: mechanism, example, and a boundary/tradeoff. Start around 350-550 words total, then adjust to comprehension. | Remaining `sections`. |
| Practise it | Try an interface, compare examples, reconstruct a task, or interpret evidence. Ask for a prediction first and reveal a worked explanation after an attempt. | HCI activity specification and renderer needed; current labs render charts. |
| Key takeaway | One sentence usable in a design critique. | `takeaway`. |
| Check understanding | Two three-option scenario questions: one diagnosis and one transfer to a different case. | `questions` and existing answer review/retry. |
| Feedback | Explain the preferred answer under stated conditions and why the plausible alternatives fit less well. | Current `explanation` field can contain that reasoning. |
| Apply it | A small observable output for the module project, with an estimated external time. | `practice`; saved open responses need integration. |
| Recall later | One concept question that requires explanation rather than term matching. | `flashcard` and current review schedule. |
| Sources / Go deeper | A precise reading locator and an optional next question. | `reading` and course-specific Sources. |

The at-work/project task is outside the guided lesson minutes. Text explanations and equivalent activities support keyboard users, reduced motion, and learners who cannot use a timed pointer task.

### Example lesson brief: 15. Prevent errors and help people recover

**Outcome:** choose a response suited to the cause, consequence, and reversibility of an error.

**Opening:** while changing an appointment, someone accidentally chooses Cancel booking, placed beside Continue. Ask what caused the problem before choosing a solution.

**Explanation:** distinguish a slip from a misunderstanding; compare prevention, review, confirmation, and undo; check what has already happened before describing an action as reversible.

**Activity:** inspect three versions with the same task. Compare the original actions, clearer separation/labels, and an appropriate recovery path. Ask what each change addresses and what it leaves unresolved.

**Example check:** a supplied observation record shows people understand both labels but tap the neighboring destructive action by accident. The action is genuinely reversible in this teaching fixture. Which change best addresses the observed cause?

- A. Keep the placement and add longer cancellation instructions at the beginning.
- B. Separate the actions, retain clear labels, and offer recovery if the wrong action still occurs.
- C. Keep the placement and ask for confirmation after every action, including harmless ones.

**Preferred answer: B.** The observation points to an action slip, so separation addresses the condition that led to it. Earlier instructions do not change that condition. Confirming every action adds interruption and does not specifically address the dangerous placement. A confirmation can still be appropriate for a consequential or irreversible action; that is a separate decision.

**Transfer check:** change a teammate's access. Revoking access later cannot undo information already seen. Ask which consequence needs to be explained before the action.

**Apply it:** draw normal, error, and recovery paths for one action. **Recall:** what must you know before deciding that undo is enough?

**Sources:** H ch. 8; D ch. 1 and 7; S sections 2.3.5 and 12.2. Verify the exact source passages while writing the final lesson.

## 6. Practice, project, and assessment

### Planned materials

- 40 complete lesson briefs and lessons.
- 80 lesson questions reused in module/mixed practice. Reuse supports recall; it does not create an independent final exam.
- 40 flashcards using the current review scheduling.
- Ten module outputs with checklists and worked examples, carried into one project.
- Sixteen proposed lab scenarios made from reusable activity patterns; other lessons use short annotated cases and evidence exercises.
- Two capstone briefs; the learner completes one.
- A Sources page, a small glossary, and optional deeper-reading routes.

### Lab scenarios

| Lab | Main lesson | What varies or is inspected |
| --- | --- | --- |
| Visual search | 05 | Grouping and competing emphasis. |
| Recognition and recall | 06 | Availability of a persistent summary. |
| Predict the system | 07 | Labels, expectations, and resulting states. |
| Task reconstruction | 11 | Goals, steps, dependencies, and exceptions. |
| Feedback and latency | 14 | Pending, failed, committed, and unknown states; reuse with network complications in lesson 34. |
| Error and recovery | 15 | Action placement, prevention, confirmation, and undo. |
| Direct action or explicit control | 17 | Dragging versus a menu/selection path, including an equivalent accessible alternative. |
| Progressive form | 18 | Steps, editable summaries, validation, and back behavior. |
| Pointing and choosing | 19 | Target geometry and a separate choice condition. |
| Find and narrow results | 21 | Navigation, search scope, filters, empty results, and overview/detail. |
| Help in context | 23 | Help that supports the current task and preserves the person's place. |
| Keyboard and focus | 25 | Order, labels, error access, and focus return. |
| Consent and defaults | 28 | Optional sharing, refusal, consequences, and reversal. |
| Session evidence | 31 | Observed behavior, counts, time, self-report, and alternative explanations. |
| Two-person task | 33 | Invitation state, access, awareness, and handoff. |
| Correct an AI suggestion | 35 | Expectations, accept/reject/correct paths, and the point of commitment. |

These are bounded teaching examples. A learner's reaction time or pointer speed is not a measure of design ability. Timed trials are optional, with a worked dataset and an equivalent way to reason about the model. Accessibility demonstrations identify specific barriers; they do not claim to simulate living with a disability.

### Capstone cases

**A. Book and change a service appointment.** Support finding a time, reviewing it, confirming, rescheduling, and recovering from failure. Account for a new or interrupted user, a small screen, and alternative interaction needs.

**B. Invite a teammate and control access.** Support the inviter and invitee, the scope of access, clear consequences, changed permissions, and recovery. Consider others affected by the decision.

A learner starts the brief in Module 1 and builds it through later outputs. Module 10 assembles, evaluates, and explains the final revision.

### Required evidence and submission

Submit the goal and context; assumptions and success criteria; a task model and evidence log; two alternatives and a reasoned selection; a prototype covering important states; inclusion/agency checks; an evaluation record; and a revised design with a short decision memo and behavior/acceptance notes.

Use explicit evidence categories: **prediction**, **fictional case observation**, and **observation from the learner's own study**. Keep unresolved assumptions visible.

Offer two evidence paths:

- **Field-practice path:** relevant, consenting participants; neutral tasks; a modest formative evaluation; documented recruitment, coverage, and limits. Choose participant numbers for the question, risk, and relevant groups.
- **Guided-case path:** supplied fictional research and session records. Learners practise evidence interpretation; the records do not validate their own prototype with actual users.

For younger learners, use ordinary low-risk tasks and fictional fixture data; any study with classmates follows their school's consent and supervision arrangements.

### Rubric and completion

Use six dimensions: problem framing; cognitive/interaction rationale; task evidence and alternatives; inclusion and agency; evaluation quality; and revision with honest communication.

Score each dimension for self-review: **0 missing, 1 asserted, 2 supported, 3 supported with clear reasoning and limits**. Provide an annotated worked project. Independent grading requires a reviewer; keyword matching or checklist completion cannot establish professional design competence.

Keep lesson completion, recall, quiz results, project checklist completion, and reviewed work as separate learning records. The final transfer case asks for reasoning on a new problem; it is not just a repeated quiz.

## 7. Coverage of essential HCI

| Essential area | Core lessons | What demonstrates learning |
| --- | --- | --- |
| HCI, utility, usability, UX, and the human-centered lifecycle | 01-04, 24, 32 | A bounded brief and observable success criteria; iterative revision. |
| Perception, attention, grouping, memory, learning, emotion, individual differences | 05-08, 19, 25-27 | Explain an interaction difficulty and propose a reasoned change. |
| Mental models, action cycle, mappings, affordances/signifiers | 07, 13-14 | Predict an action/result and explain a mismatch. |
| Research questions, methods, consent, participation, stakeholder needs | 03, 09-12, 28, 30 | A suitable method, evidence labels, neutral prompts, and missing perspectives. |
| Task analysis, scenarios, requirements, and task hierarchies | 04, 11-12, 37 | A task model with decisions and constraints, connected to a design requirement. |
| Feedback, consistency, flexibility, errors, recovery, and principles | 13-16, 20 | A flow covering important states, plus a justified review finding. |
| Interaction styles, direct manipulation, menus, forms, commands | 17-20, 36 | Choose and compare methods using task/context evidence. |
| Motor interaction and predictive models | 19-20 | Explain Fitts/Hick-Hyman and a simple KLM/GOMS purpose and limitation. |
| Information architecture, search, filtering, overview/detail | 21 | Complete a finding task and recover from an empty result. Deeper chart design links to Graphnotes' visualization course. |
| Interface language, help, onboarding, documentation | 22-23 | Rewrite an instruction/error and choose support that preserves task context. |
| Prototypes, dialog states, transitions, design rationale, handoff | 24, 38, 40 | A fit-for-question prototype, a small state model, alternatives, and behavior notes. |
| Accessibility, universal design, culture, ethics, privacy, agency | 25-28 and cross-course examples | An inclusion/control review with concrete checks and unresolved needs. |
| Inspection, walkthrough, qualitative testing, surveys, quantitative comparisons | 09, 29-32 | A justified method, neutral test, interpreted results, and limits on inference. |
| Collaboration, social/organizational context, shared artifacts | 03, 12, 33-34 | Describe both people's goals, awareness, permissions, and handoff. |
| Networks, performance, interruption, uncertainty, distributed states | 08, 14, 34 | Distinguish pending, locally visible, saved, and conflicting work. |
| Adaptive/AI, mobile, multimodal, ubiquitous and extended-reality interaction | 35-36 | Reason about control, alternatives, context, and failure; specialist technologies are introduced, not certified skills. |

### Optional deeper routes

- **Models:** D ch. 12, 16-18; H ch. 5, 60. Explore detailed GOMS/KLM, cognitive architecture, and formal models.
- **Study design and statistics:** D ch. 9; S ch. 4; H ch. 57-58. Develop sampling, controls, uncertainty, and analysis beyond the core interpretation exercises.
- **Collaboration and organizational systems:** D ch. 13-14, 19; S ch. 10; H ch. 27, 54.
- **Physical and emerging interaction:** D ch. 2, 20; S ch. 6, 9; H specialist chapters on input, haptics, wearables, multimodality, and virtual environments.
- **Visualization:** S ch. 14; H ch. 26, plus the existing Graphnotes Data Visualization course.

## 8. Fit with Graphnotes

The current architecture already provides the course library, overview, reader, module navigation, quizzes, flashcards, Sources, preferences, per-course progress, and backups. Reuse the HCI course ID `human-computer-interaction`, the Astryx system, and the current appearance modes.

Keep teaching metadata such as outcomes, prerequisites, misconceptions, activity briefs, and evidence expectations in the authoring specification. The published core copy maps to the current lesson fields. Assign permanent lesson IDs before release.

Implementation needs:

1. Separate HCI curriculum/source files registered through the existing course-content helpers.
2. An HCI activity specification and course-aware renderer. The current lab type accepts chart data and reader navigation says "Try the chart."
3. Course-scoped HCI practice/project routes and navigation. Existing chart challenges and capstone routes are specific to Data Visualization.
4. Suitable persistence and backup validation for HCI project artifacts and meaningful activity state.
5. Original teaching fixtures, text alternatives, and any glossary/deeper-reading presentation that needs UI support.

A deliberately flawed lab state stays inside a clearly bounded example. The surrounding course controls remain usable. A new course cannot gain working HCI projects just by enabling the existing chart-course flags.

The scheduled date stays a catalog setting during planning. Availability changes only after the content, practice, and course behavior are ready for publication.

## 9. Authoring, learner testing, and release

1. **Use this index as the working curriculum.** Keep an outcome, a prerequisite, and a coverage justification for each lesson. Revise based on evidence rather than filling a lesson count.
2. **Write a three-lesson pilot:** 06 (memory), 15 (errors), and 30 (testing). Supply the prerequisites in the pilot briefing. These test a conceptual explanation, an interactive design decision, and a practical method before scaling authorship.
3. **Try the pilot with intended learners:** include a learner around tenth-standard reading level, a general college learner, and a novice designer where feasible. These are audience examples, not a sufficient validation sample by themselves. Check what they understand, where they need help, and how well they transfer the idea.
4. **Author the remaining lessons in prerequisite order.** Closely check each assigned passage and claim. Create original figures, fixtures, feedback, and worked examples. Label hypothetical evidence.
5. **Integrate the course and HCI activities.** Reuse shared learning tools; implement course-specific behavior and artifacts with the repository's Astryx guidance.
6. **Run the complete learning path with beginners.** Check progression, cumulative burden, delayed recall, transfer, mobile/keyboard access, reading links, and project feasibility. Revise time estimates from actual usage.
7. **Complete editorial and functional review.** Run the checks documented in `docs/design/adding-a-course.md`, plus appropriate new behavior checks. Verify all themes, narrow screens, persistence, resume, quiz/review, Sources, and course-matched import/export.
8. **Publish deliberately.** Update course availability when ready; the countdown alone does not publish course content.

### Learner acceptance checks

For the pilot, ask learners to retell the idea in their own words, predict a new example, make a justified change, and explain a condition where the recommendation changes. Record unfamiliar vocabulary, wrong interpretations, unnecessary hints, activity failures, and actual time. The pilot is an evaluation plan, not evidence already collected.

### Editorial checks

- One main decision, a recognizable example, a plain explanation, a useful activity, a transfer question, and a limitation in each lesson.
- Show why an answer fits. Plausible alternatives must be taken seriously; avoid joke options and unsupported absolutes.
- Distinguish a heuristic from a requirement, a model prediction from an observation, and a fictional fixture from study evidence.
- Use the eight golden rules and ten heuristics as related review references; practise the reasoning rather than memorizing both lists.
- Teach working-memory findings, Fitts' law, Hick-Hyman, and KLM with their assumptions. Avoid universal seven-item menus, indiscriminate choice reduction, or treating fast pointing as whole-task usability.
- Review older security examples, timing findings, medical/disability language, and product references before publication.
- Pair a selected WCAG criterion with an accurate concrete example. A small classroom checklist is not a conformance assessment.
- Make core learning available without paid readings, video, sound, precise motor control, or an external textbook.

## 10. Proposed direction for the next stage

Proceed from this 40-lesson working index to the three complete pilot lessons and their activities, followed by learner review and full authoring. Keep implementation and publication as later stages of the agreed work. All three supplied books are now part of the source plan; supporting articles have specific student or editorial roles.
