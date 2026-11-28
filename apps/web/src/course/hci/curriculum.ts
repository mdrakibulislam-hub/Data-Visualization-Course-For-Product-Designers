import type { CourseModule } from "../catalog";
import type { LessonGuide } from "./types";

/** Original lessons informed by the credited sources; case observations are fictional. */
export const hciModules = [
  {
    "title": "Start with people",
    "description": "Define whose task matters and what a useful outcome looks like.",
    "lessons": [
      {
        "id": "hci-human-goals",
        "title": "Start with a human goal",
        "minutes": 10,
        "description": "Turn a feature request into a person, goal, and useful outcome.",
        "sections": [
          {
            "title": "Start with something someone needs to do",
            "body": "A student opens a booking app because they need a quiet place to study before an exam. The calendar is a means to that goal. A beautiful calendar that hides available rooms still leaves the student stuck. Human–computer interaction, or HCI, studies how people use technology and how we can improve that relationship. It draws on design, psychology, computing, and the study of people working together."
          },
          {
            "title": "Separate a goal from a feature",
            "body": "“Add a calendar” names a feature. “Help a student reserve an available room for tomorrow afternoon” names a person and an outcome. Both are useful statements, but they answer different questions. Start with the outcome, then ask what information and actions support it. A searchable list might solve the problem better than a calendar, especially when only a few times are available."
          },
          {
            "title": "Follow the task beyond the screen",
            "body": "The student might need approval from a librarian, an accessible room, and a confirmation they can find later. A task often crosses screens, devices, and people. Include those boundaries in the brief. Ask who else is affected: reserving a room changes what other students can book. The visible controls are only part of the system you are designing."
          },
          {
            "title": "Write a brief you can question",
            "body": "Try: “Help students find and reserve a suitable room for tomorrow, so they can plan a study session.” Add what you still do not know: whether students search by time or by room, for example. A good brief starts an investigation rather than proving a solution. In this course we will use appointment booking as a recurring example, then transfer the ideas to sharing a team workspace. Both are fictional teaching cases."
          }
        ],
        "takeaway": "Name the person and intended outcome before choosing the interface.",
        "practice": "Allow 10 minutes. Choose the appointment or permissions capstone. Write one sentence naming the person, task, context, and outcome in the project’s Brief field.",
        "questions": [
          {
            "prompt": "Which brief best guides an initial design?",
            "options": [
              "Add a modern calendar.",
              "Help students reserve a suitable study room for tomorrow.",
              "Make every screen use the same layout."
            ],
            "answer": 1,
            "explanation": "The second brief gives a person and an outcome to investigate. A calendar is one possible solution; visual consistency cannot tell us whether the task is useful."
          },
          {
            "prompt": "A librarian must approve a reservation after the student submits it. What belongs in the task model?",
            "options": [
              "Only the student’s final screen.",
              "Only the approval software.",
              "The student request, staff decision, and confirmation received."
            ],
            "answer": 2,
            "explanation": "The outcome depends on a handoff. Ignoring it can make a request look complete when the room is still unconfirmed."
          }
        ],
        "flashcard": {
          "front": "What belongs in a human-centered brief?",
          "back": "A person, their goal, the context, and the useful outcome, with important assumptions made visible."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Introduction and chapter 5, user focus"
          },
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 1, usability of interactive systems"
          }
        ]
      },
      {
        "id": "hci-useful-usable",
        "title": "Know what makes a product useful and usable",
        "minutes": 10,
        "description": "Separate needed functionality, usability, and the wider experience.",
        "sections": [
          {
            "title": "Useful means it serves a real need",
            "body": "A booking app may be easy to operate and still offer no appointments in the location someone needs. Utility asks whether the needed function exists. Usability asks whether particular people can use it to achieve their task in a particular setting. A useful product needs both. Ask the question for a concrete person rather than calling an interface simply “user-friendly.”"
          },
          {
            "title": "Look at several parts of usability",
            "body": "Can a newcomer learn the task? Can a frequent user do it efficiently? Can someone returning after a month remember how it works? What errors occur, how serious are they, and can people recover? How do people describe the experience? These questions reveal different qualities. A first-time visitor and a receptionist using the same system all day may need different support."
          },
          {
            "title": "Use success, effort, and experience together",
            "body": "Suppose four of five people make a booking, but two book the wrong service and one needs a moderator’s help. Reporting “80% success” without defining success hides the important detail. Decide what counts as an independent, correct outcome. Observe the path and errors as well as the final screen. Satisfaction is useful evidence, but someone saying “I like it” does not establish that they completed the task."
          },
          {
            "title": "Place usability within the whole experience",
            "body": "User experience, or UX, includes expectations, price, support, trust, and what happens after the interaction. A clear booking screen followed by an unexpected fee can still produce a poor experience. Do not reduce the course to making buttons easier to press. Ask whether the whole service supports the person, and choose measures that match the specific quality you want to improve."
          }
        ],
        "takeaway": "An interface needs useful functions and a usable path to a meaningful outcome.",
        "practice": "Allow 10 minutes. Add one learning, one task-success, and one experience question to your project brief. Explain what each answer would help you decide.",
        "questions": [
          {
            "prompt": "People finish a reservation easily, but none of the offered rooms meet their access needs. What is missing?",
            "options": [
              "Utility for those people’s actual task.",
              "Greater visual consistency among the listed rooms.",
              "More instructions for choosing among the same unsuitable rooms."
            ],
            "answer": 0,
            "explanation": "The needed outcome is unavailable. Improving the presentation or instructions for the same unsuitable options does not provide a suitable service. Access needs belong in the definition of a useful outcome."
          },
          {
            "prompt": "Which evidence most directly supports a claim that newcomers can book independently?",
            "options": [
              "They say the app looks professional.",
              "They prefer its colors.",
              "They complete a realistic booking without hints, under a stated success rule."
            ],
            "answer": 2,
            "explanation": "Observed independent completion addresses the task claim. Preferences can inform satisfaction, but they cannot substitute for the behavior."
          }
        ],
        "flashcard": {
          "front": "How do utility and usability differ?",
          "back": "Utility is whether needed functions exist. Usability is whether specified people can use them to achieve a task in context."
        },
        "reading": [
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 1, sections 1.2–1.3"
          },
          {
            "source": "hci-usability",
            "locator": "What Is Usability; Utility; UX"
          }
        ]
      },
      {
        "id": "hci-context",
        "title": "Look at the whole situation",
        "minutes": 10,
        "description": "Identify the people, environment, devices, and handoffs around a task.",
        "sections": [
          {
            "title": "A task changes with its setting",
            "body": "Booking from a desk is different from booking on a crowded bus with one hand and a weak connection. The goal may be the same while attention, input, and connectivity change. Context includes the physical setting, technology, social relationships, and rules that affect use. It is evidence to investigate, not a collection of imagined difficulties added to a persona."
          },
          {
            "title": "Find everyone who is affected",
            "body": "The person holding the phone is not always the only stakeholder. Staff manage capacity, a family member may receive reminders, and another customer may be waiting for a released time. A stakeholder is someone affected by the system or able to affect its use. List their goals and conflicts. The manager’s preference for fast processing may conflict with a customer’s need to understand a choice."
          },
          {
            "title": "Follow the handoff",
            "body": "A request can be submitted, awaiting staff review, accepted, or rejected. Those are different states. Ask what each person sees, who can change it, and how the other person learns about the change. A confirmation that arrives only by email may be useless to someone who cannot access that email account. Include relevant offline tools such as a paper reference number."
          },
          {
            "title": "Check the assumptions in the real setting",
            "body": "Write assumptions in a form you can investigate: “People can return to the confirmation email while at the venue.” Observation or an interview about recent visits can challenge that assumption. Avoid declaring that every mobile user is rushed or every older adult needs the same layout. A context description should help select questions and design alternatives rather than stand in for research."
          }
        ],
        "takeaway": "Design the task across its actual setting and handoffs, including people outside the screen.",
        "practice": "Allow 15 minutes. List the people, devices, rules, and handoffs in your case. Mark two assumptions to investigate in the project Brief field.",
        "questions": [
          {
            "prompt": "A customer sees “Submitted” and assumes an appointment is confirmed, while staff still need to approve it. What should be investigated?",
            "options": [
              "Treat Submitted as confirmed because the customer finished entering data.",
              "The meanings and visibility of states across the customer–staff handoff.",
              "Add training while leaving the two state meanings unchanged."
            ],
            "answer": 1,
            "explanation": "The mismatch concerns a shared workflow and expectations. Completing data entry or training the customer does not establish whether staff approval has occurred."
          },
          {
            "prompt": "Which context statement is suitable for a research plan?",
            "options": [
              "All older people dislike phones.",
              "Mobile users always have poor attention.",
              "We need to check whether customers can access their confirmation at the venue."
            ],
            "answer": 2,
            "explanation": "The final statement is a specific, testable uncertainty. Broad demographic claims obscure differences among people and situations."
          }
        ],
        "flashcard": {
          "front": "Who is a stakeholder?",
          "back": "Someone affected by a system or able to affect how it is used, including people who never operate its interface."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapters 3 and 13, context and stakeholder requirements"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapter 48, users, tasks, and environments"
          }
        ]
      },
      {
        "id": "hci-success-goals",
        "title": "Set goals you can check",
        "minutes": 10,
        "description": "Write a success rule that names a task, people, context, and measure.",
        "sections": [
          {
            "title": "Make the desired outcome observable",
            "body": "“Make booking intuitive” does not tell you what evidence would count as improvement. Try: “A first-time visitor can book the required service at the intended time without help and explain whether it is confirmed.” This gives an observable outcome. Add the relevant setting, such as a phone on a normal mobile connection. The criterion is a proposed requirement, not a result you have already measured."
          },
          {
            "title": "Define success before counting it",
            "body": "Decide whether success means reaching a page or making the correct booking. Specify which errors matter, what help is allowed, and when a task ends. If a moderator points out the Submit button, record assisted completion rather than silently counting an independent success. Keep the same definitions when comparing designs. Otherwise the numbers may describe different tasks."
          },
          {
            "title": "Choose a measure for the question",
            "body": "Use task outcome to check effectiveness, time or effort to investigate efficiency, and appropriate ratings or questions to learn about experience. A lower time is not automatically better: someone may rush through consent without understanding it. For a consequential choice, comprehension can matter more than speed. Select a small set of measures that match the task instead of collecting every metric available."
          },
          {
            "title": "Separate a target from a claim",
            "body": "A team can set an ambitious target for a release, then test what the design supports. A small teaching study cannot establish a precise population success rate. Report the observed counts and study conditions, and explain the limits. Revisit the target when you learn that the user group, task, or setting was defined poorly. Measurement should sharpen the design question, not hide uncertainty behind a percentage."
          }
        ],
        "takeaway": "Define the outcome and how you will recognize it before evaluating the design.",
        "practice": "Allow 10 minutes. Save a task-success rule, a comprehension question, and the conditions you would test in your project brief.",
        "questions": [
          {
            "prompt": "Which success rule is easiest to evaluate consistently?",
            "options": [
              "People book the correct service and time without hints and identify its confirmation state.",
              "People enjoy the improved interface.",
              "People understand everything."
            ],
            "answer": 0,
            "explanation": "The first rule names observable behavior and a specific understanding check. Enjoyment needs its own measure, and “everything” is too broad to evaluate."
          },
          {
            "prompt": "A redesigned consent step is faster, but people cannot explain what they agreed to. What follows?",
            "options": [
              "Speed proves the redesign is better.",
              "The evaluation needs a comprehension criterion alongside time.",
              "Consent should be removed from the test."
            ],
            "answer": 1,
            "explanation": "Time addresses effort, not informed understanding. Keep the consequential choice in scope and investigate both outcomes."
          }
        ],
        "flashcard": {
          "front": "What makes a usability goal testable?",
          "back": "A named task, relevant people and context, a defined outcome, and an agreed way to observe or measure it."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 6, usability engineering"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapter 47, usability goal setting"
          }
        ]
      }
    ]
  },
  {
    "title": "Understand human abilities",
    "description": "Work with attention, memory, expectations, learning, and interruption.",
    "lessons": [
      {
        "id": "hci-attention",
        "title": "Help people notice what matters",
        "minutes": 10,
        "description": "Use grouping, hierarchy, and clear cues to support a finding task.",
        "sections": [
          {
            "title": "Attention follows a task",
            "body": "A student looking for an available afternoon time is not reading every label with equal care. They search for clues that appear relevant. Group related information and give important differences a visible form. A large heading, spacing, position, and a clear word can work together. Making every element bright creates competition rather than a clear next step."
          },
          {
            "title": "Give grouping a meaning",
            "body": "When time, service, and location belong to one appointment, present them together. Proximity and alignment help people read them as a unit. If a Cancel action sits among harmless viewing controls, the grouping may suggest that it is equally safe. A visual relationship should match the relationship in the task. Test whether people interpret the grouping as you intended."
          },
          {
            "title": "Communicate with more than color",
            "body": "Suppose available appointments are green and unavailable ones are red. A reader who cannot distinguish those colors still needs the information. Add words such as Available and Full, and make the selectable behavior clear. Contrast and readable type matter too. Redundant cues mean the same important fact has another understandable signal, not that every label needs several decorations."
          },
          {
            "title": "Check the task, not just the appearance",
            "body": "Ask someone to find the next available afternoon appointment. Observe where they start, what they inspect, and what they choose. A neat layout can still group information in a way that conflicts with that question. Keep content constant when comparing layouts so you can reason about the difference. A single example illustrates a mechanism; it does not establish that one arrangement is best for every task."
          }
        ],
        "takeaway": "Use visual hierarchy and grouping to make task-relevant differences easy to find.",
        "practice": "Allow 15 minutes. Annotate one screen in your case: what should be noticed first, what belongs together, and which cue must work without color? Save it in Cognitive rationale.",
        "questions": [
          {
            "prompt": "Available appointments are shown only through green text. Which addition best preserves the meaning?",
            "options": [
              "A larger decorative illustration.",
              "A different shade of green.",
              "Visible availability words and clear selectable controls."
            ],
            "answer": 2,
            "explanation": "A text cue carries the availability information when color cannot. A larger illustration or another green shade does not provide that equivalent meaning."
          },
          {
            "prompt": "A visually tidy table makes users inspect every row to find the next open time. What should guide a revision?",
            "options": [
              "The finding task and the information needed to answer it.",
              "Group information by internal staff departments without checking the customer’s task.",
              "Hide more rows before investigating what the person needs to find."
            ],
            "answer": 0,
            "explanation": "The finding task tells you which difference deserves emphasis. Internal organization or removing information without investigating that task may create new difficulty."
          }
        ],
        "flashcard": {
          "front": "Why use redundant cues?",
          "back": "They carry essential meaning in more than one way, such as a word alongside color, so the information remains available."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapters 1 and 5, perception and screen layout"
          },
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 12, display design and color"
          }
        ]
      },
      {
        "id": "hci-memory",
        "title": "Reduce what people must remember",
        "minutes": 10,
        "description": "Replace unnecessary recall with visible or retrievable task information.",
        "sections": [
          {
            "title": "Notice the memory demand",
            "body": "You choose Tuesday at 14:00, then the next screen asks you to enter a reference from the previous page. Unless you can return without losing work, you must hold that information in mind. Working memory is the limited information we actively keep and use while doing something. An interruption, unfamiliar detail, or competing task can make this harder. The interface can carry some of that burden."
          },
          {
            "title": "Let people recognize what they need",
            "body": "Recognition means identifying something when it is presented; recall means producing it without that cue. A visible appointment summary lets you recognize the chosen time and notice an error. A blank question asking you to remember it demands recall. Keep important details available where they affect a decision. Make a summary editable so a remembered correction does not become a dead end."
          },
          {
            "title": "Use knowledge in the world",
            "body": "Instructions beside a field, recently chosen items, and an accessible order summary put useful information outside the person’s head. This does not mean displaying everything on every screen. Show the information needed for the current decision and provide a clear path to supporting detail. Too much competing material can make the relevant cue harder to find."
          },
          {
            "title": "Avoid a misleading number rule",
            "body": "Memory research does not imply that every menu may contain only seven items. A visible menu can be searched without memorizing the entire list. Familiarity, grouping, meaningful labels, and the task affect its use. Ask what must actually be remembered across steps. Replace that demand when it does not serve the task, and evaluate whether the change helps real people in the relevant setting."
          }
        ],
        "takeaway": "Keep needed information available at the moment it informs a decision.",
        "practice": "Allow 15 minutes. Find one detail that must be remembered between steps in your case. Add a visible or retrievable cue and record why it belongs there.",
        "questions": [
          {
            "prompt": "A payment screen asks people to remember the service and time chosen earlier. What is a useful first change?",
            "options": [
              "Add an editable service-and-time summary beside the payment decision.",
              "Limit all menus to seven items.",
              "Ask people to memorize the first page."
            ],
            "answer": 0,
            "explanation": "The summary removes a specific unnecessary recall demand and permits correction. A seven-item rule does not address the cross-step memory problem."
          },
          {
            "prompt": "A librarian easily searches a visible list of twelve familiar categories. Does memory research require reducing it to seven?",
            "options": [
              "Yes, regardless of the task.",
              "No; evaluate search, grouping, and what must actually be remembered.",
              "Yes, unless all labels use icons."
            ],
            "answer": 1,
            "explanation": "A visible list supports recognition and search. Its usability depends on the task and organization, not a universal short-term-memory item limit."
          }
        ],
        "flashcard": {
          "front": "When can recognition replace recall?",
          "back": "When the interface presents meaningful choices or needed details so people can identify them instead of remembering them unaided."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 1, human memory and “7 ± 2 revisited”"
          },
          {
            "source": "hci-heuristics",
            "locator": "Recognition Rather than Recall"
          }
        ]
      },
      {
        "id": "hci-mental-models",
        "title": "Understand what people expect",
        "minutes": 10,
        "description": "Explain a mismatch between someone’s prediction and the system’s behavior.",
        "sections": [
          {
            "title": "Ask what the person believes",
            "body": "Someone presses Save and walks away because they think their appointment is booked. The system only saved a draft. Their mental model is what they believe about how the system works. It helps them predict what an action will do. That belief may be incomplete or inaccurate, and it may differ from the designer’s detailed knowledge of the implementation."
          },
          {
            "title": "Learn the expectation before revealing the result",
            "body": "Ask “What do you expect to happen if you choose this?” before the person acts. Then observe how they interpret the actual result. This can reveal whether Save means keep a draft, send a request, or confirm a booking to them. Avoid teaching the intended meaning before measuring their expectation. You would learn whether they remembered your instruction rather than how the design communicates."
          },
          {
            "title": "Make the system’s model understandable",
            "body": "Use words and feedback that distinguish Draft saved, Request sent, and Appointment confirmed. Show the relevant next action. Familiar conventions can help, but a familiar word used for a different consequence may mislead. A new interaction can be justified when it helps the task; it needs a way for people to form a useful understanding through explanation, feedback, and safe exploration."
          },
          {
            "title": "Validate more than one person’s view",
            "body": "Different experience can lead to different expectations. A frequent staff member may understand an internal label that confuses a first-time visitor. Compare relevant people and contexts. When expectations differ, decide whether the model should change, the language should explain it, or both. Do not label the person irrational for following a prediction the interface made plausible."
          }
        ],
        "takeaway": "Make the consequence of an action match a useful, understandable expectation.",
        "practice": "Allow 15 minutes. Ask someone to predict one action in a harmless prototype before using it. Record the prediction, result, and interpretation separately in Cognitive rationale.",
        "questions": [
          {
            "prompt": "Save stores a draft, but visitors think it confirms a booking. What should you investigate first?",
            "options": [
              "Whether visitors can recite the database fields.",
              "What Save and the resulting feedback lead visitors to expect.",
              "Whether staff prefer the current label."
            ],
            "answer": 1,
            "explanation": "The issue is the expectation produced by the interface. Internal knowledge and staff preference do not establish whether a visitor understands the consequence."
          },
          {
            "prompt": "How can you learn an unprompted expectation about a new action?",
            "options": [
              "Explain the correct result and then ask what will happen.",
              "Show only the final confirmation.",
              "Ask for a prediction before the action, then observe the interpretation."
            ],
            "answer": 2,
            "explanation": "Prediction before instruction preserves the expectation you want to investigate. Showing or explaining the answer first changes the question."
          }
        ],
        "flashcard": {
          "front": "What is a mental model?",
          "back": "A person’s beliefs about how a system works, used to predict actions and interpret results. It need not match the implementation."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 3, models of interaction"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapter 3, mental models"
          },
          {
            "source": "hci-mental-models",
            "locator": "What Are Mental Models?"
          }
        ]
      },
      {
        "id": "hci-learning-interruptions",
        "title": "Support learning, emotion, and interruptions",
        "minutes": 10,
        "description": "Preserve useful context for someone who is new, distracted, or under pressure.",
        "sections": [
          {
            "title": "Learning changes the task",
            "body": "A first-time customer may inspect every label. A receptionist who books all day may use a practiced sequence. Learning can reduce effort, but practice does not remove the possibility of errors. Familiar actions can be triggered in the wrong context. Design for both a clear starting path and reliable feedback when a familiar path leads somewhere unexpected."
          },
          {
            "title": "Help people return to unfinished work",
            "body": "An interruption may leave someone unsure what they selected, what was saved, or what still needs to be done. Keep completed information, show the current step, and provide an understandable summary. Returning should not require reconstructing the last several screens from memory. Be clear when a held appointment has expired; preserving a draft does not guarantee a reservation remains available."
          },
          {
            "title": "Treat emotion as part of the situation",
            "body": "Stress, uncertainty, and frustration can affect attention and decision making. An error message that blames someone adds difficulty when they already need help. Use calm, specific language and a useful next action. Do not infer an emotional state from a single slow click. Ask about the person’s experience and consider other explanations, such as an unfamiliar term or a delayed response."
          },
          {
            "title": "Reduce avoidable work without removing control",
            "body": "A prefilled choice can save effort, but an unnoticed default can also commit the wrong service. Make consequential defaults visible and editable. For longer tasks, allow people to save and return when feasible. Evaluate whether the support fits the setting: a public shared kiosk and a private phone have different privacy and session needs. Helpful persistence must still respect who can see the information."
          }
        ],
        "takeaway": "Preserve task context and explain changes so returning users can safely continue.",
        "practice": "Allow 15 minutes. Describe a realistic interruption in your case. Add a return state showing saved details, current status, and what must be checked again.",
        "questions": [
          {
            "prompt": "Someone returns to a booking after a phone call and their held time has expired. Which message helps?",
            "options": [
              "Continue where you left off; the time is definitely yours.",
              "Your selected time is no longer held. Your details are saved; choose an available time.",
              "Something went wrong."
            ],
            "answer": 1,
            "explanation": "The message separates preserved details from expired availability and gives a next step. The first falsely promises a reservation; the last hides the useful information."
          },
          {
            "prompt": "A customer pauses for a long time on a form. What can you infer from timing alone?",
            "options": [
              "They are certainly anxious.",
              "They dislike the product.",
              "They paused; the cause needs further observation or a neutral question."
            ],
            "answer": 2,
            "explanation": "A pause is an observation, not an explanation. It can reflect interruption, confusion, careful reading, or many other causes."
          }
        ],
        "flashcard": {
          "front": "What should a useful return state explain?",
          "back": "What is preserved, what has changed or expired, where the person is, and what they can do next."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapters 1 and 7, learning and predictability"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapters 4 and 6, emotion and task loading"
          }
        ]
      }
    ]
  },
  {
    "title": "Learn how people work",
    "description": "Use research and task evidence to understand the actual work.",
    "lessons": [
      {
        "id": "hci-research-methods",
        "title": "Choose how to learn about the problem",
        "minutes": 10,
        "description": "Select a method that can answer the uncertainty you actually have.",
        "sections": [
          {
            "title": "Turn an opinion into a question",
            "body": "“People hate calendars” is an opinion until supported by evidence. Ask instead: “How do customers find a suitable appointment, and where do they get stuck?” A research question identifies what you need to learn. It helps you choose people, methods, and activities. Start with the uncertainty that could change the next design decision rather than collecting material because a template asks for it."
          },
          {
            "title": "Choose a method for the evidence",
            "body": "Observation can reveal how work unfolds and which tools or interruptions matter. An interview about recent events can explain experience and decisions, but remembered accounts may be incomplete. A survey can collect self-reports from many people if its questions and sample suit the purpose. A usability session lets you observe people attempting a particular task with a design. These methods answer overlapping but different questions."
          },
          {
            "title": "Match the people and setting",
            "body": "A study of staff shortcuts cannot establish whether new customers understand booking. Recruit or select evidence from people relevant to the question. Include important differences in capability, experience, and access conditions. If you cannot reach a group, record that gap rather than inventing their behavior. Team members can help rehearse a session, but their familiarity with the product changes what their behavior tells you."
          },
          {
            "title": "Make the plan proportionate and respectful",
            "body": "State the decision, question, relevant people, activity, consent, and what you will record. Collect only needed information. A small formative study can expose problems; it cannot automatically estimate a precise population rate. A large survey with leading questions is not rescued by its size. Revisit the plan when you learn that the uncertainty or task was defined incorrectly."
          }
        ],
        "takeaway": "Choose the method, people, and setting to answer a specific question.",
        "practice": "Allow 15 minutes. In Research and task model, save your main uncertainty, chosen method, relevant participants, and what the evidence could not establish.",
        "questions": [
          {
            "prompt": "With consented access to the workplace, you need the actual sequence staff use during walk-in interruptions. Which method best fits that question?",
            "options": [
              "Send a survey asking only how often interruptions occur.",
              "Test a quiet isolated booking and generalize it to interruptions.",
              "Observe the work in context, with appropriate consent."
            ],
            "answer": 2,
            "explanation": "Observation in context can reveal the sequence, coordination, and tools during the interruption. A frequency-only survey or an isolated quiet task does not directly show that work."
          },
          {
            "prompt": "A survey says people feel confident booking. What further evidence addresses independent task completion?",
            "options": [
              "Observe relevant people completing a realistic booking.",
              "Repeat the confidence question using larger text.",
              "Assume confidence proves success."
            ],
            "answer": 0,
            "explanation": "Confidence is a self-report. Task observation can test whether the action succeeds under stated conditions; both forms of evidence can be useful."
          }
        ],
        "flashcard": {
          "front": "What should guide the choice of a research method?",
          "back": "The decision and uncertainty, the evidence needed, relevant people and context, and practical and ethical constraints."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 9, choosing an evaluation method"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapters 48–50 and 58"
          },
          {
            "source": "hci-research",
            "locator": "Agree research questions; choose relevant activities"
          }
        ]
      },
      {
        "id": "hci-observe-interview",
        "title": "Observe and ask without leading",
        "minutes": 10,
        "description": "Keep observations, participant reports, and interpretations distinguishable.",
        "sections": [
          {
            "title": "Record what happened before explaining it",
            "body": "“The participant returned to the previous page three times” records behavior. “The participant was confused by the service names” is an interpretation unless supported by more evidence. Keep the observation and possible explanation in separate columns. This makes it possible for a teammate to consider a different cause, such as checking a time or comparing a price."
          },
          {
            "title": "Ask about specific recent events",
            "body": "“Tell me about the last time you changed an appointment” invites a concrete account. “Would a simpler calendar help?” suggests both a problem and a solution. Ask what happened, which tools they used, and how they knew the task was complete. When appropriate, examine an artifact they choose to share. Memory is imperfect, so distinguish a remembered report from behavior you actually observed."
          },
          {
            "title": "Use neutral prompts",
            "body": "During observation, ask “What are you looking for?” or “What did you expect there?” rather than pointing to the intended control. Let someone finish a thought before introducing your explanation. If you assist because they are stuck, record the assistance. The goal is to understand the product’s role in their activity, not to help the design appear successful."
          },
          {
            "title": "Respect people and their information",
            "body": "Explain the activity, what will be recorded, and their choice to stop. Use fictional details in classroom exercises and follow relevant supervision and consent arrangements. Avoid collecting passwords or unrelated private information. Quote or summarize carefully: a participant’s phrase can support a finding without becoming a general statement about every person in that group. Keep enough context to understand the evidence without exposing someone unnecessarily."
          }
        ],
        "takeaway": "Separate what you observed, what someone reported, and what you infer.",
        "practice": "Allow 15 minutes. Create three short evidence-log entries for your case. Label each as observation, participant report, or interpretation. State whether the source is fictional or a real consented study.",
        "questions": [
          {
            "prompt": "Which note is an observation?",
            "options": [
              "She did not understand the product.",
              "She selected Back twice before choosing another time.",
              "The whole flow is unusable."
            ],
            "answer": 1,
            "explanation": "The second note describes visible actions. The other statements are interpretations that need a specific task and supporting evidence."
          },
          {
            "prompt": "Which interview prompt least suggests a desired solution?",
            "options": [
              "Would you use our helpful reminder?",
              "Do you agree this form is too long?",
              "Tell me about the last time you missed a booking confirmation."
            ],
            "answer": 2,
            "explanation": "A recent-event prompt invites an account without naming the preferred feature or judgment. Follow up neutrally and distinguish memory from direct observation."
          }
        ],
        "flashcard": {
          "front": "How does an observation differ from an interpretation?",
          "back": "An observation records behavior or an event. An interpretation proposes what it means or why it happened, and needs support."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapter 48, collecting task-analysis data; chapter 49, contextual inquiry"
          },
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 3, ethnographic observation and participation"
          }
        ]
      },
      {
        "id": "hci-task-analysis",
        "title": "Break a task into goals, steps, and decisions",
        "minutes": 10,
        "description": "Build a task model with ordering, dependencies, and recovery.",
        "sections": [
          {
            "title": "Model the work rather than the current buttons",
            "body": "To reschedule, a person needs to identify the existing booking, find a suitable replacement, understand any consequence, and confirm the change. A list saying “click the blue icon, click Next” only describes one interface. Task analysis examines what people do, what they act on, and what they need to know. It helps you consider another interface that supports the same work."
          },
          {
            "title": "Break a goal into meaningful parts",
            "body": "A task hierarchy starts with a goal and divides it into smaller tasks. A plan explains ordering and conditions: find a replacement before releasing the existing time; if none is suitable, keep the current booking. Not every subtask must happen in a fixed sequence. People may compare service locations before or after looking at available times. Preserve flexibility where the actual work allows it."
          },
          {
            "title": "Find dependencies and exceptions",
            "body": "Ask what each task requires and what happens when that requirement fails. An invitation needs a recipient and an access level. An expired invitation needs a different path from an accepted one. A model that includes only a successful first attempt misses important design needs. State what evidence supports the sequence and mark uncertain steps for investigation."
          },
          {
            "title": "Choose useful detail",
            "body": "Stop breaking tasks down when the detail answers your design question. A project comparing whole booking journeys needs different detail from a study of pointing at adjacent actions. Check the model with relevant people or supplied teaching evidence. The model is a useful representation, not a complete account of every real action. New technology may change how work happens, so revisit it as the design develops."
          }
        ],
        "takeaway": "A useful task model explains goals, dependencies, choices, and exceptions.",
        "practice": "Allow 20 minutes. Save a task hierarchy and its ordering rules in Research and task model. Include one exception and one step whose evidence needs checking.",
        "questions": [
          {
            "prompt": "Which is a task-level description?",
            "options": [
              "Click the icon at the top right.",
              "Press the green button.",
              "Choose a replacement time before releasing the current appointment."
            ],
            "answer": 2,
            "explanation": "The final description captures the work and a dependency independently of the current controls. The first two describe one implementation."
          },
          {
            "prompt": "Two subtasks can happen in either order. How should the model represent them?",
            "options": [
              "As flexible ordering with any actual dependencies made explicit.",
              "As a fixed order merely because the current screen uses one.",
              "By removing both tasks."
            ],
            "answer": 0,
            "explanation": "A task model should reflect the work and constraints. A fixed sequence can be appropriate when there is a real dependency, not just an arbitrary screen order."
          }
        ],
        "flashcard": {
          "front": "What does a task-analysis plan add to a task hierarchy?",
          "back": "It explains the order, conditions, choices, and exceptions under which subtasks are performed."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 15, sections 15.1–15.3"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapter 48, understanding work and goals"
          }
        ]
      },
      {
        "id": "hci-profiles-scenarios",
        "title": "Turn evidence into profiles and scenarios",
        "minutes": 10,
        "description": "Write a task-relevant profile and scenario with traceable assumptions.",
        "sections": [
          {
            "title": "Describe differences that affect the task",
            "body": "A profile is useful when it helps explain a design need. “Books for several family members and checks travel time” is relevant to appointment selection. An invented favorite color, age, or photograph may add detail without evidence. A persona is a concrete representation used to focus design, but it needs a defensible basis. Do not present a made-up biography as research."
          },
          {
            "title": "Write a short episode of use",
            "body": "A scenario describes a person, goal, setting, actions, and outcome. For example: “Sam receives an invite while on a phone. They need to know which workspace it opens and what access they will get before accepting.” This is more useful than a feature list because it reveals questions about identity, state, and consequences. Mark the scenario as hypothetical when it is a teaching example."
          },
          {
            "title": "Connect a claim to its source",
            "body": "If the profile says people compare appointments with a family calendar, retain the observation or report behind that claim. When evidence is thin, write “we need to check this” rather than adding confident detail. Several people can share a task pattern without sharing demographics. One person can also switch roles across situations. Profiles simplify reality and should not conceal important variation."
          },
          {
            "title": "Invite participation in the design",
            "body": "Showing a finished mockup for approval is different from involving people in defining the task and alternatives. Participatory design brings affected people into meaningful design decisions. Ask whose knowledge is missing and whether they can influence the work. In a classroom case, identify who you would involve; do not claim that an invented profile replaces that involvement."
          }
        ],
        "takeaway": "Use profiles and scenarios to connect task evidence to a concrete design question.",
        "practice": "Allow 20 minutes. Add a short profile and scenario to Research and task model. Link each important behavior to evidence or label it as an assumption.",
        "questions": [
          {
            "prompt": "Which profile detail most directly informs a rescheduling interface?",
            "options": [
              "The persona’s invented favorite film.",
              "The person often compares times with a caregiver before committing.",
              "A decorative portrait."
            ],
            "answer": 1,
            "explanation": "The comparison and shared decision can change the flow. A film preference or image has no established connection to this task."
          },
          {
            "prompt": "A scenario is based on a team’s assumption rather than observation. How should it be used?",
            "options": [
              "Label it as hypothetical and investigate important assumptions.",
              "Describe it as a validated finding.",
              "Treat it as representative of all customers."
            ],
            "answer": 0,
            "explanation": "A hypothetical scenario can expose design questions, but its apparent detail does not turn it into research evidence."
          }
        ],
        "flashcard": {
          "front": "What makes a scenario useful for design?",
          "back": "A specific person or role, goal, setting, sequence, and outcome that expose decisions and traceable assumptions."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapters 51, 53, and 54"
          },
          {
            "source": "hci-dix",
            "locator": "Chapters 5 and 13, scenarios and participation"
          }
        ]
      }
    ]
  },
  {
    "title": "Make interactions understandable",
    "description": "Connect actions, state, feedback, consistency, and recovery.",
    "lessons": [
      {
        "id": "hci-clear-actions",
        "title": "Make possible actions clear",
        "minutes": 10,
        "description": "Use visible clues and mappings to connect a goal to an action.",
        "sections": [
          {
            "title": "Begin with an intended outcome",
            "body": "Norman’s action cycle describes the connection between a goal, forming and carrying out an action, seeing the result, and deciding whether the goal was achieved. A person may know they want a different appointment without knowing how to begin. The design must help them express that intention. A technically working control cannot help if they cannot find or interpret it."
          },
          {
            "title": "Separate an action from its clue",
            "body": "An affordance concerns a possible action in a relationship between a person and an object. A signifier is a perceivable clue about what can be done. A button’s wording and appearance can signal an action; a drag handle can signal movement. An icon that only the design team recognizes is a weak clue. Test what people think is possible before explaining the intended behavior."
          },
          {
            "title": "Make mappings understandable",
            "body": "A mapping connects a control with its effect. If a room diagram has several lights, controls laid out like the lights can make the relationship clearer. In a booking form, put an Edit action with the detail it changes and identify its scope. A generic pencil far from the date may leave people unsure which part will be edited. Visual proximity, labels, and consistent behavior can work together."
          },
          {
            "title": "Use constraints without hiding the task",
            "body": "A constraint can prevent an invalid action, such as booking an already full time. Explain why it is unavailable and what the person can do instead. A disabled control with no reason can create a new question. Avoid assuming every action needs to be visible at once: reveal relevant options in a way that still makes them findable and understandable for the task."
          }
        ],
        "takeaway": "Help people see which action is possible and predict its relevant effect.",
        "practice": "Allow 15 minutes. In Actions and states, connect one goal to a visible control, the expected effect, and feedback that confirms the result.",
        "questions": [
          {
            "prompt": "A pencil icon appears between several booking details. People cannot tell what it edits. What is the issue?",
            "options": [
              "The editing task necessarily needs more stages.",
              "The icon must be larger, even if its scope remains ambiguous.",
              "The mapping and visible clue do not establish the action’s scope."
            ],
            "answer": 2,
            "explanation": "The clue is ambiguous about the relationship between action and effect. More stages or a larger icon can leave its scope unclear; a label beside the relevant detail can clarify it."
          },
          {
            "prompt": "A time is unavailable. Which treatment best supports understanding?",
            "options": [
              "Show its unavailable state, explain it, and offer suitable alternatives.",
              "Remove all information about times.",
              "Disable Continue without explanation."
            ],
            "answer": 0,
            "explanation": "A clear constraint can prevent an invalid choice while preserving the reason and next step. An unexplained block leaves the task unresolved."
          }
        ],
        "flashcard": {
          "front": "How do a signifier and a mapping help?",
          "back": "A signifier suggests an available action; a mapping helps connect the control with the effect it will have."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 3, execution–evaluation cycle; chapter 7, predictability"
          },
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 2, object/action relationships"
          }
        ]
      },
      {
        "id": "hci-system-state",
        "title": "Show what happened and what happens next",
        "minutes": 10,
        "description": "Explain pending, successful, failed, and uncertain outcomes clearly.",
        "sections": [
          {
            "title": "An action is not its result",
            "body": "Pressing Book starts a request. The server may accept it, reject it, or fail to send a reply. A spinning indicator alone does not explain whether the appointment exists. System state describes the relevant situation now: a draft, a pending request, a confirmed appointment, or an unknown result. Show the state that affects the next decision."
          },
          {
            "title": "Give feedback a useful job",
            "body": "Feedback is the system’s perceivable response to an action. Confirm the service, time, and reference when a booking succeeds. Explain which input needs attention after a validation failure. During a wait, acknowledge the request and clarify what is safe to do. A subtle color change may not provide enough information; use accessible text and an appropriate status announcement as well."
          },
          {
            "title": "Handle uncertainty honestly",
            "body": "If a connection drops after sending, you may not know whether the server committed the booking. Saying “failed” could encourage a duplicate request. Saying “confirmed” could leave someone without an appointment. A better design explains that confirmation is being checked and provides an appropriate way to recover, such as looking up the request. The service needs technical support for this behavior; words alone cannot ensure a duplicate is prevented."
          },
          {
            "title": "Distinguish going back from undo",
            "body": "Back changes where someone is in a journey or history. Undo reverses an action when that reversal is actually possible. Visiting the previous page does not necessarily cancel a booking already stored. Explain committed changes and their recovery paths separately from navigation. When the task ends, provide a clear closure state so the person knows what happened and what, if anything, remains to do."
          }
        ],
        "takeaway": "Feedback should explain the relevant result and the next safe action.",
        "practice": "Allow 20 minutes. In Actions and states, define a pending, success, failure, and unknown-result state for one consequential action.",
        "questions": [
          {
            "prompt": "The connection drops after Book is sent, and the result is unknown. Which message is most accurate?",
            "options": [
              "Your appointment is definitely cancelled.",
              "We’re checking whether the request was confirmed. Do not submit another while we check.",
              "Your appointment is definitely confirmed."
            ],
            "answer": 1,
            "explanation": "An unknown result must be represented as unknown. The surrounding system must provide a real checking/recovery path rather than leaving the person waiting indefinitely."
          },
          {
            "prompt": "Someone uses browser Back after a successful booking. What can you assume?",
            "options": [
              "The booking has been undone.",
              "The server record was deleted.",
              "Only navigation occurred unless the system explicitly supports a cancellation action."
            ],
            "answer": 2,
            "explanation": "Navigation does not establish reversal of a committed operation. Show a real cancellation or change path with clear consequences."
          }
        ],
        "flashcard": {
          "front": "What must useful feedback establish?",
          "back": "The relevant state or result, whether the goal was achieved, and what safe next action is available."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 3, perceiving and evaluating state; chapter 16, dialog"
          },
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 2, feedback and closure; chapter 11, response time"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapter 14, network-based interaction"
          }
        ]
      },
      {
        "id": "hci-error-recovery",
        "title": "Prevent errors and help people recover",
        "minutes": 10,
        "description": "Choose prevention and recovery suited to the error and its consequences.",
        "sections": [
          {
            "title": "Understand the cause before choosing a fix",
            "body": "A slip happens when someone intends the right action but performs another, perhaps tapping Cancel beside Continue. A mistake can arise when someone follows a wrong understanding, such as believing Save confirms a booking. Both deserve design attention. Clearer placement can reduce an accidental tap; it may not explain a misunderstood booking rule. Investigate the evidence before treating every error as a need for more training."
          },
          {
            "title": "Prevent errors at the point of action",
            "body": "Separate destructive actions from frequent harmless ones. Use meaningful labels, sensible constraints, and a review of consequential details. Keep valid answers after a field error. A confirmation can be useful when someone needs to understand an irreversible result, but confirming every trivial action adds interruption and may teach people to dismiss dialogs without reading. Match the intervention to the risk."
          },
          {
            "title": "Make recovery constructive",
            "body": "An error message should identify the issue and a useful next step. “Choose a time after the service opens at 09:00” helps more than “Invalid input.” Keep the context and the person’s valid work. Offer undo when the system can genuinely reverse the effect. Explain a partial failure when some work completed and some did not. Do not promise restoration the service cannot perform."
          },
          {
            "title": "Check consequences beyond the interface",
            "body": "Removing someone’s access can stop future viewing but cannot make them forget information already seen. Releasing a booking may allow another person to take it, so an undo promise needs a real policy and implementation. Evaluate both prevention and recovery with appropriate scenarios. A happy-path test will not establish whether people can recognize and recover from a consequential error."
          }
        ],
        "takeaway": "Address the cause of an error and give recovery that fits the actual consequence.",
        "practice": "Allow 20 minutes. Save normal, error, and recovery paths in Actions and states. Explain which changes prevent a slip, which explain a misunderstanding, and what cannot be undone.",
        "questions": [
          {
            "prompt": "People understand both labels but accidentally tap Cancel beside Continue. Which change targets the observed cause?",
            "options": [
              "Separate the actions, preserve clear labels, and offer recovery where genuinely possible.",
              "Add a longer explanation at the beginning of the form.",
              "Require confirmation after every harmless action."
            ],
            "answer": 0,
            "explanation": "Separation addresses the action slip. Early instructions leave the risky placement intact. Blanket confirmation adds friction without addressing this cause specifically."
          },
          {
            "prompt": "A teammate has already viewed a private file. What can removing access achieve?",
            "options": [
              "Erase their memory of the file.",
              "Prevent future access, while leaving prior disclosure irreversible.",
              "Prove no disclosure occurred."
            ],
            "answer": 1,
            "explanation": "A permission setting can change future access, not undo information already viewed. The design should explain important consequences before disclosure."
          }
        ],
        "flashcard": {
          "front": "What must you know before relying on undo?",
          "back": "The action’s cause and consequence, whether its effect is actually reversible, and which people or systems may already have been affected."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapter 8, human-error identification"
          },
          {
            "source": "hci-shneiderman",
            "locator": "Sections 2.3.5 and 12.2, error prevention and messages"
          }
        ]
      },
      {
        "id": "hci-design-rules",
        "title": "Use consistency and design rules wisely",
        "minutes": 10,
        "description": "Apply a relevant design principle and explain its limits.",
        "sections": [
          {
            "title": "Use a principle to ask a better question",
            "body": "A heuristic is a broad rule of thumb used to examine a design. “Keep system status visible” asks whether people can tell what has happened. It does not prescribe the same banner for every situation. Shneiderman’s eight golden rules and Nielsen’s ten heuristics organize related concerns such as consistency, feedback, control, memory, and recovery. Use them to reason about a task rather than memorizing two separate lists."
          },
          {
            "title": "Make consistency meaningful",
            "body": "Use the same term and action behavior when the meaning is the same. If Delete removes a draft on one screen but cancels a confirmed appointment on another, visual consistency can conceal different consequences. Also consider conventions people bring from other products. A new pattern may be justified, but explain its benefit and test whether people can understand it. Consistency is support for learning, not a reason to preserve a harmful design."
          },
          {
            "title": "Distinguish different kinds of guidance",
            "body": "A general principle, a product convention, and a technical accessibility requirement have different roles. A heuristic helps identify a candidate usability problem. A named requirement has a specific scope and conditions. Do not turn a personal preference into a mandatory rule by calling it a best practice. State which source or convention applies and why the task makes it relevant."
          },
          {
            "title": "Write a finding with a consequence",
            "body": "“Violates consistency” is less useful than “The two Edit actions change different scopes, so first-time users may change the whole appointment when they intend only its time.” That is a prediction to investigate unless you observed it. Add evidence, affected people, consequence, and an appropriate next check. Two reviewers may disagree; make the reasoning visible enough to examine the disagreement."
          }
        ],
        "takeaway": "Use design rules as task-based reasoning aids with explicit scope and evidence.",
        "practice": "Allow 20 minutes. Review one state using two relevant principles. In Actions and states, record the predicted consequence and what observation could confirm or challenge it.",
        "questions": [
          {
            "prompt": "Which review finding is most useful?",
            "options": [
              "The screen is not modern.",
              "I dislike the interaction.",
              "Identically named Edit actions have different scopes, which may cause an unintended change."
            ],
            "answer": 2,
            "explanation": "The final statement links a design property to a possible task consequence. It can be investigated rather than treated as an untestable preference."
          },
          {
            "prompt": "A familiar pattern repeatedly causes serious errors in the intended task. What should consistency mean here?",
            "options": [
              "Consider a justified alternative and evaluate learning and consequences.",
              "Keep it regardless of evidence.",
              "Treat the designer’s preference as a standard."
            ],
            "answer": 0,
            "explanation": "Consistency supports predictable behavior, but it does not override evidence of harm. A change should explain its benefit and be evaluated with relevant people."
          }
        ],
        "flashcard": {
          "front": "How does a heuristic differ from a specific requirement?",
          "back": "A heuristic is broad guidance for reasoning. A specific requirement has a defined scope and conditions for judging whether it is met."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 7, design rules"
          },
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 2, eight golden rules"
          },
          {
            "source": "hci-heuristics",
            "locator": "Consistency; Control; Error Prevention"
          }
        ]
      }
    ]
  },
  {
    "title": "Choose interaction methods",
    "description": "Match controls and input to the task and experience.",
    "lessons": [
      {
        "id": "hci-interaction-styles",
        "title": "Choose between menus, direct actions, and commands",
        "minutes": 10,
        "description": "Match an interaction style to the task and provide suitable alternatives.",
        "sections": [
          {
            "title": "Choose a way to express the task",
            "body": "People can select from menus, fill fields, manipulate visible objects, type commands, or use natural language. A product can combine these styles. A menu makes supported choices visible. A command can express repeated work compactly when its syntax is known. A form can collect structured information. Choose based on the task, capabilities, experience, and context rather than declaring one style modern and another obsolete."
          },
          {
            "title": "Understand direct manipulation",
            "body": "Direct manipulation presents relevant objects and lets people act on them with visible results, often through small reversible changes. Moving an appointment in a calendar can make its new position apparent. This is more than adding a drag animation: the person must understand what object is being changed and how the result relates to the task. An accidental move still needs an appropriate recovery path."
          },
          {
            "title": "Consider hidden work and precision",
            "body": "Dragging can be difficult on a small display or with some input methods. Finding the exact time may be easier with an explicit date/time selector. Conversely, a selector may require more steps when a practiced user is rearranging many visible objects. Test the real task, not just a single gesture. Do not assume a graphical representation is equally accessible to every person."
          },
          {
            "title": "Provide equivalent routes",
            "body": "A Move to time action can provide an alternative to dragging. Both should make the same valid outcomes available, communicate the result, and preserve meaningful constraints. Keyboard operation must not depend on simulating a precise mouse movement. Natural-language input can be helpful, but ambiguous requests need clarification and review. Later lessons examine how uncertainty changes control of an AI suggestion."
          }
        ],
        "takeaway": "Choose interaction styles around the task, and preserve equivalent ways to reach the outcome.",
        "practice": "Allow 20 minutes. In Alternatives, compare two ways to complete your main task. Explain input needs, feedback, precision, and an equivalent alternative.",
        "questions": [
          {
            "prompt": "A calendar supports only dragging an event to change time. Which addition improves access without removing drag?",
            "options": [
              "A longer animation.",
              "An explicit Move to time action with date/time controls.",
              "A second drag handle with no alternative."
            ],
            "answer": 1,
            "explanation": "An explicit control can offer the same outcome without a precise dragging gesture. Feedback and constraints must remain consistent across both paths."
          },
          {
            "prompt": "Which claim about interaction styles is defensible?",
            "options": [
              "Commands always require less effort for everyone.",
              "Menus are always the best choice.",
              "Different tasks and experience can justify combining styles."
            ],
            "answer": 2,
            "explanation": "Styles distribute learning, recall, precision, and interaction effort differently. Evaluate the relevant task and people rather than making a universal ranking."
          }
        ],
        "flashcard": {
          "front": "What makes direct manipulation useful?",
          "back": "Visible task objects, understandable actions with perceivable effects, and often incremental reversible changes, with equivalent access where needed."
        },
        "reading": [
          {
            "source": "hci-shneiderman",
            "locator": "Chapters 6–9, interaction styles and devices"
          },
          {
            "source": "hci-dix",
            "locator": "Chapters 2 and 3"
          }
        ]
      },
      {
        "id": "hci-forms",
        "title": "Design forms that help people finish",
        "minutes": 10,
        "description": "Collect needed information while preserving valid answers and clear recovery.",
        "sections": [
          {
            "title": "Ask why each field exists",
            "body": "A school form requests a name, contact detail, dietary needs, and several unrelated preferences. Each question adds reading, decision, and entry work. Ask what the service needs now, why it needs it, and whether it can obtain it another way. Explain optional questions honestly. Do not mark a field required just because the database has a column for it."
          },
          {
            "title": "Make labels and constraints available",
            "body": "A persistent label tells someone what belongs in a field even after they type. Give a needed format or example before an avoidable failure. Distinguish a placeholder example from the label. Keep related inputs together and choose input methods that suit the data. Avoid overly restrictive validation for names, addresses, and other information that varies more than your examples suggest."
          },
          {
            "title": "Choose steps for the decision",
            "body": "A long form may benefit from meaningful steps and a review, but splitting every question onto another page can increase navigation effort. Keep useful context available and let someone change an earlier answer without losing valid work. If changing service makes the previously selected time invalid, explain that consequence and ask for a new time. Preserving stale values silently can be as harmful as clearing everything."
          },
          {
            "title": "Help at the point of failure",
            "body": "On submission, identify fields needing attention, provide constructive guidance, and move or link focus appropriately. Retain valid answers. A global “Error” at the top with no connection to the field leaves someone searching for the cause. Test keyboard and zoom behavior along with the successful input path. A form is a sequence of decisions, not merely a stack of fields."
          }
        ],
        "takeaway": "Ask for needed information, explain constraints, and preserve valid work through changes and errors.",
        "practice": "Allow 20 minutes. In Alternatives, justify your fields and step structure. In Prototype and messages, record one validation failure and what answers remain.",
        "questions": [
          {
            "prompt": "One invalid contact field clears the entire form. What is a better response?",
            "options": [
              "Keep valid answers and connect a specific correction to the invalid field.",
              "Ask everyone to restart.",
              "Hide the invalid field without explaining it."
            ],
            "answer": 0,
            "explanation": "Preserving valid work and giving local guidance supports recovery. Hiding a required input or restarting everything leaves the task unresolved."
          },
          {
            "prompt": "Changing the service invalidates the chosen appointment time. What should happen?",
            "options": [
              "Keep the time and hope staff resolve it.",
              "Explain why a new time is needed while retaining still-valid details.",
              "Clear every field, including the person’s name."
            ],
            "answer": 1,
            "explanation": "Explain the dependency and preserve what remains valid. A stale time is not a successful form, while clearing unrelated details adds unnecessary work."
          }
        ],
        "flashcard": {
          "front": "What should happen after a form validation error?",
          "back": "Identify the problem and correction, provide access to the field, and retain information that is still valid."
        },
        "reading": [
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 7, section 7.7, form fillin and dialogs"
          },
          {
            "source": "hci-dix",
            "locator": "Chapter 5, navigation and layout"
          }
        ]
      },
      {
        "id": "hci-pointing-choice",
        "title": "Make pointing and choosing easier",
        "minutes": 10,
        "description": "Explain target geometry and choice using appropriate model assumptions.",
        "sections": [
          {
            "title": "Separate finding, deciding, and moving",
            "body": "A person first needs to locate and interpret an action, then move to it and activate it. Fitts’ law models pointing movement in relation to target distance and effective width along the movement. A larger suitable target or a shorter movement can reduce pointing difficulty under relevant conditions. It does not explain whether the label is understood or the chosen action is correct."
          },
          {
            "title": "Treat width as a real action area",
            "body": "A small word inside a comfortably sized clickable area can be easier to activate than the word alone. Closely packed targets create error risk even if the page appears compact. Pointer and touch situations differ, so test the input method and surrounding task. A button can be easier to hit while becoming easier to hit by accident; consider the consequences and neighboring actions too."
          },
          {
            "title": "Use choice models carefully",
            "body": "Hick-Hyman describes choice reaction time in specified conditions, including the information in the alternatives. It does not mean deleting useful options always improves a real product. A familiar search task, meaningful grouping, unequal choice probabilities, and reading requirements change the situation. A short list that hides the required option behind several steps can increase total work."
          },
          {
            "title": "Learn from a model and then evaluate",
            "body": "The coefficients in a pointing model depend on the task, device, and conditions. Do not borrow a number and claim an exact speed improvement for your app. Use the model to make a reasoned prediction, then evaluate success, errors, and effort in the task. The experiment here is untimed and includes supplied examples; pointer speed is not a test of your design ability."
          }
        ],
        "takeaway": "A model predicts a defined part of interaction, not whole-task usability.",
        "practice": "Allow 20 minutes. In Alternatives, identify a pointing or choice difficulty. State the model’s prediction, assumptions, and what else needs testing.",
        "questions": [
          {
            "prompt": "A target becomes easier to hit, but people choose it believing it has a different effect. What does Fitts’ law explain?",
            "options": [
              "The meaning of the label.",
              "The complete usability of the flow.",
              "Only a relevant pointing component, not the misunderstanding."
            ],
            "answer": 2,
            "explanation": "Fitts’ law concerns pointing movement under specified conditions. Understanding and selecting the correct action require other evidence."
          },
          {
            "prompt": "A menu has many familiar, grouped options. Does Hick-Hyman require removing options?",
            "options": [
              "No; consider the actual choice/search task and evaluate the complete path.",
              "Yes, independent of task.",
              "Yes, unless labels are replaced by icons."
            ],
            "answer": 0,
            "explanation": "The model is not a universal product simplification rule. Removing needed options can increase navigation and memory work."
          }
        ],
        "flashcard": {
          "front": "What limits a claim based on Fitts’ law?",
          "back": "It models pointing for specified geometry and conditions. It does not establish comprehension, task success, or a universal improvement time."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapter 9, p. 166, pointing and choice models"
          },
          {
            "source": "hci-dix",
            "locator": "Chapter 12, physical and device models"
          }
        ]
      },
      {
        "id": "hci-first-frequent",
        "title": "Support first-time and frequent use",
        "minutes": 10,
        "description": "Combine a discoverable route with efficient routine actions.",
        "sections": [
          {
            "title": "Different experience changes effort",
            "body": "A visitor booking once a year needs clear labels and a path they can relearn. A receptionist entering many bookings may benefit from shortcuts, remembered preferences, or batch actions. These are not fixed types of people: the same person can be experienced in one task and new to another. Design around relevant experience and frequency rather than labels such as power user that explain little."
          },
          {
            "title": "Keep an understandable starting path",
            "body": "Make the ordinary action available without memorizing a gesture or command. A visible Move time action can introduce a shortcut through a label or help. Keep consequential details and feedback in the fast route too. Speeding up repeated actions should not silently remove the review needed for an unusual, high-risk choice. Allow people to choose a path suited to the situation."
          },
          {
            "title": "Use a simple prediction model",
            "body": "KLM, the keystroke-level model, estimates routine skilled performance by considering operators such as typing, pointing, moving between input devices, mental preparation, and system response. GOMS organizes goals, operators, methods, and selection rules. These models make a proposed method explicit. They are useful for comparing routine paths under their assumptions, not predicting open-ended reasoning or novice discovery."
          },
          {
            "title": "Count more than clicks",
            "body": "Two paths with the same number of clicks can require different reading, movement, waiting, or decision effort. A shortcut that needs difficult recall may not suit infrequent use. State whether your comparison assumes a trained person, an error-free sequence, and a known task. Use observation to check important assumptions and keep accessibility and recovery in the comparison."
          }
        ],
        "takeaway": "Reduce routine effort while preserving discoverability, understanding, and control.",
        "practice": "Allow 20 minutes. In Alternatives, compare a first-use route with a repeated-use route. Note operators and assumptions instead of reporting click count as total effort.",
        "questions": [
          {
            "prompt": "A hidden gesture is the only way to reschedule. What is a useful improvement?",
            "options": [
              "An explicit action with the same outcome, with the gesture as an optional route.",
              "A one-time tour teaching the gesture that cannot be revisited.",
              "Remove every fast route, including optional ones for practiced users."
            ],
            "answer": 0,
            "explanation": "The explicit path supports discovery and an equivalent outcome. A shortcut can remain useful without being the only route."
          },
          {
            "prompt": "A KLM comparison assumes routine skilled, error-free performance. What should it avoid claiming?",
            "options": [
              "A predicted difference between two stated routine methods.",
              "An exact account of a newcomer discovering an unfamiliar workflow.",
              "A list of the operators in a method."
            ],
            "answer": 1,
            "explanation": "Novice exploration, errors, and open-ended reasoning fall outside that simple prediction. Make its limited purpose explicit."
          }
        ],
        "flashcard": {
          "front": "Why is click count alone a weak effort measure?",
          "back": "It omits reading, decisions, movement, device switching, waiting, mistakes, and recovery, which can differ between equal-click paths."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 12, goal hierarchies and keystroke-level model"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapter 60, limitations of GOMS models"
          }
        ]
      }
    ]
  },
  {
    "title": "Help people find and finish",
    "description": "Make information, language, help, and prototypes serve the task.",
    "lessons": [
      {
        "id": "hci-navigation-search",
        "title": "Make navigation and search work together",
        "minutes": 10,
        "description": "Support finding, narrowing, and recovering from an empty result.",
        "sections": [
          {
            "title": "Organize information around a task",
            "body": "Navigation gives a product an understandable structure and a way to move through it. A person trying to change a booking should not need to know the organization’s department names. Group and label information in a way relevant people understand. Multiple routes may support different goals: a frequent user may start with a reference number, while someone exploring availability starts with a service."
          },
          {
            "title": "Explain the scope of search",
            "body": "A search for a booking reference should state what records it searches. A separate service search has a different scope. If both boxes simply say Search, people may use the wrong one and interpret no results as proof the booking does not exist. Use clear labels, relevant examples, and results that explain what was searched. Preserve the query so it can be corrected."
          },
          {
            "title": "Make filtering understandable",
            "body": "A filter limits which items are shown. Show active filters, the result count when useful, and an easy way to remove a restriction. An empty result can come from a valid narrow query, an accidental filter, or unavailable data. Explain what is known and offer an appropriate next action. Do not display zero records when the service failed to retrieve them: missing data and a true empty result mean different things."
          },
          {
            "title": "Connect overview and detail",
            "body": "An overview can reveal the available dates or status groups. Details support a specific choice, such as a room’s location and access features. Preserve useful context when moving between them, including the query, filter, and selected item where appropriate. A chart can help some comparison tasks, but a searchable list or table may be better for exact lookup. The information task guides the display."
          }
        ],
        "takeaway": "Make search scope, active restrictions, and a route to relevant detail clear.",
        "practice": "Allow 20 minutes. In Prototype and messages, describe navigation, a search scope, and an empty-result recovery path for your case.",
        "questions": [
          {
            "prompt": "Search returns no bookings because an old location filter is active. What helps most?",
            "options": [
              "Treat no results as proof no booking exists.",
              "Show the active filter and a clear way to remove it.",
              "Erase the query with no explanation."
            ],
            "answer": 1,
            "explanation": "Visible restrictions and reset help the person understand the result. Keeping the query supports correction without reentry."
          },
          {
            "prompt": "The booking service could not load records. What should the results say?",
            "options": [
              "0 bookings found.",
              "There are definitely no appointments.",
              "Bookings could not be loaded, with an appropriate retry or recovery path."
            ],
            "answer": 2,
            "explanation": "A retrieval failure is not evidence of an empty set. The message must preserve that distinction."
          }
        ],
        "flashcard": {
          "front": "What should an empty result help someone understand?",
          "back": "What was searched, which restrictions apply, whether data was retrieved, and how to adjust or recover."
        },
        "reading": [
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 14, textual search, filtering, and visualization"
          },
          {
            "source": "hci-dix",
            "locator": "Chapter 21, finding things"
          }
        ]
      },
      {
        "id": "hci-interface-writing",
        "title": "Write labels and messages people understand",
        "minutes": 10,
        "description": "Write clear actions, instructions, empty states, and constructive errors.",
        "sections": [
          {
            "title": "Words are part of the interaction",
            "body": "A school form says “Invalid submission.” The student does not know whether their name, date, or file needs changing. Interface writing should help someone decide or act. Use words relevant people use, not internal database names. Explain specialist terms when they are necessary. Plain language helps people who are learning the topic and those who already understand it but need to act quickly."
          },
          {
            "title": "Make a label a useful promise",
            "body": "Save draft, Send request, and Confirm booking name different effects. A button labeled Continue can work within a clear sequence, but may hide a consequential commitment if used at the final step. Name the effect at that point. Keep terminology consistent when the meaning is the same. If a permission applies to the whole workspace, say so before someone commits, not only in a help article."
          },
          {
            "title": "Write a constructive error",
            "body": "State the problem and a way to correct it. “Choose a date on or after 12 December” is more useful than “Bad date.” Keep the message close or linked to the relevant field, preserve valid answers, and avoid blame. Be honest about what is known: “We could not confirm the booking” is different from “The booking failed.” Technical details may help support staff but should not replace the person’s next step."
          },
          {
            "title": "Check understanding through action",
            "body": "Ask someone to describe what an action will do and then complete the task. Reading the text aloud can expose long sentences and ambiguous references such as “it” when several items are present. A readability score can flag dense prose but cannot establish that a permission or service rule was understood. Review language together with layout, timing, and the actual behavior it describes."
          }
        ],
        "takeaway": "Write the information someone needs to understand the state and take the next action.",
        "practice": "Allow 15 minutes. In Prototype and messages, write one action label, one field instruction, one empty state, and one error. Explain the intended next action for each.",
        "questions": [
          {
            "prompt": "A final action immediately shares the whole workspace. Which label makes that consequence clearest?",
            "options": [
              "Continue.",
              "OK.",
              "Share workspace."
            ],
            "answer": 2,
            "explanation": "The last label names the committed effect. The surrounding description should also explain the access and audience; a label alone cannot carry every consequence."
          },
          {
            "prompt": "Which date error provides useful correction?",
            "options": [
              "Choose a date on or after 12 December.",
              "Invalid data.",
              "You entered the wrong thing."
            ],
            "answer": 0,
            "explanation": "The first message states the relevant constraint and correction. Generic or blaming text leaves someone guessing."
          }
        ],
        "flashcard": {
          "front": "What makes an error message constructive?",
          "back": "It identifies the specific problem, gives an understandable next step, preserves context, and avoids blame."
        },
        "reading": [
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 12, section 12.2, error messages"
          },
          {
            "source": "hci-clear-language",
            "locator": "Specialist terms; active voice; short paragraphs"
          }
        ]
      },
      {
        "id": "hci-help-onboarding",
        "title": "Give help when it is needed",
        "minutes": 10,
        "description": "Choose support that helps with the current task and preserves context.",
        "sections": [
          {
            "title": "Find the actual difficulty",
            "body": "A new customer does not know what “initial consultation” includes. A tour explaining every navigation icon may not answer that question. Help should address a real task uncertainty. Sometimes clearer labels or a better flow remove the need for a separate explanation. Other tasks genuinely require instructions, definitions, or a reference that remains available during work."
          },
          {
            "title": "Put support at a useful moment",
            "body": "A short explanation beside a service choice can support the decision before it becomes an error. A searchable help page may suit a complex question that occurs less often. Keep the task available when help opens and let the person return to the same place. Explain whether a preview or practice action changes anything real. Unclear tutorials can accidentally create uncertainty about actual data."
          },
          {
            "title": "Choose onboarding deliberately",
            "body": "A demonstration can introduce an unfamiliar concept, especially when someone can try it safely. A compulsory tour of every feature may be forgotten before the feature is needed. Make assistance relevant and dismissible when possible. Do not remove access to instructions after the first visit. An infrequent user may need to relearn the same task months later."
          },
          {
            "title": "Keep help accurate and testable",
            "body": "Help must match the current product’s labels, states, and policies. A detailed guide that describes an old screen can be worse than a short correct answer. Check availability, accuracy, consistency, and recovery when the product is failing. Observe whether people can find and apply the explanation, not just whether they rate the article positively. Support content is part of the design and needs maintenance."
          }
        ],
        "takeaway": "Provide accurate, findable help at the moment it supports the task.",
        "practice": "Allow 15 minutes. In Prototype and messages, write an in-context explanation and a plan for returning from deeper help without losing work.",
        "questions": [
          {
            "prompt": "People need to know whether changing service releases their chosen time. Where is help most useful?",
            "options": [
              "Only in a compulsory tour on the first visit.",
              "At the service-change decision, with clear consequences and deeper help if needed.",
              "After the old time has already been lost."
            ],
            "answer": 1,
            "explanation": "The explanation belongs where it informs the consequential choice. A first-visit tour or late warning does not reliably support that moment."
          },
          {
            "prompt": "What should happen when a person returns from a help article?",
            "options": [
              "All valid answers should disappear.",
              "The tutorial should restart.",
              "The task and still-valid context should be available so they can continue."
            ],
            "answer": 2,
            "explanation": "Help should support the task rather than force reconstruction. Sensitive or expired details may need explicit handling, not unexplained loss."
          }
        ],
        "flashcard": {
          "front": "What makes help useful beyond being available?",
          "back": "It is accurate, relevant, understandable, findable at the right moment, and lets someone continue the task."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 11, requirements of user support"
          },
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 13, online help and tutorials"
          }
        ]
      },
      {
        "id": "hci-prototyping",
        "title": "Prototype the behavior you need to test",
        "minutes": 10,
        "description": "Choose prototype detail and interactivity to answer a specific question.",
        "sections": [
          {
            "title": "Give a prototype a question",
            "body": "A prototype is a concrete representation of part or all of an interactive system. A paper sequence can test whether a person understands a flow. A stateful form may be needed to investigate validation, keyboard focus, and saved answers. Begin with the uncertainty: “Can newcomers understand that this is a request rather than confirmation?” Then decide what representation can provide useful evidence."
          },
          {
            "title": "Separate visual detail from interaction",
            "body": "A polished image can be precise about appearance but offer no interaction. A rough paper prototype can be highly interactive when someone responds to a participant’s actions. Visual precision, coverage, and interactivity are different choices. Avoid assuming that higher visual fidelity always provides better evidence. A convincing image can hide the fact that important behavior has not been represented."
          },
          {
            "title": "Describe states and transitions",
            "body": "Write the relevant states, actions, and transitions: draft, request pending, confirmed, failed, or result unknown. A transition describes how an action or event changes the state. Check whether someone can reach a dead end, repeat a consequential action, or return without losing valid work. A small diagram or table can make these questions visible without requiring a programming language."
          },
          {
            "title": "Compare alternatives before polishing",
            "body": "Build two plausible ways to support the task, not one preferred solution and a deliberately bad competitor. Explain what each trades off. A prototype may omit backend behavior, but record that limit: a simulated saved state does not prove the real service can preserve data. Test what the prototype actually represents and carry unresolved technical questions into the handoff."
          }
        ],
        "takeaway": "Choose prototype detail and behavior around the uncertainty you want to investigate.",
        "practice": "Allow 30 minutes. In Prototype and messages, describe two alternatives, select one to prototype, and list the states it covers and important limitations.",
        "questions": [
          {
            "prompt": "You need to test whether valid answers survive an error. Which prototype needs that behavior represented?",
            "options": [
              "A stateful or convincingly enacted prototype covering error and recovery.",
              "Only a polished image of success.",
              "A detailed written specification without an enacted recovery sequence."
            ],
            "answer": 0,
            "explanation": "The question concerns behavior across states. A still success screen cannot provide evidence about information preservation after an error."
          },
          {
            "prompt": "A prototype shows a saved draft but has no real storage. What can a study establish?",
            "options": [
              "That the production service preserves drafts.",
              "How people interpret the represented saved state, within the prototype’s limits.",
              "That a future backend is unnecessary."
            ],
            "answer": 1,
            "explanation": "The representation can support comprehension testing but does not establish unimplemented persistence or technical reliability."
          }
        ],
        "flashcard": {
          "front": "Why start prototyping with a question?",
          "back": "The question determines the necessary detail, coverage, and interaction, and limits the claims the prototype can support."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapter 52, pp. 1018–1020; chapter 53"
          },
          {
            "source": "hci-dix",
            "locator": "Chapters 6 and 16, iteration and dialog notations"
          }
        ]
      }
    ]
  },
  {
    "title": "Design for inclusion and agency",
    "description": "Account for access, context, language, privacy, and control.",
    "lessons": [
      {
        "id": "hci-keyboard-access",
        "title": "Support keyboard and assistive technology",
        "minutes": 10,
        "description": "Provide a meaningful and equivalent way to complete the task.",
        "sections": [
          {
            "title": "Access concerns the whole task",
            "body": "A screen reader presents information through speech or braille; a keyboard user may move and activate controls without a pointer. Other people use magnification, speech input, or combinations of tools. A control that looks obvious can remain unnamed or unreachable through another method. Design a complete path: finding the task, entering information, understanding errors, committing, and recovering."
          },
          {
            "title": "Give controls meaningful names and order",
            "body": "Use visible labels and appropriate semantics. A field called “Time” is more useful than an unnamed input. Keyboard focus should follow a logical order and remain visible. Focus is the current target for keyboard input; it is not the same as selection or pointer position. Avoid trapping someone in a region with no way out. Keep controls understandable at zoom and with long labels."
          },
          {
            "title": "Connect errors and changes to the task",
            "body": "After validation, help someone reach the problem and understand the correction. A linked error summary and field-level explanation can work together. When a dialog closes, restore focus to a sensible place. Announce important status changes appropriately rather than relying only on a disappearing visual message. Too many announcements can also interrupt, so choose what actually affects the person’s next action."
          },
          {
            "title": "Use standards and people together",
            "body": "WCAG provides specific testable accessibility criteria, including keyboard operation, labels, focus, and error identification. A quick classroom check cannot establish full conformance. Automated tools find some issues but cannot decide whether every task makes sense. Include people who use relevant assistive technologies, preferably in a setup familiar to them, and distinguish an access barrier from unfamiliarity with the tool."
          }
        ],
        "takeaway": "Equivalent access means an understandable completion path, not just individually reachable controls.",
        "practice": "Allow 20 minutes. In Inclusion and control, trace your main task by keyboard, identify names and focus destinations, and record which assistive-technology checks still need relevant users.",
        "questions": [
          {
            "prompt": "Every form field is reachable by Tab, but an error appears only as an unlabeled red border. Is the task adequately supported?",
            "options": [
              "Yes, reachability proves understanding.",
              "No; the error also needs understandable identification and access to correction.",
              "Yes, if the red is bright enough."
            ],
            "answer": 1,
            "explanation": "Keyboard access to controls alone does not communicate what went wrong. Important information needs an understandable equivalent beyond color."
          },
          {
            "prompt": "A modal closes after editing a time. What should happen to keyboard focus?",
            "options": [
              "Move unpredictably to the page footer.",
              "Disappear until a mouse click.",
              "Return to a sensible control or result so the task can continue."
            ],
            "answer": 2,
            "explanation": "Logical focus management preserves context. The precise destination depends on the task and the change, not a blanket rule to always focus the page top."
          }
        ],
        "flashcard": {
          "front": "How is focus different from selection?",
          "back": "Focus is where keyboard input goes. Selection is a chosen item or value; it can remain selected when focus moves elsewhere."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 10, universal design"
          },
          {
            "source": "hci-accessibility",
            "locator": "What Is Web Accessibility; Evaluating Accessibility"
          },
          {
            "source": "hci-wcag",
            "locator": "2.1.1; 2.4.3; 2.4.7; 3.3.1"
          }
        ]
      },
      {
        "id": "hci-different-conditions",
        "title": "Support different people and conditions",
        "minutes": 10,
        "description": "Identify barriers created by the combination of person, task, and environment.",
        "sections": [
          {
            "title": "Look beyond an imaginary average",
            "body": "People vary in vision, hearing, movement, memory, language, experience, and the technology available to them. These differences do not form a single line from capable to incapable. A person may use one tool confidently and face a barrier in another. Describe the task and conditions that create the problem instead of assuming a demographic category predicts every need."
          },
          {
            "title": "Examine the interaction with the setting",
            "body": "Glare can make a screen hard to read. A noisy setting can make audio instructions unavailable. A broken arm can change input needs, and limited bandwidth can make a rich interface fail to load. These situations overlap with some access needs but do not reproduce the experience of living with a disability. Use them to identify a specific barrier, not as a claim that a simulation teaches someone’s whole experience."
          },
          {
            "title": "Build flexibility into information and action",
            "body": "Support readable text and zoom, meaningful structure, alternatives to color and sound, and control over unnecessary motion. Provide clear language and preserve context. Offer equivalent ways to perform a gesture-dependent task. A small screen may need a different presentation while retaining access to the same meaningful information. Hiding important details just to fit the viewport can remove the ability to make an informed choice."
          },
          {
            "title": "Evaluate the relevant variation",
            "body": "Include people and technologies suited to the intended audience. A standards review, automated check, keyboard test, and session with a screen-reader user answer different questions. Record which combinations you tested and which remain unknown. Universal design is a commitment to reducing exclusion across varied use, not a promise that one interface can meet every need without further evaluation."
          }
        ],
        "takeaway": "Find the barrier in the relationship between a person, task, and conditions, then test an equivalent path.",
        "practice": "Allow 20 minutes. In Inclusion and control, record three relevant barriers and alternatives. Identify people or setups needed to evaluate them.",
        "questions": [
          {
            "prompt": "A booking instruction is available only through audio. Who could face a barrier?",
            "options": [
              "Only people unfamiliar with the service.",
              "Only people without headphones.",
              "People with hearing-related access needs and people unable to listen in their setting."
            ],
            "answer": 2,
            "explanation": "An audio-only instruction can exclude multiple groups and situations. A text equivalent preserves meaningful information when listening is unavailable."
          },
          {
            "prompt": "Does briefly trying a blurred-screen filter establish what living with low vision is like?",
            "options": [
              "No; it may illustrate a narrow barrier but does not replace lived experience or user involvement.",
              "Yes, it fully represents the experience.",
              "Yes, if the filter is difficult enough."
            ],
            "answer": 0,
            "explanation": "A simulation is limited and cannot stand in for people’s varied strategies, tools, and experience. Evaluate actual barriers with relevant users."
          }
        ],
        "flashcard": {
          "front": "Why is an “average user” assumption risky?",
          "back": "It can hide relevant differences in capabilities, experience, devices, and environments, excluding people from the intended task."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapters 39–45, designing for diversity"
          },
          {
            "source": "hci-dix",
            "locator": "Chapter 10, universal design"
          },
          {
            "source": "hci-accessibility",
            "locator": "What Is Web Accessibility"
          }
        ]
      },
      {
        "id": "hci-language-culture",
        "title": "Design across languages and cultures",
        "minutes": 10,
        "description": "Identify language and format assumptions that need local validation.",
        "sections": [
          {
            "title": "Translation is part of a larger task",
            "body": "Replacing English words does not automatically make an interface understandable in another language or setting. Reading direction, label length, date format, names, address structure, and the meaning of symbols may differ. A translated Continue button can still hide the consequence of an unfamiliar service rule. Keep the person’s actual task and knowledge in view."
          },
          {
            "title": "Make ambiguous formats explicit",
            "body": "A date such as 03/04/2027 can mean different days. Writing the month name can reduce that ambiguity when it fits the setting. Time zones matter when people share appointments across locations. Show the relevant zone and consequence instead of assuming the device’s local time matches the service. Use examples that explain a format without restricting valid names or addresses unnecessarily."
          },
          {
            "title": "Check words and symbols with people",
            "body": "A phrase familiar inside a company may not match customer vocabulary. An icon or gesture can have different interpretations, even among people in the same country. Avoid deciding an individual’s preference from a national cultural score. Ask relevant people what a label suggests, observe the task, and investigate meaningful differences. Local knowledge should influence the design, not merely decorate a finished screen."
          },
          {
            "title": "Allow layouts and rules to adapt",
            "body": "Long translations need room to wrap without covering controls. Right-to-left interfaces require attention to reading and navigation, not just mirrored artwork. Explain which information follows a service policy and which can follow personal formatting preferences. Test the result with realistic translated content and local users. A placeholder label like “Lorem ipsum” cannot reveal whether the real instruction makes sense."
          }
        ],
        "takeaway": "Validate language, formats, symbols, and behavior in the intended local context.",
        "practice": "Allow 20 minutes. In Inclusion and control, identify an ambiguous date or term, a layout risk, and a local question that needs checking.",
        "questions": [
          {
            "prompt": "Visitors interpret 03/04/2027 differently. Which revision reduces the ambiguity?",
            "options": [
              "Show a darker slash.",
              "Use an explicit month name and relevant time zone where needed.",
              "Assume everyone follows the designer’s date format."
            ],
            "answer": 1,
            "explanation": "An explicit month clarifies the date. Time-zone information can also be necessary when the appointment and person are in different zones."
          },
          {
            "prompt": "How should a team choose language for people in another region?",
            "options": [
              "Use national stereotypes as individual requirements.",
              "Translate only the headings.",
              "Work with relevant speakers and test the task with realistic language and formats."
            ],
            "answer": 2,
            "explanation": "Local evaluation examines actual comprehension and use. A demographic assumption or partial translation cannot establish it."
          }
        ],
        "flashcard": {
          "front": "Why is localization more than translation?",
          "back": "Meaning and use also depend on formats, reading direction, symbols, layout, terminology, policies, and local context."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapter 18, global/intercultural UI design"
          },
          {
            "source": "hci-dix",
            "locator": "Chapters 5 and 10, internationalization and diversity"
          }
        ]
      },
      {
        "id": "hci-privacy-agency",
        "title": "Protect privacy, consent, and control",
        "minutes": 10,
        "description": "Make consequential choices understandable and consider affected people.",
        "sections": [
          {
            "title": "Ask who benefits and who bears the cost",
            "body": "A sharing feature may make a manager’s work faster while exposing a team member’s private notes. Usability and ethical value are related but different questions. A harmful action can be easy to perform. Consider people affected outside the current screen, including those whose information is shared. Name a value conflict instead of assuming that the fastest path is the best outcome."
          },
          {
            "title": "Explain the choice before commitment",
            "body": "Consent requires a meaningful opportunity to understand and choose. State what information will be shared, with whom, for what purpose, and what happens if someone declines. Separate an optional use from the core service when appropriate. A preselected box or visually hidden refusal can create apparent agreement without understanding. The design should not make an unrelated optional choice a condition of completing the task."
          },
          {
            "title": "Provide control that matches the consequence",
            "body": "Let people review and change access, correct data, and stop an optional action where feasible. Be clear about what reversal can achieve. Removing future access does not erase a disclosure already made. Some actions need confirmation or additional safeguards; others can support undo. More controls are not automatically more agency if people cannot understand what those controls do."
          },
          {
            "title": "Review values during the process",
            "body": "Value-sensitive design considers human values throughout the work, not only in a final ethics checklist. Compare alternatives, involve affected people, and check the actual result. A legal checkbox does not by itself establish an informed experience. In classroom work, record assumptions and use fictional information. Explain the proposed behavior without making unsupported legal-compliance claims."
          }
        ],
        "takeaway": "An easy action should still preserve understanding, meaningful choice, and appropriate control.",
        "practice": "Allow 20 minutes. In Inclusion and control, review one sharing/default choice: audience, purpose, refusal, reversal, and an affected person who is not operating the screen.",
        "questions": [
          {
            "prompt": "An optional reminder-sharing box is preselected and refusal is hard to find. What needs attention?",
            "options": [
              "Whether agreement is recorded whenever the preselected box is submitted.",
              "Whether fewer steps increase completion, without checking understanding.",
              "Whether the choice is understandable and genuinely controllable before sharing."
            ],
            "answer": 2,
            "explanation": "An efficient flow can still conceal an optional consequence. Explain the choice and provide a clear, appropriate way to decline."
          },
          {
            "prompt": "A team makes private-file sharing easier but never considers whose files are exposed. What is missing?",
            "options": [
              "The affected stakeholders and value consequences, beyond task speed.",
              "A faster single-user flow without reviewing the sharing scope.",
              "A preference survey limited to people granting access."
            ],
            "answer": 0,
            "explanation": "The decision affects people beyond the operator. Include privacy and agency in the design reasoning and evaluation."
          }
        ],
        "flashcard": {
          "front": "How can usability and ethical value differ?",
          "back": "An action can be easy to perform yet harm privacy, autonomy, fairness, or other people. Evaluate both the task and its consequences."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapters 32 and 63, privacy, trust, human values"
          },
          {
            "source": "hci-dix",
            "locator": "Chapter 13, conflicting stakeholder requirements"
          }
        ]
      }
    ]
  },
  {
    "title": "Evaluate with evidence",
    "description": "Inspect, observe, interpret, revise, and check the result.",
    "lessons": [
      {
        "id": "hci-inspection",
        "title": "Inspect a design and walk through a task",
        "minutes": 10,
        "description": "Produce a task-based review finding and distinguish prediction from observation.",
        "sections": [
          {
            "title": "Choose the lens for the question",
            "body": "A heuristic review inspects a design using broad principles such as visibility, consistency, and recovery. A cognitive walkthrough follows a specified user and task to examine first-use understanding. Both can reveal candidate problems before a complete product exists. Neither is a session observing actual users. Their usefulness depends on the reviewers’ understanding of the task, people, context, and method."
          },
          {
            "title": "Walk through an action carefully",
            "body": "State who the person is, what they know, their goal, and the starting state. At each action ask: would they try to achieve the relevant effect, notice the available action, connect it to the goal, and understand the resulting feedback? An unfamiliar Edit icon might fail the connection step even if it is visible. Record where the reasoning depends on an assumption about prior knowledge."
          },
          {
            "title": "Make findings reviewable",
            "body": "Describe the location or state, the design property, the affected task, a predicted consequence, and supporting reasoning. “Potentially confusing” is too broad. “A pending invite uses the same label as an accepted invite, so the inviter may assume access is active” can be examined. Propose an observation or follow-up check that would challenge or support it. Keep positive findings too when they reveal behavior worth preserving."
          },
          {
            "title": "Treat disagreement as information",
            "body": "Reviewers can find different issues and disagree about seriousness. Compare their assumptions rather than merging every criticism into an unquestionable truth. An inspection can miss problems or predict ones that do not occur under the tested conditions. Use other evidence appropriately. A short usability test that fails to expose a problem does not prove the problem can never occur."
          }
        ],
        "takeaway": "An inspection makes a reasoned prediction that remains open to evidence.",
        "practice": "Allow 25 minutes. In Evaluation, save one heuristic finding and one walkthrough finding. Include assumptions, task consequence, and a follow-up question.",
        "questions": [
          {
            "prompt": "Which statement accurately labels a cognitive-walkthrough result?",
            "options": [
              "A prediction about a specified person’s task based on an explicit analysis.",
              "A direct observation of all users.",
              "A population success rate."
            ],
            "answer": 0,
            "explanation": "A walkthrough uses reasoned analysis of the user/task/action sequence. It is not empirical observation or a statistical estimate."
          },
          {
            "prompt": "A reviewer writes “the invite status is confusing.” What should be added?",
            "options": [
              "Only a severity number.",
              "The state, expected person/task, predicted consequence, and evidence or assumptions.",
              "A claim that every user will fail."
            ],
            "answer": 1,
            "explanation": "These details make the finding specific and open to evaluation. A rating alone or universal claim hides the reasoning."
          }
        ],
        "flashcard": {
          "front": "What are the four practical walkthrough questions?",
          "back": "Will the person pursue the relevant effect, notice the action, connect it to the goal, and understand the feedback?"
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 9, section 9.3"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapter 59, candidate discovery and confirmation"
          },
          {
            "source": "hci-heuristics",
            "locator": "Use selected principles as a reference"
          }
        ]
      },
      {
        "id": "hci-usability-session",
        "title": "Plan and run a usability session",
        "minutes": 10,
        "description": "Write neutral tasks and observe relevant people attempting them.",
        "sections": [
          {
            "title": "Start with a question and relevant people",
            "body": "A formative usability session helps identify difficulties in an interaction. Decide what you need to learn and recruit actual or plausible users of the task. A teammate who knows the product can help rehearse the procedure but is not a substitute for an unfamiliar visitor when that is the audience. Include access needs and important contexts in the plan rather than treating them as afterthoughts."
          },
          {
            "title": "Give a goal, not the route",
            "body": "“Your appointment no longer fits your schedule; move it to next Tuesday afternoon” describes a task. “Click My bookings, choose Edit, then select Tuesday” reveals the intended route. Use realistic details, define success, and decide how to handle unavailable choices. Keep teaching fixtures fictional. Explain the session and recording, obtain appropriate consent, and reassure participants that the product is being evaluated, not their worth or intelligence."
          },
          {
            "title": "Observe without coaching",
            "body": "Ask the person to express thoughts when useful, then allow them to act. A neutral “What are you looking for?” is different from “Did you notice Edit?” Record assistance and the point at which it was needed. Speaking aloud and moderator questions can affect behavior, especially timing. Choose the method for the question and avoid treating the resulting time as untouched natural performance."
          },
          {
            "title": "Keep a trustworthy record",
            "body": "Record the starting state, task, actions, result, relevant quotes, and help given. Separate observations and interpretations. Stop or adjust if someone is uncomfortable. A practical session can be small, but there is no participant number that guarantees every problem is found. Coverage depends on the tasks, groups, product, and risk. Summarize the limits and decide what another round should investigate."
          }
        ],
        "takeaway": "Give realistic goals, use neutral facilitation, and record outcomes and assistance honestly.",
        "practice": "Allow 25 minutes to plan, plus study time. In Evaluation, write one task, a success rule, consent arrangements, relevant participants, and neutral prompts. Choose the guided-case path if you cannot run a suitable session.",
        "questions": [
          {
            "prompt": "Which task avoids giving away the intended route?",
            "options": [
              "Click My bookings and press Edit.",
              "Find the blue Reschedule link.",
              "Move your appointment to an available time next Tuesday afternoon."
            ],
            "answer": 2,
            "explanation": "The goal leaves the path for the participant to discover. The other tasks disclose the interface route and weaken evidence about findability."
          },
          {
            "prompt": "A moderator points to Submit when a person is stuck. How should the outcome be recorded?",
            "options": [
              "As assisted completion, with the hint and earlier difficulty noted.",
              "As independent success.",
              "By deleting the participant’s record."
            ],
            "answer": 0,
            "explanation": "Assistance changes the evidence but does not make the entire session worthless. Record it so the result can be interpreted accurately."
          }
        ],
        "flashcard": {
          "front": "What makes a usability task neutral?",
          "back": "It gives a realistic goal and context without naming the controls or sequence the participant is meant to discover."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapter 57, pp. 1131–1141"
          },
          {
            "source": "hci-dix",
            "locator": "Chapter 9, user participation"
          },
          {
            "source": "hci-testing",
            "locator": "Design the tasks; run a session"
          }
        ]
      },
      {
        "id": "hci-measures-comparisons",
        "title": "Read measures and compare designs fairly",
        "minutes": 10,
        "description": "Interpret task evidence and identify misleading comparisons.",
        "sections": [
          {
            "title": "Define what a number means",
            "body": "Three of five participants completed a task independently under the stated success rule. Report that count and context before turning it into a broad percentage claim. Time on task depends on the start and stop points, whether assistance was given, and whether the task was completed correctly. Error counts need definitions too: repeated clicks and a wrong booking have different consequences."
          },
          {
            "title": "Keep behavior and self-report distinct",
            "body": "A participant can like a design and fail its task, or dislike a slow step that correctly protects a consequential choice. Surveys and ratings help describe experience; they do not replace observation of success. Use clear questions and response options, avoid leading wording, and state who answered. A tiny, convenient sample cannot support a precise claim about an entire customer population."
          },
          {
            "title": "Compare designs without changing the question",
            "body": "If everyone uses design A first and B second, practice may help B. Different tasks, participant experience, or moderator assistance can also explain an apparent improvement. Controlled comparisons require a suitable study design, allocation or order strategy, and analysis. A qualitative usability session aims to understand problems; an A/B experiment estimates effects of a change under its conditions. They are not interchangeable just because both use two designs."
          },
          {
            "title": "Make a proportionate conclusion",
            "body": "A small fictional log can teach you to spot independent success, assisted completion, and uncertainty. It cannot validate your own prototype. For a real study, report what you observed, plausible alternative explanations, and the next check. An average can hide variation, and a difference does not explain its own cause. Detailed sampling and statistical inference belong in the optional deeper study before making strong quantitative claims."
          }
        ],
        "takeaway": "Interpret a measure through its definition, conditions, and the evidence it can support.",
        "practice": "Allow 25 minutes. In Evaluation, analyze the supplied case log or your own consented observations. Label independent/assisted outcomes and state one unsupported conclusion.",
        "questions": [
          {
            "prompt": "Everyone tests A first and B second; B is faster. What alternative explanation matters?",
            "options": [
              "The colors are certainly responsible.",
              "People may have learned the task during A.",
              "The result proves B is better for all users."
            ],
            "answer": 1,
            "explanation": "Order and practice can affect performance. The comparison needs a design that accounts for these influences before attributing the difference to the interface."
          },
          {
            "prompt": "Three of five people independently completed a task in a small formative study. What is a proportionate report?",
            "options": [
              "Exactly 60% of all customers can use the product.",
              "Every important problem has been found.",
              "Three of five completed independently in these conditions; describe problems, coverage, and limits."
            ],
            "answer": 2,
            "explanation": "The observed count is useful. It is not a precise population estimate or proof of complete issue coverage."
          }
        ],
        "flashcard": {
          "front": "Why might a faster second design not be the cause of faster performance?",
          "back": "Order, practice, different tasks, participants, assistance, or other conditions may explain the difference."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 9, experimental evaluation"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapters 57–58, measurement and survey design"
          }
        ]
      },
      {
        "id": "hci-iterate",
        "title": "Choose a change and check it again",
        "minutes": 10,
        "description": "Prioritize a revision using evidence, consequence, and remaining uncertainty.",
        "sections": [
          {
            "title": "Turn observations into candidate problems",
            "body": "Start with the task and evidence, then consider the mechanism. “Two participants lost entered details after Back” points to a state-preservation problem. “The form needs fewer pages” is one possible response, not the observation itself. Several designs may address the same difficulty. Preserve the distinction so you can compare solutions rather than treating the first suggestion as a requirement."
          },
          {
            "title": "Prioritize the consequence and confidence",
            "body": "Consider how often the issue occurred in the available evidence, its task impact, who is affected, whether recovery is possible, and how confident the explanation is. A rare irreversible disclosure can deserve more attention than a common harmless extra click. Include practical effort and dependencies when planning a revision, while making unresolved serious risks visible. A severity number alone does not explain the decision."
          },
          {
            "title": "Change the cause and preserve what works",
            "body": "If a misunderstanding caused the wrong service choice, a larger target may not solve it. If a tiny target caused accidental activation, a longer help article may leave the cause intact. Compare alternatives and specify the expected effect. Preserve successful behavior and check for new problems. Making one part simpler can shift work to another person or a later step."
          },
          {
            "title": "Retest with a stated question",
            "body": "Ask whether the revision addresses the original problem and whether important related tasks still work. Choose relevant people and conditions rather than asking only the designer who knows the change. Explain what is new evidence, what is still a prediction, and what remains unknown. Iteration is a loop of reasoning and evaluation, not endless visual polishing or a guarantee that the next version is universally better."
          }
        ],
        "takeaway": "A defensible revision connects evidence, mechanism, consequence, and a follow-up check.",
        "practice": "Allow 25 minutes. In Evaluation, prioritize two findings and save a revision plan: evidence, predicted effect, possible new problem, and retest question.",
        "questions": [
          {
            "prompt": "People lose valid answers after Back. Which proposal is closest to the observed cause?",
            "options": [
              "Preserve still-valid answers and evaluate returning/editing behavior.",
              "Split the same form into more steps without changing state preservation.",
              "Require a tutorial before allowing people to use Back."
            ],
            "answer": 0,
            "explanation": "The proposed state behavior targets the loss of work. Other visual changes may serve another purpose but do not address this evidence."
          },
          {
            "prompt": "Which issue can deserve priority despite occurring less often?",
            "options": [
              "A minor preference with no task effect.",
              "An irreversible disclosure affecting a person’s privacy.",
              "A harmless optional extra click solely because it is common."
            ],
            "answer": 1,
            "explanation": "Consequence and reversibility matter alongside frequency. State evidence and uncertainty rather than reducing priority to occurrence count alone."
          }
        ],
        "flashcard": {
          "front": "What belongs in a revision rationale?",
          "back": "The task evidence, proposed mechanism, affected people/consequences, chosen change, tradeoffs, and what the next evaluation should check."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapters 5–6, iteration and rationale"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapters 47, 57, and 59"
          }
        ]
      }
    ]
  },
  {
    "title": "Handle shared and adaptive systems",
    "description": "Support collaboration, uncertain state, AI, and varied modes.",
    "lessons": [
      {
        "id": "hci-collaboration",
        "title": "Design for people working together",
        "minutes": 10,
        "description": "Specify roles, awareness, permissions, and handoffs in a shared task.",
        "sections": [
          {
            "title": "A shared task has several perspectives",
            "body": "An inviter sends a workspace invitation. The invitee receives it later on another device, while an administrator may control the permitted access. Each sees a different part of the same task. Collaborative systems need more than the single-user flow copied twice. Ask who knows what, who can act, and what happens when their actions occur at different times."
          },
          {
            "title": "Make relevant activity understandable",
            "body": "Awareness means useful knowledge of other people’s activity and the shared state. Pending, accepted, expired, and revoked invitations require different next actions. A person may need to know whether someone is editing a shared document, but not see unrelated private activity. Show enough context to coordinate, and consider the privacy consequences of presence and activity information."
          },
          {
            "title": "Plan coordination and conflict",
            "body": "Two people may change the same record, or one may remove access while another is working. Decide which changes are allowed, which state is authoritative, how conflicts appear, and what recovery preserves. A color-coded presence dot does not resolve a conflicting edit. Support handoffs with clear ownership and consequences, and avoid silently discarding someone’s work."
          },
          {
            "title": "Match the social setting",
            "body": "Working together can be simultaneous or separated in time and place. A group brainstorming board, a staff approval queue, and a private file share have different needs. Some stakeholders may have less power to refuse a workflow or disclose information. Include those relationships in research and evaluation. A successful task for the manager can still impose hidden work or exposure on others."
          }
        ],
        "takeaway": "Design the shared state and each person’s knowledge, actions, and consequences.",
        "practice": "Allow 25 minutes. In Shared and uncertain states, describe two people’s views of one handoff, including a delay, changed permission, or conflict.",
        "questions": [
          {
            "prompt": "An inviter sees Pending after the invitee has accepted, because their view is stale. What needs design attention?",
            "options": [
              "Rename Pending without updating the shared-state behavior.",
              "The shared state, refresh, and useful next action for both people.",
              "Teach invitees to accept faster while leaving the inviter’s view unchanged."
            ],
            "answer": 1,
            "explanation": "The problem is coordination across views and time. Renaming a stale label or asking the invitee to act faster does not establish which shared state is current."
          },
          {
            "prompt": "Should a collaboration feature expose every person’s activity to everyone?",
            "options": [
              "Yes, more awareness is always better.",
              "Yes, if the presence dot is subtle.",
              "No; share useful coordination information with appropriate scope and privacy."
            ],
            "answer": 2,
            "explanation": "Awareness has value and consequences. Decide what information is needed and who may appropriately see it."
          }
        ],
        "flashcard": {
          "front": "What does awareness mean in collaboration design?",
          "back": "Useful knowledge of other people’s relevant activity and shared state, with appropriate privacy and scope."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapters 14 and 19, collaboration and shared artifacts"
          },
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 10, collaboration"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapter 27, groupware"
          }
        ]
      },
      {
        "id": "hci-distributed-state",
        "title": "Handle delays, disconnection, and shared state",
        "minutes": 10,
        "description": "Distinguish local edits, saved data, pending requests, and conflicts.",
        "sections": [
          {
            "title": "Visible does not always mean saved",
            "body": "Typing a new appointment time can update a screen before the server accepts it. A local draft, queued request, saved record, and shared view are different states. The person needs to know which one affects their goal. An optimistic interface can feel responsive, but it must handle rejection and correction honestly. A quick animation cannot guarantee the request has completed."
          },
          {
            "title": "Design the lost-connection path",
            "body": "If a request has not been sent, it may be possible to keep a local draft and explain that it is not yet booked. If it was sent but the response was lost, the result may be unknown. Provide an appropriate check, retry, or reference-based recovery. A retry needs technical support to avoid creating duplicate operations. The designer should specify the intended behavior with engineers rather than promise it through copy alone."
          },
          {
            "title": "Respect other people’s changes",
            "body": "A staff member may update a booking while a customer is editing an older version. Silently overwriting the new record can lose important work. Explain what changed and help someone resolve the conflict, preserving their still-useful input where possible. A simple system may block the outdated change and request review; a complex one may offer merging. The policy should match the task and consequences."
          },
          {
            "title": "Make performance part of usability",
            "body": "Response time, variability, and reliability affect attention, trust, and task completion. Use feedback and interruption recovery suited to the expected wait. Do not present historical timing thresholds as universal guarantees for every task or device. Evaluate realistic conditions, including longer-than-expected waits, and document what the interface and backend each need to do."
          }
        ],
        "takeaway": "Explain whether work is local, pending, saved, or in conflict, and provide a real recovery path.",
        "practice": "Allow 25 minutes. In Shared and uncertain states, specify save behavior before sending, after a lost response, and after another person changes the record.",
        "questions": [
          {
            "prompt": "The screen shows edited data before the server accepts it. Which statement is safe?",
            "options": [
              "The booking is definitely saved.",
              "The staff view is definitely updated.",
              "The change may still be local or pending; communicate its actual status."
            ],
            "answer": 2,
            "explanation": "A visible update alone cannot establish a committed shared state. The system needs feedback and recovery that reflect the real request state."
          },
          {
            "prompt": "Another person changed the booking while a stale edit was open. What should happen?",
            "options": [
              "Explain the conflict and preserve useful input while resolving it according to policy.",
              "Silently overwrite the newer change.",
              "Discard all work without explanation."
            ],
            "answer": 0,
            "explanation": "Conflict handling protects shared work and understanding. Silent overwrite or unexplained loss creates an avoidable coordination problem."
          }
        ],
        "flashcard": {
          "front": "Why distinguish local, pending, and saved states?",
          "back": "They imply different facts about whether a change exists on the server and for other people, and different safe next actions."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapter 14, network-based interaction"
          },
          {
            "source": "hci-dix",
            "locator": "Chapters 18–19, rich interaction and shared state"
          },
          {
            "source": "hci-shneiderman",
            "locator": "Chapter 11, quality of service"
          }
        ]
      },
      {
        "id": "hci-adaptive-ai",
        "title": "Keep people in control of adaptive and AI features",
        "minutes": 10,
        "description": "Set expectations and support correction of an uncertain suggestion.",
        "sections": [
          {
            "title": "A suggestion is not the person’s decision",
            "body": "An assistant proposes an appointment time using past choices. The suggestion may save search effort but miss a new constraint, such as travel or a changed schedule. Adaptive systems change behavior using information about the person or situation. AI systems may also generate uncertain or varying results. The interface should explain what the feature is for and what the person can still decide."
          },
          {
            "title": "Show the scope and limits",
            "body": "Present a recommendation as a proposal until an authorized action commits it. Explain relevant reasons without inventing certainty or a numerical confidence that has no sound basis. A statement such as “Suggested because you chose afternoon times before” can help someone judge relevance if that is the actual reason. Avoid claiming an assistant knows what is best for every situation."
          },
          {
            "title": "Make rejection and correction useful",
            "body": "People should be able to choose another time, correct a constraint, or stop assistance when appropriate. Show what changed after a correction and whether it affects this suggestion or future behavior. An unwanted choice should not require fighting the system repeatedly. Keep a direct path to the core task so someone can continue when assistance is unsuitable or unavailable."
          },
          {
            "title": "Evaluate failure and authority",
            "body": "Test plausible wrong, incomplete, and inconsistent suggestions, not only impressive successes. Consider the cost of an error and when explicit review or confirmation is necessary. Accepting a suggestion, authorizing an agent to act, and reversing a completed action are different interactions. Report observed performance under tested conditions. A fluent explanation or simulated user is not proof that actual people can understand and control the feature."
          }
        ],
        "takeaway": "Make assistance understandable and correctable, with clear authority before commitment.",
        "practice": "Allow 25 minutes. In Shared and uncertain states, specify one suggestion, a plausible failure, rejection/correction paths, and the exact point where a real action is authorized.",
        "questions": [
          {
            "prompt": "An assistant suggests a time but has not booked it. Which label accurately represents the state?",
            "options": [
              "Your appointment is confirmed.",
              "Suggested time; review and confirm to book.",
              "We know this is the perfect time."
            ],
            "answer": 1,
            "explanation": "The label separates recommendation from committed action and leaves a meaningful decision. The other messages overstate either state or certainty."
          },
          {
            "prompt": "What should an evaluation of AI assistance include?",
            "options": [
              "Only its best successful response.",
              "Only whether its writing sounds confident.",
              "Plausible failures, corrections, user understanding, and control under the intended conditions."
            ],
            "answer": 2,
            "explanation": "The interaction must remain usable when suggestions are wrong or incomplete. Fluency and isolated success cannot establish that."
          }
        ],
        "flashcard": {
          "front": "What should a person be able to distinguish in AI assistance?",
          "back": "A suggestion, an authorized action, the committed result, its uncertainty, and what correction or recovery remains possible."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapter 22, adaptive interfaces and agents; chapter 32"
          },
          {
            "source": "hci-ai",
            "locator": "Guidelines for Human-AI Interaction, capability and correction"
          }
        ]
      },
      {
        "id": "hci-devices-modes",
        "title": "Choose a suitable device and interaction mode",
        "minutes": 10,
        "description": "Match input and output to context and provide an alternative.",
        "sections": [
          {
            "title": "Start with the task and conditions",
            "body": "A phone supports private portable use; a kiosk may serve a brief shared-location task; a voice interface may help when hands are occupied. Each introduces constraints. Touch needs suitable targets, voice needs a listening/speaking context, and a kiosk needs session privacy and clear completion. Choose around the task and people rather than adding another input mode merely because it is available."
          },
          {
            "title": "Combine modes when they help",
            "body": "Multimodal interaction uses more than one input or output mode, such as speech with a visible confirmation. Modes can complement one another, but more modes do not automatically mean better access. A voice-only confirmation can expose private details in public. Offer a meaningful alternative when a mode is unavailable, and preserve enough context when switching between modes or devices."
          },
          {
            "title": "Notice what changes beyond a flat screen",
            "body": "Wearables, tangible controls, virtual reality, and augmented reality introduce questions about movement, attention, physical setting, feedback, and safety. Spatial objects may need clear depth and selection cues. A wearable alert may interrupt another activity. This lesson introduces those design questions; building dependable specialist interactions needs further study and evaluation appropriate to the environment."
          },
          {
            "title": "Evaluate the complete path",
            "body": "A voice command to change an appointment may be recognized correctly while choosing the wrong day. Repeat or display consequential details and provide a correction path. For a shared device, show when the task ends and what information remains visible. Test input, interpretation, feedback, and recovery together. The useful comparison is not which technology is newest, but which combination supports the intended outcome under actual conditions."
          }
        ],
        "takeaway": "Match the mode to the task and context, including privacy, feedback, and an equivalent alternative.",
        "practice": "Allow 20 minutes. In Shared and uncertain states, compare your main task on two devices or modes. State one benefit, limitation, and fallback for each.",
        "questions": [
          {
            "prompt": "A voice interface speaks private appointment details in a public setting. What needs consideration?",
            "options": [
              "Increase the spoken detail so everything can be verified aloud.",
              "Make every confirmation voice-only to keep the mode consistent.",
              "Privacy, confirmation needs, and an appropriate alternative output mode."
            ],
            "answer": 2,
            "explanation": "The mode changes who can receive the information and how it can be checked. Appropriate output and control matter alongside recognition accuracy."
          },
          {
            "prompt": "A speech recognizer correctly transcribes a request. Does that prove the task succeeded?",
            "options": [
              "No; interpretation, intended details, commitment, feedback, and recovery still matter.",
              "Yes, transcription is the whole task.",
              "Yes, if the voice sounds natural."
            ],
            "answer": 0,
            "explanation": "Correct transcription is one stage. The system may still misinterpret the goal or commit a wrong choice."
          }
        ],
        "flashcard": {
          "front": "What makes an interaction multimodal?",
          "back": "It uses multiple input or output modes, ideally in a coordinated way suited to the task and with meaningful alternatives."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapters 2, 10, and 20"
          },
          {
            "source": "hci-shneiderman",
            "locator": "Chapters 6 and 9"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapters 19, 21, and 23"
          }
        ]
      }
    ]
  },
  {
    "title": "Complete a redesign",
    "description": "Bring your evidence and decisions together in a project.",
    "lessons": [
      {
        "id": "hci-capstone-brief",
        "title": "Define your capstone and evidence plan",
        "minutes": 10,
        "description": "Bound a project around a human goal and an honest evidence path.",
        "sections": [
          {
            "title": "Choose one meaningful task",
            "body": "Complete either the appointment-booking case or the team-invitation case. You do not need to design an entire product. Bound a task with a clear start, outcome, and consequential exception. For example, move an existing appointment to a suitable replacement without accidentally losing the original. A bounded project lets you explain the reasoning in more detail than a collection of disconnected polished screens."
          },
          {
            "title": "Bring the earlier work together",
            "body": "Review your brief, cognitive explanation, research question, task model, and assumptions. Revise anything that no longer fits. Define relevant people and context, then agree a success rule before interpreting results. The project workspace has separate entries for the module outputs, so you can carry work forward rather than recreate it at the end. The two project cases keep independent notes."
          },
          {
            "title": "Choose a transparent evidence path",
            "body": "Use the field-practice path if you can arrange a suitable, consented formative session. Follow applicable school or organizational arrangements and use ordinary low-risk tasks. Otherwise use the guided-case path and analyze the provided fictional records. That path develops analysis skills but does not validate your new prototype with actual users. Label predictions, fictional observations, and your own observations separately."
          },
          {
            "title": "Plan the next decision",
            "body": "State the uncertainty most likely to change the design, the method and task that could address it, and the evidence you will record. Do not collect private information unrelated to the question. Note practical limits such as a missing participant group or simulated backend. The aim is a coherent evidence-based design argument, not a claim that a small course project has solved every HCI problem."
          }
        ],
        "takeaway": "A clear project boundary and evidence plan make the final reasoning defensible.",
        "practice": "Allow 30 minutes. Open Capstone project, choose a case and evidence path, then update Brief and Research and task model before building your final prototype.",
        "questions": [
          {
            "prompt": "Which scope is most suitable for a focused capstone?",
            "options": [
              "Redesign every part of healthcare.",
              "Help a visitor move a booking while preserving the original until a replacement is confirmed.",
              "Make all software intuitive."
            ],
            "answer": 1,
            "explanation": "The bounded task gives a concrete outcome and exception to investigate. Broad ambitions do not define a manageable evaluation."
          },
          {
            "prompt": "You analyze fictional test records and design a new prototype. What can you claim?",
            "options": [
              "The prototype has been validated with real customers.",
              "The fictional counts estimate all customer behavior.",
              "You used teaching evidence to reason about a proposal whose user validation remains to be done."
            ],
            "answer": 2,
            "explanation": "The guided-case path supports analysis and design reasoning. Its records are not observations of people using your new design."
          }
        ],
        "flashcard": {
          "front": "What belongs in a capstone evidence plan?",
          "back": "A bounded task, people/context, success rule, uncertainty, suitable method, evidence categories, and practical limits."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapters 47–48, requirements and task analysis"
          },
          {
            "source": "hci-dix",
            "locator": "Chapters 5 and 13"
          }
        ]
      },
      {
        "id": "hci-capstone-prototype",
        "title": "Build alternatives and a testable prototype",
        "minutes": 10,
        "description": "Represent two plausible approaches and the behavior needed for evaluation.",
        "sections": [
          {
            "title": "Create genuine alternatives",
            "body": "One option could keep a review beside a visible list of times; another could separate selection and review into meaningful steps. Both should address the same task and relevant constraints. Avoid comparing your preferred design against an intentionally unusable version. Name what each makes easier, what effort it adds, and which assumption could change the choice."
          },
          {
            "title": "Choose the necessary behavior",
            "body": "If the question is about understanding commitment, show the transition from draft to pending to confirmed. If it concerns recovery, represent an error and the information preserved afterward. A prototype that supports only the successful route cannot answer those questions. Use paper, linked screens, or code as appropriate; a higher-fidelity tool is not a requirement for good reasoning."
          },
          {
            "title": "Describe inputs, states, and outputs",
            "body": "Record what each action changes, what the system shows, and which parts are simulated. Include accessible labels, logical focus, and an equivalent route when the preferred interaction relies on a gesture. A small state table can reveal a dead end or ambiguous promise before you build. If a server rule is unresolved, record it as an implementation question rather than hiding it behind confident copy."
          },
          {
            "title": "Select using a reasoned criterion",
            "body": "Choose an alternative using task evidence, cognitive reasoning, inclusion, consequences, and practical constraints. Explain why you reject the other option without pretending it has no merits. Save a sketch or prototype reference and a textual explanation in the workspace. The course stores your notes, not an uploaded design file, so keep your actual artifact in an appropriate design tool or document."
          }
        ],
        "takeaway": "A prototype should make the chosen uncertainty and important states testable.",
        "practice": "Allow 60–90 minutes. Save two alternatives and a prototype reference or textual flow. Describe coverage, important failure/recovery states, and simulated behavior.",
        "questions": [
          {
            "prompt": "Your question concerns recovery after losing a connection. Which prototype coverage is necessary?",
            "options": [
              "Only the initial heading.",
              "Only the successful confirmation.",
              "The pending/unknown result and a supported recovery path."
            ],
            "answer": 2,
            "explanation": "The representation must include the behavior the evaluation is intended to inspect. Success-only coverage cannot answer a recovery question."
          },
          {
            "prompt": "What makes two alternatives a fair design comparison?",
            "options": [
              "Both plausibly address the same task and constraints, with tradeoffs stated.",
              "One is intentionally impossible to use.",
              "Only one contains the required information."
            ],
            "answer": 0,
            "explanation": "Genuine alternatives let you reason about tradeoffs. A deliberately weak competitor creates an appearance of evidence without a meaningful choice."
          }
        ],
        "flashcard": {
          "front": "What should prototype coverage state?",
          "back": "Which tasks, states, inputs, feedback, and recovery paths are represented, and which behavior or systems are simulated or absent."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapter 52, prototyping tools and techniques"
          },
          {
            "source": "hci-dix",
            "locator": "Chapters 6 and 16, design rationale and dialog"
          }
        ]
      },
      {
        "id": "hci-capstone-evaluate",
        "title": "Evaluate, revise, and document the result",
        "minutes": 10,
        "description": "Use the selected evidence path to make and examine a revision.",
        "sections": [
          {
            "title": "Rehearse the evaluation",
            "body": "Check the task instructions, starting state, prototype, and note-taking plan. Rehearsing with a teammate can reveal broken links or a leading prompt before a participant session. Keep the final task goal neutral. For the guided-case path, read the fictional context and success rules before the records so you do not invent explanations from isolated counts."
          },
          {
            "title": "Collect the evidence you planned",
            "body": "For field practice, record actions, relevant quotes, outcomes, assistance, and conditions with appropriate consent. For a supplied case, preserve the evidence labels and distinguish an observation from a suggested cause. Do not fabricate sessions because you could not recruit someone. An honest analysis with a clearly stated limit is more valuable than a confident claim built on imagined participants."
          },
          {
            "title": "Make a traceable revision",
            "body": "Choose one important problem and explain the change through its mechanism and consequences. Preserve what worked. A clearer status message may address a misunderstanding but leave a small target unresolved; record both. Include an alternative explanation and a follow-up check. If you can retest the revised prototype, state what changed between rounds and how that affects comparison."
          },
          {
            "title": "Report improvement carefully",
            "body": "“The two participants in this round found the new action without help” is a bounded observation. “Everyone will find it” goes beyond the evidence. In the guided path, say what the fictional record suggests and what a future test should examine. Check the project rubric for missing reasoning, not just checked boxes. Completing a checklist does not establish independent professional review."
          }
        ],
        "takeaway": "Keep a visible chain from the evidence through the revision to a proportionate conclusion.",
        "practice": "Allow 60–90 minutes or the time needed for suitable sessions. Save the evaluation record, chosen change, result, and limits. Use the six-dimension self-review rubric.",
        "questions": [
          {
            "prompt": "You could not recruit participants. What is an honest completion path?",
            "options": [
              "Invent three sessions.",
              "Use the guided fictional case and explicitly state what remains unvalidated.",
              "Claim the prototype passed because the checklist is complete."
            ],
            "answer": 1,
            "explanation": "The guided-case path is designed for analysis practice. Its boundary must remain visible; invented evidence and checklist-based validation are not acceptable substitutes."
          },
          {
            "prompt": "A revised flow works for two people in one round. Which conclusion fits?",
            "options": [
              "It works for everyone.",
              "No further evaluation could help.",
              "Describe the observed result and tested conditions, then identify remaining coverage."
            ],
            "answer": 2,
            "explanation": "A bounded finding is useful without pretending that the sample and tasks represent every relevant person or situation."
          }
        ],
        "flashcard": {
          "front": "What makes an evaluation record trustworthy?",
          "back": "Clear conditions, real evidence labels, outcomes and assistance, traceable reasoning, and conclusions limited to what the evidence supports."
        },
        "reading": [
          {
            "source": "hci-handbook",
            "locator": "Chapters 57 and 59, testing and inspection limits"
          },
          {
            "source": "hci-dix",
            "locator": "Chapter 9, choosing and interpreting evaluations"
          }
        ]
      },
      {
        "id": "hci-capstone-defend",
        "title": "Defend the design and plan what comes next",
        "minutes": 10,
        "description": "Explain decisions, evidence, limitations, and behavior needed for implementation.",
        "sections": [
          {
            "title": "Tell a design argument",
            "body": "Begin with the person, goal, and relevant context. Show the problem and evidence, explain the alternatives, and state why you selected a change. Connect human behavior to the actual interaction: for example, a persistent summary reduces an avoidable recall demand. A gallery of finished screens cannot establish that relationship on its own. Use the artifact to support the argument."
          },
          {
            "title": "Separate evidence from ambition",
            "body": "Name the evidence path and which statements are observations, supplied case evidence, or predictions. Explain remaining uncertainty, important user groups not represented, and behavior the prototype simulated. A small project can demonstrate strong reasoning without proving a precise improvement for all users. The self-review rubric helps identify gaps; it is not a certificate issued by a university or an independent reviewer."
          },
          {
            "title": "Hand off behavior, not just appearance",
            "body": "Describe the actions, states, constraints, feedback, permissions, and recovery that implementation must preserve. Include accessibility expectations and acceptance checks. “Keep valid answers after a contact error” is testable behavior. “Make it smooth” is not. Ask engineers about safe retries, persistence, conflicts, and other promises that require system support. Record the unresolved decisions and who should help resolve them."
          },
          {
            "title": "Choose the next learning step",
            "body": "Plan the next question rather than declaring the interface finished forever. You might evaluate a missing access need, check a technical assumption, or test the revised flow in a more realistic setting. Continue using brief reviews and transfer exercises so the concepts remain usable. HCI brings people, technology, tasks, and consequences into the same design conversation; that practice extends beyond this course."
          }
        ],
        "takeaway": "A strong design explanation connects people, decisions, evidence, limits, and the next check.",
        "practice": "Allow 30 minutes. Finish the Decision memo: task, alternatives, change, evidence, limits, and next check. Export your project notes and keep the prototype artifact with them.",
        "questions": [
          {
            "prompt": "Which handoff note describes testable behavior?",
            "options": [
              "Keep valid form answers after a contact-field error and link focus to the correction.",
              "Make the flow delightful.",
              "Use the best interaction."
            ],
            "answer": 0,
            "explanation": "The first specifies a state transition and recovery expectation that implementation and QA can examine. The other statements need concrete behavior and criteria."
          },
          {
            "prompt": "What belongs at the end of a defensible case study?",
            "options": [
              "A promise that all future users will succeed.",
              "Remaining uncertainty and the next useful evaluation or implementation check.",
              "Only a statement that every checklist box was ticked."
            ],
            "answer": 1,
            "explanation": "The remaining limits and next check show where evidence ends and further work begins. Completion is not proof of universal success."
          }
        ],
        "flashcard": {
          "front": "What should a design decision memo connect?",
          "back": "The human goal and context, evidence, alternatives, chosen behavior, consequences, limitations, and next check."
        },
        "reading": [
          {
            "source": "hci-dix",
            "locator": "Chapter 6, design rationale"
          },
          {
            "source": "hci-handbook",
            "locator": "Chapters 57 and 63, evidence and human values"
          }
        ]
      }
    ]
  }
] satisfies readonly CourseModule[];

