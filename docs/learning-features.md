# Practice, reviews and personal goals

Graphnotes rewards concrete learning activities without points, leaderboards or streak resets. These features use the existing local progress store; no account or backend is involved.

- **Design challenges** (`/challenges`): one everyday decision per lesson. Choose a change, inspect the resulting chart, then explain why it helps. Incorrect choices show readable feedback and a retry. A correct decision and explanation record **Practiced**. Submitted steps survive reloads, and a later-day completion records **Revisited**. Challenges do not automatically complete lessons.
- **Scheduled reviews** (`/review`): completed lessons first return two calendar days later. Successful scheduled recall uses intervals of 2, 7, 21, then 60 days. An uncertain recall returns tomorrow. Repeating a card on the same day cannot increase the interval; practicing ahead keeps the planned review date. Existing completed/known cards without schedules are available immediately; unseen cards remain in All cards.
- **Weekly goal** (`/preferences`): optional 2, 3, 4 or 5 practice days; off by default. Weeks run Monday–Sunday in the browser's local calendar. A day counts after a completed lesson, a completed challenge, a completed quiz round, ratings of three distinct cards, or editing project notes/completing a checklist step. Multiple activities still count as one day. Turning a goal off preserves activity and learning.
- **Milestones**: first explained chart decision; all three foundations challenges; first successful later scheduled recall; a project with notes and all five checklist steps. Earned milestones remain in Preferences, with only one upcoming milestone shown. Completion feedback acknowledges newly earned milestones without a modal or confetti.
- **Backups**: Preferences exports a versioned JSON file of the current normalized progress. Import validates the file, shows a replacement confirmation, and preserves appearance. Invalid files leave progress unchanged.

## Persistence and validation

The existing `data-viz-field-guide.progress.v1` key gains an additive `learning` object. Older lessons, answers, quiz records, project drafts and checks are retained. New metadata is validated when read; activity history is bounded to 400 calendar dates. Storage-unavailable mode continues in memory and allows exporting a backup. Changes synchronize through the existing browser storage event.

Calendar helpers use local dates at noon to avoid daylight-saving shifts. Review due dates are calendar dates, not elapsed UTC day counts. A foreground/midnight refresh updates the due queue and current week without requiring a reload.

## Verification

Run `bun run test:learning`. The focused suite covers legacy backups, malformed data, calendar boundaries, daylight saving, weekly activity deduplication, review intervals, challenge uniqueness and persistent milestones. The suite is also run under `TZ=America/New_York`.

UI checks cover a wrong answer/retry, second-step resume after reload, challenge completion/milestone, every challenge's before/after view, goal persistence, valid/cancelled/invalid backup import, due reviews, and narrow layouts. Keep tests on an isolated origin so development learning progress is preserved.
