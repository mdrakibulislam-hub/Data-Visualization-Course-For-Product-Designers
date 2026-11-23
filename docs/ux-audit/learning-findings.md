# Learning journey audit

Reviewed the overview, all 12 lesson routes, every embedded chart view, and Sources on 23 November 2026. Browser viewport tests used 1440 × 900 and 390 × 844; focused chart-label checks also use 320px. The isolated preview origin preserves the user's localhost:5173 progress.

The before and after JSON matrices record the route, selected chart view, page heading, horizontal overflow, rendered label sizes, and data-table behavior. Each viewport includes 26 chart states, for 52 states per pass. All 35 further-reading references resolve to a source in the course catalog.

## Findings

| ID | Severity | Observed | Resolution |
| --- | --- | --- | --- |
| L01 | Medium | Submitting a lesson answer disabled its form controls: option text became 50% opaque and the essential question prompt used the disabled color. | Submitted answers are now static, fully opaque reading material with explicit chosen-answer and correct-answer labels. |
| L02 | Medium | Lesson feedback appeared without a focus handoff, and retry removed its focused button. | Checking an answer focuses the named feedback region; retry returns focus to the first answer option after rendering. |
| L03 | Low | Lesson answer rows were 24px high while standalone quiz options had larger interaction areas. | Shared radio rows now have a 44px minimum height; lesson prompts have a consistent, readable question heading. |
| L04 | Low | Overview lesson titles were 14px, smaller than their module descriptions, with little distinction from the 13.76px lesson descriptions. | Shared typography now gives titles 16px, descriptions 15px, and module headings a clear higher level. |
| L05 | Low | Essential cohort and values-table text dropped to 12px on mobile. The reviewed baseline tables fit; page clipping was not reproduced. | Tables now use 14px text. Named, keyboard-focusable scroll regions keep wide data readable within the page. |
| L06 | Low | Lesson duration disappeared below 31rem, removing useful information when choosing a short learning session. | Duration now stays beside the lesson title at all widths. |
| L07 | Medium | At 390px, embedded column labels rendered at 10.56px and line-chart labels at 11.11px after SVG scaling. | The shared chart-label scale compensates for the viewBox. Overview labels use the same principle. This is part of the main report's shared typography finding. |

## Evidence

- [Submitted answers and small targets, desktop](evidence/before/learning-lesson-desktop-annotated.png)
- [Missing lesson durations, mobile](evidence/before/learning-overview-mobile-annotated.png)
- [Small distribution labels, mobile](evidence/before/learning-averages-and-distributions-mobile-annotated.png)
- [Small line-chart labels, mobile](evidence/before/learning-accessible-charts-mobile-annotated.png)
- [Small cohort table, mobile](evidence/before/learning-compare-many-groups-mobile-annotated.png)

Complete page captures cover the overview, lesson reader, Sources, distributions, linked filters, accessible charts, cohort comparisons, and the capstone lesson, each on desktop and mobile. Captures stitch consecutive viewport images at their recorded scroll offsets; sticky navigation appears once. The browser scales desktop screenshot pixels from a 1440px layout to 1280px, while mobile images retain their 390px width. A one-pixel sticky-header border can appear at mobile stitching seams; content rows are not omitted.

The overview, source groups, and lesson content keep their established structure. No source copy or teaching material was removed for visual convenience.

## Verification

- All 12 lessons render their expected H1; every chart selector changes its view. The 52-state desktop/mobile pass found no page-level horizontal overflow.
- Lesson feedback receives focus after submission. Retrying restores the first radio option after rendering. Submitted options retain opacity 1 and explicit correct/incorrect text.
- All reviewed tables render at 14px, with named keyboard-focusable scroll regions for wide values.
- Column tick, category, and value labels render at 14px on desktop and mobile. At 390px, line labels render at 14.72px. At 320px, the dense daily-detail line labels render at 13.77px.
- Overview labels render at 13.15px at 320px and 16.96px at 390px. All lesson durations remain visible at both widths.
- At 320px, the three daily-detail view choices wrap into two rows inside a 98px group; every choice remains 44px high and the rows do not overlap.
- The before/after JSON matrices and 16 complete after captures accompany this report. Tests use Chromium at CSS viewport sizes; this is not a cross-browser or screen-reader conformance certification.