export const hciGuides: Readonly<Record<string, LessonGuide>> = {
  "hci-human-goals": {
    "objective": "Turn a feature request into a person, goal, and useful outcome.",
    "prediction": "A team asks for an appointment calendar. What would you ask before drawing it?",
    "worked": "Ask who is booking, what they need to arrange, and how they know it is confirmed. Then investigate whether they choose a time, a service, or a person first. The calendar remains a possible solution.",
    "deeper": "Dix, chapter 5: compare a design goal with a constraint. Write an alternative to the calendar that could serve the same goal.",
    "terms": [
      "HCI",
      "Goal",
      "Context"
    ]
  },
  "hci-useful-usable": {
    "objective": "Separate needed functionality, usability, and the wider experience.",
    "prediction": "A person says “this looks easy” but needs help to submit. What can you report?",
    "worked": "The person expected an easy experience, then needed help at submission. Record both. Define independent success separately from assisted completion.",
    "deeper": "Read the usability components in Usability 101. Choose which matters most for a once-a-year task and explain why.",
    "terms": [
      "Usability",
      "Utility",
      "User experience"
    ]
  },
  "hci-context": {
    "objective": "Identify the people, environment, devices, and handoffs around a task.",
    "prediction": "When someone sends an invite, whose task continues after the Send button?",
    "worked": "The invitee must receive, understand, and accept it; an administrator may control the allowed access. Map all three perspectives before treating Send as the final outcome.",
    "deeper": "Dix, chapter 13: identify one conflict between organizational requirements and the person doing the task.",
    "terms": [
      "Context",
      "Stakeholder",
      "State"
    ]
  },
  "hci-success-goals": {
    "objective": "Write a success rule that names a task, people, context, and measure.",
    "prediction": "Is reaching the “Invite sent” page enough to show a teammate has access?",
    "worked": "No. Sending, receiving, accepting, and gaining the intended access are distinct outcomes. Define which one the current task must achieve.",
    "deeper": "Compare a formative question (“where do people get stuck?”) with a benchmark requirement. Explain the evidence each would need.",
    "terms": [
      "Effectiveness",
      "Efficiency",
      "Success criterion"
    ]
  },
  "hci-attention": {
    "objective": "Use grouping, hierarchy, and clear cues to support a finding task.",
    "prediction": "Before changing the layout, where do you expect a person seeking the next afternoon appointment to look?",
    "worked": "Look for an explicit date, time, and availability cue. Compare whether the arrangement supports this sequence. A different goal, such as comparing services, may call for different grouping.",
    "deeper": "Inspect a layout using proximity, alignment, and figure/ground. Name which relationship each cue communicates.",
    "terms": [
      "Attention",
      "Hierarchy",
      "Redundant cue"
    ],
    "lab": "search"
  },
  "hci-memory": {
    "objective": "Replace unnecessary recall with visible or retrievable task information.",
    "prediction": "Choose a time in the experiment. What information would help you verify it after an interruption?",
    "worked": "An explicit date, time, service, and editable summary can restore context. The task should not depend on remembering the wording or position of the previous choice.",
    "deeper": "Dix, chapter 1, “7 ± 2 revisited”: explain why the number is not a general limit for visible menus.",
    "terms": [
      "Working memory",
      "Recognition",
      "Recall"
    ],
    "lab": "memory"
  },
  "hci-mental-models": {
    "objective": "Explain a mismatch between someone’s prediction and the system’s behavior.",
    "prediction": "If you see “Save appointment,” do you expect a draft, a request, or a confirmed time? Explain your clue.",
    "worked": "The label is ambiguous without context. Explicit states and next steps help people distinguish these outcomes. The experiment makes each meaning visible rather than treating one interpretation as obvious.",
    "deeper": "Read the definition and one search example in Mental Models. Describe a belief mismatch in a product you know.",
    "terms": [
      "Mental model",
      "Feedback",
      "State"
    ],
    "lab": "model"
  },
  "hci-learning-interruptions": {
    "objective": "Preserve useful context for someone who is new, distracted, or under pressure.",
    "prediction": "What would you show when a person returns to an unfinished invitation on a shared device?",
    "worked": "Explain the draft status and next step, while considering whether displaying the invitee’s details would expose them to another device user. Persistence and privacy need to be considered together.",
    "deeper": "Compare the handbook’s task-loading discussion with the needs of a novice and a practiced user of the same service.",
    "terms": [
      "Interruption",
      "Learnability",
      "Default"
    ]
  },
  "hci-research-methods": {
    "objective": "Select a method that can answer the uncertainty you actually have.",
    "prediction": "Would an interview or a usability session better answer “Can new invitees find the accept action?”",
    "worked": "A usability session can show whether relevant invitees find and use it. An interview can add explanations or recent experiences, but saying the action is easy is not the same as finding it.",
    "deeper": "Read GOV.UK’s sections on research questions and relevant activities. Rewrite one team opinion as a question.",
    "terms": [
      "Research question",
      "Observation",
      "Self-report"
    ]
  },
  "hci-observe-interview": {
    "objective": "Keep observations, participant reports, and interpretations distinguishable.",
    "prediction": "Read: “P2 said the confirmation was clear, then asked whether staff still had to approve it.” What are the evidence types?",
    "worked": "The first statement is a participant report; the question is an observed event. A possible interpretation is uncertainty about approval. Check that interpretation rather than replacing both notes with “P2 was happy.”",
    "deeper": "Handbook chapter 48: compare respectful observation with relying only on a manager’s account of staff work.",
    "terms": [
      "Observation",
      "Interpretation",
      "Consent"
    ]
  },
  "hci-task-analysis": {
    "objective": "Build a task model with ordering, dependencies, and recovery.",
    "prediction": "Arrange rescheduling steps. Is cancelling the old booking always the first step?",
    "worked": "In this case the intended rule is to find and confirm a suitable replacement before releasing the original time. Another service could have a different policy; make that constraint explicit.",
    "deeper": "Dix chapter 15, task decomposition: create a small hierarchical task analysis with one conditional plan.",
    "terms": [
      "Task analysis",
      "Goal",
      "Dependency"
    ],
    "lab": "tasks"
  },
  "hci-profiles-scenarios": {
    "objective": "Write a task-relevant profile and scenario with traceable assumptions.",
    "prediction": "What would change if an invitee does not recognize the workspace name?",
    "worked": "They need enough trustworthy context to identify the sender, workspace, and access before deciding. This changes the scenario even when the Accept button is easy to find.",
    "deeper": "Compare handbook chapters 51, 53, and 54: a persona, a scenario, and participation perform different jobs.",
    "terms": [
      "Persona",
      "Scenario",
      "Stakeholder"
    ]
  },
  "hci-clear-actions": {
    "objective": "Use visible clues and mappings to connect a goal to an action.",
    "prediction": "For “Edit appointment,” what exactly will change: time, service, location, or all three?",
    "worked": "The interface should establish the scope before the action. An Edit time action beside the chosen time makes a narrower, more predictable promise than an isolated pencil.",
    "deeper": "Trace the seven stages of Norman’s action cycle through one harmless task. Locate the point where someone may need more information.",
    "terms": [
      "Affordance",
      "Signifier",
      "Mapping"
    ]
  },
  "hci-system-state": {
    "objective": "Explain pending, successful, failed, and uncertain outcomes clearly.",
    "prediction": "After selecting Book, what would convince you that the booking exists?",
    "worked": "A confirmed state with the chosen service/time and reference is stronger than an acknowledgement that a request was sent. If the result is uncertain, show that uncertainty and a real recovery option.",
    "deeper": "Compare Norman’s evaluation stages with network-based interaction in handbook chapter 14. Which state can a person actually observe?",
    "terms": [
      "State",
      "Feedback",
      "Closure"
    ],
    "lab": "feedback"
  },
  "hci-error-recovery": {
    "objective": "Choose prevention and recovery suited to the error and its consequences.",
    "prediction": "Compare cancellation designs. Does confirmation always solve an accidental tap?",
    "worked": "It may catch some errors but leaves the original placement problem. Clear separation and an appropriate recovery path address different parts of the risk. An irreversible cancellation can still justify a focused confirmation.",
    "deeper": "Handbook chapter 8: distinguish identifying an error mechanism from assigning blame to the individual.",
    "terms": [
      "Slip",
      "Mistake",
      "Recovery"
    ],
    "lab": "recovery"
  },
  "hci-design-rules": {
    "objective": "Apply a relevant design principle and explain its limits.",
    "prediction": "If every action uses the same label, is the interface necessarily consistent?",
    "worked": "Only if those labels carry the same understandable meaning and behavior. Reusing Edit for unrelated scopes can look consistent while breaking predictability.",
    "deeper": "Compare one golden rule with a related Nielsen heuristic. Apply both to the same task and describe their shared concern.",
    "terms": [
      "Heuristic",
      "Consistency",
      "Requirement"
    ]
  },
  "hci-interaction-styles": {
    "objective": "Match an interaction style to the task and provide suitable alternatives.",
    "prediction": "Move an appointment using the direct and explicit controls. Which information helps you trust the new time?",
    "worked": "Both paths need the selected date/time and a clear statement of what was changed. The gesture alone is not confirmation that the change was accepted.",
    "deeper": "Shneiderman and Plaisant, chapter 6, section 6.3: compare benefits and limitations of direct manipulation.",
    "terms": [
      "Direct manipulation",
      "Interaction style",
      "Equivalent access"
    ],
    "lab": "direct"
  },
  "hci-forms": {
    "objective": "Collect needed information while preserving valid answers and clear recovery.",
    "prediction": "In the example form, submit an empty name, then fix it. What should happen to your chosen time?",
    "worked": "The time should remain if it is still available and valid. An error in the name is not a reason to erase an unrelated choice.",
    "deeper": "Compare a one-page and stepped version of the same form. List the context and navigation costs of each.",
    "terms": [
      "Validation",
      "Constraint",
      "Recovery"
    ],
    "lab": "form"
  },
  "hci-pointing-choice": {
    "objective": "Explain target geometry and choice using appropriate model assumptions.",
    "prediction": "Compare the two target areas without racing. What changes, and what remains unexplained?",
    "worked": "The larger action area changes pointing tolerance. Label meaning, accidental activation, neighboring controls, and task consequences still need investigation.",
    "deeper": "Handbook chapter 9, p. 166: inspect the model assumptions. Optional: examine the logarithmic relationship without treating its coefficients as universal.",
    "terms": [
      "Fitts’ law",
      "Hick-Hyman",
      "Model"
    ],
    "lab": "pointing"
  },
  "hci-first-frequent": {
    "objective": "Combine a discoverable route with efficient routine actions.",
    "prediction": "Would a keyboard shortcut remove the need for clear confirmation of a changed time?",
    "worked": "No. It can reduce entry effort but the person still needs to verify the intended result. Keep feedback and a recovery path appropriate to the change.",
    "deeper": "Dix chapter 12: sketch a GOMS method for a routine task, then explain which behavior it does not represent.",
    "terms": [
      "Learnability",
      "KLM",
      "GOMS"
    ]
  },
  "hci-navigation-search": {
    "objective": "Support finding, narrowing, and recovering from an empty result.",
    "prediction": "Find a Tuesday appointment, then apply a location restriction. How should a zero-result state explain itself?",
    "worked": "Keep the query and show the selected restriction. Offer a way to clear it. If the data failed to load, state that separate problem rather than saying no appointments exist.",
    "deeper": "Shneiderman and Plaisant chapter 14: compare overview, filtering, and detail. Explore chart selection in Graphnotes’ Data Visualization course.",
    "terms": [
      "Navigation",
      "Search scope",
      "Filter"
    ],
    "lab": "find"
  },
  "hci-interface-writing": {
    "objective": "Write clear actions, instructions, empty states, and constructive errors.",
    "prediction": "Rewrite “Operation rejected: validation failure” for a missing name field.",
    "worked": "“Type the name to use for this booking” tells the person what needs attention. Preserve their other answers and make the field easy to reach.",
    "deeper": "Read the clear-language guidance. Review a sentence over 25 words, then check whether splitting it preserves the meaning.",
    "terms": [
      "Plain language",
      "Feedback",
      "Constraint"
    ]
  },
  "hci-help-onboarding": {
    "objective": "Choose support that helps with the current task and preserves context.",
    "prediction": "Compare a tour with help beside the service choice. Which answers the current question?",
    "worked": "Help describing the meaning and consequence of the service choice supports that decision. A tour may be useful for another purpose, but it does not automatically explain this rule.",
    "deeper": "Dix chapter 11: inspect availability, accuracy, consistency, robustness, and flexibility in a help experience.",
    "terms": [
      "Contextual help",
      "Onboarding",
      "Learnability"
    ],
    "lab": "help"
  },
  "hci-prototyping": {
    "objective": "Choose prototype detail and interactivity to answer a specific question.",
    "prediction": "Which states would a confirmation-only prototype fail to reveal?",
    "worked": "It misses pending, failed, unknown-result, and correction paths. A person may understand the success screen while remaining unable to recover from a real error.",
    "deeper": "Handbook chapter 52, pp. 1018–1020: compare representation, precision, and interactivity. Sketch a state-transition model for one action.",
    "terms": [
      "Prototype",
      "State",
      "Transition"
    ]
  },
  "hci-keyboard-access": {
    "objective": "Provide a meaningful and equivalent way to complete the task.",
    "prediction": "Use Tab and Shift+Tab through the example. Can you identify each control and continue after a validation error?",
    "worked": "A meaningful sequence includes names, visible focus, instructions, and recovery. Counting focusable elements alone cannot establish that the task is understandable.",
    "deeper": "Inspect WCAG 2.2 criteria 2.1.1 Keyboard, 2.4.3 Focus Order, 2.4.7 Focus Visible, and 3.3.1 Error Identification. Check their exact scope.",
    "terms": [
      "Focus",
      "Assistive technology",
      "Equivalent access"
    ],
    "lab": "keyboard"
  },
  "hci-different-conditions": {
    "objective": "Identify barriers created by the combination of person, task, and environment.",
    "prediction": "If the person cannot use audio, what important parts of your booking flow become unavailable?",
    "worked": "Identify instructions, confirmation, errors, and alerts that rely only on sound. Provide meaningful equivalents and check whether the task can still be completed.",
    "deeper": "Read WAI’s examples of different users and conditions. Connect each to one concrete barrier and one way to investigate it.",
    "terms": [
      "Accessibility",
      "Universal design",
      "Context"
    ]
  },
  "hci-language-culture": {
    "objective": "Identify language and format assumptions that need local validation.",
    "prediction": "Write the appointment date so someone in another country can identify the same day and time.",
    "worked": "For example, “4 March 2027, 14:00, Dhaka time (UTC+6)” is explicit about the date and zone. The best presentation still depends on the audience and service.",
    "deeper": "Compare the handbook’s intercultural design chapter with a real localization task. Turn any cultural assumption into a question for local evaluation.",
    "terms": [
      "Localization",
      "Context",
      "Mental model"
    ]
  },
  "hci-privacy-agency": {
    "objective": "Make consequential choices understandable and consider affected people.",
    "prediction": "Try the sharing choices. Can declining the optional reminder still leave the core booking available?",
    "worked": "In this teaching case, sharing is optional and the booking remains available. The audience and purpose should be explicit before the choice, with a real way to change it later.",
    "deeper": "Handbook chapter 63: examine a tension between autonomy and convenience. Name an alternative design and whose interests it changes.",
    "terms": [
      "Consent",
      "Agency",
      "Stakeholder"
    ],
    "lab": "consent"
  },
  "hci-inspection": {
    "objective": "Produce a task-based review finding and distinguish prediction from observation.",
    "prediction": "Would a new invitee understand whether Pending means waiting for them or waiting for the administrator?",
    "worked": "Define their starting knowledge and inspect the wording and next action. Record a predicted interpretation and a question to check with relevant invitees.",
    "deeper": "Dix chapter 9, cognitive walkthrough, and handbook chapter 59: compare the assumptions and evidence behind inspection findings.",
    "terms": [
      "Heuristic",
      "Cognitive walkthrough",
      "Prediction"
    ]
  },
  "hci-usability-session": {
    "objective": "Write neutral tasks and observe relevant people attempting them.",
    "prediction": "Rewrite “Click the edit icon to change your appointment” as a neutral task.",
    "worked": "“You can no longer attend at the booked time. Find a suitable afternoon appointment next Tuesday and change your booking.” Define the success conditions without giving the route.",
    "deeper": "Read GOV.UK’s Design the tasks and Run a session sections. Note which prompts preserve observation and when intervention changes the evidence.",
    "terms": [
      "Usability testing",
      "Formative evaluation",
      "Consent"
    ]
  },
  "hci-measures-comparisons": {
    "objective": "Interpret task evidence and identify misleading comparisons.",
    "prediction": "Inspect the session log. Should assisted completion be counted as independent success?",
    "worked": "No. Keep independent, assisted, unsuccessful, and uncertain outcomes distinct. Their meaning depends on a success rule agreed before interpreting the results.",
    "deeper": "Dix chapter 9 and handbook chapter 58: compare a controlled study with self-reported satisfaction. Optional: study sampling and uncertainty before reporting precise rates.",
    "terms": [
      "Success criterion",
      "Self-report",
      "Confound"
    ],
    "lab": "evidence"
  },
  "hci-iterate": {
    "objective": "Prioritize a revision using evidence, consequence, and remaining uncertainty.",
    "prediction": "Which would you prioritize: a rare accidental disclosure or a common harmless extra step? What evidence would change your answer?",
    "worked": "The disclosure may have greater consequence and limited recovery, so rarity alone should not push it below convenience. Investigate the risk and confidence, and document the tradeoff.",
    "deeper": "Revisit Dix chapter 6 on design rationale. Record two alternatives and why one was selected under your project’s constraints.",
    "terms": [
      "Iteration",
      "Design rationale",
      "Recovery"
    ]
  },
  "hci-collaboration": {
    "objective": "Specify roles, awareness, permissions, and handoffs in a shared task.",
    "prediction": "Accept an invitation from the invitee’s perspective. What should the inviter see afterward?",
    "worked": "They need an accurate accepted/access state when refreshed, not a misleading Pending label. Both people need clear scope, with changes and revocation handled explicitly.",
    "deeper": "Dix chapter 19 and Shneiderman/Plaisant chapter 10: classify your case by same/different place and time, then examine where that simple matrix leaves questions.",
    "terms": [
      "Collaboration",
      "Awareness",
      "Stakeholder"
    ],
    "lab": "collaboration"
  },
  "hci-distributed-state": {
    "objective": "Distinguish local edits, saved data, pending requests, and conflicts.",
    "prediction": "What would you tell a person who can see their new time but is offline?",
    "worked": "Explain whether the time is merely a draft or a request already sent. Do not say it is booked unless that outcome is known. Preserve useful work and provide a supported recovery action.",
    "deeper": "Handbook chapter 14: connect network uncertainty to feedback and task completion. Ask an engineer what a safe retry requires.",
    "terms": [
      "State",
      "Conflict",
      "Feedback"
    ]
  },
  "hci-adaptive-ai": {
    "objective": "Set expectations and support correction of an uncertain suggestion.",
    "prediction": "Reject the proposed time and choose another. At what point should a booking actually be made?",
    "worked": "In this fixture, selecting a suggestion only updates a draft. The separate Confirm booking action commits the time. The distinction should remain visible throughout correction.",
    "deeper": "Read the human–AI guideline reference alongside handbook chapter 22. Identify capability, correction, and control requirements for a feature you know.",
    "terms": [
      "Adaptive system",
      "Agency",
      "Uncertainty"
    ],
    "lab": "ai"
  },
  "hci-devices-modes": {
    "objective": "Match input and output to context and provide an alternative.",
    "prediction": "How would you confirm a changed appointment when the person cannot use the current audio mode?",
    "worked": "Provide a readable, appropriately private confirmation and a correction path through another supported mode. The important information and control should not disappear with the audio.",
    "deeper": "Dix chapter 20 and handbook chapters on multimodal or virtual interaction: choose one specialist question and identify what further expertise and evaluation it needs.",
    "terms": [
      "Multimodal interaction",
      "Equivalent access",
      "Context"
    ]
  },
  "hci-capstone-brief": {
    "objective": "Bound a project around a human goal and an honest evidence path.",
    "prediction": "Which uncertainty in your current brief would most change your design if answered differently?",
    "worked": "Choose one specific uncertainty, such as whether people understand that a proposed time is not held. Link it to an activity that can produce relevant evidence.",
    "deeper": "Check the provided project exemplar. Identify one assumption it explicitly leaves unresolved and a method that could investigate it.",
    "terms": [
      "Success criterion",
      "Prediction",
      "Formative evaluation"
    ]
  },
  "hci-capstone-prototype": {
    "objective": "Represent two plausible approaches and the behavior needed for evaluation.",
    "prediction": "Does your prototype show what happens when the intended action fails?",
    "worked": "Identify the relevant failure state, preserved work, explanation, and next safe action. Add it before claiming the prototype can support an evaluation of recovery.",
    "deeper": "Handbook chapter 52: revisit prototype dimensions, then justify the exact detail your current question needs.",
    "terms": [
      "Prototype",
      "Transition",
      "Design rationale"
    ]
  },
  "hci-capstone-evaluate": {
    "objective": "Use the selected evidence path to make and examine a revision.",
    "prediction": "Which sentence in your draft report makes the strongest claim, and what evidence supports it?",
    "worked": "Check whether it describes an observation, interpretation, or future prediction. Narrow the wording or collect appropriate evidence if the claim extends beyond your study.",
    "deeper": "Compare a fictional finding, an inspection prediction, and an observed field result. Rewrite each with its evidence type explicit.",
    "terms": [
      "Interpretation",
      "Iteration",
      "Uncertainty"
    ]
  },
  "hci-capstone-defend": {
    "objective": "Explain decisions, evidence, limitations, and behavior needed for implementation.",
    "prediction": "Could another designer or engineer reconstruct your main decision from your notes?",
    "worked": "They should be able to identify the task, chosen alternative, evidence and assumptions, behavior across states, and remaining questions without relying on your memory of the project.",
    "deeper": "Choose a deeper route from the Sources page: predictive models, study design, collaboration, or emerging interaction. Connect it to a concrete question from your project.",
    "terms": [
      "Design rationale",
      "Requirement",
      "Iteration"
    ]
  }
};
